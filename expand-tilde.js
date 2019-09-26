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
 * expand-tilde <https://github.com/jonschlinkert/expand-tilde>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

var homedir = __webpack_require__(3);
var path = __webpack_require__(8);

module.exports = function expandTilde(filepath) {
  var home = homedir();

  if (filepath.charCodeAt(0) === 126 /* ~ */) {
    if (filepath.charCodeAt(1) === 43 /* + */) {
      return path.join(process.cwd(), filepath.slice(2));
    }
    return home ? path.join(home, filepath.slice(1)) : filepath;
  }

  return filepath;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var os = __webpack_require__(4);
if (typeof os.homedir !== 'undefined') {
  module.exports = os.homedir;
} else {
  module.exports = __webpack_require__(5);
}



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(6);
var parse = __webpack_require__(7);

function homedir() {
  // The following logic is from looking at logic used in the different platform
  // versions of the uv_os_homedir function found in https://github.com/libuv/libuv
  // This is the function used in modern versions of node.js

  if (process.platform === 'win32') {
    // check the USERPROFILE first
    if (process.env.USERPROFILE) {
      return process.env.USERPROFILE;
    }

    // check HOMEDRIVE and HOMEPATH
    if (process.env.HOMEDRIVE && process.env.HOMEPATH) {
      return process.env.HOMEDRIVE + process.env.HOMEPATH;
    }

    // fallback to HOME
    if (process.env.HOME) {
      return process.env.HOME;
    }

    return null;
  }

  // check HOME environment variable first
  if (process.env.HOME) {
    return process.env.HOME;
  }

  // on linux platforms (including OSX) find the current user and get their homedir from the /etc/passwd file
  var passwd = tryReadFileSync('/etc/passwd');
  var home = find(parse(passwd), getuid());
  if (home) {
    return home;
  }

  // fallback to using user environment variables
  var user = process.env.LOGNAME || process.env.USER || process.env.LNAME || process.env.USERNAME;

  if (!user) {
    return null;
  }

  if (process.platform === 'darwin') {
    return '/Users/' + user;
  }

  return '/home/' + user;
}

function find(arr, uid) {
  var len = arr.length;
  for (var i = 0; i < len; i++) {
    if (+arr[i].uid === uid) {
      return arr[i].homedir;
    }
  }
}

function getuid() {
  if (typeof process.geteuid === 'function') {
    return process.geteuid();
  }
  return process.getuid();
}

function tryReadFileSync(fp) {
  try {
    return fs.readFileSync(fp, 'utf8');
  } catch (err) {
    return '';
  }
}

module.exports = homedir;



/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Parse the content of a passwd file into a list of user objects.
 * This function ignores blank lines and comments.
 *
 * ```js
 * // assuming '/etc/passwd' contains:
 * // doowb:*:123:123:Brian Woodward:/Users/doowb:/bin/bash
 * console.log(parse(fs.readFileSync('/etc/passwd', 'utf8')));
 *
 * //=> [
 * //=>   {
 * //=>     username: 'doowb',
 * //=>     password: '*',
 * //=>     uid: '123',
 * //=>     gid: '123',
 * //=>     gecos: 'Brian Woodward',
 * //=>     homedir: '/Users/doowb',
 * //=>     shell: '/bin/bash'
 * //=>   }
 * //=> ]
 * ```
 * @param  {String} `content` Content of a passwd file to parse.
 * @return {Array} Array of user objects parsed from the content.
 * @api public
 */

module.exports = function(content) {
  if (typeof content !== 'string') {
    throw new Error('expected a string');
  }
  return content
    .split('\n')
    .map(user)
    .filter(Boolean);
};

function user(line, i) {
  if (!line || !line.length || line.charAt(0) === '#') {
    return null;
  }

  // see https://en.wikipedia.org/wiki/Passwd for field descriptions
  var fields = line.split(':');
  return {
    username: fields[0],
    password: fields[1],
    uid: fields[2],
    gid: fields[3],
    // see https://en.wikipedia.org/wiki/Gecos_field for GECOS field descriptions
    gecos: fields[4],
    homedir: fields[5],
    shell: fields[6]
  };
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ })
/******/ ]);
