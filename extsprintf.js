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

/*
 * extsprintf.js: extended POSIX-style sprintf
 */

var mod_assert = __webpack_require__(3);
var mod_util = __webpack_require__(4);

/*
 * Public interface
 */
exports.sprintf = jsSprintf;
exports.printf = jsPrintf;
exports.fprintf = jsFprintf;

/*
 * Stripped down version of s[n]printf(3c).  We make a best effort to throw an
 * exception when given a format string we don't understand, rather than
 * ignoring it, so that we won't break existing programs if/when we go implement
 * the rest of this.
 *
 * This implementation currently supports specifying
 *	- field alignment ('-' flag),
 * 	- zero-pad ('0' flag)
 *	- always show numeric sign ('+' flag),
 *	- field width
 *	- conversions for strings, decimal integers, and floats (numbers).
 *	- argument size specifiers.  These are all accepted but ignored, since
 *	  Javascript has no notion of the physical size of an argument.
 *
 * Everything else is currently unsupported, most notably precision, unsigned
 * numbers, non-decimal numbers, and characters.
 */
function jsSprintf(ofmt)
{
	var regex = [
	    '([^%]*)',				/* normal text */
	    '%',				/* start of format */
	    '([\'\\-+ #0]*?)',			/* flags (optional) */
	    '([1-9]\\d*)?',			/* width (optional) */
	    '(\\.([1-9]\\d*))?',		/* precision (optional) */
	    '[lhjztL]*?',			/* length mods (ignored) */
	    '([diouxXfFeEgGaAcCsSp%jr])'	/* conversion */
	].join('');

	var re = new RegExp(regex);

	/* variadic arguments used to fill in conversion specifiers */
	var args = Array.prototype.slice.call(arguments, 1);
	/* remaining format string */
	var fmt = ofmt;

	/* components of the current conversion specifier */
	var flags, width, precision, conversion;
	var left, pad, sign, arg, match;

	/* return value */
	var ret = '';

	/* current variadic argument (1-based) */
	var argn = 1;
	/* 0-based position in the format string that we've read */
	var posn = 0;
	/* 1-based position in the format string of the current conversion */
	var convposn;
	/* current conversion specifier */
	var curconv;

	mod_assert.equal('string', typeof (fmt),
	    'first argument must be a format string');

	while ((match = re.exec(fmt)) !== null) {
		ret += match[1];
		fmt = fmt.substring(match[0].length);

		/*
		 * Update flags related to the current conversion specifier's
		 * position so that we can report clear error messages.
		 */
		curconv = match[0].substring(match[1].length);
		convposn = posn + match[1].length + 1;
		posn += match[0].length;

		flags = match[2] || '';
		width = match[3] || 0;
		precision = match[4] || '';
		conversion = match[6];
		left = false;
		sign = false;
		pad = ' ';

		if (conversion == '%') {
			ret += '%';
			continue;
		}

		if (args.length === 0) {
			throw (jsError(ofmt, convposn, curconv,
			    'has no matching argument ' +
			    '(too few arguments passed)'));
		}

		arg = args.shift();
		argn++;

		if (flags.match(/[\' #]/)) {
			throw (jsError(ofmt, convposn, curconv,
			    'uses unsupported flags'));
		}

		if (precision.length > 0) {
			throw (jsError(ofmt, convposn, curconv,
			    'uses non-zero precision (not supported)'));
		}

		if (flags.match(/-/))
			left = true;

		if (flags.match(/0/))
			pad = '0';

		if (flags.match(/\+/))
			sign = true;

		switch (conversion) {
		case 's':
			if (arg === undefined || arg === null) {
				throw (jsError(ofmt, convposn, curconv,
				    'attempted to print undefined or null ' +
				    'as a string (argument ' + argn + ' to ' +
				    'sprintf)'));
			}
			ret += doPad(pad, width, left, arg.toString());
			break;

		case 'd':
			arg = Math.floor(arg);
			/*jsl:fallthru*/
		case 'f':
			sign = sign && arg > 0 ? '+' : '';
			ret += sign + doPad(pad, width, left,
			    arg.toString());
			break;

		case 'x':
			ret += doPad(pad, width, left, arg.toString(16));
			break;

		case 'j': /* non-standard */
			if (width === 0)
				width = 10;
			ret += mod_util.inspect(arg, false, width);
			break;

		case 'r': /* non-standard */
			ret += dumpException(arg);
			break;

		default:
			throw (jsError(ofmt, convposn, curconv,
			    'is not supported'));
		}
	}

	ret += fmt;
	return (ret);
}

function jsError(fmtstr, convposn, curconv, reason) {
	mod_assert.equal(typeof (fmtstr), 'string');
	mod_assert.equal(typeof (curconv), 'string');
	mod_assert.equal(typeof (convposn), 'number');
	mod_assert.equal(typeof (reason), 'string');
	return (new Error('format string "' + fmtstr +
	    '": conversion specifier "' + curconv + '" at character ' +
	    convposn + ' ' + reason));
}

function jsPrintf() {
	var args = Array.prototype.slice.call(arguments);
	args.unshift(process.stdout);
	jsFprintf.apply(null, args);
}

function jsFprintf(stream) {
	var args = Array.prototype.slice.call(arguments, 1);
	return (stream.write(jsSprintf.apply(this, args)));
}

function doPad(chr, width, left, str)
{
	var ret = str;

	while (ret.length < width) {
		if (left)
			ret += chr;
		else
			ret = chr + ret;
	}

	return (ret);
}

/*
 * This function dumps long stack traces for exceptions having a cause() method.
 * See node-verror for an example.
 */
function dumpException(ex)
{
	var ret;

	if (!(ex instanceof Error))
		throw (new Error(jsSprintf('invalid type for %%r: %j', ex)));

	/* Note that V8 prepends "ex.stack" with ex.toString(). */
	ret = 'EXCEPTION: ' + ex.constructor.name + ': ' + ex.stack;

	if (ex.cause && typeof (ex.cause) === 'function') {
		var cex = ex.cause();
		if (cex) {
			ret += '\nCaused by: ' + dumpException(cex);
		}
	}

	return (ret);
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })
/******/ ]);
