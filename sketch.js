window.onload = () => {
  new p5( sketch );
};
const W = window.innerWidth *0.5;
const H = window.innerHeight*0.5;
const sketch = function( p ) {
　p.preload = function(){
    p.dynamicLoadScript('./js/Pico.js');
  };
  
  p.setup = function(){
    new p.Canvas(W,H);
    let s = new p.PicoSprite(30,0);
    s.scale = 0.5;
  };
  p.draw = function() {
    p.background(0);
  }
};