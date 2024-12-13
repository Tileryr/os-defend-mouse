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
    canvas.height = document.body.clientHeight  
    playerWidth = widthPercent(playerPercent)
}

function fullscreen(element) {
    element.classList.add("fullscreen")
    resizeWindow()
    window.onresize = debounce(() => resizeWindow())
}

function makeShape(position, sides, radius, rotation = 0) {
    let number = (rotation/Math.PI)*3
    // let newShape = {
    //     //the first vertex is on the circumscribed circle at 0 radians where R is the radius of the circle ( R)
    //     //you may decide to change this.
    //     x1: position.x + radius * Math.cos(number*Math.PI/3),
    //     y1: position.y + radius * Math.sin(number*Math.PI/3),
    //     //the second vertex is on the circumscribed circle at 2*Math.PI/3 radians 
    //     //you may decide to change this.
    //     x2: position.x + radius * Math.cos((number+2)*Math.PI/3),
    //     y2: position.y + radius * Math.sin((number+2)*Math.PI/3),
    //     //calculate the 3-rd vertex
    //     x3: position.x + radius * Math.cos((number+4)*Math.PI/3),
    //     y3: position.y + radius * Math.sin((number+4)*Math.PI/3)
    // };
    let shapeXs = []
    let shapeYs = []
    for (let index = 0; index <= sides-1; index++) {
        shapeXs.push(position.x + radius * Math.cos((number+index*(6/sides))*Math.PI/3))
        shapeYs.push(position.y + radius * Math.sin((number+index*(6/sides))*Math.PI/3))
        // newShape[`x${index+1}`] = position.x + radius * Math.cos((number+index*(6/sides))*Math.PI/3)
        // newShape[`y${index+1}`] = position.y + radius * Math.sin((number+index*(6/sides))*Math.PI/3)
    }
    // console.log(newShape)
    
    return {
        x: shapeXs,
        y: shapeYs
    }
}
