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

var assert = __webpack_require__(3)
var util = __webpack_require__(4)

var EventEmitter = __webpack_require__(5).EventEmitter
var Buffer = __webpack_require__(6).Buffer

var Queue = __webpack_require__(7)

// Node.js version
var mode = 'modern'

function Handle (stream, options) {
  EventEmitter.call(this)

  this._stream = stream
  this._flowing = false
  this._reading = false
  this._options = options || {}

  this.onread = null

  // Pending requests
  this.pending = new Queue()
}
util.inherits(Handle, EventEmitter)
module.exports = Handle

Handle.mode = mode

Handle.create = function create (stream, options) {
  return new Handle(stream, options)
}

Handle.prototype._queueReq = function _queueReq (type, req) {
  return this.pending.append(type, req)
}

Handle.prototype._pendingList = function _pendingList () {
  var list = []
  while (!this.pending.isEmpty()) { list.push(this.pending.first().dequeue()) }
  return list
}

Handle.prototype.setStream = function setStream (stream) {
  assert(this._stream === null, 'Can\'t set stream two times')
  this._stream = stream

  this.emit('stream', stream)
}

Handle.prototype.readStart = function readStart () {
  this._reading = true

  if (!this._stream) {
    this.once('stream', this.readStart)
    return 0
  }

  if (!this._flowing) {
    this._flowing = true
    this._flow()
  }

  this._stream.resume()
  return 0
}

Handle.prototype.readStop = function readStop () {
  this._reading = false

  if (!this._stream) {
    this.once('stream', this.readStop)
    return 0
  }
  this._stream.pause()
  return 0
}

var uv = process.binding('uv')

Handle.prototype._flow = function flow () {
  var self = this
  this._stream.on('data', function (chunk) {
    self.onread(chunk.length, chunk)
  })

  this._stream.on('end', function () {
    self.onread(uv.UV_EOF, Buffer.alloc(0))
  })

  this._stream.on('close', function () {
    setImmediate(function () {
      if (self._reading) {
        self.onread(uv.UV_ECONNRESET, Buffer.alloc(0))
      }
    })
  })
}

Handle.prototype._close = function _close () {
  var list = this._pendingList()

  var self = this
  setImmediate(function () {
    for (var i = 0; i < list.length; i++) {
      var req = list[i]
      req.oncomplete(uv.UV_ECANCELED, self, req)
    }
  })

  this.readStop()
}

Handle.prototype.shutdown = function shutdown (req) {
  var wrap = this._queueReq('shutdown', req)

  if (!this._stream) {
    this.once('stream', function () {
      this._shutdown(wrap)
    })
    return 0
  }

  return this._shutdown(wrap)
}

Handle.prototype._shutdown = function _shutdown (wrap) {
  var self = this
  this._stream.end(function () {
    var req = wrap.dequeue()
    if (!req) { return }

    req.oncomplete(0, self, req)
  })
  return 0
}

Handle.prototype.close = function close (callback) {
  this._close()

  if (!this._stream) {
    this.once('stream', function () {
      this.close(callback)
    })
    return 0
  }

  if (this._options.close) {
    this._options.close(callback)
  } else {
    process.nextTick(callback)
  }

  return 0
}

Handle.prototype.writeEnc = function writeEnc (req, data, enc) {
  var wrap = this._queueReq('write', req)

  if (!this._stream) {
    this.once('stream', function () {
      this._writeEnc(wrap, req, data, enc)
    })

    return 0
  }

  return this._writeEnc(wrap, req, data, enc)
}

Handle.prototype._writeEnc = function _writeEnc (wrap, req, data, enc) {
  var self = this

  req.async = true
  req.bytes = data.length

  if (wrap.isEmpty()) {
    return 0
  }

  this._stream.write(data, enc, function () {
    var req = wrap.dequeue()
    if (!req) { return }
    req.oncomplete(0, self, req)
  })

  return 0
}

/**
 * @param {WriteWrap} req
 * @param {string[]} chunks
 * @param {Boolean} allBuffers
 */
Handle.prototype.writev = function _writev (req, chunks, allBuffers) {
  while (chunks.length > 0) {
    this._stream.write(chunks.shift(), chunks.shift())
  }
  return 0
}

Handle.prototype.writeBuffer = function writeBuffer (req, data) {
  return this.writeEnc(req, data, null)
}

Handle.prototype.writeAsciiString = function writeAsciiString (req, data) {
  return this.writeEnc(req, data, 'ascii')
}

Handle.prototype.writeUtf8String = function writeUtf8String (req, data) {
  return this.writeEnc(req, data, 'utf8')
}

Handle.prototype.writeUcs2String = function writeUcs2String (req, data) {
  return this.writeEnc(req, data, 'ucs2')
}

Handle.prototype.writeBinaryString = function writeBinaryString (req, data) {
  return this.writeEnc(req, data, 'binary')
}

Handle.prototype.writeLatin1String = function writeLatin1String (req, data) {
  return this.writeEnc(req, data, 'binary')
}

// v0.8
Handle.prototype.getsockname = function getsockname () {
  if (this._options.getPeerName) {
    return this._options.getPeerName()
  }
  return null
}

Handle.prototype.getpeername = function getpeername (out) {
  var res = this.getsockname()
  if (!res) { return -1 }

  Object.keys(res).forEach(function (key) {
    out[key] = res[key]
  })

  return 0
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

function Queue () {
  this.head = new Item('head', null)
}
module.exports = Queue

Queue.prototype.append = function append (kind, value) {
  var item = new Item(kind, value)
  this.head.prepend(item)
  return item
}

Queue.prototype.isEmpty = function isEmpty () {
  return this.head.prev === this.head
}

Queue.prototype.first = function first () {
  return this.head.next
}

function Item (kind, value) {
  this.prev = this
  this.next = this
  this.kind = kind
  this.value = value
}

Item.prototype.prepend = function prepend (other) {
  other.prev = this.prev
  other.next = this
  other.prev.next = other
  other.next.prev = other
}

Item.prototype.dequeue = function dequeue () {
  var prev = this.prev
  var next = this.next

  prev.next = next
  next.prev = prev
  this.prev = this
  this.next = this

  return this.value
}

Item.prototype.isEmpty = function isEmpty () {
  return this.prev === this
}


/***/ })
/******/ ]);
