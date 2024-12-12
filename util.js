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