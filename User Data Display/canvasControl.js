function RGB(red, green, blue){
    return "rgb("+red+","+green+","+blue+")";
}

function RGBA(red, green, blue, alpha){
    return "rgba("+red+","+green+","+blue+","+alpha+")";
}

class Plot{
    static TargetX = 2000;
    static TargetY = 1000;

    static FillColor = RGB(200, 200, 200);
    static BorderColor = RGB(0, 0, 0);

    dataset = [];
    datapos = [];
    datarange = { min: -100, max: 10 };
    displayrange = { min: 0, max: 0 };
    dataScale = 5;

    timeData = [];

    mouse = { x: -10000, y: -10000}

    constructor(cnv){
        let ref = this;

        this.obj = cnv;
        this.currentCtx = this.obj.getContext("2d");

        this.width = this.obj.getBoundingClientRect().width;
        this.height = this.obj.getBoundingClientRect().height;

        this.scaleX = this.width / Plot.TargetX;
        this.scaleY = this.height / Plot.TargetY;

        this.docScaleX = Plot.TargetX / this.width;
        this.docScaleY = Plot.TargetY / this.height;

        cnv.addEventListener("mousemove", function(e){
            let mousePos = { x: (e.clientX - cnv.getBoundingClientRect().left) * ref.docScaleX - Plot.TargetX / 2, y: -(e.clientY - cnv.getBoundingClientRect().top) * ref.docScaleY + Plot.TargetY / 2};
            ref.mouse = mousePos;
            
            ref.Clear();
            ref.DrawRules();
            ref.DrawData();

            ref.CheckHover();
        });
    }

    Clear(){
        this.currentCtx.clearRect(0, 0, Plot.TargetX, Plot.TargetY);
        this.FillRect(0, 0, Plot.TargetX, Plot.TargetY, Plot.FillColor);
        this.StrokeRect(0, 0, Plot.TargetX, Plot.TargetY, Plot.BorderColor);
    }

    SetLineThickness(thickness){
        this.currentCtx.lineWidth = thickness;
    }

    SetFont(font){
        this.currentCtx.font = font;
    }

    Line(startX, startY, endX, endY, color){
        this.currentCtx.moveTo((startX + Plot.TargetX / 2) * this.scaleX, (-startY + Plot.TargetY / 2) * this.scaleY);
        this.currentCtx.lineTo((endX + Plot.TargetX / 2) * this.scaleX, (-endY + Plot.TargetY / 2) * this.scaleY);
        this.currentCtx.strokeStyle = color;
        this.currentCtx.stroke();
    }

    StrokeRect(x, y, width, height, color){
        this.currentCtx.strokeStyle = color;
        this.currentCtx.strokeRect((x + Plot.TargetX / 2 - width / 2) * this.scaleX, (-y + Plot.TargetY / 2 - height / 2) * this.scaleY, width * this.scaleX, height * this.scaleY);
    }

    FillRect(x, y, width, height, color){
        this.currentCtx.fillStyle = color;
        this.currentCtx.fillRect((x + Plot.TargetX / 2 - width / 2) * this.scaleX, (-y + Plot.TargetY / 2 - height / 2) * this.scaleY, width * this.scaleX, height * this.scaleY);
    }

    StrokeCircle(x, y, radius, color){
        this.currentCtx.beginPath();
        this.currentCtx.strokeStyle = color;
        this.currentCtx.arc((x + Plot.TargetX / 2) * this.scaleX, (-y + Plot.TargetY / 2) * this.scaleY, radius * this.scaleY, 0, 2 * Math.PI);
        this.currentCtx.stroke();
    }

    FillCircle(x, y, radius, color){
        this.currentCtx.beginPath();
        this.currentCtx.fillStyle = color;
        this.currentCtx.arc((x + Plot.TargetX / 2) * this.scaleX, (-y + Plot.TargetY / 2) * this.scaleY, radius * this.scaleY, 0, 2 * Math.PI);
        this.currentCtx.fill();
    }

    StrokeText(x, y, color, text){
        this.currentCtx.strokeStyle = color;
        this.currentCtx.strokeText(text, (x + Plot.TargetX / 2) * this.scaleX, (-y + Plot.TargetY / 2) * this.scaleY);
    }

    FillText(x, y, color, text){
        this.currentCtx.fillStyle = color;
        this.currentCtx.fillText(text, (x + Plot.TargetX / 2) * this.scaleX, (-y + Plot.TargetY / 2) * this.scaleY);
    }

    SetRange(range){
        this.datarange = range;
    }

    SetDataScale(scale){
        this.dataScale = scale;
    }

    DrawRule(y, value){
        this.FillRect(-Plot.TargetX / 2 + 25, y, 50, 10, RGB(0, 0, 0));
        this.FillRect(0, y, Plot.TargetX, 10, RGBA(0, 0, 0, .1));
        this.SetFont("12px Arial");
        this.FillText(-Plot.TargetX / 2 + 25, y - 50, RGBA(0, 0, 0, .8), value);
    }

    DrawRules(){
        let ruleSteps = (this.datarange.max - this.datarange.min) / this.dataScale;
        
        for(let i = 0; i <= ruleSteps; i++){
            this.DrawRule((Plot.TargetY - 200) / ruleSteps * i - Plot.TargetY / 2 + 100, (i - ruleSteps / 2) * this.dataScale);
        }

        this.displayrange.min = (Plot.TargetY - 200) / ruleSteps * 0 - Plot.TargetY / 2 + 100;
        this.displayrange.max = (Plot.TargetY - 200) / ruleSteps * ruleSteps - Plot.TargetY / 2 + 100;
    }

    DrawData(){
        if(this.dataset.length <= 0){ return; }

        let dataRange = Plot.TargetX - 150;
        let dataSection = Math.floor(dataRange / this.dataset.length);

        let drawScale = this.displayrange.min / this.datarange.min;
        this.datapos = [];


        for(let i = 0; i < this.dataset.length; i++){
            this.FillCircle(dataSection * i - Plot.TargetX / 2 + 125, this.dataset[i] * drawScale, 15, RGB(0, 0, 0));

            if(i > 0){
                this.Line(dataSection * (i - 1) - Plot.TargetX / 2 + 125, this.dataset[i - 1] * drawScale, dataSection * i - Plot.TargetX / 2 + 125, this.dataset[i] * drawScale, RGB(0, 0, 0));
            }

            this.datapos[this.datapos.length] = {x: dataSection * i - Plot.TargetX / 2 + 125, y: this.dataset[i] * drawScale};
        }
    }

    Plot(data, time = []){
        this.dataset = data;
        this.timeData = time;

        this.Clear();
        this.DrawRules();
        this.DrawData();
        this.CheckHover();
    }

    DataTip(mousePos, index){
        let tipSize = {x: 500, y: 200};
        let displayDir = {x: 1, y: -1};

        if(mousePos.x + tipSize.x * 1.5 * displayDir.x > Plot.TargetX / 2){ displayDir.x *= -1; }
        if(mousePos.y + tipSize.y * 1.5 * displayDir.y < -Plot.TargetY / 2){ displayDir.y *= -1; }

        this.FillRect(mousePos.x + tipSize.x * displayDir.x, mousePos.y + tipSize.y * displayDir.y, tipSize.x, tipSize.y, RGB(255, 255, 255));
        this.StrokeRect(mousePos.x + tipSize.x * displayDir.x, mousePos.y + tipSize.y * displayDir.y, tipSize.x, tipSize.y, RGB(0, 0, 0));

        this.SetFont("16px Arial");

        if(displayDir.x == 1){
            this.FillText(mousePos.x + tipSize.x * displayDir.x - tipSize.x * displayDir.x / 2 + 10, mousePos.y + tipSize.y * displayDir.y + 25, RGB(0, 0, 0), this.dataset[index]);
            this.SetFont("12px Arial");
            this.FillText(mousePos.x + tipSize.x * displayDir.x - tipSize.x * displayDir.x / 2 + 10, mousePos.y + tipSize.y * displayDir.y - 50, RGB(0, 0, 0), this.timeData[index]);
        }else{
            this.FillText(mousePos.x + tipSize.x * displayDir.x + tipSize.x * displayDir.x / 2 + 10, mousePos.y + tipSize.y * displayDir.y + 25, RGB(0, 0, 0), this.dataset[index]);
            this.SetFont("12px Arial");
            this.FillText(mousePos.x + tipSize.x * displayDir.x + tipSize.x * displayDir.x / 2 + 10, mousePos.y + tipSize.y * displayDir.y - 50, RGB(0, 0, 0), this.timeData[index]);
        }
        
    }

    CheckHover(){
        for(let i = 0; i < this.datapos.length; i++){
            let diff = Math.sqrt(Math.pow(this.mouse.x - this.datapos[i].x, 2) + Math.pow(this.mouse.y - this.datapos[i].y, 2));

            if(diff <= 30){
                this.DataTip(this.mouse, i);
            }
        }
    }

}

let riskGraph = new Plot(document.getElementById("risk"));
let tempGraph = new Plot(document.getElementById("temp"));
let accelXGraph = new Plot(document.getElementById("accelX"));
let accelYGraph = new Plot(document.getElementById("accelY"));
let accelZGraph = new Plot(document.getElementById("accelZ"));
let gyroXGraph = new Plot(document.getElementById("gyroX"));
let gyroYGraph = new Plot(document.getElementById("gyroY"));
let gyroZGraph = new Plot(document.getElementById("gyroZ"));

tempGraph.SetRange({min: -50, max: 50});
tempGraph.SetDataScale(10);