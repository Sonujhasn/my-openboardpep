let canvas=document.querySelector("canvas")
canvas.width=window.innerWidth
canvas.height=window.innerHeight

let redo=document.querySelector(".redo")
let undo=document.querySelector(".undo");
let download=document.querySelector(".download")
let pencilcolor=document.querySelectorAll(".pencil-color")
let pencilwidthele=document.querySelector(".pencil-width")
let eraserwidthele=document.querySelector(".eraser-width")

let pencolor="red"
let eracolor="white"
let penwidth=pencilwidthele.value;
let erawidth=eraserwidthele.value;

let undoredoTrack=[] //data
let track=0 //represent which action from tracker array


let mousedown=false;
//api
let tool=canvas.getContext("2d")
tool.lineWidth=penwidth
tool.strokeStyle=pencolor
//tool.strokeStyle="blue"
//tool.lineWidth="8"
//tool.beginPath() //new grapic(path) (line)
//tool.moveTo(10,10)  //start point
//tool.lineTo(100,150)//end point
//tool.stroke()  //fill color  (fill graphic)

//tool.lineTo(200,200)
//tool.stroke()

//mousedown -> start new path,mousemove->path fill
canvas.addEventListener("mousedown",(e)=>{
    mousedown=true
    //tool.beginPath()
    //tool.moveTo(e.clientX,e.clientY)
    let data={
        x:e.clientX,
        y:e.clientY
    }
    socket.emit("beginPath",data)

})
canvas.addEventListener("mousemove",(e)=>{
    if(mousedown){
        //tool.lineTo(e.clientX,e.clientY)
        //tool.stroke()
        let data={
            x:e.clientX,
            y:e.clientY,
            color:eraserflag ? eracolor : pencolor,
            width:eraserflag ? erawidth : penwidth
        }
        socket.emit("drawstroke",data)
    }
   
})
canvas.addEventListener("mouseup",(e)=>{
    mousedown=false
    let url=canvas.toDataURL()
    undoredoTrack.push(url)
    track=undoredoTrack.length-1;
})
undo.addEventListener("click",(e)=>{
  if(track>0) track--;
  //track action
  let data={
    trackvalue:track,
    undoredoTrack
  }
  socket.emit("redoundo",data)
  //undoredocanvas(trackobj)
})
redo.addEventListener("click",(e)=>{
    if(track<undoredoTrack.length-1) track++;
    let data={
        trackvalue:track,
        undoredoTrack
      }
      socket.emit("redoundo",data)
      //undoredocanvas(trackobj)
})
 function beginpath(strokeobj){
    tool.beginPath()
    tool.moveTo(strokeobj.x,strokeobj.y)
 }
 function drawStroke(strokeObj) {
    tool.strokeStyle = strokeObj.color;
    tool.lineWidth = strokeObj.width;
    tool.lineTo(strokeObj.x, strokeObj.y);
    tool.stroke();
}

function undoredocanvas(trackobj){
   track=trackobj.trackvalue
   undoredoTrack=trackobj.undoredoTrack
   let url=undoredoTrack[track]
   let img=new Image();//new image refernce
   img.src=url
   img.onload=(e)=>{
    tool.drawImage(img,0,0,canvas.width,canvas.height)
   }
}


pencilcolor.forEach((colorEle)=>{
    colorEle.addEventListener("click",(e)=>{
        let color=colorEle.classList[0]
        pencolor=color
        tool.strokeStyle=pencolor
    })
})
pencilwidthele.addEventListener("change",(e)=>{
    penwidth=pencilwidthele.value
    tool.lineWidth=penwidth
})
eraserwidthele.addEventListener("change",(e)=>{
    erawidth=eraserwidthele.value
    tool.lineWidth=erawidth
})

eraser.addEventListener("click",(e)=>{
    if(eraserflag){
        tool.strokeStyle=eracolor
        tool.lineWidth=erawidth
    }else{
        tool.strokeStyle=pencolor
        tool.lineWidth=penwidth
    }
})

download.addEventListener("click",(e)=>{
    let url=canvas.toDataURL()
    let a =document.createElement("a")
    a.href=url
    a.download="board.jpg"
    a.click();
})

socket.on("beginPath",(data)=>{
     beginpath(data)
})
socket.on("drawstroke",(data)=>{
   drawStroke(data)
})

socket.on("redoundo",(data)=>{
    undoredocanvas(data)
})