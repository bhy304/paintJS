const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");

canvas.width = 700;
canvas.height = 700; 

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        //console.log("creating path in", x, y);
        ctx.beginPath(); //path is a line.
        ctx.moveTo(x, y);
    } else {
        //lineTo and stroke is happening every time I am moving the mouse.
        //console.log("creating line in", x, y);
        ctx.lineTo(x, y);
        ctx.stroke(); //strokes the current sub-paths with the current stroke style.
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); //마우스를 클릭했을 때 발생
    canvas.addEventListener("mouseup", stopPainting); //마우스를 떼는 순간 발생
    canvas.addEventListener("mouseleave", stopPainting);
}

//Changing Color 
Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick)
);

//Brush Size
if(range) {
    range.addEventListener("input", handleRangeChange);
}

if(mode) {
    mode.addEventListener("click", handleModeClick);
}