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


// Load modules

const Hoek = __webpack_require__(3);


// Declare internals

const internals = {
    codes: new Map([
        [100, 'Continue'],
        [101, 'Switching Protocols'],
        [102, 'Processing'],
        [200, 'OK'],
        [201, 'Created'],
        [202, 'Accepted'],
        [203, 'Non-Authoritative Information'],
        [204, 'No Content'],
        [205, 'Reset Content'],
        [206, 'Partial Content'],
        [207, 'Multi-Status'],
        [300, 'Multiple Choices'],
        [301, 'Moved Permanently'],
        [302, 'Moved Temporarily'],
        [303, 'See Other'],
        [304, 'Not Modified'],
        [305, 'Use Proxy'],
        [307, 'Temporary Redirect'],
        [400, 'Bad Request'],
        [401, 'Unauthorized'],
        [402, 'Payment Required'],
        [403, 'Forbidden'],
        [404, 'Not Found'],
        [405, 'Method Not Allowed'],
        [406, 'Not Acceptable'],
        [407, 'Proxy Authentication Required'],
        [408, 'Request Time-out'],
        [409, 'Conflict'],
        [410, 'Gone'],
        [411, 'Length Required'],
        [412, 'Precondition Failed'],
        [413, 'Request Entity Too Large'],
        [414, 'Request-URI Too Large'],
        [415, 'Unsupported Media Type'],
        [416, 'Requested Range Not Satisfiable'],
        [417, 'Expectation Failed'],
        [418, 'I\'m a teapot'],
        [422, 'Unprocessable Entity'],
        [423, 'Locked'],
        [424, 'Failed Dependency'],
        [425, 'Unordered Collection'],
        [426, 'Upgrade Required'],
        [428, 'Precondition Required'],
        [429, 'Too Many Requests'],
        [431, 'Request Header Fields Too Large'],
        [451, 'Unavailable For Legal Reasons'],
        [500, 'Internal Server Error'],
        [501, 'Not Implemented'],
        [502, 'Bad Gateway'],
        [503, 'Service Unavailable'],
        [504, 'Gateway Time-out'],
        [505, 'HTTP Version Not Supported'],
        [506, 'Variant Also Negotiates'],
        [507, 'Insufficient Storage'],
        [509, 'Bandwidth Limit Exceeded'],
        [510, 'Not Extended'],
        [511, 'Network Authentication Required']
    ])
};


module.exports = internals.Boom = class extends Error {

    static [Symbol.hasInstance](instance) {

        return internals.Boom.isBoom(instance);
    }

    constructor(message, options = {}) {

        if (message instanceof Error) {
            return internals.Boom.boomify(Hoek.clone(message), options);
        }

        const { statusCode = 500, data = null, ctor = internals.Boom } = options;
        const error = new Error(message ? message : undefined);         // Avoids settings null message
        Error.captureStackTrace(error, ctor);                           // Filter the stack to our external API
        error.data = data;
        internals.initialize(error, statusCode);
        error.typeof = ctor;

        if (options.decorate) {
            Object.assign(error, options.decorate);
        }

        return error;
    }

    static isBoom(err) {

        return (err instanceof Error && !!err.isBoom);
    }

    static boomify(err, options) {

        Hoek.assert(err instanceof Error, 'Cannot wrap non-Error object');

        options = options || {};

        if (options.data !== undefined) {
            err.data = options.data;
        }

        if (options.decorate) {
            Object.assign(err, options.decorate);
        }

        if (!err.isBoom) {
            return internals.initialize(err, options.statusCode || 500, options.message);
        }

        if (options.override === false ||                           // Defaults to true
            (!options.statusCode && !options.message)) {

            return err;
        }

        return internals.initialize(err, options.statusCode || err.output.statusCode, options.message);
    }

    // 4xx Client Errors

    static badRequest(message, data) {

        return new internals.Boom(message, { statusCode: 400, data, ctor: internals.Boom.badRequest });
    }

    static unauthorized(message, scheme, attributes) {          // Or function (message, wwwAuthenticate[])

        const err = new internals.Boom(message, { statusCode: 401, ctor: internals.Boom.unauthorized });

        if (!scheme) {
            return err;
        }

        let wwwAuthenticate = '';

        if (typeof scheme === 'string') {

            // function (message, scheme, attributes)

            wwwAuthenticate = scheme;

            if (attributes || message) {
                err.output.payload.attributes = {};
            }

            if (attributes) {
                if (typeof attributes === 'string') {
                    wwwAuthenticate = wwwAuthenticate + ' ' + Hoek.escapeHeaderAttribute(attributes);
                    err.output.payload.attributes = attributes;
                }
                else {
                    const names = Object.keys(attributes);
                    for (let i = 0; i < names.length; ++i) {
                        const name = names[i];
                        if (i) {
                            wwwAuthenticate = wwwAuthenticate + ',';
                        }

                        let value = attributes[name];
                        if (value === null ||
                            value === undefined) {              // Value can be zero

                            value = '';
                        }

                        wwwAuthenticate = wwwAuthenticate + ' ' + name + '="' + Hoek.escapeHeaderAttribute(value.toString()) + '"';
                        err.output.payload.attributes[name] = value;
                    }
                }
            }


            if (message) {
                if (attributes) {
                    wwwAuthenticate = wwwAuthenticate + ',';
                }

                wwwAuthenticate = wwwAuthenticate + ' error="' + Hoek.escapeHeaderAttribute(message) + '"';
                err.output.payload.attributes.error = message;
            }
            else {
                err.isMissing = true;
            }
        }
        else {

            // function (message, wwwAuthenticate[])

            const wwwArray = scheme;
            for (let i = 0; i < wwwArray.length; ++i) {
                if (i) {
                    wwwAuthenticate = wwwAuthenticate + ', ';
                }

                wwwAuthenticate = wwwAuthenticate + wwwArray[i];
            }
        }

        err.output.headers['WWW-Authenticate'] = wwwAuthenticate;

        return err;
    }

    static paymentRequired(message, data) {

        return new internals.Boom(message, { statusCode: 402, data, ctor: internals.Boom.paymentRequired });
    }

    static forbidden(message, data) {

        return new internals.Boom(message, { statusCode: 403, data, ctor: internals.Boom.forbidden });
    }

    static notFound(message, data) {

        return new internals.Boom(message, { statusCode: 404, data, ctor: internals.Boom.notFound });
    }

    static methodNotAllowed(message, data, allow) {

        const err = new internals.Boom(message, { statusCode: 405, data, ctor: internals.Boom.methodNotAllowed });

        if (typeof allow === 'string') {
            allow = [allow];
        }

        if (Array.isArray(allow)) {
            err.output.headers.Allow = allow.join(', ');
        }

        return err;
    }

    static notAcceptable(message, data) {

        return new internals.Boom(message, { statusCode: 406, data, ctor: internals.Boom.notAcceptable });
    }

    static proxyAuthRequired(message, data) {

        return new internals.Boom(message, { statusCode: 407, data, ctor: internals.Boom.proxyAuthRequired });
    }

    static clientTimeout(message, data) {

        return new internals.Boom(message, { statusCode: 408, data, ctor: internals.Boom.clientTimeout });
    }

    static conflict(message, data) {

        return new internals.Boom(message, { statusCode: 409, data, ctor: internals.Boom.conflict });
    }

    static resourceGone(message, data) {

        return new internals.Boom(message, { statusCode: 410, data, ctor: internals.Boom.resourceGone });
    }

    static lengthRequired(message, data) {

        return new internals.Boom(message, { statusCode: 411, data, ctor: internals.Boom.lengthRequired });
    }

    static preconditionFailed(message, data) {

        return new internals.Boom(message, { statusCode: 412, data, ctor: internals.Boom.preconditionFailed });
    }

    static entityTooLarge(message, data) {

        return new internals.Boom(message, { statusCode: 413, data, ctor: internals.Boom.entityTooLarge });
    }

    static uriTooLong(message, data) {

        return new internals.Boom(message, { statusCode: 414, data, ctor: internals.Boom.uriTooLong });
    }

    static unsupportedMediaType(message, data) {

        return new internals.Boom(message, { statusCode: 415, data, ctor: internals.Boom.unsupportedMediaType });
    }

    static rangeNotSatisfiable(message, data) {

        return new internals.Boom(message, { statusCode: 416, data, ctor: internals.Boom.rangeNotSatisfiable });
    }

    static expectationFailed(message, data) {

        return new internals.Boom(message, { statusCode: 417, data, ctor: internals.Boom.expectationFailed });
    }

    static teapot(message, data) {

        return new internals.Boom(message, { statusCode: 418, data, ctor: internals.Boom.teapot });
    }

    static badData(message, data) {

        return new internals.Boom(message, { statusCode: 422, data, ctor: internals.Boom.badData });
    }

    static locked(message, data) {

        return new internals.Boom(message, { statusCode: 423, data, ctor: internals.Boom.locked });
    }

    static failedDependency(message, data) {

        return new internals.Boom(message, { statusCode: 424, data, ctor: internals.Boom.failedDependency });
    }

    static preconditionRequired(message, data) {

        return new internals.Boom(message, { statusCode: 428, data, ctor: internals.Boom.preconditionRequired });
    }

    static tooManyRequests(message, data) {

        return new internals.Boom(message, { statusCode: 429, data, ctor: internals.Boom.tooManyRequests });
    }

    static illegal(message, data) {

        return new internals.Boom(message, { statusCode: 451, data, ctor: internals.Boom.illegal });
    }

    // 5xx Server Errors

    static internal(message, data, statusCode = 500) {

        return internals.serverError(message, data, statusCode, internals.Boom.internal);
    }

    static notImplemented(message, data) {

        return internals.serverError(message, data, 501, internals.Boom.notImplemented);
    }

    static badGateway(message, data) {

        return internals.serverError(message, data, 502, internals.Boom.badGateway);
    }

    static serverUnavailable(message, data) {

        return internals.serverError(message, data, 503, internals.Boom.serverUnavailable);
    }

    static gatewayTimeout(message, data) {

        return internals.serverError(message, data, 504, internals.Boom.gatewayTimeout);
    }

    static badImplementation(message, data) {

        const err = internals.serverError(message, data, 500, internals.Boom.badImplementation);
        err.isDeveloperError = true;
        return err;
    }
};



internals.initialize = function (err, statusCode, message) {

    const numberCode = parseInt(statusCode, 10);
    Hoek.assert(!isNaN(numberCode) && numberCode >= 400, 'First argument must be a number (400+):', statusCode);

    err.isBoom = true;
    err.isServer = numberCode >= 500;

    if (!err.hasOwnProperty('data')) {
        err.data = null;
    }

    err.output = {
        statusCode: numberCode,
        payload: {},
        headers: {}
    };

    err.reformat = internals.reformat;

    if (!message &&
        !err.message) {

        err.reformat();
        message = err.output.payload.error;
    }

    if (message) {
        err.message = (message + (err.message ? ': ' + err.message : ''));
        err.output.payload.message = err.message;
    }

    err.reformat();
    return err;
};


internals.reformat = function (debug = false) {

    this.output.payload.statusCode = this.output.statusCode;
    this.output.payload.error = internals.codes.get(this.output.statusCode) || 'Unknown';

    if (this.output.statusCode === 500 && debug !== true) {
        this.output.payload.message = 'An internal server error occurred';              // Hide actual error from user
    }
    else if (this.message) {
        this.output.payload.message = this.message;
    }
};


internals.serverError = function (message, data, statusCode, ctor) {

    if (data instanceof Error &&
        !data.isBoom) {

        return internals.Boom.boomify(data, { statusCode, message });
    }

    return new internals.Boom(message, { statusCode, data, ctor });
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules

const Assert = __webpack_require__(4);
const Crypto = __webpack_require__(5);
const Path = __webpack_require__(6);

const DeepEqual = __webpack_require__(7);
const Escape = __webpack_require__(8);


// Declare internals

const internals = {};


// Deep object or array comparison

exports.deepEqual = DeepEqual;


// Clone object or array

exports.clone = function (obj, options = {}, _seen = null) {

    if (typeof obj !== 'object' ||
        obj === null) {

        return obj;
    }

    const seen = _seen || new Map();

    const lookup = seen.get(obj);
    if (lookup) {
        return lookup;
    }

    let newObj;
    let cloneDeep = false;
    const isArray = Array.isArray(obj);

    if (!isArray) {
        if (Buffer.isBuffer(obj)) {
            newObj = Buffer.from(obj);
        }
        else if (obj instanceof Date) {
            newObj = new Date(obj.getTime());
        }
        else if (obj instanceof RegExp) {
            newObj = new RegExp(obj);
        }
        else {
            if (options.prototype !== false) {          // Defaults to true
                const proto = Object.getPrototypeOf(obj);
                if (proto &&
                    proto.isImmutable) {

                    newObj = obj;
                }
                else {
                    newObj = Object.create(proto);
                    cloneDeep = true;
                }
            }
            else {
                newObj = {};
                cloneDeep = true;
            }
        }
    }
    else {
        newObj = [];
        cloneDeep = true;
    }

    seen.set(obj, newObj);

    if (cloneDeep) {
        const keys = internals.keys(obj, options);
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];

            if (isArray && key === 'length') {
                continue;
            }

            const descriptor = Object.getOwnPropertyDescriptor(obj, key);
            if (descriptor &&
                (descriptor.get ||
                    descriptor.set)) {

                Object.defineProperty(newObj, key, descriptor);
            }
            else {
                Object.defineProperty(newObj, key, {
                    enumerable: descriptor ? descriptor.enumerable : true,
                    writable: true,
                    configurable: true,
                    value: exports.clone(obj[key], options, seen)
                });
            }
        }

        if (isArray) {
            newObj.length = obj.length;
        }
    }

    return newObj;
};


internals.keys = function (obj, options = {}) {

    return options.symbols ? Reflect.ownKeys(obj) : Object.getOwnPropertyNames(obj);
};


// Merge all the properties of source into target, source wins in conflict, and by default null and undefined from source are applied

exports.merge = function (target, source, isNullOverride /* = true */, isMergeArrays /* = true */) {

    exports.assert(target && typeof target === 'object', 'Invalid target value: must be an object');
    exports.assert(source === null || source === undefined || typeof source === 'object', 'Invalid source value: must be null, undefined, or an object');

    if (!source) {
        return target;
    }

    if (Array.isArray(source)) {
        exports.assert(Array.isArray(target), 'Cannot merge array onto an object');
        if (isMergeArrays === false) {                                                  // isMergeArrays defaults to true
            target.length = 0;                                                          // Must not change target assignment
        }

        for (let i = 0; i < source.length; ++i) {
            target.push(exports.clone(source[i]));
        }

        return target;
    }

    const keys = internals.keys(source);
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        if (key === '__proto__' ||
            !Object.prototype.propertyIsEnumerable.call(source, key)) {

            continue;
        }

        const value = source[key];
        if (value &&
            typeof value === 'object') {

            if (!target[key] ||
                typeof target[key] !== 'object' ||
                (Array.isArray(target[key]) !== Array.isArray(value)) ||
                value instanceof Date ||
                Buffer.isBuffer(value) ||
                value instanceof RegExp) {

                target[key] = exports.clone(value);
            }
            else {
                exports.merge(target[key], value, isNullOverride, isMergeArrays);
            }
        }
        else {
            if (value !== null &&
                value !== undefined) {                              // Explicit to preserve empty strings

                target[key] = value;
            }
            else if (isNullOverride !== false) {                    // Defaults to true
                target[key] = value;
            }
        }
    }

    return target;
};


// Apply options to a copy of the defaults

exports.applyToDefaults = function (defaults, options, isNullOverride) {

    exports.assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
    exports.assert(!options || options === true || typeof options === 'object', 'Invalid options value: must be true, falsy or an object');

    if (!options) {                                                 // If no options, return null
        return null;
    }

    const copy = exports.clone(defaults);

    if (options === true) {                                         // If options is set to true, use defaults
        return copy;
    }

    return exports.merge(copy, options, isNullOverride === true, false);
};


// Clone an object except for the listed keys which are shallow copied

exports.cloneWithShallow = function (source, keys, options) {

    if (!source ||
        typeof source !== 'object') {

        return source;
    }

    const storage = internals.store(source, keys);    // Move shallow copy items to storage
    const copy = exports.clone(source, options);      // Deep copy the rest
    internals.restore(copy, source, storage);         // Shallow copy the stored items and restore
    return copy;
};


internals.store = function (source, keys) {

    const storage = new Map();
    for (let i = 0; i < keys.length; ++i) {
        const key = keys[i];
        const value = exports.reach(source, key);
        if (typeof value === 'object' ||
            typeof value === 'function') {

            storage.set(key, value);
            internals.reachSet(source, key, undefined);
        }
    }

    return storage;
};


internals.restore = function (copy, source, storage) {

    for (const [key, value] of storage) {
        internals.reachSet(copy, key, value);
        internals.reachSet(source, key, value);
    }
};


internals.reachSet = function (obj, key, value) {

    const path = Array.isArray(key) ? key : key.split('.');
    let ref = obj;
    for (let i = 0; i < path.length; ++i) {
        const segment = path[i];
        if (i + 1 === path.length) {
            ref[segment] = value;
        }

        ref = ref[segment];
    }
};


// Apply options to defaults except for the listed keys which are shallow copied from option without merging

exports.applyToDefaultsWithShallow = function (defaults, options, keys) {

    exports.assert(defaults && typeof defaults === 'object', 'Invalid defaults value: must be an object');
    exports.assert(!options || options === true || typeof options === 'object', 'Invalid options value: must be true, falsy or an object');
    exports.assert(keys && Array.isArray(keys), 'Invalid keys');

    if (!options) {                                                 // If no options, return null
        return null;
    }

    const copy = exports.cloneWithShallow(defaults, keys);

    if (options === true) {                                         // If options is set to true, use defaults
        return copy;
    }

    const storage = internals.store(options, keys);     // Move shallow copy items to storage
    exports.merge(copy, options, false, false);         // Deep copy the rest
    internals.restore(copy, options, storage);          // Shallow copy the stored items and restore
    return copy;
};


// Find the common unique items in two arrays

exports.intersect = function (array1, array2, justFirst) {

    if (!array1 ||
        !array2) {

        return (justFirst ? null : []);
    }

    const common = [];
    const hash = (Array.isArray(array1) ? new Set(array1) : array1);
    const found = new Set();
    for (const value of array2) {
        if (internals.has(hash, value) &&
            !found.has(value)) {

            if (justFirst) {
                return value;
            }

            common.push(value);
            found.add(value);
        }
    }

    return (justFirst ? null : common);
};


internals.has = function (ref, key) {

    if (typeof ref.has === 'function') {
        return ref.has(key);
    }

    return ref[key] !== undefined;
};


// Test if the reference contains the values

exports.contain = function (ref, values, options = {}) {        // options: { deep, once, only, part, symbols }

    /*
        string -> string(s)
        array -> item(s)
        object -> key(s)
        object -> object (key:value)
    */

    let valuePairs = null;
    if (typeof ref === 'object' &&
        typeof values === 'object' &&
        !Array.isArray(ref) &&
        !Array.isArray(values)) {

        valuePairs = values;
        const symbols = Object.getOwnPropertySymbols(values).filter(Object.prototype.propertyIsEnumerable.bind(values));
        values = [...Object.keys(values), ...symbols];
    }
    else {
        values = [].concat(values);
    }

    exports.assert(typeof ref === 'string' || typeof ref === 'object', 'Reference must be string or an object');
    exports.assert(values.length, 'Values array cannot be empty');

    let compare;
    let compareFlags;
    if (options.deep) {
        compare = exports.deepEqual;

        const hasOnly = options.hasOwnProperty('only');
        const hasPart = options.hasOwnProperty('part');

        compareFlags = {
            prototype: hasOnly ? options.only : hasPart ? !options.part : false,
            part: hasOnly ? !options.only : hasPart ? options.part : false
        };
    }
    else {
        compare = (a, b) => a === b;
    }

    let misses = false;
    const matches = new Array(values.length);
    for (let i = 0; i < matches.length; ++i) {
        matches[i] = 0;
    }

    if (typeof ref === 'string') {
        let pattern = '(';
        for (let i = 0; i < values.length; ++i) {
            const value = values[i];
            exports.assert(typeof value === 'string', 'Cannot compare string reference to non-string value');
            pattern += (i ? '|' : '') + exports.escapeRegex(value);
        }

        const regex = new RegExp(pattern + ')', 'g');
        const leftovers = ref.replace(regex, ($0, $1) => {

            const index = values.indexOf($1);
            ++matches[index];
            return '';          // Remove from string
        });

        misses = !!leftovers;
    }
    else if (Array.isArray(ref)) {
        const onlyOnce = !!(options.only && options.once);
        if (onlyOnce && ref.length !== values.length) {
            return false;
        }

        for (let i = 0; i < ref.length; ++i) {
            let matched = false;
            for (let j = 0; j < values.length && matched === false; ++j) {
                if (!onlyOnce || matches[j] === 0) {
                    matched = compare(values[j], ref[i], compareFlags) && j;
                }
            }

            if (matched !== false) {
                ++matches[matched];
            }
            else {
                misses = true;
            }
        }
    }
    else {
        const keys = internals.keys(ref, options);
        for (let i = 0; i < keys.length; ++i) {
            const key = keys[i];
            const pos = values.indexOf(key);
            if (pos !== -1) {
                if (valuePairs &&
                    !compare(valuePairs[key], ref[key], compareFlags)) {

                    return false;
                }

                ++matches[pos];
            }
            else {
                misses = true;
            }
        }
    }

    if (options.only) {
        if (misses || !options.once) {
            return !misses;
        }
    }

    let result = false;
    for (let i = 0; i < matches.length; ++i) {
        result = result || !!matches[i];
        if ((options.once && matches[i] > 1) ||
            (!options.part && !matches[i])) {

            return false;
        }
    }

    return result;
};


// Flatten array

exports.flatten = function (array, target) {

    const result = target || [];

    for (let i = 0; i < array.length; ++i) {
        if (Array.isArray(array[i])) {
            exports.flatten(array[i], result);
        }
        else {
            result.push(array[i]);
        }
    }

    return result;
};


// Convert an object key chain string ('a.b.c') to reference (object[a][b][c])

exports.reach = function (obj, chain, options) {

    if (chain === false ||
        chain === null ||
        typeof chain === 'undefined') {

        return obj;
    }

    options = options || {};
    if (typeof options === 'string') {
        options = { separator: options };
    }

    const isChainArray = Array.isArray(chain);

    exports.assert(!isChainArray || !options.separator, 'Separator option no valid for array-based chain');

    const path = isChainArray ? chain : chain.split(options.separator || '.');
    let ref = obj;
    for (let i = 0; i < path.length; ++i) {
        let key = path[i];

        if (Array.isArray(ref)) {
            const number = Number(key);

            if (Number.isInteger(number) && number < 0) {
                key = ref.length + number;
            }
        }

        if (!ref ||
            !((typeof ref === 'object' || typeof ref === 'function') && key in ref) ||
            (typeof ref !== 'object' && options.functions === false)) {         // Only object and function can have properties

            exports.assert(!options.strict || i + 1 === path.length, 'Missing segment', key, 'in reach path ', chain);
            exports.assert(typeof ref === 'object' || options.functions === true || typeof ref !== 'function', 'Invalid segment', key, 'in reach path ', chain);
            ref = options.default;
            break;
        }

        ref = ref[key];
    }

    return ref;
};


exports.reachTemplate = function (obj, template, options) {

    return template.replace(/{([^}]+)}/g, ($0, chain) => {

        const value = exports.reach(obj, chain, options);
        return (value === undefined || value === null ? '' : value);
    });
};


exports.assert = function (condition, ...args) {

    if (condition) {
        return;
    }

    if (args.length === 1 && args[0] instanceof Error) {
        throw args[0];
    }

    const msgs = args
        .filter((arg) => arg !== '')
        .map((arg) => {

            return typeof arg === 'string' ? arg : arg instanceof Error ? arg.message : exports.stringify(arg);
        });

    throw new Assert.AssertionError({
        message: msgs.join(' ') || 'Unknown error',
        actual: false,
        expected: true,
        operator: '==',
        stackStartFunction: exports.assert
    });
};


exports.Bench = function () {

    this.ts = 0;
    this.reset();
};


exports.Bench.prototype.reset = function () {

    this.ts = exports.Bench.now();
};


exports.Bench.prototype.elapsed = function () {

    return exports.Bench.now() - this.ts;
};


exports.Bench.now = function () {

    const ts = process.hrtime();
    return (ts[0] * 1e3) + (ts[1] / 1e6);
};


// Escape string for Regex construction

exports.escapeRegex = function (string) {

    // Escape ^$.*+-?=!:|\/()[]{},
    return string.replace(/[\^\$\.\*\+\-\?\=\!\:\|\\\/\(\)\[\]\{\}\,]/g, '\\$&');
};


// Escape attribute value for use in HTTP header

exports.escapeHeaderAttribute = function (attribute) {

    // Allowed value characters: !#$%&'()*+,-./:;<=>?@[]^_`{|}~ and space, a-z, A-Z, 0-9, \, "

    exports.assert(/^[ \w\!#\$%&'\(\)\*\+,\-\.\/\:;<\=>\?@\[\]\^`\{\|\}~\"\\]*$/.test(attribute), 'Bad attribute value (' + attribute + ')');

    return attribute.replace(/\\/g, '\\\\').replace(/\"/g, '\\"');                             // Escape quotes and slash
};


exports.escapeHtml = function (string) {

    return Escape.escapeHtml(string);
};


exports.escapeJson = function (string) {

    return Escape.escapeJson(string);
};


exports.once = function (method) {

    if (method._hoekOnce) {
        return method;
    }

    let once = false;
    const wrapped = function (...args) {

        if (!once) {
            once = true;
            method(...args);
        }
    };

    wrapped._hoekOnce = true;
    return wrapped;
};


exports.ignore = function () { };


exports.uniqueFilename = function (path, extension) {

    if (extension) {
        extension = extension[0] !== '.' ? '.' + extension : extension;
    }
    else {
        extension = '';
    }

    path = Path.resolve(path);
    const name = [Date.now(), process.pid, Crypto.randomBytes(8).toString('hex')].join('-') + extension;
    return Path.join(path, name);
};


exports.stringify = function (...args) {

    try {
        return JSON.stringify.apply(null, args);
    }
    catch (err) {
        return '[Cannot display object: ' + err.message + ']';
    }
};


exports.wait = function (timeout) {

    return new Promise((resolve) => setTimeout(resolve, timeout));
};


exports.block = function () {

    return new Promise(exports.ignore);
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Load modules


// Declare internals

const internals = {
    arrayType: Symbol('array'),
    bufferType: Symbol('buffer'),
    dateType: Symbol('date'),
    errorType: Symbol('error'),
    genericType: Symbol('generic'),
    mapType: Symbol('map'),
    regexType: Symbol('regex'),
    setType: Symbol('set'),
    weakMapType: Symbol('weak-map'),
    weakSetType: Symbol('weak-set'),
    mismatched: Symbol('mismatched')
};


internals.typeMap = {
    '[object Array]': internals.arrayType,
    '[object Date]': internals.dateType,
    '[object Error]': internals.errorType,
    '[object Map]': internals.mapType,
    '[object RegExp]': internals.regexType,
    '[object Set]': internals.setType,
    '[object WeakMap]': internals.weakMapType,
    '[object WeakSet]': internals.weakSetType
};


internals.SeenEntry = class {

    constructor(obj, ref) {

        this.obj = obj;
        this.ref = ref;
    }

    isSame(obj, ref) {

        return this.obj === obj && this.ref === ref;
    }
};


internals.getInternalType = function (obj) {

    const { typeMap, bufferType, genericType } = internals;

    if (obj instanceof Buffer) {
        return bufferType;
    }

    const objName = Object.prototype.toString.call(obj);
    return typeMap[objName] || genericType;
};


internals.getSharedType = function (obj, ref, checkPrototype) {

    if (checkPrototype) {
        if (Object.getPrototypeOf(obj) !== Object.getPrototypeOf(ref)) {
            return internals.mismatched;
        }

        return internals.getInternalType(obj);
    }

    const type = internals.getInternalType(obj);
    if (type !== internals.getInternalType(ref)) {
        return internals.mismatched;
    }

    return type;
};


internals.valueOf = function (obj) {

    const objValueOf = obj.valueOf;
    if (objValueOf === undefined) {
        return obj;
    }

    try {
        return objValueOf.call(obj);
    }
    catch (err) {
        return err;
    }
};


internals.hasOwnEnumerableProperty = function (obj, key) {

    return Object.prototype.propertyIsEnumerable.call(obj, key);
};


internals.isSetSimpleEqual = function (obj, ref) {

    for (const entry of obj) {
        if (!ref.has(entry)) {
            return false;
        }
    }

    return true;
};


internals.isDeepEqualObj = function (instanceType, obj, ref, options, seen) {

    const { isDeepEqual, valueOf, hasOwnEnumerableProperty } = internals;
    const { keys, getOwnPropertySymbols } = Object;

    if (instanceType === internals.arrayType) {
        if (options.part) {
            // Check if any index match any other index

            for (let i = 0; i < obj.length; ++i) {
                const objValue = obj[i];
                for (let j = 0; j < ref.length; ++j) {
                    if (isDeepEqual(objValue, ref[j], options, seen)) {
                        return true;
                    }
                }
            }
        }
        else {
            if (obj.length !== ref.length) {
                return false;
            }

            for (let i = 0; i < obj.length; ++i) {
                if (!isDeepEqual(obj[i], ref[i], options, seen)) {
                    return false;
                }
            }

            return true;
        }
    }
    else if (instanceType === internals.setType) {
        if (obj.size !== ref.size) {
            return false;
        }

        if (!internals.isSetSimpleEqual(obj, ref)) {

            // Check for deep equality

            const ref2 = new Set(ref);
            for (const objEntry of obj) {
                if (ref2.delete(objEntry)) {
                    continue;
                }

                let found = false;
                for (const refEntry of ref2) {
                    if (isDeepEqual(objEntry, refEntry, options, seen)) {
                        ref2.delete(refEntry);
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    return false;
                }
            }
        }
    }
    else if (instanceType === internals.mapType) {
        if (obj.size !== ref.size) {
            return false;
        }

        for (const [key, value] of obj) {
            if (value === undefined && !ref.has(key)) {
                return false;
            }

            if (!isDeepEqual(value, ref.get(key), options, seen)) {
                return false;
            }
        }
    }
    else if (instanceType === internals.errorType) {
        // Always check name and message

        if (obj.name !== ref.name || obj.message !== ref.message) {
            return false;
        }
    }

    // Check .valueOf()

    const valueOfObj = valueOf(obj);
    const valueOfRef = valueOf(ref);
    if (!(obj === valueOfObj && ref === valueOfRef) &&
        !isDeepEqual(valueOfObj, valueOfRef, options, seen)) {
        return false;
    }

    // Check properties

    const objKeys = keys(obj);
    if (!options.part && objKeys.length !== keys(ref).length) {
        return false;
    }

    for (let i = 0; i < objKeys.length; ++i) {
        const key = objKeys[i];

        if (!hasOwnEnumerableProperty(ref, key)) {
            return false;
        }

        if (!isDeepEqual(obj[key], ref[key], options, seen)) {
            return false;
        }
    }

    // Check symbols

    if (options.symbols) {
        const objSymbols = getOwnPropertySymbols(obj);
        const refSymbols = new Set(getOwnPropertySymbols(ref));

        for (let i = 0; i < objSymbols.length; ++i) {
            const key = objSymbols[i];

            if (hasOwnEnumerableProperty(obj, key)) {
                if (!hasOwnEnumerableProperty(ref, key)) {
                    return false;
                }

                if (!isDeepEqual(obj[key], ref[key], options, seen)) {
                    return false;
                }
            }
            else if (hasOwnEnumerableProperty(ref, key)) {
                return false;
            }

            refSymbols.delete(key);
        }

        for (const key of refSymbols) {
            if (hasOwnEnumerableProperty(ref, key)) {
                return false;
            }
        }
    }

    return true;
};


internals.isDeepEqual = function (obj, ref, options, seen) {

    if (obj === ref) {                                      // Copied from Deep-eql, copyright(c) 2013 Jake Luer, jake@alogicalparadox.com, MIT Licensed, https://github.com/chaijs/deep-eql
        return obj !== 0 || 1 / obj === 1 / ref;
    }

    const type = typeof obj;

    if (type !== typeof ref) {
        return false;
    }

    if (type !== 'object' ||
        obj === null ||
        ref === null) {

        return obj !== obj && ref !== ref;                  // NaN
    }

    const instanceType = internals.getSharedType(obj, ref, !!options.prototype);
    switch (instanceType) {
        case internals.bufferType:
            return Buffer.prototype.equals.call(obj, ref);
        case internals.regexType:
            return obj.toString() === ref.toString();
        case internals.mismatched:
            return false;
    }

    for (let i = seen.length - 1; i >= 0; --i) {
        if (seen[i].isSame(obj, ref)) {
            return true;                                    // If previous comparison failed, it would have stopped execution
        }
    }

    seen.push(new internals.SeenEntry(obj, ref));
    try {
        return !!internals.isDeepEqualObj(instanceType, obj, ref, options, seen);
    }
    finally {
        seen.pop();
    }
};


module.exports = function (obj, ref, options) {

    options = options || { prototype: true };

    return !!internals.isDeepEqual(obj, ref, options, []);
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Declare internals

const internals = {};


exports.escapeHtml = function (input) {

    if (!input) {
        return '';
    }

    let escaped = '';

    for (let i = 0; i < input.length; ++i) {

        const charCode = input.charCodeAt(i);

        if (internals.isSafe(charCode)) {
            escaped += input[i];
        }
        else {
            escaped += internals.escapeHtmlChar(charCode);
        }
    }

    return escaped;
};


exports.escapeJson = function (input) {

    if (!input) {
        return '';
    }

    const lessThan = 0x3C;
    const greaterThan = 0x3E;
    const andSymbol = 0x26;
    const lineSeperator = 0x2028;

    // replace method
    let charCode;
    return input.replace(/[<>&\u2028\u2029]/g, (match) => {

        charCode = match.charCodeAt(0);

        if (charCode === lessThan) {
            return '\\u003c';
        }

        if (charCode === greaterThan) {
            return '\\u003e';
        }

        if (charCode === andSymbol) {
            return '\\u0026';
        }

        if (charCode === lineSeperator) {
            return '\\u2028';
        }

        return '\\u2029';
    });
};


internals.escapeHtmlChar = function (charCode) {

    const namedEscape = internals.namedHtml[charCode];
    if (typeof namedEscape !== 'undefined') {
        return namedEscape;
    }

    if (charCode >= 256) {
        return '&#' + charCode + ';';
    }

    const hexValue = Buffer.from(String.fromCharCode(charCode), 'ascii').toString('hex');
    return `&#x${hexValue};`;
};


internals.isSafe = function (charCode) {

    return (typeof internals.safeCharCodes[charCode] !== 'undefined');
};


internals.namedHtml = {
    '38': '&amp;',
    '60': '&lt;',
    '62': '&gt;',
    '34': '&quot;',
    '160': '&nbsp;',
    '162': '&cent;',
    '163': '&pound;',
    '164': '&curren;',
    '169': '&copy;',
    '174': '&reg;'
};


internals.safeCharCodes = (function () {

    const safe = {};

    for (let i = 32; i < 123; ++i) {

        if ((i >= 97) ||                    // a-z
            (i >= 65 && i <= 90) ||         // A-Z
            (i >= 48 && i <= 57) ||         // 0-9
            i === 32 ||                     // space
            i === 46 ||                     // .
            i === 44 ||                     // ,
            i === 45 ||                     // -
            i === 58 ||                     // :
            i === 95) {                     // _

            safe[i] = null;
        }
    }

    return safe;
}());


/***/ })
/******/ ]);
