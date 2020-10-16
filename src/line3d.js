let build = "0.7.2";
document.getElementById("title").innerHTML = "line3d " + build;

function showcredits(){
    let cred = document.getElementById("creditwrap");
    if ( cred.style.display != "none" ) {
        cred.style.display = "none";
    } else {
        cred.style.display = "block";
    }
}
document.getElementById('title').addEventListener("click",function(){showcredits()},false);
document.getElementById('credits').addEventListener("click",function(){showcredits()},false);




//----------OBJECT CLASSES----------//




class Objects {
    constructor() {
        this.originalShapes = {
            get getShapes() {
                return {
                    base: { // base plane MUST stay as first shape (I think I haven't checked recently)
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




//----------OPTIONS SETUP SCRIPT----------//




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




//-----------DEFINE VARIABLES----------//




let displayObject = ['wf_cube', 'sq_pyramid', 'cube'];
let focusObject = null
let frameRate = 60;
let startCameraPosition = [15,0,0];
let cameraDirection = [0,0,0];
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
let revolveMatrix = [[],[],[]];
let transformedObject = new Array(object.length); for (let n=0; n<objects.shapes["base"].points.length; n++) { transformedObject[n] = new Array(3); }
let perspectiveObject = new Array(object.length); for (let n=0; n<transformedObject.length; n++) { perspectiveObject[n] = new Array(3); }
let csysPerspectiveObject = new Array(object.length); for (let n=0; n<perspectiveObject.length; n++) { csysPerspectiveObject[n] = new Array(3); }
let transformedPerspectiveObject = new Array(object.length); for (let n=0; n<perspectiveObject.length; n++) { transformedPerspectiveObject[n] = new Array(3); }
let rotate = false;
let revolve = false;
let cameraPosition = []; for (v in startCameraPosition) {cameraPosition[v] = startCameraPosition[v]};
let mouseX = 0;
let mouseY = 0;
let currentMouseX = 0;
let currentMouseY = 0;
let deltaX = 0;
let deltaY = 0;
let thetaX = 0;
let thetaY = 0;
let center = true;
let objectTranslate = false;
let csysInfo = [];
let csysWidth = {csysX: 3,csysY: 3, csysZ: 3};
let coordinateDisplacement = {csysX: 0,csysY: 0, csysZ: 0};
let translating = false;
let minDisplacement = 25;
let translateAxis = null;
let csysVector = [];
let mouseVector = [];
let translateFactor = null;


optionspanel.addCheckbox("Rotation", "rotationCheckBox", toggleRotation, false);
optionspanel.addCheckbox("Csys Display", "csysCheckbox", toggleCsys, false);
optionspanel.addCheckbox("Base Plane", "baseplaneCheckbox", toggleBase, true);

// setup canvas context

let canvas = document.getElementById("object");
let ctx = canvas.getContext("2d");

// setup event listeners

let button = document.getElementById("optionsButton");
button.addEventListener("click", function(){toggleSideBar()}, false);

// add window resize listener

window.addEventListener("resize", function() {
    setCanvas();
    objects.setScale();
})

// add zoom

window.addEventListener("wheel", function() {
    let delta = Math.sign(window.event.deltaY);
    scale = 1.025+(delta*0.225)
    cameraPosition = [cameraPosition[0]*scale,cameraPosition[1]*scale,cameraPosition[2]*scale];
    startCameraPosition = [startCameraPosition[0]*scale,startCameraPosition[1]*scale,startCameraPosition[2]*scale];
})

canvas.addEventListener("mousedown", function(event) {
    if (event.button == 1) {
        revolve = true;
        mouseX = event.clientX;
        mouseY = event.clientY;
        currentMouseX = event.clientX;
        currentMouseY = event.clientY;
    }

    // object translation

    if (event.button == 0) {
        if (objectTranslate == true) {
            mouseX = event.clientX;
            mouseY = event.clientY;
            currentMouseX = event.clientX;
            currentMouseY = event.clientY;
            translating = true
            for (s in csysInfo) {
                if (coordinateDisplacement[s] <= minDisplacement) {
                    minDisplacement = coordinateDisplacement[s]
                    translateAxis = s;
                }
            }
            minDisplacement = 25
        }
    }
})

window.addEventListener("mouseup", function(event) {
    if (event.button == 1) {
        revolve = false;
    }
    if (event.button == 0) {
        if (objectTranslate == true) {
            translating = false
        }
    }
})

canvas.addEventListener("mousemove", function(event) {
    if (revolve == true || objectTranslate == true) {
        currentMouseX = event.clientX;
        currentMouseY = event.clientY;
    }
    if (objectTranslate == true) {
        for (s in csysInfo) {
            coordinateDisplacement[s] = Math.abs(Math.sqrt(Math.pow((csysInfo[s][1][0]+(ctx.canvas.width/2))-currentMouseX,2)+Math.pow((-csysInfo[s][1][1]+(ctx.canvas.height/2))-currentMouseY,2)));
            if (coordinateDisplacement[s] <= 25) {
                csysWidth[s] = 5
            } else {
                csysWidth[s] = 3
            }

        }
    }
})

window.addEventListener("keydown", function(event) {
    if (event.key == "t") {
        objectTranslate = !objectTranslate
    }
    if (event.key == "Escape") {
        objectTranslate = false
        focusObject = null
    }
})



// setup canvas properties

function setCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.beginPath();
    ctx.lineCap = "round";
}

setCanvas();




//----------LINEAR TRANSFORMATIONS AND DRAW ON CANVAS----------//




drawLoop();

function drawLoop() {
    setTimeout(function() {
        
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.lineWidth = 1.5;
        if (showPlane == true) {
            id = "base";
            if (focusObject != id) {
                object = objects.shapes[id].points;
                objectInstructions = objects.shapes[id].instructions;
                draw(object,objectInstructions,objects.shapes[id].color,id);
            }
        }
        if (showCsys == true) {
            for(c in objects.csysShapes) {
                id = null;
                center = true;
                object = objects.csysShapes[c].points;
                objectInstructions = objects.csysShapes[c].instructions;
                drawCsys(object,objectInstructions,objects.csysShapes[c].color,id,center);
            }
        }
        for(let o=0; o<displayObject.length; o++) {
            id = displayObject[o];
            if (focusObject != id) {
                object = objects.shapes[id].points;
                objectInstructions = objects.shapes[id].instructions;
                draw(object,objectInstructions,objects.shapes[id].color,id);
            }
        }
        if (focusObject != null) {
            id = focusObject;
            object = objects.shapes[id].points;
            objectInstructions = objects.shapes[id].instructions;
            ctx.lineWidth = 4;
            draw(object,objectInstructions,objects.shapes[id].color,id);
            if (objectTranslate == true) {
                for(c in objects.csysShapes) {
                    center = false;
                    object = objects.csysShapes[c].points;
                    objectInstructions = objects.csysShapes[c].instructions;
                    //ctx.lineWidth = 3;
                    ctx.lineWidth = csysWidth[c];
                    drawCsys(object,objectInstructions,objects.csysShapes[c].color,id,center,c);
                }
            }
        }

 
        if (revolve == true) {
            revolves();
        }
        if (translating == true) {
            translateObject();
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

function drawCsys(object,objectInstructions,color,id,center,csys) {

    xCameraMatrix = [[1,0,0],[0,Math.cos(cameraDirection[0]*Math.PI/180),-Math.sin(cameraDirection[0]*Math.PI/180)],[0,Math.sin(cameraDirection[0]*Math.PI/180),Math.cos(cameraDirection[0]*Math.PI/180)]];
    yCameraMatrix = [[Math.cos(cameraDirection[1]*Math.PI/180),0,Math.sin(cameraDirection[1]*Math.PI/180)],[0,1,0],[-Math.sin(cameraDirection[1]*Math.PI/180),0,Math.cos(cameraDirection[1]*Math.PI/180)]];
    zCameraMatrix = [[Math.cos(cameraDirection[2]*Math.PI/180),-Math.sin(cameraDirection[2]*Math.PI/180),0],[Math.sin(cameraDirection[2]*Math.PI/180),Math.cos(cameraDirection[2]*Math.PI/180),0],[0,0,1]];

    // transalate csys

    if (center == false) {
        for (let t=0; t<object.length; t++) {
            transformedObject[t] = [object[t][0]+(objects.shapes[id].position[0]*objects.scale), object[t][1]+(objects.shapes[id].position[1]*objects.scale), object[t][2]+(objects.shapes[id].position[2]*objects.scale)]
        }
    } else {
        for (v in object) { for (w in object){ transformedObject[v][w] = object[v][w]; }};
    }

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

    if (center == false) {
        csysInfo[csys] = [perspectiveObject[0],perspectiveObject[1]];
    }

    ctx.stroke();

}




//----------MISC FUNCTIONS----------//




function setObjectType(type) {
    if (focusObject == type) {
        focusObject = null;
    } else {
        focusObject = type;
    }
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




//----------CAMERA REVOLVE SCRIPT---------//




function revolves() {
    deltaX = mouseX - currentMouseX;
    deltaY = mouseY - currentMouseY;
    mouseX = currentMouseX;
    mouseY = currentMouseY;
    thetaZ = (deltaX/objects.scale)*30
    thetaY = (deltaY/objects.scale)*30

    cameraDirection[1] = cameraDirection[1] + thetaY
    cameraDirection[2] = cameraDirection[2] + thetaZ

    yRevolveMatrix = [[Math.cos(cameraDirection[1]*Math.PI/180),0,-Math.sin(cameraDirection[1]*Math.PI/180)],[0,1,0],[Math.sin(cameraDirection[1]*Math.PI/180),0,Math.cos(cameraDirection[1]*Math.PI/180)]];
    zRevolveMatrix = [[Math.cos(cameraDirection[2]*Math.PI/180),Math.sin(cameraDirection[2]*Math.PI/180),0],[-Math.sin(cameraDirection[2]*Math.PI/180),Math.cos(cameraDirection[2]*Math.PI/180),0],[0,0,1]];

    for (let j=0; j<zRevolveMatrix.length; j++) {
        for (let k=0; k<zRevolveMatrix[0].length; k++) {
            revolveMatrix[j][k] = yRevolveMatrix[j][0]*zRevolveMatrix[0][k]+yRevolveMatrix[j][1]*zRevolveMatrix[1][k]+yRevolveMatrix[j][2]*zRevolveMatrix[2][k];
        }
    }

    for (let k=0; k<cameraPosition.length; k++) {
        cameraPosition[k] = startCameraPosition[0]*revolveMatrix[0][k]+startCameraPosition[1]*revolveMatrix[1][k]+startCameraPosition[2]*revolveMatrix[2][k];
    }
}




//----------OBJECT MANIPULATION SCRIPTS----------//




function translateObject() {
    deltaX = currentMouseX - mouseX;
    deltaY = mouseY - currentMouseY;
    mouseX = currentMouseX;
    mouseY = currentMouseY;

    csysVector = [csysInfo[translateAxis][1][0]-csysInfo[translateAxis][0][0],csysInfo[translateAxis][1][1]-csysInfo[translateAxis][0][1]];

    translateFactor = (((csysVector[0]*deltaX)+(csysVector[1]*deltaY))/(Math.pow(csysVector[0],2)+Math.pow(csysVector[1],2)))/2;

    if (translateAxis == "csysX") {
        objects.shapes[focusObject].position[0] += translateFactor
    }
    if (translateAxis == "csysY") {
        objects.shapes[focusObject].position[1] += translateFactor
    }
    if (translateAxis == "csysZ") {
        objects.shapes[focusObject].position[2] += translateFactor
    }
}