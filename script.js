const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 450

ctx.fillRect(0, 0, canvas.width, canvas.height)

var mouse = {
    x: 0,
    y: 0
}

canvas.addEventListener('pointermove', (e) => {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.pageX - rect.left
    mouse.y = e.pageY - rect.top
})

// canvas.addEventListener('pointerleave', death)

const player = new Player({
    position: {
        x: 0,
        y: 0
    },
})

const enemy = new Triangle({
    position: {
        x: 300,
        y: 200
    },
    velocity: {
        x: 0,
        y: 0
    },
    speed: 5
})

function animate() {
    window.requestAnimationFrame(animate) 
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    enemy.update()
    player.update()
}

function startup() {
    const startupScreen = document.querySelector(".startup");
    const lines = startupScreen.querySelectorAll("p");
    lines.forEach((line, i) => {
        setTimeout(() => {
            line.classList.remove("hidden");
            if(i === 2) {
            setTimeout(() => {
            startupScreen.classList.add("hidden");
            animate();
            }, 400)
            }
        }, i*200)
    });
}

window.onload = () => {
    startup()
    fullscreen(document.querySelector("#game"))
}