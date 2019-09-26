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

var assert = __webpack_require__(3);
var Buffer = __webpack_require__(4).Buffer;

function WBuf() {
  this.buffers = [];
  this.toReserve = 0;
  this.size = 0;
  this.maxSize = 0;
  this.avail = 0;

  this.last = null;
  this.offset = 0;

  // Used in slicing
  this.sliceQueue = null;

  this.forceReserve = false;

  // Mostly a constant
  this.reserveRate = 64;
}
module.exports = WBuf;

WBuf.prototype.reserve = function reserve(n) {
  this.toReserve += n;

  // Force reservation of extra bytes
  if (this.forceReserve)
    this.toReserve = Math.max(this.toReserve, this.reserveRate);
};

WBuf.prototype._ensure = function _ensure(n) {
  if (this.avail >= n)
    return;

  if (this.toReserve === 0)
    this.toReserve = this.reserveRate;

  this.toReserve = Math.max(n - this.avail, this.toReserve);

  if (this.avail === 0)
    this._next();
};

WBuf.prototype._next = function _next() {
  var buf;
  if (this.sliceQueue === null) {
    // Most common case
    buf = new Buffer(this.toReserve);
  } else {
    // Only for `.slice()` results
    buf = this.sliceQueue.shift();
    if (this.sliceQueue.length === 0)
      this.sliceQueue = null;
  }

  this.toReserve = 0;

  this.buffers.push(buf);
  this.avail = buf.length;
  this.offset = 0;
  this.last = buf;
};

WBuf.prototype._rangeCheck = function _rangeCheck() {
  if (this.maxSize !== 0 && this.size > this.maxSize)
    throw new RangeError('WBuf overflow');
};

WBuf.prototype._move = function _move(n) {
  this.size += n;
  if (this.avail === 0)
    this.last = null;

  this._rangeCheck();
};

WBuf.prototype.slice = function slice(start, end) {
  assert(0 <= start && start <= this.size);
  assert(0 <= end && end <= this.size);

  if (this.last === null)
    this._next();

  var res = new WBuf();

  // Only last chunk is requested
  if (start >= this.size - this.offset) {
    res.buffers.push(this.last);
    res.last = this.last;
    res.offset = start - this.size + this.offset;
    res.maxSize = end - start;
    res.avail = res.maxSize;

    return res;
  }

  var startIndex = -1;
  var startOffset = 0;
  var endIndex = -1;

  // Find buffer indices
  var offset = 0;
  for (var i = 0; i < this.buffers.length; i++) {
    var buf = this.buffers[i];
    var next = offset + buf.length;

    // Found the start
    if (start >= offset && start <= next) {
      startIndex = i;
      startOffset = start - offset;
      if (endIndex !== -1)
        break;
    }
    if (end >= offset && end <= next) {
      endIndex = i;
      if (startIndex !== -1)
        break;
    }

    offset = next;
  }

  res.last = this.buffers[startIndex];
  res.offset = startOffset;
  res.maxSize = end - start;

  // Multi-buffer slice
  if (startIndex < endIndex) {
    res.sliceQueue = this.buffers.slice(startIndex + 1, endIndex + 1);

    res.last = res.last.slice(res.offset);
    res.offset = 0;
  }

  res.avail = res.last.length - res.offset;
  res.buffers.push(res.last);

  return res;
};

WBuf.prototype.skip = function skip(n) {
  if (n === 0)
    return this.slice(this.size, this.size);

  this._ensure(n);

  var left = n;
  while (left > 0) {
    var toSkip = Math.min(left, this.avail);
    left -= toSkip;
    this.size += toSkip;
    if (toSkip === this.avail) {
      if (left !== 0) {
        this._next();
      } else {
        this.avail -= toSkip;
        this.offset += toSkip;
      }
    } else {
      this.offset += toSkip;
      this.avail -= toSkip;
    }
  }

  this._rangeCheck();

  return this.slice(this.size - n, this.size);
};

WBuf.prototype.write = function write(str) {
  var len = 0;
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c > 255)
      len += 2;
    else
      len += 1;
  }
  this.reserve(len);
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    var hi = c >>> 8;
    var lo = c & 0xff;

    if (hi)
      this.writeUInt8(hi);
    this.writeUInt8(lo);
  }
};

WBuf.prototype.copyFrom = function copyFrom(buf, start, end) {
  var off = start === undefined ? 0 : start;
  var len = end === undefined ? buf.length : end;
  if (off === len)
    return;

  this._ensure(len - off);
  while (off < len) {
    var toCopy = Math.min(len - off, this.avail);
    buf.copy(this.last, this.offset, off, off + toCopy);
    off += toCopy;
    this.size += toCopy;
    if (toCopy === this.avail) {
      if (off !== len) {
        this._next();
      } else {
        this.avail = 0;
        this.offset += toCopy;
      }
    } else {
      this.offset += toCopy;
      this.avail -= toCopy;
    }
  }

  this._rangeCheck();
};

WBuf.prototype.writeUInt8 = function writeUInt8(v) {
  this._ensure(1);

  this.last[this.offset++] = v;
  this.avail--;
  this._move(1);
};

WBuf.prototype.writeUInt16BE = function writeUInt16BE(v) {
  this._ensure(2);

  // Fast case - everything fits into the last buffer
  if (this.avail >= 2) {
    this.last.writeUInt16BE(v, this.offset);
    this.offset += 2;
    this.avail -= 2;

  // One byte here, one byte there
  } else {
    this.last[this.offset] = (v >>> 8);
    this._next();
    this.last[this.offset++] = v & 0xff;
    this.avail--;
  }

  this._move(2);
};

WBuf.prototype.writeUInt24BE = function writeUInt24BE(v) {
  this._ensure(3);

  // Fast case - everything fits into the last buffer
  if (this.avail >= 3) {
    this.last.writeUInt16BE(v >>> 8, this.offset);
    this.last[this.offset + 2] = v & 0xff;
    this.offset += 3;
    this.avail -= 3;
    this._move(3);

  // Two bytes here
  } else if (this.avail >= 2) {
    this.last.writeUInt16BE(v >>> 8, this.offset);
    this._next();
    this.last[this.offset++] = v & 0xff;
    this.avail--;
    this._move(3);

  // Just one byte here
  } else {
    this.last[this.offset] = v >>> 16;
    this._move(1);
    this._next();
    this.writeUInt16BE(v & 0xffff);
  }
};

WBuf.prototype.writeUInt32BE = function writeUInt32BE(v) {
  this._ensure(4);

  // Fast case - everything fits into the last buffer
  if (this.avail >= 4) {
    this.last.writeUInt32BE(v, this.offset);
    this.offset += 4;
    this.avail -= 4;
    this._move(4);

  // Three bytes here
  } else if (this.avail >= 3) {
    this.writeUInt24BE(v >>> 8);
    this._next();
    this.last[this.offset++] = v & 0xff;
    this.avail--;
    this._move(1);

  // Slow case, who cares
  } else {
    this.writeUInt16BE(v >>> 16);
    this.writeUInt16BE(v & 0xffff);
  }
};

WBuf.prototype.writeUInt16LE = function writeUInt16LE(num) {
  var r = ((num & 0xff) << 8) | (num >>> 8);
  this.writeUInt16BE(r);
};

WBuf.prototype.writeUInt24LE = function writeUInt24LE(num) {
  var r = ((num & 0xff) << 16) | (((num >>> 8) & 0xff) << 8) | (num >>> 16);
  this.writeUInt24BE(r);
};

WBuf.prototype.writeUInt32LE = function writeUInt32LE(num) {
  this._ensure(4);

  // Fast case - everything fits into the last buffer
  if (this.avail >= 4) {
    this.last.writeUInt32LE(num, this.offset);
    this.offset += 4;
    this.avail -= 4;
    this._move(4);

  // Three bytes here
  } else if (this.avail >= 3) {
    this.writeUInt24LE(num & 0xffffff);
    this._next();
    this.last[this.offset++] = num >>> 24;
    this.avail--;
    this._move(1);

  // Slow case, who cares
  } else {
    this.writeUInt16LE(num & 0xffff);
    this.writeUInt16LE(num >>> 16);
  }
};

WBuf.prototype.render = function render() {
  var left = this.size;
  var out = [];

  for (var i = 0; i < this.buffers.length && left >= 0; i++) {
    var buf = this.buffers[i];
    left -= buf.length;
    if (left >= 0) {
      out.push(buf);
    } else {
      out.push(buf.slice(0, buf.length + left));
    }
  }

  return out;
};

// Signed APIs
WBuf.prototype.writeInt8 = function writeInt8(num) {
  if (num < 0)
    return this.writeUInt8(0x100 + num);
  else
    return this.writeUInt8(num);
};

function toUnsigned16(num) {
  if (num < 0)
    return 0x10000 + num;
  else
    return num;
}

WBuf.prototype.writeInt16LE = function writeInt16LE(num) {
  this.writeUInt16LE(toUnsigned16(num));
};

WBuf.prototype.writeInt16BE = function writeInt16BE(num) {
  this.writeUInt16BE(toUnsigned16(num));
};

function toUnsigned24(num) {
  if (num < 0)
    return 0x1000000 + num;
  else
    return num;
}

WBuf.prototype.writeInt24LE = function writeInt24LE(num) {
  this.writeUInt24LE(toUnsigned24(num));
};

WBuf.prototype.writeInt24BE = function writeInt24BE(num) {
  this.writeUInt24BE(toUnsigned24(num));
};

function toUnsigned32(num) {
  if (num < 0)
    return (0xffffffff + num) + 1;
  else
    return num;
}

WBuf.prototype.writeInt32LE = function writeInt32LE(num) {
  this.writeUInt32LE(toUnsigned32(num));
};

WBuf.prototype.writeInt32BE = function writeInt32BE(num) {
  this.writeUInt32BE(toUnsigned32(num));
};

WBuf.prototype.writeComb = function writeComb(size, endian, value) {
  if (size === 1)
    return this.writeUInt8(value);

  if (endian === 'le') {
    if (size === 2)
      this.writeUInt16LE(value);
    else if (size === 3)
      this.writeUInt24LE(value);
    else if (size === 4)
      this.writeUInt32LE(value);
  } else {
    if (size === 2)
      this.writeUInt16BE(value);
    else if (size === 3)
      this.writeUInt24BE(value);
    else if (size === 4)
      this.writeUInt32BE(value);
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ })
/******/ ]);
