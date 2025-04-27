class player extends collisionObjectRect {
    constructor(x = 0, y = 0,width,height) {
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
    stopBorder(x, valuePosition, valueDirection, size = null) {
        let SizeSelector = "width"
        if (valuePosition == "y") {
            SizeSelector = "height"
        }
        if (size == null) {
            if (this[valuePosition] + this.velocity[valuePosition] <= x) {
                this.Allowed[valueDirection] = false
                this.velocity[valuePosition] = Math.min(x - this[valuePosition], 0)
                if (this[valuePosition] < x) {
                    this[valuePosition] = x
                }
            }
        } else {
            if (this[valuePosition] + this[SizeSelector] + this.velocity[valuePosition] >= size) {
                this.Allowed[valueDirection] = false
                this.velocity[valuePosition] = Math.max(size - this[valuePosition] - this[SizeSelector], 0)
                if (this[valuePosition] + this[SizeSelector] > size) {
                    this[valuePosition] = size - this[SizeSelector]
                }
            }
        }
    }
    correctPlayer() {
        this.stopBorder(0, "x", "left")
        this.stopBorder(0, "x", "right", canvasElement.width)
        this.stopBorder(0, "y", "up")
        this.stopBorder(0, "y", "down", canvasElement.height)
    }
    collide(x, y, width, height) {
        if (this.x + this.width >= x && this.x <= x + width && this.y + this.height >= y && this.y <= y + height) {
            let dir = {
                x: 0,
                y: 0
            }
            if (this.x + this.width >= x && this.x < x) {
                this.Allowed.right = false
                this.velocity.x = Math.min(x - this.x - this.width, 0)
                if (this.x + this.width > x) {
                    this.x = x - this.width
                }
                dir.x++
            }
            if (this.y + this.height >= y && this.y < y) {
                this.Allowed.down = false
                this.velocity.y = Math.min(y - this.y - this.height, 0)
                if (this.y + this.height > y) {
                    this.y = y - this.height
                }
                dir.y++
            }
            if (this.x <= x + width && this.x + this.width > x + width) {
                this.Allowed.left = false
                this.velocity.x = Math.max(x + width - this.x, 0)
                if (this.x < x + width) {
                    this.x = x + width
                }
                dir.x--
            }
            if (this.y <= y + height && this.y + this.height > y + height) {
                this.Allowed.up = false
                this.velocity.y = Math.max(y + height - this.y, 0)
                if (this.y < y + height) {
                    this.y = y + height
                }
                dir.y--
            }

            this.velocity.x = dir.x * -0.1
            this.velocity.y = dir.y * -0.1
        }
    }
}