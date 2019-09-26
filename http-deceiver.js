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
var util = __webpack_require__(4);

var Buffer = __webpack_require__(5).Buffer;

// Node.js version
var mode = /^v0\.8\./.test(process.version) ? 'rusty' :
           /^v0\.(9|10)\./.test(process.version) ? 'old' :
           /^v0\.12\./.test(process.version) ? 'normal' :
           'modern';

var HTTPParser;

var methods;
var reverseMethods;

var kOnHeaders;
var kOnHeadersComplete;
var kOnMessageComplete;
var kOnBody;
if (mode === 'normal' || mode === 'modern') {
  HTTPParser = process.binding('http_parser').HTTPParser;
  methods = HTTPParser.methods;

  // v6
  if (!methods)
    methods = process.binding('http_parser').methods;

  reverseMethods = {};

  methods.forEach(function(method, index) {
    reverseMethods[method] = index;
  });

  kOnHeaders = HTTPParser.kOnHeaders | 0;
  kOnHeadersComplete = HTTPParser.kOnHeadersComplete | 0;
  kOnMessageComplete = HTTPParser.kOnMessageComplete | 0;
  kOnBody = HTTPParser.kOnBody | 0;
} else {
  kOnHeaders = 'onHeaders';
  kOnHeadersComplete = 'onHeadersComplete';
  kOnMessageComplete = 'onMessageComplete';
  kOnBody = 'onBody';
}

function Deceiver(socket, options) {
  this.socket = socket;
  this.options = options || {};
  this.isClient = this.options.isClient;
}
module.exports = Deceiver;

Deceiver.create = function create(stream, options) {
  return new Deceiver(stream, options);
};

Deceiver.prototype._toHeaderList = function _toHeaderList(object) {
  var out = [];
  var keys = Object.keys(object);

  for (var i = 0; i < keys.length; i++)
    out.push(keys[i], object[keys[i]]);

  return out;
};

Deceiver.prototype._isUpgrade = function _isUpgrade(request) {
  return request.method === 'CONNECT' ||
         request.headers.upgrade ||
         request.headers.connection &&
            /(^|\W)upgrade(\W|$)/i.test(request.headers.connection);
};

// TODO(indutny): support CONNECT
if (mode === 'modern') {
  /*
  function parserOnHeadersComplete(versionMajor, versionMinor, headers, method,
                                   url, statusCode, statusMessage, upgrade,
                                   shouldKeepAlive) {
   */
  Deceiver.prototype.emitRequest = function emitRequest(request) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    parser.execute = null;

    var self = this;
    var method = reverseMethods[request.method];
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](1,
                               1,
                               self._toHeaderList(request.headers),
                               method,
                               request.path,
                               0,
                               '',
                               self._isUpgrade(request),
                               true);
      return 0;
    };

    this._emitEmpty();
  };

  Deceiver.prototype.emitResponse = function emitResponse(response) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    parser.execute = null;

    var self = this;
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](1,
                               1,
                               self._toHeaderList(response.headers),
                               response.path,
                               response.code,
                               response.status,
                               response.reason || '',
                               self._isUpgrade(response),
                               true);
      return 0;
    };

    this._emitEmpty();
  };
} else {
  /*
    `function parserOnHeadersComplete(info) {`

    info = { .versionMajor, .versionMinor, .url, .headers, .method,
             .statusCode, .statusMessage, .upgrade, .shouldKeepAlive }
   */
  Deceiver.prototype.emitRequest = function emitRequest(request) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    var method = request.method;
    if (reverseMethods)
      method = reverseMethods[method];

    var info = {
      versionMajor: 1,
      versionMinor: 1,
      url: request.path,
      headers: this._toHeaderList(request.headers),
      method: method,
      statusCode: 0,
      statusMessage: '',
      upgrade: this._isUpgrade(request),
      shouldKeepAlive: true
    };

    var self = this;
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](info);
      return 0;
    };

    this._emitEmpty();
  };

  Deceiver.prototype.emitResponse = function emitResponse(response) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    var info = {
      versionMajor: 1,
      versionMinor: 1,
      url: response.path,
      headers: this._toHeaderList(response.headers),
      method: false,
      statusCode: response.status,
      statusMessage: response.reason || '',
      upgrade: this._isUpgrade(response),
      shouldKeepAlive: true
    };

    var self = this;
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](info);
      return 0;
    };

    this._emitEmpty();
  };
}

Deceiver.prototype._skipExecute = function _skipExecute(parser) {
  var self = this;
  var oldExecute = parser.constructor.prototype.execute;
  var oldFinish = parser.constructor.prototype.finish;

  parser.execute = null;
  parser.finish = null;

  parser.execute = function execute(buffer, start, len) {
    // Parser reuse
    if (this.socket !== self.socket) {
      this.execute = oldExecute;
      this.finish = oldFinish;
      return this.execute(buffer, start, len);
    }

    if (start !== undefined)
      buffer = buffer.slice(start, start + len);
    self.emitBody(buffer);
    return len;
  };

  parser.finish = function finish() {
    // Parser reuse
    if (this.socket !== self.socket) {
      this.execute = oldExecute;
      this.finish = oldFinish;
      return this.finish();
    }

    this.execute = oldExecute;
    this.finish = oldFinish;
    self.emitMessageComplete();
  };
};

Deceiver.prototype.emitBody = function emitBody(buffer) {
  var parser = this.socket.parser;
  assert(parser, 'No parser present');

  parser[kOnBody](buffer, 0, buffer.length);
};

Deceiver.prototype._emitEmpty = function _emitEmpty() {
  // Emit data to force out handling of UPGRADE
  var empty = new Buffer(0);
  if (this.socket.ondata)
    this.socket.ondata(empty, 0, 0);
  else
    this.socket.emit('data', empty);
};

Deceiver.prototype.emitMessageComplete = function emitMessageComplete() {
  var parser = this.socket.parser;
  assert(parser, 'No parser present');

  parser[kOnMessageComplete]();
};


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

module.exports = require("buffer");

/***/ })
/******/ ]);
