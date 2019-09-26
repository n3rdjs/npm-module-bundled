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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(3));
var parse_1 = __webpack_require__(3);
exports.parse = parse_1.default;
var stringify_1 = __webpack_require__(4);
exports.stringify = stringify_1.default;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = parse;
var reName = /^(?:\\.|[\w\-\u00b0-\uFFFF])+/, reEscape = /\\([\da-f]{1,6}\s?|(\s)|.)/gi, 
//modified version of https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L87
reAttr = /^\s*((?:\\.|[\w\u00b0-\uFFFF-])+)\s*(?:(\S?)=\s*(?:(['"])([^]*?)\3|(#?(?:\\.|[\w\u00b0-\uFFFF-])*)|)|)\s*(i)?\]/;
var actionTypes = {
    undefined: "exists",
    "": "equals",
    "~": "element",
    "^": "start",
    $: "end",
    "*": "any",
    "!": "not",
    "|": "hyphen"
};
var Traversals = {
    ">": "child",
    "<": "parent",
    "~": "sibling",
    "+": "adjacent"
};
var attribSelectors = {
    "#": ["id", "equals"],
    ".": ["class", "element"]
};
//pseudos, whose data-property is parsed as well
var unpackPseudos = new Set(["has", "not", "matches"]);
var stripQuotesFromPseudos = new Set(["contains", "icontains"]);
var quotes = new Set(['"', "'"]);
//unescape function taken from https://github.com/jquery/sizzle/blob/master/src/sizzle.js#L152
function funescape(_, escaped, escapedWhitespace) {
    var high = parseInt(escaped, 16) - 0x10000;
    // NaN means non-codepoint
    return high !== high || escapedWhitespace
        ? escaped
        : high < 0
            ? // BMP codepoint
                String.fromCharCode(high + 0x10000)
            : // Supplemental Plane codepoint (surrogate pair)
                String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
}
function unescapeCSS(str) {
    return str.replace(reEscape, funescape);
}
function isWhitespace(c) {
    return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}
function parse(selector, options) {
    var subselects = [];
    selector = parseSelector(subselects, selector + "", options);
    if (selector !== "") {
        throw new Error("Unmatched selector: " + selector);
    }
    return subselects;
}
function parseSelector(subselects, selector, options) {
    var tokens = [], sawWS = false;
    function getName() {
        var match = selector.match(reName);
        if (!match) {
            throw new Error("Expected name, found " + selector);
        }
        var sub = match[0];
        selector = selector.substr(sub.length);
        return unescapeCSS(sub);
    }
    function stripWhitespace(start) {
        while (isWhitespace(selector.charAt(start)))
            start++;
        selector = selector.substr(start);
    }
    function isEscaped(pos) {
        var slashCount = 0;
        while (selector.charAt(--pos) === "\\")
            slashCount++;
        return (slashCount & 1) === 1;
    }
    stripWhitespace(0);
    while (selector !== "") {
        var firstChar = selector.charAt(0);
        if (isWhitespace(firstChar)) {
            sawWS = true;
            stripWhitespace(1);
        }
        else if (firstChar in Traversals) {
            tokens.push({ type: Traversals[firstChar] });
            sawWS = false;
            stripWhitespace(1);
        }
        else if (firstChar === ",") {
            if (tokens.length === 0) {
                throw new Error("Empty sub-selector");
            }
            subselects.push(tokens);
            tokens = [];
            sawWS = false;
            stripWhitespace(1);
        }
        else {
            if (sawWS) {
                if (tokens.length > 0) {
                    tokens.push({ type: "descendant" });
                }
                sawWS = false;
            }
            if (firstChar === "*") {
                selector = selector.substr(1);
                tokens.push({ type: "universal" });
            }
            else if (firstChar in attribSelectors) {
                var _a = attribSelectors[firstChar], name_1 = _a[0], action = _a[1];
                selector = selector.substr(1);
                tokens.push({
                    type: "attribute",
                    name: name_1,
                    action: action,
                    value: getName(),
                    ignoreCase: false
                });
            }
            else if (firstChar === "[") {
                selector = selector.substr(1);
                var data = selector.match(reAttr);
                if (!data) {
                    throw new Error("Malformed attribute selector: " + selector);
                }
                selector = selector.substr(data[0].length);
                var name_2 = unescapeCSS(data[1]);
                if (!options ||
                    ("lowerCaseAttributeNames" in options
                        ? options.lowerCaseAttributeNames
                        : !options.xmlMode)) {
                    name_2 = name_2.toLowerCase();
                }
                tokens.push({
                    type: "attribute",
                    name: name_2,
                    action: actionTypes[data[2]],
                    value: unescapeCSS(data[4] || data[5] || ""),
                    ignoreCase: !!data[6]
                });
            }
            else if (firstChar === ":") {
                if (selector.charAt(1) === ":") {
                    selector = selector.substr(2);
                    tokens.push({
                        type: "pseudo-element",
                        name: getName().toLowerCase()
                    });
                    continue;
                }
                selector = selector.substr(1);
                var name_3 = getName().toLowerCase();
                var data = null;
                if (selector.charAt(0) === "(") {
                    if (unpackPseudos.has(name_3)) {
                        var quot = selector.charAt(1);
                        var quoted = quotes.has(quot);
                        selector = selector.substr(quoted ? 2 : 1);
                        data = [];
                        selector = parseSelector(data, selector, options);
                        if (quoted) {
                            if (selector.charAt(0) !== quot) {
                                throw new Error("Unmatched quotes in :" + name_3);
                            }
                            else {
                                selector = selector.substr(1);
                            }
                        }
                        if (selector.charAt(0) !== ")") {
                            throw new Error("Missing closing parenthesis in :" + name_3 + " (" + selector + ")");
                        }
                        selector = selector.substr(1);
                    }
                    else {
                        var pos = 1, counter = 1;
                        for (; counter > 0 && pos < selector.length; pos++) {
                            if (selector.charAt(pos) === "(" && !isEscaped(pos))
                                counter++;
                            else if (selector.charAt(pos) === ")" &&
                                !isEscaped(pos))
                                counter--;
                        }
                        if (counter) {
                            throw new Error("Parenthesis not matched");
                        }
                        data = selector.substr(1, pos - 2);
                        selector = selector.substr(pos);
                        if (stripQuotesFromPseudos.has(name_3)) {
                            var quot = data.charAt(0);
                            if (quot === data.slice(-1) && quotes.has(quot)) {
                                data = data.slice(1, -1);
                            }
                            data = unescapeCSS(data);
                        }
                    }
                }
                tokens.push({ type: "pseudo", name: name_3, data: data });
            }
            else if (reName.test(selector)) {
                var name_4 = getName();
                if (!options ||
                    ("lowerCaseTags" in options
                        ? options.lowerCaseTags
                        : !options.xmlMode)) {
                    name_4 = name_4.toLowerCase();
                }
                tokens.push({ type: "tag", name: name_4 });
            }
            else {
                if (tokens.length &&
                    tokens[tokens.length - 1].type === "descendant") {
                    tokens.pop();
                }
                addToken(subselects, tokens);
                return selector;
            }
        }
    }
    addToken(subselects, tokens);
    return selector;
}
function addToken(subselects, tokens) {
    if (subselects.length > 0 && tokens.length === 0) {
        throw new Error("Empty sub-selector");
    }
    subselects.push(tokens);
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var actionTypes = {
    equals: "",
    element: "~",
    start: "^",
    end: "$",
    any: "*",
    not: "!",
    hyphen: "|"
};
var simpleSelectors = {
    child: " > ",
    parent: " < ",
    sibling: " ~ ",
    adjacent: " + ",
    descendant: " ",
    universal: "*"
};
function stringify(token) {
    return token.map(stringifySubselector).join(", ");
}
exports.default = stringify;
function stringifySubselector(token) {
    return token.map(stringifyToken).join("");
}
function stringifyToken(token) {
    if (token.type in simpleSelectors)
        return simpleSelectors[token.type];
    if (token.type === "tag")
        return escapeName(token.name);
    if (token.type === "pseudo-element")
        return "::" + escapeName(token.name);
    if (token.type === "attribute") {
        if (token.action === "exists")
            return "[" + escapeName(token.name) + "]";
        if (token.name === "id" &&
            token.action === "equals" &&
            !token.ignoreCase)
            return "#" + escapeName(token.value);
        if (token.name === "class" &&
            token.action === "element" &&
            !token.ignoreCase)
            return "." + escapeName(token.value);
        return ("[" +
            escapeName(token.name) +
            actionTypes[token.action] +
            "='" +
            escapeName(token.value) +
            "'" +
            (token.ignoreCase ? "i" : "") +
            "]");
    }
    if (token.type === "pseudo") {
        if (token.data === null)
            return ":" + escapeName(token.name);
        if (typeof token.data === "string") {
            return ":" + escapeName(token.name) + "(" + token.data + ")";
        }
        return ":" + escapeName(token.name) + "(" + stringify(token.data) + ")";
    }
    throw new Error("Unknown type");
}
function escapeName(str) {
    //TODO
    return str;
}


/***/ })
/******/ ]);
