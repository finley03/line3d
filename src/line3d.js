// objects

class Objects {
    constructor() {
        this.originalShapes = {
            cube: {
                points:[[1,1,1],[1,1,-1],[-1,1,1],[-1,1,-1],[1,-1,1],[1,-1,-1],[-1,-1,1],[-1,-1,-1]],
                instructions:[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[2,6],[1,5],[3,7]]
            },
            pyramid: {
                points:[[1,1,-0.6],[1,-1,-0.6],[-1,-1,-0.6],[-1,1,-0.6],[0,0,0.8]],
                instructions:[[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]]
            },
            line: {
                points:[[1,1,0],[-1,-1,0]],
                instructions:[[1,0]]
            }
        }

        this.scaleObjects();
    }

    scaleObjects() {
        this.scale = Math.min(window.innerWidth, window.innerHeight) * 0.25;

        for (let shape in this.shapes) {
            for (let s = 0; s < (this.shapes[shape]["points"]).length; s++) {
                for (let t = 0; t < (this.shapes[shape]["points"][0]).length; t++) {
                    this.shapes[shape]["points"][s][t] *= this.scale;
                }
            }
        }
    }
}

objects = new Objects();

// define variables and constants

let frameRate = 60;
let xTheta=135;
let yTheta=37;
let zTheta=312;
let xRotateSpeed = 0.043;  // degrees per frame
let yRotateSpeed = 0.157;
let zRotateSpeed = 0.75;
let object = objects.shapes["cube"].points;
let objectInstructions = objects.shapes["cube"].instructions;
let xMatrix = [[],[],[]]
let yMatrix = [[],[],[]]
let zMatrix = [[],[],[]]
let intermediateMatrix = [[],[],[]];
let compoundMatrix = [[],[],[]];
let transformedObject = new Array(object.length); for (let n=0; n<transformedObject.length; n++) { transformedObject[n] = new Array(3); }
let perspectiveObject = new Array(object.length); for (let n=0; n<perspectiveObject.length; n++) { perspectiveObject[n] = new Array(3); }

// setup canvas context

var c = document.getElementById("object");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.strokeStyle = "#aaaaaa";

// run transformation routine

drawLoop();

function drawLoop() {
    setTimeout(function() {
        
        xMatrix = [[1,0,0],[0,Math.cos(xTheta*Math.PI/180),Math.sin(xTheta*Math.PI/180)],[0,-Math.sin(xTheta*Math.PI/180),Math.cos(xTheta*Math.PI/180)]];
        yMatrix = [[Math.cos(yTheta*Math.PI/180),0,-Math.sin(yTheta*Math.PI/180)],[0,1,0],[Math.sin(yTheta*Math.PI/180),0,Math.cos(yTheta*Math.PI/180)]];
        zMatrix = [[Math.cos(zTheta*Math.PI/180),Math.sin(zTheta*Math.PI/180),0],[-Math.sin(zTheta*Math.PI/180),Math.cos(zTheta*Math.PI/180),0],[0,0,1]];
        
        // multiply matricies order zyx

        for (let j=0; j<xMatrix.length; j++) {
            for (let k=0; k<xMatrix[0].length; k++) {
                intermediateMatrix[j][k] = xMatrix[j][0]*yMatrix[0][k]+xMatrix[j][1]*yMatrix[1][k]+xMatrix[j][2]*yMatrix[2][k];
            }
        }
        for (let l=0; l<intermediateMatrix.length; l++) {
            for (let m=0; m<intermediateMatrix[0].length; m++) {
                compoundMatrix[l][m] = intermediateMatrix[l][0]*zMatrix[0][m]+intermediateMatrix[l][1]*zMatrix[1][m]+intermediateMatrix[l][2]*zMatrix[2][m];
            }
        }

        // apply transformation

        for (let j=0; j<object.length; j++) {
            for (let k=0; k<object[0].length; k++) {
                transformedObject[j][k] = object[j][0]*compoundMatrix[0][k]+object[j][1]*compoundMatrix[1][k]+object[j][2]*compoundMatrix[2][k];
            }
        }

        // apply perspective shift

        for (let p=0; p<transformedObject.length; p++) {
            multiplier = 1 + (transformedObject[p][0] / (objects.scale * 8))
            perspectiveObject[p] = [transformedObject[p][1]*multiplier,transformedObject[p][2]*multiplier]
        }

        // draw transformed object

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.beginPath();

        let i=0
        for (i=0; i<objectInstructions.length; i++) {
            ctx.moveTo(perspectiveObject[objectInstructions[i][0]][0]+(ctx.canvas.width/2), -perspectiveObject[objectInstructions[i][0]][1]+(ctx.canvas.height/2));
            ctx.lineTo(perspectiveObject[objectInstructions[i][1]][0]+(ctx.canvas.width/2), -perspectiveObject[objectInstructions[i][1]][1]+(ctx.canvas.height/2));
        }

        ctx.stroke();

        xTheta += xRotateSpeed;
        if (xTheta >= 360) { xTheta -= 360; }
        if (xTheta < 0) { xTheta += 360; }
        yTheta += yRotateSpeed;
        if (yTheta >= 360) { xTheta -= 360; }
        if (yTheta < 0) { xTheta = xTheta += 360; }
        zTheta += zRotateSpeed;
        if (zTheta >= 360) { zTheta -= 360; }
        if (zTheta < 0) { zTheta += 360; }
 
        drawLoop()
    }, (1000/frameRate));
}

// runs when button pressed
function setObjectType(type) {
    object = objects.shapes[type].points;
    objectInstructions = objects.shapes[type].instructions;
}