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


const Farm = __webpack_require__(3)

let farms = [] // keep record of farms so we can end() them if required


function farm (options, path, methods) {
  if (typeof options == 'string') {
    methods = path
    path = options
    options = {}
  }

  let f   = new Farm(options, path)
    , api = f.setup(methods)

  farms.push({ farm: f, api: api })

  // return the public API
  return api
}


function end (api, callback) {
  for (let i = 0; i < farms.length; i++)
    if (farms[i] && farms[i].api === api)
      return farms[i].farm.end(callback)
  process.nextTick(callback.bind(null, new Error('Worker farm not found!')))
}


module.exports     = farm
module.exports.end = end


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const DEFAULT_OPTIONS = {
          workerOptions               : {}
        , maxCallsPerWorker           : Infinity
        , maxConcurrentWorkers        : (__webpack_require__(4).cpus() || { length: 1 }).length
        , maxConcurrentCallsPerWorker : 10
        , maxConcurrentCalls          : Infinity
        , maxCallTime                 : Infinity // exceed this and the whole worker is terminated
        , maxRetries                  : Infinity
        , forcedKillTime              : 100
        , autoStart                   : false
        , onChild                     : function() {}
      }

const fork                    = __webpack_require__(5)
    , TimeoutError            = __webpack_require__(9).create('TimeoutError')
    , ProcessTerminatedError  = __webpack_require__(9).create('ProcessTerminatedError')
    , MaxConcurrentCallsError = __webpack_require__(9).create('MaxConcurrentCallsError')


function Farm (options, path) {
  this.options     = Object.assign({}, DEFAULT_OPTIONS, options)
  this.path        = path
  this.activeCalls = 0
}


// make a handle to pass back in the form of an external API
Farm.prototype.mkhandle = function (method) {
  return function () {
    let args = Array.prototype.slice.call(arguments)
    if (this.activeCalls + this.callQueue.length >= this.options.maxConcurrentCalls) {
      let err = new MaxConcurrentCallsError('Too many concurrent calls (active: ' + this.activeCalls + ', queued: ' + this.callQueue.length + ')')
      if (typeof args[args.length - 1] == 'function')
        return process.nextTick(args[args.length - 1].bind(null, err))
      throw err
    }
    this.addCall({
        method   : method
      , callback : args.pop()
      , args     : args
      , retries  : 0
    })
  }.bind(this)
}


// a constructor of sorts
Farm.prototype.setup = function (methods) {
  let iface
  if (!methods) { // single-function export
    iface = this.mkhandle()
  } else { // multiple functions on the export
    iface = {}
    methods.forEach(function (m) {
      iface[m] = this.mkhandle(m)
    }.bind(this))
  }

  this.searchStart    = -1
  this.childId        = -1
  this.children       = {}
  this.activeChildren = 0
  this.callQueue      = []

  if (this.options.autoStart) {
    while (this.activeChildren < this.options.maxConcurrentWorkers)
      this.startChild()
  }

  return iface
}


// when a child exits, check if there are any outstanding jobs and requeue them
Farm.prototype.onExit = function (childId) {
  // delay this to give any sends a chance to finish
  setTimeout(function () {
    let doQueue = false
    if (this.children[childId] && this.children[childId].activeCalls) {
      this.children[childId].calls.forEach(function (call, i) {
        if (!call) return
        else if (call.retries >= this.options.maxRetries) {
          this.receive({
              idx   : i
            , child : childId
            , args  : [ new ProcessTerminatedError('cancel after ' + call.retries + ' retries!') ]
          })
        } else {
          call.retries++
          this.callQueue.unshift(call)
          doQueue = true
        }
      }.bind(this))
    }
    this.stopChild(childId)
    doQueue && this.processQueue()
  }.bind(this), 10)
}


// start a new worker
Farm.prototype.startChild = function () {
  this.childId++

  let forked = fork(this.path, this.options.workerOptions)
    , id     = this.childId
    , c      = {
          send        : forked.send
        , child       : forked.child
        , calls       : []
        , activeCalls : 0
        , exitCode    : null
      }

  this.options.onChild(forked.child);

  forked.child.on('message', function(data) {
    if (data.owner !== 'farm') {
      return;
    }
    this.receive(data);
  }.bind(this))
  forked.child.once('exit', function (code) {
    c.exitCode = code
    this.onExit(id)
  }.bind(this))

  this.activeChildren++
  this.children[id] = c
}


// stop a worker, identified by id
Farm.prototype.stopChild = function (childId) {
  let child = this.children[childId]
  if (child) {
    child.send({owner: 'farm', event: 'die'})
    setTimeout(function () {
      if (child.exitCode === null)
        child.child.kill('SIGKILL')
    }, this.options.forcedKillTime).unref()
    ;delete this.children[childId]
    this.activeChildren--
  }
}


// called from a child process, the data contains information needed to
// look up the child and the original call so we can invoke the callback
Farm.prototype.receive = function (data) {
  let idx     = data.idx
    , childId = data.child
    , args    = data.args
    , child   = this.children[childId]
    , call

  if (!child) {
    return console.error(
        'Worker Farm: Received message for unknown child. '
      + 'This is likely as a result of premature child death, '
      + 'the operation will have been re-queued.'
    )
  }

  call = child.calls[idx]
  if (!call) {
    return console.error(
        'Worker Farm: Received message for unknown index for existing child. '
      + 'This should not happen!'
    )
  }

  if (this.options.maxCallTime !== Infinity)
    clearTimeout(call.timer)

  if (args[0] && args[0].$error == '$error') {
    let e = args[0]
    switch (e.type) {
      case 'TypeError': args[0] = new TypeError(e.message); break
      case 'RangeError': args[0] = new RangeError(e.message); break
      case 'EvalError': args[0] = new EvalError(e.message); break
      case 'ReferenceError': args[0] = new ReferenceError(e.message); break
      case 'SyntaxError': args[0] = new SyntaxError(e.message); break
      case 'URIError': args[0] = new URIError(e.message); break
      default: args[0] = new Error(e.message)
    }
    args[0].type = e.type
    args[0].stack = e.stack

    // Copy any custom properties to pass it on.
    Object.keys(e).forEach(function(key) {
      args[0][key] = e[key];
    });
  }

  process.nextTick(function () {
    call.callback.apply(null, args)
  })

  ;delete child.calls[idx]
  child.activeCalls--
  this.activeCalls--

  if (child.calls.length >= this.options.maxCallsPerWorker
      && !Object.keys(child.calls).length) {
    // this child has finished its run, kill it
    this.stopChild(childId)
  }

  // allow any outstanding calls to be processed
  this.processQueue()
}


Farm.prototype.childTimeout = function (childId) {
  let child = this.children[childId]
    , i

  if (!child)
    return

  for (i in child.calls) {
    this.receive({
        idx   : i
      , child : childId
      , args  : [ new TimeoutError('worker call timed out!') ]
    })
  }
  this.stopChild(childId)
}


// send a call to a worker, identified by id
Farm.prototype.send = function (childId, call) {
  let child = this.children[childId]
    , idx   = child.calls.length

  child.calls.push(call)
  child.activeCalls++
  this.activeCalls++

  child.send({
      owner  : 'farm'
    , idx    : idx
    , child  : childId
    , method : call.method
    , args   : call.args
  })

  if (this.options.maxCallTime !== Infinity) {
    call.timer =
      setTimeout(this.childTimeout.bind(this, childId), this.options.maxCallTime)
  }
}


// a list of active worker ids, in order, but the starting offset is
// shifted each time this method is called, so we work our way through
// all workers when handing out jobs
Farm.prototype.childKeys = function () {
  let cka = Object.keys(this.children)
    , cks

  if (this.searchStart >= cka.length - 1)
    this.searchStart = 0
  else
    this.searchStart++

  cks = cka.splice(0, this.searchStart)

  return cka.concat(cks)
}


// Calls are added to a queue, this processes the queue and is called
// whenever there might be a chance to send more calls to the workers.
// The various options all impact on when we're able to send calls,
// they may need to be kept in a queue until a worker is ready.
Farm.prototype.processQueue = function () {
  let cka, i = 0, childId

  if (!this.callQueue.length)
    return this.ending && this.end()

  if (this.activeChildren < this.options.maxConcurrentWorkers)
    this.startChild()

  for (cka = this.childKeys(); i < cka.length; i++) {
    childId = +cka[i]
    if (this.children[childId].activeCalls < this.options.maxConcurrentCallsPerWorker
        && this.children[childId].calls.length < this.options.maxCallsPerWorker) {

      this.send(childId, this.callQueue.shift())
      if (!this.callQueue.length)
        return this.ending && this.end()
    } /*else {
      console.log(
        , this.children[childId].activeCalls < this.options.maxConcurrentCallsPerWorker
        , this.children[childId].calls.length < this.options.maxCallsPerWorker
        , this.children[childId].calls.length , this.options.maxCallsPerWorker)
    }*/
  }

  if (this.ending)
    this.end()
}


// add a new call to the call queue, then trigger a process of the queue
Farm.prototype.addCall = function (call) {
  if (this.ending)
    return this.end() // don't add anything new to the queue
  this.callQueue.push(call)
  this.processQueue()
}


// kills child workers when they're all done
Farm.prototype.end = function (callback) {
  let complete = true
  if (this.ending === false)
    return
  if (callback)
    this.ending = callback
  else if (this.ending == null)
    this.ending = true
  Object.keys(this.children).forEach(function (child) {
    if (!this.children[child])
      return
    if (!this.children[child].activeCalls)
      this.stopChild(child)
    else
      complete = false
  }.bind(this))

  if (complete && typeof this.ending == 'function') {
    process.nextTick(function () {
      this.ending()
      this.ending = false
    }.bind(this))
  }
}


module.exports              = Farm
module.exports.TimeoutError = TimeoutError


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const childProcess = __webpack_require__(6)
    , childModule  = /*require.resolve*/(7)


function fork (forkModule, workerOptions) {
  // suppress --debug / --inspect flags while preserving others (like --harmony)
  let filteredArgs = process.execArgv.filter(function (v) {
        return !(/^--(debug|inspect)/).test(v)
      })
    , options       = Object.assign({
          execArgv : filteredArgs
        , env      : process.env
        , cwd      : process.cwd()
      }, workerOptions)
    , child         = childProcess.fork(childModule, process.argv, options)

  child.on('error', function() {
    // this *should* be picked up by onExit and the operation requeued
  })

  child.send({ owner: 'farm', module: forkModule })

  // return a send() function for this child
  return {
      send  : child.send.bind(child)
    , child : child
  }
}


module.exports = fork


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


let $module

/*
  let contextProto = this.context;
  while (contextProto = Object.getPrototypeOf(contextProto)) {
    completionGroups.push(Object.getOwnPropertyNames(contextProto));
  }
*/


function handle (data) {
  let idx      = data.idx
    , child    = data.child
    , method   = data.method
    , args     = data.args
    , callback = function () {
        let _args = Array.prototype.slice.call(arguments)
        if (_args[0] instanceof Error) {
          let e = _args[0]
          _args[0] = {
              '$error'  : '$error'
            , 'type'    : e.constructor.name
            , 'message' : e.message
            , 'stack'   : e.stack
          }
          Object.keys(e).forEach(function(key) {
            _args[0][key] = e[key]
          })
        }
        process.send({ owner: 'farm', idx: idx, child: child, args: _args })
      }
    , exec

  if (method == null && typeof $module == 'function')
    exec = $module
  else if (typeof $module[method] == 'function')
    exec = $module[method]

  if (!exec)
    return console.error('NO SUCH METHOD:', method)

  exec.apply(null, args.concat([ callback ]))
}


process.on('message', function (data) {
  if (data.owner !== 'farm') {
    return;
  }

  if (!$module) return $module = __webpack_require__(8)(data.module)
  if (data.event == 'die') return process.exit(0)
  handle(data)
})


/***/ }),
/* 8 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 8;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var all = module.exports.all = [
  {
    errno: -2,
    code: 'ENOENT',
    description: 'no such file or directory'
  },
  {
    errno: -1,
    code: 'UNKNOWN',
    description: 'unknown error'
  },
  {
    errno: 0,
    code: 'OK',
    description: 'success'
  },
  {
    errno: 1,
    code: 'EOF',
    description: 'end of file'
  },
  {
    errno: 2,
    code: 'EADDRINFO',
    description: 'getaddrinfo error'
  },
  {
    errno: 3,
    code: 'EACCES',
    description: 'permission denied'
  },
  {
    errno: 4,
    code: 'EAGAIN',
    description: 'resource temporarily unavailable'
  },
  {
    errno: 5,
    code: 'EADDRINUSE',
    description: 'address already in use'
  },
  {
    errno: 6,
    code: 'EADDRNOTAVAIL',
    description: 'address not available'
  },
  {
    errno: 7,
    code: 'EAFNOSUPPORT',
    description: 'address family not supported'
  },
  {
    errno: 8,
    code: 'EALREADY',
    description: 'connection already in progress'
  },
  {
    errno: 9,
    code: 'EBADF',
    description: 'bad file descriptor'
  },
  {
    errno: 10,
    code: 'EBUSY',
    description: 'resource busy or locked'
  },
  {
    errno: 11,
    code: 'ECONNABORTED',
    description: 'software caused connection abort'
  },
  {
    errno: 12,
    code: 'ECONNREFUSED',
    description: 'connection refused'
  },
  {
    errno: 13,
    code: 'ECONNRESET',
    description: 'connection reset by peer'
  },
  {
    errno: 14,
    code: 'EDESTADDRREQ',
    description: 'destination address required'
  },
  {
    errno: 15,
    code: 'EFAULT',
    description: 'bad address in system call argument'
  },
  {
    errno: 16,
    code: 'EHOSTUNREACH',
    description: 'host is unreachable'
  },
  {
    errno: 17,
    code: 'EINTR',
    description: 'interrupted system call'
  },
  {
    errno: 18,
    code: 'EINVAL',
    description: 'invalid argument'
  },
  {
    errno: 19,
    code: 'EISCONN',
    description: 'socket is already connected'
  },
  {
    errno: 20,
    code: 'EMFILE',
    description: 'too many open files'
  },
  {
    errno: 21,
    code: 'EMSGSIZE',
    description: 'message too long'
  },
  {
    errno: 22,
    code: 'ENETDOWN',
    description: 'network is down'
  },
  {
    errno: 23,
    code: 'ENETUNREACH',
    description: 'network is unreachable'
  },
  {
    errno: 24,
    code: 'ENFILE',
    description: 'file table overflow'
  },
  {
    errno: 25,
    code: 'ENOBUFS',
    description: 'no buffer space available'
  },
  {
    errno: 26,
    code: 'ENOMEM',
    description: 'not enough memory'
  },
  {
    errno: 27,
    code: 'ENOTDIR',
    description: 'not a directory'
  },
  {
    errno: 28,
    code: 'EISDIR',
    description: 'illegal operation on a directory'
  },
  {
    errno: 29,
    code: 'ENONET',
    description: 'machine is not on the network'
  },
  {
    errno: 31,
    code: 'ENOTCONN',
    description: 'socket is not connected'
  },
  {
    errno: 32,
    code: 'ENOTSOCK',
    description: 'socket operation on non-socket'
  },
  {
    errno: 33,
    code: 'ENOTSUP',
    description: 'operation not supported on socket'
  },
  {
    errno: 34,
    code: 'ENOENT',
    description: 'no such file or directory'
  },
  {
    errno: 35,
    code: 'ENOSYS',
    description: 'function not implemented'
  },
  {
    errno: 36,
    code: 'EPIPE',
    description: 'broken pipe'
  },
  {
    errno: 37,
    code: 'EPROTO',
    description: 'protocol error'
  },
  {
    errno: 38,
    code: 'EPROTONOSUPPORT',
    description: 'protocol not supported'
  },
  {
    errno: 39,
    code: 'EPROTOTYPE',
    description: 'protocol wrong type for socket'
  },
  {
    errno: 40,
    code: 'ETIMEDOUT',
    description: 'connection timed out'
  },
  {
    errno: 41,
    code: 'ECHARSET',
    description: 'invalid Unicode character'
  },
  {
    errno: 42,
    code: 'EAIFAMNOSUPPORT',
    description: 'address family for hostname not supported'
  },
  {
    errno: 44,
    code: 'EAISERVICE',
    description: 'servname not supported for ai_socktype'
  },
  {
    errno: 45,
    code: 'EAISOCKTYPE',
    description: 'ai_socktype not supported'
  },
  {
    errno: 46,
    code: 'ESHUTDOWN',
    description: 'cannot send after transport endpoint shutdown'
  },
  {
    errno: 47,
    code: 'EEXIST',
    description: 'file already exists'
  },
  {
    errno: 48,
    code: 'ESRCH',
    description: 'no such process'
  },
  {
    errno: 49,
    code: 'ENAMETOOLONG',
    description: 'name too long'
  },
  {
    errno: 50,
    code: 'EPERM',
    description: 'operation not permitted'
  },
  {
    errno: 51,
    code: 'ELOOP',
    description: 'too many symbolic links encountered'
  },
  {
    errno: 52,
    code: 'EXDEV',
    description: 'cross-device link not permitted'
  },
  {
    errno: 53,
    code: 'ENOTEMPTY',
    description: 'directory not empty'
  },
  {
    errno: 54,
    code: 'ENOSPC',
    description: 'no space left on device'
  },
  {
    errno: 55,
    code: 'EIO',
    description: 'i/o error'
  },
  {
    errno: 56,
    code: 'EROFS',
    description: 'read-only file system'
  },
  {
    errno: 57,
    code: 'ENODEV',
    description: 'no such device'
  },
  {
    errno: 58,
    code: 'ESPIPE',
    description: 'invalid seek'
  },
  {
    errno: 59,
    code: 'ECANCELED',
    description: 'operation canceled'
  }
]

module.exports.errno = {}
module.exports.code = {}

all.forEach(function (error) {
  module.exports.errno[error.errno] = error
  module.exports.code[error.code] = error
})

module.exports.custom = __webpack_require__(10)(module.exports)
module.exports.create = module.exports.custom.createError


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var prr = __webpack_require__(11)

function init (type, message, cause) {
  if (!!message && typeof message != 'string') {
    message = message.message || message.name
  }
  prr(this, {
      type    : type
    , name    : type
      // can be passed just a 'cause'
    , cause   : typeof message != 'string' ? message : cause
    , message : message
  }, 'ewr')
}

// generic prototype, not intended to be actually used - helpful for `instanceof`
function CustomError (message, cause) {
  Error.call(this)
  if (Error.captureStackTrace)
    Error.captureStackTrace(this, this.constructor)
  init.call(this, 'CustomError', message, cause)
}

CustomError.prototype = new Error()

function createError (errno, type, proto) {
  var err = function (message, cause) {
    init.call(this, type, message, cause)
    //TODO: the specificity here is stupid, errno should be available everywhere
    if (type == 'FilesystemError') {
      this.code    = this.cause.code
      this.path    = this.cause.path
      this.errno   = this.cause.errno
      this.message =
        (errno.errno[this.cause.errno]
          ? errno.errno[this.cause.errno].description
          : this.cause.message)
        + (this.cause.path ? ' [' + this.cause.path + ']' : '')
    }
    Error.call(this)
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, err)
  }
  err.prototype = !!proto ? new proto() : new CustomError()
  return err
}

module.exports = function (errno) {
  var ce = function (type, proto) {
    return createError(errno, type, proto)
  }
  return {
      CustomError     : CustomError
    , FilesystemError : ce('FilesystemError')
    , createError     : ce
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*!
  * prr
  * (c) 2013 Rod Vagg <rod@vagg.org>
  * https://github.com/rvagg/prr
  * License: MIT
  */

(function (name, context, definition) {
  if ( true && module.exports)
    module.exports = definition()
  else
    context[name] = definition()
})('prr', this, function() {

  var setProperty = typeof Object.defineProperty == 'function'
      ? function (obj, key, options) {
          Object.defineProperty(obj, key, options)
          return obj
        }
      : function (obj, key, options) { // < es5
          obj[key] = options.value
          return obj
        }

    , makeOptions = function (value, options) {
        var oo = typeof options == 'object'
          , os = !oo && typeof options == 'string'
          , op = function (p) {
              return oo
                ? !!options[p]
                : os
                  ? options.indexOf(p[0]) > -1
                  : false
            }

        return {
            enumerable   : op('enumerable')
          , configurable : op('configurable')
          , writable     : op('writable')
          , value        : value
        }
      }

    , prr = function (obj, key, value, options) {
        var k

        options = makeOptions(value, options)

        if (typeof key == 'object') {
          for (k in key) {
            if (Object.hasOwnProperty.call(key, k)) {
              options.value = key[k]
              setProperty(obj, k, options)
            }
          }
          return obj
        }

        return setProperty(obj, key, options)
      }

  return prr
})

/***/ })
/******/ ]);
