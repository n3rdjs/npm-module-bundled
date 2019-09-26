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


/*!
 *  Copyright 2010 LearnBoost <dev@learnboost.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Module dependencies.
 */

var crypto = __webpack_require__(3)
  , parse = __webpack_require__(4).parse
  ;

/**
 * Valid keys.
 */

var keys = 
  [ 'acl'
  , 'location'
  , 'logging'
  , 'notification'
  , 'partNumber'
  , 'policy'
  , 'requestPayment'
  , 'torrent'
  , 'uploadId'
  , 'uploads'
  , 'versionId'
  , 'versioning'
  , 'versions'
  , 'website'
  ]

/**
 * Return an "Authorization" header value with the given `options`
 * in the form of "AWS <key>:<signature>"
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */

function authorization (options) {
  return 'AWS ' + options.key + ':' + sign(options)
}

module.exports = authorization
module.exports.authorization = authorization

/**
 * Simple HMAC-SHA1 Wrapper
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */ 

function hmacSha1 (options) {
  return crypto.createHmac('sha1', options.secret).update(options.message).digest('base64')
}

module.exports.hmacSha1 = hmacSha1

/**
 * Create a base64 sha1 HMAC for `options`. 
 * 
 * @param {Object} options
 * @return {String}
 * @api private
 */

function sign (options) {
  options.message = stringToSign(options)
  return hmacSha1(options)
}
module.exports.sign = sign

/**
 * Create a base64 sha1 HMAC for `options`. 
 *
 * Specifically to be used with S3 presigned URLs
 * 
 * @param {Object} options
 * @return {String}
 * @api private
 */

function signQuery (options) {
  options.message = queryStringToSign(options)
  return hmacSha1(options)
}
module.exports.signQuery= signQuery

/**
 * Return a string for sign() with the given `options`.
 *
 * Spec:
 * 
 *    <verb>\n
 *    <md5>\n
 *    <content-type>\n
 *    <date>\n
 *    [headers\n]
 *    <resource>
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */

function stringToSign (options) {
  var headers = options.amazonHeaders || ''
  if (headers) headers += '\n'
  var r = 
    [ options.verb
    , options.md5
    , options.contentType
    , options.date ? options.date.toUTCString() : ''
    , headers + options.resource
    ]
  return r.join('\n')
}
module.exports.stringToSign = stringToSign

/**
 * Return a string for sign() with the given `options`, but is meant exclusively
 * for S3 presigned URLs
 *
 * Spec:
 * 
 *    <date>\n
 *    <resource>
 *
 * @param {Object} options
 * @return {String}
 * @api private
 */

function queryStringToSign (options){
  return 'GET\n\n\n' + options.date + '\n' + options.resource
}
module.exports.queryStringToSign = queryStringToSign

/**
 * Perform the following:
 *
 *  - ignore non-amazon headers
 *  - lowercase fields
 *  - sort lexicographically
 *  - trim whitespace between ":"
 *  - join with newline
 *
 * @param {Object} headers
 * @return {String}
 * @api private
 */

function canonicalizeHeaders (headers) {
  var buf = []
    , fields = Object.keys(headers)
    ;
  for (var i = 0, len = fields.length; i < len; ++i) {
    var field = fields[i]
      , val = headers[field]
      , field = field.toLowerCase()
      ;
    if (0 !== field.indexOf('x-amz')) continue
    buf.push(field + ':' + val)
  }
  return buf.sort().join('\n')
}
module.exports.canonicalizeHeaders = canonicalizeHeaders

/**
 * Perform the following:
 *
 *  - ignore non sub-resources
 *  - sort lexicographically
 *
 * @param {String} resource
 * @return {String}
 * @api private
 */

function canonicalizeResource (resource) {
  var url = parse(resource, true)
    , path = url.pathname
    , buf = []
    ;

  Object.keys(url.query).forEach(function(key){
    if (!~keys.indexOf(key)) return
    var val = '' == url.query[key] ? '' : '=' + encodeURIComponent(url.query[key])
    buf.push(key + val)
  })

  return path + (buf.length ? '?' + buf.sort().join('&') : '')
}
module.exports.canonicalizeResource = canonicalizeResource


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })
/******/ ]);
