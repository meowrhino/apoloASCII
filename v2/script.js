const audioElement = document.getElementById('track');
let audioContext;
let trackSource;
let panner;

// Función para iniciar el contexto de audio
function startAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    trackSource = audioContext.createMediaElementSource(audioElement);

    // Crear un nodo de panner para controlar el panning
    panner = audioContext.createStereoPanner();
    trackSource.connect(panner).connect(audioContext.destination);

    // Iniciar la reproducción del audio
    audioElement.play().then(() => {
        console.log("Reproducción de audio iniciada");
    }).catch(error => {
        console.error("Error al reproducir el audio: ", error);
    });

    document.getElementById('startButton').style.display = 'none';  // Ocultar el botón de inicio
}

document.getElementById('startButton').addEventListener('click', startAudio);

const gameWidth = 60;
const gameHeight = 20;
let player = { x: gameWidth / 2, y: gameHeight - 2, color: 'rgb(0, 255, 255)' };
let altavozIzq = { x: 10, y: 10 };  // Posición del altavoz izquierdo
let altavozDer = { x: 50, y: 10 };  // Posición del altavoz derecho

function renderGame() {
    // Actualizar el panning del audio basado en la posición del jugador
    updatePanning();
    // Dibujar el juego (omitido en este ejemplo)
}

function updatePanning() {
    const leftDistance = player.x - altavozIzq.x;
    const rightDistance = altavozDer.x - player.x;

    let panValue = 0;

    // Calcular el panning basado en la distancia entre el jugador y los altavoces
    if (leftDistance < rightDistance) {
        panValue = -1 + (leftDistance / gameWidth);  // Hacia la izquierda
    } else {
        panValue = 1 - (rightDistance / gameWidth);  // Hacia la derecha
    }

    // Aplicar el valor de panning al nodo de panner
    if (panner) {
        panner.pan.value = panValue;
    }
}

document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'w':
            player.y = Math.max(0, player.y - 1);
            break;
        case 'a':
            player.x = Math.max(0, player.x - 1);
            break;
        case 's':
            player.y = Math.min(gameHeight - 1, player.y + 1);
            break;
        case 'd':
            player.x = Math.min(gameWidth - 1, player.x + 1);
            break;
    }
    renderGame();  // Redibujar y actualizar el sonido
});

renderGame();  // Iniciar la pantalla
