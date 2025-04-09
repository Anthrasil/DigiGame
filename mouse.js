let mouse = { x: -100, y: -100, pressed: false }
document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
})
document.addEventListener("mousedown", (e) => { mouse.pressed = true })
document.addEventListener("mouseup", (e) => { mouse.pressed = false })