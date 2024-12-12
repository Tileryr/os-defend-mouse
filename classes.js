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
        ctx.strokeStyle = 'white'
        ctx.lineWidth = '4'
        ctx.shadowBlur = 5
        ctx.shadowColor = 'white'
        ctx.strokeRect(this.position.x, this.position.y, 30, this.height)
    }

    update() {
        this.draw()
        this.position.y = lerp(this.position.y, mouse.y - 15, 0.1)
        this.position.x = lerp(this.position.x, mouse.x - 15, 0.1)
    }
}

class Enemy extends Entity {
    draw() {
        ctx.shadowBlur = 0
        ctx.strokeStyle = 'red'
        ctx.strokeRect(this.position.x, this.position.y, 30, this.height)
    }
}

