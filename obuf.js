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

var Buffer = __webpack_require__(3).Buffer;

function OffsetBuffer() {
  this.offset = 0;
  this.size = 0;
  this.buffers = [];
}
module.exports = OffsetBuffer;

OffsetBuffer.prototype.isEmpty = function isEmpty() {
  return this.size === 0;
};

OffsetBuffer.prototype.clone = function clone(size) {
  var r = new OffsetBuffer();
  r.offset = this.offset;
  r.size = size;
  r.buffers = this.buffers.slice();
  return r;
};

OffsetBuffer.prototype.toChunks = function toChunks() {
  if (this.size === 0)
    return [];

  // We are going to slice it anyway
  if (this.offset !== 0) {
    this.buffers[0] = this.buffers[0].slice(this.offset);
    this.offset = 0;
  }

  var chunks = [ ];
  var off = 0;
  for (var i = 0; off <= this.size && i < this.buffers.length; i++) {
    var buf = this.buffers[i];
    off += buf.length;

    // Slice off last buffer
    if (off > this.size) {
      buf = buf.slice(0, buf.length - (off - this.size));
      this.buffers[i] = buf;
    }

    chunks.push(buf);
  }

  // If some buffers were skipped - trim length
  if (i < this.buffers.length)
    this.buffers.length = i;

  return chunks;
};

OffsetBuffer.prototype.toString = function toString(enc) {
  return this.toChunks().map(function(c) {
    return c.toString(enc);
  }).join('');
};

OffsetBuffer.prototype.use = function use(buf, off, n) {
  this.buffers = [ buf ];
  this.offset = off;
  this.size = n;
};

OffsetBuffer.prototype.push = function push(data) {
  // Ignore empty writes
  if (data.length === 0)
    return;

  this.size += data.length;
  this.buffers.push(data);
};

OffsetBuffer.prototype.has = function has(n) {
  return this.size >= n;
};

OffsetBuffer.prototype.skip = function skip(n) {
  if (this.size === 0)
    return;

  this.size -= n;

  // Fast case, skip bytes in a first buffer
  if (this.offset + n < this.buffers[0].length) {
    this.offset += n;
    return;
  }

  var left = n - (this.buffers[0].length - this.offset);
  this.offset = 0;

  for (var shift = 1; left > 0 && shift < this.buffers.length; shift++) {
    var buf = this.buffers[shift];
    if (buf.length > left) {
      this.offset = left;
      break;
    }
    left -= buf.length;
  }
  this.buffers = this.buffers.slice(shift);
};

OffsetBuffer.prototype.copy = function copy(target, targetOff, off, n) {
  if (this.size === 0)
    return;
  if (off !== 0)
    throw new Error('Unsupported offset in .copy()');

  var toff = targetOff;
  var first = this.buffers[0];
  var toCopy = Math.min(n, first.length - this.offset);
  first.copy(target, toff, this.offset, this.offset + toCopy);

  toff += toCopy;
  var left = n - toCopy;
  for (var i = 1; left > 0 && i < this.buffers.length; i++) {
    var buf = this.buffers[i];
    var toCopy = Math.min(left, buf.length);

    buf.copy(target, toff, 0, toCopy);

    toff += toCopy;
    left -= toCopy;
  }
};

OffsetBuffer.prototype.take = function take(n) {
  if (n === 0)
    return new Buffer(0);

  this.size -= n;

  // Fast cases
  var first = this.buffers[0].length - this.offset;
  if (first === n) {
    var r = this.buffers.shift();
    if (this.offset !== 0) {
      r = r.slice(this.offset);
      this.offset = 0;
    }
    return r;
  } else if (first > n) {
    var r = this.buffers[0].slice(this.offset, this.offset + n);
    this.offset += n;
    return r;
  }

  // Allocate and fill buffer
  var out = new Buffer(n);
  var toOff = 0;
  var startOff = this.offset;
  for (var i = 0; toOff !== n && i < this.buffers.length; i++) {
    var buf = this.buffers[i];
    var toCopy = Math.min(buf.length - startOff, n - toOff);

    buf.copy(out, toOff, startOff, startOff + toCopy);
    if (startOff + toCopy < buf.length) {
      this.offset = startOff + toCopy;
      break;
    } else {
      toOff += toCopy;
      startOff = 0;
    }
  }

  this.buffers = this.buffers.slice(i);
  if (this.buffers.length === 0)
    this.offset = 0;

  return out;
};

OffsetBuffer.prototype.peekUInt8 = function peekUInt8() {
  return this.buffers[0][this.offset];
};

OffsetBuffer.prototype.readUInt8 = function readUInt8() {
  this.size -= 1;
  var first = this.buffers[0];
  var r = first[this.offset];
  if (++this.offset === first.length) {
    this.offset = 0;
    this.buffers.shift();
  }

  return r;
};

OffsetBuffer.prototype.readUInt16LE = function readUInt16LE() {
  var first = this.buffers[0];
  this.size -= 2;

  var r;
  var shift;

  // Fast case - first buffer has all bytes
  if (first.length - this.offset >= 2) {
    r = first.readUInt16LE(this.offset);
    shift = 0;
    this.offset += 2;

  // One byte here - one byte there
  } else {
    r = first[this.offset] | (this.buffers[1][0] << 8);
    shift = 1;
    this.offset = 1;
  }

  if (this.offset === this.buffers[shift].length) {
    this.offset = 0;
    shift++;
  }
  if (shift !== 0)
    this.buffers = this.buffers.slice(shift);

  return r;
};

OffsetBuffer.prototype.readUInt24LE = function readUInt24LE() {
  var first = this.buffers[0];

  var r;
  var shift;
  var firstHas = first.length - this.offset;

  // Fast case - first buffer has all bytes
  if (firstHas >= 3) {
    r = first.readUInt16LE(this.offset) | (first[this.offset + 2] << 16);
    shift = 0;
    this.offset += 3;

  // First buffer has 2 of 3 bytes
  } else if (firstHas >= 2) {
    r = first.readUInt16LE(this.offset) | (this.buffers[1][0] << 16);
    shift = 1;
    this.offset = 1;

  // Slow case: First buffer has 1 of 3 bytes
  } else {
    r = first[this.offset];
    this.offset = 0;
    this.buffers.shift();
    this.size -= 1;

    r |= this.readUInt16LE() << 8;
    return r;
  }

  this.size -= 3;
  if (this.offset === this.buffers[shift].length) {
    this.offset = 0;
    shift++;
  }
  if (shift !== 0)
    this.buffers = this.buffers.slice(shift);

  return r;
};

OffsetBuffer.prototype.readUInt32LE = function readUInt32LE() {
  var first = this.buffers[0];

  var r;
  var shift;
  var firstHas = first.length - this.offset;

  // Fast case - first buffer has all bytes
  if (firstHas >= 4) {
    r = first.readUInt32LE(this.offset);
    shift = 0;
    this.offset += 4;

  // First buffer has 3 of 4 bytes
  } else if (firstHas >= 3) {
    r = (first.readUInt16LE(this.offset) |
         (first[this.offset + 2] << 16)) +
        (this.buffers[1][0] * 0x1000000);
    shift = 1;
    this.offset = 1;

  // Slow case: First buffer has 2 of 4 bytes
  } else if (firstHas >= 2) {
    r = first.readUInt16LE(this.offset);
    this.offset = 0;
    this.buffers.shift();
    this.size -= 2;

    r += this.readUInt16LE() * 0x10000;
    return r;

  // Slow case: First buffer has 1 of 4 bytes
  } else {
    r = first[this.offset];
    this.offset = 0;
    this.buffers.shift();
    this.size -= 1;

    r += this.readUInt24LE() * 0x100;
    return r;
  }

  this.size -= 4;
  if (this.offset === this.buffers[shift].length) {
    this.offset = 0;
    shift++;
  }
  if (shift !== 0)
    this.buffers = this.buffers.slice(shift);

  return r;
};

OffsetBuffer.prototype.readUInt16BE = function readUInt16BE() {
  var r = this.readUInt16LE();

  return ((r & 0xff) << 8) | (r >> 8);
};

OffsetBuffer.prototype.readUInt24BE = function readUInt24BE() {
  var r = this.readUInt24LE();

  return ((r & 0xff) << 16) | (((r >> 8) & 0xff) << 8) | (r >> 16);
};

OffsetBuffer.prototype.readUInt32BE = function readUInt32BE() {
  var r = this.readUInt32LE();

  return (((r & 0xff) << 24) |
          (((r >>> 8) & 0xff) << 16) |
          (((r >>> 16) & 0xff) << 8) |
          (r >>> 24)) >>> 0;
};

// Signed number APIs

function signedInt8(num) {
  if (num >= 0x80)
    return -(0xff ^ num) - 1;
  else
    return num;
}

OffsetBuffer.prototype.peekInt8 = function peekInt8() {
  return signedInt8(this.peekUInt8());
};

OffsetBuffer.prototype.readInt8 = function readInt8() {
  return signedInt8(this.readUInt8());
};

function signedInt16(num) {
  if (num >= 0x8000)
    return -(0xffff ^ num) - 1;
  else
    return num;
}

OffsetBuffer.prototype.readInt16BE = function readInt16BE() {
  return signedInt16(this.readUInt16BE());
};

OffsetBuffer.prototype.readInt16LE = function readInt16LE() {
  return signedInt16(this.readUInt16LE());
};

function signedInt24(num) {
  if (num >= 0x800000)
    return -(0xffffff ^ num) - 1;
  else
    return num;
}

OffsetBuffer.prototype.readInt24BE = function readInt24BE() {
  return signedInt24(this.readUInt24BE());
};

OffsetBuffer.prototype.readInt24LE = function readInt24LE() {
  return signedInt24(this.readUInt24LE());
};

function signedInt32(num) {
  if (num >= 0x80000000)
    return -(0xffffffff ^ num) - 1;
  else
    return num;
}

OffsetBuffer.prototype.readInt32BE = function readInt32BE() {
  return signedInt32(this.readUInt32BE());
};

OffsetBuffer.prototype.readInt32LE = function readInt32LE() {
  return signedInt32(this.readUInt32LE());
};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ })
/******/ ]);
