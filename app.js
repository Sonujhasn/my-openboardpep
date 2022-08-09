const express=require("express")
const socket=require("socket.io")

const app=express() //initialized and server ready
app.use(express.static("public"))
let port=5000;
let server=app.listen(port,()=>{
   console.log("listing to port "+port)
})

let io=socket(server)
io.on("connection",(socket)=>{
    console.log("made socket connection")
   //recieved data
    socket.on("beginPath",(data)=>{
        //transfer data to all
        io.sockets.emit("beginPath",data)
    })
    socket.on("drawstroke",(data)=>{
        io.sockets.emit("drawstroke",data)
    })

    socket.on("redoundo",(data)=>{
        io.sockets.emit("redoundo",data)
    })
})