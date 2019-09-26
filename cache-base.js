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


const typeOf = __webpack_require__(3);
const Emitter = __webpack_require__(4);
const visit = __webpack_require__(5);
const hasOwn = __webpack_require__(10);
const union = __webpack_require__(11);
const del = __webpack_require__(22);
const get = __webpack_require__(28);
const set = __webpack_require__(29);

/**
 * Create an instance of `CacheBase`.
 *
 * ```js
 * const app = new CacheBase();
 * ```
 * @param {String|Object} `prop` (optional) Property name to use for the cache, or the object to initialize with.
 * @param {Object} `cache` (optional) An object to initialize with.
 * @constructor
 * @api public
 */

class CacheBase extends Emitter {
  constructor(prop, cache) {
    super();

    if (typeof prop !== 'string') {
      cache = prop || cache;
      prop = 'cache';
    }

    Reflect.defineProperty(this, 'prop', { value: prop });
    this[this.prop] = {};

    if (cache) {
      this.set(cache);
    }
  }

  /**
   * Assign `value` to `key`. Also emits `set` with the key and value.
   *
   * ```js
   * app.on('set', function(key, val) {
   *   // do something when `set` is emitted
   * });
   *
   * app.set('admin', true);
   *
   * // also takes an object or an array of objects
   * app.set({ name: 'Brian' });
   * app.set([{ foo: 'bar' }, { baz: 'quux' }]);
   * console.log(app);
   * //=> { name: 'Brian', foo: 'bar', baz: 'quux' }
   * ```
   * @name .set
   * @emits `set` with `key` and `value` as arguments.
   * @param {String|Array} `key` The name of the property to set. Dot-notation may be used to set nested properties.
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  set(key, ...rest) {
    if (isObject(key) || (rest.length === 0 && Array.isArray(key))) {
      return this.visit('set', key, ...rest);
    }
    if (Array.isArray(key)) key = key.join('.');
    set(this[this.prop], key, ...rest);
    this.emit('set', key, ...rest);
    return this;
  }

  /**
   * Return the value of `key`.
   *
   * ```js
   * app.set('a.b.c', 'd');
   * app.get('a.b');
   * //=> { c: 'd' }
   * ```
   * @name .get
   * @emits `get` with `key` and `value` as arguments.
   * @param {String|Array} `key` The name of the property to get. Dot-notation may be used to set nested properties.
   * @return {any} Returns the value of `key`
   * @api public
   */

  get(key) {
    if (Array.isArray(key)) key = key.join('.');
    let val = get(this[this.prop], key);

    if (typeof val === 'undefined' && this.defaults) {
      val = get(this.defaults, key);
    }

    this.emit('get', key, val);
    return val;
  }

  /**
   * Create a property on the cache with the given `value` only if it doesn't
   * already exist.
   *
   * ```js
   * console.log(app.cache); //=> {}
   * app.set('one', { foo: 'bar' });
   * app.prime('one', { a: 'b' });
   * app.prime('two', { c: 'd' });
   * console.log(app.cache.one); //=> { foo: 'bar' }
   * console.log(app.cache.two); //=> { c: 'd' }
   * ```
   * @name .prime
   * @param {String} `key` Property name or object path notation.
   * @param {any} `val`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  prime(key, ...rest) {
    if (isObject(key) || (rest.length === 0 && Array.isArray(key))) {
      return this.visit('prime', key, ...rest);
    }
    if (Array.isArray(key)) key = key.join('.');
    if (!this.has(key)) {
      this.set(key, ...rest);
    }
    return this;
  }

  /**
   * Set a default value to be used when `.get()` is called and the value is not defined
   * on the cache. Returns a value from the defaults when only a key is passed.
   *
   * ```js
   * app.set('foo', 'xxx');
   * app.default('foo', 'one');
   * app.default('bar', 'two');
   * app.default('baz', 'three');
   * app.set('baz', 'zzz');
   *
   * console.log(app.get('foo'));
   * //=> 'xxx'
   *
   * console.log(app.get('bar'));
   * //=> 'two'
   *
   * console.log(app.get('baz'));
   * //=> 'zzz'
   *
   * console.log(app);
   * // CacheBase {
   * //   cache: { foo: 'xxx', bar: 'two', baz: 'zzz' },
   * //   defaults: { foo: 'one', bar: 'two', baz: 'three' } }
   * ```
   * @name .default
   * @param {String|Array} `key` The name of the property to set. Dot-notation may be used to set nested properties.
   * @param {any} `value` (optional) The value to set on the defaults object.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  default(key, ...rest) {
    this.defaults = this.defaults || {};

    if (isObject(key) || (rest.length === 0 && Array.isArray(key))) {
      return this.visit('default', key, ...rest);
    }

    if (Array.isArray(key)) key = key.join('.');
    if (!isString(key)) {
      throw new TypeError('expected "key" to be a string, object or array');
    }

    if (rest.length === 0) {
      return get(this.defaults, key);
    }

    set(this.defaults, key, ...rest);
    this.emit('default', key, rest);
    return this;
  }

  /**
   * Set an array of unique values on cache `key`.
   *
   * ```js
   * app.union('a.b.c', 'foo');
   * app.union('a.b.c', 'bar');
   * app.union('a.b.c', ['bar', 'baz']);
   * console.log(app.get('a'));
   * //=> { b: { c: ['foo', 'bar', 'baz'] } }
   * ```
   * @name .union
   * @param {String|Array} `key` The name of the property to union. Dot-notation may be used to set nested properties.
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  union(key, ...rest) {
    if (Array.isArray(key)) key = key.join('.');
    union(this[this.prop], key, ...rest);
    this.emit('union', ...rest);
    return this;
  }

  /**
   * Return true if the value of property `key` is not `undefined`.
   *
   * ```js
   * app.set('foo', true);
   * app.set('baz', null);
   * app.set('bar', undefined);
   *
   * app.has('foo'); //=> true
   * app.has('bar'); //=> true
   * app.has('baz'); //=> false
   * ```
   * @name .has
   * @param {String|Array} `key` The name of the property to check. Dot-notation may be used to set nested properties.
   * @return {Boolean}
   * @api public
   */

  has(key) {
    if (Array.isArray(key)) key = key.join('.');
    return typeof get(this[this.prop], key) !== 'undefined';
  }

  /**
   * Returns true if the specified property is an own (not inherited) property.
   * Similar to [.has()](#has), but returns true if the key exists, even if the
   * value is `undefined`.
   *
   * ```js
   * app.set('a.b.c', 'd');
   * app.set('x', false);
   * app.set('y', null);
   * app.set('z', undefined);
   *
   * app.hasOwn('a');      //=> true
   * app.hasOwn('b');      //=> true
   * app.hasOwn('c');      //=> true
   * app.hasOwn('a.b.c');  //=> true
   * app.hasOwn('x');      //=> true
   * app.hasOwn('y');      //=> true
   * app.hasOwn('z');      //=> true
   * app.hasOwn('lslsls'); //=> false
   * ```
   * @name .hasOwn
   * @param  {String} `key`
   * @return {Boolean} Returns true if object `key` exists. Dot-notation may be used to set nested properties.
   * @api public
   */

  hasOwn(key) {
    if (Array.isArray(key)) key = key.join('.');
    return hasOwn(this[this.prop], key);
  }

  /**
   * Delete one or more properties from the instance.
   *
   * ```js
   * // setup a listener to update a property with a default
   * // value when it's deleted by the user
   * app.on('del', key => app.set(key, app.default(key)));
   *
   * app.del(); // delete all properties on the cache
   * // or
   * app.del('foo');
   * // or an array of keys
   * app.del(['foo', 'bar']);
   * ```
   * @name .del
   * @emits `del` with the `key` as the only argument.
   * @param {string} `key` The name of the property to delete. Dot-notation may be used to delete nested properties. This method does not accept key as an array.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  del(key) {
    if (!key) return this.clear();
    del(this[this.prop], key);
    this.emit('del', key);
    return this;
  }

  /**
   * Reset the entire cache to an empty object. Note that this does not also clear the `defaults`
   * object, since you can manually do `cache.defaults = {}` if you want to reset that object as well.
   *
   * ```js
   * // clear "defaults" whenever the cache is cleared
   * app.on('clear', key => (app.defaults = {}));
   * app.clear();
   * ```
   * @name .clear
   * @api public
   */

  clear() {
    this[this.prop] = {};
    this.emit('clear');
    return this;
  }

  /**
   * Visit (or map visit) the specified method (`key`) over the properties in the
   * given object or array.
   *
   * @name .visit
   * @param {String|Array} `key` The name of the method to visit.
   * @param {Object|Array} `val` The object or array to iterate over.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  visit(key, ...rest) {
    visit(this, key, ...rest);
    return this;
  }

  /**
   * Gets an array of names of all enumerable properties on the cache.
   *
   * ```js
   * const app = new CacheBase();
   * app.set('user', true);
   * app.set('admin', false);
   *
   * console.log(app.keys);
   * //=> ['user', 'admin']
   * ```
   * @name .keys
   * @api public
   */

  get keys() {
    return Object.keys(this[this.prop]);
  }

  /**
   * Gets the length of [keys](#keys).
   *
   * ```js
   * const app = new CacheBase();
   * app.set('user', true);
   * app.set('admin', false);
   *
   * console.log(app.size);
   * //=> 2
   * ```
   * @name .size
   * @api public
   */

  get size() {
    return this.keys.length;
  }
}

/**
 * Returns true if `value` is a non-empty string.
 */

function isString(value) {
  return typeof value === 'string' && value !== '';
}

/**
 * Returns true if `value` is an object
 */

function isObject(value) {
  return typeOf(value) === 'object';
}

/**
 * Expose `CacheBase`
 */

module.exports = CacheBase;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var toString = Object.prototype.toString;

module.exports = function kindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';

  var type = typeof val;
  if (type === 'boolean') return 'boolean';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'symbol') return 'symbol';
  if (type === 'function') {
    return isGeneratorFn(val) ? 'generatorfunction' : 'function';
  }

  if (isArray(val)) return 'array';
  if (isBuffer(val)) return 'buffer';
  if (isArguments(val)) return 'arguments';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  if (isRegexp(val)) return 'regexp';

  switch (ctorName(val)) {
    case 'Symbol': return 'symbol';
    case 'Promise': return 'promise';

    // Set, Map, WeakSet, WeakMap
    case 'WeakMap': return 'weakmap';
    case 'WeakSet': return 'weakset';
    case 'Map': return 'map';
    case 'Set': return 'set';

    // 8-bit typed arrays
    case 'Int8Array': return 'int8array';
    case 'Uint8Array': return 'uint8array';
    case 'Uint8ClampedArray': return 'uint8clampedarray';

    // 16-bit typed arrays
    case 'Int16Array': return 'int16array';
    case 'Uint16Array': return 'uint16array';

    // 32-bit typed arrays
    case 'Int32Array': return 'int32array';
    case 'Uint32Array': return 'uint32array';
    case 'Float32Array': return 'float32array';
    case 'Float64Array': return 'float64array';
  }

  if (isGeneratorObj(val)) {
    return 'generator';
  }

  // Non-plain objects
  type = toString.call(val);
  switch (type) {
    case '[object Object]': return 'object';
    // iterators
    case '[object Map Iterator]': return 'mapiterator';
    case '[object Set Iterator]': return 'setiterator';
    case '[object String Iterator]': return 'stringiterator';
    case '[object Array Iterator]': return 'arrayiterator';
  }

  // other
  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
};

function ctorName(val) {
  return val.constructor ? val.constructor.name : null;
}

function isArray(val) {
  if (Array.isArray) return Array.isArray(val);
  return val instanceof Array;
}

function isError(val) {
  return val instanceof Error || (typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number');
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function'
    && typeof val.getDate === 'function'
    && typeof val.setDate === 'function';
}

function isRegexp(val) {
  if (val instanceof RegExp) return true;
  return typeof val.flags === 'string'
    && typeof val.ignoreCase === 'boolean'
    && typeof val.multiline === 'boolean'
    && typeof val.global === 'boolean';
}

function isGeneratorFn(name, val) {
  return ctorName(name) === 'GeneratorFunction';
}

function isGeneratorObj(val) {
  return typeof val.throw === 'function'
    && typeof val.return === 'function'
    && typeof val.next === 'function';
}

function isArguments(val) {
  try {
    if (typeof val.length === 'number' && typeof val.callee === 'function') {
      return true;
    }
  } catch (err) {
    if (err.message.indexOf('callee') !== -1) {
      return true;
    }
  }
  return false;
}

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  if (val.constructor && typeof val.constructor.isBuffer === 'function') {
    return val.constructor.isBuffer(val);
  }
  return false;
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Initialize a new `Emitter`.
 *
 * ```js
 * const Emitter = require('emitter');
 * // as an `Emitter` instance
 * const emitter = new Emitter;
 * emitter.emit('something');
 * // or inherit
 * class MyEmitter extends Emitter {}
 * ```
 * @name Emitter
 * @api public
 */

class Emitter {
  constructor(obj) {
    if (obj) return mixin(obj);
  }

  /**
   * Mixin methods from Emitter.
   *
   * ```js
   * const Emitter = require('emitter');
   * const obj = {};
   * Emitter.mixin(obj);
   * obj.on('status', console.log);
   * obj.emit('status', 'I emit!');
   * ```
   * @name Emitter#mixin
   * @param {Object} `obj`
   * @return {Object}
   * @api public
   */

  static mixin(obj) {
    return new Emitter(obj);
  }

  /**
   * Return the array of registered listeners for `event`.
   *
   * ```js
   * // all listeners for event "status"
   * console.log(emitter.listeners('status'));
   * // all listeners
   * console.log(emitter.listeners());
   * ```
   * @name .listeners
   * @param {String} `event`
   * @return {Array}
   * @api public
   */

  listeners(event) {
    if (!this._listeners) define(this, '_listeners', {});
    if (!this._only) define(this, '_only', {});
    if (!event) return this._listeners;
    return this._listeners['$' + event] || (this._listeners['$' + event] = []);
  }

  /**
   * Listen on the given `event` with `fn`.
   *
   * ```js
   * emitter.on('foo', () => 'do stuff');
   * ```
   * @name .on
   * @param {String} `event`
   * @param {Function} `fn`
   * @return {Emitter}
   * @api public
   */

  on(event, fn) {
    if (this._only && this._only[event]) {
      return this.only(event, fn);
    }
    this.listeners(event).push(fn);
    return this;
  }

  /**
   * Adds an `event` listener that will be invoked a single
   * time then automatically removed.
   *
   * ```js
   * emitter.only('once', () => 'do stuff');
   * ```
   * @name .once
   * @param {String} `event`
   * @param {Function} `fn`
   * @return {Emitter}
   * @api public
   */

  once(event, fn) {
    const on = function() {
      this.off(event, on);
      fn.apply(this, arguments);
    };
    on.fn = fn;
    this.on(event, on);
    return this;
  }

  /**
   * Ensures that listeners for `event` are only **_registered_** once
   * and are disabled correctly when specified. This is different from
   * `.once`, which only **emits** once.
   *
   * ```js
   * emitter.only('foo', () => 'do stuff');
   * ```
   * @name .only
   * @param {String} `event`
   * @param {Object} `options`
   * @param {Function} `fn`
   * @return {Emitter}
   * @api public
   */

  only(event, options, fn) {
    this.listeners();

    if (typeof options === 'function') {
      fn = options;
      options = null;
    }

    if (options && options.first === true) {
      define(this, '_first', true);
    }

    if (!fn || !event || !this._only[event]) {
      this.off(event);
      if (!fn) return this;
    }

    const existing = this._only[event];
    if (existing) {
      if (this._first === true) return this;
      this.off(event, existing);
    }

    this._only[event] = fn;
    this.listeners(event).push(fn);
    return this;
  }

  /**
   * Remove the given listener for `event`, or remove all
   * registered listeners if `event` is undefined.
   *
   * ```js
   * emitter.off();
   * emitter.off('foo');
   * emitter.off('foo', fn);
   * ```
   * @name .off
   * @param {String} `event`
   * @param {Function} `fn`
   * @return {Emitter}
   * @api public
   */

  off(event, fn) {
    this.listeners();

    // remove all listeners
    if (!event) {
      this._listeners = {};
      this._only = {};
      return this;
    }

    // remove all listeners for "event"
    if (!fn) {
      this._listeners['$' + event] = [];
      this._only['$' + event] = [];
      return this;
    }

    // remove all instances of "fn" from "event"
    removeListeners(fn, this.listeners(event));
    return this;
  }

  /**
   * Emit `event` with the given args.
   *
   * ```js
   * emitter.emit('foo', 'bar');
   * ```
   * @name .emit
   * @param {String} `event`
   * @param {Mixed} ...
   * @return {Emitter}
   */

  emit(event) {
    const listeners = this.listeners(event).slice();
    const args = [].slice.call(arguments, 1);
    for (const fn of listeners) {
      fn.apply(this, args);
    }
    return this;
  }

  /**
   * Returns true if the emitter has registered listeners for `event`.
   *
   * ```js
   * emitter.on('foo', 'do stuff');
   * console.log(emitter.has('foo')); // true
   * console.log(emitter.has('bar')); // false
   * ```
   * @name .has
   * @param {String} `event`
   * @return {Boolean}
   * @api public
   */

  has(event) {
    return this.listeners(event).length > 0;
  }
}

/**
 * Expose common aliases for `.has`, `.on` and `.off`
 */

Emitter.prototype.hasListeners =
Emitter.prototype.has;

Emitter.prototype.addListener =
Emitter.prototype.addEventListener =
Emitter.prototype.on;

Emitter.prototype.removeListener =
Emitter.prototype.removeListeners =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener =
Emitter.prototype.off;

/**
 * Remove all instances of the given `fn` from listeners.
 */

function removeListeners(fn, listeners) {
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    if (listener === fn || listener.fn === fn) {
      listeners.splice(i, 1);
      return removeListeners(fn, listeners);
    }
  }
}

/**
 * Mixin emitter properties.
 */

function mixin(obj) {
  const ctor = obj.constructor;
  Object.setPrototypeOf(obj, Emitter.prototype);
  if (ctor) define(obj, 'constructor', ctor);
  return obj;
}

function define(obj, key, val) {
  Reflect.defineProperty(obj, key, {
    configurable: true,
    writable: true,
    value: val
  });
}

/**
 * Expose `Emitter`
 */

module.exports = Emitter;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * collection-visit <https://github.com/jonschlinkert/collection-visit>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var visit = __webpack_require__(6);
var mapVisit = __webpack_require__(8);

module.exports = function(collection, method, val) {
  var result;

  if (typeof val === 'string' && (method in collection)) {
    var args = [].slice.call(arguments, 2);
    result = collection[method].apply(collection, args);
  } else if (Array.isArray(val)) {
    result = mapVisit.apply(null, arguments);
  } else {
    result = visit.apply(null, arguments);
  }

  if (typeof result !== 'undefined') {
    return result;
  }

  return collection;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * object-visit <https://github.com/jonschlinkert/object-visit>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(7);

module.exports = function visit(thisArg, method, target, val) {
  if (!isObject(thisArg) && typeof thisArg !== 'function') {
    throw new Error('object-visit expects `thisArg` to be an object.');
  }

  if (typeof method !== 'string') {
    throw new Error('object-visit expects `method` name to be a string');
  }

  if (typeof thisArg[method] !== 'function') {
    return thisArg;
  }

  var args = [].slice.call(arguments, 3);
  target = target || {};

  for (var key in target) {
    var arr = [key, target[key]].concat(args);
    thisArg[method].apply(thisArg, arr);
  }
  return thisArg;
};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(9);
var visit = __webpack_require__(6);

/**
 * Map `visit` over an array of objects.
 *
 * @param  {Object} `collection` The context in which to invoke `method`
 * @param  {String} `method` Name of the method to call on `collection`
 * @param  {Object} `arr` Array of objects.
 */

module.exports = function mapVisit(collection, method, val) {
  if (isObject(val)) {
    return visit.apply(null, arguments);
  }

  if (!Array.isArray(val)) {
    throw new TypeError('expected an array: ' + util.inspect(val));
  }

  var args = [].slice.call(arguments, 3);

  for (var i = 0; i < val.length; i++) {
    var ele = val[i];
    if (isObject(ele)) {
      visit.apply(null, [collection, method, ele].concat(args));
    } else {
      collection[method].apply(collection, [ele].concat(args));
    }
  }
};

function isObject(val) {
  return val && (typeof val === 'function' || (!Array.isArray(val) && typeof val === 'object'));
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-own-deep <https://github.com/jonschlinkert/has-own-deep>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */



const hasOwn = Object.prototype.hasOwnProperty;
const isObject = __webpack_require__(7);

module.exports = function(target, path) {
  if (!isObject(target) && !Array.isArray(target)) {
    throw new TypeError('expected the first argument to be an object or array');
  }

  if (typeof path !== 'string') {
    throw new TypeError('expected object path to be a string');
  }

  if (hasOwn.call(target, path)) {
    return true;
  }

  let segs = Array.isArray(path) ? path : path.split(/\\?\./);
  let obj = target;

  while ((isObject(obj) || Array.isArray(obj)) && segs.length) {
    if (hasOwn.call(obj, segs[0])) {
      obj = obj[segs.shift()];
      continue;
    }

    let rest = segs.slice();
    let has = false;

    do {
      const prop = rest.join('.');

      if ((has = hasOwn.call(obj, prop))) {
        segs = segs.slice(rest.length);
        obj = obj[prop];
        break;
      }

      rest.pop();
    } while (rest.length);


    if (!has) {
      return false;
    }
  }

  return true;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(12);
var union = __webpack_require__(13);
var get = __webpack_require__(14);
var set = __webpack_require__(15);

module.exports = function unionValue(obj, prop, value) {
  if (!isObject(obj)) {
    throw new TypeError('union-value expects the first argument to be an object.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('union-value expects `prop` to be a string.');
  }

  var arr = arrayify(get(obj, prop));
  set(obj, prop, union(arr, arrayify(value)));
  return obj;
};

function arrayify(val) {
  if (val === null || typeof val === 'undefined') {
    return [];
  }
  if (Array.isArray(val)) {
    return val;
  }
  return [val];
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function isExtendable(val) {
  return typeof val !== 'undefined' && val !== null
    && (typeof val === 'object' || typeof val === 'function');
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function union(init) {
  if (!Array.isArray(init)) {
    throw new TypeError('arr-union expects the first argument to be an array.');
  }

  var len = arguments.length;
  var i = 0;

  while (++i < len) {
    var arg = arguments[i];
    if (!arg) continue;

    if (!Array.isArray(arg)) {
      arg = [arg];
    }

    for (var j = 0; j < arg.length; j++) {
      var ele = arg[j];

      if (init.indexOf(ele) >= 0) {
        continue;
      }
      init.push(ele);
    }
  }
  return init;
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

module.exports = function(obj, prop, a, b, c) {
  if (!isObject(obj) || !prop) {
    return obj;
  }

  prop = toString(prop);

  // allowing for multiple properties to be passed as
  // a string or array, but much faster (3-4x) than doing
  // `[].slice.call(arguments)`
  if (a) prop += '.' + toString(a);
  if (b) prop += '.' + toString(b);
  if (c) prop += '.' + toString(c);

  if (prop in obj) {
    return obj[prop];
  }

  var segs = prop.split('.');
  var len = segs.length;
  var i = -1;

  while (obj && (++i < len)) {
    var key = segs[i];
    while (key[key.length - 1] === '\\') {
      key = key.slice(0, -1) + '.' + segs[++i];
    }
    obj = obj[key];
  }
  return obj;
};

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

function toString(val) {
  if (!val) return '';
  if (Array.isArray(val)) {
    return val.join('.');
  }
  return val;
}


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var split = __webpack_require__(16);
var extend = __webpack_require__(21);
var isPlainObject = __webpack_require__(19);
var isObject = __webpack_require__(12);

module.exports = function(obj, prop, val) {
  if (!isObject(obj)) {
    return obj;
  }

  if (Array.isArray(prop)) {
    prop = [].concat.apply([], prop).join('.');
  }

  if (typeof prop !== 'string') {
    return obj;
  }

  var keys = split(prop, {sep: '.', brackets: true}).filter(isValidKey);
  var len = keys.length;
  var idx = -1;
  var current = obj;

  while (++idx < len) {
    var key = keys[idx];
    if (idx !== len - 1) {
      if (!isObject(current[key])) {
        current[key] = {};
      }
      current = current[key];
      continue;
    }

    if (isPlainObject(current[key]) && isPlainObject(val)) {
      current[key] = extend({}, current[key], val);
    } else {
      current[key] = val;
    }
  }

  return obj;
};

function isValidKey(key) {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * split-string <https://github.com/jonschlinkert/split-string>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var extend = __webpack_require__(17);

module.exports = function(str, options, fn) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  if (typeof options === 'function') {
    fn = options;
    options = null;
  }

  // allow separator to be defined as a string
  if (typeof options === 'string') {
    options = { sep: options };
  }

  var opts = extend({sep: '.'}, options);
  var quotes = opts.quotes || ['"', "'", '`'];
  var brackets;

  if (opts.brackets === true) {
    brackets = {
      '<': '>',
      '(': ')',
      '[': ']',
      '{': '}'
    };
  } else if (opts.brackets) {
    brackets = opts.brackets;
  }

  var tokens = [];
  var stack = [];
  var arr = [''];
  var sep = opts.sep;
  var len = str.length;
  var idx = -1;
  var closeIdx;

  function expected() {
    if (brackets && stack.length) {
      return brackets[stack[stack.length - 1]];
    }
  }

  while (++idx < len) {
    var ch = str[idx];
    var next = str[idx + 1];
    var tok = { val: ch, idx: idx, arr: arr, str: str };
    tokens.push(tok);

    if (ch === '\\') {
      tok.val = keepEscaping(opts, str, idx) === true ? (ch + next) : next;
      tok.escaped = true;
      if (typeof fn === 'function') {
        fn(tok);
      }
      arr[arr.length - 1] += tok.val;
      idx++;
      continue;
    }

    if (brackets && brackets[ch]) {
      stack.push(ch);
      var e = expected();
      var i = idx + 1;

      if (str.indexOf(e, i + 1) !== -1) {
        while (stack.length && i < len) {
          var s = str[++i];
          if (s === '\\') {
            s++;
            continue;
          }

          if (quotes.indexOf(s) !== -1) {
            i = getClosingQuote(str, s, i + 1);
            continue;
          }

          e = expected();
          if (stack.length && str.indexOf(e, i + 1) === -1) {
            break;
          }

          if (brackets[s]) {
            stack.push(s);
            continue;
          }

          if (e === s) {
            stack.pop();
          }
        }
      }

      closeIdx = i;
      if (closeIdx === -1) {
        arr[arr.length - 1] += ch;
        continue;
      }

      ch = str.slice(idx, closeIdx + 1);
      tok.val = ch;
      tok.idx = idx = closeIdx;
    }

    if (quotes.indexOf(ch) !== -1) {
      closeIdx = getClosingQuote(str, ch, idx + 1);
      if (closeIdx === -1) {
        arr[arr.length - 1] += ch;
        continue;
      }

      if (keepQuotes(ch, opts) === true) {
        ch = str.slice(idx, closeIdx + 1);
      } else {
        ch = str.slice(idx + 1, closeIdx);
      }

      tok.val = ch;
      tok.idx = idx = closeIdx;
    }

    if (typeof fn === 'function') {
      fn(tok, tokens);
      ch = tok.val;
      idx = tok.idx;
    }

    if (tok.val === sep && tok.split !== false) {
      arr.push('');
      continue;
    }

    arr[arr.length - 1] += tok.val;
  }

  return arr;
};

function getClosingQuote(str, ch, i, brackets) {
  var idx = str.indexOf(ch, i);
  if (str.charAt(idx - 1) === '\\') {
    return getClosingQuote(str, ch, idx + 1);
  }
  return idx;
}

function keepQuotes(ch, opts) {
  if (opts.keepDoubleQuotes === true && ch === '"') return true;
  if (opts.keepSingleQuotes === true && ch === "'") return true;
  return opts.keepQuotes;
}

function keepEscaping(opts, str, idx) {
  if (typeof opts.keepEscaping === 'function') {
    return opts.keepEscaping(str, idx);
  }
  return opts.keepEscaping === true || str[idx + 1] === '\\';
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isExtendable = __webpack_require__(18);
var assignSymbols = __webpack_require__(20);

module.exports = Object.assign || function(obj/*, objects*/) {
  if (obj === null || typeof obj === 'undefined') {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  if (!isObject(obj)) {
    obj = {};
  }
  for (var i = 1; i < arguments.length; i++) {
    var val = arguments[i];
    if (isString(val)) {
      val = toObject(val);
    }
    if (isObject(val)) {
      assign(obj, val);
      assignSymbols(obj, val);
    }
  }
  return obj;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

function isString(val) {
  return (val && typeof val === 'string');
}

function toObject(str) {
  var obj = {};
  for (var i in str) {
    obj[i] = str[i];
  }
  return obj;
}

function isObject(val) {
  return (val && typeof val === 'object') || isExtendable(val);
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function isEnum(obj, key) {
  return Object.prototype.propertyIsEnumerable.call(obj, key);
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isPlainObject = __webpack_require__(19);

module.exports = function isExtendable(val) {
  return isPlainObject(val) || typeof val === 'function' || Array.isArray(val);
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(7);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function(receiver, objects) {
  if (receiver === null || typeof receiver === 'undefined') {
    throw new TypeError('expected first argument to be an object.');
  }

  if (typeof objects === 'undefined' || typeof Symbol === 'undefined') {
    return receiver;
  }

  if (typeof Object.getOwnPropertySymbols !== 'function') {
    return receiver;
  }

  var isEnumerable = Object.prototype.propertyIsEnumerable;
  var target = Object(receiver);
  var len = arguments.length, i = 0;

  while (++i < len) {
    var provider = Object(arguments[i]);
    var names = Object.getOwnPropertySymbols(provider);

    for (var j = 0; j < names.length; j++) {
      var key = names[j];

      if (isEnumerable.call(provider, key)) {
        target[key] = provider[key];
      }
    }
  }
  return target;
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(12);

module.exports = function extend(o/*, objects*/) {
  if (!isObject(o)) { o = {}; }

  var len = arguments.length;
  for (var i = 1; i < len; i++) {
    var obj = arguments[i];

    if (isObject(obj)) {
      assign(o, obj);
    }
  }
  return o;
};

function assign(a, b) {
  for (var key in b) {
    if (hasOwn(b, key)) {
      a[key] = b[key];
    }
  }
}

/**
 * Returns true if the given `key` is an own property of `obj`.
 */

function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * unset-value <https://github.com/jonschlinkert/unset-value>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(7);
var has = __webpack_require__(23);

module.exports = function unset(obj, prop) {
  if (!isObject(obj)) {
    throw new TypeError('expected an object.');
  }
  if (obj.hasOwnProperty(prop)) {
    delete obj[prop];
    return true;
  }

  if (has(obj, prop)) {
    var segs = prop.split('.');
    var last = segs.pop();
    while (segs.length && segs[segs.length - 1].slice(-1) === '\\') {
      last = segs.pop().slice(0, -1) + '.' + last;
    }
    while (segs.length) obj = obj[prop = segs.shift()];
    return (delete obj[last]);
  }
  return true;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isObject = __webpack_require__(24);
var hasValues = __webpack_require__(26);
var get = __webpack_require__(27);

module.exports = function(obj, prop, noZero) {
  if (isObject(obj)) {
    return hasValues(get(obj, prop), noZero);
  }
  return hasValues(obj, prop);
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isArray = __webpack_require__(25);

module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && isArray(val) === false;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-values <https://github.com/jonschlinkert/has-values>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function hasValue(o, noZero) {
  if (o === null || o === undefined) {
    return false;
  }

  if (typeof o === 'boolean') {
    return true;
  }

  if (typeof o === 'number') {
    if (o === 0 && noZero === true) {
      return false;
    }
    return true;
  }

  if (o.length !== undefined) {
    return o.length !== 0;
  }

  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

module.exports = function(obj, prop, a, b, c) {
  if (!isObject(obj) || !prop) {
    return obj;
  }

  prop = toString(prop);

  // allowing for multiple properties to be passed as
  // a string or array, but much faster (3-4x) than doing
  // `[].slice.call(arguments)`
  if (a) prop += '.' + toString(a);
  if (b) prop += '.' + toString(b);
  if (c) prop += '.' + toString(c);

  if (prop in obj) {
    return obj[prop];
  }

  var segs = prop.split('.');
  var len = segs.length;
  var i = -1;

  while (obj && (++i < len)) {
    var key = segs[i];
    while (key[key.length - 1] === '\\') {
      key = key.slice(0, -1) + '.' + segs[++i];
    }
    obj = obj[key];
  }
  return obj;
};

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

function toString(val) {
  if (!val) return '';
  if (Array.isArray(val)) {
    return val.join('.');
  }
  return val;
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * get-value <https://github.com/jonschlinkert/get-value>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

const isObject = __webpack_require__(7);

module.exports = function(target, path, options) {
  if (!isObject(options)) {
    options = { default: options };
  }

  if (!isValidObject(target)) {
    return typeof options.default !== 'undefined' ? options.default : target;
  }

  if (typeof path === 'number') {
    path = String(path);
  }

  const isArray = Array.isArray(path);
  const isString = typeof path === 'string';
  const splitChar = options.separator || '.';
  const joinChar = options.joinChar || (typeof splitChar === 'string' ? splitChar : '.');

  if (!isString && !isArray) {
    return target;
  }

  if (isString && path in target) {
    return isValid(path, target, options) ? target[path] : options.default;
  }

  let segs = isArray ? path : split(path, splitChar, options);
  let len = segs.length;
  let idx = 0;

  do {
    let prop = segs[idx];
    if (typeof prop === 'number') {
      prop = String(prop);
    }

    while (prop && prop.slice(-1) === '\\') {
      prop = join([prop.slice(0, -1), segs[++idx] || ''], joinChar, options);
    }

    if (prop in target) {
      if (!isValid(prop, target, options)) {
        return options.default;
      }

      target = target[prop];
    } else {
      let hasProp = false;
      let n = idx + 1;

      while (n < len) {
        prop = join([prop, segs[n++]], joinChar, options);

        if ((hasProp = prop in target)) {
          if (!isValid(prop, target, options)) {
            return options.default;
          }

          target = target[prop];
          idx = n - 1;
          break;
        }
      }

      if (!hasProp) {
        return options.default;
      }
    }
  } while (++idx < len && isValidObject(target));

  if (idx === len) {
    return target;
  }

  return options.default;
};

function join(segs, joinChar, options) {
  if (typeof options.join === 'function') {
    return options.join(segs);
  }
  return segs[0] + joinChar + segs[1];
}

function split(path, splitChar, options) {
  if (typeof options.split === 'function') {
    return options.split(path);
  }
  return path.split(splitChar);
}

function isValid(key, target, options) {
  if (typeof options.isValid === 'function') {
    return options.isValid(key, target);
  }
  return true;
}

function isValidObject(val) {
  return isObject(val) || Array.isArray(val) || typeof val === 'function';
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */



const isPlain = __webpack_require__(19);

function set(target, path, value, options) {
  if (!isObject(target)) {
    return target;
  }

  let opts = options || {};
  const isArray = Array.isArray(path);
  if (!isArray && typeof path !== 'string') {
    return target;
  }

  let merge = opts.merge;
  if (merge && typeof merge !== 'function') {
    merge = Object.assign;
  }

  const keys = (isArray ? path : split(path, opts)).filter(isValidKey);
  const len = keys.length;
  const orig = target;

  if (!options && keys.length === 1) {
    result(target, keys[0], value, merge);
    return target;
  }

  for (let i = 0; i < len; i++) {
    let prop = keys[i];

    if (!isObject(target[prop])) {
      target[prop] = {};
    }

    if (i === len - 1) {
      result(target, prop, value, merge);
      break;
    }

    target = target[prop];
  }

  return orig;
}

function result(target, path, value, merge) {
  if (merge && isPlain(target[path]) && isPlain(value)) {
    target[path] = merge({}, target[path], value);
  } else {
    target[path] = value;
  }
}

function split(path, options) {
  const id = createKey(path, options);
  if (set.memo[id]) return set.memo[id];

  const char = (options && options.separator) ? options.separator : '.';
  let keys = [];
  let res = [];

  if (options && typeof options.split === 'function') {
    keys = options.split(path);
  } else {
    keys = path.split(char);
  }

  for (let i = 0; i < keys.length; i++) {
    let prop = keys[i];
    while (prop && prop.slice(-1) === '\\' && keys[i + 1]) {
      prop = prop.slice(0, -1) + char + keys[++i];
    }
    res.push(prop);
  }
  set.memo[id] = res;
  return res;
}

function createKey(pattern, options) {
  let id = pattern;
  if (typeof options === 'undefined') {
    return id + '';
  }
  const keys = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    id += ';' + key + '=' + String(options[key]);
  }
  return id;
}

function isValidKey(key) {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

set.memo = {};
module.exports = set;


/***/ })
/******/ ]);
