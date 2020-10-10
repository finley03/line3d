class Objects {
    constructor() {
        this.originalShapes = {
            get getShapes() {
                return {
                    cube: {
                        name:"Cube",
                        points:[[1,1,1],[1,1,-1],[-1,1,1],[-1,1,-1],[1,-1,1],[1,-1,-1],[-1,-1,1],[-1,-1,-1]],
                        instructions:[[0,1],[1,3],[3,2],[2,0],[4,5],[5,7],[7,6],[6,4],[0,4],[2,6],[1,5],[3,7]]
                    },
                    wf_cube: {
                        name:"Wireframe Cube",
                        points:[[1,1,1],[1,1,-1],[-1,1,1],[-1,1,-1],[1,-1,1],[1,-1,-1],[-1,-1,1],[-1,-1,-1]],
						instructions:[[0,1],[0,3],[1,3],[3,2],[1,4],[2,0],[4,5],[2,7],[5,7],[7,6],[2,4],[5,3],[6,5],[6,4],[0,4],[2,6],[1,5],[3,7]]
                    },
                    sq_pyramid: {
                        name:"Pyramid",
                        points:[[1,1,-0.6],[1,-1,-0.6],[-1,-1,-0.6],[-1,1,-0.6],[0,0,0.8]],
                        instructions:[[0,1],[1,2],[2,3],[3,0],[0,4],[1,4],[2,4],[3,4]]
                    },
                    line: {
                        name:"Line",
                        points:[[1,1,0],[-1,-1,0]],
                        instructions:[[1,0]]
                    },
                }
            }
        }

        this.setScale();
        this.createButtons();
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
        this.shapes = this.originalShapes.getShapes;
        this.scaleObjects();
    }
}
