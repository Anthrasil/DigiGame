class player extends collisionObjectRect {
    constructor(x = 0, y = 0) {
        let width = 20;
        let height = 20;
        let color = {
            r: 255,
            g: 0,
            b: 0
        }
        let editingOffsets = ["Allowed"]
        super(x, y, width, height, color, editingOffsets)
        this.speed = 30;
        this.Allowed = {
            left: true,
            right: true,
            down: true,
            up: true
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.maxVelocity = 10000
    }
    main() {
        this.move()
        this.ObjMain()
    }
    move() {
        this.correctPlayer()
        if (keys["ArrowUp"] && this.Allowed.up) {
            this.velocity.y = Math.max(this.velocity.y - this.speed, -this.maxVelocity)
        }
        if (keys["ArrowDown"] && this.Allowed.down) {
            this.velocity.y = Math.min(this.velocity.y + this.speed, this.maxVelocity)
        }
        if (keys["ArrowLeft"] && this.Allowed.left) {
            this.velocity.x = Math.max(this.velocity.x - this.speed, -this.maxVelocity)
        }
        if (keys["ArrowRight"] && this.Allowed.right) {
            this.velocity.x = Math.min(this.velocity.x + this.speed, this.maxVelocity)
        }
        this.x += this.velocity.x
        this.y += this.velocity.y
        this.velocity.x *= 0.97
        this.velocity.y *= 0.97
        this.Allowed.down = true
        this.Allowed.left = true
        this.Allowed.right = true
        this.Allowed.up = true
    }
    correctPlayer() {
        if (this.x + this.velocity.x <= 0) {
            this.Allowed.left = false
            this.velocity.x = 0
        }
        if (this.x + this.width + this.velocity.x >= canvasElement.width) {
            this.Allowed.right = false
            this.velocity.x = 0
        }
        if (this.y + this.velocity.y <= 0) {
            this.Allowed.up = false
            this.velocity.y = 0
        }
        if (this.y + this.height + this.velocity.y >= canvasElement.height) {
            this.Allowed.down = false
            this.velocity.y = 0
        }
    }
    collide(x, y, width, height) {
        let border = 1
        if (this.x + this.velocity.x <= x + width && this.y + this.height >= y && this.y <= y + height && this.x >= x + width - border) {
            this.Allowed.left = false
            this.velocity.x = 0
        }
    }
}