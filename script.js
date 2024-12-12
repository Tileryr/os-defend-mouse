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

function lerp(a, b, t) {
    return a+(b-a)*t
}

function death() {window.location.reload()}

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

function debounce(func, timeout = 300) {
    console.log(func)
    
    let timer;
    console.log(timer)
    return (...args) => {
        console.log("size")
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
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

function resizeWindow() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight
    
}
function fullscreen(element) {
    element.classList.add("fullscreen")
    window.onresize = debounce(() => resizeWindow())
}

window.onload = () => {
    startup()
    fullscreen(document.querySelector("#game"))
}