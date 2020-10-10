let build = "0.5";
document.getElementById("title").innerHTML = "line3d " + build;

objects = new Objects();    // objects.js
optionspanel = new OptionsPanel();  // options.js

// define variables and constants

let displayObject = 'cube'
let frameRate = 60;
let cameraPosition = [7,0,0]
let planePosition = [-7,0,0]
let xTheta = 0; // starting position in degrees
let yTheta = 0;
let zTheta = 0;
let xRotateSpeed = 0.043;  // degrees per frame
let yRotateSpeed = 0.157;
let zRotateSpeed = 0.75;
let object = objects.shapes[displayObject].points;
let objectInstructions = objects.shapes[displayObject].instructions;
let xMatrix = [[],[],[]]
let yMatrix = [[],[],[]]
let zMatrix = [[],[],[]]
let intermediateMatrix = [[],[],[]];
let compoundMatrix = [[],[],[]];
let transformedObject = new Array(object.length); for (let n=0; n<transformedObject.length; n++) { transformedObject[n] = new Array(3); }
let perspectiveObject = new Array(object.length); for (let n=0; n<perspectiveObject.length; n++) { perspectiveObject[n] = new Array(3); }
let csysPerspectiveObject = new Array(object.length); for (let n=0; n<perspectiveObject.length; n++) { perspectiveObject[n] = new Array(3); }
let rotate = true;

// create the "options" (options.js)
optionspanel.addCheckbox("Rotate?", "rotationCheckBox", toggleRotation, true);
optionspanel.addSlider("X Rotation Speed", "xRotationSpeedSlider", updateXRotateSpeed, 0, 1, xRotateSpeed, 0.001);
optionspanel.addSlider("Y Rotation Speed", "yRotationSpeedSlider", updateYRotateSpeed, 0, 1, yRotateSpeed, 0.001);
optionspanel.addSlider("Z Rotation Speed", "zRotationSpeedSlider", updateZRotateSpeed, 0, 1, zRotateSpeed, 0.001);

// setup event listeners
let button = document.getElementById("optionsButton");
button.addEventListener("click", function(){toggleSideBar()}, false);

// setup canvas context

let canvas = document.getElementById("object");
let ctx = canvas.getContext("2d");

// setup canvas properties

function setCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.beginPath();
    ctx.strokeStyle = "#aaaaaa";
}

// add window resize listener

window.addEventListener("resize", function() {
    setCanvas();
    objects.setScale();
    object = objects.shapes[displayObject].points;
    objectInstructions = objects.shapes[displayObject].instructions;
})



setCanvas();

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

        // old perspective code (for reference)

        // for (let p=0; p<transformedObject.length; p++) {
        //     multiplier = 1 + (transformedObject[p][0] / (objects.scale * 8))
        //     perspectiveObject[p] = [transformedObject[p][1]*multiplier,transformedObject[p][2]*multiplier]
        // }

        // apply perspective shift

        for (let p=0; p<transformedObject.length; p++) {
            csysPerspectiveObject[p] = [transformedObject[p][0]-(cameraPosition[0]*objects.scale), transformedObject[p][1]-(cameraPosition[1]*objects.scale), transformedObject[p][2]-(cameraPosition[2]*objects.scale)]
        }
        for (let q=0; q<transformedObject.length; q++) {
            perspectiveObject[q] = [((planePosition[0]*objects.scale)/csysPerspectiveObject[q][0])*csysPerspectiveObject[q][1]+(planePosition[1]*objects.scale), ((planePosition[0]*objects.scale)/csysPerspectiveObject[q][0])*csysPerspectiveObject[q][2]+(planePosition[2]*objects.scale)]
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

        // increment position counters

        if (rotate) {
            xTheta += xRotateSpeed;
            if (xTheta >= 360) { xTheta -= 360; }
            if (xTheta < 0) { xTheta += 360; }
            yTheta += yRotateSpeed;
            if (yTheta >= 360) { xTheta -= 360; }
            if (yTheta < 0) { xTheta = xTheta += 360; }
            zTheta += zRotateSpeed;
            if (zTheta >= 360) { zTheta -= 360; }
            if (zTheta < 0) { zTheta += 360; }
        }
 
        drawLoop()
    }, (1000/frameRate));
}

// runs when button pressed

function setObjectType(type) {
    displayObject = type;
    object = objects.shapes[type].points;
    objectInstructions = objects.shapes[type].instructions;
}

if (window.location.hash.substr(1)) {
    setObjectType(window.location.hash.substr(1))
}

function openSideBar() {
    document.getElementById("optionsSidebar").style.width = "300px";
    document.getElementById("optionsButton").textContent = ">";
    document.getElementById("optionsButton").style.right = "300px";
}

function closeSideBar() {
    document.getElementById("optionsSidebar").style.width = "0px";
    document.getElementById("optionsButton").textContent = "<";
    document.getElementById("optionsButton").style.right = "0px";
}

function toggleSideBar() {
    if (document.getElementById("optionsButton").textContent == "<") {
        openSideBar();
    } else {
        closeSideBar();
    }
}

function toggleRotation() {
    rotate = !rotate;
}

function updateXRotateSpeed(value) {
    xRotateSpeed = parseFloat(value);
}

function updateYRotateSpeed(value) {
    yRotateSpeed = parseFloat(value);
}

function updateZRotateSpeed(value) {
    zRotateSpeed = parseFloat(value);
}
