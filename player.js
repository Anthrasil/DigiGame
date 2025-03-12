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
    }
}
