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

const parse = __webpack_require__(3);
const serialize = __webpack_require__(5);
const {
  asciiLowercase,
  solelyContainsHTTPTokenCodePoints,
  soleyContainsHTTPQuotedStringTokenCodePoints
} = __webpack_require__(4);

module.exports = class MIMEType {
  constructor(string) {
    string = String(string);
    const result = parse(string);
    if (result === null) {
      throw new Error(`Could not parse MIME type string "${string}"`);
    }

    this._type = result.type;
    this._subtype = result.subtype;
    this._parameters = new MIMETypeParameters(result.parameters);
  }

  static parse(string) {
    try {
      return new this(string);
    } catch (e) {
      return null;
    }
  }

  get essence() {
    return `${this.type}/${this.subtype}`;
  }

  get type() {
    return this._type;
  }

  set type(value) {
    value = asciiLowercase(String(value));

    if (value.length === 0) {
      throw new Error("Invalid type: must be a non-empty string");
    }
    if (!solelyContainsHTTPTokenCodePoints(value)) {
      throw new Error(`Invalid type ${value}: must contain only HTTP token code points`);
    }

    this._type = value;
  }

  get subtype() {
    return this._subtype;
  }

  set subtype(value) {
    value = asciiLowercase(String(value));

    if (value.length === 0) {
      throw new Error("Invalid subtype: must be a non-empty string");
    }
    if (!solelyContainsHTTPTokenCodePoints(value)) {
      throw new Error(`Invalid subtype ${value}: must contain only HTTP token code points`);
    }

    this._subtype = value;
  }

  get parameters() {
    return this._parameters;
  }

  toString() {
    // The serialize function works on both "MIME type records" (i.e. the results of parse) and on this class, since
    // this class's interface is identical.
    return serialize(this);
  }

  isJavaScript({ allowParameters = false } = {}) {
    switch (this._type) {
      case "text": {
        switch (this._subtype) {
          case "ecmascript":
          case "javascript":
          case "javascript1.0":
          case "javascript1.1":
          case "javascript1.2":
          case "javascript1.3":
          case "javascript1.4":
          case "javascript1.5":
          case "jscript":
          case "livescript":
          case "x-ecmascript":
          case "x-javascript": {
            return allowParameters || this._parameters.size === 0;
          }
          default: {
            return false;
          }
        }
      }
      case "application": {
        switch (this._subtype) {
          case "ecmascript":
          case "javascript":
          case "x-ecmascript":
          case "x-javascript": {
            return allowParameters || this._parameters.size === 0;
          }
          default: {
            return false;
          }
        }
      }
      default: {
        return false;
      }
    }
  }
  isXML() {
    return (this._subtype === "xml" && (this._type === "text" || this._type === "application")) ||
           this._subtype.endsWith("+xml");
  }
  isHTML() {
    return this._subtype === "html" && this._type === "text";
  }
};

class MIMETypeParameters {
  constructor(map) {
    this._map = map;
  }

  get size() {
    return this._map.size;
  }

  get(name) {
    name = asciiLowercase(String(name));
    return this._map.get(name);
  }

  has(name) {
    name = asciiLowercase(String(name));
    return this._map.has(name);
  }

  set(name, value) {
    name = asciiLowercase(String(name));
    value = String(value);

    if (!solelyContainsHTTPTokenCodePoints(name)) {
      throw new Error(`Invalid MIME type parameter name "${name}": only HTTP token code points are valid.`);
    }
    if (!soleyContainsHTTPQuotedStringTokenCodePoints(value)) {
      throw new Error(`Invalid MIME type parameter value "${value}": only HTTP quoted-string token code points are ` +
                      `valid.`);
    }

    return this._map.set(name, value);
  }

  clear() {
    this._map.clear();
  }

  delete(name) {
    name = asciiLowercase(String(name));
    return this._map.delete(name);
  }

  forEach(callbackFn, thisArg) {
    this._map.forEach(callbackFn, thisArg);
  }

  keys() {
    return this._map.keys();
  }

  values() {
    return this._map.values();
  }

  entries() {
    return this._map.entries();
  }

  [Symbol.iterator]() {
    return this._map[Symbol.iterator]();
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {
  removeLeadingAndTrailingHTTPWhitespace,
  removeTrailingHTTPWhitespace,
  isHTTPWhitespaceChar,
  solelyContainsHTTPTokenCodePoints,
  soleyContainsHTTPQuotedStringTokenCodePoints,
  asciiLowercase
} = __webpack_require__(4);

module.exports = input => {
  input = removeLeadingAndTrailingHTTPWhitespace(input);

  let position = 0;
  let type = "";
  while (position < input.length && input[position] !== "/") {
    type += input[position];
    ++position;
  }

  if (type.length === 0 || !solelyContainsHTTPTokenCodePoints(type)) {
    return null;
  }

  if (position >= input.length) {
    return null;
  }

  // Skips past "/"
  ++position;

  let subtype = "";
  while (position < input.length && input[position] !== ";") {
    subtype += input[position];
    ++position;
  }

  subtype = removeTrailingHTTPWhitespace(subtype);

  if (subtype.length === 0 || !solelyContainsHTTPTokenCodePoints(subtype)) {
    return null;
  }

  const mimeType = {
    type: asciiLowercase(type),
    subtype: asciiLowercase(subtype),
    parameters: new Map()
  };

  while (position < input.length) {
    // Skip past ";"
    ++position;

    while (isHTTPWhitespaceChar(input[position])) {
      ++position;
    }

    let parameterName = "";
    while (position < input.length && input[position] !== ";" && input[position] !== "=") {
      parameterName += input[position];
      ++position;
    }
    parameterName = asciiLowercase(parameterName);

    if (position < input.length) {
      if (input[position] === ";") {
        continue;
      }

      // Skip past "="
      ++position;
    }

    let parameterValue = "";
    if (input[position] === "\"") {
      ++position;

      while (true) {
        while (position < input.length && input[position] !== "\"" && input[position] !== "\\") {
          parameterValue += input[position];
          ++position;
        }

        if (position < input.length && input[position] === "\\") {
          ++position;
          if (position < input.length) {
            parameterValue += input[position];
            ++position;
            continue;
          } else {
            parameterValue += "\\";
            break;
          }
        } else {
          break;
        }
      }

      while (position < input.length && input[position] !== ";") {
        ++position;
      }
    } else {
      while (position < input.length && input[position] !== ";") {
        parameterValue += input[position];
        ++position;
      }

      parameterValue = removeTrailingHTTPWhitespace(parameterValue);

      if (parameterValue === "") {
        continue;
      }
    }

    if (parameterName.length > 0 &&
        solelyContainsHTTPTokenCodePoints(parameterName) &&
        soleyContainsHTTPQuotedStringTokenCodePoints(parameterValue) &&
        !mimeType.parameters.has(parameterName)) {
      mimeType.parameters.set(parameterName, parameterValue);
    }
  }

  return mimeType;
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.removeLeadingAndTrailingHTTPWhitespace = string => {
  return string.replace(/^[ \t\n\r]+/, "").replace(/[ \t\n\r]+$/, "");
};

exports.removeTrailingHTTPWhitespace = string => {
  return string.replace(/[ \t\n\r]+$/, "");
};

exports.isHTTPWhitespaceChar = char => {
  return char === " " || char === "\t" || char === "\n" || char === "\r";
};

exports.solelyContainsHTTPTokenCodePoints = string => {
  return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/.test(string);
};

exports.soleyContainsHTTPQuotedStringTokenCodePoints = string => {
  return /^[\t\u0020-\u007E\u0080-\u00FF]*$/.test(string);
};

exports.asciiLowercase = string => {
  return string.replace(/[A-Z]/g, l => l.toLowerCase());
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const { solelyContainsHTTPTokenCodePoints } = __webpack_require__(4);

module.exports = mimeType => {
  let serialization = `${mimeType.type}/${mimeType.subtype}`;

  if (mimeType.parameters.size === 0) {
    return serialization;
  }

  for (let [name, value] of mimeType.parameters) {
    serialization += ";";
    serialization += name;
    serialization += "=";

    if (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) {
      value = value.replace(/(["\\])/g, "\\$1");
      value = `"${value}"`;
    }

    serialization += value;
  }

  return serialization;
};


/***/ })
/******/ ]);
