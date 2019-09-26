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


exports.__esModule = true;
exports.MESSAGES = undefined;

var _stringify = __webpack_require__(3);

var _stringify2 = _interopRequireDefault(_stringify);

exports.get = get;
exports.parseArgs = parseArgs;

var _util = __webpack_require__(6);

var util = _interopRequireWildcard(_util);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MESSAGES = exports.MESSAGES = {
  tailCallReassignmentDeopt: "Function reference has been reassigned, so it will probably be dereferenced, therefore we can't optimise this with confidence",
  classesIllegalBareSuper: "Illegal use of bare super",
  classesIllegalSuperCall: "Direct super call is illegal in non-constructor, use super.$1() instead",
  scopeDuplicateDeclaration: "Duplicate declaration $1",
  settersNoRest: "Setters aren't allowed to have a rest",
  noAssignmentsInForHead: "No assignments allowed in for-in/of head",
  expectedMemberExpressionOrIdentifier: "Expected type MemberExpression or Identifier",
  invalidParentForThisNode: "We don't know how to handle this node within the current parent - please open an issue",
  readOnly: "$1 is read-only",
  unknownForHead: "Unknown node type $1 in ForStatement",
  didYouMean: "Did you mean $1?",
  codeGeneratorDeopt: "Note: The code generator has deoptimised the styling of $1 as it exceeds the max of $2.",
  missingTemplatesDirectory: "no templates directory - this is most likely the result of a broken `npm publish`. Please report to https://github.com/babel/babel/issues",
  unsupportedOutputType: "Unsupported output type $1",
  illegalMethodName: "Illegal method name $1",
  lostTrackNodePath: "We lost track of this node's position, likely because the AST was directly manipulated",

  modulesIllegalExportName: "Illegal export $1",
  modulesDuplicateDeclarations: "Duplicate module declarations with the same source but in different scopes",

  undeclaredVariable: "Reference to undeclared variable $1",
  undeclaredVariableType: "Referencing a type alias outside of a type annotation",
  undeclaredVariableSuggestion: "Reference to undeclared variable $1 - did you mean $2?",

  traverseNeedsParent: "You must pass a scope and parentPath unless traversing a Program/File. Instead of that you tried to traverse a $1 node without passing scope and parentPath.",
  traverseVerifyRootFunction: "You passed `traverse()` a function when it expected a visitor object, are you sure you didn't mean `{ enter: Function }`?",
  traverseVerifyVisitorProperty: "You passed `traverse()` a visitor object with the property $1 that has the invalid property $2",
  traverseVerifyNodeType: "You gave us a visitor for the node type $1 but it's not a valid type",

  pluginNotObject: "Plugin $2 specified in $1 was expected to return an object when invoked but returned $3",
  pluginNotFunction: "Plugin $2 specified in $1 was expected to return a function but returned $3",
  pluginUnknown: "Unknown plugin $1 specified in $2 at $3, attempted to resolve relative to $4",
  pluginInvalidProperty: "Plugin $2 specified in $1 provided an invalid property of $3"
};

function get(key) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var msg = MESSAGES[key];
  if (!msg) throw new ReferenceError("Unknown message " + (0, _stringify2.default)(key));

  args = parseArgs(args);

  return msg.replace(/\$(\d+)/g, function (str, i) {
    return args[i - 1];
  });
}

function parseArgs(args) {
  return args.map(function (val) {
    if (val != null && val.inspect) {
      return val.inspect();
    } else {
      try {
        return (0, _stringify2.default)(val) || val + "";
      } catch (e) {
        return util.inspect(val);
      }
    }
  });
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(5);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.9' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })
/******/ ]);
