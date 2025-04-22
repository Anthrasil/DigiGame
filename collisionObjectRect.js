class collisionObjectRect {
    constructor(x = 0, y = 0, width = 0, height = 0, color = { r: 0, g: 0, b: 0 }, editingOffsets = []) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color_r = color.r
        this.color_g = color.g
        this.color_b = color.b
        this.editingInputWidth = 200
        this.editingInputHeight = 200
        this.editingInputOffsetX = 0
        this.editingInputOffsetY = 0
        this.editing = false;
        this.editingInput = document.querySelector("#editing")
        this.editingOffsets = ["editingOffsets", "editingInput", "editing", "editingInputOffsetX", "editingInputOffsetY", "x", "y"]
        this.editingOffsets = this.editingOffsets.concat(editingOffsets)
    }
    ObjMain() {
        this.draw()
        this.controlEdit()
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = `rgb(${this.color_r},${this.color_g},${this.color_b})`;
        ctx.fillStyle = `rgb(${this.color_r}, ${this.color_g}, ${this.color_b})`;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }
    checkIfHovered() {
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
            this.updateEdit()
            if (!mouse.pressed && !this.checkIfHovered() && !this.checkIfHoveredEditingInput()) {
                this.editing = false
                this.hideEdit()
            }
        } else {
            this.editing = this.checkIfHovered()
            if (this.editing) {
                this.showEdit()
            }
        }
    }
    hideEdit() {
        locked = false
        this.editingInput.style.display = "none"
        let lines = this.editingInput.value.split("\n")
        lines.forEach((line) => {
            let key = line.split("=")[0]
            let value = line.split("=")[1]
            if (key != undefined && value != undefined) {
                let NumberValue = parseFloat(value)
                if (!isNaN(NumberValue)) {
                    let editAllowed = true
                    for (let i = 0; i < this.editingOffsets.length; i++) {
                        if (key == this.editingOffsets[i]) {
                            editAllowed = false
                            break;
                        }
                    }
                    if (editAllowed) {
                        this[key] = NumberValue
                    }
                }
            }
        })
    }
    updateEdit() {
        let distanceX = 5
        this.editingInputOffsetX = this.width + distanceX
        this.editingInputOffsetY = 0
        if (this.x + distanceX + this.width + this.editingInputWidth > canvasElement.width) {
            this.editingInputOffsetX = -this.editingInputWidth - distanceX * 2
        }
        if (this.y + this.editingInputHeight > canvasElement.height) {
            this.editingInputOffsetY = -this.editingInputHeight
        }
        this.editingInput.style.width = this.editingInputWidth + "px"
        this.editingInput.style.height = this.editingInputHeight + "px"
        this.editingInput.style.left = this.x + this.editingInputOffsetX + "px"
        this.editingInput.style.top = this.y + this.editingInputOffsetY + "px"
    }
    showEdit() {
        locked = true
        let distanceX = 5
        this.editingInputOffsetX = this.width + distanceX
        this.editingInputOffsetY = 0
        if (this.x + distanceX + this.width + this.editingInputWidth > canvasElement.width) {
            this.editingInputOffsetX = -this.editingInputWidth - distanceX * 2
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
}