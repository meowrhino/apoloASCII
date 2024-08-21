
class Entity {
    constructor(x, y, char) {
        this.x = x;
        this.y = y;
        this.char = char;
    }

    render(screen) {
        screen[this.y][this.x] = this.char;
    }
}

class Player extends Entity {
    constructor(x, y) {
        super(x, y, '@');
        this.lastMoveTime = 0;
        this.moveCooldown = 200; // Tiempo en ms entre movimientos
    }

    move(dx, dy, obstacles) {
        const now = Date.now();
        if (now - this.lastMoveTime >= this.moveCooldown) {
            let newX = this.x + dx;
            let newY = this.y + dy;

            if (!this.detectCollision(newX, newY, obstacles)) {
                this.x = Math.max(0, Math.min(gameWidth - 1, newX));
                this.y = Math.max(0, Math.min(gameHeight - 1, newY));
                this.lastMoveTime = now; // Registrar el tiempo del último movimiento
            }
        }
    }

    detectCollision(x, y, obstacles) {
        return obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
    }
}

class Person extends Entity {
    constructor(x, y) {
        super(x, y, 'O');
        this.collisionCount = 0;
    }

    handleCollision() {
        this.collisionCount++;
        this.updateColor();
        if (this.collisionCount >= 5) {
            this.startChasing();
        }
    }

    updateColor() {
        // Representar el enfado con tonos de rojo (caracteres ASCII)
        this.char = this.collisionCount >= 5 ? 'R' : (this.collisionCount >= 4 ? 'r' : (this.collisionCount >= 3 ? 'o' : 'O'));
    }

    startChasing() {
        // Cambiar comportamiento para empezar a perseguir al jugador
        this.chasing = true;
    }

    moveTowardPlayer(player) {
        if (this.chasing) {
            if (player.x > this.x) this.x++;
            else if (player.x < this.x) this.x--;

            if (player.y > this.y) this.y++;
            else if (player.y < this.y) this.y--;
        }
    }
}
