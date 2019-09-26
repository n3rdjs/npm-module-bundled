/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2)


/***/ }),
/* 2 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

function ignoreFunction() {}

function createReturningFunction(value) {
	return function() {
		return value;
	};
}

function Parser(states) {
	this.states = this.compileStates(states);
}

Parser.prototype.compileStates = function(states) {
	var result = {};
	Object.keys(states).forEach(function(name) {
		result[name] = this.compileState(states[name], states);
	}, this);
	return result;
};

Parser.prototype.compileState = function(state, states) {
	var regExps = [];
	function iterator(str, value) {
		regExps.push({
			groups: Parser.getGroupCount(str),
			regExp: str,
			value: value
		});
	}
	function processState(statePart) {
		if(Array.isArray(statePart)) {
			statePart.forEach(processState);
		} else if(typeof statePart === "object") {
			Object.keys(statePart).forEach(function(key) {
				iterator(key, statePart[key]);
			});
		} else if(typeof statePart === "string") {
			processState(states[statePart]);
		} else {
			throw new Error("Unexpected 'state' format");
		}
	}
	processState(state);
	var total = regExps.map(function(r) {
		return "(" + r.regExp + ")";
	}).join("|");
	var actions = [];
	var pos = 1;
	regExps.forEach(function(r) {
		var fn;
		if(typeof r.value === "function") {
			fn = r.value;
		} else if(typeof r.value === "string") {
			fn = createReturningFunction(r.value);
		} else {
			fn = ignoreFunction;
		}
		actions.push({
			name: r.regExp,
			fn: fn,
			pos: pos,
			pos2: pos + r.groups + 1
		});
		pos += r.groups + 1;
	});
	return {
		regExp: new RegExp(total, "g"),
		actions: actions
	};
};

Parser.getGroupCount = function(regExpStr) {
	return new RegExp("(" + regExpStr + ")|^$").exec("").length - 2;
};

Parser.prototype.parse = function(initialState, string, context) {
	context = context || {};
	var currentState = initialState;
	var currentIndex = 0;
	for(;;) {
		var state = this.states[currentState];
		var regExp = state.regExp;
		regExp.lastIndex = currentIndex;
		var match = regExp.exec(string);
		if(!match) return context;
		var actions = state.actions;
		currentIndex = state.regExp.lastIndex;
		for(var i = 0; i < actions.length; i++) {
			var action = actions[i];
			if(match[action.pos]) {
				var ret = action.fn.apply(context, Array.prototype.slice.call(match, action.pos, action.pos2).concat([state.regExp.lastIndex - match[0].length, match[0].length]));
				if(ret) {
					if(!(ret in this.states))
						throw new Error("State '" + ret + "' doesn't exist");
					currentState = ret;
				}
				break;
			}
		}
	}
};

module.exports = Parser;


/***/ })
/******/ ]);
