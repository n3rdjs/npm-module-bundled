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


var transportList = __webpack_require__(3);

module.exports = __webpack_require__(91)(transportList);

// TODO can't get rid of this until all servers do
if ('_sockjs_onload' in global) {
  setTimeout(global._sockjs_onload, 1);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [
  // streaming transports
  __webpack_require__(4)
, __webpack_require__(58)
, __webpack_require__(70)
, __webpack_require__(72)
, __webpack_require__(76)(__webpack_require__(72))

  // polling transports
, __webpack_require__(84)
, __webpack_require__(76)(__webpack_require__(84))
, __webpack_require__(86)
, __webpack_require__(87)
, __webpack_require__(76)(__webpack_require__(86))
, __webpack_require__(88)
];


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(5)
  , urlUtils = __webpack_require__(8)
  , inherits = __webpack_require__(19)
  , EventEmitter = __webpack_require__(21).EventEmitter
  , WebsocketDriver = __webpack_require__(22)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:websocket');
}

function WebSocketTransport(transUrl, ignore, options) {
  if (!WebSocketTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  EventEmitter.call(this);
  debug('constructor', transUrl);

  var self = this;
  var url = urlUtils.addPath(transUrl, '/websocket');
  if (url.slice(0, 5) === 'https') {
    url = 'wss' + url.slice(5);
  } else {
    url = 'ws' + url.slice(4);
  }
  this.url = url;

  this.ws = new WebsocketDriver(this.url, [], options);
  this.ws.onmessage = function(e) {
    debug('message event', e.data);
    self.emit('message', e.data);
  };
  // Firefox has an interesting bug. If a websocket connection is
  // created after onunload, it stays alive even when user
  // navigates away from the page. In such situation let's lie -
  // let's not open the ws connection at all. See:
  // https://github.com/sockjs/sockjs-client/issues/28
  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
  this.unloadRef = utils.unloadAdd(function() {
    debug('unload');
    self.ws.close();
  });
  this.ws.onclose = function(e) {
    debug('close event', e.code, e.reason);
    self.emit('close', e.code, e.reason);
    self._cleanup();
  };
  this.ws.onerror = function(e) {
    debug('error event', e);
    self.emit('close', 1006, 'WebSocket connection broken');
    self._cleanup();
  };
}

inherits(WebSocketTransport, EventEmitter);

WebSocketTransport.prototype.send = function(data) {
  var msg = '[' + data + ']';
  debug('send', msg);
  this.ws.send(msg);
};

WebSocketTransport.prototype.close = function() {
  debug('close');
  var ws = this.ws;
  this._cleanup();
  if (ws) {
    ws.close();
  }
};

WebSocketTransport.prototype._cleanup = function() {
  debug('_cleanup');
  var ws = this.ws;
  if (ws) {
    ws.onmessage = ws.onclose = ws.onerror = null;
  }
  utils.unloadDel(this.unloadRef);
  this.unloadRef = this.ws = null;
  this.removeAllListeners();
};

WebSocketTransport.enabled = function() {
  debug('enabled');
  return !!WebsocketDriver;
};
WebSocketTransport.transportName = 'websocket';

// In theory, ws should require 1 round trip. But in chrome, this is
// not very stable over SSL. Most likely a ws connection requires a
// separate SSL connection, in which case 2 round trips are an
// absolute minumum.
WebSocketTransport.roundTrips = 2;

module.exports = WebSocketTransport;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var random = __webpack_require__(6);

var onUnload = {}
  , afterUnload = false
    // detect google chrome packaged apps because they don't allow the 'unload' event
  , isChromePackagedApp = global.chrome && global.chrome.app && global.chrome.app.runtime
  ;

module.exports = {
  attachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.addEventListener(event, listener, false);
    } else if (global.document && global.attachEvent) {
      // IE quirks.
      // According to: http://stevesouders.com/misc/test-postmessage.php
      // the message gets delivered only to 'document', not 'window'.
      global.document.attachEvent('on' + event, listener);
      // I get 'window' for ie8.
      global.attachEvent('on' + event, listener);
    }
  }

, detachEvent: function(event, listener) {
    if (typeof global.addEventListener !== 'undefined') {
      global.removeEventListener(event, listener, false);
    } else if (global.document && global.detachEvent) {
      global.document.detachEvent('on' + event, listener);
      global.detachEvent('on' + event, listener);
    }
  }

, unloadAdd: function(listener) {
    if (isChromePackagedApp) {
      return null;
    }

    var ref = random.string(8);
    onUnload[ref] = listener;
    if (afterUnload) {
      setTimeout(this.triggerUnloadCallbacks, 0);
    }
    return ref;
  }

, unloadDel: function(ref) {
    if (ref in onUnload) {
      delete onUnload[ref];
    }
  }

, triggerUnloadCallbacks: function() {
    for (var ref in onUnload) {
      onUnload[ref]();
      delete onUnload[ref];
    }
  }
};

var unloadTriggered = function() {
  if (afterUnload) {
    return;
  }
  afterUnload = true;
  module.exports.triggerUnloadCallbacks();
};

// 'unload' alone is not reliable in opera within an iframe, but we
// can't use `beforeunload` as IE fires it on javascript: links.
if (!isChromePackagedApp) {
  module.exports.attachEvent('unload', unloadTriggered);
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* global crypto:true */
var crypto = __webpack_require__(7);

// This string has length 32, a power of 2, so the modulus doesn't introduce a
// bias.
var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';
module.exports = {
  string: function(length) {
    var max = _randomStringChars.length;
    var bytes = crypto.randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
  }

, number: function(max) {
    return Math.floor(Math.random() * max);
  }

, numberString: function(max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + this.number(max)).slice(-t);
  }
};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var URL = __webpack_require__(9);

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:utils:url');
}

module.exports = {
  getOrigin: function(url) {
    if (!url) {
      return null;
    }

    var p = new URL(url);
    if (p.protocol === 'file:') {
      return null;
    }

    var port = p.port;
    if (!port) {
      port = (p.protocol === 'https:') ? '443' : '80';
    }

    return p.protocol + '//' + p.hostname + ':' + port;
  }

, isOriginEqual: function(a, b) {
    var res = this.getOrigin(a) === this.getOrigin(b);
    debug('same', a, b, res);
    return res;
  }

, isSchemeEqual: function(a, b) {
    return (a.split(':')[0] === b.split(':')[0]);
  }

, addPath: function (url, path) {
    var qs = url.split('?');
    return qs[0] + path + (qs[1] ? '?' + qs[1] : '');
  }

, addQuery: function (url, q) {
    return url + (url.indexOf('?') === -1 ? ('?' + q) : ('&' + q));
  }
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var required = __webpack_require__(10)
  , qs = __webpack_require__(11)
  , slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//
  , protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\S\s]*)/i
  , whitespace = '[\\x09\\x0A\\x0B\\x0C\\x0D\\x20\\xA0\\u1680\\u180E\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200A\\u202F\\u205F\\u3000\\u2028\\u2029\\uFEFF]'
  , left = new RegExp('^'+ whitespace +'+');

/**
 * Trim a given string.
 *
 * @param {String} str String to trim.
 * @public
 */
function trimLeft(str) {
  return (str ? str : '').toString().replace(left, '');
}

/**
 * These are the parse rules for the URL parser, it informs the parser
 * about:
 *
 * 0. The char it Needs to parse, if it's a string it should be done using
 *    indexOf, RegExp using exec and NaN means set as current value.
 * 1. The property we should set when parsing this value.
 * 2. Indication if it's backwards or forward parsing, when set as number it's
 *    the value of extra chars that should be split off.
 * 3. Inherit from location if non existing in the parser.
 * 4. `toLowerCase` the resulting value.
 */
var rules = [
  ['#', 'hash'],                        // Extract from the back.
  ['?', 'query'],                       // Extract from the back.
  function sanitize(address) {          // Sanitize what is left of the address
    return address.replace('\\', '/');
  },
  ['/', 'pathname'],                    // Extract from the back.
  ['@', 'auth', 1],                     // Extract from the front.
  [NaN, 'host', undefined, 1, 1],       // Set left over value.
  [/:(\d+)$/, 'port', undefined, 1],    // RegExp the back.
  [NaN, 'hostname', undefined, 1, 1]    // Set left over.
];

/**
 * These properties should not be copied or inherited from. This is only needed
 * for all non blob URL's as a blob URL does not include a hash, only the
 * origin.
 *
 * @type {Object}
 * @private
 */
var ignore = { hash: 1, query: 1 };

/**
 * The location object differs when your code is loaded through a normal page,
 * Worker or through a worker using a blob. And with the blobble begins the
 * trouble as the location object will contain the URL of the blob, not the
 * location of the page where our code is loaded in. The actual origin is
 * encoded in the `pathname` so we can thankfully generate a good "default"
 * location from it so we can generate proper relative URL's again.
 *
 * @param {Object|String} loc Optional default location object.
 * @returns {Object} lolcation object.
 * @public
 */
function lolcation(loc) {
  var globalVar;

  if (typeof window !== 'undefined') globalVar = window;
  else if (typeof global !== 'undefined') globalVar = global;
  else if (typeof self !== 'undefined') globalVar = self;
  else globalVar = {};

  var location = globalVar.location || {};
  loc = loc || location;

  var finaldestination = {}
    , type = typeof loc
    , key;

  if ('blob:' === loc.protocol) {
    finaldestination = new Url(unescape(loc.pathname), {});
  } else if ('string' === type) {
    finaldestination = new Url(loc, {});
    for (key in ignore) delete finaldestination[key];
  } else if ('object' === type) {
    for (key in loc) {
      if (key in ignore) continue;
      finaldestination[key] = loc[key];
    }

    if (finaldestination.slashes === undefined) {
      finaldestination.slashes = slashes.test(loc.href);
    }
  }

  return finaldestination;
}

/**
 * @typedef ProtocolExtract
 * @type Object
 * @property {String} protocol Protocol matched in the URL, in lowercase.
 * @property {Boolean} slashes `true` if protocol is followed by "//", else `false`.
 * @property {String} rest Rest of the URL that is not part of the protocol.
 */

/**
 * Extract protocol information from a URL with/without double slash ("//").
 *
 * @param {String} address URL we want to extract from.
 * @return {ProtocolExtract} Extracted information.
 * @private
 */
function extractProtocol(address) {
  address = trimLeft(address);
  var match = protocolre.exec(address);

  return {
    protocol: match[1] ? match[1].toLowerCase() : '',
    slashes: !!match[2],
    rest: match[3]
  };
}

/**
 * Resolve a relative URL pathname against a base URL pathname.
 *
 * @param {String} relative Pathname of the relative URL.
 * @param {String} base Pathname of the base URL.
 * @return {String} Resolved pathname.
 * @private
 */
function resolve(relative, base) {
  if (relative === '') return base;

  var path = (base || '/').split('/').slice(0, -1).concat(relative.split('/'))
    , i = path.length
    , last = path[i - 1]
    , unshift = false
    , up = 0;

  while (i--) {
    if (path[i] === '.') {
      path.splice(i, 1);
    } else if (path[i] === '..') {
      path.splice(i, 1);
      up++;
    } else if (up) {
      if (i === 0) unshift = true;
      path.splice(i, 1);
      up--;
    }
  }

  if (unshift) path.unshift('');
  if (last === '.' || last === '..') path.push('');

  return path.join('/');
}

/**
 * The actual URL instance. Instead of returning an object we've opted-in to
 * create an actual constructor as it's much more memory efficient and
 * faster and it pleases my OCD.
 *
 * It is worth noting that we should not use `URL` as class name to prevent
 * clashes with the global URL instance that got introduced in browsers.
 *
 * @constructor
 * @param {String} address URL we want to parse.
 * @param {Object|String} [location] Location defaults for relative paths.
 * @param {Boolean|Function} [parser] Parser for the query string.
 * @private
 */
function Url(address, location, parser) {
  address = trimLeft(address);

  if (!(this instanceof Url)) {
    return new Url(address, location, parser);
  }

  var relative, extracted, parse, instruction, index, key
    , instructions = rules.slice()
    , type = typeof location
    , url = this
    , i = 0;

  //
  // The following if statements allows this module two have compatibility with
  // 2 different API:
  //
  // 1. Node.js's `url.parse` api which accepts a URL, boolean as arguments
  //    where the boolean indicates that the query string should also be parsed.
  //
  // 2. The `URL` interface of the browser which accepts a URL, object as
  //    arguments. The supplied object will be used as default values / fall-back
  //    for relative paths.
  //
  if ('object' !== type && 'string' !== type) {
    parser = location;
    location = null;
  }

  if (parser && 'function' !== typeof parser) parser = qs.parse;

  location = lolcation(location);

  //
  // Extract protocol information before running the instructions.
  //
  extracted = extractProtocol(address || '');
  relative = !extracted.protocol && !extracted.slashes;
  url.slashes = extracted.slashes || relative && location.slashes;
  url.protocol = extracted.protocol || location.protocol || '';
  address = extracted.rest;

  //
  // When the authority component is absent the URL starts with a path
  // component.
  //
  if (!extracted.slashes) instructions[3] = [/(.*)/, 'pathname'];

  for (; i < instructions.length; i++) {
    instruction = instructions[i];

    if (typeof instruction === 'function') {
      address = instruction(address);
      continue;
    }

    parse = instruction[0];
    key = instruction[1];

    if (parse !== parse) {
      url[key] = address;
    } else if ('string' === typeof parse) {
      if (~(index = address.indexOf(parse))) {
        if ('number' === typeof instruction[2]) {
          url[key] = address.slice(0, index);
          address = address.slice(index + instruction[2]);
        } else {
          url[key] = address.slice(index);
          address = address.slice(0, index);
        }
      }
    } else if ((index = parse.exec(address))) {
      url[key] = index[1];
      address = address.slice(0, index.index);
    }

    url[key] = url[key] || (
      relative && instruction[3] ? location[key] || '' : ''
    );

    //
    // Hostname, host and protocol should be lowercased so they can be used to
    // create a proper `origin`.
    //
    if (instruction[4]) url[key] = url[key].toLowerCase();
  }

  //
  // Also parse the supplied query string in to an object. If we're supplied
  // with a custom parser as function use that instead of the default build-in
  // parser.
  //
  if (parser) url.query = parser(url.query);

  //
  // If the URL is relative, resolve the pathname against the base URL.
  //
  if (
      relative
    && location.slashes
    && url.pathname.charAt(0) !== '/'
    && (url.pathname !== '' || location.pathname !== '')
  ) {
    url.pathname = resolve(url.pathname, location.pathname);
  }

  //
  // We should not add port numbers if they are already the default port number
  // for a given protocol. As the host also contains the port number we're going
  // override it with the hostname which contains no port number.
  //
  if (!required(url.port, url.protocol)) {
    url.host = url.hostname;
    url.port = '';
  }

  //
  // Parse down the `auth` for the username and password.
  //
  url.username = url.password = '';
  if (url.auth) {
    instruction = url.auth.split(':');
    url.username = instruction[0] || '';
    url.password = instruction[1] || '';
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  //
  // The href is just the compiled result.
  //
  url.href = url.toString();
}

/**
 * This is convenience method for changing properties in the URL instance to
 * insure that they all propagate correctly.
 *
 * @param {String} part          Property we need to adjust.
 * @param {Mixed} value          The newly assigned value.
 * @param {Boolean|Function} fn  When setting the query, it will be the function
 *                               used to parse the query.
 *                               When setting the protocol, double slash will be
 *                               removed from the final url if it is true.
 * @returns {URL} URL instance for chaining.
 * @public
 */
function set(part, value, fn) {
  var url = this;

  switch (part) {
    case 'query':
      if ('string' === typeof value && value.length) {
        value = (fn || qs.parse)(value);
      }

      url[part] = value;
      break;

    case 'port':
      url[part] = value;

      if (!required(value, url.protocol)) {
        url.host = url.hostname;
        url[part] = '';
      } else if (value) {
        url.host = url.hostname +':'+ value;
      }

      break;

    case 'hostname':
      url[part] = value;

      if (url.port) value += ':'+ url.port;
      url.host = value;
      break;

    case 'host':
      url[part] = value;

      if (/:\d+$/.test(value)) {
        value = value.split(':');
        url.port = value.pop();
        url.hostname = value.join(':');
      } else {
        url.hostname = value;
        url.port = '';
      }

      break;

    case 'protocol':
      url.protocol = value.toLowerCase();
      url.slashes = !fn;
      break;

    case 'pathname':
    case 'hash':
      if (value) {
        var char = part === 'pathname' ? '/' : '#';
        url[part] = value.charAt(0) !== char ? char + value : value;
      } else {
        url[part] = value;
      }
      break;

    default:
      url[part] = value;
  }

  for (var i = 0; i < rules.length; i++) {
    var ins = rules[i];

    if (ins[4]) url[ins[1]] = url[ins[1]].toLowerCase();
  }

  url.origin = url.protocol && url.host && url.protocol !== 'file:'
    ? url.protocol +'//'+ url.host
    : 'null';

  url.href = url.toString();

  return url;
}

/**
 * Transform the properties back in to a valid and full URL string.
 *
 * @param {Function} stringify Optional query stringify function.
 * @returns {String} Compiled version of the URL.
 * @public
 */
function toString(stringify) {
  if (!stringify || 'function' !== typeof stringify) stringify = qs.stringify;

  var query
    , url = this
    , protocol = url.protocol;

  if (protocol && protocol.charAt(protocol.length - 1) !== ':') protocol += ':';

  var result = protocol + (url.slashes ? '//' : '');

  if (url.username) {
    result += url.username;
    if (url.password) result += ':'+ url.password;
    result += '@';
  }

  result += url.host + url.pathname;

  query = 'object' === typeof url.query ? stringify(url.query) : url.query;
  if (query) result += '?' !== query.charAt(0) ? '?'+ query : query;

  if (url.hash) result += url.hash;

  return result;
}

Url.prototype = { set: set, toString: toString };

//
// Expose the URL parser and some additional properties that might be useful for
// others or testing.
//
Url.extractProtocol = extractProtocol;
Url.location = lolcation;
Url.trimLeft = trimLeft;
Url.qs = qs;

module.exports = Url;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if we're required to add a port number.
 *
 * @see https://url.spec.whatwg.org/#default-port
 * @param {Number|String} port Port number we need to check
 * @param {String} protocol Protocol we need to check against.
 * @returns {Boolean} Is it a default port for the given protocol
 * @api private
 */
module.exports = function required(port, protocol) {
  protocol = protocol.split(':')[0];
  port = +port;

  if (!port) return false;

  switch (protocol) {
    case 'http':
    case 'ws':
    return port !== 80;

    case 'https':
    case 'wss':
    return port !== 443;

    case 'ftp':
    return port !== 21;

    case 'gopher':
    return port !== 70;

    case 'file':
    return false;
  }

  return port !== 0;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , undef;

/**
 * Decode a URI encoded string.
 *
 * @param {String} input The URI encoded string.
 * @returns {String|Null} The decoded string.
 * @api private
 */
function decode(input) {
  try {
    return decodeURIComponent(input.replace(/\+/g, ' '));
  } catch (e) {
    return null;
  }
}

/**
 * Attempts to encode a given input.
 *
 * @param {String} input The string that needs to be encoded.
 * @returns {String|Null} The encoded string.
 * @api private
 */
function encode(input) {
  try {
    return encodeURIComponent(input);
  } catch (e) {
    return null;
  }
}

/**
 * Simple query string parser.
 *
 * @param {String} query The query string that needs to be parsed.
 * @returns {Object}
 * @api public
 */
function querystring(query) {
  var parser = /([^=?&]+)=?([^&]*)/g
    , result = {}
    , part;

  while (part = parser.exec(query)) {
    var key = decode(part[1])
      , value = decode(part[2]);

    //
    // Prevent overriding of existing properties. This ensures that build-in
    // methods like `toString` or __proto__ are not overriden by malicious
    // querystrings.
    //
    // In the case if failed decoding, we want to omit the key/value pairs
    // from the result.
    //
    if (key === null || value === null || key in result) continue;
    result[key] = value;
  }

  return result;
}

/**
 * Transform a query string to an object.
 *
 * @param {Object} obj Object that should be transformed.
 * @param {String} prefix Optional prefix.
 * @returns {String}
 * @api public
 */
function querystringify(obj, prefix) {
  prefix = prefix || '';

  var pairs = []
    , value
    , key;

  //
  // Optionally prefix with a '?' if needed
  //
  if ('string' !== typeof prefix) prefix = '?';

  for (key in obj) {
    if (has.call(obj, key)) {
      value = obj[key];

      //
      // Edge cases where we actually want to encode the value to an empty
      // string instead of the stringified value.
      //
      if (!value && (value === null || value === undef || isNaN(value))) {
        value = '';
      }

      key = encodeURIComponent(key);
      value = encodeURIComponent(value);

      //
      // If we failed to encode the strings, we should bail out as we don't
      // want to add invalid strings to the query.
      //
      if (key === null || value === null) continue;
      pairs.push(key +'='+ value);
    }
  }

  return pairs.length ? prefix + pairs.join('&') : '';
}

//
// Expose the module.
//
exports.stringify = querystringify;
exports.parse = querystring;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */
if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
  module.exports = __webpack_require__(13);
} else {
  module.exports = __webpack_require__(16);
}



/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
/**
 * Colors.
 */

exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */
// eslint-disable-next-line complexity

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
    return true;
  } // Internet Explorer and Edge do not support colors.


  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
    return false;
  } // Is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
}
/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);

  if (!this.useColors) {
    return;
  }

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit'); // The final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into

  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function (match) {
    if (match === '%%') {
      return;
    }

    index++;

    if (match === '%c') {
      // We only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });
  args.splice(lastC, 0, c);
}
/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */


function log() {
  var _console;

  // This hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return (typeof console === "undefined" ? "undefined" : _typeof(console)) === 'object' && console.log && (_console = console).log.apply(_console, arguments);
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  try {
    if (namespaces) {
      exports.storage.setItem('debug', namespaces);
    } else {
      exports.storage.removeItem('debug');
    }
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  var r;

  try {
    r = exports.storage.getItem('debug');
  } catch (error) {} // Swallow
  // XXX (@Qix-) should we be logging these?
  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}
/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */


function localstorage() {
  try {
    // TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
    // The Browser also has localStorage in the global context.
    return localStorage;
  } catch (error) {// Swallow
    // XXX (@Qix-) should we be logging these?
  }
}

module.exports = __webpack_require__(14)(exports);
var formatters = module.exports.formatters;
/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
  try {
    return JSON.stringify(v);
  } catch (error) {
    return '[UnexpectedJSONParseError]: ' + error.message;
  }
};



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */
function setup(env) {
  createDebug.debug = createDebug;
  createDebug.default = createDebug;
  createDebug.coerce = coerce;
  createDebug.disable = disable;
  createDebug.enable = enable;
  createDebug.enabled = enabled;
  createDebug.humanize = __webpack_require__(15);
  Object.keys(env).forEach(function (key) {
    createDebug[key] = env[key];
  });
  /**
  * Active `debug` instances.
  */

  createDebug.instances = [];
  /**
  * The currently active debug mode names, and names to skip.
  */

  createDebug.names = [];
  createDebug.skips = [];
  /**
  * Map of special "%n" handling functions, for the debug "format" argument.
  *
  * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
  */

  createDebug.formatters = {};
  /**
  * Selects a color for a debug namespace
  * @param {String} namespace The namespace string for the for the debug instance to be colored
  * @return {Number|String} An ANSI color code for the given namespace
  * @api private
  */

  function selectColor(namespace) {
    var hash = 0;

    for (var i = 0; i < namespace.length; i++) {
      hash = (hash << 5) - hash + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
  }

  createDebug.selectColor = selectColor;
  /**
  * Create a debugger with the given `namespace`.
  *
  * @param {String} namespace
  * @return {Function}
  * @api public
  */

  function createDebug(namespace) {
    var prevTime;

    function debug() {
      // Disabled?
      if (!debug.enabled) {
        return;
      }

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var self = debug; // Set `diff` timestamp

      var curr = Number(new Date());
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;
      args[0] = createDebug.coerce(args[0]);

      if (typeof args[0] !== 'string') {
        // Anything else let's inspect with %O
        args.unshift('%O');
      } // Apply any `formatters` transformations


      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
        // If we encounter an escaped % then don't increase the array index
        if (match === '%%') {
          return match;
        }

        index++;
        var formatter = createDebug.formatters[format];

        if (typeof formatter === 'function') {
          var val = args[index];
          match = formatter.call(self, val); // Now we need to remove `args[index]` since it's inlined in the `format`

          args.splice(index, 1);
          index--;
        }

        return match;
      }); // Apply env-specific formatting (colors, etc.)

      createDebug.formatArgs.call(self, args);
      var logFn = self.log || createDebug.log;
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = createDebug.enabled(namespace);
    debug.useColors = createDebug.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;
    debug.extend = extend; // Debug.formatArgs = formatArgs;
    // debug.rawLog = rawLog;
    // env-specific initialization logic for debug instances

    if (typeof createDebug.init === 'function') {
      createDebug.init(debug);
    }

    createDebug.instances.push(debug);
    return debug;
  }

  function destroy() {
    var index = createDebug.instances.indexOf(this);

    if (index !== -1) {
      createDebug.instances.splice(index, 1);
      return true;
    }

    return false;
  }

  function extend(namespace, delimiter) {
    return createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
  }
  /**
  * Enables a debug mode by namespaces. This can include modes
  * separated by a colon and wildcards.
  *
  * @param {String} namespaces
  * @api public
  */


  function enable(namespaces) {
    createDebug.save(namespaces);
    createDebug.names = [];
    createDebug.skips = [];
    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) {
        // ignore empty strings
        continue;
      }

      namespaces = split[i].replace(/\*/g, '.*?');

      if (namespaces[0] === '-') {
        createDebug.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        createDebug.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < createDebug.instances.length; i++) {
      var instance = createDebug.instances[i];
      instance.enabled = createDebug.enabled(instance.namespace);
    }
  }
  /**
  * Disable debug output.
  *
  * @api public
  */


  function disable() {
    createDebug.enable('');
  }
  /**
  * Returns true if the given mode name is enabled, false otherwise.
  *
  * @param {String} name
  * @return {Boolean}
  * @api public
  */


  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }

    var i;
    var len;

    for (i = 0, len = createDebug.skips.length; i < len; i++) {
      if (createDebug.skips[i].test(name)) {
        return false;
      }
    }

    for (i = 0, len = createDebug.names.length; i < len; i++) {
      if (createDebug.names[i].test(name)) {
        return true;
      }
    }

    return false;
  }
  /**
  * Coerce `val`.
  *
  * @param {Mixed} val
  * @return {Mixed}
  * @api private
  */


  function coerce(val) {
    if (val instanceof Error) {
      return val.stack || val.message;
    }

    return val;
  }

  createDebug.enable(createDebug.load());
  return createDebug;
}

module.exports = setup;



/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */
var tty = __webpack_require__(17);

var util = __webpack_require__(18);
/**
 * This is the Node.js implementation of `debug()`.
 */


exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
  // Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
  // eslint-disable-next-line import/no-extraneous-dependencies
  var supportsColor = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module 'supports-color'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

  if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
    exports.colors = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
  }
} catch (error) {} // Swallow - we only care if `supports-color` is available; it doesn't have to be.

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */


exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // Camel-case
  var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
    return k.toUpperCase();
  }); // Coerce string value into JS value

  var val = process.env[key];

  if (/^(yes|on|true|enabled)$/i.test(val)) {
    val = true;
  } else if (/^(no|off|false|disabled)$/i.test(val)) {
    val = false;
  } else if (val === 'null') {
    val = null;
  } else {
    val = Number(val);
  }

  obj[prop] = val;
  return obj;
}, {});
/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
}
/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */


function formatArgs(args) {
  var name = this.namespace,
      useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var colorCode = "\x1B[3" + (c < 8 ? c : '8;5;' + c);
    var prefix = "  ".concat(colorCode, ";1m").concat(name, " \x1B[0m");
    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + "\x1B[0m");
  } else {
    args[0] = getDate() + name + ' ' + args[0];
  }
}

function getDate() {
  if (exports.inspectOpts.hideDate) {
    return '';
  }

  return new Date().toISOString() + ' ';
}
/**
 * Invokes `util.format()` with the specified arguments and writes to stderr.
 */


function log() {
  return process.stderr.write(util.format.apply(util, arguments) + '\n');
}
/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */


function save(namespaces) {
  if (namespaces) {
    process.env.DEBUG = namespaces;
  } else {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  }
}
/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */


function load() {
  return process.env.DEBUG;
}
/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */


function init(debug) {
  debug.inspectOpts = {};
  var keys = Object.keys(exports.inspectOpts);

  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

module.exports = __webpack_require__(14)(exports);
var formatters = module.exports.formatters;
/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts).replace(/\s*\n\s*/g, ' ');
};
/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */


formatters.O = function (v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};



/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(18);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(20);
}


/***/ }),
/* 20 */
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
/* 21 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23).Client;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// API references:
//
// * https://html.spec.whatwg.org/multipage/comms.html#network
// * https://dom.spec.whatwg.org/#interface-eventtarget
// * https://dom.spec.whatwg.org/#interface-event



var util   = __webpack_require__(18),
    driver = __webpack_require__(24),
    API    = __webpack_require__(51);

var WebSocket = function(request, socket, body, protocols, options) {
  options = options || {};

  this._stream = socket;
  this._driver = driver.http(request, {maxLength: options.maxLength, protocols: protocols});

  var self = this;
  if (!this._stream || !this._stream.writable) return;
  if (!this._stream.readable) return this._stream.end();

  var catchup = function() { self._stream.removeListener('data', catchup) };
  this._stream.on('data', catchup);

  API.call(this, options);

  process.nextTick(function() {
    self._driver.start();
    self._driver.io.write(body);
  });
};
util.inherits(WebSocket, API);

WebSocket.isWebSocket = function(request) {
  return driver.isWebSocket(request);
};

WebSocket.validateOptions = function(options, validKeys) {
  driver.validateOptions(options, validKeys);
};

WebSocket.WebSocket   = WebSocket;
WebSocket.Client      = __webpack_require__(54);
WebSocket.EventSource = __webpack_require__(57);

module.exports        = WebSocket;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Protocol references:
//
// * http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-75
// * http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol-76
// * http://tools.ietf.org/html/draft-ietf-hybi-thewebsocketprotocol-17

var Base   = __webpack_require__(25),
    Client = __webpack_require__(32),
    Server = __webpack_require__(48);

var Driver = {
  client: function(url, options) {
    options = options || {};
    if (options.masking === undefined) options.masking = true;
    return new Client(url, options);
  },

  server: function(options) {
    options = options || {};
    if (options.requireMasking === undefined) options.requireMasking = true;
    return new Server(options);
  },

  http: function() {
    return Server.http.apply(Server, arguments);
  },

  isSecureRequest: function(request) {
    return Server.isSecureRequest(request);
  },

  isWebSocket: function(request) {
    return Base.isWebSocket(request);
  },

  validateOptions: function(options, validKeys) {
    Base.validateOptions(options, validKeys);
  }
};

module.exports = Driver;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer  = __webpack_require__(26).Buffer,
    Emitter = __webpack_require__(21).EventEmitter,
    util    = __webpack_require__(18),
    streams = __webpack_require__(28),
    Headers = __webpack_require__(30),
    Reader  = __webpack_require__(31);

var Base = function(request, url, options) {
  Emitter.call(this);
  Base.validateOptions(options || {}, ['maxLength', 'masking', 'requireMasking', 'protocols']);

  this._request   = request;
  this._reader    = new Reader();
  this._options   = options || {};
  this._maxLength = this._options.maxLength || this.MAX_LENGTH;
  this._headers   = new Headers();
  this.__queue    = [];
  this.readyState = 0;
  this.url        = url;

  this.io = new streams.IO(this);
  this.messages = new streams.Messages(this);
  this._bindEventListeners();
};
util.inherits(Base, Emitter);

Base.isWebSocket = function(request) {
  var connection = request.headers.connection || '',
      upgrade    = request.headers.upgrade || '';

  return request.method === 'GET' &&
         connection.toLowerCase().split(/ *, */).indexOf('upgrade') >= 0 &&
         upgrade.toLowerCase() === 'websocket';
};

Base.validateOptions = function(options, validKeys) {
  for (var key in options) {
    if (validKeys.indexOf(key) < 0)
      throw new Error('Unrecognized option: ' + key);
  }
};

var instance = {
  // This is 64MB, small enough for an average VPS to handle without
  // crashing from process out of memory
  MAX_LENGTH: 0x3ffffff,

  STATES: ['connecting', 'open', 'closing', 'closed'],

  _bindEventListeners: function() {
    var self = this;

    // Protocol errors are informational and do not have to be handled
    this.messages.on('error', function() {});

    this.on('message', function(event) {
      var messages = self.messages;
      if (messages.readable) messages.emit('data', event.data);
    });

    this.on('error', function(error) {
      var messages = self.messages;
      if (messages.readable) messages.emit('error', error);
    });

    this.on('close', function() {
      var messages = self.messages;
      if (!messages.readable) return;
      messages.readable = messages.writable = false;
      messages.emit('end');
    });
  },

  getState: function() {
    return this.STATES[this.readyState] || null;
  },

  addExtension: function(extension) {
    return false;
  },

  setHeader: function(name, value) {
    if (this.readyState > 0) return false;
    this._headers.set(name, value);
    return true;
  },

  start: function() {
    if (this.readyState !== 0) return false;

    if (!Base.isWebSocket(this._request))
      return this._failHandshake(new Error('Not a WebSocket request'));

    var response;

    try {
      response = this._handshakeResponse();
    } catch (error) {
      return this._failHandshake(error);
    }

    this._write(response);
    if (this._stage !== -1) this._open();
    return true;
  },

  _failHandshake: function(error) {
    var headers = new Headers();
    headers.set('Content-Type', 'text/plain');
    headers.set('Content-Length', Buffer.byteLength(error.message, 'utf8'));

    headers = ['HTTP/1.1 400 Bad Request', headers.toString(), error.message];
    this._write(Buffer.from(headers.join('\r\n'), 'utf8'));
    this._fail('protocol_error', error.message);

    return false;
  },

  text: function(message) {
    return this.frame(message);
  },

  binary: function(message) {
    return false;
  },

  ping: function() {
    return false;
  },

  pong: function() {
      return false;
  },

  close: function(reason, code) {
    if (this.readyState !== 1) return false;
    this.readyState = 3;
    this.emit('close', new Base.CloseEvent(null, null));
    return true;
  },

  _open: function() {
    this.readyState = 1;
    this.__queue.forEach(function(args) { this.frame.apply(this, args) }, this);
    this.__queue = [];
    this.emit('open', new Base.OpenEvent());
  },

  _queue: function(message) {
    this.__queue.push(message);
    return true;
  },

  _write: function(chunk) {
    var io = this.io;
    if (io.readable) io.emit('data', chunk);
  },

  _fail: function(type, message) {
    this.readyState = 2;
    this.emit('error', new Error(message));
    this.close();
  }
};

for (var key in instance)
  Base.prototype[key] = instance[key];


Base.ConnectEvent = function() {};

Base.OpenEvent = function() {};

Base.CloseEvent = function(code, reason) {
  this.code   = code;
  this.reason = reason;
};

Base.MessageEvent = function(data) {
  this.data = data;
};

Base.PingEvent = function(data) {
  this.data = data;
};

Base.PongEvent = function(data) {
  this.data = data;
};

module.exports = Base;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(27)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**

Streams in a WebSocket connection
---------------------------------

We model a WebSocket as two duplex streams: one stream is for the wire protocol
over an I/O socket, and the other is for incoming/outgoing messages.


                        +----------+      +---------+      +----------+
    [1] write(chunk) -->| ~~~~~~~~ +----->| parse() +----->| ~~~~~~~~ +--> emit('data') [2]
                        |          |      +----+----+      |          |
                        |          |           |           |          |
                        |    IO    |           | [5]       | Messages |
                        |          |           V           |          |
                        |          |      +---------+      |          |
    [4] emit('data') <--+ ~~~~~~~~ |<-----+ frame() |<-----+ ~~~~~~~~ |<-- write(chunk) [3]
                        +----------+      +---------+      +----------+


Message transfer in each direction is simple: IO receives a byte stream [1] and
sends this stream for parsing. The parser will periodically emit a complete
message text on the Messages stream [2]. Similarly, when messages are written
to the Messages stream [3], they are framed using the WebSocket wire format and
emitted via IO [4].

There is a feedback loop via [5] since some input from [1] will be things like
ping, pong and close frames. In these cases the protocol responds by emitting
responses directly back to [4] rather than emitting messages via [2].

For the purposes of flow control, we consider the sources of each Readable
stream to be as follows:

* [2] receives input from [1]
* [4] receives input from [1] and [3]

The classes below express the relationships described above without prescribing
anything about how parse() and frame() work, other than assuming they emit
'data' events to the IO and Messages streams. They will work with any protocol
driver having these two methods.
**/


var Stream = __webpack_require__(29).Stream,
    util   = __webpack_require__(18);


var IO = function(driver) {
  this.readable = this.writable = true;
  this._paused  = false;
  this._driver  = driver;
};
util.inherits(IO, Stream);

// The IO pause() and resume() methods will be called when the socket we are
// piping to gets backed up and drains. Since IO output [4] comes from IO input
// [1] and Messages input [3], we need to tell both of those to return false
// from write() when this stream is paused.

IO.prototype.pause = function() {
  this._paused = true;
  this._driver.messages._paused = true;
};

IO.prototype.resume = function() {
  this._paused = false;
  this.emit('drain');

  var messages = this._driver.messages;
  messages._paused = false;
  messages.emit('drain');
};

// When we receive input from a socket, send it to the parser and tell the
// source whether to back off.
IO.prototype.write = function(chunk) {
  if (!this.writable) return false;
  this._driver.parse(chunk);
  return !this._paused;
};

// The IO end() method will be called when the socket piping into it emits
// 'close' or 'end', i.e. the socket is closed. In this situation the Messages
// stream will not emit any more data so we emit 'end'.
IO.prototype.end = function(chunk) {
  if (!this.writable) return;
  if (chunk !== undefined) this.write(chunk);
  this.writable = false;

  var messages = this._driver.messages;
  if (messages.readable) {
    messages.readable = messages.writable = false;
    messages.emit('end');
  }
};

IO.prototype.destroy = function() {
  this.end();
};


var Messages = function(driver) {
  this.readable = this.writable = true;
  this._paused  = false;
  this._driver  = driver;
};
util.inherits(Messages, Stream);

// The Messages pause() and resume() methods will be called when the app that's
// processing the messages gets backed up and drains. If we're emitting
// messages too fast we should tell the source to slow down. Message output [2]
// comes from IO input [1].

Messages.prototype.pause = function() {
  this._driver.io._paused = true;
};

Messages.prototype.resume = function() {
  this._driver.io._paused = false;
  this._driver.io.emit('drain');
};

// When we receive messages from the user, send them to the formatter and tell
// the source whether to back off.
Messages.prototype.write = function(message) {
  if (!this.writable) return false;
  if (typeof message === 'string') this._driver.text(message);
  else this._driver.binary(message);
  return !this._paused;
};

// The Messages end() method will be called when a stream piping into it emits
// 'end'. Many streams may be piped into the WebSocket and one of them ending
// does not mean the whole socket is done, so just process the input and move
// on leaving the socket open.
Messages.prototype.end = function(message) {
  if (message !== undefined) this.write(message);
};

Messages.prototype.destroy = function() {};


exports.IO = IO;
exports.Messages = Messages;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Headers = function() {
  this.clear();
};

Headers.prototype.ALLOWED_DUPLICATES = ['set-cookie', 'set-cookie2', 'warning', 'www-authenticate'];

Headers.prototype.clear = function() {
  this._sent  = {};
  this._lines = [];
};

Headers.prototype.set = function(name, value) {
  if (value === undefined) return;

  name = this._strip(name);
  value = this._strip(value);

  var key = name.toLowerCase();
  if (!this._sent.hasOwnProperty(key) || this.ALLOWED_DUPLICATES.indexOf(key) >= 0) {
    this._sent[key] = true;
    this._lines.push(name + ': ' + value + '\r\n');
  }
};

Headers.prototype.toString = function() {
  return this._lines.join('');
};

Headers.prototype._strip = function(string) {
  return string.toString().replace(/^ */, '').replace(/ *$/, '');
};

module.exports = Headers;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(26).Buffer;

var StreamReader = function() {
  this._queue     = [];
  this._queueSize = 0;
  this._offset    = 0;
};

StreamReader.prototype.put = function(buffer) {
  if (!buffer || buffer.length === 0) return;
  if (!Buffer.isBuffer(buffer)) buffer = Buffer.from(buffer);
  this._queue.push(buffer);
  this._queueSize += buffer.length;
};

StreamReader.prototype.read = function(length) {
  if (length > this._queueSize) return null;
  if (length === 0) return Buffer.alloc(0);

  this._queueSize -= length;

  var queue  = this._queue,
      remain = length,
      first  = queue[0],
      buffers, buffer;

  if (first.length >= length) {
    if (first.length === length) {
      return queue.shift();
    } else {
      buffer = first.slice(0, length);
      queue[0] = first.slice(length);
      return buffer;
    }
  }

  for (var i = 0, n = queue.length; i < n; i++) {
    if (remain < queue[i].length) break;
    remain -= queue[i].length;
  }
  buffers = queue.splice(0, i);

  if (remain > 0 && queue.length > 0) {
    buffers.push(queue[0].slice(0, remain));
    queue[0] = queue[0].slice(remain);
  }
  return Buffer.concat(buffers, length);
};

StreamReader.prototype.eachByte = function(callback, context) {
  var buffer, n, index;

  while (this._queue.length > 0) {
    buffer = this._queue[0];
    n = buffer.length;

    while (this._offset < n) {
      index = this._offset;
      this._offset += 1;
      callback.call(context, buffer[index]);
    }
    this._offset = 0;
    this._queue.shift();
  }
};

module.exports = StreamReader;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer     = __webpack_require__(26).Buffer,
    crypto     = __webpack_require__(7),
    url        = __webpack_require__(33),
    util       = __webpack_require__(18),
    HttpParser = __webpack_require__(34),
    Base       = __webpack_require__(25),
    Hybi       = __webpack_require__(37),
    Proxy      = __webpack_require__(47);

var Client = function(_url, options) {
  this.version = 'hybi-' + Hybi.VERSION;
  Hybi.call(this, null, _url, options);

  this.readyState = -1;
  this._key       = Client.generateKey();
  this._accept    = Hybi.generateAccept(this._key);
  this._http      = new HttpParser('response');

  var uri  = url.parse(this.url),
      auth = uri.auth && Buffer.from(uri.auth, 'utf8').toString('base64');

  if (this.VALID_PROTOCOLS.indexOf(uri.protocol) < 0)
    throw new Error(this.url + ' is not a valid WebSocket URL');

  this._pathname = (uri.pathname || '/') + (uri.search || '');

  this._headers.set('Host', uri.host);
  this._headers.set('Upgrade', 'websocket');
  this._headers.set('Connection', 'Upgrade');
  this._headers.set('Sec-WebSocket-Key', this._key);
  this._headers.set('Sec-WebSocket-Version', Hybi.VERSION);

  if (this._protocols.length > 0)
    this._headers.set('Sec-WebSocket-Protocol', this._protocols.join(', '));

  if (auth)
    this._headers.set('Authorization', 'Basic ' + auth);
};
util.inherits(Client, Hybi);

Client.generateKey = function() {
  return crypto.randomBytes(16).toString('base64');
};

var instance = {
  VALID_PROTOCOLS: ['ws:', 'wss:'],

  proxy: function(origin, options) {
    return new Proxy(this, origin, options);
  },

  start: function() {
    if (this.readyState !== -1) return false;
    this._write(this._handshakeRequest());
    this.readyState = 0;
    return true;
  },

  parse: function(chunk) {
    if (this.readyState === 3) return;
    if (this.readyState > 0) return Hybi.prototype.parse.call(this, chunk);

    this._http.parse(chunk);
    if (!this._http.isComplete()) return;

    this._validateHandshake();
    if (this.readyState === 3) return;

    this._open();
    this.parse(this._http.body);
  },

  _handshakeRequest: function() {
    var extensions = this._extensions.generateOffer();
    if (extensions)
      this._headers.set('Sec-WebSocket-Extensions', extensions);

    var start   = 'GET ' + this._pathname + ' HTTP/1.1',
        headers = [start, this._headers.toString(), ''];

    return Buffer.from(headers.join('\r\n'), 'utf8');
  },

  _failHandshake: function(message) {
    message = 'Error during WebSocket handshake: ' + message;
    this.readyState = 3;
    this.emit('error', new Error(message));
    this.emit('close', new Base.CloseEvent(this.ERRORS.protocol_error, message));
  },

  _validateHandshake: function() {
    this.statusCode = this._http.statusCode;
    this.headers    = this._http.headers;

    if (this._http.error)
      return this._failHandshake(this._http.error.message);

    if (this._http.statusCode !== 101)
      return this._failHandshake('Unexpected response code: ' + this._http.statusCode);

    var headers    = this._http.headers,
        upgrade    = headers['upgrade'] || '',
        connection = headers['connection'] || '',
        accept     = headers['sec-websocket-accept'] || '',
        protocol   = headers['sec-websocket-protocol'] || '';

    if (upgrade === '')
      return this._failHandshake("'Upgrade' header is missing");
    if (upgrade.toLowerCase() !== 'websocket')
      return this._failHandshake("'Upgrade' header value is not 'WebSocket'");

    if (connection === '')
      return this._failHandshake("'Connection' header is missing");
    if (connection.toLowerCase() !== 'upgrade')
      return this._failHandshake("'Connection' header value is not 'Upgrade'");

    if (accept !== this._accept)
      return this._failHandshake('Sec-WebSocket-Accept mismatch');

    this.protocol = null;

    if (protocol !== '') {
      if (this._protocols.indexOf(protocol) < 0)
        return this._failHandshake('Sec-WebSocket-Protocol mismatch');
      else
        this.protocol = protocol;
    }

    try {
      this._extensions.activate(this.headers['sec-websocket-extensions']);
    } catch (e) {
      return this._failHandshake(e.message);
    }
  }
};

for (var key in instance)
  Client.prototype[key] = instance[key];

module.exports = Client;


/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NodeHTTPParser = __webpack_require__(35).HTTPParser,
    Buffer         = __webpack_require__(26).Buffer;

var TYPES = {
  request:  NodeHTTPParser.REQUEST  || 'request',
  response: NodeHTTPParser.RESPONSE || 'response'
};

var HttpParser = function(type) {
  this._type     = type;
  this._parser   = new NodeHTTPParser(TYPES[type]);
  this._complete = false;
  this.headers   = {};

  var current = null,
      self    = this;

  this._parser.onHeaderField = function(b, start, length) {
    current = b.toString('utf8', start, start + length).toLowerCase();
  };

  this._parser.onHeaderValue = function(b, start, length) {
    var value = b.toString('utf8', start, start + length);

    if (self.headers.hasOwnProperty(current))
      self.headers[current] += ', ' + value;
    else
      self.headers[current] = value;
  };

  this._parser.onHeadersComplete = this._parser[NodeHTTPParser.kOnHeadersComplete] =
  function(majorVersion, minorVersion, headers, method, pathname, statusCode) {
    var info = arguments[0];

    if (typeof info === 'object') {
      method     = info.method;
      pathname   = info.url;
      statusCode = info.statusCode;
      headers    = info.headers;
    }

    self.method     = (typeof method === 'number') ? HttpParser.METHODS[method] : method;
    self.statusCode = statusCode;
    self.url        = pathname;

    if (!headers) return;

    for (var i = 0, n = headers.length, key, value; i < n; i += 2) {
      key   = headers[i].toLowerCase();
      value = headers[i+1];
      if (self.headers.hasOwnProperty(key))
        self.headers[key] += ', ' + value;
      else
        self.headers[key] = value;
    }

    self._complete = true;
  };
};

HttpParser.METHODS = {
  0:  'DELETE',
  1:  'GET',
  2:  'HEAD',
  3:  'POST',
  4:  'PUT',
  5:  'CONNECT',
  6:  'OPTIONS',
  7:  'TRACE',
  8:  'COPY',
  9:  'LOCK',
  10: 'MKCOL',
  11: 'MOVE',
  12: 'PROPFIND',
  13: 'PROPPATCH',
  14: 'SEARCH',
  15: 'UNLOCK',
  16: 'BIND',
  17: 'REBIND',
  18: 'UNBIND',
  19: 'ACL',
  20: 'REPORT',
  21: 'MKACTIVITY',
  22: 'CHECKOUT',
  23: 'MERGE',
  24: 'M-SEARCH',
  25: 'NOTIFY',
  26: 'SUBSCRIBE',
  27: 'UNSUBSCRIBE',
  28: 'PATCH',
  29: 'PURGE',
  30: 'MKCALENDAR',
  31: 'LINK',
  32: 'UNLINK'
};

var VERSION = (process.version || '')
              .match(/[0-9]+/g)
              .map(function(n) { return parseInt(n, 10) });

if (VERSION[0] === 0 && VERSION[1] === 12) {
  HttpParser.METHODS[16] = 'REPORT';
  HttpParser.METHODS[17] = 'MKACTIVITY';
  HttpParser.METHODS[18] = 'CHECKOUT';
  HttpParser.METHODS[19] = 'MERGE';
  HttpParser.METHODS[20] = 'M-SEARCH';
  HttpParser.METHODS[21] = 'NOTIFY';
  HttpParser.METHODS[22] = 'SUBSCRIBE';
  HttpParser.METHODS[23] = 'UNSUBSCRIBE';
  HttpParser.METHODS[24] = 'PATCH';
  HttpParser.METHODS[25] = 'PURGE';
}

HttpParser.prototype.isComplete = function() {
  return this._complete;
};

HttpParser.prototype.parse = function(chunk) {
  var consumed = this._parser.execute(chunk, 0, chunk.length);

  if (typeof consumed !== 'number') {
    this.error     = consumed;
    this._complete = true;
    return;
  }

  if (this._complete)
    this.body = (consumed < chunk.length)
              ? chunk.slice(consumed)
              : Buffer.alloc(0);
};

module.exports = HttpParser;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/*jshint node:true */

var assert = __webpack_require__(36);

exports.HTTPParser = HTTPParser;
function HTTPParser(type) {
  assert.ok(type === HTTPParser.REQUEST || type === HTTPParser.RESPONSE);
  this.type = type;
  this.state = type + '_LINE';
  this.info = {
    headers: [],
    upgrade: false
  };
  this.trailers = [];
  this.line = '';
  this.isChunked = false;
  this.connection = '';
  this.headerSize = 0; // for preventing too big headers
  this.body_bytes = null;
  this.isUserCall = false;
  this.hadError = false;
}
HTTPParser.maxHeaderSize = 80 * 1024; // maxHeaderSize (in bytes) is configurable, but 80kb by default;
HTTPParser.REQUEST = 'REQUEST';
HTTPParser.RESPONSE = 'RESPONSE';
var kOnHeaders = HTTPParser.kOnHeaders = 0;
var kOnHeadersComplete = HTTPParser.kOnHeadersComplete = 1;
var kOnBody = HTTPParser.kOnBody = 2;
var kOnMessageComplete = HTTPParser.kOnMessageComplete = 3;

// Some handler stubs, needed for compatibility
HTTPParser.prototype[kOnHeaders] =
HTTPParser.prototype[kOnHeadersComplete] =
HTTPParser.prototype[kOnBody] =
HTTPParser.prototype[kOnMessageComplete] = function () {};

var compatMode0_12 = true;
Object.defineProperty(HTTPParser, 'kOnExecute', {
    get: function () {
      // hack for backward compatibility
      compatMode0_12 = false;
      return 4;
    }
  });

var methods = exports.methods = HTTPParser.methods = [
  'DELETE',
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'CONNECT',
  'OPTIONS',
  'TRACE',
  'COPY',
  'LOCK',
  'MKCOL',
  'MOVE',
  'PROPFIND',
  'PROPPATCH',
  'SEARCH',
  'UNLOCK',
  'BIND',
  'REBIND',
  'UNBIND',
  'ACL',
  'REPORT',
  'MKACTIVITY',
  'CHECKOUT',
  'MERGE',
  'M-SEARCH',
  'NOTIFY',
  'SUBSCRIBE',
  'UNSUBSCRIBE',
  'PATCH',
  'PURGE',
  'MKCALENDAR',
  'LINK',
  'UNLINK'
];
HTTPParser.prototype.reinitialize = HTTPParser;
HTTPParser.prototype.close =
HTTPParser.prototype.pause =
HTTPParser.prototype.resume =
HTTPParser.prototype.free = function () {};
HTTPParser.prototype._compatMode0_11 = false;
HTTPParser.prototype.getAsyncId = function() { return 0; };

var headerState = {
  REQUEST_LINE: true,
  RESPONSE_LINE: true,
  HEADER: true
};
HTTPParser.prototype.execute = function (chunk, start, length) {
  if (!(this instanceof HTTPParser)) {
    throw new TypeError('not a HTTPParser');
  }

  // backward compat to node < 0.11.4
  // Note: the start and length params were removed in newer version
  start = start || 0;
  length = typeof length === 'number' ? length : chunk.length;

  this.chunk = chunk;
  this.offset = start;
  var end = this.end = start + length;
  try {
    while (this.offset < end) {
      if (this[this.state]()) {
        break;
      }
    }
  } catch (err) {
    if (this.isUserCall) {
      throw err;
    }
    this.hadError = true;
    return err;
  }
  this.chunk = null;
  length = this.offset - start;
  if (headerState[this.state]) {
    this.headerSize += length;
    if (this.headerSize > HTTPParser.maxHeaderSize) {
      return new Error('max header size exceeded');
    }
  }
  return length;
};

var stateFinishAllowed = {
  REQUEST_LINE: true,
  RESPONSE_LINE: true,
  BODY_RAW: true
};
HTTPParser.prototype.finish = function () {
  if (this.hadError) {
    return;
  }
  if (!stateFinishAllowed[this.state]) {
    return new Error('invalid state for EOF');
  }
  if (this.state === 'BODY_RAW') {
    this.userCall()(this[kOnMessageComplete]());
  }
};

// These three methods are used for an internal speed optimization, and it also
// works if theses are noops. Basically consume() asks us to read the bytes
// ourselves, but if we don't do it we get them through execute().
HTTPParser.prototype.consume =
HTTPParser.prototype.unconsume =
HTTPParser.prototype.getCurrentBuffer = function () {};

//For correct error handling - see HTTPParser#execute
//Usage: this.userCall()(userFunction('arg'));
HTTPParser.prototype.userCall = function () {
  this.isUserCall = true;
  var self = this;
  return function (ret) {
    self.isUserCall = false;
    return ret;
  };
};

HTTPParser.prototype.nextRequest = function () {
  this.userCall()(this[kOnMessageComplete]());
  this.reinitialize(this.type);
};

HTTPParser.prototype.consumeLine = function () {
  var end = this.end,
      chunk = this.chunk;
  for (var i = this.offset; i < end; i++) {
    if (chunk[i] === 0x0a) { // \n
      var line = this.line + chunk.toString('ascii', this.offset, i);
      if (line.charAt(line.length - 1) === '\r') {
        line = line.substr(0, line.length - 1);
      }
      this.line = '';
      this.offset = i + 1;
      return line;
    }
  }
  //line split over multiple chunks
  this.line += chunk.toString('ascii', this.offset, this.end);
  this.offset = this.end;
};

var headerExp = /^([^: \t]+):[ \t]*((?:.*[^ \t])|)/;
var headerContinueExp = /^[ \t]+(.*[^ \t])/;
HTTPParser.prototype.parseHeader = function (line, headers) {
  if (line.indexOf('\r') !== -1) {
    throw parseErrorCode('HPE_LF_EXPECTED');
  }

  var match = headerExp.exec(line);
  var k = match && match[1];
  if (k) { // skip empty string (malformed header)
    headers.push(k);
    headers.push(match[2]);
  } else {
    var matchContinue = headerContinueExp.exec(line);
    if (matchContinue && headers.length) {
      if (headers[headers.length - 1]) {
        headers[headers.length - 1] += ' ';
      }
      headers[headers.length - 1] += matchContinue[1];
    }
  }
};

var requestExp = /^([A-Z-]+) ([^ ]+) HTTP\/(\d)\.(\d)$/;
HTTPParser.prototype.REQUEST_LINE = function () {
  var line = this.consumeLine();
  if (!line) {
    return;
  }
  var match = requestExp.exec(line);
  if (match === null) {
    throw parseErrorCode('HPE_INVALID_CONSTANT');
  }
  this.info.method = this._compatMode0_11 ? match[1] : methods.indexOf(match[1]);
  if (this.info.method === -1) {
    throw new Error('invalid request method');
  }
  if (match[1] === 'CONNECT') {
    this.info.upgrade = true;
  }
  this.info.url = match[2];
  this.info.versionMajor = +match[3];
  this.info.versionMinor = +match[4];
  this.body_bytes = 0;
  this.state = 'HEADER';
};

var responseExp = /^HTTP\/(\d)\.(\d) (\d{3}) ?(.*)$/;
HTTPParser.prototype.RESPONSE_LINE = function () {
  var line = this.consumeLine();
  if (!line) {
    return;
  }
  var match = responseExp.exec(line);
  if (match === null) {
    throw parseErrorCode('HPE_INVALID_CONSTANT');
  }
  this.info.versionMajor = +match[1];
  this.info.versionMinor = +match[2];
  var statusCode = this.info.statusCode = +match[3];
  this.info.statusMessage = match[4];
  // Implied zero length.
  if ((statusCode / 100 | 0) === 1 || statusCode === 204 || statusCode === 304) {
    this.body_bytes = 0;
  }
  this.state = 'HEADER';
};

HTTPParser.prototype.shouldKeepAlive = function () {
  if (this.info.versionMajor > 0 && this.info.versionMinor > 0) {
    if (this.connection.indexOf('close') !== -1) {
      return false;
    }
  } else if (this.connection.indexOf('keep-alive') === -1) {
    return false;
  }
  if (this.body_bytes !== null || this.isChunked) { // || skipBody
    return true;
  }
  return false;
};

HTTPParser.prototype.HEADER = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  var info = this.info;
  if (line) {
    this.parseHeader(line, info.headers);
  } else {
    var headers = info.headers;
    var hasContentLength = false;
    var currentContentLengthValue;
    for (var i = 0; i < headers.length; i += 2) {
      switch (headers[i].toLowerCase()) {
        case 'transfer-encoding':
          this.isChunked = headers[i + 1].toLowerCase() === 'chunked';
          break;
        case 'content-length':
          currentContentLengthValue = +headers[i + 1];
          if (hasContentLength) {
            // Fix duplicate Content-Length header with same values.
            // Throw error only if values are different.
            // Known issues:
            // https://github.com/request/request/issues/2091#issuecomment-328715113
            // https://github.com/nodejs/node/issues/6517#issuecomment-216263771
            if (currentContentLengthValue !== this.body_bytes) {
              throw parseErrorCode('HPE_UNEXPECTED_CONTENT_LENGTH');
            }
          } else {
            hasContentLength = true;
            this.body_bytes = currentContentLengthValue;
          }
          break;
        case 'connection':
          this.connection += headers[i + 1].toLowerCase();
          break;
        case 'upgrade':
          info.upgrade = true;
          break;
      }
    }

    if (this.isChunked && hasContentLength) {
      throw parseErrorCode('HPE_UNEXPECTED_CONTENT_LENGTH');
    }

    info.shouldKeepAlive = this.shouldKeepAlive();
    //problem which also exists in original node: we should know skipBody before calling onHeadersComplete
    var skipBody;
    if (compatMode0_12) {
      skipBody = this.userCall()(this[kOnHeadersComplete](info));
    } else {
      skipBody = this.userCall()(this[kOnHeadersComplete](info.versionMajor,
          info.versionMinor, info.headers, info.method, info.url, info.statusCode,
          info.statusMessage, info.upgrade, info.shouldKeepAlive));
    }
    if (info.upgrade || skipBody === 2) {
      this.nextRequest();
      return true;
    } else if (this.isChunked && !skipBody) {
      this.state = 'BODY_CHUNKHEAD';
    } else if (skipBody || this.body_bytes === 0) {
      this.nextRequest();
    } else if (this.body_bytes === null) {
      this.state = 'BODY_RAW';
    } else {
      this.state = 'BODY_SIZED';
    }
  }
};

HTTPParser.prototype.BODY_CHUNKHEAD = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  this.body_bytes = parseInt(line, 16);
  if (!this.body_bytes) {
    this.state = 'BODY_CHUNKTRAILERS';
  } else {
    this.state = 'BODY_CHUNK';
  }
};

HTTPParser.prototype.BODY_CHUNK = function () {
  var length = Math.min(this.end - this.offset, this.body_bytes);
  this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  this.offset += length;
  this.body_bytes -= length;
  if (!this.body_bytes) {
    this.state = 'BODY_CHUNKEMPTYLINE';
  }
};

HTTPParser.prototype.BODY_CHUNKEMPTYLINE = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  assert.equal(line, '');
  this.state = 'BODY_CHUNKHEAD';
};

HTTPParser.prototype.BODY_CHUNKTRAILERS = function () {
  var line = this.consumeLine();
  if (line === undefined) {
    return;
  }
  if (line) {
    this.parseHeader(line, this.trailers);
  } else {
    if (this.trailers.length) {
      this.userCall()(this[kOnHeaders](this.trailers, ''));
    }
    this.nextRequest();
  }
};

HTTPParser.prototype.BODY_RAW = function () {
  var length = this.end - this.offset;
  this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  this.offset = this.end;
};

HTTPParser.prototype.BODY_SIZED = function () {
  var length = Math.min(this.end - this.offset, this.body_bytes);
  this.userCall()(this[kOnBody](this.chunk, this.offset, length));
  this.offset += length;
  this.body_bytes -= length;
  if (!this.body_bytes) {
    this.nextRequest();
  }
};

// backward compat to node < 0.11.6
['Headers', 'HeadersComplete', 'Body', 'MessageComplete'].forEach(function (name) {
  var k = HTTPParser['kOn' + name];
  Object.defineProperty(HTTPParser.prototype, 'on' + name, {
    get: function () {
      return this[k];
    },
    set: function (to) {
      // hack for backward compatibility
      this._compatMode0_11 = true;
      return (this[k] = to);
    }
  });
});

function parseErrorCode(code) {
  var err = new Error('Parse Error');
  err.code = code;
  return err;
}


/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer     = __webpack_require__(26).Buffer,
    crypto     = __webpack_require__(7),
    util       = __webpack_require__(18),
    Extensions = __webpack_require__(38),
    Base       = __webpack_require__(25),
    Frame      = __webpack_require__(45),
    Message    = __webpack_require__(46);

var Hybi = function(request, url, options) {
  Base.apply(this, arguments);

  this._extensions     = new Extensions();
  this._stage          = 0;
  this._masking        = this._options.masking;
  this._protocols      = this._options.protocols || [];
  this._requireMasking = this._options.requireMasking;
  this._pingCallbacks  = {};

  if (typeof this._protocols === 'string')
    this._protocols = this._protocols.split(/ *, */);

  if (!this._request) return;

  var protos    = this._request.headers['sec-websocket-protocol'],
      supported = this._protocols;

  if (protos !== undefined) {
    if (typeof protos === 'string') protos = protos.split(/ *, */);
    this.protocol = protos.filter(function(p) { return supported.indexOf(p) >= 0 })[0];
  }

  this.version = 'hybi-' + Hybi.VERSION;
};
util.inherits(Hybi, Base);

Hybi.VERSION = '13';

Hybi.mask = function(payload, mask, offset) {
  if (!mask || mask.length === 0) return payload;
  offset = offset || 0;

  for (var i = 0, n = payload.length - offset; i < n; i++) {
    payload[offset + i] = payload[offset + i] ^ mask[i % 4];
  }
  return payload;
};

Hybi.generateAccept = function(key) {
  var sha1 = crypto.createHash('sha1');
  sha1.update(key + Hybi.GUID);
  return sha1.digest('base64');
};

Hybi.GUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';

var instance = {
  FIN:    0x80,
  MASK:   0x80,
  RSV1:   0x40,
  RSV2:   0x20,
  RSV3:   0x10,
  OPCODE: 0x0F,
  LENGTH: 0x7F,

  OPCODES: {
    continuation: 0,
    text:         1,
    binary:       2,
    close:        8,
    ping:         9,
    pong:         10
  },

  OPCODE_CODES:    [0, 1, 2, 8, 9, 10],
  MESSAGE_OPCODES: [0, 1, 2],
  OPENING_OPCODES: [1, 2],

  ERRORS: {
    normal_closure:       1000,
    going_away:           1001,
    protocol_error:       1002,
    unacceptable:         1003,
    encoding_error:       1007,
    policy_violation:     1008,
    too_large:            1009,
    extension_error:      1010,
    unexpected_condition: 1011
  },

  ERROR_CODES:        [1000, 1001, 1002, 1003, 1007, 1008, 1009, 1010, 1011],
  DEFAULT_ERROR_CODE: 1000,
  MIN_RESERVED_ERROR: 3000,
  MAX_RESERVED_ERROR: 4999,

  // http://www.w3.org/International/questions/qa-forms-utf-8.en.php
  UTF8_MATCH: /^([\x00-\x7F]|[\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|\xED[\x80-\x9F][\x80-\xBF]|\xF0[\x90-\xBF][\x80-\xBF]{2}|[\xF1-\xF3][\x80-\xBF]{3}|\xF4[\x80-\x8F][\x80-\xBF]{2})*$/,

  addExtension: function(extension) {
    this._extensions.add(extension);
    return true;
  },

  parse: function(chunk) {
    this._reader.put(chunk);
    var buffer = true;
    while (buffer) {
      switch (this._stage) {
        case 0:
          buffer = this._reader.read(1);
          if (buffer) this._parseOpcode(buffer[0]);
          break;

        case 1:
          buffer = this._reader.read(1);
          if (buffer) this._parseLength(buffer[0]);
          break;

        case 2:
          buffer = this._reader.read(this._frame.lengthBytes);
          if (buffer) this._parseExtendedLength(buffer);
          break;

        case 3:
          buffer = this._reader.read(4);
          if (buffer) {
            this._stage = 4;
            this._frame.maskingKey = buffer;
          }
          break;

        case 4:
          buffer = this._reader.read(this._frame.length);
          if (buffer) {
            this._stage = 0;
            this._emitFrame(buffer);
          }
          break;

        default:
          buffer = null;
      }
    }
  },

  text: function(message) {
    if (this.readyState > 1) return false;
    return this.frame(message, 'text');
  },

  binary: function(message) {
    if (this.readyState > 1) return false;
    return this.frame(message, 'binary');
  },

  ping: function(message, callback) {
    if (this.readyState > 1) return false;
    message = message || '';
    if (callback) this._pingCallbacks[message] = callback;
    return this.frame(message, 'ping');
  },

  pong: function(message) {
      if (this.readyState > 1) return false;
      message = message ||'';
      return this.frame(message, 'pong');
  },

  close: function(reason, code) {
    reason = reason || '';
    code   = code   || this.ERRORS.normal_closure;

    if (this.readyState <= 0) {
      this.readyState = 3;
      this.emit('close', new Base.CloseEvent(code, reason));
      return true;
    } else if (this.readyState === 1) {
      this.readyState = 2;
      this._extensions.close(function() { this.frame(reason, 'close', code) }, this);
      return true;
    } else {
      return false;
    }
  },

  frame: function(buffer, type, code) {
    if (this.readyState <= 0) return this._queue([buffer, type, code]);
    if (this.readyState > 2) return false;

    if (buffer instanceof Array)    buffer = Buffer.from(buffer);
    if (typeof buffer === 'number') buffer = buffer.toString();

    var message = new Message(),
        isText  = (typeof buffer === 'string'),
        payload, copy;

    message.rsv1   = message.rsv2 = message.rsv3 = false;
    message.opcode = this.OPCODES[type || (isText ? 'text' : 'binary')];

    payload = isText ? Buffer.from(buffer, 'utf8') : buffer;

    if (code) {
      copy = payload;
      payload = Buffer.allocUnsafe(2 + copy.length);
      payload.writeUInt16BE(code, 0);
      copy.copy(payload, 2);
    }
    message.data = payload;

    var onMessageReady = function(message) {
      var frame = new Frame();

      frame.final   = true;
      frame.rsv1    = message.rsv1;
      frame.rsv2    = message.rsv2;
      frame.rsv3    = message.rsv3;
      frame.opcode  = message.opcode;
      frame.masked  = !!this._masking;
      frame.length  = message.data.length;
      frame.payload = message.data;

      if (frame.masked) frame.maskingKey = crypto.randomBytes(4);

      this._sendFrame(frame);
    };

    if (this.MESSAGE_OPCODES.indexOf(message.opcode) >= 0)
      this._extensions.processOutgoingMessage(message, function(error, message) {
        if (error) return this._fail('extension_error', error.message);
        onMessageReady.call(this, message);
      }, this);
    else
      onMessageReady.call(this, message);

    return true;
  },

  _sendFrame: function(frame) {
    var length = frame.length,
        header = (length <= 125) ? 2 : (length <= 65535 ? 4 : 10),
        offset = header + (frame.masked ? 4 : 0),
        buffer = Buffer.allocUnsafe(offset + length),
        masked = frame.masked ? this.MASK : 0;

    buffer[0] = (frame.final ? this.FIN : 0) |
                (frame.rsv1 ? this.RSV1 : 0) |
                (frame.rsv2 ? this.RSV2 : 0) |
                (frame.rsv3 ? this.RSV3 : 0) |
                frame.opcode;

    if (length <= 125) {
      buffer[1] = masked | length;
    } else if (length <= 65535) {
      buffer[1] = masked | 126;
      buffer.writeUInt16BE(length, 2);
    } else {
      buffer[1] = masked | 127;
      buffer.writeUInt32BE(Math.floor(length / 0x100000000), 2);
      buffer.writeUInt32BE(length % 0x100000000, 6);
    }

    frame.payload.copy(buffer, offset);

    if (frame.masked) {
      frame.maskingKey.copy(buffer, header);
      Hybi.mask(buffer, frame.maskingKey, offset);
    }

    this._write(buffer);
  },

  _handshakeResponse: function() {
    var secKey  = this._request.headers['sec-websocket-key'],
        version = this._request.headers['sec-websocket-version'];

    if (version !== Hybi.VERSION)
      throw new Error('Unsupported WebSocket version: ' + version);

    if (typeof secKey !== 'string')
      throw new Error('Missing handshake request header: Sec-WebSocket-Key');

    this._headers.set('Upgrade', 'websocket');
    this._headers.set('Connection', 'Upgrade');
    this._headers.set('Sec-WebSocket-Accept', Hybi.generateAccept(secKey));

    if (this.protocol) this._headers.set('Sec-WebSocket-Protocol', this.protocol);

    var extensions = this._extensions.generateResponse(this._request.headers['sec-websocket-extensions']);
    if (extensions) this._headers.set('Sec-WebSocket-Extensions', extensions);

    var start   = 'HTTP/1.1 101 Switching Protocols',
        headers = [start, this._headers.toString(), ''];

    return Buffer.from(headers.join('\r\n'), 'utf8');
  },

  _shutdown: function(code, reason, error) {
    delete this._frame;
    delete this._message;
    this._stage = 5;

    var sendCloseFrame = (this.readyState === 1);
    this.readyState = 2;

    this._extensions.close(function() {
      if (sendCloseFrame) this.frame(reason, 'close', code);
      this.readyState = 3;
      if (error) this.emit('error', new Error(reason));
      this.emit('close', new Base.CloseEvent(code, reason));
    }, this);
  },

  _fail: function(type, message) {
    if (this.readyState > 1) return;
    this._shutdown(this.ERRORS[type], message, true);
  },

  _parseOpcode: function(octet) {
    var rsvs = [this.RSV1, this.RSV2, this.RSV3].map(function(rsv) {
      return (octet & rsv) === rsv;
    });

    var frame = this._frame = new Frame();

    frame.final  = (octet & this.FIN) === this.FIN;
    frame.rsv1   = rsvs[0];
    frame.rsv2   = rsvs[1];
    frame.rsv3   = rsvs[2];
    frame.opcode = (octet & this.OPCODE);

    this._stage = 1;

    if (!this._extensions.validFrameRsv(frame))
      return this._fail('protocol_error',
          'One or more reserved bits are on: reserved1 = ' + (frame.rsv1 ? 1 : 0) +
          ', reserved2 = ' + (frame.rsv2 ? 1 : 0) +
          ', reserved3 = ' + (frame.rsv3 ? 1 : 0));

    if (this.OPCODE_CODES.indexOf(frame.opcode) < 0)
      return this._fail('protocol_error', 'Unrecognized frame opcode: ' + frame.opcode);

    if (this.MESSAGE_OPCODES.indexOf(frame.opcode) < 0 && !frame.final)
      return this._fail('protocol_error', 'Received fragmented control frame: opcode = ' + frame.opcode);

    if (this._message && this.OPENING_OPCODES.indexOf(frame.opcode) >= 0)
      return this._fail('protocol_error', 'Received new data frame but previous continuous frame is unfinished');
  },

  _parseLength: function(octet) {
    var frame = this._frame;
    frame.masked = (octet & this.MASK) === this.MASK;
    frame.length = (octet & this.LENGTH);

    if (frame.length >= 0 && frame.length <= 125) {
      this._stage = frame.masked ? 3 : 4;
      if (!this._checkFrameLength()) return;
    } else {
      this._stage = 2;
      frame.lengthBytes = (frame.length === 126 ? 2 : 8);
    }

    if (this._requireMasking && !frame.masked)
      return this._fail('unacceptable', 'Received unmasked frame but masking is required');
  },

  _parseExtendedLength: function(buffer) {
    var frame = this._frame;
    frame.length = this._readUInt(buffer);

    this._stage = frame.masked ? 3 : 4;

    if (this.MESSAGE_OPCODES.indexOf(frame.opcode) < 0 && frame.length > 125)
      return this._fail('protocol_error', 'Received control frame having too long payload: ' + frame.length);

    if (!this._checkFrameLength()) return;
  },

  _checkFrameLength: function() {
    var length = this._message ? this._message.length : 0;

    if (length + this._frame.length > this._maxLength) {
      this._fail('too_large', 'WebSocket frame length too large');
      return false;
    } else {
      return true;
    }
  },

  _emitFrame: function(buffer) {
    var frame   = this._frame,
        payload = frame.payload = Hybi.mask(buffer, frame.maskingKey),
        opcode  = frame.opcode,
        message,
        code, reason,
        callbacks, callback;

    delete this._frame;

    if (opcode === this.OPCODES.continuation) {
      if (!this._message) return this._fail('protocol_error', 'Received unexpected continuation frame');
      this._message.pushFrame(frame);
    }

    if (opcode === this.OPCODES.text || opcode === this.OPCODES.binary) {
      this._message = new Message();
      this._message.pushFrame(frame);
    }

    if (frame.final && this.MESSAGE_OPCODES.indexOf(opcode) >= 0)
      return this._emitMessage(this._message);

    if (opcode === this.OPCODES.close) {
      code   = (payload.length >= 2) ? payload.readUInt16BE(0) : null;
      reason = (payload.length > 2) ? this._encode(payload.slice(2)) : null;

      if (!(payload.length === 0) &&
          !(code !== null && code >= this.MIN_RESERVED_ERROR && code <= this.MAX_RESERVED_ERROR) &&
          this.ERROR_CODES.indexOf(code) < 0)
        code = this.ERRORS.protocol_error;

      if (payload.length > 125 || (payload.length > 2 && !reason))
        code = this.ERRORS.protocol_error;

      this._shutdown(code || this.DEFAULT_ERROR_CODE, reason || '');
    }

    if (opcode === this.OPCODES.ping) {
      this.frame(payload, 'pong');
      this.emit('ping', new Base.PingEvent(payload.toString()))
    }

    if (opcode === this.OPCODES.pong) {
      callbacks = this._pingCallbacks;
      message   = this._encode(payload);
      callback  = callbacks[message];

      delete callbacks[message];
      if (callback) callback()

      this.emit('pong', new Base.PongEvent(payload.toString()))
    }
  },

  _emitMessage: function(message) {
    var message = this._message;
    message.read();

    delete this._message;

    this._extensions.processIncomingMessage(message, function(error, message) {
      if (error) return this._fail('extension_error', error.message);

      var payload = message.data;
      if (message.opcode === this.OPCODES.text) payload = this._encode(payload);

      if (payload === null)
        return this._fail('encoding_error', 'Could not decode a text frame as UTF-8');
      else
        this.emit('message', new Base.MessageEvent(payload));
    }, this);
  },

  _encode: function(buffer) {
    try {
      var string = buffer.toString('binary', 0, buffer.length);
      if (!this.UTF8_MATCH.test(string)) return null;
    } catch (e) {}
    return buffer.toString('utf8', 0, buffer.length);
  },

  _readUInt: function(buffer) {
    if (buffer.length === 2) return buffer.readUInt16BE(0);

    return buffer.readUInt32BE(0) * 0x100000000 +
           buffer.readUInt32BE(4);
  }
};

for (var key in instance)
  Hybi.prototype[key] = instance[key];

module.exports = Hybi;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Parser   = __webpack_require__(39),
    Pipeline = __webpack_require__(40);

var Extensions = function() {
  this._rsv1 = this._rsv2 = this._rsv3 = null;

  this._byName   = {};
  this._inOrder  = [];
  this._sessions = [];
  this._index    = {};
};

Extensions.MESSAGE_OPCODES = [1, 2];

var instance = {
  add: function(ext) {
    if (typeof ext.name !== 'string') throw new TypeError('extension.name must be a string');
    if (ext.type !== 'permessage') throw new TypeError('extension.type must be "permessage"');

    if (typeof ext.rsv1 !== 'boolean') throw new TypeError('extension.rsv1 must be true or false');
    if (typeof ext.rsv2 !== 'boolean') throw new TypeError('extension.rsv2 must be true or false');
    if (typeof ext.rsv3 !== 'boolean') throw new TypeError('extension.rsv3 must be true or false');

    if (this._byName.hasOwnProperty(ext.name))
      throw new TypeError('An extension with name "' + ext.name + '" is already registered');

    this._byName[ext.name] = ext;
    this._inOrder.push(ext);
  },

  generateOffer: function() {
    var sessions = [],
        offer    = [],
        index    = {};

    this._inOrder.forEach(function(ext) {
      var session = ext.createClientSession();
      if (!session) return;

      var record = [ext, session];
      sessions.push(record);
      index[ext.name] = record;

      var offers = session.generateOffer();
      offers = offers ? [].concat(offers) : [];

      offers.forEach(function(off) {
        offer.push(Parser.serializeParams(ext.name, off));
      }, this);
    }, this);

    this._sessions = sessions;
    this._index    = index;

    return offer.length > 0 ? offer.join(', ') : null;
  },

  activate: function(header) {
    var responses = Parser.parseHeader(header),
        sessions  = [];

    responses.eachOffer(function(name, params) {
      var record = this._index[name];

      if (!record)
        throw new Error('Server sent an extension response for unknown extension "' + name + '"');

      var ext      = record[0],
          session  = record[1],
          reserved = this._reserved(ext);

      if (reserved)
        throw new Error('Server sent two extension responses that use the RSV' +
                        reserved[0] + ' bit: "' +
                        reserved[1] + '" and "' + ext.name + '"');

      if (session.activate(params) !== true)
        throw new Error('Server sent unacceptable extension parameters: ' +
                        Parser.serializeParams(name, params));

      this._reserve(ext);
      sessions.push(record);
    }, this);

    this._sessions = sessions;
    this._pipeline = new Pipeline(sessions);
  },

  generateResponse: function(header) {
    var sessions = [],
        response = [],
        offers   = Parser.parseHeader(header);

    this._inOrder.forEach(function(ext) {
      var offer = offers.byName(ext.name);
      if (offer.length === 0 || this._reserved(ext)) return;

      var session = ext.createServerSession(offer);
      if (!session) return;

      this._reserve(ext);
      sessions.push([ext, session]);
      response.push(Parser.serializeParams(ext.name, session.generateResponse()));
    }, this);

    this._sessions = sessions;
    this._pipeline = new Pipeline(sessions);

    return response.length > 0 ? response.join(', ') : null;
  },

  validFrameRsv: function(frame) {
    var allowed = {rsv1: false, rsv2: false, rsv3: false},
        ext;

    if (Extensions.MESSAGE_OPCODES.indexOf(frame.opcode) >= 0) {
      for (var i = 0, n = this._sessions.length; i < n; i++) {
        ext = this._sessions[i][0];
        allowed.rsv1 = allowed.rsv1 || ext.rsv1;
        allowed.rsv2 = allowed.rsv2 || ext.rsv2;
        allowed.rsv3 = allowed.rsv3 || ext.rsv3;
      }
    }

    return (allowed.rsv1 || !frame.rsv1) &&
           (allowed.rsv2 || !frame.rsv2) &&
           (allowed.rsv3 || !frame.rsv3);
  },

  processIncomingMessage: function(message, callback, context) {
    this._pipeline.processIncomingMessage(message, callback, context);
  },

  processOutgoingMessage: function(message, callback, context) {
    this._pipeline.processOutgoingMessage(message, callback, context);
  },

  close: function(callback, context) {
    if (!this._pipeline) return callback.call(context);
    this._pipeline.close(callback, context);
  },

  _reserve: function(ext) {
    this._rsv1 = this._rsv1 || (ext.rsv1 && ext.name);
    this._rsv2 = this._rsv2 || (ext.rsv2 && ext.name);
    this._rsv3 = this._rsv3 || (ext.rsv3 && ext.name);
  },

  _reserved: function(ext) {
    if (this._rsv1 && ext.rsv1) return [1, this._rsv1];
    if (this._rsv2 && ext.rsv2) return [2, this._rsv2];
    if (this._rsv3 && ext.rsv3) return [3, this._rsv3];
    return false;
  }
};

for (var key in instance)
  Extensions.prototype[key] = instance[key];

module.exports = Extensions;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TOKEN    = /([!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z]+)/,
    NOTOKEN  = /([^!#\$%&'\*\+\-\.\^_`\|~0-9A-Za-z])/g,
    QUOTED   = /"((?:\\[\x00-\x7f]|[^\x00-\x08\x0a-\x1f\x7f"])*)"/,
    PARAM    = new RegExp(TOKEN.source + '(?:=(?:' + TOKEN.source + '|' + QUOTED.source + '))?'),
    EXT      = new RegExp(TOKEN.source + '(?: *; *' + PARAM.source + ')*', 'g'),
    EXT_LIST = new RegExp('^' + EXT.source + '(?: *, *' + EXT.source + ')*$'),
    NUMBER   = /^-?(0|[1-9][0-9]*)(\.[0-9]+)?$/;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var Parser = {
  parseHeader: function(header) {
    var offers = new Offers();
    if (header === '' || header === undefined) return offers;

    if (!EXT_LIST.test(header))
      throw new SyntaxError('Invalid Sec-WebSocket-Extensions header: ' + header);

    var values = header.match(EXT);

    values.forEach(function(value) {
      var params = value.match(new RegExp(PARAM.source, 'g')),
          name   = params.shift(),
          offer  = {};

      params.forEach(function(param) {
        var args = param.match(PARAM), key = args[1], data;

        if (args[2] !== undefined) {
          data = args[2];
        } else if (args[3] !== undefined) {
          data = args[3].replace(/\\/g, '');
        } else {
          data = true;
        }
        if (NUMBER.test(data)) data = parseFloat(data);

        if (hasOwnProperty.call(offer, key)) {
          offer[key] = [].concat(offer[key]);
          offer[key].push(data);
        } else {
          offer[key] = data;
        }
      }, this);
      offers.push(name, offer);
    }, this);

    return offers;
  },

  serializeParams: function(name, params) {
    var values = [];

    var print = function(key, value) {
      if (value instanceof Array) {
        value.forEach(function(v) { print(key, v) });
      } else if (value === true) {
        values.push(key);
      } else if (typeof value === 'number') {
        values.push(key + '=' + value);
      } else if (NOTOKEN.test(value)) {
        values.push(key + '="' + value.replace(/"/g, '\\"') + '"');
      } else {
        values.push(key + '=' + value);
      }
    };

    for (var key in params) print(key, params[key]);

    return [name].concat(values).join('; ');
  }
};

var Offers = function() {
  this._byName  = {};
  this._inOrder = [];
};

Offers.prototype.push = function(name, params) {
  if (!hasOwnProperty.call(this._byName, name))
    this._byName[name] = [];

  this._byName[name].push(params);
  this._inOrder.push({name: name, params: params});
};

Offers.prototype.eachOffer = function(callback, context) {
  var list = this._inOrder;
  for (var i = 0, n = list.length; i < n; i++)
    callback.call(context, list[i].name, list[i].params);
};

Offers.prototype.byName = function(name) {
  return this._byName[name] || [];
};

Offers.prototype.toArray = function() {
  return this._inOrder.slice();
};

module.exports = Parser;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cell   = __webpack_require__(41),
    Pledge = __webpack_require__(44);

var Pipeline = function(sessions) {
  this._cells   = sessions.map(function(session) { return new Cell(session) });
  this._stopped = {incoming: false, outgoing: false};
};

Pipeline.prototype.processIncomingMessage = function(message, callback, context) {
  if (this._stopped.incoming) return;
  this._loop('incoming', this._cells.length - 1, -1, -1, message, callback, context);
};

Pipeline.prototype.processOutgoingMessage = function(message, callback, context) {
  if (this._stopped.outgoing) return;
  this._loop('outgoing', 0, this._cells.length, 1, message, callback, context);
};

Pipeline.prototype.close = function(callback, context) {
  this._stopped = {incoming: true, outgoing: true};

  var closed = this._cells.map(function(a) { return a.close() });
  if (callback)
    Pledge.all(closed).then(function() { callback.call(context) });
};

Pipeline.prototype._loop = function(direction, start, end, step, message, callback, context) {
  var cells = this._cells,
      n     = cells.length,
      self  = this;

  while (n--) cells[n].pending(direction);

  var pipe = function(index, error, msg) {
    if (index === end) return callback.call(context, error, msg);

    cells[index][direction](error, msg, function(err, m) {
      if (err) self._stopped[direction] = true;
      pipe(index + step, err, m);
    });
  };
  pipe(start, null, message);
};

module.exports = Pipeline;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Functor = __webpack_require__(42),
    Pledge  = __webpack_require__(44);

var Cell = function(tuple) {
  this._ext     = tuple[0];
  this._session = tuple[1];

  this._functors = {
    incoming: new Functor(this._session, 'processIncomingMessage'),
    outgoing: new Functor(this._session, 'processOutgoingMessage')
  };
};

Cell.prototype.pending = function(direction) {
  var functor = this._functors[direction];
  if (!functor._stopped) functor.pending += 1;
};

Cell.prototype.incoming = function(error, message, callback, context) {
  this._exec('incoming', error, message, callback, context);
};

Cell.prototype.outgoing = function(error, message, callback, context) {
  this._exec('outgoing', error, message, callback, context);
};

Cell.prototype.close = function() {
  this._closed = this._closed || new Pledge();
  this._doClose();
  return this._closed;
};

Cell.prototype._exec = function(direction, error, message, callback, context) {
  this._functors[direction].call(error, message, function(err, msg) {
    if (err) err.message = this._ext.name + ': ' + err.message;
    callback.call(context, err, msg);
    this._doClose();
  }, this);
};

Cell.prototype._doClose = function() {
  var fin  = this._functors.incoming,
      fout = this._functors.outgoing;

  if (!this._closed || fin.pending + fout.pending !== 0) return;
  if (this._session) this._session.close();
  this._session = null;
  this._closed.done();
};

module.exports = Cell;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RingBuffer = __webpack_require__(43);

var Functor = function(session, method) {
  this._session = session;
  this._method  = method;
  this._queue   = new RingBuffer(Functor.QUEUE_SIZE);
  this._stopped = false;
  this.pending  = 0;
};

Functor.QUEUE_SIZE = 8;

Functor.prototype.call = function(error, message, callback, context) {
  if (this._stopped) return;

  var record = {error: error, message: message, callback: callback, context: context, done: false},
      called = false,
      self   = this;

  this._queue.push(record);

  if (record.error) {
    record.done = true;
    this._stop();
    return this._flushQueue();
  }

  var handler = function(err, msg) {
    if (!(called ^ (called = true))) return;

    if (err) {
      self._stop();
      record.error   = err;
      record.message = null;
    } else {
      record.message = msg;
    }

    record.done = true;
    self._flushQueue();
  };

  try {
    this._session[this._method](message, handler);
  } catch (err) {
    handler(err);
  }
};

Functor.prototype._stop = function() {
  this.pending  = this._queue.length;
  this._stopped = true;
};

Functor.prototype._flushQueue = function() {
  var queue = this._queue, record;

  while (queue.length > 0 && queue.peek().done) {
    record = queue.shift();
    if (record.error) {
      this.pending = 0;
      queue.clear();
    } else {
      this.pending -= 1;
    }
    record.callback.call(record.context, record.error, record.message);
  }
};

module.exports = Functor;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RingBuffer = function(bufferSize) {
  this._bufferSize = bufferSize;
  this.clear();
};

RingBuffer.prototype.clear = function() {
  this._buffer     = new Array(this._bufferSize);
  this._ringOffset = 0;
  this._ringSize   = this._bufferSize;
  this._head       = 0;
  this._tail       = 0;
  this.length      = 0;
};

RingBuffer.prototype.push = function(value) {
  var expandBuffer = false,
      expandRing   = false;

  if (this._ringSize < this._bufferSize) {
    expandBuffer = (this._tail === 0);
  } else if (this._ringOffset === this._ringSize) {
    expandBuffer = true;
    expandRing   = (this._tail === 0);
  }

  if (expandBuffer) {
    this._tail       = this._bufferSize;
    this._buffer     = this._buffer.concat(new Array(this._bufferSize));
    this._bufferSize = this._buffer.length;

    if (expandRing)
      this._ringSize = this._bufferSize;
  }

  this._buffer[this._tail] = value;
  this.length += 1;
  if (this._tail < this._ringSize) this._ringOffset += 1;
  this._tail = (this._tail + 1) % this._bufferSize;
};

RingBuffer.prototype.peek = function() {
  if (this.length === 0) return void 0;
  return this._buffer[this._head];
};

RingBuffer.prototype.shift = function() {
  if (this.length === 0) return void 0;

  var value = this._buffer[this._head];
  this._buffer[this._head] = void 0;
  this.length -= 1;
  this._ringOffset -= 1;

  if (this._ringOffset === 0 && this.length > 0) {
    this._head       = this._ringSize;
    this._ringOffset = this.length;
    this._ringSize   = this._bufferSize;
  } else {
    this._head = (this._head + 1) % this._ringSize;
  }
  return value;
};

module.exports = RingBuffer;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var RingBuffer = __webpack_require__(43);

var Pledge = function() {
  this._complete  = false;
  this._callbacks = new RingBuffer(Pledge.QUEUE_SIZE);
};

Pledge.QUEUE_SIZE = 4;

Pledge.all = function(list) {
  var pledge  = new Pledge(),
      pending = list.length,
      n       = pending;

  if (pending === 0) pledge.done();

  while (n--) list[n].then(function() {
    pending -= 1;
    if (pending === 0) pledge.done();
  });
  return pledge;
};

Pledge.prototype.then = function(callback) {
  if (this._complete) callback();
  else this._callbacks.push(callback);
};

Pledge.prototype.done = function() {
  this._complete = true;
  var callbacks = this._callbacks, callback;
  while (callback = callbacks.shift()) callback();
};

module.exports = Pledge;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Frame = function() {};

var instance = {
  final:        false,
  rsv1:         false,
  rsv2:         false,
  rsv3:         false,
  opcode:       null,
  masked:       false,
  maskingKey:   null,
  lengthBytes:  1,
  length:       0,
  payload:      null
};

for (var key in instance)
  Frame.prototype[key] = instance[key];

module.exports = Frame;


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(26).Buffer;

var Message = function() {
  this.rsv1    = false;
  this.rsv2    = false;
  this.rsv3    = false;
  this.opcode  = null;
  this.length  = 0;
  this._chunks = [];
};

var instance = {
  read: function() {
    return this.data = this.data || Buffer.concat(this._chunks, this.length);
  },

  pushFrame: function(frame) {
    this.rsv1 = this.rsv1 || frame.rsv1;
    this.rsv2 = this.rsv2 || frame.rsv2;
    this.rsv3 = this.rsv3 || frame.rsv3;

    if (this.opcode === null) this.opcode = frame.opcode;

    this._chunks.push(frame.payload);
    this.length += frame.length;
  }
};

for (var key in instance)
  Message.prototype[key] = instance[key];

module.exports = Message;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer     = __webpack_require__(26).Buffer,
    Stream     = __webpack_require__(29).Stream,
    url        = __webpack_require__(33),
    util       = __webpack_require__(18),
    Base       = __webpack_require__(25),
    Headers    = __webpack_require__(30),
    HttpParser = __webpack_require__(34);

var PORTS = { 'ws:': 80, 'wss:': 443 };

var Proxy = function(client, origin, options) {
  this._client  = client;
  this._http    = new HttpParser('response');
  this._origin  = (typeof client.url === 'object') ? client.url : url.parse(client.url);
  this._url     = (typeof origin === 'object') ? origin : url.parse(origin);
  this._options = options || {};
  this._state   = 0;

  this.readable = this.writable = true;
  this._paused  = false;

  this._headers = new Headers();
  this._headers.set('Host', this._origin.host);
  this._headers.set('Connection', 'keep-alive');
  this._headers.set('Proxy-Connection', 'keep-alive');

  var auth = this._url.auth && Buffer.from(this._url.auth, 'utf8').toString('base64');
  if (auth) this._headers.set('Proxy-Authorization', 'Basic ' + auth);
};
util.inherits(Proxy, Stream);

var instance = {
  setHeader: function(name, value) {
    if (this._state !== 0) return false;
    this._headers.set(name, value);
    return true;
  },

  start: function() {
    if (this._state !== 0) return false;
    this._state = 1;

    var origin = this._origin,
        port   = origin.port || PORTS[origin.protocol],
        start  = 'CONNECT ' + origin.hostname + ':' + port + ' HTTP/1.1';

    var headers = [start, this._headers.toString(), ''];

    this.emit('data', Buffer.from(headers.join('\r\n'), 'utf8'));
    return true;
  },

  pause: function() {
    this._paused = true;
  },

  resume: function() {
    this._paused = false;
    this.emit('drain');
  },

  write: function(chunk) {
    if (!this.writable) return false;

    this._http.parse(chunk);
    if (!this._http.isComplete()) return !this._paused;

    this.statusCode = this._http.statusCode;
    this.headers    = this._http.headers;

    if (this.statusCode === 200) {
      this.emit('connect', new Base.ConnectEvent());
    } else {
      var message = "Can't establish a connection to the server at " + this._origin.href;
      this.emit('error', new Error(message));
    }
    this.end();
    return !this._paused;
  },

  end: function(chunk) {
    if (!this.writable) return;
    if (chunk !== undefined) this.write(chunk);
    this.readable = this.writable = false;
    this.emit('close');
    this.emit('end');
  },

  destroy: function() {
    this.end();
  }
};

for (var key in instance)
  Proxy.prototype[key] = instance[key];

module.exports = Proxy;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util       = __webpack_require__(18),
    HttpParser = __webpack_require__(34),
    Base       = __webpack_require__(25),
    Draft75    = __webpack_require__(49),
    Draft76    = __webpack_require__(50),
    Hybi       = __webpack_require__(37);

var Server = function(options) {
  Base.call(this, null, null, options);
  this._http = new HttpParser('request');
};
util.inherits(Server, Base);

var instance = {
  EVENTS: ['open', 'message', 'error', 'close'],

  _bindEventListeners: function() {
    this.messages.on('error', function() {});
    this.on('error', function() {});
  },

  parse: function(chunk) {
    if (this._delegate) return this._delegate.parse(chunk);

    this._http.parse(chunk);
    if (!this._http.isComplete()) return;

    this.method  = this._http.method;
    this.url     = this._http.url;
    this.headers = this._http.headers;
    this.body    = this._http.body;

    var self = this;
    this._delegate = Server.http(this, this._options);
    this._delegate.messages = this.messages;
    this._delegate.io = this.io;
    this._open();

    this.EVENTS.forEach(function(event) {
      this._delegate.on(event, function(e) { self.emit(event, e) });
    }, this);

    this.protocol = this._delegate.protocol;
    this.version  = this._delegate.version;

    this.parse(this._http.body);
    this.emit('connect', new Base.ConnectEvent());
  },

  _open: function() {
    this.__queue.forEach(function(msg) {
      this._delegate[msg[0]].apply(this._delegate, msg[1]);
    }, this);
    this.__queue = [];
  }
};

['addExtension', 'setHeader', 'start', 'frame', 'text', 'binary', 'ping', 'close'].forEach(function(method) {
  instance[method] = function() {
    if (this._delegate) {
      return this._delegate[method].apply(this._delegate, arguments);
    } else {
      this.__queue.push([method, arguments]);
      return true;
    }
  };
});

for (var key in instance)
  Server.prototype[key] = instance[key];

Server.isSecureRequest = function(request) {
  if (request.connection && request.connection.authorized !== undefined) return true;
  if (request.socket && request.socket.secure) return true;

  var headers = request.headers;
  if (!headers) return false;
  if (headers['https'] === 'on') return true;
  if (headers['x-forwarded-ssl'] === 'on') return true;
  if (headers['x-forwarded-scheme'] === 'https') return true;
  if (headers['x-forwarded-proto'] === 'https') return true;

  return false;
};

Server.determineUrl = function(request) {
  var scheme = this.isSecureRequest(request) ? 'wss:' : 'ws:';
  return scheme + '//' + request.headers.host + request.url;
};

Server.http = function(request, options) {
  options = options || {};
  if (options.requireMasking === undefined) options.requireMasking = true;

  var headers = request.headers,
      version = headers['sec-websocket-version'],
      key     = headers['sec-websocket-key'],
      key1    = headers['sec-websocket-key1'],
      key2    = headers['sec-websocket-key2'],
      url     = this.determineUrl(request);

  if (version || key)
    return new Hybi(request, url, options);
  else if (key1 || key2)
    return new Draft76(request, url, options);
  else
    return new Draft75(request, url, options);
};

module.exports = Server;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(26).Buffer,
    Base   = __webpack_require__(25),
    util   = __webpack_require__(18);

var Draft75 = function(request, url, options) {
  Base.apply(this, arguments);
  this._stage  = 0;
  this.version = 'hixie-75';

  this._headers.set('Upgrade', 'WebSocket');
  this._headers.set('Connection', 'Upgrade');
  this._headers.set('WebSocket-Origin', this._request.headers.origin);
  this._headers.set('WebSocket-Location', this.url);
};
util.inherits(Draft75, Base);

var instance = {
  close: function() {
    if (this.readyState === 3) return false;
    this.readyState = 3;
    this.emit('close', new Base.CloseEvent(null, null));
    return true;
  },

  parse: function(chunk) {
    if (this.readyState > 1) return;

    this._reader.put(chunk);

    this._reader.eachByte(function(octet) {
      var message;

      switch (this._stage) {
        case -1:
          this._body.push(octet);
          this._sendHandshakeBody();
          break;

        case 0:
          this._parseLeadingByte(octet);
          break;

        case 1:
          this._length = (octet & 0x7F) + 128 * this._length;

          if (this._closing && this._length === 0) {
            return this.close();
          }
          else if ((octet & 0x80) !== 0x80) {
            if (this._length === 0) {
              this._stage = 0;
            }
            else {
              this._skipped = 0;
              this._stage   = 2;
            }
          }
          break;

        case 2:
          if (octet === 0xFF) {
            this._stage = 0;
            message = Buffer.from(this._buffer).toString('utf8', 0, this._buffer.length);
            this.emit('message', new Base.MessageEvent(message));
          }
          else {
            if (this._length) {
              this._skipped += 1;
              if (this._skipped === this._length)
                this._stage = 0;
            } else {
              this._buffer.push(octet);
              if (this._buffer.length > this._maxLength) return this.close();
            }
          }
          break;
      }
    }, this);
  },

  frame: function(buffer) {
    if (this.readyState === 0) return this._queue([buffer]);
    if (this.readyState > 1) return false;

    if (typeof buffer !== 'string') buffer = buffer.toString();

    var length = Buffer.byteLength(buffer),
        frame  = Buffer.allocUnsafe(length + 2);

    frame[0] = 0x00;
    frame.write(buffer, 1);
    frame[frame.length - 1] = 0xFF;

    this._write(frame);
    return true;
  },

  _handshakeResponse: function() {
    var start   = 'HTTP/1.1 101 Web Socket Protocol Handshake',
        headers = [start, this._headers.toString(), ''];

    return Buffer.from(headers.join('\r\n'), 'utf8');
  },

  _parseLeadingByte: function(octet) {
    if ((octet & 0x80) === 0x80) {
      this._length = 0;
      this._stage  = 1;
    } else {
      delete this._length;
      delete this._skipped;
      this._buffer = [];
      this._stage  = 2;
    }
  }
};

for (var key in instance)
  Draft75.prototype[key] = instance[key];

module.exports = Draft75;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer  = __webpack_require__(26).Buffer,
    Base    = __webpack_require__(25),
    Draft75 = __webpack_require__(49),
    crypto  = __webpack_require__(7),
    util    = __webpack_require__(18);


var numberFromKey = function(key) {
  return parseInt((key.match(/[0-9]/g) || []).join(''), 10);
};

var spacesInKey = function(key) {
  return (key.match(/ /g) || []).length;
};


var Draft76 = function(request, url, options) {
  Draft75.apply(this, arguments);
  this._stage  = -1;
  this._body   = [];
  this.version = 'hixie-76';

  this._headers.clear();

  this._headers.set('Upgrade', 'WebSocket');
  this._headers.set('Connection', 'Upgrade');
  this._headers.set('Sec-WebSocket-Origin', this._request.headers.origin);
  this._headers.set('Sec-WebSocket-Location', this.url);
};
util.inherits(Draft76, Draft75);

var instance = {
  BODY_SIZE: 8,

  start: function() {
    if (!Draft75.prototype.start.call(this)) return false;
    this._started = true;
    this._sendHandshakeBody();
    return true;
  },

  close: function() {
    if (this.readyState === 3) return false;
    if (this.readyState === 1) this._write(Buffer.from([0xFF, 0x00]));
    this.readyState = 3;
    this.emit('close', new Base.CloseEvent(null, null));
    return true;
  },

  _handshakeResponse: function() {
    var headers = this._request.headers,
        key1    = headers['sec-websocket-key1'],
        key2    = headers['sec-websocket-key2'];

    if (!key1) throw new Error('Missing required header: Sec-WebSocket-Key1');
    if (!key2) throw new Error('Missing required header: Sec-WebSocket-Key2');

    var number1 = numberFromKey(key1),
        spaces1 = spacesInKey(key1),

        number2 = numberFromKey(key2),
        spaces2 = spacesInKey(key2);

    if (number1 % spaces1 !== 0 || number2 % spaces2 !== 0)
      throw new Error('Client sent invalid Sec-WebSocket-Key headers');

    this._keyValues = [number1 / spaces1, number2 / spaces2];

    var start   = 'HTTP/1.1 101 WebSocket Protocol Handshake',
        headers = [start, this._headers.toString(), ''];

    return Buffer.from(headers.join('\r\n'), 'binary');
  },

  _handshakeSignature: function() {
    if (this._body.length < this.BODY_SIZE) return null;

    var md5    = crypto.createHash('md5'),
        buffer = Buffer.allocUnsafe(8 + this.BODY_SIZE);

    buffer.writeUInt32BE(this._keyValues[0], 0);
    buffer.writeUInt32BE(this._keyValues[1], 4);
    Buffer.from(this._body).copy(buffer, 8, 0, this.BODY_SIZE);

    md5.update(buffer);
    return Buffer.from(md5.digest('binary'), 'binary');
  },

  _sendHandshakeBody: function() {
    if (!this._started) return;
    var signature = this._handshakeSignature();
    if (!signature) return;

    this._write(signature);
    this._stage = 0;
    this._open();

    if (this._body.length > this.BODY_SIZE)
      this.parse(this._body.slice(this.BODY_SIZE));
  },

  _parseLeadingByte: function(octet) {
    if (octet !== 0xFF)
      return Draft75.prototype._parseLeadingByte.call(this, octet);

    this._closing = true;
    this._length  = 0;
    this._stage   = 1;
  }
};

for (var key in instance)
  Draft76.prototype[key] = instance[key];

module.exports = Draft76;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stream      = __webpack_require__(29).Stream,
    util        = __webpack_require__(18),
    driver      = __webpack_require__(24),
    EventTarget = __webpack_require__(52),
    Event       = __webpack_require__(53);

var API = function(options) {
  options = options || {};
  driver.validateOptions(options, ['headers', 'extensions', 'maxLength', 'ping', 'proxy', 'tls', 'ca']);

  this.readable = this.writable = true;

  var headers = options.headers;
  if (headers) {
    for (var name in headers) this._driver.setHeader(name, headers[name]);
  }

  var extensions = options.extensions;
  if (extensions) {
    [].concat(extensions).forEach(this._driver.addExtension, this._driver);
  }

  this._ping          = options.ping;
  this._pingId        = 0;
  this.readyState     = API.CONNECTING;
  this.bufferedAmount = 0;
  this.protocol       = '';
  this.url            = this._driver.url;
  this.version        = this._driver.version;

  var self = this;

  this._driver.on('open',    function(e) { self._open() });
  this._driver.on('message', function(e) { self._receiveMessage(e.data) });
  this._driver.on('close',   function(e) { self._beginClose(e.reason, e.code) });

  this._driver.on('error', function(error) {
    self._emitError(error.message);
  });
  this.on('error', function() {});

  this._driver.messages.on('drain', function() {
    self.emit('drain');
  });

  if (this._ping)
    this._pingTimer = setInterval(function() {
      self._pingId += 1;
      self.ping(self._pingId.toString());
    }, this._ping * 1000);

  this._configureStream();

  if (!this._proxy) {
    this._stream.pipe(this._driver.io);
    this._driver.io.pipe(this._stream);
  }
};
util.inherits(API, Stream);

API.CONNECTING = 0;
API.OPEN       = 1;
API.CLOSING    = 2;
API.CLOSED     = 3;

API.CLOSE_TIMEOUT = 30000;

var instance = {
  write: function(data) {
    return this.send(data);
  },

  end: function(data) {
    if (data !== undefined) this.send(data);
    this.close();
  },

  pause: function() {
    return this._driver.messages.pause();
  },

  resume: function() {
    return this._driver.messages.resume();
  },

  send: function(data) {
    if (this.readyState > API.OPEN) return false;
    if (!(data instanceof Buffer)) data = String(data);
    return this._driver.messages.write(data);
  },

  ping: function(message, callback) {
    if (this.readyState > API.OPEN) return false;
    return this._driver.ping(message, callback);
  },

  close: function(code, reason) {
    if (code === undefined) code = 1000;
    if (reason === undefined) reason = '';

    if (code !== 1000 && (code < 3000 || code > 4999))
      throw new Error("Failed to execute 'close' on WebSocket: " +
                      "The code must be either 1000, or between 3000 and 4999. " +
                      code + " is neither.");

    if (this.readyState !== API.CLOSED) this.readyState = API.CLOSING;
    var self = this;

    this._closeTimer = setTimeout(function() {
      self._beginClose('', 1006);
    }, API.CLOSE_TIMEOUT);

    this._driver.close(reason, code);
  },

  _configureStream: function() {
    var self = this;

    this._stream.setTimeout(0);
    this._stream.setNoDelay(true);

    ['close', 'end'].forEach(function(event) {
      this._stream.on(event, function() { self._finalizeClose() });
    }, this);

    this._stream.on('error', function(error) {
      self._emitError('Network error: ' + self.url + ': ' + error.message);
      self._finalizeClose();
    });
  },

  _open: function() {
    if (this.readyState !== API.CONNECTING) return;

    this.readyState = API.OPEN;
    this.protocol = this._driver.protocol || '';

    var event = new Event('open');
    event.initEvent('open', false, false);
    this.dispatchEvent(event);
  },

  _receiveMessage: function(data) {
    if (this.readyState > API.OPEN) return false;

    if (this.readable) this.emit('data', data);

    var event = new Event('message', {data: data});
    event.initEvent('message', false, false);
    this.dispatchEvent(event);
  },

  _emitError: function(message) {
    if (this.readyState >= API.CLOSING) return;

    var event = new Event('error', {message: message});
    event.initEvent('error', false, false);
    this.dispatchEvent(event);
  },

  _beginClose: function(reason, code) {
    if (this.readyState === API.CLOSED) return;
    this.readyState = API.CLOSING;
    this._closeParams = [reason, code];

    if (this._stream) {
      this._stream.destroy();
      if (!this._stream.readable) this._finalizeClose();
    }
  },

  _finalizeClose: function() {
    if (this.readyState === API.CLOSED) return;
    this.readyState = API.CLOSED;

    if (this._closeTimer) clearTimeout(this._closeTimer);
    if (this._pingTimer) clearInterval(this._pingTimer);
    if (this._stream) this._stream.end();

    if (this.readable) this.emit('end');
    this.readable = this.writable = false;

    var reason = this._closeParams ? this._closeParams[0] : '',
        code   = this._closeParams ? this._closeParams[1] : 1006;

    var event = new Event('close', {code: code, reason: reason});
    event.initEvent('close', false, false);
    this.dispatchEvent(event);
  }
};

for (var method in instance) API.prototype[method] = instance[method];
for (var key in EventTarget) API.prototype[key] = EventTarget[key];

module.exports = API;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Event = __webpack_require__(53);

var EventTarget = {
  onopen:     null,
  onmessage:  null,
  onerror:    null,
  onclose:    null,

  addEventListener: function(eventType, listener, useCapture) {
    this.on(eventType, listener);
  },

  removeEventListener: function(eventType, listener, useCapture) {
    this.removeListener(eventType, listener);
  },

  dispatchEvent: function(event) {
    event.target = event.currentTarget = this;
    event.eventPhase = Event.AT_TARGET;

    if (this['on' + event.type])
      this['on' + event.type](event);

    this.emit(event.type, event);
  }
};

module.exports = EventTarget;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Event = function(eventType, options) {
  this.type = eventType;
  for (var key in options)
    this[key] = options[key];
};

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type       = eventType;
  this.bubbles    = canBubble;
  this.cancelable = cancelable;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault  = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET       = 2;
Event.BUBBLING_PHASE  = 3;

module.exports = Event;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util   = __webpack_require__(18),
    net    = __webpack_require__(55),
    tls    = __webpack_require__(56),
    url    = __webpack_require__(33),
    driver = __webpack_require__(24),
    API    = __webpack_require__(51),
    Event  = __webpack_require__(53);

var DEFAULT_PORTS    = {'http:': 80, 'https:': 443, 'ws:':80, 'wss:': 443},
    SECURE_PROTOCOLS = ['https:', 'wss:'];

var Client = function(_url, protocols, options) {
  options = options || {};

  this.url     = _url;
  this._driver = driver.client(this.url, {maxLength: options.maxLength, protocols: protocols});

  ['open', 'error'].forEach(function(event) {
    this._driver.on(event, function() {
      self.headers    = self._driver.headers;
      self.statusCode = self._driver.statusCode;
    });
  }, this);

  var proxy      = options.proxy || {},
      endpoint   = url.parse(proxy.origin || this.url),
      port       = endpoint.port || DEFAULT_PORTS[endpoint.protocol],
      secure     = SECURE_PROTOCOLS.indexOf(endpoint.protocol) >= 0,
      onConnect  = function() { self._onConnect() },
      netOptions = options.net || {},
      originTLS  = options.tls || {},
      socketTLS  = proxy.origin ? (proxy.tls || {}) : originTLS,
      self       = this;

  netOptions.host = socketTLS.host = endpoint.hostname;
  netOptions.port = socketTLS.port = port;

  originTLS.ca = originTLS.ca || options.ca;
  socketTLS.servername = socketTLS.servername || endpoint.hostname;

  this._stream = secure
               ? tls.connect(socketTLS, onConnect)
               : net.connect(netOptions, onConnect);

  if (proxy.origin) this._configureProxy(proxy, originTLS);

  API.call(this, options);
};
util.inherits(Client, API);

Client.prototype._onConnect = function() {
  var worker = this._proxy || this._driver;
  worker.start();
};

Client.prototype._configureProxy = function(proxy, originTLS) {
  var uri    = url.parse(this.url),
      secure = SECURE_PROTOCOLS.indexOf(uri.protocol) >= 0,
      self   = this,
      name;

  this._proxy = this._driver.proxy(proxy.origin);

  if (proxy.headers) {
    for (name in proxy.headers) this._proxy.setHeader(name, proxy.headers[name]);
  }

  this._proxy.pipe(this._stream, {end: false});
  this._stream.pipe(this._proxy);

  this._proxy.on('connect', function() {
    if (secure) {
      var options = {socket: self._stream, servername: uri.hostname};
      for (name in originTLS) options[name] = originTLS[name];
      self._stream = tls.connect(options);
      self._configureStream();
    }
    self._driver.io.pipe(self._stream);
    self._stream.pipe(self._driver.io);
    self._driver.start();
  });

  this._proxy.on('error', function(error) {
    self._driver.emit('error', error);
  });
};

module.exports = Client;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("tls");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Stream      = __webpack_require__(29).Stream,
    util        = __webpack_require__(18),
    driver      = __webpack_require__(24),
    Headers     = __webpack_require__(30),
    API         = __webpack_require__(51),
    EventTarget = __webpack_require__(52),
    Event       = __webpack_require__(53);

var EventSource = function(request, response, options) {
  this.writable = true;
  options = options || {};

  this._stream = response.socket;
  this._ping   = options.ping  || this.DEFAULT_PING;
  this._retry  = options.retry || this.DEFAULT_RETRY;

  var scheme       = driver.isSecureRequest(request) ? 'https:' : 'http:';
  this.url         = scheme + '//' + request.headers.host + request.url;
  this.lastEventId = request.headers['last-event-id'] || '';
  this.readyState  = API.CONNECTING;

  var headers = new Headers(),
      self    = this;

  if (options.headers) {
    for (var key in options.headers) headers.set(key, options.headers[key]);
  }

  if (!this._stream || !this._stream.writable) return;
  process.nextTick(function() { self._open() });

  this._stream.setTimeout(0);
  this._stream.setNoDelay(true);

  var handshake = 'HTTP/1.1 200 OK\r\n' +
                  'Content-Type: text/event-stream\r\n' +
                  'Cache-Control: no-cache, no-store\r\n' +
                  'Connection: close\r\n' +
                  headers.toString() +
                  '\r\n' +
                  'retry: ' + Math.floor(this._retry * 1000) + '\r\n\r\n';

  this._write(handshake);

  this._stream.on('drain', function() { self.emit('drain') });

  if (this._ping)
    this._pingTimer = setInterval(function() { self.ping() }, this._ping * 1000);

  ['error', 'end'].forEach(function(event) {
    self._stream.on(event, function() { self.close() });
  });
};
util.inherits(EventSource, Stream);

EventSource.isEventSource = function(request) {
  if (request.method !== 'GET') return false;
  var accept = (request.headers.accept || '').split(/\s*,\s*/);
  return accept.indexOf('text/event-stream') >= 0;
};

var instance = {
  DEFAULT_PING:   10,
  DEFAULT_RETRY:  5,

  _write: function(chunk) {
    if (!this.writable) return false;
    try {
      return this._stream.write(chunk, 'utf8');
    } catch (e) {
      return false;
    }
  },

  _open: function() {
    if (this.readyState !== API.CONNECTING) return;

    this.readyState = API.OPEN;

    var event = new Event('open');
    event.initEvent('open', false, false);
    this.dispatchEvent(event);
  },

  write: function(message) {
    return this.send(message);
  },

  end: function(message) {
    if (message !== undefined) this.write(message);
    this.close();
  },

  send: function(message, options) {
    if (this.readyState > API.OPEN) return false;

    message = String(message).replace(/(\r\n|\r|\n)/g, '$1data: ');
    options = options || {};

    var frame = '';
    if (options.event) frame += 'event: ' + options.event + '\r\n';
    if (options.id)    frame += 'id: '    + options.id    + '\r\n';
    frame += 'data: ' + message + '\r\n\r\n';

    return this._write(frame);
  },

  ping: function() {
    return this._write(':\r\n\r\n');
  },

  close: function() {
    if (this.readyState > API.OPEN) return false;

    this.readyState = API.CLOSED;
    this.writable = false;
    if (this._pingTimer) clearInterval(this._pingTimer);
    if (this._stream) this._stream.end();

    var event = new Event('close');
    event.initEvent('close', false, false);
    this.dispatchEvent(event);

    return true;
  }
};

for (var method in instance) EventSource.prototype[method] = instance[method];
for (var key in EventTarget) EventSource.prototype[key] = EventTarget[key];

module.exports = EventSource;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , AjaxBasedTransport = __webpack_require__(59)
  , XhrReceiver = __webpack_require__(63)
  , XHRCorsObject = __webpack_require__(64)
  , XHRLocalObject = __webpack_require__(68)
  , browser = __webpack_require__(69)
  ;

function XhrStreamingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XHRCorsObject);
}

inherits(XhrStreamingTransport, AjaxBasedTransport);

XhrStreamingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }
  // Opera doesn't support xhr-streaming #60
  // But it might be able to #92
  if (browser.isOpera()) {
    return false;
  }

  return XHRCorsObject.enabled;
};

XhrStreamingTransport.transportName = 'xhr-streaming';
XhrStreamingTransport.roundTrips = 2; // preflight, ajax

// Safari gets confused when a streaming ajax request is started
// before onload. This causes the load indicator to spin indefinetely.
// Only require body when used in a browser
XhrStreamingTransport.needBody = !!global.document;

module.exports = XhrStreamingTransport;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , urlUtils = __webpack_require__(8)
  , SenderReceiver = __webpack_require__(60)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:ajax-based');
}

function createAjaxSender(AjaxObject) {
  return function(url, payload, callback) {
    debug('create ajax sender', url, payload);
    var opt = {};
    if (typeof payload === 'string') {
      opt.headers = {'Content-type': 'text/plain'};
    }
    var ajaxUrl = urlUtils.addPath(url, '/xhr_send');
    var xo = new AjaxObject('POST', ajaxUrl, payload, opt);
    xo.once('finish', function(status) {
      debug('finish', status);
      xo = null;

      if (status !== 200 && status !== 204) {
        return callback(new Error('http status ' + status));
      }
      callback();
    });
    return function() {
      debug('abort');
      xo.close();
      xo = null;

      var err = new Error('Aborted');
      err.code = 1000;
      callback(err);
    };
  };
}

function AjaxBasedTransport(transUrl, urlSuffix, Receiver, AjaxObject) {
  SenderReceiver.call(this, transUrl, urlSuffix, createAjaxSender(AjaxObject), Receiver, AjaxObject);
}

inherits(AjaxBasedTransport, SenderReceiver);

module.exports = AjaxBasedTransport;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , urlUtils = __webpack_require__(8)
  , BufferedSender = __webpack_require__(61)
  , Polling = __webpack_require__(62)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:sender-receiver');
}

function SenderReceiver(transUrl, urlSuffix, senderFunc, Receiver, AjaxObject) {
  var pollUrl = urlUtils.addPath(transUrl, urlSuffix);
  debug(pollUrl);
  var self = this;
  BufferedSender.call(this, transUrl, senderFunc);

  this.poll = new Polling(Receiver, pollUrl, AjaxObject);
  this.poll.on('message', function(msg) {
    debug('poll message', msg);
    self.emit('message', msg);
  });
  this.poll.once('close', function(code, reason) {
    debug('poll close', code, reason);
    self.poll = null;
    self.emit('close', code, reason);
    self.close();
  });
}

inherits(SenderReceiver, BufferedSender);

SenderReceiver.prototype.close = function() {
  BufferedSender.prototype.close.call(this);
  debug('close');
  this.removeAllListeners();
  if (this.poll) {
    this.poll.abort();
    this.poll = null;
  }
};

module.exports = SenderReceiver;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , EventEmitter = __webpack_require__(21).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:buffered-sender');
}

function BufferedSender(url, sender) {
  debug(url);
  EventEmitter.call(this);
  this.sendBuffer = [];
  this.sender = sender;
  this.url = url;
}

inherits(BufferedSender, EventEmitter);

BufferedSender.prototype.send = function(message) {
  debug('send', message);
  this.sendBuffer.push(message);
  if (!this.sendStop) {
    this.sendSchedule();
  }
};

// For polling transports in a situation when in the message callback,
// new message is being send. If the sending connection was started
// before receiving one, it is possible to saturate the network and
// timeout due to the lack of receiving socket. To avoid that we delay
// sending messages by some small time, in order to let receiving
// connection be started beforehand. This is only a halfmeasure and
// does not fix the big problem, but it does make the tests go more
// stable on slow networks.
BufferedSender.prototype.sendScheduleWait = function() {
  debug('sendScheduleWait');
  var self = this;
  var tref;
  this.sendStop = function() {
    debug('sendStop');
    self.sendStop = null;
    clearTimeout(tref);
  };
  tref = setTimeout(function() {
    debug('timeout');
    self.sendStop = null;
    self.sendSchedule();
  }, 25);
};

BufferedSender.prototype.sendSchedule = function() {
  debug('sendSchedule', this.sendBuffer.length);
  var self = this;
  if (this.sendBuffer.length > 0) {
    var payload = '[' + this.sendBuffer.join(',') + ']';
    this.sendStop = this.sender(this.url, payload, function(err) {
      self.sendStop = null;
      if (err) {
        debug('error', err);
        self.emit('close', err.code || 1006, 'Sending error: ' + err);
        self.close();
      } else {
        self.sendScheduleWait();
      }
    });
    this.sendBuffer = [];
  }
};

BufferedSender.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

BufferedSender.prototype.close = function() {
  debug('close');
  this._cleanup();
  if (this.sendStop) {
    this.sendStop();
    this.sendStop = null;
  }
};

module.exports = BufferedSender;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , EventEmitter = __webpack_require__(21).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:polling');
}

function Polling(Receiver, receiveUrl, AjaxObject) {
  debug(receiveUrl);
  EventEmitter.call(this);
  this.Receiver = Receiver;
  this.receiveUrl = receiveUrl;
  this.AjaxObject = AjaxObject;
  this._scheduleReceiver();
}

inherits(Polling, EventEmitter);

Polling.prototype._scheduleReceiver = function() {
  debug('_scheduleReceiver');
  var self = this;
  var poll = this.poll = new this.Receiver(this.receiveUrl, this.AjaxObject);

  poll.on('message', function(msg) {
    debug('message', msg);
    self.emit('message', msg);
  });

  poll.once('close', function(code, reason) {
    debug('close', code, reason, self.pollIsClosing);
    self.poll = poll = null;

    if (!self.pollIsClosing) {
      if (reason === 'network') {
        self._scheduleReceiver();
      } else {
        self.emit('close', code || 1006, reason);
        self.removeAllListeners();
      }
    }
  });
};

Polling.prototype.abort = function() {
  debug('abort');
  this.removeAllListeners();
  this.pollIsClosing = true;
  if (this.poll) {
    this.poll.abort();
  }
};

module.exports = Polling;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , EventEmitter = __webpack_require__(21).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:receiver:xhr');
}

function XhrReceiver(url, AjaxObject) {
  debug(url);
  EventEmitter.call(this);
  var self = this;

  this.bufferPosition = 0;

  this.xo = new AjaxObject('POST', url, null);
  this.xo.on('chunk', this._chunkHandler.bind(this));
  this.xo.once('finish', function(status, text) {
    debug('finish', status, text);
    self._chunkHandler(status, text);
    self.xo = null;
    var reason = status === 200 ? 'network' : 'permanent';
    debug('close', reason);
    self.emit('close', null, reason);
    self._cleanup();
  });
}

inherits(XhrReceiver, EventEmitter);

XhrReceiver.prototype._chunkHandler = function(status, text) {
  debug('_chunkHandler', status);
  if (status !== 200 || !text) {
    return;
  }

  for (var idx = -1; ; this.bufferPosition += idx + 1) {
    var buf = text.slice(this.bufferPosition);
    idx = buf.indexOf('\n');
    if (idx === -1) {
      break;
    }
    var msg = buf.slice(0, idx);
    if (msg) {
      debug('message', msg);
      this.emit('message', msg);
    }
  }
};

XhrReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  this.removeAllListeners();
};

XhrReceiver.prototype.abort = function() {
  debug('abort');
  if (this.xo) {
    this.xo.close();
    debug('close');
    this.emit('close', null, 'user');
    this.xo = null;
  }
  this._cleanup();
};

module.exports = XhrReceiver;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , XhrDriver = __webpack_require__(65)
  ;

function XHRCorsObject(method, url, payload, opts) {
  XhrDriver.call(this, method, url, payload, opts);
}

inherits(XHRCorsObject, XhrDriver);

XHRCorsObject.enabled = XhrDriver.enabled && XhrDriver.supportsCORS;

module.exports = XHRCorsObject;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(21).EventEmitter
  , inherits = __webpack_require__(19)
  , http = __webpack_require__(66)
  , https = __webpack_require__(67)
  , URL = __webpack_require__(9)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:driver:xhr');
}

function XhrDriver(method, url, payload, opts) {
  debug(method, url, payload);
  var self = this;
  EventEmitter.call(this);

  var parsedUrl = new URL(url);
  var options = {
    method: method
  , hostname: parsedUrl.hostname.replace(/\[|\]/g, '')
  , port: parsedUrl.port
  , path: parsedUrl.pathname + (parsedUrl.query || '')
  , headers: opts && opts.headers
  , agent: false
  };

  var protocol = parsedUrl.protocol === 'https:' ? https : http;
  this.req = protocol.request(options, function(res) {
    res.setEncoding('utf8');
    var responseText = '';

    res.on('data', function(chunk) {
      debug('data', chunk);
      responseText += chunk;
      self.emit('chunk', 200, responseText);
    });
    res.once('end', function() {
      debug('end');
      self.emit('finish', res.statusCode, responseText);
      self.req = null;
    });
  });

  this.req.on('error', function(e) {
    debug('error', e);
    self.emit('finish', 0, e.message);
  });

  if (payload) {
    this.req.write(payload);
  }
  this.req.end();
}

inherits(XhrDriver, EventEmitter);

XhrDriver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.req) {
    this.req.abort();
    this.req = null;
  }
};

XhrDriver.enabled = true;
XhrDriver.supportsCORS = true;

module.exports = XhrDriver;


/***/ }),
/* 66 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 67 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , XhrDriver = __webpack_require__(65)
  ;

function XHRLocalObject(method, url, payload /*, opts */) {
  XhrDriver.call(this, method, url, payload, {
    noCredentials: true
  });
}

inherits(XHRLocalObject, XhrDriver);

XHRLocalObject.enabled = XhrDriver.enabled;

module.exports = XHRLocalObject;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isOpera: function() {
    return global.navigator &&
      /opera/i.test(global.navigator.userAgent);
  }

, isKonqueror: function() {
    return global.navigator &&
      /konqueror/i.test(global.navigator.userAgent);
  }

  // #187 wrap document.domain in try/catch because of WP8 from file:///
, hasDomain: function () {
    // non-browser client always has a domain
    if (!global.document) {
      return true;
    }

    try {
      return !!global.document.domain;
    } catch (e) {
      return false;
    }
  }
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , AjaxBasedTransport = __webpack_require__(59)
  , XhrReceiver = __webpack_require__(63)
  , XDRObject = __webpack_require__(71)
  ;

// According to:
//   http://stackoverflow.com/questions/1641507/detect-browser-support-for-cross-domain-xmlhttprequests
//   http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/

function XdrStreamingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr_streaming', XhrReceiver, XDRObject);
}

inherits(XdrStreamingTransport, AjaxBasedTransport);

XdrStreamingTransport.enabled = function(info) {
  if (info.cookie_needed || info.nullOrigin) {
    return false;
  }
  return XDRObject.enabled && info.sameScheme;
};

XdrStreamingTransport.transportName = 'xdr-streaming';
XdrStreamingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrStreamingTransport;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(21).EventEmitter
  , inherits = __webpack_require__(19)
  , eventUtils = __webpack_require__(5)
  , browser = __webpack_require__(69)
  , urlUtils = __webpack_require__(8)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:sender:xdr');
}

// References:
//   http://ajaxian.com/archives/100-line-ajax-wrapper
//   http://msdn.microsoft.com/en-us/library/cc288060(v=VS.85).aspx

function XDRObject(method, url, payload) {
  debug(method, url);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self._start(method, url, payload);
  }, 0);
}

inherits(XDRObject, EventEmitter);

XDRObject.prototype._start = function(method, url, payload) {
  debug('_start');
  var self = this;
  var xdr = new global.XDomainRequest();
  // IE caches even POSTs
  url = urlUtils.addQuery(url, 't=' + (+new Date()));

  xdr.onerror = function() {
    debug('onerror');
    self._error();
  };
  xdr.ontimeout = function() {
    debug('ontimeout');
    self._error();
  };
  xdr.onprogress = function() {
    debug('progress', xdr.responseText);
    self.emit('chunk', 200, xdr.responseText);
  };
  xdr.onload = function() {
    debug('load');
    self.emit('finish', 200, xdr.responseText);
    self._cleanup(false);
  };
  this.xdr = xdr;
  this.unloadRef = eventUtils.unloadAdd(function() {
    self._cleanup(true);
  });
  try {
    // Fails with AccessDenied if port number is bogus
    this.xdr.open(method, url);
    if (this.timeout) {
      this.xdr.timeout = this.timeout;
    }
    this.xdr.send(payload);
  } catch (x) {
    this._error();
  }
};

XDRObject.prototype._error = function() {
  this.emit('finish', 0, '');
  this._cleanup(false);
};

XDRObject.prototype._cleanup = function(abort) {
  debug('cleanup', abort);
  if (!this.xdr) {
    return;
  }
  this.removeAllListeners();
  eventUtils.unloadDel(this.unloadRef);

  this.xdr.ontimeout = this.xdr.onerror = this.xdr.onprogress = this.xdr.onload = null;
  if (abort) {
    try {
      this.xdr.abort();
    } catch (x) {
      // intentionally empty
    }
  }
  this.unloadRef = this.xdr = null;
};

XDRObject.prototype.close = function() {
  debug('close');
  this._cleanup(true);
};

// IE 8/9 if the request target uses the same scheme - #79
XDRObject.enabled = !!(global.XDomainRequest && browser.hasDomain());

module.exports = XDRObject;


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , AjaxBasedTransport = __webpack_require__(59)
  , EventSourceReceiver = __webpack_require__(73)
  , XHRCorsObject = __webpack_require__(64)
  , EventSourceDriver = __webpack_require__(74)
  ;

function EventSourceTransport(transUrl) {
  if (!EventSourceTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }

  AjaxBasedTransport.call(this, transUrl, '/eventsource', EventSourceReceiver, XHRCorsObject);
}

inherits(EventSourceTransport, AjaxBasedTransport);

EventSourceTransport.enabled = function() {
  return !!EventSourceDriver;
};

EventSourceTransport.transportName = 'eventsource';
EventSourceTransport.roundTrips = 2;

module.exports = EventSourceTransport;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , EventEmitter = __webpack_require__(21).EventEmitter
  , EventSourceDriver = __webpack_require__(74)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:receiver:eventsource');
}

function EventSourceReceiver(url) {
  debug(url);
  EventEmitter.call(this);

  var self = this;
  var es = this.es = new EventSourceDriver(url);
  es.onmessage = function(e) {
    debug('message', e.data);
    self.emit('message', decodeURI(e.data));
  };
  es.onerror = function(e) {
    debug('error', es.readyState, e);
    // ES on reconnection has readyState = 0 or 1.
    // on network error it's CLOSED = 2
    var reason = (es.readyState !== 2 ? 'network' : 'permanent');
    self._cleanup();
    self._close(reason);
  };
}

inherits(EventSourceReceiver, EventEmitter);

EventSourceReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

EventSourceReceiver.prototype._cleanup = function() {
  debug('cleanup');
  var es = this.es;
  if (es) {
    es.onmessage = es.onerror = null;
    es.close();
    this.es = null;
  }
};

EventSourceReceiver.prototype._close = function(reason) {
  debug('close', reason);
  var self = this;
  // Safari and chrome < 15 crash if we close window before
  // waiting for ES cleanup. See:
  // https://code.google.com/p/chromium/issues/detail?id=89155
  setTimeout(function() {
    self.emit('close', null, reason);
    self.removeAllListeners();
  }, 200);
};

module.exports = EventSourceReceiver;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var original = __webpack_require__(75)
var parse = __webpack_require__(33).parse
var events = __webpack_require__(21)
var https = __webpack_require__(67)
var http = __webpack_require__(66)
var util = __webpack_require__(18)

var httpsOptions = [
  'pfx', 'key', 'passphrase', 'cert', 'ca', 'ciphers',
  'rejectUnauthorized', 'secureProtocol', 'servername', 'checkServerIdentity'
]

var bom = [239, 187, 191]
var colon = 58
var space = 32
var lineFeed = 10
var carriageReturn = 13

function hasBom (buf) {
  return bom.every(function (charCode, index) {
    return buf[index] === charCode
  })
}

/**
 * Creates a new EventSource object
 *
 * @param {String} url the URL to which to connect
 * @param {Object} [eventSourceInitDict] extra init params. See README for details.
 * @api public
 **/
function EventSource (url, eventSourceInitDict) {
  var readyState = EventSource.CONNECTING
  Object.defineProperty(this, 'readyState', {
    get: function () {
      return readyState
    }
  })

  Object.defineProperty(this, 'url', {
    get: function () {
      return url
    }
  })

  var self = this
  self.reconnectInterval = 1000

  function onConnectionClosed (message) {
    if (readyState === EventSource.CLOSED) return
    readyState = EventSource.CONNECTING
    _emit('error', new Event('error', {message: message}))

    // The url may have been changed by a temporary
    // redirect. If that's the case, revert it now.
    if (reconnectUrl) {
      url = reconnectUrl
      reconnectUrl = null
    }
    setTimeout(function () {
      if (readyState !== EventSource.CONNECTING) {
        return
      }
      connect()
    }, self.reconnectInterval)
  }

  var req
  var lastEventId = ''
  if (eventSourceInitDict && eventSourceInitDict.headers && eventSourceInitDict.headers['Last-Event-ID']) {
    lastEventId = eventSourceInitDict.headers['Last-Event-ID']
    delete eventSourceInitDict.headers['Last-Event-ID']
  }

  var discardTrailingNewline = false
  var data = ''
  var eventName = ''

  var reconnectUrl = null

  function connect () {
    var options = parse(url)
    var isSecure = options.protocol === 'https:'
    options.headers = { 'Cache-Control': 'no-cache', 'Accept': 'text/event-stream' }
    if (lastEventId) options.headers['Last-Event-ID'] = lastEventId
    if (eventSourceInitDict && eventSourceInitDict.headers) {
      for (var i in eventSourceInitDict.headers) {
        var header = eventSourceInitDict.headers[i]
        if (header) {
          options.headers[i] = header
        }
      }
    }

    // Legacy: this should be specified as `eventSourceInitDict.https.rejectUnauthorized`,
    // but for now exists as a backwards-compatibility layer
    options.rejectUnauthorized = !(eventSourceInitDict && !eventSourceInitDict.rejectUnauthorized)

    // If specify http proxy, make the request to sent to the proxy server,
    // and include the original url in path and Host headers
    var useProxy = eventSourceInitDict && eventSourceInitDict.proxy
    if (useProxy) {
      var proxy = parse(eventSourceInitDict.proxy)
      isSecure = proxy.protocol === 'https:'

      options.protocol = isSecure ? 'https:' : 'http:'
      options.path = url
      options.headers.Host = options.host
      options.hostname = proxy.hostname
      options.host = proxy.host
      options.port = proxy.port
    }

    // If https options are specified, merge them into the request options
    if (eventSourceInitDict && eventSourceInitDict.https) {
      for (var optName in eventSourceInitDict.https) {
        if (httpsOptions.indexOf(optName) === -1) {
          continue
        }

        var option = eventSourceInitDict.https[optName]
        if (option !== undefined) {
          options[optName] = option
        }
      }
    }

    // Pass this on to the XHR
    if (eventSourceInitDict && eventSourceInitDict.withCredentials !== undefined) {
      options.withCredentials = eventSourceInitDict.withCredentials
    }

    req = (isSecure ? https : http).request(options, function (res) {
      // Handle HTTP errors
      if (res.statusCode === 500 || res.statusCode === 502 || res.statusCode === 503 || res.statusCode === 504) {
        _emit('error', new Event('error', {status: res.statusCode, message: res.statusMessage}))
        onConnectionClosed()
        return
      }

      // Handle HTTP redirects
      if (res.statusCode === 301 || res.statusCode === 307) {
        if (!res.headers.location) {
          // Server sent redirect response without Location header.
          _emit('error', new Event('error', {status: res.statusCode, message: res.statusMessage}))
          return
        }
        if (res.statusCode === 307) reconnectUrl = url
        url = res.headers.location
        process.nextTick(connect)
        return
      }

      if (res.statusCode !== 200) {
        _emit('error', new Event('error', {status: res.statusCode, message: res.statusMessage}))
        return self.close()
      }

      readyState = EventSource.OPEN
      res.on('close', function () {
        res.removeAllListeners('close')
        res.removeAllListeners('end')
        onConnectionClosed()
      })

      res.on('end', function () {
        res.removeAllListeners('close')
        res.removeAllListeners('end')
        onConnectionClosed()
      })
      _emit('open', new Event('open'))

      // text/event-stream parser adapted from webkit's
      // Source/WebCore/page/EventSource.cpp
      var isFirst = true
      var buf
      res.on('data', function (chunk) {
        buf = buf ? Buffer.concat([buf, chunk]) : chunk
        if (isFirst && hasBom(buf)) {
          buf = buf.slice(bom.length)
        }

        isFirst = false
        var pos = 0
        var length = buf.length

        while (pos < length) {
          if (discardTrailingNewline) {
            if (buf[pos] === lineFeed) {
              ++pos
            }
            discardTrailingNewline = false
          }

          var lineLength = -1
          var fieldLength = -1
          var c

          for (var i = pos; lineLength < 0 && i < length; ++i) {
            c = buf[i]
            if (c === colon) {
              if (fieldLength < 0) {
                fieldLength = i - pos
              }
            } else if (c === carriageReturn) {
              discardTrailingNewline = true
              lineLength = i - pos
            } else if (c === lineFeed) {
              lineLength = i - pos
            }
          }

          if (lineLength < 0) {
            break
          }

          parseEventStreamLine(buf, pos, fieldLength, lineLength)

          pos += lineLength + 1
        }

        if (pos === length) {
          buf = void 0
        } else if (pos > 0) {
          buf = buf.slice(pos)
        }
      })
    })

    req.on('error', function (err) {
      onConnectionClosed(err.message)
    })

    if (req.setNoDelay) req.setNoDelay(true)
    req.end()
  }

  connect()

  function _emit () {
    if (self.listeners(arguments[0]).length > 0) {
      self.emit.apply(self, arguments)
    }
  }

  this._close = function () {
    if (readyState === EventSource.CLOSED) return
    readyState = EventSource.CLOSED
    if (req.abort) req.abort()
    if (req.xhr && req.xhr.abort) req.xhr.abort()
  }

  function parseEventStreamLine (buf, pos, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        var type = eventName || 'message'
        _emit(type, new MessageEvent(type, {
          data: data.slice(0, -1), // remove trailing newline
          lastEventId: lastEventId,
          origin: original(url)
        }))
        data = ''
      }
      eventName = void 0
    } else if (fieldLength > 0) {
      var noValue = fieldLength < 0
      var step = 0
      var field = buf.slice(pos, pos + (noValue ? lineLength : fieldLength)).toString()

      if (noValue) {
        step = lineLength
      } else if (buf[pos + fieldLength + 1] !== space) {
        step = fieldLength + 1
      } else {
        step = fieldLength + 2
      }
      pos += step

      var valueLength = lineLength - step
      var value = buf.slice(pos, pos + valueLength).toString()

      if (field === 'data') {
        data += value + '\n'
      } else if (field === 'event') {
        eventName = value
      } else if (field === 'id') {
        lastEventId = value
      } else if (field === 'retry') {
        var retry = parseInt(value, 10)
        if (!Number.isNaN(retry)) {
          self.reconnectInterval = retry
        }
      }
    }
  }
}

module.exports = EventSource

util.inherits(EventSource, events.EventEmitter)
EventSource.prototype.constructor = EventSource; // make stacktraces readable

['open', 'error', 'message'].forEach(function (method) {
  Object.defineProperty(EventSource.prototype, 'on' + method, {
    /**
     * Returns the current listener
     *
     * @return {Mixed} the set function or undefined
     * @api private
     */
    get: function get () {
      var listener = this.listeners(method)[0]
      return listener ? (listener._listener ? listener._listener : listener) : undefined
    },

    /**
     * Start listening for events
     *
     * @param {Function} listener the listener
     * @return {Mixed} the set function or undefined
     * @api private
     */
    set: function set (listener) {
      this.removeAllListeners(method)
      this.addEventListener(method, listener)
    }
  })
})

/**
 * Ready states
 */
Object.defineProperty(EventSource, 'CONNECTING', {enumerable: true, value: 0})
Object.defineProperty(EventSource, 'OPEN', {enumerable: true, value: 1})
Object.defineProperty(EventSource, 'CLOSED', {enumerable: true, value: 2})

EventSource.prototype.CONNECTING = 0
EventSource.prototype.OPEN = 1
EventSource.prototype.CLOSED = 2

/**
 * Closes the connection, if one is made, and sets the readyState attribute to 2 (closed)
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventSource/close
 * @api public
 */
EventSource.prototype.close = function () {
  this._close()
}

/**
 * Emulates the W3C Browser based WebSocket interface using addEventListener.
 *
 * @param {String} type A string representing the event type to listen out for
 * @param {Function} listener callback
 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
EventSource.prototype.addEventListener = function addEventListener (type, listener) {
  if (typeof listener === 'function') {
    // store a reference so we can return the original function again
    listener._listener = listener
    this.on(type, listener)
  }
}

/**
 * Emulates the W3C Browser based WebSocket interface using dispatchEvent.
 *
 * @param {Event} event An event to be dispatched
 * @see https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/dispatchEvent
 * @api public
 */
EventSource.prototype.dispatchEvent = function dispatchEvent (event) {
  if (!event.type) {
    throw new Error('UNSPECIFIED_EVENT_TYPE_ERR')
  }
  // if event is instance of an CustomEvent (or has 'details' property),
  // send the detail object as the payload for the event
  this.emit(event.type, event.detail)
}

/**
 * Emulates the W3C Browser based WebSocket interface using removeEventListener.
 *
 * @param {String} type A string representing the event type to remove
 * @param {Function} listener callback
 * @see https://developer.mozilla.org/en/DOM/element.removeEventListener
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
EventSource.prototype.removeEventListener = function removeEventListener (type, listener) {
  if (typeof listener === 'function') {
    listener._listener = undefined
    this.removeListener(type, listener)
  }
}

/**
 * W3C Event
 *
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event
 * @api private
 */
function Event (type, optionalProperties) {
  Object.defineProperty(this, 'type', { writable: false, value: type, enumerable: true })
  if (optionalProperties) {
    for (var f in optionalProperties) {
      if (optionalProperties.hasOwnProperty(f)) {
        Object.defineProperty(this, f, { writable: false, value: optionalProperties[f], enumerable: true })
      }
    }
  }
}

/**
 * W3C MessageEvent
 *
 * @see http://www.w3.org/TR/webmessaging/#event-definitions
 * @api private
 */
function MessageEvent (type, eventInitDict) {
  Object.defineProperty(this, 'type', { writable: false, value: type, enumerable: true })
  for (var f in eventInitDict) {
    if (eventInitDict.hasOwnProperty(f)) {
      Object.defineProperty(this, f, { writable: false, value: eventInitDict[f], enumerable: true })
    }
  }
}


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var parse = __webpack_require__(9);

/**
 * Transform an URL to a valid origin value.
 *
 * @param {String|Object} url URL to transform to it's origin.
 * @returns {String} The origin.
 * @api public
 */
function origin(url) {
  if ('string' === typeof url) url = parse(url);

  //
  // 6.2.  ASCII Serialization of an Origin
  // http://tools.ietf.org/html/rfc6454#section-6.2
  //
  if (!url.protocol || !url.hostname) return 'null';

  //
  // 4. Origin of a URI
  // http://tools.ietf.org/html/rfc6454#section-4
  //
  // States that url.scheme, host should be converted to lower case. This also
  // makes it easier to match origins as everything is just lower case.
  //
  return (url.protocol +'//'+ url.host).toLowerCase();
}

/**
 * Check if the origins are the same.
 *
 * @param {String} a URL or origin of a.
 * @param {String} b URL or origin of b.
 * @returns {Boolean}
 * @api public
 */
origin.same = function same(a, b) {
  return origin(a) === origin(b);
};

//
// Expose the origin
//
module.exports = origin;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , IframeTransport = __webpack_require__(77)
  , objectUtils = __webpack_require__(83)
  ;

module.exports = function(transport) {

  function IframeWrapTransport(transUrl, baseUrl) {
    IframeTransport.call(this, transport.transportName, transUrl, baseUrl);
  }

  inherits(IframeWrapTransport, IframeTransport);

  IframeWrapTransport.enabled = function(url, info) {
    if (!global.document) {
      return false;
    }

    var iframeInfo = objectUtils.extend({}, info);
    iframeInfo.sameOrigin = true;
    return transport.enabled(iframeInfo) && IframeTransport.enabled();
  };

  IframeWrapTransport.transportName = 'iframe-' + transport.transportName;
  IframeWrapTransport.needBody = true;
  IframeWrapTransport.roundTrips = IframeTransport.roundTrips + transport.roundTrips - 1; // html, javascript (2) + transport - no CORS (1)

  IframeWrapTransport.facadeTransport = transport;

  return IframeWrapTransport;
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Few cool transports do work only for same-origin. In order to make
// them work cross-domain we shall use iframe, served from the
// remote domain. New browsers have capabilities to communicate with
// cross domain iframe using postMessage(). In IE it was implemented
// from IE 8+, but of course, IE got some details wrong:
//    http://msdn.microsoft.com/en-us/library/cc197015(v=VS.85).aspx
//    http://stevesouders.com/misc/test-postmessage.php

var inherits = __webpack_require__(19)
  , JSON3 = __webpack_require__(78)
  , EventEmitter = __webpack_require__(21).EventEmitter
  , version = __webpack_require__(81)
  , urlUtils = __webpack_require__(8)
  , iframeUtils = __webpack_require__(82)
  , eventUtils = __webpack_require__(5)
  , random = __webpack_require__(6)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:transport:iframe');
}

function IframeTransport(transport, transUrl, baseUrl) {
  if (!IframeTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  EventEmitter.call(this);

  var self = this;
  this.origin = urlUtils.getOrigin(baseUrl);
  this.baseUrl = baseUrl;
  this.transUrl = transUrl;
  this.transport = transport;
  this.windowId = random.string(8);

  var iframeUrl = urlUtils.addPath(baseUrl, '/iframe.html') + '#' + this.windowId;
  debug(transport, transUrl, iframeUrl);

  this.iframeObj = iframeUtils.createIframe(iframeUrl, function(r) {
    debug('err callback');
    self.emit('close', 1006, 'Unable to load an iframe (' + r + ')');
    self.close();
  });

  this.onmessageCallback = this._message.bind(this);
  eventUtils.attachEvent('message', this.onmessageCallback);
}

inherits(IframeTransport, EventEmitter);

IframeTransport.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  if (this.iframeObj) {
    eventUtils.detachEvent('message', this.onmessageCallback);
    try {
      // When the iframe is not loaded, IE raises an exception
      // on 'contentWindow'.
      this.postMessage('c');
    } catch (x) {
      // intentionally empty
    }
    this.iframeObj.cleanup();
    this.iframeObj = null;
    this.onmessageCallback = this.iframeObj = null;
  }
};

IframeTransport.prototype._message = function(e) {
  debug('message', e.data);
  if (!urlUtils.isOriginEqual(e.origin, this.origin)) {
    debug('not same origin', e.origin, this.origin);
    return;
  }

  var iframeMessage;
  try {
    iframeMessage = JSON3.parse(e.data);
  } catch (ignored) {
    debug('bad json', e.data);
    return;
  }

  if (iframeMessage.windowId !== this.windowId) {
    debug('mismatched window id', iframeMessage.windowId, this.windowId);
    return;
  }

  switch (iframeMessage.type) {
  case 's':
    this.iframeObj.loaded();
    // window global dependency
    this.postMessage('s', JSON3.stringify([
      version
    , this.transport
    , this.transUrl
    , this.baseUrl
    ]));
    break;
  case 't':
    this.emit('message', iframeMessage.data);
    break;
  case 'c':
    var cdata;
    try {
      cdata = JSON3.parse(iframeMessage.data);
    } catch (ignored) {
      debug('bad json', iframeMessage.data);
      return;
    }
    this.emit('close', cdata[0], cdata[1]);
    this.close();
    break;
  }
};

IframeTransport.prototype.postMessage = function(type, data) {
  debug('postMessage', type, data);
  this.iframeObj.post(JSON3.stringify({
    windowId: this.windowId
  , type: type
  , data: data || ''
  }), this.origin);
};

IframeTransport.prototype.send = function(message) {
  debug('send', message);
  this.postMessage('m', message);
};

IframeTransport.enabled = function() {
  return iframeUtils.iframeEnabled;
};

IframeTransport.transportName = 'iframe';
IframeTransport.roundTrips = 2;

module.exports = IframeTransport;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
;(function () {
  // Detect the `define` function exposed by asynchronous module loaders. The
  // strict `define` check is necessary for compatibility with `r.js`.
  var isLoader =  true && __webpack_require__(80);

  // A set of types used to distinguish objects from primitives.
  var objectTypes = {
    "function": true,
    "object": true
  };

  // Detect the `exports` object exposed by CommonJS implementations.
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Use the `global` object exposed by Node (including Browserify via
  // `insert-module-globals`), Narwhal, and Ringo as the default context,
  // and the `window` object in browsers. Rhino exports a `global` function
  // instead.
  var root = objectTypes[typeof window] && window || this,
      freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof global == "object" && global;

  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  // Public: Initializes JSON 3 using the given `context` object, attaching the
  // `stringify` and `parse` functions to the specified `exports` object.
  function runInContext(context, exports) {
    context || (context = root.Object());
    exports || (exports = root.Object());

    // Native constructor aliases.
    var Number = context.Number || root.Number,
        String = context.String || root.String,
        Object = context.Object || root.Object,
        Date = context.Date || root.Date,
        SyntaxError = context.SyntaxError || root.SyntaxError,
        TypeError = context.TypeError || root.TypeError,
        Math = context.Math || root.Math,
        nativeJSON = context.JSON || root.JSON;

    // Delegate to the native `stringify` and `parse` implementations.
    if (typeof nativeJSON == "object" && nativeJSON) {
      exports.stringify = nativeJSON.stringify;
      exports.parse = nativeJSON.parse;
    }

    // Convenience aliases.
    var objectProto = Object.prototype,
        getClass = objectProto.toString,
        isProperty = objectProto.hasOwnProperty,
        undefined;

    // Internal: Contains `try...catch` logic used by other functions.
    // This prevents other functions from being deoptimized.
    function attempt(func, errorFunc) {
      try {
        func();
      } catch (exception) {
        if (errorFunc) {
          errorFunc();
        }
      }
    }

    // Test the `Date#getUTC*` methods. Based on work by @Yaffle.
    var isExtended = new Date(-3509827334573292);
    attempt(function () {
      // The `getUTCFullYear`, `Month`, and `Date` methods return nonsensical
      // results for certain dates in Opera >= 10.53.
      isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 &&
        isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
    });

    // Internal: Determines whether the native `JSON.stringify` and `parse`
    // implementations are spec-compliant. Based on work by Ken Snyder.
    function has(name) {
      if (has[name] != null) {
        // Return cached feature test result.
        return has[name];
      }
      var isSupported;
      if (name == "bug-string-char-index") {
        // IE <= 7 doesn't support accessing string characters using square
        // bracket notation. IE 8 only supports this for primitives.
        isSupported = "a"[0] != "a";
      } else if (name == "json") {
        // Indicates whether both `JSON.stringify` and `JSON.parse` are
        // supported.
        isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
      } else if (name == "date-serialization") {
        // Indicates whether `Date`s can be serialized accurately by `JSON.stringify`.
        isSupported = has("json-stringify") && isExtended;
        if (isSupported) {
          var stringify = exports.stringify;
          attempt(function () {
            isSupported =
              // JSON 2, Prototype <= 1.7, and older WebKit builds incorrectly
              // serialize extended years.
              stringify(new Date(-8.64e15)) == '"-271821-04-20T00:00:00.000Z"' &&
              // The milliseconds are optional in ES 5, but required in 5.1.
              stringify(new Date(8.64e15)) == '"+275760-09-13T00:00:00.000Z"' &&
              // Firefox <= 11.0 incorrectly serializes years prior to 0 as negative
              // four-digit years instead of six-digit years. Credits: @Yaffle.
              stringify(new Date(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' &&
              // Safari <= 5.1.5 and Opera >= 10.53 incorrectly serialize millisecond
              // values less than 1000. Credits: @Yaffle.
              stringify(new Date(-1)) == '"1969-12-31T23:59:59.999Z"';
          });
        }
      } else {
        var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
        // Test `JSON.stringify`.
        if (name == "json-stringify") {
          var stringify = exports.stringify, stringifySupported = typeof stringify == "function";
          if (stringifySupported) {
            // A test function object with a custom `toJSON` method.
            (value = function () {
              return 1;
            }).toJSON = value;
            attempt(function () {
              stringifySupported =
                // Firefox 3.1b1 and b2 serialize string, number, and boolean
                // primitives as object literals.
                stringify(0) === "0" &&
                // FF 3.1b1, b2, and JSON 2 serialize wrapped primitives as object
                // literals.
                stringify(new Number()) === "0" &&
                stringify(new String()) == '""' &&
                // FF 3.1b1, 2 throw an error if the value is `null`, `undefined`, or
                // does not define a canonical JSON representation (this applies to
                // objects with `toJSON` properties as well, *unless* they are nested
                // within an object or array).
                stringify(getClass) === undefined &&
                // IE 8 serializes `undefined` as `"undefined"`. Safari <= 5.1.7 and
                // FF 3.1b3 pass this test.
                stringify(undefined) === undefined &&
                // Safari <= 5.1.7 and FF 3.1b3 throw `Error`s and `TypeError`s,
                // respectively, if the value is omitted entirely.
                stringify() === undefined &&
                // FF 3.1b1, 2 throw an error if the given value is not a number,
                // string, array, object, Boolean, or `null` literal. This applies to
                // objects with custom `toJSON` methods as well, unless they are nested
                // inside object or array literals. YUI 3.0.0b1 ignores custom `toJSON`
                // methods entirely.
                stringify(value) === "1" &&
                stringify([value]) == "[1]" &&
                // Prototype <= 1.6.1 serializes `[undefined]` as `"[]"` instead of
                // `"[null]"`.
                stringify([undefined]) == "[null]" &&
                // YUI 3.0.0b1 fails to serialize `null` literals.
                stringify(null) == "null" &&
                // FF 3.1b1, 2 halts serialization if an array contains a function:
                // `[1, true, getClass, 1]` serializes as "[1,true,],". FF 3.1b3
                // elides non-JSON values from objects and arrays, unless they
                // define custom `toJSON` methods.
                stringify([undefined, getClass, null]) == "[null,null,null]" &&
                // Simple serialization test. FF 3.1b1 uses Unicode escape sequences
                // where character escape codes are expected (e.g., `\b` => `\u0008`).
                stringify({ "a": [value, true, false, null, "\x00\b\n\f\r\t"] }) == serialized &&
                // FF 3.1b1 and b2 ignore the `filter` and `width` arguments.
                stringify(null, value) === "1" &&
                stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
            }, function () {
              stringifySupported = false;
            });
          }
          isSupported = stringifySupported;
        }
        // Test `JSON.parse`.
        if (name == "json-parse") {
          var parse = exports.parse, parseSupported;
          if (typeof parse == "function") {
            attempt(function () {
              // FF 3.1b1, b2 will throw an exception if a bare literal is provided.
              // Conforming implementations should also coerce the initial argument to
              // a string prior to parsing.
              if (parse("0") === 0 && !parse(false)) {
                // Simple parsing test.
                value = parse(serialized);
                parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                if (parseSupported) {
                  attempt(function () {
                    // Safari <= 5.1.2 and FF 3.1b1 allow unescaped tabs in strings.
                    parseSupported = !parse('"\t"');
                  });
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0 and 4.0.1 allow leading `+` signs and leading
                      // decimal points. FF 4.0, 4.0.1, and IE 9-10 also allow
                      // certain octal literals.
                      parseSupported = parse("01") !== 1;
                    });
                  }
                  if (parseSupported) {
                    attempt(function () {
                      // FF 4.0, 4.0.1, and Rhino 1.7R3-R4 allow trailing decimal
                      // points. These environments, along with FF 3.1b1 and 2,
                      // also allow trailing commas in JSON objects and arrays.
                      parseSupported = parse("1.") !== 1;
                    });
                  }
                }
              }
            }, function () {
              parseSupported = false;
            });
          }
          isSupported = parseSupported;
        }
      }
      return has[name] = !!isSupported;
    }
    has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;

    if (!has("json")) {
      // Common `[[Class]]` name aliases.
      var functionClass = "[object Function]",
          dateClass = "[object Date]",
          numberClass = "[object Number]",
          stringClass = "[object String]",
          arrayClass = "[object Array]",
          booleanClass = "[object Boolean]";

      // Detect incomplete support for accessing string characters by index.
      var charIndexBuggy = has("bug-string-char-index");

      // Internal: Normalizes the `for...in` iteration algorithm across
      // environments. Each enumerated key is yielded to a `callback` function.
      var forOwn = function (object, callback) {
        var size = 0, Properties, dontEnums, property;

        // Tests for bugs in the current environment's `for...in` algorithm. The
        // `valueOf` property inherits the non-enumerable flag from
        // `Object.prototype` in older versions of IE, Netscape, and Mozilla.
        (Properties = function () {
          this.valueOf = 0;
        }).prototype.valueOf = 0;

        // Iterate over a new instance of the `Properties` class.
        dontEnums = new Properties();
        for (property in dontEnums) {
          // Ignore all properties inherited from `Object.prototype`.
          if (isProperty.call(dontEnums, property)) {
            size++;
          }
        }
        Properties = dontEnums = null;

        // Normalize the iteration algorithm.
        if (!size) {
          // A list of non-enumerable properties inherited from `Object.prototype`.
          dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
          // IE <= 8, Mozilla 1.0, and Netscape 6.2 ignore shadowed non-enumerable
          // properties.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, length;
            var hasProperty = !isFunction && typeof object.constructor != "function" && objectTypes[typeof object.hasOwnProperty] && object.hasOwnProperty || isProperty;
            for (property in object) {
              // Gecko <= 1.0 enumerates the `prototype` property of functions under
              // certain conditions; IE does not.
              if (!(isFunction && property == "prototype") && hasProperty.call(object, property)) {
                callback(property);
              }
            }
            // Manually invoke the callback for each non-enumerable property.
            for (length = dontEnums.length; property = dontEnums[--length];) {
              if (hasProperty.call(object, property)) {
                callback(property);
              }
            }
          };
        } else {
          // No bugs detected; use the standard `for...in` algorithm.
          forOwn = function (object, callback) {
            var isFunction = getClass.call(object) == functionClass, property, isConstructor;
            for (property in object) {
              if (!(isFunction && property == "prototype") && isProperty.call(object, property) && !(isConstructor = property === "constructor")) {
                callback(property);
              }
            }
            // Manually invoke the callback for the `constructor` property due to
            // cross-environment inconsistencies.
            if (isConstructor || isProperty.call(object, (property = "constructor"))) {
              callback(property);
            }
          };
        }
        return forOwn(object, callback);
      };

      // Public: Serializes a JavaScript `value` as a JSON string. The optional
      // `filter` argument may specify either a function that alters how object and
      // array members are serialized, or an array of strings and numbers that
      // indicates which properties should be serialized. The optional `width`
      // argument may be either a string or number that specifies the indentation
      // level of the output.
      if (!has("json-stringify") && !has("date-serialization")) {
        // Internal: A map of control characters and their escaped equivalents.
        var Escapes = {
          92: "\\\\",
          34: '\\"',
          8: "\\b",
          12: "\\f",
          10: "\\n",
          13: "\\r",
          9: "\\t"
        };

        // Internal: Converts `value` into a zero-padded string such that its
        // length is at least equal to `width`. The `width` must be <= 6.
        var leadingZeroes = "000000";
        var toPaddedString = function (width, value) {
          // The `|| 0` expression is necessary to work around a bug in
          // Opera <= 7.54u2 where `0 == -0`, but `String(-0) !== "0"`.
          return (leadingZeroes + (value || 0)).slice(-width);
        };

        // Internal: Serializes a date object.
        var serializeDate = function (value) {
          var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
          // Define additional utility methods if the `Date` methods are buggy.
          if (!isExtended) {
            var floor = Math.floor;
            // A mapping between the months of the year and the number of days between
            // January 1st and the first of the respective month.
            var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
            // Internal: Calculates the number of days between the Unix epoch and the
            // first day of the given month.
            var getDay = function (year, month) {
              return Months[month] + 365 * (year - 1970) + floor((year - 1969 + (month = +(month > 1))) / 4) - floor((year - 1901 + month) / 100) + floor((year - 1601 + month) / 400);
            };
            getData = function (value) {
              // Manually compute the year, month, date, hours, minutes,
              // seconds, and milliseconds if the `getUTC*` methods are
              // buggy. Adapted from @Yaffle's `date-shim` project.
              date = floor(value / 864e5);
              for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++);
              for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++);
              date = 1 + date - getDay(year, month);
              // The `time` value specifies the time within the day (see ES
              // 5.1 section 15.9.1.2). The formula `(A % B + B) % B` is used
              // to compute `A modulo B`, as the `%` operator does not
              // correspond to the `modulo` operation for negative numbers.
              time = (value % 864e5 + 864e5) % 864e5;
              // The hours, minutes, seconds, and milliseconds are obtained by
              // decomposing the time within the day. See section 15.9.1.10.
              hours = floor(time / 36e5) % 24;
              minutes = floor(time / 6e4) % 60;
              seconds = floor(time / 1e3) % 60;
              milliseconds = time % 1e3;
            };
          } else {
            getData = function (value) {
              year = value.getUTCFullYear();
              month = value.getUTCMonth();
              date = value.getUTCDate();
              hours = value.getUTCHours();
              minutes = value.getUTCMinutes();
              seconds = value.getUTCSeconds();
              milliseconds = value.getUTCMilliseconds();
            };
          }
          serializeDate = function (value) {
            if (value > -1 / 0 && value < 1 / 0) {
              // Dates are serialized according to the `Date#toJSON` method
              // specified in ES 5.1 section 15.9.5.44. See section 15.9.1.15
              // for the ISO 8601 date time string format.
              getData(value);
              // Serialize extended years correctly.
              value = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) +
              "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) +
              // Months, dates, hours, minutes, and seconds should have two
              // digits; milliseconds should have three.
              "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) +
              // Milliseconds are optional in ES 5.0, but required in 5.1.
              "." + toPaddedString(3, milliseconds) + "Z";
              year = month = date = hours = minutes = seconds = milliseconds = null;
            } else {
              value = null;
            }
            return value;
          };
          return serializeDate(value);
        };

        // For environments with `JSON.stringify` but buggy date serialization,
        // we override the native `Date#toJSON` implementation with a
        // spec-compliant one.
        if (has("json-stringify") && !has("date-serialization")) {
          // Internal: the `Date#toJSON` implementation used to override the native one.
          function dateToJSON (key) {
            return serializeDate(this);
          }

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          var nativeStringify = exports.stringify;
          exports.stringify = function (source, filter, width) {
            var nativeToJSON = Date.prototype.toJSON;
            Date.prototype.toJSON = dateToJSON;
            var result = nativeStringify(source, filter, width);
            Date.prototype.toJSON = nativeToJSON;
            return result;
          }
        } else {
          // Internal: Double-quotes a string `value`, replacing all ASCII control
          // characters (characters with code unit values between 0 and 31) with
          // their escaped equivalents. This is an implementation of the
          // `Quote(value)` operation defined in ES 5.1 section 15.12.3.
          var unicodePrefix = "\\u00";
          var escapeChar = function (character) {
            var charCode = character.charCodeAt(0), escaped = Escapes[charCode];
            if (escaped) {
              return escaped;
            }
            return unicodePrefix + toPaddedString(2, charCode.toString(16));
          };
          var reEscape = /[\x00-\x1f\x22\x5c]/g;
          var quote = function (value) {
            reEscape.lastIndex = 0;
            return '"' +
              (
                reEscape.test(value)
                  ? value.replace(reEscape, escapeChar)
                  : value
              ) +
              '"';
          };

          // Internal: Recursively serializes an object. Implements the
          // `Str(key, holder)`, `JO(value)`, and `JA(value)` operations.
          var serialize = function (property, object, callback, properties, whitespace, indentation, stack) {
            var value, type, className, results, element, index, length, prefix, result;
            attempt(function () {
              // Necessary for host object support.
              value = object[property];
            });
            if (typeof value == "object" && value) {
              if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date.prototype.toJSON) {
                value = serializeDate(value);
              } else if (typeof value.toJSON == "function") {
                value = value.toJSON(property);
              }
            }
            if (callback) {
              // If a replacement function was provided, call it to obtain the value
              // for serialization.
              value = callback.call(object, property, value);
            }
            // Exit early if value is `undefined` or `null`.
            if (value == undefined) {
              return value === undefined ? value : "null";
            }
            type = typeof value;
            // Only call `getClass` if the value is an object.
            if (type == "object") {
              className = getClass.call(value);
            }
            switch (className || type) {
              case "boolean":
              case booleanClass:
                // Booleans are represented literally.
                return "" + value;
              case "number":
              case numberClass:
                // JSON numbers must be finite. `Infinity` and `NaN` are serialized as
                // `"null"`.
                return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
              case "string":
              case stringClass:
                // Strings are double-quoted and escaped.
                return quote("" + value);
            }
            // Recursively serialize objects and arrays.
            if (typeof value == "object") {
              // Check for cyclic structures. This is a linear search; performance
              // is inversely proportional to the number of unique nested objects.
              for (length = stack.length; length--;) {
                if (stack[length] === value) {
                  // Cyclic structures cannot be serialized by `JSON.stringify`.
                  throw TypeError();
                }
              }
              // Add the object to the stack of traversed objects.
              stack.push(value);
              results = [];
              // Save the current indentation level and indent one additional level.
              prefix = indentation;
              indentation += whitespace;
              if (className == arrayClass) {
                // Recursively serialize array elements.
                for (index = 0, length = value.length; index < length; index++) {
                  element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                  results.push(element === undefined ? "null" : element);
                }
                result = results.length ? (whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : ("[" + results.join(",") + "]")) : "[]";
              } else {
                // Recursively serialize object members. Members are selected from
                // either a user-specified list of property names, or the object
                // itself.
                forOwn(properties || value, function (property) {
                  var element = serialize(property, value, callback, properties, whitespace, indentation, stack);
                  if (element !== undefined) {
                    // According to ES 5.1 section 15.12.3: "If `gap` {whitespace}
                    // is not the empty string, let `member` {quote(property) + ":"}
                    // be the concatenation of `member` and the `space` character."
                    // The "`space` character" refers to the literal space
                    // character, not the `space` {width} argument provided to
                    // `JSON.stringify`.
                    results.push(quote(property) + ":" + (whitespace ? " " : "") + element);
                  }
                });
                result = results.length ? (whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : ("{" + results.join(",") + "}")) : "{}";
              }
              // Remove the object from the traversed object stack.
              stack.pop();
              return result;
            }
          };

          // Public: `JSON.stringify`. See ES 5.1 section 15.12.3.
          exports.stringify = function (source, filter, width) {
            var whitespace, callback, properties, className;
            if (objectTypes[typeof filter] && filter) {
              className = getClass.call(filter);
              if (className == functionClass) {
                callback = filter;
              } else if (className == arrayClass) {
                // Convert the property names array into a makeshift set.
                properties = {};
                for (var index = 0, length = filter.length, value; index < length;) {
                  value = filter[index++];
                  className = getClass.call(value);
                  if (className == "[object String]" || className == "[object Number]") {
                    properties[value] = 1;
                  }
                }
              }
            }
            if (width) {
              className = getClass.call(width);
              if (className == numberClass) {
                // Convert the `width` to an integer and create a string containing
                // `width` number of space characters.
                if ((width -= width % 1) > 0) {
                  if (width > 10) {
                    width = 10;
                  }
                  for (whitespace = ""; whitespace.length < width;) {
                    whitespace += " ";
                  }
                }
              } else if (className == stringClass) {
                whitespace = width.length <= 10 ? width : width.slice(0, 10);
              }
            }
            // Opera <= 7.54u2 discards the values associated with empty string keys
            // (`""`) only if they are used directly within an object member list
            // (e.g., `!("" in { "": 1})`).
            return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
          };
        }
      }

      // Public: Parses a JSON source string.
      if (!has("json-parse")) {
        var fromCharCode = String.fromCharCode;

        // Internal: A map of escaped control characters and their unescaped
        // equivalents.
        var Unescapes = {
          92: "\\",
          34: '"',
          47: "/",
          98: "\b",
          116: "\t",
          110: "\n",
          102: "\f",
          114: "\r"
        };

        // Internal: Stores the parser state.
        var Index, Source;

        // Internal: Resets the parser state and throws a `SyntaxError`.
        var abort = function () {
          Index = Source = null;
          throw SyntaxError();
        };

        // Internal: Returns the next token, or `"$"` if the parser has reached
        // the end of the source string. A token may be a string, number, `null`
        // literal, or Boolean literal.
        var lex = function () {
          var source = Source, length = source.length, value, begin, position, isSigned, charCode;
          while (Index < length) {
            charCode = source.charCodeAt(Index);
            switch (charCode) {
              case 9: case 10: case 13: case 32:
                // Skip whitespace tokens, including tabs, carriage returns, line
                // feeds, and space characters.
                Index++;
                break;
              case 123: case 125: case 91: case 93: case 58: case 44:
                // Parse a punctuator token (`{`, `}`, `[`, `]`, `:`, or `,`) at
                // the current position.
                value = charIndexBuggy ? source.charAt(Index) : source[Index];
                Index++;
                return value;
              case 34:
                // `"` delimits a JSON string; advance to the next character and
                // begin parsing the string. String tokens are prefixed with the
                // sentinel `@` character to distinguish them from punctuators and
                // end-of-string tokens.
                for (value = "@", Index++; Index < length;) {
                  charCode = source.charCodeAt(Index);
                  if (charCode < 32) {
                    // Unescaped ASCII control characters (those with a code unit
                    // less than the space character) are not permitted.
                    abort();
                  } else if (charCode == 92) {
                    // A reverse solidus (`\`) marks the beginning of an escaped
                    // control character (including `"`, `\`, and `/`) or Unicode
                    // escape sequence.
                    charCode = source.charCodeAt(++Index);
                    switch (charCode) {
                      case 92: case 34: case 47: case 98: case 116: case 110: case 102: case 114:
                        // Revive escaped control characters.
                        value += Unescapes[charCode];
                        Index++;
                        break;
                      case 117:
                        // `\u` marks the beginning of a Unicode escape sequence.
                        // Advance to the first character and validate the
                        // four-digit code point.
                        begin = ++Index;
                        for (position = Index + 4; Index < position; Index++) {
                          charCode = source.charCodeAt(Index);
                          // A valid sequence comprises four hexdigits (case-
                          // insensitive) that form a single hexadecimal value.
                          if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                            // Invalid Unicode escape sequence.
                            abort();
                          }
                        }
                        // Revive the escaped character.
                        value += fromCharCode("0x" + source.slice(begin, Index));
                        break;
                      default:
                        // Invalid escape sequence.
                        abort();
                    }
                  } else {
                    if (charCode == 34) {
                      // An unescaped double-quote character marks the end of the
                      // string.
                      break;
                    }
                    charCode = source.charCodeAt(Index);
                    begin = Index;
                    // Optimize for the common case where a string is valid.
                    while (charCode >= 32 && charCode != 92 && charCode != 34) {
                      charCode = source.charCodeAt(++Index);
                    }
                    // Append the string as-is.
                    value += source.slice(begin, Index);
                  }
                }
                if (source.charCodeAt(Index) == 34) {
                  // Advance to the next character and return the revived string.
                  Index++;
                  return value;
                }
                // Unterminated string.
                abort();
              default:
                // Parse numbers and literals.
                begin = Index;
                // Advance past the negative sign, if one is specified.
                if (charCode == 45) {
                  isSigned = true;
                  charCode = source.charCodeAt(++Index);
                }
                // Parse an integer or floating-point value.
                if (charCode >= 48 && charCode <= 57) {
                  // Leading zeroes are interpreted as octal literals.
                  if (charCode == 48 && ((charCode = source.charCodeAt(Index + 1)), charCode >= 48 && charCode <= 57)) {
                    // Illegal octal literal.
                    abort();
                  }
                  isSigned = false;
                  // Parse the integer component.
                  for (; Index < length && ((charCode = source.charCodeAt(Index)), charCode >= 48 && charCode <= 57); Index++);
                  // Floats cannot contain a leading decimal point; however, this
                  // case is already accounted for by the parser.
                  if (source.charCodeAt(Index) == 46) {
                    position = ++Index;
                    // Parse the decimal component.
                    for (; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal trailing decimal.
                      abort();
                    }
                    Index = position;
                  }
                  // Parse exponents. The `e` denoting the exponent is
                  // case-insensitive.
                  charCode = source.charCodeAt(Index);
                  if (charCode == 101 || charCode == 69) {
                    charCode = source.charCodeAt(++Index);
                    // Skip past the sign following the exponent, if one is
                    // specified.
                    if (charCode == 43 || charCode == 45) {
                      Index++;
                    }
                    // Parse the exponential component.
                    for (position = Index; position < length; position++) {
                      charCode = source.charCodeAt(position);
                      if (charCode < 48 || charCode > 57) {
                        break;
                      }
                    }
                    if (position == Index) {
                      // Illegal empty exponent.
                      abort();
                    }
                    Index = position;
                  }
                  // Coerce the parsed value to a JavaScript number.
                  return +source.slice(begin, Index);
                }
                // A negative sign may only precede numbers.
                if (isSigned) {
                  abort();
                }
                // `true`, `false`, and `null` literals.
                var temp = source.slice(Index, Index + 4);
                if (temp == "true") {
                  Index += 4;
                  return true;
                } else if (temp == "fals" && source.charCodeAt(Index + 4 ) == 101) {
                  Index += 5;
                  return false;
                } else if (temp == "null") {
                  Index += 4;
                  return null;
                }
                // Unrecognized token.
                abort();
            }
          }
          // Return the sentinel `$` character if the parser has reached the end
          // of the source string.
          return "$";
        };

        // Internal: Parses a JSON `value` token.
        var get = function (value) {
          var results, hasMembers;
          if (value == "$") {
            // Unexpected end of input.
            abort();
          }
          if (typeof value == "string") {
            if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
              // Remove the sentinel `@` character.
              return value.slice(1);
            }
            // Parse object and array literals.
            if (value == "[") {
              // Parses a JSON array, returning a new JavaScript array.
              results = [];
              for (;;) {
                value = lex();
                // A closing square bracket marks the end of the array literal.
                if (value == "]") {
                  break;
                }
                // If the array literal contains elements, the current token
                // should be a comma separating the previous element from the
                // next.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "]") {
                      // Unexpected trailing `,` in array literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each array element.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Elisions and leading commas are not permitted.
                if (value == ",") {
                  abort();
                }
                results.push(get(value));
              }
              return results;
            } else if (value == "{") {
              // Parses a JSON object, returning a new JavaScript object.
              results = {};
              for (;;) {
                value = lex();
                // A closing curly brace marks the end of the object literal.
                if (value == "}") {
                  break;
                }
                // If the object literal contains members, the current token
                // should be a comma separator.
                if (hasMembers) {
                  if (value == ",") {
                    value = lex();
                    if (value == "}") {
                      // Unexpected trailing `,` in object literal.
                      abort();
                    }
                  } else {
                    // A `,` must separate each object member.
                    abort();
                  }
                } else {
                  hasMembers = true;
                }
                // Leading commas are not permitted, object property names must be
                // double-quoted strings, and a `:` must separate each property
                // name and value.
                if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                  abort();
                }
                results[value.slice(1)] = get(lex());
              }
              return results;
            }
            // Unexpected token encountered.
            abort();
          }
          return value;
        };

        // Internal: Updates a traversed object member.
        var update = function (source, property, callback) {
          var element = walk(source, property, callback);
          if (element === undefined) {
            delete source[property];
          } else {
            source[property] = element;
          }
        };

        // Internal: Recursively traverses a parsed JSON object, invoking the
        // `callback` function for each value. This is an implementation of the
        // `Walk(holder, name)` operation defined in ES 5.1 section 15.12.2.
        var walk = function (source, property, callback) {
          var value = source[property], length;
          if (typeof value == "object" && value) {
            // `forOwn` can't be used to traverse an array in Opera <= 8.54
            // because its `Object#hasOwnProperty` implementation returns `false`
            // for array indices (e.g., `![1, 2, 3].hasOwnProperty("0")`).
            if (getClass.call(value) == arrayClass) {
              for (length = value.length; length--;) {
                update(getClass, forOwn, value, length, callback);
              }
            } else {
              forOwn(value, function (property) {
                update(value, property, callback);
              });
            }
          }
          return callback.call(source, property, value);
        };

        // Public: `JSON.parse`. See ES 5.1 section 15.12.2.
        exports.parse = function (source, callback) {
          var result, value;
          Index = 0;
          Source = "" + source;
          result = get(lex());
          // If a JSON string contains multiple tokens, it is invalid.
          if (lex() != "$") {
            abort();
          }
          // Reset the parser state.
          Index = Source = null;
          return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
        };
      }
    }

    exports.runInContext = runInContext;
    return exports;
  }

  if (freeExports && !isLoader) {
    // Export for CommonJS environments.
    runInContext(root, freeExports);
  } else {
    // Export for web browsers and JavaScript engines.
    var nativeJSON = root.JSON,
        previousJSON = root.JSON3,
        isRestored = false;

    var JSON3 = runInContext(root, (root.JSON3 = {
      // Public: Restores the original value of the global `JSON` object and
      // returns a reference to the `JSON3` object.
      "noConflict": function () {
        if (!isRestored) {
          isRestored = true;
          root.JSON = nativeJSON;
          root.JSON3 = previousJSON;
          nativeJSON = previousJSON = null;
        }
        return JSON3;
      }
    }));

    root.JSON = {
      "parse": JSON3.parse,
      "stringify": JSON3.stringify
    };
  }

  // Export for asynchronous module loaders.
  if (isLoader) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return JSON3;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(79)(module)))

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 80 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(this, {}))

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = '1.4.0';


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var eventUtils = __webpack_require__(5)
  , JSON3 = __webpack_require__(78)
  , browser = __webpack_require__(69)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:utils:iframe');
}

module.exports = {
  WPrefix: '_jp'
, currentWindowId: null

, polluteGlobalNamespace: function() {
    if (!(module.exports.WPrefix in global)) {
      global[module.exports.WPrefix] = {};
    }
  }

, postMessage: function(type, data) {
    if (global.parent !== global) {
      global.parent.postMessage(JSON3.stringify({
        windowId: module.exports.currentWindowId
      , type: type
      , data: data || ''
      }), '*');
    } else {
      debug('Cannot postMessage, no parent window.', type, data);
    }
  }

, createIframe: function(iframeUrl, errorCallback) {
    var iframe = global.document.createElement('iframe');
    var tref, unloadRef;
    var unattach = function() {
      debug('unattach');
      clearTimeout(tref);
      // Explorer had problems with that.
      try {
        iframe.onload = null;
      } catch (x) {
        // intentionally empty
      }
      iframe.onerror = null;
    };
    var cleanup = function() {
      debug('cleanup');
      if (iframe) {
        unattach();
        // This timeout makes chrome fire onbeforeunload event
        // within iframe. Without the timeout it goes straight to
        // onunload.
        setTimeout(function() {
          if (iframe) {
            iframe.parentNode.removeChild(iframe);
          }
          iframe = null;
        }, 0);
        eventUtils.unloadDel(unloadRef);
      }
    };
    var onerror = function(err) {
      debug('onerror', err);
      if (iframe) {
        cleanup();
        errorCallback(err);
      }
    };
    var post = function(msg, origin) {
      debug('post', msg, origin);
      setTimeout(function() {
        try {
          // When the iframe is not loaded, IE raises an exception
          // on 'contentWindow'.
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(msg, origin);
          }
        } catch (x) {
          // intentionally empty
        }
      }, 0);
    };

    iframe.src = iframeUrl;
    iframe.style.display = 'none';
    iframe.style.position = 'absolute';
    iframe.onerror = function() {
      onerror('onerror');
    };
    iframe.onload = function() {
      debug('onload');
      // `onload` is triggered before scripts on the iframe are
      // executed. Give it few seconds to actually load stuff.
      clearTimeout(tref);
      tref = setTimeout(function() {
        onerror('onload timeout');
      }, 2000);
    };
    global.document.body.appendChild(iframe);
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }

/* eslint no-undef: "off", new-cap: "off" */
, createHtmlfile: function(iframeUrl, errorCallback) {
    var axo = ['Active'].concat('Object').join('X');
    var doc = new global[axo]('htmlfile');
    var tref, unloadRef;
    var iframe;
    var unattach = function() {
      clearTimeout(tref);
      iframe.onerror = null;
    };
    var cleanup = function() {
      if (doc) {
        unattach();
        eventUtils.unloadDel(unloadRef);
        iframe.parentNode.removeChild(iframe);
        iframe = doc = null;
        CollectGarbage();
      }
    };
    var onerror = function(r) {
      debug('onerror', r);
      if (doc) {
        cleanup();
        errorCallback(r);
      }
    };
    var post = function(msg, origin) {
      try {
        // When the iframe is not loaded, IE raises an exception
        // on 'contentWindow'.
        setTimeout(function() {
          if (iframe && iframe.contentWindow) {
              iframe.contentWindow.postMessage(msg, origin);
          }
        }, 0);
      } catch (x) {
        // intentionally empty
      }
    };

    doc.open();
    doc.write('<html><s' + 'cript>' +
              'document.domain="' + global.document.domain + '";' +
              '</s' + 'cript></html>');
    doc.close();
    doc.parentWindow[module.exports.WPrefix] = global[module.exports.WPrefix];
    var c = doc.createElement('div');
    doc.body.appendChild(c);
    iframe = doc.createElement('iframe');
    c.appendChild(iframe);
    iframe.src = iframeUrl;
    iframe.onerror = function() {
      onerror('onerror');
    };
    tref = setTimeout(function() {
      onerror('timeout');
    }, 15000);
    unloadRef = eventUtils.unloadAdd(cleanup);
    return {
      post: post
    , cleanup: cleanup
    , loaded: unattach
    };
  }
};

module.exports.iframeEnabled = false;
if (global.document) {
  // postMessage misbehaves in konqueror 4.6.5 - the messages are delivered with
  // huge delay, or not at all.
  module.exports.iframeEnabled = (typeof global.postMessage === 'function' ||
    typeof global.postMessage === 'object') && (!browser.isKonqueror());
}


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isObject: function(obj) {
    var type = typeof obj;
    return type === 'function' || type === 'object' && !!obj;
  }

, extend: function(obj) {
    if (!this.isObject(obj)) {
      return obj;
    }
    var source, prop;
    for (var i = 1, length = arguments.length; i < length; i++) {
      source = arguments[i];
      for (prop in source) {
        if (Object.prototype.hasOwnProperty.call(source, prop)) {
          obj[prop] = source[prop];
        }
      }
    }
    return obj;
  }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , HtmlfileReceiver = __webpack_require__(85)
  , XHRLocalObject = __webpack_require__(68)
  , AjaxBasedTransport = __webpack_require__(59)
  ;

function HtmlFileTransport(transUrl) {
  if (!HtmlfileReceiver.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/htmlfile', HtmlfileReceiver, XHRLocalObject);
}

inherits(HtmlFileTransport, AjaxBasedTransport);

HtmlFileTransport.enabled = function(info) {
  return HtmlfileReceiver.enabled && info.sameOrigin;
};

HtmlFileTransport.transportName = 'htmlfile';
HtmlFileTransport.roundTrips = 2;

module.exports = HtmlFileTransport;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , iframeUtils = __webpack_require__(82)
  , urlUtils = __webpack_require__(8)
  , EventEmitter = __webpack_require__(21).EventEmitter
  , random = __webpack_require__(6)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:receiver:htmlfile');
}

function HtmlfileReceiver(url) {
  debug(url);
  EventEmitter.call(this);
  var self = this;
  iframeUtils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  url = urlUtils.addQuery(url, 'c=' + decodeURIComponent(iframeUtils.WPrefix + '.' + this.id));

  debug('using htmlfile', HtmlfileReceiver.htmlfileEnabled);
  var constructFunc = HtmlfileReceiver.htmlfileEnabled ?
      iframeUtils.createHtmlfile : iframeUtils.createIframe;

  global[iframeUtils.WPrefix][this.id] = {
    start: function() {
      debug('start');
      self.iframeObj.loaded();
    }
  , message: function(data) {
      debug('message', data);
      self.emit('message', data);
    }
  , stop: function() {
      debug('stop');
      self._cleanup();
      self._close('network');
    }
  };
  this.iframeObj = constructFunc(url, function() {
    debug('callback');
    self._cleanup();
    self._close('permanent');
  });
}

inherits(HtmlfileReceiver, EventEmitter);

HtmlfileReceiver.prototype.abort = function() {
  debug('abort');
  this._cleanup();
  this._close('user');
};

HtmlfileReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  if (this.iframeObj) {
    this.iframeObj.cleanup();
    this.iframeObj = null;
  }
  delete global[iframeUtils.WPrefix][this.id];
};

HtmlfileReceiver.prototype._close = function(reason) {
  debug('_close', reason);
  this.emit('close', null, reason);
  this.removeAllListeners();
};

HtmlfileReceiver.htmlfileEnabled = false;

// obfuscate to avoid firewalls
var axo = ['Active'].concat('Object').join('X');
if (axo in global) {
  try {
    HtmlfileReceiver.htmlfileEnabled = !!new global[axo]('htmlfile');
  } catch (x) {
    // intentionally empty
  }
}

HtmlfileReceiver.enabled = HtmlfileReceiver.htmlfileEnabled || iframeUtils.iframeEnabled;

module.exports = HtmlfileReceiver;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , AjaxBasedTransport = __webpack_require__(59)
  , XhrReceiver = __webpack_require__(63)
  , XHRCorsObject = __webpack_require__(64)
  , XHRLocalObject = __webpack_require__(68)
  ;

function XhrPollingTransport(transUrl) {
  if (!XHRLocalObject.enabled && !XHRCorsObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XHRCorsObject);
}

inherits(XhrPollingTransport, AjaxBasedTransport);

XhrPollingTransport.enabled = function(info) {
  if (info.nullOrigin) {
    return false;
  }

  if (XHRLocalObject.enabled && info.sameOrigin) {
    return true;
  }
  return XHRCorsObject.enabled;
};

XhrPollingTransport.transportName = 'xhr-polling';
XhrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XhrPollingTransport;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , AjaxBasedTransport = __webpack_require__(59)
  , XdrStreamingTransport = __webpack_require__(70)
  , XhrReceiver = __webpack_require__(63)
  , XDRObject = __webpack_require__(71)
  ;

function XdrPollingTransport(transUrl) {
  if (!XDRObject.enabled) {
    throw new Error('Transport created when disabled');
  }
  AjaxBasedTransport.call(this, transUrl, '/xhr', XhrReceiver, XDRObject);
}

inherits(XdrPollingTransport, AjaxBasedTransport);

XdrPollingTransport.enabled = XdrStreamingTransport.enabled;
XdrPollingTransport.transportName = 'xdr-polling';
XdrPollingTransport.roundTrips = 2; // preflight, ajax

module.exports = XdrPollingTransport;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// The simplest and most robust transport, using the well-know cross
// domain hack - JSONP. This transport is quite inefficient - one
// message could use up to one http request. But at least it works almost
// everywhere.
// Known limitations:
//   o you will get a spinning cursor
//   o for Konqueror a dumb timer is needed to detect errors

var inherits = __webpack_require__(19)
  , SenderReceiver = __webpack_require__(60)
  , JsonpReceiver = __webpack_require__(89)
  , jsonpSender = __webpack_require__(90)
  ;

function JsonPTransport(transUrl) {
  if (!JsonPTransport.enabled()) {
    throw new Error('Transport created when disabled');
  }
  SenderReceiver.call(this, transUrl, '/jsonp', jsonpSender, JsonpReceiver);
}

inherits(JsonPTransport, SenderReceiver);

JsonPTransport.enabled = function() {
  return !!global.document;
};

JsonPTransport.transportName = 'jsonp-polling';
JsonPTransport.roundTrips = 1;
JsonPTransport.needBody = true;

module.exports = JsonPTransport;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(82)
  , random = __webpack_require__(6)
  , browser = __webpack_require__(69)
  , urlUtils = __webpack_require__(8)
  , inherits = __webpack_require__(19)
  , EventEmitter = __webpack_require__(21).EventEmitter
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:receiver:jsonp');
}

function JsonpReceiver(url) {
  debug(url);
  var self = this;
  EventEmitter.call(this);

  utils.polluteGlobalNamespace();

  this.id = 'a' + random.string(6);
  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

  global[utils.WPrefix][this.id] = this._callback.bind(this);
  this._createScript(urlWithId);

  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
  this.timeoutId = setTimeout(function() {
    debug('timeout');
    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
  }, JsonpReceiver.timeout);
}

inherits(JsonpReceiver, EventEmitter);

JsonpReceiver.prototype.abort = function() {
  debug('abort');
  if (global[utils.WPrefix][this.id]) {
    var err = new Error('JSONP user aborted read');
    err.code = 1000;
    this._abort(err);
  }
};

JsonpReceiver.timeout = 35000;
JsonpReceiver.scriptErrorTimeout = 1000;

JsonpReceiver.prototype._callback = function(data) {
  debug('_callback', data);
  this._cleanup();

  if (this.aborting) {
    return;
  }

  if (data) {
    debug('message', data);
    this.emit('message', data);
  }
  this.emit('close', null, 'network');
  this.removeAllListeners();
};

JsonpReceiver.prototype._abort = function(err) {
  debug('_abort', err);
  this._cleanup();
  this.aborting = true;
  this.emit('close', err.code, err.message);
  this.removeAllListeners();
};

JsonpReceiver.prototype._cleanup = function() {
  debug('_cleanup');
  clearTimeout(this.timeoutId);
  if (this.script2) {
    this.script2.parentNode.removeChild(this.script2);
    this.script2 = null;
  }
  if (this.script) {
    var script = this.script;
    // Unfortunately, you can't really abort script loading of
    // the script.
    script.parentNode.removeChild(script);
    script.onreadystatechange = script.onerror =
        script.onload = script.onclick = null;
    this.script = null;
  }
  delete global[utils.WPrefix][this.id];
};

JsonpReceiver.prototype._scriptError = function() {
  debug('_scriptError');
  var self = this;
  if (this.errorTimer) {
    return;
  }

  this.errorTimer = setTimeout(function() {
    if (!self.loadedOkay) {
      self._abort(new Error('JSONP script loaded abnormally (onerror)'));
    }
  }, JsonpReceiver.scriptErrorTimeout);
};

JsonpReceiver.prototype._createScript = function(url) {
  debug('_createScript', url);
  var self = this;
  var script = this.script = global.document.createElement('script');
  var script2;  // Opera synchronous load trick.

  script.id = 'a' + random.string(8);
  script.src = url;
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.onerror = this._scriptError.bind(this);
  script.onload = function() {
    debug('onload');
    self._abort(new Error('JSONP script loaded abnormally (onload)'));
  };

  // IE9 fires 'error' event after onreadystatechange or before, in random order.
  // Use loadedOkay to determine if actually errored
  script.onreadystatechange = function() {
    debug('onreadystatechange', script.readyState);
    if (/loaded|closed/.test(script.readyState)) {
      if (script && script.htmlFor && script.onclick) {
        self.loadedOkay = true;
        try {
          // In IE, actually execute the script.
          script.onclick();
        } catch (x) {
          // intentionally empty
        }
      }
      if (script) {
        self._abort(new Error('JSONP script loaded abnormally (onreadystatechange)'));
      }
    }
  };
  // IE: event/htmlFor/onclick trick.
  // One can't rely on proper order for onreadystatechange. In order to
  // make sure, set a 'htmlFor' and 'event' properties, so that
  // script code will be installed as 'onclick' handler for the
  // script object. Later, onreadystatechange, manually execute this
  // code. FF and Chrome doesn't work with 'event' and 'htmlFor'
  // set. For reference see:
  //   http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
  // Also, read on that about script ordering:
  //   http://wiki.whatwg.org/wiki/Dynamic_Script_Execution_Order
  if (typeof script.async === 'undefined' && global.document.attachEvent) {
    // According to mozilla docs, in recent browsers script.async defaults
    // to 'true', so we may use it to detect a good browser:
    // https://developer.mozilla.org/en/HTML/Element/script
    if (!browser.isOpera()) {
      // Naively assume we're in IE
      try {
        script.htmlFor = script.id;
        script.event = 'onclick';
      } catch (x) {
        // intentionally empty
      }
      script.async = true;
    } else {
      // Opera, second sync script hack
      script2 = this.script2 = global.document.createElement('script');
      script2.text = "try{var a = document.getElementById('" + script.id + "'); if(a)a.onerror();}catch(x){};";
      script.async = script2.async = false;
    }
  }
  if (typeof script.async !== 'undefined') {
    script.async = true;
  }

  var head = global.document.getElementsByTagName('head')[0];
  head.insertBefore(script, head.firstChild);
  if (script2) {
    head.insertBefore(script2, head.firstChild);
  }
};

module.exports = JsonpReceiver;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var random = __webpack_require__(6)
  , urlUtils = __webpack_require__(8)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:sender:jsonp');
}

var form, area;

function createIframe(id) {
  debug('createIframe', id);
  try {
    // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
    return global.document.createElement('<iframe name="' + id + '">');
  } catch (x) {
    var iframe = global.document.createElement('iframe');
    iframe.name = id;
    return iframe;
  }
}

function createForm() {
  debug('createForm');
  form = global.document.createElement('form');
  form.style.display = 'none';
  form.style.position = 'absolute';
  form.method = 'POST';
  form.enctype = 'application/x-www-form-urlencoded';
  form.acceptCharset = 'UTF-8';

  area = global.document.createElement('textarea');
  area.name = 'd';
  form.appendChild(area);

  global.document.body.appendChild(form);
}

module.exports = function(url, payload, callback) {
  debug(url, payload);
  if (!form) {
    createForm();
  }
  var id = 'a' + random.string(8);
  form.target = id;
  form.action = urlUtils.addQuery(urlUtils.addPath(url, '/jsonp_send'), 'i=' + id);

  var iframe = createIframe(id);
  iframe.id = id;
  iframe.style.display = 'none';
  form.appendChild(iframe);

  try {
    area.value = payload;
  } catch (e) {
    // seriously broken browsers get here
  }
  form.submit();

  var completed = function(err) {
    debug('completed', id, err);
    if (!iframe.onerror) {
      return;
    }
    iframe.onreadystatechange = iframe.onerror = iframe.onload = null;
    // Opera mini doesn't like if we GC iframe
    // immediately, thus this timeout.
    setTimeout(function() {
      debug('cleaning up', id);
      iframe.parentNode.removeChild(iframe);
      iframe = null;
    }, 500);
    area.value = '';
    // It is not possible to detect if the iframe succeeded or
    // failed to submit our form.
    callback(err);
  };
  iframe.onerror = function() {
    debug('onerror', id);
    completed();
  };
  iframe.onload = function() {
    debug('onload', id);
    completed();
  };
  iframe.onreadystatechange = function(e) {
    debug('onreadystatechange', id, iframe.readyState, e);
    if (iframe.readyState === 'complete') {
      completed();
    }
  };
  return function() {
    debug('aborted', id);
    completed(new Error('Aborted'));
  };
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(92);

var URL = __webpack_require__(9)
  , inherits = __webpack_require__(19)
  , JSON3 = __webpack_require__(78)
  , random = __webpack_require__(6)
  , escape = __webpack_require__(93)
  , urlUtils = __webpack_require__(8)
  , eventUtils = __webpack_require__(5)
  , transport = __webpack_require__(94)
  , objectUtils = __webpack_require__(83)
  , browser = __webpack_require__(69)
  , log = __webpack_require__(95)
  , Event = __webpack_require__(96)
  , EventTarget = __webpack_require__(97)
  , loc = __webpack_require__(98)
  , CloseEvent = __webpack_require__(99)
  , TransportMessageEvent = __webpack_require__(100)
  , InfoReceiver = __webpack_require__(101)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:main');
}

var transports;

// follow constructor steps defined at http://dev.w3.org/html5/websockets/#the-websocket-interface
function SockJS(url, protocols, options) {
  if (!(this instanceof SockJS)) {
    return new SockJS(url, protocols, options);
  }
  if (arguments.length < 1) {
    throw new TypeError("Failed to construct 'SockJS: 1 argument required, but only 0 present");
  }
  EventTarget.call(this);

  this.readyState = SockJS.CONNECTING;
  this.extensions = '';
  this.protocol = '';

  // non-standard extension
  options = options || {};
  if (options.protocols_whitelist) {
    log.warn("'protocols_whitelist' is DEPRECATED. Use 'transports' instead.");
  }
  this._transportsWhitelist = options.transports;
  this._transportOptions = options.transportOptions || {};
  this._timeout = options.timeout || 0;

  var sessionId = options.sessionId || 8;
  if (typeof sessionId === 'function') {
    this._generateSessionId = sessionId;
  } else if (typeof sessionId === 'number') {
    this._generateSessionId = function() {
      return random.string(sessionId);
    };
  } else {
    throw new TypeError('If sessionId is used in the options, it needs to be a number or a function.');
  }

  this._server = options.server || random.numberString(1000);

  // Step 1 of WS spec - parse and validate the url. Issue #8
  var parsedUrl = new URL(url);
  if (!parsedUrl.host || !parsedUrl.protocol) {
    throw new SyntaxError("The URL '" + url + "' is invalid");
  } else if (parsedUrl.hash) {
    throw new SyntaxError('The URL must not contain a fragment');
  } else if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    throw new SyntaxError("The URL's scheme must be either 'http:' or 'https:'. '" + parsedUrl.protocol + "' is not allowed.");
  }

  var secure = parsedUrl.protocol === 'https:';
  // Step 2 - don't allow secure origin with an insecure protocol
  if (loc.protocol === 'https:' && !secure) {
    throw new Error('SecurityError: An insecure SockJS connection may not be initiated from a page loaded over HTTPS');
  }

  // Step 3 - check port access - no need here
  // Step 4 - parse protocols argument
  if (!protocols) {
    protocols = [];
  } else if (!Array.isArray(protocols)) {
    protocols = [protocols];
  }

  // Step 5 - check protocols argument
  var sortedProtocols = protocols.sort();
  sortedProtocols.forEach(function(proto, i) {
    if (!proto) {
      throw new SyntaxError("The protocols entry '" + proto + "' is invalid.");
    }
    if (i < (sortedProtocols.length - 1) && proto === sortedProtocols[i + 1]) {
      throw new SyntaxError("The protocols entry '" + proto + "' is duplicated.");
    }
  });

  // Step 6 - convert origin
  var o = urlUtils.getOrigin(loc.href);
  this._origin = o ? o.toLowerCase() : null;

  // remove the trailing slash
  parsedUrl.set('pathname', parsedUrl.pathname.replace(/\/+$/, ''));

  // store the sanitized url
  this.url = parsedUrl.href;
  debug('using url', this.url);

  // Step 7 - start connection in background
  // obtain server info
  // http://sockjs.github.io/sockjs-protocol/sockjs-protocol-0.3.3.html#section-26
  this._urlInfo = {
    nullOrigin: !browser.hasDomain()
  , sameOrigin: urlUtils.isOriginEqual(this.url, loc.href)
  , sameScheme: urlUtils.isSchemeEqual(this.url, loc.href)
  };

  this._ir = new InfoReceiver(this.url, this._urlInfo);
  this._ir.once('finish', this._receiveInfo.bind(this));
}

inherits(SockJS, EventTarget);

function userSetCode(code) {
  return code === 1000 || (code >= 3000 && code <= 4999);
}

SockJS.prototype.close = function(code, reason) {
  // Step 1
  if (code && !userSetCode(code)) {
    throw new Error('InvalidAccessError: Invalid code');
  }
  // Step 2.4 states the max is 123 bytes, but we are just checking length
  if (reason && reason.length > 123) {
    throw new SyntaxError('reason argument has an invalid length');
  }

  // Step 3.1
  if (this.readyState === SockJS.CLOSING || this.readyState === SockJS.CLOSED) {
    return;
  }

  // TODO look at docs to determine how to set this
  var wasClean = true;
  this._close(code || 1000, reason || 'Normal closure', wasClean);
};

SockJS.prototype.send = function(data) {
  // #13 - convert anything non-string to string
  // TODO this currently turns objects into [object Object]
  if (typeof data !== 'string') {
    data = '' + data;
  }
  if (this.readyState === SockJS.CONNECTING) {
    throw new Error('InvalidStateError: The connection has not been established yet');
  }
  if (this.readyState !== SockJS.OPEN) {
    return;
  }
  this._transport.send(escape.quote(data));
};

SockJS.version = __webpack_require__(81);

SockJS.CONNECTING = 0;
SockJS.OPEN = 1;
SockJS.CLOSING = 2;
SockJS.CLOSED = 3;

SockJS.prototype._receiveInfo = function(info, rtt) {
  debug('_receiveInfo', rtt);
  this._ir = null;
  if (!info) {
    this._close(1002, 'Cannot connect to server');
    return;
  }

  // establish a round-trip timeout (RTO) based on the
  // round-trip time (RTT)
  this._rto = this.countRTO(rtt);
  // allow server to override url used for the actual transport
  this._transUrl = info.base_url ? info.base_url : this.url;
  info = objectUtils.extend(info, this._urlInfo);
  debug('info', info);
  // determine list of desired and supported transports
  var enabledTransports = transports.filterToEnabled(this._transportsWhitelist, info);
  this._transports = enabledTransports.main;
  debug(this._transports.length + ' enabled transports');

  this._connect();
};

SockJS.prototype._connect = function() {
  for (var Transport = this._transports.shift(); Transport; Transport = this._transports.shift()) {
    debug('attempt', Transport.transportName);
    if (Transport.needBody) {
      if (!global.document.body ||
          (typeof global.document.readyState !== 'undefined' &&
            global.document.readyState !== 'complete' &&
            global.document.readyState !== 'interactive')) {
        debug('waiting for body');
        this._transports.unshift(Transport);
        eventUtils.attachEvent('load', this._connect.bind(this));
        return;
      }
    }

    // calculate timeout based on RTO and round trips. Default to 5s
    var timeoutMs = Math.max(this._timeout, (this._rto * Transport.roundTrips) || 5000);
    this._transportTimeoutId = setTimeout(this._transportTimeout.bind(this), timeoutMs);
    debug('using timeout', timeoutMs);

    var transportUrl = urlUtils.addPath(this._transUrl, '/' + this._server + '/' + this._generateSessionId());
    var options = this._transportOptions[Transport.transportName];
    debug('transport url', transportUrl);
    var transportObj = new Transport(transportUrl, this._transUrl, options);
    transportObj.on('message', this._transportMessage.bind(this));
    transportObj.once('close', this._transportClose.bind(this));
    transportObj.transportName = Transport.transportName;
    this._transport = transportObj;

    return;
  }
  this._close(2000, 'All transports failed', false);
};

SockJS.prototype._transportTimeout = function() {
  debug('_transportTimeout');
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transport) {
      this._transport.close();
    }

    this._transportClose(2007, 'Transport timed out');
  }
};

SockJS.prototype._transportMessage = function(msg) {
  debug('_transportMessage', msg);
  var self = this
    , type = msg.slice(0, 1)
    , content = msg.slice(1)
    , payload
    ;

  // first check for messages that don't need a payload
  switch (type) {
    case 'o':
      this._open();
      return;
    case 'h':
      this.dispatchEvent(new Event('heartbeat'));
      debug('heartbeat', this.transport);
      return;
  }

  if (content) {
    try {
      payload = JSON3.parse(content);
    } catch (e) {
      debug('bad json', content);
    }
  }

  if (typeof payload === 'undefined') {
    debug('empty payload', content);
    return;
  }

  switch (type) {
    case 'a':
      if (Array.isArray(payload)) {
        payload.forEach(function(p) {
          debug('message', self.transport, p);
          self.dispatchEvent(new TransportMessageEvent(p));
        });
      }
      break;
    case 'm':
      debug('message', this.transport, payload);
      this.dispatchEvent(new TransportMessageEvent(payload));
      break;
    case 'c':
      if (Array.isArray(payload) && payload.length === 2) {
        this._close(payload[0], payload[1], true);
      }
      break;
  }
};

SockJS.prototype._transportClose = function(code, reason) {
  debug('_transportClose', this.transport, code, reason);
  if (this._transport) {
    this._transport.removeAllListeners();
    this._transport = null;
    this.transport = null;
  }

  if (!userSetCode(code) && code !== 2000 && this.readyState === SockJS.CONNECTING) {
    this._connect();
    return;
  }

  this._close(code, reason);
};

SockJS.prototype._open = function() {
  debug('_open', this._transport && this._transport.transportName, this.readyState);
  if (this.readyState === SockJS.CONNECTING) {
    if (this._transportTimeoutId) {
      clearTimeout(this._transportTimeoutId);
      this._transportTimeoutId = null;
    }
    this.readyState = SockJS.OPEN;
    this.transport = this._transport.transportName;
    this.dispatchEvent(new Event('open'));
    debug('connected', this.transport);
  } else {
    // The server might have been restarted, and lost track of our
    // connection.
    this._close(1006, 'Server lost session');
  }
};

SockJS.prototype._close = function(code, reason, wasClean) {
  debug('_close', this.transport, code, reason, wasClean, this.readyState);
  var forceFail = false;

  if (this._ir) {
    forceFail = true;
    this._ir.close();
    this._ir = null;
  }
  if (this._transport) {
    this._transport.close();
    this._transport = null;
    this.transport = null;
  }

  if (this.readyState === SockJS.CLOSED) {
    throw new Error('InvalidStateError: SockJS has already been closed');
  }

  this.readyState = SockJS.CLOSING;
  setTimeout(function() {
    this.readyState = SockJS.CLOSED;

    if (forceFail) {
      this.dispatchEvent(new Event('error'));
    }

    var e = new CloseEvent('close');
    e.wasClean = wasClean || false;
    e.code = code || 1000;
    e.reason = reason;

    this.dispatchEvent(e);
    this.onmessage = this.onclose = this.onerror = null;
    debug('disconnected');
  }.bind(this), 0);
};

// See: http://www.erg.abdn.ac.uk/~gerrit/dccp/notes/ccid2/rto_estimator/
// and RFC 2988.
SockJS.prototype.countRTO = function(rtt) {
  // In a local environment, when using IE8/9 and the `jsonp-polling`
  // transport the time needed to establish a connection (the time that pass
  // from the opening of the transport to the call of `_dispatchOpen`) is
  // around 200msec (the lower bound used in the article above) and this
  // causes spurious timeouts. For this reason we calculate a value slightly
  // larger than that used in the article.
  if (rtt > 100) {
    return 4 * rtt; // rto > 400msec
  }
  return 300 + rtt; // 300msec < rto <= 400msec
};

module.exports = function(availableTransports) {
  transports = transport(availableTransports);
  __webpack_require__(106)(SockJS, availableTransports);
  return SockJS;
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable */
/* jscs: disable */


// pulled specific shims from https://github.com/es-shims/es5-shim

var ArrayPrototype = Array.prototype;
var ObjectPrototype = Object.prototype;
var FunctionPrototype = Function.prototype;
var StringPrototype = String.prototype;
var array_slice = ArrayPrototype.slice;

var _toString = ObjectPrototype.toString;
var isFunction = function (val) {
    return ObjectPrototype.toString.call(val) === '[object Function]';
};
var isArray = function isArray(obj) {
    return _toString.call(obj) === '[object Array]';
};
var isString = function isString(obj) {
    return _toString.call(obj) === '[object String]';
};

var supportsDescriptors = Object.defineProperty && (function () {
    try {
        Object.defineProperty({}, 'x', {});
        return true;
    } catch (e) { /* this is ES3 */
        return false;
    }
}());

// Define configurable, writable and non-enumerable props
// if they don't exist.
var defineProperty;
if (supportsDescriptors) {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        Object.defineProperty(object, name, {
            configurable: true,
            enumerable: false,
            writable: true,
            value: method
        });
    };
} else {
    defineProperty = function (object, name, method, forceAssign) {
        if (!forceAssign && (name in object)) { return; }
        object[name] = method;
    };
}
var defineProperties = function (object, map, forceAssign) {
    for (var name in map) {
        if (ObjectPrototype.hasOwnProperty.call(map, name)) {
          defineProperty(object, name, map[name], forceAssign);
        }
    }
};

var toObject = function (o) {
    if (o == null) { // this matches both null and undefined
        throw new TypeError("can't convert " + o + ' to object');
    }
    return Object(o);
};

//
// Util
// ======
//

// ES5 9.4
// http://es5.github.com/#x9.4
// http://jsperf.com/to-integer

function toInteger(num) {
    var n = +num;
    if (n !== n) { // isNaN
        n = 0;
    } else if (n !== 0 && n !== (1 / 0) && n !== -(1 / 0)) {
        n = (n > 0 || -1) * Math.floor(Math.abs(n));
    }
    return n;
}

function ToUint32(x) {
    return x >>> 0;
}

//
// Function
// ========
//

// ES-5 15.3.4.5
// http://es5.github.com/#x15.3.4.5

function Empty() {}

defineProperties(FunctionPrototype, {
    bind: function bind(that) { // .length is 1
        // 1. Let Target be the this value.
        var target = this;
        // 2. If IsCallable(Target) is false, throw a TypeError exception.
        if (!isFunction(target)) {
            throw new TypeError('Function.prototype.bind called on incompatible ' + target);
        }
        // 3. Let A be a new (possibly empty) internal list of all of the
        //   argument values provided after thisArg (arg1, arg2 etc), in order.
        // XXX slicedArgs will stand in for "A" if used
        var args = array_slice.call(arguments, 1); // for normal call
        // 4. Let F be a new native ECMAScript object.
        // 11. Set the [[Prototype]] internal property of F to the standard
        //   built-in Function prototype object as specified in 15.3.3.1.
        // 12. Set the [[Call]] internal property of F as described in
        //   15.3.4.5.1.
        // 13. Set the [[Construct]] internal property of F as described in
        //   15.3.4.5.2.
        // 14. Set the [[HasInstance]] internal property of F as described in
        //   15.3.4.5.3.
        var binder = function () {

            if (this instanceof bound) {
                // 15.3.4.5.2 [[Construct]]
                // When the [[Construct]] internal method of a function object,
                // F that was created using the bind function is called with a
                // list of arguments ExtraArgs, the following steps are taken:
                // 1. Let target be the value of F's [[TargetFunction]]
                //   internal property.
                // 2. If target has no [[Construct]] internal method, a
                //   TypeError exception is thrown.
                // 3. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Construct]] internal
                //   method of target providing args as the arguments.

                var result = target.apply(
                    this,
                    args.concat(array_slice.call(arguments))
                );
                if (Object(result) === result) {
                    return result;
                }
                return this;

            } else {
                // 15.3.4.5.1 [[Call]]
                // When the [[Call]] internal method of a function object, F,
                // which was created using the bind function is called with a
                // this value and a list of arguments ExtraArgs, the following
                // steps are taken:
                // 1. Let boundArgs be the value of F's [[BoundArgs]] internal
                //   property.
                // 2. Let boundThis be the value of F's [[BoundThis]] internal
                //   property.
                // 3. Let target be the value of F's [[TargetFunction]] internal
                //   property.
                // 4. Let args be a new list containing the same values as the
                //   list boundArgs in the same order followed by the same
                //   values as the list ExtraArgs in the same order.
                // 5. Return the result of calling the [[Call]] internal method
                //   of target providing boundThis as the this value and
                //   providing args as the arguments.

                // equiv: target.call(this, ...boundArgs, ...args)
                return target.apply(
                    that,
                    args.concat(array_slice.call(arguments))
                );

            }

        };

        // 15. If the [[Class]] internal property of Target is "Function", then
        //     a. Let L be the length property of Target minus the length of A.
        //     b. Set the length own property of F to either 0 or L, whichever is
        //       larger.
        // 16. Else set the length own property of F to 0.

        var boundLength = Math.max(0, target.length - args.length);

        // 17. Set the attributes of the length own property of F to the values
        //   specified in 15.3.5.1.
        var boundArgs = [];
        for (var i = 0; i < boundLength; i++) {
            boundArgs.push('$' + i);
        }

        // XXX Build a dynamic function with desired amount of arguments is the only
        // way to set the length property of a function.
        // In environments where Content Security Policies enabled (Chrome extensions,
        // for ex.) all use of eval or Function costructor throws an exception.
        // However in all of these environments Function.prototype.bind exists
        // and so this code will never be executed.
        var bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this, arguments); }')(binder);

        if (target.prototype) {
            Empty.prototype = target.prototype;
            bound.prototype = new Empty();
            // Clean up dangling references.
            Empty.prototype = null;
        }

        // TODO
        // 18. Set the [[Extensible]] internal property of F to true.

        // TODO
        // 19. Let thrower be the [[ThrowTypeError]] function Object (13.2.3).
        // 20. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "caller", PropertyDescriptor {[[Get]]: thrower, [[Set]]:
        //   thrower, [[Enumerable]]: false, [[Configurable]]: false}, and
        //   false.
        // 21. Call the [[DefineOwnProperty]] internal method of F with
        //   arguments "arguments", PropertyDescriptor {[[Get]]: thrower,
        //   [[Set]]: thrower, [[Enumerable]]: false, [[Configurable]]: false},
        //   and false.

        // TODO
        // NOTE Function objects created using Function.prototype.bind do not
        // have a prototype property or the [[Code]], [[FormalParameters]], and
        // [[Scope]] internal properties.
        // XXX can't delete prototype in pure-js.

        // 22. Return F.
        return bound;
    }
});

//
// Array
// =====
//

// ES5 15.4.3.2
// http://es5.github.com/#x15.4.3.2
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/isArray
defineProperties(Array, { isArray: isArray });


var boxedString = Object('a');
var splitString = boxedString[0] !== 'a' || !(0 in boxedString);

var properlyBoxesContext = function properlyBoxed(method) {
    // Check node 0.6.21 bug where third parameter is not boxed
    var properlyBoxesNonStrict = true;
    var properlyBoxesStrict = true;
    if (method) {
        method.call('foo', function (_, __, context) {
            if (typeof context !== 'object') { properlyBoxesNonStrict = false; }
        });

        method.call([1], function () {
            'use strict';
            properlyBoxesStrict = typeof this === 'string';
        }, 'x');
    }
    return !!method && properlyBoxesNonStrict && properlyBoxesStrict;
};

defineProperties(ArrayPrototype, {
    forEach: function forEach(fun /*, thisp*/) {
        var object = toObject(this),
            self = splitString && isString(this) ? this.split('') : object,
            thisp = arguments[1],
            i = -1,
            length = self.length >>> 0;

        // If no callback function or if callback is not a callable function
        if (!isFunction(fun)) {
            throw new TypeError(); // TODO message
        }

        while (++i < length) {
            if (i in self) {
                // Invoke the callback function with call, passing arguments:
                // context, property value, property key, thisArg object
                // context
                fun.call(thisp, self[i], i, object);
            }
        }
    }
}, !properlyBoxesContext(ArrayPrototype.forEach));

// ES5 15.4.4.14
// http://es5.github.com/#x15.4.4.14
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Array/indexOf
var hasFirefox2IndexOfBug = Array.prototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
defineProperties(ArrayPrototype, {
    indexOf: function indexOf(sought /*, fromIndex */ ) {
        var self = splitString && isString(this) ? this.split('') : toObject(this),
            length = self.length >>> 0;

        if (!length) {
            return -1;
        }

        var i = 0;
        if (arguments.length > 1) {
            i = toInteger(arguments[1]);
        }

        // handle negative indices
        i = i >= 0 ? i : Math.max(0, length + i);
        for (; i < length; i++) {
            if (i in self && self[i] === sought) {
                return i;
            }
        }
        return -1;
    }
}, hasFirefox2IndexOfBug);

//
// String
// ======
//

// ES5 15.5.4.14
// http://es5.github.com/#x15.5.4.14

// [bugfix, IE lt 9, firefox 4, Konqueror, Opera, obscure browsers]
// Many browsers do not split properly with regular expressions or they
// do not perform the split correctly under obscure conditions.
// See http://blog.stevenlevithan.com/archives/cross-browser-split
// I've tested in many browsers and this seems to cover the deviant ones:
//    'ab'.split(/(?:ab)*/) should be ["", ""], not [""]
//    '.'.split(/(.?)(.?)/) should be ["", ".", "", ""], not ["", ""]
//    'tesst'.split(/(s)*/) should be ["t", undefined, "e", "s", "t"], not
//       [undefined, "t", undefined, "e", ...]
//    ''.split(/.?/) should be [], not [""]
//    '.'.split(/()()/) should be ["."], not ["", "", "."]

var string_split = StringPrototype.split;
if (
    'ab'.split(/(?:ab)*/).length !== 2 ||
    '.'.split(/(.?)(.?)/).length !== 4 ||
    'tesst'.split(/(s)*/)[1] === 't' ||
    'test'.split(/(?:)/, -1).length !== 4 ||
    ''.split(/.?/).length ||
    '.'.split(/()()/).length > 1
) {
    (function () {
        var compliantExecNpcg = /()??/.exec('')[1] === void 0; // NPCG: nonparticipating capturing group

        StringPrototype.split = function (separator, limit) {
            var string = this;
            if (separator === void 0 && limit === 0) {
                return [];
            }

            // If `separator` is not a regex, use native split
            if (_toString.call(separator) !== '[object RegExp]') {
                return string_split.call(this, separator, limit);
            }

            var output = [],
                flags = (separator.ignoreCase ? 'i' : '') +
                        (separator.multiline  ? 'm' : '') +
                        (separator.extended   ? 'x' : '') + // Proposed for ES6
                        (separator.sticky     ? 'y' : ''), // Firefox 3+
                lastLastIndex = 0,
                // Make `global` and avoid `lastIndex` issues by working with a copy
                separator2, match, lastIndex, lastLength;
            separator = new RegExp(separator.source, flags + 'g');
            string += ''; // Type-convert
            if (!compliantExecNpcg) {
                // Doesn't need flags gy, but they don't hurt
                separator2 = new RegExp('^' + separator.source + '$(?!\\s)', flags);
            }
            /* Values for `limit`, per the spec:
             * If undefined: 4294967295 // Math.pow(2, 32) - 1
             * If 0, Infinity, or NaN: 0
             * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
             * If negative number: 4294967296 - Math.floor(Math.abs(limit))
             * If other: Type-convert, then use the above rules
             */
            limit = limit === void 0 ?
                -1 >>> 0 : // Math.pow(2, 32) - 1
                ToUint32(limit);
            while (match = separator.exec(string)) {
                // `separator.lastIndex` is not reliable cross-browser
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                    output.push(string.slice(lastLastIndex, match.index));
                    // Fix browsers whose `exec` methods don't consistently return `undefined` for
                    // nonparticipating capturing groups
                    if (!compliantExecNpcg && match.length > 1) {
                        match[0].replace(separator2, function () {
                            for (var i = 1; i < arguments.length - 2; i++) {
                                if (arguments[i] === void 0) {
                                    match[i] = void 0;
                                }
                            }
                        });
                    }
                    if (match.length > 1 && match.index < string.length) {
                        ArrayPrototype.push.apply(output, match.slice(1));
                    }
                    lastLength = match[0].length;
                    lastLastIndex = lastIndex;
                    if (output.length >= limit) {
                        break;
                    }
                }
                if (separator.lastIndex === match.index) {
                    separator.lastIndex++; // Avoid an infinite loop
                }
            }
            if (lastLastIndex === string.length) {
                if (lastLength || !separator.test('')) {
                    output.push('');
                }
            } else {
                output.push(string.slice(lastLastIndex));
            }
            return output.length > limit ? output.slice(0, limit) : output;
        };
    }());

// [bugfix, chrome]
// If separator is undefined, then the result array contains just one String,
// which is the this value (converted to a String). If limit is not undefined,
// then the output array is truncated so that it contains no more than limit
// elements.
// "0".split(undefined, 0) -> []
} else if ('0'.split(void 0, 0).length) {
    StringPrototype.split = function split(separator, limit) {
        if (separator === void 0 && limit === 0) { return []; }
        return string_split.call(this, separator, limit);
    };
}

// ECMA-262, 3rd B.2.3
// Not an ECMAScript standard, although ECMAScript 3rd Edition has a
// non-normative section suggesting uniform semantics and it should be
// normalized across all browsers
// [bugfix, IE lt 9] IE < 9 substr() with negative value not working in IE
var string_substr = StringPrototype.substr;
var hasNegativeSubstrBug = ''.substr && '0b'.substr(-1) !== 'b';
defineProperties(StringPrototype, {
    substr: function substr(start, length) {
        return string_substr.call(
            this,
            start < 0 ? ((start = this.length + start) < 0 ? 0 : start) : start,
            length
        );
    }
}, hasNegativeSubstrBug);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JSON3 = __webpack_require__(78);

// Some extra characters that Chrome gets wrong, and substitutes with
// something else on the wire.
// eslint-disable-next-line no-control-regex
var extraEscapable = /[\x00-\x1f\ud800-\udfff\ufffe\uffff\u0300-\u0333\u033d-\u0346\u034a-\u034c\u0350-\u0352\u0357-\u0358\u035c-\u0362\u0374\u037e\u0387\u0591-\u05af\u05c4\u0610-\u0617\u0653-\u0654\u0657-\u065b\u065d-\u065e\u06df-\u06e2\u06eb-\u06ec\u0730\u0732-\u0733\u0735-\u0736\u073a\u073d\u073f-\u0741\u0743\u0745\u0747\u07eb-\u07f1\u0951\u0958-\u095f\u09dc-\u09dd\u09df\u0a33\u0a36\u0a59-\u0a5b\u0a5e\u0b5c-\u0b5d\u0e38-\u0e39\u0f43\u0f4d\u0f52\u0f57\u0f5c\u0f69\u0f72-\u0f76\u0f78\u0f80-\u0f83\u0f93\u0f9d\u0fa2\u0fa7\u0fac\u0fb9\u1939-\u193a\u1a17\u1b6b\u1cda-\u1cdb\u1dc0-\u1dcf\u1dfc\u1dfe\u1f71\u1f73\u1f75\u1f77\u1f79\u1f7b\u1f7d\u1fbb\u1fbe\u1fc9\u1fcb\u1fd3\u1fdb\u1fe3\u1feb\u1fee-\u1fef\u1ff9\u1ffb\u1ffd\u2000-\u2001\u20d0-\u20d1\u20d4-\u20d7\u20e7-\u20e9\u2126\u212a-\u212b\u2329-\u232a\u2adc\u302b-\u302c\uaab2-\uaab3\uf900-\ufa0d\ufa10\ufa12\ufa15-\ufa1e\ufa20\ufa22\ufa25-\ufa26\ufa2a-\ufa2d\ufa30-\ufa6d\ufa70-\ufad9\ufb1d\ufb1f\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40-\ufb41\ufb43-\ufb44\ufb46-\ufb4e\ufff0-\uffff]/g
  , extraLookup;

// This may be quite slow, so let's delay until user actually uses bad
// characters.
var unrollLookup = function(escapable) {
  var i;
  var unrolled = {};
  var c = [];
  for (i = 0; i < 65536; i++) {
    c.push( String.fromCharCode(i) );
  }
  escapable.lastIndex = 0;
  c.join('').replace(escapable, function(a) {
    unrolled[ a ] = '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
    return '';
  });
  escapable.lastIndex = 0;
  return unrolled;
};

// Quote string, also taking care of unicode characters that browsers
// often break. Especially, take care of unicode surrogates:
// http://en.wikipedia.org/wiki/Mapping_of_Unicode_characters#Surrogates
module.exports = {
  quote: function(string) {
    var quoted = JSON3.stringify(string);

    // In most cases this should be very fast and good enough.
    extraEscapable.lastIndex = 0;
    if (!extraEscapable.test(quoted)) {
      return quoted;
    }

    if (!extraLookup) {
      extraLookup = unrollLookup(extraEscapable);
    }

    return quoted.replace(extraEscapable, function(a) {
      return extraLookup[a];
    });
  }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:utils:transport');
}

module.exports = function(availableTransports) {
  return {
    filterToEnabled: function(transportsWhitelist, info) {
      var transports = {
        main: []
      , facade: []
      };
      if (!transportsWhitelist) {
        transportsWhitelist = [];
      } else if (typeof transportsWhitelist === 'string') {
        transportsWhitelist = [transportsWhitelist];
      }

      availableTransports.forEach(function(trans) {
        if (!trans) {
          return;
        }

        if (trans.transportName === 'websocket' && info.websocket === false) {
          debug('disabled from server', 'websocket');
          return;
        }

        if (transportsWhitelist.length &&
            transportsWhitelist.indexOf(trans.transportName) === -1) {
          debug('not in whitelist', trans.transportName);
          return;
        }

        if (trans.enabled(info)) {
          debug('enabled', trans.transportName);
          transports.main.push(trans);
          if (trans.facadeTransport) {
            transports.facade.push(trans.facadeTransport);
          }
        } else {
          debug('disabled', trans.transportName);
        }
      });
      return transports;
    }
  };
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var logObject = {};
['log', 'debug', 'warn'].forEach(function (level) {
  var levelExists;

  try {
    levelExists = global.console && global.console[level] && global.console[level].apply;
  } catch(e) {
    // do nothing
  }

  logObject[level] = levelExists ? function () {
    return global.console[level].apply(global.console, arguments);
  } : (level === 'log' ? function () {} : logObject.log);
});

module.exports = logObject;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function Event(eventType) {
  this.type = eventType;
}

Event.prototype.initEvent = function(eventType, canBubble, cancelable) {
  this.type = eventType;
  this.bubbles = canBubble;
  this.cancelable = cancelable;
  this.timeStamp = +new Date();
  return this;
};

Event.prototype.stopPropagation = function() {};
Event.prototype.preventDefault = function() {};

Event.CAPTURING_PHASE = 1;
Event.AT_TARGET = 2;
Event.BUBBLING_PHASE = 3;

module.exports = Event;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* Simplified implementation of DOM2 EventTarget.
 *   http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-EventTarget
 */

function EventTarget() {
  this._listeners = {};
}

EventTarget.prototype.addEventListener = function(eventType, listener) {
  if (!(eventType in this._listeners)) {
    this._listeners[eventType] = [];
  }
  var arr = this._listeners[eventType];
  // #4
  if (arr.indexOf(listener) === -1) {
    // Make a copy so as not to interfere with a current dispatchEvent.
    arr = arr.concat([listener]);
  }
  this._listeners[eventType] = arr;
};

EventTarget.prototype.removeEventListener = function(eventType, listener) {
  var arr = this._listeners[eventType];
  if (!arr) {
    return;
  }
  var idx = arr.indexOf(listener);
  if (idx !== -1) {
    if (arr.length > 1) {
      // Make a copy so as not to interfere with a current dispatchEvent.
      this._listeners[eventType] = arr.slice(0, idx).concat(arr.slice(idx + 1));
    } else {
      delete this._listeners[eventType];
    }
    return;
  }
};

EventTarget.prototype.dispatchEvent = function() {
  var event = arguments[0];
  var t = event.type;
  // equivalent of Array.prototype.slice.call(arguments, 0);
  var args = arguments.length === 1 ? [event] : Array.apply(null, arguments);
  // TODO: This doesn't match the real behavior; per spec, onfoo get
  // their place in line from the /first/ time they're set from
  // non-null. Although WebKit bumps it to the end every time it's
  // set.
  if (this['on' + t]) {
    this['on' + t].apply(this, args);
  }
  if (t in this._listeners) {
    // Grab a reference to the listeners list. removeEventListener may alter the list.
    var listeners = this._listeners[t];
    for (var i = 0; i < listeners.length; i++) {
      listeners[i].apply(this, args);
    }
  }
};

module.exports = EventTarget;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = global.location || {
  origin: 'http://localhost:80'
, protocol: 'http:'
, host: 'localhost'
, port: 80
, href: 'http://localhost/'
, hash: ''
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , Event = __webpack_require__(96)
  ;

function CloseEvent() {
  Event.call(this);
  this.initEvent('close', false, false);
  this.wasClean = false;
  this.code = 0;
  this.reason = '';
}

inherits(CloseEvent, Event);

module.exports = CloseEvent;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , Event = __webpack_require__(96)
  ;

function TransportMessageEvent(data) {
  Event.call(this);
  this.initEvent('message', false, false);
  this.data = data;
}

inherits(TransportMessageEvent, Event);

module.exports = TransportMessageEvent;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(21).EventEmitter
  , inherits = __webpack_require__(19)
  , urlUtils = __webpack_require__(8)
  , XDR = __webpack_require__(71)
  , XHRCors = __webpack_require__(64)
  , XHRLocal = __webpack_require__(68)
  , XHRFake = __webpack_require__(102)
  , InfoIframe = __webpack_require__(103)
  , InfoAjax = __webpack_require__(105)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:info-receiver');
}

function InfoReceiver(baseUrl, urlInfo) {
  debug(baseUrl);
  var self = this;
  EventEmitter.call(this);

  setTimeout(function() {
    self.doXhr(baseUrl, urlInfo);
  }, 0);
}

inherits(InfoReceiver, EventEmitter);

// TODO this is currently ignoring the list of available transports and the whitelist

InfoReceiver._getReceiver = function(baseUrl, url, urlInfo) {
  // determine method of CORS support (if needed)
  if (urlInfo.sameOrigin) {
    return new InfoAjax(url, XHRLocal);
  }
  if (XHRCors.enabled) {
    return new InfoAjax(url, XHRCors);
  }
  if (XDR.enabled && urlInfo.sameScheme) {
    return new InfoAjax(url, XDR);
  }
  if (InfoIframe.enabled()) {
    return new InfoIframe(baseUrl, url);
  }
  return new InfoAjax(url, XHRFake);
};

InfoReceiver.prototype.doXhr = function(baseUrl, urlInfo) {
  var self = this
    , url = urlUtils.addPath(baseUrl, '/info')
    ;
  debug('doXhr', url);

  this.xo = InfoReceiver._getReceiver(baseUrl, url, urlInfo);

  this.timeoutRef = setTimeout(function() {
    debug('timeout');
    self._cleanup(false);
    self.emit('finish');
  }, InfoReceiver.timeout);

  this.xo.once('finish', function(info, rtt) {
    debug('finish', info, rtt);
    self._cleanup(true);
    self.emit('finish', info, rtt);
  });
};

InfoReceiver.prototype._cleanup = function(wasClean) {
  debug('_cleanup');
  clearTimeout(this.timeoutRef);
  this.timeoutRef = null;
  if (!wasClean && this.xo) {
    this.xo.close();
  }
  this.xo = null;
};

InfoReceiver.prototype.close = function() {
  debug('close');
  this.removeAllListeners();
  this._cleanup(false);
};

InfoReceiver.timeout = 8000;

module.exports = InfoReceiver;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(21).EventEmitter
  , inherits = __webpack_require__(19)
  ;

function XHRFake(/* method, url, payload, opts */) {
  var self = this;
  EventEmitter.call(this);

  this.to = setTimeout(function() {
    self.emit('finish', 200, '{}');
  }, XHRFake.timeout);
}

inherits(XHRFake, EventEmitter);

XHRFake.prototype.close = function() {
  clearTimeout(this.to);
};

XHRFake.timeout = 2000;

module.exports = XHRFake;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(21).EventEmitter
  , inherits = __webpack_require__(19)
  , JSON3 = __webpack_require__(78)
  , utils = __webpack_require__(5)
  , IframeTransport = __webpack_require__(77)
  , InfoReceiverIframe = __webpack_require__(104)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:info-iframe');
}

function InfoIframe(baseUrl, url) {
  var self = this;
  EventEmitter.call(this);

  var go = function() {
    var ifr = self.ifr = new IframeTransport(InfoReceiverIframe.transportName, url, baseUrl);

    ifr.once('message', function(msg) {
      if (msg) {
        var d;
        try {
          d = JSON3.parse(msg);
        } catch (e) {
          debug('bad json', msg);
          self.emit('finish');
          self.close();
          return;
        }

        var info = d[0], rtt = d[1];
        self.emit('finish', info, rtt);
      }
      self.close();
    });

    ifr.once('close', function() {
      self.emit('finish');
      self.close();
    });
  };

  // TODO this seems the same as the 'needBody' from transports
  if (!global.document.body) {
    utils.attachEvent('load', go);
  } else {
    go();
  }
}

inherits(InfoIframe, EventEmitter);

InfoIframe.enabled = function() {
  return IframeTransport.enabled();
};

InfoIframe.prototype.close = function() {
  if (this.ifr) {
    this.ifr.close();
  }
  this.removeAllListeners();
  this.ifr = null;
};

module.exports = InfoIframe;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var inherits = __webpack_require__(19)
  , EventEmitter = __webpack_require__(21).EventEmitter
  , JSON3 = __webpack_require__(78)
  , XHRLocalObject = __webpack_require__(68)
  , InfoAjax = __webpack_require__(105)
  ;

function InfoReceiverIframe(transUrl) {
  var self = this;
  EventEmitter.call(this);

  this.ir = new InfoAjax(transUrl, XHRLocalObject);
  this.ir.once('finish', function(info, rtt) {
    self.ir = null;
    self.emit('message', JSON3.stringify([info, rtt]));
  });
}

inherits(InfoReceiverIframe, EventEmitter);

InfoReceiverIframe.transportName = 'iframe-info-receiver';

InfoReceiverIframe.prototype.close = function() {
  if (this.ir) {
    this.ir.close();
    this.ir = null;
  }
  this.removeAllListeners();
};

module.exports = InfoReceiverIframe;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var EventEmitter = __webpack_require__(21).EventEmitter
  , inherits = __webpack_require__(19)
  , JSON3 = __webpack_require__(78)
  , objectUtils = __webpack_require__(83)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:info-ajax');
}

function InfoAjax(url, AjaxObject) {
  EventEmitter.call(this);

  var self = this;
  var t0 = +new Date();
  this.xo = new AjaxObject('GET', url);

  this.xo.once('finish', function(status, text) {
    var info, rtt;
    if (status === 200) {
      rtt = (+new Date()) - t0;
      if (text) {
        try {
          info = JSON3.parse(text);
        } catch (e) {
          debug('bad json', text);
        }
      }

      if (!objectUtils.isObject(info)) {
        info = {};
      }
    }
    self.emit('finish', info, rtt);
    self.removeAllListeners();
  });
}

inherits(InfoAjax, EventEmitter);

InfoAjax.prototype.close = function() {
  this.removeAllListeners();
  this.xo.close();
};

module.exports = InfoAjax;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var urlUtils = __webpack_require__(8)
  , eventUtils = __webpack_require__(5)
  , JSON3 = __webpack_require__(78)
  , FacadeJS = __webpack_require__(107)
  , InfoIframeReceiver = __webpack_require__(104)
  , iframeUtils = __webpack_require__(82)
  , loc = __webpack_require__(98)
  ;

var debug = function() {};
if (true) {
  debug = __webpack_require__(12)('sockjs-client:iframe-bootstrap');
}

module.exports = function(SockJS, availableTransports) {
  var transportMap = {};
  availableTransports.forEach(function(at) {
    if (at.facadeTransport) {
      transportMap[at.facadeTransport.transportName] = at.facadeTransport;
    }
  });

  // hard-coded for the info iframe
  // TODO see if we can make this more dynamic
  transportMap[InfoIframeReceiver.transportName] = InfoIframeReceiver;
  var parentOrigin;

  /* eslint-disable camelcase */
  SockJS.bootstrap_iframe = function() {
    /* eslint-enable camelcase */
    var facade;
    iframeUtils.currentWindowId = loc.hash.slice(1);
    var onMessage = function(e) {
      if (e.source !== parent) {
        return;
      }
      if (typeof parentOrigin === 'undefined') {
        parentOrigin = e.origin;
      }
      if (e.origin !== parentOrigin) {
        return;
      }

      var iframeMessage;
      try {
        iframeMessage = JSON3.parse(e.data);
      } catch (ignored) {
        debug('bad json', e.data);
        return;
      }

      if (iframeMessage.windowId !== iframeUtils.currentWindowId) {
        return;
      }
      switch (iframeMessage.type) {
      case 's':
        var p;
        try {
          p = JSON3.parse(iframeMessage.data);
        } catch (ignored) {
          debug('bad json', iframeMessage.data);
          break;
        }
        var version = p[0];
        var transport = p[1];
        var transUrl = p[2];
        var baseUrl = p[3];
        debug(version, transport, transUrl, baseUrl);
        // change this to semver logic
        if (version !== SockJS.version) {
          throw new Error('Incompatible SockJS! Main site uses:' +
                    ' "' + version + '", the iframe:' +
                    ' "' + SockJS.version + '".');
        }

        if (!urlUtils.isOriginEqual(transUrl, loc.href) ||
            !urlUtils.isOriginEqual(baseUrl, loc.href)) {
          throw new Error('Can\'t connect to different domain from within an ' +
                    'iframe. (' + loc.href + ', ' + transUrl + ', ' + baseUrl + ')');
        }
        facade = new FacadeJS(new transportMap[transport](transUrl, baseUrl));
        break;
      case 'm':
        facade._send(iframeMessage.data);
        break;
      case 'c':
        if (facade) {
          facade._close();
        }
        facade = null;
        break;
      }
    };

    eventUtils.attachEvent('message', onMessage);

    // Start
    iframeUtils.postMessage('s');
  };
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var JSON3 = __webpack_require__(78)
  , iframeUtils = __webpack_require__(82)
  ;

function FacadeJS(transport) {
  this._transport = transport;
  transport.on('message', this._transportMessage.bind(this));
  transport.on('close', this._transportClose.bind(this));
}

FacadeJS.prototype._transportClose = function(code, reason) {
  iframeUtils.postMessage('c', JSON3.stringify([code, reason]));
};
FacadeJS.prototype._transportMessage = function(frame) {
  iframeUtils.postMessage('t', frame);
};
FacadeJS.prototype._send = function(data) {
  this._transport.send(data);
};
FacadeJS.prototype._close = function() {
  this._transport.close();
  this._transport.removeAllListeners();
};

module.exports = FacadeJS;


/***/ })
/******/ ]);
