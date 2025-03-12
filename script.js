let canvas = document.querySelector("#canvas")

let ctx = canvas.getContext("2d")
ctx.beginPath()
ctx.fillStyle = "black"
ctx.stroke = "black"
ctx.rect(0, 0, 20, 20)
ctx.fill()
ctx.closePath()