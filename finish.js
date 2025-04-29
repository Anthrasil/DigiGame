class finish extends collisionObjectRect {
    constructor(x,y,width,height) {
        let color={r:0,g:255,b:0}
        let editingInputOffsets=["x","y","width","height"]
        super(x,y,width,height,color,editingInputOffsets)
    }
    main(Player) {
        this.ObjMain()
        if (this.ifTouchedByPlayer(Player)) {
            init(0);
            alert("Cleart")
        }
    }
    ifTouchedByPlayer(Player) {
        if (Player.x+Player.width>=this.x&&Player.x<=this.x+this.width&&Player.y+Player.height>=this.y&&Player.y<=this.y+this.height) return true;
        return false
    }
}
