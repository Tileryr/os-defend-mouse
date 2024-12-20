const playerPercent = 0.02
var playerWidth

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

function lerp(a, b, t) {
    return a+(b-a)*t
}

function death() {window.location.reload()}

// UNITS
function widthPercent(percent) {
    return canvas.width*percent
}
function heightPercent(percent) {
    return canvas.height*percent
}

function resizeWindow() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight - 0;
    playerWidth = widthPercent(playerPercent)
}

function fullscreen(element) {
    element.classList.add("fullscreen")
    resizeWindow()
    window.onresize = debounce(() => resizeWindow())
}

function makeShape(position, sides, radius, rotation = 0) {
    let number = (rotation/Math.PI)*3
    let shapeXs = []
    let shapeYs = []
    for (let index = 0; index <= sides-1; index++) {
        shapeXs.push(position.x + radius * Math.cos((number+index*(6/sides))*Math.PI/3))
        shapeYs.push(position.y + radius * Math.sin((number+index*(6/sides))*Math.PI/3))
    }
    return {
        x: shapeXs,
        y: shapeYs
    }
}

function rectangularCollision( rectangle1, rectangle2 ) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.length >= rectangle2.attackBox.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.attackBox.position.x + rectangle2.attackBox.length &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.length >= rectangle2.attackBox.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.attackBox.position.y + rectangle2.attackBox.length
    )
}