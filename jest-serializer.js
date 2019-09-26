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


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.deserialize = deserialize;
exports.serialize = serialize;
exports.readFileSync = readFileSync;
exports.writeFileSync = writeFileSync;
exports.default = void 0;

function _fs() {
  const data = _interopRequireDefault(__webpack_require__(3));

  _fs = function _fs() {
    return data;
  };

  return data;
}

function _v() {
  const data = _interopRequireDefault(__webpack_require__(4));

  _v = function _v() {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// TODO: Remove this
/// <reference path="../v8.d.ts" />
// JSON and V8 serializers are both stable when it comes to compatibility. The
// current JSON specification is well defined in RFC 8259, and V8 ensures that
// the versions are compatible by encoding the serialization version in the own
// generated buffer.
const JS_TYPE = '__$t__';
const JS_VALUE = '__$v__';
const JS_VF = '__$f__';

function replacer(_key, value) {
  // NaN cannot be in a switch statement, because NaN !== NaN.
  if (Number.isNaN(value)) {
    return {
      [JS_TYPE]: 'n'
    };
  }

  switch (value) {
    case undefined:
      return {
        [JS_TYPE]: 'u'
      };

    case +Infinity:
      return {
        [JS_TYPE]: '+'
      };

    case -Infinity:
      return {
        [JS_TYPE]: '-'
      };
  }

  switch (value && value.constructor) {
    case Date:
      return {
        [JS_TYPE]: 'd',
        [JS_VALUE]: value.getTime()
      };

    case RegExp:
      return {
        [JS_TYPE]: 'r',
        [JS_VALUE]: value.source,
        [JS_VF]: value.flags
      };

    case Set:
      return {
        [JS_TYPE]: 's',
        [JS_VALUE]: Array.from(value)
      };

    case Map:
      return {
        [JS_TYPE]: 'm',
        [JS_VALUE]: Array.from(value)
      };

    case Buffer:
      return {
        [JS_TYPE]: 'b',
        [JS_VALUE]: value.toString('latin1')
      };
  }

  return value;
}

function reviver(_key, value) {
  if (!value || (typeof value !== 'object' && !value.hasOwnProperty(JS_TYPE))) {
    return value;
  }

  switch (value[JS_TYPE]) {
    case 'u':
      return undefined;

    case 'n':
      return NaN;

    case '+':
      return +Infinity;

    case '-':
      return -Infinity;

    case 'd':
      return new Date(value[JS_VALUE]);

    case 'r':
      return new RegExp(value[JS_VALUE], value[JS_VF]);

    case 's':
      return new Set(value[JS_VALUE]);

    case 'm':
      return new Map(value[JS_VALUE]);

    case 'b':
      return Buffer.from(value[JS_VALUE], 'latin1');
  }

  return value;
}

function jsonStringify(content) {
  // Not pretty, but the ES JSON spec says that "toJSON" will be called before
  // getting into your replacer, so we have to remove them beforehand. See
  // https://www.ecma-international.org/ecma-262/#sec-serializejsonproperty
  // section 2.b for more information.
  const dateToJSON = Date.prototype.toJSON;
  const bufferToJSON = Buffer.prototype.toJSON;
  /* eslint-disable no-extend-native */

  try {
    // @ts-ignore intentional removal of "toJSON" property.
    Date.prototype.toJSON = undefined; // @ts-ignore intentional removal of "toJSON" property.

    Buffer.prototype.toJSON = undefined;
    return JSON.stringify(content, replacer);
  } finally {
    Date.prototype.toJSON = dateToJSON;
    Buffer.prototype.toJSON = bufferToJSON;
  }
  /* eslint-enable no-extend-native */
}

function jsonParse(content) {
  return JSON.parse(content, reviver);
} // In memory functions.

function deserialize(buffer) {
  return _v().default.deserialize
    ? _v().default.deserialize(buffer)
    : jsonParse(buffer.toString('utf8'));
}

function serialize(content) {
  return _v().default.serialize
    ? _v().default.serialize(content)
    : Buffer.from(jsonStringify(content));
} // Synchronous filesystem functions.

function readFileSync(filePath) {
  return _v().default.deserialize
    ? _v().default.deserialize(_fs().default.readFileSync(filePath))
    : jsonParse(_fs().default.readFileSync(filePath, 'utf8'));
}

function writeFileSync(filePath, content) {
  return _v().default.serialize
    ? _fs().default.writeFileSync(filePath, _v().default.serialize(content))
    : _fs().default.writeFileSync(filePath, jsonStringify(content), 'utf8');
}

var _default = {
  deserialize,
  readFileSync,
  serialize,
  writeFileSync
};
exports.default = _default;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("v8");

/***/ })
/******/ ]);
