let keys = {}
let locked = false
document.addEventListener("keydown", (e) => {
    if (!locked) {
        keys[e.key] = true
    }
})
document.addEventListener("keyup", (e) => {
    if (!locked) {
        keys[e.key] = false
    }
})