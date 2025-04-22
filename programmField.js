class programmField {
    constructor() {
        this.input = document.querySelector("#editing")
        this.width = 200
        this.height = 200
        this.updatePosition()
        this.allowed = false
        this.showed = false
        this.borderRadius = 10
    }
    main() {
        this.allowed = this.AllowedToShow()
        this.show()
        this.hide()
    }
    updatePosition() {
        this.x = mouse.x
        this.y = mouse.y
        this.CenterX = this.x - this.width / 2
        this.CenterY = this.y - this.height / 2
    }
    show() {
        if (!this.allowed) {
            return false
        }
        if (!this.showed) {
            this.updatePosition()
            this.input.value = ""
            locked = true
        }
        this.input.style.display = "block"
        this.input.style.left = `${this.CenterX}px`
        this.input.style.top = `${this.CenterY}px`
        this.input.style.width = `${this.width}px`
        this.input.style.height = `${this.height}px`
        this.showed = true
    }
    hide() {
        if (!this.showed || this.allowed) {
            return
        }
        try {
            eval(this.input.value)
        } catch (err) {
            console.error(err)
        }
        this.input.style.display = "none"
        this.showed = false
        locked = false
    }
    AllowedToShow() {
        if (keys["P"]) {
            keys["P"] = false
            return true
        }
        if (this.allowed && mouse.x >= this.CenterX - this.borderRadius && mouse.x <= this.CenterX + this.width + this.borderRadius && mouse.y >= this.CenterY - this.borderRadius && mouse.y <= this.CenterY + this.height + this.borderRadius) {
            return true
        }
        return false
    }
}