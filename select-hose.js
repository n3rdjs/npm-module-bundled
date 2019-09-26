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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(3);
var EventEmitter = __webpack_require__(4).EventEmitter;

function Hose(socket, options, filter) {
  EventEmitter.call(this);

  if (typeof options === 'function') {
    filter = options;
    options = {};
  }

  this.socket = socket;
  this.options = options;
  this.filter = filter;

  this.buffer = null;

  var self = this;
  this.listeners = {
    error: function(err) {
      return self.onError(err);
    },
    data: function(chunk) {
      return self.onData(chunk);
    },
    end: function() {
      return self.onEnd();
    }
  };

  this.socket.on('error', this.listeners.error);
  this.socket.on('data', this.listeners.data);
  this.socket.on('end', this.listeners.end);
}
util.inherits(Hose, EventEmitter);
module.exports = Hose;

Hose.create = function create(socket, options, filter) {
  return new Hose(socket, options, filter);
};

Hose.prototype.detach = function detach() {
  // Stop the flow
  this.socket.pause();

  this.socket.removeListener('error', this.listeners.error);
  this.socket.removeListener('data', this.listeners.data);
  this.socket.removeListener('end', this.listeners.end);
};

Hose.prototype.reemit = function reemit() {
  var buffer = this.buffer;
  this.buffer = null;

  // Modern age
  if (this.socket.unshift) {
    this.socket.unshift(buffer);
    if (this.socket.listeners('data').length > 0)
      this.socket.resume();
    return;
  }

  // Rusty node v0.8
  if (this.socket.ondata)
    this.socket.ondata(buffer, 0, buffer.length);
  this.socket.emit('data', buffer);
  this.socket.resume();
};

Hose.prototype.onError = function onError(err) {
  this.detach();
  this.emit('error', err);
};

Hose.prototype.onData = function onData(chunk) {
  if (this.buffer)
    this.buffer = Buffer.concat([ this.buffer, chunk ]);
  else
    this.buffer = chunk;

  var self = this;
  this.filter(this.buffer, function(err, protocol) {
    if (err)
      return self.onError(err);

    // No protocol selected yet
    if (!protocol)
      return;

    self.detach();
    self.emit('select', protocol, self.socket);
    self.reemit();
  });
};

Hose.prototype.onEnd = function onEnd() {
  this.detach();
  this.emit('error', new Error('Not enough data to recognize protocol'));
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
