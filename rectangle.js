

var _sound, _fft, _peak, _rects;

function rectObj () {
    this.x = random(0, width);
    this.y = random(0, height);
    this.length = random(10, 100);
    this.horz = (random() > 0.5);
    this.data = [];
    this.red = random() * 255;
    this.green = random() * 255;
    this.blue = random() * 255;
}
rectObj.prototype.render = function (spectData) {
    this.data = spectData;
    noFill();
    stroke(this.red, this.green, this.blue, spectData);
    var _mult = 4*(spectData / 255)
    strokeWeight(_mult);
    if (this.horz) {
        line(this.x, this.y, this.x, this.y+this.length);
        this.x += 2*(spectData / 255);
        if (this.x > width) {
            this.x=0;
        }    
    }else{
        line(this.x, this.y, this.x + this.length, this.y);
        this.y+= 2*(spectData / 255);
        if (this.y > height) {
            this.y=0;
        }    
    }
    
}



function preload() {
    _sound = loadSound("assets/S U R V I V E  - Hourglass.mp3");
}

function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvas-container');
    cnv.position(0,0);
    
    _fft = new p5.FFT(0.8,256);
    
    
    _peak = new p5.PeakDetect();
    _sound.loop();
    
    _rects = []
    for (var i = 0; i < 256; i++) {
        _rects[i] = new rectObj();
    }
}

function draw() {
    background(0,0,0, 1);
    
    var _s = _fft.analyze();
    var _w = _fft.waveform();
    
    
    
    for (var i = 0; i < _s.length; i++) {
        
        _rects[i].render(_s[i]);
    }
    
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
