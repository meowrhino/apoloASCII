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
    }

    move(dx, dy, obstacles) {
        let newX = this.x + dx;
        let newY = this.y + dy;

        if (!this.detectCollision(newX, newY, obstacles)) {
            this.x = Math.max(0, Math.min(gameWidth - 1, newX));
            this.y = Math.max(0, Math.min(gameHeight - 1, newY));
        }
    }

    detectCollision(x, y, obstacles) {
        return obstacles.some(obstacle => obstacle.x === x && obstacle.y === y);
    }
}

class Scenario extends Entity {
    constructor(x, y, width, height) {
        super(x, y, '█');
        this.width = width;
        this.height = height;
    }

    render(screen) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                screen[this.y + i][this.x + j] = this.char;
            }
        }
    }
}

class Speaker extends Entity {
    constructor(x, y) {
        super(x, y, '▒');
        this.width = 3;
        this.height = 4;
    }

    render(screen) {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                screen[this.y + i][this.x + j] = this.char;
            }
        }
    }
}
