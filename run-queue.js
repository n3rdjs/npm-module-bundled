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

module.exports = RunQueue

var validate = __webpack_require__(3)

function RunQueue (opts) {
  validate('Z|O', [opts])
  if (!opts) opts = {}
  this.finished = false
  this.inflight = 0
  this.maxConcurrency = opts.maxConcurrency || 1
  this.queued = 0
  this.queue = []
  this.currentPrio = null
  this.currentQueue = null
  this.Promise = opts.Promise || global.Promise
  this.deferred = {}
}

RunQueue.prototype = {}

RunQueue.prototype.run = function () {
  if (arguments.length !== 0) throw new Error('RunQueue.run takes no arguments')
  var self = this
  var deferred = this.deferred
  if (!deferred.promise) {
    deferred.promise = new this.Promise(function (resolve, reject) {
      deferred.resolve = resolve
      deferred.reject = reject
      self._runQueue()
    })
  }
  return deferred.promise
}

RunQueue.prototype._runQueue = function () {
  var self = this

  while ((this.inflight < this.maxConcurrency) && this.queued) {
    if (!this.currentQueue || this.currentQueue.length === 0) {
      // wait till the current priority is entirely processed before
      // starting a new one
      if (this.inflight) return
      var prios = Object.keys(this.queue)
      for (var ii = 0; ii < prios.length; ++ii) {
        var prioQueue = this.queue[prios[ii]]
        if (prioQueue.length > 0) {
          this.currentQueue = prioQueue
          this.currentPrio = prios[ii]
          break
        }
      }
    }

    --this.queued
    ++this.inflight
    var next = this.currentQueue.shift()
    var args = next.args || []

    // we explicitly construct a promise here so that queue items can throw
    // or immediately return to resolve
    var queueEntry = new this.Promise(function (resolve) {
      resolve(next.cmd.apply(null, args))
    })

    queueEntry.then(function () {
      --self.inflight
      if (self.finished) return
      if (self.queued <= 0 && self.inflight <= 0) {
        self.finished = true
        self.deferred.resolve()
      }
      self._runQueue()
    }, function (err) {
      self.finished = true
      self.deferred.reject(err)
    })
  }
}

RunQueue.prototype.add = function (prio, cmd, args) {
  if (this.finished) throw new Error("Can't add to a finished queue. Create a new queue.")
  if (Math.abs(Math.floor(prio)) !== prio) throw new Error('Priorities must be a positive integer value.')
  validate('NFA|NFZ', [prio, cmd, args])
  prio = Number(prio)
  if (!this.queue[prio]) this.queue[prio] = []
  ++this.queued
  this.queue[prio].push({cmd: cmd, args: args})
  // if this priority is higher than the one we're currently processing,
  // switch back to processing its queue.
  if (this.currentPrio > prio) {
    this.currentQueue = this.queue[prio]
    this.currentPrio = prio
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = validate

function isArguments (thingy) {
  return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee')
}

const types = {
  '*': {label: 'any', check: () => true},
  A: {label: 'array', check: _ => Array.isArray(_) || isArguments(_)},
  S: {label: 'string', check: _ => typeof _ === 'string'},
  N: {label: 'number', check: _ => typeof _ === 'number'},
  F: {label: 'function', check: _ => typeof _ === 'function'},
  O: {label: 'object', check: _ => typeof _ === 'object' && _ != null && !types.A.check(_) && !types.E.check(_)},
  B: {label: 'boolean', check: _ => typeof _ === 'boolean'},
  E: {label: 'error', check: _ => _ instanceof Error},
  Z: {label: 'null', check: _ => _ == null}
}

function addSchema (schema, arity) {
  const group = arity[schema.length] = arity[schema.length] || []
  if (group.indexOf(schema) === -1) group.push(schema)
}

function validate (rawSchemas, args) {
  if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
  if (!rawSchemas) throw missingRequiredArg(0, 'rawSchemas')
  if (!args) throw missingRequiredArg(1, 'args')
  if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
  if (!types.A.check(args)) throw invalidType(1, ['array'], args)
  const schemas = rawSchemas.split('|')
  const arity = {}

  schemas.forEach(schema => {
    for (let ii = 0; ii < schema.length; ++ii) {
      const type = schema[ii]
      if (!types[type]) throw unknownType(ii, type)
    }
    if (/E.*E/.test(schema)) throw moreThanOneError(schema)
    addSchema(schema, arity)
    if (/E/.test(schema)) {
      addSchema(schema.replace(/E.*$/, 'E'), arity)
      addSchema(schema.replace(/E/, 'Z'), arity)
      if (schema.length === 1) addSchema('', arity)
    }
  })
  let matching = arity[args.length]
  if (!matching) {
    throw wrongNumberOfArgs(Object.keys(arity), args.length)
  }
  for (let ii = 0; ii < args.length; ++ii) {
    let newMatching = matching.filter(schema => {
      const type = schema[ii]
      const typeCheck = types[type].check
      return typeCheck(args[ii])
    })
    if (!newMatching.length) {
      const labels = matching.map(_ => types[_[ii]].label).filter(_ => _ != null)
      throw invalidType(ii, labels, args[ii])
    }
    matching = newMatching
  }
}

function missingRequiredArg (num) {
  return newException('EMISSINGARG', 'Missing required argument #' + (num + 1))
}

function unknownType (num, type) {
  return newException('EUNKNOWNTYPE', 'Unknown type ' + type + ' in argument #' + (num + 1))
}

function invalidType (num, expectedTypes, value) {
  let valueType
  Object.keys(types).forEach(typeCode => {
    if (types[typeCode].check(value)) valueType = types[typeCode].label
  })
  return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' +
    englishList(expectedTypes) + ' but got ' + valueType)
}

function englishList (list) {
  return list.join(', ').replace(/, ([^,]+)$/, ' or $1')
}

function wrongNumberOfArgs (expected, got) {
  const english = englishList(expected)
  const args = expected.every(ex => ex.length === 1)
    ? 'argument'
    : 'arguments'
  return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got)
}

function moreThanOneError (schema) {
  return newException('ETOOMANYERRORTYPES',
    'Only one error type per argument signature is allowed, more than one found in "' + schema + '"')
}

function newException (code, msg) {
  const err = new Error(msg)
  err.code = code
  /* istanbul ignore else */
  if (Error.captureStackTrace) Error.captureStackTrace(err, validate)
  return err
}


/***/ })
/******/ ]);
