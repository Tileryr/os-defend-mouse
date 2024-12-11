const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.fillRect(0, 0, canvas.width, canvas.height)

var mouse = {
    x: 0,
    y: 0
}
document.addEventListener('pointermove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
})

function lerp(a, b, t) {
    return a+(b-a)*t
}

const player = new Player({
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
})

const enemy = new Enemy({
    position: {
        x: 300,
        y: 200
    },
    velocity: {
        x: 0,
        y: 10
    }
})

function animate() {
    window.requestAnimationFrame(animate) 
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    enemy.update()
    player.update()
}

animate()