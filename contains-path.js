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


var startsWith = __webpack_require__(3);
var normalizePath = __webpack_require__(4);

function containsPath(filepath, substr, options) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  if (typeof substr !== 'string') {
    throw new TypeError('expected substring to be a string');
  }

  if (substr === '') {
    return false;
  }

  // return true if the given strings are an exact match
  if (filepath === substr) {
    return true;
  }

  if (substr.charAt(0) === '!') {
    return !containsPath(filepath, substr.slice(1), options);
  }

  options = options || {};
  if (options.nocase === true) {
    filepath = filepath.toLowerCase();
    substr = substr.toLowerCase();
  }

  var fp = normalize(filepath, false);
  var str = normalize(substr, false);

  // return false if the normalized substring is only a slash
  if (str === '/') {
    return false;
  }

  // if normalized strings are equal, return true
  if (fp === str) {
    return true;
  }

  if (startsWith(filepath, substr, options)) {
    return true;
  }

  var idx = fp.indexOf(str);
  var prefix = substr.slice(0, 2);

  // if the original substring started with "./", we'll
  // assume it should match from the beginning of the string
  if (prefix === './' || prefix === '.\\') {
    return idx === 0;
  }

  if (idx !== -1) {
    if (options.partialMatch === true) {
      return true;
    }

    // if the first character in the substring is a
    // dot or slash, we can consider this a match
    var ch = str.charAt(0);
    if (ch === '/') {
      return true;
    }

    // since partial matches were not enabled, we only consider
    // this a match if the next character is a dot or a slash
    var before = fp.charAt(idx - 1);
    var after = fp.charAt(idx + str.length);
    return (before === '' || before === '/')
      && (after === '' || after === '/');
  }

  return false;
}

/**
 * Normalize paths
 */

function normalize(str) {
  str = normalizePath(str, false);
  if (str.slice(0, 2) === './') {
    str = str.slice(2);
  }
  return str;
}

/**
 * Expose `containsPath`
 */

module.exports = containsPath;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var normalizePath = __webpack_require__(4);

module.exports = function startsWith(filepath, substr, options) {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }
  if (typeof substr !== 'string') {
    throw new TypeError('expected substring to be a string');
  }

  if (substr === '') {
    return false;
  }

  options = options || {};
  if (options.exact === true) {
    return filepath.indexOf(substr) === 0;
  }

  if (options.nocase === true) {
    substr = substr.toLowerCase();
    filepath = filepath.toLowerCase();
  }

  // return true if the given strings are an exact match
  if (filepath === substr) {
    return true;
  }

  if (substr.charAt(0) === '!') {
    return !startsWith(filepath, substr.slice(1), options);
  }

  var substrSlashes = leadingSlashes(substr);
  var filepathSlashes = leadingSlashes(filepath);

  // normalize slashes in substring and filepath
  var str = normalize(substr, false);
  var fp = normalize(filepath, false);

  // return if normalized strings are an exact match,
  // or if substring consists of only slashes
  if (substrSlashes === substr.length || fp === str) {
    return filepathSlashes === substrSlashes;
  }

  if (fp.indexOf(str) === 0) {
    if (options.partialMatch === true) {
      return true;
    }

    // handle "C:/foo" matching "C:/"
    if (str.slice(-1) === '/' && /^\w+:/.test(fp)) {
      return true;
    }

    var ch = fp.charAt(str.length);
    return ch === '' || ch === '/';
  }

  return false;
};

function leadingSlashes(str) {
  var i = 0;
  for (; i < str.length; i++) {
    var ch = str[i];
    if (ch !== '/' && ch !== '\\') {
      break;
    }
  }
  return i;
}

function normalize(str) {
  str = normalizePath(str, false);
  if (str.slice(0, 2) === './') {
    str = str.slice(2);
  }
  return str;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var removeTrailingSeparator = __webpack_require__(5);

module.exports = function normalizePath(str, stripTrailing) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/[\\\/]+/g, '/');
  if (stripTrailing !== false) {
    str = removeTrailingSeparator(str);
  }
  return str;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var isWin = process.platform === 'win32';

module.exports = function (str) {
	var i = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
};

function isSeparator(str, i) {
	var char = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}


/***/ })
/******/ ]);
