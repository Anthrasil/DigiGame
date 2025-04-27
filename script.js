let canvasElement = document.querySelector("#canvas")
let Monitor = document.querySelector("#monitor")
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx = canvasElement.getContext("2d")
console.log(LevelStruct([20,20,20,20,[[500,0,200,500],[500,510,200,10000]]],[1000,200,20,20],"The box you write init in is a code insertin use it to solve this Level"))
let Level={
    0:{placeholder:"Use init(levelNumber) to start the Level.\nLevel 1-3 are useable."},
    1:LevelStruct([20,20,20,20],[],[1000,200,20,20],"Try to get to the green box, it's the goal"),
    2:LevelStruct([20,20,20,20],[[500,0,200,1000000]],[1000,200,20,20],"Try to edit the black box so that you can go to the finish."),
    3:LevelStruct([20,20,20,20],[[500,0,200,500],[500,520,200,10000]],[1000,200,20,20],"The box you write init in is a code insertion use it to solve this Level")
}
let Field = new programmField("Skibidi")
let Player = null
let collisionObjects = []
let textflag = new cursoreffects.textFlag({ text: " ", color: ["#FF6800"] })
let Finish=null
let mainLoop=setInterval(function () { main() }, 10)
let LevelNow=0;
function init(Then) {
    LevelNow=Then
    if (Level==0) {
        collisionObjects=[]
        Player=null
        Finish=null
        return
    }
    let Used=Level[Then]
    let UPlayer=Used.player
    Player=new player(UPlayer.x,UPlayer.y,UPlayer.width,UPlayer.height)
    let UFinish=Used.finish
    Finish=new finish(UFinish.x,UFinish.y,UFinish.width,UFinish.height)
    Used.collisionObjects.forEach(el=>{
        collisionObjects.push(new collisionObjectRect(el.x,el.y,el.width,el.height))
    })
}
function main() {
    canvasElement.width = window.innerWidth
    canvasElement.height = window.innerHeight
    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    Field.main(Level[LevelNow].placeholder)
    
    try {
        if (LevelNow==0) return
        for (let i = 0; i < collisionObjects.length; i++) {
            collisionObjects[i].ObjMain()
            Player.collide(collisionObjects[i].x, collisionObjects[i].y, collisionObjects[i].width, collisionObjects[i].height)
        }
        Finish.main(Player)
        Player.main()
    } catch{}
}
function LevelStruct(Player,CollisionObjects,Finish,Placeholder) {
    let collisionOut=[]
    CollisionObjects.forEach(el => {
        collisionOut.push({x:el[0],y:el[1],width:el[2],height:el[3]})
    });
    return {player:{x:Player[0],y:Player[1],width:Player[2],height:Player[3]},collisionObjects:collisionOut,finish:{x:Finish[0],y:Finish[1],width:Finish[2],height:Finish[3]},placeholder:Placeholder}
}
document.addEventListener("keydown", (e) => {
    if (e.key == "R") {
        init(0)
    }
})
