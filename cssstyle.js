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
/*********************************************************************
 * This is a fork from the CSS Style Declaration part of
 * https://github.com/NV/CSSOM
 ********************************************************************/

var CSSOM = __webpack_require__(3);
var allProperties = __webpack_require__(23);
var allExtraProperties = __webpack_require__(24);
var implementedProperties = __webpack_require__(25);
var { dashedToCamelCase } = __webpack_require__(26);
var getBasicPropertyDescriptor = __webpack_require__(28);

/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
var CSSStyleDeclaration = function CSSStyleDeclaration(onChangeCallback) {
  this._values = {};
  this._importants = {};
  this._length = 0;
  this._onChange =
    onChangeCallback ||
    function() {
      return;
    };
};
CSSStyleDeclaration.prototype = {
  constructor: CSSStyleDeclaration,

  /**
   *
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set.
   */
  getPropertyValue: function(name) {
    if (!this._values.hasOwnProperty(name)) {
      return '';
    }
    return this._values[name].toString();
  },

  /**
   *
   * @param {string} name
   * @param {string} value
   * @param {string} [priority=null] "important" or null
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
   */
  setProperty: function(name, value, priority) {
    if (value === undefined) {
      return;
    }
    if (value === null || value === '') {
      this.removeProperty(name);
      return;
    }
    var lowercaseName = name.toLowerCase();
    if (!allProperties.has(lowercaseName) && !allExtraProperties.has(lowercaseName)) {
      return;
    }

    this[lowercaseName] = value;
    this._importants[lowercaseName] = priority;
  },
  _setProperty: function(name, value, priority) {
    if (value === undefined) {
      return;
    }
    if (value === null || value === '') {
      this.removeProperty(name);
      return;
    }
    if (this._values[name]) {
      // Property already exist. Overwrite it.
      var index = Array.prototype.indexOf.call(this, name);
      if (index < 0) {
        this[this._length] = name;
        this._length++;
      }
    } else {
      // New property.
      this[this._length] = name;
      this._length++;
    }
    this._values[name] = value;
    this._importants[name] = priority;
    this._onChange(this.cssText);
  },

  /**
   *
   * @param {string} name
   * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
   * @return {string} the value of the property if it has been explicitly set for this declaration block.
   * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
   */
  removeProperty: function(name) {
    if (!this._values.hasOwnProperty(name)) {
      return '';
    }

    var prevValue = this._values[name];
    delete this._values[name];
    delete this._importants[name];

    var index = Array.prototype.indexOf.call(this, name);
    if (index < 0) {
      return prevValue;
    }

    // That's what WebKit and Opera do
    Array.prototype.splice.call(this, index, 1);

    // That's what Firefox does
    //this[index] = ""

    this._onChange(this.cssText);
    return prevValue;
  },

  /**
   *
   * @param {String} name
   */
  getPropertyPriority: function(name) {
    return this._importants[name] || '';
  },

  getPropertyCSSValue: function() {
    //FIXME
    return;
  },

  /**
   *   element.style.overflow = "auto"
   *   element.style.getPropertyShorthand("overflow-x")
   *   -> "overflow"
   */
  getPropertyShorthand: function() {
    //FIXME
    return;
  },

  isPropertyImplicit: function() {
    //FIXME
    return;
  },

  /**
   *   http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-item
   */
  item: function(index) {
    index = parseInt(index, 10);
    if (index < 0 || index >= this._length) {
      return '';
    }
    return this[index];
  },
};

Object.defineProperties(CSSStyleDeclaration.prototype, {
  cssText: {
    get: function() {
      var properties = [];
      var i;
      var name;
      var value;
      var priority;
      for (i = 0; i < this._length; i++) {
        name = this[i];
        value = this.getPropertyValue(name);
        priority = this.getPropertyPriority(name);
        if (priority !== '') {
          priority = ' !' + priority;
        }
        properties.push([name, ': ', value, priority, ';'].join(''));
      }
      return properties.join(' ');
    },
    set: function(value) {
      var i;
      this._values = {};
      Array.prototype.splice.call(this, 0, this._length);
      this._importants = {};
      var dummyRule;
      try {
        dummyRule = CSSOM.parse('#bogus{' + value + '}').cssRules[0].style;
      } catch (err) {
        // malformed css, just return
        return;
      }
      var rule_length = dummyRule.length;
      var name;
      for (i = 0; i < rule_length; ++i) {
        name = dummyRule[i];
        this.setProperty(
          dummyRule[i],
          dummyRule.getPropertyValue(name),
          dummyRule.getPropertyPriority(name)
        );
      }
      this._onChange(this.cssText);
    },
    enumerable: true,
    configurable: true,
  },
  parentRule: {
    get: function() {
      return null;
    },
    enumerable: true,
    configurable: true,
  },
  length: {
    get: function() {
      return this._length;
    },
    /**
     * This deletes indices if the new length is less then the current
     * length. If the new length is more, it does nothing, the new indices
     * will be undefined until set.
     **/
    set: function(value) {
      var i;
      for (i = value; i < this._length; i++) {
        delete this[i];
      }
      this._length = value;
    },
    enumerable: true,
    configurable: true,
  },
});

__webpack_require__(29)(CSSStyleDeclaration.prototype);

allProperties.forEach(function(property) {
  if (!implementedProperties.has(property)) {
    var declaration = getBasicPropertyDescriptor(property);
    Object.defineProperty(CSSStyleDeclaration.prototype, property, declaration);
    Object.defineProperty(CSSStyleDeclaration.prototype, dashedToCamelCase(property), declaration);
  }
});

allExtraProperties.forEach(function(property) {
  if (!implementedProperties.has(property)) {
    var declaration = getBasicPropertyDescriptor(property);
    Object.defineProperty(CSSStyleDeclaration.prototype, property, declaration);
    Object.defineProperty(CSSStyleDeclaration.prototype, dashedToCamelCase(property), declaration);
  }
});

exports.CSSStyleDeclaration = CSSStyleDeclaration;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.CSSStyleDeclaration = __webpack_require__(4).CSSStyleDeclaration;
exports.CSSRule = __webpack_require__(9).CSSRule;
exports.CSSStyleRule = __webpack_require__(8).CSSStyleRule;
exports.MediaList = __webpack_require__(11).MediaList;
exports.CSSMediaRule = __webpack_require__(12).CSSMediaRule;
exports.CSSSupportsRule = __webpack_require__(13).CSSSupportsRule;
exports.CSSImportRule = __webpack_require__(10).CSSImportRule;
exports.CSSFontFaceRule = __webpack_require__(14).CSSFontFaceRule;
exports.CSSHostRule = __webpack_require__(15).CSSHostRule;
exports.StyleSheet = __webpack_require__(7).StyleSheet;
exports.CSSStyleSheet = __webpack_require__(6).CSSStyleSheet;
exports.CSSKeyframesRule = __webpack_require__(17).CSSKeyframesRule;
exports.CSSKeyframeRule = __webpack_require__(16).CSSKeyframeRule;
exports.MatcherList = __webpack_require__(21).MatcherList;
exports.CSSDocumentRule = __webpack_require__(20).CSSDocumentRule;
exports.CSSValue = __webpack_require__(19).CSSValue;
exports.CSSValueExpression = __webpack_require__(18).CSSValueExpression;
exports.parse = __webpack_require__(5).parse;
exports.clone = __webpack_require__(22).clone;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration
 */
CSSOM.CSSStyleDeclaration = function CSSStyleDeclaration(){
	this.length = 0;
	this.parentRule = null;

	// NON-STANDARD
	this._importants = {};
};


CSSOM.CSSStyleDeclaration.prototype = {

	constructor: CSSOM.CSSStyleDeclaration,

	/**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-getPropertyValue
	 * @return {string} the value of the property if it has been explicitly set for this declaration block.
	 * Returns the empty string if the property has not been set.
	 */
	getPropertyValue: function(name) {
		return this[name] || "";
	},

	/**
	 *
	 * @param {string} name
	 * @param {string} value
	 * @param {string} [priority=null] "important" or null
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-setProperty
	 */
	setProperty: function(name, value, priority) {
		if (this[name]) {
			// Property already exist. Overwrite it.
			var index = Array.prototype.indexOf.call(this, name);
			if (index < 0) {
				this[this.length] = name;
				this.length++;
			}
		} else {
			// New property.
			this[this.length] = name;
			this.length++;
		}
		this[name] = value + "";
		this._importants[name] = priority;
	},

	/**
	 *
	 * @param {string} name
	 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleDeclaration-removeProperty
	 * @return {string} the value of the property if it has been explicitly set for this declaration block.
	 * Returns the empty string if the property has not been set or the property name does not correspond to a known CSS property.
	 */
	removeProperty: function(name) {
		if (!(name in this)) {
			return "";
		}
		var index = Array.prototype.indexOf.call(this, name);
		if (index < 0) {
			return "";
		}
		var prevValue = this[name];
		this[name] = "";

		// That's what WebKit and Opera do
		Array.prototype.splice.call(this, index, 1);

		// That's what Firefox does
		//this[index] = ""

		return prevValue;
	},

	getPropertyCSSValue: function() {
		//FIXME
	},

	/**
	 *
	 * @param {String} name
	 */
	getPropertyPriority: function(name) {
		return this._importants[name] || "";
	},


	/**
	 *   element.style.overflow = "auto"
	 *   element.style.getPropertyShorthand("overflow-x")
	 *   -> "overflow"
	 */
	getPropertyShorthand: function() {
		//FIXME
	},

	isPropertyImplicit: function() {
		//FIXME
	},

	// Doesn't work in IE < 9
	get cssText(){
		var properties = [];
		for (var i=0, length=this.length; i < length; ++i) {
			var name = this[i];
			var value = this.getPropertyValue(name);
			var priority = this.getPropertyPriority(name);
			if (priority) {
				priority = " !" + priority;
			}
			properties[i] = name + ": " + value + priority + ";";
		}
		return properties.join(" ");
	},

	set cssText(text){
		var i, name;
		for (i = this.length; i--;) {
			name = this[i];
			this[name] = "";
		}
		Array.prototype.splice.call(this, 0, this.length);
		this._importants = {};

		var dummyRule = CSSOM.parse('#bogus{' + text + '}').cssRules[0].style;
		var length = dummyRule.length;
		for (i = 0; i < length; ++i) {
			name = dummyRule[i];
			this.setProperty(dummyRule[i], dummyRule.getPropertyValue(name), dummyRule.getPropertyPriority(name));
		}
	}
};


//.CommonJS
exports.CSSStyleDeclaration = CSSOM.CSSStyleDeclaration;
CSSOM.parse = __webpack_require__(5).parse; // Cannot be included sooner due to the mutual dependency between parse.js and CSSStyleDeclaration.js
///CommonJS


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @param {string} token
 */
CSSOM.parse = function parse(token) {

	var i = 0;

	/**
		"before-selector" or
		"selector" or
		"atRule" or
		"atBlock" or
		"conditionBlock" or
		"before-name" or
		"name" or
		"before-value" or
		"value"
	*/
	var state = "before-selector";

	var index;
	var buffer = "";
	var valueParenthesisDepth = 0;

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"value": true,
		"value-parenthesis": true,
		"atRule": true,
		"importRule-begin": true,
		"importRule": true,
		"atBlock": true,
		"conditionBlock": true,
		'documentRule-begin': true
	};

	var styleSheet = new CSSOM.CSSStyleSheet();

	// @type CSSStyleSheet|CSSMediaRule|CSSSupportsRule|CSSFontFaceRule|CSSKeyframesRule|CSSDocumentRule
	var currentScope = styleSheet;

	// @type CSSMediaRule|CSSSupportsRule|CSSKeyframesRule|CSSDocumentRule
	var parentRule;

	var ancestorRules = [];
	var hasAncestors = false;
	var prevScope;

	var name, priority="", styleRule, mediaRule, supportsRule, importRule, fontFaceRule, keyframesRule, documentRule, hostRule;

	var atKeyframesRegExp = /@(-(?:\w+-)+)?keyframes/g;

	var parseError = function(message) {
		var lines = token.substring(0, i).split('\n');
		var lineCount = lines.length;
		var charCount = lines.pop().length + 1;
		var error = new Error(message + ' (line ' + lineCount + ', char ' + charCount + ')');
		error.line = lineCount;
		/* jshint sub : true */
		error['char'] = charCount;
		error.styleSheet = styleSheet;
		throw error;
	};

	for (var character; (character = token.charAt(i)); i++) {

		switch (character) {

		case " ":
		case "\t":
		case "\r":
		case "\n":
		case "\f":
			if (SIGNIFICANT_WHITESPACE[state]) {
				buffer += character;
			}
			break;

		// String
		case '"':
			index = i + 1;
			do {
				index = token.indexOf('"', index) + 1;
				if (!index) {
					parseError('Unmatched "');
				}
			} while (token[index - 2] === '\\');
			buffer += token.slice(i, index);
			i = index - 1;
			switch (state) {
				case 'before-value':
					state = 'value';
					break;
				case 'importRule-begin':
					state = 'importRule';
					break;
			}
			break;

		case "'":
			index = i + 1;
			do {
				index = token.indexOf("'", index) + 1;
				if (!index) {
					parseError("Unmatched '");
				}
			} while (token[index - 2] === '\\');
			buffer += token.slice(i, index);
			i = index - 1;
			switch (state) {
				case 'before-value':
					state = 'value';
					break;
				case 'importRule-begin':
					state = 'importRule';
					break;
			}
			break;

		// Comment
		case "/":
			if (token.charAt(i + 1) === "*") {
				i += 2;
				index = token.indexOf("*/", i);
				if (index === -1) {
					parseError("Missing */");
				} else {
					i = index + 1;
				}
			} else {
				buffer += character;
			}
			if (state === "importRule-begin") {
				buffer += " ";
				state = "importRule";
			}
			break;

		// At-rule
		case "@":
			if (token.indexOf("@-moz-document", i) === i) {
				state = "documentRule-begin";
				documentRule = new CSSOM.CSSDocumentRule();
				documentRule.__starts = i;
				i += "-moz-document".length;
				buffer = "";
				break;
			} else if (token.indexOf("@media", i) === i) {
				state = "atBlock";
				mediaRule = new CSSOM.CSSMediaRule();
				mediaRule.__starts = i;
				i += "media".length;
				buffer = "";
				break;
			} else if (token.indexOf("@supports", i) === i) {
				state = "conditionBlock";
				supportsRule = new CSSOM.CSSSupportsRule();
				supportsRule.__starts = i;
				i += "supports".length;
				buffer = "";
				break;
			} else if (token.indexOf("@host", i) === i) {
				state = "hostRule-begin";
				i += "host".length;
				hostRule = new CSSOM.CSSHostRule();
				hostRule.__starts = i;
				buffer = "";
				break;
			} else if (token.indexOf("@import", i) === i) {
				state = "importRule-begin";
				i += "import".length;
				buffer += "@import";
				break;
			} else if (token.indexOf("@font-face", i) === i) {
				state = "fontFaceRule-begin";
				i += "font-face".length;
				fontFaceRule = new CSSOM.CSSFontFaceRule();
				fontFaceRule.__starts = i;
				buffer = "";
				break;
			} else {
				atKeyframesRegExp.lastIndex = i;
				var matchKeyframes = atKeyframesRegExp.exec(token);
				if (matchKeyframes && matchKeyframes.index === i) {
					state = "keyframesRule-begin";
					keyframesRule = new CSSOM.CSSKeyframesRule();
					keyframesRule.__starts = i;
					keyframesRule._vendorPrefix = matchKeyframes[1]; // Will come out as undefined if no prefix was found
					i += matchKeyframes[0].length - 1;
					buffer = "";
					break;
				} else if (state === "selector") {
					state = "atRule";
				}
			}
			buffer += character;
			break;

		case "{":
			if (state === "selector" || state === "atRule") {
				styleRule.selectorText = buffer.trim();
				styleRule.style.__starts = i;
				buffer = "";
				state = "before-name";
			} else if (state === "atBlock") {
				mediaRule.media.mediaText = buffer.trim();

				if (parentRule) {
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = mediaRule;
				mediaRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "conditionBlock") {
				supportsRule.conditionText = buffer.trim();

				if (parentRule) {
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = supportsRule;
				supportsRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "hostRule-begin") {
				if (parentRule) {
					ancestorRules.push(parentRule);
				}

				currentScope = parentRule = hostRule;
				hostRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			} else if (state === "fontFaceRule-begin") {
				if (parentRule) {
					ancestorRules.push(parentRule);
					fontFaceRule.parentRule = parentRule;
				}
				fontFaceRule.parentStyleSheet = styleSheet;
				styleRule = fontFaceRule;
				buffer = "";
				state = "before-name";
			} else if (state === "keyframesRule-begin") {
				keyframesRule.name = buffer.trim();
				if (parentRule) {
					ancestorRules.push(parentRule);
					keyframesRule.parentRule = parentRule;
				}
				keyframesRule.parentStyleSheet = styleSheet;
				currentScope = parentRule = keyframesRule;
				buffer = "";
				state = "keyframeRule-begin";
			} else if (state === "keyframeRule-begin") {
				styleRule = new CSSOM.CSSKeyframeRule();
				styleRule.keyText = buffer.trim();
				styleRule.__starts = i;
				buffer = "";
				state = "before-name";
			} else if (state === "documentRule-begin") {
				// FIXME: what if this '{' is in the url text of the match function?
				documentRule.matcher.matcherText = buffer.trim();
				if (parentRule) {
					ancestorRules.push(parentRule);
					documentRule.parentRule = parentRule;
				}
				currentScope = parentRule = documentRule;
				documentRule.parentStyleSheet = styleSheet;
				buffer = "";
				state = "before-selector";
			}
			break;

		case ":":
			if (state === "name") {
				name = buffer.trim();
				buffer = "";
				state = "before-value";
			} else {
				buffer += character;
			}
			break;

		case "(":
			if (state === 'value') {
				// ie css expression mode
				if (buffer.trim() === 'expression') {
					var info = (new CSSOM.CSSValueExpression(token, i)).parse();

					if (info.error) {
						parseError(info.error);
					} else {
						buffer += info.expression;
						i = info.idx;
					}
				} else {
					state = 'value-parenthesis';
					//always ensure this is reset to 1 on transition
					//from value to value-parenthesis
					valueParenthesisDepth = 1;
					buffer += character;
				}
			} else if (state === 'value-parenthesis') {
				valueParenthesisDepth++;
				buffer += character;
			} else {
				buffer += character;
			}
			break;

		case ")":
			if (state === 'value-parenthesis') {
				valueParenthesisDepth--;
				if (valueParenthesisDepth === 0) state = 'value';
			}
			buffer += character;
			break;

		case "!":
			if (state === "value" && token.indexOf("!important", i) === i) {
				priority = "important";
				i += "important".length;
			} else {
				buffer += character;
			}
			break;

		case ";":
			switch (state) {
				case "value":
					styleRule.style.setProperty(name, buffer.trim(), priority);
					priority = "";
					buffer = "";
					state = "before-name";
					break;
				case "atRule":
					buffer = "";
					state = "before-selector";
					break;
				case "importRule":
					importRule = new CSSOM.CSSImportRule();
					importRule.parentStyleSheet = importRule.styleSheet.parentStyleSheet = styleSheet;
					importRule.cssText = buffer + character;
					styleSheet.cssRules.push(importRule);
					buffer = "";
					state = "before-selector";
					break;
				default:
					buffer += character;
					break;
			}
			break;

		case "}":
			switch (state) {
				case "value":
					styleRule.style.setProperty(name, buffer.trim(), priority);
					priority = "";
					/* falls through */
				case "before-name":
				case "name":
					styleRule.__ends = i + 1;
					if (parentRule) {
						styleRule.parentRule = parentRule;
					}
					styleRule.parentStyleSheet = styleSheet;
					currentScope.cssRules.push(styleRule);
					buffer = "";
					if (currentScope.constructor === CSSOM.CSSKeyframesRule) {
						state = "keyframeRule-begin";
					} else {
						state = "before-selector";
					}
					break;
				case "keyframeRule-begin":
				case "before-selector":
				case "selector":
					// End of media/supports/document rule.
					if (!parentRule) {
						parseError("Unexpected }");
					}

					// Handle rules nested in @media or @supports
					hasAncestors = ancestorRules.length > 0;

					while (ancestorRules.length > 0) {
						parentRule = ancestorRules.pop();

						if (
							parentRule.constructor.name === "CSSMediaRule"
							|| parentRule.constructor.name === "CSSSupportsRule"
						) {
							prevScope = currentScope;
							currentScope = parentRule;
							currentScope.cssRules.push(prevScope);
							break;
						}

						if (ancestorRules.length === 0) {
							hasAncestors = false;
						}
					}
					
					if (!hasAncestors) {
						currentScope.__ends = i + 1;
						styleSheet.cssRules.push(currentScope);
						currentScope = styleSheet;
						parentRule = null;
					}

					buffer = "";
					state = "before-selector";
					break;
			}
			break;

		default:
			switch (state) {
				case "before-selector":
					state = "selector";
					styleRule = new CSSOM.CSSStyleRule();
					styleRule.__starts = i;
					break;
				case "before-name":
					state = "name";
					break;
				case "before-value":
					state = "value";
					break;
				case "importRule-begin":
					state = "importRule";
					break;
			}
			buffer += character;
			break;
		}
	}

	return styleSheet;
};


//.CommonJS
exports.parse = CSSOM.parse;
// The following modules cannot be included sooner due to the mutual dependency with parse.js
CSSOM.CSSStyleSheet = __webpack_require__(6).CSSStyleSheet;
CSSOM.CSSStyleRule = __webpack_require__(8).CSSStyleRule;
CSSOM.CSSImportRule = __webpack_require__(10).CSSImportRule;
CSSOM.CSSMediaRule = __webpack_require__(12).CSSMediaRule;
CSSOM.CSSSupportsRule = __webpack_require__(13).CSSSupportsRule;
CSSOM.CSSFontFaceRule = __webpack_require__(14).CSSFontFaceRule;
CSSOM.CSSHostRule = __webpack_require__(15).CSSHostRule;
CSSOM.CSSStyleDeclaration = __webpack_require__(4).CSSStyleDeclaration;
CSSOM.CSSKeyframeRule = __webpack_require__(16).CSSKeyframeRule;
CSSOM.CSSKeyframesRule = __webpack_require__(17).CSSKeyframesRule;
CSSOM.CSSValueExpression = __webpack_require__(18).CSSValueExpression;
CSSOM.CSSDocumentRule = __webpack_require__(20).CSSDocumentRule;
///CommonJS


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	StyleSheet: __webpack_require__(7).StyleSheet,
	CSSStyleRule: __webpack_require__(8).CSSStyleRule
};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet
 */
CSSOM.CSSStyleSheet = function CSSStyleSheet() {
	CSSOM.StyleSheet.call(this);
	this.cssRules = [];
};


CSSOM.CSSStyleSheet.prototype = new CSSOM.StyleSheet();
CSSOM.CSSStyleSheet.prototype.constructor = CSSOM.CSSStyleSheet;


/**
 * Used to insert a new rule into the style sheet. The new rule now becomes part of the cascade.
 *
 *   sheet = new Sheet("body {margin: 0}")
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *   sheet.insertRule("img {border: none}", 0)
 *   -> 0
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *
 * @param {string} rule
 * @param {number} index
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-insertRule
 * @return {number} The index within the style sheet's rule collection of the newly inserted rule.
 */
CSSOM.CSSStyleSheet.prototype.insertRule = function(rule, index) {
	if (index < 0 || index > this.cssRules.length) {
		throw new RangeError("INDEX_SIZE_ERR");
	}
	var cssRule = CSSOM.parse(rule).cssRules[0];
	cssRule.parentStyleSheet = this;
	this.cssRules.splice(index, 0, cssRule);
	return index;
};


/**
 * Used to delete a rule from the style sheet.
 *
 *   sheet = new Sheet("img{border:none} body{margin:0}")
 *   sheet.toString()
 *   -> "img{border:none;}body{margin:0;}"
 *   sheet.deleteRule(0)
 *   sheet.toString()
 *   -> "body{margin:0;}"
 *
 * @param {number} index within the style sheet's rule list of the rule to remove.
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleSheet-deleteRule
 */
CSSOM.CSSStyleSheet.prototype.deleteRule = function(index) {
	if (index < 0 || index >= this.cssRules.length) {
		throw new RangeError("INDEX_SIZE_ERR");
	}
	this.cssRules.splice(index, 1);
};


/**
 * NON-STANDARD
 * @return {string} serialize stylesheet
 */
CSSOM.CSSStyleSheet.prototype.toString = function() {
	var result = "";
	var rules = this.cssRules;
	for (var i=0; i<rules.length; i++) {
		result += rules[i].cssText + "\n";
	}
	return result;
};


//.CommonJS
exports.CSSStyleSheet = CSSOM.CSSStyleSheet;
CSSOM.parse = __webpack_require__(5).parse; // Cannot be included sooner due to the mutual dependency between parse.js and CSSStyleSheet.js
///CommonJS


/***/ }),
/* 7 */
/***/ (function(module, exports) {

//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-stylesheet-interface
 */
CSSOM.StyleSheet = function StyleSheet() {
	this.parentStyleSheet = null;
};


//.CommonJS
exports.StyleSheet = CSSOM.StyleSheet;
///CommonJS


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSStyleDeclaration: __webpack_require__(4).CSSStyleDeclaration,
	CSSRule: __webpack_require__(9).CSSRule
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssstylerule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSStyleRule
 */
CSSOM.CSSStyleRule = function CSSStyleRule() {
	CSSOM.CSSRule.call(this);
	this.selectorText = "";
	this.style = new CSSOM.CSSStyleDeclaration();
	this.style.parentRule = this;
};

CSSOM.CSSStyleRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSStyleRule.prototype.constructor = CSSOM.CSSStyleRule;
CSSOM.CSSStyleRule.prototype.type = 1;

Object.defineProperty(CSSOM.CSSStyleRule.prototype, "cssText", {
	get: function() {
		var text;
		if (this.selectorText) {
			text = this.selectorText + " {" + this.style.cssText + "}";
		} else {
			text = "";
		}
		return text;
	},
	set: function(cssText) {
		var rule = CSSOM.CSSStyleRule.parse(cssText);
		this.style = rule.style;
		this.selectorText = rule.selectorText;
	}
});


/**
 * NON-STANDARD
 * lightweight version of parse.js.
 * @param {string} ruleText
 * @return CSSStyleRule
 */
CSSOM.CSSStyleRule.parse = function(ruleText) {
	var i = 0;
	var state = "selector";
	var index;
	var j = i;
	var buffer = "";

	var SIGNIFICANT_WHITESPACE = {
		"selector": true,
		"value": true
	};

	var styleRule = new CSSOM.CSSStyleRule();
	var name, priority="";

	for (var character; (character = ruleText.charAt(i)); i++) {

		switch (character) {

		case " ":
		case "\t":
		case "\r":
		case "\n":
		case "\f":
			if (SIGNIFICANT_WHITESPACE[state]) {
				// Squash 2 or more white-spaces in the row into 1
				switch (ruleText.charAt(i - 1)) {
					case " ":
					case "\t":
					case "\r":
					case "\n":
					case "\f":
						break;
					default:
						buffer += " ";
						break;
				}
			}
			break;

		// String
		case '"':
			j = i + 1;
			index = ruleText.indexOf('"', j) + 1;
			if (!index) {
				throw '" is missing';
			}
			buffer += ruleText.slice(i, index);
			i = index - 1;
			break;

		case "'":
			j = i + 1;
			index = ruleText.indexOf("'", j) + 1;
			if (!index) {
				throw "' is missing";
			}
			buffer += ruleText.slice(i, index);
			i = index - 1;
			break;

		// Comment
		case "/":
			if (ruleText.charAt(i + 1) === "*") {
				i += 2;
				index = ruleText.indexOf("*/", i);
				if (index === -1) {
					throw new SyntaxError("Missing */");
				} else {
					i = index + 1;
				}
			} else {
				buffer += character;
			}
			break;

		case "{":
			if (state === "selector") {
				styleRule.selectorText = buffer.trim();
				buffer = "";
				state = "name";
			}
			break;

		case ":":
			if (state === "name") {
				name = buffer.trim();
				buffer = "";
				state = "value";
			} else {
				buffer += character;
			}
			break;

		case "!":
			if (state === "value" && ruleText.indexOf("!important", i) === i) {
				priority = "important";
				i += "important".length;
			} else {
				buffer += character;
			}
			break;

		case ";":
			if (state === "value") {
				styleRule.style.setProperty(name, buffer.trim(), priority);
				priority = "";
				buffer = "";
				state = "name";
			} else {
				buffer += character;
			}
			break;

		case "}":
			if (state === "value") {
				styleRule.style.setProperty(name, buffer.trim(), priority);
				priority = "";
				buffer = "";
			} else if (state === "name") {
				break;
			} else {
				buffer += character;
			}
			state = "selector";
			break;

		default:
			buffer += character;
			break;

		}
	}

	return styleRule;

};


//.CommonJS
exports.CSSStyleRule = CSSOM.CSSStyleRule;
///CommonJS


/***/ }),
/* 9 */
/***/ (function(module, exports) {

//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-cssrule-interface
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSRule
 */
CSSOM.CSSRule = function CSSRule() {
	this.parentRule = null;
	this.parentStyleSheet = null;
};

CSSOM.CSSRule.UNKNOWN_RULE = 0;                 // obsolete
CSSOM.CSSRule.STYLE_RULE = 1;
CSSOM.CSSRule.CHARSET_RULE = 2;                 // obsolete
CSSOM.CSSRule.IMPORT_RULE = 3;
CSSOM.CSSRule.MEDIA_RULE = 4;
CSSOM.CSSRule.FONT_FACE_RULE = 5;
CSSOM.CSSRule.PAGE_RULE = 6;
CSSOM.CSSRule.KEYFRAMES_RULE = 7;
CSSOM.CSSRule.KEYFRAME_RULE = 8;
CSSOM.CSSRule.MARGIN_RULE = 9;
CSSOM.CSSRule.NAMESPACE_RULE = 10;
CSSOM.CSSRule.COUNTER_STYLE_RULE = 11;
CSSOM.CSSRule.SUPPORTS_RULE = 12;
CSSOM.CSSRule.DOCUMENT_RULE = 13;
CSSOM.CSSRule.FONT_FEATURE_VALUES_RULE = 14;
CSSOM.CSSRule.VIEWPORT_RULE = 15;
CSSOM.CSSRule.REGION_STYLE_RULE = 16;


CSSOM.CSSRule.prototype = {
	constructor: CSSOM.CSSRule
	//FIXME
};


//.CommonJS
exports.CSSRule = CSSOM.CSSRule;
///CommonJS


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSRule: __webpack_require__(9).CSSRule,
	CSSStyleSheet: __webpack_require__(6).CSSStyleSheet,
	MediaList: __webpack_require__(11).MediaList
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssimportrule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSImportRule
 */
CSSOM.CSSImportRule = function CSSImportRule() {
	CSSOM.CSSRule.call(this);
	this.href = "";
	this.media = new CSSOM.MediaList();
	this.styleSheet = new CSSOM.CSSStyleSheet();
};

CSSOM.CSSImportRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSImportRule.prototype.constructor = CSSOM.CSSImportRule;
CSSOM.CSSImportRule.prototype.type = 3;

Object.defineProperty(CSSOM.CSSImportRule.prototype, "cssText", {
  get: function() {
    var mediaText = this.media.mediaText;
    return "@import url(" + this.href + ")" + (mediaText ? " " + mediaText : "") + ";";
  },
  set: function(cssText) {
    var i = 0;

    /**
     * @import url(partial.css) screen, handheld;
     *        ||               |
     *        after-import     media
     *         |
     *         url
     */
    var state = '';

    var buffer = '';
    var index;
    for (var character; (character = cssText.charAt(i)); i++) {

      switch (character) {
        case ' ':
        case '\t':
        case '\r':
        case '\n':
        case '\f':
          if (state === 'after-import') {
            state = 'url';
          } else {
            buffer += character;
          }
          break;

        case '@':
          if (!state && cssText.indexOf('@import', i) === i) {
            state = 'after-import';
            i += 'import'.length;
            buffer = '';
          }
          break;

        case 'u':
          if (state === 'url' && cssText.indexOf('url(', i) === i) {
            index = cssText.indexOf(')', i + 1);
            if (index === -1) {
              throw i + ': ")" not found';
            }
            i += 'url('.length;
            var url = cssText.slice(i, index);
            if (url[0] === url[url.length - 1]) {
              if (url[0] === '"' || url[0] === "'") {
                url = url.slice(1, -1);
              }
            }
            this.href = url;
            i = index;
            state = 'media';
          }
          break;

        case '"':
          if (state === 'url') {
            index = cssText.indexOf('"', i + 1);
            if (!index) {
              throw i + ": '\"' not found";
            }
            this.href = cssText.slice(i + 1, index);
            i = index;
            state = 'media';
          }
          break;

        case "'":
          if (state === 'url') {
            index = cssText.indexOf("'", i + 1);
            if (!index) {
              throw i + ': "\'" not found';
            }
            this.href = cssText.slice(i + 1, index);
            i = index;
            state = 'media';
          }
          break;

        case ';':
          if (state === 'media') {
            if (buffer) {
              this.media.mediaText = buffer.trim();
            }
          }
          break;

        default:
          if (state === 'media') {
            buffer += character;
          }
          break;
      }
    }
  }
});


//.CommonJS
exports.CSSImportRule = CSSOM.CSSImportRule;
///CommonJS


/***/ }),
/* 11 */
/***/ (function(module, exports) {

//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#the-medialist-interface
 */
CSSOM.MediaList = function MediaList(){
	this.length = 0;
};

CSSOM.MediaList.prototype = {

	constructor: CSSOM.MediaList,

	/**
	 * @return {string}
	 */
	get mediaText() {
		return Array.prototype.join.call(this, ", ");
	},

	/**
	 * @param {string} value
	 */
	set mediaText(value) {
		var values = value.split(",");
		var length = this.length = values.length;
		for (var i=0; i<length; i++) {
			this[i] = values[i].trim();
		}
	},

	/**
	 * @param {string} medium
	 */
	appendMedium: function(medium) {
		if (Array.prototype.indexOf.call(this, medium) === -1) {
			this[this.length] = medium;
			this.length++;
		}
	},

	/**
	 * @param {string} medium
	 */
	deleteMedium: function(medium) {
		var index = Array.prototype.indexOf.call(this, medium);
		if (index !== -1) {
			Array.prototype.splice.call(this, index, 1);
		}
	}

};


//.CommonJS
exports.MediaList = CSSOM.MediaList;
///CommonJS


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSRule: __webpack_require__(9).CSSRule,
	MediaList: __webpack_require__(11).MediaList
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#cssmediarule
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSMediaRule
 */
CSSOM.CSSMediaRule = function CSSMediaRule() {
	CSSOM.CSSRule.call(this);
	this.media = new CSSOM.MediaList();
	this.cssRules = [];
};

CSSOM.CSSMediaRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSMediaRule.prototype.constructor = CSSOM.CSSMediaRule;
CSSOM.CSSMediaRule.prototype.type = 4;
//FIXME
//CSSOM.CSSMediaRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSMediaRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

// http://opensource.apple.com/source/WebCore/WebCore-658.28/css/CSSMediaRule.cpp
Object.defineProperty(CSSOM.CSSMediaRule.prototype, "cssText", {
  get: function() {
    var cssTexts = [];
    for (var i=0, length=this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText);
    }
    return "@media " + this.media.mediaText + " {" + cssTexts.join("") + "}";
  }
});


//.CommonJS
exports.CSSMediaRule = CSSOM.CSSMediaRule;
///CommonJS


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
  CSSRule: __webpack_require__(9).CSSRule,
};
///CommonJS


/**
 * @constructor
 * @see https://drafts.csswg.org/css-conditional-3/#the-csssupportsrule-interface
 */
CSSOM.CSSSupportsRule = function CSSSupportsRule() {
  CSSOM.CSSRule.call(this);
  this.conditionText = '';
  this.cssRules = [];
};

CSSOM.CSSSupportsRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSSupportsRule.prototype.constructor = CSSOM.CSSSupportsRule;
CSSOM.CSSSupportsRule.prototype.type = 12;

Object.defineProperty(CSSOM.CSSSupportsRule.prototype, "cssText", {
  get: function() {
    var cssTexts = [];

    for (var i = 0, length = this.cssRules.length; i < length; i++) {
      cssTexts.push(this.cssRules[i].cssText);
    }

    return "@supports " + this.conditionText + " {" + cssTexts.join("") + "}";
  }
});

//.CommonJS
exports.CSSSupportsRule = CSSOM.CSSSupportsRule;
///CommonJS


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSStyleDeclaration: __webpack_require__(4).CSSStyleDeclaration,
	CSSRule: __webpack_require__(9).CSSRule
};
///CommonJS


/**
 * @constructor
 * @see http://dev.w3.org/csswg/cssom/#css-font-face-rule
 */
CSSOM.CSSFontFaceRule = function CSSFontFaceRule() {
	CSSOM.CSSRule.call(this);
	this.style = new CSSOM.CSSStyleDeclaration();
	this.style.parentRule = this;
};

CSSOM.CSSFontFaceRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSFontFaceRule.prototype.constructor = CSSOM.CSSFontFaceRule;
CSSOM.CSSFontFaceRule.prototype.type = 5;
//FIXME
//CSSOM.CSSFontFaceRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSFontFaceRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSFontFaceRule.cpp
Object.defineProperty(CSSOM.CSSFontFaceRule.prototype, "cssText", {
  get: function() {
    return "@font-face {" + this.style.cssText + "}";
  }
});


//.CommonJS
exports.CSSFontFaceRule = CSSOM.CSSFontFaceRule;
///CommonJS


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSRule: __webpack_require__(9).CSSRule
};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/shadow-dom/#host-at-rule
 */
CSSOM.CSSHostRule = function CSSHostRule() {
	CSSOM.CSSRule.call(this);
	this.cssRules = [];
};

CSSOM.CSSHostRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSHostRule.prototype.constructor = CSSOM.CSSHostRule;
CSSOM.CSSHostRule.prototype.type = 1001;
//FIXME
//CSSOM.CSSHostRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSHostRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

Object.defineProperty(CSSOM.CSSHostRule.prototype, "cssText", {
	get: function() {
		var cssTexts = [];
		for (var i=0, length=this.cssRules.length; i < length; i++) {
			cssTexts.push(this.cssRules[i].cssText);
		}
		return "@host {" + cssTexts.join("") + "}";
	}
});


//.CommonJS
exports.CSSHostRule = CSSOM.CSSHostRule;
///CommonJS


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSRule: __webpack_require__(9).CSSRule,
	CSSStyleDeclaration: __webpack_require__(4).CSSStyleDeclaration
};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframeRule
 */
CSSOM.CSSKeyframeRule = function CSSKeyframeRule() {
	CSSOM.CSSRule.call(this);
	this.keyText = '';
	this.style = new CSSOM.CSSStyleDeclaration();
	this.style.parentRule = this;
};

CSSOM.CSSKeyframeRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSKeyframeRule.prototype.constructor = CSSOM.CSSKeyframeRule;
CSSOM.CSSKeyframeRule.prototype.type = 9;
//FIXME
//CSSOM.CSSKeyframeRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSKeyframeRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSKeyframeRule.cpp
Object.defineProperty(CSSOM.CSSKeyframeRule.prototype, "cssText", {
  get: function() {
    return this.keyText + " {" + this.style.cssText + "} ";
  }
});


//.CommonJS
exports.CSSKeyframeRule = CSSOM.CSSKeyframeRule;
///CommonJS


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSRule: __webpack_require__(9).CSSRule
};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/css3-animations/#DOM-CSSKeyframesRule
 */
CSSOM.CSSKeyframesRule = function CSSKeyframesRule() {
	CSSOM.CSSRule.call(this);
	this.name = '';
	this.cssRules = [];
};

CSSOM.CSSKeyframesRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSKeyframesRule.prototype.constructor = CSSOM.CSSKeyframesRule;
CSSOM.CSSKeyframesRule.prototype.type = 8;
//FIXME
//CSSOM.CSSKeyframesRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSKeyframesRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

// http://www.opensource.apple.com/source/WebCore/WebCore-955.66.1/css/WebKitCSSKeyframesRule.cpp
Object.defineProperty(CSSOM.CSSKeyframesRule.prototype, "cssText", {
  get: function() {
    var cssTexts = [];
    for (var i=0, length=this.cssRules.length; i < length; i++) {
      cssTexts.push("  " + this.cssRules[i].cssText);
    }
    return "@" + (this._vendorPrefix || '') + "keyframes " + this.name + " { \n" + cssTexts.join("\n") + "\n}";
  }
});


//.CommonJS
exports.CSSKeyframesRule = CSSOM.CSSKeyframesRule;
///CommonJS


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSValue: __webpack_require__(19).CSSValue
};
///CommonJS


/**
 * @constructor
 * @see http://msdn.microsoft.com/en-us/library/ms537634(v=vs.85).aspx
 *
 */
CSSOM.CSSValueExpression = function CSSValueExpression(token, idx) {
	this._token = token;
	this._idx = idx;
};

CSSOM.CSSValueExpression.prototype = new CSSOM.CSSValue();
CSSOM.CSSValueExpression.prototype.constructor = CSSOM.CSSValueExpression;

/**
 * parse css expression() value
 *
 * @return {Object}
 *         - error:
 *         or
 *         - idx:
 *         - expression:
 *
 * Example:
 *
 * .selector {
 *		zoom: expression(documentElement.clientWidth > 1000 ? '1000px' : 'auto');
 * }
 */
CSSOM.CSSValueExpression.prototype.parse = function() {
	var token = this._token,
			idx = this._idx;

	var character = '',
			expression = '',
			error = '',
			info,
			paren = [];


	for (; ; ++idx) {
		character = token.charAt(idx);

		// end of token
		if (character === '') {
			error = 'css expression error: unfinished expression!';
			break;
		}

		switch(character) {
			case '(':
				paren.push(character);
				expression += character;
				break;

			case ')':
				paren.pop(character);
				expression += character;
				break;

			case '/':
				if ((info = this._parseJSComment(token, idx))) { // comment?
					if (info.error) {
						error = 'css expression error: unfinished comment in expression!';
					} else {
						idx = info.idx;
						// ignore the comment
					}
				} else if ((info = this._parseJSRexExp(token, idx))) { // regexp
					idx = info.idx;
					expression += info.text;
				} else { // other
					expression += character;
				}
				break;

			case "'":
			case '"':
				info = this._parseJSString(token, idx, character);
				if (info) { // string
					idx = info.idx;
					expression += info.text;
				} else {
					expression += character;
				}
				break;

			default:
				expression += character;
				break;
		}

		if (error) {
			break;
		}

		// end of expression
		if (paren.length === 0) {
			break;
		}
	}

	var ret;
	if (error) {
		ret = {
			error: error
		};
	} else {
		ret = {
			idx: idx,
			expression: expression
		};
	}

	return ret;
};


/**
 *
 * @return {Object|false}
 *          - idx:
 *          - text:
 *          or
 *          - error:
 *          or
 *          false
 *
 */
CSSOM.CSSValueExpression.prototype._parseJSComment = function(token, idx) {
	var nextChar = token.charAt(idx + 1),
			text;

	if (nextChar === '/' || nextChar === '*') {
		var startIdx = idx,
				endIdx,
				commentEndChar;

		if (nextChar === '/') { // line comment
			commentEndChar = '\n';
		} else if (nextChar === '*') { // block comment
			commentEndChar = '*/';
		}

		endIdx = token.indexOf(commentEndChar, startIdx + 1 + 1);
		if (endIdx !== -1) {
			endIdx = endIdx + commentEndChar.length - 1;
			text = token.substring(idx, endIdx + 1);
			return {
				idx: endIdx,
				text: text
			};
		} else {
			var error = 'css expression error: unfinished comment in expression!';
			return {
				error: error
			};
		}
	} else {
		return false;
	}
};


/**
 *
 * @return {Object|false}
 *					- idx:
 *					- text:
 *					or 
 *					false
 *
 */
CSSOM.CSSValueExpression.prototype._parseJSString = function(token, idx, sep) {
	var endIdx = this._findMatchedIdx(token, idx, sep),
			text;

	if (endIdx === -1) {
		return false;
	} else {
		text = token.substring(idx, endIdx + sep.length);

		return {
			idx: endIdx,
			text: text
		};
	}
};


/**
 * parse regexp in css expression
 *
 * @return {Object|false}
 *				- idx:
 *				- regExp:
 *				or 
 *				false
 */

/*

all legal RegExp
 
/a/
(/a/)
[/a/]
[12, /a/]

!/a/

+/a/
-/a/
* /a/
/ /a/
%/a/

===/a/
!==/a/
==/a/
!=/a/
>/a/
>=/a/
</a/
<=/a/

&/a/
|/a/
^/a/
~/a/
<</a/
>>/a/
>>>/a/

&&/a/
||/a/
?/a/
=/a/
,/a/

		delete /a/
				in /a/
instanceof /a/
				new /a/
		typeof /a/
			void /a/

*/
CSSOM.CSSValueExpression.prototype._parseJSRexExp = function(token, idx) {
	var before = token.substring(0, idx).replace(/\s+$/, ""),
			legalRegx = [
				/^$/,
				/\($/,
				/\[$/,
				/\!$/,
				/\+$/,
				/\-$/,
				/\*$/,
				/\/\s+/,
				/\%$/,
				/\=$/,
				/\>$/,
				/<$/,
				/\&$/,
				/\|$/,
				/\^$/,
				/\~$/,
				/\?$/,
				/\,$/,
				/delete$/,
				/in$/,
				/instanceof$/,
				/new$/,
				/typeof$/,
				/void$/
			];

	var isLegal = legalRegx.some(function(reg) {
		return reg.test(before);
	});

	if (!isLegal) {
		return false;
	} else {
		var sep = '/';

		// same logic as string
		return this._parseJSString(token, idx, sep);
	}
};


/**
 *
 * find next sep(same line) index in `token`
 *
 * @return {Number}
 *
 */
CSSOM.CSSValueExpression.prototype._findMatchedIdx = function(token, idx, sep) {
	var startIdx = idx,
			endIdx;

	var NOT_FOUND = -1;

	while(true) {
		endIdx = token.indexOf(sep, startIdx + 1);

		if (endIdx === -1) { // not found
			endIdx = NOT_FOUND;
			break;
		} else {
			var text = token.substring(idx + 1, endIdx),
					matched = text.match(/\\+$/);
			if (!matched || matched[0] % 2 === 0) { // not escaped
				break;
			} else {
				startIdx = endIdx;
			}
		}
	}

	// boundary must be in the same line(js sting or regexp)
	var nextNewLineIdx = token.indexOf('\n', idx + 1);
	if (nextNewLineIdx < endIdx) {
		endIdx = NOT_FOUND;
	}


	return endIdx;
};




//.CommonJS
exports.CSSValueExpression = CSSOM.CSSValueExpression;
///CommonJS


/***/ }),
/* 19 */
/***/ (function(module, exports) {

//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
 *
 * TODO: add if needed
 */
CSSOM.CSSValue = function CSSValue() {
};

CSSOM.CSSValue.prototype = {
	constructor: CSSOM.CSSValue,

	// @see: http://www.w3.org/TR/DOM-Level-2-Style/css.html#CSS-CSSValue
	set cssText(text) {
		var name = this._getConstructorName();

		throw new Error('DOMException: property "cssText" of "' + name + '" is readonly and can not be replaced with "' + text + '"!');
	},

	get cssText() {
		var name = this._getConstructorName();

		throw new Error('getter "cssText" of "' + name + '" is not implemented!');
	},

	_getConstructorName: function() {
		var s = this.constructor.toString(),
				c = s.match(/function\s([^\(]+)/),
				name = c[1];

		return name;
	}
};


//.CommonJS
exports.CSSValue = CSSOM.CSSValue;
///CommonJS


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
    CSSRule: __webpack_require__(9).CSSRule,
    MatcherList: __webpack_require__(21).MatcherList
};
///CommonJS


/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
CSSOM.CSSDocumentRule = function CSSDocumentRule() {
    CSSOM.CSSRule.call(this);
    this.matcher = new CSSOM.MatcherList();
    this.cssRules = [];
};

CSSOM.CSSDocumentRule.prototype = new CSSOM.CSSRule();
CSSOM.CSSDocumentRule.prototype.constructor = CSSOM.CSSDocumentRule;
CSSOM.CSSDocumentRule.prototype.type = 10;
//FIXME
//CSSOM.CSSDocumentRule.prototype.insertRule = CSSStyleSheet.prototype.insertRule;
//CSSOM.CSSDocumentRule.prototype.deleteRule = CSSStyleSheet.prototype.deleteRule;

Object.defineProperty(CSSOM.CSSDocumentRule.prototype, "cssText", {
  get: function() {
    var cssTexts = [];
    for (var i=0, length=this.cssRules.length; i < length; i++) {
        cssTexts.push(this.cssRules[i].cssText);
    }
    return "@-moz-document " + this.matcher.matcherText + " {" + cssTexts.join("") + "}";
  }
});


//.CommonJS
exports.CSSDocumentRule = CSSOM.CSSDocumentRule;
///CommonJS


/***/ }),
/* 21 */
/***/ (function(module, exports) {

//.CommonJS
var CSSOM = {};
///CommonJS


/**
 * @constructor
 * @see https://developer.mozilla.org/en/CSS/@-moz-document
 */
CSSOM.MatcherList = function MatcherList(){
    this.length = 0;
};

CSSOM.MatcherList.prototype = {

    constructor: CSSOM.MatcherList,

    /**
     * @return {string}
     */
    get matcherText() {
        return Array.prototype.join.call(this, ", ");
    },

    /**
     * @param {string} value
     */
    set matcherText(value) {
        // just a temporary solution, actually it may be wrong by just split the value with ',', because a url can include ','.
        var values = value.split(",");
        var length = this.length = values.length;
        for (var i=0; i<length; i++) {
            this[i] = values[i].trim();
        }
    },

    /**
     * @param {string} matcher
     */
    appendMatcher: function(matcher) {
        if (Array.prototype.indexOf.call(this, matcher) === -1) {
            this[this.length] = matcher;
            this.length++;
        }
    },

    /**
     * @param {string} matcher
     */
    deleteMatcher: function(matcher) {
        var index = Array.prototype.indexOf.call(this, matcher);
        if (index !== -1) {
            Array.prototype.splice.call(this, index, 1);
        }
    }

};


//.CommonJS
exports.MatcherList = CSSOM.MatcherList;
///CommonJS


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

//.CommonJS
var CSSOM = {
	CSSStyleSheet: __webpack_require__(6).CSSStyleSheet,
	CSSStyleRule: __webpack_require__(8).CSSStyleRule,
	CSSMediaRule: __webpack_require__(12).CSSMediaRule,
	CSSSupportsRule: __webpack_require__(13).CSSSupportsRule,
	CSSStyleDeclaration: __webpack_require__(4).CSSStyleDeclaration,
	CSSKeyframeRule: __webpack_require__(16).CSSKeyframeRule,
	CSSKeyframesRule: __webpack_require__(17).CSSKeyframesRule
};
///CommonJS


/**
 * Produces a deep copy of stylesheet — the instance variables of stylesheet are copied recursively.
 * @param {CSSStyleSheet|CSSOM.CSSStyleSheet} stylesheet
 * @nosideeffects
 * @return {CSSOM.CSSStyleSheet}
 */
CSSOM.clone = function clone(stylesheet) {

	var cloned = new CSSOM.CSSStyleSheet();

	var rules = stylesheet.cssRules;
	if (!rules) {
		return cloned;
	}

	var RULE_TYPES = {
		1: CSSOM.CSSStyleRule,
		4: CSSOM.CSSMediaRule,
		//3: CSSOM.CSSImportRule,
		//5: CSSOM.CSSFontFaceRule,
		//6: CSSOM.CSSPageRule,
		8: CSSOM.CSSKeyframesRule,
		9: CSSOM.CSSKeyframeRule,
		12: CSSOM.CSSSupportsRule
	};

	for (var i=0, rulesLength=rules.length; i < rulesLength; i++) {
		var rule = rules[i];
		var ruleClone = cloned.cssRules[i] = new RULE_TYPES[rule.type]();

		var style = rule.style;
		if (style) {
			var styleClone = ruleClone.style = new CSSOM.CSSStyleDeclaration();
			for (var j=0, styleLength=style.length; j < styleLength; j++) {
				var name = styleClone[j] = style[j];
				styleClone[name] = style[name];
				styleClone._importants[name] = style.getPropertyPriority(name);
			}
			styleClone.length = style.length;
		}

		if (rule.hasOwnProperty('keyText')) {
			ruleClone.keyText = rule.keyText;
		}

		if (rule.hasOwnProperty('selectorText')) {
			ruleClone.selectorText = rule.selectorText;
		}

		if (rule.hasOwnProperty('mediaText')) {
			ruleClone.mediaText = rule.mediaText;
		}

		if (rule.hasOwnProperty('conditionText')) {
			ruleClone.conditionText = rule.conditionText;
		}

		if (rule.hasOwnProperty('cssRules')) {
			ruleClone.cssRules = clone(rule).cssRules;
		}
	}

	return cloned;

};

//.CommonJS
exports.clone = CSSOM.clone;
///CommonJS


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// autogenerated - 7/1/2019

/*
 *
 * https://www.w3.org/Style/CSS/all-properties.en.html
 */

var allProperties = new Set();
module.exports = allProperties;
allProperties.add('align-content');
allProperties.add('align-items');
allProperties.add('align-self');
allProperties.add('alignment-adjust');
allProperties.add('alignment-baseline');
allProperties.add('all');
allProperties.add('animation');
allProperties.add('animation-delay');
allProperties.add('animation-direction');
allProperties.add('animation-duration');
allProperties.add('animation-fill-mode');
allProperties.add('animation-iteration-count');
allProperties.add('animation-name');
allProperties.add('animation-play-state');
allProperties.add('animation-timing-function');
allProperties.add('appearance');
allProperties.add('azimuth');
allProperties.add('backface-visibility');
allProperties.add('background');
allProperties.add('background-attachment');
allProperties.add('background-blend-mode');
allProperties.add('background-clip');
allProperties.add('background-color');
allProperties.add('background-image');
allProperties.add('background-origin');
allProperties.add('background-position');
allProperties.add('background-repeat');
allProperties.add('background-size');
allProperties.add('baseline-shift');
allProperties.add('block-overflow');
allProperties.add('block-size');
allProperties.add('bookmark-label');
allProperties.add('bookmark-level');
allProperties.add('bookmark-state');
allProperties.add('border');
allProperties.add('border-block');
allProperties.add('border-block-color');
allProperties.add('border-block-end');
allProperties.add('border-block-end-color');
allProperties.add('border-block-end-style');
allProperties.add('border-block-end-width');
allProperties.add('border-block-start');
allProperties.add('border-block-start-color');
allProperties.add('border-block-start-style');
allProperties.add('border-block-start-width');
allProperties.add('border-block-style');
allProperties.add('border-block-width');
allProperties.add('border-bottom');
allProperties.add('border-bottom-color');
allProperties.add('border-bottom-fit-length');
allProperties.add('border-bottom-fit-width');
allProperties.add('border-bottom-image');
allProperties.add('border-bottom-left-fit-width');
allProperties.add('border-bottom-left-image');
allProperties.add('border-bottom-left-radius');
allProperties.add('border-bottom-right-fit-length');
allProperties.add('border-bottom-right-fit-width');
allProperties.add('border-bottom-right-image');
allProperties.add('border-bottom-right-radius');
allProperties.add('border-bottom-style');
allProperties.add('border-bottom-width');
allProperties.add('border-bottoml-eft-fit-length');
allProperties.add('border-boundary');
allProperties.add('border-break');
allProperties.add('border-collapse');
allProperties.add('border-color');
allProperties.add('border-corner-fit');
allProperties.add('border-corner-image');
allProperties.add('border-corner-image-transform');
allProperties.add('border-end-end-radius');
allProperties.add('border-end-start-radius');
allProperties.add('border-fit');
allProperties.add('border-fit-length');
allProperties.add('border-fit-width');
allProperties.add('border-image');
allProperties.add('border-image-outset');
allProperties.add('border-image-repeat');
allProperties.add('border-image-slice');
allProperties.add('border-image-source');
allProperties.add('border-image-transform');
allProperties.add('border-image-width');
allProperties.add('border-inline');
allProperties.add('border-inline-color');
allProperties.add('border-inline-end');
allProperties.add('border-inline-end-color');
allProperties.add('border-inline-end-style');
allProperties.add('border-inline-end-width');
allProperties.add('border-inline-start');
allProperties.add('border-inline-start-color');
allProperties.add('border-inline-start-style');
allProperties.add('border-inline-start-width');
allProperties.add('border-inline-style');
allProperties.add('border-inline-width');
allProperties.add('border-left');
allProperties.add('border-left-color');
allProperties.add('border-left-fit-length');
allProperties.add('border-left-fit-width');
allProperties.add('border-left-image');
allProperties.add('border-left-style');
allProperties.add('border-left-width');
allProperties.add('border-radius');
allProperties.add('border-right');
allProperties.add('border-right-color');
allProperties.add('border-right-fit-length');
allProperties.add('border-right-fit-width');
allProperties.add('border-right-image');
allProperties.add('border-right-style');
allProperties.add('border-right-width');
allProperties.add('border-spacing');
allProperties.add('border-start-end-radius');
allProperties.add('border-start-start-radius');
allProperties.add('border-style');
allProperties.add('border-top');
allProperties.add('border-top-color');
allProperties.add('border-top-fit-length');
allProperties.add('border-top-fit-width');
allProperties.add('border-top-image');
allProperties.add('border-top-left-fit-length');
allProperties.add('border-top-left-fit-width');
allProperties.add('border-top-left-image');
allProperties.add('border-top-left-radius');
allProperties.add('border-top-right-fit-length');
allProperties.add('border-top-right-fit-width');
allProperties.add('border-top-right-image');
allProperties.add('border-top-right-radius');
allProperties.add('border-top-style');
allProperties.add('border-top-width');
allProperties.add('border-width');
allProperties.add('bottom');
allProperties.add('box-decoration-break');
allProperties.add('box-shadow');
allProperties.add('box-sizing');
allProperties.add('box-snap');
allProperties.add('break-after');
allProperties.add('break-before');
allProperties.add('break-inside');
allProperties.add('caption-side');
allProperties.add('caret');
allProperties.add('caret-color');
allProperties.add('caret-shape');
allProperties.add('chains');
allProperties.add('clear');
allProperties.add('clip');
allProperties.add('clip-path');
allProperties.add('clip-rule');
allProperties.add('color');
allProperties.add('color-adjust');
allProperties.add('color-interpolation-filters');
allProperties.add('color-scheme');
allProperties.add('column-count');
allProperties.add('column-fill');
allProperties.add('column-gap');
allProperties.add('column-rule');
allProperties.add('column-rule-color');
allProperties.add('column-rule-style');
allProperties.add('column-rule-width');
allProperties.add('column-span');
allProperties.add('column-width');
allProperties.add('columns');
allProperties.add('contain');
allProperties.add('content');
allProperties.add('continue');
allProperties.add('counter-increment');
allProperties.add('counter-reset');
allProperties.add('counter-set');
allProperties.add('cue');
allProperties.add('cue-after');
allProperties.add('cue-before');
allProperties.add('cursor');
allProperties.add('direction');
allProperties.add('display');
allProperties.add('dominant-baseline');
allProperties.add('drop-initial-after-adjust');
allProperties.add('drop-initial-after-align');
allProperties.add('drop-initial-before-adjust');
allProperties.add('drop-initial-before-align');
allProperties.add('drop-initial-size');
allProperties.add('drop-initial-value');
allProperties.add('elevation');
allProperties.add('empty-cells');
allProperties.add('filter');
allProperties.add('flex');
allProperties.add('flex-basis');
allProperties.add('flex-direction');
allProperties.add('flex-flow');
allProperties.add('flex-grow');
allProperties.add('flex-shrink');
allProperties.add('flex-wrap');
allProperties.add('float');
allProperties.add('flood-color');
allProperties.add('flood-opacity');
allProperties.add('flow');
allProperties.add('flow-from');
allProperties.add('flow-into');
allProperties.add('font');
allProperties.add('font-family');
allProperties.add('font-feature-settings');
allProperties.add('font-kerning');
allProperties.add('font-language-override');
allProperties.add('font-max-size');
allProperties.add('font-min-size');
allProperties.add('font-optical-sizing');
allProperties.add('font-palette');
allProperties.add('font-size');
allProperties.add('font-size-adjust');
allProperties.add('font-stretch');
allProperties.add('font-style');
allProperties.add('font-synthesis');
allProperties.add('font-synthesis-small-caps');
allProperties.add('font-synthesis-style');
allProperties.add('font-synthesis-weight');
allProperties.add('font-variant');
allProperties.add('font-variant-alternates');
allProperties.add('font-variant-caps');
allProperties.add('font-variant-east-asian');
allProperties.add('font-variant-emoji');
allProperties.add('font-variant-ligatures');
allProperties.add('font-variant-numeric');
allProperties.add('font-variant-position');
allProperties.add('font-variation-settings');
allProperties.add('font-weight');
allProperties.add('footnote-display');
allProperties.add('footnote-policy');
allProperties.add('forced-color-adjust');
allProperties.add('gap');
allProperties.add('glyph-orientation-vertical');
allProperties.add('grid');
allProperties.add('grid-area');
allProperties.add('grid-auto-columns');
allProperties.add('grid-auto-flow');
allProperties.add('grid-auto-rows');
allProperties.add('grid-column');
allProperties.add('grid-column-end');
allProperties.add('grid-column-start');
allProperties.add('grid-row');
allProperties.add('grid-row-end');
allProperties.add('grid-row-start');
allProperties.add('grid-template');
allProperties.add('grid-template-areas');
allProperties.add('grid-template-columns');
allProperties.add('grid-template-rows');
allProperties.add('hanging-punctuation');
allProperties.add('height');
allProperties.add('hyphenate-character');
allProperties.add('hyphenate-limit-chars');
allProperties.add('hyphenate-limit-last');
allProperties.add('hyphenate-limit-lines');
allProperties.add('hyphenate-limit-zone');
allProperties.add('hyphens');
allProperties.add('image-orientation');
allProperties.add('image-resolution');
allProperties.add('initial-letters');
allProperties.add('initial-letters-align');
allProperties.add('initial-letters-wrap');
allProperties.add('inline-box-align');
allProperties.add('inline-size');
allProperties.add('inline-sizing');
allProperties.add('inset');
allProperties.add('inset-block');
allProperties.add('inset-block-end');
allProperties.add('inset-block-start');
allProperties.add('inset-inline');
allProperties.add('inset-inline-end');
allProperties.add('inset-inline-start');
allProperties.add('isolation');
allProperties.add('justify-content');
allProperties.add('justify-items');
allProperties.add('justify-self');
allProperties.add('left');
allProperties.add('letter-spacing');
allProperties.add('lighting-color');
allProperties.add('line-break');
allProperties.add('line-clamp');
allProperties.add('line-grid');
allProperties.add('line-height');
allProperties.add('line-padding');
allProperties.add('line-snap');
allProperties.add('line-stacking');
allProperties.add('line-stacking-ruby');
allProperties.add('line-stacking-shift');
allProperties.add('line-stacking-strategy');
allProperties.add('list-style');
allProperties.add('list-style-image');
allProperties.add('list-style-position');
allProperties.add('list-style-type');
allProperties.add('margin');
allProperties.add('margin-block');
allProperties.add('margin-block-end');
allProperties.add('margin-block-start');
allProperties.add('margin-bottom');
allProperties.add('margin-inline');
allProperties.add('margin-inline-end');
allProperties.add('margin-inline-start');
allProperties.add('margin-left');
allProperties.add('margin-right');
allProperties.add('margin-top');
allProperties.add('margin-trim');
allProperties.add('marker-side');
allProperties.add('mask');
allProperties.add('mask-border');
allProperties.add('mask-border-mode');
allProperties.add('mask-border-outset');
allProperties.add('mask-border-repeat');
allProperties.add('mask-border-slice');
allProperties.add('mask-border-source');
allProperties.add('mask-border-width');
allProperties.add('mask-clip');
allProperties.add('mask-composite');
allProperties.add('mask-image');
allProperties.add('mask-mode');
allProperties.add('mask-origin');
allProperties.add('mask-position');
allProperties.add('mask-repeat');
allProperties.add('mask-size');
allProperties.add('mask-type');
allProperties.add('max-block-size');
allProperties.add('max-height');
allProperties.add('max-inline-size');
allProperties.add('max-lines');
allProperties.add('max-width');
allProperties.add('min-block-size');
allProperties.add('min-height');
allProperties.add('min-inline-size');
allProperties.add('min-width');
allProperties.add('mix-blend-mode');
allProperties.add('nav-down');
allProperties.add('nav-left');
allProperties.add('nav-right');
allProperties.add('nav-up');
allProperties.add('object-fit');
allProperties.add('object-position');
allProperties.add('offset');
allProperties.add('offset-after');
allProperties.add('offset-anchor');
allProperties.add('offset-before');
allProperties.add('offset-distance');
allProperties.add('offset-end');
allProperties.add('offset-path');
allProperties.add('offset-position');
allProperties.add('offset-rotate');
allProperties.add('offset-start');
allProperties.add('opacity');
allProperties.add('order');
allProperties.add('orphans');
allProperties.add('outline');
allProperties.add('outline-color');
allProperties.add('outline-offset');
allProperties.add('outline-style');
allProperties.add('outline-width');
allProperties.add('overflow');
allProperties.add('overflow-block');
allProperties.add('overflow-inline');
allProperties.add('overflow-wrap');
allProperties.add('overflow-x');
allProperties.add('overflow-y');
allProperties.add('padding');
allProperties.add('padding-block');
allProperties.add('padding-block-end');
allProperties.add('padding-block-start');
allProperties.add('padding-bottom');
allProperties.add('padding-inline');
allProperties.add('padding-inline-end');
allProperties.add('padding-inline-start');
allProperties.add('padding-left');
allProperties.add('padding-right');
allProperties.add('padding-top');
allProperties.add('page');
allProperties.add('page-break-after');
allProperties.add('page-break-before');
allProperties.add('page-break-inside');
allProperties.add('pause');
allProperties.add('pause-after');
allProperties.add('pause-before');
allProperties.add('perspective');
allProperties.add('perspective-origin');
allProperties.add('pitch');
allProperties.add('pitch-range');
allProperties.add('place-content');
allProperties.add('place-items');
allProperties.add('place-self');
allProperties.add('play-during');
allProperties.add('position');
allProperties.add('quotes');
allProperties.add('region-fragment');
allProperties.add('resize');
allProperties.add('richness');
allProperties.add('right');
allProperties.add('row-gap');
allProperties.add('ruby-align');
allProperties.add('ruby-merge');
allProperties.add('ruby-position');
allProperties.add('running');
allProperties.add('scroll-behavior');
allProperties.add('scroll-margin');
allProperties.add('scroll-margin-block');
allProperties.add('scroll-margin-block-end');
allProperties.add('scroll-margin-block-start');
allProperties.add('scroll-margin-bottom');
allProperties.add('scroll-margin-inline');
allProperties.add('scroll-margin-inline-end');
allProperties.add('scroll-margin-inline-start');
allProperties.add('scroll-margin-left');
allProperties.add('scroll-margin-right');
allProperties.add('scroll-margin-top');
allProperties.add('scroll-padding');
allProperties.add('scroll-padding-block');
allProperties.add('scroll-padding-block-end');
allProperties.add('scroll-padding-block-start');
allProperties.add('scroll-padding-bottom');
allProperties.add('scroll-padding-inline');
allProperties.add('scroll-padding-inline-end');
allProperties.add('scroll-padding-inline-start');
allProperties.add('scroll-padding-left');
allProperties.add('scroll-padding-right');
allProperties.add('scroll-padding-top');
allProperties.add('scroll-snap-align');
allProperties.add('scroll-snap-stop');
allProperties.add('scroll-snap-type');
allProperties.add('shape-image-threshold');
allProperties.add('shape-inside');
allProperties.add('shape-margin');
allProperties.add('shape-outside');
allProperties.add('speak');
allProperties.add('speak-header');
allProperties.add('speak-numeral');
allProperties.add('speak-punctuation');
allProperties.add('speech-rate');
allProperties.add('stress');
allProperties.add('string-set');
allProperties.add('tab-size');
allProperties.add('table-layout');
allProperties.add('text-align');
allProperties.add('text-align-all');
allProperties.add('text-align-last');
allProperties.add('text-combine-upright');
allProperties.add('text-decoration');
allProperties.add('text-decoration-color');
allProperties.add('text-decoration-line');
allProperties.add('text-decoration-style');
allProperties.add('text-emphasis');
allProperties.add('text-emphasis-color');
allProperties.add('text-emphasis-position');
allProperties.add('text-emphasis-style');
allProperties.add('text-group-align');
allProperties.add('text-height');
allProperties.add('text-indent');
allProperties.add('text-justify');
allProperties.add('text-orientation');
allProperties.add('text-overflow');
allProperties.add('text-shadow');
allProperties.add('text-space-collapse');
allProperties.add('text-space-trim');
allProperties.add('text-spacing');
allProperties.add('text-transform');
allProperties.add('text-underline-position');
allProperties.add('text-wrap');
allProperties.add('top');
allProperties.add('transform');
allProperties.add('transform-box');
allProperties.add('transform-origin');
allProperties.add('transform-style');
allProperties.add('transition');
allProperties.add('transition-delay');
allProperties.add('transition-duration');
allProperties.add('transition-property');
allProperties.add('transition-timing-function');
allProperties.add('unicode-bidi');
allProperties.add('user-select');
allProperties.add('vertical-align');
allProperties.add('visibility');
allProperties.add('voice-family');
allProperties.add('volume');
allProperties.add('white-space');
allProperties.add('widows');
allProperties.add('width');
allProperties.add('will-change');
allProperties.add('word-break');
allProperties.add('word-spacing');
allProperties.add('word-wrap');
allProperties.add('wrap-after');
allProperties.add('wrap-before');
allProperties.add('wrap-flow');
allProperties.add('wrap-inside');
allProperties.add('wrap-through');
allProperties.add('writing-mode');
allProperties.add('z-index');


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * This file contains all implemented properties that are not a part of any
 * current specifications or drafts, but are handled by browsers nevertheless.
 */

var allExtraProperties = new Set();
module.exports = allExtraProperties;
allExtraProperties.add('background-position-x');
allExtraProperties.add('background-position-y');
allExtraProperties.add('background-repeat-x');
allExtraProperties.add('background-repeat-y');
allExtraProperties.add('color-interpolation');
allExtraProperties.add('color-profile');
allExtraProperties.add('color-rendering');
allExtraProperties.add('css-float');
allExtraProperties.add('enable-background');
allExtraProperties.add('fill');
allExtraProperties.add('fill-opacity');
allExtraProperties.add('fill-rule');
allExtraProperties.add('glyph-orientation-horizontal');
allExtraProperties.add('image-rendering');
allExtraProperties.add('kerning');
allExtraProperties.add('marker');
allExtraProperties.add('marker-end');
allExtraProperties.add('marker-mid');
allExtraProperties.add('marker-offset');
allExtraProperties.add('marker-start');
allExtraProperties.add('marks');
allExtraProperties.add('pointer-events');
allExtraProperties.add('shape-rendering');
allExtraProperties.add('size');
allExtraProperties.add('src');
allExtraProperties.add('stop-color');
allExtraProperties.add('stop-opacity');
allExtraProperties.add('stroke');
allExtraProperties.add('stroke-dasharray');
allExtraProperties.add('stroke-dashoffset');
allExtraProperties.add('stroke-linecap');
allExtraProperties.add('stroke-linejoin');
allExtraProperties.add('stroke-miterlimit');
allExtraProperties.add('stroke-opacity');
allExtraProperties.add('stroke-width');
allExtraProperties.add('text-anchor');
allExtraProperties.add('text-line-through');
allExtraProperties.add('text-line-through-color');
allExtraProperties.add('text-line-through-mode');
allExtraProperties.add('text-line-through-style');
allExtraProperties.add('text-line-through-width');
allExtraProperties.add('text-overline');
allExtraProperties.add('text-overline-color');
allExtraProperties.add('text-overline-mode');
allExtraProperties.add('text-overline-style');
allExtraProperties.add('text-overline-width');
allExtraProperties.add('text-rendering');
allExtraProperties.add('text-underline');
allExtraProperties.add('text-underline-color');
allExtraProperties.add('text-underline-mode');
allExtraProperties.add('text-underline-style');
allExtraProperties.add('text-underline-width');
allExtraProperties.add('unicode-range');
allExtraProperties.add('vector-effect');
allExtraProperties.add('webkit-animation');
allExtraProperties.add('webkit-animation-delay');
allExtraProperties.add('webkit-animation-direction');
allExtraProperties.add('webkit-animation-duration');
allExtraProperties.add('webkit-animation-fill-mode');
allExtraProperties.add('webkit-animation-iteration-count');
allExtraProperties.add('webkit-animation-name');
allExtraProperties.add('webkit-animation-play-state');
allExtraProperties.add('webkit-animation-timing-function');
allExtraProperties.add('webkit-appearance');
allExtraProperties.add('webkit-aspect-ratio');
allExtraProperties.add('webkit-backface-visibility');
allExtraProperties.add('webkit-background-clip');
allExtraProperties.add('webkit-background-composite');
allExtraProperties.add('webkit-background-origin');
allExtraProperties.add('webkit-background-size');
allExtraProperties.add('webkit-border-after');
allExtraProperties.add('webkit-border-after-color');
allExtraProperties.add('webkit-border-after-style');
allExtraProperties.add('webkit-border-after-width');
allExtraProperties.add('webkit-border-before');
allExtraProperties.add('webkit-border-before-color');
allExtraProperties.add('webkit-border-before-style');
allExtraProperties.add('webkit-border-before-width');
allExtraProperties.add('webkit-border-end');
allExtraProperties.add('webkit-border-end-color');
allExtraProperties.add('webkit-border-end-style');
allExtraProperties.add('webkit-border-end-width');
allExtraProperties.add('webkit-border-fit');
allExtraProperties.add('webkit-border-horizontal-spacing');
allExtraProperties.add('webkit-border-image');
allExtraProperties.add('webkit-border-radius');
allExtraProperties.add('webkit-border-start');
allExtraProperties.add('webkit-border-start-color');
allExtraProperties.add('webkit-border-start-style');
allExtraProperties.add('webkit-border-start-width');
allExtraProperties.add('webkit-border-vertical-spacing');
allExtraProperties.add('webkit-box-align');
allExtraProperties.add('webkit-box-direction');
allExtraProperties.add('webkit-box-flex');
allExtraProperties.add('webkit-box-flex-group');
allExtraProperties.add('webkit-box-lines');
allExtraProperties.add('webkit-box-ordinal-group');
allExtraProperties.add('webkit-box-orient');
allExtraProperties.add('webkit-box-pack');
allExtraProperties.add('webkit-box-reflect');
allExtraProperties.add('webkit-box-shadow');
allExtraProperties.add('webkit-color-correction');
allExtraProperties.add('webkit-column-axis');
allExtraProperties.add('webkit-column-break-after');
allExtraProperties.add('webkit-column-break-before');
allExtraProperties.add('webkit-column-break-inside');
allExtraProperties.add('webkit-column-count');
allExtraProperties.add('webkit-column-gap');
allExtraProperties.add('webkit-column-rule');
allExtraProperties.add('webkit-column-rule-color');
allExtraProperties.add('webkit-column-rule-style');
allExtraProperties.add('webkit-column-rule-width');
allExtraProperties.add('webkit-columns');
allExtraProperties.add('webkit-column-span');
allExtraProperties.add('webkit-column-width');
allExtraProperties.add('webkit-filter');
allExtraProperties.add('webkit-flex-align');
allExtraProperties.add('webkit-flex-direction');
allExtraProperties.add('webkit-flex-flow');
allExtraProperties.add('webkit-flex-item-align');
allExtraProperties.add('webkit-flex-line-pack');
allExtraProperties.add('webkit-flex-order');
allExtraProperties.add('webkit-flex-pack');
allExtraProperties.add('webkit-flex-wrap');
allExtraProperties.add('webkit-flow-from');
allExtraProperties.add('webkit-flow-into');
allExtraProperties.add('webkit-font-feature-settings');
allExtraProperties.add('webkit-font-kerning');
allExtraProperties.add('webkit-font-size-delta');
allExtraProperties.add('webkit-font-smoothing');
allExtraProperties.add('webkit-font-variant-ligatures');
allExtraProperties.add('webkit-highlight');
allExtraProperties.add('webkit-hyphenate-character');
allExtraProperties.add('webkit-hyphenate-limit-after');
allExtraProperties.add('webkit-hyphenate-limit-before');
allExtraProperties.add('webkit-hyphenate-limit-lines');
allExtraProperties.add('webkit-hyphens');
allExtraProperties.add('webkit-line-align');
allExtraProperties.add('webkit-line-box-contain');
allExtraProperties.add('webkit-line-break');
allExtraProperties.add('webkit-line-clamp');
allExtraProperties.add('webkit-line-grid');
allExtraProperties.add('webkit-line-snap');
allExtraProperties.add('webkit-locale');
allExtraProperties.add('webkit-logical-height');
allExtraProperties.add('webkit-logical-width');
allExtraProperties.add('webkit-margin-after');
allExtraProperties.add('webkit-margin-after-collapse');
allExtraProperties.add('webkit-margin-before');
allExtraProperties.add('webkit-margin-before-collapse');
allExtraProperties.add('webkit-margin-bottom-collapse');
allExtraProperties.add('webkit-margin-collapse');
allExtraProperties.add('webkit-margin-end');
allExtraProperties.add('webkit-margin-start');
allExtraProperties.add('webkit-margin-top-collapse');
allExtraProperties.add('webkit-marquee');
allExtraProperties.add('webkit-marquee-direction');
allExtraProperties.add('webkit-marquee-increment');
allExtraProperties.add('webkit-marquee-repetition');
allExtraProperties.add('webkit-marquee-speed');
allExtraProperties.add('webkit-marquee-style');
allExtraProperties.add('webkit-mask');
allExtraProperties.add('webkit-mask-attachment');
allExtraProperties.add('webkit-mask-box-image');
allExtraProperties.add('webkit-mask-box-image-outset');
allExtraProperties.add('webkit-mask-box-image-repeat');
allExtraProperties.add('webkit-mask-box-image-slice');
allExtraProperties.add('webkit-mask-box-image-source');
allExtraProperties.add('webkit-mask-box-image-width');
allExtraProperties.add('webkit-mask-clip');
allExtraProperties.add('webkit-mask-composite');
allExtraProperties.add('webkit-mask-image');
allExtraProperties.add('webkit-mask-origin');
allExtraProperties.add('webkit-mask-position');
allExtraProperties.add('webkit-mask-position-x');
allExtraProperties.add('webkit-mask-position-y');
allExtraProperties.add('webkit-mask-repeat');
allExtraProperties.add('webkit-mask-repeat-x');
allExtraProperties.add('webkit-mask-repeat-y');
allExtraProperties.add('webkit-mask-size');
allExtraProperties.add('webkit-match-nearest-mail-blockquote-color');
allExtraProperties.add('webkit-max-logical-height');
allExtraProperties.add('webkit-max-logical-width');
allExtraProperties.add('webkit-min-logical-height');
allExtraProperties.add('webkit-min-logical-width');
allExtraProperties.add('webkit-nbsp-mode');
allExtraProperties.add('webkit-overflow-scrolling');
allExtraProperties.add('webkit-padding-after');
allExtraProperties.add('webkit-padding-before');
allExtraProperties.add('webkit-padding-end');
allExtraProperties.add('webkit-padding-start');
allExtraProperties.add('webkit-perspective');
allExtraProperties.add('webkit-perspective-origin');
allExtraProperties.add('webkit-perspective-origin-x');
allExtraProperties.add('webkit-perspective-origin-y');
allExtraProperties.add('webkit-print-color-adjust');
allExtraProperties.add('webkit-region-break-after');
allExtraProperties.add('webkit-region-break-before');
allExtraProperties.add('webkit-region-break-inside');
allExtraProperties.add('webkit-region-overflow');
allExtraProperties.add('webkit-rtl-ordering');
allExtraProperties.add('webkit-svg-shadow');
allExtraProperties.add('webkit-tap-highlight-color');
allExtraProperties.add('webkit-text-combine');
allExtraProperties.add('webkit-text-decorations-in-effect');
allExtraProperties.add('webkit-text-emphasis');
allExtraProperties.add('webkit-text-emphasis-color');
allExtraProperties.add('webkit-text-emphasis-position');
allExtraProperties.add('webkit-text-emphasis-style');
allExtraProperties.add('webkit-text-fill-color');
allExtraProperties.add('webkit-text-orientation');
allExtraProperties.add('webkit-text-security');
allExtraProperties.add('webkit-text-size-adjust');
allExtraProperties.add('webkit-text-stroke');
allExtraProperties.add('webkit-text-stroke-color');
allExtraProperties.add('webkit-text-stroke-width');
allExtraProperties.add('webkit-transform');
allExtraProperties.add('webkit-transform-origin');
allExtraProperties.add('webkit-transform-origin-x');
allExtraProperties.add('webkit-transform-origin-y');
allExtraProperties.add('webkit-transform-origin-z');
allExtraProperties.add('webkit-transform-style');
allExtraProperties.add('webkit-transition');
allExtraProperties.add('webkit-transition-delay');
allExtraProperties.add('webkit-transition-duration');
allExtraProperties.add('webkit-transition-property');
allExtraProperties.add('webkit-transition-timing-function');
allExtraProperties.add('webkit-user-drag');
allExtraProperties.add('webkit-user-modify');
allExtraProperties.add('webkit-user-select');
allExtraProperties.add('webkit-wrap');
allExtraProperties.add('webkit-wrap-flow');
allExtraProperties.add('webkit-wrap-margin');
allExtraProperties.add('webkit-wrap-padding');
allExtraProperties.add('webkit-wrap-shape-inside');
allExtraProperties.add('webkit-wrap-shape-outside');
allExtraProperties.add('webkit-wrap-through');
allExtraProperties.add('webkit-writing-mode');
allExtraProperties.add('zoom');


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// autogenerated - 7/15/2019

/*
 *
 * https://www.w3.org/Style/CSS/all-properties.en.html
 */

var implementedProperties = new Set();
implementedProperties.add("azimuth");
implementedProperties.add("background");
implementedProperties.add("background-attachment");
implementedProperties.add("background-color");
implementedProperties.add("background-image");
implementedProperties.add("background-position");
implementedProperties.add("background-repeat");
implementedProperties.add("border");
implementedProperties.add("border-bottom");
implementedProperties.add("border-bottom-color");
implementedProperties.add("border-bottom-style");
implementedProperties.add("border-bottom-width");
implementedProperties.add("border-collapse");
implementedProperties.add("border-color");
implementedProperties.add("border-left");
implementedProperties.add("border-left-color");
implementedProperties.add("border-left-style");
implementedProperties.add("border-left-width");
implementedProperties.add("border-right");
implementedProperties.add("border-right-color");
implementedProperties.add("border-right-style");
implementedProperties.add("border-right-width");
implementedProperties.add("border-spacing");
implementedProperties.add("border-style");
implementedProperties.add("border-top");
implementedProperties.add("border-top-color");
implementedProperties.add("border-top-style");
implementedProperties.add("border-top-width");
implementedProperties.add("border-width");
implementedProperties.add("bottom");
implementedProperties.add("clear");
implementedProperties.add("clip");
implementedProperties.add("color");
implementedProperties.add("css-float");
implementedProperties.add("flex");
implementedProperties.add("flex-basis");
implementedProperties.add("flex-grow");
implementedProperties.add("flex-shrink");
implementedProperties.add("float");
implementedProperties.add("flood-color");
implementedProperties.add("font");
implementedProperties.add("font-family");
implementedProperties.add("font-size");
implementedProperties.add("font-style");
implementedProperties.add("font-variant");
implementedProperties.add("font-weight");
implementedProperties.add("height");
implementedProperties.add("left");
implementedProperties.add("lighting-color");
implementedProperties.add("line-height");
implementedProperties.add("margin");
implementedProperties.add("margin-bottom");
implementedProperties.add("margin-left");
implementedProperties.add("margin-right");
implementedProperties.add("margin-top");
implementedProperties.add("opacity");
implementedProperties.add("outline-color");
implementedProperties.add("padding");
implementedProperties.add("padding-bottom");
implementedProperties.add("padding-left");
implementedProperties.add("padding-right");
implementedProperties.add("padding-top");
implementedProperties.add("right");
implementedProperties.add("stop-color");
implementedProperties.add("text-line-through-color");
implementedProperties.add("text-overline-color");
implementedProperties.add("text-underline-color");
implementedProperties.add("top");
implementedProperties.add("webkit-border-after-color");
implementedProperties.add("webkit-border-before-color");
implementedProperties.add("webkit-border-end-color");
implementedProperties.add("webkit-border-start-color");
implementedProperties.add("webkit-column-rule-color");
implementedProperties.add("webkit-match-nearest-mail-blockquote-color");
implementedProperties.add("webkit-tap-highlight-color");
implementedProperties.add("webkit-text-emphasis-color");
implementedProperties.add("webkit-text-fill-color");
implementedProperties.add("webkit-text-stroke-color");
implementedProperties.add("width");
module.exports = implementedProperties;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*********************************************************************
 * These are commonly used parsers for CSS Values they take a string *
 * to parse and return a string after it's been converted, if needed *
 ********************************************************************/


const namedColors = __webpack_require__(27);

exports.TYPES = {
  INTEGER: 1,
  NUMBER: 2,
  LENGTH: 3,
  PERCENT: 4,
  URL: 5,
  COLOR: 6,
  STRING: 7,
  ANGLE: 8,
  KEYWORD: 9,
  NULL_OR_EMPTY_STR: 10,
};

// rough regular expressions
var integerRegEx = /^[-+]?[0-9]+$/;
var numberRegEx = /^[-+]?[0-9]*\.?[0-9]+$/;
var lengthRegEx = /^(0|[-+]?[0-9]*\.?[0-9]+(in|cm|em|mm|pt|pc|px|ex|rem|vh|vw))$/;
var percentRegEx = /^[-+]?[0-9]*\.?[0-9]+%$/;
var urlRegEx = /^url\(\s*([^)]*)\s*\)$/;
var stringRegEx = /^("[^"]*"|'[^']*')$/;
var colorRegEx1 = /^#([0-9a-fA-F]{3,4}){1,2}$/;
var colorRegEx2 = /^rgb\(([^)]*)\)$/;
var colorRegEx3 = /^rgba\(([^)]*)\)$/;
var colorRegEx4 = /^hsla?\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*(,\s*(-?\d+|-?\d*.\d+)\s*)?\)/;
var angleRegEx = /^([-+]?[0-9]*\.?[0-9]+)(deg|grad|rad)$/;

// This will return one of the above types based on the passed in string
exports.valueType = function valueType(val) {
  if (val === '' || val === null) {
    return exports.TYPES.NULL_OR_EMPTY_STR;
  }
  if (typeof val === 'number') {
    val = val.toString();
  }

  if (typeof val !== 'string') {
    return undefined;
  }

  if (integerRegEx.test(val)) {
    return exports.TYPES.INTEGER;
  }
  if (numberRegEx.test(val)) {
    return exports.TYPES.NUMBER;
  }
  if (lengthRegEx.test(val)) {
    return exports.TYPES.LENGTH;
  }
  if (percentRegEx.test(val)) {
    return exports.TYPES.PERCENT;
  }
  if (urlRegEx.test(val)) {
    return exports.TYPES.URL;
  }
  if (stringRegEx.test(val)) {
    return exports.TYPES.STRING;
  }
  if (angleRegEx.test(val)) {
    return exports.TYPES.ANGLE;
  }
  if (colorRegEx1.test(val)) {
    return exports.TYPES.COLOR;
  }
  var res = colorRegEx2.exec(val);
  var parts;
  if (res !== null) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 3) {
      return undefined;
    }
    if (
      parts.every(percentRegEx.test.bind(percentRegEx)) ||
      parts.every(integerRegEx.test.bind(integerRegEx))
    ) {
      return exports.TYPES.COLOR;
    }
    return undefined;
  }
  res = colorRegEx3.exec(val);
  if (res !== null) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 4) {
      return undefined;
    }
    if (
      parts.slice(0, 3).every(percentRegEx.test.bind(percentRegEx)) ||
      parts.every(integerRegEx.test.bind(integerRegEx))
    ) {
      if (numberRegEx.test(parts[3])) {
        return exports.TYPES.COLOR;
      }
    }
    return undefined;
  }

  if (colorRegEx4.test(val)) {
    return exports.TYPES.COLOR;
  }

  // could still be a color, one of the standard keyword colors
  val = val.toLowerCase();

  if (namedColors.includes(val)) {
    return exports.TYPES.COLOR;
  }

  switch (val) {
    // the following are deprecated in CSS3
    case 'activeborder':
    case 'activecaption':
    case 'appworkspace':
    case 'background':
    case 'buttonface':
    case 'buttonhighlight':
    case 'buttonshadow':
    case 'buttontext':
    case 'captiontext':
    case 'graytext':
    case 'highlight':
    case 'highlighttext':
    case 'inactiveborder':
    case 'inactivecaption':
    case 'inactivecaptiontext':
    case 'infobackground':
    case 'infotext':
    case 'menu':
    case 'menutext':
    case 'scrollbar':
    case 'threeddarkshadow':
    case 'threedface':
    case 'threedhighlight':
    case 'threedlightshadow':
    case 'threedshadow':
    case 'window':
    case 'windowframe':
    case 'windowtext':
      return exports.TYPES.COLOR;
    default:
      return exports.TYPES.KEYWORD;
  }
};

exports.parseInteger = function parseInteger(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.INTEGER) {
    return undefined;
  }
  return String(parseInt(val, 10));
};

exports.parseNumber = function parseNumber(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.NUMBER && type !== exports.TYPES.INTEGER) {
    return undefined;
  }
  return String(parseFloat(val));
};

exports.parseLength = function parseLength(val) {
  if (val === 0 || val === '0') {
    return '0px';
  }
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.LENGTH) {
    return undefined;
  }
  return val;
};

exports.parsePercent = function parsePercent(val) {
  if (val === 0 || val === '0') {
    return '0%';
  }
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.PERCENT) {
    return undefined;
  }
  return val;
};

// either a length or a percent
exports.parseMeasurement = function parseMeasurement(val) {
  var length = exports.parseLength(val);
  if (length !== undefined) {
    return length;
  }
  return exports.parsePercent(val);
};

exports.parseUrl = function parseUrl(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  var res = urlRegEx.exec(val);
  // does it match the regex?
  if (!res) {
    return undefined;
  }
  var str = res[1];
  // if it starts with single or double quotes, does it end with the same?
  if ((str[0] === '"' || str[0] === "'") && str[0] !== str[str.length - 1]) {
    return undefined;
  }
  if (str[0] === '"' || str[0] === "'") {
    str = str.substr(1, str.length - 2);
  }

  var i;
  for (i = 0; i < str.length; i++) {
    switch (str[i]) {
      case '(':
      case ')':
      case ' ':
      case '\t':
      case '\n':
      case "'":
      case '"':
        return undefined;
      case '\\':
        i++;
        break;
    }
  }

  return 'url(' + str + ')';
};

exports.parseString = function parseString(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.STRING) {
    return undefined;
  }
  var i;
  for (i = 1; i < val.length - 1; i++) {
    switch (val[i]) {
      case val[0]:
        return undefined;
      case '\\':
        i++;
        while (i < val.length - 1 && /[0-9A-Fa-f]/.test(val[i])) {
          i++;
        }
        break;
    }
  }
  if (i >= val.length) {
    return undefined;
  }
  return val;
};

exports.parseColor = function parseColor(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  var red,
    green,
    blue,
    hue,
    saturation,
    lightness,
    alpha = 1;
  var parts;
  var res = colorRegEx1.exec(val);
  // is it #aaa, #ababab, #aaaa, #abababaa
  if (res) {
    var defaultHex = val.substr(1);
    var hex = val.substr(1);
    if (hex.length === 3 || hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];

      if (defaultHex.length === 4) {
        hex = hex + defaultHex[3] + defaultHex[3];
      }
    }
    red = parseInt(hex.substr(0, 2), 16);
    green = parseInt(hex.substr(2, 2), 16);
    blue = parseInt(hex.substr(4, 2), 16);
    if (hex.length === 8) {
      var hexAlpha = hex.substr(6, 2);
      var hexAlphaToRgbaAlpha = Number((parseInt(hexAlpha, 16) / 255).toFixed(3));

      return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + hexAlphaToRgbaAlpha + ')';
    }
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  }

  res = colorRegEx2.exec(val);
  if (res) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 3) {
      return undefined;
    }
    if (parts.every(percentRegEx.test.bind(percentRegEx))) {
      red = Math.floor((parseFloat(parts[0].slice(0, -1)) * 255) / 100);
      green = Math.floor((parseFloat(parts[1].slice(0, -1)) * 255) / 100);
      blue = Math.floor((parseFloat(parts[2].slice(0, -1)) * 255) / 100);
    } else if (parts.every(integerRegEx.test.bind(integerRegEx))) {
      red = parseInt(parts[0], 10);
      green = parseInt(parts[1], 10);
      blue = parseInt(parts[2], 10);
    } else {
      return undefined;
    }
    red = Math.min(255, Math.max(0, red));
    green = Math.min(255, Math.max(0, green));
    blue = Math.min(255, Math.max(0, blue));
    return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  }

  res = colorRegEx3.exec(val);
  if (res) {
    parts = res[1].split(/\s*,\s*/);
    if (parts.length !== 4) {
      return undefined;
    }
    if (parts.slice(0, 3).every(percentRegEx.test.bind(percentRegEx))) {
      red = Math.floor((parseFloat(parts[0].slice(0, -1)) * 255) / 100);
      green = Math.floor((parseFloat(parts[1].slice(0, -1)) * 255) / 100);
      blue = Math.floor((parseFloat(parts[2].slice(0, -1)) * 255) / 100);
      alpha = parseFloat(parts[3]);
    } else if (parts.slice(0, 3).every(integerRegEx.test.bind(integerRegEx))) {
      red = parseInt(parts[0], 10);
      green = parseInt(parts[1], 10);
      blue = parseInt(parts[2], 10);
      alpha = parseFloat(parts[3]);
    } else {
      return undefined;
    }
    if (isNaN(alpha)) {
      alpha = 1;
    }
    red = Math.min(255, Math.max(0, red));
    green = Math.min(255, Math.max(0, green));
    blue = Math.min(255, Math.max(0, blue));
    alpha = Math.min(1, Math.max(0, alpha));
    if (alpha === 1) {
      return 'rgb(' + red + ', ' + green + ', ' + blue + ')';
    }
    return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + alpha + ')';
  }

  res = colorRegEx4.exec(val);
  if (res) {
    const [, _hue, _saturation, _lightness, _alphaString = ''] = res;
    const _alpha = parseFloat(_alphaString.replace(',', '').trim());
    if (!_hue || !_saturation || !_lightness) {
      return undefined;
    }
    hue = parseFloat(_hue);
    saturation = parseInt(_saturation, 10);
    lightness = parseInt(_lightness, 10);
    if (_alpha && numberRegEx.test(_alpha)) {
      alpha = parseFloat(_alpha);
    }
    if (!_alphaString || alpha === 1) {
      return 'hsl(' + hue + ', ' + saturation + '%, ' + lightness + '%)';
    }
    return 'hsla(' + hue + ', ' + saturation + '%, ' + lightness + '%, ' + alpha + ')';
  }

  if (type === exports.TYPES.COLOR) {
    return val;
  }
  return undefined;
};

exports.parseAngle = function parseAngle(val) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.ANGLE) {
    return undefined;
  }
  var res = angleRegEx.exec(val);
  var flt = parseFloat(res[1]);
  if (res[2] === 'rad') {
    flt *= 180 / Math.PI;
  } else if (res[2] === 'grad') {
    flt *= 360 / 400;
  }

  while (flt < 0) {
    flt += 360;
  }
  while (flt > 360) {
    flt -= 360;
  }
  return flt + 'deg';
};

exports.parseKeyword = function parseKeyword(val, valid_keywords) {
  var type = exports.valueType(val);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    return val;
  }
  if (type !== exports.TYPES.KEYWORD) {
    return undefined;
  }
  val = val.toString().toLowerCase();
  var i;
  for (i = 0; i < valid_keywords.length; i++) {
    if (valid_keywords[i].toLowerCase() === val) {
      return valid_keywords[i];
    }
  }
  return undefined;
};

// utility to translate from border-width to borderWidth
var dashedToCamelCase = function(dashed) {
  var i;
  var camel = '';
  var nextCap = false;
  for (i = 0; i < dashed.length; i++) {
    if (dashed[i] !== '-') {
      camel += nextCap ? dashed[i].toUpperCase() : dashed[i];
      nextCap = false;
    } else {
      nextCap = true;
    }
  }
  return camel;
};
exports.dashedToCamelCase = dashedToCamelCase;

var is_space = /\s/;
var opening_deliminators = ['"', "'", '('];
var closing_deliminators = ['"', "'", ')'];
// this splits on whitespace, but keeps quoted and parened parts together
var getParts = function(str) {
  var deliminator_stack = [];
  var length = str.length;
  var i;
  var parts = [];
  var current_part = '';
  var opening_index;
  var closing_index;
  for (i = 0; i < length; i++) {
    opening_index = opening_deliminators.indexOf(str[i]);
    closing_index = closing_deliminators.indexOf(str[i]);
    if (is_space.test(str[i])) {
      if (deliminator_stack.length === 0) {
        if (current_part !== '') {
          parts.push(current_part);
        }
        current_part = '';
      } else {
        current_part += str[i];
      }
    } else {
      if (str[i] === '\\') {
        i++;
        current_part += str[i];
      } else {
        current_part += str[i];
        if (
          closing_index !== -1 &&
          closing_index === deliminator_stack[deliminator_stack.length - 1]
        ) {
          deliminator_stack.pop();
        } else if (opening_index !== -1) {
          deliminator_stack.push(opening_index);
        }
      }
    }
  }
  if (current_part !== '') {
    parts.push(current_part);
  }
  return parts;
};

/*
 * this either returns undefined meaning that it isn't valid
 * or returns an object where the keys are dashed short
 * hand properties and the values are the values to set
 * on them
 */
exports.shorthandParser = function parse(v, shorthand_for) {
  var obj = {};
  var type = exports.valueType(v);
  if (type === exports.TYPES.NULL_OR_EMPTY_STR) {
    Object.keys(shorthand_for).forEach(function(property) {
      obj[property] = '';
    });
    return obj;
  }

  if (typeof v === 'number') {
    v = v.toString();
  }

  if (typeof v !== 'string') {
    return undefined;
  }

  if (v.toLowerCase() === 'inherit') {
    return {};
  }
  var parts = getParts(v);
  var valid = true;
  parts.forEach(function(part, i) {
    var part_valid = false;
    Object.keys(shorthand_for).forEach(function(property) {
      if (shorthand_for[property].isValid(part, i)) {
        part_valid = true;
        obj[property] = part;
      }
    });
    valid = valid && part_valid;
  });
  if (!valid) {
    return undefined;
  }
  return obj;
};

exports.shorthandSetter = function(property, shorthand_for) {
  return function(v) {
    var obj = exports.shorthandParser(v, shorthand_for);
    if (obj === undefined) {
      return;
    }
    //console.log('shorthandSetter for:', property, 'obj:', obj);
    Object.keys(obj).forEach(function(subprop) {
      // in case subprop is an implicit property, this will clear
      // *its* subpropertiesX
      var camel = dashedToCamelCase(subprop);
      this[camel] = obj[subprop];
      // in case it gets translated into something else (0 -> 0px)
      obj[subprop] = this[camel];
      this.removeProperty(subprop);
      // don't add in empty properties
      if (obj[subprop] !== '') {
        this._values[subprop] = obj[subprop];
      }
    }, this);
    Object.keys(shorthand_for).forEach(function(subprop) {
      if (!obj.hasOwnProperty(subprop)) {
        this.removeProperty(subprop);
        delete this._values[subprop];
      }
    }, this);
    // in case the value is something like 'none' that removes all values,
    // check that the generated one is not empty, first remove the property
    // if it already exists, then call the shorthandGetter, if it's an empty
    // string, don't set the property
    this.removeProperty(property);
    var calculated = exports.shorthandGetter(property, shorthand_for).call(this);
    if (calculated !== '') {
      this._setProperty(property, calculated);
    }
  };
};

exports.shorthandGetter = function(property, shorthand_for) {
  return function() {
    if (this._values[property] !== undefined) {
      return this.getPropertyValue(property);
    }
    return Object.keys(shorthand_for)
      .map(function(subprop) {
        return this.getPropertyValue(subprop);
      }, this)
      .filter(function(value) {
        return value !== '';
      })
      .join(' ');
  };
};

// isValid(){1,4} | inherit
// if one, it applies to all
// if two, the first applies to the top and bottom, and the second to left and right
// if three, the first applies to the top, the second to left and right, the third bottom
// if four, top, right, bottom, left
exports.implicitSetter = function(property_before, property_after, isValid, parser) {
  property_after = property_after || '';
  if (property_after !== '') {
    property_after = '-' + property_after;
  }
  var part_names = ['top', 'right', 'bottom', 'left'];

  return function(v) {
    if (typeof v === 'number') {
      v = v.toString();
    }
    if (typeof v !== 'string') {
      return undefined;
    }
    var parts;
    if (v.toLowerCase() === 'inherit' || v === '') {
      parts = [v];
    } else {
      parts = getParts(v);
    }
    if (parts.length < 1 || parts.length > 4) {
      return undefined;
    }

    if (!parts.every(isValid)) {
      return undefined;
    }

    parts = parts.map(function(part) {
      return parser(part);
    });
    this._setProperty(property_before + property_after, parts.join(' '));
    if (parts.length === 1) {
      parts[1] = parts[0];
    }
    if (parts.length === 2) {
      parts[2] = parts[0];
    }
    if (parts.length === 3) {
      parts[3] = parts[1];
    }

    for (var i = 0; i < 4; i++) {
      var property = property_before + '-' + part_names[i] + property_after;
      this.removeProperty(property);
      if (parts[i] !== '') {
        this._values[property] = parts[i];
      }
    }
    return v;
  };
};

//
//  Companion to implicitSetter, but for the individual parts.
//  This sets the individual value, and checks to see if all four
//  sub-parts are set.  If so, it sets the shorthand version and removes
//  the individual parts from the cssText.
//
exports.subImplicitSetter = function(prefix, part, isValid, parser) {
  var property = prefix + '-' + part;
  var subparts = [prefix + '-top', prefix + '-right', prefix + '-bottom', prefix + '-left'];

  return function(v) {
    if (typeof v === 'number') {
      v = v.toString();
    }
    if (typeof v !== 'string') {
      return undefined;
    }
    if (!isValid(v)) {
      return undefined;
    }
    v = parser(v);
    this._setProperty(property, v);
    var parts = [];
    for (var i = 0; i < 4; i++) {
      if (this._values[subparts[i]] == null || this._values[subparts[i]] === '') {
        break;
      }
      parts.push(this._values[subparts[i]]);
    }
    if (parts.length === 4) {
      for (i = 0; i < 4; i++) {
        this.removeProperty(subparts[i]);
        this._values[subparts[i]] = parts[i];
      }
      this._setProperty(prefix, parts.join(' '));
    }
    return v;
  };
};

var camel_to_dashed = /[A-Z]/g;
var first_segment = /^\([^-]\)-/;
var vendor_prefixes = ['o', 'moz', 'ms', 'webkit'];
exports.camelToDashed = function(camel_case) {
  var match;
  var dashed = camel_case.replace(camel_to_dashed, '-$&').toLowerCase();
  match = dashed.match(first_segment);
  if (match && vendor_prefixes.indexOf(match[1]) !== -1) {
    dashed = '-' + dashed;
  }
  return dashed;
};


/***/ }),
/* 27 */
/***/ (function(module) {

module.exports = JSON.parse("[\"aliceblue\",\"antiquewhite\",\"aqua\",\"aquamarine\",\"azure\",\"beige\",\"bisque\",\"black\",\"blanchedalmond\",\"blue\",\"blueviolet\",\"brown\",\"burlywood\",\"cadetblue\",\"chartreuse\",\"chocolate\",\"coral\",\"cornflowerblue\",\"cornsilk\",\"crimson\",\"cyan\",\"darkblue\",\"darkcyan\",\"darkgoldenrod\",\"darkgray\",\"darkgreen\",\"darkgrey\",\"darkkhaki\",\"darkmagenta\",\"darkolivegreen\",\"darkorange\",\"darkorchid\",\"darkred\",\"darksalmon\",\"darkseagreen\",\"darkslateblue\",\"darkslategray\",\"darkslategrey\",\"darkturquoise\",\"darkviolet\",\"deeppink\",\"deepskyblue\",\"dimgray\",\"dimgrey\",\"dodgerblue\",\"firebrick\",\"floralwhite\",\"forestgreen\",\"fuchsia\",\"gainsboro\",\"ghostwhite\",\"gold\",\"goldenrod\",\"gray\",\"green\",\"greenyellow\",\"grey\",\"honeydew\",\"hotpink\",\"indianred\",\"indigo\",\"ivory\",\"khaki\",\"lavender\",\"lavenderblush\",\"lawngreen\",\"lemonchiffon\",\"lightblue\",\"lightcoral\",\"lightcyan\",\"lightgoldenrodyellow\",\"lightgray\",\"lightgreen\",\"lightgrey\",\"lightpink\",\"lightsalmon\",\"lightseagreen\",\"lightskyblue\",\"lightslategray\",\"lightslategrey\",\"lightsteelblue\",\"lightyellow\",\"lime\",\"limegreen\",\"linen\",\"magenta\",\"maroon\",\"mediumaquamarine\",\"mediumblue\",\"mediumorchid\",\"mediumpurple\",\"mediumseagreen\",\"mediumslateblue\",\"mediumspringgreen\",\"mediumturquoise\",\"mediumvioletred\",\"midnightblue\",\"mintcream\",\"mistyrose\",\"moccasin\",\"navajowhite\",\"navy\",\"oldlace\",\"olive\",\"olivedrab\",\"orange\",\"orangered\",\"orchid\",\"palegoldenrod\",\"palegreen\",\"paleturquoise\",\"palevioletred\",\"papayawhip\",\"peachpuff\",\"peru\",\"pink\",\"plum\",\"powderblue\",\"purple\",\"rebeccapurple\",\"red\",\"rosybrown\",\"royalblue\",\"saddlebrown\",\"salmon\",\"sandybrown\",\"seagreen\",\"seashell\",\"sienna\",\"silver\",\"skyblue\",\"slateblue\",\"slategray\",\"slategrey\",\"snow\",\"springgreen\",\"steelblue\",\"tan\",\"teal\",\"thistle\",\"tomato\",\"turquoise\",\"violet\",\"wheat\",\"white\",\"whitesmoke\",\"yellow\",\"yellowgreen\",\"transparent\",\"currentcolor\"]");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function getBasicPropertyDescriptor(name) {
  return {
    set: function(v) {
      this._setProperty(name, v);
    },
    get: function() {
      return this.getPropertyValue(name);
    },
    enumerable: true,
    configurable: true,
  };
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// autogenerated - 7/15/2019

/*
 *
 * https://www.w3.org/Style/CSS/all-properties.en.html
 */

var external_dependency_parsers_0 = __webpack_require__(26);

var external_dependency_constants_1 = __webpack_require__(30);

var azimuth_export_definition;
azimuth_export_definition = {
  set: function (v) {
    var valueType = external_dependency_parsers_0.valueType(v);

    if (valueType === external_dependency_parsers_0.TYPES.ANGLE) {
      return this._setProperty('azimuth', external_dependency_parsers_0.parseAngle(v));
    }

    if (valueType === external_dependency_parsers_0.TYPES.KEYWORD) {
      var keywords = v.toLowerCase().trim().split(/\s+/);
      var hasBehind = false;

      if (keywords.length > 2) {
        return;
      }

      var behindIndex = keywords.indexOf('behind');
      hasBehind = behindIndex !== -1;

      if (keywords.length === 2) {
        if (!hasBehind) {
          return;
        }

        keywords.splice(behindIndex, 1);
      }

      if (keywords[0] === 'leftwards' || keywords[0] === 'rightwards') {
        if (hasBehind) {
          return;
        }

        return this._setProperty('azimuth', keywords[0]);
      }

      if (keywords[0] === 'behind') {
        return this._setProperty('azimuth', '180deg');
      }

      switch (keywords[0]) {
        case 'left-side':
          return this._setProperty('azimuth', '270deg');

        case 'far-left':
          return this._setProperty('azimuth', (hasBehind ? 240 : 300) + 'deg');

        case 'left':
          return this._setProperty('azimuth', (hasBehind ? 220 : 320) + 'deg');

        case 'center-left':
          return this._setProperty('azimuth', (hasBehind ? 200 : 340) + 'deg');

        case 'center':
          return this._setProperty('azimuth', (hasBehind ? 180 : 0) + 'deg');

        case 'center-right':
          return this._setProperty('azimuth', (hasBehind ? 160 : 20) + 'deg');

        case 'right':
          return this._setProperty('azimuth', (hasBehind ? 140 : 40) + 'deg');

        case 'far-right':
          return this._setProperty('azimuth', (hasBehind ? 120 : 60) + 'deg');

        case 'right-side':
          return this._setProperty('azimuth', '90deg');

        default:
          return;
      }
    }
  },
  get: function () {
    return this.getPropertyValue('azimuth');
  },
  enumerable: true,
  configurable: true
};
var backgroundColor_export_isValid, backgroundColor_export_definition;

var backgroundColor_local_var_parse = function parse(v) {
  var parsed = external_dependency_parsers_0.parseColor(v);

  if (parsed !== undefined) {
    return parsed;
  }

  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'transparent' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

backgroundColor_export_isValid = function isValid(v) {
  return backgroundColor_local_var_parse(v) !== undefined;
};

backgroundColor_export_definition = {
  set: function (v) {
    var parsed = backgroundColor_local_var_parse(v);

    if (parsed === undefined) {
      return;
    }

    this._setProperty('background-color', parsed);
  },
  get: function () {
    return this.getPropertyValue('background-color');
  },
  enumerable: true,
  configurable: true
};
var backgroundImage_export_isValid, backgroundImage_export_definition;

var backgroundImage_local_var_parse = function parse(v) {
  var parsed = external_dependency_parsers_0.parseUrl(v);

  if (parsed !== undefined) {
    return parsed;
  }

  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'none' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

backgroundImage_export_isValid = function isValid(v) {
  return backgroundImage_local_var_parse(v) !== undefined;
};

backgroundImage_export_definition = {
  set: function (v) {
    this._setProperty('background-image', backgroundImage_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('background-image');
  },
  enumerable: true,
  configurable: true
};
var backgroundRepeat_export_isValid, backgroundRepeat_export_definition;

var backgroundRepeat_local_var_parse = function parse(v) {
  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'repeat' || v.toLowerCase() === 'repeat-x' || v.toLowerCase() === 'repeat-y' || v.toLowerCase() === 'no-repeat' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

backgroundRepeat_export_isValid = function isValid(v) {
  return backgroundRepeat_local_var_parse(v) !== undefined;
};

backgroundRepeat_export_definition = {
  set: function (v) {
    this._setProperty('background-repeat', backgroundRepeat_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('background-repeat');
  },
  enumerable: true,
  configurable: true
};
var backgroundAttachment_export_isValid, backgroundAttachment_export_definition;

var backgroundAttachment_local_var_isValid = backgroundAttachment_export_isValid = function isValid(v) {
  return external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'scroll' || v.toLowerCase() === 'fixed' || v.toLowerCase() === 'inherit');
};

backgroundAttachment_export_definition = {
  set: function (v) {
    if (!backgroundAttachment_local_var_isValid(v)) {
      return;
    }

    this._setProperty('background-attachment', v);
  },
  get: function () {
    return this.getPropertyValue('background-attachment');
  },
  enumerable: true,
  configurable: true
};
var backgroundPosition_export_isValid, backgroundPosition_export_definition;
var backgroundPosition_local_var_valid_keywords = ['top', 'center', 'bottom', 'left', 'right'];

var backgroundPosition_local_var_parse = function parse(v) {
  if (v === '' || v === null) {
    return undefined;
  }

  var parts = v.split(/\s+/);

  if (parts.length > 2 || parts.length < 1) {
    return undefined;
  }

  var types = [];
  parts.forEach(function (part, index) {
    types[index] = external_dependency_parsers_0.valueType(part);
  });

  if (parts.length === 1) {
    if (types[0] === external_dependency_parsers_0.TYPES.LENGTH || types[0] === external_dependency_parsers_0.TYPES.PERCENT) {
      return v;
    }

    if (types[0] === external_dependency_parsers_0.TYPES.KEYWORD) {
      if (backgroundPosition_local_var_valid_keywords.indexOf(v.toLowerCase()) !== -1 || v.toLowerCase() === 'inherit') {
        return v;
      }
    }

    return undefined;
  }

  if ((types[0] === external_dependency_parsers_0.TYPES.LENGTH || types[0] === external_dependency_parsers_0.TYPES.PERCENT) && (types[1] === external_dependency_parsers_0.TYPES.LENGTH || types[1] === external_dependency_parsers_0.TYPES.PERCENT)) {
    return v;
  }

  if (types[0] !== external_dependency_parsers_0.TYPES.KEYWORD || types[1] !== external_dependency_parsers_0.TYPES.KEYWORD) {
    return undefined;
  }

  if (backgroundPosition_local_var_valid_keywords.indexOf(parts[0]) !== -1 && backgroundPosition_local_var_valid_keywords.indexOf(parts[1]) !== -1) {
    return v;
  }

  return undefined;
};

backgroundPosition_export_isValid = function isValid(v) {
  return backgroundPosition_local_var_parse(v) !== undefined;
};

backgroundPosition_export_definition = {
  set: function (v) {
    this._setProperty('background-position', backgroundPosition_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('background-position');
  },
  enumerable: true,
  configurable: true
};
var background_export_definition;
var background_local_var_shorthand_for = {
  'background-color': {
    isValid: backgroundColor_export_isValid,
    definition: backgroundColor_export_definition
  },
  'background-image': {
    isValid: backgroundImage_export_isValid,
    definition: backgroundImage_export_definition
  },
  'background-repeat': {
    isValid: backgroundRepeat_export_isValid,
    definition: backgroundRepeat_export_definition
  },
  'background-attachment': {
    isValid: backgroundAttachment_export_isValid,
    definition: backgroundAttachment_export_definition
  },
  'background-position': {
    isValid: backgroundPosition_export_isValid,
    definition: backgroundPosition_export_definition
  }
};
background_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('background', background_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('background', background_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderWidth_export_isValid, borderWidth_export_definition;
// the valid border-widths:
var borderWidth_local_var_widths = ['thin', 'medium', 'thick'];

borderWidth_export_isValid = function parse(v) {
  var length = external_dependency_parsers_0.parseLength(v);

  if (length !== undefined) {
    return true;
  }

  if (typeof v !== 'string') {
    return false;
  }

  if (v === '') {
    return true;
  }

  v = v.toLowerCase();

  if (borderWidth_local_var_widths.indexOf(v) === -1) {
    return false;
  }

  return true;
};

var borderWidth_local_var_isValid = borderWidth_export_isValid;

var borderWidth_local_var_parser = function (v) {
  var length = external_dependency_parsers_0.parseLength(v);

  if (length !== undefined) {
    return length;
  }

  if (borderWidth_local_var_isValid(v)) {
    return v.toLowerCase();
  }

  return undefined;
};

borderWidth_export_definition = {
  set: external_dependency_parsers_0.implicitSetter('border', 'width', borderWidth_local_var_isValid, borderWidth_local_var_parser),
  get: function () {
    return this.getPropertyValue('border-width');
  },
  enumerable: true,
  configurable: true
};
var borderStyle_export_isValid, borderStyle_export_definition;
// the valid border-styles:
var borderStyle_local_var_styles = ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

borderStyle_export_isValid = function parse(v) {
  return typeof v === 'string' && (v === '' || borderStyle_local_var_styles.indexOf(v) !== -1);
};

var borderStyle_local_var_isValid = borderStyle_export_isValid;

var borderStyle_local_var_parser = function (v) {
  if (borderStyle_local_var_isValid(v)) {
    return v.toLowerCase();
  }

  return undefined;
};

borderStyle_export_definition = {
  set: external_dependency_parsers_0.implicitSetter('border', 'style', borderStyle_local_var_isValid, borderStyle_local_var_parser),
  get: function () {
    return this.getPropertyValue('border-style');
  },
  enumerable: true,
  configurable: true
};
var borderColor_export_isValid, borderColor_export_definition;

borderColor_export_isValid = function parse(v) {
  if (typeof v !== 'string') {
    return false;
  }

  return v === '' || v.toLowerCase() === 'transparent' || external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.COLOR;
};

var borderColor_local_var_isValid = borderColor_export_isValid;

var borderColor_local_var_parser = function (v) {
  if (borderColor_local_var_isValid(v)) {
    return v.toLowerCase();
  }

  return undefined;
};

borderColor_export_definition = {
  set: external_dependency_parsers_0.implicitSetter('border', 'color', borderColor_local_var_isValid, borderColor_local_var_parser),
  get: function () {
    return this.getPropertyValue('border-color');
  },
  enumerable: true,
  configurable: true
};
var border_export_definition;
var border_local_var_shorthand_for = {
  'border-width': {
    isValid: borderWidth_export_isValid,
    definition: borderWidth_export_definition
  },
  'border-style': {
    isValid: borderStyle_export_isValid,
    definition: borderStyle_export_definition
  },
  'border-color': {
    isValid: borderColor_export_isValid,
    definition: borderColor_export_definition
  }
};
var border_local_var_myShorthandSetter = external_dependency_parsers_0.shorthandSetter('border', border_local_var_shorthand_for);
var border_local_var_myShorthandGetter = external_dependency_parsers_0.shorthandGetter('border', border_local_var_shorthand_for);
border_export_definition = {
  set: function (v) {
    if (v.toString().toLowerCase() === 'none') {
      v = '';
    }

    border_local_var_myShorthandSetter.call(this, v);
    this.removeProperty('border-top');
    this.removeProperty('border-left');
    this.removeProperty('border-right');
    this.removeProperty('border-bottom');
    this._values['border-top'] = this._values.border;
    this._values['border-left'] = this._values.border;
    this._values['border-right'] = this._values.border;
    this._values['border-bottom'] = this._values.border;
  },
  get: border_local_var_myShorthandGetter,
  enumerable: true,
  configurable: true
};
var borderBottomWidth_export_isValid, borderBottomWidth_export_definition;
var borderBottomWidth_local_var_isValid = borderBottomWidth_export_isValid = borderWidth_export_isValid;
borderBottomWidth_export_definition = {
  set: function (v) {
    if (borderBottomWidth_local_var_isValid(v)) {
      this._setProperty('border-bottom-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-bottom-width');
  },
  enumerable: true,
  configurable: true
};
var borderBottomStyle_export_isValid, borderBottomStyle_export_definition;
borderBottomStyle_export_isValid = borderStyle_export_isValid;
borderBottomStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-bottom-width');
      }

      this._setProperty('border-bottom-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-bottom-style');
  },
  enumerable: true,
  configurable: true
};
var borderBottomColor_export_isValid, borderBottomColor_export_definition;
var borderBottomColor_local_var_isValid = borderBottomColor_export_isValid = borderColor_export_isValid;
borderBottomColor_export_definition = {
  set: function (v) {
    if (borderBottomColor_local_var_isValid(v)) {
      this._setProperty('border-bottom-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-bottom-color');
  },
  enumerable: true,
  configurable: true
};
var borderBottom_export_definition;
var borderBottom_local_var_shorthand_for = {
  'border-bottom-width': {
    isValid: borderBottomWidth_export_isValid,
    definition: borderBottomWidth_export_definition
  },
  'border-bottom-style': {
    isValid: borderBottomStyle_export_isValid,
    definition: borderBottomStyle_export_definition
  },
  'border-bottom-color': {
    isValid: borderBottomColor_export_isValid,
    definition: borderBottomColor_export_definition
  }
};
borderBottom_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-bottom', borderBottom_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-bottom', borderBottom_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderCollapse_export_definition;

var borderCollapse_local_var_parse = function parse(v) {
  if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && (v.toLowerCase() === 'collapse' || v.toLowerCase() === 'separate' || v.toLowerCase() === 'inherit')) {
    return v;
  }

  return undefined;
};

borderCollapse_export_definition = {
  set: function (v) {
    this._setProperty('border-collapse', borderCollapse_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('border-collapse');
  },
  enumerable: true,
  configurable: true
};
var borderLeftWidth_export_isValid, borderLeftWidth_export_definition;
var borderLeftWidth_local_var_isValid = borderLeftWidth_export_isValid = borderWidth_export_isValid;
borderLeftWidth_export_definition = {
  set: function (v) {
    if (borderLeftWidth_local_var_isValid(v)) {
      this._setProperty('border-left-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-left-width');
  },
  enumerable: true,
  configurable: true
};
var borderLeftStyle_export_isValid, borderLeftStyle_export_definition;
borderLeftStyle_export_isValid = borderStyle_export_isValid;
borderLeftStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-left-width');
      }

      this._setProperty('border-left-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-left-style');
  },
  enumerable: true,
  configurable: true
};
var borderLeftColor_export_isValid, borderLeftColor_export_definition;
var borderLeftColor_local_var_isValid = borderLeftColor_export_isValid = borderColor_export_isValid;
borderLeftColor_export_definition = {
  set: function (v) {
    if (borderLeftColor_local_var_isValid(v)) {
      this._setProperty('border-left-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-left-color');
  },
  enumerable: true,
  configurable: true
};
var borderLeft_export_definition;
var borderLeft_local_var_shorthand_for = {
  'border-left-width': {
    isValid: borderLeftWidth_export_isValid,
    definition: borderLeftWidth_export_definition
  },
  'border-left-style': {
    isValid: borderLeftStyle_export_isValid,
    definition: borderLeftStyle_export_definition
  },
  'border-left-color': {
    isValid: borderLeftColor_export_isValid,
    definition: borderLeftColor_export_definition
  }
};
borderLeft_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-left', borderLeft_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-left', borderLeft_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderRightWidth_export_isValid, borderRightWidth_export_definition;
var borderRightWidth_local_var_isValid = borderRightWidth_export_isValid = borderWidth_export_isValid;
borderRightWidth_export_definition = {
  set: function (v) {
    if (borderRightWidth_local_var_isValid(v)) {
      this._setProperty('border-right-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-right-width');
  },
  enumerable: true,
  configurable: true
};
var borderRightStyle_export_isValid, borderRightStyle_export_definition;
borderRightStyle_export_isValid = borderStyle_export_isValid;
borderRightStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-right-width');
      }

      this._setProperty('border-right-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-right-style');
  },
  enumerable: true,
  configurable: true
};
var borderRightColor_export_isValid, borderRightColor_export_definition;
var borderRightColor_local_var_isValid = borderRightColor_export_isValid = borderColor_export_isValid;
borderRightColor_export_definition = {
  set: function (v) {
    if (borderRightColor_local_var_isValid(v)) {
      this._setProperty('border-right-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-right-color');
  },
  enumerable: true,
  configurable: true
};
var borderRight_export_definition;
var borderRight_local_var_shorthand_for = {
  'border-right-width': {
    isValid: borderRightWidth_export_isValid,
    definition: borderRightWidth_export_definition
  },
  'border-right-style': {
    isValid: borderRightStyle_export_isValid,
    definition: borderRightStyle_export_definition
  },
  'border-right-color': {
    isValid: borderRightColor_export_isValid,
    definition: borderRightColor_export_definition
  }
};
borderRight_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-right', borderRight_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-right', borderRight_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var borderSpacing_export_definition;

// <length> <length>? | inherit
// if one, it applies to both horizontal and verical spacing
// if two, the first applies to the horizontal and the second applies to vertical spacing
var borderSpacing_local_var_parse = function parse(v) {
  if (v === '' || v === null) {
    return undefined;
  }

  if (v === 0) {
    return '0px';
  }

  if (v.toLowerCase() === 'inherit') {
    return v;
  }

  var parts = v.split(/\s+/);

  if (parts.length !== 1 && parts.length !== 2) {
    return undefined;
  }

  parts.forEach(function (part) {
    if (external_dependency_parsers_0.valueType(part) !== external_dependency_parsers_0.TYPES.LENGTH) {
      return undefined;
    }
  });
  return v;
};

borderSpacing_export_definition = {
  set: function (v) {
    this._setProperty('border-spacing', borderSpacing_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('border-spacing');
  },
  enumerable: true,
  configurable: true
};
var borderTopWidth_export_isValid, borderTopWidth_export_definition;
borderTopWidth_export_isValid = borderWidth_export_isValid;
borderTopWidth_export_definition = {
  set: function (v) {
    if (borderWidth_export_isValid(v)) {
      this._setProperty('border-top-width', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-top-width');
  },
  enumerable: true,
  configurable: true
};
var borderTopStyle_export_isValid, borderTopStyle_export_definition;
borderTopStyle_export_isValid = borderStyle_export_isValid;
borderTopStyle_export_definition = {
  set: function (v) {
    if (borderStyle_export_isValid(v)) {
      if (v.toLowerCase() === 'none') {
        v = '';
        this.removeProperty('border-top-width');
      }

      this._setProperty('border-top-style', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-top-style');
  },
  enumerable: true,
  configurable: true
};
var borderTopColor_export_isValid, borderTopColor_export_definition;
var borderTopColor_local_var_isValid = borderTopColor_export_isValid = borderColor_export_isValid;
borderTopColor_export_definition = {
  set: function (v) {
    if (borderTopColor_local_var_isValid(v)) {
      this._setProperty('border-top-color', v);
    }
  },
  get: function () {
    return this.getPropertyValue('border-top-color');
  },
  enumerable: true,
  configurable: true
};
var borderTop_export_definition;
var borderTop_local_var_shorthand_for = {
  'border-top-width': {
    isValid: borderTopWidth_export_isValid,
    definition: borderTopWidth_export_definition
  },
  'border-top-style': {
    isValid: borderTopStyle_export_isValid,
    definition: borderTopStyle_export_definition
  },
  'border-top-color': {
    isValid: borderTopColor_export_isValid,
    definition: borderTopColor_export_definition
  }
};
borderTop_export_definition = {
  set: external_dependency_parsers_0.shorthandSetter('border-top', borderTop_local_var_shorthand_for),
  get: external_dependency_parsers_0.shorthandGetter('border-top', borderTop_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var bottom_export_definition;
bottom_export_definition = {
  set: function (v) {
    this._setProperty('bottom', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('bottom');
  },
  enumerable: true,
  configurable: true
};
var clear_export_definition;
var clear_local_var_clear_keywords = ['none', 'left', 'right', 'both', 'inherit'];
clear_export_definition = {
  set: function (v) {
    this._setProperty('clear', external_dependency_parsers_0.parseKeyword(v, clear_local_var_clear_keywords));
  },
  get: function () {
    return this.getPropertyValue('clear');
  },
  enumerable: true,
  configurable: true
};
var clip_export_definition;
var clip_local_var_shape_regex = /^rect\((.*)\)$/i;

var clip_local_var_parse = function (val) {
  if (val === '' || val === null) {
    return val;
  }

  if (typeof val !== 'string') {
    return undefined;
  }

  val = val.toLowerCase();

  if (val === 'auto' || val === 'inherit') {
    return val;
  }

  var matches = val.match(clip_local_var_shape_regex);

  if (!matches) {
    return undefined;
  }

  var parts = matches[1].split(/\s*,\s*/);

  if (parts.length !== 4) {
    return undefined;
  }

  var valid = parts.every(function (part, index) {
    var measurement = external_dependency_parsers_0.parseMeasurement(part);
    parts[index] = measurement;
    return measurement !== undefined;
  });

  if (!valid) {
    return undefined;
  }

  parts = parts.join(', ');
  return val.replace(matches[1], parts);
};

clip_export_definition = {
  set: function (v) {
    this._setProperty('clip', clip_local_var_parse(v));
  },
  get: function () {
    return this.getPropertyValue('clip');
  },
  enumerable: true,
  configurable: true
};
var color_export_definition;
color_export_definition = {
  set: function (v) {
    this._setProperty('color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('color');
  },
  enumerable: true,
  configurable: true
};
var cssFloat_export_definition;
cssFloat_export_definition = {
  set: function (v) {
    this._setProperty('float', v);
  },
  get: function () {
    return this.getPropertyValue('float');
  },
  enumerable: true,
  configurable: true
};
var flexGrow_export_isValid, flexGrow_export_definition;

flexGrow_export_isValid = function isValid(v, positionAtFlexShorthand) {
  return external_dependency_parsers_0.parseNumber(v) !== undefined && positionAtFlexShorthand === external_dependency_constants_1.POSITION_AT_SHORTHAND.first;
};

flexGrow_export_definition = {
  set: function (v) {
    this._setProperty('flex-grow', external_dependency_parsers_0.parseNumber(v));
  },
  get: function () {
    return this.getPropertyValue('flex-grow');
  },
  enumerable: true,
  configurable: true
};
var flexShrink_export_isValid, flexShrink_export_definition;

flexShrink_export_isValid = function isValid(v, positionAtFlexShorthand) {
  return external_dependency_parsers_0.parseNumber(v) !== undefined && positionAtFlexShorthand === external_dependency_constants_1.POSITION_AT_SHORTHAND.second;
};

flexShrink_export_definition = {
  set: function (v) {
    this._setProperty('flex-shrink', external_dependency_parsers_0.parseNumber(v));
  },
  get: function () {
    return this.getPropertyValue('flex-shrink');
  },
  enumerable: true,
  configurable: true
};
var flexBasis_export_isValid, flexBasis_export_definition;

function flexBasis_local_fn_parse(v) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }

  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }

  return external_dependency_parsers_0.parseMeasurement(v);
}

flexBasis_export_isValid = function isValid(v) {
  return flexBasis_local_fn_parse(v) !== undefined;
};

flexBasis_export_definition = {
  set: function (v) {
    this._setProperty('flex-basis', flexBasis_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('flex-basis');
  },
  enumerable: true,
  configurable: true
};
var flex_export_isValid, flex_export_definition;
var flex_local_var_shorthand_for = {
  'flex-grow': {
    isValid: flexGrow_export_isValid,
    definition: flexGrow_export_definition
  },
  'flex-shrink': {
    isValid: flexShrink_export_isValid,
    definition: flexShrink_export_definition
  },
  'flex-basis': {
    isValid: flexBasis_export_isValid,
    definition: flexBasis_export_definition
  }
};
var flex_local_var_myShorthandSetter = external_dependency_parsers_0.shorthandSetter('flex', flex_local_var_shorthand_for);

flex_export_isValid = function isValid(v) {
  return external_dependency_parsers_0.shorthandParser(v, flex_local_var_shorthand_for) !== undefined;
};

flex_export_definition = {
  set: function (v) {
    var normalizedValue = String(v).trim().toLowerCase();

    if (normalizedValue === 'none') {
      flex_local_var_myShorthandSetter.call(this, '0 0 auto');
      return;
    }

    if (normalizedValue === 'initial') {
      flex_local_var_myShorthandSetter.call(this, '0 1 auto');
      return;
    }

    if (normalizedValue === 'auto') {
      this.removeProperty('flex-grow');
      this.removeProperty('flex-shrink');
      this.setProperty('flex-basis', normalizedValue);
      return;
    }

    flex_local_var_myShorthandSetter.call(this, v);
  },
  get: external_dependency_parsers_0.shorthandGetter('flex', flex_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var float_export_definition;
float_export_definition = {
  set: function (v) {
    this._setProperty('float', v);
  },
  get: function () {
    return this.getPropertyValue('float');
  },
  enumerable: true,
  configurable: true
};
var floodColor_export_definition;
floodColor_export_definition = {
  set: function (v) {
    this._setProperty('flood-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('flood-color');
  },
  enumerable: true,
  configurable: true
};
var fontFamily_export_isValid, fontFamily_export_definition;
var fontFamily_local_var_partsRegEx = /\s*,\s*/;

fontFamily_export_isValid = function isValid(v) {
  if (v === '' || v === null) {
    return true;
  }

  var parts = v.split(fontFamily_local_var_partsRegEx);
  var len = parts.length;
  var i;
  var type;

  for (i = 0; i < len; i++) {
    type = external_dependency_parsers_0.valueType(parts[i]);

    if (type === external_dependency_parsers_0.TYPES.STRING || type === external_dependency_parsers_0.TYPES.KEYWORD) {
      return true;
    }
  }

  return false;
};

fontFamily_export_definition = {
  set: function (v) {
    this._setProperty('font-family', v);
  },
  get: function () {
    return this.getPropertyValue('font-family');
  },
  enumerable: true,
  configurable: true
};
var fontSize_export_isValid, fontSize_export_definition;
var fontSize_local_var_absoluteSizes = ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large'];
var fontSize_local_var_relativeSizes = ['larger', 'smaller'];

fontSize_export_isValid = function (v) {
  var type = external_dependency_parsers_0.valueType(v.toLowerCase());
  return type === external_dependency_parsers_0.TYPES.LENGTH || type === external_dependency_parsers_0.TYPES.PERCENT || type === external_dependency_parsers_0.TYPES.KEYWORD && fontSize_local_var_absoluteSizes.indexOf(v.toLowerCase()) !== -1 || type === external_dependency_parsers_0.TYPES.KEYWORD && fontSize_local_var_relativeSizes.indexOf(v.toLowerCase()) !== -1;
};

function fontSize_local_fn_parse(v) {
  const valueAsString = String(v).toLowerCase();
  const optionalArguments = fontSize_local_var_absoluteSizes.concat(fontSize_local_var_relativeSizes);
  const isOptionalArgument = optionalArguments.some(stringValue => stringValue.toLowerCase() === valueAsString);
  return isOptionalArgument ? valueAsString : external_dependency_parsers_0.parseMeasurement(v);
}

fontSize_export_definition = {
  set: function (v) {
    this._setProperty('font-size', fontSize_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('font-size');
  },
  enumerable: true,
  configurable: true
};
var fontStyle_export_isValid, fontStyle_export_definition;
var fontStyle_local_var_valid_styles = ['normal', 'italic', 'oblique', 'inherit'];

fontStyle_export_isValid = function (v) {
  return fontStyle_local_var_valid_styles.indexOf(v.toLowerCase()) !== -1;
};

fontStyle_export_definition = {
  set: function (v) {
    this._setProperty('font-style', v);
  },
  get: function () {
    return this.getPropertyValue('font-style');
  },
  enumerable: true,
  configurable: true
};
var fontVariant_export_isValid, fontVariant_export_definition;
var fontVariant_local_var_valid_variants = ['normal', 'small-caps', 'inherit'];

fontVariant_export_isValid = function isValid(v) {
  return fontVariant_local_var_valid_variants.indexOf(v.toLowerCase()) !== -1;
};

fontVariant_export_definition = {
  set: function (v) {
    this._setProperty('font-variant', v);
  },
  get: function () {
    return this.getPropertyValue('font-variant');
  },
  enumerable: true,
  configurable: true
};
var fontWeight_export_isValid, fontWeight_export_definition;
var fontWeight_local_var_valid_weights = ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'inherit'];

fontWeight_export_isValid = function isValid(v) {
  return fontWeight_local_var_valid_weights.indexOf(v.toLowerCase()) !== -1;
};

fontWeight_export_definition = {
  set: function (v) {
    this._setProperty('font-weight', v);
  },
  get: function () {
    return this.getPropertyValue('font-weight');
  },
  enumerable: true,
  configurable: true
};
var lineHeight_export_isValid, lineHeight_export_definition;

lineHeight_export_isValid = function isValid(v) {
  var type = external_dependency_parsers_0.valueType(v);
  return type === external_dependency_parsers_0.TYPES.KEYWORD && v.toLowerCase() === 'normal' || v.toLowerCase() === 'inherit' || type === external_dependency_parsers_0.TYPES.NUMBER || type === external_dependency_parsers_0.TYPES.LENGTH || type === external_dependency_parsers_0.TYPES.PERCENT;
};

lineHeight_export_definition = {
  set: function (v) {
    this._setProperty('line-height', v);
  },
  get: function () {
    return this.getPropertyValue('line-height');
  },
  enumerable: true,
  configurable: true
};
var font_export_definition;
var font_local_var_shorthand_for = {
  'font-family': {
    isValid: fontFamily_export_isValid,
    definition: fontFamily_export_definition
  },
  'font-size': {
    isValid: fontSize_export_isValid,
    definition: fontSize_export_definition
  },
  'font-style': {
    isValid: fontStyle_export_isValid,
    definition: fontStyle_export_definition
  },
  'font-variant': {
    isValid: fontVariant_export_isValid,
    definition: fontVariant_export_definition
  },
  'font-weight': {
    isValid: fontWeight_export_isValid,
    definition: fontWeight_export_definition
  },
  'line-height': {
    isValid: lineHeight_export_isValid,
    definition: lineHeight_export_definition
  }
};
var font_local_var_static_fonts = ['caption', 'icon', 'menu', 'message-box', 'small-caption', 'status-bar', 'inherit'];
var font_local_var_setter = external_dependency_parsers_0.shorthandSetter('font', font_local_var_shorthand_for);
font_export_definition = {
  set: function (v) {
    var short = external_dependency_parsers_0.shorthandParser(v, font_local_var_shorthand_for);

    if (short !== undefined) {
      return font_local_var_setter.call(this, v);
    }

    if (external_dependency_parsers_0.valueType(v) === external_dependency_parsers_0.TYPES.KEYWORD && font_local_var_static_fonts.indexOf(v.toLowerCase()) !== -1) {
      this._setProperty('font', v);
    }
  },
  get: external_dependency_parsers_0.shorthandGetter('font', font_local_var_shorthand_for),
  enumerable: true,
  configurable: true
};
var height_export_definition;

function height_local_fn_parse(v) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }

  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }

  return external_dependency_parsers_0.parseMeasurement(v);
}

height_export_definition = {
  set: function (v) {
    this._setProperty('height', height_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('height');
  },
  enumerable: true,
  configurable: true
};
var left_export_definition;
left_export_definition = {
  set: function (v) {
    this._setProperty('left', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('left');
  },
  enumerable: true,
  configurable: true
};
var lightingColor_export_definition;
lightingColor_export_definition = {
  set: function (v) {
    this._setProperty('lighting-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('lighting-color');
  },
  enumerable: true,
  configurable: true
};
var margin_export_definition, margin_export_isValid, margin_export_parser;
var margin_local_var_TYPES = external_dependency_parsers_0.TYPES;

var margin_local_var_isValid = function (v) {
  if (v.toLowerCase() === 'auto') {
    return true;
  }

  var type = external_dependency_parsers_0.valueType(v);
  return type === margin_local_var_TYPES.LENGTH || type === margin_local_var_TYPES.PERCENT || type === margin_local_var_TYPES.INTEGER && (v === '0' || v === 0);
};

var margin_local_var_parser = function (v) {
  var V = v.toLowerCase();

  if (V === 'auto') {
    return V;
  }

  return external_dependency_parsers_0.parseMeasurement(v);
};

var margin_local_var_mySetter = external_dependency_parsers_0.implicitSetter('margin', '', margin_local_var_isValid, margin_local_var_parser);
var margin_local_var_myGlobal = external_dependency_parsers_0.implicitSetter('margin', '', function () {
  return true;
}, function (v) {
  return v;
});
margin_export_definition = {
  set: function (v) {
    if (typeof v === 'number') {
      v = String(v);
    }

    if (typeof v !== 'string') {
      return;
    }

    var V = v.toLowerCase();

    switch (V) {
      case 'inherit':
      case 'initial':
      case 'unset':
      case '':
        margin_local_var_myGlobal.call(this, V);
        break;

      default:
        margin_local_var_mySetter.call(this, v);
        break;
    }
  },
  get: function () {
    return this.getPropertyValue('margin');
  },
  enumerable: true,
  configurable: true
};
margin_export_isValid = margin_local_var_isValid;
margin_export_parser = margin_local_var_parser;
var marginBottom_export_definition;
marginBottom_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'bottom', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-bottom');
  },
  enumerable: true,
  configurable: true
};
var marginLeft_export_definition;
marginLeft_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'left', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-left');
  },
  enumerable: true,
  configurable: true
};
var marginRight_export_definition;
marginRight_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'right', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-right');
  },
  enumerable: true,
  configurable: true
};
var marginTop_export_definition;
marginTop_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('margin', 'top', {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.isValid, {
    definition: margin_export_definition,
    isValid: margin_export_isValid,
    parser: margin_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('margin-top');
  },
  enumerable: true,
  configurable: true
};
var opacity_export_definition;
opacity_export_definition = {
  set: function (v) {
    this._setProperty('opacity', external_dependency_parsers_0.parseNumber(v));
  },
  get: function () {
    return this.getPropertyValue('opacity');
  },
  enumerable: true,
  configurable: true
};
var outlineColor_export_definition;
outlineColor_export_definition = {
  set: function (v) {
    this._setProperty('outline-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('outline-color');
  },
  enumerable: true,
  configurable: true
};
var padding_export_definition, padding_export_isValid, padding_export_parser;
var padding_local_var_TYPES = external_dependency_parsers_0.TYPES;

var padding_local_var_isValid = function (v) {
  var type = external_dependency_parsers_0.valueType(v);
  return type === padding_local_var_TYPES.LENGTH || type === padding_local_var_TYPES.PERCENT || type === padding_local_var_TYPES.INTEGER && (v === '0' || v === 0);
};

var padding_local_var_parser = function (v) {
  return external_dependency_parsers_0.parseMeasurement(v);
};

var padding_local_var_mySetter = external_dependency_parsers_0.implicitSetter('padding', '', padding_local_var_isValid, padding_local_var_parser);
var padding_local_var_myGlobal = external_dependency_parsers_0.implicitSetter('padding', '', function () {
  return true;
}, function (v) {
  return v;
});
padding_export_definition = {
  set: function (v) {
    if (typeof v === 'number') {
      v = String(v);
    }

    if (typeof v !== 'string') {
      return;
    }

    var V = v.toLowerCase();

    switch (V) {
      case 'inherit':
      case 'initial':
      case 'unset':
      case '':
        padding_local_var_myGlobal.call(this, V);
        break;

      default:
        padding_local_var_mySetter.call(this, v);
        break;
    }
  },
  get: function () {
    return this.getPropertyValue('padding');
  },
  enumerable: true,
  configurable: true
};
padding_export_isValid = padding_local_var_isValid;
padding_export_parser = padding_local_var_parser;
var paddingBottom_export_definition;
paddingBottom_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'bottom', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-bottom');
  },
  enumerable: true,
  configurable: true
};
var paddingLeft_export_definition;
paddingLeft_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'left', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-left');
  },
  enumerable: true,
  configurable: true
};
var paddingRight_export_definition;
paddingRight_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'right', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-right');
  },
  enumerable: true,
  configurable: true
};
var paddingTop_export_definition;
paddingTop_export_definition = {
  set: external_dependency_parsers_0.subImplicitSetter('padding', 'top', {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.isValid, {
    definition: padding_export_definition,
    isValid: padding_export_isValid,
    parser: padding_export_parser
  }.parser),
  get: function () {
    return this.getPropertyValue('padding-top');
  },
  enumerable: true,
  configurable: true
};
var right_export_definition;
right_export_definition = {
  set: function (v) {
    this._setProperty('right', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('right');
  },
  enumerable: true,
  configurable: true
};
var stopColor_export_definition;
stopColor_export_definition = {
  set: function (v) {
    this._setProperty('stop-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('stop-color');
  },
  enumerable: true,
  configurable: true
};
var textLineThroughColor_export_definition;
textLineThroughColor_export_definition = {
  set: function (v) {
    this._setProperty('text-line-through-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('text-line-through-color');
  },
  enumerable: true,
  configurable: true
};
var textOverlineColor_export_definition;
textOverlineColor_export_definition = {
  set: function (v) {
    this._setProperty('text-overline-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('text-overline-color');
  },
  enumerable: true,
  configurable: true
};
var textUnderlineColor_export_definition;
textUnderlineColor_export_definition = {
  set: function (v) {
    this._setProperty('text-underline-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('text-underline-color');
  },
  enumerable: true,
  configurable: true
};
var top_export_definition;
top_export_definition = {
  set: function (v) {
    this._setProperty('top', external_dependency_parsers_0.parseMeasurement(v));
  },
  get: function () {
    return this.getPropertyValue('top');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderAfterColor_export_definition;
webkitBorderAfterColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-after-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-after-color');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderBeforeColor_export_definition;
webkitBorderBeforeColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-before-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-before-color');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderEndColor_export_definition;
webkitBorderEndColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-end-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-end-color');
  },
  enumerable: true,
  configurable: true
};
var webkitBorderStartColor_export_definition;
webkitBorderStartColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-border-start-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-border-start-color');
  },
  enumerable: true,
  configurable: true
};
var webkitColumnRuleColor_export_definition;
webkitColumnRuleColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-column-rule-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-column-rule-color');
  },
  enumerable: true,
  configurable: true
};
var webkitMatchNearestMailBlockquoteColor_export_definition;
webkitMatchNearestMailBlockquoteColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-match-nearest-mail-blockquote-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-match-nearest-mail-blockquote-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTapHighlightColor_export_definition;
webkitTapHighlightColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-tap-highlight-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-tap-highlight-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTextEmphasisColor_export_definition;
webkitTextEmphasisColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-text-emphasis-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-text-emphasis-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTextFillColor_export_definition;
webkitTextFillColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-text-fill-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-text-fill-color');
  },
  enumerable: true,
  configurable: true
};
var webkitTextStrokeColor_export_definition;
webkitTextStrokeColor_export_definition = {
  set: function (v) {
    this._setProperty('-webkit-text-stroke-color', external_dependency_parsers_0.parseColor(v));
  },
  get: function () {
    return this.getPropertyValue('-webkit-text-stroke-color');
  },
  enumerable: true,
  configurable: true
};
var width_export_definition;

function width_local_fn_parse(v) {
  if (String(v).toLowerCase() === 'auto') {
    return 'auto';
  }

  if (String(v).toLowerCase() === 'inherit') {
    return 'inherit';
  }

  return external_dependency_parsers_0.parseMeasurement(v);
}

width_export_definition = {
  set: function (v) {
    this._setProperty('width', width_local_fn_parse(v));
  },
  get: function () {
    return this.getPropertyValue('width');
  },
  enumerable: true,
  configurable: true
};

module.exports = function (prototype) {
  Object.defineProperties(prototype, {
    azimuth: azimuth_export_definition,
    backgroundColor: backgroundColor_export_definition,
    "background-color": backgroundColor_export_definition,
    backgroundImage: backgroundImage_export_definition,
    "background-image": backgroundImage_export_definition,
    backgroundRepeat: backgroundRepeat_export_definition,
    "background-repeat": backgroundRepeat_export_definition,
    backgroundAttachment: backgroundAttachment_export_definition,
    "background-attachment": backgroundAttachment_export_definition,
    backgroundPosition: backgroundPosition_export_definition,
    "background-position": backgroundPosition_export_definition,
    background: background_export_definition,
    borderWidth: borderWidth_export_definition,
    "border-width": borderWidth_export_definition,
    borderStyle: borderStyle_export_definition,
    "border-style": borderStyle_export_definition,
    borderColor: borderColor_export_definition,
    "border-color": borderColor_export_definition,
    border: border_export_definition,
    borderBottomWidth: borderBottomWidth_export_definition,
    "border-bottom-width": borderBottomWidth_export_definition,
    borderBottomStyle: borderBottomStyle_export_definition,
    "border-bottom-style": borderBottomStyle_export_definition,
    borderBottomColor: borderBottomColor_export_definition,
    "border-bottom-color": borderBottomColor_export_definition,
    borderBottom: borderBottom_export_definition,
    "border-bottom": borderBottom_export_definition,
    borderCollapse: borderCollapse_export_definition,
    "border-collapse": borderCollapse_export_definition,
    borderLeftWidth: borderLeftWidth_export_definition,
    "border-left-width": borderLeftWidth_export_definition,
    borderLeftStyle: borderLeftStyle_export_definition,
    "border-left-style": borderLeftStyle_export_definition,
    borderLeftColor: borderLeftColor_export_definition,
    "border-left-color": borderLeftColor_export_definition,
    borderLeft: borderLeft_export_definition,
    "border-left": borderLeft_export_definition,
    borderRightWidth: borderRightWidth_export_definition,
    "border-right-width": borderRightWidth_export_definition,
    borderRightStyle: borderRightStyle_export_definition,
    "border-right-style": borderRightStyle_export_definition,
    borderRightColor: borderRightColor_export_definition,
    "border-right-color": borderRightColor_export_definition,
    borderRight: borderRight_export_definition,
    "border-right": borderRight_export_definition,
    borderSpacing: borderSpacing_export_definition,
    "border-spacing": borderSpacing_export_definition,
    borderTopWidth: borderTopWidth_export_definition,
    "border-top-width": borderTopWidth_export_definition,
    borderTopStyle: borderTopStyle_export_definition,
    "border-top-style": borderTopStyle_export_definition,
    borderTopColor: borderTopColor_export_definition,
    "border-top-color": borderTopColor_export_definition,
    borderTop: borderTop_export_definition,
    "border-top": borderTop_export_definition,
    bottom: bottom_export_definition,
    clear: clear_export_definition,
    clip: clip_export_definition,
    color: color_export_definition,
    cssFloat: cssFloat_export_definition,
    "css-float": cssFloat_export_definition,
    flexGrow: flexGrow_export_definition,
    "flex-grow": flexGrow_export_definition,
    flexShrink: flexShrink_export_definition,
    "flex-shrink": flexShrink_export_definition,
    flexBasis: flexBasis_export_definition,
    "flex-basis": flexBasis_export_definition,
    flex: flex_export_definition,
    float: float_export_definition,
    floodColor: floodColor_export_definition,
    "flood-color": floodColor_export_definition,
    fontFamily: fontFamily_export_definition,
    "font-family": fontFamily_export_definition,
    fontSize: fontSize_export_definition,
    "font-size": fontSize_export_definition,
    fontStyle: fontStyle_export_definition,
    "font-style": fontStyle_export_definition,
    fontVariant: fontVariant_export_definition,
    "font-variant": fontVariant_export_definition,
    fontWeight: fontWeight_export_definition,
    "font-weight": fontWeight_export_definition,
    lineHeight: lineHeight_export_definition,
    "line-height": lineHeight_export_definition,
    font: font_export_definition,
    height: height_export_definition,
    left: left_export_definition,
    lightingColor: lightingColor_export_definition,
    "lighting-color": lightingColor_export_definition,
    margin: margin_export_definition,
    marginBottom: marginBottom_export_definition,
    "margin-bottom": marginBottom_export_definition,
    marginLeft: marginLeft_export_definition,
    "margin-left": marginLeft_export_definition,
    marginRight: marginRight_export_definition,
    "margin-right": marginRight_export_definition,
    marginTop: marginTop_export_definition,
    "margin-top": marginTop_export_definition,
    opacity: opacity_export_definition,
    outlineColor: outlineColor_export_definition,
    "outline-color": outlineColor_export_definition,
    padding: padding_export_definition,
    paddingBottom: paddingBottom_export_definition,
    "padding-bottom": paddingBottom_export_definition,
    paddingLeft: paddingLeft_export_definition,
    "padding-left": paddingLeft_export_definition,
    paddingRight: paddingRight_export_definition,
    "padding-right": paddingRight_export_definition,
    paddingTop: paddingTop_export_definition,
    "padding-top": paddingTop_export_definition,
    right: right_export_definition,
    stopColor: stopColor_export_definition,
    "stop-color": stopColor_export_definition,
    textLineThroughColor: textLineThroughColor_export_definition,
    "text-line-through-color": textLineThroughColor_export_definition,
    textOverlineColor: textOverlineColor_export_definition,
    "text-overline-color": textOverlineColor_export_definition,
    textUnderlineColor: textUnderlineColor_export_definition,
    "text-underline-color": textUnderlineColor_export_definition,
    top: top_export_definition,
    webkitBorderAfterColor: webkitBorderAfterColor_export_definition,
    "webkit-border-after-color": webkitBorderAfterColor_export_definition,
    webkitBorderBeforeColor: webkitBorderBeforeColor_export_definition,
    "webkit-border-before-color": webkitBorderBeforeColor_export_definition,
    webkitBorderEndColor: webkitBorderEndColor_export_definition,
    "webkit-border-end-color": webkitBorderEndColor_export_definition,
    webkitBorderStartColor: webkitBorderStartColor_export_definition,
    "webkit-border-start-color": webkitBorderStartColor_export_definition,
    webkitColumnRuleColor: webkitColumnRuleColor_export_definition,
    "webkit-column-rule-color": webkitColumnRuleColor_export_definition,
    webkitMatchNearestMailBlockquoteColor: webkitMatchNearestMailBlockquoteColor_export_definition,
    "webkit-match-nearest-mail-blockquote-color": webkitMatchNearestMailBlockquoteColor_export_definition,
    webkitTapHighlightColor: webkitTapHighlightColor_export_definition,
    "webkit-tap-highlight-color": webkitTapHighlightColor_export_definition,
    webkitTextEmphasisColor: webkitTextEmphasisColor_export_definition,
    "webkit-text-emphasis-color": webkitTextEmphasisColor_export_definition,
    webkitTextFillColor: webkitTextFillColor_export_definition,
    "webkit-text-fill-color": webkitTextFillColor_export_definition,
    webkitTextStrokeColor: webkitTextStrokeColor_export_definition,
    "webkit-text-stroke-color": webkitTextStrokeColor_export_definition,
    width: width_export_definition
  });
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports.POSITION_AT_SHORTHAND = {
  first: 0,
  second: 1,
};


/***/ })
/******/ ]);
