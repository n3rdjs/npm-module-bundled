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


/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Only used for types
// eslint-disable-next-line
// eslint-disable-next-line
const invariant = (condition, message) => {
  if (!condition) {
    throw new Error('babel-plugin-jest-hoist: ' + message);
  }
}; // We allow `jest`, `expect`, `require`, all default Node.js globals and all
// ES2015 built-ins to be used inside of a `jest.mock` factory.
// We also allow variables prefixed with `mock` as an escape-hatch.

const WHITELISTED_IDENTIFIERS = new Set([
  'Array',
  'ArrayBuffer',
  'Boolean',
  'DataView',
  'Date',
  'Error',
  'EvalError',
  'Float32Array',
  'Float64Array',
  'Function',
  'Generator',
  'GeneratorFunction',
  'Infinity',
  'Int16Array',
  'Int32Array',
  'Int8Array',
  'InternalError',
  'Intl',
  'JSON',
  'Map',
  'Math',
  'NaN',
  'Number',
  'Object',
  'Promise',
  'Proxy',
  'RangeError',
  'ReferenceError',
  'Reflect',
  'RegExp',
  'Set',
  'String',
  'Symbol',
  'SyntaxError',
  'TypeError',
  'URIError',
  'Uint16Array',
  'Uint32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'WeakMap',
  'WeakSet',
  'arguments',
  'console',
  'expect',
  'isNaN',
  'jest',
  'parseFloat',
  'parseInt',
  'require',
  'undefined'
]);
Object.getOwnPropertyNames(global).forEach(name => {
  WHITELISTED_IDENTIFIERS.add(name);
});
const JEST_GLOBAL = {
  name: 'jest'
}; // TODO: Should be Visitor<{ids: Set<NodePath<Identifier>>}>, but `ReferencedIdentifier` doesn't exist

const IDVisitor = {
  ReferencedIdentifier(path) {
    // @ts-ignore: passed as Visitor State
    this.ids.add(path);
  },

  blacklist: ['TypeAnnotation', 'TSTypeAnnotation', 'TSTypeReference']
};
const FUNCTIONS = Object.create(null);

FUNCTIONS.mock = args => {
  if (args.length === 1) {
    return args[0].isStringLiteral() || args[0].isLiteral();
  } else if (args.length === 2 || args.length === 3) {
    const moduleFactory = args[1];
    invariant(
      moduleFactory.isFunction(),
      'The second argument of `jest.mock` must be an inline function.'
    );
    const ids = new Set();
    const parentScope = moduleFactory.parentPath.scope; // @ts-ignore: Same as above: ReferencedIdentifier doesn't exist

    moduleFactory.traverse(IDVisitor, {
      ids
    });
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
        var _iterator = ids[Symbol.iterator](), _step;
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        _iteratorNormalCompletion = true
      ) {
        const id = _step.value;
        const name = id.node.name;
        let found = false;
        let scope = id.scope;

        while (scope !== parentScope) {
          if (scope.bindings[name]) {
            found = true;
            break;
          }

          scope = scope.parent;
        }

        if (!found) {
          invariant(
            (scope.hasGlobal(name) && WHITELISTED_IDENTIFIERS.has(name)) ||
            /^mock/i.test(name) || // Allow istanbul's coverage variable to pass.
              /^(?:__)?cov/.test(name),
            'The module factory of `jest.mock()` is not allowed to ' +
              'reference any out-of-scope variables.\n' +
              'Invalid variable access: ' +
              name +
              '\n' +
              'Whitelisted objects: ' +
              Array.from(WHITELISTED_IDENTIFIERS).join(', ') +
              '.\n' +
              'Note: This is a precaution to guard against uninitialized mock ' +
              'variables. If it is ensured that the mock is required lazily, ' +
              'variable names prefixed with `mock` (case insensitive) are permitted.'
          );
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return true;
  }

  return false;
};

FUNCTIONS.unmock = args => args.length === 1 && args[0].isStringLiteral();

FUNCTIONS.deepUnmock = args => args.length === 1 && args[0].isStringLiteral();

FUNCTIONS.disableAutomock = FUNCTIONS.enableAutomock = args =>
  args.length === 0;

module.exports = () => {
  const shouldHoistExpression = expr => {
    if (!expr.isCallExpression()) {
      return false;
    }

    const callee = expr.get('callee');
    const expressionArguments = expr.get('arguments'); // TODO: avoid type casts - the types can be arrays (is it possible to ignore that without casting?)

    const object = callee.get('object');
    const property = callee.get('property');
    return (
      property.isIdentifier() &&
      FUNCTIONS[property.node.name] &&
      (object.isIdentifier(JEST_GLOBAL) ||
        (callee.isMemberExpression() && shouldHoistExpression(object))) &&
      FUNCTIONS[property.node.name](expressionArguments)
    );
  };

  const visitor = {
    ExpressionStatement(path) {
      if (shouldHoistExpression(path.get('expression'))) {
        // @ts-ignore: private, magical property
        path.node._blockHoist = Infinity;
      }
    }
  };
  return {
    visitor
  };
};


/***/ })
/******/ ]);
