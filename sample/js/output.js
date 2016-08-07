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
	var katakata = new Katakata({ 'text': '<Project Name/>', 'debug': true })
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
	    console.log(interval);
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


/***/ }
/******/ ]);
//# sourceMappingURL=output.js.map