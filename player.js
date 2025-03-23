class player extends collisionObjectRect {
    constructor(x = 0, y = 0) {
        let width = 20;
        let height = 20;
        let color = {
            r: 255,
            g: 0,
            b: 0
        }
        let editingOffsets = []
        super(x, y, width, height, color, editingOffsets)
        this.speed = 30;
    }
    main() {
        this.move()
        this.ObjMain()
        this.correctPlayer()
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