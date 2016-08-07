class Katakata {
  constructor(config){
    this.setConfig(config.target, config.text, config.intervalMinSec, config.intervalMaxSec, config.debug);
  }

  setConfig(target = '#katakata', text = 'katakata', intervalMinSec = 200, intervalMaxSec = 600, debug = false){
    this.$target = document.querySelector(target);
    this.text = text;
    this.intervalMinSec = intervalMinSec;
    this.intervalMaxSec = intervalMaxSec;
    this.characters = this.characters();
    this.innerChars = [];
    if ( debug ){ window.katakataObject = this; }
  }

  run(){
    this.startEdit();
    this.type();
  }

  type(){
    this.typingMachine = this.typeGenerate();
    let promise = this.typeCharPromise();
    this.typingController(promise);
  }

  startEdit(){
    this.$target.classList.add('on-edit');
  }

  finishEdit(){
    this.$target.classList.remove('on-edit');
  }

  characters(){
    return this.text.split('').map((char) => {
      return {
        'char': char,
        'interval': this.getInterval(char)
      }
    })
  }

  getInterval(char){
    var intervalBase = this.getIntervalBase();
    var interval = (char == ' ') ? intervalBase * 3 : intervalBase;
    return (interval < 1000) ? interval : 1000;
  }

  getIntervalBase(){
    return this.intervalMinSec - 1 + Math.floor(Math.random() * this.intervalMaxSec);
  }

  * typeGenerate(){
    yield* this.characters;
  }

  typeCharPromise(){
    return new Promise((resolve, reject)=>{
      var result = this.typingMachine.next();
      if ( result['done'] ){
        this.finishEdit();
        return;
      }

      setTimeout(()=>{
        this.typingBase(result['value']['char']);
        resolve();
      },result['value']['interval'])
    })
  }

  typingController(promise){
    promise.then(()=>{
      this.typingController(this.typeCharPromise());
    })
  }

  typingBase(char){
    this.insertChar(char);
    this.typeText();
  }

  insertChar(char){
    this.innerChars.push(char);
  }

  typeText(){
    this.$target.innerText = this.innerChars.join(''); 
  }
}

module.exports = Katakata;
