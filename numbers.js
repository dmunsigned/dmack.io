//Differnet Font
//Resize Text
//Text centred on cell.
//Better colour pallete


var grid = [];
var gridDensity = 12;
var gridDensityVert = gridDensity;

var shouldAnimate = false;
var mouseXCell = 0;
var mouseYCell = 0;

function gridCell() {
    this.x = 0;
    this.width = 100;
    this.y = 0;
    this.height = 100;
    this.number = "00.000";
    this.actualNumber = 0;
    this.drawText = false;
    this.siblings = [];
    this.influence = 0;
}
gridCell.prototype.updateNumber = function () {
    var num = (Math.random() * 2) - 1;
    this.actualNumber = num;
    this.number = num.toPrecision(3);
    
}
gridCell.prototype.renderText = function() {
    fill(0,0,0);
    text(this.number, this.x*this.width, (this.y*this.height) + this.height/2);
}
gridCell.prototype.render = function () {
    this.width = windowWidth / gridDensity;
    this.height = windowHeight / gridDensityVert;
    
    
    noStroke();
    if (shouldAnimate) {
        this.influence = 0;
        if (Math.random() > 0.98) {
            fill(0, 0, 0);
            rect(this.x * this.width, this.y * this.height, this.width-2, this.height-2);
        }
        fill(0,0,0)
        this.updateNumber();
    }
    this.renderText();
}
gridCell.prototype.setActive = function () {
    fill(25, 50, 75);
    rect(this.x * this.width, this.y * this.height, this.width-2, this.height-2);
}
gridCell.prototype.addInfluence = function () {
    this.influence += 0.2;
    if (this.influence > 255) {this.influence = 255;}
    fill(255 - this.influence, 255 - this.influence, 255 - this.influence);
    rect(this.x * this.width, this.y * this.height, this.width-2, this.height-2);
    this.renderText();
}


//P5 Shit
function setup() {
    createCanvas(windowWidth, windowHeight);
    //Create Grid
    if (windowWidth > windowHeight) {
        gridDensityVert = Math.floor(gridDensity * (windowWidth/windowHeight));
        console.log(gridDensityVert);
    }
    for (var x = 0; x < gridDensity; x++) {
        grid[x] = []
        for (var y = 0; y < gridDensityVert; y++){
            grid[x][y] = new gridCell();
            grid[x][y].x = x;
            grid[x][y].y = y;
        }
    }
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            var cell = grid[x][y];
            if (x - 1 > 0) {
                //Get the Left
                cell.siblings.push(grid[x - 1][y]);
            }
            if (x + 1 < gridDensity) {
                //Get the Right
                cell.siblings.push(grid[x + 1][y]);
            }
            if (y - 1 > 0) {
                //Get the Top
                cell.siblings.push(grid[x][y - 1]);
            }
            if (y + 1 < gridDensityVert) {
                //Get the Bottom
                cell.siblings.push(grid[x][y + 1]);
            }
            if (x - 1 > 0 && y - 1 > 0) {
                //Get the top left
                cell.siblings.push(grid[x - 1][y - 1]);
            }
            if (x + 1 < gridDensity && y - 1 > 0) {
                //Get the top right
                cell.siblings.push(grid[x + 1][y - 1]);
            }
            if (x - 1 > 0 && y + 1 < gridDensityVert) {
                //Get the bottom Left
                cell.siblings.push(grid[x - 1][y + 1]);
            }
            if (x + 1 < gridDensity && y + 1 < gridDensityVert) {
                //Get the bottom right
                cell.siblings.push(grid[x + 1][y + 1]);
            }
        }
    }
}

function draw() {
    mouseXCell = Math.floor(mouseX  / (windowWidth / gridDensity));
    mouseYCell = Math.floor(mouseY / (windowHeight / gridDensityVert));
    
    var goodXCell = -1;
    var goodYCell = -1;
    
    background(255,255,255, 200);
    for (var x = 0; x < grid.length; x++) {
        for (var y = 0; y < grid[x].length; y++) {
            grid[x][y].render();
        }
    }
    if (mouseXCell >= 0 && mouseXCell < gridDensity && 
        mouseYCell >= 0 && mouseYCell < gridDensityVert) {
        
        goodXCell = mouseXCell;
        goodYCell = mouseYCell;
        
        grid[mouseXCell][mouseYCell].setActive();
    }
    
    if (!shouldAnimate) {
        //Search Siblings
        if (goodXCell != -1 && goodYCell != -1) {
            for (var x = 0; x < grid.length; x++) {
                for (var y = 0; y < grid[x].length; y++) {
                    for (var s = 0; s < grid[x][y].siblings.length; s++) {
                        if (grid[x][y].siblings[s].actualNumber - grid[x][y].actualNumber > 0.025) {
                            grid[x][y].siblings[s].updateNumber();
                            grid[x][y].siblings[s].addInfluence();
                        }
                    }
                }
            }   
        }
    }
    
    shouldAnimate = false;
}

function mouseMoved() {
    shouldAnimate = true;
}

function mousePressed() {
    shouldAnimate = true;
}
function touchMoved() {
    shouldAnimate = true;   
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
