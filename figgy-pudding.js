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


class FiggyPudding {
  constructor (specs, opts, providers) {
    this.__specs = specs || {}
    Object.keys(this.__specs).forEach(alias => {
      if (typeof this.__specs[alias] === 'string') {
        const key = this.__specs[alias]
        const realSpec = this.__specs[key]
        if (realSpec) {
          const aliasArr = realSpec.aliases || []
          aliasArr.push(alias, key)
          realSpec.aliases = [...(new Set(aliasArr))]
          this.__specs[alias] = realSpec
        } else {
          throw new Error(`Alias refers to invalid key: ${key} -> ${alias}`)
        }
      }
    })
    this.__opts = opts || {}
    this.__providers = reverse((providers).filter(
      x => x != null && typeof x === 'object'
    ))
    this.__isFiggyPudding = true
  }
  get (key) {
    return pudGet(this, key, true)
  }
  get [Symbol.toStringTag] () { return 'FiggyPudding' }
  forEach (fn, thisArg = this) {
    for (let [key, value] of this.entries()) {
      fn.call(thisArg, value, key, this)
    }
  }
  toJSON () {
    const obj = {}
    this.forEach((val, key) => {
      obj[key] = val
    })
    return obj
  }
  * entries (_matcher) {
    for (let key of Object.keys(this.__specs)) {
      yield [key, this.get(key)]
    }
    const matcher = _matcher || this.__opts.other
    if (matcher) {
      const seen = new Set()
      for (let p of this.__providers) {
        const iter = p.entries ? p.entries(matcher) : entries(p)
        for (let [key, val] of iter) {
          if (matcher(key) && !seen.has(key)) {
            seen.add(key)
            yield [key, val]
          }
        }
      }
    }
  }
  * [Symbol.iterator] () {
    for (let [key, value] of this.entries()) {
      yield [key, value]
    }
  }
  * keys () {
    for (let [key] of this.entries()) {
      yield key
    }
  }
  * values () {
    for (let [, value] of this.entries()) {
      yield value
    }
  }
  concat (...moreConfig) {
    return new Proxy(new FiggyPudding(
      this.__specs,
      this.__opts,
      reverse(this.__providers).concat(moreConfig)
    ), proxyHandler)
  }
}
try {
  const util = __webpack_require__(3)
  FiggyPudding.prototype[util.inspect.custom] = function (depth, opts) {
    return (
      this[Symbol.toStringTag] + ' '
    ) + util.inspect(this.toJSON(), opts)
  }
} catch (e) {}

function BadKeyError (key) {
  throw Object.assign(new Error(
    `invalid config key requested: ${key}`
  ), {code: 'EBADKEY'})
}

function pudGet (pud, key, validate) {
  let spec = pud.__specs[key]
  if (validate && !spec && (!pud.__opts.other || !pud.__opts.other(key))) {
    BadKeyError(key)
  } else {
    if (!spec) { spec = {} }
    let ret
    for (let p of pud.__providers) {
      ret = tryGet(key, p)
      if (ret === undefined && spec.aliases && spec.aliases.length) {
        for (let alias of spec.aliases) {
          if (alias === key) { continue }
          ret = tryGet(alias, p)
          if (ret !== undefined) {
            break
          }
        }
      }
      if (ret !== undefined) {
        break
      }
    }
    if (ret === undefined && spec.default !== undefined) {
      if (typeof spec.default === 'function') {
        return spec.default(pud)
      } else {
        return spec.default
      }
    } else {
      return ret
    }
  }
}

function tryGet (key, p) {
  let ret
  if (p.__isFiggyPudding) {
    ret = pudGet(p, key, false)
  } else if (typeof p.get === 'function') {
    ret = p.get(key)
  } else {
    ret = p[key]
  }
  return ret
}

const proxyHandler = {
  has (obj, prop) {
    return prop in obj.__specs && pudGet(obj, prop, false) !== undefined
  },
  ownKeys (obj) {
    return Object.keys(obj.__specs)
  },
  get (obj, prop) {
    if (
      typeof prop === 'symbol' ||
      prop.slice(0, 2) === '__' ||
      prop in FiggyPudding.prototype
    ) {
      return obj[prop]
    }
    return obj.get(prop)
  },
  set (obj, prop, value) {
    if (
      typeof prop === 'symbol' ||
      prop.slice(0, 2) === '__'
    ) {
      obj[prop] = value
      return true
    } else {
      throw new Error('figgyPudding options cannot be modified. Use .concat() instead.')
    }
  },
  deleteProperty () {
    throw new Error('figgyPudding options cannot be deleted. Use .concat() and shadow them instead.')
  }
}

module.exports = figgyPudding
function figgyPudding (specs, opts) {
  function factory (...providers) {
    return new Proxy(new FiggyPudding(
      specs,
      opts,
      providers
    ), proxyHandler)
  }
  return factory
}

function reverse (arr) {
  const ret = []
  arr.forEach(x => ret.unshift(x))
  return ret
}

function entries (obj) {
  return Object.keys(obj).map(k => [k, obj[k]])
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })
/******/ ]);
