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

// write data to it, and it'll emit data in 512 byte blocks.
// if you .end() or .flush(), it'll emit whatever it's got,
// padded with nulls to 512 bytes.

module.exports = BlockStream

var Stream = __webpack_require__(3).Stream
  , inherits = __webpack_require__(4)
  , assert = __webpack_require__(7).ok
  , debug = process.env.DEBUG ? console.error : function () {}

function BlockStream (size, opt) {
  this.writable = this.readable = true
  this._opt = opt || {}
  this._chunkSize = size || 512
  this._offset = 0
  this._buffer = []
  this._bufferLength = 0
  if (this._opt.nopad) this._zeroes = false
  else {
    this._zeroes = new Buffer(this._chunkSize)
    for (var i = 0; i < this._chunkSize; i ++) {
      this._zeroes[i] = 0
    }
  }
}

inherits(BlockStream, Stream)

BlockStream.prototype.write = function (c) {
  // debug("   BS write", c)
  if (this._ended) throw new Error("BlockStream: write after end")
  if (c && !Buffer.isBuffer(c)) c = new Buffer(c + "")
  if (c.length) {
    this._buffer.push(c)
    this._bufferLength += c.length
  }
  // debug("pushed onto buffer", this._bufferLength)
  if (this._bufferLength >= this._chunkSize) {
    if (this._paused) {
      // debug("   BS paused, return false, need drain")
      this._needDrain = true
      return false
    }
    this._emitChunk()
  }
  return true
}

BlockStream.prototype.pause = function () {
  // debug("   BS pausing")
  this._paused = true
}

BlockStream.prototype.resume = function () {
  // debug("   BS resume")
  this._paused = false
  return this._emitChunk()
}

BlockStream.prototype.end = function (chunk) {
  // debug("end", chunk)
  if (typeof chunk === "function") cb = chunk, chunk = null
  if (chunk) this.write(chunk)
  this._ended = true
  this.flush()
}

BlockStream.prototype.flush = function () {
  this._emitChunk(true)
}

BlockStream.prototype._emitChunk = function (flush) {
  // debug("emitChunk flush=%j emitting=%j paused=%j", flush, this._emitting, this._paused)

  // emit a <chunkSize> chunk
  if (flush && this._zeroes) {
    // debug("    BS push zeroes", this._bufferLength)
    // push a chunk of zeroes
    var padBytes = (this._bufferLength % this._chunkSize)
    if (padBytes !== 0) padBytes = this._chunkSize - padBytes
    if (padBytes > 0) {
      // debug("padBytes", padBytes, this._zeroes.slice(0, padBytes))
      this._buffer.push(this._zeroes.slice(0, padBytes))
      this._bufferLength += padBytes
      // debug(this._buffer[this._buffer.length - 1].length, this._bufferLength)
    }
  }

  if (this._emitting || this._paused) return
  this._emitting = true

  // debug("    BS entering loops")
  var bufferIndex = 0
  while (this._bufferLength >= this._chunkSize &&
         (flush || !this._paused)) {
    // debug("     BS data emission loop", this._bufferLength)

    var out
      , outOffset = 0
      , outHas = this._chunkSize

    while (outHas > 0 && (flush || !this._paused) ) {
      // debug("    BS data inner emit loop", this._bufferLength)
      var cur = this._buffer[bufferIndex]
        , curHas = cur.length - this._offset
      // debug("cur=", cur)
      // debug("curHas=%j", curHas)
      // If it's not big enough to fill the whole thing, then we'll need
      // to copy multiple buffers into one.  However, if it is big enough,
      // then just slice out the part we want, to save unnecessary copying.
      // Also, need to copy if we've already done some copying, since buffers
      // can't be joined like cons strings.
      if (out || curHas < outHas) {
        out = out || new Buffer(this._chunkSize)
        cur.copy(out, outOffset,
                 this._offset, this._offset + Math.min(curHas, outHas))
      } else if (cur.length === outHas && this._offset === 0) {
        // shortcut -- cur is exactly long enough, and no offset.
        out = cur
      } else {
        // slice out the piece of cur that we need.
        out = cur.slice(this._offset, this._offset + outHas)
      }

      if (curHas > outHas) {
        // means that the current buffer couldn't be completely output
        // update this._offset to reflect how much WAS written
        this._offset += outHas
        outHas = 0
      } else {
        // output the entire current chunk.
        // toss it away
        outHas -= curHas
        outOffset += curHas
        bufferIndex ++
        this._offset = 0
      }
    }

    this._bufferLength -= this._chunkSize
    assert(out.length === this._chunkSize)
    // debug("emitting data", out)
    // debug("   BS emitting, paused=%j", this._paused, this._bufferLength)
    this.emit("data", out)
    out = null
  }
  // debug("    BS out of loops", this._bufferLength)

  // whatever is left, it's not enough to fill up a block, or we're paused
  this._buffer = this._buffer.slice(bufferIndex)
  if (this._paused) {
    // debug("    BS paused, leaving", this._bufferLength)
    this._needsDrain = true
    this._emitting = false
    return
  }

  // if flushing, and not using null-padding, then need to emit the last
  // chunk(s) sitting in the queue.  We know that it's not enough to
  // fill up a whole block, because otherwise it would have been emitted
  // above, but there may be some offset.
  var l = this._buffer.length
  if (flush && !this._zeroes && l) {
    if (l === 1) {
      if (this._offset) {
        this.emit("data", this._buffer[0].slice(this._offset))
      } else {
        this.emit("data", this._buffer[0])
      }
    } else {
      var outHas = this._bufferLength
        , out = new Buffer(outHas)
        , outOffset = 0
      for (var i = 0; i < l; i ++) {
        var cur = this._buffer[i]
          , curHas = cur.length - this._offset
        cur.copy(out, outOffset, this._offset)
        this._offset = 0
        outOffset += curHas
        this._bufferLength -= curHas
      }
      this.emit("data", out)
    }
    // truncate
    this._buffer.length = 0
    this._bufferLength = 0
    this._offset = 0
  }

  // now either drained or ended
  // debug("either draining, or ended", this._bufferLength, this._ended)
  // means that we've flushed out all that we can so far.
  if (this._needDrain) {
    // debug("emitting drain", this._bufferLength)
    this._needDrain = false
    this.emit("drain")
  }

  if ((this._bufferLength === 0) && this._ended && !this._endEmitted) {
    // debug("emitting end", this._bufferLength)
    this._endEmitted = true
    this.emit("end")
  }

  this._emitting = false

  // debug("    BS no longer emitting", flush, this._paused, this._emitting, this._bufferLength, this._chunkSize)
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(5);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(6);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ })
/******/ ]);
