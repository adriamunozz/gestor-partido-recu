// Variables del marcador
let puntosAzul = 0;
let puntosRojo = 0;

// Elementos del marcador
const textoAzul = document.querySelector("#puntos-azul");
const textoRojo = document.querySelector("#puntos-rojo");
const estadoPartido = document.querySelector("#estado-partido");

const btnAzul = document.querySelector("#btn-azul");
const btnRojo = document.querySelector("#btn-rojo");
const btnReiniciar = document.querySelector("#btn-reiniciar");

// Elementos de jugadores
const formJugador = document.querySelector("#form-jugador");
const inputJugador = document.querySelector("#nombre-jugador");
const listaJugadores = document.querySelector("#lista-jugadores");
const mensajeJugador = document.querySelector("#mensaje-jugador");

// Lista donde se guardan los jugadores
const jugadores = [];

// Actualiza el marcador y el mensaje del partido
function actualizarMarcador() {
    textoAzul.textContent = puntosAzul;
    textoRojo.textContent = puntosRojo;

    if (puntosAzul === 0 && puntosRojo === 0) {
        estadoPartido.textContent = "El partido está preparado para empezar.";
    } else if (puntosAzul > puntosRojo) {
        estadoPartido.textContent = "El Equipo Azul va ganando.";
    } else if (puntosRojo > puntosAzul) {
        estadoPartido.textContent = "El Equipo Rojo va ganando.";
    } else {
        estadoPartido.textContent = "El partido está empatado.";
    }
}

// Eventos del marcador
btnAzul.addEventListener("click", function () {
    puntosAzul++;
    actualizarMarcador();
});

btnRojo.addEventListener("click", function () {
    puntosRojo++;
    actualizarMarcador();
});

btnReiniciar.addEventListener("click", function () {
    puntosAzul = 0;
    puntosRojo = 0;
    actualizarMarcador();
});

// Muestra mensajes claros al usuario
function mostrarMensaje(texto, tipo) {
    mensajeJugador.textContent = texto;
    mensajeJugador.className = "aviso " + tipo;
}

// Actualiza la lista de jugadores en el HTML
function pintarJugadores() {
    listaJugadores.innerHTML = "";

    jugadores.forEach(function (jugador, indice) {
        const item = document.createElement("li");

        const nombre = document.createElement("span");
        nombre.textContent = jugador;

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "Eliminar";

        botonEliminar.addEventListener("click", function () {
            jugadores.splice(indice, 1);
            pintarJugadores();
            mostrarMensaje("Jugador eliminado correctamente.", "correcto");
        });

        item.appendChild(nombre);
        item.appendChild(botonEliminar);
        listaJugadores.appendChild(item);
    });
}

// Añade jugadores evitando vacíos y duplicados
formJugador.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombre = inputJugador.value.trim();

    if (nombre === "") {
        mostrarMensaje("No se puede añadir un nombre vacío.", "error");
        return;
    }

    const duplicado = jugadores.some(function (jugador) {
        return jugador.toLowerCase() === nombre.toLowerCase();
    });

    if (duplicado) {
        mostrarMensaje("Ese jugador ya está añadido.", "error");
        return;
    }

    jugadores.push(nombre);
    pintarJugadores();
    inputJugador.value = "";
    mostrarMensaje("Jugador añadido correctamente.", "correcto");
});

// Estado inicial
actualizarMarcador();
