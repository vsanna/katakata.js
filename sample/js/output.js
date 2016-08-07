/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Katakata = __webpack_require__(1);
	var katakata = new Katakata({ 'text': "what |you |want |to |show\n| たとえば| 改行も | できるんだぜ", 'devider': '|'})
	katakata.run();
	


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var katakata = __webpack_require__(2);
	
	module.exports = katakata;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class Katakata {
	  constructor(config){
	    this.setConfig(config.target,
	        config.text,
	        config.devider,
	        config.intervalMinMSec,
	        config.intervalMaxMsec,
	        config.debug);
	  }
	
	  setConfig(target = '#katakata', text = 'katakata', devider = ' ', intervalMinMSec = 100, intervalMaxMsec = 400, debug = false){
	    this.$target = document.querySelector(target);
	    this.text = text;
	    this.devider = devider;
	    this.intervalMinMSec = intervalMinMSec;
	    this.intervalMaxMsec = intervalMaxMsec;
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
	    var interval = (char == this.devider) ? intervalBase * 3 : intervalBase;
	    return (interval < 1000) ? interval : 1000;
	  }
	
	  getIntervalBase(){
	    return this.intervalMinMSec + Math.floor(Math.random() * (this.intervalMaxMsec - this.intervalMinMSec));
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
	      if ( result['done'] ){
	        this.enter(null);
	        return;
	      }
	
	      // 表示を更新
	      this.enterOrType(result, resolve);
	    })
	  }
	
	  setCellIfNecesasry(){
	    if ( this.activeCell == null ){
	      var typingCell = document.createElement('span');
	      typingCell.classList.add('typing');
	      typingCell.classList.add('on-edit');
	      this.$target.appendChild(typingCell);
	      this.activeCell = typingCell;
	    }
	  }
	
	  enterOrType(result, resolve){
	    if ( result['value']['char'] == this.devider ){
	      this.enter(resolve);
	    } else {
	      this.type(result, resolve);
	    }
	  }
	
	  type(result, resolve){
	    setTimeout(()=>{
	      this.typingBase(result['value']['char']);
	      resolve();
	    },result['value']['interval'])
	  }
	
	  enter(resolve){
	    setTimeout(()=>{
	      this.activeCell.classList.remove('on-edit');
	      if ( resolve == null){
	        return;
	      } else {
	        this.activeCell = null;
	        this.innerChars = [];
	        resolve();
	      }
	    }, 600) // 余韻
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


/***/ }
/******/ ]);
//# sourceMappingURL=output.js.map