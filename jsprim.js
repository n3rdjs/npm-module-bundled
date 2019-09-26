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
 * lib/jsprim.js: utilities for primitive JavaScript types
 */

var mod_assert = __webpack_require__(3);
var mod_util = __webpack_require__(6);

var mod_extsprintf = __webpack_require__(7);
var mod_verror = __webpack_require__(8);
var mod_jsonschema = __webpack_require__(10);

/*
 * Public interface
 */
exports.deepCopy = deepCopy;
exports.deepEqual = deepEqual;
exports.isEmpty = isEmpty;
exports.hasKey = hasKey;
exports.forEachKey = forEachKey;
exports.pluck = pluck;
exports.flattenObject = flattenObject;
exports.flattenIter = flattenIter;
exports.validateJsonObject = validateJsonObjectJS;
exports.validateJsonObjectJS = validateJsonObjectJS;
exports.randElt = randElt;
exports.extraProperties = extraProperties;
exports.mergeObjects = mergeObjects;

exports.startsWith = startsWith;
exports.endsWith = endsWith;

exports.parseInteger = parseInteger;

exports.iso8601 = iso8601;
exports.rfc1123 = rfc1123;
exports.parseDateTime = parseDateTime;

exports.hrtimediff = hrtimeDiff;
exports.hrtimeDiff = hrtimeDiff;
exports.hrtimeAccum = hrtimeAccum;
exports.hrtimeAdd = hrtimeAdd;
exports.hrtimeNanosec = hrtimeNanosec;
exports.hrtimeMicrosec = hrtimeMicrosec;
exports.hrtimeMillisec = hrtimeMillisec;


/*
 * Deep copy an acyclic *basic* Javascript object.  This only handles basic
 * scalars (strings, numbers, booleans) and arbitrarily deep arrays and objects
 * containing these.  This does *not* handle instances of other classes.
 */
function deepCopy(obj)
{
	var ret, key;
	var marker = '__deepCopy';

	if (obj && obj[marker])
		throw (new Error('attempted deep copy of cyclic object'));

	if (obj && obj.constructor == Object) {
		ret = {};
		obj[marker] = true;

		for (key in obj) {
			if (key == marker)
				continue;

			ret[key] = deepCopy(obj[key]);
		}

		delete (obj[marker]);
		return (ret);
	}

	if (obj && obj.constructor == Array) {
		ret = [];
		obj[marker] = true;

		for (key = 0; key < obj.length; key++)
			ret.push(deepCopy(obj[key]));

		delete (obj[marker]);
		return (ret);
	}

	/*
	 * It must be a primitive type -- just return it.
	 */
	return (obj);
}

function deepEqual(obj1, obj2)
{
	if (typeof (obj1) != typeof (obj2))
		return (false);

	if (obj1 === null || obj2 === null || typeof (obj1) != 'object')
		return (obj1 === obj2);

	if (obj1.constructor != obj2.constructor)
		return (false);

	var k;
	for (k in obj1) {
		if (!(k in obj2))
			return (false);

		if (!deepEqual(obj1[k], obj2[k]))
			return (false);
	}

	for (k in obj2) {
		if (!(k in obj1))
			return (false);
	}

	return (true);
}

function isEmpty(obj)
{
	var key;
	for (key in obj)
		return (false);
	return (true);
}

function hasKey(obj, key)
{
	mod_assert.equal(typeof (key), 'string');
	return (Object.prototype.hasOwnProperty.call(obj, key));
}

function forEachKey(obj, callback)
{
	for (var key in obj) {
		if (hasKey(obj, key)) {
			callback(key, obj[key]);
		}
	}
}

function pluck(obj, key)
{
	mod_assert.equal(typeof (key), 'string');
	return (pluckv(obj, key));
}

function pluckv(obj, key)
{
	if (obj === null || typeof (obj) !== 'object')
		return (undefined);

	if (obj.hasOwnProperty(key))
		return (obj[key]);

	var i = key.indexOf('.');
	if (i == -1)
		return (undefined);

	var key1 = key.substr(0, i);
	if (!obj.hasOwnProperty(key1))
		return (undefined);

	return (pluckv(obj[key1], key.substr(i + 1)));
}

/*
 * Invoke callback(row) for each entry in the array that would be returned by
 * flattenObject(data, depth).  This is just like flattenObject(data,
 * depth).forEach(callback), except that the intermediate array is never
 * created.
 */
function flattenIter(data, depth, callback)
{
	doFlattenIter(data, depth, [], callback);
}

function doFlattenIter(data, depth, accum, callback)
{
	var each;
	var key;

	if (depth === 0) {
		each = accum.slice(0);
		each.push(data);
		callback(each);
		return;
	}

	mod_assert.ok(data !== null);
	mod_assert.equal(typeof (data), 'object');
	mod_assert.equal(typeof (depth), 'number');
	mod_assert.ok(depth >= 0);

	for (key in data) {
		each = accum.slice(0);
		each.push(key);
		doFlattenIter(data[key], depth - 1, each, callback);
	}
}

function flattenObject(data, depth)
{
	if (depth === 0)
		return ([ data ]);

	mod_assert.ok(data !== null);
	mod_assert.equal(typeof (data), 'object');
	mod_assert.equal(typeof (depth), 'number');
	mod_assert.ok(depth >= 0);

	var rv = [];
	var key;

	for (key in data) {
		flattenObject(data[key], depth - 1).forEach(function (p) {
			rv.push([ key ].concat(p));
		});
	}

	return (rv);
}

function startsWith(str, prefix)
{
	return (str.substr(0, prefix.length) == prefix);
}

function endsWith(str, suffix)
{
	return (str.substr(
	    str.length - suffix.length, suffix.length) == suffix);
}

function iso8601(d)
{
	if (typeof (d) == 'number')
		d = new Date(d);
	mod_assert.ok(d.constructor === Date);
	return (mod_extsprintf.sprintf('%4d-%02d-%02dT%02d:%02d:%02d.%03dZ',
	    d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate(),
	    d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(),
	    d.getUTCMilliseconds()));
}

var RFC1123_MONTHS = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var RFC1123_DAYS = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function rfc1123(date) {
	return (mod_extsprintf.sprintf('%s, %02d %s %04d %02d:%02d:%02d GMT',
	    RFC1123_DAYS[date.getUTCDay()], date.getUTCDate(),
	    RFC1123_MONTHS[date.getUTCMonth()], date.getUTCFullYear(),
	    date.getUTCHours(), date.getUTCMinutes(),
	    date.getUTCSeconds()));
}

/*
 * Parses a date expressed as a string, as either a number of milliseconds since
 * the epoch or any string format that Date accepts, giving preference to the
 * former where these two sets overlap (e.g., small numbers).
 */
function parseDateTime(str)
{
	/*
	 * This is irritatingly implicit, but significantly more concise than
	 * alternatives.  The "+str" will convert a string containing only a
	 * number directly to a Number, or NaN for other strings.  Thus, if the
	 * conversion succeeds, we use it (this is the milliseconds-since-epoch
	 * case).  Otherwise, we pass the string directly to the Date
	 * constructor to parse.
	 */
	var numeric = +str;
	if (!isNaN(numeric)) {
		return (new Date(numeric));
	} else {
		return (new Date(str));
	}
}


/*
 * Number.*_SAFE_INTEGER isn't present before node v0.12, so we hardcode
 * the ES6 definitions here, while allowing for them to someday be higher.
 */
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
var MIN_SAFE_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;


/*
 * Default options for parseInteger().
 */
var PI_DEFAULTS = {
	base: 10,
	allowSign: true,
	allowPrefix: false,
	allowTrailing: false,
	allowImprecise: false,
	trimWhitespace: false,
	leadingZeroIsOctal: false
};

var CP_0 = 0x30;
var CP_9 = 0x39;

var CP_A = 0x41;
var CP_B = 0x42;
var CP_O = 0x4f;
var CP_T = 0x54;
var CP_X = 0x58;
var CP_Z = 0x5a;

var CP_a = 0x61;
var CP_b = 0x62;
var CP_o = 0x6f;
var CP_t = 0x74;
var CP_x = 0x78;
var CP_z = 0x7a;

var PI_CONV_DEC = 0x30;
var PI_CONV_UC = 0x37;
var PI_CONV_LC = 0x57;


/*
 * A stricter version of parseInt() that provides options for changing what
 * is an acceptable string (for example, disallowing trailing characters).
 */
function parseInteger(str, uopts)
{
	mod_assert.string(str, 'str');
	mod_assert.optionalObject(uopts, 'options');

	var baseOverride = false;
	var options = PI_DEFAULTS;

	if (uopts) {
		baseOverride = hasKey(uopts, 'base');
		options = mergeObjects(options, uopts);
		mod_assert.number(options.base, 'options.base');
		mod_assert.ok(options.base >= 2, 'options.base >= 2');
		mod_assert.ok(options.base <= 36, 'options.base <= 36');
		mod_assert.bool(options.allowSign, 'options.allowSign');
		mod_assert.bool(options.allowPrefix, 'options.allowPrefix');
		mod_assert.bool(options.allowTrailing,
		    'options.allowTrailing');
		mod_assert.bool(options.allowImprecise,
		    'options.allowImprecise');
		mod_assert.bool(options.trimWhitespace,
		    'options.trimWhitespace');
		mod_assert.bool(options.leadingZeroIsOctal,
		    'options.leadingZeroIsOctal');

		if (options.leadingZeroIsOctal) {
			mod_assert.ok(!baseOverride,
			    '"base" and "leadingZeroIsOctal" are ' +
			    'mutually exclusive');
		}
	}

	var c;
	var pbase = -1;
	var base = options.base;
	var start;
	var mult = 1;
	var value = 0;
	var idx = 0;
	var len = str.length;

	/* Trim any whitespace on the left side. */
	if (options.trimWhitespace) {
		while (idx < len && isSpace(str.charCodeAt(idx))) {
			++idx;
		}
	}

	/* Check the number for a leading sign. */
	if (options.allowSign) {
		if (str[idx] === '-') {
			idx += 1;
			mult = -1;
		} else if (str[idx] === '+') {
			idx += 1;
		}
	}

	/* Parse the base-indicating prefix if there is one. */
	if (str[idx] === '0') {
		if (options.allowPrefix) {
			pbase = prefixToBase(str.charCodeAt(idx + 1));
			if (pbase !== -1 && (!baseOverride || pbase === base)) {
				base = pbase;
				idx += 2;
			}
		}

		if (pbase === -1 && options.leadingZeroIsOctal) {
			base = 8;
		}
	}

	/* Parse the actual digits. */
	for (start = idx; idx < len; ++idx) {
		c = translateDigit(str.charCodeAt(idx));
		if (c !== -1 && c < base) {
			value *= base;
			value += c;
		} else {
			break;
		}
	}

	/* If we didn't parse any digits, we have an invalid number. */
	if (start === idx) {
		return (new Error('invalid number: ' + JSON.stringify(str)));
	}

	/* Trim any whitespace on the right side. */
	if (options.trimWhitespace) {
		while (idx < len && isSpace(str.charCodeAt(idx))) {
			++idx;
		}
	}

	/* Check for trailing characters. */
	if (idx < len && !options.allowTrailing) {
		return (new Error('trailing characters after number: ' +
		    JSON.stringify(str.slice(idx))));
	}

	/* If our value is 0, we return now, to avoid returning -0. */
	if (value === 0) {
		return (0);
	}

	/* Calculate our final value. */
	var result = value * mult;

	/*
	 * If the string represents a value that cannot be precisely represented
	 * by JavaScript, then we want to check that:
	 *
	 * - We never increased the value past MAX_SAFE_INTEGER
	 * - We don't make the result negative and below MIN_SAFE_INTEGER
	 *
	 * Because we only ever increment the value during parsing, there's no
	 * chance of moving past MAX_SAFE_INTEGER and then dropping below it
	 * again, losing precision in the process. This means that we only need
	 * to do our checks here, at the end.
	 */
	if (!options.allowImprecise &&
	    (value > MAX_SAFE_INTEGER || result < MIN_SAFE_INTEGER)) {
		return (new Error('number is outside of the supported range: ' +
		    JSON.stringify(str.slice(start, idx))));
	}

	return (result);
}


/*
 * Interpret a character code as a base-36 digit.
 */
function translateDigit(d)
{
	if (d >= CP_0 && d <= CP_9) {
		/* '0' to '9' -> 0 to 9 */
		return (d - PI_CONV_DEC);
	} else if (d >= CP_A && d <= CP_Z) {
		/* 'A' - 'Z' -> 10 to 35 */
		return (d - PI_CONV_UC);
	} else if (d >= CP_a && d <= CP_z) {
		/* 'a' - 'z' -> 10 to 35 */
		return (d - PI_CONV_LC);
	} else {
		/* Invalid character code */
		return (-1);
	}
}


/*
 * Test if a value matches the ECMAScript definition of trimmable whitespace.
 */
function isSpace(c)
{
	return (c === 0x20) ||
	    (c >= 0x0009 && c <= 0x000d) ||
	    (c === 0x00a0) ||
	    (c === 0x1680) ||
	    (c === 0x180e) ||
	    (c >= 0x2000 && c <= 0x200a) ||
	    (c === 0x2028) ||
	    (c === 0x2029) ||
	    (c === 0x202f) ||
	    (c === 0x205f) ||
	    (c === 0x3000) ||
	    (c === 0xfeff);
}


/*
 * Determine which base a character indicates (e.g., 'x' indicates hex).
 */
function prefixToBase(c)
{
	if (c === CP_b || c === CP_B) {
		/* 0b/0B (binary) */
		return (2);
	} else if (c === CP_o || c === CP_O) {
		/* 0o/0O (octal) */
		return (8);
	} else if (c === CP_t || c === CP_T) {
		/* 0t/0T (decimal) */
		return (10);
	} else if (c === CP_x || c === CP_X) {
		/* 0x/0X (hexadecimal) */
		return (16);
	} else {
		/* Not a meaningful character */
		return (-1);
	}
}


function validateJsonObjectJS(schema, input)
{
	var report = mod_jsonschema.validate(input, schema);

	if (report.errors.length === 0)
		return (null);

	/* Currently, we only do anything useful with the first error. */
	var error = report.errors[0];

	/* The failed property is given by a URI with an irrelevant prefix. */
	var propname = error['property'];
	var reason = error['message'].toLowerCase();
	var i, j;

	/*
	 * There's at least one case where the property error message is
	 * confusing at best.  We work around this here.
	 */
	if ((i = reason.indexOf('the property ')) != -1 &&
	    (j = reason.indexOf(' is not defined in the schema and the ' +
	    'schema does not allow additional properties')) != -1) {
		i += 'the property '.length;
		if (propname === '')
			propname = reason.substr(i, j - i);
		else
			propname = propname + '.' + reason.substr(i, j - i);

		reason = 'unsupported property';
	}

	var rv = new mod_verror.VError('property "%s": %s', propname, reason);
	rv.jsv_details = error;
	return (rv);
}

function randElt(arr)
{
	mod_assert.ok(Array.isArray(arr) && arr.length > 0,
	    'randElt argument must be a non-empty array');

	return (arr[Math.floor(Math.random() * arr.length)]);
}

function assertHrtime(a)
{
	mod_assert.ok(a[0] >= 0 && a[1] >= 0,
	    'negative numbers not allowed in hrtimes');
	mod_assert.ok(a[1] < 1e9, 'nanoseconds column overflow');
}

/*
 * Compute the time elapsed between hrtime readings A and B, where A is later
 * than B.  hrtime readings come from Node's process.hrtime().  There is no
 * defined way to represent negative deltas, so it's illegal to diff B from A
 * where the time denoted by B is later than the time denoted by A.  If this
 * becomes valuable, we can define a representation and extend the
 * implementation to support it.
 */
function hrtimeDiff(a, b)
{
	assertHrtime(a);
	assertHrtime(b);
	mod_assert.ok(a[0] > b[0] || (a[0] == b[0] && a[1] >= b[1]),
	    'negative differences not allowed');

	var rv = [ a[0] - b[0], 0 ];

	if (a[1] >= b[1]) {
		rv[1] = a[1] - b[1];
	} else {
		rv[0]--;
		rv[1] = 1e9 - (b[1] - a[1]);
	}

	return (rv);
}

/*
 * Convert a hrtime reading from the array format returned by Node's
 * process.hrtime() into a scalar number of nanoseconds.
 */
function hrtimeNanosec(a)
{
	assertHrtime(a);

	return (Math.floor(a[0] * 1e9 + a[1]));
}

/*
 * Convert a hrtime reading from the array format returned by Node's
 * process.hrtime() into a scalar number of microseconds.
 */
function hrtimeMicrosec(a)
{
	assertHrtime(a);

	return (Math.floor(a[0] * 1e6 + a[1] / 1e3));
}

/*
 * Convert a hrtime reading from the array format returned by Node's
 * process.hrtime() into a scalar number of milliseconds.
 */
function hrtimeMillisec(a)
{
	assertHrtime(a);

	return (Math.floor(a[0] * 1e3 + a[1] / 1e6));
}

/*
 * Add two hrtime readings A and B, overwriting A with the result of the
 * addition.  This function is useful for accumulating several hrtime intervals
 * into a counter.  Returns A.
 */
function hrtimeAccum(a, b)
{
	assertHrtime(a);
	assertHrtime(b);

	/*
	 * Accumulate the nanosecond component.
	 */
	a[1] += b[1];
	if (a[1] >= 1e9) {
		/*
		 * The nanosecond component overflowed, so carry to the seconds
		 * field.
		 */
		a[0]++;
		a[1] -= 1e9;
	}

	/*
	 * Accumulate the seconds component.
	 */
	a[0] += b[0];

	return (a);
}

/*
 * Add two hrtime readings A and B, returning the result as a new hrtime array.
 * Does not modify either input argument.
 */
function hrtimeAdd(a, b)
{
	assertHrtime(a);

	var rv = [ a[0], a[1] ];

	return (hrtimeAccum(rv, b));
}


/*
 * Check an object for unexpected properties.  Accepts the object to check, and
 * an array of allowed property names (strings).  Returns an array of key names
 * that were found on the object, but did not appear in the list of allowed
 * properties.  If no properties were found, the returned array will be of
 * zero length.
 */
function extraProperties(obj, allowed)
{
	mod_assert.ok(typeof (obj) === 'object' && obj !== null,
	    'obj argument must be a non-null object');
	mod_assert.ok(Array.isArray(allowed),
	    'allowed argument must be an array of strings');
	for (var i = 0; i < allowed.length; i++) {
		mod_assert.ok(typeof (allowed[i]) === 'string',
		    'allowed argument must be an array of strings');
	}

	return (Object.keys(obj).filter(function (key) {
		return (allowed.indexOf(key) === -1);
	}));
}

/*
 * Given three sets of properties "provided" (may be undefined), "overrides"
 * (required), and "defaults" (may be undefined), construct an object containing
 * the union of these sets with "overrides" overriding "provided", and
 * "provided" overriding "defaults".  None of the input objects are modified.
 */
function mergeObjects(provided, overrides, defaults)
{
	var rv, k;

	rv = {};
	if (defaults) {
		for (k in defaults)
			rv[k] = defaults[k];
	}

	if (provided) {
		for (k in provided)
			rv[k] = provided[k];
	}

	if (overrides) {
		for (k in overrides)
			rv[k] = overrides[k];
	}

	return (rv);
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright (c) 2012, Mark Cavage. All rights reserved.
// Copyright 2015 Joyent, Inc.

var assert = __webpack_require__(4);
var Stream = __webpack_require__(5).Stream;
var util = __webpack_require__(6);


///--- Globals

/* JSSTYLED */
var UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$/;


///--- Internal

function _capitalize(str) {
    return (str.charAt(0).toUpperCase() + str.slice(1));
}

function _toss(name, expected, oper, arg, actual) {
    throw new assert.AssertionError({
        message: util.format('%s (%s) is required', name, expected),
        actual: (actual === undefined) ? typeof (arg) : actual(arg),
        expected: expected,
        operator: oper || '===',
        stackStartFunction: _toss.caller
    });
}

function _getClass(arg) {
    return (Object.prototype.toString.call(arg).slice(8, -1));
}

function noop() {
    // Why even bother with asserts?
}


///--- Exports

var types = {
    bool: {
        check: function (arg) { return typeof (arg) === 'boolean'; }
    },
    func: {
        check: function (arg) { return typeof (arg) === 'function'; }
    },
    string: {
        check: function (arg) { return typeof (arg) === 'string'; }
    },
    object: {
        check: function (arg) {
            return typeof (arg) === 'object' && arg !== null;
        }
    },
    number: {
        check: function (arg) {
            return typeof (arg) === 'number' && !isNaN(arg);
        }
    },
    finite: {
        check: function (arg) {
            return typeof (arg) === 'number' && !isNaN(arg) && isFinite(arg);
        }
    },
    buffer: {
        check: function (arg) { return Buffer.isBuffer(arg); },
        operator: 'Buffer.isBuffer'
    },
    array: {
        check: function (arg) { return Array.isArray(arg); },
        operator: 'Array.isArray'
    },
    stream: {
        check: function (arg) { return arg instanceof Stream; },
        operator: 'instanceof',
        actual: _getClass
    },
    date: {
        check: function (arg) { return arg instanceof Date; },
        operator: 'instanceof',
        actual: _getClass
    },
    regexp: {
        check: function (arg) { return arg instanceof RegExp; },
        operator: 'instanceof',
        actual: _getClass
    },
    uuid: {
        check: function (arg) {
            return typeof (arg) === 'string' && UUID_REGEXP.test(arg);
        },
        operator: 'isUUID'
    }
};

function _setExports(ndebug) {
    var keys = Object.keys(types);
    var out;

    /* re-export standard assert */
    if (process.env.NODE_NDEBUG) {
        out = noop;
    } else {
        out = function (arg, msg) {
            if (!arg) {
                _toss(msg, 'true', arg);
            }
        };
    }

    /* standard checks */
    keys.forEach(function (k) {
        if (ndebug) {
            out[k] = noop;
            return;
        }
        var type = types[k];
        out[k] = function (arg, msg) {
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* optional checks */
    keys.forEach(function (k) {
        var name = 'optional' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        out[name] = function (arg, msg) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!type.check(arg)) {
                _toss(msg, k, type.operator, arg, type.actual);
            }
        };
    });

    /* arrayOf checks */
    keys.forEach(function (k) {
        var name = 'arrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        var expected = '[' + k + ']';
        out[name] = function (arg, msg) {
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* optionalArrayOf checks */
    keys.forEach(function (k) {
        var name = 'optionalArrayOf' + _capitalize(k);
        if (ndebug) {
            out[name] = noop;
            return;
        }
        var type = types[k];
        var expected = '[' + k + ']';
        out[name] = function (arg, msg) {
            if (arg === undefined || arg === null) {
                return;
            }
            if (!Array.isArray(arg)) {
                _toss(msg, expected, type.operator, arg, type.actual);
            }
            var i;
            for (i = 0; i < arg.length; i++) {
                if (!type.check(arg[i])) {
                    _toss(msg, expected, type.operator, arg, type.actual);
                }
            }
        };
    });

    /* re-export built-in assertions */
    Object.keys(assert).forEach(function (k) {
        if (k === 'AssertionError') {
            out[k] = assert[k];
            return;
        }
        if (ndebug) {
            out[k] = noop;
            return;
        }
        out[k] = assert[k];
    });

    /* export ourselves (for unit tests _only_) */
    out._setExports = _setExports;

    return out;
}

module.exports = _setExports(process.env.NODE_NDEBUG);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * extsprintf.js: extended POSIX-style sprintf
 */

var mod_assert = __webpack_require__(4);
var mod_util = __webpack_require__(6);

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
function jsSprintf(fmt)
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
	var args = Array.prototype.slice.call(arguments, 1);
	var flags, width, precision, conversion;
	var left, pad, sign, arg, match;
	var ret = '';
	var argn = 1;

	mod_assert.equal('string', typeof (fmt));

	while ((match = re.exec(fmt)) !== null) {
		ret += match[1];
		fmt = fmt.substring(match[0].length);

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

		if (args.length === 0)
			throw (new Error('too few args to sprintf'));

		arg = args.shift();
		argn++;

		if (flags.match(/[\' #]/))
			throw (new Error(
			    'unsupported flags: ' + flags));

		if (precision.length > 0)
			throw (new Error(
			    'non-zero precision not supported'));

		if (flags.match(/-/))
			left = true;

		if (flags.match(/0/))
			pad = '0';

		if (flags.match(/\+/))
			sign = true;

		switch (conversion) {
		case 's':
			if (arg === undefined || arg === null)
				throw (new Error('argument ' + argn +
				    ': attempted to print undefined or null ' +
				    'as a string'));
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
			throw (new Error('unsupported conversion: ' +
			    conversion));
		}
	}

	ret += fmt;
	return (ret);
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * verror.js: richer JavaScript errors
 */

var mod_assertplus = __webpack_require__(3);
var mod_util = __webpack_require__(6);

var mod_extsprintf = __webpack_require__(7);
var mod_isError = __webpack_require__(9).isError;
var sprintf = mod_extsprintf.sprintf;

/*
 * Public interface
 */

/* So you can 'var VError = require('verror')' */
module.exports = VError;
/* For compatibility */
VError.VError = VError;
/* Other exported classes */
VError.SError = SError;
VError.WError = WError;
VError.MultiError = MultiError;

/*
 * Common function used to parse constructor arguments for VError, WError, and
 * SError.  Named arguments to this function:
 *
 *     strict		force strict interpretation of sprintf arguments, even
 *     			if the options in "argv" don't say so
 *
 *     argv		error's constructor arguments, which are to be
 *     			interpreted as described in README.md.  For quick
 *     			reference, "argv" has one of the following forms:
 *
 *          [ sprintf_args... ]           (argv[0] is a string)
 *          [ cause, sprintf_args... ]    (argv[0] is an Error)
 *          [ options, sprintf_args... ]  (argv[0] is an object)
 *
 * This function normalizes these forms, producing an object with the following
 * properties:
 *
 *    options           equivalent to "options" in third form.  This will never
 *    			be a direct reference to what the caller passed in
 *    			(i.e., it may be a shallow copy), so it can be freely
 *    			modified.
 *
 *    shortmessage      result of sprintf(sprintf_args), taking options.strict
 *    			into account as described in README.md.
 */
function parseConstructorArguments(args)
{
	var argv, options, sprintf_args, shortmessage, k;

	mod_assertplus.object(args, 'args');
	mod_assertplus.bool(args.strict, 'args.strict');
	mod_assertplus.array(args.argv, 'args.argv');
	argv = args.argv;

	/*
	 * First, figure out which form of invocation we've been given.
	 */
	if (argv.length === 0) {
		options = {};
		sprintf_args = [];
	} else if (mod_isError(argv[0])) {
		options = { 'cause': argv[0] };
		sprintf_args = argv.slice(1);
	} else if (typeof (argv[0]) === 'object') {
		options = {};
		for (k in argv[0]) {
			options[k] = argv[0][k];
		}
		sprintf_args = argv.slice(1);
	} else {
		mod_assertplus.string(argv[0],
		    'first argument to VError, SError, or WError ' +
		    'constructor must be a string, object, or Error');
		options = {};
		sprintf_args = argv;
	}

	/*
	 * Now construct the error's message.
	 *
	 * extsprintf (which we invoke here with our caller's arguments in order
	 * to construct this Error's message) is strict in its interpretation of
	 * values to be processed by the "%s" specifier.  The value passed to
	 * extsprintf must actually be a string or something convertible to a
	 * String using .toString().  Passing other values (notably "null" and
	 * "undefined") is considered a programmer error.  The assumption is
	 * that if you actually want to print the string "null" or "undefined",
	 * then that's easy to do that when you're calling extsprintf; on the
	 * other hand, if you did NOT want that (i.e., there's actually a bug
	 * where the program assumes some variable is non-null and tries to
	 * print it, which might happen when constructing a packet or file in
	 * some specific format), then it's better to stop immediately than
	 * produce bogus output.
	 *
	 * However, sometimes the bug is only in the code calling VError, and a
	 * programmer might prefer to have the error message contain "null" or
	 * "undefined" rather than have the bug in the error path crash the
	 * program (making the first bug harder to identify).  For that reason,
	 * by default VError converts "null" or "undefined" arguments to their
	 * string representations and passes those to extsprintf.  Programmers
	 * desiring the strict behavior can use the SError class or pass the
	 * "strict" option to the VError constructor.
	 */
	mod_assertplus.object(options);
	if (!options.strict && !args.strict) {
		sprintf_args = sprintf_args.map(function (a) {
			return (a === null ? 'null' :
			    a === undefined ? 'undefined' : a);
		});
	}

	if (sprintf_args.length === 0) {
		shortmessage = '';
	} else {
		shortmessage = sprintf.apply(null, sprintf_args);
	}

	return ({
	    'options': options,
	    'shortmessage': shortmessage
	});
}

/*
 * See README.md for reference documentation.
 */
function VError()
{
	var args, obj, parsed, cause, ctor, message, k;

	args = Array.prototype.slice.call(arguments, 0);

	/*
	 * This is a regrettable pattern, but JavaScript's built-in Error class
	 * is defined to work this way, so we allow the constructor to be called
	 * without "new".
	 */
	if (!(this instanceof VError)) {
		obj = Object.create(VError.prototype);
		VError.apply(obj, arguments);
		return (obj);
	}

	/*
	 * For convenience and backwards compatibility, we support several
	 * different calling forms.  Normalize them here.
	 */
	parsed = parseConstructorArguments({
	    'argv': args,
	    'strict': false
	});

	/*
	 * If we've been given a name, apply it now.
	 */
	if (parsed.options.name) {
		mod_assertplus.string(parsed.options.name,
		    'error\'s "name" must be a string');
		this.name = parsed.options.name;
	}

	/*
	 * For debugging, we keep track of the original short message (attached
	 * this Error particularly) separately from the complete message (which
	 * includes the messages of our cause chain).
	 */
	this.jse_shortmsg = parsed.shortmessage;
	message = parsed.shortmessage;

	/*
	 * If we've been given a cause, record a reference to it and update our
	 * message appropriately.
	 */
	cause = parsed.options.cause;
	if (cause) {
		mod_assertplus.ok(mod_isError(cause), 'cause is not an Error');
		this.jse_cause = cause;

		if (!parsed.options.skipCauseMessage) {
			message += ': ' + cause.message;
		}
	}

	/*
	 * If we've been given an object with properties, shallow-copy that
	 * here.  We don't want to use a deep copy in case there are non-plain
	 * objects here, but we don't want to use the original object in case
	 * the caller modifies it later.
	 */
	this.jse_info = {};
	if (parsed.options.info) {
		for (k in parsed.options.info) {
			this.jse_info[k] = parsed.options.info[k];
		}
	}

	this.message = message;
	Error.call(this, message);

	if (Error.captureStackTrace) {
		ctor = parsed.options.constructorOpt || this.constructor;
		Error.captureStackTrace(this, ctor);
	}

	return (this);
}

mod_util.inherits(VError, Error);
VError.prototype.name = 'VError';

VError.prototype.toString = function ve_toString()
{
	var str = (this.hasOwnProperty('name') && this.name ||
		this.constructor.name || this.constructor.prototype.name);
	if (this.message)
		str += ': ' + this.message;

	return (str);
};

/*
 * This method is provided for compatibility.  New callers should use
 * VError.cause() instead.  That method also uses the saner `null` return value
 * when there is no cause.
 */
VError.prototype.cause = function ve_cause()
{
	var cause = VError.cause(this);
	return (cause === null ? undefined : cause);
};

/*
 * Static methods
 *
 * These class-level methods are provided so that callers can use them on
 * instances of Errors that are not VErrors.  New interfaces should be provided
 * only using static methods to eliminate the class of programming mistake where
 * people fail to check whether the Error object has the corresponding methods.
 */

VError.cause = function (err)
{
	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	return (mod_isError(err.jse_cause) ? err.jse_cause : null);
};

VError.info = function (err)
{
	var rv, cause, k;

	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	cause = VError.cause(err);
	if (cause !== null) {
		rv = VError.info(cause);
	} else {
		rv = {};
	}

	if (typeof (err.jse_info) == 'object' && err.jse_info !== null) {
		for (k in err.jse_info) {
			rv[k] = err.jse_info[k];
		}
	}

	return (rv);
};

VError.findCauseByName = function (err, name)
{
	var cause;

	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	mod_assertplus.string(name, 'name');
	mod_assertplus.ok(name.length > 0, 'name cannot be empty');

	for (cause = err; cause !== null; cause = VError.cause(cause)) {
		mod_assertplus.ok(mod_isError(cause));
		if (cause.name == name) {
			return (cause);
		}
	}

	return (null);
};

VError.hasCauseWithName = function (err, name)
{
	return (VError.findCauseByName(err, name) !== null);
};

VError.fullStack = function (err)
{
	mod_assertplus.ok(mod_isError(err), 'err must be an Error');

	var cause = VError.cause(err);

	if (cause) {
		return (err.stack + '\ncaused by: ' + VError.fullStack(cause));
	}

	return (err.stack);
};

VError.errorFromList = function (errors)
{
	mod_assertplus.arrayOfObject(errors, 'errors');

	if (errors.length === 0) {
		return (null);
	}

	errors.forEach(function (e) {
		mod_assertplus.ok(mod_isError(e));
	});

	if (errors.length == 1) {
		return (errors[0]);
	}

	return (new MultiError(errors));
};

VError.errorForEach = function (err, func)
{
	mod_assertplus.ok(mod_isError(err), 'err must be an Error');
	mod_assertplus.func(func, 'func');

	if (err instanceof MultiError) {
		err.errors().forEach(function iterError(e) { func(e); });
	} else {
		func(err);
	}
};


/*
 * SError is like VError, but stricter about types.  You cannot pass "null" or
 * "undefined" as string arguments to the formatter.
 */
function SError()
{
	var args, obj, parsed, options;

	args = Array.prototype.slice.call(arguments, 0);
	if (!(this instanceof SError)) {
		obj = Object.create(SError.prototype);
		SError.apply(obj, arguments);
		return (obj);
	}

	parsed = parseConstructorArguments({
	    'argv': args,
	    'strict': true
	});

	options = parsed.options;
	VError.call(this, options, '%s', parsed.shortmessage);

	return (this);
}

/*
 * We don't bother setting SError.prototype.name because once constructed,
 * SErrors are just like VErrors.
 */
mod_util.inherits(SError, VError);


/*
 * Represents a collection of errors for the purpose of consumers that generally
 * only deal with one error.  Callers can extract the individual errors
 * contained in this object, but may also just treat it as a normal single
 * error, in which case a summary message will be printed.
 */
function MultiError(errors)
{
	mod_assertplus.array(errors, 'list of errors');
	mod_assertplus.ok(errors.length > 0, 'must be at least one error');
	this.ase_errors = errors;

	VError.call(this, {
	    'cause': errors[0]
	}, 'first of %d error%s', errors.length, errors.length == 1 ? '' : 's');
}

mod_util.inherits(MultiError, VError);
MultiError.prototype.name = 'MultiError';

MultiError.prototype.errors = function me_errors()
{
	return (this.ase_errors.slice(0));
};


/*
 * See README.md for reference details.
 */
function WError()
{
	var args, obj, parsed, options;

	args = Array.prototype.slice.call(arguments, 0);
	if (!(this instanceof WError)) {
		obj = Object.create(WError.prototype);
		WError.apply(obj, args);
		return (obj);
	}

	parsed = parseConstructorArguments({
	    'argv': args,
	    'strict': false
	});

	options = parsed.options;
	options['skipCauseMessage'] = true;
	VError.call(this, options, '%s', parsed.shortmessage);

	return (this);
}

mod_util.inherits(WError, VError);
WError.prototype.name = 'WError';

WError.prototype.toString = function we_toString()
{
	var str = (this.hasOwnProperty('name') && this.name ||
		this.constructor.name || this.constructor.prototype.name);
	if (this.message)
		str += ': ' + this.message;
	if (this.jse_cause && this.jse_cause.message)
		str += '; caused by ' + this.jse_cause.toString();

	return (str);
};

/*
 * For purely historical reasons, WError's cause() function allows you to set
 * the cause.
 */
WError.prototype.cause = function we_cause(c)
{
	if (mod_isError(c))
		this.jse_cause = c;

	return (this.jse_cause);
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * JSONSchema Validator - Validates JavaScript objects using JSON Schemas
 *	(http://www.json.com/json-schema-proposal/)
 *
 * Copyright (c) 2007 Kris Zyp SitePen (www.sitepen.com)
 * Licensed under the MIT (MIT-LICENSE.txt) license.
To use the validator call the validate function with an instance object and an optional schema object.
If a schema is provided, it will be used to validate. If the instance object refers to a schema (self-validating),
that schema will be used to validate and the schema parameter is not necessary (if both exist,
both validations will occur).
The validate method will return an array of validation errors. If there are no errors, then an
empty list will be returned. A validation error will have two properties:
"property" which indicates which property had the error
"message" which indicates what the error was
 */
(function (root, factory) {
    if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
            return factory();
        }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(this, function () {// setup primitive classes to be JSON Schema types
var exports = validate
exports.Integer = {type:"integer"};
var primitiveConstructors = {
	String: String,
	Boolean: Boolean,
	Number: Number,
	Object: Object,
	Array: Array,
	Date: Date
}
exports.validate = validate;
function validate(/*Any*/instance,/*Object*/schema) {
		// Summary:
		//  	To use the validator call JSONSchema.validate with an instance object and an optional schema object.
		// 		If a schema is provided, it will be used to validate. If the instance object refers to a schema (self-validating),
		// 		that schema will be used to validate and the schema parameter is not necessary (if both exist,
		// 		both validations will occur).
		// 		The validate method will return an object with two properties:
		// 			valid: A boolean indicating if the instance is valid by the schema
		// 			errors: An array of validation errors. If there are no errors, then an
		// 					empty list will be returned. A validation error will have two properties:
		// 						property: which indicates which property had the error
		// 						message: which indicates what the error was
		//
		return validate(instance, schema, {changing: false});//, coerce: false, existingOnly: false});
	};
exports.checkPropertyChange = function(/*Any*/value,/*Object*/schema, /*String*/property) {
		// Summary:
		// 		The checkPropertyChange method will check to see if an value can legally be in property with the given schema
		// 		This is slightly different than the validate method in that it will fail if the schema is readonly and it will
		// 		not check for self-validation, it is assumed that the passed in value is already internally valid.
		// 		The checkPropertyChange method will return the same object type as validate, see JSONSchema.validate for
		// 		information.
		//
		return validate(value, schema, {changing: property || "property"});
	};
var validate = exports._validate = function(/*Any*/instance,/*Object*/schema,/*Object*/options) {

	if (!options) options = {};
	var _changing = options.changing;

	function getType(schema){
		return schema.type || (primitiveConstructors[schema.name] == schema && schema.name.toLowerCase());
	}
	var errors = [];
	// validate a value against a property definition
	function checkProp(value, schema, path,i){

		var l;
		path += path ? typeof i == 'number' ? '[' + i + ']' : typeof i == 'undefined' ? '' : '.' + i : i;
		function addError(message){
			errors.push({property:path,message:message});
		}

		if((typeof schema != 'object' || schema instanceof Array) && (path || typeof schema != 'function') && !(schema && getType(schema))){
			if(typeof schema == 'function'){
				if(!(value instanceof schema)){
					addError("is not an instance of the class/constructor " + schema.name);
				}
			}else if(schema){
				addError("Invalid schema/property definition " + schema);
			}
			return null;
		}
		if(_changing && schema.readonly){
			addError("is a readonly field, it can not be changed");
		}
		if(schema['extends']){ // if it extends another schema, it must pass that schema as well
			checkProp(value,schema['extends'],path,i);
		}
		// validate a value against a type definition
		function checkType(type,value){
			if(type){
				if(typeof type == 'string' && type != 'any' &&
						(type == 'null' ? value !== null : typeof value != type) &&
						!(value instanceof Array && type == 'array') &&
						!(value instanceof Date && type == 'date') &&
						!(type == 'integer' && value%1===0)){
					return [{property:path,message:(typeof value) + " value found, but a " + type + " is required"}];
				}
				if(type instanceof Array){
					var unionErrors=[];
					for(var j = 0; j < type.length; j++){ // a union type
						if(!(unionErrors=checkType(type[j],value)).length){
							break;
						}
					}
					if(unionErrors.length){
						return unionErrors;
					}
				}else if(typeof type == 'object'){
					var priorErrors = errors;
					errors = [];
					checkProp(value,type,path);
					var theseErrors = errors;
					errors = priorErrors;
					return theseErrors;
				}
			}
			return [];
		}
		if(value === undefined){
			if(schema.required){
				addError("is missing and it is required");
			}
		}else{
			errors = errors.concat(checkType(getType(schema),value));
			if(schema.disallow && !checkType(schema.disallow,value).length){
				addError(" disallowed value was matched");
			}
			if(value !== null){
				if(value instanceof Array){
					if(schema.items){
						var itemsIsArray = schema.items instanceof Array;
						var propDef = schema.items;
						for (i = 0, l = value.length; i < l; i += 1) {
							if (itemsIsArray)
								propDef = schema.items[i];
							if (options.coerce)
								value[i] = options.coerce(value[i], propDef);
							errors.concat(checkProp(value[i],propDef,path,i));
						}
					}
					if(schema.minItems && value.length < schema.minItems){
						addError("There must be a minimum of " + schema.minItems + " in the array");
					}
					if(schema.maxItems && value.length > schema.maxItems){
						addError("There must be a maximum of " + schema.maxItems + " in the array");
					}
				}else if(schema.properties || schema.additionalProperties){
					errors.concat(checkObj(value, schema.properties, path, schema.additionalProperties));
				}
				if(schema.pattern && typeof value == 'string' && !value.match(schema.pattern)){
					addError("does not match the regex pattern " + schema.pattern);
				}
				if(schema.maxLength && typeof value == 'string' && value.length > schema.maxLength){
					addError("may only be " + schema.maxLength + " characters long");
				}
				if(schema.minLength && typeof value == 'string' && value.length < schema.minLength){
					addError("must be at least " + schema.minLength + " characters long");
				}
				if(typeof schema.minimum !== undefined && typeof value == typeof schema.minimum &&
						schema.minimum > value){
					addError("must have a minimum value of " + schema.minimum);
				}
				if(typeof schema.maximum !== undefined && typeof value == typeof schema.maximum &&
						schema.maximum < value){
					addError("must have a maximum value of " + schema.maximum);
				}
				if(schema['enum']){
					var enumer = schema['enum'];
					l = enumer.length;
					var found;
					for(var j = 0; j < l; j++){
						if(enumer[j]===value){
							found=1;
							break;
						}
					}
					if(!found){
						addError("does not have a value in the enumeration " + enumer.join(", "));
					}
				}
				if(typeof schema.maxDecimal == 'number' &&
					(value.toString().match(new RegExp("\\.[0-9]{" + (schema.maxDecimal + 1) + ",}")))){
					addError("may only have " + schema.maxDecimal + " digits of decimal places");
				}
			}
		}
		return null;
	}
	// validate an object against a schema
	function checkObj(instance,objTypeDef,path,additionalProp){

		if(typeof objTypeDef =='object'){
			if(typeof instance != 'object' || instance instanceof Array){
				errors.push({property:path,message:"an object is required"});
			}
			
			for(var i in objTypeDef){ 
				if(objTypeDef.hasOwnProperty(i)){
					var value = instance[i];
					// skip _not_ specified properties
					if (value === undefined && options.existingOnly) continue;
					var propDef = objTypeDef[i];
					// set default
					if(value === undefined && propDef["default"]){
						value = instance[i] = propDef["default"];
					}
					if(options.coerce && i in instance){
						value = instance[i] = options.coerce(value, propDef);
					}
					checkProp(value,propDef,path,i);
				}
			}
		}
		for(i in instance){
			if(instance.hasOwnProperty(i) && !(i.charAt(0) == '_' && i.charAt(1) == '_') && objTypeDef && !objTypeDef[i] && additionalProp===false){
				if (options.filter) {
					delete instance[i];
					continue;
				} else {
					errors.push({property:path,message:(typeof value) + "The property " + i +
						" is not defined in the schema and the schema does not allow additional properties"});
				}
			}
			var requires = objTypeDef && objTypeDef[i] && objTypeDef[i].requires;
			if(requires && !(requires in instance)){
				errors.push({property:path,message:"the presence of the property " + i + " requires that " + requires + " also be present"});
			}
			value = instance[i];
			if(additionalProp && (!(objTypeDef && typeof objTypeDef == 'object') || !(i in objTypeDef))){
				if(options.coerce){
					value = instance[i] = options.coerce(value, additionalProp);
				}
				checkProp(value,additionalProp,path,i);
			}
			if(!_changing && value && value.$schema){
				errors = errors.concat(checkProp(value,value.$schema,path,i));
			}
		}
		return errors;
	}
	if(schema){
		checkProp(instance,schema,'',_changing || '');
	}
	if(!_changing && instance && instance.$schema){
		checkProp(instance,instance.$schema,'','');
	}
	return {valid:!errors.length,errors:errors};
};
exports.mustBeValid = function(result){
	//	summary:
	//		This checks to ensure that the result is valid and will throw an appropriate error message if it is not
	// result: the result returned from checkPropertyChange or validate
	if(!result.valid){
		throw new TypeError(result.errors.map(function(error){return "for property " + error.property + ': ' + error.message;}).join(", \n"));
	}
}

return exports;
}));


/***/ })
/******/ ]);
