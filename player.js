class player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.speed = 30;
        this.editingInputWidth = 200
        this.editingInputHeight = 200
        this.editingInputOffsetX = 0
        this.editingInputOffsetY = 0
        this.editing = false;
        this.editingInput = document.querySelector("#editing")
        this.editingOffsets = ["editingOffsets", "editingInput", "editing", "editingInputOffsetX", "editingInputOffsetY", "x", "y"]
    }
    main() {
        this.move()
        this.draw()
        this.controlEdit()
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.fillStyle = "grey";
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    checkIfHoveredPlayer() {
        if (mouse.x >= this.x && mouse.y >= this.y && mouse.x <= this.x + this.width && mouse.y <= this.y + this.height) {
            return true
        }
        return false
    }
    checkIfHoveredEditingInput() {
        if (!this.editing) {
            return false
        }
        if (mouse.x >= this.x + this.editingInputOffsetX && mouse.y >= this.y + this.editingInputOffsetY && mouse.x <= this.x + this.editingInputOffsetX + this.editingInputWidth && mouse.y <= this.y + this.editingInputOffsetY + this.editingInputHeight) {
            return true
        }
        return false
    }
    controlEdit() {
        if (this.editing) {
            if (!mouse.pressed && !this.checkIfHoveredPlayer() && !this.checkIfHoveredEditingInput()) {
                this.editing = false
                this.hideEdit()
            }
        } else {
            this.editing = this.checkIfHoveredPlayer()
            if (this.editing) {
                this.showEdit()
            }
        }
    }
    hideEdit() {
        this.editingInput.style.display = "none"
        let lines = this.editingInput.value.split("\n")
        lines.forEach((line) => {
            let key = line.split("=")[0]
            let value = line.split("=")[1]
            if (key != undefined && value != undefined) {
                let NumberValue = parseFloat(value)
                if (!isNaN(NumberValue)) {
                    this[key] = NumberValue
                }
            }
            this.correctPlayer()
        })
    }
    showEdit() {
        let distanceX = 5
        this.editingInputOffsetX = this.x + distanceX
        this.editingInputOffsetY = 0
        if (this.x + this.width + this.editingInputWidth > canvasElement.width) {
            this.editingInputOffsetX = -this.editingInputWidth - distanceX
        }
        if (this.y + this.editingInputHeight > canvasElement.height) {
            this.editingInputOffsetY = -this.editingInputHeight
        }
        this.editingInput.style.width = this.editingInputWidth + "px"
        this.editingInput.style.height = this.editingInputHeight + "px"
        this.editingInput.style.left = this.x + this.editingInputOffsetX + "px"
        this.editingInput.style.top = this.y + this.editingInputOffsetY + "px"
        this.editingInput.style.display = "block"
        let text = ""
        for (let i = 0; i < Object.keys(this).length; i++) {
            let key = Object.keys(this)[i]
            let putValueIn = true
            for (let i = 0; i < this.editingOffsets.length; i++) {
                if (key === this.editingOffsets[i]) {
                    putValueIn = false
                }
            }
            if (putValueIn) {
                let value = this[key]
                text += key + "=" + value + "\n"
            }
        }
        this.editingInput.value = text
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