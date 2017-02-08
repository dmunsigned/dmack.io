var _fft, _peak, _sound, _eWidth;


function preload() {
     _sound = loadSound('dada.mp3');
}


function setup() {
    var cnv = createCanvas(windowWidth, windowHeight);
    cnv.parent('canvas-container');
    cnv.position(0,0);
    
   
    _fft = new p5.FFT();
    _fft.bins = 128;
    _peak = new p5.PeakDetect();
    
    background(255,255,255);
    
    _eWidth = windowWidth * 0.1;
    
   // _sound.loop();
    _sound.play();
}


function draw() {
    
    background(255,255,255,50);
    
    _spect = _fft.analyze();
    _peak.update(_fft);
    _peak.threshold = 0.15;
    
    if (_peak.isDetected) {
        _eWidth = windowWidth * 0.35;
        text("BEAT", windowWidth - textWidth("BEAT") - 100, windowHeight - 50);
    }else{
        _eWidth = _eWidth * 0.9;
        text("NO BEAT", windowWidth - textWidth("NO BEAT") - 100, windowHeight - 25);
    }
    
    noStroke();
    fill(25,25,25);
    ellipse(windowWidth/2, windowHeight/2, _eWidth, _eWidth);
    
    noFill();
    beginShape();
    stroke(100,0,0);
    for (var i = 0; i < _spect.length; i++) {
        //console.log(_spect[i]);
        vertex(i, map(_spect[i], 0, 255, height, 0));
    }
    endShape(); 
    
    

}