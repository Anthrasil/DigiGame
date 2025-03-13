let canvasElement = document.querySelector("#canvas")
/**
 * @type {canvas}
 */
let ctx = canvasElement.getContext("2d")

setInterval(function () { main() }, 10)
let Player = new player(20, 20)
function main() {
    canvasElement.width = window.innerWidth
    canvasElement.height = window.innerHeight
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    Player.main()
}