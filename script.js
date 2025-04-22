let canvasElement = document.querySelector("#canvas")
let Monitor = document.querySelector("#monitor")
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx = canvasElement.getContext("2d")
let Field = new programmField()
let Player = new player(20, 20)
let collisionObjects = []
collisionObjects[0] = new collisionObjectRect(200, 200, 50, 50)
let textflag = new cursoreffects.textFlag({ text: " ", color: ["#FF6800"] })
setInterval(function () { main() }, 10)
function init() {
    Player = new player(20, 20)
    collisionObjects[0] = new collisionObjectRect(200, 200, 50, 50)
}
function main() {
    canvasElement.width = window.innerWidth
    canvasElement.height = window.innerHeight
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    Field.main()
    for (let i = 0; i < collisionObjects.length; i++) {
        collisionObjects[i].ObjMain()
        Player.collide(collisionObjects[i].x, collisionObjects[i].y, collisionObjects[i].width, collisionObjects[i].height)
    }
    Player.main()
}
document.addEventListener("keydown", (e) => {
    if (e.key == "R") {
        init()
    }
})
