let keys = { w: false, a: false, s: false, d: false };

document.addEventListener('keydown', (event) => {
    if (event.key in keys) {
        keys[event.key] = true;
    }
});

document.addEventListener('keyup', (event) => {
    if (event.key in keys) {
        keys[event.key] = false;
    }
});

gameLoop();
