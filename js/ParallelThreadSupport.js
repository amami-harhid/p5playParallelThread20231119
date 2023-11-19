/*
 * Version 0.0.1 ( 2023/11/19 )
 * 現在、サポートする繰り返し処理はまだ２つだけです。
 * LoopForEver(ずっと繰り返す)
 * LoopRepeat( 〇回繰り返す )
 * 今後増やしていく予定です。
*/
p5.prototype.registerMethod('init', function() {
  const p = this;
  p.Wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
  // await Wait(2) により 2ms ～ 4ms 停止する感じ
  const UntilMs = 2;
  p.Until = async(condition,callback)=>new Promise(async resolve=>{
    for(;;){
      if(condition()){
        break;
      }
      await p.Wait(UntilMs);
    }
    if(callback){
      callback();
    }
    resolve();
  });  
  p.ControlRegister = class {
    constructor(self){
      this.self = self;
      this.methodRegester = new Map();
      this.waitCancel = false;
    }
    isRegisted(_f){
      return this.methodRegester.has(_f);
    }
    regist(_f, _wrap) {
      if(!this.isRegisted(_f)){
        this.methodRegester.set(_f,_wrap);
      }
    }
    getWrapMethod(_f) {
      return this.methodRegester.get(_f);
    }
    setWaitCancel(_cancel) {
      this.waitCancel = _cancel;
    }    
  }
  p.Control = class {
    constructor(_controllerRegister){
      this.cr = _controllerRegister;
    }
    LoopForEver(_f) {
      const cr = this.cr;
      if(!cr.isRegisted(_f)){
        const wrap = async() => {
          for(;;) {
            await _f();
            await p.Until(
              _=> cr.waitCancel === true,
              _=> cr.waitCancel = false
            );
          }
        };
        cr.regist(_f, wrap);
      }
      const wrapper = cr.getWrapMethod(_f);
      return wrapper;
    }
    LoopRepeat(_count, _f) {
      const cr = this.cr;
      if(!cr.isRegisted(_f)){
        const wrap = async() => {
          for(let i=0;i<_count;i++) {
            await _f();
            await p.Until(
              _=>cr.waitCancel === true,
              _=> cr.waitCancel = false
            );
          }
        };
        cr.regist(_f, wrap);
      }
      const wrapper = cr.getWrapMethod(_f);
      return wrapper;
    }  
  }
  
});


