class player extends collisionObjectRect {
    constructor(x = 0, y = 0) {
        let width = 20;
        let height = 20;
        let color = {
            r: 255,
            g: 0,
            b: 0
        }
        let editingOffsets = ["Allowed", "velocity"]
        super(x, y, width, height, color, editingOffsets)
        this.speed = 0.5;
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
        this.ObjMain()
        this.move()
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
    stop(x, valuePosition, valueDirection, size = []) {
        let valuesize = "width"
        if (valuePosition === "y") {
            valuesize = "height"
        }
        if (size == []) {
            if (this[valuePosition] + this.velocity[valuePosition] <= x) {
                this.Allowed[valueDirection] = false
                this.velocity[valuePosition] = Math.min(x - this[valuePosition], 0)
                if (this[valuePosition] < x) {
                    this[valuePosition] = x
                }
            }
        } else {
            if (this[valuePosition] + this[valuesize] + this.velocity[valuePosition] >= width) {
                this.Allowed[valueDirection] = false
                this.velocity[valuePosition] = Math.max(width - this[valuePosition], 0)
            }
        }
    }
    correctPlayer() {
        this.stop(0, "x", "left")
        this.stop(0, "x", "right", canvasElement.width)
        /*if (this.x + this.width + this.velocity.x >= canvasElement.width) {
            this.Allowed.right = false
            this.velocity.x = 0
        }*/
        this.stop(0, "y", "up")
        if (this.y + this.height + this.velocity.y >= canvasElement.height) {
            this.Allowed.down = false
            this.velocity.y = 0
        }
    }
    collide(x, y, width, height) {
        this.stop(x + width + 1, "x", "left")
    }
}