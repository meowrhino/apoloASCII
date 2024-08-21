
const gameWidth = 60;
const gameHeight = 20;
const player = new Player(Math.floor(gameWidth / 2), gameHeight - 2);
const escenario = new Scenario(Math.floor(gameWidth / 2) - 8, 2, 16, 3);
const altavozIzq = new Speaker(escenario.x - 6, escenario.y + escenario.height);
const altavozDer = new Speaker(escenario.x + escenario.width + 3, escenario.y + escenario.height);

let personas = [];
const numPersonas = 30;

// Crear personas aleatorias cerca del escenario usando la clase Person
for (let i = 0; i < numPersonas; i++) {
    let personaX = Math.floor(Math.random() * (escenario.width + 10)) + escenario.x - 5;
    let personaY = Math.floor(Math.random() * 5) + escenario.y + escenario.height + 1;
    personas.push(new Person(personaX, personaY));  // Usamos Person en lugar de Entity
}

function renderGame() {
    let screen = Array(gameHeight).fill().map(() => Array(gameWidth).fill(' '));

    // Renderizar entidades
    escenario.render(screen);
    altavozIzq.render(screen);
    altavozDer.render(screen);
    personas.forEach(persona => persona.render(screen));
    player.render(screen);

    // Mostrar pantalla
    document.getElementById('game').textContent = screen.map(row => row.join('')).join('\n');
}

function movePlayer(dx, dy) {
    player.move(dx, dy, [escenario, altavozIzq, altavozDer]);

    // Detectar colisiones con personas y manejar enfado
    personas.forEach(persona => {
        if (player.x === persona.x && player.y === persona.y) {
            persona.handleCollision();
        }
    });

    renderGame();
}

function pushPerson() {
    personas.forEach(persona => {
        persona.moveTowardPlayer(player);
    });
}

function gameLoop() {
    let dx = 0, dy = 0;

    if (keys['w']) dy = -1;
    if (keys['s']) dy = 1;
    if (keys['a']) dx = -1;
    if (keys['d']) dx = 1;

    if (dx !== 0 || dy !== 0) {
        movePlayer(dx, dy);
    }

    pushPerson();
    requestAnimationFrame(gameLoop);
}
