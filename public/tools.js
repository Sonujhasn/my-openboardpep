let optionscont=document.querySelector(".options-cont")
let toolscont=document.querySelector(".tools-cont")
let penciltoolcont=document.querySelector(".pencil-tool-cont")
let erasertoolcont=document.querySelector(".eraser-tool-cont")
let pencil=document.querySelector(".pencil")
let eraser=document.querySelector(".eraser")
let sticky=document.querySelector(".sticky")
let upload=document.querySelector(".upload")
let optionsflag=true;
let pencilflag=false;
let eraserflag=false;
optionscont.addEventListener("click",(e)=>{
    optionsflag=!optionsflag
    
    if(optionsflag){
       opentool()
    }else{
      closetool()
    }
})
function opentool(){
    let iconelem=optionscont.children[0]
    iconelem.classList.remove("fa-times")
    iconelem.classList.add("fa-bars")
    toolscont.style.display="flex"
}
function closetool(){
    let iconelem=optionscont.children[0]
    iconelem.classList.remove("fa-bars")
    iconelem.classList.add("fa-times")
    toolscont.style.display="none"
    penciltoolcont.style.display="none"
    erasertoolcont.style.display="none"
}
pencil.addEventListener("click",(e)=>{
    //true-show pencil-tool
    //false hide pencil tool
    pencilflag=!pencilflag
    if(pencilflag){
        penciltoolcont.style.display="block"
    }else{
        penciltoolcont.style.display="none"
    }
})

eraser.addEventListener("click",(e)=>{
    //true-show pencil-tool
    //false hide pencil tool
    eraserflag=!eraserflag
    if(eraserflag){
        erasertoolcont.style.display="flex"
    }else{
        erasertoolcont.style.display="none"
    }
})
upload.addEventListener("click",(e)=>{
    //open file explorer
    let input=document.createElement("input")
    input.setAttribute("type","file")
    input.click()
    input.addEventListener("change",(e)=>{
        let file=input.files[0]
        let url=URL.createObjectURL(file)
        
        let stickycont=document.createElement("div")
        stickycont.setAttribute("class","sticky-cont")
        stickycont.innerHTML=`
         <div class="header-cont">
           <div class="minimize"></div>
          <div class="remove"></div>
         </div>
          <div class="note-cont">
            <img src="${url}"/>
          </div>
        `
        document.body.appendChild(stickycont)
        let minimize=stickycont.querySelector(".minimize")
        let remove=stickycont.querySelector(".remove")
         noteAction(minimize,remove,stickycont)
        stickycont.onmousedown = function(event){
            draganddrop(stickycont,event)
        };
        stickycont.ondragstart=function(){
            return false;
        };
    })
   
})

sticky.addEventListener("click",(e)=>{
    let stickycont=document.createElement("div")
    stickycont.setAttribute("class","sticky-cont")
    stickycont.innerHTML=`
     <div class="header-cont">
       <div class="minimize"></div>
      <div class="remove"></div>
     </div>
      <div class="note-cont">
       <textarea spellcheck="false"></textarea>
      </div>
    `
    document.body.appendChild(stickycont)
    let minimize=stickycont.querySelector(".minimize")
    let remove=stickycont.querySelector(".remove")
     noteAction(minimize,remove,stickycont)
    stickycont.onmousedown = function(event){
        draganddrop(stickycont,event)
    };
    stickycont.ondragstart=function(){
        return false;
    };
    
})
function draganddrop(ball,event){
        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;
      
        ball.style.position = 'absolute';
        ball.style.zIndex = 1000;
      
        moveAt(event.pageX, event.pageY);
      
        // moves the ball at (pageX, pageY) coordinates
        // taking initial shifts into account
        function moveAt(pageX, pageY) {
          ball.style.left = pageX - shiftX + 'px';
          ball.style.top = pageY - shiftY + 'px';
        }
      
        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }
      
        // move the ball on mousemove
        document.addEventListener('mousemove', onMouseMove);
      
        // drop the ball, remove unneeded handlers
        ball.onmouseup = function() {
          document.removeEventListener('mousemove', onMouseMove);
          ball.onmouseup = null;
        };
}
function noteAction(minimize,remove,stickycont){
    remove.addEventListener("click",(e)=>{
        stickycont.remove();
    })
    minimize.addEventListener("click",(e)=>{
        let notecont=stickycont.querySelector(".note-cont")
        let display=getComputedStyle(notecont).getPropertyValue("display")
        if(display==="none"){
            notecont.style.display="block"
        }else{
            notecont.style.display="none"
        }
    })
}