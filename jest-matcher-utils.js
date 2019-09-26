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


Object.defineProperty(exports, '__esModule', {
  value: true
});
Object.defineProperty(exports, 'DiffOptions', {
  enumerable: true,
  get: function get() {
    return _jestDiff.DiffOptions;
  }
});
exports.matcherHint = exports.matcherErrorMessage = exports.getLabelPrinter = exports.pluralize = exports.diff = exports.printDiffOrStringify = exports.ensureExpectedIsNonNegativeInteger = exports.ensureNumbers = exports.ensureExpectedIsNumber = exports.ensureActualIsNumber = exports.ensureNoExpected = exports.printWithType = exports.printExpected = exports.printReceived = exports.highlightTrailingWhitespace = exports.stringify = exports.SUGGEST_TO_CONTAIN_EQUAL = exports.DIM_COLOR = exports.BOLD_WEIGHT = exports.INVERTED_COLOR = exports.RECEIVED_COLOR = exports.EXPECTED_COLOR = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(3));

var _jestDiff = _interopRequireWildcard(__webpack_require__(15));

var _jestGetType = _interopRequireWildcard(__webpack_require__(30));

var _prettyFormat = _interopRequireDefault(__webpack_require__(16));

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const _prettyFormat$plugins = _prettyFormat.default.plugins,
  AsymmetricMatcher = _prettyFormat$plugins.AsymmetricMatcher,
  DOMCollection = _prettyFormat$plugins.DOMCollection,
  DOMElement = _prettyFormat$plugins.DOMElement,
  Immutable = _prettyFormat$plugins.Immutable,
  ReactElement = _prettyFormat$plugins.ReactElement,
  ReactTestComponent = _prettyFormat$plugins.ReactTestComponent;
const PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher
];
const EXPECTED_COLOR = _chalk.default.green;
exports.EXPECTED_COLOR = EXPECTED_COLOR;
const RECEIVED_COLOR = _chalk.default.red;
exports.RECEIVED_COLOR = RECEIVED_COLOR;
const INVERTED_COLOR = _chalk.default.inverse;
exports.INVERTED_COLOR = INVERTED_COLOR;
const BOLD_WEIGHT = _chalk.default.bold;
exports.BOLD_WEIGHT = BOLD_WEIGHT;
const DIM_COLOR = _chalk.default.dim;
exports.DIM_COLOR = DIM_COLOR;
const MULTILINE_REGEXP = /\n/;
const SPACE_SYMBOL = '\u{00B7}'; // middle dot

const NUMBERS = [
  'zero',
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
  'ten',
  'eleven',
  'twelve',
  'thirteen'
];

const SUGGEST_TO_CONTAIN_EQUAL = _chalk.default.dim(
  'Looks like you wanted to test for object/array equality with the stricter `toContain` matcher. You probably need to use `toContainEqual` instead.'
);

exports.SUGGEST_TO_CONTAIN_EQUAL = SUGGEST_TO_CONTAIN_EQUAL;

const stringify = (object, maxDepth = 10) => {
  const MAX_LENGTH = 10000;
  let result;

  try {
    result = (0, _prettyFormat.default)(object, {
      maxDepth,
      min: true,
      plugins: PLUGINS
    });
  } catch (e) {
    result = (0, _prettyFormat.default)(object, {
      callToJSON: false,
      maxDepth,
      min: true,
      plugins: PLUGINS
    });
  }

  return result.length >= MAX_LENGTH && maxDepth > 1
    ? stringify(object, Math.floor(maxDepth / 2))
    : result;
};

exports.stringify = stringify;

const highlightTrailingWhitespace = text =>
  text.replace(/\s+$/gm, _chalk.default.inverse('$&')); // Instead of inverse highlight which now implies a change,
// replace common spaces with middle dot at the end of any line.

exports.highlightTrailingWhitespace = highlightTrailingWhitespace;

const replaceTrailingSpaces = text =>
  text.replace(/\s+$/gm, spaces => SPACE_SYMBOL.repeat(spaces.length));

const printReceived = object =>
  RECEIVED_COLOR(replaceTrailingSpaces(stringify(object)));

exports.printReceived = printReceived;

const printExpected = value =>
  EXPECTED_COLOR(replaceTrailingSpaces(stringify(value)));

exports.printExpected = printExpected;

const printWithType = (
  name,
  value,
  print // printExpected or printReceived
) => {
  const type = (0, _jestGetType.default)(value);
  const hasType =
    type !== 'null' && type !== 'undefined'
      ? `${name} has type:  ${type}\n`
      : '';
  const hasValue = `${name} has value: ${print(value)}`;
  return hasType + hasValue;
};

exports.printWithType = printWithType;

const ensureNoExpected = (expected, matcherName, options) => {
  if (typeof expected !== 'undefined') {
    // Prepend maybe not only for backward compatibility.
    const matcherString = (options ? '' : '[.not]') + matcherName;
    throw new Error(
      matcherErrorMessage(
        matcherHint(matcherString, undefined, '', options), // Because expected is omitted in hint above,
        'this matcher must not have an expected argument',
        printWithType('Expected', expected, printExpected)
      )
    );
  }
};

exports.ensureNoExpected = ensureNoExpected;

const ensureActualIsNumber = (actual, matcherName, options) => {
  if (typeof actual !== 'number') {
    // Prepend maybe not only for backward compatibility.
    const matcherString = (options ? '' : '[.not]') + matcherName;
    throw new Error(
      matcherErrorMessage(
        matcherHint(matcherString, undefined, undefined, options),
        `${RECEIVED_COLOR('received')} value must be a number`,
        printWithType('Received', actual, printReceived)
      )
    );
  }
};

exports.ensureActualIsNumber = ensureActualIsNumber;

const ensureExpectedIsNumber = (expected, matcherName, options) => {
  if (typeof expected !== 'number') {
    // Prepend maybe not only for backward compatibility.
    const matcherString = (options ? '' : '[.not]') + matcherName;
    throw new Error(
      matcherErrorMessage(
        matcherHint(matcherString, undefined, undefined, options),
        `${EXPECTED_COLOR('expected')} value must be a number`,
        printWithType('Expected', expected, printExpected)
      )
    );
  }
};

exports.ensureExpectedIsNumber = ensureExpectedIsNumber;

const ensureNumbers = (actual, expected, matcherName, options) => {
  ensureActualIsNumber(actual, matcherName, options);
  ensureExpectedIsNumber(expected, matcherName, options);
};

exports.ensureNumbers = ensureNumbers;

const ensureExpectedIsNonNegativeInteger = (expected, matcherName, options) => {
  if (
    typeof expected !== 'number' ||
    !Number.isSafeInteger(expected) ||
    expected < 0
  ) {
    // Prepend maybe not only for backward compatibility.
    const matcherString = (options ? '' : '[.not]') + matcherName;
    throw new Error(
      matcherErrorMessage(
        matcherHint(matcherString, undefined, undefined, options),
        `${EXPECTED_COLOR('expected')} value must be a non-negative integer`,
        printWithType('Expected', expected, printExpected)
      )
    );
  }
};

exports.ensureExpectedIsNonNegativeInteger = ensureExpectedIsNonNegativeInteger;

const isLineDiffable = (expected, received) => {
  const expectedType = (0, _jestGetType.default)(expected);
  const receivedType = (0, _jestGetType.default)(received);

  if (expectedType !== receivedType) {
    return false;
  }

  if ((0, _jestGetType.isPrimitive)(expected)) {
    // Print generic line diff for strings only:
    // * if neither string is empty
    return (
      typeof expected === 'string' &&
      typeof received === 'string' &&
      expected.length !== 0 &&
      received.length !== 0 &&
      (MULTILINE_REGEXP.test(expected) || MULTILINE_REGEXP.test(received))
    );
  }

  if (
    expectedType === 'date' ||
    expectedType === 'function' ||
    expectedType === 'regexp'
  ) {
    return false;
  }

  if (expected instanceof Error && received instanceof Error) {
    return false;
  }

  if (
    expectedType === 'object' &&
    typeof expected.asymmetricMatch === 'function'
  ) {
    return false;
  }

  if (
    receivedType === 'object' &&
    typeof received.asymmetricMatch === 'function'
  ) {
    return false;
  }

  return true;
};

const printDiffOrStringify = (
  expected,
  received,
  expectedLabel,
  receivedLabel,
  expand
) => {
  if (typeof expected === 'string' && typeof received === 'string') {
    const result = (0, _jestDiff.getStringDiff)(expected, received, {
      aAnnotation: expectedLabel,
      bAnnotation: receivedLabel,
      expand
    });

    if (result !== null) {
      if (result.isMultiline) {
        return result.annotatedDiff;
      }

      const printLabel = getLabelPrinter(expectedLabel, receivedLabel);
      const expectedLine = printLabel(expectedLabel) + printExpected(result.a);
      const receivedLine = printLabel(receivedLabel) + printReceived(result.b);
      return expectedLine + '\n' + receivedLine;
    }
  }

  if (isLineDiffable(expected, received)) {
    const difference = (0, _jestDiff.default)(expected, received, {
      aAnnotation: expectedLabel,
      bAnnotation: receivedLabel,
      expand
    });

    if (
      typeof difference === 'string' &&
      difference.includes('- ' + expectedLabel) &&
      difference.includes('+ ' + receivedLabel)
    ) {
      return difference;
    }
  }

  const printLabel = getLabelPrinter(expectedLabel, receivedLabel);
  const expectedLine = printLabel(expectedLabel) + printExpected(expected);
  const receivedLine =
    printLabel(receivedLabel) +
    (stringify(expected) === stringify(received)
      ? 'serializes to the same string'
      : printReceived(received));
  return expectedLine + '\n' + receivedLine;
}; // Sometimes, e.g. when comparing two numbers, the output from jest-diff
// does not contain more information than the `Expected:` / `Received:` already gives.
// In those cases, we do not print a diff to make the output shorter and not redundant.

exports.printDiffOrStringify = printDiffOrStringify;

const shouldPrintDiff = (actual, expected) => {
  if (typeof actual === 'number' && typeof expected === 'number') {
    return false;
  }

  if (typeof actual === 'boolean' && typeof expected === 'boolean') {
    return false;
  }

  return true;
};

const diff = (a, b, options) =>
  shouldPrintDiff(a, b) ? (0, _jestDiff.default)(a, b, options) : null;

exports.diff = diff;

const pluralize = (word, count) =>
  (NUMBERS[count] || count) + ' ' + word + (count === 1 ? '' : 's'); // To display lines of labeled values as two columns with monospace alignment:
// given the strings which will describe the values,
// return function which given each string, returns the label:
// string, colon, space, and enough padding spaces to align the value.

exports.pluralize = pluralize;

const getLabelPrinter = (...strings) => {
  const maxLength = strings.reduce(
    (max, string) => (string.length > max ? string.length : max),
    0
  );
  return string => `${string}: ${' '.repeat(maxLength - string.length)}`;
};

exports.getLabelPrinter = getLabelPrinter;

const matcherErrorMessage = (
  hint,
  generic,
  specific // incorrect value returned from call to printWithType
) =>
  `${hint}\n\n${_chalk.default.bold(
    'Matcher error'
  )}: ${generic}\n\n${specific}`; // Display assertion for the report when a test fails.
// New format: rejects/resolves, not, and matcher name have black color
// Old format: matcher name has dim color

exports.matcherErrorMessage = matcherErrorMessage;

const matcherHint = (
  matcherName,
  received = 'received',
  expected = 'expected',
  options = {}
) => {
  const _options$comment = options.comment,
    comment = _options$comment === void 0 ? '' : _options$comment,
    _options$expectedColo = options.expectedColor,
    expectedColor =
      _options$expectedColo === void 0 ? EXPECTED_COLOR : _options$expectedColo,
    _options$isDirectExpe = options.isDirectExpectCall,
    isDirectExpectCall =
      _options$isDirectExpe === void 0 ? false : _options$isDirectExpe,
    _options$isNot = options.isNot,
    isNot = _options$isNot === void 0 ? false : _options$isNot,
    _options$promise = options.promise,
    promise = _options$promise === void 0 ? '' : _options$promise,
    _options$receivedColo = options.receivedColor,
    receivedColor =
      _options$receivedColo === void 0 ? RECEIVED_COLOR : _options$receivedColo,
    _options$secondArgume = options.secondArgument,
    secondArgument =
      _options$secondArgume === void 0 ? '' : _options$secondArgume,
    _options$secondArgume2 = options.secondArgumentColor,
    secondArgumentColor =
      _options$secondArgume2 === void 0
        ? EXPECTED_COLOR
        : _options$secondArgume2;
  let hint = '';
  let dimString = 'expect'; // concatenate adjacent dim substrings

  if (!isDirectExpectCall && received !== '') {
    hint += DIM_COLOR(dimString + '(') + receivedColor(received);
    dimString = ')';
  }

  if (promise !== '') {
    hint += DIM_COLOR(dimString + '.') + promise;
    dimString = '';
  }

  if (isNot) {
    hint += DIM_COLOR(dimString + '.') + 'not';
    dimString = '';
  }

  if (matcherName.includes('.')) {
    // Old format: for backward compatibility,
    // especially without promise or isNot options
    dimString += matcherName;
  } else {
    // New format: omit period from matcherName arg
    hint += DIM_COLOR(dimString + '.') + matcherName;
    dimString = '';
  }

  if (expected === '') {
    dimString += '()';
  } else {
    hint += DIM_COLOR(dimString + '(') + expectedColor(expected);

    if (secondArgument) {
      hint += DIM_COLOR(', ') + secondArgumentColor(secondArgument);
    }

    dimString = ')';
  }

  if (comment !== '') {
    dimString += ' // ' + comment;
  }

  if (dimString !== '') {
    hint += DIM_COLOR(dimString);
  }

  return hint;
};

exports.matcherHint = matcherHint;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const escapeStringRegexp = __webpack_require__(4);
const ansiStyles = __webpack_require__(5);
const stdoutColor = __webpack_require__(11).stdout;

const template = __webpack_require__(14);

const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
const colorConvert = __webpack_require__(7);

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(6)(module)))

/***/ }),
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(8);
var route = __webpack_require__(10);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(9);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(8);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(12);
const hasFlag = __webpack_require__(13);

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _prettyFormat = _interopRequireDefault(__webpack_require__(16));

var _chalk = _interopRequireDefault(__webpack_require__(3));

var _jestGetType = _interopRequireDefault(__webpack_require__(30));

var _diffLines = _interopRequireDefault(__webpack_require__(31));

var _printDiffs = __webpack_require__(34);

var _constants = __webpack_require__(33);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const _prettyFormat$plugins = _prettyFormat.default.plugins,
  AsymmetricMatcher = _prettyFormat$plugins.AsymmetricMatcher,
  DOMCollection = _prettyFormat$plugins.DOMCollection,
  DOMElement = _prettyFormat$plugins.DOMElement,
  Immutable = _prettyFormat$plugins.Immutable,
  ReactElement = _prettyFormat$plugins.ReactElement,
  ReactTestComponent = _prettyFormat$plugins.ReactTestComponent;
const PLUGINS = [
  ReactTestComponent,
  ReactElement,
  DOMElement,
  DOMCollection,
  Immutable,
  AsymmetricMatcher
];
const FORMAT_OPTIONS = {
  plugins: PLUGINS
};

const FORMAT_OPTIONS_0 = _objectSpread({}, FORMAT_OPTIONS, {
  indent: 0
});

const FALLBACK_FORMAT_OPTIONS = {
  callToJSON: false,
  maxDepth: 10,
  plugins: PLUGINS
};

const FALLBACK_FORMAT_OPTIONS_0 = _objectSpread({}, FALLBACK_FORMAT_OPTIONS, {
  indent: 0
}); // Generate a string that will highlight the difference between two values
// with green and red. (similar to how github does code diffing)

function diff(a, b, options) {
  if (Object.is(a, b)) {
    return _constants.NO_DIFF_MESSAGE;
  }

  const aType = (0, _jestGetType.default)(a);
  let expectedType = aType;
  let omitDifference = false;

  if (aType === 'object' && typeof a.asymmetricMatch === 'function') {
    if (a.$$typeof !== Symbol.for('jest.asymmetricMatcher')) {
      // Do not know expected type of user-defined asymmetric matcher.
      return null;
    }

    if (typeof a.getExpectedType !== 'function') {
      // For example, expect.anything() matches either null or undefined
      return null;
    }

    expectedType = a.getExpectedType(); // Primitive types boolean and number omit difference below.
    // For example, omit difference for expect.stringMatching(regexp)

    omitDifference = expectedType === 'string';
  }

  if (expectedType !== (0, _jestGetType.default)(b)) {
    return (
      '  Comparing two different types of values.' +
      ` Expected ${_chalk.default.green(expectedType)} but ` +
      `received ${_chalk.default.red((0, _jestGetType.default)(b))}.`
    );
  }

  if (omitDifference) {
    return null;
  }

  switch (aType) {
    case 'string':
      return (0, _diffLines.default)(a, b, options);

    case 'boolean':
    case 'number':
      return comparePrimitive(a, b, options);

    case 'map':
      return compareObjects(sortMap(a), sortMap(b), options);

    case 'set':
      return compareObjects(sortSet(a), sortSet(b), options);

    default:
      return compareObjects(a, b, options);
  }
}

function comparePrimitive(a, b, options) {
  return (0, _diffLines.default)(
    (0, _prettyFormat.default)(a, FORMAT_OPTIONS),
    (0, _prettyFormat.default)(b, FORMAT_OPTIONS),
    options
  );
}

function sortMap(map) {
  return new Map(Array.from(map.entries()).sort());
}

function sortSet(set) {
  return new Set(Array.from(set.values()).sort());
}

function compareObjects(a, b, options) {
  let diffMessage;
  let hasThrown = false;

  try {
    diffMessage = (0, _diffLines.default)(
      (0, _prettyFormat.default)(a, FORMAT_OPTIONS_0),
      (0, _prettyFormat.default)(b, FORMAT_OPTIONS_0),
      options,
      {
        a: (0, _prettyFormat.default)(a, FORMAT_OPTIONS),
        b: (0, _prettyFormat.default)(b, FORMAT_OPTIONS)
      }
    );
  } catch (e) {
    hasThrown = true;
  } // If the comparison yields no results, compare again but this time
  // without calling `toJSON`. It's also possible that toJSON might throw.

  if (!diffMessage || diffMessage === _constants.NO_DIFF_MESSAGE) {
    diffMessage = (0, _diffLines.default)(
      (0, _prettyFormat.default)(a, FALLBACK_FORMAT_OPTIONS_0),
      (0, _prettyFormat.default)(b, FALLBACK_FORMAT_OPTIONS_0),
      options,
      {
        a: (0, _prettyFormat.default)(a, FALLBACK_FORMAT_OPTIONS),
        b: (0, _prettyFormat.default)(b, FALLBACK_FORMAT_OPTIONS)
      }
    );

    if (diffMessage !== _constants.NO_DIFF_MESSAGE && !hasThrown) {
      diffMessage = _constants.SIMILAR_MESSAGE + '\n\n' + diffMessage;
    }
  }

  return diffMessage;
} // eslint-disable-next-line no-redeclare

diff.getStringDiff = _printDiffs.getStringDiff;
module.exports = diff;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _ansiStyles = _interopRequireDefault(__webpack_require__(5));

var _collections = __webpack_require__(17);

var _AsymmetricMatcher = _interopRequireDefault(
  __webpack_require__(18)
);

var _ConvertAnsi = _interopRequireDefault(__webpack_require__(19));

var _DOMCollection = _interopRequireDefault(__webpack_require__(21));

var _DOMElement = _interopRequireDefault(__webpack_require__(22));

var _Immutable = _interopRequireDefault(__webpack_require__(25));

var _ReactElement = _interopRequireDefault(__webpack_require__(26));

var _ReactTestComponent = _interopRequireDefault(
  __webpack_require__(29)
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
const toString = Object.prototype.toString;
const toISOString = Date.prototype.toISOString;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString = Symbol.prototype.toString;
/**
 * Explicitly comparing typeof constructor to function avoids undefined as name
 * when mock identity-obj-proxy returns the key as the value for any key.
 */

const getConstructorName = val =>
  (typeof val.constructor === 'function' && val.constructor.name) || 'Object';
/* global window */

/** Is val is equal to global window object? Works even if it does not exist :) */

const isWindow = val => typeof window !== 'undefined' && val === window;

const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
const NEWLINE_REGEXP = /\n/gi;

class PrettyFormatPluginError extends Error {
  constructor(message, stack) {
    super(message);
    this.stack = stack;
    this.name = this.constructor.name;
  }
}

function isToStringedArrayType(toStringed) {
  return (
    toStringed === '[object Array]' ||
    toStringed === '[object ArrayBuffer]' ||
    toStringed === '[object DataView]' ||
    toStringed === '[object Float32Array]' ||
    toStringed === '[object Float64Array]' ||
    toStringed === '[object Int8Array]' ||
    toStringed === '[object Int16Array]' ||
    toStringed === '[object Int32Array]' ||
    toStringed === '[object Uint8Array]' ||
    toStringed === '[object Uint8ClampedArray]' ||
    toStringed === '[object Uint16Array]' ||
    toStringed === '[object Uint32Array]'
  );
}

function printNumber(val) {
  return Object.is(val, -0) ? '-0' : String(val);
}

function printBigInt(val) {
  return String(`${val}n`);
}

function printFunction(val, printFunctionName) {
  if (!printFunctionName) {
    return '[Function]';
  }

  return '[Function ' + (val.name || 'anonymous') + ']';
}

function printSymbol(val) {
  return symbolToString.call(val).replace(SYMBOL_REGEXP, 'Symbol($1)');
}

function printError(val) {
  return '[' + errorToString.call(val) + ']';
}
/**
 * The first port of call for printing an object, handles most of the
 * data-types in JS.
 */

function printBasicValue(val, printFunctionName, escapeRegex, escapeString) {
  if (val === true || val === false) {
    return '' + val;
  }

  if (val === undefined) {
    return 'undefined';
  }

  if (val === null) {
    return 'null';
  }

  const typeOf = typeof val;

  if (typeOf === 'number') {
    return printNumber(val);
  }

  if (typeOf === 'bigint') {
    return printBigInt(val);
  }

  if (typeOf === 'string') {
    if (escapeString) {
      return '"' + val.replace(/"|\\/g, '\\$&') + '"';
    }

    return '"' + val + '"';
  }

  if (typeOf === 'function') {
    return printFunction(val, printFunctionName);
  }

  if (typeOf === 'symbol') {
    return printSymbol(val);
  }

  const toStringed = toString.call(val);

  if (toStringed === '[object WeakMap]') {
    return 'WeakMap {}';
  }

  if (toStringed === '[object WeakSet]') {
    return 'WeakSet {}';
  }

  if (
    toStringed === '[object Function]' ||
    toStringed === '[object GeneratorFunction]'
  ) {
    return printFunction(val, printFunctionName);
  }

  if (toStringed === '[object Symbol]') {
    return printSymbol(val);
  }

  if (toStringed === '[object Date]') {
    return isNaN(+val) ? 'Date { NaN }' : toISOString.call(val);
  }

  if (toStringed === '[object Error]') {
    return printError(val);
  }

  if (toStringed === '[object RegExp]') {
    if (escapeRegex) {
      // https://github.com/benjamingr/RegExp.escape/blob/master/polyfill.js
      return regExpToString.call(val).replace(/[\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    return regExpToString.call(val);
  }

  if (val instanceof Error) {
    return printError(val);
  }

  return null;
}
/**
 * Handles more complex objects ( such as objects with circular references.
 * maps and sets etc )
 */

function printComplexValue(
  val,
  config,
  indentation,
  depth,
  refs,
  hasCalledToJSON
) {
  if (refs.indexOf(val) !== -1) {
    return '[Circular]';
  }

  refs = refs.slice();
  refs.push(val);
  const hitMaxDepth = ++depth > config.maxDepth;
  const min = config.min;

  if (
    config.callToJSON &&
    !hitMaxDepth &&
    val.toJSON &&
    typeof val.toJSON === 'function' &&
    !hasCalledToJSON
  ) {
    return printer(val.toJSON(), config, indentation, depth, refs, true);
  }

  const toStringed = toString.call(val);

  if (toStringed === '[object Arguments]') {
    return hitMaxDepth
      ? '[Arguments]'
      : (min ? '' : 'Arguments ') +
          '[' +
          (0, _collections.printListItems)(
            val,
            config,
            indentation,
            depth,
            refs,
            printer
          ) +
          ']';
  }

  if (isToStringedArrayType(toStringed)) {
    return hitMaxDepth
      ? '[' + val.constructor.name + ']'
      : (min ? '' : val.constructor.name + ' ') +
          '[' +
          (0, _collections.printListItems)(
            val,
            config,
            indentation,
            depth,
            refs,
            printer
          ) +
          ']';
  }

  if (toStringed === '[object Map]') {
    return hitMaxDepth
      ? '[Map]'
      : 'Map {' +
          (0, _collections.printIteratorEntries)(
            val.entries(),
            config,
            indentation,
            depth,
            refs,
            printer,
            ' => '
          ) +
          '}';
  }

  if (toStringed === '[object Set]') {
    return hitMaxDepth
      ? '[Set]'
      : 'Set {' +
          (0, _collections.printIteratorValues)(
            val.values(),
            config,
            indentation,
            depth,
            refs,
            printer
          ) +
          '}';
  } // Avoid failure to serialize global window object in jsdom test environment.
  // For example, not even relevant if window is prop of React element.

  return hitMaxDepth || isWindow(val)
    ? '[' + getConstructorName(val) + ']'
    : (min ? '' : getConstructorName(val) + ' ') +
        '{' +
        (0, _collections.printObjectProperties)(
          val,
          config,
          indentation,
          depth,
          refs,
          printer
        ) +
        '}';
}

function isNewPlugin(plugin) {
  return plugin.serialize != null;
}

function printPlugin(plugin, val, config, indentation, depth, refs) {
  let printed;

  try {
    printed = isNewPlugin(plugin)
      ? plugin.serialize(val, config, indentation, depth, refs, printer)
      : plugin.print(
          val,
          valChild => printer(valChild, config, indentation, depth, refs),
          str => {
            const indentationNext = indentation + config.indent;
            return (
              indentationNext +
              str.replace(NEWLINE_REGEXP, '\n' + indentationNext)
            );
          },
          {
            edgeSpacing: config.spacingOuter,
            min: config.min,
            spacing: config.spacingInner
          },
          config.colors
        );
  } catch (error) {
    throw new PrettyFormatPluginError(error.message, error.stack);
  }

  if (typeof printed !== 'string') {
    throw new Error(
      `pretty-format: Plugin must return type "string" but instead returned "${typeof printed}".`
    );
  }

  return printed;
}

function findPlugin(plugins, val) {
  for (let p = 0; p < plugins.length; p++) {
    try {
      if (plugins[p].test(val)) {
        return plugins[p];
      }
    } catch (error) {
      throw new PrettyFormatPluginError(error.message, error.stack);
    }
  }

  return null;
}

function printer(val, config, indentation, depth, refs, hasCalledToJSON) {
  const plugin = findPlugin(config.plugins, val);

  if (plugin !== null) {
    return printPlugin(plugin, val, config, indentation, depth, refs);
  }

  const basicResult = printBasicValue(
    val,
    config.printFunctionName,
    config.escapeRegex,
    config.escapeString
  );

  if (basicResult !== null) {
    return basicResult;
  }

  return printComplexValue(
    val,
    config,
    indentation,
    depth,
    refs,
    hasCalledToJSON
  );
}

const DEFAULT_THEME = {
  comment: 'gray',
  content: 'reset',
  prop: 'yellow',
  tag: 'cyan',
  value: 'green'
};
const DEFAULT_THEME_KEYS = Object.keys(DEFAULT_THEME);
const DEFAULT_OPTIONS = {
  callToJSON: true,
  escapeRegex: false,
  escapeString: true,
  highlight: false,
  indent: 2,
  maxDepth: Infinity,
  min: false,
  plugins: [],
  printFunctionName: true,
  theme: DEFAULT_THEME
};

function validateOptions(options) {
  Object.keys(options).forEach(key => {
    if (!DEFAULT_OPTIONS.hasOwnProperty(key)) {
      throw new Error(`pretty-format: Unknown option "${key}".`);
    }
  });

  if (options.min && options.indent !== undefined && options.indent !== 0) {
    throw new Error(
      'pretty-format: Options "min" and "indent" cannot be used together.'
    );
  }

  if (options.theme !== undefined) {
    if (options.theme === null) {
      throw new Error(`pretty-format: Option "theme" must not be null.`);
    }

    if (typeof options.theme !== 'object') {
      throw new Error(
        `pretty-format: Option "theme" must be of type "object" but instead received "${typeof options.theme}".`
      );
    }
  }
}

const getColorsHighlight = options =>
  DEFAULT_THEME_KEYS.reduce((colors, key) => {
    const value =
      options.theme && options.theme[key] !== undefined
        ? options.theme[key]
        : DEFAULT_THEME[key];
    const color = value && _ansiStyles.default[value];

    if (
      color &&
      typeof color.close === 'string' &&
      typeof color.open === 'string'
    ) {
      colors[key] = color;
    } else {
      throw new Error(
        `pretty-format: Option "theme" has a key "${key}" whose value "${value}" is undefined in ansi-styles.`
      );
    }

    return colors;
  }, Object.create(null));

const getColorsEmpty = () =>
  DEFAULT_THEME_KEYS.reduce((colors, key) => {
    colors[key] = {
      close: '',
      open: ''
    };
    return colors;
  }, Object.create(null));

const getPrintFunctionName = options =>
  options && options.printFunctionName !== undefined
    ? options.printFunctionName
    : DEFAULT_OPTIONS.printFunctionName;

const getEscapeRegex = options =>
  options && options.escapeRegex !== undefined
    ? options.escapeRegex
    : DEFAULT_OPTIONS.escapeRegex;

const getEscapeString = options =>
  options && options.escapeString !== undefined
    ? options.escapeString
    : DEFAULT_OPTIONS.escapeString;

const getConfig = options => ({
  callToJSON:
    options && options.callToJSON !== undefined
      ? options.callToJSON
      : DEFAULT_OPTIONS.callToJSON,
  colors:
    options && options.highlight
      ? getColorsHighlight(options)
      : getColorsEmpty(),
  escapeRegex: getEscapeRegex(options),
  escapeString: getEscapeString(options),
  indent:
    options && options.min
      ? ''
      : createIndent(
          options && options.indent !== undefined
            ? options.indent
            : DEFAULT_OPTIONS.indent
        ),
  maxDepth:
    options && options.maxDepth !== undefined
      ? options.maxDepth
      : DEFAULT_OPTIONS.maxDepth,
  min: options && options.min !== undefined ? options.min : DEFAULT_OPTIONS.min,
  plugins:
    options && options.plugins !== undefined
      ? options.plugins
      : DEFAULT_OPTIONS.plugins,
  printFunctionName: getPrintFunctionName(options),
  spacingInner: options && options.min ? ' ' : '\n',
  spacingOuter: options && options.min ? '' : '\n'
});

function createIndent(indent) {
  return new Array(indent + 1).join(' ');
}
/**
 * Returns a presentation string of your `val` object
 * @param val any potential JavaScript object
 * @param options Custom settings
 */

function prettyFormat(val, options) {
  if (options) {
    validateOptions(options);

    if (options.plugins) {
      const plugin = findPlugin(options.plugins, val);

      if (plugin !== null) {
        return printPlugin(plugin, val, getConfig(options), '', 0, []);
      }
    }
  }

  const basicResult = printBasicValue(
    val,
    getPrintFunctionName(options),
    getEscapeRegex(options),
    getEscapeString(options)
  );

  if (basicResult !== null) {
    return basicResult;
  }

  return printComplexValue(val, getConfig(options), '', 0, []);
}

prettyFormat.plugins = {
  AsymmetricMatcher: _AsymmetricMatcher.default,
  ConvertAnsi: _ConvertAnsi.default,
  DOMCollection: _DOMCollection.default,
  DOMElement: _DOMElement.default,
  Immutable: _Immutable.default,
  ReactElement: _ReactElement.default,
  ReactTestComponent: _ReactTestComponent.default
};
/* eslint-disable-next-line no-redeclare */

module.exports = prettyFormat;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printIteratorEntries = printIteratorEntries;
exports.printIteratorValues = printIteratorValues;
exports.printListItems = printListItems;
exports.printObjectProperties = printObjectProperties;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const getKeysOfEnumerableProperties = object => {
  const keys = Object.keys(object).sort();

  if (Object.getOwnPropertySymbols) {
    Object.getOwnPropertySymbols(object).forEach(symbol => {
      if (Object.getOwnPropertyDescriptor(object, symbol).enumerable) {
        keys.push(symbol);
      }
    });
  }

  return keys;
};
/**
 * Return entries (for example, of a map)
 * with spacing, indentation, and comma
 * without surrounding punctuation (for example, braces)
 */

function printIteratorEntries( // Flow 0.51.0: property `@@iterator` of $Iterator not found in Object
  // To allow simplistic getRecordIterator in immutable.js
  iterator,
  config,
  indentation,
  depth,
  refs,
  printer, // Too bad, so sad that separator for ECMAScript Map has been ' => '
  // What a distracting diff if you change a data structure to/from
  separator = ': '
) {
  let result = '';
  let current = iterator.next();

  if (!current.done) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;

    while (!current.done) {
      const name = printer(
        current.value[0],
        config,
        indentationNext,
        depth,
        refs
      );
      const value = printer(
        current.value[1],
        config,
        indentationNext,
        depth,
        refs
      );
      result += indentationNext + name + separator + value;
      current = iterator.next();

      if (!current.done) {
        result += ',' + config.spacingInner;
      } else if (!config.min) {
        result += ',';
      }
    }

    result += config.spacingOuter + indentation;
  }

  return result;
}
/**
 * Return values (for example, of a set)
 * with spacing, indentation, and comma
 * without surrounding punctuation (braces or brackets)
 */

function printIteratorValues(
  iterator,
  config,
  indentation,
  depth,
  refs,
  printer
) {
  let result = '';
  let current = iterator.next();

  if (!current.done) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;

    while (!current.done) {
      result +=
        indentationNext +
        printer(current.value, config, indentationNext, depth, refs);
      current = iterator.next();

      if (!current.done) {
        result += ',' + config.spacingInner;
      } else if (!config.min) {
        result += ',';
      }
    }

    result += config.spacingOuter + indentation;
  }

  return result;
}
/**
 * Return items (for example, of an array)
 * with spacing, indentation, and comma
 * without surrounding punctuation (for example, brackets)
 **/

function printListItems(list, config, indentation, depth, refs, printer) {
  let result = '';

  if (list.length) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;

    for (let i = 0; i < list.length; i++) {
      result +=
        indentationNext +
        printer(list[i], config, indentationNext, depth, refs);

      if (i < list.length - 1) {
        result += ',' + config.spacingInner;
      } else if (!config.min) {
        result += ',';
      }
    }

    result += config.spacingOuter + indentation;
  }

  return result;
}
/**
 * Return properties of an object
 * with spacing, indentation, and comma
 * without surrounding punctuation (for example, braces)
 */

function printObjectProperties(val, config, indentation, depth, refs, printer) {
  let result = '';
  const keys = getKeysOfEnumerableProperties(val);

  if (keys.length) {
    result += config.spacingOuter;
    const indentationNext = indentation + config.indent;

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const name = printer(key, config, indentationNext, depth, refs);
      const value = printer(val[key], config, indentationNext, depth, refs);
      result += indentationNext + name + ': ' + value;

      if (i < keys.length - 1) {
        result += ',' + config.spacingInner;
      } else if (!config.min) {
        result += ',';
      }
    }

    result += config.spacingOuter + indentation;
  }

  return result;
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.test = exports.serialize = void 0;

var _collections = __webpack_require__(17);

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
const asymmetricMatcher = Symbol.for('jest.asymmetricMatcher');
const SPACE = ' ';

const serialize = (val, config, indentation, depth, refs, printer) => {
  const stringedValue = val.toString();

  if (
    stringedValue === 'ArrayContaining' ||
    stringedValue === 'ArrayNotContaining'
  ) {
    if (++depth > config.maxDepth) {
      return '[' + stringedValue + ']';
    }

    return (
      stringedValue +
      SPACE +
      '[' +
      (0, _collections.printListItems)(
        val.sample,
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      ']'
    );
  }

  if (
    stringedValue === 'ObjectContaining' ||
    stringedValue === 'ObjectNotContaining'
  ) {
    if (++depth > config.maxDepth) {
      return '[' + stringedValue + ']';
    }

    return (
      stringedValue +
      SPACE +
      '{' +
      (0, _collections.printObjectProperties)(
        val.sample,
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      '}'
    );
  }

  if (
    stringedValue === 'StringMatching' ||
    stringedValue === 'StringNotMatching'
  ) {
    return (
      stringedValue +
      SPACE +
      printer(val.sample, config, indentation, depth, refs)
    );
  }

  if (
    stringedValue === 'StringContaining' ||
    stringedValue === 'StringNotContaining'
  ) {
    return (
      stringedValue +
      SPACE +
      printer(val.sample, config, indentation, depth, refs)
    );
  }

  return val.toAsymmetricMatcher();
};

exports.serialize = serialize;

const test = val => val && val.$$typeof === asymmetricMatcher;

exports.test = test;
const plugin = {
  serialize,
  test
};
var _default = plugin;
exports.default = _default;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.serialize = exports.test = void 0;

var _ansiRegex = _interopRequireDefault(__webpack_require__(20));

var _ansiStyles = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const toHumanReadableAnsi = text =>
  text.replace((0, _ansiRegex.default)(), match => {
    switch (match) {
      case _ansiStyles.default.red.close:
      case _ansiStyles.default.green.close:
      case _ansiStyles.default.cyan.close:
      case _ansiStyles.default.gray.close:
      case _ansiStyles.default.white.close:
      case _ansiStyles.default.yellow.close:
      case _ansiStyles.default.bgRed.close:
      case _ansiStyles.default.bgGreen.close:
      case _ansiStyles.default.bgYellow.close:
      case _ansiStyles.default.inverse.close:
      case _ansiStyles.default.dim.close:
      case _ansiStyles.default.bold.close:
      case _ansiStyles.default.reset.open:
      case _ansiStyles.default.reset.close:
        return '</>';

      case _ansiStyles.default.red.open:
        return '<red>';

      case _ansiStyles.default.green.open:
        return '<green>';

      case _ansiStyles.default.cyan.open:
        return '<cyan>';

      case _ansiStyles.default.gray.open:
        return '<gray>';

      case _ansiStyles.default.white.open:
        return '<white>';

      case _ansiStyles.default.yellow.open:
        return '<yellow>';

      case _ansiStyles.default.bgRed.open:
        return '<bgRed>';

      case _ansiStyles.default.bgGreen.open:
        return '<bgGreen>';

      case _ansiStyles.default.bgYellow.open:
        return '<bgYellow>';

      case _ansiStyles.default.inverse.open:
        return '<inverse>';

      case _ansiStyles.default.dim.open:
        return '<dim>';

      case _ansiStyles.default.bold.open:
        return '<bold>';

      default:
        return '';
    }
  });

const test = val =>
  typeof val === 'string' && !!val.match((0, _ansiRegex.default)());

exports.test = test;

const serialize = (val, config, indentation, depth, refs, printer) =>
  printer(toHumanReadableAnsi(val), config, indentation, depth, refs);

exports.serialize = serialize;
const plugin = {
  serialize,
  test
};
var _default = plugin;
exports.default = _default;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = options => {
	options = Object.assign({
		onlyFirst: false
	}, options);

	const pattern = [
		'[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
		'(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))'
	].join('|');

	return new RegExp(pattern, options.onlyFirst ? undefined : 'g');
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.serialize = exports.test = void 0;

var _collections = __webpack_require__(17);

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(
        Object.getOwnPropertySymbols(source).filter(function(sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        })
      );
    }
    ownKeys.forEach(function(key) {
      _defineProperty(target, key, source[key]);
    });
  }
  return target;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

const SPACE = ' ';
const OBJECT_NAMES = ['DOMStringMap', 'NamedNodeMap'];
const ARRAY_REGEXP = /^(HTML\w*Collection|NodeList)$/;

const testName = name =>
  OBJECT_NAMES.indexOf(name) !== -1 || ARRAY_REGEXP.test(name);

const test = val =>
  val &&
  val.constructor &&
  val.constructor.name &&
  testName(val.constructor.name); // Convert array of attribute objects to props object.

exports.test = test;

const propsReducer = (props, attribute) => {
  props[attribute.name] = attribute.value;
  return props;
};

const serialize = (collection, config, indentation, depth, refs, printer) => {
  const name = collection.constructor.name;

  if (++depth > config.maxDepth) {
    return '[' + name + ']';
  }

  return (
    (config.min ? '' : name + SPACE) +
    (OBJECT_NAMES.indexOf(name) !== -1
      ? '{' +
        (0, _collections.printObjectProperties)(
          name === 'NamedNodeMap'
            ? Array.prototype.reduce.call(collection, propsReducer, {})
            : _objectSpread({}, collection),
          config,
          indentation,
          depth,
          refs,
          printer
        ) +
        '}'
      : '[' +
        (0, _collections.printListItems)(
          Array.from(collection),
          config,
          indentation,
          depth,
          refs,
          printer
        ) +
        ']')
  );
};

exports.serialize = serialize;
const plugin = {
  serialize,
  test
};
var _default = plugin;
exports.default = _default;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.serialize = exports.test = void 0;

var _markup = __webpack_require__(23);

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;
const FRAGMENT_NODE = 11;
const ELEMENT_REGEXP = /^((HTML|SVG)\w*)?Element$/;

const testNode = (nodeType, name) =>
  (nodeType === ELEMENT_NODE && ELEMENT_REGEXP.test(name)) ||
  (nodeType === TEXT_NODE && name === 'Text') ||
  (nodeType === COMMENT_NODE && name === 'Comment') ||
  (nodeType === FRAGMENT_NODE && name === 'DocumentFragment');

const test = val =>
  val &&
  val.constructor &&
  val.constructor.name &&
  testNode(val.nodeType, val.constructor.name);

exports.test = test;

function nodeIsText(node) {
  return node.nodeType === TEXT_NODE;
}

function nodeIsComment(node) {
  return node.nodeType === COMMENT_NODE;
}

function nodeIsFragment(node) {
  return node.nodeType === FRAGMENT_NODE;
}

const serialize = (node, config, indentation, depth, refs, printer) => {
  if (nodeIsText(node)) {
    return (0, _markup.printText)(node.data, config);
  }

  if (nodeIsComment(node)) {
    return (0, _markup.printComment)(node.data, config);
  }

  const type = nodeIsFragment(node)
    ? `DocumentFragment`
    : node.tagName.toLowerCase();

  if (++depth > config.maxDepth) {
    return (0, _markup.printElementAsLeaf)(type, config);
  }

  return (0, _markup.printElement)(
    type,
    (0, _markup.printProps)(
      nodeIsFragment(node)
        ? []
        : Array.from(node.attributes)
            .map(attr => attr.name)
            .sort(),
      nodeIsFragment(node)
        ? []
        : Array.from(node.attributes).reduce((props, attribute) => {
            props[attribute.name] = attribute.value;
            return props;
          }, {}),
      config,
      indentation + config.indent,
      depth,
      refs,
      printer
    ),
    (0, _markup.printChildren)(
      Array.prototype.slice.call(node.childNodes || node.children),
      config,
      indentation + config.indent,
      depth,
      refs,
      printer
    ),
    config,
    indentation
  );
};

exports.serialize = serialize;
const plugin = {
  serialize,
  test
};
var _default = plugin;
exports.default = _default;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.printElementAsLeaf = exports.printElement = exports.printComment = exports.printText = exports.printChildren = exports.printProps = void 0;

var _escapeHTML = _interopRequireDefault(__webpack_require__(24));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Return empty string if keys is empty.
const printProps = (keys, props, config, indentation, depth, refs, printer) => {
  const indentationNext = indentation + config.indent;
  const colors = config.colors;
  return keys
    .map(key => {
      const value = props[key];
      let printed = printer(value, config, indentationNext, depth, refs);

      if (typeof value !== 'string') {
        if (printed.indexOf('\n') !== -1) {
          printed =
            config.spacingOuter +
            indentationNext +
            printed +
            config.spacingOuter +
            indentation;
        }

        printed = '{' + printed + '}';
      }

      return (
        config.spacingInner +
        indentation +
        colors.prop.open +
        key +
        colors.prop.close +
        '=' +
        colors.value.open +
        printed +
        colors.value.close
      );
    })
    .join('');
}; // Return empty string if children is empty.

exports.printProps = printProps;

const printChildren = (children, config, indentation, depth, refs, printer) =>
  children
    .map(
      child =>
        config.spacingOuter +
        indentation +
        (typeof child === 'string'
          ? printText(child, config)
          : printer(child, config, indentation, depth, refs))
    )
    .join('');

exports.printChildren = printChildren;

const printText = (text, config) => {
  const contentColor = config.colors.content;
  return (
    contentColor.open + (0, _escapeHTML.default)(text) + contentColor.close
  );
};

exports.printText = printText;

const printComment = (comment, config) => {
  const commentColor = config.colors.comment;
  return (
    commentColor.open +
    '<!--' +
    (0, _escapeHTML.default)(comment) +
    '-->' +
    commentColor.close
  );
}; // Separate the functions to format props, children, and element,
// so a plugin could override a particular function, if needed.
// Too bad, so sad: the traditional (but unnecessary) space
// in a self-closing tagColor requires a second test of printedProps.

exports.printComment = printComment;

const printElement = (
  type,
  printedProps,
  printedChildren,
  config,
  indentation
) => {
  const tagColor = config.colors.tag;
  return (
    tagColor.open +
    '<' +
    type +
    (printedProps &&
      tagColor.close +
        printedProps +
        config.spacingOuter +
        indentation +
        tagColor.open) +
    (printedChildren
      ? '>' +
        tagColor.close +
        printedChildren +
        config.spacingOuter +
        indentation +
        tagColor.open +
        '</' +
        type
      : (printedProps && !config.min ? '' : ' ') + '/') +
    '>' +
    tagColor.close
  );
};

exports.printElement = printElement;

const printElementAsLeaf = (type, config) => {
  const tagColor = config.colors.tag;
  return (
    tagColor.open +
    '<' +
    type +
    tagColor.close +
    ' …' +
    tagColor.open +
    ' />' +
    tagColor.close
  );
};

exports.printElementAsLeaf = printElementAsLeaf;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = escapeHTML;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function escapeHTML(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.test = exports.serialize = void 0;

var _collections = __webpack_require__(17);

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// SENTINEL constants are from https://github.com/facebook/immutable-js
const IS_ITERABLE_SENTINEL = '@@__IMMUTABLE_ITERABLE__@@';
const IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';
const IS_KEYED_SENTINEL = '@@__IMMUTABLE_KEYED__@@';
const IS_MAP_SENTINEL = '@@__IMMUTABLE_MAP__@@';
const IS_ORDERED_SENTINEL = '@@__IMMUTABLE_ORDERED__@@';
const IS_RECORD_SENTINEL = '@@__IMMUTABLE_RECORD__@@'; // immutable v4

const IS_SEQ_SENTINEL = '@@__IMMUTABLE_SEQ__@@';
const IS_SET_SENTINEL = '@@__IMMUTABLE_SET__@@';
const IS_STACK_SENTINEL = '@@__IMMUTABLE_STACK__@@';

const getImmutableName = name => 'Immutable.' + name;

const printAsLeaf = name => '[' + name + ']';

const SPACE = ' ';
const LAZY = '…'; // Seq is lazy if it calls a method like filter

const printImmutableEntries = (
  val,
  config,
  indentation,
  depth,
  refs,
  printer,
  type
) =>
  ++depth > config.maxDepth
    ? printAsLeaf(getImmutableName(type))
    : getImmutableName(type) +
      SPACE +
      '{' +
      (0, _collections.printIteratorEntries)(
        val.entries(),
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      '}'; // Record has an entries method because it is a collection in immutable v3.
// Return an iterator for Immutable Record from version v3 or v4.

const getRecordEntries = val => {
  let i = 0;
  return {
    next() {
      if (i < val._keys.length) {
        const key = val._keys[i++];
        return {
          done: false,
          value: [key, val.get(key)]
        };
      }

      return {
        done: true
      };
    }
  };
};

const printImmutableRecord = (
  val,
  config,
  indentation,
  depth,
  refs,
  printer
) => {
  // _name property is defined only for an Immutable Record instance
  // which was constructed with a second optional descriptive name arg
  const name = getImmutableName(val._name || 'Record');
  return ++depth > config.maxDepth
    ? printAsLeaf(name)
    : name +
        SPACE +
        '{' +
        (0, _collections.printIteratorEntries)(
          getRecordEntries(val),
          config,
          indentation,
          depth,
          refs,
          printer
        ) +
        '}';
};

const printImmutableSeq = (val, config, indentation, depth, refs, printer) => {
  const name = getImmutableName('Seq');

  if (++depth > config.maxDepth) {
    return printAsLeaf(name);
  }

  if (val[IS_KEYED_SENTINEL]) {
    return (
      name +
      SPACE +
      '{' + // from Immutable collection of entries or from ECMAScript object
      (val._iter || val._object
        ? (0, _collections.printIteratorEntries)(
            val.entries(),
            config,
            indentation,
            depth,
            refs,
            printer
          )
        : LAZY) +
      '}'
    );
  }

  return (
    name +
    SPACE +
    '[' +
    (val._iter || // from Immutable collection of values
    val._array || // from ECMAScript array
    val._collection || // from ECMAScript collection in immutable v4
    val._iterable // from ECMAScript collection in immutable v3
      ? (0, _collections.printIteratorValues)(
          val.values(),
          config,
          indentation,
          depth,
          refs,
          printer
        )
      : LAZY) +
    ']'
  );
};

const printImmutableValues = (
  val,
  config,
  indentation,
  depth,
  refs,
  printer,
  type
) =>
  ++depth > config.maxDepth
    ? printAsLeaf(getImmutableName(type))
    : getImmutableName(type) +
      SPACE +
      '[' +
      (0, _collections.printIteratorValues)(
        val.values(),
        config,
        indentation,
        depth,
        refs,
        printer
      ) +
      ']';

const serialize = (val, config, indentation, depth, refs, printer) => {
  if (val[IS_MAP_SENTINEL]) {
    return printImmutableEntries(
      val,
      config,
      indentation,
      depth,
      refs,
      printer,
      val[IS_ORDERED_SENTINEL] ? 'OrderedMap' : 'Map'
    );
  }

  if (val[IS_LIST_SENTINEL]) {
    return printImmutableValues(
      val,
      config,
      indentation,
      depth,
      refs,
      printer,
      'List'
    );
  }

  if (val[IS_SET_SENTINEL]) {
    return printImmutableValues(
      val,
      config,
      indentation,
      depth,
      refs,
      printer,
      val[IS_ORDERED_SENTINEL] ? 'OrderedSet' : 'Set'
    );
  }

  if (val[IS_STACK_SENTINEL]) {
    return printImmutableValues(
      val,
      config,
      indentation,
      depth,
      refs,
      printer,
      'Stack'
    );
  }

  if (val[IS_SEQ_SENTINEL]) {
    return printImmutableSeq(val, config, indentation, depth, refs, printer);
  } // For compatibility with immutable v3 and v4, let record be the default.

  return printImmutableRecord(val, config, indentation, depth, refs, printer);
}; // Explicitly comparing sentinel properties to true avoids false positive
// when mock identity-obj-proxy returns the key as the value for any key.

exports.serialize = serialize;

const test = val =>
  val &&
  (val[IS_ITERABLE_SENTINEL] === true || val[IS_RECORD_SENTINEL] === true);

exports.test = test;
const plugin = {
  serialize,
  test
};
var _default = plugin;
exports.default = _default;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.test = exports.serialize = void 0;

var ReactIs = _interopRequireWildcard(__webpack_require__(27));

var _markup = __webpack_require__(23);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc =
            Object.defineProperty && Object.getOwnPropertyDescriptor
              ? Object.getOwnPropertyDescriptor(obj, key)
              : {};
          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// Given element.props.children, or subtree during recursive traversal,
// return flattened array of children.
const getChildren = (arg, children = []) => {
  if (Array.isArray(arg)) {
    arg.forEach(item => {
      getChildren(item, children);
    });
  } else if (arg != null && arg !== false) {
    children.push(arg);
  }

  return children;
};

const getType = element => {
  const type = element.type;

  if (typeof type === 'string') {
    return type;
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || 'Unknown';
  }

  if (ReactIs.isFragment(element)) {
    return 'React.Fragment';
  }

  if (ReactIs.isSuspense(element)) {
    return 'React.Suspense';
  }

  if (typeof type === 'object' && type !== null) {
    if (ReactIs.isContextProvider(element)) {
      return 'Context.Provider';
    }

    if (ReactIs.isContextConsumer(element)) {
      return 'Context.Consumer';
    }

    if (ReactIs.isForwardRef(element)) {
      const functionName = type.render.displayName || type.render.name || '';
      return functionName !== ''
        ? 'ForwardRef(' + functionName + ')'
        : 'ForwardRef';
    }

    if (ReactIs.isMemo(type)) {
      const functionName =
        type.displayName || type.type.displayName || type.type.name || '';
      return functionName !== '' ? 'Memo(' + functionName + ')' : 'Memo';
    }
  }

  return 'UNDEFINED';
};

const getPropKeys = element => {
  const props = element.props;
  return Object.keys(props)
    .filter(key => key !== 'children' && props[key] !== undefined)
    .sort();
};

const serialize = (element, config, indentation, depth, refs, printer) =>
  ++depth > config.maxDepth
    ? (0, _markup.printElementAsLeaf)(getType(element), config)
    : (0, _markup.printElement)(
        getType(element),
        (0, _markup.printProps)(
          getPropKeys(element),
          element.props,
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        (0, _markup.printChildren)(
          getChildren(element.props.children),
          config,
          indentation + config.indent,
          depth,
          refs,
          printer
        ),
        config,
        indentation
      );

exports.serialize = serialize;

const test = val => val && ReactIs.isElement(val);

exports.test = test;
const plugin = {
  serialize,
  test
};
var _default = plugin;
exports.default = _default;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(28);
}


/***/ }),
/* 28 */
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = exports.test = exports.serialize = void 0;

var _markup = __webpack_require__(23);

var Symbol = global['jest-symbol-do-not-touch'] || global.Symbol;
const testSymbol = Symbol.for('react.test.json');

const getPropKeys = object => {
  const props = object.props;
  return props
    ? Object.keys(props)
        .filter(key => props[key] !== undefined)
        .sort()
    : [];
};

const serialize = (object, config, indentation, depth, refs, printer) =>
  ++depth > config.maxDepth
    ? (0, _markup.printElementAsLeaf)(object.type, config)
    : (0, _markup.printElement)(
        object.type,
        object.props
          ? (0, _markup.printProps)(
              getPropKeys(object),
              object.props,
              config,
              indentation + config.indent,
              depth,
              refs,
              printer
            )
          : '',
        object.children
          ? (0, _markup.printChildren)(
              object.children,
              config,
              indentation + config.indent,
              depth,
              refs,
              printer
            )
          : '',
        config,
        indentation
      );

exports.serialize = serialize;

const test = val => val && val.$$typeof === testSymbol;

exports.test = test;
const plugin = {
  serialize,
  test
};
var _default = plugin;
exports.default = _default;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// get the type of a value with handling the edge cases like `typeof []`
// and `typeof null`
function getType(value) {
  if (value === undefined) {
    return 'undefined';
  } else if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  } else if (typeof value === 'boolean') {
    return 'boolean';
  } else if (typeof value === 'function') {
    return 'function';
  } else if (typeof value === 'number') {
    return 'number';
  } else if (typeof value === 'string') {
    return 'string';
  } else if (typeof value === 'object') {
    if (value != null) {
      if (value.constructor === RegExp) {
        return 'regexp';
      } else if (value.constructor === Map) {
        return 'map';
      } else if (value.constructor === Set) {
        return 'set';
      } else if (value.constructor === Date) {
        return 'date';
      }
    }

    return 'object';
  } else if (typeof value === 'symbol') {
    return 'symbol';
  }

  throw new Error(`value of unknown type: ${value}`);
}

getType.isPrimitive = value => Object(value) !== value;

module.exports = getType;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(3));

var _diffSequences = _interopRequireDefault(__webpack_require__(32));

var _constants = __webpack_require__(33);

var _printDiffs = __webpack_require__(34);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DIFF_CONTEXT_DEFAULT = 5;
const fgDelete = _chalk.default.green;
const fgInsert = _chalk.default.red;
const fgCommon = _chalk.default.dim; // common lines (even indentation same)

const fgIndent = _chalk.default.cyan; // common lines (only indentation different)

const bgCommon = _chalk.default.bgYellow; // edge spaces in common line (even indentation same)

const bgInverse = _chalk.default.inverse; // edge spaces in any other lines
// ONLY trailing if expected value is snapshot or multiline string.

const highlightTrailingSpaces = (line, bgColor) =>
  line.replace(/\s+$/, bgColor('$&')); // BOTH leading AND trailing if expected value is data structure.

const highlightLeadingTrailingSpaces = (
  line,
  bgColor // If line consists of ALL spaces: highlight all of them.
) =>
  highlightTrailingSpaces(line, bgColor).replace(
    // If line has an ODD length of leading spaces: highlight only the LAST.
    /^(\s\s)*(\s)(?=[^\s])/,
    '$1' + bgColor('$2')
  );

const getHighlightSpaces = bothEdges =>
  bothEdges ? highlightLeadingTrailingSpaces : highlightTrailingSpaces;

// Given index interval in expected lines, put formatted delete lines.
const formatDelete = (aStart, aEnd, aLinesUn, aLinesIn, put) => {
  const highlightSpaces = getHighlightSpaces(aLinesUn !== aLinesIn);

  for (let aIndex = aStart; aIndex !== aEnd; aIndex += 1) {
    const aLineUn = aLinesUn[aIndex];
    const aLineIn = aLinesIn[aIndex];
    const indentation = aLineIn.slice(0, aLineIn.length - aLineUn.length);
    put(fgDelete('- ' + indentation + highlightSpaces(aLineUn, bgInverse)));
  }
}; // Given index interval in received lines, put formatted insert lines.

const formatInsert = (bStart, bEnd, bLinesUn, bLinesIn, put) => {
  const highlightSpaces = getHighlightSpaces(bLinesUn !== bLinesIn);

  for (let bIndex = bStart; bIndex !== bEnd; bIndex += 1) {
    const bLineUn = bLinesUn[bIndex];
    const bLineIn = bLinesIn[bIndex];
    const indentation = bLineIn.slice(0, bLineIn.length - bLineUn.length);
    put(fgInsert('+ ' + indentation + highlightSpaces(bLineUn, bgInverse)));
  }
}; // Given the number of items and starting indexes of a common subsequence,
// put formatted common lines.

const formatCommon = (
  nCommon,
  aCommon,
  bCommon,
  aLinesIn,
  bLinesUn,
  bLinesIn,
  put
) => {
  const highlightSpaces = getHighlightSpaces(bLinesUn !== bLinesIn);

  for (; nCommon !== 0; nCommon -= 1, aCommon += 1, bCommon += 1) {
    const bLineUn = bLinesUn[bCommon];
    const bLineIn = bLinesIn[bCommon];
    const bLineInLength = bLineIn.length; // For common lines, received indentation seems more intuitive.

    const indentation = bLineIn.slice(0, bLineInLength - bLineUn.length); // Color shows whether expected and received line has same indentation.

    const hasSameIndentation = aLinesIn[aCommon].length === bLineInLength;
    const fg = hasSameIndentation ? fgCommon : fgIndent;
    const bg = hasSameIndentation ? bgCommon : bgInverse;
    put(fg('  ' + indentation + highlightSpaces(bLineUn, bg)));
  }
}; // jest --expand
// Return formatted diff as joined string of all lines.

const diffExpand = (aLinesUn, bLinesUn, aLinesIn, bLinesIn) => {
  const isCommon = (aIndex, bIndex) => aLinesUn[aIndex] === bLinesUn[bIndex];

  const array = [];

  const put = line => {
    array.push(line);
  };

  let aStart = 0;
  let bStart = 0;

  const foundSubsequence = (nCommon, aCommon, bCommon) => {
    formatDelete(aStart, aCommon, aLinesUn, aLinesIn, put);
    formatInsert(bStart, bCommon, bLinesUn, bLinesIn, put);
    formatCommon(nCommon, aCommon, bCommon, aLinesIn, bLinesUn, bLinesIn, put);
    aStart = aCommon + nCommon;
    bStart = bCommon + nCommon;
  };

  const aLength = aLinesUn.length;
  const bLength = bLinesUn.length;
  (0, _diffSequences.default)(aLength, bLength, isCommon, foundSubsequence); // After the last common subsequence, format remaining change lines.

  formatDelete(aStart, aLength, aLinesUn, aLinesIn, put);
  formatInsert(bStart, bLength, bLinesUn, bLinesIn, put);
  return array.join('\n');
};

const getContextLines = options =>
  options &&
  typeof options.contextLines === 'number' &&
  options.contextLines >= 0
    ? options.contextLines
    : DIFF_CONTEXT_DEFAULT; // jest --no-expand
// Return joined string of formatted diff for all change lines,
// but if some common lines are omitted because there are more than the context,
// then a “patch mark” precedes each set of adjacent changed and common lines.

const diffNoExpand = (
  aLinesUn,
  bLinesUn,
  aLinesIn,
  bLinesIn,
  nContextLines
) => {
  const isCommon = (aIndex, bIndex) => aLinesUn[aIndex] === bLinesUn[bIndex];

  let iPatchMark = 0; // index of placeholder line for patch mark

  const array = [''];

  const put = line => {
    array.push(line);
  };

  let isAtEnd = false;
  const aLength = aLinesUn.length;
  const bLength = bLinesUn.length;
  const nContextLines2 = nContextLines + nContextLines; // Initialize the first patch for changes at the start,
  // especially for edge case in which there is no common subsequence.

  let aStart = 0;
  let aEnd = 0;
  let bStart = 0;
  let bEnd = 0; // Given the number of items and starting indexes of each common subsequence,
  // format any preceding change lines, and then common context lines.

  const foundSubsequence = (nCommon, aStartCommon, bStartCommon) => {
    const aEndCommon = aStartCommon + nCommon;
    const bEndCommon = bStartCommon + nCommon;
    isAtEnd = aEndCommon === aLength && bEndCommon === bLength; // If common subsequence is at start, re-initialize the first patch.

    if (aStartCommon === 0 && bStartCommon === 0) {
      const nLines = nContextLines < nCommon ? nContextLines : nCommon;
      aStart = aEndCommon - nLines;
      bStart = bEndCommon - nLines;
      formatCommon(nLines, aStart, bStart, aLinesIn, bLinesUn, bLinesIn, put);
      aEnd = aEndCommon;
      bEnd = bEndCommon;
      return;
    } // Format preceding change lines.

    formatDelete(aEnd, aStartCommon, aLinesUn, aLinesIn, put);
    formatInsert(bEnd, bStartCommon, bLinesUn, bLinesIn, put);
    aEnd = aStartCommon;
    bEnd = bStartCommon; // If common subsequence is at end, then context follows preceding changes;
    // else context follows preceding changes AND precedes following changes.

    const maxContextLines = isAtEnd ? nContextLines : nContextLines2;

    if (nCommon <= maxContextLines) {
      // The patch includes all lines in the common subsequence.
      formatCommon(nCommon, aEnd, bEnd, aLinesIn, bLinesUn, bLinesIn, put);
      aEnd += nCommon;
      bEnd += nCommon;
      return;
    } // The patch ends because context is less than number of common lines.

    formatCommon(nContextLines, aEnd, bEnd, aLinesIn, bLinesUn, bLinesIn, put);
    aEnd += nContextLines;
    bEnd += nContextLines;
    array[iPatchMark] = (0, _printDiffs.createPatchMark)(
      aStart,
      aEnd,
      bStart,
      bEnd
    ); // If common subsequence is not at end, another patch follows it.

    if (!isAtEnd) {
      iPatchMark = array.length; // index of placeholder line

      array[iPatchMark] = '';
      const nLines = nContextLines < nCommon ? nContextLines : nCommon;
      aStart = aEndCommon - nLines;
      bStart = bEndCommon - nLines;
      formatCommon(nLines, aStart, bStart, aLinesIn, bLinesUn, bLinesIn, put);
      aEnd = aEndCommon;
      bEnd = bEndCommon;
    }
  };

  (0, _diffSequences.default)(aLength, bLength, isCommon, foundSubsequence); // If no common subsequence or last was not at end, format remaining change lines.

  if (!isAtEnd) {
    formatDelete(aEnd, aLength, aLinesUn, aLinesIn, put);
    formatInsert(bEnd, bLength, bLinesUn, bLinesIn, put);
    aEnd = aLength;
    bEnd = bLength;
  }

  if (aStart === 0 && aEnd === aLength && bStart === 0 && bEnd === bLength) {
    array.splice(0, 1); // delete placeholder line for patch mark
  } else {
    array[iPatchMark] = (0, _printDiffs.createPatchMark)(
      aStart,
      aEnd,
      bStart,
      bEnd
    );
  }

  return array.join('\n');
};

var _default = (a, b, options, original) => {
  if (a === b) {
    return _constants.NO_DIFF_MESSAGE;
  }

  let aLinesUn = a.split('\n');
  let bLinesUn = b.split('\n'); // Indentation is unknown if expected value is snapshot or multiline string.

  let aLinesIn = aLinesUn;
  let bLinesIn = bLinesUn;

  if (original) {
    // Indentation is known if expected value is data structure:
    // Compare lines without indentation and format lines with indentation.
    aLinesIn = original.a.split('\n');
    bLinesIn = original.b.split('\n');

    if (
      aLinesUn.length !== aLinesIn.length ||
      bLinesUn.length !== bLinesIn.length
    ) {
      // Fall back if unindented and indented lines are inconsistent.
      aLinesUn = aLinesIn;
      bLinesUn = bLinesIn;
    }
  }

  return (
    (0, _printDiffs.printAnnotation)(options) +
    (options && options.expand === false
      ? diffNoExpand(
          aLinesUn,
          bLinesUn,
          aLinesIn,
          bLinesIn,
          getContextLines(options)
        )
      : diffExpand(aLinesUn, bLinesUn, aLinesIn, bLinesIn))
  );
};

exports.default = _default;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// This diff-sequences package implements the linear space variation in
// An O(ND) Difference Algorithm and Its Variations by Eugene W. Myers
// Relationship in notation between Myers paper and this package:
// A is a
// N is aLength, aEnd - aStart, and so on
// x is aIndex, aFirst, aLast, and so on
// B is b
// M is bLength, bEnd - bStart, and so on
// y is bIndex, bFirst, bLast, and so on
// Δ = N - M is negative of baDeltaLength = bLength - aLength
// D is d
// k is kF
// k + Δ is kF = kR - baDeltaLength
// V is aIndexesF or aIndexesR (see comment below about Indexes type)
// index intervals [1, N] and [1, M] are [0, aLength) and [0, bLength)
// starting point in forward direction (0, 0) is (-1, -1)
// starting point in reverse direction (N + 1, M + 1) is (aLength, bLength)
// The “edit graph” for sequences a and b corresponds to items:
// in a on the horizontal axis
// in b on the vertical axis
//
// Given a-coordinate of a point in a diagonal, you can compute b-coordinate.
//
// Forward diagonals kF:
// zero diagonal intersects top left corner
// positive diagonals intersect top edge
// negative diagonals insersect left edge
//
// Reverse diagonals kR:
// zero diagonal intersects bottom right corner
// positive diagonals intersect right edge
// negative diagonals intersect bottom edge
// The graph contains a directed acyclic graph of edges:
// horizontal: delete an item from a
// vertical: insert an item from b
// diagonal: common item in a and b
//
// The algorithm solves dual problems in the graph analogy:
// Find longest common subsequence: path with maximum number of diagonal edges
// Find shortest edit script: path with minimum number of non-diagonal edges
// Input callback function compares items at indexes in the sequences.
// Output callback function receives the number of adjacent items
// and starting indexes of each common subsequence.
// Either original functions or wrapped to swap indexes if graph is transposed.
// Indexes in sequence a of last point of forward or reverse paths in graph.
// Myers algorithm indexes by diagonal k which for negative is bad deopt in V8.
// This package indexes by iF and iR which are greater than or equal to zero.
// and also updates the index arrays in place to cut memory in half.
// kF = 2 * iF - d
// kR = d - 2 * iR
// Division of index intervals in sequences a and b at the middle change.
// Invariant: intervals do not have common items at the start or end.
const pkg = 'diff-sequences'; // for error messages

const NOT_YET_SET = 0; // small int instead of undefined to avoid deopt in V8
// Return the number of common items that follow in forward direction.
// The length of what Myers paper calls a “snake” in a forward path.

const countCommonItemsF = (aIndex, aEnd, bIndex, bEnd, isCommon) => {
  let nCommon = 0;

  while (aIndex < aEnd && bIndex < bEnd && isCommon(aIndex, bIndex)) {
    aIndex += 1;
    bIndex += 1;
    nCommon += 1;
  }

  return nCommon;
}; // Return the number of common items that precede in reverse direction.
// The length of what Myers paper calls a “snake” in a reverse path.

const countCommonItemsR = (aStart, aIndex, bStart, bIndex, isCommon) => {
  let nCommon = 0;

  while (aStart <= aIndex && bStart <= bIndex && isCommon(aIndex, bIndex)) {
    aIndex -= 1;
    bIndex -= 1;
    nCommon += 1;
  }

  return nCommon;
}; // A simple function to extend forward paths from (d - 1) to d changes
// when forward and reverse paths cannot yet overlap.

const extendPathsF = (d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF) => {
  // Unroll the first iteration.
  let iF = 0;
  let kF = -d; // kF = 2 * iF - d

  let aFirst = aIndexesF[iF]; // in first iteration always insert

  let aIndexPrev1 = aFirst; // prev value of [iF - 1] in next iteration

  aIndexesF[iF] += countCommonItemsF(
    aFirst + 1,
    aEnd,
    bF + aFirst - kF + 1,
    bEnd,
    isCommon
  ); // Optimization: skip diagonals in which paths cannot ever overlap.

  const nF = d < iMaxF ? d : iMaxF; // The diagonals kF are odd when d is odd and even when d is even.

  for (iF += 1, kF += 2; iF <= nF; iF += 1, kF += 2) {
    // To get first point of path segment, move one change in forward direction
    // from last point of previous path segment in an adjacent diagonal.
    // In last possible iteration when iF === d and kF === d always delete.
    if (iF !== d && aIndexPrev1 < aIndexesF[iF]) {
      aFirst = aIndexesF[iF]; // vertical to insert from b
    } else {
      aFirst = aIndexPrev1 + 1; // horizontal to delete from a

      if (aEnd <= aFirst) {
        // Optimization: delete moved past right of graph.
        return iF - 1;
      }
    } // To get last point of path segment, move along diagonal of common items.

    aIndexPrev1 = aIndexesF[iF];
    aIndexesF[iF] =
      aFirst +
      countCommonItemsF(aFirst + 1, aEnd, bF + aFirst - kF + 1, bEnd, isCommon);
  }

  return iMaxF;
}; // A simple function to extend reverse paths from (d - 1) to d changes
// when reverse and forward paths cannot yet overlap.

const extendPathsR = (d, aStart, bStart, bR, isCommon, aIndexesR, iMaxR) => {
  // Unroll the first iteration.
  let iR = 0;
  let kR = d; // kR = d - 2 * iR

  let aFirst = aIndexesR[iR]; // in first iteration always insert

  let aIndexPrev1 = aFirst; // prev value of [iR - 1] in next iteration

  aIndexesR[iR] -= countCommonItemsR(
    aStart,
    aFirst - 1,
    bStart,
    bR + aFirst - kR - 1,
    isCommon
  ); // Optimization: skip diagonals in which paths cannot ever overlap.

  const nR = d < iMaxR ? d : iMaxR; // The diagonals kR are odd when d is odd and even when d is even.

  for (iR += 1, kR -= 2; iR <= nR; iR += 1, kR -= 2) {
    // To get first point of path segment, move one change in reverse direction
    // from last point of previous path segment in an adjacent diagonal.
    // In last possible iteration when iR === d and kR === -d always delete.
    if (iR !== d && aIndexesR[iR] < aIndexPrev1) {
      aFirst = aIndexesR[iR]; // vertical to insert from b
    } else {
      aFirst = aIndexPrev1 - 1; // horizontal to delete from a

      if (aFirst < aStart) {
        // Optimization: delete moved past left of graph.
        return iR - 1;
      }
    } // To get last point of path segment, move along diagonal of common items.

    aIndexPrev1 = aIndexesR[iR];
    aIndexesR[iR] =
      aFirst -
      countCommonItemsR(
        aStart,
        aFirst - 1,
        bStart,
        bR + aFirst - kR - 1,
        isCommon
      );
  }

  return iMaxR;
}; // A complete function to extend forward paths from (d - 1) to d changes.
// Return true if a path overlaps reverse path of (d - 1) changes in its diagonal.

const extendOverlappablePathsF = (
  d,
  aStart,
  aEnd,
  bStart,
  bEnd,
  isCommon,
  aIndexesF,
  iMaxF,
  aIndexesR,
  iMaxR,
  division
) => {
  const bF = bStart - aStart; // bIndex = bF + aIndex - kF

  const aLength = aEnd - aStart;
  const bLength = bEnd - bStart;
  const baDeltaLength = bLength - aLength; // kF = kR - baDeltaLength
  // Range of diagonals in which forward and reverse paths might overlap.

  const kMinOverlapF = -baDeltaLength - (d - 1); // -(d - 1) <= kR

  const kMaxOverlapF = -baDeltaLength + (d - 1); // kR <= (d - 1)

  let aIndexPrev1 = NOT_YET_SET; // prev value of [iF - 1] in next iteration
  // Optimization: skip diagonals in which paths cannot ever overlap.

  const nF = d < iMaxF ? d : iMaxF; // The diagonals kF = 2 * iF - d are odd when d is odd and even when d is even.

  for (let iF = 0, kF = -d; iF <= nF; iF += 1, kF += 2) {
    // To get first point of path segment, move one change in forward direction
    // from last point of previous path segment in an adjacent diagonal.
    // In first iteration when iF === 0 and kF === -d always insert.
    // In last possible iteration when iF === d and kF === d always delete.
    const insert = iF === 0 || (iF !== d && aIndexPrev1 < aIndexesF[iF]);
    const aLastPrev = insert ? aIndexesF[iF] : aIndexPrev1;
    const aFirst = insert
      ? aLastPrev // vertical to insert from b
      : aLastPrev + 1; // horizontal to delete from a
    // To get last point of path segment, move along diagonal of common items.

    const bFirst = bF + aFirst - kF;
    const nCommonF = countCommonItemsF(
      aFirst + 1,
      aEnd,
      bFirst + 1,
      bEnd,
      isCommon
    );
    const aLast = aFirst + nCommonF;
    aIndexPrev1 = aIndexesF[iF];
    aIndexesF[iF] = aLast;

    if (kMinOverlapF <= kF && kF <= kMaxOverlapF) {
      // Solve for iR of reverse path with (d - 1) changes in diagonal kF:
      // kR = kF + baDeltaLength
      // kR = (d - 1) - 2 * iR
      const iR = (d - 1 - (kF + baDeltaLength)) / 2; // If this forward path overlaps the reverse path in this diagonal,
      // then this is the middle change of the index intervals.

      if (iR <= iMaxR && aIndexesR[iR] - 1 <= aLast) {
        // Unlike the Myers algorithm which finds only the middle “snake”
        // this package can find two common subsequences per division.
        // Last point of previous path segment is on an adjacent diagonal.
        const bLastPrev = bF + aLastPrev - (insert ? kF + 1 : kF - 1); // Because of invariant that intervals preceding the middle change
        // cannot have common items at the end,
        // move in reverse direction along a diagonal of common items.

        const nCommonR = countCommonItemsR(
          aStart,
          aLastPrev,
          bStart,
          bLastPrev,
          isCommon
        );
        const aIndexPrevFirst = aLastPrev - nCommonR;
        const bIndexPrevFirst = bLastPrev - nCommonR;
        const aEndPreceding = aIndexPrevFirst + 1;
        const bEndPreceding = bIndexPrevFirst + 1;
        division.nChangePreceding = d - 1;

        if (d - 1 === aEndPreceding + bEndPreceding - aStart - bStart) {
          // Optimization: number of preceding changes in forward direction
          // is equal to number of items in preceding interval,
          // therefore it cannot contain any common items.
          division.aEndPreceding = aStart;
          division.bEndPreceding = bStart;
        } else {
          division.aEndPreceding = aEndPreceding;
          division.bEndPreceding = bEndPreceding;
        }

        division.nCommonPreceding = nCommonR;

        if (nCommonR !== 0) {
          division.aCommonPreceding = aEndPreceding;
          division.bCommonPreceding = bEndPreceding;
        }

        division.nCommonFollowing = nCommonF;

        if (nCommonF !== 0) {
          division.aCommonFollowing = aFirst + 1;
          division.bCommonFollowing = bFirst + 1;
        }

        const aStartFollowing = aLast + 1;
        const bStartFollowing = bFirst + nCommonF + 1;
        division.nChangeFollowing = d - 1;

        if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
          // Optimization: number of changes in reverse direction
          // is equal to number of items in following interval,
          // therefore it cannot contain any common items.
          division.aStartFollowing = aEnd;
          division.bStartFollowing = bEnd;
        } else {
          division.aStartFollowing = aStartFollowing;
          division.bStartFollowing = bStartFollowing;
        }

        return true;
      }
    }
  }

  return false;
}; // A complete function to extend reverse paths from (d - 1) to d changes.
// Return true if a path overlaps forward path of d changes in its diagonal.

const extendOverlappablePathsR = (
  d,
  aStart,
  aEnd,
  bStart,
  bEnd,
  isCommon,
  aIndexesF,
  iMaxF,
  aIndexesR,
  iMaxR,
  division
) => {
  const bR = bEnd - aEnd; // bIndex = bR + aIndex - kR

  const aLength = aEnd - aStart;
  const bLength = bEnd - bStart;
  const baDeltaLength = bLength - aLength; // kR = kF + baDeltaLength
  // Range of diagonals in which forward and reverse paths might overlap.

  const kMinOverlapR = baDeltaLength - d; // -d <= kF

  const kMaxOverlapR = baDeltaLength + d; // kF <= d

  let aIndexPrev1 = NOT_YET_SET; // prev value of [iR - 1] in next iteration
  // Optimization: skip diagonals in which paths cannot ever overlap.

  const nR = d < iMaxR ? d : iMaxR; // The diagonals kR = d - 2 * iR are odd when d is odd and even when d is even.

  for (let iR = 0, kR = d; iR <= nR; iR += 1, kR -= 2) {
    // To get first point of path segment, move one change in reverse direction
    // from last point of previous path segment in an adjacent diagonal.
    // In first iteration when iR === 0 and kR === d always insert.
    // In last possible iteration when iR === d and kR === -d always delete.
    const insert = iR === 0 || (iR !== d && aIndexesR[iR] < aIndexPrev1);
    const aLastPrev = insert ? aIndexesR[iR] : aIndexPrev1;
    const aFirst = insert
      ? aLastPrev // vertical to insert from b
      : aLastPrev - 1; // horizontal to delete from a
    // To get last point of path segment, move along diagonal of common items.

    const bFirst = bR + aFirst - kR;
    const nCommonR = countCommonItemsR(
      aStart,
      aFirst - 1,
      bStart,
      bFirst - 1,
      isCommon
    );
    const aLast = aFirst - nCommonR;
    aIndexPrev1 = aIndexesR[iR];
    aIndexesR[iR] = aLast;

    if (kMinOverlapR <= kR && kR <= kMaxOverlapR) {
      // Solve for iF of forward path with d changes in diagonal kR:
      // kF = kR - baDeltaLength
      // kF = 2 * iF - d
      const iF = (d + (kR - baDeltaLength)) / 2; // If this reverse path overlaps the forward path in this diagonal,
      // then this is a middle change of the index intervals.

      if (iF <= iMaxF && aLast - 1 <= aIndexesF[iF]) {
        const bLast = bFirst - nCommonR;
        division.nChangePreceding = d;

        if (d === aLast + bLast - aStart - bStart) {
          // Optimization: number of changes in reverse direction
          // is equal to number of items in preceding interval,
          // therefore it cannot contain any common items.
          division.aEndPreceding = aStart;
          division.bEndPreceding = bStart;
        } else {
          division.aEndPreceding = aLast;
          division.bEndPreceding = bLast;
        }

        division.nCommonPreceding = nCommonR;

        if (nCommonR !== 0) {
          // The last point of reverse path segment is start of common subsequence.
          division.aCommonPreceding = aLast;
          division.bCommonPreceding = bLast;
        }

        division.nChangeFollowing = d - 1;

        if (d === 1) {
          // There is no previous path segment.
          division.nCommonFollowing = 0;
          division.aStartFollowing = aEnd;
          division.bStartFollowing = bEnd;
        } else {
          // Unlike the Myers algorithm which finds only the middle “snake”
          // this package can find two common subsequences per division.
          // Last point of previous path segment is on an adjacent diagonal.
          const bLastPrev = bR + aLastPrev - (insert ? kR - 1 : kR + 1); // Because of invariant that intervals following the middle change
          // cannot have common items at the start,
          // move in forward direction along a diagonal of common items.

          const nCommonF = countCommonItemsF(
            aLastPrev,
            aEnd,
            bLastPrev,
            bEnd,
            isCommon
          );
          division.nCommonFollowing = nCommonF;

          if (nCommonF !== 0) {
            // The last point of reverse path segment is start of common subsequence.
            division.aCommonFollowing = aLastPrev;
            division.bCommonFollowing = bLastPrev;
          }

          const aStartFollowing = aLastPrev + nCommonF; // aFirstPrev

          const bStartFollowing = bLastPrev + nCommonF; // bFirstPrev

          if (d - 1 === aEnd + bEnd - aStartFollowing - bStartFollowing) {
            // Optimization: number of changes in forward direction
            // is equal to number of items in following interval,
            // therefore it cannot contain any common items.
            division.aStartFollowing = aEnd;
            division.bStartFollowing = bEnd;
          } else {
            division.aStartFollowing = aStartFollowing;
            division.bStartFollowing = bStartFollowing;
          }
        }

        return true;
      }
    }
  }

  return false;
}; // Given index intervals and input function to compare items at indexes,
// divide at the middle change.
//
// DO NOT CALL if start === end, because interval cannot contain common items
// and because this function will throw the “no overlap” error.

const divide = (
  nChange,
  aStart,
  aEnd,
  bStart,
  bEnd,
  isCommon,
  aIndexesF,
  aIndexesR,
  division // output
) => {
  const bF = bStart - aStart; // bIndex = bF + aIndex - kF

  const bR = bEnd - aEnd; // bIndex = bR + aIndex - kR

  const aLength = aEnd - aStart;
  const bLength = bEnd - bStart; // Because graph has square or portrait orientation,
  // length difference is minimum number of items to insert from b.
  // Corresponding forward and reverse diagonals in graph
  // depend on length difference of the sequences:
  // kF = kR - baDeltaLength
  // kR = kF + baDeltaLength

  const baDeltaLength = bLength - aLength; // Optimization: max diagonal in graph intersects corner of shorter side.

  let iMaxF = aLength;
  let iMaxR = aLength; // Initialize no changes yet in forward or reverse direction:

  aIndexesF[0] = aStart - 1; // at open start of interval, outside closed start

  aIndexesR[0] = aEnd; // at open end of interval

  if (baDeltaLength % 2 === 0) {
    // The number of changes in paths is 2 * d if length difference is even.
    const dMin = (nChange || baDeltaLength) / 2;
    const dMax = (aLength + bLength) / 2;

    for (let d = 1; d <= dMax; d += 1) {
      iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);

      if (d < dMin) {
        iMaxR = extendPathsR(d, aStart, bStart, bR, isCommon, aIndexesR, iMaxR);
      } else if (
        // If a reverse path overlaps a forward path in the same diagonal,
        // return a division of the index intervals at the middle change.
        extendOverlappablePathsR(
          d,
          aStart,
          aEnd,
          bStart,
          bEnd,
          isCommon,
          aIndexesF,
          iMaxF,
          aIndexesR,
          iMaxR,
          division
        )
      ) {
        return;
      }
    }
  } else {
    // The number of changes in paths is 2 * d - 1 if length difference is odd.
    const dMin = ((nChange || baDeltaLength) + 1) / 2;
    const dMax = (aLength + bLength + 1) / 2; // Unroll first half iteration so loop extends the relevant pairs of paths.
    // Because of invariant that intervals have no common items at start or end,
    // and limitation not to call divide with empty intervals,
    // therefore it cannot be called if a forward path with one change
    // would overlap a reverse path with no changes, even if dMin === 1.

    let d = 1;
    iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);

    for (d += 1; d <= dMax; d += 1) {
      iMaxR = extendPathsR(
        d - 1,
        aStart,
        bStart,
        bR,
        isCommon,
        aIndexesR,
        iMaxR
      );

      if (d < dMin) {
        iMaxF = extendPathsF(d, aEnd, bEnd, bF, isCommon, aIndexesF, iMaxF);
      } else if (
        // If a forward path overlaps a reverse path in the same diagonal,
        // return a division of the index intervals at the middle change.
        extendOverlappablePathsF(
          d,
          aStart,
          aEnd,
          bStart,
          bEnd,
          isCommon,
          aIndexesF,
          iMaxF,
          aIndexesR,
          iMaxR,
          division
        )
      ) {
        return;
      }
    }
  }
  /* istanbul ignore next */

  throw new Error(
    `${pkg}: no overlap aStart=${aStart} aEnd=${aEnd} bStart=${bStart} bEnd=${bEnd}`
  );
}; // Given index intervals and input function to compare items at indexes,
// return by output function the number of adjacent items and starting indexes
// of each common subsequence. Divide and conquer with only linear space.
//
// The index intervals are half open [start, end) like array slice method.
// DO NOT CALL if start === end, because interval cannot contain common items
// and because divide function will throw the “no overlap” error.

const findSubsequences = (
  nChange,
  aStart,
  aEnd,
  bStart,
  bEnd,
  transposed,
  callbacks,
  aIndexesF,
  aIndexesR,
  division // temporary memory, not input nor output
) => {
  if (bEnd - bStart < aEnd - aStart) {
    // Transpose graph so it has portrait instead of landscape orientation.
    // Always compare shorter to longer sequence for consistency and optimization.
    transposed = !transposed;

    if (transposed && callbacks.length === 1) {
      // Lazily wrap callback functions to swap args if graph is transposed.
      const _callbacks$ = callbacks[0],
        foundSubsequence = _callbacks$.foundSubsequence,
        isCommon = _callbacks$.isCommon;
      callbacks[1] = {
        foundSubsequence: (function(_foundSubsequence) {
          function foundSubsequence(_x, _x2, _x3) {
            return _foundSubsequence.apply(this, arguments);
          }

          foundSubsequence.toString = function() {
            return _foundSubsequence.toString();
          };

          return foundSubsequence;
        })((nCommon, bCommon, aCommon) => {
          foundSubsequence(nCommon, aCommon, bCommon);
        }),
        isCommon: (function(_isCommon) {
          function isCommon(_x4, _x5) {
            return _isCommon.apply(this, arguments);
          }

          isCommon.toString = function() {
            return _isCommon.toString();
          };

          return isCommon;
        })((bIndex, aIndex) => isCommon(aIndex, bIndex))
      };
    }

    const tStart = aStart;
    const tEnd = aEnd;
    aStart = bStart;
    aEnd = bEnd;
    bStart = tStart;
    bEnd = tEnd;
  }

  const _callbacks = callbacks[transposed ? 1 : 0],
    foundSubsequence = _callbacks.foundSubsequence,
    isCommon = _callbacks.isCommon; // Divide the index intervals at the middle change.

  divide(
    nChange,
    aStart,
    aEnd,
    bStart,
    bEnd,
    isCommon,
    aIndexesF,
    aIndexesR,
    division
  );
  const nChangePreceding = division.nChangePreceding,
    aEndPreceding = division.aEndPreceding,
    bEndPreceding = division.bEndPreceding,
    nCommonPreceding = division.nCommonPreceding,
    aCommonPreceding = division.aCommonPreceding,
    bCommonPreceding = division.bCommonPreceding,
    nCommonFollowing = division.nCommonFollowing,
    aCommonFollowing = division.aCommonFollowing,
    bCommonFollowing = division.bCommonFollowing,
    nChangeFollowing = division.nChangeFollowing,
    aStartFollowing = division.aStartFollowing,
    bStartFollowing = division.bStartFollowing; // Unless either index interval is empty, they might contain common items.

  if (aStart < aEndPreceding && bStart < bEndPreceding) {
    // Recursely find and return common subsequences preceding the division.
    findSubsequences(
      nChangePreceding,
      aStart,
      aEndPreceding,
      bStart,
      bEndPreceding,
      transposed,
      callbacks,
      aIndexesF,
      aIndexesR,
      division
    );
  } // Return common subsequences that are adjacent to the middle change.

  if (nCommonPreceding !== 0) {
    foundSubsequence(nCommonPreceding, aCommonPreceding, bCommonPreceding);
  }

  if (nCommonFollowing !== 0) {
    foundSubsequence(nCommonFollowing, aCommonFollowing, bCommonFollowing);
  } // Unless either index interval is empty, they might contain common items.

  if (aStartFollowing < aEnd && bStartFollowing < bEnd) {
    // Recursely find and return common subsequences following the division.
    findSubsequences(
      nChangeFollowing,
      aStartFollowing,
      aEnd,
      bStartFollowing,
      bEnd,
      transposed,
      callbacks,
      aIndexesF,
      aIndexesR,
      division
    );
  }
};

const validateLength = (name, arg) => {
  const type = typeof arg;

  if (type !== 'number') {
    throw new TypeError(`${pkg}: ${name} typeof ${type} is not a number`);
  }

  if (!Number.isSafeInteger(arg)) {
    throw new RangeError(`${pkg}: ${name} value ${arg} is not a safe integer`);
  }

  if (arg < 0) {
    throw new RangeError(`${pkg}: ${name} value ${arg} is a negative integer`);
  }
};

const validateCallback = (name, arg) => {
  const type = typeof arg;

  if (type !== 'function') {
    throw new TypeError(`${pkg}: ${name} typeof ${type} is not a function`);
  }
}; // Compare items in two sequences to find a longest common subsequence.
// Given lengths of sequences and input function to compare items at indexes,
// return by output function the number of adjacent items and starting indexes
// of each common subsequence.

var _default = (aLength, bLength, isCommon, foundSubsequence) => {
  validateLength('aLength', aLength);
  validateLength('bLength', bLength);
  validateCallback('isCommon', isCommon);
  validateCallback('foundSubsequence', foundSubsequence); // Count common items from the start in the forward direction.

  const nCommonF = countCommonItemsF(0, aLength, 0, bLength, isCommon);

  if (nCommonF !== 0) {
    foundSubsequence(nCommonF, 0, 0);
  } // Unless both sequences consist of common items only,
  // find common items in the half-trimmed index intervals.

  if (aLength !== nCommonF || bLength !== nCommonF) {
    // Invariant: intervals do not have common items at the start.
    // The start of an index interval is closed like array slice method.
    const aStart = nCommonF;
    const bStart = nCommonF; // Count common items from the end in the reverse direction.

    const nCommonR = countCommonItemsR(
      aStart,
      aLength - 1,
      bStart,
      bLength - 1,
      isCommon
    ); // Invariant: intervals do not have common items at the end.
    // The end of an index interval is open like array slice method.

    const aEnd = aLength - nCommonR;
    const bEnd = bLength - nCommonR; // Unless one sequence consists of common items only,
    // therefore the other trimmed index interval consists of changes only,
    // find common items in the trimmed index intervals.

    const nCommonFR = nCommonF + nCommonR;

    if (aLength !== nCommonFR && bLength !== nCommonFR) {
      const nChange = 0; // number of change items is not yet known

      const transposed = false; // call the original unwrapped functions

      const callbacks = [
        {
          foundSubsequence,
          isCommon
        }
      ]; // Indexes in sequence a of last points in furthest reaching paths
      // from outside the start at top left in the forward direction:

      const aIndexesF = [NOT_YET_SET]; // from the end at bottom right in the reverse direction:

      const aIndexesR = [NOT_YET_SET]; // Initialize one object as output of all calls to divide function.

      const division = {
        aCommonFollowing: NOT_YET_SET,
        aCommonPreceding: NOT_YET_SET,
        aEndPreceding: NOT_YET_SET,
        aStartFollowing: NOT_YET_SET,
        bCommonFollowing: NOT_YET_SET,
        bCommonPreceding: NOT_YET_SET,
        bEndPreceding: NOT_YET_SET,
        bStartFollowing: NOT_YET_SET,
        nChangeFollowing: NOT_YET_SET,
        nChangePreceding: NOT_YET_SET,
        nCommonFollowing: NOT_YET_SET,
        nCommonPreceding: NOT_YET_SET
      }; // Find and return common subsequences in the trimmed index intervals.

      findSubsequences(
        nChange,
        aStart,
        aEnd,
        bStart,
        bEnd,
        transposed,
        callbacks,
        aIndexesF,
        aIndexesR,
        division
      );
    }

    if (nCommonR !== 0) {
      foundSubsequence(nCommonR, aEnd, bEnd);
    }
  }
};

exports.default = _default;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.SIMILAR_MESSAGE = exports.NO_DIFF_MESSAGE = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(3));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const NO_DIFF_MESSAGE = _chalk.default.dim(
  'Compared values have no visual difference.'
);

exports.NO_DIFF_MESSAGE = NO_DIFF_MESSAGE;

const SIMILAR_MESSAGE = _chalk.default.dim(
  'Compared values serialize to the same structure.\n' +
    'Printing internal object structure without calling `toJSON` instead.'
);

exports.SIMILAR_MESSAGE = SIMILAR_MESSAGE;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getStringDiff = exports.printMultilineStringDiffs = exports.createPatchMark = exports.printAnnotation = exports.hasCommonDiff = exports.computeStringDiffs = exports.printCommonLine = exports.printInsertLine = exports.printDeleteLine = exports.MULTILINE_REGEXP = exports.getReceivedString = exports.getExpectedString = exports.getHighlightedString = exports.RECEIVED_COLOR = exports.INVERTED_COLOR = exports.EXPECTED_COLOR = exports.DIM_COLOR = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(3));

var _cleanupSemantic = __webpack_require__(35);

var _diffStrings = _interopRequireDefault(__webpack_require__(36));

var _getAlignedDiffs = _interopRequireDefault(__webpack_require__(37));

var _joinAlignedDiffs = __webpack_require__(38);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DIM_COLOR = _chalk.default.dim;
exports.DIM_COLOR = DIM_COLOR;
const EXPECTED_COLOR = _chalk.default.green;
exports.EXPECTED_COLOR = EXPECTED_COLOR;
const INVERTED_COLOR = _chalk.default.inverse;
exports.INVERTED_COLOR = INVERTED_COLOR;
const RECEIVED_COLOR = _chalk.default.red;
exports.RECEIVED_COLOR = RECEIVED_COLOR;
const PATCH_COLOR = _chalk.default.yellow; // Given change op and array of diffs, return concatenated string:
// * include common strings
// * include change strings which have argument op (inverse highlight)
// * exclude change strings which have opposite op

const getHighlightedString = (op, diffs) =>
  diffs.reduce(
    (reduced, diff) =>
      reduced +
      (diff[0] === _cleanupSemantic.DIFF_EQUAL
        ? diff[1]
        : diff[0] === op
        ? INVERTED_COLOR(diff[1])
        : ''),
    ''
  );

exports.getHighlightedString = getHighlightedString;

const getExpectedString = diffs =>
  getHighlightedString(_cleanupSemantic.DIFF_DELETE, diffs);

exports.getExpectedString = getExpectedString;

const getReceivedString = diffs =>
  getHighlightedString(_cleanupSemantic.DIFF_INSERT, diffs);

exports.getReceivedString = getReceivedString;
const MULTILINE_REGEXP = /\n/;
exports.MULTILINE_REGEXP = MULTILINE_REGEXP;
const NEWLINE_SYMBOL = '\u{21B5}'; // downwards arrow with corner leftwards

const SPACE_SYMBOL = '\u{00B7}'; // middle dot
// Instead of inverse highlight which now implies a change,
// replace common spaces with middle dot at the end of the line.

const replaceSpacesAtEnd = line =>
  line.replace(/\s+$/, spaces => SPACE_SYMBOL.repeat(spaces.length));

const printDeleteLine = line =>
  EXPECTED_COLOR(line.length !== 0 ? '- ' + replaceSpacesAtEnd(line) : '-');

exports.printDeleteLine = printDeleteLine;

const printInsertLine = line =>
  RECEIVED_COLOR(line.length !== 0 ? '+ ' + replaceSpacesAtEnd(line) : '+'); // Prevent visually ambiguous empty line as the first or the last.

exports.printInsertLine = printInsertLine;

const printCommonLine = (line, isFirstOrLast = false) =>
  line.length !== 0
    ? DIM_COLOR('  ' + replaceSpacesAtEnd(line))
    : isFirstOrLast
    ? DIM_COLOR('  ' + NEWLINE_SYMBOL)
    : '';

exports.printCommonLine = printCommonLine;

const computeStringDiffs = (expected, received) => {
  const isMultiline =
    MULTILINE_REGEXP.test(expected) || MULTILINE_REGEXP.test(received); // getAlignedDiffs assumes that a newline was appended to the strings.

  if (isMultiline) {
    expected += '\n';
    received += '\n';
  }

  const diffs = (0, _diffStrings.default)(expected, received);
  (0, _cleanupSemantic.cleanupSemantic)(diffs); // impure function

  return {
    diffs,
    isMultiline
  };
};

exports.computeStringDiffs = computeStringDiffs;

const hasCommonDiff = (diffs, isMultiline) => {
  if (isMultiline) {
    // Important: Ignore common newline that was appended to multiline strings!
    const iLast = diffs.length - 1;
    return diffs.some(
      (diff, i) =>
        diff[0] === _cleanupSemantic.DIFF_EQUAL &&
        (i !== iLast || diff[1] !== '\n')
    );
  }

  return diffs.some(diff => diff[0] === _cleanupSemantic.DIFF_EQUAL);
};

exports.hasCommonDiff = hasCommonDiff;

const printAnnotation = options =>
  EXPECTED_COLOR('- ' + ((options && options.aAnnotation) || 'Expected')) +
  '\n' +
  RECEIVED_COLOR('+ ' + ((options && options.bAnnotation) || 'Received')) +
  '\n\n'; // In GNU diff format, indexes are one-based instead of zero-based.

exports.printAnnotation = printAnnotation;

const createPatchMark = (aStart, aEnd, bStart, bEnd) =>
  PATCH_COLOR(
    `@@ -${aStart + 1},${aEnd - aStart} +${bStart + 1},${bEnd - bStart} @@`
  ); // Return formatted diff lines without labels.

exports.createPatchMark = createPatchMark;

const printMultilineStringDiffs = (diffs, expand) => {
  const lines = (0, _getAlignedDiffs.default)(diffs);
  return expand
    ? (0, _joinAlignedDiffs.joinAlignedDiffsExpand)(lines)
    : (0, _joinAlignedDiffs.joinAlignedDiffsNoExpand)(lines);
};

exports.printMultilineStringDiffs = printMultilineStringDiffs;
const MAX_DIFF_STRING_LENGTH = 20000;

// Print specific substring diff for strings only:
// * if strings are not equal
// * if neither string is empty
// * if neither string is too long
// * if there is a common string after semantic cleanup
const getStringDiff = (expected, received, options) => {
  if (
    expected === received ||
    expected.length === 0 ||
    received.length === 0 ||
    expected.length > MAX_DIFF_STRING_LENGTH ||
    received.length > MAX_DIFF_STRING_LENGTH
  ) {
    return null;
  }

  const _computeStringDiffs = computeStringDiffs(expected, received),
    diffs = _computeStringDiffs.diffs,
    isMultiline = _computeStringDiffs.isMultiline;

  if (!hasCommonDiff(diffs, isMultiline)) {
    return null;
  }

  return isMultiline
    ? {
        annotatedDiff:
          printAnnotation(options) +
          printMultilineStringDiffs(
            diffs,
            options === undefined || options.expand !== false
          ),
        isMultiline
      }
    : {
        a: getExpectedString(diffs),
        b: getReceivedString(diffs),
        isMultiline
      };
};

exports.getStringDiff = getStringDiff;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.cleanupSemantic = exports.DIFF_INSERT = exports.DIFF_DELETE = exports.DIFF_EQUAL = exports.Diff = void 0;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * Diff Match and Patch
 * Copyright 2018 The diff-match-patch Authors.
 * https://github.com/google/diff-match-patch
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Computes the difference between two texts to create a patch.
 * Applies the patch onto another text, allowing for errors.
 * @author fraser@google.com (Neil Fraser)
 */

/**
 * CHANGES by pedrottimark to diff_match_patch_uncompressed.ts file:
 *
 * 1. Delete anything not needed to use diff_cleanupSemantic method
 * 2. Convert from prototype properties to var declarations
 * 3. Convert Diff to class from constructor and prototype
 * 4. Add type annotations for arguments and return values
 * 5. Add exports
 */

/**
 * The data structure representing a diff is an array of tuples:
 * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]
 * which means: delete 'Hello', add 'Goodbye' and keep ' world.'
 */
var DIFF_DELETE = -1;
exports.DIFF_DELETE = DIFF_DELETE;
var DIFF_INSERT = 1;
exports.DIFF_INSERT = DIFF_INSERT;
var DIFF_EQUAL = 0;
/**
 * Class representing one diff tuple.
 * Attempts to look like a two-element array (which is what this used to be).
 * @param {number} op Operation, one of: DIFF_DELETE, DIFF_INSERT, DIFF_EQUAL.
 * @param {string} text Text to be deleted, inserted, or retained.
 * @constructor
 */

exports.DIFF_EQUAL = DIFF_EQUAL;

class Diff {
  constructor(op, text) {
    _defineProperty(this, 0, void 0);

    _defineProperty(this, 1, void 0);

    this[0] = op;
    this[1] = text;
  }
}
/**
 * Determine the common prefix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the start of each
 *     string.
 */

exports.Diff = Diff;

var diff_commonPrefix = function diff_commonPrefix(text1, text2) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
    return 0;
  } // Binary search.
  // Performance analysis: https://neil.fraser.name/news/2007/10/09/

  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerstart = 0;

  while (pointermin < pointermid) {
    if (
      text1.substring(pointerstart, pointermid) ==
      text2.substring(pointerstart, pointermid)
    ) {
      pointermin = pointermid;
      pointerstart = pointermin;
    } else {
      pointermax = pointermid;
    }

    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  return pointermid;
};
/**
 * Determine the common suffix of two strings.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of each string.
 */

var diff_commonSuffix = function diff_commonSuffix(text1, text2) {
  // Quick check for common null cases.
  if (
    !text1 ||
    !text2 ||
    text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)
  ) {
    return 0;
  } // Binary search.
  // Performance analysis: https://neil.fraser.name/news/2007/10/09/

  var pointermin = 0;
  var pointermax = Math.min(text1.length, text2.length);
  var pointermid = pointermax;
  var pointerend = 0;

  while (pointermin < pointermid) {
    if (
      text1.substring(text1.length - pointermid, text1.length - pointerend) ==
      text2.substring(text2.length - pointermid, text2.length - pointerend)
    ) {
      pointermin = pointermid;
      pointerend = pointermin;
    } else {
      pointermax = pointermid;
    }

    pointermid = Math.floor((pointermax - pointermin) / 2 + pointermin);
  }

  return pointermid;
};
/**
 * Determine if the suffix of one string is the prefix of another.
 * @param {string} text1 First string.
 * @param {string} text2 Second string.
 * @return {number} The number of characters common to the end of the first
 *     string and the start of the second string.
 * @private
 */

var diff_commonOverlap_ = function diff_commonOverlap_(text1, text2) {
  // Cache the text lengths to prevent multiple calls.
  var text1_length = text1.length;
  var text2_length = text2.length; // Eliminate the null case.

  if (text1_length == 0 || text2_length == 0) {
    return 0;
  } // Truncate the longer string.

  if (text1_length > text2_length) {
    text1 = text1.substring(text1_length - text2_length);
  } else if (text1_length < text2_length) {
    text2 = text2.substring(0, text1_length);
  }

  var text_length = Math.min(text1_length, text2_length); // Quick check for the worst case.

  if (text1 == text2) {
    return text_length;
  } // Start by looking for a single character match
  // and increase length until no match is found.
  // Performance analysis: https://neil.fraser.name/news/2010/11/04/

  var best = 0;
  var length = 1;

  while (true) {
    var pattern = text1.substring(text_length - length);
    var found = text2.indexOf(pattern);

    if (found == -1) {
      return best;
    }

    length += found;

    if (
      found == 0 ||
      text1.substring(text_length - length) == text2.substring(0, length)
    ) {
      best = length;
      length++;
    }
  }
};
/**
 * Reduce the number of edits by eliminating semantically trivial equalities.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */

var diff_cleanupSemantic = function diff_cleanupSemantic(diffs) {
  var changes = false;
  var equalities = []; // Stack of indices where equalities are found.

  var equalitiesLength = 0; // Keeping our own length var is faster in JS.

  /** @type {?string} */

  var lastEquality = null; // Always equal to diffs[equalities[equalitiesLength - 1]][1]

  var pointer = 0; // Index of current position.
  // Number of characters that changed prior to the equality.

  var length_insertions1 = 0;
  var length_deletions1 = 0; // Number of characters that changed after the equality.

  var length_insertions2 = 0;
  var length_deletions2 = 0;

  while (pointer < diffs.length) {
    if (diffs[pointer][0] == DIFF_EQUAL) {
      // Equality found.
      equalities[equalitiesLength++] = pointer;
      length_insertions1 = length_insertions2;
      length_deletions1 = length_deletions2;
      length_insertions2 = 0;
      length_deletions2 = 0;
      lastEquality = diffs[pointer][1];
    } else {
      // An insertion or deletion.
      if (diffs[pointer][0] == DIFF_INSERT) {
        length_insertions2 += diffs[pointer][1].length;
      } else {
        length_deletions2 += diffs[pointer][1].length;
      } // Eliminate an equality that is smaller or equal to the edits on both
      // sides of it.

      if (
        lastEquality &&
        lastEquality.length <=
          Math.max(length_insertions1, length_deletions1) &&
        lastEquality.length <= Math.max(length_insertions2, length_deletions2)
      ) {
        // Duplicate record.
        diffs.splice(
          equalities[equalitiesLength - 1],
          0,
          new Diff(DIFF_DELETE, lastEquality)
        ); // Change second copy to insert.

        diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT; // Throw away the equality we just deleted.

        equalitiesLength--; // Throw away the previous equality (it needs to be reevaluated).

        equalitiesLength--;
        pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
        length_insertions1 = 0; // Reset the counters.

        length_deletions1 = 0;
        length_insertions2 = 0;
        length_deletions2 = 0;
        lastEquality = null;
        changes = true;
      }
    }

    pointer++;
  } // Normalize the diff.

  if (changes) {
    diff_cleanupMerge(diffs);
  }

  diff_cleanupSemanticLossless(diffs); // Find any overlaps between deletions and insertions.
  // e.g: <del>abcxxx</del><ins>xxxdef</ins>
  //   -> <del>abc</del>xxx<ins>def</ins>
  // e.g: <del>xxxabc</del><ins>defxxx</ins>
  //   -> <ins>def</ins>xxx<del>abc</del>
  // Only extract an overlap if it is as big as the edit ahead or behind it.

  pointer = 1;

  while (pointer < diffs.length) {
    if (
      diffs[pointer - 1][0] == DIFF_DELETE &&
      diffs[pointer][0] == DIFF_INSERT
    ) {
      var deletion = diffs[pointer - 1][1];
      var insertion = diffs[pointer][1];
      var overlap_length1 = diff_commonOverlap_(deletion, insertion);
      var overlap_length2 = diff_commonOverlap_(insertion, deletion);

      if (overlap_length1 >= overlap_length2) {
        if (
          overlap_length1 >= deletion.length / 2 ||
          overlap_length1 >= insertion.length / 2
        ) {
          // Overlap found.  Insert an equality and trim the surrounding edits.
          diffs.splice(
            pointer,
            0,
            new Diff(DIFF_EQUAL, insertion.substring(0, overlap_length1))
          );
          diffs[pointer - 1][1] = deletion.substring(
            0,
            deletion.length - overlap_length1
          );
          diffs[pointer + 1][1] = insertion.substring(overlap_length1);
          pointer++;
        }
      } else {
        if (
          overlap_length2 >= deletion.length / 2 ||
          overlap_length2 >= insertion.length / 2
        ) {
          // Reverse overlap found.
          // Insert an equality and swap and trim the surrounding edits.
          diffs.splice(
            pointer,
            0,
            new Diff(DIFF_EQUAL, deletion.substring(0, overlap_length2))
          );
          diffs[pointer - 1][0] = DIFF_INSERT;
          diffs[pointer - 1][1] = insertion.substring(
            0,
            insertion.length - overlap_length2
          );
          diffs[pointer + 1][0] = DIFF_DELETE;
          diffs[pointer + 1][1] = deletion.substring(overlap_length2);
          pointer++;
        }
      }

      pointer++;
    }

    pointer++;
  }
};
/**
 * Look for single edits surrounded on both sides by equalities
 * which can be shifted sideways to align the edit to a word boundary.
 * e.g: The c<ins>at c</ins>ame. -> The <ins>cat </ins>came.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */

exports.cleanupSemantic = diff_cleanupSemantic;

var diff_cleanupSemanticLossless = function diff_cleanupSemanticLossless(
  diffs
) {
  /**
   * Given two strings, compute a score representing whether the internal
   * boundary falls on logical boundaries.
   * Scores range from 6 (best) to 0 (worst).
   * Closure, but does not reference any external variables.
   * @param {string} one First string.
   * @param {string} two Second string.
   * @return {number} The score.
   * @private
   */
  function diff_cleanupSemanticScore_(one, two) {
    if (!one || !two) {
      // Edges are the best.
      return 6;
    } // Each port of this function behaves slightly differently due to
    // subtle differences in each language's definition of things like
    // 'whitespace'.  Since this function's purpose is largely cosmetic,
    // the choice has been made to use each language's native features
    // rather than force total conformity.

    var char1 = one.charAt(one.length - 1);
    var char2 = two.charAt(0);
    var nonAlphaNumeric1 = char1.match(nonAlphaNumericRegex_);
    var nonAlphaNumeric2 = char2.match(nonAlphaNumericRegex_);
    var whitespace1 = nonAlphaNumeric1 && char1.match(whitespaceRegex_);
    var whitespace2 = nonAlphaNumeric2 && char2.match(whitespaceRegex_);
    var lineBreak1 = whitespace1 && char1.match(linebreakRegex_);
    var lineBreak2 = whitespace2 && char2.match(linebreakRegex_);
    var blankLine1 = lineBreak1 && one.match(blanklineEndRegex_);
    var blankLine2 = lineBreak2 && two.match(blanklineStartRegex_);

    if (blankLine1 || blankLine2) {
      // Five points for blank lines.
      return 5;
    } else if (lineBreak1 || lineBreak2) {
      // Four points for line breaks.
      return 4;
    } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
      // Three points for end of sentences.
      return 3;
    } else if (whitespace1 || whitespace2) {
      // Two points for whitespace.
      return 2;
    } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
      // One point for non-alphanumeric.
      return 1;
    }

    return 0;
  }

  var pointer = 1; // Intentionally ignore the first and last element (don't need checking).

  while (pointer < diffs.length - 1) {
    if (
      diffs[pointer - 1][0] == DIFF_EQUAL &&
      diffs[pointer + 1][0] == DIFF_EQUAL
    ) {
      // This is a single edit surrounded by equalities.
      var equality1 = diffs[pointer - 1][1];
      var edit = diffs[pointer][1];
      var equality2 = diffs[pointer + 1][1]; // First, shift the edit as far left as possible.

      var commonOffset = diff_commonSuffix(equality1, edit);

      if (commonOffset) {
        var commonString = edit.substring(edit.length - commonOffset);
        equality1 = equality1.substring(0, equality1.length - commonOffset);
        edit = commonString + edit.substring(0, edit.length - commonOffset);
        equality2 = commonString + equality2;
      } // Second, step character by character right, looking for the best fit.

      var bestEquality1 = equality1;
      var bestEdit = edit;
      var bestEquality2 = equality2;
      var bestScore =
        diff_cleanupSemanticScore_(equality1, edit) +
        diff_cleanupSemanticScore_(edit, equality2);

      while (edit.charAt(0) === equality2.charAt(0)) {
        equality1 += edit.charAt(0);
        edit = edit.substring(1) + equality2.charAt(0);
        equality2 = equality2.substring(1);
        var score =
          diff_cleanupSemanticScore_(equality1, edit) +
          diff_cleanupSemanticScore_(edit, equality2); // The >= encourages trailing rather than leading whitespace on edits.

        if (score >= bestScore) {
          bestScore = score;
          bestEquality1 = equality1;
          bestEdit = edit;
          bestEquality2 = equality2;
        }
      }

      if (diffs[pointer - 1][1] != bestEquality1) {
        // We have an improvement, save it back to the diff.
        if (bestEquality1) {
          diffs[pointer - 1][1] = bestEquality1;
        } else {
          diffs.splice(pointer - 1, 1);
          pointer--;
        }

        diffs[pointer][1] = bestEdit;

        if (bestEquality2) {
          diffs[pointer + 1][1] = bestEquality2;
        } else {
          diffs.splice(pointer + 1, 1);
          pointer--;
        }
      }
    }

    pointer++;
  }
}; // Define some regex patterns for matching boundaries.

var nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
var whitespaceRegex_ = /\s/;
var linebreakRegex_ = /[\r\n]/;
var blanklineEndRegex_ = /\n\r?\n$/;
var blanklineStartRegex_ = /^\r?\n\r?\n/;
/**
 * Reorder and merge like edit sections.  Merge equalities.
 * Any edit section can move as long as it doesn't cross an equality.
 * @param {!Array.<!diff_match_patch.Diff>} diffs Array of diff tuples.
 */

var diff_cleanupMerge = function diff_cleanupMerge(diffs) {
  // Add a dummy entry at the end.
  diffs.push(new Diff(DIFF_EQUAL, ''));
  var pointer = 0;
  var count_delete = 0;
  var count_insert = 0;
  var text_delete = '';
  var text_insert = '';
  var commonlength;

  while (pointer < diffs.length) {
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        count_insert++;
        text_insert += diffs[pointer][1];
        pointer++;
        break;

      case DIFF_DELETE:
        count_delete++;
        text_delete += diffs[pointer][1];
        pointer++;
        break;

      case DIFF_EQUAL:
        // Upon reaching an equality, check for prior redundancies.
        if (count_delete + count_insert > 1) {
          if (count_delete !== 0 && count_insert !== 0) {
            // Factor out any common prefixies.
            commonlength = diff_commonPrefix(text_insert, text_delete);

            if (commonlength !== 0) {
              if (
                pointer - count_delete - count_insert > 0 &&
                diffs[pointer - count_delete - count_insert - 1][0] ==
                  DIFF_EQUAL
              ) {
                diffs[
                  pointer - count_delete - count_insert - 1
                ][1] += text_insert.substring(0, commonlength);
              } else {
                diffs.splice(
                  0,
                  0,
                  new Diff(DIFF_EQUAL, text_insert.substring(0, commonlength))
                );
                pointer++;
              }

              text_insert = text_insert.substring(commonlength);
              text_delete = text_delete.substring(commonlength);
            } // Factor out any common suffixies.

            commonlength = diff_commonSuffix(text_insert, text_delete);

            if (commonlength !== 0) {
              diffs[pointer][1] =
                text_insert.substring(text_insert.length - commonlength) +
                diffs[pointer][1];
              text_insert = text_insert.substring(
                0,
                text_insert.length - commonlength
              );
              text_delete = text_delete.substring(
                0,
                text_delete.length - commonlength
              );
            }
          } // Delete the offending records and add the merged ones.

          pointer -= count_delete + count_insert;
          diffs.splice(pointer, count_delete + count_insert);

          if (text_delete.length) {
            diffs.splice(pointer, 0, new Diff(DIFF_DELETE, text_delete));
            pointer++;
          }

          if (text_insert.length) {
            diffs.splice(pointer, 0, new Diff(DIFF_INSERT, text_insert));
            pointer++;
          }

          pointer++;
        } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }

        count_insert = 0;
        count_delete = 0;
        text_delete = '';
        text_insert = '';
        break;
    }
  }

  if (diffs[diffs.length - 1][1] === '') {
    diffs.pop(); // Remove the dummy entry at the end.
  } // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC

  var changes = false;
  pointer = 1; // Intentionally ignore the first and last element (don't need checking).

  while (pointer < diffs.length - 1) {
    if (
      diffs[pointer - 1][0] == DIFF_EQUAL &&
      diffs[pointer + 1][0] == DIFF_EQUAL
    ) {
      // This is a single edit surrounded by equalities.
      if (
        diffs[pointer][1].substring(
          diffs[pointer][1].length - diffs[pointer - 1][1].length
        ) == diffs[pointer - 1][1]
      ) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] =
          diffs[pointer - 1][1] +
          diffs[pointer][1].substring(
            0,
            diffs[pointer][1].length - diffs[pointer - 1][1].length
          );
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (
        diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
        diffs[pointer + 1][1]
      ) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
          diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
          diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }

    pointer++;
  } // If shifts were made, the diff needs reordering and another shift sweep.

  if (changes) {
    diff_cleanupMerge(diffs);
  }
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _diffSequences = _interopRequireDefault(__webpack_require__(32));

var _cleanupSemantic = __webpack_require__(35);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const diffStrings = (a, b) => {
  const isCommon = (aIndex, bIndex) => a[aIndex] === b[bIndex];

  let aIndex = 0;
  let bIndex = 0;
  const diffs = [];

  const foundSubsequence = (nCommon, aCommon, bCommon) => {
    if (aIndex !== aCommon) {
      diffs.push(
        new _cleanupSemantic.Diff(
          _cleanupSemantic.DIFF_DELETE,
          a.slice(aIndex, aCommon)
        )
      );
    }

    if (bIndex !== bCommon) {
      diffs.push(
        new _cleanupSemantic.Diff(
          _cleanupSemantic.DIFF_INSERT,
          b.slice(bIndex, bCommon)
        )
      );
    }

    aIndex = aCommon + nCommon; // number of characters compared in a

    bIndex = bCommon + nCommon; // number of characters compared in b

    diffs.push(
      new _cleanupSemantic.Diff(
        _cleanupSemantic.DIFF_EQUAL,
        b.slice(bCommon, bIndex)
      )
    );
  };

  (0, _diffSequences.default)(a.length, b.length, isCommon, foundSubsequence); // After the last common subsequence, push remaining change items.

  if (aIndex !== a.length) {
    diffs.push(
      new _cleanupSemantic.Diff(_cleanupSemantic.DIFF_DELETE, a.slice(aIndex))
    );
  }

  if (bIndex !== b.length) {
    diffs.push(
      new _cleanupSemantic.Diff(_cleanupSemantic.DIFF_INSERT, b.slice(bIndex))
    );
  }

  return diffs;
};

var _default = diffStrings;
exports.default = _default;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

var _cleanupSemantic = __webpack_require__(35);

var _printDiffs = __webpack_require__(34);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

// Encapsulate change lines until either a common newline or the end.
class ChangeBuffer {
  // incomplete line
  // complete lines
  constructor(op) {
    _defineProperty(this, 'op', void 0);

    _defineProperty(this, 'line', void 0);

    _defineProperty(this, 'lines', void 0);

    this.op = op;
    this.line = [];
    this.lines = [];
  }

  pushSubstring(substring) {
    this.pushDiff(new _cleanupSemantic.Diff(this.op, substring));
  }

  pushLine() {
    // Assume call only if line has at least one diff,
    // therefore an empty line must have a diff which has an empty string.
    this.lines.push(
      new _cleanupSemantic.Diff(
        this.op,
        (0, _printDiffs.getHighlightedString)(this.op, this.line)
      )
    );
    this.line.length = 0;
  }

  isLineEmpty() {
    return this.line.length === 0;
  } // Minor input to buffer.

  pushDiff(diff) {
    this.line.push(diff);
  } // Main input to buffer.

  align(diff) {
    const string = diff[1];

    if (_printDiffs.MULTILINE_REGEXP.test(string)) {
      const substrings = string.split('\n');
      const iLast = substrings.length - 1;
      substrings.forEach((substring, i) => {
        if (i < iLast) {
          // The first substring completes the current change line.
          // A middle substring is a change line.
          this.pushSubstring(substring);
          this.pushLine();
        } else if (substring.length !== 0) {
          // The last substring starts a change line, if it is not empty.
          // Important: This non-empty condition also automatically omits
          // the newline appended to the end of expected and received strings.
          this.pushSubstring(substring);
        }
      });
    } else {
      // Append non-multiline string to current change line.
      this.pushDiff(diff);
    }
  } // Output from buffer.

  moveLinesTo(lines) {
    if (!this.isLineEmpty()) {
      this.pushLine();
    }

    lines.push(...this.lines);
    this.lines.length = 0;
  }
} // Encapsulate common and change lines.

class CommonBuffer {
  constructor(deleteBuffer, insertBuffer) {
    _defineProperty(this, 'deleteBuffer', void 0);

    _defineProperty(this, 'insertBuffer', void 0);

    _defineProperty(this, 'lines', void 0);

    this.deleteBuffer = deleteBuffer;
    this.insertBuffer = insertBuffer;
    this.lines = [];
  }

  pushDiffCommonLine(diff) {
    this.lines.push(diff);
  }

  pushDiffChangeLines(diff) {
    const isDiffEmpty = diff[1].length === 0; // An empty diff string is redundant, unless a change line is empty.

    if (!isDiffEmpty || this.deleteBuffer.isLineEmpty()) {
      this.deleteBuffer.pushDiff(diff);
    }

    if (!isDiffEmpty || this.insertBuffer.isLineEmpty()) {
      this.insertBuffer.pushDiff(diff);
    }
  }

  flushChangeLines() {
    this.deleteBuffer.moveLinesTo(this.lines);
    this.insertBuffer.moveLinesTo(this.lines);
  } // Input to buffer.

  align(diff) {
    const op = diff[0];
    const string = diff[1];

    if (_printDiffs.MULTILINE_REGEXP.test(string)) {
      const substrings = string.split('\n');
      const iLast = substrings.length - 1;
      substrings.forEach((substring, i) => {
        if (i === 0) {
          const subdiff = new _cleanupSemantic.Diff(op, substring);

          if (
            this.deleteBuffer.isLineEmpty() &&
            this.insertBuffer.isLineEmpty()
          ) {
            // If both current change lines are empty,
            // then the first substring is a common line.
            this.flushChangeLines();
            this.pushDiffCommonLine(subdiff);
          } else {
            // If either current change line is non-empty,
            // then the first substring completes the change lines.
            this.pushDiffChangeLines(subdiff);
            this.flushChangeLines();
          }
        } else if (i < iLast) {
          // A middle substring is a common line.
          this.pushDiffCommonLine(new _cleanupSemantic.Diff(op, substring));
        } else if (substring.length !== 0) {
          // The last substring starts a change line, if it is not empty.
          // Important: This non-empty condition also automatically omits
          // the newline appended to the end of expected and received strings.
          this.pushDiffChangeLines(new _cleanupSemantic.Diff(op, substring));
        }
      });
    } else {
      // Append non-multiline string to current change lines.
      // Important: It cannot be at the end following empty change lines,
      // because newline appended to the end of expected and received strings.
      this.pushDiffChangeLines(diff);
    }
  } // Output from buffer.

  getLines() {
    this.flushChangeLines();
    return this.lines;
  }
} // Given diffs from expected and received strings,
// return new array of diffs split or joined into lines.
//
// To correctly align a change line at the end, the algorithm:
// * assumes that a newline was appended to the strings
// * omits the last newline from the output array
//
// Assume the function is not called:
// * if either expected or received is empty string
// * if neither expected nor received is multiline string

const getAlignedDiffs = diffs => {
  const deleteBuffer = new ChangeBuffer(_cleanupSemantic.DIFF_DELETE);
  const insertBuffer = new ChangeBuffer(_cleanupSemantic.DIFF_INSERT);
  const commonBuffer = new CommonBuffer(deleteBuffer, insertBuffer);
  diffs.forEach(diff => {
    switch (diff[0]) {
      case _cleanupSemantic.DIFF_DELETE:
        deleteBuffer.align(diff);
        break;

      case _cleanupSemantic.DIFF_INSERT:
        insertBuffer.align(diff);
        break;

      default:
        commonBuffer.align(diff);
    }
  });
  return commonBuffer.getLines();
};

var _default = getAlignedDiffs;
exports.default = _default;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.joinAlignedDiffsExpand = exports.joinAlignedDiffsNoExpand = void 0;

var _cleanupSemantic = __webpack_require__(35);

var _printDiffs = __webpack_require__(34);

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const DIFF_CONTEXT_DEFAULT = 5; // same as diffLines
// jest --no-expand
//
// Given array of aligned strings with inverse highlight formatting,
// return joined lines with diff formatting (and patch marks, if needed).

const joinAlignedDiffsNoExpand = (
  diffs,
  nContextLines = DIFF_CONTEXT_DEFAULT
) => {
  const iLength = diffs.length;
  const nContextLines2 = nContextLines + nContextLines; // First pass: count output lines and see if it has patches.

  let jLength = iLength;
  let hasExcessAtStartOrEnd = false;
  let nExcessesBetweenChanges = 0;
  let i = 0;

  while (i !== iLength) {
    const iStart = i;

    while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_EQUAL) {
      i += 1;
    }

    if (iStart !== i) {
      if (iStart === 0) {
        // at start
        if (i > nContextLines) {
          jLength -= i - nContextLines; // subtract excess common lines

          hasExcessAtStartOrEnd = true;
        }
      } else if (i === iLength) {
        // at end
        const n = i - iStart;

        if (n > nContextLines) {
          jLength -= n - nContextLines; // subtract excess common lines

          hasExcessAtStartOrEnd = true;
        }
      } else {
        // between changes
        const n = i - iStart;

        if (n > nContextLines2) {
          jLength -= n - nContextLines2; // subtract excess common lines

          nExcessesBetweenChanges += 1;
        }
      }
    }

    while (i !== iLength && diffs[i][0] !== _cleanupSemantic.DIFF_EQUAL) {
      i += 1;
    }
  }

  const hasPatch = nExcessesBetweenChanges !== 0 || hasExcessAtStartOrEnd;

  if (nExcessesBetweenChanges !== 0) {
    jLength += nExcessesBetweenChanges + 1; // add patch lines
  } else if (hasExcessAtStartOrEnd) {
    jLength += 1; // add patch line
  }

  const jLast = jLength - 1;
  const lines = [];
  let jPatchMark = 0; // index of placeholder line for current patch mark

  if (hasPatch) {
    lines.push(''); // placeholder line for first patch mark
  } // Indexes of expected or received lines in current patch:

  let aStart = 0;
  let bStart = 0;
  let aEnd = 0;
  let bEnd = 0;

  const pushCommonLine = line => {
    const j = lines.length;
    lines.push((0, _printDiffs.printCommonLine)(line, j === 0 || j === jLast));
    aEnd += 1;
    bEnd += 1;
  };

  const pushDeleteLine = line => {
    lines.push((0, _printDiffs.printDeleteLine)(line));
    aEnd += 1;
  };

  const pushInsertLine = line => {
    lines.push((0, _printDiffs.printInsertLine)(line));
    bEnd += 1;
  }; // Second pass: push lines with diff formatting (and patch marks, if needed).

  i = 0;

  while (i !== iLength) {
    let iStart = i;

    while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_EQUAL) {
      i += 1;
    }

    if (iStart !== i) {
      if (iStart === 0) {
        // at beginning
        if (i > nContextLines) {
          iStart = i - nContextLines;
          aStart = iStart;
          bStart = iStart;
          aEnd = aStart;
          bEnd = bStart;
        }

        for (let iCommon = iStart; iCommon !== i; iCommon += 1) {
          pushCommonLine(diffs[iCommon][1]);
        }
      } else if (i === iLength) {
        // at end
        const iEnd = i - iStart > nContextLines ? iStart + nContextLines : i;

        for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) {
          pushCommonLine(diffs[iCommon][1]);
        }
      } else {
        // between changes
        const nCommon = i - iStart;

        if (nCommon > nContextLines2) {
          const iEnd = iStart + nContextLines;

          for (let iCommon = iStart; iCommon !== iEnd; iCommon += 1) {
            pushCommonLine(diffs[iCommon][1]);
          }

          lines[jPatchMark] = (0, _printDiffs.createPatchMark)(
            aStart,
            aEnd,
            bStart,
            bEnd
          );
          jPatchMark = lines.length;
          lines.push(''); // placeholder line for next patch mark

          const nOmit = nCommon - nContextLines2;
          aStart = aEnd + nOmit;
          bStart = bEnd + nOmit;
          aEnd = aStart;
          bEnd = bStart;

          for (let iCommon = i - nContextLines; iCommon !== i; iCommon += 1) {
            pushCommonLine(diffs[iCommon][1]);
          }
        } else {
          for (let iCommon = iStart; iCommon !== i; iCommon += 1) {
            pushCommonLine(diffs[iCommon][1]);
          }
        }
      }
    }

    while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_DELETE) {
      pushDeleteLine(diffs[i][1]);
      i += 1;
    }

    while (i !== iLength && diffs[i][0] === _cleanupSemantic.DIFF_INSERT) {
      pushInsertLine(diffs[i][1]);
      i += 1;
    }
  }

  if (hasPatch) {
    lines[jPatchMark] = (0, _printDiffs.createPatchMark)(
      aStart,
      aEnd,
      bStart,
      bEnd
    );
  }

  return lines.join('\n');
}; // jest --expand
//
// Given array of aligned strings with inverse highlight formatting,
// return joined lines with diff formatting.

exports.joinAlignedDiffsNoExpand = joinAlignedDiffsNoExpand;

const joinAlignedDiffsExpand = diffs =>
  diffs
    .map((diff, i, diffs) => {
      const line = diff[1];

      switch (diff[0]) {
        case _cleanupSemantic.DIFF_DELETE:
          return (0, _printDiffs.printDeleteLine)(line);

        case _cleanupSemantic.DIFF_INSERT:
          return (0, _printDiffs.printInsertLine)(line);

        default:
          return (0, _printDiffs.printCommonLine)(
            line,
            i === 0 || i === diffs.length - 1
          );
      }
    })
    .join('\n');

exports.joinAlignedDiffsExpand = joinAlignedDiffsExpand;


/***/ })
/******/ ]);
