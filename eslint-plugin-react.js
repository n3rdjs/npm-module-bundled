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


const fromEntries = __webpack_require__(3);
const entries = __webpack_require__(44);

const allRules = {
  'boolean-prop-naming': __webpack_require__(49),
  'button-has-type': __webpack_require__(125),
  'default-props-match-prop-types': __webpack_require__(128),
  'destructuring-assignment': __webpack_require__(129),
  'display-name': __webpack_require__(130),
  'forbid-component-props': __webpack_require__(131),
  'forbid-dom-props': __webpack_require__(132),
  'forbid-elements': __webpack_require__(133),
  'forbid-foreign-prop-types': __webpack_require__(134),
  'forbid-prop-types': __webpack_require__(135),
  'jsx-boolean-value': __webpack_require__(136),
  'jsx-child-element-spacing': __webpack_require__(137),
  'jsx-closing-bracket-location': __webpack_require__(138),
  'jsx-closing-tag-location': __webpack_require__(139),
  'jsx-curly-spacing': __webpack_require__(140),
  'jsx-curly-newline': __webpack_require__(141),
  'jsx-equals-spacing': __webpack_require__(142),
  'jsx-filename-extension': __webpack_require__(143),
  'jsx-first-prop-new-line': __webpack_require__(144),
  'jsx-handler-names': __webpack_require__(145),
  'jsx-indent': __webpack_require__(146),
  'jsx-indent-props': __webpack_require__(147),
  'jsx-key': __webpack_require__(148),
  'jsx-max-depth': __webpack_require__(150),
  'jsx-max-props-per-line': __webpack_require__(151),
  'jsx-no-bind': __webpack_require__(152),
  'jsx-no-comment-textnodes': __webpack_require__(154),
  'jsx-no-duplicate-props': __webpack_require__(155),
  'jsx-no-literals': __webpack_require__(156),
  'jsx-no-target-blank': __webpack_require__(157),
  'jsx-one-expression-per-line': __webpack_require__(159),
  'jsx-no-undef': __webpack_require__(160),
  'jsx-curly-brace-presence': __webpack_require__(161),
  'jsx-pascal-case': __webpack_require__(162),
  'jsx-fragments': __webpack_require__(163),
  'jsx-props-no-multi-spaces': __webpack_require__(164),
  'jsx-props-no-spreading': __webpack_require__(165),
  'jsx-sort-default-props': __webpack_require__(166),
  'jsx-sort-props': __webpack_require__(167),
  'jsx-space-before-closing': __webpack_require__(168),
  'jsx-tag-spacing': __webpack_require__(171),
  'jsx-uses-react': __webpack_require__(172),
  'jsx-uses-vars': __webpack_require__(173),
  'jsx-wrap-multilines': __webpack_require__(174),
  'no-access-state-in-setstate': __webpack_require__(175),
  'no-array-index-key': __webpack_require__(176),
  'no-children-prop': __webpack_require__(177),
  'no-danger': __webpack_require__(178),
  'no-danger-with-children': __webpack_require__(179),
  'no-deprecated': __webpack_require__(180),
  'no-did-mount-set-state': __webpack_require__(185),
  'no-did-update-set-state': __webpack_require__(187),
  'no-direct-mutation-state': __webpack_require__(188),
  'no-find-dom-node': __webpack_require__(189),
  'no-is-mounted': __webpack_require__(190),
  'no-multi-comp': __webpack_require__(191),
  'no-set-state': __webpack_require__(192),
  'no-string-refs': __webpack_require__(193),
  'no-redundant-should-component-update': __webpack_require__(194),
  'no-render-return-value': __webpack_require__(195),
  'no-this-in-sfc': __webpack_require__(196),
  'no-typos': __webpack_require__(197),
  'no-unescaped-entities': __webpack_require__(205),
  'no-unknown-property': __webpack_require__(206),
  'no-unsafe': __webpack_require__(207),
  'no-unused-prop-types': __webpack_require__(208),
  'no-unused-state': __webpack_require__(209),
  'no-will-update-set-state': __webpack_require__(210),
  'prefer-es6-class': __webpack_require__(211),
  'prefer-read-only-props': __webpack_require__(212),
  'prefer-stateless-function': __webpack_require__(213),
  'prop-types': __webpack_require__(214),
  'react-in-jsx-scope': __webpack_require__(215),
  'require-default-props': __webpack_require__(216),
  'require-optimization': __webpack_require__(217),
  'require-render-return': __webpack_require__(218),
  'self-closing-comp': __webpack_require__(219),
  'sort-comp': __webpack_require__(220),
  'sort-prop-types': __webpack_require__(221),
  'state-in-constructor': __webpack_require__(222),
  'static-property-placement': __webpack_require__(223),
  'style-prop-object': __webpack_require__(224),
  'void-dom-elements-no-children': __webpack_require__(225)
};

function filterRules(rules, predicate) {
  return fromEntries(entries(rules).filter(entry => predicate(entry[1])));
}

function configureAsError(rules) {
  return fromEntries(Object.keys(rules).map(key => [`react/${key}`, 2]));
}

const activeRules = filterRules(allRules, rule => !rule.meta.deprecated);
const activeRulesConfig = configureAsError(activeRules);

const deprecatedRules = filterRules(allRules, rule => rule.meta.deprecated);

module.exports = {
  deprecatedRules,
  rules: allRules,
  configs: {
    recommended: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: {
        'react/display-name': 2,
        'react/jsx-key': 2,
        'react/jsx-no-comment-textnodes': 2,
        'react/jsx-no-duplicate-props': 2,
        'react/jsx-no-target-blank': 2,
        'react/jsx-no-undef': 2,
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
        'react/no-children-prop': 2,
        'react/no-danger-with-children': 2,
        'react/no-deprecated': 2,
        'react/no-direct-mutation-state': 2,
        'react/no-find-dom-node': 2,
        'react/no-is-mounted': 2,
        'react/no-render-return-value': 2,
        'react/no-string-refs': 2,
        'react/no-unescaped-entities': 2,
        'react/no-unknown-property': 2,
        'react/no-unsafe': 0,
        'react/prop-types': 2,
        'react/react-in-jsx-scope': 2,
        'react/require-render-return': 2
      }
    },
    all: {
      plugins: [
        'react'
      ],
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      rules: activeRulesConfig
    }
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(4);

var implementation = __webpack_require__(8);
var getPolyfill = __webpack_require__(42);
var shim = __webpack_require__(43);

var polyfill = getPolyfill();

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__(5);
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__(6);

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__(7);

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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__(6); // eslint-disable-line global-require
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(9);

var ThrowCompletion = function Throw(error) {
	throw error;
};

var legacyAssign = function assign(obj, entries) {
	for (var i = 0; i < entries.length; ++i) {
		var entry = entries[i];
		if (ES.Type(entry) !== 'Object') {
			throw new TypeError('iterator returned a non-object; entry expected');
		}

		var key = ES.Get(entry, '0');
		var value = ES.Get(entry, '1');
		var propertyKey = ES.ToPropertyKey(key);
		ES.CreateDataPropertyOrThrow(obj, propertyKey, value);
	}
};

/* global Symbol */

var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

module.exports = function fromEntries(iterable) {
	ES.RequireObjectCoercible(iterable);

	var obj = {};

	// this part isn't in the spec, it's for a reasonable fallback for pre-ES6 environments
	if (!hasSymbols) {
		if (!ES.IsArray(iterable)) {
			throw new TypeError('this environment lacks native Symbols, and can not support non-Array iterables');
		}
		legacyAssign(obj, iterable);
		return obj;
	}

	/*
	return ES.AddEntriesFromIterable(obj, iterable, ES.CreateBuiltinFunction('CreateDataPropertyOnObject'));
	function adder(key, value) {
		var O = this;
		var propertyKey = ES.ToPropertyKey(key);
		CreateDataPropertyOrThrow(O, propertyKey, value);
	}
	*/

	var iter = ES.GetIterator(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = ES.IteratorStep(iter);
		if (next === false) {
			return obj;
		}

		var nextItem = ES.IteratorValue(next);
		if (ES.Type(nextItem) !== 'Object') {
			var error = new TypeError('iterator returned a non-object; entry expected');
			return ES.IteratorClose(iter, ThrowCompletion(error));
		}

		try {
			var key = ES.Get(nextItem, '0');
			var value = ES.Get(nextItem, '1');
			var propertyKey = ES.ToPropertyKey(key);
			ES.CreateDataPropertyOrThrow(obj, propertyKey, value);
		} catch (e) {
			return ES.IteratorClose(iter, ThrowCompletion(e));
		}
	}
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(10);

var ES2016 = __webpack_require__(11);
var assign = __webpack_require__(30);
var forEach = __webpack_require__(34);
var callBind = __webpack_require__(38);

var $TypeError = GetIntrinsic('%TypeError%');
var $Array = GetIntrinsic('%Array%');
var $isEnumerable = callBind(GetIntrinsic('%ObjectPrototype%').propertyIsEnumerable);
var $pushApply = callBind.apply(GetIntrinsic('%ArrayPrototype%').push);
var $arrayPush = callBind($Array.prototype.push);

var ES2017 = assign(assign({}, ES2016), {
	ToIndex: function ToIndex(value) {
		if (typeof value === 'undefined') {
			return 0;
		}
		var integerIndex = this.ToInteger(value);
		if (integerIndex < 0) {
			throw new RangeError('index must be >= 0');
		}
		var index = this.ToLength(integerIndex);
		if (!this.SameValueZero(integerIndex, index)) {
			throw new RangeError('index must be >= 0 and < 2 ** 53 - 1');
		}
		return index;
	},

	// https://www.ecma-international.org/ecma-262/8.0/#sec-enumerableownproperties
	EnumerableOwnProperties: function EnumerableOwnProperties(O, kind) {
		var keys = ES2016.EnumerableOwnNames(O);
		if (kind === 'key') {
			return keys;
		}
		if (kind === 'value' || kind === 'key+value') {
			var results = [];
			forEach(keys, function (key) {
				if ($isEnumerable(O, key)) {
					$pushApply(results, [
						kind === 'value' ? O[key] : [key, O[key]]
					]);
				}
			});
			return results;
		}
		throw new $TypeError('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
	},

	// https://www.ecma-international.org/ecma-262/8.0/#sec-iterabletolist
	IterableToList: function IterableToList(items, method) {
		var iterator = this.GetIterator(items, method);
		var values = [];
		var next = true;
		while (next) {
			next = this.IteratorStep(iterator);
			if (next) {
				var nextValue = this.IteratorValue(next);
				$arrayPush(values, nextValue);
			}
		}
		return values;
	}
});

delete ES2017.EnumerableOwnNames; // replaced with EnumerableOwnProperties
delete ES2017.IterableToArrayLike; // replaced with IterableToList

module.exports = ES2017;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined; // eslint-disable-line no-shadow-restricted-names

var ThrowTypeError = Object.getOwnPropertyDescriptor
	? (function () { return Object.getOwnPropertyDescriptor(arguments, 'callee').get; }())
	: function () { throw new TypeError(); };

var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'$ %Array%': Array,
	'$ %ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'$ %ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'$ %ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'$ %ArrayPrototype%': Array.prototype,
	'$ %ArrayProto_entries%': Array.prototype.entries,
	'$ %ArrayProto_forEach%': Array.prototype.forEach,
	'$ %ArrayProto_keys%': Array.prototype.keys,
	'$ %ArrayProto_values%': Array.prototype.values,
	'$ %AsyncFromSyncIteratorPrototype%': undefined,
	'$ %AsyncFunction%': asyncFunction,
	'$ %AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'$ %AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'$ %AsyncGeneratorFunction%': asyncGenFunction,
	'$ %AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'$ %AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'$ %Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'$ %Boolean%': Boolean,
	'$ %BooleanPrototype%': Boolean.prototype,
	'$ %DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'$ %DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'$ %Date%': Date,
	'$ %DatePrototype%': Date.prototype,
	'$ %decodeURI%': decodeURI,
	'$ %decodeURIComponent%': decodeURIComponent,
	'$ %encodeURI%': encodeURI,
	'$ %encodeURIComponent%': encodeURIComponent,
	'$ %Error%': Error,
	'$ %ErrorPrototype%': Error.prototype,
	'$ %eval%': eval, // eslint-disable-line no-eval
	'$ %EvalError%': EvalError,
	'$ %EvalErrorPrototype%': EvalError.prototype,
	'$ %Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'$ %Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'$ %Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'$ %Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'$ %Function%': Function,
	'$ %FunctionPrototype%': Function.prototype,
	'$ %Generator%': generator ? getProto(generator()) : undefined,
	'$ %GeneratorFunction%': generatorFunction,
	'$ %GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'$ %Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'$ %Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'$ %Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'$ %Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'$ %Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'$ %isFinite%': isFinite,
	'$ %isNaN%': isNaN,
	'$ %IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'$ %JSON%': JSON,
	'$ %JSONParse%': JSON.parse,
	'$ %Map%': typeof Map === 'undefined' ? undefined : Map,
	'$ %MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'$ %MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'$ %Math%': Math,
	'$ %Number%': Number,
	'$ %NumberPrototype%': Number.prototype,
	'$ %Object%': Object,
	'$ %ObjectPrototype%': Object.prototype,
	'$ %ObjProto_toString%': Object.prototype.toString,
	'$ %ObjProto_valueOf%': Object.prototype.valueOf,
	'$ %parseFloat%': parseFloat,
	'$ %parseInt%': parseInt,
	'$ %Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'$ %PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'$ %PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'$ %Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'$ %Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'$ %Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'$ %Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'$ %RangeError%': RangeError,
	'$ %RangeErrorPrototype%': RangeError.prototype,
	'$ %ReferenceError%': ReferenceError,
	'$ %ReferenceErrorPrototype%': ReferenceError.prototype,
	'$ %Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'$ %RegExp%': RegExp,
	'$ %RegExpPrototype%': RegExp.prototype,
	'$ %Set%': typeof Set === 'undefined' ? undefined : Set,
	'$ %SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'$ %SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'$ %SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'$ %SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'$ %String%': String,
	'$ %StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'$ %StringPrototype%': String.prototype,
	'$ %Symbol%': hasSymbols ? Symbol : undefined,
	'$ %SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'$ %SyntaxError%': SyntaxError,
	'$ %SyntaxErrorPrototype%': SyntaxError.prototype,
	'$ %ThrowTypeError%': ThrowTypeError,
	'$ %TypedArray%': TypedArray,
	'$ %TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'$ %TypeError%': TypeError,
	'$ %TypeErrorPrototype%': TypeError.prototype,
	'$ %Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'$ %Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'$ %Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'$ %Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'$ %Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'$ %Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'$ %Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'$ %Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'$ %URIError%': URIError,
	'$ %URIErrorPrototype%': URIError.prototype,
	'$ %WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'$ %WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'$ %WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'$ %WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var key = '$ ' + name;
	if (!(key in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[key] === 'undefined' && !allowMissing) {
		throw new TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}
	return INTRINSICS[key];
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(10);

var $Array = GetIntrinsic('%Array%');

var hasSymbols = __webpack_require__(12)();

var ES2015 = __webpack_require__(14);
var assign = __webpack_require__(30);
var callBind = __webpack_require__(38);

var $arrayPush = callBind($Array.prototype.push);
var $arraySlice = callBind($Array.prototype.slice);
var $arrayJoin = callBind($Array.prototype.join);

var ES2016 = assign(assign({}, ES2015), {
	// https://www.ecma-international.org/ecma-262/7.0/#sec-samevaluenonnumber
	SameValueNonNumber: function SameValueNonNumber(x, y) {
		if (typeof x === 'number' || typeof x !== typeof y) {
			throw new TypeError('SameValueNonNumber requires two non-number values of the same type.');
		}
		return this.SameValue(x, y);
	},

	// https://www.ecma-international.org/ecma-262/7.0/#sec-iterabletoarraylike
	IterableToArrayLike: function IterableToArrayLike(items) {
		var usingIterator;
		if (hasSymbols) {
			usingIterator = this.GetMethod(items, Symbol.iterator);
		} else if (this.IsArray(items)) {
			usingIterator = function () {
				var i = -1;
				var arr = this; // eslint-disable-line no-invalid-this
				return {
					next: function () {
						i += 1;
						return {
							done: i >= arr.length,
							value: arr[i]
						};
					}
				};
			};
		} else if (this.Type(items) === 'String') {
			var ES = this;
			usingIterator = function () {
				var i = 0;
				return {
					next: function () {
						var nextIndex = ES.AdvanceStringIndex(items, i, true);
						var value = $arrayJoin($arraySlice(items, i, nextIndex), '');
						i = nextIndex;
						return {
							done: nextIndex > items.length,
							value: value
						};
					}
				};
			};
		}
		if (typeof usingIterator !== 'undefined') {
			var iterator = this.GetIterator(items, usingIterator);
			var values = [];
			var next = true;
			while (next) {
				next = this.IteratorStep(iterator);
				if (next) {
					var nextValue = this.IteratorValue(next);
					$arrayPush(values, nextValue);
				}
			}
			return values;
		}

		return this.ToObject(items);
	}
});

module.exports = ES2016;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__(13);

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};


/***/ }),
/* 13 */
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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(15);
var toPrimitive = __webpack_require__(18);
var keys = __webpack_require__(5);
var inspect = __webpack_require__(24);

var GetIntrinsic = __webpack_require__(10);

var $TypeError = GetIntrinsic('%TypeError%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $Array = GetIntrinsic('%Array%');
var $ArrayPrototype = $Array.prototype;
var $String = GetIntrinsic('%String%');
var $Object = GetIntrinsic('%Object%');
var $Number = GetIntrinsic('%Number%');
var $Symbol = GetIntrinsic('%Symbol%', true);
var $RegExp = GetIntrinsic('%RegExp%');
var $Promise = GetIntrinsic('%Promise%', true);
var $preventExtensions = $Object.preventExtensions;

var hasSymbols = __webpack_require__(12)();

var assertRecord = __webpack_require__(27);
var $isNaN = __webpack_require__(28);
var $isFinite = __webpack_require__(29);
var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;
var MAX_SAFE_INTEGER = $Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;

var assign = __webpack_require__(30);
var sign = __webpack_require__(31);
var mod = __webpack_require__(32);
var isPrimitive = __webpack_require__(33);
var forEach = __webpack_require__(34);
var every = __webpack_require__(35);
var isSamePropertyDescriptor = __webpack_require__(36);
var isPropertyDescriptor = __webpack_require__(37);
var parseInteger = parseInt;
var callBind = __webpack_require__(38);
var $PromiseThen = $Promise ? callBind(GetIntrinsic('%PromiseProto_then%')) : null;
var arraySlice = callBind($Array.prototype.slice);
var strSlice = callBind($String.prototype.slice);
var isBinary = callBind($RegExp.prototype.test, /^0b[01]+$/i);
var isOctal = callBind($RegExp.prototype.test, /^0o[0-7]+$/i);
var isDigit = callBind($RegExp.prototype.test, /^[0-9]$/);
var regexExec = callBind($RegExp.prototype.exec);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = callBind($RegExp.prototype.test, nonWSregex);
var invalidHexLiteral = /^[-+]0x[0-9a-f]+$/i;
var isInvalidHexLiteral = callBind($RegExp.prototype.test, invalidHexLiteral);
var $charCodeAt = callBind($String.prototype.charCodeAt);
var $isEnumerable = callBind($Object.prototype.propertyIsEnumerable);

var toStr = callBind($Object.prototype.toString);

var $NumberValueOf = callBind(GetIntrinsic('%NumberPrototype%').valueOf);
var $BooleanValueOf = callBind(GetIntrinsic('%BooleanPrototype%').valueOf);
var $StringValueOf = callBind(GetIntrinsic('%StringPrototype%').valueOf);
var $DateValueOf = callBind(GetIntrinsic('%DatePrototype%').valueOf);
var $SymbolToString = hasSymbols && callBind(GetIntrinsic('%SymbolPrototype%').toString);

var $floor = Math.floor;
var $abs = Math.abs;

var $ObjectCreate = $Object.create;
var $gOPD = $Object.getOwnPropertyDescriptor;
var $gOPN = $Object.getOwnPropertyNames;
var $gOPS = $Object.getOwnPropertySymbols;
var $isExtensible = $Object.isExtensible;
var $defineProperty = $Object.defineProperty;
var $setProto = Object.setPrototypeOf || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== Array.prototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto
			return O;
		}
);

var DefineOwnProperty = function DefineOwnProperty(ES, O, P, desc) {
	if (!$defineProperty) {
		if (!ES.IsDataDescriptor(desc)) {
			// ES3 does not support getters/setters
			return false;
		}
		if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
			return false;
		}

		// fallback for ES3
		if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
			// a non-enumerable existing property
			return false;
		}

		// property does not exist at all, or exists but is enumerable
		var V = desc['[[Value]]'];
		O[P] = V; // will use [[Define]]
		return ES.SameValue(O[P], V);
	}
	$defineProperty(O, P, ES.FromPropertyDescriptor(desc));
	return true;
};

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBind($String.prototype.replace);
var trim = function (value) {
	return $replace(value, trimRegex, '');
};

var ES5 = __webpack_require__(39);

var hasRegExpMatcher = __webpack_require__(41);

// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
var ES6 = assign(assign({}, ES5), {

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
	Call: function Call(F, V) {
		var args = arguments.length > 2 ? arguments[2] : [];
		if (!this.IsCallable(F)) {
			throw new $TypeError(inspect(F) + ' is not a function');
		}
		return F.apply(V, args);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
	ToPrimitive: toPrimitive,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
	// ToBoolean: ES5.ToBoolean,

	// https://ecma-international.org/ecma-262/6.0/#sec-tonumber
	ToNumber: function ToNumber(argument) {
		var value = isPrimitive(argument) ? argument : toPrimitive(argument, $Number);
		if (typeof value === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a number');
		}
		if (typeof value === 'string') {
			if (isBinary(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 2));
			} else if (isOctal(value)) {
				return this.ToNumber(parseInteger(strSlice(value, 2), 8));
			} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
				return NaN;
			} else {
				var trimmed = trim(value);
				if (trimmed !== value) {
					return this.ToNumber(trimmed);
				}
			}
		}
		return $Number(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
	// ToInteger: ES5.ToNumber,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
	// ToInt32: ES5.ToInt32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
	// ToUint32: ES5.ToUint32,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
	ToInt16: function ToInt16(argument) {
		var int16bit = this.ToUint16(argument);
		return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
	// ToUint16: ES5.ToUint16,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
	ToInt8: function ToInt8(argument) {
		var int8bit = this.ToUint8(argument);
		return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
	ToUint8: function ToUint8(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * $floor($abs(number));
		return mod(posInt, 0x100);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
	ToUint8Clamp: function ToUint8Clamp(argument) {
		var number = this.ToNumber(argument);
		if ($isNaN(number) || number <= 0) { return 0; }
		if (number >= 0xFF) { return 0xFF; }
		var f = $floor(argument);
		if (f + 0.5 < number) { return f + 1; }
		if (number < f + 0.5) { return f; }
		if (f % 2 !== 0) { return f + 1; }
		return f;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
	ToString: function ToString(argument) {
		if (typeof argument === 'symbol') {
			throw new $TypeError('Cannot convert a Symbol value to a string');
		}
		return $String(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
	ToObject: function ToObject(value) {
		this.RequireObjectCoercible(value);
		return $Object(value);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
	ToPropertyKey: function ToPropertyKey(argument) {
		var key = this.ToPrimitive(argument, $String);
		return typeof key === 'symbol' ? key : this.ToString(key);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
	ToLength: function ToLength(argument) {
		var len = this.ToInteger(argument);
		if (len <= 0) { return 0; } // includes converting -0 to +0
		if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
		return len;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
	CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
		if (toStr(argument) !== '[object String]') {
			throw new $TypeError('must be a string');
		}
		if (argument === '-0') { return -0; }
		var n = this.ToNumber(argument);
		if (this.SameValue(this.ToString(n), argument)) { return n; }
		return void 0;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
	RequireObjectCoercible: ES5.CheckObjectCoercible,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
	IsArray: $Array.isArray || function IsArray(argument) {
		return toStr(argument) === '[object Array]';
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
	// IsCallable: ES5.IsCallable,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
	IsConstructor: function IsConstructor(argument) {
		return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
	IsExtensible: $preventExtensions
		? function IsExtensible(obj) {
			if (isPrimitive(obj)) {
				return false;
			}
			return $isExtensible(obj);
		}
		: function isExtensible(obj) { return true; }, // eslint-disable-line no-unused-vars

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
	IsInteger: function IsInteger(argument) {
		if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
			return false;
		}
		var abs = $abs(argument);
		return $floor(abs) === abs;
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
	IsPropertyKey: function IsPropertyKey(argument) {
		return typeof argument === 'string' || typeof argument === 'symbol';
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isregexp
	IsRegExp: function IsRegExp(argument) {
		if (!argument || typeof argument !== 'object') {
			return false;
		}
		if (hasSymbols) {
			var isRegExp = argument[$Symbol.match];
			if (typeof isRegExp !== 'undefined') {
				return ES5.ToBoolean(isRegExp);
			}
		}
		return hasRegExpMatcher(argument);
	},

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
	// SameValue: ES5.SameValue,

	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
	SameValueZero: function SameValueZero(x, y) {
		return (x === y) || ($isNaN(x) && $isNaN(y));
	},

	/**
	 * 7.3.2 GetV (V, P)
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let O be ToObject(V).
	 * 3. ReturnIfAbrupt(O).
	 * 4. Return O.[[Get]](P, V).
	 */
	GetV: function GetV(V, P) {
		// 7.3.2.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.2.2-3
		var O = this.ToObject(V);

		// 7.3.2.4
		return O[P];
	},

	/**
	 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
	 * 1. Assert: IsPropertyKey(P) is true.
	 * 2. Let func be GetV(O, P).
	 * 3. ReturnIfAbrupt(func).
	 * 4. If func is either undefined or null, return undefined.
	 * 5. If IsCallable(func) is false, throw a TypeError exception.
	 * 6. Return func.
	 */
	GetMethod: function GetMethod(O, P) {
		// 7.3.9.1
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		// 7.3.9.2
		var func = this.GetV(O, P);

		// 7.3.9.4
		if (func == null) {
			return void 0;
		}

		// 7.3.9.5
		if (!this.IsCallable(func)) {
			throw new $TypeError(P + 'is not a function');
		}

		// 7.3.9.6
		return func;
	},

	/**
	 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
	 * 1. Assert: Type(O) is Object.
	 * 2. Assert: IsPropertyKey(P) is true.
	 * 3. Return O.[[Get]](P, O).
	 */
	Get: function Get(O, P) {
		// 7.3.1.1
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		// 7.3.1.2
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
		}
		// 7.3.1.3
		return O[P];
	},

	Type: function Type(x) {
		if (typeof x === 'symbol') {
			return 'Symbol';
		}
		return ES5.Type(x);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
	SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		var C = O.constructor;
		if (typeof C === 'undefined') {
			return defaultConstructor;
		}
		if (this.Type(C) !== 'Object') {
			throw new $TypeError('O.constructor is not an Object');
		}
		var S = hasSymbols && $Symbol.species ? C[$Symbol.species] : void 0;
		if (S == null) {
			return defaultConstructor;
		}
		if (this.IsConstructor(S)) {
			return S;
		}
		throw new $TypeError('no constructor found');
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		var obj = {};
		if ('[[Value]]' in Desc) {
			obj.value = Desc['[[Value]]'];
		}
		if ('[[Writable]]' in Desc) {
			obj.writable = Desc['[[Writable]]'];
		}
		if ('[[Get]]' in Desc) {
			obj.get = Desc['[[Get]]'];
		}
		if ('[[Set]]' in Desc) {
			obj.set = Desc['[[Set]]'];
		}
		if ('[[Enumerable]]' in Desc) {
			obj.enumerable = Desc['[[Enumerable]]'];
		}
		if ('[[Configurable]]' in Desc) {
			obj.configurable = Desc['[[Configurable]]'];
		}
		return obj;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor
	CompletePropertyDescriptor: function CompletePropertyDescriptor(Desc) {
		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
			if (!has(Desc, '[[Value]]')) {
				Desc['[[Value]]'] = void 0;
			}
			if (!has(Desc, '[[Writable]]')) {
				Desc['[[Writable]]'] = false;
			}
		} else {
			if (!has(Desc, '[[Get]]')) {
				Desc['[[Get]]'] = void 0;
			}
			if (!has(Desc, '[[Set]]')) {
				Desc['[[Set]]'] = void 0;
			}
		}
		if (!has(Desc, '[[Enumerable]]')) {
			Desc['[[Enumerable]]'] = false;
		}
		if (!has(Desc, '[[Configurable]]')) {
			Desc['[[Configurable]]'] = false;
		}
		return Desc;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw
	Set: function Set(O, P, V, Throw) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		if (this.Type(Throw) !== 'Boolean') {
			throw new $TypeError('Throw must be a Boolean');
		}
		if (Throw) {
			O[P] = V;
			return true;
		} else {
			try {
				O[P] = V;
			} catch (e) {
				return false;
			}
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty
	HasOwnProperty: function HasOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return has(O, P);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty
	HasProperty: function HasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		return P in O;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable
	IsConcatSpreadable: function IsConcatSpreadable(O) {
		if (this.Type(O) !== 'Object') {
			return false;
		}
		if (hasSymbols && typeof $Symbol.isConcatSpreadable === 'symbol') {
			var spreadable = this.Get(O, Symbol.isConcatSpreadable);
			if (typeof spreadable !== 'undefined') {
				return this.ToBoolean(spreadable);
			}
		}
		return this.IsArray(O);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-invoke
	Invoke: function Invoke(O, P) {
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('P must be a Property Key');
		}
		var argumentsList = arraySlice(arguments, 2);
		var func = this.GetV(O, P);
		return this.Call(func, O, argumentsList);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-getiterator
	GetIterator: function GetIterator(obj, method) {
		var actualMethod = method;
		if (arguments.length < 2) {
			if (!hasSymbols) {
				throw new SyntaxError('GetIterator depends on native Symbol support when `method` is not passed');
			}
			actualMethod = this.GetMethod(obj, $Symbol.iterator);
		}
		var iterator = this.Call(actualMethod, obj);
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('iterator must return an object');
		}

		return iterator;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext
	IteratorNext: function IteratorNext(iterator, value) {
		var result = this.Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
		if (this.Type(result) !== 'Object') {
			throw new $TypeError('iterator next must return an object');
		}
		return result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete
	IteratorComplete: function IteratorComplete(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.ToBoolean(this.Get(iterResult, 'done'));
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue
	IteratorValue: function IteratorValue(iterResult) {
		if (this.Type(iterResult) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
		}
		return this.Get(iterResult, 'value');
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep
	IteratorStep: function IteratorStep(iterator) {
		var result = this.IteratorNext(iterator);
		var done = this.IteratorComplete(result);
		return done === true ? false : result;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose
	IteratorClose: function IteratorClose(iterator, completion) {
		if (this.Type(iterator) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(iterator) is not Object');
		}
		if (!this.IsCallable(completion)) {
			throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
		}
		var completionThunk = completion;

		var iteratorReturn = this.GetMethod(iterator, 'return');

		if (typeof iteratorReturn === 'undefined') {
			return completionThunk();
		}

		var completionRecord;
		try {
			var innerResult = this.Call(iteratorReturn, iterator, []);
		} catch (e) {
			// if we hit here, then "e" is the innerResult completion that needs re-throwing

			// if the completion is of type "throw", this will throw.
			completionRecord = completionThunk();
			completionThunk = null; // ensure it's not called twice.

			// if not, then return the innerResult completion
			throw e;
		}
		completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
		completionThunk = null; // ensure it's not called twice.

		if (this.Type(innerResult) !== 'Object') {
			throw new $TypeError('iterator .return must return an object');
		}

		return completionRecord;
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject
	CreateIterResultObject: function CreateIterResultObject(value, done) {
		if (this.Type(done) !== 'Boolean') {
			throw new $TypeError('Assertion failed: Type(done) is not Boolean');
		}
		return {
			value: value,
			done: done
		};
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec
	RegExpExec: function RegExpExec(R, S) {
		if (this.Type(R) !== 'Object') {
			throw new $TypeError('R must be an Object');
		}
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		var exec = this.Get(R, 'exec');
		if (this.IsCallable(exec)) {
			var result = this.Call(exec, R, [S]);
			if (result === null || this.Type(result) === 'Object') {
				return result;
			}
			throw new $TypeError('"exec" method must return `null` or an Object');
		}
		return regexExec(R, S);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate
	ArraySpeciesCreate: function ArraySpeciesCreate(originalArray, length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0');
		}
		var len = length === 0 ? 0 : length;
		var C;
		var isArray = this.IsArray(originalArray);
		if (isArray) {
			C = this.Get(originalArray, 'constructor');
			// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
			// if (this.IsConstructor(C)) {
			// 	if C is another realm's Array, C = undefined
			// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
			// }
			if (this.Type(C) === 'Object' && hasSymbols && $Symbol.species) {
				C = this.Get(C, $Symbol.species);
				if (C === null) {
					C = void 0;
				}
			}
		}
		if (typeof C === 'undefined') {
			return $Array(len);
		}
		if (!this.IsConstructor(C)) {
			throw new $TypeError('C must be a constructor');
		}
		return new C(len); // this.Construct(C, len);
	},

	CreateDataProperty: function CreateDataProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var oldDesc = $gOPD(O, P);
		var extensible = oldDesc || this.IsExtensible(O);
		var immutable = oldDesc && (!oldDesc.writable || !oldDesc.configurable);
		if (immutable || !extensible) {
			return false;
		}
		return DefineOwnProperty(this, O, P, {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		});
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow
	CreateDataPropertyOrThrow: function CreateDataPropertyOrThrow(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}
		var success = this.CreateDataProperty(O, P, V);
		if (!success) {
			throw new $TypeError('unable to create data property');
		}
		return success;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-objectcreate
	ObjectCreate: function ObjectCreate(proto, internalSlotsList) {
		if (proto !== null && this.Type(proto) !== 'Object') {
			throw new $TypeError('Assertion failed: proto must be null or an object');
		}
		var slots = arguments.length < 2 ? [] : internalSlotsList;
		if (slots.length > 0) {
			throw new $SyntaxError('es-abstract does not yet support internal slots');
		}

		if (proto === null && !$ObjectCreate) {
			throw new $SyntaxError('native Object.create support is required to create null objects');
		}

		return $ObjectCreate(proto);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex
	AdvanceStringIndex: function AdvanceStringIndex(S, index, unicode) {
		if (this.Type(S) !== 'String') {
			throw new $TypeError('S must be a String');
		}
		if (!this.IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
			throw new $TypeError('Assertion failed: length must be an integer >= 0 and <= 2**53');
		}
		if (this.Type(unicode) !== 'Boolean') {
			throw new $TypeError('Assertion failed: unicode must be a Boolean');
		}
		if (!unicode) {
			return index + 1;
		}
		var length = S.length;
		if ((index + 1) >= length) {
			return index + 1;
		}

		var first = $charCodeAt(S, index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}

		var second = $charCodeAt(S, index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}

		return index + 2;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-createmethodproperty
	CreateMethodProperty: function CreateMethodProperty(O, P, V) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}

		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		var newDesc = {
			'[[Configurable]]': true,
			'[[Enumerable]]': false,
			'[[Value]]': V,
			'[[Writable]]': true
		};
		return DefineOwnProperty(this, O, P, newDesc);
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow
	DefinePropertyOrThrow: function DefinePropertyOrThrow(O, P, desc) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}

		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		var Desc = isPropertyDescriptor(this, desc) ? desc : this.ToPropertyDescriptor(desc);
		if (!isPropertyDescriptor(this, Desc)) {
			throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
		}

		return DefineOwnProperty(this, O, P, Desc);
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow
	DeletePropertyOrThrow: function DeletePropertyOrThrow(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}

		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
		}

		var success = delete O[P];
		if (!success) {
			throw new TypeError('Attempt to delete property failed.');
		}
		return success;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-enumerableownnames
	EnumerableOwnNames: function EnumerableOwnNames(O) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}

		return keys(O);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object
	thisNumberValue: function thisNumberValue(value) {
		if (this.Type(value) === 'Number') {
			return value;
		}

		return $NumberValueOf(value);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object
	thisBooleanValue: function thisBooleanValue(value) {
		if (this.Type(value) === 'Boolean') {
			return value;
		}

		return $BooleanValueOf(value);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object
	thisStringValue: function thisStringValue(value) {
		if (this.Type(value) === 'String') {
			return value;
		}

		return $StringValueOf(value);
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object
	thisTimeValue: function thisTimeValue(value) {
		return $DateValueOf(value);
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-setintegritylevel
	SetIntegrityLevel: function SetIntegrityLevel(O, level) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (level !== 'sealed' && level !== 'frozen') {
			throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
		}
		if (!$preventExtensions) {
			throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
		}
		var status = $preventExtensions(O);
		if (!status) {
			return false;
		}
		if (!$gOPN) {
			throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
		}
		var theKeys = $gOPN(O);
		var ES = this;
		if (level === 'sealed') {
			forEach(theKeys, function (k) {
				ES.DefinePropertyOrThrow(O, k, { configurable: false });
			});
		} else if (level === 'frozen') {
			forEach(theKeys, function (k) {
				var currentDesc = $gOPD(O, k);
				if (typeof currentDesc !== 'undefined') {
					var desc;
					if (ES.IsAccessorDescriptor(ES.ToPropertyDescriptor(currentDesc))) {
						desc = { configurable: false };
					} else {
						desc = { configurable: false, writable: false };
					}
					ES.DefinePropertyOrThrow(O, k, desc);
				}
			});
		}
		return true;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-testintegritylevel
	TestIntegrityLevel: function TestIntegrityLevel(O, level) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (level !== 'sealed' && level !== 'frozen') {
			throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
		}
		var status = this.IsExtensible(O);
		if (status) {
			return false;
		}
		var theKeys = $gOPN(O);
		var ES = this;
		return theKeys.length === 0 || every(theKeys, function (k) {
			var currentDesc = $gOPD(O, k);
			if (typeof currentDesc !== 'undefined') {
				if (currentDesc.configurable) {
					return false;
				}
				if (level === 'frozen' && ES.IsDataDescriptor(ES.ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
					return false;
				}
			}
			return true;
		});
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance
	OrdinaryHasInstance: function OrdinaryHasInstance(C, O) {
		if (this.IsCallable(C) === false) {
			return false;
		}
		if (this.Type(O) !== 'Object') {
			return false;
		}
		var P = this.Get(C, 'prototype');
		if (this.Type(P) !== 'Object') {
			throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
		}
		return O instanceof C;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty
	OrdinaryHasProperty: function OrdinaryHasProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: P must be a Property Key');
		}
		return P in O;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-instanceofoperator
	InstanceofOperator: function InstanceofOperator(O, C) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		var instOfHandler = hasSymbols && $Symbol.hasInstance ? this.GetMethod(C, $Symbol.hasInstance) : void 0;
		if (typeof instOfHandler !== 'undefined') {
			return this.ToBoolean(this.Call(instOfHandler, C, [O]));
		}
		if (!this.IsCallable(C)) {
			throw new $TypeError('`C` is not Callable');
		}
		return this.OrdinaryHasInstance(C, O);
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-ispromise
	IsPromise: function IsPromise(x) {
		if (this.Type(x) !== 'Object') {
			return false;
		}
		if (!$Promise) { // Promises are not supported
			return false;
		}
		try {
			$PromiseThen(x); // throws if not a promise
		} catch (e) {
			return false;
		}
		return true;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison
	'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType === yType) {
			return x === y; // ES6+ specified this shortcut anyways.
		}
		if (x == null && y == null) {
			return true;
		}
		if (xType === 'Number' && yType === 'String') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if (xType === 'String' && yType === 'Number') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (xType === 'Boolean') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (yType === 'Boolean') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
			return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
		}
		if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
			return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
		}
		return false;
	},

	// eslint-disable-next-line max-lines-per-function, max-statements, id-length, max-params
	ValidateAndApplyPropertyDescriptor: function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
		// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
		var oType = this.Type(O);
		if (oType !== 'Undefined' && oType !== 'Object') {
			throw new $TypeError('Assertion failed: O must be undefined or an Object');
		}
		if (this.Type(extensible) !== 'Boolean') {
			throw new $TypeError('Assertion failed: extensible must be a Boolean');
		}
		if (!isPropertyDescriptor(this, Desc)) {
			throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
		}
		if (this.Type(current) !== 'Undefined' && !isPropertyDescriptor(this, current)) {
			throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
		}
		if (oType !== 'Undefined' && !this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
		}
		if (this.Type(current) === 'Undefined') {
			if (!extensible) {
				return false;
			}
			if (this.IsGenericDescriptor(Desc) || this.IsDataDescriptor(Desc)) {
				if (oType !== 'Undefined') {
					DefineOwnProperty(this, O, P, {
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					});
				}
			} else {
				if (!this.IsAccessorDescriptor(Desc)) {
					throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
				}
				if (oType !== 'Undefined') {
					return DefineOwnProperty(this, O, P, Desc);
				}
			}
			return true;
		}
		if (this.IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
			return true;
		}
		if (isSamePropertyDescriptor(this, Desc, current)) {
			return true; // removed by ES2017, but should still be correct
		}
		// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
		if (!current['[[Configurable]]']) {
			if (Desc['[[Configurable]]']) {
				return false;
			}
			if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
				return false;
			}
		}
		if (this.IsGenericDescriptor(Desc)) {
			// no further validation is required.
		} else if (this.IsDataDescriptor(current) !== this.IsDataDescriptor(Desc)) {
			if (!current['[[Configurable]]']) {
				return false;
			}
			if (this.IsDataDescriptor(current)) {
				if (oType !== 'Undefined') {
					DefineOwnProperty(this, O, P, {
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					});
				}
			} else if (oType !== 'Undefined') {
				DefineOwnProperty(this, O, P, {
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				});
			}
		} else if (this.IsDataDescriptor(current) && this.IsDataDescriptor(Desc)) {
			if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
				if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
					return false;
				}
				if ('[[Value]]' in Desc && !this.SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
					return false;
				}
				return true;
			}
		} else if (this.IsAccessorDescriptor(current) && this.IsAccessorDescriptor(Desc)) {
			if (!current['[[Configurable]]']) {
				if ('[[Set]]' in Desc && !this.SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
					return false;
				}
				if ('[[Get]]' in Desc && !this.SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
					return false;
				}
				return true;
			}
		} else {
			throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
		}
		if (oType !== 'Undefined') {
			return DefineOwnProperty(this, O, P, Desc);
		}
		return true;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty
	OrdinaryDefineOwnProperty: function OrdinaryDefineOwnProperty(O, P, Desc) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: P must be a Property Key');
		}
		if (!isPropertyDescriptor(this, Desc)) {
			throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
		}
		var desc = $gOPD(O, P);
		var current = desc && this.ToPropertyDescriptor(desc);
		var extensible = this.IsExtensible(O);
		return this.ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty
	OrdinaryGetOwnProperty: function OrdinaryGetOwnProperty(O, P) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: O must be an Object');
		}
		if (!this.IsPropertyKey(P)) {
			throw new $TypeError('Assertion failed: P must be a Property Key');
		}
		if (!has(O, P)) {
			return void 0;
		}
		if (!$gOPD) {
			// ES3 fallback
			var arrayLength = this.IsArray(O) && P === 'length';
			var regexLastIndex = this.IsRegExp(O) && P === 'lastIndex';
			return {
				'[[Configurable]]': !(arrayLength || regexLastIndex),
				'[[Enumerable]]': $isEnumerable(O, P),
				'[[Value]]': O[P],
				'[[Writable]]': true
			};
		}
		return this.ToPropertyDescriptor($gOPD(O, P));
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-arraycreate
	ArrayCreate: function ArrayCreate(length) {
		if (!this.IsInteger(length) || length < 0) {
			throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
		}
		if (length > MAX_ARRAY_LENGTH) {
			throw new $RangeError('length is greater than (2**32 - 1)');
		}
		var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
		var A = []; // steps 5 - 7, and 9
		if (proto !== $ArrayPrototype) { // step 8
			if (!$setProto) {
				throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
			}
			$setProto(A, proto);
		}
		if (length !== 0) { // bypasses the need for step 2
			A.length = length;
		}
		/* step 10, the above as a shortcut for the below
		this.OrdinaryDefineOwnProperty(A, 'length', {
			'[[Configurable]]': false,
			'[[Enumerable]]': false,
			'[[Value]]': length,
			'[[Writable]]': true
		});
		*/
		return A;
	},

	// eslint-disable-next-line max-statements, max-lines-per-function
	ArraySetLength: function ArraySetLength(A, Desc) {
		if (!this.IsArray(A)) {
			throw new $TypeError('Assertion failed: A must be an Array');
		}
		if (!isPropertyDescriptor(this, Desc)) {
			throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
		}
		if (!('[[Value]]' in Desc)) {
			return this.OrdinaryDefineOwnProperty(A, 'length', Desc);
		}
		var newLenDesc = assign({}, Desc);
		var newLen = this.ToUint32(Desc['[[Value]]']);
		var numberLen = this.ToNumber(Desc['[[Value]]']);
		if (newLen !== numberLen) {
			throw new $RangeError('Invalid array length');
		}
		newLenDesc['[[Value]]'] = newLen;
		var oldLenDesc = this.OrdinaryGetOwnProperty(A, 'length');
		if (!this.IsDataDescriptor(oldLenDesc)) {
			throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
		}
		var oldLen = oldLenDesc['[[Value]]'];
		if (newLen >= oldLen) {
			return this.OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
		}
		if (!oldLenDesc['[[Writable]]']) {
			return false;
		}
		var newWritable;
		if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
			newWritable = true;
		} else {
			newWritable = false;
			newLenDesc['[[Writable]]'] = true;
		}
		var succeeded = this.OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
		if (!succeeded) {
			return false;
		}
		while (newLen < oldLen) {
			oldLen -= 1;
			var deleteSucceeded = delete A[this.ToString(oldLen)];
			if (!deleteSucceeded) {
				newLenDesc['[[Value]]'] = oldLen + 1;
				if (!newWritable) {
					newLenDesc['[[Writable]]'] = false;
					this.OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
					return false;
				}
			}
		}
		if (!newWritable) {
			return this.OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
		}
		return true;
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-createhtml
	CreateHTML: function CreateHTML(string, tag, attribute, value) {
		if (this.Type(tag) !== 'String' || this.Type(attribute) !== 'String') {
			throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
		}
		var str = this.RequireObjectCoercible(string);
		var S = this.ToString(str);
		var p1 = '<' + tag;
		if (attribute !== '') {
			var V = this.ToString(value);
			var escapedV = $replace(V, /\x22/g, '&quot;');
			p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
		}
		return p1 + '>' + S + '</' + tag + '>';
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys
	GetOwnPropertyKeys: function GetOwnPropertyKeys(O, Type) {
		if (this.Type(O) !== 'Object') {
			throw new $TypeError('Assertion failed: Type(O) is not Object');
		}
		if (Type === 'Symbol') {
			return hasSymbols && $gOPS ? $gOPS(O) : [];
		}
		if (Type === 'String') {
			if (!$gOPN) {
				return keys(O);
			}
			return $gOPN(O);
		}
		throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring
	SymbolDescriptiveString: function SymbolDescriptiveString(sym) {
		if (this.Type(sym) !== 'Symbol') {
			throw new $TypeError('Assertion failed: `sym` must be a Symbol');
		}
		return $SymbolToString(sym);
	},

	// https://www.ecma-international.org/ecma-262/6.0/#sec-getsubstitution
	// eslint-disable-next-line max-statements, max-params, max-lines-per-function
	GetSubstitution: function GetSubstitution(matched, str, position, captures, replacement) {
		if (this.Type(matched) !== 'String') {
			throw new $TypeError('Assertion failed: `matched` must be a String');
		}
		var matchLength = matched.length;

		if (this.Type(str) !== 'String') {
			throw new $TypeError('Assertion failed: `str` must be a String');
		}
		var stringLength = str.length;

		if (!this.IsInteger(position) || position < 0 || position > stringLength) {
			throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
		}

		var ES = this;
		var isStringOrHole = function (capture, index, arr) { return ES.Type(capture) === 'String' || !(index in arr); };
		if (!this.IsArray(captures) || !every(captures, isStringOrHole)) {
			throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
		}

		if (this.Type(replacement) !== 'String') {
			throw new $TypeError('Assertion failed: `replacement` must be a String');
		}

		var tailPos = position + matchLength;
		var m = captures.length;

		var result = '';
		for (var i = 0; i < replacement.length; i += 1) {
			// if this is a $, and it's not the end of the replacement
			var current = replacement[i];
			var isLast = (i + 1) >= replacement.length;
			var nextIsLast = (i + 2) >= replacement.length;
			if (current === '$' && !isLast) {
				var next = replacement[i + 1];
				if (next === '$') {
					result += '$';
					i += 1;
				} else if (next === '&') {
					result += matched;
					i += 1;
				} else if (next === '`') {
					result += position === 0 ? '' : strSlice(str, 0, position - 1);
					i += 1;
				} else if (next === "'") {
					result += tailPos >= stringLength ? '' : strSlice(str, tailPos);
					i += 1;
				} else {
					var nextNext = nextIsLast ? null : replacement[i + 2];
					if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
						// $1 through $9, and not followed by a digit
						var n = parseInteger(next, 10);
						// if (n > m, impl-defined)
						result += (n <= m && this.Type(captures[n - 1]) === 'Undefined') ? '' : captures[n - 1];
						i += 1;
					} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
						// $00 through $99
						var nn = next + nextNext;
						var nnI = parseInteger(nn, 10) - 1;
						// if nn === '00' or nn > m, impl-defined
						result += (nn <= m && this.Type(captures[nnI]) === 'Undefined') ? '' : captures[nnI];
						i += 2;
					} else {
						result += '$';
					}
				}
			} else {
				// the final $, or else not a $
				result += replacement[i];
			}
		}
		return result;
	}
});

delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible

module.exports = ES6;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(16);

module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


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


module.exports = __webpack_require__(19);


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';

var isPrimitive = __webpack_require__(20);
var isCallable = __webpack_require__(21);
var isDate = __webpack_require__(22);
var isSymbol = __webpack_require__(23);

var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
	if (typeof O === 'undefined' || O === null) {
		throw new TypeError('Cannot call method on ' + O);
	}
	if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
		throw new TypeError('hint must be "string" or "number"');
	}
	var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
	var method, result, i;
	for (i = 0; i < methodNames.length; ++i) {
		method = O[methodNames[i]];
		if (isCallable(method)) {
			result = method.call(O);
			if (isPrimitive(result)) {
				return result;
			}
		}
	}
	throw new TypeError('No default value');
};

var GetMethod = function GetMethod(O, P) {
	var func = O[P];
	if (func !== null && typeof func !== 'undefined') {
		if (!isCallable(func)) {
			throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
		}
		return func;
	}
	return void 0;
};

// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	var hint = 'default';
	if (arguments.length > 1) {
		if (arguments[1] === String) {
			hint = 'string';
		} else if (arguments[1] === Number) {
			hint = 'number';
		}
	}

	var exoticToPrim;
	if (hasSymbols) {
		if (Symbol.toPrimitive) {
			exoticToPrim = GetMethod(input, Symbol.toPrimitive);
		} else if (isSymbol(input)) {
			exoticToPrim = Symbol.prototype.valueOf;
		}
	}
	if (typeof exoticToPrim !== 'undefined') {
		var result = exoticToPrim.call(input, hint);
		if (isPrimitive(result)) {
			return result;
		}
		throw new TypeError('unable to convert exotic object to primitive');
	}
	if (hint === 'default' && (isDate(input) || isSymbol(input))) {
		hint = 'string';
	}
	return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
};


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fnToStr = Function.prototype.toString;

var constructorRegex = /^\s*class\b/;
var isES6ClassFn = function isES6ClassFunction(value) {
	try {
		var fnStr = fnToStr.call(value);
		return constructorRegex.test(fnStr);
	} catch (e) {
		return false; // not a function
	}
};

var tryFunctionObject = function tryFunctionToStr(value) {
	try {
		if (isES6ClassFn(value)) { return false; }
		fnToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var fnClass = '[object Function]';
var genClass = '[object GeneratorFunction]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isCallable(value) {
	if (!value) { return false; }
	if (typeof value !== 'function' && typeof value !== 'object') { return false; }
	if (typeof value === 'function' && !value.prototype) { return true; }
	if (hasToStringTag) { return tryFunctionObject(value); }
	if (isES6ClassFn(value)) { return false; }
	var strClass = toStr.call(value);
	return strClass === fnClass || strClass === genClass;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateObject(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) { return false; }
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = __webpack_require__(12)();

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return  false && false;
	};
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

var inspectCustom = __webpack_require__(25).custom;
var inspectSymbol = (inspectCustom && isSymbol(inspectCustom)) ? inspectCustom : null;

module.exports = function inspect_ (obj, opts, depth, seen) {
    if (!opts) opts = {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
      if (obj === 0) {
        return Infinity / obj > 0 ? '0' : '-0';
      }
      return String(obj);
    }
    if (typeof obj === 'bigint') {
      return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') depth = 0;
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return '[Object]';
    }

    if (typeof seen === 'undefined') seen = [];
    else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect (value, from) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : '') + ']';
    }
    if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) s += '...';
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) return '[]';
        return '[ ' + arrObjKeys(obj, inspect).join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) return '[' + String(obj) + ']';
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object') {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var parts = [];
        mapForEach.call(obj, function (value, key) {
            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), parts);
    }
    if (isSet(obj)) {
        var parts = [];
        setForEach.call(obj, function (value ) {
            parts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), parts);
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var xs = arrObjKeys(obj, inspect);
        if (xs.length === 0) return '{}';
        return '{ ' + xs.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes (s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote (s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray (obj) { return toStr(obj) === '[object Array]'; }
function isDate (obj) { return toStr(obj) === '[object Date]'; }
function isRegExp (obj) { return toStr(obj) === '[object RegExp]'; }
function isError (obj) { return toStr(obj) === '[object Error]'; }
function isSymbol (obj) { return toStr(obj) === '[object Symbol]'; }
function isString (obj) { return toStr(obj) === '[object String]'; }
function isNumber (obj) { return toStr(obj) === '[object Number]'; }
function isBigInt (obj) { return toStr(obj) === '[object BigInt]'; }
function isBoolean (obj) { return toStr(obj) === '[object Boolean]'; }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has (obj, key) {
    return hasOwn.call(obj, key);
}

function toStr (obj) {
    return objectToString.call(obj);
}

function nameOf (f) {
    if (f.name) return f.name;
    var m = String(f).match(/^function\s*([\w$]+)/);
    if (m) return m[1];
}

function indexOf (xs, x) {
    if (xs.indexOf) return xs.indexOf(x);
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) return i;
    }
    return -1;
}

function isMap (x) {
    if (!mapSize) {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet (x) {
    if (!setSize) {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement (x) {
    if (!x || typeof x !== 'object') return false;
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string'
        && typeof x.getAttribute === 'function'
    ;
}

function inspectString (str, opts) {
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte (c) {
    var n = c.charCodeAt(0);
    var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
    if (x) return '\\' + x;
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed (str) {
    return 'Object(' + str + ')';
}

function collectionOf (type, size, entries) {
    return type + ' (' + size + ') {' + entries.join(', ') + '}';
}

function arrObjKeys (obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) {
        if (!has(obj, key)) continue;
        if (isArr && String(Number(key)) === key && key < obj.length) continue;
        if (/[^\w$]/.test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(26).inspect;


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(10);

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = __webpack_require__(15);

var predicates = {
	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(ES, Desc) {
		if (ES.Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

module.exports = function assertRecord(ES, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(ES, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(10);

var has = __webpack_require__(15);

var $assign = GetIntrinsic('%Object%').assign;

module.exports = function assign(target, source) {
	if ($assign) {
		return $assign(target, source);
	}

	// eslint-disable-next-line no-restricted-syntax
	for (var key in source) {
		if (has(source, key)) {
			target[key] = source[key];
		}
	}
	return target;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return Math.floor(remain >= 0 ? remain : remain + modulo);
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function forEach(array, callback) {
	for (var i = 0; i < array.length; i += 1) {
		callback(array[i], i, array); // eslint-disable-line callback-return
	}
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function every(array, predicate) {
	for (var i = 0; i < array.length; i += 1) {
		if (!predicate(array[i], i, array)) {
			return false;
		}
	}
	return true;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var every = __webpack_require__(35);

module.exports = function isSamePropertyDescriptor(ES, D1, D2) {
	var fields = [
		'[[Configurable]]',
		'[[Enumerable]]',
		'[[Get]]',
		'[[Set]]',
		'[[Value]]',
		'[[Writable]]'
	];
	return every(fields, function (field) {
		if ((field in D1) !== (field in D2)) {
			return false;
		}
		return ES.SameValue(D1[field], D2[field]);
	});
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(10);

var has = __webpack_require__(15);
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

    for (var key in Desc) { // eslint-disable-line
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(16);

var GetIntrinsic = __webpack_require__(10);

var $Function = GetIntrinsic('%Function%');
var $apply = $Function.apply;
var $call = $Function.call;

module.exports = function callBind() {
	return bind.apply($call, arguments);
};

module.exports.apply = function applyBind() {
	return bind.apply($apply, arguments);
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__(10);

var $Object = GetIntrinsic('%Object%');
var $TypeError = GetIntrinsic('%TypeError%');
var $String = GetIntrinsic('%String%');
var $Number = GetIntrinsic('%Number%');

var assertRecord = __webpack_require__(27);
var isPropertyDescriptor = __webpack_require__(37);
var $isNaN = __webpack_require__(28);
var $isFinite = __webpack_require__(29);

var sign = __webpack_require__(31);
var mod = __webpack_require__(32);

var IsCallable = __webpack_require__(21);
var toPrimitive = __webpack_require__(40);

var has = __webpack_require__(15);

var callBind = __webpack_require__(38);
var strSlice = callBind($String.prototype.slice);

var isPrefixOf = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return strSlice(string, 0, prefix.length) === prefix;
};

// https://es5.github.io/#x9
var ES5 = {
	ToPrimitive: toPrimitive,

	ToBoolean: function ToBoolean(value) {
		return !!value;
	},
	ToNumber: function ToNumber(value) {
		return +value; // eslint-disable-line no-implicit-coercion
	},
	ToInteger: function ToInteger(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number)) { return 0; }
		if (number === 0 || !$isFinite(number)) { return number; }
		return sign(number) * Math.floor(Math.abs(number));
	},
	ToInt32: function ToInt32(x) {
		return this.ToNumber(x) >> 0;
	},
	ToUint32: function ToUint32(x) {
		return this.ToNumber(x) >>> 0;
	},
	ToUint16: function ToUint16(value) {
		var number = this.ToNumber(value);
		if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
		var posInt = sign(number) * Math.floor(Math.abs(number));
		return mod(posInt, 0x10000);
	},
	ToString: function ToString(value) {
		return $String(value);
	},
	ToObject: function ToObject(value) {
		this.CheckObjectCoercible(value);
		return $Object(value);
	},
	CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
		/* jshint eqnull:true */
		if (value == null) {
			throw new $TypeError(optMessage || 'Cannot call method on ' + value);
		}
		return value;
	},
	IsCallable: IsCallable,
	SameValue: function SameValue(x, y) {
		if (x === y) { // 0 === -0, but they are not identical.
			if (x === 0) { return 1 / x === 1 / y; }
			return true;
		}
		return $isNaN(x) && $isNaN(y);
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-8
	Type: function Type(x) {
		if (x === null) {
			return 'Null';
		}
		if (typeof x === 'undefined') {
			return 'Undefined';
		}
		if (typeof x === 'function' || typeof x === 'object') {
			return 'Object';
		}
		if (typeof x === 'number') {
			return 'Number';
		}
		if (typeof x === 'boolean') {
			return 'Boolean';
		}
		if (typeof x === 'string') {
			return 'String';
		}
	},

	// https://ecma-international.org/ecma-262/6.0/#sec-property-descriptor-specification-type
	IsPropertyDescriptor: function IsPropertyDescriptor(Desc) {
		return isPropertyDescriptor(this, Desc);
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.1
	IsAccessorDescriptor: function IsAccessorDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.2
	IsDataDescriptor: function IsDataDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
			return false;
		}

		return true;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.3
	IsGenericDescriptor: function IsGenericDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return false;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (!this.IsAccessorDescriptor(Desc) && !this.IsDataDescriptor(Desc)) {
			return true;
		}

		return false;
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.4
	FromPropertyDescriptor: function FromPropertyDescriptor(Desc) {
		if (typeof Desc === 'undefined') {
			return Desc;
		}

		assertRecord(this, 'Property Descriptor', 'Desc', Desc);

		if (this.IsDataDescriptor(Desc)) {
			return {
				value: Desc['[[Value]]'],
				writable: !!Desc['[[Writable]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else if (this.IsAccessorDescriptor(Desc)) {
			return {
				get: Desc['[[Get]]'],
				set: Desc['[[Set]]'],
				enumerable: !!Desc['[[Enumerable]]'],
				configurable: !!Desc['[[Configurable]]']
			};
		} else {
			throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
		}
	},

	// https://ecma-international.org/ecma-262/5.1/#sec-8.10.5
	ToPropertyDescriptor: function ToPropertyDescriptor(Obj) {
		if (this.Type(Obj) !== 'Object') {
			throw new $TypeError('ToPropertyDescriptor requires an object');
		}

		var desc = {};
		if (has(Obj, 'enumerable')) {
			desc['[[Enumerable]]'] = this.ToBoolean(Obj.enumerable);
		}
		if (has(Obj, 'configurable')) {
			desc['[[Configurable]]'] = this.ToBoolean(Obj.configurable);
		}
		if (has(Obj, 'value')) {
			desc['[[Value]]'] = Obj.value;
		}
		if (has(Obj, 'writable')) {
			desc['[[Writable]]'] = this.ToBoolean(Obj.writable);
		}
		if (has(Obj, 'get')) {
			var getter = Obj.get;
			if (typeof getter !== 'undefined' && !this.IsCallable(getter)) {
				throw new TypeError('getter must be a function');
			}
			desc['[[Get]]'] = getter;
		}
		if (has(Obj, 'set')) {
			var setter = Obj.set;
			if (typeof setter !== 'undefined' && !this.IsCallable(setter)) {
				throw new $TypeError('setter must be a function');
			}
			desc['[[Set]]'] = setter;
		}

		if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
			throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
		}
		return desc;
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3
	'Abstract Equality Comparison': function AbstractEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType === yType) {
			return x === y; // ES6+ specified this shortcut anyways.
		}
		if (x == null && y == null) {
			return true;
		}
		if (xType === 'Number' && yType === 'String') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if (xType === 'String' && yType === 'Number') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (xType === 'Boolean') {
			return this['Abstract Equality Comparison'](this.ToNumber(x), y);
		}
		if (yType === 'Boolean') {
			return this['Abstract Equality Comparison'](x, this.ToNumber(y));
		}
		if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
			return this['Abstract Equality Comparison'](x, this.ToPrimitive(y));
		}
		if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
			return this['Abstract Equality Comparison'](this.ToPrimitive(x), y);
		}
		return false;
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.6
	'Strict Equality Comparison': function StrictEqualityComparison(x, y) {
		var xType = this.Type(x);
		var yType = this.Type(y);
		if (xType !== yType) {
			return false;
		}
		if (xType === 'Undefined' || xType === 'Null') {
			return true;
		}
		return x === y; // shortcut for steps 4-7
	},

	// https://www.ecma-international.org/ecma-262/5.1/#sec-11.8.5
	// eslint-disable-next-line max-statements
	'Abstract Relational Comparison': function AbstractRelationalComparison(x, y, LeftFirst) {
		if (this.Type(LeftFirst) !== 'Boolean') {
			throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
		}
		var px;
		var py;
		if (LeftFirst) {
			px = this.ToPrimitive(x, $Number);
			py = this.ToPrimitive(y, $Number);
		} else {
			py = this.ToPrimitive(y, $Number);
			px = this.ToPrimitive(x, $Number);
		}
		var bothStrings = this.Type(px) === 'String' && this.Type(py) === 'String';
		if (!bothStrings) {
			var nx = this.ToNumber(px);
			var ny = this.ToNumber(py);
			if ($isNaN(nx) || $isNaN(ny)) {
				return undefined;
			}
			if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
				return false;
			}
			if (nx === 0 && ny === 0) {
				return false;
			}
			if (nx === Infinity) {
				return false;
			}
			if (ny === Infinity) {
				return true;
			}
			if (ny === -Infinity) {
				return false;
			}
			if (nx === -Infinity) {
				return true;
			}
			return nx < ny; // by now, these are both nonzero, finite, and not equal
		}
		if (isPrefixOf(py, px)) {
			return false;
		}
		if (isPrefixOf(px, py)) {
			return true;
		}
		return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
	}
};

module.exports = ES5;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

var isPrimitive = __webpack_require__(20);

var isCallable = __webpack_require__(21);

// http://ecma-international.org/ecma-262/5.1/#sec-8.12.8
var ES5internalSlots = {
	'[[DefaultValue]]': function (O) {
		var actualHint;
		if (arguments.length > 1) {
			actualHint = arguments[1];
		} else {
			actualHint = toStr.call(O) === '[object Date]' ? String : Number;
		}

		if (actualHint === String || actualHint === Number) {
			var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
			var value, i;
			for (i = 0; i < methods.length; ++i) {
				if (isCallable(O[methods[i]])) {
					value = O[methods[i]]();
					if (isPrimitive(value)) {
						return value;
					}
				}
			}
			throw new TypeError('No default value');
		}
		throw new TypeError('invalid [[DefaultValue]] hint supplied');
	}
};

// http://ecma-international.org/ecma-262/5.1/#sec-9.1
module.exports = function ToPrimitive(input) {
	if (isPrimitive(input)) {
		return input;
	}
	if (arguments.length > 1) {
		return ES5internalSlots['[[DefaultValue]]'](input, arguments[1]);
	}
	return ES5internalSlots['[[DefaultValue]]'](input);
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(15);
var regexExec = RegExp.prototype.exec;
var gOPD = Object.getOwnPropertyDescriptor;

var tryRegexExecCall = function tryRegexExec(value) {
	try {
		var lastIndex = value.lastIndex;
		value.lastIndex = 0;

		regexExec.call(value);
		return true;
	} catch (e) {
		return false;
	} finally {
		value.lastIndex = lastIndex;
	}
};
var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isRegex(value) {
	if (!value || typeof value !== 'object') {
		return false;
	}
	if (!hasToStringTag) {
		return toStr.call(value) === regexClass;
	}

	var descriptor = gOPD(value, 'lastIndex');
	var hasLastIndexDataProperty = descriptor && has(descriptor, 'value');
	if (!hasLastIndexDataProperty) {
		return false;
	}

	return tryRegexExecCall(value);
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(8);

module.exports = function getPolyfill() {
	return typeof Object.fromEntries === 'function' ? Object.fromEntries : implementation;
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPolyfill = __webpack_require__(42);
var define = __webpack_require__(4);

module.exports = function shimEntries() {
	var polyfill = getPolyfill();
	define(Object, { fromEntries: polyfill }, {
		fromEntries: function testEntries() {
			return Object.fromEntries !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(4);

var implementation = __webpack_require__(45);
var getPolyfill = __webpack_require__(47);
var shim = __webpack_require__(48);

var polyfill = getPolyfill();

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(46);
var has = __webpack_require__(15);
var bind = __webpack_require__(16);
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);

module.exports = function entries(O) {
	var obj = ES.RequireObjectCoercible(O);
	var entrys = [];
	for (var key in obj) {
		if (has(obj, key) && isEnumerable(obj, key)) {
			entrys.push([key, obj[key]]);
		}
	}
	return entrys;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(11);


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(45);

module.exports = function getPolyfill() {
	return typeof Object.entries === 'function' ? Object.entries : implementation;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPolyfill = __webpack_require__(47);
var define = __webpack_require__(4);

module.exports = function shimEntries() {
	var polyfill = getPolyfill();
	define(Object, { entries: polyfill }, {
		entries: function testEntries() {
			return Object.entries !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforces consistent naming for boolean props
 * @author Ev Haus
 */



const Components = __webpack_require__(50);
const propsUtil = __webpack_require__(70);
const docsUrl = __webpack_require__(124);
const propWrapperUtil = __webpack_require__(85);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      category: 'Stylistic Issues',
      description: 'Enforces consistent naming for boolean props',
      recommended: false,
      url: docsUrl('boolean-prop-naming')
    },

    schema: [{
      additionalProperties: false,
      properties: {
        propTypeNames: {
          items: {
            type: 'string'
          },
          minItems: 1,
          type: 'array',
          uniqueItems: true
        },
        rule: {
          default: '^(is|has)[A-Z]([A-Za-z0-9]?)+',
          minLength: 1,
          type: 'string'
        },
        message: {
          minLength: 1,
          type: 'string'
        },
        validateNested: {
          default: false,
          type: 'boolean'
        }
      },
      type: 'object'
    }]
  },

  create: Components.detect((context, components, utils) => {
    const config = context.options[0] || {};
    const rule = config.rule ? new RegExp(config.rule) : null;
    const propTypeNames = config.propTypeNames || ['bool'];

    // Remembers all Flowtype object definitions
    const objectTypeAnnotations = new Map();

    /**
     * Returns the prop key to ensure we handle the following cases:
     * propTypes: {
     *   full: React.PropTypes.bool,
     *   short: PropTypes.bool,
     *   direct: bool,
     *   required: PropTypes.bool.isRequired
     * }
     * @param {Object} node The node we're getting the name of
     */
    function getPropKey(node) {
      // Check for `ExperimentalSpreadProperty` (ESLint 3/4) and `SpreadElement` (ESLint 5)
      // so we can skip validation of those fields.
      // Otherwise it will look for `node.value.property` which doesn't exist and breaks ESLint.
      if (node.type === 'ExperimentalSpreadProperty' || node.type === 'SpreadElement') {
        return null;
      }
      if (node.value.property) {
        const name = node.value.property.name;
        if (name === 'isRequired') {
          if (node.value.object && node.value.object.property) {
            return node.value.object.property.name;
          }
          return null;
        }
        return name;
      }
      if (node.value.type === 'Identifier') {
        return node.value.name;
      }
      return null;
    }

    /**
     * Returns the name of the given node (prop)
     * @param {Object} node The node we're getting the name of
     */
    function getPropName(node) {
      // Due to this bug https://github.com/babel/babel-eslint/issues/307
      // we can't get the name of the Flow object key name. So we have
      // to hack around it for now.
      if (node.type === 'ObjectTypeProperty') {
        return context.getSourceCode().getFirstToken(node).value;
      }

      return node.key.name;
    }

    /**
     * Checks if prop is declared in flow way
     * @param {Object} prop Property object, single prop type declaration
     * @returns {Boolean}
     */
    function flowCheck(prop) {
      return (
        prop.type === 'ObjectTypeProperty' &&
        prop.value.type === 'BooleanTypeAnnotation' &&
        rule.test(getPropName(prop)) === false
      );
    }

    /**
     * Checks if prop is declared in regular way
     * @param {Object} prop Property object, single prop type declaration
     * @returns {Boolean}
     */
    function regularCheck(prop) {
      const propKey = getPropKey(prop);
      return (
        propKey &&
        propTypeNames.indexOf(propKey) >= 0 &&
        rule.test(getPropName(prop)) === false
      );
    }

    /**
     * Checks if prop is nested
     * @param {Object} prop Property object, single prop type declaration
     * @returns {Boolean}
     */
    function nestedPropTypes(prop) {
      return (
        prop.type === 'Property' &&
        prop.value.type === 'CallExpression'
      );
    }

    /**
     * Runs recursive check on all proptypes
     * @param {Array} proptypes A list of Property object (for each proptype defined)
     * @param {Function} addInvalidProp callback to run for each error
     */
    function runCheck(proptypes, addInvalidProp) {
      proptypes = proptypes || [];

      proptypes.forEach((prop) => {
        if (config.validateNested && nestedPropTypes(prop)) {
          runCheck(prop.value.arguments[0].properties, addInvalidProp);
          return;
        }
        if (flowCheck(prop) || regularCheck(prop)) {
          addInvalidProp(prop);
        }
      });
    }

    /**
     * Checks and mark props with invalid naming
     * @param {Object} node The component node we're testing
     * @param {Array} proptypes A list of Property object (for each proptype defined)
     */
    function validatePropNaming(node, proptypes) {
      const component = components.get(node) || node;
      const invalidProps = component.invalidProps || [];

      runCheck(proptypes, (prop) => {
        invalidProps.push(prop);
      });

      components.set(node, {
        invalidProps
      });
    }

    /**
     * Reports invalid prop naming
     * @param {Object} component The component to process
     */
    function reportInvalidNaming(component) {
      component.invalidProps.forEach((propNode) => {
        const propName = getPropName(propNode);
        context.report({
          node: propNode,
          message: config.message || 'Prop name ({{ propName }}) doesn\'t match rule ({{ pattern }})',
          data: {
            component: propName,
            propName,
            pattern: config.rule
          }
        });
      });
    }

    function checkPropWrapperArguments(node, args) {
      if (!node || !Array.isArray(args)) {
        return;
      }
      args.filter(arg => arg.type === 'ObjectExpression').forEach(object => validatePropNaming(node, object.properties));
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      ClassProperty(node) {
        if (!rule || !propsUtil.isPropTypesDeclaration(node)) {
          return;
        }
        if (
          node.value &&
          node.value.type === 'CallExpression' &&
          propWrapperUtil.isPropWrapperFunction(
            context,
            context.getSourceCode().getText(node.value.callee)
          )
        ) {
          checkPropWrapperArguments(node, node.value.arguments);
        }
        if (node.value && node.value.properties) {
          validatePropNaming(node, node.value.properties);
        }
        if (node.typeAnnotation && node.typeAnnotation.typeAnnotation) {
          validatePropNaming(node, node.typeAnnotation.typeAnnotation.properties);
        }
      },

      MemberExpression(node) {
        if (!rule || !propsUtil.isPropTypesDeclaration(node)) {
          return;
        }
        const component = utils.getRelatedComponent(node);
        if (!component || !node.parent.right) {
          return;
        }
        const right = node.parent.right;
        if (
          right.type === 'CallExpression' &&
          propWrapperUtil.isPropWrapperFunction(
            context,
            context.getSourceCode().getText(right.callee)
          )
        ) {
          checkPropWrapperArguments(component.node, right.arguments);
          return;
        }
        validatePropNaming(component.node, node.parent.right.properties);
      },

      ObjectExpression(node) {
        if (!rule) {
          return;
        }

        // Search for the proptypes declaration
        node.properties.forEach((property) => {
          if (!propsUtil.isPropTypesDeclaration(property)) {
            return;
          }
          validatePropNaming(node, property.value.properties);
        });
      },

      TypeAlias(node) {
        // Cache all ObjectType annotations, we will check them at the end
        if (node.right.type === 'ObjectTypeAnnotation') {
          objectTypeAnnotations.set(node.id.name, node.right);
        }
      },

      'Program:exit': function () {
        if (!rule) {
          return;
        }

        const list = components.list();
        Object.keys(list).forEach((component) => {
          // If this is a functional component that uses a global type, check it
          if (
            list[component].node.type === 'FunctionDeclaration' &&
            list[component].node.params &&
            list[component].node.params.length &&
            list[component].node.params[0].typeAnnotation
          ) {
            const typeNode = list[component].node.params[0].typeAnnotation;
            const annotation = typeNode.typeAnnotation;

            let propType;
            if (annotation.type === 'GenericTypeAnnotation') {
              propType = objectTypeAnnotations.get(annotation.id.name);
            } else if (annotation.type === 'ObjectTypeAnnotation') {
              propType = annotation;
            }
            if (propType) {
              validatePropNaming(list[component].node, propType.properties);
            }
          }

          if (list[component].invalidProps && list[component].invalidProps.length > 0) {
            reportInvalidNaming(list[component]);
          }
        });

        // Reset cache
        objectTypeAnnotations.clear();
      }
    };
  })
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility class and functions for React components detection
 * @author Yannick Croissant
 */



const doctrine = __webpack_require__(51);
const arrayIncludes = __webpack_require__(60);

const variableUtil = __webpack_require__(65);
const pragmaUtil = __webpack_require__(66);
const astUtil = __webpack_require__(67);
const propTypesUtil = __webpack_require__(68);
const jsxUtil = __webpack_require__(86);
const usedPropTypesUtil = __webpack_require__(122);
const defaultPropsUtil = __webpack_require__(123);

function getId(node) {
  return node && node.range.join(':');
}

function usedPropTypesAreEquivalent(propA, propB) {
  if (propA.name === propB.name) {
    if (!propA.allNames && !propB.allNames) {
      return true;
    }
    if (Array.isArray(propA.allNames) && Array.isArray(propB.allNames) && propA.allNames.join('') === propB.allNames.join('')) {
      return true;
    }
    return false;
  }
  return false;
}

function mergeUsedPropTypes(propsList, newPropsList) {
  const propsToAdd = [];
  newPropsList.forEach((newProp) => {
    const newPropisAlreadyInTheList = propsList.some(prop => usedPropTypesAreEquivalent(prop, newProp));
    if (!newPropisAlreadyInTheList) {
      propsToAdd.push(newProp);
    }
  });

  return propsList.concat(propsToAdd);
}

const Lists = new WeakMap();

/**
 * Components
 */
class Components {
  constructor() {
    Lists.set(this, {});
  }

  /**
   * Add a node to the components list, or update it if it's already in the list
   *
   * @param {ASTNode} node The AST node being added.
   * @param {Number} confidence Confidence in the component detection (0=banned, 1=maybe, 2=yes)
   * @returns {Object} Added component object
   */
  add(node, confidence) {
    const id = getId(node);
    const list = Lists.get(this);
    if (list[id]) {
      if (confidence === 0 || list[id].confidence === 0) {
        list[id].confidence = 0;
      } else {
        list[id].confidence = Math.max(list[id].confidence, confidence);
      }
      return list[id];
    }
    list[id] = {
      node,
      confidence
    };
    return list[id];
  }

  /**
   * Find a component in the list using its node
   *
   * @param {ASTNode} node The AST node being searched.
   * @returns {Object} Component object, undefined if the component is not found or has confidence value of 0.
   */
  get(node) {
    const id = getId(node);
    const item = Lists.get(this)[id];
    if (item && item.confidence >= 1) {
      return item;
    }
    return null;
  }

  /**
   * Update a component in the list
   *
   * @param {ASTNode} node The AST node being updated.
   * @param {Object} props Additional properties to add to the component.
   */
  set(node, props) {
    const list = Lists.get(this);
    let component = list[getId(node)];
    while (!component) {
      node = node.parent;
      if (!node) {
        return;
      }
      component = list[getId(node)];
    }

    Object.assign(
      component,
      props,
      {
        usedPropTypes: mergeUsedPropTypes(
          component.usedPropTypes || [],
          props.usedPropTypes || []
        )
      }
    );
  }

  /**
   * Return the components list
   * Components for which we are not confident are not returned
   *
   * @returns {Object} Components list
   */
  list() {
    const thisList = Lists.get(this);
    const list = {};
    const usedPropTypes = {};

    // Find props used in components for which we are not confident
    Object.keys(thisList).filter(i => thisList[i].confidence < 2).forEach((i) => {
      let component = null;
      let node = null;
      node = thisList[i].node;
      while (!component && node.parent) {
        node = node.parent;
        // Stop moving up if we reach a decorator
        if (node.type === 'Decorator') {
          break;
        }
        component = this.get(node);
      }
      if (component) {
        const newUsedProps = (thisList[i].usedPropTypes || []).filter(propType => !propType.node || propType.node.kind !== 'init');

        const componentId = getId(component.node);

        usedPropTypes[componentId] = mergeUsedPropTypes(usedPropTypes[componentId] || [], newUsedProps);
      }
    });

    // Assign used props in not confident components to the parent component
    Object.keys(thisList).filter(j => thisList[j].confidence >= 2).forEach((j) => {
      const id = getId(thisList[j].node);
      list[j] = thisList[j];
      if (usedPropTypes[id]) {
        list[j].usedPropTypes = mergeUsedPropTypes(list[j].usedPropTypes || [], usedPropTypes[id]);
      }
    });
    return list;
  }

  /**
   * Return the length of the components list
   * Components for which we are not confident are not counted
   *
   * @returns {Number} Components list length
   */
  length() {
    const list = Lists.get(this);
    return Object.keys(list).filter(i => list[i].confidence >= 2).length;
  }
}

function componentRule(rule, context) {
  const createClass = pragmaUtil.getCreateClassFromContext(context);
  const pragma = pragmaUtil.getFromContext(context);
  const sourceCode = context.getSourceCode();
  const components = new Components();

  // Utilities for component detection
  const utils = {

    /**
     * Check if the node is a React ES5 component
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node is a React ES5 component, false if not
     */
    isES5Component(node) {
      if (!node.parent) {
        return false;
      }
      return new RegExp(`^(${pragma}\\.)?${createClass}$`).test(sourceCode.getText(node.parent.callee));
    },

    /**
     * Check if the node is a React ES6 component
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node is a React ES6 component, false if not
     */
    isES6Component(node) {
      if (utils.isExplicitComponent(node)) {
        return true;
      }

      if (!node.superClass) {
        return false;
      }
      return new RegExp(`^(${pragma}\\.)?(Pure)?Component$`).test(sourceCode.getText(node.superClass));
    },

    /**
     * Check if the node is explicitly declared as a descendant of a React Component
     *
     * @param {ASTNode} node The AST node being checked (can be a ReturnStatement or an ArrowFunctionExpression).
     * @returns {Boolean} True if the node is explicitly declared as a descendant of a React Component, false if not
     */
    isExplicitComponent(node) {
      let comment;
      // Sometimes the passed node may not have been parsed yet by eslint, and this function call crashes.
      // Can be removed when eslint sets "parent" property for all nodes on initial AST traversal: https://github.com/eslint/eslint-scope/issues/27
      // eslint-disable-next-line no-warning-comments
      // FIXME: Remove try/catch when https://github.com/eslint/eslint-scope/issues/27 is implemented.
      try {
        comment = sourceCode.getJSDocComment(node);
      } catch (e) {
        comment = null;
      }

      if (comment === null) {
        return false;
      }

      const commentAst = doctrine.parse(comment.value, {
        unwrap: true,
        tags: ['extends', 'augments']
      });

      const relevantTags = commentAst.tags.filter(tag => tag.name === 'React.Component' || tag.name === 'React.PureComponent');

      return relevantTags.length > 0;
    },

    /**
     * Checks to see if our component extends React.PureComponent
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if node extends React.PureComponent, false if not
     */
    isPureComponent(node) {
      if (node.superClass) {
        return new RegExp(`^(${pragma}\\.)?PureComponent$`).test(sourceCode.getText(node.superClass));
      }
      return false;
    },

    /**
     * Check if variable is destructured from pragma import
     *
     * @param {string} variable The variable name to check
     * @returns {Boolean} True if createElement is destructured from the pragma
     */
    isDestructuredFromPragmaImport(variable) {
      const variables = variableUtil.variablesInScope(context);
      const variableInScope = variableUtil.getVariable(variables, variable);
      if (variableInScope) {
        const map = variableInScope.scope.set;
        return map.has(pragma);
      }
      return false;
    },

    /**
     * Checks to see if node is called within createElement from pragma
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if createElement called from pragma
     */
    isCreateElement(node) {
      const calledOnPragma = (
        node &&
        node.callee &&
        node.callee.object &&
        node.callee.object.name === pragma &&
        node.callee.property &&
        node.callee.property.name === 'createElement'
      );

      const calledDirectly = (
        node &&
        node.callee &&
        node.callee.name === 'createElement'
      );

      if (this.isDestructuredFromPragmaImport('createElement')) {
        return calledDirectly || calledOnPragma;
      }
      return calledOnPragma;
    },

    /**
     * Check if we are in a class constructor
     * @return {boolean} true if we are in a class constructor, false if not
     */
    inConstructor() {
      let scope = context.getScope();
      while (scope) {
        if (scope.block && scope.block.parent && scope.block.parent.kind === 'constructor') {
          return true;
        }
        scope = scope.upper;
      }
      return false;
    },

    /**
     * Determine if the node is MemberExpression of `this.state`
     * @param {Object} node The node to process
     * @returns {Boolean}
     */
    isStateMemberExpression(node) {
      return node.type === 'MemberExpression' && node.object.type === 'ThisExpression' && node.property.name === 'state';
    },

    getReturnPropertyAndNode(ASTnode) {
      let property;
      let node = ASTnode;
      switch (node.type) {
        case 'ReturnStatement':
          property = 'argument';
          break;
        case 'ArrowFunctionExpression':
          property = 'body';
          if (node[property] && node[property].type === 'BlockStatement') {
            node = utils.findReturnStatement(node);
            property = 'argument';
          }
          break;
        default:
          node = utils.findReturnStatement(node);
          property = 'argument';
      }
      return {
        node,
        property
      };
    },

    /**
     * Check if the node is returning JSX
     *
     * @param {ASTNode} ASTnode The AST node being checked
     * @param {Boolean} [strict] If true, in a ternary condition the node must return JSX in both cases
     * @returns {Boolean} True if the node is returning JSX, false if not
     */
    isReturningJSX(ASTnode, strict) {
      const nodeAndProperty = utils.getReturnPropertyAndNode(ASTnode);
      const node = nodeAndProperty.node;
      const property = nodeAndProperty.property;

      if (!node) {
        return false;
      }

      const returnsConditionalJSXConsequent = node[property] &&
        node[property].type === 'ConditionalExpression' &&
        jsxUtil.isJSX(node[property].consequent);
      const returnsConditionalJSXAlternate = node[property] &&
        node[property].type === 'ConditionalExpression' &&
        jsxUtil.isJSX(node[property].alternate);
      const returnsConditionalJSX = strict ?
        (returnsConditionalJSXConsequent && returnsConditionalJSXAlternate) :
        (returnsConditionalJSXConsequent || returnsConditionalJSXAlternate);

      const returnsJSX = node[property] &&
        jsxUtil.isJSX(node[property]);
      const returnsPragmaCreateElement = this.isCreateElement(node[property]);

      return Boolean(
        returnsConditionalJSX ||
        returnsJSX ||
        returnsPragmaCreateElement
      );
    },

    /**
     * Check if the node is returning null
     *
     * @param {ASTNode} ASTnode The AST node being checked
     * @returns {Boolean} True if the node is returning null, false if not
     */
    isReturningNull(ASTnode) {
      const nodeAndProperty = utils.getReturnPropertyAndNode(ASTnode);
      const property = nodeAndProperty.property;
      const node = nodeAndProperty.node;

      if (!node) {
        return false;
      }

      return node[property] && node[property].value === null;
    },

    /**
     * Check if the node is returning JSX or null
     *
     * @param {ASTNode} ASTnode The AST node being checked
     * @param {Boolean} [strict] If true, in a ternary condition the node must return JSX in both cases
     * @returns {Boolean} True if the node is returning JSX or null, false if not
     */
    isReturningJSXOrNull(ASTNode, strict) {
      return utils.isReturningJSX(ASTNode, strict) || utils.isReturningNull(ASTNode);
    },

    getPragmaComponentWrapper(node) {
      let isPragmaComponentWrapper;
      let currentNode = node;
      let prevNode;
      do {
        currentNode = currentNode.parent;
        isPragmaComponentWrapper = this.isPragmaComponentWrapper(currentNode);
        if (isPragmaComponentWrapper) {
          prevNode = currentNode;
        }
      } while (isPragmaComponentWrapper);

      return prevNode;
    },

    isPragmaComponentWrapper(node) {
      if (!node || node.type !== 'CallExpression') {
        return false;
      }
      const propertyNames = ['forwardRef', 'memo'];
      const calleeObject = node.callee.object;
      if (calleeObject && node.callee.property) {
        return arrayIncludes(propertyNames, node.callee.property.name) && calleeObject.name === pragma;
      }
      return arrayIncludes(propertyNames, node.callee.name) && this.isDestructuredFromPragmaImport(node.callee.name);
    },

    /**
     * Find a return statment in the current node
     *
     * @param {ASTNode} ASTnode The AST node being checked
     */
    findReturnStatement: astUtil.findReturnStatement,

    /**
     * Get the parent component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentComponent() {
      return (
        utils.getParentES6Component() ||
        utils.getParentES5Component() ||
        utils.getParentStatelessComponent()
      );
    },

    /**
     * Get the parent ES5 component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentES5Component() {
      let scope = context.getScope();
      while (scope) {
        const node = scope.block && scope.block.parent && scope.block.parent.parent;
        if (node && utils.isES5Component(node)) {
          return node;
        }
        scope = scope.upper;
      }
      return null;
    },

    /**
     * Get the parent ES6 component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentES6Component() {
      let scope = context.getScope();
      while (scope && scope.type !== 'class') {
        scope = scope.upper;
      }
      const node = scope && scope.block;
      if (!node || !utils.isES6Component(node)) {
        return null;
      }
      return node;
    },

    /**
     * Get the parent stateless component node from the current scope
     *
     * @returns {ASTNode} component node, null if we are not in a component
     */
    getParentStatelessComponent() {
      let scope = context.getScope();
      while (scope) {
        const node = scope.block;
        const isFunction = /Function/.test(node.type); // Functions
        const isArrowFunction = astUtil.isArrowFunction(node);
        const enclosingScope = isArrowFunction ? utils.getArrowFunctionScope(scope) : scope;
        const enclosingScopeParent = enclosingScope && enclosingScope.block.parent;
        const isClass = enclosingScope && astUtil.isClass(enclosingScope.block);
        const isMethod = enclosingScopeParent && enclosingScopeParent.type === 'MethodDefinition'; // Classes methods
        const isArgument = node.parent && node.parent.type === 'CallExpression'; // Arguments (callback, etc.)
        // Attribute Expressions inside JSX Elements (<button onClick={() => props.handleClick()}></button>)
        const isJSXExpressionContainer = node.parent && node.parent.type === 'JSXExpressionContainer';
        const pragmaComponentWrapper = this.getPragmaComponentWrapper(node);
        if (isFunction && pragmaComponentWrapper) {
          return pragmaComponentWrapper;
        }
        // Stop moving up if we reach a class or an argument (like a callback)
        if (isClass || isArgument) {
          return null;
        }
        // Return the node if it is a function that is not a class method and is not inside a JSX Element
        if (isFunction && !isMethod && !isJSXExpressionContainer && utils.isReturningJSXOrNull(node)) {
          return node;
        }
        scope = scope.upper;
      }
      return null;
    },

    /**
     * Get an enclosing scope used to find `this` value by an arrow function
     * @param {Scope} scope Current scope
     * @returns {Scope} An enclosing scope used by an arrow function
     */
    getArrowFunctionScope(scope) {
      scope = scope.upper;
      while (scope) {
        if (astUtil.isFunction(scope.block) || astUtil.isClass(scope.block)) {
          return scope;
        }
        scope = scope.upper;
      }
      return null;
    },

    /**
     * Get the related component from a node
     *
     * @param {ASTNode} node The AST node being checked (must be a MemberExpression).
     * @returns {ASTNode} component node, null if we cannot find the component
     */
    getRelatedComponent(node) {
      let i;
      let j;
      let k;
      let l;
      let componentNode;
      // Get the component path
      const componentPath = [];
      while (node) {
        if (node.property && node.property.type === 'Identifier') {
          componentPath.push(node.property.name);
        }
        if (node.object && node.object.type === 'Identifier') {
          componentPath.push(node.object.name);
        }
        node = node.object;
      }
      componentPath.reverse();
      const componentName = componentPath.slice(0, componentPath.length - 1).join('.');

      // Find the variable in the current scope
      const variableName = componentPath.shift();
      if (!variableName) {
        return null;
      }
      let variableInScope;
      const variables = variableUtil.variablesInScope(context);
      for (i = 0, j = variables.length; i < j; i++) {
        if (variables[i].name === variableName) {
          variableInScope = variables[i];
          break;
        }
      }
      if (!variableInScope) {
        return null;
      }

      // Try to find the component using variable references
      const refs = variableInScope.references;
      refs.some((ref) => {
        let refId = ref.identifier;
        if (refId.parent && refId.parent.type === 'MemberExpression') {
          refId = refId.parent;
        }
        if (sourceCode.getText(refId) !== componentName) {
          return false;
        }
        if (refId.type === 'MemberExpression') {
          componentNode = refId.parent.right;
        } else if (
          refId.parent &&
          refId.parent.type === 'VariableDeclarator' &&
          refId.parent.init &&
          refId.parent.init.type !== 'Identifier'
        ) {
          componentNode = refId.parent.init;
        }
        return true;
      });

      if (componentNode) {
        // Return the component
        return components.add(componentNode, 1);
      }

      // Try to find the component using variable declarations
      const defs = variableInScope.defs;
      const defInScope = defs.find(def => (
        def.type === 'ClassName' ||
        def.type === 'FunctionName' ||
        def.type === 'Variable'
      ));
      if (!defInScope || !defInScope.node) {
        return null;
      }
      componentNode = defInScope.node.init || defInScope.node;

      // Traverse the node properties to the component declaration
      for (i = 0, j = componentPath.length; i < j; i++) {
        if (!componentNode.properties) {
          continue; // eslint-disable-line no-continue
        }
        for (k = 0, l = componentNode.properties.length; k < l; k++) {
          if (componentNode.properties[k].key && componentNode.properties[k].key.name === componentPath[i]) {
            componentNode = componentNode.properties[k];
            break;
          }
        }
        if (!componentNode || !componentNode.value) {
          return null;
        }
        componentNode = componentNode.value;
      }

      // Return the component
      return components.add(componentNode, 1);
    }
  };

  // Component detection instructions
  const detectionInstructions = {
    CallExpression(node) {
      if (!utils.isPragmaComponentWrapper(node)) {
        return;
      }
      if (node.arguments.length > 0 && astUtil.isFunctionLikeExpression(node.arguments[0])) {
        components.add(node, 2);
      }
    },

    ClassExpression(node) {
      if (!utils.isES6Component(node)) {
        return;
      }
      components.add(node, 2);
    },

    ClassDeclaration(node) {
      if (!utils.isES6Component(node)) {
        return;
      }
      components.add(node, 2);
    },

    ClassProperty(node) {
      node = utils.getParentComponent();
      if (!node) {
        return;
      }
      components.add(node, 2);
    },

    ObjectExpression(node) {
      if (!utils.isES5Component(node)) {
        return;
      }
      components.add(node, 2);
    },

    FunctionExpression(node) {
      if (node.async) {
        components.add(node, 0);
        return;
      }
      const component = utils.getParentComponent();
      if (
        !component ||
        (component.parent && component.parent.type === 'JSXExpressionContainer')
      ) {
        // Ban the node if we cannot find a parent component
        components.add(node, 0);
        return;
      }
      components.add(component, 1);
    },

    FunctionDeclaration(node) {
      if (node.async) {
        components.add(node, 0);
        return;
      }
      node = utils.getParentComponent();
      if (!node) {
        return;
      }
      components.add(node, 1);
    },

    ArrowFunctionExpression(node) {
      if (node.async) {
        components.add(node, 0);
        return;
      }
      const component = utils.getParentComponent();
      if (
        !component ||
        (component.parent && component.parent.type === 'JSXExpressionContainer')
      ) {
        // Ban the node if we cannot find a parent component
        components.add(node, 0);
        return;
      }
      if (component.expression && utils.isReturningJSX(component)) {
        components.add(component, 2);
      } else {
        components.add(component, 1);
      }
    },

    ThisExpression(node) {
      const component = utils.getParentComponent();
      if (!component || !/Function/.test(component.type) || !node.parent.property) {
        return;
      }
      // Ban functions accessing a property on a ThisExpression
      components.add(node, 0);
    },

    ReturnStatement(node) {
      if (!utils.isReturningJSX(node)) {
        return;
      }
      node = utils.getParentComponent();
      if (!node) {
        const scope = context.getScope();
        components.add(scope.block, 1);
        return;
      }
      components.add(node, 2);
    }
  };

  // Update the provided rule instructions to add the component detection
  const ruleInstructions = rule(context, components, utils);
  const updatedRuleInstructions = Object.assign({}, ruleInstructions);
  const propTypesInstructions = propTypesUtil(context, components, utils);
  const usedPropTypesInstructions = usedPropTypesUtil(context, components, utils);
  const defaultPropsInstructions = defaultPropsUtil(context, components, utils);
  const allKeys = new Set(Object.keys(detectionInstructions).concat(
    Object.keys(propTypesInstructions),
    Object.keys(usedPropTypesInstructions),
    Object.keys(defaultPropsInstructions)
  ));

  allKeys.forEach((instruction) => {
    updatedRuleInstructions[instruction] = function (node) {
      if (instruction in detectionInstructions) {
        detectionInstructions[instruction](node);
      }
      if (instruction in propTypesInstructions) {
        propTypesInstructions[instruction](node);
      }
      if (instruction in usedPropTypesInstructions) {
        usedPropTypesInstructions[instruction](node);
      }
      if (instruction in defaultPropsInstructions) {
        defaultPropsInstructions[instruction](node);
      }
      if (ruleInstructions[instruction]) {
        return ruleInstructions[instruction](node);
      }
    };
  });

  // Return the updated rule instructions
  return updatedRuleInstructions;
}

module.exports = Object.assign(Components, {
  detect(rule) {
    return componentRule.bind(this, rule);
  }
});


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @fileoverview Main Doctrine object
 * @author Yusuke Suzuki <utatane.tea@gmail.com>
 * @author Dan Tao <daniel.tao@gmail.com>
 * @author Andrew Eisenberg <andrew@eisenberg.as>
 */

(function () {
    'use strict';

    var typed,
        utility,
        jsdoc,
        esutils,
        hasOwnProperty;

    esutils = __webpack_require__(52);
    typed = __webpack_require__(56);
    utility = __webpack_require__(57);

    function sliceSource(source, index, last) {
        return source.slice(index, last);
    }

    hasOwnProperty = (function () {
        var func = Object.prototype.hasOwnProperty;
        return function hasOwnProperty(obj, name) {
            return func.call(obj, name);
        };
    }());

    function shallowCopy(obj) {
        var ret = {}, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                ret[key] = obj[key];
            }
        }
        return ret;
    }

    function isASCIIAlphanumeric(ch) {
        return (ch >= 0x61  /* 'a' */ && ch <= 0x7A  /* 'z' */) ||
            (ch >= 0x41  /* 'A' */ && ch <= 0x5A  /* 'Z' */) ||
            (ch >= 0x30  /* '0' */ && ch <= 0x39  /* '9' */);
    }

    function isParamTitle(title) {
        return title === 'param' || title === 'argument' || title === 'arg';
    }

    function isReturnTitle(title) {
        return title === 'return' || title === 'returns';
    }

    function isProperty(title) {
        return title === 'property' || title === 'prop';
    }

    function isNameParameterRequired(title) {
        return isParamTitle(title) || isProperty(title) ||
            title === 'alias' || title === 'this' || title === 'mixes' || title === 'requires';
    }

    function isAllowedName(title) {
        return isNameParameterRequired(title) || title === 'const' || title === 'constant';
    }

    function isAllowedNested(title) {
        return isProperty(title) || isParamTitle(title);
    }

    function isAllowedOptional(title) {
        return isProperty(title) || isParamTitle(title);
    }

    function isTypeParameterRequired(title) {
        return isParamTitle(title) || isReturnTitle(title) ||
            title === 'define' || title === 'enum' ||
            title === 'implements' || title === 'this' ||
            title === 'type' || title === 'typedef' || isProperty(title);
    }

    // Consider deprecation instead using 'isTypeParameterRequired' and 'Rules' declaration to pick when a type is optional/required
    // This would require changes to 'parseType'
    function isAllowedType(title) {
        return isTypeParameterRequired(title) || title === 'throws' || title === 'const' || title === 'constant' ||
            title === 'namespace' || title === 'member' || title === 'var' || title === 'module' ||
            title === 'constructor' || title === 'class' || title === 'extends' || title === 'augments' ||
            title === 'public' || title === 'private' || title === 'protected';
    }

    // A regex character class that contains all whitespace except linebreak characters (\r, \n, \u2028, \u2029)
    var WHITESPACE = '[ \\f\\t\\v\\u00a0\\u1680\\u180e\\u2000-\\u200a\\u202f\\u205f\\u3000\\ufeff]';

    var STAR_MATCHER = '(' + WHITESPACE + '*(?:\\*' + WHITESPACE + '?)?)(.+|[\r\n\u2028\u2029])';

    function unwrapComment(doc) {
        // JSDoc comment is following form
        //   /**
        //    * .......
        //    */

        return doc.
            // remove /**
            replace(/^\/\*\*?/, '').
            // remove */
            replace(/\*\/$/, '').
            // remove ' * ' at the beginning of a line
            replace(new RegExp(STAR_MATCHER, 'g'), '$2').
            // remove trailing whitespace
            replace(/\s*$/, '');
    }

    /**
     * Converts an index in an "unwrapped" JSDoc comment to the corresponding index in the original "wrapped" version
     * @param {string} originalSource The original wrapped comment
     * @param {number} unwrappedIndex The index of a character in the unwrapped string
     * @returns {number} The index of the corresponding character in the original wrapped string
     */
    function convertUnwrappedCommentIndex(originalSource, unwrappedIndex) {
        var replacedSource = originalSource.replace(/^\/\*\*?/, '');
        var numSkippedChars = 0;
        var matcher = new RegExp(STAR_MATCHER, 'g');
        var match;

        while ((match = matcher.exec(replacedSource))) {
            numSkippedChars += match[1].length;

            if (match.index + match[0].length > unwrappedIndex + numSkippedChars) {
                return unwrappedIndex + numSkippedChars + originalSource.length - replacedSource.length;
            }
        }

        return originalSource.replace(/\*\/$/, '').replace(/\s*$/, '').length;
    }

    // JSDoc Tag Parser

    (function (exports) {
        var Rules,
            index,
            lineNumber,
            length,
            source,
            originalSource,
            recoverable,
            sloppy,
            strict;

        function advance() {
            var ch = source.charCodeAt(index);
            index += 1;
            if (esutils.code.isLineTerminator(ch) && !(ch === 0x0D  /* '\r' */ && source.charCodeAt(index) === 0x0A  /* '\n' */)) {
                lineNumber += 1;
            }
            return String.fromCharCode(ch);
        }

        function scanTitle() {
            var title = '';
            // waste '@'
            advance();

            while (index < length && isASCIIAlphanumeric(source.charCodeAt(index))) {
                title += advance();
            }

            return title;
        }

        function seekContent() {
            var ch, waiting, last = index;

            waiting = false;
            while (last < length) {
                ch = source.charCodeAt(last);
                if (esutils.code.isLineTerminator(ch) && !(ch === 0x0D  /* '\r' */ && source.charCodeAt(last + 1) === 0x0A  /* '\n' */)) {
                    waiting = true;
                } else if (waiting) {
                    if (ch === 0x40  /* '@' */) {
                        break;
                    }
                    if (!esutils.code.isWhiteSpace(ch)) {
                        waiting = false;
                    }
                }
                last += 1;
            }
            return last;
        }

        // type expression may have nest brace, such as,
        // { { ok: string } }
        //
        // therefore, scanning type expression with balancing braces.
        function parseType(title, last, addRange) {
            var ch, brace, type, startIndex, direct = false;


            // search '{'
            while (index < last) {
                ch = source.charCodeAt(index);
                if (esutils.code.isWhiteSpace(ch)) {
                    advance();
                } else if (ch === 0x7B  /* '{' */) {
                    advance();
                    break;
                } else {
                    // this is direct pattern
                    direct = true;
                    break;
                }
            }


            if (direct) {
                return null;
            }

            // type expression { is found
            brace = 1;
            type = '';
            while (index < last) {
                ch = source.charCodeAt(index);
                if (esutils.code.isLineTerminator(ch)) {
                    advance();
                } else {
                    if (ch === 0x7D  /* '}' */) {
                        brace -= 1;
                        if (brace === 0) {
                            advance();
                            break;
                        }
                    } else if (ch === 0x7B  /* '{' */) {
                        brace += 1;
                    }
                    if (type === '') {
                        startIndex = index;
                    }
                    type += advance();
                }
            }

            if (brace !== 0) {
                // braces is not balanced
                return utility.throwError('Braces are not balanced');
            }

            if (isAllowedOptional(title)) {
                return typed.parseParamType(type, {startIndex: convertIndex(startIndex), range: addRange});
            }

            return typed.parseType(type, {startIndex: convertIndex(startIndex), range: addRange});
        }

        function scanIdentifier(last) {
            var identifier;
            if (!esutils.code.isIdentifierStartES5(source.charCodeAt(index)) && !source[index].match(/[0-9]/)) {
                return null;
            }
            identifier = advance();
            while (index < last && esutils.code.isIdentifierPartES5(source.charCodeAt(index))) {
                identifier += advance();
            }
            return identifier;
        }

        function skipWhiteSpace(last) {
            while (index < last && (esutils.code.isWhiteSpace(source.charCodeAt(index)) || esutils.code.isLineTerminator(source.charCodeAt(index)))) {
                advance();
            }
        }

        function parseName(last, allowBrackets, allowNestedParams) {
            var name = '',
                useBrackets,
                insideString;


            skipWhiteSpace(last);

            if (index >= last) {
                return null;
            }

            if (source.charCodeAt(index) === 0x5B  /* '[' */) {
                if (allowBrackets) {
                    useBrackets = true;
                    name = advance();
                } else {
                    return null;
                }
            }

            name += scanIdentifier(last);

            if (allowNestedParams) {
                if (source.charCodeAt(index) === 0x3A /* ':' */ && (
                        name === 'module' ||
                        name === 'external' ||
                        name === 'event')) {
                    name += advance();
                    name += scanIdentifier(last);

                }
                if(source.charCodeAt(index) === 0x5B  /* '[' */ && source.charCodeAt(index + 1) === 0x5D  /* ']' */){
                    name += advance();
                    name += advance();
                }
                while (source.charCodeAt(index) === 0x2E  /* '.' */ ||
                        source.charCodeAt(index) === 0x2F  /* '/' */ ||
                        source.charCodeAt(index) === 0x23  /* '#' */ ||
                        source.charCodeAt(index) === 0x2D  /* '-' */ ||
                        source.charCodeAt(index) === 0x7E  /* '~' */) {
                    name += advance();
                    name += scanIdentifier(last);
                }
            }

            if (useBrackets) {
                skipWhiteSpace(last);
                // do we have a default value for this?
                if (source.charCodeAt(index) === 0x3D  /* '=' */) {
                    // consume the '='' symbol
                    name += advance();
                    skipWhiteSpace(last);

                    var ch;
                    var bracketDepth = 1;

                    // scan in the default value
                    while (index < last) {
                        ch = source.charCodeAt(index);

                        if (esutils.code.isWhiteSpace(ch)) {
                            if (!insideString) {
                                skipWhiteSpace(last);
                                ch = source.charCodeAt(index);
                            }
                        }

                        if (ch === 0x27 /* ''' */) {
                            if (!insideString) {
                                insideString = '\'';
                            } else {
                                if (insideString === '\'') {
                                    insideString = '';
                                }
                            }
                        }

                        if (ch === 0x22 /* '"' */) {
                            if (!insideString) {
                                insideString = '"';
                            } else {
                                if (insideString === '"') {
                                    insideString = '';
                                }
                            }
                        }

                        if (ch === 0x5B /* '[' */) {
                            bracketDepth++;
                        } else if (ch === 0x5D  /* ']' */ &&
                            --bracketDepth === 0) {
                            break;
                        }

                        name += advance();
                    }
                }

                skipWhiteSpace(last);

                if (index >= last || source.charCodeAt(index) !== 0x5D  /* ']' */) {
                    // we never found a closing ']'
                    return null;
                }

                // collect the last ']'
                name += advance();
            }

            return name;
        }

        function skipToTag() {
            while (index < length && source.charCodeAt(index) !== 0x40  /* '@' */) {
                advance();
            }
            if (index >= length) {
                return false;
            }
            utility.assert(source.charCodeAt(index) === 0x40  /* '@' */);
            return true;
        }

        function convertIndex(rangeIndex) {
            if (source === originalSource) {
                return rangeIndex;
            }
            return convertUnwrappedCommentIndex(originalSource, rangeIndex);
        }

        function TagParser(options, title) {
            this._options = options;
            this._title = title.toLowerCase();
            this._tag = {
                title: title,
                description: null
            };
            if (this._options.lineNumbers) {
                this._tag.lineNumber = lineNumber;
            }
            this._first = index - title.length - 1;
            this._last = 0;
            // space to save special information for title parsers.
            this._extra = { };
        }

        // addError(err, ...)
        TagParser.prototype.addError = function addError(errorText) {
            var args = Array.prototype.slice.call(arguments, 1),
                msg = errorText.replace(
                    /%(\d)/g,
                    function (whole, index) {
                        utility.assert(index < args.length, 'Message reference must be in range');
                        return args[index];
                    }
                );

            if (!this._tag.errors) {
                this._tag.errors = [];
            }
            if (strict) {
                utility.throwError(msg);
            }
            this._tag.errors.push(msg);
            return recoverable;
        };

        TagParser.prototype.parseType = function () {
            // type required titles
            if (isTypeParameterRequired(this._title)) {
                try {
                    this._tag.type = parseType(this._title, this._last, this._options.range);
                    if (!this._tag.type) {
                        if (!isParamTitle(this._title) && !isReturnTitle(this._title)) {
                            if (!this.addError('Missing or invalid tag type')) {
                                return false;
                            }
                        }
                    }
                } catch (error) {
                    this._tag.type = null;
                    if (!this.addError(error.message)) {
                        return false;
                    }
                }
            } else if (isAllowedType(this._title)) {
                // optional types
                try {
                    this._tag.type = parseType(this._title, this._last, this._options.range);
                } catch (e) {
                    //For optional types, lets drop the thrown error when we hit the end of the file
                }
            }
            return true;
        };

        TagParser.prototype._parseNamePath = function (optional) {
            var name;
            name = parseName(this._last, sloppy && isAllowedOptional(this._title), true);
            if (!name) {
                if (!optional) {
                    if (!this.addError('Missing or invalid tag name')) {
                        return false;
                    }
                }
            }
            this._tag.name = name;
            return true;
        };

        TagParser.prototype.parseNamePath = function () {
            return this._parseNamePath(false);
        };

        TagParser.prototype.parseNamePathOptional = function () {
            return this._parseNamePath(true);
        };


        TagParser.prototype.parseName = function () {
            var assign, name;

            // param, property requires name
            if (isAllowedName(this._title)) {
                this._tag.name = parseName(this._last, sloppy && isAllowedOptional(this._title), isAllowedNested(this._title));
                if (!this._tag.name) {
                    if (!isNameParameterRequired(this._title)) {
                        return true;
                    }

                    // it's possible the name has already been parsed but interpreted as a type
                    // it's also possible this is a sloppy declaration, in which case it will be
                    // fixed at the end
                    if (isParamTitle(this._title) && this._tag.type && this._tag.type.name) {
                        this._extra.name = this._tag.type;
                        this._tag.name = this._tag.type.name;
                        this._tag.type = null;
                    } else {
                        if (!this.addError('Missing or invalid tag name')) {
                            return false;
                        }
                    }
                } else {
                    name = this._tag.name;
                    if (name.charAt(0) === '[' && name.charAt(name.length - 1) === ']') {
                        // extract the default value if there is one
                        // example: @param {string} [somebody=John Doe] description
                        assign = name.substring(1, name.length - 1).split('=');
                        if (assign.length > 1) {
                            this._tag['default'] = assign.slice(1).join('=');
                        }
                        this._tag.name = assign[0];

                        // convert to an optional type
                        if (this._tag.type && this._tag.type.type !== 'OptionalType') {
                            this._tag.type = {
                                type: 'OptionalType',
                                expression: this._tag.type
                            };
                        }
                    }
                }
            }


            return true;
        };

        TagParser.prototype.parseDescription = function parseDescription() {
            var description = sliceSource(source, index, this._last).trim();
            if (description) {
                if ((/^-\s+/).test(description)) {
                    description = description.substring(2);
                }
                this._tag.description = description;
            }
            return true;
        };

        TagParser.prototype.parseCaption = function parseDescription() {
            var description = sliceSource(source, index, this._last).trim();
            var captionStartTag = '<caption>';
            var captionEndTag = '</caption>';
            var captionStart = description.indexOf(captionStartTag);
            var captionEnd = description.indexOf(captionEndTag);
            if (captionStart >= 0 && captionEnd >= 0) {
                this._tag.caption = description.substring(
                    captionStart + captionStartTag.length, captionEnd).trim();
                this._tag.description = description.substring(captionEnd + captionEndTag.length).trim();
            } else {
                this._tag.description = description;
            }
            return true;
        };

        TagParser.prototype.parseKind = function parseKind() {
            var kind, kinds;
            kinds = {
                'class': true,
                'constant': true,
                'event': true,
                'external': true,
                'file': true,
                'function': true,
                'member': true,
                'mixin': true,
                'module': true,
                'namespace': true,
                'typedef': true
            };
            kind = sliceSource(source, index, this._last).trim();
            this._tag.kind = kind;
            if (!hasOwnProperty(kinds, kind)) {
                if (!this.addError('Invalid kind name \'%0\'', kind)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.parseAccess = function parseAccess() {
            var access;
            access = sliceSource(source, index, this._last).trim();
            this._tag.access = access;
            if (access !== 'private' && access !== 'protected' && access !== 'public') {
                if (!this.addError('Invalid access name \'%0\'', access)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.parseThis = function parseThis() {
            // this name may be a name expression (e.g. {foo.bar}),
            // an union (e.g. {foo.bar|foo.baz}) or a name path (e.g. foo.bar)
            var value = sliceSource(source, index, this._last).trim();
            if (value && value.charAt(0) === '{') {
                var gotType = this.parseType();
                if (gotType && this._tag.type.type === 'NameExpression' || this._tag.type.type === 'UnionType') {
                    this._tag.name = this._tag.type.name;
                    return true;
                } else {
                    return this.addError('Invalid name for this');
                }
            } else {
                return this.parseNamePath();
            }
        };

        TagParser.prototype.parseVariation = function parseVariation() {
            var variation, text;
            text = sliceSource(source, index, this._last).trim();
            variation = parseFloat(text, 10);
            this._tag.variation = variation;
            if (isNaN(variation)) {
                if (!this.addError('Invalid variation \'%0\'', text)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.ensureEnd = function () {
            var shouldBeEmpty = sliceSource(source, index, this._last).trim();
            if (shouldBeEmpty) {
                if (!this.addError('Unknown content \'%0\'', shouldBeEmpty)) {
                    return false;
                }
            }
            return true;
        };

        TagParser.prototype.epilogue = function epilogue() {
            var description;

            description = this._tag.description;
            // un-fix potentially sloppy declaration
            if (isAllowedOptional(this._title) && !this._tag.type && description && description.charAt(0) === '[') {
                this._tag.type = this._extra.name;
                if (!this._tag.name) {
                    this._tag.name = undefined;
                }

                if (!sloppy) {
                    if (!this.addError('Missing or invalid tag name')) {
                        return false;
                    }
                }
            }

            return true;
        };

        Rules = {
            // http://usejsdoc.org/tags-access.html
            'access': ['parseAccess'],
            // http://usejsdoc.org/tags-alias.html
            'alias': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-augments.html
            'augments': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-constructor.html
            'constructor': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-constructor.html
            'class': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-extends.html
            'extends': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-example.html
            'example': ['parseCaption'],
            // http://usejsdoc.org/tags-deprecated.html
            'deprecated': ['parseDescription'],
            // http://usejsdoc.org/tags-global.html
            'global': ['ensureEnd'],
            // http://usejsdoc.org/tags-inner.html
            'inner': ['ensureEnd'],
            // http://usejsdoc.org/tags-instance.html
            'instance': ['ensureEnd'],
            // http://usejsdoc.org/tags-kind.html
            'kind': ['parseKind'],
            // http://usejsdoc.org/tags-mixes.html
            'mixes': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-mixin.html
            'mixin': ['parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-member.html
            'member': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-method.html
            'method': ['parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-module.html
            'module': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-method.html
            'func': ['parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-method.html
            'function': ['parseNamePathOptional', 'ensureEnd'],
            // Synonym: http://usejsdoc.org/tags-member.html
            'var': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-name.html
            'name': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-namespace.html
            'namespace': ['parseType', 'parseNamePathOptional', 'ensureEnd'],
            // http://usejsdoc.org/tags-private.html
            'private': ['parseType', 'parseDescription'],
            // http://usejsdoc.org/tags-protected.html
            'protected': ['parseType', 'parseDescription'],
            // http://usejsdoc.org/tags-public.html
            'public': ['parseType', 'parseDescription'],
            // http://usejsdoc.org/tags-readonly.html
            'readonly': ['ensureEnd'],
            // http://usejsdoc.org/tags-requires.html
            'requires': ['parseNamePath', 'ensureEnd'],
            // http://usejsdoc.org/tags-since.html
            'since': ['parseDescription'],
            // http://usejsdoc.org/tags-static.html
            'static': ['ensureEnd'],
            // http://usejsdoc.org/tags-summary.html
            'summary': ['parseDescription'],
            // http://usejsdoc.org/tags-this.html
            'this': ['parseThis', 'ensureEnd'],
            // http://usejsdoc.org/tags-todo.html
            'todo': ['parseDescription'],
            // http://usejsdoc.org/tags-typedef.html
            'typedef': ['parseType', 'parseNamePathOptional'],
            // http://usejsdoc.org/tags-variation.html
            'variation': ['parseVariation'],
            // http://usejsdoc.org/tags-version.html
            'version': ['parseDescription']
        };

        TagParser.prototype.parse = function parse() {
            var i, iz, sequences, method;


            // empty title
            if (!this._title) {
                if (!this.addError('Missing or invalid title')) {
                    return null;
                }
            }

            // Seek to content last index.
            this._last = seekContent(this._title);

            if (this._options.range) {
                this._tag.range = [this._first, source.slice(0, this._last).replace(/\s*$/, '').length].map(convertIndex);
            }

            if (hasOwnProperty(Rules, this._title)) {
                sequences = Rules[this._title];
            } else {
                // default sequences
                sequences = ['parseType', 'parseName', 'parseDescription', 'epilogue'];
            }

            for (i = 0, iz = sequences.length; i < iz; ++i) {
                method = sequences[i];
                if (!this[method]()) {
                    return null;
                }
            }

            return this._tag;
        };

        function parseTag(options) {
            var title, parser, tag;

            // skip to tag
            if (!skipToTag()) {
                return null;
            }

            // scan title
            title = scanTitle();

            // construct tag parser
            parser = new TagParser(options, title);
            tag = parser.parse();

            // Seek global index to end of this tag.
            while (index < parser._last) {
                advance();
            }

            return tag;
        }

        //
        // Parse JSDoc
        //

        function scanJSDocDescription(preserveWhitespace) {
            var description = '', ch, atAllowed;

            atAllowed = true;
            while (index < length) {
                ch = source.charCodeAt(index);

                if (atAllowed && ch === 0x40  /* '@' */) {
                    break;
                }

                if (esutils.code.isLineTerminator(ch)) {
                    atAllowed = true;
                } else if (atAllowed && !esutils.code.isWhiteSpace(ch)) {
                    atAllowed = false;
                }

                description += advance();
            }

            return preserveWhitespace ? description : description.trim();
        }

        function parse(comment, options) {
            var tags = [], tag, description, interestingTags, i, iz;

            if (options === undefined) {
                options = {};
            }

            if (typeof options.unwrap === 'boolean' && options.unwrap) {
                source = unwrapComment(comment);
            } else {
                source = comment;
            }

            originalSource = comment;

            // array of relevant tags
            if (options.tags) {
                if (Array.isArray(options.tags)) {
                    interestingTags = { };
                    for (i = 0, iz = options.tags.length; i < iz; i++) {
                        if (typeof options.tags[i] === 'string') {
                            interestingTags[options.tags[i]] = true;
                        } else {
                            utility.throwError('Invalid "tags" parameter: ' + options.tags);
                        }
                    }
                } else {
                    utility.throwError('Invalid "tags" parameter: ' + options.tags);
                }
            }

            length = source.length;
            index = 0;
            lineNumber = 0;
            recoverable = options.recoverable;
            sloppy = options.sloppy;
            strict = options.strict;

            description = scanJSDocDescription(options.preserveWhitespace);

            while (true) {
                tag = parseTag(options);
                if (!tag) {
                    break;
                }
                if (!interestingTags || interestingTags.hasOwnProperty(tag.title)) {
                    tags.push(tag);
                }
            }

            return {
                description: description,
                tags: tags
            };
        }
        exports.parse = parse;
    }(jsdoc = {}));

    exports.version = utility.VERSION;
    exports.parse = jsdoc.parse;
    exports.parseType = typed.parseType;
    exports.parseParamType = typed.parseParamType;
    exports.unwrapComment = unwrapComment;
    exports.Syntax = shallowCopy(typed.Syntax);
    exports.Error = utility.DoctrineError;
    exports.type = {
        Syntax: exports.Syntax,
        parseType: typed.parseType,
        parseParamType: typed.parseParamType,
        stringify: typed.stringify
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/


(function () {
    'use strict';

    exports.ast = __webpack_require__(53);
    exports.code = __webpack_require__(54);
    exports.keyword = __webpack_require__(55);
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 53 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS'
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    function isExpression(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'ArrayExpression':
            case 'AssignmentExpression':
            case 'BinaryExpression':
            case 'CallExpression':
            case 'ConditionalExpression':
            case 'FunctionExpression':
            case 'Identifier':
            case 'Literal':
            case 'LogicalExpression':
            case 'MemberExpression':
            case 'NewExpression':
            case 'ObjectExpression':
            case 'SequenceExpression':
            case 'ThisExpression':
            case 'UnaryExpression':
            case 'UpdateExpression':
                return true;
        }
        return false;
    }

    function isIterationStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'DoWhileStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'WhileStatement':
                return true;
        }
        return false;
    }

    function isStatement(node) {
        if (node == null) { return false; }
        switch (node.type) {
            case 'BlockStatement':
            case 'BreakStatement':
            case 'ContinueStatement':
            case 'DebuggerStatement':
            case 'DoWhileStatement':
            case 'EmptyStatement':
            case 'ExpressionStatement':
            case 'ForInStatement':
            case 'ForStatement':
            case 'IfStatement':
            case 'LabeledStatement':
            case 'ReturnStatement':
            case 'SwitchStatement':
            case 'ThrowStatement':
            case 'TryStatement':
            case 'VariableDeclaration':
            case 'WhileStatement':
            case 'WithStatement':
                return true;
        }
        return false;
    }

    function isSourceElement(node) {
      return isStatement(node) || node != null && node.type === 'FunctionDeclaration';
    }

    function trailingStatement(node) {
        switch (node.type) {
        case 'IfStatement':
            if (node.alternate != null) {
                return node.alternate;
            }
            return node.consequent;

        case 'LabeledStatement':
        case 'ForStatement':
        case 'ForInStatement':
        case 'WhileStatement':
        case 'WithStatement':
            return node.body;
        }
        return null;
    }

    function isProblematicIfStatement(node) {
        var current;

        if (node.type !== 'IfStatement') {
            return false;
        }
        if (node.alternate == null) {
            return false;
        }
        current = node.consequent;
        do {
            if (current.type === 'IfStatement') {
                if (current.alternate == null)  {
                    return true;
                }
            }
            current = trailingStatement(current);
        } while (current);

        return false;
    }

    module.exports = {
        isExpression: isExpression,
        isStatement: isStatement,
        isIterationStatement: isIterationStatement,
        isSourceElement: isSourceElement,
        isProblematicIfStatement: isProblematicIfStatement,

        trailingStatement: trailingStatement
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 54 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2013-2014 Yusuke Suzuki <utatane.tea@gmail.com>
  Copyright (C) 2014 Ivan Nikulin <ifaaan@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var ES6Regex, ES5Regex, NON_ASCII_WHITESPACES, IDENTIFIER_START, IDENTIFIER_PART, ch;

    // See `tools/generate-identifier-regex.js`.
    ES5Regex = {
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/,
        // ECMAScript 5.1/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]/
    };

    ES6Regex = {
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierStart:
        NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
        // ECMAScript 6/Unicode v9.0.0 NonAsciiIdentifierPart:
        NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
    };

    function isDecimalDigit(ch) {
        return 0x30 <= ch && ch <= 0x39;  // 0..9
    }

    function isHexDigit(ch) {
        return 0x30 <= ch && ch <= 0x39 ||  // 0..9
            0x61 <= ch && ch <= 0x66 ||     // a..f
            0x41 <= ch && ch <= 0x46;       // A..F
    }

    function isOctalDigit(ch) {
        return ch >= 0x30 && ch <= 0x37;  // 0..7
    }

    // 7.2 White Space

    NON_ASCII_WHITESPACES = [
        0x1680,
        0x2000, 0x2001, 0x2002, 0x2003, 0x2004, 0x2005, 0x2006, 0x2007, 0x2008, 0x2009, 0x200A,
        0x202F, 0x205F,
        0x3000,
        0xFEFF
    ];

    function isWhiteSpace(ch) {
        return ch === 0x20 || ch === 0x09 || ch === 0x0B || ch === 0x0C || ch === 0xA0 ||
            ch >= 0x1680 && NON_ASCII_WHITESPACES.indexOf(ch) >= 0;
    }

    // 7.3 Line Terminators

    function isLineTerminator(ch) {
        return ch === 0x0A || ch === 0x0D || ch === 0x2028 || ch === 0x2029;
    }

    // 7.6 Identifier Names and Identifiers

    function fromCodePoint(cp) {
        if (cp <= 0xFFFF) { return String.fromCharCode(cp); }
        var cu1 = String.fromCharCode(Math.floor((cp - 0x10000) / 0x400) + 0xD800);
        var cu2 = String.fromCharCode(((cp - 0x10000) % 0x400) + 0xDC00);
        return cu1 + cu2;
    }

    IDENTIFIER_START = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_START[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    IDENTIFIER_PART = new Array(0x80);
    for(ch = 0; ch < 0x80; ++ch) {
        IDENTIFIER_PART[ch] =
            ch >= 0x61 && ch <= 0x7A ||  // a..z
            ch >= 0x41 && ch <= 0x5A ||  // A..Z
            ch >= 0x30 && ch <= 0x39 ||  // 0..9
            ch === 0x24 || ch === 0x5F;  // $ (dollar) and _ (underscore)
    }

    function isIdentifierStartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES5Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES5(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES5Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    function isIdentifierStartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_START[ch] : ES6Regex.NonAsciiIdentifierStart.test(fromCodePoint(ch));
    }

    function isIdentifierPartES6(ch) {
        return ch < 0x80 ? IDENTIFIER_PART[ch] : ES6Regex.NonAsciiIdentifierPart.test(fromCodePoint(ch));
    }

    module.exports = {
        isDecimalDigit: isDecimalDigit,
        isHexDigit: isHexDigit,
        isOctalDigit: isOctalDigit,
        isWhiteSpace: isWhiteSpace,
        isLineTerminator: isLineTerminator,
        isIdentifierStartES5: isIdentifierStartES5,
        isIdentifierPartES5: isIdentifierPartES5,
        isIdentifierStartES6: isIdentifierStartES6,
        isIdentifierPartES6: isIdentifierPartES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2013 Yusuke Suzuki <utatane.tea@gmail.com>

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function () {
    'use strict';

    var code = __webpack_require__(54);

    function isStrictModeReservedWordES6(id) {
        switch (id) {
        case 'implements':
        case 'interface':
        case 'package':
        case 'private':
        case 'protected':
        case 'public':
        case 'static':
        case 'let':
            return true;
        default:
            return false;
        }
    }

    function isKeywordES5(id, strict) {
        // yield should not be treated as keyword under non-strict mode.
        if (!strict && id === 'yield') {
            return false;
        }
        return isKeywordES6(id, strict);
    }

    function isKeywordES6(id, strict) {
        if (strict && isStrictModeReservedWordES6(id)) {
            return true;
        }

        switch (id.length) {
        case 2:
            return (id === 'if') || (id === 'in') || (id === 'do');
        case 3:
            return (id === 'var') || (id === 'for') || (id === 'new') || (id === 'try');
        case 4:
            return (id === 'this') || (id === 'else') || (id === 'case') ||
                (id === 'void') || (id === 'with') || (id === 'enum');
        case 5:
            return (id === 'while') || (id === 'break') || (id === 'catch') ||
                (id === 'throw') || (id === 'const') || (id === 'yield') ||
                (id === 'class') || (id === 'super');
        case 6:
            return (id === 'return') || (id === 'typeof') || (id === 'delete') ||
                (id === 'switch') || (id === 'export') || (id === 'import');
        case 7:
            return (id === 'default') || (id === 'finally') || (id === 'extends');
        case 8:
            return (id === 'function') || (id === 'continue') || (id === 'debugger');
        case 10:
            return (id === 'instanceof');
        default:
            return false;
        }
    }

    function isReservedWordES5(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES5(id, strict);
    }

    function isReservedWordES6(id, strict) {
        return id === 'null' || id === 'true' || id === 'false' || isKeywordES6(id, strict);
    }

    function isRestrictedWord(id) {
        return id === 'eval' || id === 'arguments';
    }

    function isIdentifierNameES5(id) {
        var i, iz, ch;

        if (id.length === 0) { return false; }

        ch = id.charCodeAt(0);
        if (!code.isIdentifierStartES5(ch)) {
            return false;
        }

        for (i = 1, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (!code.isIdentifierPartES5(ch)) {
                return false;
            }
        }
        return true;
    }

    function decodeUtf16(lead, trail) {
        return (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
    }

    function isIdentifierNameES6(id) {
        var i, iz, ch, lowCh, check;

        if (id.length === 0) { return false; }

        check = code.isIdentifierStartES6;
        for (i = 0, iz = id.length; i < iz; ++i) {
            ch = id.charCodeAt(i);
            if (0xD800 <= ch && ch <= 0xDBFF) {
                ++i;
                if (i >= iz) { return false; }
                lowCh = id.charCodeAt(i);
                if (!(0xDC00 <= lowCh && lowCh <= 0xDFFF)) {
                    return false;
                }
                ch = decodeUtf16(ch, lowCh);
            }
            if (!check(ch)) {
                return false;
            }
            check = code.isIdentifierPartES6;
        }
        return true;
    }

    function isIdentifierES5(id, strict) {
        return isIdentifierNameES5(id) && !isReservedWordES5(id, strict);
    }

    function isIdentifierES6(id, strict) {
        return isIdentifierNameES6(id) && !isReservedWordES6(id, strict);
    }

    module.exports = {
        isKeywordES5: isKeywordES5,
        isKeywordES6: isKeywordES6,
        isReservedWordES5: isReservedWordES5,
        isReservedWordES6: isReservedWordES6,
        isRestrictedWord: isRestrictedWord,
        isIdentifierNameES5: isIdentifierNameES5,
        isIdentifierNameES6: isIdentifierNameES6,
        isIdentifierES5: isIdentifierES5,
        isIdentifierES6: isIdentifierES6
    };
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @fileoverview Type expression parser.
 * @author Yusuke Suzuki <utatane.tea@gmail.com>
 * @author Dan Tao <daniel.tao@gmail.com>
 * @author Andrew Eisenberg <andrew@eisenberg.as>
 */

// "typed", the Type Expression Parser for doctrine.

(function () {
    'use strict';

    var Syntax,
        Token,
        source,
        length,
        index,
        previous,
        token,
        value,
        esutils,
        utility,
        rangeOffset,
        addRange;

    esutils = __webpack_require__(52);
    utility = __webpack_require__(57);

    Syntax = {
        NullableLiteral: 'NullableLiteral',
        AllLiteral: 'AllLiteral',
        NullLiteral: 'NullLiteral',
        UndefinedLiteral: 'UndefinedLiteral',
        VoidLiteral: 'VoidLiteral',
        UnionType: 'UnionType',
        ArrayType: 'ArrayType',
        RecordType: 'RecordType',
        FieldType: 'FieldType',
        FunctionType: 'FunctionType',
        ParameterType: 'ParameterType',
        RestType: 'RestType',
        NonNullableType: 'NonNullableType',
        OptionalType: 'OptionalType',
        NullableType: 'NullableType',
        NameExpression: 'NameExpression',
        TypeApplication: 'TypeApplication',
        StringLiteralType: 'StringLiteralType',
        NumericLiteralType: 'NumericLiteralType',
        BooleanLiteralType: 'BooleanLiteralType'
    };

    Token = {
        ILLEGAL: 0,    // ILLEGAL
        DOT_LT: 1,     // .<
        REST: 2,       // ...
        LT: 3,         // <
        GT: 4,         // >
        LPAREN: 5,     // (
        RPAREN: 6,     // )
        LBRACE: 7,     // {
        RBRACE: 8,     // }
        LBRACK: 9,    // [
        RBRACK: 10,    // ]
        COMMA: 11,     // ,
        COLON: 12,     // :
        STAR: 13,      // *
        PIPE: 14,      // |
        QUESTION: 15,  // ?
        BANG: 16,      // !
        EQUAL: 17,     // =
        NAME: 18,      // name token
        STRING: 19,    // string
        NUMBER: 20,    // number
        EOF: 21
    };

    function isTypeName(ch) {
        return '><(){}[],:*|?!='.indexOf(String.fromCharCode(ch)) === -1 && !esutils.code.isWhiteSpace(ch) && !esutils.code.isLineTerminator(ch);
    }

    function Context(previous, index, token, value) {
        this._previous = previous;
        this._index = index;
        this._token = token;
        this._value = value;
    }

    Context.prototype.restore = function () {
        previous = this._previous;
        index = this._index;
        token = this._token;
        value = this._value;
    };

    Context.save = function () {
        return new Context(previous, index, token, value);
    };

    function maybeAddRange(node, range) {
        if (addRange) {
            node.range = [range[0] + rangeOffset, range[1] + rangeOffset];
        }
        return node;
    }

    function advance() {
        var ch = source.charAt(index);
        index += 1;
        return ch;
    }

    function scanHexEscape(prefix) {
        var i, len, ch, code = 0;

        len = (prefix === 'u') ? 4 : 2;
        for (i = 0; i < len; ++i) {
            if (index < length && esutils.code.isHexDigit(source.charCodeAt(index))) {
                ch = advance();
                code = code * 16 + '0123456789abcdef'.indexOf(ch.toLowerCase());
            } else {
                return '';
            }
        }
        return String.fromCharCode(code);
    }

    function scanString() {
        var str = '', quote, ch, code, unescaped, restore; //TODO review removal octal = false
        quote = source.charAt(index);
        ++index;

        while (index < length) {
            ch = advance();

            if (ch === quote) {
                quote = '';
                break;
            } else if (ch === '\\') {
                ch = advance();
                if (!esutils.code.isLineTerminator(ch.charCodeAt(0))) {
                    switch (ch) {
                    case 'n':
                        str += '\n';
                        break;
                    case 'r':
                        str += '\r';
                        break;
                    case 't':
                        str += '\t';
                        break;
                    case 'u':
                    case 'x':
                        restore = index;
                        unescaped = scanHexEscape(ch);
                        if (unescaped) {
                            str += unescaped;
                        } else {
                            index = restore;
                            str += ch;
                        }
                        break;
                    case 'b':
                        str += '\b';
                        break;
                    case 'f':
                        str += '\f';
                        break;
                    case 'v':
                        str += '\v';
                        break;

                    default:
                        if (esutils.code.isOctalDigit(ch.charCodeAt(0))) {
                            code = '01234567'.indexOf(ch);

                            // \0 is not octal escape sequence
                            // Deprecating unused code. TODO review removal
                            //if (code !== 0) {
                            //    octal = true;
                            //}

                            if (index < length && esutils.code.isOctalDigit(source.charCodeAt(index))) {
                                //TODO Review Removal octal = true;
                                code = code * 8 + '01234567'.indexOf(advance());

                                // 3 digits are only allowed when string starts
                                // with 0, 1, 2, 3
                                if ('0123'.indexOf(ch) >= 0 &&
                                        index < length &&
                                        esutils.code.isOctalDigit(source.charCodeAt(index))) {
                                    code = code * 8 + '01234567'.indexOf(advance());
                                }
                            }
                            str += String.fromCharCode(code);
                        } else {
                            str += ch;
                        }
                        break;
                    }
                } else {
                    if (ch ===  '\r' && source.charCodeAt(index) === 0x0A  /* '\n' */) {
                        ++index;
                    }
                }
            } else if (esutils.code.isLineTerminator(ch.charCodeAt(0))) {
                break;
            } else {
                str += ch;
            }
        }

        if (quote !== '') {
            utility.throwError('unexpected quote');
        }

        value = str;
        return Token.STRING;
    }

    function scanNumber() {
        var number, ch;

        number = '';
        ch = source.charCodeAt(index);

        if (ch !== 0x2E  /* '.' */) {
            number = advance();
            ch = source.charCodeAt(index);

            if (number === '0') {
                if (ch === 0x78  /* 'x' */ || ch === 0x58  /* 'X' */) {
                    number += advance();
                    while (index < length) {
                        ch = source.charCodeAt(index);
                        if (!esutils.code.isHexDigit(ch)) {
                            break;
                        }
                        number += advance();
                    }

                    if (number.length <= 2) {
                        // only 0x
                        utility.throwError('unexpected token');
                    }

                    if (index < length) {
                        ch = source.charCodeAt(index);
                        if (esutils.code.isIdentifierStartES5(ch)) {
                            utility.throwError('unexpected token');
                        }
                    }
                    value = parseInt(number, 16);
                    return Token.NUMBER;
                }

                if (esutils.code.isOctalDigit(ch)) {
                    number += advance();
                    while (index < length) {
                        ch = source.charCodeAt(index);
                        if (!esutils.code.isOctalDigit(ch)) {
                            break;
                        }
                        number += advance();
                    }

                    if (index < length) {
                        ch = source.charCodeAt(index);
                        if (esutils.code.isIdentifierStartES5(ch) || esutils.code.isDecimalDigit(ch)) {
                            utility.throwError('unexpected token');
                        }
                    }
                    value = parseInt(number, 8);
                    return Token.NUMBER;
                }

                if (esutils.code.isDecimalDigit(ch)) {
                    utility.throwError('unexpected token');
                }
            }

            while (index < length) {
                ch = source.charCodeAt(index);
                if (!esutils.code.isDecimalDigit(ch)) {
                    break;
                }
                number += advance();
            }
        }

        if (ch === 0x2E  /* '.' */) {
            number += advance();
            while (index < length) {
                ch = source.charCodeAt(index);
                if (!esutils.code.isDecimalDigit(ch)) {
                    break;
                }
                number += advance();
            }
        }

        if (ch === 0x65  /* 'e' */ || ch === 0x45  /* 'E' */) {
            number += advance();

            ch = source.charCodeAt(index);
            if (ch === 0x2B  /* '+' */ || ch === 0x2D  /* '-' */) {
                number += advance();
            }

            ch = source.charCodeAt(index);
            if (esutils.code.isDecimalDigit(ch)) {
                number += advance();
                while (index < length) {
                    ch = source.charCodeAt(index);
                    if (!esutils.code.isDecimalDigit(ch)) {
                        break;
                    }
                    number += advance();
                }
            } else {
                utility.throwError('unexpected token');
            }
        }

        if (index < length) {
            ch = source.charCodeAt(index);
            if (esutils.code.isIdentifierStartES5(ch)) {
                utility.throwError('unexpected token');
            }
        }

        value = parseFloat(number);
        return Token.NUMBER;
    }


    function scanTypeName() {
        var ch, ch2;

        value = advance();
        while (index < length && isTypeName(source.charCodeAt(index))) {
            ch = source.charCodeAt(index);
            if (ch === 0x2E  /* '.' */) {
                if ((index + 1) >= length) {
                    return Token.ILLEGAL;
                }
                ch2 = source.charCodeAt(index + 1);
                if (ch2 === 0x3C  /* '<' */) {
                    break;
                }
            }
            value += advance();
        }
        return Token.NAME;
    }

    function next() {
        var ch;

        previous = index;

        while (index < length && esutils.code.isWhiteSpace(source.charCodeAt(index))) {
            advance();
        }
        if (index >= length) {
            token = Token.EOF;
            return token;
        }

        ch = source.charCodeAt(index);
        switch (ch) {
        case 0x27:  /* ''' */
        case 0x22:  /* '"' */
            token = scanString();
            return token;

        case 0x3A:  /* ':' */
            advance();
            token = Token.COLON;
            return token;

        case 0x2C:  /* ',' */
            advance();
            token = Token.COMMA;
            return token;

        case 0x28:  /* '(' */
            advance();
            token = Token.LPAREN;
            return token;

        case 0x29:  /* ')' */
            advance();
            token = Token.RPAREN;
            return token;

        case 0x5B:  /* '[' */
            advance();
            token = Token.LBRACK;
            return token;

        case 0x5D:  /* ']' */
            advance();
            token = Token.RBRACK;
            return token;

        case 0x7B:  /* '{' */
            advance();
            token = Token.LBRACE;
            return token;

        case 0x7D:  /* '}' */
            advance();
            token = Token.RBRACE;
            return token;

        case 0x2E:  /* '.' */
            if (index + 1 < length) {
                ch = source.charCodeAt(index + 1);
                if (ch === 0x3C  /* '<' */) {
                    advance();  // '.'
                    advance();  // '<'
                    token = Token.DOT_LT;
                    return token;
                }

                if (ch === 0x2E  /* '.' */ && index + 2 < length && source.charCodeAt(index + 2) === 0x2E  /* '.' */) {
                    advance();  // '.'
                    advance();  // '.'
                    advance();  // '.'
                    token = Token.REST;
                    return token;
                }

                if (esutils.code.isDecimalDigit(ch)) {
                    token = scanNumber();
                    return token;
                }
            }
            token = Token.ILLEGAL;
            return token;

        case 0x3C:  /* '<' */
            advance();
            token = Token.LT;
            return token;

        case 0x3E:  /* '>' */
            advance();
            token = Token.GT;
            return token;

        case 0x2A:  /* '*' */
            advance();
            token = Token.STAR;
            return token;

        case 0x7C:  /* '|' */
            advance();
            token = Token.PIPE;
            return token;

        case 0x3F:  /* '?' */
            advance();
            token = Token.QUESTION;
            return token;

        case 0x21:  /* '!' */
            advance();
            token = Token.BANG;
            return token;

        case 0x3D:  /* '=' */
            advance();
            token = Token.EQUAL;
            return token;

        case 0x2D: /* '-' */
            token = scanNumber();
            return token;

        default:
            if (esutils.code.isDecimalDigit(ch)) {
                token = scanNumber();
                return token;
            }

            // type string permits following case,
            //
            // namespace.module.MyClass
            //
            // this reduced 1 token TK_NAME
            utility.assert(isTypeName(ch));
            token = scanTypeName();
            return token;
        }
    }

    function consume(target, text) {
        utility.assert(token === target, text || 'consumed token not matched');
        next();
    }

    function expect(target, message) {
        if (token !== target) {
            utility.throwError(message || 'unexpected token');
        }
        next();
    }

    // UnionType := '(' TypeUnionList ')'
    //
    // TypeUnionList :=
    //     <<empty>>
    //   | NonemptyTypeUnionList
    //
    // NonemptyTypeUnionList :=
    //     TypeExpression
    //   | TypeExpression '|' NonemptyTypeUnionList
    function parseUnionType() {
        var elements, startIndex = index - 1;
        consume(Token.LPAREN, 'UnionType should start with (');
        elements = [];
        if (token !== Token.RPAREN) {
            while (true) {
                elements.push(parseTypeExpression());
                if (token === Token.RPAREN) {
                    break;
                }
                expect(Token.PIPE);
            }
        }
        consume(Token.RPAREN, 'UnionType should end with )');
        return maybeAddRange({
            type: Syntax.UnionType,
            elements: elements
        }, [startIndex, previous]);
    }

    // ArrayType := '[' ElementTypeList ']'
    //
    // ElementTypeList :=
    //     <<empty>>
    //  | TypeExpression
    //  | '...' TypeExpression
    //  | TypeExpression ',' ElementTypeList
    function parseArrayType() {
        var elements, startIndex = index - 1, restStartIndex;
        consume(Token.LBRACK, 'ArrayType should start with [');
        elements = [];
        while (token !== Token.RBRACK) {
            if (token === Token.REST) {
                restStartIndex = index - 3;
                consume(Token.REST);
                elements.push(maybeAddRange({
                    type: Syntax.RestType,
                    expression: parseTypeExpression()
                }, [restStartIndex, previous]));
                break;
            } else {
                elements.push(parseTypeExpression());
            }
            if (token !== Token.RBRACK) {
                expect(Token.COMMA);
            }
        }
        expect(Token.RBRACK);
        return maybeAddRange({
            type: Syntax.ArrayType,
            elements: elements
        }, [startIndex, previous]);
    }

    function parseFieldName() {
        var v = value;
        if (token === Token.NAME || token === Token.STRING) {
            next();
            return v;
        }

        if (token === Token.NUMBER) {
            consume(Token.NUMBER);
            return String(v);
        }

        utility.throwError('unexpected token');
    }

    // FieldType :=
    //     FieldName
    //   | FieldName ':' TypeExpression
    //
    // FieldName :=
    //     NameExpression
    //   | StringLiteral
    //   | NumberLiteral
    //   | ReservedIdentifier
    function parseFieldType() {
        var key, rangeStart = previous;

        key = parseFieldName();
        if (token === Token.COLON) {
            consume(Token.COLON);
            return maybeAddRange({
                type: Syntax.FieldType,
                key: key,
                value: parseTypeExpression()
            }, [rangeStart, previous]);
        }
        return maybeAddRange({
            type: Syntax.FieldType,
            key: key,
            value: null
        }, [rangeStart, previous]);
    }

    // RecordType := '{' FieldTypeList '}'
    //
    // FieldTypeList :=
    //     <<empty>>
    //   | FieldType
    //   | FieldType ',' FieldTypeList
    function parseRecordType() {
        var fields, rangeStart = index - 1, rangeEnd;

        consume(Token.LBRACE, 'RecordType should start with {');
        fields = [];
        if (token === Token.COMMA) {
            consume(Token.COMMA);
        } else {
            while (token !== Token.RBRACE) {
                fields.push(parseFieldType());
                if (token !== Token.RBRACE) {
                    expect(Token.COMMA);
                }
            }
        }
        rangeEnd = index;
        expect(Token.RBRACE);
        return maybeAddRange({
            type: Syntax.RecordType,
            fields: fields
        }, [rangeStart, rangeEnd]);
    }

    // NameExpression :=
    //    Identifier
    //  | TagIdentifier ':' Identifier
    //
    // Tag identifier is one of "module", "external" or "event"
    // Identifier is the same as Token.NAME, including any dots, something like
    // namespace.module.MyClass
    function parseNameExpression() {
        var name = value, rangeStart = index - name.length;
        expect(Token.NAME);

        if (token === Token.COLON && (
                name === 'module' ||
                name === 'external' ||
                name === 'event')) {
            consume(Token.COLON);
            name += ':' + value;
            expect(Token.NAME);
        }

        return maybeAddRange({
            type: Syntax.NameExpression,
            name: name
        }, [rangeStart, previous]);
    }

    // TypeExpressionList :=
    //     TopLevelTypeExpression
    //   | TopLevelTypeExpression ',' TypeExpressionList
    function parseTypeExpressionList() {
        var elements = [];

        elements.push(parseTop());
        while (token === Token.COMMA) {
            consume(Token.COMMA);
            elements.push(parseTop());
        }
        return elements;
    }

    // TypeName :=
    //     NameExpression
    //   | NameExpression TypeApplication
    //
    // TypeApplication :=
    //     '.<' TypeExpressionList '>'
    //   | '<' TypeExpressionList '>'   // this is extension of doctrine
    function parseTypeName() {
        var expr, applications, startIndex = index - value.length;

        expr = parseNameExpression();
        if (token === Token.DOT_LT || token === Token.LT) {
            next();
            applications = parseTypeExpressionList();
            expect(Token.GT);
            return maybeAddRange({
                type: Syntax.TypeApplication,
                expression: expr,
                applications: applications
            }, [startIndex, previous]);
        }
        return expr;
    }

    // ResultType :=
    //     <<empty>>
    //   | ':' void
    //   | ':' TypeExpression
    //
    // BNF is above
    // but, we remove <<empty>> pattern, so token is always TypeToken::COLON
    function parseResultType() {
        consume(Token.COLON, 'ResultType should start with :');
        if (token === Token.NAME && value === 'void') {
            consume(Token.NAME);
            return {
                type: Syntax.VoidLiteral
            };
        }
        return parseTypeExpression();
    }

    // ParametersType :=
    //     RestParameterType
    //   | NonRestParametersType
    //   | NonRestParametersType ',' RestParameterType
    //
    // RestParameterType :=
    //     '...'
    //     '...' Identifier
    //
    // NonRestParametersType :=
    //     ParameterType ',' NonRestParametersType
    //   | ParameterType
    //   | OptionalParametersType
    //
    // OptionalParametersType :=
    //     OptionalParameterType
    //   | OptionalParameterType, OptionalParametersType
    //
    // OptionalParameterType := ParameterType=
    //
    // ParameterType := TypeExpression | Identifier ':' TypeExpression
    //
    // Identifier is "new" or "this"
    function parseParametersType() {
        var params = [], optionalSequence = false, expr, rest = false, startIndex, restStartIndex = index - 3, nameStartIndex;

        while (token !== Token.RPAREN) {
            if (token === Token.REST) {
                // RestParameterType
                consume(Token.REST);
                rest = true;
            }

            startIndex = previous;

            expr = parseTypeExpression();
            if (expr.type === Syntax.NameExpression && token === Token.COLON) {
                nameStartIndex = previous - expr.name.length;
                // Identifier ':' TypeExpression
                consume(Token.COLON);
                expr = maybeAddRange({
                    type: Syntax.ParameterType,
                    name: expr.name,
                    expression: parseTypeExpression()
                }, [nameStartIndex, previous]);
            }
            if (token === Token.EQUAL) {
                consume(Token.EQUAL);
                expr = maybeAddRange({
                    type: Syntax.OptionalType,
                    expression: expr
                }, [startIndex, previous]);
                optionalSequence = true;
            } else {
                if (optionalSequence) {
                    utility.throwError('unexpected token');
                }
            }
            if (rest) {
                expr = maybeAddRange({
                    type: Syntax.RestType,
                    expression: expr
                }, [restStartIndex, previous]);
            }
            params.push(expr);
            if (token !== Token.RPAREN) {
                expect(Token.COMMA);
            }
        }
        return params;
    }

    // FunctionType := 'function' FunctionSignatureType
    //
    // FunctionSignatureType :=
    //   | TypeParameters '(' ')' ResultType
    //   | TypeParameters '(' ParametersType ')' ResultType
    //   | TypeParameters '(' 'this' ':' TypeName ')' ResultType
    //   | TypeParameters '(' 'this' ':' TypeName ',' ParametersType ')' ResultType
    function parseFunctionType() {
        var isNew, thisBinding, params, result, fnType, startIndex = index - value.length;
        utility.assert(token === Token.NAME && value === 'function', 'FunctionType should start with \'function\'');
        consume(Token.NAME);

        // Google Closure Compiler is not implementing TypeParameters.
        // So we do not. if we don't get '(', we see it as error.
        expect(Token.LPAREN);

        isNew = false;
        params = [];
        thisBinding = null;
        if (token !== Token.RPAREN) {
            // ParametersType or 'this'
            if (token === Token.NAME &&
                    (value === 'this' || value === 'new')) {
                // 'this' or 'new'
                // 'new' is Closure Compiler extension
                isNew = value === 'new';
                consume(Token.NAME);
                expect(Token.COLON);
                thisBinding = parseTypeName();
                if (token === Token.COMMA) {
                    consume(Token.COMMA);
                    params = parseParametersType();
                }
            } else {
                params = parseParametersType();
            }
        }

        expect(Token.RPAREN);

        result = null;
        if (token === Token.COLON) {
            result = parseResultType();
        }

        fnType = maybeAddRange({
            type: Syntax.FunctionType,
            params: params,
            result: result
        }, [startIndex, previous]);
        if (thisBinding) {
            // avoid adding null 'new' and 'this' properties
            fnType['this'] = thisBinding;
            if (isNew) {
                fnType['new'] = true;
            }
        }
        return fnType;
    }

    // BasicTypeExpression :=
    //     '*'
    //   | 'null'
    //   | 'undefined'
    //   | TypeName
    //   | FunctionType
    //   | UnionType
    //   | RecordType
    //   | ArrayType
    function parseBasicTypeExpression() {
        var context, startIndex;
        switch (token) {
        case Token.STAR:
            consume(Token.STAR);
            return maybeAddRange({
                type: Syntax.AllLiteral
            }, [previous - 1, previous]);

        case Token.LPAREN:
            return parseUnionType();

        case Token.LBRACK:
            return parseArrayType();

        case Token.LBRACE:
            return parseRecordType();

        case Token.NAME:
            startIndex = index - value.length;

            if (value === 'null') {
                consume(Token.NAME);
                return maybeAddRange({
                    type: Syntax.NullLiteral
                }, [startIndex, previous]);
            }

            if (value === 'undefined') {
                consume(Token.NAME);
                return maybeAddRange({
                    type: Syntax.UndefinedLiteral
                }, [startIndex, previous]);
            }

            if (value === 'true' || value === 'false') {
                consume(Token.NAME);
                return maybeAddRange({
                    type: Syntax.BooleanLiteralType,
                    value: value === 'true'
                }, [startIndex, previous]);
            }

            context = Context.save();
            if (value === 'function') {
                try {
                    return parseFunctionType();
                } catch (e) {
                    context.restore();
                }
            }

            return parseTypeName();

        case Token.STRING:
            next();
            return maybeAddRange({
                type: Syntax.StringLiteralType,
                value: value
            }, [previous - value.length - 2, previous]);

        case Token.NUMBER:
            next();
            return maybeAddRange({
                type: Syntax.NumericLiteralType,
                value: value
            }, [previous - String(value).length, previous]);

        default:
            utility.throwError('unexpected token');
        }
    }

    // TypeExpression :=
    //     BasicTypeExpression
    //   | '?' BasicTypeExpression
    //   | '!' BasicTypeExpression
    //   | BasicTypeExpression '?'
    //   | BasicTypeExpression '!'
    //   | '?'
    //   | BasicTypeExpression '[]'
    function parseTypeExpression() {
        var expr, rangeStart;

        if (token === Token.QUESTION) {
            rangeStart = index - 1;
            consume(Token.QUESTION);
            if (token === Token.COMMA || token === Token.EQUAL || token === Token.RBRACE ||
                    token === Token.RPAREN || token === Token.PIPE || token === Token.EOF ||
                    token === Token.RBRACK || token === Token.GT) {
                return maybeAddRange({
                    type: Syntax.NullableLiteral
                }, [rangeStart, previous]);
            }
            return maybeAddRange({
                type: Syntax.NullableType,
                expression: parseBasicTypeExpression(),
                prefix: true
            }, [rangeStart, previous]);
        } else if (token === Token.BANG) {
            rangeStart = index - 1;
            consume(Token.BANG);
            return maybeAddRange({
                type: Syntax.NonNullableType,
                expression: parseBasicTypeExpression(),
                prefix: true
            }, [rangeStart, previous]);
        } else {
            rangeStart = previous;
        }

        expr = parseBasicTypeExpression();
        if (token === Token.BANG) {
            consume(Token.BANG);
            return maybeAddRange({
                type: Syntax.NonNullableType,
                expression: expr,
                prefix: false
            }, [rangeStart, previous]);
        }

        if (token === Token.QUESTION) {
            consume(Token.QUESTION);
            return maybeAddRange({
                type: Syntax.NullableType,
                expression: expr,
                prefix: false
            }, [rangeStart, previous]);
        }

        if (token === Token.LBRACK) {
            consume(Token.LBRACK);
            expect(Token.RBRACK, 'expected an array-style type declaration (' + value + '[])');
            return maybeAddRange({
                type: Syntax.TypeApplication,
                expression: maybeAddRange({
                    type: Syntax.NameExpression,
                    name: 'Array'
                }, [rangeStart, previous]),
                applications: [expr]
            }, [rangeStart, previous]);
        }

        return expr;
    }

    // TopLevelTypeExpression :=
    //      TypeExpression
    //    | TypeUnionList
    //
    // This rule is Google Closure Compiler extension, not ES4
    // like,
    //   { number | string }
    // If strict to ES4, we should write it as
    //   { (number|string) }
    function parseTop() {
        var expr, elements;

        expr = parseTypeExpression();
        if (token !== Token.PIPE) {
            return expr;
        }

        elements = [expr];
        consume(Token.PIPE);
        while (true) {
            elements.push(parseTypeExpression());
            if (token !== Token.PIPE) {
                break;
            }
            consume(Token.PIPE);
        }

        return maybeAddRange({
            type: Syntax.UnionType,
            elements: elements
        }, [0, index]);
    }

    function parseTopParamType() {
        var expr;

        if (token === Token.REST) {
            consume(Token.REST);
            return maybeAddRange({
                type: Syntax.RestType,
                expression: parseTop()
            }, [0, index]);
        }

        expr = parseTop();
        if (token === Token.EQUAL) {
            consume(Token.EQUAL);
            return maybeAddRange({
                type: Syntax.OptionalType,
                expression: expr
            }, [0, index]);
        }

        return expr;
    }

    function parseType(src, opt) {
        var expr;

        source = src;
        length = source.length;
        index = 0;
        previous = 0;
        addRange = opt && opt.range;
        rangeOffset = opt && opt.startIndex || 0;

        next();
        expr = parseTop();

        if (opt && opt.midstream) {
            return {
                expression: expr,
                index: previous
            };
        }

        if (token !== Token.EOF) {
            utility.throwError('not reach to EOF');
        }

        return expr;
    }

    function parseParamType(src, opt) {
        var expr;

        source = src;
        length = source.length;
        index = 0;
        previous = 0;
        addRange = opt && opt.range;
        rangeOffset = opt && opt.startIndex || 0;

        next();
        expr = parseTopParamType();

        if (opt && opt.midstream) {
            return {
                expression: expr,
                index: previous
            };
        }

        if (token !== Token.EOF) {
            utility.throwError('not reach to EOF');
        }

        return expr;
    }

    function stringifyImpl(node, compact, topLevel) {
        var result, i, iz;

        switch (node.type) {
        case Syntax.NullableLiteral:
            result = '?';
            break;

        case Syntax.AllLiteral:
            result = '*';
            break;

        case Syntax.NullLiteral:
            result = 'null';
            break;

        case Syntax.UndefinedLiteral:
            result = 'undefined';
            break;

        case Syntax.VoidLiteral:
            result = 'void';
            break;

        case Syntax.UnionType:
            if (!topLevel) {
                result = '(';
            } else {
                result = '';
            }

            for (i = 0, iz = node.elements.length; i < iz; ++i) {
                result += stringifyImpl(node.elements[i], compact);
                if ((i + 1) !== iz) {
                    result += compact ? '|' : ' | ';
                }
            }

            if (!topLevel) {
                result += ')';
            }
            break;

        case Syntax.ArrayType:
            result = '[';
            for (i = 0, iz = node.elements.length; i < iz; ++i) {
                result += stringifyImpl(node.elements[i], compact);
                if ((i + 1) !== iz) {
                    result += compact ? ',' : ', ';
                }
            }
            result += ']';
            break;

        case Syntax.RecordType:
            result = '{';
            for (i = 0, iz = node.fields.length; i < iz; ++i) {
                result += stringifyImpl(node.fields[i], compact);
                if ((i + 1) !== iz) {
                    result += compact ? ',' : ', ';
                }
            }
            result += '}';
            break;

        case Syntax.FieldType:
            if (node.value) {
                result = node.key + (compact ? ':' : ': ') + stringifyImpl(node.value, compact);
            } else {
                result = node.key;
            }
            break;

        case Syntax.FunctionType:
            result = compact ? 'function(' : 'function (';

            if (node['this']) {
                if (node['new']) {
                    result += (compact ? 'new:' : 'new: ');
                } else {
                    result += (compact ? 'this:' : 'this: ');
                }

                result += stringifyImpl(node['this'], compact);

                if (node.params.length !== 0) {
                    result += compact ? ',' : ', ';
                }
            }

            for (i = 0, iz = node.params.length; i < iz; ++i) {
                result += stringifyImpl(node.params[i], compact);
                if ((i + 1) !== iz) {
                    result += compact ? ',' : ', ';
                }
            }

            result += ')';

            if (node.result) {
                result += (compact ? ':' : ': ') + stringifyImpl(node.result, compact);
            }
            break;

        case Syntax.ParameterType:
            result = node.name + (compact ? ':' : ': ') + stringifyImpl(node.expression, compact);
            break;

        case Syntax.RestType:
            result = '...';
            if (node.expression) {
                result += stringifyImpl(node.expression, compact);
            }
            break;

        case Syntax.NonNullableType:
            if (node.prefix) {
                result = '!' + stringifyImpl(node.expression, compact);
            } else {
                result = stringifyImpl(node.expression, compact) + '!';
            }
            break;

        case Syntax.OptionalType:
            result = stringifyImpl(node.expression, compact) + '=';
            break;

        case Syntax.NullableType:
            if (node.prefix) {
                result = '?' + stringifyImpl(node.expression, compact);
            } else {
                result = stringifyImpl(node.expression, compact) + '?';
            }
            break;

        case Syntax.NameExpression:
            result = node.name;
            break;

        case Syntax.TypeApplication:
            result = stringifyImpl(node.expression, compact) + '.<';
            for (i = 0, iz = node.applications.length; i < iz; ++i) {
                result += stringifyImpl(node.applications[i], compact);
                if ((i + 1) !== iz) {
                    result += compact ? ',' : ', ';
                }
            }
            result += '>';
            break;

        case Syntax.StringLiteralType:
            result = '"' + node.value + '"';
            break;

        case Syntax.NumericLiteralType:
            result = String(node.value);
            break;

        case Syntax.BooleanLiteralType:
            result = String(node.value);
            break;

        default:
            utility.throwError('Unknown type ' + node.type);
        }

        return result;
    }

    function stringify(node, options) {
        if (options == null) {
            options = {};
        }
        return stringifyImpl(node, options.compact, options.topLevel);
    }

    exports.parseType = parseType;
    exports.parseParamType = parseParamType;
    exports.stringify = stringify;
    exports.Syntax = Syntax;
}());
/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * @fileoverview Utilities for Doctrine
 * @author Yusuke Suzuki <utatane.tea@gmail.com>
 */


(function () {
    'use strict';

    var VERSION;

    VERSION = __webpack_require__(58).version;
    exports.VERSION = VERSION;

    function DoctrineError(message) {
        this.name = 'DoctrineError';
        this.message = message;
    }
    DoctrineError.prototype = (function () {
        var Middle = function () { };
        Middle.prototype = Error.prototype;
        return new Middle();
    }());
    DoctrineError.prototype.constructor = DoctrineError;
    exports.DoctrineError = DoctrineError;

    function throwError(message) {
        throw new DoctrineError(message);
    }
    exports.throwError = throwError;

    exports.assert = __webpack_require__(59);
}());

/* vim: set sw=4 ts=4 et tw=80 : */


/***/ }),
/* 58 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"doctrine@^2.1.0\",\"_id\":\"doctrine@2.1.0\",\"_inBundle\":false,\"_integrity\":\"sha512-35mSku4ZXK0vfCuHEDAwt55dg2jNajHZ1odvF+8SSr82EsZY4QmXfuWso8oEd8zRhVObSN18aM0CjSdoBX7zIw==\",\"_location\":\"/doctrine\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"range\",\"registry\":true,\"raw\":\"doctrine@^2.1.0\",\"name\":\"doctrine\",\"escapedName\":\"doctrine\",\"rawSpec\":\"^2.1.0\",\"saveSpec\":null,\"fetchSpec\":\"^2.1.0\"},\"_requiredBy\":[\"/eslint-plugin-react\"],\"_resolved\":\"https://registry.npmjs.org/doctrine/-/doctrine-2.1.0.tgz\",\"_shasum\":\"5cd01fc101621b42c4cd7f5d1a66243716d3f39d\",\"_spec\":\"doctrine@^2.1.0\",\"_where\":\"/private/var/folders/fq/yx5wtvds0szf462yfjr5bn9h0000gn/T/tmp2XSd9p/node_modules/eslint-plugin-react\",\"bugs\":{\"url\":\"https://github.com/eslint/doctrine/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"esutils\":\"^2.0.2\"},\"deprecated\":false,\"description\":\"JSDoc parser\",\"devDependencies\":{\"coveralls\":\"^2.11.2\",\"dateformat\":\"^1.0.11\",\"eslint\":\"^1.10.3\",\"eslint-release\":\"^0.10.0\",\"linefix\":\"^0.1.1\",\"mocha\":\"^3.4.2\",\"npm-license\":\"^0.3.1\",\"nyc\":\"^10.3.2\",\"semver\":\"^5.0.3\",\"shelljs\":\"^0.5.3\",\"shelljs-nodecli\":\"^0.1.1\",\"should\":\"^5.0.1\"},\"directories\":{\"lib\":\"./lib\"},\"engines\":{\"node\":\">=0.10.0\"},\"files\":[\"lib\"],\"homepage\":\"https://github.com/eslint/doctrine\",\"license\":\"Apache-2.0\",\"main\":\"lib/doctrine.js\",\"maintainers\":[{\"name\":\"Nicholas C. Zakas\",\"email\":\"nicholas+npm@nczconsulting.com\",\"url\":\"https://www.nczonline.net\"},{\"name\":\"Yusuke Suzuki\",\"email\":\"utatane.tea@gmail.com\",\"url\":\"https://github.com/Constellation\"}],\"name\":\"doctrine\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/eslint/doctrine.git\"},\"scripts\":{\"alpharelease\":\"eslint-prerelease alpha\",\"betarelease\":\"eslint-prerelease beta\",\"ci-release\":\"eslint-ci-release\",\"coveralls\":\"nyc report --reporter=text-lcov | coveralls\",\"lint\":\"eslint lib/\",\"pretest\":\"npm run lint\",\"release\":\"eslint-release\",\"test\":\"nyc mocha\"},\"version\":\"2.1.0\"}");

/***/ }),
/* 59 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(4);
var ES = __webpack_require__(61);

var implementation = __webpack_require__(62);
var getPolyfill = __webpack_require__(63);
var polyfill = getPolyfill();
var shim = __webpack_require__(64);

var slice = Array.prototype.slice;

/* eslint-disable no-unused-vars */
var boundIncludesShim = function includes(array, searchElement) {
/* eslint-enable no-unused-vars */
	ES.RequireObjectCoercible(array);
	return polyfill.apply(array, slice.call(arguments, 1));
};
define(boundIncludesShim, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = boundIncludesShim;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(14);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(61);
var $isNaN = Number.isNaN || function isNaN(a) {
	return a !== a;
};
var $isFinite = Number.isFinite || function isFinite(n) {
	return typeof n === 'number' && global.isFinite(n);
};
var indexOf = Array.prototype.indexOf;

module.exports = function includes(searchElement) {
	var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
	if (indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
		return indexOf.apply(this, arguments) > -1;
	}

	var O = ES.ToObject(this);
	var length = ES.ToLength(O.length);
	if (length === 0) {
		return false;
	}
	var k = fromIndex >= 0 ? fromIndex : Math.max(0, length + fromIndex);
	while (k < length) {
		if (ES.SameValueZero(searchElement, O[k])) {
			return true;
		}
		k += 1;
	}
	return false;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(62);

module.exports = function getPolyfill() {
	return Array.prototype.includes || implementation;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(4);
var getPolyfill = __webpack_require__(63);

module.exports = function shimArrayPrototypeIncludes() {
	var polyfill = getPolyfill();
	define(
		Array.prototype,
		{ includes: polyfill },
		{ includes: function () { return Array.prototype.includes !== polyfill; } }
	);
	return polyfill;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for React components detection
 * @author Yannick Croissant
 */



/**
 * Search a particular variable in a list
 * @param {Array} variables The variables list.
 * @param {string} name The name of the variable to search.
 * @returns {Boolean} True if the variable was found, false if not.
 */
function findVariable(variables, name) {
  return variables.some(variable => variable.name === name);
}

/**
 * Find and return a particular variable in a list
 * @param {Array} variables The variables list.
 * @param {string} name The name of the variable to search.
 * @returns {Object} Variable if the variable was found, null if not.
 */
function getVariable(variables, name) {
  return variables.find(variable => variable.name === name);
}

/**
 * List all variable in a given scope
 *
 * Contain a patch for babel-eslint to avoid https://github.com/babel/babel-eslint/issues/21
 *
 * @param {Object} context The current rule context.
 * @returns {Array} The variables list
 */
function variablesInScope(context) {
  let scope = context.getScope();
  let variables = scope.variables;

  while (scope.type !== 'global') {
    scope = scope.upper;
    variables = scope.variables.concat(variables);
  }
  if (scope.childScopes.length) {
    variables = scope.childScopes[0].variables.concat(variables);
    if (scope.childScopes[0].childScopes.length) {
      variables = scope.childScopes[0].childScopes[0].variables.concat(variables);
    }
  }
  variables.reverse();

  return variables;
}

/**
 * Find a variable by name in the current scope.
 * @param {Object} context The current rule context.
 * @param  {string} name Name of the variable to look for.
 * @returns {ASTNode|null} Return null if the variable could not be found, ASTNode otherwise.
 */
function findVariableByName(context, name) {
  const variable = getVariable(variablesInScope(context), name);

  if (!variable || !variable.defs[0] || !variable.defs[0].node) {
    return null;
  }

  if (variable.defs[0].node.type === 'TypeAlias') {
    return variable.defs[0].node.right;
  }

  return variable.defs[0].node.init;
}

module.exports = {
  findVariable,
  findVariableByName,
  getVariable,
  variablesInScope
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for React pragma configuration
 * @author Yannick Croissant
 */



const JSX_ANNOTATION_REGEX = /^\*\s*@jsx\s+([^\s]+)/;
// Does not check for reserved keywords or unicode characters
const JS_IDENTIFIER_REGEX = /^[_$a-zA-Z][_$a-zA-Z0-9]*$/;


function getCreateClassFromContext(context) {
  let pragma = 'createReactClass';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.createClass) {
    pragma = context.settings.react.createClass;
  }
  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`createClass pragma ${pragma} is not a valid function name`);
  }
  return pragma;
}

function getFragmentFromContext(context) {
  let pragma = 'Fragment';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.fragment) {
    pragma = context.settings.react.fragment;
  }
  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`Fragment pragma ${pragma} is not a valid identifier`);
  }
  return pragma;
}

function getFromContext(context) {
  let pragma = 'React';

  const sourceCode = context.getSourceCode();
  const pragmaNode = sourceCode.getAllComments().find(node => JSX_ANNOTATION_REGEX.test(node.value));

  if (pragmaNode) {
    const matches = JSX_ANNOTATION_REGEX.exec(pragmaNode.value);
    pragma = matches[1].split('.')[0];
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  } else if (context.settings.react && context.settings.react.pragma) {
    pragma = context.settings.react.pragma;
  }

  if (!JS_IDENTIFIER_REGEX.test(pragma)) {
    throw new Error(`React pragma ${pragma} is not a valid identifier`);
  }
  return pragma;
}

module.exports = {
  getCreateClassFromContext,
  getFragmentFromContext,
  getFromContext
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for AST
 */



/**
 * Find a return statment in the current node
 *
 * @param {ASTNode} node The AST node being checked
 */
function findReturnStatement(node) {
  if (
    (!node.value || !node.value.body || !node.value.body.body) &&
    (!node.body || !node.body.body)
  ) {
    return false;
  }

  const bodyNodes = (node.value ? node.value.body.body : node.body.body);

  return (function loopNodes(nodes) {
    let i = nodes.length - 1;
    for (; i >= 0; i--) {
      if (nodes[i].type === 'ReturnStatement') {
        return nodes[i];
      }
      if (nodes[i].type === 'SwitchStatement') {
        let j = nodes[i].cases.length - 1;
        for (; j >= 0; j--) {
          return loopNodes(nodes[i].cases[j].consequent);
        }
      }
    }
    return false;
  }(bodyNodes));
}

/**
 * Get node with property's name
 * @param {Object} node - Property.
 * @returns {Object} Property name node.
 */
function getPropertyNameNode(node) {
  if (node.key || ['MethodDefinition', 'Property'].indexOf(node.type) !== -1) {
    return node.key;
  }
  if (node.type === 'MemberExpression') {
    return node.property;
  }
  return null;
}

/**
 * Get properties name
 * @param {Object} node - Property.
 * @returns {String} Property name.
 */
function getPropertyName(node) {
  const nameNode = getPropertyNameNode(node);
  return nameNode ? nameNode.name : '';
}

/**
 * Get properties for a given AST node
 * @param {ASTNode} node The AST node being checked.
 * @returns {Array} Properties array.
 */
function getComponentProperties(node) {
  switch (node.type) {
    case 'ClassDeclaration':
    case 'ClassExpression':
      return node.body.body;
    case 'ObjectExpression':
      return node.properties;
    default:
      return [];
  }
}


/**
 * Gets the first node in a line from the initial node, excluding whitespace.
 * @param {Object} context The node to check
 * @param {ASTNode} node The node to check
 * @return {ASTNode} the first node in the line
 */
function getFirstNodeInLine(context, node) {
  const sourceCode = context.getSourceCode();
  let token = node;
  let lines;
  do {
    token = sourceCode.getTokenBefore(token);
    lines = token.type === 'JSXText' ?
      token.value.split('\n') :
      null;
  } while (
    token.type === 'JSXText' &&
        /^\s*$/.test(lines[lines.length - 1])
  );
  return token;
}

/**
 * Checks if the node is the first in its line, excluding whitespace.
 * @param {Object} context The node to check
 * @param {ASTNode} node The node to check
 * @return {Boolean} true if it's the first node in its line
 */
function isNodeFirstInLine(context, node) {
  const token = getFirstNodeInLine(context, node);
  const startLine = node.loc.start.line;
  const endLine = token ? token.loc.end.line : -1;
  return startLine !== endLine;
}

/**
 * Checks if the node is a function or arrow function expression.
 * @param {ASTNode} node The node to check
 * @return {Boolean} true if it's a function-like expression
 */
function isFunctionLikeExpression(node) {
  return node.type === 'FunctionExpression' || node.type === 'ArrowFunctionExpression';
}

/**
 * Checks if the node is a function.
 * @param {ASTNode} node The node to check
 * @return {Boolean} true if it's a function
 */
function isFunction(node) {
  return node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration';
}

/**
 * Checks if the node is an arrow function.
 * @param {ASTNode} node The node to check
 * @return {Boolean} true if it's an arrow function
 */
function isArrowFunction(node) {
  return node.type === 'ArrowFunctionExpression';
}

/**
 * Checks if the node is a class.
 * @param {ASTNode} node The node to check
 * @return {Boolean} true if it's a class
 */
function isClass(node) {
  return node.type === 'ClassDeclaration' || node.type === 'ClassExpression';
}

/**
 * Removes quotes from around an identifier.
 * @param {string} string the identifier to strip
 */
function stripQuotes(string) {
  return string.replace(/^'|'$/g, '');
}

/**
 * Retrieve the name of a key node
 * @param {Context} context The AST node with the key.
 * @param {ASTNode} node The AST node with the key.
 * @return {string} the name of the key
 */
function getKeyValue(context, node) {
  if (node.type === 'ObjectTypeProperty') {
    const tokens = context.getFirstTokens(node, 2);
    return (tokens[0].value === '+' || tokens[0].value === '-' ?
      tokens[1].value :
      stripQuotes(tokens[0].value)
    );
  }
  const key = node.key || node.argument;
  return key.type === 'Identifier' ? key.name : key.value;
}

/**
 * Checks if a node is being assigned a value: props.bar = 'bar'
 * @param {ASTNode} node The AST node being checked.
 * @returns {Boolean}
 */
function isAssignmentLHS(node) {
  return (
    node.parent &&
    node.parent.type === 'AssignmentExpression' &&
    node.parent.left === node
  );
}

module.exports = {
  findReturnStatement,
  getFirstNodeInLine,
  getPropertyName,
  getPropertyNameNode,
  getComponentProperties,
  getKeyValue,
  isArrowFunction,
  isAssignmentLHS,
  isClass,
  isFunction,
  isFunctionLikeExpression,
  isNodeFirstInLine
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Common propTypes detection functionality.
 */



const annotations = __webpack_require__(69);
const propsUtil = __webpack_require__(70);
const variableUtil = __webpack_require__(65);
const versionUtil = __webpack_require__(71);
const propWrapperUtil = __webpack_require__(85);
const getKeyValue = __webpack_require__(67).getKeyValue;

/**
 * Checks if we are declaring a props as a generic type in a flow-annotated class.
 *
 * @param {ASTNode} node  the AST node being checked.
 * @returns {Boolean} True if the node is a class with generic prop types, false if not.
 */
function isSuperTypeParameterPropsDeclaration(node) {
  if (node && (node.type === 'ClassDeclaration' || node.type === 'ClassExpression')) {
    if (node.superTypeParameters && node.superTypeParameters.params.length > 0) {
      return true;
    }
  }
  return false;
}

/**
 * Iterates through a properties node, like a customized forEach.
 * @param {Object} context Array of properties to iterate.
 * @param {Object[]} properties Array of properties to iterate.
 * @param {Function} fn Function to call on each property, receives property key
    and property value. (key, value) => void
 */
function iterateProperties(context, properties, fn) {
  if (properties && properties.length && typeof fn === 'function') {
    for (let i = 0, j = properties.length; i < j; i++) {
      const node = properties[i];
      const key = getKeyValue(context, node);

      const value = node.value;
      fn(key, value, node);
    }
  }
}

/**
 * Checks if a node is inside a class body.
 *
 * @param {ASTNode} node  the AST node being checked.
 * @returns {Boolean} True if the node has a ClassBody ancestor, false if not.
 */
function isInsideClassBody(node) {
  let parent = node.parent;
  while (parent) {
    if (parent.type === 'ClassBody') {
      return true;
    }
    parent = parent.parent;
  }

  return false;
}

module.exports = function propTypesInstructions(context, components, utils) {
  // Used to track the type annotations in scope.
  // Necessary because babel's scopes do not track type annotations.
  let stack = null;

  const classExpressions = [];
  const defaults = {customValidators: []};
  const configuration = Object.assign({}, defaults, context.options[0] || {});
  const customValidators = configuration.customValidators;

  /**
   * Returns the full scope.
   * @returns {Object} The whole scope.
   */
  function typeScope() {
    return stack[stack.length - 1];
  }

  /**
   * Gets a node from the scope.
   * @param {string} key The name of the identifier to access.
   * @returns {ASTNode} The ASTNode associated with the given identifier.
   */
  function getInTypeScope(key) {
    return stack[stack.length - 1][key];
  }

  /**
   * Sets the new value in the scope.
   * @param {string} key The name of the identifier to access
   * @param {ASTNode} value The new value for the identifier.
   * @returns {ASTNode} The ASTNode associated with the given identifier.
   */
  function setInTypeScope(key, value) {
    stack[stack.length - 1][key] = value;
    return value;
  }

  /**
   * Checks if prop should be validated by plugin-react-proptypes
   * @param {String} validator Name of validator to check.
   * @returns {Boolean} True if validator should be checked by custom validator.
   */
  function hasCustomValidator(validator) {
    return customValidators.indexOf(validator) !== -1;
  }

  /* eslint-disable no-use-before-define */
  /** @type {TypeDeclarationBuilders} */
  const typeDeclarationBuilders = {
    GenericTypeAnnotation(annotation, parentName, seen) {
      if (getInTypeScope(annotation.id.name)) {
        return buildTypeAnnotationDeclarationTypes(getInTypeScope(annotation.id.name), parentName, seen);
      }
      return {};
    },

    ObjectTypeAnnotation(annotation, parentName, seen) {
      let containsObjectTypeSpread = false;
      const containsIndexers = Boolean(annotation.indexers && annotation.indexers.length);
      const shapeTypeDefinition = {
        type: 'shape',
        children: {}
      };
      iterateProperties(context, annotation.properties, (childKey, childValue, propNode) => {
        const fullName = [parentName, childKey].join('.');
        if (!childKey && !childValue) {
          containsObjectTypeSpread = true;
        } else {
          const types = buildTypeAnnotationDeclarationTypes(childValue, fullName, seen);
          types.fullName = fullName;
          types.name = childKey;
          types.node = propNode;
          types.isRequired = !childValue.optional;
          shapeTypeDefinition.children[childKey] = types;
        }
      });

      // Mark if this shape has spread or an indexer. We will know to consider all props from this shape as having propTypes,
      // but still have the ability to detect unused children of this shape.
      shapeTypeDefinition.containsSpread = containsObjectTypeSpread;
      shapeTypeDefinition.containsIndexers = containsIndexers;

      return shapeTypeDefinition;
    },

    UnionTypeAnnotation(annotation, parentName, seen) {
      /** @type {UnionTypeDefinition} */
      const unionTypeDefinition = {
        type: 'union',
        children: []
      };
      for (let i = 0, j = annotation.types.length; i < j; i++) {
        const type = buildTypeAnnotationDeclarationTypes(annotation.types[i], parentName, seen);
        // keep only complex type
        if (type.type) {
          if (type.children === true) {
            // every child is accepted for one type, abort type analysis
            unionTypeDefinition.children = true;
            return unionTypeDefinition;
          }
        }

        /** @type {UnionTypeDefinitionChildren} */(unionTypeDefinition.children).push(type);
      }
      if (/** @type {UnionTypeDefinitionChildren} */(unionTypeDefinition.children).length === 0) {
        // no complex type found, simply accept everything
        return {};
      }
      return unionTypeDefinition;
    },

    ArrayTypeAnnotation(annotation, parentName, seen) {
      const fullName = [parentName, '*'].join('.');
      const child = buildTypeAnnotationDeclarationTypes(annotation.elementType, fullName, seen);
      child.fullName = fullName;
      child.name = '__ANY_KEY__';
      child.node = annotation;
      return {
        type: 'object',
        children: {
          __ANY_KEY__: child
        }
      };
    }
  };
  /* eslint-enable no-use-before-define */

  /**
   * Resolve the type annotation for a given node.
   * Flow annotations are sometimes wrapped in outer `TypeAnnotation`
   * and `NullableTypeAnnotation` nodes which obscure the annotation we're
   * interested in.
   * This method also resolves type aliases where possible.
   *
   * @param {ASTNode} node The annotation or a node containing the type annotation.
   * @returns {ASTNode} The resolved type annotation for the node.
   */
  function resolveTypeAnnotation(node) {
    let annotation = (node.left && node.left.typeAnnotation) || node.typeAnnotation || node;
    while (annotation && (annotation.type === 'TypeAnnotation' || annotation.type === 'NullableTypeAnnotation')) {
      annotation = annotation.typeAnnotation;
    }
    if (annotation.type === 'GenericTypeAnnotation' && getInTypeScope(annotation.id.name)) {
      return getInTypeScope(annotation.id.name);
    }

    return annotation;
  }

  /**
   * Creates the representation of the React props type annotation for the component.
   * The representation is used to verify nested used properties.
   * @param {ASTNode} annotation Type annotation for the props class property.
   * @param {String} parentName
   * @param {Set<ASTNode>} [seen]
   * @return {Object} The representation of the declaration, empty object means
   *    the property is declared without the need for further analysis.
   */
  function buildTypeAnnotationDeclarationTypes(annotation, parentName, seen) {
    if (typeof seen === 'undefined') {
      // Keeps track of annotations we've already seen to
      // prevent problems with recursive types.
      seen = new Set();
    }
    if (seen.has(annotation)) {
      // This must be a recursive type annotation, so just accept anything.
      return {};
    }
    seen.add(annotation);

    if (annotation.type in typeDeclarationBuilders) {
      return typeDeclarationBuilders[annotation.type](annotation, parentName, seen);
    }
    return {};
  }

  /**
   * Marks all props found inside ObjectTypeAnnotaiton as declared.
   *
   * Modifies the declaredProperties object
   * @param {ASTNode} propTypes
   * @param {Object} declaredPropTypes
   * @returns {Boolean} True if propTypes should be ignored (e.g. when a type can't be resolved, when it is imported)
   */
  function declarePropTypesForObjectTypeAnnotation(propTypes, declaredPropTypes) {
    let ignorePropsValidation = false;

    iterateProperties(context, propTypes.properties, (key, value, propNode) => {
      if (!value) {
        ignorePropsValidation = true;
        return;
      }

      const types = buildTypeAnnotationDeclarationTypes(value, key);
      types.fullName = key;
      types.name = key;
      types.node = propNode;
      types.isRequired = !propNode.optional;
      declaredPropTypes[key] = types;
    });

    return ignorePropsValidation;
  }

  /**
   * Marks all props found inside IntersectionTypeAnnotation as declared.
   * Since InterSectionTypeAnnotations can be nested, this handles recursively.
   *
   * Modifies the declaredPropTypes object
   * @param {ASTNode} propTypes
   * @param {Object} declaredPropTypes
   * @returns {Boolean} True if propTypes should be ignored (e.g. when a type can't be resolved, when it is imported)
   */
  function declarePropTypesForIntersectionTypeAnnotation(propTypes, declaredPropTypes) {
    return propTypes.types.some((annotation) => {
      if (annotation.type === 'ObjectTypeAnnotation') {
        return declarePropTypesForObjectTypeAnnotation(annotation, declaredPropTypes);
      }

      if (annotation.type === 'UnionTypeAnnotation') {
        return true;
      }

      // Type can't be resolved
      if (!annotation.id) {
        return true;
      }

      const typeNode = getInTypeScope(annotation.id.name);

      if (!typeNode) {
        return true;
      }
      if (typeNode.type === 'IntersectionTypeAnnotation') {
        return declarePropTypesForIntersectionTypeAnnotation(typeNode, declaredPropTypes);
      }

      return declarePropTypesForObjectTypeAnnotation(typeNode, declaredPropTypes);
    });
  }

  /**
   * Creates the representation of the React propTypes for the component.
   * The representation is used to verify nested used properties.
   * @param {ASTNode} value Node of the PropTypes for the desired property
   * @param {string} parentName
   * @return {Object} The representation of the declaration, empty object means
   *    the property is declared without the need for further analysis.
   */
  function buildReactDeclarationTypes(value, parentName) {
    if (
      value &&
      value.callee &&
      value.callee.object &&
      hasCustomValidator(value.callee.object.name)
    ) {
      return {};
    }

    if (
      value &&
      value.type === 'MemberExpression' &&
      value.property &&
      value.property.name &&
      value.property.name === 'isRequired'
    ) {
      value = value.object;
    }

    // Verify PropTypes that are functions
    if (
      value &&
      value.type === 'CallExpression' &&
      value.callee &&
      value.callee.property &&
      value.callee.property.name &&
      value.arguments &&
      value.arguments.length > 0
    ) {
      const callName = value.callee.property.name;
      const argument = value.arguments[0];
      switch (callName) {
        case 'shape': {
          if (argument.type !== 'ObjectExpression') {
            // Invalid proptype or cannot analyse statically
            return {};
          }
          const shapeTypeDefinition = {
            type: 'shape',
            children: {}
          };
          iterateProperties(context, argument.properties, (childKey, childValue, propNode) => {
            if (childValue) { // skip spread propTypes
              const fullName = [parentName, childKey].join('.');
              const types = buildReactDeclarationTypes(childValue, fullName);
              types.fullName = fullName;
              types.name = childKey;
              types.node = propNode;
              shapeTypeDefinition.children[childKey] = types;
            }
          });
          return shapeTypeDefinition;
        }
        case 'arrayOf':
        case 'objectOf': {
          const fullName = [parentName, '*'].join('.');
          const child = buildReactDeclarationTypes(argument, fullName);
          child.fullName = fullName;
          child.name = '__ANY_KEY__';
          child.node = argument;
          return {
            type: 'object',
            children: {
              __ANY_KEY__: child
            }
          };
        }
        case 'oneOfType': {
          if (
            !argument.elements ||
            !argument.elements.length
          ) {
            // Invalid proptype or cannot analyse statically
            return {};
          }

          /** @type {UnionTypeDefinition} */
          const unionTypeDefinition = {
            type: 'union',
            children: []
          };
          for (let i = 0, j = argument.elements.length; i < j; i++) {
            const type = buildReactDeclarationTypes(argument.elements[i], parentName);
            // keep only complex type
            if (type.type) {
              if (type.children === true) {
                // every child is accepted for one type, abort type analysis
                unionTypeDefinition.children = true;
                return unionTypeDefinition;
              }
            }

            /** @type {UnionTypeDefinitionChildren} */(unionTypeDefinition.children).push(type);
          }
          if (/** @type {UnionTypeDefinitionChildren} */(unionTypeDefinition.children).length === 0) {
            // no complex type found, simply accept everything
            return {};
          }
          return unionTypeDefinition;
        }
        case 'instanceOf':
          return {
            type: 'instance',
            // Accept all children because we can't know what type they are
            children: true
          };
        case 'oneOf':
        default:
          return {};
      }
    }
    // Unknown property or accepts everything (any, object, ...)
    return {};
  }


  /**
   * Mark a prop type as declared
   * @param {ASTNode} node The AST node being checked.
   * @param {ASTNode} propTypes The AST node containing the proptypes
   */
  function markPropTypesAsDeclared(node, propTypes) {
    let componentNode = node;
    while (componentNode && !components.get(componentNode)) {
      componentNode = componentNode.parent;
    }
    const component = components.get(componentNode);
    const declaredPropTypes = component && component.declaredPropTypes || {};
    let ignorePropsValidation = component && component.ignorePropsValidation || false;
    switch (propTypes && propTypes.type) {
      case 'ObjectTypeAnnotation':
        ignorePropsValidation = declarePropTypesForObjectTypeAnnotation(propTypes, declaredPropTypes);
        break;
      case 'ObjectExpression':
        iterateProperties(context, propTypes.properties, (key, value, propNode) => {
          if (!value) {
            ignorePropsValidation = true;
            return;
          }
          const types = buildReactDeclarationTypes(value, key);
          types.fullName = key;
          types.name = key;
          types.node = propNode;
          types.isRequired = propsUtil.isRequiredPropType(value);
          declaredPropTypes[key] = types;
        });
        break;
      case 'MemberExpression': {
        let curDeclaredPropTypes = declaredPropTypes;
        // Walk the list of properties, until we reach the assignment
        // ie: ClassX.propTypes.a.b.c = ...
        while (
          propTypes &&
          propTypes.parent &&
          propTypes.parent.type !== 'AssignmentExpression' &&
          propTypes.property &&
          curDeclaredPropTypes
        ) {
          const propName = propTypes.property.name;
          if (propName in curDeclaredPropTypes) {
            curDeclaredPropTypes = curDeclaredPropTypes[propName].children;
            propTypes = propTypes.parent;
          } else {
            // This will crash at runtime because we haven't seen this key before
            // stop this and do not declare it
            propTypes = null;
          }
        }
        if (propTypes && propTypes.parent && propTypes.property) {
          if (!(propTypes === propTypes.parent.left && propTypes.parent.left.object)) {
            ignorePropsValidation = true;
            break;
          }
          const parentProp = context.getSource(propTypes.parent.left.object).replace(/^.*\.propTypes\./, '');
          const types = buildReactDeclarationTypes(
            propTypes.parent.right,
            parentProp
          );

          types.name = propTypes.property.name;
          types.fullName = [parentProp, propTypes.property.name].join('.');
          types.node = propTypes.parent;
          types.isRequired = propsUtil.isRequiredPropType(propTypes.parent.right);
          curDeclaredPropTypes[propTypes.property.name] = types;
        } else {
          let isUsedInPropTypes = false;
          let n = propTypes;
          while (n) {
            if (n.type === 'AssignmentExpression' && propsUtil.isPropTypesDeclaration(n.left) ||
              (n.type === 'ClassProperty' || n.type === 'Property') && propsUtil.isPropTypesDeclaration(n)) {
              // Found a propType used inside of another propType. This is not considered usage, we'll still validate
              // this component.
              isUsedInPropTypes = true;
              break;
            }
            n = n.parent;
          }
          if (!isUsedInPropTypes) {
            ignorePropsValidation = true;
          }
        }
        break;
      }
      case 'Identifier': {
        const variablesInScope = variableUtil.variablesInScope(context);
        const firstMatchingVariable = variablesInScope
          .find(variableInScope => variableInScope.name === propTypes.name);
        if (firstMatchingVariable) {
          const defInScope = firstMatchingVariable.defs[firstMatchingVariable.defs.length - 1];
          markPropTypesAsDeclared(node, defInScope.node && defInScope.node.init);
          return;
        }
        ignorePropsValidation = true;
        break;
      }
      case 'CallExpression': {
        if (
          propWrapperUtil.isPropWrapperFunction(
            context,
            context.getSourceCode().getText(propTypes.callee)
          ) &&
          propTypes.arguments && propTypes.arguments[0]
        ) {
          markPropTypesAsDeclared(node, propTypes.arguments[0]);
          return;
        }
        break;
      }
      case 'IntersectionTypeAnnotation':
        ignorePropsValidation = declarePropTypesForIntersectionTypeAnnotation(propTypes, declaredPropTypes);
        break;
      case null:
        break;
      default:
        ignorePropsValidation = true;
        break;
    }

    components.set(node, {
      declaredPropTypes,
      ignorePropsValidation
    });
  }

  /**
   * @param {ASTNode} node We expect either an ArrowFunctionExpression,
   *   FunctionDeclaration, or FunctionExpression
   */
  function markAnnotatedFunctionArgumentsAsDeclared(node) {
    if (!node.params || !node.params.length || !annotations.isAnnotatedFunctionPropsDeclaration(node, context)) {
      return;
    }

    if (isInsideClassBody(node)) {
      return;
    }

    const param = node.params[0];
    if (param.typeAnnotation && param.typeAnnotation.typeAnnotation && param.typeAnnotation.typeAnnotation.type === 'UnionTypeAnnotation') {
      param.typeAnnotation.typeAnnotation.types.forEach((annotation) => {
        if (annotation.type === 'GenericTypeAnnotation') {
          markPropTypesAsDeclared(node, resolveTypeAnnotation(annotation));
        } else {
          markPropTypesAsDeclared(node, annotation);
        }
      });
    } else {
      markPropTypesAsDeclared(node, resolveTypeAnnotation(param));
    }
  }

  /**
   * Resolve the type annotation for a given class declaration node with superTypeParameters.
   *
   * @param {ASTNode} node The annotation or a node containing the type annotation.
   * @returns {ASTNode} The resolved type annotation for the node.
   */
  function resolveSuperParameterPropsType(node) {
    let propsParameterPosition;
    try {
      // Flow <=0.52 had 3 required TypedParameters of which the second one is the Props.
      // Flow >=0.53 has 2 optional TypedParameters of which the first one is the Props.
      propsParameterPosition = versionUtil.testFlowVersion(context, '0.53.0') ? 0 : 1;
    } catch (e) {
      // In case there is no flow version defined, we can safely assume that when there are 3 Props we are dealing with version <= 0.52
      propsParameterPosition = node.superTypeParameters.params.length <= 2 ? 0 : 1;
    }

    let annotation = node.superTypeParameters.params[propsParameterPosition];
    while (annotation && (annotation.type === 'TypeAnnotation' || annotation.type === 'NullableTypeAnnotation')) {
      annotation = annotation.typeAnnotation;
    }

    if (annotation && annotation.type === 'GenericTypeAnnotation' && getInTypeScope(annotation.id.name)) {
      return getInTypeScope(annotation.id.name);
    }
    return annotation;
  }

  /**
   * Checks if we are declaring a `props` class property with a flow type annotation.
   * @param {ASTNode} node The AST node being checked.
   * @returns {Boolean} True if the node is a type annotated props declaration, false if not.
   */
  function isAnnotatedClassPropsDeclaration(node) {
    if (node && node.type === 'ClassProperty') {
      const tokens = context.getFirstTokens(node, 2);
      if (
        node.typeAnnotation && (
          tokens[0].value === 'props' ||
          (tokens[1] && tokens[1].value === 'props')
        )
      ) {
        return true;
      }
    }
    return false;
  }

  return {
    ClassExpression(node) {
      // TypeParameterDeclaration need to be added to typeScope in order to handle ClassExpressions.
      // This visitor is executed before TypeParameterDeclaration are scoped, therefore we postpone
      // processing class expressions until when the program exists.
      classExpressions.push(node);
    },

    ClassDeclaration(node) {
      if (isSuperTypeParameterPropsDeclaration(node)) {
        markPropTypesAsDeclared(node, resolveSuperParameterPropsType(node));
      }
    },

    ClassProperty(node) {
      if (isAnnotatedClassPropsDeclaration(node)) {
        markPropTypesAsDeclared(node, resolveTypeAnnotation(node));
      } else if (propsUtil.isPropTypesDeclaration(node)) {
        markPropTypesAsDeclared(node, node.value);
      }
    },

    ObjectExpression(node) {
      // Search for the proptypes declaration
      node.properties.forEach((property) => {
        if (!propsUtil.isPropTypesDeclaration(property)) {
          return;
        }
        markPropTypesAsDeclared(node, property.value);
      });
    },

    FunctionExpression(node) {
      if (node.parent.type !== 'MethodDefinition') {
        markAnnotatedFunctionArgumentsAsDeclared(node);
      }
    },

    FunctionDeclaration: markAnnotatedFunctionArgumentsAsDeclared,

    ArrowFunctionExpression: markAnnotatedFunctionArgumentsAsDeclared,

    MemberExpression(node) {
      if (propsUtil.isPropTypesDeclaration(node)) {
        const component = utils.getRelatedComponent(node);
        if (!component) {
          return;
        }
        markPropTypesAsDeclared(component.node, node.parent.right || node.parent);
      }
    },

    MethodDefinition(node) {
      if (!node.static || node.kind !== 'get' || !propsUtil.isPropTypesDeclaration(node)) {
        return;
      }

      let i = node.value.body.body.length - 1;
      for (; i >= 0; i--) {
        if (node.value.body.body[i].type === 'ReturnStatement') {
          break;
        }
      }

      if (i >= 0) {
        markPropTypesAsDeclared(node, node.value.body.body[i].argument);
      }
    },

    TypeAlias(node) {
      setInTypeScope(node.id.name, node.right);
    },

    TypeParameterDeclaration(node) {
      const identifier = node.params[0];

      if (identifier.typeAnnotation) {
        setInTypeScope(identifier.name, identifier.typeAnnotation.typeAnnotation);
      }
    },

    Program() {
      stack = [{}];
    },

    BlockStatement() {
      stack.push(Object.create(typeScope()));
    },

    'BlockStatement:exit': function () {
      stack.pop();
    },

    'Program:exit': function () {
      classExpressions.forEach((node) => {
        if (isSuperTypeParameterPropsDeclaration(node)) {
          markPropTypesAsDeclared(node, resolveSuperParameterPropsType(node));
        }
      });
    }
  };
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for type annotation detection.
 * @author Yannick Croissant
 * @author Vitor Balocco
 */



/**
 * Checks if we are declaring a `props` argument with a flow type annotation.
 * @param {ASTNode} node The AST node being checked.
 * @param {Object} context
 * @returns {Boolean} True if the node is a type annotated props declaration, false if not.
 */
function isAnnotatedFunctionPropsDeclaration(node, context) {
  if (!node || !node.params || !node.params.length) {
    return false;
  }

  const typeNode = node.params[0].type === 'AssignmentPattern' ? node.params[0].left : node.params[0];

  const tokens = context.getFirstTokens(typeNode, 2);
  const isAnnotated = typeNode.typeAnnotation;
  const isDestructuredProps = typeNode.type === 'ObjectPattern';
  const isProps = tokens[0].value === 'props' || (tokens[1] && tokens[1].value === 'props');

  return (isAnnotated && (isDestructuredProps || isProps));
}

module.exports = {
  isAnnotatedFunctionPropsDeclaration
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for props
 */



const astUtil = __webpack_require__(67);

/**
 * Checks if the Identifier node passed in looks like a propTypes declaration.
 * @param {ASTNode} node The node to check. Must be an Identifier node.
 * @returns {Boolean} `true` if the node is a propTypes declaration, `false` if not
 */
function isPropTypesDeclaration(node) {
  if (node && node.type === 'ClassProperty') {
    // Flow support
    if (node.typeAnnotation && node.key.name === 'props') {
      return true;
    }
  }
  return astUtil.getPropertyName(node) === 'propTypes';
}

/**
 * Checks if the node passed in looks like a contextTypes declaration.
 * @param {ASTNode} node The node to check.
 * @returns {Boolean} `true` if the node is a contextTypes declaration, `false` if not
 */
function isContextTypesDeclaration(node) {
  if (node && node.type === 'ClassProperty') {
    // Flow support
    if (node.typeAnnotation && node.key.name === 'context') {
      return true;
    }
  }
  return astUtil.getPropertyName(node) === 'contextTypes';
}

/**
 * Checks if the node passed in looks like a contextType declaration.
 * @param {ASTNode} node The node to check.
 * @returns {Boolean} `true` if the node is a contextType declaration, `false` if not
 */
function isContextTypeDeclaration(node) {
  return astUtil.getPropertyName(node) === 'contextType';
}

/**
 * Checks if the node passed in looks like a childContextTypes declaration.
 * @param {ASTNode} node The node to check.
 * @returns {Boolean} `true` if the node is a childContextTypes declaration, `false` if not
 */
function isChildContextTypesDeclaration(node) {
  return astUtil.getPropertyName(node) === 'childContextTypes';
}

/**
 * Checks if the Identifier node passed in looks like a defaultProps declaration.
 * @param {ASTNode} node The node to check. Must be an Identifier node.
 * @returns {Boolean} `true` if the node is a defaultProps declaration, `false` if not
 */
function isDefaultPropsDeclaration(node) {
  const propName = astUtil.getPropertyName(node);
  return (propName === 'defaultProps' || propName === 'getDefaultProps');
}

/**
 * Checks if we are declaring a display name
 * @param {ASTNode} node The AST node being checked.
 * @returns {Boolean} True if we are declaring a display name, false if not.
 */
function isDisplayNameDeclaration(node) {
  switch (node.type) {
    case 'ClassProperty':
      return node.key && node.key.name === 'displayName';
    case 'Identifier':
      return node.name === 'displayName';
    case 'Literal':
      return node.value === 'displayName';
    default:
      return false;
  }
}

/**
 * Checks if the PropTypes MemberExpression node passed in declares a required propType.
 * @param {ASTNode} propTypeExpression node to check. Must be a `PropTypes` MemberExpression.
 * @returns {Boolean} `true` if this PropType is required, `false` if not.
 */
function isRequiredPropType(propTypeExpression) {
  return propTypeExpression.type === 'MemberExpression' && propTypeExpression.property.name === 'isRequired';
}

module.exports = {
  isPropTypesDeclaration,
  isContextTypesDeclaration,
  isContextTypeDeclaration,
  isChildContextTypesDeclaration,
  isDefaultPropsDeclaration,
  isDisplayNameDeclaration,
  isRequiredPropType
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for React and Flow version configuration
 * @author Yannick Croissant
 */



const resolve = __webpack_require__(72);
const error = __webpack_require__(83);

let warnedForMissingVersion = false;

function resetWarningFlag() {
  warnedForMissingVersion = false;
}

function detectReactVersion() {
  try {
    const reactPath = resolve.sync('react', {basedir: process.cwd()});
    const react = __webpack_require__(84)(reactPath); // eslint-disable-line import/no-dynamic-require
    return react.version;
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      if (!warnedForMissingVersion) {
        error('Warning: React version was set to "detect" in eslint-plugin-react settings, ' +
        'but the "react" package is not installed. Assuming latest React version for linting.');
        warnedForMissingVersion = true;
      }
      return '999.999.999';
    }
    throw e;
  }
}

function getReactVersionFromContext(context) {
  let confVer = '999.999.999';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.version) {
    let settingsVersion = context.settings.react.version;
    if (settingsVersion === 'detect') {
      settingsVersion = detectReactVersion();
    }
    if (typeof settingsVersion !== 'string') {
      error('Warning: React version specified in eslint-plugin-react-settings must be a string; ' +
        `got “${typeof settingsVersion}”`);
    }
    confVer = String(settingsVersion);
  } else if (!warnedForMissingVersion) {
    error('Warning: React version not specified in eslint-plugin-react settings. ' +
      'See https://github.com/yannickcr/eslint-plugin-react#configuration .');
    warnedForMissingVersion = true;
  }
  confVer = /^[0-9]+\.[0-9]+$/.test(confVer) ? `${confVer}.0` : confVer;
  return confVer.split('.').map(part => Number(part));
}

function detectFlowVersion() {
  try {
    const flowPackageJsonPath = resolve.sync('flow-bin/package.json', {basedir: process.cwd()});
    const flowPackageJson = __webpack_require__(84)(flowPackageJsonPath); // eslint-disable-line import/no-dynamic-require
    return flowPackageJson.version;
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      error('Warning: Flow version was set to "detect" in eslint-plugin-react settings, ' +
        'but the "flow-bin" package is not installed. Assuming latest Flow version for linting.');
      return '999.999.999';
    }
    throw e;
  }
}

function getFlowVersionFromContext(context) {
  let confVer = '999.999.999';
  // .eslintrc shared settings (http://eslint.org/docs/user-guide/configuring#adding-shared-settings)
  if (context.settings.react && context.settings.react.flowVersion) {
    let flowVersion = context.settings.react.flowVersion;
    if (flowVersion === 'detect') {
      flowVersion = detectFlowVersion();
    }
    if (typeof flowVersion !== 'string') {
      error('Warning: Flow version specified in eslint-plugin-react-settings must be a string; ' +
        `got “${typeof flowVersion}”`);
    }
    confVer = String(flowVersion);
  } else {
    throw 'Could not retrieve flowVersion from settings'; // eslint-disable-line no-throw-literal
  }
  confVer = /^[0-9]+\.[0-9]+$/.test(confVer) ? `${confVer}.0` : confVer;
  return confVer.split('.').map(part => Number(part));
}

function normalizeParts(parts) {
  return Array.from({length: 3}, (_, i) => (parts[i] || 0));
}

function test(context, methodVer, confVer) {
  const methodVers = normalizeParts(String(methodVer || '').split('.').map(part => Number(part)));
  const confVers = normalizeParts(confVer);
  const higherMajor = methodVers[0] < confVers[0];
  const higherMinor = methodVers[0] === confVers[0] && methodVers[1] < confVers[1];
  const higherOrEqualPatch = methodVers[0] === confVers[0] &&
    methodVers[1] === confVers[1] &&
    methodVers[2] <= confVers[2];

  return higherMajor || higherMinor || higherOrEqualPatch;
}

function testReactVersion(context, methodVer) {
  return test(context, methodVer, getReactVersionFromContext(context));
}

function testFlowVersion(context, methodVer) {
  return test(context, methodVer, getFlowVersionFromContext(context));
}

module.exports = {
  testReactVersion,
  testFlowVersion,
  resetWarningFlag
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(73);
var async = __webpack_require__(75);
async.core = core;
async.isCore = function isCore(x) { return core[x]; };
async.sync = __webpack_require__(82);

exports = async;
module.exports = async;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var current = (process.versions && process.versions.node && process.versions.node.split('.')) || [];

function specifierIncluded(specifier) {
    var parts = specifier.split(' ');
    var op = parts.length > 1 ? parts[0] : '=';
    var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split('.');

    for (var i = 0; i < 3; ++i) {
        var cur = Number(current[i] || 0);
        var ver = Number(versionParts[i] || 0);
        if (cur === ver) {
            continue; // eslint-disable-line no-restricted-syntax, no-continue
        }
        if (op === '<') {
            return cur < ver;
        } else if (op === '>=') {
            return cur >= ver;
        } else {
            return false;
        }
    }
    return op === '>=';
}

function matchesRange(range) {
    var specifiers = range.split(/ ?&& ?/);
    if (specifiers.length === 0) { return false; }
    for (var i = 0; i < specifiers.length; ++i) {
        if (!specifierIncluded(specifiers[i])) { return false; }
    }
    return true;
}

function versionIncluded(specifierValue) {
    if (typeof specifierValue === 'boolean') { return specifierValue; }
    if (specifierValue && typeof specifierValue === 'object') {
        for (var i = 0; i < specifierValue.length; ++i) {
            if (matchesRange(specifierValue[i])) { return true; }
        }
        return false;
    }
    return matchesRange(specifierValue);
}

var data = __webpack_require__(74);

var core = {};
for (var mod in data) { // eslint-disable-line no-restricted-syntax
    if (Object.prototype.hasOwnProperty.call(data, mod)) {
        core[mod] = versionIncluded(data[mod]);
    }
}
module.exports = core;


/***/ }),
/* 74 */
/***/ (function(module) {

module.exports = JSON.parse("{\"assert\":true,\"async_hooks\":\">= 8\",\"buffer_ieee754\":\"< 0.9.7\",\"buffer\":true,\"child_process\":true,\"cluster\":true,\"console\":true,\"constants\":true,\"crypto\":true,\"_debug_agent\":\">= 1 && < 8\",\"_debugger\":\"< 8\",\"dgram\":true,\"dns\":true,\"domain\":true,\"events\":true,\"freelist\":\"< 6\",\"fs\":true,\"fs/promises\":\">= 10 && < 10.1\",\"_http_agent\":\">= 0.11.1\",\"_http_client\":\">= 0.11.1\",\"_http_common\":\">= 0.11.1\",\"_http_incoming\":\">= 0.11.1\",\"_http_outgoing\":\">= 0.11.1\",\"_http_server\":\">= 0.11.1\",\"http\":true,\"http2\":\">= 8.8\",\"https\":true,\"inspector\":\">= 8.0.0\",\"_linklist\":\"< 8\",\"module\":true,\"net\":true,\"node-inspect/lib/_inspect\":\">= 7.6.0 && < 12\",\"node-inspect/lib/internal/inspect_client\":\">= 7.6.0 && < 12\",\"node-inspect/lib/internal/inspect_repl\":\">= 7.6.0 && < 12\",\"os\":true,\"path\":true,\"perf_hooks\":\">= 8.5\",\"process\":\">= 1\",\"punycode\":true,\"querystring\":true,\"readline\":true,\"repl\":true,\"smalloc\":\">= 0.11.5 && < 3\",\"_stream_duplex\":\">= 0.9.4\",\"_stream_transform\":\">= 0.9.4\",\"_stream_wrap\":\">= 1.4.1\",\"_stream_passthrough\":\">= 0.9.4\",\"_stream_readable\":\">= 0.9.4\",\"_stream_writable\":\">= 0.9.4\",\"stream\":true,\"string_decoder\":true,\"sys\":true,\"timers\":true,\"_tls_common\":\">= 0.11.13\",\"_tls_legacy\":\">= 0.11.3 && < 10\",\"_tls_wrap\":\">= 0.11.3\",\"tls\":true,\"trace_events\":\">= 10\",\"tty\":true,\"url\":true,\"util\":true,\"v8/tools/arguments\":\">= 10 && < 12\",\"v8/tools/codemap\":[\">= 4.4.0 && < 5\",\">= 5.2.0 && < 12\"],\"v8/tools/consarray\":[\">= 4.4.0 && < 5\",\">= 5.2.0 && < 12\"],\"v8/tools/csvparser\":[\">= 4.4.0 && < 5\",\">= 5.2.0 && < 12\"],\"v8/tools/logreader\":[\">= 4.4.0 && < 5\",\">= 5.2.0 && < 12\"],\"v8/tools/profile_view\":[\">= 4.4.0 && < 5\",\">= 5.2.0 && < 12\"],\"v8/tools/splaytree\":[\">= 4.4.0 && < 5\",\">= 5.2.0 && < 12\"],\"v8\":\">= 1\",\"vm\":true,\"worker_threads\":\">= 11.7\",\"zlib\":true}");

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(73);
var fs = __webpack_require__(76);
var path = __webpack_require__(77);
var caller = __webpack_require__(78);
var nodeModulesPaths = __webpack_require__(79);
var normalizeOptions = __webpack_require__(81);

var defaultIsFile = function isFile(file, cb) {
    fs.stat(file, function (err, stat) {
        if (!err) {
            return cb(null, stat.isFile() || stat.isFIFO());
        }
        if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return cb(null, false);
        return cb(err);
    });
};

var defaultIsDir = function isDirectory(dir, cb) {
    fs.stat(dir, function (err, stat) {
        if (!err) {
            return cb(null, stat.isDirectory());
        }
        if (err.code === 'ENOENT' || err.code === 'ENOTDIR') return cb(null, false);
        return cb(err);
    });
};

var maybeUnwrapSymlink = function maybeUnwrapSymlink(x, opts, cb) {
    if (opts && opts.preserveSymlinks === false) {
        fs.realpath(x, function (realPathErr, realPath) {
            if (realPathErr && realPathErr.code !== 'ENOENT') cb(realPathErr);
            else cb(null, realPathErr ? x : realPath);
        });
    } else {
        cb(null, x);
    }
};

module.exports = function resolve(x, options, callback) {
    var cb = callback;
    var opts = options;
    if (typeof options === 'function') {
        cb = opts;
        opts = {};
    }
    if (typeof x !== 'string') {
        var err = new TypeError('Path must be a string.');
        return process.nextTick(function () {
            cb(err);
        });
    }

    opts = normalizeOptions(x, opts);

    var isFile = opts.isFile || defaultIsFile;
    var isDirectory = opts.isDirectory || defaultIsDir;
    var readFile = opts.readFile || fs.readFile;

    var extensions = opts.extensions || ['.js'];
    var basedir = opts.basedir || path.dirname(caller());
    var parent = opts.filename || basedir;

    opts.paths = opts.paths || [];

    // ensure that `basedir` is an absolute path at this point, resolving against the process' current working directory
    var absoluteStart = path.resolve(basedir);

    maybeUnwrapSymlink(
        absoluteStart,
        opts,
        function (err, realStart) {
            if (err) cb(err);
            else init(realStart);
        }
    );

    var res;
    function init(basedir) {
        if ((/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/).test(x)) {
            res = path.resolve(basedir, x);
            if (x === '..' || x.slice(-1) === '/') res += '/';
            if ((/\/$/).test(x) && res === basedir) {
                loadAsDirectory(res, opts.package, onfile);
            } else loadAsFile(res, opts.package, onfile);
        } else loadNodeModules(x, basedir, function (err, n, pkg) {
            if (err) cb(err);
            else if (core[x]) return cb(null, x);
            else if (n) {
                return maybeUnwrapSymlink(n, opts, function (err, realN) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, realN, pkg);
                    }
                });
            } else {
                var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
                moduleError.code = 'MODULE_NOT_FOUND';
                cb(moduleError);
            }
        });
    }

    function onfile(err, m, pkg) {
        if (err) cb(err);
        else if (m) cb(null, m, pkg);
        else loadAsDirectory(res, function (err, d, pkg) {
            if (err) cb(err);
            else if (d) {
                maybeUnwrapSymlink(d, opts, function (err, realD) {
                    if (err) {
                        cb(err);
                    } else {
                        cb(null, realD, pkg);
                    }
                });
            } else {
                var moduleError = new Error("Cannot find module '" + x + "' from '" + parent + "'");
                moduleError.code = 'MODULE_NOT_FOUND';
                cb(moduleError);
            }
        });
    }

    function loadAsFile(x, thePackage, callback) {
        var loadAsFilePackage = thePackage;
        var cb = callback;
        if (typeof loadAsFilePackage === 'function') {
            cb = loadAsFilePackage;
            loadAsFilePackage = undefined;
        }

        var exts = [''].concat(extensions);
        load(exts, x, loadAsFilePackage);

        function load(exts, x, loadPackage) {
            if (exts.length === 0) return cb(null, undefined, loadPackage);
            var file = x + exts[0];

            var pkg = loadPackage;
            if (pkg) onpkg(null, pkg);
            else loadpkg(path.dirname(file), onpkg);

            function onpkg(err, pkg_, dir) {
                pkg = pkg_;
                if (err) return cb(err);
                if (dir && pkg && opts.pathFilter) {
                    var rfile = path.relative(dir, file);
                    var rel = rfile.slice(0, rfile.length - exts[0].length);
                    var r = opts.pathFilter(pkg, x, rel);
                    if (r) return load(
                        [''].concat(extensions.slice()),
                        path.resolve(dir, r),
                        pkg
                    );
                }
                isFile(file, onex);
            }
            function onex(err, ex) {
                if (err) return cb(err);
                if (ex) return cb(null, file, pkg);
                load(exts.slice(1), x, pkg);
            }
        }
    }

    function loadpkg(dir, cb) {
        if (dir === '' || dir === '/') return cb(null);
        if (process.platform === 'win32' && (/^\w:[/\\]*$/).test(dir)) {
            return cb(null);
        }
        if ((/[/\\]node_modules[/\\]*$/).test(dir)) return cb(null);

        var pkgfile = path.join(dir, 'package.json');
        isFile(pkgfile, function (err, ex) {
            // on err, ex is false
            if (!ex) return loadpkg(path.dirname(dir), cb);

            readFile(pkgfile, function (err, body) {
                if (err) cb(err);
                try { var pkg = JSON.parse(body); } catch (jsonErr) {}

                if (pkg && opts.packageFilter) {
                    pkg = opts.packageFilter(pkg, pkgfile);
                }
                cb(null, pkg, dir);
            });
        });
    }

    function loadAsDirectory(x, loadAsDirectoryPackage, callback) {
        var cb = callback;
        var fpkg = loadAsDirectoryPackage;
        if (typeof fpkg === 'function') {
            cb = fpkg;
            fpkg = opts.package;
        }

        var pkgfile = path.join(x, 'package.json');
        isFile(pkgfile, function (err, ex) {
            if (err) return cb(err);
            if (!ex) return loadAsFile(path.join(x, 'index'), fpkg, cb);

            readFile(pkgfile, function (err, body) {
                if (err) return cb(err);
                try {
                    var pkg = JSON.parse(body);
                } catch (jsonErr) {}

                if (opts.packageFilter) {
                    pkg = opts.packageFilter(pkg, pkgfile);
                }

                if (pkg.main) {
                    if (typeof pkg.main !== 'string') {
                        var mainError = new TypeError('package “' + pkg.name + '” `main` must be a string');
                        mainError.code = 'INVALID_PACKAGE_MAIN';
                        return cb(mainError);
                    }
                    if (pkg.main === '.' || pkg.main === './') {
                        pkg.main = 'index';
                    }
                    loadAsFile(path.resolve(x, pkg.main), pkg, function (err, m, pkg) {
                        if (err) return cb(err);
                        if (m) return cb(null, m, pkg);
                        if (!pkg) return loadAsFile(path.join(x, 'index'), pkg, cb);

                        var dir = path.resolve(x, pkg.main);
                        loadAsDirectory(dir, pkg, function (err, n, pkg) {
                            if (err) return cb(err);
                            if (n) return cb(null, n, pkg);
                            loadAsFile(path.join(x, 'index'), pkg, cb);
                        });
                    });
                    return;
                }

                loadAsFile(path.join(x, '/index'), pkg, cb);
            });
        });
    }

    function processDirs(cb, dirs) {
        if (dirs.length === 0) return cb(null, undefined);
        var dir = dirs[0];

        isDirectory(dir, isdir);

        function isdir(err, isdir) {
            if (err) return cb(err);
            if (!isdir) return processDirs(cb, dirs.slice(1));
            var file = path.join(dir, x);
            loadAsFile(file, opts.package, onfile);
        }

        function onfile(err, m, pkg) {
            if (err) return cb(err);
            if (m) return cb(null, m, pkg);
            loadAsDirectory(path.join(dir, x), opts.package, ondir);
        }

        function ondir(err, n, pkg) {
            if (err) return cb(err);
            if (n) return cb(null, n, pkg);
            processDirs(cb, dirs.slice(1));
        }
    }
    function loadNodeModules(x, start, cb) {
        processDirs(cb, nodeModulesPaths(start, opts, x));
    }
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function () {
    // see https://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
    var origPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (_, stack) { return stack; };
    var stack = (new Error()).stack;
    Error.prepareStackTrace = origPrepareStackTrace;
    return stack[2].getFileName();
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__(77);
var parse = path.parse || __webpack_require__(80);

var getNodeModulesDirs = function getNodeModulesDirs(absoluteStart, modules) {
    var prefix = '/';
    if ((/^([A-Za-z]:)/).test(absoluteStart)) {
        prefix = '';
    } else if ((/^\\\\/).test(absoluteStart)) {
        prefix = '\\\\';
    }

    var paths = [absoluteStart];
    var parsed = parse(absoluteStart);
    while (parsed.dir !== paths[paths.length - 1]) {
        paths.push(parsed.dir);
        parsed = parse(parsed.dir);
    }

    return paths.reduce(function (dirs, aPath) {
        return dirs.concat(modules.map(function (moduleDir) {
            return path.resolve(prefix, aPath, moduleDir);
        }));
    }, []);
};

module.exports = function nodeModulesPaths(start, opts, request) {
    var modules = opts && opts.moduleDirectory
        ? [].concat(opts.moduleDirectory)
        : ['node_modules'];

    if (opts && typeof opts.paths === 'function') {
        return opts.paths(
            request,
            start,
            function () { return getNodeModulesDirs(start, modules); },
            opts
        );
    }

    var dirs = getNodeModulesDirs(start, modules);
    return opts && opts.paths ? dirs.concat(opts.paths) : dirs;
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isWindows = process.platform === 'win32';

// Regex to split a windows path into three parts: [*, device, slash,
// tail] windows-only
var splitDeviceRe =
    /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;

// Regex to split the tail part of the above into [*, dir, basename, ext]
var splitTailRe =
    /^([\s\S]*?)((?:\.{1,2}|[^\\\/]+?|)(\.[^.\/\\]*|))(?:[\\\/]*)$/;

var win32 = {};

// Function to split a filename into [root, dir, basename, ext]
function win32SplitPath(filename) {
  // Separate device+slash from tail
  var result = splitDeviceRe.exec(filename),
      device = (result[1] || '') + (result[2] || ''),
      tail = result[3] || '';
  // Split the tail into dir, basename and extension
  var result2 = splitTailRe.exec(tail),
      dir = result2[1],
      basename = result2[2],
      ext = result2[3];
  return [device, dir, basename, ext];
}

win32.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = win32SplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};



// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var posix = {};


function posixSplitPath(filename) {
  return splitPathRe.exec(filename).slice(1);
}


posix.parse = function(pathString) {
  if (typeof pathString !== 'string') {
    throw new TypeError(
        "Parameter 'pathString' must be a string, not " + typeof pathString
    );
  }
  var allParts = posixSplitPath(pathString);
  if (!allParts || allParts.length !== 4) {
    throw new TypeError("Invalid path '" + pathString + "'");
  }
  allParts[1] = allParts[1] || '';
  allParts[2] = allParts[2] || '';
  allParts[3] = allParts[3] || '';

  return {
    root: allParts[0],
    dir: allParts[0] + allParts[1].slice(0, -1),
    base: allParts[2],
    ext: allParts[3],
    name: allParts[2].slice(0, allParts[2].length - allParts[3].length)
  };
};


if (isWindows)
  module.exports = win32.parse;
else /* posix */
  module.exports = posix.parse;

module.exports.posix = posix.parse;
module.exports.win32 = win32.parse;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function (x, opts) {
    /**
     * This file is purposefully a passthrough. It's expected that third-party
     * environments will override it at runtime in order to inject special logic
     * into `resolve` (by manipulating the options). One such example is the PnP
     * code path in Yarn.
     */

    return opts || {};
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(73);
var fs = __webpack_require__(76);
var path = __webpack_require__(77);
var caller = __webpack_require__(78);
var nodeModulesPaths = __webpack_require__(79);
var normalizeOptions = __webpack_require__(81);

var defaultIsFile = function isFile(file) {
    try {
        var stat = fs.statSync(file);
    } catch (e) {
        if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
        throw e;
    }
    return stat.isFile() || stat.isFIFO();
};

var defaultIsDir = function isDirectory(dir) {
    try {
        var stat = fs.statSync(dir);
    } catch (e) {
        if (e && (e.code === 'ENOENT' || e.code === 'ENOTDIR')) return false;
        throw e;
    }
    return stat.isDirectory();
};

var maybeUnwrapSymlink = function maybeUnwrapSymlink(x, opts) {
    if (opts && opts.preserveSymlinks === false) {
        try {
            return fs.realpathSync(x);
        } catch (realPathErr) {
            if (realPathErr.code !== 'ENOENT') {
                throw realPathErr;
            }
        }
    }
    return x;
};

module.exports = function (x, options) {
    if (typeof x !== 'string') {
        throw new TypeError('Path must be a string.');
    }
    var opts = normalizeOptions(x, options);

    var isFile = opts.isFile || defaultIsFile;
    var readFileSync = opts.readFileSync || fs.readFileSync;
    var isDirectory = opts.isDirectory || defaultIsDir;

    var extensions = opts.extensions || ['.js'];
    var basedir = opts.basedir || path.dirname(caller());
    var parent = opts.filename || basedir;

    opts.paths = opts.paths || [];

    // ensure that `basedir` is an absolute path at this point, resolving against the process' current working directory
    var absoluteStart = maybeUnwrapSymlink(path.resolve(basedir), opts);

    if ((/^(?:\.\.?(?:\/|$)|\/|([A-Za-z]:)?[/\\])/).test(x)) {
        var res = path.resolve(absoluteStart, x);
        if (x === '..' || x.slice(-1) === '/') res += '/';
        var m = loadAsFileSync(res) || loadAsDirectorySync(res);
        if (m) return maybeUnwrapSymlink(m, opts);
    } else if (core[x]) {
        return x;
    } else {
        var n = loadNodeModulesSync(x, absoluteStart);
        if (n) return maybeUnwrapSymlink(n, opts);
    }

    if (core[x]) return x;

    var err = new Error("Cannot find module '" + x + "' from '" + parent + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;

    function loadAsFileSync(x) {
        var pkg = loadpkg(path.dirname(x));

        if (pkg && pkg.dir && pkg.pkg && opts.pathFilter) {
            var rfile = path.relative(pkg.dir, x);
            var r = opts.pathFilter(pkg.pkg, x, rfile);
            if (r) {
                x = path.resolve(pkg.dir, r); // eslint-disable-line no-param-reassign
            }
        }

        if (isFile(x)) {
            return x;
        }

        for (var i = 0; i < extensions.length; i++) {
            var file = x + extensions[i];
            if (isFile(file)) {
                return file;
            }
        }
    }

    function loadpkg(dir) {
        if (dir === '' || dir === '/') return;
        if (process.platform === 'win32' && (/^\w:[/\\]*$/).test(dir)) {
            return;
        }
        if ((/[/\\]node_modules[/\\]*$/).test(dir)) return;

        var pkgfile = path.join(dir, 'package.json');

        if (!isFile(pkgfile)) {
            return loadpkg(path.dirname(dir));
        }

        var body = readFileSync(pkgfile);

        try {
            var pkg = JSON.parse(body);
        } catch (jsonErr) {}

        if (pkg && opts.packageFilter) {
            pkg = opts.packageFilter(pkg, dir);
        }

        return { pkg: pkg, dir: dir };
    }

    function loadAsDirectorySync(x) {
        var pkgfile = path.join(x, '/package.json');
        if (isFile(pkgfile)) {
            try {
                var body = readFileSync(pkgfile, 'UTF8');
                var pkg = JSON.parse(body);
            } catch (e) {}

            if (opts.packageFilter) {
                pkg = opts.packageFilter(pkg, x);
            }

            if (pkg.main) {
                if (typeof pkg.main !== 'string') {
                    var mainError = new TypeError('package “' + pkg.name + '” `main` must be a string');
                    mainError.code = 'INVALID_PACKAGE_MAIN';
                    throw mainError;
                }
                if (pkg.main === '.' || pkg.main === './') {
                    pkg.main = 'index';
                }
                try {
                    var m = loadAsFileSync(path.resolve(x, pkg.main));
                    if (m) return m;
                    var n = loadAsDirectorySync(path.resolve(x, pkg.main));
                    if (n) return n;
                } catch (e) {}
            }
        }

        return loadAsFileSync(path.join(x, '/index'));
    }

    function loadNodeModulesSync(x, start) {
        var dirs = nodeModulesPaths(start, opts, x);
        for (var i = 0; i < dirs.length; i++) {
            var dir = dirs[i];
            if (isDirectory(dir)) {
                var m = loadAsFileSync(path.join(dir, '/', x));
                if (m) return m;
                var n = loadAsDirectorySync(path.join(dir, '/', x));
                if (n) return n;
            }
        }
    }
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Logs out a message if there is no format option set.
 * @param {String} message - Message to log.
 */
function error(message) {
  if (!/=-(f|-format)=/.test(process.argv.join('='))) {
    // eslint-disable-next-line no-console
    console.error(message);
  }
}

module.exports = error;


/***/ }),
/* 84 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 84;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for propWrapperFunctions setting
 */



function getPropWrapperFunctions(context) {
  return new Set(context.settings.propWrapperFunctions || []);
}

function isPropWrapperFunction(context, name) {
  if (typeof name !== 'string') {
    return false;
  }
  const propWrapperFunctions = getPropWrapperFunctions(context);
  const splitName = name.split('.');
  return Array.from(propWrapperFunctions).some((func) => {
    if (splitName.length === 2 && func.object === splitName[0] && func.property === splitName[1]) {
      return true;
    }
    return name === func || func.property === name;
  });
}

module.exports = {
  getPropWrapperFunctions,
  isPropWrapperFunction
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for JSX
 */



const elementType = __webpack_require__(87);

const COMPAT_TAG_REGEX = /^[a-z]|-/;

/**
 * Checks if a node represents a DOM element.
 * @param {object} node - JSXOpeningElement to check.
 * @returns {boolean} Whether or not the node corresponds to a DOM element.
 */
function isDOMComponent(node) {
  let name = elementType(node);

  // Get namespace if the type is JSXNamespacedName or JSXMemberExpression
  if (name.indexOf(':') > -1) {
    name = name.slice(0, name.indexOf(':'));
  } else if (name.indexOf('.') > -1) {
    name = name.slice(0, name.indexOf('.'));
  }

  return COMPAT_TAG_REGEX.test(name);
}

/**
 * Checks if a node represents a JSX element or fragment.
 * @param {object} node - node to check.
 * @returns {boolean} Whether or not the node if a JSX element or fragment.
 */
function isJSX(node) {
  return node && ['JSXElement', 'JSXFragment'].indexOf(node.type) >= 0;
}

module.exports = {
  isDOMComponent,
  isJSX
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88).elementType; // eslint-disable-line import/no-unresolved


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _hasProp = __webpack_require__(89);

var _hasProp2 = _interopRequireDefault(_hasProp);

var _elementType = __webpack_require__(91);

var _elementType2 = _interopRequireDefault(_elementType);

var _eventHandlers = __webpack_require__(92);

var _eventHandlers2 = _interopRequireDefault(_eventHandlers);

var _getProp = __webpack_require__(93);

var _getProp2 = _interopRequireDefault(_getProp);

var _getPropValue = __webpack_require__(94);

var _getPropValue2 = _interopRequireDefault(_getPropValue);

var _propName = __webpack_require__(90);

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
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasProp;
exports.hasAnyProp = hasAnyProp;
exports.hasEveryProp = hasEveryProp;

var _propName = __webpack_require__(90);

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
/* 90 */
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
/* 91 */
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
/* 92 */
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
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProp;

var _propName = __webpack_require__(90);

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
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPropValue;
exports.getLiteralPropValue = getLiteralPropValue;

var _values = __webpack_require__(95);

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
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getValue;
exports.getLiteralValue = getLiteralValue;

var _object = __webpack_require__(96);

var _object2 = _interopRequireDefault(_object);

var _Literal = __webpack_require__(100);

var _Literal2 = _interopRequireDefault(_Literal);

var _JSXElement = __webpack_require__(101);

var _JSXElement2 = _interopRequireDefault(_JSXElement);

var _expressions = __webpack_require__(102);

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
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperties = __webpack_require__(4);

var implementation = __webpack_require__(97);
var getPolyfill = __webpack_require__(98);
var shim = __webpack_require__(99);

var polyfill = getPolyfill();

defineProperties(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var keys = __webpack_require__(5);
var bind = __webpack_require__(16);
var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols = __webpack_require__(13)();
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
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(97);

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
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(4);
var getPolyfill = __webpack_require__(98);

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
/* 100 */
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
/* 101 */
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
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extract;
exports.extractLiteral = extractLiteral;

var _object = __webpack_require__(96);

var _object2 = _interopRequireDefault(_object);

var _Literal = __webpack_require__(100);

var _Literal2 = _interopRequireDefault(_Literal);

var _JSXElement = __webpack_require__(101);

var _JSXElement2 = _interopRequireDefault(_JSXElement);

var _Identifier = __webpack_require__(103);

var _Identifier2 = _interopRequireDefault(_Identifier);

var _TaggedTemplateExpression = __webpack_require__(104);

var _TaggedTemplateExpression2 = _interopRequireDefault(_TaggedTemplateExpression);

var _TemplateLiteral = __webpack_require__(105);

var _TemplateLiteral2 = _interopRequireDefault(_TemplateLiteral);

var _FunctionExpression = __webpack_require__(106);

var _FunctionExpression2 = _interopRequireDefault(_FunctionExpression);

var _LogicalExpression = __webpack_require__(107);

var _LogicalExpression2 = _interopRequireDefault(_LogicalExpression);

var _MemberExpression = __webpack_require__(108);

var _MemberExpression2 = _interopRequireDefault(_MemberExpression);

var _OptionalMemberExpression = __webpack_require__(109);

var _OptionalMemberExpression2 = _interopRequireDefault(_OptionalMemberExpression);

var _CallExpression = __webpack_require__(110);

var _CallExpression2 = _interopRequireDefault(_CallExpression);

var _UnaryExpression = __webpack_require__(111);

var _UnaryExpression2 = _interopRequireDefault(_UnaryExpression);

var _ThisExpression = __webpack_require__(112);

var _ThisExpression2 = _interopRequireDefault(_ThisExpression);

var _ConditionalExpression = __webpack_require__(113);

var _ConditionalExpression2 = _interopRequireDefault(_ConditionalExpression);

var _BinaryExpression = __webpack_require__(114);

var _BinaryExpression2 = _interopRequireDefault(_BinaryExpression);

var _ObjectExpression = __webpack_require__(115);

var _ObjectExpression2 = _interopRequireDefault(_ObjectExpression);

var _NewExpression = __webpack_require__(116);

var _NewExpression2 = _interopRequireDefault(_NewExpression);

var _UpdateExpression = __webpack_require__(117);

var _UpdateExpression2 = _interopRequireDefault(_UpdateExpression);

var _ArrayExpression = __webpack_require__(118);

var _ArrayExpression2 = _interopRequireDefault(_ArrayExpression);

var _BindExpression = __webpack_require__(119);

var _BindExpression2 = _interopRequireDefault(_BindExpression);

var _SpreadElement = __webpack_require__(120);

var _SpreadElement2 = _interopRequireDefault(_SpreadElement);

var _TypeCastExpression = __webpack_require__(121);

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
/* 103 */
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
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromTaggedTemplateExpression;

var _TemplateLiteral = __webpack_require__(105);

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
/* 105 */
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
/* 106 */
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
/* 107 */
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
  var getValue = __webpack_require__(102).default;
  var operator = value.operator,
      left = value.left,
      right = value.right;

  var leftVal = getValue(left);
  var rightVal = getValue(right);

  return operator === '&&' ? leftVal && rightVal : leftVal || rightVal;
}

/***/ }),
/* 108 */
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
  var getValue = __webpack_require__(102).default;
  return getValue(value.object) + '.' + getValue(value.property);
}

/***/ }),
/* 109 */
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
  var getValue = __webpack_require__(102).default;
  return getValue(value.object) + '?.' + getValue(value.property);
}

/***/ }),
/* 110 */
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
  var getValue = __webpack_require__(102).default;
  return getValue(value.callee);
}

/***/ }),
/* 111 */
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
  var getValue = __webpack_require__(102).default;
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
/* 112 */
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
/* 113 */
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
  var getValue = __webpack_require__(102).default;
  var test = value.test,
      alternate = value.alternate,
      consequent = value.consequent;


  return getValue(test) ? getValue(consequent) : getValue(alternate);
}

/***/ }),
/* 114 */
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
  var getValue = __webpack_require__(102).default;
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
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractValueFromObjectExpression;

var _object = __webpack_require__(96);

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
  var getValue = __webpack_require__(102).default;
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
/* 116 */
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
/* 117 */
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
  var getValue = __webpack_require__(102).default;
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
/* 118 */
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
  var getValue = __webpack_require__(102).default;
  return value.elements.map(function (element) {
    return getValue(element);
  });
}

/***/ }),
/* 119 */
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
  var getValue = __webpack_require__(102).default;
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
/* 120 */
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
/* 121 */
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
  var getValue = __webpack_require__(102).default;
  return getValue(value.expression);
}

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Common used propTypes detection functionality.
 */



const astUtil = __webpack_require__(67);
const versionUtil = __webpack_require__(71);
const ast = __webpack_require__(67);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const LIFE_CYCLE_METHODS = ['componentWillReceiveProps', 'shouldComponentUpdate', 'componentWillUpdate', 'componentDidUpdate'];
const ASYNC_SAFE_LIFE_CYCLE_METHODS = ['getDerivedStateFromProps', 'getSnapshotBeforeUpdate', 'UNSAFE_componentWillReceiveProps', 'UNSAFE_componentWillUpdate'];

function createPropVariables() {
  /** @type {Map<string, string[]>} Maps the variable to its definition. `props.a.b` is stored as `['a', 'b']` */
  let propVariables = new Map();
  let hasBeenWritten = false;
  const stack = [{propVariables, hasBeenWritten}];
  return {
    pushScope() {
      // popVariables is not copied until first write.
      stack.push({propVariables, hasBeenWritten: false});
    },
    popScope() {
      stack.pop();
      propVariables = stack[stack.length - 1].propVariables;
      hasBeenWritten = stack[stack.length - 1].hasBeenWritten;
    },
    /**
     * Add a variable name to the current scope
     * @param {string} name
     * @param {string[]} allNames Example: `props.a.b` should be formatted as `['a', 'b']`
     */
    set(name, allNames) {
      if (!hasBeenWritten) {
        // copy on write
        propVariables = new Map(propVariables);
        Object.assign(stack[stack.length - 1], {propVariables, hasBeenWritten: true});
        stack[stack.length - 1].hasBeenWritten = true;
      }
      return propVariables.set(name, allNames);
    },
    /**
     * Get the definition of a variable.
     * @param {string} name
     * @returns {string[]} Example: `props.a.b` is represented by `['a', 'b']`
     */
    get(name) {
      return propVariables.get(name);
    }
  };
}

/**
 * Checks if the string is one of `props`, `nextProps`, or `prevProps`
 * @param {string} name The AST node being checked.
 * @returns {Boolean} True if the prop name matches
 */
function isCommonVariableNameForProps(name) {
  return name === 'props' || name === 'nextProps' || name === 'prevProps';
}

/**
 * Checks if the component must be validated
 * @param {Object} component The component to process
 * @returns {Boolean} True if the component must be validated, false if not.
 */
function mustBeValidated(component) {
  return !!(component && !component.ignorePropsValidation);
}

/**
 * Check if we are in a lifecycle method
 * @return {boolean} true if we are in a class constructor, false if not
 */
function inLifeCycleMethod(context, checkAsyncSafeLifeCycles) {
  let scope = context.getScope();
  while (scope) {
    if (scope.block && scope.block.parent && scope.block.parent.key) {
      const name = scope.block.parent.key.name;

      if (LIFE_CYCLE_METHODS.indexOf(name) >= 0) {
        return true;
      }
      if (checkAsyncSafeLifeCycles && ASYNC_SAFE_LIFE_CYCLE_METHODS.indexOf(name) >= 0) {
        return true;
      }
    }
    scope = scope.upper;
  }
  return false;
}

/**
 * Returns true if the given node is a React Component lifecycle method
 * @param {ASTNode} node The AST node being checked.
 * @return {Boolean} True if the node is a lifecycle method
 */
function isNodeALifeCycleMethod(node, checkAsyncSafeLifeCycles) {
  const nodeKeyName = (node.key || /** @type {ASTNode} */ ({})).name;

  if (node.kind === 'constructor') {
    return true;
  }
  if (LIFE_CYCLE_METHODS.indexOf(nodeKeyName) >= 0) {
    return true;
  }
  if (checkAsyncSafeLifeCycles && ASYNC_SAFE_LIFE_CYCLE_METHODS.indexOf(nodeKeyName) >= 0) {
    return true;
  }

  return false;
}

/**
 * Returns true if the given node is inside a React Component lifecycle
 * method.
 * @param {ASTNode} node The AST node being checked.
 * @return {Boolean} True if the node is inside a lifecycle method
 */
function isInLifeCycleMethod(node, checkAsyncSafeLifeCycles) {
  if ((node.type === 'MethodDefinition' || node.type === 'Property') && isNodeALifeCycleMethod(node, checkAsyncSafeLifeCycles)) {
    return true;
  }

  if (node.parent) {
    return isInLifeCycleMethod(node.parent, checkAsyncSafeLifeCycles);
  }

  return false;
}

/**
 * Check if the current node is in a setState updater method
 * @return {boolean} true if we are in a setState updater, false if not
 */
function inSetStateUpdater(context) {
  let scope = context.getScope();
  while (scope) {
    if (
      scope.block && scope.block.parent &&
      scope.block.parent.type === 'CallExpression' &&
      scope.block.parent.callee.property &&
      scope.block.parent.callee.property.name === 'setState' &&
      // Make sure we are in the updater not the callback
      scope.block.parent.arguments[0].start === scope.block.start
    ) {
      return true;
    }
    scope = scope.upper;
  }
  return false;
}

function isPropArgumentInSetStateUpdater(context, name) {
  if (typeof name !== 'string') {
    return;
  }
  let scope = context.getScope();
  while (scope) {
    if (
      scope.block && scope.block.parent &&
      scope.block.parent.type === 'CallExpression' &&
      scope.block.parent.callee.property &&
      scope.block.parent.callee.property.name === 'setState' &&
      // Make sure we are in the updater not the callback
      scope.block.parent.arguments[0].start === scope.block.start &&
      scope.block.parent.arguments[0].params &&
      scope.block.parent.arguments[0].params.length > 1
    ) {
      return scope.block.parent.arguments[0].params[1].name === name;
    }
    scope = scope.upper;
  }
  return false;
}

function isInClassComponent(utils) {
  return utils.getParentES6Component() || utils.getParentES5Component();
}

/**
 * Checks if the node is `this.props`
 * @param {ASTNode|undefined} node
 * @returns {boolean}
 */
function isThisDotProps(node) {
  return !!node &&
    node.type === 'MemberExpression' &&
    node.object.type === 'ThisExpression' &&
    node.property.name === 'props';
}

/**
 * Checks if the prop has spread operator.
 * @param {ASTNode} node The AST node being marked.
 * @returns {Boolean} True if the prop has spread operator, false if not.
 */
function hasSpreadOperator(context, node) {
  const tokens = context.getSourceCode().getTokens(node);
  return tokens.length && tokens[0].value === '...';
}

/**
 * Retrieve the name of a property node
 * @param {ASTNode} node The AST node with the property.
 * @return {string|undefined} the name of the property or undefined if not found
 */
function getPropertyName(node) {
  const property = node.property;
  if (property) {
    switch (property.type) {
      case 'Identifier':
        if (node.computed) {
          return '__COMPUTED_PROP__';
        }
        return property.name;
      case 'MemberExpression':
        return;
      case 'Literal':
        // Accept computed properties that are literal strings
        if (typeof property.value === 'string') {
          return property.value;
        }
        // falls through
      default:
        if (node.computed) {
          return '__COMPUTED_PROP__';
        }
        break;
    }
  }
}

/**
 * Checks if the node is a propTypes usage of the form `this.props.*`, `props.*`, `prevProps.*`, or `nextProps.*`.
 * @param {ASTNode} node
 * @param {Context} context
 * @param {Object} utils
 * @param {boolean} checkAsyncSafeLifeCycles
 * @returns {boolean}
 */
function isPropTypesUsageByMemberExpression(node, context, utils, checkAsyncSafeLifeCycles) {
  if (isInClassComponent(utils)) {
    // this.props.*
    if (isThisDotProps(node.object)) {
      return true;
    }
    // props.* or prevProps.* or nextProps.*
    if (
      isCommonVariableNameForProps(node.object.name) &&
      (inLifeCycleMethod(context, checkAsyncSafeLifeCycles) || utils.inConstructor())
    ) {
      return true;
    }
    // this.setState((_, props) => props.*))
    if (isPropArgumentInSetStateUpdater(context, node.object.name)) {
      return true;
    }
    return false;
  }
  // props.* in function component
  return node.object.name === 'props' && !ast.isAssignmentLHS(node);
}

module.exports = function usedPropTypesInstructions(context, components, utils) {
  const checkAsyncSafeLifeCycles = versionUtil.testReactVersion(context, '16.3.0');

  const propVariables = createPropVariables();
  const pushScope = propVariables.pushScope;
  const popScope = propVariables.popScope;

  /**
   * Mark a prop type as used
   * @param {ASTNode} node The AST node being marked.
   * @param {string[]} [parentNames]
   */
  function markPropTypesAsUsed(node, parentNames) {
    parentNames = parentNames || [];
    let type;
    let name;
    let allNames;
    let properties;
    switch (node.type) {
      case 'MemberExpression':
        name = getPropertyName(node);
        if (name) {
          allNames = parentNames.concat(name);
          if (
            // Match props.foo.bar, don't match bar[props.foo]
            node.parent.type === 'MemberExpression' &&
            node.parent.object === node
          ) {
            markPropTypesAsUsed(node.parent, allNames);
          }
          // Handle the destructuring part of `const {foo} = props.a.b`
          if (
            node.parent.type === 'VariableDeclarator' &&
            node.parent.id.type === 'ObjectPattern'
          ) {
            node.parent.id.parent = node.parent; // patch for bug in eslint@4 in which ObjectPattern has no parent
            markPropTypesAsUsed(node.parent.id, allNames);
          }

          // const a = props.a
          if (
            node.parent.type === 'VariableDeclarator' &&
            node.parent.id.type === 'Identifier'
          ) {
            propVariables.set(node.parent.id.name, allNames);
          }
          // Do not mark computed props as used.
          type = name !== '__COMPUTED_PROP__' ? 'direct' : null;
        }
        break;
      case 'ArrowFunctionExpression':
      case 'FunctionDeclaration':
      case 'FunctionExpression': {
        if (node.params.length === 0) {
          break;
        }
        type = 'destructuring';
        const propParam = inSetStateUpdater(context) ? node.params[1] : node.params[0];
        properties = propParam.type === 'AssignmentPattern' ?
          propParam.left.properties :
          propParam.properties;
        break;
      }
      case 'ObjectPattern':
        type = 'destructuring';
        properties = node.properties;
        break;
      default:
        throw new Error(`${node.type} ASTNodes are not handled by markPropTypesAsUsed`);
    }

    const component = components.get(utils.getParentComponent());
    const usedPropTypes = component && component.usedPropTypes || [];
    let ignoreUnusedPropTypesValidation = component && component.ignoreUnusedPropTypesValidation || false;

    switch (type) {
      case 'direct': {
        // Ignore Object methods
        if (name in Object.prototype) {
          break;
        }

        const reportedNode = node.property;
        usedPropTypes.push({
          name,
          allNames,
          node: reportedNode
        });
        break;
      }
      case 'destructuring': {
        for (let k = 0, l = (properties || []).length; k < l; k++) {
          if (hasSpreadOperator(context, properties[k]) || properties[k].computed) {
            ignoreUnusedPropTypesValidation = true;
            break;
          }
          const propName = ast.getKeyValue(context, properties[k]);

          if (propName) {
            propVariables.set(propName, parentNames.concat(propName));
            usedPropTypes.push({
              allNames: parentNames.concat([propName]),
              name: propName,
              node: properties[k]
            });
          }

          if (
            propName &&
            properties[k].type === 'Property' &&
            properties[k].value.type === 'ObjectPattern'
          ) {
            markPropTypesAsUsed(properties[k].value, parentNames.concat([propName]));
          }
        }
        break;
      }
      default:
        break;
    }

    components.set(component ? component.node : node, {
      usedPropTypes,
      ignoreUnusedPropTypesValidation
    });
  }

  /**
   * @param {ASTNode} node We expect either an ArrowFunctionExpression,
   *   FunctionDeclaration, or FunctionExpression
   */
  function markDestructuredFunctionArgumentsAsUsed(node) {
    const param = node.params && inSetStateUpdater(context) ? node.params[1] : node.params[0];

    const destructuring = param && (
      param.type === 'ObjectPattern' ||
      param.type === 'AssignmentPattern' && param.left.type === 'ObjectPattern'
    );

    if (destructuring && (components.get(node) || components.get(node.parent))) {
      markPropTypesAsUsed(node);
    }
  }

  function handleSetStateUpdater(node) {
    if (!node.params || node.params.length < 2 || !inSetStateUpdater(context)) {
      return;
    }
    markPropTypesAsUsed(node);
  }

  /**
   * Handle both stateless functions and setState updater functions.
   * @param {ASTNode} node We expect either an ArrowFunctionExpression,
   *   FunctionDeclaration, or FunctionExpression
   */
  function handleFunctionLikeExpressions(node) {
    pushScope();
    handleSetStateUpdater(node);
    markDestructuredFunctionArgumentsAsUsed(node);
  }

  function handleCustomValidators(component) {
    const propTypes = component.declaredPropTypes;
    if (!propTypes) {
      return;
    }

    Object.keys(propTypes).forEach((key) => {
      const node = propTypes[key].node;

      if (node.value && astUtil.isFunctionLikeExpression(node.value)) {
        markPropTypesAsUsed(node.value);
      }
    });
  }

  return {
    VariableDeclarator(node) {
      // let props = this.props
      if (isThisDotProps(node.init) && isInClassComponent(utils) && node.id.type === 'Identifier') {
        propVariables.set(node.id.name, []);
      }

      // Only handles destructuring
      if (node.id.type !== 'ObjectPattern' || !node.init) {
        return;
      }

      // let {props: {firstname}} = this
      const propsProperty = node.id.properties.find(property => (
        property.key &&
        (property.key.name === 'props' || property.key.value === 'props')
      ));
      if (node.init.type === 'ThisExpression' && propsProperty && propsProperty.value.type === 'ObjectPattern') {
        markPropTypesAsUsed(propsProperty.value);
        return;
      }

      // let {props} = this
      if (node.init.type === 'ThisExpression' && propsProperty && propsProperty.value.name === 'props') {
        propVariables.set('props', []);
        return;
      }

      // let {firstname} = props
      if (
        isCommonVariableNameForProps(node.init.name) &&
        (utils.getParentStatelessComponent() || isInLifeCycleMethod(node, checkAsyncSafeLifeCycles))
      ) {
        markPropTypesAsUsed(node.id);
        return;
      }

      // let {firstname} = this.props
      if (isThisDotProps(node.init) && isInClassComponent(utils)) {
        markPropTypesAsUsed(node.id);
        return;
      }

      // let {firstname} = thing, where thing is defined by const thing = this.props.**.*
      if (propVariables.get(node.init.name)) {
        markPropTypesAsUsed(node.id, propVariables.get(node.init.name));
      }
    },

    FunctionDeclaration: handleFunctionLikeExpressions,

    ArrowFunctionExpression: handleFunctionLikeExpressions,

    FunctionExpression: handleFunctionLikeExpressions,

    'FunctionDeclaration:exit': popScope,

    'ArrowFunctionExpression:exit': popScope,

    'FunctionExpression:exit': popScope,

    JSXSpreadAttribute(node) {
      const component = components.get(utils.getParentComponent());
      components.set(component ? component.node : node, {
        ignoreUnusedPropTypesValidation: true
      });
    },

    MemberExpression(node) {
      if (isPropTypesUsageByMemberExpression(node, context, utils, checkAsyncSafeLifeCycles)) {
        markPropTypesAsUsed(node);
        return;
      }

      if (propVariables.get(node.object.name)) {
        markPropTypesAsUsed(node, propVariables.get(node.object.name));
      }
    },

    ObjectPattern(node) {
      // If the object pattern is a destructured props object in a lifecycle
      // method -- mark it for used props.
      if (isNodeALifeCycleMethod(node.parent.parent, checkAsyncSafeLifeCycles) && node.properties.length > 0) {
        markPropTypesAsUsed(node.parent);
      }
    },

    'Program:exit': function () {
      const list = components.list();

      Object.keys(list).filter(component => mustBeValidated(list[component])).forEach((component) => {
        handleCustomValidators(list[component]);
      });
    }
  };
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Common defaultProps detection functionality.
 */



const fromEntries = __webpack_require__(3);
const astUtil = __webpack_require__(67);
const propsUtil = __webpack_require__(70);
const variableUtil = __webpack_require__(65);
const propWrapperUtil = __webpack_require__(85);

const QUOTES_REGEX = /^["']|["']$/g;

module.exports = function defaultPropsInstructions(context, components, utils) {
  const sourceCode = context.getSourceCode();

  /**
   * Try to resolve the node passed in to a variable in the current scope. If the node passed in is not
   * an Identifier, then the node is simply returned.
   * @param   {ASTNode} node The node to resolve.
   * @returns {ASTNode|null} Return null if the value could not be resolved, ASTNode otherwise.
   */
  function resolveNodeValue(node) {
    if (node.type === 'Identifier') {
      return variableUtil.findVariableByName(context, node.name);
    }
    if (
      node.type === 'CallExpression' &&
      propWrapperUtil.isPropWrapperFunction(context, node.callee.name) &&
      node.arguments && node.arguments[0]
    ) {
      return resolveNodeValue(node.arguments[0]);
    }
    return node;
  }

  /**
   * Extracts a DefaultProp from an ObjectExpression node.
   * @param   {ASTNode} objectExpression ObjectExpression node.
   * @returns {Object|string}            Object representation of a defaultProp, to be consumed by
   *                                     `addDefaultPropsToComponent`, or string "unresolved", if the defaultProps
   *                                     from this ObjectExpression can't be resolved.
   */
  function getDefaultPropsFromObjectExpression(objectExpression) {
    const hasSpread = objectExpression.properties.find(property => property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement');

    if (hasSpread) {
      return 'unresolved';
    }

    return objectExpression.properties.map(defaultProp => ({
      name: sourceCode.getText(defaultProp.key).replace(QUOTES_REGEX, ''),
      node: defaultProp
    }));
  }

  /**
   * Marks a component's DefaultProps declaration as "unresolved". A component's DefaultProps is
   * marked as "unresolved" if we cannot safely infer the values of its defaultProps declarations
   * without risking false negatives.
   * @param   {Object} component The component to mark.
   * @returns {void}
   */
  function markDefaultPropsAsUnresolved(component) {
    components.set(component.node, {
      defaultProps: 'unresolved'
    });
  }

  /**
   * Adds defaultProps to the component passed in.
   * @param   {ASTNode}         component    The component to add the defaultProps to.
   * @param   {Object[]|'unresolved'} defaultProps defaultProps to add to the component or the string "unresolved"
   *                                         if this component has defaultProps that can't be resolved.
   * @returns {void}
   */
  function addDefaultPropsToComponent(component, defaultProps) {
    // Early return if this component's defaultProps is already marked as "unresolved".
    if (component.defaultProps === 'unresolved') {
      return;
    }

    if (defaultProps === 'unresolved') {
      markDefaultPropsAsUnresolved(component);
      return;
    }

    const defaults = component.defaultProps || {};
    const newDefaultProps = Object.assign(
      {},
      defaults,
      fromEntries(defaultProps.map(prop => [prop.name, prop]))
    );

    components.set(component.node, {
      defaultProps: newDefaultProps
    });
  }

  return {
    MemberExpression(node) {
      const isDefaultProp = propsUtil.isDefaultPropsDeclaration(node);

      if (!isDefaultProp) {
        return;
      }

      // find component this defaultProps belongs to
      const component = utils.getRelatedComponent(node);
      if (!component) {
        return;
      }

      // e.g.:
      // MyComponent.propTypes = {
      //   foo: React.PropTypes.string.isRequired,
      //   bar: React.PropTypes.string
      // };
      //
      // or:
      //
      // MyComponent.propTypes = myPropTypes;
      if (node.parent.type === 'AssignmentExpression') {
        const expression = resolveNodeValue(node.parent.right);
        if (!expression || expression.type !== 'ObjectExpression') {
          // If a value can't be found, we mark the defaultProps declaration as "unresolved", because
          // we should ignore this component and not report any errors for it, to avoid false-positives
          // with e.g. external defaultProps declarations.
          if (isDefaultProp) {
            markDefaultPropsAsUnresolved(component);
          }

          return;
        }

        addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));

        return;
      }

      // e.g.:
      // MyComponent.propTypes.baz = React.PropTypes.string;
      if (node.parent.type === 'MemberExpression' && node.parent.parent &&
        node.parent.parent.type === 'AssignmentExpression') {
        addDefaultPropsToComponent(component, [{
          name: node.parent.property.name,
          node: node.parent.parent
        }]);
      }
    },

    // e.g.:
    // class Hello extends React.Component {
    //   static get defaultProps() {
    //     return {
    //       name: 'Dean'
    //     };
    //   }
    //   render() {
    //     return <div>Hello {this.props.name}</div>;
    //   }
    // }
    MethodDefinition(node) {
      if (!node.static || node.kind !== 'get') {
        return;
      }

      if (!propsUtil.isDefaultPropsDeclaration(node)) {
        return;
      }

      // find component this propTypes/defaultProps belongs to
      const component = components.get(utils.getParentES6Component());
      if (!component) {
        return;
      }

      const returnStatement = utils.findReturnStatement(node);
      if (!returnStatement) {
        return;
      }

      const expression = resolveNodeValue(returnStatement.argument);
      if (!expression || expression.type !== 'ObjectExpression') {
        return;
      }

      addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
    },

    // e.g.:
    // class Greeting extends React.Component {
    //   render() {
    //     return (
    //       <h1>Hello, {this.props.foo} {this.props.bar}</h1>
    //     );
    //   }
    //   static defaultProps = {
    //     foo: 'bar',
    //     bar: 'baz'
    //   };
    // }
    ClassProperty(node) {
      if (!(node.static && node.value)) {
        return;
      }

      const propName = astUtil.getPropertyName(node);
      const isDefaultProp = propName === 'defaultProps' || propName === 'getDefaultProps';

      if (!isDefaultProp) {
        return;
      }

      // find component this propTypes/defaultProps belongs to
      const component = components.get(utils.getParentES6Component());
      if (!component) {
        return;
      }

      const expression = resolveNodeValue(node.value);
      if (!expression || expression.type !== 'ObjectExpression') {
        return;
      }

      addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(expression));
    },

    // e.g.:
    // React.createClass({
    //   render: function() {
    //     return <div>{this.props.foo}</div>;
    //   },
    //   getDefaultProps: function() {
    //     return {
    //       foo: 'default'
    //     };
    //   }
    // });
    ObjectExpression(node) {
      // find component this propTypes/defaultProps belongs to
      const component = utils.isES5Component(node) && components.get(node);
      if (!component) {
        return;
      }

      // Search for the proptypes declaration
      node.properties.forEach((property) => {
        if (property.type === 'ExperimentalSpreadProperty' || property.type === 'SpreadElement') {
          return;
        }

        const isDefaultProp = propsUtil.isDefaultPropsDeclaration(property);

        if (isDefaultProp && property.value.type === 'FunctionExpression') {
          const returnStatement = utils.findReturnStatement(property);
          if (!returnStatement || returnStatement.argument.type !== 'ObjectExpression') {
            return;
          }

          addDefaultPropsToComponent(component, getDefaultPropsFromObjectExpression(returnStatement.argument));
        }
      });
    }
  };
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function docsUrl(ruleName) {
  return `https://github.com/yannickcr/eslint-plugin-react/tree/master/docs/rules/${ruleName}.md`;
}

module.exports = docsUrl;


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid "button" element without an explicit "type" attribute
 * @author Filipp Riabchun
 */



const getProp = __webpack_require__(126);
const getLiteralPropValue = __webpack_require__(127);
const docsUrl = __webpack_require__(124);
const pragmaUtil = __webpack_require__(66);

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function isCreateElement(node, context) {
  const pragma = pragmaUtil.getFromContext(context);
  return node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.property.name === 'createElement' &&
    node.callee.object &&
    node.callee.object.name === pragma &&
    node.arguments.length > 0;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {
  button: true,
  submit: true,
  reset: true
};

module.exports = {
  meta: {
    docs: {
      description: 'Forbid "button" element without an explicit "type" attribute',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('button-has-type')
    },
    schema: [{
      type: 'object',
      properties: {
        button: {
          default: optionDefaults.button,
          type: 'boolean'
        },
        submit: {
          default: optionDefaults.submit,
          type: 'boolean'
        },
        reset: {
          default: optionDefaults.reset,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = Object.assign({}, optionDefaults, context.options[0]);

    function reportMissing(node) {
      context.report({
        node,
        message: 'Missing an explicit type attribute for button'
      });
    }

    function checkValue(node, value, quoteFn) {
      const q = quoteFn || (x => `"${x}"`);
      if (!(value in configuration)) {
        context.report({
          node,
          message: `${q(value)} is an invalid value for button type attribute`
        });
      } else if (!configuration[value]) {
        context.report({
          node,
          message: `${q(value)} is a forbidden value for button type attribute`
        });
      }
    }

    return {
      JSXElement(node) {
        if (node.openingElement.name.name !== 'button') {
          return;
        }

        const typeProp = getProp(node.openingElement.attributes, 'type');

        if (!typeProp) {
          reportMissing(node);
          return;
        }

        const propValue = getLiteralPropValue(typeProp);
        if (!propValue && typeProp.value && typeProp.value.expression) {
          checkValue(node, typeProp.value.expression.name, x => `\`${x}\``);
        } else {
          checkValue(node, propValue);
        }
      },
      CallExpression(node) {
        if (!isCreateElement(node, context)) {
          return;
        }

        if (node.arguments[0].type !== 'Literal' || node.arguments[0].value !== 'button') {
          return;
        }

        if (!node.arguments[1] || node.arguments[1].type !== 'ObjectExpression') {
          reportMissing(node);
          return;
        }

        const props = node.arguments[1].properties;
        const typeProp = props.find(prop => prop.key && prop.key.name === 'type');

        if (!typeProp || typeProp.value.type !== 'Literal') {
          reportMissing(node);
          return;
        }

        checkValue(node, typeProp.value.value);
      }
    };
  }
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88).getProp; // eslint-disable-line import/no-unresolved


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88).getLiteralPropValue; // eslint-disable-line import/no-unresolved


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileOverview Enforce all defaultProps are defined in propTypes
 * @author Vitor Balocco
 * @author Roy Sutton
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce all defaultProps are defined and not "required" in propTypes.',
      category: 'Best Practices',
      url: docsUrl('default-props-match-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        allowRequiredDefaults: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const configuration = context.options[0] || {};
    const allowRequiredDefaults = configuration.allowRequiredDefaults || false;

    /**
     * Reports all defaultProps passed in that don't have an appropriate propTypes counterpart.
     * @param  {Object[]} propTypes    Array of propTypes to check.
     * @param  {Object}   defaultProps Object of defaultProps to check. Keys are the props names.
     * @return {void}
     */
    function reportInvalidDefaultProps(propTypes, defaultProps) {
      // If this defaultProps is "unresolved" or the propTypes is undefined, then we should ignore
      // this component and not report any errors for it, to avoid false-positives with e.g.
      // external defaultProps/propTypes declarations or spread operators.
      if (defaultProps === 'unresolved' || !propTypes || Object.keys(propTypes).length === 0) {
        return;
      }

      Object.keys(defaultProps).forEach((defaultPropName) => {
        const defaultProp = defaultProps[defaultPropName];
        const prop = propTypes[defaultPropName];

        if (prop && (allowRequiredDefaults || !prop.isRequired)) {
          return;
        }

        if (prop) {
          context.report({
            node: defaultProp.node,
            message: 'defaultProp "{{name}}" defined for isRequired propType.',
            data: {name: defaultPropName}
          });
        } else {
          context.report({
            node: defaultProp.node,
            message: 'defaultProp "{{name}}" has no corresponding propTypes declaration.',
            data: {name: defaultPropName}
          });
        }
      });
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        const list = components.list();

        // If no defaultProps could be found, we don't report anything.
        Object.keys(list).filter(component => list[component].defaultProps).forEach((component) => {
          reportInvalidDefaultProps(
            list[component].declaredPropTypes,
            list[component].defaultProps || {}
          );
        });
      }
    };
  })
};


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce consistent usage of destructuring assignment of props, state, and context.
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);
const isAssignmentLHS = __webpack_require__(67).isAssignmentLHS;

const DEFAULT_OPTION = 'always';

module.exports = {
  meta: {
    docs: {
      description: 'Enforce consistent usage of destructuring assignment of props, state, and context',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('destructuring-assignment')
    },
    schema: [{
      type: 'string',
      enum: [
        'always',
        'never'
      ]
    }, {
      type: 'object',
      properties: {
        ignoreClassFields: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || DEFAULT_OPTION;
    const ignoreClassFields = context.options[1] && context.options[1].ignoreClassFields === true || false;

    /**
     * @param {ASTNode} node We expect either an ArrowFunctionExpression,
     *   FunctionDeclaration, or FunctionExpression
     */
    function handleStatelessComponent(node) {
      const destructuringProps = node.params && node.params[0] && node.params[0].type === 'ObjectPattern';
      const destructuringContext = node.params && node.params[1] && node.params[1].type === 'ObjectPattern';

      if (destructuringProps && components.get(node) && configuration === 'never') {
        context.report({
          node,
          message: 'Must never use destructuring props assignment in SFC argument'
        });
      } else if (destructuringContext && components.get(node) && configuration === 'never') {
        context.report({
          node,
          message: 'Must never use destructuring context assignment in SFC argument'
        });
      }
    }

    function handleSFCUsage(node) {
      // props.aProp || context.aProp
      const isPropUsed = (node.object.name === 'props' || node.object.name === 'context') && !isAssignmentLHS(node);
      if (isPropUsed && configuration === 'always') {
        context.report({
          node,
          message: `Must use destructuring ${node.object.name} assignment`
        });
      }
    }

    function isInClassProperty(node) {
      let curNode = node.parent;
      while (curNode) {
        if (curNode.type === 'ClassProperty') {
          return true;
        }
        curNode = curNode.parent;
      }
      return false;
    }

    function handleClassUsage(node) {
      // this.props.Aprop || this.context.aProp || this.state.aState
      const isPropUsed = (
        node.object.type === 'MemberExpression' && node.object.object.type === 'ThisExpression' &&
        (node.object.property.name === 'props' || node.object.property.name === 'context' || node.object.property.name === 'state') &&
        !isAssignmentLHS(node)
      );

      if (
        isPropUsed && configuration === 'always' &&
        !(ignoreClassFields && isInClassProperty(node))
      ) {
        context.report({
          node,
          message: `Must use destructuring ${node.object.property.name} assignment`
        });
      }
    }

    return {

      FunctionDeclaration: handleStatelessComponent,

      ArrowFunctionExpression: handleStatelessComponent,

      FunctionExpression: handleStatelessComponent,

      MemberExpression(node) {
        const SFCComponent = components.get(context.getScope(node).block);
        const classComponent = utils.getParentComponent(node);
        if (SFCComponent) {
          handleSFCUsage(node);
        }
        if (classComponent) {
          handleClassUsage(node);
        }
      },

      VariableDeclarator(node) {
        const classComponent = utils.getParentComponent(node);
        const SFCComponent = components.get(context.getScope(node).block);

        const destructuring = (node.init && node.id && node.id.type === 'ObjectPattern');
        // let {foo} = props;
        const destructuringSFC = destructuring && (node.init.name === 'props' || node.init.name === 'context');
        // let {foo} = this.props;
        const destructuringClass = destructuring && node.init.object && node.init.object.type === 'ThisExpression' && (
          node.init.property.name === 'props' || node.init.property.name === 'context' || node.init.property.name === 'state'
        );

        if (SFCComponent && destructuringSFC && configuration === 'never') {
          context.report({
            node,
            message: `Must never use destructuring ${node.init.name} assignment`
          });
        }

        if (
          classComponent && destructuringClass && configuration === 'never' &&
          !(ignoreClassFields && node.parent.type === 'ClassProperty')
        ) {
          context.report({
            node,
            message: `Must never use destructuring ${node.init.property.name} assignment`
          });
        }
      }
    };
  })
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing displayName in a React component definition
 * @author Yannick Croissant
 */



const Components = __webpack_require__(50);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);
const propsUtil = __webpack_require__(70);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing displayName in a React component definition',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('display-name')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreTranspilerName: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const config = context.options[0] || {};
    const ignoreTranspilerName = config.ignoreTranspilerName || false;

    const MISSING_MESSAGE = 'Component definition is missing display name';

    /**
     * Mark a prop type as declared
     * @param {ASTNode} node The AST node being checked.
     */
    function markDisplayNameAsDeclared(node) {
      components.set(node, {
        hasDisplayName: true
      });
    }

    /**
     * Reports missing display name for a given component
     * @param {Object} component The component to process
     */
    function reportMissingDisplayName(component) {
      context.report({
        node: component.node,
        message: MISSING_MESSAGE,
        data: {
          component: component.name
        }
      });
    }

    /**
     * Checks if the component have a name set by the transpiler
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if component has a name, false if not.
     */
    function hasTranspilerName(node) {
      const namedObjectAssignment = (
        node.type === 'ObjectExpression' &&
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'AssignmentExpression' &&
        (
          !node.parent.parent.left.object ||
          node.parent.parent.left.object.name !== 'module' ||
          node.parent.parent.left.property.name !== 'exports'
        )
      );
      const namedObjectDeclaration = (
        node.type === 'ObjectExpression' &&
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'VariableDeclarator'
      );
      const namedClass = (
        (node.type === 'ClassDeclaration' || node.type === 'ClassExpression') &&
        node.id &&
        node.id.name
      );

      const namedFunctionDeclaration = (
        (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') &&
        node.id &&
        node.id.name
      );

      const namedFunctionExpression = (
        astUtil.isFunctionLikeExpression(node) &&
        node.parent &&
        (node.parent.type === 'VariableDeclarator' || node.parent.method === true) &&
        (!node.parent.parent || !utils.isES5Component(node.parent.parent))
      );

      if (
        namedObjectAssignment || namedObjectDeclaration ||
        namedClass ||
        namedFunctionDeclaration || namedFunctionExpression
      ) {
        return true;
      }
      return false;
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      ClassProperty(node) {
        if (!propsUtil.isDisplayNameDeclaration(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      MemberExpression(node) {
        if (!propsUtil.isDisplayNameDeclaration(node.property)) {
          return;
        }
        const component = utils.getRelatedComponent(node);
        if (!component) {
          return;
        }
        markDisplayNameAsDeclared(component.node);
      },

      FunctionExpression(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        if (components.get(node)) {
          markDisplayNameAsDeclared(node);
        }
      },

      FunctionDeclaration(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        if (components.get(node)) {
          markDisplayNameAsDeclared(node);
        }
      },

      ArrowFunctionExpression(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        if (components.get(node)) {
          markDisplayNameAsDeclared(node);
        }
      },

      MethodDefinition(node) {
        if (!propsUtil.isDisplayNameDeclaration(node.key)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      ClassExpression(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      ClassDeclaration(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      ObjectExpression(node) {
        if (ignoreTranspilerName || !hasTranspilerName(node)) {
          // Search for the displayName declaration
          node.properties.forEach((property) => {
            if (!property.key || !propsUtil.isDisplayNameDeclaration(property.key)) {
              return;
            }
            markDisplayNameAsDeclared(node);
          });
          return;
        }
        markDisplayNameAsDeclared(node);
      },

      'Program:exit': function () {
        const list = components.list();
        // Report missing display name for all components
        Object.keys(list).filter(component => !list[component].hasDisplayName).forEach((component) => {
          reportMissingDisplayName(list[component]);
        });
      }
    };
  })
};


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain props on components
 * @author Joe Lencioni
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = ['className', 'style'];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain props on components',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-component-props')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            oneOf: [{
              type: 'string'
            }, {
              type: 'object',
              properties: {
                propName: {
                  type: 'string'
                },
                allowedFor: {
                  type: 'array',
                  uniqueItems: true,
                  items: {
                    type: 'string'
                  }
                }
              }
            }]
          }
        }
      }
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const forbid = new Map((configuration.forbid || DEFAULTS).map((value) => {
      const propName = typeof value === 'string' ? value : value.propName;
      const whitelist = typeof value === 'string' ? [] : (value.allowedFor || []);
      return [propName, whitelist];
    }));

    function isForbidden(prop, tagName) {
      const whitelist = forbid.get(prop);
      // if the tagName is undefined (`<this.something>`), we assume it's a forbidden element
      return typeof whitelist !== 'undefined' && (typeof tagName === 'undefined' || whitelist.indexOf(tagName) === -1);
    }

    return {
      JSXAttribute(node) {
        const tag = node.parent.name.name;
        if (tag && tag[0] !== tag[0].toUpperCase()) {
          // This is a DOM node, not a Component, so exit.
          return;
        }

        const prop = node.name.name;

        if (!isForbidden(prop, tag)) {
          return;
        }

        context.report({
          node,
          message: `Prop \`${prop}\` is forbidden on Components`
        });
      }
    };
  }
};


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain props on DOM Nodes
 * @author David Vázquez
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = [];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain props on DOM Nodes',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-dom-props')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            type: 'string',
            minLength: 1
          },
          uniqueItems: true
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    function isForbidden(prop) {
      const configuration = context.options[0] || {};

      const forbid = configuration.forbid || DEFAULTS;
      return forbid.indexOf(prop) >= 0;
    }

    return {
      JSXAttribute(node) {
        const tag = node.parent.name.name;
        if (!(tag && tag[0] !== tag[0].toUpperCase())) {
          // This is a Component, not  a DOM node, so exit.
          return;
        }

        const prop = node.name.name;

        if (!isForbidden(prop)) {
          return;
        }

        context.report({
          node,
          message: `Prop \`${prop}\` is forbidden on DOM Nodes`
        });
      }
    };
  }
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain elements
 * @author Kenneth Chung
 */



const has = __webpack_require__(15);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain elements',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-elements')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            anyOf: [
              {type: 'string'},
              {
                type: 'object',
                properties: {
                  element: {type: 'string'},
                  message: {type: 'string'}
                },
                required: ['element'],
                additionalProperties: false
              }
            ]
          }
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const forbidConfiguration = configuration.forbid || [];

    const indexedForbidConfigs = {};

    forbidConfiguration.forEach((item) => {
      if (typeof item === 'string') {
        indexedForbidConfigs[item] = {element: item};
      } else {
        indexedForbidConfigs[item.element] = item;
      }
    });

    function errorMessageForElement(name) {
      const message = `<${name}> is forbidden`;
      const additionalMessage = indexedForbidConfigs[name].message;

      if (additionalMessage) {
        return `${message}, ${additionalMessage}`;
      }

      return message;
    }

    function isValidCreateElement(node) {
      return node.callee &&
        node.callee.type === 'MemberExpression' &&
        node.callee.object.name === 'React' &&
        node.callee.property.name === 'createElement' &&
        node.arguments.length > 0;
    }

    function reportIfForbidden(element, node) {
      if (has(indexedForbidConfigs, element)) {
        context.report({
          node,
          message: errorMessageForElement(element)
        });
      }
    }

    return {
      JSXOpeningElement(node) {
        reportIfForbidden(context.getSourceCode().getText(node.name), node.name);
      },

      CallExpression(node) {
        if (!isValidCreateElement(node)) {
          return;
        }

        const argument = node.arguments[0];
        const argType = argument.type;

        if (argType === 'Identifier' && /^[A-Z_]/.test(argument.name)) {
          reportIfForbidden(argument.name, argument);
        } else if (argType === 'Literal' && /^[a-z][^.]*$/.test(argument.value)) {
          reportIfForbidden(argument.value, argument);
        } else if (argType === 'MemberExpression') {
          reportIfForbidden(context.getSourceCode().getText(argument), argument);
        }
      }
    };
  }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid using another component's propTypes
 * @author Ian Christian Myers
 */



const docsUrl = __webpack_require__(124);
const ast = __webpack_require__(67);

module.exports = {
  meta: {
    docs: {
      description: 'Forbid using another component\'s propTypes',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-foreign-prop-types')
    },

    schema: [
      {
        type: 'object',
        properties: {
          allowInPropTypes: {
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const config = context.options[0] || {};
    const allowInPropTypes = config.allowInPropTypes || false;

    // --------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------

    function findParentAssignmentExpression(node) {
      let parent = node.parent;

      while (parent && parent.type !== 'Program') {
        if (parent.type === 'AssignmentExpression') {
          return parent;
        }
        parent = parent.parent;
      }
      return null;
    }

    function findParentClassProperty(node) {
      let parent = node.parent;

      while (parent && parent.type !== 'Program') {
        if (parent.type === 'ClassProperty') {
          return parent;
        }
        parent = parent.parent;
      }
      return null;
    }

    function isAllowedAssignment(node) {
      if (!allowInPropTypes) {
        return false;
      }

      const assignmentExpression = findParentAssignmentExpression(node);

      if (
        assignmentExpression &&
        assignmentExpression.left &&
        assignmentExpression.left.property &&
        assignmentExpression.left.property.name === 'propTypes'
      ) {
        return true;
      }

      const classProperty = findParentClassProperty(node);

      if (
        classProperty &&
        classProperty.key &&
        classProperty.key.name === 'propTypes'
      ) {
        return true;
      }
      return false;
    }

    return {
      MemberExpression(node) {
        if (
          node.property &&
          (
            !node.computed &&
            node.property.type === 'Identifier' &&
            node.property.name === 'propTypes' &&
            !ast.isAssignmentLHS(node) &&
            !isAllowedAssignment(node)
          ) || (
            (node.property.type === 'Literal' || node.property.type === 'JSXText') &&
            node.property.value === 'propTypes' &&
            !ast.isAssignmentLHS(node) &&
            !isAllowedAssignment(node)
          )
        ) {
          context.report({
            node: node.property,
            message: 'Using propTypes from another component is not safe because they may be removed in production builds'
          });
        }
      },

      ObjectPattern(node) {
        const propTypesNode = node.properties.find(property => property.type === 'Property' && property.key.name === 'propTypes');

        if (propTypesNode) {
          context.report({
            node: propTypesNode,
            message: 'Using propTypes from another component is not safe because they may be removed in production builds'
          });
        }
      }
    };
  }
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid certain propTypes
 */



const variableUtil = __webpack_require__(65);
const propsUtil = __webpack_require__(70);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);
const propWrapperUtil = __webpack_require__(85);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = ['any', 'array', 'object'];

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Forbid certain propTypes',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('forbid-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        checkContextTypes: {
          type: 'boolean'
        },
        checkChildContextTypes: {
          type: 'boolean'
        }
      },
      additionalProperties: true
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const checkContextTypes = configuration.checkContextTypes || false;
    const checkChildContextTypes = configuration.checkChildContextTypes || false;

    function isForbidden(type) {
      const forbid = configuration.forbid || DEFAULTS;
      return forbid.indexOf(type) >= 0;
    }

    function shouldCheckContextTypes(node) {
      if (checkContextTypes && propsUtil.isContextTypesDeclaration(node)) {
        return true;
      }
      return false;
    }

    function shouldCheckChildContextTypes(node) {
      if (checkChildContextTypes && propsUtil.isChildContextTypesDeclaration(node)) {
        return true;
      }
      return false;
    }

    /**
     * Checks if propTypes declarations are forbidden
     * @param {Array} declarations The array of AST nodes being checked.
     * @returns {void}
     */
    function checkProperties(declarations) {
      declarations.forEach((declaration) => {
        if (declaration.type !== 'Property') {
          return;
        }
        let target;
        let value = declaration.value;
        if (
          value.type === 'MemberExpression' &&
          value.property &&
          value.property.name &&
          value.property.name === 'isRequired'
        ) {
          value = value.object;
        }
        if (
          value.type === 'CallExpression' &&
          value.callee.type === 'MemberExpression'
        ) {
          value = value.callee;
        }
        if (value.property) {
          target = value.property.name;
        } else if (value.type === 'Identifier') {
          target = value.name;
        }
        if (isForbidden(target)) {
          context.report({
            node: declaration,
            message: `Prop type \`${target}\` is forbidden`
          });
        }
      });
    }

    function checkNode(node) {
      switch (node && node.type) {
        case 'ObjectExpression':
          checkProperties(node.properties);
          break;
        case 'Identifier': {
          const propTypesObject = variableUtil.findVariableByName(context, node.name);
          if (propTypesObject && propTypesObject.properties) {
            checkProperties(propTypesObject.properties);
          }
          break;
        }
        case 'CallExpression': {
          const innerNode = node.arguments && node.arguments[0];
          if (propWrapperUtil.isPropWrapperFunction(context, context.getSource(node.callee)) && innerNode) {
            checkNode(innerNode);
          }
          break;
        }
        default:
          break;
      }
    }

    return {
      ClassProperty(node) {
        if (
          !propsUtil.isPropTypesDeclaration(node) &&
          !shouldCheckContextTypes(node) &&
          !shouldCheckChildContextTypes(node)
        ) {
          return;
        }
        checkNode(node.value);
      },

      MemberExpression(node) {
        if (
          !propsUtil.isPropTypesDeclaration(node) &&
          !shouldCheckContextTypes(node) &&
          !shouldCheckChildContextTypes(node)
        ) {
          return;
        }

        checkNode(node.parent.right);
      },

      MethodDefinition(node) {
        if (
          !propsUtil.isPropTypesDeclaration(node) &&
          !shouldCheckContextTypes(node) &&
          !shouldCheckChildContextTypes(node)
        ) {
          return;
        }

        const returnStatement = astUtil.findReturnStatement(node);

        if (returnStatement && returnStatement.argument) {
          checkNode(returnStatement.argument);
        }
      },

      ObjectExpression(node) {
        node.properties.forEach((property) => {
          if (!property.key) {
            return;
          }

          if (
            !propsUtil.isPropTypesDeclaration(property) &&
            !shouldCheckContextTypes(property) &&
            !shouldCheckChildContextTypes(property)
          ) {
            return;
          }
          if (property.value.type === 'ObjectExpression') {
            checkProperties(property.value.properties);
          }
        });
      }

    };
  }
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce boolean attributes notation in JSX
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const exceptionsSchema = {
  type: 'array',
  items: {type: 'string', minLength: 1},
  uniqueItems: true
};

const ALWAYS = 'always';
const NEVER = 'never';

const errorData = new WeakMap();
function getErrorData(exceptions) {
  if (!errorData.has(exceptions)) {
    const exceptionProps = Array.from(exceptions, name => `\`${name}\``).join(', ');
    const exceptionsMessage = exceptions.size > 0 ? ` for the following props: ${exceptionProps}` : '';
    errorData.set(exceptions, {exceptionsMessage});
  }
  return errorData.get(exceptions);
}

function isAlways(configuration, exceptions, propName) {
  const isException = exceptions.has(propName);
  if (configuration === ALWAYS) {
    return !isException;
  }
  return isException;
}

function isNever(configuration, exceptions, propName) {
  const isException = exceptions.has(propName);
  if (configuration === NEVER) {
    return !isException;
  }
  return isException;
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce boolean attributes notation in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-boolean-value')
    },
    fixable: 'code',

    schema: {
      anyOf: [{
        type: 'array',
        items: [{enum: [ALWAYS, NEVER]}],
        additionalItems: false
      }, {
        type: 'array',
        items: [{
          enum: [ALWAYS]
        }, {
          type: 'object',
          additionalProperties: false,
          properties: {
            [NEVER]: exceptionsSchema
          }
        }],
        additionalItems: false
      }, {
        type: 'array',
        items: [{
          enum: [NEVER]
        }, {
          type: 'object',
          additionalProperties: false,
          properties: {
            [ALWAYS]: exceptionsSchema
          }
        }],
        additionalItems: false
      }]
    }
  },

  create(context) {
    const configuration = context.options[0] || NEVER;
    const configObject = context.options[1] || {};
    const exceptions = new Set((configuration === ALWAYS ? configObject[NEVER] : configObject[ALWAYS]) || []);

    const NEVER_MESSAGE = 'Value must be omitted for boolean attributes{{exceptionsMessage}}';
    const ALWAYS_MESSAGE = 'Value must be set for boolean attributes{{exceptionsMessage}}';

    return {
      JSXAttribute(node) {
        const propName = node.name && node.name.name;
        const value = node.value;

        if (isAlways(configuration, exceptions, propName) && value === null) {
          const data = getErrorData(exceptions);
          context.report({
            node,
            message: ALWAYS_MESSAGE,
            data,
            fix(fixer) {
              return fixer.insertTextAfter(node, '={true}');
            }
          });
        }
        if (isNever(configuration, exceptions, propName) && value && value.type === 'JSXExpressionContainer' && value.expression.value === true) {
          const data = getErrorData(exceptions);
          context.report({
            node,
            message: NEVER_MESSAGE,
            data,
            fix(fixer) {
              return fixer.removeRange([node.name.range[1], value.range[1]]);
            }
          });
        }
      }
    };
  }
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const docsUrl = __webpack_require__(124);

// This list is taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
const INLINE_ELEMENTS = new Set([
  'a',
  'abbr',
  'acronym',
  'b',
  'bdo',
  'big',
  'br',
  'button',
  'cite',
  'code',
  'dfn',
  'em',
  'i',
  'img',
  'input',
  'kbd',
  'label',
  'map',
  'object',
  'q',
  'samp',
  'script',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'textarea',
  'tt',
  'var'
]);

module.exports = {
  meta: {
    docs: {
      description: 'Ensures inline tags are not rendered without spaces between them',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-child-element-spacing')
    },
    fixable: false,
    schema: [
      {
        type: 'object',
        properties: {},
        default: {},
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const TEXT_FOLLOWING_ELEMENT_PATTERN = /^\s*\n\s*\S/;
    const TEXT_PRECEDING_ELEMENT_PATTERN = /\S\s*\n\s*$/;

    const elementName = node => (
      node.openingElement &&
      node.openingElement.name &&
      node.openingElement.name.type === 'JSXIdentifier' &&
      node.openingElement.name.name
    );

    const isInlineElement = node => (
      node.type === 'JSXElement' &&
      INLINE_ELEMENTS.has(elementName(node))
    );

    const handleJSX = (node) => {
      let lastChild = null;
      let child = null;
      (node.children.concat([null])).forEach((nextChild) => {
        if (
          (lastChild || nextChild) &&
          (!lastChild || isInlineElement(lastChild)) &&
          (child && (child.type === 'Literal' || child.type === 'JSXText')) &&
          (!nextChild || isInlineElement(nextChild)) &&
          true
        ) {
          if (lastChild && child.value.match(TEXT_FOLLOWING_ELEMENT_PATTERN)) {
            context.report({
              node: lastChild,
              loc: lastChild.loc.end,
              message: `Ambiguous spacing after previous element ${elementName(lastChild)}`
            });
          } else if (nextChild && child.value.match(TEXT_PRECEDING_ELEMENT_PATTERN)) {
            context.report({
              node: nextChild,
              loc: nextChild.loc.start,
              message: `Ambiguous spacing before next element ${elementName(nextChild)}`
            });
          }
        }
        lastChild = child;
        child = nextChild;
      });
    };

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX
    };
  }
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate closing bracket location in JSX
 * @author Yannick Croissant
 */



const has = __webpack_require__(15);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate closing bracket location in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-closing-bracket-location')
    },
    fixable: 'code',

    schema: [{
      oneOf: [
        {
          enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned']
        },
        {
          type: 'object',
          properties: {
            location: {
              enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned']
            }
          },
          additionalProperties: false
        }, {
          type: 'object',
          properties: {
            nonEmpty: {
              enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned', false]
            },
            selfClosing: {
              enum: ['after-props', 'props-aligned', 'tag-aligned', 'line-aligned', false]
            }
          },
          additionalProperties: false
        }
      ]
    }]
  },

  create(context) {
    const MESSAGE = 'The closing bracket must be {{location}}{{details}}';
    const MESSAGE_LOCATION = {
      'after-props': 'placed after the last prop',
      'after-tag': 'placed after the opening tag',
      'props-aligned': 'aligned with the last prop',
      'tag-aligned': 'aligned with the opening tag',
      'line-aligned': 'aligned with the line containing the opening tag'
    };
    const DEFAULT_LOCATION = 'tag-aligned';

    const config = context.options[0];
    const options = {
      nonEmpty: DEFAULT_LOCATION,
      selfClosing: DEFAULT_LOCATION
    };

    if (typeof config === 'string') {
      // simple shorthand [1, 'something']
      options.nonEmpty = config;
      options.selfClosing = config;
    } else if (typeof config === 'object') {
      // [1, {location: 'something'}] (back-compat)
      if (has(config, 'location')) {
        options.nonEmpty = config.location;
        options.selfClosing = config.location;
      }
      // [1, {nonEmpty: 'something'}]
      if (has(config, 'nonEmpty')) {
        options.nonEmpty = config.nonEmpty;
      }
      // [1, {selfClosing: 'something'}]
      if (has(config, 'selfClosing')) {
        options.selfClosing = config.selfClosing;
      }
    }

    /**
     * Get expected location for the closing bracket
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @return {String} Expected location for the closing bracket
     */
    function getExpectedLocation(tokens) {
      let location;
      // Is always after the opening tag if there is no props
      if (typeof tokens.lastProp === 'undefined') {
        location = 'after-tag';
      // Is always after the last prop if this one is on the same line as the opening bracket
      } else if (tokens.opening.line === tokens.lastProp.lastLine) {
        location = 'after-props';
      // Else use configuration dependent on selfClosing property
      } else {
        location = tokens.selfClosing ? options.selfClosing : options.nonEmpty;
      }
      return location;
    }

    /**
     * Get the correct 0-indexed column for the closing bracket, given the
     * expected location.
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @param {String} expectedLocation Expected location for the closing bracket
     * @return {?Number} The correct column for the closing bracket, or null
     */
    function getCorrectColumn(tokens, expectedLocation) {
      switch (expectedLocation) {
        case 'props-aligned':
          return tokens.lastProp.column;
        case 'tag-aligned':
          return tokens.opening.column;
        case 'line-aligned':
          return tokens.openingStartOfLine.column;
        default:
          return null;
      }
    }

    /**
     * Check if the closing bracket is correctly located
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @param {String} expectedLocation Expected location for the closing bracket
     * @return {Boolean} True if the closing bracket is correctly located, false if not
     */
    function hasCorrectLocation(tokens, expectedLocation) {
      switch (expectedLocation) {
        case 'after-tag':
          return tokens.tag.line === tokens.closing.line;
        case 'after-props':
          return tokens.lastProp.lastLine === tokens.closing.line;
        case 'props-aligned':
        case 'tag-aligned':
        case 'line-aligned': {
          const correctColumn = getCorrectColumn(tokens, expectedLocation);
          return correctColumn === tokens.closing.column;
        }
        default:
          return true;
      }
    }

    /**
     * Get the characters used for indentation on the line to be matched
     * @param {Object} tokens Locations of the opening bracket, closing bracket and last prop
     * @param {String} expectedLocation Expected location for the closing bracket
     * @param {Number} [correctColumn] Expected column for the closing bracket. Default to 0
     * @return {String} The characters used for indentation
     */
    function getIndentation(tokens, expectedLocation, correctColumn) {
      correctColumn = correctColumn || 0;
      let indentation;
      let spaces = [];
      switch (expectedLocation) {
        case 'props-aligned':
          indentation = /^\s*/.exec(context.getSourceCode().lines[tokens.lastProp.firstLine - 1])[0];
          break;
        case 'tag-aligned':
        case 'line-aligned':
          indentation = /^\s*/.exec(context.getSourceCode().lines[tokens.opening.line - 1])[0];
          break;
        default:
          indentation = '';
      }
      if (indentation.length + 1 < correctColumn) {
        // Non-whitespace characters were included in the column offset
        spaces = new Array(+correctColumn + 1 - indentation.length);
      }
      return indentation + spaces.join(' ');
    }

    /**
     * Get the locations of the opening bracket, closing bracket, last prop, and
     * start of opening line.
     * @param {ASTNode} node The node to check
     * @return {Object} Locations of the opening bracket, closing bracket, last
     * prop and start of opening line.
     */
    function getTokensLocations(node) {
      const sourceCode = context.getSourceCode();
      const opening = sourceCode.getFirstToken(node).loc.start;
      const closing = sourceCode.getLastTokens(node, node.selfClosing ? 2 : 1)[0].loc.start;
      const tag = sourceCode.getFirstToken(node.name).loc.start;
      let lastProp;
      if (node.attributes.length) {
        lastProp = node.attributes[node.attributes.length - 1];
        lastProp = {
          column: sourceCode.getFirstToken(lastProp).loc.start.column,
          firstLine: sourceCode.getFirstToken(lastProp).loc.start.line,
          lastLine: sourceCode.getLastToken(lastProp).loc.end.line
        };
      }
      const openingLine = sourceCode.lines[opening.line - 1];
      const openingStartOfLine = {
        column: /^\s*/.exec(openingLine)[0].length,
        line: opening.line
      };
      return {
        tag,
        opening,
        closing,
        lastProp,
        selfClosing: node.selfClosing,
        openingStartOfLine
      };
    }

    /**
     * Get an unique ID for a given JSXOpeningElement
     *
     * @param {ASTNode} node The AST node being checked.
     * @returns {String} Unique ID (based on its range)
     */
    function getOpeningElementId(node) {
      return node.range.join(':');
    }

    const lastAttributeNode = {};

    return {
      JSXAttribute(node) {
        lastAttributeNode[getOpeningElementId(node.parent)] = node;
      },

      JSXSpreadAttribute(node) {
        lastAttributeNode[getOpeningElementId(node.parent)] = node;
      },

      'JSXOpeningElement:exit': function (node) {
        const attributeNode = lastAttributeNode[getOpeningElementId(node)];
        const cachedLastAttributeEndPos = attributeNode ? attributeNode.range[1] : null;
        let expectedNextLine;
        const tokens = getTokensLocations(node);
        const expectedLocation = getExpectedLocation(tokens);

        if (hasCorrectLocation(tokens, expectedLocation)) {
          return;
        }

        const data = {location: MESSAGE_LOCATION[expectedLocation], details: ''};
        const correctColumn = getCorrectColumn(tokens, expectedLocation);

        if (correctColumn !== null) {
          expectedNextLine = tokens.lastProp &&
            (tokens.lastProp.lastLine === tokens.closing.line);
          data.details = ` (expected column ${correctColumn + 1}${expectedNextLine ? ' on the next line)' : ')'}`;
        }

        context.report({
          node,
          loc: tokens.closing,
          message: MESSAGE,
          data,
          fix(fixer) {
            const closingTag = tokens.selfClosing ? '/>' : '>';
            switch (expectedLocation) {
              case 'after-tag':
                if (cachedLastAttributeEndPos) {
                  return fixer.replaceTextRange([cachedLastAttributeEndPos, node.range[1]],
                    (expectedNextLine ? '\n' : '') + closingTag);
                }
                return fixer.replaceTextRange([node.name.range[1], node.range[1]],
                  (expectedNextLine ? '\n' : ' ') + closingTag);
              case 'after-props':
                return fixer.replaceTextRange([cachedLastAttributeEndPos, node.range[1]],
                  (expectedNextLine ? '\n' : '') + closingTag);
              case 'props-aligned':
              case 'tag-aligned':
              case 'line-aligned':
                return fixer.replaceTextRange([cachedLastAttributeEndPos, node.range[1]],
                  `\n${getIndentation(tokens, expectedLocation, correctColumn)}${closingTag}`);
              default:
                return true;
            }
          }
        });
      }
    };
  }
};


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate closing tag location in JSX
 * @author Ross Solomon
 */



const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate closing tag location for multiline JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-closing-tag-location')
    },
    fixable: 'whitespace'
  },

  create(context) {
    function handleClosingElement(node) {
      if (!node.parent) {
        return;
      }

      const opening = node.parent.openingElement || node.parent.openingFragment;
      if (opening.loc.start.line === node.loc.start.line) {
        return;
      }

      if (opening.loc.start.column === node.loc.start.column) {
        return;
      }

      let message;
      if (!astUtil.isNodeFirstInLine(context, node)) {
        message = 'Closing tag of a multiline JSX expression must be on its own line.';
      } else {
        message = 'Expected closing tag to match indentation of opening.';
      }

      context.report({
        node,
        loc: node.loc,
        message,
        fix(fixer) {
          const indent = Array(opening.loc.start.column + 1).join(' ');
          if (astUtil.isNodeFirstInLine(context, node)) {
            return fixer.replaceTextRange(
              [node.range[0] - node.loc.start.column, node.range[0]],
              indent
            );
          }

          return fixer.insertTextBefore(node, `\n${indent}`);
        }
      });
    }

    return {
      JSXClosingElement: handleClosingElement,
      JSXClosingFragment: handleClosingElement
    };
  }
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce or disallow spaces inside of curly braces in JSX attributes.
 * @author Jamund Ferguson
 * @author Brandyn Bennett
 * @author Michael Ficarra
 * @author Vignesh Anand
 * @author Jamund Ferguson
 * @author Yannick Croissant
 * @author Erik Wendel
 */



const has = __webpack_require__(15);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const SPACING = {
  always: 'always',
  never: 'never'
};
const SPACING_VALUES = [SPACING.always, SPACING.never];

module.exports = {
  meta: {
    docs: {
      description: 'Enforce or disallow spaces inside of curly braces in JSX attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-curly-spacing')
    },
    fixable: 'code',

    schema: {
      definitions: {
        basicConfig: {
          type: 'object',
          properties: {
            when: {
              enum: SPACING_VALUES
            },
            allowMultiline: {
              type: 'boolean'
            },
            spacing: {
              type: 'object',
              properties: {
                objectLiterals: {
                  enum: SPACING_VALUES
                }
              }
            }
          }
        },
        basicConfigOrBoolean: {
          oneOf: [{
            $ref: '#/definitions/basicConfig'
          }, {
            type: 'boolean'
          }]
        }
      },
      type: 'array',
      items: [{
        oneOf: [{
          allOf: [{
            $ref: '#/definitions/basicConfig'
          }, {
            type: 'object',
            properties: {
              attributes: {
                $ref: '#/definitions/basicConfigOrBoolean'
              },
              children: {
                $ref: '#/definitions/basicConfigOrBoolean'
              }
            }
          }]
        }, {
          enum: SPACING_VALUES
        }]
      }, {
        type: 'object',
        properties: {
          allowMultiline: {
            type: 'boolean'
          },
          spacing: {
            type: 'object',
            properties: {
              objectLiterals: {
                enum: SPACING_VALUES
              }
            }
          }
        },
        additionalProperties: false
      }]
    }
  },

  create(context) {
    function normalizeConfig(configOrTrue, defaults, lastPass) {
      const config = configOrTrue === true ? {} : configOrTrue;
      const when = config.when || defaults.when;
      const allowMultiline = has(config, 'allowMultiline') ? config.allowMultiline : defaults.allowMultiline;
      const spacing = config.spacing || {};
      let objectLiteralSpaces = spacing.objectLiterals || defaults.objectLiteralSpaces;
      if (lastPass) {
        // On the final pass assign the values that should be derived from others if they are still undefined
        objectLiteralSpaces = objectLiteralSpaces || when;
      }

      return {
        when,
        allowMultiline,
        objectLiteralSpaces
      };
    }

    const DEFAULT_WHEN = SPACING.never;
    const DEFAULT_ALLOW_MULTILINE = true;
    const DEFAULT_ATTRIBUTES = true;
    const DEFAULT_CHILDREN = false;

    let originalConfig = context.options[0] || {};
    if (SPACING_VALUES.indexOf(originalConfig) !== -1) {
      originalConfig = Object.assign({when: context.options[0]}, context.options[1]);
    }
    const defaultConfig = normalizeConfig(originalConfig, {
      when: DEFAULT_WHEN,
      allowMultiline: DEFAULT_ALLOW_MULTILINE
    });
    const attributes = has(originalConfig, 'attributes') ? originalConfig.attributes : DEFAULT_ATTRIBUTES;
    const attributesConfig = attributes ? normalizeConfig(attributes, defaultConfig, true) : null;
    const children = has(originalConfig, 'children') ? originalConfig.children : DEFAULT_CHILDREN;
    const childrenConfig = children ? normalizeConfig(children, defaultConfig, true) : null;

    // --------------------------------------------------------------------------
    // Helpers
    // --------------------------------------------------------------------------

    /**
     * Determines whether two adjacent tokens have a newline between them.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not there is a newline between the tokens.
     */
    function isMultiline(left, right) {
      return left.loc.end.line !== right.loc.start.line;
    }

    /**
     * Trims text of whitespace between two ranges
     * @param {Fixer} fixer - the eslint fixer object
     * @param {number} fromLoc - the start location
     * @param {number} toLoc - the end location
     * @param {string} mode - either 'start' or 'end'
     * @param {string=} spacing - a spacing value that will optionally add a space to the removed text
     * @returns {Object|*|{range, text}}
     */
    function fixByTrimmingWhitespace(fixer, fromLoc, toLoc, mode, spacing) {
      let replacementText = context.getSourceCode().text.slice(fromLoc, toLoc);
      if (mode === 'start') {
        replacementText = replacementText.replace(/^\s+/gm, '');
      } else {
        replacementText = replacementText.replace(/\s+$/gm, '');
      }
      if (spacing === SPACING.always) {
        if (mode === 'start') {
          replacementText += ' ';
        } else {
          replacementText = ` ${replacementText}`;
        }
      }
      return fixer.replaceTextRange([fromLoc, toLoc], replacementText);
    }

    /**
    * Reports that there shouldn't be a newline after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @param {string} spacing
    * @returns {void}
    */
    function reportNoBeginningNewline(node, token, spacing) {
      context.report({
        node,
        loc: token.loc.start,
        message: `There should be no newline after '${token.value}'`,
        fix(fixer) {
          const nextToken = context.getSourceCode().getTokenAfter(token);
          return fixByTrimmingWhitespace(fixer, token.range[1], nextToken.range[0], 'start', spacing);
        }
      });
    }

    /**
    * Reports that there shouldn't be a newline before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @param {string} spacing
    * @returns {void}
    */
    function reportNoEndingNewline(node, token, spacing) {
      context.report({
        node,
        loc: token.loc.start,
        message: `There should be no newline before '${token.value}'`,
        fix(fixer) {
          const previousToken = context.getSourceCode().getTokenBefore(token);
          return fixByTrimmingWhitespace(fixer, previousToken.range[1], token.range[0], 'end', spacing);
        }
      });
    }

    /**
    * Reports that there shouldn't be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoBeginningSpace(node, token) {
      context.report({
        node,
        loc: token.loc.start,
        message: `There should be no space after '${token.value}'`,
        fix(fixer) {
          const sourceCode = context.getSourceCode();
          const nextToken = sourceCode.getTokenAfter(token);
          let nextComment;

          // ESLint >=4.x
          if (sourceCode.getCommentsAfter) {
            nextComment = sourceCode.getCommentsAfter(token);
          // ESLint 3.x
          } else {
            const potentialComment = sourceCode.getTokenAfter(token, {includeComments: true});
            nextComment = nextToken === potentialComment ? [] : [potentialComment];
          }

          // Take comments into consideration to narrow the fix range to what is actually affected. (See #1414)
          if (nextComment.length > 0) {
            return fixByTrimmingWhitespace(fixer, token.range[1], Math.min(nextToken.range[0], nextComment[0].start), 'start');
          }

          return fixByTrimmingWhitespace(fixer, token.range[1], nextToken.range[0], 'start');
        }
      });
    }

    /**
    * Reports that there shouldn't be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportNoEndingSpace(node, token) {
      context.report({
        node,
        loc: token.loc.start,
        message: `There should be no space before '${token.value}'`,
        fix(fixer) {
          const sourceCode = context.getSourceCode();
          const previousToken = sourceCode.getTokenBefore(token);
          let previousComment;

          // ESLint >=4.x
          if (sourceCode.getCommentsBefore) {
            previousComment = sourceCode.getCommentsBefore(token);
          // ESLint 3.x
          } else {
            const potentialComment = sourceCode.getTokenBefore(token, {includeComments: true});
            previousComment = previousToken === potentialComment ? [] : [potentialComment];
          }

          // Take comments into consideration to narrow the fix range to what is actually affected. (See #1414)
          if (previousComment.length > 0) {
            return fixByTrimmingWhitespace(fixer, Math.max(previousToken.range[1], previousComment[0].end), token.range[0], 'end');
          }

          return fixByTrimmingWhitespace(fixer, previousToken.range[1], token.range[0], 'end');
        }
      });
    }

    /**
    * Reports that there should be a space after the first token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredBeginningSpace(node, token) {
      context.report({
        node,
        loc: token.loc.start,
        message: `A space is required after '${token.value}'`,
        fix(fixer) {
          return fixer.insertTextAfter(token, ' ');
        }
      });
    }

    /**
    * Reports that there should be a space before the last token
    * @param {ASTNode} node - The node to report in the event of an error.
    * @param {Token} token - The token to use for the report.
    * @returns {void}
    */
    function reportRequiredEndingSpace(node, token) {
      context.report({
        node,
        loc: token.loc.start,
        message: `A space is required before '${token.value}'`,
        fix(fixer) {
          return fixer.insertTextBefore(token, ' ');
        }
      });
    }

    /**
     * Determines if spacing in curly braces is valid.
     * @param {ASTNode} node The AST node to check.
     * @returns {void}
     */
    function validateBraceSpacing(node) {
      let config;
      switch (node.parent.type) {
        case 'JSXAttribute':
        case 'JSXOpeningElement':
          config = attributesConfig;
          break;

        case 'JSXElement':
        case 'JSXFragment':
          config = childrenConfig;
          break;

        default:
          return;
      }
      if (config === null) {
        return;
      }

      const sourceCode = context.getSourceCode();
      const first = context.getFirstToken(node);
      const last = sourceCode.getLastToken(node);
      let second = context.getTokenAfter(first, {includeComments: true});
      let penultimate = sourceCode.getTokenBefore(last, {includeComments: true});

      if (!second) {
        second = context.getTokenAfter(first);
        const leadingComments = sourceCode.getNodeByRangeIndex(second.range[0]).leadingComments;
        second = leadingComments ? leadingComments[0] : second;
      }
      if (!penultimate) {
        penultimate = sourceCode.getTokenBefore(last);
        const trailingComments = sourceCode.getNodeByRangeIndex(penultimate.range[0]).trailingComments;
        penultimate = trailingComments ? trailingComments[trailingComments.length - 1] : penultimate;
      }

      const isObjectLiteral = first.value === second.value;
      const spacing = isObjectLiteral ? config.objectLiteralSpaces : config.when;
      if (spacing === SPACING.always) {
        if (!sourceCode.isSpaceBetweenTokens(first, second)) {
          reportRequiredBeginningSpace(node, first);
        } else if (!config.allowMultiline && isMultiline(first, second)) {
          reportNoBeginningNewline(node, first, spacing);
        }
        if (!sourceCode.isSpaceBetweenTokens(penultimate, last)) {
          reportRequiredEndingSpace(node, last);
        } else if (!config.allowMultiline && isMultiline(penultimate, last)) {
          reportNoEndingNewline(node, last, spacing);
        }
      } else if (spacing === SPACING.never) {
        if (isMultiline(first, second)) {
          if (!config.allowMultiline) {
            reportNoBeginningNewline(node, first, spacing);
          }
        } else if (sourceCode.isSpaceBetweenTokens(first, second)) {
          reportNoBeginningSpace(node, first);
        }
        if (isMultiline(penultimate, last)) {
          if (!config.allowMultiline) {
            reportNoEndingNewline(node, last, spacing);
          }
        } else if (sourceCode.isSpaceBetweenTokens(penultimate, last)) {
          reportNoEndingSpace(node, last);
        }
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXExpressionContainer: validateBraceSpacing,
      JSXSpreadAttribute: validateBraceSpacing
    };
  }
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview enforce consistent line breaks inside jsx curly
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function getNormalizedOption(context) {
  const rawOption = context.options[0] || 'consistent';

  if (rawOption === 'consistent') {
    return {
      multiline: 'consistent',
      singleline: 'consistent'
    };
  }

  if (rawOption === 'never') {
    return {
      multiline: 'forbid',
      singleline: 'forbid'
    };
  }

  return {
    multiline: rawOption.multiline || 'consistent',
    singleline: rawOption.singleline || 'consistent'
  };
}

module.exports = {
  meta: {
    type: 'layout',

    docs: {
      description: 'enforce consistent line breaks inside jsx curly',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-curly-newline')
    },

    fixable: 'whitespace',

    schema: [
      {
        oneOf: [
          {
            enum: ['consistent', 'never']
          },
          {
            type: 'object',
            properties: {
              singleline: {enum: ['consistent', 'require', 'forbid']},
              multiline: {enum: ['consistent', 'require', 'forbid']}
            },
            additionalProperties: false
          }
        ]
      }
    ],


    messages: {
      expectedBefore: 'Expected newline before \'}\'.',
      expectedAfter: 'Expected newline after \'{\'.',
      unexpectedBefore: 'Unexpected newline before \'{\'.',
      unexpectedAfter: 'Unexpected newline after \'}\'.'
    }
  },

  create(context) {
    const sourceCode = context.getSourceCode();
    const option = getNormalizedOption(context);

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    /**
     * Determines whether two adjacent tokens are on the same line.
     * @param {Object} left - The left token object.
     * @param {Object} right - The right token object.
     * @returns {boolean} Whether or not the tokens are on the same line.
     */
    function isTokenOnSameLine(left, right) {
      return left.loc.end.line === right.loc.start.line;
    }

    /**
     * Determines whether there should be newlines inside curlys
     * @param {ASTNode} expression The expression contained in the curlys
     * @param {boolean} hasLeftNewline `true` if the left curly has a newline in the current code.
     * @returns {boolean} `true` if there should be newlines inside the function curlys
     */
    function shouldHaveNewlines(expression, hasLeftNewline) {
      const isMultiline = expression.loc.start.line !== expression.loc.end.line;

      switch (isMultiline ? option.multiline : option.singleline) {
        case 'forbid': return false;
        case 'require': return true;
        case 'consistent':
        default: return hasLeftNewline;
      }
    }

    /**
     * Validates curlys
     * @param {Object} curlys An object with keys `leftParen` for the left paren token, and `rightParen` for the right paren token
     * @param {ASTNode} expression The expression inside the curly
     * @returns {void}
     */
    function validateCurlys(curlys, expression) {
      const leftCurly = curlys.leftCurly;
      const rightCurly = curlys.rightCurly;
      const tokenAfterLeftCurly = sourceCode.getTokenAfter(leftCurly);
      const tokenBeforeRightCurly = sourceCode.getTokenBefore(rightCurly);
      const hasLeftNewline = !isTokenOnSameLine(leftCurly, tokenAfterLeftCurly);
      const hasRightNewline = !isTokenOnSameLine(tokenBeforeRightCurly, rightCurly);
      const needsNewlines = shouldHaveNewlines(expression, hasLeftNewline);

      if (hasLeftNewline && !needsNewlines) {
        context.report({
          node: leftCurly,
          messageId: 'unexpectedAfter',
          fix(fixer) {
            return sourceCode
              .getText()
              .slice(leftCurly.range[1], tokenAfterLeftCurly.range[0])
              .trim() ?
              null : // If there is a comment between the { and the first element, don't do a fix.
              fixer.removeRange([leftCurly.range[1], tokenAfterLeftCurly.range[0]]);
          }
        });
      } else if (!hasLeftNewline && needsNewlines) {
        context.report({
          node: leftCurly,
          messageId: 'expectedAfter',
          fix: fixer => fixer.insertTextAfter(leftCurly, '\n')
        });
      }

      if (hasRightNewline && !needsNewlines) {
        context.report({
          node: rightCurly,
          messageId: 'unexpectedBefore',
          fix(fixer) {
            return sourceCode
              .getText()
              .slice(tokenBeforeRightCurly.range[1], rightCurly.range[0])
              .trim() ?
              null : // If there is a comment between the last element and the }, don't do a fix.
              fixer.removeRange([
                tokenBeforeRightCurly.range[1],
                rightCurly.range[0]
              ]);
          }
        });
      } else if (!hasRightNewline && needsNewlines) {
        context.report({
          node: rightCurly,
          messageId: 'expectedBefore',
          fix: fixer => fixer.insertTextBefore(rightCurly, '\n')
        });
      }
    }


    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------

    return {
      JSXExpressionContainer(node) {
        const curlyTokens = {
          leftCurly: sourceCode.getFirstToken(node),
          rightCurly: sourceCode.getLastToken(node)
        };
        validateCurlys(curlyTokens, node.expression);
      }
    };
  }
};


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow or enforce spaces around equal signs in JSX attributes.
 * @author ryym
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow or enforce spaces around equal signs in JSX attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-equals-spacing')
    },
    fixable: 'code',

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create(context) {
    const config = context.options[0];

    /**
     * Determines a given attribute node has an equal sign.
     * @param {ASTNode} attrNode - The attribute node.
     * @returns {boolean} Whether or not the attriute node has an equal sign.
     */
    function hasEqual(attrNode) {
      return attrNode.type !== 'JSXSpreadAttribute' && attrNode.value !== null;
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXOpeningElement(node) {
        node.attributes.forEach((attrNode) => {
          if (!hasEqual(attrNode)) {
            return;
          }

          const sourceCode = context.getSourceCode();
          const equalToken = sourceCode.getTokenAfter(attrNode.name);
          const spacedBefore = sourceCode.isSpaceBetweenTokens(attrNode.name, equalToken);
          const spacedAfter = sourceCode.isSpaceBetweenTokens(equalToken, attrNode.value);

          switch (config) {
            default:
            case 'never':
              if (spacedBefore) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'There should be no space before \'=\'',
                  fix(fixer) {
                    return fixer.removeRange([attrNode.name.range[1], equalToken.range[0]]);
                  }
                });
              }
              if (spacedAfter) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'There should be no space after \'=\'',
                  fix(fixer) {
                    return fixer.removeRange([equalToken.range[1], attrNode.value.range[0]]);
                  }
                });
              }
              break;
            case 'always':
              if (!spacedBefore) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'A space is required before \'=\'',
                  fix(fixer) {
                    return fixer.insertTextBefore(equalToken, ' ');
                  }
                });
              }
              if (!spacedAfter) {
                context.report({
                  node: attrNode,
                  loc: equalToken.loc.start,
                  message: 'A space is required after \'=\'',
                  fix(fixer) {
                    return fixer.insertTextAfter(equalToken, ' ');
                  }
                });
              }
              break;
          }
        });
      }
    };
  }
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Restrict file extensions that may contain JSX
 * @author Joe Lencioni
 */



const path = __webpack_require__(77);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  extensions: ['.jsx']
};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Restrict file extensions that may contain JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-filename-extension')
    },

    schema: [{
      type: 'object',
      properties: {
        extensions: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    let invalidExtension;
    let invalidNode;

    function getExtensionsConfig() {
      return context.options[0] && context.options[0].extensions || DEFAULTS.extensions;
    }

    function handleJSX(node) {
      const filename = context.getFilename();
      if (filename === '<text>') {
        return;
      }

      if (invalidNode) {
        return;
      }

      const allowedExtensions = getExtensionsConfig();
      const isAllowedExtension = allowedExtensions.some(extension => filename.slice(-extension.length) === extension);

      if (isAllowedExtension) {
        return;
      }

      invalidNode = node;
      invalidExtension = path.extname(filename);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX,

      'Program:exit': function () {
        if (!invalidNode) {
          return;
        }

        context.report({
          node: invalidNode,
          message: `JSX not allowed in files with extension '${invalidExtension}'`
        });
      }
    };
  }
};


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Ensure proper position of the first property in JSX
 * @author Joachim Seminck
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Ensure proper position of the first property in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-first-prop-new-line')
    },
    fixable: 'code',

    schema: [{
      enum: ['always', 'never', 'multiline', 'multiline-multiprop']
    }]
  },

  create(context) {
    const configuration = context.options[0] || 'multiline-multiprop';

    function isMultilineJSX(jsxNode) {
      return jsxNode.loc.start.line < jsxNode.loc.end.line;
    }

    return {
      JSXOpeningElement(node) {
        if (
          (configuration === 'multiline' && isMultilineJSX(node)) ||
          (configuration === 'multiline-multiprop' && isMultilineJSX(node) && node.attributes.length > 1) ||
          (configuration === 'always')
        ) {
          node.attributes.some((decl) => {
            if (decl.loc.start.line === node.loc.start.line) {
              context.report({
                node: decl,
                message: 'Property should be placed on a new line',
                fix(fixer) {
                  return fixer.replaceTextRange([node.name.range[1], decl.range[0]], '\n');
                }
              });
            }
            return true;
          });
        } else if (configuration === 'never' && node.attributes.length > 0) {
          const firstNode = node.attributes[0];
          if (node.loc.start.line < firstNode.loc.start.line) {
            context.report({
              node: firstNode,
              message: 'Property should be placed on the same line as the component declaration',
              fix(fixer) {
                return fixer.replaceTextRange([node.name.range[1], firstNode.range[0]], ' ');
              }
            });
          }
        }
      }
    };
  }
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce event handler naming conventions in JSX
 * @author Jake Marsh
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce event handler naming conventions in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-handler-names')
    },

    schema: [{
      type: 'object',
      properties: {
        eventHandlerPrefix: {
          type: 'string'
        },
        eventHandlerPropPrefix: {
          type: 'string'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const eventHandlerPrefix = configuration.eventHandlerPrefix || 'handle';
    const eventHandlerPropPrefix = configuration.eventHandlerPropPrefix || 'on';

    const EVENT_HANDLER_REGEX = new RegExp(`^((props\\.${eventHandlerPropPrefix})|((.*\\.)?${eventHandlerPrefix}))[A-Z].*$`);
    const PROP_EVENT_HANDLER_REGEX = new RegExp(`^(${eventHandlerPropPrefix}[A-Z].*|ref)$`);

    return {
      JSXAttribute(node) {
        if (!node.value || !node.value.expression || !node.value.expression.object) {
          return;
        }

        const propKey = typeof node.name === 'object' ? node.name.name : node.name;
        const propValue = context.getSourceCode().getText(node.value.expression).replace(/^this\.|.*::/, '');

        if (propKey === 'ref') {
          return;
        }

        const propIsEventHandler = PROP_EVENT_HANDLER_REGEX.test(propKey);
        const propFnIsNamedCorrectly = EVENT_HANDLER_REGEX.test(propValue);

        if (propIsEventHandler && !propFnIsNamedCorrectly) {
          context.report({
            node,
            message: `Handler function for ${propKey} prop key must begin with '${eventHandlerPrefix}'`
          });
        } else if (propFnIsNamedCorrectly && !propIsEventHandler) {
          context.report({
            node,
            message: `Prop key for ${propValue} must begin with '${eventHandlerPropPrefix}'`
          });
        }
      }
    };
  }
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate JSX indentation
 * @author Yannick Croissant

 * This rule has been ported and modified from eslint and nodeca.
 * @author Vitaly Puzrin
 * @author Gyandeep Singh
 * @copyright 2015 Vitaly Puzrin. All rights reserved.
 * @copyright 2015 Gyandeep Singh. All rights reserved.
 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */



const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate JSX indentation',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-indent')
    },
    fixable: 'whitespace',
    schema: [{
      oneOf: [{
        enum: ['tab']
      }, {
        type: 'integer'
      }]
    }, {
      type: 'object',
      properties: {
        checkAttributes: {
          type: 'boolean'
        },
        indentLogicalExpressions: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const MESSAGE = 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.';

    const extraColumnStart = 0;
    let indentType = 'space';
    let indentSize = 4;

    if (context.options.length) {
      if (context.options[0] === 'tab') {
        indentSize = 1;
        indentType = 'tab';
      } else if (typeof context.options[0] === 'number') {
        indentSize = context.options[0];
        indentType = 'space';
      }
    }

    const indentChar = indentType === 'space' ? ' ' : '\t';
    const options = context.options[1] || {};
    const checkAttributes = options.checkAttributes || false;
    const indentLogicalExpressions = options.indentLogicalExpressions || false;

    /**
     * Responsible for fixing the indentation issue fix
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @returns {Function} function to be executed by the fixer
     * @private
     */
    function getFixerFunction(node, needed) {
      return function (fixer) {
        const indent = Array(needed + 1).join(indentChar);
        return fixer.replaceTextRange(
          [node.range[0] - node.loc.start.column, node.range[0]],
          indent
        );
      };
    }

    /**
     * Reports a given indent violation and properly pluralizes the message
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @param {Number} gotten Indentation character count in the actual node/code
     * @param {Object} [loc] Error line and column location
     */
    function report(node, needed, gotten, loc) {
      const msgContext = {
        needed,
        type: indentType,
        characters: needed === 1 ? 'character' : 'characters',
        gotten
      };

      if (loc) {
        context.report({
          node,
          loc,
          message: MESSAGE,
          data: msgContext,
          fix: getFixerFunction(node, needed)
        });
      } else {
        context.report({
          node,
          message: MESSAGE,
          data: msgContext,
          fix: getFixerFunction(node, needed)
        });
      }
    }

    /**
     * Get node indent
     * @param {ASTNode} node Node to examine
     * @param {Boolean} [byLastLine] get indent of node's last line
     * @param {Boolean} [excludeCommas] skip comma on start of line
     * @return {Number} Indent
     */
    function getNodeIndent(node, byLastLine, excludeCommas) {
      byLastLine = byLastLine || false;
      excludeCommas = excludeCommas || false;

      let src = context.getSourceCode().getText(node, node.loc.start.column + extraColumnStart);
      const lines = src.split('\n');
      if (byLastLine) {
        src = lines[lines.length - 1];
      } else {
        src = lines[0];
      }

      const skip = excludeCommas ? ',' : '';

      let regExp;
      if (indentType === 'space') {
        regExp = new RegExp(`^[ ${skip}]+`);
      } else {
        regExp = new RegExp(`^[\t${skip}]+`);
      }

      const indent = regExp.exec(src);
      return indent ? indent[0].length : 0;
    }

    /**
     * Check if the node is the right member of a logical expression
     * @param {ASTNode} node The node to check
     * @return {Boolean} true if its the case, false if not
     */
    function isRightInLogicalExp(node) {
      return (
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'LogicalExpression' &&
        node.parent.parent.right === node.parent &&
        !indentLogicalExpressions
      );
    }

    /**
     * Check if the node is the alternate member of a conditional expression
     * @param {ASTNode} node The node to check
     * @return {Boolean} true if its the case, false if not
     */
    function isAlternateInConditionalExp(node) {
      return (
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'ConditionalExpression' &&
        node.parent.parent.alternate === node.parent &&
        context.getSourceCode().getTokenBefore(node).value !== '('
      );
    }

    /**
     * Check indent for nodes list
     * @param {ASTNode} node The node to check
     * @param {Number} indent needed indent
     * @param {Boolean} [excludeCommas] skip comma on start of line
     */
    function checkNodesIndent(node, indent, excludeCommas) {
      const nodeIndent = getNodeIndent(node, false, excludeCommas);
      const isCorrectRightInLogicalExp = isRightInLogicalExp(node) && (nodeIndent - indent) === indentSize;
      const isCorrectAlternateInCondExp = isAlternateInConditionalExp(node) && (nodeIndent - indent) === 0;
      if (
        nodeIndent !== indent &&
        astUtil.isNodeFirstInLine(context, node) &&
        !isCorrectRightInLogicalExp &&
        !isCorrectAlternateInCondExp
      ) {
        report(node, indent, nodeIndent);
      }
    }

    function handleOpeningElement(node) {
      const sourceCode = context.getSourceCode();
      let prevToken = sourceCode.getTokenBefore(node);
      if (!prevToken) {
        return;
      }
      // Use the parent in a list or an array
      if (prevToken.type === 'JSXText' || prevToken.type === 'Punctuator' && prevToken.value === ',') {
        prevToken = sourceCode.getNodeByRangeIndex(prevToken.range[0]);
        prevToken = prevToken.type === 'Literal' || prevToken.type === 'JSXText' ? prevToken.parent : prevToken;
      // Use the first non-punctuator token in a conditional expression
      } else if (prevToken.type === 'Punctuator' && prevToken.value === ':') {
        do {
          prevToken = sourceCode.getTokenBefore(prevToken);
        } while (prevToken.type === 'Punctuator' && prevToken.value !== '/');
        prevToken = sourceCode.getNodeByRangeIndex(prevToken.range[0]);
        while (prevToken.parent && prevToken.parent.type !== 'ConditionalExpression') {
          prevToken = prevToken.parent;
        }
      }
      prevToken = prevToken.type === 'JSXExpressionContainer' ? prevToken.expression : prevToken;
      const parentElementIndent = getNodeIndent(prevToken);
      const indent = (
        prevToken.loc.start.line === node.loc.start.line ||
        isRightInLogicalExp(node) ||
        isAlternateInConditionalExp(node)
      ) ? 0 : indentSize;
      checkNodesIndent(node, parentElementIndent + indent);
    }

    function handleClosingElement(node) {
      if (!node.parent) {
        return;
      }
      const peerElementIndent = getNodeIndent(node.parent.openingElement || node.parent.openingFragment);
      checkNodesIndent(node, peerElementIndent);
    }

    function handleAttribute(node) {
      if (!checkAttributes || (!node.value || node.value.type !== 'JSXExpressionContainer')) {
        return;
      }
      const nameIndent = getNodeIndent(node.name);
      const lastToken = context.getSourceCode().getLastToken(node.value);
      const firstInLine = astUtil.getFirstNodeInLine(context, lastToken);
      const indent = node.name.loc.start.line === firstInLine.loc.start.line ? 0 : nameIndent;
      checkNodesIndent(firstInLine, indent);
    }

    return {
      JSXOpeningElement: handleOpeningElement,
      JSXOpeningFragment: handleOpeningElement,
      JSXClosingElement: handleClosingElement,
      JSXClosingFragment: handleClosingElement,
      JSXAttribute: handleAttribute,
      JSXExpressionContainer(node) {
        if (!node.parent) {
          return;
        }
        const parentNodeIndent = getNodeIndent(node.parent);
        checkNodesIndent(node, parentNodeIndent + indentSize);
      }
    };
  }
};


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate props indentation in JSX
 * @author Yannick Croissant

 * This rule has been ported and modified from eslint and nodeca.
 * @author Vitaly Puzrin
 * @author Gyandeep Singh
 * @copyright 2015 Vitaly Puzrin. All rights reserved.
 * @copyright 2015 Gyandeep Singh. All rights reserved.
 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */



const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate props indentation in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-indent-props')
    },
    fixable: 'code',

    schema: [{
      oneOf: [{
        enum: ['tab', 'first']
      }, {
        type: 'integer'
      }]
    }]
  },

  create(context) {
    const MESSAGE = 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.';

    const extraColumnStart = 0;
    let indentType = 'space';
    /** @type {number|'first'} */
    let indentSize = 4;

    if (context.options.length) {
      if (context.options[0] === 'first') {
        indentSize = 'first';
        indentType = 'space';
      } else if (context.options[0] === 'tab') {
        indentSize = 1;
        indentType = 'tab';
      } else if (typeof context.options[0] === 'number') {
        indentSize = context.options[0];
        indentType = 'space';
      }
    }

    /**
     * Reports a given indent violation and properly pluralizes the message
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @param {Number} gotten Indentation character count in the actual node/code
     */
    function report(node, needed, gotten) {
      const msgContext = {
        needed,
        type: indentType,
        characters: needed === 1 ? 'character' : 'characters',
        gotten
      };

      context.report({
        node,
        message: MESSAGE,
        data: msgContext,
        fix(fixer) {
          return fixer.replaceTextRange([node.range[0] - node.loc.start.column, node.range[0]],
            Array(needed + 1).join(indentType === 'space' ? ' ' : '\t'));
        }
      });
    }

    /**
     * Get node indent
     * @param {ASTNode} node Node to examine
     * @return {Number} Indent
     */
    function getNodeIndent(node) {
      let src = context.getSourceCode().getText(node, node.loc.start.column + extraColumnStart);
      const lines = src.split('\n');
      src = lines[0];

      let regExp;
      if (indentType === 'space') {
        regExp = /^[ ]+/;
      } else {
        regExp = /^[\t]+/;
      }

      const indent = regExp.exec(src);
      return indent ? indent[0].length : 0;
    }

    /**
     * Check indent for nodes list
     * @param {ASTNode[]} nodes list of node objects
     * @param {Number} indent needed indent
     */
    function checkNodesIndent(nodes, indent) {
      nodes.forEach((node) => {
        const nodeIndent = getNodeIndent(node);
        if (
          node.type !== 'ArrayExpression' && node.type !== 'ObjectExpression' &&
          nodeIndent !== indent && astUtil.isNodeFirstInLine(context, node)
        ) {
          report(node, indent, nodeIndent);
        }
      });
    }

    return {
      JSXOpeningElement(node) {
        if (!node.attributes.length) {
          return;
        }
        let propIndent;
        if (indentSize === 'first') {
          const firstPropNode = node.attributes[0];
          propIndent = firstPropNode.loc.start.column;
        } else {
          const elementIndent = getNodeIndent(node);
          propIndent = elementIndent + indentSize;
        }
        checkNodesIndent(node.attributes, propIndent);
      }
    };
  }
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Report missing `key` props in iterators/collection literals.
 * @author Ben Mosher
 */



const hasProp = __webpack_require__(149);
const docsUrl = __webpack_require__(124);


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const defaultOptions = {
  checkFragmentShorthand: false
};

module.exports = {
  meta: {
    docs: {
      description: 'Report missing `key` props in iterators/collection literals',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-key')
    },
    schema: [{
      type: 'object',
      properties: {
        checkFragmentShorthand: {
          type: 'boolean',
          default: defaultOptions.checkFragmentShorthand
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const options = Object.assign({}, defaultOptions, context.options[0]);
    const checkFragmentShorthand = options.checkFragmentShorthand;

    function checkIteratorElement(node) {
      if (node.type === 'JSXElement' && !hasProp(node.openingElement.attributes, 'key')) {
        context.report({
          node,
          message: 'Missing "key" prop for element in iterator'
        });
      } else if (checkFragmentShorthand && node.type === 'JSXFragment') {
        context.report({
          node,
          message: 'Missing "key" prop for element in iterator. Shorthand fragment syntax does support providing keys'
        });
      }
    }

    function getReturnStatement(body) {
      return body.filter(item => item.type === 'ReturnStatement')[0];
    }

    return {
      JSXElement(node) {
        if (hasProp(node.openingElement.attributes, 'key')) {
          return;
        }

        if (node.parent.type === 'ArrayExpression') {
          context.report({
            node,
            message: 'Missing "key" prop for element in array'
          });
        }
      },

      JSXFragment(node) {
        if (!checkFragmentShorthand) {
          return;
        }

        if (node.parent.type === 'ArrayExpression') {
          context.report({
            node,
            message: 'Missing "key" prop for element in array. Shorthand fragment syntax does support providing keys'
          });
        }
      },

      // Array.prototype.map
      CallExpression(node) {
        if (node.callee && node.callee.type !== 'MemberExpression') {
          return;
        }

        if (node.callee && node.callee.property && node.callee.property.name !== 'map') {
          return;
        }

        const fn = node.arguments[0];
        const isFn = fn && fn.type === 'FunctionExpression';
        const isArrFn = fn && fn.type === 'ArrowFunctionExpression';

        if (isArrFn && (fn.body.type === 'JSXElement' || fn.body.type === 'JSXFragment')) {
          checkIteratorElement(fn.body);
        }

        if (isFn || isArrFn) {
          if (fn.body.type === 'BlockStatement') {
            const returnStatement = getReturnStatement(fn.body.body);
            if (returnStatement && returnStatement.argument) {
              checkIteratorElement(returnStatement.argument);
            }
          }
        }
      }
    };
  }
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88).hasProp; // eslint-disable-line import/no-unresolved


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate JSX maximum depth
 * @author Chris<wfsr@foxmail.com>
 */



const has = __webpack_require__(15);
const variableUtil = __webpack_require__(65);
const jsxUtil = __webpack_require__(86);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate JSX maximum depth',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-max-depth')
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const MESSAGE = 'Expected the depth of nested jsx elements to be <= {{needed}}, but found {{found}}.';
    const DEFAULT_DEPTH = 2;

    const option = context.options[0] || {};
    const maxDepth = has(option, 'max') ? option.max : DEFAULT_DEPTH;

    function isExpression(node) {
      return node.type === 'JSXExpressionContainer';
    }

    function hasJSX(node) {
      return jsxUtil.isJSX(node) || isExpression(node) && jsxUtil.isJSX(node.expression);
    }

    function isLeaf(node) {
      const children = node.children;

      return !children.length || !children.some(hasJSX);
    }

    function getDepth(node) {
      let count = 0;

      while (jsxUtil.isJSX(node.parent) || isExpression(node.parent)) {
        node = node.parent;
        if (jsxUtil.isJSX(node)) {
          count++;
        }
      }

      return count;
    }


    function report(node, depth) {
      context.report({
        node,
        message: MESSAGE,
        data: {
          found: depth,
          needed: maxDepth
        }
      });
    }

    function findJSXElementOrFragment(variables, name) {
      function find(refs) {
        let i = refs.length;

        while (--i >= 0) {
          if (has(refs[i], 'writeExpr')) {
            const writeExpr = refs[i].writeExpr;

            return jsxUtil.isJSX(writeExpr) &&
              writeExpr ||
              (writeExpr && writeExpr.type === 'Identifier') &&
              findJSXElementOrFragment(variables, writeExpr.name);
          }
        }

        return null;
      }

      const variable = variableUtil.getVariable(variables, name);
      return variable && variable.references && find(variable.references);
    }

    function checkDescendant(baseDepth, children) {
      baseDepth++;
      (children || []).forEach((node) => {
        if (!hasJSX(node)) {
          return;
        }

        if (baseDepth > maxDepth) {
          report(node, baseDepth);
        } else if (!isLeaf(node)) {
          checkDescendant(baseDepth, node.children);
        }
      });
    }

    function handleJSX(node) {
      if (!isLeaf(node)) {
        return;
      }

      const depth = getDepth(node);
      if (depth > maxDepth) {
        report(node, depth);
      }
    }

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX,

      JSXExpressionContainer(node) {
        if (node.expression.type !== 'Identifier') {
          return;
        }

        const variables = variableUtil.variablesInScope(context);
        const element = findJSXElementOrFragment(variables, node.expression.name);

        if (element) {
          const baseDepth = getDepth(node);
          checkDescendant(baseDepth, element.children);
        }
      }
    };
  }
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Limit maximum of props on a single line in JSX
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Limit maximum of props on a single line in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-max-props-per-line')
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        maximum: {
          type: 'integer',
          minimum: 1
        },
        when: {
          type: 'string',
          enum: ['always', 'multiline']
        }
      }
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const maximum = configuration.maximum || 1;
    const when = configuration.when || 'always';

    function getPropName(propNode) {
      if (propNode.type === 'JSXSpreadAttribute') {
        return context.getSourceCode().getText(propNode.argument);
      }
      return propNode.name.name;
    }

    function generateFixFunction(line, max) {
      const sourceCode = context.getSourceCode();
      const output = [];
      const front = line[0].range[0];
      const back = line[line.length - 1].range[1];
      for (let i = 0; i < line.length; i += max) {
        const nodes = line.slice(i, i + max);
        output.push(nodes.reduce((prev, curr) => {
          if (prev === '') {
            return sourceCode.getText(curr);
          }
          return `${prev} ${sourceCode.getText(curr)}`;
        }, ''));
      }
      const code = output.join('\n');
      return function (fixer) {
        return fixer.replaceTextRange([front, back], code);
      };
    }

    return {
      JSXOpeningElement(node) {
        if (!node.attributes.length) {
          return;
        }

        if (when === 'multiline' && node.loc.start.line === node.loc.end.line) {
          return;
        }

        const firstProp = node.attributes[0];
        const linePartitionedProps = [[firstProp]];

        node.attributes.reduce((last, decl) => {
          if (last.loc.end.line === decl.loc.start.line) {
            linePartitionedProps[linePartitionedProps.length - 1].push(decl);
          } else {
            linePartitionedProps.push([decl]);
          }
          return decl;
        });

        linePartitionedProps.forEach((propsInLine) => {
          if (propsInLine.length > maximum) {
            const name = getPropName(propsInLine[maximum]);
            context.report({
              node: propsInLine[maximum],
              message: `Prop \`${name}\` must be placed on a new line`,
              fix: generateFixFunction(propsInLine, maximum)
            });
          }
        });
      }
    };
  }
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevents usage of Function.prototype.bind and arrow functions
 *               in React component props.
 * @author Daniel Lo Nigro <dan.cx>
 * @author Jacky Ho
 */



const propName = __webpack_require__(153);
const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

const violationMessageStore = {
  bindCall: 'JSX props should not use .bind()',
  arrowFunc: 'JSX props should not use arrow functions',
  bindExpression: 'JSX props should not use ::',
  func: 'JSX props should not use functions'
};

module.exports = {
  meta: {
    docs: {
      description: 'Prevents usage of Function.prototype.bind and arrow functions in React component props',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('jsx-no-bind')
    },

    schema: [{
      type: 'object',
      properties: {
        allowArrowFunctions: {
          default: false,
          type: 'boolean'
        },
        allowBind: {
          default: false,
          type: 'boolean'
        },
        allowFunctions: {
          default: false,
          type: 'boolean'
        },
        ignoreRefs: {
          default: false,
          type: 'boolean'
        },
        ignoreDOMComponents: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context) => {
    const configuration = context.options[0] || {};

    // Keep track of all the variable names pointing to a bind call,
    // bind expression or an arrow function in different block statements
    const blockVariableNameSets = {};

    function setBlockVariableNameSet(blockStart) {
      blockVariableNameSets[blockStart] = {
        arrowFunc: new Set(),
        bindCall: new Set(),
        bindExpression: new Set(),
        func: new Set()
      };
    }

    function getNodeViolationType(node) {
      const nodeType = node.type;

      if (
        !configuration.allowBind &&
        nodeType === 'CallExpression' &&
        node.callee.type === 'MemberExpression' &&
        node.callee.property.type === 'Identifier' &&
        node.callee.property.name === 'bind'
      ) {
        return 'bindCall';
      }
      if (nodeType === 'ConditionalExpression') {
        return getNodeViolationType(node.test) ||
               getNodeViolationType(node.consequent) ||
               getNodeViolationType(node.alternate);
      }
      if (!configuration.allowArrowFunctions && nodeType === 'ArrowFunctionExpression') {
        return 'arrowFunc';
      }
      if (!configuration.allowFunctions && nodeType === 'FunctionExpression') {
        return 'func';
      }
      if (!configuration.allowBind && nodeType === 'BindExpression') {
        return 'bindExpression';
      }

      return null;
    }

    function addVariableNameToSet(violationType, variableName, blockStart) {
      blockVariableNameSets[blockStart][violationType].add(variableName);
    }

    function getBlockStatementAncestors(node) {
      return context.getAncestors(node).reverse().filter(
        ancestor => ancestor.type === 'BlockStatement'
      );
    }

    function reportVariableViolation(node, name, blockStart) {
      const blockSets = blockVariableNameSets[blockStart];
      const violationTypes = Object.keys(blockSets);

      return violationTypes.find((type) => {
        if (blockSets[type].has(name)) {
          context.report({node, message: violationMessageStore[type]});
          return true;
        }

        return false;
      });
    }

    function findVariableViolation(node, name) {
      getBlockStatementAncestors(node).find(
        block => reportVariableViolation(node, name, block.start)
      );
    }

    return {
      BlockStatement(node) {
        setBlockVariableNameSet(node.start);
      },

      VariableDeclarator(node) {
        if (!node.init) {
          return;
        }
        const blockAncestors = getBlockStatementAncestors(node);
        const variableViolationType = getNodeViolationType(node.init);

        if (
          blockAncestors.length > 0 &&
          variableViolationType &&
          node.parent.kind === 'const' // only support const right now
        ) {
          addVariableNameToSet(
            variableViolationType, node.id.name, blockAncestors[0].start
          );
        }
      },

      JSXAttribute(node) {
        const isRef = configuration.ignoreRefs && propName(node) === 'ref';
        if (isRef || !node.value || !node.value.expression) {
          return;
        }
        const isDOMComponent = jsxUtil.isDOMComponent(node.parent);
        if (configuration.ignoreDOMComponents && isDOMComponent) {
          return;
        }
        const valueNode = node.value.expression;
        const valueNodeType = valueNode.type;
        const nodeViolationType = getNodeViolationType(valueNode);

        if (valueNodeType === 'Identifier') {
          findVariableViolation(node, valueNode.name);
        } else if (nodeViolationType) {
          context.report({
            node, message: violationMessageStore[nodeViolationType]
          });
        }
      }
    };
  })
};


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(88).propName; // eslint-disable-line import/no-unresolved


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Comments inside children section of tag should be placed inside braces.
 * @author Ben Vinegar
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Comments inside children section of tag should be placed inside braces',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-no-comment-textnodes')
    },

    schema: [{
      type: 'object',
      properties: {},
      additionalProperties: false
    }]
  },

  create(context) {
    function reportLiteralNode(node) {
      context.report({
        node,
        message: 'Comments inside children section of tag should be placed inside braces'
      });
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      Literal(node) {
        // since babel-eslint has the wrong node.raw, we'll get the source text
        const rawValue = context.getSourceCode().getText(node);
        if (/^\s*\/(\/|\*)/m.test(rawValue)) {
          // inside component, e.g. <div>literal</div>
          if (node.parent.type !== 'JSXAttribute' &&
              node.parent.type !== 'JSXExpressionContainer' &&
              node.parent.type.indexOf('JSX') !== -1) {
            reportLiteralNode(node);
          }
        }
      }
    };
  }
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce no duplicate props
 * @author Markus Ånöstam
 */



const has = __webpack_require__(15);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce no duplicate props',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-no-duplicate-props')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreCase: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const ignoreCase = configuration.ignoreCase || false;

    return {
      JSXOpeningElement(node) {
        const props = {};

        node.attributes.forEach((decl) => {
          if (decl.type === 'JSXSpreadAttribute') {
            return;
          }

          let name = decl.name.name;

          if (typeof name !== 'string') {
            return;
          }

          if (ignoreCase) {
            name = name.toLowerCase();
          }

          if (has(props, name)) {
            context.report({
              node: decl,
              message: 'No duplicate props allowed'
            });
          } else {
            props[name] = 1;
          }
        });
      }
    };
  }
};


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent using string literals in React component definition
 * @author Caleb Morris
 * @author David Buchan-Swanson
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent using string literals in React component definition',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-no-literals')
    },

    schema: [{
      type: 'object',
      properties: {
        noStrings: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const isNoStrings = context.options[0] ? context.options[0].noStrings : false;

    const message = isNoStrings ?
      'Strings not allowed in JSX files' :
      'Missing JSX expression container around literal string';

    function reportLiteralNode(node) {
      context.report({
        node,
        message: `${message}: “${context.getSourceCode().getText(node).trim()}”`
      });
    }

    function getParentIgnoringBinaryExpressions(node) {
      let current = node;
      while (current.parent.type === 'BinaryExpression') {
        current = current.parent;
      }
      return current.parent;
    }

    function getValidation(node) {
      const parent = getParentIgnoringBinaryExpressions(node);
      const standard = !/^[\s]+$/.test(node.value) &&
          typeof node.value === 'string' &&
          parent.type.indexOf('JSX') !== -1 &&
          parent.type !== 'JSXAttribute';
      if (isNoStrings) {
        return standard;
      }
      return standard && parent.type !== 'JSXExpressionContainer';
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      Literal(node) {
        if (getValidation(node)) {
          reportLiteralNode(node);
        }
      },

      JSXText(node) {
        if (getValidation(node)) {
          reportLiteralNode(node);
        }
      },

      TemplateLiteral(node) {
        const parent = getParentIgnoringBinaryExpressions(node);
        if (isNoStrings && parent.type === 'JSXExpressionContainer') {
          reportLiteralNode(node);
        }
      }

    };
  }
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Forbid target='_blank' attribute
 * @author Kevin Miller
 */



const docsUrl = __webpack_require__(124);
const linkComponentsUtil = __webpack_require__(158);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function isTargetBlank(attr) {
  return attr.name &&
    attr.name.name === 'target' &&
    attr.value &&
    attr.value.type === 'Literal' &&
    attr.value.value.toLowerCase() === '_blank';
}

function hasExternalLink(element, linkAttribute) {
  return element.attributes.some(attr => attr.name &&
      attr.name.name === linkAttribute &&
      attr.value.type === 'Literal' &&
      /^(?:\w+:|\/\/)/.test(attr.value.value));
}

function hasDynamicLink(element, linkAttribute) {
  return element.attributes.some(attr => attr.name &&
    attr.name.name === linkAttribute &&
    attr.value.type === 'JSXExpressionContainer');
}

function hasSecureRel(element) {
  return element.attributes.find((attr) => {
    if (attr.type === 'JSXAttribute' && attr.name.name === 'rel') {
      const tags = attr.value && attr.value.type === 'Literal' && attr.value.value.toLowerCase().split(' ');
      return tags && (tags.indexOf('noopener') >= 0 && tags.indexOf('noreferrer') >= 0);
    }
    return false;
  });
}

module.exports = {
  meta: {
    docs: {
      description: 'Forbid target="_blank" attribute without rel="noopener noreferrer"',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-no-target-blank')
    },
    schema: [{
      type: 'object',
      properties: {
        enforceDynamicLinks: {
          enum: ['always', 'never']
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const enforceDynamicLinks = configuration.enforceDynamicLinks || 'always';
    const components = linkComponentsUtil.getLinkComponents(context);

    return {
      JSXAttribute(node) {
        if (!components.has(node.parent.name.name) || !isTargetBlank(node) || hasSecureRel(node.parent)) {
          return;
        }

        const linkAttribute = components.get(node.parent.name.name);

        if (hasExternalLink(node.parent, linkAttribute) || (enforceDynamicLinks === 'always' && hasDynamicLink(node.parent, linkAttribute))) {
          context.report({
            node,
            message: 'Using target="_blank" without rel="noopener noreferrer" ' +
              'is a security risk: see https://mathiasbynens.github.io/rel-noopener'
          });
        }
      }
    };
  }
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Utility functions for propWrapperFunctions setting
 */



/** TODO: type {(string | { name: string, linkAttribute: string })[]} */
/** @type {any} */
const DEFAULT_LINK_COMPONENTS = ['a'];
const DEFAULT_LINK_ATTRIBUTE = 'href';

function getLinkComponents(context) {
  const settings = context.settings || {};
  const linkComponents = /** @type {typeof DEFAULT_LINK_COMPONENTS} */ (
    DEFAULT_LINK_COMPONENTS.concat(settings.linkComponents || [])
  );
  return new Map(linkComponents.map((value) => {
    if (typeof value === 'string') {
      return [value, DEFAULT_LINK_ATTRIBUTE];
    }
    return [value.name, value.linkAttribute];
  }));
}

module.exports = {
  getLinkComponents
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Limit to one expression per line in JSX
 * @author Mark Ivan Allen <Vydia.com>
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {
  allow: 'none'
};

module.exports = {
  meta: {
    docs: {
      description: 'Limit to one expression per line in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-one-expression-per-line')
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            enum: ['none', 'literal', 'single-child']
          }
        },
        default: optionDefaults,
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const options = Object.assign({}, optionDefaults, context.options[0]);

    function nodeKey(node) {
      return `${node.loc.start.line},${node.loc.start.column}`;
    }

    function nodeDescriptor(n) {
      return n.openingElement ? n.openingElement.name.name : context.getSourceCode().getText(n).replace(/\n/g, '');
    }

    function handleJSX(node) {
      const children = node.children;

      if (!children || !children.length) {
        return;
      }

      const openingElement = node.openingElement || node.openingFragment;
      const closingElement = node.closingElement || node.closingFragment;
      const openingElementStartLine = openingElement.loc.start.line;
      const openingElementEndLine = openingElement.loc.end.line;
      const closingElementStartLine = closingElement.loc.start.line;
      const closingElementEndLine = closingElement.loc.end.line;

      if (children.length === 1) {
        const child = children[0];
        if (
          openingElementStartLine === openingElementEndLine &&
          openingElementEndLine === closingElementStartLine &&
          closingElementStartLine === closingElementEndLine &&
          closingElementEndLine === child.loc.start.line &&
          child.loc.start.line === child.loc.end.line
        ) {
          if (
            options.allow === 'single-child' ||
            options.allow === 'literal' && (child.type === 'Literal' || child.type === 'JSXText')
          ) {
            return;
          }
        }
      }

      const childrenGroupedByLine = {};
      const fixDetailsByNode = {};

      children.forEach((child) => {
        let countNewLinesBeforeContent = 0;
        let countNewLinesAfterContent = 0;

        if (child.type === 'Literal' || child.type === 'JSXText') {
          if (/^\s*$/.test(child.raw)) {
            return;
          }

          countNewLinesBeforeContent = (child.raw.match(/^\s*\n/g) || []).length;
          countNewLinesAfterContent = (child.raw.match(/\n\s*$/g) || []).length;
        }

        const startLine = child.loc.start.line + countNewLinesBeforeContent;
        const endLine = child.loc.end.line - countNewLinesAfterContent;

        if (startLine === endLine) {
          if (!childrenGroupedByLine[startLine]) {
            childrenGroupedByLine[startLine] = [];
          }
          childrenGroupedByLine[startLine].push(child);
        } else {
          if (!childrenGroupedByLine[startLine]) {
            childrenGroupedByLine[startLine] = [];
          }
          childrenGroupedByLine[startLine].push(child);
          if (!childrenGroupedByLine[endLine]) {
            childrenGroupedByLine[endLine] = [];
          }
          childrenGroupedByLine[endLine].push(child);
        }
      });

      Object.keys(childrenGroupedByLine).forEach((_line) => {
        const line = parseInt(_line, 10);
        const firstIndex = 0;
        const lastIndex = childrenGroupedByLine[line].length - 1;

        childrenGroupedByLine[line].forEach((child, i) => {
          let prevChild;
          let nextChild;

          if (i === firstIndex) {
            if (line === openingElementEndLine) {
              prevChild = openingElement;
            }
          } else {
            prevChild = childrenGroupedByLine[line][i - 1];
          }

          if (i === lastIndex) {
            if (line === closingElementStartLine) {
              nextChild = closingElement;
            }
          } else {
            // We don't need to append a trailing because the next child will prepend a leading.
            // nextChild = childrenGroupedByLine[line][i + 1];
          }

          function spaceBetweenPrev() {
            return ((prevChild.type === 'Literal' || prevChild.type === 'JSXText') && / $/.test(prevChild.raw)) ||
              ((child.type === 'Literal' || child.type === 'JSXText') && /^ /.test(child.raw)) ||
              context.getSourceCode().isSpaceBetweenTokens(prevChild, child);
          }

          function spaceBetweenNext() {
            return ((nextChild.type === 'Literal' || nextChild.type === 'JSXText') && /^ /.test(nextChild.raw)) ||
              ((child.type === 'Literal' || child.type === 'JSXText') && / $/.test(child.raw)) ||
              context.getSourceCode().isSpaceBetweenTokens(child, nextChild);
          }

          if (!prevChild && !nextChild) {
            return;
          }

          const source = context.getSourceCode().getText(child);
          const leadingSpace = !!(prevChild && spaceBetweenPrev());
          const trailingSpace = !!(nextChild && spaceBetweenNext());
          const leadingNewLine = !!prevChild;
          const trailingNewLine = !!nextChild;

          const key = nodeKey(child);

          if (!fixDetailsByNode[key]) {
            fixDetailsByNode[key] = {
              node: child,
              source,
              descriptor: nodeDescriptor(child)
            };
          }

          if (leadingSpace) {
            fixDetailsByNode[key].leadingSpace = true;
          }
          if (leadingNewLine) {
            fixDetailsByNode[key].leadingNewLine = true;
          }
          if (trailingNewLine) {
            fixDetailsByNode[key].trailingNewLine = true;
          }
          if (trailingSpace) {
            fixDetailsByNode[key].trailingSpace = true;
          }
        });
      });

      Object.keys(fixDetailsByNode).forEach((key) => {
        const details = fixDetailsByNode[key];

        const nodeToReport = details.node;
        const descriptor = details.descriptor;
        const source = details.source.replace(/(^ +| +(?=\n)*$)/g, '');

        const leadingSpaceString = details.leadingSpace ? '\n{\' \'}' : '';
        const trailingSpaceString = details.trailingSpace ? '{\' \'}\n' : '';
        const leadingNewLineString = details.leadingNewLine ? '\n' : '';
        const trailingNewLineString = details.trailingNewLine ? '\n' : '';

        const replaceText = `${leadingSpaceString}${leadingNewLineString}${source}${trailingNewLineString}${trailingSpaceString}`;

        context.report({
          node: nodeToReport,
          message: `\`${descriptor}\` must be placed on a new line`,
          fix(fixer) {
            return fixer.replaceText(nodeToReport, replaceText);
          }
        });
      });
    }

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX
    };
  }
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow undeclared variables in JSX
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow undeclared variables in JSX',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('jsx-no-undef')
    },
    schema: [{
      type: 'object',
      properties: {
        allowGlobals: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const config = context.options[0] || {};
    const allowGlobals = config.allowGlobals || false;

    /**
     * Compare an identifier with the variables declared in the scope
     * @param {ASTNode} node - Identifier or JSXIdentifier node
     * @returns {void}
     */
    function checkIdentifierInJSX(node) {
      let scope = context.getScope();
      const sourceCode = context.getSourceCode();
      const sourceType = sourceCode.ast.sourceType;
      let variables = scope.variables;
      let scopeType = 'global';
      let i;
      let len;

      // Ignore 'this' keyword (also maked as JSXIdentifier when used in JSX)
      if (node.name === 'this') {
        return;
      }

      if (!allowGlobals && sourceType === 'module') {
        scopeType = 'module';
      }

      while (scope.type !== scopeType) {
        scope = scope.upper;
        variables = scope.variables.concat(variables);
      }
      if (scope.childScopes.length) {
        variables = scope.childScopes[0].variables.concat(variables);
        // Temporary fix for babel-eslint
        if (scope.childScopes[0].childScopes.length) {
          variables = scope.childScopes[0].childScopes[0].variables.concat(variables);
        }
      }

      for (i = 0, len = variables.length; i < len; i++) {
        if (variables[i].name === node.name) {
          return;
        }
      }

      context.report({
        node,
        message: `'${node.name}' is not defined.`
      });
    }

    return {
      JSXOpeningElement(node) {
        switch (node.name.type) {
          case 'JSXIdentifier':
            if (jsxUtil.isDOMComponent(node)) {
              return;
            }
            node = node.name;
            break;
          case 'JSXMemberExpression':
            node = node.name;
            do {
              node = node.object;
            } while (node && node.type !== 'JSXIdentifier');
            break;
          case 'JSXNamespacedName':
            node = node.name.namespace;
            break;
          default:
            break;
        }
        checkIdentifierInJSX(node);
      }
    };
  }
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce curly braces or disallow unnecessary curly brace in JSX
 * @author Jacky Ho
 * @author Simon Lydell
 */



const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const OPTION_ALWAYS = 'always';
const OPTION_NEVER = 'never';
const OPTION_IGNORE = 'ignore';

const OPTION_VALUES = [
  OPTION_ALWAYS,
  OPTION_NEVER,
  OPTION_IGNORE
];
const DEFAULT_CONFIG = {props: OPTION_NEVER, children: OPTION_NEVER};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow unnecessary JSX expressions when literals alone are sufficient ' +
          'or enfore JSX expressions on literals in JSX children or attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-curly-brace-presence')
    },
    fixable: 'code',

    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              props: {enum: OPTION_VALUES},
              children: {enum: OPTION_VALUES}
            },
            additionalProperties: false
          },
          {
            enum: OPTION_VALUES
          }
        ]
      }
    ]
  },

  create(context) {
    const ruleOptions = context.options[0];
    const userConfig = typeof ruleOptions === 'string' ?
      {props: ruleOptions, children: ruleOptions} :
      Object.assign({}, DEFAULT_CONFIG, ruleOptions);

    function containsLineTerminators(rawStringValue) {
      return /[\n\r\u2028\u2029]/.test(rawStringValue);
    }

    function containsBackslash(rawStringValue) {
      return rawStringValue.includes('\\');
    }

    function containsHTMLEntity(rawStringValue) {
      return /&[A-Za-z\d#]+;/.test(rawStringValue);
    }

    function containsDisallowedJSXTextChars(rawStringValue) {
      return /[{<>}]/.test(rawStringValue);
    }

    function containsQuoteCharacters(value) {
      return /['"]/.test(value);
    }

    function escapeDoubleQuotes(rawStringValue) {
      return rawStringValue.replace(/\\"/g, '"').replace(/"/g, '\\"');
    }

    function escapeBackslashes(rawStringValue) {
      return rawStringValue.replace(/\\/g, '\\\\');
    }

    function needToEscapeCharacterForJSX(raw) {
      return (
        containsBackslash(raw) ||
        containsHTMLEntity(raw) ||
        containsDisallowedJSXTextChars(raw)
      );
    }

    function containsWhitespaceExpression(child) {
      if (child.type === 'JSXExpressionContainer') {
        const value = child.expression.value;
        return value ? !(/\S/.test(value)) : false;
      }
      return false;
    }

    /**
     * Report and fix an unnecessary curly brace violation on a node
     * @param {ASTNode} JSXExpressionNode - The AST node with an unnecessary JSX expression
     */
    function reportUnnecessaryCurly(JSXExpressionNode) {
      context.report({
        node: JSXExpressionNode,
        message: 'Curly braces are unnecessary here.',
        fix(fixer) {
          const expression = JSXExpressionNode.expression;
          const expressionType = expression.type;
          const parentType = JSXExpressionNode.parent.type;

          let textToReplace;
          if (parentType === 'JSXAttribute') {
            textToReplace = `"${expressionType === 'TemplateLiteral' ?
              expression.quasis[0].value.raw :
              expression.raw.substring(1, expression.raw.length - 1)
            }"`;
          } else {
            textToReplace = expressionType === 'TemplateLiteral' ?
              expression.quasis[0].value.cooked : expression.value;
          }

          return fixer.replaceText(JSXExpressionNode, textToReplace);
        }
      });
    }

    function reportMissingCurly(literalNode) {
      context.report({
        node: literalNode,
        message: 'Need to wrap this literal in a JSX expression.',
        fix(fixer) {
          // If a HTML entity name is found, bail out because it can be fixed
          // by either using the real character or the unicode equivalent.
          // If it contains any line terminator character, bail out as well.
          if (
            containsHTMLEntity(literalNode.raw) ||
            containsLineTerminators(literalNode.raw)
          ) {
            return null;
          }

          const expression = literalNode.parent.type === 'JSXAttribute' ?
            `{"${escapeDoubleQuotes(escapeBackslashes(
              literalNode.raw.substring(1, literalNode.raw.length - 1)
            ))}"}` :
            `{${JSON.stringify(literalNode.value)}}`;

          return fixer.replaceText(literalNode, expression);
        }
      });
    }

    // Bail out if there is any character that needs to be escaped in JSX
    // because escaping decreases readiblity and the original code may be more
    // readible anyway or intentional for other specific reasons
    function lintUnnecessaryCurly(JSXExpressionNode) {
      const expression = JSXExpressionNode.expression;
      const expressionType = expression.type;

      if (
        (expressionType === 'Literal' || expressionType === 'JSXText') &&
          typeof expression.value === 'string' &&
          !needToEscapeCharacterForJSX(expression.raw) && (
          jsxUtil.isJSX(JSXExpressionNode.parent) ||
          !containsQuoteCharacters(expression.value)
        )
      ) {
        reportUnnecessaryCurly(JSXExpressionNode);
      } else if (
        expressionType === 'TemplateLiteral' &&
          expression.expressions.length === 0 &&
          expression.quasis[0].value.raw.indexOf('\n') === -1 &&
          !needToEscapeCharacterForJSX(expression.quasis[0].value.raw) && (
          jsxUtil.isJSX(JSXExpressionNode.parent) ||
          !containsQuoteCharacters(expression.quasis[0].value.cooked)
        )
      ) {
        reportUnnecessaryCurly(JSXExpressionNode);
      }
    }

    function areRuleConditionsSatisfied(parent, config, ruleCondition) {
      return (
        parent.type === 'JSXAttribute' &&
          typeof config.props === 'string' &&
          config.props === ruleCondition
      ) || (
        jsxUtil.isJSX(parent) &&
          typeof config.children === 'string' &&
          config.children === ruleCondition
      );
    }

    function shouldCheckForUnnecessaryCurly(parent, config) {
      // If there are more than one JSX child, there is no need to check for
      // unnecessary curly braces.
      if (jsxUtil.isJSX(parent) && parent.children.length !== 1) {
        return false;
      }

      if (
        parent.children &&
        parent.children.length === 1 &&
        containsWhitespaceExpression(parent.children[0])
      ) {
        return false;
      }

      return areRuleConditionsSatisfied(parent, config, OPTION_NEVER);
    }

    function shouldCheckForMissingCurly(parent, config) {
      if (
        parent.children &&
        parent.children.length === 1 &&
        containsWhitespaceExpression(parent.children[0])
      ) {
        return false;
      }

      return areRuleConditionsSatisfied(parent, config, OPTION_ALWAYS);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXExpressionContainer: (node) => {
        if (shouldCheckForUnnecessaryCurly(node.parent, userConfig)) {
          lintUnnecessaryCurly(node);
        }
      },

      'Literal, JSXText': (node) => {
        if (shouldCheckForMissingCurly(node.parent, userConfig)) {
          reportMissingCurly(node);
        }
      }
    };
  }
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce PascalCase for user-defined JSX components
 * @author Jake Marsh
 */



const elementType = __webpack_require__(87);
const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const PASCAL_CASE_REGEX = /^([A-Z0-9]|[A-Z0-9]+[a-z0-9]+(?:[A-Z0-9]+[a-z0-9]*)*)$/;
const ALL_CAPS_TAG_REGEX = /^[A-Z0-9]+$/;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce PascalCase for user-defined JSX components',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-pascal-case')
    },

    schema: [{
      type: 'object',
      properties: {
        allowAllCaps: {
          type: 'boolean'
        },
        ignore: {
          type: 'array'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const allowAllCaps = configuration.allowAllCaps || false;
    const ignore = configuration.ignore || [];

    return {
      JSXOpeningElement(node) {
        let name = elementType(node);

        // Get namespace if the type is JSXNamespacedName or JSXMemberExpression
        if (name.indexOf(':') > -1) {
          name = name.substring(0, name.indexOf(':'));
        } else if (name.indexOf('.') > -1) {
          name = name.substring(0, name.indexOf('.'));
        }

        const isPascalCase = PASCAL_CASE_REGEX.test(name);
        const isCompatTag = jsxUtil.isDOMComponent(node);
        const isAllowedAllCaps = allowAllCaps && ALL_CAPS_TAG_REGEX.test(name);
        const isIgnored = ignore.indexOf(name) !== -1;

        if (!isPascalCase && !isCompatTag && !isAllowedAllCaps && !isIgnored) {
          context.report({
            node,
            message: `Imported JSX component ${name} must be in PascalCase`
          });
        }
      }
    };
  }
};


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce shorthand or standard form for React fragments.
 * @author Alex Zherdev
 */



const elementType = __webpack_require__(87);
const pragmaUtil = __webpack_require__(66);
const variableUtil = __webpack_require__(65);
const versionUtil = __webpack_require__(71);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function replaceNode(source, node, text) {
  return `${source.slice(0, node.range[0])}${text}${source.slice(node.range[1])}`;
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce shorthand or standard form for React fragments',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-fragments')
    },
    fixable: 'code',

    schema: [{
      enum: ['syntax', 'element']
    }]
  },

  create(context) {
    const configuration = context.options[0] || 'syntax';
    const reactPragma = pragmaUtil.getFromContext(context);
    const fragmentPragma = pragmaUtil.getFragmentFromContext(context);
    const openFragShort = '<>';
    const closeFragShort = '</>';
    const openFragLong = `<${reactPragma}.${fragmentPragma}>`;
    const closeFragLong = `</${reactPragma}.${fragmentPragma}>`;

    function reportOnReactVersion(node) {
      if (!versionUtil.testReactVersion(context, '16.2.0')) {
        context.report({
          node,
          message: 'Fragments are only supported starting from React v16.2. ' +
            'Please disable the `react/jsx-fragments` rule in ESLint settings or upgrade your version of React.'
        });
        return true;
      }

      return false;
    }

    function getFixerToLong(jsxFragment) {
      const sourceCode = context.getSourceCode();
      return function (fixer) {
        let source = sourceCode.getText();
        source = replaceNode(source, jsxFragment.closingFragment, closeFragLong);
        source = replaceNode(source, jsxFragment.openingFragment, openFragLong);
        const lengthDiff = openFragLong.length - sourceCode.getText(jsxFragment.openingFragment).length +
          closeFragLong.length - sourceCode.getText(jsxFragment.closingFragment).length;
        const range = jsxFragment.range;
        return fixer.replaceTextRange(range, source.slice(range[0], range[1] + lengthDiff));
      };
    }

    function getFixerToShort(jsxElement) {
      const sourceCode = context.getSourceCode();
      return function (fixer) {
        let source = sourceCode.getText();
        let lengthDiff;
        if (jsxElement.closingElement) {
          source = replaceNode(source, jsxElement.closingElement, closeFragShort);
          source = replaceNode(source, jsxElement.openingElement, openFragShort);
          lengthDiff = sourceCode.getText(jsxElement.openingElement).length - openFragShort.length +
            sourceCode.getText(jsxElement.closingElement).length - closeFragShort.length;
        } else {
          source = replaceNode(source, jsxElement.openingElement, `${openFragShort}${closeFragShort}`);
          lengthDiff = sourceCode.getText(jsxElement.openingElement).length - openFragShort.length -
            closeFragShort.length;
        }

        const range = jsxElement.range;
        return fixer.replaceTextRange(range, source.slice(range[0], range[1] - lengthDiff));
      };
    }

    function refersToReactFragment(name) {
      const variableInit = variableUtil.findVariableByName(context, name);
      if (!variableInit) {
        return false;
      }

      // const { Fragment } = React;
      if (variableInit.type === 'Identifier' && variableInit.name === reactPragma) {
        return true;
      }

      // const Fragment = React.Fragment;
      if (
        variableInit.type === 'MemberExpression' &&
        variableInit.object.type === 'Identifier' &&
        variableInit.object.name === reactPragma &&
        variableInit.property.type === 'Identifier' &&
        variableInit.property.name === fragmentPragma
      ) {
        return true;
      }

      // const { Fragment } = require('react');
      if (
        variableInit.callee &&
        variableInit.callee.name === 'require' &&
        variableInit.arguments &&
        variableInit.arguments[0] &&
        variableInit.arguments[0].value === 'react'
      ) {
        return true;
      }

      return false;
    }

    const jsxElements = [];
    const fragmentNames = new Set([`${reactPragma}.${fragmentPragma}`]);

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXElement(node) {
        jsxElements.push(node);
      },

      JSXFragment(node) {
        if (reportOnReactVersion(node)) {
          return;
        }

        if (configuration === 'element') {
          context.report({
            node,
            message: `Prefer ${reactPragma}.${fragmentPragma} over fragment shorthand`,
            fix: getFixerToLong(node)
          });
        }
      },

      ImportDeclaration(node) {
        if (node.source && node.source.value === 'react') {
          node.specifiers.forEach((spec) => {
            if (spec.imported && spec.imported.name === fragmentPragma) {
              if (spec.local) {
                fragmentNames.add(spec.local.name);
              }
            }
          });
        }
      },

      'Program:exit': function () {
        jsxElements.forEach((node) => {
          const openingEl = node.openingElement;
          const elName = elementType(openingEl);

          if (fragmentNames.has(elName) || refersToReactFragment(elName)) {
            if (reportOnReactVersion(node)) {
              return;
            }

            const attrs = openingEl.attributes;
            if (configuration === 'syntax' && !(attrs && attrs.length > 0)) {
              context.report({
                node,
                message: `Prefer fragment shorthand over ${reactPragma}.${fragmentPragma}`,
                fix: getFixerToShort(node)
              });
            }
          }
        });
      }
    };
  }
};


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Disallow multiple spaces between inline JSX props
 * @author Adrian Moennich
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Disallow multiple spaces between inline JSX props',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-props-no-multi-spaces')
    },
    fixable: 'code',
    schema: []
  },

  create(context) {
    function getPropName(propNode) {
      switch (propNode.type) {
        case 'JSXSpreadAttribute':
          return context.getSourceCode().getText(propNode.argument);
        case 'JSXIdentifier':
          return propNode.name;
        case 'JSXMemberExpression':
          return `${getPropName(propNode.object)}.${propNode.property.name}`;
        default:
          return propNode.name.name;
      }
    }

    function checkSpacing(prev, node) {
      if (prev.loc.end.line !== node.loc.end.line) {
        return;
      }
      const between = context.getSourceCode().text.slice(prev.range[1], node.range[0]);
      if (between !== ' ') {
        context.report({
          node,
          message: `Expected only one space between "${getPropName(prev)}" and "${getPropName(node)}"`,
          fix(fixer) {
            return fixer.replaceTextRange([prev.range[1], node.range[0]], ' ');
          }
        });
      }
    }

    function containsGenericType(node) {
      const containsTypeParams = typeof node.typeParameters !== 'undefined';
      return containsTypeParams && node.typeParameters.type === 'TSTypeParameterInstantiation';
    }

    function getGenericNode(node) {
      const name = node.name;
      if (containsGenericType(node)) {
        const type = node.typeParameters;

        return Object.assign(
          {},
          node,
          {
            range: [
              name.range[0],
              type.range[1]
            ]
          }
        );
      }

      return name;
    }

    return {
      JSXOpeningElement(node) {
        node.attributes.reduce((prev, prop) => {
          checkSpacing(prev, prop);
          return prop;
        }, getGenericNode(node));
      }
    };
  }
};


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent JSX prop spreading
 * @author Ashish Gambhir
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const OPTIONS = {ignore: 'ignore', enforce: 'enforce'};
const DEFAULTS = {html: OPTIONS.enforce, custom: OPTIONS.enforce, exceptions: []};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent JSX prop spreading',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('jsx-props-no-spreading')
    },
    schema: [{
      allOf: [{
        type: 'object',
        properties: {
          html: {
            enum: [OPTIONS.enforce, OPTIONS.ignore]
          },
          custom: {
            enum: [OPTIONS.enforce, OPTIONS.ignore]
          },
          exceptions: {
            type: 'array',
            items: {
              type: 'string',
              uniqueItems: true
            }
          }
        }
      }, {
        not: {
          type: 'object',
          required: ['html', 'custom'],
          properties: {
            html: {
              enum: [OPTIONS.ignore]
            },
            custom: {
              enum: [OPTIONS.ignore]
            },
            exceptions: {
              type: 'array',
              minItems: 0,
              maxItems: 0
            }
          }
        }
      }]
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const ignoreHtmlTags = (configuration.html || DEFAULTS.html) === OPTIONS.ignore;
    const ignoreCustomTags = (configuration.custom || DEFAULTS.custom) === OPTIONS.ignore;
    const exceptions = configuration.exceptions || DEFAULTS.exceptions;
    const isException = (tag, allExceptions) => allExceptions.indexOf(tag) !== -1;
    return {
      JSXSpreadAttribute(node) {
        const tagName = node.parent.name.name;
        const isHTMLTag = tagName && tagName[0] !== tagName[0].toUpperCase();
        const isCustomTag = tagName && tagName[0] === tagName[0].toUpperCase();
        if (isHTMLTag &&
          ((ignoreHtmlTags && !isException(tagName, exceptions)) ||
          (!ignoreHtmlTags && isException(tagName, exceptions)))) {
          return;
        }
        if (isCustomTag &&
          ((ignoreCustomTags && !isException(tagName, exceptions)) ||
          (!ignoreCustomTags && isException(tagName, exceptions)))) {
          return;
        }
        context.report({
          node,
          message: 'Prop spreading is forbidden'
        });
      }
    };
  }
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce default props alphabetical sorting
 * @author Vladimir Kattsov
 */



const variableUtil = __webpack_require__(65);
const docsUrl = __webpack_require__(124);
const propWrapperUtil = __webpack_require__(85);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce default props alphabetical sorting',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-sort-default-props')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreCase: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const ignoreCase = configuration.ignoreCase || false;

    /**
     * Get properties name
     * @param {Object} node - Property.
     * @returns {String} Property name.
     */
    function getPropertyName(node) {
      if (node.key || ['MethodDefinition', 'Property'].indexOf(node.type) !== -1) {
        return node.key.name;
      }
      if (node.type === 'MemberExpression') {
        return node.property.name;
      // Special case for class properties
      // (babel-eslint@5 does not expose property name so we have to rely on tokens)
      }
      if (node.type === 'ClassProperty') {
        const tokens = context.getFirstTokens(node, 2);
        return tokens[1] && tokens[1].type === 'Identifier' ? tokens[1].value : tokens[0].value;
      }
      return '';
    }

    /**
     * Checks if the Identifier node passed in looks like a defaultProps declaration.
     * @param   {ASTNode}  node The node to check. Must be an Identifier node.
     * @returns {Boolean}       `true` if the node is a defaultProps declaration, `false` if not
     */
    function isDefaultPropsDeclaration(node) {
      const propName = getPropertyName(node);
      return (propName === 'defaultProps' || propName === 'getDefaultProps');
    }

    function getKey(node) {
      return context.getSourceCode().getText(node.key || node.argument);
    }

    /**
     * Find a variable by name in the current scope.
     * @param  {string} name Name of the variable to look for.
     * @returns {ASTNode|null} Return null if the variable could not be found, ASTNode otherwise.
     */
    function findVariableByName(name) {
      const variable = variableUtil.variablesInScope(context).find(item => item.name === name);

      if (!variable || !variable.defs[0] || !variable.defs[0].node) {
        return null;
      }

      if (variable.defs[0].node.type === 'TypeAlias') {
        return variable.defs[0].node.right;
      }

      return variable.defs[0].node.init;
    }

    /**
     * Checks if defaultProps declarations are sorted
     * @param {Array} declarations The array of AST nodes being checked.
     * @returns {void}
     */
    function checkSorted(declarations) {
      declarations.reduce((prev, curr, idx, decls) => {
        if (/Spread(?:Property|Element)$/.test(curr.type)) {
          return decls[idx + 1];
        }

        let prevPropName = getKey(prev);
        let currentPropName = getKey(curr);

        if (ignoreCase) {
          prevPropName = prevPropName.toLowerCase();
          currentPropName = currentPropName.toLowerCase();
        }

        if (currentPropName < prevPropName) {
          context.report({
            node: curr,
            message: 'Default prop types declarations should be sorted alphabetically'
          });

          return prev;
        }

        return curr;
      }, declarations[0]);
    }

    function checkNode(node) {
      switch (node && node.type) {
        case 'ObjectExpression':
          checkSorted(node.properties);
          break;
        case 'Identifier': {
          const propTypesObject = findVariableByName(node.name);
          if (propTypesObject && propTypesObject.properties) {
            checkSorted(propTypesObject.properties);
          }
          break;
        }
        case 'CallExpression': {
          const innerNode = node.arguments && node.arguments[0];
          if (propWrapperUtil.isPropWrapperFunction(context, node.callee.name) && innerNode) {
            checkNode(innerNode);
          }
          break;
        }
        default:
          break;
      }
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      ClassProperty(node) {
        if (!isDefaultPropsDeclaration(node)) {
          return;
        }

        checkNode(node.value);
      },

      MemberExpression(node) {
        if (!isDefaultPropsDeclaration(node)) {
          return;
        }

        checkNode(node.parent.right);
      }
    };
  }
};


/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce props alphabetical sorting
 * @author Ilya Volodin, Yannick Croissant
 */



const propName = __webpack_require__(153);
const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function isCallbackPropName(name) {
  return /^on[A-Z]/.test(name);
}

const RESERVED_PROPS_LIST = [
  'children',
  'dangerouslySetInnerHTML',
  'key',
  'ref'
];

function isReservedPropName(name, list) {
  return list.indexOf(name) >= 0;
}

function contextCompare(a, b, options) {
  let aProp = propName(a);
  let bProp = propName(b);

  if (options.reservedFirst) {
    const aIsReserved = isReservedPropName(aProp, options.reservedList);
    const bIsReserved = isReservedPropName(bProp, options.reservedList);
    if (aIsReserved && !bIsReserved) {
      return -1;
    }
    if (!aIsReserved && bIsReserved) {
      return 1;
    }
  }

  if (options.callbacksLast) {
    const aIsCallback = isCallbackPropName(aProp);
    const bIsCallback = isCallbackPropName(bProp);
    if (aIsCallback && !bIsCallback) {
      return 1;
    }
    if (!aIsCallback && bIsCallback) {
      return -1;
    }
  }

  if (options.shorthandFirst || options.shorthandLast) {
    const shorthandSign = options.shorthandFirst ? -1 : 1;
    if (!a.value && b.value) {
      return shorthandSign;
    }
    if (a.value && !b.value) {
      return -shorthandSign;
    }
  }

  if (options.noSortAlphabetically) {
    return 0;
  }

  if (options.ignoreCase) {
    aProp = aProp.toLowerCase();
    bProp = bProp.toLowerCase();
  }
  return aProp.localeCompare(bProp);
}

/**
 * Create an array of arrays where each subarray is composed of attributes
 * that are considered sortable.
 * @param {Array<JSXSpreadAttribute|JSXAttribute>} attributes
 * @return {Array<Array<JSXAttribute>>}
 */
function getGroupsOfSortableAttributes(attributes) {
  const sortableAttributeGroups = [];
  let groupCount = 0;
  for (let i = 0; i < attributes.length; i++) {
    const lastAttr = attributes[i - 1];
    // If we have no groups or if the last attribute was JSXSpreadAttribute
    // then we start a new group. Append attributes to the group until we
    // come across another JSXSpreadAttribute or exhaust the array.
    if (
      !lastAttr ||
      (lastAttr.type === 'JSXSpreadAttribute' &&
        attributes[i].type !== 'JSXSpreadAttribute')
    ) {
      groupCount++;
      sortableAttributeGroups[groupCount - 1] = [];
    }
    if (attributes[i].type !== 'JSXSpreadAttribute') {
      sortableAttributeGroups[groupCount - 1].push(attributes[i]);
    }
  }
  return sortableAttributeGroups;
}

const generateFixerFunction = (node, context, reservedList) => {
  const sourceCode = context.getSourceCode();
  const attributes = node.attributes.slice(0);
  const configuration = context.options[0] || {};
  const ignoreCase = configuration.ignoreCase || false;
  const callbacksLast = configuration.callbacksLast || false;
  const shorthandFirst = configuration.shorthandFirst || false;
  const shorthandLast = configuration.shorthandLast || false;
  const noSortAlphabetically = configuration.noSortAlphabetically || false;
  const reservedFirst = configuration.reservedFirst || false;

  // Sort props according to the context. Only supports ignoreCase.
  // Since we cannot safely move JSXSpreadAttribute (due to potential variable overrides),
  // we only consider groups of sortable attributes.
  const options = {
    ignoreCase,
    callbacksLast,
    shorthandFirst,
    shorthandLast,
    noSortAlphabetically,
    reservedFirst,
    reservedList
  };
  const sortableAttributeGroups = getGroupsOfSortableAttributes(attributes);
  const sortedAttributeGroups = sortableAttributeGroups
    .slice(0)
    .map(group => group.slice(0).sort((a, b) => contextCompare(a, b, options)));

  return function (fixer) {
    const fixers = [];
    let source = sourceCode.getText();

    // Replace each unsorted attribute with the sorted one.
    sortableAttributeGroups.forEach((sortableGroup, ii) => {
      sortableGroup.forEach((attr, jj) => {
        const sortedAttr = sortedAttributeGroups[ii][jj];
        const sortedAttrText = sourceCode.getText(sortedAttr);
        fixers.push({
          range: [attr.range[0], attr.range[1]],
          text: sortedAttrText
        });
      });
    });

    fixers.sort((a, b) => b.range[0] - a.range[0]);

    const rangeStart = fixers[fixers.length - 1].range[0];
    const rangeEnd = fixers[0].range[1];

    fixers.forEach((fix) => {
      source = `${source.substr(0, fix.range[0])}${fix.text}${source.substr(fix.range[1])}`;
    });

    return fixer.replaceTextRange([rangeStart, rangeEnd], source.substr(rangeStart, rangeEnd - rangeStart));
  };
};

/**
 * Checks if the `reservedFirst` option is valid
 * @param {Object} context The context of the rule
 * @param {Boolean|Array<String>} reservedFirst The `reservedFirst` option
 * @return {Function|undefined} If an error is detected, a function to generate the error message, otherwise, `undefined`
 */
// eslint-disable-next-line consistent-return
function validateReservedFirstConfig(context, reservedFirst) {
  if (reservedFirst) {
    if (Array.isArray(reservedFirst)) {
      // Only allow a subset of reserved words in customized lists
      const nonReservedWords = reservedFirst.filter(word => !isReservedPropName(
        word,
        RESERVED_PROPS_LIST
      ));

      if (reservedFirst.length === 0) {
        return function (decl) {
          context.report({
            node: decl,
            message: 'A customized reserved first list must not be empty'
          });
        };
      }
      if (nonReservedWords.length > 0) {
        return function (decl) {
          context.report({
            node: decl,
            message: 'A customized reserved first list must only contain a subset of React reserved props.' +
              ' Remove: {{ nonReservedWords }}',
            data: {
              nonReservedWords: nonReservedWords.toString()
            }
          });
        };
      }
    }
  }
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce props alphabetical sorting',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-sort-props')
    },
    fixable: 'code',
    schema: [{
      type: 'object',
      properties: {
        // Whether callbacks (prefixed with "on") should be listed at the very end,
        // after all other props. Supersedes shorthandLast.
        callbacksLast: {
          type: 'boolean'
        },
        // Whether shorthand properties (without a value) should be listed first
        shorthandFirst: {
          type: 'boolean'
        },
        // Whether shorthand properties (without a value) should be listed last
        shorthandLast: {
          type: 'boolean'
        },
        ignoreCase: {
          type: 'boolean'
        },
        // Whether alphabetical sorting should be enforced
        noSortAlphabetically: {
          type: 'boolean'
        },
        reservedFirst: {
          type: ['array', 'boolean']
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const ignoreCase = configuration.ignoreCase || false;
    const callbacksLast = configuration.callbacksLast || false;
    const shorthandFirst = configuration.shorthandFirst || false;
    const shorthandLast = configuration.shorthandLast || false;
    const noSortAlphabetically = configuration.noSortAlphabetically || false;
    const reservedFirst = configuration.reservedFirst || false;
    const reservedFirstError = validateReservedFirstConfig(context, reservedFirst);
    let reservedList = Array.isArray(reservedFirst) ? reservedFirst : RESERVED_PROPS_LIST;

    return {
      JSXOpeningElement(node) {
        // `dangerouslySetInnerHTML` is only "reserved" on DOM components
        if (reservedFirst && !jsxUtil.isDOMComponent(node)) {
          reservedList = reservedList.filter(prop => prop !== 'dangerouslySetInnerHTML');
        }

        node.attributes.reduce((memo, decl, idx, attrs) => {
          if (decl.type === 'JSXSpreadAttribute') {
            return attrs[idx + 1];
          }

          let previousPropName = propName(memo);
          let currentPropName = propName(decl);
          const previousValue = memo.value;
          const currentValue = decl.value;
          const previousIsCallback = isCallbackPropName(previousPropName);
          const currentIsCallback = isCallbackPropName(currentPropName);

          if (ignoreCase) {
            previousPropName = previousPropName.toLowerCase();
            currentPropName = currentPropName.toLowerCase();
          }

          if (reservedFirst) {
            if (reservedFirstError) {
              reservedFirstError(decl);
              return memo;
            }

            const previousIsReserved = isReservedPropName(previousPropName, reservedList);
            const currentIsReserved = isReservedPropName(currentPropName, reservedList);

            if (previousIsReserved && !currentIsReserved) {
              return decl;
            }
            if (!previousIsReserved && currentIsReserved) {
              context.report({
                node: decl.name,
                message: 'Reserved props must be listed before all other props',
                fix: generateFixerFunction(node, context, reservedList)
              });
              return memo;
            }
          }

          if (callbacksLast) {
            if (!previousIsCallback && currentIsCallback) {
              // Entering the callback prop section
              return decl;
            }
            if (previousIsCallback && !currentIsCallback) {
              // Encountered a non-callback prop after a callback prop
              context.report({
                node: memo.name,
                message: 'Callbacks must be listed after all other props',
                fix: generateFixerFunction(node, context, reservedList)
              });
              return memo;
            }
          }

          if (shorthandFirst) {
            if (currentValue && !previousValue) {
              return decl;
            }
            if (!currentValue && previousValue) {
              context.report({
                node: memo.name,
                message: 'Shorthand props must be listed before all other props',
                fix: generateFixerFunction(node, context, reservedList)
              });
              return memo;
            }
          }

          if (shorthandLast) {
            if (!currentValue && previousValue) {
              return decl;
            }
            if (currentValue && !previousValue) {
              context.report({
                node: memo.name,
                message: 'Shorthand props must be listed after all other props',
                fix: generateFixerFunction(node, context, reservedList)
              });
              return memo;
            }
          }

          if (!noSortAlphabetically && currentPropName < previousPropName) {
            context.report({
              node: decl.name,
              message: 'Props should be sorted alphabetically',
              fix: generateFixerFunction(node, context, reservedList)
            });
            return memo;
          }

          return decl;
        }, node.attributes[0]);
      }
    };
  }
};


/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validate spacing before closing bracket in JSX.
 * @author ryym
 * @deprecated
 */



const getTokenBeforeClosingBracket = __webpack_require__(169);
const docsUrl = __webpack_require__(124);
const log = __webpack_require__(170);

let isWarnedForDeprecation = false;

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    deprecated: true,
    docs: {
      description: 'Validate spacing before closing bracket in JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-space-before-closing')
    },
    fixable: 'code',

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create(context) {
    const configuration = context.options[0] || 'always';

    const NEVER_MESSAGE = 'A space is forbidden before closing bracket';
    const ALWAYS_MESSAGE = 'A space is required before closing bracket';

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXOpeningElement(node) {
        if (!node.selfClosing) {
          return;
        }

        const sourceCode = context.getSourceCode();

        const leftToken = getTokenBeforeClosingBracket(node);
        const closingSlash = sourceCode.getTokenAfter(leftToken);

        if (leftToken.loc.end.line !== closingSlash.loc.start.line) {
          return;
        }

        if (configuration === 'always' && !sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
          context.report({
            loc: closingSlash.loc.start,
            message: ALWAYS_MESSAGE,
            fix(fixer) {
              return fixer.insertTextBefore(closingSlash, ' ');
            }
          });
        } else if (configuration === 'never' && sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
          context.report({
            loc: closingSlash.loc.start,
            message: NEVER_MESSAGE,
            fix(fixer) {
              const previousToken = sourceCode.getTokenBefore(closingSlash);
              return fixer.removeRange([previousToken.range[1], closingSlash.range[0]]);
            }
          });
        }
      },

      Program() {
        if (isWarnedForDeprecation) {
          return;
        }

        log('The react/jsx-space-before-closing rule is deprecated. ' +
            'Please use the react/jsx-tag-spacing rule with the ' +
            '"beforeSelfClosing" option instead.');
        isWarnedForDeprecation = true;
      }
    };
  }
};


/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Find the token before the closing bracket.
 * @param {ASTNode} node - The JSX element node.
 * @returns {Token} The token before the closing bracket.
 */
function getTokenBeforeClosingBracket(node) {
  const attributes = node.attributes;
  if (attributes.length === 0) {
    return node.name;
  }
  return attributes[attributes.length - 1];
}

module.exports = getTokenBeforeClosingBracket;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Logs out a message if there is no format option set.
 * @param {String} message - Message to log.
 */
function log(message) {
  if (!/=-(f|-format)=/.test(process.argv.join('='))) {
    // eslint-disable-next-line no-console
    console.log(message);
  }
}

module.exports = log;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Validates whitespace in and around the JSX opening and closing brackets
 * @author Diogo Franco (Kovensky)
 */



const getTokenBeforeClosingBracket = __webpack_require__(169);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Validators
// ------------------------------------------------------------------------------

function validateClosingSlash(context, node, option) {
  const sourceCode = context.getSourceCode();

  const SELF_CLOSING_NEVER_MESSAGE = 'Whitespace is forbidden between `/` and `>`; write `/>`';
  const SELF_CLOSING_ALWAYS_MESSAGE = 'Whitespace is required between `/` and `>`; write `/ >`';
  const NEVER_MESSAGE = 'Whitespace is forbidden between `<` and `/`; write `</`';
  const ALWAYS_MESSAGE = 'Whitespace is required between `<` and `/`; write `< /`';

  let adjacent;

  if (node.selfClosing) {
    const lastTokens = sourceCode.getLastTokens(node, 2);

    adjacent = !sourceCode.isSpaceBetweenTokens(lastTokens[0], lastTokens[1]);

    if (option === 'never') {
      if (!adjacent) {
        context.report({
          node,
          loc: {
            start: lastTokens[0].loc.start,
            end: lastTokens[1].loc.end
          },
          message: SELF_CLOSING_NEVER_MESSAGE,
          fix(fixer) {
            return fixer.removeRange([lastTokens[0].range[1], lastTokens[1].range[0]]);
          }
        });
      }
    } else if (option === 'always' && adjacent) {
      context.report({
        node,
        loc: {
          start: lastTokens[0].loc.start,
          end: lastTokens[1].loc.end
        },
        message: SELF_CLOSING_ALWAYS_MESSAGE,
        fix(fixer) {
          return fixer.insertTextBefore(lastTokens[1], ' ');
        }
      });
    }
  } else {
    const firstTokens = sourceCode.getFirstTokens(node, 2);

    adjacent = !sourceCode.isSpaceBetweenTokens(firstTokens[0], firstTokens[1]);

    if (option === 'never') {
      if (!adjacent) {
        context.report({
          node,
          loc: {
            start: firstTokens[0].loc.start,
            end: firstTokens[1].loc.end
          },
          message: NEVER_MESSAGE,
          fix(fixer) {
            return fixer.removeRange([firstTokens[0].range[1], firstTokens[1].range[0]]);
          }
        });
      }
    } else if (option === 'always' && adjacent) {
      context.report({
        node,
        loc: {
          start: firstTokens[0].loc.start,
          end: firstTokens[1].loc.end
        },
        message: ALWAYS_MESSAGE,
        fix(fixer) {
          return fixer.insertTextBefore(firstTokens[1], ' ');
        }
      });
    }
  }
}

function validateBeforeSelfClosing(context, node, option) {
  const sourceCode = context.getSourceCode();

  const NEVER_MESSAGE = 'A space is forbidden before closing bracket';
  const ALWAYS_MESSAGE = 'A space is required before closing bracket';

  const leftToken = getTokenBeforeClosingBracket(node);
  const closingSlash = sourceCode.getTokenAfter(leftToken);

  if (leftToken.loc.end.line !== closingSlash.loc.start.line) {
    return;
  }

  if (option === 'always' && !sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
    context.report({
      node,
      loc: closingSlash.loc.start,
      message: ALWAYS_MESSAGE,
      fix(fixer) {
        return fixer.insertTextBefore(closingSlash, ' ');
      }
    });
  } else if (option === 'never' && sourceCode.isSpaceBetweenTokens(leftToken, closingSlash)) {
    context.report({
      node,
      loc: closingSlash.loc.start,
      message: NEVER_MESSAGE,
      fix(fixer) {
        const previousToken = sourceCode.getTokenBefore(closingSlash);
        return fixer.removeRange([previousToken.range[1], closingSlash.range[0]]);
      }
    });
  }
}

function validateAfterOpening(context, node, option) {
  const sourceCode = context.getSourceCode();

  const NEVER_MESSAGE = 'A space is forbidden after opening bracket';
  const ALWAYS_MESSAGE = 'A space is required after opening bracket';

  const openingToken = sourceCode.getTokenBefore(node.name);

  if (option === 'allow-multiline') {
    if (openingToken.loc.start.line !== node.name.loc.start.line) {
      return;
    }
  }

  const adjacent = !sourceCode.isSpaceBetweenTokens(openingToken, node.name);

  if (option === 'never' || option === 'allow-multiline') {
    if (!adjacent) {
      context.report({
        node,
        loc: {
          start: openingToken.loc.start,
          end: node.name.loc.start
        },
        message: NEVER_MESSAGE,
        fix(fixer) {
          return fixer.removeRange([openingToken.range[1], node.name.range[0]]);
        }
      });
    }
  } else if (option === 'always' && adjacent) {
    context.report({
      node,
      loc: {
        start: openingToken.loc.start,
        end: node.name.loc.start
      },
      message: ALWAYS_MESSAGE,
      fix(fixer) {
        return fixer.insertTextBefore(node.name, ' ');
      }
    });
  }
}

function validateBeforeClosing(context, node, option) {
  // Don't enforce this rule for self closing tags
  if (!node.selfClosing) {
    const sourceCode = context.getSourceCode();

    const NEVER_MESSAGE = 'A space is forbidden before closing bracket';
    const ALWAYS_MESSAGE = 'Whitespace is required before closing bracket';

    const lastTokens = sourceCode.getLastTokens(node, 2);
    const closingToken = lastTokens[1];
    const leftToken = lastTokens[0];

    if (leftToken.loc.start.line !== closingToken.loc.start.line) {
      return;
    }

    const adjacent = !sourceCode.isSpaceBetweenTokens(leftToken, closingToken);

    if (option === 'never' && !adjacent) {
      context.report({
        node,
        loc: {
          start: leftToken.loc.end,
          end: closingToken.loc.start
        },
        message: NEVER_MESSAGE,
        fix(fixer) {
          return fixer.removeRange([leftToken.range[1], closingToken.range[0]]);
        }
      });
    } else if (option === 'always' && adjacent) {
      context.report({
        node,
        loc: {
          start: leftToken.loc.end,
          end: closingToken.loc.start
        },
        message: ALWAYS_MESSAGE,
        fix(fixer) {
          return fixer.insertTextBefore(closingToken, ' ');
        }
      });
    }
  }
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {
  closingSlash: 'never',
  beforeSelfClosing: 'always',
  afterOpening: 'never',
  beforeClosing: 'allow'
};

module.exports = {
  meta: {
    docs: {
      description: 'Validate whitespace in and around the JSX opening and closing brackets',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-tag-spacing')
    },
    fixable: 'whitespace',
    schema: [
      {
        type: 'object',
        properties: {
          closingSlash: {
            enum: ['always', 'never', 'allow']
          },
          beforeSelfClosing: {
            enum: ['always', 'never', 'allow']
          },
          afterOpening: {
            enum: ['always', 'allow-multiline', 'never', 'allow']
          },
          beforeClosing: {
            enum: ['always', 'never', 'allow']
          }
        },
        default: optionDefaults,
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const options = Object.assign({}, optionDefaults, context.options[0]);

    return {
      JSXOpeningElement(node) {
        if (options.closingSlash !== 'allow' && node.selfClosing) {
          validateClosingSlash(context, node, options.closingSlash);
        }
        if (options.afterOpening !== 'allow') {
          validateAfterOpening(context, node, options.afterOpening);
        }
        if (options.beforeSelfClosing !== 'allow' && node.selfClosing) {
          validateBeforeSelfClosing(context, node, options.beforeSelfClosing);
        }
        if (options.beforeClosing !== 'allow') {
          validateBeforeClosing(context, node, options.beforeClosing);
        }
      },
      JSXClosingElement(node) {
        if (options.afterOpening !== 'allow') {
          validateAfterOpening(context, node, options.afterOpening);
        }
        if (options.closingSlash !== 'allow') {
          validateClosingSlash(context, node, options.closingSlash);
        }
        if (options.beforeClosing !== 'allow') {
          validateBeforeClosing(context, node, options.beforeClosing);
        }
      }
    };
  }
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent React to be marked as unused
 * @author Glen Mailer
 */



const pragmaUtil = __webpack_require__(66);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent React to be marked as unused',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-uses-react')
    },
    schema: []
  },

  create(context) {
    const pragma = pragmaUtil.getFromContext(context);

    function handleOpeningElement() {
      context.markVariableAsUsed(pragma);
    }
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXOpeningElement: handleOpeningElement,
      JSXOpeningFragment: handleOpeningElement
    };
  }
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent variables used in JSX to be marked as unused
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent variables used in JSX to be marked as unused',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-uses-vars')
    },
    schema: []
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        let name;
        if (node.name.namespace && node.name.namespace.name) {
          // <Foo:Bar>
          name = node.name.namespace.name;
        } else if (node.name.name) {
          // <Foo>
          name = node.name.name;
        } else if (node.name.object) {
          // <Foo...Bar>
          let parent = node.name.object;
          while (parent.object) {
            parent = parent.object;
          }
          name = parent.name;
        } else {
          return;
        }

        context.markVariableAsUsed(name);
      }

    };
  }
};


/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing parentheses around multilines JSX
 * @author Yannick Croissant
 */



const has = __webpack_require__(15);
const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  declaration: 'parens',
  assignment: 'parens',
  return: 'parens',
  arrow: 'parens',
  condition: 'ignore',
  logical: 'ignore',
  prop: 'ignore'
};

const MISSING_PARENS = 'Missing parentheses around multilines JSX';
const PARENS_NEW_LINES = 'Parentheses around JSX should be on separate lines';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing parentheses around multilines JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-wrap-multilines')
    },
    fixable: 'code',

    schema: [{
      type: 'object',
      // true/false are for backwards compatibility
      properties: {
        declaration: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        assignment: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        return: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        arrow: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        condition: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        logical: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        prop: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    function getOption(type) {
      const userOptions = context.options[0] || {};
      if (has(userOptions, type)) {
        return userOptions[type];
      }
      return DEFAULTS[type];
    }

    function isEnabled(type) {
      const option = getOption(type);
      return option && option !== 'ignore';
    }

    function isParenthesised(node) {
      const sourceCode = context.getSourceCode();
      const previousToken = sourceCode.getTokenBefore(node);
      const nextToken = sourceCode.getTokenAfter(node);

      return previousToken && nextToken &&
        previousToken.value === '(' && previousToken.range[1] <= node.range[0] &&
        nextToken.value === ')' && nextToken.range[0] >= node.range[1];
    }

    function needsOpeningNewLine(node) {
      const previousToken = context.getSourceCode().getTokenBefore(node);

      if (!isParenthesised(node)) {
        return false;
      }

      if (previousToken.loc.end.line === node.loc.start.line) {
        return true;
      }

      return false;
    }

    function needsClosingNewLine(node) {
      const nextToken = context.getSourceCode().getTokenAfter(node);

      if (!isParenthesised(node)) {
        return false;
      }

      if (node.loc.end.line === nextToken.loc.end.line) {
        return true;
      }

      return false;
    }

    function isMultilines(node) {
      return node.loc.start.line !== node.loc.end.line;
    }

    function report(node, message, fix) {
      context.report({
        node,
        message,
        fix
      });
    }

    function trimTokenBeforeNewline(node, tokenBefore) {
      // if the token before the jsx is a bracket or curly brace
      // we don't want a space between the opening parentheses and the multiline jsx
      const isBracket = tokenBefore.value === '{' || tokenBefore.value === '[';
      return `${tokenBefore.value.trim()}${isBracket ? '' : ' '}`;
    }

    function check(node, type) {
      if (!node || !jsxUtil.isJSX(node)) {
        return;
      }

      const sourceCode = context.getSourceCode();
      const option = getOption(type);

      if ((option === true || option === 'parens') && !isParenthesised(node) && isMultilines(node)) {
        report(node, MISSING_PARENS, fixer => fixer.replaceText(node, `(${sourceCode.getText(node)})`));
      }

      if (option === 'parens-new-line' && isMultilines(node)) {
        if (!isParenthesised(node)) {
          const tokenBefore = sourceCode.getTokenBefore(node, {includeComments: true});
          const tokenAfter = sourceCode.getTokenAfter(node, {includeComments: true});
          if (tokenBefore.loc.end.line < node.loc.start.line) {
            // Strip newline after operator if parens newline is specified
            report(
              node,
              MISSING_PARENS,
              fixer => fixer.replaceTextRange(
                [tokenBefore.range[0], tokenAfter ? tokenAfter.range[0] : node.range[1]],
                `${trimTokenBeforeNewline(node, tokenBefore)}(\n${sourceCode.getText(node)}\n)`
              )
            );
          } else {
            report(node, MISSING_PARENS, fixer => fixer.replaceText(node, `(\n${sourceCode.getText(node)}\n)`));
          }
        } else {
          const needsOpening = needsOpeningNewLine(node);
          const needsClosing = needsClosingNewLine(node);
          if (needsOpening || needsClosing) {
            report(node, PARENS_NEW_LINES, (fixer) => {
              const text = sourceCode.getText(node);
              let fixed = text;
              if (needsOpening) {
                fixed = `\n${fixed}`;
              }
              if (needsClosing) {
                fixed = `${fixed}\n`;
              }
              return fixer.replaceText(node, fixed);
            });
          }
        }
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      VariableDeclarator(node) {
        const type = 'declaration';
        if (!isEnabled(type)) {
          return;
        }
        if (!isEnabled('condition') && node.init && node.init.type === 'ConditionalExpression') {
          check(node.init.consequent, type);
          check(node.init.alternate, type);
          return;
        }
        check(node.init, type);
      },

      AssignmentExpression(node) {
        const type = 'assignment';
        if (!isEnabled(type)) {
          return;
        }
        if (!isEnabled('condition') && node.right.type === 'ConditionalExpression') {
          check(node.right.consequent, type);
          check(node.right.alternate, type);
          return;
        }
        check(node.right, type);
      },

      ReturnStatement(node) {
        const type = 'return';
        if (isEnabled(type)) {
          check(node.argument, type);
        }
      },

      'ArrowFunctionExpression:exit': function (node) {
        const arrowBody = node.body;
        const type = 'arrow';

        if (isEnabled(type) && arrowBody.type !== 'BlockStatement') {
          check(arrowBody, type);
        }
      },

      ConditionalExpression(node) {
        const type = 'condition';
        if (isEnabled(type)) {
          check(node.consequent, type);
          check(node.alternate, type);
        }
      },

      LogicalExpression(node) {
        const type = 'logical';
        if (isEnabled(type)) {
          check(node.right, type);
        }
      },

      JSXAttribute(node) {
        const type = 'prop';
        if (isEnabled(type) && node.value && node.value.type === 'JSXExpressionContainer') {
          check(node.value.expression, type);
        }
      }
    };
  }
};


/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of this.state within setState
 * @author Rolf Erik Lekang, Jørgen Aaberg
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Reports when this.state is accessed within setState',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-access-state-in-setstate')
    }
  },

  create(context) {
    function isSetStateCall(node) {
      return node.type === 'CallExpression' &&
        node.callee.property &&
        node.callee.property.name === 'setState' &&
        node.callee.object.type === 'ThisExpression';
    }

    function isFirstArgumentInSetStateCall(current, node) {
      if (!isSetStateCall(current)) {
        return false;
      }
      while (node && node.parent !== current) {
        node = node.parent;
      }
      return current.arguments[0] === node;
    }

    // The methods array contains all methods or functions that are using this.state
    // or that are calling another method or function using this.state
    const methods = [];
    // The vars array contains all variables that contains this.state
    const vars = [];
    return {
      CallExpression(node) {
        // Appends all the methods that are calling another
        // method containing this.state to the methods array
        methods.forEach((method) => {
          if (node.callee.name === method.methodName) {
            let current = node.parent;
            while (current.type !== 'Program') {
              if (current.type === 'MethodDefinition') {
                methods.push({
                  methodName: current.key.name,
                  node: method.node
                });
                break;
              }
              current = current.parent;
            }
          }
        });

        // Finding all CallExpressions that is inside a setState
        // to further check if they contains this.state
        let current = node.parent;
        while (current.type !== 'Program') {
          if (isFirstArgumentInSetStateCall(current, node)) {
            const methodName = node.callee.name;
            methods.forEach((method) => {
              if (method.methodName === methodName) {
                context.report({
                  node: method.node,
                  message: 'Use callback in setState when referencing the previous state.'
                });
              }
            });

            break;
          }
          current = current.parent;
        }
      },

      MemberExpression(node) {
        if (
          node.property.name === 'state' &&
          node.object.type === 'ThisExpression'
        ) {
          let current = node;
          while (current.type !== 'Program') {
            // Reporting if this.state is directly within this.setState
            if (isFirstArgumentInSetStateCall(current, node)) {
              context.report({
                node,
                message: 'Use callback in setState when referencing the previous state.'
              });
              break;
            }

            // Storing all functions and methods that contains this.state
            if (current.type === 'MethodDefinition') {
              methods.push({
                methodName: current.key.name,
                node
              });
              break;
            } else if (current.type === 'FunctionExpression' && current.parent.key) {
              methods.push({
                methodName: current.parent.key.name,
                node
              });
              break;
            }

            // Storing all variables containg this.state
            if (current.type === 'VariableDeclarator') {
              vars.push({
                node,
                scope: context.getScope(),
                variableName: current.id.name
              });
              break;
            }

            current = current.parent;
          }
        }
      },

      Identifier(node) {
        // Checks if the identifier is a variable within an object
        let current = node;
        while (current.parent.type === 'BinaryExpression') {
          current = current.parent;
        }
        if (
          current.parent.value === current ||
          current.parent.object === current
        ) {
          while (current.type !== 'Program') {
            if (isFirstArgumentInSetStateCall(current, node)) {
              vars
                .filter(v => v.scope === context.getScope() && v.variableName === node.name)
                .forEach((v) => {
                  context.report({
                    node: v.node,
                    message: 'Use callback in setState when referencing the previous state.'
                  });
                });
            }
            current = current.parent;
          }
        }
      },

      ObjectPattern(node) {
        const isDerivedFromThis = node.parent.init && node.parent.init.type === 'ThisExpression';
        node.properties.forEach((property) => {
          if (property && property.key && property.key.name === 'state' && isDerivedFromThis) {
            vars.push({
              node: property.key,
              scope: context.getScope(),
              variableName: property.key.name
            });
          }
        });
      }
    };
  }
};


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of Array index in keys
 * @author Joe Lencioni
 */



const has = __webpack_require__(15);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);
const pragma = __webpack_require__(66);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of Array index in keys',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-array-index-key')
    },

    schema: []
  },

  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------
    const indexParamNames = [];
    const iteratorFunctionsToIndexParamPosition = {
      every: 1,
      filter: 1,
      find: 1,
      findIndex: 1,
      forEach: 1,
      map: 1,
      reduce: 2,
      reduceRight: 2,
      some: 1
    };
    const ERROR_MESSAGE = 'Do not use Array index in keys';

    function isArrayIndex(node) {
      return node.type === 'Identifier' &&
        indexParamNames.indexOf(node.name) !== -1;
    }

    function isUsingReactChildren(node) {
      const callee = node.callee;
      if (
        !callee ||
        !callee.property ||
        !callee.object
      ) {
        return null;
      }

      const isReactChildMethod = ['map', 'forEach'].indexOf(callee.property.name) > -1;
      if (!isReactChildMethod) {
        return null;
      }

      const obj = callee.object;
      if (obj && obj.name === 'Children') {
        return true;
      }
      if (obj && obj.object && obj.object.name === pragma.getFromContext(context)) {
        return true;
      }

      return false;
    }

    function getMapIndexParamName(node) {
      const callee = node.callee;
      if (callee.type !== 'MemberExpression') {
        return null;
      }
      if (callee.property.type !== 'Identifier') {
        return null;
      }
      if (!has(iteratorFunctionsToIndexParamPosition, callee.property.name)) {
        return null;
      }

      const callbackArg = isUsingReactChildren(node) ?
        node.arguments[1] :
        node.arguments[0];

      if (!callbackArg) {
        return null;
      }

      if (!astUtil.isFunctionLikeExpression(callbackArg)) {
        return null;
      }

      const params = callbackArg.params;

      const indexParamPosition = iteratorFunctionsToIndexParamPosition[callee.property.name];
      if (params.length < indexParamPosition + 1) {
        return null;
      }

      return params[indexParamPosition].name;
    }

    function getIdentifiersFromBinaryExpression(side) {
      if (side.type === 'Identifier') {
        return side;
      }

      if (side.type === 'BinaryExpression') {
        // recurse
        const left = getIdentifiersFromBinaryExpression(side.left);
        const right = getIdentifiersFromBinaryExpression(side.right);
        return [].concat(left, right).filter(Boolean);
      }

      return null;
    }

    function checkPropValue(node) {
      if (isArrayIndex(node)) {
        // key={bar}
        context.report({
          node,
          message: ERROR_MESSAGE
        });
        return;
      }

      if (node.type === 'TemplateLiteral') {
        // key={`foo-${bar}`}
        node.expressions.filter(isArrayIndex).forEach(() => {
          context.report({node, message: ERROR_MESSAGE});
        });

        return;
      }

      if (node.type === 'BinaryExpression') {
        // key={'foo' + bar}
        const identifiers = getIdentifiersFromBinaryExpression(node);

        identifiers.filter(isArrayIndex).forEach(() => {
          context.report({node, message: ERROR_MESSAGE});
        });
      }
    }

    return {
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          ['createElement', 'cloneElement'].indexOf(node.callee.property.name) !== -1 &&
          node.arguments.length > 1
        ) {
          // React.createElement
          if (!indexParamNames.length) {
            return;
          }

          const props = node.arguments[1];

          if (props.type !== 'ObjectExpression') {
            return;
          }

          props.properties.forEach((prop) => {
            if (!prop.key || prop.key.name !== 'key') {
              // { ...foo }
              // { foo: bar }
              return;
            }

            checkPropValue(prop.value);
          });

          return;
        }

        const mapIndexParamName = getMapIndexParamName(node);
        if (!mapIndexParamName) {
          return;
        }

        indexParamNames.push(mapIndexParamName);
      },

      JSXAttribute(node) {
        if (node.name.name !== 'key') {
          // foo={bar}
          return;
        }

        if (!indexParamNames.length) {
          // Not inside a call expression that we think has an index param.
          return;
        }

        const value = node.value;
        if (!value || value.type !== 'JSXExpressionContainer') {
          // key='foo' or just simply 'key'
          return;
        }

        checkPropValue(value.expression);
      },

      'CallExpression:exit': function (node) {
        const mapIndexParamName = getMapIndexParamName(node);
        if (!mapIndexParamName) {
          return;
        }

        indexParamNames.pop();
      }
    };
  }
};


/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent passing of children as props
 * @author Benjamin Stepp
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if the node is a createElement call with a props literal.
 * @param {ASTNode} node - The AST node being checked.
 * @returns {Boolean} - True if node is a createElement call with a props
 * object literal, False if not.
*/
function isCreateElementWithProps(node) {
  return node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.property.name === 'createElement' &&
    node.arguments.length > 1 &&
    node.arguments[1].type === 'ObjectExpression';
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent passing of children as props.',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-children-prop')
    },
    schema: []
  },
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'children') {
          return;
        }

        context.report({
          node,
          message: 'Do not pass children as props. Instead, nest children between the opening and closing tags.'
        });
      },
      CallExpression(node) {
        if (!isCreateElementWithProps(node)) {
          return;
        }

        const props = node.arguments[1].properties;
        const childrenProp = props.find(prop => prop.key && prop.key.name === 'children');

        if (childrenProp) {
          context.report({
            node,
            message: 'Do not pass children as props. Instead, pass them as additional arguments to React.createElement.'
          });
        }
      }
    };
  }
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of dangerous JSX props
 * @author Scott Andrews
 */



const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DANGEROUS_MESSAGE = 'Dangerous property \'{{name}}\' found';

const DANGEROUS_PROPERTY_NAMES = [
  'dangerouslySetInnerHTML'
];

const DANGEROUS_PROPERTIES = DANGEROUS_PROPERTY_NAMES.reduce((props, prop) => {
  props[prop] = prop;
  return props;
}, Object.create(null));

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if a JSX attribute is dangerous.
 * @param {String} name - Name of the attribute to check.
 * @returns {boolean} Whether or not the attribute is dnagerous.
 */
function isDangerous(name) {
  return name in DANGEROUS_PROPERTIES;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of dangerous JSX props',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-danger')
    },
    schema: []
  },

  create(context) {
    return {

      JSXAttribute(node) {
        if (jsxUtil.isDOMComponent(node.parent) && isDangerous(node.name.name)) {
          context.report({
            node,
            message: DANGEROUS_MESSAGE,
            data: {
              name: node.name.name
            }
          });
        }
      }

    };
  }
};


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Report when a DOM element is using both children and dangerouslySetInnerHTML
 * @author David Petersen
 */



const variableUtil = __webpack_require__(65);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Report when a DOM element is using both children and dangerouslySetInnerHTML',
      category: '',
      recommended: true,
      url: docsUrl('no-danger-with-children')
    },
    schema: [] // no options
  },
  create(context) {
    function findSpreadVariable(name) {
      return variableUtil.variablesInScope(context).find(item => item.name === name);
    }
    /**
     * Takes a ObjectExpression and returns the value of the prop if it has it
     * @param {object} node - ObjectExpression node
     * @param {string} propName - name of the prop to look for
     * @param {string[]} seenProps
     */
    function findObjectProp(node, propName, seenProps) {
      if (!node.properties) {
        return false;
      }
      return node.properties.find((prop) => {
        if (prop.type === 'Property') {
          return prop.key.name === propName;
        }
        if (prop.type === 'ExperimentalSpreadProperty' || prop.type === 'SpreadElement') {
          const variable = findSpreadVariable(prop.argument.name);
          if (variable && variable.defs.length && variable.defs[0].node.init) {
            if (seenProps.indexOf(prop.argument.name) > -1) {
              return false;
            }
            const newSeenProps = seenProps.concat(prop.argument.name || []);
            return findObjectProp(variable.defs[0].node.init, propName, newSeenProps);
          }
        }
        return false;
      });
    }

    /**
     * Takes a JSXElement and returns the value of the prop if it has it
     * @param {object} node - JSXElement node
     * @param {string} propName - name of the prop to look for
     */
    function findJsxProp(node, propName) {
      const attributes = node.openingElement.attributes;
      return attributes.find((attribute) => {
        if (attribute.type === 'JSXSpreadAttribute') {
          const variable = findSpreadVariable(attribute.argument.name);
          if (variable && variable.defs.length && variable.defs[0].node.init) {
            return findObjectProp(variable.defs[0].node.init, propName, []);
          }
        }
        return attribute.name && attribute.name.name === propName;
      });
    }

    /**
     * Checks to see if a node is a line break
     * @param {ASTNode} node The AST node being checked
     * @returns {Boolean} True if node is a line break, false if not
     */
    function isLineBreak(node) {
      const isLiteral = node.type === 'Literal' || node.type === 'JSXText';
      const isMultiline = node.loc.start.line !== node.loc.end.line;
      const isWhiteSpaces = /^\s*$/.test(node.value);

      return isLiteral && isMultiline && isWhiteSpaces;
    }

    return {
      JSXElement(node) {
        let hasChildren = false;

        if (node.children.length && !isLineBreak(node.children[0])) {
          hasChildren = true;
        } else if (findJsxProp(node, 'children')) {
          hasChildren = true;
        }

        if (
          node.openingElement.attributes &&
          hasChildren &&
          findJsxProp(node, 'dangerouslySetInnerHTML')
        ) {
          context.report({
            node,
            message: 'Only set one of `children` or `props.dangerouslySetInnerHTML`'
          });
        }
      },
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.property.name === 'createElement' &&
          node.arguments.length > 1
        ) {
          let hasChildren = false;

          let props = node.arguments[1];

          if (props.type === 'Identifier') {
            const variable = variableUtil.variablesInScope(context).find(item => item.name === props.name);
            if (variable && variable.defs.length && variable.defs[0].node.init) {
              props = variable.defs[0].node.init;
            }
          }

          const dangerously = findObjectProp(props, 'dangerouslySetInnerHTML', []);

          if (node.arguments.length === 2) {
            if (findObjectProp(props, 'children', [])) {
              hasChildren = true;
            }
          } else {
            hasChildren = true;
          }

          if (dangerously && hasChildren) {
            context.report({
              node,
              message: 'Only set one of `children` or `props.dangerouslySetInnerHTML`'
            });
          }
        }
      }
    };
  }
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of deprecated methods
 * @author Yannick Croissant
 * @author Scott Feeney
 * @author Sergei Startsev
 */



const values = __webpack_require__(181);

const Components = __webpack_require__(50);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);
const pragmaUtil = __webpack_require__(66);
const versionUtil = __webpack_require__(71);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const MODULES = {
  react: ['React'],
  'react-addons-perf': ['ReactPerf', 'Perf']
};

const DEPRECATED_MESSAGE = '{{oldMethod}} is deprecated since React {{version}}{{newMethod}}{{refs}}';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of deprecated methods',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-deprecated')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    const pragma = pragmaUtil.getFromContext(context);

    function getDeprecated() {
      const deprecated = {};
      // 0.12.0
      deprecated[`${pragma}.renderComponent`] = ['0.12.0', `${pragma}.render`];
      deprecated[`${pragma}.renderComponentToString`] = ['0.12.0', `${pragma}.renderToString`];
      deprecated[`${pragma}.renderComponentToStaticMarkup`] = ['0.12.0', `${pragma}.renderToStaticMarkup`];
      deprecated[`${pragma}.isValidComponent`] = ['0.12.0', `${pragma}.isValidElement`];
      deprecated[`${pragma}.PropTypes.component`] = ['0.12.0', `${pragma}.PropTypes.element`];
      deprecated[`${pragma}.PropTypes.renderable`] = ['0.12.0', `${pragma}.PropTypes.node`];
      deprecated[`${pragma}.isValidClass`] = ['0.12.0'];
      deprecated['this.transferPropsTo'] = ['0.12.0', 'spread operator ({...})'];
      // 0.13.0
      deprecated[`${pragma}.addons.classSet`] = ['0.13.0', 'the npm module classnames'];
      deprecated[`${pragma}.addons.cloneWithProps`] = ['0.13.0', `${pragma}.cloneElement`];
      // 0.14.0
      deprecated[`${pragma}.render`] = ['0.14.0', 'ReactDOM.render'];
      deprecated[`${pragma}.unmountComponentAtNode`] = ['0.14.0', 'ReactDOM.unmountComponentAtNode'];
      deprecated[`${pragma}.findDOMNode`] = ['0.14.0', 'ReactDOM.findDOMNode'];
      deprecated[`${pragma}.renderToString`] = ['0.14.0', 'ReactDOMServer.renderToString'];
      deprecated[`${pragma}.renderToStaticMarkup`] = ['0.14.0', 'ReactDOMServer.renderToStaticMarkup'];
      // 15.0.0
      deprecated[`${pragma}.addons.LinkedStateMixin`] = ['15.0.0'];
      deprecated['ReactPerf.printDOM'] = ['15.0.0', 'ReactPerf.printOperations'];
      deprecated['Perf.printDOM'] = ['15.0.0', 'Perf.printOperations'];
      deprecated['ReactPerf.getMeasurementsSummaryMap'] = ['15.0.0', 'ReactPerf.getWasted'];
      deprecated['Perf.getMeasurementsSummaryMap'] = ['15.0.0', 'Perf.getWasted'];
      // 15.5.0
      deprecated[`${pragma}.createClass`] = ['15.5.0', 'the npm module create-react-class'];
      deprecated[`${pragma}.addons.TestUtils`] = ['15.5.0', 'ReactDOM.TestUtils'];
      deprecated[`${pragma}.PropTypes`] = ['15.5.0', 'the npm module prop-types'];
      // 15.6.0
      deprecated[`${pragma}.DOM`] = ['15.6.0', 'the npm module react-dom-factories'];
      // 16.999.0
      // For now the following life-cycle methods are just legacy, not deprecated:
      // `componentWillMount`, `componentWillReceiveProps`, `componentWillUpdate`
      // https://github.com/yannickcr/eslint-plugin-react/pull/1750#issuecomment-425975934
      deprecated.componentWillMount = [
        '16.999.0',
        'UNSAFE_componentWillMount',
        'https://reactjs.org/docs/react-component.html#unsafe_componentwillmount. ' +
        'Use https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles to automatically update your components.'
      ];
      deprecated.componentWillReceiveProps = [
        '16.999.0',
        'UNSAFE_componentWillReceiveProps',
        'https://reactjs.org/docs/react-component.html#unsafe_componentwillreceiveprops. ' +
        'Use https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles to automatically update your components.'
      ];
      deprecated.componentWillUpdate = [
        '16.999.0',
        'UNSAFE_componentWillUpdate',
        'https://reactjs.org/docs/react-component.html#unsafe_componentwillupdate. ' +
        'Use https://github.com/reactjs/react-codemod#rename-unsafe-lifecycles to automatically update your components.'
      ];
      return deprecated;
    }

    function isDeprecated(method) {
      const deprecated = getDeprecated();

      return (
        deprecated &&
        deprecated[method] &&
        deprecated[method][0] &&
        versionUtil.testReactVersion(context, deprecated[method][0])
      );
    }

    function checkDeprecation(node, methodName, methodNode) {
      if (!isDeprecated(methodName)) {
        return;
      }
      const deprecated = getDeprecated();
      const version = deprecated[methodName][0];
      const newMethod = deprecated[methodName][1];
      const refs = deprecated[methodName][2];
      context.report({
        node: methodNode || node,
        message: DEPRECATED_MESSAGE,
        data: {
          oldMethod: methodName,
          version,
          newMethod: newMethod ? `, use ${newMethod} instead` : '',
          refs: refs ? `, see ${refs}` : ''
        }
      });
    }

    function getReactModuleName(node) {
      let moduleName = false;
      if (!node.init) {
        return moduleName;
      }

      values(MODULES).some((moduleNames) => {
        moduleName = moduleNames.find(name => name === node.init.name);
        return moduleName;
      });

      return moduleName;
    }

    /**
     * Returns life cycle methods if available
     * @param {ASTNode} node The AST node being checked.
     * @returns {Array} The array of methods.
     */
    function getLifeCycleMethods(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.map(property => ({
        name: astUtil.getPropertyName(property),
        node: astUtil.getPropertyNameNode(property)
      }));
    }

    /**
     * Checks life cycle methods
     * @param {ASTNode} node The AST node being checked.
     */
    function checkLifeCycleMethods(node) {
      if (utils.isES5Component(node) || utils.isES6Component(node)) {
        const methods = getLifeCycleMethods(node);
        methods.forEach(method => checkDeprecation(node, method.name, method.node));
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      MemberExpression(node) {
        checkDeprecation(node, context.getSourceCode().getText(node));
      },

      ImportDeclaration(node) {
        const isReactImport = typeof MODULES[node.source.value] !== 'undefined';
        if (!isReactImport) {
          return;
        }
        node.specifiers.forEach((specifier) => {
          if (!specifier.imported) {
            return;
          }
          checkDeprecation(node, `${MODULES[node.source.value][0]}.${specifier.imported.name}`);
        });
      },

      VariableDeclarator(node) {
        const reactModuleName = getReactModuleName(node);
        const isRequire = node.init && node.init.callee && node.init.callee.name === 'require';
        const isReactRequire = node.init &&
          node.init.arguments &&
          node.init.arguments.length &&
          typeof MODULES[node.init.arguments[0].value] !== 'undefined';
        const isDestructuring = node.id && node.id.type === 'ObjectPattern';

        if (
          !(isDestructuring && reactModuleName) &&
          !(isDestructuring && isRequire && isReactRequire)
        ) {
          return;
        }
        node.id.properties.forEach((property) => {
          checkDeprecation(node, `${reactModuleName || pragma}.${property.key.name}`);
        });
      },

      ClassDeclaration: checkLifeCycleMethods,
      ClassExpression: checkLifeCycleMethods,
      ObjectExpression: checkLifeCycleMethods
    };
  })
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(4);

var implementation = __webpack_require__(182);
var getPolyfill = __webpack_require__(183);
var shim = __webpack_require__(184);

var polyfill = getPolyfill();

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ES = __webpack_require__(46);
var has = __webpack_require__(15);
var bind = __webpack_require__(16);
var isEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);

module.exports = function values(O) {
	var obj = ES.RequireObjectCoercible(O);
	var vals = [];
	for (var key in obj) {
		if (has(obj, key) && isEnumerable(obj, key)) {
			vals.push(obj[key]);
		}
	}
	return vals;
};


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__(182);

module.exports = function getPolyfill() {
	return typeof Object.values === 'function' ? Object.values : implementation;
};


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPolyfill = __webpack_require__(183);
var define = __webpack_require__(4);

module.exports = function shimValues() {
	var polyfill = getPolyfill();
	define(Object, { values: polyfill }, {
		values: function testValues() {
			return Object.values !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in componentDidMount
 * @author Yannick Croissant
 */



const makeNoMethodSetStateRule = __webpack_require__(186);

module.exports = makeNoMethodSetStateRule('componentDidMount');


/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in lifecycle methods
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function mapTitle(methodName) {
  const map = {
    componentDidMount: 'did-mount',
    componentDidUpdate: 'did-update',
    componentWillUpdate: 'will-update'
  };
  const title = map[methodName];
  if (!title) {
    throw Error(`No docsUrl for '${methodName}'`);
  }
  return `no-${title}-set-state`;
}

function makeNoMethodSetStateRule(methodName, shouldCheckUnsafeCb) {
  return {
    meta: {
      docs: {
        description: `Prevent usage of setState in ${methodName}`,
        category: 'Best Practices',
        recommended: false,
        url: docsUrl(mapTitle(methodName))
      },

      schema: [{
        enum: ['disallow-in-func']
      }]
    },

    create(context) {
      const mode = context.options[0] || 'allow-in-func';

      function nameMatches(name) {
        if (name === methodName) {
          return true;
        }

        if (typeof shouldCheckUnsafeCb === 'function' && shouldCheckUnsafeCb(context)) {
          return name === `UNSAFE_${methodName}`;
        }

        return false;
      }

      // --------------------------------------------------------------------------
      // Public
      // --------------------------------------------------------------------------

      return {

        CallExpression(node) {
          const callee = node.callee;
          if (
            callee.type !== 'MemberExpression' ||
            callee.object.type !== 'ThisExpression' ||
            callee.property.name !== 'setState'
          ) {
            return;
          }
          const ancestors = context.getAncestors(callee).reverse();
          let depth = 0;
          ancestors.some((ancestor) => {
            if (/Function(Expression|Declaration)$/.test(ancestor.type)) {
              depth++;
            }
            if (
              (ancestor.type !== 'Property' && ancestor.type !== 'MethodDefinition' && ancestor.type !== 'ClassProperty') ||
              !nameMatches(ancestor.key.name) ||
              (mode !== 'disallow-in-func' && depth > 1)
            ) {
              return false;
            }
            context.report({
              node: callee,
              message: `Do not use setState in ${ancestor.key.name}`
            });
            return true;
          });
        }
      };
    }
  };
}

module.exports = makeNoMethodSetStateRule;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in componentDidUpdate
 * @author Yannick Croissant
 */



const makeNoMethodSetStateRule = __webpack_require__(186);

module.exports = makeNoMethodSetStateRule('componentDidUpdate');


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent direct mutation of this.state
 * @author David Petersen
 * @author Nicolas Fernandez <@burabure>
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent direct mutation of this.state',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('no-direct-mutation-state')
    }
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Checks if the component is valid
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component is valid, false if not.
     */
    function isValid(component) {
      return Boolean(component && !component.mutateSetState);
    }

    /**
     * Reports undeclared proptypes for a given component
     * @param {Object} component The component to process
     */
    function reportMutations(component) {
      let mutation;
      for (let i = 0, j = component.mutations.length; i < j; i++) {
        mutation = component.mutations[i];
        context.report({
          node: mutation,
          message: 'Do not mutate state directly. Use setState().'
        });
      }
    }

    /**
     * Walks throughs the MemberExpression to the top-most property.
     * @param {Object} node The node to process
     * @returns {Object} The outer-most MemberExpression
     */
    function getOuterMemberExpression(node) {
      while (node.object && node.object.property) {
        node = node.object;
      }
      return node;
    }

    /**
     * Determine if we should currently ignore assignments in this component.
     * @param {?Object} component The component to process
     * @returns {Boolean} True if we should skip assignment checks.
     */
    function shouldIgnoreComponent(component) {
      return !component || (component.inConstructor && !component.inCallExpression);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------
    return {
      MethodDefinition(node) {
        if (node.kind === 'constructor') {
          components.set(node, {
            inConstructor: true
          });
        }
      },

      CallExpression(node) {
        components.set(node, {
          inCallExpression: true
        });
      },

      AssignmentExpression(node) {
        const component = components.get(utils.getParentComponent());
        if (shouldIgnoreComponent(component) || !node.left || !node.left.object) {
          return;
        }
        const item = getOuterMemberExpression(node.left);
        if (utils.isStateMemberExpression(item)) {
          const mutations = (component && component.mutations) || [];
          mutations.push(node.left.object);
          components.set(node, {
            mutateSetState: true,
            mutations
          });
        }
      },

      UpdateExpression(node) {
        const component = components.get(utils.getParentComponent());
        if (shouldIgnoreComponent(component) || node.argument.type !== 'MemberExpression') {
          return;
        }
        const item = getOuterMemberExpression(node.argument);
        if (utils.isStateMemberExpression(item)) {
          const mutations = (component && component.mutations) || [];
          mutations.push(item);
          components.set(node, {
            mutateSetState: true,
            mutations
          });
        }
      },

      'CallExpression:exit': function (node) {
        components.set(node, {
          inCallExpression: false
        });
      },

      'MethodDefinition:exit': function (node) {
        if (node.kind === 'constructor') {
          components.set(node, {
            inConstructor: false
          });
        }
      },

      'Program:exit': function () {
        const list = components.list();

        Object.keys(list).forEach((key) => {
          if (!isValid(list[key])) {
            reportMutations(list[key]);
          }
        });
      }
    };
  })
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of findDOMNode
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of findDOMNode',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-find-dom-node')
    },
    schema: []
  },

  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      CallExpression(node) {
        const callee = node.callee;

        const isfindDOMNode = (callee.name === 'findDOMNode') ||
          (callee.property && callee.property.name === 'findDOMNode');
        if (!isfindDOMNode) {
          return;
        }

        context.report({
          node: callee,
          message: 'Do not use findDOMNode'
        });
      }
    };
  }
};


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of isMounted
 * @author Joe Lencioni
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of isMounted',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-is-mounted')
    },
    schema: []
  },

  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      CallExpression(node) {
        const callee = node.callee;
        if (callee.type !== 'MemberExpression') {
          return;
        }
        if (callee.object.type !== 'ThisExpression' || callee.property.name !== 'isMounted') {
          return;
        }
        const ancestors = context.getAncestors(callee);
        for (let i = 0, j = ancestors.length; i < j; i++) {
          if (ancestors[i].type === 'Property' || ancestors[i].type === 'MethodDefinition') {
            context.report({
              node: callee,
              message: 'Do not use isMounted'
            });
            break;
          }
        }
      }
    };
  }
};


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent multiple component definition per file
 * @author Yannick Croissant
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent multiple component definition per file',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('no-multi-comp')
    },

    schema: [{
      type: 'object',
      properties: {
        ignoreStateless: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || {};
    const ignoreStateless = configuration.ignoreStateless || false;

    const MULTI_COMP_MESSAGE = 'Declare only one React component per file';

    /**
     * Checks if the component is ignored
     * @param {Object} component The component being checked.
     * @returns {Boolean} True if the component is ignored, false if not.
     */
    function isIgnored(component) {
      return (
        ignoreStateless && (
          /Function/.test(component.node.type) ||
          utils.isPragmaComponentWrapper(component.node)
        )
      );
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        if (components.length() <= 1) {
          return;
        }

        const list = components.list();

        Object.keys(list).filter(component => !isIgnored(list[component])).forEach((component, i) => {
          if (i >= 1) {
            context.report({
              node: list[component].node,
              message: MULTI_COMP_MESSAGE
            });
          }
        });
      }
    };
  })
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState
 * @author Mark Dalgleish
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of setState',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('no-set-state')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Checks if the component is valid
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component is valid, false if not.
     */
    function isValid(component) {
      return Boolean(component && !component.useSetState);
    }

    /**
     * Reports usages of setState for a given component
     * @param {Object} component The component to process
     */
    function reportSetStateUsages(component) {
      let setStateUsage;
      for (let i = 0, j = component.setStateUsages.length; i < j; i++) {
        setStateUsage = component.setStateUsages[i];
        context.report({
          node: setStateUsage,
          message: 'Do not use setState'
        });
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      CallExpression(node) {
        const callee = node.callee;
        if (
          callee.type !== 'MemberExpression' ||
          callee.object.type !== 'ThisExpression' ||
          callee.property.name !== 'setState'
        ) {
          return;
        }
        const component = components.get(utils.getParentComponent());
        const setStateUsages = component && component.setStateUsages || [];
        setStateUsages.push(callee);
        components.set(node, {
          useSetState: true,
          setStateUsages
        });
      },

      'Program:exit': function () {
        const list = components.list();
        Object.keys(list).filter(component => !isValid(list[component])).forEach((component) => {
          reportSetStateUsages(list[component]);
        });
      }
    };
  })
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent string definitions for references and prevent referencing this.refs
 * @author Tom Hastjarjanto
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent string definitions for references and prevent referencing this.refs',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-string-refs')
    },
    schema: [{
      type: 'object',
      properties: {
        noTemplateLiterals: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const detectTemplateLiterals = context.options[0] ? context.options[0].noTemplateLiterals : false;
    /**
     * Checks if we are using refs
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are using refs, false if not.
     */
    function isRefsUsage(node) {
      return Boolean(
        (
          utils.getParentES6Component() ||
          utils.getParentES5Component()
        ) &&
        node.object.type === 'ThisExpression' &&
        node.property.name === 'refs'
      );
    }

    /**
     * Checks if we are using a ref attribute
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are using a ref attribute, false if not.
     */
    function isRefAttribute(node) {
      return Boolean(
        node.type === 'JSXAttribute' &&
        node.name &&
        node.name.name === 'ref'
      );
    }

    /**
     * Checks if a node contains a string value
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node contains a string value, false if not.
     */
    function containsStringLiteral(node) {
      return Boolean(
        node.value &&
        node.value.type === 'Literal' &&
        typeof node.value.value === 'string'
      );
    }

    /**
     * Checks if a node contains a string value within a jsx expression
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node contains a string value within a jsx expression, false if not.
     */
    function containsStringExpressionContainer(node) {
      return Boolean(
        node.value &&
        node.value.type === 'JSXExpressionContainer' &&
        node.value.expression &&
        ((node.value.expression.type === 'Literal' && typeof node.value.expression.value === 'string') ||
        (node.value.expression.type === 'TemplateLiteral' && detectTemplateLiterals))
      );
    }

    return {
      MemberExpression(node) {
        if (isRefsUsage(node)) {
          context.report({
            node,
            message: 'Using this.refs is deprecated.'
          });
        }
      },
      JSXAttribute(node) {
        if (
          isRefAttribute(node) &&
          (containsStringLiteral(node) || containsStringExpressionContainer(node))
        ) {
          context.report({
            node,
            message: 'Using string literals in ref attributes is deprecated.'
          });
        }
      }
    };
  })
};


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Flag shouldComponentUpdate when extending PureComponent
 */



const Components = __webpack_require__(50);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);

function errorMessage(node) {
  return `${node} does not need shouldComponentUpdate when extending React.PureComponent.`;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Flag shouldComponentUpdate when extending PureComponent',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-redundant-should-component-update')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Checks for shouldComponentUpdate property
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} Whether or not the property exists.
     */
    function hasShouldComponentUpdate(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.some((property) => {
        const name = astUtil.getPropertyName(property);
        return name === 'shouldComponentUpdate';
      });
    }

    /**
     * Get name of node if available
     * @param {ASTNode} node The AST node being checked.
     * @return {String} The name of the node
     */
    function getNodeName(node) {
      if (node.id) {
        return node.id.name;
      }
      if (node.parent && node.parent.id) {
        return node.parent.id.name;
      }
      return '';
    }

    /**
     * Checks for violation of rule
     * @param {ASTNode} node The AST node being checked.
     */
    function checkForViolation(node) {
      if (utils.isPureComponent(node)) {
        const hasScu = hasShouldComponentUpdate(node);
        if (hasScu) {
          const className = getNodeName(node);
          context.report({
            node,
            message: errorMessage(className)
          });
        }
      }
    }

    return {
      ClassDeclaration: checkForViolation,
      ClassExpression: checkForViolation
    };
  })
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of the return value of React.render
 * @author Dustan Kasten
 */



const versionUtil = __webpack_require__(71);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of the return value of React.render',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-render-return-value')
    },
    schema: []
  },

  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    let calleeObjectName = /^ReactDOM$/;
    if (versionUtil.testReactVersion(context, '15.0.0')) {
      calleeObjectName = /^ReactDOM$/;
    } else if (versionUtil.testReactVersion(context, '0.14.0')) {
      calleeObjectName = /^React(DOM)?$/;
    } else if (versionUtil.testReactVersion(context, '0.13.0')) {
      calleeObjectName = /^React$/;
    }

    return {

      CallExpression(node) {
        const callee = node.callee;
        const parent = node.parent;
        if (callee.type !== 'MemberExpression') {
          return;
        }

        if (
          callee.object.type !== 'Identifier' ||
          !calleeObjectName.test(callee.object.name) ||
          callee.property.name !== 'render'
        ) {
          return;
        }

        if (
          parent.type === 'VariableDeclarator' ||
          parent.type === 'Property' ||
          parent.type === 'ReturnStatement' ||
          parent.type === 'ArrowFunctionExpression'
        ) {
          context.report({
            node: callee,
            message: `Do not depend on the return value from ${callee.object.name}.render`
          });
        }
      }
    };
  }
};


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Report "this" being used in stateless functional components.
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Stateless functional components should not use this';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Report "this" being used in stateless components',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-this-in-sfc')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => ({
    MemberExpression(node) {
      if (node.object.type === 'ThisExpression') {
        const component = components.get(utils.getParentStatelessComponent());
        if (!component || component.node && component.node.parent && component.node.parent.type === 'Property') {
          return;
        }
        context.report({
          node,
          message: ERROR_MESSAGE
        });
      }
    }
  }))
};


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent common casing typos
 */



const PROP_TYPES = Object.keys(__webpack_require__(198));
const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const STATIC_CLASS_PROPERTIES = ['propTypes', 'contextTypes', 'childContextTypes', 'defaultProps'];
const LIFECYCLE_METHODS = [
  'getDerivedStateFromProps',
  'componentWillMount',
  'UNSAFE_componentWillMount',
  'componentDidMount',
  'componentWillReceiveProps',
  'UNSAFE_componentWillReceiveProps',
  'shouldComponentUpdate',
  'componentWillUpdate',
  'UNSAFE_componentWillUpdate',
  'getSnapshotBeforeUpdate',
  'componentDidUpdate',
  'componentDidCatch',
  'componentWillUnmount',
  'render'
];

module.exports = {
  meta: {
    docs: {
      description: 'Prevent common typos',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('no-typos')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    let propTypesPackageName = null;
    let reactPackageName = null;

    function checkValidPropTypeQualifier(node) {
      if (node.name !== 'isRequired') {
        context.report({
          node,
          message: `Typo in prop type chain qualifier: ${node.name}`
        });
      }
    }

    function checkValidPropType(node) {
      if (node.name && !PROP_TYPES.some(propTypeName => propTypeName === node.name)) {
        context.report({
          node,
          message: `Typo in declared prop type: ${node.name}`
        });
      }
    }

    function isPropTypesPackage(node) {
      return (
        node.type === 'Identifier' &&
        node.name === propTypesPackageName
      ) || (
        node.type === 'MemberExpression' &&
        node.property.name === 'PropTypes' &&
        node.object.name === reactPackageName
      );
    }

    /* eslint-disable no-use-before-define */

    function checkValidCallExpression(node) {
      const callee = node.callee;
      if (callee.type === 'MemberExpression' && callee.property.name === 'shape') {
        checkValidPropObject(node.arguments[0]);
      } else if (callee.type === 'MemberExpression' && callee.property.name === 'oneOfType') {
        const args = node.arguments[0];
        if (args && args.type === 'ArrayExpression') {
          args.elements.forEach((el) => {
            checkValidProp(el);
          });
        }
      }
    }

    function checkValidProp(node) {
      if ((!propTypesPackageName && !reactPackageName) || !node) {
        return;
      }

      if (node.type === 'MemberExpression') {
        if (
          node.object.type === 'MemberExpression' &&
          isPropTypesPackage(node.object.object)
        ) { // PropTypes.myProp.isRequired
          checkValidPropType(node.object.property);
          checkValidPropTypeQualifier(node.property);
        } else if (
          isPropTypesPackage(node.object) &&
          node.property.name !== 'isRequired'
        ) { // PropTypes.myProp
          checkValidPropType(node.property);
        } else if (node.object.type === 'CallExpression') {
          checkValidPropTypeQualifier(node.property);
          checkValidCallExpression(node.object);
        }
      } else if (node.type === 'CallExpression') {
        checkValidCallExpression(node);
      }
    }

    /* eslint-enable no-use-before-define */

    function checkValidPropObject(node) {
      if (node && node.type === 'ObjectExpression') {
        node.properties.forEach(prop => checkValidProp(prop.value));
      }
    }

    function reportErrorIfPropertyCasingTypo(node, propertyName, isClassProperty) {
      if (propertyName === 'propTypes' || propertyName === 'contextTypes' || propertyName === 'childContextTypes') {
        checkValidPropObject(node);
      }
      STATIC_CLASS_PROPERTIES.forEach((CLASS_PROP) => {
        if (propertyName && CLASS_PROP.toLowerCase() === propertyName.toLowerCase() && CLASS_PROP !== propertyName) {
          const message = isClassProperty ?
            'Typo in static class property declaration' :
            'Typo in property declaration';
          context.report({
            node,
            message
          });
        }
      });
    }

    function reportErrorIfLifecycleMethodCasingTypo(node) {
      LIFECYCLE_METHODS.forEach((method) => {
        if (method.toLowerCase() === node.key.name.toLowerCase() && method !== node.key.name) {
          context.report({
            node,
            message: 'Typo in component lifecycle method declaration'
          });
        }
      });
    }

    return {
      ImportDeclaration(node) {
        if (node.source && node.source.value === 'prop-types') { // import PropType from "prop-types"
          propTypesPackageName = node.specifiers[0].local.name;
        } else if (node.source && node.source.value === 'react') { // import { PropTypes } from "react"
          if (node.specifiers.length > 0) {
            reactPackageName = node.specifiers[0].local.name; // guard against accidental anonymous `import "react"`
          }
          if (node.specifiers.length >= 1) {
            const propTypesSpecifier = node.specifiers.find(specifier => (
              specifier.imported && specifier.imported.name === 'PropTypes'
            ));
            if (propTypesSpecifier) {
              propTypesPackageName = propTypesSpecifier.local.name;
            }
          }
        }
      },

      ClassProperty(node) {
        if (!node.static || !utils.isES6Component(node.parent.parent)) {
          return;
        }

        const tokens = context.getFirstTokens(node, 2);
        const propertyName = tokens[1].value;
        reportErrorIfPropertyCasingTypo(node.value, propertyName, true);
      },

      MemberExpression(node) {
        const propertyName = node.property.name;

        if (
          !propertyName ||
          STATIC_CLASS_PROPERTIES.map(prop => prop.toLocaleLowerCase()).indexOf(propertyName.toLowerCase()) === -1
        ) {
          return;
        }

        const relatedComponent = utils.getRelatedComponent(node);

        if (
          relatedComponent &&
          (utils.isES6Component(relatedComponent.node) || utils.isReturningJSX(relatedComponent.node)) &&
          (node.parent && node.parent.type === 'AssignmentExpression' && node.parent.right)
        ) {
          reportErrorIfPropertyCasingTypo(node.parent.right, propertyName, true);
        }
      },

      MethodDefinition(node) {
        if (!utils.isES6Component(node.parent.parent)) {
          return;
        }

        reportErrorIfLifecycleMethodCasingTypo(node);
      },

      ObjectExpression(node) {
        const component = utils.isES5Component(node) && components.get(node);

        if (!component) {
          return;
        }

        node.properties.forEach((property) => {
          reportErrorIfPropertyCasingTypo(property.value, property.key.name, false);
          reportErrorIfLifecycleMethodCasingTypo(property);
        });
      }
    };
  })
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (true) {
  var ReactIs = __webpack_require__(199);

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(201)(ReactIs.isElement, throwOnDirectAccess);
} else {}


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(200);
}


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/** @license React v16.9.0
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */





if (true) {
  (function() {
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
// TODO: We don't use AsyncMode or ConcurrentMode anymore. They were temporary
// (unstable) APIs that have been removed. Can we remove the symbols?
var REACT_ASYNC_MODE_TYPE = hasSymbol ? Symbol.for('react.async_mode') : 0xeacf;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_SUSPENSE_LIST_TYPE = hasSymbol ? Symbol.for('react.suspense_list') : 0xead8;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;
var REACT_FUNDAMENTAL_TYPE = hasSymbol ? Symbol.for('react.fundamental') : 0xead5;
var REACT_RESPONDER_TYPE = hasSymbol ? Symbol.for('react.responder') : 0xead6;

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || type.$$typeof === REACT_FUNDAMENTAL_TYPE || type.$$typeof === REACT_RESPONDER_TYPE);
}

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

function typeOf(object) {
  if (typeof object === 'object' && object !== null) {
    var $$typeof = object.$$typeof;
    switch ($$typeof) {
      case REACT_ELEMENT_TYPE:
        var type = object.type;

        switch (type) {
          case REACT_ASYNC_MODE_TYPE:
          case REACT_CONCURRENT_MODE_TYPE:
          case REACT_FRAGMENT_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_SUSPENSE_TYPE:
            return type;
          default:
            var $$typeofType = type && type.$$typeof;

            switch ($$typeofType) {
              case REACT_CONTEXT_TYPE:
              case REACT_FORWARD_REF_TYPE:
              case REACT_PROVIDER_TYPE:
                return $$typeofType;
              default:
                return $$typeof;
            }
        }
      case REACT_LAZY_TYPE:
      case REACT_MEMO_TYPE:
      case REACT_PORTAL_TYPE:
        return $$typeof;
    }
  }

  return undefined;
}

// AsyncMode is deprecated along with isAsyncMode
var AsyncMode = REACT_ASYNC_MODE_TYPE;
var ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
var ContextConsumer = REACT_CONTEXT_TYPE;
var ContextProvider = REACT_PROVIDER_TYPE;
var Element = REACT_ELEMENT_TYPE;
var ForwardRef = REACT_FORWARD_REF_TYPE;
var Fragment = REACT_FRAGMENT_TYPE;
var Lazy = REACT_LAZY_TYPE;
var Memo = REACT_MEMO_TYPE;
var Portal = REACT_PORTAL_TYPE;
var Profiler = REACT_PROFILER_TYPE;
var StrictMode = REACT_STRICT_MODE_TYPE;
var Suspense = REACT_SUSPENSE_TYPE;

var hasWarnedAboutDeprecatedIsAsyncMode = false;

// AsyncMode should be deprecated
function isAsyncMode(object) {
  {
    if (!hasWarnedAboutDeprecatedIsAsyncMode) {
      hasWarnedAboutDeprecatedIsAsyncMode = true;
      lowPriorityWarning$1(false, 'The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 17+. Update your code to use ' + 'ReactIs.isConcurrentMode() instead. It has the exact same API.');
    }
  }
  return isConcurrentMode(object) || typeOf(object) === REACT_ASYNC_MODE_TYPE;
}
function isConcurrentMode(object) {
  return typeOf(object) === REACT_CONCURRENT_MODE_TYPE;
}
function isContextConsumer(object) {
  return typeOf(object) === REACT_CONTEXT_TYPE;
}
function isContextProvider(object) {
  return typeOf(object) === REACT_PROVIDER_TYPE;
}
function isElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}
function isForwardRef(object) {
  return typeOf(object) === REACT_FORWARD_REF_TYPE;
}
function isFragment(object) {
  return typeOf(object) === REACT_FRAGMENT_TYPE;
}
function isLazy(object) {
  return typeOf(object) === REACT_LAZY_TYPE;
}
function isMemo(object) {
  return typeOf(object) === REACT_MEMO_TYPE;
}
function isPortal(object) {
  return typeOf(object) === REACT_PORTAL_TYPE;
}
function isProfiler(object) {
  return typeOf(object) === REACT_PROFILER_TYPE;
}
function isStrictMode(object) {
  return typeOf(object) === REACT_STRICT_MODE_TYPE;
}
function isSuspense(object) {
  return typeOf(object) === REACT_SUSPENSE_TYPE;
}

exports.typeOf = typeOf;
exports.AsyncMode = AsyncMode;
exports.ConcurrentMode = ConcurrentMode;
exports.ContextConsumer = ContextConsumer;
exports.ContextProvider = ContextProvider;
exports.Element = Element;
exports.ForwardRef = ForwardRef;
exports.Fragment = Fragment;
exports.Lazy = Lazy;
exports.Memo = Memo;
exports.Portal = Portal;
exports.Profiler = Profiler;
exports.StrictMode = StrictMode;
exports.Suspense = Suspense;
exports.isValidElementType = isValidElementType;
exports.isAsyncMode = isAsyncMode;
exports.isConcurrentMode = isConcurrentMode;
exports.isContextConsumer = isContextConsumer;
exports.isContextProvider = isContextProvider;
exports.isElement = isElement;
exports.isForwardRef = isForwardRef;
exports.isFragment = isFragment;
exports.isLazy = isLazy;
exports.isMemo = isMemo;
exports.isPortal = isPortal;
exports.isProfiler = isProfiler;
exports.isStrictMode = isStrictMode;
exports.isSuspense = isSuspense;
  })();
}


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactIs = __webpack_require__(199);
var assign = __webpack_require__(202);

var ReactPropTypesSecret = __webpack_require__(203);
var checkPropTypes = __webpack_require__(204);

var has = Function.call.bind(Object.prototype.hasOwnProperty);
var printWarning = function() {};

if (true) {
  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

function emptyFunctionThatReturnsNull() {
  return null;
}

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    elementType: createElementTypeTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (true) {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          var err = new Error(
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
          err.name = 'Invariant Violation';
          throw err;
        } else if ( true && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            printWarning(
              'You are manually calling a React.PropTypes validation ' +
              'function for the `' + propFullName + '` prop on `' + componentName  + '`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.'
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunctionThatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!ReactIs.isValidElementType(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement type.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      if (true) {
        if (arguments.length > 1) {
          printWarning(
            'Invalid arguments supplied to oneOf, expected an array, got ' + arguments.length + ' arguments. ' +
            'A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z]).'
          );
        } else {
          printWarning('Invalid argument supplied to oneOf, expected an array.');
        }
      }
      return emptyFunctionThatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues, function replacer(key, value) {
        var type = getPreciseType(value);
        if (type === 'symbol') {
          return String(value);
        }
        return value;
      });
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + String(propValue) + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (has(propValue, key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
       true ? printWarning('Invalid argument supplied to oneOfType, expected an instance of array.') : undefined;
      return emptyFunctionThatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        printWarning(
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received ' + getPostfixForTypeWarning(checker) + ' at index ' + i + '.'
        );
        return emptyFunctionThatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // falsy value can't be a Symbol
    if (!propValue) {
      return false;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.resetWarningCache = checkPropTypes.resetWarningCache;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var printWarning = function() {};

if (true) {
  var ReactPropTypesSecret = __webpack_require__(203);
  var loggedTypeFailures = {};
  var has = Function.call.bind(Object.prototype.hasOwnProperty);

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (true) {
    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          );
        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

/**
 * Resets warning cache when testing.
 *
 * @private
 */
checkPropTypes.resetWarningCache = function() {
  if (true) {
    loggedTypeFailures = {};
  }
}

module.exports = checkPropTypes;


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview HTML special characters should be escaped.
 * @author Patrick Hayes
 */



const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

// NOTE: '<' and '{' are also problematic characters, but they do not need
// to be included here because it is a syntax error when these characters are
// included accidentally.
const DEFAULTS = [{
  char: '>',
  alternatives: ['&gt;']
}, {
  char: '"',
  alternatives: ['&quot;', '&ldquo;', '&#34;', '&rdquo;']
}, {
  char: '\'',
  alternatives: ['&apos;', '&lsquo;', '&#39;', '&rsquo;']
}, {
  char: '}',
  alternatives: ['&#125;']
}];

module.exports = {
  meta: {
    docs: {
      description: 'Detect unescaped HTML entities, which might represent malformed tags',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('no-unescaped-entities')
    },
    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            oneOf: [{
              type: 'string'
            }, {
              type: 'object',
              properties: {
                char: {
                  type: 'string'
                },
                alternatives: {
                  type: 'array',
                  uniqueItems: true,
                  items: {
                    type: 'string'
                  }
                }
              }
            }]
          }
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    function reportInvalidEntity(node) {
      const configuration = context.options[0] || {};
      const entities = configuration.forbid || DEFAULTS;

      // HTML entites are already escaped in node.value (as well as node.raw),
      // so pull the raw text from context.getSourceCode()
      for (let i = node.loc.start.line; i <= node.loc.end.line; i++) {
        let rawLine = context.getSourceCode().lines[i - 1];
        let start = 0;
        let end = rawLine.length;
        if (i === node.loc.start.line) {
          start = node.loc.start.column;
        }
        if (i === node.loc.end.line) {
          end = node.loc.end.column;
        }
        rawLine = rawLine.substring(start, end);
        for (let j = 0; j < entities.length; j++) {
          for (let index = 0; index < rawLine.length; index++) {
            const c = rawLine[index];
            if (typeof entities[j] === 'string') {
              if (c === entities[j]) {
                context.report({
                  loc: {line: i, column: start + index},
                  message: `HTML entity, \`${entities[j]}\` , must be escaped.`,
                  node
                });
              }
            } else if (c === entities[j].char) {
              context.report({
                loc: {line: i, column: start + index},
                message: `\`${entities[j].char}\` can be escaped with ${entities[j].alternatives.map(alt => `\`${alt}\``).join(', ')}.`,
                node
              });
            }
          }
        }
      }
    }

    return {
      'Literal, JSXText': function (node) {
        if (jsxUtil.isJSX(node.parent)) {
          reportInvalidEntity(node);
        }
      }
    };
  }
};


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of unknown DOM property
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  ignore: []
};

const UNKNOWN_MESSAGE = 'Unknown property \'{{name}}\' found, use \'{{standardName}}\' instead';
const WRONG_TAG_MESSAGE = 'Invalid property \'{{name}}\' found on tag \'{{tagName}}\', but it is only allowed on: {{allowedTags}}';

const DOM_ATTRIBUTE_NAMES = {
  'accept-charset': 'acceptCharset',
  class: 'className',
  for: 'htmlFor',
  'http-equiv': 'httpEquiv',
  crossorigin: 'crossOrigin'
};

const ATTRIBUTE_TAGS_MAP = {
  crossOrigin: ['script', 'img', 'video', 'audio', 'link']
};

const SVGDOM_ATTRIBUTE_NAMES = {
  'accent-height': 'accentHeight',
  'alignment-baseline': 'alignmentBaseline',
  'arabic-form': 'arabicForm',
  'baseline-shift': 'baselineShift',
  'cap-height': 'capHeight',
  'clip-path': 'clipPath',
  'clip-rule': 'clipRule',
  'color-interpolation': 'colorInterpolation',
  'color-interpolation-filters': 'colorInterpolationFilters',
  'color-profile': 'colorProfile',
  'color-rendering': 'colorRendering',
  'dominant-baseline': 'dominantBaseline',
  'enable-background': 'enableBackground',
  'fill-opacity': 'fillOpacity',
  'fill-rule': 'fillRule',
  'flood-color': 'floodColor',
  'flood-opacity': 'floodOpacity',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-size-adjust': 'fontSizeAdjust',
  'font-stretch': 'fontStretch',
  'font-style': 'fontStyle',
  'font-variant': 'fontVariant',
  'font-weight': 'fontWeight',
  'glyph-name': 'glyphName',
  'glyph-orientation-horizontal': 'glyphOrientationHorizontal',
  'glyph-orientation-vertical': 'glyphOrientationVertical',
  'horiz-adv-x': 'horizAdvX',
  'horiz-origin-x': 'horizOriginX',
  'image-rendering': 'imageRendering',
  'letter-spacing': 'letterSpacing',
  'lighting-color': 'lightingColor',
  'marker-end': 'markerEnd',
  'marker-mid': 'markerMid',
  'marker-start': 'markerStart',
  'overline-position': 'overlinePosition',
  'overline-thickness': 'overlineThickness',
  'paint-order': 'paintOrder',
  'panose-1': 'panose1',
  'pointer-events': 'pointerEvents',
  'rendering-intent': 'renderingIntent',
  'shape-rendering': 'shapeRendering',
  'stop-color': 'stopColor',
  'stop-opacity': 'stopOpacity',
  'strikethrough-position': 'strikethroughPosition',
  'strikethrough-thickness': 'strikethroughThickness',
  'stroke-dasharray': 'strokeDasharray',
  'stroke-dashoffset': 'strokeDashoffset',
  'stroke-linecap': 'strokeLinecap',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-miterlimit': 'strokeMiterlimit',
  'stroke-opacity': 'strokeOpacity',
  'stroke-width': 'strokeWidth',
  'text-anchor': 'textAnchor',
  'text-decoration': 'textDecoration',
  'text-rendering': 'textRendering',
  'underline-position': 'underlinePosition',
  'underline-thickness': 'underlineThickness',
  'unicode-bidi': 'unicodeBidi',
  'unicode-range': 'unicodeRange',
  'units-per-em': 'unitsPerEm',
  'v-alphabetic': 'vAlphabetic',
  'v-hanging': 'vHanging',
  'v-ideographic': 'vIdeographic',
  'v-mathematical': 'vMathematical',
  'vector-effect': 'vectorEffect',
  'vert-adv-y': 'vertAdvY',
  'vert-origin-x': 'vertOriginX',
  'vert-origin-y': 'vertOriginY',
  'word-spacing': 'wordSpacing',
  'writing-mode': 'writingMode',
  'x-height': 'xHeight',
  'xlink:actuate': 'xlinkActuate',
  'xlink:arcrole': 'xlinkArcrole',
  'xlink:href': 'xlinkHref',
  'xlink:role': 'xlinkRole',
  'xlink:show': 'xlinkShow',
  'xlink:title': 'xlinkTitle',
  'xlink:type': 'xlinkType',
  'xml:base': 'xmlBase',
  'xml:lang': 'xmlLang',
  'xml:space': 'xmlSpace'
};

const DOM_PROPERTY_NAMES = [
  // Standard
  'acceptCharset', 'accessKey', 'allowFullScreen', 'allowTransparency', 'autoComplete', 'autoFocus', 'autoPlay',
  'cellPadding', 'cellSpacing', 'classID', 'className', 'colSpan', 'contentEditable', 'contextMenu',
  'dateTime', 'encType', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget',
  'frameBorder', 'hrefLang', 'htmlFor', 'httpEquiv', 'inputMode', 'keyParams', 'keyType', 'marginHeight', 'marginWidth',
  'maxLength', 'mediaGroup', 'minLength', 'noValidate', 'onAnimationEnd', 'onAnimationIteration', 'onAnimationStart',
  'onBlur', 'onChange', 'onClick', 'onContextMenu', 'onCopy', 'onCompositionEnd', 'onCompositionStart',
  'onCompositionUpdate', 'onCut', 'onDoubleClick', 'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave',
  'onError', 'onFocus', 'onInput', 'onKeyDown', 'onKeyPress', 'onKeyUp', 'onLoad', 'onWheel', 'onDragOver',
  'onDragStart', 'onDrop', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseOut', 'onMouseOver',
  'onMouseUp', 'onPaste', 'onScroll', 'onSelect', 'onSubmit', 'onTransitionEnd', 'radioGroup', 'readOnly', 'rowSpan',
  'spellCheck', 'srcDoc', 'srcLang', 'srcSet', 'tabIndex', 'useMap',
  // Non standard
  'autoCapitalize', 'autoCorrect',
  'autoSave',
  'itemProp', 'itemScope', 'itemType', 'itemRef', 'itemID'
];

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

/**
 * Checks if a node matches the JSX tag convention.
 * @param {Object} node - JSX element being tested.
 * @returns {boolean} Whether or not the node name match the JSX tag convention.
 */
const tagConvention = /^[a-z][^-]*$/;
function isTagName(node) {
  if (tagConvention.test(node.parent.name.name)) {
    // http://www.w3.org/TR/custom-elements/#type-extension-semantics
    return !node.parent.attributes.some(attrNode => (
      attrNode.type === 'JSXAttribute' &&
        attrNode.name.type === 'JSXIdentifier' &&
        attrNode.name.name === 'is'
    ));
  }
  return false;
}

/**
 * Extracts the tag name for the JSXAttribute
 * @param {JSXAttribute} node - JSXAttribute being tested.
 * @returns {String|null} tag name
 */
function getTagName(node) {
  if (node && node.parent && node.parent.name && node.parent.name) {
    return node.parent.name.name;
  }
  return null;
}

/**
 * Test wether the tag name for the JSXAttribute is
 * something like <Foo.bar />
 * @param {JSXAttribute} node - JSXAttribute being tested.
 * @returns {Boolean} result
 */
function tagNameHasDot(node) {
  return !!(
    node.parent &&
    node.parent.name &&
    node.parent.name.type === 'JSXMemberExpression'
  );
}

/**
 * Get the standard name of the attribute.
 * @param {String} name - Name of the attribute.
 * @returns {String} The standard name of the attribute.
 */
function getStandardName(name) {
  if (DOM_ATTRIBUTE_NAMES[name]) {
    return DOM_ATTRIBUTE_NAMES[name];
  }
  if (SVGDOM_ATTRIBUTE_NAMES[name]) {
    return SVGDOM_ATTRIBUTE_NAMES[name];
  }
  let i = -1;
  const found = DOM_PROPERTY_NAMES.some((element, index) => {
    i = index;
    return element.toLowerCase() === name;
  });
  return found ? DOM_PROPERTY_NAMES[i] : null;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of unknown DOM property',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('no-unknown-property')
    },
    fixable: 'code',

    schema: [{
      type: 'object',
      properties: {
        ignore: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    function getIgnoreConfig() {
      return context.options[0] && context.options[0].ignore || DEFAULTS.ignore;
    }

    return {
      JSXAttribute(node) {
        const ignoreNames = getIgnoreConfig();
        const name = context.getSourceCode().getText(node.name);
        if (ignoreNames.indexOf(name) >= 0) {
          return;
        }

        // Ignore tags like <Foo.bar />
        if (tagNameHasDot(node)) {
          return;
        }

        const tagName = getTagName(node);
        const allowedTags = ATTRIBUTE_TAGS_MAP[name];
        if (tagName && allowedTags && /[^A-Z]/.test(tagName.charAt(0)) && allowedTags.indexOf(tagName) === -1) {
          context.report({
            node,
            message: WRONG_TAG_MESSAGE,
            data: {
              name,
              tagName,
              allowedTags: allowedTags.join(', ')
            }
          });
        }

        const standardName = getStandardName(name);
        if (!isTagName(node) || !standardName) {
          return;
        }
        context.report({
          node,
          message: UNKNOWN_MESSAGE,
          data: {
            name,
            standardName
          },
          fix(fixer) {
            return fixer.replaceText(node.name, standardName);
          }
        });
      }
    };
  }
};


/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of unsafe lifecycle methods
 * @author Sergei Startsev
 */



const Components = __webpack_require__(50);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);
const versionUtil = __webpack_require__(71);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of unsafe lifecycle methods',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unsafe')
    },
    schema: [
      {
        type: 'object',
        properties: {
          checkAliases: {
            default: false,
            type: 'boolean'
          }
        },
        additionalProperties: false
      }
    ]
  },

  create: Components.detect((context, components, utils) => {
    const config = context.options[0] || {};
    const checkAliases = config.checkAliases || false;

    const isApplicable = versionUtil.testReactVersion(context, '16.3.0');
    if (!isApplicable) {
      return {};
    }

    const unsafe = {
      UNSAFE_componentWillMount: {
        newMethod: 'componentDidMount',
        details:
          'See https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html.'
      },
      UNSAFE_componentWillReceiveProps: {
        newMethod: 'getDerivedStateFromProps',
        details:
          'See https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html.'
      },
      UNSAFE_componentWillUpdate: {
        newMethod: 'componentDidUpdate',
        details:
          'See https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html.'
      }
    };
    if (checkAliases) {
      unsafe.componentWillMount = unsafe.UNSAFE_componentWillMount;
      unsafe.componentWillReceiveProps = unsafe.UNSAFE_componentWillReceiveProps;
      unsafe.componentWillUpdate = unsafe.UNSAFE_componentWillUpdate;
    }

    /**
     * Returns a list of unsafe methods
     * @returns {Array} A list of unsafe methods
     */
    function getUnsafeMethods() {
      return Object.keys(unsafe);
    }

    /**
     * Checks if a passed method is unsafe
     * @param {string} method Life cycle method
     * @returns {boolean} Returns true for unsafe methods, otherwise returns false
     */
    function isUnsafe(method) {
      const unsafeMethods = getUnsafeMethods();
      return unsafeMethods.indexOf(method) !== -1;
    }

    /**
     * Reports the error for an unsafe method
     * @param {ASTNode} node The AST node being checked
     * @param {string} method Life cycle method
     */
    function checkUnsafe(node, method) {
      if (!isUnsafe(method)) {
        return;
      }

      const meta = unsafe[method];
      const newMethod = meta.newMethod;
      const details = meta.details;

      context.report({
        node,
        message: `${method} is unsafe for use in async rendering. Update the component to use ${newMethod} instead. ${details}`
      });
    }

    /**
     * Returns life cycle methods if available
     * @param {ASTNode} node The AST node being checked.
     * @returns {Array} The array of methods.
     */
    function getLifeCycleMethods(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.map(property => astUtil.getPropertyName(property));
    }

    /**
     * Checks life cycle methods
     * @param {ASTNode} node The AST node being checked.
     */
    function checkLifeCycleMethods(node) {
      if (utils.isES5Component(node) || utils.isES6Component(node)) {
        const methods = getLifeCycleMethods(node);
        methods.forEach(method => checkUnsafe(node, method));
      }
    }

    return {
      ClassDeclaration: checkLifeCycleMethods,
      ClassExpression: checkLifeCycleMethods,
      ObjectExpression: checkLifeCycleMethods
    };
  })
};


/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent definitions of unused prop types
 * @author Evgueni Naverniouk
 */



// As for exceptions for props.children or props.className (and alike) look at
// https://github.com/yannickcr/eslint-plugin-react/issues/7

const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent definitions of unused prop types',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unused-prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        customValidators: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        skipShapeProps: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const defaults = {skipShapeProps: true, customValidators: []};
    const configuration = Object.assign({}, defaults, context.options[0] || {});
    const UNUSED_MESSAGE = '\'{{name}}\' PropType is defined but prop is never used';

    /**
     * Checks if the component must be validated
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component must be validated, false if not.
     */
    function mustBeValidated(component) {
      return Boolean(
        component &&
        !component.ignoreUnusedPropTypesValidation
      );
    }

    /**
     * Checks if a prop is used
     * @param {ASTNode} node The AST node being checked.
     * @param {Object} prop Declared prop object
     * @returns {Boolean} True if the prop is used, false if not.
     */
    function isPropUsed(node, prop) {
      const usedPropTypes = node.usedPropTypes || [];
      for (let i = 0, l = usedPropTypes.length; i < l; i++) {
        const usedProp = usedPropTypes[i];
        if (
          prop.type === 'shape' ||
          prop.name === '__ANY_KEY__' ||
          usedProp.name === prop.name
        ) {
          return true;
        }
      }

      return false;
    }

    /**
     * Used to recursively loop through each declared prop type
     * @param {Object} component The component to process
     * @param {ASTNode[]|true} props List of props to validate
     */
    function reportUnusedPropType(component, props) {
      // Skip props that check instances
      if (props === true) {
        return;
      }

      Object.keys(props || {}).forEach((key) => {
        const prop = props[key];
        // Skip props that check instances
        if (prop === true) {
          return;
        }

        if (prop.type === 'shape' && configuration.skipShapeProps) {
          return;
        }

        if (prop.node && !isPropUsed(component, prop)) {
          context.report({
            node: prop.node.value || prop.node,
            message: UNUSED_MESSAGE,
            data: {
              name: prop.fullName
            }
          });
        }

        if (prop.children) {
          reportUnusedPropType(component, prop.children);
        }
      });
    }

    /**
     * Reports unused proptypes for a given component
     * @param {Object} component The component to process
     */
    function reportUnusedPropTypes(component) {
      reportUnusedPropType(component, component.declaredPropTypes);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        const list = components.list();
        // Report undeclared proptypes for all classes
        Object.keys(list).filter(component => mustBeValidated(list[component])).forEach((component) => {
          if (!mustBeValidated(list[component])) {
            return;
          }
          reportUnusedPropTypes(list[component]);
        });
      }
    };
  })
};


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview  Attempts to discover all state fields in a React component and
 * warn if any of them are never read.
 *
 * State field definitions are collected from `this.state = {}` assignments in
 * the constructor, objects passed to `this.setState()`, and `state = {}` class
 * property assignments.
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// Descend through all wrapping TypeCastExpressions and return the expression
// that was cast.
function uncast(node) {
  while (node.type === 'TypeCastExpression') {
    node = node.expression;
  }
  return node;
}

// Return the name of an identifier or the string value of a literal. Useful
// anywhere that a literal may be used as a key (e.g., member expressions,
// method definitions, ObjectExpression property keys).
function getName(node) {
  node = uncast(node);
  const type = node.type;

  if (type === 'Identifier') {
    return node.name;
  }
  if (type === 'Literal') {
    return String(node.value);
  }
  if (type === 'TemplateLiteral' && node.expressions.length === 0) {
    return node.quasis[0].value.raw;
  }
  return null;
}

function isThisExpression(node) {
  return uncast(node).type === 'ThisExpression';
}

function getInitialClassInfo() {
  return {
    // Set of nodes where state fields were defined.
    stateFields: new Set(),

    // Set of names of state fields that we've seen used.
    usedStateFields: new Set(),

    // Names of local variables that may be pointing to this.state. To
    // track this properly, we would need to keep track of all locals,
    // shadowing, assignments, etc. To keep things simple, we only
    // maintain one set of aliases per method and accept that it will
    // produce some false negatives.
    aliases: null
  };
}

function isSetStateCall(node) {
  return (
    node.callee.type === 'MemberExpression' &&
    isThisExpression(node.callee.object) &&
    getName(node.callee.property) === 'setState'
  );
}

module.exports = {
  meta: {
    docs: {
      description: 'Prevent definition of unused state fields',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-unused-state')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => {
    // Non-null when we are inside a React component ClassDeclaration and we have
    // not yet encountered any use of this.state which we have chosen not to
    // analyze. If we encounter any such usage (like this.state being spread as
    // JSX attributes), then this is again set to null.
    let classInfo = null;

    function isStateParameterReference(node) {
      const classMethods = [
        'shouldComponentUpdate',
        'componentWillUpdate',
        'UNSAFE_componentWillUpdate',
        'getSnapshotBeforeUpdate',
        'componentDidUpdate'
      ];

      let scope = context.getScope();
      while (scope) {
        const parent = scope.block && scope.block.parent;
        if (
          parent &&
          parent.type === 'MethodDefinition' && (
            parent.static && parent.key.name === 'getDerivedStateFromProps' ||
            classMethods.indexOf(parent.key.name) !== -1
          ) &&
          parent.value.type === 'FunctionExpression' &&
          parent.value.params[1] &&
          parent.value.params[1].name === node.name
        ) {
          return true;
        }
        scope = scope.upper;
      }

      return false;
    }

    // Returns true if the given node is possibly a reference to `this.state` or the state parameter of
    // a lifecycle method.
    function isStateReference(node) {
      node = uncast(node);

      const isDirectStateReference = node.type === 'MemberExpression' &&
        isThisExpression(node.object) &&
        node.property.name === 'state';

      const isAliasedStateReference = node.type === 'Identifier' &&
        classInfo.aliases &&
        classInfo.aliases.has(node.name);

      return isDirectStateReference || isAliasedStateReference || isStateParameterReference(node);
    }

    // Takes an ObjectExpression node and adds all named Property nodes to the
    // current set of state fields.
    function addStateFields(node) {
      for (const prop of node.properties) {
        const key = prop.key;

        if (
          prop.type === 'Property' &&
          (key.type === 'Literal' ||
          (key.type === 'TemplateLiteral' && key.expressions.length === 0) ||
          (prop.computed === false && key.type === 'Identifier')) &&
          getName(prop.key) !== null
        ) {
          classInfo.stateFields.add(prop);
        }
      }
    }

    // Adds the name of the given node as a used state field if the node is an
    // Identifier or a Literal. Other node types are ignored.
    function addUsedStateField(node) {
      const name = getName(node);
      if (name) {
        classInfo.usedStateFields.add(name);
      }
    }

    // Records used state fields and new aliases for an ObjectPattern which
    // destructures `this.state`.
    function handleStateDestructuring(node) {
      for (const prop of node.properties) {
        if (prop.type === 'Property') {
          addUsedStateField(prop.key);
        } else if (
          (prop.type === 'ExperimentalRestProperty' || prop.type === 'RestElement') &&
          classInfo.aliases
        ) {
          classInfo.aliases.add(getName(prop.argument));
        }
      }
    }

    // Used to record used state fields and new aliases for both
    // AssignmentExpressions and VariableDeclarators.
    function handleAssignment(left, right) {
      switch (left.type) {
        case 'Identifier':
          if (isStateReference(right) && classInfo.aliases) {
            classInfo.aliases.add(left.name);
          }
          break;
        case 'ObjectPattern':
          if (isStateReference(right)) {
            handleStateDestructuring(left);
          } else if (isThisExpression(right) && classInfo.aliases) {
            for (const prop of left.properties) {
              if (prop.type === 'Property' && getName(prop.key) === 'state') {
                const name = getName(prop.value);
                if (name) {
                  classInfo.aliases.add(name);
                } else if (prop.value.type === 'ObjectPattern') {
                  handleStateDestructuring(prop.value);
                }
              }
            }
          }
          break;
        default:
        // pass
      }
    }

    function reportUnusedFields() {
      // Report all unused state fields.
      for (const node of classInfo.stateFields) {
        const name = getName(node.key);
        if (!classInfo.usedStateFields.has(name)) {
          context.report({
            node,
            message: `Unused state field: '${name}'`
          });
        }
      }
    }

    return {
      ClassDeclaration(node) {
        if (utils.isES6Component(node)) {
          classInfo = getInitialClassInfo();
        }
      },

      ObjectExpression(node) {
        if (utils.isES5Component(node)) {
          classInfo = getInitialClassInfo();
        }
      },

      'ObjectExpression:exit': function (node) {
        if (!classInfo) {
          return;
        }

        if (utils.isES5Component(node)) {
          reportUnusedFields();
          classInfo = null;
        }
      },

      'ClassDeclaration:exit': function () {
        if (!classInfo) {
          return;
        }
        reportUnusedFields();
        classInfo = null;
      },

      CallExpression(node) {
        if (!classInfo) {
          return;
        }
        // If we're looking at a `this.setState({})` invocation, record all the
        // properties as state fields.
        if (
          isSetStateCall(node) &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'ObjectExpression'
        ) {
          addStateFields(node.arguments[0]);
        } else if (
          isSetStateCall(node) &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'ArrowFunctionExpression'
        ) {
          if (node.arguments[0].body.type === 'ObjectExpression') {
            addStateFields(node.arguments[0].body);
          }
          if (node.arguments[0].params.length > 0 && classInfo.aliases) {
            const firstParam = node.arguments[0].params[0];
            if (firstParam.type === 'ObjectPattern') {
              handleStateDestructuring(firstParam);
            } else {
              classInfo.aliases.add(getName(firstParam));
            }
          }
        }
      },

      ClassProperty(node) {
        if (!classInfo) {
          return;
        }
        // If we see state being assigned as a class property using an object
        // expression, record all the fields of that object as state fields.
        if (
          getName(node.key) === 'state' &&
          !node.static &&
          node.value &&
          node.value.type === 'ObjectExpression'
        ) {
          addStateFields(node.value);
        }

        if (
          !node.static &&
          node.value &&
          node.value.type === 'ArrowFunctionExpression'
        ) {
          // Create a new set for this.state aliases local to this method.
          classInfo.aliases = new Set();
        }
      },

      'ClassProperty:exit': function (node) {
        if (
          classInfo &&
          !node.static &&
          node.value &&
          node.value.type === 'ArrowFunctionExpression'
        ) {
          // Forget our set of local aliases.
          classInfo.aliases = null;
        }
      },

      MethodDefinition() {
        if (!classInfo) {
          return;
        }
        // Create a new set for this.state aliases local to this method.
        classInfo.aliases = new Set();
      },

      'MethodDefinition:exit': function () {
        if (!classInfo) {
          return;
        }
        // Forget our set of local aliases.
        classInfo.aliases = null;
      },

      FunctionExpression(node) {
        if (!classInfo) {
          return;
        }

        const parent = node.parent;
        if (!utils.isES5Component(parent.parent)) {
          return;
        }

        if (parent.key.name === 'getInitialState') {
          const body = node.body.body;
          const lastBodyNode = body[body.length - 1];

          if (
            lastBodyNode.type === 'ReturnStatement' &&
            lastBodyNode.argument.type === 'ObjectExpression'
          ) {
            addStateFields(lastBodyNode.argument);
          }
        } else {
          // Create a new set for this.state aliases local to this method.
          classInfo.aliases = new Set();
        }
      },

      AssignmentExpression(node) {
        if (!classInfo) {
          return;
        }
        // Check for assignments like `this.state = {}`
        if (
          node.left.type === 'MemberExpression' &&
          isThisExpression(node.left.object) &&
          getName(node.left.property) === 'state' &&
          node.right.type === 'ObjectExpression'
        ) {
          // Find the nearest function expression containing this assignment.
          let fn = node;
          while (fn.type !== 'FunctionExpression' && fn.parent) {
            fn = fn.parent;
          }
          // If the nearest containing function is the constructor, then we want
          // to record all the assigned properties as state fields.
          if (
            fn.parent &&
            fn.parent.type === 'MethodDefinition' &&
            fn.parent.kind === 'constructor'
          ) {
            addStateFields(node.right);
          }
        } else {
          // Check for assignments like `alias = this.state` and record the alias.
          handleAssignment(node.left, node.right);
        }
      },

      VariableDeclarator(node) {
        if (!classInfo || !node.init) {
          return;
        }
        handleAssignment(node.id, node.init);
      },

      MemberExpression(node) {
        if (!classInfo) {
          return;
        }
        if (isStateReference(node.object)) {
          // If we see this.state[foo] access, give up.
          if (node.computed && node.property.type !== 'Literal') {
            classInfo = null;
            return;
          }
          // Otherwise, record that we saw this property being accessed.
          addUsedStateField(node.property);
        // If we see a `this.state` access in a CallExpression, give up.
        } else if (isStateReference(node) && node.parent.type === 'CallExpression') {
          classInfo = null;
        }
      },

      JSXSpreadAttribute(node) {
        if (classInfo && isStateReference(node.argument)) {
          classInfo = null;
        }
      },

      'ExperimentalSpreadProperty, SpreadElement': function (node) {
        if (classInfo && isStateReference(node.argument)) {
          classInfo = null;
        }
      }
    };
  })
};


/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent usage of setState in componentWillUpdate
 * @author Yannick Croissant
 */



const makeNoMethodSetStateRule = __webpack_require__(186);
const versionUtil = __webpack_require__(71);

module.exports = makeNoMethodSetStateRule(
  'componentWillUpdate',
  context => versionUtil.testReactVersion(context, '16.3.0')
);


/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce ES5 or ES6 class for React Components
 * @author Dan Hamilton
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce ES5 or ES6 class for React Components',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('prefer-es6-class')
    },

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || 'always';

    return {
      ObjectExpression(node) {
        if (utils.isES5Component(node) && configuration === 'always') {
          context.report({
            node,
            message: 'Component should use es6 class instead of createClass'
          });
        }
      },
      ClassDeclaration(node) {
        if (utils.isES6Component(node) && configuration === 'never') {
          context.report({
            node,
            message: 'Component should use createClass instead of es6 class'
          });
        }
      }
    };
  })
};


/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Require component props to be typed as read-only.
 * @author Luke Zapart
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

function isFlowPropertyType(node) {
  return node.type === 'ObjectTypeProperty';
}

function isCovariant(node) {
  return node.variance && node.variance.kind === 'plus';
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Require read-only props.',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('prefer-read-only-props')
    },
    fixable: 'code',
    schema: []
  },

  create: Components.detect((context, components) => ({
    'Program:exit': function () {
      const list = components.list();

      Object.keys(list).forEach((key) => {
        const component = list[key];

        if (!component.declaredPropTypes) {
          return;
        }

        Object.keys(component.declaredPropTypes).forEach((propName) => {
          const prop = component.declaredPropTypes[propName];

          if (!isFlowPropertyType(prop.node)) {
            return;
          }

          if (!isCovariant(prop.node)) {
            context.report({
              node: prop.node,
              message: 'Prop \'{{propName}}\' should be read-only.',
              data: {
                propName
              },
              fix: (fixer) => {
                if (!prop.node.variance) {
                  // Insert covariance
                  return fixer.insertTextBefore(prop.node, '+');
                }

                // Replace contravariance with covariance
                return fixer.replaceText(prop.node.variance, '+');
              }
            });
          }
        });
      });
    }
  }))
};


/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce stateless components to be written as a pure function
 * @author Yannick Croissant
 * @author Alberto Rodríguez
 * @copyright 2015 Alberto Rodríguez. All rights reserved.
 */



const Components = __webpack_require__(50);
const versionUtil = __webpack_require__(71);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce stateless components to be written as a pure function',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('prefer-stateless-function')
    },
    schema: [{
      type: 'object',
      properties: {
        ignorePureComponents: {
          default: false,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || {};
    const ignorePureComponents = configuration.ignorePureComponents || false;

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    /**
     * Checks whether a given array of statements is a single call of `super`.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode[]} body - An array of statements to check.
     * @returns {boolean} `true` if the body is a single call of `super`.
     */
    function isSingleSuperCall(body) {
      return (
        body.length === 1 &&
        body[0].type === 'ExpressionStatement' &&
        body[0].expression.type === 'CallExpression' &&
        body[0].expression.callee.type === 'Super'
      );
    }

    /**
     * Checks whether a given node is a pattern which doesn't have any side effects.
     * Default parameters and Destructuring parameters can have side effects.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} node - A pattern node.
     * @returns {boolean} `true` if the node doesn't have any side effects.
     */
    function isSimple(node) {
      return node.type === 'Identifier' || node.type === 'RestElement';
    }

    /**
     * Checks whether a given array of expressions is `...arguments` or not.
     * `super(...arguments)` passes all arguments through.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode[]} superArgs - An array of expressions to check.
     * @returns {boolean} `true` if the superArgs is `...arguments`.
     */
    function isSpreadArguments(superArgs) {
      return (
        superArgs.length === 1 &&
        superArgs[0].type === 'SpreadElement' &&
        superArgs[0].argument.type === 'Identifier' &&
        superArgs[0].argument.name === 'arguments'
      );
    }

    /**
     * Checks whether given 2 nodes are identifiers which have the same name or not.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} ctorParam - A node to check.
     * @param {ASTNode} superArg - A node to check.
     * @returns {boolean} `true` if the nodes are identifiers which have the same
     *      name.
     */
    function isValidIdentifierPair(ctorParam, superArg) {
      return (
        ctorParam.type === 'Identifier' &&
        superArg.type === 'Identifier' &&
        ctorParam.name === superArg.name
      );
    }

    /**
     * Checks whether given 2 nodes are a rest/spread pair which has the same values.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} ctorParam - A node to check.
     * @param {ASTNode} superArg - A node to check.
     * @returns {boolean} `true` if the nodes are a rest/spread pair which has the
     *      same values.
     */
    function isValidRestSpreadPair(ctorParam, superArg) {
      return (
        ctorParam.type === 'RestElement' &&
        superArg.type === 'SpreadElement' &&
        isValidIdentifierPair(ctorParam.argument, superArg.argument)
      );
    }

    /**
     * Checks whether given 2 nodes have the same value or not.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode} ctorParam - A node to check.
     * @param {ASTNode} superArg - A node to check.
     * @returns {boolean} `true` if the nodes have the same value or not.
     */
    function isValidPair(ctorParam, superArg) {
      return (
        isValidIdentifierPair(ctorParam, superArg) ||
        isValidRestSpreadPair(ctorParam, superArg)
      );
    }

    /**
     * Checks whether the parameters of a constructor and the arguments of `super()`
     * have the same values or not.
     * @see ESLint no-useless-constructor rule
     * @param {ASTNode[]} ctorParams - The parameters of a constructor to check.
     * @param {ASTNode} superArgs - The arguments of `super()` to check.
     * @returns {boolean} `true` if those have the same values.
     */
    function isPassingThrough(ctorParams, superArgs) {
      if (ctorParams.length !== superArgs.length) {
        return false;
      }

      for (let i = 0; i < ctorParams.length; ++i) {
        if (!isValidPair(ctorParams[i], superArgs[i])) {
          return false;
        }
      }

      return true;
    }

    /**
     * Checks whether the constructor body is a redundant super call.
     * @see ESLint no-useless-constructor rule
     * @param {Array} body - constructor body content.
     * @param {Array} ctorParams - The params to check against super call.
     * @returns {boolean} true if the construtor body is redundant
     */
    function isRedundantSuperCall(body, ctorParams) {
      return (
        isSingleSuperCall(body) &&
        ctorParams.every(isSimple) &&
        (
          isSpreadArguments(body[0].expression.arguments) ||
          isPassingThrough(ctorParams, body[0].expression.arguments)
        )
      );
    }

    /**
     * Check if a given AST node have any other properties the ones available in stateless components
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if the node has at least one other property, false if not.
     */
    function hasOtherProperties(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties.some((property) => {
        const name = astUtil.getPropertyName(property);
        const isDisplayName = name === 'displayName';
        const isPropTypes = name === 'propTypes' || name === 'props' && property.typeAnnotation;
        const contextTypes = name === 'contextTypes';
        const defaultProps = name === 'defaultProps';
        const isUselessConstructor = property.kind === 'constructor' &&
          isRedundantSuperCall(property.value.body.body, property.value.params);
        const isRender = name === 'render';
        return !isDisplayName && !isPropTypes && !contextTypes && !defaultProps && !isUselessConstructor && !isRender;
      });
    }

    /**
     * Mark component as pure as declared
     * @param {ASTNode} node The AST node being checked.
     */
    const markSCUAsDeclared = function (node) {
      components.set(node, {
        hasSCU: true
      });
    };

    /**
     * Mark childContextTypes as declared
     * @param {ASTNode} node The AST node being checked.
     */
    const markChildContextTypesAsDeclared = function (node) {
      components.set(node, {
        hasChildContextTypes: true
      });
    };

    /**
     * Mark a setState as used
     * @param {ASTNode} node The AST node being checked.
     */
    function markThisAsUsed(node) {
      components.set(node, {
        useThis: true
      });
    }

    /**
     * Mark a props or context as used
     * @param {ASTNode} node The AST node being checked.
     */
    function markPropsOrContextAsUsed(node) {
      components.set(node, {
        usePropsOrContext: true
      });
    }

    /**
     * Mark a ref as used
     * @param {ASTNode} node The AST node being checked.
     */
    function markRefAsUsed(node) {
      components.set(node, {
        useRef: true
      });
    }

    /**
     * Mark return as invalid
     * @param {ASTNode} node The AST node being checked.
     */
    function markReturnAsInvalid(node) {
      components.set(node, {
        invalidReturn: true
      });
    }

    /**
     * Mark a ClassDeclaration as having used decorators
     * @param {ASTNode} node The AST node being checked.
     */
    function markDecoratorsAsUsed(node) {
      components.set(node, {
        useDecorators: true
      });
    }

    function visitClass(node) {
      if (ignorePureComponents && utils.isPureComponent(node)) {
        markSCUAsDeclared(node);
      }

      if (node.decorators && node.decorators.length) {
        markDecoratorsAsUsed(node);
      }
    }

    return {
      ClassDeclaration: visitClass,
      ClassExpression: visitClass,

      // Mark `this` destructuring as a usage of `this`
      VariableDeclarator(node) {
        // Ignore destructuring on other than `this`
        if (!node.id || node.id.type !== 'ObjectPattern' || !node.init || node.init.type !== 'ThisExpression') {
          return;
        }
        // Ignore `props` and `context`
        const useThis = node.id.properties.some((property) => {
          const name = astUtil.getPropertyName(property);
          return name !== 'props' && name !== 'context';
        });
        if (!useThis) {
          markPropsOrContextAsUsed(node);
          return;
        }
        markThisAsUsed(node);
      },

      // Mark `this` usage
      MemberExpression(node) {
        if (node.object.type !== 'ThisExpression') {
          if (node.property && node.property.name === 'childContextTypes') {
            const component = utils.getRelatedComponent(node);
            if (!component) {
              return;
            }
            markChildContextTypesAsDeclared(component.node);
          }
          return;
        // Ignore calls to `this.props` and `this.context`
        }
        if (
          (node.property.name || node.property.value) === 'props' ||
          (node.property.name || node.property.value) === 'context'
        ) {
          markPropsOrContextAsUsed(node);
          return;
        }
        markThisAsUsed(node);
      },

      // Mark `ref` usage
      JSXAttribute(node) {
        const name = context.getSourceCode().getText(node.name);
        if (name !== 'ref') {
          return;
        }
        markRefAsUsed(node);
      },

      // Mark `render` that do not return some JSX
      ReturnStatement(node) {
        let blockNode;
        let scope = context.getScope();
        while (scope) {
          blockNode = scope.block && scope.block.parent;
          if (blockNode && (blockNode.type === 'MethodDefinition' || blockNode.type === 'Property')) {
            break;
          }
          scope = scope.upper;
        }
        const isRender = blockNode && blockNode.key && blockNode.key.name === 'render';
        const allowNull = versionUtil.testReactVersion(context, '15.0.0'); // Stateless components can return null since React 15
        const isReturningJSX = utils.isReturningJSX(node, !allowNull);
        const isReturningNull = node.argument && (node.argument.value === null || node.argument.value === false);
        if (
          !isRender ||
          (allowNull && (isReturningJSX || isReturningNull)) ||
          (!allowNull && isReturningJSX)
        ) {
          return;
        }
        markReturnAsInvalid(node);
      },

      'Program:exit': function () {
        const list = components.list();
        Object.keys(list).forEach((component) => {
          if (
            hasOtherProperties(list[component].node) ||
            list[component].useThis ||
            list[component].useRef ||
            list[component].invalidReturn ||
            list[component].hasChildContextTypes ||
            list[component].useDecorators ||
            (!utils.isES5Component(list[component].node) && !utils.isES6Component(list[component].node))
          ) {
            return;
          }

          if (list[component].hasSCU) {
            return;
          }
          context.report({
            node: list[component].node,
            message: 'Component should be written as a pure function'
          });
        });
      }
    };
  })
};


/***/ }),
/* 214 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing props validation in a React component definition
 * @author Yannick Croissant
 */



// As for exceptions for props.children or props.className (and alike) look at
// https://github.com/yannickcr/eslint-plugin-react/issues/7

const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing props validation in a React component definition',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('prop-types')
    },

    schema: [{
      type: 'object',
      properties: {
        ignore: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        customValidators: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        skipUndeclared: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const configuration = context.options[0] || {};
    const ignored = configuration.ignore || [];
    const skipUndeclared = configuration.skipUndeclared || false;

    const MISSING_MESSAGE = '\'{{name}}\' is missing in props validation';

    /**
     * Checks if the prop is ignored
     * @param {String} name Name of the prop to check.
     * @returns {Boolean} True if the prop is ignored, false if not.
     */
    function isIgnored(name) {
      return ignored.indexOf(name) !== -1;
    }

    /**
     * Checks if the component must be validated
     * @param {Object} component The component to process
     * @returns {Boolean} True if the component must be validated, false if not.
     */
    function mustBeValidated(component) {
      const isSkippedByConfig = skipUndeclared && typeof component.declaredPropTypes === 'undefined';
      return Boolean(
        component &&
        component.usedPropTypes &&
        !component.ignorePropsValidation &&
        !isSkippedByConfig
      );
    }

    /**
     * Internal: Checks if the prop is declared
     * @param {Object} declaredPropTypes Description of propTypes declared in the current component
     * @param {String[]} keyList Dot separated name of the prop to check.
     * @returns {Boolean} True if the prop is declared, false if not.
     */
    function internalIsDeclaredInComponent(declaredPropTypes, keyList) {
      for (let i = 0, j = keyList.length; i < j; i++) {
        const key = keyList[i];
        const propType = (
          declaredPropTypes && (
            // Check if this key is declared
            (declaredPropTypes[key] || // If not, check if this type accepts any key
            declaredPropTypes.__ANY_KEY__) // eslint-disable-line no-underscore-dangle
          )
        );

        if (!propType) {
          // If it's a computed property, we can't make any further analysis, but is valid
          return key === '__COMPUTED_PROP__';
        }
        if (typeof propType === 'object' && !propType.type) {
          return true;
        }
        // Consider every children as declared
        if (propType.children === true || propType.containsSpread || propType.containsIndexers) {
          return true;
        }
        if (propType.acceptedProperties) {
          return key in propType.acceptedProperties;
        }
        if (propType.type === 'union') {
          // If we fall in this case, we know there is at least one complex type in the union
          if (i + 1 >= j) {
            // this is the last key, accept everything
            return true;
          }
          // non trivial, check all of them
          const unionTypes = propType.children;
          const unionPropType = {};
          for (let k = 0, z = unionTypes.length; k < z; k++) {
            unionPropType[key] = unionTypes[k];
            const isValid = internalIsDeclaredInComponent(
              unionPropType,
              keyList.slice(i)
            );
            if (isValid) {
              return true;
            }
          }

          // every possible union were invalid
          return false;
        }
        declaredPropTypes = propType.children;
      }
      return true;
    }

    /**
     * Checks if the prop is declared
     * @param {ASTNode} node The AST node being checked.
     * @param {String[]} names List of names of the prop to check.
     * @returns {Boolean} True if the prop is declared, false if not.
     */
    function isDeclaredInComponent(node, names) {
      while (node) {
        const component = components.get(node);

        const isDeclared = component && component.confidence === 2 &&
          internalIsDeclaredInComponent(component.declaredPropTypes || {}, names);
        if (isDeclared) {
          return true;
        }
        node = node.parent;
      }
      return false;
    }

    /**
     * Reports undeclared proptypes for a given component
     * @param {Object} component The component to process
     */
    function reportUndeclaredPropTypes(component) {
      const undeclareds = component.usedPropTypes.filter(propType => (
        propType.node &&
        !isIgnored(propType.allNames[0]) &&
        !isDeclaredInComponent(component.node, propType.allNames)
      ));
      undeclareds.forEach((propType) => {
        context.report({
          node: propType.node,
          message: MISSING_MESSAGE,
          data: {
            name: propType.allNames.join('.').replace(/\.__COMPUTED_PROP__/g, '[]')
          }
        });
      });
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        const list = components.list();
        // Report undeclared proptypes for all classes
        Object.keys(list).filter(component => mustBeValidated(list[component])).forEach((component) => {
          reportUndeclaredPropTypes(list[component]);
        });
      }
    };
  })
};


/***/ }),
/* 215 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent missing React when using JSX
 * @author Glen Mailer
 */



const variableUtil = __webpack_require__(65);
const pragmaUtil = __webpack_require__(66);
const docsUrl = __webpack_require__(124);

// -----------------------------------------------------------------------------
// Rule Definition
// -----------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing React when using JSX',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('react-in-jsx-scope')
    },
    schema: []
  },

  create(context) {
    const pragma = pragmaUtil.getFromContext(context);
    const NOT_DEFINED_MESSAGE = '\'{{name}}\' must be in scope when using JSX';

    function checkIfReactIsInScope(node) {
      const variables = variableUtil.variablesInScope(context);
      if (variableUtil.findVariable(variables, pragma)) {
        return;
      }
      context.report({
        node,
        message: NOT_DEFINED_MESSAGE,
        data: {
          name: pragma
        }
      });
    }

    return {
      JSXOpeningElement: checkIfReactIsInScope,
      JSXOpeningFragment: checkIfReactIsInScope
    };
  }
};


/***/ }),
/* 216 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileOverview Enforce a defaultProps definition for every prop that is not a required prop.
 * @author Vitor Balocco
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);


// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce a defaultProps definition for every prop that is not a required prop.',
      category: 'Best Practices',
      url: docsUrl('require-default-props')
    },

    schema: [{
      type: 'object',
      properties: {
        forbidDefaultForRequired: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const configuration = context.options[0] || {};
    const forbidDefaultForRequired = configuration.forbidDefaultForRequired || false;


    /**
     * Reports all propTypes passed in that don't have a defaultProps counterpart.
     * @param  {Object[]} propTypes    List of propTypes to check.
     * @param  {Object}   defaultProps Object of defaultProps to check. Keys are the props names.
     * @return {void}
     */
    function reportPropTypesWithoutDefault(propTypes, defaultProps) {
      // If this defaultProps is "unresolved", then we should ignore this component and not report
      // any errors for it, to avoid false-positives with e.g. external defaultProps declarations or spread operators.
      if (defaultProps === 'unresolved') {
        return;
      }

      Object.keys(propTypes).forEach((propName) => {
        const prop = propTypes[propName];
        if (prop.isRequired) {
          if (forbidDefaultForRequired && defaultProps[propName]) {
            context.report({
              node: prop.node,
              message: 'propType "{{name}}" is required and should not have a defaultProps declaration.',
              data: {name: propName}
            });
          }
          return;
        }

        if (defaultProps[propName]) {
          return;
        }

        context.report({
          node: prop.node,
          message: 'propType "{{name}}" is not required, but has no corresponding defaultProps declaration.',
          data: {name: propName}
        });
      });
    }

    // --------------------------------------------------------------------------
    // Public API
    // --------------------------------------------------------------------------

    return {
      'Program:exit': function () {
        const list = components.list();

        Object.keys(list).filter(component => list[component].declaredPropTypes).forEach((component) => {
          reportPropTypesWithoutDefault(
            list[component].declaredPropTypes,
            list[component].defaultProps || {}
          );
        });
      }
    };
  })
};


/***/ }),
/* 217 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce React components to have a shouldComponentUpdate method
 * @author Evgueni Naverniouk
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

module.exports = {
  meta: {
    docs: {
      description: 'Enforce React components to have a shouldComponentUpdate method',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('require-optimization')
    },

    schema: [{
      type: 'object',
      properties: {
        allowDecorators: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components, utils) => {
    const MISSING_MESSAGE = 'Component is not optimized. Please add a shouldComponentUpdate method.';
    const configuration = context.options[0] || {};
    const allowDecorators = configuration.allowDecorators || [];

    /**
     * Checks to see if our component is decorated by PureRenderMixin via reactMixin
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if node is decorated with a PureRenderMixin, false if not.
     */
    const hasPureRenderDecorator = function (node) {
      if (node.decorators && node.decorators.length) {
        for (let i = 0, l = node.decorators.length; i < l; i++) {
          if (
            node.decorators[i].expression &&
            node.decorators[i].expression.callee &&
            node.decorators[i].expression.callee.object &&
            node.decorators[i].expression.callee.object.name === 'reactMixin' &&
            node.decorators[i].expression.callee.property &&
            node.decorators[i].expression.callee.property.name === 'decorate' &&
            node.decorators[i].expression.arguments &&
            node.decorators[i].expression.arguments.length &&
            node.decorators[i].expression.arguments[0].name === 'PureRenderMixin'
          ) {
            return true;
          }
        }
      }

      return false;
    };

    /**
     * Checks to see if our component is custom decorated
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if node is decorated name with a custom decorated, false if not.
     */
    const hasCustomDecorator = function (node) {
      const allowLength = allowDecorators.length;

      if (allowLength && node.decorators && node.decorators.length) {
        for (let i = 0; i < allowLength; i++) {
          for (let j = 0, l = node.decorators.length; j < l; j++) {
            if (
              node.decorators[j].expression &&
              node.decorators[j].expression.name === allowDecorators[i]
            ) {
              return true;
            }
          }
        }
      }

      return false;
    };

    /**
     * Checks if we are declaring a shouldComponentUpdate method
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are declaring a shouldComponentUpdate method, false if not.
     */
    const isSCUDeclared = function (node) {
      return Boolean(
        node &&
        node.name === 'shouldComponentUpdate'
      );
    };

    /**
     * Checks if we are declaring a PureRenderMixin mixin
     * @param {ASTNode} node The AST node being checked.
     * @returns {Boolean} True if we are declaring a PureRenderMixin method, false if not.
     */
    const isPureRenderDeclared = function (node) {
      let hasPR = false;
      if (node.value && node.value.elements) {
        for (let i = 0, l = node.value.elements.length; i < l; i++) {
          if (node.value.elements[i] && node.value.elements[i].name === 'PureRenderMixin') {
            hasPR = true;
            break;
          }
        }
      }

      return Boolean(
        node &&
        node.key.name === 'mixins' &&
        hasPR
      );
    };

    /**
     * Mark shouldComponentUpdate as declared
     * @param {ASTNode} node The AST node being checked.
     */
    const markSCUAsDeclared = function (node) {
      components.set(node, {
        hasSCU: true
      });
    };

    /**
     * Reports missing optimization for a given component
     * @param {Object} component The component to process
     */
    const reportMissingOptimization = function (component) {
      context.report({
        node: component.node,
        message: MISSING_MESSAGE,
        data: {
          component: component.name
        }
      });
    };

    /**
     * Checks if we are declaring function in class
     * @returns {Boolean} True if we are declaring function in class, false if not.
     */
    const isFunctionInClass = function () {
      let blockNode;
      let scope = context.getScope();
      while (scope) {
        blockNode = scope.block;
        if (blockNode && blockNode.type === 'ClassDeclaration') {
          return true;
        }
        scope = scope.upper;
      }

      return false;
    };

    return {
      ArrowFunctionExpression(node) {
        // Stateless Functional Components cannot be optimized (yet)
        markSCUAsDeclared(node);
      },

      ClassDeclaration(node) {
        if (!(hasPureRenderDecorator(node) || hasCustomDecorator(node) || utils.isPureComponent(node))) {
          return;
        }
        markSCUAsDeclared(node);
      },

      FunctionDeclaration(node) {
        // Skip if the function is declared in the class
        if (isFunctionInClass()) {
          return;
        }
        // Stateless Functional Components cannot be optimized (yet)
        markSCUAsDeclared(node);
      },

      FunctionExpression(node) {
        // Skip if the function is declared in the class
        if (isFunctionInClass()) {
          return;
        }
        // Stateless Functional Components cannot be optimized (yet)
        markSCUAsDeclared(node);
      },

      MethodDefinition(node) {
        if (!isSCUDeclared(node.key)) {
          return;
        }
        markSCUAsDeclared(node);
      },

      ObjectExpression(node) {
        // Search for the shouldComponentUpdate declaration
        const found = node.properties.some(property => (
          property.key &&
          (isSCUDeclared(property.key) || isPureRenderDeclared(property))
        ));
        if (found) {
          markSCUAsDeclared(node);
        }
      },

      'Program:exit': function () {
        const list = components.list();

        // Report missing shouldComponentUpdate for all components
        Object.keys(list).filter(component => !list[component].hasSCU).forEach((component) => {
          reportMissingOptimization(list[component]);
        });
      }
    };
  })
};


/***/ }),
/* 218 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce ES5 or ES6 class for returning value in render function.
 * @author Mark Orel
 */



const Components = __webpack_require__(50);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce ES5 or ES6 class for returning value in render function',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('require-render-return')
    },
    schema: [{}]
  },

  create: Components.detect((context, components, utils) => {
    /**
     * Mark a return statement as present
     * @param {ASTNode} node The AST node being checked.
     */
    function markReturnStatementPresent(node) {
      components.set(node, {
        hasReturnStatement: true
      });
    }

    /**
     * Find render method in a given AST node
     * @param {ASTNode} node The component to find render method.
     * @returns {ASTNode} Method node if found, undefined if not.
     */
    function findRenderMethod(node) {
      const properties = astUtil.getComponentProperties(node);
      return properties
        .filter(property => astUtil.getPropertyName(property) === 'render' && property.value)
        .find(property => astUtil.isFunctionLikeExpression(property.value));
    }

    return {
      ReturnStatement(node) {
        const ancestors = context.getAncestors(node).reverse();
        let depth = 0;
        ancestors.forEach((ancestor) => {
          if (/Function(Expression|Declaration)$/.test(ancestor.type)) {
            depth++;
          }
          if (
            /(MethodDefinition|(Class)?Property)$/.test(ancestor.type) &&
            astUtil.getPropertyName(ancestor) === 'render' &&
            depth <= 1
          ) {
            markReturnStatementPresent(node);
          }
        });
      },

      ArrowFunctionExpression(node) {
        if (node.expression === false || astUtil.getPropertyName(node.parent) !== 'render') {
          return;
        }
        markReturnStatementPresent(node);
      },

      'Program:exit': function () {
        const list = components.list();
        Object.keys(list).forEach((component) => {
          if (
            !findRenderMethod(list[component].node) ||
            list[component].hasReturnStatement ||
            (!utils.isES5Component(list[component].node) && !utils.isES6Component(list[component].node))
          ) {
            return;
          }
          context.report({
            node: findRenderMethod(list[component].node),
            message: 'Your render method should have return statement'
          });
        });
      }
    };
  })
};


/***/ }),
/* 219 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent extra closing tags for components without children
 * @author Yannick Croissant
 */



const docsUrl = __webpack_require__(124);
const jsxUtil = __webpack_require__(86);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {component: true, html: true};

module.exports = {
  meta: {
    docs: {
      description: 'Prevent extra closing tags for components without children',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('self-closing-comp')
    },
    fixable: 'code',

    schema: [{
      type: 'object',
      properties: {
        component: {
          default: optionDefaults.component,
          type: 'boolean'
        },
        html: {
          default: optionDefaults.html,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    function isComponent(node) {
      return node.name && node.name.type === 'JSXIdentifier' && !jsxUtil.isDOMComponent(node);
    }

    function childrenIsEmpty(node) {
      return node.parent.children.length === 0;
    }

    function childrenIsMultilineSpaces(node) {
      const childrens = node.parent.children;

      return (
        childrens.length === 1 &&
        (childrens[0].type === 'Literal' || childrens[0].type === 'JSXText') &&
        childrens[0].value.indexOf('\n') !== -1 &&
        childrens[0].value.replace(/(?!\xA0)\s/g, '') === ''
      );
    }

    function isShouldBeSelfClosed(node) {
      const configuration = Object.assign({}, optionDefaults, context.options[0]);
      return (
        configuration.component && isComponent(node) ||
        configuration.html && jsxUtil.isDOMComponent(node)
      ) && !node.selfClosing && (childrenIsEmpty(node) || childrenIsMultilineSpaces(node));
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      JSXOpeningElement(node) {
        if (!isShouldBeSelfClosed(node)) {
          return;
        }
        context.report({
          node,
          message: 'Empty components are self-closing',
          fix(fixer) {
            // Represents the last character of the JSXOpeningElement, the '>' character
            const openingElementEnding = node.range[1] - 1;
            // Represents the last character of the JSXClosingElement, the '>' character
            const closingElementEnding = node.parent.closingElement.range[1];

            // Replace />.*<\/.*>/ with '/>'
            const range = [openingElementEnding, closingElementEnding];
            return fixer.replaceTextRange(range, ' />');
          }
        });
      }
    };
  }
};


/***/ }),
/* 220 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce component methods order
 * @author Yannick Croissant
 */



const has = __webpack_require__(15);
const entries = __webpack_require__(44);
const arrayIncludes = __webpack_require__(60);

const Components = __webpack_require__(50);
const astUtil = __webpack_require__(67);
const docsUrl = __webpack_require__(124);

const defaultConfig = {
  order: [
    'static-methods',
    'lifecycle',
    'everything-else',
    'render'
  ],
  groups: {
    lifecycle: [
      'displayName',
      'propTypes',
      'contextTypes',
      'childContextTypes',
      'mixins',
      'statics',
      'defaultProps',
      'constructor',
      'getDefaultProps',
      'state',
      'getInitialState',
      'getChildContext',
      'getDerivedStateFromProps',
      'componentWillMount',
      'UNSAFE_componentWillMount',
      'componentDidMount',
      'componentWillReceiveProps',
      'UNSAFE_componentWillReceiveProps',
      'shouldComponentUpdate',
      'componentWillUpdate',
      'UNSAFE_componentWillUpdate',
      'getSnapshotBeforeUpdate',
      'componentDidUpdate',
      'componentDidCatch',
      'componentWillUnmount'
    ]
  }
};

/**
 * Get the methods order from the default config and the user config
 * @param {Object} userConfig The user configuration.
 * @returns {Array} Methods order
 */
function getMethodsOrder(userConfig) {
  userConfig = userConfig || {};

  const groups = Object.assign({}, defaultConfig.groups, userConfig.groups);
  const order = userConfig.order || defaultConfig.order;

  let config = [];
  let entry;
  for (let i = 0, j = order.length; i < j; i++) {
    entry = order[i];
    if (has(groups, entry)) {
      config = config.concat(groups[entry]);
    } else {
      config.push(entry);
    }
  }

  return config;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce component methods order',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('sort-comp')
    },

    schema: [{
      type: 'object',
      properties: {
        order: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        groups: {
          type: 'object',
          patternProperties: {
            '^.*$': {
              type: 'array',
              items: {
                type: 'string'
              }
            }
          }
        }
      },
      additionalProperties: false
    }]
  },

  create: Components.detect((context, components) => {
    const errors = {};

    const MISPOSITION_MESSAGE = '{{propA}} should be placed {{position}} {{propB}}';

    const methodsOrder = getMethodsOrder(context.options[0]);

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    const regExpRegExp = /\/(.*)\/([g|y|i|m]*)/;

    /**
     * Get indexes of the matching patterns in methods order configuration
     * @param {Object} method - Method metadata.
     * @returns {Array} The matching patterns indexes. Return [Infinity] if there is no match.
     */
    function getRefPropIndexes(method) {
      const methodGroupIndexes = [];

      methodsOrder.forEach((currentGroup, groupIndex) => {
        if (currentGroup === 'getters') {
          if (method.getter) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'setters') {
          if (method.setter) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'type-annotations') {
          if (method.typeAnnotation) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'static-methods') {
          if (method.static) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'instance-variables') {
          if (method.instanceVariable) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (currentGroup === 'instance-methods') {
          if (method.instanceMethod) {
            methodGroupIndexes.push(groupIndex);
          }
        } else if (arrayIncludes([
          'displayName',
          'propTypes',
          'contextTypes',
          'childContextTypes',
          'mixins',
          'statics',
          'defaultProps',
          'constructor',
          'getDefaultProps',
          'state',
          'getInitialState',
          'getChildContext',
          'getDerivedStateFromProps',
          'componentWillMount',
          'UNSAFE_componentWillMount',
          'componentDidMount',
          'componentWillReceiveProps',
          'UNSAFE_componentWillReceiveProps',
          'shouldComponentUpdate',
          'componentWillUpdate',
          'UNSAFE_componentWillUpdate',
          'getSnapshotBeforeUpdate',
          'componentDidUpdate',
          'componentDidCatch',
          'componentWillUnmount',
          'render'
        ], currentGroup)) {
          if (currentGroup === method.name) {
            methodGroupIndexes.push(groupIndex);
          }
        } else {
          // Is the group a regex?
          const isRegExp = currentGroup.match(regExpRegExp);
          if (isRegExp) {
            const isMatching = new RegExp(isRegExp[1], isRegExp[2]).test(method.name);
            if (isMatching) {
              methodGroupIndexes.push(groupIndex);
            }
          } else if (currentGroup === method.name) {
            methodGroupIndexes.push(groupIndex);
          }
        }
      });

      // No matching pattern, return 'everything-else' index
      if (methodGroupIndexes.length === 0) {
        const everythingElseIndex = methodsOrder.indexOf('everything-else');

        if (everythingElseIndex !== -1) {
          methodGroupIndexes.push(everythingElseIndex);
        } else {
          // No matching pattern and no 'everything-else' group
          methodGroupIndexes.push(Infinity);
        }
      }

      return methodGroupIndexes;
    }

    /**
     * Get properties name
     * @param {Object} node - Property.
     * @returns {String} Property name.
     */
    function getPropertyName(node) {
      if (node.kind === 'get') {
        return 'getter functions';
      }

      if (node.kind === 'set') {
        return 'setter functions';
      }

      return astUtil.getPropertyName(node);
    }

    /**
     * Store a new error in the error list
     * @param {Object} propA - Mispositioned property.
     * @param {Object} propB - Reference property.
     */
    function storeError(propA, propB) {
      // Initialize the error object if needed
      if (!errors[propA.index]) {
        errors[propA.index] = {
          node: propA.node,
          score: 0,
          closest: {
            distance: Infinity,
            ref: {
              node: null,
              index: 0
            }
          }
        };
      }
      // Increment the prop score
      errors[propA.index].score++;
      // Stop here if we already have pushed another node at this position
      if (getPropertyName(errors[propA.index].node) !== getPropertyName(propA.node)) {
        return;
      }
      // Stop here if we already have a closer reference
      if (Math.abs(propA.index - propB.index) > errors[propA.index].closest.distance) {
        return;
      }
      // Update the closest reference
      errors[propA.index].closest.distance = Math.abs(propA.index - propB.index);
      errors[propA.index].closest.ref.node = propB.node;
      errors[propA.index].closest.ref.index = propB.index;
    }

    /**
     * Dedupe errors, only keep the ones with the highest score and delete the others
     */
    function dedupeErrors() {
      for (const i in errors) {
        if (has(errors, i)) {
          const index = errors[i].closest.ref.index;
          if (errors[index]) {
            if (errors[i].score > errors[index].score) {
              delete errors[index];
            } else {
              delete errors[i];
            }
          }
        }
      }
    }

    /**
     * Report errors
     */
    function reportErrors() {
      dedupeErrors();

      entries(errors).forEach((entry) => {
        const nodeA = entry[1].node;
        const nodeB = entry[1].closest.ref.node;
        const indexA = entry[0];
        const indexB = entry[1].closest.ref.index;

        context.report({
          node: nodeA,
          message: MISPOSITION_MESSAGE,
          data: {
            propA: getPropertyName(nodeA),
            propB: getPropertyName(nodeB),
            position: indexA < indexB ? 'before' : 'after'
          }
        });
      });
    }

    /**
     * Compare two properties and find out if they are in the right order
     * @param {Array} propertiesInfos Array containing all the properties metadata.
     * @param {Object} propA First property name and metadata
     * @param {Object} propB Second property name.
     * @returns {Object} Object containing a correct true/false flag and the correct indexes for the two properties.
     */
    function comparePropsOrder(propertiesInfos, propA, propB) {
      let i;
      let j;
      let k;
      let l;
      let refIndexA;
      let refIndexB;

      // Get references indexes (the correct position) for given properties
      const refIndexesA = getRefPropIndexes(propA);
      const refIndexesB = getRefPropIndexes(propB);

      // Get current indexes for given properties
      const classIndexA = propertiesInfos.indexOf(propA);
      const classIndexB = propertiesInfos.indexOf(propB);

      // Loop around the references indexes for the 1st property
      for (i = 0, j = refIndexesA.length; i < j; i++) {
        refIndexA = refIndexesA[i];

        // Loop around the properties for the 2nd property (for comparison)
        for (k = 0, l = refIndexesB.length; k < l; k++) {
          refIndexB = refIndexesB[k];

          if (
            // Comparing the same properties
            refIndexA === refIndexB ||
            // 1st property is placed before the 2nd one in reference and in current component
            refIndexA < refIndexB && classIndexA < classIndexB ||
            // 1st property is placed after the 2nd one in reference and in current component
            refIndexA > refIndexB && classIndexA > classIndexB
          ) {
            return {
              correct: true,
              indexA: classIndexA,
              indexB: classIndexB
            };
          }
        }
      }

      // We did not find any correct match between reference and current component
      return {
        correct: false,
        indexA: refIndexA,
        indexB: refIndexB
      };
    }

    /**
     * Check properties order from a properties list and store the eventual errors
     * @param {Array} properties Array containing all the properties.
     */
    function checkPropsOrder(properties) {
      const propertiesInfos = properties.map(node => ({
        name: getPropertyName(node),
        getter: node.kind === 'get',
        setter: node.kind === 'set',
        static: node.static,
        instanceVariable: !node.static &&
          node.type === 'ClassProperty' &&
          (!node.value || !astUtil.isFunctionLikeExpression(node.value)),
        instanceMethod: !node.static &&
          node.type === 'ClassProperty' &&
          node.value &&
          (astUtil.isFunctionLikeExpression(node.value)),
        typeAnnotation: !!node.typeAnnotation && node.value === null
      }));

      // Loop around the properties
      propertiesInfos.forEach((propA, i) => {
        // Loop around the properties a second time (for comparison)
        propertiesInfos.forEach((propB, k) => {
          if (i === k) {
            return;
          }

          // Compare the properties order
          const order = comparePropsOrder(propertiesInfos, propA, propB);

          if (!order.correct) {
            // Store an error if the order is incorrect
            storeError({
              node: properties[i],
              index: order.indexA
            }, {
              node: properties[k],
              index: order.indexB
            });
          }
        });
      });
    }

    return {
      'Program:exit': function () {
        const list = components.list();
        Object.keys(list).forEach((component) => {
          const properties = astUtil.getComponentProperties(list[component].node);
          checkPropsOrder(properties);
        });

        reportErrors();
      }
    };
  }),

  defaultConfig
};


/***/ }),
/* 221 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce propTypes declarations alphabetical sorting
 */



const variableUtil = __webpack_require__(65);
const propsUtil = __webpack_require__(70);
const docsUrl = __webpack_require__(124);
const propWrapperUtil = __webpack_require__(85);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce propTypes declarations alphabetical sorting',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('sort-prop-types')
    },

    fixable: 'code',

    schema: [{
      type: 'object',
      properties: {
        requiredFirst: {
          type: 'boolean'
        },
        callbacksLast: {
          type: 'boolean'
        },
        ignoreCase: {
          type: 'boolean'
        },
        // Whether alphabetical sorting should be enforced
        noSortAlphabetically: {
          type: 'boolean'
        },
        sortShapeProp: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const requiredFirst = configuration.requiredFirst || false;
    const callbacksLast = configuration.callbacksLast || false;
    const ignoreCase = configuration.ignoreCase || false;
    const noSortAlphabetically = configuration.noSortAlphabetically || false;
    const sortShapeProp = configuration.sortShapeProp || false;

    function getKey(node) {
      if (node.key && node.key.value) {
        return node.key.value;
      }
      return context.getSourceCode().getText(node.key || node.argument);
    }

    function getValueName(node) {
      return node.type === 'Property' && node.value.property && node.value.property.name;
    }

    function isCallbackPropName(propName) {
      return /^on[A-Z]/.test(propName);
    }

    function isRequiredProp(node) {
      return getValueName(node) === 'isRequired';
    }

    function isShapeProp(node) {
      return Boolean(
        node && node.callee && node.callee.property && node.callee.property.name === 'shape'
      );
    }

    function getShapeProperties(node) {
      return node.arguments && node.arguments[0] && node.arguments[0].properties;
    }

    function toLowerCase(item) {
      return String(item).toLowerCase();
    }

    function sorter(a, b) {
      let aKey = getKey(a);
      let bKey = getKey(b);
      if (requiredFirst) {
        if (isRequiredProp(a) && !isRequiredProp(b)) {
          return -1;
        }
        if (!isRequiredProp(a) && isRequiredProp(b)) {
          return 1;
        }
      }

      if (callbacksLast) {
        if (isCallbackPropName(aKey) && !isCallbackPropName(bKey)) {
          return 1;
        }
        if (!isCallbackPropName(aKey) && isCallbackPropName(bKey)) {
          return -1;
        }
      }

      if (ignoreCase) {
        aKey = toLowerCase(aKey);
        bKey = toLowerCase(bKey);
      }

      if (aKey < bKey) {
        return -1;
      }
      if (aKey > bKey) {
        return 1;
      }
      return 0;
    }


    /**
     * Checks if propTypes declarations are sorted
     * @param {Array} declarations The array of AST nodes being checked.
     * @returns {void}
     */
    function checkSorted(declarations) {
      // Declarations will be `undefined` if the `shape` is not a literal. For
      // example, if it is a propType imported from another file.
      if (!declarations) {
        return;
      }

      function fix(fixer) {
        function sortInSource(allNodes, source) {
          const originalSource = source;
          const nodeGroups = allNodes.reduce((acc, curr) => {
            if (curr.type === 'ExperimentalSpreadProperty' || curr.type === 'SpreadElement') {
              acc.push([]);
            } else {
              acc[acc.length - 1].push(curr);
            }
            return acc;
          }, [[]]);

          nodeGroups.forEach((nodes) => {
            const sortedAttributes = nodes.slice().sort(sorter);

            for (let i = nodes.length - 1; i >= 0; i--) {
              const sortedAttr = sortedAttributes[i];
              const attr = nodes[i];
              let sortedAttrText = context.getSourceCode().getText(sortedAttr);
              if (sortShapeProp && isShapeProp(sortedAttr.value)) {
                const shape = getShapeProperties(sortedAttr.value);
                if (shape) {
                  const attrSource = sortInSource(
                    shape,
                    originalSource
                  );
                  sortedAttrText = attrSource.slice(sortedAttr.range[0], sortedAttr.range[1]);
                }
              }
              source = `${source.slice(0, attr.range[0])}${sortedAttrText}${source.slice(attr.range[1])}`;
            }
          });
          return source;
        }

        const source = sortInSource(declarations, context.getSourceCode().getText());

        const rangeStart = declarations[0].range[0];
        const rangeEnd = declarations[declarations.length - 1].range[1];
        return fixer.replaceTextRange([rangeStart, rangeEnd], source.slice(rangeStart, rangeEnd));
      }

      declarations.reduce((prev, curr, idx, decls) => {
        if (curr.type === 'ExperimentalSpreadProperty' || curr.type === 'SpreadElement') {
          return decls[idx + 1];
        }

        let prevPropName = getKey(prev);
        let currentPropName = getKey(curr);
        const previousIsRequired = isRequiredProp(prev);
        const currentIsRequired = isRequiredProp(curr);
        const previousIsCallback = isCallbackPropName(prevPropName);
        const currentIsCallback = isCallbackPropName(currentPropName);

        if (ignoreCase) {
          prevPropName = toLowerCase(prevPropName);
          currentPropName = toLowerCase(currentPropName);
        }

        if (requiredFirst) {
          if (previousIsRequired && !currentIsRequired) {
            // Transition between required and non-required. Don't compare for alphabetical.
            return curr;
          }
          if (!previousIsRequired && currentIsRequired) {
            // Encountered a non-required prop after a required prop
            context.report({
              node: curr,
              message: 'Required prop types must be listed before all other prop types',
              fix
            });
            return curr;
          }
        }

        if (callbacksLast) {
          if (!previousIsCallback && currentIsCallback) {
            // Entering the callback prop section
            return curr;
          }
          if (previousIsCallback && !currentIsCallback) {
            // Encountered a non-callback prop after a callback prop
            context.report({
              node: prev,
              message: 'Callback prop types must be listed after all other prop types',
              fix
            });
            return prev;
          }
        }

        if (!noSortAlphabetically && currentPropName < prevPropName) {
          context.report({
            node: curr,
            message: 'Prop types declarations should be sorted alphabetically',
            fix
          });
          return prev;
        }

        return curr;
      }, declarations[0]);
    }

    function checkNode(node) {
      switch (node && node.type) {
        case 'ObjectExpression':
          checkSorted(node.properties);
          break;
        case 'Identifier': {
          const propTypesObject = variableUtil.findVariableByName(context, node.name);
          if (propTypesObject && propTypesObject.properties) {
            checkSorted(propTypesObject.properties);
          }
          break;
        }
        case 'CallExpression': {
          const innerNode = node.arguments && node.arguments[0];
          if (propWrapperUtil.isPropWrapperFunction(context, node.callee.name) && innerNode) {
            checkNode(innerNode);
          }
          break;
        }
        default:
          break;
      }
    }

    return {
      CallExpression(node) {
        if (!sortShapeProp || !isShapeProp(node) || !(node.arguments && node.arguments[0])) {
          return;
        }

        const firstArg = node.arguments[0];
        if (firstArg.properties) {
          checkSorted(firstArg.properties);
        } else if (firstArg.type === 'Identifier') {
          const variable = variableUtil.findVariableByName(context, firstArg.name);
          if (variable && variable.properties) {
            checkSorted(variable.properties);
          }
        }
      },

      ClassProperty(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }
        checkNode(node.value);
      },

      MemberExpression(node) {
        if (!propsUtil.isPropTypesDeclaration(node)) {
          return;
        }

        checkNode(node.parent.right);
      },

      ObjectExpression(node) {
        node.properties.forEach((property) => {
          if (!property.key) {
            return;
          }

          if (!propsUtil.isPropTypesDeclaration(property)) {
            return;
          }
          if (property.value.type === 'ObjectExpression') {
            checkSorted(property.value.properties);
          }
        });
      }

    };
  }
};


/***/ }),
/* 222 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce the state initialization style to be either in a constructor or with a class property
 * @author Kanitkorn Sujautra
 */



const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'State initialization in an ES6 class component should be in a constructor',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('state-in-constructor')
    },
    schema: [{
      enum: ['always', 'never']
    }]
  },

  create: Components.detect((context, components, utils) => {
    const option = context.options[0] || 'always';
    return {
      ClassProperty(node) {
        if (
          option === 'always' &&
          !node.static &&
          node.key.name === 'state' &&
          utils.getParentES6Component()
        ) {
          context.report({
            node,
            message: 'State initialization should be in a constructor'
          });
        }
      },
      AssignmentExpression(node) {
        if (
          option === 'never' &&
          utils.isStateMemberExpression(node.left) &&
          utils.inConstructor() &&
          utils.getParentES6Component()
        ) {
          context.report({
            node,
            message: 'State initialization should be in a class property'
          });
        }
      }
    };
  })
};


/***/ }),
/* 223 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Defines where React component static properties should be positioned.
 * @author Daniel Mason
 */



const fromEntries = __webpack_require__(3);
const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);
const astUtil = __webpack_require__(67);
const propsUtil = __webpack_require__(70);

// ------------------------------------------------------------------------------
// Positioning Options
// ------------------------------------------------------------------------------
const STATIC_PUBLIC_FIELD = 'static public field';
const STATIC_GETTER = 'static getter';
const PROPERTY_ASSIGNMENT = 'property assignment';
const POSITION_SETTINGS = [STATIC_PUBLIC_FIELD, STATIC_GETTER, PROPERTY_ASSIGNMENT];

// ------------------------------------------------------------------------------
// Rule messages
// ------------------------------------------------------------------------------
const ERROR_MESSAGES = {
  [STATIC_PUBLIC_FIELD]: '\'{{name}}\' should be declared as a static class property.',
  [STATIC_GETTER]: '\'{{name}}\' should be declared as a static getter class function.',
  [PROPERTY_ASSIGNMENT]: '\'{{name}}\' should be declared outside the class body.'
};

// ------------------------------------------------------------------------------
// Properties to check
// ------------------------------------------------------------------------------
const propertiesToCheck = {
  propTypes: propsUtil.isPropTypesDeclaration,
  defaultProps: propsUtil.isDefaultPropsDeclaration,
  childContextTypes: propsUtil.isChildContextTypesDeclaration,
  contextTypes: propsUtil.isContextTypesDeclaration,
  contextType: propsUtil.isContextTypeDeclaration,
  displayName: node => propsUtil.isDisplayNameDeclaration(astUtil.getPropertyNameNode(node))
};

const classProperties = Object.keys(propertiesToCheck);
const schemaProperties = fromEntries(classProperties.map(property => [property, {enum: POSITION_SETTINGS}]));

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Defines where React component static properties should be positioned.',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('static-property-placement')
    },
    fixable: null, // or 'code' or 'whitespace'
    schema: [
      {enum: POSITION_SETTINGS},
      {
        type: 'object',
        properties: schemaProperties,
        additionalProperties: false
      }
    ]
  },

  create: Components.detect((context, components, utils) => {
    // variables should be defined here
    const options = context.options;
    const defaultCheckType = options[0] || STATIC_PUBLIC_FIELD;
    const hasAdditionalConfig = options.length > 1;
    const additionalConfig = hasAdditionalConfig ? options[1] : {};

    // Set config
    const config = fromEntries(classProperties.map(property => [
      property,
      additionalConfig[property] || defaultCheckType
    ]));

    // ----------------------------------------------------------------------
    // Helpers
    // ----------------------------------------------------------------------

    /**
      * Checks if we are declaring context in class
      * @returns {Boolean} True if we are declaring context in class, false if not.
     */
    function isContextInClass() {
      let blockNode;
      let scope = context.getScope();
      while (scope) {
        blockNode = scope.block;
        if (blockNode && blockNode.type === 'ClassDeclaration') {
          return true;
        }
        scope = scope.upper;
      }

      return false;
    }

    /**
     * Check if we should report this property node
     * @param {ASTNode} node
     * @param {string} expectedRule
     */
    function reportNodeIncorrectlyPositioned(node, expectedRule) {
      // Detect if this node is an expected property declaration adn return the property name
      const name = classProperties.find((propertyName) => {
        if (propertiesToCheck[propertyName](node)) {
          return !!propertyName;
        }

        return false;
      });

      // If name is set but the configured rule does not match expected then report error
      if (name && config[name] !== expectedRule) {
        // Report the error
        context.report({
          node,
          message: ERROR_MESSAGES[config[name]],
          data: {name}
        });
      }
    }

    // ----------------------------------------------------------------------
    // Public
    // ----------------------------------------------------------------------
    return {
      ClassProperty: node => reportNodeIncorrectlyPositioned(node, STATIC_PUBLIC_FIELD),

      MemberExpression: (node) => {
        // If definition type is undefined then it must not be a defining expression or if the definition is inside a
        // class body then skip this node.
        const right = node.parent.right;
        if (!right || right.type === 'undefined' || isContextInClass()) {
          return;
        }

        // Get the related component
        const relatedComponent = utils.getRelatedComponent(node);

        // If the related component is not an ES6 component then skip this node
        if (!relatedComponent || !utils.isES6Component(relatedComponent.node)) {
          return;
        }

        // Report if needed
        reportNodeIncorrectlyPositioned(node, PROPERTY_ASSIGNMENT);
      },

      MethodDefinition: (node) => {
        // If the function is inside a class and is static getter then check if correctly positioned
        if (isContextInClass() && node.static && node.kind === 'get') {
          // Report error if needed
          reportNodeIncorrectlyPositioned(node, STATIC_GETTER);
        }
      }
    };
  })
};


/***/ }),
/* 224 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Enforce style prop value is an object
 * @author David Petersen
 */



const variableUtil = __webpack_require__(65);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce style prop value is an object',
      category: '',
      recommended: false,
      url: docsUrl('style-prop-object')
    },
    schema: []
  },

  create(context) {
    /**
     * @param {ASTNode} expression An Identifier node
     */
    function isNonNullaryLiteral(expression) {
      return expression.type === 'Literal' && expression.value !== null;
    }

    /**
     * @param {object} node A Identifier node
     */
    function checkIdentifiers(node) {
      const variable = variableUtil.variablesInScope(context).find(item => item.name === node.name);

      if (!variable || !variable.defs[0] || !variable.defs[0].node.init) {
        return;
      }

      if (isNonNullaryLiteral(variable.defs[0].node.init)) {
        context.report({
          node,
          message: 'Style prop value must be an object'
        });
      }
    }

    return {
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.property.name === 'createElement' &&
          node.arguments.length > 1
        ) {
          if (node.arguments[1].type === 'ObjectExpression') {
            const style = node.arguments[1].properties.find(property => property.key && property.key.name === 'style' && !property.computed);
            if (style) {
              if (style.value.type === 'Identifier') {
                checkIdentifiers(style.value);
              } else if (isNonNullaryLiteral(style.value)) {
                context.report({
                  node: style.value,
                  message: 'Style prop value must be an object'
                });
              }
            }
          }
        }
      },

      JSXAttribute(node) {
        if (!node.value || node.name.name !== 'style') {
          return;
        }

        if (node.value.type !== 'JSXExpressionContainer' || isNonNullaryLiteral(node.value.expression)) {
          context.report({
            node,
            message: 'Style prop value must be an object'
          });
        } else if (node.value.expression.type === 'Identifier') {
          checkIdentifiers(node.value.expression);
        }
      }
    };
  }
};


/***/ }),
/* 225 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @fileoverview Prevent void elements (e.g. <img />, <br />) from receiving
 *   children
 * @author Joe Lencioni
 */



const has = __webpack_require__(15);

const Components = __webpack_require__(50);
const docsUrl = __webpack_require__(124);

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// Using an object here to avoid array scan. We should switch to Set once
// support is good enough.
const VOID_DOM_ELEMENTS = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  menuitem: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

function isVoidDOMElement(elementName) {
  return has(VOID_DOM_ELEMENTS, elementName);
}

function errorMessage(elementName) {
  return `Void DOM element <${elementName} /> cannot receive children.`;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent passing of children to void DOM elements (e.g. <br />).',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('void-dom-elements-no-children')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => ({
    JSXElement(node) {
      const elementName = node.openingElement.name.name;

      if (!isVoidDOMElement(elementName)) {
        // e.g. <div />
        return;
      }

      if (node.children.length > 0) {
        // e.g. <br>Foo</br>
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }

      const attributes = node.openingElement.attributes;

      const hasChildrenAttributeOrDanger = attributes.some((attribute) => {
        if (!attribute.name) {
          return false;
        }

        return attribute.name.name === 'children' || attribute.name.name === 'dangerouslySetInnerHTML';
      });

      if (hasChildrenAttributeOrDanger) {
        // e.g. <br children="Foo" />
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }
    },

    CallExpression(node) {
      if (node.callee.type !== 'MemberExpression' && node.callee.type !== 'Identifier') {
        return;
      }

      if (!utils.isCreateElement(node)) {
        return;
      }

      const args = node.arguments;

      if (args.length < 1) {
        // React.createElement() should not crash linter
        return;
      }

      const elementName = args[0].value;

      if (!isVoidDOMElement(elementName)) {
        // e.g. React.createElement('div');
        return;
      }

      if (args.length < 2 || args[1].type !== 'ObjectExpression') {
        return;
      }

      const firstChild = args[2];
      if (firstChild) {
        // e.g. React.createElement('br', undefined, 'Foo')
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }

      const props = args[1].properties;

      const hasChildrenPropOrDanger = props.some((prop) => {
        if (!prop.key) {
          return false;
        }

        return prop.key.name === 'children' || prop.key.name === 'dangerouslySetInnerHTML';
      });

      if (hasChildrenPropOrDanger) {
        // e.g. React.createElement('br', { children: 'Foo' })
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }
    }
  }))
};


/***/ })
/******/ ]);
