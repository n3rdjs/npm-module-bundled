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

var Progress = __webpack_require__(3)
var Gauge = __webpack_require__(30)
var EE = __webpack_require__(7).EventEmitter
var log = exports = module.exports = new EE()
var util = __webpack_require__(5)

var setBlocking = __webpack_require__(60)
var consoleControl = __webpack_require__(32)

setBlocking(true)
var stream = process.stderr
Object.defineProperty(log, 'stream', {
  set: function (newStream) {
    stream = newStream
    if (this.gauge) this.gauge.setWriteTo(stream, stream)
  },
  get: function () {
    return stream
  }
})

// by default, decide based on tty-ness.
var colorEnabled
log.useColor = function () {
  return colorEnabled != null ? colorEnabled : stream.isTTY
}

log.enableColor = function () {
  colorEnabled = true
  this.gauge.setTheme({hasColor: colorEnabled, hasUnicode: unicodeEnabled})
}
log.disableColor = function () {
  colorEnabled = false
  this.gauge.setTheme({hasColor: colorEnabled, hasUnicode: unicodeEnabled})
}

// default level
log.level = 'info'

log.gauge = new Gauge(stream, {
  enabled: false, // no progress bars unless asked
  theme: {hasColor: log.useColor()},
  template: [
    {type: 'progressbar', length: 20},
    {type: 'activityIndicator', kerning: 1, length: 1},
    {type: 'section', default: ''},
    ':',
    {type: 'logline', kerning: 1, default: ''}
  ]
})

log.tracker = new Progress.TrackerGroup()

// we track this separately as we may need to temporarily disable the
// display of the status bar for our own loggy purposes.
log.progressEnabled = log.gauge.isEnabled()

var unicodeEnabled

log.enableUnicode = function () {
  unicodeEnabled = true
  this.gauge.setTheme({hasColor: this.useColor(), hasUnicode: unicodeEnabled})
}

log.disableUnicode = function () {
  unicodeEnabled = false
  this.gauge.setTheme({hasColor: this.useColor(), hasUnicode: unicodeEnabled})
}

log.setGaugeThemeset = function (themes) {
  this.gauge.setThemeset(themes)
}

log.setGaugeTemplate = function (template) {
  this.gauge.setTemplate(template)
}

log.enableProgress = function () {
  if (this.progressEnabled) return
  this.progressEnabled = true
  this.tracker.on('change', this.showProgress)
  if (this._pause) return
  this.gauge.enable()
}

log.disableProgress = function () {
  if (!this.progressEnabled) return
  this.progressEnabled = false
  this.tracker.removeListener('change', this.showProgress)
  this.gauge.disable()
}

var trackerConstructors = ['newGroup', 'newItem', 'newStream']

var mixinLog = function (tracker) {
  // mixin the public methods from log into the tracker
  // (except: conflicts and one's we handle specially)
  Object.keys(log).forEach(function (P) {
    if (P[0] === '_') return
    if (trackerConstructors.filter(function (C) { return C === P }).length) return
    if (tracker[P]) return
    if (typeof log[P] !== 'function') return
    var func = log[P]
    tracker[P] = function () {
      return func.apply(log, arguments)
    }
  })
  // if the new tracker is a group, make sure any subtrackers get
  // mixed in too
  if (tracker instanceof Progress.TrackerGroup) {
    trackerConstructors.forEach(function (C) {
      var func = tracker[C]
      tracker[C] = function () { return mixinLog(func.apply(tracker, arguments)) }
    })
  }
  return tracker
}

// Add tracker constructors to the top level log object
trackerConstructors.forEach(function (C) {
  log[C] = function () { return mixinLog(this.tracker[C].apply(this.tracker, arguments)) }
})

log.clearProgress = function (cb) {
  if (!this.progressEnabled) return cb && process.nextTick(cb)
  this.gauge.hide(cb)
}

log.showProgress = function (name, completed) {
  if (!this.progressEnabled) return
  var values = {}
  if (name) values.section = name
  var last = log.record[log.record.length - 1]
  if (last) {
    values.subsection = last.prefix
    var disp = log.disp[last.level] || last.level
    var logline = this._format(disp, log.style[last.level])
    if (last.prefix) logline += ' ' + this._format(last.prefix, this.prefixStyle)
    logline += ' ' + last.message.split(/\r?\n/)[0]
    values.logline = logline
  }
  values.completed = completed || this.tracker.completed()
  this.gauge.show(values)
}.bind(log) // bind for use in tracker's on-change listener

// temporarily stop emitting, but don't drop
log.pause = function () {
  this._paused = true
  if (this.progressEnabled) this.gauge.disable()
}

log.resume = function () {
  if (!this._paused) return
  this._paused = false

  var b = this._buffer
  this._buffer = []
  b.forEach(function (m) {
    this.emitLog(m)
  }, this)
  if (this.progressEnabled) this.gauge.enable()
}

log._buffer = []

var id = 0
log.record = []
log.maxRecordSize = 10000
log.log = function (lvl, prefix, message) {
  var l = this.levels[lvl]
  if (l === undefined) {
    return this.emit('error', new Error(util.format(
      'Undefined log level: %j', lvl)))
  }

  var a = new Array(arguments.length - 2)
  var stack = null
  for (var i = 2; i < arguments.length; i++) {
    var arg = a[i - 2] = arguments[i]

    // resolve stack traces to a plain string.
    if (typeof arg === 'object' && arg &&
        (arg instanceof Error) && arg.stack) {

      Object.defineProperty(arg, 'stack', {
        value: stack = arg.stack + '',
        enumerable: true,
        writable: true
      })
    }
  }
  if (stack) a.unshift(stack + '\n')
  message = util.format.apply(util, a)

  var m = { id: id++,
            level: lvl,
            prefix: String(prefix || ''),
            message: message,
            messageRaw: a }

  this.emit('log', m)
  this.emit('log.' + lvl, m)
  if (m.prefix) this.emit(m.prefix, m)

  this.record.push(m)
  var mrs = this.maxRecordSize
  var n = this.record.length - mrs
  if (n > mrs / 10) {
    var newSize = Math.floor(mrs * 0.9)
    this.record = this.record.slice(-1 * newSize)
  }

  this.emitLog(m)
}.bind(log)

log.emitLog = function (m) {
  if (this._paused) {
    this._buffer.push(m)
    return
  }
  if (this.progressEnabled) this.gauge.pulse(m.prefix)
  var l = this.levels[m.level]
  if (l === undefined) return
  if (l < this.levels[this.level]) return
  if (l > 0 && !isFinite(l)) return

  // If 'disp' is null or undefined, use the lvl as a default
  // Allows: '', 0 as valid disp
  var disp = log.disp[m.level] != null ? log.disp[m.level] : m.level
  this.clearProgress()
  m.message.split(/\r?\n/).forEach(function (line) {
    if (this.heading) {
      this.write(this.heading, this.headingStyle)
      this.write(' ')
    }
    this.write(disp, log.style[m.level])
    var p = m.prefix || ''
    if (p) this.write(' ')
    this.write(p, this.prefixStyle)
    this.write(' ' + line + '\n')
  }, this)
  this.showProgress()
}

log._format = function (msg, style) {
  if (!stream) return

  var output = ''
  if (this.useColor()) {
    style = style || {}
    var settings = []
    if (style.fg) settings.push(style.fg)
    if (style.bg) settings.push('bg' + style.bg[0].toUpperCase() + style.bg.slice(1))
    if (style.bold) settings.push('bold')
    if (style.underline) settings.push('underline')
    if (style.inverse) settings.push('inverse')
    if (settings.length) output += consoleControl.color(settings)
    if (style.beep) output += consoleControl.beep()
  }
  output += msg
  if (this.useColor()) {
    output += consoleControl.color('reset')
  }
  return output
}

log.write = function (msg, style) {
  if (!stream) return

  stream.write(this._format(msg, style))
}

log.addLevel = function (lvl, n, style, disp) {
  // If 'disp' is null or undefined, use the lvl as a default
  if (disp == null) disp = lvl
  this.levels[lvl] = n
  this.style[lvl] = style
  if (!this[lvl]) {
    this[lvl] = function () {
      var a = new Array(arguments.length + 1)
      a[0] = lvl
      for (var i = 0; i < arguments.length; i++) {
        a[i + 1] = arguments[i]
      }
      return this.log.apply(this, a)
    }.bind(this)
  }
  this.disp[lvl] = disp
}

log.prefixStyle = { fg: 'magenta' }
log.headingStyle = { fg: 'white', bg: 'black' }

log.style = {}
log.levels = {}
log.disp = {}
log.addLevel('silly', -Infinity, { inverse: true }, 'sill')
log.addLevel('verbose', 1000, { fg: 'blue', bg: 'black' }, 'verb')
log.addLevel('info', 2000, { fg: 'green' })
log.addLevel('timing', 2500, { fg: 'green', bg: 'black' })
log.addLevel('http', 3000, { fg: 'green', bg: 'black' })
log.addLevel('notice', 3500, { fg: 'blue', bg: 'black' })
log.addLevel('warn', 4000, { fg: 'black', bg: 'yellow' }, 'WARN')
log.addLevel('error', 5000, { fg: 'red', bg: 'black' }, 'ERR!')
log.addLevel('silent', Infinity)

// allow 'error' prefix
log.on('error', function () {})


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.TrackerGroup = __webpack_require__(4)
exports.Tracker = __webpack_require__(8)
exports.TrackerStream = __webpack_require__(9)


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(5)
var TrackerBase = __webpack_require__(6)
var Tracker = __webpack_require__(8)
var TrackerStream = __webpack_require__(9)

var TrackerGroup = module.exports = function (name) {
  TrackerBase.call(this, name)
  this.parentGroup = null
  this.trackers = []
  this.completion = {}
  this.weight = {}
  this.totalWeight = 0
  this.finished = false
  this.bubbleChange = bubbleChange(this)
}
util.inherits(TrackerGroup, TrackerBase)

function bubbleChange (trackerGroup) {
  return function (name, completed, tracker) {
    trackerGroup.completion[tracker.id] = completed
    if (trackerGroup.finished) return
    trackerGroup.emit('change', name || trackerGroup.name, trackerGroup.completed(), trackerGroup)
  }
}

TrackerGroup.prototype.nameInTree = function () {
  var names = []
  var from = this
  while (from) {
    names.unshift(from.name)
    from = from.parentGroup
  }
  return names.join('/')
}

TrackerGroup.prototype.addUnit = function (unit, weight) {
  if (unit.addUnit) {
    var toTest = this
    while (toTest) {
      if (unit === toTest) {
        throw new Error(
          'Attempted to add tracker group ' +
          unit.name + ' to tree that already includes it ' +
          this.nameInTree(this))
      }
      toTest = toTest.parentGroup
    }
    unit.parentGroup = this
  }
  this.weight[unit.id] = weight || 1
  this.totalWeight += this.weight[unit.id]
  this.trackers.push(unit)
  this.completion[unit.id] = unit.completed()
  unit.on('change', this.bubbleChange)
  if (!this.finished) this.emit('change', unit.name, this.completion[unit.id], unit)
  return unit
}

TrackerGroup.prototype.completed = function () {
  if (this.trackers.length === 0) return 0
  var valPerWeight = 1 / this.totalWeight
  var completed = 0
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var trackerId = this.trackers[ii].id
    completed += valPerWeight * this.weight[trackerId] * this.completion[trackerId]
  }
  return completed
}

TrackerGroup.prototype.newGroup = function (name, weight) {
  return this.addUnit(new TrackerGroup(name), weight)
}

TrackerGroup.prototype.newItem = function (name, todo, weight) {
  return this.addUnit(new Tracker(name, todo), weight)
}

TrackerGroup.prototype.newStream = function (name, todo, weight) {
  return this.addUnit(new TrackerStream(name, todo), weight)
}

TrackerGroup.prototype.finish = function () {
  this.finished = true
  if (!this.trackers.length) this.addUnit(new Tracker(), 1, true)
  for (var ii = 0; ii < this.trackers.length; ii++) {
    var tracker = this.trackers[ii]
    tracker.finish()
    tracker.removeListener('change', this.bubbleChange)
  }
  this.emit('change', this.name, 1, this)
}

var buffer = '                                  '
TrackerGroup.prototype.debug = function (depth) {
  depth = depth || 0
  var indent = depth ? buffer.substr(0, depth) : ''
  var output = indent + (this.name || 'top') + ': ' + this.completed() + '\n'
  this.trackers.forEach(function (tracker) {
    if (tracker instanceof TrackerGroup) {
      output += tracker.debug(depth + 1)
    } else {
      output += indent + ' ' + tracker.name + ': ' + tracker.completed() + '\n'
    }
  })
  return output
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var EventEmitter = __webpack_require__(7).EventEmitter
var util = __webpack_require__(5)

var trackerId = 0
var TrackerBase = module.exports = function (name) {
  EventEmitter.call(this)
  this.id = ++trackerId
  this.name = name
}
util.inherits(TrackerBase, EventEmitter)


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(5)
var TrackerBase = __webpack_require__(6)

var Tracker = module.exports = function (name, todo) {
  TrackerBase.call(this, name)
  this.workDone = 0
  this.workTodo = todo || 0
}
util.inherits(Tracker, TrackerBase)

Tracker.prototype.completed = function () {
  return this.workTodo === 0 ? 0 : this.workDone / this.workTodo
}

Tracker.prototype.addWork = function (work) {
  this.workTodo += work
  this.emit('change', this.name, this.completed(), this)
}

Tracker.prototype.completeWork = function (work) {
  this.workDone += work
  if (this.workDone > this.workTodo) this.workDone = this.workTodo
  this.emit('change', this.name, this.completed(), this)
}

Tracker.prototype.finish = function () {
  this.workTodo = this.workDone = 1
  this.emit('change', this.name, 1, this)
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(5)
var stream = __webpack_require__(10)
var delegate = __webpack_require__(29)
var Tracker = __webpack_require__(8)

var TrackerStream = module.exports = function (name, size, options) {
  stream.Transform.call(this, options)
  this.tracker = new Tracker(name, size)
  this.name = name
  this.id = this.tracker.id
  this.tracker.on('change', delegateChange(this))
}
util.inherits(TrackerStream, stream.Transform)

function delegateChange (trackerStream) {
  return function (name, completion, tracker) {
    trackerStream.emit('change', name, completion, trackerStream)
  }
}

TrackerStream.prototype._transform = function (data, encoding, cb) {
  this.tracker.completeWork(data.length ? data.length : 1)
  this.push(data)
  cb()
}

TrackerStream.prototype._flush = function (cb) {
  this.tracker.finish()
  cb()
}

delegate(TrackerStream.prototype, 'tracker')
  .method('completed')
  .method('addWork')
  .method('finish')


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(11);
if (process.env.READABLE_STREAM === 'disable' && Stream) {
  module.exports = Stream;
  exports = module.exports = Stream.Readable;
  exports.Readable = Stream.Readable;
  exports.Writable = Stream.Writable;
  exports.Duplex = Stream.Duplex;
  exports.Transform = Stream.Transform;
  exports.PassThrough = Stream.PassThrough;
  exports.Stream = Stream;
} else {
  exports = module.exports = __webpack_require__(12);
  exports.Stream = Stream || exports;
  exports.Readable = exports;
  exports.Writable = __webpack_require__(24);
  exports.Duplex = __webpack_require__(23);
  exports.Transform = __webpack_require__(27);
  exports.PassThrough = __webpack_require__(28);
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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



/*<replacement>*/

var pna = __webpack_require__(13);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(14);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(7).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(15);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(16).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(18);
util.inherits = __webpack_require__(19);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(5);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(21);
var destroyImpl = __webpack_require__(22);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn);

  // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.
  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(23);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var readableHwm = options.readableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (readableHwm || readableHwm === 0)) this.highWaterMark = readableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(26).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(23);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(26).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) pna.nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    pna.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) pna.nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        pna.nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    pna.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;

  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  this._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._readableState.highWaterMark;
  }
});

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    pna.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof process === 'undefined' ||
    !process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = { nextTick: nextTick };
} else {
  module.exports = process
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}



/***/ }),
/* 14 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(17)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 18 */
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

try {
  var util = __webpack_require__(5);
  /* istanbul ignore next */
  if (typeof util.inherits !== 'function') throw '';
  module.exports = util.inherits;
} catch (e) {
  /* istanbul ignore next */
  module.exports = __webpack_require__(20);
}


/***/ }),
/* 20 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(16).Buffer;
var util = __webpack_require__(5);

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

if (util && util.inspect && util.inspect.custom) {
  module.exports.prototype[util.inspect.custom] = function () {
    var obj = util.inspect({ length: this.length });
    return this.constructor.name + ' ' + obj;
  };
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var pna = __webpack_require__(13);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      pna.nextTick(emitErrorNT, this, err);
    }
    return this;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      pna.nextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });

  return this;
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var pna = __webpack_require__(13);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(18);
util.inherits = __webpack_require__(19);
/*</replacement>*/

var Readable = __webpack_require__(12);
var Writable = __webpack_require__(24);

util.inherits(Duplex, Readable);

{
  // avoid scope creep, the keys array can then be collected
  var keys = objectKeys(Writable.prototype);
  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  pna.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  pna.nextTick(cb, err);
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var pna = __webpack_require__(13);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : pna.nextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(18);
util.inherits = __webpack_require__(19);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(25)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(15);
/*</replacement>*/

/*<replacement>*/

var Buffer = __webpack_require__(16).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

/*</replacement>*/

var destroyImpl = __webpack_require__(22);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(23);

  options = options || {};

  // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.
  var isDuplex = stream instanceof Duplex;

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var writableHwm = options.writableHighWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;

  if (hwm || hwm === 0) this.highWaterMark = hwm;else if (isDuplex && (writableHwm || writableHwm === 0)) this.highWaterMark = writableHwm;else this.highWaterMark = defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(23);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  pna.nextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    pna.nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function () {
    return this._writableState.highWaterMark;
  }
});

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    pna.nextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    pna.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      pna.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) pna.nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * For Node.js, simply re-export the core `util.deprecate` function.
 */

module.exports = __webpack_require__(5).deprecate;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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



/*<replacement>*/

var Buffer = __webpack_require__(16).Buffer;
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(23);

/*<replacement>*/
var util = __webpack_require__(18);
util.inherits = __webpack_require__(19);
/*</replacement>*/

util.inherits(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return this.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);

  cb(er);

  var rs = this._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  };

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function') {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this2 = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this2.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  if (stream._writableState.length) throw new Error('Calling transform done when ws.length != 0');

  if (stream._transformState.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
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

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(27);

/*<replacement>*/
var util = __webpack_require__(18);
util.inherits = __webpack_require__(19);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {


/**
 * Expose `Delegator`.
 */

module.exports = Delegator;

/**
 * Initialize a delegator.
 *
 * @param {Object} proto
 * @param {String} target
 * @api public
 */

function Delegator(proto, target) {
  if (!(this instanceof Delegator)) return new Delegator(proto, target);
  this.proto = proto;
  this.target = target;
  this.methods = [];
  this.getters = [];
  this.setters = [];
  this.fluents = [];
}

/**
 * Delegate method `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.method = function(name){
  var proto = this.proto;
  var target = this.target;
  this.methods.push(name);

  proto[name] = function(){
    return this[target][name].apply(this[target], arguments);
  };

  return this;
};

/**
 * Delegator accessor `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.access = function(name){
  return this.getter(name).setter(name);
};

/**
 * Delegator getter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.getter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.getters.push(name);

  proto.__defineGetter__(name, function(){
    return this[target][name];
  });

  return this;
};

/**
 * Delegator setter `name`.
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.setter = function(name){
  var proto = this.proto;
  var target = this.target;
  this.setters.push(name);

  proto.__defineSetter__(name, function(val){
    return this[target][name] = val;
  });

  return this;
};

/**
 * Delegator fluent accessor
 *
 * @param {String} name
 * @return {Delegator} self
 * @api public
 */

Delegator.prototype.fluent = function (name) {
  var proto = this.proto;
  var target = this.target;
  this.fluents.push(name);

  proto[name] = function(val){
    if ('undefined' != typeof val) {
      this[target][name] = val;
      return this;
    } else {
      return this[target][name];
    }
  };

  return this;
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var Plumbing = __webpack_require__(31)
var hasUnicode = __webpack_require__(46)
var hasColor = __webpack_require__(48)
var onExit = __webpack_require__(49)
var defaultThemes = __webpack_require__(52)
var setInterval = __webpack_require__(57)
var process = __webpack_require__(58)
var setImmediate = __webpack_require__(59)

module.exports = Gauge

function callWith (obj, method) {
  return function () {
    return method.call(obj)
  }
}

function Gauge (arg1, arg2) {
  var options, writeTo
  if (arg1 && arg1.write) {
    writeTo = arg1
    options = arg2 || {}
  } else if (arg2 && arg2.write) {
    writeTo = arg2
    options = arg1 || {}
  } else {
    writeTo = process.stderr
    options = arg1 || arg2 || {}
  }

  this._status = {
    spun: 0,
    section: '',
    subsection: ''
  }
  this._paused = false // are we paused for back pressure?
  this._disabled = true // are all progress bar updates disabled?
  this._showing = false // do we WANT the progress bar on screen
  this._onScreen = false // IS the progress bar on screen
  this._needsRedraw = false // should we print something at next tick?
  this._hideCursor = options.hideCursor == null ? true : options.hideCursor
  this._fixedFramerate = options.fixedFramerate == null
    ? !(/^v0\.8\./.test(process.version))
    : options.fixedFramerate
  this._lastUpdateAt = null
  this._updateInterval = options.updateInterval == null ? 50 : options.updateInterval

  this._themes = options.themes || defaultThemes
  this._theme = options.theme
  var theme = this._computeTheme(options.theme)
  var template = options.template || [
    {type: 'progressbar', length: 20},
    {type: 'activityIndicator', kerning: 1, length: 1},
    {type: 'section', kerning: 1, default: ''},
    {type: 'subsection', kerning: 1, default: ''}
  ]
  this.setWriteTo(writeTo, options.tty)
  var PlumbingClass = options.Plumbing || Plumbing
  this._gauge = new PlumbingClass(theme, template, this.getWidth())

  this._$$doRedraw = callWith(this, this._doRedraw)
  this._$$handleSizeChange = callWith(this, this._handleSizeChange)

  this._cleanupOnExit = options.cleanupOnExit == null || options.cleanupOnExit
  this._removeOnExit = null

  if (options.enabled || (options.enabled == null && this._tty && this._tty.isTTY)) {
    this.enable()
  } else {
    this.disable()
  }
}
Gauge.prototype = {}

Gauge.prototype.isEnabled = function () {
  return !this._disabled
}

Gauge.prototype.setTemplate = function (template) {
  this._gauge.setTemplate(template)
  if (this._showing) this._requestRedraw()
}

Gauge.prototype._computeTheme = function (theme) {
  if (!theme) theme = {}
  if (typeof theme === 'string') {
    theme = this._themes.getTheme(theme)
  } else if (theme && (Object.keys(theme).length === 0 || theme.hasUnicode != null || theme.hasColor != null)) {
    var useUnicode = theme.hasUnicode == null ? hasUnicode() : theme.hasUnicode
    var useColor = theme.hasColor == null ? hasColor : theme.hasColor
    theme = this._themes.getDefault({hasUnicode: useUnicode, hasColor: useColor, platform: theme.platform})
  }
  return theme
}

Gauge.prototype.setThemeset = function (themes) {
  this._themes = themes
  this.setTheme(this._theme)
}

Gauge.prototype.setTheme = function (theme) {
  this._gauge.setTheme(this._computeTheme(theme))
  if (this._showing) this._requestRedraw()
  this._theme = theme
}

Gauge.prototype._requestRedraw = function () {
  this._needsRedraw = true
  if (!this._fixedFramerate) this._doRedraw()
}

Gauge.prototype.getWidth = function () {
  return ((this._tty && this._tty.columns) || 80) - 1
}

Gauge.prototype.setWriteTo = function (writeTo, tty) {
  var enabled = !this._disabled
  if (enabled) this.disable()
  this._writeTo = writeTo
  this._tty = tty ||
    (writeTo === process.stderr && process.stdout.isTTY && process.stdout) ||
    (writeTo.isTTY && writeTo) ||
    this._tty
  if (this._gauge) this._gauge.setWidth(this.getWidth())
  if (enabled) this.enable()
}

Gauge.prototype.enable = function () {
  if (!this._disabled) return
  this._disabled = false
  if (this._tty) this._enableEvents()
  if (this._showing) this.show()
}

Gauge.prototype.disable = function () {
  if (this._disabled) return
  if (this._showing) {
    this._lastUpdateAt = null
    this._showing = false
    this._doRedraw()
    this._showing = true
  }
  this._disabled = true
  if (this._tty) this._disableEvents()
}

Gauge.prototype._enableEvents = function () {
  if (this._cleanupOnExit) {
    this._removeOnExit = onExit(callWith(this, this.disable))
  }
  this._tty.on('resize', this._$$handleSizeChange)
  if (this._fixedFramerate) {
    this.redrawTracker = setInterval(this._$$doRedraw, this._updateInterval)
    if (this.redrawTracker.unref) this.redrawTracker.unref()
  }
}

Gauge.prototype._disableEvents = function () {
  this._tty.removeListener('resize', this._$$handleSizeChange)
  if (this._fixedFramerate) clearInterval(this.redrawTracker)
  if (this._removeOnExit) this._removeOnExit()
}

Gauge.prototype.hide = function (cb) {
  if (this._disabled) return cb && process.nextTick(cb)
  if (!this._showing) return cb && process.nextTick(cb)
  this._showing = false
  this._doRedraw()
  cb && setImmediate(cb)
}

Gauge.prototype.show = function (section, completed) {
  this._showing = true
  if (typeof section === 'string') {
    this._status.section = section
  } else if (typeof section === 'object') {
    var sectionKeys = Object.keys(section)
    for (var ii = 0; ii < sectionKeys.length; ++ii) {
      var key = sectionKeys[ii]
      this._status[key] = section[key]
    }
  }
  if (completed != null) this._status.completed = completed
  if (this._disabled) return
  this._requestRedraw()
}

Gauge.prototype.pulse = function (subsection) {
  this._status.subsection = subsection || ''
  this._status.spun ++
  if (this._disabled) return
  if (!this._showing) return
  this._requestRedraw()
}

Gauge.prototype._handleSizeChange = function () {
  this._gauge.setWidth(this._tty.columns - 1)
  this._requestRedraw()
}

Gauge.prototype._doRedraw = function () {
  if (this._disabled || this._paused) return
  if (!this._fixedFramerate) {
    var now = Date.now()
    if (this._lastUpdateAt && now - this._lastUpdateAt < this._updateInterval) return
    this._lastUpdateAt = now
  }
  if (!this._showing && this._onScreen) {
    this._onScreen = false
    var result = this._gauge.hide()
    if (this._hideCursor) {
      result += this._gauge.showCursor()
    }
    return this._writeTo.write(result)
  }
  if (!this._showing && !this._onScreen) return
  if (this._showing && !this._onScreen) {
    this._onScreen = true
    this._needsRedraw = true
    if (this._hideCursor) {
      this._writeTo.write(this._gauge.hideCursor())
    }
  }
  if (!this._needsRedraw) return
  if (!this._writeTo.write(this._gauge.show(this._status))) {
    this._paused = true
    this._writeTo.on('drain', callWith(this, function () {
      this._paused = false
      this._doRedraw()
    }))
  }
}


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var consoleControl = __webpack_require__(32)
var renderTemplate = __webpack_require__(33)
var validate = __webpack_require__(41)

var Plumbing = module.exports = function (theme, template, width) {
  if (!width) width = 80
  validate('OAN', [theme, template, width])
  this.showing = false
  this.theme = theme
  this.width = width
  this.template = template
}
Plumbing.prototype = {}

Plumbing.prototype.setTheme = function (theme) {
  validate('O', [theme])
  this.theme = theme
}

Plumbing.prototype.setTemplate = function (template) {
  validate('A', [template])
  this.template = template
}

Plumbing.prototype.setWidth = function (width) {
  validate('N', [width])
  this.width = width
}

Plumbing.prototype.hide = function () {
  return consoleControl.gotoSOL() + consoleControl.eraseLine()
}

Plumbing.prototype.hideCursor = consoleControl.hideCursor

Plumbing.prototype.showCursor = consoleControl.showCursor

Plumbing.prototype.show = function (status) {
  var values = Object.create(this.theme)
  for (var key in status) {
    values[key] = status[key]
  }

  return renderTemplate(this.width, this.template, values).trim() +
         consoleControl.color('reset') +
         consoleControl.eraseLine() + consoleControl.gotoSOL()
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// These tables borrowed from `ansi`

var prefix = '\x1b['

exports.up = function up (num) {
  return prefix + (num || '') + 'A'
}

exports.down = function down (num) {
  return prefix + (num || '') + 'B'
}

exports.forward = function forward (num) {
  return prefix + (num || '') + 'C'
}

exports.back = function back (num) {
  return prefix + (num || '') + 'D'
}

exports.nextLine = function nextLine (num) {
  return prefix + (num || '') + 'E'
}

exports.previousLine = function previousLine (num) {
  return prefix + (num || '') + 'F'
}

exports.horizontalAbsolute = function horizontalAbsolute (num) {
  if (num == null) throw new Error('horizontalAboslute requires a column to position to')
  return prefix + num + 'G'
}

exports.eraseData = function eraseData () {
  return prefix + 'J'
}

exports.eraseLine = function eraseLine () {
  return prefix + 'K'
}

exports.goto = function (x, y) {
  return prefix + y + ';' + x + 'H'
}

exports.gotoSOL = function () {
  return '\r'
}

exports.beep = function () {
  return '\x07'
}

exports.hideCursor = function hideCursor () {
  return prefix + '?25l'
}

exports.showCursor = function showCursor () {
  return prefix + '?25h'
}

var colors = {
  reset: 0,
// styles
  bold: 1,
  italic: 3,
  underline: 4,
  inverse: 7,
// resets
  stopBold: 22,
  stopItalic: 23,
  stopUnderline: 24,
  stopInverse: 27,
// colors
  white: 37,
  black: 30,
  blue: 34,
  cyan: 36,
  green: 32,
  magenta: 35,
  red: 31,
  yellow: 33,
  bgWhite: 47,
  bgBlack: 40,
  bgBlue: 44,
  bgCyan: 46,
  bgGreen: 42,
  bgMagenta: 45,
  bgRed: 41,
  bgYellow: 43,

  grey: 90,
  brightBlack: 90,
  brightRed: 91,
  brightGreen: 92,
  brightYellow: 93,
  brightBlue: 94,
  brightMagenta: 95,
  brightCyan: 96,
  brightWhite: 97,

  bgGrey: 100,
  bgBrightBlack: 100,
  bgBrightRed: 101,
  bgBrightGreen: 102,
  bgBrightYellow: 103,
  bgBrightBlue: 104,
  bgBrightMagenta: 105,
  bgBrightCyan: 106,
  bgBrightWhite: 107
}

exports.color = function color (colorWith) {
  if (arguments.length !== 1 || !Array.isArray(colorWith)) {
    colorWith = Array.prototype.slice.call(arguments)
  }
  return prefix + colorWith.map(colorNameToCode).join(';') + 'm'
}

function colorNameToCode (color) {
  if (colors[color] != null) return colors[color]
  throw new Error('Unknown color or style name: ' + color)
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var align = __webpack_require__(34)
var validate = __webpack_require__(41)
var objectAssign = __webpack_require__(42)
var wideTruncate = __webpack_require__(43)
var error = __webpack_require__(44)
var TemplateItem = __webpack_require__(45)

function renderValueWithValues (values) {
  return function (item) {
    return renderValue(item, values)
  }
}

var renderTemplate = module.exports = function (width, template, values) {
  var items = prepareItems(width, template, values)
  var rendered = items.map(renderValueWithValues(values)).join('')
  return align.left(wideTruncate(rendered, width), width)
}

function preType (item) {
  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1)
  return 'pre' + cappedTypeName
}

function postType (item) {
  var cappedTypeName = item.type[0].toUpperCase() + item.type.slice(1)
  return 'post' + cappedTypeName
}

function hasPreOrPost (item, values) {
  if (!item.type) return
  return values[preType(item)] || values[postType(item)]
}

function generatePreAndPost (baseItem, parentValues) {
  var item = objectAssign({}, baseItem)
  var values = Object.create(parentValues)
  var template = []
  var pre = preType(item)
  var post = postType(item)
  if (values[pre]) {
    template.push({value: values[pre]})
    values[pre] = null
  }
  item.minLength = null
  item.length = null
  item.maxLength = null
  template.push(item)
  values[item.type] = values[item.type]
  if (values[post]) {
    template.push({value: values[post]})
    values[post] = null
  }
  return function ($1, $2, length) {
    return renderTemplate(length, template, values)
  }
}

function prepareItems (width, template, values) {
  function cloneAndObjectify (item, index, arr) {
    var cloned = new TemplateItem(item, width)
    var type = cloned.type
    if (cloned.value == null) {
      if (!(type in values)) {
        if (cloned.default == null) {
          throw new error.MissingTemplateValue(cloned, values)
        } else {
          cloned.value = cloned.default
        }
      } else {
        cloned.value = values[type]
      }
    }
    if (cloned.value == null || cloned.value === '') return null
    cloned.index = index
    cloned.first = index === 0
    cloned.last = index === arr.length - 1
    if (hasPreOrPost(cloned, values)) cloned.value = generatePreAndPost(cloned, values)
    return cloned
  }

  var output = template.map(cloneAndObjectify).filter(function (item) { return item != null })

  var outputLength = 0
  var remainingSpace = width
  var variableCount = output.length

  function consumeSpace (length) {
    if (length > remainingSpace) length = remainingSpace
    outputLength += length
    remainingSpace -= length
  }

  function finishSizing (item, length) {
    if (item.finished) throw new error.Internal('Tried to finish template item that was already finished')
    if (length === Infinity) throw new error.Internal('Length of template item cannot be infinity')
    if (length != null) item.length = length
    item.minLength = null
    item.maxLength = null
    --variableCount
    item.finished = true
    if (item.length == null) item.length = item.getBaseLength()
    if (item.length == null) throw new error.Internal('Finished template items must have a length')
    consumeSpace(item.getLength())
  }

  output.forEach(function (item) {
    if (!item.kerning) return
    var prevPadRight = item.first ? 0 : output[item.index - 1].padRight
    if (!item.first && prevPadRight < item.kerning) item.padLeft = item.kerning - prevPadRight
    if (!item.last) item.padRight = item.kerning
  })

  // Finish any that have a fixed (literal or intuited) length
  output.forEach(function (item) {
    if (item.getBaseLength() == null) return
    finishSizing(item)
  })

  var resized = 0
  var resizing
  var hunkSize
  do {
    resizing = false
    hunkSize = Math.round(remainingSpace / variableCount)
    output.forEach(function (item) {
      if (item.finished) return
      if (!item.maxLength) return
      if (item.getMaxLength() < hunkSize) {
        finishSizing(item, item.maxLength)
        resizing = true
      }
    })
  } while (resizing && resized++ < output.length)
  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining maxLength')

  resized = 0
  do {
    resizing = false
    hunkSize = Math.round(remainingSpace / variableCount)
    output.forEach(function (item) {
      if (item.finished) return
      if (!item.minLength) return
      if (item.getMinLength() >= hunkSize) {
        finishSizing(item, item.minLength)
        resizing = true
      }
    })
  } while (resizing && resized++ < output.length)
  if (resizing) throw new error.Internal('Resize loop iterated too many times while determining minLength')

  hunkSize = Math.round(remainingSpace / variableCount)
  output.forEach(function (item) {
    if (item.finished) return
    finishSizing(item, hunkSize)
  })

  return output
}

function renderFunction (item, values, length) {
  validate('OON', arguments)
  if (item.type) {
    return item.value(values, values[item.type + 'Theme'] || {}, length)
  } else {
    return item.value(values, {}, length)
  }
}

function renderValue (item, values) {
  var length = item.getBaseLength()
  var value = typeof item.value === 'function' ? renderFunction(item, values, length) : item.value
  if (value == null || value === '') return ''
  var alignWith = align[item.align] || align.left
  var leftPadding = item.padLeft ? align.left('', item.padLeft) : ''
  var rightPadding = item.padRight ? align.right('', item.padRight) : ''
  var truncated = wideTruncate(String(value), length)
  var aligned = alignWith(truncated, length)
  return leftPadding + aligned + rightPadding
}


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stringWidth = __webpack_require__(35)

exports.center = alignCenter
exports.left = alignLeft
exports.right = alignRight

// lodash's way of generating pad characters.

function createPadding (width) {
  var result = ''
  var string = ' '
  var n = width
  do {
    if (n % 2) {
      result += string;
    }
    n = Math.floor(n / 2);
    string += string;
  } while (n);

  return result;
}

function alignLeft (str, width) {
  var trimmed = str.trimRight()
  if (trimmed.length === 0 && str.length >= width) return str
  var padding = ''
  var strWidth = stringWidth(trimmed)

  if (strWidth < width) {
    padding = createPadding(width - strWidth)
  }

  return trimmed + padding
}

function alignRight (str, width) {
  var trimmed = str.trimLeft()
  if (trimmed.length === 0 && str.length >= width) return str
  var padding = ''
  var strWidth = stringWidth(trimmed)

  if (strWidth < width) {
    padding = createPadding(width - strWidth)
  }

  return padding + trimmed
}

function alignCenter (str, width) {
  var trimmed = str.trim()
  if (trimmed.length === 0 && str.length >= width) return str
  var padLeft = ''
  var padRight = ''
  var strWidth = stringWidth(trimmed)

  if (strWidth < width) {
    var padLeftBy = parseInt((width - strWidth) / 2, 10) 
    padLeft = createPadding(padLeftBy)
    padRight = createPadding(width - (strWidth + padLeftBy))
  }

  return padLeft + trimmed + padRight
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stripAnsi = __webpack_require__(36);
var codePointAt = __webpack_require__(38);
var isFullwidthCodePoint = __webpack_require__(39);

// https://github.com/nodejs/io.js/blob/cff7300a578be1b10001f2d967aaedc88aee6402/lib/readline.js#L1345
module.exports = function (str) {
	if (typeof str !== 'string' || str.length === 0) {
		return 0;
	}

	var width = 0;

	str = stripAnsi(str);

	for (var i = 0; i < str.length; i++) {
		var code = codePointAt(str, i);

		// ignore control characters
		if (code <= 0x1f || (code >= 0x7f && code <= 0x9f)) {
			continue;
		}

		// surrogates
		if (code >= 0x10000) {
			i++;
		}

		if (isFullwidthCodePoint(code)) {
			width += 2;
		} else {
			width++;
		}
	}

	return width;
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ansiRegex = __webpack_require__(37)();

module.exports = function (str) {
	return typeof str === 'string' ? str.replace(ansiRegex, '') : str;
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function () {
	return /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-PRZcf-nqry=><]/g;
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* eslint-disable babel/new-cap, xo/throw-new-error */

module.exports = function (str, pos) {
	if (str === null || str === undefined) {
		throw TypeError();
	}

	str = String(str);

	var size = str.length;
	var i = pos ? Number(pos) : 0;

	if (Number.isNaN(i)) {
		i = 0;
	}

	if (i < 0 || i >= size) {
		return undefined;
	}

	var first = str.charCodeAt(i);

	if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
		var second = str.charCodeAt(i + 1);

		if (second >= 0xDC00 && second <= 0xDFFF) {
			return ((first - 0xD800) * 0x400) + second - 0xDC00 + 0x10000;
		}
	}

	return first;
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var numberIsNan = __webpack_require__(40);

module.exports = function (x) {
	if (numberIsNan(x)) {
		return false;
	}

	// https://github.com/nodejs/io.js/blob/cff7300a578be1b10001f2d967aaedc88aee6402/lib/readline.js#L1369

	// code points are derived from:
	// http://www.unix.org/Public/UNIDATA/EastAsianWidth.txt
	if (x >= 0x1100 && (
		x <= 0x115f ||  // Hangul Jamo
		0x2329 === x || // LEFT-POINTING ANGLE BRACKET
		0x232a === x || // RIGHT-POINTING ANGLE BRACKET
		// CJK Radicals Supplement .. Enclosed CJK Letters and Months
		(0x2e80 <= x && x <= 0x3247 && x !== 0x303f) ||
		// Enclosed CJK Letters and Months .. CJK Unified Ideographs Extension A
		0x3250 <= x && x <= 0x4dbf ||
		// CJK Unified Ideographs .. Yi Radicals
		0x4e00 <= x && x <= 0xa4c6 ||
		// Hangul Jamo Extended-A
		0xa960 <= x && x <= 0xa97c ||
		// Hangul Syllables
		0xac00 <= x && x <= 0xd7a3 ||
		// CJK Compatibility Ideographs
		0xf900 <= x && x <= 0xfaff ||
		// Vertical Forms
		0xfe10 <= x && x <= 0xfe19 ||
		// CJK Compatibility Forms .. Small Form Variants
		0xfe30 <= x && x <= 0xfe6b ||
		// Halfwidth and Fullwidth Forms
		0xff01 <= x && x <= 0xff60 ||
		0xffe0 <= x && x <= 0xffe6 ||
		// Kana Supplement
		0x1b000 <= x && x <= 0x1b001 ||
		// Enclosed Ideographic Supplement
		0x1f200 <= x && x <= 0x1f251 ||
		// CJK Unified Ideographs Extension B .. Tertiary Ideographic Plane
		0x20000 <= x && x <= 0x3fffd)) {
		return true;
	}

	return false;
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = Number.isNaN || function (x) {
	return x !== x;
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function isArguments (thingy) {
  return thingy != null && typeof thingy === 'object' && thingy.hasOwnProperty('callee')
}

var types = {
  '*': {label: 'any', check: function () { return true }},
  A: {label: 'array', check: function (thingy) { return Array.isArray(thingy) || isArguments(thingy) }},
  S: {label: 'string', check: function (thingy) { return typeof thingy === 'string' }},
  N: {label: 'number', check: function (thingy) { return typeof thingy === 'number' }},
  F: {label: 'function', check: function (thingy) { return typeof thingy === 'function' }},
  O: {label: 'object', check: function (thingy) { return typeof thingy === 'object' && thingy != null && !types.A.check(thingy) && !types.E.check(thingy) }},
  B: {label: 'boolean', check: function (thingy) { return typeof thingy === 'boolean' }},
  E: {label: 'error', check: function (thingy) { return thingy instanceof Error }},
  Z: {label: 'null', check: function (thingy) { return thingy == null }}
}

function addSchema (schema, arity) {
  var group = arity[schema.length] = arity[schema.length] || []
  if (group.indexOf(schema) === -1) group.push(schema)
}

var validate = module.exports = function (rawSchemas, args) {
  if (arguments.length !== 2) throw wrongNumberOfArgs(['SA'], arguments.length)
  if (!rawSchemas) throw missingRequiredArg(0, 'rawSchemas')
  if (!args) throw missingRequiredArg(1, 'args')
  if (!types.S.check(rawSchemas)) throw invalidType(0, ['string'], rawSchemas)
  if (!types.A.check(args)) throw invalidType(1, ['array'], args)
  var schemas = rawSchemas.split('|')
  var arity = {}

  schemas.forEach(function (schema) {
    for (var ii = 0; ii < schema.length; ++ii) {
      var type = schema[ii]
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
  var matching = arity[args.length]
  if (!matching) {
    throw wrongNumberOfArgs(Object.keys(arity), args.length)
  }
  for (var ii = 0; ii < args.length; ++ii) {
    var newMatching = matching.filter(function (schema) {
      var type = schema[ii]
      var typeCheck = types[type].check
      return typeCheck(args[ii])
    })
    if (!newMatching.length) {
      var labels = matching.map(function (schema) {
        return types[schema[ii]].label
      }).filter(function (schema) { return schema != null })
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
  var valueType
  Object.keys(types).forEach(function (typeCode) {
    if (types[typeCode].check(value)) valueType = types[typeCode].label
  })
  return newException('EINVALIDTYPE', 'Argument #' + (num + 1) + ': Expected ' +
    englishList(expectedTypes) + ' but got ' + valueType)
}

function englishList (list) {
  return list.join(', ').replace(/, ([^,]+)$/, ' or $1')
}

function wrongNumberOfArgs (expected, got) {
  var english = englishList(expected)
  var args = expected.every(function (ex) { return ex.length === 1 })
    ? 'argument'
    : 'arguments'
  return newException('EWRONGARGCOUNT', 'Expected ' + english + ' ' + args + ' but got ' + got)
}

function moreThanOneError (schema) {
  return newException('ETOOMANYERRORTYPES',
    'Only one error type per argument signature is allowed, more than one found in "' + schema + '"')
}

function newException (code, msg) {
  var e = new Error(msg)
  e.code = code
  if (Error.captureStackTrace) Error.captureStackTrace(e, validate)
  return e
}


/***/ }),
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stringWidth = __webpack_require__(35)
var stripAnsi = __webpack_require__(36)

module.exports = wideTruncate

function wideTruncate (str, target) {
  if (stringWidth(str) === 0) return str
  if (target <= 0) return ''
  if (stringWidth(str) <= target) return str

  // We compute the number of bytes of ansi sequences here and add
  // that to our initial truncation to ensure that we don't slice one
  // that we want to keep in half.
  var noAnsi = stripAnsi(str)
  var ansiSize = str.length + noAnsi.length
  var truncated = str.slice(0, target + ansiSize)

  // we have to shrink the result to account for our ansi sequence buffer
  // (if an ansi sequence was truncated) and double width characters.
  while (stringWidth(truncated) > target) {
    truncated = truncated.slice(0, -1)
  }
  return truncated
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var util = __webpack_require__(5)

var User = exports.User = function User (msg) {
  var err = new Error(msg)
  Error.captureStackTrace(err, User)
  err.code = 'EGAUGE'
  return err
}

exports.MissingTemplateValue = function MissingTemplateValue (item, values) {
  var err = new User(util.format('Missing template value "%s"', item.type))
  Error.captureStackTrace(err, MissingTemplateValue)
  err.template = item
  err.values = values
  return err
}

exports.Internal = function Internal (msg) {
  var err = new Error(msg)
  Error.captureStackTrace(err, Internal)
  err.code = 'EGAUGEINTERNAL'
  return err
}


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var stringWidth = __webpack_require__(35)

module.exports = TemplateItem

function isPercent (num) {
  if (typeof num !== 'string') return false
  return num.slice(-1) === '%'
}

function percent (num) {
  return Number(num.slice(0, -1)) / 100
}

function TemplateItem (values, outputLength) {
  this.overallOutputLength = outputLength
  this.finished = false
  this.type = null
  this.value = null
  this.length = null
  this.maxLength = null
  this.minLength = null
  this.kerning = null
  this.align = 'left'
  this.padLeft = 0
  this.padRight = 0
  this.index = null
  this.first = null
  this.last = null
  if (typeof values === 'string') {
    this.value = values
  } else {
    for (var prop in values) this[prop] = values[prop]
  }
  // Realize percents
  if (isPercent(this.length)) {
    this.length = Math.round(this.overallOutputLength * percent(this.length))
  }
  if (isPercent(this.minLength)) {
    this.minLength = Math.round(this.overallOutputLength * percent(this.minLength))
  }
  if (isPercent(this.maxLength)) {
    this.maxLength = Math.round(this.overallOutputLength * percent(this.maxLength))
  }
  return this
}

TemplateItem.prototype = {}

TemplateItem.prototype.getBaseLength = function () {
  var length = this.length
  if (length == null && typeof this.value === 'string' && this.maxLength == null && this.minLength == null) {
    length = stringWidth(this.value)
  }
  return length
}

TemplateItem.prototype.getLength = function () {
  var length = this.getBaseLength()
  if (length == null) return null
  return length + this.padLeft + this.padRight
}

TemplateItem.prototype.getMaxLength = function () {
  if (this.maxLength == null) return null
  return this.maxLength + this.padLeft + this.padRight
}

TemplateItem.prototype.getMinLength = function () {
  if (this.minLength == null) return null
  return this.minLength + this.padLeft + this.padRight
}



/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var os = __webpack_require__(47)

var hasUnicode = module.exports = function () {
  // Recent Win32 platforms (>XP) CAN support unicode in the console but
  // don't have to, and in non-english locales often use traditional local
  // code pages. There's no way, short of windows system calls or execing
  // the chcp command line program to figure this out. As such, we default
  // this to false and encourage your users to override it via config if
  // appropriate.
  if (os.type() == "Windows_NT") { return false }

  var isUTF8 = /UTF-?8$/i
  var ctype = process.env.LC_ALL || process.env.LC_CTYPE || process.env.LANG
  return isUTF8.test(ctype)
}


/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = isWin32() || isColorTerm()

function isWin32 () {
  return process.platform === 'win32'
}

function isColorTerm () {
  var termHasColor = /^screen|^xterm|^vt100|color|ansi|cygwin|linux/i
  return !!process.env.COLORTERM || termHasColor.test(process.env.TERM)
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
var assert = __webpack_require__(50)
var signals = __webpack_require__(51)

var EE = __webpack_require__(7)
/* istanbul ignore if */
if (typeof EE !== 'function') {
  EE = EE.EventEmitter
}

var emitter
if (process.__signal_exit_emitter__) {
  emitter = process.__signal_exit_emitter__
} else {
  emitter = process.__signal_exit_emitter__ = new EE()
  emitter.count = 0
  emitter.emitted = {}
}

// Because this emitter is a global, we have to check to see if a
// previous version of this library failed to enable infinite listeners.
// I know what you're about to say.  But literally everything about
// signal-exit is a compromise with evil.  Get used to it.
if (!emitter.infinite) {
  emitter.setMaxListeners(Infinity)
  emitter.infinite = true
}

module.exports = function (cb, opts) {
  assert.equal(typeof cb, 'function', 'a callback must be provided for exit handler')

  if (loaded === false) {
    load()
  }

  var ev = 'exit'
  if (opts && opts.alwaysLast) {
    ev = 'afterexit'
  }

  var remove = function () {
    emitter.removeListener(ev, cb)
    if (emitter.listeners('exit').length === 0 &&
        emitter.listeners('afterexit').length === 0) {
      unload()
    }
  }
  emitter.on(ev, cb)

  return remove
}

module.exports.unload = unload
function unload () {
  if (!loaded) {
    return
  }
  loaded = false

  signals.forEach(function (sig) {
    try {
      process.removeListener(sig, sigListeners[sig])
    } catch (er) {}
  })
  process.emit = originalProcessEmit
  process.reallyExit = originalProcessReallyExit
  emitter.count -= 1
}

function emit (event, code, signal) {
  if (emitter.emitted[event]) {
    return
  }
  emitter.emitted[event] = true
  emitter.emit(event, code, signal)
}

// { <signal>: <listener fn>, ... }
var sigListeners = {}
signals.forEach(function (sig) {
  sigListeners[sig] = function listener () {
    // If there are no other listeners, an exit is coming!
    // Simplest way: remove us and then re-send the signal.
    // We know that this will kill the process, so we can
    // safely emit now.
    var listeners = process.listeners(sig)
    if (listeners.length === emitter.count) {
      unload()
      emit('exit', null, sig)
      /* istanbul ignore next */
      emit('afterexit', null, sig)
      /* istanbul ignore next */
      process.kill(process.pid, sig)
    }
  }
})

module.exports.signals = function () {
  return signals
}

module.exports.load = load

var loaded = false

function load () {
  if (loaded) {
    return
  }
  loaded = true

  // This is the number of onSignalExit's that are in play.
  // It's important so that we can count the correct number of
  // listeners on signals, and don't wait for the other one to
  // handle it instead of us.
  emitter.count += 1

  signals = signals.filter(function (sig) {
    try {
      process.on(sig, sigListeners[sig])
      return true
    } catch (er) {
      return false
    }
  })

  process.emit = processEmit
  process.reallyExit = processReallyExit
}

var originalProcessReallyExit = process.reallyExit
function processReallyExit (code) {
  process.exitCode = code || 0
  emit('exit', process.exitCode, null)
  /* istanbul ignore next */
  emit('afterexit', process.exitCode, null)
  /* istanbul ignore next */
  originalProcessReallyExit.call(process, process.exitCode)
}

var originalProcessEmit = process.emit
function processEmit (ev, arg) {
  if (ev === 'exit') {
    if (arg !== undefined) {
      process.exitCode = arg
    }
    var ret = originalProcessEmit.apply(this, arguments)
    emit('exit', process.exitCode, null)
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null)
    return ret
  } else {
    return originalProcessEmit.apply(this, arguments)
  }
}


/***/ }),
/* 50 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

// This is not the set of all possible signals.
//
// It IS, however, the set of all signals that trigger
// an exit on either Linux or BSD systems.  Linux is a
// superset of the signal names supported on BSD, and
// the unknown signals just fail to register, so we can
// catch that easily enough.
//
// Don't bother with SIGKILL.  It's uncatchable, which
// means that we can't fire any callbacks anyway.
//
// If a user does happen to register a handler on a non-
// fatal signal like SIGWINCH or something, and then
// exit, it'll end up firing `process.emit('exit')`, so
// the handler will be fired anyway.
//
// SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
// artificially, inherently leave the process in a
// state from which it is not safe to try and enter JS
// listeners.
module.exports = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM'
]

if (process.platform !== 'win32') {
  module.exports.push(
    'SIGVTALRM',
    'SIGXCPU',
    'SIGXFSZ',
    'SIGUSR2',
    'SIGTRAP',
    'SIGSYS',
    'SIGQUIT',
    'SIGIOT'
    // should detect profiler and enable/disable accordingly.
    // see #21
    // 'SIGPROF'
  )
}

if (process.platform === 'linux') {
  module.exports.push(
    'SIGIO',
    'SIGPOLL',
    'SIGPWR',
    'SIGSTKFLT',
    'SIGUNUSED'
  )
}


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var consoleControl = __webpack_require__(32)
var ThemeSet = __webpack_require__(53)

var themes = module.exports = new ThemeSet()

themes.addTheme('ASCII', {
  preProgressbar: '[',
  postProgressbar: ']',
  progressbarTheme: {
    complete: '#',
    remaining: '.'
  },
  activityIndicatorTheme: '-\\|/',
  preSubsection: '>'
})

themes.addTheme('colorASCII', themes.getTheme('ASCII'), {
  progressbarTheme: {
    preComplete: consoleControl.color('inverse'),
    complete: ' ',
    postComplete: consoleControl.color('stopInverse'),
    preRemaining: consoleControl.color('brightBlack'),
    remaining: '.',
    postRemaining: consoleControl.color('reset')
  }
})

themes.addTheme('brailleSpinner', {
  preProgressbar: '⸨',
  postProgressbar: '⸩',
  progressbarTheme: {
    complete: '░',
    remaining: '⠂'
  },
  activityIndicatorTheme: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
  preSubsection: '>'
})

themes.addTheme('colorBrailleSpinner', themes.getTheme('brailleSpinner'), {
  progressbarTheme: {
    preComplete: consoleControl.color('inverse'),
    complete: ' ',
    postComplete: consoleControl.color('stopInverse'),
    preRemaining: consoleControl.color('brightBlack'),
    remaining: '░',
    postRemaining: consoleControl.color('reset')
  }
})

themes.setDefault({}, 'ASCII')
themes.setDefault({hasColor: true}, 'colorASCII')
themes.setDefault({platform: 'darwin', hasUnicode: true}, 'brailleSpinner')
themes.setDefault({platform: 'darwin', hasUnicode: true, hasColor: true}, 'colorBrailleSpinner')


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var objectAssign = __webpack_require__(42)

module.exports = function () {
  return ThemeSetProto.newThemeSet()
}

var ThemeSetProto = {}

ThemeSetProto.baseTheme = __webpack_require__(54)

ThemeSetProto.newTheme = function (parent, theme) {
  if (!theme) {
    theme = parent
    parent = this.baseTheme
  }
  return objectAssign({}, parent, theme)
}

ThemeSetProto.getThemeNames = function () {
  return Object.keys(this.themes)
}

ThemeSetProto.addTheme = function (name, parent, theme) {
  this.themes[name] = this.newTheme(parent, theme)
}

ThemeSetProto.addToAllThemes = function (theme) {
  var themes = this.themes
  Object.keys(themes).forEach(function (name) {
    objectAssign(themes[name], theme)
  })
  objectAssign(this.baseTheme, theme)
}

ThemeSetProto.getTheme = function (name) {
  if (!this.themes[name]) throw this.newMissingThemeError(name)
  return this.themes[name]
}

ThemeSetProto.setDefault = function (opts, name) {
  if (name == null) {
    name = opts
    opts = {}
  }
  var platform = opts.platform == null ? 'fallback' : opts.platform
  var hasUnicode = !!opts.hasUnicode
  var hasColor = !!opts.hasColor
  if (!this.defaults[platform]) this.defaults[platform] = {true: {}, false: {}}
  this.defaults[platform][hasUnicode][hasColor] = name
}

ThemeSetProto.getDefault = function (opts) {
  if (!opts) opts = {}
  var platformName = opts.platform || process.platform
  var platform = this.defaults[platformName] || this.defaults.fallback
  var hasUnicode = !!opts.hasUnicode
  var hasColor = !!opts.hasColor
  if (!platform) throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
  if (!platform[hasUnicode][hasColor]) {
    if (hasUnicode && hasColor && platform[!hasUnicode][hasColor]) {
      hasUnicode = false
    } else if (hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
      hasColor = false
    } else if (hasUnicode && hasColor && platform[!hasUnicode][!hasColor]) {
      hasUnicode = false
      hasColor = false
    } else if (hasUnicode && !hasColor && platform[!hasUnicode][hasColor]) {
      hasUnicode = false
    } else if (!hasUnicode && hasColor && platform[hasUnicode][!hasColor]) {
      hasColor = false
    } else if (platform === this.defaults.fallback) {
      throw this.newMissingDefaultThemeError(platformName, hasUnicode, hasColor)
    }
  }
  if (platform[hasUnicode][hasColor]) {
    return this.getTheme(platform[hasUnicode][hasColor])
  } else {
    return this.getDefault(objectAssign({}, opts, {platform: 'fallback'}))
  }
}

ThemeSetProto.newMissingThemeError = function newMissingThemeError (name) {
  var err = new Error('Could not find a gauge theme named "' + name + '"')
  Error.captureStackTrace.call(err, newMissingThemeError)
  err.theme = name
  err.code = 'EMISSINGTHEME'
  return err
}

ThemeSetProto.newMissingDefaultThemeError = function newMissingDefaultThemeError (platformName, hasUnicode, hasColor) {
  var err = new Error(
    'Could not find a gauge theme for your platform/unicode/color use combo:\n' +
    '    platform = ' + platformName + '\n' +
    '    hasUnicode = ' + hasUnicode + '\n' +
    '    hasColor = ' + hasColor)
  Error.captureStackTrace.call(err, newMissingDefaultThemeError)
  err.platform = platformName
  err.hasUnicode = hasUnicode
  err.hasColor = hasColor
  err.code = 'EMISSINGTHEME'
  return err
}

ThemeSetProto.newThemeSet = function () {
  var themeset = function (opts) {
    return themeset.getDefault(opts)
  }
  return objectAssign(themeset, ThemeSetProto, {
    themes: objectAssign({}, this.themes),
    baseTheme: objectAssign({}, this.baseTheme),
    defaults: JSON.parse(JSON.stringify(this.defaults || {}))
  })
}



/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var spin = __webpack_require__(55)
var progressBar = __webpack_require__(56)

module.exports = {
  activityIndicator: function (values, theme, width) {
    if (values.spun == null) return
    return spin(theme, values.spun)
  },
  progressbar: function (values, theme, width) {
    if (values.completed == null) return
    return progressBar(theme, width, values.completed)
  }
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function spin (spinstr, spun) {
  return spinstr[spun % spinstr.length]
}


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var validate = __webpack_require__(41)
var renderTemplate = __webpack_require__(33)
var wideTruncate = __webpack_require__(43)
var stringWidth = __webpack_require__(35)

module.exports = function (theme, width, completed) {
  validate('ONN', [theme, width, completed])
  if (completed < 0) completed = 0
  if (completed > 1) completed = 1
  if (width <= 0) return ''
  var sofar = Math.round(width * completed)
  var rest = width - sofar
  var template = [
    {type: 'complete', value: repeat(theme.complete, sofar), length: sofar},
    {type: 'remaining', value: repeat(theme.remaining, rest), length: rest}
  ]
  return renderTemplate(width, template, theme)
}

// lodash's way of repeating
function repeat (string, width) {
  var result = ''
  var n = width
  do {
    if (n % 2) {
      result += string
    }
    n = Math.floor(n / 2)
    /*eslint no-self-assign: 0*/
    string += string
  } while (n && stringWidth(result) < width)

  return wideTruncate(result, width)
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// this exists so we can replace it during testing
module.exports = setInterval


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// this exists so we can replace it during testing
module.exports = process


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var process = __webpack_require__(58)
try {
  module.exports = setImmediate
} catch (ex) {
  module.exports = process.nextTick
}


/***/ }),
/* 60 */
/***/ (function(module, exports) {

module.exports = function (blocking) {
  [process.stdout, process.stderr].forEach(function (stream) {
    if (stream._handle && stream.isTTY && typeof stream._handle.setBlocking === 'function') {
      stream._handle.setBlocking(blocking)
    }
  })
}


/***/ })
/******/ ]);
