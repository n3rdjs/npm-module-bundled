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

function isNodeLT(tar) {
  tar = (Array.isArray(tar) ? tar : tar.split('.')).map(Number);
  let i=0, src=process.versions.node.split('.').map(Number);
  for (; i < tar.length; i++) {
    if (src[i] > tar[i]) return false;
    if (tar[i] > src[i]) return true;
  }
  return false;
}

module.exports =
  isNodeLT('8.6.0')
    ? __webpack_require__(3)
    : __webpack_require__(38);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const prompts = __webpack_require__(4);

const passOn = ['suggest', 'format', 'onState', 'validate', 'onRender'];

const noop = () => {};
/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @param {Function} [onSubmit] Callback function called on prompt submit
 * @param {Function} [onCancel] Callback function called on cancel/abort
 * @returns {Object} Object with values from user input
 */


function prompt() {
  return _prompt.apply(this, arguments);
}

function _prompt() {
  _prompt = _asyncToGenerator(function* (questions = [], {
    onSubmit = noop,
    onCancel = noop
  } = {}) {
    const answers = {};
    const override = prompt._override || {};
    questions = [].concat(questions);
    let answer, question, quit, name, type;

    const getFormattedAnswer =
    /*#__PURE__*/
    function () {
      var _ref = _asyncToGenerator(function* (question, answer, skipValidation = false) {
        if (!skipValidation && question.validate && question.validate(answer) !== true) {
          return;
        }

        return question.format ? yield question.format(answer, answers) : answer;
      });

      return function getFormattedAnswer(_x, _x2) {
        return _ref.apply(this, arguments);
      };
    }();

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        question = _step.value;
        var _question = question;
        name = _question.name;
        type = _question.type;

        // if property is a function, invoke it unless it's a special function
        for (let key in question) {
          if (passOn.includes(key)) continue;
          let value = question[key];
          question[key] = typeof value === 'function' ? yield value(answer, _objectSpread({}, answers), question) : value;
        }

        if (typeof question.message !== 'string') {
          throw new Error('prompt message is required');
        } // update vars in case they changed


        var _question2 = question;
        name = _question2.name;
        type = _question2.type;
        // skip if type is a falsy value
        if (!type) continue;

        if (prompts[type] === void 0) {
          throw new Error(`prompt type (${type}) is not defined`);
        }

        if (override[question.name] !== undefined) {
          answer = yield getFormattedAnswer(question, override[question.name]);

          if (answer !== undefined) {
            answers[name] = answer;
            continue;
          }
        }

        try {
          // Get the injected answer if there is one or prompt the user
          answer = prompt._injected ? getInjectedAnswer(prompt._injected) : yield prompts[type](question);
          answers[name] = answer = yield getFormattedAnswer(question, answer, true);
          quit = yield onSubmit(question, answer, answers);
        } catch (err) {
          quit = !(yield onCancel(question, answers));
        }

        if (quit) return answers;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return answers;
  });
  return _prompt.apply(this, arguments);
}

function getInjectedAnswer(injected) {
  const answer = injected.shift();

  if (answer instanceof Error) {
    throw answer;
  }

  return answer;
}

function inject(answers) {
  prompt._injected = (prompt._injected || []).concat(answers);
}

function override(answers) {
  prompt._override = Object.assign({}, answers);
}

module.exports = Object.assign(prompt, {
  prompt,
  prompts,
  inject,
  override
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const $ = exports;

const el = __webpack_require__(5);

const noop = v => v;

function toPrompt(type, args, opts = {}) {
  return new Promise((res, rej) => {
    const p = new el[type](args);
    const onAbort = opts.onAbort || noop;
    const onSubmit = opts.onSubmit || noop;
    p.on('state', args.onState || noop);
    p.on('submit', x => res(onSubmit(x)));
    p.on('abort', x => rej(onAbort(x)));
  });
}
/**
 * Text prompt
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.text = args => toPrompt('TextPrompt', args);
/**
 * Password prompt with masked input
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.password = args => {
  args.style = 'password';
  return $.text(args);
};
/**
 * Prompt where input is invisible, like sudo
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.invisible = args => {
  args.style = 'invisible';
  return $.text(args);
};
/**
 * Number prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.number = args => toPrompt('NumberPrompt', args);
/**
 * Date prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.date = args => toPrompt('DatePrompt', args);
/**
 * Classic yes/no prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.confirm = args => toPrompt('ConfirmPrompt', args);
/**
 * List prompt, split intput string by `seperator`
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [args.separator] String separator
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input, in form of an `Array`
 */


$.list = args => {
  const sep = args.separator || ',';
  return toPrompt('TextPrompt', args, {
    onSubmit: str => str.split(sep).map(s => s.trim())
  });
};
/**
 * Toggle/switch prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {string} [args.active="on"] Text for `active` state
 * @param {string} [args.inactive="off"] Text for `inactive` state
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.toggle = args => toPrompt('TogglePrompt', args);
/**
 * Interactive select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [args.initial] Index of default value
 * @param {String} [args.hint] Hint to display
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.select = args => toPrompt('SelectPrompt', args);
/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [args.max] Max select
 * @param {string} [args.hint] Hint to display user
 * @param {Number} [args.cursor=0] Cursor start position
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.multiselect = args => {
  args.choices = [].concat(args.choices || []);

  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

  return toPrompt('MultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

$.autocompleteMultiselect = args => {
  args.choices = [].concat(args.choices || []);

  const toSelected = items => items.filter(item => item.selected).map(item => item.value);

  return toPrompt('AutocompleteMultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

const byTitle = (input, choices) => Promise.resolve(choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase()));
/**
 * Interactive auto-complete prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
 * @param {number} [args.limit=10] Max number of results to show
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {String} [args.initial] Index of the default value
 * @param {String} [args.fallback] Fallback message - defaults to initial value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */


$.autocomplete = args => {
  args.suggest = args.suggest || byTitle;
  args.choices = [].concat(args.choices || []);
  return toPrompt('AutocompletePrompt', args);
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  TextPrompt: __webpack_require__(6),
  SelectPrompt: __webpack_require__(20),
  TogglePrompt: __webpack_require__(21),
  DatePrompt: __webpack_require__(22),
  NumberPrompt: __webpack_require__(33),
  MultiselectPrompt: __webpack_require__(34),
  AutocompletePrompt: __webpack_require__(35),
  AutocompleteMultiselectPrompt: __webpack_require__(36),
  ConfirmPrompt: __webpack_require__(37)
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(7);

const Prompt = __webpack_require__(8);

const _require = __webpack_require__(14),
      erase = _require.erase,
      cursor = _require.cursor;

const _require2 = __webpack_require__(10),
      style = _require2.style,
      clear = _require2.clear,
      lines = _require2.lines,
      figures = _require2.figures;
/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.initial] Default value
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */


class TextPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;

    this.validator = opts.validate || (() => true);

    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.clear = clear(``);
    this.render();
  }

  set value(v) {
    if (!v && this.initial) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v);
    }

    this._value = v;
    this.fire();
  }

  get value() {
    return this._value;
  }

  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.fire();
    this.render();
  }

  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === `string`) {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      _this2.value = _this2.value || _this2.initial;
      yield _this2.validate();

      if (_this2.error) {
        _this2.red = true;

        _this2.fire();

        _this2.render();

        return;
      }

      _this2.done = true;
      _this2.aborted = false;

      _this2.fire();

      _this2.render();

      _this2.out.write('\n');

      _this2.close();
    })();
  }

  next() {
    if (!this.placeholder) return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }

  moveCursor(n) {
    if (this.placeholder) return;
    this.cursor = this.cursor + n;
  }

  _(c, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length + 1;
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.value.slice(0, this.cursor - 1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.moveCursor(-1);
    this.render();
  }

  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor + 1);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.render();
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length;
    this.render();
  }

  left() {
    if (this.cursor <= 0 || this.placeholder) return this.bell();
    this.moveCursor(-1);
    this.render();
  }

  right() {
    if (this.cursor * this.scale >= this.rendered.length || this.placeholder) return this.bell();
    this.moveCursor(1);
    this.render();
  }

  render() {
    if (this.closed) return;

    if (!this.firstRender) {
      if (this.outputError) this.out.write(cursor.down(lines(this.outputError) - 1) + clear(this.outputError));
      this.out.write(clear(this.outputText));
    }

    super.render();
    this.outputError = '';
    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.red ? color.red(this.rendered) : this.rendered].join(` `);

    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`).reduce((a, l, i) => a + `\n${i ? ' ' : figures.pointerSmall} ${color.red().italic(l)}`, ``);
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
  }

}

module.exports = TextPrompt;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { FORCE_COLOR, NODE_DISABLE_COLORS, TERM } = process.env;

const $ = {
	enabled: !NODE_DISABLE_COLORS && TERM !== 'dumb' && FORCE_COLOR !== '0',

	// modifiers
	reset: init(0, 0),
	bold: init(1, 22),
	dim: init(2, 22),
	italic: init(3, 23),
	underline: init(4, 24),
	inverse: init(7, 27),
	hidden: init(8, 28),
	strikethrough: init(9, 29),

	// colors
	black: init(30, 39),
	red: init(31, 39),
	green: init(32, 39),
	yellow: init(33, 39),
	blue: init(34, 39),
	magenta: init(35, 39),
	cyan: init(36, 39),
	white: init(37, 39),
	gray: init(90, 39),
	grey: init(90, 39),

	// background colors
	bgBlack: init(40, 49),
	bgRed: init(41, 49),
	bgGreen: init(42, 49),
	bgYellow: init(43, 49),
	bgBlue: init(44, 49),
	bgMagenta: init(45, 49),
	bgCyan: init(46, 49),
	bgWhite: init(47, 49)
};

function run(arr, str) {
	let i=0, tmp, beg='', end='';
	for (; i < arr.length; i++) {
		tmp = arr[i];
		beg += tmp.open;
		end += tmp.close;
		if (str.includes(tmp.close)) {
			str = str.replace(tmp.rgx, tmp.close + tmp.open);
		}
	}
	return beg + str + end;
}

function chain(has, keys) {
	let ctx = { has, keys };

	ctx.reset = $.reset.bind(ctx);
	ctx.bold = $.bold.bind(ctx);
	ctx.dim = $.dim.bind(ctx);
	ctx.italic = $.italic.bind(ctx);
	ctx.underline = $.underline.bind(ctx);
	ctx.inverse = $.inverse.bind(ctx);
	ctx.hidden = $.hidden.bind(ctx);
	ctx.strikethrough = $.strikethrough.bind(ctx);

	ctx.black = $.black.bind(ctx);
	ctx.red = $.red.bind(ctx);
	ctx.green = $.green.bind(ctx);
	ctx.yellow = $.yellow.bind(ctx);
	ctx.blue = $.blue.bind(ctx);
	ctx.magenta = $.magenta.bind(ctx);
	ctx.cyan = $.cyan.bind(ctx);
	ctx.white = $.white.bind(ctx);
	ctx.gray = $.gray.bind(ctx);
	ctx.grey = $.grey.bind(ctx);

	ctx.bgBlack = $.bgBlack.bind(ctx);
	ctx.bgRed = $.bgRed.bind(ctx);
	ctx.bgGreen = $.bgGreen.bind(ctx);
	ctx.bgYellow = $.bgYellow.bind(ctx);
	ctx.bgBlue = $.bgBlue.bind(ctx);
	ctx.bgMagenta = $.bgMagenta.bind(ctx);
	ctx.bgCyan = $.bgCyan.bind(ctx);
	ctx.bgWhite = $.bgWhite.bind(ctx);

	return ctx;
}

function init(open, close) {
	let blk = {
		open: `\x1b[${open}m`,
		close: `\x1b[${close}m`,
		rgx: new RegExp(`\\x1b\\[${close}m`, 'g')
	};
	return function (txt) {
		if (this !== void 0 && this.has !== void 0) {
			this.has.includes(open) || (this.has.push(open),this.keys.push(blk));
			return txt === void 0 ? this : $.enabled ? run(this.keys, txt+'') : txt+'';
		}
		return txt === void 0 ? chain([open], [blk]) : $.enabled ? run([blk], txt+'') : txt+'';
	};
}

module.exports = $;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const readline = __webpack_require__(9);

const _require = __webpack_require__(10),
      action = _require.action;

const EventEmitter = __webpack_require__(19);

const _require2 = __webpack_require__(14),
      beep = _require2.beep,
      cursor = _require2.cursor;

const color = __webpack_require__(7);
/**
 * Base prompt skeleton
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class Prompt extends EventEmitter {
  constructor(opts = {}) {
    super();
    this.firstRender = true;
    this.in = opts.in || process.stdin;
    this.out = opts.out || process.stdout;

    this.onRender = (opts.onRender || (() => void 0)).bind(this);

    const rl = readline.createInterface(this.in);
    readline.emitKeypressEvents(this.in, rl);
    if (this.in.isTTY) this.in.setRawMode(true);
    const isSelect = ['SelectPrompt', 'MultiselectPrompt'].indexOf(this.constructor.name) > -1;

    const keypress = (str, key) => {
      let a = action(key, isSelect);

      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === 'function') {
        this[a](key);
      } else {
        this.bell();
      }
    };

    this.close = () => {
      this.out.write(cursor.show);
      this.in.removeListener('keypress', keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : 'submit', this.value);
      this.closed = true;
    };

    this.in.on('keypress', keypress);
  }

  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted
    });
  }

  bell() {
    this.out.write(beep);
  }

  render() {
    this.onRender(color);
    if (this.firstRender) this.firstRender = false;
  }

}

module.exports = Prompt;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("readline");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  action: __webpack_require__(11),
  clear: __webpack_require__(12),
  style: __webpack_require__(15),
  strip: __webpack_require__(13),
  figures: __webpack_require__(16),
  lines: __webpack_require__(17),
  wrap: __webpack_require__(18)
};

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (key, isSelect) => {
  if (key.meta) return;

  if (key.ctrl) {
    if (key.name === 'a') return 'first';
    if (key.name === 'c') return 'abort';
    if (key.name === 'd') return 'abort';
    if (key.name === 'e') return 'last';
    if (key.name === 'g') return 'reset';
  }

  if (isSelect) {
    if (key.name === 'j') return 'down';
    if (key.name === 'k') return 'up';
  }

  if (key.name === 'return') return 'submit';
  if (key.name === 'enter') return 'submit'; // ctrl + J

  if (key.name === 'backspace') return 'delete';
  if (key.name === 'delete') return 'deleteForward';
  if (key.name === 'abort') return 'abort';
  if (key.name === 'escape') return 'abort';
  if (key.name === 'tab') return 'next';
  if (key.name === 'pagedown') return 'nextPage';
  if (key.name === 'pageup') return 'prevPage';
  if (key.name === 'up') return 'up';
  if (key.name === 'down') return 'down';
  if (key.name === 'right') return 'right';
  if (key.name === 'left') return 'left';
  return false;
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const strip = __webpack_require__(13);

const _require = __webpack_require__(14),
      erase = _require.erase,
      cursor = _require.cursor;

const width = str => [...strip(str)].length;

module.exports = function (prompt, perLine = process.stdout.columns) {
  if (!perLine) return erase.line + cursor.to(0);
  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = lines[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      let line = _step.value;
      rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
};

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = str => {
  const pattern = ['[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)', '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'].join('|');
  const RGX = new RegExp(pattern, 'g');
  return typeof str === 'string' ? str.replace(RGX, '') : str;
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ESC = '\x1B';
const CSI = `${ESC}[`;
const beep = '\u0007';

const cursor = {
  to(x, y) {
    if (!y) return `${CSI}${x + 1}G`;
    return `${CSI}${y + 1};${x + 1}H`;
  },
  move(x, y) {
    let ret = '';

    if (x < 0) ret += `${CSI}${-x}D`;
    else if (x > 0) ret += `${CSI}${x}C`;

    if (y < 0) ret += `${CSI}${-y}A`;
    else if (y > 0) ret += `${CSI}${y}B`;

    return ret;
  },
  up: (count = 1) => `${CSI}${count}A`,
  down: (count = 1) => `${CSI}${count}B`,
  forward: (count = 1) => `${CSI}${count}C`,
  backward: (count = 1) => `${CSI}${count}D`,
  nextLine: (count = 1) => `${CSI}E`.repeat(count),
  prevLine: (count = 1) => `${CSI}F`.repeat(count),
  left: `${CSI}G`,
  hide: `${CSI}?25l`,
  show: `${CSI}?25h`,
  save: `${ESC}7`,
  restore: `${ESC}8`
}

const scroll = {
  up: (count = 1) => `${CSI}S`.repeat(count),
  down: (count = 1) => `${CSI}T`.repeat(count)
}

const erase = {
  screen: `${CSI}2J`,
  up: (count = 1) => `${CSI}1J`.repeat(count),
  down: (count = 1) => `${CSI}J`.repeat(count),
  line: `${CSI}2K`,
  lineEnd: `${CSI}K`,
  lineStart: `${CSI}1K`,
  lines(count) {
    let clear = '';
    for (let i = 0; i < count; i++)
      clear += this.line + (i < count - 1 ? cursor.up() : '');
    if (count)
      clear += cursor.left;
    return clear;
  }
}

module.exports = { cursor, scroll, erase, beep };


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const c = __webpack_require__(7);

const figures = __webpack_require__(16); // rendering user input.


const styles = Object.freeze({
  password: {
    scale: 1,
    render: input => '*'.repeat(input.length)
  },
  emoji: {
    scale: 2,
    render: input => '😃'.repeat(input.length)
  },
  invisible: {
    scale: 0,
    render: input => ''
  },
  default: {
    scale: 1,
    render: input => `${input}`
  }
});

const render = type => styles[type] || styles.default; // icon to signalize a prompt.


const symbols = Object.freeze({
  aborted: c.red(figures.cross),
  done: c.green(figures.tick),
  default: c.cyan('?')
});

const symbol = (done, aborted) => aborted ? symbols.aborted : done ? symbols.done : symbols.default; // between the question and the user's input.


const delimiter = completing => c.gray(completing ? figures.ellipsis : figures.pointerSmall);

const item = (expandable, expanded) => c.gray(expandable ? expanded ? figures.pointerSmall : '+' : figures.line);

module.exports = {
  styles,
  render,
  symbols,
  symbol,
  delimiter,
  item
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const main = {
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  tick: '✔',
  cross: '✖',
  ellipsis: '…',
  pointerSmall: '›',
  line: '─',
  pointer: '❯'
};
const win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',
  tick: '√',
  cross: '×',
  ellipsis: '...',
  pointerSmall: '»',
  line: '─',
  pointer: '>'
};
const figures = process.platform === 'win32' ? win : main;
module.exports = figures;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const strip = __webpack_require__(13);

module.exports = function (msg, perLine = process.stdout.columns) {
  let lines = String(strip(msg) || '').split(/\r?\n/);
  if (!perLine) return lines.length;
  return lines.map(l => Math.ceil(l.length / perLine)).reduce((a, b) => a + b);
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @param {string} msg The message to wrap
 * @param {object} [opts]
 * @param {number|string} [opts.margin] Left margin
 * @param {number} [opts.width] Maximum characters per line including the margin
 */

module.exports = (msg, opts = {}) => {
  const tab = Number.isSafeInteger(parseInt(opts.margin)) ? new Array(parseInt(opts.margin)).fill(' ').join('') : opts.margin || '';
  const width = opts.width || process.stdout.columns;
  return (msg || '').split(/\r?\n/g).map(line => line.split(/\s+/g).reduce((arr, w) => {
    if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width) arr[arr.length - 1] += ` ${w}`;else arr.push(`${tab}${w}`);
    return arr;
  }, [tab]).join('\n')).join('\n');
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);

const Prompt = __webpack_require__(8);

const _require = __webpack_require__(10),
      style = _require.style,
      clear = _require.clear,
      figures = _require.figures,
      wrap = _require.wrap;

const _require2 = __webpack_require__(14),
      cursor = _require2.cursor;
/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class SelectPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string') ch = {
        title: ch,
        value: idx
      };
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value || idx),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear('');
    this.render();
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    } else this.bell();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText));
    super.render(); // Print prompt

    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.done ? this.selection.title : this.selection.disabled ? color.yellow(this.warn) : color.gray(this.hint)].join(' '); // Print choices

    if (!this.done) {
      this.outputText += '\n' + this.choices.map((v, i) => {
        let title,
            prefix,
            desc = '';

        if (v.disabled) {
          title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
          prefix = this.cursor === i ? color.bold().gray(figures.pointer) + ' ' : '  ';
        } else {
          title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
          prefix = this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ';

          if (v.description && this.cursor === i) {
            desc = ` - ${v.description}`;

            if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
              desc = '\n' + wrap(v.description, {
                margin: 3,
                width: this.out.columns
              });
            }
          }
        }

        return `${prefix} ${title}${color.gray(desc)}`;
      }).join('\n');
    }

    this.out.write(this.outputText);
  }

}

module.exports = SelectPrompt;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);

const Prompt = __webpack_require__(8);

const _require = __webpack_require__(10),
      style = _require.style,
      clear = _require.clear;

const _require2 = __webpack_require__(14),
      cursor = _require2.cursor,
      erase = _require2.erase;
/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class TogglePrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || 'on';
    this.inactive = opts.inactive || 'off';
    this.initialValue = this.value;
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }

  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }

  delete() {
    this.deactivate();
  }

  left() {
    this.deactivate();
  }

  right() {
    this.activate();
  }

  down() {
    this.deactivate();
  }

  up() {
    this.activate();
  }

  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.value = !this.value;
    } else if (c === '1') {
      this.value = true;
    } else if (c === '0') {
      this.value = false;
    } else return this.bell();

    this.render();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText));
    super.render();
    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.value ? this.inactive : color.cyan().underline(this.inactive), color.gray('/'), this.value ? color.cyan().underline(this.active) : this.active].join(' ');
    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }

}

module.exports = TogglePrompt;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(7);

const Prompt = __webpack_require__(8);

const _require = __webpack_require__(10),
      style = _require.style,
      clear = _require.clear,
      figures = _require.figures;

const _require2 = __webpack_require__(14),
      erase = _require2.erase,
      cursor = _require2.cursor;

const _require3 = __webpack_require__(23),
      DatePart = _require3.DatePart,
      Meridiem = _require3.Meridiem,
      Day = _require3.Day,
      Hours = _require3.Hours,
      Milliseconds = _require3.Milliseconds,
      Minutes = _require3.Minutes,
      Month = _require3.Month,
      Seconds = _require3.Seconds,
      Year = _require3.Year;

const regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
const regexGroups = {
  1: ({
    token
  }) => token.replace(/\\(.)/g, '$1'),
  2: opts => new Day(opts),
  // Day // TODO
  3: opts => new Month(opts),
  // Month
  4: opts => new Year(opts),
  // Year
  5: opts => new Meridiem(opts),
  // AM/PM // TODO (special)
  6: opts => new Hours(opts),
  // Hours
  7: opts => new Minutes(opts),
  // Minutes
  8: opts => new Seconds(opts),
  // Seconds
  9: opts => new Milliseconds(opts) // Fractional seconds

};
const dfltLocales = {
  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
  /**
   * DatePrompt Base Element
   * @param {Object} opts Options
   * @param {String} opts.message Message
   * @param {Number} [opts.initial] Index of default value
   * @param {String} [opts.mask] The format mask
   * @param {object} [opts.locales] The date locales
   * @param {String} [opts.error] The error message shown on invalid value
   * @param {Function} [opts.validate] Function to validate the submitted value
   * @param {Stream} [opts.stdin] The Readable stream to listen to
   * @param {Stream} [opts.stdout] The Writable stream to write readline data to
   */

};

class DatePrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = '';
    this.locales = Object.assign(dfltLocales, opts.locales);
    this._date = opts.initial || new Date();
    this.errorMsg = opts.error || 'Please Enter A Valid Value';

    this.validator = opts.validate || (() => true);

    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
    this.clear = clear('');
    this.render();
  }

  get value() {
    return this.date;
  }

  get date() {
    return this._date;
  }

  set date(date) {
    if (date) this._date.setTime(date.getTime());
  }

  set mask(mask) {
    let result;
    this.parts = [];

    while (result = regex.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex(gr => gr != null);
      this.parts.push(idx in regexGroups ? regexGroups[idx]({
        token: result[idx] || match,
        date: this.date,
        parts: this.parts,
        locales: this.locales
      }) : result[idx] || match);
    }

    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string') arr[arr.length - 1] += i;else arr.push(i);
      return arr;
    }, []);
    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }

  moveCursor(n) {
    this.typed = '';
    this.cursor = n;
    this.fire();
  }

  reset() {
    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart));
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === 'string') {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.validate();

      if (_this2.error) {
        _this2.color = 'red';

        _this2.fire();

        _this2.render();

        return;
      }

      _this2.done = true;
      _this2.aborted = false;

      _this2.fire();

      _this2.render();

      _this2.out.write('\n');

      _this2.close();
    })();
  }

  up() {
    this.typed = '';
    this.parts[this.cursor].up();
    this.render();
  }

  down() {
    this.typed = '';
    this.parts[this.cursor].down();
    this.render();
  }

  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null) return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }

  right() {
    let next = this.parts[this.cursor].next();
    if (next == null) return this.bell();
    this.moveCursor(this.parts.indexOf(next));
    this.render();
  }

  next() {
    let next = this.parts[this.cursor].next();
    this.moveCursor(next ? this.parts.indexOf(next) : this.parts.findIndex(part => part instanceof DatePart));
    this.render();
  }

  _(c) {
    if (/\d/.test(c)) {
      this.typed += c;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText));
    super.render(); // Print prompt

    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), []).join('')].join(' '); // Print error

    if (this.error) {
      this.outputText += this.errorMsg.split('\n').reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }

}

module.exports = DatePrompt;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  DatePart: __webpack_require__(24),
  Meridiem: __webpack_require__(25),
  Day: __webpack_require__(26),
  Hours: __webpack_require__(27),
  Milliseconds: __webpack_require__(28),
  Minutes: __webpack_require__(29),
  Month: __webpack_require__(30),
  Seconds: __webpack_require__(31),
  Year: __webpack_require__(32)
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class DatePart {
  constructor({
    token,
    date,
    parts,
    locales
  }) {
    this.token = token;
    this.date = date || new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }

  up() {}

  down() {}

  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  setTo(val) {}

  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  toString() {
    return String(this.date);
  }

}

module.exports = DatePart;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

class Meridiem extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }

  down() {
    this.up();
  }

  toString() {
    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
  }

}

module.exports = Meridiem;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

const pos = n => {
  n = n % 10;
  return n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th';
};

class Day extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setDate(this.date.getDate() + 1);
  }

  down() {
    this.date.setDate(this.date.getDate() - 1);
  }

  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }

  toString() {
    let date = this.date.getDate();
    let day = this.date.getDay();
    return this.token === 'DD' ? String(date).padStart(2, '0') : this.token === 'Do' ? date + pos(date) : this.token === 'd' ? day + 1 : this.token === 'ddd' ? this.locales.weekdaysShort[day] : this.token === 'dddd' ? this.locales.weekdays[day] : date;
  }

}

module.exports = Day;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

class Hours extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setHours(this.date.getHours() + 1);
  }

  down() {
    this.date.setHours(this.date.getHours() - 1);
  }

  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }

  toString() {
    let hours = this.date.getHours();
    if (/h/.test(this.token)) hours = hours % 12 || 12;
    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
  }

}

module.exports = Hours;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

class Milliseconds extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }

  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }

  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-this.token.length)));
  }

  toString() {
    return String(this.date.getMilliseconds()).padStart(4, '0').substr(0, this.token.length);
  }

}

module.exports = Milliseconds;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

class Minutes extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }

  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }

  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }

  toString() {
    let m = this.date.getMinutes();
    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
  }

}

module.exports = Minutes;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

class Month extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }

  toString() {
    let month = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month + 1).padStart(2, '0') : tl === 3 ? this.locales.monthsShort[month] : tl === 4 ? this.locales.months[month] : String(month + 1);
  }

}

module.exports = Month;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

class Seconds extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }

  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }

  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }

  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
  }

}

module.exports = Seconds;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(24);

class Year extends DatePart {
  constructor(opts = {}) {
    super(opts);
  }

  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }

  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }

  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }

  toString() {
    let year = String(this.date.getFullYear()).padStart(4, '0');
    return this.token.length === 2 ? year.substr(-2) : year;
  }

}

module.exports = Year;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(7);

const Prompt = __webpack_require__(8);

const _require = __webpack_require__(14),
      cursor = _require.cursor,
      erase = _require.erase;

const _require2 = __webpack_require__(10),
      style = _require2.style,
      figures = _require2.figures,
      clear = _require2.clear,
      lines = _require2.lines;

const isNumber = /[0-9]/;

const isDef = any => any !== undefined;

const round = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
};
/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */


class NumberPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : '';
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;

    this.validator = opts.validate || (() => true);

    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }

  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v, this.round)}`);
      this._value = round(v, this.round);
    }

    this.fire();
  }

  get value() {
    return this._value;
  }

  parse(x) {
    return this.float ? parseFloat(x) : parseInt(x);
  }

  valid(c) {
    return c === `-` || c === `.` && this.float || isNumber.test(c);
  }

  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }

  abort() {
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  validate() {
    var _this = this;

    return _asyncToGenerator(function* () {
      let valid = yield _this.validator(_this.value);

      if (typeof valid === `string`) {
        _this.errorMsg = valid;
        valid = false;
      }

      _this.error = !valid;
    })();
  }

  submit() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      yield _this2.validate();

      if (_this2.error) {
        _this2.color = `red`;

        _this2.fire();

        _this2.render();

        return;
      }

      let x = _this2.value;
      _this2.value = x !== `` ? x : _this2.initial;
      _this2.done = true;
      _this2.aborted = false;
      _this2.error = false;

      _this2.fire();

      _this2.render();

      _this2.out.write(`\n`);

      _this2.close();
    })();
  }

  up() {
    this.typed = ``;
    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  down() {
    this.typed = ``;
    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse(val = val.slice(0, -1)) || ``;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (!this.valid(c)) return this.bell();
    const now = Date.now();
    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed

    this.typed += c;
    this.lastHit = now;
    this.color = `cyan`;
    if (c === `.`) return this.fire();
    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }

  render() {
    if (this.closed) return;

    if (!this.firstRender) {
      if (this.outputError) this.out.write(cursor.down(lines(this.outputError) - 1) + clear(this.outputError));
      this.out.write(clear(this.outputText));
    }

    super.render();
    this.outputError = ''; // Print prompt

    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), !this.done || !this.done && !this.placeholder ? color[this.color]().underline(this.rendered) : this.rendered].join(` `); // Print error

    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`).reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
  }

}

module.exports = NumberPrompt;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);

const _require = __webpack_require__(14),
      cursor = _require.cursor;

const Prompt = __webpack_require__(8);

const _require2 = __webpack_require__(10),
      clear = _require2.clear,
      figures = _require2.figures,
      style = _require2.style,
      wrap = _require2.wrap,
      strip = _require2.strip;
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class MultiselectPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || '';
    this.warn = opts.warn || '- This option is disabled -';
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.instructions = opts.instructions;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string') ch = {
        title: ch,
        value: idx
      };
      return {
        title: ch && (ch.title || ch.value || ch),
        description: ch && ch.description,
        value: ch && (ch.value || idx),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear('');

    if (!opts.overrideRender) {
      this.render();
    }
  }

  reset() {
    this.value.map(v => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }

  selected() {
    return this.value.filter(v => v.selected);
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    const selected = this.value.filter(e => e.selected);

    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }

  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }

    this.render();
  }

  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }

    this.render();
  }

  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.value[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  toggleAll() {
    if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
      return this.bell();
    }

    const newSelected = !this.value[this.cursor].selected;
    this.value.filter(v => !v.disabled).forEach(v => v.selected = newSelected);
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else if (c === 'a') {
      this.toggleAll();
    } else {
      return this.bell();
    }
  }

  renderInstructions() {
    if (this.instructions === undefined || this.instructions) {
      if (typeof this.instructions === 'string') {
        return this.instructions;
      }

      return '\nInstructions:\n' + `    ${figures.arrowUp}/${figures.arrowDown}: Highlight option\n` + `    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection\n` + (this.maxChoices === undefined ? `    a: Toggle all\n` : '') + `    enter/return: Complete answer`;
    }

    return '';
  }

  renderOption(cursor, v, i) {
    const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ';
    let title, desc;

    if (v.disabled) {
      title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
    } else {
      title = cursor === i ? color.cyan().underline(v.title) : v.title;

      if (cursor === i && v.description) {
        desc = ` - ${v.description}`;

        if (prefix.length + title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
          desc = '\n' + wrap(v.description, {
            margin: prefix.length,
            width: this.out.columns
          });
        }
      }
    }

    return prefix + title + color.gray(desc || '');
  } // shared with autocompleteMultiselect


  paginateOptions(options) {
    const c = this.cursor;
    let styledOptions = options.map((v, i) => this.renderOption(c, v, i));
    const numOfOptionsToRender = 10; // if needed, can add an option to change this.

    let scopedOptions = styledOptions;
    let hint = '';

    if (styledOptions.length === 0) {
      return color.red('No matches for this query.');
    } else if (styledOptions.length > numOfOptionsToRender) {
      let startIndex = c - numOfOptionsToRender / 2;
      let endIndex = c + numOfOptionsToRender / 2;

      if (startIndex < 0) {
        startIndex = 0;
        endIndex = numOfOptionsToRender;
      } else if (endIndex > options.length) {
        endIndex = options.length;
        startIndex = endIndex - numOfOptionsToRender;
      }

      scopedOptions = styledOptions.slice(startIndex, endIndex);
      hint = color.dim('(Move up and down to reveal more choices)');
    }

    return '\n' + scopedOptions.join('\n') + '\n' + hint;
  } // shared with autocomleteMultiselect


  renderOptions(options) {
    if (!this.done) {
      return this.paginateOptions(options);
    }

    return '';
  }

  renderDoneOrInstructions() {
    if (this.done) {
      const selected = this.value.filter(e => e.selected).map(v => v.title).join(', ');
      return selected;
    }

    const output = [color.gray(this.hint), this.renderInstructions()];

    if (this.value[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }

    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render(); // print prompt

    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(' ');

    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }

    prompt += this.renderOptions(this.value);
    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }

}

module.exports = MultiselectPrompt;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

const color = __webpack_require__(7);

const Prompt = __webpack_require__(8);

const _require = __webpack_require__(14),
      erase = _require.erase,
      cursor = _require.cursor;

const _require2 = __webpack_require__(10),
      style = _require2.style,
      clear = _require2.clear,
      wrap = _require2.wrap;

const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);

const getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);

const getIndex = (arr, valOrTitle) => {
  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : undefined;
};
/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.noMatches] The no matches found label
 */


class AutocompletePrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === 'number' ? opts.initial : getIndex(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.i18n = {
      noMatches: opts.noMatches || 'no matches found'
    };
    this.fallback = opts.fallback || this.initial;
    this.suggestions = [[]];
    this.page = 0;
    this.input = '';
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear('');
    this.complete(this.render);
    this.render();
  }

  set fallback(fb) {
    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
  }

  get fallback() {
    let choice;
    if (typeof this._fb === 'number') choice = this.choices[this._fb];else if (typeof this._fb === 'string') choice = {
      title: this._fb
    };
    return choice || this._fb || {
      title: this.i18n.noMatches
    };
  }

  moveSelect(i) {
    this.select = i;
    if (this.suggestions[this.page].length > 0) this.value = getVal(this.suggestions[this.page], i);else this.value = this.fallback.value;
    this.fire();
  }

  complete(cb) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const p = _this.completing = _this.suggest(_this.input, _this.choices);

      const suggestions = yield p;
      if (_this.completing !== p) return;
      _this.suggestions = suggestions.map((s, i, arr) => ({
        title: getTitle(arr, i),
        value: getVal(arr, i),
        description: s.description
      })).reduce((arr, sug) => {
        if (arr[arr.length - 1].length < _this.limit) arr[arr.length - 1].push(sug);else arr.push([sug]);
        return arr;
      }, [[]]);
      _this.completing = false;
      if (!_this.suggestions[_this.page]) _this.page = 0; // if (!this.suggestions.length && this.fallback) {
      //   const index = getIndex(this.choices, this.fallback);
      //   this.suggestions = [[]];
      //   if (index !== undefined)
      //     this.suggestions[0].push({ title: getTitle(this.choices, index), value: getVal(this.choices, index) });
      //   this.isFallback = true;
      // }

      const l = Math.max(suggestions.length - 1, 0);

      _this.moveSelect(Math.min(l, _this.select));

      cb && cb();
    })();
  }

  reset() {
    this.input = '';
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    // TODO on ctrl+# go to page #
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c}${s2}`;
    this.cursor = s1.length + 1;
    this.complete(this.render);
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.input.slice(0, this.cursor - 1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor - 1;
    this.render();
  }

  deleteForward() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor + 1);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.render();
  }

  first() {
    this.moveSelect(0);
    this.render();
  }

  last() {
    this.moveSelect(this.suggestions[this.page].length - 1);
    this.render();
  }

  up() {
    if (this.select <= 0) return this.bell();
    this.moveSelect(this.select - 1);
    this.render();
  }

  down() {
    if (this.select >= this.suggestions[this.page].length - 1) return this.bell();
    this.moveSelect(this.select + 1);
    this.render();
  }

  next() {
    if (this.select === this.suggestions[this.page].length - 1) {
      this.page = (this.page + 1) % this.suggestions.length;
      this.moveSelect(0);
    } else this.moveSelect(this.select + 1);

    this.render();
  }

  nextPage() {
    if (this.page >= this.suggestions.length - 1) return this.bell();
    this.page++;
    this.moveSelect(0);
    this.render();
  }

  prevPage() {
    if (this.page <= 0) return this.bell();
    this.page--;
    this.moveSelect(0);
    this.render();
  }

  left() {
    if (this.cursor <= 0) return this.bell();
    this.cursor = this.cursor - 1;
    this.render();
  }

  right() {
    if (this.cursor * this.scale >= this.rendered.length) return this.bell();
    this.cursor = this.cursor + 1;
    this.render();
  }

  renderOption(v, hovered) {
    let desc,
        title = v.title;

    if (hovered) {
      title = color.cyan(v.title);

      if (v.description) {
        desc = ` - ${v.description}`;

        if (title.length + desc.length >= this.out.columns || v.description.split(/\r?\n/).length > 1) {
          desc = '\n' + wrap(v.description, {
            width: this.out.columns
          });
        }
      }
    }

    return title + color.gray(desc || '');
  }

  render() {
    if (this.closed) return;
    if (!this.firstRender) this.out.write(clear(this.outputText));
    super.render();
    this.outputText = [color.bold(style.symbol(this.done, this.aborted)), color.bold(this.msg), style.delimiter(this.completing), this.done && this.suggestions[this.page][this.select] ? this.suggestions[this.page][this.select].title : this.rendered = this.transform.render(this.input)].join(' ');

    if (!this.done) {
      const suggestions = this.suggestions[this.page].map((item, i) => this.renderOption(item, this.select === i)).join('\n');
      this.outputText += `\n` + (suggestions || color.gray(this.fallback.title));

      if (this.suggestions[this.page].length > 1) {
        this.outputText += color.blue(`\nPage ${this.page + 1}/${this.suggestions.length}`);
      }
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }

}

module.exports = AutocompletePrompt;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);

const _require = __webpack_require__(14),
      cursor = _require.cursor;

const MultiselectPrompt = __webpack_require__(34);

const _require2 = __webpack_require__(10),
      clear = _require2.clear,
      style = _require2.style,
      figures = _require2.figures;
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */


class AutocompleteMultiselectPrompt extends MultiselectPrompt {
  constructor(opts = {}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = '';
    this.clear = clear('');
    this.filteredOptions = this.value;
    this.render();
  }

  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }

  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }

    this.render();
  }

  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }

    this.render();
  }

  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }

  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }

  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value.filter(v => {
      if (this.inputValue) {
        if (typeof v.title === 'string') {
          if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }

        if (typeof v.value === 'string') {
          if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
            return true;
          }
        }

        return false;
      }

      return true;
    });
    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight);
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.filteredOptions[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  handleInputChange(c) {
    this.inputValue = this.inputValue + c;
    this.updateFilteredOptions();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c);
    }
  }

  renderInstructions() {
    return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
    `;
  }

  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray('Enter something to filter')}\n`;
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);else title = cursor === i ? color.cyan().underline(v.title) : v.title;
    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title;
  }

  renderDoneOrInstructions() {
    if (this.done) {
      return this.value.filter(e => e.selected).map(v => v.title).join(', ');
    }

    const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }

    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render(); // print prompt

    let prompt = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(false), this.renderDoneOrInstructions()].join(' ');

    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }

    prompt += this.renderOptions(this.filteredOptions);
    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }

}

module.exports = AutocompleteMultiselectPrompt;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);

const Prompt = __webpack_require__(8);

const _require = __webpack_require__(10),
      style = _require.style,
      clear = _require.clear;

const _require2 = __webpack_require__(14),
      erase = _require2.erase,
      cursor = _require2.cursor;
/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.yes] The "Yes" label
 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
 * @param {String} [opts.no] The "No" label
 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
 */


class ConfirmPrompt extends Prompt {
  constructor(opts = {}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || 'yes';
    this.yesOption = opts.yesOption || '(Y/n)';
    this.noMsg = opts.no || 'no';
    this.noOption = opts.noOption || '(y/N)';
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    if (c.toLowerCase() === 'y') {
      this.value = true;
      return this.submit();
    }

    if (c.toLowerCase() === 'n') {
      this.value = false;
      return this.submit();
    }

    return this.bell();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);else this.out.write(clear(this.outputText));
    super.render();
    this.outputText = [style.symbol(this.done, this.aborted), color.bold(this.msg), style.delimiter(this.done), this.done ? this.value ? this.yesMsg : this.noMsg : color.gray(this.initialValue ? this.yesOption : this.noOption)].join(' ');
    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }

}

module.exports = ConfirmPrompt;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const prompts = __webpack_require__(39);

const passOn = ['suggest', 'format', 'onState', 'validate', 'onRender'];
const noop = () => {};

/**
 * Prompt for a series of questions
 * @param {Array|Object} questions Single question object or Array of question objects
 * @param {Function} [onSubmit] Callback function called on prompt submit
 * @param {Function} [onCancel] Callback function called on cancel/abort
 * @returns {Object} Object with values from user input
 */
async function prompt(questions=[], { onSubmit=noop, onCancel=noop }={}) {
  const answers = {};
  const override = prompt._override || {};
  questions = [].concat(questions);
  let answer, question, quit, name, type;

  const getFormattedAnswer = async (question, answer, skipValidation = false) => {
    if (!skipValidation && question.validate && question.validate(answer) !== true) {
      return;
    }
    return question.format ? await question.format(answer, answers) : answer
  };

  for (question of questions) {
    ({ name, type } = question);

    // if property is a function, invoke it unless it's a special function
    for (let key in question) {
      if (passOn.includes(key)) continue;
      let value = question[key];
      question[key] = typeof value === 'function' ? await value(answer, { ...answers }, question) : value;
    }

    if (typeof question.message !== 'string') {
      throw new Error('prompt message is required');
    }

    // update vars in case they changed
    ({ name, type } = question);

    // skip if type is a falsy value
    if (!type) continue;

    if (prompts[type] === void 0) {
      throw new Error(`prompt type (${type}) is not defined`);
    }

    if (override[question.name] !== undefined) {
      answer = await getFormattedAnswer(question, override[question.name]);
      if (answer !== undefined) {
        answers[name] = answer;
        continue;
      }
    }

    try {
      // Get the injected answer if there is one or prompt the user
      answer = prompt._injected ? getInjectedAnswer(prompt._injected) : await prompts[type](question);
      answers[name] = answer = await getFormattedAnswer(question, answer, true);
      quit = await onSubmit(question, answer, answers);
    } catch (err) {
      quit = !(await onCancel(question, answers));
    }

    if (quit) return answers;
  }

  return answers;
}

function getInjectedAnswer(injected) {
  const answer = injected.shift();
    if (answer instanceof Error) {
      throw answer;
    }

    return answer;
}

function inject(answers) {
  prompt._injected = (prompt._injected || []).concat(answers);
}

function override(answers) {
  prompt._override = Object.assign({}, answers);
}

module.exports = Object.assign(prompt, { prompt, prompts, inject, override });


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const $ = exports;
const el = __webpack_require__(40);
const noop = v => v;

function toPrompt(type, args, opts={}) {
  return new Promise((res, rej) => {
    const p = new el[type](args);
    const onAbort = opts.onAbort || noop;
    const onSubmit = opts.onSubmit || noop;
    p.on('state', args.onState || noop);
    p.on('submit', x => res(onSubmit(x)));
    p.on('abort', x => rej(onAbort(x)));
  });
}

/**
 * Text prompt
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.text = args => toPrompt('TextPrompt', args);

/**
 * Password prompt with masked input
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.password = args => {
  args.style = 'password';
  return $.text(args);
};

/**
 * Prompt where input is invisible, like sudo
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {function} [args.onState] On state change callback
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.invisible = args => {
  args.style = 'invisible';
  return $.text(args);
};

/**
 * Number prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.number = args => toPrompt('NumberPrompt', args);

/**
 * Date prompt
 * @param {string} args.message Prompt message to display
 * @param {number} args.initial Default number value
 * @param {function} [args.onState] On state change callback
 * @param {number} [args.max] Max value
 * @param {number} [args.min] Min value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {function} [args.validate] Function to validate user input
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.date = args => toPrompt('DatePrompt', args);

/**
 * Classic yes/no prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.confirm = args => toPrompt('ConfirmPrompt', args);

/**
 * List prompt, split intput string by `seperator`
 * @param {string} args.message Prompt message to display
 * @param {string} [args.initial] Default string value
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {string} [args.separator] String separator
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input, in form of an `Array`
 */
$.list = args => {
  const sep = args.separator || ',';
  return toPrompt('TextPrompt', args, {
    onSubmit: str => str.split(sep).map(s => s.trim())
  });
};

/**
 * Toggle/switch prompt
 * @param {string} args.message Prompt message to display
 * @param {boolean} [args.initial=false] Default value
 * @param {string} [args.active="on"] Text for `active` state
 * @param {string} [args.inactive="off"] Text for `inactive` state
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.toggle = args => toPrompt('TogglePrompt', args);

/**
 * Interactive select prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value }, ...]`
 * @param {number} [args.initial] Index of default value
 * @param {String} [args.hint] Hint to display
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.select = args => toPrompt('SelectPrompt', args);

/**
 * Interactive multi-select / autocompleteMultiselect prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of choices objects `[{ title, value, [selected] }, ...]`
 * @param {number} [args.max] Max select
 * @param {string} [args.hint] Hint to display user
 * @param {Number} [args.cursor=0] Cursor start position
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.multiselect = args => {
  args.choices = [].concat(args.choices || []);
  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
  return toPrompt('MultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

$.autocompleteMultiselect = args => {
  args.choices = [].concat(args.choices || []);
  const toSelected = items => items.filter(item => item.selected).map(item => item.value);
  return toPrompt('AutocompleteMultiselectPrompt', args, {
    onAbort: toSelected,
    onSubmit: toSelected
  });
};

const byTitle = (input, choices) => Promise.resolve(
  choices.filter(item => item.title.slice(0, input.length).toLowerCase() === input.toLowerCase())
);

/**
 * Interactive auto-complete prompt
 * @param {string} args.message Prompt message to display
 * @param {Array} args.choices Array of auto-complete choices objects `[{ title, value }, ...]`
 * @param {Function} [args.suggest] Function to filter results based on user input. Defaults to sort by `title`
 * @param {number} [args.limit=10] Max number of results to show
 * @param {string} [args.style="default"] Render style ('default', 'password', 'invisible')
 * @param {String} [args.initial] Index of the default value
 * @param {String} [args.fallback] Fallback message - defaults to initial value
 * @param {function} [args.onState] On state change callback
 * @param {Stream} [args.stdin] The Readable stream to listen to
 * @param {Stream} [args.stdout] The Writable stream to write readline data to
 * @returns {Promise} Promise with user input
 */
$.autocomplete = args => {
  args.suggest = args.suggest || byTitle;
  args.choices = [].concat(args.choices || []);
  return toPrompt('AutocompletePrompt', args);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  TextPrompt: __webpack_require__(41),
  SelectPrompt: __webpack_require__(51),
  TogglePrompt: __webpack_require__(52),
  DatePrompt: __webpack_require__(53),
  NumberPrompt: __webpack_require__(64),
  MultiselectPrompt: __webpack_require__(65),
  AutocompletePrompt: __webpack_require__(66),
  AutocompleteMultiselectPrompt: __webpack_require__(67),
  ConfirmPrompt: __webpack_require__(68)
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

const color = __webpack_require__(7);
const Prompt = __webpack_require__(42);
const { erase, cursor } = __webpack_require__(14);
const { style, clear, lines, figures } = __webpack_require__(43);

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.initial] Default value
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */
class TextPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.msg = opts.message;
    this.initial = opts.initial || ``;
    this.validator = opts.validate || (() => true);
    this.value = ``;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.cursor = Number(!!this.initial);
    this.clear = clear(``);
    this.render();
  }

  set value(v) {
    if (!v && this.initial) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(this.initial));
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(v);
    }
    this._value = v;
    this.fire();
  }

  get value() {
    return this._value;
  }

  reset() {
    this.value = ``;
    this.cursor = Number(!!this.initial);
    this.fire();
    this.render();
  }

  abort() {
    this.value = this.value || this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.red = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    this.value = this.value || this.initial;
    await this.validate();
    if (this.error) {
      this.red = true;
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  next() {
    if (!this.placeholder) return this.bell();
    this.value = this.initial;
    this.cursor = this.rendered.length;
    this.fire();
    this.render();
  }

  moveCursor(n) {
    if (this.placeholder) return;
    this.cursor = this.cursor+n;
  }

  _(c, key) {
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${c}${s2}`;
    this.red = false;
    this.cursor = this.placeholder ? 0 : s1.length+1;
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.value.slice(0, this.cursor-1);
    let s2 = this.value.slice(this.cursor);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.moveCursor(-1);
    this.render();
  }

  deleteForward() {
    if(this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
    let s1 = this.value.slice(0, this.cursor);
    let s2 = this.value.slice(this.cursor+1);
    this.value = `${s1}${s2}`;
    this.red = false;
    this.render();
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length;
    this.render();
  }

  left() {
    if (this.cursor <= 0 || this.placeholder) return this.bell();
    this.moveCursor(-1);
    this.render();
  }

  right() {
    if (this.cursor*this.scale >= this.rendered.length || this.placeholder) return this.bell();
    this.moveCursor(1);
    this.render();
  }

  render() {
    if (this.closed) return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor.down(lines(this.outputError) - 1) + clear(this.outputError));
      this.out.write(clear(this.outputText));
    }
    super.render();
    this.outputError = '';

    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      this.red ? color.red(this.rendered) : this.rendered
    ].join(` `);

    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`)
          .reduce((a, l, i) => a + `\n${i ? ' ' : figures.pointerSmall} ${color.red().italic(l)}`, ``);
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
  }
}

module.exports = TextPrompt;


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const readline = __webpack_require__(9);
const { action } = __webpack_require__(43);
const EventEmitter = __webpack_require__(19);
const { beep, cursor } = __webpack_require__(14);
const color = __webpack_require__(7);

/**
 * Base prompt skeleton
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class Prompt extends EventEmitter {
  constructor(opts={}) {
    super();

    this.firstRender = true;
    this.in = opts.in || process.stdin;
    this.out = opts.out || process.stdout;
    this.onRender = (opts.onRender || (() => void 0)).bind(this);
    const rl = readline.createInterface(this.in);
    readline.emitKeypressEvents(this.in, rl);

    if (this.in.isTTY) this.in.setRawMode(true);
    const isSelect = [ 'SelectPrompt', 'MultiselectPrompt' ].indexOf(this.constructor.name) > -1;
    const keypress = (str, key) => {
      let a = action(key, isSelect);
      if (a === false) {
        this._ && this._(str, key);
      } else if (typeof this[a] === 'function') {
        this[a](key);
      } else {
        this.bell();
      }
    };

    this.close = () => {
      this.out.write(cursor.show);
      this.in.removeListener('keypress', keypress);
      if (this.in.isTTY) this.in.setRawMode(false);
      rl.close();
      this.emit(this.aborted ? 'abort' : 'submit', this.value);
      this.closed = true;
    };

    this.in.on('keypress', keypress);
  }

  fire() {
    this.emit('state', {
      value: this.value,
      aborted: !!this.aborted
    });
  }

  bell() {
    this.out.write(beep);
  }

  render() {
    this.onRender(color);
    if (this.firstRender) this.firstRender = false;
  }
}

module.exports = Prompt;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  action: __webpack_require__(44),
  clear: __webpack_require__(45),
  style: __webpack_require__(47),
  strip: __webpack_require__(46),
  figures: __webpack_require__(48),
  lines: __webpack_require__(49),
  wrap: __webpack_require__(50)
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = (key, isSelect) => {
  if (key.meta) return;
  
  if (key.ctrl) {
    if (key.name === 'a') return 'first';
    if (key.name === 'c') return 'abort';
    if (key.name === 'd') return 'abort';
    if (key.name === 'e') return 'last';
    if (key.name === 'g') return 'reset';
  }
  
  if (isSelect) {
    if (key.name === 'j') return 'down';
    if (key.name === 'k') return 'up';
  }

  if (key.name === 'return') return 'submit';
  if (key.name === 'enter') return 'submit'; // ctrl + J
  if (key.name === 'backspace') return 'delete';
  if (key.name === 'delete') return 'deleteForward';
  if (key.name === 'abort') return 'abort';
  if (key.name === 'escape') return 'abort';
  if (key.name === 'tab') return 'next';
  if (key.name === 'pagedown') return 'nextPage';
  if (key.name === 'pageup') return 'prevPage';

  if (key.name === 'up') return 'up';
  if (key.name === 'down') return 'down';
  if (key.name === 'right') return 'right';
  if (key.name === 'left') return 'left';

  return false;
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const strip = __webpack_require__(46);
const { erase, cursor } = __webpack_require__(14);

const width = str => [...strip(str)].length;

module.exports = function(prompt, perLine = process.stdout.columns) {
  if (!perLine) return erase.line + cursor.to(0);

  let rows = 0;
  const lines = prompt.split(/\r?\n/);
  for (let line of lines) {
    rows += 1 + Math.floor(Math.max(width(line) - 1, 0) / perLine);
  }

  return (erase.line + cursor.prevLine()).repeat(rows - 1) + erase.line + cursor.to(0);
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = str => {
  const pattern = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))'
  ].join('|');

  const RGX = new RegExp(pattern, 'g');
  return typeof str === 'string' ? str.replace(RGX, '') : str;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const c = __webpack_require__(7);
const figures = __webpack_require__(48);

// rendering user input.
const styles = Object.freeze({
  password: { scale: 1, render: input => '*'.repeat(input.length) },
  emoji: { scale: 2, render: input => '😃'.repeat(input.length) },
  invisible: { scale: 0, render: input => '' },
  default: { scale: 1, render: input => `${input}` }
});
const render = type => styles[type] || styles.default;

// icon to signalize a prompt.
const symbols = Object.freeze({
  aborted: c.red(figures.cross),
  done: c.green(figures.tick),
  default: c.cyan('?')
});

const symbol = (done, aborted) =>
  aborted ? symbols.aborted : done ? symbols.done : symbols.default;

// between the question and the user's input.
const delimiter = completing =>
  c.gray(completing ? figures.ellipsis : figures.pointerSmall);

const item = (expandable, expanded) =>
  c.gray(expandable ? (expanded ? figures.pointerSmall : '+') : figures.line);

module.exports = {
  styles,
  render,
  symbols,
  symbol,
  delimiter,
  item
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
	

 const main = {
  arrowUp: '↑',
  arrowDown: '↓',
  arrowLeft: '←',
  arrowRight: '→',
  radioOn: '◉',
  radioOff: '◯',
  tick: '✔',	
  cross: '✖',	
  ellipsis: '…',	
  pointerSmall: '›',	
  line: '─',	
  pointer: '❯'	
};	
const win = {
  arrowUp: main.arrowUp,
  arrowDown: main.arrowDown,
  arrowLeft: main.arrowLeft,
  arrowRight: main.arrowRight,
  radioOn: '(*)',
  radioOff: '( )',	
  tick: '√',	
  cross: '×',	
  ellipsis: '...',	
  pointerSmall: '»',	
  line: '─',	
  pointer: '>'	
};	
const figures = process.platform === 'win32' ? win : main;	

 module.exports = figures;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const strip = __webpack_require__(46);

module.exports = function (msg, perLine = process.stdout.columns) {
  let lines = String(strip(msg) || '').split(/\r?\n/);

  if (!perLine) return lines.length;
  return lines.map(l => Math.ceil(l.length / perLine))
      .reduce((a, b) => a + b);
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * @param {string} msg The message to wrap
 * @param {object} [opts]
 * @param {number|string} [opts.margin] Left margin
 * @param {number} [opts.width] Maximum characters per line including the margin
 */
module.exports = (msg, opts = {}) => {
  const tab = Number.isSafeInteger(parseInt(opts.margin))
    ? new Array(parseInt(opts.margin)).fill(' ').join('')
    : (opts.margin || '');

  const width = opts.width || process.stdout.columns;

  return (msg || '').split(/\r?\n/g)
    .map(line => line
      .split(/\s+/g)
      .reduce((arr, w) => {
        if (w.length + tab.length >= width || arr[arr.length - 1].length + w.length + 1 < width)
          arr[arr.length - 1] += ` ${w}`;
        else arr.push(`${tab}${w}`);
        return arr;
      }, [ tab ])
      .join('\n'))
    .join('\n');
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);
const Prompt = __webpack_require__(42);
const { style, clear, figures, wrap } = __webpack_require__(43);
const { cursor } = __webpack_require__(14);

/**
 * SelectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {Number} [opts.initial] Index of default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class SelectPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.hint = opts.hint || '- Use arrow-keys. Return to submit.';
    this.warn = opts.warn || '- This option is disabled';
    this.cursor = opts.initial || 0;
    this.choices = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string')
        ch = {title: ch, value: idx};
      return {
        title: ch && (ch.title || ch.value || ch),
        value: ch && (ch.value || idx),
        description: ch && ch.description,
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.value = (this.choices[this.cursor] || {}).value;
    this.clear = clear('');
    this.render();
  }

  moveCursor(n) {
    this.cursor = n;
    this.value = this.choices[n].value;
    this.fire();
  }

  reset() {
    this.moveCursor(0);
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    if (!this.selection.disabled) {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    } else
      this.bell();
  }

  first() {
    this.moveCursor(0);
    this.render();
  }

  last() {
    this.moveCursor(this.choices.length - 1);
    this.render();
  }

  up() {
    if (this.cursor === 0) return this.bell();
    this.moveCursor(this.cursor - 1);
    this.render();
  }

  down() {
    if (this.cursor === this.choices.length - 1) return this.bell();
    this.moveCursor(this.cursor + 1);
    this.render();
  }

  next() {
    this.moveCursor((this.cursor + 1) % this.choices.length);
    this.render();
  }

  _(c, key) {
    if (c === ' ') return this.submit();
  }

  get selection() {
    return this.choices[this.cursor];
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(clear(this.outputText));
    super.render();

    // Print prompt
    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.done ? this.selection.title : this.selection.disabled
          ? color.yellow(this.warn) : color.gray(this.hint)
    ].join(' ');

    // Print choices
    if (!this.done) {
      this.outputText += '\n' +
          this.choices
            .map((v, i) => {
              let title, prefix, desc = '';
              if (v.disabled) {
                title = this.cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
                prefix = this.cursor === i ? color.bold().gray(figures.pointer) + ' ' : '  ';
              } else {
                title = this.cursor === i ? color.cyan().underline(v.title) : v.title;
                prefix = this.cursor === i ? color.cyan(figures.pointer) + ' ' : '  ';
                if (v.description && this.cursor === i) {
                  desc = ` - ${v.description}`;
                  if (prefix.length + title.length + desc.length >= this.out.columns
                      || v.description.split(/\r?\n/).length > 1) {
                    desc = '\n' + wrap(v.description, { margin: 3, width: this.out.columns });
                  }
                }
              }
              return `${prefix} ${title}${color.gray(desc)}`;
            })
            .join('\n');
    }

    this.out.write(this.outputText);
  }
}

module.exports = SelectPrompt;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

const color = __webpack_require__(7);
const Prompt = __webpack_require__(42);
const { style, clear } = __webpack_require__(43);
const { cursor, erase } = __webpack_require__(14);

/**
 * TogglePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial=false] Default value
 * @param {String} [opts.active='no'] Active label
 * @param {String} [opts.inactive='off'] Inactive label
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class TogglePrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.value = !!opts.initial;
    this.active = opts.active || 'on';
    this.inactive = opts.inactive || 'off';
    this.initialValue = this.value;
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  deactivate() {
    if (this.value === false) return this.bell();
    this.value = false;
    this.render();
  }

  activate() {
    if (this.value === true) return this.bell();
    this.value = true;
    this.render();
  }

  delete() {
    this.deactivate();
  }
  left() {
    this.deactivate();
  }
  right() {
    this.activate();
  }
  down() {
    this.deactivate();
  }
  up() {
    this.activate();
  }

  next() {
    this.value = !this.value;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.value = !this.value;
    } else if (c === '1') {
      this.value = true;
    } else if (c === '0') {
      this.value = false;
    } else return this.bell();
    this.render();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(clear(this.outputText));
    super.render();

    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      this.value ? this.inactive : color.cyan().underline(this.inactive),
      color.gray('/'),
      this.value ? color.cyan().underline(this.active) : this.active
    ].join(' ');

    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }
}

module.exports = TogglePrompt;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);
const Prompt = __webpack_require__(42);
const { style, clear, figures } = __webpack_require__(43);
const { erase, cursor } = __webpack_require__(14);
const { DatePart, Meridiem, Day, Hours, Milliseconds, Minutes, Month, Seconds, Year } = __webpack_require__(54);

const regex = /\\(.)|"((?:\\["\\]|[^"])+)"|(D[Do]?|d{3,4}|d)|(M{1,4})|(YY(?:YY)?)|([aA])|([Hh]{1,2})|(m{1,2})|(s{1,2})|(S{1,4})|./g;
const regexGroups = {
  1: ({token}) => token.replace(/\\(.)/g, '$1'),
  2: (opts) => new Day(opts), // Day // TODO
  3: (opts) => new Month(opts), // Month
  4: (opts) => new Year(opts), // Year
  5: (opts) => new Meridiem(opts), // AM/PM // TODO (special)
  6: (opts) => new Hours(opts), // Hours
  7: (opts) => new Minutes(opts), // Minutes
  8: (opts) => new Seconds(opts), // Seconds
  9: (opts) => new Milliseconds(opts), // Fractional seconds
}

const dfltLocales = {
  months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
  monthsShort: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
  weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
  weekdaysShort: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(',')
}


/**
 * DatePrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Number} [opts.initial] Index of default value
 * @param {String} [opts.mask] The format mask
 * @param {object} [opts.locales] The date locales
 * @param {String} [opts.error] The error message shown on invalid value
 * @param {Function} [opts.validate] Function to validate the submitted value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class DatePrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = 0;
    this.typed = '';
    this.locales = Object.assign(dfltLocales, opts.locales);
    this._date = opts.initial || new Date();
    this.errorMsg = opts.error || 'Please Enter A Valid Value';
    this.validator = opts.validate || (() => true);
    this.mask = opts.mask || 'YYYY-MM-DD HH:mm:ss';
    this.clear = clear('');
    this.render();
  }

  get value() {
    return this.date
  }

  get date() {
    return this._date;
  }

  set date(date) {
    if (date) this._date.setTime(date.getTime());
  }

  set mask(mask) {
    let result;
    this.parts = [];
    while(result = regex.exec(mask)) {
      let match = result.shift();
      let idx = result.findIndex(gr => gr != null);
      this.parts.push(idx in regexGroups
        ? regexGroups[idx]({ token: result[idx] || match, date: this.date, parts: this.parts, locales: this.locales })
        : result[idx] || match);
    }

    let parts = this.parts.reduce((arr, i) => {
      if (typeof i === 'string' && typeof arr[arr.length - 1] === 'string')
        arr[arr.length - 1] += i;
      else arr.push(i);
      return arr;
    }, []);

    this.parts.splice(0);
    this.parts.push(...parts);
    this.reset();
  }

  moveCursor(n) {
    this.typed = '';
    this.cursor = n;
    this.fire();
  }

  reset() {
    this.moveCursor(this.parts.findIndex(p => p instanceof DatePart));
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === 'string') {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    await this.validate();
    if (this.error) {
      this.color = 'red';
      this.fire();
      this.render();
      return;
    }
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  up() {
    this.typed = '';
    this.parts[this.cursor].up();
    this.render();
  }

  down() {
    this.typed = '';
    this.parts[this.cursor].down();
    this.render();
  }

  left() {
    let prev = this.parts[this.cursor].prev();
    if (prev == null) return this.bell();
    this.moveCursor(this.parts.indexOf(prev));
    this.render();
  }

  right() {
    let next = this.parts[this.cursor].next();
    if (next == null) return this.bell();
    this.moveCursor(this.parts.indexOf(next));
    this.render();
  }

  next() {
    let next = this.parts[this.cursor].next();
    this.moveCursor(next
      ? this.parts.indexOf(next)
      : this.parts.findIndex((part) => part instanceof DatePart));
    this.render();
  }

  _(c) {
    if (/\d/.test(c)) {
      this.typed += c;
      this.parts[this.cursor].setTo(this.typed);
      this.render();
    }
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(clear(this.outputText));
    super.render();

    // Print prompt
    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.parts.reduce((arr, p, idx) => arr.concat(idx === this.cursor && !this.done ? color.cyan().underline(p.toString()) : p), [])
          .join('')
    ].join(' ');

    // Print error
    if (this.error) {
      this.outputText += this.errorMsg.split('\n').reduce(
          (a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }
}

module.exports = DatePrompt;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  DatePart: __webpack_require__(55),
  Meridiem: __webpack_require__(56),
  Day: __webpack_require__(57),
  Hours: __webpack_require__(58),
  Milliseconds: __webpack_require__(59),
  Minutes: __webpack_require__(60),
  Month: __webpack_require__(61),
  Seconds: __webpack_require__(62),
  Year: __webpack_require__(63),
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class DatePart {
  constructor({token, date, parts, locales}) {
    this.token = token;
    this.date = date || new Date();
    this.parts = parts || [this];
    this.locales = locales || {};
  }

  up() {}

  down() {}

  next() {
    const currentIdx = this.parts.indexOf(this);
    return this.parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  setTo(val) {}

  prev() {
    let parts = [].concat(this.parts).reverse();
    const currentIdx = parts.indexOf(this);
    return parts.find((part, idx) => idx > currentIdx && part instanceof DatePart);
  }

  toString() {
    return String(this.date);
  }
}

module.exports = DatePart;




/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

class Meridiem extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setHours((this.date.getHours() + 12) % 24);
  }

  down() {
    this.up();
  }

  toString() {
    let meridiem = this.date.getHours() > 12 ? 'pm' : 'am';
    return /\A/.test(this.token) ? meridiem.toUpperCase() : meridiem;
  }
}

module.exports = Meridiem;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

const pos = n => {
  n = n % 10;
  return n === 1 ? 'st'
       : n === 2 ? 'nd'
       : n === 3 ? 'rd'
       : 'th';
}

class Day extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setDate(this.date.getDate() + 1);
  }

  down() {
    this.date.setDate(this.date.getDate() - 1);
  }

  setTo(val) {
    this.date.setDate(parseInt(val.substr(-2)));
  }

  toString() {
    let date = this.date.getDate();
    let day = this.date.getDay();
    return this.token === 'DD' ? String(date).padStart(2, '0')
         : this.token === 'Do' ? date + pos(date)
         : this.token === 'd' ? day + 1
         : this.token === 'ddd' ? this.locales.weekdaysShort[day]
         : this.token === 'dddd' ? this.locales.weekdays[day]
         : date;
  }
}

module.exports = Day;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

class Hours extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setHours(this.date.getHours() + 1);
  }

  down() {
    this.date.setHours(this.date.getHours() - 1);
  }

  setTo(val) {
    this.date.setHours(parseInt(val.substr(-2)));
  }

  toString() {
    let hours = this.date.getHours();
    if (/h/.test(this.token))
      hours = (hours % 12) || 12;
    return this.token.length > 1 ? String(hours).padStart(2, '0') : hours;
  }
}

module.exports = Hours;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

class Milliseconds extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMilliseconds(this.date.getMilliseconds() + 1);
  }

  down() {
    this.date.setMilliseconds(this.date.getMilliseconds() - 1);
  }

  setTo(val) {
    this.date.setMilliseconds(parseInt(val.substr(-(this.token.length))));
  }

  toString() {
    return String(this.date.getMilliseconds()).padStart(4, '0')
                                              .substr(0, this.token.length);
  }
}

module.exports = Milliseconds;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

class Minutes extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMinutes(this.date.getMinutes() + 1);
  }

  down() {
    this.date.setMinutes(this.date.getMinutes() - 1);
  }

  setTo(val) {
    this.date.setMinutes(parseInt(val.substr(-2)));
  }

  toString() {
    let m = this.date.getMinutes();
    return this.token.length > 1 ? String(m).padStart(2, '0') : m;
  }
}

module.exports = Minutes;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

class Month extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setMonth(this.date.getMonth() + 1);
  }

  down() {
    this.date.setMonth(this.date.getMonth() - 1);
  }

  setTo(val) {
    val = parseInt(val.substr(-2)) - 1;
    this.date.setMonth(val < 0 ? 0 : val);
  }

  toString() {
    let month = this.date.getMonth();
    let tl = this.token.length;
    return tl === 2 ? String(month + 1).padStart(2, '0')
           : tl === 3 ? this.locales.monthsShort[month]
             : tl === 4 ? this.locales.months[month]
               : String(month + 1);
  }
}

module.exports = Month;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

class Seconds extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setSeconds(this.date.getSeconds() + 1);
  }

  down() {
    this.date.setSeconds(this.date.getSeconds() - 1);
  }

  setTo(val) {
    this.date.setSeconds(parseInt(val.substr(-2)));
  }

  toString() {
    let s = this.date.getSeconds();
    return this.token.length > 1 ? String(s).padStart(2, '0') : s;
  }
}

module.exports = Seconds;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DatePart = __webpack_require__(55);

class Year extends DatePart {
  constructor(opts={}) {
    super(opts);
  }

  up() {
    this.date.setFullYear(this.date.getFullYear() + 1);
  }

  down() {
    this.date.setFullYear(this.date.getFullYear() - 1);
  }

  setTo(val) {
    this.date.setFullYear(val.substr(-4));
  }

  toString() {
    let year = String(this.date.getFullYear()).padStart(4, '0');
    return this.token.length === 2 ? year.substr(-2) : year;
  }
}

module.exports = Year;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

const color = __webpack_require__(7);
const Prompt = __webpack_require__(42);
const { cursor, erase } = __webpack_require__(14);
const { style, figures, clear, lines } = __webpack_require__(43);

const isNumber = /[0-9]/;
const isDef = any => any !== undefined;
const round = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

/**
 * NumberPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {String} [opts.style='default'] Render style
 * @param {Number} [opts.initial] Default value
 * @param {Number} [opts.max=+Infinity] Max value
 * @param {Number} [opts.min=-Infinity] Min value
 * @param {Boolean} [opts.float=false] Parse input as floats
 * @param {Number} [opts.round=2] Round floats to x decimals
 * @param {Number} [opts.increment=1] Number to increment by when using arrow-keys
 * @param {Function} [opts.validate] Validate function
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.error] The invalid error label
 */
class NumberPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.transform = style.render(opts.style);
    this.msg = opts.message;
    this.initial = isDef(opts.initial) ? opts.initial : '';
    this.float = !!opts.float;
    this.round = opts.round || 2;
    this.inc = opts.increment || 1;
    this.min = isDef(opts.min) ? opts.min : -Infinity;
    this.max = isDef(opts.max) ? opts.max : Infinity;
    this.errorMsg = opts.error || `Please Enter A Valid Value`;
    this.validator = opts.validate || (() => true);
    this.color = `cyan`;
    this.value = ``;
    this.typed = ``;
    this.lastHit = 0;
    this.render();
  }

  set value(v) {
    if (!v && v !== 0) {
      this.placeholder = true;
      this.rendered = color.gray(this.transform.render(`${this.initial}`));
      this._value = ``;
    } else {
      this.placeholder = false;
      this.rendered = this.transform.render(`${round(v, this.round)}`);
      this._value = round(v, this.round);
    }
    this.fire();
  }

  get value() {
    return this._value;
  }

  parse(x) {
    return this.float ? parseFloat(x) : parseInt(x);
  }

  valid(c) {
    return c === `-` || c === `.` && this.float || isNumber.test(c)
  }

  reset() {
    this.typed = ``;
    this.value = ``;
    this.fire();
    this.render();
  }

  abort() {
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = this.aborted = true;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  async validate() {
    let valid = await this.validator(this.value);
    if (typeof valid === `string`) {
      this.errorMsg = valid;
      valid = false;
    }
    this.error = !valid;
  }

  async submit() {
    await this.validate();
    if (this.error) {
      this.color = `red`;
      this.fire();
      this.render();
      return;
    }
    let x = this.value;
    this.value = x !== `` ? x : this.initial;
    this.done = true;
    this.aborted = false;
    this.error = false;
    this.fire();
    this.render();
    this.out.write(`\n`);
    this.close();
  }

  up() {
    this.typed = ``;
    if (this.value >= this.max) return this.bell();
    this.value += this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  down() {
    this.typed = ``;
    if (this.value <= this.min) return this.bell();
    this.value -= this.inc;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  delete() {
    let val = this.value.toString();
    if (val.length === 0) return this.bell();
    this.value = this.parse((val = val.slice(0, -1))) || ``;
    this.color = `cyan`;
    this.fire();
    this.render();
  }

  next() {
    this.value = this.initial;
    this.fire();
    this.render();
  }

  _(c, key) {
    if (!this.valid(c)) return this.bell();

    const now = Date.now();
    if (now - this.lastHit > 1000) this.typed = ``; // 1s elapsed
    this.typed += c;
    this.lastHit = now;
    this.color = `cyan`;

    if (c === `.`) return this.fire();

    this.value = Math.min(this.parse(this.typed), this.max);
    if (this.value > this.max) this.value = this.max;
    if (this.value < this.min) this.value = this.min;
    this.fire();
    this.render();
  }

  render() {
    if (this.closed) return;
    if (!this.firstRender) {
      if (this.outputError)
        this.out.write(cursor.down(lines(this.outputError) - 1) + clear(this.outputError));
      this.out.write(clear(this.outputText));
    }
    super.render();
    this.outputError = '';

    // Print prompt
    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      !this.done || (!this.done && !this.placeholder)
          ? color[this.color]().underline(this.rendered) : this.rendered
    ].join(` `);

    // Print error
    if (this.error) {
      this.outputError += this.errorMsg.split(`\n`)
          .reduce((a, l, i) => a + `\n${i ? ` ` : figures.pointerSmall} ${color.red().italic(l)}`, ``);
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText + cursor.save + this.outputError + cursor.restore);
  }
}

module.exports = NumberPrompt;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);
const { cursor } = __webpack_require__(14);
const Prompt = __webpack_require__(42);
const { clear, figures, style, wrap, strip } = __webpack_require__(43);

/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class MultiselectPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.cursor = opts.cursor || 0;
    this.scrollIndex = opts.cursor || 0;
    this.hint = opts.hint || '';
    this.warn = opts.warn || '- This option is disabled -';
    this.minSelected = opts.min;
    this.showMinError = false;
    this.maxChoices = opts.max;
    this.instructions = opts.instructions;
    this.value = opts.choices.map((ch, idx) => {
      if (typeof ch === 'string')
        ch = {title: ch, value: idx};
      return {
        title: ch && (ch.title || ch.value || ch),
        description: ch && ch.description,
        value: ch && (ch.value || idx),
        selected: ch && ch.selected,
        disabled: ch && ch.disabled
      };
    });
    this.clear = clear('');
    if (!opts.overrideRender) {
      this.render();
    }
  }

  reset() {
    this.value.map(v => !v.selected);
    this.cursor = 0;
    this.fire();
    this.render();
  }

  selected() {
    return this.value.filter(v => v.selected);
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    const selected = this.value
      .filter(e => e.selected);
    if (this.minSelected && selected.length < this.minSelected) {
      this.showMinError = true;
      this.render();
    } else {
      this.done = true;
      this.aborted = false;
      this.fire();
      this.render();
      this.out.write('\n');
      this.close();
    }
  }

  first() {
    this.cursor = 0;
    this.render();
  }

  last() {
    this.cursor = this.value.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.value.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.value.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }

  down() {
    if (this.cursor === this.value.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }

  left() {
    this.value[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.value[this.cursor].selected = true;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.value[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  toggleAll() {
    if (this.maxChoices !== undefined || this.value[this.cursor].disabled) {
      return this.bell();
    }

    const newSelected = !this.value[this.cursor].selected;
    this.value.filter(v => !v.disabled).forEach(v => v.selected = newSelected);
    this.render();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else if (c === 'a') {
      this.toggleAll();
    } else {
      return this.bell();
    }
  }

  renderInstructions() {
    if (this.instructions === undefined || this.instructions) {
      if (typeof this.instructions === 'string') {
        return this.instructions;
      }
      return '\nInstructions:\n'
        + `    ${figures.arrowUp}/${figures.arrowDown}: Highlight option\n`
        + `    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection\n`
        + (this.maxChoices === undefined ? `    a: Toggle all\n` : '')
        + `    enter/return: Complete answer`;
    }
    return '';
  }

  renderOption(cursor, v, i) {
    const prefix = (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ';
    let title, desc;

    if(v.disabled) {
      title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
    } else {
      title = cursor === i ? color.cyan().underline(v.title) : v.title;
      if (cursor === i && v.description) {
        desc = ` - ${v.description}`;
        if (prefix.length + title.length + desc.length >= this.out.columns
          || v.description.split(/\r?\n/).length > 1) {
          desc = '\n' + wrap(v.description, { margin: prefix.length, width: this.out.columns });
        }
      }
    }

    return prefix + title + color.gray(desc || '');
  }

  // shared with autocompleteMultiselect
  paginateOptions(options) {
    const c = this.cursor;
    let styledOptions = options.map((v, i) => this.renderOption(c, v, i));
    const numOfOptionsToRender = 10; // if needed, can add an option to change this.

    let scopedOptions = styledOptions;
    let hint = '';
    if (styledOptions.length === 0) {
      return color.red('No matches for this query.');
    } else if (styledOptions.length > numOfOptionsToRender) {
      let startIndex = c - (numOfOptionsToRender / 2);
      let endIndex = c + (numOfOptionsToRender / 2);
      if (startIndex < 0) {
        startIndex = 0;
        endIndex = numOfOptionsToRender;
      } else if (endIndex > options.length) {
        endIndex = options.length;
        startIndex = endIndex - numOfOptionsToRender;
      }
      scopedOptions = styledOptions.slice(startIndex, endIndex);
      hint = color.dim('(Move up and down to reveal more choices)');
    }
    return '\n' + scopedOptions.join('\n') + '\n' + hint;
  }

  // shared with autocomleteMultiselect
  renderOptions(options) {
    if (!this.done) {
      return this.paginateOptions(options);
    }
    return '';
  }

  renderDoneOrInstructions() {
    if (this.done) {
      const selected = this.value
        .filter(e => e.selected)
        .map(v => v.title)
        .join(', ');
      return selected;
    }

    const output = [color.gray(this.hint), this.renderInstructions()];

    if (this.value[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }
    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();

    // print prompt
    let prompt = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(' ');
    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt += this.renderOptions(this.value);

    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }
}

module.exports = MultiselectPrompt;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);
const Prompt = __webpack_require__(42);
const { erase, cursor } = __webpack_require__(14);
const { style, clear, wrap } = __webpack_require__(43);

const getVal = (arr, i) => arr[i] && (arr[i].value || arr[i].title || arr[i]);
const getTitle = (arr, i) => arr[i] && (arr[i].title || arr[i].value || arr[i]);
const getIndex = (arr, valOrTitle) => {
  const index = arr.findIndex(el => el.value === valOrTitle || el.title === valOrTitle);
  return index > -1 ? index : undefined;
};

/**
 * TextPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of auto-complete choices objects
 * @param {Function} [opts.suggest] Filter function. Defaults to sort by title
 * @param {Number} [opts.limit=10] Max number of results to show
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {String} [opts.style='default'] Render style
 * @param {String} [opts.fallback] Fallback message - initial to default value
 * @param {String} [opts.initial] Index of the default value
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.noMatches] The no matches found label
 */
class AutocompletePrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.suggest = opts.suggest;
    this.choices = opts.choices;
    this.initial = typeof opts.initial === 'number'
      ? opts.initial
      : getIndex(opts.choices, opts.initial);
    this.select = this.initial || opts.cursor || 0;
    this.i18n = { noMatches: opts.noMatches || 'no matches found' };
    this.fallback = opts.fallback || this.initial;
    this.suggestions = [[]];
    this.page = 0;
    this.input = '';
    this.limit = opts.limit || 10;
    this.cursor = 0;
    this.transform = style.render(opts.style);
    this.scale = this.transform.scale;
    this.render = this.render.bind(this);
    this.complete = this.complete.bind(this);
    this.clear = clear('');
    this.complete(this.render);
    this.render();
  }

  set fallback(fb) {
    this._fb = Number.isSafeInteger(parseInt(fb)) ? parseInt(fb) : fb;
  }

  get fallback() {
    let choice;
    if (typeof this._fb === 'number')
      choice = this.choices[this._fb];
    else if (typeof this._fb === 'string')
      choice = { title: this._fb };
    return choice || this._fb || { title: this.i18n.noMatches };
  }

  moveSelect(i) {
    this.select = i;
    if (this.suggestions[this.page].length > 0)
      this.value = getVal(this.suggestions[this.page], i);
    else this.value = this.fallback.value;
    this.fire();
  }

  async complete(cb) {
    const p = (this.completing = this.suggest(this.input, this.choices));
    const suggestions = await p;

    if (this.completing !== p) return;
    this.suggestions = suggestions
        .map((s, i, arr) => ({ title: getTitle(arr, i), value: getVal(arr, i), description: s.description }))
        .reduce((arr, sug) => {
          if (arr[arr.length - 1].length < this.limit)
            arr[arr.length - 1].push(sug);
          else arr.push([sug]);
          return arr;
        }, [[]]);
    this.completing = false;
    if (!this.suggestions[this.page])
      this.page = 0;

    // if (!this.suggestions.length && this.fallback) {
    //   const index = getIndex(this.choices, this.fallback);
    //   this.suggestions = [[]];
    //   if (index !== undefined)
    //     this.suggestions[0].push({ title: getTitle(this.choices, index), value: getVal(this.choices, index) });
    //   this.isFallback = true;
    // }

    const l = Math.max(suggestions.length - 1, 0);
    this.moveSelect(Math.min(l, this.select));

    cb && cb();
  }

  reset() {
    this.input = '';
    this.complete(() => {
      this.moveSelect(this.initial !== void 0 ? this.initial : 0);
      this.render();
    });
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) { // TODO on ctrl+# go to page #
    let s1 = this.input.slice(0, this.cursor);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${c}${s2}`;
    this.cursor = s1.length+1;
    this.complete(this.render);
    this.render();
  }

  delete() {
    if (this.cursor === 0) return this.bell();
    let s1 = this.input.slice(0, this.cursor-1);
    let s2 = this.input.slice(this.cursor);
    this.input = `${s1}${s2}`;
    this.complete(this.render);
    this.cursor = this.cursor-1;
    this.render();
  }

  deleteForward() {
      if(this.cursor*this.scale >= this.rendered.length) return this.bell();
      let s1 = this.input.slice(0, this.cursor);
      let s2 = this.input.slice(this.cursor+1);
      this.input = `${s1}${s2}`;
      this.complete(this.render);
      this.render();
  }

  first() {
    this.moveSelect(0);
    this.render();
  }

  last() {
    this.moveSelect(this.suggestions[this.page].length - 1);
    this.render();
  }

  up() {
    if (this.select <= 0) return this.bell();
    this.moveSelect(this.select - 1);
    this.render();
  }

  down() {
    if (this.select >= this.suggestions[this.page].length - 1) return this.bell();
    this.moveSelect(this.select + 1);
    this.render();
  }

  next() {
    if (this.select === this.suggestions[this.page].length - 1) {
      this.page = (this.page + 1) % this.suggestions.length;
      this.moveSelect(0);
    } else this.moveSelect(this.select + 1);
    this.render();
  }

  nextPage() {
    if (this.page >= this.suggestions.length - 1)
      return this.bell();
    this.page++;
    this.moveSelect(0);
    this.render();
  }

  prevPage() {
    if (this.page <= 0)
      return this.bell();
    this.page--;
    this.moveSelect(0);
    this.render();
  }

  left() {
    if (this.cursor <= 0) return this.bell();
    this.cursor = this.cursor-1;
    this.render();
  }

  right() {
    if (this.cursor*this.scale >= this.rendered.length) return this.bell();
    this.cursor = this.cursor+1;
    this.render();
  }

  renderOption(v, hovered) {
    let desc, title = v.title;
    if (hovered) {
      title = color.cyan(v.title);
      if (v.description) {
        desc = ` - ${v.description}`;
        if (title.length + desc.length >= this.out.columns
          || v.description.split(/\r?\n/).length > 1) {
          desc = '\n' + wrap(v.description, { width: this.out.columns })
        }
      }
    }
    return title + color.gray(desc || '');
  }

  render() {
    if (this.closed) return;
    if (!this.firstRender) this.out.write(clear(this.outputText));
    super.render();

    this.outputText = [
      color.bold(style.symbol(this.done, this.aborted)),
      color.bold(this.msg),
      style.delimiter(this.completing),
      this.done && this.suggestions[this.page][this.select]
          ? this.suggestions[this.page][this.select].title
          : this.rendered = this.transform.render(this.input)
    ].join(' ');

    if (!this.done) {
      const suggestions = this.suggestions[this.page]
        .map((item, i) => this.renderOption(item, this.select === i))
        .join('\n');
      this.outputText += `\n` + (suggestions || color.gray(this.fallback.title));

      if (this.suggestions[this.page].length > 1) {
        this.outputText += color.blue(`\nPage ${this.page+1}/${this.suggestions.length}`);
      }
    }

    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }
}

module.exports = AutocompletePrompt;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const color = __webpack_require__(7);
const { cursor } = __webpack_require__(14);
const MultiselectPrompt = __webpack_require__(65);
const { clear, style, figures } = __webpack_require__(43);
/**
 * MultiselectPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Array} opts.choices Array of choice objects
 * @param {String} [opts.hint] Hint to display
 * @param {String} [opts.warn] Hint shown for disabled choices
 * @param {Number} [opts.max] Max choices
 * @param {Number} [opts.cursor=0] Cursor start position
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 */
class AutocompleteMultiselectPrompt extends MultiselectPrompt {
  constructor(opts={}) {
    opts.overrideRender = true;
    super(opts);
    this.inputValue = '';
    this.clear = clear('');
    this.filteredOptions = this.value;
    this.render();
  }

  last() {
    this.cursor = this.filteredOptions.length - 1;
    this.render();
  }
  next() {
    this.cursor = (this.cursor + 1) % this.filteredOptions.length;
    this.render();
  }

  up() {
    if (this.cursor === 0) {
      this.cursor = this.filteredOptions.length - 1;
    } else {
      this.cursor--;
    }
    this.render();
  }

  down() {
    if (this.cursor === this.filteredOptions.length - 1) {
      this.cursor = 0;
    } else {
      this.cursor++;
    }
    this.render();
  }

  left() {
    this.filteredOptions[this.cursor].selected = false;
    this.render();
  }

  right() {
    if (this.value.filter(e => e.selected).length >= this.maxChoices) return this.bell();
    this.filteredOptions[this.cursor].selected = true;
    this.render();
  }

  delete() {
    if (this.inputValue.length) {
      this.inputValue = this.inputValue.substr(0, this.inputValue.length - 1);
      this.updateFilteredOptions();
    }
  }

  updateFilteredOptions() {
    const currentHighlight = this.filteredOptions[this.cursor];
    this.filteredOptions = this.value
      .filter(v => {
        if (this.inputValue) {
          if (typeof v.title === 'string') {
            if (v.title.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          if (typeof v.value === 'string') {
            if (v.value.toLowerCase().includes(this.inputValue.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
        return true;
      });
    const newHighlightIndex = this.filteredOptions.findIndex(v => v === currentHighlight)
    this.cursor = newHighlightIndex < 0 ? 0 : newHighlightIndex;
    this.render();
  }

  handleSpaceToggle() {
    const v = this.filteredOptions[this.cursor];

    if (v.selected) {
      v.selected = false;
      this.render();
    } else if (v.disabled || this.value.filter(e => e.selected).length >= this.maxChoices) {
      return this.bell();
    } else {
      v.selected = true;
      this.render();
    }
  }

  handleInputChange(c) {
    this.inputValue = this.inputValue + c;
    this.updateFilteredOptions();
  }

  _(c, key) {
    if (c === ' ') {
      this.handleSpaceToggle();
    } else {
      this.handleInputChange(c);
    }
  }

  renderInstructions() {
    return `
Instructions:
    ${figures.arrowUp}/${figures.arrowDown}: Highlight option
    ${figures.arrowLeft}/${figures.arrowRight}/[space]: Toggle selection
    [a,b,c]/delete: Filter choices
    enter/return: Complete answer
    `
  }

  renderCurrentInput() {
    return `
Filtered results for: ${this.inputValue ? this.inputValue : color.gray('Enter something to filter')}\n`;
  }

  renderOption(cursor, v, i) {
    let title;
    if (v.disabled) title = cursor === i ? color.gray().underline(v.title) : color.strikethrough().gray(v.title);
    else title = cursor === i ? color.cyan().underline(v.title) : v.title;
    return (v.selected ? color.green(figures.radioOn) : figures.radioOff) + '  ' + title
  }

  renderDoneOrInstructions() {
    if (this.done) {
      return this.value
        .filter(e => e.selected)
        .map(v => v.title)
        .join(', ');
    }

    const output = [color.gray(this.hint), this.renderInstructions(), this.renderCurrentInput()];

    if (this.filteredOptions.length && this.filteredOptions[this.cursor].disabled) {
      output.push(color.yellow(this.warn));
    }
    return output.join(' ');
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    super.render();

    // print prompt

    let prompt = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(false),
      this.renderDoneOrInstructions()
    ].join(' ');

    if (this.showMinError) {
      prompt += color.red(`You must select a minimum of ${this.minSelected} choices.`);
      this.showMinError = false;
    }
    prompt += this.renderOptions(this.filteredOptions);

    this.out.write(this.clear + prompt);
    this.clear = clear(prompt);
  }
}

module.exports = AutocompleteMultiselectPrompt;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

const color = __webpack_require__(7);
const Prompt = __webpack_require__(42);
const { style, clear } = __webpack_require__(43);
const { erase, cursor } = __webpack_require__(14);

/**
 * ConfirmPrompt Base Element
 * @param {Object} opts Options
 * @param {String} opts.message Message
 * @param {Boolean} [opts.initial] Default value (true/false)
 * @param {Stream} [opts.stdin] The Readable stream to listen to
 * @param {Stream} [opts.stdout] The Writable stream to write readline data to
 * @param {String} [opts.yes] The "Yes" label
 * @param {String} [opts.yesOption] The "Yes" option when choosing between yes/no
 * @param {String} [opts.no] The "No" label
 * @param {String} [opts.noOption] The "No" option when choosing between yes/no
 */
class ConfirmPrompt extends Prompt {
  constructor(opts={}) {
    super(opts);
    this.msg = opts.message;
    this.value = opts.initial;
    this.initialValue = !!opts.initial;
    this.yesMsg = opts.yes || 'yes';
    this.yesOption = opts.yesOption || '(Y/n)';
    this.noMsg = opts.no || 'no';
    this.noOption = opts.noOption || '(y/N)';
    this.render();
  }

  reset() {
    this.value = this.initialValue;
    this.fire();
    this.render();
  }

  abort() {
    this.done = this.aborted = true;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  submit() {
    this.value = this.value || false;
    this.done = true;
    this.aborted = false;
    this.fire();
    this.render();
    this.out.write('\n');
    this.close();
  }

  _(c, key) {
    if (c.toLowerCase() === 'y') {
      this.value = true;
      return this.submit();
    }
    if (c.toLowerCase() === 'n') {
      this.value = false;
      return this.submit();
    }
    return this.bell();
  }

  render() {
    if (this.closed) return;
    if (this.firstRender) this.out.write(cursor.hide);
    else this.out.write(clear(this.outputText));
    super.render();

    this.outputText = [
      style.symbol(this.done, this.aborted),
      color.bold(this.msg),
      style.delimiter(this.done),
      this.done ? (this.value ? this.yesMsg : this.noMsg)
          : color.gray(this.initialValue ? this.yesOption : this.noOption)
    ].join(' ');

    this.out.write(erase.line + cursor.to(0) + this.outputText);
  }
}

module.exports = ConfirmPrompt;


/***/ })
/******/ ]);
