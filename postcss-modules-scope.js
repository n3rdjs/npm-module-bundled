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


const postcss = __webpack_require__(3);
const selectorParser = __webpack_require__(54);

const hasOwnProperty = Object.prototype.hasOwnProperty;

function getSingleLocalNamesForComposes(root) {
  return root.nodes.map(node => {
    if (node.type !== 'selector' || node.nodes.length !== 1) {
      throw new Error(
        `composition is only allowed when selector is single :local class name not in "${root}"`
      );
    }

    node = node.nodes[0];

    if (
      node.type !== 'pseudo' ||
      node.value !== ':local' ||
      node.nodes.length !== 1
    ) {
      throw new Error(
        'composition is only allowed when selector is single :local class name not in "' +
          root +
          '", "' +
          node +
          '" is weird'
      );
    }

    node = node.first;

    if (node.type !== 'selector' || node.length !== 1) {
      throw new Error(
        'composition is only allowed when selector is single :local class name not in "' +
          root +
          '", "' +
          node +
          '" is weird'
      );
    }

    node = node.first;

    if (node.type !== 'class') {
      // 'id' is not possible, because you can't compose ids
      throw new Error(
        'composition is only allowed when selector is single :local class name not in "' +
          root +
          '", "' +
          node +
          '" is weird'
      );
    }

    return node.value;
  });
}

const whitespace = '[\\x20\\t\\r\\n\\f]';
const unescapeRegExp = new RegExp(
  '\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)',
  'ig'
);

function unescape(str) {
  return str.replace(unescapeRegExp, (_, escaped, escapedWhitespace) => {
    const high = '0x' + escaped - 0x10000;

    // NaN means non-codepoint
    // Workaround erroneous numeric interpretation of +"0x"
    return high !== high || escapedWhitespace
      ? escaped
      : high < 0
        ? // BMP codepoint
          String.fromCharCode(high + 0x10000)
        : // Supplemental Plane codepoint (surrogate pair)
          String.fromCharCode((high >> 10) | 0xd800, (high & 0x3ff) | 0xdc00);
  });
}

const processor = postcss.plugin('postcss-modules-scope', function(options) {
  return css => {
    const generateScopedName =
      (options && options.generateScopedName) || processor.generateScopedName;
    const generateExportEntry =
      (options && options.generateExportEntry) || processor.generateExportEntry;

    const exports = Object.create(null);

    function exportScopedName(name, rawName) {
      const scopedName = generateScopedName(
        rawName ? rawName : name,
        css.source.input.from,
        css.source.input.css
      );
      const exportEntry = generateExportEntry(
        rawName ? rawName : name,
        scopedName,
        css.source.input.from,
        css.source.input.css
      );
      const { key, value } = exportEntry;

      exports[key] = exports[key] || [];

      if (exports[key].indexOf(value) < 0) {
        exports[key].push(value);
      }

      return scopedName;
    }

    function localizeNode(node) {
      switch (node.type) {
        case 'selector':
          node.nodes = node.map(localizeNode);
          return node;
        case 'class':
          return selectorParser.className({
            value: exportScopedName(
              node.value,
              node.raws && node.raws.value ? node.raws.value : null
            ),
          });
        case 'id': {
          return selectorParser.id({
            value: exportScopedName(
              node.value,
              node.raws && node.raws.value ? node.raws.value : null
            ),
          });
        }
      }

      throw new Error(
        `${node.type} ("${node}") is not allowed in a :local block`
      );
    }

    function traverseNode(node) {
      switch (node.type) {
        case 'pseudo':
          if (node.value === ':local') {
            if (node.nodes.length !== 1) {
              throw new Error('Unexpected comma (",") in :local block');
            }

            const selector = localizeNode(node.first, node.spaces);
            // move the spaces that were around the psuedo selector to the first
            // non-container node
            selector.first.spaces = node.spaces;

            node.replaceWith(selector);

            return;
          }
        /* falls through */
        case 'root':
        case 'selector': {
          node.each(traverseNode);
          break;
        }
      }
      return node;
    }

    // Find any :import and remember imported names
    const importedNames = {};

    css.walkRules(rule => {
      if (/^:import\(.+\)$/.test(rule.selector)) {
        rule.walkDecls(decl => {
          importedNames[decl.prop] = true;
        });
      }
    });

    // Find any :local classes
    css.walkRules(rule => {
      if (
        rule.nodes &&
        rule.selector.slice(0, 2) === '--' &&
        rule.selector.slice(-1) === ':'
      ) {
        // ignore custom property set
        return;
      }

      let parsedSelector = selectorParser().astSync(rule);

      rule.selector = traverseNode(parsedSelector.clone()).toString();

      rule.walkDecls(/composes|compose-with/, decl => {
        const localNames = getSingleLocalNamesForComposes(parsedSelector);
        const classes = decl.value.split(/\s+/);

        classes.forEach(className => {
          const global = /^global\(([^\)]+)\)$/.exec(className);

          if (global) {
            localNames.forEach(exportedName => {
              exports[exportedName].push(global[1]);
            });
          } else if (hasOwnProperty.call(importedNames, className)) {
            localNames.forEach(exportedName => {
              exports[exportedName].push(className);
            });
          } else if (hasOwnProperty.call(exports, className)) {
            localNames.forEach(exportedName => {
              exports[className].forEach(item => {
                exports[exportedName].push(item);
              });
            });
          } else {
            throw decl.error(
              `referenced class name "${className}" in ${decl.prop} not found`
            );
          }
        });

        decl.remove();
      });

      rule.walkDecls(decl => {
        let tokens = decl.value.split(/(,|'[^']*'|"[^"]*")/);

        tokens = tokens.map((token, idx) => {
          if (idx === 0 || tokens[idx - 1] === ',') {
            const localMatch = /^(\s*):local\s*\((.+?)\)/.exec(token);

            if (localMatch) {
              return (
                localMatch[1] +
                exportScopedName(localMatch[2]) +
                token.substr(localMatch[0].length)
              );
            } else {
              return token;
            }
          } else {
            return token;
          }
        });

        decl.value = tokens.join('');
      });
    });

    // Find any :local keyframes
    css.walkAtRules(atrule => {
      if (/keyframes$/i.test(atrule.name)) {
        const localMatch = /^\s*:local\s*\((.+?)\)\s*$/.exec(atrule.params);

        if (localMatch) {
          atrule.params = exportScopedName(localMatch[1]);
        }
      }
    });

    // If we found any :locals, insert an :export rule
    const exportedNames = Object.keys(exports);

    if (exportedNames.length > 0) {
      const exportRule = postcss.rule({ selector: ':export' });

      exportedNames.forEach(exportedName =>
        exportRule.append({
          prop: exportedName,
          value: exports[exportedName].join(' '),
          raws: { before: '\n  ' },
        })
      );

      css.append(exportRule);
    }
  };
});

processor.generateScopedName = function(name, path) {
  const sanitisedPath = path
    .replace(/\.[^\.\/\\]+$/, '')
    .replace(/[\W_]+/g, '_')
    .replace(/^_|_$/g, '');

  return `_${sanitisedPath}__${name}`.trim();
};

processor.generateExportEntry = function(name, scopedName) {
  return {
    key: unescape(name),
    value: unescape(scopedName),
  };
};

module.exports = processor;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _declaration = _interopRequireDefault(__webpack_require__(4));

var _processor = _interopRequireDefault(__webpack_require__(39));

var _stringify = _interopRequireDefault(__webpack_require__(38));

var _comment = _interopRequireDefault(__webpack_require__(47));

var _atRule = _interopRequireDefault(__webpack_require__(48));

var _vendor = _interopRequireDefault(__webpack_require__(53));

var _parse = _interopRequireDefault(__webpack_require__(45));

var _list = _interopRequireDefault(__webpack_require__(51));

var _rule = _interopRequireDefault(__webpack_require__(50));

var _root = _interopRequireDefault(__webpack_require__(52));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new {@link Processor} instance that will apply `plugins`
 * as CSS processors.
 *
 * @param {Array.<Plugin|pluginFunction>|Processor} plugins PostCSS plugins.
 *        See {@link Processor#use} for plugin format.
 *
 * @return {Processor} Processor to process multiple CSS.
 *
 * @example
 * import postcss from 'postcss'
 *
 * postcss(plugins).process(css, { from, to }).then(result => {
 *   console.log(result.css)
 * })
 *
 * @namespace postcss
 */
function postcss() {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }

  return new _processor.default(plugins);
}
/**
 * Creates a PostCSS plugin with a standard API.
 *
 * The newly-wrapped function will provide both the name and PostCSS
 * version of the plugin.
 *
 * ```js
 * const processor = postcss([replace])
 * processor.plugins[0].postcssPlugin  //=> 'postcss-replace'
 * processor.plugins[0].postcssVersion //=> '6.0.0'
 * ```
 *
 * The plugin function receives 2 arguments: {@link Root}
 * and {@link Result} instance. The function should mutate the provided
 * `Root` node. Alternatively, you can create a new `Root` node
 * and override the `result.root` property.
 *
 * ```js
 * const cleaner = postcss.plugin('postcss-cleaner', () => {
 *   return (root, result) => {
 *     result.root = postcss.root()
 *   }
 * })
 * ```
 *
 * As a convenience, plugins also expose a `process` method so that you can use
 * them as standalone tools.
 *
 * ```js
 * cleaner.process(css, processOpts, pluginOpts)
 * // This is equivalent to:
 * postcss([ cleaner(pluginOpts) ]).process(css, processOpts)
 * ```
 *
 * Asynchronous plugins should return a `Promise` instance.
 *
 * ```js
 * postcss.plugin('postcss-import', () => {
 *   return (root, result) => {
 *     return new Promise( (resolve, reject) => {
 *       fs.readFile('base.css', (base) => {
 *         root.prepend(base)
 *         resolve()
 *       })
 *     })
 *   }
 * })
 * ```
 *
 * Add warnings using the {@link Node#warn} method.
 * Send data to other plugins using the {@link Result#messages} array.
 *
 * ```js
 * postcss.plugin('postcss-caniuse-test', () => {
 *   return (root, result) => {
 *     root.walkDecls(decl => {
 *       if (!caniuse.support(decl.prop)) {
 *         decl.warn(result, 'Some browsers do not support ' + decl.prop)
 *       }
 *     })
 *   }
 * })
 * ```
 *
 * @param {string} name          PostCSS plugin name. Same as in `name`
 *                               property in `package.json`. It will be saved
 *                               in `plugin.postcssPlugin` property.
 * @param {function} initializer Will receive plugin options
 *                               and should return {@link pluginFunction}
 *
 * @return {Plugin} PostCSS plugin.
 */


postcss.plugin = function plugin(name, initializer) {
  function creator() {
    var transformer = initializer.apply(void 0, arguments);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new _processor.default().version;
    return transformer;
  }

  var cache;
  Object.defineProperty(creator, 'postcss', {
    get: function get() {
      if (!cache) cache = creator();
      return cache;
    }
  });

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts);
  };

  return creator;
};
/**
 * Default function to convert a node tree into a CSS string.
 *
 * @param {Node} node       Start node for stringifing. Usually {@link Root}.
 * @param {builder} builder Function to concatenate CSS from node’s parts
 *                          or generate string and source map.
 *
 * @return {void}
 *
 * @function
 */


postcss.stringify = _stringify.default;
/**
 * Parses source css and returns a new {@link Root} node,
 * which contains the source CSS nodes.
 *
 * @param {string|toString} css   String with input CSS or any object
 *                                with toString() method, like a Buffer
 * @param {processOptions} [opts] Options with only `from` and `map` keys.
 *
 * @return {Root} PostCSS AST.
 *
 * @example
 * // Simple CSS concatenation with source map support
 * const root1 = postcss.parse(css1, { from: file1 })
 * const root2 = postcss.parse(css2, { from: file2 })
 * root1.append(root2).toResult().css
 *
 * @function
 */

postcss.parse = _parse.default;
/**
 * Contains the {@link vendor} module.
 *
 * @type {vendor}
 *
 * @example
 * postcss.vendor.unprefixed('-moz-tab') //=> ['tab']
 */

postcss.vendor = _vendor.default;
/**
 * Contains the {@link list} module.
 *
 * @member {list}
 *
 * @example
 * postcss.list.space('5px calc(10% + 5px)') //=> ['5px', 'calc(10% + 5px)']
 */

postcss.list = _list.default;
/**
 * Creates a new {@link Comment} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Comment} New comment node
 *
 * @example
 * postcss.comment({ text: 'test' })
 */

postcss.comment = function (defaults) {
  return new _comment.default(defaults);
};
/**
 * Creates a new {@link AtRule} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {AtRule} new at-rule node
 *
 * @example
 * postcss.atRule({ name: 'charset' }).toString() //=> "@charset"
 */


postcss.atRule = function (defaults) {
  return new _atRule.default(defaults);
};
/**
 * Creates a new {@link Declaration} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Declaration} new declaration node
 *
 * @example
 * postcss.decl({ prop: 'color', value: 'red' }).toString() //=> "color: red"
 */


postcss.decl = function (defaults) {
  return new _declaration.default(defaults);
};
/**
 * Creates a new {@link Rule} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Rule} new rule node
 *
 * @example
 * postcss.rule({ selector: 'a' }).toString() //=> "a {\n}"
 */


postcss.rule = function (defaults) {
  return new _rule.default(defaults);
};
/**
 * Creates a new {@link Root} node.
 *
 * @param {object} [defaults] Properties for the new node.
 *
 * @return {Root} new root node.
 *
 * @example
 * postcss.root({ after: '\n' }).toString() //=> "\n"
 */


postcss.root = function (defaults) {
  return new _root.default(defaults);
};

var _default = postcss;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3Rjc3MuZXM2Il0sIm5hbWVzIjpbInBvc3Rjc3MiLCJwbHVnaW5zIiwibGVuZ3RoIiwiQXJyYXkiLCJpc0FycmF5IiwiUHJvY2Vzc29yIiwicGx1Z2luIiwibmFtZSIsImluaXRpYWxpemVyIiwiY3JlYXRvciIsInRyYW5zZm9ybWVyIiwicG9zdGNzc1BsdWdpbiIsInBvc3Rjc3NWZXJzaW9uIiwidmVyc2lvbiIsImNhY2hlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJwcm9jZXNzIiwiY3NzIiwicHJvY2Vzc09wdHMiLCJwbHVnaW5PcHRzIiwic3RyaW5naWZ5IiwicGFyc2UiLCJ2ZW5kb3IiLCJsaXN0IiwiY29tbWVudCIsImRlZmF1bHRzIiwiQ29tbWVudCIsImF0UnVsZSIsIkF0UnVsZSIsImRlY2wiLCJEZWNsYXJhdGlvbiIsInJ1bGUiLCJSdWxlIiwicm9vdCIsIlJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLFNBQVNBLE9BQVQsR0FBOEI7QUFBQSxvQ0FBVEMsT0FBUztBQUFUQSxJQUFBQSxPQUFTO0FBQUE7O0FBQzVCLE1BQUlBLE9BQU8sQ0FBQ0MsTUFBUixLQUFtQixDQUFuQixJQUF3QkMsS0FBSyxDQUFDQyxPQUFOLENBQWNILE9BQU8sQ0FBQyxDQUFELENBQXJCLENBQTVCLEVBQXVEO0FBQ3JEQSxJQUFBQSxPQUFPLEdBQUdBLE9BQU8sQ0FBQyxDQUFELENBQWpCO0FBQ0Q7O0FBQ0QsU0FBTyxJQUFJSSxrQkFBSixDQUFjSixPQUFkLENBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdFQUQsT0FBTyxDQUFDTSxNQUFSLEdBQWlCLFNBQVNBLE1BQVQsQ0FBaUJDLElBQWpCLEVBQXVCQyxXQUF2QixFQUFvQztBQUNuRCxXQUFTQyxPQUFULEdBQTJCO0FBQ3pCLFFBQUlDLFdBQVcsR0FBR0YsV0FBVyxNQUFYLG1CQUFsQjtBQUNBRSxJQUFBQSxXQUFXLENBQUNDLGFBQVosR0FBNEJKLElBQTVCO0FBQ0FHLElBQUFBLFdBQVcsQ0FBQ0UsY0FBWixHQUE4QixJQUFJUCxrQkFBSixFQUFELENBQWtCUSxPQUEvQztBQUNBLFdBQU9ILFdBQVA7QUFDRDs7QUFFRCxNQUFJSSxLQUFKO0FBQ0FDLEVBQUFBLE1BQU0sQ0FBQ0MsY0FBUCxDQUFzQlAsT0FBdEIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDeENRLElBQUFBLEdBRHdDLGlCQUNqQztBQUNMLFVBQUksQ0FBQ0gsS0FBTCxFQUFZQSxLQUFLLEdBQUdMLE9BQU8sRUFBZjtBQUNaLGFBQU9LLEtBQVA7QUFDRDtBQUp1QyxHQUExQzs7QUFPQUwsRUFBQUEsT0FBTyxDQUFDUyxPQUFSLEdBQWtCLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QkMsVUFBNUIsRUFBd0M7QUFDeEQsV0FBT3JCLE9BQU8sQ0FBQyxDQUFDUyxPQUFPLENBQUNZLFVBQUQsQ0FBUixDQUFELENBQVAsQ0FBK0JILE9BQS9CLENBQXVDQyxHQUF2QyxFQUE0Q0MsV0FBNUMsQ0FBUDtBQUNELEdBRkQ7O0FBSUEsU0FBT1gsT0FBUDtBQUNELENBckJEO0FBdUJBOzs7Ozs7Ozs7Ozs7O0FBV0FULE9BQU8sQ0FBQ3NCLFNBQVIsR0FBb0JBLGtCQUFwQjtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBdEIsT0FBTyxDQUFDdUIsS0FBUixHQUFnQkEsY0FBaEI7QUFFQTs7Ozs7Ozs7O0FBUUF2QixPQUFPLENBQUN3QixNQUFSLEdBQWlCQSxlQUFqQjtBQUVBOzs7Ozs7Ozs7QUFRQXhCLE9BQU8sQ0FBQ3lCLElBQVIsR0FBZUEsYUFBZjtBQUVBOzs7Ozs7Ozs7OztBQVVBekIsT0FBTyxDQUFDMEIsT0FBUixHQUFrQixVQUFBQyxRQUFRO0FBQUEsU0FBSSxJQUFJQyxnQkFBSixDQUFZRCxRQUFaLENBQUo7QUFBQSxDQUExQjtBQUVBOzs7Ozs7Ozs7Ozs7QUFVQTNCLE9BQU8sQ0FBQzZCLE1BQVIsR0FBaUIsVUFBQUYsUUFBUTtBQUFBLFNBQUksSUFBSUcsZUFBSixDQUFXSCxRQUFYLENBQUo7QUFBQSxDQUF6QjtBQUVBOzs7Ozs7Ozs7Ozs7QUFVQTNCLE9BQU8sQ0FBQytCLElBQVIsR0FBZSxVQUFBSixRQUFRO0FBQUEsU0FBSSxJQUFJSyxvQkFBSixDQUFnQkwsUUFBaEIsQ0FBSjtBQUFBLENBQXZCO0FBRUE7Ozs7Ozs7Ozs7OztBQVVBM0IsT0FBTyxDQUFDaUMsSUFBUixHQUFlLFVBQUFOLFFBQVE7QUFBQSxTQUFJLElBQUlPLGFBQUosQ0FBU1AsUUFBVCxDQUFKO0FBQUEsQ0FBdkI7QUFFQTs7Ozs7Ozs7Ozs7O0FBVUEzQixPQUFPLENBQUNtQyxJQUFSLEdBQWUsVUFBQVIsUUFBUTtBQUFBLFNBQUksSUFBSVMsYUFBSixDQUFTVCxRQUFULENBQUo7QUFBQSxDQUF2Qjs7ZUFFZTNCLE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVjbGFyYXRpb24gZnJvbSAnLi9kZWNsYXJhdGlvbidcbmltcG9ydCBQcm9jZXNzb3IgZnJvbSAnLi9wcm9jZXNzb3InXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5J1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi9jb21tZW50J1xuaW1wb3J0IEF0UnVsZSBmcm9tICcuL2F0LXJ1bGUnXG5pbXBvcnQgdmVuZG9yIGZyb20gJy4vdmVuZG9yJ1xuaW1wb3J0IHBhcnNlIGZyb20gJy4vcGFyc2UnXG5pbXBvcnQgbGlzdCBmcm9tICcuL2xpc3QnXG5pbXBvcnQgUnVsZSBmcm9tICcuL3J1bGUnXG5pbXBvcnQgUm9vdCBmcm9tICcuL3Jvb3QnXG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHtAbGluayBQcm9jZXNzb3J9IGluc3RhbmNlIHRoYXQgd2lsbCBhcHBseSBgcGx1Z2luc2BcbiAqIGFzIENTUyBwcm9jZXNzb3JzLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPFBsdWdpbnxwbHVnaW5GdW5jdGlvbj58UHJvY2Vzc29yfSBwbHVnaW5zIFBvc3RDU1MgcGx1Z2lucy5cbiAqICAgICAgICBTZWUge0BsaW5rIFByb2Nlc3NvciN1c2V9IGZvciBwbHVnaW4gZm9ybWF0LlxuICpcbiAqIEByZXR1cm4ge1Byb2Nlc3Nvcn0gUHJvY2Vzc29yIHRvIHByb2Nlc3MgbXVsdGlwbGUgQ1NTLlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgcG9zdGNzcyBmcm9tICdwb3N0Y3NzJ1xuICpcbiAqIHBvc3Rjc3MocGx1Z2lucykucHJvY2Vzcyhjc3MsIHsgZnJvbSwgdG8gfSkudGhlbihyZXN1bHQgPT4ge1xuICogICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICogfSlcbiAqXG4gKiBAbmFtZXNwYWNlIHBvc3Rjc3NcbiAqL1xuZnVuY3Rpb24gcG9zdGNzcyAoLi4ucGx1Z2lucykge1xuICBpZiAocGx1Z2lucy5sZW5ndGggPT09IDEgJiYgQXJyYXkuaXNBcnJheShwbHVnaW5zWzBdKSkge1xuICAgIHBsdWdpbnMgPSBwbHVnaW5zWzBdXG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9jZXNzb3IocGx1Z2lucylcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUG9zdENTUyBwbHVnaW4gd2l0aCBhIHN0YW5kYXJkIEFQSS5cbiAqXG4gKiBUaGUgbmV3bHktd3JhcHBlZCBmdW5jdGlvbiB3aWxsIHByb3ZpZGUgYm90aCB0aGUgbmFtZSBhbmQgUG9zdENTU1xuICogdmVyc2lvbiBvZiB0aGUgcGx1Z2luLlxuICpcbiAqIGBgYGpzXG4gKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKFtyZXBsYWNlXSlcbiAqIHByb2Nlc3Nvci5wbHVnaW5zWzBdLnBvc3Rjc3NQbHVnaW4gIC8vPT4gJ3Bvc3Rjc3MtcmVwbGFjZSdcbiAqIHByb2Nlc3Nvci5wbHVnaW5zWzBdLnBvc3Rjc3NWZXJzaW9uIC8vPT4gJzYuMC4wJ1xuICogYGBgXG4gKlxuICogVGhlIHBsdWdpbiBmdW5jdGlvbiByZWNlaXZlcyAyIGFyZ3VtZW50czoge0BsaW5rIFJvb3R9XG4gKiBhbmQge0BsaW5rIFJlc3VsdH0gaW5zdGFuY2UuIFRoZSBmdW5jdGlvbiBzaG91bGQgbXV0YXRlIHRoZSBwcm92aWRlZFxuICogYFJvb3RgIG5vZGUuIEFsdGVybmF0aXZlbHksIHlvdSBjYW4gY3JlYXRlIGEgbmV3IGBSb290YCBub2RlXG4gKiBhbmQgb3ZlcnJpZGUgdGhlIGByZXN1bHQucm9vdGAgcHJvcGVydHkuXG4gKlxuICogYGBganNcbiAqIGNvbnN0IGNsZWFuZXIgPSBwb3N0Y3NzLnBsdWdpbigncG9zdGNzcy1jbGVhbmVyJywgKCkgPT4ge1xuICogICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICogICAgIHJlc3VsdC5yb290ID0gcG9zdGNzcy5yb290KClcbiAqICAgfVxuICogfSlcbiAqIGBgYFxuICpcbiAqIEFzIGEgY29udmVuaWVuY2UsIHBsdWdpbnMgYWxzbyBleHBvc2UgYSBgcHJvY2Vzc2AgbWV0aG9kIHNvIHRoYXQgeW91IGNhbiB1c2VcbiAqIHRoZW0gYXMgc3RhbmRhbG9uZSB0b29scy5cbiAqXG4gKiBgYGBqc1xuICogY2xlYW5lci5wcm9jZXNzKGNzcywgcHJvY2Vzc09wdHMsIHBsdWdpbk9wdHMpXG4gKiAvLyBUaGlzIGlzIGVxdWl2YWxlbnQgdG86XG4gKiBwb3N0Y3NzKFsgY2xlYW5lcihwbHVnaW5PcHRzKSBdKS5wcm9jZXNzKGNzcywgcHJvY2Vzc09wdHMpXG4gKiBgYGBcbiAqXG4gKiBBc3luY2hyb25vdXMgcGx1Z2lucyBzaG91bGQgcmV0dXJuIGEgYFByb21pc2VgIGluc3RhbmNlLlxuICpcbiAqIGBgYGpzXG4gKiBwb3N0Y3NzLnBsdWdpbigncG9zdGNzcy1pbXBvcnQnLCAoKSA9PiB7XG4gKiAgIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gKiAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gKiAgICAgICBmcy5yZWFkRmlsZSgnYmFzZS5jc3MnLCAoYmFzZSkgPT4ge1xuICogICAgICAgICByb290LnByZXBlbmQoYmFzZSlcbiAqICAgICAgICAgcmVzb2x2ZSgpXG4gKiAgICAgICB9KVxuICogICAgIH0pXG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBBZGQgd2FybmluZ3MgdXNpbmcgdGhlIHtAbGluayBOb2RlI3dhcm59IG1ldGhvZC5cbiAqIFNlbmQgZGF0YSB0byBvdGhlciBwbHVnaW5zIHVzaW5nIHRoZSB7QGxpbmsgUmVzdWx0I21lc3NhZ2VzfSBhcnJheS5cbiAqXG4gKiBgYGBqc1xuICogcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3MtY2FuaXVzZS10ZXN0JywgKCkgPT4ge1xuICogICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICogICAgIHJvb3Qud2Fsa0RlY2xzKGRlY2wgPT4ge1xuICogICAgICAgaWYgKCFjYW5pdXNlLnN1cHBvcnQoZGVjbC5wcm9wKSkge1xuICogICAgICAgICBkZWNsLndhcm4ocmVzdWx0LCAnU29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCAnICsgZGVjbC5wcm9wKVxuICogICAgICAgfVxuICogICAgIH0pXG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAgICAgICAgICBQb3N0Q1NTIHBsdWdpbiBuYW1lLiBTYW1lIGFzIGluIGBuYW1lYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHkgaW4gYHBhY2thZ2UuanNvbmAuIEl0IHdpbGwgYmUgc2F2ZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluIGBwbHVnaW4ucG9zdGNzc1BsdWdpbmAgcHJvcGVydHkuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBpbml0aWFsaXplciBXaWxsIHJlY2VpdmUgcGx1Z2luIG9wdGlvbnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBzaG91bGQgcmV0dXJuIHtAbGluayBwbHVnaW5GdW5jdGlvbn1cbiAqXG4gKiBAcmV0dXJuIHtQbHVnaW59IFBvc3RDU1MgcGx1Z2luLlxuICovXG5wb3N0Y3NzLnBsdWdpbiA9IGZ1bmN0aW9uIHBsdWdpbiAobmFtZSwgaW5pdGlhbGl6ZXIpIHtcbiAgZnVuY3Rpb24gY3JlYXRvciAoLi4uYXJncykge1xuICAgIGxldCB0cmFuc2Zvcm1lciA9IGluaXRpYWxpemVyKC4uLmFyZ3MpXG4gICAgdHJhbnNmb3JtZXIucG9zdGNzc1BsdWdpbiA9IG5hbWVcbiAgICB0cmFuc2Zvcm1lci5wb3N0Y3NzVmVyc2lvbiA9IChuZXcgUHJvY2Vzc29yKCkpLnZlcnNpb25cbiAgICByZXR1cm4gdHJhbnNmb3JtZXJcbiAgfVxuXG4gIGxldCBjYWNoZVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY3JlYXRvciwgJ3Bvc3Rjc3MnLCB7XG4gICAgZ2V0ICgpIHtcbiAgICAgIGlmICghY2FjaGUpIGNhY2hlID0gY3JlYXRvcigpXG4gICAgICByZXR1cm4gY2FjaGVcbiAgICB9XG4gIH0pXG5cbiAgY3JlYXRvci5wcm9jZXNzID0gZnVuY3Rpb24gKGNzcywgcHJvY2Vzc09wdHMsIHBsdWdpbk9wdHMpIHtcbiAgICByZXR1cm4gcG9zdGNzcyhbY3JlYXRvcihwbHVnaW5PcHRzKV0pLnByb2Nlc3MoY3NzLCBwcm9jZXNzT3B0cylcbiAgfVxuXG4gIHJldHVybiBjcmVhdG9yXG59XG5cbi8qKlxuICogRGVmYXVsdCBmdW5jdGlvbiB0byBjb252ZXJ0IGEgbm9kZSB0cmVlIGludG8gYSBDU1Mgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICAgICBTdGFydCBub2RlIGZvciBzdHJpbmdpZmluZy4gVXN1YWxseSB7QGxpbmsgUm9vdH0uXG4gKiBAcGFyYW0ge2J1aWxkZXJ9IGJ1aWxkZXIgRnVuY3Rpb24gdG8gY29uY2F0ZW5hdGUgQ1NTIGZyb20gbm9kZeKAmXMgcGFydHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBvciBnZW5lcmF0ZSBzdHJpbmcgYW5kIHNvdXJjZSBtYXAuXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xucG9zdGNzcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnlcblxuLyoqXG4gKiBQYXJzZXMgc291cmNlIGNzcyBhbmQgcmV0dXJucyBhIG5ldyB7QGxpbmsgUm9vdH0gbm9kZSxcbiAqIHdoaWNoIGNvbnRhaW5zIHRoZSBzb3VyY2UgQ1NTIG5vZGVzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHRvU3RyaW5nfSBjc3MgICBTdHJpbmcgd2l0aCBpbnB1dCBDU1Mgb3IgYW55IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggdG9TdHJpbmcoKSBtZXRob2QsIGxpa2UgYSBCdWZmZXJcbiAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSBPcHRpb25zIHdpdGggb25seSBgZnJvbWAgYW5kIGBtYXBgIGtleXMuXG4gKlxuICogQHJldHVybiB7Um9vdH0gUG9zdENTUyBBU1QuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFNpbXBsZSBDU1MgY29uY2F0ZW5hdGlvbiB3aXRoIHNvdXJjZSBtYXAgc3VwcG9ydFxuICogY29uc3Qgcm9vdDEgPSBwb3N0Y3NzLnBhcnNlKGNzczEsIHsgZnJvbTogZmlsZTEgfSlcbiAqIGNvbnN0IHJvb3QyID0gcG9zdGNzcy5wYXJzZShjc3MyLCB7IGZyb206IGZpbGUyIH0pXG4gKiByb290MS5hcHBlbmQocm9vdDIpLnRvUmVzdWx0KCkuY3NzXG4gKlxuICogQGZ1bmN0aW9uXG4gKi9cbnBvc3Rjc3MucGFyc2UgPSBwYXJzZVxuXG4vKipcbiAqIENvbnRhaW5zIHRoZSB7QGxpbmsgdmVuZG9yfSBtb2R1bGUuXG4gKlxuICogQHR5cGUge3ZlbmRvcn1cbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy52ZW5kb3IudW5wcmVmaXhlZCgnLW1vei10YWInKSAvLz0+IFsndGFiJ11cbiAqL1xucG9zdGNzcy52ZW5kb3IgPSB2ZW5kb3JcblxuLyoqXG4gKiBDb250YWlucyB0aGUge0BsaW5rIGxpc3R9IG1vZHVsZS5cbiAqXG4gKiBAbWVtYmVyIHtsaXN0fVxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLmxpc3Quc3BhY2UoJzVweCBjYWxjKDEwJSArIDVweCknKSAvLz0+IFsnNXB4JywgJ2NhbGMoMTAlICsgNXB4KSddXG4gKi9cbnBvc3Rjc3MubGlzdCA9IGxpc3RcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBDb21tZW50fSBub2RlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVmYXVsdHNdIFByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtDb21tZW50fSBOZXcgY29tbWVudCBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuY29tbWVudCh7IHRleHQ6ICd0ZXN0JyB9KVxuICovXG5wb3N0Y3NzLmNvbW1lbnQgPSBkZWZhdWx0cyA9PiBuZXcgQ29tbWVudChkZWZhdWx0cylcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBBdFJ1bGV9IG5vZGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtkZWZhdWx0c10gUHJvcGVydGllcyBmb3IgdGhlIG5ldyBub2RlLlxuICpcbiAqIEByZXR1cm4ge0F0UnVsZX0gbmV3IGF0LXJ1bGUgbm9kZVxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLmF0UnVsZSh7IG5hbWU6ICdjaGFyc2V0JyB9KS50b1N0cmluZygpIC8vPT4gXCJAY2hhcnNldFwiXG4gKi9cbnBvc3Rjc3MuYXRSdWxlID0gZGVmYXVsdHMgPT4gbmV3IEF0UnVsZShkZWZhdWx0cylcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBEZWNsYXJhdGlvbn0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSBQcm9wZXJ0aWVzIGZvciB0aGUgbmV3IG5vZGUuXG4gKlxuICogQHJldHVybiB7RGVjbGFyYXRpb259IG5ldyBkZWNsYXJhdGlvbiBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuZGVjbCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAncmVkJyB9KS50b1N0cmluZygpIC8vPT4gXCJjb2xvcjogcmVkXCJcbiAqL1xucG9zdGNzcy5kZWNsID0gZGVmYXVsdHMgPT4gbmV3IERlY2xhcmF0aW9uKGRlZmF1bHRzKVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIFJ1bGV9IG5vZGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtkZWZhdWx0c10gUHJvcGVydGllcyBmb3IgdGhlIG5ldyBub2RlLlxuICpcbiAqIEByZXR1cm4ge1J1bGV9IG5ldyBydWxlIG5vZGVcbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy5ydWxlKHsgc2VsZWN0b3I6ICdhJyB9KS50b1N0cmluZygpIC8vPT4gXCJhIHtcXG59XCJcbiAqL1xucG9zdGNzcy5ydWxlID0gZGVmYXVsdHMgPT4gbmV3IFJ1bGUoZGVmYXVsdHMpXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgUm9vdH0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSBQcm9wZXJ0aWVzIGZvciB0aGUgbmV3IG5vZGUuXG4gKlxuICogQHJldHVybiB7Um9vdH0gbmV3IHJvb3Qgbm9kZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy5yb290KHsgYWZ0ZXI6ICdcXG4nIH0pLnRvU3RyaW5nKCkgLy89PiBcIlxcblwiXG4gKi9cbnBvc3Rjc3Mucm9vdCA9IGRlZmF1bHRzID0+IG5ldyBSb290KGRlZmF1bHRzKVxuXG5leHBvcnQgZGVmYXVsdCBwb3N0Y3NzXG4iXSwiZmlsZSI6InBvc3Rjc3MuanMifQ==


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a CSS declaration.
 *
 * @extends Node
 *
 * @example
 * const root = postcss.parse('a { color: black }')
 * const decl = root.first.first
 * decl.type       //=> 'decl'
 * decl.toString() //=> ' color: black'
 */
var Declaration =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Declaration, _Node);

  function Declaration(defaults) {
    var _this;

    _this = _Node.call(this, defaults) || this;
    _this.type = 'decl';
    return _this;
  }
  /**
   * @memberof Declaration#
   * @member {string} prop The declaration’s property name.
   *
   * @example
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first.first
   * decl.prop //=> 'color'
   */

  /**
   * @memberof Declaration#
   * @member {string} value The declaration’s value.
   *
   * @example
   * const root = postcss.parse('a { color: black }')
   * const decl = root.first.first
   * decl.value //=> 'black'
   */

  /**
   * @memberof Declaration#
   * @member {boolean} important `true` if the declaration
   *                             has an !important annotation.
   *
   * @example
   * const root = postcss.parse('a { color: black !important; color: red }')
   * root.first.first.important //=> true
   * root.first.last.important  //=> undefined
   */

  /**
   * @memberof Declaration#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `between`: the symbols between the property and value
   *   for declarations.
   * * `important`: the content of the important statement,
   *   if it is not just `!important`.
   *
   * PostCSS cleans declaration from comments and extra spaces,
   * but it stores origin content in raws properties.
   * As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('a {\n  color:black\n}')
   * root.first.first.raws //=> { before: '\n  ', between: ':' }
   */


  return Declaration;
}(_node.default);

var _default = Declaration;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlY2xhcmF0aW9uLmVzNiJdLCJuYW1lcyI6WyJEZWNsYXJhdGlvbiIsImRlZmF1bHRzIiwidHlwZSIsIk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7Ozs7Ozs7OztJQVdNQSxXOzs7OztBQUNKLHVCQUFhQyxRQUFiLEVBQXVCO0FBQUE7O0FBQ3JCLDZCQUFNQSxRQUFOO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLE1BQVo7QUFGcUI7QUFHdEI7QUFFRDs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXJDd0JDLGE7O2VBK0RYSCxXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJ1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBDU1MgZGVjbGFyYXRpb24uXG4gKlxuICogQGV4dGVuZHMgTm9kZVxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayB9JylcbiAqIGNvbnN0IGRlY2wgPSByb290LmZpcnN0LmZpcnN0XG4gKiBkZWNsLnR5cGUgICAgICAgLy89PiAnZGVjbCdcbiAqIGRlY2wudG9TdHJpbmcoKSAvLz0+ICcgY29sb3I6IGJsYWNrJ1xuICovXG5jbGFzcyBEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvciAoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAnZGVjbCdcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAqIEBtZW1iZXIge3N0cmluZ30gcHJvcCBUaGUgZGVjbGFyYXRpb27igJlzIHByb3BlcnR5IG5hbWUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrIH0nKVxuICAgKiBjb25zdCBkZWNsID0gcm9vdC5maXJzdC5maXJzdFxuICAgKiBkZWNsLnByb3AgLy89PiAnY29sb3InXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAqIEBtZW1iZXIge3N0cmluZ30gdmFsdWUgVGhlIGRlY2xhcmF0aW9u4oCZcyB2YWx1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2EgeyBjb2xvcjogYmxhY2sgfScpXG4gICAqIGNvbnN0IGRlY2wgPSByb290LmZpcnN0LmZpcnN0XG4gICAqIGRlY2wudmFsdWUgLy89PiAnYmxhY2snXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgRGVjbGFyYXRpb24jXG4gICAqIEBtZW1iZXIge2Jvb2xlYW59IGltcG9ydGFudCBgdHJ1ZWAgaWYgdGhlIGRlY2xhcmF0aW9uXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXMgYW4gIWltcG9ydGFudCBhbm5vdGF0aW9uLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayAhaW1wb3J0YW50OyBjb2xvcjogcmVkIH0nKVxuICAgKiByb290LmZpcnN0LmZpcnN0LmltcG9ydGFudCAvLz0+IHRydWVcbiAgICogcm9vdC5maXJzdC5sYXN0LmltcG9ydGFudCAgLy89PiB1bmRlZmluZWRcbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBEZWNsYXJhdGlvbiNcbiAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIEluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGJ5dGUtdG8tYnl0ZSBlcXVhbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAqXG4gICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAqXG4gICAqICogYGJlZm9yZWA6IHRoZSBzcGFjZSBzeW1ib2xzIGJlZm9yZSB0aGUgbm9kZS4gSXQgYWxzbyBzdG9yZXMgYCpgXG4gICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgKiAqIGBiZXR3ZWVuYDogdGhlIHN5bWJvbHMgYmV0d2VlbiB0aGUgcHJvcGVydHkgYW5kIHZhbHVlXG4gICAqICAgZm9yIGRlY2xhcmF0aW9ucy5cbiAgICogKiBgaW1wb3J0YW50YDogdGhlIGNvbnRlbnQgb2YgdGhlIGltcG9ydGFudCBzdGF0ZW1lbnQsXG4gICAqICAgaWYgaXQgaXMgbm90IGp1c3QgYCFpbXBvcnRhbnRgLlxuICAgKlxuICAgKiBQb3N0Q1NTIGNsZWFucyBkZWNsYXJhdGlvbiBmcm9tIGNvbW1lbnRzIGFuZCBleHRyYSBzcGFjZXMsXG4gICAqIGJ1dCBpdCBzdG9yZXMgb3JpZ2luIGNvbnRlbnQgaW4gcmF3cyBwcm9wZXJ0aWVzLlxuICAgKiBBcyBzdWNoLCBpZiB5b3UgZG9u4oCZdCBjaGFuZ2UgYSBkZWNsYXJhdGlvbuKAmXMgdmFsdWUsXG4gICAqIFBvc3RDU1Mgd2lsbCB1c2UgdGhlIHJhdyB2YWx1ZSB3aXRoIGNvbW1lbnRzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7XFxuICBjb2xvcjpibGFja1xcbn0nKVxuICAgKiByb290LmZpcnN0LmZpcnN0LnJhd3MgLy89PiB7IGJlZm9yZTogJ1xcbiAgJywgYmV0d2VlbjogJzonIH1cbiAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IERlY2xhcmF0aW9uXG4iXSwiZmlsZSI6ImRlY2xhcmF0aW9uLmpzIn0=


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _cssSyntaxError = _interopRequireDefault(__webpack_require__(6));

var _stringifier = _interopRequireDefault(__webpack_require__(37));

var _stringify = _interopRequireDefault(__webpack_require__(38));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneNode(obj, parent) {
  var cloned = new obj.constructor();

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    var value = obj[i];
    var type = typeof value;

    if (i === 'parent' && type === 'object') {
      if (parent) cloned[i] = parent;
    } else if (i === 'source') {
      cloned[i] = value;
    } else if (value instanceof Array) {
      cloned[i] = value.map(function (j) {
        return cloneNode(j, cloned);
      });
    } else {
      if (type === 'object' && value !== null) value = cloneNode(value);
      cloned[i] = value;
    }
  }

  return cloned;
}
/**
 * All node classes inherit the following common methods.
 *
 * @abstract
 */


var Node =
/*#__PURE__*/
function () {
  /**
   * @param {object} [defaults] Value for node properties.
   */
  function Node(defaults) {
    if (defaults === void 0) {
      defaults = {};
    }

    this.raws = {};

    if (true) {
      if (typeof defaults !== 'object' && typeof defaults !== 'undefined') {
        throw new Error('PostCSS nodes constructor accepts object, not ' + JSON.stringify(defaults));
      }
    }

    for (var name in defaults) {
      this[name] = defaults[name];
    }
  }
  /**
   * Returns a `CssSyntaxError` instance containing the original position
   * of the node in the source, showing line and column numbers and also
   * a small excerpt to facilitate debugging.
   *
   * If present, an input source map will be used to get the original position
   * of the source, even from a previous compilation step
   * (e.g., from Sass compilation).
   *
   * This method produces very useful error messages.
   *
   * @param {string} message     Error description.
   * @param {object} [opts]      Options.
   * @param {string} opts.plugin Plugin name that created this error.
   *                             PostCSS will set it automatically.
   * @param {string} opts.word   A word inside a node’s string that should
   *                             be highlighted as the source of the error.
   * @param {number} opts.index  An index inside a node’s string that should
   *                             be highlighted as the source of the error.
   *
   * @return {CssSyntaxError} Error object to throw it.
   *
   * @example
   * if (!variables[name]) {
   *   throw decl.error('Unknown variable ' + name, { word: name })
   *   // CssSyntaxError: postcss-vars:a.sass:4:3: Unknown variable $black
   *   //   color: $black
   *   // a
   *   //          ^
   *   //   background: white
   * }
   */


  var _proto = Node.prototype;

  _proto.error = function error(message, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (this.source) {
      var pos = this.positionBy(opts);
      return this.source.input.error(message, pos.line, pos.column, opts);
    }

    return new _cssSyntaxError.default(message);
  }
  /**
   * This method is provided as a convenience wrapper for {@link Result#warn}.
   *
   * @param {Result} result      The {@link Result} instance
   *                             that will receive the warning.
   * @param {string} text        Warning message.
   * @param {object} [opts]      Options
   * @param {string} opts.plugin Plugin name that created this warning.
   *                             PostCSS will set it automatically.
   * @param {string} opts.word   A word inside a node’s string that should
   *                             be highlighted as the source of the warning.
   * @param {number} opts.index  An index inside a node’s string that should
   *                             be highlighted as the source of the warning.
   *
   * @return {Warning} Created warning object.
   *
   * @example
   * const plugin = postcss.plugin('postcss-deprecated', () => {
   *   return (root, result) => {
   *     root.walkDecls('bad', decl => {
   *       decl.warn(result, 'Deprecated property bad')
   *     })
   *   }
   * })
   */
  ;

  _proto.warn = function warn(result, text, opts) {
    var data = {
      node: this
    };

    for (var i in opts) {
      data[i] = opts[i];
    }

    return result.warn(text, data);
  }
  /**
   * Removes the node from its parent and cleans the parent properties
   * from the node and its children.
   *
   * @example
   * if (decl.prop.match(/^-webkit-/)) {
   *   decl.remove()
   * }
   *
   * @return {Node} Node to make calls chain.
   */
  ;

  _proto.remove = function remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.parent = undefined;
    return this;
  }
  /**
   * Returns a CSS string representing the node.
   *
   * @param {stringifier|syntax} [stringifier] A syntax to use
   *                                           in string generation.
   *
   * @return {string} CSS string of this node.
   *
   * @example
   * postcss.rule({ selector: 'a' }).toString() //=> "a {}"
   */
  ;

  _proto.toString = function toString(stringifier) {
    if (stringifier === void 0) {
      stringifier = _stringify.default;
    }

    if (stringifier.stringify) stringifier = stringifier.stringify;
    var result = '';
    stringifier(this, function (i) {
      result += i;
    });
    return result;
  }
  /**
   * Returns an exact clone of the node.
   *
   * The resulting cloned node and its (cloned) children will retain
   * code style properties.
   *
   * @param {object} [overrides] New properties to override in the clone.
   *
   * @example
   * decl.raws.before    //=> "\n  "
   * const cloned = decl.clone({ prop: '-moz-' + decl.prop })
   * cloned.raws.before  //=> "\n  "
   * cloned.toString()   //=> -moz-transform: scale(0)
   *
   * @return {Node} Clone of the node.
   */
  ;

  _proto.clone = function clone(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = cloneNode(this);

    for (var name in overrides) {
      cloned[name] = overrides[name];
    }

    return cloned;
  }
  /**
   * Shortcut to clone the node and insert the resulting cloned node
   * before the current node.
   *
   * @param {object} [overrides] Mew properties to override in the clone.
   *
   * @example
   * decl.cloneBefore({ prop: '-moz-' + decl.prop })
   *
   * @return {Node} New node
   */
  ;

  _proto.cloneBefore = function cloneBefore(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = this.clone(overrides);
    this.parent.insertBefore(this, cloned);
    return cloned;
  }
  /**
   * Shortcut to clone the node and insert the resulting cloned node
   * after the current node.
   *
   * @param {object} [overrides] New properties to override in the clone.
   *
   * @return {Node} New node.
   */
  ;

  _proto.cloneAfter = function cloneAfter(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = this.clone(overrides);
    this.parent.insertAfter(this, cloned);
    return cloned;
  }
  /**
   * Inserts node(s) before the current node and removes the current node.
   *
   * @param {...Node} nodes Mode(s) to replace current one.
   *
   * @example
   * if (atrule.name === 'mixin') {
   *   atrule.replaceWith(mixinRules[atrule.params])
   * }
   *
   * @return {Node} Current node to methods chain.
   */
  ;

  _proto.replaceWith = function replaceWith() {
    if (this.parent) {
      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }

      for (var _i = 0, _nodes = nodes; _i < _nodes.length; _i++) {
        var node = _nodes[_i];
        this.parent.insertBefore(this, node);
      }

      this.remove();
    }

    return this;
  }
  /**
   * Returns the next child of the node’s parent.
   * Returns `undefined` if the current node is the last child.
   *
   * @return {Node|undefined} Next node.
   *
   * @example
   * if (comment.text === 'delete next') {
   *   const next = comment.next()
   *   if (next) {
   *     next.remove()
   *   }
   * }
   */
  ;

  _proto.next = function next() {
    if (!this.parent) return undefined;
    var index = this.parent.index(this);
    return this.parent.nodes[index + 1];
  }
  /**
   * Returns the previous child of the node’s parent.
   * Returns `undefined` if the current node is the first child.
   *
   * @return {Node|undefined} Previous node.
   *
   * @example
   * const annotation = decl.prev()
   * if (annotation.type === 'comment') {
   *   readAnnotation(annotation.text)
   * }
   */
  ;

  _proto.prev = function prev() {
    if (!this.parent) return undefined;
    var index = this.parent.index(this);
    return this.parent.nodes[index - 1];
  }
  /**
   * Insert new node before current node to current node’s parent.
   *
   * Just alias for `node.parent.insertBefore(node, add)`.
   *
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * decl.before('content: ""')
   */
  ;

  _proto.before = function before(add) {
    this.parent.insertBefore(this, add);
    return this;
  }
  /**
   * Insert new node after current node to current node’s parent.
   *
   * Just alias for `node.parent.insertAfter(node, add)`.
   *
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * decl.after('color: black')
   */
  ;

  _proto.after = function after(add) {
    this.parent.insertAfter(this, add);
    return this;
  };

  _proto.toJSON = function toJSON() {
    var fixed = {};

    for (var name in this) {
      if (!this.hasOwnProperty(name)) continue;
      if (name === 'parent') continue;
      var value = this[name];

      if (value instanceof Array) {
        fixed[name] = value.map(function (i) {
          if (typeof i === 'object' && i.toJSON) {
            return i.toJSON();
          } else {
            return i;
          }
        });
      } else if (typeof value === 'object' && value.toJSON) {
        fixed[name] = value.toJSON();
      } else {
        fixed[name] = value;
      }
    }

    return fixed;
  }
  /**
   * Returns a {@link Node#raws} value. If the node is missing
   * the code style property (because the node was manually built or cloned),
   * PostCSS will try to autodetect the code style property by looking
   * at other nodes in the tree.
   *
   * @param {string} prop          Name of code style property.
   * @param {string} [defaultType] Name of default value, it can be missed
   *                               if the value is the same as prop.
   *
   * @example
   * const root = postcss.parse('a { background: white }')
   * root.nodes[0].append({ prop: 'color', value: 'black' })
   * root.nodes[0].nodes[1].raws.before   //=> undefined
   * root.nodes[0].nodes[1].raw('before') //=> ' '
   *
   * @return {string} Code style value.
   */
  ;

  _proto.raw = function raw(prop, defaultType) {
    var str = new _stringifier.default();
    return str.raw(this, prop, defaultType);
  }
  /**
   * Finds the Root instance of the node’s tree.
   *
   * @example
   * root.nodes[0].nodes[0].root() === root
   *
   * @return {Root} Root parent.
   */
  ;

  _proto.root = function root() {
    var result = this;

    while (result.parent) {
      result = result.parent;
    }

    return result;
  }
  /**
   * Clear the code style properties for the node and its children.
   *
   * @param {boolean} [keepBetween] Keep the raws.between symbols.
   *
   * @return {undefined}
   *
   * @example
   * node.raws.before  //=> ' '
   * node.cleanRaws()
   * node.raws.before  //=> undefined
   */
  ;

  _proto.cleanRaws = function cleanRaws(keepBetween) {
    delete this.raws.before;
    delete this.raws.after;
    if (!keepBetween) delete this.raws.between;
  };

  _proto.positionInside = function positionInside(index) {
    var string = this.toString();
    var column = this.source.start.column;
    var line = this.source.start.line;

    for (var i = 0; i < index; i++) {
      if (string[i] === '\n') {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }

    return {
      line: line,
      column: column
    };
  };

  _proto.positionBy = function positionBy(opts) {
    var pos = this.source.start;

    if (opts.index) {
      pos = this.positionInside(opts.index);
    } else if (opts.word) {
      var index = this.toString().indexOf(opts.word);
      if (index !== -1) pos = this.positionInside(index);
    }

    return pos;
  }
  /**
   * @memberof Node#
   * @member {string} type String representing the node’s type.
   *                       Possible values are `root`, `atrule`, `rule`,
   *                       `decl`, or `comment`.
   *
   * @example
   * postcss.decl({ prop: 'color', value: 'black' }).type //=> 'decl'
   */

  /**
   * @memberof Node#
   * @member {Container} parent The node’s parent node.
   *
   * @example
   * root.nodes[0].parent === root
   */

  /**
   * @memberof Node#
   * @member {source} source The input source of the node.
   *
   * The property is used in source map generation.
   *
   * If you create a node manually (e.g., with `postcss.decl()`),
   * that node will not have a `source` property and will be absent
   * from the source map. For this reason, the plugin developer should
   * consider cloning nodes to create new ones (in which case the new node’s
   * source will reference the original, cloned node) or setting
   * the `source` property manually.
   *
   * ```js
   * // Bad
   * const prefixed = postcss.decl({
   *   prop: '-moz-' + decl.prop,
   *   value: decl.value
   * })
   *
   * // Good
   * const prefixed = decl.clone({ prop: '-moz-' + decl.prop })
   * ```
   *
   * ```js
   * if (atrule.name === 'add-link') {
   *   const rule = postcss.rule({ selector: 'a', source: atrule.source })
   *   atrule.parent.insertBefore(atrule, rule)
   * }
   * ```
   *
   * @example
   * decl.source.input.from //=> '/home/ai/a.sass'
   * decl.source.start      //=> { line: 10, column: 2 }
   * decl.source.end        //=> { line: 10, column: 12 }
   */

  /**
   * @memberof Node#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `after`: the space symbols after the last child of the node
   *   to the end of the node.
   * * `between`: the symbols between the property and value
   *   for declarations, selector and `{` for rules, or last parameter
   *   and `{` for at-rules.
   * * `semicolon`: contains true if the last child has
   *   an (optional) semicolon.
   * * `afterName`: the space between the at-rule name and its parameters.
   * * `left`: the space symbols between `/*` and the comment’s text.
   * * `right`: the space symbols between the comment’s text
   *   and <code>*&#47;</code>.
   * * `important`: the content of the important statement,
   *   if it is not just `!important`.
   *
   * PostCSS cleans selectors, declaration values and at-rule parameters
   * from comments and extra spaces, but it stores origin content in raws
   * properties. As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('a {\n  color:black\n}')
   * root.first.first.raws //=> { before: '\n  ', between: ':' }
   */
  ;

  return Node;
}();

var _default = Node;
/**
 * @typedef {object} position
 * @property {number} line   Source line in file.
 * @property {number} column Source column in file.
 */

/**
 * @typedef {object} source
 * @property {Input} input    {@link Input} with input file
 * @property {position} start The starting position of the node’s source.
 * @property {position} end   The ending position of the node’s source.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGUuZXM2Il0sIm5hbWVzIjpbImNsb25lTm9kZSIsIm9iaiIsInBhcmVudCIsImNsb25lZCIsImNvbnN0cnVjdG9yIiwiaSIsImhhc093blByb3BlcnR5IiwidmFsdWUiLCJ0eXBlIiwiQXJyYXkiLCJtYXAiLCJqIiwiTm9kZSIsImRlZmF1bHRzIiwicmF3cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJlcnJvciIsIm1lc3NhZ2UiLCJvcHRzIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImlucHV0IiwibGluZSIsImNvbHVtbiIsIkNzc1N5bnRheEVycm9yIiwid2FybiIsInJlc3VsdCIsInRleHQiLCJkYXRhIiwibm9kZSIsInJlbW92ZSIsInJlbW92ZUNoaWxkIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJzdHJpbmdpZmllciIsImNsb25lIiwib3ZlcnJpZGVzIiwiY2xvbmVCZWZvcmUiLCJpbnNlcnRCZWZvcmUiLCJjbG9uZUFmdGVyIiwiaW5zZXJ0QWZ0ZXIiLCJyZXBsYWNlV2l0aCIsIm5vZGVzIiwibmV4dCIsImluZGV4IiwicHJldiIsImJlZm9yZSIsImFkZCIsImFmdGVyIiwidG9KU09OIiwiZml4ZWQiLCJyYXciLCJwcm9wIiwiZGVmYXVsdFR5cGUiLCJzdHIiLCJTdHJpbmdpZmllciIsInJvb3QiLCJjbGVhblJhd3MiLCJrZWVwQmV0d2VlbiIsImJldHdlZW4iLCJwb3NpdGlvbkluc2lkZSIsInN0cmluZyIsInN0YXJ0Iiwid29yZCIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW9CQyxHQUFwQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDL0IsTUFBSUMsTUFBTSxHQUFHLElBQUlGLEdBQUcsQ0FBQ0csV0FBUixFQUFiOztBQUVBLE9BQUssSUFBSUMsQ0FBVCxJQUFjSixHQUFkLEVBQW1C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Li9jc3Mtc3ludGF4LWVycm9yJ1xuaW1wb3J0IFN0cmluZ2lmaWVyIGZyb20gJy4vc3RyaW5naWZpZXInXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5J1xuXG5mdW5jdGlvbiBjbG9uZU5vZGUgKG9iaiwgcGFyZW50KSB7XG4gIGxldCBjbG9uZWQgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKClcblxuICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZVxuICAgIGxldCB2YWx1ZSA9IG9ialtpXVxuICAgIGxldCB0eXBlID0gdHlwZW9mIHZhbHVlXG5cbiAgICBpZiAoaSA9PT0gJ3BhcmVudCcgJiYgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwYXJlbnQpIGNsb25lZFtpXSA9IHBhcmVudFxuICAgIH0gZWxzZSBpZiAoaSA9PT0gJ3NvdXJjZScpIHtcbiAgICAgIGNsb25lZFtpXSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZS5tYXAoaiA9PiBjbG9uZU5vZGUoaiwgY2xvbmVkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB2YWx1ZSA9IGNsb25lTm9kZSh2YWx1ZSlcbiAgICAgIGNsb25lZFtpXSA9IHZhbHVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNsb25lZFxufVxuXG4vKipcbiAqIEFsbCBub2RlIGNsYXNzZXMgaW5oZXJpdCB0aGUgZm9sbG93aW5nIGNvbW1vbiBtZXRob2RzLlxuICpcbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBOb2RlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVmYXVsdHNdIFZhbHVlIGZvciBub2RlIHByb3BlcnRpZXMuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoZGVmYXVsdHMgPSB7IH0pIHtcbiAgICB0aGlzLnJhd3MgPSB7IH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiBkZWZhdWx0cyAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIGRlZmF1bHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Bvc3RDU1Mgbm9kZXMgY29uc3RydWN0b3IgYWNjZXB0cyBvYmplY3QsIG5vdCAnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZWZhdWx0cylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBuYW1lIGluIGRlZmF1bHRzKSB7XG4gICAgICB0aGlzW25hbWVdID0gZGVmYXVsdHNbbmFtZV1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGBDc3NTeW50YXhFcnJvcmAgaW5zdGFuY2UgY29udGFpbmluZyB0aGUgb3JpZ2luYWwgcG9zaXRpb25cbiAgICogb2YgdGhlIG5vZGUgaW4gdGhlIHNvdXJjZSwgc2hvd2luZyBsaW5lIGFuZCBjb2x1bW4gbnVtYmVycyBhbmQgYWxzb1xuICAgKiBhIHNtYWxsIGV4Y2VycHQgdG8gZmFjaWxpdGF0ZSBkZWJ1Z2dpbmcuXG4gICAqXG4gICAqIElmIHByZXNlbnQsIGFuIGlucHV0IHNvdXJjZSBtYXAgd2lsbCBiZSB1c2VkIHRvIGdldCB0aGUgb3JpZ2luYWwgcG9zaXRpb25cbiAgICogb2YgdGhlIHNvdXJjZSwgZXZlbiBmcm9tIGEgcHJldmlvdXMgY29tcGlsYXRpb24gc3RlcFxuICAgKiAoZS5nLiwgZnJvbSBTYXNzIGNvbXBpbGF0aW9uKS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcHJvZHVjZXMgdmVyeSB1c2VmdWwgZXJyb3IgbWVzc2FnZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlICAgICBFcnJvciBkZXNjcmlwdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRzXSAgICAgIE9wdGlvbnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLnBsdWdpbiBQbHVnaW4gbmFtZSB0aGF0IGNyZWF0ZWQgdGhpcyBlcnJvci5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCBzZXQgaXQgYXV0b21hdGljYWxseS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMud29yZCAgIEEgd29yZCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIGVycm9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0cy5pbmRleCAgQW4gaW5kZXggaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBoaWdobGlnaHRlZCBhcyB0aGUgc291cmNlIG9mIHRoZSBlcnJvci5cbiAgICpcbiAgICogQHJldHVybiB7Q3NzU3ludGF4RXJyb3J9IEVycm9yIG9iamVjdCB0byB0aHJvdyBpdC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaWYgKCF2YXJpYWJsZXNbbmFtZV0pIHtcbiAgICogICB0aHJvdyBkZWNsLmVycm9yKCdVbmtub3duIHZhcmlhYmxlICcgKyBuYW1lLCB7IHdvcmQ6IG5hbWUgfSlcbiAgICogICAvLyBDc3NTeW50YXhFcnJvcjogcG9zdGNzcy12YXJzOmEuc2Fzczo0OjM6IFVua25vd24gdmFyaWFibGUgJGJsYWNrXG4gICAqICAgLy8gICBjb2xvcjogJGJsYWNrXG4gICAqICAgLy8gYVxuICAgKiAgIC8vICAgICAgICAgIF5cbiAgICogICAvLyAgIGJhY2tncm91bmQ6IHdoaXRlXG4gICAqIH1cbiAgICovXG4gIGVycm9yIChtZXNzYWdlLCBvcHRzID0geyB9KSB7XG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICBsZXQgcG9zID0gdGhpcy5wb3NpdGlvbkJ5KG9wdHMpXG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2UuaW5wdXQuZXJyb3IobWVzc2FnZSwgcG9zLmxpbmUsIHBvcy5jb2x1bW4sIG9wdHMpXG4gICAgfVxuICAgIHJldHVybiBuZXcgQ3NzU3ludGF4RXJyb3IobWVzc2FnZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwcm92aWRlZCBhcyBhIGNvbnZlbmllbmNlIHdyYXBwZXIgZm9yIHtAbGluayBSZXN1bHQjd2Fybn0uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVzdWx0fSByZXN1bHQgICAgICBUaGUge0BsaW5rIFJlc3VsdH0gaW5zdGFuY2VcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgd2lsbCByZWNlaXZlIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICAgICAgV2FybmluZyBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdHNdICAgICAgT3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wbHVnaW4gUGx1Z2luIG5hbWUgdGhhdCBjcmVhdGVkIHRoaXMgd2FybmluZy5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCBzZXQgaXQgYXV0b21hdGljYWxseS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMud29yZCAgIEEgd29yZCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIHdhcm5pbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICBBbiBpbmRleCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIHdhcm5pbmcuXG4gICAqXG4gICAqIEByZXR1cm4ge1dhcm5pbmd9IENyZWF0ZWQgd2FybmluZyBvYmplY3QuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHBsdWdpbiA9IHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLWRlcHJlY2F0ZWQnLCAoKSA9PiB7XG4gICAqICAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICogICAgIHJvb3Qud2Fsa0RlY2xzKCdiYWQnLCBkZWNsID0+IHtcbiAgICogICAgICAgZGVjbC53YXJuKHJlc3VsdCwgJ0RlcHJlY2F0ZWQgcHJvcGVydHkgYmFkJylcbiAgICogICAgIH0pXG4gICAqICAgfVxuICAgKiB9KVxuICAgKi9cbiAgd2FybiAocmVzdWx0LCB0ZXh0LCBvcHRzKSB7XG4gICAgbGV0IGRhdGEgPSB7IG5vZGU6IHRoaXMgfVxuICAgIGZvciAobGV0IGkgaW4gb3B0cykgZGF0YVtpXSA9IG9wdHNbaV1cbiAgICByZXR1cm4gcmVzdWx0Lndhcm4odGV4dCwgZGF0YSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gaXRzIHBhcmVudCBhbmQgY2xlYW5zIHRoZSBwYXJlbnQgcHJvcGVydGllc1xuICAgKiBmcm9tIHRoZSBub2RlIGFuZCBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGlmIChkZWNsLnByb3AubWF0Y2goL14td2Via2l0LS8pKSB7XG4gICAqICAgZGVjbC5yZW1vdmUoKVxuICAgKiB9XG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IE5vZGUgdG8gbWFrZSBjYWxscyBjaGFpbi5cbiAgICovXG4gIHJlbW92ZSAoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKVxuICAgIH1cbiAgICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENTUyBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ2lmaWVyfHN5bnRheH0gW3N0cmluZ2lmaWVyXSBBIHN5bnRheCB0byB1c2VcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gc3RyaW5nIGdlbmVyYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gQ1NTIHN0cmluZyBvZiB0aGlzIG5vZGUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHBvc3Rjc3MucnVsZSh7IHNlbGVjdG9yOiAnYScgfSkudG9TdHJpbmcoKSAvLz0+IFwiYSB7fVwiXG4gICAqL1xuICB0b1N0cmluZyAoc3RyaW5naWZpZXIgPSBzdHJpbmdpZnkpIHtcbiAgICBpZiAoc3RyaW5naWZpZXIuc3RyaW5naWZ5KSBzdHJpbmdpZmllciA9IHN0cmluZ2lmaWVyLnN0cmluZ2lmeVxuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIHN0cmluZ2lmaWVyKHRoaXMsIGkgPT4ge1xuICAgICAgcmVzdWx0ICs9IGlcbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV4YWN0IGNsb25lIG9mIHRoZSBub2RlLlxuICAgKlxuICAgKiBUaGUgcmVzdWx0aW5nIGNsb25lZCBub2RlIGFuZCBpdHMgKGNsb25lZCkgY2hpbGRyZW4gd2lsbCByZXRhaW5cbiAgICogY29kZSBzdHlsZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gW292ZXJyaWRlc10gTmV3IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgaW4gdGhlIGNsb25lLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBkZWNsLnJhd3MuYmVmb3JlICAgIC8vPT4gXCJcXG4gIFwiXG4gICAqIGNvbnN0IGNsb25lZCA9IGRlY2wuY2xvbmUoeyBwcm9wOiAnLW1vei0nICsgZGVjbC5wcm9wIH0pXG4gICAqIGNsb25lZC5yYXdzLmJlZm9yZSAgLy89PiBcIlxcbiAgXCJcbiAgICogY2xvbmVkLnRvU3RyaW5nKCkgICAvLz0+IC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKVxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBDbG9uZSBvZiB0aGUgbm9kZS5cbiAgICovXG4gIGNsb25lIChvdmVycmlkZXMgPSB7IH0pIHtcbiAgICBsZXQgY2xvbmVkID0gY2xvbmVOb2RlKHRoaXMpXG4gICAgZm9yIChsZXQgbmFtZSBpbiBvdmVycmlkZXMpIHtcbiAgICAgIGNsb25lZFtuYW1lXSA9IG92ZXJyaWRlc1tuYW1lXVxuICAgIH1cbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICAvKipcbiAgICogU2hvcnRjdXQgdG8gY2xvbmUgdGhlIG5vZGUgYW5kIGluc2VydCB0aGUgcmVzdWx0aW5nIGNsb25lZCBub2RlXG4gICAqIGJlZm9yZSB0aGUgY3VycmVudCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gW292ZXJyaWRlc10gTWV3IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgaW4gdGhlIGNsb25lLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBkZWNsLmNsb25lQmVmb3JlKHsgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCB9KVxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBOZXcgbm9kZVxuICAgKi9cbiAgY2xvbmVCZWZvcmUgKG92ZXJyaWRlcyA9IHsgfSkge1xuICAgIGxldCBjbG9uZWQgPSB0aGlzLmNsb25lKG92ZXJyaWRlcylcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgY2xvbmVkKVxuICAgIHJldHVybiBjbG9uZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGN1dCB0byBjbG9uZSB0aGUgbm9kZSBhbmQgaW5zZXJ0IHRoZSByZXN1bHRpbmcgY2xvbmVkIG5vZGVcbiAgICogYWZ0ZXIgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvdmVycmlkZXNdIE5ldyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGluIHRoZSBjbG9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gTmV3IG5vZGUuXG4gICAqL1xuICBjbG9uZUFmdGVyIChvdmVycmlkZXMgPSB7IH0pIHtcbiAgICBsZXQgY2xvbmVkID0gdGhpcy5jbG9uZShvdmVycmlkZXMpXG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgY2xvbmVkKVxuICAgIHJldHVybiBjbG9uZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnRzIG5vZGUocykgYmVmb3JlIHRoZSBjdXJyZW50IG5vZGUgYW5kIHJlbW92ZXMgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHsuLi5Ob2RlfSBub2RlcyBNb2RlKHMpIHRvIHJlcGxhY2UgY3VycmVudCBvbmUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGlmIChhdHJ1bGUubmFtZSA9PT0gJ21peGluJykge1xuICAgKiAgIGF0cnVsZS5yZXBsYWNlV2l0aChtaXhpblJ1bGVzW2F0cnVsZS5wYXJhbXNdKVxuICAgKiB9XG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IEN1cnJlbnQgbm9kZSB0byBtZXRob2RzIGNoYWluLlxuICAgKi9cbiAgcmVwbGFjZVdpdGggKC4uLm5vZGVzKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBub2RlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0IGNoaWxkIG9mIHRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gICAqIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyB0aGUgbGFzdCBjaGlsZC5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZXx1bmRlZmluZWR9IE5leHQgbm9kZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaWYgKGNvbW1lbnQudGV4dCA9PT0gJ2RlbGV0ZSBuZXh0Jykge1xuICAgKiAgIGNvbnN0IG5leHQgPSBjb21tZW50Lm5leHQoKVxuICAgKiAgIGlmIChuZXh0KSB7XG4gICAqICAgICBuZXh0LnJlbW92ZSgpXG4gICAqICAgfVxuICAgKiB9XG4gICAqL1xuICBuZXh0ICgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcylcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQubm9kZXNbaW5kZXggKyAxXVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByZXZpb3VzIGNoaWxkIG9mIHRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gICAqIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyB0aGUgZmlyc3QgY2hpbGQuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV8dW5kZWZpbmVkfSBQcmV2aW91cyBub2RlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBhbm5vdGF0aW9uID0gZGVjbC5wcmV2KClcbiAgICogaWYgKGFubm90YXRpb24udHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAqICAgcmVhZEFubm90YXRpb24oYW5ub3RhdGlvbi50ZXh0KVxuICAgKiB9XG4gICAqL1xuICBwcmV2ICgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcylcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQubm9kZXNbaW5kZXggLSAxXVxuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBuZXcgbm9kZSBiZWZvcmUgY3VycmVudCBub2RlIHRvIGN1cnJlbnQgbm9kZeKAmXMgcGFyZW50LlxuICAgKlxuICAgKiBKdXN0IGFsaWFzIGZvciBgbm9kZS5wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFkZClgLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW119IGFkZCBOZXcgbm9kZS5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBkZWNsLmJlZm9yZSgnY29udGVudDogXCJcIicpXG4gICAqL1xuICBiZWZvcmUgKGFkZCkge1xuICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBhZGQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgbmV3IG5vZGUgYWZ0ZXIgY3VycmVudCBub2RlIHRvIGN1cnJlbnQgbm9kZeKAmXMgcGFyZW50LlxuICAgKlxuICAgKiBKdXN0IGFsaWFzIGZvciBgbm9kZS5wYXJlbnQuaW5zZXJ0QWZ0ZXIobm9kZSwgYWRkKWAuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZXxvYmplY3R8c3RyaW5nfE5vZGVbXX0gYWRkIE5ldyBub2RlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGRlY2wuYWZ0ZXIoJ2NvbG9yOiBibGFjaycpXG4gICAqL1xuICBhZnRlciAoYWRkKSB7XG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgYWRkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0b0pTT04gKCkge1xuICAgIGxldCBmaXhlZCA9IHsgfVxuXG4gICAgZm9yIChsZXQgbmFtZSBpbiB0aGlzKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlXG4gICAgICBpZiAobmFtZSA9PT0gJ3BhcmVudCcpIGNvbnRpbnVlXG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW25hbWVdXG5cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZpeGVkW25hbWVdID0gdmFsdWUubWFwKGkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgaS50b0pTT04pIHtcbiAgICAgICAgICAgIHJldHVybiBpLnRvSlNPTigpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnRvSlNPTikge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLnRvSlNPTigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpeGVkXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHtAbGluayBOb2RlI3Jhd3N9IHZhbHVlLiBJZiB0aGUgbm9kZSBpcyBtaXNzaW5nXG4gICAqIHRoZSBjb2RlIHN0eWxlIHByb3BlcnR5IChiZWNhdXNlIHRoZSBub2RlIHdhcyBtYW51YWxseSBidWlsdCBvciBjbG9uZWQpLFxuICAgKiBQb3N0Q1NTIHdpbGwgdHJ5IHRvIGF1dG9kZXRlY3QgdGhlIGNvZGUgc3R5bGUgcHJvcGVydHkgYnkgbG9va2luZ1xuICAgKiBhdCBvdGhlciBub2RlcyBpbiB0aGUgdHJlZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgICAgICAgICAgTmFtZSBvZiBjb2RlIHN0eWxlIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2RlZmF1bHRUeXBlXSBOYW1lIG9mIGRlZmF1bHQgdmFsdWUsIGl0IGNhbiBiZSBtaXNzZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgdGhlIHZhbHVlIGlzIHRoZSBzYW1lIGFzIHByb3AuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgYmFja2dyb3VuZDogd2hpdGUgfScpXG4gICAqIHJvb3Qubm9kZXNbMF0uYXBwZW5kKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSlcbiAgICogcm9vdC5ub2Rlc1swXS5ub2Rlc1sxXS5yYXdzLmJlZm9yZSAgIC8vPT4gdW5kZWZpbmVkXG4gICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMV0ucmF3KCdiZWZvcmUnKSAvLz0+ICcgJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IENvZGUgc3R5bGUgdmFsdWUuXG4gICAqL1xuICByYXcgKHByb3AsIGRlZmF1bHRUeXBlKSB7XG4gICAgbGV0IHN0ciA9IG5ldyBTdHJpbmdpZmllcigpXG4gICAgcmV0dXJuIHN0ci5yYXcodGhpcywgcHJvcCwgZGVmYXVsdFR5cGUpXG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIFJvb3QgaW5zdGFuY2Ugb2YgdGhlIG5vZGXigJlzIHRyZWUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMF0ucm9vdCgpID09PSByb290XG4gICAqXG4gICAqIEByZXR1cm4ge1Jvb3R9IFJvb3QgcGFyZW50LlxuICAgKi9cbiAgcm9vdCAoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXNcbiAgICB3aGlsZSAocmVzdWx0LnBhcmVudCkgcmVzdWx0ID0gcmVzdWx0LnBhcmVudFxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY29kZSBzdHlsZSBwcm9wZXJ0aWVzIGZvciB0aGUgbm9kZSBhbmQgaXRzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtrZWVwQmV0d2Vlbl0gS2VlcCB0aGUgcmF3cy5iZXR3ZWVuIHN5bWJvbHMuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbm9kZS5yYXdzLmJlZm9yZSAgLy89PiAnICdcbiAgICogbm9kZS5jbGVhblJhd3MoKVxuICAgKiBub2RlLnJhd3MuYmVmb3JlICAvLz0+IHVuZGVmaW5lZFxuICAgKi9cbiAgY2xlYW5SYXdzIChrZWVwQmV0d2Vlbikge1xuICAgIGRlbGV0ZSB0aGlzLnJhd3MuYmVmb3JlXG4gICAgZGVsZXRlIHRoaXMucmF3cy5hZnRlclxuICAgIGlmICgha2VlcEJldHdlZW4pIGRlbGV0ZSB0aGlzLnJhd3MuYmV0d2VlblxuICB9XG5cbiAgcG9zaXRpb25JbnNpZGUgKGluZGV4KSB7XG4gICAgbGV0IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKVxuICAgIGxldCBjb2x1bW4gPSB0aGlzLnNvdXJjZS5zdGFydC5jb2x1bW5cbiAgICBsZXQgbGluZSA9IHRoaXMuc291cmNlLnN0YXJ0LmxpbmVcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgaWYgKHN0cmluZ1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgY29sdW1uID0gMVxuICAgICAgICBsaW5lICs9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbiArPSAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbGluZSwgY29sdW1uIH1cbiAgfVxuXG4gIHBvc2l0aW9uQnkgKG9wdHMpIHtcbiAgICBsZXQgcG9zID0gdGhpcy5zb3VyY2Uuc3RhcnRcbiAgICBpZiAob3B0cy5pbmRleCkge1xuICAgICAgcG9zID0gdGhpcy5wb3NpdGlvbkluc2lkZShvcHRzLmluZGV4KVxuICAgIH0gZWxzZSBpZiAob3B0cy53b3JkKSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLnRvU3RyaW5nKCkuaW5kZXhPZihvcHRzLndvcmQpXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSBwb3MgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKGluZGV4KVxuICAgIH1cbiAgICByZXR1cm4gcG9zXG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAqIEBtZW1iZXIge3N0cmluZ30gdHlwZSBTdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBub2Rl4oCZcyB0eXBlLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgUG9zc2libGUgdmFsdWVzIGFyZSBgcm9vdGAsIGBhdHJ1bGVgLCBgcnVsZWAsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICBgZGVjbGAsIG9yIGBjb21tZW50YC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSkudHlwZSAvLz0+ICdkZWNsJ1xuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAqIEBtZW1iZXIge0NvbnRhaW5lcn0gcGFyZW50IFRoZSBub2Rl4oCZcyBwYXJlbnQgbm9kZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcm9vdC5ub2Rlc1swXS5wYXJlbnQgPT09IHJvb3RcbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBOb2RlI1xuICAgKiBAbWVtYmVyIHtzb3VyY2V9IHNvdXJjZSBUaGUgaW5wdXQgc291cmNlIG9mIHRoZSBub2RlLlxuICAgKlxuICAgKiBUaGUgcHJvcGVydHkgaXMgdXNlZCBpbiBzb3VyY2UgbWFwIGdlbmVyYXRpb24uXG4gICAqXG4gICAqIElmIHlvdSBjcmVhdGUgYSBub2RlIG1hbnVhbGx5IChlLmcuLCB3aXRoIGBwb3N0Y3NzLmRlY2woKWApLFxuICAgKiB0aGF0IG5vZGUgd2lsbCBub3QgaGF2ZSBhIGBzb3VyY2VgIHByb3BlcnR5IGFuZCB3aWxsIGJlIGFic2VudFxuICAgKiBmcm9tIHRoZSBzb3VyY2UgbWFwLiBGb3IgdGhpcyByZWFzb24sIHRoZSBwbHVnaW4gZGV2ZWxvcGVyIHNob3VsZFxuICAgKiBjb25zaWRlciBjbG9uaW5nIG5vZGVzIHRvIGNyZWF0ZSBuZXcgb25lcyAoaW4gd2hpY2ggY2FzZSB0aGUgbmV3IG5vZGXigJlzXG4gICAqIHNvdXJjZSB3aWxsIHJlZmVyZW5jZSB0aGUgb3JpZ2luYWwsIGNsb25lZCBub2RlKSBvciBzZXR0aW5nXG4gICAqIHRoZSBgc291cmNlYCBwcm9wZXJ0eSBtYW51YWxseS5cbiAgICpcbiAgICogYGBganNcbiAgICogLy8gQmFkXG4gICAqIGNvbnN0IHByZWZpeGVkID0gcG9zdGNzcy5kZWNsKHtcbiAgICogICBwcm9wOiAnLW1vei0nICsgZGVjbC5wcm9wLFxuICAgKiAgIHZhbHVlOiBkZWNsLnZhbHVlXG4gICAqIH0pXG4gICAqXG4gICAqIC8vIEdvb2RcbiAgICogY29uc3QgcHJlZml4ZWQgPSBkZWNsLmNsb25lKHsgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCB9KVxuICAgKiBgYGBcbiAgICpcbiAgICogYGBganNcbiAgICogaWYgKGF0cnVsZS5uYW1lID09PSAnYWRkLWxpbmsnKSB7XG4gICAqICAgY29uc3QgcnVsZSA9IHBvc3Rjc3MucnVsZSh7IHNlbGVjdG9yOiAnYScsIHNvdXJjZTogYXRydWxlLnNvdXJjZSB9KVxuICAgKiAgIGF0cnVsZS5wYXJlbnQuaW5zZXJ0QmVmb3JlKGF0cnVsZSwgcnVsZSlcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZGVjbC5zb3VyY2UuaW5wdXQuZnJvbSAvLz0+ICcvaG9tZS9haS9hLnNhc3MnXG4gICAqIGRlY2wuc291cmNlLnN0YXJ0ICAgICAgLy89PiB7IGxpbmU6IDEwLCBjb2x1bW46IDIgfVxuICAgKiBkZWNsLnNvdXJjZS5lbmQgICAgICAgIC8vPT4geyBsaW5lOiAxMCwgY29sdW1uOiAxMiB9XG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgTm9kZSNcbiAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIEluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGJ5dGUtdG8tYnl0ZSBlcXVhbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAqXG4gICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAqXG4gICAqICogYGJlZm9yZWA6IHRoZSBzcGFjZSBzeW1ib2xzIGJlZm9yZSB0aGUgbm9kZS4gSXQgYWxzbyBzdG9yZXMgYCpgXG4gICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgKiAqIGBhZnRlcmA6IHRoZSBzcGFjZSBzeW1ib2xzIGFmdGVyIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBub2RlXG4gICAqICAgdG8gdGhlIGVuZCBvZiB0aGUgbm9kZS5cbiAgICogKiBgYmV0d2VlbmA6IHRoZSBzeW1ib2xzIGJldHdlZW4gdGhlIHByb3BlcnR5IGFuZCB2YWx1ZVxuICAgKiAgIGZvciBkZWNsYXJhdGlvbnMsIHNlbGVjdG9yIGFuZCBge2AgZm9yIHJ1bGVzLCBvciBsYXN0IHBhcmFtZXRlclxuICAgKiAgIGFuZCBge2AgZm9yIGF0LXJ1bGVzLlxuICAgKiAqIGBzZW1pY29sb25gOiBjb250YWlucyB0cnVlIGlmIHRoZSBsYXN0IGNoaWxkIGhhc1xuICAgKiAgIGFuIChvcHRpb25hbCkgc2VtaWNvbG9uLlxuICAgKiAqIGBhZnRlck5hbWVgOiB0aGUgc3BhY2UgYmV0d2VlbiB0aGUgYXQtcnVsZSBuYW1lIGFuZCBpdHMgcGFyYW1ldGVycy5cbiAgICogKiBgbGVmdGA6IHRoZSBzcGFjZSBzeW1ib2xzIGJldHdlZW4gYC8qYCBhbmQgdGhlIGNvbW1lbnTigJlzIHRleHQuXG4gICAqICogYHJpZ2h0YDogdGhlIHNwYWNlIHN5bWJvbHMgYmV0d2VlbiB0aGUgY29tbWVudOKAmXMgdGV4dFxuICAgKiAgIGFuZCA8Y29kZT4qJiM0Nzs8L2NvZGU+LlxuICAgKiAqIGBpbXBvcnRhbnRgOiB0aGUgY29udGVudCBvZiB0aGUgaW1wb3J0YW50IHN0YXRlbWVudCxcbiAgICogICBpZiBpdCBpcyBub3QganVzdCBgIWltcG9ydGFudGAuXG4gICAqXG4gICAqIFBvc3RDU1MgY2xlYW5zIHNlbGVjdG9ycywgZGVjbGFyYXRpb24gdmFsdWVzIGFuZCBhdC1ydWxlIHBhcmFtZXRlcnNcbiAgICogZnJvbSBjb21tZW50cyBhbmQgZXh0cmEgc3BhY2VzLCBidXQgaXQgc3RvcmVzIG9yaWdpbiBjb250ZW50IGluIHJhd3NcbiAgICogcHJvcGVydGllcy4gQXMgc3VjaCwgaWYgeW91IGRvbuKAmXQgY2hhbmdlIGEgZGVjbGFyYXRpb27igJlzIHZhbHVlLFxuICAgKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSByYXcgdmFsdWUgd2l0aCBjb21tZW50cy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2Ege1xcbiAgY29sb3I6YmxhY2tcXG59JylcbiAgICogcm9vdC5maXJzdC5maXJzdC5yYXdzIC8vPT4geyBiZWZvcmU6ICdcXG4gICcsIGJldHdlZW46ICc6JyB9XG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gcG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaW5lICAgU291cmNlIGxpbmUgaW4gZmlsZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb2x1bW4gU291cmNlIGNvbHVtbiBpbiBmaWxlLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gc291cmNlXG4gKiBAcHJvcGVydHkge0lucHV0fSBpbnB1dCAgICB7QGxpbmsgSW5wdXR9IHdpdGggaW5wdXQgZmlsZVxuICogQHByb3BlcnR5IHtwb3NpdGlvbn0gc3RhcnQgVGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSBub2Rl4oCZcyBzb3VyY2UuXG4gKiBAcHJvcGVydHkge3Bvc2l0aW9ufSBlbmQgICBUaGUgZW5kaW5nIHBvc2l0aW9uIG9mIHRoZSBub2Rl4oCZcyBzb3VyY2UuXG4gKi9cbiJdLCJmaWxlIjoibm9kZS5qcyJ9


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _supportsColor = _interopRequireDefault(__webpack_require__(7));

var _chalk = _interopRequireDefault(__webpack_require__(10));

var _terminalHighlight = _interopRequireDefault(__webpack_require__(20));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * The CSS parser throws this error for broken CSS.
 *
 * Custom parsers can throw this error for broken custom syntax using
 * the {@link Node#error} method.
 *
 * PostCSS will use the input source map to detect the original error location.
 * If you wrote a Sass file, compiled it to CSS and then parsed it with PostCSS,
 * PostCSS will show the original position in the Sass file.
 *
 * If you need the position in the PostCSS input
 * (e.g., to debug the previous compiler), use `error.input.file`.
 *
 * @example
 * // Catching and checking syntax error
 * try {
 *   postcss.parse('a{')
 * } catch (error) {
 *   if (error.name === 'CssSyntaxError') {
 *     error //=> CssSyntaxError
 *   }
 * }
 *
 * @example
 * // Raising error from plugin
 * throw node.error('Unknown variable', { plugin: 'postcss-vars' })
 */
var CssSyntaxError =
/*#__PURE__*/
function (_Error) {
  _inheritsLoose(CssSyntaxError, _Error);

  /**
   * @param {string} message  Error message.
   * @param {number} [line]   Source line of the error.
   * @param {number} [column] Source column of the error.
   * @param {string} [source] Source code of the broken file.
   * @param {string} [file]   Absolute path to the broken file.
   * @param {string} [plugin] PostCSS plugin name, if error came from plugin.
   */
  function CssSyntaxError(message, line, column, source, file, plugin) {
    var _this;

    _this = _Error.call(this, message) || this;
    /**
     * Always equal to `'CssSyntaxError'`. You should always check error type
     * by `error.name === 'CssSyntaxError'`
     * instead of `error instanceof CssSyntaxError`,
     * because npm could have several PostCSS versions.
     *
     * @type {string}
     *
     * @example
     * if (error.name === 'CssSyntaxError') {
     *   error //=> CssSyntaxError
     * }
     */

    _this.name = 'CssSyntaxError';
    /**
     * Error message.
     *
     * @type {string}
     *
     * @example
     * error.message //=> 'Unclosed block'
     */

    _this.reason = message;

    if (file) {
      /**
       * Absolute path to the broken file.
       *
       * @type {string}
       *
       * @example
       * error.file       //=> 'a.sass'
       * error.input.file //=> 'a.css'
       */
      _this.file = file;
    }

    if (source) {
      /**
       * Source code of the broken file.
       *
       * @type {string}
       *
       * @example
       * error.source       //=> 'a { b {} }'
       * error.input.column //=> 'a b { }'
       */
      _this.source = source;
    }

    if (plugin) {
      /**
       * Plugin name, if error came from plugin.
       *
       * @type {string}
       *
       * @example
       * error.plugin //=> 'postcss-vars'
       */
      _this.plugin = plugin;
    }

    if (typeof line !== 'undefined' && typeof column !== 'undefined') {
      /**
       * Source line of the error.
       *
       * @type {number}
       *
       * @example
       * error.line       //=> 2
       * error.input.line //=> 4
       */
      _this.line = line;
      /**
       * Source column of the error.
       *
       * @type {number}
       *
       * @example
       * error.column       //=> 1
       * error.input.column //=> 4
       */

      _this.column = column;
    }

    _this.setMessage();

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), CssSyntaxError);
    }

    return _this;
  }

  var _proto = CssSyntaxError.prototype;

  _proto.setMessage = function setMessage() {
    /**
     * Full error text in the GNU error format
     * with plugin, file, line and column.
     *
     * @type {string}
     *
     * @example
     * error.message //=> 'a.css:1:1: Unclosed block'
     */
    this.message = this.plugin ? this.plugin + ': ' : '';
    this.message += this.file ? this.file : '<css input>';

    if (typeof this.line !== 'undefined') {
      this.message += ':' + this.line + ':' + this.column;
    }

    this.message += ': ' + this.reason;
  }
  /**
   * Returns a few lines of CSS source that caused the error.
   *
   * If the CSS has an input source map without `sourceContent`,
   * this method will return an empty string.
   *
   * @param {boolean} [color] Whether arrow will be colored red by terminal
   *                          color codes. By default, PostCSS will detect
   *                          color support by `process.stdout.isTTY`
   *                          and `process.env.NODE_DISABLE_COLORS`.
   *
   * @example
   * error.showSourceCode() //=> "  4 | }
   *                        //      5 | a {
   *                        //    > 6 |   bad
   *                        //        |   ^
   *                        //      7 | }
   *                        //      8 | b {"
   *
   * @return {string} Few lines of CSS source that caused the error.
   */
  ;

  _proto.showSourceCode = function showSourceCode(color) {
    var _this2 = this;

    if (!this.source) return '';
    var css = this.source;

    if (_terminalHighlight.default) {
      if (typeof color === 'undefined') color = _supportsColor.default.stdout;
      if (color) css = (0, _terminalHighlight.default)(css);
    }

    var lines = css.split(/\r?\n/);
    var start = Math.max(this.line - 3, 0);
    var end = Math.min(this.line + 2, lines.length);
    var maxWidth = String(end).length;

    function mark(text) {
      if (color && _chalk.default.red) {
        return _chalk.default.red.bold(text);
      }

      return text;
    }

    function aside(text) {
      if (color && _chalk.default.gray) {
        return _chalk.default.gray(text);
      }

      return text;
    }

    return lines.slice(start, end).map(function (line, index) {
      var number = start + 1 + index;
      var gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';

      if (number === _this2.line) {
        var spacing = aside(gutter.replace(/\d/g, ' ')) + line.slice(0, _this2.column - 1).replace(/[^\t]/g, ' ');
        return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^');
      }

      return ' ' + aside(gutter) + line;
    }).join('\n');
  }
  /**
   * Returns error position, message and source code of the broken part.
   *
   * @example
   * error.toString() //=> "CssSyntaxError: app.css:1:1: Unclosed block
   *                  //    > 1 | a {
   *                  //        | ^"
   *
   * @return {string} Error position, message and source code.
   */
  ;

  _proto.toString = function toString() {
    var code = this.showSourceCode();

    if (code) {
      code = '\n\n' + code + '\n';
    }

    return this.name + ': ' + this.message + code;
  }
  /**
   * @memberof CssSyntaxError#
   * @member {Input} input Input object with PostCSS internal information
   *                       about input file. If input has source map
   *                       from previous tool, PostCSS will use origin
   *                       (for example, Sass) source. You can use this
   *                       object to get PostCSS input source.
   *
   * @example
   * error.input.file //=> 'a.css'
   * error.file       //=> 'a.sass'
   */
  ;

  return CssSyntaxError;
}(_wrapNativeSuper(Error));

var _default = CssSyntaxError;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNzcy1zeW50YXgtZXJyb3IuZXM2Il0sIm5hbWVzIjpbIkNzc1N5bnRheEVycm9yIiwibWVzc2FnZSIsImxpbmUiLCJjb2x1bW4iLCJzb3VyY2UiLCJmaWxlIiwicGx1Z2luIiwibmFtZSIsInJlYXNvbiIsInNldE1lc3NhZ2UiLCJFcnJvciIsImNhcHR1cmVTdGFja1RyYWNlIiwic2hvd1NvdXJjZUNvZGUiLCJjb2xvciIsImNzcyIsInRlcm1pbmFsSGlnaGxpZ2h0Iiwic3VwcG9ydHNDb2xvciIsInN0ZG91dCIsImxpbmVzIiwic3BsaXQiLCJzdGFydCIsIk1hdGgiLCJtYXgiLCJlbmQiLCJtaW4iLCJsZW5ndGgiLCJtYXhXaWR0aCIsIlN0cmluZyIsIm1hcmsiLCJ0ZXh0IiwiY2hhbGsiLCJyZWQiLCJib2xkIiwiYXNpZGUiLCJncmF5Iiwic2xpY2UiLCJtYXAiLCJpbmRleCIsIm51bWJlciIsImd1dHRlciIsInNwYWNpbmciLCJyZXBsYWNlIiwiam9pbiIsInRvU3RyaW5nIiwiY29kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBMkJNQSxjOzs7OztBQUNKOzs7Ozs7OztBQVFBLDBCQUFhQyxPQUFiLEVBQXNCQyxJQUF0QixFQUE0QkMsTUFBNUIsRUFBb0NDLE1BQXBDLEVBQTRDQyxJQUE1QyxFQUFrREMsTUFBbEQsRUFBMEQ7QUFBQTs7QUFDeEQsOEJBQU1MLE9BQU47QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFhQSxVQUFLTSxJQUFMLEdBQVksZ0JBQVo7QUFDQTs7Ozs7Ozs7O0FBUUEsVUFBS0MsTUFBTCxHQUFjUCxPQUFkOztBQUVBLFFBQUlJLElBQUosRUFBVTtBQUNSOzs7Ozs7Ozs7QUFTQSxZQUFLQSxJQUFMLEdBQVlBLElBQVo7QUFDRDs7QUFDRCxRQUFJRCxNQUFKLEVBQVk7QUFDVjs7Ozs7Ozs7O0FBU0EsWUFBS0EsTUFBTCxHQUFj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OztBQUNBLFVBQUlZLE1BQU0sS0FBSyxNQUFJLENBQUNwQyxJQUFwQixFQUEwQjtBQUN4QixZQUFJc0MsT0FBTyxHQUFHUCxLQUFLLENBQUNNLE1BQU0sQ0FBQ0UsT0FBUCxDQUFlLEtBQWYsRUFBc0IsR0FBdEIsQ0FBRCxDQUFMLEdBQ1p2QyxJQUFJLENBQUNpQyxLQUFMLENBQVcsQ0FBWCxFQUFjLE1BQUksQ0FBQ2hDLE1BQUwsR0FBYyxDQUE1QixFQUErQnNDLE9BQS9CLENBQXVDLFFBQXZDLEVBQWlELEdBQWpELENBREY7QUFFQSxlQUFPYixJQUFJLENBQUMsR0FBRCxDQUFKLEdBQVlLLEtBQUssQ0FBQ00sTUFBRCxDQUFqQixHQUE0QnJDLElBQTVCLEdBQW1DLEtBQW5DLEdBQTJDc0MsT0FBM0MsR0FBcURaLElBQUksQ0FBQyxHQUFELENBQWhFO0FBQ0Q7O0FBQ0QsYUFBTyxNQUFNSyxLQUFLLENBQUNNLE1BQUQsQ0FBWCxHQUFzQnJDLElBQTdCO0FBQ0QsS0FUTSxFQVNKd0MsSUFUSSxDQVNDLElBVEQsQ0FBUDtBQVVEO0FBRUQ7Ozs7Ozs7Ozs7OztTQVVBQyxRLEdBQUEsb0JBQVk7QUFDVixRQUFJQyxJQUFJLEdBQUcsS0FBS2hDLGNBQUwsRUFBWDs7QUFDQSxRQUFJZ0MsSUFBSixFQUFVO0FBQ1JBLE1BQUFBLElBQUksR0FBRyxTQUFTQSxJQUFULEdBQWdCLElBQXZCO0FBQ0Q7O0FBQ0QsV0FBTyxLQUFLckMsSUFBTCxHQUFZLElBQVosR0FBbUIsS0FBS04sT0FBeEIsR0FBa0MyQyxJQUF6QztBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OzttQkF0TTJCbEMsSzs7ZUFvTmRWLGMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3VwcG9ydHNDb2xvciBmcm9tICdzdXBwb3J0cy1jb2xvcidcbmltcG9ydCBjaGFsayBmcm9tICdjaGFsaydcblxuaW1wb3J0IHRlcm1pbmFsSGlnaGxpZ2h0IGZyb20gJy4vdGVybWluYWwtaGlnaGxpZ2h0J1xuXG4vKipcbiAqIFRoZSBDU1MgcGFyc2VyIHRocm93cyB0aGlzIGVycm9yIGZvciBicm9rZW4gQ1NTLlxuICpcbiAqIEN1c3RvbSBwYXJzZXJzIGNhbiB0aHJvdyB0aGlzIGVycm9yIGZvciBicm9rZW4gY3VzdG9tIHN5bnRheCB1c2luZ1xuICogdGhlIHtAbGluayBOb2RlI2Vycm9yfSBtZXRob2QuXG4gKlxuICogUG9zdENTUyB3aWxsIHVzZSB0aGUgaW5wdXQgc291cmNlIG1hcCB0byBkZXRlY3QgdGhlIG9yaWdpbmFsIGVycm9yIGxvY2F0aW9uLlxuICogSWYgeW91IHdyb3RlIGEgU2FzcyBmaWxlLCBjb21waWxlZCBpdCB0byBDU1MgYW5kIHRoZW4gcGFyc2VkIGl0IHdpdGggUG9zdENTUyxcbiAqIFBvc3RDU1Mgd2lsbCBzaG93IHRoZSBvcmlnaW5hbCBwb3NpdGlvbiBpbiB0aGUgU2FzcyBmaWxlLlxuICpcbiAqIElmIHlvdSBuZWVkIHRoZSBwb3NpdGlvbiBpbiB0aGUgUG9zdENTUyBpbnB1dFxuICogKGUuZy4sIHRvIGRlYnVnIHRoZSBwcmV2aW91cyBjb21waWxlciksIHVzZSBgZXJyb3IuaW5wdXQuZmlsZWAuXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIENhdGNoaW5nIGFuZCBjaGVja2luZyBzeW50YXggZXJyb3JcbiAqIHRyeSB7XG4gKiAgIHBvc3Rjc3MucGFyc2UoJ2F7JylcbiAqIH0gY2F0Y2ggKGVycm9yKSB7XG4gKiAgIGlmIChlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InKSB7XG4gKiAgICAgZXJyb3IgLy89PiBDc3NTeW50YXhFcnJvclxuICogICB9XG4gKiB9XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJhaXNpbmcgZXJyb3IgZnJvbSBwbHVnaW5cbiAqIHRocm93IG5vZGUuZXJyb3IoJ1Vua25vd24gdmFyaWFibGUnLCB7IHBsdWdpbjogJ3Bvc3Rjc3MtdmFycycgfSlcbiAqL1xuY2xhc3MgQ3NzU3ludGF4RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAgRXJyb3IgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsaW5lXSAgIFNvdXJjZSBsaW5lIG9mIHRoZSBlcnJvci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtjb2x1bW5dIFNvdXJjZSBjb2x1bW4gb2YgdGhlIGVycm9yLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3NvdXJjZV0gU291cmNlIGNvZGUgb2YgdGhlIGJyb2tlbiBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZpbGVdICAgQWJzb2x1dGUgcGF0aCB0byB0aGUgYnJva2VuIGZpbGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBbcGx1Z2luXSBQb3N0Q1NTIHBsdWdpbiBuYW1lLCBpZiBlcnJvciBjYW1lIGZyb20gcGx1Z2luLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKG1lc3NhZ2UsIGxpbmUsIGNvbHVtbiwgc291cmNlLCBmaWxlLCBwbHVnaW4pIHtcbiAgICBzdXBlcihtZXNzYWdlKVxuXG4gICAgLyoqXG4gICAgICogQWx3YXlzIGVxdWFsIHRvIGAnQ3NzU3ludGF4RXJyb3InYC4gWW91IHNob3VsZCBhbHdheXMgY2hlY2sgZXJyb3IgdHlwZVxuICAgICAqIGJ5IGBlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InYFxuICAgICAqIGluc3RlYWQgb2YgYGVycm9yIGluc3RhbmNlb2YgQ3NzU3ludGF4RXJyb3JgLFxuICAgICAqIGJlY2F1c2UgbnBtIGNvdWxkIGhhdmUgc2V2ZXJhbCBQb3N0Q1NTIHZlcnNpb25zLlxuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaWYgKGVycm9yLm5hbWUgPT09ICdDc3NTeW50YXhFcnJvcicpIHtcbiAgICAgKiAgIGVycm9yIC8vPT4gQ3NzU3ludGF4RXJyb3JcbiAgICAgKiB9XG4gICAgICovXG4gICAgdGhpcy5uYW1lID0gJ0Nzc1N5bnRheEVycm9yJ1xuICAgIC8qKlxuICAgICAqIEVycm9yIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBlcnJvci5tZXNzYWdlIC8vPT4gJ1VuY2xvc2VkIGJsb2NrJ1xuICAgICAqL1xuICAgIHRoaXMucmVhc29uID0gbWVzc2FnZVxuXG4gICAgaWYgKGZpbGUpIHtcbiAgICAgIC8qKlxuICAgICAgICogQWJzb2x1dGUgcGF0aCB0byB0aGUgYnJva2VuIGZpbGUuXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogZXJyb3IuZmlsZSAgICAgICAvLz0+ICdhLnNhc3MnXG4gICAgICAgKiBlcnJvci5pbnB1dC5maWxlIC8vPT4gJ2EuY3NzJ1xuICAgICAgICovXG4gICAgICB0aGlzLmZpbGUgPSBmaWxlXG4gICAgfVxuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIC8qKlxuICAgICAgICogU291cmNlIGNvZGUgb2YgdGhlIGJyb2tlbiBmaWxlLlxuICAgICAgICpcbiAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgKlxuICAgICAgICogQGV4YW1wbGVcbiAgICAgICAqIGVycm9yLnNvdXJjZSAgICAgICAvLz0+ICdhIHsgYiB7fSB9J1xuICAgICAgICogZXJyb3IuaW5wdXQuY29sdW1uIC8vPT4gJ2EgYiB7IH0nXG4gICAgICAgKi9cbiAgICAgIHRoaXMuc291cmNlID0gc291cmNlXG4gICAgfVxuICAgIGlmIChwbHVnaW4pIHtcbiAgICAgIC8qKlxuICAgICAgICogUGx1Z2luIG5hbWUsIGlmIGVycm9yIGNhbWUgZnJvbSBwbHVnaW4uXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogZXJyb3IucGx1Z2luIC8vPT4gJ3Bvc3Rjc3MtdmFycydcbiAgICAgICAqL1xuICAgICAgdGhpcy5wbHVnaW4gPSBwbHVnaW5cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBsaW5lICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgY29sdW1uICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLyoqXG4gICAgICAgKiBTb3VyY2UgbGluZSBvZiB0aGUgZXJyb3IuXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogZXJyb3IubGluZSAgICAgICAvLz0+IDJcbiAgICAgICAqIGVycm9yLmlucHV0LmxpbmUgLy89PiA0XG4gICAgICAgKi9cbiAgICAgIHRoaXMubGluZSA9IGxpbmVcbiAgICAgIC8qKlxuICAgICAgICogU291cmNlIGNvbHVtbiBvZiB0aGUgZXJyb3IuXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogZXJyb3IuY29sdW1uICAgICAgIC8vPT4gMVxuICAgICAgICogZXJyb3IuaW5wdXQuY29sdW1uIC8vPT4gNFxuICAgICAgICovXG4gICAgICB0aGlzLmNvbHVtbiA9IGNvbHVtblxuICAgIH1cblxuICAgIHRoaXMuc2V0TWVzc2FnZSgpXG5cbiAgICBpZiAoRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UpIHtcbiAgICAgIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlKHRoaXMsIENzc1N5bnRheEVycm9yKVxuICAgIH1cbiAgfVxuXG4gIHNldE1lc3NhZ2UgKCkge1xuICAgIC8qKlxuICAgICAqIEZ1bGwgZXJyb3IgdGV4dCBpbiB0aGUgR05VIGVycm9yIGZvcm1hdFxuICAgICAqIHdpdGggcGx1Z2luLCBmaWxlLCBsaW5lIGFuZCBjb2x1bW4uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBlcnJvci5tZXNzYWdlIC8vPT4gJ2EuY3NzOjE6MTogVW5jbG9zZWQgYmxvY2snXG4gICAgICovXG4gICAgdGhpcy5tZXNzYWdlID0gdGhpcy5wbHVnaW4gPyB0aGlzLnBsdWdpbiArICc6ICcgOiAnJ1xuICAgIHRoaXMubWVzc2FnZSArPSB0aGlzLmZpbGUgPyB0aGlzLmZpbGUgOiAnPGNzcyBpbnB1dD4nXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxpbmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLm1lc3NhZ2UgKz0gJzonICsgdGhpcy5saW5lICsgJzonICsgdGhpcy5jb2x1bW5cbiAgICB9XG4gICAgdGhpcy5tZXNzYWdlICs9ICc6ICcgKyB0aGlzLnJlYXNvblxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBmZXcgbGluZXMgb2YgQ1NTIHNvdXJjZSB0aGF0IGNhdXNlZCB0aGUgZXJyb3IuXG4gICAqXG4gICAqIElmIHRoZSBDU1MgaGFzIGFuIGlucHV0IHNvdXJjZSBtYXAgd2l0aG91dCBgc291cmNlQ29udGVudGAsXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGFuIGVtcHR5IHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtib29sZWFufSBbY29sb3JdIFdoZXRoZXIgYXJyb3cgd2lsbCBiZSBjb2xvcmVkIHJlZCBieSB0ZXJtaW5hbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgY29kZXMuIEJ5IGRlZmF1bHQsIFBvc3RDU1Mgd2lsbCBkZXRlY3RcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yIHN1cHBvcnQgYnkgYHByb2Nlc3Muc3Rkb3V0LmlzVFRZYFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIGBwcm9jZXNzLmVudi5OT0RFX0RJU0FCTEVfQ09MT1JTYC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZXJyb3Iuc2hvd1NvdXJjZUNvZGUoKSAvLz0+IFwiICA0IHwgfVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgNSB8IGEge1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgID4gNiB8ICAgYmFkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHwgICBeXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICA3IHwgfVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgOCB8IGIge1wiXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gRmV3IGxpbmVzIG9mIENTUyBzb3VyY2UgdGhhdCBjYXVzZWQgdGhlIGVycm9yLlxuICAgKi9cbiAgc2hvd1NvdXJjZUNvZGUgKGNvbG9yKSB7XG4gICAgaWYgKCF0aGlzLnNvdXJjZSkgcmV0dXJuICcnXG5cbiAgICBsZXQgY3NzID0gdGhpcy5zb3VyY2VcbiAgICBpZiAodGVybWluYWxIaWdobGlnaHQpIHtcbiAgICAgIGlmICh0eXBlb2YgY29sb3IgPT09ICd1bmRlZmluZWQnKSBjb2xvciA9IHN1cHBvcnRzQ29sb3Iuc3Rkb3V0XG4gICAgICBpZiAoY29sb3IpIGNzcyA9IHRlcm1pbmFsSGlnaGxpZ2h0KGNzcylcbiAgICB9XG5cbiAgICBsZXQgbGluZXMgPSBjc3Muc3BsaXQoL1xccj9cXG4vKVxuICAgIGxldCBzdGFydCA9IE1hdGgubWF4KHRoaXMubGluZSAtIDMsIDApXG4gICAgbGV0IGVuZCA9IE1hdGgubWluKHRoaXMubGluZSArIDIsIGxpbmVzLmxlbmd0aClcblxuICAgIGxldCBtYXhXaWR0aCA9IFN0cmluZyhlbmQpLmxlbmd0aFxuXG4gICAgZnVuY3Rpb24gbWFyayAodGV4dCkge1xuICAgICAgaWYgKGNvbG9yICYmIGNoYWxrLnJlZCkge1xuICAgICAgICByZXR1cm4gY2hhbGsucmVkLmJvbGQodGV4dClcbiAgICAgIH1cbiAgICAgIHJldHVybiB0ZXh0XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFzaWRlICh0ZXh0KSB7XG4gICAgICBpZiAoY29sb3IgJiYgY2hhbGsuZ3JheSkge1xuICAgICAgICByZXR1cm4gY2hhbGsuZ3JheSh0ZXh0KVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRleHRcbiAgICB9XG5cbiAgICByZXR1cm4gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKChsaW5lLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IG51bWJlciA9IHN0YXJ0ICsgMSArIGluZGV4XG4gICAgICBsZXQgZ3V0dGVyID0gJyAnICsgKCcgJyArIG51bWJlcikuc2xpY2UoLW1heFdpZHRoKSArICcgfCAnXG4gICAgICBpZiAobnVtYmVyID09PSB0aGlzLmxpbmUpIHtcbiAgICAgICAgbGV0IHNwYWNpbmcgPSBhc2lkZShndXR0ZXIucmVwbGFjZSgvXFxkL2csICcgJykpICtcbiAgICAgICAgICBsaW5lLnNsaWNlKDAsIHRoaXMuY29sdW1uIC0gMSkucmVwbGFjZSgvW15cXHRdL2csICcgJylcbiAgICAgICAgcmV0dXJuIG1hcmsoJz4nKSArIGFzaWRlKGd1dHRlcikgKyBsaW5lICsgJ1xcbiAnICsgc3BhY2luZyArIG1hcmsoJ14nKVxuICAgICAgfVxuICAgICAgcmV0dXJuICcgJyArIGFzaWRlKGd1dHRlcikgKyBsaW5lXG4gICAgfSkuam9pbignXFxuJylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGVycm9yIHBvc2l0aW9uLCBtZXNzYWdlIGFuZCBzb3VyY2UgY29kZSBvZiB0aGUgYnJva2VuIHBhcnQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGVycm9yLnRvU3RyaW5nKCkgLy89PiBcIkNzc1N5bnRheEVycm9yOiBhcHAuY3NzOjE6MTogVW5jbG9zZWQgYmxvY2tcbiAgICogICAgICAgICAgICAgICAgICAvLyAgICA+IDEgfCBhIHtcbiAgICogICAgICAgICAgICAgICAgICAvLyAgICAgICAgfCBeXCJcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfSBFcnJvciBwb3NpdGlvbiwgbWVzc2FnZSBhbmQgc291cmNlIGNvZGUuXG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgbGV0IGNvZGUgPSB0aGlzLnNob3dTb3VyY2VDb2RlKClcbiAgICBpZiAoY29kZSkge1xuICAgICAgY29kZSA9ICdcXG5cXG4nICsgY29kZSArICdcXG4nXG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5hbWUgKyAnOiAnICsgdGhpcy5tZXNzYWdlICsgY29kZVxuICB9XG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBDc3NTeW50YXhFcnJvciNcbiAgICogQG1lbWJlciB7SW5wdXR9IGlucHV0IElucHV0IG9iamVjdCB3aXRoIFBvc3RDU1MgaW50ZXJuYWwgaW5mb3JtYXRpb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgIGFib3V0IGlucHV0IGZpbGUuIElmIGlucHV0IGhhcyBzb3VyY2UgbWFwXG4gICAqICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHByZXZpb3VzIHRvb2wsIFBvc3RDU1Mgd2lsbCB1c2Ugb3JpZ2luXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAoZm9yIGV4YW1wbGUsIFNhc3MpIHNvdXJjZS4gWW91IGNhbiB1c2UgdGhpc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHRvIGdldCBQb3N0Q1NTIGlucHV0IHNvdXJjZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZXJyb3IuaW5wdXQuZmlsZSAvLz0+ICdhLmNzcydcbiAgICogZXJyb3IuZmlsZSAgICAgICAvLz0+ICdhLnNhc3MnXG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBDc3NTeW50YXhFcnJvclxuIl0sImZpbGUiOiJjc3Mtc3ludGF4LWVycm9yLmpzIn0=


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(8);
const hasFlag = __webpack_require__(9);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}
if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

module.exports = (flag, argv) => {
	argv = argv || process.argv;
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const pos = argv.indexOf(prefix + flag);
	const terminatorPos = argv.indexOf('--');
	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const escapeStringRegexp = __webpack_require__(11);
const ansiStyles = __webpack_require__(12);
const stdoutColor = __webpack_require__(18).stdout;

const template = __webpack_require__(19);

const isSimpleWindowsTerm = process.platform === 'win32' && !(process.env.TERM || '').toLowerCase().startsWith('xterm');

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

// `color-convert` models to exclude from the Chalk API due to conflicts and such
const skipModels = new Set(['gray']);

const styles = Object.create(null);

function applyOptions(obj, options) {
	options = options || {};

	// Detect level if not set manually
	const scLevel = stdoutColor ? stdoutColor.level : 0;
	obj.level = options.level === undefined ? scLevel : options.level;
	obj.enabled = 'enabled' in options ? options.enabled : obj.level > 0;
}

function Chalk(options) {
	// We check for this.template here since calling `chalk.constructor()`
	// by itself will have a `this` of a previously constructed chalk object
	if (!this || !(this instanceof Chalk) || this.template) {
		const chalk = {};
		applyOptions(chalk, options);

		chalk.template = function () {
			const args = [].slice.call(arguments);
			return chalkTag.apply(null, [chalk.template].concat(args));
		};

		Object.setPrototypeOf(chalk, Chalk.prototype);
		Object.setPrototypeOf(chalk.template, chalk);

		chalk.template.constructor = Chalk;

		return chalk.template;
	}

	applyOptions(this, options);
}

// Use bright blue on Windows as the normal blue color is illegible
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}

for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');

	styles[key] = {
		get() {
			const codes = ansiStyles[key];
			return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, key);
		}
	};
}

styles.visible = {
	get() {
		return build.call(this, this._styles || [], true, 'visible');
	}
};

ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	styles[model] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.color[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.color.close,
					closeRe: ansiStyles.color.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	if (skipModels.has(model)) {
		continue;
	}

	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
		get() {
			const level = this.level;
			return function () {
				const open = ansiStyles.bgColor[levelMapping[level]][model].apply(null, arguments);
				const codes = {
					open,
					close: ansiStyles.bgColor.close,
					closeRe: ansiStyles.bgColor.closeRe
				};
				return build.call(this, this._styles ? this._styles.concat(codes) : [codes], this._empty, model);
			};
		}
	};
}

const proto = Object.defineProperties(() => {}, styles);

function build(_styles, _empty, key) {
	const builder = function () {
		return applyStyle.apply(builder, arguments);
	};

	builder._styles = _styles;
	builder._empty = _empty;

	const self = this;

	Object.defineProperty(builder, 'level', {
		enumerable: true,
		get() {
			return self.level;
		},
		set(level) {
			self.level = level;
		}
	});

	Object.defineProperty(builder, 'enabled', {
		enumerable: true,
		get() {
			return self.enabled;
		},
		set(enabled) {
			self.enabled = enabled;
		}
	});

	// See below for fix regarding invisible grey/dim combination on Windows
	builder.hasGrey = this.hasGrey || key === 'gray' || key === 'grey';

	// `__proto__` is used because we must return a function, but there is
	// no way to create a function with a different prototype
	builder.__proto__ = proto; // eslint-disable-line no-proto

	return builder;
}

function applyStyle() {
	// Support varags, but simply cast to string in case there's only one arg
	const args = arguments;
	const argsLen = args.length;
	let str = String(arguments[0]);

	if (argsLen === 0) {
		return '';
	}

	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}

	if (!this.enabled || this.level <= 0 || !str) {
		return this._empty ? '' : str;
	}

	// Turns out that on Windows dimmed gray text becomes invisible in cmd.exe,
	// see https://github.com/chalk/chalk/issues/58
	// If we're on Windows and we're dealing with a gray color, temporarily make 'dim' a noop.
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}

	for (const code of this._styles.slice().reverse()) {
		// Replace any instances already present with a re-opening code
		// otherwise only the part of the string until said closing code
		// will be colored, and the rest will simply be 'plain'.
		str = code.open + str.replace(code.closeRe, code.open) + code.close;

		// Close the styling before a linebreak and reopen
		// after next line to fix a bleed issue on macOS
		// https://github.com/chalk/chalk/pull/92
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}

	// Reset the original `dim` if we changed it to work around the Windows dimmed gray issue
	ansiStyles.dim.open = originalDim;

	return str;
}

function chalkTag(chalk, strings) {
	if (!Array.isArray(strings)) {
		// If chalk() was called by itself or with a string,
		// return the string itself as a string.
		return [].slice.call(arguments, 1).join(' ');
	}

	const args = [].slice.call(arguments, 2);
	const parts = [strings.raw[0]];

	for (let i = 1; i < strings.length; i++) {
		parts.push(String(args[i - 1]).replace(/[{}\\]/g, '\\$&'));
		parts.push(String(strings.raw[i]));
	}

	return template(chalk, parts.join(''));
}

Object.defineProperties(Chalk.prototype, styles);

module.exports = Chalk(); // eslint-disable-line new-cap
module.exports.supportsColor = stdoutColor;
module.exports.default = module.exports; // For TypeScript


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;

module.exports = function (str) {
	if (typeof str !== 'string') {
		throw new TypeError('Expected a string');
	}

	return str.replace(matchOperatorsRe, '\\$&');
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
const colorConvert = __webpack_require__(14);

const wrapAnsi16 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${code + offset}m`;
};

const wrapAnsi256 = (fn, offset) => function () {
	const code = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};5;${code}m`;
};

const wrapAnsi16m = (fn, offset) => function () {
	const rgb = fn.apply(colorConvert, arguments);
	return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
};

function assembleStyles() {
	const codes = new Map();
	const styles = {
		modifier: {
			reset: [0, 0],
			// 21 isn't widely supported and 22 does the same thing
			bold: [1, 22],
			dim: [2, 22],
			italic: [3, 23],
			underline: [4, 24],
			inverse: [7, 27],
			hidden: [8, 28],
			strikethrough: [9, 29]
		},
		color: {
			black: [30, 39],
			red: [31, 39],
			green: [32, 39],
			yellow: [33, 39],
			blue: [34, 39],
			magenta: [35, 39],
			cyan: [36, 39],
			white: [37, 39],
			gray: [90, 39],

			// Bright color
			redBright: [91, 39],
			greenBright: [92, 39],
			yellowBright: [93, 39],
			blueBright: [94, 39],
			magentaBright: [95, 39],
			cyanBright: [96, 39],
			whiteBright: [97, 39]
		},
		bgColor: {
			bgBlack: [40, 49],
			bgRed: [41, 49],
			bgGreen: [42, 49],
			bgYellow: [43, 49],
			bgBlue: [44, 49],
			bgMagenta: [45, 49],
			bgCyan: [46, 49],
			bgWhite: [47, 49],

			// Bright color
			bgBlackBright: [100, 49],
			bgRedBright: [101, 49],
			bgGreenBright: [102, 49],
			bgYellowBright: [103, 49],
			bgBlueBright: [104, 49],
			bgMagentaBright: [105, 49],
			bgCyanBright: [106, 49],
			bgWhiteBright: [107, 49]
		}
	};

	// Fix humans
	styles.color.grey = styles.color.gray;

	for (const groupName of Object.keys(styles)) {
		const group = styles[groupName];

		for (const styleName of Object.keys(group)) {
			const style = group[styleName];

			styles[styleName] = {
				open: `\u001B[${style[0]}m`,
				close: `\u001B[${style[1]}m`
			};

			group[styleName] = styles[styleName];

			codes.set(style[0], style[1]);
		}

		Object.defineProperty(styles, groupName, {
			value: group,
			enumerable: false
		});

		Object.defineProperty(styles, 'codes', {
			value: codes,
			enumerable: false
		});
	}

	const ansi2ansi = n => n;
	const rgb2rgb = (r, g, b) => [r, g, b];

	styles.color.close = '\u001B[39m';
	styles.bgColor.close = '\u001B[49m';

	styles.color.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 0)
	};
	styles.color.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 0)
	};
	styles.color.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 0)
	};

	styles.bgColor.ansi = {
		ansi: wrapAnsi16(ansi2ansi, 10)
	};
	styles.bgColor.ansi256 = {
		ansi256: wrapAnsi256(ansi2ansi, 10)
	};
	styles.bgColor.ansi16m = {
		rgb: wrapAnsi16m(rgb2rgb, 10)
	};

	for (let key of Object.keys(colorConvert)) {
		if (typeof colorConvert[key] !== 'object') {
			continue;
		}

		const suite = colorConvert[key];

		if (key === 'ansi16') {
			key = 'ansi';
		}

		if ('ansi16' in suite) {
			styles.color.ansi[key] = wrapAnsi16(suite.ansi16, 0);
			styles.bgColor.ansi[key] = wrapAnsi16(suite.ansi16, 10);
		}

		if ('ansi256' in suite) {
			styles.color.ansi256[key] = wrapAnsi256(suite.ansi256, 0);
			styles.bgColor.ansi256[key] = wrapAnsi256(suite.ansi256, 10);
		}

		if ('rgb' in suite) {
			styles.color.ansi16m[key] = wrapAnsi16m(suite.rgb, 0);
			styles.bgColor.ansi16m[key] = wrapAnsi16m(suite.rgb, 10);
		}
	}

	return styles;
}

// Make the export immutable
Object.defineProperty(module, 'exports', {
	enumerable: true,
	get: assembleStyles
});

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(13)(module)))

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(15);
var route = __webpack_require__(17);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(16);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var rdif;
	var gdif;
	var bdif;
	var h;
	var s;

	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var v = Math.max(r, g, b);
	var diff = v - Math.min(r, g, b);
	var diffc = function (c) {
		return (v - c) / 6 / diff + 1 / 2;
	};

	if (diff === 0) {
		h = s = 0;
	} else {
		s = diff / v;
		rdif = diffc(r);
		gdif = diffc(g);
		bdif = diffc(b);

		if (r === v) {
			h = bdif - gdif;
		} else if (g === v) {
			h = (1 / 3) + rdif - bdif;
		} else if (b === v) {
			h = (2 / 3) + gdif - rdif;
		}
		if (h < 0) {
			h += 1;
		} else if (h > 1) {
			h -= 1;
		}
	}

	return [
		h * 360,
		s * 100,
		v * 100
	];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(15);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
	var graph = {};
	// https://jsperf.com/object-keys-vs-for-in-with-closure/3
	var models = Object.keys(conversions);

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(8);
const hasFlag = __webpack_require__(9);

const env = process.env;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false')) {
	forceColor = false;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = true;
}
if ('FORCE_COLOR' in env) {
	forceColor = env.FORCE_COLOR.length === 0 || parseInt(env.FORCE_COLOR, 10) !== 0;
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(stream) {
	if (forceColor === false) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (stream && !stream.isTTY && forceColor !== true) {
		return 0;
	}

	const min = forceColor ? 1 : 0;

	if (process.platform === 'win32') {
		// Node.js 7.5.0 is the first version of Node.js to include a patch to
		// libuv that enables 256 color output on Windows. Anything earlier and it
		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
		// release that supports 256 colors. Windows 10 build 14931 is the first release
		// that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(process.versions.node.split('.')[0]) >= 8 &&
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	if (env.TERM === 'dumb') {
		return min;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: getSupportLevel(process.stdout),
	stderr: getSupportLevel(process.stderr)
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const TEMPLATE_REGEX = /(?:\\(u[a-f\d]{4}|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
const ESCAPE_REGEX = /\\(u[a-f\d]{4}|x[a-f\d]{2}|.)|([^\\])/gi;

const ESCAPES = new Map([
	['n', '\n'],
	['r', '\r'],
	['t', '\t'],
	['b', '\b'],
	['f', '\f'],
	['v', '\v'],
	['0', '\0'],
	['\\', '\\'],
	['e', '\u001B'],
	['a', '\u0007']
]);

function unescape(c) {
	if ((c[0] === 'u' && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
		return String.fromCharCode(parseInt(c.slice(1), 16));
	}

	return ESCAPES.get(c) || c;
}

function parseArguments(name, args) {
	const results = [];
	const chunks = args.trim().split(/\s*,\s*/g);
	let matches;

	for (const chunk of chunks) {
		if (!isNaN(chunk)) {
			results.push(Number(chunk));
		} else if ((matches = chunk.match(STRING_REGEX))) {
			results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, chr) => escape ? unescape(escape) : chr));
		} else {
			throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
		}
	}

	return results;
}

function parseStyle(style) {
	STYLE_REGEX.lastIndex = 0;

	const results = [];
	let matches;

	while ((matches = STYLE_REGEX.exec(style)) !== null) {
		const name = matches[1];

		if (matches[2]) {
			const args = parseArguments(name, matches[2]);
			results.push([name].concat(args));
		} else {
			results.push([name]);
		}
	}

	return results;
}

function buildStyle(chalk, styles) {
	const enabled = {};

	for (const layer of styles) {
		for (const style of layer.styles) {
			enabled[style[0]] = layer.inverse ? null : style.slice(1);
		}
	}

	let current = chalk;
	for (const styleName of Object.keys(enabled)) {
		if (Array.isArray(enabled[styleName])) {
			if (!(styleName in current)) {
				throw new Error(`Unknown Chalk style: ${styleName}`);
			}

			if (enabled[styleName].length > 0) {
				current = current[styleName].apply(current, enabled[styleName]);
			} else {
				current = current[styleName];
			}
		}
	}

	return current;
}

module.exports = (chalk, tmp) => {
	const styles = [];
	const chunks = [];
	let chunk = [];

	// eslint-disable-next-line max-params
	tmp.replace(TEMPLATE_REGEX, (m, escapeChar, inverse, style, close, chr) => {
		if (escapeChar) {
			chunk.push(unescape(escapeChar));
		} else if (style) {
			const str = chunk.join('');
			chunk = [];
			chunks.push(styles.length === 0 ? str : buildStyle(chalk, styles)(str));
			styles.push({inverse, styles: parseStyle(style)});
		} else if (close) {
			if (styles.length === 0) {
				throw new Error('Found extraneous } in Chalk template literal');
			}

			chunks.push(buildStyle(chalk, styles)(chunk.join('')));
			chunk = [];
			styles.pop();
		} else {
			chunk.push(chr);
		}
	});

	chunks.push(chunk.join(''));

	if (styles.length > 0) {
		const errMsg = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
		throw new Error(errMsg);
	}

	return chunks.join('');
};


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _chalk = _interopRequireDefault(__webpack_require__(10));

var _tokenize = _interopRequireDefault(__webpack_require__(21));

var _input = _interopRequireDefault(__webpack_require__(22));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HIGHLIGHT_THEME = {
  'brackets': _chalk.default.cyan,
  'at-word': _chalk.default.cyan,
  'comment': _chalk.default.gray,
  'string': _chalk.default.green,
  'class': _chalk.default.yellow,
  'call': _chalk.default.cyan,
  'hash': _chalk.default.magenta,
  '(': _chalk.default.cyan,
  ')': _chalk.default.cyan,
  '{': _chalk.default.yellow,
  '}': _chalk.default.yellow,
  '[': _chalk.default.yellow,
  ']': _chalk.default.yellow,
  ':': _chalk.default.yellow,
  ';': _chalk.default.yellow
};

function getTokenType(_ref, processor) {
  var type = _ref[0],
      value = _ref[1];

  if (type === 'word') {
    if (value[0] === '.') {
      return 'class';
    }

    if (value[0] === '#') {
      return 'hash';
    }
  }

  if (!processor.endOfFile()) {
    var next = processor.nextToken();
    processor.back(next);
    if (next[0] === 'brackets' || next[0] === '(') return 'call';
  }

  return type;
}

function terminalHighlight(css) {
  var processor = (0, _tokenize.default)(new _input.default(css), {
    ignoreErrors: true
  });
  var result = '';

  var _loop = function _loop() {
    var token = processor.nextToken();
    var color = HIGHLIGHT_THEME[getTokenType(token, processor)];

    if (color) {
      result += token[1].split(/\r?\n/).map(function (i) {
        return color(i);
      }).join('\n');
    } else {
      result += token[1];
    }
  };

  while (!processor.endOfFile()) {
    _loop();
  }

  return result;
}

var _default = terminalHighlight;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1pbmFsLWhpZ2hsaWdodC5lczYiXSwibmFtZXMiOlsiSElHSExJR0hUX1RIRU1FIiwiY2hhbGsiLCJjeWFuIiwiZ3JheSIsImdyZWVuIiwieWVsbG93IiwibWFnZW50YSIsImdldFRva2VuVHlwZSIsInByb2Nlc3NvciIsInR5cGUiLCJ2YWx1ZSIsImVuZE9mRmlsZSIsIm5leHQiLCJuZXh0VG9rZW4iLCJiYWNrIiwidGVybWluYWxIaWdobGlnaHQiLCJjc3MiLCJJbnB1dCIsImlnbm9yZUVycm9ycyIsInJlc3VsdCIsInRva2VuIiwiY29sb3IiLCJzcGxpdCIsIm1hcCIsImkiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBOztBQUNBOzs7O0FBRUEsSUFBTUEsZUFBZSxHQUFHO0FBQ3RCLGNBQVlDLGVBQU1DLElBREk7QUFFdEIsYUFBV0QsZUFBTUMsSUFGSztBQUd0QixhQUFXRCxlQUFNRSxJQUhLO0FBSXRCLFlBQVVGLGVBQU1HLEtBSk07QUFLdEIsV0FBU0gsZUFBTUksTUFMTztBQU10QixVQUFRSixlQUFNQyxJQU5RO0FBT3RCLFVBQVFELGVBQU1LLE9BUFE7QUFRdEIsT0FBS0wsZUFBTUMsSUFSVztBQVN0QixPQUFLRCxlQUFNQyxJQVRXO0FBVXRCLE9BQUtELGVBQU1JLE1BVlc7QUFXdEIsT0FBS0osZUFBTUksTUFYVztBQVl0QixPQUFLSixlQUFNSSxNQVpXO0FBYXRCLE9BQUtKLGVBQU1JLE1BYlc7QUFjdEIsT0FBS0osZUFBTUksTUFkVztBQWV0QixPQUFLSixlQUFNSTtBQWZXLENBQXhCOztBQWtCQSxTQUFTRSxZQUFULE9BQXNDQyxTQUF0QyxFQUFpRDtBQUFBLE1BQXpCQyxJQUF5QjtBQUFBLE1BQW5CQyxLQUFtQjs7QUFDL0MsTUFBSUQsSUFBSSxLQUFLLE1BQWIsRUFBcUI7QUFDbkIsUUFBSUMsS0FBSyxDQUFDLENBQUQsQ0FBTCxLQUFhLEdBQWpCLEVBQXNCO0FBQ3BCLGFBQU8sT0FBUDtBQUNEOztBQUNELFFBQUlBLEtBQUssQ0FBQyxDQUFELENBQUwsS0FBYSxHQUFqQixFQUFzQjtBQUNwQixhQUFPLE1BQVA7QUFDRDtBQUNGOztBQUVELE1BQUksQ0FBQ0YsU0FBUyxDQUFDRyxTQUFWLEVBQUwsRUFBNEI7QUFDMUIsUUFBSUMsSUFBSSxHQUFHSixTQUFTLENBQUNLLFNBQVYsRUFBWDtBQUNBTCxJQUFBQSxTQUFTLENBQUNNLElBQVYsQ0FBZUYsSUFBZjtBQUNBLFFBQUlBLElBQUksQ0FBQyxDQUFELENBQUosS0FBWSxVQUFaLElBQTBCQSxJQUFJLENBQUMsQ0FBRCxDQUFKLEtBQVksR0FBMUMsRUFBK0MsT0FBTyxNQUFQO0FBQ2hEOztBQUVELFNBQU9ILElBQVA7QUFDRDs7QUFFRCxTQUFTTSxpQkFBVCxDQUE0QkMsR0FBNUIsRUFBaUM7QUFDL0IsTUFBSVIsU0FBUyxHQUFHLHVCQUFVLElBQUlTLGNBQUosQ0FBVUQsR0FBVixDQUFWLEVBQTBCO0FBQUVFLElBQUFBLFlBQVksRUFBRTtBQUFoQixHQUExQixDQUFoQjtBQUNBLE1BQUlDLE1BQU0sR0FBRyxFQUFiOztBQUYrQjtBQUk3QixRQUFJQyxLQUFLLEdBQUdaLFNBQVMsQ0FBQ0ssU0FBVixFQUFaO0FBQ0EsUUFBSVEsS0FBSyxHQUFHckIsZUFBZSxDQUFDTyxZQUFZLENBQUNhLEtBQUQsRUFBUVosU0FBUixDQUFiLENBQTNCOztBQUNBLFFBQUlhLEtBQUosRUFBVztBQUNURixNQUFBQSxNQUFNLElBQUlDLEtBQUssQ0FBQyxDQUFELENBQUwsQ0FBU0UsS0FBVCxDQUFlLE9BQWYsRUFDUEMsR0FETyxDQUNILFVBQUFDLENBQUM7QUFBQSxlQUFJSCxLQUFLLENBQUNHLENBQUQsQ0FBVDtBQUFBLE9BREUsRUFFUEMsSUFGTyxDQUVGLElBRkUsQ0FBVjtBQUdELEtBSkQsTUFJTztBQUNMTixNQUFBQSxNQUFNLElBQUlDLEtBQUssQ0FBQyxDQUFELENBQWY7QUFDRDtBQVo0Qjs7QUFHL0IsU0FBTyxDQUFDWixTQUFTLENBQUNHLFNBQVYsRUFBUixFQUErQjtBQUFBO0FBVTlCOztBQUNELFNBQU9RLE1BQVA7QUFDRDs7ZUFFY0osaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2hhbGsgZnJvbSAnY2hhbGsnXG5cbmltcG9ydCB0b2tlbml6ZXIgZnJvbSAnLi90b2tlbml6ZSdcbmltcG9ydCBJbnB1dCBmcm9tICcuL2lucHV0J1xuXG5jb25zdCBISUdITElHSFRfVEhFTUUgPSB7XG4gICdicmFja2V0cyc6IGNoYWxrLmN5YW4sXG4gICdhdC13b3JkJzogY2hhbGsuY3lhbixcbiAgJ2NvbW1lbnQnOiBjaGFsay5ncmF5LFxuICAnc3RyaW5nJzogY2hhbGsuZ3JlZW4sXG4gICdjbGFzcyc6IGNoYWxrLnllbGxvdyxcbiAgJ2NhbGwnOiBjaGFsay5jeWFuLFxuICAnaGFzaCc6IGNoYWxrLm1hZ2VudGEsXG4gICcoJzogY2hhbGsuY3lhbixcbiAgJyknOiBjaGFsay5jeWFuLFxuICAneyc6IGNoYWxrLnllbGxvdyxcbiAgJ30nOiBjaGFsay55ZWxsb3csXG4gICdbJzogY2hhbGsueWVsbG93LFxuICAnXSc6IGNoYWxrLnllbGxvdyxcbiAgJzonOiBjaGFsay55ZWxsb3csXG4gICc7JzogY2hhbGsueWVsbG93XG59XG5cbmZ1bmN0aW9uIGdldFRva2VuVHlwZSAoW3R5cGUsIHZhbHVlXSwgcHJvY2Vzc29yKSB7XG4gIGlmICh0eXBlID09PSAnd29yZCcpIHtcbiAgICBpZiAodmFsdWVbMF0gPT09ICcuJykge1xuICAgICAgcmV0dXJuICdjbGFzcydcbiAgICB9XG4gICAgaWYgKHZhbHVlWzBdID09PSAnIycpIHtcbiAgICAgIHJldHVybiAnaGFzaCdcbiAgICB9XG4gIH1cblxuICBpZiAoIXByb2Nlc3Nvci5lbmRPZkZpbGUoKSkge1xuICAgIGxldCBuZXh0ID0gcHJvY2Vzc29yLm5leHRUb2tlbigpXG4gICAgcHJvY2Vzc29yLmJhY2sobmV4dClcbiAgICBpZiAobmV4dFswXSA9PT0gJ2JyYWNrZXRzJyB8fCBuZXh0WzBdID09PSAnKCcpIHJldHVybiAnY2FsbCdcbiAgfVxuXG4gIHJldHVybiB0eXBlXG59XG5cbmZ1bmN0aW9uIHRlcm1pbmFsSGlnaGxpZ2h0IChjc3MpIHtcbiAgbGV0IHByb2Nlc3NvciA9IHRva2VuaXplcihuZXcgSW5wdXQoY3NzKSwgeyBpZ25vcmVFcnJvcnM6IHRydWUgfSlcbiAgbGV0IHJlc3VsdCA9ICcnXG4gIHdoaWxlICghcHJvY2Vzc29yLmVuZE9mRmlsZSgpKSB7XG4gICAgbGV0IHRva2VuID0gcHJvY2Vzc29yLm5leHRUb2tlbigpXG4gICAgbGV0IGNvbG9yID0gSElHSExJR0hUX1RIRU1FW2dldFRva2VuVHlwZSh0b2tlbiwgcHJvY2Vzc29yKV1cbiAgICBpZiAoY29sb3IpIHtcbiAgICAgIHJlc3VsdCArPSB0b2tlblsxXS5zcGxpdCgvXFxyP1xcbi8pXG4gICAgICAgIC5tYXAoaSA9PiBjb2xvcihpKSlcbiAgICAgICAgLmpvaW4oJ1xcbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCArPSB0b2tlblsxXVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBkZWZhdWx0IHRlcm1pbmFsSGlnaGxpZ2h0XG4iXSwiZmlsZSI6InRlcm1pbmFsLWhpZ2hsaWdodC5qcyJ9


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = tokenizer;
var SINGLE_QUOTE = '\''.charCodeAt(0);
var DOUBLE_QUOTE = '"'.charCodeAt(0);
var BACKSLASH = '\\'.charCodeAt(0);
var SLASH = '/'.charCodeAt(0);
var NEWLINE = '\n'.charCodeAt(0);
var SPACE = ' '.charCodeAt(0);
var FEED = '\f'.charCodeAt(0);
var TAB = '\t'.charCodeAt(0);
var CR = '\r'.charCodeAt(0);
var OPEN_SQUARE = '['.charCodeAt(0);
var CLOSE_SQUARE = ']'.charCodeAt(0);
var OPEN_PARENTHESES = '('.charCodeAt(0);
var CLOSE_PARENTHESES = ')'.charCodeAt(0);
var OPEN_CURLY = '{'.charCodeAt(0);
var CLOSE_CURLY = '}'.charCodeAt(0);
var SEMICOLON = ';'.charCodeAt(0);
var ASTERISK = '*'.charCodeAt(0);
var COLON = ':'.charCodeAt(0);
var AT = '@'.charCodeAt(0);
var RE_AT_END = /[ \n\t\r\f{}()'"\\;/[\]#]/g;
var RE_WORD_END = /[ \n\t\r\f(){}:;@!'"\\\][#]|\/(?=\*)/g;
var RE_BAD_BRACKET = /.[\\/("'\n]/;
var RE_HEX_ESCAPE = /[a-f0-9]/i;

function tokenizer(input, options) {
  if (options === void 0) {
    options = {};
  }

  var css = input.css.valueOf();
  var ignore = options.ignoreErrors;
  var code, next, quote, lines, last, content, escape;
  var nextLine, nextOffset, escaped, escapePos, prev, n, currentToken;
  var length = css.length;
  var offset = -1;
  var line = 1;
  var pos = 0;
  var buffer = [];
  var returned = [];

  function position() {
    return pos;
  }

  function unclosed(what) {
    throw input.error('Unclosed ' + what, line, pos - offset);
  }

  function endOfFile() {
    return returned.length === 0 && pos >= length;
  }

  function nextToken(opts) {
    if (returned.length) return returned.pop();
    if (pos >= length) return;
    var ignoreUnclosed = opts ? opts.ignoreUnclosed : false;
    code = css.charCodeAt(pos);

    if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
      offset = pos;
      line += 1;
    }

    switch (code) {
      case NEWLINE:
      case SPACE:
      case TAB:
      case CR:
      case FEED:
        next = pos;

        do {
          next += 1;
          code = css.charCodeAt(next);

          if (code === NEWLINE) {
            offset = next;
            line += 1;
          }
        } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);

        currentToken = ['space', css.slice(pos, next)];
        pos = next - 1;
        break;

      case OPEN_SQUARE:
      case CLOSE_SQUARE:
      case OPEN_CURLY:
      case CLOSE_CURLY:
      case COLON:
      case SEMICOLON:
      case CLOSE_PARENTHESES:
        var controlChar = String.fromCharCode(code);
        currentToken = [controlChar, controlChar, line, pos - offset];
        break;

      case OPEN_PARENTHESES:
        prev = buffer.length ? buffer.pop()[1] : '';
        n = css.charCodeAt(pos + 1);

        if (prev === 'url' && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
          next = pos;

          do {
            escaped = false;
            next = css.indexOf(')', next + 1);

            if (next === -1) {
              if (ignore || ignoreUnclosed) {
                next = pos;
                break;
              } else {
                unclosed('bracket');
              }
            }

            escapePos = next;

            while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
              escapePos -= 1;
              escaped = !escaped;
            }
          } while (escaped);

          currentToken = ['brackets', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
          pos = next;
        } else {
          next = css.indexOf(')', pos + 1);
          content = css.slice(pos, next + 1);

          if (next === -1 || RE_BAD_BRACKET.test(content)) {
            currentToken = ['(', '(', line, pos - offset];
          } else {
            currentToken = ['brackets', content, line, pos - offset, line, next - offset];
            pos = next;
          }
        }

        break;

      case SINGLE_QUOTE:
      case DOUBLE_QUOTE:
        quote = code === SINGLE_QUOTE ? '\'' : '"';
        next = pos;

        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);

          if (next === -1) {
            if (ignore || ignoreUnclosed) {
              next = pos + 1;
              break;
            } else {
              unclosed('string');
            }
          }

          escapePos = next;

          while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped);

        content = css.slice(pos, next + 1);
        lines = content.split('\n');
        last = lines.length - 1;

        if (last > 0) {
          nextLine = line + last;
          nextOffset = next - lines[last].length;
        } else {
          nextLine = line;
          nextOffset = offset;
        }

        currentToken = ['string', css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset];
        offset = nextOffset;
        line = nextLine;
        pos = next;
        break;

      case AT:
        RE_AT_END.lastIndex = pos + 1;
        RE_AT_END.test(css);

        if (RE_AT_END.lastIndex === 0) {
          next = css.length - 1;
        } else {
          next = RE_AT_END.lastIndex - 2;
        }

        currentToken = ['at-word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
        pos = next;
        break;

      case BACKSLASH:
        next = pos;
        escape = true;

        while (css.charCodeAt(next + 1) === BACKSLASH) {
          next += 1;
          escape = !escape;
        }

        code = css.charCodeAt(next + 1);

        if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
          next += 1;

          if (RE_HEX_ESCAPE.test(css.charAt(next))) {
            while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
              next += 1;
            }

            if (css.charCodeAt(next + 1) === SPACE) {
              next += 1;
            }
          }
        }

        currentToken = ['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
        pos = next;
        break;

      default:
        if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
          next = css.indexOf('*/', pos + 2) + 1;

          if (next === 0) {
            if (ignore || ignoreUnclosed) {
              next = css.length;
            } else {
              unclosed('comment');
            }
          }

          content = css.slice(pos, next + 1);
          lines = content.split('\n');
          last = lines.length - 1;

          if (last > 0) {
            nextLine = line + last;
            nextOffset = next - lines[last].length;
          } else {
            nextLine = line;
            nextOffset = offset;
          }

          currentToken = ['comment', content, line, pos - offset, nextLine, next - nextOffset];
          offset = nextOffset;
          line = nextLine;
          pos = next;
        } else {
          RE_WORD_END.lastIndex = pos + 1;
          RE_WORD_END.test(css);

          if (RE_WORD_END.lastIndex === 0) {
            next = css.length - 1;
          } else {
            next = RE_WORD_END.lastIndex - 2;
          }

          currentToken = ['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];
          buffer.push(currentToken);
          pos = next;
        }

        break;
    }

    pos++;
    return currentToken;
  }

  function back(token) {
    returned.push(token);
  }

  return {
    back: back,
    nextToken: nextToken,
    endOfFile: endOfFile,
    position: position
  };
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuaXplLmVzNiJdLCJuYW1lcyI6WyJTSU5HTEVfUVVPVEUiLCJjaGFyQ29kZUF0IiwiRE9VQkxFX1FVT1RFIiwiQkFDS1NMQVNIIiwiU0xBU0giLCJORVdMSU5FIiwiU1BBQ0UiLCJGRUVEIiwiVEFCIiwiQ1IiLCJPUEVOX1NRVUFSRSIsIkNMT1NFX1NRVUFSRSIsIk9QRU5fUEFSRU5USEVTRVMiLCJDTE9TRV9QQVJFTlRIRVNFUyIsIk9QRU5fQ1VSTFkiLCJDTE9TRV9DVVJMWSIsIlNFTUlDT0xPTiIsIkFTVEVSSVNLIiwiQ09MT04iLCJBVCIsIlJFX0FUX0VORCIsIlJFX1dPUkRfRU5EIiwiUkVfQkFEX0JSQUNLRVQiLCJSRV9IRVhfRVNDQVBFIiwidG9rZW5pemVyIiwiaW5wdXQiLCJvcHRpb25zIiwiY3NzIiwidmFsdWVPZiIsImlnbm9yZSIsImlnbm9yZUVycm9ycyIsImNvZGUiLCJuZXh0IiwicXVvdGUiLCJsaW5lcyIsImxhc3QiLCJjb250ZW50IiwiZXNjYXBlIiwibmV4dExpbmUiLCJuZXh0T2Zmc2V0IiwiZXNjYXBlZCIsImVzY2FwZVBvcyIsInByZXYiLCJuIiwiY3VycmVudFRva2VuIiwibGVuZ3RoIiwib2Zmc2V0IiwibGluZSIsInBvcyIsImJ1ZmZlciIsInJldHVybmVkIiwicG9zaXRpb24iLCJ1bmNsb3NlZCIsIndoYXQiLCJlcnJvciIsImVuZE9mRmlsZSIsIm5leHRUb2tlbiIsIm9wdHMiLCJwb3AiLCJpZ25vcmVVbmNsb3NlZCIsInNsaWNlIiwiY29udHJvbENoYXIiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJpbmRleE9mIiwidGVzdCIsInNwbGl0IiwibGFzdEluZGV4IiwiY2hhckF0IiwicHVzaCIsImJhY2siLCJ0b2tlbiJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQU1BLFlBQVksR0FBRyxLQUFLQyxVQUFMLENBQWdCLENBQWhCLENBQXJCO0FBQ0EsSUFBTUMsWUFBWSxHQUFHLElBQUlELFVBQUosQ0FBZSxDQUFm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LElBQVQsQ0FBZUMsS0FBZixFQUFzQjtBQUNwQnJCLElBQUFBLFFBQVEsQ0FBQ21CLElBQVQsQ0FBY0UsS0FBZDtBQUNEOztBQUVELFNBQU87QUFDTEQsSUFBQUEsSUFBSSxFQUFKQSxJQURLO0FBRUxkLElBQUFBLFNBQVMsRUFBVEEsU0FGSztBQUdMRCxJQUFBQSxTQUFTLEVBQVRBLFNBSEs7QUFJTEosSUFBQUEsUUFBUSxFQUFSQTtBQUpLLEdBQVA7QUFNRCIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNJTkdMRV9RVU9URSA9ICdcXCcnLmNoYXJDb2RlQXQoMClcbmNvbnN0IERPVUJMRV9RVU9URSA9ICdcIicuY2hhckNvZGVBdCgwKVxuY29uc3QgQkFDS1NMQVNIID0gJ1xcXFwnLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNMQVNIID0gJy8nLmNoYXJDb2RlQXQoMClcbmNvbnN0IE5FV0xJTkUgPSAnXFxuJy5jaGFyQ29kZUF0KDApXG5jb25zdCBTUEFDRSA9ICcgJy5jaGFyQ29kZUF0KDApXG5jb25zdCBGRUVEID0gJ1xcZicuY2hhckNvZGVBdCgwKVxuY29uc3QgVEFCID0gJ1xcdCcuY2hhckNvZGVBdCgwKVxuY29uc3QgQ1IgPSAnXFxyJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX1NRVUFSRSA9ICdbJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9TUVVBUkUgPSAnXScuY2hhckNvZGVBdCgwKVxuY29uc3QgT1BFTl9QQVJFTlRIRVNFUyA9ICcoJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDTE9TRV9QQVJFTlRIRVNFUyA9ICcpJy5jaGFyQ29kZUF0KDApXG5jb25zdCBPUEVOX0NVUkxZID0gJ3snLmNoYXJDb2RlQXQoMClcbmNvbnN0IENMT1NFX0NVUkxZID0gJ30nLmNoYXJDb2RlQXQoMClcbmNvbnN0IFNFTUlDT0xPTiA9ICc7Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBU1RFUklTSyA9ICcqJy5jaGFyQ29kZUF0KDApXG5jb25zdCBDT0xPTiA9ICc6Jy5jaGFyQ29kZUF0KDApXG5jb25zdCBBVCA9ICdAJy5jaGFyQ29kZUF0KDApXG5cbmNvbnN0IFJFX0FUX0VORCA9IC9bIFxcblxcdFxcclxcZnt9KCknXCJcXFxcOy9bXFxdI10vZ1xuY29uc3QgUkVfV09SRF9FTkQgPSAvWyBcXG5cXHRcXHJcXGYoKXt9OjtAISdcIlxcXFxcXF1bI118XFwvKD89XFwqKS9nXG5jb25zdCBSRV9CQURfQlJBQ0tFVCA9IC8uW1xcXFwvKFwiJ1xcbl0vXG5jb25zdCBSRV9IRVhfRVNDQVBFID0gL1thLWYwLTldL2lcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdG9rZW5pemVyIChpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG4gIGxldCBjc3MgPSBpbnB1dC5jc3MudmFsdWVPZigpXG4gIGxldCBpZ25vcmUgPSBvcHRpb25zLmlnbm9yZUVycm9yc1xuXG4gIGxldCBjb2RlLCBuZXh0LCBxdW90ZSwgbGluZXMsIGxhc3QsIGNvbnRlbnQsIGVzY2FwZVxuICBsZXQgbmV4dExpbmUsIG5leHRPZmZzZXQsIGVzY2FwZWQsIGVzY2FwZVBvcywgcHJldiwgbiwgY3VycmVudFRva2VuXG5cbiAgbGV0IGxlbmd0aCA9IGNzcy5sZW5ndGhcbiAgbGV0IG9mZnNldCA9IC0xXG4gIGxldCBsaW5lID0gMVxuICBsZXQgcG9zID0gMFxuICBsZXQgYnVmZmVyID0gW11cbiAgbGV0IHJldHVybmVkID0gW11cblxuICBmdW5jdGlvbiBwb3NpdGlvbiAoKSB7XG4gICAgcmV0dXJuIHBvc1xuICB9XG5cbiAgZnVuY3Rpb24gdW5jbG9zZWQgKHdoYXQpIHtcbiAgICB0aHJvdyBpbnB1dC5lcnJvcignVW5jbG9zZWQgJyArIHdoYXQsIGxpbmUsIHBvcyAtIG9mZnNldClcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZE9mRmlsZSAoKSB7XG4gICAgcmV0dXJuIHJldHVybmVkLmxlbmd0aCA9PT0gMCAmJiBwb3MgPj0gbGVuZ3RoXG4gIH1cblxuICBmdW5jdGlvbiBuZXh0VG9rZW4gKG9wdHMpIHtcbiAgICBpZiAocmV0dXJuZWQubGVuZ3RoKSByZXR1cm4gcmV0dXJuZWQucG9wKClcbiAgICBpZiAocG9zID49IGxlbmd0aCkgcmV0dXJuXG5cbiAgICBsZXQgaWdub3JlVW5jbG9zZWQgPSBvcHRzID8gb3B0cy5pZ25vcmVVbmNsb3NlZCA6IGZhbHNlXG5cbiAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQocG9zKVxuICAgIGlmIChcbiAgICAgIGNvZGUgPT09IE5FV0xJTkUgfHwgY29kZSA9PT0gRkVFRCB8fFxuICAgICAgKGNvZGUgPT09IENSICYmIGNzcy5jaGFyQ29kZUF0KHBvcyArIDEpICE9PSBORVdMSU5FKVxuICAgICkge1xuICAgICAgb2Zmc2V0ID0gcG9zXG4gICAgICBsaW5lICs9IDFcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNvZGUpIHtcbiAgICAgIGNhc2UgTkVXTElORTpcbiAgICAgIGNhc2UgU1BBQ0U6XG4gICAgICBjYXNlIFRBQjpcbiAgICAgIGNhc2UgQ1I6XG4gICAgICBjYXNlIEZFRUQ6XG4gICAgICAgIG5leHQgPSBwb3NcbiAgICAgICAgZG8ge1xuICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChuZXh0KVxuICAgICAgICAgIGlmIChjb2RlID09PSBORVdMSU5FKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSBuZXh0XG4gICAgICAgICAgICBsaW5lICs9IDFcbiAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKFxuICAgICAgICAgIGNvZGUgPT09IFNQQUNFIHx8XG4gICAgICAgICAgY29kZSA9PT0gTkVXTElORSB8fFxuICAgICAgICAgIGNvZGUgPT09IFRBQiB8fFxuICAgICAgICAgIGNvZGUgPT09IENSIHx8XG4gICAgICAgICAgY29kZSA9PT0gRkVFRFxuICAgICAgICApXG5cbiAgICAgICAgY3VycmVudFRva2VuID0gWydzcGFjZScsIGNzcy5zbGljZShwb3MsIG5leHQpXVxuICAgICAgICBwb3MgPSBuZXh0IC0gMVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIE9QRU5fU1FVQVJFOlxuICAgICAgY2FzZSBDTE9TRV9TUVVBUkU6XG4gICAgICBjYXNlIE9QRU5fQ1VSTFk6XG4gICAgICBjYXNlIENMT1NFX0NVUkxZOlxuICAgICAgY2FzZSBDT0xPTjpcbiAgICAgIGNhc2UgU0VNSUNPTE9OOlxuICAgICAgY2FzZSBDTE9TRV9QQVJFTlRIRVNFUzpcbiAgICAgICAgbGV0IGNvbnRyb2xDaGFyID0gU3RyaW5nLmZyb21DaGFyQ29kZShjb2RlKVxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbY29udHJvbENoYXIsIGNvbnRyb2xDaGFyLCBsaW5lLCBwb3MgLSBvZmZzZXRdXG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgT1BFTl9QQVJFTlRIRVNFUzpcbiAgICAgICAgcHJldiA9IGJ1ZmZlci5sZW5ndGggPyBidWZmZXIucG9wKClbMV0gOiAnJ1xuICAgICAgICBuID0gY3NzLmNoYXJDb2RlQXQocG9zICsgMSlcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXYgPT09ICd1cmwnICYmXG4gICAgICAgICAgbiAhPT0gU0lOR0xFX1FVT1RFICYmIG4gIT09IERPVUJMRV9RVU9URSAmJlxuICAgICAgICAgIG4gIT09IFNQQUNFICYmIG4gIT09IE5FV0xJTkUgJiYgbiAhPT0gVEFCICYmXG4gICAgICAgICAgbiAhPT0gRkVFRCAmJiBuICE9PSBDUlxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlXG4gICAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YoJyknLCBuZXh0ICsgMSlcbiAgICAgICAgICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdW5jbG9zZWQoJ2JyYWNrZXQnKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0XG4gICAgICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgICAgICBlc2NhcGVQb3MgLT0gMVxuICAgICAgICAgICAgICBlc2NhcGVkID0gIWVzY2FwZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChlc2NhcGVkKVxuXG4gICAgICAgICAgY3VycmVudFRva2VuID0gWydicmFja2V0cycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICAgIGxpbmUsIHBvcyAtIG9mZnNldCxcbiAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICBdXG5cbiAgICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcpJywgcG9zICsgMSlcbiAgICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpXG5cbiAgICAgICAgICBpZiAobmV4dCA9PT0gLTEgfHwgUkVfQkFEX0JSQUNLRVQudGVzdChjb250ZW50KSkge1xuICAgICAgICAgICAgY3VycmVudFRva2VuID0gWycoJywgJygnLCBsaW5lLCBwb3MgLSBvZmZzZXRdXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYnJhY2tldHMnLCBjb250ZW50LFxuICAgICAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIFNJTkdMRV9RVU9URTpcbiAgICAgIGNhc2UgRE9VQkxFX1FVT1RFOlxuICAgICAgICBxdW90ZSA9IGNvZGUgPT09IFNJTkdMRV9RVU9URSA/ICdcXCcnIDogJ1wiJ1xuICAgICAgICBuZXh0ID0gcG9zXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBlc2NhcGVkID0gZmFsc2VcbiAgICAgICAgICBuZXh0ID0gY3NzLmluZGV4T2YocXVvdGUsIG5leHQgKyAxKVxuICAgICAgICAgIGlmIChuZXh0ID09PSAtMSkge1xuICAgICAgICAgICAgaWYgKGlnbm9yZSB8fCBpZ25vcmVVbmNsb3NlZCkge1xuICAgICAgICAgICAgICBuZXh0ID0gcG9zICsgMVxuICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdW5jbG9zZWQoJ3N0cmluZycpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVzY2FwZVBvcyA9IG5leHRcbiAgICAgICAgICB3aGlsZSAoY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgICAgZXNjYXBlUG9zIC09IDFcbiAgICAgICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZFxuICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoZXNjYXBlZClcblxuICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpXG4gICAgICAgIGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJylcbiAgICAgICAgbGFzdCA9IGxpbmVzLmxlbmd0aCAtIDFcblxuICAgICAgICBpZiAobGFzdCA+IDApIHtcbiAgICAgICAgICBuZXh0TGluZSA9IGxpbmUgKyBsYXN0XG4gICAgICAgICAgbmV4dE9mZnNldCA9IG5leHQgLSBsaW5lc1tsYXN0XS5sZW5ndGhcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0TGluZSA9IGxpbmVcbiAgICAgICAgICBuZXh0T2Zmc2V0ID0gb2Zmc2V0XG4gICAgICAgIH1cblxuICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3N0cmluZycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgbmV4dExpbmUsIG5leHQgLSBuZXh0T2Zmc2V0XG4gICAgICAgIF1cblxuICAgICAgICBvZmZzZXQgPSBuZXh0T2Zmc2V0XG4gICAgICAgIGxpbmUgPSBuZXh0TGluZVxuICAgICAgICBwb3MgPSBuZXh0XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgQVQ6XG4gICAgICAgIFJFX0FUX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxXG4gICAgICAgIFJFX0FUX0VORC50ZXN0KGNzcylcbiAgICAgICAgaWYgKFJFX0FUX0VORC5sYXN0SW5kZXggPT09IDApIHtcbiAgICAgICAgICBuZXh0ID0gY3NzLmxlbmd0aCAtIDFcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXh0ID0gUkVfQVRfRU5ELmxhc3RJbmRleCAtIDJcbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYXQtd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICBdXG5cbiAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlIEJBQ0tTTEFTSDpcbiAgICAgICAgbmV4dCA9IHBvc1xuICAgICAgICBlc2NhcGUgPSB0cnVlXG4gICAgICAgIHdoaWxlIChjc3MuY2hhckNvZGVBdChuZXh0ICsgMSkgPT09IEJBQ0tTTEFTSCkge1xuICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgIGVzY2FwZSA9ICFlc2NhcGVcbiAgICAgICAgfVxuICAgICAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQobmV4dCArIDEpXG4gICAgICAgIGlmIChcbiAgICAgICAgICBlc2NhcGUgJiZcbiAgICAgICAgICBjb2RlICE9PSBTTEFTSCAmJlxuICAgICAgICAgIGNvZGUgIT09IFNQQUNFICYmXG4gICAgICAgICAgY29kZSAhPT0gTkVXTElORSAmJlxuICAgICAgICAgIGNvZGUgIT09IFRBQiAmJlxuICAgICAgICAgIGNvZGUgIT09IENSICYmXG4gICAgICAgICAgY29kZSAhPT0gRkVFRFxuICAgICAgICApIHtcbiAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICBpZiAoUkVfSEVYX0VTQ0FQRS50ZXN0KGNzcy5jaGFyQXQobmV4dCkpKSB7XG4gICAgICAgICAgICB3aGlsZSAoUkVfSEVYX0VTQ0FQRS50ZXN0KGNzcy5jaGFyQXQobmV4dCArIDEpKSkge1xuICAgICAgICAgICAgICBuZXh0ICs9IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjc3MuY2hhckNvZGVBdChuZXh0ICsgMSkgPT09IFNQQUNFKSB7XG4gICAgICAgICAgICAgIG5leHQgKz0gMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICBsaW5lLCBwb3MgLSBvZmZzZXQsXG4gICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICBdXG5cbiAgICAgICAgcG9zID0gbmV4dFxuICAgICAgICBicmVha1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAoY29kZSA9PT0gU0xBU0ggJiYgY3NzLmNoYXJDb2RlQXQocG9zICsgMSkgPT09IEFTVEVSSVNLKSB7XG4gICAgICAgICAgbmV4dCA9IGNzcy5pbmRleE9mKCcqLycsIHBvcyArIDIpICsgMVxuICAgICAgICAgIGlmIChuZXh0ID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoaWdub3JlIHx8IGlnbm9yZVVuY2xvc2VkKSB7XG4gICAgICAgICAgICAgIG5leHQgPSBjc3MubGVuZ3RoXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1bmNsb3NlZCgnY29tbWVudCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGVudCA9IGNzcy5zbGljZShwb3MsIG5leHQgKyAxKVxuICAgICAgICAgIGxpbmVzID0gY29udGVudC5zcGxpdCgnXFxuJylcbiAgICAgICAgICBsYXN0ID0gbGluZXMubGVuZ3RoIC0gMVxuXG4gICAgICAgICAgaWYgKGxhc3QgPiAwKSB7XG4gICAgICAgICAgICBuZXh0TGluZSA9IGxpbmUgKyBsYXN0XG4gICAgICAgICAgICBuZXh0T2Zmc2V0ID0gbmV4dCAtIGxpbmVzW2xhc3RdLmxlbmd0aFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXh0TGluZSA9IGxpbmVcbiAgICAgICAgICAgIG5leHRPZmZzZXQgPSBvZmZzZXRcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ2NvbW1lbnQnLCBjb250ZW50LFxuICAgICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgICAgbmV4dExpbmUsIG5leHQgLSBuZXh0T2Zmc2V0XG4gICAgICAgICAgXVxuXG4gICAgICAgICAgb2Zmc2V0ID0gbmV4dE9mZnNldFxuICAgICAgICAgIGxpbmUgPSBuZXh0TGluZVxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBSRV9XT1JEX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxXG4gICAgICAgICAgUkVfV09SRF9FTkQudGVzdChjc3MpXG4gICAgICAgICAgaWYgKFJFX1dPUkRfRU5ELmxhc3RJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHQgPSBSRV9XT1JEX0VORC5sYXN0SW5kZXggLSAyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY3VycmVudFRva2VuID0gWyd3b3JkJywgY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpLFxuICAgICAgICAgICAgbGluZSwgcG9zIC0gb2Zmc2V0LFxuICAgICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICAgIF1cblxuICAgICAgICAgIGJ1ZmZlci5wdXNoKGN1cnJlbnRUb2tlbilcblxuICAgICAgICAgIHBvcyA9IG5leHRcbiAgICAgICAgfVxuXG4gICAgICAgIGJyZWFrXG4gICAgfVxuXG4gICAgcG9zKytcbiAgICByZXR1cm4gY3VycmVudFRva2VuXG4gIH1cblxuICBmdW5jdGlvbiBiYWNrICh0b2tlbikge1xuICAgIHJldHVybmVkLnB1c2godG9rZW4pXG4gIH1cblxuICByZXR1cm4ge1xuICAgIGJhY2ssXG4gICAgbmV4dFRva2VuLFxuICAgIGVuZE9mRmlsZSxcbiAgICBwb3NpdGlvblxuICB9XG59XG4iXSwiZmlsZSI6InRva2VuaXplLmpzIn0=


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _path = _interopRequireDefault(__webpack_require__(23));

var _cssSyntaxError = _interopRequireDefault(__webpack_require__(6));

var _previousMap = _interopRequireDefault(__webpack_require__(24));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var sequence = 0;
/**
 * Represents the source CSS.
 *
 * @example
 * const root  = postcss.parse(css, { from: file })
 * const input = root.source.input
 */

var Input =
/*#__PURE__*/
function () {
  /**
   * @param {string} css    Input CSS source.
   * @param {object} [opts] {@link Processor#process} options.
   */
  function Input(css, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (css === null || typeof css === 'object' && !css.toString) {
      throw new Error("PostCSS received " + css + " instead of CSS string");
    }
    /**
     * Input CSS source
     *
     * @type {string}
     *
     * @example
     * const input = postcss.parse('a{}', { from: file }).input
     * input.css //=> "a{}"
     */


    this.css = css.toString();

    if (this.css[0] === "\uFEFF" || this.css[0] === "\uFFFE") {
      this.hasBOM = true;
      this.css = this.css.slice(1);
    } else {
      this.hasBOM = false;
    }

    if (opts.from) {
      if (/^\w+:\/\//.test(opts.from)) {
        /**
         * The absolute path to the CSS source file defined
         * with the `from` option.
         *
         * @type {string}
         *
         * @example
         * const root = postcss.parse(css, { from: 'a.css' })
         * root.source.input.file //=> '/home/ai/a.css'
         */
        this.file = opts.from;
      } else {
        this.file = _path.default.resolve(opts.from);
      }
    }

    var map = new _previousMap.default(this.css, opts);

    if (map.text) {
      /**
       * The input source map passed from a compilation step before PostCSS
       * (for example, from Sass compiler).
       *
       * @type {PreviousMap}
       *
       * @example
       * root.source.input.map.consumer().sources //=> ['a.sass']
       */
      this.map = map;
      var file = map.consumer().file;
      if (!this.file && file) this.file = this.mapResolve(file);
    }

    if (!this.file) {
      sequence += 1;
      /**
       * The unique ID of the CSS source. It will be created if `from` option
       * is not provided (because PostCSS does not know the file path).
       *
       * @type {string}
       *
       * @example
       * const root = postcss.parse(css)
       * root.source.input.file //=> undefined
       * root.source.input.id   //=> "<input css 1>"
       */

      this.id = '<input css ' + sequence + '>';
    }

    if (this.map) this.map.file = this.from;
  }

  var _proto = Input.prototype;

  _proto.error = function error(message, line, column, opts) {
    if (opts === void 0) {
      opts = {};
    }

    var result;
    var origin = this.origin(line, column);

    if (origin) {
      result = new _cssSyntaxError.default(message, origin.line, origin.column, origin.source, origin.file, opts.plugin);
    } else {
      result = new _cssSyntaxError.default(message, line, column, this.css, this.file, opts.plugin);
    }

    result.input = {
      line: line,
      column: column,
      source: this.css
    };
    if (this.file) result.input.file = this.file;
    return result;
  }
  /**
   * Reads the input source map and returns a symbol position
   * in the input source (e.g., in a Sass file that was compiled
   * to CSS before being passed to PostCSS).
   *
   * @param {number} line   Line in input CSS.
   * @param {number} column Column in input CSS.
   *
   * @return {filePosition} Position in input source.
   *
   * @example
   * root.source.input.origin(1, 1) //=> { file: 'a.css', line: 3, column: 1 }
   */
  ;

  _proto.origin = function origin(line, column) {
    if (!this.map) return false;
    var consumer = this.map.consumer();
    var from = consumer.originalPositionFor({
      line: line,
      column: column
    });
    if (!from.source) return false;
    var result = {
      file: this.mapResolve(from.source),
      line: from.line,
      column: from.column
    };
    var source = consumer.sourceContentFor(from.source);
    if (source) result.source = source;
    return result;
  };

  _proto.mapResolve = function mapResolve(file) {
    if (/^\w+:\/\//.test(file)) {
      return file;
    }

    return _path.default.resolve(this.map.consumer().sourceRoot || '.', file);
  }
  /**
   * The CSS source identifier. Contains {@link Input#file} if the user
   * set the `from` option, or {@link Input#id} if they did not.
   *
   * @type {string}
   *
   * @example
   * const root = postcss.parse(css, { from: 'a.css' })
   * root.source.input.from //=> "/home/ai/a.css"
   *
   * const root = postcss.parse(css)
   * root.source.input.from //=> "<input css 1>"
   */
  ;

  _createClass(Input, [{
    key: "from",
    get: function get() {
      return this.file || this.id;
    }
  }]);

  return Input;
}();

var _default = Input;
/**
 * @typedef  {object} filePosition
 * @property {string} file   Path to file.
 * @property {number} line   Source line in file.
 * @property {number} column Source column in file.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0LmVzNiJdLCJuYW1lcyI6WyJzZXF1ZW5jZSIsIklucHV0IiwiY3NzIiwib3B0cyIsInRvU3RyaW5nIiwiRXJyb3IiLCJoYXNCT00iLCJzbGljZSIsImZyb20iLCJ0ZXN0IiwiZmlsZSIsInBhdGgiLCJyZXNvbHZlIiwibWFwIiwiUHJldmlvdXNNYXAiLCJ0ZXh0IiwiY29uc3VtZXIiLCJtYXBSZXNvbHZlIiwiaWQiLCJlcnJvciIsIm1lc3NhZ2UiLCJsaW5lIiwiY29sdW1uIiwicmVzdWx0Iiwib3JpZ2luIiwiQ3NzU3ludGF4RXJyb3IiLCJzb3VyY2UiLCJwbHVnaW4iLCJpbnB1dCIsIm9yaWdpbmFsUG9zaXRpb25Gb3IiLCJzb3VyY2VDb250ZW50Rm9yIiwic291cmNlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJQSxRQUFRLEdBQUcsQ0FBZjtBQUVBOzs7Ozs7OztJQU9NQyxLOzs7QUFDSjs7OztBQUlBLGlCQUFhQyxHQUFiLEVBQWtCQyxJQUFsQixFQUE4QjtBQUFBLFFBQVpBLElBQVk7QUFBWkEsTUFBQUEsSUFBWSxHQUFMLEVBQUs7QUFBQTs7QUFDNUIsUUFBSUQsR0FBRyxLQUFLLElBQVIsSUFBaUIsT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkIsQ0FBQ0EsR0FBRyxDQUFDRSxRQUFyRCxFQUFnRTtBQUM5RCxZQUFNLElBQUlDLEtBQUosdUJBQStCSCxHQUEvQiw0QkFBTjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7O0FBU0EsU0FBS0EsR0FBTCxHQUFXQSxHQUFHLENBQUNFLFFBQUosRUFBWDs7QUFFQSxRQUFJLEtBQUtGLEdBQUwsQ0FBUyxDQUFULE1BQWdCLFFBQWhCLElBQTRCLEtBQUtBLEdBQUwsQ0FBUyxDQUFULE1BQWdCLFFBQWhELEVBQTBEO0FBQ3hELFdBQUtJLE1BQUwsR0FBYyxJQUFkO0FBQ0EsV0FBS0osR0FBTCxHQUFXLEtBQUtBLEdBQUwsQ0FBU0ssS0FBVCxDQUFlLENB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WDtBQUNBLFFBQUksQ0FBQ2QsSUFBSSxDQUFDa0IsTUFBVixFQUFrQixPQUFPLEtBQVA7QUFFbEIsUUFBSUgsTUFBTSxHQUFHO0FBQ1hiLE1BQUFBLElBQUksRUFBRSxLQUFLTyxVQUFMLENBQWdCVCxJQUFJLENBQUNrQixNQUFyQixDQURLO0FBRVhMLE1BQUFBLElBQUksRUFBRWIsSUFBSSxDQUFDYSxJQUZBO0FBR1hDLE1BQUFBLE1BQU0sRUFBRWQsSUFBSSxDQUFDYztBQUhGLEtBQWI7QUFNQSxRQUFJSSxNQUFNLEdBQUdWLFFBQVEsQ0FBQ2MsZ0JBQVQsQ0FBMEJ0QixJQUFJLENBQUNrQixNQUEvQixDQUFiO0FBQ0EsUUFBSUEsTUFBSixFQUFZSCxNQUFNLENBQUNHLE1BQVAsR0FBZ0JBLE1BQWhCO0FBRVosV0FBT0gsTUFBUDtBQUNELEc7O1NBRUROLFUsR0FBQSxvQkFBWVAsSUFBWixFQUFrQjtBQUNoQixRQUFJLFlBQVlELElBQVosQ0FBaUJDLElBQWpCLENBQUosRUFBNEI7QUFDMUIsYUFBT0EsSUFBUDtBQUNEOztBQUNELFdBQU9DLGNBQUtDLE9BQUwsQ0FBYSxLQUFLQyxHQUFMLENBQVNHLFFBQVQsR0FBb0JlLFVBQXBCLElBQWtDLEdBQS9DLEVBQW9EckIsSUFBcEQsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O3dCQWFZO0FBQ1YsYUFBTyxLQUFLQSxJQUFMLElBQWEsS0FBS1EsRUFBekI7QUFDRDs7Ozs7O2VBR1lqQixLO0FBRWYiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgQ3NzU3ludGF4RXJyb3IgZnJvbSAnLi9jc3Mtc3ludGF4LWVycm9yJ1xuaW1wb3J0IFByZXZpb3VzTWFwIGZyb20gJy4vcHJldmlvdXMtbWFwJ1xuXG5sZXQgc2VxdWVuY2UgPSAwXG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgc291cmNlIENTUy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCAgPSBwb3N0Y3NzLnBhcnNlKGNzcywgeyBmcm9tOiBmaWxlIH0pXG4gKiBjb25zdCBpbnB1dCA9IHJvb3Quc291cmNlLmlucHV0XG4gKi9cbmNsYXNzIElucHV0IHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBjc3MgICAgSW5wdXQgQ1NTIHNvdXJjZS5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRzXSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9IG9wdGlvbnMuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoY3NzLCBvcHRzID0geyB9KSB7XG4gICAgaWYgKGNzcyA9PT0gbnVsbCB8fCAodHlwZW9mIGNzcyA9PT0gJ29iamVjdCcgJiYgIWNzcy50b1N0cmluZykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgUG9zdENTUyByZWNlaXZlZCAkeyBjc3MgfSBpbnN0ZWFkIG9mIENTUyBzdHJpbmdgKVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElucHV0IENTUyBzb3VyY2VcbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGlucHV0ID0gcG9zdGNzcy5wYXJzZSgnYXt9JywgeyBmcm9tOiBmaWxlIH0pLmlucHV0XG4gICAgICogaW5wdXQuY3NzIC8vPT4gXCJhe31cIlxuICAgICAqL1xuICAgIHRoaXMuY3NzID0gY3NzLnRvU3RyaW5nKClcblxuICAgIGlmICh0aGlzLmNzc1swXSA9PT0gJ1xcdUZFRkYnIHx8IHRoaXMuY3NzWzBdID09PSAnXFx1RkZGRScpIHtcbiAgICAgIHRoaXMuaGFzQk9NID0gdHJ1ZVxuICAgICAgdGhpcy5jc3MgPSB0aGlzLmNzcy5zbGljZSgxKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0JPTSA9IGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZnJvbSkge1xuICAgICAgaWYgKC9eXFx3KzpcXC9cXC8vLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIGFic29sdXRlIHBhdGggdG8gdGhlIENTUyBzb3VyY2UgZmlsZSBkZWZpbmVkXG4gICAgICAgICAqIHdpdGggdGhlIGBmcm9tYCBvcHRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKGNzcywgeyBmcm9tOiAnYS5jc3MnIH0pXG4gICAgICAgICAqIHJvb3Quc291cmNlLmlucHV0LmZpbGUgLy89PiAnL2hvbWUvYWkvYS5jc3MnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpbGUgPSBvcHRzLmZyb21cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZmlsZSA9IHBhdGgucmVzb2x2ZShvcHRzLmZyb20pXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IG1hcCA9IG5ldyBQcmV2aW91c01hcCh0aGlzLmNzcywgb3B0cylcbiAgICBpZiAobWFwLnRleHQpIHtcbiAgICAgIC8qKlxuICAgICAgICogVGhlIGlucHV0IHNvdXJjZSBtYXAgcGFzc2VkIGZyb20gYSBjb21waWxhdGlvbiBzdGVwIGJlZm9yZSBQb3N0Q1NTXG4gICAgICAgKiAoZm9yIGV4YW1wbGUsIGZyb20gU2FzcyBjb21waWxlcikuXG4gICAgICAgKlxuICAgICAgICogQHR5cGUge1ByZXZpb3VzTWFwfVxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5tYXAuY29uc3VtZXIoKS5zb3VyY2VzIC8vPT4gWydhLnNhc3MnXVxuICAgICAgICovXG4gICAgICB0aGlzLm1hcCA9IG1hcFxuICAgICAgbGV0IGZpbGUgPSBtYXAuY29uc3VtZXIoKS5maWxlXG4gICAgICBpZiAoIXRoaXMuZmlsZSAmJiBmaWxlKSB0aGlzLmZpbGUgPSB0aGlzLm1hcFJlc29sdmUoZmlsZSlcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZmlsZSkge1xuICAgICAgc2VxdWVuY2UgKz0gMVxuICAgICAgLyoqXG4gICAgICAgKiBUaGUgdW5pcXVlIElEIG9mIHRoZSBDU1Mgc291cmNlLiBJdCB3aWxsIGJlIGNyZWF0ZWQgaWYgYGZyb21gIG9wdGlvblxuICAgICAgICogaXMgbm90IHByb3ZpZGVkIChiZWNhdXNlIFBvc3RDU1MgZG9lcyBub3Qga25vdyB0aGUgZmlsZSBwYXRoKS5cbiAgICAgICAqXG4gICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MpXG4gICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5maWxlIC8vPT4gdW5kZWZpbmVkXG4gICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5pZCAgIC8vPT4gXCI8aW5wdXQgY3NzIDE+XCJcbiAgICAgICAqL1xuICAgICAgdGhpcy5pZCA9ICc8aW5wdXQgY3NzICcgKyBzZXF1ZW5jZSArICc+J1xuICAgIH1cbiAgICBpZiAodGhpcy5tYXApIHRoaXMubWFwLmZpbGUgPSB0aGlzLmZyb21cbiAgfVxuXG4gIGVycm9yIChtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIG9wdHMgPSB7IH0pIHtcbiAgICBsZXQgcmVzdWx0XG4gICAgbGV0IG9yaWdpbiA9IHRoaXMub3JpZ2luKGxpbmUsIGNvbHVtbilcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICByZXN1bHQgPSBuZXcgQ3NzU3ludGF4RXJyb3IoXG4gICAgICAgIG1lc3NhZ2UsIG9yaWdpbi5saW5lLCBvcmlnaW4uY29sdW1uLFxuICAgICAgICBvcmlnaW4uc291cmNlLCBvcmlnaW4uZmlsZSwgb3B0cy5wbHVnaW5cbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0gbmV3IENzc1N5bnRheEVycm9yKFxuICAgICAgICBtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIHRoaXMuY3NzLCB0aGlzLmZpbGUsIG9wdHMucGx1Z2luKVxuICAgIH1cblxuICAgIHJlc3VsdC5pbnB1dCA9IHsgbGluZSwgY29sdW1uLCBzb3VyY2U6IHRoaXMuY3NzIH1cbiAgICBpZiAodGhpcy5maWxlKSByZXN1bHQuaW5wdXQuZmlsZSA9IHRoaXMuZmlsZVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBpbnB1dCBzb3VyY2UgbWFwIGFuZCByZXR1cm5zIGEgc3ltYm9sIHBvc2l0aW9uXG4gICAqIGluIHRoZSBpbnB1dCBzb3VyY2UgKGUuZy4sIGluIGEgU2FzcyBmaWxlIHRoYXQgd2FzIGNvbXBpbGVkXG4gICAqIHRvIENTUyBiZWZvcmUgYmVpbmcgcGFzc2VkIHRvIFBvc3RDU1MpLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbGluZSAgIExpbmUgaW4gaW5wdXQgQ1NTLlxuICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uIENvbHVtbiBpbiBpbnB1dCBDU1MuXG4gICAqXG4gICAqIEByZXR1cm4ge2ZpbGVQb3NpdGlvbn0gUG9zaXRpb24gaW4gaW5wdXQgc291cmNlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByb290LnNvdXJjZS5pbnB1dC5vcmlnaW4oMSwgMSkgLy89PiB7IGZpbGU6ICdhLmNzcycsIGxpbmU6IDMsIGNvbHVtbjogMSB9XG4gICAqL1xuICBvcmlnaW4gKGxpbmUsIGNvbHVtbikge1xuICAgIGlmICghdGhpcy5tYXApIHJldHVybiBmYWxzZVxuICAgIGxldCBjb25zdW1lciA9IHRoaXMubWFwLmNvbnN1bWVyKClcblxuICAgIGxldCBmcm9tID0gY29uc3VtZXIub3JpZ2luYWxQb3NpdGlvbkZvcih7IGxpbmUsIGNvbHVtbiB9KVxuICAgIGlmICghZnJvbS5zb3VyY2UpIHJldHVybiBmYWxzZVxuXG4gICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgIGZpbGU6IHRoaXMubWFwUmVzb2x2ZShmcm9tLnNvdXJjZSksXG4gICAgICBsaW5lOiBmcm9tLmxpbmUsXG4gICAgICBjb2x1bW46IGZyb20uY29sdW1uXG4gICAgfVxuXG4gICAgbGV0IHNvdXJjZSA9IGNvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3IoZnJvbS5zb3VyY2UpXG4gICAgaWYgKHNvdXJjZSkgcmVzdWx0LnNvdXJjZSA9IHNvdXJjZVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgbWFwUmVzb2x2ZSAoZmlsZSkge1xuICAgIGlmICgvXlxcdys6XFwvXFwvLy50ZXN0KGZpbGUpKSB7XG4gICAgICByZXR1cm4gZmlsZVxuICAgIH1cbiAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMubWFwLmNvbnN1bWVyKCkuc291cmNlUm9vdCB8fCAnLicsIGZpbGUpXG4gIH1cblxuICAvKipcbiAgICogVGhlIENTUyBzb3VyY2UgaWRlbnRpZmllci4gQ29udGFpbnMge0BsaW5rIElucHV0I2ZpbGV9IGlmIHRoZSB1c2VyXG4gICAqIHNldCB0aGUgYGZyb21gIG9wdGlvbiwgb3Ige0BsaW5rIElucHV0I2lkfSBpZiB0aGV5IGRpZCBub3QuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmd9XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKGNzcywgeyBmcm9tOiAnYS5jc3MnIH0pXG4gICAqIHJvb3Quc291cmNlLmlucHV0LmZyb20gLy89PiBcIi9ob21lL2FpL2EuY3NzXCJcbiAgICpcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoY3NzKVxuICAgKiByb290LnNvdXJjZS5pbnB1dC5mcm9tIC8vPT4gXCI8aW5wdXQgY3NzIDE+XCJcbiAgICovXG4gIGdldCBmcm9tICgpIHtcbiAgICByZXR1cm4gdGhpcy5maWxlIHx8IHRoaXMuaWRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbnB1dFxuXG4vKipcbiAqIEB0eXBlZGVmICB7b2JqZWN0fSBmaWxlUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBmaWxlICAgUGF0aCB0byBmaWxlLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGxpbmUgICBTb3VyY2UgbGluZSBpbiBmaWxlLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbHVtbiBTb3VyY2UgY29sdW1uIGluIGZpbGUuXG4gKi9cbiJdLCJmaWxlIjoiaW5wdXQuanMifQ==


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _sourceMap = _interopRequireDefault(__webpack_require__(25));

var _path = _interopRequireDefault(__webpack_require__(23));

var _fs = _interopRequireDefault(__webpack_require__(36));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fromBase64(str) {
  if (Buffer) {
    return Buffer.from(str, 'base64').toString();
  } else {
    return window.atob(str);
  }
}
/**
 * Source map information from input CSS.
 * For example, source map after Sass compiler.
 *
 * This class will automatically find source map in input CSS or in file system
 * near input file (according `from` option).
 *
 * @example
 * const root = postcss.parse(css, { from: 'a.sass.css' })
 * root.input.map //=> PreviousMap
 */


var PreviousMap =
/*#__PURE__*/
function () {
  /**
   * @param {string}         css    Input CSS source.
   * @param {processOptions} [opts] {@link Processor#process} options.
   */
  function PreviousMap(css, opts) {
    this.loadAnnotation(css);
    /**
     * Was source map inlined by data-uri to input CSS.
     *
     * @type {boolean}
     */

    this.inline = this.startWith(this.annotation, 'data:');
    var prev = opts.map ? opts.map.prev : undefined;
    var text = this.loadMap(opts.from, prev);
    if (text) this.text = text;
  }
  /**
   * Create a instance of `SourceMapGenerator` class
   * from the `source-map` library to work with source map information.
   *
   * It is lazy method, so it will create object only on first call
   * and then it will use cache.
   *
   * @return {SourceMapGenerator} Object with source map information.
   */


  var _proto = PreviousMap.prototype;

  _proto.consumer = function consumer() {
    if (!this.consumerCache) {
      this.consumerCache = new _sourceMap.default.SourceMapConsumer(this.text);
    }

    return this.consumerCache;
  }
  /**
   * Does source map contains `sourcesContent` with input source text.
   *
   * @return {boolean} Is `sourcesContent` present.
   */
  ;

  _proto.withContent = function withContent() {
    return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
  };

  _proto.startWith = function startWith(string, start) {
    if (!string) return false;
    return string.substr(0, start.length) === start;
  };

  _proto.loadAnnotation = function loadAnnotation(css) {
    var match = css.match(/\/\*\s*# sourceMappingURL=(.*)\s*\*\//);
    if (match) this.annotation = match[1].trim();
  };

  _proto.decodeInline = function decodeInline(text) {
    var baseCharsetUri = /^data:application\/json;charset=utf-?8;base64,/;
    var baseUri = /^data:application\/json;base64,/;
    var uri = 'data:application/json,';

    if (this.startWith(text, uri)) {
      return decodeURIComponent(text.substr(uri.length));
    }

    if (baseCharsetUri.test(text) || baseUri.test(text)) {
      return fromBase64(text.substr(RegExp.lastMatch.length));
    }

    var encoding = text.match(/data:application\/json;([^,]+),/)[1];
    throw new Error('Unsupported source map encoding ' + encoding);
  };

  _proto.loadMap = function loadMap(file, prev) {
    if (prev === false) return false;

    if (prev) {
      if (typeof prev === 'string') {
        return prev;
      } else if (typeof prev === 'function') {
        var prevPath = prev(file);

        if (prevPath && _fs.default.existsSync && _fs.default.existsSync(prevPath)) {
          return _fs.default.readFileSync(prevPath, 'utf-8').toString().trim();
        } else {
          throw new Error('Unable to load previous source map: ' + prevPath.toString());
        }
      } else if (prev instanceof _sourceMap.default.SourceMapConsumer) {
        return _sourceMap.default.SourceMapGenerator.fromSourceMap(prev).toString();
      } else if (prev instanceof _sourceMap.default.SourceMapGenerator) {
        return prev.toString();
      } else if (this.isMap(prev)) {
        return JSON.stringify(prev);
      } else {
        throw new Error('Unsupported previous source map format: ' + prev.toString());
      }
    } else if (this.inline) {
      return this.decodeInline(this.annotation);
    } else if (this.annotation) {
      var map = this.annotation;
      if (file) map = _path.default.join(_path.default.dirname(file), map);
      this.root = _path.default.dirname(map);

      if (_fs.default.existsSync && _fs.default.existsSync(map)) {
        return _fs.default.readFileSync(map, 'utf-8').toString().trim();
      } else {
        return false;
      }
    }
  };

  _proto.isMap = function isMap(map) {
    if (typeof map !== 'object') return false;
    return typeof map.mappings === 'string' || typeof map._mappings === 'string';
  };

  return PreviousMap;
}();

var _default = PreviousMap;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpb3VzLW1hcC5lczYiXSwibmFtZXMiOlsiZnJvbUJhc2U2NCIsInN0ciIsIkJ1ZmZlciIsImZyb20iLCJ0b1N0cmluZyIsIndpbmRvdyIsImF0b2IiLCJQcmV2aW91c01hcCIsImNzcyIsIm9wdHMiLCJsb2FkQW5ub3RhdGlvbiIsImlubGluZSIsInN0YXJ0V2l0aCIsImFubm90YXRpb24iLCJwcmV2IiwibWFwIiwidW5kZWZpbmVkIiwidGV4dCIsImxvYWRNYXAiLCJjb25zdW1lciIsImNvbnN1bWVyQ2FjaGUiLCJtb3ppbGxhIiwiU291cmNlTWFwQ29uc3VtZXIiLCJ3aXRoQ29udGVudCIsInNvdXJjZXNDb250ZW50IiwibGVuZ3RoIiwic3RyaW5nIiwic3RhcnQiLCJzdWJzdHIiLCJtYXRjaCIsInRyaW0iLCJkZWNvZGVJbmxpbmUiLCJiYXNlQ2hhcnNldFVyaSIsImJhc2VVcmkiLCJ1cmkiLCJkZWNvZGVVUklDb21wb25lbnQiLCJ0ZXN0IiwiUmVnRXhwIiwibGFzdE1hdGNoIiwiZW5jb2RpbmciLCJFcnJvciIsImZpbGUiLCJwcmV2UGF0aCIsImZzIiwiZXhpc3RzU3luYyIsInJlYWRGaWxlU3luYyIsIlNvdXJjZU1hcEdlbmVyYXRvciIsImZyb21Tb3VyY2VNYXAiLCJpc01hcCIsIkpTT04iLCJzdHJpbmdpZnkiLCJwYXRoIiwiam9pbiIsImRpcm5hbWUiLCJyb290IiwibWFwcGluZ3MiLCJfbWFwcGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxVQUFULENBQXFCQyxHQUFyQixFQUEwQjtBQUN4QixNQUFJQyxNQUFKLEVBQVk7QUFDVixXQUFPQSxNQUFNLENBQUNDLElBQVAsQ0FBWUYsR0FBWixFQUFpQixRQUFqQixFQUEyQkcsUUFBM0IsRUFBUDtBQUNELEdBRkQsTUFFTztBQUNMLFdBQU9DLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZTCxHQUFaLENBQVA7QUFDRDtBQUNGO0FBRUQ7Ozs7Ozs7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LElBQWIsQ0FBVixFQUE4QjFCLEdBQTlCLENBQU47QUFFVixXQUFLdUMsSUFBTCxHQUFZSCxjQUFLRSxPQUFMLENBQWF0QyxHQUFiLENBQVo7O0FBQ0EsVUFBSTRCLFlBQUdDLFVBQUgsSUFBaUJELFlBQUdDLFVBQUgsQ0FBYzdCLEdBQWQsQ0FBckIsRUFBeUM7QUFDdkMsZUFBTzRCLFlBQUdFLFlBQUgsQ0FBZ0I5QixHQUFoQixFQUFxQixPQUFyQixFQUE4QlgsUUFBOUIsR0FBeUMwQixJQUF6QyxFQUFQO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsZUFBTyxLQUFQO0FBQ0Q7QUFDRjtBQUNGLEc7O1NBRURrQixLLEdBQUEsZUFBT2pDLEdBQVAsRUFBWTtBQUNWLFFBQUksT0FBT0EsR0FBUCxLQUFlLFFBQW5CLEVBQTZCLE9BQU8sS0FBUDtBQUM3QixXQUFPLE9BQU9BLEdBQUcsQ0FBQ3dDLFFBQVgsS0FBd0IsUUFBeEIsSUFBb0MsT0FBT3hDLEdBQUcsQ0FBQ3lDLFNBQVgsS0FBeUIsUUFBcEU7QUFDRCxHOzs7OztlQUdZakQsVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb3ppbGxhIGZyb20gJ3NvdXJjZS1tYXAnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGZzIGZyb20gJ2ZzJ1xuXG5mdW5jdGlvbiBmcm9tQmFzZTY0IChzdHIpIHtcbiAgaWYgKEJ1ZmZlcikge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbShzdHIsICdiYXNlNjQnKS50b1N0cmluZygpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHdpbmRvdy5hdG9iKHN0cilcbiAgfVxufVxuXG4vKipcbiAqIFNvdXJjZSBtYXAgaW5mb3JtYXRpb24gZnJvbSBpbnB1dCBDU1MuXG4gKiBGb3IgZXhhbXBsZSwgc291cmNlIG1hcCBhZnRlciBTYXNzIGNvbXBpbGVyLlxuICpcbiAqIFRoaXMgY2xhc3Mgd2lsbCBhdXRvbWF0aWNhbGx5IGZpbmQgc291cmNlIG1hcCBpbiBpbnB1dCBDU1Mgb3IgaW4gZmlsZSBzeXN0ZW1cbiAqIG5lYXIgaW5wdXQgZmlsZSAoYWNjb3JkaW5nIGBmcm9tYCBvcHRpb24pLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MsIHsgZnJvbTogJ2Euc2Fzcy5jc3MnIH0pXG4gKiByb290LmlucHV0Lm1hcCAvLz0+IFByZXZpb3VzTWFwXG4gKi9cbmNsYXNzIFByZXZpb3VzTWFwIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgIGNzcyAgICBJbnB1dCBDU1Mgc291cmNlLlxuICAgKiBAcGFyYW0ge3Byb2Nlc3NPcHRpb25zfSBbb3B0c10ge0BsaW5rIFByb2Nlc3NvciNwcm9jZXNzfSBvcHRpb25zLlxuICAgKi9cbiAgY29uc3RydWN0b3IgKGNzcywgb3B0cykge1xuICAgIHRoaXMubG9hZEFubm90YXRpb24oY3NzKVxuICAgIC8qKlxuICAgICAqIFdhcyBzb3VyY2UgbWFwIGlubGluZWQgYnkgZGF0YS11cmkgdG8gaW5wdXQgQ1NTLlxuICAgICAqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICovXG4gICAgdGhpcy5pbmxpbmUgPSB0aGlzLnN0YXJ0V2l0aCh0aGlzLmFubm90YXRpb24sICdkYXRhOicpXG5cbiAgICBsZXQgcHJldiA9IG9wdHMubWFwID8gb3B0cy5tYXAucHJldiA6IHVuZGVmaW5lZFxuICAgIGxldCB0ZXh0ID0gdGhpcy5sb2FkTWFwKG9wdHMuZnJvbSwgcHJldilcbiAgICBpZiAodGV4dCkgdGhpcy50ZXh0ID0gdGV4dFxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIGluc3RhbmNlIG9mIGBTb3VyY2VNYXBHZW5lcmF0b3JgIGNsYXNzXG4gICAqIGZyb20gdGhlIGBzb3VyY2UtbWFwYCBsaWJyYXJ5IHRvIHdvcmsgd2l0aCBzb3VyY2UgbWFwIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBJdCBpcyBsYXp5IG1ldGhvZCwgc28gaXQgd2lsbCBjcmVhdGUgb2JqZWN0IG9ubHkgb24gZmlyc3QgY2FsbFxuICAgKiBhbmQgdGhlbiBpdCB3aWxsIHVzZSBjYWNoZS5cbiAgICpcbiAgICogQHJldHVybiB7U291cmNlTWFwR2VuZXJhdG9yfSBPYmplY3Qgd2l0aCBzb3VyY2UgbWFwIGluZm9ybWF0aW9uLlxuICAgKi9cbiAgY29uc3VtZXIgKCkge1xuICAgIGlmICghdGhpcy5jb25zdW1lckNhY2hlKSB7XG4gICAgICB0aGlzLmNvbnN1bWVyQ2FjaGUgPSBuZXcgbW96aWxsYS5Tb3VyY2VNYXBDb25zdW1lcih0aGlzLnRleHQpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLmNvbnN1bWVyQ2FjaGVcbiAgfVxuXG4gIC8qKlxuICAgKiBEb2VzIHNvdXJjZSBtYXAgY29udGFpbnMgYHNvdXJjZXNDb250ZW50YCB3aXRoIGlucHV0IHNvdXJjZSB0ZXh0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBgc291cmNlc0NvbnRlbnRgIHByZXNlbnQuXG4gICAqL1xuICB3aXRoQ29udGVudCAoKSB7XG4gICAgcmV0dXJuICEhKHRoaXMuY29uc3VtZXIoKS5zb3VyY2VzQ29udGVudCAmJlxuICAgICAgICAgICAgICB0aGlzLmNvbnN1bWVyKCkuc291cmNlc0NvbnRlbnQubGVuZ3RoID4gMClcbiAgfVxuXG4gIHN0YXJ0V2l0aCAoc3RyaW5nLCBzdGFydCkge1xuICAgIGlmICghc3RyaW5nKSByZXR1cm4gZmFsc2VcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cigwLCBzdGFydC5sZW5ndGgpID09PSBzdGFydFxuICB9XG5cbiAgbG9hZEFubm90YXRpb24gKGNzcykge1xuICAgIGxldCBtYXRjaCA9IGNzcy5tYXRjaCgvXFwvXFwqXFxzKiMgc291cmNlTWFwcGluZ1VSTD0oLiopXFxzKlxcKlxcLy8pXG4gICAgaWYgKG1hdGNoKSB0aGlzLmFubm90YXRpb24gPSBtYXRjaFsxXS50cmltKClcbiAgfVxuXG4gIGRlY29kZUlubGluZSAodGV4dCkge1xuICAgIGxldCBiYXNlQ2hhcnNldFVyaSA9IC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb247Y2hhcnNldD11dGYtPzg7YmFzZTY0LC9cbiAgICBsZXQgYmFzZVVyaSA9IC9eZGF0YTphcHBsaWNhdGlvblxcL2pzb247YmFzZTY0LC9cbiAgICBsZXQgdXJpID0gJ2RhdGE6YXBwbGljYXRpb24vanNvbiwnXG5cbiAgICBpZiAodGhpcy5zdGFydFdpdGgodGV4dCwgdXJpKSkge1xuICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCh0ZXh0LnN1YnN0cih1cmkubGVuZ3RoKSlcbiAgICB9XG5cbiAgICBpZiAoYmFzZUNoYXJzZXRVcmkudGVzdCh0ZXh0KSB8fCBiYXNlVXJpLnRlc3QodGV4dCkpIHtcbiAgICAgIHJldHVybiBmcm9tQmFzZTY0KHRleHQuc3Vic3RyKFJlZ0V4cC5sYXN0TWF0Y2gubGVuZ3RoKSlcbiAgICB9XG5cbiAgICBsZXQgZW5jb2RpbmcgPSB0ZXh0Lm1hdGNoKC9kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjsoW14sXSspLC8pWzFdXG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBzb3VyY2UgbWFwIGVuY29kaW5nICcgKyBlbmNvZGluZylcbiAgfVxuXG4gIGxvYWRNYXAgKGZpbGUsIHByZXYpIHtcbiAgICBpZiAocHJldiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZVxuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJldiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHByZXZcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHByZXYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgbGV0IHByZXZQYXRoID0gcHJldihmaWxlKVxuICAgICAgICBpZiAocHJldlBhdGggJiYgZnMuZXhpc3RzU3luYyAmJiBmcy5leGlzdHNTeW5jKHByZXZQYXRoKSkge1xuICAgICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMocHJldlBhdGgsICd1dGYtOCcpLnRvU3RyaW5nKCkudHJpbSgpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ1VuYWJsZSB0byBsb2FkIHByZXZpb3VzIHNvdXJjZSBtYXA6ICcgKyBwcmV2UGF0aC50b1N0cmluZygpKVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByZXYgaW5zdGFuY2VvZiBtb3ppbGxhLlNvdXJjZU1hcENvbnN1bWVyKSB7XG4gICAgICAgIHJldHVybiBtb3ppbGxhLlNvdXJjZU1hcEdlbmVyYXRvci5mcm9tU291cmNlTWFwKHByZXYpLnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAocHJldiBpbnN0YW5jZW9mIG1vemlsbGEuU291cmNlTWFwR2VuZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiBwcmV2LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5pc01hcChwcmV2KSkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocHJldilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnVW5zdXBwb3J0ZWQgcHJldmlvdXMgc291cmNlIG1hcCBmb3JtYXQ6ICcgKyBwcmV2LnRvU3RyaW5nKCkpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLmlubGluZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGVjb2RlSW5saW5lKHRoaXMuYW5ub3RhdGlvbilcbiAgICB9IGVsc2UgaWYgKHRoaXMuYW5ub3RhdGlvbikge1xuICAgICAgbGV0IG1hcCA9IHRoaXMuYW5ub3RhdGlvblxuICAgICAgaWYgKGZpbGUpIG1hcCA9IHBhdGguam9pbihwYXRoLmRpcm5hbWUoZmlsZSksIG1hcClcblxuICAgICAgdGhpcy5yb290ID0gcGF0aC5kaXJuYW1lKG1hcClcbiAgICAgIGlmIChmcy5leGlzdHNTeW5jICYmIGZzLmV4aXN0c1N5bmMobWFwKSkge1xuICAgICAgICByZXR1cm4gZnMucmVhZEZpbGVTeW5jKG1hcCwgJ3V0Zi04JykudG9TdHJpbmcoKS50cmltKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlzTWFwIChtYXApIHtcbiAgICBpZiAodHlwZW9mIG1hcCAhPT0gJ29iamVjdCcpIHJldHVybiBmYWxzZVxuICAgIHJldHVybiB0eXBlb2YgbWFwLm1hcHBpbmdzID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgbWFwLl9tYXBwaW5ncyA9PT0gJ3N0cmluZydcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcmV2aW91c01hcFxuIl0sImZpbGUiOiJwcmV2aW91cy1tYXAuanMifQ==


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(26).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(32).SourceMapConsumer;
exports.SourceNode = __webpack_require__(35).SourceNode;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(27);
var util = __webpack_require__(29);
var ArraySet = __webpack_require__(30).ArraySet;
var MappingList = __webpack_require__(31).MappingList;

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
      var sourceRelative = sourceFile;
      if (sourceRoot !== null) {
        sourceRelative = util.relative(sourceRoot, sourceFile);
      }

      if (!generator._sources.has(sourceRelative)) {
        generator._sources.add(sourceRelative);
      }

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
/* 27 */
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

var base64 = __webpack_require__(28);

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
/* 28 */
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
/* 29 */
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

var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
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
  return aPath.charAt(0) === '/' || urlRegexp.test(aPath);
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
  var cmp = strcmp(mappingA.source, mappingB.source);
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

  return strcmp(mappingA.name, mappingB.name);
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
exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;

function strcmp(aStr1, aStr2) {
  if (aStr1 === aStr2) {
    return 0;
  }

  if (aStr1 === null) {
    return 1; // aStr2 !== null
  }

  if (aStr2 === null) {
    return -1; // aStr1 !== null
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

/**
 * Strip any JSON XSSI avoidance prefix from the string (as documented
 * in the source maps specification), and then parse the string as
 * JSON.
 */
function parseSourceMapInput(str) {
  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''));
}
exports.parseSourceMapInput = parseSourceMapInput;

/**
 * Compute the URL of a source given the the source root, the source's
 * URL, and the source map's URL.
 */
function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
  sourceURL = sourceURL || '';

  if (sourceRoot) {
    // This follows what Chrome does.
    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
      sourceRoot += '/';
    }
    // The spec says:
    //   Line 4: An optional source root, useful for relocating source
    //   files on a server or removing repeated values in the
    //   “sources” entry.  This value is prepended to the individual
    //   entries in the “source” field.
    sourceURL = sourceRoot + sourceURL;
  }

  // Historically, SourceMapConsumer did not take the sourceMapURL as
  // a parameter.  This mode is still somewhat supported, which is why
  // this code block is conditional.  However, it's preferable to pass
  // the source map URL to SourceMapConsumer, so that this function
  // can implement the source URL resolution algorithm as outlined in
  // the spec.  This block is basically the equivalent of:
  //    new URL(sourceURL, sourceMapURL).toString()
  // ... except it avoids using URL, which wasn't available in the
  // older releases of node still supported by this library.
  //
  // The spec says:
  //   If the sources are not absolute URLs after prepending of the
  //   “sourceRoot”, the sources are resolved relative to the
  //   SourceMap (like resolving script src in a html document).
  if (sourceMapURL) {
    var parsed = urlParse(sourceMapURL);
    if (!parsed) {
      throw new Error("sourceMapURL could not be parsed");
    }
    if (parsed.path) {
      // Strip the last path component, but keep the "/".
      var index = parsed.path.lastIndexOf('/');
      if (index >= 0) {
        parsed.path = parsed.path.substring(0, index + 1);
      }
    }
    sourceURL = join(urlGenerate(parsed), sourceURL);
  }

  return normalize(sourceURL);
}
exports.computeSourceURL = computeSourceURL;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(29);
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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(29);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(29);
var binarySearch = __webpack_require__(33);
var ArraySet = __webpack_require__(30).ArraySet;
var base64VLQ = __webpack_require__(27);
var quickSort = __webpack_require__(34).quickSort;

function SourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  return sourceMap.sections != null
    ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
    : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
}

SourceMapConsumer.fromSourceMap = function(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL);
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
  configurable: true,
  enumerable: true,
  get: function () {
    if (!this.__generatedMappings) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappings;
  }
});

SourceMapConsumer.prototype.__originalMappings = null;
Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {
  configurable: true,
  enumerable: true,
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
      source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
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
 *   - line: The line number in the original source.  The line number is 1-based.
 *   - column: Optional. the column number in the original source.
 *    The column number is 0-based.
 *
 * and an array of objects is returned, each with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *    line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *    The column number is 0-based.
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

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return [];
    }

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
 * The first parameter is the raw source map (either as a JSON string, or
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
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
function BasicSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
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

  if (sourceRoot) {
    sourceRoot = util.normalize(sourceRoot);
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

  this._absoluteSources = this._sources.toArray().map(function (s) {
    return util.computeSourceURL(sourceRoot, s, aSourceMapURL);
  });

  this.sourceRoot = sourceRoot;
  this.sourcesContent = sourcesContent;
  this._mappings = mappings;
  this._sourceMapURL = aSourceMapURL;
  this.file = file;
}

BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;

/**
 * Utility function to find the index of a source.  Returns -1 if not
 * found.
 */
BasicSourceMapConsumer.prototype._findSourceIndex = function(aSource) {
  var relativeSource = aSource;
  if (this.sourceRoot != null) {
    relativeSource = util.relative(this.sourceRoot, relativeSource);
  }

  if (this._sources.has(relativeSource)) {
    return this._sources.indexOf(relativeSource);
  }

  // Maybe aSource is an absolute URL as returned by |sources|.  In
  // this case we can't simply undo the transform.
  var i;
  for (i = 0; i < this._absoluteSources.length; ++i) {
    if (this._absoluteSources[i] == aSource) {
      return i;
    }
  }

  return -1;
};

/**
 * Create a BasicSourceMapConsumer from a SourceMapGenerator.
 *
 * @param SourceMapGenerator aSourceMap
 *        The source map that will be consumed.
 * @param String aSourceMapURL
 *        The URL at which the source map can be found (optional)
 * @returns BasicSourceMapConsumer
 */
BasicSourceMapConsumer.fromSourceMap =
  function SourceMapConsumer_fromSourceMap(aSourceMap, aSourceMapURL) {
    var smc = Object.create(BasicSourceMapConsumer.prototype);

    var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
    var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
    smc.sourceRoot = aSourceMap._sourceRoot;
    smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(),
                                                            smc.sourceRoot);
    smc.file = aSourceMap._file;
    smc._sourceMapURL = aSourceMapURL;
    smc._absoluteSources = smc._sources.toArray().map(function (s) {
      return util.computeSourceURL(smc.sourceRoot, s, aSourceMapURL);
    });

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
    return this._absoluteSources.slice();
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
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
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
          source = util.computeSourceURL(this.sourceRoot, source, this._sourceMapURL);
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

    var index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index];
    }

    var relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    var url;
    if (this.sourceRoot != null
        && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      var fileUriAbsPath = relativeSource.replace(/^file:\/\//, "");
      if (url.scheme == "file"
          && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if ((!url.path || url.path == "/")
          && this._sources.has("/" + relativeSource)) {
        return this.sourcesContent[this._sources.indexOf("/" + relativeSource)];
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
      throw new Error('"' + relativeSource + '" is not in the SourceMap.');
    }
  };

/**
 * Returns the generated line and column information for the original source,
 * line, and column positions provided. The only argument is an object with
 * the following properties:
 *
 *   - source: The filename of the original source.
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
 *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
 *     closest element that is smaller than or greater than the one we are
 *     searching for, respectively, if the exact element cannot be found.
 *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
BasicSourceMapConsumer.prototype.generatedPositionFor =
  function SourceMapConsumer_generatedPositionFor(aArgs) {
    var source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }

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
 * The first parameter is a raw source map (either as a JSON string, or already
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
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
function IndexedSourceMapConsumer(aSourceMap, aSourceMapURL) {
  var sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
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
      consumer: new SourceMapConsumer(util.getArg(s, 'map'), aSourceMapURL)
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
 *   - line: The line number in the generated source.  The line number
 *     is 1-based.
 *   - column: The column number in the generated source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - source: The original source file, or null.
 *   - line: The line number in the original source, or null.  The
 *     line number is 1-based.
 *   - column: The column number in the original source, or null.  The
 *     column number is 0-based.
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
 *   - line: The line number in the original source.  The line number
 *     is 1-based.
 *   - column: The column number in the original source.  The column
 *     number is 0-based.
 *
 * and an object is returned with the following properties:
 *
 *   - line: The line number in the generated source, or null.  The
 *     line number is 1-based. 
 *   - column: The column number in the generated source, or null.
 *     The column number is 0-based.
 */
IndexedSourceMapConsumer.prototype.generatedPositionFor =
  function IndexedSourceMapConsumer_generatedPositionFor(aArgs) {
    for (var i = 0; i < this._sections.length; i++) {
      var section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1) {
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
        source = util.computeSourceURL(section.consumer.sourceRoot, source, this._sourceMapURL);
        this._sources.add(source);
        source = this._sources.indexOf(source);

        var name = null;
        if (mapping.name) {
          name = section.consumer._names.at(mapping.name);
          this._names.add(name);
          name = this._names.indexOf(name);
        }

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
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(26).SourceMapGenerator;
var util = __webpack_require__(29);

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
          var nextLine = remainingLines[remainingLinesIndex] || '';
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
        var nextLine = remainingLines[remainingLinesIndex] || '';
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
/* 36 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;
var DEFAULT_RAW = {
  colon: ': ',
  indent: '    ',
  beforeDecl: '\n',
  beforeRule: '\n',
  beforeOpen: ' ',
  beforeClose: '\n',
  beforeComment: '\n',
  after: '\n',
  emptyBody: '',
  commentLeft: ' ',
  commentRight: ' ',
  semicolon: false
};

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

var Stringifier =
/*#__PURE__*/
function () {
  function Stringifier(builder) {
    this.builder = builder;
  }

  var _proto = Stringifier.prototype;

  _proto.stringify = function stringify(node, semicolon) {
    this[node.type](node, semicolon);
  };

  _proto.root = function root(node) {
    this.body(node);
    if (node.raws.after) this.builder(node.raws.after);
  };

  _proto.comment = function comment(node) {
    var left = this.raw(node, 'left', 'commentLeft');
    var right = this.raw(node, 'right', 'commentRight');
    this.builder('/*' + left + node.text + right + '*/', node);
  };

  _proto.decl = function decl(node, semicolon) {
    var between = this.raw(node, 'between', 'colon');
    var string = node.prop + between + this.rawValue(node, 'value');

    if (node.important) {
      string += node.raws.important || ' !important';
    }

    if (semicolon) string += ';';
    this.builder(string, node);
  };

  _proto.rule = function rule(node) {
    this.block(node, this.rawValue(node, 'selector'));

    if (node.raws.ownSemicolon) {
      this.builder(node.raws.ownSemicolon, node, 'end');
    }
  };

  _proto.atrule = function atrule(node, semicolon) {
    var name = '@' + node.name;
    var params = node.params ? this.rawValue(node, 'params') : '';

    if (typeof node.raws.afterName !== 'undefined') {
      name += node.raws.afterName;
    } else if (params) {
      name += ' ';
    }

    if (node.nodes) {
      this.block(node, name + params);
    } else {
      var end = (node.raws.between || '') + (semicolon ? ';' : '');
      this.builder(name + params + end, node);
    }
  };

  _proto.body = function body(node) {
    var last = node.nodes.length - 1;

    while (last > 0) {
      if (node.nodes[last].type !== 'comment') break;
      last -= 1;
    }

    var semicolon = this.raw(node, 'semicolon');

    for (var i = 0; i < node.nodes.length; i++) {
      var child = node.nodes[i];
      var before = this.raw(child, 'before');
      if (before) this.builder(before);
      this.stringify(child, last !== i || semicolon);
    }
  };

  _proto.block = function block(node, start) {
    var between = this.raw(node, 'between', 'beforeOpen');
    this.builder(start + between + '{', node, 'start');
    var after;

    if (node.nodes && node.nodes.length) {
      this.body(node);
      after = this.raw(node, 'after');
    } else {
      after = this.raw(node, 'after', 'emptyBody');
    }

    if (after) this.builder(after);
    this.builder('}', node, 'end');
  };

  _proto.raw = function raw(node, own, detect) {
    var value;
    if (!detect) detect = own; // Already had

    if (own) {
      value = node.raws[own];
      if (typeof value !== 'undefined') return value;
    }

    var parent = node.parent; // Hack for first rule in CSS

    if (detect === 'before') {
      if (!parent || parent.type === 'root' && parent.first === node) {
        return '';
      }
    } // Floating child without parent


    if (!parent) return DEFAULT_RAW[detect]; // Detect style by other nodes

    var root = node.root();
    if (!root.rawCache) root.rawCache = {};

    if (typeof root.rawCache[detect] !== 'undefined') {
      return root.rawCache[detect];
    }

    if (detect === 'before' || detect === 'after') {
      return this.beforeAfter(node, detect);
    } else {
      var method = 'raw' + capitalize(detect);

      if (this[method]) {
        value = this[method](root, node);
      } else {
        root.walk(function (i) {
          value = i.raws[own];
          if (typeof value !== 'undefined') return false;
        });
      }
    }

    if (typeof value === 'undefined') value = DEFAULT_RAW[detect];
    root.rawCache[detect] = value;
    return value;
  };

  _proto.rawSemicolon = function rawSemicolon(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length && i.last.type === 'decl') {
        value = i.raws.semicolon;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawEmptyBody = function rawEmptyBody(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length === 0) {
        value = i.raws.after;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawIndent = function rawIndent(root) {
    if (root.raws.indent) return root.raws.indent;
    var value;
    root.walk(function (i) {
      var p = i.parent;

      if (p && p !== root && p.parent && p.parent === root) {
        if (typeof i.raws.before !== 'undefined') {
          var parts = i.raws.before.split('\n');
          value = parts[parts.length - 1];
          value = value.replace(/[^\s]/g, '');
          return false;
        }
      }
    });
    return value;
  };

  _proto.rawBeforeComment = function rawBeforeComment(root, node) {
    var value;
    root.walkComments(function (i) {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;

        if (value.indexOf('\n') !== -1) {
          value = value.replace(/[^\n]+$/, '');
        }

        return false;
      }
    });

    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (value) {
      value = value.replace(/[^\s]/g, '');
    }

    return value;
  };

  _proto.rawBeforeDecl = function rawBeforeDecl(root, node) {
    var value;
    root.walkDecls(function (i) {
      if (typeof i.raws.before !== 'undefined') {
        value = i.raws.before;

        if (value.indexOf('\n') !== -1) {
          value = value.replace(/[^\n]+$/, '');
        }

        return false;
      }
    });

    if (typeof value === 'undefined') {
      value = this.raw(node, null, 'beforeRule');
    } else if (value) {
      value = value.replace(/[^\s]/g, '');
    }

    return value;
  };

  _proto.rawBeforeRule = function rawBeforeRule(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && (i.parent !== root || root.first !== i)) {
        if (typeof i.raws.before !== 'undefined') {
          value = i.raws.before;

          if (value.indexOf('\n') !== -1) {
            value = value.replace(/[^\n]+$/, '');
          }

          return false;
        }
      }
    });
    if (value) value = value.replace(/[^\s]/g, '');
    return value;
  };

  _proto.rawBeforeClose = function rawBeforeClose(root) {
    var value;
    root.walk(function (i) {
      if (i.nodes && i.nodes.length > 0) {
        if (typeof i.raws.after !== 'undefined') {
          value = i.raws.after;

          if (value.indexOf('\n') !== -1) {
            value = value.replace(/[^\n]+$/, '');
          }

          return false;
        }
      }
    });
    if (value) value = value.replace(/[^\s]/g, '');
    return value;
  };

  _proto.rawBeforeOpen = function rawBeforeOpen(root) {
    var value;
    root.walk(function (i) {
      if (i.type !== 'decl') {
        value = i.raws.between;
        if (typeof value !== 'undefined') return false;
      }
    });
    return value;
  };

  _proto.rawColon = function rawColon(root) {
    var value;
    root.walkDecls(function (i) {
      if (typeof i.raws.between !== 'undefined') {
        value = i.raws.between.replace(/[^\s:]/g, '');
        return false;
      }
    });
    return value;
  };

  _proto.beforeAfter = function beforeAfter(node, detect) {
    var value;

    if (node.type === 'decl') {
      value = this.raw(node, null, 'beforeDecl');
    } else if (node.type === 'comment') {
      value = this.raw(node, null, 'beforeComment');
    } else if (detect === 'before') {
      value = this.raw(node, null, 'beforeRule');
    } else {
      value = this.raw(node, null, 'beforeClose');
    }

    var buf = node.parent;
    var depth = 0;

    while (buf && buf.type !== 'root') {
      depth += 1;
      buf = buf.parent;
    }

    if (value.indexOf('\n') !== -1) {
      var indent = this.raw(node, null, 'indent');

      if (indent.length) {
        for (var step = 0; step < depth; step++) {
          value += indent;
        }
      }
    }

    return value;
  };

  _proto.rawValue = function rawValue(node, prop) {
    var value = node[prop];
    var raw = node.raws[prop];

    if (raw && raw.value === value) {
      return raw.raw;
    }

    return value;
  };

  return Stringifier;
}();

var _default = Stringifier;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJERUZBVUxUX1JBVyIsImNvbG9uIiwiaW5kZW50IiwiYmVmb3JlRGVjbCIsImJlZm9yZVJ1bGUiLCJiZWZvcmVPcGVuIiwiYmVmb3JlQ2xvc2UiLCJiZWZvcmVDb21tZW50IiwiYWZ0ZXIiLCJlbXB0eUJvZHkiLCJjb21tZW50TGVmdCIsImNvbW1lbnRSaWdodCIsInNlbWljb2xvbiIsImNhcGl0YWxpemUiLCJzdHIiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiU3RyaW5naWZpZXIiLCJidWlsZGVyIiwic3RyaW5naWZ5Iiwibm9kZSIsInR5cGUiLCJyb290IiwiYm9keSIsInJhd3MiLCJjb21tZW50IiwibGVmdCIsInJhdyIsInJpZ2h0IiwidGV4dCIsImRlY2wiLCJiZXR3ZWVuIiwic3RyaW5nIiwicHJvcCIsInJhd1ZhbHVlIiwiaW1wb3J0YW50IiwicnVsZSIsImJsb2NrIiwib3duU2VtaWNvbG9uIiwiYXRydWxlIiwibmFtZSIsInBhcmFtcyIsImFmdGVyTmFtZSIsIm5vZGVzIiwiZW5kIiwibGFzdCIsImxlbmd0aCIsImkiLCJjaGlsZCIsImJlZm9yZSIsInN0YXJ0Iiwib3duIiwiZGV0ZWN0IiwidmFsdWUiLCJwYXJlbnQiLCJmaXJzdCIsInJhd0NhY2hlIiwiYmVmb3JlQWZ0ZXIiLCJtZXRob2QiLCJ3YWxrIiwicmF3U2VtaWNvbG9uIiwicmF3RW1wdHlCb2R5IiwicmF3SW5kZW50IiwicCIsInBhcnRzIiwic3BsaXQiLCJyZXBsYWNlIiwicmF3QmVmb3JlQ29tbWVudCIsIndhbGtDb21tZW50cyIsImluZGV4T2YiLCJyYXdCZWZvcmVEZWNsIiwid2Fsa0RlY2xzIiwicmF3QmVmb3JlUnVsZSIsInJhd0JlZm9yZUNsb3NlIiwicmF3QmVmb3JlT3BlbiIsInJhd0NvbG9uIiwiYnVmIiwiZGVwdGgiLCJzdGVwIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBTUEsV0FBVyxHQUFHO0FBQ2xCQyxFQUFB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UjtBQUNEOztBQUVELFFBQUl3RCxHQUFHLEdBQUd4RCxJQUFJLENBQUNrQyxNQUFmO0FBQ0EsUUFBSXVCLEtBQUssR0FBRyxDQUFaOztBQUNBLFdBQU9ELEdBQUcsSUFBSUEsR0FBRyxDQUFDdkQsSUFBSixLQUFhLE1BQTNCLEVBQW1DO0FBQ2pDd0QsTUFBQUEsS0FBSyxJQUFJLENBQVQ7QUFDQUQsTUFBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUN0QixNQUFWO0FBQ0Q7O0FBRUQsUUFBSUQsS0FBSyxDQUFDZ0IsT0FBTixDQUFjLElBQWQsTUFBd0IsQ0FBQyxDQUE3QixFQUFnQztBQUM5QixVQUFJbkUsTUFBTSxHQUFHLEtBQUt5QixHQUFMLENBQVNQLElBQVQsRUFBZSxJQUFmLEVBQXFCLFFBQXJCLENBQWI7O0FBQ0EsVUFBSWxCLE1BQU0sQ0FBQzRDLE1BQVgsRUFBbUI7QUFDakIsYUFBSyxJQUFJZ0MsSUFBSSxHQUFHLENBQWhCLEVBQW1CQSxJQUFJLEdBQUdELEtBQTFCLEVBQWlDQyxJQUFJLEVBQXJDO0FBQXlDekIsVUFBQUEsS0FBSyxJQUFJbkQsTUFBVDtBQUF6QztBQUNEO0FBQ0Y7O0FBRUQsV0FBT21ELEtBQVA7QUFDRCxHOztTQUVEbkIsUSxHQUFBLGtCQUFVZCxJQUFWLEVBQWdCYSxJQUFoQixFQUFzQjtBQUNwQixRQUFJb0IsS0FBSyxHQUFHakMsSUFBSSxDQUFDYSxJQUFELENBQWhCO0FBQ0EsUUFBSU4sR0FBRyxHQUFHUCxJQUFJLENBQUNJLElBQUwsQ0FBVVMsSUFBVixDQUFWOztBQUNBLFFBQUlOLEdBQUcsSUFBSUEsR0FBRyxDQUFDMEIsS0FBSixLQUFjQSxLQUF6QixFQUFnQztBQUM5QixhQUFPMUIsR0FBRyxDQUFDQSxHQUFYO0FBQ0Q7O0FBRUQsV0FBTzBCLEtBQVA7QUFDRCxHOzs7OztlQUdZcEMsVyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IERFRkFVTFRfUkFXID0ge1xuICBjb2xvbjogJzogJyxcbiAgaW5kZW50OiAnICAgICcsXG4gIGJlZm9yZURlY2w6ICdcXG4nLFxuICBiZWZvcmVSdWxlOiAnXFxuJyxcbiAgYmVmb3JlT3BlbjogJyAnLFxuICBiZWZvcmVDbG9zZTogJ1xcbicsXG4gIGJlZm9yZUNvbW1lbnQ6ICdcXG4nLFxuICBhZnRlcjogJ1xcbicsXG4gIGVtcHR5Qm9keTogJycsXG4gIGNvbW1lbnRMZWZ0OiAnICcsXG4gIGNvbW1lbnRSaWdodDogJyAnLFxuICBzZW1pY29sb246IGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNhcGl0YWxpemUgKHN0cikge1xuICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcbn1cblxuY2xhc3MgU3RyaW5naWZpZXIge1xuICBjb25zdHJ1Y3RvciAoYnVpbGRlcikge1xuICAgIHRoaXMuYnVpbGRlciA9IGJ1aWxkZXJcbiAgfVxuXG4gIHN0cmluZ2lmeSAobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgdGhpc1tub2RlLnR5cGVdKG5vZGUsIHNlbWljb2xvbilcbiAgfVxuXG4gIHJvb3QgKG5vZGUpIHtcbiAgICB0aGlzLmJvZHkobm9kZSlcbiAgICBpZiAobm9kZS5yYXdzLmFmdGVyKSB0aGlzLmJ1aWxkZXIobm9kZS5yYXdzLmFmdGVyKVxuICB9XG5cbiAgY29tbWVudCAobm9kZSkge1xuICAgIGxldCBsZWZ0ID0gdGhpcy5yYXcobm9kZSwgJ2xlZnQnLCAnY29tbWVudExlZnQnKVxuICAgIGxldCByaWdodCA9IHRoaXMucmF3KG5vZGUsICdyaWdodCcsICdjb21tZW50UmlnaHQnKVxuICAgIHRoaXMuYnVpbGRlcignLyonICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0ICsgJyovJywgbm9kZSlcbiAgfVxuXG4gIGRlY2wgKG5vZGUsIHNlbWljb2xvbikge1xuICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnY29sb24nKVxuICAgIGxldCBzdHJpbmcgPSBub2RlLnByb3AgKyBiZXR3ZWVuICsgdGhpcy5yYXdWYWx1ZShub2RlLCAndmFsdWUnKVxuXG4gICAgaWYgKG5vZGUuaW1wb3J0YW50KSB7XG4gICAgICBzdHJpbmcgKz0gbm9kZS5yYXdzLmltcG9ydGFudCB8fCAnICFpbXBvcnRhbnQnXG4gICAgfVxuXG4gICAgaWYgKHNlbWljb2xvbikgc3RyaW5nICs9ICc7J1xuICAgIHRoaXMuYnVpbGRlcihzdHJpbmcsIG5vZGUpXG4gIH1cblxuICBydWxlIChub2RlKSB7XG4gICAgdGhpcy5ibG9jayhub2RlLCB0aGlzLnJhd1ZhbHVlKG5vZGUsICdzZWxlY3RvcicpKVxuICAgIGlmIChub2RlLnJhd3Mub3duU2VtaWNvbG9uKSB7XG4gICAgICB0aGlzLmJ1aWxkZXIobm9kZS5yYXdzLm93blNlbWljb2xvbiwgbm9kZSwgJ2VuZCcpXG4gICAgfVxuICB9XG5cbiAgYXRydWxlIChub2RlLCBzZW1pY29sb24pIHtcbiAgICBsZXQgbmFtZSA9ICdAJyArIG5vZGUubmFtZVxuICAgIGxldCBwYXJhbXMgPSBub2RlLnBhcmFtcyA/IHRoaXMucmF3VmFsdWUobm9kZSwgJ3BhcmFtcycpIDogJydcblxuICAgIGlmICh0eXBlb2Ygbm9kZS5yYXdzLmFmdGVyTmFtZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIG5hbWUgKz0gbm9kZS5yYXdzLmFmdGVyTmFtZVxuICAgIH0gZWxzZSBpZiAocGFyYW1zKSB7XG4gICAgICBuYW1lICs9ICcgJ1xuICAgIH1cblxuICAgIGlmIChub2RlLm5vZGVzKSB7XG4gICAgICB0aGlzLmJsb2NrKG5vZGUsIG5hbWUgKyBwYXJhbXMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBlbmQgPSAobm9kZS5yYXdzLmJldHdlZW4gfHwgJycpICsgKHNlbWljb2xvbiA/ICc7JyA6ICcnKVxuICAgICAgdGhpcy5idWlsZGVyKG5hbWUgKyBwYXJhbXMgKyBlbmQsIG5vZGUpXG4gICAgfVxuICB9XG5cbiAgYm9keSAobm9kZSkge1xuICAgIGxldCBsYXN0ID0gbm9kZS5ub2Rlcy5sZW5ndGggLSAxXG4gICAgd2hpbGUgKGxhc3QgPiAwKSB7XG4gICAgICBpZiAobm9kZS5ub2Rlc1tsYXN0XS50eXBlICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICBsYXN0IC09IDFcbiAgICB9XG5cbiAgICBsZXQgc2VtaWNvbG9uID0gdGhpcy5yYXcobm9kZSwgJ3NlbWljb2xvbicpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLm5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY2hpbGQgPSBub2RlLm5vZGVzW2ldXG4gICAgICBsZXQgYmVmb3JlID0gdGhpcy5yYXcoY2hpbGQsICdiZWZvcmUnKVxuICAgICAgaWYgKGJlZm9yZSkgdGhpcy5idWlsZGVyKGJlZm9yZSlcbiAgICAgIHRoaXMuc3RyaW5naWZ5KGNoaWxkLCBsYXN0ICE9PSBpIHx8IHNlbWljb2xvbilcbiAgICB9XG4gIH1cblxuICBibG9jayAobm9kZSwgc3RhcnQpIHtcbiAgICBsZXQgYmV0d2VlbiA9IHRoaXMucmF3KG5vZGUsICdiZXR3ZWVuJywgJ2JlZm9yZU9wZW4nKVxuICAgIHRoaXMuYnVpbGRlcihzdGFydCArIGJldHdlZW4gKyAneycsIG5vZGUsICdzdGFydCcpXG5cbiAgICBsZXQgYWZ0ZXJcbiAgICBpZiAobm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCkge1xuICAgICAgdGhpcy5ib2R5KG5vZGUpXG4gICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJywgJ2VtcHR5Qm9keScpXG4gICAgfVxuXG4gICAgaWYgKGFmdGVyKSB0aGlzLmJ1aWxkZXIoYWZ0ZXIpXG4gICAgdGhpcy5idWlsZGVyKCd9Jywgbm9kZSwgJ2VuZCcpXG4gIH1cblxuICByYXcgKG5vZGUsIG93biwgZGV0ZWN0KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgaWYgKCFkZXRlY3QpIGRldGVjdCA9IG93blxuXG4gICAgLy8gQWxyZWFkeSBoYWRcbiAgICBpZiAob3duKSB7XG4gICAgICB2YWx1ZSA9IG5vZGUucmF3c1tvd25dXG4gICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIHZhbHVlXG4gICAgfVxuXG4gICAgbGV0IHBhcmVudCA9IG5vZGUucGFyZW50XG5cbiAgICAvLyBIYWNrIGZvciBmaXJzdCBydWxlIGluIENTU1xuICAgIGlmIChkZXRlY3QgPT09ICdiZWZvcmUnKSB7XG4gICAgICBpZiAoIXBhcmVudCB8fCAocGFyZW50LnR5cGUgPT09ICdyb290JyAmJiBwYXJlbnQuZmlyc3QgPT09IG5vZGUpKSB7XG4gICAgICAgIHJldHVybiAnJ1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZsb2F0aW5nIGNoaWxkIHdpdGhvdXQgcGFyZW50XG4gICAgaWYgKCFwYXJlbnQpIHJldHVybiBERUZBVUxUX1JBV1tkZXRlY3RdXG5cbiAgICAvLyBEZXRlY3Qgc3R5bGUgYnkgb3RoZXIgbm9kZXNcbiAgICBsZXQgcm9vdCA9IG5vZGUucm9vdCgpXG4gICAgaWYgKCFyb290LnJhd0NhY2hlKSByb290LnJhd0NhY2hlID0geyB9XG4gICAgaWYgKHR5cGVvZiByb290LnJhd0NhY2hlW2RldGVjdF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gcm9vdC5yYXdDYWNoZVtkZXRlY3RdXG4gICAgfVxuXG4gICAgaWYgKGRldGVjdCA9PT0gJ2JlZm9yZScgfHwgZGV0ZWN0ID09PSAnYWZ0ZXInKSB7XG4gICAgICByZXR1cm4gdGhpcy5iZWZvcmVBZnRlcihub2RlLCBkZXRlY3QpXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtZXRob2QgPSAncmF3JyArIGNhcGl0YWxpemUoZGV0ZWN0KVxuICAgICAgaWYgKHRoaXNbbWV0aG9kXSkge1xuICAgICAgICB2YWx1ZSA9IHRoaXNbbWV0aG9kXShyb290LCBub2RlKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzW293bl1cbiAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHZhbHVlID0gREVGQVVMVF9SQVdbZGV0ZWN0XVxuXG4gICAgcm9vdC5yYXdDYWNoZVtkZXRlY3RdID0gdmFsdWVcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd1NlbWljb2xvbiAocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIGkubm9kZXMubGVuZ3RoICYmIGkubGFzdC50eXBlID09PSAnZGVjbCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3Muc2VtaWNvbG9uXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnKSByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3RW1wdHlCb2R5IChyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYWZ0ZXJcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdJbmRlbnQgKHJvb3QpIHtcbiAgICBpZiAocm9vdC5yYXdzLmluZGVudCkgcmV0dXJuIHJvb3QucmF3cy5pbmRlbnRcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBsZXQgcCA9IGkucGFyZW50XG4gICAgICBpZiAocCAmJiBwICE9PSByb290ICYmIHAucGFyZW50ICYmIHAucGFyZW50ID09PSByb290KSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBsZXQgcGFydHMgPSBpLnJhd3MuYmVmb3JlLnNwbGl0KCdcXG4nKVxuICAgICAgICAgIHZhbHVlID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV1cbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdCZWZvcmVDb21tZW50IChyb290LCBub2RlKSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrQ29tbWVudHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZVxuICAgICAgICBpZiAodmFsdWUuaW5kZXhPZignXFxuJykgIT09IC0xKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZURlY2wnKVxuICAgIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXHNdL2csICcnKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZURlY2wgKHJvb3QsIG5vZGUpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGtEZWNscyhpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlXG4gICAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpXG4gICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcc10vZywgJycpXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgcmF3QmVmb3JlUnVsZSAocm9vdCkge1xuICAgIGxldCB2YWx1ZVxuICAgIHJvb3Qud2FsayhpID0+IHtcbiAgICAgIGlmIChpLm5vZGVzICYmIChpLnBhcmVudCAhPT0gcm9vdCB8fCByb290LmZpcnN0ICE9PSBpKSkge1xuICAgICAgICBpZiAodHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmVmb3JlXG4gICAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZUNsb3NlIChyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrKGkgPT4ge1xuICAgICAgaWYgKGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmFmdGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmFmdGVyXG4gICAgICAgICAgaWYgKHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKHZhbHVlKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJylcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0JlZm9yZU9wZW4gKHJvb3QpIHtcbiAgICBsZXQgdmFsdWVcbiAgICByb290LndhbGsoaSA9PiB7XG4gICAgICBpZiAoaS50eXBlICE9PSAnZGVjbCcpIHtcbiAgICAgICAgdmFsdWUgPSBpLnJhd3MuYmV0d2VlblxuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIHJhd0NvbG9uIChyb290KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgcm9vdC53YWxrRGVjbHMoaSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGkucmF3cy5iZXR3ZWVuICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZXR3ZWVuLnJlcGxhY2UoL1teXFxzOl0vZywgJycpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICBiZWZvcmVBZnRlciAobm9kZSwgZGV0ZWN0KSB7XG4gICAgbGV0IHZhbHVlXG4gICAgaWYgKG5vZGUudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVEZWNsJylcbiAgICB9IGVsc2UgaWYgKG5vZGUudHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVDb21tZW50JylcbiAgICB9IGVsc2UgaWYgKGRldGVjdCA9PT0gJ2JlZm9yZScpIHtcbiAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZVJ1bGUnKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVDbG9zZScpXG4gICAgfVxuXG4gICAgbGV0IGJ1ZiA9IG5vZGUucGFyZW50XG4gICAgbGV0IGRlcHRoID0gMFxuICAgIHdoaWxlIChidWYgJiYgYnVmLnR5cGUgIT09ICdyb290Jykge1xuICAgICAgZGVwdGggKz0gMVxuICAgICAgYnVmID0gYnVmLnBhcmVudFxuICAgIH1cblxuICAgIGlmICh2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEpIHtcbiAgICAgIGxldCBpbmRlbnQgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnaW5kZW50JylcbiAgICAgIGlmIChpbmRlbnQubGVuZ3RoKSB7XG4gICAgICAgIGZvciAobGV0IHN0ZXAgPSAwOyBzdGVwIDwgZGVwdGg7IHN0ZXArKykgdmFsdWUgKz0gaW5kZW50XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICByYXdWYWx1ZSAobm9kZSwgcHJvcCkge1xuICAgIGxldCB2YWx1ZSA9IG5vZGVbcHJvcF1cbiAgICBsZXQgcmF3ID0gbm9kZS5yYXdzW3Byb3BdXG4gICAgaWYgKHJhdyAmJiByYXcudmFsdWUgPT09IHZhbHVlKSB7XG4gICAgICByZXR1cm4gcmF3LnJhd1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ2lmaWVyXG4iXSwiZmlsZSI6InN0cmluZ2lmaWVyLmpzIn0=


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _stringifier = _interopRequireDefault(__webpack_require__(37));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringify(node, builder) {
  var str = new _stringifier.default(builder);
  str.stringify(node);
}

var _default = stringify;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmeS5lczYiXSwibmFtZXMiOlsic3RyaW5naWZ5Iiwibm9kZSIsImJ1aWxkZXIiLCJzdHIiLCJTdHJpbmdpZmllciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBb0JDLElBQXBCLEVBQTBCQyxPQUExQixFQUFtQztBQUNqQyxNQUFJQyxHQUFHLEdBQUcsSUFBSUMsb0JBQUosQ0FBZ0JGLE9BQWhCLENBQVY7QUFDQUMsRUFBQUEsR0FBRyxDQUFDSCxTQUFKLENBQWNDLElBQWQ7QUFDRDs7ZUFFY0QsUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJpbmdpZmllciBmcm9tICcuL3N0cmluZ2lmaWVyJ1xuXG5mdW5jdGlvbiBzdHJpbmdpZnkgKG5vZGUsIGJ1aWxkZXIpIHtcbiAgbGV0IHN0ciA9IG5ldyBTdHJpbmdpZmllcihidWlsZGVyKVxuICBzdHIuc3RyaW5naWZ5KG5vZGUpXG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0cmluZ2lmeVxuIl0sImZpbGUiOiJzdHJpbmdpZnkuanMifQ==


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _lazyResult = _interopRequireDefault(__webpack_require__(40));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Contains plugins to process CSS. Create one `Processor` instance,
 * initialize its plugins, and then use that instance on numerous CSS files.
 *
 * @example
 * const processor = postcss([autoprefixer, precss])
 * processor.process(css1).then(result => console.log(result.css))
 * processor.process(css2).then(result => console.log(result.css))
 */
var Processor =
/*#__PURE__*/
function () {
  /**
   * @param {Array.<Plugin|pluginFunction>|Processor} plugins PostCSS plugins.
   *        See {@link Processor#use} for plugin format.
   */
  function Processor(plugins) {
    if (plugins === void 0) {
      plugins = [];
    }

    /**
     * Current PostCSS version.
     *
     * @type {string}
     *
     * @example
     * if (result.processor.version.split('.')[0] !== '6') {
     *   throw new Error('This plugin works only with PostCSS 6')
     * }
     */
    this.version = '7.0.18';
    /**
     * Plugins added to this processor.
     *
     * @type {pluginFunction[]}
     *
     * @example
     * const processor = postcss([autoprefixer, precss])
     * processor.plugins.length //=> 2
     */

    this.plugins = this.normalize(plugins);
  }
  /**
   * Adds a plugin to be used as a CSS processor.
   *
   * PostCSS plugin can be in 4 formats:
   * * A plugin created by {@link postcss.plugin} method.
   * * A function. PostCSS will pass the function a @{link Root}
   *   as the first argument and current {@link Result} instance
   *   as the second.
   * * An object with a `postcss` method. PostCSS will use that method
   *   as described in #2.
   * * Another {@link Processor} instance. PostCSS will copy plugins
   *   from that instance into this one.
   *
   * Plugins can also be added by passing them as arguments when creating
   * a `postcss` instance (see [`postcss(plugins)`]).
   *
   * Asynchronous plugins should return a `Promise` instance.
   *
   * @param {Plugin|pluginFunction|Processor} plugin PostCSS plugin
   *                                                 or {@link Processor}
   *                                                 with plugins.
   *
   * @example
   * const processor = postcss()
   *   .use(autoprefixer)
   *   .use(precss)
   *
   * @return {Processes} Current processor to make methods chain.
   */


  var _proto = Processor.prototype;

  _proto.use = function use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));
    return this;
  }
  /**
   * Parses source CSS and returns a {@link LazyResult} Promise proxy.
   * Because some plugins can be asynchronous it doesn’t make
   * any transformations. Transformations will be applied
   * in the {@link LazyResult} methods.
   *
   * @param {string|toString|Result} css String with input CSS or any object
   *                                     with a `toString()` method,
   *                                     like a Buffer. Optionally, send
   *                                     a {@link Result} instance
   *                                     and the processor will take
   *                                     the {@link Root} from it.
   * @param {processOptions} [opts]      Options.
   *
   * @return {LazyResult} Promise proxy.
   *
   * @example
   * processor.process(css, { from: 'a.css', to: 'a.out.css' })
   *   .then(result => {
   *      console.log(result.css)
   *   })
   */
  ;

  _proto.process = function (_process) {
    function process(_x) {
      return _process.apply(this, arguments);
    }

    process.toString = function () {
      return _process.toString();
    };

    return process;
  }(function (css, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (this.plugins.length === 0 && opts.parser === opts.stringifier) {
      if (true) {
        if (typeof console !== 'undefined' && console.warn) {
          console.warn('You did not set any plugins, parser, or stringifier. ' + 'Right now, PostCSS does nothing. Pick plugins for your case ' + 'on https://www.postcss.parts/ and use them in postcss.config.js.');
        }
      }
    }

    return new _lazyResult.default(this, css, opts);
  });

  _proto.normalize = function normalize(plugins) {
    var normalized = [];

    for (var _iterator = plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var i = _ref;
      if (i.postcss) i = i.postcss;

      if (typeof i === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === 'function') {
        normalized.push(i);
      } else if (typeof i === 'object' && (i.parse || i.stringify)) {
        if (true) {
          throw new Error('PostCSS syntaxes cannot be used as plugins. Instead, please use ' + 'one of the syntax/parser/stringifier options as outlined ' + 'in your PostCSS runner documentation.');
        }
      } else {
        throw new Error(i + ' is not a PostCSS plugin');
      }
    }

    return normalized;
  };

  return Processor;
}();

var _default = Processor;
/**
 * @callback builder
 * @param {string} part          Part of generated CSS connected to this node.
 * @param {Node}   node          AST node.
 * @param {"start"|"end"} [type] Node’s part type.
 */

/**
 * @callback parser
 *
 * @param {string|toString} css   String with input CSS or any object
 *                                with toString() method, like a Buffer.
 * @param {processOptions} [opts] Options with only `from` and `map` keys.
 *
 * @return {Root} PostCSS AST
 */

/**
 * @callback stringifier
 *
 * @param {Node} node       Start node for stringifing. Usually {@link Root}.
 * @param {builder} builder Function to concatenate CSS from node’s parts
 *                          or generate string and source map.
 *
 * @return {void}
 */

/**
 * @typedef {object} syntax
 * @property {parser} parse          Function to generate AST by string.
 * @property {stringifier} stringify Function to generate string by AST.
 */

/**
 * @typedef {object} toString
 * @property {function} toString
 */

/**
 * @callback pluginFunction
 * @param {Root} root     Parsed input CSS.
 * @param {Result} result Result to set warnings or check other plugins.
 */

/**
 * @typedef {object} Plugin
 * @property {function} postcss PostCSS plugin function.
 */

/**
 * @typedef {object} processOptions
 * @property {string} from             The path of the CSS source file.
 *                                     You should always set `from`,
 *                                     because it is used in source map
 *                                     generation and syntax error messages.
 * @property {string} to               The path where you’ll put the output
 *                                     CSS file. You should always set `to`
 *                                     to generate correct source maps.
 * @property {parser} parser           Function to generate AST by string.
 * @property {stringifier} stringifier Class to generate string by AST.
 * @property {syntax} syntax           Object with `parse` and `stringify`.
 * @property {object} map              Source map options.
 * @property {boolean} map.inline                    Does source map should
 *                                                   be embedded in the output
 *                                                   CSS as a base64-encoded
 *                                                   comment.
 * @property {string|object|false|function} map.prev Source map content
 *                                                   from a previous
 *                                                   processing step
 *                                                   (for example, Sass).
 *                                                   PostCSS will try to find
 *                                                   previous map automatically,
 *                                                   so you could disable it by
 *                                                   `false` value.
 * @property {boolean} map.sourcesContent            Does PostCSS should set
 *                                                   the origin content to map.
 * @property {string|false} map.annotation           Does PostCSS should set
 *                                                   annotation comment to map.
 * @property {string} map.from                       Override `from` in map’s
 *                                                   sources`.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5lczYiXSwibmFtZXMiOlsiUHJvY2Vzc29yIiwicGx1Z2lucyIsInZlcnNpb24iLCJub3JtYWxpemUiLCJ1c2UiLCJwbHVnaW4iLCJjb25jYXQiLCJwcm9jZXNzIiwiY3NzIiwib3B0cyIsImxlbmd0aCIsInBhcnNlciIsInN0cmluZ2lmaWVyIiwiZW52IiwiTk9ERV9FTlYiLCJjb25zb2xlIiwid2FybiIsIkxhenlSZXN1bHQiLCJub3JtYWxpemVkIiwiaSIsInBvc3Rjc3MiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7OztBQUVBOzs7Ozs7Ozs7SUFTTUEsUzs7O0FBQ0o7Ozs7QUFJQSxxQkFBYUMsT0FBYixFQUEyQjtBQUFBLFFBQWRBLE9BQWM7QUFBZEEsTUFBQUEsT0FBYyxHQUFKLEVBQUk7QUFBQTs7QUFDekI7Ozs7Ozs7Ozs7QUFVQSxTQUFLQyxPQUFMLEdBQWUsUUFBZjtBQUNBOzs7Ozs7Ozs7O0FBU0EsU0FBS0QsT0FBTCxHQUFlLEtBQUtFLFNBQUwsQ0FBZUYsT0FBZixDQUFmO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBNkJBRyxHLEdBQUEsYUFBS0MsTUFBTCxFQUFhO0FBQ1gsU0FBS0osT0FBTCxHQUFlLEtBQUtBLE9BQUwsQ0FBYUssTUFBYixDQUFvQixLQUFLSCxTQUFMLENBQWUsQ0FBQ0UsTUFBRCxDQUFmLENBQXBCLENBQWY7QUFDQSxXQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FzQkFFLE87Ozs7Ozs7Ozs7SUFBQSxVQUFTQyxHQUFULEVBQWNDLElBQWQsRUFBMEI7QUFBQSxRQUFaQSxJQUFZO0FBQVpBLE1BQUFBLElBQVksR0FBTCxFQUFLO0FBQUE7O0FBQ3hCLFFBQUksS0FBS1IsT0FBTCxDQUFhUyxNQUFiLEtBQXdCLENBQXhCLElBQTZCRCxJQUFJLENBQUNFLE1BQUwsS0FBZ0JGLElBQUksQ0FBQ0csV0FBdEQsRUFBbUU7QUFDakUsVUFBSUwsT0FBTyxDQUFDTSxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsWUFBSSxPQUFPQyxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxPQUFPLENBQUNDLElBQTlDLEVBQW9EO0FBQ2xERCxVQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FDRSwwREFDQSw4REFEQSxHQUVBLGtFQUhGO0FBS0Q7QUFDRjtBQUNGOztBQUNELFdBQU8sSUFBSUMsbUJBQUosQ0FBZSxJQUFmLEVBQXFCVCxHQUFyQixFQUEwQkMsSUFBMUIsQ0FBUDtBQUNELEc7O1NBRUROLFMsR0FBQSxtQkFBV0YsT0FBWCxFQUFvQjtBQUNsQixRQUFJaUIsVUFBVSxHQUFHLEVBQWpCOztBQUNBLHlCQUFjakIsT0FBZCxrSEFBdUI7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLFVBQWRrQixDQUFjO0FBQ3JCLFVBQUlBLENBQUMsQ0FBQ0MsT0FBTixFQUFlRCxDQUFDLEdBQUdBLENBQUMsQ0FBQ0MsT0FBTjs7QUFFZixVQUFJLE9BQU9ELENBQVAsS0FBYSxRQUFiLElBQXlCRSxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsQ0FBQyxDQUFDbEIsT0FBaEIsQ0FBN0IsRUFBdUQ7QUFDckRpQixRQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ1osTUFBWCxDQUFrQmEsQ0FBQyxDQUFDbEIsT0FBcEIsQ0FBYjtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU9rQixDQUFQLEtBQWEsVUFBakIsRUFBNkI7QUFDbENELFFBQUFBLFVBQVUsQ0FBQ0ssSUFBWCxDQUFnQkosQ0FBaEI7QUFDRCxPQUZNLE1BRUEsSUFBSSxPQUFPQSxDQUFQLEtBQWEsUUFBYixLQUEwQkEsQ0FBQyxDQUFDSyxLQUFGLElBQVdMLENBQUMsQ0FBQ00sU0FBdkMsQ0FBSixFQUF1RDtBQUM1RCxZQUFJbEIsT0FBTyxDQUFDTSxHQUFSLENBQVlDLFFBQVosS0FBeUIsWUFBN0IsRUFBMkM7QUFDekMsZ0JBQU0sSUFBSVksS0FBSixDQUNKLHFFQUNBLDJEQURBLEdBRUEsdUNBSEksQ0FBTjtBQUtEO0FBQ0YsT0FSTSxNQVFBO0FBQ0wsY0FBTSxJQUFJQSxLQUFKLENBQVVQLENBQUMsR0FBRywwQkFBZCxDQUFOO0FBQ0Q7QUFDRjs7QUFDRCxXQUFPRCxVQUFQO0FBQ0QsRzs7Ozs7ZUFHWWxCLFM7QUFFZjs7Ozs7OztBQU9BOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7QUFVQTs7Ozs7O0FBTUE7Ozs7O0FBS0E7Ozs7OztBQU1BOzs7OztBQUtBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExhenlSZXN1bHQgZnJvbSAnLi9sYXp5LXJlc3VsdCdcblxuLyoqXG4gKiBDb250YWlucyBwbHVnaW5zIHRvIHByb2Nlc3MgQ1NTLiBDcmVhdGUgb25lIGBQcm9jZXNzb3JgIGluc3RhbmNlLFxuICogaW5pdGlhbGl6ZSBpdHMgcGx1Z2lucywgYW5kIHRoZW4gdXNlIHRoYXQgaW5zdGFuY2Ugb24gbnVtZXJvdXMgQ1NTIGZpbGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKFthdXRvcHJlZml4ZXIsIHByZWNzc10pXG4gKiBwcm9jZXNzb3IucHJvY2Vzcyhjc3MxKS50aGVuKHJlc3VsdCA9PiBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKSlcbiAqIHByb2Nlc3Nvci5wcm9jZXNzKGNzczIpLnRoZW4ocmVzdWx0ID0+IGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpKVxuICovXG5jbGFzcyBQcm9jZXNzb3Ige1xuICAvKipcbiAgICogQHBhcmFtIHtBcnJheS48UGx1Z2lufHBsdWdpbkZ1bmN0aW9uPnxQcm9jZXNzb3J9IHBsdWdpbnMgUG9zdENTUyBwbHVnaW5zLlxuICAgKiAgICAgICAgU2VlIHtAbGluayBQcm9jZXNzb3IjdXNlfSBmb3IgcGx1Z2luIGZvcm1hdC5cbiAgICovXG4gIGNvbnN0cnVjdG9yIChwbHVnaW5zID0gW10pIHtcbiAgICAvKipcbiAgICAgKiBDdXJyZW50IFBvc3RDU1MgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGlmIChyZXN1bHQucHJvY2Vzc29yLnZlcnNpb24uc3BsaXQoJy4nKVswXSAhPT0gJzYnKSB7XG4gICAgICogICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgcGx1Z2luIHdvcmtzIG9ubHkgd2l0aCBQb3N0Q1NTIDYnKVxuICAgICAqIH1cbiAgICAgKi9cbiAgICB0aGlzLnZlcnNpb24gPSAnNy4wLjE4J1xuICAgIC8qKlxuICAgICAqIFBsdWdpbnMgYWRkZWQgdG8gdGhpcyBwcm9jZXNzb3IuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7cGx1Z2luRnVuY3Rpb25bXX1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3QgcHJvY2Vzc29yID0gcG9zdGNzcyhbYXV0b3ByZWZpeGVyLCBwcmVjc3NdKVxuICAgICAqIHByb2Nlc3Nvci5wbHVnaW5zLmxlbmd0aCAvLz0+IDJcbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpbnMgPSB0aGlzLm5vcm1hbGl6ZShwbHVnaW5zKVxuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBwbHVnaW4gdG8gYmUgdXNlZCBhcyBhIENTUyBwcm9jZXNzb3IuXG4gICAqXG4gICAqIFBvc3RDU1MgcGx1Z2luIGNhbiBiZSBpbiA0IGZvcm1hdHM6XG4gICAqICogQSBwbHVnaW4gY3JlYXRlZCBieSB7QGxpbmsgcG9zdGNzcy5wbHVnaW59IG1ldGhvZC5cbiAgICogKiBBIGZ1bmN0aW9uLiBQb3N0Q1NTIHdpbGwgcGFzcyB0aGUgZnVuY3Rpb24gYSBAe2xpbmsgUm9vdH1cbiAgICogICBhcyB0aGUgZmlyc3QgYXJndW1lbnQgYW5kIGN1cnJlbnQge0BsaW5rIFJlc3VsdH0gaW5zdGFuY2VcbiAgICogICBhcyB0aGUgc2Vjb25kLlxuICAgKiAqIEFuIG9iamVjdCB3aXRoIGEgYHBvc3Rjc3NgIG1ldGhvZC4gUG9zdENTUyB3aWxsIHVzZSB0aGF0IG1ldGhvZFxuICAgKiAgIGFzIGRlc2NyaWJlZCBpbiAjMi5cbiAgICogKiBBbm90aGVyIHtAbGluayBQcm9jZXNzb3J9IGluc3RhbmNlLiBQb3N0Q1NTIHdpbGwgY29weSBwbHVnaW5zXG4gICAqICAgZnJvbSB0aGF0IGluc3RhbmNlIGludG8gdGhpcyBvbmUuXG4gICAqXG4gICAqIFBsdWdpbnMgY2FuIGFsc28gYmUgYWRkZWQgYnkgcGFzc2luZyB0aGVtIGFzIGFyZ3VtZW50cyB3aGVuIGNyZWF0aW5nXG4gICAqIGEgYHBvc3Rjc3NgIGluc3RhbmNlIChzZWUgW2Bwb3N0Y3NzKHBsdWdpbnMpYF0pLlxuICAgKlxuICAgKiBBc3luY2hyb25vdXMgcGx1Z2lucyBzaG91bGQgcmV0dXJuIGEgYFByb21pc2VgIGluc3RhbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1BsdWdpbnxwbHVnaW5GdW5jdGlvbnxQcm9jZXNzb3J9IHBsdWdpbiBQb3N0Q1NTIHBsdWdpblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciB7QGxpbmsgUHJvY2Vzc29yfVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIHBsdWdpbnMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHByb2Nlc3NvciA9IHBvc3Rjc3MoKVxuICAgKiAgIC51c2UoYXV0b3ByZWZpeGVyKVxuICAgKiAgIC51c2UocHJlY3NzKVxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9jZXNzZXN9IEN1cnJlbnQgcHJvY2Vzc29yIHRvIG1ha2UgbWV0aG9kcyBjaGFpbi5cbiAgICovXG4gIHVzZSAocGx1Z2luKSB7XG4gICAgdGhpcy5wbHVnaW5zID0gdGhpcy5wbHVnaW5zLmNvbmNhdCh0aGlzLm5vcm1hbGl6ZShbcGx1Z2luXSkpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZXMgc291cmNlIENTUyBhbmQgcmV0dXJucyBhIHtAbGluayBMYXp5UmVzdWx0fSBQcm9taXNlIHByb3h5LlxuICAgKiBCZWNhdXNlIHNvbWUgcGx1Z2lucyBjYW4gYmUgYXN5bmNocm9ub3VzIGl0IGRvZXNu4oCZdCBtYWtlXG4gICAqIGFueSB0cmFuc2Zvcm1hdGlvbnMuIFRyYW5zZm9ybWF0aW9ucyB3aWxsIGJlIGFwcGxpZWRcbiAgICogaW4gdGhlIHtAbGluayBMYXp5UmVzdWx0fSBtZXRob2RzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3x0b1N0cmluZ3xSZXN1bHR9IGNzcyBTdHJpbmcgd2l0aCBpbnB1dCBDU1Mgb3IgYW55IG9iamVjdFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIGEgYHRvU3RyaW5nKClgIG1ldGhvZCxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlrZSBhIEJ1ZmZlci4gT3B0aW9uYWxseSwgc2VuZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIHtAbGluayBSZXN1bHR9IGluc3RhbmNlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCB0aGUgcHJvY2Vzc29yIHdpbGwgdGFrZVxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUge0BsaW5rIFJvb3R9IGZyb20gaXQuXG4gICAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSAgICAgIE9wdGlvbnMuXG4gICAqXG4gICAqIEByZXR1cm4ge0xhenlSZXN1bHR9IFByb21pc2UgcHJveHkuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHByb2Nlc3Nvci5wcm9jZXNzKGNzcywgeyBmcm9tOiAnYS5jc3MnLCB0bzogJ2Eub3V0LmNzcycgfSlcbiAgICogICAudGhlbihyZXN1bHQgPT4ge1xuICAgKiAgICAgIGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpXG4gICAqICAgfSlcbiAgICovXG4gIHByb2Nlc3MgKGNzcywgb3B0cyA9IHsgfSkge1xuICAgIGlmICh0aGlzLnBsdWdpbnMubGVuZ3RoID09PSAwICYmIG9wdHMucGFyc2VyID09PSBvcHRzLnN0cmluZ2lmaWVyKSB7XG4gICAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIGNvbnNvbGUud2Fybikge1xuICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICdZb3UgZGlkIG5vdCBzZXQgYW55IHBsdWdpbnMsIHBhcnNlciwgb3Igc3RyaW5naWZpZXIuICcgK1xuICAgICAgICAgICAgJ1JpZ2h0IG5vdywgUG9zdENTUyBkb2VzIG5vdGhpbmcuIFBpY2sgcGx1Z2lucyBmb3IgeW91ciBjYXNlICcgK1xuICAgICAgICAgICAgJ29uIGh0dHBzOi8vd3d3LnBvc3Rjc3MucGFydHMvIGFuZCB1c2UgdGhlbSBpbiBwb3N0Y3NzLmNvbmZpZy5qcy4nXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgTGF6eVJlc3VsdCh0aGlzLCBjc3MsIG9wdHMpXG4gIH1cblxuICBub3JtYWxpemUgKHBsdWdpbnMpIHtcbiAgICBsZXQgbm9ybWFsaXplZCA9IFtdXG4gICAgZm9yIChsZXQgaSBvZiBwbHVnaW5zKSB7XG4gICAgICBpZiAoaS5wb3N0Y3NzKSBpID0gaS5wb3N0Y3NzXG5cbiAgICAgIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgQXJyYXkuaXNBcnJheShpLnBsdWdpbnMpKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQgPSBub3JtYWxpemVkLmNvbmNhdChpLnBsdWdpbnMpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG5vcm1hbGl6ZWQucHVzaChpKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgKGkucGFyc2UgfHwgaS5zdHJpbmdpZnkpKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ1Bvc3RDU1Mgc3ludGF4ZXMgY2Fubm90IGJlIHVzZWQgYXMgcGx1Z2lucy4gSW5zdGVhZCwgcGxlYXNlIHVzZSAnICtcbiAgICAgICAgICAgICdvbmUgb2YgdGhlIHN5bnRheC9wYXJzZXIvc3RyaW5naWZpZXIgb3B0aW9ucyBhcyBvdXRsaW5lZCAnICtcbiAgICAgICAgICAgICdpbiB5b3VyIFBvc3RDU1MgcnVubmVyIGRvY3VtZW50YXRpb24uJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGkgKyAnIGlzIG5vdCBhIFBvc3RDU1MgcGx1Z2luJylcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vcm1hbGl6ZWRcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9jZXNzb3JcblxuLyoqXG4gKiBAY2FsbGJhY2sgYnVpbGRlclxuICogQHBhcmFtIHtzdHJpbmd9IHBhcnQgICAgICAgICAgUGFydCBvZiBnZW5lcmF0ZWQgQ1NTIGNvbm5lY3RlZCB0byB0aGlzIG5vZGUuXG4gKiBAcGFyYW0ge05vZGV9ICAgbm9kZSAgICAgICAgICBBU1Qgbm9kZS5cbiAqIEBwYXJhbSB7XCJzdGFydFwifFwiZW5kXCJ9IFt0eXBlXSBOb2Rl4oCZcyBwYXJ0IHR5cGUuXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgcGFyc2VyXG4gKlxuICogQHBhcmFtIHtzdHJpbmd8dG9TdHJpbmd9IGNzcyAgIFN0cmluZyB3aXRoIGlucHV0IENTUyBvciBhbnkgb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0b1N0cmluZygpIG1ldGhvZCwgbGlrZSBhIEJ1ZmZlci5cbiAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSBPcHRpb25zIHdpdGggb25seSBgZnJvbWAgYW5kIGBtYXBgIGtleXMuXG4gKlxuICogQHJldHVybiB7Um9vdH0gUG9zdENTUyBBU1RcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBzdHJpbmdpZmllclxuICpcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICAgICBTdGFydCBub2RlIGZvciBzdHJpbmdpZmluZy4gVXN1YWxseSB7QGxpbmsgUm9vdH0uXG4gKiBAcGFyYW0ge2J1aWxkZXJ9IGJ1aWxkZXIgRnVuY3Rpb24gdG8gY29uY2F0ZW5hdGUgQ1NTIGZyb20gbm9kZeKAmXMgcGFydHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBvciBnZW5lcmF0ZSBzdHJpbmcgYW5kIHNvdXJjZSBtYXAuXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHN5bnRheFxuICogQHByb3BlcnR5IHtwYXJzZXJ9IHBhcnNlICAgICAgICAgIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIEFTVCBieSBzdHJpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ2lmaWVyfSBzdHJpbmdpZnkgRnVuY3Rpb24gdG8gZ2VuZXJhdGUgc3RyaW5nIGJ5IEFTVC5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHRvU3RyaW5nXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSB0b1N0cmluZ1xuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIHBsdWdpbkZ1bmN0aW9uXG4gKiBAcGFyYW0ge1Jvb3R9IHJvb3QgICAgIFBhcnNlZCBpbnB1dCBDU1MuXG4gKiBAcGFyYW0ge1Jlc3VsdH0gcmVzdWx0IFJlc3VsdCB0byBzZXQgd2FybmluZ3Mgb3IgY2hlY2sgb3RoZXIgcGx1Z2lucy5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IFBsdWdpblxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gcG9zdGNzcyBQb3N0Q1NTIHBsdWdpbiBmdW5jdGlvbi5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHByb2Nlc3NPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZnJvbSAgICAgICAgICAgICBUaGUgcGF0aCBvZiB0aGUgQ1NTIHNvdXJjZSBmaWxlLlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgWW91IHNob3VsZCBhbHdheXMgc2V0IGBmcm9tYCxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlY2F1c2UgaXQgaXMgdXNlZCBpbiBzb3VyY2UgbWFwXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0aW9uIGFuZCBzeW50YXggZXJyb3IgbWVzc2FnZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdG8gICAgICAgICAgICAgICBUaGUgcGF0aCB3aGVyZSB5b3XigJlsbCBwdXQgdGhlIG91dHB1dFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTIGZpbGUuIFlvdSBzaG91bGQgYWx3YXlzIHNldCBgdG9gXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBnZW5lcmF0ZSBjb3JyZWN0IHNvdXJjZSBtYXBzLlxuICogQHByb3BlcnR5IHtwYXJzZXJ9IHBhcnNlciAgICAgICAgICAgRnVuY3Rpb24gdG8gZ2VuZXJhdGUgQVNUIGJ5IHN0cmluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5naWZpZXJ9IHN0cmluZ2lmaWVyIENsYXNzIHRvIGdlbmVyYXRlIHN0cmluZyBieSBBU1QuXG4gKiBAcHJvcGVydHkge3N5bnRheH0gc3ludGF4ICAgICAgICAgICBPYmplY3Qgd2l0aCBgcGFyc2VgIGFuZCBgc3RyaW5naWZ5YC5cbiAqIEBwcm9wZXJ0eSB7b2JqZWN0fSBtYXAgICAgICAgICAgICAgIFNvdXJjZSBtYXAgb3B0aW9ucy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbWFwLmlubGluZSAgICAgICAgICAgICAgICAgICAgRG9lcyBzb3VyY2UgbWFwIHNob3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBlbWJlZGRlZCBpbiB0aGUgb3V0cHV0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUyBhcyBhIGJhc2U2NC1lbmNvZGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1lbnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ3xvYmplY3R8ZmFsc2V8ZnVuY3Rpb259IG1hcC5wcmV2IFNvdXJjZSBtYXAgY29udGVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIGEgcHJldmlvdXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvY2Vzc2luZyBzdGVwXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb3IgZXhhbXBsZSwgU2FzcykuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCB0cnkgdG8gZmluZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2aW91cyBtYXAgYXV0b21hdGljYWxseSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc28geW91IGNvdWxkIGRpc2FibGUgaXQgYnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGZhbHNlYCB2YWx1ZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbWFwLnNvdXJjZXNDb250ZW50ICAgICAgICAgICAgRG9lcyBQb3N0Q1NTIHNob3VsZCBzZXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIG9yaWdpbiBjb250ZW50IHRvIG1hcC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfGZhbHNlfSBtYXAuYW5ub3RhdGlvbiAgICAgICAgICAgRG9lcyBQb3N0Q1NTIHNob3VsZCBzZXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5ub3RhdGlvbiBjb21tZW50IHRvIG1hcC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtYXAuZnJvbSAgICAgICAgICAgICAgICAgICAgICAgT3ZlcnJpZGUgYGZyb21gIGluIG1hcOKAmXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlc2AuXG4gKi9cbiJdLCJmaWxlIjoicHJvY2Vzc29yLmpzIn0=


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _mapGenerator = _interopRequireDefault(__webpack_require__(41));

var _stringify2 = _interopRequireDefault(__webpack_require__(38));

var _warnOnce = _interopRequireDefault(__webpack_require__(42));

var _result = _interopRequireDefault(__webpack_require__(43));

var _parse = _interopRequireDefault(__webpack_require__(45));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function isPromise(obj) {
  return typeof obj === 'object' && typeof obj.then === 'function';
}
/**
 * A Promise proxy for the result of PostCSS transformations.
 *
 * A `LazyResult` instance is returned by {@link Processor#process}.
 *
 * @example
 * const lazy = postcss([autoprefixer]).process(css)
 */


var LazyResult =
/*#__PURE__*/
function () {
  function LazyResult(processor, css, opts) {
    this.stringified = false;
    this.processed = false;
    var root;

    if (typeof css === 'object' && css !== null && css.type === 'root') {
      root = css;
    } else if (css instanceof LazyResult || css instanceof _result.default) {
      root = css.root;

      if (css.map) {
        if (typeof opts.map === 'undefined') opts.map = {};
        if (!opts.map.inline) opts.map.inline = false;
        opts.map.prev = css.map;
      }
    } else {
      var parser = _parse.default;
      if (opts.syntax) parser = opts.syntax.parse;
      if (opts.parser) parser = opts.parser;
      if (parser.parse) parser = parser.parse;

      try {
        root = parser(css, opts);
      } catch (error) {
        this.error = error;
      }
    }

    this.result = new _result.default(processor, root, opts);
  }
  /**
   * Returns a {@link Processor} instance, which will be used
   * for CSS transformations.
   *
   * @type {Processor}
   */


  var _proto = LazyResult.prototype;

  /**
   * Processes input CSS through synchronous plugins
   * and calls {@link Result#warnings()}.
   *
   * @return {Warning[]} Warnings from plugins.
   */
  _proto.warnings = function warnings() {
    return this.sync().warnings();
  }
  /**
   * Alias for the {@link LazyResult#css} property.
   *
   * @example
   * lazy + '' === lazy.css
   *
   * @return {string} Output CSS.
   */
  ;

  _proto.toString = function toString() {
    return this.css;
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls `onFulfilled` with a Result instance. If a plugin throws
   * an error, the `onRejected` callback will be executed.
   *
   * It implements standard Promise API.
   *
   * @param {onFulfilled} onFulfilled Callback will be executed
   *                                  when all plugins will finish work.
   * @param {onRejected}  onRejected  Callback will be executed on any error.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css, { from: cssPath }).then(result => {
   *   console.log(result.css)
   * })
   */
  ;

  _proto.then = function then(onFulfilled, onRejected) {
    if (true) {
      if (!('from' in this.opts)) {
        (0, _warnOnce.default)('Without `from` option PostCSS could generate wrong source map ' + 'and will not find Browserslist config. Set it to CSS file path ' + 'or to `undefined` to prevent this warning.');
      }
    }

    return this.async().then(onFulfilled, onRejected);
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls onRejected for each error thrown in any plugin.
   *
   * It implements standard Promise API.
   *
   * @param {onRejected} onRejected Callback will be executed on any error.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css).then(result => {
   *   console.log(result.css)
   * }).catch(error => {
   *   console.error(error)
   * })
   */
  ;

  _proto.catch = function _catch(onRejected) {
    return this.async().catch(onRejected);
  }
  /**
   * Processes input CSS through synchronous and asynchronous plugins
   * and calls onFinally on any error or when all plugins will finish work.
   *
   * It implements standard Promise API.
   *
   * @param {onFinally} onFinally Callback will be executed on any error or
   *                              when all plugins will finish work.
   *
   * @return {Promise} Promise API to make queue.
   *
   * @example
   * postcss([autoprefixer]).process(css).finally(() => {
   *   console.log('processing ended')
   * })
   */
  ;

  _proto.finally = function _finally(onFinally) {
    return this.async().then(onFinally, onFinally);
  };

  _proto.handleError = function handleError(error, plugin) {
    try {
      this.error = error;

      if (error.name === 'CssSyntaxError' && !error.plugin) {
        error.plugin = plugin.postcssPlugin;
        error.setMessage();
      } else if (plugin.postcssVersion) {
        if (true) {
          var pluginName = plugin.postcssPlugin;
          var pluginVer = plugin.postcssVersion;
          var runtimeVer = this.result.processor.version;
          var a = pluginVer.split('.');
          var b = runtimeVer.split('.');

          if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
            console.error('Unknown error from PostCSS plugin. Your current PostCSS ' + 'version is ' + runtimeVer + ', but ' + pluginName + ' uses ' + pluginVer + '. Perhaps this is the source of the error below.');
          }
        }
      }
    } catch (err) {
      if (console && console.error) console.error(err);
    }
  };

  _proto.asyncTick = function asyncTick(resolve, reject) {
    var _this = this;

    if (this.plugin >= this.processor.plugins.length) {
      this.processed = true;
      return resolve();
    }

    try {
      var plugin = this.processor.plugins[this.plugin];
      var promise = this.run(plugin);
      this.plugin += 1;

      if (isPromise(promise)) {
        promise.then(function () {
          _this.asyncTick(resolve, reject);
        }).catch(function (error) {
          _this.handleError(error, plugin);

          _this.processed = true;
          reject(error);
        });
      } else {
        this.asyncTick(resolve, reject);
      }
    } catch (error) {
      this.processed = true;
      reject(error);
    }
  };

  _proto.async = function async() {
    var _this2 = this;

    if (this.processed) {
      return new Promise(function (resolve, reject) {
        if (_this2.error) {
          reject(_this2.error);
        } else {
          resolve(_this2.stringify());
        }
      });
    }

    if (this.processing) {
      return this.processing;
    }

    this.processing = new Promise(function (resolve, reject) {
      if (_this2.error) return reject(_this2.error);
      _this2.plugin = 0;

      _this2.asyncTick(resolve, reject);
    }).then(function () {
      _this2.processed = true;
      return _this2.stringify();
    });
    return this.processing;
  };

  _proto.sync = function sync() {
    if (this.processed) return this.result;
    this.processed = true;

    if (this.processing) {
      throw new Error('Use process(css).then(cb) to work with async plugins');
    }

    if (this.error) throw this.error;

    for (var _iterator = this.result.processor.plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var plugin = _ref;
      var promise = this.run(plugin);

      if (isPromise(promise)) {
        throw new Error('Use process(css).then(cb) to work with async plugins');
      }
    }

    return this.result;
  };

  _proto.run = function run(plugin) {
    this.result.lastPlugin = plugin;

    try {
      return plugin(this.result.root, this.result);
    } catch (error) {
      this.handleError(error, plugin);
      throw error;
    }
  };

  _proto.stringify = function stringify() {
    if (this.stringified) return this.result;
    this.stringified = true;
    this.sync();
    var opts = this.result.opts;
    var str = _stringify2.default;
    if (opts.syntax) str = opts.syntax.stringify;
    if (opts.stringifier) str = opts.stringifier;
    if (str.stringify) str = str.stringify;
    var map = new _mapGenerator.default(str, this.result.root, this.result.opts);
    var data = map.generate();
    this.result.css = data[0];
    this.result.map = data[1];
    return this.result;
  };

  _createClass(LazyResult, [{
    key: "processor",
    get: function get() {
      return this.result.processor;
    }
    /**
     * Options from the {@link Processor#process} call.
     *
     * @type {processOptions}
     */

  }, {
    key: "opts",
    get: function get() {
      return this.result.opts;
    }
    /**
     * Processes input CSS through synchronous plugins, converts `Root`
     * to a CSS string and returns {@link Result#css}.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {string}
     * @see Result#css
     */

  }, {
    key: "css",
    get: function get() {
      return this.stringify().css;
    }
    /**
     * An alias for the `css` property. Use it with syntaxes
     * that generate non-CSS output.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {string}
     * @see Result#content
     */

  }, {
    key: "content",
    get: function get() {
      return this.stringify().content;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#map}.
     *
     * This property will only work with synchronous plugins.
     * If the processor contains any asynchronous plugins
     * it will throw an error. This is why this method is only
     * for debug purpose, you should always use {@link LazyResult#then}.
     *
     * @type {SourceMapGenerator}
     * @see Result#map
     */

  }, {
    key: "map",
    get: function get() {
      return this.stringify().map;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#root}.
     *
     * This property will only work with synchronous plugins. If the processor
     * contains any asynchronous plugins it will throw an error.
     *
     * This is why this method is only for debug purpose,
     * you should always use {@link LazyResult#then}.
     *
     * @type {Root}
     * @see Result#root
     */

  }, {
    key: "root",
    get: function get() {
      return this.sync().root;
    }
    /**
     * Processes input CSS through synchronous plugins
     * and returns {@link Result#messages}.
     *
     * This property will only work with synchronous plugins. If the processor
     * contains any asynchronous plugins it will throw an error.
     *
     * This is why this method is only for debug purpose,
     * you should always use {@link LazyResult#then}.
     *
     * @type {Message[]}
     * @see Result#messages
     */

  }, {
    key: "messages",
    get: function get() {
      return this.sync().messages;
    }
  }]);

  return LazyResult;
}();

var _default = LazyResult;
/**
 * @callback onFulfilled
 * @param {Result} result
 */

/**
 * @callback onRejected
 * @param {Error} error
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhenktcmVzdWx0LmVzNiJdLCJuYW1lcyI6WyJpc1Byb21pc2UiLCJvYmoiLCJ0aGVuIiwiTGF6eVJlc3VsdCIsInByb2Nlc3NvciIsImNzcyIsIm9wdHMiLCJzdHJpbmdpZmllZCIsInByb2Nlc3NlZCIsInJvb3QiLCJ0eXBlIiwiUmVzdWx0IiwibWFwIiwiaW5saW5lIiwicHJldiIsInBhcnNlciIsInBhcnNlIiwic3ludGF4IiwiZXJyb3IiLCJyZXN1bHQiLCJ3YXJuaW5ncyIsInN5bmMiLCJ0b1N0cmluZyIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsImFzeW5jIiwiY2F0Y2giLCJmaW5hbGx5Iiwib25GaW5hbGx5IiwiaGFuZGxlRXJyb3IiLCJwbHVnaW4iLCJuYW1lIiwicG9zdGNzc1BsdWdpbiIsInNldE1lc3NhZ2UiLCJwb3N0Y3NzVmVyc2lvbiIsInBsdWdpbk5hbWUiLCJwbHVnaW5WZXIiLCJydW50aW1lVmVyIiwidmVyc2lvbiIsImEiLCJzcGxpdCIsImIiLCJwYXJzZUludCIsImNvbnNvbGUiLCJlcnIiLCJhc3luY1RpY2siLCJyZXNvbHZlIiwicmVqZWN0IiwicGx1Z2lucyIsImxlbmd0aCIsInByb21pc2UiLCJydW4iLCJQcm9taXNlIiwic3RyaW5naWZ5IiwicHJvY2Vzc2luZyIsIkVycm9yIiwibGFzdFBsdWdpbiIsInN0ciIsInN0cmluZ2lmaWVyIiwiTWFwR2VuZXJhdG9yIiwiZGF0YSIsImdlbmVyYXRlIiwiY29udGVudCIsIm1lc3NhZ2VzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztBQUVBLFNBQVNBLFNBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3ZCLFNBQU8sT0FBT0EsR0FBUCxLQUFlLFFBQWYsSUFBMkIsT0FBT0EsR0FBRyxDQUFDQyxJQUFYLEtBQW9CLFVBQXREO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztJQVFNQyxV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QUdBLEdBQUcsQ0FBQ0osU0FBVjtBQUVuQixRQUFJNUMsR0FBRyxHQUFHLElBQUlrRCxxQkFBSixDQUFpQkYsR0FBakIsRUFBc0IsS0FBS3pDLE1BQUwsQ0FBWVYsSUFBbEMsRUFBd0MsS0FBS1UsTUFBTCxDQUFZYixJQUFwRCxDQUFWO0FBQ0EsUUFBSXlELElBQUksR0FBR25ELEdBQUcsQ0FBQ29ELFFBQUosRUFBWDtBQUNBLFNBQUs3QyxNQUFMLENBQVlkLEdBQVosR0FBa0IwRCxJQUFJLENBQUMsQ0FBRCxDQUF0QjtBQUNBLFNBQUs1QyxNQUFMLENBQVlQLEdBQVosR0FBa0JtRCxJQUFJLENBQUMsQ0FBRCxDQUF0QjtBQUVBLFdBQU8sS0FBSzVDLE1BQVo7QUFDRCxHOzs7O3dCQWpVZ0I7QUFDZixhQUFPLEtBQUtBLE1BQUwsQ0FBWWYsU0FBbkI7QUFDRDtBQUVEOzs7Ozs7Ozt3QkFLWTtBQUNWLGFBQU8sS0FBS2UsTUFBTCxDQUFZYixJQUFuQjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozt3QkFZVztBQUNULGFBQU8sS0FBS2tELFNBQUwsR0FBaUJuRCxHQUF4QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozt3QkFZZTtBQUNiLGFBQU8sS0FBS21ELFNBQUwsR0FBaUJTLE9BQXhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O3dCQVlXO0FBQ1QsYUFBTyxLQUFLVCxTQUFMLEdBQWlCNUMsR0FBeEI7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7O3dCQWFZO0FBQ1YsYUFBTyxLQUFLUyxJQUFMLEdBQVlaLElBQW5CO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozt3QkFhZ0I7QUFDZCxhQUFPLEtBQUtZLElBQUwsR0FBWTZDLFFBQW5CO0FBQ0Q7Ozs7OztlQXVPWS9ELFU7QUFFZjs7Ozs7QUFLQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBNYXBHZW5lcmF0b3IgZnJvbSAnLi9tYXAtZ2VuZXJhdG9yJ1xuaW1wb3J0IHN0cmluZ2lmeSBmcm9tICcuL3N0cmluZ2lmeSdcbmltcG9ydCB3YXJuT25jZSBmcm9tICcuL3dhcm4tb25jZSdcbmltcG9ydCBSZXN1bHQgZnJvbSAnLi9yZXN1bHQnXG5pbXBvcnQgcGFyc2UgZnJvbSAnLi9wYXJzZSdcblxuZnVuY3Rpb24gaXNQcm9taXNlIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJ1xufVxuXG4vKipcbiAqIEEgUHJvbWlzZSBwcm94eSBmb3IgdGhlIHJlc3VsdCBvZiBQb3N0Q1NTIHRyYW5zZm9ybWF0aW9ucy5cbiAqXG4gKiBBIGBMYXp5UmVzdWx0YCBpbnN0YW5jZSBpcyByZXR1cm5lZCBieSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9LlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBsYXp5ID0gcG9zdGNzcyhbYXV0b3ByZWZpeGVyXSkucHJvY2Vzcyhjc3MpXG4gKi9cbmNsYXNzIExhenlSZXN1bHQge1xuICBjb25zdHJ1Y3RvciAocHJvY2Vzc29yLCBjc3MsIG9wdHMpIHtcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gZmFsc2VcbiAgICB0aGlzLnByb2Nlc3NlZCA9IGZhbHNlXG5cbiAgICBsZXQgcm9vdFxuICAgIGlmICh0eXBlb2YgY3NzID09PSAnb2JqZWN0JyAmJiBjc3MgIT09IG51bGwgJiYgY3NzLnR5cGUgPT09ICdyb290Jykge1xuICAgICAgcm9vdCA9IGNzc1xuICAgIH0gZWxzZSBpZiAoY3NzIGluc3RhbmNlb2YgTGF6eVJlc3VsdCB8fCBjc3MgaW5zdGFuY2VvZiBSZXN1bHQpIHtcbiAgICAgIHJvb3QgPSBjc3Mucm9vdFxuICAgICAgaWYgKGNzcy5tYXApIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLm1hcCA9PT0gJ3VuZGVmaW5lZCcpIG9wdHMubWFwID0geyB9XG4gICAgICAgIGlmICghb3B0cy5tYXAuaW5saW5lKSBvcHRzLm1hcC5pbmxpbmUgPSBmYWxzZVxuICAgICAgICBvcHRzLm1hcC5wcmV2ID0gY3NzLm1hcFxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgcGFyc2VyID0gcGFyc2VcbiAgICAgIGlmIChvcHRzLnN5bnRheCkgcGFyc2VyID0gb3B0cy5zeW50YXgucGFyc2VcbiAgICAgIGlmIChvcHRzLnBhcnNlcikgcGFyc2VyID0gb3B0cy5wYXJzZXJcbiAgICAgIGlmIChwYXJzZXIucGFyc2UpIHBhcnNlciA9IHBhcnNlci5wYXJzZVxuXG4gICAgICB0cnkge1xuICAgICAgICByb290ID0gcGFyc2VyKGNzcywgb3B0cylcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucmVzdWx0ID0gbmV3IFJlc3VsdChwcm9jZXNzb3IsIHJvb3QsIG9wdHMpXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHtAbGluayBQcm9jZXNzb3J9IGluc3RhbmNlLCB3aGljaCB3aWxsIGJlIHVzZWRcbiAgICogZm9yIENTUyB0cmFuc2Zvcm1hdGlvbnMuXG4gICAqXG4gICAqIEB0eXBlIHtQcm9jZXNzb3J9XG4gICAqL1xuICBnZXQgcHJvY2Vzc29yICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQucHJvY2Vzc29yXG4gIH1cblxuICAvKipcbiAgICogT3B0aW9ucyBmcm9tIHRoZSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9IGNhbGwuXG4gICAqXG4gICAqIEB0eXBlIHtwcm9jZXNzT3B0aW9uc31cbiAgICovXG4gIGdldCBvcHRzICgpIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHQub3B0c1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zLCBjb252ZXJ0cyBgUm9vdGBcbiAgICogdG8gYSBDU1Mgc3RyaW5nIGFuZCByZXR1cm5zIHtAbGluayBSZXN1bHQjY3NzfS5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgd29yayB3aXRoIHN5bmNocm9ub3VzIHBsdWdpbnMuXG4gICAqIElmIHRoZSBwcm9jZXNzb3IgY29udGFpbnMgYW55IGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuIFRoaXMgaXMgd2h5IHRoaXMgbWV0aG9kIGlzIG9ubHlcbiAgICogZm9yIGRlYnVnIHB1cnBvc2UsIHlvdSBzaG91bGQgYWx3YXlzIHVzZSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufS5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICogQHNlZSBSZXN1bHQjY3NzXG4gICAqL1xuICBnZXQgY3NzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5jc3NcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBhbGlhcyBmb3IgdGhlIGBjc3NgIHByb3BlcnR5LiBVc2UgaXQgd2l0aCBzeW50YXhlc1xuICAgKiB0aGF0IGdlbmVyYXRlIG5vbi1DU1Mgb3V0cHV0LlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy5cbiAgICogSWYgdGhlIHByb2Nlc3NvciBjb250YWlucyBhbnkgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogaXQgd2lsbCB0aHJvdyBhbiBlcnJvci4gVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seVxuICAgKiBmb3IgZGVidWcgcHVycG9zZSwgeW91IHNob3VsZCBhbHdheXMgdXNlIHtAbGluayBMYXp5UmVzdWx0I3RoZW59LlxuICAgKlxuICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgKiBAc2VlIFJlc3VsdCNjb250ZW50XG4gICAqL1xuICBnZXQgY29udGVudCAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkuY29udGVudFxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCByZXR1cm5zIHtAbGluayBSZXN1bHQjbWFwfS5cbiAgICpcbiAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgd29yayB3aXRoIHN5bmNocm9ub3VzIHBsdWdpbnMuXG4gICAqIElmIHRoZSBwcm9jZXNzb3IgY29udGFpbnMgYW55IGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGl0IHdpbGwgdGhyb3cgYW4gZXJyb3IuIFRoaXMgaXMgd2h5IHRoaXMgbWV0aG9kIGlzIG9ubHlcbiAgICogZm9yIGRlYnVnIHB1cnBvc2UsIHlvdSBzaG91bGQgYWx3YXlzIHVzZSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufS5cbiAgICpcbiAgICogQHR5cGUge1NvdXJjZU1hcEdlbmVyYXRvcn1cbiAgICogQHNlZSBSZXN1bHQjbWFwXG4gICAqL1xuICBnZXQgbWFwICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdHJpbmdpZnkoKS5tYXBcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgcGx1Z2luc1xuICAgKiBhbmQgcmV0dXJucyB7QGxpbmsgUmVzdWx0I3Jvb3R9LlxuICAgKlxuICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy4gSWYgdGhlIHByb2Nlc3NvclxuICAgKiBjb250YWlucyBhbnkgYXN5bmNocm9ub3VzIHBsdWdpbnMgaXQgd2lsbCB0aHJvdyBhbiBlcnJvci5cbiAgICpcbiAgICogVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seSBmb3IgZGVidWcgcHVycG9zZSxcbiAgICogeW91IHNob3VsZCBhbHdheXMgdXNlIHtAbGluayBMYXp5UmVzdWx0I3RoZW59LlxuICAgKlxuICAgKiBAdHlwZSB7Um9vdH1cbiAgICogQHNlZSBSZXN1bHQjcm9vdFxuICAgKi9cbiAgZ2V0IHJvb3QgKCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS5yb290XG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogYW5kIHJldHVybnMge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAqXG4gICAqIFRoaXMgcHJvcGVydHkgd2lsbCBvbmx5IHdvcmsgd2l0aCBzeW5jaHJvbm91cyBwbHVnaW5zLiBJZiB0aGUgcHJvY2Vzc29yXG4gICAqIGNvbnRhaW5zIGFueSBhc3luY2hyb25vdXMgcGx1Z2lucyBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgKlxuICAgKiBUaGlzIGlzIHdoeSB0aGlzIG1ldGhvZCBpcyBvbmx5IGZvciBkZWJ1ZyBwdXJwb3NlLFxuICAgKiB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAqXG4gICAqIEB0eXBlIHtNZXNzYWdlW119XG4gICAqIEBzZWUgUmVzdWx0I21lc3NhZ2VzXG4gICAqL1xuICBnZXQgbWVzc2FnZXMgKCkge1xuICAgIHJldHVybiB0aGlzLnN5bmMoKS5tZXNzYWdlc1xuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCBjYWxscyB7QGxpbmsgUmVzdWx0I3dhcm5pbmdzKCl9LlxuICAgKlxuICAgKiBAcmV0dXJuIHtXYXJuaW5nW119IFdhcm5pbmdzIGZyb20gcGx1Z2lucy5cbiAgICovXG4gIHdhcm5pbmdzICgpIHtcbiAgICByZXR1cm4gdGhpcy5zeW5jKCkud2FybmluZ3MoKVxuICB9XG5cbiAgLyoqXG4gICAqIEFsaWFzIGZvciB0aGUge0BsaW5rIExhenlSZXN1bHQjY3NzfSBwcm9wZXJ0eS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbGF6eSArICcnID09PSBsYXp5LmNzc1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IE91dHB1dCBDU1MuXG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgcmV0dXJuIHRoaXMuY3NzXG4gIH1cblxuICAvKipcbiAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIGFuZCBhc3luY2hyb25vdXMgcGx1Z2luc1xuICAgKiBhbmQgY2FsbHMgYG9uRnVsZmlsbGVkYCB3aXRoIGEgUmVzdWx0IGluc3RhbmNlLiBJZiBhIHBsdWdpbiB0aHJvd3NcbiAgICogYW4gZXJyb3IsIHRoZSBgb25SZWplY3RlZGAgY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZC5cbiAgICpcbiAgICogSXQgaW1wbGVtZW50cyBzdGFuZGFyZCBQcm9taXNlIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHtvbkZ1bGZpbGxlZH0gb25GdWxmaWxsZWQgQ2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuIGFsbCBwbHVnaW5zIHdpbGwgZmluaXNoIHdvcmsuXG4gICAqIEBwYXJhbSB7b25SZWplY3RlZH0gIG9uUmVqZWN0ZWQgIENhbGxiYWNrIHdpbGwgYmUgZXhlY3V0ZWQgb24gYW55IGVycm9yLlxuICAgKlxuICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIEFQSSB0byBtYWtlIHF1ZXVlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzKFthdXRvcHJlZml4ZXJdKS5wcm9jZXNzKGNzcywgeyBmcm9tOiBjc3NQYXRoIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICogICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICAgKiB9KVxuICAgKi9cbiAgdGhlbiAob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCEoJ2Zyb20nIGluIHRoaXMub3B0cykpIHtcbiAgICAgICAgd2Fybk9uY2UoXG4gICAgICAgICAgJ1dpdGhvdXQgYGZyb21gIG9wdGlvbiBQb3N0Q1NTIGNvdWxkIGdlbmVyYXRlIHdyb25nIHNvdXJjZSBtYXAgJyArXG4gICAgICAgICAgJ2FuZCB3aWxsIG5vdCBmaW5kIEJyb3dzZXJzbGlzdCBjb25maWcuIFNldCBpdCB0byBDU1MgZmlsZSBwYXRoICcgK1xuICAgICAgICAgICdvciB0byBgdW5kZWZpbmVkYCB0byBwcmV2ZW50IHRoaXMgd2FybmluZy4nXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKVxuICB9XG5cbiAgLyoqXG4gICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBhbmQgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICogYW5kIGNhbGxzIG9uUmVqZWN0ZWQgZm9yIGVhY2ggZXJyb3IgdGhyb3duIGluIGFueSBwbHVnaW4uXG4gICAqXG4gICAqIEl0IGltcGxlbWVudHMgc3RhbmRhcmQgUHJvbWlzZSBBUEkuXG4gICAqXG4gICAqIEBwYXJhbSB7b25SZWplY3RlZH0gb25SZWplY3RlZCBDYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkIG9uIGFueSBlcnJvci5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSBBUEkgdG8gbWFrZSBxdWV1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcyhbYXV0b3ByZWZpeGVyXSkucHJvY2Vzcyhjc3MpLnRoZW4ocmVzdWx0ID0+IHtcbiAgICogICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKVxuICAgKiB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAqICAgY29uc29sZS5lcnJvcihlcnJvcilcbiAgICogfSlcbiAgICovXG4gIGNhdGNoIChvblJlamVjdGVkKSB7XG4gICAgcmV0dXJuIHRoaXMuYXN5bmMoKS5jYXRjaChvblJlamVjdGVkKVxuICB9XG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgYW5kIGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAqIGFuZCBjYWxscyBvbkZpbmFsbHkgb24gYW55IGVycm9yIG9yIHdoZW4gYWxsIHBsdWdpbnMgd2lsbCBmaW5pc2ggd29yay5cbiAgICpcbiAgICogSXQgaW1wbGVtZW50cyBzdGFuZGFyZCBQcm9taXNlIEFQSS5cbiAgICpcbiAgICogQHBhcmFtIHtvbkZpbmFsbHl9IG9uRmluYWxseSBDYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkIG9uIGFueSBlcnJvciBvclxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZW4gYWxsIHBsdWdpbnMgd2lsbCBmaW5pc2ggd29yay5cbiAgICpcbiAgICogQHJldHVybiB7UHJvbWlzZX0gUHJvbWlzZSBBUEkgdG8gbWFrZSBxdWV1ZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcyhbYXV0b3ByZWZpeGVyXSkucHJvY2Vzcyhjc3MpLmZpbmFsbHkoKCkgPT4ge1xuICAgKiAgIGNvbnNvbGUubG9nKCdwcm9jZXNzaW5nIGVuZGVkJylcbiAgICogfSlcbiAgICovXG4gIGZpbmFsbHkgKG9uRmluYWxseSkge1xuICAgIHJldHVybiB0aGlzLmFzeW5jKCkudGhlbihvbkZpbmFsbHksIG9uRmluYWxseSlcbiAgfVxuXG4gIGhhbmRsZUVycm9yIChlcnJvciwgcGx1Z2luKSB7XG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvclxuICAgICAgaWYgKGVycm9yLm5hbWUgPT09ICdDc3NTeW50YXhFcnJvcicgJiYgIWVycm9yLnBsdWdpbikge1xuICAgICAgICBlcnJvci5wbHVnaW4gPSBwbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgICBlcnJvci5zZXRNZXNzYWdlKClcbiAgICAgIH0gZWxzZSBpZiAocGx1Z2luLnBvc3Rjc3NWZXJzaW9uKSB7XG4gICAgICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgbGV0IHBsdWdpbk5hbWUgPSBwbHVnaW4ucG9zdGNzc1BsdWdpblxuICAgICAgICAgIGxldCBwbHVnaW5WZXIgPSBwbHVnaW4ucG9zdGNzc1ZlcnNpb25cbiAgICAgICAgICBsZXQgcnVudGltZVZlciA9IHRoaXMucmVzdWx0LnByb2Nlc3Nvci52ZXJzaW9uXG4gICAgICAgICAgbGV0IGEgPSBwbHVnaW5WZXIuc3BsaXQoJy4nKVxuICAgICAgICAgIGxldCBiID0gcnVudGltZVZlci5zcGxpdCgnLicpXG5cbiAgICAgICAgICBpZiAoYVswXSAhPT0gYlswXSB8fCBwYXJzZUludChhWzFdKSA+IHBhcnNlSW50KGJbMV0pKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKFxuICAgICAgICAgICAgICAnVW5rbm93biBlcnJvciBmcm9tIFBvc3RDU1MgcGx1Z2luLiBZb3VyIGN1cnJlbnQgUG9zdENTUyAnICtcbiAgICAgICAgICAgICAgJ3ZlcnNpb24gaXMgJyArIHJ1bnRpbWVWZXIgKyAnLCBidXQgJyArIHBsdWdpbk5hbWUgKyAnIHVzZXMgJyArXG4gICAgICAgICAgICAgIHBsdWdpblZlciArICcuIFBlcmhhcHMgdGhpcyBpcyB0aGUgc291cmNlIG9mIHRoZSBlcnJvciBiZWxvdy4nXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBpZiAoY29uc29sZSAmJiBjb25zb2xlLmVycm9yKSBjb25zb2xlLmVycm9yKGVycilcbiAgICB9XG4gIH1cblxuICBhc3luY1RpY2sgKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGlmICh0aGlzLnBsdWdpbiA+PSB0aGlzLnByb2Nlc3Nvci5wbHVnaW5zLmxlbmd0aCkge1xuICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG4gICAgICByZXR1cm4gcmVzb2x2ZSgpXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCBwbHVnaW4gPSB0aGlzLnByb2Nlc3Nvci5wbHVnaW5zW3RoaXMucGx1Z2luXVxuICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnJ1bihwbHVnaW4pXG4gICAgICB0aGlzLnBsdWdpbiArPSAxXG5cbiAgICAgIGlmIChpc1Byb21pc2UocHJvbWlzZSkpIHtcbiAgICAgICAgcHJvbWlzZS50aGVuKCgpID0+IHtcbiAgICAgICAgICB0aGlzLmFzeW5jVGljayhyZXNvbHZlLCByZWplY3QpXG4gICAgICAgIH0pLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICB0aGlzLmhhbmRsZUVycm9yKGVycm9yLCBwbHVnaW4pXG4gICAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlXG4gICAgICAgICAgcmVqZWN0KGVycm9yKVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5hc3luY1RpY2socmVzb2x2ZSwgcmVqZWN0KVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcbiAgICAgIHJlamVjdChlcnJvcilcbiAgICB9XG4gIH1cblxuICBhc3luYyAoKSB7XG4gICAgaWYgKHRoaXMucHJvY2Vzc2VkKSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy5lcnJvcikge1xuICAgICAgICAgIHJlamVjdCh0aGlzLmVycm9yKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUodGhpcy5zdHJpbmdpZnkoKSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHRoaXMucHJvY2Vzc2luZykge1xuICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc2luZ1xuICAgIH1cblxuICAgIHRoaXMucHJvY2Vzc2luZyA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGlmICh0aGlzLmVycm9yKSByZXR1cm4gcmVqZWN0KHRoaXMuZXJyb3IpXG4gICAgICB0aGlzLnBsdWdpbiA9IDBcbiAgICAgIHRoaXMuYXN5bmNUaWNrKHJlc29sdmUsIHJlamVjdClcbiAgICB9KS50aGVuKCgpID0+IHtcbiAgICAgIHRoaXMucHJvY2Vzc2VkID0gdHJ1ZVxuICAgICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXMucHJvY2Vzc2luZ1xuICB9XG5cbiAgc3luYyAoKSB7XG4gICAgaWYgKHRoaXMucHJvY2Vzc2VkKSByZXR1cm4gdGhpcy5yZXN1bHRcbiAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWVcblxuICAgIGlmICh0aGlzLnByb2Nlc3NpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VzZSBwcm9jZXNzKGNzcykudGhlbihjYikgdG8gd29yayB3aXRoIGFzeW5jIHBsdWdpbnMnKVxuICAgIH1cblxuICAgIGlmICh0aGlzLmVycm9yKSB0aHJvdyB0aGlzLmVycm9yXG5cbiAgICBmb3IgKGxldCBwbHVnaW4gb2YgdGhpcy5yZXN1bHQucHJvY2Vzc29yLnBsdWdpbnMpIHtcbiAgICAgIGxldCBwcm9taXNlID0gdGhpcy5ydW4ocGx1Z2luKVxuICAgICAgaWYgKGlzUHJvbWlzZShwcm9taXNlKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1VzZSBwcm9jZXNzKGNzcykudGhlbihjYikgdG8gd29yayB3aXRoIGFzeW5jIHBsdWdpbnMnKVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG5cbiAgcnVuIChwbHVnaW4pIHtcbiAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luXG5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHBsdWdpbih0aGlzLnJlc3VsdC5yb290LCB0aGlzLnJlc3VsdClcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgcGx1Z2luKVxuICAgICAgdGhyb3cgZXJyb3JcbiAgICB9XG4gIH1cblxuICBzdHJpbmdpZnkgKCkge1xuICAgIGlmICh0aGlzLnN0cmluZ2lmaWVkKSByZXR1cm4gdGhpcy5yZXN1bHRcbiAgICB0aGlzLnN0cmluZ2lmaWVkID0gdHJ1ZVxuXG4gICAgdGhpcy5zeW5jKClcblxuICAgIGxldCBvcHRzID0gdGhpcy5yZXN1bHQub3B0c1xuICAgIGxldCBzdHIgPSBzdHJpbmdpZnlcbiAgICBpZiAob3B0cy5zeW50YXgpIHN0ciA9IG9wdHMuc3ludGF4LnN0cmluZ2lmeVxuICAgIGlmIChvcHRzLnN0cmluZ2lmaWVyKSBzdHIgPSBvcHRzLnN0cmluZ2lmaWVyXG4gICAgaWYgKHN0ci5zdHJpbmdpZnkpIHN0ciA9IHN0ci5zdHJpbmdpZnlcblxuICAgIGxldCBtYXAgPSBuZXcgTWFwR2VuZXJhdG9yKHN0ciwgdGhpcy5yZXN1bHQucm9vdCwgdGhpcy5yZXN1bHQub3B0cylcbiAgICBsZXQgZGF0YSA9IG1hcC5nZW5lcmF0ZSgpXG4gICAgdGhpcy5yZXN1bHQuY3NzID0gZGF0YVswXVxuICAgIHRoaXMucmVzdWx0Lm1hcCA9IGRhdGFbMV1cblxuICAgIHJldHVybiB0aGlzLnJlc3VsdFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IExhenlSZXN1bHRcblxuLyoqXG4gKiBAY2FsbGJhY2sgb25GdWxmaWxsZWRcbiAqIEBwYXJhbSB7UmVzdWx0fSByZXN1bHRcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBvblJlamVjdGVkXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJvclxuICovXG4iXSwiZmlsZSI6ImxhenktcmVzdWx0LmpzIn0=


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _sourceMap = _interopRequireDefault(__webpack_require__(25));

var _path = _interopRequireDefault(__webpack_require__(23));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MapGenerator =
/*#__PURE__*/
function () {
  function MapGenerator(stringify, root, opts) {
    this.stringify = stringify;
    this.mapOpts = opts.map || {};
    this.root = root;
    this.opts = opts;
  }

  var _proto = MapGenerator.prototype;

  _proto.isMap = function isMap() {
    if (typeof this.opts.map !== 'undefined') {
      return !!this.opts.map;
    }

    return this.previous().length > 0;
  };

  _proto.previous = function previous() {
    var _this = this;

    if (!this.previousMaps) {
      this.previousMaps = [];
      this.root.walk(function (node) {
        if (node.source && node.source.input.map) {
          var map = node.source.input.map;

          if (_this.previousMaps.indexOf(map) === -1) {
            _this.previousMaps.push(map);
          }
        }
      });
    }

    return this.previousMaps;
  };

  _proto.isInline = function isInline() {
    if (typeof this.mapOpts.inline !== 'undefined') {
      return this.mapOpts.inline;
    }

    var annotation = this.mapOpts.annotation;

    if (typeof annotation !== 'undefined' && annotation !== true) {
      return false;
    }

    if (this.previous().length) {
      return this.previous().some(function (i) {
        return i.inline;
      });
    }

    return true;
  };

  _proto.isSourcesContent = function isSourcesContent() {
    if (typeof this.mapOpts.sourcesContent !== 'undefined') {
      return this.mapOpts.sourcesContent;
    }

    if (this.previous().length) {
      return this.previous().some(function (i) {
        return i.withContent();
      });
    }

    return true;
  };

  _proto.clearAnnotation = function clearAnnotation() {
    if (this.mapOpts.annotation === false) return;
    var node;

    for (var i = this.root.nodes.length - 1; i >= 0; i--) {
      node = this.root.nodes[i];
      if (node.type !== 'comment') continue;

      if (node.text.indexOf('# sourceMappingURL=') === 0) {
        this.root.removeChild(i);
      }
    }
  };

  _proto.setSourcesContent = function setSourcesContent() {
    var _this2 = this;

    var already = {};
    this.root.walk(function (node) {
      if (node.source) {
        var from = node.source.input.from;

        if (from && !already[from]) {
          already[from] = true;

          var relative = _this2.relative(from);

          _this2.map.setSourceContent(relative, node.source.input.css);
        }
      }
    });
  };

  _proto.applyPrevMaps = function applyPrevMaps() {
    for (var _iterator = this.previous(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var prev = _ref;
      var from = this.relative(prev.file);

      var root = prev.root || _path.default.dirname(prev.file);

      var map = void 0;

      if (this.mapOpts.sourcesContent === false) {
        map = new _sourceMap.default.SourceMapConsumer(prev.text);

        if (map.sourcesContent) {
          map.sourcesContent = map.sourcesContent.map(function () {
            return null;
          });
        }
      } else {
        map = prev.consumer();
      }

      this.map.applySourceMap(map, from, this.relative(root));
    }
  };

  _proto.isAnnotation = function isAnnotation() {
    if (this.isInline()) {
      return true;
    }

    if (typeof this.mapOpts.annotation !== 'undefined') {
      return this.mapOpts.annotation;
    }

    if (this.previous().length) {
      return this.previous().some(function (i) {
        return i.annotation;
      });
    }

    return true;
  };

  _proto.toBase64 = function toBase64(str) {
    if (Buffer) {
      return Buffer.from(str).toString('base64');
    }

    return window.btoa(unescape(encodeURIComponent(str)));
  };

  _proto.addAnnotation = function addAnnotation() {
    var content;

    if (this.isInline()) {
      content = 'data:application/json;base64,' + this.toBase64(this.map.toString());
    } else if (typeof this.mapOpts.annotation === 'string') {
      content = this.mapOpts.annotation;
    } else {
      content = this.outputFile() + '.map';
    }

    var eol = '\n';
    if (this.css.indexOf('\r\n') !== -1) eol = '\r\n';
    this.css += eol + '/*# sourceMappingURL=' + content + ' */';
  };

  _proto.outputFile = function outputFile() {
    if (this.opts.to) {
      return this.relative(this.opts.to);
    }

    if (this.opts.from) {
      return this.relative(this.opts.from);
    }

    return 'to.css';
  };

  _proto.generateMap = function generateMap() {
    this.generateString();
    if (this.isSourcesContent()) this.setSourcesContent();
    if (this.previous().length > 0) this.applyPrevMaps();
    if (this.isAnnotation()) this.addAnnotation();

    if (this.isInline()) {
      return [this.css];
    }

    return [this.css, this.map];
  };

  _proto.relative = function relative(file) {
    if (file.indexOf('<') === 0) return file;
    if (/^\w+:\/\//.test(file)) return file;
    var from = this.opts.to ? _path.default.dirname(this.opts.to) : '.';

    if (typeof this.mapOpts.annotation === 'string') {
      from = _path.default.dirname(_path.default.resolve(from, this.mapOpts.annotation));
    }

    file = _path.default.relative(from, file);

    if (_path.default.sep === '\\') {
      return file.replace(/\\/g, '/');
    }

    return file;
  };

  _proto.sourcePath = function sourcePath(node) {
    if (this.mapOpts.from) {
      return this.mapOpts.from;
    }

    return this.relative(node.source.input.from);
  };

  _proto.generateString = function generateString() {
    var _this3 = this;

    this.css = '';
    this.map = new _sourceMap.default.SourceMapGenerator({
      file: this.outputFile()
    });
    var line = 1;
    var column = 1;
    var lines, last;
    this.stringify(this.root, function (str, node, type) {
      _this3.css += str;

      if (node && type !== 'end') {
        if (node.source && node.source.start) {
          _this3.map.addMapping({
            source: _this3.sourcePath(node),
            generated: {
              line: line,
              column: column - 1
            },
            original: {
              line: node.source.start.line,
              column: node.source.start.column - 1
            }
          });
        } else {
          _this3.map.addMapping({
            source: '<no source>',
            original: {
              line: 1,
              column: 0
            },
            generated: {
              line: line,
              column: column - 1
            }
          });
        }
      }

      lines = str.match(/\n/g);

      if (lines) {
        line += lines.length;
        last = str.lastIndexOf('\n');
        column = str.length - last;
      } else {
        column += str.length;
      }

      if (node && type !== 'start') {
        var p = node.parent || {
          raws: {}
        };

        if (node.type !== 'decl' || node !== p.last || p.raws.semicolon) {
          if (node.source && node.source.end) {
            _this3.map.addMapping({
              source: _this3.sourcePath(node),
              generated: {
                line: line,
                column: column - 2
              },
              original: {
                line: node.source.end.line,
                column: node.source.end.column - 1
              }
            });
          } else {
            _this3.map.addMapping({
              source: '<no source>',
              original: {
                line: 1,
                column: 0
              },
              generated: {
                line: line,
                column: column - 1
              }
            });
          }
        }
      }
    });
  };

  _proto.generate = function generate() {
    this.clearAnnotation();

    if (this.isMap()) {
      return this.generateMap();
    }

    var result = '';
    this.stringify(this.root, function (i) {
      result += i;
    });
    return [result];
  };

  return MapGenerator;
}();

var _default = MapGenerator;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC1nZW5lcmF0b3IuZXM2Il0sIm5hbWVzIjpbIk1hcEdlbmVyYXRvciIsInN0cmluZ2lmeSIsInJvb3QiLCJvcHRzIiwibWFwT3B0cyIsIm1hcCIsImlzTWFwIiwicHJldmlvdXMiLCJsZW5ndGgiLCJwcmV2aW91c01hcHMiLCJ3YWxrIiwibm9kZSIsInNvdXJjZSIsImlucHV0IiwiaW5kZXhPZiIsInB1c2giLCJpc0lubGluZSIsImlubGluZSIsImFubm90YXRpb24iLCJzb21lIiwiaSIsImlzU291cmNlc0NvbnRlbnQiLCJzb3VyY2VzQ29udGVudCIsIndpdGhDb250ZW50IiwiY2xlYXJBbm5vdGF0aW9uIiwibm9kZXMiLCJ0eXBlIiwidGV4dCIsInJlbW92ZUNoaWxkIiwic2V0U291cmNlc0NvbnRlbnQiLCJhbHJlYWR5IiwiZnJvbSIsInJlbGF0aXZlIiwic2V0U291cmNlQ29udGVudCIsImNzcyIsImFwcGx5UHJldk1hcHMiLCJwcmV2IiwiZmlsZSIsInBhdGgiLCJkaXJuYW1lIiwibW96aWxsYSIsIlNvdXJjZU1hcENvbnN1bWVyIiwiY29uc3VtZXIiLCJhcHBseVNvdXJjZU1hcCIsImlzQW5ub3RhdGlvbiIsInRvQmFzZTY0Iiwic3RyIiwiQnVmZmVyIiwidG9TdHJpbmciLCJ3aW5kb3ciLCJidG9hIiwidW5lc2NhcGUiLCJlbmNvZGVVUklDb21wb25lbnQiLCJhZGRBbm5vdGF0aW9uIiwiY29udGVudCIsIm91dHB1dEZpbGUiLCJlb2wiLCJ0byIsImdlbmVyYXRlTWFwIiwiZ2VuZXJhdGVTdHJpbmciLCJ0ZXN0IiwicmVzb2x2ZSIsInNlcCIsInJlcGxhY2UiLCJzb3VyY2VQYXRoIiwiU291cmNlTWFwR2VuZXJhdG9yIiwibGluZSIsImNvbHVtbiIsImxpbmVzIiwibGFzdCIsInN0YXJ0IiwiYWRkTWFwcGluZyIsImdlbmVyYXRlZCIsIm9yaWdpbmFsIiwibWF0Y2giLCJsYXN0SW5kZXhPZiIsInAiLCJwYXJlbnQiLCJyYXdzIiwic2VtaWNv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QVFDLGdCQUFBQSxNQUFNLEVBQUVBLE1BQU0sR0FBRztBQUF6QjtBQUhPLGFBQXBCO0FBS0Q7QUFDRjtBQUNGO0FBQ0YsS0FwREQ7QUFxREQsRzs7U0FFRGMsUSxHQUFBLG9CQUFZO0FBQ1YsU0FBS3pELGVBQUw7O0FBRUEsUUFBSSxLQUFLbEIsS0FBTCxFQUFKLEVBQWtCO0FBQ2hCLGFBQU8sS0FBS29ELFdBQUwsRUFBUDtBQUNEOztBQUVELFFBQUl3QixNQUFNLEdBQUcsRUFBYjtBQUNBLFNBQUtqRixTQUFMLENBQWUsS0FBS0MsSUFBcEIsRUFBMEIsVUFBQWtCLENBQUMsRUFBSTtBQUM3QjhELE1BQUFBLE1BQU0sSUFBSTlELENBQVY7QUFDRCxLQUZEO0FBR0EsV0FBTyxDQUFDOEQsTUFBRCxDQUFQO0FBQ0QsRzs7Ozs7ZUFHWWxGLFkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW96aWxsYSBmcm9tICdzb3VyY2UtbWFwJ1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY2xhc3MgTWFwR2VuZXJhdG9yIHtcbiAgY29uc3RydWN0b3IgKHN0cmluZ2lmeSwgcm9vdCwgb3B0cykge1xuICAgIHRoaXMuc3RyaW5naWZ5ID0gc3RyaW5naWZ5XG4gICAgdGhpcy5tYXBPcHRzID0gb3B0cy5tYXAgfHwgeyB9XG4gICAgdGhpcy5yb290ID0gcm9vdFxuICAgIHRoaXMub3B0cyA9IG9wdHNcbiAgfVxuXG4gIGlzTWFwICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMub3B0cy5tYXAgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gISF0aGlzLm9wdHMubWFwXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkubGVuZ3RoID4gMFxuICB9XG5cbiAgcHJldmlvdXMgKCkge1xuICAgIGlmICghdGhpcy5wcmV2aW91c01hcHMpIHtcbiAgICAgIHRoaXMucHJldmlvdXNNYXBzID0gW11cbiAgICAgIHRoaXMucm9vdC53YWxrKG5vZGUgPT4ge1xuICAgICAgICBpZiAobm9kZS5zb3VyY2UgJiYgbm9kZS5zb3VyY2UuaW5wdXQubWFwKSB7XG4gICAgICAgICAgbGV0IG1hcCA9IG5vZGUuc291cmNlLmlucHV0Lm1hcFxuICAgICAgICAgIGlmICh0aGlzLnByZXZpb3VzTWFwcy5pbmRleE9mKG1hcCkgPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzTWFwcy5wdXNoKG1hcClcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMucHJldmlvdXNNYXBzXG4gIH1cblxuICBpc0lubGluZSAoKSB7XG4gICAgaWYgKHR5cGVvZiB0aGlzLm1hcE9wdHMuaW5saW5lICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5pbmxpbmVcbiAgICB9XG5cbiAgICBsZXQgYW5ub3RhdGlvbiA9IHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uXG4gICAgaWYgKHR5cGVvZiBhbm5vdGF0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBhbm5vdGF0aW9uICE9PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcmV2aW91cygpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKGkgPT4gaS5pbmxpbmUpXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpc1NvdXJjZXNDb250ZW50ICgpIHtcbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm1hcE9wdHMuc291cmNlc0NvbnRlbnRcbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkuc29tZShpID0+IGkud2l0aENvbnRlbnQoKSlcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGNsZWFyQW5ub3RhdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICBsZXQgbm9kZVxuICAgIGZvciAobGV0IGkgPSB0aGlzLnJvb3Qubm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIG5vZGUgPSB0aGlzLnJvb3Qubm9kZXNbaV1cbiAgICAgIGlmIChub2RlLnR5cGUgIT09ICdjb21tZW50JykgY29udGludWVcbiAgICAgIGlmIChub2RlLnRleHQuaW5kZXhPZignIyBzb3VyY2VNYXBwaW5nVVJMPScpID09PSAwKSB7XG4gICAgICAgIHRoaXMucm9vdC5yZW1vdmVDaGlsZChpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNldFNvdXJjZXNDb250ZW50ICgpIHtcbiAgICBsZXQgYWxyZWFkeSA9IHsgfVxuICAgIHRoaXMucm9vdC53YWxrKG5vZGUgPT4ge1xuICAgICAgaWYgKG5vZGUuc291cmNlKSB7XG4gICAgICAgIGxldCBmcm9tID0gbm9kZS5zb3VyY2UuaW5wdXQuZnJvbVxuICAgICAgICBpZiAoZnJvbSAmJiAhYWxyZWFkeVtmcm9tXSkge1xuICAgICAgICAgIGFscmVhZHlbZnJvbV0gPSB0cnVlXG4gICAgICAgICAgbGV0IHJlbGF0aXZlID0gdGhpcy5yZWxhdGl2ZShmcm9tKVxuICAgICAgICAgIHRoaXMubWFwLnNldFNvdXJjZUNvbnRlbnQocmVsYXRpdmUsIG5vZGUuc291cmNlLmlucHV0LmNzcylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBhcHBseVByZXZNYXBzICgpIHtcbiAgICBmb3IgKGxldCBwcmV2IG9mIHRoaXMucHJldmlvdXMoKSkge1xuICAgICAgbGV0IGZyb20gPSB0aGlzLnJlbGF0aXZlKHByZXYuZmlsZSlcbiAgICAgIGxldCByb290ID0gcHJldi5yb290IHx8IHBhdGguZGlybmFtZShwcmV2LmZpbGUpXG4gICAgICBsZXQgbWFwXG5cbiAgICAgIGlmICh0aGlzLm1hcE9wdHMuc291cmNlc0NvbnRlbnQgPT09IGZhbHNlKSB7XG4gICAgICAgIG1hcCA9IG5ldyBtb3ppbGxhLlNvdXJjZU1hcENvbnN1bWVyKHByZXYudGV4dClcbiAgICAgICAgaWYgKG1hcC5zb3VyY2VzQ29udGVudCkge1xuICAgICAgICAgIG1hcC5zb3VyY2VzQ29udGVudCA9IG1hcC5zb3VyY2VzQ29udGVudC5tYXAoKCkgPT4gbnVsbClcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWFwID0gcHJldi5jb25zdW1lcigpXG4gICAgICB9XG5cbiAgICAgIHRoaXMubWFwLmFwcGx5U291cmNlTWFwKG1hcCwgZnJvbSwgdGhpcy5yZWxhdGl2ZShyb290KSlcbiAgICB9XG4gIH1cblxuICBpc0Fubm90YXRpb24gKCkge1xuICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGlmICh0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLmFubm90YXRpb25cbiAgICB9XG4gICAgaWYgKHRoaXMucHJldmlvdXMoKS5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkuc29tZShpID0+IGkuYW5ub3RhdGlvbilcbiAgICB9XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHRvQmFzZTY0IChzdHIpIHtcbiAgICBpZiAoQnVmZmVyKSB7XG4gICAgICByZXR1cm4gQnVmZmVyLmZyb20oc3RyKS50b1N0cmluZygnYmFzZTY0JylcbiAgICB9XG4gICAgcmV0dXJuIHdpbmRvdy5idG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChzdHIpKSlcbiAgfVxuXG4gIGFkZEFubm90YXRpb24gKCkge1xuICAgIGxldCBjb250ZW50XG5cbiAgICBpZiAodGhpcy5pc0lubGluZSgpKSB7XG4gICAgICBjb250ZW50ID0gJ2RhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsJyArXG4gICAgICAgICAgICAgICAgdGhpcy50b0Jhc2U2NCh0aGlzLm1hcC50b1N0cmluZygpKVxuICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgY29udGVudCA9IHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRlbnQgPSB0aGlzLm91dHB1dEZpbGUoKSArICcubWFwJ1xuICAgIH1cblxuICAgIGxldCBlb2wgPSAnXFxuJ1xuICAgIGlmICh0aGlzLmNzcy5pbmRleE9mKCdcXHJcXG4nKSAhPT0gLTEpIGVvbCA9ICdcXHJcXG4nXG5cbiAgICB0aGlzLmNzcyArPSBlb2wgKyAnLyojIHNvdXJjZU1hcHBpbmdVUkw9JyArIGNvbnRlbnQgKyAnICovJ1xuICB9XG5cbiAgb3V0cHV0RmlsZSAoKSB7XG4gICAgaWYgKHRoaXMub3B0cy50bykge1xuICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmUodGhpcy5vcHRzLnRvKVxuICAgIH1cbiAgICBpZiAodGhpcy5vcHRzLmZyb20pIHtcbiAgICAgIHJldHVybiB0aGlzLnJlbGF0aXZlKHRoaXMub3B0cy5mcm9tKVxuICAgIH1cbiAgICByZXR1cm4gJ3RvLmNzcydcbiAgfVxuXG4gIGdlbmVyYXRlTWFwICgpIHtcbiAgICB0aGlzLmdlbmVyYXRlU3RyaW5nKClcbiAgICBpZiAodGhpcy5pc1NvdXJjZXNDb250ZW50KCkpIHRoaXMuc2V0U291cmNlc0NvbnRlbnQoKVxuICAgIGlmICh0aGlzLnByZXZpb3VzKCkubGVuZ3RoID4gMCkgdGhpcy5hcHBseVByZXZNYXBzKClcbiAgICBpZiAodGhpcy5pc0Fubm90YXRpb24oKSkgdGhpcy5hZGRBbm5vdGF0aW9uKClcblxuICAgIGlmICh0aGlzLmlzSW5saW5lKCkpIHtcbiAgICAgIHJldHVybiBbdGhpcy5jc3NdXG4gICAgfVxuICAgIHJldHVybiBbdGhpcy5jc3MsIHRoaXMubWFwXVxuICB9XG5cbiAgcmVsYXRpdmUgKGZpbGUpIHtcbiAgICBpZiAoZmlsZS5pbmRleE9mKCc8JykgPT09IDApIHJldHVybiBmaWxlXG4gICAgaWYgKC9eXFx3KzpcXC9cXC8vLnRlc3QoZmlsZSkpIHJldHVybiBmaWxlXG5cbiAgICBsZXQgZnJvbSA9IHRoaXMub3B0cy50byA/IHBhdGguZGlybmFtZSh0aGlzLm9wdHMudG8pIDogJy4nXG5cbiAgICBpZiAodHlwZW9mIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgZnJvbSA9IHBhdGguZGlybmFtZShwYXRoLnJlc29sdmUoZnJvbSwgdGhpcy5tYXBPcHRzLmFubm90YXRpb24pKVxuICAgIH1cblxuICAgIGZpbGUgPSBwYXRoLnJlbGF0aXZlKGZyb20sIGZpbGUpXG4gICAgaWYgKHBhdGguc2VwID09PSAnXFxcXCcpIHtcbiAgICAgIHJldHVybiBmaWxlLnJlcGxhY2UoL1xcXFwvZywgJy8nKVxuICAgIH1cbiAgICByZXR1cm4gZmlsZVxuICB9XG5cbiAgc291cmNlUGF0aCAobm9kZSkge1xuICAgIGlmICh0aGlzLm1hcE9wdHMuZnJvbSkge1xuICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5mcm9tXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbGF0aXZlKG5vZGUuc291cmNlLmlucHV0LmZyb20pXG4gIH1cblxuICBnZW5lcmF0ZVN0cmluZyAoKSB7XG4gICAgdGhpcy5jc3MgPSAnJ1xuICAgIHRoaXMubWFwID0gbmV3IG1vemlsbGEuU291cmNlTWFwR2VuZXJhdG9yKHsgZmlsZTogdGhpcy5vdXRwdXRGaWxlKCkgfSlcblxuICAgIGxldCBsaW5lID0gMVxuICAgIGxldCBjb2x1bW4gPSAxXG5cbiAgICBsZXQgbGluZXMsIGxhc3RcbiAgICB0aGlzLnN0cmluZ2lmeSh0aGlzLnJvb3QsIChzdHIsIG5vZGUsIHR5cGUpID0+IHtcbiAgICAgIHRoaXMuY3NzICs9IHN0clxuXG4gICAgICBpZiAobm9kZSAmJiB0eXBlICE9PSAnZW5kJykge1xuICAgICAgICBpZiAobm9kZS5zb3VyY2UgJiYgbm9kZS5zb3VyY2Uuc3RhcnQpIHtcbiAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKHtcbiAgICAgICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2VQYXRoKG5vZGUpLFxuICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmUsIGNvbHVtbjogY29sdW1uIC0gMSB9LFxuICAgICAgICAgICAgb3JpZ2luYWw6IHtcbiAgICAgICAgICAgICAgbGluZTogbm9kZS5zb3VyY2Uuc3RhcnQubGluZSxcbiAgICAgICAgICAgICAgY29sdW1uOiBub2RlLnNvdXJjZS5zdGFydC5jb2x1bW4gLSAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKHtcbiAgICAgICAgICAgIHNvdXJjZTogJzxubyBzb3VyY2U+JyxcbiAgICAgICAgICAgIG9yaWdpbmFsOiB7IGxpbmU6IDEsIGNvbHVtbjogMCB9LFxuICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmUsIGNvbHVtbjogY29sdW1uIC0gMSB9XG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaW5lcyA9IHN0ci5tYXRjaCgvXFxuL2cpXG4gICAgICBpZiAobGluZXMpIHtcbiAgICAgICAgbGluZSArPSBsaW5lcy5sZW5ndGhcbiAgICAgICAgbGFzdCA9IHN0ci5sYXN0SW5kZXhPZignXFxuJylcbiAgICAgICAgY29sdW1uID0gc3RyLmxlbmd0aCAtIGxhc3RcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbiArPSBzdHIubGVuZ3RoXG4gICAgICB9XG5cbiAgICAgIGlmIChub2RlICYmIHR5cGUgIT09ICdzdGFydCcpIHtcbiAgICAgICAgbGV0IHAgPSBub2RlLnBhcmVudCB8fCB7IHJhd3M6IHsgfSB9XG4gICAgICAgIGlmIChub2RlLnR5cGUgIT09ICdkZWNsJyB8fCBub2RlICE9PSBwLmxhc3QgfHwgcC5yYXdzLnNlbWljb2xvbikge1xuICAgICAgICAgIGlmIChub2RlLnNvdXJjZSAmJiBub2RlLnNvdXJjZS5lbmQpIHtcbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE1hcHBpbmcoe1xuICAgICAgICAgICAgICBzb3VyY2U6IHRoaXMuc291cmNlUGF0aChub2RlKSxcbiAgICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmUsIGNvbHVtbjogY29sdW1uIC0gMiB9LFxuICAgICAgICAgICAgICBvcmlnaW5hbDoge1xuICAgICAgICAgICAgICAgIGxpbmU6IG5vZGUuc291cmNlLmVuZC5saW5lLFxuICAgICAgICAgICAgICAgIGNvbHVtbjogbm9kZS5zb3VyY2UuZW5kLmNvbHVtbiAtIDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyh7XG4gICAgICAgICAgICAgIHNvdXJjZTogJzxubyBzb3VyY2U+JyxcbiAgICAgICAgICAgICAgb3JpZ2luYWw6IHsgbGluZTogMSwgY29sdW1uOiAwIH0sXG4gICAgICAgICAgICAgIGdlbmVyYXRlZDogeyBsaW5lLCBjb2x1bW46IGNvbHVtbiAtIDEgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZ2VuZXJhdGUgKCkge1xuICAgIHRoaXMuY2xlYXJBbm5vdGF0aW9uKClcblxuICAgIGlmICh0aGlzLmlzTWFwKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWFwKClcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gJydcbiAgICB0aGlzLnN0cmluZ2lmeSh0aGlzLnJvb3QsIGkgPT4ge1xuICAgICAgcmVzdWx0ICs9IGlcbiAgICB9KVxuICAgIHJldHVybiBbcmVzdWx0XVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hcEdlbmVyYXRvclxuIl0sImZpbGUiOiJtYXAtZ2VuZXJhdG9yLmpzIn0=


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = warnOnce;
var printed = {};

function warnOnce(message) {
  if (printed[message]) return;
  printed[message] = true;

  if (typeof console !== 'undefined' && console.warn) {
    console.warn(message);
  }
}

module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm4tb25jZS5lczYiXSwibmFtZXMiOlsicHJpbnRlZCIsIndhcm5PbmNlIiwibWVzc2FnZSIsImNvbnNvbGUiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBSUEsT0FBTyxHQUFHLEVBQWQ7O0FBRWUsU0FBU0MsUUFBVCxDQUFtQkMsT0FBbkIsRUFBNEI7QUFDekMsTUFBSUYsT0FBTyxDQUFDRSxPQUFELENBQVgsRUFBc0I7QUFDdEJGLEVBQUFBLE9BQU8sQ0FBQ0UsT0FBRCxDQUFQLEdBQW1CLElBQW5COztBQUVBLE1BQUksT0FBT0MsT0FBUCxLQUFtQixXQUFuQixJQUFrQ0EsT0FBTyxDQUFDQyxJQUE5QyxFQUFvRDtBQUNsREQsSUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWFGLE9BQWI7QUFDRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsibGV0IHByaW50ZWQgPSB7IH1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gd2Fybk9uY2UgKG1lc3NhZ2UpIHtcbiAgaWYgKHByaW50ZWRbbWVzc2FnZV0pIHJldHVyblxuICBwcmludGVkW21lc3NhZ2VdID0gdHJ1ZVxuXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS53YXJuKSB7XG4gICAgY29uc29sZS53YXJuKG1lc3NhZ2UpXG4gIH1cbn1cbiJdLCJmaWxlIjoid2Fybi1vbmNlLmpzIn0=


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _warning = _interopRequireDefault(__webpack_require__(44));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Provides the result of the PostCSS transformations.
 *
 * A Result instance is returned by {@link LazyResult#then}
 * or {@link Root#toResult} methods.
 *
 * @example
 * postcss([autoprefixer]).process(css).then(result => {
 *  console.log(result.css)
 * })
 *
 * @example
 * const result2 = postcss.parse(css).toResult()
 */
var Result =
/*#__PURE__*/
function () {
  /**
   * @param {Processor} processor Processor used for this transformation.
   * @param {Root}      root      Root node after all transformations.
   * @param {processOptions} opts Options from the {@link Processor#process}
   *                              or {@link Root#toResult}.
   */
  function Result(processor, root, opts) {
    /**
     * The Processor instance used for this transformation.
     *
     * @type {Processor}
     *
     * @example
     * for (const plugin of result.processor.plugins) {
     *   if (plugin.postcssPlugin === 'postcss-bad') {
     *     throw 'postcss-good is incompatible with postcss-bad'
     *   }
     * })
     */
    this.processor = processor;
    /**
     * Contains messages from plugins (e.g., warnings or custom messages).
     * Each message should have type and plugin properties.
     *
     * @type {Message[]}
     *
     * @example
     * postcss.plugin('postcss-min-browser', () => {
     *   return (root, result) => {
     *     const browsers = detectMinBrowsersByCanIUse(root)
     *     result.messages.push({
     *       type: 'min-browser',
     *       plugin: 'postcss-min-browser',
     *       browsers
     *     })
     *   }
     * })
     */

    this.messages = [];
    /**
     * Root node after all transformations.
     *
     * @type {Root}
     *
     * @example
     * root.toResult().root === root
     */

    this.root = root;
    /**
     * Options from the {@link Processor#process} or {@link Root#toResult} call
     * that produced this Result instance.
     *
     * @type {processOptions}
     *
     * @example
     * root.toResult(opts).opts === opts
     */

    this.opts = opts;
    /**
     * A CSS string representing of {@link Result#root}.
     *
     * @type {string}
     *
     * @example
     * postcss.parse('a{}').toResult().css //=> "a{}"
     */

    this.css = undefined;
    /**
     * An instance of `SourceMapGenerator` class from the `source-map` library,
     * representing changes to the {@link Result#root} instance.
     *
     * @type {SourceMapGenerator}
     *
     * @example
     * result.map.toJSON() //=> { version: 3, file: 'a.css', … }
     *
     * @example
     * if (result.map) {
     *   fs.writeFileSync(result.opts.to + '.map', result.map.toString())
     * }
     */

    this.map = undefined;
  }
  /**
   * Returns for @{link Result#css} content.
   *
   * @example
   * result + '' === result.css
   *
   * @return {string} String representing of {@link Result#root}.
   */


  var _proto = Result.prototype;

  _proto.toString = function toString() {
    return this.css;
  }
  /**
   * Creates an instance of {@link Warning} and adds it
   * to {@link Result#messages}.
   *
   * @param {string} text        Warning message.
   * @param {Object} [opts]      Warning options.
   * @param {Node}   opts.node   CSS node that caused the warning.
   * @param {string} opts.word   Word in CSS source that caused the warning.
   * @param {number} opts.index  Index in CSS node string that caused
   *                             the warning.
   * @param {string} opts.plugin Name of the plugin that created
   *                             this warning. {@link Result#warn} fills
   *                             this property automatically.
   *
   * @return {Warning} Created warning.
   */
  ;

  _proto.warn = function warn(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin;
      }
    }

    var warning = new _warning.default(text, opts);
    this.messages.push(warning);
    return warning;
  }
  /**
     * Returns warnings from plugins. Filters {@link Warning} instances
     * from {@link Result#messages}.
     *
     * @example
     * result.warnings().forEach(warn => {
     *   console.warn(warn.toString())
     * })
     *
     * @return {Warning[]} Warnings from plugins.
     */
  ;

  _proto.warnings = function warnings() {
    return this.messages.filter(function (i) {
      return i.type === 'warning';
    });
  }
  /**
   * An alias for the {@link Result#css} property.
   * Use it with syntaxes that generate non-CSS output.
   *
   * @type {string}
   *
   * @example
   * result.css === result.content
   */
  ;

  _createClass(Result, [{
    key: "content",
    get: function get() {
      return this.css;
    }
  }]);

  return Result;
}();

var _default = Result;
/**
 * @typedef  {object} Message
 * @property {string} type   Message type.
 * @property {string} plugin Source PostCSS plugin name.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5lczYiXSwibmFtZXMiOlsiUmVzdWx0IiwicHJvY2Vzc29yIiwicm9vdCIsIm9wdHMiLCJtZXNzYWdlcyIsImNzcyIsInVuZGVmaW5lZCIsIm1hcCIsInRvU3RyaW5nIiwid2FybiIsInRleHQiLCJwbHVnaW4iLCJsYXN0UGx1Z2luIiwicG9zdGNzc1BsdWdpbiIsIndhcm5pbmciLCJXYXJuaW5nIiwicHVzaCIsIndhcm5pbmdzIiwiZmlsdGVyIiwiaSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0lBY01BLE07OztBQUNKOzs7Ozs7QUFNQSxrQkFBYUMsU0FBYixFQUF3QkMsSUFBeEIsRUFBOEJDLElBQTlCLEVBQW9DO0FBQ2xDOzs7Ozs7Ozs7Ozs7QUFZQSxTQUFLRixTQUFMLEdBQWlCQSxTQUFqQjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLFNBQUtHLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQTs7Ozs7Ozs7O0FBUUEsU0FBS0YsSUFBTCxHQUFZQSxJQUFaO0FBQ0E7Ozs7Ozs7Ozs7QUFTQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQTs7Ozs7Ozs7O0FBUUEsU0FBS0UsR0FBTCxHQUFXQyxTQUFYO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQWNBLFNBQUtDLEdBQUwsR0FBV0QsU0FBWDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7OztTQVFBRSxRLEdBQUEsb0JBQVk7QUFDVixXQUFPLEtBQUtILEdBQVo7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQkFJLEksR0FBQSxjQUFNQyxJQUFOLEVBQVlQLElBQVosRUFBd0I7QUFBQSxRQUFaQSxJQUFZO0FBQVpBLE1BQUFBLElBQVksR0FBTCxFQUFLO0FBQUE7O0FBQ3RCLFFBQUksQ0FBQ0EsSUFBSSxDQUFDUSxNQUFWLEVBQWtCO0FBQ2hCLFVBQUksS0FBS0MsVUFBTCxJQUFtQixLQUFLQSxVQUFMLENBQWdCQyxhQUF2QyxFQUFzRDtBQUNwRFYsUUFBQUEsSUFBSSxDQUFDUSxNQUFMLEdBQWMsS0FBS0MsVUFBTCxDQUFnQkMsYUFBOUI7QUFDRDtBQUNGOztBQUVELFFBQUlDLE9BQU8sR0FBRyxJQUFJQyxnQkFBSixDQUFZTCxJQUFaLEVBQWtCUCxJQUFsQixDQUFkO0FBQ0EsU0FBS0MsUUFBTCxDQUFjWSxJQUFkLENBQW1CRixPQUFuQjtBQUVBLFdBQU9BLE9BQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs7O1NBV0FHLFEsR0FBQSxvQkFBWTtBQUNWLFdBQU8sS0FBS2IsUUFBTCxDQUFjYyxNQUFkLENBQXFCLFVBQUFDLENBQUM7QUFBQSxhQUFJQSxDQUFDLENBQUNDLElBQUYsS0FBVyxTQUFmO0FBQUEsS0FBdEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7d0JBU2U7QUFDYixhQUFPLEtBQUtmLEdBQVo7QUFDRDs7Ozs7O2VBR1lMLE07QUFFZiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBXYXJuaW5nIGZyb20gJy4vd2FybmluZydcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgcmVzdWx0IG9mIHRoZSBQb3N0Q1NTIHRyYW5zZm9ybWF0aW9ucy5cbiAqXG4gKiBBIFJlc3VsdCBpbnN0YW5jZSBpcyByZXR1cm5lZCBieSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufVxuICogb3Ige0BsaW5rIFJvb3QjdG9SZXN1bHR9IG1ldGhvZHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MoW2F1dG9wcmVmaXhlcl0pLnByb2Nlc3MoY3NzKS50aGVuKHJlc3VsdCA9PiB7XG4gKiAgY29uc29sZS5sb2cocmVzdWx0LmNzcylcbiAqIH0pXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlc3VsdDIgPSBwb3N0Y3NzLnBhcnNlKGNzcykudG9SZXN1bHQoKVxuICovXG5jbGFzcyBSZXN1bHQge1xuICAvKipcbiAgICogQHBhcmFtIHtQcm9jZXNzb3J9IHByb2Nlc3NvciBQcm9jZXNzb3IgdXNlZCBmb3IgdGhpcyB0cmFuc2Zvcm1hdGlvbi5cbiAgICogQHBhcmFtIHtSb290fSAgICAgIHJvb3QgICAgICBSb290IG5vZGUgYWZ0ZXIgYWxsIHRyYW5zZm9ybWF0aW9ucy5cbiAgICogQHBhcmFtIHtwcm9jZXNzT3B0aW9uc30gb3B0cyBPcHRpb25zIGZyb20gdGhlIHtAbGluayBQcm9jZXNzb3IjcHJvY2Vzc31cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciB7QGxpbmsgUm9vdCN0b1Jlc3VsdH0uXG4gICAqL1xuICBjb25zdHJ1Y3RvciAocHJvY2Vzc29yLCByb290LCBvcHRzKSB7XG4gICAgLyoqXG4gICAgICogVGhlIFByb2Nlc3NvciBpbnN0YW5jZSB1c2VkIGZvciB0aGlzIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqXG4gICAgICogQHR5cGUge1Byb2Nlc3Nvcn1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogZm9yIChjb25zdCBwbHVnaW4gb2YgcmVzdWx0LnByb2Nlc3Nvci5wbHVnaW5zKSB7XG4gICAgICogICBpZiAocGx1Z2luLnBvc3Rjc3NQbHVnaW4gPT09ICdwb3N0Y3NzLWJhZCcpIHtcbiAgICAgKiAgICAgdGhyb3cgJ3Bvc3Rjc3MtZ29vZCBpcyBpbmNvbXBhdGlibGUgd2l0aCBwb3N0Y3NzLWJhZCdcbiAgICAgKiAgIH1cbiAgICAgKiB9KVxuICAgICAqL1xuICAgIHRoaXMucHJvY2Vzc29yID0gcHJvY2Vzc29yXG4gICAgLyoqXG4gICAgICogQ29udGFpbnMgbWVzc2FnZXMgZnJvbSBwbHVnaW5zIChlLmcuLCB3YXJuaW5ncyBvciBjdXN0b20gbWVzc2FnZXMpLlxuICAgICAqIEVhY2ggbWVzc2FnZSBzaG91bGQgaGF2ZSB0eXBlIGFuZCBwbHVnaW4gcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtNZXNzYWdlW119XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLW1pbi1icm93c2VyJywgKCkgPT4ge1xuICAgICAqICAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICAgKiAgICAgY29uc3QgYnJvd3NlcnMgPSBkZXRlY3RNaW5Ccm93c2Vyc0J5Q2FuSVVzZShyb290KVxuICAgICAqICAgICByZXN1bHQubWVzc2FnZXMucHVzaCh7XG4gICAgICogICAgICAgdHlwZTogJ21pbi1icm93c2VyJyxcbiAgICAgKiAgICAgICBwbHVnaW46ICdwb3N0Y3NzLW1pbi1icm93c2VyJyxcbiAgICAgKiAgICAgICBicm93c2Vyc1xuICAgICAqICAgICB9KVxuICAgICAqICAgfVxuICAgICAqIH0pXG4gICAgICovXG4gICAgdGhpcy5tZXNzYWdlcyA9IFtdXG4gICAgLyoqXG4gICAgICogUm9vdCBub2RlIGFmdGVyIGFsbCB0cmFuc2Zvcm1hdGlvbnMuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Um9vdH1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcm9vdC50b1Jlc3VsdCgpLnJvb3QgPT09IHJvb3RcbiAgICAgKi9cbiAgICB0aGlzLnJvb3QgPSByb290XG4gICAgLyoqXG4gICAgICogT3B0aW9ucyBmcm9tIHRoZSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9IG9yIHtAbGluayBSb290I3RvUmVzdWx0fSBjYWxsXG4gICAgICogdGhhdCBwcm9kdWNlZCB0aGlzIFJlc3VsdCBpbnN0YW5jZS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtwcm9jZXNzT3B0aW9uc31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcm9vdC50b1Jlc3VsdChvcHRzKS5vcHRzID09PSBvcHRzXG4gICAgICovXG4gICAgdGhpcy5vcHRzID0gb3B0c1xuICAgIC8qKlxuICAgICAqIEEgQ1NTIHN0cmluZyByZXByZXNlbnRpbmcgb2Yge0BsaW5rIFJlc3VsdCNyb290fS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MucGFyc2UoJ2F7fScpLnRvUmVzdWx0KCkuY3NzIC8vPT4gXCJhe31cIlxuICAgICAqL1xuICAgIHRoaXMuY3NzID0gdW5kZWZpbmVkXG4gICAgLyoqXG4gICAgICogQW4gaW5zdGFuY2Ugb2YgYFNvdXJjZU1hcEdlbmVyYXRvcmAgY2xhc3MgZnJvbSB0aGUgYHNvdXJjZS1tYXBgIGxpYnJhcnksXG4gICAgICogcmVwcmVzZW50aW5nIGNoYW5nZXMgdG8gdGhlIHtAbGluayBSZXN1bHQjcm9vdH0gaW5zdGFuY2UuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7U291cmNlTWFwR2VuZXJhdG9yfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByZXN1bHQubWFwLnRvSlNPTigpIC8vPT4geyB2ZXJzaW9uOiAzLCBmaWxlOiAnYS5jc3MnLCDigKYgfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAocmVzdWx0Lm1hcCkge1xuICAgICAqICAgZnMud3JpdGVGaWxlU3luYyhyZXN1bHQub3B0cy50byArICcubWFwJywgcmVzdWx0Lm1hcC50b1N0cmluZygpKVxuICAgICAqIH1cbiAgICAgKi9cbiAgICB0aGlzLm1hcCA9IHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgZm9yIEB7bGluayBSZXN1bHQjY3NzfSBjb250ZW50LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByZXN1bHQgKyAnJyA9PT0gcmVzdWx0LmNzc1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFN0cmluZyByZXByZXNlbnRpbmcgb2Yge0BsaW5rIFJlc3VsdCNyb290fS5cbiAgICovXG4gIHRvU3RyaW5nICgpIHtcbiAgICByZXR1cm4gdGhpcy5jc3NcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHtAbGluayBXYXJuaW5nfSBhbmQgYWRkcyBpdFxuICAgKiB0byB7QGxpbmsgUmVzdWx0I21lc3NhZ2VzfS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHRleHQgICAgICAgIFdhcm5pbmcgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRzXSAgICAgIFdhcm5pbmcgb3B0aW9ucy5cbiAgICogQHBhcmFtIHtOb2RlfSAgIG9wdHMubm9kZSAgIENTUyBub2RlIHRoYXQgY2F1c2VkIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy53b3JkICAgV29yZCBpbiBDU1Mgc291cmNlIHRoYXQgY2F1c2VkIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0cy5pbmRleCAgSW5kZXggaW4gQ1NTIG5vZGUgc3RyaW5nIHRoYXQgY2F1c2VkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgd2FybmluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMucGx1Z2luIE5hbWUgb2YgdGhlIHBsdWdpbiB0aGF0IGNyZWF0ZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgd2FybmluZy4ge0BsaW5rIFJlc3VsdCN3YXJufSBmaWxsc1xuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyBwcm9wZXJ0eSBhdXRvbWF0aWNhbGx5LlxuICAgKlxuICAgKiBAcmV0dXJuIHtXYXJuaW5nfSBDcmVhdGVkIHdhcm5pbmcuXG4gICAqL1xuICB3YXJuICh0ZXh0LCBvcHRzID0geyB9KSB7XG4gICAgaWYgKCFvcHRzLnBsdWdpbikge1xuICAgICAgaWYgKHRoaXMubGFzdFBsdWdpbiAmJiB0aGlzLmxhc3RQbHVnaW4ucG9zdGNzc1BsdWdpbikge1xuICAgICAgICBvcHRzLnBsdWdpbiA9IHRoaXMubGFzdFBsdWdpbi5wb3N0Y3NzUGx1Z2luXG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHdhcm5pbmcgPSBuZXcgV2FybmluZyh0ZXh0LCBvcHRzKVxuICAgIHRoaXMubWVzc2FnZXMucHVzaCh3YXJuaW5nKVxuXG4gICAgcmV0dXJuIHdhcm5pbmdcbiAgfVxuXG4gIC8qKlxuICAgICAqIFJldHVybnMgd2FybmluZ3MgZnJvbSBwbHVnaW5zLiBGaWx0ZXJzIHtAbGluayBXYXJuaW5nfSBpbnN0YW5jZXNcbiAgICAgKiBmcm9tIHtAbGluayBSZXN1bHQjbWVzc2FnZXN9LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByZXN1bHQud2FybmluZ3MoKS5mb3JFYWNoKHdhcm4gPT4ge1xuICAgICAqICAgY29uc29sZS53YXJuKHdhcm4udG9TdHJpbmcoKSlcbiAgICAgKiB9KVxuICAgICAqXG4gICAgICogQHJldHVybiB7V2FybmluZ1tdfSBXYXJuaW5ncyBmcm9tIHBsdWdpbnMuXG4gICAgICovXG4gIHdhcm5pbmdzICgpIHtcbiAgICByZXR1cm4gdGhpcy5tZXNzYWdlcy5maWx0ZXIoaSA9PiBpLnR5cGUgPT09ICd3YXJuaW5nJylcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBhbGlhcyBmb3IgdGhlIHtAbGluayBSZXN1bHQjY3NzfSBwcm9wZXJ0eS5cbiAgICogVXNlIGl0IHdpdGggc3ludGF4ZXMgdGhhdCBnZW5lcmF0ZSBub24tQ1NTIG91dHB1dC5cbiAgICpcbiAgICogQHR5cGUge3N0cmluZ31cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcmVzdWx0LmNzcyA9PT0gcmVzdWx0LmNvbnRlbnRcbiAgICovXG4gIGdldCBjb250ZW50ICgpIHtcbiAgICByZXR1cm4gdGhpcy5jc3NcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSZXN1bHRcblxuLyoqXG4gKiBAdHlwZWRlZiAge29iamVjdH0gTWVzc2FnZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IHR5cGUgICBNZXNzYWdlIHR5cGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGx1Z2luIFNvdXJjZSBQb3N0Q1NTIHBsdWdpbiBuYW1lLlxuICovXG4iXSwiZmlsZSI6InJlc3VsdC5qcyJ9


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Represents a plugin’s warning. It can be created using {@link Node#warn}.
 *
 * @example
 * if (decl.important) {
 *   decl.warn(result, 'Avoid !important', { word: '!important' })
 * }
 */
var Warning =
/*#__PURE__*/
function () {
  /**
   * @param {string} text        Warning message.
   * @param {Object} [opts]      Warning options.
   * @param {Node}   opts.node   CSS node that caused the warning.
   * @param {string} opts.word   Word in CSS source that caused the warning.
   * @param {number} opts.index  Index in CSS node string that caused
   *                             the warning.
   * @param {string} opts.plugin Name of the plugin that created
   *                             this warning. {@link Result#warn} fills
   *                             this property automatically.
   */
  function Warning(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    /**
     * Type to filter warnings from {@link Result#messages}.
     * Always equal to `"warning"`.
     *
     * @type {string}
     *
     * @example
     * const nonWarning = result.messages.filter(i => i.type !== 'warning')
     */
    this.type = 'warning';
    /**
     * The warning message.
     *
     * @type {string}
     *
     * @example
     * warning.text //=> 'Try to avoid !important'
     */

    this.text = text;

    if (opts.node && opts.node.source) {
      var pos = opts.node.positionBy(opts);
      /**
       * Line in the input file with this warning’s source.
       * @type {number}
       *
       * @example
       * warning.line //=> 5
       */

      this.line = pos.line;
      /**
       * Column in the input file with this warning’s source.
       *
       * @type {number}
       *
       * @example
       * warning.column //=> 6
       */

      this.column = pos.column;
    }

    for (var opt in opts) {
      this[opt] = opts[opt];
    }
  }
  /**
   * Returns a warning position and message.
   *
   * @example
   * warning.toString() //=> 'postcss-lint:a.css:10:14: Avoid !important'
   *
   * @return {string} Warning position and message.
   */


  var _proto = Warning.prototype;

  _proto.toString = function toString() {
    if (this.node) {
      return this.node.error(this.text, {
        plugin: this.plugin,
        index: this.index,
        word: this.word
      }).message;
    }

    if (this.plugin) {
      return this.plugin + ': ' + this.text;
    }

    return this.text;
  }
  /**
   * @memberof Warning#
   * @member {string} plugin The name of the plugin that created
   *                         it will fill this property automatically.
   *                         this warning. When you call {@link Node#warn}
   *
   * @example
   * warning.plugin //=> 'postcss-important'
   */

  /**
   * @memberof Warning#
   * @member {Node} node Contains the CSS node that caused the warning.
   *
   * @example
   * warning.node.toString() //=> 'color: white !important'
   */
  ;

  return Warning;
}();

var _default = Warning;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmcuZXM2Il0sIm5hbWVzIjpbIldhcm5pbmciLCJ0ZXh0Iiwib3B0cyIsInR5cGUiLCJub2RlIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImxpbmUiLCJjb2x1bW4iLCJvcHQiLCJ0b1N0cmluZyIsImVycm9yIiwicGx1Z2luIiwiaW5kZXgiLCJ3b3JkIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7SUFRTUEsTzs7O0FBQ0o7Ozs7Ozs7Ozs7O0FBV0EsbUJBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQStCO0FBQUEsUUFBWkEsSUFBWTtBQUFaQSxNQUFBQSxJQUFZLEdBQUwsRUFBSztBQUFBOztBQUM3Qjs7Ozs7Ozs7O0FBU0EsU0FBS0MsSUFBTCxHQUFZLFNBQVo7QUFDQTs7Ozs7Ozs7O0FBUUEsU0FBS0YsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFFBQUlDLElBQUksQ0FBQ0UsSUFBTCxJQUFhRixJQUFJLENBQUNFLElBQUwsQ0FBVUMsTUFBM0IsRUFBbUM7QUFDakMsVUFBSUMsR0FBRyxHQUFHSixJQUFJLENBQUNFLElBQUwsQ0FBVUcsVUFBVixDQUFxQkwsSUFBckIsQ0FBVjtBQUNBOzs7Ozs7OztBQU9BLFdBQUtNLElBQUwsR0FBWUYsR0FBRyxDQUFDRSxJQUFoQjtBQUNBOzs7Ozs7Ozs7QUFRQSxXQUFLQyxNQUFMLEdBQWNILEdBQUcsQ0FBQ0csTUFBbEI7QUFDRDs7QUFFRCxTQUFLLElBQUlDLEdBQVQsSUFBZ0JSLElBQWhCO0FBQXNCLFdBQUtRLEdBQUwsSUFBWVIsSUFBSSxDQUFDUSxHQUFELENBQWhCO0FBQXRCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7O1NBUUFDLFEsR0FBQSxvQkFBWTtBQUNWLFFBQUksS0FBS1AsSUFBVCxFQUFlO0FBQ2IsYUFBTyxLQUFLQSxJQUFMLENBQVVRLEtBQVYsQ0FBZ0IsS0FBS1gsSUFBckIsRUFBMkI7QUFDaENZLFFBQUFBLE1BQU0sRUFBRSxLQUFLQSxNQURtQjtBQUVoQ0MsUUFBQUEsS0FBSyxFQUFFLEtBQUtBLEtBRm9CO0FBR2hDQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0E7QUFIcUIsT0FBM0IsRUFJSkMsT0FKSDtBQUtEOztBQUVELFFBQUksS0FBS0gsTUFBVCxFQUFpQjtBQUNmLGFBQU8sS0FBS0EsTUFBTCxHQUFjLElBQWQsR0FBcUIsS0FBS1osSUFBakM7QUFDRDs7QUFFRCxXQUFPLEtBQUtBLElBQVo7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7OztlQVNhRCxPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXByZXNlbnRzIGEgcGx1Z2lu4oCZcyB3YXJuaW5nLiBJdCBjYW4gYmUgY3JlYXRlZCB1c2luZyB7QGxpbmsgTm9kZSN3YXJufS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaWYgKGRlY2wuaW1wb3J0YW50KSB7XG4gKiAgIGRlY2wud2FybihyZXN1bHQsICdBdm9pZCAhaW1wb3J0YW50JywgeyB3b3JkOiAnIWltcG9ydGFudCcgfSlcbiAqIH1cbiAqL1xuY2xhc3MgV2FybmluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICAgICAgV2FybmluZyBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdICAgICAgV2FybmluZyBvcHRpb25zLlxuICAgKiBAcGFyYW0ge05vZGV9ICAgb3B0cy5ub2RlICAgQ1NTIG5vZGUgdGhhdCBjYXVzZWQgdGhlIHdhcm5pbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICBXb3JkIGluIENTUyBzb3VyY2UgdGhhdCBjYXVzZWQgdGhlIHdhcm5pbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICBJbmRleCBpbiBDU1Mgbm9kZSBzdHJpbmcgdGhhdCBjYXVzZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wbHVnaW4gTmFtZSBvZiB0aGUgcGx1Z2luIHRoYXQgY3JlYXRlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyB3YXJuaW5nLiB7QGxpbmsgUmVzdWx0I3dhcm59IGZpbGxzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHByb3BlcnR5IGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAodGV4dCwgb3B0cyA9IHsgfSkge1xuICAgIC8qKlxuICAgICAqIFR5cGUgdG8gZmlsdGVyIHdhcm5pbmdzIGZyb20ge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAgICogQWx3YXlzIGVxdWFsIHRvIGBcIndhcm5pbmdcImAuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBub25XYXJuaW5nID0gcmVzdWx0Lm1lc3NhZ2VzLmZpbHRlcihpID0+IGkudHlwZSAhPT0gJ3dhcm5pbmcnKVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9ICd3YXJuaW5nJ1xuICAgIC8qKlxuICAgICAqIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB3YXJuaW5nLnRleHQgLy89PiAnVHJ5IHRvIGF2b2lkICFpbXBvcnRhbnQnXG4gICAgICovXG4gICAgdGhpcy50ZXh0ID0gdGV4dFxuXG4gICAgaWYgKG9wdHMubm9kZSAmJiBvcHRzLm5vZGUuc291cmNlKSB7XG4gICAgICBsZXQgcG9zID0gb3B0cy5ub2RlLnBvc2l0aW9uQnkob3B0cylcbiAgICAgIC8qKlxuICAgICAgICogTGluZSBpbiB0aGUgaW5wdXQgZmlsZSB3aXRoIHRoaXMgd2FybmluZ+KAmXMgc291cmNlLlxuICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogd2FybmluZy5saW5lIC8vPT4gNVxuICAgICAgICovXG4gICAgICB0aGlzLmxpbmUgPSBwb3MubGluZVxuICAgICAgLyoqXG4gICAgICAgKiBDb2x1bW4gaW4gdGhlIGlucHV0IGZpbGUgd2l0aCB0aGlzIHdhcm5pbmfigJlzIHNvdXJjZS5cbiAgICAgICAqXG4gICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiB3YXJuaW5nLmNvbHVtbiAvLz0+IDZcbiAgICAgICAqL1xuICAgICAgdGhpcy5jb2x1bW4gPSBwb3MuY29sdW1uXG4gICAgfVxuXG4gICAgZm9yIChsZXQgb3B0IGluIG9wdHMpIHRoaXNbb3B0XSA9IG9wdHNbb3B0XVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB3YXJuaW5nIHBvc2l0aW9uIGFuZCBtZXNzYWdlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB3YXJuaW5nLnRvU3RyaW5nKCkgLy89PiAncG9zdGNzcy1saW50OmEuY3NzOjEwOjE0OiBBdm9pZCAhaW1wb3J0YW50J1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFdhcm5pbmcgcG9zaXRpb24gYW5kIG1lc3NhZ2UuXG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5lcnJvcih0aGlzLnRleHQsIHtcbiAgICAgICAgcGx1Z2luOiB0aGlzLnBsdWdpbixcbiAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgIHdvcmQ6IHRoaXMud29yZFxuICAgICAgfSkubWVzc2FnZVxuICAgIH1cblxuICAgIGlmICh0aGlzLnBsdWdpbikge1xuICAgICAgcmV0dXJuIHRoaXMucGx1Z2luICsgJzogJyArIHRoaXMudGV4dFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRleHRcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2FybmluZyNcbiAgICogQG1lbWJlciB7c3RyaW5nfSBwbHVnaW4gVGhlIG5hbWUgb2YgdGhlIHBsdWdpbiB0aGF0IGNyZWF0ZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgaXQgd2lsbCBmaWxsIHRoaXMgcHJvcGVydHkgYXV0b21hdGljYWxseS5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyB3YXJuaW5nLiBXaGVuIHlvdSBjYWxsIHtAbGluayBOb2RlI3dhcm59XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHdhcm5pbmcucGx1Z2luIC8vPT4gJ3Bvc3Rjc3MtaW1wb3J0YW50J1xuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdhcm5pbmcjXG4gICAqIEBtZW1iZXIge05vZGV9IG5vZGUgQ29udGFpbnMgdGhlIENTUyBub2RlIHRoYXQgY2F1c2VkIHRoZSB3YXJuaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB3YXJuaW5nLm5vZGUudG9TdHJpbmcoKSAvLz0+ICdjb2xvcjogd2hpdGUgIWltcG9ydGFudCdcbiAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhcm5pbmdcbiJdLCJmaWxlIjoid2FybmluZy5qcyJ9


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _parser = _interopRequireDefault(__webpack_require__(46));

var _input = _interopRequireDefault(__webpack_require__(22));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(css, opts) {
  var input = new _input.default(css, opts);
  var parser = new _parser.default(input);

  try {
    parser.parse();
  } catch (e) {
    if (true) {
      if (e.name === 'CssSyntaxError' && opts && opts.from) {
        if (/\.scss$/i.test(opts.from)) {
          e.message += '\nYou tried to parse SCSS with ' + 'the standard CSS parser; ' + 'try again with the postcss-scss parser';
        } else if (/\.sass/i.test(opts.from)) {
          e.message += '\nYou tried to parse Sass with ' + 'the standard CSS parser; ' + 'try again with the postcss-sass parser';
        } else if (/\.less$/i.test(opts.from)) {
          e.message += '\nYou tried to parse Less with ' + 'the standard CSS parser; ' + 'try again with the postcss-less parser';
        }
      }
    }

    throw e;
  }

  return parser.root;
}

var _default = parse;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmVzNiJdLCJuYW1lcyI6WyJwYXJzZSIsImNzcyIsIm9wdHMiLCJpbnB1dCIsIklucHV0IiwicGFyc2VyIiwiUGFyc2VyIiwiZSIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIm5hbWUiLCJmcm9tIiwidGVzdCIsIm1lc3NhZ2UiLCJyb290Il0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7O0FBRUEsU0FBU0EsS0FBVCxDQUFnQkMsR0FBaEIsRUFBcUJDLElBQXJCLEVBQTJCO0FBQ3pCLE1BQUlDLEtBQUssR0FBRyxJQUFJQyxjQUFKLENBQVVILEdBQVYsRUFBZUMsSUFBZixDQUFaO0FBQ0EsTUFBSUcsTUFBTSxHQUFHLElBQUlDLGVBQUosQ0FBV0gsS0FBWCxDQUFiOztBQUNBLE1BQUk7QUFDRkUsSUFBQUEsTUFBTSxDQUFDTCxLQUFQO0FBQ0QsR0FGRCxDQUVFLE9BQU9PLENBQVAsRUFBVTtBQUNWLFFBQUlDLE9BQU8sQ0FBQ0MsR0FBUixDQUFZQyxRQUFaLEtBQXlCLFlBQTdCLEVBQTJDO0FBQ3pDLFVBQUlILENBQUMsQ0FBQ0ksSUFBRixLQUFXLGdCQUFYLElBQStCVCxJQUEvQixJQUF1Q0EsSUFBSSxDQUFDVSxJQUFoRCxFQUFzRDtBQUNwRCxZQUFJLFdBQVdDLElBQVgsQ0FBZ0JYLElBQUksQ0FBQ1UsSUFBckIsQ0FBSixFQUFnQztBQUM5QkwsVUFBQUEsQ0FBQyxDQUFDTyxPQUFGLElBQWEsb0NBQ0EsMkJBREEsR0FFQSx3Q0FGYjtBQUdELFNBSkQsTUFJTyxJQUFJLFVBQVVELElBQVYsQ0FBZVgsSUFBSSxDQUFDVSxJQUFwQixDQUFKLEVBQStCO0FBQ3BDTCxVQUFBQSxDQUFDLENBQUNPLE9BQUYsSUFBYSxvQ0FDQSwyQkFEQSxHQUVBLHdDQUZiO0FBR0QsU0FKTSxNQUlBLElBQUksV0FBV0QsSUFBWCxDQUFnQlgsSUFBSSxDQUFDVSxJQUFyQixDQUFKLEVBQWdDO0FBQ3JDTCxVQUFBQSxDQUFDLENBQUNPLE9BQUYsSUFBYSxvQ0FDQSwyQkFEQSxHQUVBLHdDQUZiO0FBR0Q7QUFDRjtBQUNGOztBQUNELFVBQU1QLENBQU47QUFDRDs7QUFFRCxTQUFPRixNQUFNLENBQUNVLElBQWQ7QUFDRDs7ZUFFY2YsSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQYXJzZXIgZnJvbSAnLi9wYXJzZXInXG5pbXBvcnQgSW5wdXQgZnJvbSAnLi9pbnB1dCdcblxuZnVuY3Rpb24gcGFyc2UgKGNzcywgb3B0cykge1xuICBsZXQgaW5wdXQgPSBuZXcgSW5wdXQoY3NzLCBvcHRzKVxuICBsZXQgcGFyc2VyID0gbmV3IFBhcnNlcihpbnB1dClcbiAgdHJ5IHtcbiAgICBwYXJzZXIucGFyc2UoKVxuICB9IGNhdGNoIChlKSB7XG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChlLm5hbWUgPT09ICdDc3NTeW50YXhFcnJvcicgJiYgb3B0cyAmJiBvcHRzLmZyb20pIHtcbiAgICAgICAgaWYgKC9cXC5zY3NzJC9pLnRlc3Qob3B0cy5mcm9tKSkge1xuICAgICAgICAgIGUubWVzc2FnZSArPSAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIFNDU1Mgd2l0aCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLXNjc3MgcGFyc2VyJ1xuICAgICAgICB9IGVsc2UgaWYgKC9cXC5zYXNzL2kudGVzdChvcHRzLmZyb20pKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU2FzcyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2FzcyBwYXJzZXInXG4gICAgICAgIH0gZWxzZSBpZiAoL1xcLmxlc3MkL2kudGVzdChvcHRzLmZyb20pKSB7XG4gICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgTGVzcyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3MtbGVzcyBwYXJzZXInXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgZVxuICB9XG5cbiAgcmV0dXJuIHBhcnNlci5yb290XG59XG5cbmV4cG9ydCBkZWZhdWx0IHBhcnNlXG4iXSwiZmlsZSI6InBhcnNlLmpzIn0=


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _declaration = _interopRequireDefault(__webpack_require__(4));

var _tokenize = _interopRequireDefault(__webpack_require__(21));

var _comment = _interopRequireDefault(__webpack_require__(47));

var _atRule = _interopRequireDefault(__webpack_require__(48));

var _root = _interopRequireDefault(__webpack_require__(52));

var _rule = _interopRequireDefault(__webpack_require__(50));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser =
/*#__PURE__*/
function () {
  function Parser(input) {
    this.input = input;
    this.root = new _root.default();
    this.current = this.root;
    this.spaces = '';
    this.semicolon = false;
    this.createTokenizer();
    this.root.source = {
      input: input,
      start: {
        line: 1,
        column: 1
      }
    };
  }

  var _proto = Parser.prototype;

  _proto.createTokenizer = function createTokenizer() {
    this.tokenizer = (0, _tokenize.default)(this.input);
  };

  _proto.parse = function parse() {
    var token;

    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();

      switch (token[0]) {
        case 'space':
          this.spaces += token[1];
          break;

        case ';':
          this.freeSemicolon(token);
          break;

        case '}':
          this.end(token);
          break;

        case 'comment':
          this.comment(token);
          break;

        case 'at-word':
          this.atrule(token);
          break;

        case '{':
          this.emptyRule(token);
          break;

        default:
          this.other(token);
          break;
      }
    }

    this.endFile();
  };

  _proto.comment = function comment(token) {
    var node = new _comment.default();
    this.init(node, token[2], token[3]);
    node.source.end = {
      line: token[4],
      column: token[5]
    };
    var text = token[1].slice(2, -2);

    if (/^\s*$/.test(text)) {
      node.text = '';
      node.raws.left = text;
      node.raws.right = '';
    } else {
      var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
      node.text = match[2];
      node.raws.left = match[1];
      node.raws.right = match[3];
    }
  };

  _proto.emptyRule = function emptyRule(token) {
    var node = new _rule.default();
    this.init(node, token[2], token[3]);
    node.selector = '';
    node.raws.between = '';
    this.current = node;
  };

  _proto.other = function other(start) {
    var end = false;
    var type = null;
    var colon = false;
    var bracket = null;
    var brackets = [];
    var tokens = [];
    var token = start;

    while (token) {
      type = token[0];
      tokens.push(token);

      if (type === '(' || type === '[') {
        if (!bracket) bracket = token;
        brackets.push(type === '(' ? ')' : ']');
      } else if (brackets.length === 0) {
        if (type === ';') {
          if (colon) {
            this.decl(tokens);
            return;
          } else {
            break;
          }
        } else if (type === '{') {
          this.rule(tokens);
          return;
        } else if (type === '}') {
          this.tokenizer.back(tokens.pop());
          end = true;
          break;
        } else if (type === ':') {
          colon = true;
        }
      } else if (type === brackets[brackets.length - 1]) {
        brackets.pop();
        if (brackets.length === 0) bracket = null;
      }

      token = this.tokenizer.nextToken();
    }

    if (this.tokenizer.endOfFile()) end = true;
    if (brackets.length > 0) this.unclosedBracket(bracket);

    if (end && colon) {
      while (tokens.length) {
        token = tokens[tokens.length - 1][0];
        if (token !== 'space' && token !== 'comment') break;
        this.tokenizer.back(tokens.pop());
      }

      this.decl(tokens);
    } else {
      this.unknownWord(tokens);
    }
  };

  _proto.rule = function rule(tokens) {
    tokens.pop();
    var node = new _rule.default();
    this.init(node, tokens[0][2], tokens[0][3]);
    node.raws.between = this.spacesAndCommentsFromEnd(tokens);
    this.raw(node, 'selector', tokens);
    this.current = node;
  };

  _proto.decl = function decl(tokens) {
    var node = new _declaration.default();
    this.init(node);
    var last = tokens[tokens.length - 1];

    if (last[0] === ';') {
      this.semicolon = true;
      tokens.pop();
    }

    if (last[4]) {
      node.source.end = {
        line: last[4],
        column: last[5]
      };
    } else {
      node.source.end = {
        line: last[2],
        column: last[3]
      };
    }

    while (tokens[0][0] !== 'word') {
      if (tokens.length === 1) this.unknownWord(tokens);
      node.raws.before += tokens.shift()[1];
    }

    node.source.start = {
      line: tokens[0][2],
      column: tokens[0][3]
    };
    node.prop = '';

    while (tokens.length) {
      var type = tokens[0][0];

      if (type === ':' || type === 'space' || type === 'comment') {
        break;
      }

      node.prop += tokens.shift()[1];
    }

    node.raws.between = '';
    var token;

    while (tokens.length) {
      token = tokens.shift();

      if (token[0] === ':') {
        node.raws.between += token[1];
        break;
      } else {
        if (token[0] === 'word' && /\w/.test(token[1])) {
          this.unknownWord([token]);
        }

        node.raws.between += token[1];
      }
    }

    if (node.prop[0] === '_' || node.prop[0] === '*') {
      node.raws.before += node.prop[0];
      node.prop = node.prop.slice(1);
    }

    node.raws.between += this.spacesAndCommentsFromStart(tokens);
    this.precheckMissedSemicolon(tokens);

    for (var i = tokens.length - 1; i > 0; i--) {
      token = tokens[i];

      if (token[1].toLowerCase() === '!important') {
        node.important = true;
        var string = this.stringFrom(tokens, i);
        string = this.spacesFromEnd(tokens) + string;
        if (string !== ' !important') node.raws.important = string;
        break;
      } else if (token[1].toLowerCase() === 'important') {
        var cache = tokens.slice(0);
        var str = '';

        for (var j = i; j > 0; j--) {
          var _type = cache[j][0];

          if (str.trim().indexOf('!') === 0 && _type !== 'space') {
            break;
          }

          str = cache.pop()[1] + str;
        }

        if (str.trim().indexOf('!') === 0) {
          node.important = true;
          node.raws.important = str;
          tokens = cache;
        }
      }

      if (token[0] !== 'space' && token[0] !== 'comment') {
        break;
      }
    }

    this.raw(node, 'value', tokens);
    if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens);
  };

  _proto.atrule = function atrule(token) {
    var node = new _atRule.default();
    node.name = token[1].slice(1);

    if (node.name === '') {
      this.unnamedAtrule(node, token);
    }

    this.init(node, token[2], token[3]);
    var prev;
    var shift;
    var last = false;
    var open = false;
    var params = [];

    while (!this.tokenizer.endOfFile()) {
      token = this.tokenizer.nextToken();

      if (token[0] === ';') {
        node.source.end = {
          line: token[2],
          column: token[3]
        };
        this.semicolon = true;
        break;
      } else if (token[0] === '{') {
        open = true;
        break;
      } else if (token[0] === '}') {
        if (params.length > 0) {
          shift = params.length - 1;
          prev = params[shift];

          while (prev && prev[0] === 'space') {
            prev = params[--shift];
          }

          if (prev) {
            node.source.end = {
              line: prev[4],
              column: prev[5]
            };
          }
        }

        this.end(token);
        break;
      } else {
        params.push(token);
      }

      if (this.tokenizer.endOfFile()) {
        last = true;
        break;
      }
    }

    node.raws.between = this.spacesAndCommentsFromEnd(params);

    if (params.length) {
      node.raws.afterName = this.spacesAndCommentsFromStart(params);
      this.raw(node, 'params', params);

      if (last) {
        token = params[params.length - 1];
        node.source.end = {
          line: token[4],
          column: token[5]
        };
        this.spaces = node.raws.between;
        node.raws.between = '';
      }
    } else {
      node.raws.afterName = '';
      node.params = '';
    }

    if (open) {
      node.nodes = [];
      this.current = node;
    }
  };

  _proto.end = function end(token) {
    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }

    this.semicolon = false;
    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
    this.spaces = '';

    if (this.current.parent) {
      this.current.source.end = {
        line: token[2],
        column: token[3]
      };
      this.current = this.current.parent;
    } else {
      this.unexpectedClose(token);
    }
  };

  _proto.endFile = function endFile() {
    if (this.current.parent) this.unclosedBlock();

    if (this.current.nodes && this.current.nodes.length) {
      this.current.raws.semicolon = this.semicolon;
    }

    this.current.raws.after = (this.current.raws.after || '') + this.spaces;
  };

  _proto.freeSemicolon = function freeSemicolon(token) {
    this.spaces += token[1];

    if (this.current.nodes) {
      var prev = this.current.nodes[this.current.nodes.length - 1];

      if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
        prev.raws.ownSemicolon = this.spaces;
        this.spaces = '';
      }
    }
  } // Helpers
  ;

  _proto.init = function init(node, line, column) {
    this.current.push(node);
    node.source = {
      start: {
        line: line,
        column: column
      },
      input: this.input
    };
    node.raws.before = this.spaces;
    this.spaces = '';
    if (node.type !== 'comment') this.semicolon = false;
  };

  _proto.raw = function raw(node, prop, tokens) {
    var token, type;
    var length = tokens.length;
    var value = '';
    var clean = true;
    var next, prev;
    var pattern = /^([.|#])?([\w])+/i;

    for (var i = 0; i < length; i += 1) {
      token = tokens[i];
      type = token[0];

      if (type === 'comment' && node.type === 'rule') {
        prev = tokens[i - 1];
        next = tokens[i + 1];

        if (prev[0] !== 'space' && next[0] !== 'space' && pattern.test(prev[1]) && pattern.test(next[1])) {
          value += token[1];
        } else {
          clean = false;
        }

        continue;
      }

      if (type === 'comment' || type === 'space' && i === length - 1) {
        clean = false;
      } else {
        value += token[1];
      }
    }

    if (!clean) {
      var raw = tokens.reduce(function (all, i) {
        return all + i[1];
      }, '');
      node.raws[prop] = {
        value: value,
        raw: raw
      };
    }

    node[prop] = value;
  };

  _proto.spacesAndCommentsFromEnd = function spacesAndCommentsFromEnd(tokens) {
    var lastTokenType;
    var spaces = '';

    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== 'space' && lastTokenType !== 'comment') break;
      spaces = tokens.pop()[1] + spaces;
    }

    return spaces;
  };

  _proto.spacesAndCommentsFromStart = function spacesAndCommentsFromStart(tokens) {
    var next;
    var spaces = '';

    while (tokens.length) {
      next = tokens[0][0];
      if (next !== 'space' && next !== 'comment') break;
      spaces += tokens.shift()[1];
    }

    return spaces;
  };

  _proto.spacesFromEnd = function spacesFromEnd(tokens) {
    var lastTokenType;
    var spaces = '';

    while (tokens.length) {
      lastTokenType = tokens[tokens.length - 1][0];
      if (lastTokenType !== 'space') break;
      spaces = tokens.pop()[1] + spaces;
    }

    return spaces;
  };

  _proto.stringFrom = function stringFrom(tokens, from) {
    var result = '';

    for (var i = from; i < tokens.length; i++) {
      result += tokens[i][1];
    }

    tokens.splice(from, tokens.length - from);
    return result;
  };

  _proto.colon = function colon(tokens) {
    var brackets = 0;
    var token, type, prev;

    for (var i = 0; i < tokens.length; i++) {
      token = tokens[i];
      type = token[0];

      if (type === '(') {
        brackets += 1;
      }

      if (type === ')') {
        brackets -= 1;
      }

      if (brackets === 0 && type === ':') {
        if (!prev) {
          this.doubleColon(token);
        } else if (prev[0] === 'word' && prev[1] === 'progid') {
          continue;
        } else {
          return i;
        }
      }

      prev = token;
    }

    return false;
  } // Errors
  ;

  _proto.unclosedBracket = function unclosedBracket(bracket) {
    throw this.input.error('Unclosed bracket', bracket[2], bracket[3]);
  };

  _proto.unknownWord = function unknownWord(tokens) {
    throw this.input.error('Unknown word', tokens[0][2], tokens[0][3]);
  };

  _proto.unexpectedClose = function unexpectedClose(token) {
    throw this.input.error('Unexpected }', token[2], token[3]);
  };

  _proto.unclosedBlock = function unclosedBlock() {
    var pos = this.current.source.start;
    throw this.input.error('Unclosed block', pos.line, pos.column);
  };

  _proto.doubleColon = function doubleColon(token) {
    throw this.input.error('Double colon', token[2], token[3]);
  };

  _proto.unnamedAtrule = function unnamedAtrule(node, token) {
    throw this.input.error('At-rule without name', token[2], token[3]);
  };

  _proto.precheckMissedSemicolon = function precheckMissedSemicolon()
  /* tokens */
  {// Hook for Safe Parser
  };

  _proto.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
    var colon = this.colon(tokens);
    if (colon === false) return;
    var founded = 0;
    var token;

    for (var j = colon - 1; j >= 0; j--) {
      token = tokens[j];

      if (token[0] !== 'space') {
        founded += 1;
        if (founded === 2) break;
      }
    }

    throw this.input.error('Missed semicolon', token[2], token[3]);
  };

  return Parser;
}();

exports.default = Parser;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsiUGFyc2VyIiwiaW5wdXQiLCJyb290IiwiUm9vdCIsImN1cnJlbnQiLCJzcGFjZXMiLCJzZW1pY29sb24iLCJjcmVhdGVUb2tlbml6ZXIiLCJzb3VyY2UiLCJzdGFydCIsImxpbmUiLCJjb2x1bW4iLCJ0b2tlbml6ZXIiLCJwYXJzZSIsInRva2VuIiwiZW5kT2ZGaWxlIiwibmV4dFRva2VuIiwiZnJlZVNlbWljb2xvbiIsImVuZCIsImNvbW1lbnQiLCJhdHJ1bGUiLCJlbXB0eVJ1bGUiLCJvdGhlciIsImVuZEZpbGUiLCJub2RlIiwiQ29tbWVudCIsImluaXQiLCJ0ZXh0Iiwic2xpY2UiLCJ0ZXN0IiwicmF3cyIsImxlZnQiLCJyaWdodCIsIm1hdGNoIiwiUnVsZSIsInNlbGVjdG9yIiwiYmV0d2VlbiIsInR5cGUiLCJjb2xvbiIsImJyYWNrZXQiLCJicmFja2V0cyIsInRva2VucyIsInB1c2giLCJsZW5ndGgiLCJkZWNsIiwicnVsZSIsImJhY2siLCJwb3AiLCJ1bmNsb3NlZEJyYWNrZXQiLCJ1bmtub3duV29yZCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCIsInJhdyIsIkRlY2xhcmF0aW9uIiwibGFzdCIsImJlZm9yZSIsInNoaWZ0IiwicHJvcCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0IiwicHJlY2hlY2tNaXNzZWRTZW1pY29sb24iLCJpIiwidG9Mb3dlckNhc2UiLCJpbXBvcnRhbnQiLCJzdHJpbmciLCJzdHJpbmdGcm9tIiwic3BhY2VzRnJvbUVuZCIsImNhY2hlIiwic3RyIiwiaiIsInRyaW0iLCJpbmRleE9mIiwidmFsdWUiLCJjaGVja01pc3NlZFNlbWljb2xvbiIsIkF0UnVsZSIsIm5hbWUiLCJ1bm5hbWVkQXRydWxlIiwicHJldiIsIm9wZW4iLCJwYXJhbXMiLCJhZnRlck5hbWUiLCJub2RlcyIsImFmdGVyIiwicGFyZW50IiwidW5leHBlY3RlZENsb3NlIiwidW5jbG9zZWRCbG9jayIsIm93blNlbWljb2xvbiIsImNsZWFuIiwibmV4dCIsInBhdHRlcm4iLCJyZWR1Y2UiLCJhbGwiLCJsYXN0VG9rZW5UeXBlIiwiZnJvbSIsInJlc3VsdCIsInNwbGljZSIsImRvdWJsZUNvbG9uIiwiZXJyb3IiLCJwb3MiLCJmb3VuZGVkIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0lBRXFCQSxNOzs7QUFDbkIsa0JBQWFDLEtBQWIsRUFBb0I7QUFDbEIsU0FBS0EsS0FBTCxHQUFhQSxLQUFiO0FBRUEsU0FBS0MsSUFBTCxHQUFZLElBQUlDLGFBQUosRUFBWjtBQUNBLFNBQUtDLE9BQUwsR0FBZSxLQUFLRixJQUFwQjtBQUNBLFNBQUtHLE1BQUwsR0FBYyxFQUFkO0FBQ0EsU0FBS0MsU0FBTCxHQUFpQixLQUFqQjtBQUVBLFNBQUtDLGVBQUw7QUFDQSxTQUFLTCxJQUFMLENBQVVNLE1BQVYsR0FBbUI7QUFBRVAsTUFBQUEsS0FBSyxFQUFMQSxLQUFGO0FBQVNRLE1BQUFBLEtBQUssRUFBRTtBQUFFQyxRQUFBQSxJQUFJLEVBQUUsQ0FBUjtBQUFXQyxRQUFBQSxNQUFNLEVBQUU7QUFBbkI7QUFBaEIsS0FBbkI7QUFDRDs7OztTQUVESixlLEdBQUEsMkJBQW1CO0FBQ2pCLFNBQUtLLFNBQUwsR0FBaUIsdUJBQVUsS0FBS1gsS0FBZixDQUFqQjtBQUNELEc7O1NBRURZLEssR0FBQSxpQkFBUztBQUNQLFFBQUlDLEtBQUo7O0FBQ0EsV0FBTyxDQUFDLEtBQUtGLFNBQUwsQ0FBZUcsU0FBZixFQUFSLEVBQW9DO0FBQ2xDRCxNQUFBQSxLQUFLLEdBQUcsS0FBS0YsU0FBTCxDQUFlSSxTQUFmLEVBQVI7O0FBRUEsY0FBUUYsS0FBSyxDQUFDLENBQUQsQ0FBYjtBQUNFLGFBQUssT0FBTDtBQUNFLGVBQUtULE1BQUwsSUFBZVMsS0FBSyxDQUFDLENBQUQsQ0FBcEI7QUFDQTs7QUFFRixhQUFLLEdBQUw7QUFDRSxlQUFLRyxhQUFMLENBQW1CSCxLQUFuQjtB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QUssQ0FBaEIsRUFBbUI7QUFDcEI7QUFDRjs7QUFDRCxVQUFNLEtBQUtoRyxLQUFMLENBQVc4RixLQUFYLENBQWlCLGtCQUFqQixFQUFxQ2pGLEtBQUssQ0FBQyxDQUFELENBQTFDLEVBQStDQSxLQUFLLENBQUMsQ0FBRCxDQUFwRCxDQUFOO0FBQ0QsRyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBEZWNsYXJhdGlvbiBmcm9tICcuL2RlY2xhcmF0aW9uJ1xuaW1wb3J0IHRva2VuaXplciBmcm9tICcuL3Rva2VuaXplJ1xuaW1wb3J0IENvbW1lbnQgZnJvbSAnLi9jb21tZW50J1xuaW1wb3J0IEF0UnVsZSBmcm9tICcuL2F0LXJ1bGUnXG5pbXBvcnQgUm9vdCBmcm9tICcuL3Jvb3QnXG5pbXBvcnQgUnVsZSBmcm9tICcuL3J1bGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhcnNlciB7XG4gIGNvbnN0cnVjdG9yIChpbnB1dCkge1xuICAgIHRoaXMuaW5wdXQgPSBpbnB1dFxuXG4gICAgdGhpcy5yb290ID0gbmV3IFJvb3QoKVxuICAgIHRoaXMuY3VycmVudCA9IHRoaXMucm9vdFxuICAgIHRoaXMuc3BhY2VzID0gJydcbiAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlXG5cbiAgICB0aGlzLmNyZWF0ZVRva2VuaXplcigpXG4gICAgdGhpcy5yb290LnNvdXJjZSA9IHsgaW5wdXQsIHN0YXJ0OiB7IGxpbmU6IDEsIGNvbHVtbjogMSB9IH1cbiAgfVxuXG4gIGNyZWF0ZVRva2VuaXplciAoKSB7XG4gICAgdGhpcy50b2tlbml6ZXIgPSB0b2tlbml6ZXIodGhpcy5pbnB1dClcbiAgfVxuXG4gIHBhcnNlICgpIHtcbiAgICBsZXQgdG9rZW5cbiAgICB3aGlsZSAoIXRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpKSB7XG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpXG5cbiAgICAgIHN3aXRjaCAodG9rZW5bMF0pIHtcbiAgICAgICAgY2FzZSAnc3BhY2UnOlxuICAgICAgICAgIHRoaXMuc3BhY2VzICs9IHRva2VuWzFdXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICc7JzpcbiAgICAgICAgICB0aGlzLmZyZWVTZW1pY29sb24odG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICd9JzpcbiAgICAgICAgICB0aGlzLmVuZCh0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ2NvbW1lbnQnOlxuICAgICAgICAgIHRoaXMuY29tbWVudCh0b2tlbilcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ2F0LXdvcmQnOlxuICAgICAgICAgIHRoaXMuYXRydWxlKHRva2VuKVxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAneyc6XG4gICAgICAgICAgdGhpcy5lbXB0eVJ1bGUodG9rZW4pXG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRoaXMub3RoZXIodG9rZW4pXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5lbmRGaWxlKClcbiAgfVxuXG4gIGNvbW1lbnQgKHRva2VuKSB7XG4gICAgbGV0IG5vZGUgPSBuZXcgQ29tbWVudCgpXG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSlcbiAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IHRva2VuWzRdLCBjb2x1bW46IHRva2VuWzVdIH1cblxuICAgIGxldCB0ZXh0ID0gdG9rZW5bMV0uc2xpY2UoMiwgLTIpXG4gICAgaWYgKC9eXFxzKiQvLnRlc3QodGV4dCkpIHtcbiAgICAgIG5vZGUudGV4dCA9ICcnXG4gICAgICBub2RlLnJhd3MubGVmdCA9IHRleHRcbiAgICAgIG5vZGUucmF3cy5yaWdodCA9ICcnXG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBtYXRjaCA9IHRleHQubWF0Y2goL14oXFxzKikoW15dKlteXFxzXSkoXFxzKikkLylcbiAgICAgIG5vZGUudGV4dCA9IG1hdGNoWzJdXG4gICAgICBub2RlLnJhd3MubGVmdCA9IG1hdGNoWzFdXG4gICAgICBub2RlLnJhd3MucmlnaHQgPSBtYXRjaFszXVxuICAgIH1cbiAgfVxuXG4gIGVtcHR5UnVsZSAodG9rZW4pIHtcbiAgICBsZXQgbm9kZSA9IG5ldyBSdWxlKClcbiAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0sIHRva2VuWzNdKVxuICAgIG5vZGUuc2VsZWN0b3IgPSAnJ1xuICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gJydcbiAgICB0aGlzLmN1cnJlbnQgPSBub2RlXG4gIH1cblxuICBvdGhlciAoc3RhcnQpIHtcbiAgICBsZXQgZW5kID0gZmFsc2VcbiAgICBsZXQgdHlwZSA9IG51bGxcbiAgICBsZXQgY29sb24gPSBmYWxzZVxuICAgIGxldCBicmFja2V0ID0gbnVsbFxuICAgIGxldCBicmFja2V0cyA9IFtdXG5cbiAgICBsZXQgdG9rZW5zID0gW11cbiAgICBsZXQgdG9rZW4gPSBzdGFydFxuICAgIHdoaWxlICh0b2tlbikge1xuICAgICAgdHlwZSA9IHRva2VuWzBdXG4gICAgICB0b2tlbnMucHVzaCh0b2tlbilcblxuICAgICAgaWYgKHR5cGUgPT09ICcoJyB8fCB0eXBlID09PSAnWycpIHtcbiAgICAgICAgaWYgKCFicmFja2V0KSBicmFja2V0ID0gdG9rZW5cbiAgICAgICAgYnJhY2tldHMucHVzaCh0eXBlID09PSAnKCcgPyAnKScgOiAnXScpXG4gICAgICB9IGVsc2UgaWYgKGJyYWNrZXRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBpZiAodHlwZSA9PT0gJzsnKSB7XG4gICAgICAgICAgaWYgKGNvbG9uKSB7XG4gICAgICAgICAgICB0aGlzLmRlY2wodG9rZW5zKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd7Jykge1xuICAgICAgICAgIHRoaXMucnVsZSh0b2tlbnMpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ30nKSB7XG4gICAgICAgICAgdGhpcy50b2tlbml6ZXIuYmFjayh0b2tlbnMucG9wKCkpXG4gICAgICAgICAgZW5kID0gdHJ1ZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJzonKSB7XG4gICAgICAgICAgY29sb24gPSB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gYnJhY2tldHNbYnJhY2tldHMubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgYnJhY2tldHMucG9wKClcbiAgICAgICAgaWYgKGJyYWNrZXRzLmxlbmd0aCA9PT0gMCkgYnJhY2tldCA9IG51bGxcbiAgICAgIH1cblxuICAgICAgdG9rZW4gPSB0aGlzLnRva2VuaXplci5uZXh0VG9rZW4oKVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSkgZW5kID0gdHJ1ZVxuICAgIGlmIChicmFja2V0cy5sZW5ndGggPiAwKSB0aGlzLnVuY2xvc2VkQnJhY2tldChicmFja2V0KVxuXG4gICAgaWYgKGVuZCAmJiBjb2xvbikge1xuICAgICAgd2hpbGUgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgdG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdXG4gICAgICAgIGlmICh0b2tlbiAhPT0gJ3NwYWNlJyAmJiB0b2tlbiAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgICB0aGlzLnRva2VuaXplci5iYWNrKHRva2Vucy5wb3AoKSlcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVjbCh0b2tlbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudW5rbm93bldvcmQodG9rZW5zKVxuICAgIH1cbiAgfVxuXG4gIHJ1bGUgKHRva2Vucykge1xuICAgIHRva2Vucy5wb3AoKVxuXG4gICAgbGV0IG5vZGUgPSBuZXcgUnVsZSgpXG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2Vuc1swXVsyXSwgdG9rZW5zWzBdWzNdKVxuXG4gICAgbm9kZS5yYXdzLmJldHdlZW4gPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCh0b2tlbnMpXG4gICAgdGhpcy5yYXcobm9kZSwgJ3NlbGVjdG9yJywgdG9rZW5zKVxuICAgIHRoaXMuY3VycmVudCA9IG5vZGVcbiAgfVxuXG4gIGRlY2wgKHRva2Vucykge1xuICAgIGxldCBub2RlID0gbmV3IERlY2xhcmF0aW9uKClcbiAgICB0aGlzLmluaXQobm9kZSlcblxuICAgIGxldCBsYXN0ID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVxuICAgIGlmIChsYXN0WzBdID09PSAnOycpIHtcbiAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZVxuICAgICAgdG9rZW5zLnBvcCgpXG4gICAgfVxuICAgIGlmIChsYXN0WzRdKSB7XG4gICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IGxhc3RbNF0sIGNvbHVtbjogbGFzdFs1XSB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogbGFzdFsyXSwgY29sdW1uOiBsYXN0WzNdIH1cbiAgICB9XG5cbiAgICB3aGlsZSAodG9rZW5zWzBdWzBdICE9PSAnd29yZCcpIHtcbiAgICAgIGlmICh0b2tlbnMubGVuZ3RoID09PSAxKSB0aGlzLnVua25vd25Xb3JkKHRva2VucylcbiAgICAgIG5vZGUucmF3cy5iZWZvcmUgKz0gdG9rZW5zLnNoaWZ0KClbMV1cbiAgICB9XG4gICAgbm9kZS5zb3VyY2Uuc3RhcnQgPSB7IGxpbmU6IHRva2Vuc1swXVsyXSwgY29sdW1uOiB0b2tlbnNbMF1bM10gfVxuXG4gICAgbm9kZS5wcm9wID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbGV0IHR5cGUgPSB0b2tlbnNbMF1bMF1cbiAgICAgIGlmICh0eXBlID09PSAnOicgfHwgdHlwZSA9PT0gJ3NwYWNlJyB8fCB0eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICAgIG5vZGUucHJvcCArPSB0b2tlbnMuc2hpZnQoKVsxXVxuICAgIH1cblxuICAgIG5vZGUucmF3cy5iZXR3ZWVuID0gJydcblxuICAgIGxldCB0b2tlblxuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICB0b2tlbiA9IHRva2Vucy5zaGlmdCgpXG5cbiAgICAgIGlmICh0b2tlblswXSA9PT0gJzonKSB7XG4gICAgICAgIG5vZGUucmF3cy5iZXR3ZWVuICs9IHRva2VuWzFdXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodG9rZW5bMF0gPT09ICd3b3JkJyAmJiAvXFx3Ly50ZXN0KHRva2VuWzFdKSkge1xuICAgICAgICAgIHRoaXMudW5rbm93bldvcmQoW3Rva2VuXSlcbiAgICAgICAgfVxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChub2RlLnByb3BbMF0gPT09ICdfJyB8fCBub2RlLnByb3BbMF0gPT09ICcqJykge1xuICAgICAgbm9kZS5yYXdzLmJlZm9yZSArPSBub2RlLnByb3BbMF1cbiAgICAgIG5vZGUucHJvcCA9IG5vZGUucHJvcC5zbGljZSgxKVxuICAgIH1cbiAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHRva2VucylcbiAgICB0aGlzLnByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2VucylcblxuICAgIGZvciAobGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICAgIGlmICh0b2tlblsxXS50b0xvd2VyQ2FzZSgpID09PSAnIWltcG9ydGFudCcpIHtcbiAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlXG4gICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnN0cmluZ0Zyb20odG9rZW5zLCBpKVxuICAgICAgICBzdHJpbmcgPSB0aGlzLnNwYWNlc0Zyb21FbmQodG9rZW5zKSArIHN0cmluZ1xuICAgICAgICBpZiAoc3RyaW5nICE9PSAnICFpbXBvcnRhbnQnKSBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyaW5nXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKHRva2VuWzFdLnRvTG93ZXJDYXNlKCkgPT09ICdpbXBvcnRhbnQnKSB7XG4gICAgICAgIGxldCBjYWNoZSA9IHRva2Vucy5zbGljZSgwKVxuICAgICAgICBsZXQgc3RyID0gJydcbiAgICAgICAgZm9yIChsZXQgaiA9IGk7IGogPiAwOyBqLS0pIHtcbiAgICAgICAgICBsZXQgdHlwZSA9IGNhY2hlW2pdWzBdXG4gICAgICAgICAgaWYgKHN0ci50cmltKCkuaW5kZXhPZignIScpID09PSAwICYmIHR5cGUgIT09ICdzcGFjZScpIHtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICAgIHN0ciA9IGNhY2hlLnBvcCgpWzFdICsgc3RyXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0ci50cmltKCkuaW5kZXhPZignIScpID09PSAwKSB7XG4gICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlXG4gICAgICAgICAgbm9kZS5yYXdzLmltcG9ydGFudCA9IHN0clxuICAgICAgICAgIHRva2VucyA9IGNhY2hlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHRva2VuWzBdICE9PSAnc3BhY2UnICYmIHRva2VuWzBdICE9PSAnY29tbWVudCcpIHtcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJhdyhub2RlLCAndmFsdWUnLCB0b2tlbnMpXG5cbiAgICBpZiAobm9kZS52YWx1ZS5pbmRleE9mKCc6JykgIT09IC0xKSB0aGlzLmNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2VucylcbiAgfVxuXG4gIGF0cnVsZSAodG9rZW4pIHtcbiAgICBsZXQgbm9kZSA9IG5ldyBBdFJ1bGUoKVxuICAgIG5vZGUubmFtZSA9IHRva2VuWzFdLnNsaWNlKDEpXG4gICAgaWYgKG5vZGUubmFtZSA9PT0gJycpIHtcbiAgICAgIHRoaXMudW5uYW1lZEF0cnVsZShub2RlLCB0b2tlbilcbiAgICB9XG4gICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSlcblxuICAgIGxldCBwcmV2XG4gICAgbGV0IHNoaWZ0XG4gICAgbGV0IGxhc3QgPSBmYWxzZVxuICAgIGxldCBvcGVuID0gZmFsc2VcbiAgICBsZXQgcGFyYW1zID0gW11cblxuICAgIHdoaWxlICghdGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkpIHtcbiAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKClcblxuICAgICAgaWYgKHRva2VuWzBdID09PSAnOycpIHtcbiAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlblsyXSwgY29sdW1uOiB0b2tlblszXSB9XG4gICAgICAgIHRoaXMuc2VtaWNvbG9uID0gdHJ1ZVxuICAgICAgICBicmVha1xuICAgICAgfSBlbHNlIGlmICh0b2tlblswXSA9PT0gJ3snKSB7XG4gICAgICAgIG9wZW4gPSB0cnVlXG4gICAgICAgIGJyZWFrXG4gICAgICB9IGVsc2UgaWYgKHRva2VuWzBdID09PSAnfScpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgc2hpZnQgPSBwYXJhbXMubGVuZ3RoIC0gMVxuICAgICAgICAgIHByZXYgPSBwYXJhbXNbc2hpZnRdXG4gICAgICAgICAgd2hpbGUgKHByZXYgJiYgcHJldlswXSA9PT0gJ3NwYWNlJykge1xuICAgICAgICAgICAgcHJldiA9IHBhcmFtc1stLXNoaWZ0XVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiBwcmV2WzRdLCBjb2x1bW46IHByZXZbNV0gfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVuZCh0b2tlbilcbiAgICAgICAgYnJlYWtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcmFtcy5wdXNoKHRva2VuKVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkpIHtcbiAgICAgICAgbGFzdCA9IHRydWVcbiAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBub2RlLnJhd3MuYmV0d2VlbiA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHBhcmFtcylcbiAgICBpZiAocGFyYW1zLmxlbmd0aCkge1xuICAgICAgbm9kZS5yYXdzLmFmdGVyTmFtZSA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tU3RhcnQocGFyYW1zKVxuICAgICAgdGhpcy5yYXcobm9kZSwgJ3BhcmFtcycsIHBhcmFtcylcbiAgICAgIGlmIChsYXN0KSB7XG4gICAgICAgIHRva2VuID0gcGFyYW1zW3BhcmFtcy5sZW5ndGggLSAxXVxuICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IHRva2VuWzRdLCBjb2x1bW46IHRva2VuWzVdIH1cbiAgICAgICAgdGhpcy5zcGFjZXMgPSBub2RlLnJhd3MuYmV0d2VlblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUucmF3cy5hZnRlck5hbWUgPSAnJ1xuICAgICAgbm9kZS5wYXJhbXMgPSAnJ1xuICAgIH1cblxuICAgIGlmIChvcGVuKSB7XG4gICAgICBub2RlLm5vZGVzID0gW11cbiAgICAgIHRoaXMuY3VycmVudCA9IG5vZGVcbiAgICB9XG4gIH1cblxuICBlbmQgKHRva2VuKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudC5ub2RlcyAmJiB0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnQucmF3cy5zZW1pY29sb24gPSB0aGlzLnNlbWljb2xvblxuICAgIH1cbiAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlXG5cbiAgICB0aGlzLmN1cnJlbnQucmF3cy5hZnRlciA9ICh0aGlzLmN1cnJlbnQucmF3cy5hZnRlciB8fCAnJykgKyB0aGlzLnNwYWNlc1xuICAgIHRoaXMuc3BhY2VzID0gJydcblxuICAgIGlmICh0aGlzLmN1cnJlbnQucGFyZW50KSB7XG4gICAgICB0aGlzLmN1cnJlbnQuc291cmNlLmVuZCA9IHsgbGluZTogdG9rZW5bMl0sIGNvbHVtbjogdG9rZW5bM10gfVxuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50LnBhcmVudFxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVuZXhwZWN0ZWRDbG9zZSh0b2tlbilcbiAgICB9XG4gIH1cblxuICBlbmRGaWxlICgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50LnBhcmVudCkgdGhpcy51bmNsb3NlZEJsb2NrKClcbiAgICBpZiAodGhpcy5jdXJyZW50Lm5vZGVzICYmIHRoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudC5yYXdzLnNlbWljb2xvbiA9IHRoaXMuc2VtaWNvbG9uXG4gICAgfVxuICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzXG4gIH1cblxuICBmcmVlU2VtaWNvbG9uICh0b2tlbikge1xuICAgIHRoaXMuc3BhY2VzICs9IHRva2VuWzFdXG4gICAgaWYgKHRoaXMuY3VycmVudC5ub2Rlcykge1xuICAgICAgbGV0IHByZXYgPSB0aGlzLmN1cnJlbnQubm9kZXNbdGhpcy5jdXJyZW50Lm5vZGVzLmxlbmd0aCAtIDFdXG4gICAgICBpZiAocHJldiAmJiBwcmV2LnR5cGUgPT09ICdydWxlJyAmJiAhcHJldi5yYXdzLm93blNlbWljb2xvbikge1xuICAgICAgICBwcmV2LnJhd3Mub3duU2VtaWNvbG9uID0gdGhpcy5zcGFjZXNcbiAgICAgICAgdGhpcy5zcGFjZXMgPSAnJ1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIEhlbHBlcnNcblxuICBpbml0IChub2RlLCBsaW5lLCBjb2x1bW4pIHtcbiAgICB0aGlzLmN1cnJlbnQucHVzaChub2RlKVxuXG4gICAgbm9kZS5zb3VyY2UgPSB7IHN0YXJ0OiB7IGxpbmUsIGNvbHVtbiB9LCBpbnB1dDogdGhpcy5pbnB1dCB9XG4gICAgbm9kZS5yYXdzLmJlZm9yZSA9IHRoaXMuc3BhY2VzXG4gICAgdGhpcy5zcGFjZXMgPSAnJ1xuICAgIGlmIChub2RlLnR5cGUgIT09ICdjb21tZW50JykgdGhpcy5zZW1pY29sb24gPSBmYWxzZVxuICB9XG5cbiAgcmF3IChub2RlLCBwcm9wLCB0b2tlbnMpIHtcbiAgICBsZXQgdG9rZW4sIHR5cGVcbiAgICBsZXQgbGVuZ3RoID0gdG9rZW5zLmxlbmd0aFxuICAgIGxldCB2YWx1ZSA9ICcnXG4gICAgbGV0IGNsZWFuID0gdHJ1ZVxuICAgIGxldCBuZXh0LCBwcmV2XG4gICAgbGV0IHBhdHRlcm4gPSAvXihbLnwjXSk/KFtcXHddKSsvaVxuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICAgIHR5cGUgPSB0b2tlblswXVxuXG4gICAgICBpZiAodHlwZSA9PT0gJ2NvbW1lbnQnICYmIG5vZGUudHlwZSA9PT0gJ3J1bGUnKSB7XG4gICAgICAgIHByZXYgPSB0b2tlbnNbaSAtIDFdXG4gICAgICAgIG5leHQgPSB0b2tlbnNbaSArIDFdXG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHByZXZbMF0gIT09ICdzcGFjZScgJiZcbiAgICAgICAgICBuZXh0WzBdICE9PSAnc3BhY2UnICYmXG4gICAgICAgICAgcGF0dGVybi50ZXN0KHByZXZbMV0pICYmXG4gICAgICAgICAgcGF0dGVybi50ZXN0KG5leHRbMV0pXG4gICAgICAgICkge1xuICAgICAgICAgIHZhbHVlICs9IHRva2VuWzFdXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY2xlYW4gPSBmYWxzZVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGUgPT09ICdjb21tZW50JyB8fCAodHlwZSA9PT0gJ3NwYWNlJyAmJiBpID09PSBsZW5ndGggLSAxKSkge1xuICAgICAgICBjbGVhbiA9IGZhbHNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZSArPSB0b2tlblsxXVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIWNsZWFuKSB7XG4gICAgICBsZXQgcmF3ID0gdG9rZW5zLnJlZHVjZSgoYWxsLCBpKSA9PiBhbGwgKyBpWzFdLCAnJylcbiAgICAgIG5vZGUucmF3c1twcm9wXSA9IHsgdmFsdWUsIHJhdyB9XG4gICAgfVxuICAgIG5vZGVbcHJvcF0gPSB2YWx1ZVxuICB9XG5cbiAgc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kICh0b2tlbnMpIHtcbiAgICBsZXQgbGFzdFRva2VuVHlwZVxuICAgIGxldCBzcGFjZXMgPSAnJ1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBsYXN0VG9rZW5UeXBlID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXVswXVxuICAgICAgaWYgKGxhc3RUb2tlblR5cGUgIT09ICdzcGFjZScgJiYgbGFzdFRva2VuVHlwZSAhPT0gJ2NvbW1lbnQnKSBicmVha1xuICAgICAgc3BhY2VzID0gdG9rZW5zLnBvcCgpWzFdICsgc3BhY2VzXG4gICAgfVxuICAgIHJldHVybiBzcGFjZXNcbiAgfVxuXG4gIHNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0ICh0b2tlbnMpIHtcbiAgICBsZXQgbmV4dFxuICAgIGxldCBzcGFjZXMgPSAnJ1xuICAgIHdoaWxlICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICBuZXh0ID0gdG9rZW5zWzBdWzBdXG4gICAgICBpZiAobmV4dCAhPT0gJ3NwYWNlJyAmJiBuZXh0ICE9PSAnY29tbWVudCcpIGJyZWFrXG4gICAgICBzcGFjZXMgKz0gdG9rZW5zLnNoaWZ0KClbMV1cbiAgICB9XG4gICAgcmV0dXJuIHNwYWNlc1xuICB9XG5cbiAgc3BhY2VzRnJvbUVuZCAodG9rZW5zKSB7XG4gICAgbGV0IGxhc3RUb2tlblR5cGVcbiAgICBsZXQgc3BhY2VzID0gJydcbiAgICB3aGlsZSAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgbGFzdFRva2VuVHlwZSA9IHRva2Vuc1t0b2tlbnMubGVuZ3RoIC0gMV1bMF1cbiAgICAgIGlmIChsYXN0VG9rZW5UeXBlICE9PSAnc3BhY2UnKSBicmVha1xuICAgICAgc3BhY2VzID0gdG9rZW5zLnBvcCgpWzFdICsgc3BhY2VzXG4gICAgfVxuICAgIHJldHVybiBzcGFjZXNcbiAgfVxuXG4gIHN0cmluZ0Zyb20gKHRva2VucywgZnJvbSkge1xuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIGZvciAobGV0IGkgPSBmcm9tOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQgKz0gdG9rZW5zW2ldWzFdXG4gICAgfVxuICAgIHRva2Vucy5zcGxpY2UoZnJvbSwgdG9rZW5zLmxlbmd0aCAtIGZyb20pXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgY29sb24gKHRva2Vucykge1xuICAgIGxldCBicmFja2V0cyA9IDBcbiAgICBsZXQgdG9rZW4sIHR5cGUsIHByZXZcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICAgIHR5cGUgPSB0b2tlblswXVxuXG4gICAgICBpZiAodHlwZSA9PT0gJygnKSB7XG4gICAgICAgIGJyYWNrZXRzICs9IDFcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlID09PSAnKScpIHtcbiAgICAgICAgYnJhY2tldHMgLT0gMVxuICAgICAgfVxuICAgICAgaWYgKGJyYWNrZXRzID09PSAwICYmIHR5cGUgPT09ICc6Jykge1xuICAgICAgICBpZiAoIXByZXYpIHtcbiAgICAgICAgICB0aGlzLmRvdWJsZUNvbG9uKHRva2VuKVxuICAgICAgICB9IGVsc2UgaWYgKHByZXZbMF0gPT09ICd3b3JkJyAmJiBwcmV2WzFdID09PSAncHJvZ2lkJykge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwcmV2ID0gdG9rZW5cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBFcnJvcnNcblxuICB1bmNsb3NlZEJyYWNrZXQgKGJyYWNrZXQpIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmNsb3NlZCBicmFja2V0JywgYnJhY2tldFsyXSwgYnJhY2tldFszXSlcbiAgfVxuXG4gIHVua25vd25Xb3JkICh0b2tlbnMpIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmtub3duIHdvcmQnLCB0b2tlbnNbMF1bMl0sIHRva2Vuc1swXVszXSlcbiAgfVxuXG4gIHVuZXhwZWN0ZWRDbG9zZSAodG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmV4cGVjdGVkIH0nLCB0b2tlblsyXSwgdG9rZW5bM10pXG4gIH1cblxuICB1bmNsb3NlZEJsb2NrICgpIHtcbiAgICBsZXQgcG9zID0gdGhpcy5jdXJyZW50LnNvdXJjZS5zdGFydFxuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1VuY2xvc2VkIGJsb2NrJywgcG9zLmxpbmUsIHBvcy5jb2x1bW4pXG4gIH1cblxuICBkb3VibGVDb2xvbiAodG9rZW4pIHtcbiAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdEb3VibGUgY29sb24nLCB0b2tlblsyXSwgdG9rZW5bM10pXG4gIH1cblxuICB1bm5hbWVkQXRydWxlIChub2RlLCB0b2tlbikge1xuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ0F0LXJ1bGUgd2l0aG91dCBuYW1lJywgdG9rZW5bMl0sIHRva2VuWzNdKVxuICB9XG5cbiAgcHJlY2hlY2tNaXNzZWRTZW1pY29sb24gKC8qIHRva2VucyAqLykge1xuICAgIC8vIEhvb2sgZm9yIFNhZmUgUGFyc2VyXG4gIH1cblxuICBjaGVja01pc3NlZFNlbWljb2xvbiAodG9rZW5zKSB7XG4gICAgbGV0IGNvbG9uID0gdGhpcy5jb2xvbih0b2tlbnMpXG4gICAgaWYgKGNvbG9uID09PSBmYWxzZSkgcmV0dXJuXG5cbiAgICBsZXQgZm91bmRlZCA9IDBcbiAgICBsZXQgdG9rZW5cbiAgICBmb3IgKGxldCBqID0gY29sb24gLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgdG9rZW4gPSB0b2tlbnNbal1cbiAgICAgIGlmICh0b2tlblswXSAhPT0gJ3NwYWNlJykge1xuICAgICAgICBmb3VuZGVkICs9IDFcbiAgICAgICAgaWYgKGZvdW5kZWQgPT09IDIpIGJyZWFrXG4gICAgICB9XG4gICAgfVxuICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ01pc3NlZCBzZW1pY29sb24nLCB0b2tlblsyXSwgdG9rZW5bM10pXG4gIH1cbn1cbiJdLCJmaWxlIjoicGFyc2VyLmpzIn0=


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a comment between declarations or statements (rule and at-rules).
 *
 * Comments inside selectors, at-rule parameters, or declaration values
 * will be stored in the `raws` properties explained above.
 *
 * @extends Node
 */
var Comment =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Comment, _Node);

  function Comment(defaults) {
    var _this;

    _this = _Node.call(this, defaults) || this;
    _this.type = 'comment';
    return _this;
  }
  /**
   * @memberof Comment#
   * @member {string} text The comment’s text.
   */

  /**
   * @memberof Comment#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node.
   * * `left`: the space symbols between `/*` and the comment’s text.
   * * `right`: the space symbols between the comment’s text.
   */


  return Comment;
}(_node.default);

var _default = Comment;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuZXM2Il0sIm5hbWVzIjpbIkNvbW1lbnQiLCJkZWZhdWx0cyIsInR5cGUiLCJOb2RlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7QUFFQTs7Ozs7Ozs7SUFRTUEsTzs7Ozs7QUFDSixtQkFBYUMsUUFBYixFQUF1QjtBQUFBOztBQUNyQiw2QkFBTUEsUUFBTjtBQUNBLFVBQUtDLElBQUwsR0FBWSxTQUFaO0FBRnFCO0FBR3RCO0FBRUQ7Ozs7O0FBS0E7Ozs7Ozs7Ozs7Ozs7OztFQVhvQkMsYTs7ZUF5QlBILE8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIGNvbW1lbnQgYmV0d2VlbiBkZWNsYXJhdGlvbnMgb3Igc3RhdGVtZW50cyAocnVsZSBhbmQgYXQtcnVsZXMpLlxuICpcbiAqIENvbW1lbnRzIGluc2lkZSBzZWxlY3RvcnMsIGF0LXJ1bGUgcGFyYW1ldGVycywgb3IgZGVjbGFyYXRpb24gdmFsdWVzXG4gKiB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgYHJhd3NgIHByb3BlcnRpZXMgZXhwbGFpbmVkIGFib3ZlLlxuICpcbiAqIEBleHRlbmRzIE5vZGVcbiAqL1xuY2xhc3MgQ29tbWVudCBleHRlbmRzIE5vZGUge1xuICBjb25zdHJ1Y3RvciAoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAnY29tbWVudCdcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgQ29tbWVudCNcbiAgICogQG1lbWJlciB7c3RyaW5nfSB0ZXh0IFRoZSBjb21tZW504oCZcyB0ZXh0LlxuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIENvbW1lbnQjXG4gICAqIEBtZW1iZXIge29iamVjdH0gcmF3cyBJbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBieXRlLXRvLWJ5dGUgZXF1YWxcbiAgICogICAgICAgICAgICAgICAgICAgICAgIG5vZGUgc3RyaW5nIGFzIGl0IHdhcyBpbiB0aGUgb3JpZ2luIGlucHV0LlxuICAgKlxuICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgKiBidXQgdGhlIGRlZmF1bHQgQ1NTIHBhcnNlciB1c2VzOlxuICAgKlxuICAgKiAqIGBiZWZvcmVgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZWZvcmUgdGhlIG5vZGUuXG4gICAqICogYGxlZnRgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZXR3ZWVuIGAvKmAgYW5kIHRoZSBjb21tZW504oCZcyB0ZXh0LlxuICAgKiAqIGByaWdodGA6IHRoZSBzcGFjZSBzeW1ib2xzIGJldHdlZW4gdGhlIGNvbW1lbnTigJlzIHRleHQuXG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBDb21tZW50XG4iXSwiZmlsZSI6ImNvbW1lbnQuanMifQ==


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(49));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents an at-rule.
 *
 * If it’s followed in the CSS by a {} block, this node will have
 * a nodes property representing its children.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('@charset "UTF-8"; @media print {}')
 *
 * const charset = root.first
 * charset.type  //=> 'atrule'
 * charset.nodes //=> undefined
 *
 * const media = root.last
 * media.nodes   //=> []
 */
var AtRule =
/*#__PURE__*/
function (_Container) {
  _inheritsLoose(AtRule, _Container);

  function AtRule(defaults) {
    var _this;

    _this = _Container.call(this, defaults) || this;
    _this.type = 'atrule';
    return _this;
  }

  var _proto = AtRule.prototype;

  _proto.append = function append() {
    var _Container$prototype$;

    if (!this.nodes) this.nodes = [];

    for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }

    return (_Container$prototype$ = _Container.prototype.append).call.apply(_Container$prototype$, [this].concat(children));
  };

  _proto.prepend = function prepend() {
    var _Container$prototype$2;

    if (!this.nodes) this.nodes = [];

    for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }

    return (_Container$prototype$2 = _Container.prototype.prepend).call.apply(_Container$prototype$2, [this].concat(children));
  }
  /**
   * @memberof AtRule#
   * @member {string} name The at-rule’s name immediately follows the `@`.
   *
   * @example
   * const root  = postcss.parse('@media print {}')
   * media.name //=> 'media'
   * const media = root.first
   */

  /**
   * @memberof AtRule#
   * @member {string} params The at-rule’s parameters, the values
   *                         that follow the at-rule’s name but precede
   *                         any {} block.
   *
   * @example
   * const root  = postcss.parse('@media print, screen {}')
   * const media = root.first
   * media.params //=> 'print, screen'
   */

  /**
   * @memberof AtRule#
   * @member {object} raws Information to generate byte-to-byte equal
   *                        node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `after`: the space symbols after the last child of the node
   *   to the end of the node.
   * * `between`: the symbols between the property and value
   *   for declarations, selector and `{` for rules, or last parameter
   *   and `{` for at-rules.
   * * `semicolon`: contains true if the last child has
   *   an (optional) semicolon.
   * * `afterName`: the space between the at-rule name and its parameters.
   *
   * PostCSS cleans at-rule parameters from comments and extra spaces,
   * but it stores origin content in raws properties.
   * As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('  @media\nprint {\n}')
   * root.first.first.raws //=> { before: '  ',
   *                       //     between: ' ',
   *                       //     afterName: '\n',
   *                       //     after: '\n' }
   */
  ;

  return AtRule;
}(_container.default);

var _default = AtRule;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0LXJ1bGUuZXM2Il0sIm5hbWVzIjpbIkF0UnVsZSIsImRlZmF1bHRzIiwidHlwZSIsImFwcGVuZCIsIm5vZGVzIiwiY2hpbGRyZW4iLCJwcmVwZW5kIiwiQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOzs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBa0JNQSxNOzs7OztBQUNKLGtCQUFhQyxRQUFiLEVBQXVCO0FBQUE7O0FBQ3JCLGtDQUFNQSxRQUFOO0FBQ0EsVUFBS0MsSUFBTCxHQUFZLFFBQVo7QUFGcUI7QUFHdEI7Ozs7U0FFREMsTSxHQUFBLGtCQUFxQjtBQUFBOztBQUNuQixRQUFJLENBQUMsS0FBS0MsS0FBVixFQUFpQixLQUFLQSxLQUFMLEdBQWEsRUFBYjs7QUFERSxzQ0FBVkMsUUFBVTtBQUFWQSxNQUFBQSxRQUFVO0FBQUE7O0FBRW5CLHlEQUFhRixNQUFiLGtEQUF1QkUsUUFBdkI7QUFDRCxHOztTQUVEQyxPLEdBQUEsbUJBQXNCO0FBQUE7O0FBQ3BCLFFBQUksQ0FBQyxLQUFLRixLQUFWLEVBQWlCLEtBQUtBLEtBQUwsR0FBYSxFQUFiOztBQURHLHVDQUFWQyxRQUFVO0FBQVZBLE1BQUFBLFFBQVU7QUFBQTs7QUFFcEIsMERBQWFDLE9BQWIsbURBQXdCRCxRQUF4QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF0Q21CRSxrQjs7ZUF1RU5QLE0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJ1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gYXQtcnVsZS5cbiAqXG4gKiBJZiBpdOKAmXMgZm9sbG93ZWQgaW4gdGhlIENTUyBieSBhIHt9IGJsb2NrLCB0aGlzIG5vZGUgd2lsbCBoYXZlXG4gKiBhIG5vZGVzIHByb3BlcnR5IHJlcHJlc2VudGluZyBpdHMgY2hpbGRyZW4uXG4gKlxuICogQGV4dGVuZHMgQ29udGFpbmVyXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdAY2hhcnNldCBcIlVURi04XCI7IEBtZWRpYSBwcmludCB7fScpXG4gKlxuICogY29uc3QgY2hhcnNldCA9IHJvb3QuZmlyc3RcbiAqIGNoYXJzZXQudHlwZSAgLy89PiAnYXRydWxlJ1xuICogY2hhcnNldC5ub2RlcyAvLz0+IHVuZGVmaW5lZFxuICpcbiAqIGNvbnN0IG1lZGlhID0gcm9vdC5sYXN0XG4gKiBtZWRpYS5ub2RlcyAgIC8vPT4gW11cbiAqL1xuY2xhc3MgQXRSdWxlIGV4dGVuZHMgQ29udGFpbmVyIHtcbiAgY29uc3RydWN0b3IgKGRlZmF1bHRzKSB7XG4gICAgc3VwZXIoZGVmYXVsdHMpXG4gICAgdGhpcy50eXBlID0gJ2F0cnVsZSdcbiAgfVxuXG4gIGFwcGVuZCAoLi4uY2hpbGRyZW4pIHtcbiAgICBpZiAoIXRoaXMubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICAgIHJldHVybiBzdXBlci5hcHBlbmQoLi4uY2hpbGRyZW4pXG4gIH1cblxuICBwcmVwZW5kICguLi5jaGlsZHJlbikge1xuICAgIGlmICghdGhpcy5ub2RlcykgdGhpcy5ub2RlcyA9IFtdXG4gICAgcmV0dXJuIHN1cGVyLnByZXBlbmQoLi4uY2hpbGRyZW4pXG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIEF0UnVsZSNcbiAgICogQG1lbWJlciB7c3RyaW5nfSBuYW1lIFRoZSBhdC1ydWxl4oCZcyBuYW1lIGltbWVkaWF0ZWx5IGZvbGxvd3MgdGhlIGBAYC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCAgPSBwb3N0Y3NzLnBhcnNlKCdAbWVkaWEgcHJpbnQge30nKVxuICAgKiBtZWRpYS5uYW1lIC8vPT4gJ21lZGlhJ1xuICAgKiBjb25zdCBtZWRpYSA9IHJvb3QuZmlyc3RcbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBBdFJ1bGUjXG4gICAqIEBtZW1iZXIge3N0cmluZ30gcGFyYW1zIFRoZSBhdC1ydWxl4oCZcyBwYXJhbWV0ZXJzLCB0aGUgdmFsdWVzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgZm9sbG93IHRoZSBhdC1ydWxl4oCZcyBuYW1lIGJ1dCBwcmVjZWRlXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgIGFueSB7fSBibG9jay5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCAgPSBwb3N0Y3NzLnBhcnNlKCdAbWVkaWEgcHJpbnQsIHNjcmVlbiB7fScpXG4gICAqIGNvbnN0IG1lZGlhID0gcm9vdC5maXJzdFxuICAgKiBtZWRpYS5wYXJhbXMgLy89PiAncHJpbnQsIHNjcmVlbidcbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBBdFJ1bGUjXG4gICAqIEBtZW1iZXIge29iamVjdH0gcmF3cyBJbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBieXRlLXRvLWJ5dGUgZXF1YWxcbiAgICogICAgICAgICAgICAgICAgICAgICAgICBub2RlIHN0cmluZyBhcyBpdCB3YXMgaW4gdGhlIG9yaWdpbiBpbnB1dC5cbiAgICpcbiAgICogRXZlcnkgcGFyc2VyIHNhdmVzIGl0cyBvd24gcHJvcGVydGllcyxcbiAgICogYnV0IHRoZSBkZWZhdWx0IENTUyBwYXJzZXIgdXNlczpcbiAgICpcbiAgICogKiBgYmVmb3JlYDogdGhlIHNwYWNlIHN5bWJvbHMgYmVmb3JlIHRoZSBub2RlLiBJdCBhbHNvIHN0b3JlcyBgKmBcbiAgICogICBhbmQgYF9gIHN5bWJvbHMgYmVmb3JlIHRoZSBkZWNsYXJhdGlvbiAoSUUgaGFjaykuXG4gICAqICogYGFmdGVyYDogdGhlIHNwYWNlIHN5bWJvbHMgYWZ0ZXIgdGhlIGxhc3QgY2hpbGQgb2YgdGhlIG5vZGVcbiAgICogICB0byB0aGUgZW5kIG9mIHRoZSBub2RlLlxuICAgKiAqIGBiZXR3ZWVuYDogdGhlIHN5bWJvbHMgYmV0d2VlbiB0aGUgcHJvcGVydHkgYW5kIHZhbHVlXG4gICAqICAgZm9yIGRlY2xhcmF0aW9ucywgc2VsZWN0b3IgYW5kIGB7YCBmb3IgcnVsZXMsIG9yIGxhc3QgcGFyYW1ldGVyXG4gICAqICAgYW5kIGB7YCBmb3IgYXQtcnVsZXMuXG4gICAqICogYHNlbWljb2xvbmA6IGNvbnRhaW5zIHRydWUgaWYgdGhlIGxhc3QgY2hpbGQgaGFzXG4gICAqICAgYW4gKG9wdGlvbmFsKSBzZW1pY29sb24uXG4gICAqICogYGFmdGVyTmFtZWA6IHRoZSBzcGFjZSBiZXR3ZWVuIHRoZSBhdC1ydWxlIG5hbWUgYW5kIGl0cyBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBQb3N0Q1NTIGNsZWFucyBhdC1ydWxlIHBhcmFtZXRlcnMgZnJvbSBjb21tZW50cyBhbmQgZXh0cmEgc3BhY2VzLFxuICAgKiBidXQgaXQgc3RvcmVzIG9yaWdpbiBjb250ZW50IGluIHJhd3MgcHJvcGVydGllcy5cbiAgICogQXMgc3VjaCwgaWYgeW91IGRvbuKAmXQgY2hhbmdlIGEgZGVjbGFyYXRpb27igJlzIHZhbHVlLFxuICAgKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSByYXcgdmFsdWUgd2l0aCBjb21tZW50cy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJyAgQG1lZGlhXFxucHJpbnQge1xcbn0nKVxuICAgKiByb290LmZpcnN0LmZpcnN0LnJhd3MgLy89PiB7IGJlZm9yZTogJyAgJyxcbiAgICogICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBiZXR3ZWVuOiAnICcsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAvLyAgICAgYWZ0ZXJOYW1lOiAnXFxuJyxcbiAgICogICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBhZnRlcjogJ1xcbicgfVxuICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgQXRSdWxlXG4iXSwiZmlsZSI6ImF0LXJ1bGUuanMifQ==


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _declaration = _interopRequireDefault(__webpack_require__(4));

var _comment = _interopRequireDefault(__webpack_require__(47));

var _node = _interopRequireDefault(__webpack_require__(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function cleanSource(nodes) {
  return nodes.map(function (i) {
    if (i.nodes) i.nodes = cleanSource(i.nodes);
    delete i.source;
    return i;
  });
}
/**
 * The {@link Root}, {@link AtRule}, and {@link Rule} container nodes
 * inherit some common methods to help work with their children.
 *
 * Note that all containers can store any content. If you write a rule inside
 * a rule, PostCSS will parse it.
 *
 * @extends Node
 * @abstract
 */


var Container =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Container, _Node);

  function Container() {
    return _Node.apply(this, arguments) || this;
  }

  var _proto = Container.prototype;

  _proto.push = function push(child) {
    child.parent = this;
    this.nodes.push(child);
    return this;
  }
  /**
   * Iterates through the container’s immediate children,
   * calling `callback` for each child.
   *
   * Returning `false` in the callback will break iteration.
   *
   * This method only iterates through the container’s immediate children.
   * If you need to recursively iterate through all the container’s descendant
   * nodes, use {@link Container#walk}.
   *
   * Unlike the for `{}`-cycle or `Array#forEach` this iterator is safe
   * if you are mutating the array of child nodes during iteration.
   * PostCSS will adjust the current index to match the mutations.
   *
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * const root = postcss.parse('a { color: black; z-index: 1 }')
   * const rule = root.first
   *
   * for (const decl of rule.nodes) {
   *   decl.cloneBefore({ prop: '-webkit-' + decl.prop })
   *   // Cycle will be infinite, because cloneBefore moves the current node
   *   // to the next index
   * }
   *
   * rule.each(decl => {
   *   decl.cloneBefore({ prop: '-webkit-' + decl.prop })
   *   // Will be executed only for color and z-index
   * })
   */
  ;

  _proto.each = function each(callback) {
    if (!this.lastEach) this.lastEach = 0;
    if (!this.indexes) this.indexes = {};
    this.lastEach += 1;
    var id = this.lastEach;
    this.indexes[id] = 0;
    if (!this.nodes) return undefined;
    var index, result;

    while (this.indexes[id] < this.nodes.length) {
      index = this.indexes[id];
      result = callback(this.nodes[index], index);
      if (result === false) break;
      this.indexes[id] += 1;
    }

    delete this.indexes[id];
    return result;
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each node.
   *
   * Like container.each(), this method is safe to use
   * if you are mutating arrays during iteration.
   *
   * If you only need to iterate through the container’s immediate children,
   * use {@link Container#each}.
   *
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walk(node => {
   *   // Traverses all descendant nodes.
   * })
   */
  ;

  _proto.walk = function walk(callback) {
    return this.each(function (child, i) {
      var result;

      try {
        result = callback(child, i);
      } catch (e) {
        e.postcssNode = child;

        if (e.stack && child.source && /\n\s{4}at /.test(e.stack)) {
          var s = child.source;
          e.stack = e.stack.replace(/\n\s{4}at /, "$&" + s.input.from + ":" + s.start.line + ":" + s.start.column + "$&");
        }

        throw e;
      }

      if (result !== false && child.walk) {
        result = child.walk(callback);
      }

      return result;
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each declaration node.
   *
   * If you pass a filter, iteration will only happen over declarations
   * with matching properties.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {string|RegExp} [prop]   String or regular expression
   *                                 to filter declarations by property name.
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walkDecls(decl => {
   *   checkPropertySupport(decl.prop)
   * })
   *
   * root.walkDecls('border-radius', decl => {
   *   decl.remove()
   * })
   *
   * root.walkDecls(/^background/, decl => {
   *   decl.value = takeFirstColorFromGradient(decl.value)
   * })
   */
  ;

  _proto.walkDecls = function walkDecls(prop, callback) {
    if (!callback) {
      callback = prop;
      return this.walk(function (child, i) {
        if (child.type === 'decl') {
          return callback(child, i);
        }
      });
    }

    if (prop instanceof RegExp) {
      return this.walk(function (child, i) {
        if (child.type === 'decl' && prop.test(child.prop)) {
          return callback(child, i);
        }
      });
    }

    return this.walk(function (child, i) {
      if (child.type === 'decl' && child.prop === prop) {
        return callback(child, i);
      }
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each rule node.
   *
   * If you pass a filter, iteration will only happen over rules
   * with matching selectors.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {string|RegExp} [selector] String or regular expression
   *                                   to filter rules by selector.
   * @param {childIterator} callback   Iterator receives each node and index.
   *
   * @return {false|undefined} returns `false` if iteration was broke.
   *
   * @example
   * const selectors = []
   * root.walkRules(rule => {
   *   selectors.push(rule.selector)
   * })
   * console.log(`Your CSS uses ${ selectors.length } selectors`)
   */
  ;

  _proto.walkRules = function walkRules(selector, callback) {
    if (!callback) {
      callback = selector;
      return this.walk(function (child, i) {
        if (child.type === 'rule') {
          return callback(child, i);
        }
      });
    }

    if (selector instanceof RegExp) {
      return this.walk(function (child, i) {
        if (child.type === 'rule' && selector.test(child.selector)) {
          return callback(child, i);
        }
      });
    }

    return this.walk(function (child, i) {
      if (child.type === 'rule' && child.selector === selector) {
        return callback(child, i);
      }
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each at-rule node.
   *
   * If you pass a filter, iteration will only happen over at-rules
   * that have matching names.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {string|RegExp} [name]   String or regular expression
   *                                 to filter at-rules by name.
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walkAtRules(rule => {
   *   if (isOld(rule.name)) rule.remove()
   * })
   *
   * let first = false
   * root.walkAtRules('charset', rule => {
   *   if (!first) {
   *     first = true
   *   } else {
   *     rule.remove()
   *   }
   * })
   */
  ;

  _proto.walkAtRules = function walkAtRules(name, callback) {
    if (!callback) {
      callback = name;
      return this.walk(function (child, i) {
        if (child.type === 'atrule') {
          return callback(child, i);
        }
      });
    }

    if (name instanceof RegExp) {
      return this.walk(function (child, i) {
        if (child.type === 'atrule' && name.test(child.name)) {
          return callback(child, i);
        }
      });
    }

    return this.walk(function (child, i) {
      if (child.type === 'atrule' && child.name === name) {
        return callback(child, i);
      }
    });
  }
  /**
   * Traverses the container’s descendant nodes, calling callback
   * for each comment node.
   *
   * Like {@link Container#each}, this method is safe
   * to use if you are mutating arrays during iteration.
   *
   * @param {childIterator} callback Iterator receives each node and index.
   *
   * @return {false|undefined} Returns `false` if iteration was broke.
   *
   * @example
   * root.walkComments(comment => {
   *   comment.remove()
   * })
   */
  ;

  _proto.walkComments = function walkComments(callback) {
    return this.walk(function (child, i) {
      if (child.type === 'comment') {
        return callback(child, i);
      }
    });
  }
  /**
   * Inserts new nodes to the end of the container.
   *
   * @param {...(Node|object|string|Node[])} children New nodes.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * const decl1 = postcss.decl({ prop: 'color', value: 'black' })
   * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' })
   * rule.append(decl1, decl2)
   *
   * root.append({ name: 'charset', params: '"UTF-8"' })  // at-rule
   * root.append({ selector: 'a' })                       // rule
   * rule.append({ prop: 'color', value: 'black' })       // declaration
   * rule.append({ text: 'Comment' })                     // comment
   *
   * root.append('a {}')
   * root.first.append('color: black; z-index: 1')
   */
  ;

  _proto.append = function append() {
    for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }

    for (var _i = 0, _children = children; _i < _children.length; _i++) {
      var child = _children[_i];
      var nodes = this.normalize(child, this.last);

      for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i2 = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i2 >= _iterator.length) break;
          _ref = _iterator[_i2++];
        } else {
          _i2 = _iterator.next();
          if (_i2.done) break;
          _ref = _i2.value;
        }

        var node = _ref;
        this.nodes.push(node);
      }
    }

    return this;
  }
  /**
   * Inserts new nodes to the start of the container.
   *
   * @param {...(Node|object|string|Node[])} children New nodes.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * const decl1 = postcss.decl({ prop: 'color', value: 'black' })
   * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' })
   * rule.prepend(decl1, decl2)
   *
   * root.append({ name: 'charset', params: '"UTF-8"' })  // at-rule
   * root.append({ selector: 'a' })                       // rule
   * rule.append({ prop: 'color', value: 'black' })       // declaration
   * rule.append({ text: 'Comment' })                     // comment
   *
   * root.append('a {}')
   * root.first.append('color: black; z-index: 1')
   */
  ;

  _proto.prepend = function prepend() {
    for (var _len2 = arguments.length, children = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }

    children = children.reverse();

    for (var _iterator2 = children, _isArray2 = Array.isArray(_iterator2), _i3 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i3 >= _iterator2.length) break;
        _ref2 = _iterator2[_i3++];
      } else {
        _i3 = _iterator2.next();
        if (_i3.done) break;
        _ref2 = _i3.value;
      }

      var child = _ref2;
      var nodes = this.normalize(child, this.first, 'prepend').reverse();

      for (var _iterator3 = nodes, _isArray3 = Array.isArray(_iterator3), _i4 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
          if (_i4 >= _iterator3.length) break;
          _ref3 = _iterator3[_i4++];
        } else {
          _i4 = _iterator3.next();
          if (_i4.done) break;
          _ref3 = _i4.value;
        }

        var node = _ref3;
        this.nodes.unshift(node);
      }

      for (var id in this.indexes) {
        this.indexes[id] = this.indexes[id] + nodes.length;
      }
    }

    return this;
  };

  _proto.cleanRaws = function cleanRaws(keepBetween) {
    _Node.prototype.cleanRaws.call(this, keepBetween);

    if (this.nodes) {
      for (var _iterator4 = this.nodes, _isArray4 = Array.isArray(_iterator4), _i5 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
        var _ref4;

        if (_isArray4) {
          if (_i5 >= _iterator4.length) break;
          _ref4 = _iterator4[_i5++];
        } else {
          _i5 = _iterator4.next();
          if (_i5.done) break;
          _ref4 = _i5.value;
        }

        var node = _ref4;
        node.cleanRaws(keepBetween);
      }
    }
  }
  /**
   * Insert new node before old node within the container.
   *
   * @param {Node|number} exist             Child or child’s index.
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * rule.insertBefore(decl, decl.clone({ prop: '-webkit-' + decl.prop }))
   */
  ;

  _proto.insertBefore = function insertBefore(exist, add) {
    exist = this.index(exist);
    var type = exist === 0 ? 'prepend' : false;
    var nodes = this.normalize(add, this.nodes[exist], type).reverse();

    for (var _iterator5 = nodes, _isArray5 = Array.isArray(_iterator5), _i6 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
      var _ref5;

      if (_isArray5) {
        if (_i6 >= _iterator5.length) break;
        _ref5 = _iterator5[_i6++];
      } else {
        _i6 = _iterator5.next();
        if (_i6.done) break;
        _ref5 = _i6.value;
      }

      var node = _ref5;
      this.nodes.splice(exist, 0, node);
    }

    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (exist <= index) {
        this.indexes[id] = index + nodes.length;
      }
    }

    return this;
  }
  /**
   * Insert new node after old node within the container.
   *
   * @param {Node|number} exist             Child or child’s index.
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   */
  ;

  _proto.insertAfter = function insertAfter(exist, add) {
    exist = this.index(exist);
    var nodes = this.normalize(add, this.nodes[exist]).reverse();

    for (var _iterator6 = nodes, _isArray6 = Array.isArray(_iterator6), _i7 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
      var _ref6;

      if (_isArray6) {
        if (_i7 >= _iterator6.length) break;
        _ref6 = _iterator6[_i7++];
      } else {
        _i7 = _iterator6.next();
        if (_i7.done) break;
        _ref6 = _i7.value;
      }

      var node = _ref6;
      this.nodes.splice(exist + 1, 0, node);
    }

    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (exist < index) {
        this.indexes[id] = index + nodes.length;
      }
    }

    return this;
  }
  /**
   * Removes node from the container and cleans the parent properties
   * from the node and its children.
   *
   * @param {Node|number} child Child or child’s index.
   *
   * @return {Node} This node for methods chain
   *
   * @example
   * rule.nodes.length  //=> 5
   * rule.removeChild(decl)
   * rule.nodes.length  //=> 4
   * decl.parent        //=> undefined
   */
  ;

  _proto.removeChild = function removeChild(child) {
    child = this.index(child);
    this.nodes[child].parent = undefined;
    this.nodes.splice(child, 1);
    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (index >= child) {
        this.indexes[id] = index - 1;
      }
    }

    return this;
  }
  /**
   * Removes all children from the container
   * and cleans their parent properties.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * rule.removeAll()
   * rule.nodes.length //=> 0
   */
  ;

  _proto.removeAll = function removeAll() {
    for (var _iterator7 = this.nodes, _isArray7 = Array.isArray(_iterator7), _i8 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
      var _ref7;

      if (_isArray7) {
        if (_i8 >= _iterator7.length) break;
        _ref7 = _iterator7[_i8++];
      } else {
        _i8 = _iterator7.next();
        if (_i8.done) break;
        _ref7 = _i8.value;
      }

      var node = _ref7;
      node.parent = undefined;
    }

    this.nodes = [];
    return this;
  }
  /**
   * Passes all declaration values within the container that match pattern
   * through callback, replacing those values with the returned result
   * of callback.
   *
   * This method is useful if you are using a custom unit or function
   * and need to iterate through all values.
   *
   * @param {string|RegExp} pattern      Replace pattern.
   * @param {object} opts                Options to speed up the search.
   * @param {string|string[]} opts.props An array of property names.
   * @param {string} opts.fast           String that’s used to narrow down
   *                                     values and speed up the regexp search.
   * @param {function|string} callback   String to replace pattern or callback
   *                                     that returns a new value. The callback
   *                                     will receive the same arguments
   *                                     as those passed to a function parameter
   *                                     of `String#replace`.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * root.replaceValues(/\d+rem/, { fast: 'rem' }, string => {
   *   return 15 * parseInt(string) + 'px'
   * })
   */
  ;

  _proto.replaceValues = function replaceValues(pattern, opts, callback) {
    if (!callback) {
      callback = opts;
      opts = {};
    }

    this.walkDecls(function (decl) {
      if (opts.props && opts.props.indexOf(decl.prop) === -1) return;
      if (opts.fast && decl.value.indexOf(opts.fast) === -1) return;
      decl.value = decl.value.replace(pattern, callback);
    });
    return this;
  }
  /**
   * Returns `true` if callback returns `true`
   * for all of the container’s children.
   *
   * @param {childCondition} condition Iterator returns true or false.
   *
   * @return {boolean} Is every child pass condition.
   *
   * @example
   * const noPrefixes = rule.every(i => i.prop[0] !== '-')
   */
  ;

  _proto.every = function every(condition) {
    return this.nodes.every(condition);
  }
  /**
   * Returns `true` if callback returns `true` for (at least) one
   * of the container’s children.
   *
   * @param {childCondition} condition Iterator returns true or false.
   *
   * @return {boolean} Is some child pass condition.
   *
   * @example
   * const hasPrefix = rule.some(i => i.prop[0] === '-')
   */
  ;

  _proto.some = function some(condition) {
    return this.nodes.some(condition);
  }
  /**
   * Returns a `child`’s index within the {@link Container#nodes} array.
   *
   * @param {Node} child Child of the current container.
   *
   * @return {number} Child index.
   *
   * @example
   * rule.index( rule.nodes[2] ) //=> 2
   */
  ;

  _proto.index = function index(child) {
    if (typeof child === 'number') {
      return child;
    }

    return this.nodes.indexOf(child);
  }
  /**
   * The container’s first child.
   *
   * @type {Node}
   *
   * @example
   * rule.first === rules.nodes[0]
   */
  ;

  _proto.normalize = function normalize(nodes, sample) {
    var _this = this;

    if (typeof nodes === 'string') {
      var parse = __webpack_require__(45);

      nodes = cleanSource(parse(nodes).nodes);
    } else if (Array.isArray(nodes)) {
      nodes = nodes.slice(0);

      for (var _iterator8 = nodes, _isArray8 = Array.isArray(_iterator8), _i9 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
        var _ref8;

        if (_isArray8) {
          if (_i9 >= _iterator8.length) break;
          _ref8 = _iterator8[_i9++];
        } else {
          _i9 = _iterator8.next();
          if (_i9.done) break;
          _ref8 = _i9.value;
        }

        var i = _ref8;
        if (i.parent) i.parent.removeChild(i, 'ignore');
      }
    } else if (nodes.type === 'root') {
      nodes = nodes.nodes.slice(0);

      for (var _iterator9 = nodes, _isArray9 = Array.isArray(_iterator9), _i10 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
        var _ref9;

        if (_isArray9) {
          if (_i10 >= _iterator9.length) break;
          _ref9 = _iterator9[_i10++];
        } else {
          _i10 = _iterator9.next();
          if (_i10.done) break;
          _ref9 = _i10.value;
        }

        var _i11 = _ref9;
        if (_i11.parent) _i11.parent.removeChild(_i11, 'ignore');
      }
    } else if (nodes.type) {
      nodes = [nodes];
    } else if (nodes.prop) {
      if (typeof nodes.value === 'undefined') {
        throw new Error('Value field is missed in node creation');
      } else if (typeof nodes.value !== 'string') {
        nodes.value = String(nodes.value);
      }

      nodes = [new _declaration.default(nodes)];
    } else if (nodes.selector) {
      var Rule = __webpack_require__(50);

      nodes = [new Rule(nodes)];
    } else if (nodes.name) {
      var AtRule = __webpack_require__(48);

      nodes = [new AtRule(nodes)];
    } else if (nodes.text) {
      nodes = [new _comment.default(nodes)];
    } else {
      throw new Error('Unknown node type in node creation');
    }

    var processed = nodes.map(function (i) {
      if (i.parent) i.parent.removeChild(i);

      if (typeof i.raws.before === 'undefined') {
        if (sample && typeof sample.raws.before !== 'undefined') {
          i.raws.before = sample.raws.before.replace(/[^\s]/g, '');
        }
      }

      i.parent = _this;
      return i;
    });
    return processed;
  }
  /**
   * @memberof Container#
   * @member {Node[]} nodes An array containing the container’s children.
   *
   * @example
   * const root = postcss.parse('a { color: black }')
   * root.nodes.length           //=> 1
   * root.nodes[0].selector      //=> 'a'
   * root.nodes[0].nodes[0].prop //=> 'color'
   */
  ;

  _createClass(Container, [{
    key: "first",
    get: function get() {
      if (!this.nodes) return undefined;
      return this.nodes[0];
    }
    /**
     * The container’s last child.
     *
     * @type {Node}
     *
     * @example
     * rule.last === rule.nodes[rule.nodes.length - 1]
     */

  }, {
    key: "last",
    get: function get() {
      if (!this.nodes) return undefined;
      return this.nodes[this.nodes.length - 1];
    }
  }]);

  return Container;
}(_node.default);

var _default = Container;
/**
 * @callback childCondition
 * @param {Node} node    Container child.
 * @param {number} index Child index.
 * @param {Node[]} nodes All container children.
 * @return {boolean}
 */

/**
 * @callback childIterator
 * @param {Node} node    Container child.
 * @param {number} index Child index.
 * @return {false|undefined} Returning `false` will break iteration.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lci5lczYiXSwibmFtZXMiOlsiY2xlYW5Tb3VyY2UiLCJub2RlcyIsIm1hcCIsImkiLCJzb3VyY2UiLCJDb250YWluZXIiLCJwdXNoIiwiY2hpbGQiLCJwYXJlbnQiLCJlYWNoIiwiY2FsbGJhY2siLCJsYXN0RWFjaCIsImluZGV4ZXMiLCJpZCIsInVuZGVmaW5lZCIsImluZGV4IiwicmVzdWx0IiwibGVuZ3RoIiwid2FsayIsImUiLCJwb3N0Y3NzTm9kZSIsInN0YWNrIiwidGVzdCIsInMiLCJyZXBsYWNlIiwiaW5wdXQiLCJmcm9tIiwic3RhcnQiLCJsaW5lIiwiY29sdW1uIiwid2Fsa0RlY2xzIiwicHJvcCIsInR5cGUiLCJSZWdFeHAiLCJ3YWxrUnVsZXMiLCJzZWxlY3RvciIsIndhbGtBdFJ1bGVzIiwibmFtZSIsIndhbGtDb21tZW50cyIsImFwcGVuZCIsImNoaWxkcmVuIiwibm9ybWFsaXplIiwibGFzdCIsIm5vZGUiLCJwcmVwZW5kIiwicmV2ZXJzZSIsImZpcnN0IiwidW5zaGlmdCIsImNsZWFuUmF3cyIsImtlZXBCZXR3ZWVuIiwiaW5zZXJ0QmVmb3JlIiwiZXhpc3QiLCJhZGQiLCJzcGxpY2UiLCJpbnNlcnRBZnRlciIsInJlbW92ZUNoaWxkIiwicmVtb3ZlQWxsIiwicmVwbGFjZVZhbHVlcyIsInBhdHRlcm4iLCJvcHRzIiwiZGVjbCIsInByb3BzIiwiaW5kZXhPZiIsImZhc3QiLCJ2YWx1ZSIsImV2ZXJ5IiwiY29uZGl0aW9uIiwic29tZSIsInNhbXBsZSIsInBhcnNlIiwicmVxdWlyZSIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwiRXJyb3IiLCJTdHJpbmciLCJEZWNsYXJhdGlvbiIsIlJ1bGUiLCJBdFJ1bGUiLCJ0ZXh0IiwiQ29tbWVudCIsInByb2Nlc3NlZCIsInJhd3MiLCJiZWZvcmUiLCJOb2RlIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOztBQUNBOzs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFz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QVA7QUFDakIsYUFBTyxLQUFLYixLQUFMLENBQVcsQ0FBWCxDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7d0JBUVk7QUFDVixVQUFJLENBQUMsS0FBS0EsS0FBVixFQUFpQixPQUFPYSxTQUFQO0FBQ2pCLGFBQU8sS0FBS2IsS0FBTCxDQUFXLEtBQUtBLEtBQUwsQ0FBV2dCLE1BQVgsR0FBb0IsQ0FBL0IsQ0FBUDtBQUNEOzs7O0VBaGpCcUJtRSxhOztlQSttQlQvRSxTO0FBRWY7Ozs7Ozs7O0FBUUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVjbGFyYXRpb24gZnJvbSAnLi9kZWNsYXJhdGlvbidcbmltcG9ydCBDb21tZW50IGZyb20gJy4vY29tbWVudCdcbmltcG9ydCBOb2RlIGZyb20gJy4vbm9kZSdcblxuZnVuY3Rpb24gY2xlYW5Tb3VyY2UgKG5vZGVzKSB7XG4gIHJldHVybiBub2Rlcy5tYXAoaSA9PiB7XG4gICAgaWYgKGkubm9kZXMpIGkubm9kZXMgPSBjbGVhblNvdXJjZShpLm5vZGVzKVxuICAgIGRlbGV0ZSBpLnNvdXJjZVxuICAgIHJldHVybiBpXG4gIH0pXG59XG5cbi8qKlxuICogVGhlIHtAbGluayBSb290fSwge0BsaW5rIEF0UnVsZX0sIGFuZCB7QGxpbmsgUnVsZX0gY29udGFpbmVyIG5vZGVzXG4gKiBpbmhlcml0IHNvbWUgY29tbW9uIG1ldGhvZHMgdG8gaGVscCB3b3JrIHdpdGggdGhlaXIgY2hpbGRyZW4uXG4gKlxuICogTm90ZSB0aGF0IGFsbCBjb250YWluZXJzIGNhbiBzdG9yZSBhbnkgY29udGVudC4gSWYgeW91IHdyaXRlIGEgcnVsZSBpbnNpZGVcbiAqIGEgcnVsZSwgUG9zdENTUyB3aWxsIHBhcnNlIGl0LlxuICpcbiAqIEBleHRlbmRzIE5vZGVcbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBOb2RlIHtcbiAgcHVzaCAoY2hpbGQpIHtcbiAgICBjaGlsZC5wYXJlbnQgPSB0aGlzXG4gICAgdGhpcy5ub2Rlcy5wdXNoKGNoaWxkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogSXRlcmF0ZXMgdGhyb3VnaCB0aGUgY29udGFpbmVy4oCZcyBpbW1lZGlhdGUgY2hpbGRyZW4sXG4gICAqIGNhbGxpbmcgYGNhbGxiYWNrYCBmb3IgZWFjaCBjaGlsZC5cbiAgICpcbiAgICogUmV0dXJuaW5nIGBmYWxzZWAgaW4gdGhlIGNhbGxiYWNrIHdpbGwgYnJlYWsgaXRlcmF0aW9uLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBvbmx5IGl0ZXJhdGVzIHRocm91Z2ggdGhlIGNvbnRhaW5lcuKAmXMgaW1tZWRpYXRlIGNoaWxkcmVuLlxuICAgKiBJZiB5b3UgbmVlZCB0byByZWN1cnNpdmVseSBpdGVyYXRlIHRocm91Z2ggYWxsIHRoZSBjb250YWluZXLigJlzIGRlc2NlbmRhbnRcbiAgICogbm9kZXMsIHVzZSB7QGxpbmsgQ29udGFpbmVyI3dhbGt9LlxuICAgKlxuICAgKiBVbmxpa2UgdGhlIGZvciBge31gLWN5Y2xlIG9yIGBBcnJheSNmb3JFYWNoYCB0aGlzIGl0ZXJhdG9yIGlzIHNhZmVcbiAgICogaWYgeW91IGFyZSBtdXRhdGluZyB0aGUgYXJyYXkgb2YgY2hpbGQgbm9kZXMgZHVyaW5nIGl0ZXJhdGlvbi5cbiAgICogUG9zdENTUyB3aWxsIGFkanVzdCB0aGUgY3VycmVudCBpbmRleCB0byBtYXRjaCB0aGUgbXV0YXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge2NoaWxkSXRlcmF0b3J9IGNhbGxiYWNrIEl0ZXJhdG9yIHJlY2VpdmVzIGVhY2ggbm9kZSBhbmQgaW5kZXguXG4gICAqXG4gICAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH0gUmV0dXJucyBgZmFsc2VgIGlmIGl0ZXJhdGlvbiB3YXMgYnJva2UuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrOyB6LWluZGV4OiAxIH0nKVxuICAgKiBjb25zdCBydWxlID0gcm9vdC5maXJzdFxuICAgKlxuICAgKiBmb3IgKGNvbnN0IGRlY2wgb2YgcnVsZS5ub2Rlcykge1xuICAgKiAgIGRlY2wuY2xvbmVCZWZvcmUoeyBwcm9wOiAnLXdlYmtpdC0nICsgZGVjbC5wcm9wIH0pXG4gICAqICAgLy8gQ3ljbGUgd2lsbCBiZSBpbmZpbml0ZSwgYmVjYXVzZSBjbG9uZUJlZm9yZSBtb3ZlcyB0aGUgY3VycmVudCBub2RlXG4gICAqICAgLy8gdG8gdGhlIG5leHQgaW5kZXhcbiAgICogfVxuICAgKlxuICAgKiBydWxlLmVhY2goZGVjbCA9PiB7XG4gICAqICAgZGVjbC5jbG9uZUJlZm9yZSh7IHByb3A6ICctd2Via2l0LScgKyBkZWNsLnByb3AgfSlcbiAgICogICAvLyBXaWxsIGJlIGV4ZWN1dGVkIG9ubHkgZm9yIGNvbG9yIGFuZCB6LWluZGV4XG4gICAqIH0pXG4gICAqL1xuICBlYWNoIChjYWxsYmFjaykge1xuICAgIGlmICghdGhpcy5sYXN0RWFjaCkgdGhpcy5sYXN0RWFjaCA9IDBcbiAgICBpZiAoIXRoaXMuaW5kZXhlcykgdGhpcy5pbmRleGVzID0geyB9XG5cbiAgICB0aGlzLmxhc3RFYWNoICs9IDFcbiAgICBsZXQgaWQgPSB0aGlzLmxhc3RFYWNoXG4gICAgdGhpcy5pbmRleGVzW2lkXSA9IDBcblxuICAgIGlmICghdGhpcy5ub2RlcykgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgbGV0IGluZGV4LCByZXN1bHRcbiAgICB3aGlsZSAodGhpcy5pbmRleGVzW2lkXSA8IHRoaXMubm9kZXMubGVuZ3RoKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF1cbiAgICAgIHJlc3VsdCA9IGNhbGxiYWNrKHRoaXMubm9kZXNbaW5kZXhdLCBpbmRleClcbiAgICAgIGlmIChyZXN1bHQgPT09IGZhbHNlKSBicmVha1xuXG4gICAgICB0aGlzLmluZGV4ZXNbaWRdICs9IDFcbiAgICB9XG5cbiAgICBkZWxldGUgdGhpcy5pbmRleGVzW2lkXVxuXG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLyoqXG4gICAqIFRyYXZlcnNlcyB0aGUgY29udGFpbmVy4oCZcyBkZXNjZW5kYW50IG5vZGVzLCBjYWxsaW5nIGNhbGxiYWNrXG4gICAqIGZvciBlYWNoIG5vZGUuXG4gICAqXG4gICAqIExpa2UgY29udGFpbmVyLmVhY2goKSwgdGhpcyBtZXRob2QgaXMgc2FmZSB0byB1c2VcbiAgICogaWYgeW91IGFyZSBtdXRhdGluZyBhcnJheXMgZHVyaW5nIGl0ZXJhdGlvbi5cbiAgICpcbiAgICogSWYgeW91IG9ubHkgbmVlZCB0byBpdGVyYXRlIHRocm91Z2ggdGhlIGNvbnRhaW5lcuKAmXMgaW1tZWRpYXRlIGNoaWxkcmVuLFxuICAgKiB1c2Uge0BsaW5rIENvbnRhaW5lciNlYWNofS5cbiAgICpcbiAgICogQHBhcmFtIHtjaGlsZEl0ZXJhdG9yfSBjYWxsYmFjayBJdGVyYXRvciByZWNlaXZlcyBlYWNoIG5vZGUgYW5kIGluZGV4LlxuICAgKlxuICAgKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9IFJldHVybnMgYGZhbHNlYCBpZiBpdGVyYXRpb24gd2FzIGJyb2tlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByb290LndhbGsobm9kZSA9PiB7XG4gICAqICAgLy8gVHJhdmVyc2VzIGFsbCBkZXNjZW5kYW50IG5vZGVzLlxuICAgKiB9KVxuICAgKi9cbiAgd2FsayAoY2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKChjaGlsZCwgaSkgPT4ge1xuICAgICAgbGV0IHJlc3VsdFxuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0ID0gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGUucG9zdGNzc05vZGUgPSBjaGlsZFxuICAgICAgICBpZiAoZS5zdGFjayAmJiBjaGlsZC5zb3VyY2UgJiYgL1xcblxcc3s0fWF0IC8udGVzdChlLnN0YWNrKSkge1xuICAgICAgICAgIGxldCBzID0gY2hpbGQuc291cmNlXG4gICAgICAgICAgZS5zdGFjayA9IGUuc3RhY2sucmVwbGFjZSgvXFxuXFxzezR9YXQgLyxcbiAgICAgICAgICAgIGAkJiR7IHMuaW5wdXQuZnJvbSB9OiR7IHMuc3RhcnQubGluZSB9OiR7IHMuc3RhcnQuY29sdW1uIH0kJmApXG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgZVxuICAgICAgfVxuICAgICAgaWYgKHJlc3VsdCAhPT0gZmFsc2UgJiYgY2hpbGQud2Fsaykge1xuICAgICAgICByZXN1bHQgPSBjaGlsZC53YWxrKGNhbGxiYWNrKVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVHJhdmVyc2VzIHRoZSBjb250YWluZXLigJlzIGRlc2NlbmRhbnQgbm9kZXMsIGNhbGxpbmcgY2FsbGJhY2tcbiAgICogZm9yIGVhY2ggZGVjbGFyYXRpb24gbm9kZS5cbiAgICpcbiAgICogSWYgeW91IHBhc3MgYSBmaWx0ZXIsIGl0ZXJhdGlvbiB3aWxsIG9ubHkgaGFwcGVuIG92ZXIgZGVjbGFyYXRpb25zXG4gICAqIHdpdGggbWF0Y2hpbmcgcHJvcGVydGllcy5cbiAgICpcbiAgICogTGlrZSB7QGxpbmsgQ29udGFpbmVyI2VhY2h9LCB0aGlzIG1ldGhvZCBpcyBzYWZlXG4gICAqIHRvIHVzZSBpZiB5b3UgYXJlIG11dGF0aW5nIGFycmF5cyBkdXJpbmcgaXRlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB9IFtwcm9wXSAgIFN0cmluZyBvciByZWd1bGFyIGV4cHJlc3Npb25cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBmaWx0ZXIgZGVjbGFyYXRpb25zIGJ5IHByb3BlcnR5IG5hbWUuXG4gICAqIEBwYXJhbSB7Y2hpbGRJdGVyYXRvcn0gY2FsbGJhY2sgSXRlcmF0b3IgcmVjZWl2ZXMgZWFjaCBub2RlIGFuZCBpbmRleC5cbiAgICpcbiAgICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfSBSZXR1cm5zIGBmYWxzZWAgaWYgaXRlcmF0aW9uIHdhcyBicm9rZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcm9vdC53YWxrRGVjbHMoZGVjbCA9PiB7XG4gICAqICAgY2hlY2tQcm9wZXJ0eVN1cHBvcnQoZGVjbC5wcm9wKVxuICAgKiB9KVxuICAgKlxuICAgKiByb290LndhbGtEZWNscygnYm9yZGVyLXJhZGl1cycsIGRlY2wgPT4ge1xuICAgKiAgIGRlY2wucmVtb3ZlKClcbiAgICogfSlcbiAgICpcbiAgICogcm9vdC53YWxrRGVjbHMoL15iYWNrZ3JvdW5kLywgZGVjbCA9PiB7XG4gICAqICAgZGVjbC52YWx1ZSA9IHRha2VGaXJzdENvbG9yRnJvbUdyYWRpZW50KGRlY2wudmFsdWUpXG4gICAqIH0pXG4gICAqL1xuICB3YWxrRGVjbHMgKHByb3AsIGNhbGxiYWNrKSB7XG4gICAgaWYgKCFjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2sgPSBwcm9wXG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2RlY2wnKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICBpZiAocHJvcCBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdkZWNsJyAmJiBwcm9wLnRlc3QoY2hpbGQucHJvcCkpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2RlY2wnICYmIGNoaWxkLnByb3AgPT09IHByb3ApIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVHJhdmVyc2VzIHRoZSBjb250YWluZXLigJlzIGRlc2NlbmRhbnQgbm9kZXMsIGNhbGxpbmcgY2FsbGJhY2tcbiAgICogZm9yIGVhY2ggcnVsZSBub2RlLlxuICAgKlxuICAgKiBJZiB5b3UgcGFzcyBhIGZpbHRlciwgaXRlcmF0aW9uIHdpbGwgb25seSBoYXBwZW4gb3ZlciBydWxlc1xuICAgKiB3aXRoIG1hdGNoaW5nIHNlbGVjdG9ycy5cbiAgICpcbiAgICogTGlrZSB7QGxpbmsgQ29udGFpbmVyI2VhY2h9LCB0aGlzIG1ldGhvZCBpcyBzYWZlXG4gICAqIHRvIHVzZSBpZiB5b3UgYXJlIG11dGF0aW5nIGFycmF5cyBkdXJpbmcgaXRlcmF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB9IFtzZWxlY3Rvcl0gU3RyaW5nIG9yIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gZmlsdGVyIHJ1bGVzIGJ5IHNlbGVjdG9yLlxuICAgKiBAcGFyYW0ge2NoaWxkSXRlcmF0b3J9IGNhbGxiYWNrICAgSXRlcmF0b3IgcmVjZWl2ZXMgZWFjaCBub2RlIGFuZCBpbmRleC5cbiAgICpcbiAgICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfSByZXR1cm5zIGBmYWxzZWAgaWYgaXRlcmF0aW9uIHdhcyBicm9rZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgc2VsZWN0b3JzID0gW11cbiAgICogcm9vdC53YWxrUnVsZXMocnVsZSA9PiB7XG4gICAqICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zZWxlY3RvcilcbiAgICogfSlcbiAgICogY29uc29sZS5sb2coYFlvdXIgQ1NTIHVzZXMgJHsgc2VsZWN0b3JzLmxlbmd0aCB9IHNlbGVjdG9yc2ApXG4gICAqL1xuICB3YWxrUnVsZXMgKHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gc2VsZWN0b3JcblxuICAgICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdydWxlJykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ3J1bGUnICYmIHNlbGVjdG9yLnRlc3QoY2hpbGQuc2VsZWN0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy53YWxrKChjaGlsZCwgaSkgPT4ge1xuICAgICAgaWYgKGNoaWxkLnR5cGUgPT09ICdydWxlJyAmJiBjaGlsZC5zZWxlY3RvciA9PT0gc2VsZWN0b3IpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogVHJhdmVyc2VzIHRoZSBjb250YWluZXLigJlzIGRlc2NlbmRhbnQgbm9kZXMsIGNhbGxpbmcgY2FsbGJhY2tcbiAgICogZm9yIGVhY2ggYXQtcnVsZSBub2RlLlxuICAgKlxuICAgKiBJZiB5b3UgcGFzcyBhIGZpbHRlciwgaXRlcmF0aW9uIHdpbGwgb25seSBoYXBwZW4gb3ZlciBhdC1ydWxlc1xuICAgKiB0aGF0IGhhdmUgbWF0Y2hpbmcgbmFtZXMuXG4gICAqXG4gICAqIExpa2Uge0BsaW5rIENvbnRhaW5lciNlYWNofSwgdGhpcyBtZXRob2QgaXMgc2FmZVxuICAgKiB0byB1c2UgaWYgeW91IGFyZSBtdXRhdGluZyBhcnJheXMgZHVyaW5nIGl0ZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfSBbbmFtZV0gICBTdHJpbmcgb3IgcmVndWxhciBleHByZXNzaW9uXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gZmlsdGVyIGF0LXJ1bGVzIGJ5IG5hbWUuXG4gICAqIEBwYXJhbSB7Y2hpbGRJdGVyYXRvcn0gY2FsbGJhY2sgSXRlcmF0b3IgcmVjZWl2ZXMgZWFjaCBub2RlIGFuZCBpbmRleC5cbiAgICpcbiAgICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfSBSZXR1cm5zIGBmYWxzZWAgaWYgaXRlcmF0aW9uIHdhcyBicm9rZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcm9vdC53YWxrQXRSdWxlcyhydWxlID0+IHtcbiAgICogICBpZiAoaXNPbGQocnVsZS5uYW1lKSkgcnVsZS5yZW1vdmUoKVxuICAgKiB9KVxuICAgKlxuICAgKiBsZXQgZmlyc3QgPSBmYWxzZVxuICAgKiByb290LndhbGtBdFJ1bGVzKCdjaGFyc2V0JywgcnVsZSA9PiB7XG4gICAqICAgaWYgKCFmaXJzdCkge1xuICAgKiAgICAgZmlyc3QgPSB0cnVlXG4gICAqICAgfSBlbHNlIHtcbiAgICogICAgIHJ1bGUucmVtb3ZlKClcbiAgICogICB9XG4gICAqIH0pXG4gICAqL1xuICB3YWxrQXRSdWxlcyAobmFtZSwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjayA9IG5hbWVcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnYXRydWxlJykge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gICAgaWYgKG5hbWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgIGlmIChjaGlsZC50eXBlID09PSAnYXRydWxlJyAmJiBuYW1lLnRlc3QoY2hpbGQubmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiB0aGlzLndhbGsoKGNoaWxkLCBpKSA9PiB7XG4gICAgICBpZiAoY2hpbGQudHlwZSA9PT0gJ2F0cnVsZScgJiYgY2hpbGQubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmF2ZXJzZXMgdGhlIGNvbnRhaW5lcuKAmXMgZGVzY2VuZGFudCBub2RlcywgY2FsbGluZyBjYWxsYmFja1xuICAgKiBmb3IgZWFjaCBjb21tZW50IG5vZGUuXG4gICAqXG4gICAqIExpa2Uge0BsaW5rIENvbnRhaW5lciNlYWNofSwgdGhpcyBtZXRob2QgaXMgc2FmZVxuICAgKiB0byB1c2UgaWYgeW91IGFyZSBtdXRhdGluZyBhcnJheXMgZHVyaW5nIGl0ZXJhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtjaGlsZEl0ZXJhdG9yfSBjYWxsYmFjayBJdGVyYXRvciByZWNlaXZlcyBlYWNoIG5vZGUgYW5kIGluZGV4LlxuICAgKlxuICAgKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9IFJldHVybnMgYGZhbHNlYCBpZiBpdGVyYXRpb24gd2FzIGJyb2tlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiByb290LndhbGtDb21tZW50cyhjb21tZW50ID0+IHtcbiAgICogICBjb21tZW50LnJlbW92ZSgpXG4gICAqIH0pXG4gICAqL1xuICB3YWxrQ29tbWVudHMgKGNhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMud2FsaygoY2hpbGQsIGkpID0+IHtcbiAgICAgIGlmIChjaGlsZC50eXBlID09PSAnY29tbWVudCcpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0cyBuZXcgbm9kZXMgdG8gdGhlIGVuZCBvZiB0aGUgY29udGFpbmVyLlxuICAgKlxuICAgKiBAcGFyYW0gey4uLihOb2RlfG9iamVjdHxzdHJpbmd8Tm9kZVtdKX0gY2hpbGRyZW4gTmV3IG5vZGVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IGRlY2wxID0gcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSlcbiAgICogY29uc3QgZGVjbDIgPSBwb3N0Y3NzLmRlY2woeyBwcm9wOiAnYmFja2dyb3VuZC1jb2xvcicsIHZhbHVlOiAnd2hpdGUnIH0pXG4gICAqIHJ1bGUuYXBwZW5kKGRlY2wxLCBkZWNsMilcbiAgICpcbiAgICogcm9vdC5hcHBlbmQoeyBuYW1lOiAnY2hhcnNldCcsIHBhcmFtczogJ1wiVVRGLThcIicgfSkgIC8vIGF0LXJ1bGVcbiAgICogcm9vdC5hcHBlbmQoeyBzZWxlY3RvcjogJ2EnIH0pICAgICAgICAgICAgICAgICAgICAgICAvLyBydWxlXG4gICAqIHJ1bGUuYXBwZW5kKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSkgICAgICAgLy8gZGVjbGFyYXRpb25cbiAgICogcnVsZS5hcHBlbmQoeyB0ZXh0OiAnQ29tbWVudCcgfSkgICAgICAgICAgICAgICAgICAgICAvLyBjb21tZW50XG4gICAqXG4gICAqIHJvb3QuYXBwZW5kKCdhIHt9JylcbiAgICogcm9vdC5maXJzdC5hcHBlbmQoJ2NvbG9yOiBibGFjazsgei1pbmRleDogMScpXG4gICAqL1xuICBhcHBlbmQgKC4uLmNoaWxkcmVuKSB7XG4gICAgZm9yIChsZXQgY2hpbGQgb2YgY2hpbGRyZW4pIHtcbiAgICAgIGxldCBub2RlcyA9IHRoaXMubm9ybWFsaXplKGNoaWxkLCB0aGlzLmxhc3QpXG4gICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLm5vZGVzLnB1c2gobm9kZSlcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnRzIG5ldyBub2RlcyB0byB0aGUgc3RhcnQgb2YgdGhlIGNvbnRhaW5lci5cbiAgICpcbiAgICogQHBhcmFtIHsuLi4oTm9kZXxvYmplY3R8c3RyaW5nfE5vZGVbXSl9IGNoaWxkcmVuIE5ldyBub2Rlcy5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBkZWNsMSA9IHBvc3Rjc3MuZGVjbCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAnYmxhY2snIH0pXG4gICAqIGNvbnN0IGRlY2wyID0gcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2JhY2tncm91bmQtY29sb3InLCB2YWx1ZTogJ3doaXRlJyB9KVxuICAgKiBydWxlLnByZXBlbmQoZGVjbDEsIGRlY2wyKVxuICAgKlxuICAgKiByb290LmFwcGVuZCh7IG5hbWU6ICdjaGFyc2V0JywgcGFyYW1zOiAnXCJVVEYtOFwiJyB9KSAgLy8gYXQtcnVsZVxuICAgKiByb290LmFwcGVuZCh7IHNlbGVjdG9yOiAnYScgfSkgICAgICAgICAgICAgICAgICAgICAgIC8vIHJ1bGVcbiAgICogcnVsZS5hcHBlbmQoeyBwcm9wOiAnY29sb3InLCB2YWx1ZTogJ2JsYWNrJyB9KSAgICAgICAvLyBkZWNsYXJhdGlvblxuICAgKiBydWxlLmFwcGVuZCh7IHRleHQ6ICdDb21tZW50JyB9KSAgICAgICAgICAgICAgICAgICAgIC8vIGNvbW1lbnRcbiAgICpcbiAgICogcm9vdC5hcHBlbmQoJ2Ege30nKVxuICAgKiByb290LmZpcnN0LmFwcGVuZCgnY29sb3I6IGJsYWNrOyB6LWluZGV4OiAxJylcbiAgICovXG4gIHByZXBlbmQgKC4uLmNoaWxkcmVuKSB7XG4gICAgY2hpbGRyZW4gPSBjaGlsZHJlbi5yZXZlcnNlKClcbiAgICBmb3IgKGxldCBjaGlsZCBvZiBjaGlsZHJlbikge1xuICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoY2hpbGQsIHRoaXMuZmlyc3QsICdwcmVwZW5kJykucmV2ZXJzZSgpXG4gICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLm5vZGVzLnVuc2hpZnQobm9kZSlcbiAgICAgIGZvciAobGV0IGlkIGluIHRoaXMuaW5kZXhlcykge1xuICAgICAgICB0aGlzLmluZGV4ZXNbaWRdID0gdGhpcy5pbmRleGVzW2lkXSArIG5vZGVzLmxlbmd0aFxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgY2xlYW5SYXdzIChrZWVwQmV0d2Vlbikge1xuICAgIHN1cGVyLmNsZWFuUmF3cyhrZWVwQmV0d2VlbilcbiAgICBpZiAodGhpcy5ub2Rlcykge1xuICAgICAgZm9yIChsZXQgbm9kZSBvZiB0aGlzLm5vZGVzKSBub2RlLmNsZWFuUmF3cyhrZWVwQmV0d2VlbilcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5zZXJ0IG5ldyBub2RlIGJlZm9yZSBvbGQgbm9kZSB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfG51bWJlcn0gZXhpc3QgICAgICAgICAgICAgQ2hpbGQgb3IgY2hpbGTigJlzIGluZGV4LlxuICAgKiBAcGFyYW0ge05vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW119IGFkZCBOZXcgbm9kZS5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBydWxlLmluc2VydEJlZm9yZShkZWNsLCBkZWNsLmNsb25lKHsgcHJvcDogJy13ZWJraXQtJyArIGRlY2wucHJvcCB9KSlcbiAgICovXG4gIGluc2VydEJlZm9yZSAoZXhpc3QsIGFkZCkge1xuICAgIGV4aXN0ID0gdGhpcy5pbmRleChleGlzdClcblxuICAgIGxldCB0eXBlID0gZXhpc3QgPT09IDAgPyAncHJlcGVuZCcgOiBmYWxzZVxuICAgIGxldCBub2RlcyA9IHRoaXMubm9ybWFsaXplKGFkZCwgdGhpcy5ub2Rlc1tleGlzdF0sIHR5cGUpLnJldmVyc2UoKVxuICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHRoaXMubm9kZXMuc3BsaWNlKGV4aXN0LCAwLCBub2RlKVxuXG4gICAgbGV0IGluZGV4XG4gICAgZm9yIChsZXQgaWQgaW4gdGhpcy5pbmRleGVzKSB7XG4gICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF1cbiAgICAgIGlmIChleGlzdCA8PSBpbmRleCkge1xuICAgICAgICB0aGlzLmluZGV4ZXNbaWRdID0gaW5kZXggKyBub2Rlcy5sZW5ndGhcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBuZXcgbm9kZSBhZnRlciBvbGQgbm9kZSB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfG51bWJlcn0gZXhpc3QgICAgICAgICAgICAgQ2hpbGQgb3IgY2hpbGTigJlzIGluZGV4LlxuICAgKiBAcGFyYW0ge05vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW119IGFkZCBOZXcgbm9kZS5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKi9cbiAgaW5zZXJ0QWZ0ZXIgKGV4aXN0LCBhZGQpIHtcbiAgICBleGlzdCA9IHRoaXMuaW5kZXgoZXhpc3QpXG5cbiAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShhZGQsIHRoaXMubm9kZXNbZXhpc3RdKS5yZXZlcnNlKClcbiAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB0aGlzLm5vZGVzLnNwbGljZShleGlzdCArIDEsIDAsIG5vZGUpXG5cbiAgICBsZXQgaW5kZXhcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2lkXVxuICAgICAgaWYgKGV4aXN0IDwgaW5kZXgpIHtcbiAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4ICsgbm9kZXMubGVuZ3RoXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIG5vZGUgZnJvbSB0aGUgY29udGFpbmVyIGFuZCBjbGVhbnMgdGhlIHBhcmVudCBwcm9wZXJ0aWVzXG4gICAqIGZyb20gdGhlIG5vZGUgYW5kIGl0cyBjaGlsZHJlbi5cbiAgICpcbiAgICogQHBhcmFtIHtOb2RlfG51bWJlcn0gY2hpbGQgQ2hpbGQgb3IgY2hpbGTigJlzIGluZGV4LlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcnVsZS5ub2Rlcy5sZW5ndGggIC8vPT4gNVxuICAgKiBydWxlLnJlbW92ZUNoaWxkKGRlY2wpXG4gICAqIHJ1bGUubm9kZXMubGVuZ3RoICAvLz0+IDRcbiAgICogZGVjbC5wYXJlbnQgICAgICAgIC8vPT4gdW5kZWZpbmVkXG4gICAqL1xuICByZW1vdmVDaGlsZCAoY2hpbGQpIHtcbiAgICBjaGlsZCA9IHRoaXMuaW5kZXgoY2hpbGQpXG4gICAgdGhpcy5ub2Rlc1tjaGlsZF0ucGFyZW50ID0gdW5kZWZpbmVkXG4gICAgdGhpcy5ub2Rlcy5zcGxpY2UoY2hpbGQsIDEpXG5cbiAgICBsZXQgaW5kZXhcbiAgICBmb3IgKGxldCBpZCBpbiB0aGlzLmluZGV4ZXMpIHtcbiAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2lkXVxuICAgICAgaWYgKGluZGV4ID49IGNoaWxkKSB7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleCAtIDFcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGNoaWxkcmVuIGZyb20gdGhlIGNvbnRhaW5lclxuICAgKiBhbmQgY2xlYW5zIHRoZWlyIHBhcmVudCBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJ1bGUucmVtb3ZlQWxsKClcbiAgICogcnVsZS5ub2Rlcy5sZW5ndGggLy89PiAwXG4gICAqL1xuICByZW1vdmVBbGwgKCkge1xuICAgIGZvciAobGV0IG5vZGUgb2YgdGhpcy5ub2Rlcykgbm9kZS5wYXJlbnQgPSB1bmRlZmluZWRcbiAgICB0aGlzLm5vZGVzID0gW11cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIFBhc3NlcyBhbGwgZGVjbGFyYXRpb24gdmFsdWVzIHdpdGhpbiB0aGUgY29udGFpbmVyIHRoYXQgbWF0Y2ggcGF0dGVyblxuICAgKiB0aHJvdWdoIGNhbGxiYWNrLCByZXBsYWNpbmcgdGhvc2UgdmFsdWVzIHdpdGggdGhlIHJldHVybmVkIHJlc3VsdFxuICAgKiBvZiBjYWxsYmFjay5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgdXNlZnVsIGlmIHlvdSBhcmUgdXNpbmcgYSBjdXN0b20gdW5pdCBvciBmdW5jdGlvblxuICAgKiBhbmQgbmVlZCB0byBpdGVyYXRlIHRocm91Z2ggYWxsIHZhbHVlcy5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfSBwYXR0ZXJuICAgICAgUmVwbGFjZSBwYXR0ZXJuLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0cyAgICAgICAgICAgICAgICBPcHRpb25zIHRvIHNwZWVkIHVwIHRoZSBzZWFyY2guXG4gICAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBvcHRzLnByb3BzIEFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5mYXN0ICAgICAgICAgICBTdHJpbmcgdGhhdOKAmXMgdXNlZCB0byBuYXJyb3cgZG93blxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZXMgYW5kIHNwZWVkIHVwIHRoZSByZWdleHAgc2VhcmNoLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufHN0cmluZ30gY2FsbGJhY2sgICBTdHJpbmcgdG8gcmVwbGFjZSBwYXR0ZXJuIG9yIGNhbGxiYWNrXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgcmV0dXJucyBhIG5ldyB2YWx1ZS4gVGhlIGNhbGxiYWNrXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbGwgcmVjZWl2ZSB0aGUgc2FtZSBhcmd1bWVudHNcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXMgdGhvc2UgcGFzc2VkIHRvIGEgZnVuY3Rpb24gcGFyYW1ldGVyXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mIGBTdHJpbmcjcmVwbGFjZWAuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IFRoaXMgbm9kZSBmb3IgbWV0aG9kcyBjaGFpbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcm9vdC5yZXBsYWNlVmFsdWVzKC9cXGQrcmVtLywgeyBmYXN0OiAncmVtJyB9LCBzdHJpbmcgPT4ge1xuICAgKiAgIHJldHVybiAxNSAqIHBhcnNlSW50KHN0cmluZykgKyAncHgnXG4gICAqIH0pXG4gICAqL1xuICByZXBsYWNlVmFsdWVzIChwYXR0ZXJuLCBvcHRzLCBjYWxsYmFjaykge1xuICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgIGNhbGxiYWNrID0gb3B0c1xuICAgICAgb3B0cyA9IHsgfVxuICAgIH1cblxuICAgIHRoaXMud2Fsa0RlY2xzKGRlY2wgPT4ge1xuICAgICAgaWYgKG9wdHMucHJvcHMgJiYgb3B0cy5wcm9wcy5pbmRleE9mKGRlY2wucHJvcCkgPT09IC0xKSByZXR1cm5cbiAgICAgIGlmIChvcHRzLmZhc3QgJiYgZGVjbC52YWx1ZS5pbmRleE9mKG9wdHMuZmFzdCkgPT09IC0xKSByZXR1cm5cblxuICAgICAgZGVjbC52YWx1ZSA9IGRlY2wudmFsdWUucmVwbGFjZShwYXR0ZXJuLCBjYWxsYmFjaylcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBjYWxsYmFjayByZXR1cm5zIGB0cnVlYFxuICAgKiBmb3IgYWxsIG9mIHRoZSBjb250YWluZXLigJlzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAcGFyYW0ge2NoaWxkQ29uZGl0aW9ufSBjb25kaXRpb24gSXRlcmF0b3IgcmV0dXJucyB0cnVlIG9yIGZhbHNlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBldmVyeSBjaGlsZCBwYXNzIGNvbmRpdGlvbi5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgbm9QcmVmaXhlcyA9IHJ1bGUuZXZlcnkoaSA9PiBpLnByb3BbMF0gIT09ICctJylcbiAgICovXG4gIGV2ZXJ5IChjb25kaXRpb24pIHtcbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5ldmVyeShjb25kaXRpb24pXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBgdHJ1ZWAgaWYgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIChhdCBsZWFzdCkgb25lXG4gICAqIG9mIHRoZSBjb250YWluZXLigJlzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAcGFyYW0ge2NoaWxkQ29uZGl0aW9ufSBjb25kaXRpb24gSXRlcmF0b3IgcmV0dXJucyB0cnVlIG9yIGZhbHNlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBzb21lIGNoaWxkIHBhc3MgY29uZGl0aW9uLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBoYXNQcmVmaXggPSBydWxlLnNvbWUoaSA9PiBpLnByb3BbMF0gPT09ICctJylcbiAgICovXG4gIHNvbWUgKGNvbmRpdGlvbikge1xuICAgIHJldHVybiB0aGlzLm5vZGVzLnNvbWUoY29uZGl0aW9uKVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSBgY2hpbGRg4oCZcyBpbmRleCB3aXRoaW4gdGhlIHtAbGluayBDb250YWluZXIjbm9kZXN9IGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV9IGNoaWxkIENoaWxkIG9mIHRoZSBjdXJyZW50IGNvbnRhaW5lci5cbiAgICpcbiAgICogQHJldHVybiB7bnVtYmVyfSBDaGlsZCBpbmRleC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcnVsZS5pbmRleCggcnVsZS5ub2Rlc1syXSApIC8vPT4gMlxuICAgKi9cbiAgaW5kZXggKGNoaWxkKSB7XG4gICAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBjaGlsZFxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5ub2Rlcy5pbmRleE9mKGNoaWxkKVxuICB9XG5cbiAgLyoqXG4gICAqIFRoZSBjb250YWluZXLigJlzIGZpcnN0IGNoaWxkLlxuICAgKlxuICAgKiBAdHlwZSB7Tm9kZX1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcnVsZS5maXJzdCA9PT0gcnVsZXMubm9kZXNbMF1cbiAgICovXG4gIGdldCBmaXJzdCAoKSB7XG4gICAgaWYgKCF0aGlzLm5vZGVzKSByZXR1cm4gdW5kZWZpbmVkXG4gICAgcmV0dXJuIHRoaXMubm9kZXNbMF1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgY29udGFpbmVy4oCZcyBsYXN0IGNoaWxkLlxuICAgKlxuICAgKiBAdHlwZSB7Tm9kZX1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcnVsZS5sYXN0ID09PSBydWxlLm5vZGVzW3J1bGUubm9kZXMubGVuZ3RoIC0gMV1cbiAgICovXG4gIGdldCBsYXN0ICgpIHtcbiAgICBpZiAoIXRoaXMubm9kZXMpIHJldHVybiB1bmRlZmluZWRcbiAgICByZXR1cm4gdGhpcy5ub2Rlc1t0aGlzLm5vZGVzLmxlbmd0aCAtIDFdXG4gIH1cblxuICBub3JtYWxpemUgKG5vZGVzLCBzYW1wbGUpIHtcbiAgICBpZiAodHlwZW9mIG5vZGVzID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG4gICAgICBub2RlcyA9IGNsZWFuU291cmNlKHBhcnNlKG5vZGVzKS5ub2RlcylcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobm9kZXMpKSB7XG4gICAgICBub2RlcyA9IG5vZGVzLnNsaWNlKDApXG4gICAgICBmb3IgKGxldCBpIG9mIG5vZGVzKSB7XG4gICAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSwgJ2lnbm9yZScpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChub2Rlcy50eXBlID09PSAncm9vdCcpIHtcbiAgICAgIG5vZGVzID0gbm9kZXMubm9kZXMuc2xpY2UoMClcbiAgICAgIGZvciAobGV0IGkgb2Ygbm9kZXMpIHtcbiAgICAgICAgaWYgKGkucGFyZW50KSBpLnBhcmVudC5yZW1vdmVDaGlsZChpLCAnaWdub3JlJylcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLnR5cGUpIHtcbiAgICAgIG5vZGVzID0gW25vZGVzXVxuICAgIH0gZWxzZSBpZiAobm9kZXMucHJvcCkge1xuICAgICAgaWYgKHR5cGVvZiBub2Rlcy52YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdWYWx1ZSBmaWVsZCBpcyBtaXNzZWQgaW4gbm9kZSBjcmVhdGlvbicpXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBub2Rlcy52YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgbm9kZXMudmFsdWUgPSBTdHJpbmcobm9kZXMudmFsdWUpXG4gICAgICB9XG4gICAgICBub2RlcyA9IFtuZXcgRGVjbGFyYXRpb24obm9kZXMpXVxuICAgIH0gZWxzZSBpZiAobm9kZXMuc2VsZWN0b3IpIHtcbiAgICAgIGxldCBSdWxlID0gcmVxdWlyZSgnLi9ydWxlJylcbiAgICAgIG5vZGVzID0gW25ldyBSdWxlKG5vZGVzKV1cbiAgICB9IGVsc2UgaWYgKG5vZGVzLm5hbWUpIHtcbiAgICAgIGxldCBBdFJ1bGUgPSByZXF1aXJlKCcuL2F0LXJ1bGUnKVxuICAgICAgbm9kZXMgPSBbbmV3IEF0UnVsZShub2RlcyldXG4gICAgfSBlbHNlIGlmIChub2Rlcy50ZXh0KSB7XG4gICAgICBub2RlcyA9IFtuZXcgQ29tbWVudChub2RlcyldXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBub2RlIHR5cGUgaW4gbm9kZSBjcmVhdGlvbicpXG4gICAgfVxuXG4gICAgbGV0IHByb2Nlc3NlZCA9IG5vZGVzLm1hcChpID0+IHtcbiAgICAgIGlmIChpLnBhcmVudCkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSlcbiAgICAgIGlmICh0eXBlb2YgaS5yYXdzLmJlZm9yZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHNhbXBsZSAmJiB0eXBlb2Ygc2FtcGxlLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGkucmF3cy5iZWZvcmUgPSBzYW1wbGUucmF3cy5iZWZvcmUucmVwbGFjZSgvW15cXHNdL2csICcnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpLnBhcmVudCA9IHRoaXNcbiAgICAgIHJldHVybiBpXG4gICAgfSlcblxuICAgIHJldHVybiBwcm9jZXNzZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgQ29udGFpbmVyI1xuICAgKiBAbWVtYmVyIHtOb2RlW119IG5vZGVzIEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGNvbnRhaW5lcuKAmXMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrIH0nKVxuICAgKiByb290Lm5vZGVzLmxlbmd0aCAgICAgICAgICAgLy89PiAxXG4gICAqIHJvb3Qubm9kZXNbMF0uc2VsZWN0b3IgICAgICAvLz0+ICdhJ1xuICAgKiByb290Lm5vZGVzWzBdLm5vZGVzWzBdLnByb3AgLy89PiAnY29sb3InXG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXJcblxuLyoqXG4gKiBAY2FsbGJhY2sgY2hpbGRDb25kaXRpb25cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICBDb250YWluZXIgY2hpbGQuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggQ2hpbGQgaW5kZXguXG4gKiBAcGFyYW0ge05vZGVbXX0gbm9kZXMgQWxsIGNvbnRhaW5lciBjaGlsZHJlbi5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgY2hpbGRJdGVyYXRvclxuICogQHBhcmFtIHtOb2RlfSBub2RlICAgIENvbnRhaW5lciBjaGlsZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBDaGlsZCBpbmRleC5cbiAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH0gUmV0dXJuaW5nIGBmYWxzZWAgd2lsbCBicmVhayBpdGVyYXRpb24uXG4gKi9cbiJdLCJmaWxlIjoiY29udGFpbmVyLmpzIn0=


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(49));

var _list = _interopRequireDefault(__webpack_require__(51));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a CSS rule: a selector followed by a declaration block.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{}')
 * const rule = root.first
 * rule.type       //=> 'rule'
 * rule.toString() //=> 'a{}'
 */
var Rule =
/*#__PURE__*/
function (_Container) {
  _inheritsLoose(Rule, _Container);

  function Rule(defaults) {
    var _this;

    _this = _Container.call(this, defaults) || this;
    _this.type = 'rule';
    if (!_this.nodes) _this.nodes = [];
    return _this;
  }
  /**
   * An array containing the rule’s individual selectors.
   * Groups of selectors are split at commas.
   *
   * @type {string[]}
   *
   * @example
   * const root = postcss.parse('a, b { }')
   * const rule = root.first
   *
   * rule.selector  //=> 'a, b'
   * rule.selectors //=> ['a', 'b']
   *
   * rule.selectors = ['a', 'strong']
   * rule.selector //=> 'a, strong'
   */


  _createClass(Rule, [{
    key: "selectors",
    get: function get() {
      return _list.default.comma(this.selector);
    },
    set: function set(values) {
      var match = this.selector ? this.selector.match(/,\s*/) : null;
      var sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
      this.selector = values.join(sep);
    }
    /**
     * @memberof Rule#
     * @member {string} selector The rule’s full selector represented
     *                           as a string.
     *
     * @example
     * const root = postcss.parse('a, b { }')
     * const rule = root.first
     * rule.selector //=> 'a, b'
     */

    /**
     * @memberof Rule#
     * @member {object} raws Information to generate byte-to-byte equal
     *                       node string as it was in the origin input.
     *
     * Every parser saves its own properties,
     * but the default CSS parser uses:
     *
     * * `before`: the space symbols before the node. It also stores `*`
     *   and `_` symbols before the declaration (IE hack).
     * * `after`: the space symbols after the last child of the node
     *   to the end of the node.
     * * `between`: the symbols between the property and value
     *   for declarations, selector and `{` for rules, or last parameter
     *   and `{` for at-rules.
     * * `semicolon`: contains `true` if the last child has
     *   an (optional) semicolon.
     * * `ownSemicolon`: contains `true` if there is semicolon after rule.
     *
     * PostCSS cleans selectors from comments and extra spaces,
     * but it stores origin content in raws properties.
     * As such, if you don’t change a declaration’s value,
     * PostCSS will use the raw value with comments.
     *
     * @example
     * const root = postcss.parse('a {\n  color:black\n}')
     * root.first.first.raws //=> { before: '', between: ' ', after: '\n' }
     */

  }]);

  return Rule;
}(_container.default);

var _default = Rule;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGUuZXM2Il0sIm5hbWVzIjpbIlJ1bGUiLCJkZWZhdWx0cyIsInR5cGUiLCJub2RlcyIsImxpc3QiLCJjb21tYSIsInNlbGVjdG9yIiwidmFsdWVzIiwibWF0Y2giLCJzZXAiLCJyYXciLCJqb2luIiwiQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUNBOzs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7O0lBV01BLEk7Ozs7O0FBQ0osZ0JBQWFDLFFBQWIsRUFBdUI7QUFBQTs7QUFDckIsa0NBQU1BLFFBQU47QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBWjtBQUNBLFFBQUksQ0FBQyxNQUFLQyxLQUFWLEVBQWlCLE1BQUtBLEtBQUwsR0FBYSxFQUFiO0FBSEk7QUFJdEI7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBZ0JpQjtBQUNmLGFBQU9DLGNBQUtDLEtBQUwsQ0FBVyxLQUFLQyxRQUFoQixDQUFQO0FBQ0QsSztzQkFFY0MsTSxFQUFRO0FBQ3JCLFVBQUlDLEtBQUssR0FBRyxLQUFLRixRQUFMLEdBQWdCLEtBQUtBLFFBQUwsQ0FBY0UsS0FBZCxDQUFvQixNQUFwQixDQUFoQixHQUE4QyxJQUExRDtBQUNBLFVBQUlDLEdBQUcsR0FBR0QsS0FBSyxHQUFHQSxLQUFLLENBQUMsQ0FBRCxDQUFSLEdBQWMsTUFBTSxLQUFLRSxHQUFMLENBQVMsU0FBVCxFQUFvQixZQUFwQixDQUFuQztBQUNBLFdBQUtKLFFBQUwsR0FBZ0JDLE1BQU0sQ0FBQ0ksSUFBUCxDQUFZRixHQUFaLENBQWhCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE1Q2lCRyxrQjs7ZUEwRUpaLEkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJ1xuaW1wb3J0IGxpc3QgZnJvbSAnLi9saXN0J1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBDU1MgcnVsZTogYSBzZWxlY3RvciBmb2xsb3dlZCBieSBhIGRlY2xhcmF0aW9uIGJsb2NrLlxuICpcbiAqIEBleHRlbmRzIENvbnRhaW5lclxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYXt9JylcbiAqIGNvbnN0IHJ1bGUgPSByb290LmZpcnN0XG4gKiBydWxlLnR5cGUgICAgICAgLy89PiAncnVsZSdcbiAqIHJ1bGUudG9TdHJpbmcoKSAvLz0+ICdhe30nXG4gKi9cbmNsYXNzIFJ1bGUgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvciAoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAncnVsZSdcbiAgICBpZiAoIXRoaXMubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICB9XG5cbiAgLyoqXG4gICAqIEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJ1bGXigJlzIGluZGl2aWR1YWwgc2VsZWN0b3JzLlxuICAgKiBHcm91cHMgb2Ygc2VsZWN0b3JzIGFyZSBzcGxpdCBhdCBjb21tYXMuXG4gICAqXG4gICAqIEB0eXBlIHtzdHJpbmdbXX1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2EsIGIgeyB9JylcbiAgICogY29uc3QgcnVsZSA9IHJvb3QuZmlyc3RcbiAgICpcbiAgICogcnVsZS5zZWxlY3RvciAgLy89PiAnYSwgYidcbiAgICogcnVsZS5zZWxlY3RvcnMgLy89PiBbJ2EnLCAnYiddXG4gICAqXG4gICAqIHJ1bGUuc2VsZWN0b3JzID0gWydhJywgJ3N0cm9uZyddXG4gICAqIHJ1bGUuc2VsZWN0b3IgLy89PiAnYSwgc3Ryb25nJ1xuICAgKi9cbiAgZ2V0IHNlbGVjdG9ycyAoKSB7XG4gICAgcmV0dXJuIGxpc3QuY29tbWEodGhpcy5zZWxlY3RvcilcbiAgfVxuXG4gIHNldCBzZWxlY3RvcnMgKHZhbHVlcykge1xuICAgIGxldCBtYXRjaCA9IHRoaXMuc2VsZWN0b3IgPyB0aGlzLnNlbGVjdG9yLm1hdGNoKC8sXFxzKi8pIDogbnVsbFxuICAgIGxldCBzZXAgPSBtYXRjaCA/IG1hdGNoWzBdIDogJywnICsgdGhpcy5yYXcoJ2JldHdlZW4nLCAnYmVmb3JlT3BlbicpXG4gICAgdGhpcy5zZWxlY3RvciA9IHZhbHVlcy5qb2luKHNlcClcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUnVsZSNcbiAgICogQG1lbWJlciB7c3RyaW5nfSBzZWxlY3RvciBUaGUgcnVsZeKAmXMgZnVsbCBzZWxlY3RvciByZXByZXNlbnRlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIGFzIGEgc3RyaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSwgYiB7IH0nKVxuICAgKiBjb25zdCBydWxlID0gcm9vdC5maXJzdFxuICAgKiBydWxlLnNlbGVjdG9yIC8vPT4gJ2EsIGInXG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUnVsZSNcbiAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIEluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGJ5dGUtdG8tYnl0ZSBlcXVhbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAqXG4gICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAqXG4gICAqICogYGJlZm9yZWA6IHRoZSBzcGFjZSBzeW1ib2xzIGJlZm9yZSB0aGUgbm9kZS4gSXQgYWxzbyBzdG9yZXMgYCpgXG4gICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgKiAqIGBhZnRlcmA6IHRoZSBzcGFjZSBzeW1ib2xzIGFmdGVyIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBub2RlXG4gICAqICAgdG8gdGhlIGVuZCBvZiB0aGUgbm9kZS5cbiAgICogKiBgYmV0d2VlbmA6IHRoZSBzeW1ib2xzIGJldHdlZW4gdGhlIHByb3BlcnR5IGFuZCB2YWx1ZVxuICAgKiAgIGZvciBkZWNsYXJhdGlvbnMsIHNlbGVjdG9yIGFuZCBge2AgZm9yIHJ1bGVzLCBvciBsYXN0IHBhcmFtZXRlclxuICAgKiAgIGFuZCBge2AgZm9yIGF0LXJ1bGVzLlxuICAgKiAqIGBzZW1pY29sb25gOiBjb250YWlucyBgdHJ1ZWAgaWYgdGhlIGxhc3QgY2hpbGQgaGFzXG4gICAqICAgYW4gKG9wdGlvbmFsKSBzZW1pY29sb24uXG4gICAqICogYG93blNlbWljb2xvbmA6IGNvbnRhaW5zIGB0cnVlYCBpZiB0aGVyZSBpcyBzZW1pY29sb24gYWZ0ZXIgcnVsZS5cbiAgICpcbiAgICogUG9zdENTUyBjbGVhbnMgc2VsZWN0b3JzIGZyb20gY29tbWVudHMgYW5kIGV4dHJhIHNwYWNlcyxcbiAgICogYnV0IGl0IHN0b3JlcyBvcmlnaW4gY29udGVudCBpbiByYXdzIHByb3BlcnRpZXMuXG4gICAqIEFzIHN1Y2gsIGlmIHlvdSBkb27igJl0IGNoYW5nZSBhIGRlY2xhcmF0aW9u4oCZcyB2YWx1ZSxcbiAgICogUG9zdENTUyB3aWxsIHVzZSB0aGUgcmF3IHZhbHVlIHdpdGggY29tbWVudHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHtcXG4gIGNvbG9yOmJsYWNrXFxufScpXG4gICAqIHJvb3QuZmlyc3QuZmlyc3QucmF3cyAvLz0+IHsgYmVmb3JlOiAnJywgYmV0d2VlbjogJyAnLCBhZnRlcjogJ1xcbicgfVxuICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgUnVsZVxuIl0sImZpbGUiOiJydWxlLmpzIn0=


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Contains helpers for safely splitting lists of CSS values,
 * preserving parentheses and quotes.
 *
 * @example
 * const list = postcss.list
 *
 * @namespace list
 */
var list = {
  split: function split(string, separators, last) {
    var array = [];
    var current = '';
    var split = false;
    var func = 0;
    var quote = false;
    var escape = false;

    for (var i = 0; i < string.length; i++) {
      var letter = string[i];

      if (quote) {
        if (escape) {
          escape = false;
        } else if (letter === '\\') {
          escape = true;
        } else if (letter === quote) {
          quote = false;
        }
      } else if (letter === '"' || letter === '\'') {
        quote = letter;
      } else if (letter === '(') {
        func += 1;
      } else if (letter === ')') {
        if (func > 0) func -= 1;
      } else if (func === 0) {
        if (separators.indexOf(letter) !== -1) split = true;
      }

      if (split) {
        if (current !== '') array.push(current.trim());
        current = '';
        split = false;
      } else {
        current += letter;
      }
    }

    if (last || current !== '') array.push(current.trim());
    return array;
  },

  /**
   * Safely splits space-separated values (such as those for `background`,
   * `border-radius`, and other shorthand properties).
   *
   * @param {string} string Space-separated values.
   *
   * @return {string[]} Split values.
   *
   * @example
   * postcss.list.space('1px calc(10% + 1px)') //=> ['1px', 'calc(10% + 1px)']
   */
  space: function space(string) {
    var spaces = [' ', '\n', '\t'];
    return list.split(string, spaces);
  },

  /**
   * Safely splits comma-separated values (such as those for `transition-*`
   * and `background` properties).
   *
   * @param {string} string Comma-separated values.
   *
   * @return {string[]} Split values.
   *
   * @example
   * postcss.list.comma('black, linear-gradient(white, black)')
   * //=> ['black', 'linear-gradient(white, black)']
   */
  comma: function comma(string) {
    return list.split(string, [','], true);
  }
};
var _default = list;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuZXM2Il0sIm5hbWVzIjpbImxpc3QiLCJzcGxpdCIsInN0cmluZyIsInNlcGFyYXRvcnMiLCJsYXN0IiwiYXJyYXkiLCJjdXJyZW50IiwiZnVuYyIsInF1b3RlIiwiZXNjYXBlIiwiaSIsImxlbmd0aCIsImxldHRlciIsImluZGV4T2YiLCJwdXNoIiwidHJpbSIsInNwYWNlIiwic3BhY2VzIiwiY29tbWEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7OztBQVNBLElBQUlBLElBQUksR0FBRztBQUVUQyxFQUFBQSxLQUZTLGlCQUVGQyxNQUZFLEVBRU1DLFVBRk4sRUFFa0JDLElBRmxCLEVBRXdCO0FBQy9CLFFBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxRQUFJTCxLQUFLLEdBQUcsS0FBWjtBQUVBLFFBQUlNLElBQUksR0FBRyxDQUFYO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQVo7QUFDQSxRQUFJQyxNQUFNLEdBQUcsS0FBYjs7QUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLE1BQU0sQ0FBQ1MsTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7QUFDdEMsVUFBSUUsTUFBTSxHQUFHVixNQUFNLENBQUNRLENBQUQsQ0FBbkI7O0FBRUEsVUFBSUYsS0FBSixFQUFXO0FBQ1QsWUFBSUMsTUFBSixFQUFZO0FBQ1ZBLFVBQUFBLE1BQU0sR0FBRyxLQUFUO0FBQ0QsU0FGRCxNQUVPLElBQUlHLE1BQU0sS0FBSyxJQUFmLEVBQXFCO0FBQzFCSCxVQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNELFNBRk0sTUFFQSxJQUFJRyxNQUFNLEtBQUtKLEtBQWYsRUFBc0I7QUFDM0JBLFVBQUFBLEtBQUssR0FBRyxLQUFSO0FBQ0Q7QUFDRixPQVJELE1BUU8sSUFBSUksTUFBTSxLQUFLLEdBQVgsSUFBa0JBLE1BQU0sS0FBSyxJQUFqQyxFQUF1QztBQUM1Q0osUUFBQUEsS0FBSyxHQUFHSSxNQUFSO0FBQ0QsT0FGTSxNQUVBLElBQUlBLE1BQU0sS0FBSyxHQUFmLEVBQW9CO0FBQ3pCTCxRQUFBQSxJQUFJLElBQUksQ0FBUjtBQUNELE9BRk0sTUFFQSxJQUFJSyxNQUFNLEtBQUssR0FBZixFQUFvQjtBQUN6QixZQUFJTCxJQUFJLEdBQUcsQ0FBWCxFQUFjQSxJQUFJLElBQUksQ0FBUjtBQUNmLE9BRk0sTUFFQSxJQUFJQSxJQUFJLEtBQUssQ0FBYixFQUFnQjtBQUNyQixZQUFJSixVQUFVLENBQUNVLE9BQVgsQ0FBbUJELE1BQW5CLE1BQStCLENBQUMsQ0FBcEMsRUFBdUNYLEtBQUssR0FBRyxJQUFSO0FBQ3hDOztBQUVELFVBQUlBLEtBQUosRUFBVztBQUNULFlBQUlLLE9BQU8sS0FBSyxFQUFoQixFQUFvQkQsS0FBSyxDQUFDUyxJQUFOLENBQVdSLE9BQU8sQ0FBQ1MsSUFBUixFQUFYO0FBQ3BCVCxRQUFBQSxPQUFPLEdBQUcsRUFBVjtBQUNBTCxRQUFBQSxLQUFLLEdBQUcsS0FBUjtBQUNELE9BSkQsTUFJTztBQUNMSyxRQUFBQSxPQUFPLElBQUlNLE1BQVg7QUFDRDtBQUNGOztBQUVELFFBQUlSLElBQUksSUFBSUUsT0FBTyxLQUFLLEVBQXhCLEVBQTRCRCxLQUFLLENBQUNTLElBQU4sQ0FBV1IsT0FBTyxDQUFDUyxJQUFSLEVBQVg7QUFDNUIsV0FBT1YsS0FBUDtBQUNELEdBM0NROztBQTZDVDs7Ozs7Ozs7Ozs7QUFXQVcsRUFBQUEsS0F4RFMsaUJBd0RGZCxNQXhERSxFQXdETTtBQUNiLFFBQUllLE1BQU0sR0FBRyxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixDQUFiO0FBQ0EsV0FBT2pCLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxNQUFYLEVBQW1CZSxNQUFuQixDQUFQO0FBQ0QsR0EzRFE7O0FBNkRUOzs7Ozs7Ozs7Ozs7QUFZQUMsRUFBQUEsS0F6RVMsaUJBeUVGaEIsTUF6RUUsRUF5RU07QUFDYixXQUFPRixJQUFJLENBQUNDLEtBQUwsQ0FBV0MsTUFBWCxFQUFtQixDQUFDLEdBQUQsQ0FBbkIsRUFBMEIsSUFBMUIsQ0FBUDtBQUNEO0FBM0VRLENBQVg7ZUErRWVGLEkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnRhaW5zIGhlbHBlcnMgZm9yIHNhZmVseSBzcGxpdHRpbmcgbGlzdHMgb2YgQ1NTIHZhbHVlcyxcbiAqIHByZXNlcnZpbmcgcGFyZW50aGVzZXMgYW5kIHF1b3Rlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbGlzdCA9IHBvc3Rjc3MubGlzdFxuICpcbiAqIEBuYW1lc3BhY2UgbGlzdFxuICovXG5sZXQgbGlzdCA9IHtcblxuICBzcGxpdCAoc3RyaW5nLCBzZXBhcmF0b3JzLCBsYXN0KSB7XG4gICAgbGV0IGFycmF5ID0gW11cbiAgICBsZXQgY3VycmVudCA9ICcnXG4gICAgbGV0IHNwbGl0ID0gZmFsc2VcblxuICAgIGxldCBmdW5jID0gMFxuICAgIGxldCBxdW90ZSA9IGZhbHNlXG4gICAgbGV0IGVzY2FwZSA9IGZhbHNlXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGxldHRlciA9IHN0cmluZ1tpXVxuXG4gICAgICBpZiAocXVvdGUpIHtcbiAgICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICAgIGVzY2FwZSA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnXFxcXCcpIHtcbiAgICAgICAgICBlc2NhcGUgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSBxdW90ZSkge1xuICAgICAgICAgIHF1b3RlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICdcIicgfHwgbGV0dGVyID09PSAnXFwnJykge1xuICAgICAgICBxdW90ZSA9IGxldHRlclxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICcoJykge1xuICAgICAgICBmdW5jICs9IDFcbiAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnKScpIHtcbiAgICAgICAgaWYgKGZ1bmMgPiAwKSBmdW5jIC09IDFcbiAgICAgIH0gZWxzZSBpZiAoZnVuYyA9PT0gMCkge1xuICAgICAgICBpZiAoc2VwYXJhdG9ycy5pbmRleE9mKGxldHRlcikgIT09IC0xKSBzcGxpdCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNwbGl0KSB7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSAnJykgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSlcbiAgICAgICAgY3VycmVudCA9ICcnXG4gICAgICAgIHNwbGl0ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgKz0gbGV0dGVyXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxhc3QgfHwgY3VycmVudCAhPT0gJycpIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpXG4gICAgcmV0dXJuIGFycmF5XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNhZmVseSBzcGxpdHMgc3BhY2Utc2VwYXJhdGVkIHZhbHVlcyAoc3VjaCBhcyB0aG9zZSBmb3IgYGJhY2tncm91bmRgLFxuICAgKiBgYm9yZGVyLXJhZGl1c2AsIGFuZCBvdGhlciBzaG9ydGhhbmQgcHJvcGVydGllcykuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3BhY2Utc2VwYXJhdGVkIHZhbHVlcy5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nW119IFNwbGl0IHZhbHVlcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy5saXN0LnNwYWNlKCcxcHggY2FsYygxMCUgKyAxcHgpJykgLy89PiBbJzFweCcsICdjYWxjKDEwJSArIDFweCknXVxuICAgKi9cbiAgc3BhY2UgKHN0cmluZykge1xuICAgIGxldCBzcGFjZXMgPSBbJyAnLCAnXFxuJywgJ1xcdCddXG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBzcGFjZXMpXG4gIH0sXG5cbiAgLyoqXG4gICAqIFNhZmVseSBzcGxpdHMgY29tbWEtc2VwYXJhdGVkIHZhbHVlcyAoc3VjaCBhcyB0aG9zZSBmb3IgYHRyYW5zaXRpb24tKmBcbiAgICogYW5kIGBiYWNrZ3JvdW5kYCBwcm9wZXJ0aWVzKS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBDb21tYS1zZXBhcmF0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmdbXX0gU3BsaXQgdmFsdWVzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzLmxpc3QuY29tbWEoJ2JsYWNrLCBsaW5lYXItZ3JhZGllbnQod2hpdGUsIGJsYWNrKScpXG4gICAqIC8vPT4gWydibGFjaycsICdsaW5lYXItZ3JhZGllbnQod2hpdGUsIGJsYWNrKSddXG4gICAqL1xuICBjb21tYSAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBbJywnXSwgdHJ1ZSlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RcbiJdLCJmaWxlIjoibGlzdC5qcyJ9


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(49));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

/**
 * Represents a CSS file and contains all its parsed nodes.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{color:black} b{z-index:2}')
 * root.type         //=> 'root'
 * root.nodes.length //=> 2
 */
var Root =
/*#__PURE__*/
function (_Container) {
  _inheritsLoose(Root, _Container);

  function Root(defaults) {
    var _this;

    _this = _Container.call(this, defaults) || this;
    _this.type = 'root';
    if (!_this.nodes) _this.nodes = [];
    return _this;
  }

  var _proto = Root.prototype;

  _proto.removeChild = function removeChild(child, ignore) {
    var index = this.index(child);

    if (!ignore && index === 0 && this.nodes.length > 1) {
      this.nodes[1].raws.before = this.nodes[index].raws.before;
    }

    return _Container.prototype.removeChild.call(this, child);
  };

  _proto.normalize = function normalize(child, sample, type) {
    var nodes = _Container.prototype.normalize.call(this, child);

    if (sample) {
      if (type === 'prepend') {
        if (this.nodes.length > 1) {
          sample.raws.before = this.nodes[1].raws.before;
        } else {
          delete sample.raws.before;
        }
      } else if (this.first !== sample) {
        for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var node = _ref;
          node.raws.before = sample.raws.before;
        }
      }
    }

    return nodes;
  }
  /**
   * Returns a {@link Result} instance representing the root’s CSS.
   *
   * @param {processOptions} [opts] Options with only `to` and `map` keys.
   *
   * @return {Result} Result with current root’s CSS.
   *
   * @example
   * const root1 = postcss.parse(css1, { from: 'a.css' })
   * const root2 = postcss.parse(css2, { from: 'b.css' })
   * root1.append(root2)
   * const result = root1.toResult({ to: 'all.css', map: true })
   */
  ;

  _proto.toResult = function toResult(opts) {
    if (opts === void 0) {
      opts = {};
    }

    var LazyResult = __webpack_require__(40);

    var Processor = __webpack_require__(39);

    var lazy = new LazyResult(new Processor(), this, opts);
    return lazy.stringify();
  }
  /**
   * @memberof Root#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `after`: the space symbols after the last child to the end of file.
   * * `semicolon`: is the last child has an (optional) semicolon.
   *
   * @example
   * postcss.parse('a {}\n').raws //=> { after: '\n' }
   * postcss.parse('a {}').raws   //=> { after: '' }
   */
  ;

  return Root;
}(_container.default);

var _default = Root;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvb3QuZXM2Il0sIm5hbWVzIjpbIlJvb3QiLCJkZWZhdWx0cyIsInR5cGUiLCJub2RlcyIsInJlbW92ZUNoaWxkIiwiY2hpbGQiLCJpZ25vcmUiLCJpbmRleCIsImxlbmd0aCIsInJhd3MiLCJiZWZvcmUiLCJub3JtYWxpemUiLCJzYW1wbGUiLCJmaXJzdCIsIm5vZGUiLCJ0b1Jlc3VsdCIsIm9wdHMiLCJMYXp5UmVzdWx0IiwicmVxdWlyZSIsIlByb2Nlc3NvciIsImxhenkiLCJzdHJpbmdpZnkiLCJDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7OztBQUVBOzs7Ozs7Ozs7O0lBVU1BLEk7Ozs7O0FBQ0osZ0JBQWFDLFFBQWIsRUFBdUI7QUFBQTs7QUFDckIsa0NBQU1BLFFBQU47QUFDQSxVQUFLQyxJQUFMLEdBQVksTUFBWjtBQUNBLFFBQUksQ0FBQyxNQUFLQyxLQUFWLEVBQWlCLE1BQUtBLEtBQUwsR0FBYSxFQUFiO0FBSEk7QUFJdEI7Ozs7U0FFREMsVyxHQUFBLHFCQUFhQyxLQUFiLEVBQW9CQyxNQUFwQixFQUE0QjtBQUMxQixRQUFJQyxLQUFLLEdBQUcsS0FBS0EsS0FBTCxDQUFXRixLQUFYLENBQVo7O0FBRUEsUUFBSSxDQUFDQyxNQUFELElBQVdDLEtBQUssS0FBSyxDQUFyQixJQUEwQixLQUFLSixLQUFMLENBQVdLLE1BQVgsR0FBb0IsQ0FBbEQsRUFBcUQ7QUFDbkQsV0FBS0wsS0FBTCxDQUFXLENBQVgsRUFBY00sSUFBZCxDQUFtQkMsTUFBbkIsR0FBNEIsS0FBS1AsS0FBTCxDQUFXSSxLQUFYLEVBQWtCRSxJQUFsQixDQUF1QkMsTUFBbkQ7QUFDRDs7QUFFRCxnQ0FBYU4sV0FBYixZQUF5QkMsS0FBekI7QUFDRCxHOztTQUVETSxTLEdBQUEsbUJBQVdOLEtBQVgsRUFBa0JPLE1BQWxCLEVBQTBCVixJQUExQixFQUFnQztBQUM5QixRQUFJQyxLQUFLLHdCQUFTUSxTQUFULFlBQW1CTixLQUFuQixDQUFUOztBQUVBLFFBQUlPLE1BQUosRUFBWTtBQUNWLFVBQUlWLElBQUksS0FBSyxTQUFiLEVBQXdCO0FBQ3RCLFlBQUksS0FBS0MsS0FBTCxDQUFXSyxNQUFYLEdBQW9CLENBQXhCLEVBQTJCO0FBQ3pCSSxVQUFBQSxNQUFNLENBQUNILElBQVAsQ0FBWUMsTUFBWixHQUFxQixLQUFLUCxLQUFMLENBQVcsQ0FBWCxFQUFjTSxJQUFkLENBQW1CQyxNQUF4QztBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPRSxNQUFNLENBQUNILElBQVAsQ0FBWUMsTUFBbkI7QUFDRDtBQUNGLE9BTkQsTUFNTyxJQUFJLEtBQUtHLEtBQUwsS0FBZUQsTUFBbkIsRUFBMkI7QUFDaEMsNkJBQWlCVCxLQUFqQixrSEFBd0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLGNBQWZXLElBQWU7QUFDdEJBLFVBQUFBLElBQUksQ0FBQ0wsSUFBTCxDQUFVQyxNQUFWLEdBQW1CRSxNQUFNLENBQUNILElBQVAsQ0FBWUMsTUFBL0I7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBT1AsS0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7Ozs7OztTQWFBWSxRLEdBQUEsa0JBQVVDLElBQVYsRUFBc0I7QUFBQSxRQUFaQSxJQUFZO0FBQVpBLE1BQUFBLElBQVksR0FBTCxFQUFLO0FBQUE7O0FBQ3BCLFFBQUlDLFVBQVUsR0FBR0MsT0FBTyxDQUFDLGVBQUQsQ0FBeEI7O0FBQ0EsUUFBSUMsU0FBUyxHQUFHRCxPQUFPLENBQUMsYUFBRCxDQUF2Qjs7QUFFQSxRQUFJRSxJQUFJLEdBQUcsSUFBSUgsVUFBSixDQUFlLElBQUlFLFNBQUosRUFBZixFQUFnQyxJQUFoQyxFQUFzQ0gsSUFBdEMsQ0FBWDtBQUNBLFdBQU9JLElBQUksQ0FBQ0MsU0FBTCxFQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBMURpQkMsa0I7O2VBMkVKdEIsSSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb250YWluZXIgZnJvbSAnLi9jb250YWluZXInXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIENTUyBmaWxlIGFuZCBjb250YWlucyBhbGwgaXRzIHBhcnNlZCBub2Rlcy5cbiAqXG4gKiBAZXh0ZW5kcyBDb250YWluZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2F7Y29sb3I6YmxhY2t9IGJ7ei1pbmRleDoyfScpXG4gKiByb290LnR5cGUgICAgICAgICAvLz0+ICdyb290J1xuICogcm9vdC5ub2Rlcy5sZW5ndGggLy89PiAyXG4gKi9cbmNsYXNzIFJvb3QgZXh0ZW5kcyBDb250YWluZXIge1xuICBjb25zdHJ1Y3RvciAoZGVmYXVsdHMpIHtcbiAgICBzdXBlcihkZWZhdWx0cylcbiAgICB0aGlzLnR5cGUgPSAncm9vdCdcbiAgICBpZiAoIXRoaXMubm9kZXMpIHRoaXMubm9kZXMgPSBbXVxuICB9XG5cbiAgcmVtb3ZlQ2hpbGQgKGNoaWxkLCBpZ25vcmUpIHtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmluZGV4KGNoaWxkKVxuXG4gICAgaWYgKCFpZ25vcmUgJiYgaW5kZXggPT09IDAgJiYgdGhpcy5ub2Rlcy5sZW5ndGggPiAxKSB7XG4gICAgICB0aGlzLm5vZGVzWzFdLnJhd3MuYmVmb3JlID0gdGhpcy5ub2Rlc1tpbmRleF0ucmF3cy5iZWZvcmVcbiAgICB9XG5cbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gIH1cblxuICBub3JtYWxpemUgKGNoaWxkLCBzYW1wbGUsIHR5cGUpIHtcbiAgICBsZXQgbm9kZXMgPSBzdXBlci5ub3JtYWxpemUoY2hpbGQpXG5cbiAgICBpZiAoc2FtcGxlKSB7XG4gICAgICBpZiAodHlwZSA9PT0gJ3ByZXBlbmQnKSB7XG4gICAgICAgIGlmICh0aGlzLm5vZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBzYW1wbGUucmF3cy5iZWZvcmUgPSB0aGlzLm5vZGVzWzFdLnJhd3MuYmVmb3JlXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIHNhbXBsZS5yYXdzLmJlZm9yZVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuZmlyc3QgIT09IHNhbXBsZSkge1xuICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgbm9kZS5yYXdzLmJlZm9yZSA9IHNhbXBsZS5yYXdzLmJlZm9yZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHtAbGluayBSZXN1bHR9IGluc3RhbmNlIHJlcHJlc2VudGluZyB0aGUgcm9vdOKAmXMgQ1NTLlxuICAgKlxuICAgKiBAcGFyYW0ge3Byb2Nlc3NPcHRpb25zfSBbb3B0c10gT3B0aW9ucyB3aXRoIG9ubHkgYHRvYCBhbmQgYG1hcGAga2V5cy5cbiAgICpcbiAgICogQHJldHVybiB7UmVzdWx0fSBSZXN1bHQgd2l0aCBjdXJyZW50IHJvb3TigJlzIENTUy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdDEgPSBwb3N0Y3NzLnBhcnNlKGNzczEsIHsgZnJvbTogJ2EuY3NzJyB9KVxuICAgKiBjb25zdCByb290MiA9IHBvc3Rjc3MucGFyc2UoY3NzMiwgeyBmcm9tOiAnYi5jc3MnIH0pXG4gICAqIHJvb3QxLmFwcGVuZChyb290MilcbiAgICogY29uc3QgcmVzdWx0ID0gcm9vdDEudG9SZXN1bHQoeyB0bzogJ2FsbC5jc3MnLCBtYXA6IHRydWUgfSlcbiAgICovXG4gIHRvUmVzdWx0IChvcHRzID0geyB9KSB7XG4gICAgbGV0IExhenlSZXN1bHQgPSByZXF1aXJlKCcuL2xhenktcmVzdWx0JylcbiAgICBsZXQgUHJvY2Vzc29yID0gcmVxdWlyZSgnLi9wcm9jZXNzb3InKVxuXG4gICAgbGV0IGxhenkgPSBuZXcgTGF6eVJlc3VsdChuZXcgUHJvY2Vzc29yKCksIHRoaXMsIG9wdHMpXG4gICAgcmV0dXJuIGxhenkuc3RyaW5naWZ5KClcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgUm9vdCNcbiAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIEluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGJ5dGUtdG8tYnl0ZSBlcXVhbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAqXG4gICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAqXG4gICAqICogYGFmdGVyYDogdGhlIHNwYWNlIHN5bWJvbHMgYWZ0ZXIgdGhlIGxhc3QgY2hpbGQgdG8gdGhlIGVuZCBvZiBmaWxlLlxuICAgKiAqIGBzZW1pY29sb25gOiBpcyB0aGUgbGFzdCBjaGlsZCBoYXMgYW4gKG9wdGlvbmFsKSBzZW1pY29sb24uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHBvc3Rjc3MucGFyc2UoJ2Ege31cXG4nKS5yYXdzIC8vPT4geyBhZnRlcjogJ1xcbicgfVxuICAgKiBwb3N0Y3NzLnBhcnNlKCdhIHt9JykucmF3cyAgIC8vPT4geyBhZnRlcjogJycgfVxuICAgKi9cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9vdFxuIl0sImZpbGUiOiJyb290LmpzIn0=


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

/**
 * Contains helpers for working with vendor prefixes.
 *
 * @example
 * const vendor = postcss.vendor
 *
 * @namespace vendor
 */
var vendor = {
  /**
   * Returns the vendor prefix extracted from an input string.
   *
   * @param {string} prop String with or without vendor prefix.
   *
   * @return {string} vendor prefix or empty string
   *
   * @example
   * postcss.vendor.prefix('-moz-tab-size') //=> '-moz-'
   * postcss.vendor.prefix('tab-size')      //=> ''
   */
  prefix: function prefix(prop) {
    var match = prop.match(/^(-\w+-)/);

    if (match) {
      return match[0];
    }

    return '';
  },

  /**
     * Returns the input string stripped of its vendor prefix.
     *
     * @param {string} prop String with or without vendor prefix.
     *
     * @return {string} String name without vendor prefixes.
     *
     * @example
     * postcss.vendor.unprefixed('-moz-tab-size') //=> 'tab-size'
     */
  unprefixed: function unprefixed(prop) {
    return prop.replace(/^-\w+-/, '');
  }
};
var _default = vendor;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlbmRvci5lczYiXSwibmFtZXMiOlsidmVuZG9yIiwicHJlZml4IiwicHJvcCIsIm1hdGNoIiwidW5wcmVmaXhlZCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7O0FBUUEsSUFBSUEsTUFBTSxHQUFHO0FBRVg7Ozs7Ozs7Ozs7O0FBV0FDLEVBQUFBLE1BYlcsa0JBYUhDLElBYkcsRUFhRztBQUNaLFFBQUlDLEtBQUssR0FBR0QsSUFBSSxDQUFDQyxLQUFMLENBQVcsVUFBWCxDQUFaOztBQUNBLFFBQUlBLEtBQUosRUFBVztBQUNULGFBQU9BLEtBQUssQ0FBQyxDQUFELENBQVo7QUFDRDs7QUFFRCxXQUFPLEVBQVA7QUFDRCxHQXBCVTs7QUFzQlg7Ozs7Ozs7Ozs7QUFVQUMsRUFBQUEsVUFoQ1csc0JBZ0NDRixJQWhDRCxFQWdDTztBQUNoQixXQUFPQSxJQUFJLENBQUNHLE9BQUwsQ0FBYSxRQUFiLEVBQXVCLEVBQXZCLENBQVA7QUFDRDtBQWxDVSxDQUFiO2VBc0NlTCxNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb250YWlucyBoZWxwZXJzIGZvciB3b3JraW5nIHdpdGggdmVuZG9yIHByZWZpeGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCB2ZW5kb3IgPSBwb3N0Y3NzLnZlbmRvclxuICpcbiAqIEBuYW1lc3BhY2UgdmVuZG9yXG4gKi9cbmxldCB2ZW5kb3IgPSB7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHZlbmRvciBwcmVmaXggZXh0cmFjdGVkIGZyb20gYW4gaW5wdXQgc3RyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBTdHJpbmcgd2l0aCBvciB3aXRob3V0IHZlbmRvciBwcmVmaXguXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gdmVuZG9yIHByZWZpeCBvciBlbXB0eSBzdHJpbmdcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy52ZW5kb3IucHJlZml4KCctbW96LXRhYi1zaXplJykgLy89PiAnLW1vei0nXG4gICAqIHBvc3Rjc3MudmVuZG9yLnByZWZpeCgndGFiLXNpemUnKSAgICAgIC8vPT4gJydcbiAgICovXG4gIHByZWZpeCAocHJvcCkge1xuICAgIGxldCBtYXRjaCA9IHByb3AubWF0Y2goL14oLVxcdystKS8pXG4gICAgaWYgKG1hdGNoKSB7XG4gICAgICByZXR1cm4gbWF0Y2hbMF1cbiAgICB9XG5cbiAgICByZXR1cm4gJydcbiAgfSxcblxuICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbnB1dCBzdHJpbmcgc3RyaXBwZWQgb2YgaXRzIHZlbmRvciBwcmVmaXguXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCBTdHJpbmcgd2l0aCBvciB3aXRob3V0IHZlbmRvciBwcmVmaXguXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IFN0cmluZyBuYW1lIHdpdGhvdXQgdmVuZG9yIHByZWZpeGVzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBwb3N0Y3NzLnZlbmRvci51bnByZWZpeGVkKCctbW96LXRhYi1zaXplJykgLy89PiAndGFiLXNpemUnXG4gICAgICovXG4gIHVucHJlZml4ZWQgKHByb3ApIHtcbiAgICByZXR1cm4gcHJvcC5yZXBsYWNlKC9eLVxcdystLywgJycpXG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCB2ZW5kb3JcbiJdLCJmaWxlIjoidmVuZG9yLmpzIn0=


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _processor = _interopRequireDefault(__webpack_require__(55));

var selectors = _interopRequireWildcard(__webpack_require__(85));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = function parser(processor) {
  return new _processor.default(processor);
};

Object.assign(parser, selectors);
delete parser.__esModule;
var _default = parser;
exports.default = _default;
module.exports = exports.default;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _parser = _interopRequireDefault(__webpack_require__(56));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Processor =
/*#__PURE__*/
function () {
  function Processor(func, options) {
    this.func = func || function noop() {};

    this.funcRes = null;
    this.options = options;
  }

  var _proto = Processor.prototype;

  _proto._shouldUpdateSelector = function _shouldUpdateSelector(rule, options) {
    if (options === void 0) {
      options = {};
    }

    var merged = Object.assign({}, this.options, options);

    if (merged.updateSelector === false) {
      return false;
    } else {
      return typeof rule !== "string";
    }
  };

  _proto._isLossy = function _isLossy(options) {
    if (options === void 0) {
      options = {};
    }

    var merged = Object.assign({}, this.options, options);

    if (merged.lossless === false) {
      return true;
    } else {
      return false;
    }
  };

  _proto._root = function _root(rule, options) {
    if (options === void 0) {
      options = {};
    }

    var parser = new _parser.default(rule, this._parseOptions(options));
    return parser.root;
  };

  _proto._parseOptions = function _parseOptions(options) {
    return {
      lossy: this._isLossy(options)
    };
  };

  _proto._run = function _run(rule, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    }

    return new Promise(function (resolve, reject) {
      try {
        var root = _this._root(rule, options);

        Promise.resolve(_this.func(root)).then(function (transform) {
          var string = undefined;

          if (_this._shouldUpdateSelector(rule, options)) {
            string = root.toString();
            rule.selector = string;
          }

          return {
            transform: transform,
            root: root,
            string: string
          };
        }).then(resolve, reject);
      } catch (e) {
        reject(e);
        return;
      }
    });
  };

  _proto._runSync = function _runSync(rule, options) {
    if (options === void 0) {
      options = {};
    }

    var root = this._root(rule, options);

    var transform = this.func(root);

    if (transform && typeof transform.then === "function") {
      throw new Error("Selector processor returned a promise to a synchronous call.");
    }

    var string = undefined;

    if (options.updateSelector && typeof rule !== "string") {
      string = root.toString();
      rule.selector = string;
    }

    return {
      transform: transform,
      root: root,
      string: string
    };
  }
  /**
   * Process rule into a selector AST.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {Promise<parser.Root>} The AST of the selector after processing it.
   */
  ;

  _proto.ast = function ast(rule, options) {
    return this._run(rule, options).then(function (result) {
      return result.root;
    });
  }
  /**
   * Process rule into a selector AST synchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {parser.Root} The AST of the selector after processing it.
   */
  ;

  _proto.astSync = function astSync(rule, options) {
    return this._runSync(rule, options).root;
  }
  /**
   * Process a selector into a transformed value asynchronously
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {Promise<any>} The value returned by the processor.
   */
  ;

  _proto.transform = function transform(rule, options) {
    return this._run(rule, options).then(function (result) {
      return result.transform;
    });
  }
  /**
   * Process a selector into a transformed value synchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {any} The value returned by the processor.
   */
  ;

  _proto.transformSync = function transformSync(rule, options) {
    return this._runSync(rule, options).transform;
  }
  /**
   * Process a selector into a new selector string asynchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {string} the selector after processing.
   */
  ;

  _proto.process = function process(rule, options) {
    return this._run(rule, options).then(function (result) {
      return result.string || result.root.toString();
    });
  }
  /**
   * Process a selector into a new selector string synchronously.
   *
   * @param rule {postcss.Rule | string} The css selector to be processed
   * @param options The options for processing
   * @returns {string} the selector after processing.
   */
  ;

  _proto.processSync = function processSync(rule, options) {
    var result = this._runSync(rule, options);

    return result.string || result.root.toString();
  };

  return Processor;
}();

exports.default = Processor;
module.exports = exports.default;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _indexesOf = _interopRequireDefault(__webpack_require__(57));

var _uniq = _interopRequireDefault(__webpack_require__(58));

var _root = _interopRequireDefault(__webpack_require__(59));

var _selector = _interopRequireDefault(__webpack_require__(68));

var _className = _interopRequireDefault(__webpack_require__(69));

var _comment = _interopRequireDefault(__webpack_require__(71));

var _id = _interopRequireDefault(__webpack_require__(72));

var _tag = _interopRequireDefault(__webpack_require__(73));

var _string = _interopRequireDefault(__webpack_require__(75));

var _pseudo = _interopRequireDefault(__webpack_require__(76));

var _attribute = _interopRequireWildcard(__webpack_require__(77));

var _universal = _interopRequireDefault(__webpack_require__(79));

var _combinator = _interopRequireDefault(__webpack_require__(80));

var _nesting = _interopRequireDefault(__webpack_require__(81));

var _sortAscending = _interopRequireDefault(__webpack_require__(82));

var _tokenize = _interopRequireWildcard(__webpack_require__(83));

var tokens = _interopRequireWildcard(__webpack_require__(84));

var types = _interopRequireWildcard(__webpack_require__(67));

var _util = __webpack_require__(62);

var _WHITESPACE_TOKENS, _Object$assign;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);
var WHITESPACE_EQUIV_TOKENS = Object.assign({}, WHITESPACE_TOKENS, (_Object$assign = {}, _Object$assign[tokens.comment] = true, _Object$assign));

function tokenStart(token) {
  return {
    line: token[_tokenize.FIELDS.START_LINE],
    column: token[_tokenize.FIELDS.START_COL]
  };
}

function tokenEnd(token) {
  return {
    line: token[_tokenize.FIELDS.END_LINE],
    column: token[_tokenize.FIELDS.END_COL]
  };
}

function getSource(startLine, startColumn, endLine, endColumn) {
  return {
    start: {
      line: startLine,
      column: startColumn
    },
    end: {
      line: endLine,
      column: endColumn
    }
  };
}

function getTokenSource(token) {
  return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
}

function getTokenSourceSpan(startToken, endToken) {
  if (!startToken) {
    return undefined;
  }

  return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
}

function unescapeProp(node, prop) {
  var value = node[prop];

  if (typeof value !== "string") {
    return;
  }

  if (value.indexOf("\\") !== -1) {
    (0, _util.ensureObject)(node, 'raws');
    node[prop] = (0, _util.unesc)(value);

    if (node.raws[prop] === undefined) {
      node.raws[prop] = value;
    }
  }

  return node;
}

var Parser =
/*#__PURE__*/
function () {
  function Parser(rule, options) {
    if (options === void 0) {
      options = {};
    }

    this.rule = rule;
    this.options = Object.assign({
      lossy: false,
      safe: false
    }, options);
    this.position = 0;
    this.css = typeof this.rule === 'string' ? this.rule : this.rule.selector;
    this.tokens = (0, _tokenize.default)({
      css: this.css,
      error: this._errorGenerator(),
      safe: this.options.safe
    });
    var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
    this.root = new _root.default({
      source: rootSource
    });
    this.root.errorGenerator = this._errorGenerator();
    var selector = new _selector.default({
      source: {
        start: {
          line: 1,
          column: 1
        }
      }
    });
    this.root.append(selector);
    this.current = selector;
    this.loop();
  }

  var _proto = Parser.prototype;

  _proto._errorGenerator = function _errorGenerator() {
    var _this = this;

    return function (message, errorOptions) {
      if (typeof _this.rule === 'string') {
        return new Error(message);
      }

      return _this.rule.error(message, errorOptions);
    };
  };

  _proto.attribute = function attribute() {
    var attr = [];
    var startingToken = this.currToken;
    this.position++;

    while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
      attr.push(this.currToken);
      this.position++;
    }

    if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
      return this.expected('closing square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
    }

    var len = attr.length;
    var node = {
      source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
      sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
    };

    if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) {
      return this.expected('attribute', attr[0][_tokenize.FIELDS.START_POS]);
    }

    var pos = 0;
    var spaceBefore = '';
    var commentBefore = '';
    var lastAdded = null;
    var spaceAfterMeaningfulToken = false;

    while (pos < len) {
      var token = attr[pos];
      var content = this.content(token);
      var next = attr[pos + 1];

      switch (token[_tokenize.FIELDS.TYPE]) {
        case tokens.space:
          // if (
          //     len === 1 ||
          //     pos === 0 && this.content(next) === '|'
          // ) {
          //     return this.expected('attribute', token[TOKEN.START_POS], content);
          // }
          spaceAfterMeaningfulToken = true;

          if (this.options.lossy) {
            break;
          }

          if (lastAdded) {
            (0, _util.ensureObject)(node, 'spaces', lastAdded);
            var prevContent = node.spaces[lastAdded].after || '';
            node.spaces[lastAdded].after = prevContent + content;
            var existingComment = (0, _util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || null;

            if (existingComment) {
              node.raws.spaces[lastAdded].after = existingComment + content;
            }
          } else {
            spaceBefore = spaceBefore + content;
            commentBefore = commentBefore + content;
          }

          break;

        case tokens.asterisk:
          if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
            if (spaceBefore) {
              (0, _util.ensureObject)(node, 'spaces', 'attribute');
              node.spaces.attribute.before = spaceBefore;
              spaceBefore = '';
            }

            if (commentBefore) {
              (0, _util.ensureObject)(node, 'raws', 'spaces', 'attribute');
              node.raws.spaces.attribute.before = spaceBefore;
              commentBefore = '';
            }

            node.namespace = (node.namespace || "") + content;
            var rawValue = (0, _util.getProp)(node, 'raws', 'namespace') || null;

            if (rawValue) {
              node.raws.namespace += content;
            }

            lastAdded = 'namespace';
          }

          spaceAfterMeaningfulToken = false;
          break;

        case tokens.dollar:
          if (lastAdded === "value") {
            var oldRawValue = (0, _util.getProp)(node, 'raws', 'value');
            node.value += "$";

            if (oldRawValue) {
              node.raws.value = oldRawValue + "$";
            }

            break;
          }

        // Falls through

        case tokens.caret:
          if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          }

          spaceAfterMeaningfulToken = false;
          break;

        case tokens.combinator:
          if (content === '~' && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          }

          if (content !== '|') {
            spaceAfterMeaningfulToken = false;
            break;
          }

          if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
            node.operator = content;
            lastAdded = 'operator';
          } else if (!node.namespace && !node.attribute) {
            node.namespace = true;
          }

          spaceAfterMeaningfulToken = false;
          break;

        case tokens.word:
          if (next && this.content(next) === '|' && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && // this look-ahead probably fails with comment nodes involved.
          !node.operator && !node.namespace) {
            node.namespace = content;
            lastAdded = 'namespace';
          } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
            if (spaceBefore) {
              (0, _util.ensureObject)(node, 'spaces', 'attribute');
              node.spaces.attribute.before = spaceBefore;
              spaceBefore = '';
            }

            if (commentBefore) {
              (0, _util.ensureObject)(node, 'raws', 'spaces', 'attribute');
              node.raws.spaces.attribute.before = commentBefore;
              commentBefore = '';
            }

            node.attribute = (node.attribute || "") + content;

            var _rawValue = (0, _util.getProp)(node, 'raws', 'attribute') || null;

            if (_rawValue) {
              node.raws.attribute += content;
            }

            lastAdded = 'attribute';
          } else if (!node.value && node.value !== "" || lastAdded === "value" && !spaceAfterMeaningfulToken) {
            var _unescaped = (0, _util.unesc)(content);

            var _oldRawValue = (0, _util.getProp)(node, 'raws', 'value') || '';

            var oldValue = node.value || '';
            node.value = oldValue + _unescaped;
            node.quoteMark = null;

            if (_unescaped !== content || _oldRawValue) {
              (0, _util.ensureObject)(node, 'raws');
              node.raws.value = (_oldRawValue || oldValue) + content;
            }

            lastAdded = 'value';
          } else {
            var insensitive = content === 'i' || content === "I";

            if ((node.value || node.value === '') && (node.quoteMark || spaceAfterMeaningfulToken)) {
              node.insensitive = insensitive;

              if (!insensitive || content === "I") {
                (0, _util.ensureObject)(node, 'raws');
                node.raws.insensitiveFlag = content;
              }

              lastAdded = 'insensitive';

              if (spaceBefore) {
                (0, _util.ensureObject)(node, 'spaces', 'insensitive');
                node.spaces.insensitive.before = spaceBefore;
                spaceBefore = '';
              }

              if (commentBefore) {
                (0, _util.ensureObject)(node, 'raws', 'spaces', 'insensitive');
                node.raws.spaces.insensitive.before = commentBefore;
                commentBefore = '';
              }
            } else if (node.value || node.value === '') {
              lastAdded = 'value';
              node.value += content;

              if (node.raws.value) {
                node.raws.value += content;
              }
            }
          }

          spaceAfterMeaningfulToken = false;
          break;

        case tokens.str:
          if (!node.attribute || !node.operator) {
            return this.error("Expected an attribute followed by an operator preceding the string.", {
              index: token[_tokenize.FIELDS.START_POS]
            });
          }

          var _unescapeValue = (0, _attribute.unescapeValue)(content),
              unescaped = _unescapeValue.unescaped,
              quoteMark = _unescapeValue.quoteMark;

          node.value = unescaped;
          node.quoteMark = quoteMark;
          lastAdded = 'value';
          (0, _util.ensureObject)(node, 'raws');
          node.raws.value = content;
          spaceAfterMeaningfulToken = false;
          break;

        case tokens.equals:
          if (!node.attribute) {
            return this.expected('attribute', token[_tokenize.FIELDS.START_POS], content);
          }

          if (node.value) {
            return this.error('Unexpected "=" found; an operator was already defined.', {
              index: token[_tokenize.FIELDS.START_POS]
            });
          }

          node.operator = node.operator ? node.operator + content : content;
          lastAdded = 'operator';
          spaceAfterMeaningfulToken = false;
          break;

        case tokens.comment:
          if (lastAdded) {
            if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === 'insensitive') {
              var lastComment = (0, _util.getProp)(node, 'spaces', lastAdded, 'after') || '';
              var rawLastComment = (0, _util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || lastComment;
              (0, _util.ensureObject)(node, 'raws', 'spaces', lastAdded);
              node.raws.spaces[lastAdded].after = rawLastComment + content;
            } else {
              var lastValue = node[lastAdded] || '';
              var rawLastValue = (0, _util.getProp)(node, 'raws', lastAdded) || lastValue;
              (0, _util.ensureObject)(node, 'raws');
              node.raws[lastAdded] = rawLastValue + content;
            }
          } else {
            commentBefore = commentBefore + content;
          }

          break;

        default:
          return this.error("Unexpected \"" + content + "\" found.", {
            index: token[_tokenize.FIELDS.START_POS]
          });
      }

      pos++;
    }

    unescapeProp(node, "attribute");
    unescapeProp(node, "namespace");
    this.newNode(new _attribute.default(node));
    this.position++;
  }
  /**
   * return a node containing meaningless garbage up to (but not including) the specified token position.
   * if the token position is negative, all remaining tokens are consumed.
   *
   * This returns an array containing a single string node if all whitespace,
   * otherwise an array of comment nodes with space before and after.
   *
   * These tokens are not added to the current selector, the caller can add them or use them to amend
   * a previous node's space metadata.
   *
   * In lossy mode, this returns only comments.
   */
  ;

  _proto.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
    if (stopPosition < 0) {
      stopPosition = this.tokens.length;
    }

    var startPosition = this.position;
    var nodes = [];
    var space = "";
    var lastComment = undefined;

    do {
      if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
        if (!this.options.lossy) {
          space += this.content();
        }
      } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
        var spaces = {};

        if (space) {
          spaces.before = space;
          space = "";
        }

        lastComment = new _comment.default({
          value: this.content(),
          source: getTokenSource(this.currToken),
          sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
          spaces: spaces
        });
        nodes.push(lastComment);
      }
    } while (++this.position < stopPosition);

    if (space) {
      if (lastComment) {
        lastComment.spaces.after = space;
      } else if (!this.options.lossy) {
        var firstToken = this.tokens[startPosition];
        var lastToken = this.tokens[this.position - 1];
        nodes.push(new _string.default({
          value: '',
          source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
          sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
          spaces: {
            before: space,
            after: ''
          }
        }));
      }
    }

    return nodes;
  }
  /**
   * 
   * @param {*} nodes 
   */
  ;

  _proto.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes, requiredSpace) {
    var _this2 = this;

    if (requiredSpace === void 0) {
      requiredSpace = false;
    }

    var space = "";
    var rawSpace = "";
    nodes.forEach(function (n) {
      var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);

      var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);

      space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
      rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
    });

    if (rawSpace === space) {
      rawSpace = undefined;
    }

    var result = {
      space: space,
      rawSpace: rawSpace
    };
    return result;
  };

  _proto.isNamedCombinator = function isNamedCombinator(position) {
    if (position === void 0) {
      position = this.position;
    }

    return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
  };

  _proto.namedCombinator = function namedCombinator() {
    if (this.isNamedCombinator()) {
      var nameRaw = this.content(this.tokens[this.position + 1]);
      var name = (0, _util.unesc)(nameRaw).toLowerCase();
      var raws = {};

      if (name !== nameRaw) {
        raws.value = "/" + nameRaw + "/";
      }

      var node = new _combinator.default({
        value: "/" + name + "/",
        source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
        sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
        raws: raws
      });
      this.position = this.position + 3;
      return node;
    } else {
      this.unexpected();
    }
  };

  _proto.combinator = function combinator() {
    var _this3 = this;

    if (this.content() === '|') {
      return this.namespace();
    } // We need to decide between a space that's a descendant combinator and meaningless whitespace at the end of a selector.


    var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);

    if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma) {
      var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);

      if (nodes.length > 0) {
        var last = this.current.last;

        if (last) {
          var _this$convertWhitespa = this.convertWhitespaceNodesToSpace(nodes),
              space = _this$convertWhitespa.space,
              rawSpace = _this$convertWhitespa.rawSpace;

          if (rawSpace !== undefined) {
            last.rawSpaceAfter += rawSpace;
          }

          last.spaces.after += space;
        } else {
          nodes.forEach(function (n) {
            return _this3.newNode(n);
          });
        }
      }

      return;
    }

    var firstToken = this.currToken;
    var spaceOrDescendantSelectorNodes = undefined;

    if (nextSigTokenPos > this.position) {
      spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
    }

    var node;

    if (this.isNamedCombinator()) {
      node = this.namedCombinator();
    } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
      node = new _combinator.default({
        value: this.content(),
        source: getTokenSource(this.currToken),
        sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
      });
      this.position++;
    } else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {// pass
    } else if (!spaceOrDescendantSelectorNodes) {
      this.unexpected();
    }

    if (node) {
      if (spaceOrDescendantSelectorNodes) {
        var _this$convertWhitespa2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes),
            _space = _this$convertWhitespa2.space,
            _rawSpace = _this$convertWhitespa2.rawSpace;

        node.spaces.before = _space;
        node.rawSpaceBefore = _rawSpace;
      }
    } else {
      // descendant combinator
      var _this$convertWhitespa3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true),
          _space2 = _this$convertWhitespa3.space,
          _rawSpace2 = _this$convertWhitespa3.rawSpace;

      if (!_rawSpace2) {
        _rawSpace2 = _space2;
      }

      var spaces = {};
      var raws = {
        spaces: {}
      };

      if (_space2.endsWith(' ') && _rawSpace2.endsWith(' ')) {
        spaces.before = _space2.slice(0, _space2.length - 1);
        raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
      } else if (_space2.startsWith(' ') && _rawSpace2.startsWith(' ')) {
        spaces.after = _space2.slice(1);
        raws.spaces.after = _rawSpace2.slice(1);
      } else {
        raws.value = _rawSpace2;
      }

      node = new _combinator.default({
        value: ' ',
        source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
        sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
        spaces: spaces,
        raws: raws
      });
    }

    if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
      node.spaces.after = this.optionalSpace(this.content());
      this.position++;
    }

    return this.newNode(node);
  };

  _proto.comma = function comma() {
    if (this.position === this.tokens.length - 1) {
      this.root.trailingComma = true;
      this.position++;
      return;
    }

    this.current._inferEndPosition();

    var selector = new _selector.default({
      source: {
        start: tokenStart(this.tokens[this.position + 1])
      }
    });
    this.current.parent.append(selector);
    this.current = selector;
    this.position++;
  };

  _proto.comment = function comment() {
    var current = this.currToken;
    this.newNode(new _comment.default({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }));
    this.position++;
  };

  _proto.error = function error(message, opts) {
    throw this.root.error(message, opts);
  };

  _proto.missingBackslash = function missingBackslash() {
    return this.error('Expected a backslash preceding the semicolon.', {
      index: this.currToken[_tokenize.FIELDS.START_POS]
    });
  };

  _proto.missingParenthesis = function missingParenthesis() {
    return this.expected('opening parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
  };

  _proto.missingSquareBracket = function missingSquareBracket() {
    return this.expected('opening square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
  };

  _proto.unexpected = function unexpected() {
    return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[_tokenize.FIELDS.START_POS]);
  };

  _proto.namespace = function namespace() {
    var before = this.prevToken && this.content(this.prevToken) || true;

    if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
      this.position++;
      return this.word(before);
    } else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
      this.position++;
      return this.universal(before);
    }
  };

  _proto.nesting = function nesting() {
    if (this.nextToken) {
      var nextContent = this.content(this.nextToken);

      if (nextContent === "|") {
        this.position++;
        return;
      }
    }

    var current = this.currToken;
    this.newNode(new _nesting.default({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }));
    this.position++;
  };

  _proto.parentheses = function parentheses() {
    var last = this.current.last;
    var unbalanced = 1;
    this.position++;

    if (last && last.type === types.PSEUDO) {
      var selector = new _selector.default({
        source: {
          start: tokenStart(this.tokens[this.position - 1])
        }
      });
      var cache = this.current;
      last.append(selector);
      this.current = selector;

      while (this.position < this.tokens.length && unbalanced) {
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
          unbalanced++;
        }

        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
          unbalanced--;
        }

        if (unbalanced) {
          this.parse();
        } else {
          this.current.source.end = tokenEnd(this.currToken);
          this.current.parent.source.end = tokenEnd(this.currToken);
          this.position++;
        }
      }

      this.current = cache;
    } else {
      // I think this case should be an error. It's used to implement a basic parse of media queries
      // but I don't think it's a good idea.
      var parenStart = this.currToken;
      var parenValue = "(";
      var parenEnd;

      while (this.position < this.tokens.length && unbalanced) {
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
          unbalanced++;
        }

        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
          unbalanced--;
        }

        parenEnd = this.currToken;
        parenValue += this.parseParenthesisToken(this.currToken);
        this.position++;
      }

      if (last) {
        last.appendToPropertyAndEscape("value", parenValue, parenValue);
      } else {
        this.newNode(new _string.default({
          value: parenValue,
          source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
          sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
        }));
      }
    }

    if (unbalanced) {
      return this.expected('closing parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
    }
  };

  _proto.pseudo = function pseudo() {
    var _this4 = this;

    var pseudoStr = '';
    var startingToken = this.currToken;

    while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
      pseudoStr += this.content();
      this.position++;
    }

    if (!this.currToken) {
      return this.expected(['pseudo-class', 'pseudo-element'], this.position - 1);
    }

    if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) {
      this.splitWord(false, function (first, length) {
        pseudoStr += first;

        _this4.newNode(new _pseudo.default({
          value: pseudoStr,
          source: getTokenSourceSpan(startingToken, _this4.currToken),
          sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
        }));

        if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
          _this4.error('Misplaced parenthesis.', {
            index: _this4.nextToken[_tokenize.FIELDS.START_POS]
          });
        }
      });
    } else {
      return this.expected(['pseudo-class', 'pseudo-element'], this.currToken[_tokenize.FIELDS.START_POS]);
    }
  };

  _proto.space = function space() {
    var content = this.content(); // Handle space before and after the selector

    if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
      this.spaces = this.optionalSpace(content);
      this.position++;
    } else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
      this.current.last.spaces.after = this.optionalSpace(content);
      this.position++;
    } else {
      this.combinator();
    }
  };

  _proto.string = function string() {
    var current = this.currToken;
    this.newNode(new _string.default({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }));
    this.position++;
  };

  _proto.universal = function universal(namespace) {
    var nextToken = this.nextToken;

    if (nextToken && this.content(nextToken) === '|') {
      this.position++;
      return this.namespace();
    }

    var current = this.currToken;
    this.newNode(new _universal.default({
      value: this.content(),
      source: getTokenSource(current),
      sourceIndex: current[_tokenize.FIELDS.START_POS]
    }), namespace);
    this.position++;
  };

  _proto.splitWord = function splitWord(namespace, firstCallback) {
    var _this5 = this;

    var nextToken = this.nextToken;
    var word = this.content();

    while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
      this.position++;
      var current = this.content();
      word += current;

      if (current.lastIndexOf('\\') === current.length - 1) {
        var next = this.nextToken;

        if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
          word += this.requiredSpace(this.content(next));
          this.position++;
        }
      }

      nextToken = this.nextToken;
    }

    var hasClass = (0, _indexesOf.default)(word, '.').filter(function (i) {
      return word[i - 1] !== '\\';
    });
    var hasId = (0, _indexesOf.default)(word, '#').filter(function (i) {
      return word[i - 1] !== '\\';
    }); // Eliminate Sass interpolations from the list of id indexes

    var interpolations = (0, _indexesOf.default)(word, '#{');

    if (interpolations.length) {
      hasId = hasId.filter(function (hashIndex) {
        return !~interpolations.indexOf(hashIndex);
      });
    }

    var indices = (0, _sortAscending.default)((0, _uniq.default)([0].concat(hasClass, hasId)));
    indices.forEach(function (ind, i) {
      var index = indices[i + 1] || word.length;
      var value = word.slice(ind, index);

      if (i === 0 && firstCallback) {
        return firstCallback.call(_this5, value, indices.length);
      }

      var node;
      var current = _this5.currToken;
      var sourceIndex = current[_tokenize.FIELDS.START_POS] + indices[i];
      var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));

      if (~hasClass.indexOf(ind)) {
        var classNameOpts = {
          value: value.slice(1),
          source: source,
          sourceIndex: sourceIndex
        };
        node = new _className.default(unescapeProp(classNameOpts, "value"));
      } else if (~hasId.indexOf(ind)) {
        var idOpts = {
          value: value.slice(1),
          source: source,
          sourceIndex: sourceIndex
        };
        node = new _id.default(unescapeProp(idOpts, "value"));
      } else {
        var tagOpts = {
          value: value,
          source: source,
          sourceIndex: sourceIndex
        };
        unescapeProp(tagOpts, "value");
        node = new _tag.default(tagOpts);
      }

      _this5.newNode(node, namespace); // Ensure that the namespace is used only once


      namespace = null;
    });
    this.position++;
  };

  _proto.word = function word(namespace) {
    var nextToken = this.nextToken;

    if (nextToken && this.content(nextToken) === '|') {
      this.position++;
      return this.namespace();
    }

    return this.splitWord(namespace);
  };

  _proto.loop = function loop() {
    while (this.position < this.tokens.length) {
      this.parse(true);
    }

    this.current._inferEndPosition();

    return this.root;
  };

  _proto.parse = function parse(throwOnParenthesis) {
    switch (this.currToken[_tokenize.FIELDS.TYPE]) {
      case tokens.space:
        this.space();
        break;

      case tokens.comment:
        this.comment();
        break;

      case tokens.openParenthesis:
        this.parentheses();
        break;

      case tokens.closeParenthesis:
        if (throwOnParenthesis) {
          this.missingParenthesis();
        }

        break;

      case tokens.openSquare:
        this.attribute();
        break;

      case tokens.dollar:
      case tokens.caret:
      case tokens.equals:
      case tokens.word:
        this.word();
        break;

      case tokens.colon:
        this.pseudo();
        break;

      case tokens.comma:
        this.comma();
        break;

      case tokens.asterisk:
        this.universal();
        break;

      case tokens.ampersand:
        this.nesting();
        break;

      case tokens.slash:
      case tokens.combinator:
        this.combinator();
        break;

      case tokens.str:
        this.string();
        break;
      // These cases throw; no break needed.

      case tokens.closeSquare:
        this.missingSquareBracket();

      case tokens.semicolon:
        this.missingBackslash();

      default:
        this.unexpected();
    }
  }
  /**
   * Helpers
   */
  ;

  _proto.expected = function expected(description, index, found) {
    if (Array.isArray(description)) {
      var last = description.pop();
      description = description.join(', ') + " or " + last;
    }

    var an = /^[aeiou]/.test(description[0]) ? 'an' : 'a';

    if (!found) {
      return this.error("Expected " + an + " " + description + ".", {
        index: index
      });
    }

    return this.error("Expected " + an + " " + description + ", found \"" + found + "\" instead.", {
      index: index
    });
  };

  _proto.requiredSpace = function requiredSpace(space) {
    return this.options.lossy ? ' ' : space;
  };

  _proto.optionalSpace = function optionalSpace(space) {
    return this.options.lossy ? '' : space;
  };

  _proto.lossySpace = function lossySpace(space, required) {
    if (this.options.lossy) {
      return required ? ' ' : '';
    } else {
      return space;
    }
  };

  _proto.parseParenthesisToken = function parseParenthesisToken(token) {
    var content = this.content(token);

    if (token[_tokenize.FIELDS.TYPE] === tokens.space) {
      return this.requiredSpace(content);
    } else {
      return content;
    }
  };

  _proto.newNode = function newNode(node, namespace) {
    if (namespace) {
      if (/^ +$/.test(namespace)) {
        if (!this.options.lossy) {
          this.spaces = (this.spaces || '') + namespace;
        }

        namespace = true;
      }

      node.namespace = namespace;
      unescapeProp(node, "namespace");
    }

    if (this.spaces) {
      node.spaces.before = this.spaces;
      this.spaces = '';
    }

    return this.current.append(node);
  };

  _proto.content = function content(token) {
    if (token === void 0) {
      token = this.currToken;
    }

    return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
  };

  /**
   * returns the index of the next non-whitespace, non-comment token.
   * returns -1 if no meaningful token is found.
   */
  _proto.locateNextMeaningfulToken = function locateNextMeaningfulToken(startPosition) {
    if (startPosition === void 0) {
      startPosition = this.position + 1;
    }

    var searchPosition = startPosition;

    while (searchPosition < this.tokens.length) {
      if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
        searchPosition++;
        continue;
      } else {
        return searchPosition;
      }
    }

    return -1;
  };

  _createClass(Parser, [{
    key: "currToken",
    get: function get() {
      return this.tokens[this.position];
    }
  }, {
    key: "nextToken",
    get: function get() {
      return this.tokens[this.position + 1];
    }
  }, {
    key: "prevToken",
    get: function get() {
      return this.tokens[this.position - 1];
    }
  }]);

  return Parser;
}();

exports.default = Parser;
module.exports = exports.default;

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = function (ary, item) {
  var i = -1, indexes = []
  while((i = ary.indexOf(item, i + 1)) !== -1)
    indexes.push(i)
  return indexes
}


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(60));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Root =
/*#__PURE__*/
function (_Container) {
  _inheritsLoose(Root, _Container);

  function Root(opts) {
    var _this;

    _this = _Container.call(this, opts) || this;
    _this.type = _types.ROOT;
    return _this;
  }

  var _proto = Root.prototype;

  _proto.toString = function toString() {
    var str = this.reduce(function (memo, selector) {
      memo.push(String(selector));
      return memo;
    }, []).join(',');
    return this.trailingComma ? str + ',' : str;
  };

  _proto.error = function error(message, options) {
    if (this._error) {
      return this._error(message, options);
    } else {
      return new Error(message);
    }
  };

  _createClass(Root, [{
    key: "errorGenerator",
    set: function set(handler) {
      this._error = handler;
    }
  }]);

  return Root;
}(_container.default);

exports.default = Root;
module.exports = exports.default;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(61));

var types = _interopRequireWildcard(__webpack_require__(67));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Container =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Container, _Node);

  function Container(opts) {
    var _this;

    _this = _Node.call(this, opts) || this;

    if (!_this.nodes) {
      _this.nodes = [];
    }

    return _this;
  }

  var _proto = Container.prototype;

  _proto.append = function append(selector) {
    selector.parent = this;
    this.nodes.push(selector);
    return this;
  };

  _proto.prepend = function prepend(selector) {
    selector.parent = this;
    this.nodes.unshift(selector);
    return this;
  };

  _proto.at = function at(index) {
    return this.nodes[index];
  };

  _proto.index = function index(child) {
    if (typeof child === 'number') {
      return child;
    }

    return this.nodes.indexOf(child);
  };

  _proto.removeChild = function removeChild(child) {
    child = this.index(child);
    this.at(child).parent = undefined;
    this.nodes.splice(child, 1);
    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (index >= child) {
        this.indexes[id] = index - 1;
      }
    }

    return this;
  };

  _proto.removeAll = function removeAll() {
    for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var node = _ref;
      node.parent = undefined;
    }

    this.nodes = [];
    return this;
  };

  _proto.empty = function empty() {
    return this.removeAll();
  };

  _proto.insertAfter = function insertAfter(oldNode, newNode) {
    newNode.parent = this;
    var oldIndex = this.index(oldNode);
    this.nodes.splice(oldIndex + 1, 0, newNode);
    newNode.parent = this;
    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (oldIndex <= index) {
        this.indexes[id] = index + 1;
      }
    }

    return this;
  };

  _proto.insertBefore = function insertBefore(oldNode, newNode) {
    newNode.parent = this;
    var oldIndex = this.index(oldNode);
    this.nodes.splice(oldIndex, 0, newNode);
    newNode.parent = this;
    var index;

    for (var id in this.indexes) {
      index = this.indexes[id];

      if (index <= oldIndex) {
        this.indexes[id] = index + 1;
      }
    }

    return this;
  };

  _proto._findChildAtPosition = function _findChildAtPosition(line, col) {
    var found = undefined;
    this.each(function (node) {
      if (node.atPosition) {
        var foundChild = node.atPosition(line, col);

        if (foundChild) {
          found = foundChild;
          return false;
        }
      } else if (node.isAtPosition(line, col)) {
        found = node;
        return false;
      }
    });
    return found;
  }
  /**
   * Return the most specific node at the line and column number given.
   * The source location is based on the original parsed location, locations aren't
   * updated as selector nodes are mutated.
   * 
   * Note that this location is relative to the location of the first character
   * of the selector, and not the location of the selector in the overall document
   * when used in conjunction with postcss.
   *
   * If not found, returns undefined.
   * @param {number} line The line number of the node to find. (1-based index)
   * @param {number} col  The column number of the node to find. (1-based index)
   */
  ;

  _proto.atPosition = function atPosition(line, col) {
    if (this.isAtPosition(line, col)) {
      return this._findChildAtPosition(line, col) || this;
    } else {
      return undefined;
    }
  };

  _proto._inferEndPosition = function _inferEndPosition() {
    if (this.last && this.last.source && this.last.source.end) {
      this.source = this.source || {};
      this.source.end = this.source.end || {};
      Object.assign(this.source.end, this.last.source.end);
    }
  };

  _proto.each = function each(callback) {
    if (!this.lastEach) {
      this.lastEach = 0;
    }

    if (!this.indexes) {
      this.indexes = {};
    }

    this.lastEach++;
    var id = this.lastEach;
    this.indexes[id] = 0;

    if (!this.length) {
      return undefined;
    }

    var index, result;

    while (this.indexes[id] < this.length) {
      index = this.indexes[id];
      result = callback(this.at(index), index);

      if (result === false) {
        break;
      }

      this.indexes[id] += 1;
    }

    delete this.indexes[id];

    if (result === false) {
      return false;
    }
  };

  _proto.walk = function walk(callback) {
    return this.each(function (node, i) {
      var result = callback(node, i);

      if (result !== false && node.length) {
        result = node.walk(callback);
      }

      if (result === false) {
        return false;
      }
    });
  };

  _proto.walkAttributes = function walkAttributes(callback) {
    var _this2 = this;

    return this.walk(function (selector) {
      if (selector.type === types.ATTRIBUTE) {
        return callback.call(_this2, selector);
      }
    });
  };

  _proto.walkClasses = function walkClasses(callback) {
    var _this3 = this;

    return this.walk(function (selector) {
      if (selector.type === types.CLASS) {
        return callback.call(_this3, selector);
      }
    });
  };

  _proto.walkCombinators = function walkCombinators(callback) {
    var _this4 = this;

    return this.walk(function (selector) {
      if (selector.type === types.COMBINATOR) {
        return callback.call(_this4, selector);
      }
    });
  };

  _proto.walkComments = function walkComments(callback) {
    var _this5 = this;

    return this.walk(function (selector) {
      if (selector.type === types.COMMENT) {
        return callback.call(_this5, selector);
      }
    });
  };

  _proto.walkIds = function walkIds(callback) {
    var _this6 = this;

    return this.walk(function (selector) {
      if (selector.type === types.ID) {
        return callback.call(_this6, selector);
      }
    });
  };

  _proto.walkNesting = function walkNesting(callback) {
    var _this7 = this;

    return this.walk(function (selector) {
      if (selector.type === types.NESTING) {
        return callback.call(_this7, selector);
      }
    });
  };

  _proto.walkPseudos = function walkPseudos(callback) {
    var _this8 = this;

    return this.walk(function (selector) {
      if (selector.type === types.PSEUDO) {
        return callback.call(_this8, selector);
      }
    });
  };

  _proto.walkTags = function walkTags(callback) {
    var _this9 = this;

    return this.walk(function (selector) {
      if (selector.type === types.TAG) {
        return callback.call(_this9, selector);
      }
    });
  };

  _proto.walkUniversals = function walkUniversals(callback) {
    var _this10 = this;

    return this.walk(function (selector) {
      if (selector.type === types.UNIVERSAL) {
        return callback.call(_this10, selector);
      }
    });
  };

  _proto.split = function split(callback) {
    var _this11 = this;

    var current = [];
    return this.reduce(function (memo, node, index) {
      var split = callback.call(_this11, node);
      current.push(node);

      if (split) {
        memo.push(current);
        current = [];
      } else if (index === _this11.length - 1) {
        memo.push(current);
      }

      return memo;
    }, []);
  };

  _proto.map = function map(callback) {
    return this.nodes.map(callback);
  };

  _proto.reduce = function reduce(callback, memo) {
    return this.nodes.reduce(callback, memo);
  };

  _proto.every = function every(callback) {
    return this.nodes.every(callback);
  };

  _proto.some = function some(callback) {
    return this.nodes.some(callback);
  };

  _proto.filter = function filter(callback) {
    return this.nodes.filter(callback);
  };

  _proto.sort = function sort(callback) {
    return this.nodes.sort(callback);
  };

  _proto.toString = function toString() {
    return this.map(String).join('');
  };

  _createClass(Container, [{
    key: "first",
    get: function get() {
      return this.at(0);
    }
  }, {
    key: "last",
    get: function get() {
      return this.at(this.length - 1);
    }
  }, {
    key: "length",
    get: function get() {
      return this.nodes.length;
    }
  }]);

  return Container;
}(_node.default);

exports.default = Container;
module.exports = exports.default;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _util = __webpack_require__(62);

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var cloneNode = function cloneNode(obj, parent) {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  var cloned = new obj.constructor();

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) {
      continue;
    }

    var value = obj[i];
    var type = typeof value;

    if (i === 'parent' && type === 'object') {
      if (parent) {
        cloned[i] = parent;
      }
    } else if (value instanceof Array) {
      cloned[i] = value.map(function (j) {
        return cloneNode(j, cloned);
      });
    } else {
      cloned[i] = cloneNode(value, cloned);
    }
  }

  return cloned;
};

var Node =
/*#__PURE__*/
function () {
  function Node(opts) {
    if (opts === void 0) {
      opts = {};
    }

    Object.assign(this, opts);
    this.spaces = this.spaces || {};
    this.spaces.before = this.spaces.before || '';
    this.spaces.after = this.spaces.after || '';
  }

  var _proto = Node.prototype;

  _proto.remove = function remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.parent = undefined;
    return this;
  };

  _proto.replaceWith = function replaceWith() {
    if (this.parent) {
      for (var index in arguments) {
        this.parent.insertBefore(this, arguments[index]);
      }

      this.remove();
    }

    return this;
  };

  _proto.next = function next() {
    return this.parent.at(this.parent.index(this) + 1);
  };

  _proto.prev = function prev() {
    return this.parent.at(this.parent.index(this) - 1);
  };

  _proto.clone = function clone(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = cloneNode(this);

    for (var name in overrides) {
      cloned[name] = overrides[name];
    }

    return cloned;
  }
  /**
   * Some non-standard syntax doesn't follow normal escaping rules for css.
   * This allows non standard syntax to be appended to an existing property
   * by specifying the escaped value. By specifying the escaped value,
   * illegal characters are allowed to be directly inserted into css output.
   * @param {string} name the property to set
   * @param {any} value the unescaped value of the property
   * @param {string} valueEscaped optional. the escaped value of the property.
   */
  ;

  _proto.appendToPropertyAndEscape = function appendToPropertyAndEscape(name, value, valueEscaped) {
    if (!this.raws) {
      this.raws = {};
    }

    var originalValue = this[name];
    var originalEscaped = this.raws[name];
    this[name] = originalValue + value; // this may trigger a setter that updates raws, so it has to be set first.

    if (originalEscaped || valueEscaped !== value) {
      this.raws[name] = (originalEscaped || originalValue) + valueEscaped;
    } else {
      delete this.raws[name]; // delete any escaped value that was created by the setter.
    }
  }
  /**
   * Some non-standard syntax doesn't follow normal escaping rules for css.
   * This allows the escaped value to be specified directly, allowing illegal
   * characters to be directly inserted into css output.
   * @param {string} name the property to set
   * @param {any} value the unescaped value of the property
   * @param {string} valueEscaped the escaped value of the property.
   */
  ;

  _proto.setPropertyAndEscape = function setPropertyAndEscape(name, value, valueEscaped) {
    if (!this.raws) {
      this.raws = {};
    }

    this[name] = value; // this may trigger a setter that updates raws, so it has to be set first.

    this.raws[name] = valueEscaped;
  }
  /**
   * When you want a value to passed through to CSS directly. This method
   * deletes the corresponding raw value causing the stringifier to fallback
   * to the unescaped value.
   * @param {string} name the property to set.
   * @param {any} value The value that is both escaped and unescaped.
   */
  ;

  _proto.setPropertyWithoutEscape = function setPropertyWithoutEscape(name, value) {
    this[name] = value; // this may trigger a setter that updates raws, so it has to be set first.

    if (this.raws) {
      delete this.raws[name];
    }
  }
  /**
   * 
   * @param {number} line The number (starting with 1)
   * @param {number} column The column number (starting with 1)
   */
  ;

  _proto.isAtPosition = function isAtPosition(line, column) {
    if (this.source && this.source.start && this.source.end) {
      if (this.source.start.line > line) {
        return false;
      }

      if (this.source.end.line < line) {
        return false;
      }

      if (this.source.start.line === line && this.source.start.column > column) {
        return false;
      }

      if (this.source.end.line === line && this.source.end.column < column) {
        return false;
      }

      return true;
    }

    return undefined;
  };

  _proto.stringifyProperty = function stringifyProperty(name) {
    return this.raws && this.raws[name] || this[name];
  };

  _proto.toString = function toString() {
    return [this.rawSpaceBefore, String(this.stringifyProperty("value")), this.rawSpaceAfter].join('');
  };

  _createClass(Node, [{
    key: "rawSpaceBefore",
    get: function get() {
      var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.before;

      if (rawSpace === undefined) {
        rawSpace = this.spaces && this.spaces.before;
      }

      return rawSpace || "";
    },
    set: function set(raw) {
      (0, _util.ensureObject)(this, "raws", "spaces");
      this.raws.spaces.before = raw;
    }
  }, {
    key: "rawSpaceAfter",
    get: function get() {
      var rawSpace = this.raws && this.raws.spaces && this.raws.spaces.after;

      if (rawSpace === undefined) {
        rawSpace = this.spaces.after;
      }

      return rawSpace || "";
    },
    set: function set(raw) {
      (0, _util.ensureObject)(this, "raws", "spaces");
      this.raws.spaces.after = raw;
    }
  }]);

  return Node;
}();

exports.default = Node;
module.exports = exports.default;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.stripComments = exports.ensureObject = exports.getProp = exports.unesc = void 0;

var _unesc = _interopRequireDefault(__webpack_require__(63));

exports.unesc = _unesc.default;

var _getProp = _interopRequireDefault(__webpack_require__(64));

exports.getProp = _getProp.default;

var _ensureObject = _interopRequireDefault(__webpack_require__(65));

exports.ensureObject = _ensureObject.default;

var _stripComments = _interopRequireDefault(__webpack_require__(66));

exports.stripComments = _stripComments.default;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = unesc;
var whitespace = '[\\x20\\t\\r\\n\\f]';
var unescapeRegExp = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig');

function unesc(str) {
  return str.replace(unescapeRegExp, function (_, escaped, escapedWhitespace) {
    var high = '0x' + escaped - 0x10000; // NaN means non-codepoint
    // Workaround erroneous numeric interpretation of +"0x"
    // eslint-disable-next-line no-self-compare

    return high !== high || escapedWhitespace ? escaped : high < 0 ? // BMP codepoint
    String.fromCharCode(high + 0x10000) : // Supplemental Plane codepoint (surrogate pair)
    String.fromCharCode(high >> 10 | 0xd800, high & 0x3ff | 0xdc00);
  });
}

module.exports = exports.default;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = getProp;

function getProp(obj) {
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  while (props.length > 0) {
    var prop = props.shift();

    if (!obj[prop]) {
      return undefined;
    }

    obj = obj[prop];
  }

  return obj;
}

module.exports = exports.default;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = ensureObject;

function ensureObject(obj) {
  for (var _len = arguments.length, props = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    props[_key - 1] = arguments[_key];
  }

  while (props.length > 0) {
    var prop = props.shift();

    if (!obj[prop]) {
      obj[prop] = {};
    }

    obj = obj[prop];
  }
}

module.exports = exports.default;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = stripComments;

function stripComments(str) {
  var s = "";
  var commentStart = str.indexOf("/*");
  var lastEnd = 0;

  while (commentStart >= 0) {
    s = s + str.slice(lastEnd, commentStart);
    var commentEnd = str.indexOf("*/", commentStart + 2);

    if (commentEnd < 0) {
      return s;
    }

    lastEnd = commentEnd + 2;
    commentStart = str.indexOf("/*", lastEnd);
  }

  s = s + str.slice(lastEnd);
  return s;
}

module.exports = exports.default;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.UNIVERSAL = exports.ATTRIBUTE = exports.CLASS = exports.COMBINATOR = exports.COMMENT = exports.ID = exports.NESTING = exports.PSEUDO = exports.ROOT = exports.SELECTOR = exports.STRING = exports.TAG = void 0;
var TAG = 'tag';
exports.TAG = TAG;
var STRING = 'string';
exports.STRING = STRING;
var SELECTOR = 'selector';
exports.SELECTOR = SELECTOR;
var ROOT = 'root';
exports.ROOT = ROOT;
var PSEUDO = 'pseudo';
exports.PSEUDO = PSEUDO;
var NESTING = 'nesting';
exports.NESTING = NESTING;
var ID = 'id';
exports.ID = ID;
var COMMENT = 'comment';
exports.COMMENT = COMMENT;
var COMBINATOR = 'combinator';
exports.COMBINATOR = COMBINATOR;
var CLASS = 'class';
exports.CLASS = CLASS;
var ATTRIBUTE = 'attribute';
exports.ATTRIBUTE = ATTRIBUTE;
var UNIVERSAL = 'universal';
exports.UNIVERSAL = UNIVERSAL;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(60));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Selector =
/*#__PURE__*/
function (_Container) {
  _inheritsLoose(Selector, _Container);

  function Selector(opts) {
    var _this;

    _this = _Container.call(this, opts) || this;
    _this.type = _types.SELECTOR;
    return _this;
  }

  return Selector;
}(_container.default);

exports.default = Selector;
module.exports = exports.default;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _cssesc = _interopRequireDefault(__webpack_require__(70));

var _util = __webpack_require__(62);

var _node = _interopRequireDefault(__webpack_require__(61));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ClassName =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(ClassName, _Node);

  function ClassName(opts) {
    var _this;

    _this = _Node.call(this, opts) || this;
    _this.type = _types.CLASS;
    _this._constructed = true;
    return _this;
  }

  var _proto = ClassName.prototype;

  _proto.toString = function toString() {
    return [this.rawSpaceBefore, String('.' + this.stringifyProperty("value")), this.rawSpaceAfter].join('');
  };

  _createClass(ClassName, [{
    key: "value",
    set: function set(v) {
      if (this._constructed) {
        var escaped = (0, _cssesc.default)(v, {
          isIdentifier: true
        });

        if (escaped !== v) {
          (0, _util.ensureObject)(this, "raws");
          this.raws.value = escaped;
        } else if (this.raws) {
          delete this.raws.value;
        }
      }

      this._value = v;
    },
    get: function get() {
      return this._value;
    }
  }]);

  return ClassName;
}(_node.default);

exports.default = ClassName;
module.exports = exports.default;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*! https://mths.be/cssesc v3.0.0 by @mathias */


var object = {};
var hasOwnProperty = object.hasOwnProperty;
var merge = function merge(options, defaults) {
	if (!options) {
		return defaults;
	}
	var result = {};
	for (var key in defaults) {
		// `if (defaults.hasOwnProperty(key) { … }` is not needed here, since
		// only recognized option names are used.
		result[key] = hasOwnProperty.call(options, key) ? options[key] : defaults[key];
	}
	return result;
};

var regexAnySingleEscape = /[ -,\.\/:-@\[-\^`\{-~]/;
var regexSingleEscape = /[ -,\.\/:-@\[\]\^`\{-~]/;
var regexAlwaysEscape = /['"\\]/;
var regexExcessiveSpaces = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g;

// https://mathiasbynens.be/notes/css-escapes#css
var cssesc = function cssesc(string, options) {
	options = merge(options, cssesc.options);
	if (options.quotes != 'single' && options.quotes != 'double') {
		options.quotes = 'single';
	}
	var quote = options.quotes == 'double' ? '"' : '\'';
	var isIdentifier = options.isIdentifier;

	var firstChar = string.charAt(0);
	var output = '';
	var counter = 0;
	var length = string.length;
	while (counter < length) {
		var character = string.charAt(counter++);
		var codePoint = character.charCodeAt();
		var value = void 0;
		// If it’s not a printable ASCII character…
		if (codePoint < 0x20 || codePoint > 0x7E) {
			if (codePoint >= 0xD800 && codePoint <= 0xDBFF && counter < length) {
				// It’s a high surrogate, and there is a next character.
				var extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) {
					// next character is low surrogate
					codePoint = ((codePoint & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000;
				} else {
					// It’s an unmatched surrogate; only append this code unit, in case
					// the next code unit is the high surrogate of a surrogate pair.
					counter--;
				}
			}
			value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
		} else {
			if (options.escapeEverything) {
				if (regexAnySingleEscape.test(character)) {
					value = '\\' + character;
				} else {
					value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
				}
			} else if (/[\t\n\f\r\x0B]/.test(character)) {
				value = '\\' + codePoint.toString(16).toUpperCase() + ' ';
			} else if (character == '\\' || !isIdentifier && (character == '"' && quote == character || character == '\'' && quote == character) || isIdentifier && regexSingleEscape.test(character)) {
				value = '\\' + character;
			} else {
				value = character;
			}
		}
		output += value;
	}

	if (isIdentifier) {
		if (/^-[-\d]/.test(output)) {
			output = '\\-' + output.slice(1);
		} else if (/\d/.test(firstChar)) {
			output = '\\3' + firstChar + ' ' + output.slice(1);
		}
	}

	// Remove spaces after `\HEX` escapes that are not followed by a hex digit,
	// since they’re redundant. Note that this is only possible if the escape
	// sequence isn’t preceded by an odd number of backslashes.
	output = output.replace(regexExcessiveSpaces, function ($0, $1, $2) {
		if ($1 && $1.length % 2) {
			// It’s not safe to remove the space, so don’t.
			return $0;
		}
		// Strip the space.
		return ($1 || '') + $2;
	});

	if (!isIdentifier && options.wrap) {
		return quote + output + quote;
	}
	return output;
};

// Expose default options (so they can be overridden globally).
cssesc.options = {
	'escapeEverything': false,
	'isIdentifier': false,
	'quotes': 'single',
	'wrap': false
};

cssesc.version = '3.0.0';

module.exports = cssesc;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(61));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Comment =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Comment, _Node);

  function Comment(opts) {
    var _this;

    _this = _Node.call(this, opts) || this;
    _this.type = _types.COMMENT;
    return _this;
  }

  return Comment;
}(_node.default);

exports.default = Comment;
module.exports = exports.default;

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(61));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var ID =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(ID, _Node);

  function ID(opts) {
    var _this;

    _this = _Node.call(this, opts) || this;
    _this.type = _types.ID;
    return _this;
  }

  var _proto = ID.prototype;

  _proto.toString = function toString() {
    return [this.rawSpaceBefore, String('#' + this.stringifyProperty("value")), this.rawSpaceAfter].join('');
  };

  return ID;
}(_node.default);

exports.default = ID;
module.exports = exports.default;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _namespace = _interopRequireDefault(__webpack_require__(74));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Tag =
/*#__PURE__*/
function (_Namespace) {
  _inheritsLoose(Tag, _Namespace);

  function Tag(opts) {
    var _this;

    _this = _Namespace.call(this, opts) || this;
    _this.type = _types.TAG;
    return _this;
  }

  return Tag;
}(_namespace.default);

exports.default = Tag;
module.exports = exports.default;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _cssesc = _interopRequireDefault(__webpack_require__(70));

var _util = __webpack_require__(62);

var _node = _interopRequireDefault(__webpack_require__(61));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Namespace =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Namespace, _Node);

  function Namespace() {
    return _Node.apply(this, arguments) || this;
  }

  var _proto = Namespace.prototype;

  _proto.qualifiedName = function qualifiedName(value) {
    if (this.namespace) {
      return this.namespaceString + "|" + value;
    } else {
      return value;
    }
  };

  _proto.toString = function toString() {
    return [this.rawSpaceBefore, this.qualifiedName(this.stringifyProperty("value")), this.rawSpaceAfter].join('');
  };

  _createClass(Namespace, [{
    key: "namespace",
    get: function get() {
      return this._namespace;
    },
    set: function set(namespace) {
      if (namespace === true || namespace === "*" || namespace === "&") {
        this._namespace = namespace;

        if (this.raws) {
          delete this.raws.namespace;
        }

        return;
      }

      var escaped = (0, _cssesc.default)(namespace, {
        isIdentifier: true
      });
      this._namespace = namespace;

      if (escaped !== namespace) {
        (0, _util.ensureObject)(this, "raws");
        this.raws.namespace = escaped;
      } else if (this.raws) {
        delete this.raws.namespace;
      }
    }
  }, {
    key: "ns",
    get: function get() {
      return this._namespace;
    },
    set: function set(namespace) {
      this.namespace = namespace;
    }
  }, {
    key: "namespaceString",
    get: function get() {
      if (this.namespace) {
        var ns = this.stringifyProperty("namespace");

        if (ns === true) {
          return '';
        } else {
          return ns;
        }
      } else {
        return '';
      }
    }
  }]);

  return Namespace;
}(_node.default);

exports.default = Namespace;
;
module.exports = exports.default;

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(61));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var String =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(String, _Node);

  function String(opts) {
    var _this;

    _this = _Node.call(this, opts) || this;
    _this.type = _types.STRING;
    return _this;
  }

  return String;
}(_node.default);

exports.default = String;
module.exports = exports.default;

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _container = _interopRequireDefault(__webpack_require__(60));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Pseudo =
/*#__PURE__*/
function (_Container) {
  _inheritsLoose(Pseudo, _Container);

  function Pseudo(opts) {
    var _this;

    _this = _Container.call(this, opts) || this;
    _this.type = _types.PSEUDO;
    return _this;
  }

  var _proto = Pseudo.prototype;

  _proto.toString = function toString() {
    var params = this.length ? '(' + this.map(String).join(',') + ')' : '';
    return [this.rawSpaceBefore, this.stringifyProperty("value"), params, this.rawSpaceAfter].join('');
  };

  return Pseudo;
}(_container.default);

exports.default = Pseudo;
module.exports = exports.default;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.unescapeValue = unescapeValue;
exports.default = void 0;

var _cssesc = _interopRequireDefault(__webpack_require__(70));

var _unesc = _interopRequireDefault(__webpack_require__(63));

var _namespace = _interopRequireDefault(__webpack_require__(74));

var _types = __webpack_require__(67);

var _CSSESC_QUOTE_OPTIONS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var _require = __webpack_require__(78),
    deprecate = _require.deprecate;

var WRAPPED_IN_QUOTES = /^('|")(.*)\1$/;
var warnOfDeprecatedValueAssignment = deprecate(function () {}, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. " + "Call attribute.setValue() instead.");
var warnOfDeprecatedQuotedAssignment = deprecate(function () {}, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");
var warnOfDeprecatedConstructor = deprecate(function () {}, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");

function unescapeValue(value) {
  var deprecatedUsage = false;
  var quoteMark = null;
  var unescaped = value;
  var m = unescaped.match(WRAPPED_IN_QUOTES);

  if (m) {
    quoteMark = m[1];
    unescaped = m[2];
  }

  unescaped = (0, _unesc.default)(unescaped);

  if (unescaped !== value) {
    deprecatedUsage = true;
  }

  return {
    deprecatedUsage: deprecatedUsage,
    unescaped: unescaped,
    quoteMark: quoteMark
  };
}

function handleDeprecatedContructorOpts(opts) {
  if (opts.quoteMark !== undefined) {
    return opts;
  }

  if (opts.value === undefined) {
    return opts;
  }

  warnOfDeprecatedConstructor();

  var _unescapeValue = unescapeValue(opts.value),
      quoteMark = _unescapeValue.quoteMark,
      unescaped = _unescapeValue.unescaped;

  if (!opts.raws) {
    opts.raws = {};
  }

  if (opts.raws.value === undefined) {
    opts.raws.value = opts.value;
  }

  opts.value = unescaped;
  opts.quoteMark = quoteMark;
  return opts;
}

var Attribute =
/*#__PURE__*/
function (_Namespace) {
  _inheritsLoose(Attribute, _Namespace);

  function Attribute(opts) {
    var _this;

    if (opts === void 0) {
      opts = {};
    }

    _this = _Namespace.call(this, handleDeprecatedContructorOpts(opts)) || this;
    _this.type = _types.ATTRIBUTE;
    _this.raws = _this.raws || {};
    Object.defineProperty(_this.raws, 'unquoted', {
      get: deprecate(function () {
        return _this.value;
      }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
      set: deprecate(function () {
        return _this.value;
      }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
    });
    _this._constructed = true;
    return _this;
  }
  /**
   * Returns the Attribute's value quoted such that it would be legal to use
   * in the value of a css file. The original value's quotation setting
   * used for stringification is left unchanged. See `setValue(value, options)`
   * if you want to control the quote settings of a new value for the attribute.
   *
   * You can also change the quotation used for the current value by setting quoteMark.
   *
   * Options:
   *   * quoteMark {'"' | "'" | null} - Use this value to quote the value. If this
   *     option is not set, the original value for quoteMark will be used. If
   *     indeterminate, a double quote is used. The legal values are:
   *     * `null` - the value will be unquoted and characters will be escaped as necessary.
   *     * `'` - the value will be quoted with a single quote and single quotes are escaped.
   *     * `"` - the value will be quoted with a double quote and double quotes are escaped.
   *   * preferCurrentQuoteMark {boolean} - if true, prefer the source quote mark
   *     over the quoteMark option value.
   *   * smart {boolean} - if true, will select a quote mark based on the value
   *     and the other options specified here. See the `smartQuoteMark()`
   *     method.
   **/


  var _proto = Attribute.prototype;

  _proto.getQuotedValue = function getQuotedValue(options) {
    if (options === void 0) {
      options = {};
    }

    var quoteMark = this._determineQuoteMark(options);

    var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
    var escaped = (0, _cssesc.default)(this._value, cssescopts);
    return escaped;
  };

  _proto._determineQuoteMark = function _determineQuoteMark(options) {
    return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
  }
  /**
   * Set the unescaped value with the specified quotation options. The value
   * provided must not include any wrapping quote marks -- those quotes will
   * be interpreted as part of the value and escaped accordingly.
   */
  ;

  _proto.setValue = function setValue(value, options) {
    if (options === void 0) {
      options = {};
    }

    this._value = value;
    this._quoteMark = this._determineQuoteMark(options);

    this._syncRawValue();
  }
  /**
   * Intelligently select a quoteMark value based on the value's contents. If
   * the value is a legal CSS ident, it will not be quoted. Otherwise a quote
   * mark will be picked that minimizes the number of escapes.
   *
   * If there's no clear winner, the quote mark from these options is used,
   * then the source quote mark (this is inverted if `preferCurrentQuoteMark` is
   * true). If the quoteMark is unspecified, a double quote is used.
   *
   * @param options This takes the quoteMark and preferCurrentQuoteMark options
   * from the quoteValue method.
   */
  ;

  _proto.smartQuoteMark = function smartQuoteMark(options) {
    var v = this.value;
    var numSingleQuotes = v.replace(/[^']/g, '').length;
    var numDoubleQuotes = v.replace(/[^"]/g, '').length;

    if (numSingleQuotes + numDoubleQuotes === 0) {
      var escaped = (0, _cssesc.default)(v, {
        isIdentifier: true
      });

      if (escaped === v) {
        return Attribute.NO_QUOTE;
      } else {
        var pref = this.preferredQuoteMark(options);

        if (pref === Attribute.NO_QUOTE) {
          // pick a quote mark that isn't none and see if it's smaller
          var quote = this.quoteMark || options.quoteMark || Attribute.DOUBLE_QUOTE;
          var opts = CSSESC_QUOTE_OPTIONS[quote];
          var quoteValue = (0, _cssesc.default)(v, opts);

          if (quoteValue.length < escaped.length) {
            return quote;
          }
        }

        return pref;
      }
    } else if (numDoubleQuotes === numSingleQuotes) {
      return this.preferredQuoteMark(options);
    } else if (numDoubleQuotes < numSingleQuotes) {
      return Attribute.DOUBLE_QUOTE;
    } else {
      return Attribute.SINGLE_QUOTE;
    }
  }
  /**
   * Selects the preferred quote mark based on the options and the current quote mark value.
   * If you want the quote mark to depend on the attribute value, call `smartQuoteMark(opts)`
   * instead.
   */
  ;

  _proto.preferredQuoteMark = function preferredQuoteMark(options) {
    var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;

    if (quoteMark === undefined) {
      quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
    }

    if (quoteMark === undefined) {
      quoteMark = Attribute.DOUBLE_QUOTE;
    }

    return quoteMark;
  };

  _proto._syncRawValue = function _syncRawValue() {
    var rawValue = (0, _cssesc.default)(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);

    if (rawValue === this._value) {
      if (this.raws) {
        delete this.raws.value;
      }
    } else {
      this.raws.value = rawValue;
    }
  };

  _proto._handleEscapes = function _handleEscapes(prop, value) {
    if (this._constructed) {
      var escaped = (0, _cssesc.default)(value, {
        isIdentifier: true
      });

      if (escaped !== value) {
        this.raws[prop] = escaped;
      } else {
        delete this.raws[prop];
      }
    }
  };

  _proto._spacesFor = function _spacesFor(name) {
    var attrSpaces = {
      before: '',
      after: ''
    };
    var spaces = this.spaces[name] || {};
    var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
    return Object.assign(attrSpaces, spaces, rawSpaces);
  };

  _proto._stringFor = function _stringFor(name, spaceName, concat) {
    if (spaceName === void 0) {
      spaceName = name;
    }

    if (concat === void 0) {
      concat = defaultAttrConcat;
    }

    var attrSpaces = this._spacesFor(spaceName);

    return concat(this.stringifyProperty(name), attrSpaces);
  }
  /**
   * returns the offset of the attribute part specified relative to the
   * start of the node of the output string.
   *
   * * "ns" - alias for "namespace"
   * * "namespace" - the namespace if it exists.
   * * "attribute" - the attribute name
   * * "attributeNS" - the start of the attribute or its namespace
   * * "operator" - the match operator of the attribute
   * * "value" - The value (string or identifier)
   * * "insensitive" - the case insensitivity flag;
   * @param part One of the possible values inside an attribute.
   * @returns -1 if the name is invalid or the value doesn't exist in this attribute.
   */
  ;

  _proto.offsetOf = function offsetOf(name) {
    var count = 1;

    var attributeSpaces = this._spacesFor("attribute");

    count += attributeSpaces.before.length;

    if (name === "namespace" || name === "ns") {
      return this.namespace ? count : -1;
    }

    if (name === "attributeNS") {
      return count;
    }

    count += this.namespaceString.length;

    if (this.namespace) {
      count += 1;
    }

    if (name === "attribute") {
      return count;
    }

    count += this.stringifyProperty("attribute").length;
    count += attributeSpaces.after.length;

    var operatorSpaces = this._spacesFor("operator");

    count += operatorSpaces.before.length;
    var operator = this.stringifyProperty("operator");

    if (name === "operator") {
      return operator ? count : -1;
    }

    count += operator.length;
    count += operatorSpaces.after.length;

    var valueSpaces = this._spacesFor("value");

    count += valueSpaces.before.length;
    var value = this.stringifyProperty("value");

    if (name === "value") {
      return value ? count : -1;
    }

    count += value.length;
    count += valueSpaces.after.length;

    var insensitiveSpaces = this._spacesFor("insensitive");

    count += insensitiveSpaces.before.length;

    if (name === "insensitive") {
      return this.insensitive ? count : -1;
    }

    return -1;
  };

  _proto.toString = function toString() {
    var _this2 = this;

    var selector = [this.rawSpaceBefore, '['];
    selector.push(this._stringFor('qualifiedAttribute', 'attribute'));

    if (this.operator && (this.value || this.value === '')) {
      selector.push(this._stringFor('operator'));
      selector.push(this._stringFor('value'));
      selector.push(this._stringFor('insensitiveFlag', 'insensitive', function (attrValue, attrSpaces) {
        if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
          attrSpaces.before = " ";
        }

        return defaultAttrConcat(attrValue, attrSpaces);
      }));
    }

    selector.push(']');
    selector.push(this.rawSpaceAfter);
    return selector.join('');
  };

  _createClass(Attribute, [{
    key: "quoted",
    get: function get() {
      var qm = this.quoteMark;
      return qm === "'" || qm === '"';
    },
    set: function set(value) {
      warnOfDeprecatedQuotedAssignment();
    }
    /**
     * returns a single (`'`) or double (`"`) quote character if the value is quoted.
     * returns `null` if the value is not quoted.
     * returns `undefined` if the quotation state is unknown (this can happen when
     * the attribute is constructed without specifying a quote mark.)
     */

  }, {
    key: "quoteMark",
    get: function get() {
      return this._quoteMark;
    }
    /**
     * Set the quote mark to be used by this attribute's value.
     * If the quote mark changes, the raw (escaped) value at `attr.raws.value` of the attribute
     * value is updated accordingly.
     *
     * @param {"'" | '"' | null} quoteMark The quote mark or `null` if the value should be unquoted.
     */
    ,
    set: function set(quoteMark) {
      if (!this._constructed) {
        this._quoteMark = quoteMark;
        return;
      }

      if (this._quoteMark !== quoteMark) {
        this._quoteMark = quoteMark;

        this._syncRawValue();
      }
    }
  }, {
    key: "qualifiedAttribute",
    get: function get() {
      return this.qualifiedName(this.raws.attribute || this.attribute);
    }
  }, {
    key: "insensitiveFlag",
    get: function get() {
      return this.insensitive ? 'i' : '';
    }
  }, {
    key: "value",
    get: function get() {
      return this._value;
    }
    /**
     * Before 3.0, the value had to be set to an escaped value including any wrapped
     * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
     * is unescaped during parsing and any quote marks are removed.
     *
     * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
     * a deprecation warning is raised when the new value contains any characters that would
     * require escaping (including if it contains wrapped quotes).
     *
     * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
     * how the new value is quoted.
     */
    ,
    set: function set(v) {
      if (this._constructed) {
        var _unescapeValue2 = unescapeValue(v),
            deprecatedUsage = _unescapeValue2.deprecatedUsage,
            unescaped = _unescapeValue2.unescaped,
            quoteMark = _unescapeValue2.quoteMark;

        if (deprecatedUsage) {
          warnOfDeprecatedValueAssignment();
        }

        if (unescaped === this._value && quoteMark === this._quoteMark) {
          return;
        }

        this._value = unescaped;
        this._quoteMark = quoteMark;

        this._syncRawValue();
      } else {
        this._value = v;
      }
    }
  }, {
    key: "attribute",
    get: function get() {
      return this._attribute;
    },
    set: function set(name) {
      this._handleEscapes("attribute", name);

      this._attribute = name;
    }
  }]);

  return Attribute;
}(_namespace.default);

exports.default = Attribute;
Attribute.NO_QUOTE = null;
Attribute.SINGLE_QUOTE = "'";
Attribute.DOUBLE_QUOTE = '"';
var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
  "'": {
    quotes: 'single',
    wrap: true
  },
  '"': {
    quotes: 'double',
    wrap: true
  }
}, _CSSESC_QUOTE_OPTIONS[null] = {
  isIdentifier: true
}, _CSSESC_QUOTE_OPTIONS);

function defaultAttrConcat(attrValue, attrSpaces) {
  return "" + attrSpaces.before + attrValue + attrSpaces.after;
}

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _namespace = _interopRequireDefault(__webpack_require__(74));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Universal =
/*#__PURE__*/
function (_Namespace) {
  _inheritsLoose(Universal, _Namespace);

  function Universal(opts) {
    var _this;

    _this = _Namespace.call(this, opts) || this;
    _this.type = _types.UNIVERSAL;
    _this.value = '*';
    return _this;
  }

  return Universal;
}(_namespace.default);

exports.default = Universal;
module.exports = exports.default;

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(61));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Combinator =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Combinator, _Node);

  function Combinator(opts) {
    var _this;

    _this = _Node.call(this, opts) || this;
    _this.type = _types.COMBINATOR;
    return _this;
  }

  return Combinator;
}(_node.default);

exports.default = Combinator;
module.exports = exports.default;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = void 0;

var _node = _interopRequireDefault(__webpack_require__(61));

var _types = __webpack_require__(67);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var Nesting =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Nesting, _Node);

  function Nesting(opts) {
    var _this;

    _this = _Node.call(this, opts) || this;
    _this.type = _types.NESTING;
    _this.value = '&';
    return _this;
  }

  return Nesting;
}(_node.default);

exports.default = Nesting;
module.exports = exports.default;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = sortAscending;

function sortAscending(list) {
  return list.sort(function (a, b) {
    return a - b;
  });
}

;
module.exports = exports.default;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.default = tokenize;
exports.FIELDS = void 0;

var t = _interopRequireWildcard(__webpack_require__(84));

var _unescapable, _wordDelimiters;

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var unescapable = (_unescapable = {}, _unescapable[t.tab] = true, _unescapable[t.newline] = true, _unescapable[t.cr] = true, _unescapable[t.feed] = true, _unescapable);
var wordDelimiters = (_wordDelimiters = {}, _wordDelimiters[t.space] = true, _wordDelimiters[t.tab] = true, _wordDelimiters[t.newline] = true, _wordDelimiters[t.cr] = true, _wordDelimiters[t.feed] = true, _wordDelimiters[t.ampersand] = true, _wordDelimiters[t.asterisk] = true, _wordDelimiters[t.bang] = true, _wordDelimiters[t.comma] = true, _wordDelimiters[t.colon] = true, _wordDelimiters[t.semicolon] = true, _wordDelimiters[t.openParenthesis] = true, _wordDelimiters[t.closeParenthesis] = true, _wordDelimiters[t.openSquare] = true, _wordDelimiters[t.closeSquare] = true, _wordDelimiters[t.singleQuote] = true, _wordDelimiters[t.doubleQuote] = true, _wordDelimiters[t.plus] = true, _wordDelimiters[t.pipe] = true, _wordDelimiters[t.tilde] = true, _wordDelimiters[t.greaterThan] = true, _wordDelimiters[t.equals] = true, _wordDelimiters[t.dollar] = true, _wordDelimiters[t.caret] = true, _wordDelimiters[t.slash] = true, _wordDelimiters);
var hex = {};
var hexChars = "0123456789abcdefABCDEF";

for (var i = 0; i < hexChars.length; i++) {
  hex[hexChars.charCodeAt(i)] = true;
}
/**
 *  Returns the last index of the bar css word
 * @param {string} css The string in which the word begins
 * @param {number} start The index into the string where word's first letter occurs
 */


function consumeWord(css, start) {
  var next = start;
  var code;

  do {
    code = css.charCodeAt(next);

    if (wordDelimiters[code]) {
      return next - 1;
    } else if (code === t.backslash) {
      next = consumeEscape(css, next) + 1;
    } else {
      // All other characters are part of the word
      next++;
    }
  } while (next < css.length);

  return next - 1;
}
/**
 *  Returns the last index of the escape sequence
 * @param {string} css The string in which the sequence begins
 * @param {number} start The index into the string where escape character (`\`) occurs.
 */


function consumeEscape(css, start) {
  var next = start;
  var code = css.charCodeAt(next + 1);

  if (unescapable[code]) {// just consume the escape char
  } else if (hex[code]) {
    var hexDigits = 0; // consume up to 6 hex chars

    do {
      next++;
      hexDigits++;
      code = css.charCodeAt(next + 1);
    } while (hex[code] && hexDigits < 6); // if fewer than 6 hex chars, a trailing space ends the escape


    if (hexDigits < 6 && code === t.space) {
      next++;
    }
  } else {
    // the next char is part of the current word
    next++;
  }

  return next;
}

var FIELDS = {
  TYPE: 0,
  START_LINE: 1,
  START_COL: 2,
  END_LINE: 3,
  END_COL: 4,
  START_POS: 5,
  END_POS: 6
};
exports.FIELDS = FIELDS;

function tokenize(input) {
  var tokens = [];
  var css = input.css.valueOf();
  var _css = css,
      length = _css.length;
  var offset = -1;
  var line = 1;
  var start = 0;
  var end = 0;
  var code, content, endColumn, endLine, escaped, escapePos, last, lines, next, nextLine, nextOffset, quote, tokenType;

  function unclosed(what, fix) {
    if (input.safe) {
      // fyi: this is never set to true.
      css += fix;
      next = css.length - 1;
    } else {
      throw input.error('Unclosed ' + what, line, start - offset, start);
    }
  }

  while (start < length) {
    code = css.charCodeAt(start);

    if (code === t.newline) {
      offset = start;
      line += 1;
    }

    switch (code) {
      case t.space:
      case t.tab:
      case t.newline:
      case t.cr:
      case t.feed:
        next = start;

        do {
          next += 1;
          code = css.charCodeAt(next);

          if (code === t.newline) {
            offset = next;
            line += 1;
          }
        } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);

        tokenType = t.space;
        endLine = line;
        endColumn = next - offset - 1;
        end = next;
        break;

      case t.plus:
      case t.greaterThan:
      case t.tilde:
      case t.pipe:
        next = start;

        do {
          next += 1;
          code = css.charCodeAt(next);
        } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);

        tokenType = t.combinator;
        endLine = line;
        endColumn = start - offset;
        end = next;
        break;
      // Consume these characters as single tokens.

      case t.asterisk:
      case t.ampersand:
      case t.bang:
      case t.comma:
      case t.equals:
      case t.dollar:
      case t.caret:
      case t.openSquare:
      case t.closeSquare:
      case t.colon:
      case t.semicolon:
      case t.openParenthesis:
      case t.closeParenthesis:
        next = start;
        tokenType = code;
        endLine = line;
        endColumn = start - offset;
        end = next + 1;
        break;

      case t.singleQuote:
      case t.doubleQuote:
        quote = code === t.singleQuote ? "'" : '"';
        next = start;

        do {
          escaped = false;
          next = css.indexOf(quote, next + 1);

          if (next === -1) {
            unclosed('quote', quote);
          }

          escapePos = next;

          while (css.charCodeAt(escapePos - 1) === t.backslash) {
            escapePos -= 1;
            escaped = !escaped;
          }
        } while (escaped);

        tokenType = t.str;
        endLine = line;
        endColumn = start - offset;
        end = next + 1;
        break;

      default:
        if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
          next = css.indexOf('*/', start + 2) + 1;

          if (next === 0) {
            unclosed('comment', '*/');
          }

          content = css.slice(start, next + 1);
          lines = content.split('\n');
          last = lines.length - 1;

          if (last > 0) {
            nextLine = line + last;
            nextOffset = next - lines[last].length;
          } else {
            nextLine = line;
            nextOffset = offset;
          }

          tokenType = t.comment;
          line = nextLine;
          endLine = nextLine;
          endColumn = next - nextOffset;
        } else if (code === t.slash) {
          next = start;
          tokenType = code;
          endLine = line;
          endColumn = start - offset;
          end = next + 1;
        } else {
          next = consumeWord(css, start);
          tokenType = t.word;
          endLine = line;
          endColumn = next - offset;
        }

        end = next + 1;
        break;
    } // Ensure that the token structure remains consistent


    tokens.push([tokenType, // [0] Token type
    line, // [1] Starting line
    start - offset, // [2] Starting column
    endLine, // [3] Ending line
    endColumn, // [4] Ending column
    start, // [5] Start position / Source index
    end]); // Reset offset for the next token

    if (nextOffset) {
      offset = nextOffset;
      nextOffset = null;
    }

    start = end;
  }

  return tokens;
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.combinator = exports.word = exports.comment = exports.str = exports.tab = exports.newline = exports.feed = exports.cr = exports.backslash = exports.bang = exports.slash = exports.doubleQuote = exports.singleQuote = exports.space = exports.greaterThan = exports.pipe = exports.equals = exports.plus = exports.caret = exports.tilde = exports.dollar = exports.closeSquare = exports.openSquare = exports.closeParenthesis = exports.openParenthesis = exports.semicolon = exports.colon = exports.comma = exports.at = exports.asterisk = exports.ampersand = void 0;
var ampersand = 38; // `&`.charCodeAt(0);

exports.ampersand = ampersand;
var asterisk = 42; // `*`.charCodeAt(0);

exports.asterisk = asterisk;
var at = 64; // `@`.charCodeAt(0);

exports.at = at;
var comma = 44; // `,`.charCodeAt(0);

exports.comma = comma;
var colon = 58; // `:`.charCodeAt(0);

exports.colon = colon;
var semicolon = 59; // `;`.charCodeAt(0);

exports.semicolon = semicolon;
var openParenthesis = 40; // `(`.charCodeAt(0);

exports.openParenthesis = openParenthesis;
var closeParenthesis = 41; // `)`.charCodeAt(0);

exports.closeParenthesis = closeParenthesis;
var openSquare = 91; // `[`.charCodeAt(0);

exports.openSquare = openSquare;
var closeSquare = 93; // `]`.charCodeAt(0);

exports.closeSquare = closeSquare;
var dollar = 36; // `$`.charCodeAt(0);

exports.dollar = dollar;
var tilde = 126; // `~`.charCodeAt(0);

exports.tilde = tilde;
var caret = 94; // `^`.charCodeAt(0);

exports.caret = caret;
var plus = 43; // `+`.charCodeAt(0);

exports.plus = plus;
var equals = 61; // `=`.charCodeAt(0);

exports.equals = equals;
var pipe = 124; // `|`.charCodeAt(0);

exports.pipe = pipe;
var greaterThan = 62; // `>`.charCodeAt(0);

exports.greaterThan = greaterThan;
var space = 32; // ` `.charCodeAt(0);

exports.space = space;
var singleQuote = 39; // `'`.charCodeAt(0);

exports.singleQuote = singleQuote;
var doubleQuote = 34; // `"`.charCodeAt(0);

exports.doubleQuote = doubleQuote;
var slash = 47; // `/`.charCodeAt(0);

exports.slash = slash;
var bang = 33; // `!`.charCodeAt(0);

exports.bang = bang;
var backslash = 92; // '\\'.charCodeAt(0);

exports.backslash = backslash;
var cr = 13; // '\r'.charCodeAt(0);

exports.cr = cr;
var feed = 12; // '\f'.charCodeAt(0);

exports.feed = feed;
var newline = 10; // '\n'.charCodeAt(0);

exports.newline = newline;
var tab = 9; // '\t'.charCodeAt(0);
// Expose aliases primarily for readability.

exports.tab = tab;
var str = singleQuote; // No good single character representation!

exports.str = str;
var comment = -1;
exports.comment = comment;
var word = -2;
exports.word = word;
var combinator = -3;
exports.combinator = combinator;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _types = __webpack_require__(67);

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _types[key];
});

var _constructors = __webpack_require__(86);

Object.keys(_constructors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _constructors[key];
});

var _guards = __webpack_require__(87);

Object.keys(_guards).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  exports[key] = _guards[key];
});

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = void 0;

var _attribute = _interopRequireDefault(__webpack_require__(77));

var _className = _interopRequireDefault(__webpack_require__(69));

var _combinator = _interopRequireDefault(__webpack_require__(80));

var _comment = _interopRequireDefault(__webpack_require__(71));

var _id = _interopRequireDefault(__webpack_require__(72));

var _nesting = _interopRequireDefault(__webpack_require__(81));

var _pseudo = _interopRequireDefault(__webpack_require__(76));

var _root = _interopRequireDefault(__webpack_require__(59));

var _selector = _interopRequireDefault(__webpack_require__(68));

var _string = _interopRequireDefault(__webpack_require__(75));

var _tag = _interopRequireDefault(__webpack_require__(73));

var _universal = _interopRequireDefault(__webpack_require__(79));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attribute = function attribute(opts) {
  return new _attribute.default(opts);
};

exports.attribute = attribute;

var className = function className(opts) {
  return new _className.default(opts);
};

exports.className = className;

var combinator = function combinator(opts) {
  return new _combinator.default(opts);
};

exports.combinator = combinator;

var comment = function comment(opts) {
  return new _comment.default(opts);
};

exports.comment = comment;

var id = function id(opts) {
  return new _id.default(opts);
};

exports.id = id;

var nesting = function nesting(opts) {
  return new _nesting.default(opts);
};

exports.nesting = nesting;

var pseudo = function pseudo(opts) {
  return new _pseudo.default(opts);
};

exports.pseudo = pseudo;

var root = function root(opts) {
  return new _root.default(opts);
};

exports.root = root;

var selector = function selector(opts) {
  return new _selector.default(opts);
};

exports.selector = selector;

var string = function string(opts) {
  return new _string.default(opts);
};

exports.string = string;

var tag = function tag(opts) {
  return new _tag.default(opts);
};

exports.tag = tag;

var universal = function universal(opts) {
  return new _universal.default(opts);
};

exports.universal = universal;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.isNode = isNode;
exports.isPseudoElement = isPseudoElement;
exports.isPseudoClass = isPseudoClass;
exports.isContainer = isContainer;
exports.isNamespace = isNamespace;
exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = exports.isPseudo = exports.isNesting = exports.isIdentifier = exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = void 0;

var _types = __webpack_require__(67);

var _IS_TYPE;

var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);

function isNode(node) {
  return typeof node === "object" && IS_TYPE[node.type];
}

function isNodeType(type, node) {
  return isNode(node) && node.type === type;
}

var isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
exports.isAttribute = isAttribute;
var isClassName = isNodeType.bind(null, _types.CLASS);
exports.isClassName = isClassName;
var isCombinator = isNodeType.bind(null, _types.COMBINATOR);
exports.isCombinator = isCombinator;
var isComment = isNodeType.bind(null, _types.COMMENT);
exports.isComment = isComment;
var isIdentifier = isNodeType.bind(null, _types.ID);
exports.isIdentifier = isIdentifier;
var isNesting = isNodeType.bind(null, _types.NESTING);
exports.isNesting = isNesting;
var isPseudo = isNodeType.bind(null, _types.PSEUDO);
exports.isPseudo = isPseudo;
var isRoot = isNodeType.bind(null, _types.ROOT);
exports.isRoot = isRoot;
var isSelector = isNodeType.bind(null, _types.SELECTOR);
exports.isSelector = isSelector;
var isString = isNodeType.bind(null, _types.STRING);
exports.isString = isString;
var isTag = isNodeType.bind(null, _types.TAG);
exports.isTag = isTag;
var isUniversal = isNodeType.bind(null, _types.UNIVERSAL);
exports.isUniversal = isUniversal;

function isPseudoElement(node) {
  return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value === ":before" || node.value === ":after");
}

function isPseudoClass(node) {
  return isPseudo(node) && !isPseudoElement(node);
}

function isContainer(node) {
  return !!(isNode(node) && node.walk);
}

function isNamespace(node) {
  return isAttribute(node) || isTag(node);
}

/***/ })
/******/ ]);
