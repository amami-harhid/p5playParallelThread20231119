p.PicoSprite = class extends p.Sprite {
  
  constructor(...args){
    super(...args);
    this.build();
    this.timer = 0;
  }
  build() {
    const crReg = new p.ControlRegister();
    this.crReg = crReg;
    const C = new p.Control(crReg);
    
    // 入れ子にする場合には asyncを必ずつけること
    // 入れ子には await を必ずつけること
    const _topMethod = 
    C.LoopForEver(async _=>{
      await C.LoopRepeat(40, _=>{
        this.x +=2;
        if(this.x > W) this.x = 0;
      })();
      await C.LoopRepeat(10, async _=>{
        this.rotation += 5;
        if(this.y > H) this.y = 0;
        await C.LoopRepeat(5, _=>{
          this.y += 2;
        })();
      })();
    });
    setTimeout(_topMethod, 1000);
  }
  draw() {
    super.draw();
    this.crReg.waitCancel = true;
  }
}