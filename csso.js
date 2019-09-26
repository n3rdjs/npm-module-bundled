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

var csstree = __webpack_require__(3);
var parse = csstree.parse;
var compress = __webpack_require__(124);
var generate = csstree.generate;

function debugOutput(name, options, startTime, data) {
    if (options.debug) {
        console.error('## ' + name + ' done in %d ms\n', Date.now() - startTime);
    }

    return data;
}

function createDefaultLogger(level) {
    var lastDebug;

    return function logger(title, ast) {
        var line = title;

        if (ast) {
            line = '[' + ((Date.now() - lastDebug) / 1000).toFixed(3) + 's] ' + line;
        }

        if (level > 1 && ast) {
            var css = generate(ast);

            // when level 2, limit css to 256 symbols
            if (level === 2 && css.length > 256) {
                css = css.substr(0, 256) + '...';
            }

            line += '\n  ' + css + '\n';
        }

        console.error(line);
        lastDebug = Date.now();
    };
}

function copy(obj) {
    var result = {};

    for (var key in obj) {
        result[key] = obj[key];
    }

    return result;
}

function buildCompressOptions(options) {
    options = copy(options);

    if (typeof options.logger !== 'function' && options.debug) {
        options.logger = createDefaultLogger(options.debug);
    }

    return options;
}

function runHandler(ast, options, handlers) {
    if (!Array.isArray(handlers)) {
        handlers = [handlers];
    }

    handlers.forEach(function(fn) {
        fn(ast, options);
    });
}

function minify(context, source, options) {
    options = options || {};

    var filename = options.filename || '<unknown>';
    var result;

    // parse
    var ast = debugOutput('parsing', options, Date.now(),
        parse(source, {
            context: context,
            filename: filename,
            positions: Boolean(options.sourceMap)
        })
    );

    // before compress handlers
    if (options.beforeCompress) {
        debugOutput('beforeCompress', options, Date.now(),
            runHandler(ast, options, options.beforeCompress)
        );
    }

    // compress
    var compressResult = debugOutput('compress', options, Date.now(),
        compress(ast, buildCompressOptions(options))
    );

    // after compress handlers
    if (options.afterCompress) {
        debugOutput('afterCompress', options, Date.now(),
            runHandler(compressResult, options, options.afterCompress)
        );
    }

    // generate
    if (options.sourceMap) {
        result = debugOutput('generate(sourceMap: true)', options, Date.now(), (function() {
            var tmp = generate(compressResult.ast, { sourceMap: true });
            tmp.map._file = filename; // since other tools can relay on file in source map transform chain
            tmp.map.setSourceContent(filename, source);
            return tmp;
        })());
    } else {
        result = debugOutput('generate', options, Date.now(), {
            css: generate(compressResult.ast),
            map: null
        });
    }

    return result;
}

function minifyStylesheet(source, options) {
    return minify('stylesheet', source, options);
}

function minifyBlock(source, options) {
    return minify('declarationList', source, options);
}

module.exports = {
    version: __webpack_require__(162).version,

    // main methods
    minify: minifyStylesheet,
    minifyBlock: minifyBlock,

    // compress an AST
    compress: compress,

    // css syntax parser/walkers/generator/etc
    syntax: csstree
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

function merge() {
    var dest = {};

    for (var i = 0; i < arguments.length; i++) {
        var src = arguments[i];
        for (var key in src) {
            dest[key] = src[key];
        }
    }

    return dest;
}

module.exports = __webpack_require__(5).create(
    merge(
        __webpack_require__(48),
        __webpack_require__(94),
        __webpack_require__(123)
    )
);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(6);
var Tokenizer = __webpack_require__(7);
var Lexer = __webpack_require__(13);
var grammar = __webpack_require__(28);
var createParser = __webpack_require__(29);
var createGenerator = __webpack_require__(31);
var createConvertor = __webpack_require__(44);
var createWalker = __webpack_require__(45);
var clone = __webpack_require__(46);
var names = __webpack_require__(16);
var mix = __webpack_require__(47);

function assign(dest, src) {
    for (var key in src) {
        dest[key] = src[key];
    }

    return dest;
}

function createSyntax(config) {
    var parse = createParser(config);
    var walk = createWalker(config);
    var generate = createGenerator(config);
    var convert = createConvertor(walk);

    var syntax = {
        List: List,
        Tokenizer: Tokenizer,
        Lexer: Lexer,

        vendorPrefix: names.vendorPrefix,
        keyword: names.keyword,
        property: names.property,
        isCustomProperty: names.isCustomProperty,

        grammar: grammar,
        lexer: null,
        createLexer: function(config) {
            return new Lexer(config, syntax, syntax.lexer.structure);
        },

        parse: parse,
        walk: walk,
        generate: generate,

        clone: clone,
        fromPlainObject: convert.fromPlainObject,
        toPlainObject: convert.toPlainObject,

        createSyntax: function(config) {
            return createSyntax(mix({}, config));
        },
        fork: function(extension) {
            var base = mix({}, config); // copy of config
            return createSyntax(
                typeof extension === 'function'
                    ? extension(base, assign)
                    : mix(base, extension)
            );
        }
    };

    syntax.lexer = new Lexer({
        generic: true,
        types: config.types,
        properties: config.properties,
        node: config.node
    }, syntax);

    return syntax;
};

exports.create = function(config) {
    return createSyntax(mix({}, config));
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//
//            item        item        item        item
//          /------\    /------\    /------\    /------\
//          | data |    | data |    | data |    | data |
//  null <--+-prev |<---+-prev |<---+-prev |<---+-prev |
//          | next-+--->| next-+--->| next-+--->| next-+--> null
//          \------/    \------/    \------/    \------/
//             ^                                    ^
//             |                list                |
//             |              /------\              |
//             \--------------+-head |              |
//                            | tail-+--------------/
//                            \------/
//

function createItem(data) {
    return {
        prev: null,
        next: null,
        data: data
    };
}

function allocateCursor(node, prev, next) {
    var cursor;

    if (cursors !== null) {
        cursor = cursors;
        cursors = cursors.cursor;
        cursor.prev = prev;
        cursor.next = next;
        cursor.cursor = node.cursor;
    } else {
        cursor = {
            prev: prev,
            next: next,
            cursor: node.cursor
        };
    }

    node.cursor = cursor;

    return cursor;
}

function releaseCursor(node) {
    var cursor = node.cursor;

    node.cursor = cursor.cursor;
    cursor.prev = null;
    cursor.next = null;
    cursor.cursor = cursors;
    cursors = cursor;
}

var cursors = null;
var List = function() {
    this.cursor = null;
    this.head = null;
    this.tail = null;
};

List.createItem = createItem;
List.prototype.createItem = createItem;

List.prototype.updateCursors = function(prevOld, prevNew, nextOld, nextNew) {
    var cursor = this.cursor;

    while (cursor !== null) {
        if (cursor.prev === prevOld) {
            cursor.prev = prevNew;
        }

        if (cursor.next === nextOld) {
            cursor.next = nextNew;
        }

        cursor = cursor.cursor;
    }
};

List.prototype.getSize = function() {
    var size = 0;
    var cursor = this.head;

    while (cursor) {
        size++;
        cursor = cursor.next;
    }

    return size;
};

List.prototype.fromArray = function(array) {
    var cursor = null;

    this.head = null;

    for (var i = 0; i < array.length; i++) {
        var item = createItem(array[i]);

        if (cursor !== null) {
            cursor.next = item;
        } else {
            this.head = item;
        }

        item.prev = cursor;
        cursor = item;
    }

    this.tail = cursor;

    return this;
};

List.prototype.toArray = function() {
    var cursor = this.head;
    var result = [];

    while (cursor) {
        result.push(cursor.data);
        cursor = cursor.next;
    }

    return result;
};

List.prototype.toJSON = List.prototype.toArray;

List.prototype.isEmpty = function() {
    return this.head === null;
};

List.prototype.first = function() {
    return this.head && this.head.data;
};

List.prototype.last = function() {
    return this.tail && this.tail.data;
};

List.prototype.each = function(fn, context) {
    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, null, this.head);

    while (cursor.next !== null) {
        item = cursor.next;
        cursor.next = item.next;

        fn.call(context, item.data, item, this);
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.forEach = List.prototype.each;

List.prototype.eachRight = function(fn, context) {
    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, this.tail, null);

    while (cursor.prev !== null) {
        item = cursor.prev;
        cursor.prev = item.prev;

        fn.call(context, item.data, item, this);
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.forEachRight = List.prototype.eachRight;

List.prototype.nextUntil = function(start, fn, context) {
    if (start === null) {
        return;
    }

    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, null, start);

    while (cursor.next !== null) {
        item = cursor.next;
        cursor.next = item.next;

        if (fn.call(context, item.data, item, this)) {
            break;
        }
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.prevUntil = function(start, fn, context) {
    if (start === null) {
        return;
    }

    var item;

    if (context === undefined) {
        context = this;
    }

    // push cursor
    var cursor = allocateCursor(this, start, null);

    while (cursor.prev !== null) {
        item = cursor.prev;
        cursor.prev = item.prev;

        if (fn.call(context, item.data, item, this)) {
            break;
        }
    }

    // pop cursor
    releaseCursor(this);
};

List.prototype.some = function(fn, context) {
    var cursor = this.head;

    if (context === undefined) {
        context = this;
    }

    while (cursor !== null) {
        if (fn.call(context, cursor.data, cursor, this)) {
            return true;
        }

        cursor = cursor.next;
    }

    return false;
};

List.prototype.map = function(fn, context) {
    var result = new List();
    var cursor = this.head;

    if (context === undefined) {
        context = this;
    }

    while (cursor !== null) {
        result.appendData(fn.call(context, cursor.data, cursor, this));
        cursor = cursor.next;
    }

    return result;
};

List.prototype.filter = function(fn, context) {
    var result = new List();
    var cursor = this.head;

    if (context === undefined) {
        context = this;
    }

    while (cursor !== null) {
        if (fn.call(context, cursor.data, cursor, this)) {
            result.appendData(cursor.data);
        }
        cursor = cursor.next;
    }

    return result;
};

List.prototype.clear = function() {
    this.head = null;
    this.tail = null;
};

List.prototype.copy = function() {
    var result = new List();
    var cursor = this.head;

    while (cursor !== null) {
        result.insert(createItem(cursor.data));
        cursor = cursor.next;
    }

    return result;
};

List.prototype.prepend = function(item) {
    //      head
    //    ^
    // item
    this.updateCursors(null, item, this.head, item);

    // insert to the beginning of the list
    if (this.head !== null) {
        // new item <- first item
        this.head.prev = item;

        // new item -> first item
        item.next = this.head;
    } else {
        // if list has no head, then it also has no tail
        // in this case tail points to the new item
        this.tail = item;
    }

    // head always points to new item
    this.head = item;

    return this;
};

List.prototype.prependData = function(data) {
    return this.prepend(createItem(data));
};

List.prototype.append = function(item) {
    return this.insert(item);
};

List.prototype.appendData = function(data) {
    return this.insert(createItem(data));
};

List.prototype.insert = function(item, before) {
    if (before !== undefined && before !== null) {
        // prev   before
        //      ^
        //     item
        this.updateCursors(before.prev, item, before, item);

        if (before.prev === null) {
            // insert to the beginning of list
            if (this.head !== before) {
                throw new Error('before doesn\'t belong to list');
            }

            // since head points to before therefore list doesn't empty
            // no need to check tail
            this.head = item;
            before.prev = item;
            item.next = before;

            this.updateCursors(null, item);
        } else {

            // insert between two items
            before.prev.next = item;
            item.prev = before.prev;

            before.prev = item;
            item.next = before;
        }
    } else {
        // tail
        //      ^
        //      item
        this.updateCursors(this.tail, item, null, item);

        // insert to the ending of the list
        if (this.tail !== null) {
            // last item -> new item
            this.tail.next = item;

            // last item <- new item
            item.prev = this.tail;
        } else {
            // if list has no tail, then it also has no head
            // in this case head points to new item
            this.head = item;
        }

        // tail always points to new item
        this.tail = item;
    }

    return this;
};

List.prototype.insertData = function(data, before) {
    return this.insert(createItem(data), before);
};

List.prototype.remove = function(item) {
    //      item
    //       ^
    // prev     next
    this.updateCursors(item, item.prev, item, item.next);

    if (item.prev !== null) {
        item.prev.next = item.next;
    } else {
        if (this.head !== item) {
            throw new Error('item doesn\'t belong to list');
        }

        this.head = item.next;
    }

    if (item.next !== null) {
        item.next.prev = item.prev;
    } else {
        if (this.tail !== item) {
            throw new Error('item doesn\'t belong to list');
        }

        this.tail = item.prev;
    }

    item.prev = null;
    item.next = null;

    return item;
};

List.prototype.push = function(data) {
    this.insert(createItem(data));
};

List.prototype.pop = function() {
    if (this.tail !== null) {
        return this.remove(this.tail);
    }
};

List.prototype.unshift = function(data) {
    this.prepend(createItem(data));
};

List.prototype.shift = function() {
    if (this.head !== null) {
        return this.remove(this.head);
    }
};

List.prototype.prependList = function(list) {
    return this.insertList(list, this.head);
};

List.prototype.appendList = function(list) {
    return this.insertList(list);
};

List.prototype.insertList = function(list, before) {
    // ignore empty lists
    if (list.head === null) {
        return this;
    }

    if (before !== undefined && before !== null) {
        this.updateCursors(before.prev, list.tail, before, list.head);

        // insert in the middle of dist list
        if (before.prev !== null) {
            // before.prev <-> list.head
            before.prev.next = list.head;
            list.head.prev = before.prev;
        } else {
            this.head = list.head;
        }

        before.prev = list.tail;
        list.tail.next = before;
    } else {
        this.updateCursors(this.tail, list.tail, null, list.head);

        // insert to end of the list
        if (this.tail !== null) {
            // if destination list has a tail, then it also has a head,
            // but head doesn't change

            // dest tail -> source head
            this.tail.next = list.head;

            // dest tail <- source head
            list.head.prev = this.tail;
        } else {
            // if list has no a tail, then it also has no a head
            // in this case points head to new item
            this.head = list.head;
        }

        // tail always start point to new item
        this.tail = list.tail;
    }

    list.head = null;
    list.tail = null;

    return this;
};

List.prototype.replace = function(oldItem, newItemOrList) {
    if ('head' in newItemOrList) {
        this.insertList(newItemOrList, oldItem);
    } else {
        this.insert(newItemOrList, oldItem);
    }

    this.remove(oldItem);
};

module.exports = List;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(8);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var CssSyntaxError = __webpack_require__(9);

var constants = __webpack_require__(11);
var TYPE = constants.TYPE;
var NAME = constants.NAME;
var SYMBOL_TYPE = constants.SYMBOL_TYPE;

var utils = __webpack_require__(12);
var firstCharOffset = utils.firstCharOffset;
var cmpStr = utils.cmpStr;
var isNumber = utils.isNumber;
var findWhiteSpaceStart = utils.findWhiteSpaceStart;
var findWhiteSpaceEnd = utils.findWhiteSpaceEnd;
var findCommentEnd = utils.findCommentEnd;
var findStringEnd = utils.findStringEnd;
var findNumberEnd = utils.findNumberEnd;
var findIdentifierEnd = utils.findIdentifierEnd;
var findUrlRawEnd = utils.findUrlRawEnd;

var NULL = 0;
var WHITESPACE = TYPE.WhiteSpace;
var IDENTIFIER = TYPE.Identifier;
var NUMBER = TYPE.Number;
var STRING = TYPE.String;
var COMMENT = TYPE.Comment;
var PUNCTUATOR = TYPE.Punctuator;
var CDO = TYPE.CDO;
var CDC = TYPE.CDC;
var ATKEYWORD = TYPE.AtKeyword;
var FUNCTION = TYPE.Function;
var URL = TYPE.Url;
var RAW = TYPE.Raw;

var N = 10;
var F = 12;
var R = 13;
var STAR = TYPE.Asterisk;
var SLASH = TYPE.Solidus;
var FULLSTOP = TYPE.FullStop;
var PLUSSIGN = TYPE.PlusSign;
var HYPHENMINUS = TYPE.HyphenMinus;
var GREATERTHANSIGN = TYPE.GreaterThanSign;
var LESSTHANSIGN = TYPE.LessThanSign;
var EXCLAMATIONMARK = TYPE.ExclamationMark;
var COMMERCIALAT = TYPE.CommercialAt;
var QUOTATIONMARK = TYPE.QuotationMark;
var APOSTROPHE = TYPE.Apostrophe;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;
var RIGHTCURLYBRACKET = TYPE.RightCurlyBracket;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var RIGHTSQUAREBRACKET = TYPE.RightSquareBracket;

var MIN_BUFFER_SIZE = 16 * 1024;
var OFFSET_MASK = 0x00FFFFFF;
var TYPE_SHIFT = 24;
var SafeUint32Array = typeof Uint32Array !== 'undefined' ? Uint32Array : Array; // fallback on Array when TypedArray is not supported

function computeLinesAndColumns(tokenizer, source) {
    var sourceLength = source.length;
    var start = firstCharOffset(source);
    var lines = tokenizer.lines;
    var line = tokenizer.startLine;
    var columns = tokenizer.columns;
    var column = tokenizer.startColumn;

    if (lines === null || lines.length < sourceLength + 1) {
        lines = new SafeUint32Array(Math.max(sourceLength + 1024, MIN_BUFFER_SIZE));
        columns = new SafeUint32Array(lines.length);
    }

    for (var i = start; i < sourceLength; i++) {
        var code = source.charCodeAt(i);

        lines[i] = line;
        columns[i] = column++;

        if (code === N || code === R || code === F) {
            if (code === R && i + 1 < sourceLength && source.charCodeAt(i + 1) === N) {
                i++;
                lines[i] = line;
                columns[i] = column;
            }

            line++;
            column = 1;
        }
    }

    lines[i] = line;
    columns[i] = column;

    tokenizer.linesAnsColumnsComputed = true;
    tokenizer.lines = lines;
    tokenizer.columns = columns;
}

function tokenLayout(tokenizer, source, startPos) {
    var sourceLength = source.length;
    var offsetAndType = tokenizer.offsetAndType;
    var balance = tokenizer.balance;
    var tokenCount = 0;
    var prevType = 0;
    var offset = startPos;
    var anchor = 0;
    var balanceCloseCode = 0;
    var balanceStart = 0;
    var balancePrev = 0;

    if (offsetAndType === null || offsetAndType.length < sourceLength + 1) {
        offsetAndType = new SafeUint32Array(sourceLength + 1024);
        balance = new SafeUint32Array(sourceLength + 1024);
    }

    while (offset < sourceLength) {
        var code = source.charCodeAt(offset);
        var type = code < 0x80 ? SYMBOL_TYPE[code] : IDENTIFIER;

        balance[tokenCount] = sourceLength;

        switch (type) {
            case WHITESPACE:
                offset = findWhiteSpaceEnd(source, offset + 1);
                break;

            case PUNCTUATOR:
                switch (code) {
                    case balanceCloseCode:
                        balancePrev = balanceStart & OFFSET_MASK;
                        balanceStart = balance[balancePrev];
                        balanceCloseCode = balanceStart >> TYPE_SHIFT;
                        balance[tokenCount] = balancePrev;
                        balance[balancePrev++] = tokenCount;
                        for (; balancePrev < tokenCount; balancePrev++) {
                            if (balance[balancePrev] === sourceLength) {
                                balance[balancePrev] = tokenCount;
                            }
                        }
                        break;

                    case LEFTSQUAREBRACKET:
                        balance[tokenCount] = balanceStart;
                        balanceCloseCode = RIGHTSQUAREBRACKET;
                        balanceStart = (balanceCloseCode << TYPE_SHIFT) | tokenCount;
                        break;

                    case LEFTCURLYBRACKET:
                        balance[tokenCount] = balanceStart;
                        balanceCloseCode = RIGHTCURLYBRACKET;
                        balanceStart = (balanceCloseCode << TYPE_SHIFT) | tokenCount;
                        break;

                    case LEFTPARENTHESIS:
                        balance[tokenCount] = balanceStart;
                        balanceCloseCode = RIGHTPARENTHESIS;
                        balanceStart = (balanceCloseCode << TYPE_SHIFT) | tokenCount;
                        break;
                }

                // /*
                if (code === STAR && prevType === SLASH) {
                    type = COMMENT;
                    offset = findCommentEnd(source, offset + 1);
                    tokenCount--; // rewrite prev token
                    break;
                }

                // edge case for -.123 and +.123
                if (code === FULLSTOP && (prevType === PLUSSIGN || prevType === HYPHENMINUS)) {
                    if (offset + 1 < sourceLength && isNumber(source.charCodeAt(offset + 1))) {
                        type = NUMBER;
                        offset = findNumberEnd(source, offset + 2, false);
                        tokenCount--; // rewrite prev token
                        break;
                    }
                }

                // <!--
                if (code === EXCLAMATIONMARK && prevType === LESSTHANSIGN) {
                    if (offset + 2 < sourceLength &&
                        source.charCodeAt(offset + 1) === HYPHENMINUS &&
                        source.charCodeAt(offset + 2) === HYPHENMINUS) {
                        type = CDO;
                        offset = offset + 3;
                        tokenCount--; // rewrite prev token
                        break;
                    }
                }

                // -->
                if (code === HYPHENMINUS && prevType === HYPHENMINUS) {
                    if (offset + 1 < sourceLength && source.charCodeAt(offset + 1) === GREATERTHANSIGN) {
                        type = CDC;
                        offset = offset + 2;
                        tokenCount--; // rewrite prev token
                        break;
                    }
                }

                // ident(
                if (code === LEFTPARENTHESIS && prevType === IDENTIFIER) {
                    offset = offset + 1;
                    tokenCount--; // rewrite prev token
                    balance[tokenCount] = balance[tokenCount + 1];
                    balanceStart--;

                    // 4 char length identifier and equal to `url(` (case insensitive)
                    if (offset - anchor === 4 && cmpStr(source, anchor, offset, 'url(')) {
                        // special case for url() because it can contain any symbols sequence with few exceptions
                        anchor = findWhiteSpaceEnd(source, offset);
                        code = source.charCodeAt(anchor);
                        if (code !== LEFTPARENTHESIS &&
                            code !== RIGHTPARENTHESIS &&
                            code !== QUOTATIONMARK &&
                            code !== APOSTROPHE) {
                            // url(
                            offsetAndType[tokenCount++] = (URL << TYPE_SHIFT) | offset;
                            balance[tokenCount] = sourceLength;

                            // ws*
                            if (anchor !== offset) {
                                offsetAndType[tokenCount++] = (WHITESPACE << TYPE_SHIFT) | anchor;
                                balance[tokenCount] = sourceLength;
                            }

                            // raw
                            type = RAW;
                            offset = findUrlRawEnd(source, anchor);
                        } else {
                            type = URL;
                        }
                    } else {
                        type = FUNCTION;
                    }
                    break;
                }

                type = code;
                offset = offset + 1;
                break;

            case NUMBER:
                offset = findNumberEnd(source, offset + 1, prevType !== FULLSTOP);

                // merge number with a preceding dot, dash or plus
                if (prevType === FULLSTOP ||
                    prevType === HYPHENMINUS ||
                    prevType === PLUSSIGN) {
                    tokenCount--; // rewrite prev token
                }

                break;

            case STRING:
                offset = findStringEnd(source, offset + 1, code);
                break;

            default:
                anchor = offset;
                offset = findIdentifierEnd(source, offset);

                // merge identifier with a preceding dash
                if (prevType === HYPHENMINUS) {
                    // rewrite prev token
                    tokenCount--;
                    // restore prev prev token type
                    // for case @-prefix-ident
                    prevType = tokenCount === 0 ? 0 : offsetAndType[tokenCount - 1] >> TYPE_SHIFT;
                }

                if (prevType === COMMERCIALAT) {
                    // rewrite prev token and change type to <at-keyword-token>
                    tokenCount--;
                    type = ATKEYWORD;
                }
        }

        offsetAndType[tokenCount++] = (type << TYPE_SHIFT) | offset;
        prevType = type;
    }

    // finalize arrays
    offsetAndType[tokenCount] = offset;
    balance[tokenCount] = sourceLength;
    balance[sourceLength] = sourceLength; // prevents false positive balance match with any token
    while (balanceStart !== 0) {
        balancePrev = balanceStart & OFFSET_MASK;
        balanceStart = balance[balancePrev];
        balance[balancePrev] = sourceLength;
    }

    tokenizer.offsetAndType = offsetAndType;
    tokenizer.tokenCount = tokenCount;
    tokenizer.balance = balance;
}

//
// tokenizer
//

var Tokenizer = function(source, startOffset, startLine, startColumn) {
    this.offsetAndType = null;
    this.balance = null;
    this.lines = null;
    this.columns = null;

    this.setSource(source, startOffset, startLine, startColumn);
};

Tokenizer.prototype = {
    setSource: function(source, startOffset, startLine, startColumn) {
        var safeSource = String(source || '');
        var start = firstCharOffset(safeSource);

        this.source = safeSource;
        this.firstCharOffset = start;
        this.startOffset = typeof startOffset === 'undefined' ? 0 : startOffset;
        this.startLine = typeof startLine === 'undefined' ? 1 : startLine;
        this.startColumn = typeof startColumn === 'undefined' ? 1 : startColumn;
        this.linesAnsColumnsComputed = false;

        this.eof = false;
        this.currentToken = -1;
        this.tokenType = 0;
        this.tokenStart = start;
        this.tokenEnd = start;

        tokenLayout(this, safeSource, start);
        this.next();
    },

    lookupType: function(offset) {
        offset += this.currentToken;

        if (offset < this.tokenCount) {
            return this.offsetAndType[offset] >> TYPE_SHIFT;
        }

        return NULL;
    },
    lookupNonWSType: function(offset) {
        offset += this.currentToken;

        for (var type; offset < this.tokenCount; offset++) {
            type = this.offsetAndType[offset] >> TYPE_SHIFT;

            if (type !== WHITESPACE) {
                return type;
            }
        }

        return NULL;
    },
    lookupValue: function(offset, referenceStr) {
        offset += this.currentToken;

        if (offset < this.tokenCount) {
            return cmpStr(
                this.source,
                this.offsetAndType[offset - 1] & OFFSET_MASK,
                this.offsetAndType[offset] & OFFSET_MASK,
                referenceStr
            );
        }

        return false;
    },
    getTokenStart: function(tokenNum) {
        if (tokenNum === this.currentToken) {
            return this.tokenStart;
        }

        if (tokenNum > 0) {
            return tokenNum < this.tokenCount
                ? this.offsetAndType[tokenNum - 1] & OFFSET_MASK
                : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
        }

        return this.firstCharOffset;
    },
    getOffsetExcludeWS: function() {
        if (this.currentToken > 0) {
            if ((this.offsetAndType[this.currentToken - 1] >> TYPE_SHIFT) === WHITESPACE) {
                return this.currentToken > 1
                    ? this.offsetAndType[this.currentToken - 2] & OFFSET_MASK
                    : this.firstCharOffset;
            }
        }
        return this.tokenStart;
    },
    getRawLength: function(startToken, endTokenType1, endTokenType2, includeTokenType2) {
        var cursor = startToken;
        var balanceEnd;

        loop:
        for (; cursor < this.tokenCount; cursor++) {
            balanceEnd = this.balance[cursor];

            // belance end points to offset before start
            if (balanceEnd < startToken) {
                break loop;
            }

            // check token is stop type
            switch (this.offsetAndType[cursor] >> TYPE_SHIFT) {
                case endTokenType1:
                    break loop;

                case endTokenType2:
                    if (includeTokenType2) {
                        cursor++;
                    }
                    break loop;

                default:
                    // fast forward to the end of balanced block
                    if (this.balance[balanceEnd] === cursor) {
                        cursor = balanceEnd;
                    }
            }

        }

        return cursor - this.currentToken;
    },
    isBalanceEdge: function(pos) {
        var balanceStart = this.balance[this.currentToken];
        return balanceStart < pos;
    },

    getTokenValue: function() {
        return this.source.substring(this.tokenStart, this.tokenEnd);
    },
    substrToCursor: function(start) {
        return this.source.substring(start, this.tokenStart);
    },

    skipWS: function() {
        for (var i = this.currentToken, skipTokenCount = 0; i < this.tokenCount; i++, skipTokenCount++) {
            if ((this.offsetAndType[i] >> TYPE_SHIFT) !== WHITESPACE) {
                break;
            }
        }

        if (skipTokenCount > 0) {
            this.skip(skipTokenCount);
        }
    },
    skipSC: function() {
        while (this.tokenType === WHITESPACE || this.tokenType === COMMENT) {
            this.next();
        }
    },
    skip: function(tokenCount) {
        var next = this.currentToken + tokenCount;

        if (next < this.tokenCount) {
            this.currentToken = next;
            this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.currentToken = this.tokenCount;
            this.next();
        }
    },
    next: function() {
        var next = this.currentToken + 1;

        if (next < this.tokenCount) {
            this.currentToken = next;
            this.tokenStart = this.tokenEnd;
            next = this.offsetAndType[next];
            this.tokenType = next >> TYPE_SHIFT;
            this.tokenEnd = next & OFFSET_MASK;
        } else {
            this.currentToken = this.tokenCount;
            this.eof = true;
            this.tokenType = NULL;
            this.tokenStart = this.tokenEnd = this.source.length;
        }
    },

    eat: function(tokenType) {
        if (this.tokenType !== tokenType) {
            var offset = this.tokenStart;
            var message = NAME[tokenType] + ' is expected';

            // tweak message and offset
            if (tokenType === IDENTIFIER) {
                // when identifier is expected but there is a function or url
                if (this.tokenType === FUNCTION || this.tokenType === URL) {
                    offset = this.tokenEnd - 1;
                    message += ' but function found';
                }
            } else {
                // when test type is part of another token show error for current position + 1
                // e.g. eat(HYPHENMINUS) will fail on "-foo", but pointing on "-" is odd
                if (this.source.charCodeAt(this.tokenStart) === tokenType) {
                    offset = offset + 1;
                }
            }

            this.error(message, offset);
        }

        this.next();
    },
    eatNonWS: function(tokenType) {
        this.skipWS();
        this.eat(tokenType);
    },

    consume: function(tokenType) {
        var value = this.getTokenValue();

        this.eat(tokenType);

        return value;
    },
    consumeFunctionName: function() {
        var name = this.source.substring(this.tokenStart, this.tokenEnd - 1);

        this.eat(FUNCTION);

        return name;
    },
    consumeNonWS: function(tokenType) {
        this.skipWS();

        return this.consume(tokenType);
    },

    expectIdentifier: function(name) {
        if (this.tokenType !== IDENTIFIER || cmpStr(this.source, this.tokenStart, this.tokenEnd, name) === false) {
            this.error('Identifier `' + name + '` is expected');
        }

        this.next();
    },

    getLocation: function(offset, filename) {
        if (!this.linesAnsColumnsComputed) {
            computeLinesAndColumns(this, this.source);
        }

        return {
            source: filename,
            offset: this.startOffset + offset,
            line: this.lines[offset],
            column: this.columns[offset]
        };
    },

    getLocationRange: function(start, end, filename) {
        if (!this.linesAnsColumnsComputed) {
            computeLinesAndColumns(this, this.source);
        }

        return {
            source: filename,
            start: {
                offset: this.startOffset + start,
                line: this.lines[start],
                column: this.columns[start]
            },
            end: {
                offset: this.startOffset + end,
                line: this.lines[end],
                column: this.columns[end]
            }
        };
    },

    error: function(message, offset) {
        var location = typeof offset !== 'undefined' && offset < this.source.length
            ? this.getLocation(offset)
            : this.eof
                ? this.getLocation(findWhiteSpaceStart(this.source, this.source.length - 1))
                : this.getLocation(this.tokenStart);

        throw new CssSyntaxError(
            message || 'Unexpected input',
            this.source,
            location.offset,
            location.line,
            location.column
        );
    },

    dump: function() {
        var offset = 0;

        return Array.prototype.slice.call(this.offsetAndType, 0, this.tokenCount).map(function(item, idx) {
            var start = offset;
            var end = item & OFFSET_MASK;

            offset = end;

            return {
                idx: idx,
                type: NAME[item >> TYPE_SHIFT],
                chunk: this.source.substring(start, end),
                balance: this.balance[idx]
            };
        }, this);
    }
};

// extend with error class
Tokenizer.CssSyntaxError = CssSyntaxError;

// extend tokenizer with constants
Object.keys(constants).forEach(function(key) {
    Tokenizer[key] = constants[key];
});

// extend tokenizer with static methods from utils
Object.keys(utils).forEach(function(key) {
    Tokenizer[key] = utils[key];
});

// warm up tokenizer to elimitate code branches that never execute
// fix soft deoptimizations (insufficient type feedback)
new Tokenizer('\n\r\r\n\f<!---->//""\'\'/*\r\n\f*/1a;.\\31\t\+2{url(a);func();+1.2e3 -.4e-5 .6e+7}').getLocation();

module.exports = Tokenizer;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createCustomError = __webpack_require__(10);
var MAX_LINE_LENGTH = 100;
var OFFSET_CORRECTION = 60;
var TAB_REPLACEMENT = '    ';

function sourceFragment(error, extraLines) {
    function processLines(start, end) {
        return lines.slice(start, end).map(function(line, idx) {
            var num = String(start + idx + 1);

            while (num.length < maxNumLength) {
                num = ' ' + num;
            }

            return num + ' |' + line;
        }).join('\n');
    }

    var lines = error.source.split(/\r\n?|\n|\f/);
    var line = error.line;
    var column = error.column;
    var startLine = Math.max(1, line - extraLines) - 1;
    var endLine = Math.min(line + extraLines, lines.length + 1);
    var maxNumLength = Math.max(4, String(endLine).length) + 1;
    var cutLeft = 0;

    // column correction according to replaced tab before column
    column += (TAB_REPLACEMENT.length - 1) * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;

    if (column > MAX_LINE_LENGTH) {
        cutLeft = column - OFFSET_CORRECTION + 3;
        column = OFFSET_CORRECTION - 2;
    }

    for (var i = startLine; i <= endLine; i++) {
        if (i >= 0 && i < lines.length) {
            lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
            lines[i] =
                (cutLeft > 0 && lines[i].length > cutLeft ? '\u2026' : '') +
                lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) +
                (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? '\u2026' : '');
        }
    }

    return [
        processLines(startLine, line),
        new Array(column + maxNumLength + 2).join('-') + '^',
        processLines(line, endLine)
    ].filter(Boolean).join('\n');
}

var CssSyntaxError = function(message, source, offset, line, column) {
    var error = createCustomError('CssSyntaxError', message);

    error.source = source;
    error.offset = offset;
    error.line = line;
    error.column = column;

    error.sourceFragment = function(extraLines) {
        return sourceFragment(error, isNaN(extraLines) ? 0 : extraLines);
    };
    Object.defineProperty(error, 'formattedMessage', {
        get: function() {
            return (
                'Parse error: ' + error.message + '\n' +
                sourceFragment(error, 2)
            );
        }
    });

    // for backward capability
    error.parseError = {
        offset: offset,
        line: line,
        column: column
    };

    return error;
};

module.exports = CssSyntaxError;


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function createCustomError(name, message) {
    // use Object.create(), because some VMs prevent setting line/column otherwise
    // (iOS Safari 10 even throws an exception)
    var error = Object.create(SyntaxError.prototype);
    var errorStack = new Error();

    error.name = name;
    error.message = message;

    Object.defineProperty(error, 'stack', {
        get: function() {
            return (errorStack.stack || '').replace(/^(.+\n){1,3}/, name + ': ' + message + '\n');
        }
    });

    return error;
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// token types (note: value shouldn't intersect with used char codes)
var WHITESPACE = 1;
var IDENTIFIER = 2;
var NUMBER = 3;
var STRING = 4;
var COMMENT = 5;
var PUNCTUATOR = 6;
var CDO = 7;
var CDC = 8;
var ATKEYWORD = 14;
var FUNCTION = 15;
var URL = 16;
var RAW = 17;

var TAB = 9;
var N = 10;
var F = 12;
var R = 13;
var SPACE = 32;

var TYPE = {
    WhiteSpace:   WHITESPACE,
    Identifier:   IDENTIFIER,
    Number:           NUMBER,
    String:           STRING,
    Comment:         COMMENT,
    Punctuator:   PUNCTUATOR,
    CDO:                 CDO,
    CDC:                 CDC,
    AtKeyword:     ATKEYWORD,
    Function:       FUNCTION,
    Url:                 URL,
    Raw:                 RAW,

    ExclamationMark:      33,  // !
    QuotationMark:        34,  // "
    NumberSign:           35,  // #
    DollarSign:           36,  // $
    PercentSign:          37,  // %
    Ampersand:            38,  // &
    Apostrophe:           39,  // '
    LeftParenthesis:      40,  // (
    RightParenthesis:     41,  // )
    Asterisk:             42,  // *
    PlusSign:             43,  // +
    Comma:                44,  // ,
    HyphenMinus:          45,  // -
    FullStop:             46,  // .
    Solidus:              47,  // /
    Colon:                58,  // :
    Semicolon:            59,  // ;
    LessThanSign:         60,  // <
    EqualsSign:           61,  // =
    GreaterThanSign:      62,  // >
    QuestionMark:         63,  // ?
    CommercialAt:         64,  // @
    LeftSquareBracket:    91,  // [
    Backslash:            92,  // \
    RightSquareBracket:   93,  // ]
    CircumflexAccent:     94,  // ^
    LowLine:              95,  // _
    GraveAccent:          96,  // `
    LeftCurlyBracket:    123,  // {
    VerticalLine:        124,  // |
    RightCurlyBracket:   125,  // }
    Tilde:               126   // ~
};

var NAME = Object.keys(TYPE).reduce(function(result, key) {
    result[TYPE[key]] = key;
    return result;
}, {});

// https://drafts.csswg.org/css-syntax/#tokenizer-definitions
// > non-ASCII code point
// >   A code point with a value equal to or greater than U+0080 <control>
// > name-start code point
// >   A letter, a non-ASCII code point, or U+005F LOW LINE (_).
// > name code point
// >   A name-start code point, a digit, or U+002D HYPHEN-MINUS (-)
// That means only ASCII code points has a special meaning and we a maps for 0..127 codes only
var SafeUint32Array = typeof Uint32Array !== 'undefined' ? Uint32Array : Array; // fallback on Array when TypedArray is not supported
var SYMBOL_TYPE = new SafeUint32Array(0x80);
var PUNCTUATION = new SafeUint32Array(0x80);
var STOP_URL_RAW = new SafeUint32Array(0x80);

for (var i = 0; i < SYMBOL_TYPE.length; i++) {
    SYMBOL_TYPE[i] = IDENTIFIER;
}

// fill categories
[
    TYPE.ExclamationMark,    // !
    TYPE.QuotationMark,      // "
    TYPE.NumberSign,         // #
    TYPE.DollarSign,         // $
    TYPE.PercentSign,        // %
    TYPE.Ampersand,          // &
    TYPE.Apostrophe,         // '
    TYPE.LeftParenthesis,    // (
    TYPE.RightParenthesis,   // )
    TYPE.Asterisk,           // *
    TYPE.PlusSign,           // +
    TYPE.Comma,              // ,
    TYPE.HyphenMinus,        // -
    TYPE.FullStop,           // .
    TYPE.Solidus,            // /
    TYPE.Colon,              // :
    TYPE.Semicolon,          // ;
    TYPE.LessThanSign,       // <
    TYPE.EqualsSign,         // =
    TYPE.GreaterThanSign,    // >
    TYPE.QuestionMark,       // ?
    TYPE.CommercialAt,       // @
    TYPE.LeftSquareBracket,  // [
    // TYPE.Backslash,          // \
    TYPE.RightSquareBracket, // ]
    TYPE.CircumflexAccent,   // ^
    // TYPE.LowLine,            // _
    TYPE.GraveAccent,        // `
    TYPE.LeftCurlyBracket,   // {
    TYPE.VerticalLine,       // |
    TYPE.RightCurlyBracket,  // }
    TYPE.Tilde               // ~
].forEach(function(key) {
    SYMBOL_TYPE[Number(key)] = PUNCTUATOR;
    PUNCTUATION[Number(key)] = PUNCTUATOR;
});

for (var i = 48; i <= 57; i++) {
    SYMBOL_TYPE[i] = NUMBER;
}

SYMBOL_TYPE[SPACE] = WHITESPACE;
SYMBOL_TYPE[TAB] = WHITESPACE;
SYMBOL_TYPE[N] = WHITESPACE;
SYMBOL_TYPE[R] = WHITESPACE;
SYMBOL_TYPE[F] = WHITESPACE;

SYMBOL_TYPE[TYPE.Apostrophe] = STRING;
SYMBOL_TYPE[TYPE.QuotationMark] = STRING;

STOP_URL_RAW[SPACE] = 1;
STOP_URL_RAW[TAB] = 1;
STOP_URL_RAW[N] = 1;
STOP_URL_RAW[R] = 1;
STOP_URL_RAW[F] = 1;
STOP_URL_RAW[TYPE.Apostrophe] = 1;
STOP_URL_RAW[TYPE.QuotationMark] = 1;
STOP_URL_RAW[TYPE.LeftParenthesis] = 1;
STOP_URL_RAW[TYPE.RightParenthesis] = 1;

// whitespace is punctuation ...
PUNCTUATION[SPACE] = PUNCTUATOR;
PUNCTUATION[TAB] = PUNCTUATOR;
PUNCTUATION[N] = PUNCTUATOR;
PUNCTUATION[R] = PUNCTUATOR;
PUNCTUATION[F] = PUNCTUATOR;
// ... hyper minus is not
PUNCTUATION[TYPE.HyphenMinus] = 0;

module.exports = {
    TYPE: TYPE,
    NAME: NAME,

    SYMBOL_TYPE: SYMBOL_TYPE,
    PUNCTUATION: PUNCTUATION,
    STOP_URL_RAW: STOP_URL_RAW
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var constants = __webpack_require__(11);
var PUNCTUATION = constants.PUNCTUATION;
var STOP_URL_RAW = constants.STOP_URL_RAW;
var TYPE = constants.TYPE;
var FULLSTOP = TYPE.FullStop;
var PLUSSIGN = TYPE.PlusSign;
var HYPHENMINUS = TYPE.HyphenMinus;
var PUNCTUATOR = TYPE.Punctuator;
var TAB = 9;
var N = 10;
var F = 12;
var R = 13;
var SPACE = 32;
var BACK_SLASH = 92;
var E = 101; // 'e'.charCodeAt(0)

function firstCharOffset(source) {
    // detect BOM (https://en.wikipedia.org/wiki/Byte_order_mark)
    if (source.charCodeAt(0) === 0xFEFF ||  // UTF-16BE
        source.charCodeAt(0) === 0xFFFE) {  // UTF-16LE
        return 1;
    }

    return 0;
}

function isHex(code) {
    return (code >= 48 && code <= 57) || // 0 .. 9
           (code >= 65 && code <= 70) || // A .. F
           (code >= 97 && code <= 102);  // a .. f
}

function isNumber(code) {
    return code >= 48 && code <= 57;
}

function isWhiteSpace(code) {
    return code === SPACE || code === TAB || isNewline(code);
}

function isNewline(code) {
    return code === R || code === N || code === F;
}

function getNewlineLength(source, offset, code) {
    if (isNewline(code)) {
        if (code === R && offset + 1 < source.length && source.charCodeAt(offset + 1) === N) {
            return 2;
        }

        return 1;
    }

    return 0;
}

function cmpChar(testStr, offset, referenceCode) {
    var code = testStr.charCodeAt(offset);

    // code.toLowerCase() for A..Z
    if (code >= 65 && code <= 90) {
        code = code | 32;
    }

    return code === referenceCode;
}

function cmpStr(testStr, start, end, referenceStr) {
    if (end - start !== referenceStr.length) {
        return false;
    }

    if (start < 0 || end > testStr.length) {
        return false;
    }

    for (var i = start; i < end; i++) {
        var testCode = testStr.charCodeAt(i);
        var refCode = referenceStr.charCodeAt(i - start);

        // testCode.toLowerCase() for A..Z
        if (testCode >= 65 && testCode <= 90) {
            testCode = testCode | 32;
        }

        if (testCode !== refCode) {
            return false;
        }
    }

    return true;
}

function findWhiteSpaceStart(source, offset) {
    while (offset >= 0 && isWhiteSpace(source.charCodeAt(offset))) {
        offset--;
    }

    return offset + 1;
}

function findWhiteSpaceEnd(source, offset) {
    while (offset < source.length && isWhiteSpace(source.charCodeAt(offset))) {
        offset++;
    }

    return offset;
}

function findCommentEnd(source, offset) {
    var commentEnd = source.indexOf('*/', offset);

    if (commentEnd === -1) {
        return source.length;
    }

    return commentEnd + 2;
}

function findStringEnd(source, offset, quote) {
    for (; offset < source.length; offset++) {
        var code = source.charCodeAt(offset);

        // TODO: bad string
        if (code === BACK_SLASH) {
            offset++;
        } else if (code === quote) {
            offset++;
            break;
        }
    }

    return offset;
}

function findDecimalNumberEnd(source, offset) {
    while (offset < source.length && isNumber(source.charCodeAt(offset))) {
        offset++;
    }

    return offset;
}

function findNumberEnd(source, offset, allowFraction) {
    var code;

    offset = findDecimalNumberEnd(source, offset);

    // fraction: .\d+
    if (allowFraction && offset + 1 < source.length && source.charCodeAt(offset) === FULLSTOP) {
        code = source.charCodeAt(offset + 1);

        if (isNumber(code)) {
            offset = findDecimalNumberEnd(source, offset + 1);
        }
    }

    // exponent: e[+-]\d+
    if (offset + 1 < source.length) {
        if ((source.charCodeAt(offset) | 32) === E) { // case insensitive check for `e`
            code = source.charCodeAt(offset + 1);

            if (code === PLUSSIGN || code === HYPHENMINUS) {
                if (offset + 2 < source.length) {
                    code = source.charCodeAt(offset + 2);
                }
            }

            if (isNumber(code)) {
                offset = findDecimalNumberEnd(source, offset + 2);
            }
        }
    }

    return offset;
}

// skip escaped unicode sequence that can ends with space
// [0-9a-f]{1,6}(\r\n|[ \n\r\t\f])?
function findEscapeEnd(source, offset) {
    for (var i = 0; i < 7 && offset + i < source.length; i++) {
        var code = source.charCodeAt(offset + i);

        if (i !== 6 && isHex(code)) {
            continue;
        }

        if (i > 0) {
            offset += i - 1 + getNewlineLength(source, offset + i, code);
            if (code === SPACE || code === TAB) {
                offset++;
            }
        }

        break;
    }

    return offset;
}

function findIdentifierEnd(source, offset) {
    for (; offset < source.length; offset++) {
        var code = source.charCodeAt(offset);

        if (code === BACK_SLASH) {
            offset = findEscapeEnd(source, offset + 1);
        } else if (code < 0x80 && PUNCTUATION[code] === PUNCTUATOR) {
            break;
        }
    }

    return offset;
}

function findUrlRawEnd(source, offset) {
    for (; offset < source.length; offset++) {
        var code = source.charCodeAt(offset);

        if (code === BACK_SLASH) {
            offset = findEscapeEnd(source, offset + 1);
        } else if (code < 0x80 && STOP_URL_RAW[code] === 1) {
            break;
        }
    }

    return offset;
}

module.exports = {
    firstCharOffset: firstCharOffset,

    isHex: isHex,
    isNumber: isNumber,
    isWhiteSpace: isWhiteSpace,
    isNewline: isNewline,
    getNewlineLength: getNewlineLength,

    cmpChar: cmpChar,
    cmpStr: cmpStr,

    findWhiteSpaceStart: findWhiteSpaceStart,
    findWhiteSpaceEnd: findWhiteSpaceEnd,
    findCommentEnd: findCommentEnd,
    findStringEnd: findStringEnd,
    findDecimalNumberEnd: findDecimalNumberEnd,
    findNumberEnd: findNumberEnd,
    findEscapeEnd: findEscapeEnd,
    findIdentifierEnd: findIdentifierEnd,
    findUrlRawEnd: findUrlRawEnd
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SyntaxReferenceError = __webpack_require__(14).SyntaxReferenceError;
var MatchError = __webpack_require__(14).MatchError;
var names = __webpack_require__(16);
var generic = __webpack_require__(17);
var parse = __webpack_require__(18);
var generate = __webpack_require__(15);
var walk = __webpack_require__(21);
var astToTokens = __webpack_require__(22);
var buildMatchGraph = __webpack_require__(23).buildMatchGraph;
var matchAsTree = __webpack_require__(24).matchAsTree;
var trace = __webpack_require__(25);
var search = __webpack_require__(26);
var getStructureFromConfig = __webpack_require__(27).getStructureFromConfig;
var cssWideKeywords = buildMatchGraph(parse('inherit | initial | unset'));
var cssWideKeywordsWithExpression = buildMatchGraph(parse('inherit | initial | unset | <expression>'));

function dumpMapSyntax(map, syntaxAsAst) {
    var result = {};

    for (var name in map) {
        if (map[name].syntax) {
            result[name] = syntaxAsAst ? map[name].syntax : generate(map[name].syntax);
        }
    }

    return result;
}

function valueHasVar(value) {
    var hasVar = false;

    this.syntax.walk(value, function(node) {
        if (node.type === 'Function' && node.name.toLowerCase() === 'var') {
            hasVar = true;
        }
    });

    return hasVar;
}

function buildMatchResult(match, error, iterations) {
    return {
        matched: match,
        iterations: iterations,
        error: error,
        getTrace: trace.getTrace,
        isType: trace.isType,
        isProperty: trace.isProperty,
        isKeyword: trace.isKeyword
    };
}

function matchSyntax(lexer, syntax, node, useCommon) {
    if (!node) {
        return buildMatchResult(null, new Error('Node is undefined'));
    }

    if (valueHasVar.call(lexer, node)) {
        return buildMatchResult(null, new Error('Matching for a tree with var() is not supported'));
    }

    var tokens = lexer.syntax.generate(node, astToTokens);
    var result;

    if (useCommon) {
        result = matchAsTree(tokens, lexer.valueCommonSyntax, lexer);
    }

    if (!useCommon || !result.match) {
        result = matchAsTree(tokens, syntax.match, lexer);
        if (!result.match) {
            return buildMatchResult(
                null,
                new MatchError(result.reason, lexer, syntax.syntax, node, result),
                result.iterations
            );
        }
    }

    return buildMatchResult(result.match, null, result.iterations);
}

var Lexer = function(config, syntax, structure) {
    this.valueCommonSyntax = cssWideKeywords;
    this.syntax = syntax;
    this.generic = false;
    this.properties = {};
    this.types = {};
    this.structure = structure || getStructureFromConfig(config);

    if (config) {
        if (config.generic) {
            this.generic = true;
            for (var name in generic) {
                this.addType_(name, generic[name]);
            }
        }

        if (config.types) {
            for (var name in config.types) {
                this.addType_(name, config.types[name]);
            }
        }

        if (config.properties) {
            for (var name in config.properties) {
                this.addProperty_(name, config.properties[name]);
            }
        }
    }
};

Lexer.prototype = {
    structure: {},
    checkStructure: function(ast) {
        function collectWarning(node, message) {
            warns.push({
                node: node,
                message: message
            });
        }

        var structure = this.structure;
        var warns = [];

        this.syntax.walk(ast, function(node) {
            if (structure.hasOwnProperty(node.type)) {
                structure[node.type].check(node, collectWarning);
            } else {
                collectWarning(node, 'Unknown node type `' + node.type + '`');
            }
        });

        return warns.length ? warns : false;
    },

    createDescriptor: function(syntax, type, name) {
        var ref = {
            type: type,
            name: name
        };
        var descriptor = {
            type: type,
            name: name,
            syntax: null,
            match: null
        };

        if (typeof syntax === 'function') {
            descriptor.match = buildMatchGraph(syntax, ref);
        } else {
            if (typeof syntax === 'string') {
                // lazy parsing on first access
                Object.defineProperty(descriptor, 'syntax', {
                    get: function() {
                        Object.defineProperty(descriptor, 'syntax', {
                            value: parse(syntax)
                        });

                        return descriptor.syntax;
                    }
                });
            } else {
                descriptor.syntax = syntax;
            }

            Object.defineProperty(descriptor, 'match', {
                get: function() {
                    Object.defineProperty(descriptor, 'match', {
                        value: buildMatchGraph(descriptor.syntax, ref)
                    });

                    return descriptor.match;
                }
            });
        }

        return descriptor;
    },
    addProperty_: function(name, syntax) {
        this.properties[name] = this.createDescriptor(syntax, 'Property', name);
    },
    addType_: function(name, syntax) {
        this.types[name] = this.createDescriptor(syntax, 'Type', name);

        if (syntax === generic.expression) {
            this.valueCommonSyntax = cssWideKeywordsWithExpression;
        }
    },

    matchDeclaration: function(node) {
        if (node.type !== 'Declaration') {
            return buildMatchResult(null, new Error('Not a Declaration node'));
        }

        return this.matchProperty(node.property, node.value);
    },
    matchProperty: function(propertyName, value) {
        var property = names.property(propertyName);

        // don't match syntax for a custom property
        if (property.custom) {
            return buildMatchResult(null, new Error('Lexer matching doesn\'t applicable for custom properties'));
        }

        var propertySyntax = property.vendor
            ? this.getProperty(property.name) || this.getProperty(property.basename)
            : this.getProperty(property.name);

        if (!propertySyntax) {
            return buildMatchResult(null, new SyntaxReferenceError('Unknown property', propertyName));
        }

        return matchSyntax(this, propertySyntax, value, true);
    },
    matchType: function(typeName, value) {
        var typeSyntax = this.getType(typeName);

        if (!typeSyntax) {
            return buildMatchResult(null, new SyntaxReferenceError('Unknown type', typeName));
        }

        return matchSyntax(this, typeSyntax, value, false);
    },
    match: function(syntax, value) {
        if (!syntax || !syntax.type) {
            return buildMatchResult(null, new SyntaxReferenceError('Bad syntax'));
        }

        if (!syntax.match) {
            syntax = this.createDescriptor(syntax);
        }

        return matchSyntax(this, syntax, value, false);
    },

    findValueFragments: function(propertyName, value, type, name) {
        return search.matchFragments(this, value, this.matchProperty(propertyName, value), type, name);
    },
    findDeclarationValueFragments: function(declaration, type, name) {
        return search.matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name);
    },
    findAllFragments: function(ast, type, name) {
        var result = [];

        this.syntax.walk(ast, {
            visit: 'Declaration',
            enter: function(declaration) {
                result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
            }.bind(this)
        });

        return result;
    },

    getProperty: function(name) {
        return this.properties.hasOwnProperty(name) ? this.properties[name] : null;
    },
    getType: function(name) {
        return this.types.hasOwnProperty(name) ? this.types[name] : null;
    },

    validate: function() {
        function validate(syntax, name, broken, descriptor) {
            if (broken.hasOwnProperty(name)) {
                return broken[name];
            }

            broken[name] = false;
            if (descriptor.syntax !== null) {
                walk(descriptor.syntax, function(node) {
                    if (node.type !== 'Type' && node.type !== 'Property') {
                        return;
                    }

                    var map = node.type === 'Type' ? syntax.types : syntax.properties;
                    var brokenMap = node.type === 'Type' ? brokenTypes : brokenProperties;

                    if (!map.hasOwnProperty(node.name) || validate(syntax, node.name, brokenMap, map[node.name])) {
                        broken[name] = true;
                    }
                }, this);
            }
        }

        var brokenTypes = {};
        var brokenProperties = {};

        for (var key in this.types) {
            validate(this, key, brokenTypes, this.types[key]);
        }

        for (var key in this.properties) {
            validate(this, key, brokenProperties, this.properties[key]);
        }

        brokenTypes = Object.keys(brokenTypes).filter(function(name) {
            return brokenTypes[name];
        });
        brokenProperties = Object.keys(brokenProperties).filter(function(name) {
            return brokenProperties[name];
        });

        if (brokenTypes.length || brokenProperties.length) {
            return {
                types: brokenTypes,
                properties: brokenProperties
            };
        }

        return null;
    },
    dump: function(syntaxAsAst) {
        return {
            generic: this.generic,
            types: dumpMapSyntax(this.types, syntaxAsAst),
            properties: dumpMapSyntax(this.properties, syntaxAsAst)
        };
    },
    toString: function() {
        return JSON.stringify(this.dump());
    }
};

module.exports = Lexer;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createCustomError = __webpack_require__(10);
var generateGrammar = __webpack_require__(15);

function fromMatchResult(matchResult) {
    var tokens = matchResult.tokens;
    var longestMatch = matchResult.longestMatch;
    var node = longestMatch < tokens.length ? tokens[longestMatch].node : null;
    var mismatchOffset = 0;
    var entries = 0;
    var css = '';

    for (var i = 0; i < tokens.length; i++) {
        if (i === longestMatch) {
            mismatchOffset = css.length;
        }

        if (node !== null && tokens[i].node === node) {
            if (i <= longestMatch) {
                entries++;
            } else {
                entries = 0;
            }
        }

        css += tokens[i].value;
    }

    if (node === null) {
        mismatchOffset = css.length;
    }

    return {
        node: node,
        css: css,
        mismatchOffset: mismatchOffset,
        last: node === null || entries > 1
    };
}

function getLocation(node, point) {
    var loc = node && node.loc && node.loc[point];

    if (loc) {
        return {
            offset: loc.offset,
            line: loc.line,
            column: loc.column
        };
    }

    return null;
}

var SyntaxReferenceError = function(type, referenceName) {
    var error = createCustomError(
        'SyntaxReferenceError',
        type + (referenceName ? ' `' + referenceName + '`' : '')
    );

    error.reference = referenceName;

    return error;
};

var MatchError = function(message, lexer, syntax, node, matchResult) {
    var error = createCustomError('SyntaxMatchError', message);
    var details = fromMatchResult(matchResult);
    var mismatchOffset = details.mismatchOffset || 0;
    var badNode = details.node || node;
    var end = getLocation(badNode, 'end');
    var start = details.last ? end : getLocation(badNode, 'start');
    var css = details.css;

    error.rawMessage = message;
    error.syntax = syntax ? generateGrammar(syntax) : '<generic>';
    error.css = css;
    error.mismatchOffset = mismatchOffset;
    error.loc = {
        source: (badNode && badNode.loc && badNode.loc.source) || '<unknown>',
        start: start,
        end: end
    };
    error.line = start ? start.line : undefined;
    error.column = start ? start.column : undefined;
    error.offset = start ? start.offset : undefined;
    error.message = message + '\n' +
        '  syntax: ' + error.syntax + '\n' +
        '   value: ' + (error.css || '<empty string>') + '\n' +
        '  --------' + new Array(error.mismatchOffset + 1).join('-') + '^';

    return error;
};

module.exports = {
    SyntaxReferenceError: SyntaxReferenceError,
    MatchError: MatchError
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

function noop(value) {
    return value;
}

function generateMultiplier(multiplier) {
    if (multiplier.min === 0 && multiplier.max === 0) {
        return '*';
    }

    if (multiplier.min === 0 && multiplier.max === 1) {
        return '?';
    }

    if (multiplier.min === 1 && multiplier.max === 0) {
        return multiplier.comma ? '#' : '+';
    }

    if (multiplier.min === 1 && multiplier.max === 1) {
        return '';
    }

    return (
        (multiplier.comma ? '#' : '') +
        (multiplier.min === multiplier.max
            ? '{' + multiplier.min + '}'
            : '{' + multiplier.min + ',' + (multiplier.max !== 0 ? multiplier.max : '') + '}'
        )
    );
}

function generateSequence(node, forceBraces, decorate) {
    var result = node.terms.map(function(term) {
        return generate(term, forceBraces, decorate);
    }).join(node.combinator === ' ' ? ' ' : ' ' + node.combinator + ' ');

    if (node.explicit || forceBraces) {
        result = (result[0] !== ',' ? '[ ' : '[') + result + ' ]';
    }

    return result;
}

function generate(node, forceBraces, decorate) {
    var result;

    switch (node.type) {
        case 'Group':
            result =
                generateSequence(node, forceBraces, decorate) +
                (node.disallowEmpty ? '!' : '');
            break;

        case 'Multiplier':
            // return since node is a composition
            return (
                generate(node.term, forceBraces, decorate) +
                decorate(generateMultiplier(node), node)
            );

        case 'Type':
            result = '<' + node.name + '>';
            break;

        case 'Property':
            result = '<\'' + node.name + '\'>';
            break;

        case 'Keyword':
            result = node.name;
            break;

        case 'AtKeyword':
            result = '@' + node.name;
            break;

        case 'Function':
            result = node.name + '(';
            break;

        case 'String':
        case 'Token':
            result = node.value;
            break;

        case 'Comma':
            result = ',';
            break;

        default:
            throw new Error('Unknown node type `' + node.type + '`');
    }

    return decorate(result, node);
}

module.exports = function(node, options) {
    var decorate = noop;
    var forceBraces = false;

    if (typeof options === 'function') {
        decorate = options;
    } else if (options) {
        forceBraces = Boolean(options.forceBraces);
        if (typeof options.decorate === 'function') {
            decorate = options.decorate;
        }
    }

    return generate(node, forceBraces, decorate);
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = Object.prototype.hasOwnProperty;
var keywords = Object.create(null);
var properties = Object.create(null);
var HYPHENMINUS = 45; // '-'.charCodeAt()

function isCustomProperty(str, offset) {
    offset = offset || 0;

    return str.length - offset >= 2 &&
           str.charCodeAt(offset) === HYPHENMINUS &&
           str.charCodeAt(offset + 1) === HYPHENMINUS;
}

function getVendorPrefix(str, offset) {
    offset = offset || 0;

    // verdor prefix should be at least 3 chars length
    if (str.length - offset >= 3) {
        // vendor prefix starts with hyper minus following non-hyper minus
        if (str.charCodeAt(offset) === HYPHENMINUS &&
            str.charCodeAt(offset + 1) !== HYPHENMINUS) {
            // vendor prefix should contain a hyper minus at the ending
            var secondDashIndex = str.indexOf('-', offset + 2);

            if (secondDashIndex !== -1) {
                return str.substring(offset, secondDashIndex + 1);
            }
        }
    }

    return '';
}

function getKeywordDescriptor(keyword) {
    if (hasOwnProperty.call(keywords, keyword)) {
        return keywords[keyword];
    }

    var name = keyword.toLowerCase();

    if (hasOwnProperty.call(keywords, name)) {
        return keywords[keyword] = keywords[name];
    }

    var custom = isCustomProperty(name, 0);
    var vendor = !custom ? getVendorPrefix(name, 0) : '';

    return keywords[keyword] = Object.freeze({
        basename: name.substr(vendor.length),
        name: name,
        vendor: vendor,
        prefix: vendor,
        custom: custom
    });
}

function getPropertyDescriptor(property) {
    if (hasOwnProperty.call(properties, property)) {
        return properties[property];
    }

    var name = property;
    var hack = property[0];

    if (hack === '/') {
        hack = property[1] === '/' ? '//' : '/';
    } else if (hack !== '_' &&
               hack !== '*' &&
               hack !== '$' &&
               hack !== '#' &&
               hack !== '+') {
        hack = '';
    }

    var custom = isCustomProperty(name, hack.length);

    // re-use result when possible (the same as for lower case)
    if (!custom) {
        name = name.toLowerCase();
        if (hasOwnProperty.call(properties, name)) {
            return properties[property] = properties[name];
        }
    }

    var vendor = !custom ? getVendorPrefix(name, hack.length) : '';
    var prefix = name.substr(0, hack.length + vendor.length);

    return properties[property] = Object.freeze({
        basename: name.substr(prefix.length),
        name: name.substr(hack.length),
        hack: hack,
        vendor: vendor,
        prefix: prefix,
        custom: custom
    });
}

module.exports = {
    keyword: getKeywordDescriptor,
    property: getPropertyDescriptor,
    isCustomProperty: isCustomProperty,
    vendorPrefix: getVendorPrefix
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var tokenizerUtils = __webpack_require__(12);
var findIdentifierEnd = tokenizerUtils.findIdentifierEnd;
var findNumberEnd = tokenizerUtils.findNumberEnd;
var findDecimalNumberEnd = tokenizerUtils.findDecimalNumberEnd;
var isHex = tokenizerUtils.isHex;
var tokenizerConst = __webpack_require__(11);
var SYMBOL_TYPE = tokenizerConst.SYMBOL_TYPE;
var IDENTIFIER = tokenizerConst.TYPE.Identifier;
var PLUSSIGN = tokenizerConst.TYPE.PlusSign;
var HYPHENMINUS = tokenizerConst.TYPE.HyphenMinus;
var NUMBERSIGN = tokenizerConst.TYPE.NumberSign;

var PERCENTAGE = {
    '%': true
};

// https://www.w3.org/TR/css-values-3/#lengths
var LENGTH = {
    // absolute length units
    'px': true,
    'mm': true,
    'cm': true,
    'in': true,
    'pt': true,
    'pc': true,
    'q': true,

    // relative length units
    'em': true,
    'ex': true,
    'ch': true,
    'rem': true,

    // viewport-percentage lengths
    'vh': true,
    'vw': true,
    'vmin': true,
    'vmax': true,
    'vm': true
};

var ANGLE = {
    'deg': true,
    'grad': true,
    'rad': true,
    'turn': true
};

var TIME = {
    's': true,
    'ms': true
};

var FREQUENCY = {
    'hz': true,
    'khz': true
};

// https://www.w3.org/TR/css-values-3/#resolution (https://drafts.csswg.org/css-values/#resolution)
var RESOLUTION = {
    'dpi': true,
    'dpcm': true,
    'dppx': true,
    'x': true      // https://github.com/w3c/csswg-drafts/issues/461
};

// https://drafts.csswg.org/css-grid/#fr-unit
var FLEX = {
    'fr': true
};

// https://www.w3.org/TR/css3-speech/#mixing-props-voice-volume
var DECIBEL = {
    'db': true
};

// https://www.w3.org/TR/css3-speech/#voice-props-voice-pitch
var SEMITONES = {
    'st': true
};

function consumeFunction(token, addTokenToMatch, getNextToken) {
    var length = 1;
    var cursor;

    do {
        cursor = getNextToken(length++);
    } while (cursor !== null && cursor.node !== token.node);

    if (cursor === null) {
        return false;
    }

    while (true) {
        // consume tokens until cursor
        if (addTokenToMatch() === cursor) {
            break;
        }
    }

    return true;
}

// TODO: implement
// can be used wherever <length>, <frequency>, <angle>, <time>, <percentage>, <number>, or <integer> values are allowed
// https://drafts.csswg.org/css-values/#calc-notation
function calc(token, addTokenToMatch, getNextToken) {
    if (token === null) {
        return false;
    }

    var name = token.value.toLowerCase();
    if (name !== 'calc(' &&
        name !== '-moz-calc(' &&
        name !== '-webkit-calc(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function attr(token, addTokenToMatch, getNextToken) {
    if (token === null || token.value.toLowerCase() !== 'attr(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function expression(token, addTokenToMatch, getNextToken) {
    if (token === null || token.value.toLowerCase() !== 'expression(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function url(token, addTokenToMatch, getNextToken) {
    if (token === null || token.value.toLowerCase() !== 'url(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function idSelector(token, addTokenToMatch) {
    if (token === null) {
        return false;
    }

    if (token.value.charCodeAt(0) !== NUMBERSIGN) {
        return false;
    }

    if (consumeIdentifier(token.value, 1) !== token.value.length) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function isNumber(str) {
    return /^[-+]?(\d+|\d*\.\d+)([eE][-+]?\d+)?$/.test(str);
}

function consumeNumber(str, allowFraction) {
    var code = str.charCodeAt(0);

    return findNumberEnd(str, code === PLUSSIGN || code === HYPHENMINUS ? 1 : 0, allowFraction);
}

function consumeIdentifier(str, offset) {
    var code = str.charCodeAt(offset);

    if (code < 0x80 && SYMBOL_TYPE[code] !== IDENTIFIER && code !== HYPHENMINUS) {
        return offset;
    }

    return findIdentifierEnd(str, offset + 1);
}

function astNode(type) {
    return function(token, addTokenToMatch) {
        if (token === null || token.node.type !== type) {
            return false;
        }

        addTokenToMatch();
        return true;
    };
}

function dimension(type) {
    return function(token, addTokenToMatch, getNextToken) {
        if (calc(token, addTokenToMatch, getNextToken)) {
            return true;
        }

        if (token === null) {
            return false;
        }

        var numberEnd = consumeNumber(token.value, true);
        if (numberEnd === 0) {
            return false;
        }

        if (type) {
            if (!type.hasOwnProperty(token.value.substr(numberEnd).toLowerCase())) {
                return false;
            }
        } else {
            var unitEnd = consumeIdentifier(token.value, numberEnd);
            if (unitEnd === numberEnd || unitEnd !== token.value.length) {
                return false;
            }
        }

        addTokenToMatch();
        return true;
    };
}

function zeroUnitlessDimension(type) {
    var isDimension = dimension(type);

    return function(token, addTokenToMatch, getNextToken) {
        if (isDimension(token, addTokenToMatch, getNextToken)) {
            return true;
        }

        if (token === null || Number(token.value) !== 0) {
            return false;
        }

        addTokenToMatch();
        return true;
    };
}

function number(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null) {
        return false;
    }

    var numberEnd = consumeNumber(token.value, true);
    if (numberEnd !== token.value.length) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function numberZeroOne(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null || !isNumber(token.value)) {
        return false;
    }

    var value = Number(token.value);
    if (value < 0 || value > 1) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function numberOneOrGreater(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null || !isNumber(token.value)) {
        return false;
    }

    var value = Number(token.value);
    if (value < 1) {
        return false;
    }

    addTokenToMatch();
    return true;
}

// TODO: fail on 10e-2
function integer(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null) {
        return false;
    }

    var numberEnd = consumeNumber(token.value, false);
    if (numberEnd !== token.value.length) {
        return false;
    }

    addTokenToMatch();
    return true;
}

// TODO: fail on 10e-2
function positiveInteger(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null) {
        return false;
    }

    var numberEnd = findDecimalNumberEnd(token.value, 0);
    if (numberEnd !== token.value.length || token.value.charCodeAt(0) === HYPHENMINUS) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function hexColor(token, addTokenToMatch) {
    if (token === null || token.value.charCodeAt(0) !== NUMBERSIGN) {
        return false;
    }

    var length = token.value.length - 1;

    // valid length is 3, 4, 6 and 8 (+1 for #)
    if (length !== 3 && length !== 4 && length !== 6 && length !== 8) {
        return false;
    }

    for (var i = 1; i < length; i++) {
        if (!isHex(token.value.charCodeAt(i))) {
            return false;
        }
    }

    addTokenToMatch();
    return true;
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
// https://drafts.csswg.org/css-values-4/#identifier-value
function customIdent(token, addTokenToMatch) {
    if (token === null) {
        return false;
    }

    var identEnd = consumeIdentifier(token.value, 0);
    if (identEnd !== token.value.length) {
        return false;
    }

    var name = token.value.toLowerCase();

    // § 3.2. Author-defined Identifiers: the <custom-ident> type
    // The CSS-wide keywords are not valid <custom-ident>s
    if (name === 'unset' || name === 'initial' || name === 'inherit') {
        return false;
    }

    // The default keyword is reserved and is also not a valid <custom-ident>
    if (name === 'default') {
        return false;
    }

    // TODO: ignore property specific keywords (as described https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident)

    addTokenToMatch();
    return true;
}

module.exports = {
    'angle': zeroUnitlessDimension(ANGLE),
    'attr()': attr,
    'custom-ident': customIdent,
    'decibel': dimension(DECIBEL),
    'dimension': dimension(),
    'frequency': dimension(FREQUENCY),
    'flex': dimension(FLEX),
    'hex-color': hexColor,
    'id-selector': idSelector, // element( <id-selector> )
    'ident': astNode('Identifier'),
    'integer': integer,
    'length': zeroUnitlessDimension(LENGTH),
    'number': number,
    'number-zero-one': numberZeroOne,
    'number-one-or-greater': numberOneOrGreater,
    'percentage': dimension(PERCENTAGE),
    'positive-integer': positiveInteger,
    'resolution': dimension(RESOLUTION),
    'semitones': dimension(SEMITONES),
    'string': astNode('String'),
    'time': dimension(TIME),
    'unicode-range': astNode('UnicodeRange'),
    'url': url,

    // old IE stuff
    'progid': astNode('Raw'),
    'expression': expression
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Tokenizer = __webpack_require__(19);
var TAB = 9;
var N = 10;
var F = 12;
var R = 13;
var SPACE = 32;
var EXCLAMATIONMARK = 33;    // !
var NUMBERSIGN = 35;         // #
var AMPERSAND = 38;          // &
var APOSTROPHE = 39;         // '
var LEFTPARENTHESIS = 40;    // (
var RIGHTPARENTHESIS = 41;   // )
var ASTERISK = 42;           // *
var PLUSSIGN = 43;           // +
var COMMA = 44;              // ,
var LESSTHANSIGN = 60;       // <
var GREATERTHANSIGN = 62;    // >
var QUESTIONMARK = 63;       // ?
var COMMERCIALAT = 64;       // @
var LEFTSQUAREBRACKET = 91;  // [
var RIGHTSQUAREBRACKET = 93; // ]
var LEFTCURLYBRACKET = 123;  // {
var VERTICALLINE = 124;      // |
var RIGHTCURLYBRACKET = 125; // }
var NAME_CHAR = createCharMap(function(ch) {
    return /[a-zA-Z0-9\-]/.test(ch);
});
var COMBINATOR_PRECEDENCE = {
    ' ': 1,
    '&&': 2,
    '||': 3,
    '|': 4
};

function createCharMap(fn) {
    var array = typeof Uint32Array === 'function' ? new Uint32Array(128) : new Array(128);
    for (var i = 0; i < 128; i++) {
        array[i] = fn(String.fromCharCode(i)) ? 1 : 0;
    }
    return array;
}

function scanSpaces(tokenizer) {
    return tokenizer.substringToPos(
        tokenizer.findWsEnd(tokenizer.pos + 1)
    );
}

function scanWord(tokenizer) {
    var end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        var code = tokenizer.str.charCodeAt(end);
        if (code >= 128 || NAME_CHAR[code] === 0) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a keyword');
    }

    return tokenizer.substringToPos(end);
}

function scanNumber(tokenizer) {
    var end = tokenizer.pos;

    for (; end < tokenizer.str.length; end++) {
        var code = tokenizer.str.charCodeAt(end);
        if (code < 48 || code > 57) {
            break;
        }
    }

    if (tokenizer.pos === end) {
        tokenizer.error('Expect a number');
    }

    return tokenizer.substringToPos(end);
}

function scanString(tokenizer) {
    var end = tokenizer.str.indexOf('\'', tokenizer.pos + 1);

    if (end === -1) {
        tokenizer.pos = tokenizer.str.length;
        tokenizer.error('Expect an apostrophe');
    }

    return tokenizer.substringToPos(end + 1);
}

function readMultiplierRange(tokenizer) {
    var min = null;
    var max = null;

    tokenizer.eat(LEFTCURLYBRACKET);

    min = scanNumber(tokenizer);

    if (tokenizer.charCode() === COMMA) {
        tokenizer.pos++;
        if (tokenizer.charCode() !== RIGHTCURLYBRACKET) {
            max = scanNumber(tokenizer);
        }
    } else {
        max = min;
    }

    tokenizer.eat(RIGHTCURLYBRACKET);

    return {
        min: Number(min),
        max: max ? Number(max) : 0
    };
}

function readMultiplier(tokenizer) {
    var range = null;
    var comma = false;

    switch (tokenizer.charCode()) {
        case ASTERISK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 0
            };

            break;

        case PLUSSIGN:
            tokenizer.pos++;

            range = {
                min: 1,
                max: 0
            };

            break;

        case QUESTIONMARK:
            tokenizer.pos++;

            range = {
                min: 0,
                max: 1
            };

            break;

        case NUMBERSIGN:
            tokenizer.pos++;

            comma = true;

            if (tokenizer.charCode() === LEFTCURLYBRACKET) {
                range = readMultiplierRange(tokenizer);
            } else {
                range = {
                    min: 1,
                    max: 0
                };
            }

            break;

        case LEFTCURLYBRACKET:
            range = readMultiplierRange(tokenizer);
            break;

        default:
            return null;
    }

    return {
        type: 'Multiplier',
        comma: comma,
        min: range.min,
        max: range.max,
        term: null
    };
}

function maybeMultiplied(tokenizer, node) {
    var multiplier = readMultiplier(tokenizer);

    if (multiplier !== null) {
        multiplier.term = node;
        return multiplier;
    }

    return node;
}

function maybeToken(tokenizer) {
    var ch = tokenizer.peek();

    if (ch === '') {
        return null;
    }

    return {
        type: 'Token',
        value: ch
    };
}

function readProperty(tokenizer) {
    var name;

    tokenizer.eat(LESSTHANSIGN);
    tokenizer.eat(APOSTROPHE);

    name = scanWord(tokenizer);

    tokenizer.eat(APOSTROPHE);
    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Property',
        name: name
    });
}

function readType(tokenizer) {
    var name;

    tokenizer.eat(LESSTHANSIGN);
    name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS &&
        tokenizer.nextCharCode() === RIGHTPARENTHESIS) {
        tokenizer.pos += 2;
        name += '()';
    }

    tokenizer.eat(GREATERTHANSIGN);

    return maybeMultiplied(tokenizer, {
        type: 'Type',
        name: name
    });
}

function readKeywordOrFunction(tokenizer) {
    var name;

    name = scanWord(tokenizer);

    if (tokenizer.charCode() === LEFTPARENTHESIS) {
        tokenizer.pos++;

        return {
            type: 'Function',
            name: name
        };
    }

    return maybeMultiplied(tokenizer, {
        type: 'Keyword',
        name: name
    });
}

function regroupTerms(terms, combinators) {
    function createGroup(terms, combinator) {
        return {
            type: 'Group',
            terms: terms,
            combinator: combinator,
            disallowEmpty: false,
            explicit: false
        };
    }

    combinators = Object.keys(combinators).sort(function(a, b) {
        return COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b];
    });

    while (combinators.length > 0) {
        var combinator = combinators.shift();
        for (var i = 0, subgroupStart = 0; i < terms.length; i++) {
            var term = terms[i];
            if (term.type === 'Combinator') {
                if (term.value === combinator) {
                    if (subgroupStart === -1) {
                        subgroupStart = i - 1;
                    }
                    terms.splice(i, 1);
                    i--;
                } else {
                    if (subgroupStart !== -1 && i - subgroupStart > 1) {
                        terms.splice(
                            subgroupStart,
                            i - subgroupStart,
                            createGroup(terms.slice(subgroupStart, i), combinator)
                        );
                        i = subgroupStart + 1;
                    }
                    subgroupStart = -1;
                }
            }
        }

        if (subgroupStart !== -1 && combinators.length) {
            terms.splice(
                subgroupStart,
                i - subgroupStart,
                createGroup(terms.slice(subgroupStart, i), combinator)
            );
        }
    }

    return combinator;
}

function readImplicitGroup(tokenizer) {
    var terms = [];
    var combinators = {};
    var token;
    var prevToken = null;
    var prevTokenPos = tokenizer.pos;

    while (token = peek(tokenizer)) {
        if (token.type !== 'Spaces') {
            if (token.type === 'Combinator') {
                // check for combinator in group beginning and double combinator sequence
                if (prevToken === null || prevToken.type === 'Combinator') {
                    tokenizer.pos = prevTokenPos;
                    tokenizer.error('Unexpected combinator');
                }

                combinators[token.value] = true;
            } else if (prevToken !== null && prevToken.type !== 'Combinator') {
                combinators[' '] = true;  // a b
                terms.push({
                    type: 'Combinator',
                    value: ' '
                });
            }

            terms.push(token);
            prevToken = token;
            prevTokenPos = tokenizer.pos;
        }
    }

    // check for combinator in group ending
    if (prevToken !== null && prevToken.type === 'Combinator') {
        tokenizer.pos -= prevTokenPos;
        tokenizer.error('Unexpected combinator');
    }

    return {
        type: 'Group',
        terms: terms,
        combinator: regroupTerms(terms, combinators) || ' ',
        disallowEmpty: false,
        explicit: false
    };
}

function readGroup(tokenizer) {
    var result;

    tokenizer.eat(LEFTSQUAREBRACKET);
    result = readImplicitGroup(tokenizer);
    tokenizer.eat(RIGHTSQUAREBRACKET);

    result.explicit = true;

    if (tokenizer.charCode() === EXCLAMATIONMARK) {
        tokenizer.pos++;
        result.disallowEmpty = true;
    }

    return result;
}

function peek(tokenizer) {
    var code = tokenizer.charCode();

    if (code < 128 && NAME_CHAR[code] === 1) {
        return readKeywordOrFunction(tokenizer);
    }

    switch (code) {
        case RIGHTSQUAREBRACKET:
            // don't eat, stop scan a group
            break;

        case LEFTSQUAREBRACKET:
            return maybeMultiplied(tokenizer, readGroup(tokenizer));

        case LESSTHANSIGN:
            return tokenizer.nextCharCode() === APOSTROPHE
                ? readProperty(tokenizer)
                : readType(tokenizer);

        case VERTICALLINE:
            return {
                type: 'Combinator',
                value: tokenizer.substringToPos(
                    tokenizer.nextCharCode() === VERTICALLINE
                        ? tokenizer.pos + 2
                        : tokenizer.pos + 1
                )
            };

        case AMPERSAND:
            tokenizer.pos++;
            tokenizer.eat(AMPERSAND);

            return {
                type: 'Combinator',
                value: '&&'
            };

        case COMMA:
            tokenizer.pos++;
            return {
                type: 'Comma'
            };

        case APOSTROPHE:
            return maybeMultiplied(tokenizer, {
                type: 'String',
                value: scanString(tokenizer)
            });

        case SPACE:
        case TAB:
        case N:
        case R:
        case F:
            return {
                type: 'Spaces',
                value: scanSpaces(tokenizer)
            };

        case COMMERCIALAT:
            code = tokenizer.nextCharCode();

            if (code < 128 && NAME_CHAR[code] === 1) {
                tokenizer.pos++;
                return {
                    type: 'AtKeyword',
                    name: scanWord(tokenizer)
                };
            }

            return maybeToken(tokenizer);

        case ASTERISK:
        case PLUSSIGN:
        case QUESTIONMARK:
        case NUMBERSIGN:
        case EXCLAMATIONMARK:
            // prohibited tokens (used as a multiplier start)
            break;

        case LEFTCURLYBRACKET:
            // LEFTCURLYBRACKET is allowed since mdn/data uses it w/o quoting
            // check next char isn't a number, because it's likely a disjoined multiplier
            code = tokenizer.nextCharCode();

            if (code < 48 || code > 57) {
                return maybeToken(tokenizer);
            }

            break;

        default:
            return maybeToken(tokenizer);
    }
}

function parse(str) {
    var tokenizer = new Tokenizer(str);
    var result = readImplicitGroup(tokenizer);

    if (tokenizer.pos !== str.length) {
        tokenizer.error('Unexpected input');
    }

    // reduce redundant groups with single group term
    if (result.terms.length === 1 && result.terms[0].type === 'Group') {
        result = result.terms[0];
    }

    return result;
}

// warm up parse to elimitate code branches that never execute
// fix soft deoptimizations (insufficient type feedback)
parse('[a&&<b>#|<\'c\'>*||e() f{2} /,(% g#{1,2} h{2,})]!');

module.exports = parse;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var SyntaxParseError = __webpack_require__(20).SyntaxParseError;

var TAB = 9;
var N = 10;
var F = 12;
var R = 13;
var SPACE = 32;

var Tokenizer = function(str) {
    this.str = str;
    this.pos = 0;
};

Tokenizer.prototype = {
    charCodeAt: function(pos) {
        return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
    },
    charCode: function() {
        return this.charCodeAt(this.pos);
    },
    nextCharCode: function() {
        return this.charCodeAt(this.pos + 1);
    },
    nextNonWsCode: function(pos) {
        return this.charCodeAt(this.findWsEnd(pos));
    },
    findWsEnd: function(pos) {
        for (; pos < this.str.length; pos++) {
            var code = this.str.charCodeAt(pos);
            if (code !== R && code !== N && code !== F && code !== SPACE && code !== TAB) {
                break;
            }
        }

        return pos;
    },
    substringToPos: function(end) {
        return this.str.substring(this.pos, this.pos = end);
    },
    eat: function(code) {
        if (this.charCode() !== code) {
            this.error('Expect `' + String.fromCharCode(code) + '`');
        }

        this.pos++;
    },
    peek: function() {
        return this.pos < this.str.length ? this.str.charAt(this.pos++) : '';
    },
    error: function(message) {
        throw new SyntaxParseError(message, this.str, this.pos);
    }
};

module.exports = Tokenizer;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var createCustomError = __webpack_require__(10);

var SyntaxParseError = function(message, input, offset) {
    var error = createCustomError('SyntaxParseError', message);

    error.input = input;
    error.offset = offset;
    error.rawMessage = message;
    error.message = error.rawMessage + '\n' +
        '  ' + error.input + '\n' +
        '--' + new Array((error.offset || error.input.length) + 1).join('-') + '^';

    return error;
};

module.exports = {
    SyntaxParseError: SyntaxParseError
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

module.exports = function(node, options, context) {
    function walk(node) {
        enter.call(context, node);

        switch (node.type) {
            case 'Group':
                node.terms.forEach(walk);
                break;

            case 'Multiplier':
                walk(node.term);
                break;

            case 'Type':
            case 'Property':
            case 'Keyword':
            case 'AtKeyword':
            case 'Function':
            case 'String':
            case 'Token':
            case 'Comma':
                break;

            default:
                throw new Error('Unknown type: ' + node.type);
        }

        leave.call(context, node);
    }

    var enter = noop;
    var leave = noop;

    if (typeof options === 'function') {
        enter = options;
    } else if (options) {
        enter = ensureFunction(options.enter);
        leave = ensureFunction(options.leave);
    }

    if (enter === noop && leave === noop) {
        throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
    }

    walk(node, context);
};


/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = {
    decorator: function(handlers) {
        var curNode = null;
        var prev = null;
        var tokens = [];

        return {
            children: handlers.children,
            node: function(node) {
                var tmp = curNode;
                curNode = node;
                handlers.node.call(this, node);
                curNode = tmp;
            },
            chunk: function(chunk) {
                if (tokens.length > 0) {
                    switch (curNode.type) {
                        case 'Dimension':
                        case 'HexColor':
                        case 'IdSelector':
                        case 'Percentage':
                            if (prev.node === curNode) {
                                prev.value += chunk;
                                return;
                            }
                            break;

                        case 'Function':
                        case 'PseudoClassSelector':
                        case 'PseudoElementSelector':
                        case 'Url':
                            if (chunk === '(') {
                                prev.value += chunk;
                                return;
                            }
                            break;

                        case 'Atrule':
                            if (prev.node === curNode && prev.value === '@') {
                                prev.value += chunk;
                                return;
                            }
                            break;
                    }
                }

                tokens.push(prev = {
                    value: chunk,
                    node: curNode
                });
            },
            result: function() {
                return tokens;
            }
        };
    }
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var parse = __webpack_require__(18);

var MATCH = { type: 'Match' };
var MISMATCH = { type: 'Mismatch' };
var DISALLOW_EMPTY = { type: 'DisallowEmpty' };
var LEFTPARENTHESIS = 40;  // (
var RIGHTPARENTHESIS = 41; // )

function createCondition(match, thenBranch, elseBranch) {
    // reduce node count
    if (thenBranch === MATCH && elseBranch === MISMATCH) {
        return match;
    }

    if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) {
        return match;
    }

    if (match.type === 'If' && match.else === MISMATCH && thenBranch === MATCH) {
        thenBranch = match.then;
        match = match.match;
    }

    return {
        type: 'If',
        match: match,
        then: thenBranch,
        else: elseBranch
    };
}

function isFunctionType(name) {
    return (
        name.length > 2 &&
        name.charCodeAt(name.length - 2) === LEFTPARENTHESIS &&
        name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS
    );
}

function isEnumCapatible(term) {
    return (
        term.type === 'Keyword' ||
        term.type === 'AtKeyword' ||
        term.type === 'Function' ||
        term.type === 'Type' && isFunctionType(term.name)
    );
}

function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
    switch (combinator) {
        case ' ':
            // Juxtaposing components means that all of them must occur, in the given order.
            //
            // a b c
            // =
            // match a
            //   then match b
            //     then match c
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            //   else MISMATCH
            var result = MATCH;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];

                result = createCondition(
                    term,
                    result,
                    MISMATCH
                );
            };

            return result;

        case '|':
            // A bar (|) separates two or more alternatives: exactly one of them must occur.
            //
            // a | b | c
            // =
            // match a
            //   then MATCH
            //   else match b
            //     then MATCH
            //     else match c
            //       then MATCH
            //       else MISMATCH

            var result = MISMATCH;
            var map = null;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];

                // reduce sequence of keywords into a Enum
                if (isEnumCapatible(term)) {
                    if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
                        map = Object.create(null);
                        result = createCondition(
                            {
                                type: 'Enum',
                                map: map
                            },
                            MATCH,
                            result
                        );
                    }

                    if (map !== null) {
                        var key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
                        if (key in map === false) {
                            map[key] = term;
                            continue;
                        }
                    }
                }

                map = null;

                // create a new conditonal node
                result = createCondition(
                    term,
                    MATCH,
                    result
                );
            };

            return result;

        case '&&':
            // A double ampersand (&&) separates two or more components,
            // all of which must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since &&-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms: terms,
                    all: true
                };
            }

            // Use a combination tree for groups with small number of terms
            //
            // a && b && c
            // =
            // match a
            //   then [b && c]
            //   else match b
            //     then [a && c]
            //     else match c
            //       then [a && b]
            //       else MISMATCH
            //
            // a && b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MISMATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MISMATCH
            //     else MISMATCH
            var result = MISMATCH;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];
                var thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        false
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            };

            return result;

        case '||':
            // A double bar (||) separates two or more options:
            // one or more of them must occur, in any order.

            // Use MatchOnce for groups with a large number of terms,
            // since ||-groups produces at least N!-node trees
            if (terms.length > 5) {
                return {
                    type: 'MatchOnce',
                    terms: terms,
                    all: false
                };;
            }

            // Use a combination tree for groups with small number of terms
            //
            // a || b || c
            // =
            // match a
            //   then [b || c]
            //   else match b
            //     then [a || c]
            //     else match c
            //       then [a || b]
            //       else MISMATCH
            //
            // a || b
            // =
            // match a
            //   then match b
            //     then MATCH
            //     else MATCH
            //   else match b
            //     then match a
            //       then MATCH
            //       else MATCH
            //     else MISMATCH
            var result = atLeastOneTermMatched ? MATCH : MISMATCH;

            for (var i = terms.length - 1; i >= 0; i--) {
                var term = terms[i];
                var thenClause;

                if (terms.length > 1) {
                    thenClause = buildGroupMatchGraph(
                        combinator,
                        terms.filter(function(newGroupTerm) {
                            return newGroupTerm !== term;
                        }),
                        true
                    );
                } else {
                    thenClause = MATCH;
                }

                result = createCondition(
                    term,
                    thenClause,
                    result
                );
            };

            return result;
    }
}

function buildMultiplierMatchGraph(node) {
    var result = MATCH;
    var matchTerm = buildMatchGraph(node.term);

    if (node.max === 0) {
        // disable repeating of empty match to prevent infinite loop
        matchTerm = createCondition(
            matchTerm,
            DISALLOW_EMPTY,
            MISMATCH
        );

        // an occurrence count is not limited, make a cycle;
        // to collect more terms on each following matching mismatch
        result = createCondition(
            matchTerm,
            null, // will be a loop
            MISMATCH
        );

        result.then = createCondition(
            MATCH,
            MATCH,
            result // make a loop
        );

        if (node.comma) {
            result.then.else = createCondition(
                { type: 'Comma', syntax: node },
                result,
                MISMATCH
            );
        }
    } else {
        // create a match node chain for [min .. max] interval with optional matches
        for (var i = node.min || 1; i <= node.max; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                createCondition(
                    MATCH,
                    MATCH,
                    result
                ),
                MISMATCH
            );
        }
    }

    if (node.min === 0) {
        // allow zero match
        result = createCondition(
            MATCH,
            MATCH,
            result
        );
    } else {
        // create a match node chain to collect [0 ... min - 1] required matches
        for (var i = 0; i < node.min - 1; i++) {
            if (node.comma && result !== MATCH) {
                result = createCondition(
                    { type: 'Comma', syntax: node },
                    result,
                    MISMATCH
                );
            }

            result = createCondition(
                matchTerm,
                result,
                MISMATCH
            );
        }
    }

    return result;
}

function buildMatchGraph(node) {
    if (typeof node === 'function') {
        return {
            type: 'Generic',
            fn: node
        };
    }

    switch (node.type) {
        case 'Group':
            var result = buildGroupMatchGraph(
                node.combinator,
                node.terms.map(buildMatchGraph),
                false
            );

            if (node.disallowEmpty) {
                result = createCondition(
                    result,
                    DISALLOW_EMPTY,
                    MISMATCH
                );
            }

            return result;

        case 'Multiplier':
            return buildMultiplierMatchGraph(node);

        case 'Type':
        case 'Property':
            return {
                type: node.type,
                name: node.name,
                syntax: node
            };

        case 'Keyword':
            return {
                type: node.type,
                name: node.name.toLowerCase(),
                syntax: node
            };

        case 'AtKeyword':
            return {
                type: node.type,
                name: '@' + node.name.toLowerCase(),
                syntax: node
            };

        case 'Function':
            return {
                type: node.type,
                name: node.name.toLowerCase() + '(',
                syntax: node
            };

        case 'String':
            // convert a one char length String to a Token
            if (node.value.length === 3) {
                return {
                    type: 'Token',
                    value: node.value.charAt(1),
                    syntax: node
                };
            }

            // otherwise use it as is
            return {
                type: node.type,
                value: node.value,
                syntax: node
            };

        case 'Token':
            return {
                type: node.type,
                value: node.value,
                syntax: node
            };

        case 'Comma':
            return {
                type: node.type,
                syntax: node
            };

        default:
            throw new Error('Unknown node type:', node.type);
    }
}

module.exports = {
    MATCH: MATCH,
    MISMATCH: MISMATCH,
    DISALLOW_EMPTY: DISALLOW_EMPTY,
    buildMatchGraph: function(syntaxTree, ref) {
        if (typeof syntaxTree === 'string') {
            syntaxTree = parse(syntaxTree);
        }

        return {
            type: 'MatchGraph',
            match: buildMatchGraph(syntaxTree),
            syntax: ref || null,
            source: syntaxTree
        };
    }
};


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = Object.prototype.hasOwnProperty;
var matchGraph = __webpack_require__(23);
var MATCH = matchGraph.MATCH;
var MISMATCH = matchGraph.MISMATCH;
var DISALLOW_EMPTY = matchGraph.DISALLOW_EMPTY;

var TOKEN = 1;
var OPEN_SYNTAX = 2;
var CLOSE_SYNTAX = 3;

var EXIT_REASON_MATCH = 'Match';
var EXIT_REASON_MISMATCH = 'Mismatch';
var EXIT_REASON_ITERATION_LIMIT = 'Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)';

var ITERATION_LIMIT = 10000;
var totalIterationCount = 0;

function mapList(list, fn) {
    var result = [];

    while (list) {
        result.unshift(fn(list));
        list = list.prev;
    }

    return result;
}

function isCommaContextStart(token) {
    if (token === null) {
        return true;
    }

    token = token.value.charAt(token.value.length - 1);

    return (
        token === ',' ||
        token === '(' ||
        token === '[' ||
        token === '/'
    );
}

function isCommaContextEnd(token) {
    if (token === null) {
        return true;
    }

    token = token.value.charAt(0);

    return (
        token === ')' ||
        token === ']' ||
        token === '/'
    );
}

function internalMatch(tokens, syntax, syntaxes) {
    function moveToNextToken() {
        do {
            tokenCursor++;
            token = tokenCursor < tokens.length ? tokens[tokenCursor] : null;
        } while (token !== null && !/\S/.test(token.value));
    }

    function getNextToken(offset) {
        var nextIndex = tokenCursor + offset;

        return nextIndex < tokens.length ? tokens[nextIndex] : null;
    }

    function pushThenStack(nextSyntax) {
        thenStack = {
            nextSyntax: nextSyntax,
            matchStack: matchStack,
            syntaxStack: syntaxStack,
            prev: thenStack
        };
    }

    function pushElseStack(nextSyntax) {
        elseStack = {
            nextSyntax: nextSyntax,
            matchStack: matchStack,
            syntaxStack: syntaxStack,
            thenStack: thenStack,
            tokenCursor: tokenCursor,
            token: token,
            prev: elseStack
        };
    }

    function addTokenToMatch() {
        matchStack = {
            type: TOKEN,
            syntax: syntax.syntax,
            token: token,
            prev: matchStack
        };

        moveToNextToken();

        if (tokenCursor > longestMatch) {
            longestMatch = tokenCursor;
        }

        return matchStack.token;
    }

    function openSyntax() {
        syntaxStack = {
            syntax: syntax,
            prev: syntaxStack
        };

        matchStack = {
            type: OPEN_SYNTAX,
            syntax: syntax.syntax,
            token: matchStack.token,
            prev: matchStack
        };
    }

    function closeSyntax() {
        if (matchStack.type === OPEN_SYNTAX) {
            matchStack = matchStack.prev;
        } else {
            matchStack = {
                type: CLOSE_SYNTAX,
                syntax: syntaxStack.syntax,
                token: matchStack.token,
                prev: matchStack
            };
        }

        syntaxStack = syntaxStack.prev;
    }

    var syntaxStack = null;
    var thenStack = null;
    var elseStack = null;

    var iterationCount = 0;
    var exitReason = EXIT_REASON_MATCH;

    var matchStack = { type: 'Stub', syntax: null, token: null, tokenCursor: -1, prev: null };
    var longestMatch = 0;
    var tokenCursor = -1;
    var token = null;

    moveToNextToken();

    while (true) {
        // console.log('--\n',
        //     '#' + iterationCount,
        //     require('util').inspect({
        //         match: mapList(matchStack, x => x.type === TOKEN ? x.token && x.token.value : x.syntax ? x.type + '!' + x.syntax.name : null),
        //         elseStack: mapList(elseStack, x => x.id),
        //         thenStack: mapList(thenStack, x => x.id),
        //         token: token && token.value,
        //         tokenCursor,
        //         syntax
        //     }, { depth: null })
        // );

        // prevent infinite loop
        if (++iterationCount === ITERATION_LIMIT) {
            console.warn('[csstree-match] BREAK after ' + ITERATION_LIMIT + ' iterations');
            exitReason = EXIT_REASON_ITERATION_LIMIT;
            break;
        }

        if (syntax === MATCH) {
            if (thenStack === null) {
                // turn to MISMATCH when some tokens left unmatched
                if (token !== null) {
                    // doesn't mismatch if just one token left and it's an IE hack
                    if (tokenCursor !== tokens.length - 1 || (token.value !== '\\0' && token.value !== '\\9')) {
                        syntax = MISMATCH;
                        continue;
                    }
                }

                // break the main loop, return a result - MATCH
                exitReason = EXIT_REASON_MATCH;
                break;
            }

            // go to next syntax (`then` branch)
            syntax = thenStack.nextSyntax;

            // check match is not empty
            if (syntax === DISALLOW_EMPTY) {
                if (thenStack.matchStack.token === matchStack.token) {
                    syntax = MISMATCH;
                    continue;
                } else {
                    syntax = MATCH;
                }
            }

            // close syntax if needed
            while (syntaxStack !== null && thenStack.syntaxStack !== syntaxStack) {
                closeSyntax();
            }

            // pop stack
            thenStack = thenStack.prev;
            continue;
        }

        if (syntax === MISMATCH) {
            if (elseStack === null) {
                // break the main loop, return a result - MISMATCH
                exitReason = EXIT_REASON_MISMATCH;
                break;
            }

            // go to next syntax (`else` branch)
            syntax = elseStack.nextSyntax;

            // restore all the rest stack states
            thenStack = elseStack.thenStack;
            syntaxStack = elseStack.syntaxStack;
            matchStack = elseStack.matchStack;
            tokenCursor = elseStack.tokenCursor;
            token = elseStack.token;

            // pop stack
            elseStack = elseStack.prev;
            continue;
        }

        switch (syntax.type) {
            case 'MatchGraph':
                syntax = syntax.match;
                break;

            case 'If':
                // IMPORTANT: else stack push must go first,
                // since it stores the state of thenStack before changes
                if (syntax.else !== MISMATCH) {
                    pushElseStack(syntax.else);
                }

                if (syntax.then !== MATCH) {
                    pushThenStack(syntax.then);
                }

                syntax = syntax.match;
                break;

            case 'MatchOnce':
                syntax = {
                    type: 'MatchOnceBuffer',
                    terms: syntax.terms,
                    all: syntax.all,
                    matchStack: matchStack,
                    index: 0,
                    mask: 0
                };
                break;

            case 'MatchOnceBuffer':
                if (syntax.index === syntax.terms.length) {
                    // if no matches during a cycle
                    if (syntax.matchStack === matchStack) {
                        // no matches at all or it's required all terms to be matched
                        if (syntax.mask === 0 || syntax.all) {
                            syntax = MISMATCH;
                            break;
                        }

                        // a partial match is ok
                        syntax = MATCH;
                        break;
                    } else {
                        // start trying to match from the start
                        syntax.index = 0;
                        syntax.matchStack = matchStack;
                    }
                }

                for (; syntax.index < syntax.terms.length; syntax.index++) {
                    if ((syntax.mask & (1 << syntax.index)) === 0) {
                        // IMPORTANT: else stack push must go first,
                        // since it stores the state of thenStack before changes
                        pushElseStack(syntax);
                        pushThenStack({
                            type: 'AddMatchOnce',
                            buffer: syntax
                        });

                        // match
                        syntax = syntax.terms[syntax.index++];
                        break;
                    }
                }
                break;

            case 'AddMatchOnce':
                syntax = syntax.buffer;

                var newMask = syntax.mask | (1 << (syntax.index - 1));

                // all terms are matched
                if (newMask === (1 << syntax.terms.length) - 1) {
                    syntax = MATCH;
                    continue;
                }

                syntax = {
                    type: 'MatchOnceBuffer',
                    terms: syntax.terms,
                    all: syntax.all,
                    matchStack: syntax.matchStack,
                    index: syntax.index,
                    mask: newMask
                };

                break;

            case 'Enum':
                var name = token !== null ? token.value.toLowerCase() : '';

                // drop \0 and \9 hack from keyword name
                if (name.indexOf('\\') !== -1) {
                    name = name.replace(/\\[09].*$/, '');
                }

                if (hasOwnProperty.call(syntax.map, name)) {
                    syntax = syntax.map[name];
                } else {
                    syntax = MISMATCH;
                }

                break;

            case 'Generic':
                syntax = syntax.fn(token, addTokenToMatch, getNextToken) ? MATCH : MISMATCH;
                break;

            case 'Type':
            case 'Property':
                openSyntax();

                var syntaxDict = syntax.type === 'Type' ? 'types' : 'properties';

                if (hasOwnProperty.call(syntaxes, syntaxDict) && syntaxes[syntaxDict][syntax.name]) {
                    syntax = syntaxes[syntaxDict][syntax.name].match;
                } else {
                    syntax = undefined;
                }

                if (!syntax) {
                    throw new Error(
                        'Bad syntax reference: ' +
                        (syntaxStack.syntax.type === 'Type'
                            ? '<' + syntaxStack.syntax.name + '>'
                            : '<\'' + syntaxStack.syntax.name + '\'>')
                    );
                }

                break;

            case 'Keyword':
                var name = syntax.name;

                if (token !== null) {
                    var keywordName = token.value;

                    // drop \0 and \9 hack from keyword name
                    if (keywordName.indexOf('\\') !== -1) {
                        keywordName = keywordName.replace(/\\[09].*$/, '');
                    }

                    if (keywordName.toLowerCase() === name) {
                        addTokenToMatch();

                        syntax = MATCH;
                        break;
                    }
                }

                syntax = MISMATCH;
                break;

            case 'AtKeyword':
            case 'Function':
                if (token !== null && token.value.toLowerCase() === syntax.name) {
                    addTokenToMatch();

                    syntax = MATCH;
                    break;
                }

                syntax = MISMATCH;
                break;

            case 'Token':
                if (token !== null && token.value === syntax.value) {
                    addTokenToMatch();

                    syntax = MATCH;
                    break;
                }

                syntax = MISMATCH;
                break;

            case 'Comma':
                if (token !== null && token.value === ',') {
                    if (isCommaContextStart(matchStack.token)) {
                        syntax = MISMATCH;
                    } else {
                        addTokenToMatch();
                        syntax = isCommaContextEnd(token) ? MISMATCH : MATCH;
                    }
                } else {
                    syntax = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH : MISMATCH;
                }

                break;

            // case 'String':
            // TODO: strings with length other than 1 char

            default:
                throw new Error('Unknown node type: ' + syntax.type);
        }
    }

    totalIterationCount += iterationCount;

    if (exitReason === EXIT_REASON_MATCH) {
        while (syntaxStack !== null) {
            closeSyntax();
        }
    } else {
        matchStack = null;
    }

    return {
        tokens: tokens,
        reason: exitReason,
        iterations: iterationCount,
        match: matchStack,
        longestMatch: longestMatch
    };
}

function matchAsList(tokens, matchGraph, syntaxes) {
    var matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match !== null) {
        matchResult.match = mapList(matchResult.match, function(item) {
            if (item.type === OPEN_SYNTAX || item.type === CLOSE_SYNTAX) {
                return { type: item.type, syntax: item.syntax };
            }

            return {
                syntax: item.syntax,
                token: item.token && item.token.value,
                node: item.token && item.token.node
            };
        }).slice(1);
    }

    return matchResult;
}

function matchAsTree(tokens, matchGraph, syntaxes) {
    var matchResult = internalMatch(tokens, matchGraph, syntaxes || {});

    if (matchResult.match === null) {
        return matchResult;
    }

    var cursor = matchResult.match;
    var host = matchResult.match = {
        syntax: matchGraph.syntax || null,
        match: []
    };
    var stack = [host];

    // revert a list
    var prev = null;
    var next = null;
    while (cursor !== null) {
        next = cursor.prev;
        cursor.prev = prev;
        prev = cursor;
        cursor = next;
    }

    // init the cursor to start with 2nd item since 1st is a stub item
    cursor = prev.prev;

    // build a tree
    while (cursor !== null && cursor.syntax !== null) {
        var entry = cursor;

        switch (entry.type) {
            case OPEN_SYNTAX:
                host.match.push(host = {
                    syntax: entry.syntax,
                    match: []
                });
                stack.push(host);
                break;

            case CLOSE_SYNTAX:
                stack.pop();
                host = stack[stack.length - 1];
                break;

            default:
                host.match.push({
                    syntax: entry.syntax || null,
                    token: entry.token.value,
                    node: entry.token.node
                });
        }

        cursor = cursor.prev;
    }

    return matchResult;
}

module.exports = {
    matchAsList: matchAsList,
    matchAsTree: matchAsTree,
    getTotalIterationCount: function() {
        return totalIterationCount;
    }
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

function getTrace(node) {
    function shouldPutToTrace(syntax) {
        if (syntax === null) {
            return false;
        }

        return (
            syntax.type === 'Type' ||
            syntax.type === 'Property' ||
            syntax.type === 'Keyword'
        );
    }

    function hasMatch(matchNode) {
        if (Array.isArray(matchNode.match)) {
            // use for-loop for better perfomance
            for (var i = 0; i < matchNode.match.length; i++) {
                if (hasMatch(matchNode.match[i])) {
                    if (shouldPutToTrace(matchNode.syntax)) {
                        result.unshift(matchNode.syntax);
                    }

                    return true;
                }
            }
        } else if (matchNode.node === node) {
            result = shouldPutToTrace(matchNode.syntax)
                ? [matchNode.syntax]
                : [];

            return true;
        }

        return false;
    }

    var result = null;

    if (this.matched !== null) {
        hasMatch(this.matched);
    }

    return result;
}

function testNode(match, node, fn) {
    var trace = getTrace.call(match, node);

    if (trace === null) {
        return false;
    }

    return trace.some(fn);
}

function isType(node, type) {
    return testNode(this, node, function(matchNode) {
        return matchNode.type === 'Type' && matchNode.name === type;
    });
}

function isProperty(node, property) {
    return testNode(this, node, function(matchNode) {
        return matchNode.type === 'Property' && matchNode.name === property;
    });
}

function isKeyword(node) {
    return testNode(this, node, function(matchNode) {
        return matchNode.type === 'Keyword';
    });
}

module.exports = {
    getTrace: getTrace,
    isType: isType,
    isProperty: isProperty,
    isKeyword: isKeyword
};


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(6);

function getFirstMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getFirstMatchNode(matchNode.match[0]);
}

function getLastMatchNode(matchNode) {
    if ('node' in matchNode) {
        return matchNode.node;
    }

    return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
}

function matchFragments(lexer, ast, match, type, name) {
    function findFragments(matchNode) {
        if (matchNode.syntax !== null &&
            matchNode.syntax.type === type &&
            matchNode.syntax.name === name) {
            var start = getFirstMatchNode(matchNode);
            var end = getLastMatchNode(matchNode);

            lexer.syntax.walk(ast, function(node, item, list) {
                if (node === start) {
                    var nodes = new List();

                    do {
                        nodes.appendData(item.data);

                        if (item.data === end) {
                            break;
                        }

                        item = item.next;
                    } while (item !== null);

                    fragments.push({
                        parent: list,
                        nodes: nodes
                    });
                }
            });
        }

        if (Array.isArray(matchNode.match)) {
            matchNode.match.forEach(findFragments);
        }
    }

    var fragments = [];

    if (match.matched !== null) {
        findFragments(match.matched);
    }

    return fragments;
}

module.exports = {
    matchFragments: matchFragments
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(6);
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isValidNumber(value) {
    // Number.isInteger(value) && value >= 0
    return (
        typeof value === 'number' &&
        isFinite(value) &&
        Math.floor(value) === value &&
        value >= 0
    );
}

function isValidLocation(loc) {
    return (
        Boolean(loc) &&
        isValidNumber(loc.offset) &&
        isValidNumber(loc.line) &&
        isValidNumber(loc.column)
    );
}

function createNodeStructureChecker(type, fields) {
    return function checkNode(node, warn) {
        if (!node || node.constructor !== Object) {
            return warn(node, 'Type of node should be an Object');
        }

        for (var key in node) {
            var valid = true;

            if (hasOwnProperty.call(node, key) === false) {
                continue;
            }

            if (key === 'type') {
                if (node.type !== type) {
                    warn(node, 'Wrong node type `' + node.type + '`, expected `' + type + '`');
                }
            } else if (key === 'loc') {
                if (node.loc === null) {
                    continue;
                } else if (node.loc && node.loc.constructor === Object) {
                    if (typeof node.loc.source !== 'string') {
                        key += '.source';
                    } else if (!isValidLocation(node.loc.start)) {
                        key += '.start';
                    } else if (!isValidLocation(node.loc.end)) {
                        key += '.end';
                    } else {
                        continue;
                    }
                }

                valid = false;
            } else if (fields.hasOwnProperty(key)) {
                for (var i = 0, valid = false; !valid && i < fields[key].length; i++) {
                    var fieldType = fields[key][i];

                    switch (fieldType) {
                        case String:
                            valid = typeof node[key] === 'string';
                            break;

                        case Boolean:
                            valid = typeof node[key] === 'boolean';
                            break;

                        case null:
                            valid = node[key] === null;
                            break;

                        default:
                            if (typeof fieldType === 'string') {
                                valid = node[key] && node[key].type === fieldType;
                            } else if (Array.isArray(fieldType)) {
                                valid = node[key] instanceof List;
                            }
                    }
                }
            } else {
                warn(node, 'Unknown field `' + key + '` for ' + type + ' node type');
            }

            if (!valid) {
                warn(node, 'Bad value for `' + type + '.' + key + '`');
            }
        }

        for (var key in fields) {
            if (hasOwnProperty.call(fields, key) &&
                hasOwnProperty.call(node, key) === false) {
                warn(node, 'Field `' + type + '.' + key + '` is missed');
            }
        }
    };
}

function processStructure(name, nodeType) {
    var structure = nodeType.structure;
    var fields = {
        type: String,
        loc: true
    };
    var docs = {
        type: '"' + name + '"'
    };

    for (var key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        var docsTypes = [];
        var fieldTypes = fields[key] = Array.isArray(structure[key])
            ? structure[key].slice()
            : [structure[key]];

        for (var i = 0; i < fieldTypes.length; i++) {
            var fieldType = fieldTypes[i];
            if (fieldType === String || fieldType === Boolean) {
                docsTypes.push(fieldType.name);
            } else if (fieldType === null) {
                docsTypes.push('null');
            } else if (typeof fieldType === 'string') {
                docsTypes.push('<' + fieldType + '>');
            } else if (Array.isArray(fieldType)) {
                docsTypes.push('List'); // TODO: use type enum
            } else {
                throw new Error('Wrong value `' + fieldType + '` in `' + name + '.' + key + '` structure definition');
            }
        }

        docs[key] = docsTypes.join(' | ');
    }

    return {
        docs: docs,
        check: createNodeStructureChecker(name, fields)
    };
}

module.exports = {
    getStructureFromConfig: function(config) {
        var structure = {};

        if (config.node) {
            for (var name in config.node) {
                if (hasOwnProperty.call(config.node, name)) {
                    var nodeType = config.node[name];

                    if (nodeType.structure) {
                        structure[name] = processStructure(name, nodeType);
                    } else {
                        throw new Error('Missed `structure` field in `' + name + '` node type definition');
                    }
                }
            }
        }

        return structure;
    }
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    SyntaxParseError: __webpack_require__(20).SyntaxParseError,
    parse: __webpack_require__(18),
    generate: __webpack_require__(15),
    walk: __webpack_require__(21)
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Tokenizer = __webpack_require__(7);
var List = __webpack_require__(6);
var sequence = __webpack_require__(30);
var noop = function() {};

function createParseContext(name) {
    return function() {
        return this[name]();
    };
}

function processConfig(config) {
    var parserConfig = {
        context: {},
        scope: {},
        atrule: {},
        pseudo: {}
    };

    if (config.parseContext) {
        for (var name in config.parseContext) {
            switch (typeof config.parseContext[name]) {
                case 'function':
                    parserConfig.context[name] = config.parseContext[name];
                    break;

                case 'string':
                    parserConfig.context[name] = createParseContext(config.parseContext[name]);
                    break;
            }
        }
    }

    if (config.scope) {
        for (var name in config.scope) {
            parserConfig.scope[name] = config.scope[name];
        }
    }

    if (config.atrule) {
        for (var name in config.atrule) {
            var atrule = config.atrule[name];

            if (atrule.parse) {
                parserConfig.atrule[name] = atrule.parse;
            }
        }
    }

    if (config.pseudo) {
        for (var name in config.pseudo) {
            var pseudo = config.pseudo[name];

            if (pseudo.parse) {
                parserConfig.pseudo[name] = pseudo.parse;
            }
        }
    }

    if (config.node) {
        for (var name in config.node) {
            parserConfig[name] = config.node[name].parse;
        }
    }

    return parserConfig;
}

module.exports = function createParser(config) {
    var parser = {
        scanner: new Tokenizer(),
        filename: '<unknown>',
        needPositions: false,
        onParseError: noop,
        onParseErrorThrow: false,
        parseAtrulePrelude: true,
        parseRulePrelude: true,
        parseValue: true,
        parseCustomProperty: false,

        readSequence: sequence,

        createList: function() {
            return new List();
        },
        createSingleNodeList: function(node) {
            return new List().appendData(node);
        },
        getFirstListNode: function(list) {
            return list && list.first();
        },
        getLastListNode: function(list) {
            return list.last();
        },

        parseWithFallback: function(consumer, fallback) {
            var startToken = this.scanner.currentToken;

            try {
                return consumer.call(this);
            } catch (e) {
                if (this.onParseErrorThrow) {
                    throw e;
                }

                var fallbackNode = fallback.call(this, startToken);

                this.onParseErrorThrow = true;
                this.onParseError(e, fallbackNode);
                this.onParseErrorThrow = false;

                return fallbackNode;
            }
        },

        getLocation: function(start, end) {
            if (this.needPositions) {
                return this.scanner.getLocationRange(
                    start,
                    end,
                    this.filename
                );
            }

            return null;
        },
        getLocationFromList: function(list) {
            if (this.needPositions) {
                var head = this.getFirstListNode(list);
                var tail = this.getLastListNode(list);
                return this.scanner.getLocationRange(
                    head !== null ? head.loc.start.offset - this.scanner.startOffset : this.scanner.tokenStart,
                    tail !== null ? tail.loc.end.offset - this.scanner.startOffset : this.scanner.tokenStart,
                    this.filename
                );
            }

            return null;
        }
    };

    config = processConfig(config || {});
    for (var key in config) {
        parser[key] = config[key];
    }

    return function(source, options) {
        options = options || {};

        var context = options.context || 'default';
        var ast;

        parser.scanner.setSource(source, options.offset, options.line, options.column);
        parser.filename = options.filename || '<unknown>';
        parser.needPositions = Boolean(options.positions);
        parser.onParseError = typeof options.onParseError === 'function' ? options.onParseError : noop;
        parser.onParseErrorThrow = false;
        parser.parseAtrulePrelude = 'parseAtrulePrelude' in options ? Boolean(options.parseAtrulePrelude) : true;
        parser.parseRulePrelude = 'parseRulePrelude' in options ? Boolean(options.parseRulePrelude) : true;
        parser.parseValue = 'parseValue' in options ? Boolean(options.parseValue) : true;
        parser.parseCustomProperty = 'parseCustomProperty' in options ? Boolean(options.parseCustomProperty) : false;

        if (!parser.context.hasOwnProperty(context)) {
            throw new Error('Unknown context `' + context + '`');
        }

        ast = parser.context[context].call(parser, options);

        if (!parser.scanner.eof) {
            parser.scanner.error();
        }

        return ast;
    };
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;
var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;

module.exports = function readSequence(recognizer) {
    var children = this.createList();
    var child = null;
    var context = {
        recognizer: recognizer,
        space: null,
        ignoreWS: false,
        ignoreWSAfter: false
    };

    this.scanner.skipSC();

    while (!this.scanner.eof) {
        switch (this.scanner.tokenType) {
            case COMMENT:
                this.scanner.next();
                continue;

            case WHITESPACE:
                if (context.ignoreWS) {
                    this.scanner.next();
                } else {
                    context.space = this.WhiteSpace();
                }
                continue;
        }

        child = recognizer.getNode.call(this, context);

        if (child === undefined) {
            break;
        }

        if (context.space !== null) {
            children.push(context.space);
            context.space = null;
        }

        children.push(child);

        if (context.ignoreWSAfter) {
            context.ignoreWSAfter = false;
            context.ignoreWS = true;
        } else {
            context.ignoreWS = false;
        }
    }

    return children;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var sourceMap = __webpack_require__(32);
var hasOwnProperty = Object.prototype.hasOwnProperty;

function processChildren(node, delimeter) {
    var list = node.children;
    var prev = null;

    if (typeof delimeter !== 'function') {
        list.forEach(this.node, this);
    } else {
        list.forEach(function(node) {
            if (prev !== null) {
                delimeter.call(this, prev);
            }

            this.node(node);
            prev = node;
        }, this);
    }
}

module.exports = function createGenerator(config) {
    function processNode(node) {
        if (hasOwnProperty.call(types, node.type)) {
            types[node.type].call(this, node);
        } else {
            throw new Error('Unknown node type: ' + node.type);
        }
    }

    var types = {};

    if (config.node) {
        for (var name in config.node) {
            types[name] = config.node[name].generate;
        }
    }

    return function(node, options) {
        var buffer = '';
        var handlers = {
            children: processChildren,
            node: processNode,
            chunk: function(chunk) {
                buffer += chunk;
            },
            result: function() {
                return buffer;
            }
        };

        if (options) {
            if (typeof options.decorator === 'function') {
                handlers = options.decorator(handlers);
            }

            if (options.sourceMap) {
                handlers = sourceMap(handlers);
            }
        }

        handlers.node(node);

        return handlers.result();
    };
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var SourceMapGenerator = __webpack_require__(33).SourceMapGenerator;
var trackNodes = {
    Atrule: true,
    Selector: true,
    Declaration: true
};

module.exports = function generateSourceMap(handlers) {
    var map = new SourceMapGenerator();
    var line = 1;
    var column = 0;
    var generated = {
        line: 1,
        column: 0
    };
    var original = {
        line: 0, // should be zero to add first mapping
        column: 0
    };
    var sourceMappingActive = false;
    var activatedGenerated = {
        line: 1,
        column: 0
    };
    var activatedMapping = {
        generated: activatedGenerated
    };

    var handlersNode = handlers.node;
    handlers.node = function(node) {
        if (node.loc && node.loc.start && trackNodes.hasOwnProperty(node.type)) {
            var nodeLine = node.loc.start.line;
            var nodeColumn = node.loc.start.column - 1;

            if (original.line !== nodeLine ||
                original.column !== nodeColumn) {
                original.line = nodeLine;
                original.column = nodeColumn;

                generated.line = line;
                generated.column = column;

                if (sourceMappingActive) {
                    sourceMappingActive = false;
                    if (generated.line !== activatedGenerated.line ||
                        generated.column !== activatedGenerated.column) {
                        map.addMapping(activatedMapping);
                    }
                }

                sourceMappingActive = true;
                map.addMapping({
                    source: node.loc.source,
                    original: original,
                    generated: generated
                });
            }
        }

        handlersNode.call(this, node);

        if (sourceMappingActive && trackNodes.hasOwnProperty(node.type)) {
            activatedGenerated.line = line;
            activatedGenerated.column = column;
        }
    };

    var handlersChunk = handlers.chunk;
    handlers.chunk = function(chunk) {
        for (var i = 0; i < chunk.length; i++) {
            if (chunk.charCodeAt(i) === 10) { // \n
                line++;
                column = 0;
            } else {
                column++;
            }
        }

        handlersChunk(chunk);
    };

    var handlersResult = handlers.result;
    handlers.result = function() {
        if (sourceMappingActive) {
            map.addMapping(activatedMapping);
        }

        return {
            css: handlersResult(),
            map: map
        };
    };

    return handlers;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(34).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(40).SourceMapConsumer;
exports.SourceNode = __webpack_require__(43).SourceNode;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(35);
var util = __webpack_require__(37);
var ArraySet = __webpack_require__(38).ArraySet;
var MappingList = __webpack_require__(39).MappingList;

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
/* 35 */
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

var base64 = __webpack_require__(36);

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
/* 36 */
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
/* 37 */
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
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(37);
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
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(37);

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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(37);
var binarySearch = __webpack_require__(41);
var ArraySet = __webpack_require__(38).ArraySet;
var base64VLQ = __webpack_require__(35);
var quickSort = __webpack_require__(42).quickSort;

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
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(34).SourceMapGenerator;
var util = __webpack_require__(37);

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
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(6);

module.exports = function createConvertors(walk) {
    return {
        fromPlainObject: function(ast) {
            walk(ast, {
                enter: function(node) {
                    if (node.children && node.children instanceof List === false) {
                        node.children = new List().fromArray(node.children);
                    }
                }
            });

            return ast;
        },
        toPlainObject: function(ast) {
            walk(ast, {
                leave: function(node) {
                    if (node.children && node.children instanceof List) {
                        node.children = node.children.toArray();
                    }
                }
            });

            return ast;
        }
    };
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = Object.prototype.hasOwnProperty;
var noop = function() {};

function ensureFunction(value) {
    return typeof value === 'function' ? value : noop;
}

function invokeForType(fn, type) {
    return function(node, item, list) {
        if (node.type === type) {
            fn.call(this, node, item, list);
        }
    };
}

function getWalkersFromStructure(name, nodeType) {
    var structure = nodeType.structure;
    var walkers = [];

    for (var key in structure) {
        if (hasOwnProperty.call(structure, key) === false) {
            continue;
        }

        var fieldTypes = structure[key];
        var walker = {
            name: key,
            type: false,
            nullable: false
        };

        if (!Array.isArray(structure[key])) {
            fieldTypes = [structure[key]];
        }

        for (var i = 0; i < fieldTypes.length; i++) {
            var fieldType = fieldTypes[i];
            if (fieldType === null) {
                walker.nullable = true;
            } else if (typeof fieldType === 'string') {
                walker.type = 'node';
            } else if (Array.isArray(fieldType)) {
                walker.type = 'list';
            }
        }

        if (walker.type) {
            walkers.push(walker);
        }
    }

    if (walkers.length) {
        return {
            context: nodeType.walkContext,
            fields: walkers
        };
    }

    return null;
}

function getTypesFromConfig(config) {
    var types = {};

    for (var name in config.node) {
        if (hasOwnProperty.call(config.node, name)) {
            var nodeType = config.node[name];

            if (!nodeType.structure) {
                throw new Error('Missed `structure` field in `' + name + '` node type definition');
            }

            types[name] = getWalkersFromStructure(name, nodeType);
        }
    }

    return types;
}

function createTypeIterator(config, reverse) {
    var fields = reverse ? config.fields.slice().reverse() : config.fields;
    var body = fields.map(function(field) {
        var ref = 'node.' + field.name;
        var line;

        if (field.type === 'list') {
            line = reverse
                ? ref + '.forEachRight(walk);'
                : ref + '.forEach(walk);';
        } else {
            line = 'walk(' + ref + ');';
        }

        if (field.nullable) {
            line = 'if (' + ref + ') {\n    ' + line + '}';
        }

        return line;
    });

    if (config.context) {
        body = [].concat(
            'var old = context.' + config.context + ';',
            'context.' + config.context + ' = node;',
            body,
            'context.' + config.context + ' = old;'
        );
    }

    return new Function('node', 'context', 'walk', body.join('\n'));
}

function createFastTraveralMap(iterators) {
    return {
        Atrule: {
            StyleSheet: iterators.StyleSheet,
            Atrule: iterators.Atrule,
            Rule: iterators.Rule,
            Block: iterators.Block
        },
        Rule: {
            StyleSheet: iterators.StyleSheet,
            Atrule: iterators.Atrule,
            Rule: iterators.Rule,
            Block: iterators.Block
        },
        Declaration: {
            StyleSheet: iterators.StyleSheet,
            Atrule: iterators.Atrule,
            Rule: iterators.Rule,
            Block: iterators.Block
        }
    };
}

module.exports = function createWalker(config) {
    var types = getTypesFromConfig(config);
    var iteratorsNatural = {};
    var iteratorsReverse = {};

    for (var name in types) {
        if (hasOwnProperty.call(types, name) && types[name] !== null) {
            iteratorsNatural[name] = createTypeIterator(types[name], false);
            iteratorsReverse[name] = createTypeIterator(types[name], true);
        }
    }

    var fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
    var fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);

    return function walk(root, options) {
        function walkNode(node, item, list) {
            enter.call(context, node, item, list);

            if (iterators.hasOwnProperty(node.type)) {
                iterators[node.type](node, context, walkNode);
            }

            leave.call(context, node, item, list);
        }

        var enter = noop;
        var leave = noop;
        var iterators = iteratorsNatural;
        var context = {
            root: root,
            stylesheet: null,
            atrule: null,
            atrulePrelude: null,
            rule: null,
            selector: null,
            block: null,
            declaration: null,
            function: null
        };

        if (typeof options === 'function') {
            enter = options;
        } else if (options) {
            enter = ensureFunction(options.enter);
            leave = ensureFunction(options.leave);

            if (options.reverse) {
                iterators = iteratorsReverse;
            }

            if (options.visit) {
                if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) {
                    iterators = options.reverse
                        ? fastTraversalIteratorsReverse[options.visit]
                        : fastTraversalIteratorsNatural[options.visit];
                } else if (!types.hasOwnProperty(options.visit)) {
                    throw new Error('Bad value `' + options.visit + '` for `visit` option (should be: ' + Object.keys(types).join(', ') + ')');
                }

                enter = invokeForType(enter, options.visit);
                leave = invokeForType(leave, options.visit);
            }
        }

        if (enter === noop && leave === noop) {
            throw new Error('Neither `enter` nor `leave` walker handler is set or both aren\'t a function');
        }

        // swap handlers in reverse mode to invert visit order
        if (options.reverse) {
            var tmp = enter;
            enter = leave;
            leave = tmp;
        }

        walkNode(root);
    };
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var List = __webpack_require__(6);

module.exports = function clone(node) {
    var result = {};

    for (var key in node) {
        var value = node[key];

        if (value) {
            if (Array.isArray(value) || value instanceof List) {
                value = value.map(clone);
            } else if (value.constructor === Object) {
                value = clone(value);
            }
        }

        result[key] = value;
    }

    return result;
};


/***/ }),
/* 47 */
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty;
var shape = {
    generic: true,
    types: {},
    properties: {},
    parseContext: {},
    scope: {},
    atrule: ['parse'],
    pseudo: ['parse'],
    node: ['name', 'structure', 'parse', 'generate', 'walkContext']
};

function isObject(value) {
    return value && value.constructor === Object;
}

function copy(value) {
    if (isObject(value)) {
        var res = {};
        for (var key in value) {
            if (hasOwnProperty.call(value, key)) {
                res[key] = value[key];
            }
        }
        return res;
    } else {
        return value;
    }
}

function extend(dest, src) {
    for (var key in src) {
        if (hasOwnProperty.call(src, key)) {
            if (isObject(dest[key])) {
                extend(dest[key], copy(src[key]));
            } else {
                dest[key] = copy(src[key]);
            }
        }
    }
}

function mix(dest, src, shape) {
    for (var key in shape) {
        if (hasOwnProperty.call(shape, key) === false) {
            continue;
        }

        if (shape[key] === true) {
            if (key in src) {
                if (hasOwnProperty.call(src, key)) {
                    dest[key] = copy(src[key]);
                }
            }
        } else if (shape[key]) {
            if (isObject(shape[key])) {
                var res = {};
                extend(res, dest[key]);
                extend(res, src[key]);
                dest[key] = res;
            } else if (Array.isArray(shape[key])) {
                var res = {};
                var innerShape = shape[key].reduce(function(s, k) {
                    s[k] = true;
                    return s;
                }, {});
                for (var name in dest[key]) {
                    if (hasOwnProperty.call(dest[key], name)) {
                        res[name] = {};
                        if (dest[key] && dest[key][name]) {
                            mix(res[name], dest[key][name], innerShape);
                        }
                    }
                }
                for (var name in src[key]) {
                    if (hasOwnProperty.call(src[key], name)) {
                        if (!res[name]) {
                            res[name] = {};
                        }
                        if (src[key] && src[key][name]) {
                            mix(res[name], src[key][name], innerShape);
                        }
                    }
                }
                dest[key] = res;
            }
        }
    }
    return dest;
}

module.exports = function(dest, src) {
    return mix(dest, src, shape);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var data = __webpack_require__(49);

module.exports = {
    generic: true,
    types: data.types,
    properties: data.properties,
    node: __webpack_require__(53)
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var mdnProperties = __webpack_require__(50);
var mdnSyntaxes = __webpack_require__(51);
var patch = __webpack_require__(52);

function buildDictionary(dict, patchDict) {
    var result = {};

    // copy all syntaxes for an original dict
    for (var key in dict) {
        result[key] = dict[key].syntax;
    }

    // apply a patch
    for (var key in patchDict) {
        if (key in dict) {
            if (patchDict[key].syntax) {
                result[key] = patchDict[key].syntax;
            } else {
                delete result[key];
            }
        } else {
            if (patchDict[key].syntax) {
                result[key] = patchDict[key].syntax;
            }
        }
    }

    return result;
}

module.exports = {
    properties: buildDictionary(mdnProperties, patch.properties),
    types: buildDictionary(mdnSyntaxes, patch.syntaxes)
};


/***/ }),
/* 50 */
/***/ (function(module) {

module.exports = JSON.parse("{\"--*\":{\"syntax\":\"<declaration-value>\",\"media\":\"all\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Variables\"],\"initial\":\"seeProse\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedWithVarsSubstituted\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"-ms-accelerator\":{\"syntax\":\"false | true\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"false\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-block-progression\":{\"syntax\":\"tb | rl | bt | lr\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"tb\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zoom-chaining\":{\"syntax\":\"none | chained\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zooming\":{\"syntax\":\"none | zoom\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"zoomForTheTopLevelNoneForTheRest\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zoom-limit\":{\"syntax\":\"<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"-ms-content-zoom-limit-max\",\"-ms-content-zoom-limit-min\"],\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-content-zoom-limit-max\",\"-ms-content-zoom-limit-min\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-content-zoom-limit-max\",\"-ms-content-zoom-limit-min\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zoom-limit-max\":{\"syntax\":\"<percentage>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"maxZoomFactor\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"400%\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zoom-limit-min\":{\"syntax\":\"<percentage>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"minZoomFactor\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"100%\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zoom-snap\":{\"syntax\":\"<'-ms-content-zoom-snap-type'> || <'-ms-content-zoom-snap-points'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-content-zoom-snap-type\",\"-ms-content-zoom-snap-points\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-content-zoom-snap-type\",\"-ms-content-zoom-snap-points\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zoom-snap-points\":{\"syntax\":\"snapInterval( <percentage>, <percentage> ) | snapList( <percentage># )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"snapInterval(0%, 100%)\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-content-zoom-snap-type\":{\"syntax\":\"none | proximity | mandatory\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-filter\":{\"syntax\":\"<string>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"\\\"\\\"\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-flow-from\":{\"syntax\":\"[ none | <custom-ident> ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-flow-into\":{\"syntax\":\"[ none | <custom-ident> ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"iframeElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-high-contrast-adjust\":{\"syntax\":\"auto | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-hyphenate-limit-chars\":{\"syntax\":\"auto | <integer>{1,3}\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-hyphenate-limit-lines\":{\"syntax\":\"no-limit | <integer>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"no-limit\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-hyphenate-limit-zone\":{\"syntax\":\"<percentage> | <length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"referToLineBoxWidth\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-ime-align\":{\"syntax\":\"auto | after\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-overflow-style\":{\"syntax\":\"auto | none | scrollbar | -ms-autohiding-scrollbar\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-3dlight-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-arrow-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ButtonText\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-base-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-darkshadow-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDDarkShadow\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-face-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDFace\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-highlight-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDHighlight\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-shadow-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"ThreeDDarkShadow\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scrollbar-track-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"Scrollbar\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-chaining\":{\"syntax\":\"chained | none\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"chained\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-limit\":{\"syntax\":\"<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-scroll-limit-x-min\",\"-ms-scroll-limit-y-min\",\"-ms-scroll-limit-x-max\",\"-ms-scroll-limit-y-max\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-scroll-limit-x-min\",\"-ms-scroll-limit-y-min\",\"-ms-scroll-limit-x-max\",\"-ms-scroll-limit-y-max\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-limit-x-max\":{\"syntax\":\"auto | <length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-limit-x-min\":{\"syntax\":\"<length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-limit-y-max\":{\"syntax\":\"auto | <length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-limit-y-min\":{\"syntax\":\"<length>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-rails\":{\"syntax\":\"none | railed\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"railed\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-snap-points-x\":{\"syntax\":\"snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"snapInterval(0px, 100%)\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-snap-points-y\":{\"syntax\":\"snapInterval( <length-percentage>, <length-percentage> ) | snapList( <length-percentage># )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"snapInterval(0px, 100%)\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-snap-type\":{\"syntax\":\"none | proximity | mandatory\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-snap-x\":{\"syntax\":\"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-x\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-x\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-snap-y\":{\"syntax\":\"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-y\"],\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":[\"-ms-scroll-snap-type\",\"-ms-scroll-snap-points-y\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-scroll-translation\":{\"syntax\":\"none | vertical-to-horizontal\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-text-autospace\":{\"syntax\":\"none | ideograph-alpha | ideograph-numeric | ideograph-parenthesis | ideograph-space\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-touch-select\":{\"syntax\":\"grippers | none\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"grippers\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-user-select\":{\"syntax\":\"none | element | text\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"text\",\"appliesto\":\"nonReplacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-wrap-flow\":{\"syntax\":\"auto | both | start | end | maximum | clear\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-wrap-margin\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"0\",\"appliesto\":\"exclusionElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-ms-wrap-through\":{\"syntax\":\"wrap | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"wrap\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-appearance\":{\"syntax\":\"none | button | button-arrow-down | button-arrow-next | button-arrow-previous | button-arrow-up | button-bevel | button-focus | caret | checkbox | checkbox-container | checkbox-label | checkmenuitem | dualbutton | groupbox | listbox | listitem | menuarrow | menubar | menucheckbox | menuimage | menuitem | menuitemtext | menulist | menulist-button | menulist-text | menulist-textfield | menupopup | menuradio | menuseparator | meterbar | meterchunk | progressbar | progressbar-vertical | progresschunk | progresschunk-vertical | radio | radio-container | radio-label | radiomenuitem | range | range-thumb | resizer | resizerpanel | scale-horizontal | scalethumbend | scalethumb-horizontal | scalethumbstart | scalethumbtick | scalethumb-vertical | scale-vertical | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | separator | sheet | spinner | spinner-downbutton | spinner-textfield | spinner-upbutton | splitter | statusbar | statusbarpanel | tab | tabpanel | tabpanels | tab-scroll-arrow-back | tab-scroll-arrow-forward | textfield | textfield-multiline | toolbar | toolbarbutton | toolbarbutton-dropdown | toolbargripper | toolbox | tooltip | treeheader | treeheadercell | treeheadersortarrow | treeitem | treeline | treetwisty | treetwistyopen | treeview | -moz-mac-unified-toolbar | -moz-win-borderless-glass | -moz-win-browsertabbar-toolbox | -moz-win-communicationstext | -moz-win-communications-toolbox | -moz-win-exclude-glass | -moz-win-glass | -moz-win-mediatext | -moz-win-media-toolbox | -moz-window-button-box | -moz-window-button-box-maximized | -moz-window-button-close | -moz-window-button-maximize | -moz-window-button-minimize | -moz-window-button-restore | -moz-window-frame-bottom | -moz-window-frame-left | -moz-window-frame-right | -moz-window-titlebar | -moz-window-titlebar-maximized\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"noneButOverriddenInUserAgentCSS\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-binding\":{\"syntax\":\"<url> | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElementsExceptGeneratedContentOrPseudoElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-border-bottom-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-border-left-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-border-right-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-border-top-colors\":{\"syntax\":\"<color>+ | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-context-properties\":{\"syntax\":\"none | [ fill | fill-opacity | stroke | stroke-opacity ]#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElementsThatCanReferenceImages\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-float-edge\":{\"syntax\":\"border-box | content-box | margin-box | padding-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"content-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-force-broken-image-icon\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"images\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-image-region\":{\"syntax\":\"<shape> | auto\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"auto\",\"appliesto\":\"xulImageElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-orient\":{\"syntax\":\"inline | block | horizontal | vertical\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"inline\",\"appliesto\":\"anyElementEffectOnProgressAndMeter\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-outline-radius\":{\"syntax\":\"<outline-radius>{1,4} [ / <outline-radius>{1,4} ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"percentages\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"groups\":[\"Mozilla Extensions\"],\"initial\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"appliesto\":\"allElements\",\"computed\":[\"-moz-outline-radius-topleft\",\"-moz-outline-radius-topright\",\"-moz-outline-radius-bottomright\",\"-moz-outline-radius-bottomleft\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-outline-radius-bottomleft\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-outline-radius-bottomright\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-outline-radius-topleft\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-outline-radius-topright\":{\"syntax\":\"<outline-radius>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-stack-sizing\":{\"syntax\":\"ignore | stretch-to-fit\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"stretch-to-fit\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-text-blink\":{\"syntax\":\"none | blink\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-user-focus\":{\"syntax\":\"ignore | normal | select-after | select-before | select-menu | select-same | select-all | none\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-user-input\":{\"syntax\":\"auto | none | enabled | disabled\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-user-modify\":{\"syntax\":\"read-only | read-write | write-only\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"read-only\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-window-dragging\":{\"syntax\":\"drag | no-drag\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"drag\",\"appliesto\":\"allElementsCreatingNativeWindows\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-moz-window-shadow\":{\"syntax\":\"default | menu | tooltip | sheet | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"default\",\"appliesto\":\"allElementsCreatingNativeWindows\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-appearance\":{\"syntax\":\"none | button | button-bevel | caret | checkbox | default-button | inner-spin-button | listbox | listitem | media-controls-background | media-controls-fullscreen-background | media-current-time-display | media-enter-fullscreen-button | media-exit-fullscreen-button | media-fullscreen-button | media-mute-button | media-overlay-play-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | media-time-remaining-display | media-toggle-closed-captions-button | media-volume-slider | media-volume-slider-container | media-volume-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | meter | progress-bar | progress-bar-value | push-button | radio | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"noneButOverriddenInUserAgentCSS\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-border-before\":{\"syntax\":\"<'border-width'> || <'border-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":[\"-webkit-border-before-width\"],\"groups\":[\"WebKit Extensions\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"color\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-border-before-color\":{\"syntax\":\"<'color'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-border-before-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-border-before-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-box-reflect\":{\"syntax\":\"[ above | below | right | left ]? <length>? <image>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-mask\":{\"syntax\":\"[ <mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || [ <box> | border | padding | content | text ] || [ <box> | border | padding | content ] ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":[\"-webkit-mask-image\",\"-webkit-mask-repeat\",\"-webkit-mask-attachment\",\"-webkit-mask-position\",\"-webkit-mask-origin\",\"-webkit-mask-clip\"],\"appliesto\":\"allElements\",\"computed\":[\"-webkit-mask-image\",\"-webkit-mask-repeat\",\"-webkit-mask-attachment\",\"-webkit-mask-position\",\"-webkit-mask-origin\",\"-webkit-mask-clip\"],\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-mask-attachment\":{\"syntax\":\"<attachment>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"scroll\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-clip\":{\"syntax\":\"[ <box> | border | padding | content | text ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"border\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-composite\":{\"syntax\":\"<composite-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"source-over\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-image\":{\"syntax\":\"<mask-reference>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"absoluteURIOrNone\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-origin\":{\"syntax\":\"[ <box> | border | padding | content ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"padding\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-position\":{\"syntax\":\"<position>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfElement\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0% 0%\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-position-x\":{\"syntax\":\"[ <length-percentage> | left | center | right ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfElement\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0%\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-position-y\":{\"syntax\":\"[ <length-percentage> | top | center | bottom ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfElement\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0%\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-repeat\":{\"syntax\":\"<repeat-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-repeat-x\":{\"syntax\":\"repeat | no-repeat | space | round\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-repeat-y\":{\"syntax\":\"repeat | no-repeat | space | round\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrPercentage\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-mask-size\":{\"syntax\":\"<bg-size>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToBackgroundPositioningArea\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"auto auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-overflow-scrolling\":{\"syntax\":\"auto | touch\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"auto\",\"appliesto\":\"scrollingBoxes\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"nonstandard\"},\"-webkit-tap-highlight-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"black\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-text-fill-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-text-stroke\":{\"syntax\":\"<length> || <color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":[\"-webkit-text-stroke-width\",\"-webkit-text-stroke-color\"],\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":[\"-webkit-text-stroke-width\",\"-webkit-text-stroke-color\"],\"appliesto\":\"allElements\",\"computed\":[\"-webkit-text-stroke-width\",\"-webkit-text-stroke-color\"],\"order\":\"canonicalOrder\",\"status\":\"nonstandard\"},\"-webkit-text-stroke-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-text-stroke-width\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-touch-callout\":{\"syntax\":\"default | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"default\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"-webkit-user-modify\":{\"syntax\":\"read-only | read-write | read-write-plaintext-only\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"WebKit Extensions\"],\"initial\":\"read-only\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"align-content\":{\"syntax\":\"normal | <baseline-position> | <content-distribution> | <overflow-position>? <content-position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"normal\",\"appliesto\":\"multilineFlexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"align-items\":{\"syntax\":\"normal | stretch | <baseline-position> | [ <overflow-position>? <self-position> ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"align-self\":{\"syntax\":\"auto | normal | stretch | <baseline-position> | <overflow-position>? <self-position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"auto\",\"appliesto\":\"flexItemsGridItemsAndAbsolutelyPositionedBoxes\",\"computed\":\"autoOnAbsolutelyPositionedElementsValueOfAlignItemsOnParent\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"all\":{\"syntax\":\"initial | inherit | unset | revert\",\"media\":\"noPracticalMedia\",\"inherited\":false,\"animationType\":\"eachOfShorthandPropertiesExceptUnicodeBiDiAndDirection\",\"percentages\":\"no\",\"groups\":[\"CSS Miscellaneous\"],\"initial\":\"noPracticalInitialValue\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedAppliesToEachProperty\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation\":{\"syntax\":\"<single-animation>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":[\"animation-name\",\"animation-duration\",\"animation-timing-function\",\"animation-delay\",\"animation-iteration-count\",\"animation-direction\",\"animation-fill-mode\",\"animation-play-state\"],\"appliesto\":\"allElementsAndPseudos\",\"computed\":[\"animation-name\",\"animation-duration\",\"animation-timing-function\",\"animation-delay\",\"animation-direction\",\"animation-iteration-count\",\"animation-fill-mode\",\"animation-play-state\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"animation-delay\":{\"syntax\":\"<time>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation-direction\":{\"syntax\":\"<single-animation-direction>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"normal\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation-duration\":{\"syntax\":\"<time>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation-fill-mode\":{\"syntax\":\"<single-animation-fill-mode>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"none\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation-iteration-count\":{\"syntax\":\"<single-animation-iteration-count>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"1\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation-name\":{\"syntax\":\"[ none | <keyframes-name> ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"none\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation-play-state\":{\"syntax\":\"<single-animation-play-state>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"running\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"animation-timing-function\":{\"syntax\":\"<single-timing-function>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Animations\"],\"initial\":\"ease\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"appearance\":{\"syntax\":\"auto | none\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"azimuth\":{\"syntax\":\"<angle> | [ [ left-side | far-left | left | center-left | center | center-right | right | far-right | right-side ] || behind ] | leftwards | rightwards\",\"media\":\"aural\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Speech\"],\"initial\":\"center\",\"appliesto\":\"allElements\",\"computed\":\"normalizedAngle\",\"order\":\"orderOfAppearance\",\"status\":\"obsolete\"},\"backdrop-filter\":{\"syntax\":\"none | <filter-function-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"filterList\",\"percentages\":\"no\",\"groups\":[\"Filter Effects\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"backface-visibility\":{\"syntax\":\"visible | hidden\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"visible\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"background\":{\"syntax\":\"[ <bg-layer> , ]* <final-bg-layer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"background-color\",\"background-image\",\"background-clip\",\"background-position\",\"background-size\",\"background-repeat\",\"background-attachment\"],\"percentages\":[\"background-position\",\"background-size\"],\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"background-image\",\"background-position\",\"background-size\",\"background-repeat\",\"background-origin\",\"background-clip\",\"background-attachment\",\"background-color\"],\"appliesto\":\"allElements\",\"computed\":[\"background-image\",\"background-position\",\"background-size\",\"background-repeat\",\"background-origin\",\"background-clip\",\"background-attachment\",\"background-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-attachment\":{\"syntax\":\"<attachment>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"scroll\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-blend-mode\":{\"syntax\":\"<blend-mode>#\",\"media\":\"none\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Compositing and Blending\"],\"initial\":\"normal\",\"appliesto\":\"allElementsSVGContainerGraphicsAndGraphicsReferencingElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-clip\":{\"syntax\":\"<box>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"border-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"transparent\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-image\":{\"syntax\":\"<bg-image>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-origin\":{\"syntax\":\"<box>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"padding-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-position\":{\"syntax\":\"<bg-position>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"referToSizeOfBackgroundPositioningAreaMinusBackgroundImageSize\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0% 0%\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemTwoKeywordsOriginOffsets\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-position-x\":{\"syntax\":\"[ center | [ left | right | x-start | x-end ]? <length-percentage>? ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToWidthOfBackgroundPositioningAreaMinusBackgroundImageHeight\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"left\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"background-position-y\":{\"syntax\":\"[ center | [ top | bottom | y-start | y-end ]? <length-percentage>? ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToHeightOfBackgroundPositioningAreaMinusBackgroundImageHeight\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"top\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemConsistingOfAbsoluteLengthPercentageAndOrigin\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"background-repeat\":{\"syntax\":\"<repeat-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"repeat\",\"appliesto\":\"allElements\",\"computed\":\"listEachItemHasTwoKeywordsOnePerDimension\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"background-size\":{\"syntax\":\"<bg-size>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"relativeToBackgroundPositioningArea\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"auto auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"block-overflow\":{\"syntax\":\"clip | ellipsis | <string>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"clip\",\"appliesto\":\"blockContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"block-size\":{\"syntax\":\"<'width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"blockSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsWidthAndHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border\":{\"syntax\":\"<br-width> || <br-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-color\",\"border-style\",\"border-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-width\",\"border-style\",\"border-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-block-end\":{\"syntax\":\"<'border-width'> || <'border-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-block-end-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-block-end-color\":{\"syntax\":\"<'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-block-end-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-block-end-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-block-start\":{\"syntax\":\"<'border-width'> || <'border-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-block-start-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-block-start-color\":{\"syntax\":\"<'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-block-start-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-block-start-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-bottom\":{\"syntax\":\"<br-width> || <br-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-bottom-color\",\"border-bottom-style\",\"border-bottom-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-bottom-width\",\"border-bottom-style\",\"border-bottom-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-width\",\"border-bottom-style\",\"border-bottom-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-bottom-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-bottom-left-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-bottom-right-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-bottom-style\":{\"syntax\":\"<br-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-bottom-width\":{\"syntax\":\"<br-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderBottomStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-collapse\":{\"syntax\":\"collapse | separate\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"separate\",\"appliesto\":\"tableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-color\":{\"syntax\":\"<color>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-bottom-color\",\"border-left-color\",\"border-right-color\",\"border-top-color\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-color\",\"border-right-color\",\"border-bottom-color\",\"border-left-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-color\",\"border-left-color\",\"border-right-color\",\"border-top-color\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-image\":{\"syntax\":\"<'border-image-source'> || <'border-image-slice'> [ / <'border-image-width'> | / <'border-image-width'>? / <'border-image-outset'> ]? || <'border-image-repeat'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"border-image-slice\",\"border-image-width\"],\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-image-source\",\"border-image-slice\",\"border-image-width\",\"border-image-outset\",\"border-image-repeat\"],\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":[\"border-image-outset\",\"border-image-repeat\",\"border-image-slice\",\"border-image-source\",\"border-image-width\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-image-outset\":{\"syntax\":\"[ <length> | <number> ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-image-repeat\":{\"syntax\":\"[ stretch | repeat | round | space ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"stretch\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-image-slice\":{\"syntax\":\"<number-percentage>{1,4} && fill?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfBorderImage\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"100%\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"oneToFourPercentagesOrAbsoluteLengthsPlusFill\",\"order\":\"percentagesOrLengthsFollowedByFill\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-image-source\":{\"syntax\":\"none | <image>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"noneOrImageWithAbsoluteURI\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-image-width\":{\"syntax\":\"[ <length-percentage> | <number> | auto ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToWidthOrHeightOfBorderImageArea\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"1\",\"appliesto\":\"allElementsExceptTableElementsWhenCollapse\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-inline-end\":{\"syntax\":\"<'border-width'> || <'border-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-inline-end-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-inline-end-color\":{\"syntax\":\"<'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-inline-end-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-inline-end-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-inline-start\":{\"syntax\":\"<'border-width'> || <'border-style'> || <'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":[\"border-width\",\"border-style\",\"color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-width\",\"border-style\",\"border-inline-start-color\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-inline-start-color\":{\"syntax\":\"<'color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-inline-start-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-inline-start-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthZeroIfBorderStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-left\":{\"syntax\":\"<br-width> || <br-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-left-color\",\"border-left-style\",\"border-left-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-left-width\",\"border-left-style\",\"border-left-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-left-width\",\"border-left-style\",\"border-left-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-left-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-left-style\":{\"syntax\":\"<br-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-left-width\":{\"syntax\":\"<br-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderLeftStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-radius\":{\"syntax\":\"<length-percentage>{1,4} [ / <length-percentage>{1,4} ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-top-left-radius\",\"border-top-right-radius\",\"border-bottom-right-radius\",\"border-bottom-left-radius\"],\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-left-radius\",\"border-top-right-radius\",\"border-bottom-right-radius\",\"border-bottom-left-radius\"],\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":[\"border-bottom-left-radius\",\"border-bottom-right-radius\",\"border-top-left-radius\",\"border-top-right-radius\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-right\":{\"syntax\":\"<br-width> || <br-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-right-color\",\"border-right-style\",\"border-right-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-right-width\",\"border-right-style\",\"border-right-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-right-width\",\"border-right-style\",\"border-right-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-right-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-right-style\":{\"syntax\":\"<br-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-right-width\":{\"syntax\":\"<br-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderRightStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-spacing\":{\"syntax\":\"<length> <length>?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"0\",\"appliesto\":\"tableElements\",\"computed\":\"twoAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"border-style\":{\"syntax\":\"<br-style>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-style\",\"border-right-style\",\"border-bottom-style\",\"border-left-style\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-style\",\"border-left-style\",\"border-right-style\",\"border-top-style\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-top\":{\"syntax\":\"<br-width> || <br-style> || <color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-top-color\",\"border-top-style\",\"border-top-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"appliesto\":\"allElements\",\"computed\":[\"border-top-width\",\"border-top-style\",\"border-top-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-top-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-top-left-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-top-right-radius\":{\"syntax\":\"<length-percentage>{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfBorderBox\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"0\",\"appliesto\":\"allElementsUAsNotRequiredWhenCollapse\",\"computed\":\"twoAbsoluteLengthOrPercentages\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-top-style\":{\"syntax\":\"<br-style>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-top-width\":{\"syntax\":\"<br-width>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOr0IfBorderTopStyleNoneOrHidden\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"border-width\":{\"syntax\":\"<br-width>{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"border-bottom-width\",\"border-left-width\",\"border-right-width\",\"border-top-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":[\"border-top-width\",\"border-right-width\",\"border-bottom-width\",\"border-left-width\"],\"appliesto\":\"allElements\",\"computed\":[\"border-bottom-width\",\"border-left-width\",\"border-right-width\",\"border-top-width\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"bottom\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToContainingBlockHeight\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"box-align\":{\"syntax\":\"start | center | end | baseline | stretch\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"stretch\",\"appliesto\":\"elementsWithDisplayBoxOrInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-decoration-break\":{\"syntax\":\"slice | clone\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"slice\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"box-direction\":{\"syntax\":\"normal | reverse | inherit\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"normal\",\"appliesto\":\"elementsWithDisplayBoxOrInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-flex\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"0\",\"appliesto\":\"directChildrenOfElementsWithDisplayMozBoxMozInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-flex-group\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"1\",\"appliesto\":\"inFlowChildrenOfBoxElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-lines\":{\"syntax\":\"single | multiple\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"single\",\"appliesto\":\"boxElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-ordinal-group\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"1\",\"appliesto\":\"childrenOfBoxElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-orient\":{\"syntax\":\"horizontal | vertical | inline-axis | block-axis | inherit\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"inlineAxisHorizontalInXUL\",\"appliesto\":\"elementsWithDisplayBoxOrInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-pack\":{\"syntax\":\"start | center | end | justify\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\",\"WebKit Extensions\"],\"initial\":\"start\",\"appliesto\":\"elementsWithDisplayMozBoxMozInlineBox\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"box-shadow\":{\"syntax\":\"none | <shadow>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"shadowList\",\"percentages\":\"no\",\"groups\":[\"CSS Backgrounds and Borders\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthsSpecifiedColorAsSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"box-sizing\":{\"syntax\":\"content-box | border-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"content-box\",\"appliesto\":\"allElementsAcceptingWidthOrHeight\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"break-after\":{\"syntax\":\"auto | avoid | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region\",\"media\":\"paged\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"break-before\":{\"syntax\":\"auto | avoid | avoid-page | page | left | right | recto | verso | avoid-column | column | avoid-region | region\",\"media\":\"paged\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"break-inside\":{\"syntax\":\"auto | avoid | avoid-page | avoid-column | avoid-region\",\"media\":\"paged\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"caption-side\":{\"syntax\":\"top | bottom | block-start | block-end | inline-start | inline-end\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"top\",\"appliesto\":\"tableCaptionElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"caret-color\":{\"syntax\":\"auto | <color>\",\"media\":\"interactive\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asAutoOrColor\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"clear\":{\"syntax\":\"none | left | right | both | inline-start | inline-end\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"none\",\"appliesto\":\"blockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"clip\":{\"syntax\":\"<shape> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"rectangle\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"auto\",\"appliesto\":\"absolutelyPositionedElements\",\"computed\":\"autoOrRectangle\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"clip-path\":{\"syntax\":\"<clip-source> | [ <basic-shape> || <geometry-box> ] | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"basicShapeOtherwiseNo\",\"percentages\":\"referToReferenceBoxWhenSpecifiedOtherwiseBorderBox\",\"groups\":[\"CSS Masking\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Color\"],\"initial\":\"variesFromBrowserToBrowser\",\"appliesto\":\"allElements\",\"computed\":\"translucentValuesRGBAOtherwiseRGB\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"color-adjust\":{\"syntax\":\"economy | exact\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Color\"],\"initial\":\"economy\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-count\":{\"syntax\":\"<integer> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersExceptTableWrappers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-fill\":{\"syntax\":\"auto | balance | balance-all\",\"media\":\"visualInContinuousMediaNoEffectInOverflowColumns\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"balance\",\"appliesto\":\"multicolElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-gap\":{\"syntax\":\"normal | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"multiColumnElementsFlexContainersGridContainers\",\"computed\":\"asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-rule\":{\"syntax\":\"<'column-rule-width'> || <'column-rule-style'> || <'column-rule-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"column-rule-color\",\"column-rule-style\",\"column-rule-width\"],\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":[\"column-rule-width\",\"column-rule-style\",\"column-rule-color\"],\"appliesto\":\"multicolElements\",\"computed\":[\"column-rule-color\",\"column-rule-style\",\"column-rule-width\"],\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-rule-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"currentcolor\",\"appliesto\":\"multicolElements\",\"computed\":\"computedColor\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-rule-style\":{\"syntax\":\"<'border-style'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"none\",\"appliesto\":\"multicolElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-rule-width\":{\"syntax\":\"<'border-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"medium\",\"appliesto\":\"multicolElements\",\"computed\":\"absoluteLength0IfColumnRuleStyleNoneOrHidden\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-span\":{\"syntax\":\"none | all\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"none\",\"appliesto\":\"inFlowBlockLevelElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"column-width\":{\"syntax\":\"<length> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersExceptTableWrappers\",\"computed\":\"absoluteLengthZeroOrLarger\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"columns\":{\"syntax\":\"<'column-width'> || <'column-count'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"column-width\",\"column-count\"],\"percentages\":\"no\",\"groups\":[\"CSS Columns\"],\"initial\":[\"column-width\",\"column-count\"],\"appliesto\":\"blockContainersExceptTableWrappers\",\"computed\":[\"column-width\",\"column-count\"],\"order\":\"perGrammar\",\"status\":\"standard\"},\"contain\":{\"syntax\":\"none | strict | content | [ size || layout || style || paint ]\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Containment\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"content\":{\"syntax\":\"normal | none | [ <content-replacement> | <content-list> ] [/ <string> ]?\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Generated Content\"],\"initial\":\"normal\",\"appliesto\":\"beforeAndAfterPseudos\",\"computed\":\"normalOnElementsForPseudosNoneAbsoluteURIStringOrAsSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"counter-increment\":{\"syntax\":\"[ <custom-ident> <integer>? ]+ | none\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Counter Styles\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"counter-reset\":{\"syntax\":\"[ <custom-ident> <integer>? ]+ | none\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Counter Styles\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"cursor\":{\"syntax\":\"[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing ] ]\",\"media\":[\"visual\",\"interactive\"],\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"direction\":{\"syntax\":\"ltr | rtl\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"ltr\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"display\":{\"syntax\":\"[ <display-outside> || <display-inside> ] | <display-listitem> | <display-internal> | <display-box> | <display-legacy>\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Display\"],\"initial\":\"inline\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedExceptPositionedFloatingAndRootElementsKeywordMaybeDifferent\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"empty-cells\":{\"syntax\":\"show | hide\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"show\",\"appliesto\":\"tableCellElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"filter\":{\"syntax\":\"none | <filter-function-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"filterList\",\"percentages\":\"no\",\"groups\":[\"Filter Effects\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"flex\":{\"syntax\":\"none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"flex-grow\",\"flex-shrink\",\"flex-basis\"],\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":[\"flex-grow\",\"flex-shrink\",\"flex-basis\"],\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":[\"flex-grow\",\"flex-shrink\",\"flex-basis\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"flex-basis\":{\"syntax\":\"content | <'width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToFlexContainersInnerMainSize\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"auto\",\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"lengthOrPercentageBeforeKeywordIfBothPresent\",\"status\":\"standard\"},\"flex-direction\":{\"syntax\":\"row | row-reverse | column | column-reverse\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"row\",\"appliesto\":\"flexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"flex-flow\":{\"syntax\":\"<'flex-direction'> || <'flex-wrap'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":[\"flex-direction\",\"flex-wrap\"],\"appliesto\":\"flexContainers\",\"computed\":[\"flex-direction\",\"flex-wrap\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"flex-grow\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"0\",\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"flex-shrink\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"1\",\"appliesto\":\"flexItemsAndInFlowPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"flex-wrap\":{\"syntax\":\"nowrap | wrap | wrap-reverse\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"nowrap\",\"appliesto\":\"flexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"float\":{\"syntax\":\"left | right | none | inline-start | inline-end\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"none\",\"appliesto\":\"allElementsNoEffectIfDisplayNone\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"font\":{\"syntax\":\"[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar\",\"media\":\"visual\",\"inherited\":true,\"animationType\":[\"font-style\",\"font-variant\",\"font-weight\",\"font-stretch\",\"font-size\",\"line-height\",\"font-family\"],\"percentages\":[\"font-size\",\"line-height\"],\"groups\":[\"CSS Fonts\"],\"initial\":[\"font-style\",\"font-variant\",\"font-weight\",\"font-stretch\",\"font-size\",\"line-height\",\"font-family\"],\"appliesto\":\"allElements\",\"computed\":[\"font-style\",\"font-variant\",\"font-weight\",\"font-stretch\",\"font-size\",\"line-height\",\"font-family\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-family\":{\"syntax\":\"[ <family-name> | <generic-family> ]#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-feature-settings\":{\"syntax\":\"normal | <feature-tag-value>#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-kerning\":{\"syntax\":\"auto | normal | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-language-override\":{\"syntax\":\"normal | <string>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-optical-sizing\":{\"syntax\":\"auto | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variation-settings\":{\"syntax\":\"normal | [ <string> <number> ]#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"transform\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"experimental\"},\"font-size\":{\"syntax\":\"<absolute-size> | <relative-size> | <length-percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"referToParentElementsFontSize\",\"groups\":[\"CSS Fonts\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-size-adjust\":{\"syntax\":\"none | <number>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-stretch\":{\"syntax\":\"<font-stretch-absolute>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"fontStretch\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-style\":{\"syntax\":\"normal | italic | oblique <angle>?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-synthesis\":{\"syntax\":\"none | [ weight || style ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"weight style\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variant\":{\"syntax\":\"normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> || stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) || [ small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps ] || <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero || <east-asian-variant-values> || <east-asian-width-values> || ruby ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variant-alternates\":{\"syntax\":\"normal | [ stylistic( <feature-value-name> ) || historical-forms || styleset( <feature-value-name># ) || character-variant( <feature-value-name># ) || swash( <feature-value-name> ) || ornaments( <feature-value-name> ) || annotation( <feature-value-name> ) ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variant-caps\":{\"syntax\":\"normal | small-caps | all-small-caps | petite-caps | all-petite-caps | unicase | titling-caps\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variant-east-asian\":{\"syntax\":\"normal | [ <east-asian-variant-values> || <east-asian-width-values> || ruby ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variant-ligatures\":{\"syntax\":\"normal | none | [ <common-lig-values> || <discretionary-lig-values> || <historical-lig-values> || <contextual-alt-values> ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variant-numeric\":{\"syntax\":\"normal | [ <numeric-figure-values> || <numeric-spacing-values> || <numeric-fraction-values> || ordinal || slashed-zero ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-variant-position\":{\"syntax\":\"normal | sub | super\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"font-weight\":{\"syntax\":\"<font-weight-absolute> | bolder | lighter\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"fontWeight\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"keywordOrNumericalValueBolderLighterTransformedToRealValue\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"gap\":{\"syntax\":\"<'row-gap'> <'column-gap'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"row-gap\",\"column-gap\"],\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":[\"row-gap\",\"column-gap\"],\"appliesto\":\"gridContainers\",\"computed\":[\"row-gap\",\"column-gap\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid\":{\"syntax\":\"<'grid-template'> | <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>? | [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"grid-template-rows\",\"grid-template-columns\",\"grid-auto-rows\",\"grid-auto-columns\"],\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-template-rows\",\"grid-template-columns\",\"grid-template-areas\",\"grid-auto-rows\",\"grid-auto-columns\",\"grid-auto-flow\",\"grid-column-gap\",\"grid-row-gap\",\"column-gap\",\"row-gap\"],\"appliesto\":\"gridContainers\",\"computed\":[\"grid-template-rows\",\"grid-template-columns\",\"grid-template-areas\",\"grid-auto-rows\",\"grid-auto-columns\",\"grid-auto-flow\",\"grid-column-gap\",\"grid-row-gap\",\"column-gap\",\"row-gap\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-area\":{\"syntax\":\"<grid-line> [ / <grid-line> ]{0,3}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-row-start\",\"grid-column-start\",\"grid-row-end\",\"grid-column-end\"],\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":[\"grid-row-start\",\"grid-column-start\",\"grid-row-end\",\"grid-column-end\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-auto-columns\":{\"syntax\":\"<track-size>+\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-auto-flow\":{\"syntax\":\"[ row | column ] || dense\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"row\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-auto-rows\":{\"syntax\":\"<track-size>+\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-column\":{\"syntax\":\"<grid-line> [ / <grid-line> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-column-start\",\"grid-column-end\"],\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":[\"grid-column-start\",\"grid-column-end\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-column-end\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-column-gap\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"0\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\"},\"grid-column-start\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-gap\":{\"syntax\":\"<'grid-row-gap'> <'grid-column-gap'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"grid-row-gap\",\"grid-column-gap\"],\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-row-gap\",\"grid-column-gap\"],\"appliesto\":\"gridContainers\",\"computed\":[\"grid-row-gap\",\"grid-column-gap\"],\"order\":\"uniqueOrder\",\"status\":\"obsolete\"},\"grid-row\":{\"syntax\":\"<grid-line> [ / <grid-line> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-row-start\",\"grid-row-end\"],\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":[\"grid-row-start\",\"grid-row-end\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-row-end\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-row-gap\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"0\",\"appliesto\":\"gridContainers\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\"},\"grid-row-start\":{\"syntax\":\"<grid-line>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"auto\",\"appliesto\":\"gridItemsAndBoxesWithinGridContainer\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-template\":{\"syntax\":\"none | [ <'grid-template-rows'> / <'grid-template-columns'> ] | [ <line-names>? <string> <track-size>? <line-names>? ]+ [ / <explicit-track-list> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":[\"grid-template-columns\",\"grid-template-rows\"],\"groups\":[\"CSS Grid Layout\"],\"initial\":[\"grid-template-columns\",\"grid-template-rows\",\"grid-template-areas\"],\"appliesto\":\"gridContainers\",\"computed\":[\"grid-template-columns\",\"grid-template-rows\",\"grid-template-areas\"],\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-template-areas\":{\"syntax\":\"none | <string>+\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-template-columns\":{\"syntax\":\"none | <track-list> | <auto-track-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"grid-template-rows\":{\"syntax\":\"none | <track-list> | <auto-track-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Grid Layout\"],\"initial\":\"none\",\"appliesto\":\"gridContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"hanging-punctuation\":{\"syntax\":\"none | [ first || [ force-end | allow-end ] || last ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"height\":{\"syntax\":\"[ <length> | <percentage> ] && [ border-box | content-box ]? | available | min-content | max-content | fit-content | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"regardingHeightOfGeneratedBoxContainingBlockPercentagesRelativeToContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"allElementsButNonReplacedAndTableColumns\",\"computed\":\"percentageAutoOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"hyphens\":{\"syntax\":\"none | manual | auto\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"manual\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"image-orientation\":{\"syntax\":\"from-image | <angle> | [ <angle>? flip ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"0deg\",\"appliesto\":\"allElements\",\"computed\":\"angleRoundedToNextQuarter\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"image-rendering\":{\"syntax\":\"auto | crisp-edges | pixelated\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"image-resolution\":{\"syntax\":\"[ from-image || <resolution> ] && snap?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"1dppx\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedWithExceptionOfResolution\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"ime-mode\":{\"syntax\":\"auto | normal | active | inactive | disabled\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"textFields\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\"},\"initial-letter\":{\"syntax\":\"normal | [ <number> <integer>? ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Inline\"],\"initial\":\"normal\",\"appliesto\":\"firstLetterPseudoElementsAndInlineLevelFirstChildren\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"initial-letter-align\":{\"syntax\":\"[ auto | alphabetic | hanging | ideographic ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Inline\"],\"initial\":\"auto\",\"appliesto\":\"firstLetterPseudoElementsAndInlineLevelFirstChildren\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"inline-size\":{\"syntax\":\"<'width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"inlineSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsWidthAndHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"isolation\":{\"syntax\":\"auto | isolate\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Compositing and Blending\"],\"initial\":\"auto\",\"appliesto\":\"allElementsSVGContainerGraphicsAndGraphicsReferencingElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"justify-content\":{\"syntax\":\"normal | <content-distribution> | <overflow-position>? [ <content-position> | left | right ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"normal\",\"appliesto\":\"flexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"justify-items\":{\"syntax\":\"normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ] | legacy | legacy && [ left | right | center ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"legacy\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"justify-self\":{\"syntax\":\"auto | normal | stretch | <baseline-position> | <overflow-position>? [ <self-position> | left | right ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"auto\",\"appliesto\":\"blockLevelBoxesAndAbsolutelyPositionedBoxesAndGridItems\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"left\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"letter-spacing\":{\"syntax\":\"normal | <length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"optimumValueOfAbsoluteLengthOrNormal\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\"],\"status\":\"standard\"},\"line-break\":{\"syntax\":\"auto | loose | normal | strict\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"line-clamp\":{\"syntax\":\"none | <integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"none\",\"appliesto\":\"blockContainersExceptMultiColumnContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"line-height\":{\"syntax\":\"normal | <number> | <length> | <percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"numberOrLength\",\"percentages\":\"referToElementFontSize\",\"groups\":[\"CSS Fonts\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLengthOrAsSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"line-height-step\":{\"syntax\":\"<length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fonts\"],\"initial\":\"0\",\"appliesto\":\"blockContainerElements\",\"computed\":\"absoluteLength\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"list-style\":{\"syntax\":\"<'list-style-type'> || <'list-style-position'> || <'list-style-image'>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":[\"list-style-type\",\"list-style-position\",\"list-style-image\"],\"appliesto\":\"listItems\",\"computed\":[\"list-style-image\",\"list-style-position\",\"list-style-type\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"list-style-image\":{\"syntax\":\"<url> | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":\"none\",\"appliesto\":\"listItems\",\"computed\":\"noneOrImageWithAbsoluteURI\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"list-style-position\":{\"syntax\":\"inside | outside\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":\"outside\",\"appliesto\":\"listItems\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"list-style-type\":{\"syntax\":\"<counter-style> | <string> | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Lists and Counters\"],\"initial\":\"disc\",\"appliesto\":\"listItems\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"margin\":{\"syntax\":\"[ <length> | <percentage> | auto ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":[\"margin-bottom\",\"margin-left\",\"margin-right\",\"margin-top\"],\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":[\"margin-bottom\",\"margin-left\",\"margin-right\",\"margin-top\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"margin-block-end\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"margin-block-start\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"margin-bottom\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"margin-inline-end\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"margin-inline-start\":{\"syntax\":\"<'margin-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"dependsOnLayoutModel\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsMargin\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"margin-left\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"margin-right\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"margin-top\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"mask\":{\"syntax\":\"<mask-layer>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"mask-image\",\"mask-mode\",\"mask-repeat\",\"mask-position\",\"mask-clip\",\"mask-origin\",\"mask-size\",\"mask-composite\"],\"percentages\":[\"mask-position\"],\"groups\":[\"CSS Masking\"],\"initial\":[\"mask-image\",\"mask-mode\",\"mask-repeat\",\"mask-position\",\"mask-clip\",\"mask-origin\",\"mask-size\",\"mask-composite\"],\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":[\"mask-image\",\"mask-mode\",\"mask-repeat\",\"mask-position\",\"mask-clip\",\"mask-origin\",\"mask-size\",\"mask-composite\"],\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\"},\"mask-border\":{\"syntax\":\"<'mask-border-source'> || <'mask-border-slice'> [ / <'mask-border-width'>? [ / <'mask-border-outset'> ]? ]? || <'mask-border-repeat'> || <'mask-border-mode'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"mask-border-mode\",\"mask-border-outset\",\"mask-border-repeat\",\"mask-border-slice\",\"mask-border-source\",\"mask-border-width\"],\"percentages\":[\"mask-border-slice\",\"mask-border-width\"],\"groups\":[\"CSS Masking\"],\"initial\":[\"mask-border-mode\",\"mask-border-outset\",\"mask-border-repeat\",\"mask-border-slice\",\"mask-border-source\",\"mask-border-width\"],\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":[\"mask-border-mode\",\"mask-border-outset\",\"mask-border-repeat\",\"mask-border-slice\",\"mask-border-source\",\"mask-border-width\"],\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"experimental\"},\"mask-border-mode\":{\"syntax\":\"luminance | alpha\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"alpha\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"mask-border-outset\":{\"syntax\":\"[ <length> | <number> ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"0\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"mask-border-repeat\":{\"syntax\":\"[ stretch | repeat | round | space ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"stretch\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"mask-border-slice\":{\"syntax\":\"<number-percentage>{1,4} fill?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfMaskBorderImage\",\"groups\":[\"CSS Masking\"],\"initial\":\"0\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"mask-border-source\":{\"syntax\":\"none | <image>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"mask-border-width\":{\"syntax\":\"[ <length-percentage> | <number> | auto ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToMaskBorderImageArea\",\"groups\":[\"CSS Masking\"],\"initial\":\"auto\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"mask-clip\":{\"syntax\":\"[ <geometry-box> | no-clip ]#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"border-box\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-composite\":{\"syntax\":\"<compositing-operator>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"add\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-image\":{\"syntax\":\"<mask-reference>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"none\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedURLsAbsolute\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-mode\":{\"syntax\":\"<masking-mode>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"match-source\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-origin\":{\"syntax\":\"<geometry-box>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"border-box\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-position\":{\"syntax\":\"<position>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"referToSizeOfMaskPaintingArea\",\"groups\":[\"CSS Masking\"],\"initial\":\"center\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"consistsOfTwoKeywordsForOriginAndOffsets\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-repeat\":{\"syntax\":\"<repeat-style>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"no-repeat\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"consistsOfTwoDimensionKeywords\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-size\":{\"syntax\":\"<bg-size>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"auto\",\"appliesto\":\"allElementsSVGContainerElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"mask-type\":{\"syntax\":\"luminance | alpha\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Masking\"],\"initial\":\"luminance\",\"appliesto\":\"maskElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"max-block-size\":{\"syntax\":\"<'max-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"blockSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMaxWidthAndMaxHeight\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"max-height\":{\"syntax\":\"<length> | <percentage> | none | max-content | min-content | fit-content | fill-available\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"regardingHeightOfGeneratedBoxContainingBlockPercentagesNone\",\"groups\":[\"CSS Box Model\"],\"initial\":\"none\",\"appliesto\":\"allElementsButNonReplacedAndTableColumns\",\"computed\":\"percentageAsSpecifiedAbsoluteLengthOrNone\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"max-inline-size\":{\"syntax\":\"<'max-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"inlineSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMaxWidthAndMaxHeight\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"max-lines\":{\"syntax\":\"none | <integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"none\",\"appliesto\":\"blockContainersExceptMultiColumnContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"max-width\":{\"syntax\":\"<length> | <percentage> | none | max-content | min-content | fit-content | fill-available\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"none\",\"appliesto\":\"allElementsButNonReplacedAndTableRows\",\"computed\":\"percentageAsSpecifiedAbsoluteLengthOrNone\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-block-size\":{\"syntax\":\"<'min-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"blockSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMinWidthAndMinHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-height\":{\"syntax\":\"<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"regardingHeightOfGeneratedBoxContainingBlockPercentages0\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsButNonReplacedAndTableColumns\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-inline-size\":{\"syntax\":\"<'min-width'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"inlineSizeOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"sameAsWidthAndHeight\",\"computed\":\"sameAsMinWidthAndMinHeight\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"min-width\":{\"syntax\":\"<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsButNonReplacedAndTableRows\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"mix-blend-mode\":{\"syntax\":\"<blend-mode>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Compositing and Blending\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\"},\"object-fit\":{\"syntax\":\"fill | contain | cover | none | scale-down\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Images\"],\"initial\":\"fill\",\"appliesto\":\"replacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"object-position\":{\"syntax\":\"<position>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"repeatableListOfSimpleListOfLpc\",\"percentages\":\"referToWidthAndHeightOfElement\",\"groups\":[\"CSS Images\"],\"initial\":\"50% 50%\",\"appliesto\":\"replacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"offset\":{\"syntax\":\"[ <'offset-position'>? [ <'offset-path'> [ <'offset-distance'> || <'offset-rotate'> ]? ]? ]! [ / <'offset-anchor'> ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"offset-position\",\"offset-path\",\"offset-distance\",\"offset-anchor\",\"offset-rotate\"],\"percentages\":[\"offset-position\",\"offset-distance\",\"offset-anchor\"],\"groups\":[\"CSS Motion\"],\"initial\":[\"offset-position\",\"offset-path\",\"offset-distance\",\"offset-anchor\",\"offset-rotate\"],\"appliesto\":\"transformableElements\",\"computed\":[\"offset-position\",\"offset-path\",\"offset-distance\",\"offset-anchor\",\"offset-rotate\"],\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"experimental\"},\"offset-anchor\":{\"syntax\":\"auto | <position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"relativeToWidthAndHeight\",\"groups\":[\"CSS Motion\"],\"initial\":\"auto\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"offset-block-end\":{\"syntax\":\"<'left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalHeightOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"offset-block-start\":{\"syntax\":\"<'left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalHeightOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"offset-inline-end\":{\"syntax\":\"<'left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"offset-inline-start\":{\"syntax\":\"<'left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"sameAsBoxOffsets\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"offset-distance\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToTotalPathLength\",\"groups\":[\"CSS Motion\"],\"initial\":\"0\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"offset-path\":{\"syntax\":\"none | ray( [ <angle> && <size>? && contain? ] ) | <path()> | <url> | [ <basic-shape> || <geometry-box> ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"angleOrBasicShapeOrPath\",\"percentages\":\"no\",\"groups\":[\"CSS Motion\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"experimental\"},\"offset-position\":{\"syntax\":\"auto | <position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"referToSizeOfContainingBlock\",\"groups\":[\"CSS Motion\"],\"initial\":\"auto\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"offset-rotate\":{\"syntax\":\"[ auto | reverse ] || <angle>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"angle\",\"percentages\":\"no\",\"groups\":[\"CSS Motion\"],\"initial\":\"auto\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"opacity\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Color\"],\"initial\":\"1.0\",\"appliesto\":\"allElements\",\"computed\":\"specifiedValueClipped0To1\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::placeholder\"],\"status\":\"standard\"},\"order\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"0\",\"appliesto\":\"flexItemsAndAbsolutelyPositionedFlexContainerChildren\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"orphans\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"2\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"outline\":{\"syntax\":\"[ <'outline-color'> || <'outline-style'> || <'outline-width'> ]\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":[\"outline-color\",\"outline-width\",\"outline-style\"],\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":[\"outline-color\",\"outline-style\",\"outline-width\"],\"appliesto\":\"allElements\",\"computed\":[\"outline-color\",\"outline-width\",\"outline-style\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"outline-color\":{\"syntax\":\"<color> | invert\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"invertOrCurrentColor\",\"appliesto\":\"allElements\",\"computed\":\"invertForTranslucentColorRGBAOtherwiseRGB\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"outline-offset\":{\"syntax\":\"<length>\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"outline-style\":{\"syntax\":\"auto | <br-style>\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"outline-width\":{\"syntax\":\"<br-width>\",\"media\":[\"visual\",\"interactive\"],\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"medium\",\"appliesto\":\"allElements\",\"computed\":\"absoluteLength0ForNone\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"overflow\":{\"syntax\":\"[ visible | hidden | clip | scroll | auto ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"visible\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"overflow-anchor\":{\"syntax\":\"auto | none\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Anchoring\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"overflow-block\":{\"syntax\":\"<'overflow'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"overflow-clip-box\":{\"syntax\":\"padding-box | content-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Mozilla Extensions\"],\"initial\":\"padding-box\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"overflow-inline\":{\"syntax\":\"<'overflow'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"auto\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"experimental\"},\"overflow-wrap\":{\"syntax\":\"normal | break-word\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"overflow-x\":{\"syntax\":\"visible | hidden | clip | scroll | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"visible\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"overflow-y\":{\"syntax\":\"visible | hidden | clip | scroll | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Overflow\"],\"initial\":\"visible\",\"appliesto\":\"blockContainersFlexContainersGridContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"overscroll-behavior\":{\"syntax\":\"[ contain | none | auto ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"overscroll-behavior-x\":{\"syntax\":\"contain | none | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"overscroll-behavior-y\":{\"syntax\":\"contain | none | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"nonReplacedBlockAndInlineBlockElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"padding\":{\"syntax\":\"[ <length> | <percentage> ]{1,4}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":[\"padding-bottom\",\"padding-left\",\"padding-right\",\"padding-top\"],\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":[\"padding-bottom\",\"padding-left\",\"padding-right\",\"padding-top\"],\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"padding-block-end\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"padding-block-start\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"padding-bottom\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"padding-inline-end\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"padding-inline-start\":{\"syntax\":\"<'padding-left'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"logicalWidthOfContainingBlock\",\"groups\":[\"CSS Logical Properties\"],\"initial\":\"0\",\"appliesto\":\"allElements\",\"computed\":\"asLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"padding-left\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"padding-right\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"padding-top\":{\"syntax\":\"<length> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"0\",\"appliesto\":\"allElementsExceptInternalTableDisplayTypes\",\"computed\":\"percentageAsSpecifiedOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\"],\"status\":\"standard\"},\"page-break-after\":{\"syntax\":\"auto | always | avoid | left | right | recto | verso\",\"media\":[\"visual\",\"paged\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Pages\"],\"initial\":\"auto\",\"appliesto\":\"blockElementsInNormalFlow\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"page-break-before\":{\"syntax\":\"auto | always | avoid | left | right | recto | verso\",\"media\":[\"visual\",\"paged\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Pages\"],\"initial\":\"auto\",\"appliesto\":\"blockElementsInNormalFlow\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"page-break-inside\":{\"syntax\":\"auto | avoid\",\"media\":[\"visual\",\"paged\"],\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Pages\"],\"initial\":\"auto\",\"appliesto\":\"blockElementsInNormalFlow\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"paint-order\":{\"syntax\":\"normal | [ fill || stroke || markers ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"textElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"perspective\":{\"syntax\":\"none | <length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"absoluteLengthOrNone\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\"},\"perspective-origin\":{\"syntax\":\"<position>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpc\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"50% 50%\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"oneOrTwoValuesLengthAbsoluteKeywordsPercentages\",\"status\":\"standard\"},\"place-content\":{\"syntax\":\"<'align-content'> <'justify-content'>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Flexible Box Layout\"],\"initial\":\"normal\",\"appliesto\":\"multilineFlexContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"pointer-events\":{\"syntax\":\"auto | none | visiblePainted | visibleFill | visibleStroke | visible | painted | fill | stroke | all | inherit\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Pointer Events\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"position\":{\"syntax\":\"static | relative | absolute | sticky | fixed\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"static\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\"},\"quotes\":{\"syntax\":\"none | [ <string> <string> ]+\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Generated Content\"],\"initial\":\"dependsOnUserAgent\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"resize\":{\"syntax\":\"none | both | horizontal | vertical\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"none\",\"appliesto\":\"elementsWithOverflowNotVisibleAndReplacedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"right\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"rotate\":{\"syntax\":\"none | [ x | y | z | <number>{3} ]? && <angle>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\"},\"row-gap\":{\"syntax\":\"normal | <length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToDimensionOfContentArea\",\"groups\":[\"CSS Box Alignment\"],\"initial\":\"normal\",\"appliesto\":\"multiColumnElementsFlexContainersGridContainers\",\"computed\":\"asSpecifiedWithLengthsAbsoluteAndNormalComputingToZeroExceptMultiColumn\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"ruby-align\":{\"syntax\":\"start | center | space-between | space-around\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Ruby\"],\"initial\":\"space-around\",\"appliesto\":\"rubyBasesAnnotationsBaseAnnotationContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"ruby-merge\":{\"syntax\":\"separate | collapse | auto\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Ruby\"],\"initial\":\"separate\",\"appliesto\":\"rubyAnnotationsContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"ruby-position\":{\"syntax\":\"over | under | inter-character\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Ruby\"],\"initial\":\"over\",\"appliesto\":\"rubyAnnotationsContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"scale\":{\"syntax\":\"none | <number>{1,3}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\"},\"scroll-behavior\":{\"syntax\":\"auto | smooth\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSSOM View\"],\"initial\":\"auto\",\"appliesto\":\"scrollingBoxes\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"scroll-snap-coordinate\":{\"syntax\":\"none | <position>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"referToBorderBox\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"scroll-snap-destination\":{\"syntax\":\"<position>\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"position\",\"percentages\":\"relativeToScrollContainerPaddingBoxAxis\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"0px 0px\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"scroll-snap-points-x\":{\"syntax\":\"none | repeat( <length-percentage> )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToScrollContainerPaddingBoxAxis\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\"},\"scroll-snap-points-y\":{\"syntax\":\"none | repeat( <length-percentage> )\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"relativeToScrollContainerPaddingBoxAxis\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"obsolete\"},\"scroll-snap-type\":{\"syntax\":\"none | mandatory | proximity\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"scroll-snap-type-x\":{\"syntax\":\"none | mandatory | proximity\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"scroll-snap-type-y\":{\"syntax\":\"none | mandatory | proximity\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Scroll Snap\"],\"initial\":\"none\",\"appliesto\":\"scrollContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"shape-image-threshold\":{\"syntax\":\"<number>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"number\",\"percentages\":\"no\",\"groups\":[\"CSS Shapes\"],\"initial\":\"0.0\",\"appliesto\":\"floats\",\"computed\":\"specifiedValueNumberClipped0To1\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"shape-margin\":{\"syntax\":\"<length-percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Shapes\"],\"initial\":\"0\",\"appliesto\":\"floats\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"shape-outside\":{\"syntax\":\"none | <shape-box> || <basic-shape> | <image>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"basicShapeOtherwiseNo\",\"percentages\":\"no\",\"groups\":[\"CSS Shapes\"],\"initial\":\"none\",\"appliesto\":\"floats\",\"computed\":\"asDefinedForBasicShapeWithAbsoluteURIOtherwiseAsSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"tab-size\":{\"syntax\":\"<integer> | <length>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"8\",\"appliesto\":\"blockContainers\",\"computed\":\"specifiedIntegerOrAbsoluteLength\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"table-layout\":{\"syntax\":\"auto | fixed\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Table\"],\"initial\":\"auto\",\"appliesto\":\"tableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-align\":{\"syntax\":\"start | end | left | right | center | justify | match-parent\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"startOrNamelessValueIfLTRRightIfRTL\",\"appliesto\":\"blockContainers\",\"computed\":\"asSpecifiedExceptMatchParent\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::placeholder\"],\"status\":\"standard\"},\"text-align-last\":{\"syntax\":\"auto | start | end | left | right | center | justify\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"auto\",\"appliesto\":\"blockContainers\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-combine-upright\":{\"syntax\":\"none | all | [ digits <integer>? ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"none\",\"appliesto\":\"nonReplacedInlineElements\",\"computed\":\"keywordPlusIntegerIfDigits\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-decoration\":{\"syntax\":\"<'text-decoration-line'> || <'text-decoration-style'> || <'text-decoration-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"text-decoration-color\",\"text-decoration-style\",\"text-decoration-line\"],\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":[\"text-decoration-color\",\"text-decoration-style\",\"text-decoration-line\"],\"appliesto\":\"allElements\",\"computed\":[\"text-decoration-line\",\"text-decoration-style\",\"text-decoration-color\"],\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"text-decoration-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"text-decoration-line\":{\"syntax\":\"none | [ underline || overline || line-through || blink ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"text-decoration-skip\":{\"syntax\":\"none | [ objects || [ spaces | [ leading-spaces || trailing-spaces ] ] || edges || box-decoration ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"objects\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"experimental\"},\"text-decoration-skip-ink\":{\"syntax\":\"auto | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"experimental\"},\"text-decoration-style\":{\"syntax\":\"solid | double | dotted | dashed | wavy\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"solid\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"text-emphasis\":{\"syntax\":\"<'text-emphasis-style'> || <'text-emphasis-color'>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":[\"text-emphasis-color\",\"text-emphasis-style\"],\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":[\"text-emphasis-style\",\"text-emphasis-color\"],\"appliesto\":\"allElements\",\"computed\":[\"text-emphasis-style\",\"text-emphasis-color\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"text-emphasis-color\":{\"syntax\":\"<color>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"color\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"currentcolor\",\"appliesto\":\"allElements\",\"computed\":\"computedColor\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-emphasis-position\":{\"syntax\":\"[ over | under ] && [ right | left ]\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"over right\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-emphasis-style\":{\"syntax\":\"none | [ [ filled | open ] || [ dot | circle | double-circle | triangle | sesame ] ] | <string>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-indent\":{\"syntax\":\"<length-percentage> && hanging? && each-line?\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Text\"],\"initial\":\"0\",\"appliesto\":\"blockContainers\",\"computed\":\"percentageOrAbsoluteLengthPlusKeywords\",\"order\":\"lengthOrPercentageBeforeKeywords\",\"status\":\"standard\"},\"text-justify\":{\"syntax\":\"auto | inter-character | inter-word | none\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"auto\",\"appliesto\":\"inlineLevelAndTableCellElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-orientation\":{\"syntax\":\"mixed | upright | sideways\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"mixed\",\"appliesto\":\"allElementsExceptTableRowGroupsRowsColumnGroupsAndColumns\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-overflow\":{\"syntax\":\"[ clip | ellipsis | <string> ]{1,2}\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"clip\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::placeholder\"],\"status\":\"standard\"},\"text-rendering\":{\"syntax\":\"auto | optimizeSpeed | optimizeLegibility | geometricPrecision\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Miscellaneous\"],\"initial\":\"auto\",\"appliesto\":\"textElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"text-shadow\":{\"syntax\":\"none | <shadow-t>#\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"shadowList\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"colorPlusThreeAbsoluteLengths\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"text-size-adjust\":{\"syntax\":\"none | auto | <percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"referToSizeOfFont\",\"groups\":[\"CSS Text\"],\"initial\":\"autoForSmartphoneBrowsersSupportingInflation\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"experimental\"},\"text-transform\":{\"syntax\":\"none | capitalize | uppercase | lowercase | full-width\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"none\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"text-underline-position\":{\"syntax\":\"auto | [ under || [ left | right ] ]\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text Decoration\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"top\":{\"syntax\":\"<length> | <percentage> | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToContainingBlockHeight\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"lengthAbsolutePercentageAsSpecifiedOtherwiseAuto\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"touch-action\":{\"syntax\":\"auto | none | [ [ pan-x | pan-left | pan-right ] || [ pan-y | pan-up | pan-down ] || pinch-zoom ] | manipulation\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"Pointer Events\"],\"initial\":\"auto\",\"appliesto\":\"allElementsExceptNonReplacedInlineElementsTableRowsColumnsRowColumnGroups\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"transform\":{\"syntax\":\"none | <transform-list>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\"},\"transform-box\":{\"syntax\":\"border-box | fill-box | view-box\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"border-box \",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"transform-origin\":{\"syntax\":\"[ <length-percentage> | left | center | right | top | bottom ] | [ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"simpleListOfLpc\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"50% 50% 0\",\"appliesto\":\"transformableElements\",\"computed\":\"forLengthAbsoluteValueOtherwisePercentage\",\"order\":\"oneOrTwoValuesLengthAbsoluteKeywordsPercentages\",\"status\":\"standard\"},\"transform-style\":{\"syntax\":\"flat | preserve-3d\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transforms\"],\"initial\":\"flat\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\"},\"transition\":{\"syntax\":\"<single-transition>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":[\"transition-delay\",\"transition-duration\",\"transition-property\",\"transition-timing-function\"],\"appliesto\":\"allElementsAndPseudos\",\"computed\":[\"transition-delay\",\"transition-duration\",\"transition-property\",\"transition-timing-function\"],\"order\":\"orderOfAppearance\",\"status\":\"standard\"},\"transition-delay\":{\"syntax\":\"<time>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"transition-duration\":{\"syntax\":\"<time>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"0s\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"transition-property\":{\"syntax\":\"none | <single-transition-property>#\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"all\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"transition-timing-function\":{\"syntax\":\"<single-transition-timing-function>#\",\"media\":\"interactive\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Transitions\"],\"initial\":\"ease\",\"appliesto\":\"allElementsAndPseudos\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"translate\":{\"syntax\":\"none | <length-percentage> [ <length-percentage> <length>? ]?\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"transform\",\"percentages\":\"referToSizeOfBoundingBox\",\"groups\":[\"CSS Transforms\"],\"initial\":\"none\",\"appliesto\":\"transformableElements\",\"computed\":\"asSpecifiedRelativeToAbsoluteLengths\",\"order\":\"perGrammar\",\"stacking\":true,\"status\":\"standard\"},\"unicode-bidi\":{\"syntax\":\"normal | embed | isolate | bidi-override | isolate-override | plaintext\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"normal\",\"appliesto\":\"allElementsSomeValuesNoEffectOnNonInlineElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"user-select\":{\"syntax\":\"auto | text | none | contain | all\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Basic User Interface\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"},\"vertical-align\":{\"syntax\":\"baseline | sub | super | text-top | text-bottom | middle | top | bottom | <percentage> | <length>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"length\",\"percentages\":\"referToLineHeight\",\"groups\":[\"CSS Table\"],\"initial\":\"baseline\",\"appliesto\":\"inlineLevelAndTableCellElements\",\"computed\":\"absoluteLengthOrKeyword\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"visibility\":{\"syntax\":\"visible | hidden | collapse\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"visibility\",\"percentages\":\"no\",\"groups\":[\"CSS Box Model\"],\"initial\":\"visible\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"white-space\":{\"syntax\":\"normal | pre | nowrap | pre-wrap | pre-line\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"widows\":{\"syntax\":\"<integer>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Fragmentation\"],\"initial\":\"2\",\"appliesto\":\"blockContainerElements\",\"computed\":\"asSpecified\",\"order\":\"perGrammar\",\"status\":\"standard\"},\"width\":{\"syntax\":\"[ <length> | <percentage> ] && [ border-box | content-box ]? | available | min-content | max-content | fit-content | auto\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"lpc\",\"percentages\":\"referToWidthOfContainingBlock\",\"groups\":[\"CSS Box Model\"],\"initial\":\"auto\",\"appliesto\":\"allElementsButNonReplacedAndTableRows\",\"computed\":\"percentageAutoOrAbsoluteLength\",\"order\":\"lengthOrPercentageBeforeKeywordIfBothPresent\",\"status\":\"standard\"},\"will-change\":{\"syntax\":\"auto | <animateable-feature>#\",\"media\":\"all\",\"inherited\":false,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Will Change\"],\"initial\":\"auto\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"word-break\":{\"syntax\":\"normal | break-all | keep-all | break-word\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"word-spacing\":{\"syntax\":\"normal | <length-percentage>\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"length\",\"percentages\":\"referToWidthOfAffectedGlyph\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"optimumMinAndMaxValueOfAbsoluteLengthPercentageOrNormal\",\"order\":\"uniqueOrder\",\"alsoAppliesTo\":[\"::first-letter\",\"::first-line\",\"::placeholder\"],\"status\":\"standard\"},\"word-wrap\":{\"syntax\":\"normal | break-word\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Text\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"writing-mode\":{\"syntax\":\"horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr\",\"media\":\"visual\",\"inherited\":true,\"animationType\":\"discrete\",\"percentages\":\"no\",\"groups\":[\"CSS Writing Modes\"],\"initial\":\"horizontal-tb\",\"appliesto\":\"allElementsExceptTableRowColumnGroupsTableRowsColumns\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"standard\"},\"z-index\":{\"syntax\":\"auto | <integer>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"CSS Positioning\"],\"initial\":\"auto\",\"appliesto\":\"positionedElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"stacking\":true,\"status\":\"standard\"},\"zoom\":{\"syntax\":\"normal | reset | <number> | <percentage>\",\"media\":\"visual\",\"inherited\":false,\"animationType\":\"integer\",\"percentages\":\"no\",\"groups\":[\"Microsoft Extensions\"],\"initial\":\"normal\",\"appliesto\":\"allElements\",\"computed\":\"asSpecified\",\"order\":\"uniqueOrder\",\"status\":\"nonstandard\"}}");

/***/ }),
/* 51 */
/***/ (function(module) {

module.exports = JSON.parse("{\"absolute-size\":{\"syntax\":\"xx-small | x-small | small | medium | large | x-large | xx-large\"},\"alpha-value\":{\"syntax\":\"<number> | <percentage>\"},\"angle-percentage\":{\"syntax\":\"<angle> | <percentage>\"},\"animateable-feature\":{\"syntax\":\"scroll-position | contents | <custom-ident>\"},\"attachment\":{\"syntax\":\"scroll | fixed | local\"},\"attr()\":{\"syntax\":\"attr( <attr-name> <type-or-unit>? [, <attr-fallback> ]? )\"},\"attr-matcher\":{\"syntax\":\"[ '~' | '|' | '^' | '$' | '*' ]? '='\"},\"attr-modifier\":{\"syntax\":\"i\"},\"attribute-selector\":{\"syntax\":\"'[' <wq-name> ']' | '[' <wq-name> <attr-matcher> [ <string-token> | <ident-token> ] <attr-modifier>? ']'\"},\"auto-repeat\":{\"syntax\":\"repeat( [ auto-fill | auto-fit ] , [ <line-names>? <fixed-size> ]+ <line-names>? )\"},\"auto-track-list\":{\"syntax\":\"[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>? <auto-repeat>\\n[ <line-names>? [ <fixed-size> | <fixed-repeat> ] ]* <line-names>?\"},\"baseline-position\":{\"syntax\":\"[ first | last ]? baseline\"},\"basic-shape\":{\"syntax\":\"<inset()> | <circle()> | <ellipse()> | <polygon()>\"},\"bg-image\":{\"syntax\":\"none | <image>\"},\"bg-layer\":{\"syntax\":\"<bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>\"},\"bg-position\":{\"syntax\":\"[ [ left | center | right | top | bottom | <length-percentage> ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ] | [ center | [ left | right ] <length-percentage>? ] && [ center | [ top | bottom ] <length-percentage>? ] ]\"},\"bg-size\":{\"syntax\":\"[ <length-percentage> | auto ]{1,2} | cover | contain\"},\"blur()\":{\"syntax\":\"blur( <length> )\"},\"blend-mode\":{\"syntax\":\"normal | multiply | screen | overlay | darken | lighten | color-dodge | color-burn | hard-light | soft-light | difference | exclusion | hue | saturation | color | luminosity\"},\"box\":{\"syntax\":\"border-box | padding-box | content-box\"},\"br-style\":{\"syntax\":\"none | hidden | dotted | dashed | solid | double | groove | ridge | inset | outset\"},\"br-width\":{\"syntax\":\"<length> | thin | medium | thick\"},\"brightness()\":{\"syntax\":\"brightness( <number-percentage> )\"},\"calc()\":{\"syntax\":\"calc( <calc-sum> )\"},\"calc-sum\":{\"syntax\":\"<calc-product> [ [ '+' | '-' ] <calc-product> ]*\"},\"calc-product\":{\"syntax\":\"<calc-value> [ '*' <calc-value> | '/' <number> ]*\"},\"calc-value\":{\"syntax\":\"<number> | <dimension> | <percentage> | ( <calc-sum> )\"},\"cf-final-image\":{\"syntax\":\"<image> | <color>\"},\"cf-mixing-image\":{\"syntax\":\"<percentage>? && <image>\"},\"circle()\":{\"syntax\":\"circle( [ <shape-radius> ]? [ at <position> ]? )\"},\"class-selector\":{\"syntax\":\"'.' <ident-token>\"},\"clip-source\":{\"syntax\":\"<url>\"},\"color\":{\"syntax\":\"<rgb()> | <rgba()> | <hsl()> | <hsla()> | <hex-color> | <named-color> | currentcolor | <deprecated-system-color>\"},\"color-stop\":{\"syntax\":\"<color> <length-percentage>?\"},\"color-stop-list\":{\"syntax\":\"<color-stop>#{2,}\"},\"common-lig-values\":{\"syntax\":\"[ common-ligatures | no-common-ligatures ]\"},\"composite-style\":{\"syntax\":\"clear | copy | source-over | source-in | source-out | source-atop | destination-over | destination-in | destination-out | destination-atop | xor\"},\"compositing-operator\":{\"syntax\":\"add | subtract | intersect | exclude\"},\"compound-selector\":{\"syntax\":\"[ <type-selector>? <subclass-selector>* [ <pseudo-element-selector> <pseudo-class-selector>* ]* ]!\"},\"compound-selector-list\":{\"syntax\":\"<compound-selector>#\"},\"contextual-alt-values\":{\"syntax\":\"[ contextual | no-contextual ]\"},\"content-distribution\":{\"syntax\":\"space-between | space-around | space-evenly | stretch\"},\"content-list\":{\"syntax\":\"[ <string> | contents | <image> | <quote> | <target> | <leader()> ]+\"},\"content-position\":{\"syntax\":\"center | start | end | flex-start | flex-end\"},\"content-replacement\":{\"syntax\":\"<image>\"},\"contrast()\":{\"syntax\":\"contrast( [ <number-percentage> ] )\"},\"counter-style\":{\"syntax\":\"<counter-style-name> | symbols()\"},\"counter-style-name\":{\"syntax\":\"<custom-ident>\"},\"cross-fade()\":{\"syntax\":\"cross-fade( <cf-mixing-image> , <cf-final-image>? )\"},\"cubic-bezier-timing-function\":{\"syntax\":\"ease | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)\"},\"deprecated-system-color\":{\"syntax\":\"ActiveBorder | ActiveCaption | AppWorkspace | Background | ButtonFace | ButtonHighlight | ButtonShadow | ButtonText | CaptionText | GrayText | Highlight | HighlightText | InactiveBorder | InactiveCaption | InactiveCaptionText | InfoBackground | InfoText | Menu | MenuText | Scrollbar | ThreeDDarkShadow | ThreeDFace | ThreeDHighlight | ThreeDLightShadow | ThreeDShadow | Window | WindowFrame | WindowText\"},\"discretionary-lig-values\":{\"syntax\":\"[ discretionary-ligatures | no-discretionary-ligatures ]\"},\"display-box\":{\"syntax\":\"contents | none\"},\"display-inside\":{\"syntax\":\"flow | flow-root | table | flex | grid | subgrid | ruby\"},\"display-internal\":{\"syntax\":\"table-row-group | table-header-group | table-footer-group | table-row | table-cell | table-column-group | table-column | table-caption | ruby-base | ruby-text | ruby-base-container | ruby-text-container\"},\"display-legacy\":{\"syntax\":\"inline-block | inline-list-item | inline-table | inline-flex | inline-grid\"},\"display-listitem\":{\"syntax\":\"<display-outside>? && [ flow | flow-root ]? && list-item\"},\"display-outside\":{\"syntax\":\"block | inline | run-in\"},\"drop-shadow()\":{\"syntax\":\"drop-shadow( <length>{2,3} <color>? )\"},\"east-asian-variant-values\":{\"syntax\":\"[ jis78 | jis83 | jis90 | jis04 | simplified | traditional ]\"},\"east-asian-width-values\":{\"syntax\":\"[ full-width | proportional-width ]\"},\"element()\":{\"syntax\":\"element( <id-selector> )\"},\"ellipse()\":{\"syntax\":\"ellipse( [ <shape-radius>{2} ]? [ at <position> ]? )\"},\"ending-shape\":{\"syntax\":\"circle | ellipse\"},\"explicit-track-list\":{\"syntax\":\"[ <line-names>? <track-size> ]+ <line-names>?\"},\"family-name\":{\"syntax\":\"<string> | <custom-ident>+\"},\"feature-tag-value\":{\"syntax\":\"<string> [ <integer> | on | off ]?\"},\"feature-type\":{\"syntax\":\"@stylistic | @historical-forms | @styleset | @character-variant | @swash | @ornaments | @annotation\"},\"feature-value-block\":{\"syntax\":\"<feature-type> {\\n  <feature-value-declaration-list>\\n}\"},\"feature-value-block-list\":{\"syntax\":\"<feature-value-block>+\"},\"feature-value-declaration\":{\"syntax\":\"<custom-ident>: <integer>+;\"},\"feature-value-declaration-list\":{\"syntax\":\"<feature-value-declaration>\"},\"feature-value-name\":{\"syntax\":\"<custom-ident>\"},\"fill-rule\":{\"syntax\":\"nonzero | evenodd\"},\"filter-function\":{\"syntax\":\"<blur()> | <brightness()> | <contrast()> | <drop-shadow()> | <grayscale()> | <hue-rotate()> | <invert()> | <opacity()> | <saturate()> | <sepia()>\"},\"filter-function-list\":{\"syntax\":\"[ <filter-function> | <url> ]+\"},\"final-bg-layer\":{\"syntax\":\"<'background-color'> || <bg-image> || <bg-position> [ / <bg-size> ]? || <repeat-style> || <attachment> || <box> || <box>\"},\"fit-content()\":{\"syntax\":\"fit-content( [ <length> | <percentage> ] )\"},\"fixed-breadth\":{\"syntax\":\"<length-percentage>\"},\"fixed-repeat\":{\"syntax\":\"repeat( [ <positive-integer> ] , [ <line-names>? <fixed-size> ]+ <line-names>? )\"},\"fixed-size\":{\"syntax\":\"<fixed-breadth> | minmax( <fixed-breadth> , <track-breadth> ) | minmax( <inflexible-breadth> , <fixed-breadth> )\"},\"font-stretch-absolute\":{\"syntax\":\"normal | ultra-condensed | extra-condensed | condensed | semi-condensed | semi-expanded | expanded | extra-expanded | ultra-expanded | <percentage>\"},\"font-variant-css21\":{\"syntax\":\"[ normal | small-caps ]\"},\"font-weight-absolute\":{\"syntax\":\"normal | bold | <number>\"},\"frames-timing-function\":{\"syntax\":\"frames(<integer>)\"},\"frequency-percentage\":{\"syntax\":\"<frequency> | <percentage>\"},\"general-enclosed\":{\"syntax\":\"[ <function-token> <any-value> ) ] | ( <ident> <any-value> )\"},\"generic-family\":{\"syntax\":\"serif | sans-serif | cursive | fantasy | monospace\"},\"generic-name\":{\"syntax\":\"serif | sans-serif | cursive | fantasy | monospace\"},\"geometry-box\":{\"syntax\":\"<shape-box> | fill-box | stroke-box | view-box\"},\"gradient\":{\"syntax\":\"<linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()>\"},\"grayscale()\":{\"syntax\":\"grayscale( <number-percentage> )\"},\"grid-line\":{\"syntax\":\"auto | <custom-ident> | [ <integer> && <custom-ident>? ] | [ span && [ <integer> || <custom-ident> ] ]\"},\"historical-lig-values\":{\"syntax\":\"[ historical-ligatures | no-historical-ligatures ]\"},\"hsl()\":{\"syntax\":\"hsl( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsl( <hue>, <percentage>, <percentage>, <alpha-value>? )\"},\"hsla()\":{\"syntax\":\"hsla( <hue> <percentage> <percentage> [ / <alpha-value> ]? ) | hsla( <hue>, <percentage>, <percentage>, <alpha-value>? )\"},\"hue\":{\"syntax\":\"<number> | <angle>\"},\"hue-rotate()\":{\"syntax\":\"hue-rotate( <angle> )\"},\"id-selector\":{\"syntax\":\"<hash-token>\"},\"image\":{\"syntax\":\"<url> | <image()> | <image-set()> | <element()> | <cross-fade()> | <gradient>\"},\"image()\":{\"syntax\":\"image( [ [ <image> | <string> ]? , <color>? ]! )\"},\"image-set()\":{\"syntax\":\"image-set( <image-set-option># )\"},\"image-set-option\":{\"syntax\":\"[ <image> | <string> ] <resolution>\"},\"inflexible-breadth\":{\"syntax\":\"<length> | <percentage> | min-content | max-content | auto\"},\"inset()\":{\"syntax\":\"inset( <length-percentage>{1,4} [ round <border-radius> ]? )\"},\"invert()\":{\"syntax\":\"invert( <number-percentage> )\"},\"keyframes-name\":{\"syntax\":\"<custom-ident> | <string>\"},\"keyframe-block\":{\"syntax\":\"<keyframe-selector># {\\n  <declaration-list>\\n}\"},\"keyframe-block-list\":{\"syntax\":\"<keyframe-block>+\"},\"keyframe-selector\":{\"syntax\":\"from | to | <percentage>\"},\"leader()\":{\"syntax\":\"leader( <leader-type> )\"},\"leader-type\":{\"syntax\":\"dotted | solid | space | <string>\"},\"length-percentage\":{\"syntax\":\"<length> | <percentage>\"},\"line-names\":{\"syntax\":\"'[' <custom-ident>* ']'\"},\"line-name-list\":{\"syntax\":\"[ <line-names> | <name-repeat> ]+\"},\"linear-gradient()\":{\"syntax\":\"linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )\"},\"mask-layer\":{\"syntax\":\"<mask-reference> || <position> [ / <bg-size> ]? || <repeat-style> || <geometry-box> || [ <geometry-box> | no-clip ] || <compositing-operator> || <masking-mode>\"},\"mask-position\":{\"syntax\":\"[ <length-percentage> | left | center | right ] [ <length-percentage> | top | center | bottom ]?\"},\"mask-reference\":{\"syntax\":\"none | <image> | <mask-source>\"},\"mask-source\":{\"syntax\":\"<url>\"},\"masking-mode\":{\"syntax\":\"alpha | luminance | match-source\"},\"matrix()\":{\"syntax\":\"matrix( <number> [, <number> ]{5,5} )\"},\"matrix3d()\":{\"syntax\":\"matrix3d( <number> [, <number> ]{15,15} )\"},\"media-and\":{\"syntax\":\"<media-in-parens> [ and <media-in-parens> ]+\"},\"media-condition\":{\"syntax\":\"<media-not> | <media-and> | <media-or> | <media-in-parens>\"},\"media-condition-without-or\":{\"syntax\":\"<media-not> | <media-and> | <media-in-parens>\"},\"media-feature\":{\"syntax\":\"( [ <mf-plain> | <mf-boolean> | <mf-range> ] )\"},\"media-in-parens\":{\"syntax\":\"( <media-condition> ) | <media-feature> | <general-enclosed>\"},\"media-not\":{\"syntax\":\"not <media-in-parens>\"},\"media-or\":{\"syntax\":\"<media-in-parens> [ or <media-in-parens> ]+\"},\"media-query\":{\"syntax\":\"<media-condition> | [ not | only ]? <media-type> [ and <media-condition-without-or> ]?\"},\"media-query-list\":{\"syntax\":\"<media-query>#\"},\"media-type\":{\"syntax\":\"<ident>\"},\"mf-boolean\":{\"syntax\":\"<mf-name>\"},\"mf-name\":{\"syntax\":\"<ident>\"},\"mf-plain\":{\"syntax\":\"<mf-name> : <mf-value>\"},\"mf-range\":{\"syntax\":\"<mf-name> [ '<' | '>' ]? '='? <mf-value>\\n| <mf-value> [ '<' | '>' ]? '='? <mf-name>\\n| <mf-value> '<' '='? <mf-name> '<' '='? <mf-value>\\n| <mf-value> '>' '='? <mf-name> '>' '='? <mf-value>\"},\"mf-value\":{\"syntax\":\"<number> | <dimension> | <ident> | <ratio>\"},\"minmax()\":{\"syntax\":\"minmax( [ <length> | <percentage> | <flex> | min-content | max-content | auto ] , [ <length> | <percentage> | <flex> | min-content | max-content | auto ] )\"},\"named-color\":{\"syntax\":\"transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen\"},\"namespace-prefix\":{\"syntax\":\"<ident>\"},\"ns-prefix\":{\"syntax\":\"[ <ident-token> | '*' ]? '|'\"},\"number-percentage\":{\"syntax\":\"<number> | <percentage>\"},\"numeric-figure-values\":{\"syntax\":\"[ lining-nums | oldstyle-nums ]\"},\"numeric-fraction-values\":{\"syntax\":\"[ diagonal-fractions | stacked-fractions ]\"},\"numeric-spacing-values\":{\"syntax\":\"[ proportional-nums | tabular-nums ]\"},\"nth\":{\"syntax\":\"<an-plus-b> | even | odd\"},\"opacity()\":{\"syntax\":\"opacity( [ <number-percentage> ] )\"},\"overflow-position\":{\"syntax\":\"unsafe | safe\"},\"outline-radius\":{\"syntax\":\"<length> | <percentage>\"},\"page-body\":{\"syntax\":\"<declaration>? [ ; <page-body> ]? | <page-margin-box> <page-body>\"},\"page-margin-box\":{\"syntax\":\"<page-margin-box-type> {\\n  <declaration-list>\\n}\"},\"page-margin-box-type\":{\"syntax\":\"@top-left-corner | @top-left | @top-center | @top-right | @top-right-corner | @bottom-left-corner | @bottom-left | @bottom-center | @bottom-right | @bottom-right-corner | @left-top | @left-middle | @left-bottom | @right-top | @right-middle | @right-bottom\"},\"page-selector-list\":{\"syntax\":\"[ <page-selector># ]?\"},\"page-selector\":{\"syntax\":\"<pseudo-page>+ | <ident> <pseudo-page>*\"},\"perspective()\":{\"syntax\":\"perspective( <length> )\"},\"polygon()\":{\"syntax\":\"polygon( <fill-rule>? , [ <length-percentage> <length-percentage> ]# )\"},\"position\":{\"syntax\":\"[ [ left | center | right ] || [ top | center | bottom ] | [ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]? | [ [ left | right ] <length-percentage> ] && [ [ top | bottom ] <length-percentage> ] ]\"},\"pseudo-class-selector\":{\"syntax\":\"':' <ident-token> | ':' <function-token> <any-value> ')'\"},\"pseudo-element-selector\":{\"syntax\":\"':' <pseudo-class-selector>\"},\"pseudo-page\":{\"syntax\":\": [ left | right | first | blank ]\"},\"quote\":{\"syntax\":\"open-quote | close-quote | no-open-quote | no-close-quote\"},\"radial-gradient()\":{\"syntax\":\"radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )\"},\"relative-size\":{\"syntax\":\"larger | smaller\"},\"repeat-style\":{\"syntax\":\"repeat-x | repeat-y | [ repeat | space | round | no-repeat ]{1,2}\"},\"repeating-linear-gradient()\":{\"syntax\":\"repeating-linear-gradient( [ <angle> | to <side-or-corner> ]? , <color-stop-list> )\"},\"repeating-radial-gradient()\":{\"syntax\":\"repeating-radial-gradient( [ <ending-shape> || <size> ]? [ at <position> ]? , <color-stop-list> )\"},\"rgb()\":{\"syntax\":\"rgb( <percentage>{3} [ / <alpha-value> ]? ) | rgb( <number>{3} [ / <alpha-value> ]? ) | rgb( <percentage>#{3} , <alpha-value>? ) | rgb( <number>#{3} , <alpha-value>? )\"},\"rgba()\":{\"syntax\":\"rgba( <percentage>{3} [ / <alpha-value> ]? ) | rgba( <number>{3} [ / <alpha-value> ]? ) | rgba( <percentage>#{3} , <alpha-value>? ) | rgba( <number>#{3} , <alpha-value>? )\"},\"rotate()\":{\"syntax\":\"rotate( <angle> )\"},\"rotate3d()\":{\"syntax\":\"rotate3d( <number> , <number> , <number> , <angle> )\"},\"rotateX()\":{\"syntax\":\"rotateX( <angle> )\"},\"rotateY()\":{\"syntax\":\"rotateY( <angle> )\"},\"rotateZ()\":{\"syntax\":\"rotateZ( <angle> )\"},\"saturate()\":{\"syntax\":\"saturate( <number-percentage> )\"},\"scale()\":{\"syntax\":\"scale( <number> [, <number> ]? )\"},\"scale3d()\":{\"syntax\":\"scale3d( <number> , <number> , <number> )\"},\"scaleX()\":{\"syntax\":\"scaleX( <number> )\"},\"scaleY()\":{\"syntax\":\"scaleY( <number> )\"},\"scaleZ()\":{\"syntax\":\"scaleZ( <number> )\"},\"self-position\":{\"syntax\":\"center | start | end | self-start | self-end | flex-start | flex-end\"},\"shape-radius\":{\"syntax\":\"<length-percentage> | closest-side | farthest-side\"},\"skew()\":{\"syntax\":\"skew( <angle> [, <angle> ]? )\"},\"skewX()\":{\"syntax\":\"skewX( <angle> )\"},\"skewY()\":{\"syntax\":\"skewY( <angle> )\"},\"sepia()\":{\"syntax\":\"sepia( <number-percentage> )\"},\"shadow\":{\"syntax\":\"inset? && <length>{2,4} && <color>?\"},\"shadow-t\":{\"syntax\":\"[ <length>{2,3} && <color>? ]\"},\"shape\":{\"syntax\":\"rect(<top>, <right>, <bottom>, <left>)\"},\"shape-box\":{\"syntax\":\"<box> | margin-box\"},\"side-or-corner\":{\"syntax\":\"[ left | right ] || [ top | bottom ]\"},\"single-animation\":{\"syntax\":\"<time> || <single-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state> || [ none | <keyframes-name> ]\"},\"single-animation-direction\":{\"syntax\":\"normal | reverse | alternate | alternate-reverse\"},\"single-animation-fill-mode\":{\"syntax\":\"none | forwards | backwards | both\"},\"single-animation-iteration-count\":{\"syntax\":\"infinite | <number>\"},\"single-animation-play-state\":{\"syntax\":\"running | paused\"},\"single-timing-function\":{\"syntax\":\"linear | <cubic-bezier-timing-function> | <step-timing-function> | <frames-timing-function>\"},\"single-transition\":{\"syntax\":\"[ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>\"},\"single-transition-timing-function\":{\"syntax\":\"<single-timing-function>\"},\"single-transition-property\":{\"syntax\":\"all | <custom-ident>\"},\"size\":{\"syntax\":\"closest-side | farthest-side | closest-corner | farthest-corner | <length> | <length-percentage>{2}\"},\"step-timing-function\":{\"syntax\":\"step-start | step-end | steps(<integer>[, [ start | end ] ]?)\"},\"subclass-selector\":{\"syntax\":\"<id-selector> | <class-selector> | <attribute-selector> | <pseudo-class-selector>\"},\"symbol\":{\"syntax\":\"<string> | <image> | <custom-ident>\"},\"target\":{\"syntax\":\"<target-counter()> | <target-counters()> | <target-text()>\"},\"target-counter()\":{\"syntax\":\"target-counter( [ <string> | <url> ] , <custom-ident> , <counter-style>? )\"},\"target-counters()\":{\"syntax\":\"target-counters( [ <string> | <url> ] , <custom-ident> , <string> , <counter-style>? )\"},\"target-text()\":{\"syntax\":\"target-text( [ <string> | <url> ] , [ content | before | after | first-letter ]? )\"},\"time-percentage\":{\"syntax\":\"<time> | <percentage>\"},\"track-breadth\":{\"syntax\":\"<length-percentage> | <flex> | min-content | max-content | auto\"},\"track-list\":{\"syntax\":\"[ <line-names>? [ <track-size> | <track-repeat> ] ]+ <line-names>?\"},\"track-repeat\":{\"syntax\":\"repeat( [ <positive-integer> ] , [ <line-names>? <track-size> ]+ <line-names>? )\"},\"track-size\":{\"syntax\":\"<track-breadth> | minmax( <inflexible-breadth> , <track-breadth> ) | fit-content( [ <length> | <percentage> ] )\"},\"transform-function\":{\"syntax\":\"<matrix()> | <translate()> | <translateX()> | <translateY()> | <scale()> | <scaleX()> | <scaleY()> | <rotate()> | <skew()> | <skewX()> | <skewY()> | <matrix3d()> | <translate3d()> | <translateZ()> | <scale3d()> | <scaleZ()> | <rotate3d()> | <rotateX()> | <rotateY()> | <rotateZ()> | <perspective()>\"},\"transform-list\":{\"syntax\":\"<transform-function>+\"},\"translate()\":{\"syntax\":\"translate( <length-percentage> [, <length-percentage> ]? )\"},\"translate3d()\":{\"syntax\":\"translate3d( <length-percentage> , <length-percentage> , <length> )\"},\"translateX()\":{\"syntax\":\"translateX( <length-percentage> )\"},\"translateY()\":{\"syntax\":\"translateY( <length-percentage> )\"},\"translateZ()\":{\"syntax\":\"translateZ( <length> )\"},\"type-or-unit\":{\"syntax\":\"string | integer | color | url | integer | number | length | angle | time | frequency | em | ex | px | rem | vw | vh | vmin | vmax | mm | q | cm | in | pt | pc | deg | grad | rad | ms | s | Hz | kHz | %\"},\"type-selector\":{\"syntax\":\"<wq-name> | <ns-prefix>? '*'\"},\"var()\":{\"syntax\":\"var( <custom-property-name> [, <declaration-value> ]? )\"},\"viewport-length\":{\"syntax\":\"auto | <length-percentage>\"},\"wq-name\":{\"syntax\":\"<ns-prefix>? <ident-token>\"}}");

/***/ }),
/* 52 */
/***/ (function(module) {

module.exports = JSON.parse("{\"properties\":{\"--*\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"-moz-background-clip\":{\"comment\":\"deprecated syntax in old Firefox, https://developer.mozilla.org/en/docs/Web/CSS/background-clip\",\"syntax\":\"padding | border\"},\"-moz-border-radius-bottomleft\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-left-radius\",\"syntax\":\"<'border-bottom-left-radius'>\"},\"-moz-border-radius-bottomright\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius\",\"syntax\":\"<'border-bottom-right-radius'>\"},\"-moz-border-radius-topleft\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-left-radius\",\"syntax\":\"<'border-top-left-radius'>\"},\"-moz-border-radius-topright\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-right-radius\",\"syntax\":\"<'border-bottom-right-radius'>\"},\"-moz-osx-font-smoothing\":{\"comment\":\"misssed old syntax https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth\",\"syntax\":\"auto | grayscale\"},\"-moz-user-select\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/user-select\",\"syntax\":\"none | text | all | -moz-none\"},\"-ms-flex-align\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align\",\"syntax\":\"start | end | center | baseline | stretch\"},\"-ms-flex-item-align\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-align\",\"syntax\":\"auto | start | end | center | baseline | stretch\"},\"-ms-flex-line-pack\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-line-pack\",\"syntax\":\"start | end | center | justify | distribute | stretch\"},\"-ms-flex-negative\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-shrink'>\"},\"-ms-flex-pack\":{\"comment\":\"misssed old syntax implemented in IE, https://www.w3.org/TR/2012/WD-css3-flexbox-20120322/#flex-pack\",\"syntax\":\"start | end | center | justify | distribute\"},\"-ms-flex-order\":{\"comment\":\"misssed old syntax implemented in IE; https://msdn.microsoft.com/en-us/library/jj127303(v=vs.85).aspx\",\"syntax\":\"<integer>\"},\"-ms-flex-positive\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-grow'>\"},\"-ms-flex-preferred-size\":{\"comment\":\"misssed old syntax implemented in IE; TODO: find references for comfirmation\",\"syntax\":\"<'flex-basis'>\"},\"-ms-interpolation-mode\":{\"comment\":\"https://msdn.microsoft.com/en-us/library/ff521095(v=vs.85).aspx\",\"syntax\":\"nearest-neighbor | bicubic\"},\"-ms-grid-column-align\":{\"comment\":\"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466338.aspx\",\"syntax\":\"start | end | center | stretch\"},\"-ms-grid-row-align\":{\"comment\":\"add this property first since it uses as fallback for flexbox, https://msdn.microsoft.com/en-us/library/windows/apps/hh466348.aspx\",\"syntax\":\"start | end | center | stretch\"},\"-webkit-appearance\":{\"comment\":\"webkit specific keywords\",\"references\":[\"http://css-infos.net/property/-webkit-appearance\"],\"syntax\":\"none | button | button-bevel | caps-lock-indicator | caret | checkbox | default-button | listbox | listitem | media-fullscreen-button | media-mute-button | media-play-button | media-seek-back-button | media-seek-forward-button | media-slider | media-sliderthumb | menulist | menulist-button | menulist-text | menulist-textfield | push-button | radio | scrollbarbutton-down | scrollbarbutton-left | scrollbarbutton-right | scrollbarbutton-up | scrollbargripper-horizontal | scrollbargripper-vertical | scrollbarthumb-horizontal | scrollbarthumb-vertical | scrollbartrack-horizontal | scrollbartrack-vertical | searchfield | searchfield-cancel-button | searchfield-decoration | searchfield-results-button | searchfield-results-decoration | slider-horizontal | slider-vertical | sliderthumb-horizontal | sliderthumb-vertical | square-button | textarea | textfield\"},\"-webkit-background-clip\":{\"comment\":\"https://developer.mozilla.org/en/docs/Web/CSS/background-clip\",\"syntax\":\"[ <box> | border | padding | content | text ]#\"},\"-webkit-column-break-after\":{\"comment\":\"added, http://help.dottoro.com/lcrthhhv.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-column-break-before\":{\"comment\":\"added, http://help.dottoro.com/lcxquvkf.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-column-break-inside\":{\"comment\":\"added, http://help.dottoro.com/lclhnthl.php\",\"syntax\":\"always | auto | avoid\"},\"-webkit-font-smoothing\":{\"comment\":\"https://developer.mozilla.org/en-US/docs/Web/CSS/font-smooth\",\"syntax\":\"auto | none | antialiased | subpixel-antialiased\"},\"-webkit-line-clamp\":{\"comment\":\"non-standard and deprecated but may still using by some sites\",\"syntax\":\"<positive-integer>\"},\"-webkit-mask-box-image\":{\"comment\":\"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image\",\"syntax\":\"[ <url> | <gradient> | none ] [ <length-percentage>{4} <-webkit-mask-box-repeat>{2} ]?\"},\"-webkit-mask-clip\":{\"comment\":\"change type to <-webkit-mask-clip-style> since it differ from <mask-clip>, extra space between [ and ,\",\"syntax\":\"<-webkit-mask-clip-style> [, <-webkit-mask-clip-style> ]*\"},\"-webkit-print-color-adjust\":{\"comment\":\"missed\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/-webkit-print-color-adjust\"],\"syntax\":\"economy | exact\"},\"-webkit-text-security\":{\"comment\":\"missed; http://help.dottoro.com/lcbkewgt.php\",\"syntax\":\"none | circle | disc | square\"},\"-webkit-user-drag\":{\"comment\":\"missed; http://help.dottoro.com/lcbixvwm.php\",\"syntax\":\"none | element | auto\"},\"-webkit-user-select\":{\"comment\":\"auto is supported by old webkit, https://developer.mozilla.org/en-US/docs/Web/CSS/user-select\",\"syntax\":\"auto | none | text | all\"},\"alignment-baseline\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#AlignmentBaselineProperty\"],\"syntax\":\"auto | baseline | before-edge | text-before-edge | middle | central | after-edge | text-after-edge | ideographic | alphabetic | hanging | mathematical\"},\"baseline-shift\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#BaselineShiftProperty\"],\"syntax\":\"baseline | sub | super | <svg-length>\"},\"behavior\":{\"comment\":\"added old IE property https://msdn.microsoft.com/en-us/library/ms530723(v=vs.85).aspx\",\"syntax\":\"<url>+\"},\"clip-rule\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/masking.html#ClipRuleProperty\"],\"syntax\":\"nonzero | evenodd\"},\"cue\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'cue-before'> <'cue-after'>?\"},\"cue-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<url> <decibel>? | none\"},\"cue-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<url> <decibel>? | none\"},\"cursor\":{\"comment\":\"added legacy keywords: hand, -webkit-grab. -webkit-grabbing, -webkit-zoom-in, -webkit-zoom-out, -moz-grab, -moz-grabbing, -moz-zoom-in, -moz-zoom-out\",\"refenrences\":[\"https://www.sitepoint.com/css3-cursor-styles/\"],\"syntax\":\"[ [ <url> [ <x> <y> ]? , ]* [ auto | default | none | context-menu | help | pointer | progress | wait | cell | crosshair | text | vertical-text | alias | copy | move | no-drop | not-allowed | e-resize | n-resize | ne-resize | nw-resize | s-resize | se-resize | sw-resize | w-resize | ew-resize | ns-resize | nesw-resize | nwse-resize | col-resize | row-resize | all-scroll | zoom-in | zoom-out | grab | grabbing | hand | -webkit-grab | -webkit-grabbing | -webkit-zoom-in | -webkit-zoom-out | -moz-grab | -moz-grabbing | -moz-zoom-in | -moz-zoom-out ] ]\"},\"display\":{\"comment\":\"extended with -ms-flexbox\",\"syntax\":\"none | inline | block | list-item | inline-list-item | inline-block | inline-table | table | table-cell | table-column | table-column-group | table-footer-group | table-header-group | table-row | table-row-group | flex | inline-flex | grid | inline-grid | run-in | ruby | ruby-base | ruby-text | ruby-base-container | ruby-text-container | contents | -ms-flexbox | -ms-inline-flexbox | -ms-grid | -ms-inline-grid | -webkit-flex | -webkit-inline-flex | -webkit-box | -webkit-inline-box | -moz-inline-stack | -moz-box | -moz-inline-box\"},\"position\":{\"comment\":\"extended with -webkit-sticky\",\"syntax\":\"static | relative | absolute | sticky | fixed | -webkit-sticky\"},\"dominant-baseline\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#DominantBaselineProperty\"],\"syntax\":\"auto | use-script | no-change | reset-size | ideographic | alphabetic | hanging | mathematical | central | middle | text-after-edge | text-before-edge\"},\"image-rendering\":{\"comment\":\"extended with <-non-standard-image-rendering>, added SVG keywords optimizeSpeed and optimizeQuality\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/image-rendering\",\"https://www.w3.org/TR/SVG/painting.html#ImageRenderingProperty\"],\"syntax\":\"auto | crisp-edges | pixelated | optimizeSpeed | optimizeQuality | <-non-standard-image-rendering>\"},\"fill\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"<paint>\"},\"fill-opacity\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"<number-zero-one>\"},\"fill-rule\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#FillProperty\"],\"syntax\":\"nonzero | evenodd\"},\"filter\":{\"comment\":\"extend with IE legacy syntaxes\",\"syntax\":\"none | <filter-function-list> | <-ms-filter>\"},\"font\":{\"comment\":\"extend with non-standard fonts\",\"syntax\":\"[ [ <'font-style'> || <font-variant-css21> || <'font-weight'> || <'font-stretch'> ]? <'font-size'> [ / <'line-height'> ]? <'font-family'> ] | caption | icon | menu | message-box | small-caption | status-bar | <-non-standard-font>\"},\"glyph-orientation-horizontal\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#GlyphOrientationHorizontalProperty\"],\"syntax\":\"<angle>\"},\"glyph-orientation-vertical\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#GlyphOrientationVerticalProperty\"],\"syntax\":\"<angle>\"},\"kerning\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#KerningProperty\"],\"syntax\":\"auto | <svg-length>\"},\"letter-spacing\":{\"comment\":\"fix syntax <length> -> <length-percentage>\",\"references\":[\"https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/letter-spacing\"],\"syntax\":\"normal | <length-percentage>\"},\"line-height-step\":{\"comment\":\"fix extra spaces around\",\"syntax\":\"none | <length>\"},\"marker\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-end\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-mid\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"marker-start\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#MarkerProperties\"],\"syntax\":\"none | <url>\"},\"max-width\":{\"comment\":\"extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/max-width\",\"syntax\":\"<length> | <percentage> | none | max-content | min-content | fit-content | fill-available | <-non-standard-width>\"},\"min-width\":{\"comment\":\"extend by non-standard width keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width\",\"syntax\":\"<length> | <percentage> | auto | max-content | min-content | fit-content | fill-available | <-non-standard-width>\"},\"opacity\":{\"comment\":\"strict to 0..1 <number> -> <number-zero-one>\",\"syntax\":\"<number-zero-one>\"},\"overflow\":{\"comment\":\"extend by vendor keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow\",\"syntax\":\"visible | hidden | scroll | auto | <-non-standard-overflow>\"},\"pause\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'pause-before'> <'pause-after'>?\"},\"pause-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"pause-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"rest\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<'rest-before'> <'rest-after'>?\"},\"rest-after\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"rest-before\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<time> | none | x-weak | weak | medium | strong | x-strong\"},\"shape-rendering\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#ShapeRenderingPropert\"],\"syntax\":\"auto | optimizeSpeed | crispEdges | geometricPrecision\"},\"src\":{\"comment\":\"added @font-face's src property https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/src\",\"syntax\":\"[ <url> [ format( <string># ) ]? | local( <family-name> ) ]#\"},\"speak\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"auto | none | normal\"},\"speak-as\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"normal | spell-out || digits || [ literal-punctuation | no-punctuation ]\"},\"stroke\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<paint>\"},\"stroke-dasharray\":{\"comment\":\"added SVG property; a list of comma and/or white space separated <length>s and <percentage>s\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"none | [ <svg-length>+ ]#\"},\"stroke-dashoffset\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<svg-length>\"},\"stroke-linecap\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"butt | round | square\"},\"stroke-linejoin\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"miter | round | bevel\"},\"stroke-miterlimit\":{\"comment\":\"added SVG property (<miterlimit> = <number-one-or-greater>) \",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<number-one-or-greater>\"},\"stroke-opacity\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<number-zero-one>\"},\"stroke-width\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/painting.html#StrokeProperties\"],\"syntax\":\"<svg-length>\"},\"text-anchor\":{\"comment\":\"added SVG property\",\"references\":[\"https://www.w3.org/TR/SVG/text.html#TextAlignmentProperties\"],\"syntax\":\"start | middle | end\"},\"transform-origin\":{\"comment\":\"move first group to the end since less collecting\",\"syntax\":\"[ [ <length-percentage> | left | center | right ] && [ <length-percentage> | top | center | bottom ] ] <length>? | [ <length-percentage> | left | center | right | top | bottom ]\"},\"unicode-bidi\":{\"comment\":\"added prefixed keywords https://developer.mozilla.org/en-US/docs/Web/CSS/unicode-bidi\",\"syntax\":\"normal | embed | isolate | bidi-override | isolate-override | plaintext | -moz-isolate | -moz-isolate-override | -moz-plaintext | -webkit-isolate\"},\"unicode-range\":{\"comment\":\"added missed property https://developer.mozilla.org/en-US/docs/Web/CSS/%40font-face/unicode-range\",\"syntax\":\"<unicode-range>#\"},\"voice-balance\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<number> | left | center | right | leftwards | rightwards\"},\"voice-duration\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"auto | <time>\"},\"voice-family\":{\"comment\":\"<name> -> <family-name>, https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"[ [ <family-name> | <generic-voice> ] , ]* [ <family-name> | <generic-voice> ] | preserve\"},\"voice-pitch\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]\"},\"voice-range\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"<frequency> && absolute | [ [ x-low | low | medium | high | x-high ] || [ <frequency> | <semitones> | <percentage> ] ]\"},\"voice-rate\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"[ normal | x-slow | slow | medium | fast | x-fast ] || <percentage>\"},\"voice-stress\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"normal | strong | moderate | none | reduced\"},\"voice-volume\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#property-index\",\"syntax\":\"silent | [ [ x-soft | soft | medium | loud | x-loud ] || <decibel> ]\"},\"word-break\":{\"comment\":\"extend with non-standard keywords\",\"syntax\":\"normal | break-all | keep-all | <-non-standard-word-break>\"},\"writing-mode\":{\"comment\":\"extend with SVG keywords\",\"syntax\":\"horizontal-tb | vertical-rl | vertical-lr | sideways-rl | sideways-lr | <svg-writing-mode>\"}},\"syntaxes\":{\"-legacy-gradient\":{\"comment\":\"added collection of legacy gradient syntaxes\",\"syntax\":\"<-webkit-gradient()> | <-legacy-linear-gradient> | <-legacy-repeating-linear-gradient> | <-legacy-radial-gradient> | <-legacy-repeating-radial-gradient>\"},\"-legacy-linear-gradient\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"-moz-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-linear-gradient( <-legacy-linear-gradient-arguments> )\"},\"-legacy-repeating-linear-gradient\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> ) | -o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )\"},\"-legacy-linear-gradient-arguments\":{\"comment\":\"like standard syntax but w/o `to` keyword https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient\",\"syntax\":\"[ <angle> | <side-or-corner> ]? , <color-stop-list>\"},\"-legacy-radial-gradient\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"-moz-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-radial-gradient( <-legacy-radial-gradient-arguments> )\"},\"-legacy-repeating-radial-gradient\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> ) | -o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )\"},\"-legacy-radial-gradient-arguments\":{\"comment\":\"deprecated syntax that implemented by some browsers https://www.w3.org/TR/2011/WD-css3-images-20110908/#radial-gradients\",\"syntax\":\"[ <position> , ]? [ [ [ <-legacy-radial-gradient-shape> || <-legacy-radial-gradient-size> ] | [ <length> | <percentage> ]{2} ] , ]? <color-stop-list>\"},\"-legacy-radial-gradient-size\":{\"comment\":\"before a standard it contains 2 extra keywords (`contain` and `cover`) https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltsize\",\"syntax\":\"closest-side | closest-corner | farthest-side | farthest-corner | contain | cover\"},\"-legacy-radial-gradient-shape\":{\"comment\":\"define to duoble sure it doesn't extends in future https://www.w3.org/TR/2011/WD-css3-images-20110908/#ltshape\",\"syntax\":\"circle | ellipse\"},\"-non-standard-font\":{\"comment\":\"non standard fonts\",\"preferences\":[\"https://webkit.org/blog/3709/using-the-system-font-in-web-content/\"],\"syntax\":\"-apple-system-body | -apple-system-headline | -apple-system-subheadline | -apple-system-caption1 | -apple-system-caption2 | -apple-system-footnote | -apple-system-short-body | -apple-system-short-headline | -apple-system-short-subheadline | -apple-system-short-caption1 | -apple-system-short-footnote | -apple-system-tall-body\"},\"-non-standard-color\":{\"comment\":\"non standard colors\",\"references\":[\"http://cssdot.ru/%D0%A1%D0%BF%D1%80%D0%B0%D0%B2%D0%BE%D1%87%D0%BD%D0%B8%D0%BA_CSS/color-i305.html\",\"https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#Mozilla_Color_Preference_Extensions\"],\"syntax\":\"-moz-ButtonDefault | -moz-ButtonHoverFace | -moz-ButtonHoverText | -moz-CellHighlight | -moz-CellHighlightText | -moz-Combobox | -moz-ComboboxText | -moz-Dialog | -moz-DialogText | -moz-dragtargetzone | -moz-EvenTreeRow | -moz-Field | -moz-FieldText | -moz-html-CellHighlight | -moz-html-CellHighlightText | -moz-mac-accentdarkestshadow | -moz-mac-accentdarkshadow | -moz-mac-accentface | -moz-mac-accentlightesthighlight | -moz-mac-accentlightshadow | -moz-mac-accentregularhighlight | -moz-mac-accentregularshadow | -moz-mac-chrome-active | -moz-mac-chrome-inactive | -moz-mac-focusring | -moz-mac-menuselect | -moz-mac-menushadow | -moz-mac-menutextselect | -moz-MenuHover | -moz-MenuHoverText | -moz-MenuBarText | -moz-MenuBarHoverText | -moz-nativehyperlinktext | -moz-OddTreeRow | -moz-win-communicationstext | -moz-win-mediatext | -moz-activehyperlinktext | -moz-default-background-color | -moz-default-color | -moz-hyperlinktext | -moz-visitedhyperlinktext | -webkit-activelink | -webkit-focus-ring-color | -webkit-link | -webkit-text\"},\"-non-standard-image-rendering\":{\"comment\":\"non-standard keywords http://phrogz.net/tmp/canvas_image_zoom.html\",\"syntax\":\"optimize-contrast | -moz-crisp-edges | -o-crisp-edges | -webkit-optimize-contrast\"},\"-non-standard-overflow\":{\"comment\":\"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/overflow\",\"syntax\":\"-moz-scrollbars-none | -moz-scrollbars-horizontal | -moz-scrollbars-vertical | -moz-hidden-unscrollable\"},\"-non-standard-width\":{\"comment\":\"non-standard keywords https://developer.mozilla.org/en-US/docs/Web/CSS/width\",\"syntax\":\"min-intrinsic | intrinsic | -moz-min-content | -moz-max-content | -webkit-min-content | -webkit-max-content\"},\"-non-standard-word-break\":{\"comment\":\"non-standard keywords https://css-tricks.com/almanac/properties/w/word-break/\",\"syntax\":\"break-word\"},\"-webkit-gradient()\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/ - TODO: simplify when after match algorithm improvement ( [, point, radius | , point] -> [, radius]? , point )\",\"syntax\":\"-webkit-gradient( <-webkit-gradient-type>, <-webkit-gradient-point> [, <-webkit-gradient-point> | , <-webkit-gradient-radius>, <-webkit-gradient-point> ] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )\"},\"-webkit-gradient-color-stop\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"from( <color> ) | color-stop( [ <number-zero-one> | <percentage> ] , <color> ) | to( <color> )\"},\"-webkit-gradient-point\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"[ left | center | right | <length-percentage> ] [ top | center | bottom | <length-percentage> ]\"},\"-webkit-gradient-radius\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"<length> | <percentage>\"},\"-webkit-gradient-type\":{\"comment\":\"first Apple proposal gradient syntax https://webkit.org/blog/175/introducing-css-gradients/\",\"syntax\":\"linear | radial\"},\"-webkit-mask-box-repeat\":{\"comment\":\"missed; https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-mask-box-image\",\"syntax\":\"repeat | stretch | round\"},\"-webkit-mask-clip-style\":{\"comment\":\"missed; there is no enough information about `-webkit-mask-clip` property, but looks like all those keywords are working\",\"syntax\":\"border | border-box | padding | padding-box | content | content-box | text\"},\"-ms-filter\":{\"syntax\":\"[ <progid> | FlipH | FlipV ]+\"},\"age\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"child | young | old\"},\"attr()\":{\"comment\":\"drop it since it's a generic\",\"syntax\":null},\"border-radius\":{\"comment\":\"missed, https://drafts.csswg.org/css-backgrounds-3/#the-border-radius\",\"syntax\":\"<length-percentage>{1,2}\"},\"bottom\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"content-list\":{\"comment\":\"missed -> https://drafts.csswg.org/css-content/#typedef-content-list (document-url, <target> and leader() is omitted util stabilization)\",\"syntax\":\"[ <string> | contents | <url> | <quote> | <attr()> | counter( <ident>, <'list-style-type'>? ) ]+\"},\"inset()\":{\"comment\":\"changed <border-radius> to <'border-radius'>\",\"syntax\":\"inset( <length-percentage>{1,4} [ round <'border-radius'> ]? )\"},\"generic-voice\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"[ <age>? <gender> <integer>? ]\"},\"gender\":{\"comment\":\"https://www.w3.org/TR/css3-speech/#voice-family\",\"syntax\":\"male | female | neutral\"},\"generic-family\":{\"comment\":\"added -apple-system\",\"references\":[\"https://webkit.org/blog/3709/using-the-system-font-in-web-content/\"],\"syntax\":\"serif | sans-serif | cursive | fantasy | monospace | -apple-system\"},\"gradient\":{\"comment\":\"added -webkit-gradient() since may to be used for legacy support\",\"syntax\":\"<-legacy-gradient> | <linear-gradient()> | <repeating-linear-gradient()> | <radial-gradient()> | <repeating-radial-gradient()>\"},\"left\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"mask-image\":{\"comment\":\"missed; https://drafts.fxtf.org/css-masking-1/#the-mask-image\",\"syntax\":\"<mask-reference>#\"},\"matrix()\":{\"comment\":\"redundant max\",\"syntax\":\"matrix( <number> [, <number> ]{5} )\"},\"matrix3d()\":{\"comment\":\"redundant max\",\"syntax\":\"matrix3d( <number> [, <number> ]{15} )\"},\"name-repeat\":{\"comment\":\"missed, and looks like obsolete, keep it as is since other property syntaxes should be changed too; https://www.w3.org/TR/2015/WD-css-grid-1-20150917/#typedef-name-repeat\",\"syntax\":\"repeat( [ <positive-integer> | auto-fill ], <line-names>+)\"},\"named-color\":{\"comment\":\"replaced <ident> to list of colors according to https://www.w3.org/TR/css-color-4/#named-colors\",\"syntax\":\"transparent | aliceblue | antiquewhite | aqua | aquamarine | azure | beige | bisque | black | blanchedalmond | blue | blueviolet | brown | burlywood | cadetblue | chartreuse | chocolate | coral | cornflowerblue | cornsilk | crimson | cyan | darkblue | darkcyan | darkgoldenrod | darkgray | darkgreen | darkgrey | darkkhaki | darkmagenta | darkolivegreen | darkorange | darkorchid | darkred | darksalmon | darkseagreen | darkslateblue | darkslategray | darkslategrey | darkturquoise | darkviolet | deeppink | deepskyblue | dimgray | dimgrey | dodgerblue | firebrick | floralwhite | forestgreen | fuchsia | gainsboro | ghostwhite | gold | goldenrod | gray | green | greenyellow | grey | honeydew | hotpink | indianred | indigo | ivory | khaki | lavender | lavenderblush | lawngreen | lemonchiffon | lightblue | lightcoral | lightcyan | lightgoldenrodyellow | lightgray | lightgreen | lightgrey | lightpink | lightsalmon | lightseagreen | lightskyblue | lightslategray | lightslategrey | lightsteelblue | lightyellow | lime | limegreen | linen | magenta | maroon | mediumaquamarine | mediumblue | mediumorchid | mediumpurple | mediumseagreen | mediumslateblue | mediumspringgreen | mediumturquoise | mediumvioletred | midnightblue | mintcream | mistyrose | moccasin | navajowhite | navy | oldlace | olive | olivedrab | orange | orangered | orchid | palegoldenrod | palegreen | paleturquoise | palevioletred | papayawhip | peachpuff | peru | pink | plum | powderblue | purple | rebeccapurple | red | rosybrown | royalblue | saddlebrown | salmon | sandybrown | seagreen | seashell | sienna | silver | skyblue | slateblue | slategray | slategrey | snow | springgreen | steelblue | tan | teal | thistle | tomato | turquoise | violet | wheat | white | whitesmoke | yellow | yellowgreen | <-non-standard-color>\"},\"outline-radius\":{\"comment\":\"missed, looks like it's a similar to <border-radius> https://developer.mozilla.org/en/docs/Web/CSS/-moz-outline-radius\",\"syntax\":\"<border-radius>\"},\"paint\":{\"comment\":\"simplified SVG syntax (omit <icccolor>, replace <funciri> for <url>) https://www.w3.org/TR/SVG/painting.html#SpecifyingPaint\",\"syntax\":\"none | currentColor | <color> | <url> [ none | currentColor | <color> ]?\"},\"path()\":{\"comment\":\"missed, `motion` property was renamed, but left it as is for now; path() syntax was get from last draft https://drafts.fxtf.org/motion-1/#funcdef-offset-path-path\",\"syntax\":\"path( <string> )\"},\"right\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"shape\":{\"comment\":\"missed spaces in function body and add backwards compatible syntax\",\"syntax\":\"rect( [ [ <top>, <right>, <bottom>, <left> ] | [ <top> <right> <bottom> <left> ] ] )\"},\"single-transition\":{\"comment\":\"moved <single-transition-timing-function> in the beginning to avoid wrong match to <single-transition-property>\",\"syntax\":\"<single-transition-timing-function> || [ none | <single-transition-property> ] || <time> || <time>\"},\"svg-length\":{\"comment\":\"All coordinates and lengths in SVG can be specified with or without a unit identifier\",\"references\":[\"https://www.w3.org/TR/SVG11/coords.html#Units\"],\"syntax\":\"<percentage> | <length> | <number>\"},\"svg-writing-mode\":{\"comment\":\"SVG specific keywords (deprecated for CSS)\",\"references\":[\"https://developer.mozilla.org/en/docs/Web/CSS/writing-mode\",\"https://www.w3.org/TR/SVG/text.html#WritingModeProperty\"],\"syntax\":\"lr-tb | rl-tb | tb-rl | lr | rl | tb\"},\"top\":{\"comment\":\"missed; not sure we should add it, but no others except `shape` is using it so it's ok for now; https://drafts.fxtf.org/css-masking-1/#funcdef-clip-rect\",\"syntax\":\"<length> | auto\"},\"x\":{\"comment\":\"missed; not sure we should add it, but no others except `cursor` is using it so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor\",\"syntax\":\"<number>\"},\"y\":{\"comment\":\"missed; not sure we should add it, but no others except `cursor` is using so it's ok for now; https://drafts.csswg.org/css-ui-3/#cursor\",\"syntax\":\"<number>\"},\"var()\":{\"comment\":\"drop it since it's a generic (also syntax is incorrect and can't be parsed)\",\"syntax\":null},\"an-plus-b\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"feature-type\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"feature-value-block\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"feature-value-declaration\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"feature-value-block-list\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"feature-value-declaration-list\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"general-enclosed\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"keyframe-block\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"keyframe-block-list\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"mf-plain\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"mf-range\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"mf-value\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-and\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-condition\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-not\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-or\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-in-parens\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-feature\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-condition-without-or\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-query\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"media-query-list\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"nth\":{\"comment\":\"syntax has <an-plus-b> that doesn't support currently, drop for now\",\"syntax\":null},\"page-selector\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"page-selector-list\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"page-body\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"page-margin-box\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"page-margin-box-type\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null},\"pseudo-page\":{\"comment\":\"syntax is incorrect and can't be parsed, drop for now\",\"syntax\":null}}}");

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    AnPlusB: __webpack_require__(54),
    Atrule: __webpack_require__(55),
    AtrulePrelude: __webpack_require__(56),
    AttributeSelector: __webpack_require__(57),
    Block: __webpack_require__(58),
    Brackets: __webpack_require__(59),
    CDC: __webpack_require__(60),
    CDO: __webpack_require__(61),
    ClassSelector: __webpack_require__(62),
    Combinator: __webpack_require__(63),
    Comment: __webpack_require__(64),
    Declaration: __webpack_require__(65),
    DeclarationList: __webpack_require__(66),
    Dimension: __webpack_require__(67),
    Function: __webpack_require__(68),
    HexColor: __webpack_require__(69),
    Identifier: __webpack_require__(70),
    IdSelector: __webpack_require__(71),
    MediaFeature: __webpack_require__(72),
    MediaQuery: __webpack_require__(73),
    MediaQueryList: __webpack_require__(74),
    Nth: __webpack_require__(75),
    Number: __webpack_require__(76),
    Operator: __webpack_require__(77),
    Parentheses: __webpack_require__(78),
    Percentage: __webpack_require__(79),
    PseudoClassSelector: __webpack_require__(80),
    PseudoElementSelector: __webpack_require__(81),
    Ratio: __webpack_require__(82),
    Raw: __webpack_require__(83),
    Rule: __webpack_require__(84),
    Selector: __webpack_require__(85),
    SelectorList: __webpack_require__(86),
    String: __webpack_require__(87),
    StyleSheet: __webpack_require__(88),
    TypeSelector: __webpack_require__(89),
    UnicodeRange: __webpack_require__(90),
    Url: __webpack_require__(91),
    Value: __webpack_require__(92),
    WhiteSpace: __webpack_require__(93)
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var cmpChar = __webpack_require__(7).cmpChar;
var isNumber = __webpack_require__(7).isNumber;
var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var NUMBER = TYPE.Number;
var PLUSSIGN = TYPE.PlusSign;
var HYPHENMINUS = TYPE.HyphenMinus;
var N = 110; // 'n'.charCodeAt(0)
var DISALLOW_SIGN = true;
var ALLOW_SIGN = false;

function checkTokenIsInteger(scanner, disallowSign) {
    var pos = scanner.tokenStart;

    if (scanner.source.charCodeAt(pos) === PLUSSIGN ||
        scanner.source.charCodeAt(pos) === HYPHENMINUS) {
        if (disallowSign) {
            scanner.error();
        }
        pos++;
    }

    for (; pos < scanner.tokenEnd; pos++) {
        if (!isNumber(scanner.source.charCodeAt(pos))) {
            scanner.error('Unexpected input', pos);
        }
    }
}

// An+B microsyntax https://www.w3.org/TR/css-syntax-3/#anb
module.exports = {
    name: 'AnPlusB',
    structure: {
        a: [String, null],
        b: [String, null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var end = start;
        var prefix = '';
        var a = null;
        var b = null;

        if (this.scanner.tokenType === NUMBER ||
            this.scanner.tokenType === PLUSSIGN) {
            checkTokenIsInteger(this.scanner, ALLOW_SIGN);
            prefix = this.scanner.getTokenValue();
            this.scanner.next();
            end = this.scanner.tokenStart;
        }

        if (this.scanner.tokenType === IDENTIFIER) {
            var bStart = this.scanner.tokenStart;

            if (cmpChar(this.scanner.source, bStart, HYPHENMINUS)) {
                if (prefix === '') {
                    prefix = '-';
                    bStart++;
                } else {
                    this.scanner.error('Unexpected hyphen minus');
                }
            }

            if (!cmpChar(this.scanner.source, bStart, N)) {
                this.scanner.error();
            }

            a = prefix === ''  ? '1'  :
                prefix === '+' ? '+1' :
                prefix === '-' ? '-1' :
                prefix;

            var len = this.scanner.tokenEnd - bStart;
            if (len > 1) {
                // ..n-..
                if (this.scanner.source.charCodeAt(bStart + 1) !== HYPHENMINUS) {
                    this.scanner.error('Unexpected input', bStart + 1);
                }

                if (len > 2) {
                    // ..n-{number}..
                    this.scanner.tokenStart = bStart + 2;
                } else {
                    // ..n- {number}
                    this.scanner.next();
                    this.scanner.skipSC();
                }

                checkTokenIsInteger(this.scanner, DISALLOW_SIGN);
                b = '-' + this.scanner.getTokenValue();
                this.scanner.next();
                end = this.scanner.tokenStart;
            } else {
                prefix = '';
                this.scanner.next();
                end = this.scanner.tokenStart;
                this.scanner.skipSC();

                if (this.scanner.tokenType === HYPHENMINUS ||
                    this.scanner.tokenType === PLUSSIGN) {
                    prefix = this.scanner.getTokenValue();
                    this.scanner.next();
                    this.scanner.skipSC();
                }

                if (this.scanner.tokenType === NUMBER) {
                    checkTokenIsInteger(this.scanner, prefix !== '');

                    if (!isNumber(this.scanner.source.charCodeAt(this.scanner.tokenStart))) {
                        prefix = this.scanner.source.charAt(this.scanner.tokenStart);
                        this.scanner.tokenStart++;
                    }

                    if (prefix === '') {
                        // should be an operator before number
                        this.scanner.error();
                    } else if (prefix === '+') {
                        // plus is using by default
                        prefix = '';
                    }

                    b = prefix + this.scanner.getTokenValue();

                    this.scanner.next();
                    end = this.scanner.tokenStart;
                } else {
                    if (prefix) {
                        this.scanner.eat(NUMBER);
                    }
                }
            }
        } else {
            if (prefix === '' || prefix === '+') { // no number
                this.scanner.error(
                    'Number or identifier is expected',
                    this.scanner.tokenStart + (
                        this.scanner.tokenType === PLUSSIGN ||
                        this.scanner.tokenType === HYPHENMINUS
                    )
                );
            }

            b = prefix;
        }

        return {
            type: 'AnPlusB',
            loc: this.getLocation(start, end),
            a: a,
            b: b
        };
    },
    generate: function(node) {
        var a = node.a !== null && node.a !== undefined;
        var b = node.b !== null && node.b !== undefined;

        if (a) {
            this.chunk(
                node.a === '+1' ? '+n' :
                node.a ===  '1' ?  'n' :
                node.a === '-1' ? '-n' :
                node.a + 'n'
            );

            if (b) {
                b = String(node.b);
                if (b.charAt(0) === '-' || b.charAt(0) === '+') {
                    this.chunk(b.charAt(0));
                    this.chunk(b.substr(1));
                } else {
                    this.chunk('+');
                    this.chunk(b);
                }
            }
        } else {
            this.chunk(String(node.b));
        }
    }
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var ATKEYWORD = TYPE.AtKeyword;
var SEMICOLON = TYPE.Semicolon;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;
var RIGHTCURLYBRACKET = TYPE.RightCurlyBracket;

function consumeRaw(startToken) {
    return this.Raw(startToken, SEMICOLON, LEFTCURLYBRACKET, false, true);
}

function isDeclarationBlockAtrule() {
    for (var offset = 1, type; type = this.scanner.lookupType(offset); offset++) {
        if (type === RIGHTCURLYBRACKET) {
            return true;
        }

        if (type === LEFTCURLYBRACKET ||
            type === ATKEYWORD) {
            return false;
        }
    }

    return false;
}

module.exports = {
    name: 'Atrule',
    structure: {
        name: String,
        prelude: ['AtrulePrelude', 'Raw', null],
        block: ['Block', null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var name;
        var nameLowerCase;
        var prelude = null;
        var block = null;

        this.scanner.eat(ATKEYWORD);

        name = this.scanner.substrToCursor(start + 1);
        nameLowerCase = name.toLowerCase();
        this.scanner.skipSC();

        // parse prelude
        if (this.scanner.eof === false &&
            this.scanner.tokenType !== LEFTCURLYBRACKET &&
            this.scanner.tokenType !== SEMICOLON) {
            if (this.parseAtrulePrelude) {
                prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name), consumeRaw);

                // turn empty AtrulePrelude into null
                if (prelude.type === 'AtrulePrelude' && prelude.children.head === null) {
                    prelude = null;
                }
            } else {
                prelude = consumeRaw.call(this, this.scanner.currentToken);
            }

            this.scanner.skipSC();
        }

        switch (this.scanner.tokenType) {
            case SEMICOLON:
                this.scanner.next();
                break;

            case LEFTCURLYBRACKET:
                if (this.atrule.hasOwnProperty(nameLowerCase) &&
                    typeof this.atrule[nameLowerCase].block === 'function') {
                    block = this.atrule[nameLowerCase].block.call(this);
                } else {
                    // TODO: should consume block content as Raw?
                    block = this.Block(isDeclarationBlockAtrule.call(this));
                }

                break;
        }

        return {
            type: 'Atrule',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            prelude: prelude,
            block: block
        };
    },
    generate: function(node) {
        this.chunk('@');
        this.chunk(node.name);

        if (node.prelude !== null) {
            this.chunk(' ');
            this.node(node.prelude);
        }

        if (node.block) {
            this.node(node.block);
        } else {
            this.chunk(';');
        }
    },
    walkContext: 'atrule'
};


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var SEMICOLON = TYPE.Semicolon;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;

module.exports = {
    name: 'AtrulePrelude',
    structure: {
        children: [[]]
    },
    parse: function(name) {
        var children = null;

        if (name !== null) {
            name = name.toLowerCase();
        }

        this.scanner.skipSC();

        if (this.atrule.hasOwnProperty(name) &&
            typeof this.atrule[name].prelude === 'function') {
            // custom consumer
            children = this.atrule[name].prelude.call(this);
        } else {
            // default consumer
            children = this.readSequence(this.scope.AtrulePrelude);
        }

        this.scanner.skipSC();

        if (this.scanner.eof !== true &&
            this.scanner.tokenType !== LEFTCURLYBRACKET &&
            this.scanner.tokenType !== SEMICOLON) {
            this.scanner.error('Semicolon or block is expected');
        }

        if (children === null) {
            children = this.createList();
        }

        return {
            type: 'AtrulePrelude',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    },
    walkContext: 'atrulePrelude'
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var STRING = TYPE.String;
var DOLLARSIGN = TYPE.DollarSign;
var ASTERISK = TYPE.Asterisk;
var COLON = TYPE.Colon;
var EQUALSSIGN = TYPE.EqualsSign;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var RIGHTSQUAREBRACKET = TYPE.RightSquareBracket;
var CIRCUMFLEXACCENT = TYPE.CircumflexAccent;
var VERTICALLINE = TYPE.VerticalLine;
var TILDE = TYPE.Tilde;

function getAttributeName() {
    if (this.scanner.eof) {
        this.scanner.error('Unexpected end of input');
    }

    var start = this.scanner.tokenStart;
    var expectIdentifier = false;
    var checkColon = true;

    if (this.scanner.tokenType === ASTERISK) {
        expectIdentifier = true;
        checkColon = false;
        this.scanner.next();
    } else if (this.scanner.tokenType !== VERTICALLINE) {
        this.scanner.eat(IDENTIFIER);
    }

    if (this.scanner.tokenType === VERTICALLINE) {
        if (this.scanner.lookupType(1) !== EQUALSSIGN) {
            this.scanner.next();
            this.scanner.eat(IDENTIFIER);
        } else if (expectIdentifier) {
            this.scanner.error('Identifier is expected', this.scanner.tokenEnd);
        }
    } else if (expectIdentifier) {
        this.scanner.error('Vertical line is expected');
    }

    if (checkColon && this.scanner.tokenType === COLON) {
        this.scanner.next();
        this.scanner.eat(IDENTIFIER);
    }

    return {
        type: 'Identifier',
        loc: this.getLocation(start, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(start)
    };
}

function getOperator() {
    var start = this.scanner.tokenStart;
    var tokenType = this.scanner.tokenType;

    if (tokenType !== EQUALSSIGN &&        // =
        tokenType !== TILDE &&             // ~=
        tokenType !== CIRCUMFLEXACCENT &&  // ^=
        tokenType !== DOLLARSIGN &&        // $=
        tokenType !== ASTERISK &&          // *=
        tokenType !== VERTICALLINE         // |=
    ) {
        this.scanner.error('Attribute selector (=, ~=, ^=, $=, *=, |=) is expected');
    }

    if (tokenType === EQUALSSIGN) {
        this.scanner.next();
    } else {
        this.scanner.next();
        this.scanner.eat(EQUALSSIGN);
    }

    return this.scanner.substrToCursor(start);
}

// '[' S* attrib_name ']'
// '[' S* attrib_name S* attrib_matcher S* [ IDENT | STRING ] S* attrib_flags? S* ']'
module.exports = {
    name: 'AttributeSelector',
    structure: {
        name: 'Identifier',
        matcher: [String, null],
        value: ['String', 'Identifier', null],
        flags: [String, null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var name;
        var matcher = null;
        var value = null;
        var flags = null;

        this.scanner.eat(LEFTSQUAREBRACKET);
        this.scanner.skipSC();

        name = getAttributeName.call(this);
        this.scanner.skipSC();

        if (this.scanner.tokenType !== RIGHTSQUAREBRACKET) {
            // avoid case `[name i]`
            if (this.scanner.tokenType !== IDENTIFIER) {
                matcher = getOperator.call(this);

                this.scanner.skipSC();

                value = this.scanner.tokenType === STRING
                    ? this.String()
                    : this.Identifier();

                this.scanner.skipSC();
            }

            // attribute flags
            if (this.scanner.tokenType === IDENTIFIER) {
                flags = this.scanner.getTokenValue();
                this.scanner.next();

                this.scanner.skipSC();
            }
        }

        this.scanner.eat(RIGHTSQUAREBRACKET);

        return {
            type: 'AttributeSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            matcher: matcher,
            value: value,
            flags: flags
        };
    },
    generate: function(node) {
        var flagsPrefix = ' ';

        this.chunk('[');
        this.node(node.name);

        if (node.matcher !== null) {
            this.chunk(node.matcher);

            if (node.value !== null) {
                this.node(node.value);

                // space between string and flags is not required
                if (node.value.type === 'String') {
                    flagsPrefix = '';
                }
            }
        }

        if (node.flags !== null) {
            this.chunk(flagsPrefix);
            this.chunk(node.flags);
        }

        this.chunk(']');
    }
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var SEMICOLON = TYPE.Semicolon;
var ATKEYWORD = TYPE.AtKeyword;
var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;
var RIGHTCURLYBRACKET = TYPE.RightCurlyBracket;

function consumeRaw(startToken) {
    return this.Raw(startToken, 0, 0, false, true);
}
function consumeRule() {
    return this.parseWithFallback(this.Rule, consumeRaw);
}
function consumeRawDeclaration(startToken) {
    return this.Raw(startToken, 0, SEMICOLON, true, true);
}
function consumeDeclaration() {
    if (this.scanner.tokenType === SEMICOLON) {
        return consumeRawDeclaration.call(this, this.scanner.currentToken);
    }

    var node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);

    if (this.scanner.tokenType === SEMICOLON) {
        this.scanner.next();
    }

    return node;
}

module.exports = {
    name: 'Block',
    structure: {
        children: [[
            'Atrule',
            'Rule',
            'Declaration'
        ]]
    },
    parse: function(isDeclaration) {
        var consumer = isDeclaration ? consumeDeclaration : consumeRule;

        var start = this.scanner.tokenStart;
        var children = this.createList();

        this.scanner.eat(LEFTCURLYBRACKET);

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case RIGHTCURLYBRACKET:
                    break scan;

                case WHITESPACE:
                case COMMENT:
                    this.scanner.next();
                    break;

                case ATKEYWORD:
                    children.push(this.parseWithFallback(this.Atrule, consumeRaw));
                    break;

                default:
                    children.push(consumer.call(this));
            }
        }

        if (!this.scanner.eof) {
            this.scanner.eat(RIGHTCURLYBRACKET);
        }

        return {
            type: 'Block',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.chunk('{');
        this.children(node, function(prev) {
            if (prev.type === 'Declaration') {
                this.chunk(';');
            }
        });
        this.chunk('}');
    },
    walkContext: 'block'
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var RIGHTSQUAREBRACKET = TYPE.RightSquareBracket;

module.exports = {
    name: 'Brackets',
    structure: {
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var children = null;

        this.scanner.eat(LEFTSQUAREBRACKET);

        children = readSequence.call(this, recognizer);

        if (!this.scanner.eof) {
            this.scanner.eat(RIGHTSQUAREBRACKET);
        }

        return {
            type: 'Brackets',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.chunk('[');
        this.children(node);
        this.chunk(']');
    }
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var CDC = __webpack_require__(7).TYPE.CDC;

module.exports = {
    name: 'CDC',
    structure: [],
    parse: function() {
        var start = this.scanner.tokenStart;

        this.scanner.eat(CDC); // -->

        return {
            type: 'CDC',
            loc: this.getLocation(start, this.scanner.tokenStart)
        };
    },
    generate: function() {
        this.chunk('-->');
    }
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

var CDO = __webpack_require__(7).TYPE.CDO;

module.exports = {
    name: 'CDO',
    structure: [],
    parse: function() {
        var start = this.scanner.tokenStart;

        this.scanner.eat(CDO); // <!--

        return {
            type: 'CDO',
            loc: this.getLocation(start, this.scanner.tokenStart)
        };
    },
    generate: function() {
        this.chunk('<!--');
    }
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;
var IDENTIFIER = TYPE.Identifier;
var FULLSTOP = TYPE.FullStop;

// '.' ident
module.exports = {
    name: 'ClassSelector',
    structure: {
        name: String
    },
    parse: function() {
        this.scanner.eat(FULLSTOP);

        return {
            type: 'ClassSelector',
            loc: this.getLocation(this.scanner.tokenStart - 1, this.scanner.tokenEnd),
            name: this.scanner.consume(IDENTIFIER)
        };
    },
    generate: function(node) {
        this.chunk('.');
        this.chunk(node.name);
    }
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var PLUSSIGN = TYPE.PlusSign;
var SOLIDUS = TYPE.Solidus;
var GREATERTHANSIGN = TYPE.GreaterThanSign;
var TILDE = TYPE.Tilde;

// + | > | ~ | /deep/
module.exports = {
    name: 'Combinator',
    structure: {
        name: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        switch (this.scanner.tokenType) {
            case GREATERTHANSIGN:
            case PLUSSIGN:
            case TILDE:
                this.scanner.next();
                break;

            case SOLIDUS:
                this.scanner.next();
                this.scanner.expectIdentifier('deep');
                this.scanner.eat(SOLIDUS);
                break;

            default:
                this.scanner.error('Combinator is expected');
        }

        return {
            type: 'Combinator',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.name);
    }
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var ASTERISK = TYPE.Asterisk;
var SOLIDUS = TYPE.Solidus;

// '/*' .* '*/'
module.exports = {
    name: 'Comment',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var end = this.scanner.tokenEnd;

        if ((end - start + 2) >= 2 &&
            this.scanner.source.charCodeAt(end - 2) === ASTERISK &&
            this.scanner.source.charCodeAt(end - 1) === SOLIDUS) {
            end -= 2;
        }

        this.scanner.next();

        return {
            type: 'Comment',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.source.substring(start + 2, end)
        };
    },
    generate: function(node) {
        this.chunk('/*');
        this.chunk(node.value);
        this.chunk('*/');
    }
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var isCustomProperty = __webpack_require__(16).isCustomProperty;
var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var COLON = TYPE.Colon;
var EXCLAMATIONMARK = TYPE.ExclamationMark;
var SOLIDUS = TYPE.Solidus;
var ASTERISK = TYPE.Asterisk;
var DOLLARSIGN = TYPE.DollarSign;
var HYPHENMINUS = TYPE.HyphenMinus;
var SEMICOLON = TYPE.Semicolon;
var PLUSSIGN = TYPE.PlusSign;
var NUMBERSIGN = TYPE.NumberSign;

function consumeValueRaw(startToken) {
    return this.Raw(startToken, EXCLAMATIONMARK, SEMICOLON, false, true);
}

function consumeCustomPropertyRaw(startToken) {
    return this.Raw(startToken, EXCLAMATIONMARK, SEMICOLON, false, false);
}

function consumeValue() {
    var startValueToken = this.scanner.currentToken;
    var value = this.Value();

    if (value.type !== 'Raw' &&
        this.scanner.eof === false &&
        this.scanner.tokenType !== SEMICOLON &&
        this.scanner.tokenType !== EXCLAMATIONMARK &&
        this.scanner.isBalanceEdge(startValueToken) === false) {
        this.scanner.error();
    }

    return value;
}

module.exports = {
    name: 'Declaration',
    structure: {
        important: [Boolean, String],
        property: String,
        value: ['Value', 'Raw']
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var startToken = this.scanner.currentToken;
        var property = readProperty.call(this);
        var customProperty = isCustomProperty(property);
        var parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
        var consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
        var important = false;
        var value;

        this.scanner.skipSC();
        this.scanner.eat(COLON);

        if (!customProperty) {
            this.scanner.skipSC();
        }

        if (parseValue) {
            value = this.parseWithFallback(consumeValue, consumeRaw);
        } else {
            value = consumeRaw.call(this, this.scanner.currentToken);
        }

        if (this.scanner.tokenType === EXCLAMATIONMARK) {
            important = getImportant(this.scanner);
            this.scanner.skipSC();
        }

        // Do not include semicolon to range per spec
        // https://drafts.csswg.org/css-syntax/#declaration-diagram

        if (this.scanner.eof === false &&
            this.scanner.tokenType !== SEMICOLON &&
            this.scanner.isBalanceEdge(startToken) === false) {
            this.scanner.error();
        }

        return {
            type: 'Declaration',
            loc: this.getLocation(start, this.scanner.tokenStart),
            important: important,
            property: property,
            value: value
        };
    },
    generate: function(node) {
        this.chunk(node.property);
        this.chunk(':');
        this.node(node.value);

        if (node.important) {
            this.chunk(node.important === true ? '!important' : '!' + node.important);
        }
    },
    walkContext: 'declaration'
};

function readProperty() {
    var start = this.scanner.tokenStart;
    var prefix = 0;

    // hacks
    switch (this.scanner.tokenType) {
        case ASTERISK:
        case DOLLARSIGN:
        case PLUSSIGN:
        case NUMBERSIGN:
            prefix = 1;
            break;

        // TODO: not sure we should support this hack
        case SOLIDUS:
            prefix = this.scanner.lookupType(1) === SOLIDUS ? 2 : 1;
            break;
    }

    if (this.scanner.lookupType(prefix) === HYPHENMINUS) {
        prefix++;
    }

    if (prefix) {
        this.scanner.skip(prefix);
    }

    this.scanner.eat(IDENTIFIER);

    return this.scanner.substrToCursor(start);
}

// ! ws* important
function getImportant(scanner) {
    scanner.eat(EXCLAMATIONMARK);
    scanner.skipSC();

    var important = scanner.consume(IDENTIFIER);

    // store original value in case it differ from `important`
    // for better original source restoring and hacks like `!ie` support
    return important === 'important' ? true : important;
}


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var SEMICOLON = TYPE.Semicolon;

function consumeRaw(startToken) {
    return this.Raw(startToken, 0, SEMICOLON, true, true);
}

module.exports = {
    name: 'DeclarationList',
    structure: {
        children: [[
            'Declaration'
        ]]
    },
    parse: function() {
        var children = this.createList();

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case WHITESPACE:
                case COMMENT:
                case SEMICOLON:
                    this.scanner.next();
                    break;

                default:
                    children.push(this.parseWithFallback(this.Declaration, consumeRaw));
            }
        }

        return {
            type: 'DeclarationList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node, function(prev) {
            if (prev.type === 'Declaration') {
                this.chunk(';');
            }
        });
    }
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var NUMBER = __webpack_require__(7).TYPE.Number;

// special reader for units to avoid adjoined IE hacks (i.e. '1px\9')
function readUnit(scanner) {
    var unit = scanner.getTokenValue();
    var backSlashPos = unit.indexOf('\\');

    if (backSlashPos > 0) {
        // patch token offset
        scanner.tokenStart += backSlashPos;

        // return part before backslash
        return unit.substring(0, backSlashPos);
    }

    // no backslash in unit name
    scanner.next();

    return unit;
}

// number ident
module.exports = {
    name: 'Dimension',
    structure: {
        value: String,
        unit: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var value = this.scanner.consume(NUMBER);
        var unit = readUnit(this.scanner);

        return {
            type: 'Dimension',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: value,
            unit: unit
        };
    },
    generate: function(node) {
        this.chunk(node.value);
        this.chunk(node.unit);
    }
};


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// <function-token> <sequence> ')'
module.exports = {
    name: 'Function',
    structure: {
        name: String,
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var name = this.scanner.consumeFunctionName();
        var nameLowerCase = name.toLowerCase();
        var children;

        children = recognizer.hasOwnProperty(nameLowerCase)
            ? recognizer[nameLowerCase].call(this, recognizer)
            : readSequence.call(this, recognizer);

        if (!this.scanner.eof) {
            this.scanner.eat(RIGHTPARENTHESIS);
        }

        return {
            type: 'Function',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            children: children
        };
    },
    generate: function(node) {
        this.chunk(node.name);
        this.chunk('(');
        this.children(node);
        this.chunk(')');
    },
    walkContext: 'function'
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var isHex = __webpack_require__(7).isHex;
var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var NUMBER = TYPE.Number;
var NUMBERSIGN = TYPE.NumberSign;

function consumeHexSequence(scanner, required) {
    if (!isHex(scanner.source.charCodeAt(scanner.tokenStart))) {
        if (required) {
            scanner.error('Unexpected input', scanner.tokenStart);
        } else {
            return;
        }
    }

    for (var pos = scanner.tokenStart + 1; pos < scanner.tokenEnd; pos++) {
        var code = scanner.source.charCodeAt(pos);

        // break on non-hex char
        if (!isHex(code)) {
            // break token, exclude symbol
            scanner.tokenStart = pos;
            return;
        }
    }

    // token is full hex sequence, go to next token
    scanner.next();
}

// # ident
module.exports = {
    name: 'HexColor',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        this.scanner.eat(NUMBERSIGN);

        scan:
        switch (this.scanner.tokenType) {
            case NUMBER:
                consumeHexSequence(this.scanner, true);

                // if token is identifier then number consists of hex only,
                // try to add identifier to result
                if (this.scanner.tokenType === IDENTIFIER) {
                    consumeHexSequence(this.scanner, false);
                }

                break;

            case IDENTIFIER:
                consumeHexSequence(this.scanner, true);
                break;

            default:
                this.scanner.error('Number or identifier is expected');
        }

        return {
            type: 'HexColor',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.substrToCursor(start + 1) // skip #
        };
    },
    generate: function(node) {
        this.chunk('#');
        this.chunk(node.value);
    }
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;
var IDENTIFIER = TYPE.Identifier;

module.exports = {
    name: 'Identifier',
    structure: {
        name: String
    },
    parse: function() {
        return {
            type: 'Identifier',
            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
            name: this.scanner.consume(IDENTIFIER)
        };
    },
    generate: function(node) {
        this.chunk(node.name);
    }
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;
var IDENTIFIER = TYPE.Identifier;
var NUMBERSIGN = TYPE.NumberSign;

// '#' ident
module.exports = {
    name: 'IdSelector',
    structure: {
        name: String
    },
    parse: function() {
        this.scanner.eat(NUMBERSIGN);

        return {
            type: 'IdSelector',
            loc: this.getLocation(this.scanner.tokenStart - 1, this.scanner.tokenEnd),
            name: this.scanner.consume(IDENTIFIER)
        };
    },
    generate: function(node) {
        this.chunk('#');
        this.chunk(node.name);
    }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var NUMBER = TYPE.Number;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;
var COLON = TYPE.Colon;
var SOLIDUS = TYPE.Solidus;

module.exports = {
    name: 'MediaFeature',
    structure: {
        name: String,
        value: ['Identifier', 'Number', 'Dimension', 'Ratio', null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var name;
        var value = null;

        this.scanner.eat(LEFTPARENTHESIS);
        this.scanner.skipSC();

        name = this.scanner.consume(IDENTIFIER);
        this.scanner.skipSC();

        if (this.scanner.tokenType !== RIGHTPARENTHESIS) {
            this.scanner.eat(COLON);
            this.scanner.skipSC();

            switch (this.scanner.tokenType) {
                case NUMBER:
                    if (this.scanner.lookupType(1) === IDENTIFIER) {
                        value = this.Dimension();
                    } else if (this.scanner.lookupNonWSType(1) === SOLIDUS) {
                        value = this.Ratio();
                    } else {
                        value = this.Number();
                    }

                    break;

                case IDENTIFIER:
                    value = this.Identifier();

                    break;

                default:
                    this.scanner.error('Number, dimension, ratio or identifier is expected');
            }

            this.scanner.skipSC();
        }

        this.scanner.eat(RIGHTPARENTHESIS);

        return {
            type: 'MediaFeature',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            value: value
        };
    },
    generate: function(node) {
        this.chunk('(');
        this.chunk(node.name);
        if (node.value !== null) {
            this.chunk(':');
            this.node(node.value);
        }
        this.chunk(')');
    }
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENTIFIER = TYPE.Identifier;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;

module.exports = {
    name: 'MediaQuery',
    structure: {
        children: [[
            'Identifier',
            'MediaFeature',
            'WhiteSpace'
        ]]
    },
    parse: function() {
        this.scanner.skipSC();

        var children = this.createList();
        var child = null;
        var space = null;

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case COMMENT:
                    this.scanner.next();
                    continue;

                case WHITESPACE:
                    space = this.WhiteSpace();
                    continue;

                case IDENTIFIER:
                    child = this.Identifier();
                    break;

                case LEFTPARENTHESIS:
                    child = this.MediaFeature();
                    break;

                default:
                    break scan;
            }

            if (space !== null) {
                children.push(space);
                space = null;
            }

            children.push(child);
        }

        if (child === null) {
            this.scanner.error('Identifier or parenthesis is expected');
        }

        return {
            type: 'MediaQuery',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    }
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var COMMA = __webpack_require__(7).TYPE.Comma;

module.exports = {
    name: 'MediaQueryList',
    structure: {
        children: [[
            'MediaQuery'
        ]]
    },
    parse: function(relative) {
        var children = this.createList();

        this.scanner.skipSC();

        while (!this.scanner.eof) {
            children.push(this.MediaQuery(relative));

            if (this.scanner.tokenType !== COMMA) {
                break;
            }

            this.scanner.next();
        }

        return {
            type: 'MediaQueryList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node, function() {
            this.chunk(',');
        });
    }
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

// https://drafts.csswg.org/css-syntax-3/#the-anb-type
module.exports = {
    name: 'Nth',
    structure: {
        nth: ['AnPlusB', 'Identifier'],
        selector: ['SelectorList', null]
    },
    parse: function(allowOfClause) {
        this.scanner.skipSC();

        var start = this.scanner.tokenStart;
        var end = start;
        var selector = null;
        var query;

        if (this.scanner.lookupValue(0, 'odd') || this.scanner.lookupValue(0, 'even')) {
            query = this.Identifier();
        } else {
            query = this.AnPlusB();
        }

        this.scanner.skipSC();

        if (allowOfClause && this.scanner.lookupValue(0, 'of')) {
            this.scanner.next();

            selector = this.SelectorList();

            if (this.needPositions) {
                end = this.getLastListNode(selector.children).loc.end.offset;
            }
        } else {
            if (this.needPositions) {
                end = query.loc.end.offset;
            }
        }

        return {
            type: 'Nth',
            loc: this.getLocation(start, end),
            nth: query,
            selector: selector
        };
    },
    generate: function(node) {
        this.node(node.nth);
        if (node.selector !== null) {
            this.chunk(' of ');
            this.node(node.selector);
        }
    }
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var NUMBER = __webpack_require__(7).TYPE.Number;

module.exports = {
    name: 'Number',
    structure: {
        value: String
    },
    parse: function() {
        return {
            type: 'Number',
            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
            value: this.scanner.consume(NUMBER)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),
/* 77 */
/***/ (function(module, exports) {

// '/' | '*' | ',' | ':' | '+' | '-'
module.exports = {
    name: 'Operator',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        this.scanner.next();

        return {
            type: 'Operator',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

module.exports = {
    name: 'Parentheses',
    structure: {
        children: [[]]
    },
    parse: function(readSequence, recognizer) {
        var start = this.scanner.tokenStart;
        var children = null;

        this.scanner.eat(LEFTPARENTHESIS);

        children = readSequence.call(this, recognizer);

        if (!this.scanner.eof) {
            this.scanner.eat(RIGHTPARENTHESIS);
        }

        return {
            type: 'Parentheses',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.chunk('(');
        this.children(node);
        this.chunk(')');
    }
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var NUMBER = TYPE.Number;
var PERCENTSIGN = TYPE.PercentSign;

module.exports = {
    name: 'Percentage',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var number = this.scanner.consume(NUMBER);

        this.scanner.eat(PERCENTSIGN);

        return {
            type: 'Percentage',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: number
        };
    },
    generate: function(node) {
        this.chunk(node.value);
        this.chunk('%');
    }
};


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var FUNCTION = TYPE.Function;
var COLON = TYPE.Colon;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// : ident [ '(' .. ')' ]?
module.exports = {
    name: 'PseudoClassSelector',
    structure: {
        name: String,
        children: [['Raw'], null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = null;
        var name;
        var nameLowerCase;

        this.scanner.eat(COLON);

        if (this.scanner.tokenType === FUNCTION) {
            name = this.scanner.consumeFunctionName();
            nameLowerCase = name.toLowerCase();

            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
                this.scanner.skipSC();
                children = this.pseudo[nameLowerCase].call(this);
                this.scanner.skipSC();
            } else {
                children = this.createList();
                children.push(
                    this.Raw(this.scanner.currentToken, 0, 0, false, false)
                );
            }

            this.scanner.eat(RIGHTPARENTHESIS);
        } else {
            name = this.scanner.consume(IDENTIFIER);
        }

        return {
            type: 'PseudoClassSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            children: children
        };
    },
    generate: function(node) {
        this.chunk(':');
        this.chunk(node.name);

        if (node.children !== null) {
            this.chunk('(');
            this.children(node);
            this.chunk(')');
        }
    },
    walkContext: 'function'
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var FUNCTION = TYPE.Function;
var COLON = TYPE.Colon;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// :: ident [ '(' .. ')' ]?
module.exports = {
    name: 'PseudoElementSelector',
    structure: {
        name: String,
        children: [['Raw'], null]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = null;
        var name;
        var nameLowerCase;

        this.scanner.eat(COLON);
        this.scanner.eat(COLON);

        if (this.scanner.tokenType === FUNCTION) {
            name = this.scanner.consumeFunctionName();
            nameLowerCase = name.toLowerCase();

            if (this.pseudo.hasOwnProperty(nameLowerCase)) {
                this.scanner.skipSC();
                children = this.pseudo[nameLowerCase].call(this);
                this.scanner.skipSC();
            } else {
                children = this.createList();
                children.push(
                    this.Raw(this.scanner.currentToken, 0, 0, false, false)
                );
            }

            this.scanner.eat(RIGHTPARENTHESIS);
        } else {
            name = this.scanner.consume(IDENTIFIER);
        }

        return {
            type: 'PseudoElementSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: name,
            children: children
        };
    },
    generate: function(node) {
        this.chunk('::');
        this.chunk(node.name);

        if (node.children !== null) {
            this.chunk('(');
            this.children(node);
            this.chunk(')');
        }
    },
    walkContext: 'function'
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var isNumber = __webpack_require__(7).isNumber;
var TYPE = __webpack_require__(7).TYPE;
var NUMBER = TYPE.Number;
var SOLIDUS = TYPE.Solidus;
var FULLSTOP = TYPE.FullStop;

// Terms of <ratio> should to be a positive number (not zero or negative)
// (see https://drafts.csswg.org/mediaqueries-3/#values)
// However, -o-min-device-pixel-ratio takes fractional values as a ratio's term
// and this is using by various sites. Therefore we relax checking on parse
// to test a term is unsigned number without exponent part.
// Additional checks may to be applied on lexer validation.
function consumeNumber(scanner) {
    var value = scanner.consumeNonWS(NUMBER);

    for (var i = 0; i < value.length; i++) {
        var code = value.charCodeAt(i);
        if (!isNumber(code) && code !== FULLSTOP) {
            scanner.error('Unsigned number is expected', scanner.tokenStart - value.length + i);
        }
    }

    if (Number(value) === 0) {
        scanner.error('Zero number is not allowed', scanner.tokenStart - value.length);
    }

    return value;
}

// <positive-integer> S* '/' S* <positive-integer>
module.exports = {
    name: 'Ratio',
    structure: {
        left: String,
        right: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var left = consumeNumber(this.scanner);
        var right;

        this.scanner.eatNonWS(SOLIDUS);
        right = consumeNumber(this.scanner);

        return {
            type: 'Ratio',
            loc: this.getLocation(start, this.scanner.tokenStart),
            left: left,
            right: right
        };
    },
    generate: function(node) {
        this.chunk(node.left);
        this.chunk('/');
        this.chunk(node.right);
    }
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = {
    name: 'Raw',
    structure: {
        value: String
    },
    parse: function(startToken, endTokenType1, endTokenType2, includeTokenType2, excludeWhiteSpace) {
        var startOffset = this.scanner.getTokenStart(startToken);
        var endOffset;

        this.scanner.skip(
            this.scanner.getRawLength(
                startToken,
                endTokenType1,
                endTokenType2,
                includeTokenType2
            )
        );

        if (excludeWhiteSpace && this.scanner.tokenStart > startOffset) {
            endOffset = this.scanner.getOffsetExcludeWS();
        } else {
            endOffset = this.scanner.tokenStart;
        }

        return {
            type: 'Raw',
            loc: this.getLocation(startOffset, endOffset),
            value: this.scanner.source.substring(startOffset, endOffset)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var LEFTCURLYBRACKET = TYPE.LeftCurlyBracket;

function consumeRaw(startToken) {
    return this.Raw(startToken, LEFTCURLYBRACKET, 0, false, true);
}

function consumePrelude() {
    var prelude = this.SelectorList();

    if (prelude.type !== 'Raw' &&
        this.scanner.eof === false &&
        this.scanner.tokenType !== LEFTCURLYBRACKET) {
        this.scanner.error();
    }

    return prelude;
}

module.exports = {
    name: 'Rule',
    structure: {
        prelude: ['SelectorList', 'Raw'],
        block: ['Block']
    },
    parse: function() {
        var startToken = this.scanner.currentToken;
        var startOffset = this.scanner.tokenStart;
        var prelude;
        var block;

        if (this.parseRulePrelude) {
            prelude = this.parseWithFallback(consumePrelude, consumeRaw);
        } else {
            prelude = consumeRaw.call(this, startToken);
        }

        block = this.Block(true);

        return {
            type: 'Rule',
            loc: this.getLocation(startOffset, this.scanner.tokenStart),
            prelude: prelude,
            block: block
        };
    },
    generate: function(node) {
        this.node(node.prelude);
        this.node(node.block);
    },
    walkContext: 'rule'
};


/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = {
    name: 'Selector',
    structure: {
        children: [[
            'TypeSelector',
            'IdSelector',
            'ClassSelector',
            'AttributeSelector',
            'PseudoClassSelector',
            'PseudoElementSelector',
            'Combinator',
            'WhiteSpace'
        ]]
    },
    parse: function() {
        var children = this.readSequence(this.scope.Selector);

        // nothing were consumed
        if (this.getFirstListNode(children) === null) {
            this.scanner.error('Selector is expected');
        }

        return {
            type: 'Selector',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    }
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var COMMA = TYPE.Comma;

module.exports = {
    name: 'SelectorList',
    structure: {
        children: [[
            'Selector',
            'Raw'
        ]]
    },
    parse: function() {
        var children = this.createList();

        while (!this.scanner.eof) {
            children.push(this.Selector());

            if (this.scanner.tokenType === COMMA) {
                this.scanner.next();
                continue;
            }

            break;
        }

        return {
            type: 'SelectorList',
            loc: this.getLocationFromList(children),
            children: children
        };
    },
    generate: function(node) {
        this.children(node, function() {
            this.chunk(',');
        });
    },
    walkContext: 'selector'
};


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

var STRING = __webpack_require__(7).TYPE.String;

module.exports = {
    name: 'String',
    structure: {
        value: String
    },
    parse: function() {
        return {
            type: 'String',
            loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
            value: this.scanner.consume(STRING)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var EXCLAMATIONMARK = TYPE.ExclamationMark;
var ATKEYWORD = TYPE.AtKeyword;
var CDO = TYPE.CDO;
var CDC = TYPE.CDC;

function consumeRaw(startToken) {
    return this.Raw(startToken, 0, 0, false, false);
}

module.exports = {
    name: 'StyleSheet',
    structure: {
        children: [[
            'Comment',
            'CDO',
            'CDC',
            'Atrule',
            'Rule',
            'Raw'
        ]]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = this.createList();
        var child;

        scan:
        while (!this.scanner.eof) {
            switch (this.scanner.tokenType) {
                case WHITESPACE:
                    this.scanner.next();
                    continue;

                case COMMENT:
                    // ignore comments except exclamation comments (i.e. /*! .. */) on top level
                    if (this.scanner.source.charCodeAt(this.scanner.tokenStart + 2) !== EXCLAMATIONMARK) {
                        this.scanner.next();
                        continue;
                    }

                    child = this.Comment();
                    break;

                case CDO: // <!--
                    child = this.CDO();
                    break;

                case CDC: // -->
                    child = this.CDC();
                    break;

                // CSS Syntax Module Level 3
                // §2.2 Error handling
                // At the "top level" of a stylesheet, an <at-keyword-token> starts an at-rule.
                case ATKEYWORD:
                    child = this.parseWithFallback(this.Atrule, consumeRaw);
                    break;

                // Anything else starts a qualified rule ...
                default:
                    child = this.parseWithFallback(this.Rule, consumeRaw);
            }

            children.push(child);
        }

        return {
            type: 'StyleSheet',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    },
    walkContext: 'stylesheet'
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var ASTERISK = TYPE.Asterisk;
var VERTICALLINE = TYPE.VerticalLine;

function eatIdentifierOrAsterisk() {
    if (this.scanner.tokenType !== IDENTIFIER &&
        this.scanner.tokenType !== ASTERISK) {
        this.scanner.error('Identifier or asterisk is expected');
    }

    this.scanner.next();
}

// ident
// ident|ident
// ident|*
// *
// *|ident
// *|*
// |ident
// |*
module.exports = {
    name: 'TypeSelector',
    structure: {
        name: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        if (this.scanner.tokenType === VERTICALLINE) {
            this.scanner.next();
            eatIdentifierOrAsterisk.call(this);
        } else {
            eatIdentifierOrAsterisk.call(this);

            if (this.scanner.tokenType === VERTICALLINE) {
                this.scanner.next();
                eatIdentifierOrAsterisk.call(this);
            }
        }

        return {
            type: 'TypeSelector',
            loc: this.getLocation(start, this.scanner.tokenStart),
            name: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.name);
    }
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

var isHex = __webpack_require__(7).isHex;
var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var NUMBER = TYPE.Number;
var PLUSSIGN = TYPE.PlusSign;
var HYPHENMINUS = TYPE.HyphenMinus;
var FULLSTOP = TYPE.FullStop;
var QUESTIONMARK = TYPE.QuestionMark;

function scanUnicodeNumber(scanner) {
    for (var pos = scanner.tokenStart + 1; pos < scanner.tokenEnd; pos++) {
        var code = scanner.source.charCodeAt(pos);

        // break on fullstop or hyperminus/plussign after exponent
        if (code === FULLSTOP || code === PLUSSIGN) {
            // break token, exclude symbol
            scanner.tokenStart = pos;
            return false;
        }
    }

    return true;
}

// https://drafts.csswg.org/css-syntax-3/#urange
function scanUnicodeRange(scanner) {
    var hexStart = scanner.tokenStart + 1; // skip +
    var hexLength = 0;

    scan: {
        if (scanner.tokenType === NUMBER) {
            if (scanner.source.charCodeAt(scanner.tokenStart) !== FULLSTOP && scanUnicodeNumber(scanner)) {
                scanner.next();
            } else if (scanner.source.charCodeAt(scanner.tokenStart) !== HYPHENMINUS) {
                break scan;
            }
        } else {
            scanner.next(); // PLUSSIGN
        }

        if (scanner.tokenType === HYPHENMINUS) {
            scanner.next();
        }

        if (scanner.tokenType === NUMBER) {
            scanner.next();
        }

        if (scanner.tokenType === IDENTIFIER) {
            scanner.next();
        }

        if (scanner.tokenStart === hexStart) {
            scanner.error('Unexpected input', hexStart);
        }
    }

    // validate for U+x{1,6} or U+x{1,6}-x{1,6}
    // where x is [0-9a-fA-F]
    for (var i = hexStart, wasHyphenMinus = false; i < scanner.tokenStart; i++) {
        var code = scanner.source.charCodeAt(i);

        if (isHex(code) === false && (code !== HYPHENMINUS || wasHyphenMinus)) {
            scanner.error('Unexpected input', i);
        }

        if (code === HYPHENMINUS) {
            // hex sequence shouldn't be an empty
            if (hexLength === 0) {
                scanner.error('Unexpected input', i);
            }

            wasHyphenMinus = true;
            hexLength = 0;
        } else {
            hexLength++;

            // too long hex sequence
            if (hexLength > 6) {
                scanner.error('Too long hex sequence', i);
            }
        }

    }

    // check we have a non-zero sequence
    if (hexLength === 0) {
        scanner.error('Unexpected input', i - 1);
    }

    // U+abc???
    if (!wasHyphenMinus) {
        // consume as many U+003F QUESTION MARK (?) code points as possible
        for (; hexLength < 6 && !scanner.eof; scanner.next()) {
            if (scanner.tokenType !== QUESTIONMARK) {
                break;
            }

            hexLength++;
        }
    }
}

module.exports = {
    name: 'UnicodeRange',
    structure: {
        value: String
    },
    parse: function() {
        var start = this.scanner.tokenStart;

        this.scanner.next(); // U or u
        scanUnicodeRange(this.scanner);

        return {
            type: 'UnicodeRange',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: this.scanner.substrToCursor(start)
        };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var STRING = TYPE.String;
var URL = TYPE.Url;
var RAW = TYPE.Raw;
var RIGHTPARENTHESIS = TYPE.RightParenthesis;

// url '(' S* (string | raw) S* ')'
module.exports = {
    name: 'Url',
    structure: {
        value: ['String', 'Raw']
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var value;

        this.scanner.eat(URL);
        this.scanner.skipSC();

        switch (this.scanner.tokenType) {
            case STRING:
                value = this.String();
                break;

            case RAW:
                value = this.Raw(this.scanner.currentToken, 0, RAW, true, false);
                break;

            default:
                this.scanner.error('String or Raw is expected');
        }

        this.scanner.skipSC();
        this.scanner.eat(RIGHTPARENTHESIS);

        return {
            type: 'Url',
            loc: this.getLocation(start, this.scanner.tokenStart),
            value: value
        };
    },
    generate: function(node) {
        this.chunk('url');
        this.chunk('(');
        this.node(node.value);
        this.chunk(')');
    }
};


/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = {
    name: 'Value',
    structure: {
        children: [[]]
    },
    parse: function() {
        var start = this.scanner.tokenStart;
        var children = this.readSequence(this.scope.Value);

        return {
            type: 'Value',
            loc: this.getLocation(start, this.scanner.tokenStart),
            children: children
        };
    },
    generate: function(node) {
        this.children(node);
    }
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var WHITESPACE = __webpack_require__(7).TYPE.WhiteSpace;
var SPACE = Object.freeze({
    type: 'WhiteSpace',
    loc: null,
    value: ' '
});

module.exports = {
    name: 'WhiteSpace',
    structure: {
        value: String
    },
    parse: function() {
        this.scanner.eat(WHITESPACE);
        return SPACE;

        // return {
        //     type: 'WhiteSpace',
        //     loc: this.getLocation(this.scanner.tokenStart, this.scanner.tokenEnd),
        //     value: this.scanner.consume(WHITESPACE)
        // };
    },
    generate: function(node) {
        this.chunk(node.value);
    }
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    parseContext: {
        default: 'StyleSheet',
        stylesheet: 'StyleSheet',
        atrule: 'Atrule',
        atrulePrelude: function(options) {
            return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
        },
        mediaQueryList: 'MediaQueryList',
        mediaQuery: 'MediaQuery',
        rule: 'Rule',
        selectorList: 'SelectorList',
        selector: 'Selector',
        block: function() {
            return this.Block(true);
        },
        declarationList: 'DeclarationList',
        declaration: 'Declaration',
        value: 'Value'
    },
    scope: __webpack_require__(95),
    atrule: __webpack_require__(103),
    pseudo: __webpack_require__(109),
    node: __webpack_require__(53)
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    AtrulePrelude: __webpack_require__(96),
    Selector: __webpack_require__(98),
    Value: __webpack_require__(99)
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    getNode: __webpack_require__(97)
};


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

var cmpChar = __webpack_require__(7).cmpChar;
var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var STRING = TYPE.String;
var NUMBER = TYPE.Number;
var FUNCTION = TYPE.Function;
var URL = TYPE.Url;
var NUMBERSIGN = TYPE.NumberSign;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var PLUSSIGN = TYPE.PlusSign;
var HYPHENMINUS = TYPE.HyphenMinus;
var COMMA = TYPE.Comma;
var SOLIDUS = TYPE.Solidus;
var ASTERISK = TYPE.Asterisk;
var PERCENTSIGN = TYPE.PercentSign;
var BACKSLASH = TYPE.Backslash;
var U = 117; // 'u'.charCodeAt(0)

module.exports = function defaultRecognizer(context) {
    switch (this.scanner.tokenType) {
        case NUMBERSIGN:
            return this.HexColor();

        case COMMA:
            context.space = null;
            context.ignoreWSAfter = true;
            return this.Operator();

        case SOLIDUS:
        case ASTERISK:
        case PLUSSIGN:
        case HYPHENMINUS:
            return this.Operator();

        case LEFTPARENTHESIS:
            return this.Parentheses(this.readSequence, context.recognizer);

        case LEFTSQUAREBRACKET:
            return this.Brackets(this.readSequence, context.recognizer);

        case STRING:
            return this.String();

        case NUMBER:
            switch (this.scanner.lookupType(1)) {
                case PERCENTSIGN:
                    return this.Percentage();

                case IDENTIFIER:
                    // edge case: number with folowing \0 and \9 hack shouldn't to be a Dimension
                    if (cmpChar(this.scanner.source, this.scanner.tokenEnd, BACKSLASH)) {
                        return this.Number();
                    } else {
                        return this.Dimension();
                    }

                default:
                    return this.Number();
            }

        case FUNCTION:
            return this.Function(this.readSequence, context.recognizer);

        case URL:
            return this.Url();

        case IDENTIFIER:
            // check for unicode range, it should start with u+ or U+
            if (cmpChar(this.scanner.source, this.scanner.tokenStart, U) &&
                cmpChar(this.scanner.source, this.scanner.tokenStart + 1, PLUSSIGN)) {
                return this.UnicodeRange();
            } else {
                return this.Identifier();
            }
    }
};


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var NUMBER = TYPE.Number;
var NUMBERSIGN = TYPE.NumberSign;
var LEFTSQUAREBRACKET = TYPE.LeftSquareBracket;
var PLUSSIGN = TYPE.PlusSign;
var SOLIDUS = TYPE.Solidus;
var ASTERISK = TYPE.Asterisk;
var FULLSTOP = TYPE.FullStop;
var COLON = TYPE.Colon;
var GREATERTHANSIGN = TYPE.GreaterThanSign;
var VERTICALLINE = TYPE.VerticalLine;
var TILDE = TYPE.Tilde;

function getNode(context) {
    switch (this.scanner.tokenType) {
        case PLUSSIGN:
        case GREATERTHANSIGN:
        case TILDE:
            context.space = null;
            context.ignoreWSAfter = true;
            return this.Combinator();

        case SOLIDUS:  // /deep/
            return this.Combinator();

        case FULLSTOP:
            return this.ClassSelector();

        case LEFTSQUAREBRACKET:
            return this.AttributeSelector();

        case NUMBERSIGN:
            return this.IdSelector();

        case COLON:
            if (this.scanner.lookupType(1) === COLON) {
                return this.PseudoElementSelector();
            } else {
                return this.PseudoClassSelector();
            }

        case IDENTIFIER:
        case ASTERISK:
        case VERTICALLINE:
            return this.TypeSelector();

        case NUMBER:
            return this.Percentage();
    }
};

module.exports = {
    getNode: getNode
};


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    getNode: __webpack_require__(97),
    '-moz-element': __webpack_require__(100),
    'element': __webpack_require__(100),
    'expression': __webpack_require__(101),
    'var': __webpack_require__(102)
};


/***/ }),
/* 100 */
/***/ (function(module, exports) {

// https://drafts.csswg.org/css-images-4/#element-notation
// https://developer.mozilla.org/en-US/docs/Web/CSS/element
module.exports = function() {
    this.scanner.skipSC();

    var children = this.createSingleNodeList(
        this.IdSelector()
    );

    this.scanner.skipSC();

    return children;
};


/***/ }),
/* 101 */
/***/ (function(module, exports) {

// legacy IE function
// expression '(' raw ')'
module.exports = function() {
    return this.createSingleNodeList(
        this.Raw(this.scanner.currentToken, 0, 0, false, false)
    );
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var IDENTIFIER = TYPE.Identifier;
var COMMA = TYPE.Comma;
var SEMICOLON = TYPE.Semicolon;
var HYPHENMINUS = TYPE.HyphenMinus;
var EXCLAMATIONMARK = TYPE.ExclamationMark;

// var '(' ident (',' <value>? )? ')'
module.exports = function() {
    var children = this.createList();

    this.scanner.skipSC();

    var identStart = this.scanner.tokenStart;

    this.scanner.eat(HYPHENMINUS);
    if (this.scanner.source.charCodeAt(this.scanner.tokenStart) !== HYPHENMINUS) {
        this.scanner.error('HyphenMinus is expected');
    }
    this.scanner.eat(IDENTIFIER);

    children.push({
        type: 'Identifier',
        loc: this.getLocation(identStart, this.scanner.tokenStart),
        name: this.scanner.substrToCursor(identStart)
    });

    this.scanner.skipSC();

    if (this.scanner.tokenType === COMMA) {
        children.push(this.Operator());
        children.push(this.parseCustomProperty
            ? this.Value(null)
            : this.Raw(this.scanner.currentToken, EXCLAMATIONMARK, SEMICOLON, false, false)
        );
    }

    return children;
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'font-face': __webpack_require__(104),
    'import': __webpack_require__(105),
    'media': __webpack_require__(106),
    'page': __webpack_require__(107),
    'supports': __webpack_require__(108)
};


/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = {
    parse: {
        prelude: null,
        block: function() {
            return this.Block(true);
        }
    }
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var STRING = TYPE.String;
var IDENTIFIER = TYPE.Identifier;
var URL = TYPE.Url;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;

module.exports = {
    parse: {
        prelude: function() {
            var children = this.createList();

            this.scanner.skipSC();

            switch (this.scanner.tokenType) {
                case STRING:
                    children.push(this.String());
                    break;

                case URL:
                    children.push(this.Url());
                    break;

                default:
                    this.scanner.error('String or url() is expected');
            }

            if (this.scanner.lookupNonWSType(0) === IDENTIFIER ||
                this.scanner.lookupNonWSType(0) === LEFTPARENTHESIS) {
                children.push(this.WhiteSpace());
                children.push(this.MediaQueryList());
            }

            return children;
        },
        block: null
    }
};


/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = {
    parse: {
        prelude: function() {
            return this.createSingleNodeList(
                this.MediaQueryList()
            );
        },
        block: function() {
            return this.Block(false);
        }
    }
};


/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = {
    parse: {
        prelude: function() {
            return this.createSingleNodeList(
                this.SelectorList()
            );
        },
        block: function() {
            return this.Block(true);
        }
    }
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var TYPE = __webpack_require__(7).TYPE;

var WHITESPACE = TYPE.WhiteSpace;
var COMMENT = TYPE.Comment;
var IDENTIFIER = TYPE.Identifier;
var FUNCTION = TYPE.Function;
var LEFTPARENTHESIS = TYPE.LeftParenthesis;
var HYPHENMINUS = TYPE.HyphenMinus;
var COLON = TYPE.Colon;

function consumeRaw() {
    return this.createSingleNodeList(
        this.Raw(this.scanner.currentToken, 0, 0, false, false)
    );
}

function parentheses() {
    var index = 0;

    this.scanner.skipSC();

    // TODO: make it simplier
    if (this.scanner.tokenType === IDENTIFIER) {
        index = 1;
    } else if (this.scanner.tokenType === HYPHENMINUS &&
               this.scanner.lookupType(1) === IDENTIFIER) {
        index = 2;
    }

    if (index !== 0 && this.scanner.lookupNonWSType(index) === COLON) {
        return this.createSingleNodeList(
            this.Declaration()
        );
    }

    return readSequence.call(this);
}

function readSequence() {
    var children = this.createList();
    var space = null;
    var child;

    this.scanner.skipSC();

    scan:
    while (!this.scanner.eof) {
        switch (this.scanner.tokenType) {
            case WHITESPACE:
                space = this.WhiteSpace();
                continue;

            case COMMENT:
                this.scanner.next();
                continue;

            case FUNCTION:
                child = this.Function(consumeRaw, this.scope.AtrulePrelude);
                break;

            case IDENTIFIER:
                child = this.Identifier();
                break;

            case LEFTPARENTHESIS:
                child = this.Parentheses(parentheses, this.scope.AtrulePrelude);
                break;

            default:
                break scan;
        }

        if (space !== null) {
            children.push(space);
            space = null;
        }

        children.push(child);
    }

    return children;
}

module.exports = {
    parse: {
        prelude: function() {
            var children = readSequence.call(this);

            if (this.getFirstListNode(children) === null) {
                this.scanner.error('Condition is expected');
            }

            return children;
        },
        block: function() {
            return this.Block(false);
        }
    }
};


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    'dir': __webpack_require__(110),
    'has': __webpack_require__(111),
    'lang': __webpack_require__(112),
    'matches': __webpack_require__(113),
    'not': __webpack_require__(115),
    'nth-child': __webpack_require__(116),
    'nth-last-child': __webpack_require__(118),
    'nth-last-of-type': __webpack_require__(119),
    'nth-of-type': __webpack_require__(121),
    'slotted': __webpack_require__(122)
};


/***/ }),
/* 110 */
/***/ (function(module, exports) {

module.exports = {
    parse: function() {
        return this.createSingleNodeList(
            this.Identifier()
        );
    }
};


/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = {
    parse: function() {
        return this.createSingleNodeList(
            this.SelectorList()
        );
    }
};


/***/ }),
/* 112 */
/***/ (function(module, exports) {

module.exports = {
    parse: function() {
        return this.createSingleNodeList(
            this.Identifier()
        );
    }
};


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(114);


/***/ }),
/* 114 */
/***/ (function(module, exports) {

module.exports = {
    parse: function selectorList() {
        return this.createSingleNodeList(
            this.SelectorList()
        );
    }
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(114);


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(117);


/***/ }),
/* 117 */
/***/ (function(module, exports) {

var ALLOW_OF_CLAUSE = true;

module.exports = {
    parse: function nthWithOfClause() {
        return this.createSingleNodeList(
            this.Nth(ALLOW_OF_CLAUSE)
        );
    }
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(117);


/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(120);


/***/ }),
/* 120 */
/***/ (function(module, exports) {

var DISALLOW_OF_CLAUSE = false;

module.exports = {
    parse: function nth() {
        return this.createSingleNodeList(
            this.Nth(DISALLOW_OF_CLAUSE)
        );
    }
};


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(120);


/***/ }),
/* 122 */
/***/ (function(module, exports) {

module.exports = {
    parse: function compoundSelector() {
        return this.createSingleNodeList(
            this.Selector()
        );
    }
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    node: __webpack_require__(53)
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(3).List;
var clone = __webpack_require__(3).clone;
var usageUtils = __webpack_require__(125);
var clean = __webpack_require__(126);
var replace = __webpack_require__(134);
var restructure = __webpack_require__(149);
var walk = __webpack_require__(3).walk;

function readChunk(children, specialComments) {
    var buffer = new List();
    var nonSpaceTokenInBuffer = false;
    var protectedComment;

    children.nextUntil(children.head, function(node, item, list) {
        if (node.type === 'Comment') {
            if (!specialComments || node.value.charAt(0) !== '!') {
                list.remove(item);
                return;
            }

            if (nonSpaceTokenInBuffer || protectedComment) {
                return true;
            }

            list.remove(item);
            protectedComment = node;
            return;
        }

        if (node.type !== 'WhiteSpace') {
            nonSpaceTokenInBuffer = true;
        }

        buffer.insert(list.remove(item));
    });

    return {
        comment: protectedComment,
        stylesheet: {
            type: 'StyleSheet',
            loc: null,
            children: buffer
        }
    };
}

function compressChunk(ast, firstAtrulesAllowed, num, options) {
    options.logger('Compress block #' + num, null, true);

    var seed = 1;

    if (ast.type === 'StyleSheet') {
        ast.firstAtrulesAllowed = firstAtrulesAllowed;
        ast.id = seed++;
    }

    walk(ast, {
        visit: 'Atrule',
        enter: function markScopes(node) {
            if (node.block !== null) {
                node.block.id = seed++;
            }
        }
    });
    options.logger('init', ast);

    // remove redundant
    clean(ast, options);
    options.logger('clean', ast);

    // replace nodes for shortened forms
    replace(ast, options);
    options.logger('replace', ast);

    // structure optimisations
    if (options.restructuring) {
        restructure(ast, options);
    }

    return ast;
}

function getCommentsOption(options) {
    var comments = 'comments' in options ? options.comments : 'exclamation';

    if (typeof comments === 'boolean') {
        comments = comments ? 'exclamation' : false;
    } else if (comments !== 'exclamation' && comments !== 'first-exclamation') {
        comments = false;
    }

    return comments;
}

function getRestructureOption(options) {
    return 'restructure' in options ? options.restructure :
           'restructuring' in options ? options.restructuring :
           true;
}

function wrapBlock(block) {
    return new List().appendData({
        type: 'Rule',
        loc: null,
        prelude: {
            type: 'SelectorList',
            loc: null,
            children: new List().appendData({
                type: 'Selector',
                loc: null,
                children: new List().appendData({
                    type: 'TypeSelector',
                    loc: null,
                    name: 'x'
                })
            })
        },
        block: block
    });
}

module.exports = function compress(ast, options) {
    ast = ast || { type: 'StyleSheet', loc: null, children: new List() };
    options = options || {};

    var compressOptions = {
        logger: typeof options.logger === 'function' ? options.logger : function() {},
        restructuring: getRestructureOption(options),
        forceMediaMerge: Boolean(options.forceMediaMerge),
        usage: options.usage ? usageUtils.buildIndex(options.usage) : false
    };
    var specialComments = getCommentsOption(options);
    var firstAtrulesAllowed = true;
    var input;
    var output = new List();
    var chunk;
    var chunkNum = 1;
    var chunkChildren;

    if (options.clone) {
        ast = clone(ast);
    }

    if (ast.type === 'StyleSheet') {
        input = ast.children;
        ast.children = output;
    } else {
        input = wrapBlock(ast);
    }

    do {
        chunk = readChunk(input, Boolean(specialComments));
        compressChunk(chunk.stylesheet, firstAtrulesAllowed, chunkNum++, compressOptions);
        chunkChildren = chunk.stylesheet.children;

        if (chunk.comment) {
            // add \n before comment if there is another content in output
            if (!output.isEmpty()) {
                output.insert(List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }

            output.insert(List.createItem(chunk.comment));

            // add \n after comment if chunk is not empty
            if (!chunkChildren.isEmpty()) {
                output.insert(List.createItem({
                    type: 'Raw',
                    value: '\n'
                }));
            }
        }

        if (firstAtrulesAllowed && !chunkChildren.isEmpty()) {
            var lastRule = chunkChildren.last();

            if (lastRule.type !== 'Atrule' ||
               (lastRule.name !== 'import' && lastRule.name !== 'charset')) {
                firstAtrulesAllowed = false;
            }
        }

        if (specialComments !== 'exclamation') {
            specialComments = false;
        }

        output.appendList(chunkChildren);
    } while (!input.isEmpty());

    return {
        ast: ast
    };
};


/***/ }),
/* 125 */
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty;

function buildMap(list, caseInsensitive) {
    var map = Object.create(null);

    if (!Array.isArray(list)) {
        return null;
    }

    for (var i = 0; i < list.length; i++) {
        var name = list[i];

        if (caseInsensitive) {
            name = name.toLowerCase();
        }

        map[name] = true;
    }

    return map;
}

function buildList(data) {
    if (!data) {
        return null;
    }

    var tags = buildMap(data.tags, true);
    var ids = buildMap(data.ids);
    var classes = buildMap(data.classes);

    if (tags === null &&
        ids === null &&
        classes === null) {
        return null;
    }

    return {
        tags: tags,
        ids: ids,
        classes: classes
    };
}

function buildIndex(data) {
    var scopes = false;

    if (data.scopes && Array.isArray(data.scopes)) {
        scopes = Object.create(null);

        for (var i = 0; i < data.scopes.length; i++) {
            var list = data.scopes[i];

            if (!list || !Array.isArray(list)) {
                throw new Error('Wrong usage format');
            }

            for (var j = 0; j < list.length; j++) {
                var name = list[j];

                if (hasOwnProperty.call(scopes, name)) {
                    throw new Error('Class can\'t be used for several scopes: ' + name);
                }

                scopes[name] = i + 1;
            }
        }
    }

    return {
        whitelist: buildList(data),
        blacklist: buildList(data.blacklist),
        scopes: scopes
    };
}

module.exports = {
    buildIndex: buildIndex
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

var walk = __webpack_require__(3).walk;
var handlers = {
    Atrule: __webpack_require__(127),
    Rule: __webpack_require__(128),
    Declaration: __webpack_require__(129),
    TypeSelector: __webpack_require__(130),
    Comment: __webpack_require__(131),
    Operator: __webpack_require__(132),
    WhiteSpace: __webpack_require__(133)
};

module.exports = function(ast, options) {
    walk(ast, {
        leave: function(node, item, list) {
            if (handlers.hasOwnProperty(node.type)) {
                handlers[node.type].call(this, node, item, list, options);
            }
        }
    });
};


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

var resolveKeyword = __webpack_require__(3).keyword;

module.exports = function cleanAtrule(node, item, list) {
    if (node.block) {
        // otherwise removed at-rule don't prevent @import for removal
        if (this.stylesheet !== null) {
            this.stylesheet.firstAtrulesAllowed = false;
        }

        if (node.block.children.isEmpty()) {
            list.remove(item);
            return;
        }
    }

    switch (node.name) {
        case 'charset':
            if (!node.prelude || node.prelude.children.isEmpty()) {
                list.remove(item);
                return;
            }

            // if there is any rule before @charset -> remove it
            if (item.prev) {
                list.remove(item);
                return;
            }

            break;

        case 'import':
            if (this.stylesheet === null || !this.stylesheet.firstAtrulesAllowed) {
                list.remove(item);
                return;
            }

            // if there are some rules that not an @import or @charset before @import
            // remove it
            list.prevUntil(item.prev, function(rule) {
                if (rule.type === 'Atrule') {
                    if (rule.name === 'import' || rule.name === 'charset') {
                        return;
                    }
                }

                this.root.firstAtrulesAllowed = false;
                list.remove(item);
                return true;
            }, this);

            break;

        default:
            var name = resolveKeyword(node.name).basename;
            if (name === 'keyframes' ||
                name === 'media' ||
                name === 'supports') {

                // drop at-rule with no prelude
                if (!node.prelude || node.prelude.children.isEmpty()) {
                    list.remove(item);
                }
            }
    }
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

var hasOwnProperty = Object.prototype.hasOwnProperty;
var walk = __webpack_require__(3).walk;

function cleanUnused(selectorList, usageData) {
    selectorList.children.each(function(selector, item, list) {
        var shouldRemove = false;

        walk(selector, function(node) {
            // ignore nodes in nested selectors
            if (this.selector === null || this.selector === selectorList) {
                switch (node.type) {
                    case 'SelectorList':
                        // TODO: remove toLowerCase when pseudo selectors will be normalized
                        // ignore selectors inside :not()
                        if (this['function'] === null || this['function'].name.toLowerCase() !== 'not') {
                            if (cleanUnused(node, usageData)) {
                                shouldRemove = true;
                            }
                        }
                        break;

                    case 'ClassSelector':
                        if (usageData.whitelist !== null &&
                            usageData.whitelist.classes !== null &&
                            !hasOwnProperty.call(usageData.whitelist.classes, node.name)) {
                            shouldRemove = true;
                        }
                        if (usageData.blacklist !== null &&
                            usageData.blacklist.classes !== null &&
                            hasOwnProperty.call(usageData.blacklist.classes, node.name)) {
                            shouldRemove = true;
                        }
                        break;

                    case 'IdSelector':
                        if (usageData.whitelist !== null &&
                            usageData.whitelist.ids !== null &&
                            !hasOwnProperty.call(usageData.whitelist.ids, node.name)) {
                            shouldRemove = true;
                        }
                        if (usageData.blacklist !== null &&
                            usageData.blacklist.ids !== null &&
                            hasOwnProperty.call(usageData.blacklist.ids, node.name)) {
                            shouldRemove = true;
                        }
                        break;

                    case 'TypeSelector':
                        // TODO: remove toLowerCase when type selectors will be normalized
                        // ignore universal selectors
                        if (node.name.charAt(node.name.length - 1) !== '*') {
                            if (usageData.whitelist !== null &&
                                usageData.whitelist.tags !== null &&
                                !hasOwnProperty.call(usageData.whitelist.tags, node.name.toLowerCase())) {
                                shouldRemove = true;
                            }
                            if (usageData.blacklist !== null &&
                                usageData.blacklist.tags !== null &&
                                hasOwnProperty.call(usageData.blacklist.tags, node.name.toLowerCase())) {
                                shouldRemove = true;
                            }
                        }
                        break;
                }
            }
        });

        if (shouldRemove) {
            list.remove(item);
        }
    });

    return selectorList.children.isEmpty();
}

module.exports = function cleanRuleset(node, item, list, options) {
    var usageData = options.usage;

    if (usageData && (usageData.whitelist !== null || usageData.blacklist !== null)) {
        cleanUnused(node.prelude, usageData);
    }

    if (node.prelude.children.isEmpty() ||
        node.block.children.isEmpty()) {
        list.remove(item);
    }
};


/***/ }),
/* 129 */
/***/ (function(module, exports) {

module.exports = function cleanDeclartion(node, item, list) {
    if (node.value.children && node.value.children.isEmpty()) {
        list.remove(item);
    }
};


/***/ }),
/* 130 */
/***/ (function(module, exports) {

// remove useless universal selector
module.exports = function cleanType(node, item, list) {
    var name = item.data.name;

    // check it's a non-namespaced universal selector
    if (name !== '*') {
        return;
    }

    // remove when universal selector before other selectors
    var nextType = item.next && item.next.data.type;
    if (nextType === 'IdSelector' ||
        nextType === 'ClassSelector' ||
        nextType === 'AttributeSelector' ||
        nextType === 'PseudoClassSelector' ||
        nextType === 'PseudoElementSelector') {
        list.remove(item);
    }
};


/***/ }),
/* 131 */
/***/ (function(module, exports) {

module.exports = function cleanComment(data, item, list) {
    list.remove(item);
};


/***/ }),
/* 132 */
/***/ (function(module, exports) {

// remove white spaces around operators when safe
module.exports = function cleanWhitespace(node, item, list) {
    if (node.value === '+' || node.value === '-') {
        return;
    }

    if (item.prev !== null && item.prev.data.type === 'WhiteSpace') {
        list.remove(item.prev);
    }

    if (item.next !== null && item.next.data.type === 'WhiteSpace') {
        list.remove(item.next);
    }
};


/***/ }),
/* 133 */
/***/ (function(module, exports) {

module.exports = function cleanWhitespace(node, item, list) {
    // remove when first or last item in sequence
    if (item.next === null || item.prev === null) {
        list.remove(item);
        return;
    }

    // remove when previous node is whitespace
    if (item.prev.data.type === 'WhiteSpace') {
        list.remove(item);
        return;
    }

    if ((this.stylesheet !== null && this.stylesheet.children === list) ||
        (this.block !== null && this.block.children === list)) {
        list.remove(item);
        return;
    }
};


/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

var walk = __webpack_require__(3).walk;
var handlers = {
    Atrule: __webpack_require__(135),
    AttributeSelector: __webpack_require__(137),
    Value: __webpack_require__(138),
    Dimension: __webpack_require__(143),
    Percentage: __webpack_require__(145),
    Number: __webpack_require__(144),
    String: __webpack_require__(146),
    Url: __webpack_require__(147),
    HexColor: __webpack_require__(148).compressHex,
    Identifier: __webpack_require__(148).compressIdent,
    Function: __webpack_require__(148).compressFunction
};

module.exports = function(ast) {
    walk(ast, {
        leave: function(node, item, list) {
            if (handlers.hasOwnProperty(node.type)) {
                handlers[node.type].call(this, node, item, list);
            }
        }
    });
};


/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

var resolveKeyword = __webpack_require__(3).keyword;
var compressKeyframes = __webpack_require__(136);

module.exports = function(node) {
    // compress @keyframe selectors
    if (resolveKeyword(node.name).basename === 'keyframes') {
        compressKeyframes(node);
    }
};


/***/ }),
/* 136 */
/***/ (function(module, exports) {

module.exports = function(node) {
    node.block.children.each(function(rule) {
        rule.prelude.children.each(function(simpleselector) {
            simpleselector.children.each(function(data, item) {
                if (data.type === 'Percentage' && data.value === '100') {
                    item.data = {
                        type: 'TypeSelector',
                        loc: data.loc,
                        name: 'to'
                    };
                } else if (data.type === 'TypeSelector' && data.name === 'from') {
                    item.data = {
                        type: 'Percentage',
                        loc: data.loc,
                        value: '0'
                    };
                }
            });
        });
    });
};


/***/ }),
/* 137 */
/***/ (function(module, exports) {

// Can unquote attribute detection
// Adopted implementation of Mathias Bynens
// https://github.com/mathiasbynens/mothereff.in/blob/master/unquoted-attributes/eff.js
var escapesRx = /\\([0-9A-Fa-f]{1,6})(\r\n|[ \t\n\f\r])?|\\./g;
var blockUnquoteRx = /^(-?\d|--)|[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/;

function canUnquote(value) {
    if (value === '' || value === '-') {
        return;
    }

    // Escapes are valid, so replace them with a valid non-empty string
    value = value.replace(escapesRx, 'a');

    return !blockUnquoteRx.test(value);
}

module.exports = function(node) {
    var attrValue = node.value;

    if (!attrValue || attrValue.type !== 'String') {
        return;
    }

    var unquotedValue = attrValue.value.replace(/^(.)(.*)\1$/, '$2');
    if (canUnquote(unquotedValue)) {
        node.value = {
            type: 'Identifier',
            loc: attrValue.loc,
            name: unquotedValue
        };
    }
};


/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

var resolveName = __webpack_require__(3).property;
var handlers = {
    'font': __webpack_require__(139),
    'font-weight': __webpack_require__(140),
    'background': __webpack_require__(141),
    'border': __webpack_require__(142),
    'outline': __webpack_require__(142)
};

module.exports = function compressValue(node) {
    if (!this.declaration) {
        return;
    }

    var property = resolveName(this.declaration.property);

    if (handlers.hasOwnProperty(property.basename)) {
        handlers[property.basename](node);
    }
};


/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = function compressFont(node) {
    var list = node.children;

    list.eachRight(function(node, item) {
        if (node.type === 'Identifier') {
            if (node.name === 'bold') {
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '700'
                };
            } else if (node.name === 'normal') {
                var prev = item.prev;

                if (prev && prev.data.type === 'Operator' && prev.data.value === '/') {
                    this.remove(prev);
                }

                this.remove(item);
            } else if (node.name === 'medium') {
                var next = item.next;

                if (!next || next.data.type !== 'Operator') {
                    this.remove(item);
                }
            }
        }
    });

    // remove redundant spaces
    list.each(function(node, item) {
        if (node.type === 'WhiteSpace') {
            if (!item.prev || !item.next || item.next.data.type === 'WhiteSpace') {
                this.remove(item);
            }
        }
    });

    if (list.isEmpty()) {
        list.insert(list.createItem({
            type: 'Identifier',
            name: 'normal'
        }));
    }
};


/***/ }),
/* 140 */
/***/ (function(module, exports) {

module.exports = function compressFontWeight(node) {
    var value = node.children.head.data;

    if (value.type === 'Identifier') {
        switch (value.name) {
            case 'normal':
                node.children.head.data = {
                    type: 'Number',
                    loc: value.loc,
                    value: '400'
                };
                break;
            case 'bold':
                node.children.head.data = {
                    type: 'Number',
                    loc: value.loc,
                    value: '700'
                };
                break;
        }
    }
};


/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(3).List;

module.exports = function compressBackground(node) {
    function lastType() {
        if (buffer.length) {
            return buffer[buffer.length - 1].type;
        }
    }

    function flush() {
        if (lastType() === 'WhiteSpace') {
            buffer.pop();
        }

        if (!buffer.length) {
            buffer.unshift(
                {
                    type: 'Number',
                    loc: null,
                    value: '0'
                },
                {
                    type: 'WhiteSpace',
                    value: ' '
                },
                {
                    type: 'Number',
                    loc: null,
                    value: '0'
                }
            );
        }

        newValue.push.apply(newValue, buffer);

        buffer = [];
    }

    var newValue = [];
    var buffer = [];

    node.children.each(function(node) {
        if (node.type === 'Operator' && node.value === ',') {
            flush();
            newValue.push(node);
            return;
        }

        // remove defaults
        if (node.type === 'Identifier') {
            if (node.name === 'transparent' ||
                node.name === 'none' ||
                node.name === 'repeat' ||
                node.name === 'scroll') {
                return;
            }
        }

        // don't add redundant spaces
        if (node.type === 'WhiteSpace' && (!buffer.length || lastType() === 'WhiteSpace')) {
            return;
        }

        buffer.push(node);
    });

    flush();
    node.children = new List().fromArray(newValue);
};


/***/ }),
/* 142 */
/***/ (function(module, exports) {

function removeItemAndRedundantWhiteSpace(list, item) {
    var prev = item.prev;
    var next = item.next;

    if (next !== null) {
        if (next.data.type === 'WhiteSpace' && (prev === null || prev.data.type === 'WhiteSpace')) {
            list.remove(next);
        }
    } else if (prev !== null && prev.data.type === 'WhiteSpace') {
        list.remove(prev);
    }

    list.remove(item);
}

module.exports = function compressBorder(node) {
    node.children.each(function(node, item, list) {
        if (node.type === 'Identifier' && node.name.toLowerCase() === 'none') {
            if (list.head === list.tail) {
                // replace `none` for zero when `none` is a single term
                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: '0'
                };
            } else {
                removeItemAndRedundantWhiteSpace(list, item);
            }
        }
    });
};


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

var packNumber = __webpack_require__(144).pack;
var LENGTH_UNIT = {
    // absolute length units
    'px': true,
    'mm': true,
    'cm': true,
    'in': true,
    'pt': true,
    'pc': true,

    // relative length units
    'em': true,
    'ex': true,
    'ch': true,
    'rem': true,

    // viewport-percentage lengths
    'vh': true,
    'vw': true,
    'vmin': true,
    'vmax': true,
    'vm': true
};

module.exports = function compressDimension(node, item) {
    var value = packNumber(node.value, item);

    node.value = value;

    if (value === '0' && this.declaration !== null && this.atrulePrelude === null) {
        var unit = node.unit.toLowerCase();

        // only length values can be compressed
        if (!LENGTH_UNIT.hasOwnProperty(unit)) {
            return;
        }

        // issue #362: shouldn't remove unit in -ms-flex since it breaks flex in IE10/11
        // issue #200: shouldn't remove unit in flex since it breaks flex in IE10/11
        if (this.declaration.property === '-ms-flex' ||
            this.declaration.property === 'flex') {
            return;
        }

        // issue #222: don't remove units inside calc
        if (this['function'] && this['function'].name === 'calc') {
            return;
        }

        item.data = {
            type: 'Number',
            loc: node.loc,
            value: value
        };
    }
};


/***/ }),
/* 144 */
/***/ (function(module, exports) {

var OMIT_PLUSSIGN = /^(?:\+|(-))?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/;
var KEEP_PLUSSIGN = /^([\+\-])?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/;
var unsafeToRemovePlusSignAfter = {
    Dimension: true,
    HexColor: true,
    Identifier: true,
    Number: true,
    Raw: true,
    UnicodeRange: true
};

function packNumber(value, item) {
    // omit plus sign only if no prev or prev is safe type
    var regexp = item && item.prev !== null && unsafeToRemovePlusSignAfter.hasOwnProperty(item.prev.data.type)
        ? KEEP_PLUSSIGN
        : OMIT_PLUSSIGN;

    // 100 -> '100'
    // 00100 -> '100'
    // +100 -> '100' (only when safe, e.g. omitting plus sign for 1px+1px leads to single dimension instead of two)
    // -100 -> '-100'
    // 0.123 -> '.123'
    // 0.12300 -> '.123'
    // 0.0 -> ''
    // 0 -> ''
    // -0 -> '-'
    value = String(value).replace(regexp, '$1$2$3');

    if (value === '' || value === '-') {
        value = '0';
    }

    return value;
}

module.exports = function(node, item) {
    node.value = packNumber(node.value, item);
};
module.exports.pack = packNumber;


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

var packNumber = __webpack_require__(144).pack;
var PERCENTAGE_LENGTH_PROPERTY = {
    'margin': true,
    'margin-top': true,
    'margin-left': true,
    'margin-bottom': true,
    'margin-right': true,

    'padding': true,
    'padding-top': true,
    'padding-left': true,
    'padding-bottom': true,
    'padding-right': true,

    'top': true,
    'left': true,
    'bottom': true,
    'right': true,

    'background-position': true,
    'background-position-x': true,
    'background-position-y': true,
    'background-size': true,

    'border': true,
    'border-width': true,
    'border-top-width': true,
    'border-left-width': true,
    'border-bottom-width': true,
    'border-right-width': true,
    'border-image-width': true,

    'border-radius': true,
    'border-bottom-left-radius': true,
    'border-bottom-right-radius': true,
    'border-top-left-radius': true,
    'border-top-right-radius': true
};

module.exports = function compressPercentage(node, item) {
    var value = packNumber(node.value, item);
    var property = this.declaration !== null ? this.declaration.property : null;

    node.value = value;

    if (property !== null && PERCENTAGE_LENGTH_PROPERTY.hasOwnProperty(property)) {
        if (value === '0') {
            item.data = {
                type: 'Number',
                loc: node.loc,
                value: value
            };
        }
    }
};


/***/ }),
/* 146 */
/***/ (function(module, exports) {

module.exports = function(node) {
    var value = node.value;

    // remove escaped newlines, i.e.
    // .a { content: "foo\
    // bar"}
    // ->
    // .a { content: "foobar" }
    value = value.replace(/\\(\r\n|\r|\n|\f)/g, '');

    node.value = value;
};


/***/ }),
/* 147 */
/***/ (function(module, exports) {

var UNICODE = '\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?';
var ESCAPE = '(' + UNICODE + '|\\\\[^\\n\\r\\f0-9a-fA-F])';
var NONPRINTABLE = '\u0000\u0008\u000b\u000e-\u001f\u007f';
var SAFE_URL = new RegExp('^(' + ESCAPE + '|[^\"\'\\(\\)\\\\\\s' + NONPRINTABLE + '])*$', 'i');

module.exports = function(node) {
    var value = node.value;

    if (value.type !== 'String') {
        return;
    }

    var quote = value.value[0];
    var url = value.value.substr(1, value.value.length - 2);

    // convert `\\` to `/`
    url = url.replace(/\\\\/g, '/');

    // remove quotes when safe
    // https://www.w3.org/TR/css-syntax-3/#url-unquoted-diagram
    if (SAFE_URL.test(url)) {
        node.value = {
            type: 'Raw',
            loc: node.value.loc,
            value: url
        };
    } else {
        // use double quotes if string has no double quotes
        // otherwise use original quotes
        // TODO: make better quote type selection
        node.value.value = url.indexOf('"') === -1 ? '"' + url + '"' : quote + url + quote;
    }
};


/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

var lexer = __webpack_require__(3).lexer;
var packNumber = __webpack_require__(144).pack;

// http://www.w3.org/TR/css3-color/#svg-color
var NAME_TO_HEX = {
    'aliceblue': 'f0f8ff',
    'antiquewhite': 'faebd7',
    'aqua': '0ff',
    'aquamarine': '7fffd4',
    'azure': 'f0ffff',
    'beige': 'f5f5dc',
    'bisque': 'ffe4c4',
    'black': '000',
    'blanchedalmond': 'ffebcd',
    'blue': '00f',
    'blueviolet': '8a2be2',
    'brown': 'a52a2a',
    'burlywood': 'deb887',
    'cadetblue': '5f9ea0',
    'chartreuse': '7fff00',
    'chocolate': 'd2691e',
    'coral': 'ff7f50',
    'cornflowerblue': '6495ed',
    'cornsilk': 'fff8dc',
    'crimson': 'dc143c',
    'cyan': '0ff',
    'darkblue': '00008b',
    'darkcyan': '008b8b',
    'darkgoldenrod': 'b8860b',
    'darkgray': 'a9a9a9',
    'darkgrey': 'a9a9a9',
    'darkgreen': '006400',
    'darkkhaki': 'bdb76b',
    'darkmagenta': '8b008b',
    'darkolivegreen': '556b2f',
    'darkorange': 'ff8c00',
    'darkorchid': '9932cc',
    'darkred': '8b0000',
    'darksalmon': 'e9967a',
    'darkseagreen': '8fbc8f',
    'darkslateblue': '483d8b',
    'darkslategray': '2f4f4f',
    'darkslategrey': '2f4f4f',
    'darkturquoise': '00ced1',
    'darkviolet': '9400d3',
    'deeppink': 'ff1493',
    'deepskyblue': '00bfff',
    'dimgray': '696969',
    'dimgrey': '696969',
    'dodgerblue': '1e90ff',
    'firebrick': 'b22222',
    'floralwhite': 'fffaf0',
    'forestgreen': '228b22',
    'fuchsia': 'f0f',
    'gainsboro': 'dcdcdc',
    'ghostwhite': 'f8f8ff',
    'gold': 'ffd700',
    'goldenrod': 'daa520',
    'gray': '808080',
    'grey': '808080',
    'green': '008000',
    'greenyellow': 'adff2f',
    'honeydew': 'f0fff0',
    'hotpink': 'ff69b4',
    'indianred': 'cd5c5c',
    'indigo': '4b0082',
    'ivory': 'fffff0',
    'khaki': 'f0e68c',
    'lavender': 'e6e6fa',
    'lavenderblush': 'fff0f5',
    'lawngreen': '7cfc00',
    'lemonchiffon': 'fffacd',
    'lightblue': 'add8e6',
    'lightcoral': 'f08080',
    'lightcyan': 'e0ffff',
    'lightgoldenrodyellow': 'fafad2',
    'lightgray': 'd3d3d3',
    'lightgrey': 'd3d3d3',
    'lightgreen': '90ee90',
    'lightpink': 'ffb6c1',
    'lightsalmon': 'ffa07a',
    'lightseagreen': '20b2aa',
    'lightskyblue': '87cefa',
    'lightslategray': '789',
    'lightslategrey': '789',
    'lightsteelblue': 'b0c4de',
    'lightyellow': 'ffffe0',
    'lime': '0f0',
    'limegreen': '32cd32',
    'linen': 'faf0e6',
    'magenta': 'f0f',
    'maroon': '800000',
    'mediumaquamarine': '66cdaa',
    'mediumblue': '0000cd',
    'mediumorchid': 'ba55d3',
    'mediumpurple': '9370db',
    'mediumseagreen': '3cb371',
    'mediumslateblue': '7b68ee',
    'mediumspringgreen': '00fa9a',
    'mediumturquoise': '48d1cc',
    'mediumvioletred': 'c71585',
    'midnightblue': '191970',
    'mintcream': 'f5fffa',
    'mistyrose': 'ffe4e1',
    'moccasin': 'ffe4b5',
    'navajowhite': 'ffdead',
    'navy': '000080',
    'oldlace': 'fdf5e6',
    'olive': '808000',
    'olivedrab': '6b8e23',
    'orange': 'ffa500',
    'orangered': 'ff4500',
    'orchid': 'da70d6',
    'palegoldenrod': 'eee8aa',
    'palegreen': '98fb98',
    'paleturquoise': 'afeeee',
    'palevioletred': 'db7093',
    'papayawhip': 'ffefd5',
    'peachpuff': 'ffdab9',
    'peru': 'cd853f',
    'pink': 'ffc0cb',
    'plum': 'dda0dd',
    'powderblue': 'b0e0e6',
    'purple': '800080',
    'rebeccapurple': '639',
    'red': 'f00',
    'rosybrown': 'bc8f8f',
    'royalblue': '4169e1',
    'saddlebrown': '8b4513',
    'salmon': 'fa8072',
    'sandybrown': 'f4a460',
    'seagreen': '2e8b57',
    'seashell': 'fff5ee',
    'sienna': 'a0522d',
    'silver': 'c0c0c0',
    'skyblue': '87ceeb',
    'slateblue': '6a5acd',
    'slategray': '708090',
    'slategrey': '708090',
    'snow': 'fffafa',
    'springgreen': '00ff7f',
    'steelblue': '4682b4',
    'tan': 'd2b48c',
    'teal': '008080',
    'thistle': 'd8bfd8',
    'tomato': 'ff6347',
    'turquoise': '40e0d0',
    'violet': 'ee82ee',
    'wheat': 'f5deb3',
    'white': 'fff',
    'whitesmoke': 'f5f5f5',
    'yellow': 'ff0',
    'yellowgreen': '9acd32'
};

var HEX_TO_NAME = {
    '800000': 'maroon',
    '800080': 'purple',
    '808000': 'olive',
    '808080': 'gray',
    '00ffff': 'cyan',
    'f0ffff': 'azure',
    'f5f5dc': 'beige',
    'ffe4c4': 'bisque',
    '000000': 'black',
    '0000ff': 'blue',
    'a52a2a': 'brown',
    'ff7f50': 'coral',
    'ffd700': 'gold',
    '008000': 'green',
    '4b0082': 'indigo',
    'fffff0': 'ivory',
    'f0e68c': 'khaki',
    '00ff00': 'lime',
    'faf0e6': 'linen',
    '000080': 'navy',
    'ffa500': 'orange',
    'da70d6': 'orchid',
    'cd853f': 'peru',
    'ffc0cb': 'pink',
    'dda0dd': 'plum',
    'f00': 'red',
    'ff0000': 'red',
    'fa8072': 'salmon',
    'a0522d': 'sienna',
    'c0c0c0': 'silver',
    'fffafa': 'snow',
    'd2b48c': 'tan',
    '008080': 'teal',
    'ff6347': 'tomato',
    'ee82ee': 'violet',
    'f5deb3': 'wheat',
    'ffffff': 'white',
    'ffff00': 'yellow'
};

function hueToRgb(p, q, t) {
    if (t < 0) {
        t += 1;
    }
    if (t > 1) {
        t -= 1;
    }
    if (t < 1 / 6) {
        return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
        return q;
    }
    if (t < 2 / 3) {
        return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
}

function hslToRgb(h, s, l, a) {
    var r;
    var g;
    var b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;

        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        a
    ];
}

function toHex(value) {
    value = value.toString(16);
    return value.length === 1 ? '0' + value : value;
}

function parseFunctionArgs(functionArgs, count, rgb) {
    var cursor = functionArgs.head;
    var args = [];
    var wasValue = false;

    while (cursor !== null) {
        var node = cursor.data;
        var type = node.type;

        switch (type) {
            case 'Number':
            case 'Percentage':
                if (wasValue) {
                    return;
                }

                wasValue = true;
                args.push({
                    type: type,
                    value: Number(node.value)
                });
                break;

            case 'Operator':
                if (node.value === ',') {
                    if (!wasValue) {
                        return;
                    }
                    wasValue = false;
                } else if (wasValue || node.value !== '+') {
                    return;
                }
                break;

            default:
                // something we couldn't understand
                return;
        }

        cursor = cursor.next;
    }

    if (args.length !== count) {
        // invalid arguments count
        // TODO: remove those tokens
        return;
    }

    if (args.length === 4) {
        if (args[3].type !== 'Number') {
            // 4th argument should be a number
            // TODO: remove those tokens
            return;
        }

        args[3].type = 'Alpha';
    }

    if (rgb) {
        if (args[0].type !== args[1].type || args[0].type !== args[2].type) {
            // invalid color, numbers and percentage shouldn't be mixed
            // TODO: remove those tokens
            return;
        }
    } else {
        if (args[0].type !== 'Number' ||
            args[1].type !== 'Percentage' ||
            args[2].type !== 'Percentage') {
            // invalid color, for hsl values should be: number, percentage, percentage
            // TODO: remove those tokens
            return;
        }

        args[0].type = 'Angle';
    }

    return args.map(function(arg) {
        var value = Math.max(0, arg.value);

        switch (arg.type) {
            case 'Number':
                // fit value to [0..255] range
                value = Math.min(value, 255);
                break;

            case 'Percentage':
                // convert 0..100% to value in [0..255] range
                value = Math.min(value, 100) / 100;

                if (!rgb) {
                    return value;
                }

                value = 255 * value;
                break;

            case 'Angle':
                // fit value to (-360..360) range
                return (((value % 360) + 360) % 360) / 360;

            case 'Alpha':
                // fit value to [0..1] range
                return Math.min(value, 1);
        }

        return Math.round(value);
    });
}

function compressFunction(node, item, list) {
    var functionName = node.name;
    var args;

    if (functionName === 'rgba' || functionName === 'hsla') {
        args = parseFunctionArgs(node.children, 4, functionName === 'rgba');

        if (!args) {
            // something went wrong
            return;
        }

        if (functionName === 'hsla') {
            args = hslToRgb.apply(null, args);
            node.name = 'rgba';
        }

        if (args[3] === 0) {
            // try to replace `rgba(x, x, x, 0)` to `transparent`
            // always replace `rgba(0, 0, 0, 0)` to `transparent`
            // otherwise avoid replacement in gradients since it may break color transition
            // http://stackoverflow.com/questions/11829410/css3-gradient-rendering-issues-from-transparent-to-white
            var scopeFunctionName = this['function'] && this['function'].name;
            if ((args[0] === 0 && args[1] === 0 && args[2] === 0) ||
                !/^(?:to|from|color-stop)$|gradient$/i.test(scopeFunctionName)) {

                item.data = {
                    type: 'Identifier',
                    loc: node.loc,
                    name: 'transparent'
                };

                return;
            }
        }

        if (args[3] !== 1) {
            // replace argument values for normalized/interpolated
            node.children.each(function(node, item, list) {
                if (node.type === 'Operator') {
                    if (node.value !== ',') {
                        list.remove(item);
                    }
                    return;
                }

                item.data = {
                    type: 'Number',
                    loc: node.loc,
                    value: packNumber(args.shift(), null)
                };
            });

            return;
        }

        // otherwise convert to rgb, i.e. rgba(255, 0, 0, 1) -> rgb(255, 0, 0)
        functionName = 'rgb';
    }

    if (functionName === 'hsl') {
        args = args || parseFunctionArgs(node.children, 3, false);

        if (!args) {
            // something went wrong
            return;
        }

        // convert to rgb
        args = hslToRgb.apply(null, args);
        functionName = 'rgb';
    }

    if (functionName === 'rgb') {
        args = args || parseFunctionArgs(node.children, 3, true);

        if (!args) {
            // something went wrong
            return;
        }

        // check if color is not at the end and not followed by space
        var next = item.next;
        if (next && next.data.type !== 'WhiteSpace') {
            list.insert(list.createItem({
                type: 'WhiteSpace',
                value: ' '
            }), next);
        }

        item.data = {
            type: 'HexColor',
            loc: node.loc,
            value: toHex(args[0]) + toHex(args[1]) + toHex(args[2])
        };

        compressHex(item.data, item);
    }
}

function compressIdent(node, item) {
    if (this.declaration === null) {
        return;
    }

    var color = node.name.toLowerCase();

    if (NAME_TO_HEX.hasOwnProperty(color) &&
        lexer.matchDeclaration(this.declaration).isType(node, 'color')) {
        var hex = NAME_TO_HEX[color];

        if (hex.length + 1 <= color.length) {
            // replace for shorter hex value
            item.data = {
                type: 'HexColor',
                loc: node.loc,
                value: hex
            };
        } else {
            // special case for consistent colors
            if (color === 'grey') {
                color = 'gray';
            }

            // just replace value for lower cased name
            node.name = color;
        }
    }
}

function compressHex(node, item) {
    var color = node.value.toLowerCase();

    // #112233 -> #123
    if (color.length === 6 &&
        color[0] === color[1] &&
        color[2] === color[3] &&
        color[4] === color[5]) {
        color = color[0] + color[2] + color[4];
    }

    if (HEX_TO_NAME[color]) {
        item.data = {
            type: 'Identifier',
            loc: node.loc,
            name: HEX_TO_NAME[color]
        };
    } else {
        node.value = color;
    }
}

module.exports = {
    compressFunction: compressFunction,
    compressIdent: compressIdent,
    compressHex: compressHex
};


/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

var prepare = __webpack_require__(150);
var mergeAtrule = __webpack_require__(154);
var initialMergeRuleset = __webpack_require__(155);
var disjoinRuleset = __webpack_require__(157);
var restructShorthand = __webpack_require__(158);
var restructBlock = __webpack_require__(159);
var mergeRuleset = __webpack_require__(160);
var restructRuleset = __webpack_require__(161);

module.exports = function(ast, options) {
    // prepare ast for restructing
    var indexer = prepare(ast, options);
    options.logger('prepare', ast);

    mergeAtrule(ast, options);
    options.logger('mergeAtrule', ast);

    initialMergeRuleset(ast);
    options.logger('initialMergeRuleset', ast);

    disjoinRuleset(ast);
    options.logger('disjoinRuleset', ast);

    restructShorthand(ast, indexer);
    options.logger('restructShorthand', ast);

    restructBlock(ast);
    options.logger('restructBlock', ast);

    mergeRuleset(ast);
    options.logger('mergeRuleset', ast);

    restructRuleset(ast);
    options.logger('restructRuleset', ast);
};


/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

var resolveKeyword = __webpack_require__(3).keyword;
var walk = __webpack_require__(3).walk;
var generate = __webpack_require__(3).generate;
var createDeclarationIndexer = __webpack_require__(151);
var processSelector = __webpack_require__(152);

module.exports = function prepare(ast, options) {
    var markDeclaration = createDeclarationIndexer();

    walk(ast, {
        visit: 'Rule',
        enter: function processRule(node) {
            node.block.children.each(markDeclaration);
            processSelector(node, options.usage);
        }
    });

    walk(ast, {
        visit: 'Atrule',
        enter: function(node) {
            if (node.prelude) {
                node.prelude.id = null; // pre-init property to avoid multiple hidden class for generate
                node.prelude.id = generate(node.prelude);
            }

            // compare keyframe selectors by its values
            // NOTE: still no clarification about problems with keyframes selector grouping (issue #197)
            if (resolveKeyword(node.name).basename === 'keyframes') {
                node.block.avoidRulesMerge = true;  /* probably we don't need to prevent those merges for @keyframes
                                                       TODO: need to be checked */
                node.block.children.each(function(rule) {
                    rule.prelude.children.each(function(simpleselector) {
                        simpleselector.compareMarker = simpleselector.id;
                    });
                });
            }
        }
    });

    return {
        declaration: markDeclaration
    };
};


/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

var generate = __webpack_require__(3).generate;

function Index() {
    this.seed = 0;
    this.map = Object.create(null);
}

Index.prototype.resolve = function(str) {
    var index = this.map[str];

    if (!index) {
        index = ++this.seed;
        this.map[str] = index;
    }

    return index;
};

module.exports = function createDeclarationIndexer() {
    var ids = new Index();

    return function markDeclaration(node) {
        var id = generate(node);

        node.id = ids.resolve(id);
        node.length = id.length;
        node.fingerprint = null;

        return node;
    };
};


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

var generate = __webpack_require__(3).generate;
var specificity = __webpack_require__(153);

var nonFreezePseudoElements = {
    'first-letter': true,
    'first-line': true,
    'after': true,
    'before': true
};
var nonFreezePseudoClasses = {
    'link': true,
    'visited': true,
    'hover': true,
    'active': true,
    'first-letter': true,
    'first-line': true,
    'after': true,
    'before': true
};

module.exports = function freeze(node, usageData) {
    var pseudos = Object.create(null);
    var hasPseudo = false;

    node.prelude.children.each(function(simpleSelector) {
        var tagName = '*';
        var scope = 0;

        simpleSelector.children.each(function(node) {
            switch (node.type) {
                case 'ClassSelector':
                    if (usageData && usageData.scopes) {
                        var classScope = usageData.scopes[node.name] || 0;

                        if (scope !== 0 && classScope !== scope) {
                            throw new Error('Selector can\'t has classes from different scopes: ' + generate(simpleSelector));
                        }

                        scope = classScope;
                    }
                    break;

                case 'PseudoClassSelector':
                    var name = node.name.toLowerCase();

                    if (!nonFreezePseudoClasses.hasOwnProperty(name)) {
                        pseudos[name] = true;
                        hasPseudo = true;
                    }
                    break;

                case 'PseudoElementSelector':
                    var name = node.name.toLowerCase();

                    if (!nonFreezePseudoElements.hasOwnProperty(name)) {
                        pseudos[name] = true;
                        hasPseudo = true;
                    }
                    break;

                case 'TypeSelector':
                    tagName = node.name.toLowerCase();
                    break;

                case 'AttributeSelector':
                    if (node.flags) {
                        pseudos['[' + node.flags.toLowerCase() + ']'] = true;
                        hasPseudo = true;
                    }
                    break;

                case 'WhiteSpace':
                case 'Combinator':
                    tagName = '*';
                    break;
            }
        });

        simpleSelector.compareMarker = specificity(simpleSelector).toString();
        simpleSelector.id = null; // pre-init property to avoid multiple hidden class
        simpleSelector.id = generate(simpleSelector);

        if (scope) {
            simpleSelector.compareMarker += ':' + scope;
        }

        if (tagName !== '*') {
            simpleSelector.compareMarker += ',' + tagName;
        }
    });

    // add property to all rule nodes to avoid multiple hidden class
    node.pseudoSignature = hasPseudo && Object.keys(pseudos).sort().join(',');
};


/***/ }),
/* 153 */
/***/ (function(module, exports) {

module.exports = function specificity(simpleSelector) {
    var A = 0;
    var B = 0;
    var C = 0;

    simpleSelector.children.each(function walk(node) {
        switch (node.type) {
            case 'SelectorList':
            case 'Selector':
                node.children.each(walk);
                break;

            case 'IdSelector':
                A++;
                break;

            case 'ClassSelector':
            case 'AttributeSelector':
                B++;
                break;

            case 'PseudoClassSelector':
                switch (node.name.toLowerCase()) {
                    case 'not':
                        node.children.each(walk);
                        break;

                    case 'before':
                    case 'after':
                    case 'first-line':
                    case 'first-letter':
                        C++;
                        break;

                    // TODO: support for :nth-*(.. of <SelectorList>), :matches(), :has()

                    default:
                        B++;
                }
                break;

            case 'PseudoElementSelector':
                C++;
                break;

            case 'TypeSelector':
                // ignore universal selector
                if (node.name.charAt(node.name.length - 1) !== '*') {
                    C++;
                }
                break;

        }
    });

    return [A, B, C];
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(3).List;
var resolveKeyword = __webpack_require__(3).keyword;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var walk = __webpack_require__(3).walk;

function addRuleToMap(map, item, list, single) {
    var node = item.data;
    var name = resolveKeyword(node.name).basename;
    var id = node.name.toLowerCase() + '/' + (node.prelude ? node.prelude.id : null);

    if (!hasOwnProperty.call(map, name)) {
        map[name] = Object.create(null);
    }

    if (single) {
        delete map[name][id];
    }

    if (!hasOwnProperty.call(map[name], id)) {
        map[name][id] = new List();
    }

    map[name][id].append(list.remove(item));
}

function relocateAtrules(ast, options) {
    var collected = Object.create(null);
    var topInjectPoint = null;

    ast.children.each(function(node, item, list) {
        if (node.type === 'Atrule') {
            var name = resolveKeyword(node.name).basename;

            switch (name) {
                case 'keyframes':
                    addRuleToMap(collected, item, list, true);
                    return;

                case 'media':
                    if (options.forceMediaMerge) {
                        addRuleToMap(collected, item, list, false);
                        return;
                    }
                    break;
            }

            if (topInjectPoint === null &&
                name !== 'charset' &&
                name !== 'import') {
                topInjectPoint = item;
            }
        } else {
            if (topInjectPoint === null) {
                topInjectPoint = item;
            }
        }
    });

    for (var atrule in collected) {
        for (var id in collected[atrule]) {
            ast.children.insertList(
                collected[atrule][id],
                atrule === 'media' ? null : topInjectPoint
            );
        }
    }
};

function isMediaRule(node) {
    return node.type === 'Atrule' && node.name === 'media';
}

function processAtrule(node, item, list) {
    if (!isMediaRule(node)) {
        return;
    }

    var prev = item.prev && item.prev.data;

    if (!prev || !isMediaRule(prev)) {
        return;
    }

    // merge @media with same query
    if (node.prelude &&
        prev.prelude &&
        node.prelude.id === prev.prelude.id) {
        prev.block.children.appendList(node.block.children);
        list.remove(item);

        // TODO: use it when we can refer to several points in source
        // prev.loc = {
        //     primary: prev.loc,
        //     merged: node.loc
        // };
    }
}

module.exports = function rejoinAtrule(ast, options) {
    relocateAtrules(ast, options);

    walk(ast, {
        visit: 'Atrule',
        reverse: true,
        enter: processAtrule
    });
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var walk = __webpack_require__(3).walk;
var utils = __webpack_require__(156);

function processRule(node, item, list) {
    var selectors = node.prelude.children;
    var declarations = node.block.children;

    list.prevUntil(item.prev, function(prev) {
        // skip non-ruleset node if safe
        if (prev.type !== 'Rule') {
            return utils.unsafeToSkipNode.call(selectors, prev);
        }

        var prevSelectors = prev.prelude.children;
        var prevDeclarations = prev.block.children;

        // try to join rulesets with equal pseudo signature
        if (node.pseudoSignature === prev.pseudoSignature) {
            // try to join by selectors
            if (utils.isEqualSelectors(prevSelectors, selectors)) {
                prevDeclarations.appendList(declarations);
                list.remove(item);
                return true;
            }

            // try to join by declarations
            if (utils.isEqualDeclarations(declarations, prevDeclarations)) {
                utils.addSelectors(prevSelectors, selectors);
                list.remove(item);
                return true;
            }
        }

        // go to prev ruleset if has no selector similarities
        return utils.hasSimilarSelectors(selectors, prevSelectors);
    });
}

// NOTE: direction should be left to right, since rulesets merge to left
// ruleset. When direction right to left unmerged rulesets may prevent lookup
// TODO: remove initial merge
module.exports = function initialMergeRule(ast) {
    walk(ast, {
        visit: 'Rule',
        enter: processRule
    });
};


/***/ }),
/* 156 */
/***/ (function(module, exports) {

var hasOwnProperty = Object.prototype.hasOwnProperty;

function isEqualSelectors(a, b) {
    var cursor1 = a.head;
    var cursor2 = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

function isEqualDeclarations(a, b) {
    var cursor1 = a.head;
    var cursor2 = b.head;

    while (cursor1 !== null && cursor2 !== null && cursor1.data.id === cursor2.data.id) {
        cursor1 = cursor1.next;
        cursor2 = cursor2.next;
    }

    return cursor1 === null && cursor2 === null;
}

function compareDeclarations(declarations1, declarations2) {
    var result = {
        eq: [],
        ne1: [],
        ne2: [],
        ne2overrided: []
    };

    var fingerprints = Object.create(null);
    var declarations2hash = Object.create(null);

    for (var cursor = declarations2.head; cursor; cursor = cursor.next)  {
        declarations2hash[cursor.data.id] = true;
    }

    for (var cursor = declarations1.head; cursor; cursor = cursor.next)  {
        var data = cursor.data;

        if (data.fingerprint) {
            fingerprints[data.fingerprint] = data.important;
        }

        if (declarations2hash[data.id]) {
            declarations2hash[data.id] = false;
            result.eq.push(data);
        } else {
            result.ne1.push(data);
        }
    }

    for (var cursor = declarations2.head; cursor; cursor = cursor.next)  {
        var data = cursor.data;

        if (declarations2hash[data.id]) {
            // if declarations1 has overriding declaration, this is not a difference
            // but take in account !important - prev should be equal or greater than follow
            if (hasOwnProperty.call(fingerprints, data.fingerprint) &&
                Number(fingerprints[data.fingerprint]) >= Number(data.important)) {
                result.ne2overrided.push(data);
            } else {
                result.ne2.push(data);
            }
        }
    }

    return result;
}

function addSelectors(dest, source) {
    source.each(function(sourceData) {
        var newStr = sourceData.id;
        var cursor = dest.head;

        while (cursor) {
            var nextStr = cursor.data.id;

            if (nextStr === newStr) {
                return;
            }

            if (nextStr > newStr) {
                break;
            }

            cursor = cursor.next;
        }

        dest.insert(dest.createItem(sourceData), cursor);
    });

    return dest;
}

// check if simpleselectors has no equal specificity and element selector
function hasSimilarSelectors(selectors1, selectors2) {
    var cursor1 = selectors1.head;

    while (cursor1 !== null) {
        var cursor2 = selectors2.head;

        while (cursor2 !== null) {
            if (cursor1.data.compareMarker === cursor2.data.compareMarker) {
                return true;
            }

            cursor2 = cursor2.next;
        }

        cursor1 = cursor1.next;
    }

    return false;
}

// test node can't to be skipped
function unsafeToSkipNode(node) {
    switch (node.type) {
        case 'Rule':
            // unsafe skip ruleset with selector similarities
            return hasSimilarSelectors(node.prelude.children, this);

        case 'Atrule':
            // can skip at-rules with blocks
            if (node.block) {
                // unsafe skip at-rule if block contains something unsafe to skip
                return node.block.children.some(unsafeToSkipNode, this);
            }
            break;

        case 'Declaration':
            return false;
    }

    // unsafe by default
    return true;
}

module.exports = {
    isEqualSelectors: isEqualSelectors,
    isEqualDeclarations: isEqualDeclarations,
    compareDeclarations: compareDeclarations,
    addSelectors: addSelectors,
    hasSimilarSelectors: hasSimilarSelectors,
    unsafeToSkipNode: unsafeToSkipNode
};


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(3).List;
var walk = __webpack_require__(3).walk;

function processRule(node, item, list) {
    var selectors = node.prelude.children;

    // generate new rule sets:
    // .a, .b { color: red; }
    // ->
    // .a { color: red; }
    // .b { color: red; }

    // while there are more than 1 simple selector split for rulesets
    while (selectors.head !== selectors.tail) {
        var newSelectors = new List();
        newSelectors.insert(selectors.remove(selectors.head));

        list.insert(list.createItem({
            type: 'Rule',
            loc: node.loc,
            prelude: {
                type: 'SelectorList',
                loc: node.prelude.loc,
                children: newSelectors
            },
            block: {
                type: 'Block',
                loc: node.block.loc,
                children: node.block.children.copy()
            },
            pseudoSignature: node.pseudoSignature
        }), item);
    }
}

module.exports = function disjoinRule(ast) {
    walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
};


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(3).List;
var generate = __webpack_require__(3).generate;
var walk = __webpack_require__(3).walk;

var REPLACE = 1;
var REMOVE = 2;
var TOP = 0;
var RIGHT = 1;
var BOTTOM = 2;
var LEFT = 3;
var SIDES = ['top', 'right', 'bottom', 'left'];
var SIDE = {
    'margin-top': 'top',
    'margin-right': 'right',
    'margin-bottom': 'bottom',
    'margin-left': 'left',

    'padding-top': 'top',
    'padding-right': 'right',
    'padding-bottom': 'bottom',
    'padding-left': 'left',

    'border-top-color': 'top',
    'border-right-color': 'right',
    'border-bottom-color': 'bottom',
    'border-left-color': 'left',
    'border-top-width': 'top',
    'border-right-width': 'right',
    'border-bottom-width': 'bottom',
    'border-left-width': 'left',
    'border-top-style': 'top',
    'border-right-style': 'right',
    'border-bottom-style': 'bottom',
    'border-left-style': 'left'
};
var MAIN_PROPERTY = {
    'margin': 'margin',
    'margin-top': 'margin',
    'margin-right': 'margin',
    'margin-bottom': 'margin',
    'margin-left': 'margin',

    'padding': 'padding',
    'padding-top': 'padding',
    'padding-right': 'padding',
    'padding-bottom': 'padding',
    'padding-left': 'padding',

    'border-color': 'border-color',
    'border-top-color': 'border-color',
    'border-right-color': 'border-color',
    'border-bottom-color': 'border-color',
    'border-left-color': 'border-color',
    'border-width': 'border-width',
    'border-top-width': 'border-width',
    'border-right-width': 'border-width',
    'border-bottom-width': 'border-width',
    'border-left-width': 'border-width',
    'border-style': 'border-style',
    'border-top-style': 'border-style',
    'border-right-style': 'border-style',
    'border-bottom-style': 'border-style',
    'border-left-style': 'border-style'
};

function TRBL(name) {
    this.name = name;
    this.loc = null;
    this.iehack = undefined;
    this.sides = {
        'top': null,
        'right': null,
        'bottom': null,
        'left': null
    };
}

TRBL.prototype.getValueSequence = function(declaration, count) {
    var values = [];
    var iehack = '';
    var hasBadValues = declaration.value.children.some(function(child) {
        var special = false;

        switch (child.type) {
            case 'Identifier':
                switch (child.name) {
                    case '\\0':
                    case '\\9':
                        iehack = child.name;
                        return;

                    case 'inherit':
                    case 'initial':
                    case 'unset':
                    case 'revert':
                        special = child.name;
                        break;
                }
                break;

            case 'Dimension':
                switch (child.unit) {
                    // is not supported until IE11
                    case 'rem':

                    // v* units is too buggy across browsers and better
                    // don't merge values with those units
                    case 'vw':
                    case 'vh':
                    case 'vmin':
                    case 'vmax':
                    case 'vm': // IE9 supporting "vm" instead of "vmin".
                        special = child.unit;
                        break;
                }
                break;

            case 'HexColor': // color
            case 'Number':
            case 'Percentage':
                break;

            case 'Function':
                special = child.name;
                break;

            case 'WhiteSpace':
                return false; // ignore space

            default:
                return true;  // bad value
        }

        values.push({
            node: child,
            special: special,
            important: declaration.important
        });
    });

    if (hasBadValues || values.length > count) {
        return false;
    }

    if (typeof this.iehack === 'string' && this.iehack !== iehack) {
        return false;
    }

    this.iehack = iehack; // move outside

    return values;
};

TRBL.prototype.canOverride = function(side, value) {
    var currentValue = this.sides[side];

    return !currentValue || (value.important && !currentValue.important);
};

TRBL.prototype.add = function(name, declaration) {
    function attemptToAdd() {
        var sides = this.sides;
        var side = SIDE[name];

        if (side) {
            if (side in sides === false) {
                return false;
            }

            var values = this.getValueSequence(declaration, 1);

            if (!values || !values.length) {
                return false;
            }

            // can mix only if specials are equal
            for (var key in sides) {
                if (sides[key] !== null && sides[key].special !== values[0].special) {
                    return false;
                }
            }

            if (!this.canOverride(side, values[0])) {
                return true;
            }

            sides[side] = values[0];
            return true;
        } else if (name === this.name) {
            var values = this.getValueSequence(declaration, 4);

            if (!values || !values.length) {
                return false;
            }

            switch (values.length) {
                case 1:
                    values[RIGHT] = values[TOP];
                    values[BOTTOM] = values[TOP];
                    values[LEFT] = values[TOP];
                    break;

                case 2:
                    values[BOTTOM] = values[TOP];
                    values[LEFT] = values[RIGHT];
                    break;

                case 3:
                    values[LEFT] = values[RIGHT];
                    break;
            }

            // can mix only if specials are equal
            for (var i = 0; i < 4; i++) {
                for (var key in sides) {
                    if (sides[key] !== null && sides[key].special !== values[i].special) {
                        return false;
                    }
                }
            }

            for (var i = 0; i < 4; i++) {
                if (this.canOverride(SIDES[i], values[i])) {
                    sides[SIDES[i]] = values[i];
                }
            }

            return true;
        }
    }

    if (!attemptToAdd.call(this)) {
        return false;
    }

    // TODO: use it when we can refer to several points in source
    // if (this.loc) {
    //     this.loc = {
    //         primary: this.loc,
    //         merged: declaration.loc
    //     };
    // } else {
    //     this.loc = declaration.loc;
    // }
    if (!this.loc) {
        this.loc = declaration.loc;
    }

    return true;
};

TRBL.prototype.isOkToMinimize = function() {
    var top = this.sides.top;
    var right = this.sides.right;
    var bottom = this.sides.bottom;
    var left = this.sides.left;

    if (top && right && bottom && left) {
        var important =
            top.important +
            right.important +
            bottom.important +
            left.important;

        return important === 0 || important === 4;
    }

    return false;
};

TRBL.prototype.getValue = function() {
    var result = new List();
    var sides = this.sides;
    var values = [
        sides.top,
        sides.right,
        sides.bottom,
        sides.left
    ];
    var stringValues = [
        generate(sides.top.node),
        generate(sides.right.node),
        generate(sides.bottom.node),
        generate(sides.left.node)
    ];

    if (stringValues[LEFT] === stringValues[RIGHT]) {
        values.pop();
        if (stringValues[BOTTOM] === stringValues[TOP]) {
            values.pop();
            if (stringValues[RIGHT] === stringValues[TOP]) {
                values.pop();
            }
        }
    }

    for (var i = 0; i < values.length; i++) {
        if (i) {
            result.appendData({ type: 'WhiteSpace', value: ' ' });
        }

        result.appendData(values[i].node);
    }

    if (this.iehack) {
        result.appendData({ type: 'WhiteSpace', value: ' ' });
        result.appendData({
            type: 'Identifier',
            loc: null,
            name: this.iehack
        });
    }

    return {
        type: 'Value',
        loc: null,
        children: result
    };
};

TRBL.prototype.getDeclaration = function() {
    return {
        type: 'Declaration',
        loc: this.loc,
        important: this.sides.top.important,
        property: this.name,
        value: this.getValue()
    };
};

function processRule(rule, shorts, shortDeclarations, lastShortSelector) {
    var declarations = rule.block.children;
    var selector = rule.prelude.children.first().id;

    rule.block.children.eachRight(function(declaration, item) {
        var property = declaration.property;

        if (!MAIN_PROPERTY.hasOwnProperty(property)) {
            return;
        }

        var key = MAIN_PROPERTY[property];
        var shorthand;
        var operation;

        if (!lastShortSelector || selector === lastShortSelector) {
            if (key in shorts) {
                operation = REMOVE;
                shorthand = shorts[key];
            }
        }

        if (!shorthand || !shorthand.add(property, declaration)) {
            operation = REPLACE;
            shorthand = new TRBL(key);

            // if can't parse value ignore it and break shorthand children
            if (!shorthand.add(property, declaration)) {
                lastShortSelector = null;
                return;
            }
        }

        shorts[key] = shorthand;
        shortDeclarations.push({
            operation: operation,
            block: declarations,
            item: item,
            shorthand: shorthand
        });

        lastShortSelector = selector;
    });

    return lastShortSelector;
}

function processShorthands(shortDeclarations, markDeclaration) {
    shortDeclarations.forEach(function(item) {
        var shorthand = item.shorthand;

        if (!shorthand.isOkToMinimize()) {
            return;
        }

        if (item.operation === REPLACE) {
            item.item.data = markDeclaration(shorthand.getDeclaration());
        } else {
            item.block.remove(item.item);
        }
    });
}

module.exports = function restructBlock(ast, indexer) {
    var stylesheetMap = {};
    var shortDeclarations = [];

    walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: function(node) {
            var stylesheet = this.block || this.stylesheet;
            var ruleId = (node.pseudoSignature || '') + '|' + node.prelude.children.first().id;
            var ruleMap;
            var shorts;

            if (!stylesheetMap.hasOwnProperty(stylesheet.id)) {
                ruleMap = {
                    lastShortSelector: null
                };
                stylesheetMap[stylesheet.id] = ruleMap;
            } else {
                ruleMap = stylesheetMap[stylesheet.id];
            }

            if (ruleMap.hasOwnProperty(ruleId)) {
                shorts = ruleMap[ruleId];
            } else {
                shorts = {};
                ruleMap[ruleId] = shorts;
            }

            ruleMap.lastShortSelector = processRule.call(this, node, shorts, shortDeclarations, ruleMap.lastShortSelector);
        }
    });

    processShorthands(shortDeclarations, indexer.declaration);
};


/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

var resolveProperty = __webpack_require__(3).property;
var resolveKeyword = __webpack_require__(3).keyword;
var walk = __webpack_require__(3).walk;
var generate = __webpack_require__(3).generate;
var fingerprintId = 1;
var dontRestructure = {
    'src': 1 // https://github.com/afelix/csso/issues/50
};

var DONT_MIX_VALUE = {
    // https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility
    'display': /table|ruby|flex|-(flex)?box$|grid|contents|run-in/i,
    // https://developer.mozilla.org/en/docs/Web/CSS/text-align
    'text-align': /^(start|end|match-parent|justify-all)$/i
};

var CURSOR_SAFE_VALUE = [
    'auto', 'crosshair', 'default', 'move', 'text', 'wait', 'help',
    'n-resize', 'e-resize', 's-resize', 'w-resize',
    'ne-resize', 'nw-resize', 'se-resize', 'sw-resize',
    'pointer', 'progress', 'not-allowed', 'no-drop', 'vertical-text', 'all-scroll',
    'col-resize', 'row-resize'
];

var POSITION_SAFE_VALUE = [
    'static', 'relative', 'absolute', 'fixed'
];

var NEEDLESS_TABLE = {
    'border-width': ['border'],
    'border-style': ['border'],
    'border-color': ['border'],
    'border-top': ['border'],
    'border-right': ['border'],
    'border-bottom': ['border'],
    'border-left': ['border'],
    'border-top-width': ['border-top', 'border-width', 'border'],
    'border-right-width': ['border-right', 'border-width', 'border'],
    'border-bottom-width': ['border-bottom', 'border-width', 'border'],
    'border-left-width': ['border-left', 'border-width', 'border'],
    'border-top-style': ['border-top', 'border-style', 'border'],
    'border-right-style': ['border-right', 'border-style', 'border'],
    'border-bottom-style': ['border-bottom', 'border-style', 'border'],
    'border-left-style': ['border-left', 'border-style', 'border'],
    'border-top-color': ['border-top', 'border-color', 'border'],
    'border-right-color': ['border-right', 'border-color', 'border'],
    'border-bottom-color': ['border-bottom', 'border-color', 'border'],
    'border-left-color': ['border-left', 'border-color', 'border'],
    'margin-top': ['margin'],
    'margin-right': ['margin'],
    'margin-bottom': ['margin'],
    'margin-left': ['margin'],
    'padding-top': ['padding'],
    'padding-right': ['padding'],
    'padding-bottom': ['padding'],
    'padding-left': ['padding'],
    'font-style': ['font'],
    'font-variant': ['font'],
    'font-weight': ['font'],
    'font-size': ['font'],
    'font-family': ['font'],
    'list-style-type': ['list-style'],
    'list-style-position': ['list-style'],
    'list-style-image': ['list-style']
};

function getPropertyFingerprint(propertyName, declaration, fingerprints) {
    var realName = resolveProperty(propertyName).basename;

    if (realName === 'background') {
        return propertyName + ':' + generate(declaration.value);
    }

    var declarationId = declaration.id;
    var fingerprint = fingerprints[declarationId];

    if (!fingerprint) {
        switch (declaration.value.type) {
            case 'Value':
                var vendorId = '';
                var iehack = '';
                var special = {};
                var raw = false;

                declaration.value.children.each(function walk(node) {
                    switch (node.type) {
                        case 'Value':
                        case 'Brackets':
                        case 'Parentheses':
                            node.children.each(walk);
                            break;

                        case 'Raw':
                            raw = true;
                            break;

                        case 'Identifier':
                            var name = node.name;

                            if (!vendorId) {
                                vendorId = resolveKeyword(name).vendor;
                            }

                            if (/\\[09]/.test(name)) {
                                iehack = RegExp.lastMatch;
                            }

                            if (realName === 'cursor') {
                                if (CURSOR_SAFE_VALUE.indexOf(name) === -1) {
                                    special[name] = true;
                                }
                            } else if (realName === 'position') {
                                if (POSITION_SAFE_VALUE.indexOf(name) === -1) {
                                    special[name] = true;
                                }
                            } else if (DONT_MIX_VALUE.hasOwnProperty(realName)) {
                                if (DONT_MIX_VALUE[realName].test(name)) {
                                    special[name] = true;
                                }
                            }

                            break;

                        case 'Function':
                            var name = node.name;

                            if (!vendorId) {
                                vendorId = resolveKeyword(name).vendor;
                            }

                            if (name === 'rect') {
                                // there are 2 forms of rect:
                                //   rect(<top>, <right>, <bottom>, <left>) - standart
                                //   rect(<top> <right> <bottom> <left>) – backwards compatible syntax
                                // only the same form values can be merged
                                var hasComma = node.children.some(function(node) {
                                    return node.type === 'Operator' && node.value === ',';
                                });
                                if (!hasComma) {
                                    name = 'rect-backward';
                                }
                            }

                            special[name + '()'] = true;

                            // check nested tokens too
                            node.children.each(walk);

                            break;

                        case 'Dimension':
                            var unit = node.unit;

                            switch (unit) {
                                // is not supported until IE11
                                case 'rem':

                                // v* units is too buggy across browsers and better
                                // don't merge values with those units
                                case 'vw':
                                case 'vh':
                                case 'vmin':
                                case 'vmax':
                                case 'vm': // IE9 supporting "vm" instead of "vmin".
                                    special[unit] = true;
                                    break;
                            }
                            break;
                    }
                });

                fingerprint = raw
                    ? '!' + fingerprintId++
                    : '!' + Object.keys(special).sort() + '|' + iehack + vendorId;
                break;

            case 'Raw':
                fingerprint = '!' + declaration.value.value;
                break;

            default:
                fingerprint = generate(declaration.value);
        }

        fingerprints[declarationId] = fingerprint;
    }

    return propertyName + fingerprint;
}

function needless(props, declaration, fingerprints) {
    var property = resolveProperty(declaration.property);

    if (NEEDLESS_TABLE.hasOwnProperty(property.basename)) {
        var table = NEEDLESS_TABLE[property.basename];

        for (var i = 0; i < table.length; i++) {
            var ppre = getPropertyFingerprint(property.prefix + table[i], declaration, fingerprints);
            var prev = props.hasOwnProperty(ppre) ? props[ppre] : null;

            if (prev && (!declaration.important || prev.item.data.important)) {
                return prev;
            }
        }
    }
}

function processRule(rule, item, list, props, fingerprints) {
    var declarations = rule.block.children;

    declarations.eachRight(function(declaration, declarationItem) {
        var property = declaration.property;
        var fingerprint = getPropertyFingerprint(property, declaration, fingerprints);
        var prev = props[fingerprint];

        if (prev && !dontRestructure.hasOwnProperty(property)) {
            if (declaration.important && !prev.item.data.important) {
                props[fingerprint] = {
                    block: declarations,
                    item: declarationItem
                };

                prev.block.remove(prev.item);

                // TODO: use it when we can refer to several points in source
                // declaration.loc = {
                //     primary: declaration.loc,
                //     merged: prev.item.data.loc
                // };
            } else {
                declarations.remove(declarationItem);

                // TODO: use it when we can refer to several points in source
                // prev.item.data.loc = {
                //     primary: prev.item.data.loc,
                //     merged: declaration.loc
                // };
            }
        } else {
            var prev = needless(props, declaration, fingerprints);

            if (prev) {
                declarations.remove(declarationItem);

                // TODO: use it when we can refer to several points in source
                // prev.item.data.loc = {
                //     primary: prev.item.data.loc,
                //     merged: declaration.loc
                // };
            } else {
                declaration.fingerprint = fingerprint;

                props[fingerprint] = {
                    block: declarations,
                    item: declarationItem
                };
            }
        }
    });

    if (declarations.isEmpty()) {
        list.remove(item);
    }
}

module.exports = function restructBlock(ast) {
    var stylesheetMap = {};
    var fingerprints = Object.create(null);

    walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: function(node, item, list) {
            var stylesheet = this.block || this.stylesheet;
            var ruleId = (node.pseudoSignature || '') + '|' + node.prelude.children.first().id;
            var ruleMap;
            var props;

            if (!stylesheetMap.hasOwnProperty(stylesheet.id)) {
                ruleMap = {};
                stylesheetMap[stylesheet.id] = ruleMap;
            } else {
                ruleMap = stylesheetMap[stylesheet.id];
            }

            if (ruleMap.hasOwnProperty(ruleId)) {
                props = ruleMap[ruleId];
            } else {
                props = {};
                ruleMap[ruleId] = props;
            }

            processRule.call(this, node, item, list, props, fingerprints);
        }
    });
};


/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

var walk = __webpack_require__(3).walk;
var utils = __webpack_require__(156);

/*
    At this step all rules has single simple selector. We try to join by equal
    declaration blocks to first rule, e.g.

    .a { color: red }
    b { ... }
    .b { color: red }
    ->
    .a, .b { color: red }
    b { ... }
*/

function processRule(node, item, list) {
    var selectors = node.prelude.children;
    var declarations = node.block.children;
    var nodeCompareMarker = selectors.first().compareMarker;
    var skippedCompareMarkers = {};

    list.nextUntil(item.next, function(next, nextItem) {
        // skip non-ruleset node if safe
        if (next.type !== 'Rule') {
            return utils.unsafeToSkipNode.call(selectors, next);
        }

        if (node.pseudoSignature !== next.pseudoSignature) {
            return true;
        }

        var nextFirstSelector = next.prelude.children.head;
        var nextDeclarations = next.block.children;
        var nextCompareMarker = nextFirstSelector.data.compareMarker;

        // if next ruleset has same marked as one of skipped then stop joining
        if (nextCompareMarker in skippedCompareMarkers) {
            return true;
        }

        // try to join by selectors
        if (selectors.head === selectors.tail) {
            if (selectors.first().id === nextFirstSelector.data.id) {
                declarations.appendList(nextDeclarations);
                list.remove(nextItem);
                return;
            }
        }

        // try to join by properties
        if (utils.isEqualDeclarations(declarations, nextDeclarations)) {
            var nextStr = nextFirstSelector.data.id;

            selectors.some(function(data, item) {
                var curStr = data.id;

                if (nextStr < curStr) {
                    selectors.insert(nextFirstSelector, item);
                    return true;
                }

                if (!item.next) {
                    selectors.insert(nextFirstSelector);
                    return true;
                }
            });

            list.remove(nextItem);
            return;
        }

        // go to next ruleset if current one can be skipped (has no equal specificity nor element selector)
        if (nextCompareMarker === nodeCompareMarker) {
            return true;
        }

        skippedCompareMarkers[nextCompareMarker] = true;
    });
}

module.exports = function mergeRule(ast) {
    walk(ast, {
        visit: 'Rule',
        enter: processRule
    });
};


/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

var List = __webpack_require__(3).List;
var walk = __webpack_require__(3).walk;
var utils = __webpack_require__(156);

function calcSelectorLength(list) {
    var length = 0;

    list.each(function(data) {
        length += data.id.length + 1;
    });

    return length - 1;
}

function calcDeclarationsLength(tokens) {
    var length = 0;

    for (var i = 0; i < tokens.length; i++) {
        length += tokens[i].length;
    }

    return (
        length +          // declarations
        tokens.length - 1 // delimeters
    );
}

function processRule(node, item, list) {
    var avoidRulesMerge = this.block !== null ? this.block.avoidRulesMerge : false;
    var selectors = node.prelude.children;
    var block = node.block;
    var disallowDownMarkers = Object.create(null);
    var allowMergeUp = true;
    var allowMergeDown = true;

    list.prevUntil(item.prev, function(prev, prevItem) {
        // skip non-ruleset node if safe
        if (prev.type !== 'Rule') {
            return utils.unsafeToSkipNode.call(selectors, prev);
        }

        var prevSelectors = prev.prelude.children;
        var prevBlock = prev.block;

        if (node.pseudoSignature !== prev.pseudoSignature) {
            return true;
        }

        allowMergeDown = !prevSelectors.some(function(selector) {
            return selector.compareMarker in disallowDownMarkers;
        });

        // try prev ruleset if simpleselectors has no equal specifity and element selector
        if (!allowMergeDown && !allowMergeUp) {
            return true;
        }

        // try to join by selectors
        if (allowMergeUp && utils.isEqualSelectors(prevSelectors, selectors)) {
            prevBlock.children.appendList(block.children);
            list.remove(item);
            return true;
        }

        // try to join by properties
        var diff = utils.compareDeclarations(block.children, prevBlock.children);

        // console.log(diff.eq, diff.ne1, diff.ne2);

        if (diff.eq.length) {
            if (!diff.ne1.length && !diff.ne2.length) {
                // equal blocks
                if (allowMergeDown) {
                    utils.addSelectors(selectors, prevSelectors);
                    list.remove(prevItem);
                }

                return true;
            } else if (!avoidRulesMerge) { /* probably we don't need to prevent those merges for @keyframes
                                              TODO: need to be checked */

                if (diff.ne1.length && !diff.ne2.length) {
                    // prevBlock is subset block
                    var selectorLength = calcSelectorLength(selectors);
                    var blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeUp && selectorLength < blockLength) {
                        utils.addSelectors(prevSelectors, selectors);
                        block.children = new List().fromArray(diff.ne1);
                    }
                } else if (!diff.ne1.length && diff.ne2.length) {
                    // node is subset of prevBlock
                    var selectorLength = calcSelectorLength(prevSelectors);
                    var blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    if (allowMergeDown && selectorLength < blockLength) {
                        utils.addSelectors(selectors, prevSelectors);
                        prevBlock.children = new List().fromArray(diff.ne2);
                    }
                } else {
                    // diff.ne1.length && diff.ne2.length
                    // extract equal block
                    var newSelector = {
                        type: 'SelectorList',
                        loc: null,
                        children: utils.addSelectors(prevSelectors.copy(), selectors)
                    };
                    var newBlockLength = calcSelectorLength(newSelector.children) + 2; // selectors length + curly braces length
                    var blockLength = calcDeclarationsLength(diff.eq); // declarations length

                    // create new ruleset if declarations length greater than
                    // ruleset description overhead
                    if (allowMergeDown && blockLength >= newBlockLength) {
                        var newRule = {
                            type: 'Rule',
                            loc: null,
                            prelude: newSelector,
                            block: {
                                type: 'Block',
                                loc: null,
                                children: new List().fromArray(diff.eq)
                            },
                            pseudoSignature: node.pseudoSignature
                        };

                        block.children = new List().fromArray(diff.ne1);
                        prevBlock.children = new List().fromArray(diff.ne2.concat(diff.ne2overrided));
                        list.insert(list.createItem(newRule), prevItem);
                        return true;
                    }
                }
            }
        }

        if (allowMergeUp) {
            // TODO: disallow up merge only if any property interception only (i.e. diff.ne2overrided.length > 0);
            // await property families to find property interception correctly
            allowMergeUp = !prevSelectors.some(function(prevSelector) {
                return selectors.some(function(selector) {
                    return selector.compareMarker === prevSelector.compareMarker;
                });
            });
        }

        prevSelectors.each(function(data) {
            disallowDownMarkers[data.compareMarker] = true;
        });
    });
}

module.exports = function restructRule(ast) {
    walk(ast, {
        visit: 'Rule',
        reverse: true,
        enter: processRule
    });
};


/***/ }),
/* 162 */
/***/ (function(module) {

module.exports = JSON.parse("{\"_from\":\"csso@latest\",\"_id\":\"csso@3.5.1\",\"_inBundle\":false,\"_integrity\":\"sha512-vrqULLffYU1Q2tLdJvaCYbONStnfkfimRxXNaGjxMldI0C7JPBC4rB1RyjhfdZ4m1frm8pM9uRPKH3d2knZ8gg==\",\"_location\":\"/csso\",\"_phantomChildren\":{},\"_requested\":{\"type\":\"tag\",\"registry\":true,\"raw\":\"csso@latest\",\"name\":\"csso\",\"escapedName\":\"csso\",\"rawSpec\":\"latest\",\"saveSpec\":null,\"fetchSpec\":\"latest\"},\"_requiredBy\":[\"#DEV:/\",\"#USER\"],\"_resolved\":\"https://registry.npmjs.org/csso/-/csso-3.5.1.tgz\",\"_shasum\":\"7b9eb8be61628973c1b261e169d2f024008e758b\",\"_spec\":\"csso@latest\",\"_where\":\"/private/var/folders/fq/yx5wtvds0szf462yfjr5bn9h0000gn/T/tmpkYPeB5\",\"author\":{\"name\":\"Sergey Kryzhanovsky\",\"email\":\"skryzhanovsky@ya.ru\",\"url\":\"https://github.com/afelix\"},\"bugs\":{\"url\":\"https://github.com/css/csso/issues\"},\"bundleDependencies\":false,\"dependencies\":{\"css-tree\":\"1.0.0-alpha.29\"},\"deprecated\":false,\"description\":\"CSS minifier with structural optimisations\",\"devDependencies\":{\"browserify\":\"^13.0.0\",\"coveralls\":\"^2.11.6\",\"eslint\":\"^2.2.0\",\"istanbul\":\"^0.4.2\",\"jscs\":\"~3.0.7\",\"mocha\":\"^3.5.3\",\"package-json-versionify\":\"^1.0.4\",\"source-map\":\"^0.5.6\",\"uglify-js\":\"^2.6.1\"},\"engines\":{\"node\":\">=0.10.0\"},\"eslintConfig\":{\"env\":{\"node\":true,\"mocha\":true,\"es6\":true},\"rules\":{\"no-duplicate-case\":2,\"no-undef\":2,\"no-unused-vars\":[2,{\"vars\":\"all\",\"args\":\"after-used\"}]}},\"files\":[\"dist/csso-browser.js\",\"lib\",\"HISTORY.md\",\"LICENSE\",\"README.md\"],\"homepage\":\"https://github.com/css/csso\",\"keywords\":[\"css\",\"compress\",\"minifier\",\"minify\",\"optimise\",\"optimisation\",\"csstree\"],\"license\":\"MIT\",\"main\":\"./lib/index\",\"maintainers\":[{\"name\":\"Roman Dvornov\",\"email\":\"rdvornov@gmail.com\"}],\"name\":\"csso\",\"repository\":{\"type\":\"git\",\"url\":\"git+https://github.com/css/csso.git\"},\"scripts\":{\"browserify\":\"browserify -t package-json-versionify --standalone csso lib/index.js | uglifyjs --compress --mangle -o dist/csso-browser.js\",\"codestyle\":\"jscs lib test && eslint lib test\",\"codestyle-and-test\":\"npm run codestyle && npm test\",\"coverage\":\"istanbul cover _mocha -- -R dot\",\"coveralls\":\"istanbul cover _mocha --report lcovonly -- -R dot && cat ./coverage/lcov.info | coveralls\",\"gh-pages\":\"git clone --depth=1 -b gh-pages https://github.com/css/csso.git .gh-pages && npm run browserify && cp dist/csso-browser.js .gh-pages/ && cd .gh-pages && git commit -am \\\"update\\\" && git push && cd .. && rm -rf .gh-pages\",\"hydrogen\":\"node --trace-hydrogen --trace-phase=Z --trace-deopt --code-comments --hydrogen-track-positions --redirect-code-traces --redirect-code-traces-to=code.asm --trace_hydrogen_file=code.cfg --print-opt-code bin/csso --stat -o /dev/null\",\"postpublish\":\"npm run gh-pages\",\"prepublish\":\"npm run browserify\",\"test\":\"mocha --reporter dot\",\"travis\":\"npm run codestyle-and-test && npm run coveralls\"},\"version\":\"3.5.1\"}");

/***/ })
/******/ ]);
