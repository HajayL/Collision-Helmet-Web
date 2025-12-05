const targetX = 1000;
const targetY = 1000;

let target = null;
let currentCtx = null;

let width = 0;
let height = 0;

let scaleX = 0;
let scaleY = 0;

function SetContext(element){
    target = element;
    currentCtx = target.getContext("2d");

    width = target.getBoundingClientRect().width;
    height = target.getBoundingClientRect().height;

    scaleX = width / targetX;
    scaleY = height / targetY;
}

function Clear(){
    currentCtx.clearRect(0, 0, targetX, targetY);
}

function RGB(red, green, blue){
    return "rgb("+red+","+green+","+blue+")";
}

function SetLineThickness(thickness){
    ctx.lineWidth = thickness;
}

function Line(startX, startY, endX, endY, color){
    currentCtx.moveTo((startX + 500) * scaleX, (-startY + 500) * scaleY);
    currentCtx.lineTo((endX + 500) * scaleX, (-endY + 500) * scaleY);
    currentCtx.strokeStyle = color;
    currentCtx.stroke();
}

function StrokeRect(x, y, width, height, color){
    currentCtx.strokeStyle = color;
    currentCtx.strokeRect((x + 500 - width / 2) * scaleX, (-y + 500 - height / 2) * scaleY, width * scaleX, height * scaleY);
}

function FillRect(x, y, width, height, color){
    currentCtx.fillStyle = color;
    currentCtx.fillRect((x + 500 - width / 2) * scaleX, (-y + 500 - height / 2) * scaleY, width * scaleX, height * scaleY);
}

function StrokeCircle(x, y, radius, color){
    currentCtx.beginPath();
    currentCtx.strokeStyle = color;
    currentCtx.arc((x + 500) * scaleX, (-y + 500) * scaleY, radius * scaleY, 0, 2 * Math.PI);
    currentCtx.stroke();
}

function FillCircle(x, y, radius, color){
    currentCtx.beginPath();
    currentCtx.fillStyle = color;
    currentCtx.arc((x + 500) * scaleX, (-y + 500) * scaleY, radius * scaleY, 0, 2 * Math.PI);
    currentCtx.fill();
}

function StrokeText(x, y, color, text){
    currentCtx.strokeStyle = color;
    currentCtx.strokeText(text, (x + 500) * scaleX, (-y + 500) * scaleY);
}

function FillText(x, y, color, text){
    currentCtx.fillStyle = color;
    currentCtx.fillText(text, (x + 500) * scaleX, (-y + 500) * scaleY);
}

SetContext(document.getElementById("templateCanvas"));

Clear();