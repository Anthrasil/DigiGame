let canvasElement = document.querySelector("#canvas")
/**
 * @type {canvas}
 */
let ctx = canvasElement.getContext("2d")

setInterval(main, 10)
let Player = new player(20, 20)
function main() {
    canvasElement.style.width = document.innerWidth + "px"
    canvasElement.style.height = document.innerHeight + "px"
    Player.main()
}
