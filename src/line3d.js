let build = "0.7";
var titles=document.getElementsByClassName("title");
for (var a=0; a<titles.length; a++) {
	titles[a].innerHTML = "line3d " + build; // yeah its painful alright...
}

function showcredits(){
    var cred = document.getElementById('creditwrap');
    if ( cred.style.display !== 'none' ) {
        cred.style.display = 'none';
    } else {
        cred.style.display = 'block';
    }
}
document.getElementById('title').addEventListener("click",function(){showcredits()},false);
document.getElementById('credits').addEventListener("click",function(){showcredits()},false);


// objects

class Objects {
    constructor() {
        this.originalShapes = {
            get getShapes() {
                return {
                    base: { // base plane MUST stay as first shape
                        name: "Plane",
                        color: "#707070",
                        position: [0,0,-2],
                        theta: [0,0,0],
                        rotateSpeed: [0,0,0],
                        points: [[5,5,0],[5,4,0],[5,3,0],[5,2,0],[5,1,0],[5,0,0],[5,-1,0],[5,-2,0],[5,-3,0],[5,-4,0],[5,-5,0],[-5,5,0],[-5,4,0],[-5,3,0],[-5,2,0],[-5,1,0],[-5,0,0],[-5,-1,0],[-5,-2,0],[-5,-3,0],[-5,-4,0],[-5,-5,0],[4,5,0],[3,5,0],[2,5,0],[1,5,0],[0,5,0],[-1,5,0],[-2,5,0],[-3,5,0],[-4,5,0],[4,-5,0],[3,-5,0],[2,-5,0],[1,-5,0],[0,-5,0],[-1,-5,0],[-2,-5,0],[-3,-5,0],[-4,-5,0]],
                        instructions: [[0,11],[1,12],[2,13],[3,14],[4,15],[5,16],[6,17],[7,18],[8,19],[9,20],[10,21],[0,10],[22,31],[23,32],[24,33],[25,34],[26,35],[27,36],[28,37],[29,38],[30,39],[11,21]]
                    },
                    cube: {
                        name:"Cube",
                        color: "#aaaaaa",
                        position: [4,0,0],
                        theta: [0,0,0],
                        rotateSpeed: [0.043,0.157,0.75],
                        points:[[1,1,1],[1,1,-1],[-1,1,1],[-1,1,-1],[1,-1,1],[1,-1,-1],[-1,-1,1],[-1,-1,-1]],
                        instructions:[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[2,6],[1,5],[3,7]]
                    },
                    wf_cube: {
                        name:"Wireframe Cube",
                        color: "#aa2020",
                        position: [-2,-2,0],
                        theta: [0,0,0],
                        rotateSpeed: [0.043,0.157,0.75],
                        points:[[1,1,1],[1,1,-1],[-1,1,1],[-1,1,-1],[1,-1,1],[1,-1,-1],[-1,-1,1],[-1,-1,-1]],
						instructions:[[0,1],[0,3],[1,3],[3,2],[1,4],[2,0],[4,5],[2,7],[5,7],[7,6],[2,4],[5,3],[6,5],[6,4],[0,4],[2,6],[1,5],[3,7]]
                    },
                    sq_pyramid: {
                        name:"Pyramid",
                        color: "#00aa00",
                        position: [0,2,-0.4],
                        theta: [0,0,0],
                        rotateSpeed: [-0.043,-0.157,-0.75],
                        points:[[1,1,-0.6],[1,-1,-0.6],[-1,-1,-0.6],[-1,1,-0.6],[0,0,0.8]],
                        instructions:[[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]]
                    },
                    line: {
                        name:"Line",
                        color: "#3030aa",
                        position: [0,0,0],
                        theta: [0,0,0],
                        rotateSpeed: [0.043,0.157,0.75],
                        points:[[1,1,0],[-1,-1,0]],
                        instructions:[[1,0]]
                    }

                }
            }
        }

        this.originalCsysShapes = {
            get getShapes() {
                return {
                    csysX: {
                        name:"X",
                        color: "#aa2020",
                        points:[[0,0,0],[0.5,0,0],[0.45,0.05,0.05],[0.45,0.05,-0.05],[0.45,-0.05,0.05],[0.45,-0.05,-0.05]],
                        instructions:[[0,1],[1,2],[1,3],[1,4],[1,5]]
                    },
                    csysY: {
                        name:"Y",
                        color: "#00aa00",
                        points:[[0,0,0],[0,0.5,0],[0.05,0.45,0.05],[0.05,0.45,-0.05],[-0.05,0.45,0.05],[-0.05,0.45,-0.05]],
                        instructions:[[0,1],[1,2],[1,3],[1,4],[1,5]]
                    },
                    csysZ: {
                        name:"Z",
                        color: "#3030aa",
                        points:[[0,0,0],[0,0,0.5],[0.05,0.05,0.45],[0.05,-0.05,0.45],[-0.05,0.05,0.45],[-0.05,-0.05,0.45]],
                        instructions:[[0,1],[1,2],[1,3],[1,4],[1,5]]
                    },
                }
            }
        }

        this.setValues();
        this.setScale();
        this.createButtons();
    }


    setValues() {
        this.shapes = this.originalShapes.getShapes;
        this.csysShapes = this.originalCsysShapes.getShapes;
    }

    // scale objects to fit window

    scaleObjects() {
        this.scale = Math.min(window.innerWidth, window.innerHeight) * 0.25;

        for (let shape in this.shapes) {
            for (let s = 0; s < (this.shapes[shape]["points"]).length; s++) {
                for (let t = 0; t < (this.shapes[shape]["points"][0]).length; t++) {
                    this.shapes[shape]["points"][s][t] *= this.scale;
                }
            }
        }
        for (let csysShape in this.csysShapes) {
            for (let s = 0; s < (this.csysShapes[csysShape]["points"]).length; s++) {
                for (let t = 0; t < (this.csysShapes[csysShape]["points"][0]).length; t++) {
                    this.csysShapes[csysShape]["points"][s][t] *= this.scale;
                }
            }
        }
    }

    // create buttons based on objects in class

    createButtons() {
        for (let shape in this.shapes) {
            let button = document.createElement("button");
            button.type = "button";
            button.innerHTML = this.shapes[shape].name;
            button.className = "objButton";
            button.addEventListener("click", function(){setObjectType( shape )}, false);
            let element = document.getElementById("buttons");
            element.appendChild(button);
        }
    }

    // configures object from window size

    setScale() {
        for(let a in this.originalShapes.getShapes) {
            this.shapes[a].points = this.originalShapes.getShapes[a].points;
            this.shapes[a].instructions = this.originalShapes.getShapes[a].instructions;
        }
        for(let b in this.originalCsysShapes.getShapes) {
            this.csysShapes[b].points = this.originalCsysShapes.getShapes[b].points;
            this.csysShapes[b].instructions = this.originalCsysShapes.getShapes[b].instructions;
        }
        this.scaleObjects();
    }
}

// TODO: Multiple object support
class OptionsPanel {
    constructor() {
        this.sidebar = document.getElementById("optionsSidebar");
        this.options = document.getElementById("options");
    }

    addCheckbox(displayName, idName, func, checked = false) {
        let label = document.createElement("label");
        label.className = "checkboxContainer";
        label.id = idName;
        label.innerHTML = displayName;
        label.addEventListener("mousedown", func, false)
        this.options.appendChild(label);
        
        let input = document.createElement("input");
        input.type = "checkbox";
        input.checked = checked;
        label.appendChild(input);

        let span = document.createElement("span");
        span.className = "checkmark";
        label.appendChild(span);
    }

    addSlider(displayName, idName, func, min = 1, max = 100, value = 50, step = 1) {
        let div = document.createElement("div");
        div.className = "sliderContainer";
        div.innerHTML = displayName;
        this.options.appendChild(div);
        
        let input = document.createElement("input");
        input.type = "range";
        input.min = min;
        input.max = max;
        input.value = value;    // for some reason, this will always round to the nearest integer (I'll look into a fix at some point)
        input.step = step;
        input.className = "slider";
        input.id = idName;
        div.appendChild(input);

        let content = document.createElement("div");
        content.innerHTML = document.getElementById(idName).value;
        div.appendChild(content);

        input.oninput = function() {
            content.innerHTML = this.value;
            func(this.value);
        }
    }
}

objects = new Objects();
optionspanel = new OptionsPanel();

// define variables and constants

let displayObject = ['wf_cube', 'sq_pyramid', 'cube'];
let frameRate = 60;
let cameraPosition = [8,-6.713,5];
let cameraDirection = [0,-30,-40];
let planePosition = [-7,0,0]; // first value is perspective level, must be negative. smaller number = more perspective
let showCsys = false;
let showPlane = true;
let object = objects.shapes["base"].points;
let objectInstructions = objects.shapes["base"].instructions;
let xMatrix = [[],[],[]];
let yMatrix = [[],[],[]];
let zMatrix = [[],[],[]];
let intermediateMatrix = [[],[],[]];
let compoundMatrix = [[],[],[]];
let cameraIntermediateMatrix = [[],[],[]];
let cameraCompoundMatrix = [[],[],[]];
let transformedObject = new Array(object.length); for (let n=0; n<objects.shapes["base"].points.length; n++) { transformedObject[n] = new Array(3); }
let perspectiveObject = new Array(object.length); for (let n=0; n<transformedObject.length; n++) { perspectiveObject[n] = new Array(3); }
let csysPerspectiveObject = new Array(object.length); for (let n=0; n<perspectiveObject.length; n++) { csysPerspectiveObject[n] = new Array(3); }
let transformedPerspectiveObject = new Array(object.length); for (let n=0; n<perspectiveObject.length; n++) { transformedPerspectiveObject[n] = new Array(3); }
let rotate = false;

optionspanel.addCheckbox("Rotation", "rotationCheckBox", toggleRotation, false);
optionspanel.addCheckbox("Csys Display", "csysCheckbox", toggleCsys, false);
optionspanel.addCheckbox("Base Plane", "baseplaneCheckbox", toggleBase, true);

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
}

// add window resize listener

window.addEventListener("resize", function() {
    setCanvas();
    objects.setScale();
})



setCanvas();

// run transformation routine

drawLoop();

function drawLoop() {
    setTimeout(function() {
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (showPlane == true) {
            id = "base"
            object = objects.shapes[id].points;
            objectInstructions = objects.shapes[id].instructions;
            draw(object,objectInstructions,objects.shapes[id].color,id);
        }
        if (showCsys == true) {
            for(c in objects.csysShapes) {
                object = objects.csysShapes[c].points;
                objectInstructions = objects.csysShapes[c].instructions;
                drawCsys(object,objectInstructions,objects.csysShapes[c].color);
            }
        }
        for(let o=0; o<displayObject.length; o++) {
            id = displayObject[o];
            object = objects.shapes[id].points;
            objectInstructions = objects.shapes[id].instructions;
            draw(object,objectInstructions,objects.shapes[id].color,id);
        }
 
        drawLoop()
    }, (1000/frameRate));
}

// draw object on screen

function draw(object,objectInstructions,color,id) {

    let xTheta = objects.shapes[id].theta[0];
    let yTheta = objects.shapes[id].theta[1];
    let zTheta = objects.shapes[id].theta[2];
    let xRotateSpeed = objects.shapes[id].rotateSpeed[0];
    let yRotateSpeed = objects.shapes[id].rotateSpeed[1];
    let zRotateSpeed = objects.shapes[id].rotateSpeed[2];
    
    xMatrix = [[1,0,0],[0,Math.cos(xTheta*Math.PI/180),Math.sin(xTheta*Math.PI/180)],[0,-Math.sin(xTheta*Math.PI/180),Math.cos(xTheta*Math.PI/180)]];
    yMatrix = [[Math.cos(yTheta*Math.PI/180),0,-Math.sin(yTheta*Math.PI/180)],[0,1,0],[Math.sin(yTheta*Math.PI/180),0,Math.cos(yTheta*Math.PI/180)]];
    zMatrix = [[Math.cos(zTheta*Math.PI/180),Math.sin(zTheta*Math.PI/180),0],[-Math.sin(zTheta*Math.PI/180),Math.cos(zTheta*Math.PI/180),0],[0,0,1]];
    
    xCameraMatrix = [[1,0,0],[0,Math.cos(cameraDirection[0]*Math.PI/180),-Math.sin(cameraDirection[0]*Math.PI/180)],[0,Math.sin(cameraDirection[0]*Math.PI/180),Math.cos(cameraDirection[0]*Math.PI/180)]];
    yCameraMatrix = [[Math.cos(cameraDirection[1]*Math.PI/180),0,Math.sin(cameraDirection[1]*Math.PI/180)],[0,1,0],[-Math.sin(cameraDirection[1]*Math.PI/180),0,Math.cos(cameraDirection[1]*Math.PI/180)]];
    zCameraMatrix = [[Math.cos(cameraDirection[2]*Math.PI/180),-Math.sin(cameraDirection[2]*Math.PI/180),0],[Math.sin(cameraDirection[2]*Math.PI/180),Math.cos(cameraDirection[2]*Math.PI/180),0],[0,0,1]];

    // multiply matricies order zyx (x then y then z)

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

    // translate objects

    for (let t=0; t<transformedObject.length; t++) {
        transformedObject[t] = [transformedObject[t][0]+(objects.shapes[id].position[0]*objects.scale), transformedObject[t][1]+(objects.shapes[id].position[1]*objects.scale), transformedObject[t][2]+(objects.shapes[id].position[2]*objects.scale)]
    }



    // old perspective code (for reference)

    // for (let p=0; p<transformedObject.length; p++) {
    //     multiplier = 1 + (transformedObject[p][0] / (objects.scale * 8))
    //     perspectiveObject[p] = [transformedObject[p][1]*multiplier,transformedObject[p][2]*multiplier]
    // }

    // apply perspective shift order xyz (z then y then x)

    for (let j=0; j<zCameraMatrix.length; j++) {
        for (let k=0; k<zCameraMatrix[0].length; k++) {
            cameraIntermediateMatrix[j][k] = zCameraMatrix[j][0]*yCameraMatrix[0][k]+zCameraMatrix[j][1]*yCameraMatrix[1][k]+zCameraMatrix[j][2]*yCameraMatrix[2][k];
        }
    }
    for (let l=0; l<cameraIntermediateMatrix.length; l++) {
        for (let m=0; m<cameraIntermediateMatrix[0].length; m++) {
            cameraCompoundMatrix[l][m] = cameraIntermediateMatrix[l][0]*xCameraMatrix[0][m]+cameraIntermediateMatrix[l][1]*xCameraMatrix[1][m]+cameraIntermediateMatrix[l][2]*xCameraMatrix[2][m];
        }
    }

    for (let p=0; p<transformedObject.length; p++) {
        csysPerspectiveObject[p] = [transformedObject[p][0]-(cameraPosition[0]*objects.scale), transformedObject[p][1]-(cameraPosition[1]*objects.scale), transformedObject[p][2]-(cameraPosition[2]*objects.scale)];
    }

    for (let j=0; j<csysPerspectiveObject.length; j++) {
        for (let k=0; k<csysPerspectiveObject[0].length; k++) {
            transformedPerspectiveObject[j][k] = csysPerspectiveObject[j][0]*cameraCompoundMatrix[0][k]+csysPerspectiveObject[j][1]*cameraCompoundMatrix[1][k]+csysPerspectiveObject[j][2]*cameraCompoundMatrix[2][k];
        }
    }

    for (let q=0; q<transformedObject.length; q++) {
        perspectiveObject[q] = [((planePosition[0]*objects.scale)/transformedPerspectiveObject[q][0])*transformedPerspectiveObject[q][1]+(planePosition[1]*objects.scale), ((planePosition[0]*objects.scale)/transformedPerspectiveObject[q][0])*transformedPerspectiveObject[q][2]+(planePosition[2]*objects.scale)];
    }

    // draw transformed object

    ctx.strokeStyle = color;
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
        if (yTheta >= 360) { yTheta -= 360; }
        if (yTheta < 0) { yTheta += 360; }
        zTheta += zRotateSpeed;
        if (zTheta >= 360) { zTheta -= 360; }
        if (zTheta < 0) { zTheta += 360; }
    }

    objects.shapes[id].theta[0] = xTheta;
    objects.shapes[id].theta[1] = yTheta;
    objects.shapes[id].theta[2] = zTheta;
    objects.shapes[id].rotateSpeed[0] = xRotateSpeed;
    objects.shapes[id].rotateSpeed[1] = yRotateSpeed;
    objects.shapes[id].rotateSpeed[2] = zRotateSpeed;

}

// draws csys

function drawCsys(transformedObject,objectInstructions,color) {

    xCameraMatrix = [[1,0,0],[0,Math.cos(cameraDirection[0]*Math.PI/180),-Math.sin(cameraDirection[0]*Math.PI/180)],[0,Math.sin(cameraDirection[0]*Math.PI/180),Math.cos(cameraDirection[0]*Math.PI/180)]];
    yCameraMatrix = [[Math.cos(cameraDirection[1]*Math.PI/180),0,Math.sin(cameraDirection[1]*Math.PI/180)],[0,1,0],[-Math.sin(cameraDirection[1]*Math.PI/180),0,Math.cos(cameraDirection[1]*Math.PI/180)]];
    zCameraMatrix = [[Math.cos(cameraDirection[2]*Math.PI/180),-Math.sin(cameraDirection[2]*Math.PI/180),0],[Math.sin(cameraDirection[2]*Math.PI/180),Math.cos(cameraDirection[2]*Math.PI/180),0],[0,0,1]];

    // old perspective code (for reference)

    // for (let p=0; p<transformedObject.length; p++) {
    //     multiplier = 1 + (transformedObject[p][0] / (objects.scale * 8))
    //     perspectiveObject[p] = [transformedObject[p][1]*multiplier,transformedObject[p][2]*multiplier]
    // }

    // apply perspective shift

    for (let j=0; j<zCameraMatrix.length; j++) {
        for (let k=0; k<zCameraMatrix[0].length; k++) {
            cameraIntermediateMatrix[j][k] = zCameraMatrix[j][0]*yCameraMatrix[0][k]+zCameraMatrix[j][1]*yCameraMatrix[1][k]+zCameraMatrix[j][2]*yCameraMatrix[2][k];
        }
    }
    for (let l=0; l<cameraIntermediateMatrix.length; l++) {
        for (let m=0; m<cameraIntermediateMatrix[0].length; m++) {
            cameraCompoundMatrix[l][m] = cameraIntermediateMatrix[l][0]*xCameraMatrix[0][m]+cameraIntermediateMatrix[l][1]*xCameraMatrix[1][m]+cameraIntermediateMatrix[l][2]*xCameraMatrix[2][m];
        }
    }

    for (let p=0; p<transformedObject.length; p++) {
        csysPerspectiveObject[p] = [transformedObject[p][0]-(cameraPosition[0]*objects.scale), transformedObject[p][1]-(cameraPosition[1]*objects.scale), transformedObject[p][2]-(cameraPosition[2]*objects.scale)];
    }

    for (let j=0; j<csysPerspectiveObject.length; j++) {
        for (let k=0; k<csysPerspectiveObject[0].length; k++) {
            transformedPerspectiveObject[j][k] = csysPerspectiveObject[j][0]*cameraCompoundMatrix[0][k]+csysPerspectiveObject[j][1]*cameraCompoundMatrix[1][k]+csysPerspectiveObject[j][2]*cameraCompoundMatrix[2][k];
        }
    }

    for (let q=0; q<transformedObject.length; q++) {
        perspectiveObject[q] = [((planePosition[0]*objects.scale)/transformedPerspectiveObject[q][0])*transformedPerspectiveObject[q][1]+(planePosition[1]*objects.scale), ((planePosition[0]*objects.scale)/transformedPerspectiveObject[q][0])*transformedPerspectiveObject[q][2]+(planePosition[2]*objects.scale)];
    }

    // draw object

    ctx.strokeStyle = color;
    ctx.beginPath();

    let i=0
    for (i=0; i<objectInstructions.length; i++) {
        ctx.moveTo(perspectiveObject[objectInstructions[i][0]][0]+(ctx.canvas.width/2), -perspectiveObject[objectInstructions[i][0]][1]+(ctx.canvas.height/2));
        ctx.lineTo(perspectiveObject[objectInstructions[i][1]][0]+(ctx.canvas.width/2), -perspectiveObject[objectInstructions[i][1]][1]+(ctx.canvas.height/2));
    }

    ctx.stroke();

}

// runs when button pressed

function setObjectType(type) {
    displayObject[0] = type;
    object = objects.shapes[type].points;
    objectInstructions = objects.shapes[type].instructions;
}

// allows for page to be loaded on set object other than default

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

function toggleCsys() {
    showCsys = !showCsys;
}

function toggleBase() {
    showPlane = !showPlane;
}