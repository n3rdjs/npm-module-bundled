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


const NodeWatcher = __webpack_require__(3);
const PollWatcher = __webpack_require__(169);
const WatchmanWatcher = __webpack_require__(171);
const WatchexecWatcher = __webpack_require__(181);

function throwNoFSEventsSupports() {
  throw new Error('Sane >= 4 no longer support the fsevents module.');
}

function sane(dir, options) {
  options = options || {};
  if (options.watcher) {
    const WatcherClass = __webpack_require__(213)(options.watcher);
    return new WatcherClass(dir, options);
  } else if (options.poll) {
    return new PollWatcher(dir, options);
  } else if (options.watchman) {
    return new WatchmanWatcher(dir, options);
  } else if (options.watchexec) {
    return new WatchexecWatcher(dir, options);
  } else if (options.fsevents) {
    throwNoFSEventsSupports();
  } else {
    return new NodeWatcher(dir, options);
  }
}

module.exports = sane;
sane.NodeWatcher = NodeWatcher;
sane.PollWatcher = PollWatcher;
sane.WatchmanWatcher = WatchmanWatcher;
sane.WatchexecWatcher = WatchexecWatcher;

Object.defineProperty(sane, 'FSEventsWatcher', {
  get() {
    return throwNoFSEventsSupports();
  },
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(4);
const path = __webpack_require__(5);
const common = __webpack_require__(6);
const platform = __webpack_require__(168).platform();
const EventEmitter = __webpack_require__(9).EventEmitter;

/**
 * Constants
 */

const DEFAULT_DELAY = common.DEFAULT_DELAY;
const CHANGE_EVENT = common.CHANGE_EVENT;
const DELETE_EVENT = common.DELETE_EVENT;
const ADD_EVENT = common.ADD_EVENT;
const ALL_EVENT = common.ALL_EVENT;

/**
 * Export `NodeWatcher` class.
 * Watches `dir`.
 *
 * @class NodeWatcher
 * @param {String} dir
 * @param {Object} opts
 * @public
 */

module.exports = class NodeWatcher extends EventEmitter {
  constructor(dir, opts) {
    super();

    common.assignOptions(this, opts);

    this.watched = Object.create(null);
    this.changeTimers = Object.create(null);
    this.dirRegistery = Object.create(null);
    this.root = path.resolve(dir);
    this.watchdir = this.watchdir.bind(this);
    this.register = this.register.bind(this);
    this.checkedEmitError = this.checkedEmitError.bind(this);

    this.watchdir(this.root);
    common.recReaddir(
      this.root,
      this.watchdir,
      this.register,
      this.emit.bind(this, 'ready'),
      this.checkedEmitError,
      this.ignored
    );
  }

  /**
   * Register files that matches our globs to know what to type of event to
   * emit in the future.
   *
   * Registery looks like the following:
   *
   *  dirRegister => Map {
   *    dirpath => Map {
   *       filename => true
   *    }
   *  }
   *
   * @param {string} filepath
   * @return {boolean} whether or not we have registered the file.
   * @private
   */

  register(filepath) {
    let relativePath = path.relative(this.root, filepath);
    if (
      !common.isFileIncluded(this.globs, this.dot, this.doIgnore, relativePath)
    ) {
      return false;
    }

    let dir = path.dirname(filepath);
    if (!this.dirRegistery[dir]) {
      this.dirRegistery[dir] = Object.create(null);
    }

    let filename = path.basename(filepath);
    this.dirRegistery[dir][filename] = true;

    return true;
  }

  /**
   * Removes a file from the registery.
   *
   * @param {string} filepath
   * @private
   */

  unregister(filepath) {
    let dir = path.dirname(filepath);
    if (this.dirRegistery[dir]) {
      let filename = path.basename(filepath);
      delete this.dirRegistery[dir][filename];
    }
  }

  /**
   * Removes a dir from the registery.
   *
   * @param {string} dirpath
   * @private
   */

  unregisterDir(dirpath) {
    if (this.dirRegistery[dirpath]) {
      delete this.dirRegistery[dirpath];
    }
  }

  /**
   * Checks if a file or directory exists in the registery.
   *
   * @param {string} fullpath
   * @return {boolean}
   * @private
   */

  registered(fullpath) {
    let dir = path.dirname(fullpath);
    return (
      this.dirRegistery[fullpath] ||
      (this.dirRegistery[dir] &&
        this.dirRegistery[dir][path.basename(fullpath)])
    );
  }

  /**
   * Emit "error" event if it's not an ignorable event
   *
   * @param error
   * @private
   */
  checkedEmitError(error) {
    if (!isIgnorableFileError(error)) {
      this.emit('error', error);
    }
  }

  /**
   * Watch a directory.
   *
   * @param {string} dir
   * @private
   */

  watchdir(dir) {
    if (this.watched[dir]) {
      return;
    }

    let watcher = fs.watch(
      dir,
      { persistent: true },
      this.normalizeChange.bind(this, dir)
    );
    this.watched[dir] = watcher;

    watcher.on('error', this.checkedEmitError);

    if (this.root !== dir) {
      this.register(dir);
    }
  }

  /**
   * Stop watching a directory.
   *
   * @param {string} dir
   * @private
   */

  stopWatching(dir) {
    if (this.watched[dir]) {
      this.watched[dir].close();
      delete this.watched[dir];
    }
  }

  /**
   * End watching.
   *
   * @public
   */

  close(callback) {
    Object.keys(this.watched).forEach(this.stopWatching, this);
    this.removeAllListeners();
    if (typeof callback === 'function') {
      setImmediate(callback.bind(null, null, true));
    }
  }

  /**
   * On some platforms, as pointed out on the fs docs (most likely just win32)
   * the file argument might be missing from the fs event. Try to detect what
   * change by detecting if something was deleted or the most recent file change.
   *
   * @param {string} dir
   * @param {string} event
   * @param {string} file
   * @public
   */

  detectChangedFile(dir, event, callback) {
    if (!this.dirRegistery[dir]) {
      return;
    }

    let found = false;
    let closest = { mtime: 0 };
    let c = 0;
    Object.keys(this.dirRegistery[dir]).forEach(function(file, i, arr) {
      fs.lstat(
        path.join(dir, file),
        function(error, stat) {
          if (found) {
            return;
          }

          if (error) {
            if (isIgnorableFileError(error)) {
              found = true;
              callback(file);
            } else {
              this.emit('error', error);
            }
          } else {
            if (stat.mtime > closest.mtime) {
              stat.file = file;
              closest = stat;
            }
            if (arr.length === ++c) {
              callback(closest.file);
            }
          }
        }.bind(this)
      );
    }, this);
  }

  /**
   * Normalize fs events and pass it on to be processed.
   *
   * @param {string} dir
   * @param {string} event
   * @param {string} file
   * @public
   */

  normalizeChange(dir, event, file) {
    if (!file) {
      this.detectChangedFile(
        dir,
        event,
        function(actualFile) {
          if (actualFile) {
            this.processChange(dir, event, actualFile);
          }
        }.bind(this)
      );
    } else {
      this.processChange(dir, event, path.normalize(file));
    }
  }

  /**
   * Process changes.
   *
   * @param {string} dir
   * @param {string} event
   * @param {string} file
   * @public
   */

  processChange(dir, event, file) {
    let fullPath = path.join(dir, file);
    let relativePath = path.join(path.relative(this.root, dir), file);

    fs.lstat(
      fullPath,
      function(error, stat) {
        if (error && error.code !== 'ENOENT') {
          this.emit('error', error);
        } else if (!error && stat.isDirectory()) {
          // win32 emits usless change events on dirs.
          if (event !== 'change') {
            this.watchdir(fullPath);
            if (
              common.isFileIncluded(
                this.globs,
                this.dot,
                this.doIgnore,
                relativePath
              )
            ) {
              this.emitEvent(ADD_EVENT, relativePath, stat);
            }
          }
        } else {
          let registered = this.registered(fullPath);
          if (error && error.code === 'ENOENT') {
            this.unregister(fullPath);
            this.stopWatching(fullPath);
            this.unregisterDir(fullPath);
            if (registered) {
              this.emitEvent(DELETE_EVENT, relativePath);
            }
          } else if (registered) {
            this.emitEvent(CHANGE_EVENT, relativePath, stat);
          } else {
            if (this.register(fullPath)) {
              this.emitEvent(ADD_EVENT, relativePath, stat);
            }
          }
        }
      }.bind(this)
    );
  }

  /**
   * Triggers a 'change' event after debounding it to take care of duplicate
   * events on os x.
   *
   * @private
   */

  emitEvent(type, file, stat) {
    let key = type + '-' + file;
    let addKey = ADD_EVENT + '-' + file;
    if (type === CHANGE_EVENT && this.changeTimers[addKey]) {
      // Ignore the change event that is immediately fired after an add event.
      // (This happens on Linux).
      return;
    }
    clearTimeout(this.changeTimers[key]);
    this.changeTimers[key] = setTimeout(
      function() {
        delete this.changeTimers[key];
        if (type === ADD_EVENT && stat.isDirectory()) {
          // Recursively emit add events and watch for sub-files/folders
          common.recReaddir(
            path.resolve(this.root, file),
            function emitAddDir(dir, stats) {
              this.watchdir(dir);
              this.rawEmitEvent(
                ADD_EVENT,
                path.relative(this.root, dir),
                stats
              );
            }.bind(this),
            function emitAddFile(file, stats) {
              this.register(file);
              this.rawEmitEvent(
                ADD_EVENT,
                path.relative(this.root, file),
                stats
              );
            }.bind(this),
            function endCallback() {},
            this.checkedEmitError,
            this.ignored
          );
        } else {
          this.rawEmitEvent(type, file, stat);
        }
      }.bind(this),
      DEFAULT_DELAY
    );
  }

  /**
   * Actually emit the events
   */
  rawEmitEvent(type, file, stat) {
    this.emit(type, file, this.root, stat);
    this.emit(ALL_EVENT, type, file, this.root, stat);
  }
};
/**
 * Determine if a given FS error can be ignored
 *
 * @private
 */
function isIgnorableFileError(error) {
  return (
    error.code === 'ENOENT' ||
    // Workaround Windows node issue #4337.
    (error.code === 'EPERM' && platform === 'win32')
  );
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const walker = __webpack_require__(7);
const anymatch = __webpack_require__(12);
const micromatch = __webpack_require__(13);
const path = __webpack_require__(5);
const platform = __webpack_require__(168).platform();

/**
 * Constants
 */

exports.DEFAULT_DELAY = 100;
exports.CHANGE_EVENT = 'change';
exports.DELETE_EVENT = 'delete';
exports.ADD_EVENT = 'add';
exports.ALL_EVENT = 'all';

/**
 * Assigns options to the watcher.
 *
 * @param {NodeWatcher|PollWatcher|WatchmanWatcher} watcher
 * @param {?object} opts
 * @return {boolean}
 * @public
 */

exports.assignOptions = function(watcher, opts) {
  opts = opts || {};
  watcher.globs = opts.glob || [];
  watcher.dot = opts.dot || false;
  watcher.ignored = opts.ignored || false;

  if (!Array.isArray(watcher.globs)) {
    watcher.globs = [watcher.globs];
  }
  watcher.hasIgnore =
    Boolean(opts.ignored) && !(Array.isArray(opts) && opts.length > 0);
  watcher.doIgnore = opts.ignored ? anymatch(opts.ignored) : () => false;

  if (opts.watchman && opts.watchmanPath) {
    watcher.watchmanPath = opts.watchmanPath;
  }

  return opts;
};

/**
 * Checks a file relative path against the globs array.
 *
 * @param {array} globs
 * @param {string} relativePath
 * @return {boolean}
 * @public
 */

exports.isFileIncluded = function(globs, dot, doIgnore, relativePath) {
  if (doIgnore(relativePath)) {
    return false;
  }
  return globs.length
    ? micromatch.some(relativePath, globs, { dot: dot })
    : dot || micromatch.some(relativePath, '**/*');
};

/**
 * Traverse a directory recursively calling `callback` on every directory.
 *
 * @param {string} dir
 * @param {function} dirCallback
 * @param {function} fileCallback
 * @param {function} endCallback
 * @param {*} ignored
 * @public
 */

exports.recReaddir = function(
  dir,
  dirCallback,
  fileCallback,
  endCallback,
  errorCallback,
  ignored
) {
  walker(dir)
    .filterDir(currentDir => !anymatch(ignored, currentDir))
    .on('dir', normalizeProxy(dirCallback))
    .on('file', normalizeProxy(fileCallback))
    .on('error', errorCallback)
    .on('end', () => {
      if (platform === 'win32') {
        setTimeout(endCallback, 1000);
      } else {
        endCallback();
      }
    });
};

/**
 * Returns a callback that when called will normalize a path and call the
 * original callback
 *
 * @param {function} callback
 * @return {function}
 * @private
 */

function normalizeProxy(callback) {
  return (filepath, stats) => callback(path.normalize(filepath), stats);
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = Walker

var path = __webpack_require__(5)
  , fs = __webpack_require__(4)
  , util = __webpack_require__(8)
  , EventEmitter = __webpack_require__(9).EventEmitter
  , makeError = __webpack_require__(10)

/**
 * To walk a directory. It's complicated (but it's async, so it must be fast).
 *
 * @param root {String} the directory to start with
 */
function Walker(root) {
  if (!(this instanceof Walker)) return new Walker(root)
  EventEmitter.call(this)
  this._pending = 0
  this._filterDir = function() { return true }
  this.go(root)
}
util.inherits(Walker, EventEmitter)

/**
 * Errors of this type are thrown when the type of a file could not be
 * determined.
 */
var UnknownFileTypeError = Walker.UnknownFileTypeError = makeError(
  'UnknownFileTypeError',
  'The type of this file could not be determined.'
)

/**
 * Setup a function to filter out directory entries.
 *
 * @param fn {Function} a function that will be given a directory name, which
 * if returns true will include the directory and it's children
 */
Walker.prototype.filterDir = function(fn) {
  this._filterDir = fn
  return this
}

/**
 * Process a file or directory.
 */
Walker.prototype.go = function(entry) {
  var that = this
  this._pending++

  fs.lstat(entry, function(er, stat) {
    if (er) {
      that.emit('error', er, entry, stat)
      that.doneOne()
      return
    }

    if (stat.isDirectory()) {
      if (!that._filterDir(entry, stat)) {
        that.doneOne()
      } else {
        fs.readdir(entry, function(er, files) {
          if (er) {
            that.emit('error', er, entry, stat)
            that.doneOne()
            return
          }

          that.emit('entry', entry, stat)
          that.emit('dir', entry, stat)
          files.forEach(function(part) {
            that.go(path.join(entry, part))
          })
          that.doneOne()
        })
      }
    } else if (stat.isSymbolicLink()) {
      that.emit('entry', entry, stat)
      that.emit('symlink', entry, stat)
      that.doneOne()
    } else if (stat.isBlockDevice()) {
      that.emit('entry', entry, stat)
      that.emit('blockDevice', entry, stat)
      that.doneOne()
    } else if (stat.isCharacterDevice()) {
      that.emit('entry', entry, stat)
      that.emit('characterDevice', entry, stat)
      that.doneOne()
    } else if (stat.isFIFO()) {
      that.emit('entry', entry, stat)
      that.emit('fifo', entry, stat)
      that.doneOne()
    } else if (stat.isSocket()) {
      that.emit('entry', entry, stat)
      that.emit('socket', entry, stat)
      that.doneOne()
    } else if (stat.isFile()) {
      that.emit('entry', entry, stat)
      that.emit('file', entry, stat)
      that.doneOne()
    } else {
      that.emit('error', UnknownFileTypeError(), entry, stat)
      that.doneOne()
    }
  })
  return this
}

Walker.prototype.doneOne = function() {
  if (--this._pending === 0) this.emit('end')
  return this
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var tmpl = __webpack_require__(11)

module.exports = makeError

function BaseError() {}
BaseError.prototype = new Error()
BaseError.prototype.toString = function() {
  return this.message
}


/**
 * Makes an Error function with the signature:
 *
 *   function(message, data)
 *
 * You'll typically do something like:
 *
 *   var UnknownFileTypeError = makeError(
 *     'UnknownFileTypeError',
 *     'The specified type is not known.'
 *   )
 *   var er = UnknownFileTypeError()
 *
 * `er` will have a prototype chain that ensures:
 *
 *   er instanceof Error
 *   er instanceof UnknownFileTypeError
 *
 * You can also do `var er = new UnknownFileTypeError()` if you really like the
 * `new` keyword.
 *
 * @param String  The name of the error.
 * @param String  The default message string.
 * @param Object  The default data object, merged with per instance data.
 */
function makeError(name, defaultMessage, defaultData) {
  defaultMessage = tmpl(defaultMessage || '')
  defaultData = defaultData || {}
  if (defaultData.proto && !(defaultData.proto instanceof BaseError))
    throw new Error('The custom "proto" must be an Error created via makeError')

  var CustomError = function(message, data) {
    if (!(this instanceof CustomError)) return new CustomError(message, data)

    if (typeof message !== 'string' && !data) {
      data = message
      message = null
    }

    this.name = name
    this.data = data || defaultData

    if (typeof message === 'string') {
      this.message = tmpl(message, this.data)
    } else {
      this.message = defaultMessage(this.data)
    }

    var er = new Error()
    this.stack = er.stack
    if (this.stack) {
      // remove TWO stack level:
      if (typeof Components !== 'undefined') {
        // Mozilla:
        this.stack = this.stack.substring(this.stack.indexOf('\n') + 2)
      } else if (typeof chrome !== 'undefined' || typeof process !== 'undefined') {
        // Google Chrome/Node.js:
        this.stack = this.stack.replace(/\n[^\n]*/, '')
        this.stack = this.stack.replace(/\n[^\n]*/, '')
        this.stack = (
          this.name +
          (this.message ? (': ' + this.message) : '') +
          this.stack.substring(5)
        )
      }
    }

    if ('fileName' in er) this.fileName = er.fileName
    if ('lineNumber' in er) this.lineNumber = er.lineNumber
  }

  CustomError.prototype = defaultData.proto || new BaseError()
  delete defaultData.proto

  return CustomError
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var INTERPOLATE = /{([\s\S]+?)}/g

module.exports = function(str, data) {
  var tmpl = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
    'with(obj||{}){__p.push(\'' +
    str.replace(/\\/g, '\\\\')
       .replace(/'/g, "\\'")
       .replace(INTERPOLATE, function(match, code) {
         return "'," + code.replace(/\\'/g, "'") + ",'"
       })
       .replace(/\r/g, '\\r')
       .replace(/\n/g, '\\n')
       .replace(/\t/g, '\\t')
       + "');}return __p.join('');"
  var func = new Function('obj', tmpl)
  return data ? func(data) : func
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var micromatch = __webpack_require__(13);
var normalize = __webpack_require__(166);
var path = __webpack_require__(5); // required for tests.
var arrify = function(a) { return a == null ? [] : (Array.isArray(a) ? a : [a]); };

var anymatch = function(criteria, value, returnIndex, startIndex, endIndex) {
  criteria = arrify(criteria);
  value = arrify(value);
  if (arguments.length === 1) {
    return anymatch.bind(null, criteria.map(function(criterion) {
      return typeof criterion === 'string' && criterion[0] !== '!' ?
        micromatch.matcher(criterion) : criterion;
    }));
  }
  startIndex = startIndex || 0;
  var string = value[0];
  var altString, altValue;
  var matched = false;
  var matchIndex = -1;
  function testCriteria(criterion, index) {
    var result;
    switch (Object.prototype.toString.call(criterion)) {
    case '[object String]':
      result = string === criterion || altString && altString === criterion;
      result = result || micromatch.isMatch(string, criterion);
      break;
    case '[object RegExp]':
      result = criterion.test(string) || altString && criterion.test(altString);
      break;
    case '[object Function]':
      result = criterion.apply(null, value);
      result = result || altValue && criterion.apply(null, altValue);
      break;
    default:
      result = false;
    }
    if (result) {
      matchIndex = index + startIndex;
    }
    return result;
  }
  var crit = criteria;
  var negGlobs = crit.reduce(function(arr, criterion, index) {
    if (typeof criterion === 'string' && criterion[0] === '!') {
      if (crit === criteria) {
        // make a copy before modifying
        crit = crit.slice();
      }
      crit[index] = null;
      arr.push(criterion.substr(1));
    }
    return arr;
  }, []);
  if (!negGlobs.length || !micromatch.any(string, negGlobs)) {
    if (path.sep === '\\' && typeof string === 'string') {
      altString = normalize(string);
      altString = altString === string ? null : altString;
      if (altString) altValue = [altString].concat(value.slice(1));
    }
    matched = crit.slice(startIndex, endIndex).some(testCriteria);
  }
  return returnIndex === true ? matchIndex : matched;
};

module.exports = anymatch;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */

var util = __webpack_require__(8);
var braces = __webpack_require__(14);
var toRegex = __webpack_require__(15);
var extend = __webpack_require__(28);

/**
 * Local dependencies
 */

var compilers = __webpack_require__(136);
var parsers = __webpack_require__(163);
var cache = __webpack_require__(164);
var utils = __webpack_require__(165);
var MAX_LENGTH = 1024 * 64;

/**
 * The main function takes a list of strings and one or more
 * glob patterns to use for matching.
 *
 * ```js
 * var mm = require('micromatch');
 * mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {Array} `list` A list of strings to match
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */

function micromatch(list, patterns, options) {
  patterns = utils.arrayify(patterns);
  list = utils.arrayify(list);

  var len = patterns.length;
  if (list.length === 0 || len === 0) {
    return [];
  }

  if (len === 1) {
    return micromatch.match(list, patterns[0], options);
  }

  var omit = [];
  var keep = [];
  var idx = -1;

  while (++idx < len) {
    var pattern = patterns[idx];

    if (typeof pattern === 'string' && pattern.charCodeAt(0) === 33 /* ! */) {
      omit.push.apply(omit, micromatch.match(list, pattern.slice(1), options));
    } else {
      keep.push.apply(keep, micromatch.match(list, pattern, options));
    }
  }

  var matches = utils.diff(keep, omit);
  if (!options || options.nodupes !== false) {
    return utils.unique(matches);
  }

  return matches;
}

/**
 * Similar to the main function, but `pattern` must be a string.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.match(list, pattern[, options]);
 *
 * console.log(mm.match(['a.a', 'a.aa', 'a.b', 'a.c'], '*.a'));
 * //=> ['a.a', 'a.aa']
 * ```
 * @param {Array} `list` Array of strings to match
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of matches
 * @api public
 */

micromatch.match = function(list, pattern, options) {
  if (Array.isArray(pattern)) {
    throw new TypeError('expected pattern to be a string');
  }

  var unixify = utils.unixify(options);
  var isMatch = memoize('match', pattern, options, micromatch.matcher);
  var matches = [];

  list = utils.arrayify(list);
  var len = list.length;
  var idx = -1;

  while (++idx < len) {
    var ele = list[idx];
    if (ele === pattern || isMatch(ele)) {
      matches.push(utils.value(ele, unixify, options));
    }
  }

  // if no options were passed, uniquify results and return
  if (typeof options === 'undefined') {
    return utils.unique(matches);
  }

  if (matches.length === 0) {
    if (options.failglob === true) {
      throw new Error('no matches found for "' + pattern + '"');
    }
    if (options.nonull === true || options.nullglob === true) {
      return [options.unescape ? utils.unescape(pattern) : pattern];
    }
  }

  // if `opts.ignore` was defined, diff ignored list
  if (options.ignore) {
    matches = micromatch.not(matches, options.ignore, options);
  }

  return options.nodupes !== false ? utils.unique(matches) : matches;
};

/**
 * Returns true if the specified `string` matches the given glob `pattern`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.isMatch(string, pattern[, options]);
 *
 * console.log(mm.isMatch('a.a', '*.a'));
 * //=> true
 * console.log(mm.isMatch('a.b', '*.a'));
 * //=> false
 * ```
 * @param {String} `string` String to match
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the string matches the glob pattern.
 * @api public
 */

micromatch.isMatch = function(str, pattern, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }

  if (isEmptyString(str) || isEmptyString(pattern)) {
    return false;
  }

  var equals = utils.equalsPattern(options);
  if (equals(str)) {
    return true;
  }

  var isMatch = memoize('isMatch', pattern, options, micromatch.matcher);
  return isMatch(str);
};

/**
 * Returns true if some of the strings in the given `list` match any of the
 * given glob `patterns`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.some(list, patterns[, options]);
 *
 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param  {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.some = function(list, patterns, options) {
  if (typeof list === 'string') {
    list = [list];
  }
  for (var i = 0; i < list.length; i++) {
    if (micromatch(list[i], patterns, options).length === 1) {
      return true;
    }
  }
  return false;
};

/**
 * Returns true if every string in the given `list` matches
 * any of the given glob `patterns`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.every(list, patterns[, options]);
 *
 * console.log(mm.every('foo.js', ['foo.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param  {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.every = function(list, patterns, options) {
  if (typeof list === 'string') {
    list = [list];
  }
  for (var i = 0; i < list.length; i++) {
    if (micromatch(list[i], patterns, options).length !== 1) {
      return false;
    }
  }
  return true;
};

/**
 * Returns true if **any** of the given glob `patterns`
 * match the specified `string`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.any(string, patterns[, options]);
 *
 * console.log(mm.any('a.a', ['b.*', '*.a']));
 * //=> true
 * console.log(mm.any('a.a', 'b.*'));
 * //=> false
 * ```
 * @param  {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.any = function(str, patterns, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }

  if (isEmptyString(str) || isEmptyString(patterns)) {
    return false;
  }

  if (typeof patterns === 'string') {
    patterns = [patterns];
  }

  for (var i = 0; i < patterns.length; i++) {
    if (micromatch.isMatch(str, patterns[i], options)) {
      return true;
    }
  }
  return false;
};

/**
 * Returns true if **all** of the given `patterns` match
 * the specified string.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.all(string, patterns[, options]);
 *
 * console.log(mm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param  {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

micromatch.all = function(str, patterns, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }
  if (typeof patterns === 'string') {
    patterns = [patterns];
  }
  for (var i = 0; i < patterns.length; i++) {
    if (!micromatch.isMatch(str, patterns[i], options)) {
      return false;
    }
  }
  return true;
};

/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.not(list, patterns[, options]);
 *
 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */

micromatch.not = function(list, patterns, options) {
  var opts = extend({}, options);
  var ignore = opts.ignore;
  delete opts.ignore;

  var unixify = utils.unixify(opts);
  list = utils.arrayify(list).map(unixify);

  var matches = utils.diff(list, micromatch(list, patterns, opts));
  if (ignore) {
    matches = utils.diff(matches, micromatch(list, ignore));
  }

  return opts.nodupes !== false ? utils.unique(matches) : matches;
};

/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.contains(string, pattern[, options]);
 *
 * console.log(mm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(mm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the patter matches any part of `str`.
 * @api public
 */

micromatch.contains = function(str, patterns, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }

  if (typeof patterns === 'string') {
    if (isEmptyString(str) || isEmptyString(patterns)) {
      return false;
    }

    var equals = utils.equalsPattern(patterns, options);
    if (equals(str)) {
      return true;
    }
    var contains = utils.containsPattern(patterns, options);
    if (contains(str)) {
      return true;
    }
  }

  var opts = extend({}, options, {contains: true});
  return micromatch.any(str, patterns, opts);
};

/**
 * Returns true if the given pattern and options should enable
 * the `matchBase` option.
 * @return {Boolean}
 * @api private
 */

micromatch.matchBase = function(pattern, options) {
  if (pattern && pattern.indexOf('/') !== -1 || !options) return false;
  return options.basename === true || options.matchBase === true;
};

/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.matchKeys(object, patterns[, options]);
 *
 * var obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(mm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */

micromatch.matchKeys = function(obj, patterns, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('expected the first argument to be an object');
  }
  var keys = micromatch(Object.keys(obj), patterns, options);
  return utils.pick(obj, keys);
};

/**
 * Returns a memoized matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.matcher(pattern[, options]);
 *
 * var isMatch = mm.matcher('*.!(*a)');
 * console.log(isMatch('a.a'));
 * //=> false
 * console.log(isMatch('a.b'));
 * //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options` See available [options](#options) for changing how matches are performed.
 * @return {Function} Returns a matcher function.
 * @api public
 */

micromatch.matcher = function matcher(pattern, options) {
  if (Array.isArray(pattern)) {
    return compose(pattern, options, matcher);
  }

  // if pattern is a regex
  if (pattern instanceof RegExp) {
    return test(pattern);
  }

  // if pattern is invalid
  if (!utils.isString(pattern)) {
    throw new TypeError('expected pattern to be an array, string or regex');
  }

  // if pattern is a non-glob string
  if (!utils.hasSpecialChars(pattern)) {
    if (options && options.nocase === true) {
      pattern = pattern.toLowerCase();
    }
    return utils.matchPath(pattern, options);
  }

  // if pattern is a glob string
  var re = micromatch.makeRe(pattern, options);

  // if `options.matchBase` or `options.basename` is defined
  if (micromatch.matchBase(pattern, options)) {
    return utils.matchBasename(re, options);
  }

  function test(regex) {
    var equals = utils.equalsPattern(options);
    var unixify = utils.unixify(options);

    return function(str) {
      if (equals(str)) {
        return true;
      }

      if (regex.test(unixify(str))) {
        return true;
      }
      return false;
    };
  }

  var fn = test(re);
  Object.defineProperty(fn, 'result', {
    configurable: true,
    enumerable: false,
    value: re.result
  });
  return fn;
};

/**
 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.capture(pattern, string[, options]);
 *
 * console.log(mm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {String} `string` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns an array of captures if the string matches the glob pattern, otherwise `null`.
 * @api public
 */

micromatch.capture = function(pattern, str, options) {
  var re = micromatch.makeRe(pattern, extend({capture: true}, options));
  var unixify = utils.unixify(options);

  function match() {
    return function(string) {
      var match = re.exec(unixify(string));
      if (!match) {
        return null;
      }

      return match.slice(1);
    };
  }

  var capture = memoize('capture', pattern, options, match);
  return capture(str);
};

/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.makeRe(pattern[, options]);
 *
 * console.log(mm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed.
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

micromatch.makeRe = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  if (pattern.length > MAX_LENGTH) {
    throw new Error('expected pattern to be less than ' + MAX_LENGTH + ' characters');
  }

  function makeRe() {
    var result = micromatch.create(pattern, options);
    var ast_array = [];
    var output = result.map(function(obj) {
      obj.ast.state = obj.state;
      ast_array.push(obj.ast);
      return obj.output;
    });

    var regex = toRegex(output.join('|'), options);
    Object.defineProperty(regex, 'result', {
      configurable: true,
      enumerable: false,
      value: ast_array
    });
    return regex;
  }

  return memoize('makeRe', pattern, options, makeRe);
};

/**
 * Expand the given brace `pattern`.
 *
 * ```js
 * var mm = require('micromatch');
 * console.log(mm.braces('foo/{a,b}/bar'));
 * //=> ['foo/(a|b)/bar']
 *
 * console.log(mm.braces('foo/{a,b}/bar', {expand: true}));
 * //=> ['foo/(a|b)/bar']
 * ```
 * @param {String} `pattern` String with brace pattern to expand.
 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
 * @return {Array}
 * @api public
 */

micromatch.braces = function(pattern, options) {
  if (typeof pattern !== 'string' && !Array.isArray(pattern)) {
    throw new TypeError('expected pattern to be an array or string');
  }

  function expand() {
    if (options && options.nobrace === true || !/\{.*\}/.test(pattern)) {
      return utils.arrayify(pattern);
    }
    return braces(pattern, options);
  }

  return memoize('braces', pattern, options, expand);
};

/**
 * Proxy to the [micromatch.braces](#method), for parity with
 * minimatch.
 */

micromatch.braceExpand = function(pattern, options) {
  var opts = extend({}, options, {expand: true});
  return micromatch.braces(pattern, opts);
};

/**
 * Parses the given glob `pattern` and returns an array of abstract syntax
 * trees (ASTs), with the compiled `output` and optional source `map` on
 * each AST.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.create(pattern[, options]);
 *
 * console.log(mm.create('abc/*.js'));
 * // [{ options: { source: 'string', sourcemap: true },
 * //   state: {},
 * //   compilers:
 * //    { ... },
 * //   output: '(\\.[\\\\\\/])?abc\\/(?!\\.)(?=.)[^\\/]*?\\.js',
 * //   ast:
 * //    { type: 'root',
 * //      errors: [],
 * //      nodes:
 * //       [ ... ],
 * //      dot: false,
 * //      input: 'abc/*.js' },
 * //   parsingErrors: [],
 * //   map:
 * //    { version: 3,
 * //      sources: [ 'string' ],
 * //      names: [],
 * //      mappings: 'AAAA,GAAG,EAAC,kBAAC,EAAC,EAAE',
 * //      sourcesContent: [ 'abc/*.js' ] },
 * //   position: { line: 1, column: 28 },
 * //   content: {},
 * //   files: {},
 * //   idx: 6 }]
 * ```
 * @param {String} `pattern` Glob pattern to parse and compile.
 * @param {Object} `options` Any [options](#options) to change how parsing and compiling is performed.
 * @return {Object} Returns an object with the parsed AST, compiled string and optional source map.
 * @api public
 */

micromatch.create = function(pattern, options) {
  return memoize('create', pattern, options, function() {
    function create(str, opts) {
      return micromatch.compile(micromatch.parse(str, opts), opts);
    }

    pattern = micromatch.braces(pattern, options);
    var len = pattern.length;
    var idx = -1;
    var res = [];

    while (++idx < len) {
      res.push(create(pattern[idx], options));
    }
    return res;
  });
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.parse(pattern[, options]);
 *
 * var ast = mm.parse('a/{b,c}/d');
 * console.log(ast);
 * // { type: 'root',
 * //   errors: [],
 * //   input: 'a/{b,c}/d',
 * //   nodes:
 * //    [ { type: 'bos', val: '' },
 * //      { type: 'text', val: 'a/' },
 * //      { type: 'brace',
 * //        nodes:
 * //         [ { type: 'brace.open', val: '{' },
 * //           { type: 'text', val: 'b,c' },
 * //           { type: 'brace.close', val: '}' } ] },
 * //      { type: 'text', val: '/d' },
 * //      { type: 'eos', val: '' } ] }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an AST
 * @api public
 */

micromatch.parse = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected a string');
  }

  function parse() {
    var snapdragon = utils.instantiate(null, options);
    parsers(snapdragon, options);

    var ast = snapdragon.parse(pattern, options);
    utils.define(ast, 'snapdragon', snapdragon);
    ast.input = pattern;
    return ast;
  }

  return memoize('parse', pattern, options, parse);
};

/**
 * Compile the given `ast` or string with the given `options`.
 *
 * ```js
 * var mm = require('micromatch');
 * mm.compile(ast[, options]);
 *
 * var ast = mm.parse('a/{b,c}/d');
 * console.log(mm.compile(ast));
 * // { options: { source: 'string' },
 * //   state: {},
 * //   compilers:
 * //    { eos: [Function],
 * //      noop: [Function],
 * //      bos: [Function],
 * //      brace: [Function],
 * //      'brace.open': [Function],
 * //      text: [Function],
 * //      'brace.close': [Function] },
 * //   output: [ 'a/(b|c)/d' ],
 * //   ast:
 * //    { ... },
 * //   parsingErrors: [] }
 * ```
 * @param {Object|String} `ast`
 * @param {Object} `options`
 * @return {Object} Returns an object that has an `output` property with the compiled string.
 * @api public
 */

micromatch.compile = function(ast, options) {
  if (typeof ast === 'string') {
    ast = micromatch.parse(ast, options);
  }

  return memoize('compile', ast.input, options, function() {
    var snapdragon = utils.instantiate(ast, options);
    compilers(snapdragon, options);
    return snapdragon.compile(ast, options);
  });
};

/**
 * Clear the regex cache.
 *
 * ```js
 * mm.clearCache();
 * ```
 * @api public
 */

micromatch.clearCache = function() {
  micromatch.cache.caches = {};
};

/**
 * Returns true if the given value is effectively an empty string
 */

function isEmptyString(val) {
  return String(val) === '' || String(val) === './';
}

/**
 * Compose a matcher function with the given patterns.
 * This allows matcher functions to be compiled once and
 * called multiple times.
 */

function compose(patterns, options, matcher) {
  var matchers;

  return memoize('compose', String(patterns), options, function() {
    return function(file) {
      // delay composition until it's invoked the first time,
      // after that it won't be called again
      if (!matchers) {
        matchers = [];
        for (var i = 0; i < patterns.length; i++) {
          matchers.push(matcher(patterns[i], options));
        }
      }

      var len = matchers.length;
      while (len--) {
        if (matchers[len](file) === true) {
          return true;
        }
      }
      return false;
    };
  });
}

/**
 * Memoize a generated regex or function. A unique key is generated
 * from the `type` (usually method name), the `pattern`, and
 * user-defined options.
 */

function memoize(type, pattern, options, fn) {
  var key = utils.createKey(type + '=' + pattern, options);

  if (options && options.cache === false) {
    return fn(pattern, options);
  }

  if (cache.has(type, key)) {
    return cache.get(type, key);
  }

  var val = fn(pattern, options);
  cache.set(type, key, val);
  return val;
}

/**
 * Expose compiler, parser and cache on `micromatch`
 */

micromatch.compilers = compilers;
micromatch.parsers = parsers;
micromatch.caches = cache.caches;

/**
 * Expose `micromatch`
 * @type {Function}
 */

module.exports = micromatch;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */

var toRegex = __webpack_require__(15);
var unique = __webpack_require__(33);
var extend = __webpack_require__(34);

/**
 * Local dependencies
 */

var compilers = __webpack_require__(36);
var parsers = __webpack_require__(48);
var Braces = __webpack_require__(56);
var utils = __webpack_require__(37);
var MAX_LENGTH = 1024 * 64;
var cache = {};

/**
 * Convert the given `braces` pattern into a regex-compatible string. By default, only one string is generated for every input string. Set `options.expand` to true to return an array of patterns (similar to Bash or minimatch. Before using `options.expand`, it's recommended that you read the [performance notes](#performance)).
 *
 * ```js
 * var braces = require('braces');
 * console.log(braces('{a,b,c}'));
 * //=> ['(a|b|c)']
 *
 * console.log(braces('{a,b,c}', {expand: true}));
 * //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

function braces(pattern, options) {
  var key = utils.createKey(String(pattern), options);
  var arr = [];

  var disabled = options && options.cache === false;
  if (!disabled && cache.hasOwnProperty(key)) {
    return cache[key];
  }

  if (Array.isArray(pattern)) {
    for (var i = 0; i < pattern.length; i++) {
      arr.push.apply(arr, braces.create(pattern[i], options));
    }
  } else {
    arr = braces.create(pattern, options);
  }

  if (options && options.nodupes === true) {
    arr = unique(arr);
  }

  if (!disabled) {
    cache[key] = arr;
  }
  return arr;
}

/**
 * Expands a brace pattern into an array. This method is called by the main [braces](#braces) function when `options.expand` is true. Before using this method it's recommended that you read the [performance notes](#performance)) and advantages of using [.optimize](#optimize) instead.
 *
 * ```js
 * var braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.expand = function(pattern, options) {
  return braces.create(pattern, extend({}, options, {expand: true}));
};

/**
 * Expands a brace pattern into a regex-compatible, optimized string. This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * var braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.optimize = function(pattern, options) {
  return braces.create(pattern, options);
};

/**
 * Processes a brace pattern and returns either an expanded array (if `options.expand` is true), a highly optimized regex-compatible string. This method is called by the main [braces](#braces) function.
 *
 * ```js
 * var braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */

braces.create = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected a string');
  }

  var maxLength = (options && options.maxLength) || MAX_LENGTH;
  if (pattern.length >= maxLength) {
    throw new Error('expected pattern to be less than ' + maxLength + ' characters');
  }

  function create() {
    if (pattern === '' || pattern.length < 3) {
      return [pattern];
    }

    if (utils.isEmptySets(pattern)) {
      return [];
    }

    if (utils.isQuotedString(pattern)) {
      return [pattern.slice(1, -1)];
    }

    var proto = new Braces(options);
    var result = !options || options.expand !== true
      ? proto.optimize(pattern, options)
      : proto.expand(pattern, options);

    // get the generated pattern(s)
    var arr = result.output;

    // filter out empty strings if specified
    if (options && options.noempty === true) {
      arr = arr.filter(Boolean);
    }

    // filter out duplicates if specified
    if (options && options.nodupes === true) {
      arr = unique(arr);
    }

    Object.defineProperty(arr, 'result', {
      enumerable: false,
      value: result
    });

    return arr;
  }

  return memoize('create', pattern, options, create);
};

/**
 * Create a regular expression from the given string `pattern`.
 *
 * ```js
 * var braces = require('braces');
 *
 * console.log(braces.makeRe('id-{200..300}'));
 * //=> /^(?:id-(20[0-9]|2[1-9][0-9]|300))$/
 * ```
 * @param {String} `pattern` The pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

braces.makeRe = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected a string');
  }

  var maxLength = (options && options.maxLength) || MAX_LENGTH;
  if (pattern.length >= maxLength) {
    throw new Error('expected pattern to be less than ' + maxLength + ' characters');
  }

  function makeRe() {
    var arr = braces(pattern, options);
    var opts = extend({strictErrors: false}, options);
    return toRegex(arr, opts);
  }

  return memoize('makeRe', pattern, options, makeRe);
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * var braces = require('braces');
 * var ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * // { type: 'root',
 * //   errors: [],
 * //   input: 'a/{b,c}/d',
 * //   nodes:
 * //    [ { type: 'bos', val: '' },
 * //      { type: 'text', val: 'a/' },
 * //      { type: 'brace',
 * //        nodes:
 * //         [ { type: 'brace.open', val: '{' },
 * //           { type: 'text', val: 'b,c' },
 * //           { type: 'brace.close', val: '}' } ] },
 * //      { type: 'text', val: '/d' },
 * //      { type: 'eos', val: '' } ] }
 * ```
 * @param {String} `pattern` Brace pattern to parse
 * @param {Object} `options`
 * @return {Object} Returns an AST
 * @api public
 */

braces.parse = function(pattern, options) {
  var proto = new Braces(options);
  return proto.parse(pattern, options);
};

/**
 * Compile the given `ast` or string with the given `options`.
 *
 * ```js
 * var braces = require('braces');
 * var ast = braces.parse('a/{b,c}/d');
 * console.log(braces.compile(ast));
 * // { options: { source: 'string' },
 * //   state: {},
 * //   compilers:
 * //    { eos: [Function],
 * //      noop: [Function],
 * //      bos: [Function],
 * //      brace: [Function],
 * //      'brace.open': [Function],
 * //      text: [Function],
 * //      'brace.close': [Function] },
 * //   output: [ 'a/(b|c)/d' ],
 * //   ast:
 * //    { ... },
 * //   parsingErrors: [] }
 * ```
 * @param {Object|String} `ast` AST from [.parse](#parse). If a string is passed it will be parsed first.
 * @param {Object} `options`
 * @return {Object} Returns an object that has an `output` property with the compiled string.
 * @api public
 */

braces.compile = function(ast, options) {
  var proto = new Braces(options);
  return proto.compile(ast, options);
};

/**
 * Clear the regex cache.
 *
 * ```js
 * braces.clearCache();
 * ```
 * @api public
 */

braces.clearCache = function() {
  cache = braces.cache = {};
};

/**
 * Memoize a generated regex or function. A unique key is generated
 * from the method name, pattern, and user-defined options. Set
 * options.memoize to false to disable.
 */

function memoize(type, pattern, options, fn) {
  var key = utils.createKey(type + ':' + pattern, options);
  var disabled = options && options.cache === false;
  if (disabled) {
    braces.clearCache();
    return fn(pattern, options);
  }

  if (cache.hasOwnProperty(key)) {
    return cache[key];
  }

  var res = fn(pattern, options);
  cache[key] = res;
  return res;
}

/**
 * Expose `Braces` constructor and methods
 * @type {Function}
 */

braces.Braces = Braces;
braces.compilers = compilers;
braces.parsers = parsers;
braces.cache = cache;

/**
 * Expose `braces`
 * @type {Function}
 */

module.exports = braces;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var safe = __webpack_require__(16);
var define = __webpack_require__(22);
var extend = __webpack_require__(28);
var not = __webpack_require__(32);
var MAX_LENGTH = 1024 * 64;

/**
 * Session cache
 */

var cache = {};

/**
 * Create a regular expression from the given `pattern` string.
 *
 * @param {String|RegExp} `pattern` Pattern can be a string or regular expression.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

module.exports = function(patterns, options) {
  if (!Array.isArray(patterns)) {
    return makeRe(patterns, options);
  }
  return makeRe(patterns.join('|'), options);
};

/**
 * Create a regular expression from the given `pattern` string.
 *
 * @param {String|RegExp} `pattern` Pattern can be a string or regular expression.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

function makeRe(pattern, options) {
  if (pattern instanceof RegExp) {
    return pattern;
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('expected a string');
  }

  if (pattern.length > MAX_LENGTH) {
    throw new Error('expected pattern to be less than ' + MAX_LENGTH + ' characters');
  }

  var key = pattern;
  // do this before shallow cloning options, it's a lot faster
  if (!options || (options && options.cache !== false)) {
    key = createKey(pattern, options);

    if (cache.hasOwnProperty(key)) {
      return cache[key];
    }
  }

  var opts = extend({}, options);
  if (opts.contains === true) {
    if (opts.negate === true) {
      opts.strictNegate = false;
    } else {
      opts.strict = false;
    }
  }

  if (opts.strict === false) {
    opts.strictOpen = false;
    opts.strictClose = false;
  }

  var open = opts.strictOpen !== false ? '^' : '';
  var close = opts.strictClose !== false ? '$' : '';
  var flags = opts.flags || '';
  var regex;

  if (opts.nocase === true && !/i/.test(flags)) {
    flags += 'i';
  }

  try {
    if (opts.negate || typeof opts.strictNegate === 'boolean') {
      pattern = not.create(pattern, opts);
    }

    var str = open + '(?:' + pattern + ')' + close;
    regex = new RegExp(str, flags);

    if (opts.safe === true && safe(regex) === false) {
      throw new Error('potentially unsafe regular expression: ' + regex.source);
    }

  } catch (err) {
    if (opts.strictErrors === true || opts.safe === true) {
      err.key = key;
      err.pattern = pattern;
      err.originalOptions = options;
      err.createdOptions = opts;
      throw err;
    }

    try {
      regex = new RegExp('^' + pattern.replace(/(\W)/g, '\\$1') + '$');
    } catch (err) {
      regex = /.^/; //<= match nothing
    }
  }

  if (opts.cache !== false) {
    memoize(regex, key, pattern, opts);
  }
  return regex;
}

/**
 * Memoize generated regex. This can result in dramatic speed improvements
 * and simplify debugging by adding options and pattern to the regex. It can be
 * disabled by passing setting `options.cache` to false.
 */

function memoize(regex, key, pattern, options) {
  define(regex, 'cached', true);
  define(regex, 'pattern', pattern);
  define(regex, 'options', options);
  define(regex, 'key', key);
  cache[key] = regex;
}

/**
 * Create the key to use for memoization. The key is generated
 * by iterating over the options and concatenating key-value pairs
 * to the pattern string.
 */

function createKey(pattern, options) {
  if (!options) return pattern;
  var key = pattern;
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      key += ';' + prop + '=' + String(options[prop]);
    }
  }
  return key;
}

/**
 * Expose `makeRe`
 */

module.exports.makeRe = makeRe;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(17);
var types = parse.types;

module.exports = function (re, opts) {
    if (!opts) opts = {};
    var replimit = opts.limit === undefined ? 25 : opts.limit;
    
    if (isRegExp(re)) re = re.source;
    else if (typeof re !== 'string') re = String(re);
    
    try { re = parse(re) }
    catch (err) { return false }
    
    var reps = 0;
    return (function walk (node, starHeight) {
        if (node.type === types.REPETITION) {
            starHeight ++;
            reps ++;
            if (starHeight > 1) return false;
            if (reps > replimit) return false;
        }
        
        if (node.options) {
            for (var i = 0, len = node.options.length; i < len; i++) {
                var ok = walk({ stack: node.options[i] }, starHeight);
                if (!ok) return false;
            }
        }
        var stack = node.stack || (node.value && node.value.stack);
        if (!stack) return true;
        
        for (var i = 0; i < stack.length; i++) {
            var ok = walk(stack[i], starHeight);
            if (!ok) return false;
        }
        
        return true;
    })(re, 0);
};

function isRegExp (x) {
    return {}.toString.call(x) === '[object RegExp]';
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var util      = __webpack_require__(18);
var types     = __webpack_require__(19);
var sets      = __webpack_require__(20);
var positions = __webpack_require__(21);


module.exports = function(regexpStr) {
  var i = 0, l, c,
      start = { type: types.ROOT, stack: []},

      // Keep track of last clause/group and stack.
      lastGroup = start,
      last = start.stack,
      groupStack = [];


  var repeatErr = function(i) {
    util.error(regexpStr, 'Nothing to repeat at column ' + (i - 1));
  };

  // Decode a few escaped characters.
  var str = util.strToChars(regexpStr);
  l = str.length;

  // Iterate through each character in string.
  while (i < l) {
    c = str[i++];

    switch (c) {
      // Handle escaped characters, inclues a few sets.
      case '\\':
        c = str[i++];

        switch (c) {
          case 'b':
            last.push(positions.wordBoundary());
            break;

          case 'B':
            last.push(positions.nonWordBoundary());
            break;

          case 'w':
            last.push(sets.words());
            break;

          case 'W':
            last.push(sets.notWords());
            break;

          case 'd':
            last.push(sets.ints());
            break;

          case 'D':
            last.push(sets.notInts());
            break;

          case 's':
            last.push(sets.whitespace());
            break;

          case 'S':
            last.push(sets.notWhitespace());
            break;

          default:
            // Check if c is integer.
            // In which case it's a reference.
            if (/\d/.test(c)) {
              last.push({ type: types.REFERENCE, value: parseInt(c, 10) });

            // Escaped character.
            } else {
              last.push({ type: types.CHAR, value: c.charCodeAt(0) });
            }
        }

        break;


      // Positionals.
      case '^':
          last.push(positions.begin());
        break;

      case '$':
          last.push(positions.end());
        break;


      // Handle custom sets.
      case '[':
        // Check if this class is 'anti' i.e. [^abc].
        var not;
        if (str[i] === '^') {
          not = true;
          i++;
        } else {
          not = false;
        }

        // Get all the characters in class.
        var classTokens = util.tokenizeClass(str.slice(i), regexpStr);

        // Increase index by length of class.
        i += classTokens[1];
        last.push({
          type: types.SET,
          set: classTokens[0],
          not: not,
        });

        break;


      // Class of any character except \n.
      case '.':
        last.push(sets.anyChar());
        break;


      // Push group onto stack.
      case '(':
        // Create group.
        var group = {
          type: types.GROUP,
          stack: [],
          remember: true,
        };

        c = str[i];

        // If if this is a special kind of group.
        if (c === '?') {
          c = str[i + 1];
          i += 2;

          // Match if followed by.
          if (c === '=') {
            group.followedBy = true;

          // Match if not followed by.
          } else if (c === '!') {
            group.notFollowedBy = true;

          } else if (c !== ':') {
            util.error(regexpStr,
              'Invalid group, character \'' + c +
              '\' after \'?\' at column ' + (i - 1));
          }

          group.remember = false;
        }

        // Insert subgroup into current group stack.
        last.push(group);

        // Remember the current group for when the group closes.
        groupStack.push(lastGroup);

        // Make this new group the current group.
        lastGroup = group;
        last = group.stack;
        break;


      // Pop group out of stack.
      case ')':
        if (groupStack.length === 0) {
          util.error(regexpStr, 'Unmatched ) at column ' + (i - 1));
        }
        lastGroup = groupStack.pop();

        // Check if this group has a PIPE.
        // To get back the correct last stack.
        last = lastGroup.options ?
          lastGroup.options[lastGroup.options.length - 1] : lastGroup.stack;
        break;


      // Use pipe character to give more choices.
      case '|':
        // Create array where options are if this is the first PIPE
        // in this clause.
        if (!lastGroup.options) {
          lastGroup.options = [lastGroup.stack];
          delete lastGroup.stack;
        }

        // Create a new stack and add to options for rest of clause.
        var stack = [];
        lastGroup.options.push(stack);
        last = stack;
        break;


      // Repetition.
      // For every repetition, remove last element from last stack
      // then insert back a RANGE object.
      // This design is chosen because there could be more than
      // one repetition symbols in a regex i.e. `a?+{2,3}`.
      case '{':
        var rs = /^(\d+)(,(\d+)?)?\}/.exec(str.slice(i)), min, max;
        if (rs !== null) {
          if (last.length === 0) {
            repeatErr(i);
          }
          min = parseInt(rs[1], 10);
          max = rs[2] ? rs[3] ? parseInt(rs[3], 10) : Infinity : min;
          i += rs[0].length;

          last.push({
            type: types.REPETITION,
            min: min,
            max: max,
            value: last.pop(),
          });
        } else {
          last.push({
            type: types.CHAR,
            value: 123,
          });
        }
        break;

      case '?':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: 1,
          value: last.pop(),
        });
        break;

      case '+':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 1,
          max: Infinity,
          value: last.pop(),
        });
        break;

      case '*':
        if (last.length === 0) {
          repeatErr(i);
        }
        last.push({
          type: types.REPETITION,
          min: 0,
          max: Infinity,
          value: last.pop(),
        });
        break;


      // Default is a character that is not `\[](){}?+*^$`.
      default:
        last.push({
          type: types.CHAR,
          value: c.charCodeAt(0),
        });
    }

  }

  // Check if any groups have not been closed.
  if (groupStack.length !== 0) {
    util.error(regexpStr, 'Unterminated group');
  }

  return start;
};

module.exports.types = types;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(19);
var sets  = __webpack_require__(20);


// All of these are private and only used by randexp.
// It's assumed that they will always be called with the correct input.

var CTRL = '@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?';
var SLSH = { '0': 0, 't': 9, 'n': 10, 'v': 11, 'f': 12, 'r': 13 };

/**
 * Finds character representations in str and convert all to
 * their respective characters
 *
 * @param {String} str
 * @return {String}
 */
exports.strToChars = function(str) {
  /* jshint maxlen: false */
  var chars_regex = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;
  str = str.replace(chars_regex, function(s, b, lbs, a16, b16, c8, dctrl, eslsh) {
    if (lbs) {
      return s;
    }

    var code = b     ? 8 :
               a16   ? parseInt(a16, 16) :
               b16   ? parseInt(b16, 16) :
               c8    ? parseInt(c8,   8) :
               dctrl ? CTRL.indexOf(dctrl) :
               SLSH[eslsh];

    var c = String.fromCharCode(code);

    // Escape special regex characters.
    if (/[\[\]{}\^$.|?*+()]/.test(c)) {
      c = '\\' + c;
    }

    return c;
  });

  return str;
};


/**
 * turns class into tokens
 * reads str until it encounters a ] not preceeded by a \
 *
 * @param {String} str
 * @param {String} regexpStr
 * @return {Array.<Array.<Object>, Number>}
 */
exports.tokenizeClass = function(str, regexpStr) {
  /* jshint maxlen: false */
  var tokens = [];
  var regexp = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g;
  var rs, c;


  while ((rs = regexp.exec(str)) != null) {
    if (rs[1]) {
      tokens.push(sets.words());

    } else if (rs[2]) {
      tokens.push(sets.ints());

    } else if (rs[3]) {
      tokens.push(sets.whitespace());

    } else if (rs[4]) {
      tokens.push(sets.notWords());

    } else if (rs[5]) {
      tokens.push(sets.notInts());

    } else if (rs[6]) {
      tokens.push(sets.notWhitespace());

    } else if (rs[7]) {
      tokens.push({
        type: types.RANGE,
        from: (rs[8] || rs[9]).charCodeAt(0),
          to: rs[10].charCodeAt(0),
      });

    } else if (c = rs[12]) {
      tokens.push({
        type: types.CHAR,
        value: c.charCodeAt(0),
      });

    } else {
      return [tokens, regexp.lastIndex];
    }
  }

  exports.error(regexpStr, 'Unterminated character class');
};


/**
 * Shortcut to throw errors.
 *
 * @param {String} regexp
 * @param {String} msg
 */
exports.error = function(regexp, msg) {
  throw new SyntaxError('Invalid regular expression: /' + regexp + '/: ' + msg);
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = {
  ROOT       : 0,
  GROUP      : 1,
  POSITION   : 2,
  SET        : 3,
  RANGE      : 4,
  REPETITION : 5,
  REFERENCE  : 6,
  CHAR       : 7,
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(19);

var INTS = function() {
 return [{ type: types.RANGE , from: 48, to: 57 }];
};

var WORDS = function() {
 return [
    { type: types.CHAR, value: 95 },
    { type: types.RANGE, from: 97, to: 122 },
    { type: types.RANGE, from: 65, to: 90 }
  ].concat(INTS());
};

var WHITESPACE = function() {
 return [
    { type: types.CHAR, value: 9 },
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 11 },
    { type: types.CHAR, value: 12 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 32 },
    { type: types.CHAR, value: 160 },
    { type: types.CHAR, value: 5760 },
    { type: types.CHAR, value: 6158 },
    { type: types.CHAR, value: 8192 },
    { type: types.CHAR, value: 8193 },
    { type: types.CHAR, value: 8194 },
    { type: types.CHAR, value: 8195 },
    { type: types.CHAR, value: 8196 },
    { type: types.CHAR, value: 8197 },
    { type: types.CHAR, value: 8198 },
    { type: types.CHAR, value: 8199 },
    { type: types.CHAR, value: 8200 },
    { type: types.CHAR, value: 8201 },
    { type: types.CHAR, value: 8202 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
    { type: types.CHAR, value: 8239 },
    { type: types.CHAR, value: 8287 },
    { type: types.CHAR, value: 12288 },
    { type: types.CHAR, value: 65279 }
  ];
};

var NOTANYCHAR = function() {
  return [
    { type: types.CHAR, value: 10 },
    { type: types.CHAR, value: 13 },
    { type: types.CHAR, value: 8232 },
    { type: types.CHAR, value: 8233 },
  ];
};

// Predefined class objects.
exports.words = function() {
  return { type: types.SET, set: WORDS(), not: false };
};

exports.notWords = function() {
  return { type: types.SET, set: WORDS(), not: true };
};

exports.ints = function() {
  return { type: types.SET, set: INTS(), not: false };
};

exports.notInts = function() {
  return { type: types.SET, set: INTS(), not: true };
};

exports.whitespace = function() {
  return { type: types.SET, set: WHITESPACE(), not: false };
};

exports.notWhitespace = function() {
  return { type: types.SET, set: WHITESPACE(), not: true };
};

exports.anyChar = function() {
  return { type: types.SET, set: NOTANYCHAR(), not: true };
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var types = __webpack_require__(19);

exports.wordBoundary = function() {
  return { type: types.POSITION, value: 'b' };
};

exports.nonWordBoundary = function() {
  return { type: types.POSITION, value: 'B' };
};

exports.begin = function() {
  return { type: types.POSITION, value: '^' };
};

exports.end = function() {
  return { type: types.POSITION, value: '$' };
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */



var isobject = __webpack_require__(23);
var isDescriptor = __webpack_require__(24);
var define = (typeof Reflect !== 'undefined' && Reflect.defineProperty)
  ? Reflect.defineProperty
  : Object.defineProperty;

module.exports = function defineProperty(obj, key, val) {
  if (!isobject(obj) && typeof obj !== 'function' && !Array.isArray(obj)) {
    throw new TypeError('expected an object, function, or array');
  }

  if (typeof key !== 'string') {
    throw new TypeError('expected "key" to be a string');
  }

  if (isDescriptor(val)) {
    define(obj, key, val);
    return obj;
  }

  define(obj, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });

  return obj;
};


/***/ }),
/* 23 */
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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);
var isAccessor = __webpack_require__(26);
var isData = __webpack_require__(27);

module.exports = function isDescriptor(obj, key) {
  if (typeOf(obj) !== 'object') {
    return false;
  }
  if ('get' in obj) {
    return isAccessor(obj, key);
  }
  return isData(obj, key);
};


/***/ }),
/* 25 */
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
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

// accessor descriptor properties
var accessor = {
  get: 'function',
  set: 'function',
  configurable: 'boolean',
  enumerable: 'boolean'
};

function isAccessorDescriptor(obj, prop) {
  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (has(obj, 'value') || has(obj, 'writable')) {
    return false;
  }

  if (!has(obj, 'get') || typeof obj.get !== 'function') {
    return false;
  }

  // tldr: it's valid to have "set" be undefined
  // "set" might be undefined if `Object.getOwnPropertyDescriptor`
  // was used to get the value, and only `get` was defined by the user
  if (has(obj, 'set') && typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
    return false;
  }

  for (var key in obj) {
    if (!accessor.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === accessor[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
}

function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

/**
 * Expose `isAccessorDescriptor`
 */

module.exports = isAccessorDescriptor;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

module.exports = function isDataDescriptor(obj, prop) {
  // data descriptor properties
  var data = {
    configurable: 'boolean',
    enumerable: 'boolean',
    writable: 'boolean'
  };

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (!('value' in obj) && !('writable' in obj)) {
    return false;
  }

  for (var key in obj) {
    if (key === 'value') continue;

    if (!data.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === data[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isExtendable = __webpack_require__(29);
var assignSymbols = __webpack_require__(31);

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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isPlainObject = __webpack_require__(30);

module.exports = function isExtendable(val) {
  return isPlainObject(val) || typeof val === 'function' || Array.isArray(val);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(23);

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
/* 31 */
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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(28);
var safe = __webpack_require__(16);

/**
 * The main export is a function that takes a `pattern` string and an `options` object.
 *
 * ```js
 & var not = require('regex-not');
 & console.log(not('foo'));
 & //=> /^(?:(?!^(?:foo)$).)*$/
 * ```
 *
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {RegExp} Converts the given `pattern` to a regex using the specified `options`.
 * @api public
 */

function toRegex(pattern, options) {
  return new RegExp(toRegex.create(pattern, options));
}

/**
 * Create a regex-compatible string from the given `pattern` and `options`.
 *
 * ```js
 & var not = require('regex-not');
 & console.log(not.create('foo'));
 & //=> '^(?:(?!^(?:foo)$).)*$'
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

toRegex.create = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected a string');
  }

  var opts = extend({}, options);
  if (opts.contains === true) {
    opts.strictNegate = false;
  }

  var open = opts.strictOpen !== false ? '^' : '';
  var close = opts.strictClose !== false ? '$' : '';
  var endChar = opts.endChar ? opts.endChar : '+';
  var str = pattern;

  if (opts.strictNegate === false) {
    str = '(?:(?!(?:' + pattern + ')).)' + endChar;
  } else {
    str = '(?:(?!^(?:' + pattern + ')$).)' + endChar;
  }

  var res = open + str + close;
  if (opts.safe === true && safe(res) === false) {
    throw new Error('potentially unsafe regular expression: ' + res);
  }

  return res;
};

/**
 * Expose `toRegex`
 */

module.exports = toRegex;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * array-unique <https://github.com/jonschlinkert/array-unique>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



module.exports = function unique(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('array-unique expects an array.');
  }

  var len = arr.length;
  var i = -1;

  while (i++ < len) {
    var j = i + 1;

    for (; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        arr.splice(j--, 1);
      }
    }
  }
  return arr;
};

module.exports.immutable = function uniqueImmutable(arr) {
  if (!Array.isArray(arr)) {
    throw new TypeError('array-unique expects an array.');
  }

  var arrLen = arr.length;
  var newArr = new Array(arrLen);

  for (var i = 0; i < arrLen; i++) {
    newArr[i] = arr[i];
  }

  return module.exports(newArr);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(35);

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
/* 35 */
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
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(37);

module.exports = function(braces, options) {
  braces.compiler

    /**
     * bos
     */

    .set('bos', function() {
      if (this.output) return;
      this.ast.queue = isEscaped(this.ast) ? [this.ast.val] : [];
      this.ast.count = 1;
    })

    /**
     * Square brackets
     */

    .set('bracket', function(node) {
      var close = node.close;
      var open = !node.escaped ? '[' : '\\[';
      var negated = node.negated;
      var inner = node.inner;

      inner = inner.replace(/\\(?=[\\\w]|$)/g, '\\\\');
      if (inner === ']-') {
        inner = '\\]\\-';
      }

      if (negated && inner.indexOf('.') === -1) {
        inner += '.';
      }
      if (negated && inner.indexOf('/') === -1) {
        inner += '/';
      }

      var val = open + negated + inner + close;
      var queue = node.parent.queue;
      var last = utils.arrayify(queue.pop());

      queue.push(utils.join(last, val));
      queue.push.apply(queue, []);
    })

    /**
     * Brace
     */

    .set('brace', function(node) {
      node.queue = isEscaped(node) ? [node.val] : [];
      node.count = 1;
      return this.mapVisit(node.nodes);
    })

    /**
     * Open
     */

    .set('brace.open', function(node) {
      node.parent.open = node.val;
    })

    /**
     * Inner
     */

    .set('text', function(node) {
      var queue = node.parent.queue;
      var escaped = node.escaped;
      var segs = [node.val];

      if (node.optimize === false) {
        options = utils.extend({}, options, {optimize: false});
      }

      if (node.multiplier > 1) {
        node.parent.count *= node.multiplier;
      }

      if (options.quantifiers === true && utils.isQuantifier(node.val)) {
        escaped = true;

      } else if (node.val.length > 1) {
        if (isType(node.parent, 'brace') && !isEscaped(node)) {
          var expanded = utils.expand(node.val, options);
          segs = expanded.segs;

          if (expanded.isOptimized) {
            node.parent.isOptimized = true;
          }

          // if nothing was expanded, we probably have a literal brace
          if (!segs.length) {
            var val = (expanded.val || node.val);
            if (options.unescape !== false) {
              // unescape unexpanded brace sequence/set separators
              val = val.replace(/\\([,.])/g, '$1');
              // strip quotes
              val = val.replace(/["'`]/g, '');
            }

            segs = [val];
            escaped = true;
          }
        }

      } else if (node.val === ',') {
        if (options.expand) {
          node.parent.queue.push(['']);
          segs = [''];
        } else {
          segs = ['|'];
        }
      } else {
        escaped = true;
      }

      if (escaped && isType(node.parent, 'brace')) {
        if (node.parent.nodes.length <= 4 && node.parent.count === 1) {
          node.parent.escaped = true;
        } else if (node.parent.length <= 3) {
          node.parent.escaped = true;
        }
      }

      if (!hasQueue(node.parent)) {
        node.parent.queue = segs;
        return;
      }

      var last = utils.arrayify(queue.pop());
      if (node.parent.count > 1 && options.expand) {
        last = multiply(last, node.parent.count);
        node.parent.count = 1;
      }

      queue.push(utils.join(utils.flatten(last), segs.shift()));
      queue.push.apply(queue, segs);
    })

    /**
     * Close
     */

    .set('brace.close', function(node) {
      var queue = node.parent.queue;
      var prev = node.parent.parent;
      var last = prev.queue.pop();
      var open = node.parent.open;
      var close = node.val;

      if (open && close && isOptimized(node, options)) {
        open = '(';
        close = ')';
      }

      // if a close brace exists, and the previous segment is one character
      // don't wrap the result in braces or parens
      var ele = utils.last(queue);
      if (node.parent.count > 1 && options.expand) {
        ele = multiply(queue.pop(), node.parent.count);
        node.parent.count = 1;
        queue.push(ele);
      }

      if (close && typeof ele === 'string' && ele.length === 1) {
        open = '';
        close = '';
      }

      if ((isLiteralBrace(node, options) || noInner(node)) && !node.parent.hasEmpty) {
        queue.push(utils.join(open, queue.pop() || ''));
        queue = utils.flatten(utils.join(queue, close));
      }

      if (typeof last === 'undefined') {
        prev.queue = [queue];
      } else {
        prev.queue.push(utils.flatten(utils.join(last, queue)));
      }
    })

    /**
     * eos
     */

    .set('eos', function(node) {
      if (this.input) return;

      if (options.optimize !== false) {
        this.output = utils.last(utils.flatten(this.ast.queue));
      } else if (Array.isArray(utils.last(this.ast.queue))) {
        this.output = utils.flatten(this.ast.queue.pop());
      } else {
        this.output = utils.flatten(this.ast.queue);
      }

      if (node.parent.count > 1 && options.expand) {
        this.output = multiply(this.output, node.parent.count);
      }

      this.output = utils.arrayify(this.output);
      this.ast.queue = [];
    });

};

/**
 * Multiply the segments in the current brace level
 */

function multiply(queue, n, options) {
  return utils.flatten(utils.repeat(utils.arrayify(queue), n));
}

/**
 * Return true if `node` is escaped
 */

function isEscaped(node) {
  return node.escaped === true;
}

/**
 * Returns true if regex parens should be used for sets. If the parent `type`
 * is not `brace`, then we're on a root node, which means we should never
 * expand segments and open/close braces should be `{}` (since this indicates
 * a brace is missing from the set)
 */

function isOptimized(node, options) {
  if (node.parent.isOptimized) return true;
  return isType(node.parent, 'brace')
    && !isEscaped(node.parent)
    && options.expand !== true;
}

/**
 * Returns true if the value in `node` should be wrapped in a literal brace.
 * @return {Boolean}
 */

function isLiteralBrace(node, options) {
  return isEscaped(node.parent) || options.optimize !== false;
}

/**
 * Returns true if the given `node` does not have an inner value.
 * @return {Boolean}
 */

function noInner(node, type) {
  if (node.parent.queue.length === 1) {
    return true;
  }
  var nodes = node.parent.nodes;
  return nodes.length === 3
    && isType(nodes[0], 'brace.open')
    && !isType(nodes[1], 'text')
    && isType(nodes[2], 'brace.close');
}

/**
 * Returns true if the given `node` is the given `type`
 * @return {Boolean}
 */

function isType(node, type) {
  return typeof node !== 'undefined' && node.type === type;
}

/**
 * Returns true if the given `node` has a non-empty queue.
 * @return {Boolean}
 */

function hasQueue(node) {
  return Array.isArray(node.queue) && node.queue.length;
}


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var splitString = __webpack_require__(38);
var utils = module.exports;

/**
 * Module dependencies
 */

utils.extend = __webpack_require__(34);
utils.flatten = __webpack_require__(39);
utils.isObject = __webpack_require__(23);
utils.fillRange = __webpack_require__(40);
utils.repeat = __webpack_require__(47);
utils.unique = __webpack_require__(33);

utils.define = function(obj, key, val) {
  Object.defineProperty(obj, key, {
    writable: true,
    configurable: true,
    enumerable: false,
    value: val
  });
};

/**
 * Returns true if the given string contains only empty brace sets.
 */

utils.isEmptySets = function(str) {
  return /^(?:\{,\})+$/.test(str);
};

/**
 * Returns true if the given string contains only empty brace sets.
 */

utils.isQuotedString = function(str) {
  var open = str.charAt(0);
  if (open === '\'' || open === '"' || open === '`') {
    return str.slice(-1) === open;
  }
  return false;
};

/**
 * Create the key to use for memoization. The unique key is generated
 * by iterating over the options and concatenating key-value pairs
 * to the pattern string.
 */

utils.createKey = function(pattern, options) {
  var id = pattern;
  if (typeof options === 'undefined') {
    return id;
  }
  var keys = Object.keys(options);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    id += ';' + key + '=' + String(options[key]);
  }
  return id;
};

/**
 * Normalize options
 */

utils.createOptions = function(options) {
  var opts = utils.extend.apply(null, arguments);
  if (typeof opts.expand === 'boolean') {
    opts.optimize = !opts.expand;
  }
  if (typeof opts.optimize === 'boolean') {
    opts.expand = !opts.optimize;
  }
  if (opts.optimize === true) {
    opts.makeRe = true;
  }
  return opts;
};

/**
 * Join patterns in `a` to patterns in `b`
 */

utils.join = function(a, b, options) {
  options = options || {};
  a = utils.arrayify(a);
  b = utils.arrayify(b);

  if (!a.length) return b;
  if (!b.length) return a;

  var len = a.length;
  var idx = -1;
  var arr = [];

  while (++idx < len) {
    var val = a[idx];
    if (Array.isArray(val)) {
      for (var i = 0; i < val.length; i++) {
        val[i] = utils.join(val[i], b, options);
      }
      arr.push(val);
      continue;
    }

    for (var j = 0; j < b.length; j++) {
      var bval = b[j];

      if (Array.isArray(bval)) {
        arr.push(utils.join(val, bval, options));
      } else {
        arr.push(val + bval);
      }
    }
  }
  return arr;
};

/**
 * Split the given string on `,` if not escaped.
 */

utils.split = function(str, options) {
  var opts = utils.extend({sep: ','}, options);
  if (typeof opts.keepQuotes !== 'boolean') {
    opts.keepQuotes = true;
  }
  if (opts.unescape === false) {
    opts.keepEscaping = true;
  }
  return splitString(str, opts, utils.escapeBrackets(opts));
};

/**
 * Expand ranges or sets in the given `pattern`.
 *
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object}
 */

utils.expand = function(str, options) {
  var opts = utils.extend({rangeLimit: 10000}, options);
  var segs = utils.split(str, opts);
  var tok = { segs: segs };

  if (utils.isQuotedString(str)) {
    return tok;
  }

  if (opts.rangeLimit === true) {
    opts.rangeLimit = 10000;
  }

  if (segs.length > 1) {
    if (opts.optimize === false) {
      tok.val = segs[0];
      return tok;
    }

    tok.segs = utils.stringifyArray(tok.segs);
  } else if (segs.length === 1) {
    var arr = str.split('..');

    if (arr.length === 1) {
      tok.val = tok.segs[tok.segs.length - 1] || tok.val || str;
      tok.segs = [];
      return tok;
    }

    if (arr.length === 2 && arr[0] === arr[1]) {
      tok.escaped = true;
      tok.val = arr[0];
      tok.segs = [];
      return tok;
    }

    if (arr.length > 1) {
      if (opts.optimize !== false) {
        opts.optimize = true;
        delete opts.expand;
      }

      if (opts.optimize !== true) {
        var min = Math.min(arr[0], arr[1]);
        var max = Math.max(arr[0], arr[1]);
        var step = arr[2] || 1;

        if (opts.rangeLimit !== false && ((max - min) / step >= opts.rangeLimit)) {
          throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
        }
      }

      arr.push(opts);
      tok.segs = utils.fillRange.apply(null, arr);

      if (!tok.segs.length) {
        tok.escaped = true;
        tok.val = str;
        return tok;
      }

      if (opts.optimize === true) {
        tok.segs = utils.stringifyArray(tok.segs);
      }

      if (tok.segs === '') {
        tok.val = str;
      } else {
        tok.val = tok.segs[0];
      }
      return tok;
    }
  } else {
    tok.val = str;
  }
  return tok;
};

/**
 * Ensure commas inside brackets and parens are not split.
 * @param {Object} `tok` Token from the `split-string` module
 * @return {undefined}
 */

utils.escapeBrackets = function(options) {
  return function(tok) {
    if (tok.escaped && tok.val === 'b') {
      tok.val = '\\b';
      return;
    }

    if (tok.val !== '(' && tok.val !== '[') return;
    var opts = utils.extend({}, options);
    var brackets = [];
    var parens = [];
    var stack = [];
    var val = tok.val;
    var str = tok.str;
    var i = tok.idx - 1;

    while (++i < str.length) {
      var ch = str[i];

      if (ch === '\\') {
        val += (opts.keepEscaping === false ? '' : ch) + str[++i];
        continue;
      }

      if (ch === '(') {
        parens.push(ch);
        stack.push(ch);
      }

      if (ch === '[') {
        brackets.push(ch);
        stack.push(ch);
      }

      if (ch === ')') {
        parens.pop();
        stack.pop();
        if (!stack.length) {
          val += ch;
          break;
        }
      }

      if (ch === ']') {
        brackets.pop();
        stack.pop();
        if (!stack.length) {
          val += ch;
          break;
        }
      }
      val += ch;
    }

    tok.split = false;
    tok.val = val.slice(1);
    tok.idx = i;
  };
};

/**
 * Returns true if the given string looks like a regex quantifier
 * @return {Boolean}
 */

utils.isQuantifier = function(str) {
  return /^(?:[0-9]?,[0-9]|[0-9],)$/.test(str);
};

/**
 * Cast `val` to an array.
 * @param {*} `val`
 */

utils.stringifyArray = function(arr) {
  return [utils.arrayify(arr).join('|')];
};

/**
 * Cast `val` to an array.
 * @param {*} `val`
 */

utils.arrayify = function(arr) {
  if (typeof arr === 'undefined') {
    return [];
  }
  if (typeof arr === 'string') {
    return [arr];
  }
  return arr;
};

/**
 * Returns true if the given `str` is a non-empty string
 * @return {Boolean}
 */

utils.isString = function(str) {
  return str != null && typeof str === 'string';
};

/**
 * Get the last element from `array`
 * @param {Array} `array`
 * @return {*}
 */

utils.last = function(arr, n) {
  return arr[arr.length - (n || 1)];
};

utils.escapeRegex = function(str) {
  return str.replace(/\\?([!^*?()[\]{}+?/])/g, '\\$1');
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * split-string <https://github.com/jonschlinkert/split-string>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var extend = __webpack_require__(28);

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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function (arr) {
  return flat(arr, []);
};

function flat(arr, res) {
  var i = 0, cur;
  var len = arr.length;
  for (; i < len; i++) {
    cur = arr[i];
    Array.isArray(cur) ? flat(cur, res) : res.push(cur);
  }
  return res;
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var util = __webpack_require__(8);
var isNumber = __webpack_require__(41);
var extend = __webpack_require__(44);
var repeat = __webpack_require__(45);
var toRegex = __webpack_require__(46);

/**
 * Return a range of numbers or letters.
 *
 * @param  {String} `start` Start of the range
 * @param  {String} `stop` End of the range
 * @param  {String} `step` Increment or decrement to use.
 * @param  {Function} `fn` Custom function to modify each element in the range.
 * @return {Array}
 */

function fillRange(start, stop, step, options) {
  if (typeof start === 'undefined') {
    return [];
  }

  if (typeof stop === 'undefined' || start === stop) {
    // special case, for handling negative zero
    var isString = typeof start === 'string';
    if (isNumber(start) && !toNumber(start)) {
      return [isString ? '0' : 0];
    }
    return [start];
  }

  if (typeof step !== 'number' && typeof step !== 'string') {
    options = step;
    step = undefined;
  }

  if (typeof options === 'function') {
    options = { transform: options };
  }

  var opts = extend({step: step}, options);
  if (opts.step && !isValidNumber(opts.step)) {
    if (opts.strictRanges === true) {
      throw new TypeError('expected options.step to be a number');
    }
    return [];
  }

  opts.isNumber = isValidNumber(start) && isValidNumber(stop);
  if (!opts.isNumber && !isValid(start, stop)) {
    if (opts.strictRanges === true) {
      throw new RangeError('invalid range arguments: ' + util.inspect([start, stop]));
    }
    return [];
  }

  opts.isPadded = isPadded(start) || isPadded(stop);
  opts.toString = opts.stringify
    || typeof opts.step === 'string'
    || typeof start === 'string'
    || typeof stop === 'string'
    || !opts.isNumber;

  if (opts.isPadded) {
    opts.maxLength = Math.max(String(start).length, String(stop).length);
  }

  // support legacy minimatch/fill-range options
  if (typeof opts.optimize === 'boolean') opts.toRegex = opts.optimize;
  if (typeof opts.makeRe === 'boolean') opts.toRegex = opts.makeRe;
  return expand(start, stop, opts);
}

function expand(start, stop, options) {
  var a = options.isNumber ? toNumber(start) : start.charCodeAt(0);
  var b = options.isNumber ? toNumber(stop) : stop.charCodeAt(0);

  var step = Math.abs(toNumber(options.step)) || 1;
  if (options.toRegex && step === 1) {
    return toRange(a, b, start, stop, options);
  }

  var zero = {greater: [], lesser: []};
  var asc = a < b;
  var arr = new Array(Math.round((asc ? b - a : a - b) / step));
  var idx = 0;

  while (asc ? a <= b : a >= b) {
    var val = options.isNumber ? a : String.fromCharCode(a);
    if (options.toRegex && (val >= 0 || !options.isNumber)) {
      zero.greater.push(val);
    } else {
      zero.lesser.push(Math.abs(val));
    }

    if (options.isPadded) {
      val = zeros(val, options);
    }

    if (options.toString) {
      val = String(val);
    }

    if (typeof options.transform === 'function') {
      arr[idx++] = options.transform(val, a, b, step, idx, arr, options);
    } else {
      arr[idx++] = val;
    }

    if (asc) {
      a += step;
    } else {
      a -= step;
    }
  }

  if (options.toRegex === true) {
    return toSequence(arr, zero, options);
  }
  return arr;
}

function toRange(a, b, start, stop, options) {
  if (options.isPadded) {
    return toRegex(start, stop, options);
  }

  if (options.isNumber) {
    return toRegex(Math.min(a, b), Math.max(a, b), options);
  }

  var start = String.fromCharCode(Math.min(a, b));
  var stop = String.fromCharCode(Math.max(a, b));
  return '[' + start + '-' + stop + ']';
}

function toSequence(arr, zeros, options) {
  var greater = '', lesser = '';
  if (zeros.greater.length) {
    greater = zeros.greater.join('|');
  }
  if (zeros.lesser.length) {
    lesser = '-(' + zeros.lesser.join('|') + ')';
  }
  var res = greater && lesser
    ? greater + '|' + lesser
    : greater || lesser;

  if (options.capture) {
    return '(' + res + ')';
  }
  return res;
}

function zeros(val, options) {
  if (options.isPadded) {
    var str = String(val);
    var len = str.length;
    var dash = '';
    if (str.charAt(0) === '-') {
      dash = '-';
      str = str.slice(1);
    }
    var diff = options.maxLength - len;
    var pad = repeat('0', diff);
    val = (dash + pad + str);
  }
  if (options.stringify) {
    return String(val);
  }
  return val;
}

function toNumber(val) {
  return Number(val) || 0;
}

function isPadded(str) {
  return /^-?0\d/.test(str);
}

function isValid(min, max) {
  return (isValidNumber(min) || isValidLetter(min))
      && (isValidNumber(max) || isValidLetter(max));
}

function isValidLetter(ch) {
  return typeof ch === 'string' && ch.length === 1 && /^\w+$/.test(ch);
}

function isValidNumber(n) {
  return isNumber(n) && !/\./.test(n);
}

/**
 * Expose `fillRange`
 * @type {Function}
 */

module.exports = fillRange;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var typeOf = __webpack_require__(42);

module.exports = function isNumber(num) {
  var type = typeOf(num);

  if (type === 'string') {
    if (!num.trim()) return false;
  } else if (type !== 'number') {
    return false;
  }

  return (num - num + 1) >= 0;
};


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(43);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 43 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(35);

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
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

module.exports = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * to-regex-range <https://github.com/jonschlinkert/to-regex-range>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var repeat = __webpack_require__(45);
var isNumber = __webpack_require__(41);
var cache = {};

function toRegexRange(min, max, options) {
  if (isNumber(min) === false) {
    throw new RangeError('toRegexRange: first argument is invalid.');
  }

  if (typeof max === 'undefined' || min === max) {
    return String(min);
  }

  if (isNumber(max) === false) {
    throw new RangeError('toRegexRange: second argument is invalid.');
  }

  options = options || {};
  var relax = String(options.relaxZeros);
  var shorthand = String(options.shorthand);
  var capture = String(options.capture);
  var key = min + ':' + max + '=' + relax + shorthand + capture;
  if (cache.hasOwnProperty(key)) {
    return cache[key].result;
  }

  var a = Math.min(min, max);
  var b = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    var result = min + '|' + max;
    if (options.capture) {
      return '(' + result + ')';
    }
    return result;
  }

  var isPadded = padding(min) || padding(max);
  var positives = [];
  var negatives = [];

  var tok = {min: min, max: max, a: a, b: b};
  if (isPadded) {
    tok.isPadded = isPadded;
    tok.maxLen = String(tok.max).length;
  }

  if (a < 0) {
    var newMin = b < 0 ? Math.abs(b) : 1;
    var newMax = Math.abs(a);
    negatives = splitToPatterns(newMin, newMax, tok, options);
    a = tok.a = 0;
  }

  if (b >= 0) {
    positives = splitToPatterns(a, b, tok, options);
  }

  tok.negatives = negatives;
  tok.positives = positives;
  tok.result = siftPatterns(negatives, positives, options);

  if (options.capture && (positives.length + negatives.length) > 1) {
    tok.result = '(' + tok.result + ')';
  }

  cache[key] = tok;
  return tok.result;
}

function siftPatterns(neg, pos, options) {
  var onlyNegative = filterPatterns(neg, pos, '-', false, options) || [];
  var onlyPositive = filterPatterns(pos, neg, '', false, options) || [];
  var intersected = filterPatterns(neg, pos, '-?', true, options) || [];
  var subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min, max) {
  min = Number(min);
  max = Number(max);

  var nines = 1;
  var stops = [max];
  var stop = +countNines(min, nines);

  while (min <= stop && stop <= max) {
    stops = push(stops, stop);
    nines += 1;
    stop = +countNines(min, nines);
  }

  var zeros = 1;
  stop = countZeros(max + 1, zeros) - 1;

  while (min < stop && stop <= max) {
    stops = push(stops, stop);
    zeros += 1;
    stop = countZeros(max + 1, zeros) - 1;
  }

  stops.sort(compare);
  return stops;
}

/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */

function rangeToPattern(start, stop, options) {
  if (start === stop) {
    return {pattern: String(start), digits: []};
  }

  var zipped = zip(String(start), String(stop));
  var len = zipped.length, i = -1;

  var pattern = '';
  var digits = 0;

  while (++i < len) {
    var numbers = zipped[i];
    var startDigit = numbers[0];
    var stopDigit = numbers[1];

    if (startDigit === stopDigit) {
      pattern += startDigit;

    } else if (startDigit !== '0' || stopDigit !== '9') {
      pattern += toCharacterClass(startDigit, stopDigit);

    } else {
      digits += 1;
    }
  }

  if (digits) {
    pattern += options.shorthand ? '\\d' : '[0-9]';
  }

  return { pattern: pattern, digits: [digits] };
}

function splitToPatterns(min, max, tok, options) {
  var ranges = splitToRanges(min, max);
  var len = ranges.length;
  var idx = -1;

  var tokens = [];
  var start = min;
  var prev;

  while (++idx < len) {
    var range = ranges[idx];
    var obj = rangeToPattern(start, range, options);
    var zeros = '';

    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.digits.length > 1) {
        prev.digits.pop();
      }
      prev.digits.push(obj.digits[0]);
      prev.string = prev.pattern + toQuantifier(prev.digits);
      start = range + 1;
      continue;
    }

    if (tok.isPadded) {
      zeros = padZeros(range, tok);
    }

    obj.string = zeros + obj.pattern + toQuantifier(obj.digits);
    tokens.push(obj);
    start = range + 1;
    prev = obj;
  }

  return tokens;
}

function filterPatterns(arr, comparison, prefix, intersection, options) {
  var res = [];

  for (var i = 0; i < arr.length; i++) {
    var tok = arr[i];
    var ele = tok.string;

    if (options.relaxZeros !== false) {
      if (prefix === '-' && ele.charAt(0) === '0') {
        if (ele.charAt(1) === '{') {
          ele = '0*' + ele.replace(/^0\{\d+\}/, '');
        } else {
          ele = '0*' + ele.slice(1);
        }
      }
    }

    if (!intersection && !contains(comparison, 'string', ele)) {
      res.push(prefix + ele);
    }

    if (intersection && contains(comparison, 'string', ele)) {
      res.push(prefix + ele);
    }
  }
  return res;
}

/**
 * Zip strings (`for in` can be used on string characters)
 */

function zip(a, b) {
  var arr = [];
  for (var ch in a) arr.push([a[ch], b[ch]]);
  return arr;
}

function compare(a, b) {
  return a > b ? 1 : b > a ? -1 : 0;
}

function push(arr, ele) {
  if (arr.indexOf(ele) === -1) arr.push(ele);
  return arr;
}

function contains(arr, key, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return true;
    }
  }
  return false;
}

function countNines(min, len) {
  return String(min).slice(0, -len) + repeat('9', len);
}

function countZeros(integer, zeros) {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits) {
  var start = digits[0];
  var stop = digits[1] ? (',' + digits[1]) : '';
  if (!stop && (!start || start === 1)) {
    return '';
  }
  return '{' + start + stop + '}';
}

function toCharacterClass(a, b) {
  return '[' + a + ((b - a === 1) ? '' : '-') + b + ']';
}

function padding(str) {
  return /^-?(0+)\d/.exec(str);
}

function padZeros(val, tok) {
  if (tok.isPadded) {
    var diff = Math.abs(tok.maxLen - String(val).length);
    switch (diff) {
      case 0:
        return '';
      case 1:
        return '0';
      default: {
        return '0{' + diff + '}';
      }
    }
  }
  return val;
}

/**
 * Expose `toRegexRange`
 */

module.exports = toRegexRange;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-element <https://github.com/jonschlinkert/repeat-element>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT license.
 */



module.exports = function repeat(ele, num) {
  var arr = new Array(num);

  for (var i = 0; i < num; i++) {
    arr[i] = ele;
  }

  return arr;
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Node = __webpack_require__(49);
var utils = __webpack_require__(37);

/**
 * Braces parsers
 */

module.exports = function(braces, options) {
  braces.parser
    .set('bos', function() {
      if (!this.parsed) {
        this.ast = this.nodes[0] = new Node(this.ast);
      }
    })

    /**
     * Character parsers
     */

    .set('escape', function() {
      var pos = this.position();
      var m = this.match(/^(?:\\(.)|\$\{)/);
      if (!m) return;

      var prev = this.prev();
      var last = utils.last(prev.nodes);

      var node = pos(new Node({
        type: 'text',
        multiplier: 1,
        val: m[0]
      }));

      if (node.val === '\\\\') {
        return node;
      }

      if (node.val === '${') {
        var str = this.input;
        var idx = -1;
        var ch;

        while ((ch = str[++idx])) {
          this.consume(1);
          node.val += ch;
          if (ch === '\\') {
            node.val += str[++idx];
            continue;
          }
          if (ch === '}') {
            break;
          }
        }
      }

      if (this.options.unescape !== false) {
        node.val = node.val.replace(/\\([{}])/g, '$1');
      }

      if (last.val === '"' && this.input.charAt(0) === '"') {
        last.val = node.val;
        this.consume(1);
        return;
      }

      return concatNodes.call(this, pos, node, prev, options);
    })

    /**
     * Brackets: "[...]" (basic, this is overridden by
     * other parsers in more advanced implementations)
     */

    .set('bracket', function() {
      var isInside = this.isInside('brace');
      var pos = this.position();
      var m = this.match(/^(?:\[([!^]?)([^\]]{2,}|\]-)(\]|[^*+?]+)|\[)/);
      if (!m) return;

      var prev = this.prev();
      var val = m[0];
      var negated = m[1] ? '^' : '';
      var inner = m[2] || '';
      var close = m[3] || '';

      if (isInside && prev.type === 'brace') {
        prev.text = prev.text || '';
        prev.text += val;
      }

      var esc = this.input.slice(0, 2);
      if (inner === '' && esc === '\\]') {
        inner += esc;
        this.consume(2);

        var str = this.input;
        var idx = -1;
        var ch;

        while ((ch = str[++idx])) {
          this.consume(1);
          if (ch === ']') {
            close = ch;
            break;
          }
          inner += ch;
        }
      }

      return pos(new Node({
        type: 'bracket',
        val: val,
        escaped: close !== ']',
        negated: negated,
        inner: inner,
        close: close
      }));
    })

    /**
     * Empty braces (we capture these early to
     * speed up processing in the compiler)
     */

    .set('multiplier', function() {
      var isInside = this.isInside('brace');
      var pos = this.position();
      var m = this.match(/^\{((?:,|\{,+\})+)\}/);
      if (!m) return;

      this.multiplier = true;
      var prev = this.prev();
      var val = m[0];

      if (isInside && prev.type === 'brace') {
        prev.text = prev.text || '';
        prev.text += val;
      }

      var node = pos(new Node({
        type: 'text',
        multiplier: 1,
        match: m,
        val: val
      }));

      return concatNodes.call(this, pos, node, prev, options);
    })

    /**
     * Open
     */

    .set('brace.open', function() {
      var pos = this.position();
      var m = this.match(/^\{(?!(?:[^\\}]?|,+)\})/);
      if (!m) return;

      var prev = this.prev();
      var last = utils.last(prev.nodes);

      // if the last parsed character was an extglob character
      // we need to _not optimize_ the brace pattern because
      // it might be mistaken for an extglob by a downstream parser
      if (last && last.val && isExtglobChar(last.val.slice(-1))) {
        last.optimize = false;
      }

      var open = pos(new Node({
        type: 'brace.open',
        val: m[0]
      }));

      var node = pos(new Node({
        type: 'brace',
        nodes: []
      }));

      node.push(open);
      prev.push(node);
      this.push('brace', node);
    })

    /**
     * Close
     */

    .set('brace.close', function() {
      var pos = this.position();
      var m = this.match(/^\}/);
      if (!m || !m[0]) return;

      var brace = this.pop('brace');
      var node = pos(new Node({
        type: 'brace.close',
        val: m[0]
      }));

      if (!this.isType(brace, 'brace')) {
        if (this.options.strict) {
          throw new Error('missing opening "{"');
        }
        node.type = 'text';
        node.multiplier = 0;
        node.escaped = true;
        return node;
      }

      var prev = this.prev();
      var last = utils.last(prev.nodes);
      if (last.text) {
        var lastNode = utils.last(last.nodes);
        if (lastNode.val === ')' && /[!@*?+]\(/.test(last.text)) {
          var open = last.nodes[0];
          var text = last.nodes[1];
          if (open.type === 'brace.open' && text && text.type === 'text') {
            text.optimize = false;
          }
        }
      }

      if (brace.nodes.length > 2) {
        var first = brace.nodes[1];
        if (first.type === 'text' && first.val === ',') {
          brace.nodes.splice(1, 1);
          brace.nodes.push(first);
        }
      }

      brace.push(node);
    })

    /**
     * Capture boundary characters
     */

    .set('boundary', function() {
      var pos = this.position();
      var m = this.match(/^[$^](?!\{)/);
      if (!m) return;
      return pos(new Node({
        type: 'text',
        val: m[0]
      }));
    })

    /**
     * One or zero, non-comma characters wrapped in braces
     */

    .set('nobrace', function() {
      var isInside = this.isInside('brace');
      var pos = this.position();
      var m = this.match(/^\{[^,]?\}/);
      if (!m) return;

      var prev = this.prev();
      var val = m[0];

      if (isInside && prev.type === 'brace') {
        prev.text = prev.text || '';
        prev.text += val;
      }

      return pos(new Node({
        type: 'text',
        multiplier: 0,
        val: val
      }));
    })

    /**
     * Text
     */

    .set('text', function() {
      var isInside = this.isInside('brace');
      var pos = this.position();
      var m = this.match(/^((?!\\)[^${}[\]])+/);
      if (!m) return;

      var prev = this.prev();
      var val = m[0];

      if (isInside && prev.type === 'brace') {
        prev.text = prev.text || '';
        prev.text += val;
      }

      var node = pos(new Node({
        type: 'text',
        multiplier: 1,
        val: val
      }));

      return concatNodes.call(this, pos, node, prev, options);
    });
};

/**
 * Returns true if the character is an extglob character.
 */

function isExtglobChar(ch) {
  return ch === '!' || ch === '@' || ch === '*' || ch === '?' || ch === '+';
}

/**
 * Combine text nodes, and calculate empty sets (`{,,}`)
 * @param {Function} `pos` Function to calculate node position
 * @param {Object} `node` AST node
 * @return {Object}
 */

function concatNodes(pos, node, parent, options) {
  node.orig = node.val;
  var prev = this.prev();
  var last = utils.last(prev.nodes);
  var isEscaped = false;

  if (node.val.length > 1) {
    var a = node.val.charAt(0);
    var b = node.val.slice(-1);

    isEscaped = (a === '"' && b === '"')
      || (a === "'" && b === "'")
      || (a === '`' && b === '`');
  }

  if (isEscaped && options.unescape !== false) {
    node.val = node.val.slice(1, node.val.length - 1);
    node.escaped = true;
  }

  if (node.match) {
    var match = node.match[1];
    if (!match || match.indexOf('}') === -1) {
      match = node.match[0];
    }

    // replace each set with a single ","
    var val = match.replace(/\{/g, ',').replace(/\}/g, '');
    node.multiplier *= val.length;
    node.val = '';
  }

  var simpleText = last.type === 'text'
    && last.multiplier === 1
    && node.multiplier === 1
    && node.val;

  if (simpleText) {
    last.val += node.val;
    return;
  }

  prev.push(node);
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(23);
var define = __webpack_require__(50);
var utils = __webpack_require__(54);
var ownNames;

/**
 * Create a new AST `Node` with the given `val` and `type`.
 *
 * ```js
 * var node = new Node('*', 'Star');
 * var node = new Node({type: 'star', val: '*'});
 * ```
 * @name Node
 * @param {String|Object} `val` Pass a matched substring, or an object to merge onto the node.
 * @param {String} `type` The node type to use when `val` is a string.
 * @return {Object} node instance
 * @api public
 */

function Node(val, type, parent) {
  if (typeof type !== 'string') {
    parent = type;
    type = null;
  }

  define(this, 'parent', parent);
  define(this, 'isNode', true);
  define(this, 'expect', null);

  if (typeof type !== 'string' && isObject(val)) {
    lazyKeys();
    var keys = Object.keys(val);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (ownNames.indexOf(key) === -1) {
        this[key] = val[key];
      }
    }
  } else {
    this.type = type;
    this.val = val;
  }
}

/**
 * Returns true if the given value is a node.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var node = new Node({type: 'foo'});
 * console.log(Node.isNode(node)); //=> true
 * console.log(Node.isNode({})); //=> false
 * ```
 * @param {Object} `node`
 * @returns {Boolean}
 * @api public
 */

Node.isNode = function(node) {
  return utils.isNode(node);
};

/**
 * Define a non-enumberable property on the node instance.
 * Useful for adding properties that shouldn't be extended
 * or visible during debugging.
 *
 * ```js
 * var node = new Node();
 * node.define('foo', 'something non-enumerable');
 * ```
 * @param {String} `name`
 * @param {any} `val`
 * @return {Object} returns the node instance
 * @api public
 */

Node.prototype.define = function(name, val) {
  define(this, name, val);
  return this;
};

/**
 * Returns true if `node.val` is an empty string, or `node.nodes` does
 * not contain any non-empty text nodes.
 *
 * ```js
 * var node = new Node({type: 'text'});
 * node.isEmpty(); //=> true
 * node.val = 'foo';
 * node.isEmpty(); //=> false
 * ```
 * @param {Function} `fn` (optional) Filter function that is called on `node` and/or child nodes. `isEmpty` will return false immediately when the filter function returns false on any nodes.
 * @return {Boolean}
 * @api public
 */

Node.prototype.isEmpty = function(fn) {
  return utils.isEmpty(this, fn);
};

/**
 * Given node `foo` and node `bar`, push node `bar` onto `foo.nodes`, and
 * set `foo` as `bar.parent`.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * foo.push(bar);
 * ```
 * @param {Object} `node`
 * @return {Number} Returns the length of `node.nodes`
 * @api public
 */

Node.prototype.push = function(node) {
  assert(Node.isNode(node), 'expected node to be an instance of Node');
  define(node, 'parent', this);

  this.nodes = this.nodes || [];
  return this.nodes.push(node);
};

/**
 * Given node `foo` and node `bar`, unshift node `bar` onto `foo.nodes`, and
 * set `foo` as `bar.parent`.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * foo.unshift(bar);
 * ```
 * @param {Object} `node`
 * @return {Number} Returns the length of `node.nodes`
 * @api public
 */

Node.prototype.unshift = function(node) {
  assert(Node.isNode(node), 'expected node to be an instance of Node');
  define(node, 'parent', this);

  this.nodes = this.nodes || [];
  return this.nodes.unshift(node);
};

/**
 * Pop a node from `node.nodes`.
 *
 * ```js
 * var node = new Node({type: 'foo'});
 * node.push(new Node({type: 'a'}));
 * node.push(new Node({type: 'b'}));
 * node.push(new Node({type: 'c'}));
 * node.push(new Node({type: 'd'}));
 * console.log(node.nodes.length);
 * //=> 4
 * node.pop();
 * console.log(node.nodes.length);
 * //=> 3
 * ```
 * @return {Number} Returns the popped `node`
 * @api public
 */

Node.prototype.pop = function() {
  return this.nodes && this.nodes.pop();
};

/**
 * Shift a node from `node.nodes`.
 *
 * ```js
 * var node = new Node({type: 'foo'});
 * node.push(new Node({type: 'a'}));
 * node.push(new Node({type: 'b'}));
 * node.push(new Node({type: 'c'}));
 * node.push(new Node({type: 'd'}));
 * console.log(node.nodes.length);
 * //=> 4
 * node.shift();
 * console.log(node.nodes.length);
 * //=> 3
 * ```
 * @return {Object} Returns the shifted `node`
 * @api public
 */

Node.prototype.shift = function() {
  return this.nodes && this.nodes.shift();
};

/**
 * Remove `node` from `node.nodes`.
 *
 * ```js
 * node.remove(childNode);
 * ```
 * @param {Object} `node`
 * @return {Object} Returns the removed node.
 * @api public
 */

Node.prototype.remove = function(node) {
  assert(Node.isNode(node), 'expected node to be an instance of Node');
  this.nodes = this.nodes || [];
  var idx = node.index;
  if (idx !== -1) {
    node.index = -1;
    return this.nodes.splice(idx, 1);
  }
  return null;
};

/**
 * Get the first child node from `node.nodes` that matches the given `type`.
 * If `type` is a number, the child node at that index is returned.
 *
 * ```js
 * var child = node.find(1); //<= index of the node to get
 * var child = node.find('foo'); //<= node.type of a child node
 * var child = node.find(/^(foo|bar)$/); //<= regex to match node.type
 * var child = node.find(['foo', 'bar']); //<= array of node.type(s)
 * ```
 * @param {String} `type`
 * @return {Object} Returns a child node or undefined.
 * @api public
 */

Node.prototype.find = function(type) {
  return utils.findNode(this.nodes, type);
};

/**
 * Return true if the node is the given `type`.
 *
 * ```js
 * var node = new Node({type: 'bar'});
 * cosole.log(node.isType('foo'));          // false
 * cosole.log(node.isType(/^(foo|bar)$/));  // true
 * cosole.log(node.isType(['foo', 'bar'])); // true
 * ```
 * @param {String} `type`
 * @return {Boolean}
 * @api public
 */

Node.prototype.isType = function(type) {
  return utils.isType(this, type);
};

/**
 * Return true if the `node.nodes` has the given `type`.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * foo.push(bar);
 *
 * cosole.log(foo.hasType('qux'));          // false
 * cosole.log(foo.hasType(/^(qux|bar)$/));  // true
 * cosole.log(foo.hasType(['qux', 'bar'])); // true
 * ```
 * @param {String} `type`
 * @return {Boolean}
 * @api public
 */

Node.prototype.hasType = function(type) {
  return utils.hasType(this, type);
};

/**
 * Get the siblings array, or `null` if it doesn't exist.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * var baz = new Node({type: 'baz'});
 * foo.push(bar);
 * foo.push(baz);
 *
 * console.log(bar.siblings.length) // 2
 * console.log(baz.siblings.length) // 2
 * ```
 * @return {Array}
 * @api public
 */

Object.defineProperty(Node.prototype, 'siblings', {
  set: function() {
    throw new Error('node.siblings is a getter and cannot be defined');
  },
  get: function() {
    return this.parent ? this.parent.nodes : null;
  }
});

/**
 * Get the node's current index from `node.parent.nodes`.
 * This should always be correct, even when the parent adds nodes.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * var baz = new Node({type: 'baz'});
 * var qux = new Node({type: 'qux'});
 * foo.push(bar);
 * foo.push(baz);
 * foo.unshift(qux);
 *
 * console.log(bar.index) // 1
 * console.log(baz.index) // 2
 * console.log(qux.index) // 0
 * ```
 * @return {Number}
 * @api public
 */

Object.defineProperty(Node.prototype, 'index', {
  set: function(index) {
    define(this, 'idx', index);
  },
  get: function() {
    if (!Array.isArray(this.siblings)) {
      return -1;
    }
    var tok = this.idx !== -1 ? this.siblings[this.idx] : null;
    if (tok !== this) {
      this.idx = this.siblings.indexOf(this);
    }
    return this.idx;
  }
});

/**
 * Get the previous node from the siblings array or `null`.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * var baz = new Node({type: 'baz'});
 * foo.push(bar);
 * foo.push(baz);
 *
 * console.log(baz.prev.type) // 'bar'
 * ```
 * @return {Object}
 * @api public
 */

Object.defineProperty(Node.prototype, 'prev', {
  set: function() {
    throw new Error('node.prev is a getter and cannot be defined');
  },
  get: function() {
    if (Array.isArray(this.siblings)) {
      return this.siblings[this.index - 1] || this.parent.prev;
    }
    return null;
  }
});

/**
 * Get the siblings array, or `null` if it doesn't exist.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * var baz = new Node({type: 'baz'});
 * foo.push(bar);
 * foo.push(baz);
 *
 * console.log(bar.siblings.length) // 2
 * console.log(baz.siblings.length) // 2
 * ```
 * @return {Object}
 * @api public
 */

Object.defineProperty(Node.prototype, 'next', {
  set: function() {
    throw new Error('node.next is a getter and cannot be defined');
  },
  get: function() {
    if (Array.isArray(this.siblings)) {
      return this.siblings[this.index + 1] || this.parent.next;
    }
    return null;
  }
});

/**
 * Get the first node from `node.nodes`.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * var baz = new Node({type: 'baz'});
 * var qux = new Node({type: 'qux'});
 * foo.push(bar);
 * foo.push(baz);
 * foo.push(qux);
 *
 * console.log(foo.first.type) // 'bar'
 * ```
 * @return {Object} The first node, or undefiend
 * @api public
 */

Object.defineProperty(Node.prototype, 'first', {
  get: function() {
    return this.nodes ? this.nodes[0] : null;
  }
});

/**
 * Get the last node from `node.nodes`.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * var baz = new Node({type: 'baz'});
 * var qux = new Node({type: 'qux'});
 * foo.push(bar);
 * foo.push(baz);
 * foo.push(qux);
 *
 * console.log(foo.last.type) // 'qux'
 * ```
 * @return {Object} The last node, or undefiend
 * @api public
 */

Object.defineProperty(Node.prototype, 'last', {
  get: function() {
    return this.nodes ? utils.last(this.nodes) : null;
  }
});

/**
 * Get the last node from `node.nodes`.
 *
 * ```js
 * var foo = new Node({type: 'foo'});
 * var bar = new Node({type: 'bar'});
 * var baz = new Node({type: 'baz'});
 * var qux = new Node({type: 'qux'});
 * foo.push(bar);
 * foo.push(baz);
 * foo.push(qux);
 *
 * console.log(foo.last.type) // 'qux'
 * ```
 * @return {Object} The last node, or undefiend
 * @api public
 */

Object.defineProperty(Node.prototype, 'scope', {
  get: function() {
    if (this.isScope !== true) {
      return this.parent ? this.parent.scope : this;
    }
    return this;
  }
});

/**
 * Get own property names from Node prototype, but only the
 * first time `Node` is instantiated
 */

function lazyKeys() {
  if (!ownNames) {
    ownNames = Object.getOwnPropertyNames(Node.prototype);
  }
}

/**
 * Simplified assertion. Throws an error is `val` is falsey.
 */

function assert(val, message) {
  if (!val) throw new Error(message);
}

/**
 * Expose `Node`
 */

exports = module.exports = Node;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isDescriptor = __webpack_require__(51);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);
var isAccessor = __webpack_require__(52);
var isData = __webpack_require__(53);

module.exports = function isDescriptor(obj, key) {
  if (typeOf(obj) !== 'object') {
    return false;
  }
  if ('get' in obj) {
    return isAccessor(obj, key);
  }
  return isData(obj, key);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

// accessor descriptor properties
var accessor = {
  get: 'function',
  set: 'function',
  configurable: 'boolean',
  enumerable: 'boolean'
};

function isAccessorDescriptor(obj, prop) {
  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (has(obj, 'value') || has(obj, 'writable')) {
    return false;
  }

  if (!has(obj, 'get') || typeof obj.get !== 'function') {
    return false;
  }

  // tldr: it's valid to have "set" be undefined
  // "set" might be undefined if `Object.getOwnPropertyDescriptor`
  // was used to get the value, and only `get` was defined by the user
  if (has(obj, 'set') && typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
    return false;
  }

  for (var key in obj) {
    if (!accessor.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === accessor[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
}

function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

/**
 * Expose `isAccessorDescriptor`
 */

module.exports = isAccessorDescriptor;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

module.exports = function isDataDescriptor(obj, prop) {
  // data descriptor properties
  var data = {
    configurable: 'boolean',
    enumerable: 'boolean',
    writable: 'boolean'
  };

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (!('value' in obj) && !('writable' in obj)) {
    return false;
  }

  for (var key in obj) {
    if (key === 'value') continue;

    if (!data.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === data[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typeOf = __webpack_require__(55);
var utils = module.exports;

/**
 * Returns true if the given value is a node.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var node = new Node({type: 'foo'});
 * console.log(utils.isNode(node)); //=> true
 * console.log(utils.isNode({})); //=> false
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @returns {Boolean}
 * @api public
 */

utils.isNode = function(node) {
  return typeOf(node) === 'object' && node.isNode === true;
};

/**
 * Emit an empty string for the given `node`.
 *
 * ```js
 * // do nothing for beginning-of-string
 * snapdragon.compiler.set('bos', utils.noop);
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @returns {undefined}
 * @api public
 */

utils.noop = function(node) {
  append(this, '', node);
};

/**
 * Appdend `node.val` to `compiler.output`, exactly as it was created
 * by the parser.
 *
 * ```js
 * snapdragon.compiler.set('text', utils.identity);
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @returns {undefined}
 * @api public
 */

utils.identity = function(node) {
  append(this, node.val, node);
};

/**
 * Previously named `.emit`, this method appends the given `val`
 * to `compiler.output` for the given node. Useful when you know
 * what value should be appended advance, regardless of the actual
 * value of `node.val`.
 *
 * ```js
 * snapdragon.compiler
 *   .set('i', function(node) {
 *     this.mapVisit(node);
 *   })
 *   .set('i.open', utils.append('<i>'))
 *   .set('i.close', utils.append('</i>'))
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @returns {Function} Returns a compiler middleware function.
 * @api public
 */

utils.append = function(val) {
  return function(node) {
    append(this, val, node);
  };
};

/**
 * Used in compiler middleware, this onverts an AST node into
 * an empty `text` node and deletes `node.nodes` if it exists.
 * The advantage of this method is that, as opposed to completely
 * removing the node, indices will not need to be re-calculated
 * in sibling nodes, and nothing is appended to the output.
 *
 * ```js
 * utils.toNoop(node);
 * // convert `node.nodes` to the given value instead of deleting it
 * utils.toNoop(node, []);
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {Array} `nodes` Optionally pass a new `nodes` value, to replace the existing `node.nodes` array.
 * @api public
 */

utils.toNoop = function(node, nodes) {
  if (nodes) {
    node.nodes = nodes;
  } else {
    delete node.nodes;
    node.type = 'text';
    node.val = '';
  }
};

/**
 * Visit `node` with the given `fn`. The built-in `.visit` method in snapdragon
 * automatically calls registered compilers, this allows you to pass a visitor
 * function.
 *
 * ```js
 * snapdragon.compiler.set('i', function(node) {
 *   utils.visit(node, function(childNode) {
 *     // do stuff with "childNode"
 *     return childNode;
 *   });
 * });
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {Function} `fn`
 * @return {Object} returns the node after recursively visiting all child nodes.
 * @api public
 */

utils.visit = function(node, fn) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isFunction(fn), 'expected a visitor function');
  fn(node);
  return node.nodes ? utils.mapVisit(node, fn) : node;
};

/**
 * Map [visit](#visit) the given `fn` over `node.nodes`. This is called by
 * [visit](#visit), use this method if you do not want `fn` to be called on
 * the first node.
 *
 * ```js
 * snapdragon.compiler.set('i', function(node) {
 *   utils.mapVisit(node, function(childNode) {
 *     // do stuff with "childNode"
 *     return childNode;
 *   });
 * });
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {Object} `options`
 * @param {Function} `fn`
 * @return {Object} returns the node
 * @api public
 */

utils.mapVisit = function(node, fn) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isArray(node.nodes), 'expected node.nodes to be an array');
  assert(isFunction(fn), 'expected a visitor function');

  for (var i = 0; i < node.nodes.length; i++) {
    utils.visit(node.nodes[i], fn);
  }
  return node;
};

/**
 * Unshift an `*.open` node onto `node.nodes`.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * snapdragon.parser.set('brace', function(node) {
 *   var match = this.match(/^{/);
 *   if (match) {
 *     var parent = new Node({type: 'brace'});
 *     utils.addOpen(parent, Node);
 *     console.log(parent.nodes[0]):
 *     // { type: 'brace.open', val: '' };
 *
 *     // push the parent "brace" node onto the stack
 *     this.push(parent);
 *
 *     // return the parent node, so it's also added to the AST
 *     return brace;
 *   }
 * });
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {Function} `Node` (required) Node constructor function from [snapdragon-node][].
 * @param {Function} `filter` Optionaly specify a filter function to exclude the node.
 * @return {Object} Returns the created opening node.
 * @api public
 */

utils.addOpen = function(node, Node, val, filter) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isFunction(Node), 'expected Node to be a constructor function');

  if (typeof val === 'function') {
    filter = val;
    val = '';
  }

  if (typeof filter === 'function' && !filter(node)) return;
  var open = new Node({ type: node.type + '.open', val: val});
  var unshift = node.unshift || node.unshiftNode;
  if (typeof unshift === 'function') {
    unshift.call(node, open);
  } else {
    utils.unshiftNode(node, open);
  }
  return open;
};

/**
 * Push a `*.close` node onto `node.nodes`.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * snapdragon.parser.set('brace', function(node) {
 *   var match = this.match(/^}/);
 *   if (match) {
 *     var parent = this.parent();
 *     if (parent.type !== 'brace') {
 *       throw new Error('missing opening: ' + '}');
 *     }
 *
 *     utils.addClose(parent, Node);
 *     console.log(parent.nodes[parent.nodes.length - 1]):
 *     // { type: 'brace.close', val: '' };
 *
 *     // no need to return a node, since the parent
 *     // was already added to the AST
 *     return;
 *   }
 * });
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {Function} `Node` (required) Node constructor function from [snapdragon-node][].
 * @param {Function} `filter` Optionaly specify a filter function to exclude the node.
 * @return {Object} Returns the created closing node.
 * @api public
 */

utils.addClose = function(node, Node, val, filter) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isFunction(Node), 'expected Node to be a constructor function');

  if (typeof val === 'function') {
    filter = val;
    val = '';
  }

  if (typeof filter === 'function' && !filter(node)) return;
  var close = new Node({ type: node.type + '.close', val: val});
  var push = node.push || node.pushNode;
  if (typeof push === 'function') {
    push.call(node, close);
  } else {
    utils.pushNode(node, close);
  }
  return close;
};

/**
 * Wraps the given `node` with `*.open` and `*.close` nodes.
 *
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {Function} `Node` (required) Node constructor function from [snapdragon-node][].
 * @param {Function} `filter` Optionaly specify a filter function to exclude the node.
 * @return {Object} Returns the node
 * @api public
 */

utils.wrapNodes = function(node, Node, filter) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isFunction(Node), 'expected Node to be a constructor function');

  utils.addOpen(node, Node, filter);
  utils.addClose(node, Node, filter);
  return node;
};

/**
 * Push the given `node` onto `parent.nodes`, and set `parent` as `node.parent.
 *
 * ```js
 * var parent = new Node({type: 'foo'});
 * var node = new Node({type: 'bar'});
 * utils.pushNode(parent, node);
 * console.log(parent.nodes[0].type) // 'bar'
 * console.log(node.parent.type) // 'foo'
 * ```
 * @param {Object} `parent`
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Object} Returns the child node
 * @api public
 */

utils.pushNode = function(parent, node) {
  assert(utils.isNode(parent), 'expected parent node to be an instance of Node');
  assert(utils.isNode(node), 'expected node to be an instance of Node');

  node.define('parent', parent);
  parent.nodes = parent.nodes || [];
  parent.nodes.push(node);
  return node;
};

/**
 * Unshift `node` onto `parent.nodes`, and set `parent` as `node.parent.
 *
 * ```js
 * var parent = new Node({type: 'foo'});
 * var node = new Node({type: 'bar'});
 * utils.unshiftNode(parent, node);
 * console.log(parent.nodes[0].type) // 'bar'
 * console.log(node.parent.type) // 'foo'
 * ```
 * @param {Object} `parent`
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {undefined}
 * @api public
 */

utils.unshiftNode = function(parent, node) {
  assert(utils.isNode(parent), 'expected parent node to be an instance of Node');
  assert(utils.isNode(node), 'expected node to be an instance of Node');

  node.define('parent', parent);
  parent.nodes = parent.nodes || [];
  parent.nodes.unshift(node);
};

/**
 * Pop the last `node` off of `parent.nodes`. The advantage of
 * using this method is that it checks for `node.nodes` and works
 * with any version of `snapdragon-node`.
 *
 * ```js
 * var parent = new Node({type: 'foo'});
 * utils.pushNode(parent, new Node({type: 'foo'}));
 * utils.pushNode(parent, new Node({type: 'bar'}));
 * utils.pushNode(parent, new Node({type: 'baz'}));
 * console.log(parent.nodes.length); //=> 3
 * utils.popNode(parent);
 * console.log(parent.nodes.length); //=> 2
 * ```
 * @param {Object} `parent`
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Number|Undefined} Returns the length of `node.nodes` or undefined.
 * @api public
 */

utils.popNode = function(node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  if (typeof node.pop === 'function') {
    return node.pop();
  }
  return node.nodes && node.nodes.pop();
};

/**
 * Shift the first `node` off of `parent.nodes`. The advantage of
 * using this method is that it checks for `node.nodes` and works
 * with any version of `snapdragon-node`.
 *
 * ```js
 * var parent = new Node({type: 'foo'});
 * utils.pushNode(parent, new Node({type: 'foo'}));
 * utils.pushNode(parent, new Node({type: 'bar'}));
 * utils.pushNode(parent, new Node({type: 'baz'}));
 * console.log(parent.nodes.length); //=> 3
 * utils.shiftNode(parent);
 * console.log(parent.nodes.length); //=> 2
 * ```
 * @param {Object} `parent`
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Number|Undefined} Returns the length of `node.nodes` or undefined.
 * @api public
 */

utils.shiftNode = function(node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  if (typeof node.shift === 'function') {
    return node.shift();
  }
  return node.nodes && node.nodes.shift();
};

/**
 * Remove the specified `node` from `parent.nodes`.
 *
 * ```js
 * var parent = new Node({type: 'abc'});
 * var foo = new Node({type: 'foo'});
 * utils.pushNode(parent, foo);
 * utils.pushNode(parent, new Node({type: 'bar'}));
 * utils.pushNode(parent, new Node({type: 'baz'}));
 * console.log(parent.nodes.length); //=> 3
 * utils.removeNode(parent, foo);
 * console.log(parent.nodes.length); //=> 2
 * ```
 * @param {Object} `parent`
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Object|undefined} Returns the removed node, if successful, or undefined if it does not exist on `parent.nodes`.
 * @api public
 */

utils.removeNode = function(parent, node) {
  assert(utils.isNode(parent), 'expected parent.node to be an instance of Node');
  assert(utils.isNode(node), 'expected node to be an instance of Node');

  if (!parent.nodes) {
    return null;
  }

  if (typeof parent.remove === 'function') {
    return parent.remove(node);
  }

  var idx = parent.nodes.indexOf(node);
  if (idx !== -1) {
    return parent.nodes.splice(idx, 1);
  }
};

/**
 * Returns true if `node.type` matches the given `type`. Throws a
 * `TypeError` if `node` is not an instance of `Node`.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var node = new Node({type: 'foo'});
 * console.log(utils.isType(node, 'foo')); // false
 * console.log(utils.isType(node, 'bar')); // true
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {String} `type`
 * @return {Boolean}
 * @api public
 */

utils.isType = function(node, type) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  switch (typeOf(type)) {
    case 'array':
      var types = type.slice();
      for (var i = 0; i < types.length; i++) {
        if (utils.isType(node, types[i])) {
          return true;
        }
      }
      return false;
    case 'string':
      return node.type === type;
    case 'regexp':
      return type.test(node.type);
    default: {
      throw new TypeError('expected "type" to be an array, string or regexp');
    }
  }
};

/**
 * Returns true if the given `node` has the given `type` in `node.nodes`.
 * Throws a `TypeError` if `node` is not an instance of `Node`.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var node = new Node({
 *   type: 'foo',
 *   nodes: [
 *     new Node({type: 'bar'}),
 *     new Node({type: 'baz'})
 *   ]
 * });
 * console.log(utils.hasType(node, 'xyz')); // false
 * console.log(utils.hasType(node, 'baz')); // true
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {String} `type`
 * @return {Boolean}
 * @api public
 */

utils.hasType = function(node, type) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  if (!Array.isArray(node.nodes)) return false;
  for (var i = 0; i < node.nodes.length; i++) {
    if (utils.isType(node.nodes[i], type)) {
      return true;
    }
  }
  return false;
};

/**
 * Returns the first node from `node.nodes` of the given `type`
 *
 * ```js
 * var node = new Node({
 *   type: 'foo',
 *   nodes: [
 *     new Node({type: 'text', val: 'abc'}),
 *     new Node({type: 'text', val: 'xyz'})
 *   ]
 * });
 *
 * var textNode = utils.firstOfType(node.nodes, 'text');
 * console.log(textNode.val);
 * //=> 'abc'
 * ```
 * @param {Array} `nodes`
 * @param {String} `type`
 * @return {Object|undefined} Returns the first matching node or undefined.
 * @api public
 */

utils.firstOfType = function(nodes, type) {
  for (var i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (utils.isType(node, type)) {
      return node;
    }
  }
};

/**
 * Returns the node at the specified index, or the first node of the
 * given `type` from `node.nodes`.
 *
 * ```js
 * var node = new Node({
 *   type: 'foo',
 *   nodes: [
 *     new Node({type: 'text', val: 'abc'}),
 *     new Node({type: 'text', val: 'xyz'})
 *   ]
 * });
 *
 * var nodeOne = utils.findNode(node.nodes, 'text');
 * console.log(nodeOne.val);
 * //=> 'abc'
 *
 * var nodeTwo = utils.findNode(node.nodes, 1);
 * console.log(nodeTwo.val);
 * //=> 'xyz'
 * ```
 *
 * @param {Array} `nodes`
 * @param {String|Number} `type` Node type or index.
 * @return {Object} Returns a node or undefined.
 * @api public
 */

utils.findNode = function(nodes, type) {
  if (!Array.isArray(nodes)) {
    return null;
  }
  if (typeof type === 'number') {
    return nodes[type];
  }
  return utils.firstOfType(nodes, type);
};

/**
 * Returns true if the given node is an "*.open" node.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var brace = new Node({type: 'brace'});
 * var open = new Node({type: 'brace.open'});
 * var close = new Node({type: 'brace.close'});
 *
 * console.log(utils.isOpen(brace)); // false
 * console.log(utils.isOpen(open)); // true
 * console.log(utils.isOpen(close)); // false
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Boolean}
 * @api public
 */

utils.isOpen = function(node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  return node.type.slice(-5) === '.open';
};

/**
 * Returns true if the given node is a "*.close" node.
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var brace = new Node({type: 'brace'});
 * var open = new Node({type: 'brace.open'});
 * var close = new Node({type: 'brace.close'});
 *
 * console.log(utils.isClose(brace)); // false
 * console.log(utils.isClose(open)); // false
 * console.log(utils.isClose(close)); // true
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Boolean}
 * @api public
 */

utils.isClose = function(node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  return node.type.slice(-6) === '.close';
};

/**
 * Returns true if `node.nodes` **has** an `.open` node
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var brace = new Node({
 *   type: 'brace',
 *   nodes: []
 * });
 *
 * var open = new Node({type: 'brace.open'});
 * console.log(utils.hasOpen(brace)); // false
 *
 * brace.pushNode(open);
 * console.log(utils.hasOpen(brace)); // true
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Boolean}
 * @api public
 */

utils.hasOpen = function(node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  var first = node.first || node.nodes ? node.nodes[0] : null;
  if (utils.isNode(first)) {
    return first.type === node.type + '.open';
  }
  return false;
};

/**
 * Returns true if `node.nodes` **has** a `.close` node
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var brace = new Node({
 *   type: 'brace',
 *   nodes: []
 * });
 *
 * var close = new Node({type: 'brace.close'});
 * console.log(utils.hasClose(brace)); // false
 *
 * brace.pushNode(close);
 * console.log(utils.hasClose(brace)); // true
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Boolean}
 * @api public
 */

utils.hasClose = function(node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  var last = node.last || node.nodes ? node.nodes[node.nodes.length - 1] : null;
  if (utils.isNode(last)) {
    return last.type === node.type + '.close';
  }
  return false;
};

/**
 * Returns true if `node.nodes` has both `.open` and `.close` nodes
 *
 * ```js
 * var Node = require('snapdragon-node');
 * var brace = new Node({
 *   type: 'brace',
 *   nodes: []
 * });
 *
 * var open = new Node({type: 'brace.open'});
 * var close = new Node({type: 'brace.close'});
 * console.log(utils.hasOpen(brace)); // false
 * console.log(utils.hasClose(brace)); // false
 *
 * brace.pushNode(open);
 * brace.pushNode(close);
 * console.log(utils.hasOpen(brace)); // true
 * console.log(utils.hasClose(brace)); // true
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Boolean}
 * @api public
 */

utils.hasOpenAndClose = function(node) {
  return utils.hasOpen(node) && utils.hasClose(node);
};

/**
 * Push the given `node` onto the `state.inside` array for the
 * given type. This array is used as a specialized "stack" for
 * only the given `node.type`.
 *
 * ```js
 * var state = { inside: {}};
 * var node = new Node({type: 'brace'});
 * utils.addType(state, node);
 * console.log(state.inside);
 * //=> { brace: [{type: 'brace'}] }
 * ```
 * @param {Object} `state` The `compiler.state` object or custom state object.
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Array} Returns the `state.inside` stack for the given type.
 * @api public
 */

utils.addType = function(state, node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isObject(state), 'expected state to be an object');

  var type = node.parent
    ? node.parent.type
    : node.type.replace(/\.open$/, '');

  if (!state.hasOwnProperty('inside')) {
    state.inside = {};
  }
  if (!state.inside.hasOwnProperty(type)) {
    state.inside[type] = [];
  }

  var arr = state.inside[type];
  arr.push(node);
  return arr;
};

/**
 * Remove the given `node` from the `state.inside` array for the
 * given type. This array is used as a specialized "stack" for
 * only the given `node.type`.
 *
 * ```js
 * var state = { inside: {}};
 * var node = new Node({type: 'brace'});
 * utils.addType(state, node);
 * console.log(state.inside);
 * //=> { brace: [{type: 'brace'}] }
 * utils.removeType(state, node);
 * //=> { brace: [] }
 * ```
 * @param {Object} `state` The `compiler.state` object or custom state object.
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @return {Array} Returns the `state.inside` stack for the given type.
 * @api public
 */

utils.removeType = function(state, node) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isObject(state), 'expected state to be an object');

  var type = node.parent
    ? node.parent.type
    : node.type.replace(/\.close$/, '');

  if (state.inside.hasOwnProperty(type)) {
    return state.inside[type].pop();
  }
};

/**
 * Returns true if `node.val` is an empty string, or `node.nodes` does
 * not contain any non-empty text nodes.
 *
 * ```js
 * var node = new Node({type: 'text'});
 * utils.isEmpty(node); //=> true
 * node.val = 'foo';
 * utils.isEmpty(node); //=> false
 * ```
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {Function} `fn`
 * @return {Boolean}
 * @api public
 */

utils.isEmpty = function(node, fn) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');

  if (!Array.isArray(node.nodes)) {
    if (node.type !== 'text') {
      return true;
    }
    if (typeof fn === 'function') {
      return fn(node, node.parent);
    }
    return !utils.trim(node.val);
  }

  for (var i = 0; i < node.nodes.length; i++) {
    var child = node.nodes[i];
    if (utils.isOpen(child) || utils.isClose(child)) {
      continue;
    }
    if (!utils.isEmpty(child, fn)) {
      return false;
    }
  }

  return true;
};

/**
 * Returns true if the `state.inside` stack for the given type exists
 * and has one or more nodes on it.
 *
 * ```js
 * var state = { inside: {}};
 * var node = new Node({type: 'brace'});
 * console.log(utils.isInsideType(state, 'brace')); //=> false
 * utils.addType(state, node);
 * console.log(utils.isInsideType(state, 'brace')); //=> true
 * utils.removeType(state, node);
 * console.log(utils.isInsideType(state, 'brace')); //=> false
 * ```
 * @param {Object} `state`
 * @param {String} `type`
 * @return {Boolean}
 * @api public
 */

utils.isInsideType = function(state, type) {
  assert(isObject(state), 'expected state to be an object');
  assert(isString(type), 'expected type to be a string');

  if (!state.hasOwnProperty('inside')) {
    return false;
  }

  if (!state.inside.hasOwnProperty(type)) {
    return false;
  }

  return state.inside[type].length > 0;
};

/**
 * Returns true if `node` is either a child or grand-child of the given `type`,
 * or `state.inside[type]` is a non-empty array.
 *
 * ```js
 * var state = { inside: {}};
 * var node = new Node({type: 'brace'});
 * var open = new Node({type: 'brace.open'});
 * console.log(utils.isInside(state, open, 'brace')); //=> false
 * utils.pushNode(node, open);
 * console.log(utils.isInside(state, open, 'brace')); //=> true
 * ```
 * @param {Object} `state` Either the `compiler.state` object, if it exists, or a user-supplied state object.
 * @param {Object} `node` Instance of [snapdragon-node][]
 * @param {String} `type` The `node.type` to check for.
 * @return {Boolean}
 * @api public
 */

utils.isInside = function(state, node, type) {
  assert(utils.isNode(node), 'expected node to be an instance of Node');
  assert(isObject(state), 'expected state to be an object');

  if (Array.isArray(type)) {
    for (var i = 0; i < type.length; i++) {
      if (utils.isInside(state, node, type[i])) {
        return true;
      }
    }
    return false;
  }

  var parent = node.parent;
  if (typeof type === 'string') {
    return (parent && parent.type === type) || utils.isInsideType(state, type);
  }

  if (typeOf(type) === 'regexp') {
    if (parent && parent.type && type.test(parent.type)) {
      return true;
    }

    var keys = Object.keys(state.inside);
    var len = keys.length;
    var idx = -1;
    while (++idx < len) {
      var key = keys[idx];
      var val = state.inside[key];

      if (Array.isArray(val) && val.length !== 0 && type.test(key)) {
        return true;
      }
    }
  }
  return false;
};

/**
 * Get the last `n` element from the given `array`. Used for getting
 * a node from `node.nodes.`
 *
 * @param {Array} `array`
 * @param {Number} `n`
 * @return {undefined}
 * @api public
 */

utils.last = function(arr, n) {
  return arr[arr.length - (n || 1)];
};

/**
 * Cast the given `val` to an array.
 *
 * ```js
 * console.log(utils.arrayify(''));
 * //=> []
 * console.log(utils.arrayify('foo'));
 * //=> ['foo']
 * console.log(utils.arrayify(['foo']));
 * //=> ['foo']
 * ```
 * @param {any} `val`
 * @return {Array}
 * @api public
 */

utils.arrayify = function(val) {
  if (typeof val === 'string' && val !== '') {
    return [val];
  }
  if (!Array.isArray(val)) {
    return [];
  }
  return val;
};

/**
 * Convert the given `val` to a string by joining with `,`. Useful
 * for creating a cheerio/CSS/DOM-style selector from a list of strings.
 *
 * @param {any} `val`
 * @return {Array}
 * @api public
 */

utils.stringify = function(val) {
  return utils.arrayify(val).join(',');
};

/**
 * Ensure that the given value is a string and call `.trim()` on it,
 * or return an empty string.
 *
 * @param {String} `str`
 * @return {String}
 * @api public
 */

utils.trim = function(str) {
  return typeof str === 'string' ? str.trim() : '';
};

/**
 * Return true if val is an object
 */

function isObject(val) {
  return typeOf(val) === 'object';
}

/**
 * Return true if val is a string
 */

function isString(val) {
  return typeof val === 'string';
}

/**
 * Return true if val is a function
 */

function isFunction(val) {
  return typeof val === 'function';
}

/**
 * Return true if val is an array
 */

function isArray(val) {
  return Array.isArray(val);
}

/**
 * Shim to ensure the `.append` methods work with any version of snapdragon
 */

function append(compiler, val, node) {
  if (typeof compiler.append !== 'function') {
    return compiler.emit(val, node);
  }
  return compiler.append(val, node);
}

/**
 * Simplified assertion. Throws an error is `val` is falsey.
 */

function assert(val, message) {
  if (!val) throw new Error(message);
}


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(43);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(34);
var Snapdragon = __webpack_require__(57);
var compilers = __webpack_require__(36);
var parsers = __webpack_require__(48);
var utils = __webpack_require__(37);

/**
 * Customize Snapdragon parser and renderer
 */

function Braces(options) {
  this.options = extend({}, options);
}

/**
 * Initialize braces
 */

Braces.prototype.init = function(options) {
  if (this.isInitialized) return;
  this.isInitialized = true;
  var opts = utils.createOptions({}, this.options, options);
  this.snapdragon = this.options.snapdragon || new Snapdragon(opts);
  this.compiler = this.snapdragon.compiler;
  this.parser = this.snapdragon.parser;

  compilers(this.snapdragon, opts);
  parsers(this.snapdragon, opts);

  /**
   * Call Snapdragon `.parse` method. When AST is returned, we check to
   * see if any unclosed braces are left on the stack and, if so, we iterate
   * over the stack and correct the AST so that compilers are called in the correct
   * order and unbalance braces are properly escaped.
   */

  utils.define(this.snapdragon, 'parse', function(pattern, options) {
    var parsed = Snapdragon.prototype.parse.apply(this, arguments);
    this.parser.ast.input = pattern;

    var stack = this.parser.stack;
    while (stack.length) {
      addParent({type: 'brace.close', val: ''}, stack.pop());
    }

    function addParent(node, parent) {
      utils.define(node, 'parent', parent);
      parent.nodes.push(node);
    }

    // add non-enumerable parser reference
    utils.define(parsed, 'parser', this.parser);
    return parsed;
  });
};

/**
 * Decorate `.parse` method
 */

Braces.prototype.parse = function(ast, options) {
  if (ast && typeof ast === 'object' && ast.nodes) return ast;
  this.init(options);
  return this.snapdragon.parse(ast, options);
};

/**
 * Decorate `.compile` method
 */

Braces.prototype.compile = function(ast, options) {
  if (typeof ast === 'string') {
    ast = this.parse(ast, options);
  } else {
    this.init(options);
  }
  return this.snapdragon.compile(ast, options);
};

/**
 * Expand
 */

Braces.prototype.expand = function(pattern) {
  var ast = this.parse(pattern, {expand: true});
  return this.compile(ast, {expand: true});
};

/**
 * Optimize
 */

Braces.prototype.optimize = function(pattern) {
  var ast = this.parse(pattern, {optimize: true});
  return this.compile(ast, {optimize: true});
};

/**
 * Expose `Braces`
 */

module.exports = Braces;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Base = __webpack_require__(58);
var define = __webpack_require__(101);
var Compiler = __webpack_require__(102);
var Parser = __webpack_require__(133);
var utils = __webpack_require__(111);
var regexCache = {};
var cache = {};

/**
 * Create a new instance of `Snapdragon` with the given `options`.
 *
 * ```js
 * var snapdragon = new Snapdragon();
 * ```
 *
 * @param {Object} `options`
 * @api public
 */

function Snapdragon(options) {
  Base.call(this, null, options);
  this.options = utils.extend({source: 'string'}, this.options);
  this.compiler = new Compiler(this.options);
  this.parser = new Parser(this.options);

  Object.defineProperty(this, 'compilers', {
    get: function() {
      return this.compiler.compilers;
    }
  });

  Object.defineProperty(this, 'parsers', {
    get: function() {
      return this.parser.parsers;
    }
  });

  Object.defineProperty(this, 'regex', {
    get: function() {
      return this.parser.regex;
    }
  });
}

/**
 * Inherit Base
 */

Base.extend(Snapdragon);

/**
 * Add a parser to `snapdragon.parsers` for capturing the given `type` using
 * the specified regex or parser function. A function is useful if you need
 * to customize how the token is created and/or have access to the parser
 * instance to check options, etc.
 *
 * ```js
 * snapdragon
 *   .capture('slash', /^\//)
 *   .capture('dot', function() {
 *     var pos = this.position();
 *     var m = this.match(/^\./);
 *     if (!m) return;
 *     return pos({
 *       type: 'dot',
 *       val: m[0]
 *     });
 *   });
 * ```
 * @param {String} `type`
 * @param {RegExp|Function} `regex`
 * @return {Object} Returns the parser instance for chaining
 * @api public
 */

Snapdragon.prototype.capture = function() {
  return this.parser.capture.apply(this.parser, arguments);
};

/**
 * Register a plugin `fn`.
 *
 * ```js
 * var snapdragon = new Snapdgragon([options]);
 * snapdragon.use(function() {
 *   console.log(this);          //<= snapdragon instance
 *   console.log(this.parser);   //<= parser instance
 *   console.log(this.compiler); //<= compiler instance
 * });
 * ```
 * @param {Object} `fn`
 * @api public
 */

Snapdragon.prototype.use = function(fn) {
  fn.call(this, this);
  return this;
};

/**
 * Parse the given `str`.
 *
 * ```js
 * var snapdragon = new Snapdgragon([options]);
 * // register parsers
 * snapdragon.parser.use(function() {});
 *
 * // parse
 * var ast = snapdragon.parse('foo/bar');
 * console.log(ast);
 * ```
 * @param {String} `str`
 * @param {Object} `options` Set `options.sourcemap` to true to enable source maps.
 * @return {Object} Returns an AST.
 * @api public
 */

Snapdragon.prototype.parse = function(str, options) {
  this.options = utils.extend({}, this.options, options);
  var parsed = this.parser.parse(str, this.options);

  // add non-enumerable parser reference
  define(parsed, 'parser', this.parser);
  return parsed;
};

/**
 * Compile the given `AST`.
 *
 * ```js
 * var snapdragon = new Snapdgragon([options]);
 * // register plugins
 * snapdragon.use(function() {});
 * // register parser plugins
 * snapdragon.parser.use(function() {});
 * // register compiler plugins
 * snapdragon.compiler.use(function() {});
 *
 * // parse
 * var ast = snapdragon.parse('foo/bar');
 *
 * // compile
 * var res = snapdragon.compile(ast);
 * console.log(res.output);
 * ```
 * @param {Object} `ast`
 * @param {Object} `options`
 * @return {Object} Returns an object with an `output` property with the rendered string.
 * @api public
 */

Snapdragon.prototype.compile = function(ast, options) {
  this.options = utils.extend({}, this.options, options);
  var compiled = this.compiler.compile(ast, this.options);

  // add non-enumerable compiler reference
  define(compiled, 'compiler', this.compiler);
  return compiled;
};

/**
 * Expose `Snapdragon`
 */

module.exports = Snapdragon;

/**
 * Expose `Parser` and `Compiler`
 */

module.exports.Compiler = Compiler;
module.exports.Parser = Parser;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(8);
var define = __webpack_require__(59);
var CacheBase = __webpack_require__(63);
var Emitter = __webpack_require__(64);
var isObject = __webpack_require__(23);
var merge = __webpack_require__(83);
var pascal = __webpack_require__(86);
var cu = __webpack_require__(87);

/**
 * Optionally define a custom `cache` namespace to use.
 */

function namespace(name) {
  var Cache = name ? CacheBase.namespace(name) : CacheBase;
  var fns = [];

  /**
   * Create an instance of `Base` with the given `config` and `options`.
   *
   * ```js
   * // initialize with `config` and `options`
   * var app = new Base({isApp: true}, {abc: true});
   * app.set('foo', 'bar');
   *
   * // values defined with the given `config` object will be on the root of the instance
   * console.log(app.baz); //=> undefined
   * console.log(app.foo); //=> 'bar'
   * // or use `.get`
   * console.log(app.get('isApp')); //=> true
   * console.log(app.get('foo')); //=> 'bar'
   *
   * // values defined with the given `options` object will be on `app.options
   * console.log(app.options.abc); //=> true
   * ```
   *
   * @param {Object} `config` If supplied, this object is passed to [cache-base][] to merge onto the the instance upon instantiation.
   * @param {Object} `options` If supplied, this object is used to initialize the `base.options` object.
   * @api public
   */

  function Base(config, options) {
    if (!(this instanceof Base)) {
      return new Base(config, options);
    }
    Cache.call(this, config);
    this.is('base');
    this.initBase(config, options);
  }

  /**
   * Inherit cache-base
   */

  util.inherits(Base, Cache);

  /**
   * Add static emitter methods
   */

  Emitter(Base);

  /**
   * Initialize `Base` defaults with the given `config` object
   */

  Base.prototype.initBase = function(config, options) {
    this.options = merge({}, this.options, options);
    this.cache = this.cache || {};
    this.define('registered', {});
    if (name) this[name] = {};

    // make `app._callbacks` non-enumerable
    this.define('_callbacks', this._callbacks);
    if (isObject(config)) {
      this.visit('set', config);
    }
    Base.run(this, 'use', fns);
  };

  /**
   * Set the given `name` on `app._name` and `app.is*` properties. Used for doing
   * lookups in plugins.
   *
   * ```js
   * app.is('foo');
   * console.log(app._name);
   * //=> 'foo'
   * console.log(app.isFoo);
   * //=> true
   * app.is('bar');
   * console.log(app.isFoo);
   * //=> true
   * console.log(app.isBar);
   * //=> true
   * console.log(app._name);
   * //=> 'bar'
   * ```
   * @name .is
   * @param {String} `name`
   * @return {Boolean}
   * @api public
   */

  Base.prototype.is = function(name) {
    if (typeof name !== 'string') {
      throw new TypeError('expected name to be a string');
    }
    this.define('is' + pascal(name), true);
    this.define('_name', name);
    this.define('_appname', name);
    return this;
  };

  /**
   * Returns true if a plugin has already been registered on an instance.
   *
   * Plugin implementors are encouraged to use this first thing in a plugin
   * to prevent the plugin from being called more than once on the same
   * instance.
   *
   * ```js
   * var base = new Base();
   * base.use(function(app) {
   *   if (app.isRegistered('myPlugin')) return;
   *   // do stuff to `app`
   * });
   *
   * // to also record the plugin as being registered
   * base.use(function(app) {
   *   if (app.isRegistered('myPlugin', true)) return;
   *   // do stuff to `app`
   * });
   * ```
   * @name .isRegistered
   * @emits `plugin` Emits the name of the plugin being registered. Useful for unit tests, to ensure plugins are only registered once.
   * @param {String} `name` The plugin name.
   * @param {Boolean} `register` If the plugin if not already registered, to record it as being registered pass `true` as the second argument.
   * @return {Boolean} Returns true if a plugin is already registered.
   * @api public
   */

  Base.prototype.isRegistered = function(name, register) {
    if (this.registered.hasOwnProperty(name)) {
      return true;
    }
    if (register !== false) {
      this.registered[name] = true;
      this.emit('plugin', name);
    }
    return false;
  };

  /**
   * Define a plugin function to be called immediately upon init. Plugins are chainable
   * and expose the following arguments to the plugin function:
   *
   * - `app`: the current instance of `Base`
   * - `base`: the [first ancestor instance](#base) of `Base`
   *
   * ```js
   * var app = new Base()
   *   .use(foo)
   *   .use(bar)
   *   .use(baz)
   * ```
   * @name .use
   * @param {Function} `fn` plugin function to call
   * @return {Object} Returns the item instance for chaining.
   * @api public
   */

  Base.prototype.use = function(fn) {
    fn.call(this, this);
    return this;
  };

  /**
   * The `.define` method is used for adding non-enumerable property on the instance.
   * Dot-notation is **not supported** with `define`.
   *
   * ```js
   * // arbitrary `render` function using lodash `template`
   * app.define('render', function(str, locals) {
   *   return _.template(str)(locals);
   * });
   * ```
   * @name .define
   * @param {String} `key` The name of the property to define.
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  Base.prototype.define = function(key, val) {
    if (isObject(key)) {
      return this.visit('define', key);
    }
    define(this, key, val);
    return this;
  };

  /**
   * Mix property `key` onto the Base prototype. If base is inherited using
   * `Base.extend` this method will be overridden by a new `mixin` method that will
   * only add properties to the prototype of the inheriting application.
   *
   * ```js
   * app.mixin('foo', function() {
   *   // do stuff
   * });
   * ```
   * @name .mixin
   * @param {String} `key`
   * @param {Object|Array} `val`
   * @return {Object} Returns the `base` instance for chaining.
   * @api public
   */

  Base.prototype.mixin = function(key, val) {
    Base.prototype[key] = val;
    return this;
  };

  /**
   * Non-enumberable mixin array, used by the static [Base.mixin]() method.
   */

  Base.prototype.mixins = Base.prototype.mixins || [];

  /**
   * Getter/setter used when creating nested instances of `Base`, for storing a reference
   * to the first ancestor instance. This works by setting an instance of `Base` on the `parent`
   * property of a "child" instance. The `base` property defaults to the current instance if
   * no `parent` property is defined.
   *
   * ```js
   * // create an instance of `Base`, this is our first ("base") instance
   * var first = new Base();
   * first.foo = 'bar'; // arbitrary property, to make it easier to see what's happening later
   *
   * // create another instance
   * var second = new Base();
   * // create a reference to the first instance (`first`)
   * second.parent = first;
   *
   * // create another instance
   * var third = new Base();
   * // create a reference to the previous instance (`second`)
   * // repeat this pattern every time a "child" instance is created
   * third.parent = second;
   *
   * // we can always access the first instance using the `base` property
   * console.log(first.base.foo);
   * //=> 'bar'
   * console.log(second.base.foo);
   * //=> 'bar'
   * console.log(third.base.foo);
   * //=> 'bar'
   * // and now you know how to get to third base ;)
   * ```
   * @name .base
   * @api public
   */

  Object.defineProperty(Base.prototype, 'base', {
    configurable: true,
    get: function() {
      return this.parent ? this.parent.base : this;
    }
  });

  /**
   * Static method for adding global plugin functions that will
   * be added to an instance when created.
   *
   * ```js
   * Base.use(function(app) {
   *   app.foo = 'bar';
   * });
   * var app = new Base();
   * console.log(app.foo);
   * //=> 'bar'
   * ```
   * @name #use
   * @param {Function} `fn` Plugin function to use on each instance.
   * @return {Object} Returns the `Base` constructor for chaining
   * @api public
   */

  define(Base, 'use', function(fn) {
    fns.push(fn);
    return Base;
  });

  /**
   * Run an array of functions by passing each function
   * to a method on the given object specified by the given property.
   *
   * @param  {Object} `obj` Object containing method to use.
   * @param  {String} `prop` Name of the method on the object to use.
   * @param  {Array} `arr` Array of functions to pass to the method.
   */

  define(Base, 'run', function(obj, prop, arr) {
    var len = arr.length, i = 0;
    while (len--) {
      obj[prop](arr[i++]);
    }
    return Base;
  });

  /**
   * Static method for inheriting the prototype and static methods of the `Base` class.
   * This method greatly simplifies the process of creating inheritance-based applications.
   * See [static-extend][] for more details.
   *
   * ```js
   * var extend = cu.extend(Parent);
   * Parent.extend(Child);
   *
   * // optional methods
   * Parent.extend(Child, {
   *   foo: function() {},
   *   bar: function() {}
   * });
   * ```
   * @name #extend
   * @param {Function} `Ctor` constructor to extend
   * @param {Object} `methods` Optional prototype properties to mix in.
   * @return {Object} Returns the `Base` constructor for chaining
   * @api public
   */

  define(Base, 'extend', cu.extend(Base, function(Ctor, Parent) {
    Ctor.prototype.mixins = Ctor.prototype.mixins || [];

    define(Ctor, 'mixin', function(fn) {
      var mixin = fn(Ctor.prototype, Ctor);
      if (typeof mixin === 'function') {
        Ctor.prototype.mixins.push(mixin);
      }
      return Ctor;
    });

    define(Ctor, 'mixins', function(Child) {
      Base.run(Child, 'mixin', Ctor.prototype.mixins);
      return Ctor;
    });

    Ctor.prototype.mixin = function(key, value) {
      Ctor.prototype[key] = value;
      return this;
    };
    return Base;
  }));

  /**
   * Used for adding methods to the `Base` prototype, and/or to the prototype of child instances.
   * When a mixin function returns a function, the returned function is pushed onto the `.mixins`
   * array, making it available to be used on inheriting classes whenever `Base.mixins()` is
   * called (e.g. `Base.mixins(Child)`).
   *
   * ```js
   * Base.mixin(function(proto) {
   *   proto.foo = function(msg) {
   *     return 'foo ' + msg;
   *   };
   * });
   * ```
   * @name #mixin
   * @param {Function} `fn` Function to call
   * @return {Object} Returns the `Base` constructor for chaining
   * @api public
   */

  define(Base, 'mixin', function(fn) {
    var mixin = fn(Base.prototype, Base);
    if (typeof mixin === 'function') {
      Base.prototype.mixins.push(mixin);
    }
    return Base;
  });

  /**
   * Static method for running global mixin functions against a child constructor.
   * Mixins must be registered before calling this method.
   *
   * ```js
   * Base.extend(Child);
   * Base.mixins(Child);
   * ```
   * @name #mixins
   * @param {Function} `Child` Constructor function of a child class
   * @return {Object} Returns the `Base` constructor for chaining
   * @api public
   */

  define(Base, 'mixins', function(Child) {
    Base.run(Child, 'mixin', Base.prototype.mixins);
    return Base;
  });

  /**
   * Similar to `util.inherit`, but copies all static properties, prototype properties, and
   * getters/setters from `Provider` to `Receiver`. See [class-utils][]{#inherit} for more details.
   *
   * ```js
   * Base.inherit(Foo, Bar);
   * ```
   * @name #inherit
   * @param {Function} `Receiver` Receiving (child) constructor
   * @param {Function} `Provider` Providing (parent) constructor
   * @return {Object} Returns the `Base` constructor for chaining
   * @api public
   */

  define(Base, 'inherit', cu.inherit);
  define(Base, 'bubble', cu.bubble);
  return Base;
}

/**
 * Expose `Base` with default settings
 */

module.exports = namespace();

/**
 * Allow users to define a namespace
 */

module.exports.namespace = namespace;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isDescriptor = __webpack_require__(60);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);
var isAccessor = __webpack_require__(61);
var isData = __webpack_require__(62);

module.exports = function isDescriptor(obj, key) {
  if (typeOf(obj) !== 'object') {
    return false;
  }
  if ('get' in obj) {
    return isAccessor(obj, key);
  }
  return isData(obj, key);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

// accessor descriptor properties
var accessor = {
  get: 'function',
  set: 'function',
  configurable: 'boolean',
  enumerable: 'boolean'
};

function isAccessorDescriptor(obj, prop) {
  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (has(obj, 'value') || has(obj, 'writable')) {
    return false;
  }

  if (!has(obj, 'get') || typeof obj.get !== 'function') {
    return false;
  }

  // tldr: it's valid to have "set" be undefined
  // "set" might be undefined if `Object.getOwnPropertyDescriptor`
  // was used to get the value, and only `get` was defined by the user
  if (has(obj, 'set') && typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
    return false;
  }

  for (var key in obj) {
    if (!accessor.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === accessor[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
}

function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

/**
 * Expose `isAccessorDescriptor`
 */

module.exports = isAccessorDescriptor;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

module.exports = function isDataDescriptor(obj, prop) {
  // data descriptor properties
  var data = {
    configurable: 'boolean',
    enumerable: 'boolean',
    writable: 'boolean'
  };

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (!('value' in obj) && !('writable' in obj)) {
    return false;
  }

  for (var key in obj) {
    if (key === 'value') continue;

    if (!data.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === data[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(23);
var Emitter = __webpack_require__(64);
var visit = __webpack_require__(65);
var toPath = __webpack_require__(68);
var union = __webpack_require__(70);
var del = __webpack_require__(75);
var get = __webpack_require__(72);
var has = __webpack_require__(80);
var set = __webpack_require__(73);

/**
 * Create a `Cache` constructor that when instantiated will
 * store values on the given `prop`.
 *
 * ```js
 * var Cache = require('cache-base').namespace('data');
 * var cache = new Cache();
 *
 * cache.set('foo', 'bar');
 * //=> {data: {foo: 'bar'}}
 * ```
 * @param {String} `prop` The property name to use for storing values.
 * @return {Function} Returns a custom `Cache` constructor
 * @api public
 */

function namespace(prop) {

  /**
   * Create a new `Cache`. Internally the `Cache` constructor is created using
   * the `namespace` function, with `cache` defined as the storage object.
   *
   * ```js
   * var app = new Cache();
   * ```
   * @param {Object} `cache` Optionally pass an object to initialize with.
   * @constructor
   * @api public
   */

  function Cache(cache) {
    if (prop) {
      this[prop] = {};
    }
    if (cache) {
      this.set(cache);
    }
  }

  /**
   * Inherit Emitter
   */

  Emitter(Cache.prototype);

  /**
   * Assign `value` to `key`. Also emits `set` with
   * the key and value.
   *
   * ```js
   * app.on('set', function(key, val) {
   *   // do something when `set` is emitted
   * });
   *
   * app.set(key, value);
   *
   * // also takes an object or array
   * app.set({name: 'Halle'});
   * app.set([{foo: 'bar'}, {baz: 'quux'}]);
   * console.log(app);
   * //=> {name: 'Halle', foo: 'bar', baz: 'quux'}
   * ```
   *
   * @name .set
   * @emits `set` with `key` and `value` as arguments.
   * @param {String} `key`
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  Cache.prototype.set = function(key, val) {
    if (Array.isArray(key) && arguments.length === 2) {
      key = toPath(key);
    }
    if (isObject(key) || Array.isArray(key)) {
      this.visit('set', key);
    } else {
      set(prop ? this[prop] : this, key, val);
      this.emit('set', key, val);
    }
    return this;
  };

  /**
   * Union `array` to `key`. Also emits `set` with
   * the key and value.
   *
   * ```js
   * app.union('a.b', ['foo']);
   * app.union('a.b', ['bar']);
   * console.log(app.get('a'));
   * //=> {b: ['foo', 'bar']}
   * ```
   * @name .union
   * @param {String} `key`
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  Cache.prototype.union = function(key, val) {
    if (Array.isArray(key) && arguments.length === 2) {
      key = toPath(key);
    }
    var ctx = prop ? this[prop] : this;
    union(ctx, key, arrayify(val));
    this.emit('union', val);
    return this;
  };

  /**
   * Return the value of `key`. Dot notation may be used
   * to get [nested property values][get-value].
   *
   * ```js
   * app.set('a.b.c', 'd');
   * app.get('a.b');
   * //=> {c: 'd'}
   *
   * app.get(['a', 'b']);
   * //=> {c: 'd'}
   * ```
   *
   * @name .get
   * @emits `get` with `key` and `value` as arguments.
   * @param {String} `key` The name of the property to get. Dot-notation may be used.
   * @return {any} Returns the value of `key`
   * @api public
   */

  Cache.prototype.get = function(key) {
    key = toPath(arguments);

    var ctx = prop ? this[prop] : this;
    var val = get(ctx, key);

    this.emit('get', key, val);
    return val;
  };

  /**
   * Return true if app has a stored value for `key`,
   * false only if value is `undefined`.
   *
   * ```js
   * app.set('foo', 'bar');
   * app.has('foo');
   * //=> true
   * ```
   *
   * @name .has
   * @emits `has` with `key` and true or false as arguments.
   * @param {String} `key`
   * @return {Boolean}
   * @api public
   */

  Cache.prototype.has = function(key) {
    key = toPath(arguments);

    var ctx = prop ? this[prop] : this;
    var val = get(ctx, key);

    var has = typeof val !== 'undefined';
    this.emit('has', key, has);
    return has;
  };

  /**
   * Delete one or more properties from the instance.
   *
   * ```js
   * app.del(); // delete all
   * // or
   * app.del('foo');
   * // or
   * app.del(['foo', 'bar']);
   * ```
   * @name .del
   * @emits `del` with the `key` as the only argument.
   * @param {String|Array} `key` Property name or array of property names.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  Cache.prototype.del = function(key) {
    if (Array.isArray(key)) {
      this.visit('del', key);
    } else {
      del(prop ? this[prop] : this, key);
      this.emit('del', key);
    }
    return this;
  };

  /**
   * Reset the entire cache to an empty object.
   *
   * ```js
   * app.clear();
   * ```
   * @api public
   */

  Cache.prototype.clear = function() {
    if (prop) {
      this[prop] = {};
    }
  };

  /**
   * Visit `method` over the properties in the given object, or map
   * visit over the object-elements in an array.
   *
   * @name .visit
   * @param {String} `method` The name of the `base` method to call.
   * @param {Object|Array} `val` The object or array to iterate over.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  Cache.prototype.visit = function(method, val) {
    visit(this, method, val);
    return this;
  };

  return Cache;
}

/**
 * Cast val to an array
 */

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Expose `Cache`
 */

module.exports = namespace();

/**
 * Expose `Cache.namespace`
 */

module.exports.namespace = namespace;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
  }

  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * collection-visit <https://github.com/jonschlinkert/collection-visit>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var visit = __webpack_require__(66);
var mapVisit = __webpack_require__(67);

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
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * object-visit <https://github.com/jonschlinkert/object-visit>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(23);

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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(8);
var visit = __webpack_require__(66);

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
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * to-object-path <https://github.com/jonschlinkert/to-object-path>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var typeOf = __webpack_require__(69);

module.exports = function toPath(args) {
  if (typeOf(args) !== 'arguments') {
    args = arguments;
  }
  return filter(args).join('.');
};

function filter(arr) {
  var len = arr.length;
  var idx = -1;
  var res = [];

  while (++idx < len) {
    var ele = arr[idx];
    if (typeOf(ele) === 'arguments' || Array.isArray(ele)) {
      res.push.apply(res, filter(ele));
    } else if (typeof ele === 'string') {
      res.push(ele);
    }
  }
  return res;
}


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(43);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(35);
var union = __webpack_require__(71);
var get = __webpack_require__(72);
var set = __webpack_require__(73);

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
/* 71 */
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
/* 72 */
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
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var split = __webpack_require__(38);
var extend = __webpack_require__(74);
var isPlainObject = __webpack_require__(30);
var isObject = __webpack_require__(35);

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
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(35);

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
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * unset-value <https://github.com/jonschlinkert/unset-value>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(23);
var has = __webpack_require__(76);

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
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isObject = __webpack_require__(77);
var hasValues = __webpack_require__(79);
var get = __webpack_require__(72);

module.exports = function(obj, prop, noZero) {
  if (isObject(obj)) {
    return hasValues(get(obj, prop), noZero);
  }
  return hasValues(obj, prop);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isArray = __webpack_require__(78);

module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && isArray(val) === false;
};


/***/ }),
/* 78 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 79 */
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
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-value <https://github.com/jonschlinkert/has-value>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isObject = __webpack_require__(23);
var hasValues = __webpack_require__(81);
var get = __webpack_require__(72);

module.exports = function(val, prop) {
  return hasValues(isObject(val) && prop ? get(val, prop) : val);
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * has-values <https://github.com/jonschlinkert/has-values>
 *
 * Copyright (c) 2014-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(82);
var isNumber = __webpack_require__(41);

module.exports = function hasValue(val) {
  // is-number checks for NaN and other edge cases
  if (isNumber(val)) {
    return true;
  }

  switch (typeOf(val)) {
    case 'null':
    case 'boolean':
    case 'function':
      return true;
    case 'string':
    case 'arguments':
      return val.length !== 0;
    case 'error':
      return val.message !== '';
    case 'array':
      var len = val.length;
      if (len === 0) {
        return false;
      }
      for (var i = 0; i < len; i++) {
        if (hasValue(val[i])) {
          return true;
        }
      }
      return false;
    case 'file':
    case 'map':
    case 'set':
      return val.size !== 0;
    case 'object':
      var keys = Object.keys(val);
      if (keys.length === 0) {
        return false;
      }
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (hasValue(val[key])) {
          return true;
        }
      }
      return false;
    default: {
      return false;
    }
  }
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(43);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }
  if (type === '[object Promise]') {
    return 'promise';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isExtendable = __webpack_require__(84);
var forIn = __webpack_require__(85);

function mixinDeep(target, objects) {
  var len = arguments.length, i = 0;
  while (++i < len) {
    var obj = arguments[i];
    if (isObject(obj)) {
      forIn(obj, copy, target);
    }
  }
  return target;
}

/**
 * Copy properties from the source object to the
 * target object.
 *
 * @param  {*} `val`
 * @param  {String} `key`
 */

function copy(val, key) {
  if (!isValidKey(key)) {
    return;
  }

  var obj = this[key];
  if (isObject(val) && isObject(obj)) {
    mixinDeep(obj, val);
  } else {
    this[key] = val;
  }
}

/**
 * Returns true if `val` is an object or function.
 *
 * @param  {any} val
 * @return {Boolean}
 */

function isObject(val) {
  return isExtendable(val) && !Array.isArray(val);
}

/**
 * Returns true if `key` is a valid key to use when extending objects.
 *
 * @param  {String} `key`
 * @return {Boolean}
 */

function isValidKey(key) {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
};

/**
 * Expose `mixinDeep`
 */

module.exports = mixinDeep;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isPlainObject = __webpack_require__(30);

module.exports = function isExtendable(val) {
  return isPlainObject(val) || typeof val === 'function' || Array.isArray(val);
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * for-in <https://github.com/jonschlinkert/for-in>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function forIn(obj, fn, thisArg) {
  for (var key in obj) {
    if (fn.call(thisArg, obj[key], key, obj) === false) {
      break;
    }
  }
};


/***/ }),
/* 86 */
/***/ (function(module, exports) {

/*!
 * pascalcase <https://github.com/jonschlinkert/pascalcase>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

function pascalcase(str) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string.');
  }
  str = str.replace(/([A-Z])/g, ' $1');
  if (str.length === 1) { return str.toUpperCase(); }
  str = str.replace(/^[\W_]+|[\W_]+$/g, '').toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str.replace(/[\W_]+(\w|$)/g, function (_, ch) {
    return ch.toUpperCase();
  });
}

module.exports = pascalcase;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var util = __webpack_require__(8);
var union = __webpack_require__(71);
var define = __webpack_require__(88);
var staticExtend = __webpack_require__(95);
var isObj = __webpack_require__(23);

/**
 * Expose class utils
 */

var cu = module.exports;

/**
 * Expose class utils: `cu`
 */

cu.isObject = function isObject(val) {
  return isObj(val) || typeof val === 'function';
};

/**
 * Returns true if an array has any of the given elements, or an
 * object has any of the give keys.
 *
 * ```js
 * cu.has(['a', 'b', 'c'], 'c');
 * //=> true
 *
 * cu.has(['a', 'b', 'c'], ['c', 'z']);
 * //=> true
 *
 * cu.has({a: 'b', c: 'd'}, ['c', 'z']);
 * //=> true
 * ```
 * @param {Object} `obj`
 * @param {String|Array} `val`
 * @return {Boolean}
 * @api public
 */

cu.has = function has(obj, val) {
  val = cu.arrayify(val);
  var len = val.length;

  if (cu.isObject(obj)) {
    for (var key in obj) {
      if (val.indexOf(key) > -1) {
        return true;
      }
    }

    var keys = cu.nativeKeys(obj);
    return cu.has(keys, val);
  }

  if (Array.isArray(obj)) {
    var arr = obj;
    while (len--) {
      if (arr.indexOf(val[len]) > -1) {
        return true;
      }
    }
    return false;
  }

  throw new TypeError('expected an array or object.');
};

/**
 * Returns true if an array or object has all of the given values.
 *
 * ```js
 * cu.hasAll(['a', 'b', 'c'], 'c');
 * //=> true
 *
 * cu.hasAll(['a', 'b', 'c'], ['c', 'z']);
 * //=> false
 *
 * cu.hasAll({a: 'b', c: 'd'}, ['c', 'z']);
 * //=> false
 * ```
 * @param {Object|Array} `val`
 * @param {String|Array} `values`
 * @return {Boolean}
 * @api public
 */

cu.hasAll = function hasAll(val, values) {
  values = cu.arrayify(values);
  var len = values.length;
  while (len--) {
    if (!cu.has(val, values[len])) {
      return false;
    }
  }
  return true;
};

/**
 * Cast the given value to an array.
 *
 * ```js
 * cu.arrayify('foo');
 * //=> ['foo']
 *
 * cu.arrayify(['foo']);
 * //=> ['foo']
 * ```
 *
 * @param {String|Array} `val`
 * @return {Array}
 * @api public
 */

cu.arrayify = function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Noop
 */

cu.noop = function noop() {
  return;
};

/**
 * Returns the first argument passed to the function.
 */

cu.identity = function identity(val) {
  return val;
};

/**
 * Returns true if a value has a `contructor`
 *
 * ```js
 * cu.hasConstructor({});
 * //=> true
 *
 * cu.hasConstructor(Object.create(null));
 * //=> false
 * ```
 * @param  {Object} `value`
 * @return {Boolean}
 * @api public
 */

cu.hasConstructor = function hasConstructor(val) {
  return cu.isObject(val) && typeof val.constructor !== 'undefined';
};

/**
 * Get the native `ownPropertyNames` from the constructor of the
 * given `object`. An empty array is returned if the object does
 * not have a constructor.
 *
 * ```js
 * cu.nativeKeys({a: 'b', b: 'c', c: 'd'})
 * //=> ['a', 'b', 'c']
 *
 * cu.nativeKeys(function(){})
 * //=> ['length', 'caller']
 * ```
 *
 * @param  {Object} `obj` Object that has a `constructor`.
 * @return {Array} Array of keys.
 * @api public
 */

cu.nativeKeys = function nativeKeys(val) {
  if (!cu.hasConstructor(val)) return [];
  var keys = Object.getOwnPropertyNames(val);
  if ('caller' in val) keys.push('caller');
  return keys;
};

/**
 * Returns property descriptor `key` if it's an "own" property
 * of the given object.
 *
 * ```js
 * function App() {}
 * Object.defineProperty(App.prototype, 'count', {
 *   get: function() {
 *     return Object.keys(this).length;
 *   }
 * });
 * cu.getDescriptor(App.prototype, 'count');
 * // returns:
 * // {
 * //   get: [Function],
 * //   set: undefined,
 * //   enumerable: false,
 * //   configurable: false
 * // }
 * ```
 *
 * @param {Object} `obj`
 * @param {String} `key`
 * @return {Object} Returns descriptor `key`
 * @api public
 */

cu.getDescriptor = function getDescriptor(obj, key) {
  if (!cu.isObject(obj)) {
    throw new TypeError('expected an object.');
  }
  if (typeof key !== 'string') {
    throw new TypeError('expected key to be a string.');
  }
  return Object.getOwnPropertyDescriptor(obj, key);
};

/**
 * Copy a descriptor from one object to another.
 *
 * ```js
 * function App() {}
 * Object.defineProperty(App.prototype, 'count', {
 *   get: function() {
 *     return Object.keys(this).length;
 *   }
 * });
 * var obj = {};
 * cu.copyDescriptor(obj, App.prototype, 'count');
 * ```
 * @param {Object} `receiver`
 * @param {Object} `provider`
 * @param {String} `name`
 * @return {Object}
 * @api public
 */

cu.copyDescriptor = function copyDescriptor(receiver, provider, name) {
  if (!cu.isObject(receiver)) {
    throw new TypeError('expected receiving object to be an object.');
  }
  if (!cu.isObject(provider)) {
    throw new TypeError('expected providing object to be an object.');
  }
  if (typeof name !== 'string') {
    throw new TypeError('expected name to be a string.');
  }

  var val = cu.getDescriptor(provider, name);
  if (val) Object.defineProperty(receiver, name, val);
};

/**
 * Copy static properties, prototype properties, and descriptors
 * from one object to another.
 *
 * @param {Object} `receiver`
 * @param {Object} `provider`
 * @param {String|Array} `omit` One or more properties to omit
 * @return {Object}
 * @api public
 */

cu.copy = function copy(receiver, provider, omit) {
  if (!cu.isObject(receiver)) {
    throw new TypeError('expected receiving object to be an object.');
  }
  if (!cu.isObject(provider)) {
    throw new TypeError('expected providing object to be an object.');
  }
  var props = Object.getOwnPropertyNames(provider);
  var keys = Object.keys(provider);
  var len = props.length,
    key;
  omit = cu.arrayify(omit);

  while (len--) {
    key = props[len];

    if (cu.has(keys, key)) {
      define(receiver, key, provider[key]);
    } else if (!(key in receiver) && !cu.has(omit, key)) {
      cu.copyDescriptor(receiver, provider, key);
    }
  }
};

/**
 * Inherit the static properties, prototype properties, and descriptors
 * from of an object.
 *
 * @param {Object} `receiver`
 * @param {Object} `provider`
 * @param {String|Array} `omit` One or more properties to omit
 * @return {Object}
 * @api public
 */

cu.inherit = function inherit(receiver, provider, omit) {
  if (!cu.isObject(receiver)) {
    throw new TypeError('expected receiving object to be an object.');
  }
  if (!cu.isObject(provider)) {
    throw new TypeError('expected providing object to be an object.');
  }

  var keys = [];
  for (var key in provider) {
    keys.push(key);
    receiver[key] = provider[key];
  }

  keys = keys.concat(cu.arrayify(omit));

  var a = provider.prototype || provider;
  var b = receiver.prototype || receiver;
  cu.copy(b, a, keys);
};

/**
 * Returns a function for extending the static properties,
 * prototype properties, and descriptors from the `Parent`
 * constructor onto `Child` constructors.
 *
 * ```js
 * var extend = cu.extend(Parent);
 * Parent.extend(Child);
 *
 * // optional methods
 * Parent.extend(Child, {
 *   foo: function() {},
 *   bar: function() {}
 * });
 * ```
 * @param {Function} `Parent` Parent ctor
 * @param {Function} `extend` Optional extend function to handle custom extensions. Useful when updating methods that require a specific prototype.
 *   @param {Function} `Child` Child ctor
 *   @param {Object} `proto` Optionally pass additional prototype properties to inherit.
 *   @return {Object}
 * @api public
 */

cu.extend = function() {
  // keep it lazy, instead of assigning to `cu.extend`
  return staticExtend.apply(null, arguments);
};

/**
 * Bubble up events emitted from static methods on the Parent ctor.
 *
 * @param {Object} `Parent`
 * @param {Array} `events` Event names to bubble up
 * @api public
 */

cu.bubble = function(Parent, events) {
  events = events || [];
  Parent.bubble = function(Child, arr) {
    if (Array.isArray(arr)) {
      events = union([], events, arr);
    }
    var len = events.length;
    var idx = -1;
    while (++idx < len) {
      var name = events[idx];
      Parent.on(name, Child.emit.bind(Child, name));
    }
    cu.bubble(Child, events);
  };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isDescriptor = __webpack_require__(89);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(90);
var isAccessor = __webpack_require__(91);
var isData = __webpack_require__(93);

module.exports = function isDescriptor(obj, key) {
  if (typeOf(obj) !== 'object') {
    return false;
  }
  if ('get' in obj) {
    return isAccessor(obj, key);
  }
  return isData(obj, key);
};


/***/ }),
/* 90 */
/***/ (function(module, exports) {

var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  var type = typeof val;

  // primitivies
  if (type === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (type === 'string' || val instanceof String) {
    return 'string';
  }
  if (type === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (type === 'function' || val instanceof Function) {
    if (typeof val.constructor.name !== 'undefined' && val.constructor.name.slice(0, 9) === 'Generator') {
      return 'generatorfunction';
    }
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }
  if (type === '[object Promise]') {
    return 'promise';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }
  
  if (type === '[object Map Iterator]') {
    return 'mapiterator';
  }
  if (type === '[object Set Iterator]') {
    return 'setiterator';
  }
  if (type === '[object String Iterator]') {
    return 'stringiterator';
  }
  if (type === '[object Array Iterator]') {
    return 'arrayiterator';
  }
  
  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};

/**
 * If you need to support Safari 5-7 (8-10 yr-old browser),
 * take a look at https://github.com/feross/is-buffer
 */

function isBuffer(val) {
  return val.constructor
    && typeof val.constructor.isBuffer === 'function'
    && val.constructor.isBuffer(val);
}


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var typeOf = __webpack_require__(92);

// accessor descriptor properties
var accessor = {
  get: 'function',
  set: 'function',
  configurable: 'boolean',
  enumerable: 'boolean'
};

function isAccessorDescriptor(obj, prop) {
  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (has(obj, 'value') || has(obj, 'writable')) {
    return false;
  }

  if (!has(obj, 'get') || typeof obj.get !== 'function') {
    return false;
  }

  // tldr: it's valid to have "set" be undefined
  // "set" might be undefined if `Object.getOwnPropertyDescriptor`
  // was used to get the value, and only `get` was defined by the user
  if (has(obj, 'set') && typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
    return false;
  }

  for (var key in obj) {
    if (!accessor.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === accessor[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
}

function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

/**
 * Expose `isAccessorDescriptor`
 */

module.exports = isAccessorDescriptor;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(43);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var typeOf = __webpack_require__(94);

// data descriptor properties
var data = {
  configurable: 'boolean',
  enumerable: 'boolean',
  writable: 'boolean'
};

function isDataDescriptor(obj, prop) {
  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (!('value' in obj) && !('writable' in obj)) {
    return false;
  }

  for (var key in obj) {
    if (key === 'value') continue;

    if (!data.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === data[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
}

/**
 * Expose `isDataDescriptor`
 */

module.exports = isDataDescriptor;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(43);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * static-extend <https://github.com/jonschlinkert/static-extend>
 *
 * Copyright (c) 2016, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var copy = __webpack_require__(96);
var define = __webpack_require__(100);
var util = __webpack_require__(8);

/**
 * Returns a function for extending the static properties,
 * prototype properties, and descriptors from the `Parent`
 * constructor onto `Child` constructors.
 *
 * ```js
 * var extend = require('static-extend');
 * Parent.extend = extend(Parent);
 *
 * // optionally pass a custom merge function as the second arg
 * Parent.extend = extend(Parent, function(Child) {
 *   Child.prototype.mixin = function(key, val) {
 *     Child.prototype[key] = val;
 *   };
 * });
 *
 * // extend "child" constructors
 * Parent.extend(Child);
 *
 * // optionally define prototype methods as the second arg
 * Parent.extend(Child, {
 *   foo: function() {},
 *   bar: function() {}
 * });
 * ```
 * @param {Function} `Parent` Parent ctor
 * @param {Function} `extendFn` Optional extend function for handling any necessary custom merging. Useful when updating methods that require a specific prototype.
 *   @param {Function} `Child` Child ctor
 *   @param {Object} `proto` Optionally pass additional prototype properties to inherit.
 *   @return {Object}
 * @api public
 */

function extend(Parent, extendFn) {
  if (typeof Parent !== 'function') {
    throw new TypeError('expected Parent to be a function.');
  }

  return function(Ctor, proto) {
    if (typeof Ctor !== 'function') {
      throw new TypeError('expected Ctor to be a function.');
    }

    util.inherits(Ctor, Parent);
    copy(Ctor, Parent);

    // proto can be null or a plain object
    if (typeof proto === 'object') {
      var obj = Object.create(proto);

      for (var k in obj) {
        Ctor.prototype[k] = obj[k];
      }
    }

    // keep a reference to the parent prototype
    define(Ctor.prototype, '_parent_', {
      configurable: true,
      set: function() {},
      get: function() {
        return Parent.prototype;
      }
    });

    if (typeof extendFn === 'function') {
      extendFn(Ctor, Parent);
    }

    Ctor.extend = extend(Ctor, extendFn);
  };
};

/**
 * Expose `extend`
 */

module.exports = extend;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var typeOf = __webpack_require__(97);
var copyDescriptor = __webpack_require__(98);
var define = __webpack_require__(99);

/**
 * Copy static properties, prototype properties, and descriptors from one object to another.
 *
 * ```js
 * function App() {}
 * var proto = App.prototype;
 * App.prototype.set = function() {};
 * App.prototype.get = function() {};
 *
 * var obj = {};
 * copy(obj, proto);
 * ```
 * @param {Object} `receiver`
 * @param {Object} `provider`
 * @param {String|Array} `omit` One or more properties to omit
 * @return {Object}
 * @api public
 */

function copy(receiver, provider, omit) {
  if (!isObject(receiver)) {
    throw new TypeError('expected receiving object to be an object.');
  }
  if (!isObject(provider)) {
    throw new TypeError('expected providing object to be an object.');
  }

  var props = nativeKeys(provider);
  var keys = Object.keys(provider);
  var len = props.length;
  omit = arrayify(omit);

  while (len--) {
    var key = props[len];

    if (has(keys, key)) {
      define(receiver, key, provider[key]);
    } else if (!(key in receiver) && !has(omit, key)) {
      copyDescriptor(receiver, provider, key);
    }
  }
};

/**
 * Return true if the given value is an object or function
 */

function isObject(val) {
  return typeOf(val) === 'object' || typeof val === 'function';
}

/**
 * Returns true if an array has any of the given elements, or an
 * object has any of the give keys.
 *
 * ```js
 * has(['a', 'b', 'c'], 'c');
 * //=> true
 *
 * has(['a', 'b', 'c'], ['c', 'z']);
 * //=> true
 *
 * has({a: 'b', c: 'd'}, ['c', 'z']);
 * //=> true
 * ```
 * @param {Object} `obj`
 * @param {String|Array} `val`
 * @return {Boolean}
 */

function has(obj, val) {
  val = arrayify(val);
  var len = val.length;

  if (isObject(obj)) {
    for (var key in obj) {
      if (val.indexOf(key) > -1) {
        return true;
      }
    }

    var keys = nativeKeys(obj);
    return has(keys, val);
  }

  if (Array.isArray(obj)) {
    var arr = obj;
    while (len--) {
      if (arr.indexOf(val[len]) > -1) {
        return true;
      }
    }
    return false;
  }

  throw new TypeError('expected an array or object.');
}

/**
 * Cast the given value to an array.
 *
 * ```js
 * arrayify('foo');
 * //=> ['foo']
 *
 * arrayify(['foo']);
 * //=> ['foo']
 * ```
 *
 * @param {String|Array} `val`
 * @return {Array}
 */

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * Returns true if a value has a `contructor`
 *
 * ```js
 * hasConstructor({});
 * //=> true
 *
 * hasConstructor(Object.create(null));
 * //=> false
 * ```
 * @param  {Object} `value`
 * @return {Boolean}
 */

function hasConstructor(val) {
  return isObject(val) && typeof val.constructor !== 'undefined';
}

/**
 * Get the native `ownPropertyNames` from the constructor of the
 * given `object`. An empty array is returned if the object does
 * not have a constructor.
 *
 * ```js
 * nativeKeys({a: 'b', b: 'c', c: 'd'})
 * //=> ['a', 'b', 'c']
 *
 * nativeKeys(function(){})
 * //=> ['length', 'caller']
 * ```
 *
 * @param  {Object} `obj` Object that has a `constructor`.
 * @return {Array} Array of keys.
 */

function nativeKeys(val) {
  if (!hasConstructor(val)) return [];
  return Object.getOwnPropertyNames(val);
}

/**
 * Expose `copy`
 */

module.exports = copy;

/**
 * Expose `copy.has` for tests
 */

module.exports.has = has;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var isBuffer = __webpack_require__(43);
var toString = Object.prototype.toString;

/**
 * Get the native `typeof` a value.
 *
 * @param  {*} `val`
 * @return {*} Native javascript type
 */

module.exports = function kindOf(val) {
  // primitivies
  if (typeof val === 'undefined') {
    return 'undefined';
  }
  if (val === null) {
    return 'null';
  }
  if (val === true || val === false || val instanceof Boolean) {
    return 'boolean';
  }
  if (typeof val === 'string' || val instanceof String) {
    return 'string';
  }
  if (typeof val === 'number' || val instanceof Number) {
    return 'number';
  }

  // functions
  if (typeof val === 'function' || val instanceof Function) {
    return 'function';
  }

  // array
  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
    return 'array';
  }

  // check for instances of RegExp and Date before calling `toString`
  if (val instanceof RegExp) {
    return 'regexp';
  }
  if (val instanceof Date) {
    return 'date';
  }

  // other objects
  var type = toString.call(val);

  if (type === '[object RegExp]') {
    return 'regexp';
  }
  if (type === '[object Date]') {
    return 'date';
  }
  if (type === '[object Arguments]') {
    return 'arguments';
  }
  if (type === '[object Error]') {
    return 'error';
  }

  // buffer
  if (isBuffer(val)) {
    return 'buffer';
  }

  // es6: Map, WeakMap, Set, WeakSet
  if (type === '[object Set]') {
    return 'set';
  }
  if (type === '[object WeakSet]') {
    return 'weakset';
  }
  if (type === '[object Map]') {
    return 'map';
  }
  if (type === '[object WeakMap]') {
    return 'weakmap';
  }
  if (type === '[object Symbol]') {
    return 'symbol';
  }

  // typed arrays
  if (type === '[object Int8Array]') {
    return 'int8array';
  }
  if (type === '[object Uint8Array]') {
    return 'uint8array';
  }
  if (type === '[object Uint8ClampedArray]') {
    return 'uint8clampedarray';
  }
  if (type === '[object Int16Array]') {
    return 'int16array';
  }
  if (type === '[object Uint16Array]') {
    return 'uint16array';
  }
  if (type === '[object Int32Array]') {
    return 'int32array';
  }
  if (type === '[object Uint32Array]') {
    return 'uint32array';
  }
  if (type === '[object Float32Array]') {
    return 'float32array';
  }
  if (type === '[object Float64Array]') {
    return 'float64array';
  }

  // must be a plain object
  return 'object';
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * copy-descriptor <https://github.com/jonschlinkert/copy-descriptor>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



/**
 * Copy a descriptor from one object to another.
 *
 * ```js
 * function App() {
 *   this.cache = {};
 * }
 * App.prototype.set = function(key, val) {
 *   this.cache[key] = val;
 *   return this;
 * };
 * Object.defineProperty(App.prototype, 'count', {
 *   get: function() {
 *     return Object.keys(this.cache).length;
 *   }
 * });
 *
 * copy(App.prototype, 'count', 'len');
 *
 * // create an instance
 * var app = new App();
 *
 * app.set('a', true);
 * app.set('b', true);
 * app.set('c', true);
 *
 * console.log(app.count);
 * //=> 3
 * console.log(app.len);
 * //=> 3
 * ```
 * @name copy
 * @param {Object} `receiver` The target object
 * @param {Object} `provider` The provider object
 * @param {String} `from` The key to copy on provider.
 * @param {String} `to` Optionally specify a new key name to use.
 * @return {Object}
 * @api public
 */

module.exports = function copyDescriptor(receiver, provider, from, to) {
  if (!isObject(provider) && typeof provider !== 'function') {
    to = from;
    from = provider;
    provider = receiver;
  }
  if (!isObject(receiver) && typeof receiver !== 'function') {
    throw new TypeError('expected the first argument to be an object');
  }
  if (!isObject(provider) && typeof provider !== 'function') {
    throw new TypeError('expected provider to be an object');
  }

  if (typeof to !== 'string') {
    to = from;
  }
  if (typeof from !== 'string') {
    throw new TypeError('expected key to be a string');
  }

  if (!(from in provider)) {
    throw new Error('property "' + from + '" does not exist');
  }

  var val = Object.getOwnPropertyDescriptor(provider, from);
  if (val) Object.defineProperty(receiver, to, val);
};

function isObject(val) {
  return {}.toString.call(val) === '[object Object]';
}



/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isDescriptor = __webpack_require__(89);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isDescriptor = __webpack_require__(89);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isDescriptor = __webpack_require__(89);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

var use = __webpack_require__(103);
var define = __webpack_require__(101);
var debug = __webpack_require__(104)('snapdragon:compiler');
var utils = __webpack_require__(111);

/**
 * Create a new `Compiler` with the given `options`.
 * @param {Object} `options`
 */

function Compiler(options, state) {
  debug('initializing', __filename);
  this.options = utils.extend({source: 'string'}, options);
  this.state = state || {};
  this.compilers = {};
  this.output = '';
  this.set('eos', function(node) {
    return this.emit(node.val, node);
  });
  this.set('noop', function(node) {
    return this.emit(node.val, node);
  });
  this.set('bos', function(node) {
    return this.emit(node.val, node);
  });
  use(this);
}

/**
 * Prototype methods
 */

Compiler.prototype = {

  /**
   * Throw an error message with details including the cursor position.
   * @param {String} `msg` Message to use in the Error.
   */

  error: function(msg, node) {
    var pos = node.position || {start: {column: 0}};
    var message = this.options.source + ' column:' + pos.start.column + ': ' + msg;

    var err = new Error(message);
    err.reason = msg;
    err.column = pos.start.column;
    err.source = this.pattern;

    if (this.options.silent) {
      this.errors.push(err);
    } else {
      throw err;
    }
  },

  /**
   * Define a non-enumberable property on the `Compiler` instance.
   *
   * ```js
   * compiler.define('foo', 'bar');
   * ```
   * @name .define
   * @param {String} `key` propery name
   * @param {any} `val` property value
   * @return {Object} Returns the Compiler instance for chaining.
   * @api public
   */

  define: function(key, val) {
    define(this, key, val);
    return this;
  },

  /**
   * Emit `node.val`
   */

  emit: function(str, node) {
    this.output += str;
    return str;
  },

  /**
   * Add a compiler `fn` with the given `name`
   */

  set: function(name, fn) {
    this.compilers[name] = fn;
    return this;
  },

  /**
   * Get compiler `name`.
   */

  get: function(name) {
    return this.compilers[name];
  },

  /**
   * Get the previous AST node.
   */

  prev: function(n) {
    return this.ast.nodes[this.idx - (n || 1)] || { type: 'bos', val: '' };
  },

  /**
   * Get the next AST node.
   */

  next: function(n) {
    return this.ast.nodes[this.idx + (n || 1)] || { type: 'eos', val: '' };
  },

  /**
   * Visit `node`.
   */

  visit: function(node, nodes, i) {
    var fn = this.compilers[node.type];
    this.idx = i;

    if (typeof fn !== 'function') {
      throw this.error('compiler "' + node.type + '" is not registered', node);
    }
    return fn.call(this, node, nodes, i);
  },

  /**
   * Map visit over array of `nodes`.
   */

  mapVisit: function(nodes) {
    if (!Array.isArray(nodes)) {
      throw new TypeError('expected an array');
    }
    var len = nodes.length;
    var idx = -1;
    while (++idx < len) {
      this.visit(nodes[idx], nodes, idx);
    }
    return this;
  },

  /**
   * Compile `ast`.
   */

  compile: function(ast, options) {
    var opts = utils.extend({}, this.options, options);
    this.ast = ast;
    this.parsingErrors = this.ast.errors;
    this.output = '';

    // source map support
    if (opts.sourcemap) {
      var sourcemaps = __webpack_require__(132);
      sourcemaps(this);
      this.mapVisit(this.ast.nodes);
      this.applySourceMaps();
      this.map = opts.sourcemap === 'generator' ? this.map : this.map.toJSON();
      return this;
    }

    this.mapVisit(this.ast.nodes);
    return this;
  }
};

/**
 * Expose `Compiler`
 */

module.exports = Compiler;

/* WEBPACK VAR INJECTION */}.call(this, "/index.js"))

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * use <https://github.com/jonschlinkert/use>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function base(app, options) {
  if (!isObject(app) && typeof app !== 'function') {
    throw new TypeError('expected an object or function');
  }

  var opts = isObject(options) ? options : {};
  var prop = typeof opts.prop === 'string' ? opts.prop : 'fns';
  if (!Array.isArray(app[prop])) {
    define(app, prop, []);
  }

  /**
   * Define a plugin function to be passed to use. The only
   * parameter exposed to the plugin is `app`, the object or function.
   * passed to `use(app)`. `app` is also exposed as `this` in plugins.
   *
   * Additionally, **if a plugin returns a function, the function will
   * be pushed onto the `fns` array**, allowing the plugin to be
   * called at a later point by the `run` method.
   *
   * ```js
   * var use = require('use');
   *
   * // define a plugin
   * function foo(app) {
   *   // do stuff
   * }
   *
   * var app = function(){};
   * use(app);
   *
   * // register plugins
   * app.use(foo);
   * app.use(bar);
   * app.use(baz);
   * ```
   * @name .use
   * @param {Function} `fn` plugin function to call
   * @api public
   */

  define(app, 'use', use);

  /**
   * Run all plugins on `fns`. Any plugin that returns a function
   * when called by `use` is pushed onto the `fns` array.
   *
   * ```js
   * var config = {};
   * app.run(config);
   * ```
   * @name .run
   * @param {Object} `value` Object to be modified by plugins.
   * @return {Object} Returns the object passed to `run`
   * @api public
   */

  define(app, 'run', function(val) {
    if (!isObject(val)) return;

    if (!val.use || !val.run) {
      define(val, prop, val[prop] || []);
      define(val, 'use', use);
    }

    if (!val[prop] || val[prop].indexOf(base) === -1) {
      val.use(base);
    }

    var self = this || app;
    var fns = self[prop];
    var len = fns.length;
    var idx = -1;

    while (++idx < len) {
      val.use(fns[idx]);
    }
    return val;
  });

  /**
   * Call plugin `fn`. If a function is returned push it into the
   * `fns` array to be called by the `run` method.
   */

  function use(type, fn, options) {
    var offset = 1;

    if (typeof type === 'string' || Array.isArray(type)) {
      fn = wrap(type, fn);
      offset++;
    } else {
      options = fn;
      fn = type;
    }

    if (typeof fn !== 'function') {
      throw new TypeError('expected a function');
    }

    var self = this || app;
    var fns = self[prop];

    var args = [].slice.call(arguments, offset);
    args.unshift(self);

    if (typeof opts.hook === 'function') {
      opts.hook.apply(self, args);
    }

    var val = fn.apply(self, args);
    if (typeof val === 'function' && fns.indexOf(val) === -1) {
      fns.push(val);
    }
    return self;
  }

  /**
   * Wrap a named plugin function so that it's only called on objects of the
   * given `type`
   *
   * @param {String} `type`
   * @param {Function} `fn` Plugin function
   * @return {Function}
   */

  function wrap(type, fn) {
    return function plugin() {
      return this.type === type ? fn.apply(this, arguments) : plugin;
    };
  }

  return app;
};

function isObject(val) {
  return val && typeof val === 'object' && !Array.isArray(val);
}

function define(obj, key, val) {
  Object.defineProperty(obj, key, {
    configurable: true,
    writable: true,
    value: val
  });
}


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Detect Electron renderer process, which is node, but we should
 * treat as a browser.
 */

if (typeof process !== 'undefined' && process.type === 'renderer') {
  module.exports = __webpack_require__(105);
} else {
  module.exports = __webpack_require__(108);
}


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * This is the web browser implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(106);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
                  ? chrome.storage.local
                  : localstorage();

/**
 * Colors.
 */

exports.colors = [
  'lightseagreen',
  'forestgreen',
  'goldenrod',
  'dodgerblue',
  'darkorchid',
  'crimson'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

function useColors() {
  // NB: In an Electron preload script, document will be defined but not fully
  // initialized. Since we know we're in Chrome, we'll just detect this case
  // explicitly
  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
    return true;
  }

  // is webkit? http://stackoverflow.com/a/16459606/376773
  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
    // is firebug? http://stackoverflow.com/a/398120/376773
    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
    // is firefox >= v31?
    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
    // double check webkit in userAgent just in case we are in a worker
    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

exports.formatters.j = function(v) {
  try {
    return JSON.stringify(v);
  } catch (err) {
    return '[UnexpectedJSONParseError]: ' + err.message;
  }
};


/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var useColors = this.useColors;

  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? ' %c' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);

  if (!useColors) return;

  var c = 'color: ' + this.color;
  args.splice(1, 0, c, 'color: inherit')

  // the final "%c" is somewhat tricky, because there could be other
  // arguments passed either before or after the %c, so we need to
  // figure out the correct index to insert the CSS into
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-zA-Z%]/g, function(match) {
    if ('%%' === match) return;
    index++;
    if ('%c' === match) {
      // we only are interested in the *last* %c
      // (the user may have provided their own)
      lastC = index;
    }
  });

  args.splice(lastC, 0, c);
}

/**
 * Invokes `console.log()` when available.
 * No-op when `console.log` is not a "function".
 *
 * @api public
 */

function log() {
  // this hackery is required for IE8/9, where
  // the `console.log` function doesn't have 'apply'
  return 'object' === typeof console
    && console.log
    && Function.prototype.apply.call(console.log, console, arguments);
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}

  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
  if (!r && typeof process !== 'undefined' && 'env' in process) {
    r = process.env.DEBUG;
  }

  return r;
}

/**
 * Enable namespaces listed in `localStorage.debug` initially.
 */

exports.enable(load());

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
  try {
    return window.localStorage;
  } catch (e) {}
}


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(107);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
 */

exports.formatters = {};

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 * @param {String} namespace
 * @return {Number}
 * @api private
 */

function selectColor(namespace) {
  var hash = 0, i;

  for (i in namespace) {
    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  return exports.colors[Math.abs(hash) % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function createDebug(namespace) {

  function debug() {
    // disabled?
    if (!debug.enabled) return;

    var self = debug;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // turn the `arguments` into a proper Array
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %O
      args.unshift('%O');
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    // apply env-specific formatting (colors, etc.)
    exports.formatArgs.call(self, args);

    var logFn = debug.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }

  debug.namespace = namespace;
  debug.enabled = exports.enabled(namespace);
  debug.useColors = exports.useColors();
  debug.color = selectColor(namespace);

  // env-specific initialization logic for debug instances
  if ('function' === typeof exports.init) {
    exports.init(debug);
  }

  return debug;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  exports.names = [];
  exports.skips = [];

  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 107 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isNaN(val) === false) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  if (ms >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (ms >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (ms >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (ms >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  return plural(ms, d, 'day') ||
    plural(ms, h, 'hour') ||
    plural(ms, m, 'minute') ||
    plural(ms, s, 'second') ||
    ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) {
    return;
  }
  if (ms < n * 1.5) {
    return Math.floor(ms / n) + ' ' + name;
  }
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var tty = __webpack_require__(109);
var util = __webpack_require__(8);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(106);
exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(function (key) {
  return /^debug_/i.test(key);
}).reduce(function (obj, key) {
  // camel-case
  var prop = key
    .substring(6)
    .toLowerCase()
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

  // coerce string value into JS value
  var val = process.env[key];
  if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
  else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
  else if (val === 'null') val = null;
  else val = Number(val);

  obj[prop] = val;
  return obj;
}, {});

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

if (1 !== fd && 2 !== fd) {
  util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')()
}

var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  return 'colors' in exports.inspectOpts
    ? Boolean(exports.inspectOpts.colors)
    : tty.isatty(fd);
}

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

exports.formatters.o = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts)
    .split('\n').map(function(str) {
      return str.trim()
    }).join(' ');
};

/**
 * Map %o to `util.inspect()`, allowing multiple lines if needed.
 */

exports.formatters.O = function(v) {
  this.inspectOpts.colors = this.useColors;
  return util.inspect(v, this.inspectOpts);
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
  var name = this.namespace;
  var useColors = this.useColors;

  if (useColors) {
    var c = this.color;
    var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

    args[0] = prefix + args[0].split('\n').join('\n' + prefix);
    args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
}

/**
 * Invokes `util.format()` with the specified arguments and writes to `stream`.
 */

function log() {
  return stream.write(util.format.apply(util, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(4);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(110);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init (debug) {
  debug.inspectOpts = {};

  var keys = Object.keys(exports.inspectOpts);
  for (var i = 0; i < keys.length; i++) {
    debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
  }
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */

exports.extend = __webpack_require__(112);
exports.SourceMap = __webpack_require__(113);
exports.sourceMapResolve = __webpack_require__(124);

/**
 * Convert backslash in the given string to forward slashes
 */

exports.unixify = function(fp) {
  return fp.split(/\\+/).join('/');
};

/**
 * Return true if `val` is a non-empty string
 *
 * @param {String} `str`
 * @return {Boolean}
 */

exports.isString = function(str) {
  return str && typeof str === 'string';
};

/**
 * Cast `val` to an array
 * @return {Array}
 */

exports.arrayify = function(val) {
  if (typeof val === 'string') return [val];
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Get the last `n` element from the given `array`
 * @param {Array} `array`
 * @return {*}
 */

exports.last = function(arr, n) {
  return arr[arr.length - (n || 1)];
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(35);

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
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(114).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(120).SourceMapConsumer;
exports.SourceNode = __webpack_require__(123).SourceNode;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(115);
var util = __webpack_require__(117);
var ArraySet = __webpack_require__(118).ArraySet;
var MappingList = __webpack_require__(119).MappingList;

/**
 * An instance of the SourceMapGenerator represents a source map which is
 * being built incrementally. You may pass an object with the following
 * properties:
 *
 *   - file: The filename of the generated source.
 *   - sourceRoot: A root for all relative URLs in this source map.
 */
function SourceMapGenerator(aArgs) {
  if (!aArgs) {
    aArgs = {};
  }
  this._file = util.getArg(aArgs, 'file', null);
  this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
  this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
  this._sources = new ArraySet();
  this._names = new ArraySet();
  this._mappings = new MappingList();
  this._sourcesContents = null;
}

SourceMapGenerator.prototype._version = 3;

/**
 * Creates a new SourceMapGenerator based on a SourceMapConsumer
 *
 * @param aSourceMapConsumer The SourceMap.
 */
SourceMapGenerator.fromSourceMap =
  function SourceMapGenerator_fromSourceMap(aSourceMapConsumer) {
    var sourceRoot = aSourceMapConsumer.sourceRoot;
    var generator = new SourceMapGenerator({
      file: aSourceMapConsumer.file,
      sourceRoot: sourceRoot
    });
    aSourceMapConsumer.eachMapping(function (mapping) {
      var newMapping = {
        generated: {
          line: mapping.generatedLine,
          column: mapping.generatedColumn
        }
      };

      if (mapping.source != null) {
        newMapping.source = mapping.source;
        if (sourceRoot != null) {
          newMapping.source = util.relative(sourceRoot, newMapping.source);
        }

        newMapping.original = {
          line: mapping.originalLine,
          column: mapping.originalColumn
        };

        if (mapping.name != null) {
          newMapping.name = mapping.name;
        }
      }

      generator.addMapping(newMapping);
    });
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        generator.setSourceContent(sourceFile, content);
      }
    });
    return generator;
  };

/**
 * Add a single mapping from original source line and column to the generated
 * source's line and column for this source map being created. The mapping
 * object should have the following properties:
 *
 *   - generated: An object with the generated line and column positions.
 *   - original: An object with the original line and column positions.
 *   - source: The original source file (relative to the sourceRoot).
 *   - name: An optional original token name for this mapping.
 */
SourceMapGenerator.prototype.addMapping =
  function SourceMapGenerator_addMapping(aArgs) {
    var generated = util.getArg(aArgs, 'generated');
    var original = util.getArg(aArgs, 'original', null);
    var source = util.getArg(aArgs, 'source', null);
    var name = util.getArg(aArgs, 'name', null);

    if (!this._skipValidation) {
      this._validateMapping(generated, original, source, name);
    }

    if (source != null) {
      source = String(source);
      if (!this._sources.has(source)) {
        this._sources.add(source);
      }
    }

    if (name != null) {
      name = String(name);
      if (!this._names.has(name)) {
        this._names.add(name);
      }
    }

    this._mappings.add({
      generatedLine: generated.line,
      generatedColumn: generated.column,
      originalLine: original != null && original.line,
      originalColumn: original != null && original.column,
      source: source,
      name: name
    });
  };

/**
 * Set the source content for a source file.
 */
SourceMapGenerator.prototype.setSourceContent =
  function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
    var source = aSourceFile;
    if (this._sourceRoot != null) {
      source = util.relative(this._sourceRoot, source);
    }

    if (aSourceContent != null) {
      // Add the source content to the _sourcesContents map.
      // Create a new _sourcesContents map if the property is null.
      if (!this._sourcesContents) {
        this._sourcesContents = Object.create(null);
      }
      this._sourcesContents[util.toSetString(source)] = aSourceContent;
    } else if (this._sourcesContents) {
      // Remove the source file from the _sourcesContents map.
      // If the _sourcesContents map is empty, set the property to null.
      delete this._sourcesContents[util.toSetString(source)];
      if (Object.keys(this._sourcesContents).length === 0) {
        this._sourcesContents = null;
      }
    }
  };

/**
 * Applies the mappings of a sub-source-map for a specific source file to the
 * source map being generated. Each mapping to the supplied source file is
 * rewritten using the supplied source map. Note: The resolution for the
 * resulting mappings is the minimium of this map and the supplied map.
 *
 * @param aSourceMapConsumer The source map to be applied.
 * @param aSourceFile Optional. The filename of the source file.
 *        If omitted, SourceMapConsumer's file property will be used.
 * @param aSourceMapPath Optional. The dirname of the path to the source map
 *        to be applied. If relative, it is relative to the SourceMapConsumer.
 *        This parameter is needed when the two source maps aren't in the same
 *        directory, and the source map to be applied contains relative source
 *        paths. If so, those relative source paths need to be rewritten
 *        relative to the SourceMapGenerator.
 */
SourceMapGenerator.prototype.applySourceMap =
  function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
    var sourceFile = aSourceFile;
    // If aSourceFile is omitted, we will use the file property of the SourceMap
    if (aSourceFile == null) {
      if (aSourceMapConsumer.file == null) {
        throw new Error(
          'SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' +
          'or the source map\'s "file" property. Both were omitted.'
        );
      }
      sourceFile = aSourceMapConsumer.file;
    }
    var sourceRoot = this._sourceRoot;
    // Make "sourceFile" relative if an absolute Url is passed.
    if (sourceRoot != null) {
      sourceFile = util.relative(sourceRoot, sourceFile);
    }
    // Applying the SourceMap can add and remove items from the sources and
    // the names array.
    var newSources = new ArraySet();
    var newNames = new ArraySet();

    // Find mappings for the "sourceFile"
    this._mappings.unsortedForEach(function (mapping) {
      if (mapping.source === sourceFile && mapping.originalLine != null) {
        // Check if it can be mapped by the source map, then update the mapping.
        var original = aSourceMapConsumer.originalPositionFor({
          line: mapping.originalLine,
          column: mapping.originalColumn
        });
        if (original.source != null) {
          // Copy mapping
          mapping.source = original.source;
          if (aSourceMapPath != null) {
            mapping.source = util.join(aSourceMapPath, mapping.source)
          }
          if (sourceRoot != null) {
            mapping.source = util.relative(sourceRoot, mapping.source);
          }
          mapping.originalLine = original.line;
          mapping.originalColumn = original.column;
          if (original.name != null) {
            mapping.name = original.name;
          }
        }
      }

      var source = mapping.source;
      if (source != null && !newSources.has(source)) {
        newSources.add(source);
      }

      var name = mapping.name;
      if (name != null && !newNames.has(name)) {
        newNames.add(name);
      }

    }, this);
    this._sources = newSources;
    this._names = newNames;

    // Copy sourcesContents of applied map.
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aSourceMapPath != null) {
          sourceFile = util.join(aSourceMapPath, sourceFile);
        }
        if (sourceRoot != null) {
          sourceFile = util.relative(sourceRoot, sourceFile);
        }
        this.setSourceContent(sourceFile, content);
      }
    }, this);
  };

/**
 * A mapping can have one of the three levels of data:
 *
 *   1. Just the generated position.
 *   2. The Generated position, original position, and original source.
 *   3. Generated and original position, original source, as well as a name
 *      token.
 *
 * To maintain consistency, we validate that any new mapping being added falls
 * in to one of these categories.
 */
SourceMapGenerator.prototype._validateMapping =
  function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource,
                                              aName) {
    // When aOriginal is truthy but has empty values for .line and .column,
    // it is most likely a programmer error. In this case we throw a very
    // specific error message to try to guide them the right way.
    // For example: https://github.com/Polymer/polymer-bundler/pull/519
    if (aOriginal && typeof aOriginal.line !== 'number' && typeof aOriginal.column !== 'number') {
        throw new Error(
            'original.line and original.column are not numbers -- you probably meant to omit ' +
            'the original mapping entirely and only map the generated position. If so, pass ' +
            'null for the original mapping instead of an object with empty or null values.'
        );
    }

    if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
        && aGenerated.line > 0 && aGenerated.column >= 0
        && !aOriginal && !aSource && !aName) {
      // Case 1.
      return;
    }
    else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated
             && aOriginal && 'line' in aOriginal && 'column' in aOriginal
             && aGenerated.line > 0 && aGenerated.column >= 0
             && aOriginal.line > 0 && aOriginal.column >= 0
             && aSource) {
      // Cases 2 and 3.
      return;
    }
    else {
      throw new Error('Invalid mapping: ' + JSON.stringify({
        generated: aGenerated,
        source: aSource,
        original: aOriginal,
        name: aName
      }));
    }
  };

/**
 * Serialize the accumulated mappings in to the stream of base 64 VLQs
 * specified by the source map format.
 */
SourceMapGenerator.prototype._serializeMappings =
  function SourceMapGenerator_serializeMappings() {
    var previousGeneratedColumn = 0;
    var previousGeneratedLine = 1;
    var previousOriginalColumn = 0;
    var previousOriginalLine = 0;
    var previousName = 0;
    var previousSource = 0;
    var result = '';
    var next;
    var mapping;
    var nameIdx;
    var sourceIdx;

    var mappings = this._mappings.toArray();
    for (var i = 0, len = mappings.length; i < len; i++) {
      mapping = mappings[i];
      next = ''

      if (mapping.generatedLine !== previousGeneratedLine) {
        previousGeneratedColumn = 0;
        while (mapping.generatedLine !== previousGeneratedLine) {
          next += ';';
          previousGeneratedLine++;
        }
      }
      else {
        if (i > 0) {
          if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) {
            continue;
          }
          next += ',';
        }
      }

      next += base64VLQ.encode(mapping.generatedColumn
                                 - previousGeneratedColumn);
      previousGeneratedColumn = mapping.generatedColumn;

      if (mapping.source != null) {
        sourceIdx = this._sources.indexOf(mapping.source);
        next += base64VLQ.encode(sourceIdx - previousSource);
        previousSource = sourceIdx;

        // lines are stored 0-based in SourceMap spec version 3
        next += base64VLQ.encode(mapping.originalLine - 1
                                   - previousOriginalLine);
        previousOriginalLine = mapping.originalLine - 1;

        next += base64VLQ.encode(mapping.originalColumn
                                   - previousOriginalColumn);
        previousOriginalColumn = mapping.originalColumn;

        if (mapping.name != null) {
          nameIdx = this._names.indexOf(mapping.name);
          next += base64VLQ.encode(nameIdx - previousName);
          previousName = nameIdx;
        }
      }

      result += next;
    }

    return result;
  };

SourceMapGenerator.prototype._generateSourcesContent =
  function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
    return aSources.map(function (source) {
      if (!this._sourcesContents) {
        return null;
      }
      if (aSourceRoot != null) {
        source = util.relative(aSourceRoot, source);
      }
      var key = util.toSetString(source);
      return Object.prototype.hasOwnProperty.call(this._sourcesContents, key)
        ? this._sourcesContents[key]
        : null;
    }, this);
  };

/**
 * Externalize the source map.
 */
SourceMapGenerator.prototype.toJSON =
  function SourceMapGenerator_toJSON() {
    var map = {
      version: this._version,
      sources: this._sources.toArray(),
      names: this._names.toArray(),
      mappings: this._serializeMappings()
    };
    if (this._file != null) {
      map.file = this._file;
    }
    if (this._sourceRoot != null) {
      map.sourceRoot = this._sourceRoot;
    }
    if (this._sourcesContents) {
      map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
    }

    return map;
  };

/**
 * Render the source map being generated to a string.
 */
SourceMapGenerator.prototype.toString =
  function SourceMapGenerator_toString() {
    return JSON.stringify(this.toJSON());
  };

exports.SourceMapGenerator = SourceMapGenerator;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 *
 * Based on the Base 64 VLQ implementation in Closure Compiler:
 * https://code.google.com/p/closure-compiler/source/browse/trunk/src/com/google/debugging/sourcemap/Base64VLQ.java
 *
 * Copyright 2011 The Closure Compiler Authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *  * Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above
 *    copyright notice, this list of conditions and the following
 *    disclaimer in the documentation and/or other materials provided
 *    with the distribution.
 *  * Neither the name of Google Inc. nor the names of its
 *    contributors may be used to endorse or promote products derived
 *    from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

var base64 = __webpack_require__(116);

// A single base 64 digit can contain 6 bits of data. For the base 64 variable
// length quantities we use in the source map spec, the first bit is the sign,
// the next four bits are the actual value, and the 6th bit is the
// continuation bit. The continuation bit tells us whether there are more
// digits in this value following this digit.
//
//   Continuation
//   |    Sign
//   |    |
//   V    V
//   101011

var VLQ_BASE_SHIFT = 5;

// binary: 100000
var VLQ_BASE = 1 << VLQ_BASE_SHIFT;

// binary: 011111
var VLQ_BASE_MASK = VLQ_BASE - 1;

// binary: 100000
var VLQ_CONTINUATION_BIT = VLQ_BASE;

/**
 * Converts from a two-complement value to a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
 *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
 */
function toVLQSigned(aValue) {
  return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
}

/**
 * Converts to a two-complement value from a value where the sign bit is
 * placed in the least significant bit.  For example, as decimals:
 *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
 *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
 */
function fromVLQSigned(aValue) {
  var isNegative = (aValue & 1) === 1;
  var shifted = aValue >> 1;
  return isNegative
    ? -shifted
    : shifted;
}

/**
 * Returns the base 64 VLQ encoded value.
 */
exports.encode = function base64VLQ_encode(aValue) {
  var encoded = "";
  var digit;

  var vlq = toVLQSigned(aValue);

  do {
    digit = vlq & VLQ_BASE_MASK;
    vlq >>>= VLQ_BASE_SHIFT;
    if (vlq > 0) {
      // There are still more digits in this value, so we must make sure the
      // continuation bit is marked.
      digit |= VLQ_CONTINUATION_BIT;
    }
    encoded += base64.encode(digit);
  } while (vlq > 0);

  return encoded;
};

/**
 * Decodes the next base 64 VLQ value from the given string and returns the
 * value and the rest of the string via the out parameter.
 */
exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
  var strLen = aStr.length;
  var result = 0;
  var shift = 0;
  var continuation, digit;

  do {
    if (aIndex >= strLen) {
      throw new Error("Expected more digits in base 64 VLQ value.");
    }

    digit = base64.decode(aStr.charCodeAt(aIndex++));
    if (digit === -1) {
      throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
    }

    continuation = !!(digit & VLQ_CONTINUATION_BIT);
    digit &= VLQ_BASE_MASK;
    result = result + (digit << shift);
    shift += VLQ_BASE_SHIFT;
  } while (continuation);

  aOutParam.value = fromVLQSigned(result);
  aOutParam.rest = aIndex;
};


/***/ }),
/* 116 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');

/**
 * Encode an integer in the range of 0 to 63 to a single base 64 digit.
 */
exports.encode = function (number) {
  if (0 <= number && number < intToCharMap.length) {
    return intToCharMap[number];
  }
  throw new TypeError("Must be between 0 and 63: " + number);
};

/**
 * Decode a single base 64 character code digit to an integer. Returns -1 on
 * failure.
 */
exports.decode = function (charCode) {
  var bigA = 65;     // 'A'
  var bigZ = 90;     // 'Z'

  var littleA = 97;  // 'a'
  var littleZ = 122; // 'z'

  var zero = 48;     // '0'
  var nine = 57;     // '9'

  var plus = 43;     // '+'
  var slash = 47;    // '/'

  var littleOffset = 26;
  var numberOffset = 52;

  // 0 - 25: ABCDEFGHIJKLMNOPQRSTUVWXYZ
  if (bigA <= charCode && charCode <= bigZ) {
    return (charCode - bigA);
  }

  // 26 - 51: abcdefghijklmnopqrstuvwxyz
  if (littleA <= charCode && charCode <= littleZ) {
    return (charCode - littleA + littleOffset);
  }

  // 52 - 61: 0123456789
  if (zero <= charCode && charCode <= nine) {
    return (charCode - zero + numberOffset);
  }

  // 62: +
  if (charCode == plus) {
    return 62;
  }

  // 63: /
  if (charCode == slash) {
    return 63;
  }

  // Invalid base64 digit.
  return -1;
};


/***/ }),
/* 117 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * This is a helper function for getting values from parameter/options
 * objects.
 *
 * @param args The object we are extracting values from
 * @param name The name of the property we are getting.
 * @param defaultValue An optional value to return if the property is missing
 * from the object. If this is not specified and the property is missing, an
 * error will be thrown.
 */
function getArg(aArgs, aName, aDefaultValue) {
  if (aName in aArgs) {
    return aArgs[aName];
  } else if (arguments.length === 3) {
    return aDefaultValue;
  } else {
    throw new Error('"' + aName + '" is a required argument.');
  }
}
exports.getArg = getArg;

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
var dataUrlRegexp = /^data:.+\,.+$/;

function urlParse(aUrl) {
  var match = aUrl.match(urlRegexp);
  if (!match) {
    return null;
  }
  return {
    scheme: match[1],
    auth: match[2],
    host: match[3],
    port: match[4],
    path: match[5]
  };
}
exports.urlParse = urlParse;

function urlGenerate(aParsedUrl) {
  var url = '';
  if (aParsedUrl.scheme) {
    url += aParsedUrl.scheme + ':';
  }
  url += '//';
  if (aParsedUrl.auth) {
    url += aParsedUrl.auth + '@';
  }
  if (aParsedUrl.host) {
    url += aParsedUrl.host;
  }
  if (aParsedUrl.port) {
    url += ":" + aParsedUrl.port
  }
  if (aParsedUrl.path) {
    url += aParsedUrl.path;
  }
  return url;
}
exports.urlGenerate = urlGenerate;

/**
 * Normalizes a path, or the path portion of a URL:
 *
 * - Replaces consecutive slashes with one slash.
 * - Removes unnecessary '.' parts.
 * - Removes unnecessary '<dir>/..' parts.
 *
 * Based on code in the Node.js 'path' core module.
 *
 * @param aPath The path or url to normalize.
 */
function normalize(aPath) {
  var path = aPath;
  var url = urlParse(aPath);
  if (url) {
    if (!url.path) {
      return aPath;
    }
    path = url.path;
  }
  var isAbsolute = exports.isAbsolute(path);

  var parts = path.split(/\/+/);
  for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
    part = parts[i];
    if (part === '.') {
      parts.splice(i, 1);
    } else if (part === '..') {
      up++;
    } else if (up > 0) {
      if (part === '') {
        // The first part is blank if the path is absolute. Trying to go
        // above the root is a no-op. Therefore we can remove all '..' parts
        // directly after the root.
        parts.splice(i + 1, up);
        up = 0;
      } else {
        parts.splice(i, 2);
        up--;
      }
    }
  }
  path = parts.join('/');

  if (path === '') {
    path = isAbsolute ? '/' : '.';
  }

  if (url) {
    url.path = path;
    return urlGenerate(url);
  }
  return path;
}
exports.normalize = normalize;

/**
 * Joins two paths/URLs.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be joined with the root.
 *
 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
 *   first.
 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
 *   is updated with the result and aRoot is returned. Otherwise the result
 *   is returned.
 *   - If aPath is absolute, the result is aPath.
 *   - Otherwise the two paths are joined with a slash.
 * - Joining for example 'http://' and 'www.example.com' is also supported.
 */
function join(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }
  if (aPath === "") {
    aPath = ".";
  }
  var aPathUrl = urlParse(aPath);
  var aRootUrl = urlParse(aRoot);
  if (aRootUrl) {
    aRoot = aRootUrl.path || '/';
  }

  // `join(foo, '//www.example.org')`
  if (aPathUrl && !aPathUrl.scheme) {
    if (aRootUrl) {
      aPathUrl.scheme = aRootUrl.scheme;
    }
    return urlGenerate(aPathUrl);
  }

  if (aPathUrl || aPath.match(dataUrlRegexp)) {
    return aPath;
  }

  // `join('http://', 'www.example.com')`
  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
    aRootUrl.host = aPath;
    return urlGenerate(aRootUrl);
  }

  var joined = aPath.charAt(0) === '/'
    ? aPath
    : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

  if (aRootUrl) {
    aRootUrl.path = joined;
    return urlGenerate(aRootUrl);
  }
  return joined;
}
exports.join = join;

exports.isAbsolute = function (aPath) {
  return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
};

/**
 * Make a path relative to a URL or another path.
 *
 * @param aRoot The root path or URL.
 * @param aPath The path or URL to be made relative to aRoot.
 */
function relative(aRoot, aPath) {
  if (aRoot === "") {
    aRoot = ".";
  }

  aRoot = aRoot.replace(/\/$/, '');

  // It is possible for the path to be above the root. In this case, simply
  // checking whether the root is a prefix of the path won't work. Instead, we
  // need to remove components from the root one by one, until either we find
  // a prefix that fits, or we run out of components to remove.
  var level = 0;
  while (aPath.indexOf(aRoot + '/') !== 0) {
    var index = aRoot.lastIndexOf("/");
    if (index < 0) {
      return aPath;
    }

    // If the only part of the root that is left is the scheme (i.e. http://,
    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
    // have exhausted all components, so the path is not relative to the root.
    aRoot = aRoot.slice(0, index);
    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
      return aPath;
    }

    ++level;
  }

  // Make sure we add a "../" for each component we removed from the root.
  return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
}
exports.relative = relative;

var supportsNullProto = (function () {
  var obj = Object.create(null);
  return !('__proto__' in obj);
}());

function identity (s) {
  return s;
}

/**
 * Because behavior goes wacky when you set `__proto__` on objects, we
 * have to prefix all the strings in our set with an arbitrary character.
 *
 * See https://github.com/mozilla/source-map/pull/31 and
 * https://github.com/mozilla/source-map/issues/30
 *
 * @param String aStr
 */
function toSetString(aStr) {
  if (isProtoString(aStr)) {
    return '$' + aStr;
  }

  return aStr;
}
exports.toSetString = supportsNullProto ? identity : toSetString;

function fromSetString(aStr) {
  if (isProtoString(aStr)) {
    return aStr.slice(1);
  }

  return aStr;
}
exports.fromSetString = supportsNullProto ? identity : fromSetString;

function isProtoString(s) {
  if (!s) {
    return false;
  }

  var length = s.length;

  if (length < 9 /* "__proto__".length */) {
    return false;
  }

  if (s.charCodeAt(length - 1) !== 95  /* '_' */ ||
      s.charCodeAt(length - 2) !== 95  /* '_' */ ||
      s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 4) !== 116 /* 't' */ ||
      s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
      s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
      s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
      s.charCodeAt(length - 8) !== 95  /* '_' */ ||
      s.charCodeAt(length - 9) !== 95  /* '_' */) {
    return false;
  }

  for (var i = length - 10; i >= 0; i--) {
    if (s.charCodeAt(i) !== 36 /* '$' */) {
      return false;
    }
  }

  return true;
}

/**
 * Comparator between two mappings where the original positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same original source/line/column, but different generated
 * line and column the same. Useful when searching for a mapping with a
 * stubbed out mapping.
 */
function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
  var cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0 || onlyCompareOriginal) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByOriginalPositions = compareByOriginalPositions;

/**
 * Comparator between two mappings with deflated source and name indices where
 * the generated positions are compared.
 *
 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
 * mappings with the same generated line and column, but different
 * source/name/original line and column the same. Useful when searching for a
 * mapping with a stubbed out mapping.
 */
function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0 || onlyCompareGenerated) {
    return cmp;
  }

  cmp = mappingA.source - mappingB.source;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return mappingA.name - mappingB.name;
}
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 > aStr2) {
    return 1;
  }

  return -1;
}

/**
 * Comparator between two mappings with inflated source and name strings where
 * the generated positions are compared.
 */
function compareByGeneratedPositionsInflated(mappingA, mappingB) {
  var cmp = mappingA.generatedLine - mappingB.generatedLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = strcmp(mappingA.source, mappingB.source);
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalLine - mappingB.originalLine;
  if (cmp !== 0) {
    return cmp;
  }

  cmp = mappingA.originalColumn - mappingB.originalColumn;
  if (cmp !== 0) {
    return cmp;
  }

  return strcmp(mappingA.name, mappingB.name);
}
exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(117);
var has = Object.prototype.hasOwnProperty;
var hasNativeMap = typeof Map !== "undefined";

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
function ArraySet() {
  this._array = [];
  this._set = hasNativeMap ? new Map() : Object.create(null);
}

/**
 * Static method for creating ArraySet instances from an existing array.
 */
ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
  var set = new ArraySet();
  for (var i = 0, len = aArray.length; i < len; i++) {
    set.add(aArray[i], aAllowDuplicates);
  }
  return set;
};

/**
 * Return how many unique items are in this ArraySet. If duplicates have been
 * added, than those do not count towards the size.
 *
 * @returns Number
 */
ArraySet.prototype.size = function ArraySet_size() {
  return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
};

/**
 * Add the given string to this set.
 *
 * @param String aStr
 */
ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
  var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
  var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
  var idx = this._array.length;
  if (!isDuplicate || aAllowDuplicates) {
    this._array.push(aStr);
  }
  if (!isDuplicate) {
    if (hasNativeMap) {
      this._set.set(aStr, idx);
    } else {
      this._set[sStr] = idx;
    }
  }
};

/**
 * Is the given string a member of this set?
 *
 * @param String aStr
 */
ArraySet.prototype.has = function ArraySet_has(aStr) {
  if (hasNativeMap) {
    return this._set.has(aStr);
  } else {
    var sStr = util.toSetString(aStr);
    return has.call(this._set, sStr);
  }
};

/**
 * What is the index of the given string in the array?
 *
 * @param String aStr
 */
ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
  if (hasNativeMap) {
    var idx = this._set.get(aStr);
    if (idx >= 0) {
        return idx;
    }
  } else {
    var sStr = util.toSetString(aStr);
    if (has.call(this._set, sStr)) {
      return this._set[sStr];
    }
  }

  throw new Error('"' + aStr + '" is not in the set.');
};

/**
 * What is the element at the given index?
 *
 * @param Number aIdx
 */
ArraySet.prototype.at = function ArraySet_at(aIdx) {
  if (aIdx >= 0 && aIdx < this._array.length) {
    return this._array[aIdx];
  }
  throw new Error('No element indexed by ' + aIdx);
};

/**
 * Returns the array representation of this set (which has the proper indices
 * indicated by indexOf). Note that this is a copy of the internal array used
 * for storing the members so that no one can mess with internal state.
 */
ArraySet.prototype.toArray = function ArraySet_toArray() {
  return this._array.slice();
};

exports.ArraySet = ArraySet;


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(117);

/**
 * Determine whether mappingB is after mappingA with respect to generated
 * position.
 */
function generatedPositionAfter(mappingA, mappingB) {
  // Optimized for most common case
  var lineA = mappingA.generatedLine;
  var lineB = mappingB.generatedLine;
  var columnA = mappingA.generatedColumn;
  var columnB = mappingB.generatedColumn;
  return lineB > lineA || lineB == lineA && columnB >= columnA ||
         util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
}

/**
 * A data structure to provide a sorted view of accumulated mappings in a
 * performance conscious manner. It trades a neglibable overhead in general
 * case for a large speedup in case of mappings being added in order.
 */
function MappingList() {
  this._array = [];
  this._sorted = true;
  // Serves as infimum
  this._last = {generatedLine: -1, generatedColumn: 0};
}

/**
 * Iterate through internal items. This method takes the same arguments that
 * `Array.prototype.forEach` takes.
 *
 * NOTE: The order of the mappings is NOT guaranteed.
 */
MappingList.prototype.unsortedForEach =
  function MappingList_forEach(aCallback, aThisArg) {
    this._array.forEach(aCallback, aThisArg);
  };

/**
 * Add the given source mapping.
 *
 * @param Object aMapping
 */
MappingList.prototype.add = function MappingList_add(aMapping) {
  if (generatedPositionAfter(this._last, aMapping)) {
    this._last = aMapping;
    this._array.push(aMapping);
  } else {
    this._sorted = false;
    this._array.push(aMapping);
  }
};

/**
 * Returns the flat, sorted array of mappings. The mappings are sorted by
 * generated position.
 *
 * WARNING: This method returns internal data without copying, for
 * performance. The return value must NOT be mutated, and should be treated as
 * an immutable borrow. If you want to take ownership, you must make your own
 * copy.
 */
MappingList.prototype.toArray = function MappingList_toArray() {
  if (!this._sorted) {
    this._array.sort(util.compareByGeneratedPositionsInflated);
    this._sorted = true;
  }
  return this._array;
};

exports.MappingList = MappingList;


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(117);
var binarySearch = __webpack_require__(121);
var ArraySet = __webpack_require__(118).ArraySet;
var base64VLQ = __webpack_require__(115);
var quickSort = __webpack_require__(122).quickSort;

function SourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap)
    : new BasicSourceMapConsumer(sourceMap);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
}

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer.prototype._version = 3;

// `__generatedMappings` and `__originalMappings` are arrays that hold the
// parsed mapping coordinates from the source map's "mappings" attribute. They
// are lazily instantiated, accessed via the `_generatedMappings` and
// `_originalMappings` getters respectively, and we only parse the mappings
// and create these arrays once queried for a source location. We jump through
// these hoops because there can be many thousands of mappings, and parsing
// them is expensive, so we only want to do it if we must.
//
// Each object in the arrays is of the form:
//
//     {
//       generatedLine: The line number in the generated code,
//       generatedColumn: The column number in the generated code,
//       source: The path to the original source file that generated this
//               chunk of code,
//       originalLine: The line number in the original source that
//                     corresponds to this chunk of generated code,
//       originalColumn: The column number in the original source that
//                       corresponds to this chunk of generated code,
//       name: The name of the original symbol which generated this chunk of
//             code.
//     }
//
// All properties except for `generatedLine` and `generatedColumn` can be
// `null`.
//
// `_generatedMappings` is ordered by the generated positions.
//
// `_originalMappings` is ordered by the original positions.

SourceMapConsumer.prototype.__generatedMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  get: function () {
    if (!this.__originalMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappings;
  }
});

SourceMapConsumer.prototype._charIsMappingSeparator =
  function SourceMapConsumer_charIsMappingSeparator(aStr, index) {
    var c = aStr.charAt(index);
    return c === ";" || c === ",";
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
SourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    throw new Error("Subclasses must implement _parseMappings");
  };

SourceMapConsumer.GENERATED_ORDER = 1;
SourceMapConsumer.ORIGINAL_ORDER = 2;

SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer.LEAST_UPPER_BOUND = 2;

/**
 * Iterate over each mapping between an original source/line/column and a
 * generated line/column in this source map.
 *
 * @param Function aCallback
 *        The function that is called with each mapping.
 * @param Object aContext
 *        Optional. If specified, this object will be the value of `this` every
 *        time that `aCallback` is called.
 * @param aOrder
 *        Either `SourceMapConsumer.GENERATED_ORDER` or
 *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
 *        iterate over the mappings sorted by the generated file's line/column
 *        order or the original's source/line/column order, respectively. Defaults to
 *        `SourceMapConsumer.GENERATED_ORDER`.
 */
SourceMapConsumer.prototype.eachMapping =
  function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder) {
    var context = aContext || null;
    var order = aOrder || SourceMapConsumer.GENERATED_ORDER;

    var mappings;
    switch (order) {
    case SourceMapConsumer.GENERATED_ORDER:
      mappings = this._generatedMappings;
      break;
    case SourceMapConsumer.ORIGINAL_ORDER:
      mappings = this._originalMappings;
      break;
    default:
      throw new Error("Unknown order of iteration.");
    }

    var sourceRoot = this.sourceRoot;
    mappings.map(function (mapping) {
      var source = mapping.source === null ? null : this._sources.at(mapping.source);
      if (source != null && sourceRoot != null) {
        source = util.join(sourceRoot, source);
      }
      return {
        source: source,
        generatedLine: mapping.generatedLine,
        generatedColumn: mapping.generatedColumn,
        originalLine: mapping.originalLine,
        originalColumn: mapping.originalColumn,
        name: mapping.name === null ? null : this._names.at(mapping.name)
      };
    }, this).forEach(aCallback, context);
  };

/**
 * Returns all generated line and column information for the original source,
 * line, and column provided. If no column is provided, returns all mappings
 * corresponding to a either the line we are searching for or the next
 * closest line that has any mappings. Otherwise, returns all mappings
 * corresponding to the given line and either the column we are searching for
 * or the next closest column that has any offsets.
 *
 * The only argument is an object with the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: Optional. the column number in the original source.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
SourceMapConsumer.prototype.allGeneratedPositionsFor =
  function SourceMapConsumer_allGeneratedPositionsFor(aArgs) {
    var line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    var needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0)
    };

    if (this.sourceRoot != null) {
      needle.source = util.relative(this.sourceRoot, needle.source);
    }
    if (!this._sources.has(needle.source)) {
      return [];
    }
    needle.source = this._sources.indexOf(needle.source);

    var mappings = [];

    var index = this._findMapping(needle,
                                  this._originalMappings,
                                  "originalLine",
                                  "originalColumn",
                                  util.compareByOriginalPositions,
                                  binarySearch.LEAST_UPPER_BOUND);
    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        var originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        var originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (mapping &&
               mapping.originalLine === line &&
               mapping.originalColumn == originalColumn) {
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings;
  };

exports.SourceMapConsumer = SourceMapConsumer;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The only parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referrenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sources = util.getArg(sourceMap, 'sources');
  // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
  // requires the array) to play nice here.
  var names = util.getArg(sourceMap, 'names', []);
  var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
  var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
  var mappings = util.getArg(sourceMap, 'mappings');
  var file = util.getArg(sourceMap, 'file', null);

  // Once again, Sass deviates from the spec and supplies the version as a
  // string rather than a number, so we use loose equality checking here.
  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  sources = sources
    .map(String)
    // Some source maps produce relative source paths like "./foo.js" instead of
    // "foo.js".  Normalize these first so that future comparisons will succeed.
    // See bugzil.la/1090768.
    .map(util.normalize)
    // Always ensure that absolute sources are internally stored relative to
    // the source root, if the source root is absolute. Not doing this would
    // be particularly problematic when the source root is a prefix of the
    // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
    .map(function (source) {
      return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source)
        ? util.relative(sourceRoot, source)
        : source;
    });

  // Pass `true` below to allow duplicate names and sources. While source maps
  // are intended to be compressed and deduplicated, the TypeScript compiler
  // sometimes generates source maps with duplicates in them. See Github issue
  // #72 and bugzil.la/889492.
  this._names = ArraySet.fromArray(names.map(String), true);
  this._sources = ArraySet.fromArray(sources, true);

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;

    // Because we are modifying the entries (by converting string sources and
    // names to indices into the sources and names ArraySets), we have to make
    // a copy of the entry or else bad things happen. Shared mutable state
    // strikes again! See github issue #191.

    var generatedMappings = aSourceMap._mappings.toArray().slice();
    var destGeneratedMappings = smc.__generatedMappings = [];
    var destOriginalMappings = smc.__originalMappings = [];

    for (var i = 0, length = generatedMappings.length; i < length; i++) {
      var srcMapping = generatedMappings[i];
      var destMapping = new Mapping;
      destMapping.generatedLine = srcMapping.generatedLine;
      destMapping.generatedColumn = srcMapping.generatedColumn;

      if (srcMapping.source) {
        destMapping.source = sources.indexOf(srcMapping.source);
        destMapping.originalLine = srcMapping.originalLine;
        destMapping.originalColumn = srcMapping.originalColumn;

        if (srcMapping.name) {
          destMapping.name = names.indexOf(srcMapping.name);
        }

        destOriginalMappings.push(destMapping);
      }

      destGeneratedMappings.push(destMapping);
    }

    quickSort(smc.__originalMappings, util.compareByOriginalPositions);

    return smc;
  };

/**
 * The version of the source mapping spec that we are consuming.
 */
BasicSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {
  get: function () {
    return this._sources.toArray().map(function (s) {
      return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
    }, this);
  }
});

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
BasicSourceMapConsumer.prototype._parseMappings =
  function SourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    var generatedLine = 1;
    var previousGeneratedColumn = 0;
    var previousOriginalLine = 0;
    var previousOriginalColumn = 0;
    var previousSource = 0;
    var previousName = 0;
    var length = aStr.length;
    var index = 0;
    var cachedSegments = {};
    var temp = {};
    var originalMappings = [];
    var generatedMappings = [];
    var mapping, str, segment, end, value;

    while (index < length) {
      if (aStr.charAt(index) === ';') {
        generatedLine++;
        index++;
        previousGeneratedColumn = 0;
      }
      else if (aStr.charAt(index) === ',') {
        index++;
      }
      else {
        mapping = new Mapping();
        mapping.generatedLine = generatedLine;

        // Because each offset is encoded relative to the previous one,
        // many segments often have the same encoding. We can exploit this
        // fact by caching the parsed variable length fields of each segment,
        // allowing us to avoid a second parse if we encounter the same
        // segment again.
        for (end = index; end < length; end++) {
          if (this._charIsMappingSeparator(aStr, end)) {
            break;
          }
        }
        str = aStr.slice(index, end);

        segment = cachedSegments[str];
        if (segment) {
          index += str.length;
        } else {
          segment = [];
          while (index < end) {
            base64VLQ.decode(aStr, index, temp);
            value = temp.value;
            index = temp.rest;
            segment.push(value);
          }

          if (segment.length === 2) {
            throw new Error('Found a source, but no line and column');
          }

          if (segment.length === 3) {
            throw new Error('Found a source and line, but no column');
          }

          cachedSegments[str] = segment;
        }

        // Generated column.
        mapping.generatedColumn = previousGeneratedColumn + segment[0];
        previousGeneratedColumn = mapping.generatedColumn;

        if (segment.length > 1) {
          // Original source.
          mapping.source = previousSource + segment[1];
          previousSource += segment[1];

          // Original line.
          mapping.originalLine = previousOriginalLine + segment[2];
          previousOriginalLine = mapping.originalLine;
          // Lines are stored 0-based
          mapping.originalLine += 1;

          // Original column.
          mapping.originalColumn = previousOriginalColumn + segment[3];
          previousOriginalColumn = mapping.originalColumn;

          if (segment.length > 4) {
            // Original name.
            mapping.name = previousName + segment[4];
            previousName += segment[4];
          }
        }

        generatedMappings.push(mapping);
        if (typeof mapping.originalLine === 'number') {
          originalMappings.push(mapping);
        }
      }
    }

    quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = generatedMappings;

    quickSort(originalMappings, util.compareByOriginalPositions);
    this.__originalMappings = originalMappings;
  };

/**
 * Find the mapping that best matches the hypothetical "needle" mapping that
 * we are searching for in the given "haystack" of mappings.
 */
BasicSourceMapConsumer.prototype._findMapping =
  function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName,
                                         aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError('Line must be greater than or equal to 1, got '
                          + aNeedle[aLineName]);
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError('Column must be greater than or equal to 0, got '
                          + aNeedle[aColumnName]);
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
  };

/**
 * Compute the last column for each generated mapping. The last column is
 * inclusive.
 */
BasicSourceMapConsumer.prototype.computeColumnSpans =
  function SourceMapConsumer_computeColumnSpans() {
    for (var index = 0; index < this._generatedMappings.length; ++index) {
      var mapping = this._generatedMappings[index];

      // Mappings do not contain a field for the last generated columnt. We
      // can come up with an optimistic estimate, however, by assuming that
      // mappings are contiguous (i.e. given two consecutive mappings, the
      // first mapping ends where the second one starts).
      if (index + 1 < this._generatedMappings.length) {
        var nextMapping = this._generatedMappings[index + 1];

        if (mapping.generatedLine === nextMapping.generatedLine) {
          mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
          continue;
        }
      }

      // The last mapping for each line spans the entire line.
      mapping.lastGeneratedColumn = Infinity;
    }
  };

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
BasicSourceMapConsumer.prototype.originalPositionFor =
  function SourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._generatedMappings,
      "generatedLine",
      "generatedColumn",
      util.compareByGeneratedPositionsDeflated,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._generatedMappings[index];

      if (mapping.generatedLine === needle.generatedLine) {
        var source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          if (this.sourceRoot != null) {
            source = util.join(this.sourceRoot, source);
          }
        }
        var name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }
        return {
          source: source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name: name
        };
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null
    };
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
BasicSourceMapConsumer.prototype.hasContentsOfAllSources =
  function BasicSourceMapConsumer_hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false;
    }
    return this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) { return sc == null; });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
BasicSourceMapConsumer.prototype.sourceContentFor =
  function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null;
    }

    if (this.sourceRoot != null) {
      aSource = util.relative(this.sourceRoot, aSource);
    }

    if (this._sources.has(aSource)) {
      return this.sourcesContent[this._sources.indexOf(aSource)];
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + aSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    if (this.sourceRoot != null) {
      source = util.relative(this.sourceRoot, source);
    }
    if (!this._sources.has(source)) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }
    source = this._sources.indexOf(source);

    var needle = {
      source: source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column')
    };

    var index = this._findMapping(
      needle,
      this._originalMappings,
      "originalLine",
      "originalColumn",
      util.compareByOriginalPositions,
      util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND)
    );

    if (index >= 0) {
      var mapping = this._originalMappings[index];

      if (mapping.source === needle.source) {
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)
        };
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null
    };
  };

exports.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The only parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
  }

  var version = util.getArg(sourceMap, 'version');
  var sections = util.getArg(sourceMap, 'sections');

  if (version != this._version) {
    throw new Error('Unsupported version: ' + version);
  }

  this._sources = new ArraySet();
  this._names = new ArraySet();

  var lastOffset = {
    line: -1,
    column: 0
  };
  this._sections = sections.map(function (s) {
    if (s.url) {
      // The url field will require support for asynchronicity.
      // See https://github.com/mozilla/source-map/issues/16
      throw new Error('Support for url field in sections not implemented.');
    }
    var offset = util.getArg(s, 'offset');
    var offsetLine = util.getArg(offset, 'line');
    var offsetColumn = util.getArg(offset, 'column');

    if (offsetLine < lastOffset.line ||
        (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)) {
      throw new Error('Section offsets must be ordered and non-overlapping.');
    }
    lastOffset = offset;

    return {
      generatedOffset: {
        // The offset fields are 0-based, but we use 1-based indices when
        // encoding/decoding from VLQ.
        generatedLine: offsetLine + 1,
        generatedColumn: offsetColumn + 1
      },
      consumer: new SourceMapConsumer(util.getArg(s, 'map'))
    }
  });
}

IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;

/**
 * The version of the source mapping spec that we are consuming.
 */
IndexedSourceMapConsumer.prototype._version = 3;

/**
 * The list of original sources.
 */
Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {
  get: function () {
    var sources = [];
    for (var i = 0; i < this._sections.length; i++) {
      for (var j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources;
  }
});

/**
 * Returns the original source, line, and column information for the generated
 * source's line and column positions provided. The only argument is an object
 * with the following properties:
 *
 *   - line: The line number in the generated source.
 *   - column: The column number in the generated source.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.
 *   - column: The column number in the original source, or null.
 *   - name: The original identifier, or null.
 */
IndexedSourceMapConsumer.prototype.originalPositionFor =
  function IndexedSourceMapConsumer_originalPositionFor(aArgs) {
    var needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column')
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    var sectionIndex = binarySearch.search(needle, this._sections,
      function(needle, section) {
        var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp;
        }

        return (needle.generatedColumn -
                section.generatedOffset.generatedColumn);
      });
    var section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine -
        (section.generatedOffset.generatedLine - 1),
      column: needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
         ? section.generatedOffset.generatedColumn - 1
         : 0),
      bias: aArgs.bias
    });
  };

/**
 * Return true if we have the source content for every source in the source
 * map, false otherwise.
 */
IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =
  function IndexedSourceMapConsumer_hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources();
    });
  };

/**
 * Returns the original source content. The only argument is the url of the
 * original source file. Returns null if no original source content is
 * available.
 */
IndexedSourceMapConsumer.prototype.sourceContentFor =
  function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      var content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content;
      }
    }
    if (nullOnMissing) {
      return null;
    }
    else {
      throw new Error('"' + aSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.
 *   - column: The column number in the original source.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.
 *   - column: The column number in the generated source, or null.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1) {
        continue;
      }
      var generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        var ret = {
          line: generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column: generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
             ? section.generatedOffset.generatedColumn - 1
             : 0)
        };
        return ret;
      }
    }

    return {
      line: null,
      column: null
    };
  };

/**
 * Parse the mappings in a string in to a data structure which we can easily
 * query (the ordered arrays in the `this.__generatedMappings` and
 * `this.__originalMappings` properties).
 */
IndexedSourceMapConsumer.prototype._parseMappings =
  function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot) {
    this.__generatedMappings = [];
    this.__originalMappings = [];
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];
      var sectionMappings = section.consumer._generatedMappings;
      for (var j = 0; j < sectionMappings.length; j++) {
        var mapping = sectionMappings[j];

        var source = section.consumer._sources.at(mapping.source);
        if (section.consumer.sourceRoot !== null) {
          source = util.join(section.consumer.sourceRoot, source);
        }
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = section.consumer._names.at(mapping.name);
        this._names.add(name);
        name = this._names.indexOf(name);

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        var adjustedMapping = {
          source: source,
          generatedLine: mapping.generatedLine +
            (section.generatedOffset.generatedLine - 1),
          generatedColumn: mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
            ? section.generatedOffset.generatedColumn - 1
            : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: name
        };

        this.__generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          this.__originalMappings.push(adjustedMapping);
        }
      }
    }

    quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
    quickSort(this.__originalMappings, util.compareByOriginalPositions);
  };

exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;


/***/ }),
/* 121 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

exports.GREATEST_LOWER_BOUND = 1;
exports.LEAST_UPPER_BOUND = 2;

/**
 * Recursive implementation of binary search.
 *
 * @param aLow Indices here and lower do not contain the needle.
 * @param aHigh Indices here and higher do not contain the needle.
 * @param aNeedle The element being searched for.
 * @param aHaystack The non-empty array being searched.
 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 */
function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
  // This function terminates when one of the following is true:
  //
  //   1. We find the exact element we are looking for.
  //
  //   2. We did not find the exact element, but we can return the index of
  //      the next-closest element.
  //
  //   3. We did not find the exact element, and there is no next-closest
  //      element than the one we are searching for, so we return -1.
  var mid = Math.floor((aHigh - aLow) / 2) + aLow;
  var cmp = aCompare(aNeedle, aHaystack[mid], true);
  if (cmp === 0) {
    // Found the element we are looking for.
    return mid;
  }
  else if (cmp > 0) {
    // Our needle is greater than aHaystack[mid].
    if (aHigh - mid > 1) {
      // The element is in the upper half.
      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
    }

    // The exact needle element was not found in this haystack. Determine if
    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return aHigh < aHaystack.length ? aHigh : -1;
    } else {
      return mid;
    }
  }
  else {
    // Our needle is less than aHaystack[mid].
    if (mid - aLow > 1) {
      // The element is in the lower half.
      return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
    }

    // we are in termination case (3) or (2) and return the appropriate thing.
    if (aBias == exports.LEAST_UPPER_BOUND) {
      return mid;
    } else {
      return aLow < 0 ? -1 : aLow;
    }
  }
}

/**
 * This is an implementation of binary search which will always try and return
 * the index of the closest element if there is no exact hit. This is because
 * mappings between original and generated line/col pairs are single points,
 * and there is an implicit region between each of them, so a miss just means
 * that you aren't on the very start of a region.
 *
 * @param aNeedle The element you are looking for.
 * @param aHaystack The array that is being searched.
 * @param aCompare A function which takes the needle and an element in the
 *     array and returns -1, 0, or 1 depending on whether the needle is less
 *     than, equal to, or greater than the element, respectively.
 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
 */
exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
  if (aHaystack.length === 0) {
    return -1;
  }

  var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack,
                              aCompare, aBias || exports.GREATEST_LOWER_BOUND);
  if (index < 0) {
    return -1;
  }

  // We have found either the exact element, or the next-closest element than
  // the one we are searching for. However, there may be more than one such
  // element. Make sure we always return the smallest of these.
  while (index - 1 >= 0) {
    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
      break;
    }
    --index;
  }

  return index;
};


/***/ }),
/* 122 */
/***/ (function(module, exports) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

// It turns out that some (most?) JavaScript engines don't self-host
// `Array.prototype.sort`. This makes sense because C++ will likely remain
// faster than JS when doing raw CPU-intensive sorting. However, when using a
// custom comparator function, calling back and forth between the VM's C++ and
// JIT'd JS is rather slow *and* loses JIT type information, resulting in
// worse generated code for the comparator function than would be optimal. In
// fact, when sorting with a comparator, these costs outweigh the benefits of
// sorting in C++. By using our own JS-implemented Quick Sort (below), we get
// a ~3500ms mean speed-up in `bench/bench.html`.

/**
 * Swap the elements indexed by `x` and `y` in the array `ary`.
 *
 * @param {Array} ary
 *        The array.
 * @param {Number} x
 *        The index of the first item.
 * @param {Number} y
 *        The index of the second item.
 */
function swap(ary, x, y) {
  var temp = ary[x];
  ary[x] = ary[y];
  ary[y] = temp;
}

/**
 * Returns a random integer within the range `low .. high` inclusive.
 *
 * @param {Number} low
 *        The lower bound on the range.
 * @param {Number} high
 *        The upper bound on the range.
 */
function randomIntInRange(low, high) {
  return Math.round(low + (Math.random() * (high - low)));
}

/**
 * The Quick Sort algorithm.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 * @param {Number} p
 *        Start index of the array
 * @param {Number} r
 *        End index of the array
 */
function doQuickSort(ary, comparator, p, r) {
  // If our lower bound is less than our upper bound, we (1) partition the
  // array into two pieces and (2) recurse on each half. If it is not, this is
  // the empty array and our base case.

  if (p < r) {
    // (1) Partitioning.
    //
    // The partitioning chooses a pivot between `p` and `r` and moves all
    // elements that are less than or equal to the pivot to the before it, and
    // all the elements that are greater than it after it. The effect is that
    // once partition is done, the pivot is in the exact place it will be when
    // the array is put in sorted order, and it will not need to be moved
    // again. This runs in O(n) time.

    // Always choose a random pivot so that an input array which is reverse
    // sorted does not cause O(n^2) running time.
    var pivotIndex = randomIntInRange(p, r);
    var i = p - 1;

    swap(ary, pivotIndex, r);
    var pivot = ary[r];

    // Immediately after `j` is incremented in this loop, the following hold
    // true:
    //
    //   * Every element in `ary[p .. i]` is less than or equal to the pivot.
    //
    //   * Every element in `ary[i+1 .. j-1]` is greater than the pivot.
    for (var j = p; j < r; j++) {
      if (comparator(ary[j], pivot) <= 0) {
        i += 1;
        swap(ary, i, j);
      }
    }

    swap(ary, i + 1, j);
    var q = i + 1;

    // (2) Recurse on each half.

    doQuickSort(ary, comparator, p, q - 1);
    doQuickSort(ary, comparator, q + 1, r);
  }
}

/**
 * Sort the given array in-place with the given comparator function.
 *
 * @param {Array} ary
 *        An array to sort.
 * @param {function} comparator
 *        Function to use to compare two items.
 */
exports.quickSort = function (ary, comparator) {
  doQuickSort(ary, comparator, 0, ary.length - 1);
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(114).SourceMapGenerator;
var util = __webpack_require__(117);

// Matches a Windows-style `\r\n` newline or a `\n` newline used by all other
// operating systems these days (capturing the result).
var REGEX_NEWLINE = /(\r?\n)/;

// Newline character code for charCodeAt() comparisons
var NEWLINE_CODE = 10;

// Private symbol for identifying `SourceNode`s when multiple versions of
// the source-map library are loaded. This MUST NOT CHANGE across
// versions!
var isSourceNode = "$$$isSourceNode$$$";

/**
 * SourceNodes provide a way to abstract over interpolating/concatenating
 * snippets of generated JavaScript source code while maintaining the line and
 * column information associated with the original source code.
 *
 * @param aLine The original line number.
 * @param aColumn The original column number.
 * @param aSource The original source's filename.
 * @param aChunks Optional. An array of strings which are snippets of
 *        generated JS, or other SourceNodes.
 * @param aName The original identifier.
 */
function SourceNode(aLine, aColumn, aSource, aChunks, aName) {
  this.children = [];
  this.sourceContents = {};
  this.line = aLine == null ? null : aLine;
  this.column = aColumn == null ? null : aColumn;
  this.source = aSource == null ? null : aSource;
  this.name = aName == null ? null : aName;
  this[isSourceNode] = true;
  if (aChunks != null) this.add(aChunks);
}

/**
 * Creates a SourceNode from generated code and a SourceMapConsumer.
 *
 * @param aGeneratedCode The generated code
 * @param aSourceMapConsumer The SourceMap for the generated code
 * @param aRelativePath Optional. The path that relative sources in the
 *        SourceMapConsumer should be relative to.
 */
SourceNode.fromStringWithSourceMap =
  function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath) {
    // The SourceNode we want to fill with the generated code
    // and the SourceMap
    var node = new SourceNode();

    // All even indices of this array are one line of the generated code,
    // while all odd indices are the newlines between two adjacent lines
    // (since `REGEX_NEWLINE` captures its match).
    // Processed fragments are accessed by calling `shiftNextLine`.
    var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
    var remainingLinesIndex = 0;
    var shiftNextLine = function() {
      var lineContents = getNextLine();
      // The last line of a file might not have a newline.
      var newLine = getNextLine() || "";
      return lineContents + newLine;

      function getNextLine() {
        return remainingLinesIndex < remainingLines.length ?
            remainingLines[remainingLinesIndex++] : undefined;
      }
    };

    // We need to remember the position of "remainingLines"
    var lastGeneratedLine = 1, lastGeneratedColumn = 0;

    // The generate SourceNodes we need a code range.
    // To extract it current and last mapping is used.
    // Here we store the last mapping.
    var lastMapping = null;

    aSourceMapConsumer.eachMapping(function (mapping) {
      if (lastMapping !== null) {
        // We add the code from "lastMapping" to "mapping":
        // First check if there is a new line in between.
        if (lastGeneratedLine < mapping.generatedLine) {
          // Associate first line with "lastMapping"
          addMappingWithCode(lastMapping, shiftNextLine());
          lastGeneratedLine++;
          lastGeneratedColumn = 0;
          // The remaining code is added without mapping
        } else {
          // There is no new line in between.
          // Associate the code between "lastGeneratedColumn" and
          // "mapping.generatedColumn" with "lastMapping"
          var nextLine = remainingLines[remainingLinesIndex];
          var code = nextLine.substr(0, mapping.generatedColumn -
                                        lastGeneratedColumn);
          remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn -
                                              lastGeneratedColumn);
          lastGeneratedColumn = mapping.generatedColumn;
          addMappingWithCode(lastMapping, code);
          // No more remaining code, continue
          lastMapping = mapping;
          return;
        }
      }
      // We add the generated code until the first mapping
      // to the SourceNode without any mapping.
      // Each line is added as separate string.
      while (lastGeneratedLine < mapping.generatedLine) {
        node.add(shiftNextLine());
        lastGeneratedLine++;
      }
      if (lastGeneratedColumn < mapping.generatedColumn) {
        var nextLine = remainingLines[remainingLinesIndex];
        node.add(nextLine.substr(0, mapping.generatedColumn));
        remainingLines[remainingLinesIndex] = nextLine.substr(mapping.generatedColumn);
        lastGeneratedColumn = mapping.generatedColumn;
      }
      lastMapping = mapping;
    }, this);
    // We have processed all mappings.
    if (remainingLinesIndex < remainingLines.length) {
      if (lastMapping) {
        // Associate the remaining code in the current line with "lastMapping"
        addMappingWithCode(lastMapping, shiftNextLine());
      }
      // and add the remaining lines without any mapping
      node.add(remainingLines.splice(remainingLinesIndex).join(""));
    }

    // Copy sourcesContent into SourceNode
    aSourceMapConsumer.sources.forEach(function (sourceFile) {
      var content = aSourceMapConsumer.sourceContentFor(sourceFile);
      if (content != null) {
        if (aRelativePath != null) {
          sourceFile = util.join(aRelativePath, sourceFile);
        }
        node.setSourceContent(sourceFile, content);
      }
    });

    return node;

    function addMappingWithCode(mapping, code) {
      if (mapping === null || mapping.source === undefined) {
        node.add(code);
      } else {
        var source = aRelativePath
          ? util.join(aRelativePath, mapping.source)
          : mapping.source;
        node.add(new SourceNode(mapping.originalLine,
                                mapping.originalColumn,
                                source,
                                code,
                                mapping.name));
      }
    }
  };

/**
 * Add a chunk of generated JS to this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.add = function SourceNode_add(aChunk) {
  if (Array.isArray(aChunk)) {
    aChunk.forEach(function (chunk) {
      this.add(chunk);
    }, this);
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    if (aChunk) {
      this.children.push(aChunk);
    }
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Add a chunk of generated JS to the beginning of this source node.
 *
 * @param aChunk A string snippet of generated JS code, another instance of
 *        SourceNode, or an array where each member is one of those things.
 */
SourceNode.prototype.prepend = function SourceNode_prepend(aChunk) {
  if (Array.isArray(aChunk)) {
    for (var i = aChunk.length-1; i >= 0; i--) {
      this.prepend(aChunk[i]);
    }
  }
  else if (aChunk[isSourceNode] || typeof aChunk === "string") {
    this.children.unshift(aChunk);
  }
  else {
    throw new TypeError(
      "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk
    );
  }
  return this;
};

/**
 * Walk over the tree of JS snippets in this node and its children. The
 * walking function is called once for each snippet of JS and is passed that
 * snippet and the its original associated source's line/column location.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walk = function SourceNode_walk(aFn) {
  var chunk;
  for (var i = 0, len = this.children.length; i < len; i++) {
    chunk = this.children[i];
    if (chunk[isSourceNode]) {
      chunk.walk(aFn);
    }
    else {
      if (chunk !== '') {
        aFn(chunk, { source: this.source,
                     line: this.line,
                     column: this.column,
                     name: this.name });
      }
    }
  }
};

/**
 * Like `String.prototype.join` except for SourceNodes. Inserts `aStr` between
 * each of `this.children`.
 *
 * @param aSep The separator.
 */
SourceNode.prototype.join = function SourceNode_join(aSep) {
  var newChildren;
  var i;
  var len = this.children.length;
  if (len > 0) {
    newChildren = [];
    for (i = 0; i < len-1; i++) {
      newChildren.push(this.children[i]);
      newChildren.push(aSep);
    }
    newChildren.push(this.children[i]);
    this.children = newChildren;
  }
  return this;
};

/**
 * Call String.prototype.replace on the very right-most source snippet. Useful
 * for trimming whitespace from the end of a source node, etc.
 *
 * @param aPattern The pattern to replace.
 * @param aReplacement The thing to replace the pattern with.
 */
SourceNode.prototype.replaceRight = function SourceNode_replaceRight(aPattern, aReplacement) {
  var lastChild = this.children[this.children.length - 1];
  if (lastChild[isSourceNode]) {
    lastChild.replaceRight(aPattern, aReplacement);
  }
  else if (typeof lastChild === 'string') {
    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
  }
  else {
    this.children.push(''.replace(aPattern, aReplacement));
  }
  return this;
};

/**
 * Set the source content for a source file. This will be added to the SourceMapGenerator
 * in the sourcesContent field.
 *
 * @param aSourceFile The filename of the source file
 * @param aSourceContent The content of the source file
 */
SourceNode.prototype.setSourceContent =
  function SourceNode_setSourceContent(aSourceFile, aSourceContent) {
    this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
  };

/**
 * Walk over the tree of SourceNodes. The walking function is called for each
 * source file content and is passed the filename and source content.
 *
 * @param aFn The traversal function.
 */
SourceNode.prototype.walkSourceContents =
  function SourceNode_walkSourceContents(aFn) {
    for (var i = 0, len = this.children.length; i < len; i++) {
      if (this.children[i][isSourceNode]) {
        this.children[i].walkSourceContents(aFn);
      }
    }

    var sources = Object.keys(this.sourceContents);
    for (var i = 0, len = sources.length; i < len; i++) {
      aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
    }
  };

/**
 * Return the string representation of this source node. Walks over the tree
 * and concatenates all the various snippets together to one string.
 */
SourceNode.prototype.toString = function SourceNode_toString() {
  var str = "";
  this.walk(function (chunk) {
    str += chunk;
  });
  return str;
};

/**
 * Returns the string representation of this source node along with a source
 * map.
 */
SourceNode.prototype.toStringWithSourceMap = function SourceNode_toStringWithSourceMap(aArgs) {
  var generated = {
    code: "",
    line: 1,
    column: 0
  };
  var map = new SourceMapGenerator(aArgs);
  var sourceMappingActive = false;
  var lastOriginalSource = null;
  var lastOriginalLine = null;
  var lastOriginalColumn = null;
  var lastOriginalName = null;
  this.walk(function (chunk, original) {
    generated.code += chunk;
    if (original.source !== null
        && original.line !== null
        && original.column !== null) {
      if(lastOriginalSource !== original.source
         || lastOriginalLine !== original.line
         || lastOriginalColumn !== original.column
         || lastOriginalName !== original.name) {
        map.addMapping({
          source: original.source,
          original: {
            line: original.line,
            column: original.column
          },
          generated: {
            line: generated.line,
            column: generated.column
          },
          name: original.name
        });
      }
      lastOriginalSource = original.source;
      lastOriginalLine = original.line;
      lastOriginalColumn = original.column;
      lastOriginalName = original.name;
      sourceMappingActive = true;
    } else if (sourceMappingActive) {
      map.addMapping({
        generated: {
          line: generated.line,
          column: generated.column
        }
      });
      lastOriginalSource = null;
      sourceMappingActive = false;
    }
    for (var idx = 0, length = chunk.length; idx < length; idx++) {
      if (chunk.charCodeAt(idx) === NEWLINE_CODE) {
        generated.line++;
        generated.column = 0;
        // Mappings end at eol
        if (idx + 1 === length) {
          lastOriginalSource = null;
          sourceMappingActive = false;
        } else if (sourceMappingActive) {
          map.addMapping({
            source: original.source,
            original: {
              line: original.line,
              column: original.column
            },
            generated: {
              line: generated.line,
              column: generated.column
            },
            name: original.name
          });
        }
      } else {
        generated.column++;
      }
    }
  });
  this.walkSourceContents(function (sourceFile, sourceContent) {
    map.setSourceContent(sourceFile, sourceContent);
  });

  return { code: generated.code, map: map };
};

exports.SourceNode = SourceNode;


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2014, 2015, 2016, 2017 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var sourceMappingURL   = __webpack_require__(125)
var resolveUrl         = __webpack_require__(126)
var decodeUriComponent = __webpack_require__(128)
var urix               = __webpack_require__(130)
var atob               = __webpack_require__(131)



function callbackAsync(callback, error, result) {
  setImmediate(function() { callback(error, result) })
}

function parseMapToJSON(string, data) {
  try {
    return JSON.parse(string.replace(/^\)\]\}'/, ""))
  } catch (error) {
    error.sourceMapData = data
    throw error
  }
}

function readSync(read, url, data) {
  var readUrl = decodeUriComponent(url)
  try {
    return String(read(readUrl))
  } catch (error) {
    error.sourceMapData = data
    throw error
  }
}



function resolveSourceMap(code, codeUrl, read, callback) {
  var mapData
  try {
    mapData = resolveSourceMapHelper(code, codeUrl)
  } catch (error) {
    return callbackAsync(callback, error)
  }
  if (!mapData || mapData.map) {
    return callbackAsync(callback, null, mapData)
  }
  var readUrl = decodeUriComponent(mapData.url)
  read(readUrl, function(error, result) {
    if (error) {
      error.sourceMapData = mapData
      return callback(error)
    }
    mapData.map = String(result)
    try {
      mapData.map = parseMapToJSON(mapData.map, mapData)
    } catch (error) {
      return callback(error)
    }
    callback(null, mapData)
  })
}

function resolveSourceMapSync(code, codeUrl, read) {
  var mapData = resolveSourceMapHelper(code, codeUrl)
  if (!mapData || mapData.map) {
    return mapData
  }
  mapData.map = readSync(read, mapData.url, mapData)
  mapData.map = parseMapToJSON(mapData.map, mapData)
  return mapData
}

var dataUriRegex = /^data:([^,;]*)(;[^,;]*)*(?:,(.*))?$/
var jsonMimeTypeRegex = /^(?:application|text)\/json$/

function resolveSourceMapHelper(code, codeUrl) {
  codeUrl = urix(codeUrl)

  var url = sourceMappingURL.getFrom(code)
  if (!url) {
    return null
  }

  var dataUri = url.match(dataUriRegex)
  if (dataUri) {
    var mimeType = dataUri[1]
    var lastParameter = dataUri[2] || ""
    var encoded = dataUri[3] || ""
    var data = {
      sourceMappingURL: url,
      url: null,
      sourcesRelativeTo: codeUrl,
      map: encoded
    }
    if (!jsonMimeTypeRegex.test(mimeType)) {
      var error = new Error("Unuseful data uri mime type: " + (mimeType || "text/plain"))
      error.sourceMapData = data
      throw error
    }
    data.map = parseMapToJSON(
      lastParameter === ";base64" ? atob(encoded) : decodeURIComponent(encoded),
      data
    )
    return data
  }

  var mapUrl = resolveUrl(codeUrl, url)
  return {
    sourceMappingURL: url,
    url: mapUrl,
    sourcesRelativeTo: mapUrl,
    map: null
  }
}



function resolveSources(map, mapUrl, read, options, callback) {
  if (typeof options === "function") {
    callback = options
    options = {}
  }
  var pending = map.sources ? map.sources.length : 0
  var result = {
    sourcesResolved: [],
    sourcesContent:  []
  }

  if (pending === 0) {
    callbackAsync(callback, null, result)
    return
  }

  var done = function() {
    pending--
    if (pending === 0) {
      callback(null, result)
    }
  }

  resolveSourcesHelper(map, mapUrl, options, function(fullUrl, sourceContent, index) {
    result.sourcesResolved[index] = fullUrl
    if (typeof sourceContent === "string") {
      result.sourcesContent[index] = sourceContent
      callbackAsync(done, null)
    } else {
      var readUrl = decodeUriComponent(fullUrl)
      read(readUrl, function(error, source) {
        result.sourcesContent[index] = error ? error : String(source)
        done()
      })
    }
  })
}

function resolveSourcesSync(map, mapUrl, read, options) {
  var result = {
    sourcesResolved: [],
    sourcesContent:  []
  }

  if (!map.sources || map.sources.length === 0) {
    return result
  }

  resolveSourcesHelper(map, mapUrl, options, function(fullUrl, sourceContent, index) {
    result.sourcesResolved[index] = fullUrl
    if (read !== null) {
      if (typeof sourceContent === "string") {
        result.sourcesContent[index] = sourceContent
      } else {
        var readUrl = decodeUriComponent(fullUrl)
        try {
          result.sourcesContent[index] = String(read(readUrl))
        } catch (error) {
          result.sourcesContent[index] = error
        }
      }
    }
  })

  return result
}

var endingSlash = /\/?$/

function resolveSourcesHelper(map, mapUrl, options, fn) {
  options = options || {}
  mapUrl = urix(mapUrl)
  var fullUrl
  var sourceContent
  var sourceRoot
  for (var index = 0, len = map.sources.length; index < len; index++) {
    sourceRoot = null
    if (typeof options.sourceRoot === "string") {
      sourceRoot = options.sourceRoot
    } else if (typeof map.sourceRoot === "string" && options.sourceRoot !== false) {
      sourceRoot = map.sourceRoot
    }
    // If the sourceRoot is the empty string, it is equivalent to not setting
    // the property at all.
    if (sourceRoot === null || sourceRoot === '') {
      fullUrl = resolveUrl(mapUrl, map.sources[index])
    } else {
      // Make sure that the sourceRoot ends with a slash, so that `/scripts/subdir` becomes
      // `/scripts/subdir/<source>`, not `/scripts/<source>`. Pointing to a file as source root
      // does not make sense.
      fullUrl = resolveUrl(mapUrl, sourceRoot.replace(endingSlash, "/"), map.sources[index])
    }
    sourceContent = (map.sourcesContent || [])[index]
    fn(fullUrl, sourceContent, index)
  }
}



function resolve(code, codeUrl, read, options, callback) {
  if (typeof options === "function") {
    callback = options
    options = {}
  }
  if (code === null) {
    var mapUrl = codeUrl
    var data = {
      sourceMappingURL: null,
      url: mapUrl,
      sourcesRelativeTo: mapUrl,
      map: null
    }
    var readUrl = decodeUriComponent(mapUrl)
    read(readUrl, function(error, result) {
      if (error) {
        error.sourceMapData = data
        return callback(error)
      }
      data.map = String(result)
      try {
        data.map = parseMapToJSON(data.map, data)
      } catch (error) {
        return callback(error)
      }
      _resolveSources(data)
    })
  } else {
    resolveSourceMap(code, codeUrl, read, function(error, mapData) {
      if (error) {
        return callback(error)
      }
      if (!mapData) {
        return callback(null, null)
      }
      _resolveSources(mapData)
    })
  }

  function _resolveSources(mapData) {
    resolveSources(mapData.map, mapData.sourcesRelativeTo, read, options, function(error, result) {
      if (error) {
        return callback(error)
      }
      mapData.sourcesResolved = result.sourcesResolved
      mapData.sourcesContent  = result.sourcesContent
      callback(null, mapData)
    })
  }
}

function resolveSync(code, codeUrl, read, options) {
  var mapData
  if (code === null) {
    var mapUrl = codeUrl
    mapData = {
      sourceMappingURL: null,
      url: mapUrl,
      sourcesRelativeTo: mapUrl,
      map: null
    }
    mapData.map = readSync(read, mapUrl, mapData)
    mapData.map = parseMapToJSON(mapData.map, mapData)
  } else {
    mapData = resolveSourceMapSync(code, codeUrl, read)
    if (!mapData) {
      return null
    }
  }
  var result = resolveSourcesSync(mapData.map, mapData.sourcesRelativeTo, read, options)
  mapData.sourcesResolved = result.sourcesResolved
  mapData.sourcesContent  = result.sourcesContent
  return mapData
}



module.exports = {
  resolveSourceMap:     resolveSourceMap,
  resolveSourceMapSync: resolveSourceMapSync,
  resolveSources:       resolveSources,
  resolveSourcesSync:   resolveSourcesSync,
  resolve:              resolve,
  resolveSync:          resolveSync,
  parseMapToJSON:       parseMapToJSON
}


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

void (function(root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
  } else {}
}(this, function() {

  var innerRegex = /[#@] sourceMappingURL=([^\s'"]*)/

  var regex = RegExp(
    "(?:" +
      "/\\*" +
      "(?:\\s*\r?\n(?://)?)?" +
      "(?:" + innerRegex.source + ")" +
      "\\s*" +
      "\\*/" +
      "|" +
      "//(?:" + innerRegex.source + ")" +
    ")" +
    "\\s*"
  )

  return {

    regex: regex,
    _innerRegex: innerRegex,

    getFrom: function(code) {
      var match = code.match(regex)
      return (match ? match[1] || match[2] || "" : null)
    },

    existsIn: function(code) {
      return regex.test(code)
    },

    removeFrom: function(code) {
      return code.replace(regex, "")
    },

    insertBefore: function(code, string) {
      var match = code.match(regex)
      if (match) {
        return code.slice(0, match.index) + string + code.slice(match.index)
      } else {
        return code + string
      }
    }
  }

}));


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var url = __webpack_require__(127)

function resolveUrl(/* ...urls */) {
  return Array.prototype.reduce.call(arguments, function(resolved, nextUrl) {
    return url.resolve(resolved, nextUrl)
  })
}

module.exports = resolveUrl


/***/ }),
/* 127 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2017 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var decodeUriComponent = __webpack_require__(129)

function customDecodeUriComponent(string) {
  // `decodeUriComponent` turns `+` into ` `, but that's not wanted.
  return decodeUriComponent(string.replace(/\+/g, "%2B"))
}

module.exports = customDecodeUriComponent


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var token = '%[a-f0-9]{2}';
var singleMatcher = new RegExp(token, 'gi');
var multiMatcher = new RegExp('(' + token + ')+', 'gi');

function decodeComponents(components, split) {
	try {
		// Try to decode the entire string first
		return decodeURIComponent(components.join(''));
	} catch (err) {
		// Do nothing
	}

	if (components.length === 1) {
		return components;
	}

	split = split || 1;

	// Split the array in 2 parts
	var left = components.slice(0, split);
	var right = components.slice(split);

	return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
}

function decode(input) {
	try {
		return decodeURIComponent(input);
	} catch (err) {
		var tokens = input.match(singleMatcher);

		for (var i = 1; i < tokens.length; i++) {
			input = decodeComponents(tokens, i).join('');

			tokens = input.match(singleMatcher);
		}

		return input;
	}
}

function customDecodeURIComponent(input) {
	// Keep track of all the replacements and prefill the map with the `BOM`
	var replaceMap = {
		'%FE%FF': '\uFFFD\uFFFD',
		'%FF%FE': '\uFFFD\uFFFD'
	};

	var match = multiMatcher.exec(input);
	while (match) {
		try {
			// Decode as big chunks as possible
			replaceMap[match[0]] = decodeURIComponent(match[0]);
		} catch (err) {
			var result = decode(match[0]);

			if (result !== match[0]) {
				replaceMap[match[0]] = result;
			}
		}

		match = multiMatcher.exec(input);
	}

	// Add `%C2` at the end of the map to make sure it does not replace the combinator before everything else
	replaceMap['%C2'] = '\uFFFD';

	var entries = Object.keys(replaceMap);

	for (var i = 0; i < entries.length; i++) {
		// Replace all decoded components
		var key = entries[i];
		input = input.replace(new RegExp(key, 'g'), replaceMap[key]);
	}

	return input;
}

module.exports = function (encodedURI) {
	if (typeof encodedURI !== 'string') {
		throw new TypeError('Expected `encodedURI` to be of type `string`, got `' + typeof encodedURI + '`');
	}

	try {
		encodedURI = encodedURI.replace(/\+/g, ' ');

		// Try the built in decoder first
		return decodeURIComponent(encodedURI);
	} catch (err) {
		// Fallback to a more advanced decoder
		return customDecodeURIComponent(encodedURI);
	}
};


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2014 Simon Lydell
// X11 (“MIT”) Licensed. (See LICENSE.)

var path = __webpack_require__(5)

"use strict"

function urix(aPath) {
  if (path.sep === "\\") {
    return aPath
      .replace(/\\/g, "/")
      .replace(/^[a-z]:\/?/i, "/")
  }
  return aPath
}

module.exports = urix


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function atob(str) {
  return Buffer.from(str, 'base64').toString('binary');
}

module.exports = atob.atob = atob;


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(4);
var path = __webpack_require__(5);
var define = __webpack_require__(101);
var utils = __webpack_require__(111);

/**
 * Expose `mixin()`.
 * This code is based on `source-maps-support.js` in reworkcss/css
 * https://github.com/reworkcss/css/blob/master/lib/stringify/source-map-support.js
 * Copyright (c) 2012 TJ Holowaychuk <tj@vision-media.ca>
 */

module.exports = mixin;

/**
 * Mixin source map support into `compiler`.
 *
 * @param {Object} `compiler`
 * @api public
 */

function mixin(compiler) {
  define(compiler, '_comment', compiler.comment);
  compiler.map = new utils.SourceMap.SourceMapGenerator();
  compiler.position = { line: 1, column: 1 };
  compiler.content = {};
  compiler.files = {};

  for (var key in exports) {
    define(compiler, key, exports[key]);
  }
}

/**
 * Update position.
 *
 * @param {String} str
 */

exports.updatePosition = function(str) {
  var lines = str.match(/\n/g);
  if (lines) this.position.line += lines.length;
  var i = str.lastIndexOf('\n');
  this.position.column = ~i ? str.length - i : this.position.column + str.length;
};

/**
 * Emit `str` with `position`.
 *
 * @param {String} str
 * @param {Object} [pos]
 * @return {String}
 */

exports.emit = function(str, node) {
  var position = node.position || {};
  var source = position.source;
  if (source) {
    if (position.filepath) {
      source = utils.unixify(position.filepath);
    }

    this.map.addMapping({
      source: source,
      generated: {
        line: this.position.line,
        column: Math.max(this.position.column - 1, 0)
      },
      original: {
        line: position.start.line,
        column: position.start.column - 1
      }
    });

    if (position.content) {
      this.addContent(source, position);
    }
    if (position.filepath) {
      this.addFile(source, position);
    }

    this.updatePosition(str);
    this.output += str;
  }
  return str;
};

/**
 * Adds a file to the source map output if it has not already been added
 * @param {String} `file`
 * @param {Object} `pos`
 */

exports.addFile = function(file, position) {
  if (typeof position.content !== 'string') return;
  if (Object.prototype.hasOwnProperty.call(this.files, file)) return;
  this.files[file] = position.content;
};

/**
 * Adds a content source to the source map output if it has not already been added
 * @param {String} `source`
 * @param {Object} `position`
 */

exports.addContent = function(source, position) {
  if (typeof position.content !== 'string') return;
  if (Object.prototype.hasOwnProperty.call(this.content, source)) return;
  this.map.setSourceContent(source, position.content);
};

/**
 * Applies any original source maps to the output and embeds the source file
 * contents in the source map.
 */

exports.applySourceMaps = function() {
  Object.keys(this.files).forEach(function(file) {
    var content = this.files[file];
    this.map.setSourceContent(file, content);

    if (this.options.inputSourcemaps === true) {
      var originalMap = utils.sourceMapResolve.resolveSync(content, file, fs.readFileSync);
      if (originalMap) {
        var map = new utils.SourceMap.SourceMapConsumer(originalMap.map);
        var relativeTo = originalMap.sourcesRelativeTo;
        this.map.applySourceMap(map, file, utils.unixify(path.dirname(relativeTo)));
      }
    }
  }, this);
};

/**
 * Process comments, drops sourceMap comments.
 * @param {Object} node
 */

exports.comment = function(node) {
  if (/^# sourceMappingURL=/.test(node.comment)) {
    return this.emit('', node.position);
  }
  return this._comment(node);
};


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

var use = __webpack_require__(103);
var util = __webpack_require__(8);
var Cache = __webpack_require__(134);
var define = __webpack_require__(101);
var debug = __webpack_require__(104)('snapdragon:parser');
var Position = __webpack_require__(135);
var utils = __webpack_require__(111);

/**
 * Create a new `Parser` with the given `input` and `options`.
 * @param {String} `input`
 * @param {Object} `options`
 * @api public
 */

function Parser(options) {
  debug('initializing', __filename);
  this.options = utils.extend({source: 'string'}, options);
  this.init(this.options);
  use(this);
}

/**
 * Prototype methods
 */

Parser.prototype = {
  constructor: Parser,

  init: function(options) {
    this.orig = '';
    this.input = '';
    this.parsed = '';

    this.column = 1;
    this.line = 1;

    this.regex = new Cache();
    this.errors = this.errors || [];
    this.parsers = this.parsers || {};
    this.types = this.types || [];
    this.sets = this.sets || {};
    this.fns = this.fns || [];
    this.currentType = 'root';

    var pos = this.position();
    this.bos = pos({type: 'bos', val: ''});

    this.ast = {
      type: 'root',
      errors: this.errors,
      nodes: [this.bos]
    };

    define(this.bos, 'parent', this.ast);
    this.nodes = [this.ast];

    this.count = 0;
    this.setCount = 0;
    this.stack = [];
  },

  /**
   * Throw a formatted error with the cursor column and `msg`.
   * @param {String} `msg` Message to use in the Error.
   */

  error: function(msg, node) {
    var pos = node.position || {start: {column: 0, line: 0}};
    var line = pos.start.line;
    var column = pos.start.column;
    var source = this.options.source;

    var message = source + ' <line:' + line + ' column:' + column + '>: ' + msg;
    var err = new Error(message);
    err.source = source;
    err.reason = msg;
    err.pos = pos;

    if (this.options.silent) {
      this.errors.push(err);
    } else {
      throw err;
    }
  },

  /**
   * Define a non-enumberable property on the `Parser` instance.
   *
   * ```js
   * parser.define('foo', 'bar');
   * ```
   * @name .define
   * @param {String} `key` propery name
   * @param {any} `val` property value
   * @return {Object} Returns the Parser instance for chaining.
   * @api public
   */

  define: function(key, val) {
    define(this, key, val);
    return this;
  },

  /**
   * Mark position and patch `node.position`.
   */

  position: function() {
    var start = { line: this.line, column: this.column };
    var self = this;

    return function(node) {
      define(node, 'position', new Position(start, self));
      return node;
    };
  },

  /**
   * Set parser `name` with the given `fn`
   * @param {String} `name`
   * @param {Function} `fn`
   * @api public
   */

  set: function(type, fn) {
    if (this.types.indexOf(type) === -1) {
      this.types.push(type);
    }
    this.parsers[type] = fn.bind(this);
    return this;
  },

  /**
   * Get parser `name`
   * @param {String} `name`
   * @api public
   */

  get: function(name) {
    return this.parsers[name];
  },

  /**
   * Push a `token` onto the `type` stack.
   *
   * @param {String} `type`
   * @return {Object} `token`
   * @api public
   */

  push: function(type, token) {
    this.sets[type] = this.sets[type] || [];
    this.count++;
    this.stack.push(token);
    return this.sets[type].push(token);
  },

  /**
   * Pop a token off of the `type` stack
   * @param {String} `type`
   * @returns {Object} Returns a token
   * @api public
   */

  pop: function(type) {
    this.sets[type] = this.sets[type] || [];
    this.count--;
    this.stack.pop();
    return this.sets[type].pop();
  },

  /**
   * Return true if inside a `stack` node. Types are `braces`, `parens` or `brackets`.
   *
   * @param {String} `type`
   * @return {Boolean}
   * @api public
   */

  isInside: function(type) {
    this.sets[type] = this.sets[type] || [];
    return this.sets[type].length > 0;
  },

  /**
   * Return true if `node` is the given `type`.
   *
   * ```js
   * parser.isType(node, 'brace');
   * ```
   * @param {Object} `node`
   * @param {String} `type`
   * @return {Boolean}
   * @api public
   */

  isType: function(node, type) {
    return node && node.type === type;
  },

  /**
   * Get the previous AST node
   * @return {Object}
   */

  prev: function(n) {
    return this.stack.length > 0
      ? utils.last(this.stack, n)
      : utils.last(this.nodes, n);
  },

  /**
   * Update line and column based on `str`.
   */

  consume: function(len) {
    this.input = this.input.substr(len);
  },

  /**
   * Update column based on `str`.
   */

  updatePosition: function(str, len) {
    var lines = str.match(/\n/g);
    if (lines) this.line += lines.length;
    var i = str.lastIndexOf('\n');
    this.column = ~i ? len - i : this.column + len;
    this.parsed += str;
    this.consume(len);
  },

  /**
   * Match `regex`, return captures, and update the cursor position by `match[0]` length.
   * @param {RegExp} `regex`
   * @return {Object}
   */

  match: function(regex) {
    var m = regex.exec(this.input);
    if (m) {
      this.updatePosition(m[0], m[0].length);
      return m;
    }
  },

  /**
   * Capture `type` with the given regex.
   * @param {String} `type`
   * @param {RegExp} `regex`
   * @return {Function}
   */

  capture: function(type, regex) {
    if (typeof regex === 'function') {
      return this.set.apply(this, arguments);
    }

    this.regex.set(type, regex);
    this.set(type, function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(regex);
      if (!m || !m[0]) return;

      var prev = this.prev();
      var node = pos({
        type: type,
        val: m[0],
        parsed: parsed,
        rest: this.input
      });

      if (m[1]) {
        node.inner = m[1];
      }

      define(node, 'inside', this.stack.length > 0);
      define(node, 'parent', prev);
      prev.nodes.push(node);
    }.bind(this));
    return this;
  },

  /**
   * Create a parser with open and close for parens,
   * brackets or braces
   */

  capturePair: function(type, openRegex, closeRegex, fn) {
    this.sets[type] = this.sets[type] || [];

    /**
     * Open
     */

    this.set(type + '.open', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(openRegex);
      if (!m || !m[0]) return;

      var val = m[0];
      this.setCount++;
      this.specialChars = true;
      var open = pos({
        type: type + '.open',
        val: val,
        rest: this.input
      });

      if (typeof m[1] !== 'undefined') {
        open.inner = m[1];
      }

      var prev = this.prev();
      var node = pos({
        type: type,
        nodes: [open]
      });

      define(node, 'rest', this.input);
      define(node, 'parsed', parsed);
      define(node, 'prefix', m[1]);
      define(node, 'parent', prev);
      define(open, 'parent', node);

      if (typeof fn === 'function') {
        fn.call(this, open, node);
      }

      this.push(type, node);
      prev.nodes.push(node);
    });

    /**
     * Close
     */

    this.set(type + '.close', function() {
      var pos = this.position();
      var m = this.match(closeRegex);
      if (!m || !m[0]) return;

      var parent = this.pop(type);
      var node = pos({
        type: type + '.close',
        rest: this.input,
        suffix: m[1],
        val: m[0]
      });

      if (!this.isType(parent, type)) {
        if (this.options.strict) {
          throw new Error('missing opening "' + type + '"');
        }

        this.setCount--;
        node.escaped = true;
        return node;
      }

      if (node.suffix === '\\') {
        parent.escaped = true;
        node.escaped = true;
      }

      parent.nodes.push(node);
      define(node, 'parent', parent);
    });

    return this;
  },

  /**
   * Capture end-of-string
   */

  eos: function() {
    var pos = this.position();
    if (this.input) return;
    var prev = this.prev();

    while (prev.type !== 'root' && !prev.visited) {
      if (this.options.strict === true) {
        throw new SyntaxError('invalid syntax:' + util.inspect(prev, null, 2));
      }

      if (!hasDelims(prev)) {
        prev.parent.escaped = true;
        prev.escaped = true;
      }

      visit(prev, function(node) {
        if (!hasDelims(node.parent)) {
          node.parent.escaped = true;
          node.escaped = true;
        }
      });

      prev = prev.parent;
    }

    var tok = pos({
      type: 'eos',
      val: this.append || ''
    });

    define(tok, 'parent', this.ast);
    return tok;
  },

  /**
   * Run parsers to advance the cursor position
   */

  next: function() {
    var parsed = this.parsed;
    var len = this.types.length;
    var idx = -1;
    var tok;

    while (++idx < len) {
      if ((tok = this.parsers[this.types[idx]].call(this))) {
        define(tok, 'rest', this.input);
        define(tok, 'parsed', parsed);
        this.last = tok;
        return tok;
      }
    }
  },

  /**
   * Parse the given string.
   * @return {Array}
   */

  parse: function(input) {
    if (typeof input !== 'string') {
      throw new TypeError('expected a string');
    }

    this.init(this.options);
    this.orig = input;
    this.input = input;
    var self = this;

    function parse() {
      // check input before calling `.next()`
      input = self.input;

      // get the next AST ndoe
      var node = self.next();
      if (node) {
        var prev = self.prev();
        if (prev) {
          define(node, 'parent', prev);
          if (prev.nodes) {
            prev.nodes.push(node);
          }
        }

        if (self.sets.hasOwnProperty(prev.type)) {
          self.currentType = prev.type;
        }
      }

      // if we got here but input is not changed, throw an error
      if (self.input && input === self.input) {
        throw new Error('no parsers registered for: "' + self.input.slice(0, 5) + '"');
      }
    }

    while (this.input) parse();
    if (this.stack.length && this.options.strict) {
      var node = this.stack.pop();
      throw this.error('missing opening ' + node.type + ': "' + this.orig + '"');
    }

    var eos = this.eos();
    var tok = this.prev();
    if (tok.type !== 'eos') {
      this.ast.nodes.push(eos);
    }

    return this.ast;
  }
};

/**
 * Visit `node` with the given `fn`
 */

function visit(node, fn) {
  if (!node.visited) {
    define(node, 'visited', true);
    return node.nodes ? mapVisit(node.nodes, fn) : fn(node);
  }
  return node;
}

/**
 * Map visit over array of `nodes`.
 */

function mapVisit(nodes, fn) {
  var len = nodes.length;
  var idx = -1;
  while (++idx < len) {
    visit(nodes[idx], fn);
  }
}

function hasOpen(node) {
  return node.nodes && node.nodes[0].type === (node.type + '.open');
}

function hasClose(node) {
  return node.nodes && utils.last(node.nodes).type === (node.type + '.close');
}

function hasDelims(node) {
  return hasOpen(node) && hasClose(node);
}

/**
 * Expose `Parser`
 */

module.exports = Parser;

/* WEBPACK VAR INJECTION */}.call(this, "/index.js"))

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * map-cache <https://github.com/jonschlinkert/map-cache>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var hasOwn = Object.prototype.hasOwnProperty;

/**
 * Expose `MapCache`
 */

module.exports = MapCache;

/**
 * Creates a cache object to store key/value pairs.
 *
 * ```js
 * var cache = new MapCache();
 * ```
 *
 * @api public
 */

function MapCache(data) {
  this.__data__ = data || {};
}

/**
 * Adds `value` to `key` on the cache.
 *
 * ```js
 * cache.set('foo', 'bar');
 * ```
 *
 * @param {String} `key` The key of the value to cache.
 * @param {*} `value` The value to cache.
 * @returns {Object} Returns the `Cache` object for chaining.
 * @api public
 */

MapCache.prototype.set = function mapSet(key, value) {
  if (key !== '__proto__') {
    this.__data__[key] = value;
  }
  return this;
};

/**
 * Gets the cached value for `key`.
 *
 * ```js
 * cache.get('foo');
 * //=> 'bar'
 * ```
 *
 * @param {String} `key` The key of the value to get.
 * @returns {*} Returns the cached value.
 * @api public
 */

MapCache.prototype.get = function mapGet(key) {
  return key === '__proto__' ? undefined : this.__data__[key];
};

/**
 * Checks if a cached value for `key` exists.
 *
 * ```js
 * cache.has('foo');
 * //=> true
 * ```
 *
 * @param {String} `key` The key of the entry to check.
 * @returns {Boolean} Returns `true` if an entry for `key` exists, else `false`.
 * @api public
 */

MapCache.prototype.has = function mapHas(key) {
  return key !== '__proto__' && hasOwn.call(this.__data__, key);
};

/**
 * Removes `key` and its value from the cache.
 *
 * ```js
 * cache.del('foo');
 * ```
 * @title .del
 * @param {String} `key` The key of the value to remove.
 * @returns {Boolean} Returns `true` if the entry was removed successfully, else `false`.
 * @api public
 */

MapCache.prototype.del = function mapDelete(key) {
  return this.has(key) && delete this.__data__[key];
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__(101);

/**
 * Store position for a node
 */

module.exports = function Position(start, parser) {
  this.start = start;
  this.end = { line: parser.line, column: parser.column };
  define(this, 'content', parser.orig);
  define(this, 'source', parser.options.source);
};


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nanomatch = __webpack_require__(137);
var extglob = __webpack_require__(146);

module.exports = function(snapdragon) {
  var compilers = snapdragon.compiler.compilers;
  var opts = snapdragon.options;

  // register nanomatch compilers
  snapdragon.use(nanomatch.compilers);

  // get references to some specific nanomatch compilers before they
  // are overridden by the extglob and/or custom compilers
  var escape = compilers.escape;
  var qmark = compilers.qmark;
  var slash = compilers.slash;
  var star = compilers.star;
  var text = compilers.text;
  var plus = compilers.plus;
  var dot = compilers.dot;

  // register extglob compilers or escape exglobs if disabled
  if (opts.extglob === false || opts.noext === true) {
    snapdragon.compiler.use(escapeExtglobs);
  } else {
    snapdragon.use(extglob.compilers);
  }

  snapdragon.use(function() {
    this.options.star = this.options.star || function(/*node*/) {
      return '[^\\\\/]*?';
    };
  });

  // custom micromatch compilers
  snapdragon.compiler

    // reset referenced compiler
    .set('dot', dot)
    .set('escape', escape)
    .set('plus', plus)
    .set('slash', slash)
    .set('qmark', qmark)
    .set('star', star)
    .set('text', text);
};

function escapeExtglobs(compiler) {
  compiler.set('paren', function(node) {
    var val = '';
    visit(node, function(tok) {
      if (tok.val) val += (/^\W/.test(tok.val) ? '\\' : '') + tok.val;
    });
    return this.emit(val, node);
  });

  /**
   * Visit `node` with the given `fn`
   */

  function visit(node, fn) {
    return node.nodes ? mapVisit(node.nodes, fn) : fn(node);
  }

  /**
   * Map visit over array of `nodes`.
   */

  function mapVisit(nodes, fn) {
    var len = nodes.length;
    var idx = -1;
    while (++idx < len) {
      visit(nodes[idx], fn);
    }
  }
}


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */

var util = __webpack_require__(8);
var toRegex = __webpack_require__(15);
var extend = __webpack_require__(28);

/**
 * Local dependencies
 */

var compilers = __webpack_require__(138);
var parsers = __webpack_require__(139);
var cache = __webpack_require__(140);
var utils = __webpack_require__(142);
var MAX_LENGTH = 1024 * 64;

/**
 * The main function takes a list of strings and one or more
 * glob patterns to use for matching.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm(list, patterns[, options]);
 *
 * console.log(nm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {Array} `list` A list of strings to match
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */

function nanomatch(list, patterns, options) {
  patterns = utils.arrayify(patterns);
  list = utils.arrayify(list);

  var len = patterns.length;
  if (list.length === 0 || len === 0) {
    return [];
  }

  if (len === 1) {
    return nanomatch.match(list, patterns[0], options);
  }

  var negated = false;
  var omit = [];
  var keep = [];
  var idx = -1;

  while (++idx < len) {
    var pattern = patterns[idx];

    if (typeof pattern === 'string' && pattern.charCodeAt(0) === 33 /* ! */) {
      omit.push.apply(omit, nanomatch.match(list, pattern.slice(1), options));
      negated = true;
    } else {
      keep.push.apply(keep, nanomatch.match(list, pattern, options));
    }
  }

  // minimatch.match parity
  if (negated && keep.length === 0) {
    if (options && options.unixify === false) {
      keep = list.slice();
    } else {
      var unixify = utils.unixify(options);
      for (var i = 0; i < list.length; i++) {
        keep.push(unixify(list[i]));
      }
    }
  }

  var matches = utils.diff(keep, omit);
  if (!options || options.nodupes !== false) {
    return utils.unique(matches);
  }

  return matches;
}

/**
 * Similar to the main function, but `pattern` must be a string.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.match(list, pattern[, options]);
 *
 * console.log(nm.match(['a.a', 'a.aa', 'a.b', 'a.c'], '*.a'));
 * //=> ['a.a', 'a.aa']
 * ```
 * @param {Array} `list` Array of strings to match
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of matches
 * @api public
 */

nanomatch.match = function(list, pattern, options) {
  if (Array.isArray(pattern)) {
    throw new TypeError('expected pattern to be a string');
  }

  var unixify = utils.unixify(options);
  var isMatch = memoize('match', pattern, options, nanomatch.matcher);
  var matches = [];

  list = utils.arrayify(list);
  var len = list.length;
  var idx = -1;

  while (++idx < len) {
    var ele = list[idx];
    if (ele === pattern || isMatch(ele)) {
      matches.push(utils.value(ele, unixify, options));
    }
  }

  // if no options were passed, uniquify results and return
  if (typeof options === 'undefined') {
    return utils.unique(matches);
  }

  if (matches.length === 0) {
    if (options.failglob === true) {
      throw new Error('no matches found for "' + pattern + '"');
    }
    if (options.nonull === true || options.nullglob === true) {
      return [options.unescape ? utils.unescape(pattern) : pattern];
    }
  }

  // if `opts.ignore` was defined, diff ignored list
  if (options.ignore) {
    matches = nanomatch.not(matches, options.ignore, options);
  }

  return options.nodupes !== false ? utils.unique(matches) : matches;
};

/**
 * Returns true if the specified `string` matches the given glob `pattern`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.isMatch(string, pattern[, options]);
 *
 * console.log(nm.isMatch('a.a', '*.a'));
 * //=> true
 * console.log(nm.isMatch('a.b', '*.a'));
 * //=> false
 * ```
 * @param {String} `string` String to match
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the string matches the glob pattern.
 * @api public
 */

nanomatch.isMatch = function(str, pattern, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }

  if (utils.isEmptyString(str) || utils.isEmptyString(pattern)) {
    return false;
  }

  var equals = utils.equalsPattern(options);
  if (equals(str)) {
    return true;
  }

  var isMatch = memoize('isMatch', pattern, options, nanomatch.matcher);
  return isMatch(str);
};

/**
 * Returns true if some of the elements in the given `list` match any of the
 * given glob `patterns`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.some(list, patterns[, options]);
 *
 * console.log(nm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(nm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param  {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

nanomatch.some = function(list, patterns, options) {
  if (typeof list === 'string') {
    list = [list];
  }

  for (var i = 0; i < list.length; i++) {
    if (nanomatch(list[i], patterns, options).length === 1) {
      return true;
    }
  }

  return false;
};

/**
 * Returns true if every element in the given `list` matches
 * at least one of the given glob `patterns`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.every(list, patterns[, options]);
 *
 * console.log(nm.every('foo.js', ['foo.js']));
 * // true
 * console.log(nm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(nm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(nm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param  {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

nanomatch.every = function(list, patterns, options) {
  if (typeof list === 'string') {
    list = [list];
  }

  for (var i = 0; i < list.length; i++) {
    if (nanomatch(list[i], patterns, options).length !== 1) {
      return false;
    }
  }

  return true;
};

/**
 * Returns true if **any** of the given glob `patterns`
 * match the specified `string`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.any(string, patterns[, options]);
 *
 * console.log(nm.any('a.a', ['b.*', '*.a']));
 * //=> true
 * console.log(nm.any('a.a', 'b.*'));
 * //=> false
 * ```
 * @param  {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

nanomatch.any = function(str, patterns, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }

  if (utils.isEmptyString(str) || utils.isEmptyString(patterns)) {
    return false;
  }

  if (typeof patterns === 'string') {
    patterns = [patterns];
  }

  for (var i = 0; i < patterns.length; i++) {
    if (nanomatch.isMatch(str, patterns[i], options)) {
      return true;
    }
  }
  return false;
};

/**
 * Returns true if **all** of the given `patterns`
 * match the specified string.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.all(string, patterns[, options]);
 *
 * console.log(nm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(nm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(nm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(nm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param  {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */

nanomatch.all = function(str, patterns, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }

  if (typeof patterns === 'string') {
    patterns = [patterns];
  }

  for (var i = 0; i < patterns.length; i++) {
    if (!nanomatch.isMatch(str, patterns[i], options)) {
      return false;
    }
  }
  return true;
};

/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.not(list, patterns[, options]);
 *
 * console.log(nm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */

nanomatch.not = function(list, patterns, options) {
  var opts = extend({}, options);
  var ignore = opts.ignore;
  delete opts.ignore;

  list = utils.arrayify(list);

  var matches = utils.diff(list, nanomatch(list, patterns, opts));
  if (ignore) {
    matches = utils.diff(matches, nanomatch(list, ignore));
  }

  return opts.nodupes !== false ? utils.unique(matches) : matches;
};

/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.contains(string, pattern[, options]);
 *
 * console.log(nm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(nm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the patter matches any part of `str`.
 * @api public
 */

nanomatch.contains = function(str, patterns, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string: "' + util.inspect(str) + '"');
  }

  if (typeof patterns === 'string') {
    if (utils.isEmptyString(str) || utils.isEmptyString(patterns)) {
      return false;
    }

    var equals = utils.equalsPattern(patterns, options);
    if (equals(str)) {
      return true;
    }
    var contains = utils.containsPattern(patterns, options);
    if (contains(str)) {
      return true;
    }
  }

  var opts = extend({}, options, {contains: true});
  return nanomatch.any(str, patterns, opts);
};

/**
 * Returns true if the given pattern and options should enable
 * the `matchBase` option.
 * @return {Boolean}
 * @api private
 */

nanomatch.matchBase = function(pattern, options) {
  if (pattern && pattern.indexOf('/') !== -1 || !options) return false;
  return options.basename === true || options.matchBase === true;
};

/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.matchKeys(object, patterns[, options]);
 *
 * var obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(nm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */

nanomatch.matchKeys = function(obj, patterns, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError('expected the first argument to be an object');
  }
  var keys = nanomatch(Object.keys(obj), patterns, options);
  return utils.pick(obj, keys);
};

/**
 * Returns a memoized matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.matcher(pattern[, options]);
 *
 * var isMatch = nm.matcher('*.!(*a)');
 * console.log(isMatch('a.a'));
 * //=> false
 * console.log(isMatch('a.b'));
 * //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options` See available [options](#options) for changing how matches are performed.
 * @return {Function} Returns a matcher function.
 * @api public
 */

nanomatch.matcher = function matcher(pattern, options) {
  if (utils.isEmptyString(pattern)) {
    return function() {
      return false;
    };
  }

  if (Array.isArray(pattern)) {
    return compose(pattern, options, matcher);
  }

  // if pattern is a regex
  if (pattern instanceof RegExp) {
    return test(pattern);
  }

  // if pattern is invalid
  if (!utils.isString(pattern)) {
    throw new TypeError('expected pattern to be an array, string or regex');
  }

  // if pattern is a non-glob string
  if (!utils.hasSpecialChars(pattern)) {
    if (options && options.nocase === true) {
      pattern = pattern.toLowerCase();
    }
    return utils.matchPath(pattern, options);
  }

  // if pattern is a glob string
  var re = nanomatch.makeRe(pattern, options);

  // if `options.matchBase` or `options.basename` is defined
  if (nanomatch.matchBase(pattern, options)) {
    return utils.matchBasename(re, options);
  }

  function test(regex) {
    var equals = utils.equalsPattern(options);
    var unixify = utils.unixify(options);

    return function(str) {
      if (equals(str)) {
        return true;
      }

      if (regex.test(unixify(str))) {
        return true;
      }
      return false;
    };
  }

  // create matcher function
  var matcherFn = test(re);
  // set result object from compiler on matcher function,
  // as a non-enumerable property. useful for debugging
  utils.define(matcherFn, 'result', re.result);
  return matcherFn;
};

/**
 * Returns an array of matches captured by `pattern` in `string, or
 * `null` if the pattern did not match.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.capture(pattern, string[, options]);
 *
 * console.log(nm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(nm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {String} `string` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns an array of captures if the string matches the glob pattern, otherwise `null`.
 * @api public
 */

nanomatch.capture = function(pattern, str, options) {
  var re = nanomatch.makeRe(pattern, extend({capture: true}, options));
  var unixify = utils.unixify(options);

  function match() {
    return function(string) {
      var match = re.exec(unixify(string));
      if (!match) {
        return null;
      }

      return match.slice(1);
    };
  }

  var capture = memoize('capture', pattern, options, match);
  return capture(str);
};

/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.makeRe(pattern[, options]);
 *
 * console.log(nm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed.
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */

nanomatch.makeRe = function(pattern, options) {
  if (pattern instanceof RegExp) {
    return pattern;
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  if (pattern.length > MAX_LENGTH) {
    throw new Error('expected pattern to be less than ' + MAX_LENGTH + ' characters');
  }

  function makeRe() {
    var opts = utils.extend({wrap: false}, options);
    var result = nanomatch.create(pattern, opts);
    var regex = toRegex(result.output, opts);
    utils.define(regex, 'result', result);
    return regex;
  }

  return memoize('makeRe', pattern, options, makeRe);
};

/**
 * Parses the given glob `pattern` and returns an object with the compiled `output`
 * and optional source `map`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.create(pattern[, options]);
 *
 * console.log(nm.create('abc/*.js'));
 * // { options: { source: 'string', sourcemap: true },
 * //   state: {},
 * //   compilers:
 * //    { ... },
 * //   output: '(\\.[\\\\\\/])?abc\\/(?!\\.)(?=.)[^\\/]*?\\.js',
 * //   ast:
 * //    { type: 'root',
 * //      errors: [],
 * //      nodes:
 * //       [ ... ],
 * //      dot: false,
 * //      input: 'abc/*.js' },
 * //   parsingErrors: [],
 * //   map:
 * //    { version: 3,
 * //      sources: [ 'string' ],
 * //      names: [],
 * //      mappings: 'AAAA,GAAG,EAAC,kBAAC,EAAC,EAAE',
 * //      sourcesContent: [ 'abc/*.js' ] },
 * //   position: { line: 1, column: 28 },
 * //   content: {},
 * //   files: {},
 * //   idx: 6 }
 * ```
 * @param {String} `pattern` Glob pattern to parse and compile.
 * @param {Object} `options` Any [options](#options) to change how parsing and compiling is performed.
 * @return {Object} Returns an object with the parsed AST, compiled string and optional source map.
 * @api public
 */

nanomatch.create = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected a string');
  }
  function create() {
    return nanomatch.compile(nanomatch.parse(pattern, options), options);
  }
  return memoize('create', pattern, options, create);
};

/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.parse(pattern[, options]);
 *
 * var ast = nm.parse('a/{b,c}/d');
 * console.log(ast);
 * // { type: 'root',
 * //   errors: [],
 * //   input: 'a/{b,c}/d',
 * //   nodes:
 * //    [ { type: 'bos', val: '' },
 * //      { type: 'text', val: 'a/' },
 * //      { type: 'brace',
 * //        nodes:
 * //         [ { type: 'brace.open', val: '{' },
 * //           { type: 'text', val: 'b,c' },
 * //           { type: 'brace.close', val: '}' } ] },
 * //      { type: 'text', val: '/d' },
 * //      { type: 'eos', val: '' } ] }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an AST
 * @api public
 */

nanomatch.parse = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected a string');
  }

  function parse() {
    var snapdragon = utils.instantiate(null, options);
    parsers(snapdragon, options);

    var ast = snapdragon.parse(pattern, options);
    utils.define(ast, 'snapdragon', snapdragon);
    ast.input = pattern;
    return ast;
  }

  return memoize('parse', pattern, options, parse);
};

/**
 * Compile the given `ast` or string with the given `options`.
 *
 * ```js
 * var nm = require('nanomatch');
 * nm.compile(ast[, options]);
 *
 * var ast = nm.parse('a/{b,c}/d');
 * console.log(nm.compile(ast));
 * // { options: { source: 'string' },
 * //   state: {},
 * //   compilers:
 * //    { eos: [Function],
 * //      noop: [Function],
 * //      bos: [Function],
 * //      brace: [Function],
 * //      'brace.open': [Function],
 * //      text: [Function],
 * //      'brace.close': [Function] },
 * //   output: [ 'a/(b|c)/d' ],
 * //   ast:
 * //    { ... },
 * //   parsingErrors: [] }
 * ```
 * @param {Object|String} `ast`
 * @param {Object} `options`
 * @return {Object} Returns an object that has an `output` property with the compiled string.
 * @api public
 */

nanomatch.compile = function(ast, options) {
  if (typeof ast === 'string') {
    ast = nanomatch.parse(ast, options);
  }

  function compile() {
    var snapdragon = utils.instantiate(ast, options);
    compilers(snapdragon, options);
    return snapdragon.compile(ast, options);
  }

  return memoize('compile', ast.input, options, compile);
};

/**
 * Clear the regex cache.
 *
 * ```js
 * nm.clearCache();
 * ```
 * @api public
 */

nanomatch.clearCache = function() {
  nanomatch.cache.__data__ = {};
};

/**
 * Compose a matcher function with the given patterns.
 * This allows matcher functions to be compiled once and
 * called multiple times.
 */

function compose(patterns, options, matcher) {
  var matchers;

  return memoize('compose', String(patterns), options, function() {
    return function(file) {
      // delay composition until it's invoked the first time,
      // after that it won't be called again
      if (!matchers) {
        matchers = [];
        for (var i = 0; i < patterns.length; i++) {
          matchers.push(matcher(patterns[i], options));
        }
      }

      var len = matchers.length;
      while (len--) {
        if (matchers[len](file) === true) {
          return true;
        }
      }
      return false;
    };
  });
}

/**
 * Memoize a generated regex or function. A unique key is generated
 * from the `type` (usually method name), the `pattern`, and
 * user-defined options.
 */

function memoize(type, pattern, options, fn) {
  var key = utils.createKey(type + '=' + pattern, options);

  if (options && options.cache === false) {
    return fn(pattern, options);
  }

  if (cache.has(type, key)) {
    return cache.get(type, key);
  }

  var val = fn(pattern, options);
  cache.set(type, key, val);
  return val;
}

/**
 * Expose compiler, parser and cache on `nanomatch`
 */

nanomatch.compilers = compilers;
nanomatch.parsers = parsers;
nanomatch.cache = cache;

/**
 * Expose `nanomatch`
 * @type {Function}
 */

module.exports = nanomatch;


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
* Nanomatch compilers
*/

module.exports = function(nanomatch, options) {
  function slash() {
    if (options && typeof options.slash === 'string') {
      return options.slash;
    }
    if (options && typeof options.slash === 'function') {
      return options.slash.call(nanomatch);
    }
    return '\\\\/';
  }

  function star() {
    if (options && typeof options.star === 'string') {
      return options.star;
    }
    if (options && typeof options.star === 'function') {
      return options.star.call(nanomatch);
    }
    return '[^' + slash() + ']*?';
  }

  var ast = nanomatch.ast = nanomatch.parser.ast;
  ast.state = nanomatch.parser.state;
  nanomatch.compiler.state = ast.state;
  nanomatch.compiler

    /**
     * Negation / escaping
     */

    .set('not', function(node) {
      var prev = this.prev();
      if (this.options.nonegate === true || prev.type !== 'bos') {
        return this.emit('\\' + node.val, node);
      }
      return this.emit(node.val, node);
    })
    .set('escape', function(node) {
      if (this.options.unescape && /^[-\w_.]/.test(node.val)) {
        return this.emit(node.val, node);
      }
      return this.emit('\\' + node.val, node);
    })
    .set('quoted', function(node) {
      return this.emit(node.val, node);
    })

    /**
     * Regex
     */

    .set('dollar', function(node) {
      if (node.parent.type === 'bracket') {
        return this.emit(node.val, node);
      }
      return this.emit('\\' + node.val, node);
    })

    /**
     * Dot: "."
     */

    .set('dot', function(node) {
      if (node.dotfiles === true) this.dotfiles = true;
      return this.emit('\\' + node.val, node);
    })

    /**
     * Slashes: "/" and "\"
     */

    .set('backslash', function(node) {
      return this.emit(node.val, node);
    })
    .set('slash', function(node, nodes, i) {
      var val = '[' + slash() + ']';
      var parent = node.parent;
      var prev = this.prev();

      // set "node.hasSlash" to true on all ancestor parens nodes
      while (parent.type === 'paren' && !parent.hasSlash) {
        parent.hasSlash = true;
        parent = parent.parent;
      }

      if (prev.addQmark) {
        val += '?';
      }

      // word boundary
      if (node.rest.slice(0, 2) === '\\b') {
        return this.emit(val, node);
      }

      // globstars
      if (node.parsed === '**' || node.parsed === './**') {
        this.output = '(?:' + this.output;
        return this.emit(val + ')?', node);
      }

      // negation
      if (node.parsed === '!**' && this.options.nonegate !== true) {
        return this.emit(val + '?\\b', node);
      }
      return this.emit(val, node);
    })

    /**
     * Square brackets
     */

    .set('bracket', function(node) {
      var close = node.close;
      var open = !node.escaped ? '[' : '\\[';
      var negated = node.negated;
      var inner = node.inner;
      var val = node.val;

      if (node.escaped === true) {
        inner = inner.replace(/\\?(\W)/g, '\\$1');
        negated = '';
      }

      if (inner === ']-') {
        inner = '\\]\\-';
      }

      if (negated && inner.indexOf('.') === -1) {
        inner += '.';
      }
      if (negated && inner.indexOf('/') === -1) {
        inner += '/';
      }

      val = open + negated + inner + close;
      return this.emit(val, node);
    })

    /**
     * Square: "[.]" (only matches a single character in brackets)
     */

    .set('square', function(node) {
      var val = (/^\W/.test(node.val) ? '\\' : '') + node.val;
      return this.emit(val, node);
    })

    /**
     * Question mark: "?"
     */

    .set('qmark', function(node) {
      var prev = this.prev();
      // don't use "slash" variable so that we always avoid
      // matching backslashes and slashes with a qmark
      var val = '[^.\\\\/]';
      if (this.options.dot || (prev.type !== 'bos' && prev.type !== 'slash')) {
        val = '[^\\\\/]';
      }

      if (node.parsed.slice(-1) === '(') {
        var ch = node.rest.charAt(0);
        if (ch === '!' || ch === '=' || ch === ':') {
          return this.emit(node.val, node);
        }
      }

      if (node.val.length > 1) {
        val += '{' + node.val.length + '}';
      }
      return this.emit(val, node);
    })

    /**
     * Plus
     */

    .set('plus', function(node) {
      var prev = node.parsed.slice(-1);
      if (prev === ']' || prev === ')') {
        return this.emit(node.val, node);
      }
      if (!this.output || (/[?*+]/.test(ch) && node.parent.type !== 'bracket')) {
        return this.emit('\\+', node);
      }
      var ch = this.output.slice(-1);
      if (/\w/.test(ch) && !node.inside) {
        return this.emit('+\\+?', node);
      }
      return this.emit('+', node);
    })

    /**
     * globstar: '**'
     */

    .set('globstar', function(node, nodes, i) {
      if (!this.output) {
        this.state.leadingGlobstar = true;
      }

      var prev = this.prev();
      var before = this.prev(2);
      var next = this.next();
      var after = this.next(2);
      var type = prev.type;
      var val = node.val;

      if (prev.type === 'slash' && next.type === 'slash') {
        if (before.type === 'text') {
          this.output += '?';

          if (after.type !== 'text') {
            this.output += '\\b';
          }
        }
      }

      var parsed = node.parsed;
      if (parsed.charAt(0) === '!') {
        parsed = parsed.slice(1);
      }

      var isInside = node.isInside.paren || node.isInside.brace;
      if (parsed && type !== 'slash' && type !== 'bos' && !isInside) {
        val = star();
      } else {
        val = this.options.dot !== true
          ? '(?:(?!(?:[' + slash() + ']|^)\\.).)*?'
          : '(?:(?!(?:[' + slash() + ']|^)(?:\\.{1,2})($|[' + slash() + ']))(?!\\.{2}).)*?';
      }

      if ((type === 'slash' || type === 'bos') && this.options.dot !== true) {
        val = '(?!\\.)' + val;
      }

      if (prev.type === 'slash' && next.type === 'slash' && before.type !== 'text') {
        if (after.type === 'text' || after.type === 'star') {
          node.addQmark = true;
        }
      }

      if (this.options.capture) {
        val = '(' + val + ')';
      }

      return this.emit(val, node);
    })

    /**
     * Star: "*"
     */

    .set('star', function(node, nodes, i) {
      var prior = nodes[i - 2] || {};
      var prev = this.prev();
      var next = this.next();
      var type = prev.type;

      function isStart(n) {
        return n.type === 'bos' || n.type === 'slash';
      }

      if (this.output === '' && this.options.contains !== true) {
        this.output = '(?![' + slash() + '])';
      }

      if (type === 'bracket' && this.options.bash === false) {
        var str = next && next.type === 'bracket' ? star() : '*?';
        if (!prev.nodes || prev.nodes[1].type !== 'posix') {
          return this.emit(str, node);
        }
      }

      var prefix = !this.dotfiles && type !== 'text' && type !== 'escape'
        ? (this.options.dot ? '(?!(?:^|[' + slash() + '])\\.{1,2}(?:$|[' + slash() + ']))' : '(?!\\.)')
        : '';

      if (isStart(prev) || (isStart(prior) && type === 'not')) {
        if (prefix !== '(?!\\.)') {
          prefix += '(?!(\\.{2}|\\.[' + slash() + ']))(?=.)';
        } else {
          prefix += '(?=.)';
        }
      } else if (prefix === '(?!\\.)') {
        prefix = '';
      }

      if (prev.type === 'not' && prior.type === 'bos' && this.options.dot === true) {
        this.output = '(?!\\.)' + this.output;
      }

      var output = prefix + star();
      if (this.options.capture) {
        output = '(' + output + ')';
      }

      return this.emit(output, node);
    })

    /**
     * Text
     */

    .set('text', function(node) {
      return this.emit(node.val, node);
    })

    /**
     * End-of-string
     */

    .set('eos', function(node) {
      var prev = this.prev();
      var val = node.val;

      this.output = '(?:\\.[' + slash() + '](?=.))?' + this.output;
      if (this.state.metachar && prev.type !== 'qmark' && prev.type !== 'slash') {
        val += (this.options.contains ? '[' + slash() + ']?' : '(?:[' + slash() + ']|$)');
      }

      return this.emit(val, node);
    });

  /**
   * Allow custom compilers to be passed on options
   */

  if (options && typeof options.compilers === 'function') {
    options.compilers(nanomatch.compiler);
  }
};



/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexNot = __webpack_require__(32);
var toRegex = __webpack_require__(15);

/**
 * Characters to use in negation regex (we want to "not" match
 * characters that are matched by other parsers)
 */

var cached;
var NOT_REGEX = '[\\[!*+?$^"\'.\\\\/]+';
var not = createTextRegex(NOT_REGEX);

/**
 * Nanomatch parsers
 */

module.exports = function(nanomatch, options) {
  var parser = nanomatch.parser;
  var opts = parser.options;

  parser.state = {
    slashes: 0,
    paths: []
  };

  parser.ast.state = parser.state;
  parser

    /**
     * Beginning-of-string
     */

    .capture('prefix', function() {
      if (this.parsed) return;
      var m = this.match(/^\.[\\/]/);
      if (!m) return;
      this.state.strictOpen = !!this.options.strictOpen;
      this.state.addPrefix = true;
    })

    /**
     * Escape: "\\."
     */

    .capture('escape', function() {
      if (this.isInside('bracket')) return;
      var pos = this.position();
      var m = this.match(/^(?:\\(.)|([$^]))/);
      if (!m) return;

      return pos({
        type: 'escape',
        val: m[2] || m[1]
      });
    })

    /**
     * Quoted strings
     */

    .capture('quoted', function() {
      var pos = this.position();
      var m = this.match(/^["']/);
      if (!m) return;

      var quote = m[0];
      if (this.input.indexOf(quote) === -1) {
        return pos({
          type: 'escape',
          val: quote
        });
      }

      var tok = advanceTo(this.input, quote);
      this.consume(tok.len);

      return pos({
        type: 'quoted',
        val: tok.esc
      });
    })

    /**
     * Negations: "!"
     */

    .capture('not', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(this.notRegex || /^!+/);
      if (!m) return;
      var val = m[0];

      var isNegated = (val.length % 2) === 1;
      if (parsed === '' && !isNegated) {
        val = '';
      }

      // if nothing has been parsed, we know `!` is at the start,
      // so we need to wrap the result in a negation regex
      if (parsed === '' && isNegated && this.options.nonegate !== true) {
        this.bos.val = '(?!^(?:';
        this.append = ')$).*';
        val = '';
      }
      return pos({
        type: 'not',
        val: val
      });
    })

    /**
     * Dot: "."
     */

    .capture('dot', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^\.+/);
      if (!m) return;

      var val = m[0];
      this.state.dot = val === '.' && (parsed === '' || parsed.slice(-1) === '/');

      return pos({
        type: 'dot',
        dotfiles: this.state.dot,
        val: val
      });
    })

    /**
     * Plus: "+"
     */

    .capture('plus', /^\+(?!\()/)

    /**
     * Question mark: "?"
     */

    .capture('qmark', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^\?+(?!\()/);
      if (!m) return;

      this.state.metachar = true;
      this.state.qmark = true;

      return pos({
        type: 'qmark',
        parsed: parsed,
        val: m[0]
      });
    })

    /**
     * Globstar: "**"
     */

    .capture('globstar', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^\*{2}(?![*(])(?=[,)/]|$)/);
      if (!m) return;

      var type = opts.noglobstar !== true ? 'globstar' : 'star';
      var node = pos({type: type, parsed: parsed});
      this.state.metachar = true;

      while (this.input.slice(0, 4) === '/**/') {
        this.input = this.input.slice(3);
      }

      node.isInside = {
        brace: this.isInside('brace'),
        paren: this.isInside('paren')
      };

      if (type === 'globstar') {
        this.state.globstar = true;
        node.val = '**';

      } else {
        this.state.star = true;
        node.val = '*';
      }

      return node;
    })

    /**
     * Star: "*"
     */

    .capture('star', function() {
      var pos = this.position();
      var starRe = /^(?:\*(?![*(])|[*]{3,}(?!\()|[*]{2}(?![(/]|$)|\*(?=\*\())/;
      var m = this.match(starRe);
      if (!m) return;

      this.state.metachar = true;
      this.state.star = true;
      return pos({
        type: 'star',
        val: m[0]
      });
    })

    /**
     * Slash: "/"
     */

    .capture('slash', function() {
      var pos = this.position();
      var m = this.match(/^\//);
      if (!m) return;

      this.state.slashes++;
      return pos({
        type: 'slash',
        val: m[0]
      });
    })

    /**
     * Backslash: "\\"
     */

    .capture('backslash', function() {
      var pos = this.position();
      var m = this.match(/^\\(?![*+?(){}[\]'"])/);
      if (!m) return;

      var val = m[0];

      if (this.isInside('bracket')) {
        val = '\\';
      } else if (val.length > 1) {
        val = '\\\\';
      }

      return pos({
        type: 'backslash',
        val: val
      });
    })

    /**
     * Square: "[.]"
     */

    .capture('square', function() {
      if (this.isInside('bracket')) return;
      var pos = this.position();
      var m = this.match(/^\[([^!^\\])\]/);
      if (!m) return;

      return pos({
        type: 'square',
        val: m[1]
      });
    })

    /**
     * Brackets: "[...]" (basic, this can be overridden by other parsers)
     */

    .capture('bracket', function() {
      var pos = this.position();
      var m = this.match(/^(?:\[([!^]?)([^\]]+|\]-)(\]|[^*+?]+)|\[)/);
      if (!m) return;

      var val = m[0];
      var negated = m[1] ? '^' : '';
      var inner = (m[2] || '').replace(/\\\\+/, '\\\\');
      var close = m[3] || '';

      if (m[2] && inner.length < m[2].length) {
        val = val.replace(/\\\\+/, '\\\\');
      }

      var esc = this.input.slice(0, 2);
      if (inner === '' && esc === '\\]') {
        inner += esc;
        this.consume(2);

        var str = this.input;
        var idx = -1;
        var ch;

        while ((ch = str[++idx])) {
          this.consume(1);
          if (ch === ']') {
            close = ch;
            break;
          }
          inner += ch;
        }
      }

      return pos({
        type: 'bracket',
        val: val,
        escaped: close !== ']',
        negated: negated,
        inner: inner,
        close: close
      });
    })

    /**
     * Text
     */

    .capture('text', function() {
      if (this.isInside('bracket')) return;
      var pos = this.position();
      var m = this.match(not);
      if (!m || !m[0]) return;

      return pos({
        type: 'text',
        val: m[0]
      });
    });

  /**
   * Allow custom parsers to be passed on options
   */

  if (options && typeof options.parsers === 'function') {
    options.parsers(nanomatch.parser);
  }
};

/**
 * Advance to the next non-escaped character
 */

function advanceTo(input, endChar) {
  var ch = input.charAt(0);
  var tok = { len: 1, val: '', esc: '' };
  var idx = 0;

  function advance() {
    if (ch !== '\\') {
      tok.esc += '\\' + ch;
      tok.val += ch;
    }

    ch = input.charAt(++idx);
    tok.len++;

    if (ch === '\\') {
      advance();
      advance();
    }
  }

  while (ch && ch !== endChar) {
    advance();
  }
  return tok;
}

/**
 * Create text regex
 */

function createTextRegex(pattern) {
  if (cached) return cached;
  var opts = {contains: true, strictClose: false};
  var not = regexNot.create(pattern, opts);
  var re = toRegex('^(?:[*]\\((?=.)|' + not + ')', opts);
  return (cached = re);
}

/**
 * Expose negation string
 */

module.exports.not = NOT_REGEX;


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = new (__webpack_require__(141))();


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * fragment-cache <https://github.com/jonschlinkert/fragment-cache>
 *
 * Copyright (c) 2016-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var MapCache = __webpack_require__(134);

/**
 * Create a new `FragmentCache` with an optional object to use for `caches`.
 *
 * ```js
 * var fragment = new FragmentCache();
 * ```
 * @name FragmentCache
 * @param {String} `cacheName`
 * @return {Object} Returns the [map-cache][] instance.
 * @api public
 */

function FragmentCache(caches) {
  this.caches = caches || {};
}

/**
 * Prototype
 */

FragmentCache.prototype = {

  /**
   * Get cache `name` from the `fragment.caches` object. Creates a new
   * `MapCache` if it doesn't already exist.
   *
   * ```js
   * var cache = fragment.cache('files');
   * console.log(fragment.caches.hasOwnProperty('files'));
   * //=> true
   * ```
   * @name .cache
   * @param {String} `cacheName`
   * @return {Object} Returns the [map-cache][] instance.
   * @api public
   */

  cache: function(cacheName) {
    return this.caches[cacheName] || (this.caches[cacheName] = new MapCache());
  },

  /**
   * Set a value for property `key` on cache `name`
   *
   * ```js
   * fragment.set('files', 'somefile.js', new File({path: 'somefile.js'}));
   * ```
   * @name .set
   * @param {String} `name`
   * @param {String} `key` Property name to set
   * @param {any} `val` The value of `key`
   * @return {Object} The cache instance for chaining
   * @api public
   */

  set: function(cacheName, key, val) {
    var cache = this.cache(cacheName);
    cache.set(key, val);
    return cache;
  },

  /**
   * Returns true if a non-undefined value is set for `key` on fragment cache `name`.
   *
   * ```js
   * var cache = fragment.cache('files');
   * cache.set('somefile.js');
   *
   * console.log(cache.has('somefile.js'));
   * //=> true
   *
   * console.log(cache.has('some-other-file.js'));
   * //=> false
   * ```
   * @name .has
   * @param {String} `name` Cache name
   * @param {String} `key` Optionally specify a property to check for on cache `name`
   * @return {Boolean}
   * @api public
   */

  has: function(cacheName, key) {
    return typeof this.get(cacheName, key) !== 'undefined';
  },

  /**
   * Get `name`, or if specified, the value of `key`. Invokes the [cache]() method,
   * so that cache `name` will be created it doesn't already exist. If `key` is not passed,
   * the entire cache (`name`) is returned.
   *
   * ```js
   * var Vinyl = require('vinyl');
   * var cache = fragment.cache('files');
   * cache.set('somefile.js', new Vinyl({path: 'somefile.js'}));
   * console.log(cache.get('somefile.js'));
   * //=> <File "somefile.js">
   * ```
   * @name .get
   * @param {String} `name`
   * @return {Object} Returns cache `name`, or the value of `key` if specified
   * @api public
   */

  get: function(name, key) {
    var cache = this.cache(name);
    if (typeof key === 'string') {
      return cache.get(key);
    }
    return cache;
  }
};

/**
 * Expose `FragmentCache`
 */

exports = module.exports = FragmentCache;


/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports;
var path = __webpack_require__(5);

/**
 * Module dependencies
 */

var isWindows = __webpack_require__(143)();
var Snapdragon = __webpack_require__(57);
utils.define = __webpack_require__(22);
utils.diff = __webpack_require__(144);
utils.extend = __webpack_require__(28);
utils.pick = __webpack_require__(145);
utils.typeOf = __webpack_require__(25);
utils.unique = __webpack_require__(33);

/**
 * Returns true if the given value is effectively an empty string
 */

utils.isEmptyString = function(val) {
  return String(val) === '' || String(val) === './';
};

/**
 * Returns true if the platform is windows, or `path.sep` is `\\`.
 * This is defined as a function to allow `path.sep` to be set in unit tests,
 * or by the user, if there is a reason to do so.
 * @return {Boolean}
 */

utils.isWindows = function() {
  return path.sep === '\\' || isWindows === true;
};

/**
 * Return the last element from an array
 */

utils.last = function(arr, n) {
  return arr[arr.length - (n || 1)];
};

/**
 * Get the `Snapdragon` instance to use
 */

utils.instantiate = function(ast, options) {
  var snapdragon;
  // if an instance was created by `.parse`, use that instance
  if (utils.typeOf(ast) === 'object' && ast.snapdragon) {
    snapdragon = ast.snapdragon;
  // if the user supplies an instance on options, use that instance
  } else if (utils.typeOf(options) === 'object' && options.snapdragon) {
    snapdragon = options.snapdragon;
  // create a new instance
  } else {
    snapdragon = new Snapdragon(options);
  }

  utils.define(snapdragon, 'parse', function(str, options) {
    var parsed = Snapdragon.prototype.parse.call(this, str, options);
    parsed.input = str;

    // escape unmatched brace/bracket/parens
    var last = this.parser.stack.pop();
    if (last && this.options.strictErrors !== true) {
      var open = last.nodes[0];
      var inner = last.nodes[1];
      if (last.type === 'bracket') {
        if (inner.val.charAt(0) === '[') {
          inner.val = '\\' + inner.val;
        }

      } else {
        open.val = '\\' + open.val;
        var sibling = open.parent.nodes[1];
        if (sibling.type === 'star') {
          sibling.loose = true;
        }
      }
    }

    // add non-enumerable parser reference
    utils.define(parsed, 'parser', this.parser);
    return parsed;
  });

  return snapdragon;
};

/**
 * Create the key to use for memoization. The key is generated
 * by iterating over the options and concatenating key-value pairs
 * to the pattern string.
 */

utils.createKey = function(pattern, options) {
  if (typeof options === 'undefined') {
    return pattern;
  }
  var key = pattern;
  for (var prop in options) {
    if (options.hasOwnProperty(prop)) {
      key += ';' + prop + '=' + String(options[prop]);
    }
  }
  return key;
};

/**
 * Cast `val` to an array
 * @return {Array}
 */

utils.arrayify = function(val) {
  if (typeof val === 'string') return [val];
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Return true if `val` is a non-empty string
 */

utils.isString = function(val) {
  return typeof val === 'string';
};

/**
 * Return true if `val` is a non-empty string
 */

utils.isRegex = function(val) {
  return utils.typeOf(val) === 'regexp';
};

/**
 * Return true if `val` is a non-empty string
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Escape regex characters in the given string
 */

utils.escapeRegex = function(str) {
  return str.replace(/[-[\]{}()^$|*+?.\\/\s]/g, '\\$&');
};

/**
 * Combines duplicate characters in the provided `input` string.
 * @param {String} `input`
 * @returns {String}
 */

utils.combineDupes = function(input, patterns) {
  patterns = utils.arrayify(patterns).join('|').split('|');
  patterns = patterns.map(function(s) {
    return s.replace(/\\?([+*\\/])/g, '\\$1');
  });
  var substr = patterns.join('|');
  var regex = new RegExp('(' + substr + ')(?=\\1)', 'g');
  return input.replace(regex, '');
};

/**
 * Returns true if the given `str` has special characters
 */

utils.hasSpecialChars = function(str) {
  return /(?:(?:(^|\/)[!.])|[*?+()|[\]{}]|[+@]\()/.test(str);
};

/**
 * Normalize slashes in the given filepath.
 *
 * @param {String} `filepath`
 * @return {String}
 */

utils.toPosixPath = function(str) {
  return str.replace(/\\+/g, '/');
};

/**
 * Strip backslashes before special characters in a string.
 *
 * @param {String} `str`
 * @return {String}
 */

utils.unescape = function(str) {
  return utils.toPosixPath(str.replace(/\\(?=[*+?!.])/g, ''));
};

/**
 * Strip the drive letter from a windows filepath
 * @param {String} `fp`
 * @return {String}
 */

utils.stripDrive = function(fp) {
  return utils.isWindows() ? fp.replace(/^[a-z]:[\\/]+?/i, '/') : fp;
};

/**
 * Strip the prefix from a filepath
 * @param {String} `fp`
 * @return {String}
 */

utils.stripPrefix = function(str) {
  if (str.charAt(0) === '.' && (str.charAt(1) === '/' || str.charAt(1) === '\\')) {
    return str.slice(2);
  }
  return str;
};

/**
 * Returns true if `str` is a common character that doesn't need
 * to be processed to be used for matching.
 * @param {String} `str`
 * @return {Boolean}
 */

utils.isSimpleChar = function(str) {
  return str.trim() === '' || str === '.';
};

/**
 * Returns true if the given str is an escaped or
 * unescaped path character
 */

utils.isSlash = function(str) {
  return str === '/' || str === '\\/' || str === '\\' || str === '\\\\';
};

/**
 * Returns a function that returns true if the given
 * pattern matches or contains a `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.matchPath = function(pattern, options) {
  return (options && options.contains)
    ? utils.containsPattern(pattern, options)
    : utils.equalsPattern(pattern, options);
};

/**
 * Returns true if the given (original) filepath or unixified path are equal
 * to the given pattern.
 */

utils._equals = function(filepath, unixPath, pattern) {
  return pattern === filepath || pattern === unixPath;
};

/**
 * Returns true if the given (original) filepath or unixified path contain
 * the given pattern.
 */

utils._contains = function(filepath, unixPath, pattern) {
  return filepath.indexOf(pattern) !== -1 || unixPath.indexOf(pattern) !== -1;
};

/**
 * Returns a function that returns true if the given
 * pattern is the same as a given `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.equalsPattern = function(pattern, options) {
  var unixify = utils.unixify(options);
  options = options || {};

  return function fn(filepath) {
    var equal = utils._equals(filepath, unixify(filepath), pattern);
    if (equal === true || options.nocase !== true) {
      return equal;
    }
    var lower = filepath.toLowerCase();
    return utils._equals(lower, unixify(lower), pattern);
  };
};

/**
 * Returns a function that returns true if the given
 * pattern contains a `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.containsPattern = function(pattern, options) {
  var unixify = utils.unixify(options);
  options = options || {};

  return function(filepath) {
    var contains = utils._contains(filepath, unixify(filepath), pattern);
    if (contains === true || options.nocase !== true) {
      return contains;
    }
    var lower = filepath.toLowerCase();
    return utils._contains(lower, unixify(lower), pattern);
  };
};

/**
 * Returns a function that returns true if the given
 * regex matches the `filename` of a file path.
 *
 * @param {RegExp} `re` Matching regex
 * @return {Function}
 */

utils.matchBasename = function(re) {
  return function(filepath) {
    return re.test(filepath) || re.test(path.basename(filepath));
  };
};

/**
 * Returns the given value unchanced.
 * @return {any}
 */

utils.identity = function(val) {
  return val;
};

/**
 * Determines the filepath to return based on the provided options.
 * @return {any}
 */

utils.value = function(str, unixify, options) {
  if (options && options.unixify === false) {
    return str;
  }
  if (options && typeof options.unixify === 'function') {
    return options.unixify(str);
  }
  return unixify(str);
};

/**
 * Returns a function that normalizes slashes in a string to forward
 * slashes, strips `./` from beginning of paths, and optionally unescapes
 * special characters.
 * @return {Function}
 */

utils.unixify = function(options) {
  var opts = options || {};
  return function(filepath) {
    if (opts.stripPrefix !== false) {
      filepath = utils.stripPrefix(filepath);
    }
    if (opts.unescape === true) {
      filepath = utils.unescape(filepath);
    }
    if (opts.unixify === true || utils.isWindows()) {
      filepath = utils.toPosixPath(filepath);
    }
    return filepath;
  };
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * is-windows <https://github.com/jonschlinkert/is-windows>
 *
 * Copyright © 2015-2018, Jon Schlinkert.
 * Released under the MIT License.
 */

(function(factory) {
  if (exports && typeof exports === 'object' && typeof module !== 'undefined') {
    module.exports = factory();
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(function() {
  'use strict';
  return function isWindows() {
    return process && (process.platform === 'win32' || /^(msys|cygwin)$/.test(process.env.OSTYPE));
  };
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * arr-diff <https://github.com/jonschlinkert/arr-diff>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function diff(arr/*, arrays*/) {
  var len = arguments.length;
  var idx = 0;
  while (++idx < len) {
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
};

function diffArray(one, two) {
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var tlen = two.length
  var olen = one.length;
  var idx = -1;
  var arr = [];

  while (++idx < olen) {
    var ele = one[idx];

    var hasEle = false;
    for (var i = 0; i < tlen; i++) {
      var val = two[i];

      if (ele === val) {
        hasEle = true;
        break;
      }
    }

    if (hasEle === false) {
      arr.push(ele);
    }
  }
  return arr;
}


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * object.pick <https://github.com/jonschlinkert/object.pick>
 *
 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */



var isObject = __webpack_require__(23);

module.exports = function pick(obj, keys) {
  if (!isObject(obj) && typeof obj !== 'function') {
    return {};
  }

  var res = {};
  if (typeof keys === 'string') {
    if (keys in obj) {
      res[keys] = obj[keys];
    }
    return res;
  }

  var len = keys.length;
  var idx = -1;

  while (++idx < len) {
    var key = keys[idx];
    if (key in obj) {
      res[key] = obj[key];
    }
  }
  return res;
};


/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */

var extend = __webpack_require__(147);
var unique = __webpack_require__(33);
var toRegex = __webpack_require__(15);

/**
 * Local dependencies
 */

var compilers = __webpack_require__(148);
var parsers = __webpack_require__(156);
var Extglob = __webpack_require__(162);
var utils = __webpack_require__(161);
var MAX_LENGTH = 1024 * 64;

/**
 * Convert the given `extglob` pattern into a regex-compatible string. Returns
 * an object with the compiled result and the parsed AST.
 *
 * ```js
 * var extglob = require('extglob');
 * console.log(extglob('*.!(*a)'));
 * //=> '(?!\\.)[^/]*?\\.(?!(?!\\.)[^/]*?a\\b).*?'
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

function extglob(pattern, options) {
  return extglob.create(pattern, options).output;
}

/**
 * Takes an array of strings and an extglob pattern and returns a new
 * array that contains only the strings that match the pattern.
 *
 * ```js
 * var extglob = require('extglob');
 * console.log(extglob.match(['a.a', 'a.b', 'a.c'], '*.!(*a)'));
 * //=> ['a.b', 'a.c']
 * ```
 * @param {Array} `list` Array of strings to match
 * @param {String} `pattern` Extglob pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of matches
 * @api public
 */

extglob.match = function(list, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  list = utils.arrayify(list);
  var isMatch = extglob.matcher(pattern, options);
  var len = list.length;
  var idx = -1;
  var matches = [];

  while (++idx < len) {
    var ele = list[idx];

    if (isMatch(ele)) {
      matches.push(ele);
    }
  }

  // if no options were passed, uniquify results and return
  if (typeof options === 'undefined') {
    return unique(matches);
  }

  if (matches.length === 0) {
    if (options.failglob === true) {
      throw new Error('no matches found for "' + pattern + '"');
    }
    if (options.nonull === true || options.nullglob === true) {
      return [pattern.split('\\').join('')];
    }
  }

  return options.nodupes !== false ? unique(matches) : matches;
};

/**
 * Returns true if the specified `string` matches the given
 * extglob `pattern`.
 *
 * ```js
 * var extglob = require('extglob');
 *
 * console.log(extglob.isMatch('a.a', '*.!(*a)'));
 * //=> false
 * console.log(extglob.isMatch('a.b', '*.!(*a)'));
 * //=> true
 * ```
 * @param {String} `string` String to match
 * @param {String} `pattern` Extglob pattern
 * @param {String} `options`
 * @return {Boolean}
 * @api public
 */

extglob.isMatch = function(str, pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  if (pattern === str) {
    return true;
  }

  if (pattern === '' || pattern === ' ' || pattern === '.') {
    return pattern === str;
  }

  var isMatch = utils.memoize('isMatch', pattern, options, extglob.matcher);
  return isMatch(str);
};

/**
 * Returns true if the given `string` contains the given pattern. Similar to `.isMatch` but
 * the pattern can match any part of the string.
 *
 * ```js
 * var extglob = require('extglob');
 * console.log(extglob.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(extglob.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {Object} `options`
 * @return {Boolean} Returns true if the patter matches any part of `str`.
 * @api public
 */

extglob.contains = function(str, pattern, options) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  if (pattern === '' || pattern === ' ' || pattern === '.') {
    return pattern === str;
  }

  var opts = extend({}, options, {contains: true});
  opts.strictClose = false;
  opts.strictOpen = false;
  return extglob.isMatch(str, pattern, opts);
};

/**
 * Takes an extglob pattern and returns a matcher function. The returned
 * function takes the string to match as its only argument.
 *
 * ```js
 * var extglob = require('extglob');
 * var isMatch = extglob.matcher('*.!(*a)');
 *
 * console.log(isMatch('a.a'));
 * //=> false
 * console.log(isMatch('a.b'));
 * //=> true
 * ```
 * @param {String} `pattern` Extglob pattern
 * @param {String} `options`
 * @return {Boolean}
 * @api public
 */

extglob.matcher = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  function matcher() {
    var re = extglob.makeRe(pattern, options);
    return function(str) {
      return re.test(str);
    };
  }

  return utils.memoize('matcher', pattern, options, matcher);
};

/**
 * Convert the given `extglob` pattern into a regex-compatible string. Returns
 * an object with the compiled result and the parsed AST.
 *
 * ```js
 * var extglob = require('extglob');
 * console.log(extglob.create('*.!(*a)').output);
 * //=> '(?!\\.)[^/]*?\\.(?!(?!\\.)[^/]*?a\\b).*?'
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */

extglob.create = function(pattern, options) {
  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  function create() {
    var ext = new Extglob(options);
    var ast = ext.parse(pattern, options);
    return ext.compile(ast, options);
  }

  return utils.memoize('create', pattern, options, create);
};

/**
 * Returns an array of matches captured by `pattern` in `string`, or `null`
 * if the pattern did not match.
 *
 * ```js
 * var extglob = require('extglob');
 * extglob.capture(pattern, string[, options]);
 *
 * console.log(extglob.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(extglob.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `pattern` Glob pattern to use for matching.
 * @param {String} `string` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns an array of captures if the string matches the glob pattern, otherwise `null`.
 * @api public
 */

extglob.capture = function(pattern, str, options) {
  var re = extglob.makeRe(pattern, extend({capture: true}, options));

  function match() {
    return function(string) {
      var match = re.exec(string);
      if (!match) {
        return null;
      }

      return match.slice(1);
    };
  }

  var capture = utils.memoize('capture', pattern, options, match);
  return capture(str);
};

/**
 * Create a regular expression from the given `pattern` and `options`.
 *
 * ```js
 * var extglob = require('extglob');
 * var re = extglob.makeRe('*.!(*a)');
 * console.log(re);
 * //=> /^[^\/]*?\.(?![^\/]*?a)[^\/]*?$/
 * ```
 * @param {String} `pattern` The pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

extglob.makeRe = function(pattern, options) {
  if (pattern instanceof RegExp) {
    return pattern;
  }

  if (typeof pattern !== 'string') {
    throw new TypeError('expected pattern to be a string');
  }

  if (pattern.length > MAX_LENGTH) {
    throw new Error('expected pattern to be less than ' + MAX_LENGTH + ' characters');
  }

  function makeRe() {
    var opts = extend({strictErrors: false}, options);
    if (opts.strictErrors === true) opts.strict = true;
    var res = extglob.create(pattern, opts);
    return toRegex(res.output, opts);
  }

  var regex = utils.memoize('makeRe', pattern, options, makeRe);
  if (regex.source.length > MAX_LENGTH) {
    throw new SyntaxError('potentially malicious regex detected');
  }

  return regex;
};

/**
 * Cache
 */

extglob.cache = utils.cache;
extglob.clearCache = function() {
  extglob.cache.__data__ = {};
};

/**
 * Expose `Extglob` constructor, parsers and compilers
 */

extglob.Extglob = Extglob;
extglob.compilers = compilers;
extglob.parsers = parsers;

/**
 * Expose `extglob`
 * @type {Function}
 */

module.exports = extglob;


/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(35);

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
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var brackets = __webpack_require__(149);

/**
 * Extglob compilers
 */

module.exports = function(extglob) {
  function star() {
    if (typeof extglob.options.star === 'function') {
      return extglob.options.star.apply(this, arguments);
    }
    if (typeof extglob.options.star === 'string') {
      return extglob.options.star;
    }
    return '.*?';
  }

  /**
   * Use `expand-brackets` compilers
   */

  extglob.use(brackets.compilers);
  extglob.compiler

    /**
     * Escaped: "\\*"
     */

    .set('escape', function(node) {
      return this.emit(node.val, node);
    })

    /**
     * Dot: "."
     */

    .set('dot', function(node) {
      return this.emit('\\' + node.val, node);
    })

    /**
     * Question mark: "?"
     */

    .set('qmark', function(node) {
      var val = '[^\\\\/.]';
      var prev = this.prev();

      if (node.parsed.slice(-1) === '(') {
        var ch = node.rest.charAt(0);
        if (ch !== '!' && ch !== '=' && ch !== ':') {
          return this.emit(val, node);
        }
        return this.emit(node.val, node);
      }

      if (prev.type === 'text' && prev.val) {
        return this.emit(val, node);
      }

      if (node.val.length > 1) {
        val += '{' + node.val.length + '}';
      }
      return this.emit(val, node);
    })

    /**
     * Plus: "+"
     */

    .set('plus', function(node) {
      var prev = node.parsed.slice(-1);
      if (prev === ']' || prev === ')') {
        return this.emit(node.val, node);
      }
      var ch = this.output.slice(-1);
      if (!this.output || (/[?*+]/.test(ch) && node.parent.type !== 'bracket')) {
        return this.emit('\\+', node);
      }
      if (/\w/.test(ch) && !node.inside) {
        return this.emit('+\\+?', node);
      }
      return this.emit('+', node);
    })

    /**
     * Star: "*"
     */

    .set('star', function(node) {
      var prev = this.prev();
      var prefix = prev.type !== 'text' && prev.type !== 'escape'
        ? '(?!\\.)'
        : '';

      return this.emit(prefix + star.call(this, node), node);
    })

    /**
     * Parens
     */

    .set('paren', function(node) {
      return this.mapVisit(node.nodes);
    })
    .set('paren.open', function(node) {
      var capture = this.options.capture ? '(' : '';

      switch (node.parent.prefix) {
        case '!':
        case '^':
          return this.emit(capture + '(?:(?!(?:', node);
        case '*':
        case '+':
        case '?':
        case '@':
          return this.emit(capture + '(?:', node);
        default: {
          var val = node.val;
          if (this.options.bash === true) {
            val = '\\' + val;
          } else if (!this.options.capture && val === '(' && node.parent.rest[0] !== '?') {
            val += '?:';
          }

          return this.emit(val, node);
        }
      }
    })
    .set('paren.close', function(node) {
      var capture = this.options.capture ? ')' : '';

      switch (node.prefix) {
        case '!':
        case '^':
          var prefix = /^(\)|$)/.test(node.rest) ? '$' : '';
          var str = star.call(this, node);

          // if the extglob has a slash explicitly defined, we know the user wants
          // to match slashes, so we need to ensure the "star" regex allows for it
          if (node.parent.hasSlash && !this.options.star && this.options.slash !== false) {
            str = '.*?';
          }

          return this.emit(prefix + ('))' + str + ')') + capture, node);
        case '*':
        case '+':
        case '?':
          return this.emit(')' + node.prefix + capture, node);
        case '@':
          return this.emit(')' + capture, node);
        default: {
          var val = (this.options.bash === true ? '\\' : '') + ')';
          return this.emit(val, node);
        }
      }
    })

    /**
     * Text
     */

    .set('text', function(node) {
      var val = node.val.replace(/[\[\]]/g, '\\$&');
      return this.emit(val, node);
    });
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__filename) {

/**
 * Local dependencies
 */

var compilers = __webpack_require__(150);
var parsers = __webpack_require__(152);

/**
 * Module dependencies
 */

var debug = __webpack_require__(104)('expand-brackets');
var extend = __webpack_require__(155);
var Snapdragon = __webpack_require__(57);
var toRegex = __webpack_require__(15);

/**
 * Parses the given POSIX character class `pattern` and returns a
 * string that can be used for creating regular expressions for matching.
 *
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object}
 * @api public
 */

function brackets(pattern, options) {
  debug('initializing from <%s>', __filename);
  var res = brackets.create(pattern, options);
  return res.output;
}

/**
 * Takes an array of strings and a POSIX character class pattern, and returns a new
 * array with only the strings that matched the pattern.
 *
 * ```js
 * var brackets = require('expand-brackets');
 * console.log(brackets.match(['1', 'a', 'ab'], '[[:alpha:]]'));
 * //=> ['a']
 *
 * console.log(brackets.match(['1', 'a', 'ab'], '[[:alpha:]]+'));
 * //=> ['a', 'ab']
 * ```
 * @param {Array} `arr` Array of strings to match
 * @param {String} `pattern` POSIX character class pattern(s)
 * @param {Object} `options`
 * @return {Array}
 * @api public
 */

brackets.match = function(arr, pattern, options) {
  arr = [].concat(arr);
  var opts = extend({}, options);
  var isMatch = brackets.matcher(pattern, opts);
  var len = arr.length;
  var idx = -1;
  var res = [];

  while (++idx < len) {
    var ele = arr[idx];
    if (isMatch(ele)) {
      res.push(ele);
    }
  }

  if (res.length === 0) {
    if (opts.failglob === true) {
      throw new Error('no matches found for "' + pattern + '"');
    }

    if (opts.nonull === true || opts.nullglob === true) {
      return [pattern.split('\\').join('')];
    }
  }
  return res;
};

/**
 * Returns true if the specified `string` matches the given
 * brackets `pattern`.
 *
 * ```js
 * var brackets = require('expand-brackets');
 *
 * console.log(brackets.isMatch('a.a', '[[:alpha:]].[[:alpha:]]'));
 * //=> true
 * console.log(brackets.isMatch('1.2', '[[:alpha:]].[[:alpha:]]'));
 * //=> false
 * ```
 * @param {String} `string` String to match
 * @param {String} `pattern` Poxis pattern
 * @param {String} `options`
 * @return {Boolean}
 * @api public
 */

brackets.isMatch = function(str, pattern, options) {
  return brackets.matcher(pattern, options)(str);
};

/**
 * Takes a POSIX character class pattern and returns a matcher function. The returned
 * function takes the string to match as its only argument.
 *
 * ```js
 * var brackets = require('expand-brackets');
 * var isMatch = brackets.matcher('[[:lower:]].[[:upper:]]');
 *
 * console.log(isMatch('a.a'));
 * //=> false
 * console.log(isMatch('a.A'));
 * //=> true
 * ```
 * @param {String} `pattern` Poxis pattern
 * @param {String} `options`
 * @return {Boolean}
 * @api public
 */

brackets.matcher = function(pattern, options) {
  var re = brackets.makeRe(pattern, options);
  return function(str) {
    return re.test(str);
  };
};

/**
 * Create a regular expression from the given `pattern`.
 *
 * ```js
 * var brackets = require('expand-brackets');
 * var re = brackets.makeRe('[[:alpha:]]');
 * console.log(re);
 * //=> /^(?:[a-zA-Z])$/
 * ```
 * @param {String} `pattern` The pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */

brackets.makeRe = function(pattern, options) {
  var res = brackets.create(pattern, options);
  var opts = extend({strictErrors: false}, options);
  return toRegex(res.output, opts);
};

/**
 * Parses the given POSIX character class `pattern` and returns an object
 * with the compiled `output` and optional source `map`.
 *
 * ```js
 * var brackets = require('expand-brackets');
 * console.log(brackets('[[:alpha:]]'));
 * // { options: { source: 'string' },
 * //   input: '[[:alpha:]]',
 * //   state: {},
 * //   compilers:
 * //    { eos: [Function],
 * //      noop: [Function],
 * //      bos: [Function],
 * //      not: [Function],
 * //      escape: [Function],
 * //      text: [Function],
 * //      posix: [Function],
 * //      bracket: [Function],
 * //      'bracket.open': [Function],
 * //      'bracket.inner': [Function],
 * //      'bracket.literal': [Function],
 * //      'bracket.close': [Function] },
 * //   output: '[a-zA-Z]',
 * //   ast:
 * //    { type: 'root',
 * //      errors: [],
 * //      nodes: [ [Object], [Object], [Object] ] },
 * //   parsingErrors: [] }
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object}
 * @api public
 */

brackets.create = function(pattern, options) {
  var snapdragon = (options && options.snapdragon) || new Snapdragon(options);
  compilers(snapdragon);
  parsers(snapdragon);

  var ast = snapdragon.parse(pattern, options);
  ast.input = pattern;
  var res = snapdragon.compile(ast, options);
  res.input = pattern;
  return res;
};

/**
 * Expose `brackets` constructor, parsers and compilers
 */

brackets.compilers = compilers;
brackets.parsers = parsers;

/**
 * Expose `brackets`
 * @type {Function}
 */

module.exports = brackets;

/* WEBPACK VAR INJECTION */}.call(this, "/index.js"))

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var posix = __webpack_require__(151);

module.exports = function(brackets) {
  brackets.compiler

    /**
     * Escaped characters
     */

    .set('escape', function(node) {
      return this.emit('\\' + node.val.replace(/^\\/, ''), node);
    })

    /**
     * Text
     */

    .set('text', function(node) {
      return this.emit(node.val.replace(/([{}])/g, '\\$1'), node);
    })

    /**
     * POSIX character classes
     */

    .set('posix', function(node) {
      if (node.val === '[::]') {
        return this.emit('\\[::\\]', node);
      }

      var val = posix[node.inner];
      if (typeof val === 'undefined') {
        val = '[' + node.inner + ']';
      }
      return this.emit(val, node);
    })

    /**
     * Non-posix brackets
     */

    .set('bracket', function(node) {
      return this.mapVisit(node.nodes);
    })
    .set('bracket.open', function(node) {
      return this.emit(node.val, node);
    })
    .set('bracket.inner', function(node) {
      var inner = node.val;

      if (inner === '[' || inner === ']') {
        return this.emit('\\' + node.val, node);
      }
      if (inner === '^]') {
        return this.emit('^\\]', node);
      }
      if (inner === '^') {
        return this.emit('^', node);
      }

      if (/-/.test(inner) && !/(\d-\d|\w-\w)/.test(inner)) {
        inner = inner.split('-').join('\\-');
      }

      var isNegated = inner.charAt(0) === '^';
      // add slashes to negated brackets, per spec
      if (isNegated && inner.indexOf('/') === -1) {
        inner += '/';
      }
      if (isNegated && inner.indexOf('.') === -1) {
        inner += '.';
      }

      // don't unescape `0` (octal literal)
      inner = inner.replace(/\\([1-9])/g, '$1');
      return this.emit(inner, node);
    })
    .set('bracket.close', function(node) {
      var val = node.val.replace(/^\\/, '');
      if (node.parent.escaped === true) {
        return this.emit('\\' + val, node);
      }
      return this.emit(val, node);
    });
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * POSIX character classes
 */

module.exports = {
  alnum: 'a-zA-Z0-9',
  alpha: 'a-zA-Z',
  ascii: '\\x00-\\x7F',
  blank: ' \\t',
  cntrl: '\\x00-\\x1F\\x7F',
  digit: '0-9',
  graph: '\\x21-\\x7E',
  lower: 'a-z',
  print: '\\x20-\\x7E ',
  punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
  space: ' \\t\\r\\n\\v\\f',
  upper: 'A-Z',
  word: 'A-Za-z0-9_',
  xdigit: 'A-Fa-f0-9'
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(153);
var define = __webpack_require__(154);

/**
 * Text regex
 */

var TEXT_REGEX = '(\\[(?=.*\\])|\\])+';
var not = utils.createRegex(TEXT_REGEX);

/**
 * Brackets parsers
 */

function parsers(brackets) {
  brackets.state = brackets.state || {};
  brackets.parser.sets.bracket = brackets.parser.sets.bracket || [];
  brackets.parser

    .capture('escape', function() {
      if (this.isInside('bracket')) return;
      var pos = this.position();
      var m = this.match(/^\\(.)/);
      if (!m) return;

      return pos({
        type: 'escape',
        val: m[0]
      });
    })

    /**
     * Text parser
     */

    .capture('text', function() {
      if (this.isInside('bracket')) return;
      var pos = this.position();
      var m = this.match(not);
      if (!m || !m[0]) return;

      return pos({
        type: 'text',
        val: m[0]
      });
    })

    /**
     * POSIX character classes: "[[:alpha:][:digits:]]"
     */

    .capture('posix', function() {
      var pos = this.position();
      var m = this.match(/^\[:(.*?):\](?=.*\])/);
      if (!m) return;

      var inside = this.isInside('bracket');
      if (inside) {
        brackets.posix++;
      }

      return pos({
        type: 'posix',
        insideBracket: inside,
        inner: m[1],
        val: m[0]
      });
    })

    /**
     * Bracket (noop)
     */

    .capture('bracket', function() {})

    /**
     * Open: '['
     */

    .capture('bracket.open', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^\[(?=.*\])/);
      if (!m) return;

      var prev = this.prev();
      var last = utils.last(prev.nodes);

      if (parsed.slice(-1) === '\\' && !this.isInside('bracket')) {
        last.val = last.val.slice(0, last.val.length - 1);
        return pos({
          type: 'escape',
          val: m[0]
        });
      }

      var open = pos({
        type: 'bracket.open',
        val: m[0]
      });

      if (last.type === 'bracket.open' || this.isInside('bracket')) {
        open.val = '\\' + open.val;
        open.type = 'bracket.inner';
        open.escaped = true;
        return open;
      }

      var node = pos({
        type: 'bracket',
        nodes: [open]
      });

      define(node, 'parent', prev);
      define(open, 'parent', node);
      this.push('bracket', node);
      prev.nodes.push(node);
    })

    /**
     * Bracket text
     */

    .capture('bracket.inner', function() {
      if (!this.isInside('bracket')) return;
      var pos = this.position();
      var m = this.match(not);
      if (!m || !m[0]) return;

      var next = this.input.charAt(0);
      var val = m[0];

      var node = pos({
        type: 'bracket.inner',
        val: val
      });

      if (val === '\\\\') {
        return node;
      }

      var first = val.charAt(0);
      var last = val.slice(-1);

      if (first === '!') {
        val = '^' + val.slice(1);
      }

      if (last === '\\' || (val === '^' && next === ']')) {
        val += this.input[0];
        this.consume(1);
      }

      node.val = val;
      return node;
    })

    /**
     * Close: ']'
     */

    .capture('bracket.close', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^\]/);
      if (!m) return;

      var prev = this.prev();
      var last = utils.last(prev.nodes);

      if (parsed.slice(-1) === '\\' && !this.isInside('bracket')) {
        last.val = last.val.slice(0, last.val.length - 1);

        return pos({
          type: 'escape',
          val: m[0]
        });
      }

      var node = pos({
        type: 'bracket.close',
        rest: this.input,
        val: m[0]
      });

      if (last.type === 'bracket.open') {
        node.type = 'bracket.inner';
        node.escaped = true;
        return node;
      }

      var bracket = this.pop('bracket');
      if (!this.isType(bracket, 'bracket')) {
        if (this.options.strict) {
          throw new Error('missing opening "["');
        }
        node.type = 'bracket.inner';
        node.escaped = true;
        return node;
      }

      bracket.nodes.push(node);
      define(node, 'parent', bracket);
    });
}

/**
 * Brackets parsers
 */

module.exports = parsers;

/**
 * Expose text regex
 */

module.exports.TEXT_REGEX = TEXT_REGEX;


/***/ }),
/* 153 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toRegex = __webpack_require__(15);
var regexNot = __webpack_require__(32);
var cached;

/**
 * Get the last element from `array`
 * @param {Array} `array`
 * @return {*}
 */

exports.last = function(arr) {
  return arr[arr.length - 1];
};

/**
 * Create and cache regex to use for text nodes
 */

exports.createRegex = function(pattern, include) {
  if (cached) return cached;
  var opts = {contains: true, strictClose: false};
  var not = regexNot.create(pattern, opts);
  var re;

  if (typeof include === 'string') {
    re = toRegex('^(?:' + include + '|' + not + ')', opts);
  } else {
    re = toRegex(not, opts);
  }

  return (cached = re);
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var isDescriptor = __webpack_require__(89);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(35);

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
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var brackets = __webpack_require__(149);
var define = __webpack_require__(157);
var utils = __webpack_require__(161);

/**
 * Characters to use in text regex (we want to "not" match
 * characters that are matched by other parsers)
 */

var TEXT_REGEX = '([!@*?+]?\\(|\\)|[*?.+\\\\]|\\[:?(?=.*\\])|:?\\])+';
var not = utils.createRegex(TEXT_REGEX);

/**
 * Extglob parsers
 */

function parsers(extglob) {
  extglob.state = extglob.state || {};

  /**
   * Use `expand-brackets` parsers
   */

  extglob.use(brackets.parsers);
  extglob.parser.sets.paren = extglob.parser.sets.paren || [];
  extglob.parser

    /**
     * Extglob open: "*("
     */

    .capture('paren.open', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^([!@*?+])?\(/);
      if (!m) return;

      var prev = this.prev();
      var prefix = m[1];
      var val = m[0];

      var open = pos({
        type: 'paren.open',
        parsed: parsed,
        val: val
      });

      var node = pos({
        type: 'paren',
        prefix: prefix,
        nodes: [open]
      });

      // if nested negation extglobs, just cancel them out to simplify
      if (prefix === '!' && prev.type === 'paren' && prev.prefix === '!') {
        prev.prefix = '@';
        node.prefix = '@';
      }

      define(node, 'rest', this.input);
      define(node, 'parsed', parsed);
      define(node, 'parent', prev);
      define(open, 'parent', node);

      this.push('paren', node);
      prev.nodes.push(node);
    })

    /**
     * Extglob close: ")"
     */

    .capture('paren.close', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^\)/);
      if (!m) return;

      var parent = this.pop('paren');
      var node = pos({
        type: 'paren.close',
        rest: this.input,
        parsed: parsed,
        val: m[0]
      });

      if (!this.isType(parent, 'paren')) {
        if (this.options.strict) {
          throw new Error('missing opening paren: "("');
        }
        node.escaped = true;
        return node;
      }

      node.prefix = parent.prefix;
      parent.nodes.push(node);
      define(node, 'parent', parent);
    })

    /**
     * Escape: "\\."
     */

    .capture('escape', function() {
      var pos = this.position();
      var m = this.match(/^\\(.)/);
      if (!m) return;

      return pos({
        type: 'escape',
        val: m[0],
        ch: m[1]
      });
    })

    /**
     * Question marks: "?"
     */

    .capture('qmark', function() {
      var parsed = this.parsed;
      var pos = this.position();
      var m = this.match(/^\?+(?!\()/);
      if (!m) return;
      extglob.state.metachar = true;
      return pos({
        type: 'qmark',
        rest: this.input,
        parsed: parsed,
        val: m[0]
      });
    })

    /**
     * Character parsers
     */

    .capture('star', /^\*(?!\()/)
    .capture('plus', /^\+(?!\()/)
    .capture('dot', /^\./)
    .capture('text', not);
};

/**
 * Expose text regex string
 */

module.exports.TEXT_REGEX = TEXT_REGEX;

/**
 * Extglob parsers
 */

module.exports = parsers;


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * define-property <https://github.com/jonschlinkert/define-property>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isDescriptor = __webpack_require__(158);

module.exports = function defineProperty(obj, prop, val) {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    throw new TypeError('expected an object or function.');
  }

  if (typeof prop !== 'string') {
    throw new TypeError('expected `prop` to be a string.');
  }

  if (isDescriptor(val) && ('set' in val || 'get' in val)) {
    return Object.defineProperty(obj, prop, val);
  }

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  });
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-descriptor <https://github.com/jonschlinkert/is-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);
var isAccessor = __webpack_require__(159);
var isData = __webpack_require__(160);

module.exports = function isDescriptor(obj, key) {
  if (typeOf(obj) !== 'object') {
    return false;
  }
  if ('get' in obj) {
    return isAccessor(obj, key);
  }
  return isData(obj, key);
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

// accessor descriptor properties
var accessor = {
  get: 'function',
  set: 'function',
  configurable: 'boolean',
  enumerable: 'boolean'
};

function isAccessorDescriptor(obj, prop) {
  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (has(obj, 'value') || has(obj, 'writable')) {
    return false;
  }

  if (!has(obj, 'get') || typeof obj.get !== 'function') {
    return false;
  }

  // tldr: it's valid to have "set" be undefined
  // "set" might be undefined if `Object.getOwnPropertyDescriptor`
  // was used to get the value, and only `get` was defined by the user
  if (has(obj, 'set') && typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
    return false;
  }

  for (var key in obj) {
    if (!accessor.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === accessor[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
}

function has(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}

/**
 * Expose `isAccessorDescriptor`
 */

module.exports = isAccessorDescriptor;


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
 *
 * Copyright (c) 2015-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var typeOf = __webpack_require__(25);

module.exports = function isDataDescriptor(obj, prop) {
  // data descriptor properties
  var data = {
    configurable: 'boolean',
    enumerable: 'boolean',
    writable: 'boolean'
  };

  if (typeOf(obj) !== 'object') {
    return false;
  }

  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop);
    return typeof val !== 'undefined';
  }

  if (!('value' in obj) && !('writable' in obj)) {
    return false;
  }

  for (var key in obj) {
    if (key === 'value') continue;

    if (!data.hasOwnProperty(key)) {
      continue;
    }

    if (typeOf(obj[key]) === data[key]) {
      continue;
    }

    if (typeof obj[key] !== 'undefined') {
      return false;
    }
  }
  return true;
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regex = __webpack_require__(32);
var Cache = __webpack_require__(141);

/**
 * Utils
 */

var utils = module.exports;
var cache = utils.cache = new Cache();

/**
 * Cast `val` to an array
 * @return {Array}
 */

utils.arrayify = function(val) {
  if (!Array.isArray(val)) {
    return [val];
  }
  return val;
};

/**
 * Memoize a generated regex or function
 */

utils.memoize = function(type, pattern, options, fn) {
  var key = utils.createKey(type + pattern, options);

  if (cache.has(type, key)) {
    return cache.get(type, key);
  }

  var val = fn(pattern, options);
  if (options && options.cache === false) {
    return val;
  }

  cache.set(type, key, val);
  return val;
};

/**
 * Create the key to use for memoization. The key is generated
 * by iterating over the options and concatenating key-value pairs
 * to the pattern string.
 */

utils.createKey = function(pattern, options) {
  var key = pattern;
  if (typeof options === 'undefined') {
    return key;
  }
  for (var prop in options) {
    key += ';' + prop + '=' + String(options[prop]);
  }
  return key;
};

/**
 * Create the regex to use for matching text
 */

utils.createRegex = function(str) {
  var opts = {contains: true, strictClose: false};
  return regex(str, opts);
};


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies
 */

var Snapdragon = __webpack_require__(57);
var define = __webpack_require__(157);
var extend = __webpack_require__(147);

/**
 * Local dependencies
 */

var compilers = __webpack_require__(148);
var parsers = __webpack_require__(156);

/**
 * Customize Snapdragon parser and renderer
 */

function Extglob(options) {
  this.options = extend({source: 'extglob'}, options);
  this.snapdragon = this.options.snapdragon || new Snapdragon(this.options);
  this.snapdragon.patterns = this.snapdragon.patterns || {};
  this.compiler = this.snapdragon.compiler;
  this.parser = this.snapdragon.parser;

  compilers(this.snapdragon);
  parsers(this.snapdragon);

  /**
   * Override Snapdragon `.parse` method
   */

  define(this.snapdragon, 'parse', function(str, options) {
    var parsed = Snapdragon.prototype.parse.apply(this, arguments);
    parsed.input = str;

    // escape unmatched brace/bracket/parens
    var last = this.parser.stack.pop();
    if (last && this.options.strict !== true) {
      var node = last.nodes[0];
      node.val = '\\' + node.val;
      var sibling = node.parent.nodes[1];
      if (sibling.type === 'star') {
        sibling.loose = true;
      }
    }

    // add non-enumerable parser reference
    define(parsed, 'parser', this.parser);
    return parsed;
  });

  /**
   * Decorate `.parse` method
   */

  define(this, 'parse', function(ast, options) {
    return this.snapdragon.parse.apply(this.snapdragon, arguments);
  });

  /**
   * Decorate `.compile` method
   */

  define(this, 'compile', function(ast, options) {
    return this.snapdragon.compile.apply(this.snapdragon, arguments);
  });

}

/**
 * Expose `Extglob`
 */

module.exports = Extglob;


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extglob = __webpack_require__(146);
var nanomatch = __webpack_require__(137);
var regexNot = __webpack_require__(32);
var toRegex = __webpack_require__(15);
var not;

/**
 * Characters to use in negation regex (we want to "not" match
 * characters that are matched by other parsers)
 */

var TEXT = '([!@*?+]?\\(|\\)|\\[:?(?=.*?:?\\])|:?\\]|[*+?!^$.\\\\/])+';
var createNotRegex = function(opts) {
  return not || (not = textRegex(TEXT));
};

/**
 * Parsers
 */

module.exports = function(snapdragon) {
  var parsers = snapdragon.parser.parsers;

  // register nanomatch parsers
  snapdragon.use(nanomatch.parsers);

  // get references to some specific nanomatch parsers before they
  // are overridden by the extglob and/or parsers
  var escape = parsers.escape;
  var slash = parsers.slash;
  var qmark = parsers.qmark;
  var plus = parsers.plus;
  var star = parsers.star;
  var dot = parsers.dot;

  // register extglob parsers
  snapdragon.use(extglob.parsers);

  // custom micromatch parsers
  snapdragon.parser
    .use(function() {
      // override "notRegex" created in nanomatch parser
      this.notRegex = /^\!+(?!\()/;
    })
    // reset the referenced parsers
    .capture('escape', escape)
    .capture('slash', slash)
    .capture('qmark', qmark)
    .capture('star', star)
    .capture('plus', plus)
    .capture('dot', dot)

    /**
     * Override `text` parser
     */

    .capture('text', function() {
      if (this.isInside('bracket')) return;
      var pos = this.position();
      var m = this.match(createNotRegex(this.options));
      if (!m || !m[0]) return;

      // escape regex boundary characters and simple brackets
      var val = m[0].replace(/([[\]^$])/g, '\\$1');

      return pos({
        type: 'text',
        val: val
      });
    });
};

/**
 * Create text regex
 */

function textRegex(pattern) {
  var notStr = regexNot.create(pattern, {contains: true, strictClose: false});
  var prefix = '(?:[\\^]|\\\\|';
  return toRegex(prefix + notStr + ')', {strictClose: false});
}


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = new (__webpack_require__(141))();


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = module.exports;
var path = __webpack_require__(5);

/**
 * Module dependencies
 */

var Snapdragon = __webpack_require__(57);
utils.define = __webpack_require__(22);
utils.diff = __webpack_require__(144);
utils.extend = __webpack_require__(28);
utils.pick = __webpack_require__(145);
utils.typeOf = __webpack_require__(25);
utils.unique = __webpack_require__(33);

/**
 * Returns true if the platform is windows, or `path.sep` is `\\`.
 * This is defined as a function to allow `path.sep` to be set in unit tests,
 * or by the user, if there is a reason to do so.
 * @return {Boolean}
 */

utils.isWindows = function() {
  return path.sep === '\\' || process.platform === 'win32';
};

/**
 * Get the `Snapdragon` instance to use
 */

utils.instantiate = function(ast, options) {
  var snapdragon;
  // if an instance was created by `.parse`, use that instance
  if (utils.typeOf(ast) === 'object' && ast.snapdragon) {
    snapdragon = ast.snapdragon;
  // if the user supplies an instance on options, use that instance
  } else if (utils.typeOf(options) === 'object' && options.snapdragon) {
    snapdragon = options.snapdragon;
  // create a new instance
  } else {
    snapdragon = new Snapdragon(options);
  }

  utils.define(snapdragon, 'parse', function(str, options) {
    var parsed = Snapdragon.prototype.parse.apply(this, arguments);
    parsed.input = str;

    // escape unmatched brace/bracket/parens
    var last = this.parser.stack.pop();
    if (last && this.options.strictErrors !== true) {
      var open = last.nodes[0];
      var inner = last.nodes[1];
      if (last.type === 'bracket') {
        if (inner.val.charAt(0) === '[') {
          inner.val = '\\' + inner.val;
        }

      } else {
        open.val = '\\' + open.val;
        var sibling = open.parent.nodes[1];
        if (sibling.type === 'star') {
          sibling.loose = true;
        }
      }
    }

    // add non-enumerable parser reference
    utils.define(parsed, 'parser', this.parser);
    return parsed;
  });

  return snapdragon;
};

/**
 * Create the key to use for memoization. The key is generated
 * by iterating over the options and concatenating key-value pairs
 * to the pattern string.
 */

utils.createKey = function(pattern, options) {
  if (utils.typeOf(options) !== 'object') {
    return pattern;
  }
  var val = pattern;
  var keys = Object.keys(options);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    val += ';' + key + '=' + String(options[key]);
  }
  return val;
};

/**
 * Cast `val` to an array
 * @return {Array}
 */

utils.arrayify = function(val) {
  if (typeof val === 'string') return [val];
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Return true if `val` is a non-empty string
 */

utils.isString = function(val) {
  return typeof val === 'string';
};

/**
 * Return true if `val` is a non-empty string
 */

utils.isObject = function(val) {
  return utils.typeOf(val) === 'object';
};

/**
 * Returns true if the given `str` has special characters
 */

utils.hasSpecialChars = function(str) {
  return /(?:(?:(^|\/)[!.])|[*?+()|\[\]{}]|[+@]\()/.test(str);
};

/**
 * Escape regex characters in the given string
 */

utils.escapeRegex = function(str) {
  return str.replace(/[-[\]{}()^$|*+?.\\\/\s]/g, '\\$&');
};

/**
 * Normalize slashes in the given filepath.
 *
 * @param {String} `filepath`
 * @return {String}
 */

utils.toPosixPath = function(str) {
  return str.replace(/\\+/g, '/');
};

/**
 * Strip backslashes before special characters in a string.
 *
 * @param {String} `str`
 * @return {String}
 */

utils.unescape = function(str) {
  return utils.toPosixPath(str.replace(/\\(?=[*+?!.])/g, ''));
};

/**
 * Strip the prefix from a filepath
 * @param {String} `fp`
 * @return {String}
 */

utils.stripPrefix = function(str) {
  if (str.charAt(0) !== '.') {
    return str;
  }
  var ch = str.charAt(1);
  if (utils.isSlash(ch)) {
    return str.slice(2);
  }
  return str;
};

/**
 * Returns true if the given str is an escaped or
 * unescaped path character
 */

utils.isSlash = function(str) {
  return str === '/' || str === '\\/' || str === '\\' || str === '\\\\';
};

/**
 * Returns a function that returns true if the given
 * pattern matches or contains a `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.matchPath = function(pattern, options) {
  return (options && options.contains)
    ? utils.containsPattern(pattern, options)
    : utils.equalsPattern(pattern, options);
};

/**
 * Returns true if the given (original) filepath or unixified path are equal
 * to the given pattern.
 */

utils._equals = function(filepath, unixPath, pattern) {
  return pattern === filepath || pattern === unixPath;
};

/**
 * Returns true if the given (original) filepath or unixified path contain
 * the given pattern.
 */

utils._contains = function(filepath, unixPath, pattern) {
  return filepath.indexOf(pattern) !== -1 || unixPath.indexOf(pattern) !== -1;
};

/**
 * Returns a function that returns true if the given
 * pattern is the same as a given `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.equalsPattern = function(pattern, options) {
  var unixify = utils.unixify(options);
  options = options || {};

  return function fn(filepath) {
    var equal = utils._equals(filepath, unixify(filepath), pattern);
    if (equal === true || options.nocase !== true) {
      return equal;
    }
    var lower = filepath.toLowerCase();
    return utils._equals(lower, unixify(lower), pattern);
  };
};

/**
 * Returns a function that returns true if the given
 * pattern contains a `filepath`
 *
 * @param {String} `pattern`
 * @return {Function}
 */

utils.containsPattern = function(pattern, options) {
  var unixify = utils.unixify(options);
  options = options || {};

  return function(filepath) {
    var contains = utils._contains(filepath, unixify(filepath), pattern);
    if (contains === true || options.nocase !== true) {
      return contains;
    }
    var lower = filepath.toLowerCase();
    return utils._contains(lower, unixify(lower), pattern);
  };
};

/**
 * Returns a function that returns true if the given
 * regex matches the `filename` of a file path.
 *
 * @param {RegExp} `re` Matching regex
 * @return {Function}
 */

utils.matchBasename = function(re) {
  return function(filepath) {
    return re.test(path.basename(filepath));
  };
};

/**
 * Determines the filepath to return based on the provided options.
 * @return {any}
 */

utils.value = function(str, unixify, options) {
  if (options && options.unixify === false) {
    return str;
  }
  return unixify(str);
};

/**
 * Returns a function that normalizes slashes in a string to forward
 * slashes, strips `./` from beginning of paths, and optionally unescapes
 * special characters.
 * @return {Function}
 */

utils.unixify = function(options) {
  options = options || {};
  return function(filepath) {
    if (utils.isWindows() || options.unixify === true) {
      filepath = utils.toPosixPath(filepath);
    }
    if (options.stripPrefix !== false) {
      filepath = utils.stripPrefix(filepath);
    }
    if (options.unescape === true) {
      filepath = utils.unescape(filepath);
    }
    return filepath;
  };
};


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

/*!
 * normalize-path <https://github.com/jonschlinkert/normalize-path>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */

var removeTrailingSeparator = __webpack_require__(167);

module.exports = function normalizePath(str, stripTrailing) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }
  str = str.replace(/[\\\/]+/g, '/');
  if (stripTrailing !== false) {
    str = removeTrailingSeparator(str);
  }
  return str;
};


/***/ }),
/* 167 */
/***/ (function(module, exports) {

var isWin = process.platform === 'win32';

module.exports = function (str) {
	var i = str.length - 1;
	if (i < 2) {
		return str;
	}
	while (isSeparator(str, i)) {
		i--;
	}
	return str.substr(0, i + 1);
};

function isSeparator(str, i) {
	var char = str[i];
	return i > 0 && (char === '/' || (isWin && char === '\\'));
}


/***/ }),
/* 168 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(4);
const path = __webpack_require__(5);
const watch = __webpack_require__(170);
const common = __webpack_require__(6);
const EventEmitter = __webpack_require__(9).EventEmitter;

/**
 * Constants
 */

const DEFAULT_DELAY = common.DEFAULT_DELAY;
const CHANGE_EVENT = common.CHANGE_EVENT;
const DELETE_EVENT = common.DELETE_EVENT;
const ADD_EVENT = common.ADD_EVENT;
const ALL_EVENT = common.ALL_EVENT;

/**
 * Export `PollWatcher` class.
 * Watches `dir`.
 *
 * @class PollWatcher
 * @param String dir
 * @param {Object} opts
 * @public
 */

module.exports = class PollWatcher extends EventEmitter {
  constructor(dir, opts) {
    super();

    opts = common.assignOptions(this, opts);

    this.watched = Object.create(null);
    this.root = path.resolve(dir);

    watch.createMonitor(
      this.root,
      {
        interval: (opts.interval || DEFAULT_DELAY) / 1000,
        filter: this.filter.bind(this),
      },
      this.init.bind(this)
    );
  }

  /**
   * Given a fullpath of a file or directory check if we need to watch it.
   *
   * @param {string} filepath
   * @param {object} stat
   * @private
   */

  filter(filepath, stat) {
    return (
      stat.isDirectory() ||
      common.isFileIncluded(
        this.globs,
        this.dot,
        this.doIgnore,
        path.relative(this.root, filepath)
      )
    );
  }

  /**
   * Initiate the polling file watcher with the event emitter passed from
   * `watch.watchTree`.
   *
   * @param {EventEmitter} monitor
   * @public
   */

  init(monitor) {
    this.watched = monitor.files;
    monitor.on('changed', this.emitEvent.bind(this, CHANGE_EVENT));
    monitor.on('removed', this.emitEvent.bind(this, DELETE_EVENT));
    monitor.on('created', this.emitEvent.bind(this, ADD_EVENT));
    // 1 second wait because mtime is second-based.
    setTimeout(this.emit.bind(this, 'ready'), 1000);
  }

  /**
   * Transform and emit an event comming from the poller.
   *
   * @param {EventEmitter} monitor
   * @public
   */

  emitEvent(type, file, stat) {
    file = path.relative(this.root, file);

    if (type === DELETE_EVENT) {
      // Matching the non-polling API
      stat = null;
    }

    this.emit(type, file, this.root, stat);
    this.emit(ALL_EVENT, type, file, this.root, stat);
  }

  /**
   * End watching.
   *
   * @public
   */

  close(callback) {
    Object.keys(this.watched).forEach(filepath => fs.unwatchFile(filepath));
    this.removeAllListeners();
    if (typeof callback === 'function') {
      setImmediate(callback.bind(null, null, true));
    }
  }
};


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright 2010-2011 Mikeal Rogers
//
//    Licensed under the Apache License, Version 2.0 (the "License");
//    you may not use this file except in compliance with the License.
//    You may obtain a copy of the License at
//
//        http://www.apache.org/licenses/LICENSE-2.0
//
//    Unless required by applicable law or agreed to in writing, software
//    distributed under the License is distributed on an "AS IS" BASIS,
//    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//    See the License for the specific language governing permissions and
//    limitations under the License.

var sys = __webpack_require__(8)
  , fs = __webpack_require__(4)
  , path = __webpack_require__(5)
  , events = __webpack_require__(9)
  ;

function walk (dir, options, callback) {
  if (!callback) {callback = options; options = {}}
  if (!callback.files) callback.files = {};
  if (!callback.pending) callback.pending = 0;
  callback.pending += 1;
  fs.stat(dir, function (err, stat) {
    if (err) return callback(err);
    callback.files[dir] = stat;
    fs.readdir(dir, function (err, files) {
      if (err) {
        if(err.code === 'EACCES' && options.ignoreUnreadableDir) return callback();
        return callback(err);
      }
      callback.pending -= 1;
      files.forEach(function (f, index) {
        f = path.join(dir, f);
        callback.pending += 1;
        fs.stat(f, function (err, stat) {
          var enoent = false
            , done = false;

          if (err) {
            if (err.code !== 'ENOENT' && (err.code !== 'EPERM' && options.ignoreNotPermitted)) {
              return callback(err);
            } else {
              enoent = true;
            }
          }
          callback.pending -= 1;
          done = callback.pending === 0;
          if (!enoent) {
            if (options.ignoreDotFiles && path.basename(f)[0] === '.') return done && callback(null, callback.files);
            if (options.filter && !options.filter(f, stat)) return done && callback(null, callback.files);
            callback.files[f] = stat;
            if (stat.isDirectory() && !(options.ignoreDirectoryPattern && options.ignoreDirectoryPattern.test(f))) walk(f, options, callback);
            done = callback.pending === 0;
            if (done) callback(null, callback.files);
          }
        })
      })
      if (callback.pending === 0) callback(null, callback.files);
    })
    if (callback.pending === 0) callback(null, callback.files);
  })

}

var watchedFiles = Object.create(null);

exports.watchTree = function ( root, options, callback ) {
  if (!callback) {callback = options; options = {}}
  walk(root, options, function (err, files) {
    if (err) throw err;
    var fileWatcher = function (f) {
      var fsOptions = {};
      if (options.interval) {
        fsOptions.interval = options.interval * 1000;
      }
      fs.watchFile(f, fsOptions, function (c, p) {
        // Check if anything actually changed in stat
        if (files[f] && !files[f].isDirectory() && c.nlink !== 0 && files[f].mtime.getTime() == c.mtime.getTime()) return;
        files[f] = c;
        if (!files[f].isDirectory()) callback(f, c, p);
        else {
          fs.readdir(f, function (err, nfiles) {
            if (err) return;
            nfiles.forEach(function (b) {
              var file = path.join(f, b);
              if (!files[file] && (options.ignoreDotFiles !== true || b[0] != '.')) {
                fs.stat(file, function (err, stat) {
                  if (options.filter && !options.filter(file, stat)) return;
                  callback(file, stat, null);
                  files[file] = stat;
                  fileWatcher(file);
                })
              }
            })
          })
        }
        if (c.nlink === 0) {
          // unwatch removed files.
          delete files[f]
          fs.unwatchFile(f);
        }
      })
    }
    fileWatcher(root);
    for (var i in files) {
      fileWatcher(i);
    }
    watchedFiles[root] = files;
    callback(files, null, null);
  })
}

exports.unwatchTree = function (root) {
  if (!watchedFiles[root]) return;
  Object.keys(watchedFiles[root]).forEach(fs.unwatchFile);
  watchedFiles[root] = false;
};

exports.createMonitor = function (root, options, cb) {
  if (!cb) {cb = options; options = {}}
  var monitor = new events.EventEmitter();
  monitor.stop = exports.unwatchTree.bind(null, root);

  var prevFile = {file: null,action: null,stat: null};
  exports.watchTree(root, options, function (f, curr, prev) {
    // if not curr, prev, but f is an object
    if (typeof f == "object" && prev == null && curr === null) {
      monitor.files = f;
      return cb(monitor);
    }

    // if not prev and either prevFile.file is not f or prevFile.action is not created
    if (!prev) {
      if (prevFile.file != f || prevFile.action != "created") {
        prevFile = { file: f, action: "created", stat: curr };
        return monitor.emit("created", f, curr);
      }
    }

    // if curr.nlink is 0 and either prevFile.file is not f or prevFile.action is not removed
    if (curr) {
      if (curr.nlink === 0) {
        if (prevFile.file != f || prevFile.action != "removed") {
          prevFile = { file: f, action: "removed", stat: curr };
          return monitor.emit("removed", f, curr);
        }
      }
    }

    // if prevFile.file is null or prevFile.stat.mtime is not the same as curr.mtime
    if (prevFile.file === null) {
      return monitor.emit("changed", f, curr, prev);
    }
    // stat might return null, so catch errors
    try {
      if (prevFile.stat.mtime.getTime() !== curr.mtime.getTime()) {
        return monitor.emit("changed", f, curr, prev);
      }
    } catch(e) {
      return monitor.emit("changed", f, curr, prev);
    }
  })
}

exports.walk = walk;


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(4);
const path = __webpack_require__(5);
const common = __webpack_require__(6);
const watchmanClient = __webpack_require__(172);
const EventEmitter = __webpack_require__(9).EventEmitter;
const RecrawlWarning = __webpack_require__(180);

/**
 * Constants
 */

const CHANGE_EVENT = common.CHANGE_EVENT;
const DELETE_EVENT = common.DELETE_EVENT;
const ADD_EVENT = common.ADD_EVENT;
const ALL_EVENT = common.ALL_EVENT;

/**
 * Export `WatchmanWatcher` class.
 */

module.exports = WatchmanWatcher;

/**
 * Watches `dir`.
 *
 * @class WatchmanWatcher
 * @param String dir
 * @param {Object} opts
 * @public
 */

function WatchmanWatcher(dir, opts) {
  common.assignOptions(this, opts);
  this.root = path.resolve(dir);
  this._init();
}

WatchmanWatcher.prototype.__proto__ = EventEmitter.prototype;

/**
 * Run the watchman `watch` command on the root and subscribe to changes.
 *
 * @private
 */
WatchmanWatcher.prototype._init = function() {
  if (this._client) {
    this._client = null;
  }

  // Get the WatchmanClient instance corresponding to our watchmanPath (or nothing).
  // Then subscribe, which will do the appropriate setup so that we will receive
  // calls to handleChangeEvent when files change.
  this._client = watchmanClient.getInstance(this.watchmanPath);

  return this._client.subscribe(this, this.root).then(
    resp => {
      this._handleWarning(resp);
      this.emit('ready');
    },
    error => {
      this._handleError(error);
    }
  );
};

/**
 * Called by WatchmanClient to create the options, either during initial 'subscribe'
 * or to resubscribe after a disconnect+reconnect. Note that we are leaving out
 * the watchman 'since' and 'relative_root' options, which are handled inside the
 * WatchmanClient.
 */
WatchmanWatcher.prototype.createOptions = function() {
  let options = {
    fields: ['name', 'exists', 'new'],
  };

  // If the server has the wildmatch capability available it supports
  // the recursive **/*.foo style match and we can offload our globs
  // to the watchman server.  This saves both on data size to be
  // communicated back to us and compute for evaluating the globs
  // in our node process.
  if (this._client.wildmatch) {
    if (this.globs.length === 0) {
      if (!this.dot) {
        // Make sure we honor the dot option if even we're not using globs.
        options.expression = [
          'match',
          '**',
          'wholename',
          {
            includedotfiles: false,
          },
        ];
      }
    } else {
      options.expression = ['anyof'];
      for (let i in this.globs) {
        options.expression.push([
          'match',
          this.globs[i],
          'wholename',
          {
            includedotfiles: this.dot,
          },
        ]);
      }
    }
  }

  return options;
};

/**
 * Called by WatchmanClient when it receives an error from the watchman daemon.
 *
 * @param {Object} resp
 */
WatchmanWatcher.prototype.handleErrorEvent = function(error) {
  this.emit('error', error);
};

/**
 * Called by the WatchmanClient when it is notified about a file change in
 * the tree for this particular watcher's root.
 *
 * @param {Object} resp
 * @private
 */

WatchmanWatcher.prototype.handleChangeEvent = function(resp) {
  if (Array.isArray(resp.files)) {
    resp.files.forEach(this.handleFileChange, this);
  }
};

/**
 * Handles a single change event record.
 *
 * @param {Object} changeDescriptor
 * @private
 */

WatchmanWatcher.prototype.handleFileChange = function(changeDescriptor) {
  let absPath;
  let relativePath;

  relativePath = changeDescriptor.name;
  absPath = path.join(this.root, relativePath);

  if (
    !(this._client.wildmatch && !this.hasIgnore) &&
    !common.isFileIncluded(this.globs, this.dot, this.doIgnore, relativePath)
  ) {
    return;
  }

  if (!changeDescriptor.exists) {
    this.emitEvent(DELETE_EVENT, relativePath, this.root);
  } else {
    fs.lstat(absPath, (error, stat) => {
      // Files can be deleted between the event and the lstat call
      // the most reliable thing to do here is to ignore the event.
      if (error && error.code === 'ENOENT') {
        return;
      }

      if (this._handleError(error)) {
        return;
      }

      let eventType = changeDescriptor.new ? ADD_EVENT : CHANGE_EVENT;

      // Change event on dirs are mostly useless.
      if (!(eventType === CHANGE_EVENT && stat.isDirectory())) {
        this.emitEvent(eventType, relativePath, this.root, stat);
      }
    });
  }
};

/**
 * Dispatches an event.
 *
 * @param {string} eventType
 * @param {string} filepath
 * @param {string} root
 * @param {fs.Stat} stat
 * @private
 */

WatchmanWatcher.prototype.emitEvent = function(
  eventType,
  filepath,
  root,
  stat
) {
  this.emit(eventType, filepath, root, stat);
  this.emit(ALL_EVENT, eventType, filepath, root, stat);
};

/**
 * Closes the watcher.
 *
 * @param {function} callback
 * @private
 */

WatchmanWatcher.prototype.close = function(callback) {
  this._client.closeWatcher(this);
  callback && callback(null, true);
};

/**
 * Handles an error and returns true if exists.
 *
 * @param {WatchmanWatcher} self
 * @param {Error} error
 * @private
 */

WatchmanWatcher.prototype._handleError = function(error) {
  if (error != null) {
    this.emit('error', error);
    return true;
  } else {
    return false;
  }
};

/**
 * Handles a warning in the watchman resp object.
 *
 * @param {object} resp
 * @private
 */

WatchmanWatcher.prototype._handleWarning = function(resp) {
  if ('warning' in resp) {
    if (RecrawlWarning.isRecrawlWarningDupe(resp.warning)) {
      return true;
    }
    console.warn(resp.warning);
    return true;
  } else {
    return false;
  }
};


/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const watchman = __webpack_require__(173);
const captureExit = __webpack_require__(178);

function values(obj) {
  return Object.keys(obj).map(key => obj[key]);
}

/**
 * Constants
 */

/**
 * Singleton that provides a public API for a connection to a watchman instance for 'sane'.
 * It tries to abstract/remove as much of the boilerplate processing as necessary
 * from WatchmanWatchers that use it. In particular, they have no idea whether
 * we're using 'watch-project' or 'watch', what the 'project root' is when
 * we internally use watch-project, whether a connection has been lost
 * and reestablished, etc. Also switched to doing things with promises and known-name
 * methods in WatchmanWatcher, so as much information as possible can be kept in
 * the WatchmanClient, ultimately making this the only object listening directly
 * to watchman.Client, then forwarding appropriately (via the known-name methods) to
 * the relevant WatchmanWatcher(s).
 *
 * Note: WatchmanWatcher also added a 'watchmanPath' option for use with the sane CLI.
 * Because of that, we actually need a map of watchman binary path to WatchmanClient instance.
 * That is set up in getInstance(). Once the WatchmanWatcher has a given client, it doesn't
 * change.
 *
 * @class WatchmanClient
 * @param String watchmanBinaryPath
 * @public
 */

class WatchmanClient {
  constructor(watchmanBinaryPath) {
    captureExit.captureExit();

    // define/clear some local state. The properties will be initialized
    // in _handleClientAndCheck(). This is also called again in _onEnd when
    // trying to reestablish connection to watchman.
    this._clearLocalVars();

    this._watchmanBinaryPath = watchmanBinaryPath;

    this._backoffTimes = this._setupBackoffTimes();

    this._clientListeners = null; // direct listeners from here to watchman.Client.

    // Define a handler for if somehow the Node process gets interrupted. We need to
    // close down the watchman.Client, if we have one.
    captureExit.onExit(() => this._clearLocalVars());
  }

  // Define 'wildmatch' property, which must be available when we call the
  // WatchmanWatcher.createOptions() method.
  get wildmatch() {
    return this._wildmatch;
  }

  /**
   * Called from WatchmanWatcher (or WatchmanClient during reconnect) to create
   * a watcherInfo entry in our _watcherMap and issue a 'subscribe' to the
   * watchman.Client, to be handled here.
   */
  subscribe(watchmanWatcher, root) {
    let subscription;
    let watcherInfo;

    return this._setupClient()
      .then(() => {
        watcherInfo = this._createWatcherInfo(watchmanWatcher);
        subscription = watcherInfo.subscription;
        return this._watch(subscription, root);
      })
      .then(() => this._clock(subscription))
      .then(() => this._subscribe(subscription));
    // Note: callers are responsible for noting any subscription failure.
  }

  /**
   * Remove the information about a specific WatchmanWatcher.
   * Once done, if no watchers are left, clear the local vars,
   * which will end the connection to the watchman.Client, too.
   */
  closeWatcher(watchmanWatcher) {
    let watcherInfos = values(this._watcherMap);
    let numWatchers = watcherInfos.length;

    if (numWatchers > 0) {
      let watcherInfo;

      for (let info of watcherInfos) {
        if (info.watchmanWatcher === watchmanWatcher) {
          watcherInfo = info;
          break;
        }
      }

      if (watcherInfo) {
        delete this._watcherMap[watcherInfo.subscription];

        numWatchers--;

        if (numWatchers === 0) {
          this._clearLocalVars(); // nobody watching, so shut the watchman.Client down.
        }
      }
    }
  }

  /**
   * Simple backoff-time iterator. next() returns times in ms.
   * When it's at the last value, it stays there until reset()
   * is called.
   */
  _setupBackoffTimes() {
    return {
      _times: [0, 1000, 5000, 10000, 60000],

      _next: 0,

      next() {
        let val = this._times[this._next];
        if (this._next < this._times.length - 1) {
          this._next++;
        }
        return val;
      },

      reset() {
        this._next = 0;
      },
    };
  }

  /**
   * Set up the connection to the watchman client. Return a promise
   * that is fulfilled when we have a client that has finished the
   * capabilityCheck.
   */
  _setupClient() {
    if (!this._clientPromise) {
      this._clientPromise = new Promise((resolve, reject) => {
        this._handleClientAndCheck(resolve, reject);
      });
    }

    return this._clientPromise;
  }

  /**
   * Handle the process of creating a client and doing a capability check and
   * getting a valid response, then setting up local data based on that.
   *
   * This is split from _setupClient and _createClientAndCheck so it can
   * provide the backoff handling needed during attempts to reconnect.
   */
  _handleClientAndCheck(resolve, reject) {
    this._createClientAndCheck().then(
      value => {
        let resp = value.resp;
        let client = value.client;

        try {
          this._wildmatch = resp.capabilities.wildmatch;
          this._relative_root = resp.capabilities.relative_root;
          this._client = client;

          client.on('subscription', this._onSubscription.bind(this));
          client.on('error', this._onError.bind(this));
          client.on('end', this._onEnd.bind(this));

          this._backoffTimes.reset();
          resolve(this);
        } catch (error) {
          // somehow, even though we supposedly got a valid value back, it's
          // malformed, or some other internal error occurred. Reject so
          // the promise itself doesn't hang forever.
          reject(error);
        }
      },
      () => {
        // create & capability check failed in any of several ways,
        // do the retry with backoff.

        // XXX May want to change this later to actually reject/terminate with
        // an error in certain of the inner errors (e.g. when we
        // can figure out the server is definitely not coming
        // back, or something else is not recoverable by just waiting).
        // Could also decide after N retries to just quit.

        let backoffMillis = this._backoffTimes.next();

        // XXX may want to fact we'll attempt reconnect in backoffMillis ms.
        setTimeout(() => {
          this._handleClientAndCheck(resolve, reject);
        }, backoffMillis);
      }
    );
  }

  /**
   * Create a promise that will only be fulfilled when either
   * we correctly get capabilities back or we get an 'error' or 'end'
   * callback, indicating a problem. The caller _handleClientAndCheck
   * then deals with providing a retry and backoff mechanism.
   */
  _createClientAndCheck() {
    return new Promise((resolve, reject) => {
      let client;

      try {
        client = new watchman.Client(
          this._watchmanBinaryPath
            ? { watchmanBinaryPath: this._watchmanBinaryPath }
            : {}
        );
      } catch (error) {
        // if we're here, either the binary path is bad or something
        // else really bad happened. The client doesn't even attempt
        // to connect until we send it a command, though.
        reject(error);
        return;
      }

      client.on('error', error => {
        client.removeAllListeners();
        reject(error);
      });

      client.on('end', () => {
        client.removeAllListeners();
        reject(new Error('Disconnected during client capabilities check'));
      });

      client.capabilityCheck(
        { optional: ['wildmatch', 'relative_root'] },
        (error, resp) => {
          try {
            client.removeAllListeners();

            if (error) {
              reject(error);
            } else {
              resolve({ resp, client });
            }
          } catch (err) {
            // In case we get something weird in the block using 'resp'.
            // XXX We could also just remove the try/catch if we believe
            // the resp stuff should always work, but just in case...
            reject(err);
          }
        }
      );
    });
  }

  /**
   * Clear out local state at the beginning and if we end up
   * getting disconnected and try to reconnect.
   */
  _clearLocalVars() {
    if (this._client) {
      this._client.removeAllListeners();
      this._client.end();
    }

    this._client = null;
    this._clientPromise = null;
    this._wildmatch = false;
    this._relative_root = false;
    this._subscriptionId = 1;
    this._watcherMap = Object.create(null);

    // Note that we do not clear _clientListeners or _watchmanBinaryPath.
  }

  _genSubscription() {
    let val = 'sane_' + this._subscriptionId++;
    return val;
  }

  /**
   * Create a new watcherInfo entry for the given watchmanWatcher and
   * initialize it.
   */
  _createWatcherInfo(watchmanWatcher) {
    let watcherInfo = {
      subscription: this._genSubscription(),
      watchmanWatcher: watchmanWatcher,
      root: null, // set during 'watch' or 'watch-project'
      relativePath: null, // same
      since: null, // set during 'clock'
      options: null, // created and set during 'subscribe'.
    };

    this._watcherMap[watcherInfo.subscription] = watcherInfo;

    return watcherInfo;
  }

  /**
   * Find an existing watcherInfo instance.
   */
  _getWatcherInfo(subscription) {
    return this._watcherMap[subscription];
  }

  /**
   * Given a watchmanWatcher and a root, issue the correct 'watch'
   * or 'watch-project' command and handle it with the callback.
   * Because we're operating in 'sane', we'll keep the results
   * of the 'watch' or 'watch-project' here.
   */
  _watch(subscription, root) {
    return new Promise((resolve, reject) => {
      let watcherInfo = this._getWatcherInfo(subscription);

      if (this._relative_root) {
        this._client.command(['watch-project', root], (error, resp) => {
          if (error) {
            reject(error);
          } else {
            watcherInfo.root = resp.watch;
            watcherInfo.relativePath = resp.relative_path
              ? resp.relative_path
              : '';
            resolve(resp);
          }
        });
      } else {
        this._client.command(['watch', root], (error, resp) => {
          if (error) {
            reject(error);
          } else {
            watcherInfo.root = root;
            watcherInfo.relativePath = '';
            resolve(resp);
          }
        });
      }
    });
  }

  /**
   * Issue the 'clock' command to get the time value for use with the 'since'
   * option during 'subscribe'.
   */
  _clock(subscription) {
    return new Promise((resolve, reject) => {
      let watcherInfo = this._getWatcherInfo(subscription);

      this._client.command(['clock', watcherInfo.root], (error, resp) => {
        if (error) {
          reject(error);
        } else {
          watcherInfo.since = resp.clock;
          resolve(resp);
        }
      });
    });
  }

  /**
   * Do the internal handling of calling the watchman.Client for
   * a subscription.
   */
  _subscribe(subscription) {
    return new Promise((resolve, reject) => {
      let watcherInfo = this._getWatcherInfo(subscription);

      // create the 'bare' options w/o 'since' or relative_root.
      // Store in watcherInfo for later use if we need to reset
      // things after an 'end' caught here.
      let options = watcherInfo.watchmanWatcher.createOptions();
      watcherInfo.options = options;

      // Dup the options object so we can add 'relative_root' and 'since'
      // and leave the original options object alone. We'll do this again
      // later if we need to resubscribe after 'end' and reconnect.
      options = Object.assign({}, options);

      if (this._relative_root) {
        options.relative_root = watcherInfo.relativePath;
      }

      options.since = watcherInfo.since;

      this._client.command(
        ['subscribe', watcherInfo.root, subscription, options],
        (error, resp) => {
          if (error) {
            reject(error);
          } else {
            resolve(resp);
          }
        }
      );
    });
  }

  /**
   * Handle the 'subscription' (file change) event, by calling the
   * handler on the relevant WatchmanWatcher.
   */
  _onSubscription(resp) {
    let watcherInfo = this._getWatcherInfo(resp.subscription);

    if (watcherInfo) {
      // we're assuming the watchmanWatcher does not throw during
      // handling of the change event.
      watcherInfo.watchmanWatcher.handleChangeEvent(resp);
    } else {
      // Note it in the log, but otherwise ignore it
      console.error(
        "WatchmanClient error - received 'subscription' event " +
          "for non-existent subscription '" +
          resp.subscription +
          "'"
      );
    }
  }

  /**
   * Handle the 'error' event by forwarding to the
   * handler on all WatchmanWatchers (errors are generally during processing
   * a particular command, but it's not given which command that was, or
   * which subscription it belonged to).
   */
  _onError(error) {
    values(this._watcherMap).forEach(watcherInfo =>
      watcherInfo.watchmanWatcher.handleErrorEvent(error)
    );
  }

  /**
   * Handle the 'end' event by creating a new watchman.Client and
   * attempting to resubscribe all the existing subscriptions, but
   * without notifying the WatchmanWatchers about it. They should
   * not be aware the connection was lost and recreated.
   * If something goes wrong during any part of the reconnect/setup,
   * call the error handler on each existing WatchmanWatcher.
   */
  _onEnd() {
    console.warn(
      '[sane.WatchmanClient] Warning: Lost connection to watchman, reconnecting..'
    );

    // Hold the old watcher map so we use it to recreate all subscriptions.
    let oldWatcherInfos = values(this._watcherMap);

    this._clearLocalVars();

    this._setupClient().then(
      () => {
        let promises = oldWatcherInfos.map(watcherInfo =>
          this.subscribe(
            watcherInfo.watchmanWatcher,
            watcherInfo.watchmanWatcher.root
          )
        );
        Promise.all(promises).then(
          () => {
            console.log('[sane.WatchmanClient]: Reconnected to watchman');
          },
          error => {
            console.error(
              '[sane.WatchmanClient]: Reconnected to watchman, but failed to ' +
                'reestablish at least one subscription, cannot continue'
            );
            console.error(error);
            oldWatcherInfos.forEach(watcherInfo =>
              watcherInfo.watchmanWatcher.handleErrorEvent(error)
            );
            // XXX not sure whether to clear all _watcherMap instances here,
            // but basically this client is inconsistent now, since at least one
            // subscribe failed.
          }
        );
      },
      error => {
        console.error(
          '[sane.WatchmanClient]: Lost connection to watchman, ' +
            'reconnect failed, cannot continue'
        );
        console.error(error);
        oldWatcherInfos.forEach(watcherInfo =>
          watcherInfo.watchmanWatcher.handleErrorEvent(error)
        );
      }
    );
  }
}

module.exports = {
  /**
   * Create/retrieve an instance of the WatchmanClient. See the header comment
   * about the map of client instances, one per watchmanPath.
   * Export the getInstance method by itself so the callers cannot do anything until
   * they get a real WatchmanClient instance here.
   */
  getInstance(watchmanBinaryPath) {
    let clientMap = WatchmanClient.prototype._clientMap;

    if (!clientMap) {
      clientMap = Object.create(null);
      WatchmanClient.prototype._clientMap = clientMap;
    }

    if (watchmanBinaryPath == undefined || watchmanBinaryPath === null) {
      watchmanBinaryPath = '';
    }

    let watchmanClient = clientMap[watchmanBinaryPath];

    if (!watchmanClient) {
      watchmanClient = new WatchmanClient(watchmanBinaryPath);
      clientMap[watchmanBinaryPath] = watchmanClient;
    }

    return watchmanClient;
  },
};


/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* Copyright 2014-present Facebook, Inc.
 * Licensed under the Apache License, Version 2.0 */



var net = __webpack_require__(110);
var EE = __webpack_require__(9).EventEmitter;
var util = __webpack_require__(8);
var childProcess = __webpack_require__(174);
var bser = __webpack_require__(175);

// We'll emit the responses to these when they get sent down to us
var unilateralTags = ['subscription', 'log'];

/**
 * @param options An object with the following optional keys:
 *   * 'watchmanBinaryPath' (string) Absolute path to the watchman binary.
 *     If not provided, the Client locates the binary using the PATH specified
 *     by the node child_process's default env.
 */
function Client(options) {
  var self = this;
  EE.call(this);

  this.watchmanBinaryPath = 'watchman';
  if (options && options.watchmanBinaryPath) {
    this.watchmanBinaryPath = options.watchmanBinaryPath.trim();
  };
  this.commands = [];
}
util.inherits(Client, EE);

module.exports.Client = Client;

// Try to send the next queued command, if any
Client.prototype.sendNextCommand = function() {
  if (this.currentCommand) {
    // There's a command pending response, don't send this new one yet
    return;
  }

  this.currentCommand = this.commands.shift();
  if (!this.currentCommand) {
    // No further commands are queued
    return;
  }

  this.socket.write(bser.dumpToBuffer(this.currentCommand.cmd));
}

Client.prototype.cancelCommands = function(why) {
  var error = new Error(why);

  // Steal all pending commands before we start cancellation, in
  // case something decides to schedule more commands
  var cmds = this.commands;
  this.commands = [];

  if (this.currentCommand) {
    cmds.unshift(this.currentCommand);
    this.currentCommand = null;
  }

  // Synthesize an error condition for any commands that were queued
  cmds.forEach(function(cmd) {
    cmd.cb(error);
  });
}

Client.prototype.connect = function() {
  var self = this;

  function makeSock(sockname) {
    // bunser will decode the watchman BSER protocol for us
    self.bunser = new bser.BunserBuf();
    // For each decoded line:
    self.bunser.on('value', function(obj) {
      // Figure out if this is a unliteral response or if it is the
      // response portion of a request-response sequence.  At the time
      // of writing, there are only two possible unilateral responses.
      var unilateral = false;
      for (var i = 0; i < unilateralTags.length; i++) {
        var tag = unilateralTags[i];
        if (tag in obj) {
          unilateral = tag;
        }
      }

      if (unilateral) {
        self.emit(unilateral, obj);
      } else if (self.currentCommand) {
        var cmd = self.currentCommand;
        self.currentCommand = null;
        if ('error' in obj) {
          var error = new Error(obj.error);
          error.watchmanResponse = obj;
          cmd.cb(error);
        } else {
          cmd.cb(null, obj);
        }
      }

      // See if we can dispatch the next queued command, if any
      self.sendNextCommand();
    });
    self.bunser.on('error', function(err) {
      self.emit('error', err);
    });

    self.socket = net.createConnection(sockname);
    self.socket.on('connect', function() {
      self.connecting = false;
      self.emit('connect');
      self.sendNextCommand();
    });
    self.socket.on('error', function(err) {
      self.connecting = false;
      self.emit('error', err);
    });
    self.socket.on('data', function(buf) {
      if (self.bunser) {
        self.bunser.append(buf);
      }
    });
    self.socket.on('end', function() {
      self.socket = null;
      self.bunser = null;
      self.cancelCommands('The watchman connection was closed');
      self.emit('end');
    });
  }

  // triggers will export the sock path to the environment.
  // If we're invoked in such a way, we can simply pick up the
  // definition from the environment and avoid having to fork off
  // a process to figure it out
  if (process.env.WATCHMAN_SOCK) {
    makeSock(process.env.WATCHMAN_SOCK);
    return;
  }

  // We need to ask the client binary where to find it.
  // This will cause the service to start for us if it isn't
  // already running.
  var args = ['--no-pretty', 'get-sockname'];

  // We use the more elaborate spawn rather than exec because there
  // are some error cases on Windows where process spawning can hang.
  // It is desirable to pipe stderr directly to stderr live so that
  // we can discover the problem.
  var proc = null;
  var spawnFailed = false;

  function spawnError(error) {
    if (spawnFailed) {
      // For ENOENT, proc 'close' will also trigger with a negative code,
      // let's suppress that second error.
      return;
    }
    spawnFailed = true;
    if (error.errno === 'EACCES') {
      error.message = 'The Watchman CLI is installed but cannot ' +
                      'be spawned because of a permission problem';
    } else if (error.errno === 'ENOENT') {
      error.message = 'Watchman was not found in PATH.  See ' +
          'https://facebook.github.io/watchman/docs/install.html ' +
          'for installation instructions';
    }
    console.error('Watchman: ', error.message);
    self.emit('error', error);
  }

  try {
    proc = childProcess.spawn(this.watchmanBinaryPath, args, {
      stdio: ['ignore', 'pipe', 'pipe']
    });
  } catch (error) {
    spawnError(error);
    return;
  }

  var stdout = [];
  var stderr = [];
  proc.stdout.on('data', function(data) {
    stdout.push(data);
  });
  proc.stderr.on('data', function(data) {
    data = data.toString('utf8');
    stderr.push(data);
    console.error(data);
  });
  proc.on('error', function(error) {
    spawnError(error);
  });

  proc.on('close', function (code, signal) {
    if (code !== 0) {
      spawnError(new Error(
          self.watchmanBinaryPath + ' ' + args.join(' ') +
          ' returned with exit code=' + code + ', signal=' +
          signal + ', stderr= ' + stderr.join('')));
      return;
    }
    try {
      var obj = JSON.parse(stdout.join(''));
      if ('error' in obj) {
        var error = new Error(obj.error);
        error.watchmanResponse = obj;
        self.emit('error', error);
        return;
      }
      makeSock(obj.sockname);
    } catch (e) {
      self.emit('error', e);
    }
  });
}

Client.prototype.command = function(args, done) {
  done = done || function() {};

  // Queue up the command
  this.commands.push({cmd: args, cb: done});

  // Establish a connection if we don't already have one
  if (!this.socket) {
    if (!this.connecting) {
      this.connecting = true;
      this.connect();
      return;
    }
    return;
  }

  // If we're already connected and idle, try sending the command immediately
  this.sendNextCommand();
}

var cap_versions = {
    "cmd-watch-del-all": "3.1.1",
    "cmd-watch-project": "3.1",
    "relative_root": "3.3",
    "term-dirname": "3.1",
    "term-idirname": "3.1",
    "wildmatch": "3.7",
}

// Compares a vs b, returns < 0 if a < b, > 0 if b > b, 0 if a == b
function vers_compare(a, b) {
  a = a.split('.');
  b = b.split('.');
  for (var i = 0; i < 3; i++) {
    var d = parseInt(a[i] || '0') - parseInt(b[i] || '0');
    if (d != 0) {
      return d;
    }
  }
  return 0; // Equal
}

function have_cap(vers, name) {
  if (name in cap_versions) {
    return vers_compare(vers, cap_versions[name]) >= 0;
  }
  return false;
}

// This is a helper that we expose for testing purposes
Client.prototype._synthesizeCapabilityCheck = function(
    resp, optional, required) {
  resp.capabilities = {}
  var version = resp.version;
  optional.forEach(function (name) {
    resp.capabilities[name] = have_cap(version, name);
  });
  required.forEach(function (name) {
    var have = have_cap(version, name);
    resp.capabilities[name] = have;
    if (!have) {
      resp.error = 'client required capability `' + name +
                   '` is not supported by this server';
    }
  });
  return resp;
}

Client.prototype.capabilityCheck = function(caps, done) {
  var optional = caps.optional || [];
  var required = caps.required || [];
  var self = this;
  this.command(['version', {
      optional: optional,
      required: required
  }], function (error, resp) {
    if (error) {
      done(error);
      return;
    }
    if (!('capabilities' in resp)) {
      // Server doesn't support capabilities, so we need to
      // synthesize the results based on the version
      resp = self._synthesizeCapabilityCheck(resp, optional, required);
      if (resp.error) {
        error = new Error(resp.error);
        error.watchmanResponse = resp;
        done(error);
        return;
      }
    }
    done(null, resp);
  });
}

// Close the connection to the service
Client.prototype.end = function() {
  this.cancelCommands('The client was ended');
  if (this.socket) {
    this.socket.end();
    this.socket = null;
  }
  this.bunser = null;
}


/***/ }),
/* 174 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright 2015-present Facebook, Inc.
 * Licensed under the Apache License, Version 2.0 */

var EE = __webpack_require__(9).EventEmitter;
var util = __webpack_require__(8);
var os = __webpack_require__(168);
var assert = __webpack_require__(176);
var Int64 = __webpack_require__(177);

// BSER uses the local endianness to reduce byte swapping overheads
// (the protocol is expressly local IPC only).  We need to tell node
// to use the native endianness when reading various native values.
var isBigEndian = os.endianness() == 'BE';

// Find the next power-of-2 >= size
function nextPow2(size) {
  return Math.pow(2, Math.ceil(Math.log(size) / Math.LN2));
}

// Expandable buffer that we can provide a size hint for
function Accumulator(initsize) {
  this.buf = Buffer.alloc(nextPow2(initsize || 8192));
  this.readOffset = 0;
  this.writeOffset = 0;
}
// For testing
exports.Accumulator = Accumulator

// How much we can write into this buffer without allocating
Accumulator.prototype.writeAvail = function() {
  return this.buf.length - this.writeOffset;
}

// How much we can read
Accumulator.prototype.readAvail = function() {
  return this.writeOffset - this.readOffset;
}

// Ensure that we have enough space for size bytes
Accumulator.prototype.reserve = function(size) {
  if (size < this.writeAvail()) {
    return;
  }

  // If we can make room by shunting down, do so
  if (this.readOffset > 0) {
    this.buf.copy(this.buf, 0, this.readOffset, this.writeOffset);
    this.writeOffset -= this.readOffset;
    this.readOffset = 0;
  }

  // If we made enough room, no need to allocate more
  if (size < this.writeAvail()) {
    return;
  }

  // Allocate a replacement and copy it in
  var buf = Buffer.alloc(nextPow2(this.buf.length + size - this.writeAvail()));
  this.buf.copy(buf);
  this.buf = buf;
}

// Append buffer or string.  Will resize as needed
Accumulator.prototype.append = function(buf) {
  if (Buffer.isBuffer(buf)) {
    this.reserve(buf.length);
    buf.copy(this.buf, this.writeOffset, 0, buf.length);
    this.writeOffset += buf.length;
  } else {
    var size = Buffer.byteLength(buf);
    this.reserve(size);
    this.buf.write(buf, this.writeOffset);
    this.writeOffset += size;
  }
}

Accumulator.prototype.assertReadableSize = function(size) {
  if (this.readAvail() < size) {
    throw new Error("wanted to read " + size +
        " bytes but only have " + this.readAvail());
  }
}

Accumulator.prototype.peekString = function(size) {
  this.assertReadableSize(size);
  return this.buf.toString('utf-8', this.readOffset, this.readOffset + size);
}

Accumulator.prototype.readString = function(size) {
  var str = this.peekString(size);
  this.readOffset += size;
  return str;
}

Accumulator.prototype.peekInt = function(size) {
  this.assertReadableSize(size);
  switch (size) {
    case 1:
      return this.buf.readInt8(this.readOffset, size);
    case 2:
      return isBigEndian ?
        this.buf.readInt16BE(this.readOffset, size) :
        this.buf.readInt16LE(this.readOffset, size);
    case 4:
      return isBigEndian ?
        this.buf.readInt32BE(this.readOffset, size) :
        this.buf.readInt32LE(this.readOffset, size);
    case 8:
        var big = this.buf.slice(this.readOffset, this.readOffset + 8);
        if (isBigEndian) {
          // On a big endian system we can simply pass the buffer directly
          return new Int64(big);
        }
        // Otherwise we need to byteswap
        return new Int64(byteswap64(big));
    default:
      throw new Error("invalid integer size " + size);
  }
}

Accumulator.prototype.readInt = function(bytes) {
  var ival = this.peekInt(bytes);
  if (ival instanceof Int64 && isFinite(ival.valueOf())) {
    ival = ival.valueOf();
  }
  this.readOffset += bytes;
  return ival;
}

Accumulator.prototype.peekDouble = function() {
  this.assertReadableSize(8);
  return isBigEndian ?
    this.buf.readDoubleBE(this.readOffset) :
    this.buf.readDoubleLE(this.readOffset);
}

Accumulator.prototype.readDouble = function() {
  var dval = this.peekDouble();
  this.readOffset += 8;
  return dval;
}

Accumulator.prototype.readAdvance = function(size) {
  if (size > 0) {
    this.assertReadableSize(size);
  } else if (size < 0 && this.readOffset + size < 0) {
    throw new Error("advance with negative offset " + size +
        " would seek off the start of the buffer");
  }
  this.readOffset += size;
}

Accumulator.prototype.writeByte = function(value) {
  this.reserve(1);
  this.buf.writeInt8(value, this.writeOffset);
  ++this.writeOffset;
}

Accumulator.prototype.writeInt = function(value, size) {
  this.reserve(size);
  switch (size) {
    case 1:
      this.buf.writeInt8(value, this.writeOffset);
      break;
    case 2:
      if (isBigEndian) {
        this.buf.writeInt16BE(value, this.writeOffset);
      } else {
        this.buf.writeInt16LE(value, this.writeOffset);
      }
      break;
    case 4:
      if (isBigEndian) {
        this.buf.writeInt32BE(value, this.writeOffset);
      } else {
        this.buf.writeInt32LE(value, this.writeOffset);
      }
      break;
    default:
      throw new Error("unsupported integer size " + size);
  }
  this.writeOffset += size;
}

Accumulator.prototype.writeDouble = function(value) {
  this.reserve(8);
  if (isBigEndian) {
    this.buf.writeDoubleBE(value, this.writeOffset);
  } else {
    this.buf.writeDoubleLE(value, this.writeOffset);
  }
  this.writeOffset += 8;
}

var BSER_ARRAY     = 0x00;
var BSER_OBJECT    = 0x01;
var BSER_STRING    = 0x02;
var BSER_INT8      = 0x03;
var BSER_INT16     = 0x04;
var BSER_INT32     = 0x05;
var BSER_INT64     = 0x06;
var BSER_REAL      = 0x07;
var BSER_TRUE      = 0x08;
var BSER_FALSE     = 0x09;
var BSER_NULL      = 0x0a;
var BSER_TEMPLATE  = 0x0b;
var BSER_SKIP      = 0x0c;

var ST_NEED_PDU = 0; // Need to read and decode PDU length
var ST_FILL_PDU = 1; // Know the length, need to read whole content

var MAX_INT8 = 127;
var MAX_INT16 = 32767;
var MAX_INT32 = 2147483647;

function BunserBuf() {
  EE.call(this);
  this.buf = new Accumulator();
  this.state = ST_NEED_PDU;
}
util.inherits(BunserBuf, EE);
exports.BunserBuf = BunserBuf;

BunserBuf.prototype.append = function(buf, synchronous) {
  if (synchronous) {
    this.buf.append(buf);
    return this.process(synchronous);
  }

  try {
    this.buf.append(buf);
  } catch (err) {
    this.emit('error', err);
    return;
  }
  // Arrange to decode later.  This allows the consuming
  // application to make progress with other work in the
  // case that we have a lot of subscription updates coming
  // in from a large tree.
  this.processLater();
}

BunserBuf.prototype.processLater = function() {
  var self = this;
  process.nextTick(function() {
    try {
      self.process(false);
    } catch (err) {
      self.emit('error', err);
    }
  });
}

// Do something with the buffer to advance our state.
// If we're running synchronously we'll return either
// the value we've decoded or undefined if we don't
// yet have enought data.
// If we're running asynchronously, we'll emit the value
// when it becomes ready and schedule another invocation
// of process on the next tick if we still have data we
// can process.
BunserBuf.prototype.process = function(synchronous) {
  if (this.state == ST_NEED_PDU) {
    if (this.buf.readAvail() < 2) {
      return;
    }
    // Validate BSER header
    this.expectCode(0);
    this.expectCode(1);
    this.pduLen = this.decodeInt(true /* relaxed */);
    if (this.pduLen === false) {
      // Need more data, walk backwards
      this.buf.readAdvance(-2);
      return;
    }
    // Ensure that we have a big enough buffer to read the rest of the PDU
    this.buf.reserve(this.pduLen);
    this.state = ST_FILL_PDU;
  }

  if (this.state == ST_FILL_PDU) {
    if (this.buf.readAvail() < this.pduLen) {
      // Need more data
      return;
    }

    // We have enough to decode it
    var val = this.decodeAny();
    if (synchronous) {
      return val;
    }
    this.emit('value', val);
    this.state = ST_NEED_PDU;
  }

  if (!synchronous && this.buf.readAvail() > 0) {
    this.processLater();
  }
}

BunserBuf.prototype.raise = function(reason) {
  throw new Error(reason + ", in Buffer of length " +
      this.buf.buf.length + " (" + this.buf.readAvail() +
      " readable) at offset " + this.buf.readOffset + " buffer: " +
      JSON.stringify(this.buf.buf.slice(
          this.buf.readOffset, this.buf.readOffset + 32).toJSON()));
}

BunserBuf.prototype.expectCode = function(expected) {
  var code = this.buf.readInt(1);
  if (code != expected) {
    this.raise("expected bser opcode " + expected + " but got " + code);
  }
}

BunserBuf.prototype.decodeAny = function() {
  var code = this.buf.peekInt(1);
  switch (code) {
    case BSER_INT8:
    case BSER_INT16:
    case BSER_INT32:
    case BSER_INT64:
      return this.decodeInt();
    case BSER_REAL:
      this.buf.readAdvance(1);
      return this.buf.readDouble();
    case BSER_TRUE:
      this.buf.readAdvance(1);
      return true;
    case BSER_FALSE:
      this.buf.readAdvance(1);
      return false;
    case BSER_NULL:
      this.buf.readAdvance(1);
      return null;
    case BSER_STRING:
      return this.decodeString();
    case BSER_ARRAY:
      return this.decodeArray();
    case BSER_OBJECT:
      return this.decodeObject();
    case BSER_TEMPLATE:
      return this.decodeTemplate();
    default:
      this.raise("unhandled bser opcode " + code);
  }
}

BunserBuf.prototype.decodeArray = function() {
  this.expectCode(BSER_ARRAY);
  var nitems = this.decodeInt();
  var arr = [];
  for (var i = 0; i < nitems; ++i) {
    arr.push(this.decodeAny());
  }
  return arr;
}

BunserBuf.prototype.decodeObject = function() {
  this.expectCode(BSER_OBJECT);
  var nitems = this.decodeInt();
  var res = {};
  for (var i = 0; i < nitems; ++i) {
    var key = this.decodeString();
    var val = this.decodeAny();
    res[key] = val;
  }
  return res;
}

BunserBuf.prototype.decodeTemplate = function() {
  this.expectCode(BSER_TEMPLATE);
  var keys = this.decodeArray();
  var nitems = this.decodeInt();
  var arr = [];
  for (var i = 0; i < nitems; ++i) {
    var obj = {};
    for (var keyidx = 0; keyidx < keys.length; ++keyidx) {
      if (this.buf.peekInt(1) == BSER_SKIP) {
        this.buf.readAdvance(1);
        continue;
      }
      var val = this.decodeAny();
      obj[keys[keyidx]] = val;
    }
    arr.push(obj);
  }
  return arr;
}

BunserBuf.prototype.decodeString = function() {
  this.expectCode(BSER_STRING);
  var len = this.decodeInt();
  return this.buf.readString(len);
}

// This is unusual compared to the other decode functions in that
// we may not have enough data available to satisfy the read, and
// we don't want to throw.  This is only true when we're reading
// the PDU length from the PDU header; we'll set relaxSizeAsserts
// in that case.
BunserBuf.prototype.decodeInt = function(relaxSizeAsserts) {
  if (relaxSizeAsserts && !this.buf.readAvail(1)) {
    return false;
  } else {
    this.buf.assertReadableSize(1);
  }
  var code = this.buf.peekInt(1);
  var size = 0;
  switch (code) {
    case BSER_INT8:
      size = 1;
      break;
    case BSER_INT16:
      size = 2;
      break;
    case BSER_INT32:
      size = 4;
      break;
    case BSER_INT64:
      size = 8;
      break;
    default:
      this.raise("invalid bser int encoding " + code);
  }

  if (relaxSizeAsserts && !this.buf.readAvail(1 + size)) {
    return false;
  }
  this.buf.readAdvance(1);
  return this.buf.readInt(size);
}

// synchronously BSER decode a string and return the value
function loadFromBuffer(input) {
  var buf = new BunserBuf();
  var result = buf.append(input, true);
  if (buf.buf.readAvail()) {
    throw Error(
        'excess data found after input buffer, use BunserBuf instead');
  }
  if (typeof result === 'undefined') {
    throw Error(
        'no bser found in string and no error raised!?');
  }
  return result;
}
exports.loadFromBuffer = loadFromBuffer

// Byteswap an arbitrary buffer, flipping from one endian
// to the other, returning a new buffer with the resultant data
function byteswap64(buf) {
  var swap = Buffer.alloc(buf.length);
  for (var i = 0; i < buf.length; i++) {
    swap[i] = buf[buf.length -1 - i];
  }
  return swap;
}

function dump_int64(buf, val) {
  // Get the raw bytes.  The Int64 buffer is big endian
  var be = val.toBuffer();

  if (isBigEndian) {
    // We're a big endian system, so the buffer is exactly how we
    // want it to be
    buf.writeByte(BSER_INT64);
    buf.append(be);
    return;
  }
  // We need to byte swap to get the correct representation
  var le = byteswap64(be);
  buf.writeByte(BSER_INT64);
  buf.append(le);
}

function dump_int(buf, val) {
  var abs = Math.abs(val);
  if (abs <= MAX_INT8) {
    buf.writeByte(BSER_INT8);
    buf.writeInt(val, 1);
  } else if (abs <= MAX_INT16) {
    buf.writeByte(BSER_INT16);
    buf.writeInt(val, 2);
  } else if (abs <= MAX_INT32) {
    buf.writeByte(BSER_INT32);
    buf.writeInt(val, 4);
  } else {
    dump_int64(buf, new Int64(val));
  }
}

function dump_any(buf, val) {
  switch (typeof(val)) {
    case 'number':
      // check if it is an integer or a float
      if (isFinite(val) && Math.floor(val) === val) {
        dump_int(buf, val);
      } else {
        buf.writeByte(BSER_REAL);
        buf.writeDouble(val);
      }
      return;
    case 'string':
      buf.writeByte(BSER_STRING);
      dump_int(buf, Buffer.byteLength(val));
      buf.append(val);
      return;
    case 'boolean':
      buf.writeByte(val ? BSER_TRUE : BSER_FALSE);
      return;
    case 'object':
      if (val === null) {
        buf.writeByte(BSER_NULL);
        return;
      }
      if (val instanceof Int64) {
        dump_int64(buf, val);
        return;
      }
      if (Array.isArray(val)) {
        buf.writeByte(BSER_ARRAY);
        dump_int(buf, val.length);
        for (var i = 0; i < val.length; ++i) {
          dump_any(buf, val[i]);
        }
        return;
      }
      buf.writeByte(BSER_OBJECT);
      var keys = Object.keys(val);

      // First pass to compute number of defined keys
      var num_keys = keys.length;
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var v = val[key];
        if (typeof(v) == 'undefined') {
          num_keys--;
        }
      }
      dump_int(buf, num_keys);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var v = val[key];
        if (typeof(v) == 'undefined') {
          // Don't include it
          continue;
        }
        dump_any(buf, key);
        try {
          dump_any(buf, v);
        } catch (e) {
          throw new Error(
            e.message + ' (while serializing object property with name `' +
              key + "')");
        }
      }
      return;

    default:
      throw new Error('cannot serialize type ' + typeof(val) + ' to BSER');
  }
}

// BSER encode value and return a buffer of the contents
function dumpToBuffer(val) {
  var buf = new Accumulator();
  // Build out the header
  buf.writeByte(0);
  buf.writeByte(1);
  // Reserve room for an int32 to hold our PDU length
  buf.writeByte(BSER_INT32);
  buf.writeInt(0, 4); // We'll come back and fill this in at the end

  dump_any(buf, val);

  // Compute PDU length
  var off = buf.writeOffset;
  var len = off - 7 /* the header length */;
  buf.writeOffset = 3; // The length value to fill in
  buf.writeInt(len, 4); // write the length in the space we reserved
  buf.writeOffset = off;

  return buf.buf.slice(0, off);
}
exports.dumpToBuffer = dumpToBuffer


/***/ }),
/* 176 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 177 */
/***/ (function(module, exports) {

//     Int64.js
//
//     Copyright (c) 2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

/**
 * Support for handling 64-bit int numbers in Javascript (node.js)
 *
 * JS Numbers are IEEE-754 binary double-precision floats, which limits the
 * range of values that can be represented with integer precision to:
 *
 * 2^^53 <= N <= 2^53
 *
 * Int64 objects wrap a node Buffer that holds the 8-bytes of int64 data.  These
 * objects operate directly on the buffer which means that if they are created
 * using an existing buffer then setting the value will modify the Buffer, and
 * vice-versa.
 *
 * Internal Representation
 *
 * The internal buffer format is Big Endian.  I.e. the most-significant byte is
 * at buffer[0], the least-significant at buffer[7].  For the purposes of
 * converting to/from JS native numbers, the value is assumed to be a signed
 * integer stored in 2's complement form.
 *
 * For details about IEEE-754 see:
 * http://en.wikipedia.org/wiki/Double_precision_floating-point_format
 */

// Useful masks and values for bit twiddling
var MASK31 =  0x7fffffff, VAL31 = 0x80000000;
var MASK32 =  0xffffffff, VAL32 = 0x100000000;

// Map for converting hex octets to strings
var _HEX = [];
for (var i = 0; i < 256; i++) {
  _HEX[i] = (i > 0xF ? '' : '0') + i.toString(16);
}

//
// Int64
//

/**
 * Constructor accepts any of the following argument types:
 *
 * new Int64(buffer[, offset=0]) - Existing Buffer with byte offset
 * new Int64(Uint8Array[, offset=0]) - Existing Uint8Array with a byte offset
 * new Int64(string)             - Hex string (throws if n is outside int64 range)
 * new Int64(number)             - Number (throws if n is outside int64 range)
 * new Int64(hi, lo)             - Raw bits as two 32-bit values
 */
var Int64 = module.exports = function(a1, a2) {
  if (a1 instanceof Buffer) {
    this.buffer = a1;
    this.offset = a2 || 0;
  } else if (Object.prototype.toString.call(a1) == '[object Uint8Array]') {
    // Under Browserify, Buffers can extend Uint8Arrays rather than an
    // instance of Buffer. We could assume the passed in Uint8Array is actually
    // a buffer but that won't handle the case where a raw Uint8Array is passed
    // in. We construct a new Buffer just in case.
    this.buffer = new Buffer(a1);
    this.offset = a2 || 0;
  } else {
    this.buffer = this.buffer || new Buffer(8);
    this.offset = 0;
    this.setValue.apply(this, arguments);
  }
};


// Max integer value that JS can accurately represent
Int64.MAX_INT = Math.pow(2, 53);

// Min integer value that JS can accurately represent
Int64.MIN_INT = -Math.pow(2, 53);

Int64.prototype = {

  constructor: Int64,

  /**
   * Do in-place 2's compliment.  See
   * http://en.wikipedia.org/wiki/Two's_complement
   */
  _2scomp: function() {
    var b = this.buffer, o = this.offset, carry = 1;
    for (var i = o + 7; i >= o; i--) {
      var v = (b[i] ^ 0xff) + carry;
      b[i] = v & 0xff;
      carry = v >> 8;
    }
  },

  /**
   * Set the value. Takes any of the following arguments:
   *
   * setValue(string) - A hexidecimal string
   * setValue(number) - Number (throws if n is outside int64 range)
   * setValue(hi, lo) - Raw bits as two 32-bit values
   */
  setValue: function(hi, lo) {
    var negate = false;
    if (arguments.length == 1) {
      if (typeof(hi) == 'number') {
        // Simplify bitfield retrieval by using abs() value.  We restore sign
        // later
        negate = hi < 0;
        hi = Math.abs(hi);
        lo = hi % VAL32;
        hi = hi / VAL32;
        if (hi > VAL32) throw new RangeError(hi  + ' is outside Int64 range');
        hi = hi | 0;
      } else if (typeof(hi) == 'string') {
        hi = (hi + '').replace(/^0x/, '');
        lo = hi.substr(-8);
        hi = hi.length > 8 ? hi.substr(0, hi.length - 8) : '';
        hi = parseInt(hi, 16);
        lo = parseInt(lo, 16);
      } else {
        throw new Error(hi + ' must be a Number or String');
      }
    }

    // Technically we should throw if hi or lo is outside int32 range here, but
    // it's not worth the effort. Anything past the 32'nd bit is ignored.

    // Copy bytes to buffer
    var b = this.buffer, o = this.offset;
    for (var i = 7; i >= 0; i--) {
      b[o+i] = lo & 0xff;
      lo = i == 4 ? hi : lo >>> 8;
    }

    // Restore sign of passed argument
    if (negate) this._2scomp();
  },

  /**
   * Convert to a native JS number.
   *
   * WARNING: Do not expect this value to be accurate to integer precision for
   * large (positive or negative) numbers!
   *
   * @param allowImprecise If true, no check is performed to verify the
   * returned value is accurate to integer precision.  If false, imprecise
   * numbers (very large positive or negative numbers) will be forced to +/-
   * Infinity.
   */
  toNumber: function(allowImprecise) {
    var b = this.buffer, o = this.offset;

    // Running sum of octets, doing a 2's complement
    var negate = b[o] & 0x80, x = 0, carry = 1;
    for (var i = 7, m = 1; i >= 0; i--, m *= 256) {
      var v = b[o+i];

      // 2's complement for negative numbers
      if (negate) {
        v = (v ^ 0xff) + carry;
        carry = v >> 8;
        v = v & 0xff;
      }

      x += v * m;
    }

    // Return Infinity if we've lost integer precision
    if (!allowImprecise && x >= Int64.MAX_INT) {
      return negate ? -Infinity : Infinity;
    }

    return negate ? -x : x;
  },

  /**
   * Convert to a JS Number. Returns +/-Infinity for values that can't be
   * represented to integer precision.
   */
  valueOf: function() {
    return this.toNumber(false);
  },

  /**
   * Return string value
   *
   * @param radix Just like Number#toString()'s radix
   */
  toString: function(radix) {
    return this.valueOf().toString(radix || 10);
  },

  /**
   * Return a string showing the buffer octets, with MSB on the left.
   *
   * @param sep separator string. default is '' (empty string)
   */
  toOctetString: function(sep) {
    var out = new Array(8);
    var b = this.buffer, o = this.offset;
    for (var i = 0; i < 8; i++) {
      out[i] = _HEX[b[o+i]];
    }
    return out.join(sep || '');
  },

  /**
   * Returns the int64's 8 bytes in a buffer.
   *
   * @param {bool} [rawBuffer=false]  If no offset and this is true, return the internal buffer.  Should only be used if
   *                                  you're discarding the Int64 afterwards, as it breaks encapsulation.
   */
  toBuffer: function(rawBuffer) {
    if (rawBuffer && this.offset === 0) return this.buffer;

    var out = new Buffer(8);
    this.buffer.copy(out, 0, this.offset, this.offset + 8);
    return out;
  },

  /**
   * Copy 8 bytes of int64 into target buffer at target offset.
   *
   * @param {Buffer} targetBuffer       Buffer to copy into.
   * @param {number} [targetOffset=0]   Offset into target buffer.
   */
  copy: function(targetBuffer, targetOffset) {
    this.buffer.copy(targetBuffer, targetOffset || 0, this.offset, this.offset + 8);
  },

  /**
   * Returns a number indicating whether this comes before or after or is the
   * same as the other in sort order.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  compare: function(other) {

    // If sign bits differ ...
    if ((this.buffer[this.offset] & 0x80) != (other.buffer[other.offset] & 0x80)) {
      return other.buffer[other.offset] - this.buffer[this.offset];
    }

    // otherwise, compare bytes lexicographically
    for (var i = 0; i < 8; i++) {
      if (this.buffer[this.offset+i] !== other.buffer[other.offset+i]) {
        return this.buffer[this.offset+i] - other.buffer[other.offset+i];
      }
    }
    return 0;
  },

  /**
   * Returns a boolean indicating if this integer is equal to other.
   *
   * @param {Int64} other  Other Int64 to compare.
   */
  equals: function(other) {
    return this.compare(other) === 0;
  },

  /**
   * Pretty output in console.log
   */
  inspect: function() {
    return '[Int64 value:' + this + ' octets:' + this.toOctetString(' ') + ']';
  }
};


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

var RSVP = __webpack_require__(179);

var exit;
var handlers = [];
var lastTime;
var isExiting = false;

process.on('beforeExit', function (code) {
  if (handlers.length === 0) { return; }

  var own = lastTime = module.exports._flush(lastTime, code)
    .finally(function () {
      // if an onExit handler has called process.exit, do not disturb
      // `lastTime`.
      //
      // Otherwise, clear `lastTime` so that we know to synchronously call the
      // real `process.exit` with the given exit code, when our captured
      // `process.exit` is called during a `process.on('exit')` handler
      //
      // This is impossible to reason about, don't feel bad.  Just look at
      // test-natural-exit-subprocess-error.js
      if (own === lastTime) {
        lastTime = undefined;
      }
    });
});

// This exists only for testing
module.exports._reset = function () {
  module.exports.releaseExit();
  handlers = [];
  lastTime = undefined;
  isExiting = false;
  firstExitCode = undefined;
}

/*
 * To allow cooperative async exit handlers, we unfortunately must hijack
 * process.exit.
 *
 * It allows a handler to ensure exit, without that exit handler impeding other
 * similar handlers
 *
 * for example, see: https://github.com/sindresorhus/ora/issues/27
 *
 */
module.exports.releaseExit = function() {
  if (exit) {
    process.exit = exit;
    exit = null;
  }
};

var firstExitCode;

module.exports.captureExit = function() {
  if (exit) {
    // already captured, no need to do more work
    return;
  }
  exit = process.exit;

  process.exit = function(code) {
    if (handlers.length === 0 && lastTime === undefined) {
      // synchronously exit.
      //
      // We do this brecause either
      //
      //  1.  The process exited due to a call to `process.exit` but we have no
      //      async work to do because no handlers had been attached.  It
      //      doesn't really matter whether we take this branch or not in this
      //      case.
      //
      //  2.  The process exited naturally.  We did our async work during
      //      `beforeExit` and are in this function because someone else has
      //      called `process.exit` during an `on('exit')` hook.  The only way
      //      for us to preserve the exit code in this case is to exit
      //      synchronously.
      //
      return exit.call(process, code);
    }

    if (firstExitCode === undefined) {
      firstExitCode = code;
    }
    var own = lastTime = module.exports._flush(lastTime, firstExitCode)
      .then(function() {
        // if another chain has started, let it exit
        if (own !== lastTime) { return; }
        exit.call(process, firstExitCode);
      })
      .catch(function(error) {
        // if another chain has started, let it exit
        if (own !== lastTime) {
          throw error;
        }
        console.error(error);
        exit.call(process, 1);
      });
  };
};

module.exports._handlers = handlers;
module.exports._flush = function(lastTime, code) {
  isExiting = true;
  var work = handlers.splice(0, handlers.length);

  return RSVP.Promise.resolve(lastTime).
    then(function() {
      var firstRejected;
      return RSVP.allSettled(work.map(function(handler) {
        return RSVP.resolve(handler.call(null, code)).catch(function(e) {
          if (!firstRejected) {
            firstRejected = e;
          }
          throw e;
        });
      })).then(function(results) {
        if (firstRejected) {
          throw firstRejected;
        }
      });
    });
};

module.exports.onExit = function(cb) {
  if (!exit) {
    throw new Error('Cannot install handler when exit is not captured.  Call `captureExit()` first');
  }
  if (isExiting) {
    throw new Error('Cannot install handler while `onExit` handlers are running.');
  }
  var index = handlers.indexOf(cb);

  if (index > -1) { return; }
  handlers.push(cb);
};

module.exports.offExit = function(cb) {
  var index = handlers.indexOf(cb);

  if (index < 0) { return; }

  handlers.splice(index, 1);
};

module.exports.exit  = function() {
  exit.apply(process, arguments);
};

module.exports.listenerCount = function() {
  return handlers.length;
};


/***/ }),
/* 179 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "asap", function() { return asap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cast", function() { return cast; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Promise", function() { return Promise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventTarget", function() { return EventTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "all", function() { return all$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allSettled", function() { return allSettled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "race", function() { return race$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hash", function() { return hash; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hashSettled", function() { return hashSettled; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rethrow", function() { return rethrow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defer", function() { return defer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "denodeify", function() { return denodeify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "configure", function() { return configure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "off", function() { return off; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolve", function() { return resolve$2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reject", function() { return reject$2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "async", function() { return async; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/*!
 * @overview RSVP - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2016 Yehuda Katz, Tom Dale, Stefan Penner and contributors
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/tildeio/rsvp.js/master/LICENSE
 * @version   4.8.4+ff10049b
 */

function callbacksFor(object) {
  var callbacks = object._promiseCallbacks;

  if (!callbacks) {
    callbacks = object._promiseCallbacks = {};
  }

  return callbacks;
}

/**
  @class EventTarget
  @for rsvp
  @public
*/
var EventTarget = {

  /**
    `EventTarget.mixin` extends an object with EventTarget methods. For
    Example:
     ```javascript
    import EventTarget from 'rsvp';
     let object = {};
     EventTarget.mixin(object);
     object.on('finished', function(event) {
      // handle event
    });
     object.trigger('finished', { detail: value });
    ```
     `EventTarget.mixin` also works with prototypes:
     ```javascript
    import EventTarget from 'rsvp';
     let Person = function() {};
    EventTarget.mixin(Person.prototype);
     let yehuda = new Person();
    let tom = new Person();
     yehuda.on('poke', function(event) {
      console.log('Yehuda says OW');
    });
     tom.on('poke', function(event) {
      console.log('Tom says OW');
    });
     yehuda.trigger('poke');
    tom.trigger('poke');
    ```
     @method mixin
    @for rsvp
    @private
    @param {Object} object object to extend with EventTarget methods
  */
  mixin: function (object) {
    object.on = this.on;
    object.off = this.off;
    object.trigger = this.trigger;
    object._promiseCallbacks = undefined;
    return object;
  },


  /**
    Registers a callback to be executed when `eventName` is triggered
     ```javascript
    object.on('event', function(eventInfo){
      // handle the event
    });
     object.trigger('event');
    ```
     @method on
    @for EventTarget
    @private
    @param {String} eventName name of the event to listen for
    @param {Function} callback function to be called when the event is triggered.
  */
  on: function (eventName, callback) {
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function');
    }

    var allCallbacks = callbacksFor(this);
    var callbacks = allCallbacks[eventName];

    if (!callbacks) {
      callbacks = allCallbacks[eventName] = [];
    }

    if (callbacks.indexOf(callback) === -1) {
      callbacks.push(callback);
    }
  },


  /**
    You can use `off` to stop firing a particular callback for an event:
     ```javascript
    function doStuff() { // do stuff! }
    object.on('stuff', doStuff);
     object.trigger('stuff'); // doStuff will be called
     // Unregister ONLY the doStuff callback
    object.off('stuff', doStuff);
    object.trigger('stuff'); // doStuff will NOT be called
    ```
     If you don't pass a `callback` argument to `off`, ALL callbacks for the
    event will not be executed when the event fires. For example:
     ```javascript
    let callback1 = function(){};
    let callback2 = function(){};
     object.on('stuff', callback1);
    object.on('stuff', callback2);
     object.trigger('stuff'); // callback1 and callback2 will be executed.
     object.off('stuff');
    object.trigger('stuff'); // callback1 and callback2 will not be executed!
    ```
     @method off
    @for rsvp
    @private
    @param {String} eventName event to stop listening to
    @param {Function} [callback] optional argument. If given, only the function
    given will be removed from the event's callback queue. If no `callback`
    argument is given, all callbacks will be removed from the event's callback
    queue.
  */
  off: function (eventName, callback) {
    var allCallbacks = callbacksFor(this);

    if (!callback) {
      allCallbacks[eventName] = [];
      return;
    }

    var callbacks = allCallbacks[eventName];
    var index = callbacks.indexOf(callback);

    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  },


  /**
    Use `trigger` to fire custom events. For example:
     ```javascript
    object.on('foo', function(){
      console.log('foo event happened!');
    });
    object.trigger('foo');
    // 'foo event happened!' logged to the console
    ```
     You can also pass a value as a second argument to `trigger` that will be
    passed as an argument to all event listeners for the event:
     ```javascript
    object.on('foo', function(value){
      console.log(value.name);
    });
     object.trigger('foo', { name: 'bar' });
    // 'bar' logged to the console
    ```
     @method trigger
    @for rsvp
    @private
    @param {String} eventName name of the event to be triggered
    @param {*} [options] optional value to be passed to any event handlers for
    the given `eventName`
  */
  trigger: function (eventName, options, label) {
    var allCallbacks = callbacksFor(this);

    var callbacks = allCallbacks[eventName];
    if (callbacks) {
      // Don't cache the callbacks.length since it may grow
      var callback = void 0;
      for (var i = 0; i < callbacks.length; i++) {
        callback = callbacks[i];
        callback(options, label);
      }
    }
  }
};

var config = {
  instrument: false
};

EventTarget['mixin'](config);

function configure(name, value) {
  if (arguments.length === 2) {
    config[name] = value;
  } else {
    return config[name];
  }
}

var queue = [];

function scheduleFlush() {
  setTimeout(function () {
    for (var i = 0; i < queue.length; i++) {
      var entry = queue[i];

      var payload = entry.payload;

      payload.guid = payload.key + payload.id;
      payload.childGuid = payload.key + payload.childId;
      if (payload.error) {
        payload.stack = payload.error.stack;
      }

      config['trigger'](entry.name, entry.payload);
    }
    queue.length = 0;
  }, 50);
}

function instrument(eventName, promise, child) {
  if (1 === queue.push({
    name: eventName,
    payload: {
      key: promise._guidKey,
      id: promise._id,
      eventName: eventName,
      detail: promise._result,
      childId: child && child._id,
      label: promise._label,
      timeStamp: Date.now(),
      error: config["instrument-with-stack"] ? new Error(promise._label) : null
    } })) {
    scheduleFlush();
  }
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  import Promise from 'rsvp';

  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  import Promise from 'rsvp';

  let promise = RSVP.Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @for Promise
  @static
  @param {*} object value that the returned promise will be resolved with
  @param {String} [label] optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$$1(object, label) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop, label);
  resolve$1(promise, object);
  return promise;
}

function withOwnPromise() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

var tryCatchCallback = void 0;
function tryCatcher() {
  try {
    var target = tryCatchCallback;
    tryCatchCallback = null;
    return target.apply(this, arguments);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function tryCatch(fn) {
  tryCatchCallback = fn;
  return tryCatcher;
}

function handleForeignThenable(promise, thenable, then$$1) {
  config.async(function (promise) {
    var sealed = false;
    var result = tryCatch(then$$1).call(thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable === value) {
        fulfill(promise, value);
      } else {
        resolve$1(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && result === TRY_CATCH_ERROR) {
      sealed = true;
      var error = TRY_CATCH_ERROR.error;
      TRY_CATCH_ERROR.error = null;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    thenable._onError = null;
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      if (thenable === value) {
        fulfill(promise, value);
      } else {
        resolve$1(promise, value);
      }
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  var isOwnThenable = maybeThenable.constructor === promise.constructor && then$$1 === then && promise.constructor.resolve === resolve$$1;

  if (isOwnThenable) {
    handleOwnThenable(promise, maybeThenable);
  } else if (then$$1 === TRY_CATCH_ERROR) {
    var error = TRY_CATCH_ERROR.error;
    TRY_CATCH_ERROR.error = null;
    reject(promise, error);
  } else if (typeof then$$1 === 'function') {
    handleForeignThenable(promise, maybeThenable, then$$1);
  } else {
    fulfill(promise, maybeThenable);
  }
}

function resolve$1(promise, value) {
  if (promise === value) {
    fulfill(promise, value);
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onError) {
    promise._onError(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length === 0) {
    if (config.instrument) {
      instrument('fulfilled', promise);
    }
  } else {
    config.async(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;
  config.async(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var subscribers = parent._subscribers;
  var length = subscribers.length;

  parent._onError = null;

  subscribers[length] = child;
  subscribers[length + FULFILLED] = onFulfillment;
  subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    config.async(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (config.instrument) {
    instrument(settled === FULFILLED ? 'fulfilled' : 'rejected', promise);
  }

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      result = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, result);
    } else {
      callback(result);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(state, promise, callback, result) {
  var hasCallback = typeof callback === 'function';
  var value = void 0;

  if (hasCallback) {
    value = tryCatch(callback)(result);
  } else {
    value = result;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (value === promise) {
    reject(promise, withOwnPromise());
  } else if (value === TRY_CATCH_ERROR) {
    var error = TRY_CATCH_ERROR.error;
    TRY_CATCH_ERROR.error = null; // release
    reject(promise, error);
  } else if (hasCallback) {
    resolve$1(promise, value);
  } else if (state === FULFILLED) {
    fulfill(promise, value);
  } else if (state === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  var resolved = false;
  try {
    resolver(function (value) {
      if (resolved) {
        return;
      }
      resolved = true;
      resolve$1(promise, value);
    }, function (reason) {
      if (resolved) {
        return;
      }
      resolved = true;
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

function then(onFulfillment, onRejection, label) {
  var parent = this;
  var state = parent._state;

  if (state === FULFILLED && !onFulfillment || state === REJECTED && !onRejection) {
    config.instrument && instrument('chained', parent, parent);
    return parent;
  }

  parent._onError = null;

  var child = new parent.constructor(noop, label);
  var result = parent._result;

  config.instrument && instrument('chained', parent, child);

  if (state === PENDING) {
    subscribe(parent, child, onFulfillment, onRejection);
  } else {
    var callback = state === FULFILLED ? onFulfillment : onRejection;
    config.async(function () {
      return invokeCallback(state, child, callback, result);
    });
  }

  return child;
}

var Enumerator = function () {
  function Enumerator(Constructor, input, abortOnReject, label) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop, label);
    this._abortOnReject = abortOnReject;
    this._isUsingOwnPromise = Constructor === Promise;
    this._isUsingOwnResolve = Constructor.resolve === resolve$$1;

    this._init.apply(this, arguments);
  }

  Enumerator.prototype._init = function _init(Constructor, input) {
    var len = input.length || 0;
    this.length = len;
    this._remaining = len;
    this._result = new Array(len);

    this._enumerate(input);
  };

  Enumerator.prototype._enumerate = function _enumerate(input) {
    var length = this.length;
    var promise = this.promise;

    for (var i = 0; promise._state === PENDING && i < length; i++) {
      this._eachEntry(input[i], i, true);
    }
    this._checkFullfillment();
  };

  Enumerator.prototype._checkFullfillment = function _checkFullfillment() {
    if (this._remaining === 0) {
      var result = this._result;
      fulfill(this.promise, result);
      this._result = null;
    }
  };

  Enumerator.prototype._settleMaybeThenable = function _settleMaybeThenable(entry, i, firstPass) {
    var c = this._instanceConstructor;

    if (this._isUsingOwnResolve) {
      var then$$1 = getThen(entry);

      if (then$$1 === then && entry._state !== PENDING) {
        entry._onError = null;
        this._settledAt(entry._state, i, entry._result, firstPass);
      } else if (typeof then$$1 !== 'function') {
        this._settledAt(FULFILLED, i, entry, firstPass);
      } else if (this._isUsingOwnPromise) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, then$$1);
        this._willSettleAt(promise, i, firstPass);
      } else {
        this._willSettleAt(new c(function (resolve) {
          return resolve(entry);
        }), i, firstPass);
      }
    } else {
      this._willSettleAt(c.resolve(entry), i, firstPass);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i, firstPass) {
    if (entry !== null && typeof entry === 'object') {
      this._settleMaybeThenable(entry, i, firstPass);
    } else {
      this._setResultAt(FULFILLED, i, entry, firstPass);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value, firstPass) {
    var promise = this.promise;

    if (promise._state === PENDING) {
      if (this._abortOnReject && state === REJECTED) {
        reject(promise, value);
      } else {
        this._setResultAt(state, i, value, firstPass);
        this._checkFullfillment();
      }
    }
  };

  Enumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
    this._remaining--;
    this._result[i] = value;
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i, firstPass) {
    var _this = this;

    subscribe(promise, undefined, function (value) {
      return _this._settledAt(FULFILLED, i, value, firstPass);
    }, function (reason) {
      return _this._settledAt(REJECTED, i, reason, firstPass);
    });
  };

  return Enumerator;
}();


function setSettledResult(state, i, value) {
  this._remaining--;
  if (state === FULFILLED) {
    this._result[i] = {
      state: 'fulfilled',
      value: value
    };
  } else {
    this._result[i] = {
      state: 'rejected',
      reason: value
    };
  }
}

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  import Promise, { resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `RSVP.all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  import Promise, { resolve, reject } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @for Promise
  @param {Array} entries array of promises
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries, label) {
  if (!Array.isArray(entries)) {
    return this.reject(new TypeError("Promise.all must be called with an array"), label);
  }
  return new Enumerator(this, entries, true /* abort on reject */, label).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  import Promise from 'rsvp';

  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  import Promise from 'rsvp';

  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  import Promise from 'rsvp';

  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @for Promise
  @static
  @param {Array} entries array of promises to observe
  @param {String} [label] optional string for describing the promise returned.
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries, label) {
  /*jshint validthis:true */
  var Constructor = this;

  var promise = new Constructor(noop, label);

  if (!Array.isArray(entries)) {
    reject(promise, new TypeError('Promise.race must be called with an array'));
    return promise;
  }

  for (var i = 0; promise._state === PENDING && i < entries.length; i++) {
    subscribe(Constructor.resolve(entries[i]), undefined, function (value) {
      return resolve$1(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }

  return promise;
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  import Promise from 'rsvp';

  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  import Promise from 'rsvp';

  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @for Promise
  @static
  @param {*} reason value that the returned promise will be rejected with.
  @param {String} [label] optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason, label) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop, label);
  reject(promise, reason);
  return promise;
}

var guidKey = 'rsvp_' + Date.now() + '-';
var counter = 0;

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise’s eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @public
  @param {function} resolver
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @constructor
*/

var Promise = function () {
  function Promise(resolver, label) {
    this._id = counter++;
    this._label = label;
    this._state = undefined;
    this._result = undefined;
    this._subscribers = [];

    config.instrument && instrument('created', this);

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  Promise.prototype._onError = function _onError(reason) {
    var _this = this;

    config.after(function () {
      if (_this._onError) {
        config.trigger('error', reason, _this._label);
      }
    });
  };

  /**
    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
    as the catch block of a try/catch statement.
  
    ```js
    function findAuthor(){
      throw new Error('couldn\'t find that author');
    }
  
    // synchronous
    try {
      findAuthor();
    } catch(reason) {
      // something went wrong
    }
  
    // async with promises
    findAuthor().catch(function(reason){
      // something went wrong
    });
    ```
  
    @method catch
    @param {Function} onRejection
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection, label) {
    return this.then(undefined, onRejection, label);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuthor();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuthor();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @param {String} [label] optional string for labeling the promise.
    Useful for tooling.
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback, label) {
    var promise = this;
    var constructor = promise.constructor;

    if (typeof callback === 'function') {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise.cast = resolve$$1; // deprecated
Promise.all = all;
Promise.race = race;
Promise.resolve = resolve$$1;
Promise.reject = reject$1;

Promise.prototype._guidKey = guidKey;

/**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.

  ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```

  Chaining
  --------

  The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.

  ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });

  findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we\'re unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we\'re unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

  ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```

  Assimilation
  ------------

  Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.

  ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```

  If the assimliated promise rejects, then the downstream promise will also reject.

  ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```

  Simple Example
  --------------

  Synchronous Example

  ```javascript
  let result;

  try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```

  Errback Example

  ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```

  Promise Example;

  ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```

  Advanced Example
  --------------

  Synchronous Example

  ```javascript
  let author, books;

  try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```

  Errback Example

  ```js

  function foundBooks(books) {

  }

  function failure(reason) {

  }

  findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```

  Promise Example;

  ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```

  @method then
  @param {Function} onFulfillment
  @param {Function} onRejection
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Promise}
*/
Promise.prototype.then = then;

function makeObject(_, argumentNames) {
  var obj = {};
  var length = _.length;
  var args = new Array(length);

  for (var x = 0; x < length; x++) {
    args[x] = _[x];
  }

  for (var i = 0; i < argumentNames.length; i++) {
    var name = argumentNames[i];
    obj[name] = args[i + 1];
  }

  return obj;
}

function arrayResult(_) {
  var length = _.length;
  var args = new Array(length - 1);

  for (var i = 1; i < length; i++) {
    args[i - 1] = _[i];
  }

  return args;
}

function wrapThenable(then, promise) {
  return {
    then: function (onFulFillment, onRejection) {
      return then.call(promise, onFulFillment, onRejection);
    }
  };
}

/**
  `denodeify` takes a 'node-style' function and returns a function that
  will return an `Promise`. You can use `denodeify` in Node.js or the
  browser when you'd prefer to use promises over using callbacks. For example,
  `denodeify` transforms the following:

  ```javascript
  let fs = require('fs');

  fs.readFile('myfile.txt', function(err, data){
    if (err) return handleError(err);
    handleData(data);
  });
  ```

  into:

  ```javascript
  let fs = require('fs');
  let readFile = denodeify(fs.readFile);

  readFile('myfile.txt').then(handleData, handleError);
  ```

  If the node function has multiple success parameters, then `denodeify`
  just returns the first one:

  ```javascript
  let request = denodeify(require('request'));

  request('http://example.com').then(function(res) {
    // ...
  });
  ```

  However, if you need all success parameters, setting `denodeify`'s
  second parameter to `true` causes it to return all success parameters
  as an array:

  ```javascript
  let request = denodeify(require('request'), true);

  request('http://example.com').then(function(result) {
    // result[0] -> res
    // result[1] -> body
  });
  ```

  Or if you pass it an array with names it returns the parameters as a hash:

  ```javascript
  let request = denodeify(require('request'), ['res', 'body']);

  request('http://example.com').then(function(result) {
    // result.res
    // result.body
  });
  ```

  Sometimes you need to retain the `this`:

  ```javascript
  let app = require('express')();
  let render = denodeify(app.render.bind(app));
  ```

  The denodified function inherits from the original function. It works in all
  environments, except IE 10 and below. Consequently all properties of the original
  function are available to you. However, any properties you change on the
  denodeified function won't be changed on the original function. Example:

  ```javascript
  let request = denodeify(require('request')),
      cookieJar = request.jar(); // <- Inheritance is used here

  request('http://example.com', {jar: cookieJar}).then(function(res) {
    // cookieJar.cookies holds now the cookies returned by example.com
  });
  ```

  Using `denodeify` makes it easier to compose asynchronous operations instead
  of using callbacks. For example, instead of:

  ```javascript
  let fs = require('fs');

  fs.readFile('myfile.txt', function(err, data){
    if (err) { ... } // Handle error
    fs.writeFile('myfile2.txt', data, function(err){
      if (err) { ... } // Handle error
      console.log('done')
    });
  });
  ```

  you can chain the operations together using `then` from the returned promise:

  ```javascript
  let fs = require('fs');
  let readFile = denodeify(fs.readFile);
  let writeFile = denodeify(fs.writeFile);

  readFile('myfile.txt').then(function(data){
    return writeFile('myfile2.txt', data);
  }).then(function(){
    console.log('done')
  }).catch(function(error){
    // Handle error
  });
  ```

  @method denodeify
  @public
  @static
  @for rsvp
  @param {Function} nodeFunc a 'node-style' function that takes a callback as
  its last argument. The callback expects an error to be passed as its first
  argument (if an error occurred, otherwise null), and the value from the
  operation as its second argument ('function(err, value){ }').
  @param {Boolean|Array} [options] An optional paramter that if set
  to `true` causes the promise to fulfill with the callback's success arguments
  as an array. This is useful if the node function has multiple success
  paramters. If you set this paramter to an array with names, the promise will
  fulfill with a hash with these names as keys and the success parameters as
  values.
  @return {Function} a function that wraps `nodeFunc` to return a `Promise`
*/
function denodeify(nodeFunc, options) {
  var fn = function () {
    var l = arguments.length;
    var args = new Array(l + 1);
    var promiseInput = false;

    for (var i = 0; i < l; ++i) {
      var arg = arguments[i];

      if (!promiseInput) {
        // TODO: clean this up
        promiseInput = needsPromiseInput(arg);
        if (promiseInput === TRY_CATCH_ERROR) {
          var error = TRY_CATCH_ERROR.error;
          TRY_CATCH_ERROR.error = null;
          var p = new Promise(noop);
          reject(p, error);
          return p;
        } else if (promiseInput && promiseInput !== true) {
          arg = wrapThenable(promiseInput, arg);
        }
      }
      args[i] = arg;
    }

    var promise = new Promise(noop);

    args[l] = function (err, val) {
      if (err) {
        reject(promise, err);
      } else if (options === undefined) {
        resolve$1(promise, val);
      } else if (options === true) {
        resolve$1(promise, arrayResult(arguments));
      } else if (Array.isArray(options)) {
        resolve$1(promise, makeObject(arguments, options));
      } else {
        resolve$1(promise, val);
      }
    };

    if (promiseInput) {
      return handlePromiseInput(promise, args, nodeFunc, this);
    } else {
      return handleValueInput(promise, args, nodeFunc, this);
    }
  };

  fn.__proto__ = nodeFunc;

  return fn;
}

function handleValueInput(promise, args, nodeFunc, self) {
  var result = tryCatch(nodeFunc).apply(self, args);
  if (result === TRY_CATCH_ERROR) {
    var error = TRY_CATCH_ERROR.error;
    TRY_CATCH_ERROR.error = null;
    reject(promise, error);
  }
  return promise;
}

function handlePromiseInput(promise, args, nodeFunc, self) {
  return Promise.all(args).then(function (args) {
    return handleValueInput(promise, args, nodeFunc, self);
  });
}

function needsPromiseInput(arg) {
  if (arg !== null && typeof arg === 'object') {
    if (arg.constructor === Promise) {
      return true;
    } else {
      return getThen(arg);
    }
  } else {
    return false;
  }
}

/**
  This is a convenient alias for `Promise.all`.

  @method all
  @public
  @static
  @for rsvp
  @param {Array} array Array of promises.
  @param {String} [label] An optional label. This is useful
  for tooling.
*/
function all$1(array, label) {
  return Promise.all(array, label);
}

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
@module rsvp
@public
**/

var AllSettled = function (_Enumerator) {
  _inherits(AllSettled, _Enumerator);

  function AllSettled(Constructor, entries, label) {
    return _possibleConstructorReturn(this, _Enumerator.call(this, Constructor, entries, false /* don't abort on reject */, label));
  }

  return AllSettled;
}(Enumerator);

AllSettled.prototype._setResultAt = setSettledResult;

/**
`RSVP.allSettled` is similar to `RSVP.all`, but instead of implementing
a fail-fast method, it waits until all the promises have returned and
shows you all the results. This is useful if you want to handle multiple
promises' failure states together as a set.
 Returns a promise that is fulfilled when all the given promises have been
settled. The return promise is fulfilled with an array of the states of
the promises passed into the `promises` array argument.
 Each state object will either indicate fulfillment or rejection, and
provide the corresponding value or reason. The states will take one of
the following formats:
 ```javascript
{ state: 'fulfilled', value: value }
  or
{ state: 'rejected', reason: reason }
```
 Example:
 ```javascript
let promise1 = RSVP.Promise.resolve(1);
let promise2 = RSVP.Promise.reject(new Error('2'));
let promise3 = RSVP.Promise.reject(new Error('3'));
let promises = [ promise1, promise2, promise3 ];
 RSVP.allSettled(promises).then(function(array){
  // array == [
  //   { state: 'fulfilled', value: 1 },
  //   { state: 'rejected', reason: Error },
  //   { state: 'rejected', reason: Error }
  // ]
  // Note that for the second item, reason.message will be '2', and for the
  // third item, reason.message will be '3'.
}, function(error) {
  // Not run. (This block would only be called if allSettled had failed,
  // for instance if passed an incorrect argument type.)
});
```
 @method allSettled
@public
@static
@for rsvp
@param {Array} entries
@param {String} [label] - optional string that describes the promise.
Useful for tooling.
@return {Promise} promise that is fulfilled with an array of the settled
states of the constituent promises.
*/

function allSettled(entries, label) {
  if (!Array.isArray(entries)) {
    return Promise.reject(new TypeError("Promise.allSettled must be called with an array"), label);
  }

  return new AllSettled(Promise, entries, label).promise;
}

/**
  This is a convenient alias for `Promise.race`.

  @method race
  @public
  @static
  @for rsvp
  @param {Array} array Array of promises.
  @param {String} [label] An optional label. This is useful
  for tooling.
 */
function race$1(array, label) {
  return Promise.race(array, label);
}

function _possibleConstructorReturn$1(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$1(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PromiseHash = function (_Enumerator) {
  _inherits$1(PromiseHash, _Enumerator);

  function PromiseHash(Constructor, object) {
    var abortOnReject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var label = arguments[3];
    return _possibleConstructorReturn$1(this, _Enumerator.call(this, Constructor, object, abortOnReject, label));
  }

  PromiseHash.prototype._init = function _init(Constructor, object) {
    this._result = {};
    this._enumerate(object);
  };

  PromiseHash.prototype._enumerate = function _enumerate(input) {
    var keys = Object.keys(input);

    var length = keys.length;
    var promise = this.promise;
    this._remaining = length;

    var key = void 0,
        val = void 0;
    for (var i = 0; promise._state === PENDING && i < length; i++) {
      key = keys[i];
      val = input[key];
      this._eachEntry(val, key, true);
    }

    this._checkFullfillment();
  };

  return PromiseHash;
}(Enumerator);

/**
  `hash` is similar to `all`, but takes an object instead of an array
  for its `promises` argument.

  Returns a promise that is fulfilled when all the given promises have been
  fulfilled, or rejected if any of them become rejected. The returned promise
  is fulfilled with a hash that has the same key names as the `promises` object
  argument. If any of the values in the object are not promises, they will
  simply be copied over to the fulfilled object.

  Example:

  ```javascript
  let promises = {
    myPromise: resolve(1),
    yourPromise: resolve(2),
    theirPromise: resolve(3),
    notAPromise: 4
  };

  hash(promises).then(function(hash){
    // hash here is an object that looks like:
    // {
    //   myPromise: 1,
    //   yourPromise: 2,
    //   theirPromise: 3,
    //   notAPromise: 4
    // }
  });
  ```

  If any of the `promises` given to `hash` are rejected, the first promise
  that is rejected will be given as the reason to the rejection handler.

  Example:

  ```javascript
  let promises = {
    myPromise: resolve(1),
    rejectedPromise: reject(new Error('rejectedPromise')),
    anotherRejectedPromise: reject(new Error('anotherRejectedPromise')),
  };

  hash(promises).then(function(hash){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === 'rejectedPromise'
  });
  ```

  An important note: `hash` is intended for plain JavaScript objects that
  are just a set of keys and values. `hash` will NOT preserve prototype
  chains.

  Example:

  ```javascript
  import { hash, resolve } from 'rsvp';
  function MyConstructor(){
    this.example = resolve('Example');
  }

  MyConstructor.prototype = {
    protoProperty: resolve('Proto Property')
  };

  let myObject = new MyConstructor();

  hash(myObject).then(function(hash){
    // protoProperty will not be present, instead you will just have an
    // object that looks like:
    // {
    //   example: 'Example'
    // }
    //
    // hash.hasOwnProperty('protoProperty'); // false
    // 'undefined' === typeof hash.protoProperty
  });
  ```

  @method hash
  @public
  @static
  @for rsvp
  @param {Object} object
  @param {String} [label] optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all properties of `promises`
  have been fulfilled, or rejected if any of them become rejected.
*/
function hash(object, label) {
  return Promise.resolve(object, label).then(function (object) {
    if (object === null || typeof object !== 'object') {
      throw new TypeError("Promise.hash must be called with an object");
    }
    return new PromiseHash(Promise, object, label).promise;
  });
}

function _possibleConstructorReturn$2(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$2(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HashSettled = function (_PromiseHash) {
  _inherits$2(HashSettled, _PromiseHash);

  function HashSettled(Constructor, object, label) {
    return _possibleConstructorReturn$2(this, _PromiseHash.call(this, Constructor, object, false, label));
  }

  return HashSettled;
}(PromiseHash);

HashSettled.prototype._setResultAt = setSettledResult;

/**
  `hashSettled` is similar to `allSettled`, but takes an object
  instead of an array for its `promises` argument.

  Unlike `all` or `hash`, which implement a fail-fast method,
  but like `allSettled`, `hashSettled` waits until all the
  constituent promises have returned and then shows you all the results
  with their states and values/reasons. This is useful if you want to
  handle multiple promises' failure states together as a set.

  Returns a promise that is fulfilled when all the given promises have been
  settled, or rejected if the passed parameters are invalid.

  The returned promise is fulfilled with a hash that has the same key names as
  the `promises` object argument. If any of the values in the object are not
  promises, they will be copied over to the fulfilled object and marked with state
  'fulfilled'.

  Example:

  ```javascript
  import { hashSettled, resolve } from 'rsvp';

  let promises = {
    myPromise: resolve(1),
    yourPromise: resolve(2),
    theirPromise: resolve(3),
    notAPromise: 4
  };

  hashSettled(promises).then(function(hash){
    // hash here is an object that looks like:
    // {
    //   myPromise: { state: 'fulfilled', value: 1 },
    //   yourPromise: { state: 'fulfilled', value: 2 },
    //   theirPromise: { state: 'fulfilled', value: 3 },
    //   notAPromise: { state: 'fulfilled', value: 4 }
    // }
  });
  ```

  If any of the `promises` given to `hash` are rejected, the state will
  be set to 'rejected' and the reason for rejection provided.

  Example:

  ```javascript
  import { hashSettled, reject, resolve } from 'rsvp';

  let promises = {
    myPromise: resolve(1),
    rejectedPromise: reject(new Error('rejection')),
    anotherRejectedPromise: reject(new Error('more rejection')),
  };

  hashSettled(promises).then(function(hash){
    // hash here is an object that looks like:
    // {
    //   myPromise:              { state: 'fulfilled', value: 1 },
    //   rejectedPromise:        { state: 'rejected', reason: Error },
    //   anotherRejectedPromise: { state: 'rejected', reason: Error },
    // }
    // Note that for rejectedPromise, reason.message == 'rejection',
    // and for anotherRejectedPromise, reason.message == 'more rejection'.
  });
  ```

  An important note: `hashSettled` is intended for plain JavaScript objects that
  are just a set of keys and values. `hashSettled` will NOT preserve prototype
  chains.

  Example:

  ```javascript
  import Promise, { hashSettled, resolve } from 'rsvp';

  function MyConstructor(){
    this.example = resolve('Example');
  }

  MyConstructor.prototype = {
    protoProperty: Promise.resolve('Proto Property')
  };

  let myObject = new MyConstructor();

  hashSettled(myObject).then(function(hash){
    // protoProperty will not be present, instead you will just have an
    // object that looks like:
    // {
    //   example: { state: 'fulfilled', value: 'Example' }
    // }
    //
    // hash.hasOwnProperty('protoProperty'); // false
    // 'undefined' === typeof hash.protoProperty
  });
  ```

  @method hashSettled
  @public
  @for rsvp
  @param {Object} object
  @param {String} [label] optional string that describes the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when when all properties of `promises`
  have been settled.
  @static
*/

function hashSettled(object, label) {
  return Promise.resolve(object, label).then(function (object) {
    if (object === null || typeof object !== 'object') {
      throw new TypeError("hashSettled must be called with an object");
    }

    return new HashSettled(Promise, object, false, label).promise;
  });
}

/**
  `rethrow` will rethrow an error on the next turn of the JavaScript event
  loop in order to aid debugging.

  Promises A+ specifies that any exceptions that occur with a promise must be
  caught by the promises implementation and bubbled to the last handler. For
  this reason, it is recommended that you always specify a second rejection
  handler function to `then`. However, `rethrow` will throw the exception
  outside of the promise, so it bubbles up to your console if in the browser,
  or domain/cause uncaught exception in Node. `rethrow` will also throw the
  error again so the error can be handled by the promise per the spec.

  ```javascript
  import { rethrow } from 'rsvp';

  function throws(){
    throw new Error('Whoops!');
  }

  let promise = new Promise(function(resolve, reject){
    throws();
  });

  promise.catch(rethrow).then(function(){
    // Code here doesn't run because the promise became rejected due to an
    // error!
  }, function (err){
    // handle the error here
  });
  ```

  The 'Whoops' error will be thrown on the next turn of the event loop
  and you can watch for it in your console. You can also handle it using a
  rejection handler given to `.then` or `.catch` on the returned promise.

  @method rethrow
  @public
  @static
  @for rsvp
  @param {Error} reason reason the promise became rejected.
  @throws Error
  @static
*/
function rethrow(reason) {
  setTimeout(function () {
    throw reason;
  });
  throw reason;
}

/**
  `defer` returns an object similar to jQuery's `$.Deferred`.
  `defer` should be used when porting over code reliant on `$.Deferred`'s
  interface. New code should use the `Promise` constructor instead.

  The object returned from `defer` is a plain object with three properties:

  * promise - an `Promise`.
  * reject - a function that causes the `promise` property on this object to
    become rejected
  * resolve - a function that causes the `promise` property on this object to
    become fulfilled.

  Example:

   ```javascript
   let deferred = defer();

   deferred.resolve("Success!");

   deferred.promise.then(function(value){
     // value here is "Success!"
   });
   ```

  @method defer
  @public
  @static
  @for rsvp
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Object}
 */

function defer(label) {
  var deferred = { resolve: undefined, reject: undefined };

  deferred.promise = new Promise(function (resolve, reject) {
    deferred.resolve = resolve;
    deferred.reject = reject;
  }, label);

  return deferred;
}

function _possibleConstructorReturn$3(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$3(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapEnumerator = function (_Enumerator) {
  _inherits$3(MapEnumerator, _Enumerator);

  function MapEnumerator(Constructor, entries, mapFn, label) {
    return _possibleConstructorReturn$3(this, _Enumerator.call(this, Constructor, entries, true, label, mapFn));
  }

  MapEnumerator.prototype._init = function _init(Constructor, input, bool, label, mapFn) {
    var len = input.length || 0;
    this.length = len;
    this._remaining = len;
    this._result = new Array(len);
    this._mapFn = mapFn;

    this._enumerate(input);
  };

  MapEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
    if (firstPass) {
      var val = tryCatch(this._mapFn)(value, i);
      if (val === TRY_CATCH_ERROR) {
        this._settledAt(REJECTED, i, val.error, false);
      } else {
        this._eachEntry(val, i, false);
      }
    } else {
      this._remaining--;
      this._result[i] = value;
    }
  };

  return MapEnumerator;
}(Enumerator);

/**
 `map` is similar to JavaScript's native `map` method. `mapFn` is eagerly called
  meaning that as soon as any promise resolves its value will be passed to `mapFn`.
  `map` returns a promise that will become fulfilled with the result of running
  `mapFn` on the values the promises become fulfilled with.

  For example:

  ```javascript
  import { map, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  let mapFn = function(item){
    return item + 1;
  };

  map(promises, mapFn).then(function(result){
    // result is [ 2, 3, 4 ]
  });
  ```

  If any of the `promises` given to `map` are rejected, the first promise
  that is rejected will be given as an argument to the returned promise's
  rejection handler. For example:

  ```javascript
  import { map, reject, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = reject(new Error('2'));
  let promise3 = reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];

  let mapFn = function(item){
    return item + 1;
  };

  map(promises, mapFn).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === '2'
  });
  ```

  `map` will also wait if a promise is returned from `mapFn`. For example,
  say you want to get all comments from a set of blog posts, but you need
  the blog posts first because they contain a url to those comments.

  ```javscript
  import { map } from 'rsvp';

  let mapFn = function(blogPost){
    // getComments does some ajax and returns an Promise that is fulfilled
    // with some comments data
    return getComments(blogPost.comments_url);
  };

  // getBlogPosts does some ajax and returns an Promise that is fulfilled
  // with some blog post data
  map(getBlogPosts(), mapFn).then(function(comments){
    // comments is the result of asking the server for the comments
    // of all blog posts returned from getBlogPosts()
  });
  ```

  @method map
  @public
  @static
  @for rsvp
  @param {Array} promises
  @param {Function} mapFn function to be called on each fulfilled promise.
  @param {String} [label] optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled with the result of calling
  `mapFn` on each fulfilled promise or value when they become fulfilled.
   The promise will be rejected if any of the given `promises` become rejected.
*/
function map(promises, mapFn, label) {
  if (typeof mapFn !== 'function') {
    return Promise.reject(new TypeError("map expects a function as a second argument"), label);
  }

  return Promise.resolve(promises, label).then(function (promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError("map must be called with an array");
    }
    return new MapEnumerator(Promise, promises, mapFn, label).promise;
  });
}

/**
  This is a convenient alias for `Promise.resolve`.

  @method resolve
  @public
  @static
  @for rsvp
  @param {*} value value that the returned promise will be resolved with
  @param {String} [label] optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$2(value, label) {
  return Promise.resolve(value, label);
}

/**
  This is a convenient alias for `Promise.reject`.

  @method reject
  @public
  @static
  @for rsvp
  @param {*} reason value that the returned promise will be rejected with.
  @param {String} [label] optional string for identifying the returned promise.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$2(reason, label) {
  return Promise.reject(reason, label);
}

function _possibleConstructorReturn$4(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits$4(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EMPTY_OBJECT = {};

var FilterEnumerator = function (_MapEnumerator) {
  _inherits$4(FilterEnumerator, _MapEnumerator);

  function FilterEnumerator() {
    return _possibleConstructorReturn$4(this, _MapEnumerator.apply(this, arguments));
  }

  FilterEnumerator.prototype._checkFullfillment = function _checkFullfillment() {
    if (this._remaining === 0 && this._result !== null) {
      var result = this._result.filter(function (val) {
        return val !== EMPTY_OBJECT;
      });
      fulfill(this.promise, result);
      this._result = null;
    }
  };

  FilterEnumerator.prototype._setResultAt = function _setResultAt(state, i, value, firstPass) {
    if (firstPass) {
      this._result[i] = value;
      var val = tryCatch(this._mapFn)(value, i);
      if (val === TRY_CATCH_ERROR) {
        this._settledAt(REJECTED, i, val.error, false);
      } else {
        this._eachEntry(val, i, false);
      }
    } else {
      this._remaining--;
      if (!value) {
        this._result[i] = EMPTY_OBJECT;
      }
    }
  };

  return FilterEnumerator;
}(MapEnumerator);

/**
 `filter` is similar to JavaScript's native `filter` method.
 `filterFn` is eagerly called meaning that as soon as any promise
  resolves its value will be passed to `filterFn`. `filter` returns
  a promise that will become fulfilled with the result of running
  `filterFn` on the values the promises become fulfilled with.

  For example:

  ```javascript
  import { filter, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);

  let promises = [promise1, promise2, promise3];

  let filterFn = function(item){
    return item > 1;
  };

  filter(promises, filterFn).then(function(result){
    // result is [ 2, 3 ]
  });
  ```

  If any of the `promises` given to `filter` are rejected, the first promise
  that is rejected will be given as an argument to the returned promise's
  rejection handler. For example:

  ```javascript
  import { filter, reject, resolve } from 'rsvp';

  let promise1 = resolve(1);
  let promise2 = reject(new Error('2'));
  let promise3 = reject(new Error('3'));
  let promises = [ promise1, promise2, promise3 ];

  let filterFn = function(item){
    return item > 1;
  };

  filter(promises, filterFn).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(reason) {
    // reason.message === '2'
  });
  ```

  `filter` will also wait for any promises returned from `filterFn`.
  For instance, you may want to fetch a list of users then return a subset
  of those users based on some asynchronous operation:

  ```javascript
  import { filter, resolve } from 'rsvp';

  let alice = { name: 'alice' };
  let bob   = { name: 'bob' };
  let users = [ alice, bob ];

  let promises = users.map(function(user){
    return resolve(user);
  });

  let filterFn = function(user){
    // Here, Alice has permissions to create a blog post, but Bob does not.
    return getPrivilegesForUser(user).then(function(privs){
      return privs.can_create_blog_post === true;
    });
  };
  filter(promises, filterFn).then(function(users){
    // true, because the server told us only Alice can create a blog post.
    users.length === 1;
    // false, because Alice is the only user present in `users`
    users[0] === bob;
  });
  ```

  @method filter
  @public
  @static
  @for rsvp
  @param {Array} promises
  @param {Function} filterFn - function to be called on each resolved value to
  filter the final results.
  @param {String} [label] optional string describing the promise. Useful for
  tooling.
  @return {Promise}
*/

function filter(promises, filterFn, label) {
  if (typeof filterFn !== 'function') {
    return Promise.reject(new TypeError("filter expects function as a second argument"), label);
  }

  return Promise.resolve(promises, label).then(function (promises) {
    if (!Array.isArray(promises)) {
      throw new TypeError("filter must be called with an array");
    }
    return new FilterEnumerator(Promise, promises, filterFn, label).promise;
  });
}

var len = 0;
var vertxNext = void 0;
function asap(callback, arg) {
  queue$1[len] = callback;
  queue$1[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 1, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    scheduleFlush$1();
  }
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  var nextTick = process.nextTick;
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // setImmediate should be used instead instead
  var version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
  if (Array.isArray(version) && version[1] === '0' && version[2] === '10') {
    nextTick = setImmediate;
  }
  return function () {
    return nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }
  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    return node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  return function () {
    return setTimeout(flush, 1);
  };
}

var queue$1 = new Array(1000);

function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue$1[i];
    var arg = queue$1[i + 1];

    callback(arg);

    queue$1[i] = undefined;
    queue$1[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertex() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush$1 = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush$1 = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush$1 = useMutationObserver();
} else if (isWorker) {
  scheduleFlush$1 = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush$1 = attemptVertex();
} else {
  scheduleFlush$1 = useSetTimeout();
}

// defaults
config.async = asap;
config.after = function (cb) {
  return setTimeout(cb, 0);
};
var cast = resolve$2;

var async = function (callback, arg) {
  return config.async(callback, arg);
};

function on() {
  config.on.apply(config, arguments);
}

function off() {
  config.off.apply(config, arguments);
}

// Set up instrumentation through `window.__PROMISE_INTRUMENTATION__`
if (typeof window !== 'undefined' && typeof window['__PROMISE_INSTRUMENTATION__'] === 'object') {
  var callbacks = window['__PROMISE_INSTRUMENTATION__'];
  configure('instrument', true);
  for (var eventName in callbacks) {
    if (callbacks.hasOwnProperty(eventName)) {
      on(eventName, callbacks[eventName]);
    }
  }
}

// the default export here is for backwards compat:
//   https://github.com/tildeio/rsvp.js/issues/434
var rsvp = {
  asap: asap,
  cast: cast,
  Promise: Promise,
  EventTarget: EventTarget,
  all: all$1,
  allSettled: allSettled,
  race: race$1,
  hash: hash,
  hashSettled: hashSettled,
  rethrow: rethrow,
  defer: defer,
  denodeify: denodeify,
  configure: configure,
  on: on,
  off: off,
  resolve: resolve$2,
  reject: reject$2,
  map: map,
  async: async,
  filter: filter
};

/* harmony default export */ __webpack_exports__["default"] = (rsvp);


//# sourceMappingURL=rsvp.es.map


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class RecrawlWarning {
  constructor(root, count) {
    this.root = root;
    this.count = count;
  }

  static findByRoot(root) {
    for (let i = 0; i < this.RECRAWL_WARNINGS.length; i++) {
      let warning = this.RECRAWL_WARNINGS[i];
      if (warning.root === root) {
        return warning;
      }
    }
  }

  static isRecrawlWarningDupe(warningMessage) {
    if (typeof warningMessage !== 'string') {
      return false;
    }
    let match = warningMessage.match(this.REGEXP);
    if (!match) {
      return false;
    }
    let count = Number(match[1]);
    let root = match[2];

    let warning = this.findByRoot(root);

    if (warning) {
      // only keep the highest count, assume count to either stay the same or
      // increase.
      if (warning.count >= count) {
        return true;
      } else {
        // update the existing warning to the latest (highest) count
        warning.count = count;
        return false;
      }
    } else {
      this.RECRAWL_WARNINGS.push(new RecrawlWarning(root, count));
      return false;
    }
  }
}

RecrawlWarning.RECRAWL_WARNINGS = [];
RecrawlWarning.REGEXP = /Recrawled this watch (\d+) times, most recently because:\n([^:]+)/;

module.exports = RecrawlWarning;


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const execa = __webpack_require__(182);

const { statSync } = __webpack_require__(4);
const path = __webpack_require__(5);
const common = __webpack_require__(6);
const EventEmitter = __webpack_require__(9).EventEmitter;

const { EOL } = __webpack_require__(168);

/**
 * Constants
 */

const CHANGE_EVENT = common.CHANGE_EVENT;
const DELETE_EVENT = common.DELETE_EVENT;
const ADD_EVENT = common.ADD_EVENT;
const ALL_EVENT = common.ALL_EVENT;

const typeMap = {
  rename: CHANGE_EVENT,
  write: CHANGE_EVENT,
  remove: DELETE_EVENT,
  create: ADD_EVENT,
};

const messageRegexp = /(rename|write|remove|create)\s(.+)/;

/**
 * Manages streams from subprocess and turns into sane events
 *
 * @param {Stream} data
 * @private
 */
function _messageHandler(data) {
  data
    .toString()
    .split(EOL)
    .filter(str => str.trim().length)
    .filter(str => messageRegexp.test(str))
    .map(line => {
      const [, command, path] = [...line.match(messageRegexp)];
      return [command, path];
    })
    .forEach(([command, file]) => {
      let stat;
      const type = typeMap[command];
      if (type === DELETE_EVENT) {
        stat = null;
      } else {
        try {
          stat = statSync(file);
        } catch (e) {
          // There is likely a delete coming down the pipe.
          if (e.code === 'ENOENT') {
            return;
          }
          throw e;
        }
      }
      this.emitEvent(type, path.relative(this.root, file), stat);
    });
}

/**
 * Export `WatchexecWatcher` class.
 * Watches `dir`.
 *
 * @class WatchexecWatcher
 * @param String dir
 * @param {Object} opts
 * @public
 */
class WatchexecWatcher extends EventEmitter {
  constructor(dir, opts) {
    super();

    common.assignOptions(this, opts);

    this.root = path.resolve(dir);

    this._process = execa(
      'watchexec',
      ['-n', '--', 'node', __dirname + '/watchexec_client.js'],
      { cwd: dir }
    );

    this._process.stdout.on('data', _messageHandler.bind(this));
    this._readyTimer = setTimeout(this.emit.bind(this, 'ready'), 1000);
  }

  close(callback) {
    clearTimeout(this._readyTimer);
    this.removeAllListeners();
    this._process && !this._process.killed && this._process.kill();
    if (typeof callback === 'function') {
      setImmediate(callback.bind(null, null, true));
    }
  }

  /**
   * Transform and emit an event comming from the poller.
   *
   * @param {EventEmitter} monitor
   * @public
   */
  emitEvent(type, file, stat) {
    this.emit(type, file, this.root, stat);
    this.emit(ALL_EVENT, type, file, this.root, stat);
  }
}

WatchexecWatcher._messageHandler = _messageHandler;

module.exports = WatchexecWatcher;

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(5);
const childProcess = __webpack_require__(174);
const crossSpawn = __webpack_require__(183);
const stripEof = __webpack_require__(198);
const npmRunPath = __webpack_require__(199);
const isStream = __webpack_require__(200);
const _getStream = __webpack_require__(201);
const pFinally = __webpack_require__(208);
const onExit = __webpack_require__(209);
const errname = __webpack_require__(211);
const stdio = __webpack_require__(212);

const TEN_MEGABYTES = 1000 * 1000 * 10;

function handleArgs(cmd, args, opts) {
	let parsed;

	opts = Object.assign({
		extendEnv: true,
		env: {}
	}, opts);

	if (opts.extendEnv) {
		opts.env = Object.assign({}, process.env, opts.env);
	}

	if (opts.__winShell === true) {
		delete opts.__winShell;
		parsed = {
			command: cmd,
			args,
			options: opts,
			file: cmd,
			original: {
				cmd,
				args
			}
		};
	} else {
		parsed = crossSpawn._parse(cmd, args, opts);
	}

	opts = Object.assign({
		maxBuffer: TEN_MEGABYTES,
		buffer: true,
		stripEof: true,
		preferLocal: true,
		localDir: parsed.options.cwd || process.cwd(),
		encoding: 'utf8',
		reject: true,
		cleanup: true
	}, parsed.options);

	opts.stdio = stdio(opts);

	if (opts.preferLocal) {
		opts.env = npmRunPath.env(Object.assign({}, opts, {cwd: opts.localDir}));
	}

	if (opts.detached) {
		// #115
		opts.cleanup = false;
	}

	if (process.platform === 'win32' && path.basename(parsed.command) === 'cmd.exe') {
		// #116
		parsed.args.unshift('/q');
	}

	return {
		cmd: parsed.command,
		args: parsed.args,
		opts,
		parsed
	};
}

function handleInput(spawned, input) {
	if (input === null || input === undefined) {
		return;
	}

	if (isStream(input)) {
		input.pipe(spawned.stdin);
	} else {
		spawned.stdin.end(input);
	}
}

function handleOutput(opts, val) {
	if (val && opts.stripEof) {
		val = stripEof(val);
	}

	return val;
}

function handleShell(fn, cmd, opts) {
	let file = '/bin/sh';
	let args = ['-c', cmd];

	opts = Object.assign({}, opts);

	if (process.platform === 'win32') {
		opts.__winShell = true;
		file = process.env.comspec || 'cmd.exe';
		args = ['/s', '/c', `"${cmd}"`];
		opts.windowsVerbatimArguments = true;
	}

	if (opts.shell) {
		file = opts.shell;
		delete opts.shell;
	}

	return fn(file, args, opts);
}

function getStream(process, stream, {encoding, buffer, maxBuffer}) {
	if (!process[stream]) {
		return null;
	}

	let ret;

	if (!buffer) {
		// TODO: Use `ret = util.promisify(stream.finished)(process[stream]);` when targeting Node.js 10
		ret = new Promise((resolve, reject) => {
			process[stream]
				.once('end', resolve)
				.once('error', reject);
		});
	} else if (encoding) {
		ret = _getStream(process[stream], {
			encoding,
			maxBuffer
		});
	} else {
		ret = _getStream.buffer(process[stream], {maxBuffer});
	}

	return ret.catch(err => {
		err.stream = stream;
		err.message = `${stream} ${err.message}`;
		throw err;
	});
}

function makeError(result, options) {
	const {stdout, stderr} = result;

	let err = result.error;
	const {code, signal} = result;

	const {parsed, joinedCmd} = options;
	const timedOut = options.timedOut || false;

	if (!err) {
		let output = '';

		if (Array.isArray(parsed.opts.stdio)) {
			if (parsed.opts.stdio[2] !== 'inherit') {
				output += output.length > 0 ? stderr : `\n${stderr}`;
			}

			if (parsed.opts.stdio[1] !== 'inherit') {
				output += `\n${stdout}`;
			}
		} else if (parsed.opts.stdio !== 'inherit') {
			output = `\n${stderr}${stdout}`;
		}

		err = new Error(`Command failed: ${joinedCmd}${output}`);
		err.code = code < 0 ? errname(code) : code;
	}

	err.stdout = stdout;
	err.stderr = stderr;
	err.failed = true;
	err.signal = signal || null;
	err.cmd = joinedCmd;
	err.timedOut = timedOut;

	return err;
}

function joinCmd(cmd, args) {
	let joinedCmd = cmd;

	if (Array.isArray(args) && args.length > 0) {
		joinedCmd += ' ' + args.join(' ');
	}

	return joinedCmd;
}

module.exports = (cmd, args, opts) => {
	const parsed = handleArgs(cmd, args, opts);
	const {encoding, buffer, maxBuffer} = parsed.opts;
	const joinedCmd = joinCmd(cmd, args);

	let spawned;
	try {
		spawned = childProcess.spawn(parsed.cmd, parsed.args, parsed.opts);
	} catch (err) {
		return Promise.reject(err);
	}

	let removeExitHandler;
	if (parsed.opts.cleanup) {
		removeExitHandler = onExit(() => {
			spawned.kill();
		});
	}

	let timeoutId = null;
	let timedOut = false;

	const cleanup = () => {
		if (timeoutId) {
			clearTimeout(timeoutId);
			timeoutId = null;
		}

		if (removeExitHandler) {
			removeExitHandler();
		}
	};

	if (parsed.opts.timeout > 0) {
		timeoutId = setTimeout(() => {
			timeoutId = null;
			timedOut = true;
			spawned.kill(parsed.opts.killSignal);
		}, parsed.opts.timeout);
	}

	const processDone = new Promise(resolve => {
		spawned.on('exit', (code, signal) => {
			cleanup();
			resolve({code, signal});
		});

		spawned.on('error', err => {
			cleanup();
			resolve({error: err});
		});

		if (spawned.stdin) {
			spawned.stdin.on('error', err => {
				cleanup();
				resolve({error: err});
			});
		}
	});

	function destroy() {
		if (spawned.stdout) {
			spawned.stdout.destroy();
		}

		if (spawned.stderr) {
			spawned.stderr.destroy();
		}
	}

	const handlePromise = () => pFinally(Promise.all([
		processDone,
		getStream(spawned, 'stdout', {encoding, buffer, maxBuffer}),
		getStream(spawned, 'stderr', {encoding, buffer, maxBuffer})
	]).then(arr => {
		const result = arr[0];
		result.stdout = arr[1];
		result.stderr = arr[2];

		if (result.error || result.code !== 0 || result.signal !== null) {
			const err = makeError(result, {
				joinedCmd,
				parsed,
				timedOut
			});

			// TODO: missing some timeout logic for killed
			// https://github.com/nodejs/node/blob/master/lib/child_process.js#L203
			// err.killed = spawned.killed || killed;
			err.killed = err.killed || spawned.killed;

			if (!parsed.opts.reject) {
				return err;
			}

			throw err;
		}

		return {
			stdout: handleOutput(parsed.opts, result.stdout),
			stderr: handleOutput(parsed.opts, result.stderr),
			code: 0,
			failed: false,
			killed: false,
			signal: null,
			cmd: joinedCmd,
			timedOut: false
		};
	}), destroy);

	crossSpawn._enoent.hookChildProcess(spawned, parsed.parsed);

	handleInput(spawned, parsed.opts.input);

	spawned.then = (onfulfilled, onrejected) => handlePromise().then(onfulfilled, onrejected);
	spawned.catch = onrejected => handlePromise().catch(onrejected);

	return spawned;
};

// TODO: set `stderr: 'ignore'` when that option is implemented
module.exports.stdout = (...args) => module.exports(...args).then(x => x.stdout);

// TODO: set `stdout: 'ignore'` when that option is implemented
module.exports.stderr = (...args) => module.exports(...args).then(x => x.stderr);

module.exports.shell = (cmd, opts) => handleShell(module.exports, cmd, opts);

module.exports.sync = (cmd, args, opts) => {
	const parsed = handleArgs(cmd, args, opts);
	const joinedCmd = joinCmd(cmd, args);

	if (isStream(parsed.opts.input)) {
		throw new TypeError('The `input` option cannot be a stream in sync mode');
	}

	const result = childProcess.spawnSync(parsed.cmd, parsed.args, parsed.opts);
	result.code = result.status;

	if (result.error || result.status !== 0 || result.signal !== null) {
		const err = makeError(result, {
			joinedCmd,
			parsed
		});

		if (!parsed.opts.reject) {
			return err;
		}

		throw err;
	}

	return {
		stdout: handleOutput(parsed.opts, result.stdout),
		stderr: handleOutput(parsed.opts, result.stderr),
		code: 0,
		failed: false,
		signal: null,
		cmd: joinedCmd,
		timedOut: false
	};
};

module.exports.shellSync = (cmd, opts) => handleShell(module.exports.sync, cmd, opts);


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const cp = __webpack_require__(174);
const parse = __webpack_require__(184);
const enoent = __webpack_require__(197);

function spawn(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const spawned = cp.spawn(parsed.command, parsed.args, parsed.options);

    // Hook into child process "exit" event to emit an error if the command
    // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    enoent.hookChildProcess(spawned, parsed);

    return spawned;
}

function spawnSync(command, args, options) {
    // Parse the arguments
    const parsed = parse(command, args, options);

    // Spawn the child process
    const result = cp.spawnSync(parsed.command, parsed.args, parsed.options);

    // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
    result.error = result.error || enoent.verifyENOENTSync(result.status, parsed);

    return result;
}

module.exports = spawn;
module.exports.spawn = spawn;
module.exports.sync = spawnSync;

module.exports._parse = parse;
module.exports._enoent = enoent;


/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(5);
const niceTry = __webpack_require__(185);
const resolveCommand = __webpack_require__(186);
const escape = __webpack_require__(192);
const readShebang = __webpack_require__(193);
const semver = __webpack_require__(196);

const isWin = process.platform === 'win32';
const isExecutableRegExp = /\.(?:com|exe)$/i;
const isCmdShimRegExp = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;

// `options.shell` is supported in Node ^4.8.0, ^5.7.0 and >= 6.0.0
const supportsShellOption = niceTry(() => semver.satisfies(process.version, '^4.8.0 || ^5.7.0 || >= 6.0.0', true)) || false;

function detectShebang(parsed) {
    parsed.file = resolveCommand(parsed);

    const shebang = parsed.file && readShebang(parsed.file);

    if (shebang) {
        parsed.args.unshift(parsed.file);
        parsed.command = shebang;

        return resolveCommand(parsed);
    }

    return parsed.file;
}

function parseNonShell(parsed) {
    if (!isWin) {
        return parsed;
    }

    // Detect & add support for shebangs
    const commandFile = detectShebang(parsed);

    // We don't need a shell if the command filename is an executable
    const needsShell = !isExecutableRegExp.test(commandFile);

    // If a shell is required, use cmd.exe and take care of escaping everything correctly
    // Note that `forceShell` is an hidden option used only in tests
    if (parsed.options.forceShell || needsShell) {
        // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
        // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
        // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
        // we need to double escape them
        const needsDoubleEscapeMetaChars = isCmdShimRegExp.test(commandFile);

        // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
        // This is necessary otherwise it will always fail with ENOENT in those cases
        parsed.command = path.normalize(parsed.command);

        // Escape command & arguments
        parsed.command = escape.command(parsed.command);
        parsed.args = parsed.args.map((arg) => escape.argument(arg, needsDoubleEscapeMetaChars));

        const shellCommand = [parsed.command].concat(parsed.args).join(' ');

        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.command = process.env.comspec || 'cmd.exe';
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    }

    return parsed;
}

function parseShell(parsed) {
    // If node supports the shell option, there's no need to mimic its behavior
    if (supportsShellOption) {
        return parsed;
    }

    // Mimic node shell option
    // See https://github.com/nodejs/node/blob/b9f6a2dc059a1062776133f3d4fd848c4da7d150/lib/child_process.js#L335
    const shellCommand = [parsed.command].concat(parsed.args).join(' ');

    if (isWin) {
        parsed.command = typeof parsed.options.shell === 'string' ? parsed.options.shell : process.env.comspec || 'cmd.exe';
        parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`];
        parsed.options.windowsVerbatimArguments = true; // Tell node's spawn that the arguments are already escaped
    } else {
        if (typeof parsed.options.shell === 'string') {
            parsed.command = parsed.options.shell;
        } else if (process.platform === 'android') {
            parsed.command = '/system/bin/sh';
        } else {
            parsed.command = '/bin/sh';
        }

        parsed.args = ['-c', shellCommand];
    }

    return parsed;
}

function parse(command, args, options) {
    // Normalize arguments, similar to nodejs
    if (args && !Array.isArray(args)) {
        options = args;
        args = null;
    }

    args = args ? args.slice(0) : []; // Clone array to avoid changing the original
    options = Object.assign({}, options); // Clone object to avoid changing the original

    // Build our parsed object
    const parsed = {
        command,
        args,
        options,
        file: undefined,
        original: {
            command,
            args,
        },
    };

    // Delegate further parsing to shell or non-shell
    return options.shell ? parseShell(parsed) : parseNonShell(parsed);
}

module.exports = parse;


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Tries to execute a function and discards any error that occurs.
 * @param {Function} fn - Function that might or might not throw an error.
 * @returns {?*} Return-value of the function when no error occurred.
 */
module.exports = function(fn) {

	try { return fn() } catch (e) {}

}

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const path = __webpack_require__(5);
const which = __webpack_require__(187);
const pathKey = __webpack_require__(191)();

function resolveCommandAttempt(parsed, withoutPathExt) {
    const cwd = process.cwd();
    const hasCustomCwd = parsed.options.cwd != null;

    // If a custom `cwd` was specified, we need to change the process cwd
    // because `which` will do stat calls but does not support a custom cwd
    if (hasCustomCwd) {
        try {
            process.chdir(parsed.options.cwd);
        } catch (err) {
            /* Empty */
        }
    }

    let resolved;

    try {
        resolved = which.sync(parsed.command, {
            path: (parsed.options.env || process.env)[pathKey],
            pathExt: withoutPathExt ? path.delimiter : undefined,
        });
    } catch (e) {
        /* Empty */
    } finally {
        process.chdir(cwd);
    }

    // If we successfully resolved, ensure that an absolute path is returned
    // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
    if (resolved) {
        resolved = path.resolve(hasCustomCwd ? parsed.options.cwd : '', resolved);
    }

    return resolved;
}

function resolveCommand(parsed) {
    return resolveCommandAttempt(parsed) || resolveCommandAttempt(parsed, true);
}

module.exports = resolveCommand;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = which
which.sync = whichSync

var isWindows = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys'

var path = __webpack_require__(5)
var COLON = isWindows ? ';' : ':'
var isexe = __webpack_require__(188)

function getNotFoundError (cmd) {
  var er = new Error('not found: ' + cmd)
  er.code = 'ENOENT'

  return er
}

function getPathInfo (cmd, opt) {
  var colon = opt.colon || COLON
  var pathEnv = opt.path || process.env.PATH || ''
  var pathExt = ['']

  pathEnv = pathEnv.split(colon)

  var pathExtExe = ''
  if (isWindows) {
    pathEnv.unshift(process.cwd())
    pathExtExe = (opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM')
    pathExt = pathExtExe.split(colon)


    // Always test the cmd itself first.  isexe will check to make sure
    // it's found in the pathExt set.
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('')
  }

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  if (cmd.match(/\//) || isWindows && cmd.match(/\\/))
    pathEnv = ['']

  return {
    env: pathEnv,
    ext: pathExt,
    extExe: pathExtExe
  }
}

function which (cmd, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var pathExtExe = info.extExe
  var found = []

  ;(function F (i, l) {
    if (i === l) {
      if (opt.all && found.length)
        return cb(null, found)
      else
        return cb(getNotFoundError(cmd))
    }

    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.join(pathPart, cmd)
    if (!pathPart && (/^\.[\\\/]/).test(cmd)) {
      p = cmd.slice(0, 2) + p
    }
    ;(function E (ii, ll) {
      if (ii === ll) return F(i + 1, l)
      var ext = pathExt[ii]
      isexe(p + ext, { pathExt: pathExtExe }, function (er, is) {
        if (!er && is) {
          if (opt.all)
            found.push(p + ext)
          else
            return cb(null, p + ext)
        }
        return E(ii + 1, ll)
      })
    })(0, pathExt.length)
  })(0, pathEnv.length)
}

function whichSync (cmd, opt) {
  opt = opt || {}

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var pathExtExe = info.extExe
  var found = []

  for (var i = 0, l = pathEnv.length; i < l; i ++) {
    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.join(pathPart, cmd)
    if (!pathPart && /^\.[\\\/]/.test(cmd)) {
      p = cmd.slice(0, 2) + p
    }
    for (var j = 0, ll = pathExt.length; j < ll; j ++) {
      var cur = p + pathExt[j]
      var is
      try {
        is = isexe.sync(cur, { pathExt: pathExtExe })
        if (is) {
          if (opt.all)
            found.push(cur)
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  if (opt.nothrow)
    return null

  throw getNotFoundError(cmd)
}


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(4)
var core
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = __webpack_require__(189)
} else {
  core = __webpack_require__(190)
}

module.exports = isexe
isexe.sync = sync

function isexe (path, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe(path, options || {}, function (er, is) {
        if (er) {
          reject(er)
        } else {
          resolve(is)
        }
      })
    })
  }

  core(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (er.code === 'EACCES' || options && options.ignoreErrors) {
        er = null
        is = false
      }
    }
    cb(er, is)
  })
}

function sync (path, options) {
  // my kingdom for a filtered catch
  try {
    return core.sync(path, options || {})
  } catch (er) {
    if (options && options.ignoreErrors || er.code === 'EACCES') {
      return false
    } else {
      throw er
    }
  }
}


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(4)

function checkPathExt (path, options) {
  var pathext = options.pathExt !== undefined ?
    options.pathExt : process.env.PATHEXT

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';')
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase()
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat (stat, path, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, path, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), path, options)
}


/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(4)

function isexe (path, options, cb) {
  fs.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync (path, options) {
  return checkStat(fs.statSync(path), options)
}

function checkStat (stat, options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode (stat, options) {
  var mod = stat.mode
  var uid = stat.uid
  var gid = stat.gid

  var myUid = options.uid !== undefined ?
    options.uid : process.getuid && process.getuid()
  var myGid = options.gid !== undefined ?
    options.gid : process.getgid && process.getgid()

  var u = parseInt('100', 8)
  var g = parseInt('010', 8)
  var o = parseInt('001', 8)
  var ug = u | g

  var ret = (mod & o) ||
    (mod & g) && gid === myGid ||
    (mod & u) && uid === myUid ||
    (mod & ug) && myUid === 0

  return ret
}


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = opts => {
	opts = opts || {};

	const env = opts.env || process.env;
	const platform = opts.platform || process.platform;

	if (platform !== 'win32') {
		return 'PATH';
	}

	return Object.keys(env).find(x => x.toUpperCase() === 'PATH') || 'Path';
};


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g;

function escapeCommand(arg) {
    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    return arg;
}

function escapeArgument(arg, doubleEscapeMetaChars) {
    // Convert to string
    arg = `${arg}`;

    // Algorithm below is based on https://qntm.org/cmd

    // Sequence of backslashes followed by a double quote:
    // double up all the backslashes and escape the double quote
    arg = arg.replace(/(\\*)"/g, '$1$1\\"');

    // Sequence of backslashes followed by the end of the string
    // (which will become a double quote later):
    // double up all the backslashes
    arg = arg.replace(/(\\*)$/, '$1$1');

    // All other backslashes occur literally

    // Quote the whole thing:
    arg = `"${arg}"`;

    // Escape meta chars
    arg = arg.replace(metaCharsRegExp, '^$1');

    // Double escape meta chars if necessary
    if (doubleEscapeMetaChars) {
        arg = arg.replace(metaCharsRegExp, '^$1');
    }

    return arg;
}

module.exports.command = escapeCommand;
module.exports.argument = escapeArgument;


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(4);
const shebangCommand = __webpack_require__(194);

function readShebang(command) {
    // Read the first 150 bytes from the file
    const size = 150;
    let buffer;

    if (Buffer.alloc) {
        // Node.js v4.5+ / v5.10+
        buffer = Buffer.alloc(size);
    } else {
        // Old Node.js API
        buffer = new Buffer(size);
        buffer.fill(0); // zero-fill
    }

    let fd;

    try {
        fd = fs.openSync(command, 'r');
        fs.readSync(fd, buffer, 0, size, 0);
        fs.closeSync(fd);
    } catch (e) { /* Empty */ }

    // Attempt to extract shebang (null is returned if not a shebang)
    return shebangCommand(buffer.toString());
}

module.exports = readShebang;


/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var shebangRegex = __webpack_require__(195);

module.exports = function (str) {
	var match = str.match(shebangRegex);

	if (!match) {
		return null;
	}

	var arr = match[0].replace(/#! ?/, '').split(' ');
	var bin = arr[0].split('/').pop();
	var arg = arr[1];

	return (bin === 'env' ?
		arg :
		bin + (arg ? ' ' + arg : '')
	);
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = /^#!.*/;


/***/ }),
/* 196 */
/***/ (function(module, exports) {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options)
        })
      })
    })
  })
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const isWin = process.platform === 'win32';

function notFoundError(original, syscall) {
    return Object.assign(new Error(`${syscall} ${original.command} ENOENT`), {
        code: 'ENOENT',
        errno: 'ENOENT',
        syscall: `${syscall} ${original.command}`,
        path: original.command,
        spawnargs: original.args,
    });
}

function hookChildProcess(cp, parsed) {
    if (!isWin) {
        return;
    }

    const originalEmit = cp.emit;

    cp.emit = function (name, arg1) {
        // If emitting "exit" event and exit code is 1, we need to check if
        // the command exists and emit an "error" instead
        // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
        if (name === 'exit') {
            const err = verifyENOENT(arg1, parsed, 'spawn');

            if (err) {
                return originalEmit.call(cp, 'error', err);
            }
        }

        return originalEmit.apply(cp, arguments); // eslint-disable-line prefer-rest-params
    };
}

function verifyENOENT(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawn');
    }

    return null;
}

function verifyENOENTSync(status, parsed) {
    if (isWin && status === 1 && !parsed.file) {
        return notFoundError(parsed.original, 'spawnSync');
    }

    return null;
}

module.exports = {
    hookChildProcess,
    verifyENOENT,
    verifyENOENTSync,
    notFoundError,
};


/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = function (x) {
	var lf = typeof x === 'string' ? '\n' : '\n'.charCodeAt();
	var cr = typeof x === 'string' ? '\r' : '\r'.charCodeAt();

	if (x[x.length - 1] === lf) {
		x = x.slice(0, x.length - 1);
	}

	if (x[x.length - 1] === cr) {
		x = x.slice(0, x.length - 1);
	}

	return x;
};


/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const path = __webpack_require__(5);
const pathKey = __webpack_require__(191);

module.exports = opts => {
	opts = Object.assign({
		cwd: process.cwd(),
		path: process.env[pathKey()]
	}, opts);

	let prev;
	let pth = path.resolve(opts.cwd);
	const ret = [];

	while (prev !== pth) {
		ret.push(path.join(pth, 'node_modules/.bin'));
		prev = pth;
		pth = path.resolve(pth, '..');
	}

	// ensure the running `node` binary is used
	ret.push(path.dirname(process.execPath));

	return ret.concat(opts.path).join(path.delimiter);
};

module.exports.env = opts => {
	opts = Object.assign({
		env: process.env
	}, opts);

	const env = Object.assign({}, opts.env);
	const path = pathKey({env});

	opts.path = env[path];
	env[path] = module.exports(opts);

	return env;
};


/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isStream = module.exports = function (stream) {
	return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
};

isStream.writable = function (stream) {
	return isStream(stream) && stream.writable !== false && typeof stream._write === 'function' && typeof stream._writableState === 'object';
};

isStream.readable = function (stream) {
	return isStream(stream) && stream.readable !== false && typeof stream._read === 'function' && typeof stream._readableState === 'object';
};

isStream.duplex = function (stream) {
	return isStream.writable(stream) && isStream.readable(stream);
};

isStream.transform = function (stream) {
	return isStream.duplex(stream) && typeof stream._transform === 'function' && typeof stream._transformState === 'object';
};


/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const pump = __webpack_require__(202);
const bufferStream = __webpack_require__(206);

class MaxBufferError extends Error {
	constructor() {
		super('maxBuffer exceeded');
		this.name = 'MaxBufferError';
	}
}

function getStream(inputStream, options) {
	if (!inputStream) {
		return Promise.reject(new Error('Expected a stream'));
	}

	options = Object.assign({maxBuffer: Infinity}, options);

	const {maxBuffer} = options;

	let stream;
	return new Promise((resolve, reject) => {
		const rejectPromise = error => {
			if (error) { // A null check
				error.bufferedData = stream.getBufferedValue();
			}
			reject(error);
		};

		stream = pump(inputStream, bufferStream(options), error => {
			if (error) {
				rejectPromise(error);
				return;
			}

			resolve();
		});

		stream.on('data', () => {
			if (stream.getBufferedLength() > maxBuffer) {
				rejectPromise(new MaxBufferError());
			}
		});
	}).then(() => stream.getBufferedValue());
}

module.exports = getStream;
module.exports.buffer = (stream, options) => getStream(stream, Object.assign({}, options, {encoding: 'buffer'}));
module.exports.array = (stream, options) => getStream(stream, Object.assign({}, options, {array: true}));
module.exports.MaxBufferError = MaxBufferError;


/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

var once = __webpack_require__(203)
var eos = __webpack_require__(205)
var fs = __webpack_require__(4) // we only need fs to get the ReadStream and WriteStream prototypes

var noop = function () {}
var ancient = /^v?\.0/.test(process.version)

var isFn = function (fn) {
  return typeof fn === 'function'
}

var isFS = function (stream) {
  if (!ancient) return false // newer node version do not need to care about fs is a special way
  if (!fs) return false // browser
  return (stream instanceof (fs.ReadStream || noop) || stream instanceof (fs.WriteStream || noop)) && isFn(stream.close)
}

var isRequest = function (stream) {
  return stream.setHeader && isFn(stream.abort)
}

var destroyer = function (stream, reading, writing, callback) {
  callback = once(callback)

  var closed = false
  stream.on('close', function () {
    closed = true
  })

  eos(stream, {readable: reading, writable: writing}, function (err) {
    if (err) return callback(err)
    closed = true
    callback()
  })

  var destroyed = false
  return function (err) {
    if (closed) return
    if (destroyed) return
    destroyed = true

    if (isFS(stream)) return stream.close(noop) // use close for fs streams to avoid fd leaks
    if (isRequest(stream)) return stream.abort() // request.destroy just do .end - .abort is what we want

    if (isFn(stream.destroy)) return stream.destroy()

    callback(err || new Error('stream was destroyed'))
  }
}

var call = function (fn) {
  fn()
}

var pipe = function (from, to) {
  return from.pipe(to)
}

var pump = function () {
  var streams = Array.prototype.slice.call(arguments)
  var callback = isFn(streams[streams.length - 1] || noop) && streams.pop() || noop

  if (Array.isArray(streams[0])) streams = streams[0]
  if (streams.length < 2) throw new Error('pump requires two streams per minimum')

  var error
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1
    var writing = i > 0
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err
      if (err) destroys.forEach(call)
      if (reading) return
      destroys.forEach(call)
      callback(error)
    })
  })

  return streams.reduce(pipe)
}

module.exports = pump


/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

var wrappy = __webpack_require__(204)
module.exports = wrappy(once)
module.exports.strict = wrappy(onceStrict)

once.proto = once(function () {
  Object.defineProperty(Function.prototype, 'once', {
    value: function () {
      return once(this)
    },
    configurable: true
  })

  Object.defineProperty(Function.prototype, 'onceStrict', {
    value: function () {
      return onceStrict(this)
    },
    configurable: true
  })
})

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

function onceStrict (fn) {
  var f = function () {
    if (f.called)
      throw new Error(f.onceError)
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  var name = fn.name || 'Function wrapped with `once`'
  f.onceError = name + " shouldn't be called more than once"
  f.called = false
  return f
}


/***/ }),
/* 204 */
/***/ (function(module, exports) {

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.
module.exports = wrappy
function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function')
    throw new TypeError('need wrapper function')

  Object.keys(fn).forEach(function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper() {
    var args = new Array(arguments.length)
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i]
    }
    var ret = fn.apply(this, args)
    var cb = args[args.length-1]
    if (typeof ret === 'function' && ret !== cb) {
      Object.keys(cb).forEach(function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}


/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

var once = __webpack_require__(203);

var noop = function() {};

var isRequest = function(stream) {
	return stream.setHeader && typeof stream.abort === 'function';
};

var isChildProcess = function(stream) {
	return stream.stdio && Array.isArray(stream.stdio) && stream.stdio.length === 3
};

var eos = function(stream, opts, callback) {
	if (typeof opts === 'function') return eos(stream, null, opts);
	if (!opts) opts = {};

	callback = once(callback || noop);

	var ws = stream._writableState;
	var rs = stream._readableState;
	var readable = opts.readable || (opts.readable !== false && stream.readable);
	var writable = opts.writable || (opts.writable !== false && stream.writable);
	var cancelled = false;

	var onlegacyfinish = function() {
		if (!stream.writable) onfinish();
	};

	var onfinish = function() {
		writable = false;
		if (!readable) callback.call(stream);
	};

	var onend = function() {
		readable = false;
		if (!writable) callback.call(stream);
	};

	var onexit = function(exitCode) {
		callback.call(stream, exitCode ? new Error('exited with error code: ' + exitCode) : null);
	};

	var onerror = function(err) {
		callback.call(stream, err);
	};

	var onclose = function() {
		process.nextTick(onclosenexttick);
	};

	var onclosenexttick = function() {
		if (cancelled) return;
		if (readable && !(rs && (rs.ended && !rs.destroyed))) return callback.call(stream, new Error('premature close'));
		if (writable && !(ws && (ws.ended && !ws.destroyed))) return callback.call(stream, new Error('premature close'));
	};

	var onrequest = function() {
		stream.req.on('finish', onfinish);
	};

	if (isRequest(stream)) {
		stream.on('complete', onfinish);
		stream.on('abort', onclose);
		if (stream.req) onrequest();
		else stream.on('request', onrequest);
	} else if (writable && !ws) { // legacy streams
		stream.on('end', onlegacyfinish);
		stream.on('close', onlegacyfinish);
	}

	if (isChildProcess(stream)) stream.on('exit', onexit);

	stream.on('end', onend);
	stream.on('finish', onfinish);
	if (opts.error !== false) stream.on('error', onerror);
	stream.on('close', onclose);

	return function() {
		cancelled = true;
		stream.removeListener('complete', onfinish);
		stream.removeListener('abort', onclose);
		stream.removeListener('request', onrequest);
		if (stream.req) stream.req.removeListener('finish', onfinish);
		stream.removeListener('end', onlegacyfinish);
		stream.removeListener('close', onlegacyfinish);
		stream.removeListener('finish', onfinish);
		stream.removeListener('exit', onexit);
		stream.removeListener('end', onend);
		stream.removeListener('error', onerror);
		stream.removeListener('close', onclose);
	};
};

module.exports = eos;


/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const {PassThrough} = __webpack_require__(207);

module.exports = options => {
	options = Object.assign({}, options);

	const {array} = options;
	let {encoding} = options;
	const buffer = encoding === 'buffer';
	let objectMode = false;

	if (array) {
		objectMode = !(encoding || buffer);
	} else {
		encoding = encoding || 'utf8';
	}

	if (buffer) {
		encoding = null;
	}

	let len = 0;
	const ret = [];
	const stream = new PassThrough({objectMode});

	if (encoding) {
		stream.setEncoding(encoding);
	}

	stream.on('data', chunk => {
		ret.push(chunk);

		if (objectMode) {
			len = ret.length;
		} else {
			len += chunk.length;
		}
	});

	stream.getBufferedValue = () => {
		if (array) {
			return ret;
		}

		return buffer ? Buffer.concat(ret, len) : ret.join('');
	};

	stream.getBufferedLength = () => len;

	return stream;
};


/***/ }),
/* 207 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (promise, onFinally) => {
	onFinally = onFinally || (() => {});

	return promise.then(
		val => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => val),
		err => new Promise(resolve => {
			resolve(onFinally());
		}).then(() => {
			throw err;
		})
	);
};


/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
var assert = __webpack_require__(176)
var signals = __webpack_require__(210)

var EE = __webpack_require__(9)
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
/* 210 */
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
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Older verions of Node.js might not have `util.getSystemErrorName()`.
// In that case, fall back to a deprecated internal.
const util = __webpack_require__(8);

let uv;

if (typeof util.getSystemErrorName === 'function') {
	module.exports = util.getSystemErrorName;
} else {
	try {
		uv = process.binding('uv');

		if (typeof uv.errname !== 'function') {
			throw new TypeError('uv.errname is not a function');
		}
	} catch (err) {
		console.error('execa/lib/errname: unable to establish process.binding(\'uv\')', err);
		uv = null;
	}

	module.exports = code => errname(uv, code);
}

// Used for testing the fallback behavior
module.exports.__test__ = errname;

function errname(uv, code) {
	if (uv) {
		return uv.errname(code);
	}

	if (!(code < 0)) {
		throw new Error('err >= 0');
	}

	return `Unknown system error ${code}`;
}



/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const alias = ['stdin', 'stdout', 'stderr'];

const hasAlias = opts => alias.some(x => Boolean(opts[x]));

module.exports = opts => {
	if (!opts) {
		return null;
	}

	if (opts.stdio && hasAlias(opts)) {
		throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${alias.map(x => `\`${x}\``).join(', ')}`);
	}

	if (typeof opts.stdio === 'string') {
		return opts.stdio;
	}

	const stdio = opts.stdio || [];

	if (!Array.isArray(stdio)) {
		throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``);
	}

	const result = [];
	const len = Math.max(stdio.length, alias.length);

	for (let i = 0; i < len; i++) {
		let value = null;

		if (stdio[i] !== undefined) {
			value = stdio[i];
		} else if (opts[alias[i]] !== undefined) {
			value = opts[alias[i]];
		}

		result[i] = value;
	}

	return result;
};


/***/ }),
/* 213 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 213;

/***/ })
/******/ ]);
