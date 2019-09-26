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

/* Copyright 2015-present Facebook, Inc.
 * Licensed under the Apache License, Version 2.0 */

var EE = __webpack_require__(3).EventEmitter;
var util = __webpack_require__(4);
var os = __webpack_require__(5);
var assert = __webpack_require__(6);
var Int64 = __webpack_require__(7);

// BSER uses the local endianness to reduce byte swapping overheads
// (the protocol is expressly local IPC only).  We need to tell node
// to use the native endianness when reading various native values.
var isBigEndian = os.endianness() == 'BE';

// Find the next power-of-2 >= size
function nextPow2(size) {
  return Math.pow(2, Math.ceil(Math.log(size) / Math.LN2));
}

// Expandable buffer that we can provide a size hint for
function Accumulator(initsize) {
  this.buf = Buffer.alloc(nextPow2(initsize || 8192));
  this.readOffset = 0;
  this.writeOffset = 0;
}
// For testing
exports.Accumulator = Accumulator

// How much we can write into this buffer without allocating
Accumulator.prototype.writeAvail = function() {
  return this.buf.length - this.writeOffset;
}

// How much we can read
Accumulator.prototype.readAvail = function() {
  return this.writeOffset - this.readOffset;
}

// Ensure that we have enough space for size bytes
Accumulator.prototype.reserve = function(size) {
  if (size < this.writeAvail()) {
    return;
  }

  // If we can make room by shunting down, do so
  if (this.readOffset > 0) {
    this.buf.copy(this.buf, 0, this.readOffset, this.writeOffset);
    this.writeOffset -= this.readOffset;
    this.readOffset = 0;
  }

  // If we made enough room, no need to allocate more
  if (size < this.writeAvail()) {
    return;
  }

  // Allocate a replacement and copy it in
  var buf = Buffer.alloc(nextPow2(this.buf.length + size - this.writeAvail()));
  this.buf.copy(buf);
  this.buf = buf;
}

// Append buffer or string.  Will resize as needed
Accumulator.prototype.append = function(buf) {
  if (Buffer.isBuffer(buf)) {
    this.reserve(buf.length);
    buf.copy(this.buf, this.writeOffset, 0, buf.length);
    this.writeOffset += buf.length;
  } else {
    var size = Buffer.byteLength(buf);
    this.reserve(size);
    this.buf.write(buf, this.writeOffset);
    this.writeOffset += size;
  }
}

Accumulator.prototype.assertReadableSize = function(size) {
  if (this.readAvail() < size) {
    throw new Error("wanted to read " + size +
        " bytes but only have " + this.readAvail());
  }
}

Accumulator.prototype.peekString = function(size) {
  this.assertReadableSize(size);
  return this.buf.toString('utf-8', this.readOffset, this.readOffset + size);
}

Accumulator.prototype.readString = function(size) {
  var str = this.peekString(size);
  this.readOffset += size;
  return str;
}

Accumulator.prototype.peekInt = function(size) {
  this.assertReadableSize(size);
  switch (size) {
    case 1:
      return this.buf.readInt8(this.readOffset, size);
    case 2:
      return isBigEndian ?
        this.buf.readInt16BE(this.readOffset, size) :
        this.buf.readInt16LE(this.readOffset, size);
    case 4:
      return isBigEndian ?
        this.buf.readInt32BE(this.readOffset, size) :
        this.buf.readInt32LE(this.readOffset, size);
    case 8:
        var big = this.buf.slice(this.readOffset, this.readOffset + 8);
        if (isBigEndian) {
          // On a big endian system we can simply pass the buffer directly
          return new Int64(big);
        }
        // Otherwise we need to byteswap
        return new Int64(byteswap64(big));
    default:
      throw new Error("invalid integer size " + size);
  }
}

Accumulator.prototype.readInt = function(bytes) {
  var ival = this.peekInt(bytes);
  if (ival instanceof Int64 && isFinite(ival.valueOf())) {
    ival = ival.valueOf();
  }
  this.readOffset += bytes;
  return ival;
}

Accumulator.prototype.peekDouble = function() {
  this.assertReadableSize(8);
  return isBigEndian ?
    this.buf.readDoubleBE(this.readOffset) :
    this.buf.readDoubleLE(this.readOffset);
}

Accumulator.prototype.readDouble = function() {
  var dval = this.peekDouble();
  this.readOffset += 8;
  return dval;
}

Accumulator.prototype.readAdvance = function(size) {
  if (size > 0) {
    this.assertReadableSize(size);
  } else if (size < 0 && this.readOffset + size < 0) {
    throw new Error("advance with negative offset " + size +
        " would seek off the start of the buffer");
  }
  this.readOffset += size;
}

Accumulator.prototype.writeByte = function(value) {
  this.reserve(1);
  this.buf.writeInt8(value, this.writeOffset);
  ++this.writeOffset;
}

Accumulator.prototype.writeInt = function(value, size) {
  this.reserve(size);
  switch (size) {
    case 1:
      this.buf.writeInt8(value, this.writeOffset);
      break;
    case 2:
      if (isBigEndian) {
        this.buf.writeInt16BE(value, this.writeOffset);
      } else {
        this.buf.writeInt16LE(value, this.writeOffset);
      }
      break;
    case 4:
      if (isBigEndian) {
        this.buf.writeInt32BE(value, this.writeOffset);
      } else {
        this.buf.writeInt32LE(value, this.writeOffset);
      }
      break;
    default:
      throw new Error("unsupported integer size " + size);
  }
  this.writeOffset += size;
}

Accumulator.prototype.writeDouble = function(value) {
  this.reserve(8);
  if (isBigEndian) {
    this.buf.writeDoubleBE(value, this.writeOffset);
  } else {
    this.buf.writeDoubleLE(value, this.writeOffset);
  }
  this.writeOffset += 8;
}

var BSER_ARRAY     = 0x00;
var BSER_OBJECT    = 0x01;
var BSER_STRING    = 0x02;
var BSER_INT8      = 0x03;
var BSER_INT16     = 0x04;
var BSER_INT32     = 0x05;
var BSER_INT64     = 0x06;
var BSER_REAL      = 0x07;
var BSER_TRUE      = 0x08;
var BSER_FALSE     = 0x09;
var BSER_NULL      = 0x0a;
var BSER_TEMPLATE  = 0x0b;
var BSER_SKIP      = 0x0c;

var ST_NEED_PDU = 0; // Need to read and decode PDU length
var ST_FILL_PDU = 1; // Know the length, need to read whole content

var MAX_INT8 = 127;
var MAX_INT16 = 32767;
var MAX_INT32 = 2147483647;

function BunserBuf() {
  EE.call(this);
  this.buf = new Accumulator();
  this.state = ST_NEED_PDU;
}
util.inherits(BunserBuf, EE);
exports.BunserBuf = BunserBuf;

BunserBuf.prototype.append = function(buf, synchronous) {
  if (synchronous) {
    this.buf.append(buf);
    return this.process(synchronous);
  }

  try {
    this.buf.append(buf);
  } catch (err) {
    this.emit('error', err);
    return;
  }
  // Arrange to decode later.  This allows the consuming
  // application to make progress with other work in the
  // case that we have a lot of subscription updates coming
  // in from a large tree.
  this.processLater();
}

BunserBuf.prototype.processLater = function() {
  var self = this;
  process.nextTick(function() {
    try {
      self.process(false);
    } catch (err) {
      self.emit('error', err);
    }
  });
}

// Do something with the buffer to advance our state.
// If we're running synchronously we'll return either
// the value we've decoded or undefined if we don't
// yet have enought data.
// If we're running asynchronously, we'll emit the value
// when it becomes ready and schedule another invocation
// of process on the next tick if we still have data we
// can process.
BunserBuf.prototype.process = function(synchronous) {
  if (this.state == ST_NEED_PDU) {
    if (this.buf.readAvail() < 2) {
      return;
    }
    // Validate BSER header
    this.expectCode(0);
    this.expectCode(1);
    this.pduLen = this.decodeInt(true /* relaxed */);
    if (this.pduLen === false) {
      // Need more data, walk backwards
      this.buf.readAdvance(-2);
      return;
    }
    // Ensure that we have a big enough buffer to read the rest of the PDU
    this.buf.reserve(this.pduLen);
    this.state = ST_FILL_PDU;
  }

  if (this.state == ST_FILL_PDU) {
    if (this.buf.readAvail() < this.pduLen) {
      // Need more data
      return;
    }

    // We have enough to decode it
    var val = this.decodeAny();
    if (synchronous) {
      return val;
    }
    this.emit('value', val);
    this.state = ST_NEED_PDU;
  }

  if (!synchronous && this.buf.readAvail() > 0) {
    this.processLater();
  }
}

BunserBuf.prototype.raise = function(reason) {
  throw new Error(reason + ", in Buffer of length " +
      this.buf.buf.length + " (" + this.buf.readAvail() +
      " readable) at offset " + this.buf.readOffset + " buffer: " +
      JSON.stringify(this.buf.buf.slice(
          this.buf.readOffset, this.buf.readOffset + 32).toJSON()));
}

BunserBuf.prototype.expectCode = function(expected) {
  var code = this.buf.readInt(1);
  if (code != expected) {
    this.raise("expected bser opcode " + expected + " but got " + code);
  }
}

BunserBuf.prototype.decodeAny = function() {
  var code = this.buf.peekInt(1);
  switch (code) {
    case BSER_INT8:
    case BSER_INT16:
    case BSER_INT32:
    case BSER_INT64:
      return this.decodeInt();
    case BSER_REAL:
      this.buf.readAdvance(1);
      return this.buf.readDouble();
    case BSER_TRUE:
      this.buf.readAdvance(1);
      return true;
    case BSER_FALSE:
      this.buf.readAdvance(1);
      return false;
    case BSER_NULL:
      this.buf.readAdvance(1);
      return null;
    case BSER_STRING:
      return this.decodeString();
    case BSER_ARRAY:
      return this.decodeArray();
    case BSER_OBJECT:
      return this.decodeObject();
    case BSER_TEMPLATE:
      return this.decodeTemplate();
    default:
      this.raise("unhandled bser opcode " + code);
  }
}

BunserBuf.prototype.decodeArray = function() {
  this.expectCode(BSER_ARRAY);
  var nitems = this.decodeInt();
  var arr = [];
  for (var i = 0; i < nitems; ++i) {
    arr.push(this.decodeAny());
  }
  return arr;
}

BunserBuf.prototype.decodeObject = function() {
  this.expectCode(BSER_OBJECT);
  var nitems = this.decodeInt();
  var res = {};
  for (var i = 0; i < nitems; ++i) {
    var key = this.decodeString();
    var val = this.decodeAny();
    res[key] = val;
  }
  return res;
}

BunserBuf.prototype.decodeTemplate = function() {
  this.expectCode(BSER_TEMPLATE);
  var keys = this.decodeArray();
  var nitems = this.decodeInt();
  var arr = [];
  for (var i = 0; i < nitems; ++i) {
    var obj = {};
    for (var keyidx = 0; keyidx < keys.length; ++keyidx) {
      if (this.buf.peekInt(1) == BSER_SKIP) {
        this.buf.readAdvance(1);
        continue;
      }
      var val = this.decodeAny();
      obj[keys[keyidx]] = val;
    }
    arr.push(obj);
  }
  return arr;
}

BunserBuf.prototype.decodeString = function() {
  this.expectCode(BSER_STRING);
  var len = this.decodeInt();
  return this.buf.readString(len);
}

// This is unusual compared to the other decode functions in that
// we may not have enough data available to satisfy the read, and
// we don't want to throw.  This is only true when we're reading
// the PDU length from the PDU header; we'll set relaxSizeAsserts
// in that case.
BunserBuf.prototype.decodeInt = function(relaxSizeAsserts) {
  if (relaxSizeAsserts && !this.buf.readAvail(1)) {
    return false;
  } else {
    this.buf.assertReadableSize(1);
  }
  var code = this.buf.peekInt(1);
  var size = 0;
  switch (code) {
    case BSER_INT8:
      size = 1;
      break;
    case BSER_INT16:
      size = 2;
      break;
    case BSER_INT32:
      size = 4;
      break;
    case BSER_INT64:
      size = 8;
      break;
    default:
      this.raise("invalid bser int encoding " + code);
  }

  if (relaxSizeAsserts && !this.buf.readAvail(1 + size)) {
    return false;
  }
  this.buf.readAdvance(1);
  return this.buf.readInt(size);
}

// synchronously BSER decode a string and return the value
function loadFromBuffer(input) {
  var buf = new BunserBuf();
  var result = buf.append(input, true);
  if (buf.buf.readAvail()) {
    throw Error(
        'excess data found after input buffer, use BunserBuf instead');
  }
  if (typeof result === 'undefined') {
    throw Error(
        'no bser found in string and no error raised!?');
  }
  return result;
}
exports.loadFromBuffer = loadFromBuffer

// Byteswap an arbitrary buffer, flipping from one endian
// to the other, returning a new buffer with the resultant data
function byteswap64(buf) {
  var swap = Buffer.alloc(buf.length);
  for (var i = 0; i < buf.length; i++) {
    swap[i] = buf[buf.length -1 - i];
  }
  return swap;
}

function dump_int64(buf, val) {
  // Get the raw bytes.  The Int64 buffer is big endian
  var be = val.toBuffer();

  if (isBigEndian) {
    // We're a big endian system, so the buffer is exactly how we
    // want it to be
    buf.writeByte(BSER_INT64);
    buf.append(be);
    return;
  }
  // We need to byte swap to get the correct representation
  var le = byteswap64(be);
  buf.writeByte(BSER_INT64);
  buf.append(le);
}

function dump_int(buf, val) {
  var abs = Math.abs(val);
  if (abs <= MAX_INT8) {
    buf.writeByte(BSER_INT8);
    buf.writeInt(val, 1);
  } else if (abs <= MAX_INT16) {
    buf.writeByte(BSER_INT16);
    buf.writeInt(val, 2);
  } else if (abs <= MAX_INT32) {
    buf.writeByte(BSER_INT32);
    buf.writeInt(val, 4);
  } else {
    dump_int64(buf, new Int64(val));
  }
}

function dump_any(buf, val) {
  switch (typeof(val)) {
    case 'number':
      // check if it is an integer or a float
      if (isFinite(val) && Math.floor(val) === val) {
        dump_int(buf, val);
      } else {
        buf.writeByte(BSER_REAL);
        buf.writeDouble(val);
      }
      return;
    case 'string':
      buf.writeByte(BSER_STRING);
      dump_int(buf, Buffer.byteLength(val));
      buf.append(val);
      return;
    case 'boolean':
      buf.writeByte(val ? BSER_TRUE : BSER_FALSE);
      return;
    case 'object':
      if (val === null) {
        buf.writeByte(BSER_NULL);
        return;
      }
      if (val instanceof Int64) {
        dump_int64(buf, val);
        return;
      }
      if (Array.isArray(val)) {
        buf.writeByte(BSER_ARRAY);
        dump_int(buf, val.length);
        for (var i = 0; i < val.length; ++i) {
          dump_any(buf, val[i]);
        }
        return;
      }
      buf.writeByte(BSER_OBJECT);
      var keys = Object.keys(val);

      // First pass to compute number of defined keys
      var num_keys = keys.length;
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var v = val[key];
        if (typeof(v) == 'undefined') {
          num_keys--;
        }
      }
      dump_int(buf, num_keys);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var v = val[key];
        if (typeof(v) == 'undefined') {
          // Don't include it
          continue;
        }
        dump_any(buf, key);
        try {
          dump_any(buf, v);
        } catch (e) {
          throw new Error(
            e.message + ' (while serializing object property with name `' +
              key + "')");
        }
      }
      return;

    default:
      throw new Error('cannot serialize type ' + typeof(val) + ' to BSER');
  }
}

// BSER encode value and return a buffer of the contents
function dumpToBuffer(val) {
  var buf = new Accumulator();
  // Build out the header
  buf.writeByte(0);
  buf.writeByte(1);
  // Reserve room for an int32 to hold our PDU length
  buf.writeByte(BSER_INT32);
  buf.writeInt(0, 4); // We'll come back and fill this in at the end

  dump_any(buf, val);

  // Compute PDU length
  var off = buf.writeOffset;
  var len = off - 7 /* the header length */;
  buf.writeOffset = 3; // The length value to fill in
  buf.writeInt(len, 4); // write the length in the space we reserved
  buf.writeOffset = off;

  return buf.buf.slice(0, off);
}
exports.dumpToBuffer = dumpToBuffer


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

//     Int64.js
//
//     Copyright (c) 2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

/**
 * Support for handling 64-bit int numbers in Javascript (node.js)
 *
 * JS Numbers are IEEE-754 binary double-precision floats, which limits the
 * range of values that can be represented with integer precision to:
 *
 * 2^^53 <= N <= 2^53
 *
 * Int64 objects wrap a node Buffer that holds the 8-bytes of int64 data.  These
 * objects operate directly on the buffer which means that if they are created
 * using an existing buffer then setting the value will modify the Buffer, and
 * vice-versa.
 *
 * Internal Representation
 *
 * The internal buffer format is Big Endian.  I.e. the most-significant byte is
 * at buffer[0], the least-significant at buffer[7].  For the purposes of
 * converting to/from JS native numbers, the value is assumed to be a signed
 * integer stored in 2's complement form.
 *
 * For details about IEEE-754 see:
 * http://en.wikipedia.org/wiki/Double_precision_floating-point_format
 */

// Useful masks and values for bit twiddling
var MASK31 =  0x7fffffff, VAL31 = 0x80000000;
var MASK32 =  0xffffffff, VAL32 = 0x100000000;

// Map for converting hex octets to strings
var _HEX = [];
for (var i = 0; i < 256; i++) {
  _HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
}

//
// Int64
//

/**
 * Constructor accepts any of the following argument types:
 *
 * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
 * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
 * new Int64(string)             - Hex string (throws if n is outside int64 range)
 * new Int64(number)             - Number (throws if n is outside int64 range)
 * new Int64(hi, lo)             - Raw bits as two 32-bit values
 */
var Int64 = module.exports = function(a1, a2) {
  if (a1 instanceof Buffer) {
    this.buffer = a1;
    this.offset = a2 || 0;
  } else if (Object.prototype.toString.call(a1) == '[object Uint8Array]') {
    // Under Browserify, Buffers can extend Uint8Arrays rather than an
    // instance of Buffer. We could assume the passed in Uint8Array is actually
    // a buffer but that won't handle the case where a raw Uint8Array is passed
    // in. We construct a new Buffer just in case.
    this.buffer = new Buffer(a1);
    this.offset = a2 || 0;
  } else {
    this.buffer = this.buffer || new Buffer(8);
    this.offset = 0;
    this.setValue.apply(this, arguments);
  }
};


// Max integer value that JS can accurately represent
Int64.MAX_INT = Math.pow(2, 53);

// Min integer value that JS can accurately represent
Int64.MIN_INT = -Math.pow(2, 53);

Int64.prototype = {

  constructor: Int64,

  /**
   * Do in-place 2's compliment.  See
   * http://en.wikipedia.org/wiki/Two's_complement
   */
  _2scomp: function() {
    var b = this.buffer, o = this.offset, carry = 1;
    for (var i = o + 7; i >= o; i--) {
      var v = (b[i] ^ 0xff) + carry;
      b[i] = v & 0xff;
      carry = v >> 8;
    }
  },

  /**
   * Set the value. Takes any of the following arguments:
   *
   * setValue(string) - A hexidecimal string
   * setValue(number) - Number (throws if n is outside int64 range)
   * setValue(hi, lo) - Raw bits as two 32-bit values
   */
  setValue: function(hi, lo) {
    var negate = false;
    if (arguments.length == 1) {
      if (typeof(hi) == 'number') {
        // Simplify bitfield retrieval by using abs() value.  We restore sign
        // later
        negate = hi < 0;
        hi = Math.abs(hi);
        lo = hi % VAL32;
        hi = hi / VAL32;
        if (hi > VAL32) throw new RangeError(hi  + ' is outside Int64 range');
        hi = hi | 0;
      } else if (typeof(hi) == 'string') {
        hi = (hi + '').replace(/^0x/, '');
        lo = hi.substr(-8);
        hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
        hi = parseInt(hi, 16);
        lo = parseInt(lo, 16);
      } else {
        throw new Error(hi + ' must be a Number or String');
      }
    }

    // Technically we should throw if hi or lo is outside int32 range here, but
    // it's not worth the effort. Anything past the 32'nd bit is ignored.

    // Copy bytes to buffer
    var b = this.buffer, o = this.offset;
    for (var i = 7; i >= 0; i--) {
      b[o+i] = lo & 0xff;
      lo = i == 4 ? hi : lo >>> 8;
    }

    // Restore sign of passed argument
    if (negate) this._2scomp();
  },

  /**
   * Convert to a native JS number.
   *
   * WARNING: Do not expect this value to be accurate to integer precision for
   * large (positive or negative) numbers!
   *
   * @param allowImprecise If true, no check is performed to verify the
   * returned value is accurate to integer precision.  If false, imprecise
   * numbers (very large positive or negative numbers) will be forced to +/-
   * Infinity.
   */
  toNumber: function(allowImprecise) {
    var b = this.buffer, o = this.offset;

    // Running sum of octets, doing a 2's complement
    var negate = b[o] & 0x80, x = 0, carry = 1;
    for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
      var v = b[o+i];

      // 2's complement for negative numbers
      if (negate) {
        v = (v ^ 0xff) + carry;
        carry = v >> 8;
        v = v & 0xff;
      }

      x += v * m;
    }

    // Return Infinity if we've lost integer precision
    if (!allowImprecise && x >= Int64.MAX_INT) {
      return negate ? -Infinity : Infinity;
    }

    return negate ? -x : x;
  },

  /**
   * Convert to a JS Number. Returns +/-Infinity for values that can't be
   * represented to integer precision.
   */
  valueOf: function() {
    return this.toNumber(false);
  },

  /**
   * Return string value
   *
   * @param radix Just like Number#toString()'s radix
   */
  toString: function(radix) {
    return this.valueOf().toString(radix || 10);
  },

  /**
   * Return a string showing the buffer octets, with MSB on the left.
   *
   * @param sep separator string. default is '' (empty string)
   */
  toOctetString: function(sep) {
    var out = new Array(8);
    var b = this.buffer, o = this.offset;
    for (var i = 0; i < 8; i++) {
      out[i] = _HEX[b[o+i]];
    }
    return out.join(sep || '');
  },

  /**
   * Returns the int64's 8 bytes in a buffer.
   *
   * @param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
   *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
   */
  toBuffer: function(rawBuffer) {
    if (rawBuffer && this.offset === 0) return this.buffer;

    var out = new Buffer(8);
    this.buffer.copy(out, 0, this.offset, this.offset + 8);
    return out;
  },

  /**
   * Copy 8 bytes of int64 into target buffer at target offset.
   *
   * @param {Buffer} targetBuffer       Buffer to copy into.
   * @param {number} [targetOffset=0]   Offset into target buffer.
   */
  copy: function(targetBuffer, targetOffset) {
    this.buffer.copy(targetBuffer, targetOffset || 0, this.offset, this.offset + 8);
  },

  /**
   * Returns a number indicating whether this comes before or after or is the
   * same as the other in sort order.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  compare: function(other) {

    // If sign bits differ ...
    if ((this.buffer[this.offset] & 0x80) != (other.buffer[other.offset] & 0x80)) {
      return other.buffer[other.offset] - this.buffer[this.offset];
    }

    // otherwise, compare bytes lexicographically
    for (var i = 0; i < 8; i++) {
      if (this.buffer[this.offset+i] !== other.buffer[other.offset+i]) {
        return this.buffer[this.offset+i] - other.buffer[other.offset+i];
      }
    }
    return 0;
  },

  /**
   * Returns a boolean indicating if this integer is equal to other.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  equals: function(other) {
    return this.compare(other) === 0;
  },

  /**
   * Pretty output in console.log
   */
  inspect: function() {
    return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
  }
};


/***/ })
/******/ ]);
