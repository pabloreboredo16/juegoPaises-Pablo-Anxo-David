# 🌍 Adivina la Bandera

Un juego interactivo de preguntas y respuestas en JavaScript donde debes adivinar a qué país pertenece la bandera mostrada.

---

## 🎮 ¿Cómo se juega?

1. **Carga de banderas:** Al iniciar, el juego obtiene los datos de banderas y nombres de países de forma dinámica.
2. **Elige una opción:** Se muestra una bandera al azar junto a 4 opciones posibles (1 correcta y 3 distractores).
3. **Feedback instantáneo:** 
   * Si aciertas, el botón se marca en **verde** con el mensaje *"¡Correcto!"*.
   * Si fallas, el botón seleccionado se muestra en **rojo** y el juego te indica cuál era la respuesta correcta.
4. **Siguiente ronda:** Haz clic en el botón **"Siguiente bandera"** para continuar con un nuevo país sin repetir los anteriores hasta completar la lista.

---

## 🛠️ Tecnologías utilizadas

* **HTML5:** Estructura semántica de la aplicación.
* **CSS3:** Diseño responsivo, interfaz centrada y cuadrícula 2x2 para las opciones de respuesta.
* **JavaScript (ES6+):** 
  * Peticiones asíncronas (`fetch` / `async-await`) para la obtención de datos.
  * Manipulación del DOM para la actualización de botones y estados.
  * Algoritmo de barajado **Fisher-Yates** para aleatorizar opciones y banderas.

---

## 🚀 Instalación y ejecución local

1. Clona este repositorio en tu equipo:
   ```bash
   git clone [https://github.com/tu-usuario/juegoPaises-Paises.git](https://github.com/tu-usuario/juegoPaises-Paises.git)