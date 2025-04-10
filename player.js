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
        this.speed = 3;
    }
    main() {
        this.ObjMain()
        this.move()
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
    collide(x, y, width, height) {
        if (this.x + this.width > x && this.y + this.height > y && this.y < y + height && this.x < x) {
            this.x = x - this.width
        }
        if (this.x < x + width && this.y + this.height > y && this.y < y + height && this.x > 1) {
            this.x = x + width
        }
        if (this.x > x + this.width && this.y + this.height > y && this.y < y && this.x < x + width) {
            this.y = y - this.height
        }
    }
}