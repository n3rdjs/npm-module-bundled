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

exports.parse = __webpack_require__(3);
exports.stringify = __webpack_require__(12);
exports.parseValues = __webpack_require__(13);
exports.stringifyValues = __webpack_require__(14);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Parser = __webpack_require__(4);
var regexpu = __webpack_require__(5);

function unescape(str) {
	return str.replace(/\\(.)/g, "$1");
}

function commentMatch(match, content) {
	this.selector.nodes.push({
		type: "comment",
		content: content
	});
}

function typeMatch(type) {
	return function(match, name) {
		this.selector.nodes.push({
			type: type,
			name: unescape(name)
		});
	};
}

function pseudoClassStartMatch(match, name) {
	var newToken = {
		type: "pseudo-class",
		name: unescape(name),
		content: ""
	};
	this.selector.nodes.push(newToken);
	this.token = newToken;
	this.brackets = 1;
	return "inBrackets";
}

function nestedPseudoClassStartMatch(match, name, after) {
	var newSelector = {
		type: "selector",
		nodes: []
	};
	var newToken = {
		type: "nested-pseudo-class",
		name: unescape(name),
		nodes: [newSelector]
	};
	if(after) {
		newSelector.before = after;
	}
	this.selector.nodes.push(newToken);
	this.stack.push(this.root);
	this.root = newToken;
	this.selector = newSelector;
}

function nestedEnd(match, before) {
	if(this.stack.length > 0) {
		if(before) {
			this.selector.after = before;
		}
		this.root = this.stack.pop();
		this.selector = this.root.nodes[this.root.nodes.length - 1];
	} else {
		this.selector.nodes.push({
			type: "invalid",
			value: match
		});
	}
}

function operatorMatch(match, before, operator, after) {
	var token = {
		type: "operator",
		operator: operator
	};
	if(before) {
		token.before = before;
	}
	if(after) {
		token.after = after;
	}
	this.selector.nodes.push(token);
}

function spacingMatch(match) {
	this.selector.nodes.push({
		type: "spacing",
		value: match
	});
}

function elementMatch(match, namespace, name) {
	var newToken = {
		type: "element",
		name: unescape(name)
	};

	if(namespace) {
		newToken.namespace = unescape(namespace.substr(0, namespace.length - 1));
	}
	this.selector.nodes.push(newToken);
}

function universalMatch(match, namespace) {
	var newToken = {
		type: "universal"
	};
	if(namespace) {
		newToken.namespace = unescape(namespace.substr(0, namespace.length - 1));
	}
	this.selector.nodes.push(newToken);
}

function attributeMatch(match, content) {
	this.selector.nodes.push({
		type: "attribute",
		content: content
	});
}

function invalidMatch(match) {
	this.selector.nodes.push({
		type: "invalid",
		value: match
	});
}

function irrelevantSpacingStartMatch(match) {
	this.selector.before = match;
}

function irrelevantSpacingEndMatch(match) {
	this.selector.after = match;
}

function nextSelectorMatch(match, before, after) {
	var newSelector = {
		type: "selector",
		nodes: []
	};
	if(before) {
		this.selector.after = before;
	}
	if(after) {
		newSelector.before = after;
	}
	this.root.nodes.push(newSelector);
	this.selector = newSelector;
}

function addToCurrent(match) {
	this.token.content += match;
}

function bracketStart(match) {
	this.token.content += match;
	this.brackets++;
}

function bracketEnd(match) {
	if(--this.brackets === 0) {
		return "selector";
	}
	this.token.content += match;
}

function getSelectors() {
	// The assignment here is split to preserve the property enumeration order.
	var selectors = {
		"/\\*([\\s\\S]*?)\\*/": commentMatch
	};
	// https://www.w3.org/TR/CSS21/syndata.html#characters
	// 4.1.3: identifiers (...) can contain only the characters [a-zA-Z0-9] and
	// ISO 10646 characters U+00A0 and higher, plus the hyphen (-) and the underscore (_)
	//
	// 10ffff is the maximum allowed in current Unicode
	selectors[regexpu("\\.((?:\\\\.|[A-Za-z_\\-\\u{00a0}-\\u{10ffff}])(?:\\\\.|[A-Za-z_\\-0-9\\u{00a0}-\\u{10ffff}])*)", "u")] = typeMatch("class");
	selectors[regexpu("#((?:\\\\.|[A-Za-z_\\-\\u{00a0}-\\u{10ffff}])(?:\\\\.|[A-Za-z_\\-0-9\\u{00a0}-\\u{10ffff}])*)", "u")] = typeMatch("id");
	var selectorsSecondHalf = {
		":(not|matches|has|local|global)\\((\\s*)": nestedPseudoClassStartMatch,
		":((?:\\\\.|[A-Za-z_\\-0-9])+)\\(": pseudoClassStartMatch,
		":((?:\\\\.|[A-Za-z_\\-0-9])+)": typeMatch("pseudo-class"),
		"::((?:\\\\.|[A-Za-z_\\-0-9])+)": typeMatch("pseudo-element"),
		"(\\*\\|)((?:\\\\.|[A-Za-z_\\-0-9])+)": elementMatch,
		"(\\*\\|)\\*": universalMatch,
		"((?:\\\\.|[A-Za-z_\\-0-9])*\\|)?\\*": universalMatch,
		"((?:\\\\.|[A-Za-z_\\-0-9])*\\|)?((?:\\\\.|[A-Za-z_\\-])(?:\\\\.|[A-Za-z_\\-0-9])*)": elementMatch,
		"\\[([^\\]]+)\\]": attributeMatch,
		"(\\s*)\\)": nestedEnd,
		"(\\s*)((?:\\|\\|)|(?:>>)|[>+~])(\\s*)": operatorMatch,
		"(\\s*),(\\s*)": nextSelectorMatch,
		"\\s+$": irrelevantSpacingEndMatch,
		"^\\s+": irrelevantSpacingStartMatch,
		"\\s+": spacingMatch,
		".": invalidMatch
	};
	var selector;
	for (selector in selectorsSecondHalf) {
		if (Object.prototype.hasOwnProperty.call(selectorsSecondHalf, selector)) {
			selectors[selector] = selectorsSecondHalf[selector];
		}
	}
	return selectors;
}

var parser = new Parser({
	selector: getSelectors(),
	inBrackets: {
		"/\\*[\\s\\S]*?\\*/": addToCurrent,
		"\"([^\\\\\"]|\\\\.)*\"": addToCurrent,
		"'([^\\\\']|\\\\.)*'": addToCurrent,
		"[^()'\"/]+": addToCurrent,
		"\\(": bracketStart,
		"\\)": bracketEnd,
		".": addToCurrent
	}
});

function parse(str) {
	var selectorNode = {
		type: "selector",
		nodes: []
	};
	var rootNode = {
		type: "selectors",
		nodes: [
			selectorNode
		]
	};
	parser.parse("selector", str, {
		stack: [],
		root: rootNode,
		selector: selectorNode
	});
	return rootNode;
}

module.exports = parse;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

function ignoreFunction() {}

function createReturningFunction(value) {
	return function() {
		return value;
	};
}

function Parser(states) {
	this.states = this.compileStates(states);
}

Parser.prototype.compileStates = function(states) {
	var result = {};
	Object.keys(states).forEach(function(name) {
		result[name] = this.compileState(states[name], states);
	}, this);
	return result;
};

Parser.prototype.compileState = function(state, states) {
	var regExps = [];
	function iterator(str, value) {
		regExps.push({
			groups: Parser.getGroupCount(str),
			regExp: str,
			value: value
		});
	}
	function processState(statePart) {
		if(Array.isArray(statePart)) {
			statePart.forEach(processState);
		} else if(typeof statePart === "object") {
			Object.keys(statePart).forEach(function(key) {
				iterator(key, statePart[key]);
			});
		} else if(typeof statePart === "string") {
			processState(states[statePart]);
		} else {
			throw new Error("Unexpected 'state' format");
		}
	}
	processState(state);
	var total = regExps.map(function(r) {
		return "(" + r.regExp + ")";
	}).join("|");
	var actions = [];
	var pos = 1;
	regExps.forEach(function(r) {
		var fn;
		if(typeof r.value === "function") {
			fn = r.value;
		} else if(typeof r.value === "string") {
			fn = createReturningFunction(r.value);
		} else {
			fn = ignoreFunction;
		}
		actions.push({
			name: r.regExp,
			fn: fn,
			pos: pos,
			pos2: pos + r.groups + 1
		});
		pos += r.groups + 1;
	});
	return {
		regExp: new RegExp(total, "g"),
		actions: actions
	};
};

Parser.getGroupCount = function(regExpStr) {
	return new RegExp("(" + regExpStr + ")|^$").exec("").length - 2;
};

Parser.prototype.parse = function(initialState, string, context) {
	context = context || {};
	var currentState = initialState;
	var currentIndex = 0;
	for(;;) {
		var state = this.states[currentState];
		var regExp = state.regExp;
		regExp.lastIndex = currentIndex;
		var match = regExp.exec(string);
		if(!match) return context;
		var actions = state.actions;
		currentIndex = state.regExp.lastIndex;
		for(var i = 0; i < actions.length; i++) {
			var action = actions[i];
			if(match[action.pos]) {
				var ret = action.fn.apply(context, Array.prototype.slice.call(match, action.pos, action.pos2).concat([state.regExp.lastIndex - match[0].length, match[0].length]));
				if(ret) {
					if(!(ret in this.states))
						throw new Error("State '" + ret + "' doesn't exist");
					currentState = ret;
				}
				break;
			}
		}
	}
};

module.exports = Parser;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var generate = __webpack_require__(6).generate;
var parse = __webpack_require__(8).parse;
var regenerate = __webpack_require__(9);
var iuMappings = __webpack_require__(10);
var ESCAPE_SETS = __webpack_require__(11);

function getCharacterClassEscapeSet(character) {
	if (unicode) {
		if (ignoreCase) {
			return ESCAPE_SETS.UNICODE_IGNORE_CASE[character];
		}
		return ESCAPE_SETS.UNICODE[character];
	}
	return ESCAPE_SETS.REGULAR[character];
}

var object = {};
var hasOwnProperty = object.hasOwnProperty;
function has(object, property) {
	return hasOwnProperty.call(object, property);
}

// Prepare a Regenerate set containing all code points, used for negative
// character classes (if any).
var UNICODE_SET = regenerate().addRange(0x0, 0x10FFFF);
// Without the `u` flag, the range stops at 0xFFFF.
// https://mths.be/es6#sec-pattern-semantics
var BMP_SET = regenerate().addRange(0x0, 0xFFFF);

// Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./u`. https://mths.be/es6#sec-atom
var DOT_SET_UNICODE = UNICODE_SET.clone() // all Unicode code points
	.remove(
		// minus `LineTerminator`s (https://mths.be/es6#sec-line-terminators):
		0x000A, // Line Feed <LF>
		0x000D, // Carriage Return <CR>
		0x2028, // Line Separator <LS>
		0x2029  // Paragraph Separator <PS>
	);
// Prepare a Regenerate set containing all code points that are supposed to be
// matched by `/./` (only BMP code points).
var DOT_SET = DOT_SET_UNICODE.clone()
	.intersection(BMP_SET);

// Add a range of code points + any case-folded code points in that range to a
// set.
regenerate.prototype.iuAddRange = function(min, max) {
	var $this = this;
	do {
		var folded = caseFold(min);
		if (folded) {
			$this.add(folded);
		}
	} while (++min <= max);
	return $this;
};

function assign(target, source) {
	for (var key in source) {
		// Note: `hasOwnProperty` is not needed here.
		target[key] = source[key];
	}
}

function update(item, pattern) {
	// TODO: Test if memoizing `pattern` here is worth the effort.
	if (!pattern) {
		return;
	}
	var tree = parse(pattern, '');
	switch (tree.type) {
		case 'characterClass':
		case 'group':
		case 'value':
			// No wrapping needed.
			break;
		default:
			// Wrap the pattern in a non-capturing group.
			tree = wrap(tree, pattern);
	}
	assign(item, tree);
}

function wrap(tree, pattern) {
	// Wrap the pattern in a non-capturing group.
	return {
		'type': 'group',
		'behavior': 'ignore',
		'body': [tree],
		'raw': '(?:' + pattern + ')'
	};
}

function caseFold(codePoint) {
	return has(iuMappings, codePoint) ? iuMappings[codePoint] : false;
}

var ignoreCase = false;
var unicode = false;
function processCharacterClass(characterClassItem) {
	var set = regenerate();
	var body = characterClassItem.body.forEach(function(item) {
		switch (item.type) {
			case 'value':
				set.add(item.codePoint);
				if (ignoreCase && unicode) {
					var folded = caseFold(item.codePoint);
					if (folded) {
						set.add(folded);
					}
				}
				break;
			case 'characterClassRange':
				var min = item.min.codePoint;
				var max = item.max.codePoint;
				set.addRange(min, max);
				if (ignoreCase && unicode) {
					set.iuAddRange(min, max);
				}
				break;
			case 'characterClassEscape':
				set.add(getCharacterClassEscapeSet(item.value));
				break;
			// The `default` clause is only here as a safeguard; it should never be
			// reached. Code coverage tools should ignore it.
			/* istanbul ignore next */
			default:
				throw Error('Unknown term type: ' + item.type);
		}
	});
	if (characterClassItem.negative) {
		set = (unicode ? UNICODE_SET : BMP_SET).clone().remove(set);
	}
	update(characterClassItem, set.toString());
	return characterClassItem;
}

function processTerm(item) {
	switch (item.type) {
		case 'dot':
			update(
				item,
				(unicode ? DOT_SET_UNICODE : DOT_SET).toString()
			);
			break;
		case 'characterClass':
			item = processCharacterClass(item);
			break;
		case 'characterClassEscape':
			update(
				item,
				getCharacterClassEscapeSet(item.value).toString()
			);
			break;
		case 'alternative':
		case 'disjunction':
		case 'group':
		case 'quantifier':
			item.body = item.body.map(processTerm);
			break;
		case 'value':
			var codePoint = item.codePoint;
			var set = regenerate(codePoint);
			if (ignoreCase && unicode) {
				var folded = caseFold(codePoint);
				if (folded) {
					set.add(folded);
				}
			}
			update(item, set.toString());
			break;
		case 'anchor':
		case 'empty':
		case 'group':
		case 'reference':
			// Nothing to do here.
			break;
		// The `default` clause is only here as a safeguard; it should never be
		// reached. Code coverage tools should ignore it.
		/* istanbul ignore next */
		default:
			throw Error('Unknown term type: ' + item.type);
	}
	return item;
};

module.exports = function(pattern, flags) {
	var tree = parse(pattern, flags);
	ignoreCase = flags ? flags.indexOf('i') > -1 : false;
	unicode = flags ? flags.indexOf('u') > -1 : false;
	assign(tree, processTerm(tree));
	return generate(tree);
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * RegJSGen
 * Copyright 2014 Benjamin Tan <https://d10.github.io/>
 * Available under MIT license <http://d10.mit-license.org/>
 */
;(function() {
  'use strict';

  /** Used to determine if values are of the language type `Object` */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used as a reference to the global object */
  var root = (objectTypes[typeof window] && window) || this;

  /** Backup possible global object */
  var oldRoot = root;

  /** Detect free variable `exports` */
  var freeExports = objectTypes[typeof exports] && exports;

  /** Detect free variable `module` */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  /*--------------------------------------------------------------------------*/

  /*! Based on https://mths.be/fromcodepoint v0.2.0 by @mathias */

  var stringFromCharCode = String.fromCharCode;
  var floor = Math.floor;
  function fromCodePoint() {
    var MAX_SIZE = 0x4000;
    var codeUnits = [];
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    var result = '';
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (
        !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
        codePoint < 0 || // not a valid Unicode code point
        codePoint > 0x10FFFF || // not a valid Unicode code point
        floor(codePoint) != codePoint // not an integer
      ) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        // BMP code point
        codeUnits.push(codePoint);
      } else {
        // Astral code point; split in surrogate halves
        // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
      if (index + 1 == length || codeUnits.length > MAX_SIZE) {
        result += stringFromCharCode.apply(null, codeUnits);
        codeUnits.length = 0;
      }
    }
    return result;
  }

  function assertType(type, expected) {
    if (expected.indexOf('|') == -1) {
      if (type == expected) {
        return;
      }

      throw Error('Invalid node type: ' + type);
    }

    expected = assertType.hasOwnProperty(expected)
      ? assertType[expected]
      : (assertType[expected] = RegExp('^(?:' + expected + ')$'));

    if (expected.test(type)) {
      return;
    }

    throw Error('Invalid node type: ' + type);
  }

  /*--------------------------------------------------------------------------*/

  function generate(node) {
    var type = node.type;

    if (generate.hasOwnProperty(type) && typeof generate[type] == 'function') {
      return generate[type](node);
    }

    throw Error('Invalid node type: ' + type);
  }

  /*--------------------------------------------------------------------------*/

  function generateAlternative(node) {
    assertType(node.type, 'alternative');

    var terms = node.body,
        length = terms ? terms.length : 0;

    if (length == 1) {
      return generateTerm(terms[0]);
    } else {
      var i = -1,
          result = '';

      while (++i < length) {
        result += generateTerm(terms[i]);
      }

      return result;
    }
  }

  function generateAnchor(node) {
    assertType(node.type, 'anchor');

    switch (node.kind) {
      case 'start':
        return '^';
      case 'end':
        return '$';
      case 'boundary':
        return '\\b';
      case 'not-boundary':
        return '\\B';
      default:
        throw Error('Invalid assertion');
    }
  }

  function generateAtom(node) {
    assertType(node.type, 'anchor|characterClass|characterClassEscape|dot|group|reference|value');

    return generate(node);
  }

  function generateCharacterClass(node) {
    assertType(node.type, 'characterClass');

    var classRanges = node.body,
        length = classRanges ? classRanges.length : 0;

    var i = -1,
        result = '[';

    if (node.negative) {
      result += '^';
    }

    while (++i < length) {
      result += generateClassAtom(classRanges[i]);
    }

    result += ']';

    return result;
  }

  function generateCharacterClassEscape(node) {
    assertType(node.type, 'characterClassEscape');

    return '\\' + node.value;
  }

  function generateCharacterClassRange(node) {
    assertType(node.type, 'characterClassRange');

    var min = node.min,
        max = node.max;

    if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
      throw Error('Invalid character class range');
    }

    return generateClassAtom(min) + '-' + generateClassAtom(max);
  }

  function generateClassAtom(node) {
    assertType(node.type, 'anchor|characterClassEscape|characterClassRange|dot|value');

    return generate(node);
  }

  function generateDisjunction(node) {
    assertType(node.type, 'disjunction');

    var body = node.body,
        length = body ? body.length : 0;

    if (length == 0) {
      throw Error('No body');
    } else if (length == 1) {
      return generate(body[0]);
    } else {
      var i = -1,
          result = '';

      while (++i < length) {
        if (i != 0) {
          result += '|';
        }
        result += generate(body[i]);
      }

      return result;
    }
  }

  function generateDot(node) {
    assertType(node.type, 'dot');

    return '.';
  }

  function generateGroup(node) {
    assertType(node.type, 'group');

    var result = '(';

    switch (node.behavior) {
      case 'normal':
        break;
      case 'ignore':
        result += '?:';
        break;
      case 'lookahead':
        result += '?=';
        break;
      case 'negativeLookahead':
        result += '?!';
        break;
      default:
        throw Error('Invalid behaviour: ' + node.behaviour);
    }

    var body = node.body,
        length = body ? body.length : 0;

    if (length == 1) {
      result += generate(body[0]);
    } else {
      var i = -1;

      while (++i < length) {
        result += generate(body[i]);
      }
    }

    result += ')';

    return result;
  }

  function generateQuantifier(node) {
    assertType(node.type, 'quantifier');

    var quantifier = '',
        min = node.min,
        max = node.max;

    switch (max) {
      case undefined:
      case null:
        switch (min) {
          case 0:
            quantifier = '*'
            break;
          case 1:
            quantifier = '+';
            break;
          default:
            quantifier = '{' + min + ',}';
            break;
        }
        break;
      default:
        if (min == max) {
          quantifier = '{' + min + '}';
        }
        else if (min == 0 && max == 1) {
          quantifier = '?';
        } else {
          quantifier = '{' + min + ',' + max + '}';
        }
        break;
    }

    if (!node.greedy) {
      quantifier += '?';
    }

    return generateAtom(node.body[0]) + quantifier;
  }

  function generateReference(node) {
    assertType(node.type, 'reference');

    return '\\' + node.matchIndex;
  }

  function generateTerm(node) {
    assertType(node.type, 'anchor|characterClass|characterClassEscape|empty|group|quantifier|reference|value');

    return generate(node);
  }

  function generateValue(node) {
    assertType(node.type, 'value');

    var kind = node.kind,
        codePoint = node.codePoint;

    switch (kind) {
      case 'controlLetter':
        return '\\c' + fromCodePoint(codePoint + 64);
      case 'hexadecimalEscape':
        return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);
      case 'identifier':
        return '\\' + fromCodePoint(codePoint);
      case 'null':
        return '\\' + codePoint;
      case 'octal':
        return '\\' + codePoint.toString(8);
      case 'singleEscape':
        switch (codePoint) {
          case 0x0008:
            return '\\b';
          case 0x009:
            return '\\t';
          case 0x00A:
            return '\\n';
          case 0x00B:
            return '\\v';
          case 0x00C:
            return '\\f';
          case 0x00D:
            return '\\r';
          default:
            throw Error('Invalid codepoint: ' + codePoint);
        }
      case 'symbol':
        return fromCodePoint(codePoint);
      case 'unicodeEscape':
        return '\\u' + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);
      case 'unicodeCodePointEscape':
        return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
      default:
        throw Error('Unsupported node kind: ' + kind);
    }
  }

  /*--------------------------------------------------------------------------*/

  generate.alternative = generateAlternative;
  generate.anchor = generateAnchor;
  generate.characterClass = generateCharacterClass;
  generate.characterClassEscape = generateCharacterClassEscape;
  generate.characterClassRange = generateCharacterClassRange;
  generate.disjunction = generateDisjunction;
  generate.dot = generateDot;
  generate.group = generateGroup;
  generate.quantifier = generateQuantifier;
  generate.reference = generateReference;
  generate.value = generateValue;

  /*--------------------------------------------------------------------------*/

  // export regjsgen
  // some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (true) {
    // define as an anonymous module so, through path mapping, it can be aliased
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return {
        'generate': generate
      };
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  // check for `exports` after `define` in case a build optimizer adds an `exports` object
  else {}
}.call(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// regjsparser
//
// ==================================================================
//
// See ECMA-262 Standard: 15.10.1
//
// NOTE: The ECMA-262 standard uses the term "Assertion" for /^/. Here the
//   term "Anchor" is used.
//
// Pattern ::
//      Disjunction
//
// Disjunction ::
//      Alternative
//      Alternative | Disjunction
//
// Alternative ::
//      [empty]
//      Alternative Term
//
// Term ::
//      Anchor
//      Atom
//      Atom Quantifier
//
// Anchor ::
//      ^
//      $
//      \ b
//      \ B
//      ( ? = Disjunction )
//      ( ? ! Disjunction )
//
// Quantifier ::
//      QuantifierPrefix
//      QuantifierPrefix ?
//
// QuantifierPrefix ::
//      *
//      +
//      ?
//      { DecimalDigits }
//      { DecimalDigits , }
//      { DecimalDigits , DecimalDigits }
//
// Atom ::
//      PatternCharacter
//      .
//      \ AtomEscape
//      CharacterClass
//      ( Disjunction )
//      ( ? : Disjunction )
//
// PatternCharacter ::
//      SourceCharacter but not any of: ^ $ \ . * + ? ( ) [ ] { } |
//
// AtomEscape ::
//      DecimalEscape
//      CharacterEscape
//      CharacterClassEscape
//
// CharacterEscape[U] ::
//      ControlEscape
//      c ControlLetter
//      HexEscapeSequence
//      RegExpUnicodeEscapeSequence[?U] (ES6)
//      IdentityEscape[?U]
//
// ControlEscape ::
//      one of f n r t v
// ControlLetter ::
//      one of
//          a b c d e f g h i j k l m n o p q r s t u v w x y z
//          A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
//
// IdentityEscape ::
//      SourceCharacter but not IdentifierPart
//      <ZWJ>
//      <ZWNJ>
//
// DecimalEscape ::
//      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
//
// CharacterClassEscape ::
//      one of d D s S w W
//
// CharacterClass ::
//      [ [lookahead ∉ {^}] ClassRanges ]
//      [ ^ ClassRanges ]
//
// ClassRanges ::
//      [empty]
//      NonemptyClassRanges
//
// NonemptyClassRanges ::
//      ClassAtom
//      ClassAtom NonemptyClassRangesNoDash
//      ClassAtom - ClassAtom ClassRanges
//
// NonemptyClassRangesNoDash ::
//      ClassAtom
//      ClassAtomNoDash NonemptyClassRangesNoDash
//      ClassAtomNoDash - ClassAtom ClassRanges
//
// ClassAtom ::
//      -
//      ClassAtomNoDash
//
// ClassAtomNoDash ::
//      SourceCharacter but not one of \ or ] or -
//      \ ClassEscape
//
// ClassEscape ::
//      DecimalEscape
//      b
//      CharacterEscape
//      CharacterClassEscape

(function() {

  function parse(str, flags) {
    function addRaw(node) {
      node.raw = str.substring(node.range[0], node.range[1]);
      return node;
    }

    function updateRawStart(node, start) {
      node.range[0] = start;
      return addRaw(node);
    }

    function createAnchor(kind, rawLength) {
      return addRaw({
        type: 'anchor',
        kind: kind,
        range: [
          pos - rawLength,
          pos
        ]
      });
    }

    function createValue(kind, codePoint, from, to) {
      return addRaw({
        type: 'value',
        kind: kind,
        codePoint: codePoint,
        range: [from, to]
      });
    }

    function createEscaped(kind, codePoint, value, fromOffset) {
      fromOffset = fromOffset || 0;
      return createValue(kind, codePoint, pos - (value.length + fromOffset), pos);
    }

    function createCharacter(matches) {
      var _char = matches[0];
      var first = _char.charCodeAt(0);
      if (hasUnicodeFlag) {
        var second;
        if (_char.length === 1 && first >= 0xD800 && first <= 0xDBFF) {
          second = lookahead().charCodeAt(0);
          if (second >= 0xDC00 && second <= 0xDFFF) {
            // Unicode surrogate pair
            pos++;
            return createValue(
                'symbol',
                (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000,
                pos - 2, pos);
          }
        }
      }
      return createValue('symbol', first, pos - 1, pos);
    }

    function createDisjunction(alternatives, from, to) {
      return addRaw({
        type: 'disjunction',
        body: alternatives,
        range: [
          from,
          to
        ]
      });
    }

    function createDot() {
      return addRaw({
        type: 'dot',
        range: [
          pos - 1,
          pos
        ]
      });
    }

    function createCharacterClassEscape(value) {
      return addRaw({
        type: 'characterClassEscape',
        value: value,
        range: [
          pos - 2,
          pos
        ]
      });
    }

    function createReference(matchIndex) {
      return addRaw({
        type: 'reference',
        matchIndex: parseInt(matchIndex, 10),
        range: [
          pos - 1 - matchIndex.length,
          pos
        ]
      });
    }

    function createGroup(behavior, disjunction, from, to) {
      return addRaw({
        type: 'group',
        behavior: behavior,
        body: disjunction,
        range: [
          from,
          to
        ]
      });
    }

    function createQuantifier(min, max, from, to) {
      if (to == null) {
        from = pos - 1;
        to = pos;
      }

      return addRaw({
        type: 'quantifier',
        min: min,
        max: max,
        greedy: true,
        body: null, // set later on
        range: [
          from,
          to
        ]
      });
    }

    function createAlternative(terms, from, to) {
      return addRaw({
        type: 'alternative',
        body: terms,
        range: [
          from,
          to
        ]
      });
    }

    function createCharacterClass(classRanges, negative, from, to) {
      return addRaw({
        type: 'characterClass',
        body: classRanges,
        negative: negative,
        range: [
          from,
          to
        ]
      });
    }

    function createClassRange(min, max, from, to) {
      // See 15.10.2.15:
      if (min.codePoint > max.codePoint) {
        bail('invalid range in character class', min.raw + '-' + max.raw, from, to);
      }

      return addRaw({
        type: 'characterClassRange',
        min: min,
        max: max,
        range: [
          from,
          to
        ]
      });
    }

    function flattenBody(body) {
      if (body.type === 'alternative') {
        return body.body;
      } else {
        return [body];
      }
    }

    function isEmpty(obj) {
      return obj.type === 'empty';
    }

    function incr(amount) {
      amount = (amount || 1);
      var res = str.substring(pos, pos + amount);
      pos += (amount || 1);
      return res;
    }

    function skip(value) {
      if (!match(value)) {
        bail('character', value);
      }
    }

    function match(value) {
      if (str.indexOf(value, pos) === pos) {
        return incr(value.length);
      }
    }

    function lookahead() {
      return str[pos];
    }

    function current(value) {
      return str.indexOf(value, pos) === pos;
    }

    function next(value) {
      return str[pos + 1] === value;
    }

    function matchReg(regExp) {
      var subStr = str.substring(pos);
      var res = subStr.match(regExp);
      if (res) {
        res.range = [];
        res.range[0] = pos;
        incr(res[0].length);
        res.range[1] = pos;
      }
      return res;
    }

    function parseDisjunction() {
      // Disjunction ::
      //      Alternative
      //      Alternative | Disjunction
      var res = [], from = pos;
      res.push(parseAlternative());

      while (match('|')) {
        res.push(parseAlternative());
      }

      if (res.length === 1) {
        return res[0];
      }

      return createDisjunction(res, from, pos);
    }

    function parseAlternative() {
      var res = [], from = pos;
      var term;

      // Alternative ::
      //      [empty]
      //      Alternative Term
      while (term = parseTerm()) {
        res.push(term);
      }

      if (res.length === 1) {
        return res[0];
      }

      return createAlternative(res, from, pos);
    }

    function parseTerm() {
      // Term ::
      //      Anchor
      //      Atom
      //      Atom Quantifier

      if (pos >= str.length || current('|') || current(')')) {
        return null; /* Means: The term is empty */
      }

      var anchor = parseAnchor();

      if (anchor) {
        return anchor;
      }

      var atom = parseAtom();
      if (!atom) {
        bail('Expected atom');
      }
      var quantifier = parseQuantifier() || false;
      if (quantifier) {
        quantifier.body = flattenBody(atom);
        // The quantifier contains the atom. Therefore, the beginning of the
        // quantifier range is given by the beginning of the atom.
        updateRawStart(quantifier, atom.range[0]);
        return quantifier;
      }
      return atom;
    }

    function parseGroup(matchA, typeA, matchB, typeB) {
      var type = null, from = pos;

      if (match(matchA)) {
        type = typeA;
      } else if (match(matchB)) {
        type = typeB;
      } else {
        return false;
      }

      var body = parseDisjunction();
      if (!body) {
        bail('Expected disjunction');
      }
      skip(')');
      var group = createGroup(type, flattenBody(body), from, pos);

      if (type == 'normal') {
        // Keep track of the number of closed groups. This is required for
        // parseDecimalEscape(). In case the string is parsed a second time the
        // value already holds the total count and no incrementation is required.
        if (firstIteration) {
          closedCaptureCounter++;
        }
      }
      return group;
    }

    function parseAnchor() {
      // Anchor ::
      //      ^
      //      $
      //      \ b
      //      \ B
      //      ( ? = Disjunction )
      //      ( ? ! Disjunction )
      var res, from = pos;

      if (match('^')) {
        return createAnchor('start', 1 /* rawLength */);
      } else if (match('$')) {
        return createAnchor('end', 1 /* rawLength */);
      } else if (match('\\b')) {
        return createAnchor('boundary', 2 /* rawLength */);
      } else if (match('\\B')) {
        return createAnchor('not-boundary', 2 /* rawLength */);
      } else {
        return parseGroup('(?=', 'lookahead', '(?!', 'negativeLookahead');
      }
    }

    function parseQuantifier() {
      // Quantifier ::
      //      QuantifierPrefix
      //      QuantifierPrefix ?
      //
      // QuantifierPrefix ::
      //      *
      //      +
      //      ?
      //      { DecimalDigits }
      //      { DecimalDigits , }
      //      { DecimalDigits , DecimalDigits }

      var res, from = pos;
      var quantifier;
      var min, max;

      if (match('*')) {
        quantifier = createQuantifier(0);
      }
      else if (match('+')) {
        quantifier = createQuantifier(1);
      }
      else if (match('?')) {
        quantifier = createQuantifier(0, 1);
      }
      else if (res = matchReg(/^\{([0-9]+)\}/)) {
        min = parseInt(res[1], 10);
        quantifier = createQuantifier(min, min, res.range[0], res.range[1]);
      }
      else if (res = matchReg(/^\{([0-9]+),\}/)) {
        min = parseInt(res[1], 10);
        quantifier = createQuantifier(min, undefined, res.range[0], res.range[1]);
      }
      else if (res = matchReg(/^\{([0-9]+),([0-9]+)\}/)) {
        min = parseInt(res[1], 10);
        max = parseInt(res[2], 10);
        if (min > max) {
          bail('numbers out of order in {} quantifier', '', from, pos);
        }
        quantifier = createQuantifier(min, max, res.range[0], res.range[1]);
      }

      if (quantifier) {
        if (match('?')) {
          quantifier.greedy = false;
          quantifier.range[1] += 1;
        }
      }

      return quantifier;
    }

    function parseAtom() {
      // Atom ::
      //      PatternCharacter
      //      .
      //      \ AtomEscape
      //      CharacterClass
      //      ( Disjunction )
      //      ( ? : Disjunction )

      var res;

      // jviereck: allow ']', '}' here as well to be compatible with browser's
      //   implementations: ']'.match(/]/);
      // if (res = matchReg(/^[^^$\\.*+?()[\]{}|]/)) {
      if (res = matchReg(/^[^^$\\.*+?(){[|]/)) {
        //      PatternCharacter
        return createCharacter(res);
      }
      else if (match('.')) {
        //      .
        return createDot();
      }
      else if (match('\\')) {
        //      \ AtomEscape
        res = parseAtomEscape();
        if (!res) {
          bail('atomEscape');
        }
        return res;
      }
      else if (res = parseCharacterClass()) {
        return res;
      }
      else {
        //      ( Disjunction )
        //      ( ? : Disjunction )
        return parseGroup('(?:', 'ignore', '(', 'normal');
      }
    }

    function parseUnicodeSurrogatePairEscape(firstEscape) {
      if (hasUnicodeFlag) {
        var first, second;
        if (firstEscape.kind == 'unicodeEscape' &&
          (first = firstEscape.codePoint) >= 0xD800 && first <= 0xDBFF &&
          current('\\') && next('u') ) {
          var prevPos = pos;
          pos++;
          var secondEscape = parseClassEscape();
          if (secondEscape.kind == 'unicodeEscape' &&
            (second = secondEscape.codePoint) >= 0xDC00 && second <= 0xDFFF) {
            // Unicode surrogate pair
            firstEscape.range[1] = secondEscape.range[1];
            firstEscape.codePoint = (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
            firstEscape.type = 'value';
            firstEscape.kind = 'unicodeCodePointEscape';
            addRaw(firstEscape);
          }
          else {
            pos = prevPos;
          }
        }
      }
      return firstEscape;
    }

    function parseClassEscape() {
      return parseAtomEscape(true);
    }

    function parseAtomEscape(insideCharacterClass) {
      // AtomEscape ::
      //      DecimalEscape
      //      CharacterEscape
      //      CharacterClassEscape

      var res, from = pos;

      res = parseDecimalEscape();
      if (res) {
        return res;
      }

      // For ClassEscape
      if (insideCharacterClass) {
        if (match('b')) {
          // 15.10.2.19
          // The production ClassEscape :: b evaluates by returning the
          // CharSet containing the one character <BS> (Unicode value 0008).
          return createEscaped('singleEscape', 0x0008, '\\b');
        } else if (match('B')) {
          bail('\\B not possible inside of CharacterClass', '', from);
        }
      }

      res = parseCharacterEscape();

      return res;
    }


    function parseDecimalEscape() {
      // DecimalEscape ::
      //      DecimalIntegerLiteral [lookahead ∉ DecimalDigit]
      //      CharacterClassEscape :: one of d D s S w W

      var res, match;

      if (res = matchReg(/^(?!0)\d+/)) {
        match = res[0];
        var refIdx = parseInt(res[0], 10);
        if (refIdx <= closedCaptureCounter) {
          // If the number is smaller than the normal-groups found so
          // far, then it is a reference...
          return createReference(res[0]);
        } else {
          // ... otherwise it needs to be interpreted as a octal (if the
          // number is in an octal format). If it is NOT octal format,
          // then the slash is ignored and the number is matched later
          // as normal characters.

          // Recall the negative decision to decide if the input must be parsed
          // a second time with the total normal-groups.
          backrefDenied.push(refIdx);

          // Reset the position again, as maybe only parts of the previous
          // matched numbers are actual octal numbers. E.g. in '019' only
          // the '01' should be matched.
          incr(-res[0].length);
          if (res = matchReg(/^[0-7]{1,3}/)) {
            return createEscaped('octal', parseInt(res[0], 8), res[0], 1);
          } else {
            // If we end up here, we have a case like /\91/. Then the
            // first slash is to be ignored and the 9 & 1 to be treated
            // like ordinary characters. Create a character for the
            // first number only here - other number-characters
            // (if available) will be matched later.
            res = createCharacter(matchReg(/^[89]/));
            return updateRawStart(res, res.range[0] - 1);
          }
        }
      }
      // Only allow octal numbers in the following. All matched numbers start
      // with a zero (if the do not, the previous if-branch is executed).
      // If the number is not octal format and starts with zero (e.g. `091`)
      // then only the zeros `0` is treated here and the `91` are ordinary
      // characters.
      // Example:
      //   /\091/.exec('\091')[0].length === 3
      else if (res = matchReg(/^[0-7]{1,3}/)) {
        match = res[0];
        if (/^0{1,3}$/.test(match)) {
          // If they are all zeros, then only take the first one.
          return createEscaped('null', 0x0000, '0', match.length + 1);
        } else {
          return createEscaped('octal', parseInt(match, 8), match, 1);
        }
      } else if (res = matchReg(/^[dDsSwW]/)) {
        return createCharacterClassEscape(res[0]);
      }
      return false;
    }

    function parseCharacterEscape() {
      // CharacterEscape ::
      //      ControlEscape
      //      c ControlLetter
      //      HexEscapeSequence
      //      UnicodeEscapeSequence
      //      IdentityEscape

      var res;
      if (res = matchReg(/^[fnrtv]/)) {
        // ControlEscape
        var codePoint = 0;
        switch (res[0]) {
          case 't': codePoint = 0x009; break;
          case 'n': codePoint = 0x00A; break;
          case 'v': codePoint = 0x00B; break;
          case 'f': codePoint = 0x00C; break;
          case 'r': codePoint = 0x00D; break;
        }
        return createEscaped('singleEscape', codePoint, '\\' + res[0]);
      } else if (res = matchReg(/^c([a-zA-Z])/)) {
        // c ControlLetter
        return createEscaped('controlLetter', res[1].charCodeAt(0) % 32, res[1], 2);
      } else if (res = matchReg(/^x([0-9a-fA-F]{2})/)) {
        // HexEscapeSequence
        return createEscaped('hexadecimalEscape', parseInt(res[1], 16), res[1], 2);
      } else if (res = matchReg(/^u([0-9a-fA-F]{4})/)) {
        // UnicodeEscapeSequence
        return parseUnicodeSurrogatePairEscape(
          createEscaped('unicodeEscape', parseInt(res[1], 16), res[1], 2)
        );
      } else if (hasUnicodeFlag && (res = matchReg(/^u\{([0-9a-fA-F]+)\}/))) {
        // RegExpUnicodeEscapeSequence (ES6 Unicode code point escape)
        return createEscaped('unicodeCodePointEscape', parseInt(res[1], 16), res[1], 4);
      } else {
        // IdentityEscape
        return parseIdentityEscape();
      }
    }

    // Taken from the Esprima parser.
    function isIdentifierPart(ch) {
      // Generated by `tools/generate-identifier-regex.js`.
      var NonAsciiIdentifierPart = new RegExp('[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B2\u08E4-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58\u0C59\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D60-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA69D\uA69F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA7AD\uA7B0\uA7B1\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB5F\uAB64\uAB65\uABC0-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2D\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]');

      return (ch === 36) || (ch === 95) ||  // $ (dollar) and _ (underscore)
        (ch >= 65 && ch <= 90) ||         // A..Z
        (ch >= 97 && ch <= 122) ||        // a..z
        (ch >= 48 && ch <= 57) ||         // 0..9
        (ch === 92) ||                    // \ (backslash)
        ((ch >= 0x80) && NonAsciiIdentifierPart.test(String.fromCharCode(ch)));
    }

    function parseIdentityEscape() {
      // IdentityEscape ::
      //      SourceCharacter but not IdentifierPart
      //      <ZWJ>
      //      <ZWNJ>

      var ZWJ = '\u200C';
      var ZWNJ = '\u200D';

      var tmp;

      if (!isIdentifierPart(lookahead())) {
        tmp = incr();
        return createEscaped('identifier', tmp.charCodeAt(0), tmp, 1);
      }

      if (match(ZWJ)) {
        // <ZWJ>
        return createEscaped('identifier', 0x200C, ZWJ);
      } else if (match(ZWNJ)) {
        // <ZWNJ>
        return createEscaped('identifier', 0x200D, ZWNJ);
      }

      return null;
    }

    function parseCharacterClass() {
      // CharacterClass ::
      //      [ [lookahead ∉ {^}] ClassRanges ]
      //      [ ^ ClassRanges ]

      var res, from = pos;
      if (res = matchReg(/^\[\^/)) {
        res = parseClassRanges();
        skip(']');
        return createCharacterClass(res, true, from, pos);
      } else if (match('[')) {
        res = parseClassRanges();
        skip(']');
        return createCharacterClass(res, false, from, pos);
      }

      return null;
    }

    function parseClassRanges() {
      // ClassRanges ::
      //      [empty]
      //      NonemptyClassRanges

      var res;
      if (current(']')) {
        // Empty array means nothing insinde of the ClassRange.
        return [];
      } else {
        res = parseNonemptyClassRanges();
        if (!res) {
          bail('nonEmptyClassRanges');
        }
        return res;
      }
    }

    function parseHelperClassRanges(atom) {
      var from, to, res;
      if (current('-') && !next(']')) {
        // ClassAtom - ClassAtom ClassRanges
        skip('-');

        res = parseClassAtom();
        if (!res) {
          bail('classAtom');
        }
        to = pos;
        var classRanges = parseClassRanges();
        if (!classRanges) {
          bail('classRanges');
        }
        from = atom.range[0];
        if (classRanges.type === 'empty') {
          return [createClassRange(atom, res, from, to)];
        }
        return [createClassRange(atom, res, from, to)].concat(classRanges);
      }

      res = parseNonemptyClassRangesNoDash();
      if (!res) {
        bail('nonEmptyClassRangesNoDash');
      }

      return [atom].concat(res);
    }

    function parseNonemptyClassRanges() {
      // NonemptyClassRanges ::
      //      ClassAtom
      //      ClassAtom NonemptyClassRangesNoDash
      //      ClassAtom - ClassAtom ClassRanges

      var atom = parseClassAtom();
      if (!atom) {
        bail('classAtom');
      }

      if (current(']')) {
        // ClassAtom
        return [atom];
      }

      // ClassAtom NonemptyClassRangesNoDash
      // ClassAtom - ClassAtom ClassRanges
      return parseHelperClassRanges(atom);
    }

    function parseNonemptyClassRangesNoDash() {
      // NonemptyClassRangesNoDash ::
      //      ClassAtom
      //      ClassAtomNoDash NonemptyClassRangesNoDash
      //      ClassAtomNoDash - ClassAtom ClassRanges

      var res = parseClassAtom();
      if (!res) {
        bail('classAtom');
      }
      if (current(']')) {
        //      ClassAtom
        return res;
      }

      // ClassAtomNoDash NonemptyClassRangesNoDash
      // ClassAtomNoDash - ClassAtom ClassRanges
      return parseHelperClassRanges(res);
    }

    function parseClassAtom() {
      // ClassAtom ::
      //      -
      //      ClassAtomNoDash
      if (match('-')) {
        return createCharacter('-');
      } else {
        return parseClassAtomNoDash();
      }
    }

    function parseClassAtomNoDash() {
      // ClassAtomNoDash ::
      //      SourceCharacter but not one of \ or ] or -
      //      \ ClassEscape

      var res;
      if (res = matchReg(/^[^\\\]-]/)) {
        return createCharacter(res[0]);
      } else if (match('\\')) {
        res = parseClassEscape();
        if (!res) {
          bail('classEscape');
        }

        return parseUnicodeSurrogatePairEscape(res);
      }
    }

    function bail(message, details, from, to) {
      from = from == null ? pos : from;
      to = to == null ? from : to;

      var contextStart = Math.max(0, from - 10);
      var contextEnd = Math.min(to + 10, str.length);

      // Output a bit of context and a line pointing to where our error is.
      //
      // We are assuming that there are no actual newlines in the content as this is a regular expression.
      var context = '    ' + str.substring(contextStart, contextEnd);
      var pointer = '    ' + new Array(from - contextStart + 1).join(' ') + '^';

      throw SyntaxError(message + ' at position ' + from + (details ? ': ' + details : '') + '\n' + context + '\n' + pointer);
    }

    var backrefDenied = [];
    var closedCaptureCounter = 0;
    var firstIteration = true;
    var hasUnicodeFlag = (flags || "").indexOf("u") !== -1;
    var pos = 0;

    // Convert the input to a string and treat the empty string special.
    str = String(str);
    if (str === '') {
      str = '(?:)';
    }

    var result = parseDisjunction();

    if (result.range[1] !== str.length) {
      bail('Could not parse entire input - got stuck', '', result.range[1]);
    }

    // The spec requires to interpret the `\2` in `/\2()()/` as backreference.
    // As the parser collects the number of capture groups as the string is
    // parsed it is impossible to make these decisions at the point when the
    // `\2` is handled. In case the local decision turns out to be wrong after
    // the parsing has finished, the input string is parsed a second time with
    // the total number of capture groups set.
    //
    // SEE: https://github.com/jviereck/regjsparser/issues/70
    for (var i = 0; i < backrefDenied.length; i++) {
      if (backrefDenied[i] <= closedCaptureCounter) {
        // Parse the input a second time.
        pos = 0;
        firstIteration = false;
        return parseDisjunction();
      }
    }

    return result;
  }

  var regjsparser = {
    parse: parse
  };

  if ( true && module.exports) {
    module.exports = regjsparser;
  } else {
    window.regjsparser = regjsparser;
  }

}());


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/regenerate v1.3.3 by @mathias | MIT license */
;(function(root) {

	// Detect free variables `exports`.
	var freeExports =  true && exports;

	// Detect free variable `module`.
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js/io.js or Browserified code,
	// and use it as `root`.
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var ERRORS = {
		'rangeOrder': 'A range\u2019s `stop` value must be greater than or equal ' +
			'to the `start` value.',
		'codePointRange': 'Invalid code point value. Code points range from ' +
			'U+000000 to U+10FFFF.'
	};

	// https://mathiasbynens.be/notes/javascript-encoding#surrogate-pairs
	var HIGH_SURROGATE_MIN = 0xD800;
	var HIGH_SURROGATE_MAX = 0xDBFF;
	var LOW_SURROGATE_MIN = 0xDC00;
	var LOW_SURROGATE_MAX = 0xDFFF;

	// In Regenerate output, `\0` is never preceded by `\` because we sort by
	// code point value, so let’s keep this regular expression simple.
	var regexNull = /\\x00([^0123456789]|$)/g;

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var extend = function(destination, source) {
		var key;
		for (key in source) {
			if (hasOwnProperty.call(source, key)) {
				destination[key] = source[key];
			}
		}
		return destination;
	};

	var forEach = function(array, callback) {
		var index = -1;
		var length = array.length;
		while (++index < length) {
			callback(array[index], index);
		}
	};

	var toString = object.toString;
	var isArray = function(value) {
		return toString.call(value) == '[object Array]';
	};
	var isNumber = function(value) {
		return typeof value == 'number' ||
			toString.call(value) == '[object Number]';
	};

	// This assumes that `number` is a positive integer that `toString()`s nicely
	// (which is the case for all code point values).
	var zeroes = '0000';
	var pad = function(number, totalCharacters) {
		var string = String(number);
		return string.length < totalCharacters
			? (zeroes + string).slice(-totalCharacters)
			: string;
	};

	var hex = function(number) {
		return Number(number).toString(16).toUpperCase();
	};

	var slice = [].slice;

	/*--------------------------------------------------------------------------*/

	var dataFromCodePoints = function(codePoints) {
		var index = -1;
		var length = codePoints.length;
		var max = length - 1;
		var result = [];
		var isStart = true;
		var tmp;
		var previous = 0;
		while (++index < length) {
			tmp = codePoints[index];
			if (isStart) {
				result.push(tmp);
				previous = tmp;
				isStart = false;
			} else {
				if (tmp == previous + 1) {
					if (index != max) {
						previous = tmp;
						continue;
					} else {
						isStart = true;
						result.push(tmp + 1);
					}
				} else {
					// End the previous range and start a new one.
					result.push(previous + 1, tmp);
					previous = tmp;
				}
			}
		}
		if (!isStart) {
			result.push(tmp + 1);
		}
		return result;
	};

	var dataRemove = function(data, codePoint) {
		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		var length = data.length;
		while (index < length) {
			start = data[index];
			end = data[index + 1];
			if (codePoint >= start && codePoint < end) {
				// Modify this pair.
				if (codePoint == start) {
					if (end == start + 1) {
						// Just remove `start` and `end`.
						data.splice(index, 2);
						return data;
					} else {
						// Just replace `start` with a new value.
						data[index] = codePoint + 1;
						return data;
					}
				} else if (codePoint == end - 1) {
					// Just replace `end` with a new value.
					data[index + 1] = codePoint;
					return data;
				} else {
					// Replace `[start, end]` with `[startA, endA, startB, endB]`.
					data.splice(index, 2, start, codePoint, codePoint + 1, end);
					return data;
				}
			}
			index += 2;
		}
		return data;
	};

	var dataRemoveRange = function(data, rangeStart, rangeEnd) {
		if (rangeEnd < rangeStart) {
			throw Error(ERRORS.rangeOrder);
		}
		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		while (index < data.length) {
			start = data[index];
			end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

			// Exit as soon as no more matching pairs can be found.
			if (start > rangeEnd) {
				return data;
			}

			// Check if this range pair is equal to, or forms a subset of, the range
			// to be removed.
			// E.g. we have `[0, 11, 40, 51]` and want to remove 0-10 → `[40, 51]`.
			// E.g. we have `[40, 51]` and want to remove 0-100 → `[]`.
			if (rangeStart <= start && rangeEnd >= end) {
				// Remove this pair.
				data.splice(index, 2);
				continue;
			}

			// Check if both `rangeStart` and `rangeEnd` are within the bounds of
			// this pair.
			// E.g. we have `[0, 11]` and want to remove 4-6 → `[0, 4, 7, 11]`.
			if (rangeStart >= start && rangeEnd < end) {
				if (rangeStart == start) {
					// Replace `[start, end]` with `[startB, endB]`.
					data[index] = rangeEnd + 1;
					data[index + 1] = end + 1;
					return data;
				}
				// Replace `[start, end]` with `[startA, endA, startB, endB]`.
				data.splice(index, 2, start, rangeStart, rangeEnd + 1, end + 1);
				return data;
			}

			// Check if only `rangeStart` is within the bounds of this pair.
			// E.g. we have `[0, 11]` and want to remove 4-20 → `[0, 4]`.
			if (rangeStart >= start && rangeStart <= end) {
				// Replace `end` with `rangeStart`.
				data[index + 1] = rangeStart;
				// Note: we cannot `return` just yet, in case any following pairs still
				// contain matching code points.
				// E.g. we have `[0, 11, 14, 31]` and want to remove 4-20
				// → `[0, 4, 21, 31]`.
			}

			// Check if only `rangeEnd` is within the bounds of this pair.
			// E.g. we have `[14, 31]` and want to remove 4-20 → `[21, 31]`.
			else if (rangeEnd >= start && rangeEnd <= end) {
				// Just replace `start`.
				data[index] = rangeEnd + 1;
				return data;
			}

			index += 2;
		}
		return data;
	};

	 var dataAdd = function(data, codePoint) {
		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		var lastIndex = null;
		var length = data.length;
		if (codePoint < 0x0 || codePoint > 0x10FFFF) {
			throw RangeError(ERRORS.codePointRange);
		}
		while (index < length) {
			start = data[index];
			end = data[index + 1];

			// Check if the code point is already in the set.
			if (codePoint >= start && codePoint < end) {
				return data;
			}

			if (codePoint == start - 1) {
				// Just replace `start` with a new value.
				data[index] = codePoint;
				return data;
			}

			// At this point, if `start` is `greater` than `codePoint`, insert a new
			// `[start, end]` pair before the current pair, or after the current pair
			// if there is a known `lastIndex`.
			if (start > codePoint) {
				data.splice(
					lastIndex != null ? lastIndex + 2 : 0,
					0,
					codePoint,
					codePoint + 1
				);
				return data;
			}

			if (codePoint == end) {
				// Check if adding this code point causes two separate ranges to become
				// a single range, e.g. `dataAdd([0, 4, 5, 10], 4)` → `[0, 10]`.
				if (codePoint + 1 == data[index + 2]) {
					data.splice(index, 4, start, data[index + 3]);
					return data;
				}
				// Else, just replace `end` with a new value.
				data[index + 1] = codePoint + 1;
				return data;
			}
			lastIndex = index;
			index += 2;
		}
		// The loop has finished; add the new pair to the end of the data set.
		data.push(codePoint, codePoint + 1);
		return data;
	};

	var dataAddData = function(dataA, dataB) {
		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		var data = dataA.slice();
		var length = dataB.length;
		while (index < length) {
			start = dataB[index];
			end = dataB[index + 1] - 1;
			if (start == end) {
				data = dataAdd(data, start);
			} else {
				data = dataAddRange(data, start, end);
			}
			index += 2;
		}
		return data;
	};

	var dataRemoveData = function(dataA, dataB) {
		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		var data = dataA.slice();
		var length = dataB.length;
		while (index < length) {
			start = dataB[index];
			end = dataB[index + 1] - 1;
			if (start == end) {
				data = dataRemove(data, start);
			} else {
				data = dataRemoveRange(data, start, end);
			}
			index += 2;
		}
		return data;
	};

	var dataAddRange = function(data, rangeStart, rangeEnd) {
		if (rangeEnd < rangeStart) {
			throw Error(ERRORS.rangeOrder);
		}
		if (
			rangeStart < 0x0 || rangeStart > 0x10FFFF ||
			rangeEnd < 0x0 || rangeEnd > 0x10FFFF
		) {
			throw RangeError(ERRORS.codePointRange);
		}
		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		var added = false;
		var length = data.length;
		while (index < length) {
			start = data[index];
			end = data[index + 1];

			if (added) {
				// The range has already been added to the set; at this point, we just
				// need to get rid of the following ranges in case they overlap.

				// Check if this range can be combined with the previous range.
				if (start == rangeEnd + 1) {
					data.splice(index - 1, 2);
					return data;
				}

				// Exit as soon as no more possibly overlapping pairs can be found.
				if (start > rangeEnd) {
					return data;
				}

				// E.g. `[0, 11, 12, 16]` and we’ve added 5-15, so we now have
				// `[0, 16, 12, 16]`. Remove the `12,16` part, as it lies within the
				// `0,16` range that was previously added.
				if (start >= rangeStart && start <= rangeEnd) {
					// `start` lies within the range that was previously added.

					if (end > rangeStart && end - 1 <= rangeEnd) {
						// `end` lies within the range that was previously added as well,
						// so remove this pair.
						data.splice(index, 2);
						index -= 2;
						// Note: we cannot `return` just yet, as there may still be other
						// overlapping pairs.
					} else {
						// `start` lies within the range that was previously added, but
						// `end` doesn’t. E.g. `[0, 11, 12, 31]` and we’ve added 5-15, so
						// now we have `[0, 16, 12, 31]`. This must be written as `[0, 31]`.
						// Remove the previously added `end` and the current `start`.
						data.splice(index - 1, 2);
						index -= 2;
					}

					// Note: we cannot return yet.
				}

			}

			else if (start == rangeEnd + 1) {
				data[index] = rangeStart;
				return data;
			}

			// Check if a new pair must be inserted *before* the current one.
			else if (start > rangeEnd) {
				data.splice(index, 0, rangeStart, rangeEnd + 1);
				return data;
			}

			else if (rangeStart >= start && rangeStart < end && rangeEnd + 1 <= end) {
				// The new range lies entirely within an existing range pair. No action
				// needed.
				return data;
			}

			else if (
				// E.g. `[0, 11]` and you add 5-15 → `[0, 16]`.
				(rangeStart >= start && rangeStart < end) ||
				// E.g. `[0, 3]` and you add 3-6 → `[0, 7]`.
				end == rangeStart
			) {
				// Replace `end` with the new value.
				data[index + 1] = rangeEnd + 1;
				// Make sure the next range pair doesn’t overlap, e.g. `[0, 11, 12, 14]`
				// and you add 5-15 → `[0, 16]`, i.e. remove the `12,14` part.
				added = true;
				// Note: we cannot `return` just yet.
			}

			else if (rangeStart <= start && rangeEnd + 1 >= end) {
				// The new range is a superset of the old range.
				data[index] = rangeStart;
				data[index + 1] = rangeEnd + 1;
				added = true;
			}

			index += 2;
		}
		// The loop has finished without doing anything; add the new pair to the end
		// of the data set.
		if (!added) {
			data.push(rangeStart, rangeEnd + 1);
		}
		return data;
	};

	var dataContains = function(data, codePoint) {
		var index = 0;
		var length = data.length;
		// Exit early if `codePoint` is not within `data`’s overall range.
		var start = data[index];
		var end = data[length - 1];
		if (length >= 2) {
			if (codePoint < start || codePoint > end) {
				return false;
			}
		}
		// Iterate over the data per `(start, end)` pair.
		while (index < length) {
			start = data[index];
			end = data[index + 1];
			if (codePoint >= start && codePoint < end) {
				return true;
			}
			index += 2;
		}
		return false;
	};

	var dataIntersection = function(data, codePoints) {
		var index = 0;
		var length = codePoints.length;
		var codePoint;
		var result = [];
		while (index < length) {
			codePoint = codePoints[index];
			if (dataContains(data, codePoint)) {
				result.push(codePoint);
			}
			++index;
		}
		return dataFromCodePoints(result);
	};

	var dataIsEmpty = function(data) {
		return !data.length;
	};

	var dataIsSingleton = function(data) {
		// Check if the set only represents a single code point.
		return data.length == 2 && data[0] + 1 == data[1];
	};

	var dataToArray = function(data) {
		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		var result = [];
		var length = data.length;
		while (index < length) {
			start = data[index];
			end = data[index + 1];
			while (start < end) {
				result.push(start);
				++start;
			}
			index += 2;
		}
		return result;
	};

	/*--------------------------------------------------------------------------*/

	// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
	var floor = Math.floor;
	var highSurrogate = function(codePoint) {
		return parseInt(
			floor((codePoint - 0x10000) / 0x400) + HIGH_SURROGATE_MIN,
			10
		);
	};

	var lowSurrogate = function(codePoint) {
		return parseInt(
			(codePoint - 0x10000) % 0x400 + LOW_SURROGATE_MIN,
			10
		);
	};

	var stringFromCharCode = String.fromCharCode;
	var codePointToString = function(codePoint) {
		var string;
		// https://mathiasbynens.be/notes/javascript-escapes#single
		// Note: the `\b` escape sequence for U+0008 BACKSPACE in strings has a
		// different meaning in regular expressions (word boundary), so it cannot
		// be used here.
		if (codePoint == 0x09) {
			string = '\\t';
		}
		// Note: IE < 9 treats `'\v'` as `'v'`, so avoid using it.
		// else if (codePoint == 0x0B) {
		// 	string = '\\v';
		// }
		else if (codePoint == 0x0A) {
			string = '\\n';
		}
		else if (codePoint == 0x0C) {
			string = '\\f';
		}
		else if (codePoint == 0x0D) {
			string = '\\r';
		}
		else if (codePoint == 0x2D) {
			// https://mathiasbynens.be/notes/javascript-escapes#hexadecimal
			// Note: `-` (U+002D HYPHEN-MINUS) is escaped in this way rather
			// than by backslash-escaping, in case the output is used outside
			// of a character class in a `u` RegExp. /\-/u throws, but
			// /\x2D/u is fine.
			string = '\\x2D';
		}
		else if (codePoint == 0x5C) {
			string = '\\\\';
		}
		else if (
			codePoint == 0x24 ||
			(codePoint >= 0x28 && codePoint <= 0x2B) ||
			codePoint == 0x2E || codePoint == 0x2F ||
			codePoint == 0x3F ||
			(codePoint >= 0x5B && codePoint <= 0x5E) ||
			(codePoint >= 0x7B && codePoint <= 0x7D)
		) {
			// The code point maps to an unsafe printable ASCII character;
			// backslash-escape it. Here’s the list of those symbols:
			//
			//     $()*+./?[\]^{|}
			//
			// This matches SyntaxCharacters as well as `/` (U+002F SOLIDUS).
			// https://tc39.github.io/ecma262/#prod-SyntaxCharacter
			string = '\\' + stringFromCharCode(codePoint);
		}
		else if (codePoint >= 0x20 && codePoint <= 0x7E) {
			// The code point maps to one of these printable ASCII symbols
			// (including the space character):
			//
			//      !"#%&',/0123456789:;<=>@ABCDEFGHIJKLMNO
			//     PQRSTUVWXYZ_`abcdefghijklmnopqrstuvwxyz~
			//
			// These can safely be used directly.
			string = stringFromCharCode(codePoint);
		}
		else if (codePoint <= 0xFF) {
			string = '\\x' + pad(hex(codePoint), 2);
		}
		else { // `codePoint <= 0xFFFF` holds true.
			// https://mathiasbynens.be/notes/javascript-escapes#unicode
			string = '\\u' + pad(hex(codePoint), 4);
		}

		// There’s no need to account for astral symbols / surrogate pairs here,
		// since `codePointToString` is private and only used for BMP code points.
		// But if that’s what you need, just add an `else` block with this code:
		//
		//     string = '\\u' + pad(hex(highSurrogate(codePoint)), 4)
		//     	+ '\\u' + pad(hex(lowSurrogate(codePoint)), 4);

		return string;
	};

	var codePointToStringUnicode = function(codePoint) {
		if (codePoint <= 0xFFFF) {
			return codePointToString(codePoint);
		}
		return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
	};

	var symbolToCodePoint = function(symbol) {
		var length = symbol.length;
		var first = symbol.charCodeAt(0);
		var second;
		if (
			first >= HIGH_SURROGATE_MIN && first <= HIGH_SURROGATE_MAX &&
			length > 1 // There is a next code unit.
		) {
			// `first` is a high surrogate, and there is a next character. Assume
			// it’s a low surrogate (else it’s invalid usage of Regenerate anyway).
			second = symbol.charCodeAt(1);
			// https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
			return (first - HIGH_SURROGATE_MIN) * 0x400 +
				second - LOW_SURROGATE_MIN + 0x10000;
		}
		return first;
	};

	var createBMPCharacterClasses = function(data) {
		// Iterate over the data per `(start, end)` pair.
		var result = '';
		var index = 0;
		var start;
		var end;
		var length = data.length;
		if (dataIsSingleton(data)) {
			return codePointToString(data[0]);
		}
		while (index < length) {
			start = data[index];
			end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
			if (start == end) {
				result += codePointToString(start);
			} else if (start + 1 == end) {
				result += codePointToString(start) + codePointToString(end);
			} else {
				result += codePointToString(start) + '-' + codePointToString(end);
			}
			index += 2;
		}
		return '[' + result + ']';
	};

	var createUnicodeCharacterClasses = function(data) {
		// Iterate over the data per `(start, end)` pair.
		var result = '';
		var index = 0;
		var start;
		var end;
		var length = data.length;
		if (dataIsSingleton(data)) {
			return codePointToStringUnicode(data[0]);
		}
		while (index < length) {
			start = data[index];
			end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
			if (start == end) {
				result += codePointToStringUnicode(start);
			} else if (start + 1 == end) {
				result += codePointToStringUnicode(start) + codePointToStringUnicode(end);
			} else {
				result += codePointToStringUnicode(start) + '-' + codePointToStringUnicode(end);
			}
			index += 2;
		}
		return '[' + result + ']';
	};

	var splitAtBMP = function(data) {
		// Iterate over the data per `(start, end)` pair.
		var loneHighSurrogates = [];
		var loneLowSurrogates = [];
		var bmp = [];
		var astral = [];
		var index = 0;
		var start;
		var end;
		var length = data.length;
		while (index < length) {
			start = data[index];
			end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.

			if (start < HIGH_SURROGATE_MIN) {

				// The range starts and ends before the high surrogate range.
				// E.g. (0, 0x10).
				if (end < HIGH_SURROGATE_MIN) {
					bmp.push(start, end + 1);
				}

				// The range starts before the high surrogate range and ends within it.
				// E.g. (0, 0xD855).
				if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
					bmp.push(start, HIGH_SURROGATE_MIN);
					loneHighSurrogates.push(HIGH_SURROGATE_MIN, end + 1);
				}

				// The range starts before the high surrogate range and ends in the low
				// surrogate range. E.g. (0, 0xDCFF).
				if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
					bmp.push(start, HIGH_SURROGATE_MIN);
					loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
					loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
				}

				// The range starts before the high surrogate range and ends after the
				// low surrogate range. E.g. (0, 0x10FFFF).
				if (end > LOW_SURROGATE_MAX) {
					bmp.push(start, HIGH_SURROGATE_MIN);
					loneHighSurrogates.push(HIGH_SURROGATE_MIN, HIGH_SURROGATE_MAX + 1);
					loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
					if (end <= 0xFFFF) {
						bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
					} else {
						bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
						astral.push(0xFFFF + 1, end + 1);
					}
				}

			} else if (start >= HIGH_SURROGATE_MIN && start <= HIGH_SURROGATE_MAX) {

				// The range starts and ends in the high surrogate range.
				// E.g. (0xD855, 0xD866).
				if (end >= HIGH_SURROGATE_MIN && end <= HIGH_SURROGATE_MAX) {
					loneHighSurrogates.push(start, end + 1);
				}

				// The range starts in the high surrogate range and ends in the low
				// surrogate range. E.g. (0xD855, 0xDCFF).
				if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
					loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
					loneLowSurrogates.push(LOW_SURROGATE_MIN, end + 1);
				}

				// The range starts in the high surrogate range and ends after the low
				// surrogate range. E.g. (0xD855, 0x10FFFF).
				if (end > LOW_SURROGATE_MAX) {
					loneHighSurrogates.push(start, HIGH_SURROGATE_MAX + 1);
					loneLowSurrogates.push(LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1);
					if (end <= 0xFFFF) {
						bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
					} else {
						bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
						astral.push(0xFFFF + 1, end + 1);
					}
				}

			} else if (start >= LOW_SURROGATE_MIN && start <= LOW_SURROGATE_MAX) {

				// The range starts and ends in the low surrogate range.
				// E.g. (0xDCFF, 0xDDFF).
				if (end >= LOW_SURROGATE_MIN && end <= LOW_SURROGATE_MAX) {
					loneLowSurrogates.push(start, end + 1);
				}

				// The range starts in the low surrogate range and ends after the low
				// surrogate range. E.g. (0xDCFF, 0x10FFFF).
				if (end > LOW_SURROGATE_MAX) {
					loneLowSurrogates.push(start, LOW_SURROGATE_MAX + 1);
					if (end <= 0xFFFF) {
						bmp.push(LOW_SURROGATE_MAX + 1, end + 1);
					} else {
						bmp.push(LOW_SURROGATE_MAX + 1, 0xFFFF + 1);
						astral.push(0xFFFF + 1, end + 1);
					}
				}

			} else if (start > LOW_SURROGATE_MAX && start <= 0xFFFF) {

				// The range starts and ends after the low surrogate range.
				// E.g. (0xFFAA, 0x10FFFF).
				if (end <= 0xFFFF) {
					bmp.push(start, end + 1);
				} else {
					bmp.push(start, 0xFFFF + 1);
					astral.push(0xFFFF + 1, end + 1);
				}

			} else {

				// The range starts and ends in the astral range.
				astral.push(start, end + 1);

			}

			index += 2;
		}
		return {
			'loneHighSurrogates': loneHighSurrogates,
			'loneLowSurrogates': loneLowSurrogates,
			'bmp': bmp,
			'astral': astral
		};
	};

	var optimizeSurrogateMappings = function(surrogateMappings) {
		var result = [];
		var tmpLow = [];
		var addLow = false;
		var mapping;
		var nextMapping;
		var highSurrogates;
		var lowSurrogates;
		var nextHighSurrogates;
		var nextLowSurrogates;
		var index = -1;
		var length = surrogateMappings.length;
		while (++index < length) {
			mapping = surrogateMappings[index];
			nextMapping = surrogateMappings[index + 1];
			if (!nextMapping) {
				result.push(mapping);
				continue;
			}
			highSurrogates = mapping[0];
			lowSurrogates = mapping[1];
			nextHighSurrogates = nextMapping[0];
			nextLowSurrogates = nextMapping[1];

			// Check for identical high surrogate ranges.
			tmpLow = lowSurrogates;
			while (
				nextHighSurrogates &&
				highSurrogates[0] == nextHighSurrogates[0] &&
				highSurrogates[1] == nextHighSurrogates[1]
			) {
				// Merge with the next item.
				if (dataIsSingleton(nextLowSurrogates)) {
					tmpLow = dataAdd(tmpLow, nextLowSurrogates[0]);
				} else {
					tmpLow = dataAddRange(
						tmpLow,
						nextLowSurrogates[0],
						nextLowSurrogates[1] - 1
					);
				}
				++index;
				mapping = surrogateMappings[index];
				highSurrogates = mapping[0];
				lowSurrogates = mapping[1];
				nextMapping = surrogateMappings[index + 1];
				nextHighSurrogates = nextMapping && nextMapping[0];
				nextLowSurrogates = nextMapping && nextMapping[1];
				addLow = true;
			}
			result.push([
				highSurrogates,
				addLow ? tmpLow : lowSurrogates
			]);
			addLow = false;
		}
		return optimizeByLowSurrogates(result);
	};

	var optimizeByLowSurrogates = function(surrogateMappings) {
		if (surrogateMappings.length == 1) {
			return surrogateMappings;
		}
		var index = -1;
		var innerIndex = -1;
		while (++index < surrogateMappings.length) {
			var mapping = surrogateMappings[index];
			var lowSurrogates = mapping[1];
			var lowSurrogateStart = lowSurrogates[0];
			var lowSurrogateEnd = lowSurrogates[1];
			innerIndex = index; // Note: the loop starts at the next index.
			while (++innerIndex < surrogateMappings.length) {
				var otherMapping = surrogateMappings[innerIndex];
				var otherLowSurrogates = otherMapping[1];
				var otherLowSurrogateStart = otherLowSurrogates[0];
				var otherLowSurrogateEnd = otherLowSurrogates[1];
				if (
					lowSurrogateStart == otherLowSurrogateStart &&
					lowSurrogateEnd == otherLowSurrogateEnd
				) {
					// Add the code points in the other item to this one.
					if (dataIsSingleton(otherMapping[0])) {
						mapping[0] = dataAdd(mapping[0], otherMapping[0][0]);
					} else {
						mapping[0] = dataAddRange(
							mapping[0],
							otherMapping[0][0],
							otherMapping[0][1] - 1
						);
					}
					// Remove the other, now redundant, item.
					surrogateMappings.splice(innerIndex, 1);
					--innerIndex;
				}
			}
		}
		return surrogateMappings;
	};

	var surrogateSet = function(data) {
		// Exit early if `data` is an empty set.
		if (!data.length) {
			return [];
		}

		// Iterate over the data per `(start, end)` pair.
		var index = 0;
		var start;
		var end;
		var startHigh;
		var startLow;
		var endHigh;
		var endLow;
		var surrogateMappings = [];
		var length = data.length;
		while (index < length) {
			start = data[index];
			end = data[index + 1] - 1;

			startHigh = highSurrogate(start);
			startLow = lowSurrogate(start);
			endHigh = highSurrogate(end);
			endLow = lowSurrogate(end);

			var startsWithLowestLowSurrogate = startLow == LOW_SURROGATE_MIN;
			var endsWithHighestLowSurrogate = endLow == LOW_SURROGATE_MAX;
			var complete = false;

			// Append the previous high-surrogate-to-low-surrogate mappings.
			// Step 1: `(startHigh, startLow)` to `(startHigh, LOW_SURROGATE_MAX)`.
			if (
				startHigh == endHigh ||
				startsWithLowestLowSurrogate && endsWithHighestLowSurrogate
			) {
				surrogateMappings.push([
					[startHigh, endHigh + 1],
					[startLow, endLow + 1]
				]);
				complete = true;
			} else {
				surrogateMappings.push([
					[startHigh, startHigh + 1],
					[startLow, LOW_SURROGATE_MAX + 1]
				]);
			}

			// Step 2: `(startHigh + 1, LOW_SURROGATE_MIN)` to
			// `(endHigh - 1, LOW_SURROGATE_MAX)`.
			if (!complete && startHigh + 1 < endHigh) {
				if (endsWithHighestLowSurrogate) {
					// Combine step 2 and step 3.
					surrogateMappings.push([
						[startHigh + 1, endHigh + 1],
						[LOW_SURROGATE_MIN, endLow + 1]
					]);
					complete = true;
				} else {
					surrogateMappings.push([
						[startHigh + 1, endHigh],
						[LOW_SURROGATE_MIN, LOW_SURROGATE_MAX + 1]
					]);
				}
			}

			// Step 3. `(endHigh, LOW_SURROGATE_MIN)` to `(endHigh, endLow)`.
			if (!complete) {
				surrogateMappings.push([
					[endHigh, endHigh + 1],
					[LOW_SURROGATE_MIN, endLow + 1]
				]);
			}

			index += 2;
		}

		// The format of `surrogateMappings` is as follows:
		//
		//     [ surrogateMapping1, surrogateMapping2 ]
		//
		// i.e.:
		//
		//     [
		//       [ highSurrogates1, lowSurrogates1 ],
		//       [ highSurrogates2, lowSurrogates2 ]
		//     ]
		return optimizeSurrogateMappings(surrogateMappings);
	};

	var createSurrogateCharacterClasses = function(surrogateMappings) {
		var result = [];
		forEach(surrogateMappings, function(surrogateMapping) {
			var highSurrogates = surrogateMapping[0];
			var lowSurrogates = surrogateMapping[1];
			result.push(
				createBMPCharacterClasses(highSurrogates) +
				createBMPCharacterClasses(lowSurrogates)
			);
		});
		return result.join('|');
	};

	var createCharacterClassesFromData = function(data, bmpOnly, hasUnicodeFlag) {
		if (hasUnicodeFlag) {
			return createUnicodeCharacterClasses(data);
		}
		var result = [];

		var parts = splitAtBMP(data);
		var loneHighSurrogates = parts.loneHighSurrogates;
		var loneLowSurrogates = parts.loneLowSurrogates;
		var bmp = parts.bmp;
		var astral = parts.astral;
		var hasLoneHighSurrogates = !dataIsEmpty(loneHighSurrogates);
		var hasLoneLowSurrogates = !dataIsEmpty(loneLowSurrogates);

		var surrogateMappings = surrogateSet(astral);

		if (bmpOnly) {
			bmp = dataAddData(bmp, loneHighSurrogates);
			hasLoneHighSurrogates = false;
			bmp = dataAddData(bmp, loneLowSurrogates);
			hasLoneLowSurrogates = false;
		}

		if (!dataIsEmpty(bmp)) {
			// The data set contains BMP code points that are not high surrogates
			// needed for astral code points in the set.
			result.push(createBMPCharacterClasses(bmp));
		}
		if (surrogateMappings.length) {
			// The data set contains astral code points; append character classes
			// based on their surrogate pairs.
			result.push(createSurrogateCharacterClasses(surrogateMappings));
		}
		// https://gist.github.com/mathiasbynens/bbe7f870208abcfec860
		if (hasLoneHighSurrogates) {
			result.push(
				createBMPCharacterClasses(loneHighSurrogates) +
				// Make sure the high surrogates aren’t part of a surrogate pair.
				'(?![\\uDC00-\\uDFFF])'
			);
		}
		if (hasLoneLowSurrogates) {
			result.push(
				// It is not possible to accurately assert the low surrogates aren’t
				// part of a surrogate pair, since JavaScript regular expressions do
				// not support lookbehind.
				'(?:[^\\uD800-\\uDBFF]|^)' +
				createBMPCharacterClasses(loneLowSurrogates)
			);
		}
		return result.join('|');
	};

	/*--------------------------------------------------------------------------*/

	// `regenerate` can be used as a constructor (and new methods can be added to
	// its prototype) but also as a regular function, the latter of which is the
	// documented and most common usage. For that reason, it’s not capitalized.
	var regenerate = function(value) {
		if (arguments.length > 1) {
			value = slice.call(arguments);
		}
		if (this instanceof regenerate) {
			this.data = [];
			return value ? this.add(value) : this;
		}
		return (new regenerate).add(value);
	};

	regenerate.version = '1.3.3';

	var proto = regenerate.prototype;
	extend(proto, {
		'add': function(value) {
			var $this = this;
			if (value == null) {
				return $this;
			}
			if (value instanceof regenerate) {
				// Allow passing other Regenerate instances.
				$this.data = dataAddData($this.data, value.data);
				return $this;
			}
			if (arguments.length > 1) {
				value = slice.call(arguments);
			}
			if (isArray(value)) {
				forEach(value, function(item) {
					$this.add(item);
				});
				return $this;
			}
			$this.data = dataAdd(
				$this.data,
				isNumber(value) ? value : symbolToCodePoint(value)
			);
			return $this;
		},
		'remove': function(value) {
			var $this = this;
			if (value == null) {
				return $this;
			}
			if (value instanceof regenerate) {
				// Allow passing other Regenerate instances.
				$this.data = dataRemoveData($this.data, value.data);
				return $this;
			}
			if (arguments.length > 1) {
				value = slice.call(arguments);
			}
			if (isArray(value)) {
				forEach(value, function(item) {
					$this.remove(item);
				});
				return $this;
			}
			$this.data = dataRemove(
				$this.data,
				isNumber(value) ? value : symbolToCodePoint(value)
			);
			return $this;
		},
		'addRange': function(start, end) {
			var $this = this;
			$this.data = dataAddRange($this.data,
				isNumber(start) ? start : symbolToCodePoint(start),
				isNumber(end) ? end : symbolToCodePoint(end)
			);
			return $this;
		},
		'removeRange': function(start, end) {
			var $this = this;
			var startCodePoint = isNumber(start) ? start : symbolToCodePoint(start);
			var endCodePoint = isNumber(end) ? end : symbolToCodePoint(end);
			$this.data = dataRemoveRange(
				$this.data,
				startCodePoint,
				endCodePoint
			);
			return $this;
		},
		'intersection': function(argument) {
			var $this = this;
			// Allow passing other Regenerate instances.
			// TODO: Optimize this by writing and using `dataIntersectionData()`.
			var array = argument instanceof regenerate ?
				dataToArray(argument.data) :
				argument;
			$this.data = dataIntersection($this.data, array);
			return $this;
		},
		'contains': function(codePoint) {
			return dataContains(
				this.data,
				isNumber(codePoint) ? codePoint : symbolToCodePoint(codePoint)
			);
		},
		'clone': function() {
			var set = new regenerate;
			set.data = this.data.slice(0);
			return set;
		},
		'toString': function(options) {
			var result = createCharacterClassesFromData(
				this.data,
				options ? options.bmpOnly : false,
				options ? options.hasUnicodeFlag : false
			);
			if (!result) {
				// For an empty set, return something that can be inserted `/here/` to
				// form a valid regular expression. Avoid `(?:)` since that matches the
				// empty string.
				return '[]';
			}
			// Use `\0` instead of `\x00` where possible.
			return result.replace(regexNull, '\\0$1');
		},
		'toRegExp': function(flags) {
			var pattern = this.toString(
				flags && flags.indexOf('u') != -1 ?
					{ 'hasUnicodeFlag': true } :
					null
			);
			return RegExp(pattern, flags || '');
		},
		'valueOf': function() { // Note: `valueOf` is aliased as `toArray`.
			return dataToArray(this.data);
		}
	});

	proto.toArray = proto.valueOf;

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return regenerate;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ }),
/* 10 */
/***/ (function(module) {

module.exports = JSON.parse("{\"75\":8490,\"83\":383,\"107\":8490,\"115\":383,\"181\":924,\"197\":8491,\"383\":83,\"452\":453,\"453\":452,\"455\":456,\"456\":455,\"458\":459,\"459\":458,\"497\":498,\"498\":497,\"837\":8126,\"914\":976,\"917\":1013,\"920\":1012,\"921\":8126,\"922\":1008,\"924\":181,\"928\":982,\"929\":1009,\"931\":962,\"934\":981,\"937\":8486,\"962\":931,\"976\":914,\"977\":1012,\"981\":934,\"982\":928,\"1008\":922,\"1009\":929,\"1012\":[920,977],\"1013\":917,\"7776\":7835,\"7835\":7776,\"8126\":[837,921],\"8486\":937,\"8490\":75,\"8491\":197,\"66560\":66600,\"66561\":66601,\"66562\":66602,\"66563\":66603,\"66564\":66604,\"66565\":66605,\"66566\":66606,\"66567\":66607,\"66568\":66608,\"66569\":66609,\"66570\":66610,\"66571\":66611,\"66572\":66612,\"66573\":66613,\"66574\":66614,\"66575\":66615,\"66576\":66616,\"66577\":66617,\"66578\":66618,\"66579\":66619,\"66580\":66620,\"66581\":66621,\"66582\":66622,\"66583\":66623,\"66584\":66624,\"66585\":66625,\"66586\":66626,\"66587\":66627,\"66588\":66628,\"66589\":66629,\"66590\":66630,\"66591\":66631,\"66592\":66632,\"66593\":66633,\"66594\":66634,\"66595\":66635,\"66596\":66636,\"66597\":66637,\"66598\":66638,\"66599\":66639,\"66600\":66560,\"66601\":66561,\"66602\":66562,\"66603\":66563,\"66604\":66564,\"66605\":66565,\"66606\":66566,\"66607\":66567,\"66608\":66568,\"66609\":66569,\"66610\":66570,\"66611\":66571,\"66612\":66572,\"66613\":66573,\"66614\":66574,\"66615\":66575,\"66616\":66576,\"66617\":66577,\"66618\":66578,\"66619\":66579,\"66620\":66580,\"66621\":66581,\"66622\":66582,\"66623\":66583,\"66624\":66584,\"66625\":66585,\"66626\":66586,\"66627\":66587,\"66628\":66588,\"66629\":66589,\"66630\":66590,\"66631\":66591,\"66632\":66592,\"66633\":66593,\"66634\":66594,\"66635\":66595,\"66636\":66596,\"66637\":66597,\"66638\":66598,\"66639\":66599,\"68736\":68800,\"68737\":68801,\"68738\":68802,\"68739\":68803,\"68740\":68804,\"68741\":68805,\"68742\":68806,\"68743\":68807,\"68744\":68808,\"68745\":68809,\"68746\":68810,\"68747\":68811,\"68748\":68812,\"68749\":68813,\"68750\":68814,\"68751\":68815,\"68752\":68816,\"68753\":68817,\"68754\":68818,\"68755\":68819,\"68756\":68820,\"68757\":68821,\"68758\":68822,\"68759\":68823,\"68760\":68824,\"68761\":68825,\"68762\":68826,\"68763\":68827,\"68764\":68828,\"68765\":68829,\"68766\":68830,\"68767\":68831,\"68768\":68832,\"68769\":68833,\"68770\":68834,\"68771\":68835,\"68772\":68836,\"68773\":68837,\"68774\":68838,\"68775\":68839,\"68776\":68840,\"68777\":68841,\"68778\":68842,\"68779\":68843,\"68780\":68844,\"68781\":68845,\"68782\":68846,\"68783\":68847,\"68784\":68848,\"68785\":68849,\"68786\":68850,\"68800\":68736,\"68801\":68737,\"68802\":68738,\"68803\":68739,\"68804\":68740,\"68805\":68741,\"68806\":68742,\"68807\":68743,\"68808\":68744,\"68809\":68745,\"68810\":68746,\"68811\":68747,\"68812\":68748,\"68813\":68749,\"68814\":68750,\"68815\":68751,\"68816\":68752,\"68817\":68753,\"68818\":68754,\"68819\":68755,\"68820\":68756,\"68821\":68757,\"68822\":68758,\"68823\":68759,\"68824\":68760,\"68825\":68761,\"68826\":68762,\"68827\":68763,\"68828\":68764,\"68829\":68765,\"68830\":68766,\"68831\":68767,\"68832\":68768,\"68833\":68769,\"68834\":68770,\"68835\":68771,\"68836\":68772,\"68837\":68773,\"68838\":68774,\"68839\":68775,\"68840\":68776,\"68841\":68777,\"68842\":68778,\"68843\":68779,\"68844\":68780,\"68845\":68781,\"68846\":68782,\"68847\":68783,\"68848\":68784,\"68849\":68785,\"68850\":68786,\"71840\":71872,\"71841\":71873,\"71842\":71874,\"71843\":71875,\"71844\":71876,\"71845\":71877,\"71846\":71878,\"71847\":71879,\"71848\":71880,\"71849\":71881,\"71850\":71882,\"71851\":71883,\"71852\":71884,\"71853\":71885,\"71854\":71886,\"71855\":71887,\"71856\":71888,\"71857\":71889,\"71858\":71890,\"71859\":71891,\"71860\":71892,\"71861\":71893,\"71862\":71894,\"71863\":71895,\"71864\":71896,\"71865\":71897,\"71866\":71898,\"71867\":71899,\"71868\":71900,\"71869\":71901,\"71870\":71902,\"71871\":71903,\"71872\":71840,\"71873\":71841,\"71874\":71842,\"71875\":71843,\"71876\":71844,\"71877\":71845,\"71878\":71846,\"71879\":71847,\"71880\":71848,\"71881\":71849,\"71882\":71850,\"71883\":71851,\"71884\":71852,\"71885\":71853,\"71886\":71854,\"71887\":71855,\"71888\":71856,\"71889\":71857,\"71890\":71858,\"71891\":71859,\"71892\":71860,\"71893\":71861,\"71894\":71862,\"71895\":71863,\"71896\":71864,\"71897\":71865,\"71898\":71866,\"71899\":71867,\"71900\":71868,\"71901\":71869,\"71902\":71870,\"71903\":71871}");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

// Generated by `/scripts/character-class-escape-sets.js`. Do not edit.
var regenerate = __webpack_require__(9);

exports.REGULAR = {
	'd': regenerate()
		.addRange(0x30, 0x39),
	'D': regenerate()
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0xFFFF),
	's': regenerate(0x20, 0xA0, 0x1680, 0x180E, 0x202F, 0x205F, 0x3000, 0xFEFF)
		.addRange(0x9, 0xD)
		.addRange(0x2000, 0x200A)
		.addRange(0x2028, 0x2029),
	'S': regenerate()
		.addRange(0x0, 0x8)
		.addRange(0xE, 0x1F)
		.addRange(0x21, 0x9F)
		.addRange(0xA1, 0x167F)
		.addRange(0x1681, 0x180D)
		.addRange(0x180F, 0x1FFF)
		.addRange(0x200B, 0x2027)
		.addRange(0x202A, 0x202E)
		.addRange(0x2030, 0x205E)
		.addRange(0x2060, 0x2FFF)
		.addRange(0x3001, 0xFEFE)
		.addRange(0xFF00, 0xFFFF),
	'w': regenerate(0x5F)
		.addRange(0x30, 0x39)
		.addRange(0x41, 0x5A)
		.addRange(0x61, 0x7A),
	'W': regenerate(0x60)
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x40)
		.addRange(0x5B, 0x5E)
		.addRange(0x7B, 0xFFFF)
};

exports.UNICODE = {
	'd': regenerate()
		.addRange(0x30, 0x39),
	'D': regenerate()
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x10FFFF),
	's': regenerate(0x20, 0xA0, 0x1680, 0x180E, 0x202F, 0x205F, 0x3000, 0xFEFF)
		.addRange(0x9, 0xD)
		.addRange(0x2000, 0x200A)
		.addRange(0x2028, 0x2029),
	'S': regenerate()
		.addRange(0x0, 0x8)
		.addRange(0xE, 0x1F)
		.addRange(0x21, 0x9F)
		.addRange(0xA1, 0x167F)
		.addRange(0x1681, 0x180D)
		.addRange(0x180F, 0x1FFF)
		.addRange(0x200B, 0x2027)
		.addRange(0x202A, 0x202E)
		.addRange(0x2030, 0x205E)
		.addRange(0x2060, 0x2FFF)
		.addRange(0x3001, 0xFEFE)
		.addRange(0xFF00, 0x10FFFF),
	'w': regenerate(0x5F)
		.addRange(0x30, 0x39)
		.addRange(0x41, 0x5A)
		.addRange(0x61, 0x7A),
	'W': regenerate(0x60)
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x40)
		.addRange(0x5B, 0x5E)
		.addRange(0x7B, 0x10FFFF)
};

exports.UNICODE_IGNORE_CASE = {
	'd': regenerate()
		.addRange(0x30, 0x39),
	'D': regenerate()
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x10FFFF),
	's': regenerate(0x20, 0xA0, 0x1680, 0x180E, 0x202F, 0x205F, 0x3000, 0xFEFF)
		.addRange(0x9, 0xD)
		.addRange(0x2000, 0x200A)
		.addRange(0x2028, 0x2029),
	'S': regenerate()
		.addRange(0x0, 0x8)
		.addRange(0xE, 0x1F)
		.addRange(0x21, 0x9F)
		.addRange(0xA1, 0x167F)
		.addRange(0x1681, 0x180D)
		.addRange(0x180F, 0x1FFF)
		.addRange(0x200B, 0x2027)
		.addRange(0x202A, 0x202E)
		.addRange(0x2030, 0x205E)
		.addRange(0x2060, 0x2FFF)
		.addRange(0x3001, 0xFEFE)
		.addRange(0xFF00, 0x10FFFF),
	'w': regenerate(0x5F, 0x17F, 0x212A)
		.addRange(0x30, 0x39)
		.addRange(0x41, 0x5A)
		.addRange(0x61, 0x7A),
	'W': regenerate(0x4B, 0x53, 0x60)
		.addRange(0x0, 0x2F)
		.addRange(0x3A, 0x40)
		.addRange(0x5B, 0x5E)
		.addRange(0x7B, 0x10FFFF)
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify;

var regexpu = __webpack_require__(5);
var identifierEscapeRegexp = new RegExp(
	regexpu("(^[^A-Za-z_\\-\\u{00a0}-\\u{10ffff}]|^\\-\\-|[^A-Za-z_0-9\\-\\u{00a0}-\\u{10ffff}])", "ug"),
	"g"
);

function escape(str, identifier) {
	if(str === "*") {
		return "*";
	}
	if (identifier) {
		return str.replace(identifierEscapeRegexp, "\\$1");
	} else {
		return str.replace(/(^[^A-Za-z_\\-]|^\-\-|[^A-Za-z_0-9\\-])/g, "\\$1");
	}
}

function stringifyWithoutBeforeAfter(tree) {
	switch(tree.type) {
	case "selectors":
		return tree.nodes.map(stringify).join(",");
	case "selector":
		return tree.nodes.map(stringify).join("");
	case "element":
		return (typeof tree.namespace === "string" ? escape(tree.namespace) + "|" : "") + escape(tree.name);
	case "class":
		return "." + escape(tree.name, true);
	case "id":
		return "#" + escape(tree.name, true);
	case "attribute":
		return "[" + tree.content + "]";
	case "spacing":
		return tree.value;
	case "pseudo-class":
		return ":" + escape(tree.name) + (typeof tree.content === "string" ? "(" + tree.content + ")" : "");
	case "nested-pseudo-class":
		return ":" + escape(tree.name) + "(" + tree.nodes.map(stringify).join(",") + ")";
	case "pseudo-element":
		return "::" + escape(tree.name);
	case "universal":
		return (typeof tree.namespace === "string" ? escape(tree.namespace) + "|" : "") + "*";
	case "operator":
		return tree.operator;
	case "comment":
		return "/*" + tree.content + "*/";
	case "invalid":
		return tree.value;
	}
}


stringify = function stringify(tree) {
	var str = stringifyWithoutBeforeAfter(tree);
	if(tree.before) {
		str = tree.before + str;
	}
	if(tree.after) {
		str = str + tree.after;
	}
	return str;
};

module.exports = stringify;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Parser = __webpack_require__(4);

function commentMatch(match, content) {
	this.value.nodes.push({
		type: "comment",
		content: content
	});
}

function spacingMatch(match) {
	var item = this.value.nodes[this.value.nodes.length - 1];
	item.after = (item.after || "") + match;
}

function initialSpacingMatch(match) {
	this.value.before = match;
}

function endSpacingMatch(match) {
	this.value.after = match;
}

function unescapeString(content) {
	return content.replace(/\\(?:([a-fA-F0-9]{1,6})|(.))/g, function(all, unicode, otherCharacter) {
		if (otherCharacter) {
			return otherCharacter;
		}

		var C = parseInt(unicode, 16);
		if(C < 0x10000) {
			return String.fromCharCode(C);
		} else {
			return String.fromCharCode(Math.floor((C - 0x10000) / 0x400) + 0xD800) +
				String.fromCharCode((C - 0x10000) % 0x400 + 0xDC00);
		}
	});
}

function stringMatch(match, content) {
	var value = unescapeString(content);
	this.value.nodes.push({
		type: "string",
		value: value,
		stringType: match[0]
	});
}

function commaMatch(match, spacing) {
	var newValue = {
		type: "value",
		nodes: []
	};
	if(spacing) {
		newValue.before = spacing;
	}
	this.root.nodes.push(newValue);
	this.value = newValue;
}

function itemMatch(match) {
	this.value.nodes.push({
		type: "item",
		name: match
	});
}

function nestedItemMatch(match, name, spacing) {
	this.stack.push(this.root);
	this.root = {
		type: "nested-item",
		name: name,
		nodes: [
			{ type: "value", nodes: [] }
		]
	};
	if(spacing) {
		this.root.nodes[0].before = spacing;
	}
	this.value.nodes.push(this.root);
	this.value = this.root.nodes[0];
}

function nestedItemEndMatch(match, spacing, remaining) {
	if(this.stack.length === 0) {
		if(spacing) {
			var item = this.value.nodes[this.value.nodes.length - 1];
			item.after = (item.after || "") + spacing;
		}
		this.value.nodes.push({
			type: "invalid",
			value: remaining
		});
	} else {
		if(spacing) {
			this.value.after = spacing;
		}
		this.root = this.stack.pop();
		this.value = this.root.nodes[this.root.nodes.length - 1];
	}
}

function urlMatch(match, innerSpacingBefore, content, innerSpacingAfter) {
	var item = {
		type: "url"
	};
	if(innerSpacingBefore) {
		item.innerSpacingBefore = innerSpacingBefore;
	}
	if(innerSpacingAfter) {
		item.innerSpacingAfter = innerSpacingAfter;
	}
	switch(content[0]) {
		case "\"":
			item.stringType = "\"";
			item.url = unescapeString(content.substr(1, content.length - 2));
			break;
		case "'":
			item.stringType = "'";
			item.url = unescapeString(content.substr(1, content.length - 2));
			break;
		default:
			item.url = unescapeString(content);
			break;
	}
	this.value.nodes.push(item);
}

var parser = new Parser({
	decl: {
		"^\\s+": initialSpacingMatch,
		"/\\*([\\s\\S]*?)\\*/": commentMatch,
		"\"((?:[^\\\\\"]|\\\\.)*)\"": stringMatch,
		"'((?:[^\\\\']|\\\\.)*)'": stringMatch,
		"url\\((\\s*)(\"(?:[^\\\\\"]|\\\\.)*\")(\\s*)\\)": urlMatch,
		"url\\((\\s*)('(?:[^\\\\']|\\\\.)*')(\\s*)\\)": urlMatch,
		"url\\((\\s*)((?:[^\\\\)'\"]|\\\\.)*)(\\s*)\\)": urlMatch,
		"([\\w\-]+)\\((\\s*)": nestedItemMatch,
		"(\\s*)(\\))": nestedItemEndMatch,
		",(\\s*)": commaMatch,
		"\\s+$": endSpacingMatch,
		"\\s+": spacingMatch,
		"[^\\s,\)]+": itemMatch
	}
});

function parseValues(str) {
	var valueNode = {
		type: "value",
		nodes: []
	};
	var rootNode = {
		type: "values",
		nodes: [
			valueNode
		]
	};
	parser.parse("decl", str, {
		stack: [],
		root: rootNode,
		value: valueNode
	});
	return rootNode;
}

module.exports = parseValues;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var cssesc = __webpack_require__(15);

var stringify;

function escape(str, stringType) {
	return cssesc(str, {
		quotes: stringType === "\"" ? "double" : "single"
	});
}

function stringifyWithoutBeforeAfter(tree) {
	switch(tree.type) {
	case "values":
		return tree.nodes.map(stringify).join(",");
	case "value":
		return tree.nodes.map(stringify).join("");
	case "item":
		return tree.name;
	case "nested-item":
		return tree.name + "(" + tree.nodes.map(stringify).join(",") + ")";
	case "invalid":
		return tree.value;
	case "comment":
		return "/*" + tree.content + "*/";
	case "string":
		switch(tree.stringType) {
		case "'":
			return "'" + escape(tree.value, "'") + "'";
		case "\"":
			return "\"" + escape(tree.value, "\"") + "\"";
		}
		/* istanbul ignore next */
		throw new Error("Invalid stringType");
	case "url":
		var start = "url(" + (tree.innerSpacingBefore || "");
		var end = (tree.innerSpacingAfter || "") + ")";
		switch(tree.stringType) {
		case "'":
			return start + "'" + tree.url.replace(/(\\)/g, "\\$1").replace(/'/g, "\\'") + "'" + end;
		case "\"":
			return start + "\"" + tree.url.replace(/(\\)/g, "\\$1").replace(/"/g, "\\\"") + "\"" + end;
		default:
			return start + tree.url.replace(/("|'|\)|\\)/g, "\\$1") + end;
		}
	}
}


stringify = function stringify(tree) {
	var str = stringifyWithoutBeforeAfter(tree);
	if(tree.before) {
		str = tree.before + str;
	}
	if(tree.after) {
		str = str + tree.after;
	}
	return str;
};

module.exports = stringify;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! http://mths.be/cssesc v0.1.0 by @mathias */
;(function(root) {

	// Detect free variables `exports`
	var freeExports =  true && exports;

	// Detect free variable `module`
	var freeModule =  true && module &&
		module.exports == freeExports && module;

	// Detect free variable `global`, from Node.js or Browserified code,
	// and use it as `root`
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/*--------------------------------------------------------------------------*/

	var object = {};
	var hasOwnProperty = object.hasOwnProperty;
	var merge = function(options, defaults) {
		if (!options) {
			return defaults;
		}
		var key;
		var result = {};
		for (key in defaults) {
			// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
			// only recognized option names are used
			result[key] = hasOwnProperty.call(options, key)
				? options[key]
				: defaults[key];
		}
		return result;
	};

	/*--------------------------------------------------------------------------*/

	var regexAnySingleEscape = /[\x20-\x2C\x2E\x2F\x3B-\x40\x5B-\x5E\x60\x7B-\x7E]/;
	var regexSingleEscape = /[\x20\x21\x23-\x26\x28-\x2C\x2E\x2F\x3B-\x40\x5B\x5D\x5E\x60\x7B-\x7E]/;
	var regexAlwaysEscape = /['"\\]/;
	var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;

	// http://mathiasbynens.be/notes/css-escapes#css
	var cssesc = function(string, options) {

		// Handle options
		options = merge(options, cssesc.options);
		if (options.quotes != 'single' && options.quotes != 'double') {
			options.quotes = 'single';
		}
		var quote = options.quotes == 'double' ? '"' : '\'';
		var isIdentifier = options.isIdentifier;

		var firstChar = string.charAt(0);
		var output = '';
		var counter = 0;
		var length = string.length;
		var value;
		var character;
		var codePoint;
		var extra; // used for potential low surrogates

		while (counter < length) {
			character = string.charAt(counter++);
			codePoint = character.charCodeAt();
			// if it’s not a printable ASCII character
			if (codePoint < 0x20 || codePoint > 0x7E) {
				if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // next character is low surrogate
						codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						counter--;
					}
				}
				value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
			} else {
				if (options.escapeEverything) {
					if (regexAnySingleEscape.test(character)) {
						value = '\\' + character;
					} else {
						value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
					}
				// `:` can be escaped as `\:`, but that fails in IE < 8
				} else if (/[\t\n\f\r\x0B:]/.test(character)) {
					if (!isIdentifier && character == ':') {
						value = character;
					} else {
						value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
					}
				} else if (
					character == '\\' ||
					(
						!isIdentifier &&
						(
							(character == '"' && quote == character) ||
							(character == '\'' && quote == character)
						)
					) ||
					(isIdentifier && regexSingleEscape.test(character))
				) {
					value = '\\' + character;
				} else {
					value = character;
				}
			}
			output += value;
		}

		if (isIdentifier) {
			if (/^_/.test(output)) {
				// Prevent IE6 from ignoring the rule altogether (in case this is for an
				// identifier used as a selector)
				output = '\\_' + output.slice(1);
			} else if (/^-[-\d]/.test(output)) {
				output = '\\-' + output.slice(1);
			} else if (/\d/.test(firstChar)) {
				output = '\\3' + firstChar + ' ' + output.slice(1);
			}
		}

		// Remove spaces after `\HEX` escapes that are not followed by a hex digit,
		// since they’re redundant. Note that this is only possible if the escape
		// sequence isn’t preceded by an odd number of backslashes.
		output = output.replace(regexExcessiveSpaces, function($0, $1, $2) {
			if ($1 && $1.length % 2) {
				// it’s not safe to remove the space, so don’t
				return $0;
			}
			// strip the space
			return ($1 || '') + $2;
		});

		if (!isIdentifier && options.wrap) {
			return quote + output + quote;
		}
		return output;
	};

	// Expose default options (so they can be overridden globally)
	cssesc.options = {
		'escapeEverything': false,
		'isIdentifier': false,
		'quotes': 'single',
		'wrap': false
	};

	cssesc.version = '0.1.0';

	/*--------------------------------------------------------------------------*/

	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
			return cssesc;
		}).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}	else {}

}(this));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(7)(module)))

/***/ })
/******/ ]);
