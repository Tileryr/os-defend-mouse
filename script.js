const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillRect(0, 0, canvas.width, canvas.height)

class Entity {
    constructor(position) {
        this.position = position
    }

    draw() {
        ctx.fillStyle = 'blue'
        ctx.fillRect(this.position.x, this.position.y, 30, 30)
    }
}

const player = new Entity({
    x: 0,
    y: 0
})

player.draw()
console.log(player)