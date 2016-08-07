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
	var katakata = new Katakata({ 'text': '<Project Name/>' })
	katakata.run();
	


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	/******/(function (modules) {
		// webpackBootstrap
		/******/ // The module cache
		/******/var installedModules = {};
		/******/
		/******/ // The require function
		/******/function __webpack_require__(moduleId) {
			/******/
			/******/ // Check if module is in cache
			/******/if (installedModules[moduleId])
				/******/return installedModules[moduleId].exports;
			/******/
			/******/ // Create a new module (and put it into the cache)
			/******/var module = installedModules[moduleId] = {
				/******/exports: {},
				/******/id: moduleId,
				/******/loaded: false
				/******/ };
			/******/
			/******/ // Execute the module function
			/******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
			/******/
			/******/ // Flag the module as loaded
			/******/module.loaded = true;
			/******/
			/******/ // Return the exports of the module
			/******/return module.exports;
			/******/
		}
		/******/
		/******/
		/******/ // expose the modules object (__webpack_modules__)
		/******/__webpack_require__.m = modules;
		/******/
		/******/ // expose the module cache
		/******/__webpack_require__.c = installedModules;
		/******/
		/******/ // __webpack_public_path__
		/******/__webpack_require__.p = "";
		/******/
		/******/ // Load entry module and return exports
		/******/return __webpack_require__(0);
		/******/
	})(
	/************************************************************************/
	/******/[
	/* 0 */
	/***/function (module, exports) {
	
		'use strict';
	
		var _createClass = function () {
			function defineProperties(target, props) {
				for (var i = 0; i < props.length; i++) {
					var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
				}
			}return function (Constructor, protoProps, staticProps) {
				if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
			};
		}();
	
		function _classCallCheck(instance, Constructor) {
			if (!(instance instanceof Constructor)) {
				throw new TypeError("Cannot call a class as a function");
			}
		}
	
		var Katakata = function () {
			function Katakata(config) {
				_classCallCheck(this, Katakata);
	
				this.setConfig(config.target, config.text, config.devider, config.intervalMinSec, config.intervalMaxSec, config.debug);
			}
	
			_createClass(Katakata, [{
				key: 'setConfig',
				value: function setConfig() {
					var target = arguments.length <= 0 || arguments[0] === undefined ? '#katakata' : arguments[0];
					var text = arguments.length <= 1 || arguments[1] === undefined ? 'katakata' : arguments[1];
					var devider = arguments.length <= 2 || arguments[2] === undefined ? ' ' : arguments[2];
					var intervalMinSec = arguments.length <= 3 || arguments[3] === undefined ? 200 : arguments[3];
					var intervalMaxSec = arguments.length <= 4 || arguments[4] === undefined ? 600 : arguments[4];
					var debug = arguments.length <= 5 || arguments[5] === undefined ? false : arguments[5];
	
					this.$target = document.querySelector(target);
					this.text = text;
					this.devider = devider;
					this.intervalMinSec = intervalMinSec;
					this.intervalMaxSec = intervalMaxSec;
					this.characters = this.characters();
					this.innerChars = [];
					this.typingMachine = this.typeGenerate();
					if (debug) {
						window.katakataObject = this;
					}
				}
			}, {
				key: 'run',
				value: function run() {
					var promise = this.typeCharPromise();
					this.typingController(promise);
				}
			}, {
				key: 'createCell',
				value: function createCell() {
					var typingCell = document.createElement('span');
					typingCell.classList.add('typing');
					this.$target.append(typingCell);
					this.activeCell = typingCell;
					this.startEdit();
					return typingCell;
				}
			}, {
				key: 'characters',
				value: function characters() {
					var _this = this;
	
					return this.text.split('').map(function (char) {
						return {
							'char': char,
							'interval': _this.getInterval(char)
						};
					});
				}
			}, {
				key: 'getInterval',
				value: function getInterval(char) {
					var intervalBase = this.getIntervalBase();
					var interval = char == ' ' ? intervalBase * 3 : intervalBase;
					return interval < 1000 ? interval : 1000;
				}
			}, {
				key: 'getIntervalBase',
				value: function getIntervalBase() {
					return this.intervalMinSec - 1 + Math.floor(Math.random() * this.intervalMaxSec);
				}
			}, {
				key: 'typeGenerate',
				value: regeneratorRuntime.mark(function typeGenerate() {
					return regeneratorRuntime.wrap(function typeGenerate$(_context) {
						while (1) {
							switch (_context.prev = _context.next) {
								case 0:
									return _context.delegateYield(this.characters, 't0', 1);
	
								case 1:
								case 'end':
									return _context.stop();
							}
						}
					}, typeGenerate, this);
				})
			}, {
				key: 'typeCharPromise',
				value: function typeCharPromise() {
					var _this2 = this;
	
					return new Promise(function (resolve, reject) {
						var result = _this2.typingMachine.next();
	
						if (result['done'] || result['value']['char'] == _this2.devider) {
							_this2.enter();
							if (result['done']) {
								return;
							}
						}
	
						setTimeout(function () {
							_this2.typingBase(result['value']['char']);
							resolve();
						}, result['value']['interval']);
					});
				}
			}, {
				key: 'typingController',
				value: function typingController(promise) {
					var _this3 = this;
	
					promise.then(function () {
						_this3.typingController(_this3.typeCharPromise());
					});
				}
			}, {
				key: 'typingBase',
				value: function typingBase(char) {
					this.insertChar(char);
					this.typeText();
				}
			}, {
				key: 'insertChar',
				value: function insertChar(char) {
					this.innerChars.push(char);
				}
			}, {
				key: 'typeText',
				value: function typeText() {
					this.activeCell.innerText = this.innerChars.join('');
				}
			}, {
				key: 'startEdit',
				value: function startEdit() {
					this.activeCell.classList.add('on-edit');
				}
			}, {
				key: 'enter',
				value: function enter() {
					this.activeCell.classList.remove('on-edit');
					this.activeCell = null;
					this.innerChars = [];
				}
			}]);
	
			return Katakata;
		}();
	
		module.exports = Katakata;
	
		/***/
	}
	/******/]);
	//# sourceMappingURL=katakata.js.map

/***/ }
/******/ ]);
//# sourceMappingURL=output.js.map