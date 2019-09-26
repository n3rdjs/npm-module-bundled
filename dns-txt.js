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


var bindexOf = __webpack_require__(3)

var equalSign = new Buffer('=')

module.exports = function (opts) {
  var binary = opts ? opts.binary : false
  var that = {}

  that.encode = function (data, buf, offset) {
    if (!data) data = {}
    if (!offset) offset = 0
    if (!buf) buf = new Buffer(that.encodingLength(data) + offset)

    var oldOffset = offset
    var keys = Object.keys(data)

    if (keys.length === 0) {
      buf[offset] = 0
      offset++
    }

    keys.forEach(function (key) {
      var val = data[key]
      var oldOffset = offset
      offset++

      if (val === true) {
        offset += buf.write(key, offset)
      } else if (Buffer.isBuffer(val)) {
        offset += buf.write(key + '=', offset)
        var len = val.length
        val.copy(buf, offset, 0, len)
        offset += len
      } else {
        offset += buf.write(key + '=' + val, offset)
      }

      buf[oldOffset] = offset - oldOffset - 1
    })

    that.encode.bytes = offset - oldOffset
    return buf
  }

  that.decode = function (buf, offset, len) {
    if (!offset) offset = 0
    if (!Number.isFinite(len)) len = buf.length
    var data = {}
    var oldOffset = offset

    while (offset < len) {
      var b = decodeBlock(buf, offset)
      var i = bindexOf(b, equalSign)
      offset += decodeBlock.bytes

      if (b.length === 0) continue // ignore: most likely a single zero byte
      if (i === -1) data[b.toString().toLowerCase()] = true
      else if (i === 0) continue // ignore: invalid key-length
      else {
        var key = b.slice(0, i).toString().toLowerCase()
        if (key in data) continue // ignore: overwriting not allowed
        data[key] = binary ? b.slice(i + 1) : b.slice(i + 1).toString()
      }
    }

    that.decode.bytes = offset - oldOffset
    return data
  }

  that.encodingLength = function (data) {
    if (!data) return 1 // 1 byte (single empty byte)
    var keys = Object.keys(data)
    if (keys.length === 0) return 1 // 1 byte (single empty byte)
    return keys.reduce(function (total, key) {
      var val = data[key]
      total += Buffer.byteLength(key) + 1 // +1 byte to store field length
      if (Buffer.isBuffer(val)) total += val.length + 1 // +1 byte to fit equal sign
      else if (val !== true) total += Buffer.byteLength(String(val)) + 1 // +1 byte to fit equal sign
      return total
    }, 0)
  }

  return that
}

function decodeBlock (buf, offset) {
  var len = buf[offset]
  var to = offset + 1 + len
  var b = buf.slice(offset + 1, to > buf.length ? buf.length : to)
  decodeBlock.bytes = len + 1
  return b
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function bufferIndexOf(buff, search, offset, encoding){
  if (!Buffer.isBuffer(buff)) {
    throw TypeError('buffer is not a buffer');
  }

  // allow optional offset when providing an encoding
  if (encoding === undefined && typeof offset === 'string') {
    encoding = offset;
    offset = undefined;
  }

  if (typeof search === 'string') {
    search = new Buffer(search, encoding || 'utf8');
  } else if (typeof search === 'number' && !isNaN(search)) {
    search = new Buffer([search])
  } else if (!Buffer.isBuffer(search)) {
    throw TypeError('search is not a bufferable object');
  }

  if (search.length === 0) {
    return -1;
  }

  if (offset === undefined || (typeof offset === 'number' && isNaN(offset))) {
    offset = 0;
  } else if (typeof offset !== 'number') {
    throw TypeError('offset is not a number');
  }

  if (offset < 0) {
    offset = buff.length + offset
  }

  if (offset < 0) {
    offset = 0;
  }

  var m = 0;
  var s = -1;

  for (var i = offset; i < buff.length ; ++i) {
    if(buff[i] != search[m]){
      s = -1;
      // <-- go back
      // match abc to aabc
      // 'aabc'
      // 'aab'
      //    ^ no match
      // a'abc'
      //   ^ set index here now and look at these again.
      //   'abc' yay!
      i -= m-1
      m = 0;
    }

    if(buff[i] == search[m]) {
      if(s == -1) {
        s = i;
      }
      ++m;
      if(m == search.length) {
        break;
      }
    }
  }

  if (s > -1 && buff.length - s < search.length) {
    return -1;
  }
  return s;
}




/***/ })
/******/ ]);
