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

module.exports = Walker

var path = __webpack_require__(3)
  , fs = __webpack_require__(4)
  , util = __webpack_require__(5)
  , EventEmitter = __webpack_require__(6).EventEmitter
  , makeError = __webpack_require__(7)

/**
 * To walk a directory. It's complicated (but it's async, so it must be fast).
 *
 * @param root {String} the directory to start with
 */
function Walker(root) {
  if (!(this instanceof Walker)) return new Walker(root)
  EventEmitter.call(this)
  this._pending = 0
  this._filterDir = function() { return true }
  this.go(root)
}
util.inherits(Walker, EventEmitter)

/**
 * Errors of this type are thrown when the type of a file could not be
 * determined.
 */
var UnknownFileTypeError = Walker.UnknownFileTypeError = makeError(
  'UnknownFileTypeError',
  'The type of this file could not be determined.'
)

/**
 * Setup a function to filter out directory entries.
 *
 * @param fn {Function} a function that will be given a directory name, which
 * if returns true will include the directory and it's children
 */
Walker.prototype.filterDir = function(fn) {
  this._filterDir = fn
  return this
}

/**
 * Process a file or directory.
 */
Walker.prototype.go = function(entry) {
  var that = this
  this._pending++

  fs.lstat(entry, function(er, stat) {
    if (er) {
      that.emit('error', er, entry, stat)
      that.doneOne()
      return
    }

    if (stat.isDirectory()) {
      if (!that._filterDir(entry, stat)) {
        that.doneOne()
      } else {
        fs.readdir(entry, function(er, files) {
          if (er) {
            that.emit('error', er, entry, stat)
            that.doneOne()
            return
          }

          that.emit('entry', entry, stat)
          that.emit('dir', entry, stat)
          files.forEach(function(part) {
            that.go(path.join(entry, part))
          })
          that.doneOne()
        })
      }
    } else if (stat.isSymbolicLink()) {
      that.emit('entry', entry, stat)
      that.emit('symlink', entry, stat)
      that.doneOne()
    } else if (stat.isBlockDevice()) {
      that.emit('entry', entry, stat)
      that.emit('blockDevice', entry, stat)
      that.doneOne()
    } else if (stat.isCharacterDevice()) {
      that.emit('entry', entry, stat)
      that.emit('characterDevice', entry, stat)
      that.doneOne()
    } else if (stat.isFIFO()) {
      that.emit('entry', entry, stat)
      that.emit('fifo', entry, stat)
      that.doneOne()
    } else if (stat.isSocket()) {
      that.emit('entry', entry, stat)
      that.emit('socket', entry, stat)
      that.doneOne()
    } else if (stat.isFile()) {
      that.emit('entry', entry, stat)
      that.emit('file', entry, stat)
      that.doneOne()
    } else {
      that.emit('error', UnknownFileTypeError(), entry, stat)
      that.doneOne()
    }
  })
  return this
}

Walker.prototype.doneOne = function() {
  if (--this._pending === 0) this.emit('end')
  return this
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var tmpl = __webpack_require__(8)

module.exports = makeError

function BaseError() {}
BaseError.prototype = new Error()
BaseError.prototype.toString = function() {
  return this.message
}


/**
 * Makes an Error function with the signature:
 *
 *   function(message, data)
 *
 * You'll typically do something like:
 *
 *   var UnknownFileTypeError = makeError(
 *     'UnknownFileTypeError',
 *     'The specified type is not known.'
 *   )
 *   var er = UnknownFileTypeError()
 *
 * `er` will have a prototype chain that ensures:
 *
 *   er instanceof Error
 *   er instanceof UnknownFileTypeError
 *
 * You can also do `var er = new UnknownFileTypeError()` if you really like the
 * `new` keyword.
 *
 * @param String  The name of the error.
 * @param String  The default message string.
 * @param Object  The default data object, merged with per instance data.
 */
function makeError(name, defaultMessage, defaultData) {
  defaultMessage = tmpl(defaultMessage || '')
  defaultData = defaultData || {}
  if (defaultData.proto && !(defaultData.proto instanceof BaseError))
    throw new Error('The custom "proto" must be an Error created via makeError')

  var CustomError = function(message, data) {
    if (!(this instanceof CustomError)) return new CustomError(message, data)

    if (typeof message !== 'string' && !data) {
      data = message
      message = null
    }

    this.name = name
    this.data = data || defaultData

    if (typeof message === 'string') {
      this.message = tmpl(message, this.data)
    } else {
      this.message = defaultMessage(this.data)
    }

    var er = new Error()
    this.stack = er.stack
    if (this.stack) {
      // remove TWO stack level:
      if (typeof Components !== 'undefined') {
        // Mozilla:
        this.stack = this.stack.substring(this.stack.indexOf('\n') + 2)
      } else if (typeof chrome !== 'undefined' || typeof process !== 'undefined') {
        // Google Chrome/Node.js:
        this.stack = this.stack.replace(/\n[^\n]*/, '')
        this.stack = this.stack.replace(/\n[^\n]*/, '')
        this.stack = (
          this.name +
          (this.message ? (': ' + this.message) : '') +
          this.stack.substring(5)
        )
      }
    }

    if ('fileName' in er) this.fileName = er.fileName
    if ('lineNumber' in er) this.lineNumber = er.lineNumber
  }

  CustomError.prototype = defaultData.proto || new BaseError()
  delete defaultData.proto

  return CustomError
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

var INTERPOLATE = /{([\s\S]+?)}/g

module.exports = function(str, data) {
  var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
    'with(obj||{}){__p.push(\'' +
    str.replace(/\\/g, '\\\\')
       .replace(/'/g, "\\'")
       .replace(INTERPOLATE, function(match, code) {
         return "'," + code.replace(/\\'/g, "'") + ",'"
       })
       .replace(/\r/g, '\\r')
       .replace(/\n/g, '\\n')
       .replace(/\t/g, '\\t')
       + "');}return __p.join('');"
  var func = new Function('obj', tmpl)
  return data ? func(data) : func
}


/***/ })
/******/ ]);
