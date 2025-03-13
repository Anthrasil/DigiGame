class player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = 3
    }
    main() {
        this.move()
        this.draw()
        this.checkIfCklicked()
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "grey";
        ctx.rect(this.x, this.y, this.width, this.height);
        //ctx.circle(this.x, this.y, 10);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    checkIfCklicked() {
        if (mouse.x >= this.x && mouse.y >= this.y && mouse.x <= this.x + this.width && mouse.y <= this.y + this.height) {
            this.showEdit()
        }
    }
    showEdit() {
        let width = 100
        let offsetX = width
        let offsetY = 0
        let height = 200
        ctx.beginPath()
        ctx.fillStyle = "white"
        ctx.strokeStyle = "black"
        if (this.x + this.width + width > canvasElement.width) {
            offsetX = -width
        }
        if (this.y + height > canvasElement.height) {
            offsetY = -height
        }
        ctx.rect(this.x + offsetX, this.y + offsetY, width, height)

        ctx.fill()
        ctx.stroke()
        ctx.closePath()
    }
    edit() {

    }
    move() {
        if (keys["ArrowUp"]) {
            this.y -= this.speed
        }
        if (keys["ArrowDown"]) {
            this.y += this.speed
        }
        if (keys["ArrowLeft"]) {
            this.x -= this.speed
        }
        if (keys["ArrowRight"]) {
            this.x += this.speed
        }
        this.correctPlayer()
    }
    correctPlayer() {
        if (this.x < 0) {
            this.x = 0
        }
        if (this.x + this.width > canvasElement.width) {
            this.x = canvasElement.width - this.width
        }
        if (this.y < 0) {
            this.y = 0
        }
        if (this.y + this.height > canvasElement.height) {
            this.y = canvasElement.height - this.height
        }
    }
}
