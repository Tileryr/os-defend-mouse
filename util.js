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

function resizeWindow() {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight  
}

function fullscreen(element) {
    element.classList.add("fullscreen")
    window.onresize = debounce(() => resizeWindow())
}