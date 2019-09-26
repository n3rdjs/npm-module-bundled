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


var _hasProp = __webpack_require__(3);

var _hasProp2 = _interopRequireDefault(_hasProp);

var _elementType = __webpack_require__(5);

var _elementType2 = _interopRequireDefault(_elementType);

var _eventHandlers = __webpack_require__(6);

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _getProp = __webpack_require__(7);

var _getProp2 = _interopRequireDefault(_getProp);

var _getPropValue = __webpack_require__(8);

var _getPropValue2 = _interopRequireDefault(_getPropValue);

var _propName = __webpack_require__(4);

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  hasProp: _hasProp2.default,
  hasAnyProp: _hasProp.hasAnyProp,
  hasEveryProp: _hasProp.hasEveryProp,
  elementType: _elementType2.default,
  eventHandlers: _eventHandlers2.default,
  eventHandlersByType: _eventHandlers.eventHandlersByType,
  getProp: _getProp2.default,
  getPropValue: _getPropValue2.default,
  getLiteralPropValue: _getPropValue.getLiteralPropValue,
  propName: _propName2.default
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasProp;
exports.hasAnyProp = hasAnyProp;
exports.hasEveryProp = hasEveryProp;

var _propName = __webpack_require__(4);

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  spreadStrict: true,
  ignoreCase: true
};

/**
 * Returns boolean indicating whether an prop exists on the props
 * property of a JSX element node.
 */
function hasProp() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propToCheck = options.ignoreCase ? prop.toUpperCase() : prop;

  return props.some(function (attribute) {
    // If the props contain a spread prop, then refer to strict param.
    if (attribute.type === 'JSXSpreadAttribute') {
      return !options.spreadStrict;
    }

    var currentProp = options.ignoreCase ? (0, _propName2.default)(attribute).toUpperCase() : (0, _propName2.default)(attribute);

    return propToCheck === currentProp;
  });
}

/**
 * Given the props on a node and a list of props to check, this returns a boolean
 * indicating if any of them exist on the node.
 */
function hasAnyProp() {
  var nodeProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propsToCheck = typeof props === 'string' ? props.split(' ') : props;

  return propsToCheck.some(function (prop) {
    return hasProp(nodeProps, prop, options);
  });
}

/**
 * Given the props on a node and a list of props to check, this returns a boolean
 * indicating if all of them exist on the node
 */
function hasEveryProp() {
  var nodeProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propsToCheck = typeof props === 'string' ? props.split(' ') : props;

  return propsToCheck.every(function (prop) {
    return hasProp(nodeProps, prop, options);
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = propName;
/**
 * Returns the name of the prop given the JSXAttribute object.
 */
function propName() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!prop.type || prop.type !== 'JSXAttribute') {
    throw new Error('The prop must be a JSXAttribute collected by the AST parser.');
  }

  if (prop.name.type === 'JSXNamespacedName') {
    return prop.name.namespace.name + ':' + prop.name.name.name;
  }

  return prop.name.name;
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = elementType;
function resolveMemberExpressions() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (object.type === 'JSXMemberExpression') {
    return resolveMemberExpressions(object.object, object.property) + '.' + property.name;
  }

  return object.name + '.' + property.name;
}

/**
 * Returns the tagName associated with a JSXElement.
 */
function elementType() {
  var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = node.name;


  if (!name) {
    throw new Error('The argument provided is not a JSXElement node.');
  }

  if (name.type === 'JSXMemberExpression') {
    var _name$object = name.object,
        object = _name$object === undefined ? {} : _name$object,
        _name$property = name.property,
        property = _name$property === undefined ? {} : _name$property;

    return resolveMemberExpressions(object, property);
  }

  if (name.type === 'JSXNamespacedName') {
    return name.namespace.name + ':' + name.name.name;
  }

  return node.name.name;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Common event handlers for JSX element event binding.
 */

var eventHandlersByType = {
  clipboard: ['onCopy', 'onCut', 'onPaste'],
  composition: ['onCompositionEnd', 'onCompositionStart', 'onCompositionUpdate'],
  keyboard: ['onKeyDown', 'onKeyPress', 'onKeyUp'],
  focus: ['onFocus', 'onBlur'],
  form: ['onChange', 'onInput', 'onSubmit'],
  mouse: ['onClick', 'onContextMenu', 'onDblClick', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver', 'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver', 'onMouseUp'],
  selection: ['onSelect'],
  touch: ['onTouchCancel', 'onTouchEnd', 'onTouchMove', 'onTouchStart'],
  ui: ['onScroll'],
  wheel: ['onWheel'],
  media: ['onAbort', 'onCanPlay', 'onCanPlayThrough', 'onDurationChange', 'onEmptied', 'onEncrypted', 'onEnded', 'onError', 'onLoadedData', 'onLoadedMetadata', 'onLoadStart', 'onPause', 'onPlay', 'onPlaying', 'onProgress', 'onRateChange', 'onSeeked', 'onSeeking', 'onStalled', 'onSuspend', 'onTimeUpdate', 'onVolumeChange', 'onWaiting'],
  image: ['onLoad', 'onError'],
  animation: ['onAnimationStart', 'onAnimationEnd', 'onAnimationIteration'],
  transition: ['onTransitionEnd']
};

var eventHandlers = Object.keys(eventHandlersByType).reduce(function (accumulator, type) {
  return accumulator.concat(eventHandlersByType[type]);
}, []);

exports.default = eventHandlers;
exports.eventHandlersByType = eventHandlersByType;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProp;

var _propName = __webpack_require__(4);

var _propName2 = _interopRequireDefault(_propName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_OPTIONS = {
  ignoreCase: true
};

/**
 * Returns the JSXAttribute itself or undefined, indicating the prop
 * is not present on the JSXOpeningElement.
 *
 */
function getProp() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var prop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_OPTIONS;

  var propToFind = options.ignoreCase ? prop.toUpperCase() : prop;

  return props.find(function (attribute) {
    // If the props contain a spread prop, then skip.
    if (attribute.type === 'JSXSpreadAttribute') {
      return false;
    }

    var currentProp = options.ignoreCase ? (0, _propName2.default)(attribute).toUpperCase() : (0, _propName2.default)(attribute);

    return propToFind === currentProp;
  });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropValue;
exports.getLiteralPropValue = getLiteralPropValue;

var _values = __webpack_require__(9);

var _values2 = _interopRequireDefault(_values);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extractValue = function extractValue(attribute, extractor) {
  if (attribute && attribute.type === 'JSXAttribute') {
    if (attribute.value === null) {
      // Null valued attributes imply truthiness.
      // For example: <div aria-hidden />
      // See: https://facebook.github.io/react/docs/jsx-in-depth.html#boolean-attributes
      return true;
    }

    return extractor(attribute.value);
  }

  return undefined;
};

/**
 * Returns the value of a given attribute.
 * Different types of attributes have their associated
 * values in different properties on the object.
 *
 * This function should return the most *closely* associated
 * value with the intention of the JSX.
 *
 * @param attribute - The JSXAttribute collected by AST parser.
 */
function getPropValue(attribute) {
  return extractValue(attribute, _values2.default);
}

/**
 * Returns the value of a given attribute.
 * Different types of attributes have their associated
 * values in different properties on the object.
 *
 * This function should return a value only if we can extract
 * a literal value from its attribute (i.e. values that have generic
 * types in JavaScript - strings, numbers, booleans, etc.)
 *
 * @param attribute - The JSXAttribute collected by AST parser.
 */
function getLiteralPropValue(attribute) {
  return extractValue(attribute, _values.getLiteralValue);
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getValue;
exports.getLiteralValue = getLiteralValue;

var _object = __webpack_require__(10);

var _object2 = _interopRequireDefault(_object);

var _Literal = __webpack_require__(21);

var _Literal2 = _interopRequireDefault(_Literal);

var _JSXElement = __webpack_require__(22);

var _JSXElement2 = _interopRequireDefault(_JSXElement);

var _expressions = __webpack_require__(23);

var _expressions2 = _interopRequireDefault(_expressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Composition map of types to their extractor functions.
var TYPES = {
  Literal: _Literal2.default,
  JSXElement: _JSXElement2.default,
  JSXExpressionContainer: _expressions2.default
};

// Composition map of types to their extractor functions to handle literals.
var LITERAL_TYPES = (0, _object2.default)({}, TYPES, {
  JSXElement: function JSXElement() {
    return null;
  },
  JSXExpressionContainer: _expressions.extractLiteral
});

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *all* possible types.
 *
 * @param value - AST Value object on a JSX Attribute.
 */
function getValue(value) {
  return TYPES[value.type](value);
}

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *some* possible types that map to literals.
 *
 * @param value - AST Value object on a JSX Attribute.
 */
function getLiteralValue(value) {
  return LITERAL_TYPES[value.type](value);
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperties = __webpack_require__(11);

var implementation = __webpack_require__(15);
var getPolyfill = __webpack_require__(19);
var shim = __webpack_require__(20);

var polyfill = getPolyfill();

defineProperties(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(12);
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(13);

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(14);

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(13); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var keys = __webpack_require__(12);
var bind = __webpack_require__(16);
var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols = __webpack_require__(18)();
var toObject = Object;
var push = bind.call(Function.call, Array.prototype.push);
var propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;

module.exports = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = toObject(target);
	var s, source, i, props, syms, value, key;
	for (s = 1; s < arguments.length; ++s) {
		source = toObject(arguments[s]);
		props = keys(source);
		var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			syms = getSymbols(source);
			for (i = 0; i < syms.length; ++i) {
				key = syms[i];
				if (propIsEnumerable(source, key)) {
					push(props, key);
				}
			}
		}
		for (i = 0; i < props.length; ++i) {
			key = props[i];
			value = source[key];
			if (propIsEnumerable(source, key)) {
				objTarget[key] = value;
			}
		}
	}
	return objTarget;
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(17);

module.exports = Function.prototype.bind || implementation;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 17], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(15);

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	// v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	// note: this does not detect the bug unless there's 20 characters
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	// which is 72% slower than our shim, and Firefox 40's native implementation.
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(11);
var getPolyfill = __webpack_require__(19);

module.exports = function shimAssign() {
	var polyfill = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromLiteral;
/**
 * Extractor function for a Literal type value node.
 *
 * @param - value - AST Value object with type `Literal`
 * @returns { String|Boolean } - The extracted value converted to correct type.
 */
function extractValueFromLiteral(value) {
  var extractedValue = value.value;


  var normalizedStringValue = typeof extractedValue === 'string' && extractedValue.toLowerCase();
  if (normalizedStringValue === 'true') {
    return true;
  }

  if (normalizedStringValue === 'false') {
    return false;
  }

  return extractedValue;
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromJSXElement;
/**
 * Extractor function for a JSXElement type value node.
 *
 * Returns self-closing element with correct name.
 */
function extractValueFromJSXElement(value) {
  return "<" + value.openingElement.name.name + " />";
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extract;
exports.extractLiteral = extractLiteral;

var _object = __webpack_require__(10);

var _object2 = _interopRequireDefault(_object);

var _Literal = __webpack_require__(21);

var _Literal2 = _interopRequireDefault(_Literal);

var _JSXElement = __webpack_require__(22);

var _JSXElement2 = _interopRequireDefault(_JSXElement);

var _Identifier = __webpack_require__(24);

var _Identifier2 = _interopRequireDefault(_Identifier);

var _TaggedTemplateExpression = __webpack_require__(25);

var _TaggedTemplateExpression2 = _interopRequireDefault(_TaggedTemplateExpression);

var _TemplateLiteral = __webpack_require__(26);

var _TemplateLiteral2 = _interopRequireDefault(_TemplateLiteral);

var _FunctionExpression = __webpack_require__(27);

var _FunctionExpression2 = _interopRequireDefault(_FunctionExpression);

var _LogicalExpression = __webpack_require__(28);

var _LogicalExpression2 = _interopRequireDefault(_LogicalExpression);

var _MemberExpression = __webpack_require__(29);

var _MemberExpression2 = _interopRequireDefault(_MemberExpression);

var _OptionalMemberExpression = __webpack_require__(30);

var _OptionalMemberExpression2 = _interopRequireDefault(_OptionalMemberExpression);

var _CallExpression = __webpack_require__(31);

var _CallExpression2 = _interopRequireDefault(_CallExpression);

var _UnaryExpression = __webpack_require__(32);

var _UnaryExpression2 = _interopRequireDefault(_UnaryExpression);

var _ThisExpression = __webpack_require__(33);

var _ThisExpression2 = _interopRequireDefault(_ThisExpression);

var _ConditionalExpression = __webpack_require__(34);

var _ConditionalExpression2 = _interopRequireDefault(_ConditionalExpression);

var _BinaryExpression = __webpack_require__(35);

var _BinaryExpression2 = _interopRequireDefault(_BinaryExpression);

var _ObjectExpression = __webpack_require__(36);

var _ObjectExpression2 = _interopRequireDefault(_ObjectExpression);

var _NewExpression = __webpack_require__(37);

var _NewExpression2 = _interopRequireDefault(_NewExpression);

var _UpdateExpression = __webpack_require__(38);

var _UpdateExpression2 = _interopRequireDefault(_UpdateExpression);

var _ArrayExpression = __webpack_require__(39);

var _ArrayExpression2 = _interopRequireDefault(_ArrayExpression);

var _BindExpression = __webpack_require__(40);

var _BindExpression2 = _interopRequireDefault(_BindExpression);

var _SpreadElement = __webpack_require__(41);

var _SpreadElement2 = _interopRequireDefault(_SpreadElement);

var _TypeCastExpression = __webpack_require__(42);

var _TypeCastExpression2 = _interopRequireDefault(_TypeCastExpression);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Composition map of types to their extractor functions.
var TYPES = {
  Identifier: _Identifier2.default,
  Literal: _Literal2.default,
  JSXElement: _JSXElement2.default,
  TaggedTemplateExpression: _TaggedTemplateExpression2.default,
  TemplateLiteral: _TemplateLiteral2.default,
  ArrowFunctionExpression: _FunctionExpression2.default,
  FunctionExpression: _FunctionExpression2.default,
  LogicalExpression: _LogicalExpression2.default,
  MemberExpression: _MemberExpression2.default,
  OptionalMemberExpression: _OptionalMemberExpression2.default,
  CallExpression: _CallExpression2.default,
  UnaryExpression: _UnaryExpression2.default,
  ThisExpression: _ThisExpression2.default,
  ConditionalExpression: _ConditionalExpression2.default,
  BinaryExpression: _BinaryExpression2.default,
  ObjectExpression: _ObjectExpression2.default,
  NewExpression: _NewExpression2.default,
  UpdateExpression: _UpdateExpression2.default,
  ArrayExpression: _ArrayExpression2.default,
  BindExpression: _BindExpression2.default,
  SpreadElement: _SpreadElement2.default,
  TypeCastExpression: _TypeCastExpression2.default
};

var noop = function noop() {
  return null;
};

var errorMessage = function errorMessage(expression) {
  return 'The prop value with an expression type of ' + expression + ' could not be resolved. Please file issue to get this fixed immediately.';
};

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *all* possible expression types.
 *
 * @param - value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
function extract(value) {
  // Value will not have the expression property when we recurse.
  // The type for expression on ArrowFunctionExpression is a boolean.
  var expression = void 0;
  if (typeof value.expression !== 'boolean' && value.expression) {
    expression = value.expression; // eslint-disable-line prefer-destructuring
  } else {
    expression = value;
  }
  var _expression = expression,
      type = _expression.type;


  while (type === 'TSNonNullExpression' || type === 'TSAsExpression') {
    var _expression2 = expression;
    type = _expression2.type;

    if (expression.expression) {
      var _expression3 = expression;
      expression = _expression3.expression;
    }
  }

  if (TYPES[type] === undefined) {
    // eslint-disable-next-line no-console
    console.error(errorMessage(type));
    return null;
  }

  return TYPES[type](expression);
}

// Composition map of types to their extractor functions to handle literals.
var LITERAL_TYPES = (0, _object2.default)({}, TYPES, {
  Literal: function Literal(value) {
    var extractedVal = TYPES.Literal.call(undefined, value);
    var isNull = extractedVal === null;
    // This will be convention for attributes that have null
    // value explicitly defined (<div prop={null} /> maps to 'null').
    return isNull ? 'null' : extractedVal;
  },
  Identifier: function Identifier(value) {
    var isUndefined = TYPES.Identifier.call(undefined, value) === undefined;
    return isUndefined ? undefined : null;
  },
  JSXElement: noop,
  ArrowFunctionExpression: noop,
  FunctionExpression: noop,
  LogicalExpression: noop,
  MemberExpression: noop,
  OptionalMemberExpression: noop,
  CallExpression: noop,
  UnaryExpression: function UnaryExpression(value) {
    var extractedVal = TYPES.UnaryExpression.call(undefined, value);
    return extractedVal === undefined ? null : extractedVal;
  },
  UpdateExpression: function UpdateExpression(value) {
    var extractedVal = TYPES.UpdateExpression.call(undefined, value);
    return extractedVal === undefined ? null : extractedVal;
  },
  ThisExpression: noop,
  ConditionalExpression: noop,
  BinaryExpression: noop,
  ObjectExpression: noop,
  NewExpression: noop,
  ArrayExpression: function ArrayExpression(value) {
    var extractedVal = TYPES.ArrayExpression.call(undefined, value);
    return extractedVal.filter(function (val) {
      return val !== null;
    });
  },
  BindExpression: noop,
  SpreadElement: noop,
  TSNonNullExpression: noop,
  TSAsExpression: noop,
  TypeCastExpression: noop
});

/**
 * This function maps an AST value node
 * to its correct extractor function for its
 * given type.
 *
 * This will map correctly for *some* possible types that map to literals.
 *
 * @param - value - AST Value object with type `JSXExpressionContainer`
 * @returns The extracted value.
 */
function extractLiteral(value) {
  // Value will not have the expression property when we recurse.
  var expression = value.expression || value;
  var type = expression.type;


  if (LITERAL_TYPES[type] === undefined) {
    // eslint-disable-next-line no-console
    console.error(errorMessage(type));
    return null;
  }

  return LITERAL_TYPES[type](expression);
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromIdentifier;
var JS_RESERVED = {
  Array: Array,
  Date: Date,
  Infinity: Infinity,
  Math: Math,
  Number: Number,
  Object: Object,
  String: String,
  undefined: undefined
};

/**
 * Extractor function for a Identifier type value node.
 * An Identifier is usually a reference to a variable.
 * Just return variable name to determine its existence.
 *
 * @param - value - AST Value object with type `Identifier`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromIdentifier(value) {
  var name = value.name;


  if (Object.hasOwnProperty.call(JS_RESERVED, name)) {
    return JS_RESERVED[name];
  }

  return name;
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromTaggedTemplateExpression;

var _TemplateLiteral = __webpack_require__(26);

var _TemplateLiteral2 = _interopRequireDefault(_TemplateLiteral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the string value of a tagged template literal object.
 * Redirects the bulk of the work to `TemplateLiteral`.
 */
function extractValueFromTaggedTemplateExpression(value) {
  return (0, _TemplateLiteral2.default)(value.quasi);
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromTemplateLiteral;
/**
 * Returns the string value of a template literal object.
 * Tries to build it as best as it can based on the passed
 * prop. For instance `This is a ${prop}` will return 'This is a {prop}'.
 *
 * If the template literal builds to undefined (`${undefined}`), then
 * this should return "undefined".
 */
function extractValueFromTemplateLiteral(value) {
  var quasis = value.quasis,
      expressions = value.expressions;

  var partitions = quasis.concat(expressions);

  return partitions.sort(function (a, b) {
    return a.start - b.start;
  }).reduce(function (raw, part) {
    var type = part.type;

    if (type === 'TemplateElement') {
      return raw + part.value.raw;
    }

    if (type === 'Identifier') {
      return part.name === 'undefined' ? '' + raw + part.name : raw + '{' + part.name + '}';
    }

    if (type.indexOf('Expression') > -1) {
      return raw + '{' + type + '}';
    }

    return raw;
  }, '');
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromFunctionExpression;
/**
 * Extractor function for a FunctionExpression type value node.
 * Statically, we can't execute the given function, so just return a function
 * to indicate that the value is present.
 *
 * @param - value - AST Value object with type `FunctionExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromFunctionExpression(value) {
  return function () {
    return value;
  };
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromLogicalExpression;
/**
 * Extractor function for a LogicalExpression type value node.
 * A logical expression is `a && b` or `a || b`, so we evaluate both sides
 * and return the extracted value of the expression.
 *
 * @param - value - AST Value object with type `LogicalExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromLogicalExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  var operator = value.operator,
      left = value.left,
      right = value.right;

  var leftVal = getValue(left);
  var rightVal = getValue(right);

  return operator === '&&' ? leftVal && rightVal : leftVal || rightVal;
}

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromMemberExpression;
/**
 * Extractor function for a MemberExpression type value node.
 * A member expression is accessing a property on an object `obj.property`.
 *
 * @param - value - AST Value object with type `MemberExpression`
 * @returns - The extracted value converted to correct type
 *  and maintaing `obj.property` convention.
 */
function extractValueFromMemberExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  return getValue(value.object) + '.' + getValue(value.property);
}

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromOptionalMemberExpression;
/**
 * Extractor function for a OptionalMemberExpression type value node.
 * A member expression is accessing a property on an object `obj.property`.
 *
 * @param - value - AST Value object with type `OptionalMemberExpression`
 * @returns - The extracted value converted to correct type
 *  and maintaing `obj?.property` convention.
 */
function extractValueFromOptionalMemberExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  return getValue(value.object) + '?.' + getValue(value.property);
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromCallExpression;
/**
 * Extractor function for a CallExpression type value node.
 * A call expression looks like `bar()`
 * This will return `bar` as the value to indicate its existence,
 * since we can not execute the function bar in a static environment.
 *
 * @param - value - AST Value object with type `CallExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromCallExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  return getValue(value.callee);
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromUnaryExpression;
/**
 * Extractor function for a UnaryExpression type value node.
 * A unary expression is an expression with a unary operator.
 * For example, !"foobar" will evaluate to false, so this will return false.
 *
 * @param - value - AST Value object with type `UnaryExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromUnaryExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  var operator = value.operator,
      argument = value.argument;


  switch (operator) {
    case '-':
      return -getValue(argument);
    case '+':
      return +getValue(argument); // eslint-disable-line no-implicit-coercion
    case '!':
      return !getValue(argument);
    case '~':
      return ~getValue(argument); // eslint-disable-line no-bitwise
    case 'delete':
      // I believe delete statements evaluate to true.
      return true;
    case 'typeof':
    case 'void':
    default:
      return undefined;
  }
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromThisExpression;
/**
 * Extractor function for a ThisExpression type value node.
 * A this expression is using `this` as an identifier.
 *
 * @returns - 'this' as a string.
 */
function extractValueFromThisExpression() {
  return 'this';
}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromConditionalExpression;
/**
 * Extractor function for a ConditionalExpression type value node.
 *
 * @param - value - AST Value object with type `ConditionalExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromConditionalExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  var test = value.test,
      alternate = value.alternate,
      consequent = value.consequent;


  return getValue(test) ? getValue(consequent) : getValue(alternate);
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromBinaryExpression;
/**
 * Extractor function for a BinaryExpression type value node.
 * A binary expression has a left and right side separated by an operator
 * such as `a + b`.
 *
 * @param - value - AST Value object with type `BinaryExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromBinaryExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  var operator = value.operator,
      left = value.left,
      right = value.right;

  var leftVal = getValue(left);
  var rightVal = getValue(right);

  switch (operator) {
    case '==':
      return leftVal == rightVal; // eslint-disable-line
    case '!=':
      return leftVal != rightVal; // eslint-disable-line
    case '===':
      return leftVal === rightVal;
    case '!==':
      return leftVal !== rightVal;
    case '<':
      return leftVal < rightVal;
    case '<=':
      return leftVal <= rightVal;
    case '>':
      return leftVal > rightVal;
    case '>=':
      return leftVal >= rightVal;
    case '<<':
      return leftVal << rightVal; // eslint-disable-line no-bitwise
    case '>>':
      return leftVal >> rightVal; // eslint-disable-line no-bitwise
    case '>>>':
      return leftVal >>> rightVal; // eslint-disable-line no-bitwise
    case '+':
      return leftVal + rightVal;
    case '-':
      return leftVal - rightVal;
    case '*':
      return leftVal * rightVal;
    case '/':
      return leftVal / rightVal;
    case '%':
      return leftVal % rightVal;
    case '|':
      return leftVal | rightVal; // eslint-disable-line no-bitwise
    case '^':
      return leftVal ^ rightVal; // eslint-disable-line no-bitwise
    case '&':
      return leftVal & rightVal; // eslint-disable-line no-bitwise
    case 'in':
      try {
        return leftVal in rightVal;
      } catch (err) {
        return false;
      }
    case 'instanceof':
      if (typeof rightVal !== 'function') {
        return false;
      }
      return leftVal instanceof rightVal;
    default:
      return undefined;
  }
}

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromObjectExpression;

var _object = __webpack_require__(10);

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extractor function for an ObjectExpression type value node.
 * An object expression is using {}.
 *
 * @returns - a representation of the object
 */
function extractValueFromObjectExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  return value.properties.reduce(function (obj, property) {
    var object = (0, _object2.default)({}, obj);
    // Support types: SpreadProperty and ExperimentalSpreadProperty
    if (/^(?:Experimental)?Spread(?:Property|Element)$/.test(property.type)) {
      if (property.argument.type === 'ObjectExpression') {
        return (0, _object2.default)(object, extractValueFromObjectExpression(property.argument));
      }
    } else {
      object[getValue(property.key)] = getValue(property.value);
    }
    return object;
  }, {});
}

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromNewExpression;
/**
 * Extractor function for a NewExpression type value node.
 * A new expression instantiates an object with `new` keyword.
 *
 * @returns - an empty object.
 */
function extractValueFromNewExpression() {
  return new Object(); // eslint-disable-line
}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromUpdateExpression;
/**
 * Extractor function for an UpdateExpression type value node.
 * An update expression is an expression with an update operator.
 * For example, foo++ will evaluate to foo + 1.
 *
 * @param - value - AST Value object with type `UpdateExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromUpdateExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  var operator = value.operator,
      argument = value.argument,
      prefix = value.prefix;


  var val = getValue(argument);

  switch (operator) {
    case '++':
      return prefix ? ++val : val++; // eslint-disable-line no-plusplus
    case '--':
      return prefix ? --val : val--; // eslint-disable-line no-plusplus
    default:
      return undefined;
  }
}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromArrayExpression;
/**
 * Extractor function for an ArrayExpression type value node.
 * An array expression is an expression with [] syntax.
 *
 * @returns - An array of the extracted elements.
 */
function extractValueFromArrayExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  return value.elements.map(function (element) {
    return getValue(element);
  });
}

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromBindExpression;
/**
 * Extractor function for a BindExpression type value node.
 * A bind expression looks like `::this.foo`
 * This will return `this.foo.bind(this)` as the value to indicate its existence,
 * since we can not execute the function this.foo.bind(this) in a static environment.
 *
 * @param - value - AST Value object with type `BindExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromBindExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  var callee = getValue(value.callee);

  // If value.object === null, the callee must be a MemberExpression.
  // https://github.com/babel/babylon/blob/master/ast/spec.md#bindexpression
  var object = value.object === null ? getValue(value.callee.object) : getValue(value.object);

  if (value.object && value.object.property) {
    return object + '.' + callee + '.bind(' + object + ')';
  }

  return callee + '.bind(' + object + ')';
}

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromSpreadElement;
/**
 * Extractor function for a SpreadElement type value node.
 * We can't statically evaluate an array spread, so just return
 * undefined.
 *
 * @param - value - AST Value object with type `SpreadElement`
 * @returns - An prototypeless object.
 */
function extractValueFromSpreadElement() {
  return undefined;
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromTypeCastExpression;
/**
 * Extractor function for a TypeCastExpression type value node.
 * A type cast expression looks like `(this.handleClick: (event: MouseEvent) => void))`
 * This will return the expression `this.handleClick`.
 *
 * @param - value - AST Value object with type `TypeCastExpression`
 * @returns - The extracted value converted to correct type.
 */
function extractValueFromTypeCastExpression(value) {
  // eslint-disable-next-line global-require
  var getValue = __webpack_require__(23).default;
  return getValue(value.expression);
}

/***/ })
/******/ ]);
