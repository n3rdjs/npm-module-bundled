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

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = __webpack_require__(3);
exports.Parser = Parser_1.Parser;
var domhandler_1 = __webpack_require__(11);
exports.DomHandler = domhandler_1.DomHandler;
exports.DefaultHandler = domhandler_1.DomHandler;
// Helper methods
/**
 * Parses data, returns the resulting DOM.
 *
 * @param data The data that should be parsed.
 * @param options Optional options for the parser and DOM builder.
 */
function parseDOM(data, options) {
    var handler = new domhandler_1.DomHandler(void 0, options);
    new Parser_1.Parser(handler, options).end(data);
    return handler.dom;
}
exports.parseDOM = parseDOM;
/**
 * Creates a parser instance, with an attached DOM handler.
 *
 * @param cb A callback that will be called once parsing has been completed.
 * @param options Optional options for the parser and DOM builder.
 * @param elementCb An optional callback that will be called every time a tag has been completed inside of the DOM.
 */
function createDomStream(cb, options, elementCb) {
    var handler = new domhandler_1.DomHandler(cb, options, elementCb);
    return new Parser_1.Parser(handler, options);
}
exports.createDomStream = createDomStream;
var Tokenizer_1 = __webpack_require__(4);
exports.Tokenizer = Tokenizer_1.default;
var ElementType = __importStar(__webpack_require__(13));
exports.ElementType = ElementType;
/**
 * List of all events that the parser emits.
 *
 * Format: eventname: number of arguments.
 */
exports.EVENTS = {
    attribute: 2,
    cdatastart: 0,
    cdataend: 0,
    text: 1,
    processinginstruction: 2,
    comment: 1,
    commentend: 0,
    closetag: 1,
    opentag: 2,
    opentagname: 1,
    error: 1,
    end: 0
};
/*
    All of the following exports exist for backwards-compatibility.
    They should probably be removed eventually.
*/
__export(__webpack_require__(14));
__export(__webpack_require__(28));
__export(__webpack_require__(31));
var DomUtils = __importStar(__webpack_require__(15));
exports.DomUtils = DomUtils;
var FeedHandler_1 = __webpack_require__(14);
exports.RssHandler = FeedHandler_1.FeedHandler;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Tokenizer_1 = __importDefault(__webpack_require__(4));
var events_1 = __webpack_require__(10);
var formTags = new Set([
    "input",
    "option",
    "optgroup",
    "select",
    "button",
    "datalist",
    "textarea"
]);
var pTag = new Set(["p"]);
var openImpliesClose = {
    tr: new Set(["tr", "th", "td"]),
    th: new Set(["th"]),
    td: new Set(["thead", "th", "td"]),
    body: new Set(["head", "link", "script"]),
    li: new Set(["li"]),
    p: pTag,
    h1: pTag,
    h2: pTag,
    h3: pTag,
    h4: pTag,
    h5: pTag,
    h6: pTag,
    select: formTags,
    input: formTags,
    output: formTags,
    button: formTags,
    datalist: formTags,
    textarea: formTags,
    option: new Set(["option"]),
    optgroup: new Set(["optgroup", "option"]),
    dd: new Set(["dt", "dd"]),
    dt: new Set(["dt", "dd"]),
    address: pTag,
    article: pTag,
    aside: pTag,
    blockquote: pTag,
    details: pTag,
    div: pTag,
    dl: pTag,
    fieldset: pTag,
    figcaption: pTag,
    figure: pTag,
    footer: pTag,
    form: pTag,
    header: pTag,
    hr: pTag,
    main: pTag,
    nav: pTag,
    ol: pTag,
    pre: pTag,
    section: pTag,
    table: pTag,
    ul: pTag,
    rt: new Set(["rt", "rp"]),
    rp: new Set(["rt", "rp"]),
    tbody: new Set(["thead", "tbody"]),
    tfoot: new Set(["thead", "tbody"])
};
var voidElements = new Set([
    "area",
    "base",
    "basefont",
    "br",
    "col",
    "command",
    "embed",
    "frame",
    "hr",
    "img",
    "input",
    "isindex",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr"
]);
var foreignContextElements = new Set(["math", "svg"]);
var htmlIntegrationElements = new Set([
    "mi",
    "mo",
    "mn",
    "ms",
    "mtext",
    "annotation-xml",
    "foreignObject",
    "desc",
    "title"
]);
var reNameEnd = /\s|\//;
var Parser = /** @class */ (function (_super) {
    __extends(Parser, _super);
    function Parser(cbs, options) {
        var _this = _super.call(this) || this;
        _this._tagname = "";
        _this._attribname = "";
        _this._attribvalue = "";
        _this._attribs = null;
        _this._stack = [];
        _this._foreignContext = [];
        _this.startIndex = 0;
        _this.endIndex = null;
        // Aliases for backwards compatibility
        _this.parseChunk = Parser.prototype.write;
        _this.done = Parser.prototype.end;
        _this._options = options || {};
        _this._cbs = cbs || {};
        _this._tagname = "";
        _this._attribname = "";
        _this._attribvalue = "";
        _this._attribs = null;
        _this._stack = [];
        _this._foreignContext = [];
        _this.startIndex = 0;
        _this.endIndex = null;
        _this._lowerCaseTagNames =
            "lowerCaseTags" in _this._options
                ? !!_this._options.lowerCaseTags
                : !_this._options.xmlMode;
        _this._lowerCaseAttributeNames =
            "lowerCaseAttributeNames" in _this._options
                ? !!_this._options.lowerCaseAttributeNames
                : !_this._options.xmlMode;
        _this._tokenizer = new (_this._options.Tokenizer || Tokenizer_1.default)(_this._options, _this);
        if (_this._cbs.onparserinit)
            _this._cbs.onparserinit(_this);
        return _this;
    }
    Parser.prototype._updatePosition = function (initialOffset) {
        if (this.endIndex === null) {
            if (this._tokenizer._sectionStart <= initialOffset) {
                this.startIndex = 0;
            }
            else {
                this.startIndex = this._tokenizer._sectionStart - initialOffset;
            }
        }
        else
            this.startIndex = this.endIndex + 1;
        this.endIndex = this._tokenizer.getAbsoluteIndex();
    };
    //Tokenizer event handlers
    Parser.prototype.ontext = function (data) {
        this._updatePosition(1);
        // @ts-ignore
        this.endIndex--;
        if (this._cbs.ontext)
            this._cbs.ontext(data);
    };
    Parser.prototype.onopentagname = function (name) {
        if (this._lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        this._tagname = name;
        if (!this._options.xmlMode && name in openImpliesClose) {
            for (var el = void 0; 
            // @ts-ignore
            openImpliesClose[name].has((el = this._stack[this._stack.length - 1])); this.onclosetag(el))
                ;
        }
        if (this._options.xmlMode || !voidElements.has(name)) {
            this._stack.push(name);
            if (foreignContextElements.has(name)) {
                this._foreignContext.push(true);
            }
            else if (htmlIntegrationElements.has(name)) {
                this._foreignContext.push(false);
            }
        }
        if (this._cbs.onopentagname)
            this._cbs.onopentagname(name);
        if (this._cbs.onopentag)
            this._attribs = {};
    };
    Parser.prototype.onopentagend = function () {
        this._updatePosition(1);
        if (this._attribs) {
            if (this._cbs.onopentag) {
                this._cbs.onopentag(this._tagname, this._attribs);
            }
            this._attribs = null;
        }
        if (!this._options.xmlMode &&
            this._cbs.onclosetag &&
            voidElements.has(this._tagname)) {
            this._cbs.onclosetag(this._tagname);
        }
        this._tagname = "";
    };
    Parser.prototype.onclosetag = function (name) {
        this._updatePosition(1);
        if (this._lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        if (foreignContextElements.has(name) ||
            htmlIntegrationElements.has(name)) {
            this._foreignContext.pop();
        }
        if (this._stack.length &&
            (this._options.xmlMode || !voidElements.has(name))) {
            var pos = this._stack.lastIndexOf(name);
            if (pos !== -1) {
                if (this._cbs.onclosetag) {
                    pos = this._stack.length - pos;
                    // @ts-ignore
                    while (pos--)
                        this._cbs.onclosetag(this._stack.pop());
                }
                else
                    this._stack.length = pos;
            }
            else if (name === "p" && !this._options.xmlMode) {
                this.onopentagname(name);
                this._closeCurrentTag();
            }
        }
        else if (!this._options.xmlMode && (name === "br" || name === "p")) {
            this.onopentagname(name);
            this._closeCurrentTag();
        }
    };
    Parser.prototype.onselfclosingtag = function () {
        if (this._options.xmlMode ||
            this._options.recognizeSelfClosing ||
            this._foreignContext[this._foreignContext.length - 1]) {
            this._closeCurrentTag();
        }
        else {
            this.onopentagend();
        }
    };
    Parser.prototype._closeCurrentTag = function () {
        var name = this._tagname;
        this.onopentagend();
        //self-closing tags will be on the top of the stack
        //(cheaper check than in onclosetag)
        if (this._stack[this._stack.length - 1] === name) {
            if (this._cbs.onclosetag) {
                this._cbs.onclosetag(name);
            }
            this._stack.pop();
        }
    };
    Parser.prototype.onattribname = function (name) {
        if (this._lowerCaseAttributeNames) {
            name = name.toLowerCase();
        }
        this._attribname = name;
    };
    Parser.prototype.onattribdata = function (value) {
        this._attribvalue += value;
    };
    Parser.prototype.onattribend = function () {
        if (this._cbs.onattribute)
            this._cbs.onattribute(this._attribname, this._attribvalue);
        if (this._attribs &&
            !Object.prototype.hasOwnProperty.call(this._attribs, this._attribname)) {
            this._attribs[this._attribname] = this._attribvalue;
        }
        this._attribname = "";
        this._attribvalue = "";
    };
    Parser.prototype._getInstructionName = function (value) {
        var idx = value.search(reNameEnd);
        var name = idx < 0 ? value : value.substr(0, idx);
        if (this._lowerCaseTagNames) {
            name = name.toLowerCase();
        }
        return name;
    };
    Parser.prototype.ondeclaration = function (value) {
        if (this._cbs.onprocessinginstruction) {
            var name_1 = this._getInstructionName(value);
            this._cbs.onprocessinginstruction("!" + name_1, "!" + value);
        }
    };
    Parser.prototype.onprocessinginstruction = function (value) {
        if (this._cbs.onprocessinginstruction) {
            var name_2 = this._getInstructionName(value);
            this._cbs.onprocessinginstruction("?" + name_2, "?" + value);
        }
    };
    Parser.prototype.oncomment = function (value) {
        this._updatePosition(4);
        if (this._cbs.oncomment)
            this._cbs.oncomment(value);
        if (this._cbs.oncommentend)
            this._cbs.oncommentend();
    };
    Parser.prototype.oncdata = function (value) {
        this._updatePosition(1);
        if (this._options.xmlMode || this._options.recognizeCDATA) {
            if (this._cbs.oncdatastart)
                this._cbs.oncdatastart();
            if (this._cbs.ontext)
                this._cbs.ontext(value);
            if (this._cbs.oncdataend)
                this._cbs.oncdataend();
        }
        else {
            this.oncomment("[CDATA[" + value + "]]");
        }
    };
    Parser.prototype.onerror = function (err) {
        if (this._cbs.onerror)
            this._cbs.onerror(err);
    };
    Parser.prototype.onend = function () {
        if (this._cbs.onclosetag) {
            for (var i = this._stack.length; i > 0; this._cbs.onclosetag(this._stack[--i]))
                ;
        }
        if (this._cbs.onend)
            this._cbs.onend();
    };
    //Resets the parser to a blank state, ready to parse a new HTML document
    Parser.prototype.reset = function () {
        if (this._cbs.onreset)
            this._cbs.onreset();
        this._tokenizer.reset();
        this._tagname = "";
        this._attribname = "";
        this._attribs = null;
        this._stack = [];
        if (this._cbs.onparserinit)
            this._cbs.onparserinit(this);
    };
    //Parses a complete HTML document and pushes it to the handler
    Parser.prototype.parseComplete = function (data) {
        this.reset();
        this.end(data);
    };
    Parser.prototype.write = function (chunk) {
        this._tokenizer.write(chunk);
    };
    Parser.prototype.end = function (chunk) {
        this._tokenizer.end(chunk);
    };
    Parser.prototype.pause = function () {
        this._tokenizer.pause();
    };
    Parser.prototype.resume = function () {
        this._tokenizer.resume();
    };
    return Parser;
}(events_1.EventEmitter));
exports.Parser = Parser;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decode_codepoint_1 = __importDefault(__webpack_require__(5));
var entities_json_1 = __importDefault(__webpack_require__(7));
var legacy_json_1 = __importDefault(__webpack_require__(8));
var xml_json_1 = __importDefault(__webpack_require__(9));
function whitespace(c) {
    return c === " " || c === "\n" || c === "\t" || c === "\f" || c === "\r";
}
function ifElseState(upper, SUCCESS, FAILURE) {
    var lower = upper.toLowerCase();
    if (upper === lower) {
        return function (t, c) {
            if (c === lower) {
                t._state = SUCCESS;
            }
            else {
                t._state = FAILURE;
                t._index--;
            }
        };
    }
    else {
        return function (t, c) {
            if (c === lower || c === upper) {
                t._state = SUCCESS;
            }
            else {
                t._state = FAILURE;
                t._index--;
            }
        };
    }
}
function consumeSpecialNameChar(upper, NEXT_STATE) {
    var lower = upper.toLowerCase();
    return function (t, c) {
        if (c === lower || c === upper) {
            t._state = NEXT_STATE;
        }
        else {
            t._state = 3 /* InTagName */;
            t._index--; //consume the token again
        }
    };
}
var stateBeforeCdata1 = ifElseState("C", 23 /* BeforeCdata2 */, 16 /* InDeclaration */);
var stateBeforeCdata2 = ifElseState("D", 24 /* BeforeCdata3 */, 16 /* InDeclaration */);
var stateBeforeCdata3 = ifElseState("A", 25 /* BeforeCdata4 */, 16 /* InDeclaration */);
var stateBeforeCdata4 = ifElseState("T", 26 /* BeforeCdata5 */, 16 /* InDeclaration */);
var stateBeforeCdata5 = ifElseState("A", 27 /* BeforeCdata6 */, 16 /* InDeclaration */);
var stateBeforeScript1 = consumeSpecialNameChar("R", 34 /* BeforeScript2 */);
var stateBeforeScript2 = consumeSpecialNameChar("I", 35 /* BeforeScript3 */);
var stateBeforeScript3 = consumeSpecialNameChar("P", 36 /* BeforeScript4 */);
var stateBeforeScript4 = consumeSpecialNameChar("T", 37 /* BeforeScript5 */);
var stateAfterScript1 = ifElseState("R", 39 /* AfterScript2 */, 1 /* Text */);
var stateAfterScript2 = ifElseState("I", 40 /* AfterScript3 */, 1 /* Text */);
var stateAfterScript3 = ifElseState("P", 41 /* AfterScript4 */, 1 /* Text */);
var stateAfterScript4 = ifElseState("T", 42 /* AfterScript5 */, 1 /* Text */);
var stateBeforeStyle1 = consumeSpecialNameChar("Y", 44 /* BeforeStyle2 */);
var stateBeforeStyle2 = consumeSpecialNameChar("L", 45 /* BeforeStyle3 */);
var stateBeforeStyle3 = consumeSpecialNameChar("E", 46 /* BeforeStyle4 */);
var stateAfterStyle1 = ifElseState("Y", 48 /* AfterStyle2 */, 1 /* Text */);
var stateAfterStyle2 = ifElseState("L", 49 /* AfterStyle3 */, 1 /* Text */);
var stateAfterStyle3 = ifElseState("E", 50 /* AfterStyle4 */, 1 /* Text */);
var stateBeforeEntity = ifElseState("#", 52 /* BeforeNumericEntity */, 53 /* InNamedEntity */);
var stateBeforeNumericEntity = ifElseState("X", 55 /* InHexEntity */, 54 /* InNumericEntity */);
var Tokenizer = /** @class */ (function () {
    function Tokenizer(options, cbs) {
        /** The current state the tokenizer is in. */
        this._state = 1 /* Text */;
        /** The read buffer. */
        this._buffer = "";
        /** The beginning of the section that is currently being read. */
        this._sectionStart = 0;
        /** The index within the buffer that we are currently looking at. */
        this._index = 0;
        /**
         * Data that has already been processed will be removed from the buffer occasionally.
         * `_bufferOffset` keeps track of how many characters have been removed, to make sure position information is accurate.
         */
        this._bufferOffset = 0;
        /** Some behavior, eg. when decoding entities, is done while we are in another state. This keeps track of the other state type. */
        this._baseState = 1 /* Text */;
        /** For special parsing behavior inside of script and style tags. */
        this._special = 1 /* None */;
        /** Indicates whether the tokenizer has been paused. */
        this._running = true;
        /** Indicates whether the tokenizer has finished running / `.end` has been called. */
        this._ended = false;
        this._cbs = cbs;
        this._xmlMode = !!(options && options.xmlMode);
        this._decodeEntities = !!(options && options.decodeEntities);
    }
    Tokenizer.prototype.reset = function () {
        this._state = 1 /* Text */;
        this._buffer = "";
        this._sectionStart = 0;
        this._index = 0;
        this._bufferOffset = 0;
        this._baseState = 1 /* Text */;
        this._special = 1 /* None */;
        this._running = true;
        this._ended = false;
    };
    Tokenizer.prototype._stateText = function (c) {
        if (c === "<") {
            if (this._index > this._sectionStart) {
                this._cbs.ontext(this._getSection());
            }
            this._state = 2 /* BeforeTagName */;
            this._sectionStart = this._index;
        }
        else if (this._decodeEntities &&
            this._special === 1 /* None */ &&
            c === "&") {
            if (this._index > this._sectionStart) {
                this._cbs.ontext(this._getSection());
            }
            this._baseState = 1 /* Text */;
            this._state = 51 /* BeforeEntity */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateBeforeTagName = function (c) {
        if (c === "/") {
            this._state = 5 /* BeforeClosingTagName */;
        }
        else if (c === "<") {
            this._cbs.ontext(this._getSection());
            this._sectionStart = this._index;
        }
        else if (c === ">" ||
            this._special !== 1 /* None */ ||
            whitespace(c)) {
            this._state = 1 /* Text */;
        }
        else if (c === "!") {
            this._state = 15 /* BeforeDeclaration */;
            this._sectionStart = this._index + 1;
        }
        else if (c === "?") {
            this._state = 17 /* InProcessingInstruction */;
            this._sectionStart = this._index + 1;
        }
        else {
            this._state =
                !this._xmlMode && (c === "s" || c === "S")
                    ? 31 /* BeforeSpecial */
                    : 3 /* InTagName */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateInTagName = function (c) {
        if (c === "/" || c === ">" || whitespace(c)) {
            this._emitToken("onopentagname");
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
    };
    Tokenizer.prototype._stateBeforeCloseingTagName = function (c) {
        if (whitespace(c)) {
            // ignore
        }
        else if (c === ">") {
            this._state = 1 /* Text */;
        }
        else if (this._special !== 1 /* None */) {
            if (c === "s" || c === "S") {
                this._state = 32 /* BeforeSpecialEnd */;
            }
            else {
                this._state = 1 /* Text */;
                this._index--;
            }
        }
        else {
            this._state = 6 /* InClosingTagName */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateInCloseingTagName = function (c) {
        if (c === ">" || whitespace(c)) {
            this._emitToken("onclosetag");
            this._state = 7 /* AfterClosingTagName */;
            this._index--;
        }
    };
    Tokenizer.prototype._stateAfterCloseingTagName = function (c) {
        //skip everything until ">"
        if (c === ">") {
            this._state = 1 /* Text */;
            this._sectionStart = this._index + 1;
        }
    };
    Tokenizer.prototype._stateBeforeAttributeName = function (c) {
        if (c === ">") {
            this._cbs.onopentagend();
            this._state = 1 /* Text */;
            this._sectionStart = this._index + 1;
        }
        else if (c === "/") {
            this._state = 4 /* InSelfClosingTag */;
        }
        else if (!whitespace(c)) {
            this._state = 9 /* InAttributeName */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateInSelfClosingTag = function (c) {
        if (c === ">") {
            this._cbs.onselfclosingtag();
            this._state = 1 /* Text */;
            this._sectionStart = this._index + 1;
        }
        else if (!whitespace(c)) {
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
    };
    Tokenizer.prototype._stateInAttributeName = function (c) {
        if (c === "=" || c === "/" || c === ">" || whitespace(c)) {
            this._cbs.onattribname(this._getSection());
            this._sectionStart = -1;
            this._state = 10 /* AfterAttributeName */;
            this._index--;
        }
    };
    Tokenizer.prototype._stateAfterAttributeName = function (c) {
        if (c === "=") {
            this._state = 11 /* BeforeAttributeValue */;
        }
        else if (c === "/" || c === ">") {
            this._cbs.onattribend();
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
        else if (!whitespace(c)) {
            this._cbs.onattribend();
            this._state = 9 /* InAttributeName */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateBeforeAttributeValue = function (c) {
        if (c === '"') {
            this._state = 12 /* InAttributeValueDq */;
            this._sectionStart = this._index + 1;
        }
        else if (c === "'") {
            this._state = 13 /* InAttributeValueSq */;
            this._sectionStart = this._index + 1;
        }
        else if (!whitespace(c)) {
            this._state = 14 /* InAttributeValueNq */;
            this._sectionStart = this._index;
            this._index--; //reconsume token
        }
    };
    Tokenizer.prototype._stateInAttributeValueDoubleQuotes = function (c) {
        if (c === '"') {
            this._emitToken("onattribdata");
            this._cbs.onattribend();
            this._state = 8 /* BeforeAttributeName */;
        }
        else if (this._decodeEntities && c === "&") {
            this._emitToken("onattribdata");
            this._baseState = this._state;
            this._state = 51 /* BeforeEntity */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateInAttributeValueSingleQuotes = function (c) {
        if (c === "'") {
            this._emitToken("onattribdata");
            this._cbs.onattribend();
            this._state = 8 /* BeforeAttributeName */;
        }
        else if (this._decodeEntities && c === "&") {
            this._emitToken("onattribdata");
            this._baseState = this._state;
            this._state = 51 /* BeforeEntity */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateInAttributeValueNoQuotes = function (c) {
        if (whitespace(c) || c === ">") {
            this._emitToken("onattribdata");
            this._cbs.onattribend();
            this._state = 8 /* BeforeAttributeName */;
            this._index--;
        }
        else if (this._decodeEntities && c === "&") {
            this._emitToken("onattribdata");
            this._baseState = this._state;
            this._state = 51 /* BeforeEntity */;
            this._sectionStart = this._index;
        }
    };
    Tokenizer.prototype._stateBeforeDeclaration = function (c) {
        this._state =
            c === "["
                ? 22 /* BeforeCdata1 */
                : c === "-"
                    ? 18 /* BeforeComment */
                    : 16 /* InDeclaration */;
    };
    Tokenizer.prototype._stateInDeclaration = function (c) {
        if (c === ">") {
            this._cbs.ondeclaration(this._getSection());
            this._state = 1 /* Text */;
            this._sectionStart = this._index + 1;
        }
    };
    Tokenizer.prototype._stateInProcessingInstruction = function (c) {
        if (c === ">") {
            this._cbs.onprocessinginstruction(this._getSection());
            this._state = 1 /* Text */;
            this._sectionStart = this._index + 1;
        }
    };
    Tokenizer.prototype._stateBeforeComment = function (c) {
        if (c === "-") {
            this._state = 19 /* InComment */;
            this._sectionStart = this._index + 1;
        }
        else {
            this._state = 16 /* InDeclaration */;
        }
    };
    Tokenizer.prototype._stateInComment = function (c) {
        if (c === "-")
            this._state = 20 /* AfterComment1 */;
    };
    Tokenizer.prototype._stateAfterComment1 = function (c) {
        if (c === "-") {
            this._state = 21 /* AfterComment2 */;
        }
        else {
            this._state = 19 /* InComment */;
        }
    };
    Tokenizer.prototype._stateAfterComment2 = function (c) {
        if (c === ">") {
            //remove 2 trailing chars
            this._cbs.oncomment(this._buffer.substring(this._sectionStart, this._index - 2));
            this._state = 1 /* Text */;
            this._sectionStart = this._index + 1;
        }
        else if (c !== "-") {
            this._state = 19 /* InComment */;
        }
        // else: stay in AFTER_COMMENT_2 (`--->`)
    };
    Tokenizer.prototype._stateBeforeCdata6 = function (c) {
        if (c === "[") {
            this._state = 28 /* InCdata */;
            this._sectionStart = this._index + 1;
        }
        else {
            this._state = 16 /* InDeclaration */;
            this._index--;
        }
    };
    Tokenizer.prototype._stateInCdata = function (c) {
        if (c === "]")
            this._state = 29 /* AfterCdata1 */;
    };
    Tokenizer.prototype._stateAfterCdata1 = function (c) {
        if (c === "]")
            this._state = 30 /* AfterCdata2 */;
        else
            this._state = 28 /* InCdata */;
    };
    Tokenizer.prototype._stateAfterCdata2 = function (c) {
        if (c === ">") {
            //remove 2 trailing chars
            this._cbs.oncdata(this._buffer.substring(this._sectionStart, this._index - 2));
            this._state = 1 /* Text */;
            this._sectionStart = this._index + 1;
        }
        else if (c !== "]") {
            this._state = 28 /* InCdata */;
        }
        //else: stay in AFTER_CDATA_2 (`]]]>`)
    };
    Tokenizer.prototype._stateBeforeSpecial = function (c) {
        if (c === "c" || c === "C") {
            this._state = 33 /* BeforeScript1 */;
        }
        else if (c === "t" || c === "T") {
            this._state = 43 /* BeforeStyle1 */;
        }
        else {
            this._state = 3 /* InTagName */;
            this._index--; //consume the token again
        }
    };
    Tokenizer.prototype._stateBeforeSpecialEnd = function (c) {
        if (this._special === 2 /* Script */ && (c === "c" || c === "C")) {
            this._state = 38 /* AfterScript1 */;
        }
        else if (this._special === 3 /* Style */ &&
            (c === "t" || c === "T")) {
            this._state = 47 /* AfterStyle1 */;
        }
        else
            this._state = 1 /* Text */;
    };
    Tokenizer.prototype._stateBeforeScript5 = function (c) {
        if (c === "/" || c === ">" || whitespace(c)) {
            this._special = 2 /* Script */;
        }
        this._state = 3 /* InTagName */;
        this._index--; //consume the token again
    };
    Tokenizer.prototype._stateAfterScript5 = function (c) {
        if (c === ">" || whitespace(c)) {
            this._special = 1 /* None */;
            this._state = 6 /* InClosingTagName */;
            this._sectionStart = this._index - 6;
            this._index--; //reconsume the token
        }
        else
            this._state = 1 /* Text */;
    };
    Tokenizer.prototype._stateBeforeStyle4 = function (c) {
        if (c === "/" || c === ">" || whitespace(c)) {
            this._special = 3 /* Style */;
        }
        this._state = 3 /* InTagName */;
        this._index--; //consume the token again
    };
    Tokenizer.prototype._stateAfterStyle4 = function (c) {
        if (c === ">" || whitespace(c)) {
            this._special = 1 /* None */;
            this._state = 6 /* InClosingTagName */;
            this._sectionStart = this._index - 5;
            this._index--; //reconsume the token
        }
        else
            this._state = 1 /* Text */;
    };
    //for entities terminated with a semicolon
    Tokenizer.prototype._parseNamedEntityStrict = function () {
        //offset = 1
        if (this._sectionStart + 1 < this._index) {
            var entity = this._buffer.substring(this._sectionStart + 1, this._index), map = this._xmlMode ? xml_json_1.default : entities_json_1.default;
            if (Object.prototype.hasOwnProperty.call(map, entity)) {
                // @ts-ignore
                this._emitPartial(map[entity]);
                this._sectionStart = this._index + 1;
            }
        }
    };
    //parses legacy entities (without trailing semicolon)
    Tokenizer.prototype._parseLegacyEntity = function () {
        var start = this._sectionStart + 1;
        var limit = this._index - start;
        if (limit > 6)
            limit = 6; // The max length of legacy entities is 6
        while (limit >= 2) {
            // The min length of legacy entities is 2
            var entity = this._buffer.substr(start, limit);
            if (Object.prototype.hasOwnProperty.call(legacy_json_1.default, entity)) {
                // @ts-ignore
                this._emitPartial(legacy_json_1.default[entity]);
                this._sectionStart += limit + 1;
                return;
            }
            else {
                limit--;
            }
        }
    };
    Tokenizer.prototype._stateInNamedEntity = function (c) {
        if (c === ";") {
            this._parseNamedEntityStrict();
            if (this._sectionStart + 1 < this._index && !this._xmlMode) {
                this._parseLegacyEntity();
            }
            this._state = this._baseState;
        }
        else if ((c < "a" || c > "z") &&
            (c < "A" || c > "Z") &&
            (c < "0" || c > "9")) {
            if (this._xmlMode || this._sectionStart + 1 === this._index) {
                // ignore
            }
            else if (this._baseState !== 1 /* Text */) {
                if (c !== "=") {
                    this._parseNamedEntityStrict();
                }
            }
            else {
                this._parseLegacyEntity();
            }
            this._state = this._baseState;
            this._index--;
        }
    };
    Tokenizer.prototype._decodeNumericEntity = function (offset, base) {
        var sectionStart = this._sectionStart + offset;
        if (sectionStart !== this._index) {
            //parse entity
            var entity = this._buffer.substring(sectionStart, this._index);
            var parsed = parseInt(entity, base);
            this._emitPartial(decode_codepoint_1.default(parsed));
            this._sectionStart = this._index;
        }
        else {
            this._sectionStart--;
        }
        this._state = this._baseState;
    };
    Tokenizer.prototype._stateInNumericEntity = function (c) {
        if (c === ";") {
            this._decodeNumericEntity(2, 10);
            this._sectionStart++;
        }
        else if (c < "0" || c > "9") {
            if (!this._xmlMode) {
                this._decodeNumericEntity(2, 10);
            }
            else {
                this._state = this._baseState;
            }
            this._index--;
        }
    };
    Tokenizer.prototype._stateInHexEntity = function (c) {
        if (c === ";") {
            this._decodeNumericEntity(3, 16);
            this._sectionStart++;
        }
        else if ((c < "a" || c > "f") &&
            (c < "A" || c > "F") &&
            (c < "0" || c > "9")) {
            if (!this._xmlMode) {
                this._decodeNumericEntity(3, 16);
            }
            else {
                this._state = this._baseState;
            }
            this._index--;
        }
    };
    Tokenizer.prototype._cleanup = function () {
        if (this._sectionStart < 0) {
            this._buffer = "";
            this._bufferOffset += this._index;
            this._index = 0;
        }
        else if (this._running) {
            if (this._state === 1 /* Text */) {
                if (this._sectionStart !== this._index) {
                    this._cbs.ontext(this._buffer.substr(this._sectionStart));
                }
                this._buffer = "";
                this._bufferOffset += this._index;
                this._index = 0;
            }
            else if (this._sectionStart === this._index) {
                //the section just started
                this._buffer = "";
                this._bufferOffset += this._index;
                this._index = 0;
            }
            else {
                //remove everything unnecessary
                this._buffer = this._buffer.substr(this._sectionStart);
                this._index -= this._sectionStart;
                this._bufferOffset += this._sectionStart;
            }
            this._sectionStart = 0;
        }
    };
    //TODO make events conditional
    Tokenizer.prototype.write = function (chunk) {
        if (this._ended)
            this._cbs.onerror(Error(".write() after done!"));
        this._buffer += chunk;
        this._parse();
    };
    // Iterates through the buffer, calling the function corresponding to the current state.
    // States that are more likely to be hit are higher up, as a performance improvement.
    Tokenizer.prototype._parse = function () {
        while (this._index < this._buffer.length && this._running) {
            var c = this._buffer.charAt(this._index);
            if (this._state === 1 /* Text */) {
                this._stateText(c);
            }
            else if (this._state === 12 /* InAttributeValueDq */) {
                this._stateInAttributeValueDoubleQuotes(c);
            }
            else if (this._state === 9 /* InAttributeName */) {
                this._stateInAttributeName(c);
            }
            else if (this._state === 19 /* InComment */) {
                this._stateInComment(c);
            }
            else if (this._state === 8 /* BeforeAttributeName */) {
                this._stateBeforeAttributeName(c);
            }
            else if (this._state === 3 /* InTagName */) {
                this._stateInTagName(c);
            }
            else if (this._state === 6 /* InClosingTagName */) {
                this._stateInCloseingTagName(c);
            }
            else if (this._state === 2 /* BeforeTagName */) {
                this._stateBeforeTagName(c);
            }
            else if (this._state === 10 /* AfterAttributeName */) {
                this._stateAfterAttributeName(c);
            }
            else if (this._state === 13 /* InAttributeValueSq */) {
                this._stateInAttributeValueSingleQuotes(c);
            }
            else if (this._state === 11 /* BeforeAttributeValue */) {
                this._stateBeforeAttributeValue(c);
            }
            else if (this._state === 5 /* BeforeClosingTagName */) {
                this._stateBeforeCloseingTagName(c);
            }
            else if (this._state === 7 /* AfterClosingTagName */) {
                this._stateAfterCloseingTagName(c);
            }
            else if (this._state === 31 /* BeforeSpecial */) {
                this._stateBeforeSpecial(c);
            }
            else if (this._state === 20 /* AfterComment1 */) {
                this._stateAfterComment1(c);
            }
            else if (this._state === 14 /* InAttributeValueNq */) {
                this._stateInAttributeValueNoQuotes(c);
            }
            else if (this._state === 4 /* InSelfClosingTag */) {
                this._stateInSelfClosingTag(c);
            }
            else if (this._state === 16 /* InDeclaration */) {
                this._stateInDeclaration(c);
            }
            else if (this._state === 15 /* BeforeDeclaration */) {
                this._stateBeforeDeclaration(c);
            }
            else if (this._state === 21 /* AfterComment2 */) {
                this._stateAfterComment2(c);
            }
            else if (this._state === 18 /* BeforeComment */) {
                this._stateBeforeComment(c);
            }
            else if (this._state === 32 /* BeforeSpecialEnd */) {
                this._stateBeforeSpecialEnd(c);
            }
            else if (this._state === 38 /* AfterScript1 */) {
                stateAfterScript1(this, c);
            }
            else if (this._state === 39 /* AfterScript2 */) {
                stateAfterScript2(this, c);
            }
            else if (this._state === 40 /* AfterScript3 */) {
                stateAfterScript3(this, c);
            }
            else if (this._state === 33 /* BeforeScript1 */) {
                stateBeforeScript1(this, c);
            }
            else if (this._state === 34 /* BeforeScript2 */) {
                stateBeforeScript2(this, c);
            }
            else if (this._state === 35 /* BeforeScript3 */) {
                stateBeforeScript3(this, c);
            }
            else if (this._state === 36 /* BeforeScript4 */) {
                stateBeforeScript4(this, c);
            }
            else if (this._state === 37 /* BeforeScript5 */) {
                this._stateBeforeScript5(c);
            }
            else if (this._state === 41 /* AfterScript4 */) {
                stateAfterScript4(this, c);
            }
            else if (this._state === 42 /* AfterScript5 */) {
                this._stateAfterScript5(c);
            }
            else if (this._state === 43 /* BeforeStyle1 */) {
                stateBeforeStyle1(this, c);
            }
            else if (this._state === 28 /* InCdata */) {
                this._stateInCdata(c);
            }
            else if (this._state === 44 /* BeforeStyle2 */) {
                stateBeforeStyle2(this, c);
            }
            else if (this._state === 45 /* BeforeStyle3 */) {
                stateBeforeStyle3(this, c);
            }
            else if (this._state === 46 /* BeforeStyle4 */) {
                this._stateBeforeStyle4(c);
            }
            else if (this._state === 47 /* AfterStyle1 */) {
                stateAfterStyle1(this, c);
            }
            else if (this._state === 48 /* AfterStyle2 */) {
                stateAfterStyle2(this, c);
            }
            else if (this._state === 49 /* AfterStyle3 */) {
                stateAfterStyle3(this, c);
            }
            else if (this._state === 50 /* AfterStyle4 */) {
                this._stateAfterStyle4(c);
            }
            else if (this._state === 17 /* InProcessingInstruction */) {
                this._stateInProcessingInstruction(c);
            }
            else if (this._state === 53 /* InNamedEntity */) {
                this._stateInNamedEntity(c);
            }
            else if (this._state === 22 /* BeforeCdata1 */) {
                stateBeforeCdata1(this, c);
            }
            else if (this._state === 51 /* BeforeEntity */) {
                stateBeforeEntity(this, c);
            }
            else if (this._state === 23 /* BeforeCdata2 */) {
                stateBeforeCdata2(this, c);
            }
            else if (this._state === 24 /* BeforeCdata3 */) {
                stateBeforeCdata3(this, c);
            }
            else if (this._state === 29 /* AfterCdata1 */) {
                this._stateAfterCdata1(c);
            }
            else if (this._state === 30 /* AfterCdata2 */) {
                this._stateAfterCdata2(c);
            }
            else if (this._state === 25 /* BeforeCdata4 */) {
                stateBeforeCdata4(this, c);
            }
            else if (this._state === 26 /* BeforeCdata5 */) {
                stateBeforeCdata5(this, c);
            }
            else if (this._state === 27 /* BeforeCdata6 */) {
                this._stateBeforeCdata6(c);
            }
            else if (this._state === 55 /* InHexEntity */) {
                this._stateInHexEntity(c);
            }
            else if (this._state === 54 /* InNumericEntity */) {
                this._stateInNumericEntity(c);
            }
            else if (this._state === 52 /* BeforeNumericEntity */) {
                stateBeforeNumericEntity(this, c);
            }
            else {
                this._cbs.onerror(Error("unknown _state"), this._state);
            }
            this._index++;
        }
        this._cleanup();
    };
    Tokenizer.prototype.pause = function () {
        this._running = false;
    };
    Tokenizer.prototype.resume = function () {
        this._running = true;
        if (this._index < this._buffer.length) {
            this._parse();
        }
        if (this._ended) {
            this._finish();
        }
    };
    Tokenizer.prototype.end = function (chunk) {
        if (this._ended)
            this._cbs.onerror(Error(".end() after done!"));
        if (chunk)
            this.write(chunk);
        this._ended = true;
        if (this._running)
            this._finish();
    };
    Tokenizer.prototype._finish = function () {
        //if there is remaining data, emit it in a reasonable way
        if (this._sectionStart < this._index) {
            this._handleTrailingData();
        }
        this._cbs.onend();
    };
    Tokenizer.prototype._handleTrailingData = function () {
        var data = this._buffer.substr(this._sectionStart);
        if (this._state === 28 /* InCdata */ ||
            this._state === 29 /* AfterCdata1 */ ||
            this._state === 30 /* AfterCdata2 */) {
            this._cbs.oncdata(data);
        }
        else if (this._state === 19 /* InComment */ ||
            this._state === 20 /* AfterComment1 */ ||
            this._state === 21 /* AfterComment2 */) {
            this._cbs.oncomment(data);
        }
        else if (this._state === 53 /* InNamedEntity */ && !this._xmlMode) {
            this._parseLegacyEntity();
            if (this._sectionStart < this._index) {
                this._state = this._baseState;
                this._handleTrailingData();
            }
        }
        else if (this._state === 54 /* InNumericEntity */ && !this._xmlMode) {
            this._decodeNumericEntity(2, 10);
            if (this._sectionStart < this._index) {
                this._state = this._baseState;
                this._handleTrailingData();
            }
        }
        else if (this._state === 55 /* InHexEntity */ && !this._xmlMode) {
            this._decodeNumericEntity(3, 16);
            if (this._sectionStart < this._index) {
                this._state = this._baseState;
                this._handleTrailingData();
            }
        }
        else if (this._state !== 3 /* InTagName */ &&
            this._state !== 8 /* BeforeAttributeName */ &&
            this._state !== 11 /* BeforeAttributeValue */ &&
            this._state !== 10 /* AfterAttributeName */ &&
            this._state !== 9 /* InAttributeName */ &&
            this._state !== 13 /* InAttributeValueSq */ &&
            this._state !== 12 /* InAttributeValueDq */ &&
            this._state !== 14 /* InAttributeValueNq */ &&
            this._state !== 6 /* InClosingTagName */) {
            this._cbs.ontext(data);
        }
        //else, ignore remaining data
        //TODO add a way to remove current tag
    };
    Tokenizer.prototype.getAbsoluteIndex = function () {
        return this._bufferOffset + this._index;
    };
    Tokenizer.prototype._getSection = function () {
        return this._buffer.substring(this._sectionStart, this._index);
    };
    Tokenizer.prototype._emitToken = function (name) {
        this._cbs[name](this._getSection());
        this._sectionStart = -1;
    };
    Tokenizer.prototype._emitPartial = function (value) {
        if (this._baseState !== 1 /* Text */) {
            this._cbs.onattribdata(value); //TODO implement the new event
        }
        else {
            this._cbs.ontext(value);
        }
    };
    return Tokenizer;
}());
exports.default = Tokenizer;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var decode_json_1 = __importDefault(__webpack_require__(6));
// modified version of https://github.com/mathiasbynens/he/blob/master/src/he.js#L94-L119
function decodeCodePoint(codePoint) {
    if ((codePoint >= 0xd800 && codePoint <= 0xdfff) || codePoint > 0x10ffff) {
        return "\uFFFD";
    }
    if (codePoint in decode_json_1.default) {
        // @ts-ignore
        codePoint = decode_json_1.default[codePoint];
    }
    var output = "";
    if (codePoint > 0xffff) {
        codePoint -= 0x10000;
        output += String.fromCharCode(((codePoint >>> 10) & 0x3ff) | 0xd800);
        codePoint = 0xdc00 | (codePoint & 0x3ff);
    }
    output += String.fromCharCode(codePoint);
    return output;
}
exports.default = decodeCodePoint;


/***/ }),
/* 6 */
/***/ (function(module) {

module.exports = JSON.parse("{\"0\":65533,\"128\":8364,\"130\":8218,\"131\":402,\"132\":8222,\"133\":8230,\"134\":8224,\"135\":8225,\"136\":710,\"137\":8240,\"138\":352,\"139\":8249,\"140\":338,\"142\":381,\"145\":8216,\"146\":8217,\"147\":8220,\"148\":8221,\"149\":8226,\"150\":8211,\"151\":8212,\"152\":732,\"153\":8482,\"154\":353,\"155\":8250,\"156\":339,\"158\":382,\"159\":376}");

/***/ }),
/* 7 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Abreve\":\"Ă\",\"abreve\":\"ă\",\"ac\":\"∾\",\"acd\":\"∿\",\"acE\":\"∾̳\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"Acy\":\"А\",\"acy\":\"а\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"af\":\"⁡\",\"Afr\":\"𝔄\",\"afr\":\"𝔞\",\"Agrave\":\"À\",\"agrave\":\"à\",\"alefsym\":\"ℵ\",\"aleph\":\"ℵ\",\"Alpha\":\"Α\",\"alpha\":\"α\",\"Amacr\":\"Ā\",\"amacr\":\"ā\",\"amalg\":\"⨿\",\"amp\":\"&\",\"AMP\":\"&\",\"andand\":\"⩕\",\"And\":\"⩓\",\"and\":\"∧\",\"andd\":\"⩜\",\"andslope\":\"⩘\",\"andv\":\"⩚\",\"ang\":\"∠\",\"ange\":\"⦤\",\"angle\":\"∠\",\"angmsdaa\":\"⦨\",\"angmsdab\":\"⦩\",\"angmsdac\":\"⦪\",\"angmsdad\":\"⦫\",\"angmsdae\":\"⦬\",\"angmsdaf\":\"⦭\",\"angmsdag\":\"⦮\",\"angmsdah\":\"⦯\",\"angmsd\":\"∡\",\"angrt\":\"∟\",\"angrtvb\":\"⊾\",\"angrtvbd\":\"⦝\",\"angsph\":\"∢\",\"angst\":\"Å\",\"angzarr\":\"⍼\",\"Aogon\":\"Ą\",\"aogon\":\"ą\",\"Aopf\":\"𝔸\",\"aopf\":\"𝕒\",\"apacir\":\"⩯\",\"ap\":\"≈\",\"apE\":\"⩰\",\"ape\":\"≊\",\"apid\":\"≋\",\"apos\":\"'\",\"ApplyFunction\":\"⁡\",\"approx\":\"≈\",\"approxeq\":\"≊\",\"Aring\":\"Å\",\"aring\":\"å\",\"Ascr\":\"𝒜\",\"ascr\":\"𝒶\",\"Assign\":\"≔\",\"ast\":\"*\",\"asymp\":\"≈\",\"asympeq\":\"≍\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"awconint\":\"∳\",\"awint\":\"⨑\",\"backcong\":\"≌\",\"backepsilon\":\"϶\",\"backprime\":\"‵\",\"backsim\":\"∽\",\"backsimeq\":\"⋍\",\"Backslash\":\"∖\",\"Barv\":\"⫧\",\"barvee\":\"⊽\",\"barwed\":\"⌅\",\"Barwed\":\"⌆\",\"barwedge\":\"⌅\",\"bbrk\":\"⎵\",\"bbrktbrk\":\"⎶\",\"bcong\":\"≌\",\"Bcy\":\"Б\",\"bcy\":\"б\",\"bdquo\":\"„\",\"becaus\":\"∵\",\"because\":\"∵\",\"Because\":\"∵\",\"bemptyv\":\"⦰\",\"bepsi\":\"϶\",\"bernou\":\"ℬ\",\"Bernoullis\":\"ℬ\",\"Beta\":\"Β\",\"beta\":\"β\",\"beth\":\"ℶ\",\"between\":\"≬\",\"Bfr\":\"𝔅\",\"bfr\":\"𝔟\",\"bigcap\":\"⋂\",\"bigcirc\":\"◯\",\"bigcup\":\"⋃\",\"bigodot\":\"⨀\",\"bigoplus\":\"⨁\",\"bigotimes\":\"⨂\",\"bigsqcup\":\"⨆\",\"bigstar\":\"★\",\"bigtriangledown\":\"▽\",\"bigtriangleup\":\"△\",\"biguplus\":\"⨄\",\"bigvee\":\"⋁\",\"bigwedge\":\"⋀\",\"bkarow\":\"⤍\",\"blacklozenge\":\"⧫\",\"blacksquare\":\"▪\",\"blacktriangle\":\"▴\",\"blacktriangledown\":\"▾\",\"blacktriangleleft\":\"◂\",\"blacktriangleright\":\"▸\",\"blank\":\"␣\",\"blk12\":\"▒\",\"blk14\":\"░\",\"blk34\":\"▓\",\"block\":\"█\",\"bne\":\"=⃥\",\"bnequiv\":\"≡⃥\",\"bNot\":\"⫭\",\"bnot\":\"⌐\",\"Bopf\":\"𝔹\",\"bopf\":\"𝕓\",\"bot\":\"⊥\",\"bottom\":\"⊥\",\"bowtie\":\"⋈\",\"boxbox\":\"⧉\",\"boxdl\":\"┐\",\"boxdL\":\"╕\",\"boxDl\":\"╖\",\"boxDL\":\"╗\",\"boxdr\":\"┌\",\"boxdR\":\"╒\",\"boxDr\":\"╓\",\"boxDR\":\"╔\",\"boxh\":\"─\",\"boxH\":\"═\",\"boxhd\":\"┬\",\"boxHd\":\"╤\",\"boxhD\":\"╥\",\"boxHD\":\"╦\",\"boxhu\":\"┴\",\"boxHu\":\"╧\",\"boxhU\":\"╨\",\"boxHU\":\"╩\",\"boxminus\":\"⊟\",\"boxplus\":\"⊞\",\"boxtimes\":\"⊠\",\"boxul\":\"┘\",\"boxuL\":\"╛\",\"boxUl\":\"╜\",\"boxUL\":\"╝\",\"boxur\":\"└\",\"boxuR\":\"╘\",\"boxUr\":\"╙\",\"boxUR\":\"╚\",\"boxv\":\"│\",\"boxV\":\"║\",\"boxvh\":\"┼\",\"boxvH\":\"╪\",\"boxVh\":\"╫\",\"boxVH\":\"╬\",\"boxvl\":\"┤\",\"boxvL\":\"╡\",\"boxVl\":\"╢\",\"boxVL\":\"╣\",\"boxvr\":\"├\",\"boxvR\":\"╞\",\"boxVr\":\"╟\",\"boxVR\":\"╠\",\"bprime\":\"‵\",\"breve\":\"˘\",\"Breve\":\"˘\",\"brvbar\":\"¦\",\"bscr\":\"𝒷\",\"Bscr\":\"ℬ\",\"bsemi\":\"⁏\",\"bsim\":\"∽\",\"bsime\":\"⋍\",\"bsolb\":\"⧅\",\"bsol\":\"\\\\\",\"bsolhsub\":\"⟈\",\"bull\":\"•\",\"bullet\":\"•\",\"bump\":\"≎\",\"bumpE\":\"⪮\",\"bumpe\":\"≏\",\"Bumpeq\":\"≎\",\"bumpeq\":\"≏\",\"Cacute\":\"Ć\",\"cacute\":\"ć\",\"capand\":\"⩄\",\"capbrcup\":\"⩉\",\"capcap\":\"⩋\",\"cap\":\"∩\",\"Cap\":\"⋒\",\"capcup\":\"⩇\",\"capdot\":\"⩀\",\"CapitalDifferentialD\":\"ⅅ\",\"caps\":\"∩︀\",\"caret\":\"⁁\",\"caron\":\"ˇ\",\"Cayleys\":\"ℭ\",\"ccaps\":\"⩍\",\"Ccaron\":\"Č\",\"ccaron\":\"č\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"Ccirc\":\"Ĉ\",\"ccirc\":\"ĉ\",\"Cconint\":\"∰\",\"ccups\":\"⩌\",\"ccupssm\":\"⩐\",\"Cdot\":\"Ċ\",\"cdot\":\"ċ\",\"cedil\":\"¸\",\"Cedilla\":\"¸\",\"cemptyv\":\"⦲\",\"cent\":\"¢\",\"centerdot\":\"·\",\"CenterDot\":\"·\",\"cfr\":\"𝔠\",\"Cfr\":\"ℭ\",\"CHcy\":\"Ч\",\"chcy\":\"ч\",\"check\":\"✓\",\"checkmark\":\"✓\",\"Chi\":\"Χ\",\"chi\":\"χ\",\"circ\":\"ˆ\",\"circeq\":\"≗\",\"circlearrowleft\":\"↺\",\"circlearrowright\":\"↻\",\"circledast\":\"⊛\",\"circledcirc\":\"⊚\",\"circleddash\":\"⊝\",\"CircleDot\":\"⊙\",\"circledR\":\"®\",\"circledS\":\"Ⓢ\",\"CircleMinus\":\"⊖\",\"CirclePlus\":\"⊕\",\"CircleTimes\":\"⊗\",\"cir\":\"○\",\"cirE\":\"⧃\",\"cire\":\"≗\",\"cirfnint\":\"⨐\",\"cirmid\":\"⫯\",\"cirscir\":\"⧂\",\"ClockwiseContourIntegral\":\"∲\",\"CloseCurlyDoubleQuote\":\"”\",\"CloseCurlyQuote\":\"’\",\"clubs\":\"♣\",\"clubsuit\":\"♣\",\"colon\":\":\",\"Colon\":\"∷\",\"Colone\":\"⩴\",\"colone\":\"≔\",\"coloneq\":\"≔\",\"comma\":\",\",\"commat\":\"@\",\"comp\":\"∁\",\"compfn\":\"∘\",\"complement\":\"∁\",\"complexes\":\"ℂ\",\"cong\":\"≅\",\"congdot\":\"⩭\",\"Congruent\":\"≡\",\"conint\":\"∮\",\"Conint\":\"∯\",\"ContourIntegral\":\"∮\",\"copf\":\"𝕔\",\"Copf\":\"ℂ\",\"coprod\":\"∐\",\"Coproduct\":\"∐\",\"copy\":\"©\",\"COPY\":\"©\",\"copysr\":\"℗\",\"CounterClockwiseContourIntegral\":\"∳\",\"crarr\":\"↵\",\"cross\":\"✗\",\"Cross\":\"⨯\",\"Cscr\":\"𝒞\",\"cscr\":\"𝒸\",\"csub\":\"⫏\",\"csube\":\"⫑\",\"csup\":\"⫐\",\"csupe\":\"⫒\",\"ctdot\":\"⋯\",\"cudarrl\":\"⤸\",\"cudarrr\":\"⤵\",\"cuepr\":\"⋞\",\"cuesc\":\"⋟\",\"cularr\":\"↶\",\"cularrp\":\"⤽\",\"cupbrcap\":\"⩈\",\"cupcap\":\"⩆\",\"CupCap\":\"≍\",\"cup\":\"∪\",\"Cup\":\"⋓\",\"cupcup\":\"⩊\",\"cupdot\":\"⊍\",\"cupor\":\"⩅\",\"cups\":\"∪︀\",\"curarr\":\"↷\",\"curarrm\":\"⤼\",\"curlyeqprec\":\"⋞\",\"curlyeqsucc\":\"⋟\",\"curlyvee\":\"⋎\",\"curlywedge\":\"⋏\",\"curren\":\"¤\",\"curvearrowleft\":\"↶\",\"curvearrowright\":\"↷\",\"cuvee\":\"⋎\",\"cuwed\":\"⋏\",\"cwconint\":\"∲\",\"cwint\":\"∱\",\"cylcty\":\"⌭\",\"dagger\":\"†\",\"Dagger\":\"‡\",\"daleth\":\"ℸ\",\"darr\":\"↓\",\"Darr\":\"↡\",\"dArr\":\"⇓\",\"dash\":\"‐\",\"Dashv\":\"⫤\",\"dashv\":\"⊣\",\"dbkarow\":\"⤏\",\"dblac\":\"˝\",\"Dcaron\":\"Ď\",\"dcaron\":\"ď\",\"Dcy\":\"Д\",\"dcy\":\"д\",\"ddagger\":\"‡\",\"ddarr\":\"⇊\",\"DD\":\"ⅅ\",\"dd\":\"ⅆ\",\"DDotrahd\":\"⤑\",\"ddotseq\":\"⩷\",\"deg\":\"°\",\"Del\":\"∇\",\"Delta\":\"Δ\",\"delta\":\"δ\",\"demptyv\":\"⦱\",\"dfisht\":\"⥿\",\"Dfr\":\"𝔇\",\"dfr\":\"𝔡\",\"dHar\":\"⥥\",\"dharl\":\"⇃\",\"dharr\":\"⇂\",\"DiacriticalAcute\":\"´\",\"DiacriticalDot\":\"˙\",\"DiacriticalDoubleAcute\":\"˝\",\"DiacriticalGrave\":\"`\",\"DiacriticalTilde\":\"˜\",\"diam\":\"⋄\",\"diamond\":\"⋄\",\"Diamond\":\"⋄\",\"diamondsuit\":\"♦\",\"diams\":\"♦\",\"die\":\"¨\",\"DifferentialD\":\"ⅆ\",\"digamma\":\"ϝ\",\"disin\":\"⋲\",\"div\":\"÷\",\"divide\":\"÷\",\"divideontimes\":\"⋇\",\"divonx\":\"⋇\",\"DJcy\":\"Ђ\",\"djcy\":\"ђ\",\"dlcorn\":\"⌞\",\"dlcrop\":\"⌍\",\"dollar\":\"$\",\"Dopf\":\"𝔻\",\"dopf\":\"𝕕\",\"Dot\":\"¨\",\"dot\":\"˙\",\"DotDot\":\"⃜\",\"doteq\":\"≐\",\"doteqdot\":\"≑\",\"DotEqual\":\"≐\",\"dotminus\":\"∸\",\"dotplus\":\"∔\",\"dotsquare\":\"⊡\",\"doublebarwedge\":\"⌆\",\"DoubleContourIntegral\":\"∯\",\"DoubleDot\":\"¨\",\"DoubleDownArrow\":\"⇓\",\"DoubleLeftArrow\":\"⇐\",\"DoubleLeftRightArrow\":\"⇔\",\"DoubleLeftTee\":\"⫤\",\"DoubleLongLeftArrow\":\"⟸\",\"DoubleLongLeftRightArrow\":\"⟺\",\"DoubleLongRightArrow\":\"⟹\",\"DoubleRightArrow\":\"⇒\",\"DoubleRightTee\":\"⊨\",\"DoubleUpArrow\":\"⇑\",\"DoubleUpDownArrow\":\"⇕\",\"DoubleVerticalBar\":\"∥\",\"DownArrowBar\":\"⤓\",\"downarrow\":\"↓\",\"DownArrow\":\"↓\",\"Downarrow\":\"⇓\",\"DownArrowUpArrow\":\"⇵\",\"DownBreve\":\"̑\",\"downdownarrows\":\"⇊\",\"downharpoonleft\":\"⇃\",\"downharpoonright\":\"⇂\",\"DownLeftRightVector\":\"⥐\",\"DownLeftTeeVector\":\"⥞\",\"DownLeftVectorBar\":\"⥖\",\"DownLeftVector\":\"↽\",\"DownRightTeeVector\":\"⥟\",\"DownRightVectorBar\":\"⥗\",\"DownRightVector\":\"⇁\",\"DownTeeArrow\":\"↧\",\"DownTee\":\"⊤\",\"drbkarow\":\"⤐\",\"drcorn\":\"⌟\",\"drcrop\":\"⌌\",\"Dscr\":\"𝒟\",\"dscr\":\"𝒹\",\"DScy\":\"Ѕ\",\"dscy\":\"ѕ\",\"dsol\":\"⧶\",\"Dstrok\":\"Đ\",\"dstrok\":\"đ\",\"dtdot\":\"⋱\",\"dtri\":\"▿\",\"dtrif\":\"▾\",\"duarr\":\"⇵\",\"duhar\":\"⥯\",\"dwangle\":\"⦦\",\"DZcy\":\"Џ\",\"dzcy\":\"џ\",\"dzigrarr\":\"⟿\",\"Eacute\":\"É\",\"eacute\":\"é\",\"easter\":\"⩮\",\"Ecaron\":\"Ě\",\"ecaron\":\"ě\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"ecir\":\"≖\",\"ecolon\":\"≕\",\"Ecy\":\"Э\",\"ecy\":\"э\",\"eDDot\":\"⩷\",\"Edot\":\"Ė\",\"edot\":\"ė\",\"eDot\":\"≑\",\"ee\":\"ⅇ\",\"efDot\":\"≒\",\"Efr\":\"𝔈\",\"efr\":\"𝔢\",\"eg\":\"⪚\",\"Egrave\":\"È\",\"egrave\":\"è\",\"egs\":\"⪖\",\"egsdot\":\"⪘\",\"el\":\"⪙\",\"Element\":\"∈\",\"elinters\":\"⏧\",\"ell\":\"ℓ\",\"els\":\"⪕\",\"elsdot\":\"⪗\",\"Emacr\":\"Ē\",\"emacr\":\"ē\",\"empty\":\"∅\",\"emptyset\":\"∅\",\"EmptySmallSquare\":\"◻\",\"emptyv\":\"∅\",\"EmptyVerySmallSquare\":\"▫\",\"emsp13\":\" \",\"emsp14\":\" \",\"emsp\":\" \",\"ENG\":\"Ŋ\",\"eng\":\"ŋ\",\"ensp\":\" \",\"Eogon\":\"Ę\",\"eogon\":\"ę\",\"Eopf\":\"𝔼\",\"eopf\":\"𝕖\",\"epar\":\"⋕\",\"eparsl\":\"⧣\",\"eplus\":\"⩱\",\"epsi\":\"ε\",\"Epsilon\":\"Ε\",\"epsilon\":\"ε\",\"epsiv\":\"ϵ\",\"eqcirc\":\"≖\",\"eqcolon\":\"≕\",\"eqsim\":\"≂\",\"eqslantgtr\":\"⪖\",\"eqslantless\":\"⪕\",\"Equal\":\"⩵\",\"equals\":\"=\",\"EqualTilde\":\"≂\",\"equest\":\"≟\",\"Equilibrium\":\"⇌\",\"equiv\":\"≡\",\"equivDD\":\"⩸\",\"eqvparsl\":\"⧥\",\"erarr\":\"⥱\",\"erDot\":\"≓\",\"escr\":\"ℯ\",\"Escr\":\"ℰ\",\"esdot\":\"≐\",\"Esim\":\"⩳\",\"esim\":\"≂\",\"Eta\":\"Η\",\"eta\":\"η\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"euro\":\"€\",\"excl\":\"!\",\"exist\":\"∃\",\"Exists\":\"∃\",\"expectation\":\"ℰ\",\"exponentiale\":\"ⅇ\",\"ExponentialE\":\"ⅇ\",\"fallingdotseq\":\"≒\",\"Fcy\":\"Ф\",\"fcy\":\"ф\",\"female\":\"♀\",\"ffilig\":\"ﬃ\",\"fflig\":\"ﬀ\",\"ffllig\":\"ﬄ\",\"Ffr\":\"𝔉\",\"ffr\":\"𝔣\",\"filig\":\"ﬁ\",\"FilledSmallSquare\":\"◼\",\"FilledVerySmallSquare\":\"▪\",\"fjlig\":\"fj\",\"flat\":\"♭\",\"fllig\":\"ﬂ\",\"fltns\":\"▱\",\"fnof\":\"ƒ\",\"Fopf\":\"𝔽\",\"fopf\":\"𝕗\",\"forall\":\"∀\",\"ForAll\":\"∀\",\"fork\":\"⋔\",\"forkv\":\"⫙\",\"Fouriertrf\":\"ℱ\",\"fpartint\":\"⨍\",\"frac12\":\"½\",\"frac13\":\"⅓\",\"frac14\":\"¼\",\"frac15\":\"⅕\",\"frac16\":\"⅙\",\"frac18\":\"⅛\",\"frac23\":\"⅔\",\"frac25\":\"⅖\",\"frac34\":\"¾\",\"frac35\":\"⅗\",\"frac38\":\"⅜\",\"frac45\":\"⅘\",\"frac56\":\"⅚\",\"frac58\":\"⅝\",\"frac78\":\"⅞\",\"frasl\":\"⁄\",\"frown\":\"⌢\",\"fscr\":\"𝒻\",\"Fscr\":\"ℱ\",\"gacute\":\"ǵ\",\"Gamma\":\"Γ\",\"gamma\":\"γ\",\"Gammad\":\"Ϝ\",\"gammad\":\"ϝ\",\"gap\":\"⪆\",\"Gbreve\":\"Ğ\",\"gbreve\":\"ğ\",\"Gcedil\":\"Ģ\",\"Gcirc\":\"Ĝ\",\"gcirc\":\"ĝ\",\"Gcy\":\"Г\",\"gcy\":\"г\",\"Gdot\":\"Ġ\",\"gdot\":\"ġ\",\"ge\":\"≥\",\"gE\":\"≧\",\"gEl\":\"⪌\",\"gel\":\"⋛\",\"geq\":\"≥\",\"geqq\":\"≧\",\"geqslant\":\"⩾\",\"gescc\":\"⪩\",\"ges\":\"⩾\",\"gesdot\":\"⪀\",\"gesdoto\":\"⪂\",\"gesdotol\":\"⪄\",\"gesl\":\"⋛︀\",\"gesles\":\"⪔\",\"Gfr\":\"𝔊\",\"gfr\":\"𝔤\",\"gg\":\"≫\",\"Gg\":\"⋙\",\"ggg\":\"⋙\",\"gimel\":\"ℷ\",\"GJcy\":\"Ѓ\",\"gjcy\":\"ѓ\",\"gla\":\"⪥\",\"gl\":\"≷\",\"glE\":\"⪒\",\"glj\":\"⪤\",\"gnap\":\"⪊\",\"gnapprox\":\"⪊\",\"gne\":\"⪈\",\"gnE\":\"≩\",\"gneq\":\"⪈\",\"gneqq\":\"≩\",\"gnsim\":\"⋧\",\"Gopf\":\"𝔾\",\"gopf\":\"𝕘\",\"grave\":\"`\",\"GreaterEqual\":\"≥\",\"GreaterEqualLess\":\"⋛\",\"GreaterFullEqual\":\"≧\",\"GreaterGreater\":\"⪢\",\"GreaterLess\":\"≷\",\"GreaterSlantEqual\":\"⩾\",\"GreaterTilde\":\"≳\",\"Gscr\":\"𝒢\",\"gscr\":\"ℊ\",\"gsim\":\"≳\",\"gsime\":\"⪎\",\"gsiml\":\"⪐\",\"gtcc\":\"⪧\",\"gtcir\":\"⩺\",\"gt\":\">\",\"GT\":\">\",\"Gt\":\"≫\",\"gtdot\":\"⋗\",\"gtlPar\":\"⦕\",\"gtquest\":\"⩼\",\"gtrapprox\":\"⪆\",\"gtrarr\":\"⥸\",\"gtrdot\":\"⋗\",\"gtreqless\":\"⋛\",\"gtreqqless\":\"⪌\",\"gtrless\":\"≷\",\"gtrsim\":\"≳\",\"gvertneqq\":\"≩︀\",\"gvnE\":\"≩︀\",\"Hacek\":\"ˇ\",\"hairsp\":\" \",\"half\":\"½\",\"hamilt\":\"ℋ\",\"HARDcy\":\"Ъ\",\"hardcy\":\"ъ\",\"harrcir\":\"⥈\",\"harr\":\"↔\",\"hArr\":\"⇔\",\"harrw\":\"↭\",\"Hat\":\"^\",\"hbar\":\"ℏ\",\"Hcirc\":\"Ĥ\",\"hcirc\":\"ĥ\",\"hearts\":\"♥\",\"heartsuit\":\"♥\",\"hellip\":\"…\",\"hercon\":\"⊹\",\"hfr\":\"𝔥\",\"Hfr\":\"ℌ\",\"HilbertSpace\":\"ℋ\",\"hksearow\":\"⤥\",\"hkswarow\":\"⤦\",\"hoarr\":\"⇿\",\"homtht\":\"∻\",\"hookleftarrow\":\"↩\",\"hookrightarrow\":\"↪\",\"hopf\":\"𝕙\",\"Hopf\":\"ℍ\",\"horbar\":\"―\",\"HorizontalLine\":\"─\",\"hscr\":\"𝒽\",\"Hscr\":\"ℋ\",\"hslash\":\"ℏ\",\"Hstrok\":\"Ħ\",\"hstrok\":\"ħ\",\"HumpDownHump\":\"≎\",\"HumpEqual\":\"≏\",\"hybull\":\"⁃\",\"hyphen\":\"‐\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"ic\":\"⁣\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"Icy\":\"И\",\"icy\":\"и\",\"Idot\":\"İ\",\"IEcy\":\"Е\",\"iecy\":\"е\",\"iexcl\":\"¡\",\"iff\":\"⇔\",\"ifr\":\"𝔦\",\"Ifr\":\"ℑ\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"ii\":\"ⅈ\",\"iiiint\":\"⨌\",\"iiint\":\"∭\",\"iinfin\":\"⧜\",\"iiota\":\"℩\",\"IJlig\":\"Ĳ\",\"ijlig\":\"ĳ\",\"Imacr\":\"Ī\",\"imacr\":\"ī\",\"image\":\"ℑ\",\"ImaginaryI\":\"ⅈ\",\"imagline\":\"ℐ\",\"imagpart\":\"ℑ\",\"imath\":\"ı\",\"Im\":\"ℑ\",\"imof\":\"⊷\",\"imped\":\"Ƶ\",\"Implies\":\"⇒\",\"incare\":\"℅\",\"in\":\"∈\",\"infin\":\"∞\",\"infintie\":\"⧝\",\"inodot\":\"ı\",\"intcal\":\"⊺\",\"int\":\"∫\",\"Int\":\"∬\",\"integers\":\"ℤ\",\"Integral\":\"∫\",\"intercal\":\"⊺\",\"Intersection\":\"⋂\",\"intlarhk\":\"⨗\",\"intprod\":\"⨼\",\"InvisibleComma\":\"⁣\",\"InvisibleTimes\":\"⁢\",\"IOcy\":\"Ё\",\"iocy\":\"ё\",\"Iogon\":\"Į\",\"iogon\":\"į\",\"Iopf\":\"𝕀\",\"iopf\":\"𝕚\",\"Iota\":\"Ι\",\"iota\":\"ι\",\"iprod\":\"⨼\",\"iquest\":\"¿\",\"iscr\":\"𝒾\",\"Iscr\":\"ℐ\",\"isin\":\"∈\",\"isindot\":\"⋵\",\"isinE\":\"⋹\",\"isins\":\"⋴\",\"isinsv\":\"⋳\",\"isinv\":\"∈\",\"it\":\"⁢\",\"Itilde\":\"Ĩ\",\"itilde\":\"ĩ\",\"Iukcy\":\"І\",\"iukcy\":\"і\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"Jcirc\":\"Ĵ\",\"jcirc\":\"ĵ\",\"Jcy\":\"Й\",\"jcy\":\"й\",\"Jfr\":\"𝔍\",\"jfr\":\"𝔧\",\"jmath\":\"ȷ\",\"Jopf\":\"𝕁\",\"jopf\":\"𝕛\",\"Jscr\":\"𝒥\",\"jscr\":\"𝒿\",\"Jsercy\":\"Ј\",\"jsercy\":\"ј\",\"Jukcy\":\"Є\",\"jukcy\":\"є\",\"Kappa\":\"Κ\",\"kappa\":\"κ\",\"kappav\":\"ϰ\",\"Kcedil\":\"Ķ\",\"kcedil\":\"ķ\",\"Kcy\":\"К\",\"kcy\":\"к\",\"Kfr\":\"𝔎\",\"kfr\":\"𝔨\",\"kgreen\":\"ĸ\",\"KHcy\":\"Х\",\"khcy\":\"х\",\"KJcy\":\"Ќ\",\"kjcy\":\"ќ\",\"Kopf\":\"𝕂\",\"kopf\":\"𝕜\",\"Kscr\":\"𝒦\",\"kscr\":\"𝓀\",\"lAarr\":\"⇚\",\"Lacute\":\"Ĺ\",\"lacute\":\"ĺ\",\"laemptyv\":\"⦴\",\"lagran\":\"ℒ\",\"Lambda\":\"Λ\",\"lambda\":\"λ\",\"lang\":\"⟨\",\"Lang\":\"⟪\",\"langd\":\"⦑\",\"langle\":\"⟨\",\"lap\":\"⪅\",\"Laplacetrf\":\"ℒ\",\"laquo\":\"«\",\"larrb\":\"⇤\",\"larrbfs\":\"⤟\",\"larr\":\"←\",\"Larr\":\"↞\",\"lArr\":\"⇐\",\"larrfs\":\"⤝\",\"larrhk\":\"↩\",\"larrlp\":\"↫\",\"larrpl\":\"⤹\",\"larrsim\":\"⥳\",\"larrtl\":\"↢\",\"latail\":\"⤙\",\"lAtail\":\"⤛\",\"lat\":\"⪫\",\"late\":\"⪭\",\"lates\":\"⪭︀\",\"lbarr\":\"⤌\",\"lBarr\":\"⤎\",\"lbbrk\":\"❲\",\"lbrace\":\"{\",\"lbrack\":\"[\",\"lbrke\":\"⦋\",\"lbrksld\":\"⦏\",\"lbrkslu\":\"⦍\",\"Lcaron\":\"Ľ\",\"lcaron\":\"ľ\",\"Lcedil\":\"Ļ\",\"lcedil\":\"ļ\",\"lceil\":\"⌈\",\"lcub\":\"{\",\"Lcy\":\"Л\",\"lcy\":\"л\",\"ldca\":\"⤶\",\"ldquo\":\"“\",\"ldquor\":\"„\",\"ldrdhar\":\"⥧\",\"ldrushar\":\"⥋\",\"ldsh\":\"↲\",\"le\":\"≤\",\"lE\":\"≦\",\"LeftAngleBracket\":\"⟨\",\"LeftArrowBar\":\"⇤\",\"leftarrow\":\"←\",\"LeftArrow\":\"←\",\"Leftarrow\":\"⇐\",\"LeftArrowRightArrow\":\"⇆\",\"leftarrowtail\":\"↢\",\"LeftCeiling\":\"⌈\",\"LeftDoubleBracket\":\"⟦\",\"LeftDownTeeVector\":\"⥡\",\"LeftDownVectorBar\":\"⥙\",\"LeftDownVector\":\"⇃\",\"LeftFloor\":\"⌊\",\"leftharpoondown\":\"↽\",\"leftharpoonup\":\"↼\",\"leftleftarrows\":\"⇇\",\"leftrightarrow\":\"↔\",\"LeftRightArrow\":\"↔\",\"Leftrightarrow\":\"⇔\",\"leftrightarrows\":\"⇆\",\"leftrightharpoons\":\"⇋\",\"leftrightsquigarrow\":\"↭\",\"LeftRightVector\":\"⥎\",\"LeftTeeArrow\":\"↤\",\"LeftTee\":\"⊣\",\"LeftTeeVector\":\"⥚\",\"leftthreetimes\":\"⋋\",\"LeftTriangleBar\":\"⧏\",\"LeftTriangle\":\"⊲\",\"LeftTriangleEqual\":\"⊴\",\"LeftUpDownVector\":\"⥑\",\"LeftUpTeeVector\":\"⥠\",\"LeftUpVectorBar\":\"⥘\",\"LeftUpVector\":\"↿\",\"LeftVectorBar\":\"⥒\",\"LeftVector\":\"↼\",\"lEg\":\"⪋\",\"leg\":\"⋚\",\"leq\":\"≤\",\"leqq\":\"≦\",\"leqslant\":\"⩽\",\"lescc\":\"⪨\",\"les\":\"⩽\",\"lesdot\":\"⩿\",\"lesdoto\":\"⪁\",\"lesdotor\":\"⪃\",\"lesg\":\"⋚︀\",\"lesges\":\"⪓\",\"lessapprox\":\"⪅\",\"lessdot\":\"⋖\",\"lesseqgtr\":\"⋚\",\"lesseqqgtr\":\"⪋\",\"LessEqualGreater\":\"⋚\",\"LessFullEqual\":\"≦\",\"LessGreater\":\"≶\",\"lessgtr\":\"≶\",\"LessLess\":\"⪡\",\"lesssim\":\"≲\",\"LessSlantEqual\":\"⩽\",\"LessTilde\":\"≲\",\"lfisht\":\"⥼\",\"lfloor\":\"⌊\",\"Lfr\":\"𝔏\",\"lfr\":\"𝔩\",\"lg\":\"≶\",\"lgE\":\"⪑\",\"lHar\":\"⥢\",\"lhard\":\"↽\",\"lharu\":\"↼\",\"lharul\":\"⥪\",\"lhblk\":\"▄\",\"LJcy\":\"Љ\",\"ljcy\":\"љ\",\"llarr\":\"⇇\",\"ll\":\"≪\",\"Ll\":\"⋘\",\"llcorner\":\"⌞\",\"Lleftarrow\":\"⇚\",\"llhard\":\"⥫\",\"lltri\":\"◺\",\"Lmidot\":\"Ŀ\",\"lmidot\":\"ŀ\",\"lmoustache\":\"⎰\",\"lmoust\":\"⎰\",\"lnap\":\"⪉\",\"lnapprox\":\"⪉\",\"lne\":\"⪇\",\"lnE\":\"≨\",\"lneq\":\"⪇\",\"lneqq\":\"≨\",\"lnsim\":\"⋦\",\"loang\":\"⟬\",\"loarr\":\"⇽\",\"lobrk\":\"⟦\",\"longleftarrow\":\"⟵\",\"LongLeftArrow\":\"⟵\",\"Longleftarrow\":\"⟸\",\"longleftrightarrow\":\"⟷\",\"LongLeftRightArrow\":\"⟷\",\"Longleftrightarrow\":\"⟺\",\"longmapsto\":\"⟼\",\"longrightarrow\":\"⟶\",\"LongRightArrow\":\"⟶\",\"Longrightarrow\":\"⟹\",\"looparrowleft\":\"↫\",\"looparrowright\":\"↬\",\"lopar\":\"⦅\",\"Lopf\":\"𝕃\",\"lopf\":\"𝕝\",\"loplus\":\"⨭\",\"lotimes\":\"⨴\",\"lowast\":\"∗\",\"lowbar\":\"_\",\"LowerLeftArrow\":\"↙\",\"LowerRightArrow\":\"↘\",\"loz\":\"◊\",\"lozenge\":\"◊\",\"lozf\":\"⧫\",\"lpar\":\"(\",\"lparlt\":\"⦓\",\"lrarr\":\"⇆\",\"lrcorner\":\"⌟\",\"lrhar\":\"⇋\",\"lrhard\":\"⥭\",\"lrm\":\"‎\",\"lrtri\":\"⊿\",\"lsaquo\":\"‹\",\"lscr\":\"𝓁\",\"Lscr\":\"ℒ\",\"lsh\":\"↰\",\"Lsh\":\"↰\",\"lsim\":\"≲\",\"lsime\":\"⪍\",\"lsimg\":\"⪏\",\"lsqb\":\"[\",\"lsquo\":\"‘\",\"lsquor\":\"‚\",\"Lstrok\":\"Ł\",\"lstrok\":\"ł\",\"ltcc\":\"⪦\",\"ltcir\":\"⩹\",\"lt\":\"<\",\"LT\":\"<\",\"Lt\":\"≪\",\"ltdot\":\"⋖\",\"lthree\":\"⋋\",\"ltimes\":\"⋉\",\"ltlarr\":\"⥶\",\"ltquest\":\"⩻\",\"ltri\":\"◃\",\"ltrie\":\"⊴\",\"ltrif\":\"◂\",\"ltrPar\":\"⦖\",\"lurdshar\":\"⥊\",\"luruhar\":\"⥦\",\"lvertneqq\":\"≨︀\",\"lvnE\":\"≨︀\",\"macr\":\"¯\",\"male\":\"♂\",\"malt\":\"✠\",\"maltese\":\"✠\",\"Map\":\"⤅\",\"map\":\"↦\",\"mapsto\":\"↦\",\"mapstodown\":\"↧\",\"mapstoleft\":\"↤\",\"mapstoup\":\"↥\",\"marker\":\"▮\",\"mcomma\":\"⨩\",\"Mcy\":\"М\",\"mcy\":\"м\",\"mdash\":\"—\",\"mDDot\":\"∺\",\"measuredangle\":\"∡\",\"MediumSpace\":\" \",\"Mellintrf\":\"ℳ\",\"Mfr\":\"𝔐\",\"mfr\":\"𝔪\",\"mho\":\"℧\",\"micro\":\"µ\",\"midast\":\"*\",\"midcir\":\"⫰\",\"mid\":\"∣\",\"middot\":\"·\",\"minusb\":\"⊟\",\"minus\":\"−\",\"minusd\":\"∸\",\"minusdu\":\"⨪\",\"MinusPlus\":\"∓\",\"mlcp\":\"⫛\",\"mldr\":\"…\",\"mnplus\":\"∓\",\"models\":\"⊧\",\"Mopf\":\"𝕄\",\"mopf\":\"𝕞\",\"mp\":\"∓\",\"mscr\":\"𝓂\",\"Mscr\":\"ℳ\",\"mstpos\":\"∾\",\"Mu\":\"Μ\",\"mu\":\"μ\",\"multimap\":\"⊸\",\"mumap\":\"⊸\",\"nabla\":\"∇\",\"Nacute\":\"Ń\",\"nacute\":\"ń\",\"nang\":\"∠⃒\",\"nap\":\"≉\",\"napE\":\"⩰̸\",\"napid\":\"≋̸\",\"napos\":\"ŉ\",\"napprox\":\"≉\",\"natural\":\"♮\",\"naturals\":\"ℕ\",\"natur\":\"♮\",\"nbsp\":\" \",\"nbump\":\"≎̸\",\"nbumpe\":\"≏̸\",\"ncap\":\"⩃\",\"Ncaron\":\"Ň\",\"ncaron\":\"ň\",\"Ncedil\":\"Ņ\",\"ncedil\":\"ņ\",\"ncong\":\"≇\",\"ncongdot\":\"⩭̸\",\"ncup\":\"⩂\",\"Ncy\":\"Н\",\"ncy\":\"н\",\"ndash\":\"–\",\"nearhk\":\"⤤\",\"nearr\":\"↗\",\"neArr\":\"⇗\",\"nearrow\":\"↗\",\"ne\":\"≠\",\"nedot\":\"≐̸\",\"NegativeMediumSpace\":\"​\",\"NegativeThickSpace\":\"​\",\"NegativeThinSpace\":\"​\",\"NegativeVeryThinSpace\":\"​\",\"nequiv\":\"≢\",\"nesear\":\"⤨\",\"nesim\":\"≂̸\",\"NestedGreaterGreater\":\"≫\",\"NestedLessLess\":\"≪\",\"NewLine\":\"\\n\",\"nexist\":\"∄\",\"nexists\":\"∄\",\"Nfr\":\"𝔑\",\"nfr\":\"𝔫\",\"ngE\":\"≧̸\",\"nge\":\"≱\",\"ngeq\":\"≱\",\"ngeqq\":\"≧̸\",\"ngeqslant\":\"⩾̸\",\"nges\":\"⩾̸\",\"nGg\":\"⋙̸\",\"ngsim\":\"≵\",\"nGt\":\"≫⃒\",\"ngt\":\"≯\",\"ngtr\":\"≯\",\"nGtv\":\"≫̸\",\"nharr\":\"↮\",\"nhArr\":\"⇎\",\"nhpar\":\"⫲\",\"ni\":\"∋\",\"nis\":\"⋼\",\"nisd\":\"⋺\",\"niv\":\"∋\",\"NJcy\":\"Њ\",\"njcy\":\"њ\",\"nlarr\":\"↚\",\"nlArr\":\"⇍\",\"nldr\":\"‥\",\"nlE\":\"≦̸\",\"nle\":\"≰\",\"nleftarrow\":\"↚\",\"nLeftarrow\":\"⇍\",\"nleftrightarrow\":\"↮\",\"nLeftrightarrow\":\"⇎\",\"nleq\":\"≰\",\"nleqq\":\"≦̸\",\"nleqslant\":\"⩽̸\",\"nles\":\"⩽̸\",\"nless\":\"≮\",\"nLl\":\"⋘̸\",\"nlsim\":\"≴\",\"nLt\":\"≪⃒\",\"nlt\":\"≮\",\"nltri\":\"⋪\",\"nltrie\":\"⋬\",\"nLtv\":\"≪̸\",\"nmid\":\"∤\",\"NoBreak\":\"⁠\",\"NonBreakingSpace\":\" \",\"nopf\":\"𝕟\",\"Nopf\":\"ℕ\",\"Not\":\"⫬\",\"not\":\"¬\",\"NotCongruent\":\"≢\",\"NotCupCap\":\"≭\",\"NotDoubleVerticalBar\":\"∦\",\"NotElement\":\"∉\",\"NotEqual\":\"≠\",\"NotEqualTilde\":\"≂̸\",\"NotExists\":\"∄\",\"NotGreater\":\"≯\",\"NotGreaterEqual\":\"≱\",\"NotGreaterFullEqual\":\"≧̸\",\"NotGreaterGreater\":\"≫̸\",\"NotGreaterLess\":\"≹\",\"NotGreaterSlantEqual\":\"⩾̸\",\"NotGreaterTilde\":\"≵\",\"NotHumpDownHump\":\"≎̸\",\"NotHumpEqual\":\"≏̸\",\"notin\":\"∉\",\"notindot\":\"⋵̸\",\"notinE\":\"⋹̸\",\"notinva\":\"∉\",\"notinvb\":\"⋷\",\"notinvc\":\"⋶\",\"NotLeftTriangleBar\":\"⧏̸\",\"NotLeftTriangle\":\"⋪\",\"NotLeftTriangleEqual\":\"⋬\",\"NotLess\":\"≮\",\"NotLessEqual\":\"≰\",\"NotLessGreater\":\"≸\",\"NotLessLess\":\"≪̸\",\"NotLessSlantEqual\":\"⩽̸\",\"NotLessTilde\":\"≴\",\"NotNestedGreaterGreater\":\"⪢̸\",\"NotNestedLessLess\":\"⪡̸\",\"notni\":\"∌\",\"notniva\":\"∌\",\"notnivb\":\"⋾\",\"notnivc\":\"⋽\",\"NotPrecedes\":\"⊀\",\"NotPrecedesEqual\":\"⪯̸\",\"NotPrecedesSlantEqual\":\"⋠\",\"NotReverseElement\":\"∌\",\"NotRightTriangleBar\":\"⧐̸\",\"NotRightTriangle\":\"⋫\",\"NotRightTriangleEqual\":\"⋭\",\"NotSquareSubset\":\"⊏̸\",\"NotSquareSubsetEqual\":\"⋢\",\"NotSquareSuperset\":\"⊐̸\",\"NotSquareSupersetEqual\":\"⋣\",\"NotSubset\":\"⊂⃒\",\"NotSubsetEqual\":\"⊈\",\"NotSucceeds\":\"⊁\",\"NotSucceedsEqual\":\"⪰̸\",\"NotSucceedsSlantEqual\":\"⋡\",\"NotSucceedsTilde\":\"≿̸\",\"NotSuperset\":\"⊃⃒\",\"NotSupersetEqual\":\"⊉\",\"NotTilde\":\"≁\",\"NotTildeEqual\":\"≄\",\"NotTildeFullEqual\":\"≇\",\"NotTildeTilde\":\"≉\",\"NotVerticalBar\":\"∤\",\"nparallel\":\"∦\",\"npar\":\"∦\",\"nparsl\":\"⫽⃥\",\"npart\":\"∂̸\",\"npolint\":\"⨔\",\"npr\":\"⊀\",\"nprcue\":\"⋠\",\"nprec\":\"⊀\",\"npreceq\":\"⪯̸\",\"npre\":\"⪯̸\",\"nrarrc\":\"⤳̸\",\"nrarr\":\"↛\",\"nrArr\":\"⇏\",\"nrarrw\":\"↝̸\",\"nrightarrow\":\"↛\",\"nRightarrow\":\"⇏\",\"nrtri\":\"⋫\",\"nrtrie\":\"⋭\",\"nsc\":\"⊁\",\"nsccue\":\"⋡\",\"nsce\":\"⪰̸\",\"Nscr\":\"𝒩\",\"nscr\":\"𝓃\",\"nshortmid\":\"∤\",\"nshortparallel\":\"∦\",\"nsim\":\"≁\",\"nsime\":\"≄\",\"nsimeq\":\"≄\",\"nsmid\":\"∤\",\"nspar\":\"∦\",\"nsqsube\":\"⋢\",\"nsqsupe\":\"⋣\",\"nsub\":\"⊄\",\"nsubE\":\"⫅̸\",\"nsube\":\"⊈\",\"nsubset\":\"⊂⃒\",\"nsubseteq\":\"⊈\",\"nsubseteqq\":\"⫅̸\",\"nsucc\":\"⊁\",\"nsucceq\":\"⪰̸\",\"nsup\":\"⊅\",\"nsupE\":\"⫆̸\",\"nsupe\":\"⊉\",\"nsupset\":\"⊃⃒\",\"nsupseteq\":\"⊉\",\"nsupseteqq\":\"⫆̸\",\"ntgl\":\"≹\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"ntlg\":\"≸\",\"ntriangleleft\":\"⋪\",\"ntrianglelefteq\":\"⋬\",\"ntriangleright\":\"⋫\",\"ntrianglerighteq\":\"⋭\",\"Nu\":\"Ν\",\"nu\":\"ν\",\"num\":\"#\",\"numero\":\"№\",\"numsp\":\" \",\"nvap\":\"≍⃒\",\"nvdash\":\"⊬\",\"nvDash\":\"⊭\",\"nVdash\":\"⊮\",\"nVDash\":\"⊯\",\"nvge\":\"≥⃒\",\"nvgt\":\">⃒\",\"nvHarr\":\"⤄\",\"nvinfin\":\"⧞\",\"nvlArr\":\"⤂\",\"nvle\":\"≤⃒\",\"nvlt\":\"<⃒\",\"nvltrie\":\"⊴⃒\",\"nvrArr\":\"⤃\",\"nvrtrie\":\"⊵⃒\",\"nvsim\":\"∼⃒\",\"nwarhk\":\"⤣\",\"nwarr\":\"↖\",\"nwArr\":\"⇖\",\"nwarrow\":\"↖\",\"nwnear\":\"⤧\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"oast\":\"⊛\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"ocir\":\"⊚\",\"Ocy\":\"О\",\"ocy\":\"о\",\"odash\":\"⊝\",\"Odblac\":\"Ő\",\"odblac\":\"ő\",\"odiv\":\"⨸\",\"odot\":\"⊙\",\"odsold\":\"⦼\",\"OElig\":\"Œ\",\"oelig\":\"œ\",\"ofcir\":\"⦿\",\"Ofr\":\"𝔒\",\"ofr\":\"𝔬\",\"ogon\":\"˛\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ogt\":\"⧁\",\"ohbar\":\"⦵\",\"ohm\":\"Ω\",\"oint\":\"∮\",\"olarr\":\"↺\",\"olcir\":\"⦾\",\"olcross\":\"⦻\",\"oline\":\"‾\",\"olt\":\"⧀\",\"Omacr\":\"Ō\",\"omacr\":\"ō\",\"Omega\":\"Ω\",\"omega\":\"ω\",\"Omicron\":\"Ο\",\"omicron\":\"ο\",\"omid\":\"⦶\",\"ominus\":\"⊖\",\"Oopf\":\"𝕆\",\"oopf\":\"𝕠\",\"opar\":\"⦷\",\"OpenCurlyDoubleQuote\":\"“\",\"OpenCurlyQuote\":\"‘\",\"operp\":\"⦹\",\"oplus\":\"⊕\",\"orarr\":\"↻\",\"Or\":\"⩔\",\"or\":\"∨\",\"ord\":\"⩝\",\"order\":\"ℴ\",\"orderof\":\"ℴ\",\"ordf\":\"ª\",\"ordm\":\"º\",\"origof\":\"⊶\",\"oror\":\"⩖\",\"orslope\":\"⩗\",\"orv\":\"⩛\",\"oS\":\"Ⓢ\",\"Oscr\":\"𝒪\",\"oscr\":\"ℴ\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"osol\":\"⊘\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"otimesas\":\"⨶\",\"Otimes\":\"⨷\",\"otimes\":\"⊗\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"ovbar\":\"⌽\",\"OverBar\":\"‾\",\"OverBrace\":\"⏞\",\"OverBracket\":\"⎴\",\"OverParenthesis\":\"⏜\",\"para\":\"¶\",\"parallel\":\"∥\",\"par\":\"∥\",\"parsim\":\"⫳\",\"parsl\":\"⫽\",\"part\":\"∂\",\"PartialD\":\"∂\",\"Pcy\":\"П\",\"pcy\":\"п\",\"percnt\":\"%\",\"period\":\".\",\"permil\":\"‰\",\"perp\":\"⊥\",\"pertenk\":\"‱\",\"Pfr\":\"𝔓\",\"pfr\":\"𝔭\",\"Phi\":\"Φ\",\"phi\":\"φ\",\"phiv\":\"ϕ\",\"phmmat\":\"ℳ\",\"phone\":\"☎\",\"Pi\":\"Π\",\"pi\":\"π\",\"pitchfork\":\"⋔\",\"piv\":\"ϖ\",\"planck\":\"ℏ\",\"planckh\":\"ℎ\",\"plankv\":\"ℏ\",\"plusacir\":\"⨣\",\"plusb\":\"⊞\",\"pluscir\":\"⨢\",\"plus\":\"+\",\"plusdo\":\"∔\",\"plusdu\":\"⨥\",\"pluse\":\"⩲\",\"PlusMinus\":\"±\",\"plusmn\":\"±\",\"plussim\":\"⨦\",\"plustwo\":\"⨧\",\"pm\":\"±\",\"Poincareplane\":\"ℌ\",\"pointint\":\"⨕\",\"popf\":\"𝕡\",\"Popf\":\"ℙ\",\"pound\":\"£\",\"prap\":\"⪷\",\"Pr\":\"⪻\",\"pr\":\"≺\",\"prcue\":\"≼\",\"precapprox\":\"⪷\",\"prec\":\"≺\",\"preccurlyeq\":\"≼\",\"Precedes\":\"≺\",\"PrecedesEqual\":\"⪯\",\"PrecedesSlantEqual\":\"≼\",\"PrecedesTilde\":\"≾\",\"preceq\":\"⪯\",\"precnapprox\":\"⪹\",\"precneqq\":\"⪵\",\"precnsim\":\"⋨\",\"pre\":\"⪯\",\"prE\":\"⪳\",\"precsim\":\"≾\",\"prime\":\"′\",\"Prime\":\"″\",\"primes\":\"ℙ\",\"prnap\":\"⪹\",\"prnE\":\"⪵\",\"prnsim\":\"⋨\",\"prod\":\"∏\",\"Product\":\"∏\",\"profalar\":\"⌮\",\"profline\":\"⌒\",\"profsurf\":\"⌓\",\"prop\":\"∝\",\"Proportional\":\"∝\",\"Proportion\":\"∷\",\"propto\":\"∝\",\"prsim\":\"≾\",\"prurel\":\"⊰\",\"Pscr\":\"𝒫\",\"pscr\":\"𝓅\",\"Psi\":\"Ψ\",\"psi\":\"ψ\",\"puncsp\":\" \",\"Qfr\":\"𝔔\",\"qfr\":\"𝔮\",\"qint\":\"⨌\",\"qopf\":\"𝕢\",\"Qopf\":\"ℚ\",\"qprime\":\"⁗\",\"Qscr\":\"𝒬\",\"qscr\":\"𝓆\",\"quaternions\":\"ℍ\",\"quatint\":\"⨖\",\"quest\":\"?\",\"questeq\":\"≟\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"rAarr\":\"⇛\",\"race\":\"∽̱\",\"Racute\":\"Ŕ\",\"racute\":\"ŕ\",\"radic\":\"√\",\"raemptyv\":\"⦳\",\"rang\":\"⟩\",\"Rang\":\"⟫\",\"rangd\":\"⦒\",\"range\":\"⦥\",\"rangle\":\"⟩\",\"raquo\":\"»\",\"rarrap\":\"⥵\",\"rarrb\":\"⇥\",\"rarrbfs\":\"⤠\",\"rarrc\":\"⤳\",\"rarr\":\"→\",\"Rarr\":\"↠\",\"rArr\":\"⇒\",\"rarrfs\":\"⤞\",\"rarrhk\":\"↪\",\"rarrlp\":\"↬\",\"rarrpl\":\"⥅\",\"rarrsim\":\"⥴\",\"Rarrtl\":\"⤖\",\"rarrtl\":\"↣\",\"rarrw\":\"↝\",\"ratail\":\"⤚\",\"rAtail\":\"⤜\",\"ratio\":\"∶\",\"rationals\":\"ℚ\",\"rbarr\":\"⤍\",\"rBarr\":\"⤏\",\"RBarr\":\"⤐\",\"rbbrk\":\"❳\",\"rbrace\":\"}\",\"rbrack\":\"]\",\"rbrke\":\"⦌\",\"rbrksld\":\"⦎\",\"rbrkslu\":\"⦐\",\"Rcaron\":\"Ř\",\"rcaron\":\"ř\",\"Rcedil\":\"Ŗ\",\"rcedil\":\"ŗ\",\"rceil\":\"⌉\",\"rcub\":\"}\",\"Rcy\":\"Р\",\"rcy\":\"р\",\"rdca\":\"⤷\",\"rdldhar\":\"⥩\",\"rdquo\":\"”\",\"rdquor\":\"”\",\"rdsh\":\"↳\",\"real\":\"ℜ\",\"realine\":\"ℛ\",\"realpart\":\"ℜ\",\"reals\":\"ℝ\",\"Re\":\"ℜ\",\"rect\":\"▭\",\"reg\":\"®\",\"REG\":\"®\",\"ReverseElement\":\"∋\",\"ReverseEquilibrium\":\"⇋\",\"ReverseUpEquilibrium\":\"⥯\",\"rfisht\":\"⥽\",\"rfloor\":\"⌋\",\"rfr\":\"𝔯\",\"Rfr\":\"ℜ\",\"rHar\":\"⥤\",\"rhard\":\"⇁\",\"rharu\":\"⇀\",\"rharul\":\"⥬\",\"Rho\":\"Ρ\",\"rho\":\"ρ\",\"rhov\":\"ϱ\",\"RightAngleBracket\":\"⟩\",\"RightArrowBar\":\"⇥\",\"rightarrow\":\"→\",\"RightArrow\":\"→\",\"Rightarrow\":\"⇒\",\"RightArrowLeftArrow\":\"⇄\",\"rightarrowtail\":\"↣\",\"RightCeiling\":\"⌉\",\"RightDoubleBracket\":\"⟧\",\"RightDownTeeVector\":\"⥝\",\"RightDownVectorBar\":\"⥕\",\"RightDownVector\":\"⇂\",\"RightFloor\":\"⌋\",\"rightharpoondown\":\"⇁\",\"rightharpoonup\":\"⇀\",\"rightleftarrows\":\"⇄\",\"rightleftharpoons\":\"⇌\",\"rightrightarrows\":\"⇉\",\"rightsquigarrow\":\"↝\",\"RightTeeArrow\":\"↦\",\"RightTee\":\"⊢\",\"RightTeeVector\":\"⥛\",\"rightthreetimes\":\"⋌\",\"RightTriangleBar\":\"⧐\",\"RightTriangle\":\"⊳\",\"RightTriangleEqual\":\"⊵\",\"RightUpDownVector\":\"⥏\",\"RightUpTeeVector\":\"⥜\",\"RightUpVectorBar\":\"⥔\",\"RightUpVector\":\"↾\",\"RightVectorBar\":\"⥓\",\"RightVector\":\"⇀\",\"ring\":\"˚\",\"risingdotseq\":\"≓\",\"rlarr\":\"⇄\",\"rlhar\":\"⇌\",\"rlm\":\"‏\",\"rmoustache\":\"⎱\",\"rmoust\":\"⎱\",\"rnmid\":\"⫮\",\"roang\":\"⟭\",\"roarr\":\"⇾\",\"robrk\":\"⟧\",\"ropar\":\"⦆\",\"ropf\":\"𝕣\",\"Ropf\":\"ℝ\",\"roplus\":\"⨮\",\"rotimes\":\"⨵\",\"RoundImplies\":\"⥰\",\"rpar\":\")\",\"rpargt\":\"⦔\",\"rppolint\":\"⨒\",\"rrarr\":\"⇉\",\"Rrightarrow\":\"⇛\",\"rsaquo\":\"›\",\"rscr\":\"𝓇\",\"Rscr\":\"ℛ\",\"rsh\":\"↱\",\"Rsh\":\"↱\",\"rsqb\":\"]\",\"rsquo\":\"’\",\"rsquor\":\"’\",\"rthree\":\"⋌\",\"rtimes\":\"⋊\",\"rtri\":\"▹\",\"rtrie\":\"⊵\",\"rtrif\":\"▸\",\"rtriltri\":\"⧎\",\"RuleDelayed\":\"⧴\",\"ruluhar\":\"⥨\",\"rx\":\"℞\",\"Sacute\":\"Ś\",\"sacute\":\"ś\",\"sbquo\":\"‚\",\"scap\":\"⪸\",\"Scaron\":\"Š\",\"scaron\":\"š\",\"Sc\":\"⪼\",\"sc\":\"≻\",\"sccue\":\"≽\",\"sce\":\"⪰\",\"scE\":\"⪴\",\"Scedil\":\"Ş\",\"scedil\":\"ş\",\"Scirc\":\"Ŝ\",\"scirc\":\"ŝ\",\"scnap\":\"⪺\",\"scnE\":\"⪶\",\"scnsim\":\"⋩\",\"scpolint\":\"⨓\",\"scsim\":\"≿\",\"Scy\":\"С\",\"scy\":\"с\",\"sdotb\":\"⊡\",\"sdot\":\"⋅\",\"sdote\":\"⩦\",\"searhk\":\"⤥\",\"searr\":\"↘\",\"seArr\":\"⇘\",\"searrow\":\"↘\",\"sect\":\"§\",\"semi\":\";\",\"seswar\":\"⤩\",\"setminus\":\"∖\",\"setmn\":\"∖\",\"sext\":\"✶\",\"Sfr\":\"𝔖\",\"sfr\":\"𝔰\",\"sfrown\":\"⌢\",\"sharp\":\"♯\",\"SHCHcy\":\"Щ\",\"shchcy\":\"щ\",\"SHcy\":\"Ш\",\"shcy\":\"ш\",\"ShortDownArrow\":\"↓\",\"ShortLeftArrow\":\"←\",\"shortmid\":\"∣\",\"shortparallel\":\"∥\",\"ShortRightArrow\":\"→\",\"ShortUpArrow\":\"↑\",\"shy\":\"­\",\"Sigma\":\"Σ\",\"sigma\":\"σ\",\"sigmaf\":\"ς\",\"sigmav\":\"ς\",\"sim\":\"∼\",\"simdot\":\"⩪\",\"sime\":\"≃\",\"simeq\":\"≃\",\"simg\":\"⪞\",\"simgE\":\"⪠\",\"siml\":\"⪝\",\"simlE\":\"⪟\",\"simne\":\"≆\",\"simplus\":\"⨤\",\"simrarr\":\"⥲\",\"slarr\":\"←\",\"SmallCircle\":\"∘\",\"smallsetminus\":\"∖\",\"smashp\":\"⨳\",\"smeparsl\":\"⧤\",\"smid\":\"∣\",\"smile\":\"⌣\",\"smt\":\"⪪\",\"smte\":\"⪬\",\"smtes\":\"⪬︀\",\"SOFTcy\":\"Ь\",\"softcy\":\"ь\",\"solbar\":\"⌿\",\"solb\":\"⧄\",\"sol\":\"/\",\"Sopf\":\"𝕊\",\"sopf\":\"𝕤\",\"spades\":\"♠\",\"spadesuit\":\"♠\",\"spar\":\"∥\",\"sqcap\":\"⊓\",\"sqcaps\":\"⊓︀\",\"sqcup\":\"⊔\",\"sqcups\":\"⊔︀\",\"Sqrt\":\"√\",\"sqsub\":\"⊏\",\"sqsube\":\"⊑\",\"sqsubset\":\"⊏\",\"sqsubseteq\":\"⊑\",\"sqsup\":\"⊐\",\"sqsupe\":\"⊒\",\"sqsupset\":\"⊐\",\"sqsupseteq\":\"⊒\",\"square\":\"□\",\"Square\":\"□\",\"SquareIntersection\":\"⊓\",\"SquareSubset\":\"⊏\",\"SquareSubsetEqual\":\"⊑\",\"SquareSuperset\":\"⊐\",\"SquareSupersetEqual\":\"⊒\",\"SquareUnion\":\"⊔\",\"squarf\":\"▪\",\"squ\":\"□\",\"squf\":\"▪\",\"srarr\":\"→\",\"Sscr\":\"𝒮\",\"sscr\":\"𝓈\",\"ssetmn\":\"∖\",\"ssmile\":\"⌣\",\"sstarf\":\"⋆\",\"Star\":\"⋆\",\"star\":\"☆\",\"starf\":\"★\",\"straightepsilon\":\"ϵ\",\"straightphi\":\"ϕ\",\"strns\":\"¯\",\"sub\":\"⊂\",\"Sub\":\"⋐\",\"subdot\":\"⪽\",\"subE\":\"⫅\",\"sube\":\"⊆\",\"subedot\":\"⫃\",\"submult\":\"⫁\",\"subnE\":\"⫋\",\"subne\":\"⊊\",\"subplus\":\"⪿\",\"subrarr\":\"⥹\",\"subset\":\"⊂\",\"Subset\":\"⋐\",\"subseteq\":\"⊆\",\"subseteqq\":\"⫅\",\"SubsetEqual\":\"⊆\",\"subsetneq\":\"⊊\",\"subsetneqq\":\"⫋\",\"subsim\":\"⫇\",\"subsub\":\"⫕\",\"subsup\":\"⫓\",\"succapprox\":\"⪸\",\"succ\":\"≻\",\"succcurlyeq\":\"≽\",\"Succeeds\":\"≻\",\"SucceedsEqual\":\"⪰\",\"SucceedsSlantEqual\":\"≽\",\"SucceedsTilde\":\"≿\",\"succeq\":\"⪰\",\"succnapprox\":\"⪺\",\"succneqq\":\"⪶\",\"succnsim\":\"⋩\",\"succsim\":\"≿\",\"SuchThat\":\"∋\",\"sum\":\"∑\",\"Sum\":\"∑\",\"sung\":\"♪\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"sup\":\"⊃\",\"Sup\":\"⋑\",\"supdot\":\"⪾\",\"supdsub\":\"⫘\",\"supE\":\"⫆\",\"supe\":\"⊇\",\"supedot\":\"⫄\",\"Superset\":\"⊃\",\"SupersetEqual\":\"⊇\",\"suphsol\":\"⟉\",\"suphsub\":\"⫗\",\"suplarr\":\"⥻\",\"supmult\":\"⫂\",\"supnE\":\"⫌\",\"supne\":\"⊋\",\"supplus\":\"⫀\",\"supset\":\"⊃\",\"Supset\":\"⋑\",\"supseteq\":\"⊇\",\"supseteqq\":\"⫆\",\"supsetneq\":\"⊋\",\"supsetneqq\":\"⫌\",\"supsim\":\"⫈\",\"supsub\":\"⫔\",\"supsup\":\"⫖\",\"swarhk\":\"⤦\",\"swarr\":\"↙\",\"swArr\":\"⇙\",\"swarrow\":\"↙\",\"swnwar\":\"⤪\",\"szlig\":\"ß\",\"Tab\":\"\\t\",\"target\":\"⌖\",\"Tau\":\"Τ\",\"tau\":\"τ\",\"tbrk\":\"⎴\",\"Tcaron\":\"Ť\",\"tcaron\":\"ť\",\"Tcedil\":\"Ţ\",\"tcedil\":\"ţ\",\"Tcy\":\"Т\",\"tcy\":\"т\",\"tdot\":\"⃛\",\"telrec\":\"⌕\",\"Tfr\":\"𝔗\",\"tfr\":\"𝔱\",\"there4\":\"∴\",\"therefore\":\"∴\",\"Therefore\":\"∴\",\"Theta\":\"Θ\",\"theta\":\"θ\",\"thetasym\":\"ϑ\",\"thetav\":\"ϑ\",\"thickapprox\":\"≈\",\"thicksim\":\"∼\",\"ThickSpace\":\"  \",\"ThinSpace\":\" \",\"thinsp\":\" \",\"thkap\":\"≈\",\"thksim\":\"∼\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"tilde\":\"˜\",\"Tilde\":\"∼\",\"TildeEqual\":\"≃\",\"TildeFullEqual\":\"≅\",\"TildeTilde\":\"≈\",\"timesbar\":\"⨱\",\"timesb\":\"⊠\",\"times\":\"×\",\"timesd\":\"⨰\",\"tint\":\"∭\",\"toea\":\"⤨\",\"topbot\":\"⌶\",\"topcir\":\"⫱\",\"top\":\"⊤\",\"Topf\":\"𝕋\",\"topf\":\"𝕥\",\"topfork\":\"⫚\",\"tosa\":\"⤩\",\"tprime\":\"‴\",\"trade\":\"™\",\"TRADE\":\"™\",\"triangle\":\"▵\",\"triangledown\":\"▿\",\"triangleleft\":\"◃\",\"trianglelefteq\":\"⊴\",\"triangleq\":\"≜\",\"triangleright\":\"▹\",\"trianglerighteq\":\"⊵\",\"tridot\":\"◬\",\"trie\":\"≜\",\"triminus\":\"⨺\",\"TripleDot\":\"⃛\",\"triplus\":\"⨹\",\"trisb\":\"⧍\",\"tritime\":\"⨻\",\"trpezium\":\"⏢\",\"Tscr\":\"𝒯\",\"tscr\":\"𝓉\",\"TScy\":\"Ц\",\"tscy\":\"ц\",\"TSHcy\":\"Ћ\",\"tshcy\":\"ћ\",\"Tstrok\":\"Ŧ\",\"tstrok\":\"ŧ\",\"twixt\":\"≬\",\"twoheadleftarrow\":\"↞\",\"twoheadrightarrow\":\"↠\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"uarr\":\"↑\",\"Uarr\":\"↟\",\"uArr\":\"⇑\",\"Uarrocir\":\"⥉\",\"Ubrcy\":\"Ў\",\"ubrcy\":\"ў\",\"Ubreve\":\"Ŭ\",\"ubreve\":\"ŭ\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ucy\":\"У\",\"ucy\":\"у\",\"udarr\":\"⇅\",\"Udblac\":\"Ű\",\"udblac\":\"ű\",\"udhar\":\"⥮\",\"ufisht\":\"⥾\",\"Ufr\":\"𝔘\",\"ufr\":\"𝔲\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uHar\":\"⥣\",\"uharl\":\"↿\",\"uharr\":\"↾\",\"uhblk\":\"▀\",\"ulcorn\":\"⌜\",\"ulcorner\":\"⌜\",\"ulcrop\":\"⌏\",\"ultri\":\"◸\",\"Umacr\":\"Ū\",\"umacr\":\"ū\",\"uml\":\"¨\",\"UnderBar\":\"_\",\"UnderBrace\":\"⏟\",\"UnderBracket\":\"⎵\",\"UnderParenthesis\":\"⏝\",\"Union\":\"⋃\",\"UnionPlus\":\"⊎\",\"Uogon\":\"Ų\",\"uogon\":\"ų\",\"Uopf\":\"𝕌\",\"uopf\":\"𝕦\",\"UpArrowBar\":\"⤒\",\"uparrow\":\"↑\",\"UpArrow\":\"↑\",\"Uparrow\":\"⇑\",\"UpArrowDownArrow\":\"⇅\",\"updownarrow\":\"↕\",\"UpDownArrow\":\"↕\",\"Updownarrow\":\"⇕\",\"UpEquilibrium\":\"⥮\",\"upharpoonleft\":\"↿\",\"upharpoonright\":\"↾\",\"uplus\":\"⊎\",\"UpperLeftArrow\":\"↖\",\"UpperRightArrow\":\"↗\",\"upsi\":\"υ\",\"Upsi\":\"ϒ\",\"upsih\":\"ϒ\",\"Upsilon\":\"Υ\",\"upsilon\":\"υ\",\"UpTeeArrow\":\"↥\",\"UpTee\":\"⊥\",\"upuparrows\":\"⇈\",\"urcorn\":\"⌝\",\"urcorner\":\"⌝\",\"urcrop\":\"⌎\",\"Uring\":\"Ů\",\"uring\":\"ů\",\"urtri\":\"◹\",\"Uscr\":\"𝒰\",\"uscr\":\"𝓊\",\"utdot\":\"⋰\",\"Utilde\":\"Ũ\",\"utilde\":\"ũ\",\"utri\":\"▵\",\"utrif\":\"▴\",\"uuarr\":\"⇈\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"uwangle\":\"⦧\",\"vangrt\":\"⦜\",\"varepsilon\":\"ϵ\",\"varkappa\":\"ϰ\",\"varnothing\":\"∅\",\"varphi\":\"ϕ\",\"varpi\":\"ϖ\",\"varpropto\":\"∝\",\"varr\":\"↕\",\"vArr\":\"⇕\",\"varrho\":\"ϱ\",\"varsigma\":\"ς\",\"varsubsetneq\":\"⊊︀\",\"varsubsetneqq\":\"⫋︀\",\"varsupsetneq\":\"⊋︀\",\"varsupsetneqq\":\"⫌︀\",\"vartheta\":\"ϑ\",\"vartriangleleft\":\"⊲\",\"vartriangleright\":\"⊳\",\"vBar\":\"⫨\",\"Vbar\":\"⫫\",\"vBarv\":\"⫩\",\"Vcy\":\"В\",\"vcy\":\"в\",\"vdash\":\"⊢\",\"vDash\":\"⊨\",\"Vdash\":\"⊩\",\"VDash\":\"⊫\",\"Vdashl\":\"⫦\",\"veebar\":\"⊻\",\"vee\":\"∨\",\"Vee\":\"⋁\",\"veeeq\":\"≚\",\"vellip\":\"⋮\",\"verbar\":\"|\",\"Verbar\":\"‖\",\"vert\":\"|\",\"Vert\":\"‖\",\"VerticalBar\":\"∣\",\"VerticalLine\":\"|\",\"VerticalSeparator\":\"❘\",\"VerticalTilde\":\"≀\",\"VeryThinSpace\":\" \",\"Vfr\":\"𝔙\",\"vfr\":\"𝔳\",\"vltri\":\"⊲\",\"vnsub\":\"⊂⃒\",\"vnsup\":\"⊃⃒\",\"Vopf\":\"𝕍\",\"vopf\":\"𝕧\",\"vprop\":\"∝\",\"vrtri\":\"⊳\",\"Vscr\":\"𝒱\",\"vscr\":\"𝓋\",\"vsubnE\":\"⫋︀\",\"vsubne\":\"⊊︀\",\"vsupnE\":\"⫌︀\",\"vsupne\":\"⊋︀\",\"Vvdash\":\"⊪\",\"vzigzag\":\"⦚\",\"Wcirc\":\"Ŵ\",\"wcirc\":\"ŵ\",\"wedbar\":\"⩟\",\"wedge\":\"∧\",\"Wedge\":\"⋀\",\"wedgeq\":\"≙\",\"weierp\":\"℘\",\"Wfr\":\"𝔚\",\"wfr\":\"𝔴\",\"Wopf\":\"𝕎\",\"wopf\":\"𝕨\",\"wp\":\"℘\",\"wr\":\"≀\",\"wreath\":\"≀\",\"Wscr\":\"𝒲\",\"wscr\":\"𝓌\",\"xcap\":\"⋂\",\"xcirc\":\"◯\",\"xcup\":\"⋃\",\"xdtri\":\"▽\",\"Xfr\":\"𝔛\",\"xfr\":\"𝔵\",\"xharr\":\"⟷\",\"xhArr\":\"⟺\",\"Xi\":\"Ξ\",\"xi\":\"ξ\",\"xlarr\":\"⟵\",\"xlArr\":\"⟸\",\"xmap\":\"⟼\",\"xnis\":\"⋻\",\"xodot\":\"⨀\",\"Xopf\":\"𝕏\",\"xopf\":\"𝕩\",\"xoplus\":\"⨁\",\"xotime\":\"⨂\",\"xrarr\":\"⟶\",\"xrArr\":\"⟹\",\"Xscr\":\"𝒳\",\"xscr\":\"𝓍\",\"xsqcup\":\"⨆\",\"xuplus\":\"⨄\",\"xutri\":\"△\",\"xvee\":\"⋁\",\"xwedge\":\"⋀\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"YAcy\":\"Я\",\"yacy\":\"я\",\"Ycirc\":\"Ŷ\",\"ycirc\":\"ŷ\",\"Ycy\":\"Ы\",\"ycy\":\"ы\",\"yen\":\"¥\",\"Yfr\":\"𝔜\",\"yfr\":\"𝔶\",\"YIcy\":\"Ї\",\"yicy\":\"ї\",\"Yopf\":\"𝕐\",\"yopf\":\"𝕪\",\"Yscr\":\"𝒴\",\"yscr\":\"𝓎\",\"YUcy\":\"Ю\",\"yucy\":\"ю\",\"yuml\":\"ÿ\",\"Yuml\":\"Ÿ\",\"Zacute\":\"Ź\",\"zacute\":\"ź\",\"Zcaron\":\"Ž\",\"zcaron\":\"ž\",\"Zcy\":\"З\",\"zcy\":\"з\",\"Zdot\":\"Ż\",\"zdot\":\"ż\",\"zeetrf\":\"ℨ\",\"ZeroWidthSpace\":\"​\",\"Zeta\":\"Ζ\",\"zeta\":\"ζ\",\"zfr\":\"𝔷\",\"Zfr\":\"ℨ\",\"ZHcy\":\"Ж\",\"zhcy\":\"ж\",\"zigrarr\":\"⇝\",\"zopf\":\"𝕫\",\"Zopf\":\"ℤ\",\"Zscr\":\"𝒵\",\"zscr\":\"𝓏\",\"zwj\":\"‍\",\"zwnj\":\"‌\"}");

/***/ }),
/* 8 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Aacute\":\"Á\",\"aacute\":\"á\",\"Acirc\":\"Â\",\"acirc\":\"â\",\"acute\":\"´\",\"AElig\":\"Æ\",\"aelig\":\"æ\",\"Agrave\":\"À\",\"agrave\":\"à\",\"amp\":\"&\",\"AMP\":\"&\",\"Aring\":\"Å\",\"aring\":\"å\",\"Atilde\":\"Ã\",\"atilde\":\"ã\",\"Auml\":\"Ä\",\"auml\":\"ä\",\"brvbar\":\"¦\",\"Ccedil\":\"Ç\",\"ccedil\":\"ç\",\"cedil\":\"¸\",\"cent\":\"¢\",\"copy\":\"©\",\"COPY\":\"©\",\"curren\":\"¤\",\"deg\":\"°\",\"divide\":\"÷\",\"Eacute\":\"É\",\"eacute\":\"é\",\"Ecirc\":\"Ê\",\"ecirc\":\"ê\",\"Egrave\":\"È\",\"egrave\":\"è\",\"ETH\":\"Ð\",\"eth\":\"ð\",\"Euml\":\"Ë\",\"euml\":\"ë\",\"frac12\":\"½\",\"frac14\":\"¼\",\"frac34\":\"¾\",\"gt\":\">\",\"GT\":\">\",\"Iacute\":\"Í\",\"iacute\":\"í\",\"Icirc\":\"Î\",\"icirc\":\"î\",\"iexcl\":\"¡\",\"Igrave\":\"Ì\",\"igrave\":\"ì\",\"iquest\":\"¿\",\"Iuml\":\"Ï\",\"iuml\":\"ï\",\"laquo\":\"«\",\"lt\":\"<\",\"LT\":\"<\",\"macr\":\"¯\",\"micro\":\"µ\",\"middot\":\"·\",\"nbsp\":\" \",\"not\":\"¬\",\"Ntilde\":\"Ñ\",\"ntilde\":\"ñ\",\"Oacute\":\"Ó\",\"oacute\":\"ó\",\"Ocirc\":\"Ô\",\"ocirc\":\"ô\",\"Ograve\":\"Ò\",\"ograve\":\"ò\",\"ordf\":\"ª\",\"ordm\":\"º\",\"Oslash\":\"Ø\",\"oslash\":\"ø\",\"Otilde\":\"Õ\",\"otilde\":\"õ\",\"Ouml\":\"Ö\",\"ouml\":\"ö\",\"para\":\"¶\",\"plusmn\":\"±\",\"pound\":\"£\",\"quot\":\"\\\"\",\"QUOT\":\"\\\"\",\"raquo\":\"»\",\"reg\":\"®\",\"REG\":\"®\",\"sect\":\"§\",\"shy\":\"­\",\"sup1\":\"¹\",\"sup2\":\"²\",\"sup3\":\"³\",\"szlig\":\"ß\",\"THORN\":\"Þ\",\"thorn\":\"þ\",\"times\":\"×\",\"Uacute\":\"Ú\",\"uacute\":\"ú\",\"Ucirc\":\"Û\",\"ucirc\":\"û\",\"Ugrave\":\"Ù\",\"ugrave\":\"ù\",\"uml\":\"¨\",\"Uuml\":\"Ü\",\"uuml\":\"ü\",\"Yacute\":\"Ý\",\"yacute\":\"ý\",\"yen\":\"¥\",\"yuml\":\"ÿ\"}");

/***/ }),
/* 9 */
/***/ (function(module) {

module.exports = JSON.parse("{\"amp\":\"&\",\"apos\":\"'\",\"gt\":\">\",\"lt\":\"<\",\"quot\":\"\\\"\"}");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var node_1 = __webpack_require__(12);
exports.Node = node_1.Node;
exports.Element = node_1.Element;
exports.DataNode = node_1.DataNode;
exports.NodeWithChildren = node_1.NodeWithChildren;
var reWhitespace = /\s+/g;
// Default options
var defaultOpts = {
    normalizeWhitespace: false,
    withStartIndices: false,
    withEndIndices: false
};
var DomHandler = /** @class */ (function () {
    /**
     * Initiate a new DomHandler.
     *
     * @param callback Called once parsing has completed.
     * @param options Settings for the handler.
     * @param elementCB Callback whenever a tag is closed.
     */
    function DomHandler(callback, options, elementCB) {
        /** The constructed DOM */
        this.dom = [];
        /** Indicated whether parsing has been completed. */
        this._done = false;
        /** Stack of open tags. */
        this._tagStack = [];
        /** A data node that is still being written to. */
        this._lastNode = null;
        /** Reference to the parser instance. Used for location information. */
        this._parser = null;
        // Make it possible to skip arguments, for backwards-compatibility
        if (typeof options === "function") {
            elementCB = options;
            options = defaultOpts;
        }
        if (typeof callback === "object") {
            options = callback;
            callback = undefined;
        }
        this._callback = callback || null;
        this._options = options || defaultOpts;
        this._elementCB = elementCB || null;
    }
    DomHandler.prototype.onparserinit = function (parser) {
        this._parser = parser;
    };
    // Resets the handler back to starting state
    DomHandler.prototype.onreset = function () {
        this.dom = [];
        this._done = false;
        this._tagStack = [];
        this._lastNode = null;
        this._parser = this._parser || null;
    };
    // Signals the handler that parsing is done
    DomHandler.prototype.onend = function () {
        if (this._done)
            return;
        this._done = true;
        this._parser = null;
        this.handleCallback(null);
    };
    DomHandler.prototype.onerror = function (error) {
        this.handleCallback(error);
    };
    DomHandler.prototype.onclosetag = function () {
        this._lastNode = null;
        // If(this._tagStack.pop().name !== name) this.handleCallback(Error("Tagname didn't match!"));
        var elem = this._tagStack.pop();
        if (!elem || !this._parser) {
            return;
        }
        if (this._options.withEndIndices) {
            elem.endIndex = this._parser.endIndex;
        }
        if (this._elementCB)
            this._elementCB(elem);
    };
    DomHandler.prototype.onopentag = function (name, attribs) {
        var element = new node_1.Element(name, attribs);
        this.addNode(element);
        this._tagStack.push(element);
    };
    DomHandler.prototype.ontext = function (data) {
        var normalize = this._options.normalizeWhitespace;
        var _lastNode = this._lastNode;
        if (_lastNode && _lastNode.type === "text" /* Text */) {
            if (normalize) {
                _lastNode.data = (_lastNode.data + data).replace(reWhitespace, " ");
            }
            else {
                _lastNode.data += data;
            }
        }
        else {
            if (normalize) {
                data = data.replace(reWhitespace, " ");
            }
            var node = new node_1.DataNode("text" /* Text */, data);
            this.addNode(node);
            this._lastNode = node;
        }
    };
    DomHandler.prototype.oncomment = function (data) {
        if (this._lastNode && this._lastNode.type === "comment" /* Comment */) {
            this._lastNode.data += data;
            return;
        }
        var node = new node_1.DataNode("comment" /* Comment */, data);
        this.addNode(node);
        this._lastNode = node;
    };
    DomHandler.prototype.oncommentend = function () {
        this._lastNode = null;
    };
    DomHandler.prototype.oncdatastart = function () {
        var text = new node_1.DataNode("text" /* Text */, "");
        var node = new node_1.NodeWithChildren("cdata" /* CDATA */, [text]);
        this.addNode(node);
        text.parent = node;
        this._lastNode = text;
    };
    DomHandler.prototype.oncdataend = function () {
        this._lastNode = null;
    };
    DomHandler.prototype.onprocessinginstruction = function (name, data) {
        var node = new node_1.ProcessingInstruction(name, data);
        this.addNode(node);
    };
    DomHandler.prototype.handleCallback = function (error) {
        if (typeof this._callback === "function") {
            this._callback(error, this.dom);
        }
        else if (error) {
            throw error;
        }
    };
    DomHandler.prototype.addNode = function (node) {
        var parent = this._tagStack[this._tagStack.length - 1];
        var siblings = parent ? parent.children : this.dom;
        var previousSibling = siblings[siblings.length - 1];
        if (this._parser) {
            if (this._options.withStartIndices) {
                node.startIndex = this._parser.startIndex;
            }
            if (this._options.withEndIndices) {
                node.endIndex = this._parser.endIndex;
            }
        }
        siblings.push(node);
        if (previousSibling) {
            node.prev = previousSibling;
            previousSibling.next = node;
        }
        if (parent) {
            node.parent = parent;
        }
        this._lastNode = null;
    };
    DomHandler.prototype.addDataNode = function (node) {
        this.addNode(node);
        this._lastNode = node;
    };
    return DomHandler;
}());
exports.DomHandler = DomHandler;
exports.default = DomHandler;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var nodeTypes = new Map([
    ["tag" /* Tag */, 1],
    ["script" /* Script */, 1],
    ["style" /* Style */, 1],
    ["directive" /* Directive */, 1],
    ["text" /* Text */, 3],
    ["cdata" /* CDATA */, 4],
    ["comment" /* Comment */, 8]
]);
// This object will be used as the prototype for Nodes when creating a
// DOM-Level-1-compliant structure.
var Node = /** @class */ (function () {
    /**
     *
     * @param type The type of the node.
     */
    function Node(type) {
        this.type = type;
        /** Parent of the node */
        this.parent = null;
        /** Previous sibling */
        this.prev = null;
        /** Next sibling */
        this.next = null;
        /** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
        this.startIndex = null;
        /** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
        this.endIndex = null;
    }
    Object.defineProperty(Node.prototype, "nodeType", {
        // Read-only aliases
        get: function () {
            return nodeTypes.get(this.type) || 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "parentNode", {
        // Read-write aliases for properties
        get: function () {
            return this.parent || null;
        },
        set: function (parent) {
            this.parent = parent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "previousSibling", {
        get: function () {
            return this.prev || null;
        },
        set: function (prev) {
            this.prev = prev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "nextSibling", {
        get: function () {
            return this.next || null;
        },
        set: function (next) {
            this.next = next;
        },
        enumerable: true,
        configurable: true
    });
    return Node;
}());
exports.Node = Node;
var DataNode = /** @class */ (function (_super) {
    __extends(DataNode, _super);
    /**
     *
     * @param type The type of the node
     * @param data The content of the data node
     */
    function DataNode(type, data) {
        var _this = _super.call(this, type) || this;
        _this.data = data;
        return _this;
    }
    Object.defineProperty(DataNode.prototype, "nodeValue", {
        get: function () {
            return this.data;
        },
        set: function (data) {
            this.data = data;
        },
        enumerable: true,
        configurable: true
    });
    return DataNode;
}(Node));
exports.DataNode = DataNode;
var ProcessingInstruction = /** @class */ (function (_super) {
    __extends(ProcessingInstruction, _super);
    function ProcessingInstruction(name, data) {
        var _this = _super.call(this, "directive" /* Directive */, data) || this;
        _this.name = name;
        return _this;
    }
    return ProcessingInstruction;
}(DataNode));
exports.ProcessingInstruction = ProcessingInstruction;
var NodeWithChildren = /** @class */ (function (_super) {
    __extends(NodeWithChildren, _super);
    /**
     *
     * @param type Type of the node.
     * @param children Children of the node. Only certain node types can have children.
     */
    function NodeWithChildren(type, children) {
        var _this = _super.call(this, type) || this;
        _this.children = children;
        return _this;
    }
    Object.defineProperty(NodeWithChildren.prototype, "firstChild", {
        // Aliases
        get: function () {
            return this.children[0] || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "lastChild", {
        get: function () {
            return this.children[this.children.length - 1] || null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NodeWithChildren.prototype, "childNodes", {
        get: function () {
            return this.children;
        },
        set: function (children) {
            this.children = children;
        },
        enumerable: true,
        configurable: true
    });
    return NodeWithChildren;
}(Node));
exports.NodeWithChildren = NodeWithChildren;
var Element = /** @class */ (function (_super) {
    __extends(Element, _super);
    /**
     *
     * @param name Name of the tag, eg. `div`, `span`
     * @param attribs Object mapping attribute names to attribute values
     */
    function Element(name, attribs) {
        var _this = _super.call(this, name === "script"
            ? "script" /* Script */
            : name === "style"
                ? "style" /* Style */
                : "tag" /* Tag */, []) || this;
        _this.name = name;
        _this.attribs = attribs;
        _this.attribs = attribs;
        return _this;
    }
    Object.defineProperty(Element.prototype, "tagName", {
        // DOM Level 1 aliases
        get: function () {
            return this.name;
        },
        set: function (name) {
            this.name = name;
        },
        enumerable: true,
        configurable: true
    });
    return Element;
}(NodeWithChildren));
exports.Element = Element;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Tests whether an element is a tag or not.
 *
 * @param elem Element to test
 */
function isTag(elem) {
    return (elem.type === "tag" /* Tag */ ||
        elem.type === "script" /* Script */ ||
        elem.type === "style" /* Style */);
}
exports.isTag = isTag;
// Exports for backwards compatibility
exports.Text = "text" /* Text */; //Text
exports.Directive = "directive" /* Directive */; //<? ... ?>
exports.Comment = "comment" /* Comment */; //<!-- ... -->
exports.Script = "script" /* Script */; //<script> tags
exports.Style = "style" /* Style */; //<style> tags
exports.Tag = "tag" /* Tag */; //Any tag
exports.CDATA = "cdata" /* CDATA */; //<![CDATA[ ... ]]>
exports.Doctype = "doctype" /* Doctype */;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var domhandler_1 = __importDefault(__webpack_require__(11));
var DomUtils = __importStar(__webpack_require__(15));
var Parser_1 = __webpack_require__(3);
//TODO: Consume data as it is coming in
var FeedHandler = /** @class */ (function (_super) {
    __extends(FeedHandler, _super);
    /**
     *
     * @param callback
     * @param options
     */
    function FeedHandler(callback, options) {
        var _this = this;
        if (typeof callback === "object" && callback !== null) {
            callback = undefined;
            options = callback;
        }
        _this = _super.call(this, callback, options) || this;
        return _this;
    }
    FeedHandler.prototype.onend = function () {
        var feed = {};
        var feedRoot = getOneElement(isValidFeed, this.dom);
        if (feedRoot) {
            if (feedRoot.name === "feed") {
                var childs = feedRoot.children;
                feed.type = "atom";
                addConditionally(feed, "id", "id", childs);
                addConditionally(feed, "title", "title", childs);
                var href = getAttribute("href", getOneElement("link", childs));
                if (href) {
                    feed.link = href;
                }
                addConditionally(feed, "description", "subtitle", childs);
                var updated = fetch("updated", childs);
                if (updated) {
                    feed.updated = new Date(updated);
                }
                addConditionally(feed, "author", "email", childs, true);
                feed.items = getElements("entry", childs).map(function (item) {
                    var entry = {};
                    var children = item.children;
                    addConditionally(entry, "id", "id", children);
                    addConditionally(entry, "title", "title", children);
                    var href = getAttribute("href", getOneElement("link", children));
                    if (href) {
                        entry.link = href;
                    }
                    var description = fetch("summary", children) ||
                        fetch("content", children);
                    if (description) {
                        entry.description = description;
                    }
                    var pubDate = fetch("updated", children);
                    if (pubDate) {
                        entry.pubDate = new Date(pubDate);
                    }
                    return entry;
                });
            }
            else {
                var childs = getOneElement("channel", feedRoot.children)
                    .children;
                feed.type = feedRoot.name.substr(0, 3);
                feed.id = "";
                addConditionally(feed, "title", "title", childs);
                addConditionally(feed, "link", "link", childs);
                addConditionally(feed, "description", "description", childs);
                var updated = fetch("lastBuildDate", childs);
                if (updated) {
                    feed.updated = new Date(updated);
                }
                addConditionally(feed, "author", "managingEditor", childs, true);
                feed.items = getElements("item", feedRoot.children).map(function (item) {
                    var entry = {};
                    var children = item.children;
                    addConditionally(entry, "id", "guid", children);
                    addConditionally(entry, "title", "title", children);
                    addConditionally(entry, "link", "link", children);
                    addConditionally(entry, "description", "description", children);
                    var pubDate = fetch("pubDate", children);
                    if (pubDate)
                        entry.pubDate = new Date(pubDate);
                    return entry;
                });
            }
        }
        this.feed = feed;
        this.handleCallback(feedRoot ? null : Error("couldn't find root of feed"));
    };
    return FeedHandler;
}(domhandler_1.default));
exports.FeedHandler = FeedHandler;
function getElements(what, where) {
    return DomUtils.getElementsByTagName(what, where, true);
}
function getOneElement(what, where) {
    return DomUtils.getElementsByTagName(what, where, true, 1)[0];
}
function fetch(what, where, recurse) {
    if (recurse === void 0) { recurse = false; }
    return DomUtils.getText(DomUtils.getElementsByTagName(what, where, recurse, 1)).trim();
}
function getAttribute(name, elem) {
    if (!elem) {
        return null;
    }
    var attribs = elem.attribs;
    return attribs[name];
}
function addConditionally(obj, prop, what, where, recurse) {
    if (recurse === void 0) { recurse = false; }
    var tmp = fetch(what, where, recurse);
    // @ts-ignore
    if (tmp)
        obj[prop] = tmp;
}
function isValidFeed(value) {
    return value === "rss" || value === "feed" || value === "rdf:RDF";
}
var defaultOptions = { xmlMode: true };
/**
 * Parse a feed.
 *
 * @param feed The feed that should be parsed, as a string.
 * @param options Optionally, options for parsing. When using this option, you probably want to set `xmlMode` to `true`.
 */
function parseFeed(feed, options) {
    if (options === void 0) { options = defaultOptions; }
    var handler = new FeedHandler(options);
    new Parser_1.Parser(handler, options).end(feed);
    return handler.feed;
}
exports.parseFeed = parseFeed;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(16));
__export(__webpack_require__(23));
__export(__webpack_require__(24));
__export(__webpack_require__(25));
__export(__webpack_require__(26));
__export(__webpack_require__(27));
__export(__webpack_require__(17));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tagtypes_1 = __webpack_require__(17);
var dom_serializer_1 = __importDefault(__webpack_require__(18));
exports.getOuterHTML = dom_serializer_1.default;
function getInnerHTML(node, options) {
    return tagtypes_1.hasChildren(node)
        ? node.children.map(function (node) { return exports.getOuterHTML(node, options); }).join("")
        : "";
}
exports.getInnerHTML = getInnerHTML;
function getText(node) {
    if (Array.isArray(node))
        return node.map(getText).join("");
    if (tagtypes_1.isTag(node))
        return node.name === "br" ? "\n" : getText(node.children);
    if (tagtypes_1.isCDATA(node))
        return getText(node.children);
    if (tagtypes_1.isText(node))
        return node.data;
    return "";
}
exports.getText = getText;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var domelementtype_1 = __webpack_require__(13);
function isTag(node) {
    return domelementtype_1.isTag(node);
}
exports.isTag = isTag;
function isCDATA(node) {
    return "cdata" /* CDATA */ === node.type;
}
exports.isCDATA = isCDATA;
function isText(node) {
    return node.type === "text" /* Text */;
}
exports.isText = isText;
function isComment(node) {
    return node.type === "comment" /* Comment */;
}
exports.isComment = isComment;
function hasChildren(node) {
    return Object.prototype.hasOwnProperty.call(node, "children");
}
exports.hasChildren = hasChildren;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Module dependencies
*/
var ElementType = __webpack_require__(13);
var entities = __webpack_require__(19);

/* mixed-case SVG and MathML tags & attributes
   recognized by the HTML parser, see
   https://html.spec.whatwg.org/multipage/parsing.html#parsing-main-inforeign
*/
var foreignNames = __webpack_require__(22);
foreignNames.elementNames.__proto__ = null; /* use as a simple dictionary */
foreignNames.attributeNames.__proto__ = null;

var unencodedElements = {
  __proto__: null,
  style: true,
  script: true,
  xmp: true,
  iframe: true,
  noembed: true,
  noframes: true,
  plaintext: true,
  noscript: true
};

/*
  Format attributes
*/
function formatAttrs(attributes, opts) {
  if (!attributes) return;

  var output = '';
  var value;

  // Loop through the attributes
  for (var key in attributes) {
    value = attributes[key];
    if (output) {
      output += ' ';
    }

    if (opts.xmlMode === 'foreign') {
      /* fix up mixed-case attribute names */
      key = foreignNames.attributeNames[key] || key;
    }
    output += key;
    if ((value !== null && value !== '') || opts.xmlMode) {
      output +=
        '="' +
        (opts.decodeEntities
          ? entities.encodeXML(value)
          : value.replace(/\"/g, '&quot;')) +
        '"';
    }
  }

  return output;
}

/*
  Self-enclosing tags (stolen from node-htmlparser)
*/
var singleTag = {
  __proto__: null,
  area: true,
  base: true,
  basefont: true,
  br: true,
  col: true,
  command: true,
  embed: true,
  frame: true,
  hr: true,
  img: true,
  input: true,
  isindex: true,
  keygen: true,
  link: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

var render = (module.exports = function(dom, opts) {
  if (!Array.isArray(dom) && !dom.cheerio) dom = [dom];
  opts = opts || {};

  var output = '';

  for (var i = 0; i < dom.length; i++) {
    var elem = dom[i];

    if (elem.type === 'root') output += render(elem.children, opts);
    else if (ElementType.isTag(elem)) output += renderTag(elem, opts);
    else if (elem.type === ElementType.Directive)
      output += renderDirective(elem);
    else if (elem.type === ElementType.Comment) output += renderComment(elem);
    else if (elem.type === ElementType.CDATA) output += renderCdata(elem);
    else output += renderText(elem, opts);
  }

  return output;
});

const foreignModeIntegrationPoints = [
  'mi',
  'mo',
  'mn',
  'ms',
  'mtext',
  'annotation-xml',
  'foreignObject',
  'desc',
  'title'
];

function renderTag(elem, opts) {
  // Handle SVG / MathML in HTML
  if (opts.xmlMode === 'foreign') {
    /* fix up mixed-case element names */
    elem.name = foreignNames.elementNames[elem.name] || elem.name;
    /* exit foreign mode at integration points */
    if (
      elem.parent &&
      foreignModeIntegrationPoints.indexOf(elem.parent.name) >= 0
    )
      opts = Object.assign({}, opts, { xmlMode: false });
  }
  if (!opts.xmlMode && ['svg', 'math'].indexOf(elem.name) >= 0) {
    opts = Object.assign({}, opts, { xmlMode: 'foreign' });
  }

  var tag = '<' + elem.name;
  var attribs = formatAttrs(elem.attribs, opts);

  if (attribs) {
    tag += ' ' + attribs;
  }

  if (opts.xmlMode && (!elem.children || elem.children.length === 0)) {
    tag += '/>';
  } else {
    tag += '>';
    if (elem.children) {
      tag += render(elem.children, opts);
    }

    if (!singleTag[elem.name] || opts.xmlMode) {
      tag += '</' + elem.name + '>';
    }
  }

  return tag;
}

function renderDirective(elem) {
  return '<' + elem.data + '>';
}

function renderText(elem, opts) {
  var data = elem.data || '';

  // if entities weren't decoded, no need to encode them back
  if (
    opts.decodeEntities &&
    !(elem.parent && elem.parent.name in unencodedElements)
  ) {
    data = entities.encodeXML(data);
  }

  return data;
}

function renderCdata(elem) {
  return '<![CDATA[' + elem.children[0].data + ']]>';
}

function renderComment(elem) {
  return '<!--' + elem.data + '-->';
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var decode_1 = __webpack_require__(20);
var encode_1 = __webpack_require__(21);
function decode(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTML)(data);
}
exports.decode = decode;
function decodeStrict(data, level) {
    return (!level || level <= 0 ? decode_1.decodeXML : decode_1.decodeHTMLStrict)(data);
}
exports.decodeStrict = decodeStrict;
function encode(data, level) {
    return (!level || level <= 0 ? encode_1.encodeXML : encode_1.encodeHTML)(data);
}
exports.encode = encode;
var encode_2 = __webpack_require__(21);
exports.encodeXML = encode_2.encodeXML;
exports.encodeHTML = encode_2.encodeHTML;
exports.escape = encode_2.escape;
// Legacy aliases
exports.encodeHTML4 = encode_2.encodeHTML;
exports.encodeHTML5 = encode_2.encodeHTML;
var decode_2 = __webpack_require__(20);
exports.decodeXML = decode_2.decodeXML;
exports.decodeHTML = decode_2.decodeHTML;
exports.decodeHTMLStrict = decode_2.decodeHTMLStrict;
// Legacy aliases
exports.decodeHTML4 = decode_2.decodeHTML;
exports.decodeHTML5 = decode_2.decodeHTML;
exports.decodeHTML4Strict = decode_2.decodeHTMLStrict;
exports.decodeHTML5Strict = decode_2.decodeHTMLStrict;
exports.decodeXMLStrict = decode_2.decodeXML;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var entities_json_1 = __importDefault(__webpack_require__(7));
var legacy_json_1 = __importDefault(__webpack_require__(8));
var xml_json_1 = __importDefault(__webpack_require__(9));
var decode_codepoint_1 = __importDefault(__webpack_require__(5));
exports.decodeXML = getStrictDecoder(xml_json_1.default);
exports.decodeHTMLStrict = getStrictDecoder(entities_json_1.default);
function getStrictDecoder(map) {
    var keys = Object.keys(map).join("|");
    var replace = getReplacer(map);
    keys += "|#[xX][\\da-fA-F]+|#\\d+";
    var re = new RegExp("&(?:" + keys + ");", "g");
    return function (str) { return String(str).replace(re, replace); };
}
var sorter = function (a, b) { return (a < b ? 1 : -1); };
exports.decodeHTML = (function () {
    var legacy = Object.keys(legacy_json_1.default).sort(sorter);
    var keys = Object.keys(entities_json_1.default).sort(sorter);
    for (var i = 0, j = 0; i < keys.length; i++) {
        if (legacy[j] === keys[i]) {
            keys[i] += ";?";
            j++;
        }
        else {
            keys[i] += ";";
        }
    }
    var re = new RegExp("&(?:" + keys.join("|") + "|#[xX][\\da-fA-F]+;?|#\\d+;?)", "g");
    var replace = getReplacer(entities_json_1.default);
    function replacer(str) {
        if (str.substr(-1) !== ";")
            str += ";";
        return replace(str);
    }
    //TODO consider creating a merged map
    return function (str) {
        return String(str).replace(re, replacer);
    };
})();
function getReplacer(map) {
    return function replace(str) {
        if (str.charAt(1) === "#") {
            if (str.charAt(2) === "X" || str.charAt(2) === "x") {
                return decode_codepoint_1.default(parseInt(str.substr(3), 16));
            }
            return decode_codepoint_1.default(parseInt(str.substr(2), 10));
        }
        return map[str.slice(1, -1)];
    };
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xml_json_1 = __importDefault(__webpack_require__(9));
var inverseXML = getInverseObj(xml_json_1.default);
var xmlReplacer = getInverseReplacer(inverseXML);
exports.encodeXML = getInverse(inverseXML, xmlReplacer);
var entities_json_1 = __importDefault(__webpack_require__(7));
var inverseHTML = getInverseObj(entities_json_1.default);
var htmlReplacer = getInverseReplacer(inverseHTML);
exports.encodeHTML = getInverse(inverseHTML, htmlReplacer);
function getInverseObj(obj) {
    return Object.keys(obj)
        .sort()
        .reduce(function (inverse, name) {
        inverse[obj[name]] = "&" + name + ";";
        return inverse;
    }, {});
}
function getInverseReplacer(inverse) {
    var single = [];
    var multiple = [];
    Object.keys(inverse).forEach(function (k) {
        return k.length === 1
            ? // Add value to single array
                single.push("\\" + k)
            : // Add value to multiple array
                multiple.push(k);
    });
    //TODO add ranges
    multiple.unshift("[" + single.join("") + "]");
    return new RegExp(multiple.join("|"), "g");
}
var reNonASCII = /[^\0-\x7F]/g;
var reAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
function singleCharReplacer(c) {
    return "&#x" + c
        .charCodeAt(0)
        .toString(16)
        .toUpperCase() + ";";
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
function astralReplacer(c, _) {
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    var high = c.charCodeAt(0);
    var low = c.charCodeAt(1);
    var codePoint = (high - 0xd800) * 0x400 + low - 0xdc00 + 0x10000;
    return "&#x" + codePoint.toString(16).toUpperCase() + ";";
}
function getInverse(inverse, re) {
    return function (data) {
        return data
            .replace(re, function (name) { return inverse[name]; })
            .replace(reAstralSymbols, astralReplacer)
            .replace(reNonASCII, singleCharReplacer);
    };
}
var reXmlChars = getInverseReplacer(inverseXML);
function escape(data) {
    return data
        .replace(reXmlChars, singleCharReplacer)
        .replace(reAstralSymbols, astralReplacer)
        .replace(reNonASCII, singleCharReplacer);
}
exports.escape = escape;


/***/ }),
/* 22 */
/***/ (function(module) {

module.exports = JSON.parse("{\"elementNames\":{\"altglyph\":\"altGlyph\",\"altglyphdef\":\"altGlyphDef\",\"altglyphitem\":\"altGlyphItem\",\"animatecolor\":\"animateColor\",\"animatemotion\":\"animateMotion\",\"animatetransform\":\"animateTransform\",\"clippath\":\"clipPath\",\"feblend\":\"feBlend\",\"fecolormatrix\":\"feColorMatrix\",\"fecomponenttransfer\":\"feComponentTransfer\",\"fecomposite\":\"feComposite\",\"feconvolvematrix\":\"feConvolveMatrix\",\"fediffuselighting\":\"feDiffuseLighting\",\"fedisplacementmap\":\"feDisplacementMap\",\"fedistantlight\":\"feDistantLight\",\"fedropshadow\":\"feDropShadow\",\"feflood\":\"feFlood\",\"fefunca\":\"feFuncA\",\"fefuncb\":\"feFuncB\",\"fefuncg\":\"feFuncG\",\"fefuncr\":\"feFuncR\",\"fegaussianblur\":\"feGaussianBlur\",\"feimage\":\"feImage\",\"femerge\":\"feMerge\",\"femergenode\":\"feMergeNode\",\"femorphology\":\"feMorphology\",\"feoffset\":\"feOffset\",\"fepointlight\":\"fePointLight\",\"fespecularlighting\":\"feSpecularLighting\",\"fespotlight\":\"feSpotLight\",\"fetile\":\"feTile\",\"feturbulence\":\"feTurbulence\",\"foreignobject\":\"foreignObject\",\"glyphref\":\"glyphRef\",\"lineargradient\":\"linearGradient\",\"radialgradient\":\"radialGradient\",\"textpath\":\"textPath\"},\"attributeNames\":{\"definitionurl\":\"definitionURL\",\"attributename\":\"attributeName\",\"attributetype\":\"attributeType\",\"basefrequency\":\"baseFrequency\",\"baseprofile\":\"baseProfile\",\"calcmode\":\"calcMode\",\"clippathunits\":\"clipPathUnits\",\"diffuseconstant\":\"diffuseConstant\",\"edgemode\":\"edgeMode\",\"filterunits\":\"filterUnits\",\"glyphref\":\"glyphRef\",\"gradienttransform\":\"gradientTransform\",\"gradientunits\":\"gradientUnits\",\"kernelmatrix\":\"kernelMatrix\",\"kernelunitlength\":\"kernelUnitLength\",\"keypoints\":\"keyPoints\",\"keysplines\":\"keySplines\",\"keytimes\":\"keyTimes\",\"lengthadjust\":\"lengthAdjust\",\"limitingconeangle\":\"limitingConeAngle\",\"markerheight\":\"markerHeight\",\"markerunits\":\"markerUnits\",\"markerwidth\":\"markerWidth\",\"maskcontentunits\":\"maskContentUnits\",\"maskunits\":\"maskUnits\",\"numoctaves\":\"numOctaves\",\"pathlength\":\"pathLength\",\"patterncontentunits\":\"patternContentUnits\",\"patterntransform\":\"patternTransform\",\"patternunits\":\"patternUnits\",\"pointsatx\":\"pointsAtX\",\"pointsaty\":\"pointsAtY\",\"pointsatz\":\"pointsAtZ\",\"preservealpha\":\"preserveAlpha\",\"preserveaspectratio\":\"preserveAspectRatio\",\"primitiveunits\":\"primitiveUnits\",\"refx\":\"refX\",\"refy\":\"refY\",\"repeatcount\":\"repeatCount\",\"repeatdur\":\"repeatDur\",\"requiredextensions\":\"requiredExtensions\",\"requiredfeatures\":\"requiredFeatures\",\"specularconstant\":\"specularConstant\",\"specularexponent\":\"specularExponent\",\"spreadmethod\":\"spreadMethod\",\"startoffset\":\"startOffset\",\"stddeviation\":\"stdDeviation\",\"stitchtiles\":\"stitchTiles\",\"surfacescale\":\"surfaceScale\",\"systemlanguage\":\"systemLanguage\",\"tablevalues\":\"tableValues\",\"targetx\":\"targetX\",\"targety\":\"targetY\",\"textlength\":\"textLength\",\"viewbox\":\"viewBox\",\"viewtarget\":\"viewTarget\",\"xchannelselector\":\"xChannelSelector\",\"ychannelselector\":\"yChannelSelector\",\"zoomandpan\":\"zoomAndPan\"}}");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function getChildren(elem) {
    // @ts-ignore
    return elem.children || null;
}
exports.getChildren = getChildren;
function getParent(elem) {
    return elem.parent || null;
}
exports.getParent = getParent;
function getSiblings(elem) {
    var parent = getParent(elem);
    return parent ? getChildren(parent) : [elem];
}
exports.getSiblings = getSiblings;
function getAttributeValue(elem, name) {
    return elem.attribs && elem.attribs[name];
}
exports.getAttributeValue = getAttributeValue;
function hasAttrib(elem, name) {
    return !!getAttributeValue(elem, name);
}
exports.hasAttrib = hasAttrib;
/***
 * Returns the name property of an element
 *
 * @argument elem The element to get the name for
 */
function getName(elem) {
    return elem.name;
}
exports.getName = getName;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/***
 * Remove an element from the dom
 *
 * @argument elem The element to be removed
 */
function removeElement(elem) {
    if (elem.prev)
        elem.prev.next = elem.next;
    if (elem.next)
        elem.next.prev = elem.prev;
    if (elem.parent) {
        var childs = elem.parent.children;
        childs.splice(childs.lastIndexOf(elem), 1);
    }
}
exports.removeElement = removeElement;
/***
 * Replace an element in the dom
 *
 * @argument elem The element to be replaced
 * @argument replacement The element to be added
 */
function replaceElement(elem, replacement) {
    var prev = (replacement.prev = elem.prev);
    if (prev) {
        prev.next = replacement;
    }
    var next = (replacement.next = elem.next);
    if (next) {
        next.prev = replacement;
    }
    var parent = (replacement.parent = elem.parent);
    if (parent) {
        var childs = parent.children;
        childs[childs.lastIndexOf(elem)] = replacement;
    }
}
exports.replaceElement = replaceElement;
/***
 * Append a child to an element
 *
 * @argument elem The element to append to
 * @argument child The element to be added as a child
 */
function appendChild(elem, child) {
    child.parent = elem;
    if (elem.children.push(child) !== 1) {
        var sibling = elem.children[elem.children.length - 2];
        sibling.next = child;
        child.prev = sibling;
        child.next = null;
    }
}
exports.appendChild = appendChild;
/***
 * Append an element after another
 *
 * @argument elem The element to append to
 * @argument next The element be added
 */
function append(elem, next) {
    var parent = elem.parent, currNext = elem.next;
    next.next = currNext;
    next.prev = elem;
    elem.next = next;
    next.parent = parent;
    if (currNext) {
        currNext.prev = next;
        if (parent) {
            var childs = parent.children;
            childs.splice(childs.lastIndexOf(currNext), 0, next);
        }
    }
    else if (parent) {
        parent.children.push(next);
    }
}
exports.append = append;
/***
 * Prepend an element before another
 *
 * @argument elem The element to append to
 * @argument prev The element be added
 */
function prepend(elem, prev) {
    var parent = elem.parent;
    if (parent) {
        var childs = parent.children;
        childs.splice(childs.lastIndexOf(elem), 0, prev);
    }
    if (elem.prev) {
        elem.prev.next = prev;
    }
    prev.parent = parent;
    prev.prev = elem.prev;
    prev.next = elem;
    elem.prev = prev;
}
exports.prepend = prepend;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tagtypes_1 = __webpack_require__(17);
function filter(test, element, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    if (!Array.isArray(element))
        element = [element];
    return find(test, element, recurse, limit);
}
exports.filter = filter;
function find(test, elems, recurse, limit) {
    var result = [];
    for (var i = 0; i < elems.length; i++) {
        var elem = elems[i];
        if (test(elem)) {
            result.push(elem);
            if (--limit <= 0)
                break;
        }
        if (recurse && tagtypes_1.hasChildren(elem) && elem.children.length > 0) {
            var children = find(test, elem.children, recurse, limit);
            result = result.concat(children);
            limit -= children.length;
            if (limit <= 0)
                break;
        }
    }
    return result;
}
exports.find = find;
function findOneChild(test, elems) {
    for (var i = 0; i < elems.length; i++) {
        if (test(elems[i]))
            return elems[i];
    }
    return null;
}
exports.findOneChild = findOneChild;
function findOne(test, elems, recurse) {
    if (recurse === void 0) { recurse = true; }
    var elem = null;
    for (var i = 0; i < elems.length && !elem; i++) {
        var checked = elems[i];
        if (!tagtypes_1.isTag(checked)) {
            continue;
        }
        else if (test(checked)) {
            elem = checked;
        }
        else if (recurse && checked.children.length > 0) {
            elem = findOne(test, checked.children);
        }
    }
    return elem;
}
exports.findOne = findOne;
function existsOne(test, elems) {
    for (var i = 0; i < elems.length; i++) {
        var checked = elems[i];
        if (tagtypes_1.isTag(checked) &&
            (test(checked) ||
                (checked.children.length > 0 &&
                    existsOne(test, checked.children)))) {
            return true;
        }
    }
    return false;
}
exports.existsOne = existsOne;
function findAll(test, rootElems) {
    var result = [];
    var stack = rootElems.slice();
    while (stack.length) {
        var elem = stack.shift();
        if (!elem || !tagtypes_1.isTag(elem))
            continue;
        if (elem.children && elem.children.length > 0) {
            stack.unshift.apply(stack, elem.children);
        }
        if (test(elem))
            result.push(elem);
    }
    return result;
}
exports.findAll = findAll;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var querying_1 = __webpack_require__(25);
var tagtypes_1 = __webpack_require__(17);
function isTextNode(node) {
    return node.type === "text" /* Text */;
}
/* eslint-disable @typescript-eslint/camelcase */
var Checks = {
    tag_name: function (name) {
        if (typeof name === "function") {
            return function (elem) { return tagtypes_1.isTag(elem) && name(elem.name); };
        }
        else if (name === "*") {
            return tagtypes_1.isTag;
        }
        else {
            return function (elem) { return tagtypes_1.isTag(elem) && elem.name === name; };
        }
    },
    tag_type: function (type) {
        if (typeof type === "function") {
            return function (elem) { return type(elem.type); };
        }
        else {
            return function (elem) { return elem.type === type; };
        }
    },
    tag_contains: function (data) {
        if (typeof data === "function") {
            return function (elem) { return isTextNode(elem) && data(elem.data); };
        }
        else {
            return function (elem) { return isTextNode(elem) && elem.data === data; };
        }
    }
};
/* eslint-enable @typescript-eslint/camelcase */
function getAttribCheck(attrib, value) {
    if (typeof value === "function") {
        return function (elem) { return tagtypes_1.isTag(elem) && value(elem.attribs[attrib]); };
    }
    else {
        return function (elem) { return tagtypes_1.isTag(elem) && elem.attribs[attrib] === value; };
    }
}
function combineFuncs(a, b) {
    return function (elem) { return a(elem) || b(elem); };
}
function compileTest(options) {
    var funcs = Object.keys(options).map(function (key) {
        var value = options[key];
        // @ts-ignore
        return key in Checks ? Checks[key](value) : getAttribCheck(key, value);
    });
    return funcs.length === 0 ? null : funcs.reduce(combineFuncs);
}
function testElement(options, element) {
    var test = compileTest(options);
    return test ? test(element) : true;
}
exports.testElement = testElement;
function getElements(options, element, recurse, limit) {
    if (limit === void 0) { limit = Infinity; }
    var test = compileTest(options);
    return test ? querying_1.filter(test, element, recurse, limit) : [];
}
exports.getElements = getElements;
function getElementById(id, element, recurse) {
    if (recurse === void 0) { recurse = true; }
    if (!Array.isArray(element))
        element = [element];
    return querying_1.findOne(getAttribCheck("id", id), element, recurse);
}
exports.getElementById = getElementById;
function getElementsByTagName(name, element, recurse, limit) {
    if (limit === void 0) { limit = Infinity; }
    return querying_1.filter(Checks.tag_name(name), element, recurse, limit);
}
exports.getElementsByTagName = getElementsByTagName;
function getElementsByTagType(type, element, recurse, limit) {
    if (recurse === void 0) { recurse = true; }
    if (limit === void 0) { limit = Infinity; }
    return querying_1.filter(Checks.tag_type(type), element, recurse, limit);
}
exports.getElementsByTagType = getElementsByTagType;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tagtypes_1 = __webpack_require__(17);
/**
 * Given an array of nodes, remove any member that is contained by another.
 *
 * @param nodes — Nodes to filter.
 */
function removeSubsets(nodes) {
    var idx = nodes.length;
    // Check if each node (or one of its ancestors) is already contained in the
    // array.
    while (--idx >= 0) {
        var node = nodes[idx];
        // Remove the node if it is not unique.
        // We are going through the array from the end, so we only
        // have to check nodes that preceed the node under consideration in the array.
        if (idx > 0 && nodes.lastIndexOf(node, idx - 1) >= 0) {
            nodes.splice(idx, 1);
            continue;
        }
        for (var ancestor = node.parent; ancestor; ancestor = ancestor.parent) {
            if (nodes.indexOf(ancestor) > -1) {
                nodes.splice(idx, 1);
                break;
            }
        }
    }
    return nodes;
}
exports.removeSubsets = removeSubsets;
/***
 * Compare the position of one node against another node in any other document.
 * The return value is a bitmask with the following values:
 *
 * document order:
 * > There is an ordering, document order, defined on all the nodes in the
 * > document corresponding to the order in which the first character of the
 * > XML representation of each node occurs in the XML representation of the
 * > document after expansion of general entities. Thus, the document element
 * > node will be the first node. Element nodes occur before their children.
 * > Thus, document order orders element nodes in order of the occurrence of
 * > their start-tag in the XML (after expansion of entities). The attribute
 * > nodes of an element occur after the element and before its children. The
 * > relative order of attribute nodes is implementation-dependent./
 *
 * Source:
 * http://www.w3.org/TR/DOM-Level-3-Core/glossary.html#dt-document-order
 * @argument nodaA The first node to use in the comparison
 * @argument nodeB The second node to use in the comparison
 *
 * @return A bitmask describing the input nodes' relative position.
 *
 *        See http://dom.spec.whatwg.org/#dom-node-comparedocumentposition for
 *        a description of these values.
 */
function compareDocumentPosition(nodeA, nodeB) {
    var aParents = [];
    var bParents = [];
    if (nodeA === nodeB) {
        return 0;
    }
    var current = tagtypes_1.hasChildren(nodeA) ? nodeA : nodeA.parent;
    while (current) {
        aParents.unshift(current);
        current = current.parent;
    }
    current = tagtypes_1.hasChildren(nodeB) ? nodeB : nodeB.parent;
    while (current) {
        bParents.unshift(current);
        current = current.parent;
    }
    var idx = 0;
    while (aParents[idx] === bParents[idx]) {
        idx++;
    }
    if (idx === 0) {
        return 1 /* DISCONNECTED */;
    }
    var sharedParent = aParents[idx - 1];
    var siblings = sharedParent.children;
    var aSibling = aParents[idx];
    var bSibling = bParents[idx];
    if (siblings.indexOf(aSibling) > siblings.indexOf(bSibling)) {
        if (sharedParent === nodeB) {
            return 4 /* FOLLOWING */ | 16 /* CONTAINED_BY */;
        }
        return 4 /* FOLLOWING */;
    }
    else {
        if (sharedParent === nodeA) {
            return 2 /* PRECEDING */ | 8 /* CONTAINS */;
        }
        return 2 /* PRECEDING */;
    }
}
exports.compareDocumentPosition = compareDocumentPosition;
/***
 * Sort an array of nodes based on their relative position in the document and
 * remove any duplicate nodes. If the array contains nodes that do not belong
 * to the same document, sort order is unspecified.
 *
 * @argument nodes Array of DOM nodes
 * @returns collection of unique nodes, sorted in document order
 */
function uniqueSort(nodes) {
    nodes = nodes.filter(function (node, i, arr) { return !arr.includes(node, i + 1); });
    nodes.sort(function (a, b) {
        var relative = compareDocumentPosition(a, b);
        if (relative & 2 /* PRECEDING */) {
            return -1;
        }
        else if (relative & 4 /* FOLLOWING */) {
            return 1;
        }
        return 0;
    });
    return nodes;
}
exports.uniqueSort = uniqueSort;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Parser_1 = __webpack_require__(3);
var stream_1 = __webpack_require__(29);
var string_decoder_1 = __webpack_require__(30);
// Following the example in https://nodejs.org/api/stream.html#stream_decoding_buffers_in_a_writable_stream
function isBuffer(_chunk, encoding) {
    return encoding === "buffer";
}
/**
 * WritableStream makes the `Parser` interface available as a NodeJS stream.
 *
 * @see Parser
 */
var WritableStream = /** @class */ (function (_super) {
    __extends(WritableStream, _super);
    function WritableStream(cbs, options) {
        var _this = _super.call(this, { decodeStrings: false }) || this;
        _this._decoder = new string_decoder_1.StringDecoder();
        _this._parser = new Parser_1.Parser(cbs, options);
        return _this;
    }
    WritableStream.prototype._write = function (chunk, encoding, cb) {
        if (isBuffer(chunk, encoding))
            chunk = this._decoder.write(chunk);
        this._parser.write(chunk);
        cb();
    };
    WritableStream.prototype._final = function (cb) {
        this._parser.end(this._decoder.end());
        cb();
    };
    return WritableStream;
}(stream_1.Writable));
exports.WritableStream = WritableStream;


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("string_decoder");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var MultiplexHandler_1 = __importDefault(__webpack_require__(32));
var CollectingHandler = /** @class */ (function (_super) {
    __extends(CollectingHandler, _super);
    function CollectingHandler(cbs) {
        if (cbs === void 0) { cbs = {}; }
        var _this = _super.call(this, function (name) {
            var _a;
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            _this.events.push([name].concat(args));
            // @ts-ignore
            if (_this._cbs[name])
                (_a = _this._cbs)[name].apply(_a, args);
        }) || this;
        _this._cbs = cbs;
        _this.events = [];
        return _this;
    }
    CollectingHandler.prototype.onreset = function () {
        this.events = [];
        if (this._cbs.onreset)
            this._cbs.onreset();
    };
    CollectingHandler.prototype.restart = function () {
        var _a;
        if (this._cbs.onreset)
            this._cbs.onreset();
        for (var i = 0; i < this.events.length; i++) {
            var _b = this.events[i], name_1 = _b[0], args = _b.slice(1);
            if (!this._cbs[name_1]) {
                continue;
            }
            // @ts-ignore
            (_a = this._cbs)[name_1].apply(_a, args);
        }
    };
    return CollectingHandler;
}(MultiplexHandler_1.default));
exports.CollectingHandler = CollectingHandler;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calls a specific handler function for all events that are encountered.
 *
 * @param func — The function to multiplex all events to.
 */
var MultiplexHandler = /** @class */ (function () {
    function MultiplexHandler(func) {
        this._func = func;
    }
    /* Format: eventname: number of arguments */
    MultiplexHandler.prototype.onattribute = function (name, value) {
        this._func("onattribute", name, value);
    };
    MultiplexHandler.prototype.oncdatastart = function () {
        this._func("oncdatastart");
    };
    MultiplexHandler.prototype.oncdataend = function () {
        this._func("oncdataend");
    };
    MultiplexHandler.prototype.ontext = function (text) {
        this._func("ontext", text);
    };
    MultiplexHandler.prototype.onprocessinginstruction = function (name, value) {
        this._func("onprocessinginstruction", name, value);
    };
    MultiplexHandler.prototype.oncomment = function (comment) {
        this._func("oncomment", comment);
    };
    MultiplexHandler.prototype.oncommentend = function () {
        this._func("oncommentend");
    };
    MultiplexHandler.prototype.onclosetag = function (name) {
        this._func("onclosetag", name);
    };
    MultiplexHandler.prototype.onopentag = function (name, attribs) {
        this._func("onopentag", name, attribs);
    };
    MultiplexHandler.prototype.onopentagname = function (name) {
        this._func("onopentagname", name);
    };
    MultiplexHandler.prototype.onerror = function (error) {
        this._func("onerror", error);
    };
    MultiplexHandler.prototype.onend = function () {
        this._func("onend");
    };
    MultiplexHandler.prototype.onparserinit = function (parser) {
        this._func("onparserinit", parser);
    };
    MultiplexHandler.prototype.onreset = function () {
        this._func("onreset");
    };
    return MultiplexHandler;
}());
exports.default = MultiplexHandler;


/***/ })
/******/ ]);
