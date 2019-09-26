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
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */


const KEYS = __webpack_require__(3);

// Types.
const NODE_TYPES = Object.freeze(Object.keys(KEYS));

// Freeze the keys.
for (const type of NODE_TYPES) {
    Object.freeze(KEYS[type]);
}
Object.freeze(KEYS);

// List to ignore keys.
const KEY_BLACKLIST = new Set([
    "parent",
    "leadingComments",
    "trailingComments"
]);

/**
 * Check whether a given key should be used or not.
 * @param {string} key The key to check.
 * @returns {boolean} `true` if the key should be used.
 */
function filterKey(key) {
    return !KEY_BLACKLIST.has(key) && key[0] !== "_";
}

//------------------------------------------------------------------------------
// Public interfaces
//------------------------------------------------------------------------------

module.exports = Object.freeze({

    /**
     * Visitor keys.
     * @type {{ [type: string]: string[] | undefined }}
     */
    KEYS,

    /**
     * Get visitor keys of a given node.
     * @param {Object} node The AST node to get keys.
     * @returns {string[]} Visitor keys of the node.
     */
    getKeys(node) {
        return Object.keys(node).filter(filterKey);
    },

    // Disable valid-jsdoc rule because it reports syntax error on the type of @returns.
    // eslint-disable-next-line valid-jsdoc
    /**
     * Make the union set with `KEYS` and given keys.
     * @param {Object} additionalKeys The additional keys.
     * @returns {{ [type: string]: string[] | undefined }} The union set.
     */
    unionWith(additionalKeys) {
        const retv = Object.assign({}, KEYS);

        for (const type of Object.keys(additionalKeys)) {
            if (retv.hasOwnProperty(type)) {
                const keys = new Set(additionalKeys[type]);

                for (const key of retv[type]) {
                    keys.add(key);
                }

                retv[type] = Object.freeze(Array.from(keys));
            } else {
                retv[type] = Object.freeze(Array.from(additionalKeys[type]));
            }
        }

        return Object.freeze(retv);
    }
});


/***/ }),
/* 3 */
/***/ (function(module) {

module.exports = JSON.parse("{\"AssignmentExpression\":[\"left\",\"right\"],\"AssignmentPattern\":[\"left\",\"right\"],\"ArrayExpression\":[\"elements\"],\"ArrayPattern\":[\"elements\"],\"ArrowFunctionExpression\":[\"params\",\"body\"],\"AwaitExpression\":[\"argument\"],\"BlockStatement\":[\"body\"],\"BinaryExpression\":[\"left\",\"right\"],\"BreakStatement\":[\"label\"],\"CallExpression\":[\"callee\",\"arguments\"],\"CatchClause\":[\"param\",\"body\"],\"ClassBody\":[\"body\"],\"ClassDeclaration\":[\"id\",\"superClass\",\"body\"],\"ClassExpression\":[\"id\",\"superClass\",\"body\"],\"ConditionalExpression\":[\"test\",\"consequent\",\"alternate\"],\"ContinueStatement\":[\"label\"],\"DebuggerStatement\":[],\"DoWhileStatement\":[\"body\",\"test\"],\"EmptyStatement\":[],\"ExportAllDeclaration\":[\"source\"],\"ExportDefaultDeclaration\":[\"declaration\"],\"ExportNamedDeclaration\":[\"declaration\",\"specifiers\",\"source\"],\"ExportSpecifier\":[\"exported\",\"local\"],\"ExpressionStatement\":[\"expression\"],\"ExperimentalRestProperty\":[\"argument\"],\"ExperimentalSpreadProperty\":[\"argument\"],\"ForStatement\":[\"init\",\"test\",\"update\",\"body\"],\"ForInStatement\":[\"left\",\"right\",\"body\"],\"ForOfStatement\":[\"left\",\"right\",\"body\"],\"FunctionDeclaration\":[\"id\",\"params\",\"body\"],\"FunctionExpression\":[\"id\",\"params\",\"body\"],\"Identifier\":[],\"IfStatement\":[\"test\",\"consequent\",\"alternate\"],\"ImportDeclaration\":[\"specifiers\",\"source\"],\"ImportDefaultSpecifier\":[\"local\"],\"ImportExpression\":[\"source\"],\"ImportNamespaceSpecifier\":[\"local\"],\"ImportSpecifier\":[\"imported\",\"local\"],\"JSXAttribute\":[\"name\",\"value\"],\"JSXClosingElement\":[\"name\"],\"JSXElement\":[\"openingElement\",\"children\",\"closingElement\"],\"JSXEmptyExpression\":[],\"JSXExpressionContainer\":[\"expression\"],\"JSXIdentifier\":[],\"JSXMemberExpression\":[\"object\",\"property\"],\"JSXNamespacedName\":[\"namespace\",\"name\"],\"JSXOpeningElement\":[\"name\",\"attributes\"],\"JSXSpreadAttribute\":[\"argument\"],\"JSXText\":[],\"JSXFragment\":[\"openingFragment\",\"children\",\"closingFragment\"],\"Literal\":[],\"LabeledStatement\":[\"label\",\"body\"],\"LogicalExpression\":[\"left\",\"right\"],\"MemberExpression\":[\"object\",\"property\"],\"MetaProperty\":[\"meta\",\"property\"],\"MethodDefinition\":[\"key\",\"value\"],\"NewExpression\":[\"callee\",\"arguments\"],\"ObjectExpression\":[\"properties\"],\"ObjectPattern\":[\"properties\"],\"Program\":[\"body\"],\"Property\":[\"key\",\"value\"],\"RestElement\":[\"argument\"],\"ReturnStatement\":[\"argument\"],\"SequenceExpression\":[\"expressions\"],\"SpreadElement\":[\"argument\"],\"Super\":[],\"SwitchStatement\":[\"discriminant\",\"cases\"],\"SwitchCase\":[\"test\",\"consequent\"],\"TaggedTemplateExpression\":[\"tag\",\"quasi\"],\"TemplateElement\":[],\"TemplateLiteral\":[\"quasis\",\"expressions\"],\"ThisExpression\":[],\"ThrowStatement\":[\"argument\"],\"TryStatement\":[\"block\",\"handler\",\"finalizer\"],\"UnaryExpression\":[\"argument\"],\"UpdateExpression\":[\"argument\"],\"VariableDeclaration\":[\"declarations\"],\"VariableDeclarator\":[\"id\",\"init\"],\"WhileStatement\":[\"test\",\"body\"],\"WithStatement\":[\"object\",\"body\"],\"YieldExpression\":[\"argument\"]}");

/***/ })
/******/ ]);
