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
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const path = __webpack_require__(4);
const vm = __webpack_require__(5);
const appendTransform = __webpack_require__(6);
const originalCreateScript = vm.createScript;
const originalRunInThisContext = vm.runInThisContext;
const originalRunInContext = vm.runInContext;

function transformFn(matcher, transformer, verbose) {
    return function(code, options) {
        options = options || {};

        // prior to 2.x, hookRequire returned filename
        // rather than object.
        if (typeof options === 'string') {
            options = { filename: options };
        }

        const shouldHook =
            typeof options.filename === 'string' &&
            matcher(path.resolve(options.filename));
        let transformed;
        let changed = false;

        if (shouldHook) {
            if (verbose) {
                console.error(
                    'Module load hook: transform [' + options.filename + ']'
                );
            }
            try {
                transformed = transformer(code, options);
                changed = true;
            } catch (ex) {
                console.error(
                    'Transformation error for',
                    options.filename,
                    '; return original code'
                );
                console.error(ex.message || String(ex));
                if (verbose) {
                    console.error(ex.stack);
                }
                transformed = code;
            }
        } else {
            transformed = code;
        }
        return { code: transformed, changed };
    };
}
/**
 * unloads the required caches, removing all files that would have matched
 * the supplied matcher.
 * @param {Function} matcher - the match function that accepts a file name and
 *  returns if that file should be unloaded from the cache.
 */
function unloadRequireCache(matcher) {
    /* istanbul ignore else: impossible to test */
    if (matcher && "function" !== 'undefined' && __webpack_require__(10) && __webpack_require__.c) {
        Object.keys(__webpack_require__.c).forEach(filename => {
            if (matcher(filename)) {
                delete __webpack_require__.c[filename];
            }
        });
    }
}
/**
 * hooks `require` to return transformed code to the node module loader.
 * Exceptions in the transform result in the original code being used instead.
 * @method hookRequire
 * @static
 * @param matcher {Function(filePath)} a function that is called with the absolute path to the file being
 *  `require`-d. Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the associated path of the file
 *  from where the code was loaded. Should return the transformed code.
 * @param options {Object} options Optional.
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 * @param {Function} [options.postLoadHook] a function that is called with the name of the file being
 *  required. This is called after the require is processed irrespective of whether it was transformed.
 * @returns {Function} a reset function that can be called to remove the hook
 */
function hookRequire(matcher, transformer, options) {
    options = options || {};
    let disable = false;
    const fn = transformFn(matcher, transformer, options.verbose);
    const postLoadHook =
        options.postLoadHook && typeof options.postLoadHook === 'function'
            ? options.postLoadHook
            : null;

    const extensions = options.extensions || ['.js'];

    extensions.forEach(ext => {
        appendTransform((code, filename) => {
            if (disable) {
                return code;
            }
            const ret = fn(code, filename);
            if (postLoadHook) {
                postLoadHook(filename);
            }
            return ret.code;
        }, ext);
    });

    return function() {
        disable = true;
    };
}
/**
 * hooks `vm.createScript` to return transformed code out of which a `Script` object will be created.
 * Exceptions in the transform result in the original code being used instead.
 * @method hookCreateScript
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.createScript`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the filename passed to
 *  `vm.createScript`. Should return the transformed code.
 * @param options {Object} options Optional.
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 */
function hookCreateScript(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.createScript = function(code, file) {
        const ret = fn(code, file);
        return originalCreateScript(ret.code, file);
    };
}
/**
 * unhooks vm.createScript, restoring it to its original state.
 * @method unhookCreateScript
 * @static
 */
function unhookCreateScript() {
    vm.createScript = originalCreateScript;
}
/**
 * hooks `vm.runInThisContext` to return transformed code.
 * @method hookRunInThisContext
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.runInThisContext`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, options)} a function called with the original code and the filename passed to
 *  `vm.runInThisContext`. Should return the transformed code.
 * @param opts {Object} [opts={}] options
 * @param {Boolean} [opts.verbose] write a line to standard error every time the transformer is called
 */
function hookRunInThisContext(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.runInThisContext = function(code, options) {
        const ret = fn(code, options);
        return originalRunInThisContext(ret.code, options);
    };
}
/**
 * unhooks vm.runInThisContext, restoring it to its original state.
 * @method unhookRunInThisContext
 * @static
 */
function unhookRunInThisContext() {
    vm.runInThisContext = originalRunInThisContext;
}
/**
 * hooks `vm.runInContext` to return transformed code.
 * @method hookRunInContext
 * @static
 * @param matcher {Function(filePath)} a function that is called with the filename passed to `vm.createScript`
 *  Should return a truthy value when transformations need to be applied to the code, a falsy value otherwise
 * @param transformer {Function(code, filePath)} a function called with the original code and the filename passed to
 *  `vm.createScript`. Should return the transformed code.
 * @param opts {Object} [opts={}] options
 * @param {Boolean} [options.verbose] write a line to standard error every time the transformer is called
 */
function hookRunInContext(matcher, transformer, opts) {
    opts = opts || {};
    const fn = transformFn(matcher, transformer, opts.verbose);
    vm.runInContext = function(code, context, file) {
        const ret = fn(code, file);
        const coverageVariable = opts.coverageVariable || '__coverage__';
        // Refer coverage variable in context to global coverage variable.
        // So that coverage data will be written in global coverage variable for unit tests run in vm.runInContext.
        // If all unit tests are run in vm.runInContext, no global coverage variable will be generated.
        // Thus initialize a global coverage variable here.
        if (!global[coverageVariable]) {
            global[coverageVariable] = {};
        }
        context[coverageVariable] = global[coverageVariable];
        return originalRunInContext(ret.code, context, file);
    };
}
/**
 * unhooks vm.runInContext, restoring it to its original state.
 * @method unhookRunInContext
 * @static
 */
function unhookRunInContext() {
    vm.runInContext = originalRunInContext;
}
/**
 * istanbul-lib-hook provides mechanisms to transform code in the scope of `require`,
 * `vm.createScript`, `vm.runInThisContext` etc.
 *
 * This mechanism is general and relies on a user-supplied `matcher` function that
 * determines when transformations should be performed and a user-supplied `transformer`
 * function that performs the actual transform. Instrumenting code for coverage is
 * one specific example of useful hooking.
 *
 * Note that both the `matcher` and `transformer` must execute synchronously.
 *
 * @module Exports
 * @example
 * var hook = require('istanbul-lib-hook'),
 *     myMatcher = function (file) { return file.match(/foo/); },
 *     myTransformer = function (code, file) {
 *         return 'console.log("' + file + '");' + code;
 *     };
 *
 * hook.hookRequire(myMatcher, myTransformer);
 * var foo = require('foo'); //will now print foo's module path to console
 */
module.exports = {
    hookRequire,
    hookCreateScript,
    unhookCreateScript,
    hookRunInThisContext,
    unhookRunInThisContext,
    hookRunInContext,
    unhookRunInContext,
    unloadRequireCache
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("vm");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {
const js = __webpack_require__(7);

module.exports = appendTransform;

let count = 0;

function appendTransform(transform, ext, extensions) {
	// Generate a unique key for this transform
	var key = __dirname + count; // eslint-disable-line
	count++;
	ext = ext || '.js';
	extensions = extensions || (void 0);

	let forwardGet;
	let forwardSet;

	const descriptor = Object.getOwnPropertyDescriptor(extensions, ext) || {value: js, configurable: true};

	if (
		((descriptor.get || descriptor.set) && !(descriptor.get && descriptor.set)) ||
		!descriptor.configurable
	) {
		throw new Error('Somebody did bad things to require.extensions["' + ext + '"]');
	}

	if (descriptor.get) {
		// Wrap a previous append-transform install and pass through to the getter/setter pair it created
		forwardGet = function () {
			return descriptor.get();
		};
		forwardSet = function (val) {
			descriptor.set(val);
			return forwardGet();
		};
	} else {
		forwardGet = function () {
			return descriptor.value;
		};
		forwardSet = function (val) {
			descriptor.value = val;
			return val;
		};
	}

	function wrapCustomHook(hook) {
		return function (module, filename) {
			// We wrap every added extension, but we only apply the transform to the one on top of the stack
			if (!module[key]) {
				module[key] = true;

				const originalCompile = module._compile;

				// eslint-disable-next-line func-name-matching func-names
				module._compile = function replacementCompile(code, filename) {
					module._compile = originalCompile;
					code = transform(code, filename);
					module._compile(code, filename);
				};
			}

			hook(module, filename);
		};
	}

	// Wrap the original
	forwardSet(wrapCustomHook(forwardGet()));

	const hooks = [forwardGet()];

	function setCurrentHook(hook) {
		const restoreIndex = hooks.indexOf(hook);

		if (restoreIndex === -1) {
			hooks.push(forwardSet(wrapCustomHook(hook)));
		} else {
			// We have already scene this hook, and it is being reverted (proxyquire, etc) - don't wrap again.
			hooks.splice(restoreIndex + 1, hooks.length);
			forwardSet(hook);
		}
	}

	Object.defineProperty(extensions, ext, {
		configurable: true,
		enumerable: true,
		get: forwardGet,
		set: setCurrentHook
	});
}

/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const fs = __webpack_require__(8);
const stripBom = __webpack_require__(9);

module.exports = (module, filename) => {
	const content = fs.readFileSync(filename, 'utf8');
	module._compile(stripBom(content), filename);
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = x => {
	if (typeof x !== 'string') {
		throw new TypeError('Expected a string, got ' + typeof x);
	}

	// Catches EFBBBF (UTF-8 BOM) because the buffer-to-string
	// conversion translates it to FEFF (UTF-16 BOM)
	if (x.charCodeAt(0) === 0xFEFF) {
		return x.slice(1);
	}

	return x;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 10;

/***/ })
/******/ ]);
