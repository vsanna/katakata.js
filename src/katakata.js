class Katakata {
  constructor(config){
    this.setConfig(config.target,
        config.text,
        config.devider,
        config.intervalMinSec,
        config.intervalMaxSec,
        config.debug);
  }

  setConfig(target = '#katakata', text = 'katakata', devider = ' ', intervalMinSec = 200, intervalMaxSec = 600, debug = false){
    this.$target = document.querySelector(target);
    this.text = text;
    this.devider = devider;
    this.intervalMinSec = intervalMinSec;
    this.intervalMaxSec = intervalMaxSec;
    this.characters = this.characters();
    this.innerChars = [];
    this.typingMachine = this.typeGenerate();
    if ( debug ){ window.katakataObject = this; }
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

  run(){
    let promise = this.typeCharPromise();
    this.typingController(promise);
  }

  typingController(promise){
    promise.then(()=>{
      this.typingController(this.typeCharPromise());
    })
  }

  typeCharPromise(){
    return new Promise((resolve, reject)=>{
      var result = this.typingMachine.next();

      // 必要であればセルを配置 
      this.setCellIfNecesasry();

      // 処理全体の終了判定
      this.finishIfNecessary(result)(); 

      // 表示を更新して次に進める
      this.type(result, resolve);
    })
  }

  setCellIfNecesasry(){
    if ( this.activeCell == null ){
      var typingCell = document.createElement('span');
      typingCell.classList.add('typing');
      typingCell.classList.add('on-edit');
      this.$target.appendChild(typingCell);
      this.activeCell = typingCell;
      return typingCell;
    }
  }

  finishIfNecessary(result){
    if ( result['done'] ){
      this.enter();
      return ()=>{ return; }
    } else {
      return ()=>{}
    }
  }

  type(result, resolve){
    setTimeout(()=>{
      this.typingBase(result['value']['char']);
      this.shouldEnter(result);
      resolve();
    },result['value']['interval'])
  }

  shouldEnter(result){
    if ( result['value']['char'] == this.devider ){
      this.enter();
    }
  }

  enter(){
    this.activeCell.classList.remove('on-edit');
    this.activeCell = null;
    this.innerChars = [];
  }


  typingBase(char){
    this.insertChar(char);
    this.showText();
  }

  insertChar(char){
    this.innerChars.push(char);
  }

  showText(){
    this.activeCell.innerText = this.innerChars.join(''); 
  }

}

module.exports = Katakata;
