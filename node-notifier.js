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

var os = __webpack_require__(3);
var utils = __webpack_require__(4);

// All notifiers
var NotifySend = __webpack_require__(12);
var NotificationCenter = __webpack_require__(19);
var WindowsToaster = __webpack_require__(26);
var Growl = __webpack_require__(20);
var WindowsBalloon = __webpack_require__(27);

var options = { withFallback: true };

var osType = utils.isWSL() ? 'WSL' : os.type();

switch (osType) {
  case 'Linux':
    module.exports = new NotifySend(options);
    module.exports.Notification = NotifySend;
    break;
  case 'Darwin':
    module.exports = new NotificationCenter(options);
    module.exports.Notification = NotificationCenter;
    break;
  case 'Windows_NT':
    if (utils.isLessThanWin8()) {
      module.exports = new WindowsBalloon(options);
      module.exports.Notification = WindowsBalloon;
    } else {
      module.exports = new WindowsToaster(options);
      module.exports.Notification = WindowsToaster;
    }
    break;
  case 'WSL':
    module.exports = new WindowsToaster(options);
    module.exports.Notification = WindowsToaster;
    break;
  default:
    if (os.type().match(/BSD$/)) {
      module.exports = new NotifySend(options);
      module.exports.Notification = NotifySend;
    } else {
      module.exports = new Growl(options);
      module.exports.Notification = Growl;
    }
}

// Expose notifiers to give full control.
module.exports.NotifySend = NotifySend;
module.exports.NotificationCenter = NotificationCenter;
module.exports.WindowsToaster = WindowsToaster;
module.exports.WindowsBalloon = WindowsBalloon;
module.exports.Growl = Growl;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var shellwords = __webpack_require__(5);
var cp = __webpack_require__(6);
var semver = __webpack_require__(7);
var isWSL = __webpack_require__(8);
var path = __webpack_require__(10);
var url = __webpack_require__(11);
var os = __webpack_require__(3);
var fs = __webpack_require__(9);

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

module.exports.clone = clone;

var escapeQuotes = function(str) {
  if (typeof str === 'string') {
    return str.replace(/(["$`\\])/g, '\\$1');
  } else {
    return str;
  }
};

var inArray = function(arr, val) {
  return arr.indexOf(val) !== -1;
};

var notifySendFlags = {
  u: 'urgency',
  urgency: 'urgency',
  t: 'expire-time',
  time: 'expire-time',
  timeout: 'expire-time',
  e: 'expire-time',
  expire: 'expire-time',
  'expire-time': 'expire-time',
  i: 'icon',
  icon: 'icon',
  c: 'category',
  category: 'category',
  subtitle: 'category',
  h: 'hint',
  hint: 'hint'
};

module.exports.command = function(notifier, options, cb) {
  notifier = shellwords.escape(notifier);
  if (process.env.DEBUG && process.env.DEBUG.indexOf('notifier') !== -1) {
    console.info('node-notifier debug info (command):');
    console.info('[notifier path]', notifier);
    console.info('[notifier options]', options.join(' '));
  }

  return cp.exec(notifier + ' ' + options.join(' '), function(
    error,
    stdout,
    stderr
  ) {
    if (error) return cb(error);
    cb(stderr, stdout);
  });
};

module.exports.fileCommand = function(notifier, options, cb) {
  if (process.env.DEBUG && process.env.DEBUG.indexOf('notifier') !== -1) {
    console.info('node-notifier debug info (fileCommand):');
    console.info('[notifier path]', notifier);
    console.info('[notifier options]', options.join(' '));
  }

  return cp.execFile(notifier, options, function(error, stdout, stderr) {
    if (error) return cb(error, stdout);
    cb(stderr, stdout);
  });
};

module.exports.fileCommandJson = function(notifier, options, cb) {
  if (process.env.DEBUG && process.env.DEBUG.indexOf('notifier') !== -1) {
    console.info('node-notifier debug info (fileCommandJson):');
    console.info('[notifier path]', notifier);
    console.info('[notifier options]', options.join(' '));
  }
  return cp.execFile(notifier, options, function(error, stdout, stderr) {
    if (error) return cb(error, stdout);
    if (!stdout) return cb(error, {});

    try {
      var data = JSON.parse(stdout);
      cb(stderr, data);
    } catch (e) {
      cb(e, stdout);
    }
  });
};

module.exports.immediateFileCommand = function(notifier, options, cb) {
  if (process.env.DEBUG && process.env.DEBUG.indexOf('notifier') !== -1) {
    console.info('node-notifier debug info (notifier):');
    console.info('[notifier path]', notifier);
  }

  notifierExists(notifier, function(_, exists) {
    if (!exists) {
      return cb(new Error('Notifier (' + notifier + ') not found on system.'));
    }
    cp.execFile(notifier, options);
    cb();
  });
};

function notifierExists(notifier, cb) {
  return fs.stat(notifier, function(err, stat) {
    if (!err) return cb(err, stat.isFile());

    // Check if Windows alias
    if (path.extname(notifier)) {
      // Has extentioon, no need to check more
      return cb(err, false);
    }

    // Check if there is an exe file in the directory
    return fs.stat(notifier + '.exe', function(err, stat) {
      if (err) return cb(err, false);
      cb(err, stat.isFile());
    });
  });
}

var mapAppIcon = function(options) {
  if (options.appIcon) {
    options.icon = options.appIcon;
    delete options.appIcon;
  }

  return options;
};

var mapText = function(options) {
  if (options.text) {
    options.message = options.text;
    delete options.text;
  }

  return options;
};

var mapIconShorthand = function(options) {
  if (options.i) {
    options.icon = options.i;
    delete options.i;
  }

  return options;
};

module.exports.mapToNotifySend = function(options) {
  options = mapAppIcon(options);
  options = mapText(options);

  for (var key in options) {
    if (key === 'message' || key === 'title') continue;
    if (options.hasOwnProperty(key) && notifySendFlags[key] !== key) {
      options[notifySendFlags[key]] = options[key];
      delete options[key];
    }
  }

  return options;
};

module.exports.mapToGrowl = function(options) {
  options = mapAppIcon(options);
  options = mapIconShorthand(options);
  options = mapText(options);

  if (options.icon && !Buffer.isBuffer(options.icon)) {
    try {
      options.icon = fs.readFileSync(options.icon);
    } catch (ex) {}
  }

  return options;
};

module.exports.mapToMac = function(options) {
  options = mapIconShorthand(options);
  options = mapText(options);

  if (options.icon) {
    options.appIcon = options.icon;
    delete options.icon;
  }

  if (options.sound === true) {
    options.sound = 'Bottle';
  }

  if (options.sound === false) {
    delete options.sound;
  }

  if (options.sound && options.sound.indexOf('Notification.') === 0) {
    options.sound = 'Bottle';
  }

  if (options.wait === true) {
    if (!options.timeout) {
      options.timeout = 5;
    }
    delete options.wait;
  }

  if (!options.wait && !options.timeout) {
    if (options.timeout === false) {
      delete options.timeout;
    } else {
      options.timeout = 10;
    }
  }

  options.json = true;
  return options;
};

function isArray(arr) {
  return Object.prototype.toString.call(arr) === '[object Array]';
}

function noop() {}
module.exports.actionJackerDecorator = function(emitter, options, fn, mapper) {
  options = clone(options);
  fn = fn || noop;

  if (typeof fn !== 'function') {
    throw new TypeError(
      'The second argument must be a function callback. You have passed ' +
        typeof fn
    );
  }

  return function(err, data) {
    var resultantData = data;
    var metadata = {};
    // Allow for extra data if resultantData is an object
    if (resultantData && typeof resultantData === 'object') {
      metadata = resultantData;
      resultantData = resultantData.activationType;
    }

    // Sanitize the data
    if (resultantData) {
      resultantData = resultantData.toLowerCase().trim();
      if (resultantData.match(/^activate|clicked$/)) {
        resultantData = 'activate';
      }
    }

    fn.apply(emitter, [err, resultantData, metadata]);
    if (!mapper || !resultantData) return;

    var key = mapper(resultantData);
    if (!key) return;
    emitter.emit(key, emitter, options, metadata);
  };
};

module.exports.constructArgumentList = function(options, extra) {
  var args = [];
  extra = extra || {};

  // Massive ugly setup. Default args
  var initial = extra.initial || [];
  var keyExtra = extra.keyExtra || '';
  var allowedArguments = extra.allowedArguments || [];
  var noEscape = extra.noEscape !== undefined;
  var checkForAllowed = extra.allowedArguments !== undefined;
  var explicitTrue = !!extra.explicitTrue;
  var keepNewlines = !!extra.keepNewlines;
  var wrapper = extra.wrapper === undefined ? '"' : extra.wrapper;

  var escapeFn = function(arg) {
    if (isArray(arg)) {
      return removeNewLines(arg.join(','));
    }

    if (!noEscape) {
      arg = escapeQuotes(arg);
    }
    if (typeof arg === 'string' && !keepNewlines) {
      arg = removeNewLines(arg);
    }
    return wrapper + arg + wrapper;
  };

  initial.forEach(function(val) {
    args.push(escapeFn(val));
  });
  for (var key in options) {
    if (
      options.hasOwnProperty(key) &&
      (!checkForAllowed || inArray(allowedArguments, key))
    ) {
      if (explicitTrue && options[key] === true) {
        args.push('-' + keyExtra + key);
      } else if (explicitTrue && options[key] === false) continue;
      else args.push('-' + keyExtra + key, escapeFn(options[key]));
    }
  }
  return args;
};

function removeNewLines(str) {
  var excapedNewline = process.platform === 'win32' ? '\\r\\n' : '\\n';
  return str.replace(/\r?\n/g, excapedNewline);
}

/*
---- Options ----
[-t] <title string>     | Displayed on the first line of the toast.
[-m] <message string>   | Displayed on the remaining lines, wrapped.
[-b] <button1;button2 string>| Displayed on the bottom line, can list multiple buttons separated by ;
[-tb]                   | Displayed a textbox on the bottom line, only if buttons are not presented.
[-p] <image URI>        | Display toast with an image, local files only.
[-id] <id>              | sets the id for a notification to be able to close it later.
[-s] <sound URI>        | Sets the sound of the notifications, for possible values see http://msdn.microsoft.com/en-us/library/windows/apps/hh761492.aspx.
[-silent]               | Don't play a sound file when showing the notifications.
[-appID] <App.ID>       | Don't create a shortcut but use the provided app id.
[-pipeName] <\.\pipe\pipeName\> | Provide a name pipe which is used for callbacks.
[-application] <C:\foo.exe>     | Provide a application that might be started if the pipe does not exist.
-close <id>             | Closes a currently displayed notification.
*/
var allowedToasterFlags = [
  't',
  'm',
  'p',
  'id',
  's',
  'silent',
  'appID',
  'close',
  'install'
];
var toasterSoundPrefix = 'Notification.';
var toasterDefaultSound = 'Notification.Default';
module.exports.mapToWin8 = function(options) {
  options = mapAppIcon(options);
  options = mapText(options);

  if (options.icon) {
    if (/^file:\/+/.test(options.icon)) {
      // should parse file protocol URL to path
      options.p = new url.URL(options.icon).pathname
        .replace(/^\/(\w:\/)/, '$1')
        .replace(/\//g, '\\');
    } else {
      options.p = options.icon;
    }
    delete options.icon;
  }

  if (options.message) {
    // Remove escape char to debug "HRESULT : 0xC00CE508" exception
    options.m = options.message.replace(/\x1b/g, '');
    delete options.message;
  }

  if (options.title) {
    options.t = options.title;
    delete options.title;
  }

  if (options.appName) {
    options.appID = options.appName;
    delete options.appName;
  }

  if (typeof options.remove !== 'undefined') {
    options.close = options.remove;
    delete options.remove;
  }

  if (options.quiet || options.silent) {
    options.silent = options.quiet || options.silent;
    delete options.quiet;
  }

  if (typeof options.sound !== 'undefined') {
    options.s = options.sound;
    delete options.sound;
  }

  if (options.s === false) {
    options.silent = true;
    delete options.s;
  }

  // Silent takes precedence. Remove sound.
  if (options.s && options.silent) {
    delete options.s;
  }

  if (options.s === true) {
    options.s = toasterDefaultSound;
  }

  if (options.s && options.s.indexOf(toasterSoundPrefix) !== 0) {
    options.s = toasterDefaultSound;
  }

  for (var key in options) {
    // Check if is allowed. If not, delete!
    if (
      options.hasOwnProperty(key) &&
      allowedToasterFlags.indexOf(key) === -1
    ) {
      delete options[key];
    }
  }

  return options;
};

module.exports.mapToNotifu = function(options) {
  options = mapAppIcon(options);
  options = mapText(options);

  if (options.icon) {
    options.i = options.icon;
    delete options.icon;
  }

  if (options.message) {
    options.m = options.message;
    delete options.message;
  }

  if (options.title) {
    options.p = options.title;
    delete options.title;
  }

  if (options.time) {
    options.d = options.time;
    delete options.time;
  }

  if (options.q !== false) {
    options.q = true;
  } else {
    delete options.q;
  }

  if (options.quiet === false) {
    delete options.q;
    delete options.quiet;
  }

  if (options.sound) {
    delete options.q;
    delete options.sound;
  }

  if (options.t) {
    options.d = options.t;
    delete options.t;
  }

  if (options.type) {
    options.t = sanitizeNotifuTypeArgument(options.type);
    delete options.type;
  }

  return options;
};

module.exports.isMac = function() {
  return os.type() === 'Darwin';
};

module.exports.isMountainLion = function() {
  return (
    os.type() === 'Darwin' &&
    semver.satisfies(garanteeSemverFormat(os.release()), '>=12.0.0')
  );
};

module.exports.isWin8 = function() {
  return (
    os.type() === 'Windows_NT' &&
    semver.satisfies(garanteeSemverFormat(os.release()), '>=6.2.9200')
  );
};

module.exports.isWSL = function() {
  return isWSL;
};

module.exports.isLessThanWin8 = function() {
  return (
    os.type() === 'Windows_NT' &&
    semver.satisfies(garanteeSemverFormat(os.release()), '<6.2.9200')
  );
};

function garanteeSemverFormat(version) {
  if (version.split('.').length === 2) {
    version += '.0';
  }
  return version;
}

function sanitizeNotifuTypeArgument(type) {
  if (typeof type === 'string' || type instanceof String) {
    if (type.toLowerCase() === 'info') return 'info';
    if (type.toLowerCase() === 'warn') return 'warn';
    if (type.toLowerCase() === 'error') return 'error';
  }

  return 'info';
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// Generated by CoffeeScript 1.3.3
(function() {
  var scan;

  scan = function(string, pattern, callback) {
    var match, result;
    result = "";
    while (string.length > 0) {
      match = string.match(pattern);
      if (match) {
        result += string.slice(0, match.index);
        result += callback(match);
        string = string.slice(match.index + match[0].length);
      } else {
        result += string;
        string = "";
      }
    }
    return result;
  };

  exports.split = function(line) {
    var field, words;
    if (line == null) {
      line = "";
    }
    words = [];
    field = "";
    scan(line, /\s*(?:([^\s\\\'\"]+)|'((?:[^\'\\]|\\.)*)'|"((?:[^\"\\]|\\.)*)"|(\\.?)|(\S))(\s|$)?/, function(match) {
      var dq, escape, garbage, raw, seperator, sq, word;
      raw = match[0], word = match[1], sq = match[2], dq = match[3], escape = match[4], garbage = match[5], seperator = match[6];
      if (garbage != null) {
        throw new Error("Unmatched quote");
      }
      field += word || (sq || dq || escape).replace(/\\(?=.)/, "");
      if (seperator != null) {
        words.push(field);
        return field = "";
      }
    });
    if (field) {
      words.push(field);
    }
    return words;
  };

  exports.escape = function(str) {
    if (str == null) {
      str = "";
    }
    if (str == null) {
      return "''";
    }
    return str.replace(/([^A-Za-z0-9_\-.,:\/@\n])/g, "\\$1").replace(/\n/g, "'\n'");
  };

}).call(this);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 7 */
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
var t = exports.tokens = {}
var R = 0

function tok (n) {
  t[n] = R++
}

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

tok('NUMERICIDENTIFIER')
src[t.NUMERICIDENTIFIER] = '0|[1-9]\\d*'
tok('NUMERICIDENTIFIERLOOSE')
src[t.NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

tok('NONNUMERICIDENTIFIER')
src[t.NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

tok('MAINVERSION')
src[t.MAINVERSION] = '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[t.NUMERICIDENTIFIER] + ')'

tok('MAINVERSIONLOOSE')
src[t.MAINVERSIONLOOSE] = '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[t.NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

tok('PRERELEASEIDENTIFIER')
src[t.PRERELEASEIDENTIFIER] = '(?:' + src[t.NUMERICIDENTIFIER] +
                            '|' + src[t.NONNUMERICIDENTIFIER] + ')'

tok('PRERELEASEIDENTIFIERLOOSE')
src[t.PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[t.NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[t.NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

tok('PRERELEASE')
src[t.PRERELEASE] = '(?:-(' + src[t.PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[t.PRERELEASEIDENTIFIER] + ')*))'

tok('PRERELEASELOOSE')
src[t.PRERELEASELOOSE] = '(?:-?(' + src[t.PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[t.PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

tok('BUILDIDENTIFIER')
src[t.BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

tok('BUILD')
src[t.BUILD] = '(?:\\+(' + src[t.BUILDIDENTIFIER] +
             '(?:\\.' + src[t.BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

tok('FULL')
tok('FULLPLAIN')
src[t.FULLPLAIN] = 'v?' + src[t.MAINVERSION] +
                  src[t.PRERELEASE] + '?' +
                  src[t.BUILD] + '?'

src[t.FULL] = '^' + src[t.FULLPLAIN] + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
tok('LOOSEPLAIN')
src[t.LOOSEPLAIN] = '[v=\\s]*' + src[t.MAINVERSIONLOOSE] +
                  src[t.PRERELEASELOOSE] + '?' +
                  src[t.BUILD] + '?'

tok('LOOSE')
src[t.LOOSE] = '^' + src[t.LOOSEPLAIN] + '$'

tok('GTLT')
src[t.GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
tok('XRANGEIDENTIFIERLOOSE')
src[t.XRANGEIDENTIFIERLOOSE] = src[t.NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
tok('XRANGEIDENTIFIER')
src[t.XRANGEIDENTIFIER] = src[t.NUMERICIDENTIFIER] + '|x|X|\\*'

tok('XRANGEPLAIN')
src[t.XRANGEPLAIN] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[t.XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[t.PRERELEASE] + ')?' +
                   src[t.BUILD] + '?' +
                   ')?)?'

tok('XRANGEPLAINLOOSE')
src[t.XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[t.XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[t.PRERELEASELOOSE] + ')?' +
                        src[t.BUILD] + '?' +
                        ')?)?'

tok('XRANGE')
src[t.XRANGE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAIN] + '$'
tok('XRANGELOOSE')
src[t.XRANGELOOSE] = '^' + src[t.GTLT] + '\\s*' + src[t.XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
tok('COERCE')
src[t.COERCE] = '(^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'
tok('COERCERTL')
re[t.COERCERTL] = new RegExp(src[t.COERCE], 'g')

// Tilde ranges.
// Meaning is "reasonably at or greater than"
tok('LONETILDE')
src[t.LONETILDE] = '(?:~>?)'

tok('TILDETRIM')
src[t.TILDETRIM] = '(\\s*)' + src[t.LONETILDE] + '\\s+'
re[t.TILDETRIM] = new RegExp(src[t.TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

tok('TILDE')
src[t.TILDE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAIN] + '$'
tok('TILDELOOSE')
src[t.TILDELOOSE] = '^' + src[t.LONETILDE] + src[t.XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
tok('LONECARET')
src[t.LONECARET] = '(?:\\^)'

tok('CARETTRIM')
src[t.CARETTRIM] = '(\\s*)' + src[t.LONECARET] + '\\s+'
re[t.CARETTRIM] = new RegExp(src[t.CARETTRIM], 'g')
var caretTrimReplace = '$1^'

tok('CARET')
src[t.CARET] = '^' + src[t.LONECARET] + src[t.XRANGEPLAIN] + '$'
tok('CARETLOOSE')
src[t.CARETLOOSE] = '^' + src[t.LONECARET] + src[t.XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
tok('COMPARATORLOOSE')
src[t.COMPARATORLOOSE] = '^' + src[t.GTLT] + '\\s*(' + src[t.LOOSEPLAIN] + ')$|^$'
tok('COMPARATOR')
src[t.COMPARATOR] = '^' + src[t.GTLT] + '\\s*(' + src[t.FULLPLAIN] + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
tok('COMPARATORTRIM')
src[t.COMPARATORTRIM] = '(\\s*)' + src[t.GTLT] +
                      '\\s*(' + src[t.LOOSEPLAIN] + '|' + src[t.XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[t.COMPARATORTRIM] = new RegExp(src[t.COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
tok('HYPHENRANGE')
src[t.HYPHENRANGE] = '^\\s*(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[t.XRANGEPLAIN] + ')' +
                   '\\s*$'

tok('HYPHENRANGELOOSE')
src[t.HYPHENRANGELOOSE] = '^\\s*(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[t.XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
tok('STAR')
src[t.STAR] = '(<|>)?=?\\s*\\*'

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

  var r = options.loose ? re[t.LOOSE] : re[t.FULL]
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

  var m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL])

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

SemVer.prototype.compareBuild = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  var i = 0
  do {
    var a = this.build[i]
    var b = other.build[i]
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

exports.compareBuild = compareBuild
function compareBuild (a, b, loose) {
  var versionA = new SemVer(a, loose)
  var versionB = new SemVer(b, loose)
  return versionA.compare(versionB) || versionA.compareBuild(versionB)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compareBuild(b, a, loose)
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
  var r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1] !== undefined ? m[1] : ''
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

  if (this.semver === ANY || version === ANY) {
    return true
  }

  if (typeof version === 'string') {
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
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
    if (this.value === '') {
      return true
    }
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    if (comp.value === '') {
      return true
    }
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
  var hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[t.COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[t.TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[t.CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR]
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
    return (
      isSatisfiable(thisComparators, options) &&
      range.set.some(function (rangeComparators) {
        return (
          isSatisfiable(rangeComparators, options) &&
          thisComparators.every(function (thisComparator) {
            return rangeComparators.every(function (rangeComparator) {
              return thisComparator.intersects(rangeComparator, options)
            })
          })
        )
      })
    )
  })
}

// take a set of comparators and determine whether there
// exists a version which can satisfy it
function isSatisfiable (comparators, options) {
  var result = true
  var remainingComparators = comparators.slice()
  var testComparator = remainingComparators.pop()

  while (result && remainingComparators.length) {
    result = remainingComparators.every(function (otherComparator) {
      return testComparator.intersects(otherComparator, options)
    })

    testComparator = remainingComparators.pop()
  }

  return result
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
  var r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE]
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
  var r = options.loose ? re[t.CARETLOOSE] : re[t.CARET]
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
  var r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    // if we're including prereleases in the match, then we need
    // to fix this to -0, the lowest possible prerelease value
    pr = options.includePrerelease ? '-0' : ''

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0-0'
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

      ret = gtlt + M + '.' + m + '.' + p + pr
    } else if (xm) {
      ret = '>=' + M + '.0.0' + pr + ' <' + (+M + 1) + '.0.0' + pr
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0' + pr +
        ' <' + M + '.' + (+m + 1) + '.0' + pr
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
  return comp.trim().replace(re[t.STAR], '')
}

// This function is passed to string.replace(re[t.HYPHENRANGE])
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
    try {
      version = new SemVer(version, this.options)
    } catch (er) {
      return false
    }
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
function coerce (version, options) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version === 'number') {
    version = String(version)
  }

  if (typeof version !== 'string') {
    return null
  }

  options = options || {}

  var match = null
  if (!options.rtl) {
    match = version.match(re[t.COERCE])
  } else {
    // Find the right-most coercible string that does not share
    // a terminus with a more left-ward coercible string.
    // Eg, '1.2.3.4' wants to coerce '2.3.4', not '3.4' or '4'
    //
    // Walk through the string checking with a /g regexp
    // Manually set the index so as to pick up overlapping matches.
    // Stop when we get a match that ends at the string end, since no
    // coercible string can be more right-ward without the same terminus.
    var next
    while ((next = re[t.COERCERTL].exec(version)) &&
      (!match || match.index + match[0].length !== version.length)
    ) {
      if (!match ||
          next.index + next[0].length !== match.index + match[0].length) {
        match = next
      }
      re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length
    }
    // leave it in a clean state
    re[t.COERCERTL].lastIndex = -1
  }

  if (match === null) {
    return null
  }

  return parse(match[2] +
    '.' + (match[3] || '0') +
    '.' + (match[4] || '0'), options)
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(3);
const fs = __webpack_require__(9);

const isWsl = () => {
	if (process.platform !== 'linux') {
		return false;
	}

	if (os.release().toLowerCase().includes('microsoft')) {
		return true;
	}

	try {
		return fs.readFileSync('/proc/version', 'utf8').toLowerCase().includes('microsoft');
	} catch (_) {
		return false;
	}
};

if (process.env.__IS_WSL_TEST__) {
	module.exports = isWsl;
} else {
	module.exports = isWsl();
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Node.js wrapper for "notify-send".
 */
var os = __webpack_require__(3);
var which = __webpack_require__(13);
var utils = __webpack_require__(4);

var EventEmitter = __webpack_require__(17).EventEmitter;
var util = __webpack_require__(18);

var notifier = 'notify-send';
var hasNotifier;

module.exports = NotifySend;

function NotifySend(options) {
  options = utils.clone(options || {});
  if (!(this instanceof NotifySend)) {
    return new NotifySend(options);
  }

  this.options = options;

  EventEmitter.call(this);
}
util.inherits(NotifySend, EventEmitter);

function noop() {}
NotifySend.prototype.notify = function(options, callback) {
  options = utils.clone(options || {});
  callback = callback || noop;

  if (typeof callback !== 'function') {
    throw new TypeError(
      'The second argument must be a function callback. You have passed ' +
        typeof callback
    );
  }

  if (typeof options === 'string') {
    options = { title: 'node-notifier', message: options };
  }

  if (!options.message) {
    callback(new Error('Message is required.'));
    return this;
  }

  if (os.type() !== 'Linux' && !os.type().match(/BSD$/)) {
    callback(new Error('Only supported on Linux and *BSD systems'));
    return this;
  }

  if (hasNotifier === false) {
    callback(new Error('notify-send must be installed on the system.'));
    return this;
  }

  if (hasNotifier || !!this.options.suppressOsdCheck) {
    doNotification(options, callback);
    return this;
  }

  try {
    hasNotifier = !!which.sync(notifier);
    doNotification(options, callback);
  } catch (err) {
    hasNotifier = false;
    return callback(err);
  }

  return this;
};

var allowedArguments = ['urgency', 'expire-time', 'icon', 'category', 'hint'];

function doNotification(options, callback) {
  var initial, argsList;

  options = utils.mapToNotifySend(options);
  options.title = options.title || 'Node Notification:';

  initial = [options.title, options.message];
  delete options.title;
  delete options.message;

  argsList = utils.constructArgumentList(options, {
    initial: initial,
    keyExtra: '-',
    allowedArguments: allowedArguments
  });

  utils.command(notifier, argsList, callback);
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = which
which.sync = whichSync

var isWindows = process.platform === 'win32' ||
    process.env.OSTYPE === 'cygwin' ||
    process.env.OSTYPE === 'msys'

var path = __webpack_require__(10)
var COLON = isWindows ? ';' : ':'
var isexe = __webpack_require__(14)

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
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(9)
var core
if (process.platform === 'win32' || global.TESTING_WINDOWS) {
  core = __webpack_require__(15)
} else {
  core = __webpack_require__(16)
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(9)

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
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = isexe
isexe.sync = sync

var fs = __webpack_require__(9)

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
/* 17 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {/**
 * A Node.js wrapper for terminal-notify (with fallback).
 */
var utils = __webpack_require__(4);
var Growl = __webpack_require__(20);
var path = __webpack_require__(10);
var notifier = path.join(
  __dirname,
  '../vendor/mac.noindex/terminal-notifier.app/Contents/MacOS/terminal-notifier'
);

var EventEmitter = __webpack_require__(17).EventEmitter;
var util = __webpack_require__(18);

var errorMessageOsX =
  'You need Mac OS X 10.8 or above to use NotificationCenter,' +
  ' or use Growl fallback with constructor option {withFallback: true}.';

module.exports = NotificationCenter;

function NotificationCenter(options) {
  options = utils.clone(options || {});
  if (!(this instanceof NotificationCenter)) {
    return new NotificationCenter(options);
  }
  this.options = options;

  EventEmitter.call(this);
}
util.inherits(NotificationCenter, EventEmitter);
var activeId = null;

function noop() {}
NotificationCenter.prototype.notify = function(options, callback) {
  var fallbackNotifier;
  var id = identificator();
  options = utils.clone(options || {});
  activeId = id;

  if (typeof options === 'string') {
    options = { title: 'node-notifier', message: options };
  }
  callback = callback || noop;

  if (typeof callback !== 'function') {
    throw new TypeError(
      'The second argument must be a function callback. You have passed ' +
        typeof fn
    );
  }

  var actionJackedCallback = utils.actionJackerDecorator(
    this,
    options,
    callback,
    function(data) {
      if (activeId !== id) return false;

      if (data === 'activate') {
        return 'click';
      }
      if (data === 'timeout') {
        return 'timeout';
      }
      if (data === 'replied') {
        return 'replied';
      }
      return false;
    }
  );

  options = utils.mapToMac(options);

  if (!options.message && !options.group && !options.list && !options.remove) {
    callback(new Error('Message, group, remove or list property is required.'));
    return this;
  }

  var argsList = utils.constructArgumentList(options);
  if (utils.isMountainLion()) {
    utils.fileCommandJson(
      this.options.customPath || notifier,
      argsList,
      actionJackedCallback
    );
    return this;
  }

  if (fallbackNotifier || !!this.options.withFallback) {
    fallbackNotifier = fallbackNotifier || new Growl(this.options);
    return fallbackNotifier.notify(options, callback);
  }

  callback(new Error(errorMessageOsX));
  return this;
};

function identificator() {
  return { _ref: 'val' };
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Wrapper for the growly module
 */
var checkGrowl = __webpack_require__(21);
var utils = __webpack_require__(4);
var growly = __webpack_require__(23);

var EventEmitter = __webpack_require__(17).EventEmitter;
var util = __webpack_require__(18);

var errorMessageNotFound =
  "Couldn't connect to growl (might be used as a fallback). Make sure it is running";

module.exports = Growl;

var hasGrowl;

function Growl(options) {
  options = utils.clone(options || {});
  if (!(this instanceof Growl)) {
    return new Growl(options);
  }

  growly.appname = options.name || 'Node';
  this.options = options;

  EventEmitter.call(this);
}
util.inherits(Growl, EventEmitter);

Growl.prototype.notify = function(options, callback) {
  growly.setHost(this.options.host, this.options.port);
  options = utils.clone(options || {});

  if (typeof options === 'string') {
    options = { title: 'node-notifier', message: options };
  }

  callback = utils.actionJackerDecorator(this, options, callback, function(
    data
  ) {
    if (data === 'click') {
      return 'click';
    }
    if (data === 'timedout') {
      return 'timeout';
    }
    return false;
  });

  options = utils.mapToGrowl(options);

  if (!options.message) {
    callback(new Error('Message is required.'));
    return this;
  }

  options.title = options.title || 'Node Notification:';

  if (hasGrowl || !!options.wait) {
    var localCallback = options.wait ? callback : noop;
    growly.notify(options.message, options, localCallback);
    if (!options.wait) callback();
    return this;
  }

  checkGrowl(growly, function(_, didHaveGrowl) {
    hasGrowl = didHaveGrowl;
    if (!didHaveGrowl) return callback(new Error(errorMessageNotFound));
    growly.notify(options.message, options);
    callback();
  });
  return this;
};

function noop() {}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var net = __webpack_require__(22);

var hasGrowl = false;
module.exports = function(growlConfig, cb) {
  if (typeof cb === 'undefined') {
    cb = growlConfig;
    growlConfig = {};
  }
  if (hasGrowl) return cb(null, hasGrowl);
  var port = growlConfig.port || 23053;
  var host = growlConfig.host || 'localhost';
  var socket = net.connect(port, host);
  socket.setTimeout(100);

  socket.on('connect', function() {
    socket.end();
    cb(null, true);
  });

  socket.on('error', function() {
    socket.end();
    cb(null, false);
  });
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var GNTP = __webpack_require__(24);

/**
 * Interface for registering Growl applications and sending Growl notifications.
 *
 * @api private
 */

function Growly() {
    this.appname = 'Growly';
    this.notifications = undefined;
    this.labels = undefined;
    this.count = 0;
    this.registered = false;
    this.host = undefined;
    this.port = undefined;
}

/**
 * Returns an array of label strings extracted from each notification object in
 * `Growly.notifications`.
 *
 * @param {Array} notifications
 * @return {Array} notification labels
 * @api private
 */

Growly.prototype.getLabels = function() {
    return this.notifications.map(function(notif) {
        return notif.label;
    });
};

/**
 * Set the host to be used by GNTP requests.
 *
 * @param {String} host
 * @param {Number} port
 * @api public
 */

Growly.prototype.setHost = function(host, port) {
    this.host = host;
    this.port = port;
};

/**
 * Register an application with the name `appname` (required), icon `appicon`, and
 * a list of notification types `notifications`. If provided, `callback` will be
 * called when the request completes with the first argument being an `err` error
 * object if the request failed.
 *
 * Each object in the `notifications` array defines a type of notification the
 * application will have with the following properties:
 *
 *  - `.label` name used to identify the type of notification being used (required)
 *  - `.dispname` name users will see in Growl's preference panel (defaults to `.label`)
 *  - `.enabled` whether or not notifications of this type are enabled (defaults to true)
 *  - `.icon` default icon notifications of this type should use (url, file path, or Buffer object)
 *
 *  Example registration:
 *
 *      growl.register('My Application', 'path/to/icon.png', [
 *          { label: 'success', dispname: 'Success', icon: 'path/to/success.png' },
 *          { label: 'warning', dispname: 'Warning', icon: 'path/to/warning.png', enabled: false }
 *      ], function(err) { console.log(err || 'Registration successful!'); });
 *
 * @param {String} appname
 * @param {String|Buffer} appicon
 * @param {Array} notifications
 * @param {Function} callback
 * @api public
 */

Growly.prototype.register = function(appname, appicon, notifications, callback) {
    var gntp;

    if (typeof appicon === 'object') {
        notifications = appicon;
        appicon = undefined;
    }

    if (notifications === undefined || !notifications.length) {
        notifications = [{ label: 'default', dispname: 'Default Notification', enabled: true }];
    }

    if (typeof arguments[arguments.length - 1] === 'function') {
        callback = arguments[arguments.length - 1];
    } else {
        callback = function() {};
    }

    this.appname = appname;
    this.notifications = notifications;
    this.labels = this.getLabels();
    this.registered = true;

    gntp = new GNTP('REGISTER', { host: this.host, port: this.port });
    gntp.add('Application-Name', appname);
    gntp.add('Application-Icon', appicon);
    gntp.add('Notifications-Count', notifications.length);
    gntp.newline();

    notifications.forEach(function(notif) {
        if (notif.enabled === undefined) notif.enabled = true;
        gntp.add('Notification-Name', notif.label);
        gntp.add('Notification-Display-Name', notif.dispname);
        gntp.add('Notification-Enabled', notif.enabled ? 'True' : 'False');
        gntp.add('Notification-Icon', notif.icon);
        gntp.newline();
    });

    gntp.send(callback);
};

/**
 * Send a notification with `text` content. Growly will lazily register itself
 * if the user hasn't already before sending the notification.
 *
 * A notification can have the following `opts` options:
 *
 *  - `.label` type of notification to use (defaults to the first registered type)
 *  - `.title` title of the notification
 *  - `.icon` url, file path, or Buffer instance for the notification's icon.
 *  - `.sticky` whether or not to sticky the notification (defaults to false)
 *  - `.priority` the priority of the notification from lowest (-2) to highest (2)
 *  - `.coalescingId` replace/update the matching previous notification. May be ignored.
 *
 * If provided, `callback` will be called when the user interacts with the notification.
 * The first argument will be an `err` error object, and the second argument an `action`
 * string equal to either 'clicked' or 'closed' (whichever action the user took.)
 *
 * Example notification:
 *
 *     growl.notify('Stuffs broken!', { label: 'warning' }, function(err, action) {
 *         console.log('Action:', action);
 *     });
 *
 * @param {String} text
 * @param {Object} opts
 * @param {Function} callback
 * @api public
 */

Growly.prototype.notify = function(text, opts, callback) {
    var self = this,
        gntp;

    /* Lazy registration. */
    if (!this.registered) {
        this.register(this.appname, function(err) {
            if (err) console.log(err);
            self.notify.call(self, text, opts, callback);
        });
        return;
    }

    opts = opts || {};

    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    gntp = new GNTP('NOTIFY', { host: this.host, port: this.port });
    gntp.add('Application-Name', this.appname);
    gntp.add('Notification-Name', opts.label || this.labels[0]);
    gntp.add('Notification-ID', ++this.count);
    gntp.add('Notification-Title', opts.title);
    gntp.add('Notification-Text', text);
    gntp.add('Notification-Sticky', opts.sticky ? 'True' : 'False');
    gntp.add('Notification-Priority', opts.priority);
    gntp.add('Notification-Icon', opts.icon);
    gntp.add('Notification-Coalescing-ID', opts.coalescingId || undefined);
    gntp.add('Notification-Callback-Context', callback ? 'context' : undefined);
    gntp.add('Notification-Callback-Context-Type', callback ? 'string' : undefined);
    gntp.add('Notification-Callback-Target', undefined);
    gntp.newline();

    gntp.send(function(err, resp) {
        if (callback && err) {
            callback(err);
        } else if (callback && resp.state === 'CALLBACK') {
            callback(undefined, resp['Notification-Callback-Result'].toLowerCase());
        }
    });
};

/**
 * Expose an instance of the Growly object.
 */

module.exports = new Growly();


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var net = __webpack_require__(22),
    crypto = __webpack_require__(25),
    format = __webpack_require__(18).format,
    fs = __webpack_require__(9);

var nl = '\r\n';

/**
 * Create a new GNTP request of the given `type`.
 *
 * @param {String} type either NOTIFY or REGISTER
 * @api private
 */

function GNTP(type, opts) {
    opts = opts || {};
    this.type = type;
    this.host = opts.host || 'localhost';
    this.port = opts.port || 23053;
    this.request = 'GNTP/1.0 ' + type + ' NONE' + nl;
    this.resources = [];
    this.attempts = 0;
    this.maxAttempts = 5;
}

/**
 * Build a response object from the given `resp` response string.
 *
 * The response object has a key/value pair for every header in the response, and 
 * a `.state` property equal to either OK, ERROR, or CALLBACK.
 *
 * An example GNTP response:
 *
 *     GNTP/1.0 -OK NONE\r\n
 *     Response-Action: REGISTER\r\n
 *     \r\n
 *
 *  Which would parse to:
 *      
 *      { state: 'OK', 'Response-Action': 'REGISTER' }
 *
 * @param {String} resp
 * @return {Object}
 * @api private
 */

GNTP.prototype.parseResp = function(resp) {
    var parsed = {}, head, body;
    resp = resp.slice(0, resp.indexOf(nl + nl)).split(nl);
    head = resp[0];
    body = resp.slice(1);

    parsed.state = head.match(/-(OK|ERROR|CALLBACK)/)[0].slice(1);
    body.forEach(function(ln) {
        ln = ln.split(': ');
        parsed[ln[0]] = ln[1];
    });

    return parsed;
};

/**
 * Call `GNTP.send()` with the given arguments after a certain delay.
 *
 * @api private
 */

GNTP.prototype.retry = function() {
    var self = this, 
        args = arguments;
    setTimeout(function() {
        self.send.apply(self, args);
    }, 750);
};


/**
 * Add a resource to the GNTP request.
 *
 * @param {Buffer} file
 * @return {String}
 * @api private
 */

GNTP.prototype.addResource = function(file) {
    var id = crypto.createHash('md5').update(file).digest('hex'),
        header = 'Identifier: ' + id + nl + 'Length: ' + file.length + nl + nl;
    this.resources.push({ header: header, file: file });
    return 'x-growl-resource://' + id;
};

/**
 * Append another header `name` with a value of `val` to the request. If `val` is
 * undefined, the header will be left out.
 *
 * @param {String} name
 * @param {String} val
 * @api public
 */

GNTP.prototype.add = function(name, val) {
    if (val === undefined) 
        return;

    /* Handle icon files when they're image paths or Buffers. */
    if (/-Icon/.test(name) && !/^https?:\/\//.test(val) ) {
        if (/\.(png|gif|jpe?g)$/.test(val))
            val = this.addResource(fs.readFileSync(val));
        else if (val instanceof Buffer)
            val = this.addResource(val);
    }

    this.request += name + ': ' + val + nl;
};

/**
 * Append a newline to the request.
 *
 * @api public
 */

GNTP.prototype.newline = function() {
    this.request += nl;
};

/**
 * Send the GNTP request, calling `callback` after successfully sending the 
 * request.
 *
 * An example GNTP request:
 *
 *     GNTP/1.0 REGISTER NONE\r\n
 *     Application-Name: Growly.js\r\n
 *     Notifications-Count: 1\r\n
 *     \r\n
 *     Notification-Name: default\r\n
 *     Notification-Display-Name: Default Notification\r\n
 *     Notification-Enabled: True\r\n
 *     \r\n
 * 
 * @param {Function} callback which will be passed the parsed response
 * @api public
 */

GNTP.prototype.send = function(callback) {
    var self = this,
        socket = net.connect(this.port, this.host),
        resp = '';

    callback = callback || function() {};

    this.attempts += 1;

    socket.on('connect', function() {
        socket.write(self.request);

        self.resources.forEach(function(res) {
            socket.write(res.header);
            socket.write(res.file);
            socket.write(nl + nl);
        });
    });

    socket.on('data', function(data) {
        resp += data.toString();

        /* Wait until we have a complete response which is signaled by two CRLF's. */
        if (resp.slice(resp.length - 4) !== (nl + nl)) return; 

        resp = self.parseResp(resp); 

        /* We have to manually close the connection for certain responses; otherwise,
           reset `resp` to prepare for the next response chunk.  */
        if (resp.state === 'ERROR' || resp.state === 'CALLBACK')
            socket.end();
        else
            resp = '';
    });

    socket.on('end', function() {
        /* Retry on 200 (timed out), 401 (unknown app), or 402 (unknown notification). */
        if (['200', '401', '402'].indexOf(resp['Error-Code']) >= 0) {
            if (self.attempts <= self.maxAttempts) {
                self.retry(callback);
            } else {
                var msg = 'GNTP request to "%s:%d" failed with error code %s (%s)';
                callback(new Error(format(msg, self.host, self.port, resp['Error-Code'], resp['Error-Description'])));
            }
        } else {
            callback(undefined, resp);
        }
    });

    socket.on('error', function() {
        callback(new Error(format('Error while sending GNTP request to "%s:%d"', self.host, self.port)));
        socket.destroy();
    });
};

module.exports = GNTP;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {/**
 * Wrapper for the toaster (https://github.com/nels-o/toaster)
 */
var path = __webpack_require__(10);
var notifier = path.resolve(__dirname, '../vendor/snoreToast/snoretoast');
var utils = __webpack_require__(4);
var Balloon = __webpack_require__(27);
var os = __webpack_require__(3);

var EventEmitter = __webpack_require__(17).EventEmitter;
var util = __webpack_require__(18);

var fallback;

module.exports = WindowsToaster;

function WindowsToaster(options) {
  options = utils.clone(options || {});
  if (!(this instanceof WindowsToaster)) {
    return new WindowsToaster(options);
  }

  this.options = options;

  EventEmitter.call(this);
}
util.inherits(WindowsToaster, EventEmitter);

function noop() {}

var timeoutMessage = 'the toast has timed out';
var successMessage = 'user clicked on the toast';

function hasText(str, txt) {
  return str && str.indexOf(txt) !== -1;
}

WindowsToaster.prototype.notify = function(options, callback) {
  options = utils.clone(options || {});
  callback = callback || noop;
  var is64Bit = os.arch() === 'x64';

  if (typeof options === 'string') {
    options = { title: 'node-notifier', message: options };
  }

  if (typeof callback !== 'function') {
    throw new TypeError(
      'The second argument must be a function callback. You have passed ' +
        typeof fn
    );
  }

  var actionJackedCallback = utils.actionJackerDecorator(
    this,
    options,
    function cb(err, data) {
      /* Possible exit statuses from SnoreToast, we only want to include err if it's -1 code
      Exit Status     :  Exit Code
      Failed          : -1

      Success         :  0
      Hidden          :  1
      Dismissed       :  2
      TimedOut        :  3
      ButtonPressed   :  4
      TextEntered     :  5
      */
      if (err && err.code !== -1) {
        return callback(null, data);
      }
      callback(err, data);
    },
    function mapper(data) {
      if (hasText(data, successMessage)) {
        return 'click';
      }
      if (hasText(data, timeoutMessage)) {
        return 'timeout';
      }
      return false;
    }
  );

  options.title = options.title || 'Node Notification:';
  if (
    typeof options.message === 'undefined' &&
    typeof options.close === 'undefined'
  ) {
    callback(new Error('Message or ID to close is required.'));
    return this;
  }

  if (!utils.isWin8() && !utils.isWSL() && !!this.options.withFallback) {
    fallback = fallback || new Balloon(this.options);
    return fallback.notify(options, callback);
  }

  options = utils.mapToWin8(options);
  var argsList = utils.constructArgumentList(options, {
    explicitTrue: true,
    wrapper: '',
    keepNewlines: true,
    noEscape: true
  });

  var notifierWithArch = notifier + '-x' + (is64Bit ? '64' : '86') + '.exe';
  utils.fileCommand(
    this.options.customPath || notifierWithArch,
    argsList,
    actionJackedCallback
  );
  return this;
};

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__dirname) {/**
 * Wrapper for the notifu 1.6 (http://www.paralint.com/projects/notifu/)

Usage
/t <value>      The type of message to display values are:
                    info      The message is an informational message
                    warn      The message is an warning message
                    error     The message is an error message
/d <value>      The number of milliseconds to display (omit or 0 for infinit)
/p <value>      The title (or prompt) of the ballon
/m <value>      The message text
/i <value>      Specify an icon to use ("parent" uses the icon of the parent process)
/e              Enable ballon tips in the registry (for this user only)
/q              Do not play a sound when the tooltip is displayed
/w              Show the tooltip even if the user is in the quiet period that follows his very first login (Windows 7 and up)
/xp             Use IUserNotification interface event when IUserNotification2 is available

// Kill codes:
  2 = Timeout
  3 = Clicked
  4 = Closed or faded out

 */
var path = __webpack_require__(10);
var notifier = path.resolve(__dirname, '../vendor/notifu/notifu');
var checkGrowl = __webpack_require__(21);
var utils = __webpack_require__(4);
var Toaster = __webpack_require__(26);
var Growl = __webpack_require__(20);
var os = __webpack_require__(3);

var EventEmitter = __webpack_require__(17).EventEmitter;
var util = __webpack_require__(18);

var hasGrowl;

module.exports = WindowsBalloon;

function WindowsBalloon(options) {
  options = utils.clone(options || {});
  if (!(this instanceof WindowsBalloon)) {
    return new WindowsBalloon(options);
  }

  this.options = options;

  EventEmitter.call(this);
}
util.inherits(WindowsBalloon, EventEmitter);

function noop() {}
WindowsBalloon.prototype.notify = function(options, callback) {
  var fallback;
  var notifierOptions = this.options;
  options = utils.clone(options || {});
  callback = callback || noop;

  if (typeof options === 'string') {
    options = { title: 'node-notifier', message: options };
  }

  var actionJackedCallback = utils.actionJackerDecorator(
    this,
    options,
    callback,
    function(data) {
      if (data === 'activate') {
        return 'click';
      }
      if (data === 'timeout') {
        return 'timeout';
      }
      return false;
    }
  );

  if (!!this.options.withFallback && utils.isWin8()) {
    fallback = fallback || new Toaster(notifierOptions);
    return fallback.notify(options, callback);
  }

  if (
    !!this.options.withFallback &&
    (!utils.isLessThanWin8() || hasGrowl === true)
  ) {
    fallback = fallback || new Growl(notifierOptions);
    return fallback.notify(options, callback);
  }

  if (!this.options.withFallback || hasGrowl === false) {
    doNotification(options, notifierOptions, actionJackedCallback);
    return this;
  }

  checkGrowl(notifierOptions, function(_, hasGrowlResult) {
    hasGrowl = hasGrowlResult;

    if (hasGrowl) {
      fallback = fallback || new Growl(notifierOptions);
      return fallback.notify(options, callback);
    }

    doNotification(options, notifierOptions, actionJackedCallback);
  });

  return this;
};

var allowedArguments = ['t', 'd', 'p', 'm', 'i', 'e', 'q', 'w', 'xp'];

function doNotification(options, notifierOptions, callback) {
  var is64Bit = os.arch() === 'x64';
  options = options || {};
  options = utils.mapToNotifu(options);
  options.p = options.p || 'Node Notification:';

  var fullNotifierPath = notifier + (is64Bit ? '64' : '') + '.exe';
  var localNotifier = notifierOptions.customPath || fullNotifierPath;

  if (!options.m) {
    callback(new Error('Message is required.'));
    return this;
  }

  var argsList = utils.constructArgumentList(options, {
    wrapper: '',
    noEscape: true,
    explicitTrue: true,
    allowedArguments: allowedArguments
  });

  if (options.wait) {
    return utils.fileCommand(localNotifier, argsList, function(error, data) {
      var action = fromErrorCodeToAction(error.code);
      if (action === 'error') return callback(error, data);

      return callback(null, action);
    });
  }
  utils.immediateFileCommand(localNotifier, argsList, callback);
}

function fromErrorCodeToAction(errorCode) {
  switch (errorCode) {
    case 2:
      return 'timeout';
    case 3:
    case 6:
    case 7:
      return 'activate';
    case 4:
      return 'close';
    default:
      return 'error';
  }
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ })
/******/ ]);
