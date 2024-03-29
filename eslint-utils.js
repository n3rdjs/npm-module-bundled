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
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CALL", function() { return CALL; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONSTRUCT", function() { return CONSTRUCT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESM", function() { return ESM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PatternMatcher", function() { return PatternMatcher; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "READ", function() { return READ; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReferenceTracker", function() { return ReferenceTracker; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findVariable", function() { return findVariable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFunctionHeadLocation", function() { return getFunctionHeadLocation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFunctionNameWithKind", function() { return getFunctionNameWithKind; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInnermostScope", function() { return getInnermostScope; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropertyName", function() { return getPropertyName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStaticValue", function() { return getStaticValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringIfConstant", function() { return getStringIfConstant; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasSideEffect", function() { return hasSideEffect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArrowToken", function() { return isArrowToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isClosingBraceToken", function() { return isClosingBraceToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isClosingBracketToken", function() { return isClosingBracketToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isClosingParenToken", function() { return isClosingParenToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isColonToken", function() { return isColonToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCommaToken", function() { return isCommaToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isCommentToken", function() { return isCommentToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotArrowToken", function() { return isNotArrowToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotClosingBraceToken", function() { return isNotClosingBraceToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotClosingBracketToken", function() { return isNotClosingBracketToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotClosingParenToken", function() { return isNotClosingParenToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotColonToken", function() { return isNotColonToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotCommaToken", function() { return isNotCommaToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotCommentToken", function() { return isNotCommentToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotOpeningBraceToken", function() { return isNotOpeningBraceToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotOpeningBracketToken", function() { return isNotOpeningBracketToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotOpeningParenToken", function() { return isNotOpeningParenToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNotSemicolonToken", function() { return isNotSemicolonToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOpeningBraceToken", function() { return isOpeningBraceToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOpeningBracketToken", function() { return isOpeningBracketToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isOpeningParenToken", function() { return isOpeningParenToken; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isParenthesized", function() { return isParenthesized; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSemicolonToken", function() { return isSemicolonToken; });
/* harmony import */ var eslint_visitor_keys__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/*! @author Toru Nagashima <https://github.com/mysticatea> */


/**
 * Get the innermost scope which contains a given location.
 * @param {Scope} initialScope The initial scope to search.
 * @param {Node} node The location to search.
 * @returns {Scope} The innermost scope.
 */
function getInnermostScope(initialScope, node) {
    const location = node.range[0];

    let scope = initialScope;
    let found = false;
    do {
        found = false;
        for (const childScope of scope.childScopes) {
            const range = childScope.block.range;

            if (range[0] <= location && location < range[1]) {
                scope = childScope;
                found = true;
                break
            }
        }
    } while (found)

    return scope
}

/**
 * Find the variable of a given name.
 * @param {Scope} initialScope The scope to start finding.
 * @param {string|Node} nameOrNode The variable name to find. If this is a Node object then it should be an Identifier node.
 * @returns {Variable|null} The found variable or null.
 */
function findVariable(initialScope, nameOrNode) {
    let name = "";
    let scope = initialScope;

    if (typeof nameOrNode === "string") {
        name = nameOrNode;
    } else {
        name = nameOrNode.name;
        scope = getInnermostScope(scope, nameOrNode);
    }

    while (scope != null) {
        const variable = scope.set.get(name);
        if (variable != null) {
            return variable
        }
        scope = scope.upper;
    }

    return null
}

/**
 * Negate the result of `this` calling.
 * @param {Token} token The token to check.
 * @returns {boolean} `true` if the result of `this(token)` is `false`.
 */
function negate0(token) {
    return !this(token) //eslint-disable-line no-invalid-this
}

/**
 * Creates the negate function of the given function.
 * @param {function(Token):boolean} f - The function to negate.
 * @returns {function(Token):boolean} Negated function.
 */
function negate(f) {
    return negate0.bind(f)
}

/**
 * Checks if the given token is an arrow token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an arrow token.
 */
function isArrowToken(token) {
    return token.value === "=>" && token.type === "Punctuator"
}

/**
 * Checks if the given token is a comma token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comma token.
 */
function isCommaToken(token) {
    return token.value === "," && token.type === "Punctuator"
}

/**
 * Checks if the given token is a semicolon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a semicolon token.
 */
function isSemicolonToken(token) {
    return token.value === ";" && token.type === "Punctuator"
}

/**
 * Checks if the given token is a colon token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a colon token.
 */
function isColonToken(token) {
    return token.value === ":" && token.type === "Punctuator"
}

/**
 * Checks if the given token is an opening parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening parenthesis token.
 */
function isOpeningParenToken(token) {
    return token.value === "(" && token.type === "Punctuator"
}

/**
 * Checks if the given token is a closing parenthesis token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing parenthesis token.
 */
function isClosingParenToken(token) {
    return token.value === ")" && token.type === "Punctuator"
}

/**
 * Checks if the given token is an opening square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening square bracket token.
 */
function isOpeningBracketToken(token) {
    return token.value === "[" && token.type === "Punctuator"
}

/**
 * Checks if the given token is a closing square bracket token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing square bracket token.
 */
function isClosingBracketToken(token) {
    return token.value === "]" && token.type === "Punctuator"
}

/**
 * Checks if the given token is an opening brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is an opening brace token.
 */
function isOpeningBraceToken(token) {
    return token.value === "{" && token.type === "Punctuator"
}

/**
 * Checks if the given token is a closing brace token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a closing brace token.
 */
function isClosingBraceToken(token) {
    return token.value === "}" && token.type === "Punctuator"
}

/**
 * Checks if the given token is a comment token or not.
 * @param {Token} token - The token to check.
 * @returns {boolean} `true` if the token is a comment token.
 */
function isCommentToken(token) {
    return (
        token.type === "Line" ||
        token.type === "Block" ||
        token.type === "Shebang"
    )
}

const isNotArrowToken = negate(isArrowToken);
const isNotCommaToken = negate(isCommaToken);
const isNotSemicolonToken = negate(isSemicolonToken);
const isNotColonToken = negate(isColonToken);
const isNotOpeningParenToken = negate(isOpeningParenToken);
const isNotClosingParenToken = negate(isClosingParenToken);
const isNotOpeningBracketToken = negate(isOpeningBracketToken);
const isNotClosingBracketToken = negate(isClosingBracketToken);
const isNotOpeningBraceToken = negate(isOpeningBraceToken);
const isNotClosingBraceToken = negate(isClosingBraceToken);
const isNotCommentToken = negate(isCommentToken);

/**
 * Get the `(` token of the given function node.
 * @param {Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {Token} `(` token.
 */
function getOpeningParenOfParams(node, sourceCode) {
    return node.id
        ? sourceCode.getTokenAfter(node.id, isOpeningParenToken)
        : sourceCode.getFirstToken(node, isOpeningParenToken)
}

/**
 * Get the location of the given function node for reporting.
 * @param {Node} node - The function node to get.
 * @param {SourceCode} sourceCode - The source code object to get tokens.
 * @returns {string} The location of the function node for reporting.
 */
function getFunctionHeadLocation(node, sourceCode) {
    const parent = node.parent;
    let start = null;
    let end = null;

    if (node.type === "ArrowFunctionExpression") {
        const arrowToken = sourceCode.getTokenBefore(node.body, isArrowToken);

        start = arrowToken.loc.start;
        end = arrowToken.loc.end;
    } else if (
        parent.type === "Property" ||
        parent.type === "MethodDefinition"
    ) {
        start = parent.loc.start;
        end = getOpeningParenOfParams(node, sourceCode).loc.start;
    } else {
        start = node.loc.start;
        end = getOpeningParenOfParams(node, sourceCode).loc.start;
    }

    return {
        start: Object.assign({}, start),
        end: Object.assign({}, end),
    }
}

/* globals BigInt */

const builtinNames = Object.freeze(
    new Set([
        "Array",
        "ArrayBuffer",
        "BigInt",
        "BigInt64Array",
        "BigUint64Array",
        "Boolean",
        "DataView",
        "Date",
        "decodeURI",
        "decodeURIComponent",
        "encodeURI",
        "encodeURIComponent",
        "escape",
        "Float32Array",
        "Float64Array",
        "Function",
        "Infinity",
        "Int16Array",
        "Int32Array",
        "Int8Array",
        "isFinite",
        "isNaN",
        "isPrototypeOf",
        "JSON",
        "Map",
        "Math",
        "NaN",
        "Number",
        "Object",
        "parseFloat",
        "parseInt",
        "Promise",
        "Proxy",
        "Reflect",
        "RegExp",
        "Set",
        "String",
        "Symbol",
        "Uint16Array",
        "Uint32Array",
        "Uint8Array",
        "Uint8ClampedArray",
        "undefined",
        "unescape",
        "WeakMap",
        "WeakSet",
    ])
);
const callAllowed = new Set(
    [
        Array.isArray,
        typeof BigInt === "function" ? BigInt : undefined,
        Boolean,
        Date,
        Date.parse,
        decodeURI,
        decodeURIComponent,
        encodeURI,
        encodeURIComponent,
        escape,
        isFinite,
        isNaN,
        isPrototypeOf,
        ...Object.getOwnPropertyNames(Math)
            .map(k => Math[k])
            .filter(f => typeof f === "function"),
        Number,
        Number.isFinite,
        Number.isNaN,
        Number.parseFloat,
        Number.parseInt,
        Object,
        Object.entries, //eslint-disable-line @mysticatea/node/no-unsupported-features/es-builtins
        Object.is,
        Object.isExtensible,
        Object.isFrozen,
        Object.isSealed,
        Object.keys,
        Object.values, //eslint-disable-line @mysticatea/node/no-unsupported-features/es-builtins
        parseFloat,
        parseInt,
        RegExp,
        String,
        String.fromCharCode,
        String.fromCodePoint,
        String.raw,
        Symbol,
        Symbol.for,
        Symbol.keyFor,
        unescape,
    ].filter(f => typeof f === "function")
);
const callPassThrough = new Set([
    Object.freeze,
    Object.preventExtensions,
    Object.seal,
]);

/**
 * Get the property descriptor.
 * @param {object} object The object to get.
 * @param {string|number|symbol} name The property name to get.
 */
function getPropertyDescriptor(object, name) {
    let x = object;
    while ((typeof x === "object" || typeof x === "function") && x !== null) {
        const d = Object.getOwnPropertyDescriptor(x, name);
        if (d) {
            return d
        }
        x = Object.getPrototypeOf(x);
    }
    return null
}

/**
 * Check if a property is getter or not.
 * @param {object} object The object to check.
 * @param {string|number|symbol} name The property name to check.
 */
function isGetter(object, name) {
    const d = getPropertyDescriptor(object, name);
    return d != null && d.get != null
}

/**
 * Get the element values of a given node list.
 * @param {Node[]} nodeList The node list to get values.
 * @param {Scope|undefined} initialScope The initial scope to find variables.
 * @returns {any[]|null} The value list if all nodes are constant. Otherwise, null.
 */
function getElementValues(nodeList, initialScope) {
    const valueList = [];

    for (let i = 0; i < nodeList.length; ++i) {
        const elementNode = nodeList[i];

        if (elementNode == null) {
            valueList.length = i + 1;
        } else if (elementNode.type === "SpreadElement") {
            const argument = getStaticValueR(elementNode.argument, initialScope);
            if (argument == null) {
                return null
            }
            valueList.push(...argument.value);
        } else {
            const element = getStaticValueR(elementNode, initialScope);
            if (element == null) {
                return null
            }
            valueList.push(element.value);
        }
    }

    return valueList
}

const operations = Object.freeze({
    ArrayExpression(node, initialScope) {
        const elements = getElementValues(node.elements, initialScope);
        return elements != null ? { value: elements } : null
    },

    AssignmentExpression(node, initialScope) {
        if (node.operator === "=") {
            return getStaticValueR(node.right, initialScope)
        }
        return null
    },

    //eslint-disable-next-line complexity
    BinaryExpression(node, initialScope) {
        if (node.operator === "in" || node.operator === "instanceof") {
            // Not supported.
            return null
        }

        const left = getStaticValueR(node.left, initialScope);
        const right = getStaticValueR(node.right, initialScope);
        if (left != null && right != null) {
            switch (node.operator) {
                case "==":
                    return { value: left.value == right.value } //eslint-disable-line eqeqeq
                case "!=":
                    return { value: left.value != right.value } //eslint-disable-line eqeqeq
                case "===":
                    return { value: left.value === right.value }
                case "!==":
                    return { value: left.value !== right.value }
                case "<":
                    return { value: left.value < right.value }
                case "<=":
                    return { value: left.value <= right.value }
                case ">":
                    return { value: left.value > right.value }
                case ">=":
                    return { value: left.value >= right.value }
                case "<<":
                    return { value: left.value << right.value }
                case ">>":
                    return { value: left.value >> right.value }
                case ">>>":
                    return { value: left.value >>> right.value }
                case "+":
                    return { value: left.value + right.value }
                case "-":
                    return { value: left.value - right.value }
                case "*":
                    return { value: left.value * right.value }
                case "/":
                    return { value: left.value / right.value }
                case "%":
                    return { value: left.value % right.value }
                case "**":
                    return { value: Math.pow(left.value, right.value) }
                case "|":
                    return { value: left.value | right.value }
                case "^":
                    return { value: left.value ^ right.value }
                case "&":
                    return { value: left.value & right.value }

                // no default
            }
        }

        return null
    },

    CallExpression(node, initialScope) {
        const calleeNode = node.callee;
        const args = getElementValues(node.arguments, initialScope);

        if (args != null) {
            if (calleeNode.type === "MemberExpression") {
                const object = getStaticValueR(calleeNode.object, initialScope);
                const property = calleeNode.computed
                    ? getStaticValueR(calleeNode.property, initialScope)
                    : { value: calleeNode.property.name };

                if (object != null && property != null) {
                    const receiver = object.value;
                    const methodName = property.value;
                    if (callAllowed.has(receiver[methodName])) {
                        return { value: receiver[methodName](...args) }
                    }
                    if (callPassThrough.has(receiver[methodName])) {
                        return { value: args[0] }
                    }
                }
            } else {
                const callee = getStaticValueR(calleeNode, initialScope);
                if (callee != null) {
                    const func = callee.value;
                    if (callAllowed.has(func)) {
                        return { value: func(...args) }
                    }
                    if (callPassThrough.has(func)) {
                        return { value: args[0] }
                    }
                }
            }
        }

        return null
    },

    ConditionalExpression(node, initialScope) {
        const test = getStaticValueR(node.test, initialScope);
        if (test != null) {
            return test.value
                ? getStaticValueR(node.consequent, initialScope)
                : getStaticValueR(node.alternate, initialScope)
        }
        return null
    },

    ExpressionStatement(node, initialScope) {
        return getStaticValueR(node.expression, initialScope)
    },

    Identifier(node, initialScope) {
        if (initialScope != null) {
            const variable = findVariable(initialScope, node);

            // Built-in globals.
            if (
                variable != null &&
                variable.defs.length === 0 &&
                builtinNames.has(variable.name) &&
                variable.name in global
            ) {
                return { value: global[variable.name] }
            }

            // Constants.
            if (variable != null && variable.defs.length === 1) {
                const def = variable.defs[0];
                if (
                    def.parent &&
                    def.parent.kind === "const" &&
                    // TODO(mysticatea): don't support destructuring here.
                    def.node.id.type === "Identifier"
                ) {
                    return getStaticValueR(def.node.init, initialScope)
                }
            }
        }
        return null
    },

    Literal(node) {
        //istanbul ignore if : this is implementation-specific behavior.
        if ((node.regex != null || node.bigint != null) && node.value == null) {
            // It was a RegExp/BigInt literal, but Node.js didn't support it.
            return null
        }
        return { value: node.value }
    },

    LogicalExpression(node, initialScope) {
        const left = getStaticValueR(node.left, initialScope);
        if (left != null) {
            if (
                (node.operator === "||" && Boolean(left.value) === true) ||
                (node.operator === "&&" && Boolean(left.value) === false)
            ) {
                return left
            }

            const right = getStaticValueR(node.right, initialScope);
            if (right != null) {
                return right
            }
        }

        return null
    },

    MemberExpression(node, initialScope) {
        const object = getStaticValueR(node.object, initialScope);
        const property = node.computed
            ? getStaticValueR(node.property, initialScope)
            : { value: node.property.name };

        if (
            object != null &&
            property != null &&
            !isGetter(object.value, property.value)
        ) {
            return { value: object.value[property.value] }
        }
        return null
    },

    NewExpression(node, initialScope) {
        const callee = getStaticValueR(node.callee, initialScope);
        const args = getElementValues(node.arguments, initialScope);

        if (callee != null && args != null) {
            const Func = callee.value;
            if (callAllowed.has(Func)) {
                return { value: new Func(...args) }
            }
        }

        return null
    },

    ObjectExpression(node, initialScope) {
        const object = {};

        for (const propertyNode of node.properties) {
            if (propertyNode.type === "Property") {
                if (propertyNode.kind !== "init") {
                    return null
                }
                const key = propertyNode.computed
                    ? getStaticValueR(propertyNode.key, initialScope)
                    : { value: propertyNode.key.name };
                const value = getStaticValueR(propertyNode.value, initialScope);
                if (key == null || value == null) {
                    return null
                }
                object[key.value] = value.value;
            } else if (
                propertyNode.type === "SpreadElement" ||
                propertyNode.type === "ExperimentalSpreadProperty"
            ) {
                const argument = getStaticValueR(
                    propertyNode.argument,
                    initialScope
                );
                if (argument == null) {
                    return null
                }
                Object.assign(object, argument.value);
            } else {
                return null
            }
        }

        return { value: object }
    },

    SequenceExpression(node, initialScope) {
        const last = node.expressions[node.expressions.length - 1];
        return getStaticValueR(last, initialScope)
    },

    TaggedTemplateExpression(node, initialScope) {
        const tag = getStaticValueR(node.tag, initialScope);
        const expressions = getElementValues(
            node.quasi.expressions,
            initialScope
        );

        if (tag != null && expressions != null) {
            const func = tag.value;
            const strings = node.quasi.quasis.map(q => q.value.cooked);
            strings.raw = node.quasi.quasis.map(q => q.value.raw);

            if (func === String.raw) {
                return { value: func(strings, ...expressions) }
            }
        }

        return null
    },

    TemplateLiteral(node, initialScope) {
        const expressions = getElementValues(node.expressions, initialScope);
        if (expressions != null) {
            let value = node.quasis[0].value.cooked;
            for (let i = 0; i < expressions.length; ++i) {
                value += expressions[i];
                value += node.quasis[i + 1].value.cooked;
            }
            return { value }
        }
        return null
    },

    UnaryExpression(node, initialScope) {
        if (node.operator === "delete") {
            // Not supported.
            return null
        }
        if (node.operator === "void") {
            return { value: undefined }
        }

        const arg = getStaticValueR(node.argument, initialScope);
        if (arg != null) {
            switch (node.operator) {
                case "-":
                    return { value: -arg.value }
                case "+":
                    return { value: +arg.value } //eslint-disable-line no-implicit-coercion
                case "!":
                    return { value: !arg.value }
                case "~":
                    return { value: ~arg.value }
                case "typeof":
                    return { value: typeof arg.value }

                // no default
            }
        }

        return null
    },
});

/**
 * Get the value of a given node if it's a static value.
 * @param {Node} node The node to get.
 * @param {Scope|undefined} initialScope The scope to start finding variable.
 * @returns {{value:any}|null} The static value of the node, or `null`.
 */
function getStaticValueR(node, initialScope) {
    if (node != null && Object.hasOwnProperty.call(operations, node.type)) {
        return operations[node.type](node, initialScope)
    }
    return null
}

/**
 * Get the value of a given node if it's a static value.
 * @param {Node} node The node to get.
 * @param {Scope} [initialScope] The scope to start finding variable. Optional. If this scope was given, this tries to resolve identifier references which are in the given node as much as possible.
 * @returns {{value:any}|null} The static value of the node, or `null`.
 */
function getStaticValue(node, initialScope = null) {
    try {
        return getStaticValueR(node, initialScope)
    } catch (_error) {
        return null
    }
}

/**
 * Get the value of a given node if it's a literal or a template literal.
 * @param {Node} node The node to get.
 * @param {Scope} [initialScope] The scope to start finding variable. Optional. If the node is an Identifier node and this scope was given, this checks the variable of the identifier, and returns the value of it if the variable is a constant.
 * @returns {string|null} The value of the node, or `null`.
 */
function getStringIfConstant(node, initialScope = null) {
    // Handle the literals that the platform doesn't support natively.
    if (node && node.type === "Literal" && node.value === null) {
        if (node.regex) {
            return `/${node.regex.pattern}/${node.regex.flags}`
        }
        if (node.bigint) {
            return node.bigint
        }
    }

    const evaluated = getStaticValue(node, initialScope);
    return evaluated && String(evaluated.value)
}

/**
 * Get the property name from a MemberExpression node or a Property node.
 * @param {Node} node The node to get.
 * @param {Scope} [initialScope] The scope to start finding variable. Optional. If the node is a computed property node and this scope was given, this checks the computed property name by the `getStringIfConstant` function with the scope, and returns the value of it.
 * @returns {string|null} The property name of the node.
 */
function getPropertyName(node, initialScope) {
    switch (node.type) {
        case "MemberExpression":
            if (node.computed) {
                return getStringIfConstant(node.property, initialScope)
            }
            return node.property.name

        case "Property":
        case "MethodDefinition":
            if (node.computed) {
                return getStringIfConstant(node.key, initialScope)
            }
            if (node.key.type === "Literal") {
                return String(node.key.value)
            }
            return node.key.name

        // no default
    }

    return null
}

/**
 * Get the name and kind of the given function node.
 * @param {ASTNode} node - The function node to get.
 * @returns {string} The name and kind of the function node.
 */
function getFunctionNameWithKind(node) {
    const parent = node.parent;
    const tokens = [];

    if (parent.type === "MethodDefinition" && parent.static) {
        tokens.push("static");
    }
    if (node.async) {
        tokens.push("async");
    }
    if (node.generator) {
        tokens.push("generator");
    }

    if (node.type === "ArrowFunctionExpression") {
        tokens.push("arrow", "function");
    } else if (
        parent.type === "Property" ||
        parent.type === "MethodDefinition"
    ) {
        if (parent.kind === "constructor") {
            return "constructor"
        }
        if (parent.kind === "get") {
            tokens.push("getter");
        } else if (parent.kind === "set") {
            tokens.push("setter");
        } else {
            tokens.push("method");
        }
    } else {
        tokens.push("function");
    }

    if (node.id) {
        tokens.push(`'${node.id.name}'`);
    } else {
        const name = getPropertyName(parent);

        if (name) {
            tokens.push(`'${name}'`);
        }
    }

    return tokens.join(" ")
}

const typeConversionBinaryOps = Object.freeze(
    new Set([
        "==",
        "!=",
        "<",
        "<=",
        ">",
        ">=",
        "<<",
        ">>",
        ">>>",
        "+",
        "-",
        "*",
        "/",
        "%",
        "|",
        "^",
        "&",
        "in",
    ])
);
const typeConversionUnaryOps = Object.freeze(new Set(["-", "+", "!", "~"]));
const visitor = Object.freeze(
    Object.assign(Object.create(null), {
        $visit(node, options, visitorKeys) {
            const { type } = node;

            if (typeof this[type] === "function") {
                return this[type](node, options, visitorKeys)
            }

            return this.$visitChildren(node, options, visitorKeys)
        },

        $visitChildren(node, options, visitorKeys) {
            const { type } = node;

            for (const key of visitorKeys[type] || eslint_visitor_keys__WEBPACK_IMPORTED_MODULE_0__.getKeys(node)) {
                const value = node[key];

                if (Array.isArray(value)) {
                    for (const element of value) {
                        if (
                            element &&
                            this.$visit(element, options, visitorKeys)
                        ) {
                            return true
                        }
                    }
                } else if (value && this.$visit(value, options, visitorKeys)) {
                    return true
                }
            }

            return false
        },

        ArrowFunctionExpression() {
            return false
        },
        AssignmentExpression() {
            return true
        },
        AwaitExpression() {
            return true
        },
        BinaryExpression(node, options, visitorKeys) {
            if (
                options.considerImplicitTypeConversion &&
                typeConversionBinaryOps.has(node.operator) &&
                (node.left.type !== "Literal" || node.right.type !== "Literal")
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        CallExpression() {
            return true
        },
        FunctionExpression() {
            return false
        },
        ImportExpression() {
            return true
        },
        MemberExpression(node, options, visitorKeys) {
            if (options.considerGetters) {
                return true
            }
            if (
                options.considerImplicitTypeConversion &&
                node.computed &&
                node.property.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        MethodDefinition(node, options, visitorKeys) {
            if (
                options.considerImplicitTypeConversion &&
                node.computed &&
                node.key.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        NewExpression() {
            return true
        },
        Property(node, options, visitorKeys) {
            if (
                options.considerImplicitTypeConversion &&
                node.computed &&
                node.key.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        UnaryExpression(node, options, visitorKeys) {
            if (node.operator === "delete") {
                return true
            }
            if (
                options.considerImplicitTypeConversion &&
                typeConversionUnaryOps.has(node.operator) &&
                node.argument.type !== "Literal"
            ) {
                return true
            }
            return this.$visitChildren(node, options, visitorKeys)
        },
        UpdateExpression() {
            return true
        },
        YieldExpression() {
            return true
        },
    })
);

/**
 * Check whether a given node has any side effect or not.
 * @param {Node} node The node to get.
 * @param {SourceCode} sourceCode The source code object.
 * @param {object} [options] The option object.
 * @param {boolean} [options.considerGetters=false] If `true` then it considers member accesses as the node which has side effects.
 * @param {boolean} [options.considerImplicitTypeConversion=false] If `true` then it considers implicit type conversion as the node which has side effects.
 * @param {object} [options.visitorKeys=evk.KEYS] The keys to traverse nodes. Use `context.getSourceCode().visitorKeys`.
 * @returns {boolean} `true` if the node has a certain side effect.
 */
function hasSideEffect(
    node,
    sourceCode,
    { considerGetters = false, considerImplicitTypeConversion = false } = {}
) {
    return visitor.$visit(
        node,
        { considerGetters, considerImplicitTypeConversion },
        sourceCode.visitorKeys || eslint_visitor_keys__WEBPACK_IMPORTED_MODULE_0__.KEYS
    )
}

/**
 * Get the left parenthesis of the parent node syntax if it exists.
 * E.g., `if (a) {}` then the `(`.
 * @param {Node} node The AST node to check.
 * @param {SourceCode} sourceCode The source code object to get tokens.
 * @returns {Token|null} The left parenthesis of the parent node syntax
 */
function getParentSyntaxParen(node, sourceCode) {
    const parent = node.parent;

    switch (parent.type) {
        case "CallExpression":
        case "NewExpression":
            if (parent.arguments.length === 1 && parent.arguments[0] === node) {
                return sourceCode.getTokenAfter(
                    parent.callee,
                    isOpeningParenToken
                )
            }
            return null

        case "DoWhileStatement":
            if (parent.test === node) {
                return sourceCode.getTokenAfter(
                    parent.body,
                    isOpeningParenToken
                )
            }
            return null

        case "IfStatement":
        case "WhileStatement":
            if (parent.test === node) {
                return sourceCode.getFirstToken(parent, 1)
            }
            return null

        case "ImportExpression":
            if (parent.source === node) {
                return sourceCode.getFirstToken(parent, 1)
            }
            return null

        case "SwitchStatement":
            if (parent.discriminant === node) {
                return sourceCode.getFirstToken(parent, 1)
            }
            return null

        case "WithStatement":
            if (parent.object === node) {
                return sourceCode.getFirstToken(parent, 1)
            }
            return null

        default:
            return null
    }
}

/**
 * Check whether a given node is parenthesized or not.
 * @param {number} times The number of parantheses.
 * @param {Node} node The AST node to check.
 * @param {SourceCode} sourceCode The source code object to get tokens.
 * @returns {boolean} `true` if the node is parenthesized the given times.
 */
/**
 * Check whether a given node is parenthesized or not.
 * @param {Node} node The AST node to check.
 * @param {SourceCode} sourceCode The source code object to get tokens.
 * @returns {boolean} `true` if the node is parenthesized.
 */
function isParenthesized(
    timesOrNode,
    nodeOrSourceCode,
    optionalSourceCode
) {
    let times, node, sourceCode, maybeLeftParen, maybeRightParen;
    if (typeof timesOrNode === "number") {
        times = timesOrNode | 0;
        node = nodeOrSourceCode;
        sourceCode = optionalSourceCode;
        if (!(times >= 1)) {
            throw new TypeError("'times' should be a positive integer.")
        }
    } else {
        times = 1;
        node = timesOrNode;
        sourceCode = nodeOrSourceCode;
    }

    if (node == null) {
        return false
    }

    maybeLeftParen = maybeRightParen = node;
    do {
        maybeLeftParen = sourceCode.getTokenBefore(maybeLeftParen);
        maybeRightParen = sourceCode.getTokenAfter(maybeRightParen);
    } while (
        maybeLeftParen != null &&
        maybeRightParen != null &&
        isOpeningParenToken(maybeLeftParen) &&
        isClosingParenToken(maybeRightParen) &&
        // Avoid false positive such as `if (a) {}`
        maybeLeftParen !== getParentSyntaxParen(node, sourceCode) &&
        --times > 0
    )

    return times === 0
}

/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */

const placeholder = /\$(?:[$&`']|[1-9][0-9]?)/gu;

/** @type {WeakMap<PatternMatcher, {pattern:RegExp,escaped:boolean}>} */
const internal = new WeakMap();

/**
 * Check whether a given character is escaped or not.
 * @param {string} str The string to check.
 * @param {number} index The location of the character to check.
 * @returns {boolean} `true` if the character is escaped.
 */
function isEscaped(str, index) {
    let escaped = false;
    for (let i = index - 1; i >= 0 && str.charCodeAt(i) === 0x5c; --i) {
        escaped = !escaped;
    }
    return escaped
}

/**
 * Replace a given string by a given matcher.
 * @param {PatternMatcher} matcher The pattern matcher.
 * @param {string} str The string to be replaced.
 * @param {string} replacement The new substring to replace each matched part.
 * @returns {string} The replaced string.
 */
function replaceS(matcher, str, replacement) {
    const chunks = [];
    let index = 0;

    /** @type {RegExpExecArray} */
    let match = null;

    /**
     * @param {string} key The placeholder.
     * @returns {string} The replaced string.
     */
    function replacer(key) {
        switch (key) {
            case "$$":
                return "$"
            case "$&":
                return match[0]
            case "$`":
                return str.slice(0, match.index)
            case "$'":
                return str.slice(match.index + match[0].length)
            default: {
                const i = key.slice(1);
                if (i in match) {
                    return match[i]
                }
                return key
            }
        }
    }

    for (match of matcher.execAll(str)) {
        chunks.push(str.slice(index, match.index));
        chunks.push(replacement.replace(placeholder, replacer));
        index = match.index + match[0].length;
    }
    chunks.push(str.slice(index));

    return chunks.join("")
}

/**
 * Replace a given string by a given matcher.
 * @param {PatternMatcher} matcher The pattern matcher.
 * @param {string} str The string to be replaced.
 * @param {(...strs[])=>string} replace The function to replace each matched part.
 * @returns {string} The replaced string.
 */
function replaceF(matcher, str, replace) {
    const chunks = [];
    let index = 0;

    for (const match of matcher.execAll(str)) {
        chunks.push(str.slice(index, match.index));
        chunks.push(String(replace(...match, match.index, match.input)));
        index = match.index + match[0].length;
    }
    chunks.push(str.slice(index));

    return chunks.join("")
}

/**
 * The class to find patterns as considering escape sequences.
 */
class PatternMatcher {
    /**
     * Initialize this matcher.
     * @param {RegExp} pattern The pattern to match.
     * @param {{escaped:boolean}} options The options.
     */
    constructor(pattern, { escaped = false } = {}) {
        if (!(pattern instanceof RegExp)) {
            throw new TypeError("'pattern' should be a RegExp instance.")
        }
        if (!pattern.flags.includes("g")) {
            throw new Error("'pattern' should contains 'g' flag.")
        }

        internal.set(this, {
            pattern: new RegExp(pattern.source, pattern.flags),
            escaped: Boolean(escaped),
        });
    }

    /**
     * Find the pattern in a given string.
     * @param {string} str The string to find.
     * @returns {IterableIterator<RegExpExecArray>} The iterator which iterate the matched information.
     */
    *execAll(str) {
        const { pattern, escaped } = internal.get(this);
        let match = null;
        let lastIndex = 0;

        pattern.lastIndex = 0;
        while ((match = pattern.exec(str)) != null) {
            if (escaped || !isEscaped(str, match.index)) {
                lastIndex = pattern.lastIndex;
                yield match;
                pattern.lastIndex = lastIndex;
            }
        }
    }

    /**
     * Check whether the pattern is found in a given string.
     * @param {string} str The string to check.
     * @returns {boolean} `true` if the pattern was found in the string.
     */
    test(str) {
        const it = this.execAll(str);
        const ret = it.next();
        return !ret.done
    }

    /**
     * Replace a given string.
     * @param {string} str The string to be replaced.
     * @param {(string|((...strs:string[])=>string))} replacer The string or function to replace. This is the same as the 2nd argument of `String.prototype.replace`.
     * @returns {string} The replaced string.
     */
    [Symbol.replace](str, replacer) {
        return typeof replacer === "function"
            ? replaceF(this, String(str), replacer)
            : replaceS(this, String(str), String(replacer))
    }
}

const SENTINEL_TYPE = /^(?:.+?Statement|.+?Declaration|(?:Array|ArrowFunction|Assignment|Call|Class|Function|Member|New|Object)Expression|AssignmentPattern|Program|VariableDeclarator)$/u;
const IMPORT_TYPE = /^(?:Import|Export(?:All|Default|Named))Declaration$/u;
const has = Function.call.bind(Object.hasOwnProperty);

const READ = Symbol("read");
const CALL = Symbol("call");
const CONSTRUCT = Symbol("construct");
const ESM = Symbol("esm");

const requireCall = { require: { [CALL]: true } };

/**
 * Check whether a given variable is modified or not.
 * @param {Variable} variable The variable to check.
 * @returns {boolean} `true` if the variable is modified.
 */
function isModifiedGlobal(variable) {
    return (
        variable == null ||
        variable.defs.length !== 0 ||
        variable.references.some(r => r.isWrite())
    )
}

/**
 * The reference tracker.
 */
class ReferenceTracker {
    /**
     * Initialize this tracker.
     * @param {Scope} globalScope The global scope.
     * @param {object} [options] The options.
     * @param {"legacy"|"strict"} [options.mode="strict"] The mode to determine the ImportDeclaration's behavior for CJS modules.
     * @param {string[]} [options.globalObjectNames=["global","self","window"]] The variable names for Global Object.
     */
    constructor(
        globalScope,
        {
            mode = "strict",
            globalObjectNames = ["global", "self", "window"],
        } = {}
    ) {
        this.variableStack = [];
        this.globalScope = globalScope;
        this.mode = mode;
        this.globalObjectNames = globalObjectNames.slice(0);
    }

    /**
     * Iterate the references of global variables.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    *iterateGlobalReferences(traceMap) {
        for (const key of Object.keys(traceMap)) {
            const nextTraceMap = traceMap[key];
            const path = [key];
            const variable = this.globalScope.set.get(key);

            if (isModifiedGlobal(variable)) {
                continue
            }

            yield* this._iterateVariableReferences(
                variable,
                path,
                nextTraceMap,
                true
            );
        }

        for (const key of this.globalObjectNames) {
            const path = [];
            const variable = this.globalScope.set.get(key);

            if (isModifiedGlobal(variable)) {
                continue
            }

            yield* this._iterateVariableReferences(
                variable,
                path,
                traceMap,
                false
            );
        }
    }

    /**
     * Iterate the references of CommonJS modules.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    *iterateCjsReferences(traceMap) {
        for (const { node } of this.iterateGlobalReferences(requireCall)) {
            const key = getStringIfConstant(node.arguments[0]);
            if (key == null || !has(traceMap, key)) {
                continue
            }

            const nextTraceMap = traceMap[key];
            const path = [key];

            if (nextTraceMap[READ]) {
                yield {
                    node,
                    path,
                    type: READ,
                    info: nextTraceMap[READ],
                };
            }
            yield* this._iteratePropertyReferences(node, path, nextTraceMap);
        }
    }

    /**
     * Iterate the references of ES modules.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    *iterateEsmReferences(traceMap) {
        const programNode = this.globalScope.block;

        for (const node of programNode.body) {
            if (!IMPORT_TYPE.test(node.type) || node.source == null) {
                continue
            }
            const moduleId = node.source.value;

            if (!has(traceMap, moduleId)) {
                continue
            }
            const nextTraceMap = traceMap[moduleId];
            const path = [moduleId];

            if (nextTraceMap[READ]) {
                yield { node, path, type: READ, info: nextTraceMap[READ] };
            }

            if (node.type === "ExportAllDeclaration") {
                for (const key of Object.keys(nextTraceMap)) {
                    const exportTraceMap = nextTraceMap[key];
                    if (exportTraceMap[READ]) {
                        yield {
                            node,
                            path: path.concat(key),
                            type: READ,
                            info: exportTraceMap[READ],
                        };
                    }
                }
            } else {
                for (const specifier of node.specifiers) {
                    const esm = has(nextTraceMap, ESM);
                    const it = this._iterateImportReferences(
                        specifier,
                        path,
                        esm
                            ? nextTraceMap
                            : this.mode === "legacy"
                                ? Object.assign(
                                      { default: nextTraceMap },
                                      nextTraceMap
                                  )
                                : { default: nextTraceMap }
                    );

                    if (esm) {
                        yield* it;
                    } else {
                        for (const report of it) {
                            report.path = report.path.filter(exceptDefault);
                            if (
                                report.path.length >= 2 ||
                                report.type !== READ
                            ) {
                                yield report;
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * Iterate the references for a given variable.
     * @param {Variable} variable The variable to iterate that references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @param {boolean} shouldReport = The flag to report those references.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    *_iterateVariableReferences(variable, path, traceMap, shouldReport) {
        if (this.variableStack.includes(variable)) {
            return
        }
        this.variableStack.push(variable);
        try {
            for (const reference of variable.references) {
                if (!reference.isRead()) {
                    continue
                }
                const node = reference.identifier;

                if (shouldReport && traceMap[READ]) {
                    yield { node, path, type: READ, info: traceMap[READ] };
                }
                yield* this._iteratePropertyReferences(node, path, traceMap);
            }
        } finally {
            this.variableStack.pop();
        }
    }

    /**
     * Iterate the references for a given AST node.
     * @param rootNode The AST node to iterate references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    //eslint-disable-next-line complexity
    *_iteratePropertyReferences(rootNode, path, traceMap) {
        let node = rootNode;
        while (!SENTINEL_TYPE.test(node.parent.type)) {
            node = node.parent;
        }

        const parent = node.parent;
        if (parent.type === "MemberExpression") {
            if (parent.object === node) {
                const key = getPropertyName(parent);
                if (key == null || !has(traceMap, key)) {
                    return
                }

                path = path.concat(key); //eslint-disable-line no-param-reassign
                const nextTraceMap = traceMap[key];
                if (nextTraceMap[READ]) {
                    yield {
                        node: parent,
                        path,
                        type: READ,
                        info: nextTraceMap[READ],
                    };
                }
                yield* this._iteratePropertyReferences(
                    parent,
                    path,
                    nextTraceMap
                );
            }
            return
        }
        if (parent.type === "CallExpression") {
            if (parent.callee === node && traceMap[CALL]) {
                yield { node: parent, path, type: CALL, info: traceMap[CALL] };
            }
            return
        }
        if (parent.type === "NewExpression") {
            if (parent.callee === node && traceMap[CONSTRUCT]) {
                yield {
                    node: parent,
                    path,
                    type: CONSTRUCT,
                    info: traceMap[CONSTRUCT],
                };
            }
            return
        }
        if (parent.type === "AssignmentExpression") {
            if (parent.right === node) {
                yield* this._iterateLhsReferences(parent.left, path, traceMap);
                yield* this._iteratePropertyReferences(parent, path, traceMap);
            }
            return
        }
        if (parent.type === "AssignmentPattern") {
            if (parent.right === node) {
                yield* this._iterateLhsReferences(parent.left, path, traceMap);
            }
            return
        }
        if (parent.type === "VariableDeclarator") {
            if (parent.init === node) {
                yield* this._iterateLhsReferences(parent.id, path, traceMap);
            }
        }
    }

    /**
     * Iterate the references for a given Pattern node.
     * @param {Node} patternNode The Pattern node to iterate references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    *_iterateLhsReferences(patternNode, path, traceMap) {
        if (patternNode.type === "Identifier") {
            const variable = findVariable(this.globalScope, patternNode);
            if (variable != null) {
                yield* this._iterateVariableReferences(
                    variable,
                    path,
                    traceMap,
                    false
                );
            }
            return
        }
        if (patternNode.type === "ObjectPattern") {
            for (const property of patternNode.properties) {
                const key = getPropertyName(property);

                if (key == null || !has(traceMap, key)) {
                    continue
                }

                const nextPath = path.concat(key);
                const nextTraceMap = traceMap[key];
                if (nextTraceMap[READ]) {
                    yield {
                        node: property,
                        path: nextPath,
                        type: READ,
                        info: nextTraceMap[READ],
                    };
                }
                yield* this._iterateLhsReferences(
                    property.value,
                    nextPath,
                    nextTraceMap
                );
            }
            return
        }
        if (patternNode.type === "AssignmentPattern") {
            yield* this._iterateLhsReferences(patternNode.left, path, traceMap);
        }
    }

    /**
     * Iterate the references for a given ModuleSpecifier node.
     * @param {Node} specifierNode The ModuleSpecifier node to iterate references.
     * @param {string[]} path The current path.
     * @param {object} traceMap The trace map.
     * @returns {IterableIterator<{node:Node,path:string[],type:symbol,info:any}>} The iterator to iterate references.
     */
    *_iterateImportReferences(specifierNode, path, traceMap) {
        const type = specifierNode.type;

        if (type === "ImportSpecifier" || type === "ImportDefaultSpecifier") {
            const key =
                type === "ImportDefaultSpecifier"
                    ? "default"
                    : specifierNode.imported.name;
            if (!has(traceMap, key)) {
                return
            }

            path = path.concat(key); //eslint-disable-line no-param-reassign
            const nextTraceMap = traceMap[key];
            if (nextTraceMap[READ]) {
                yield {
                    node: specifierNode,
                    path,
                    type: READ,
                    info: nextTraceMap[READ],
                };
            }
            yield* this._iterateVariableReferences(
                findVariable(this.globalScope, specifierNode.local),
                path,
                nextTraceMap,
                false
            );

            return
        }

        if (type === "ImportNamespaceSpecifier") {
            yield* this._iterateVariableReferences(
                findVariable(this.globalScope, specifierNode.local),
                path,
                traceMap,
                false
            );
            return
        }

        if (type === "ExportSpecifier") {
            const key = specifierNode.local.name;
            if (!has(traceMap, key)) {
                return
            }

            path = path.concat(key); //eslint-disable-line no-param-reassign
            const nextTraceMap = traceMap[key];
            if (nextTraceMap[READ]) {
                yield {
                    node: specifierNode,
                    path,
                    type: READ,
                    info: nextTraceMap[READ],
                };
            }
        }
    }
}

ReferenceTracker.READ = READ;
ReferenceTracker.CALL = CALL;
ReferenceTracker.CONSTRUCT = CONSTRUCT;
ReferenceTracker.ESM = ESM;

/**
 * This is a predicate function for Array#filter.
 * @param {string} name A name part.
 * @param {number} index The index of the name.
 * @returns {boolean} `false` if it's default.
 */
function exceptDefault(name, index) {
    return !(index === 1 && name === "default")
}

var index = {
    CALL,
    CONSTRUCT,
    ESM,
    findVariable,
    getFunctionHeadLocation,
    getFunctionNameWithKind,
    getInnermostScope,
    getPropertyName,
    getStaticValue,
    getStringIfConstant,
    hasSideEffect,
    isArrowToken,
    isClosingBraceToken,
    isClosingBracketToken,
    isClosingParenToken,
    isColonToken,
    isCommaToken,
    isCommentToken,
    isNotArrowToken,
    isNotClosingBraceToken,
    isNotClosingBracketToken,
    isNotClosingParenToken,
    isNotColonToken,
    isNotCommaToken,
    isNotCommentToken,
    isNotOpeningBraceToken,
    isNotOpeningBracketToken,
    isNotOpeningParenToken,
    isNotSemicolonToken,
    isOpeningBraceToken,
    isOpeningBracketToken,
    isOpeningParenToken,
    isParenthesized,
    isSemicolonToken,
    PatternMatcher,
    READ,
    ReferenceTracker,
};

/* harmony default export */ __webpack_exports__["default"] = (index);

//# sourceMappingURL=index.mjs.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * See LICENSE file in root directory for full license.
 */


const KEYS = __webpack_require__(4);

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
/* 4 */
/***/ (function(module) {

module.exports = JSON.parse("{\"AssignmentExpression\":[\"left\",\"right\"],\"AssignmentPattern\":[\"left\",\"right\"],\"ArrayExpression\":[\"elements\"],\"ArrayPattern\":[\"elements\"],\"ArrowFunctionExpression\":[\"params\",\"body\"],\"AwaitExpression\":[\"argument\"],\"BlockStatement\":[\"body\"],\"BinaryExpression\":[\"left\",\"right\"],\"BreakStatement\":[\"label\"],\"CallExpression\":[\"callee\",\"arguments\"],\"CatchClause\":[\"param\",\"body\"],\"ClassBody\":[\"body\"],\"ClassDeclaration\":[\"id\",\"superClass\",\"body\"],\"ClassExpression\":[\"id\",\"superClass\",\"body\"],\"ConditionalExpression\":[\"test\",\"consequent\",\"alternate\"],\"ContinueStatement\":[\"label\"],\"DebuggerStatement\":[],\"DoWhileStatement\":[\"body\",\"test\"],\"EmptyStatement\":[],\"ExportAllDeclaration\":[\"source\"],\"ExportDefaultDeclaration\":[\"declaration\"],\"ExportNamedDeclaration\":[\"declaration\",\"specifiers\",\"source\"],\"ExportSpecifier\":[\"exported\",\"local\"],\"ExpressionStatement\":[\"expression\"],\"ExperimentalRestProperty\":[\"argument\"],\"ExperimentalSpreadProperty\":[\"argument\"],\"ForStatement\":[\"init\",\"test\",\"update\",\"body\"],\"ForInStatement\":[\"left\",\"right\",\"body\"],\"ForOfStatement\":[\"left\",\"right\",\"body\"],\"FunctionDeclaration\":[\"id\",\"params\",\"body\"],\"FunctionExpression\":[\"id\",\"params\",\"body\"],\"Identifier\":[],\"IfStatement\":[\"test\",\"consequent\",\"alternate\"],\"ImportDeclaration\":[\"specifiers\",\"source\"],\"ImportDefaultSpecifier\":[\"local\"],\"ImportExpression\":[\"source\"],\"ImportNamespaceSpecifier\":[\"local\"],\"ImportSpecifier\":[\"imported\",\"local\"],\"JSXAttribute\":[\"name\",\"value\"],\"JSXClosingElement\":[\"name\"],\"JSXElement\":[\"openingElement\",\"children\",\"closingElement\"],\"JSXEmptyExpression\":[],\"JSXExpressionContainer\":[\"expression\"],\"JSXIdentifier\":[],\"JSXMemberExpression\":[\"object\",\"property\"],\"JSXNamespacedName\":[\"namespace\",\"name\"],\"JSXOpeningElement\":[\"name\",\"attributes\"],\"JSXSpreadAttribute\":[\"argument\"],\"JSXText\":[],\"JSXFragment\":[\"openingFragment\",\"children\",\"closingFragment\"],\"Literal\":[],\"LabeledStatement\":[\"label\",\"body\"],\"LogicalExpression\":[\"left\",\"right\"],\"MemberExpression\":[\"object\",\"property\"],\"MetaProperty\":[\"meta\",\"property\"],\"MethodDefinition\":[\"key\",\"value\"],\"NewExpression\":[\"callee\",\"arguments\"],\"ObjectExpression\":[\"properties\"],\"ObjectPattern\":[\"properties\"],\"Program\":[\"body\"],\"Property\":[\"key\",\"value\"],\"RestElement\":[\"argument\"],\"ReturnStatement\":[\"argument\"],\"SequenceExpression\":[\"expressions\"],\"SpreadElement\":[\"argument\"],\"Super\":[],\"SwitchStatement\":[\"discriminant\",\"cases\"],\"SwitchCase\":[\"test\",\"consequent\"],\"TaggedTemplateExpression\":[\"tag\",\"quasi\"],\"TemplateElement\":[],\"TemplateLiteral\":[\"quasis\",\"expressions\"],\"ThisExpression\":[],\"ThrowStatement\":[\"argument\"],\"TryStatement\":[\"block\",\"handler\",\"finalizer\"],\"UnaryExpression\":[\"argument\"],\"UpdateExpression\":[\"argument\"],\"VariableDeclaration\":[\"declarations\"],\"VariableDeclarator\":[\"id\",\"init\"],\"WhileStatement\":[\"test\",\"body\"],\"WithStatement\":[\"object\",\"body\"],\"YieldExpression\":[\"argument\"]}");

/***/ })
/******/ ]);
