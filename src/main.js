// Elementos del DOM
const imgBandera = document.getElementById('bandera')
const contenedorOpciones = document.getElementById('opciones')
const mensaje = document.getElementById('mensaje')
const btnSiguiente = document.getElementById('siguiente')

let todosLosPaises = []  
let paisesPorJugar = []   
let paisCorrecto = null

btnSiguiente.addEventListener('click', nuevaRonda)

// Algoritmo Fisher-Yates 
function mezclarArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

async function cargarPaises() {
    mensaje.textContent = 'Cargando banderas...'

    try {
        const response = await fetch('https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json')

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`)
        }

        const data = await response.json()

        todosLosPaises = data
            .filter(p => p.cca2 && (p.translations?.spa?.common || p.name?.common))
            .map(p => {
                const code = p.cca2.toLowerCase()
                const flagUrl = `https://flagcdn.com/w320/${code}.png`
                
                // Prioriza el nombre traducido al español
                const nombreEnEspanol = p.translations?.spa?.common || p.name.common

                return {
                    names: { common: nombreEnEspanol },
                    flag: { 
                        url_svg: flagUrl,
                        svg: flagUrl
                    }
                }
            })

        if (todosLosPaises.length < 4) {
            mensaje.textContent = 'No se encontraron suficientes banderas válidas.'
            return
        }

        reiniciarMazo()
        nuevaRonda()

    } catch (error) {
        console.error('Error al cargar países:', error)
        mensaje.textContent = 'Error al conectar con el servidor de banderas.'
    }
}

// Rellena la lista de países pendientes de salir y la desordena
function reiniciarMazo() {
    paisesPorJugar = [...todosLosPaises]
    mezclarArray(paisesPorJugar)
}

function nuevaRonda() {
    mensaje.textContent = ''
    btnSiguiente.style.display = 'none'
    contenedorOpciones.innerHTML = ''

    // Si nos quedan menos de 4 países por salir, reiniciamos el mazo
    if (paisesPorJugar.length < 4) {
        reiniciarMazo()
    }

    // 1. Extraemos el país correcto del mazo (asegura que NO se repita la bandera)
    paisCorrecto = paisesPorJugar.pop()

    // 2. Elegimos 3 opciones incorrectas aleatorias del catálogo general
    const opcionesIncorrectas = []
    while (opcionesIncorrectas.length < 3) {
        const aleatorio = todosLosPaises[Math.floor(Math.random() * todosLosPaises.length)]
        if (
            aleatorio.names.common !== paisCorrecto.names.common &&
            !opcionesIncorrectas.some(o => o.names.common === aleatorio.names.common)
        ) {
            opcionesIncorrectas.push(aleatorio)
        }
    }

    // 3. Juntamos la correcta con las 3 incorrectas y las mezclamos
    const opcionesRonda = [paisCorrecto, ...opcionesIncorrectas]
    mezclarArray(opcionesRonda)

    // Mostrar bandera
    imgBandera.src = paisCorrecto.flag.url_svg
    imgBandera.style.display = 'block'

    // Generar botones
    opcionesRonda.forEach(pais => {
        const boton = document.createElement('button')
        boton.textContent = pais.names.common
        boton.addEventListener('click', () => verificarRespuesta(pais, boton))
        contenedorOpciones.appendChild(boton)
    })
}

function verificarRespuesta(paisSeleccionado, botonPresionado) {
    const botones = contenedorOpciones.querySelectorAll('button')
    botones.forEach(b => b.disabled = true)

    if (paisSeleccionado.names.common === paisCorrecto.names.common) {
        mensaje.textContent = '¡Correcto!'
        botonPresionado.style.backgroundColor = '#4CAF50'
        botonPresionado.style.color = 'white'
    } else {
        mensaje.textContent = `¡Incorrecto! Era ${paisCorrecto.names.common}`
        botonPresionado.style.backgroundColor = '#f44336'
        botonPresionado.style.color = 'white'
    }

    btnSiguiente.style.display = 'inline-block'
}
// Iniciar el juego
cargarPaises()