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


// Detect either spaces or tabs but not both to properly handle tabs for indentation and spaces for alignment
const INDENT_REGEX = /^(?:( )+|\t+)/;

function getMostUsed(indents) {
	let result = 0;
	let maxUsed = 0;
	let maxWeight = 0;

	for (const [key, [usedCount, weight]] of indents) {
		if (usedCount > maxUsed || (usedCount === maxUsed && weight > maxWeight)) {
			maxUsed = usedCount;
			maxWeight = weight;
			result = key;
		}
	}

	return result;
}

module.exports = string => {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}

	// Remember the size of previous line's indentation
	let previousSize = 0;
	let previousIndentType;

	// Indents key (ident type + size of the indents/unindents)
	let key;

	// Remember how many indents/unindents have occurred for a given size and how many lines follow a given indentation.
	// The key is a concatenation of the indentation type (s = space and t = tab) and the size of the indents/unindents.
	//
	// indents = {
	//    t3: [1, 0],
	//    t4: [1, 5],
	//    s5: [1, 0],
	//   s12: [1, 0],
	// }
	const indents = new Map();

	for (const line of string.split(/\n/g)) {
		if (!line) {
			// Ignore empty lines
			continue;
		}

		let indent;
		let indentType;
		let weight;
		let entry;
		const matches = line.match(INDENT_REGEX);

		if (matches === null) {
			previousSize = 0;
			previousIndentType = '';
		} else {
			indent = matches[0].length;

			if (matches[1]) {
				indentType = 's';
			} else {
				indentType = 't';
			}

			if (indentType !== previousIndentType) {
				previousSize = 0;
			}

			previousIndentType = indentType;

			weight = 0;

			const indentDifference = indent - previousSize;
			previousSize = indent;

			// Previous line have same indent?
			if (indentDifference === 0) {
				weight++;
				// We use the key from previous loop
			} else {
				key = indentType + String(indentDifference > 0 ? indentDifference : -indentDifference);
			}

			// Update the stats
			entry = indents.get(key);

			if (entry === undefined) {
				entry = [1, 0]; // Init
			} else {
				entry = [++entry[0], entry[1] + weight];
			}

			indents.set(key, entry);
		}
	}

	const result = getMostUsed(indents);

	let amount = 0;
	let type;
	let indent = '';

	if (result !== 0) {
		amount = Number(result.slice(1));

		if (result[0] === 's') {
			type = 'space';
			indent = ' '.repeat(amount);
		} else {
			type = 'tab';
			indent = '\t'.repeat(amount);
		}
	}

	return {
		amount,
		type,
		indent
	};
};


/***/ })
/******/ ]);
