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


module.exports = (input, options = {}, fn) => {
  if (typeof input !== 'string') throw new TypeError('expected a string');

  if (typeof options === 'function') {
    fn = options;
    options = {};
  }

  let separator = options.separator || '.';
  let ast = { type: 'root', nodes: [], stash: [''] };
  let stack = [ast];
  let state = { input, separator, stack };
  let string = input;
  let value, node;
  let i = -1;

  state.bos = () => i === 0;
  state.eos = () => i === string.length;
  state.prev = () => string[i - 1];
  state.next = () => string[i + 1];

  let quotes = options.quotes || [];
  let openers = options.brackets || {};

  if (options.brackets === true) {
    openers = { '[': ']', '(': ')', '{': '}', '<': '>' };
  }
  if (options.quotes === true) {
    quotes = ['"', '\'', '`'];
  }

  let closers = invert(openers);
  let keep = options.keep || (value => value !== '\\');

  const block = () => (state.block = stack[stack.length - 1]);
  const peek = () => string[i + 1];
  const next = () => string[++i];
  const append = value => {
    state.value = value;
    if (value && keep(value, state) !== false) {
      state.block.stash[state.block.stash.length - 1] += value;
    }
  };

  const closeIndex = (value, startIdx) => {
    let idx = string.indexOf(value, startIdx);
    if (idx > -1 && string[idx - 1] === '\\') {
      idx = closeIndex(value, idx + 1);
    }
    return idx;
  };

  for (; i < string.length - 1;) {
    state.value = value = next();
    state.index = i;
    block();

    // handle escaped characters
    if (value === '\\') {
      if (peek() === '\\') {
        append(value + next());
      } else {
        // if the next char is not '\\', allow the "append" function
        // to determine if the backslashes should be added
        append(value);
        append(next());
      }
      continue;
    }

    // handle quoted strings
    if (quotes.includes(value)) {
      let pos = i + 1;
      let idx = closeIndex(value, pos);

      if (idx > -1) {
        append(value); // append opening quote
        append(string.slice(pos, idx)); // append quoted string
        append(string[idx]); // append closing quote
        i = idx;
        continue;
      }

      append(value);
      continue;
    }

    // handle opening brackets, if not disabled
    if (options.brackets !== false && openers[value]) {
      node = { type: 'bracket', nodes: [] };
      node.stash = keep(value) !== false ? [value] : [''];
      node.parent = state.block;
      state.block.nodes.push(node);
      stack.push(node);
      continue;
    }

    // handle closing brackets, if not disabled
    if (options.brackets !== false && closers[value]) {
      if (stack.length === 1) {
        append(value);
        continue;
      }

      append(value);
      node = stack.pop();
      block();
      append(node.stash.join(''));
      continue;
    }

    // push separator onto stash
    if (value === separator && state.block.type === 'root') {
      if (typeof fn === 'function' && fn(state) === false) {
        append(value);
        continue;
      }
      state.block.stash.push('');
      continue;
    }

    // append value onto the last string on the stash
    append(value);
  }

  node = stack.pop();

  while (node !== ast) {
    if (options.strict === true) {
      let column = i - node.stash.length + 1;
      throw new SyntaxError(`Unmatched: "${node.stash[0]}", at column ${column}`);
    }

    value = (node.parent.stash.pop() + node.stash.join('.'));
    node.parent.stash = node.parent.stash.concat(value.split('.'));
    node = stack.pop();
  }

  return node.stash;
};

function invert(obj) {
  let inverted = {};
  for (const key of Object.keys(obj)) inverted[obj[key]] = key;
  return inverted;
}


/***/ })
/******/ ]);
