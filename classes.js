class Entity {
    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.height = 30
    }

    draw() {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.position.x, this.position.y, 30, this.height)
    }

    update() {
        this.draw()
    }
}

class Player extends Entity {
    draw() {
        ctx.strokeStyle = 'blue'
        ctx.strokeRect(this.position.x, this.position.y, 30, this.height)
    }

    update() {
        this.draw()
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0
        } else {
            this.position.y = lerp(this.position.y, mouse.y - 15, 0.1)
            this.position.x = lerp(this.position.x, mouse.x - 15, 0.1)
        }
    }
}

class Enemy extends Entity {
    draw() {
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.position.x, this.position.y, 30, this.height)
    }
}

