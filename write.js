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


const fs = __webpack_require__(3);
const path = __webpack_require__(4);
const increment = __webpack_require__(5);

/**
 * Asynchronously writes data to a file, replacing the file if it already
 * exists and creating any intermediate directories if they don't already
 * exist. Data can be a string or a buffer. Returns a promise if a callback
 * function is not passed.
 *
 * ```js
 * const write = require('write');
 *
 * // async/await
 * (async () => {
 *   await write('foo.txt', 'This is content...');
 * })();
 *
 * // promise
 * write('foo.txt', 'This is content...')
 *   .then(() => {
 *     // do stuff
 *   });
 *
 * // callback
 * write('foo.txt', 'This is content...', err => {
 *   // do stuff with err
 * });
 * ```
 * @name write
 * @param {String} `filepath` file path.
 * @param {String|Buffer|Uint8Array} `data` Data to write.
 * @param {Object} `options` Options to pass to [fs.writeFile][writefile]
 * @param {Function} `callback` (optional) If no callback is provided, a promise is returned.
 * @returns {Object} Returns an object with the `path` and `contents` of the file that was written to the file system. This is useful for debugging when `options.increment` is used and the path might have been modified.
 * @api public
 */

const write = (filepath, data, options, callback) => {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  const opts = { encoding: 'utf8', ...options };
  const destpath = opts.increment ? incrementName(filepath, options) : filepath;
  const result = { path: destpath, data };

  if (opts.overwrite === false && exists(filepath, destpath)) {
    throw new Error('File already exists: ' + destpath);
  }

  const promise = mkdir(path.dirname(destpath), { recursive: true, ...options })
    .then(() => {
      return new Promise((resolve, reject) => {
        fs.createWriteStream(destpath, opts)
          .on('error', err => reject(err))
          .on('close', resolve)
          .end(ensureNewline(data, opts));
      });
    });

  if (typeof callback === 'function') {
    promise.then(() => callback(null, result)).catch(callback);
    return;
  }

  return promise.then(() => result);
};

/**
 * The synchronous version of [write](#write). Returns undefined.
 *
 * ```js
 * const write = require('write');
 * write.sync('foo.txt', 'This is content...');
 * ```
 * @name .sync
 * @param {String} `filepath` file path.
 * @param {String|Buffer|Uint8Array} `data` Data to write.
 * @param {Object} `options` Options to pass to [fs.writeFileSync][writefilesync]
 * @returns {Object} Returns an object with the `path` and `contents` of the file that was written to the file system. This is useful for debugging when `options.increment` is used and the path might have been modified.
 * @api public
 */

write.sync = (filepath, data, options) => {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }

  const opts = { encoding: 'utf8', ...options };
  const destpath = opts.increment ? incrementName(filepath, options) : filepath;

  if (opts.overwrite === false && exists(filepath, destpath)) {
    throw new Error('File already exists: ' + destpath);
  }

  mkdirSync(path.dirname(destpath), { recursive: true, ...options });
  fs.writeFileSync(destpath, ensureNewline(data, opts), opts);
  return { path: destpath, data };
};

/**
 * Returns a new [WriteStream][writestream] object. Uses `fs.createWriteStream`
 * to write data to a file, replacing the file if it already exists and creating
 * any intermediate directories if they don't already exist. Data can be a string
 * or a buffer.
 *
 * ```js
 * const fs = require('fs');
 * const write = require('write');
 * fs.createReadStream('README.md')
 *   .pipe(write.stream('a/b/c/other-file.md'))
 *   .on('close', () => {
 *     // do stuff
 *   });
 * ```
 * @name .stream
 * @param {String} `filepath` file path.
 * @param {Object} `options` Options to pass to [fs.createWriteStream][wsoptions]
 * @return {Stream} Returns a new [WriteStream][writestream] object. (See [Writable Stream][writable]).
 * @api public
 */

write.stream = (filepath, options) => {
  if (typeof filepath !== 'string') {
    throw new TypeError('expected filepath to be a string');
  }

  const opts = { encoding: 'utf8', ...options };
  const destpath = opts.increment ? incrementName(filepath, options) : filepath;

  if (opts.overwrite === false && exists(filepath, destpath)) {
    throw new Error('File already exists: ' + filepath);
  }

  mkdirSync(path.dirname(destpath), { recursive: true, ...options });
  return fs.createWriteStream(destpath, opts);
};

/**
 * Increment the filename if the file already exists and enabled by the user
 */

const incrementName = (destpath, options = {}) => {
  if (options.increment === true) options.increment = void 0;
  return increment(destpath, options);
};

/**
 * Ensure newline at EOF if defined on options
 */

const ensureNewline = (data, options) => {
  if (!options || options.newline !== true) return data;
  if (typeof data !== 'string' && !isBuffer(data)) {
    return data;
  }

  // Only call `.toString()` on the last character. This way,
  // if data is a buffer, we don't need to stringify the entire
  // buffer just to append a newline.
  if (String(data.slice(-1)) !== '\n') {
    if (typeof data === 'string') {
      return data + '\n';
    }
    return data.concat(Buffer.from('\n'));
  }

  return data;
};

// if filepath !== destpath, that means the user has enabled
// "increment", which has already checked the file system and
// renamed the file to avoid conflicts, so we don't need to
// check again.
const exists = (filepath, destpath) => {
  return filepath === destpath && fs.existsSync(filepath);
};

const mkdir = (dirname, options) => {
  return new Promise(resolve => fs.mkdir(dirname, options, () => resolve()));
};

const mkdirSync = (dirname, options) => {
  try {
    fs.mkdirSync(dirname, options);
  } catch (err) { /* do nothing */ }
};

const isBuffer = data => {
  if (data.constructor && typeof data.constructor.isBuffer === 'function') {
    return data.constructor.isBuffer(data);
  }
  return false;
};

/**
 * Expose `write`
 */

module.exports = write;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const fs = __webpack_require__(3);
const path = __webpack_require__(4);
const strip = __webpack_require__(6);
const ordinals = ['th', 'st', 'nd', 'rd'];

const ordinal = n => {
  if (isNaN(n)) {
    throw new TypeError('expected a number');
  }
  return ordinals[((n % 100) - 20) % 10] || ordinals[n % 100] || ordinals[0];
};

const toOrdinal = number => {
  return `${Number(number)}${ordinal(Math.abs(number))}`;
};

const format = {
  darwin(stem, n) {
    if (n === 1) return `${stem} copy`;
    if (n > 1) return `${stem} copy ${n}`;
    return stem;
  },
  default: (stem, n) => n > 1 ? `${stem} (${n})` : stem,
  win32: (stem, n) => n > 1 ? `${stem} (${n})` : stem,
  windows: (stem, n) => format.win32(stem, n),
  linux(stem, n) {
    if (n === 0) return stem;
    if (n === 1) return `${stem} (copy)`;
    if (n === 2) return `${stem} (another copy)`;
    return `${stem} (${toOrdinal(n)} copy)`;
  }
};

/**
 * The main export is a function that adds a trailing increment to
 * the `stem` (basename without extension) of the given file path or object.
 * ```js
 * console.log(increment('foo/bar.txt', { platform: 'darwin' }));
 * //=> foo/bar copy.txt
 * console.log(increment('foo/bar.txt', { platform: 'linux' }));
 * //=> foo/bar (copy).txt
 * console.log(increment('foo/bar.txt', { platform: 'win32' }));
 * //=> foo/bar (2).txt
 * ```
 * @name increment
 * @param {String|Object} `file` If the file is an object, it must have a `path` property.
 * @param {Object} `options` See [available options](#options).
 * @return {String|Object} Returns a file of the same type that was given, with an increment added to the file name.
 * @api public
 */

const increment = (...args) => {
  return typeof args[0] === 'string' ? increment.path(...args) : increment.file(...args);
};

/**
 * Add a trailing increment to the given `filepath`.
 *
 * ```js
 * console.log(increment.path('foo/bar.txt', { platform: 'darwin' }));
 * //=> foo/bar copy.txt
 * console.log(increment.path('foo/bar.txt', { platform: 'linux' }));
 * //=> foo/bar (copy).txt
 * console.log(increment.path('foo/bar.txt', { platform: 'win32' }));
 * //=> foo/bar (2).txt
 * ```
 * @name .path
 * @param {String} `filepath`
 * @param {Object} `options` See [available options](#options).
 * @return {String}
 * @api public
 */

increment.path = (filepath, options = {}) => {
  return path.format(increment.file(path.parse(filepath), options));
};

/**
 * Add a trailing increment to the `file.base` of the given file object.
 *
 * ```js
 * console.log(increment.file({ path: 'foo/bar.txt' }, { platform: 'darwin' }));
 * //=> { path: 'foo/bar copy.txt', base: 'bar copy.txt' }
 * console.log(increment.file({ path: 'foo/bar.txt' }, { platform: 'linux' }));
 * //=> { path: 'foo/bar (copy).txt', base: 'bar (copy).txt' }
 * console.log(increment.file({ path: 'foo/bar.txt' }, { platform: 'win32' }));
 * //=> { path: 'foo/bar (2).txt', base: 'bar (2).txt' }
 * ```
 * @name .file
 * @param {String|Object} `file` If passed as a string, the path will be parsed to create an object using `path.parse()`.
 * @param {Object} `options` See [available options](#options).
 * @return {Object} Returns an object.
 * @api public
 */

increment.file = (file, options = {}) => {
  if (typeof file === 'string') {
    let temp = file;
    file = path.parse(file);
    file.path = temp;
  }

  file = { ...file };

  if (file.path && Object.keys(file).length === 1) {
    let temp = file.path;
    file = path.parse(file.path);
    file.path = temp;
  }

  if (file.dirname && !file.dir) file.dir = file.dirname;
  if (file.basename && !file.base) file.base = file.basename;
  if (file.extname && !file.ext) file.ext = file.extname;
  if (file.stem && !file.name) file.name = file.stem;

  let { start = 1, platform = process.platform } = options;
  let fn = options.increment || format[platform] || format.default;

  if (start === 1 && (platform === 'win32' || platform === 'windows')) {
    if (!options.increment) {
      start++;
    }
  }

  if (options.strip === true) {
    file.name = strip.increment(file.name, options);
    file.dir = strip.increment(file.dir, options);
    file.base = file.name + file.ext;
  }

  if (options.fs === true) {
    let name = file.name;
    let dest = path.format(file);

    while (fs.existsSync(dest)) {
      file.base = fn(name, start++) + file.ext;
      dest = path.format(file);
    }
  } else {
    file.base = fn(file.name, start) + file.ext;
  }

  file.path = path.join(file.dir, file.base);
  return file;
};

/**
 * Returns an ordinal-suffix for the given number. This is used
 * when creating increments for files on Linux.
 *
 * ```js
 * const { ordinal } = require('add-filename-increment');
 * console.log(ordinal(1)); //=> 'st'
 * console.log(ordinal(2)); //=> 'nd'
 * console.log(ordinal(3)); //=> 'rd'
 * console.log(ordinal(110)); //=> 'th'
 * ```
 * @name .ordinal
 * @param {Number} `num`
 * @return {String}
 * @api public
 */

increment.ordinal = ordinal;

/**
 * Returns an ordinal for the given number.
 *
 * ```js
 * const { toOrdinal } = require('add-filename-increment');
 * console.log(toOrdinal(1)); //=> '1st'
 * console.log(toOrdinal(2)); //=> '2nd'
 * console.log(toOrdinal(3)); //=> '3rd'
 * console.log(toOrdinal(110)); //=> '110th'
 * ```
 * @name .toOrdinal
 * @param {Number} `num`
 * @return {String}
 * @api public
 */

increment.toOrdinal = toOrdinal;
module.exports = increment;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * file-name <https://github.com/jonschlinkert/file-name>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */



const path = __webpack_require__(4);
const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

const constants = {
  REGEX_DARWIN: /( copy( [0-9]+)?)+$/i,
  REGEX_DEFAULT: /(( copy)?( \([0-9]+\)|[0-9]+)?)+$/i,
  REGEX_WIN32: /( \([0-9]+\))+$/i,
  REGEX_NON_STANDARD: /( \.\(incomplete\)| \([0-9]+\)|[- ]+)+$/i,
  REGEX_LINUX: /( \(((another|[0-9]+(th|st|nd|rd)) )?copy\))+$/i,
  REGEX_RAW_NUMBERS: '| [0-9]+',
  REGEX_SOURCE: ' \\((?:(another|[0-9]+(th|st|nd|rd)) )?copy\\)|copy( [0-9]+)?|\\.\\(incomplete\\)| \\([0-9]+\\)|[- ]+'
};

/**
 * Remove trailing increments from the `dirname` and/or `stem` (basename
 * without extension) of the given file path or object.
 *
 * @name strip
 * @param {Sring|Object} `file` If the file is an object, it must have a `path` property.
 * @param {Object} `options` See [available options](#options).
 * @return {String|Object} Returns the same type that was given.
 * @api public
 */

const strip = (file, options) => {
  if (!file) return file;
  if (isObject(file) && file.path) {
    return strip.file(file, options);
  }

  let filepath = strip.increment(file, options);
  let extname = path.extname(filepath);
  let dirname = strip.increment(path.dirname(filepath), options);
  let stem = strip.increment(path.basename(filepath, extname), options);
  return path.join(dirname, stem + extname);
};

/**
 * Removes trailing increments from the given string.
 *
 * ```js
 * console.log(strip.increment('foo (2)')); => 'foo'
 * console.log(strip.increment('foo (copy)')); => 'foo'
 * console.log(strip.increment('foo copy 2')); => 'foo'
 * ```
 * @name .increment
 * @param {String} `input`
 * @param {Object} `options` See [available options](#options).
 * @return {String}
 * @api public
 */

strip.increment = (input, options = {}) => {
  if (typeof input === 'string' && input !== '') {
    let suffix = options.removeRawNumbers === true ? constants.REGEX_RAW_NUMBERS : '';
    let source = constants.REGEX_SOURCE + suffix;
    return input.replace(new RegExp(`(${source})+$`, 'i'), '');
  }
  return input;
};

/**
 * Removes trailing increments and returns the `dirname` of the given `filepath`.
 *
 * ```js
 * console.log(strip.dirname('foo (2)/bar.txt')); => 'foo'
 * console.log(strip.dirname('foo (copy)/bar.txt')); => 'foo'
 * console.log(strip.dirname('foo copy 2/bar.txt')); => 'foo'
 * ```
 * @name .dirname
 * @param {String} `filepath`
 * @param {Object} `options` See [available options](#options).
 * @return {String} Returns the `dirname` of the filepath, without increments.
 * @api public
 */

strip.dirname = (filepath, options) => {
  return strip.increment(path.dirname(filepath), options);
};

/**
 * Removes trailing increments and returns the `stem` of the given `filepath`.
 *
 * ```js
 * console.log(strip.stem('foo/bar (2).txt')); //=> 'bar'
 * console.log(strip.stem('foo/bar (copy).txt')); //=> 'bar'
 * console.log(strip.stem('foo/bar copy 2.txt')); //=> 'bar'
 * console.log(strip.stem('foo/bar (2) copy.txt')); //=> 'bar'
 * console.log(strip.stem('foo/bar (2) - copy.txt')); //=> 'bar'
 * ```
 * @name .stem
 * @param {String} `filepath`
 * @param {Object} `options` See [available options](#options).
 * @return {String} Returns the `stem` of the filepath, without increments.
 * @api public
 */

strip.stem = (filepath, options) => {
  return strip.increment(path.basename(filepath, path.extname(filepath)), options);
};

/**
 * Removes trailing increments and returns the `basename` of the given `filepath`.
 *
 * ```js
 * console.log(strip.basename('foo/bar (2).txt')); //=> 'bar.txt'
 * console.log(strip.basename('foo/bar (copy).txt')); //=> 'bar.txt'
 * console.log(strip.basename('foo/bar copy 2.txt')); //=> 'bar.txt'
 * console.log(strip.basename('foo/bar (2) copy.txt')); //=> 'bar.txt'
 * console.log(strip.basename('foo/bar (2) - copy.txt')); //=> 'bar.txt'
 * ```
 * @name .basename
 * @param {String} `filepath`
 * @param {Object} `options` See [available options](#options).
 * @return {String} Returns the `basename` of the filepath, without increments.
 * @api public
 */

strip.basename = (filepath, options) => {
  let extname = path.extname(filepath);
  let stem = path.basename(filepath, extname);
  return strip.increment(stem, options) + extname;
};

/**
 * Removes trailing increments from the `dirname` and `stem` of the given `filepath`.
 *
 * ```js
 * console.log(strip.path('foo copy/bar (2).txt')); //=> 'foo/bar.txt'
 * console.log(strip.path('foo (2)/bar (copy).txt')); //=> 'foo/bar.txt'
 * console.log(strip.path('foo (2)/bar copy 2.txt')); //=> 'foo/bar.txt'
 * console.log(strip.path('foo copy/bar (2) copy.txt')); //=> 'foo/bar.txt'
 * console.log(strip.path('foo copy/bar (2) - copy.txt')); //=> 'foo/bar.txt'
 * ```
 * @name .path
 * @param {String} `filepath`
 * @param {Object} `options` See [available options](#options).
 * @return {String} Returns the `basename` of the filepath, without increments.
 * @api public
 */

strip.path = (filepath, options) => {
  let extname = path.extname(filepath);
  let stem = strip.increment(path.basename(filepath, extname), options);
  let dirname = strip.increment(path.dirname(filepath), options);
  return path.join(dirname, stem + extname);
};

/**
 * Removes trailing increments from the `dirname` and `stem` properties
 * of the given `file`.
 *
 * ```js
 * console.log(strip({ path: 'foo copy/bar (2).txt' }));
 * //=> { path: 'foo/bar.txt', dir: 'foo', base: 'bar.txt', name: 'bar', ext: '.txt' }
 * console.log(strip({ path: 'foo (2)/bar (copy).txt' }));
 * //=> { path: 'foo/bar.txt', dir: 'foo', base: 'bar.txt', name: 'bar', ext: '.txt' }
 * console.log(strip({ path: 'foo (2)/bar copy 2.txt' }));
 * //=> { path: 'foo/bar.txt', dir: 'foo', base: 'bar.txt', name: 'bar', ext: '.txt' }
 * console.log(strip({ path: 'foo copy/bar (2) copy.txt' }));
 * //=> { path: 'foo/bar.txt', dir: 'foo', base: 'bar.txt', name: 'bar', ext: '.txt' }
 * console.log(strip({ path: 'foo copy/bar (2) - copy.txt' }));
 * //=> { path: 'foo/bar.txt', dir: 'foo', base: 'bar.txt', name: 'bar', ext: '.txt' }
 * ```
 * @name .file
 * @param {String} `filepath`
 * @param {Object} `options` See [available options](#options).
 * @return {String} Returns the `basename` of the filepath, without increments.
 * @api public
 */

strip.file = (file, options = {}) => {
  if (!isObject(file)) return file;
  if (!file.path) return file;

  if (file.dirname && !file.dir) file.dir = file.dirname;
  if (file.basename && !file.base) file.base = file.basename;
  if (file.extname && !file.ext) file.ext = file.extname;
  if (file.stem && !file.name) file.name = file.stem;

  if (file.dir === void 0) file.dir = path.dirname(file.path);
  if (file.ext === void 0) file.ext = path.extname(file.path);
  if (file.base === void 0) file.base = path.basename(file.path);
  if (file.name === void 0) file.name = path.basename(file.path, file.ext);

  file.name = strip.increment(file.name, options);
  file.dir = strip.increment(file.dir, options);
  file.base = file.name + file.ext;

  file.path = path.join(file.dir, file.base);
  return file;
};

module.exports = strip;


/***/ })
/******/ ]);
