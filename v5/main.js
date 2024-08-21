
let keys = { w: false, a: false, s: false, d: false };

document.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
    // Activar música al presionar una tecla por primera vez
    if (!audioCtx) {
        createTechnoMusic();
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

let lastRenderTime = 0;
const gameInterval = 1000 / 30; // 30 FPS

function gameLoop(currentTime) {
    const delta = currentTime - lastRenderTime;

    if (delta > gameInterval) {
        update();
        render();
        lastRenderTime = currentTime;
    }

    requestAnimationFrame(gameLoop);
}

// Iniciar el bucle del juego
requestAnimationFrame(gameLoop);
