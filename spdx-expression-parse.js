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


var scan = __webpack_require__(3)
var parse = __webpack_require__(7)

module.exports = function (source) {
  return parse(scan(source))
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var licenses = []
  .concat(__webpack_require__(4))
  .concat(__webpack_require__(5))
var exceptions = __webpack_require__(6)

module.exports = function (source) {
  var index = 0

  function hasMore () {
    return index < source.length
  }

  // `value` can be a regexp or a string.
  // If it is recognized, the matching source string is returned and
  // the index is incremented. Otherwise `undefined` is returned.
  function read (value) {
    if (value instanceof RegExp) {
      var chars = source.slice(index)
      var match = chars.match(value)
      if (match) {
        index += match[0].length
        return match[0]
      }
    } else {
      if (source.indexOf(value, index) === index) {
        index += value.length
        return value
      }
    }
  }

  function skipWhitespace () {
    read(/[ ]*/)
  }

  function operator () {
    var string
    var possibilities = ['WITH', 'AND', 'OR', '(', ')', ':', '+']
    for (var i = 0; i < possibilities.length; i++) {
      string = read(possibilities[i])
      if (string) {
        break
      }
    }

    if (string === '+' && index > 1 && source[index - 2] === ' ') {
      throw new Error('Space before `+`')
    }

    return string && {
      type: 'OPERATOR',
      string: string
    }
  }

  function idstring () {
    return read(/[A-Za-z0-9-.]+/)
  }

  function expectIdstring () {
    var string = idstring()
    if (!string) {
      throw new Error('Expected idstring at offset ' + index)
    }
    return string
  }

  function documentRef () {
    if (read('DocumentRef-')) {
      var string = expectIdstring()
      return {type: 'DOCUMENTREF', string: string}
    }
  }

  function licenseRef () {
    if (read('LicenseRef-')) {
      var string = expectIdstring()
      return {type: 'LICENSEREF', string: string}
    }
  }

  function identifier () {
    var begin = index
    var string = idstring()

    if (licenses.indexOf(string) !== -1) {
      return {
        type: 'LICENSE',
        string: string
      }
    } else if (exceptions.indexOf(string) !== -1) {
      return {
        type: 'EXCEPTION',
        string: string
      }
    }

    index = begin
  }

  // Tries to read the next token. Returns `undefined` if no token is
  // recognized.
  function parseToken () {
    // Ordering matters
    return (
      operator() ||
      documentRef() ||
      licenseRef() ||
      identifier()
    )
  }

  var tokens = []
  while (hasMore()) {
    skipWhitespace()
    if (!hasMore()) {
      break
    }

    var token = parseToken()
    if (!token) {
      throw new Error('Unexpected `' + source[index] +
                      '` at offset ' + index)
    }

    tokens.push(token)
  }
  return tokens
}


/***/ }),
/* 4 */
/***/ (function(module) {

module.exports = JSON.parse("[\"0BSD\",\"AAL\",\"ADSL\",\"AFL-1.1\",\"AFL-1.2\",\"AFL-2.0\",\"AFL-2.1\",\"AFL-3.0\",\"AGPL-1.0-only\",\"AGPL-1.0-or-later\",\"AGPL-3.0-only\",\"AGPL-3.0-or-later\",\"AMDPLPA\",\"AML\",\"AMPAS\",\"ANTLR-PD\",\"APAFML\",\"APL-1.0\",\"APSL-1.0\",\"APSL-1.1\",\"APSL-1.2\",\"APSL-2.0\",\"Abstyles\",\"Adobe-2006\",\"Adobe-Glyph\",\"Afmparse\",\"Aladdin\",\"Apache-1.0\",\"Apache-1.1\",\"Apache-2.0\",\"Artistic-1.0\",\"Artistic-1.0-Perl\",\"Artistic-1.0-cl8\",\"Artistic-2.0\",\"BSD-1-Clause\",\"BSD-2-Clause\",\"BSD-2-Clause-FreeBSD\",\"BSD-2-Clause-NetBSD\",\"BSD-2-Clause-Patent\",\"BSD-3-Clause\",\"BSD-3-Clause-Attribution\",\"BSD-3-Clause-Clear\",\"BSD-3-Clause-LBNL\",\"BSD-3-Clause-No-Nuclear-License\",\"BSD-3-Clause-No-Nuclear-License-2014\",\"BSD-3-Clause-No-Nuclear-Warranty\",\"BSD-3-Clause-Open-MPI\",\"BSD-4-Clause\",\"BSD-4-Clause-UC\",\"BSD-Protection\",\"BSD-Source-Code\",\"BSL-1.0\",\"Bahyph\",\"Barr\",\"Beerware\",\"BitTorrent-1.0\",\"BitTorrent-1.1\",\"BlueOak-1.0.0\",\"Borceux\",\"CATOSL-1.1\",\"CC-BY-1.0\",\"CC-BY-2.0\",\"CC-BY-2.5\",\"CC-BY-3.0\",\"CC-BY-4.0\",\"CC-BY-NC-1.0\",\"CC-BY-NC-2.0\",\"CC-BY-NC-2.5\",\"CC-BY-NC-3.0\",\"CC-BY-NC-4.0\",\"CC-BY-NC-ND-1.0\",\"CC-BY-NC-ND-2.0\",\"CC-BY-NC-ND-2.5\",\"CC-BY-NC-ND-3.0\",\"CC-BY-NC-ND-4.0\",\"CC-BY-NC-SA-1.0\",\"CC-BY-NC-SA-2.0\",\"CC-BY-NC-SA-2.5\",\"CC-BY-NC-SA-3.0\",\"CC-BY-NC-SA-4.0\",\"CC-BY-ND-1.0\",\"CC-BY-ND-2.0\",\"CC-BY-ND-2.5\",\"CC-BY-ND-3.0\",\"CC-BY-ND-4.0\",\"CC-BY-SA-1.0\",\"CC-BY-SA-2.0\",\"CC-BY-SA-2.5\",\"CC-BY-SA-3.0\",\"CC-BY-SA-4.0\",\"CC-PDDC\",\"CC0-1.0\",\"CDDL-1.0\",\"CDDL-1.1\",\"CDLA-Permissive-1.0\",\"CDLA-Sharing-1.0\",\"CECILL-1.0\",\"CECILL-1.1\",\"CECILL-2.0\",\"CECILL-2.1\",\"CECILL-B\",\"CECILL-C\",\"CERN-OHL-1.1\",\"CERN-OHL-1.2\",\"CNRI-Jython\",\"CNRI-Python\",\"CNRI-Python-GPL-Compatible\",\"CPAL-1.0\",\"CPL-1.0\",\"CPOL-1.02\",\"CUA-OPL-1.0\",\"Caldera\",\"ClArtistic\",\"Condor-1.1\",\"Crossword\",\"CrystalStacker\",\"Cube\",\"D-FSL-1.0\",\"DOC\",\"DSDP\",\"Dotseqn\",\"ECL-1.0\",\"ECL-2.0\",\"EFL-1.0\",\"EFL-2.0\",\"EPL-1.0\",\"EPL-2.0\",\"EUDatagrid\",\"EUPL-1.0\",\"EUPL-1.1\",\"EUPL-1.2\",\"Entessa\",\"ErlPL-1.1\",\"Eurosym\",\"FSFAP\",\"FSFUL\",\"FSFULLR\",\"FTL\",\"Fair\",\"Frameworx-1.0\",\"FreeImage\",\"GFDL-1.1-only\",\"GFDL-1.1-or-later\",\"GFDL-1.2-only\",\"GFDL-1.2-or-later\",\"GFDL-1.3-only\",\"GFDL-1.3-or-later\",\"GL2PS\",\"GPL-1.0-only\",\"GPL-1.0-or-later\",\"GPL-2.0-only\",\"GPL-2.0-or-later\",\"GPL-3.0-only\",\"GPL-3.0-or-later\",\"Giftware\",\"Glide\",\"Glulxe\",\"HPND\",\"HPND-sell-variant\",\"HaskellReport\",\"IBM-pibs\",\"ICU\",\"IJG\",\"IPA\",\"IPL-1.0\",\"ISC\",\"ImageMagick\",\"Imlib2\",\"Info-ZIP\",\"Intel\",\"Intel-ACPI\",\"Interbase-1.0\",\"JPNIC\",\"JSON\",\"JasPer-2.0\",\"LAL-1.2\",\"LAL-1.3\",\"LGPL-2.0-only\",\"LGPL-2.0-or-later\",\"LGPL-2.1-only\",\"LGPL-2.1-or-later\",\"LGPL-3.0-only\",\"LGPL-3.0-or-later\",\"LGPLLR\",\"LPL-1.0\",\"LPL-1.02\",\"LPPL-1.0\",\"LPPL-1.1\",\"LPPL-1.2\",\"LPPL-1.3a\",\"LPPL-1.3c\",\"Latex2e\",\"Leptonica\",\"LiLiQ-P-1.1\",\"LiLiQ-R-1.1\",\"LiLiQ-Rplus-1.1\",\"Libpng\",\"Linux-OpenIB\",\"MIT\",\"MIT-0\",\"MIT-CMU\",\"MIT-advertising\",\"MIT-enna\",\"MIT-feh\",\"MITNFA\",\"MPL-1.0\",\"MPL-1.1\",\"MPL-2.0\",\"MPL-2.0-no-copyleft-exception\",\"MS-PL\",\"MS-RL\",\"MTLL\",\"MakeIndex\",\"MirOS\",\"Motosoto\",\"Multics\",\"Mup\",\"NASA-1.3\",\"NBPL-1.0\",\"NCSA\",\"NGPL\",\"NLOD-1.0\",\"NLPL\",\"NOSL\",\"NPL-1.0\",\"NPL-1.1\",\"NPOSL-3.0\",\"NRL\",\"NTP\",\"Naumen\",\"Net-SNMP\",\"NetCDF\",\"Newsletr\",\"Nokia\",\"Noweb\",\"OCCT-PL\",\"OCLC-2.0\",\"ODC-By-1.0\",\"ODbL-1.0\",\"OFL-1.0\",\"OFL-1.1\",\"OGL-UK-1.0\",\"OGL-UK-2.0\",\"OGL-UK-3.0\",\"OGTSL\",\"OLDAP-1.1\",\"OLDAP-1.2\",\"OLDAP-1.3\",\"OLDAP-1.4\",\"OLDAP-2.0\",\"OLDAP-2.0.1\",\"OLDAP-2.1\",\"OLDAP-2.2\",\"OLDAP-2.2.1\",\"OLDAP-2.2.2\",\"OLDAP-2.3\",\"OLDAP-2.4\",\"OLDAP-2.5\",\"OLDAP-2.6\",\"OLDAP-2.7\",\"OLDAP-2.8\",\"OML\",\"OPL-1.0\",\"OSET-PL-2.1\",\"OSL-1.0\",\"OSL-1.1\",\"OSL-2.0\",\"OSL-2.1\",\"OSL-3.0\",\"OpenSSL\",\"PDDL-1.0\",\"PHP-3.0\",\"PHP-3.01\",\"Parity-6.0.0\",\"Plexus\",\"PostgreSQL\",\"Python-2.0\",\"QPL-1.0\",\"Qhull\",\"RHeCos-1.1\",\"RPL-1.1\",\"RPL-1.5\",\"RPSL-1.0\",\"RSA-MD\",\"RSCPL\",\"Rdisc\",\"Ruby\",\"SAX-PD\",\"SCEA\",\"SGI-B-1.0\",\"SGI-B-1.1\",\"SGI-B-2.0\",\"SHL-0.5\",\"SHL-0.51\",\"SISSL\",\"SISSL-1.2\",\"SMLNJ\",\"SMPPL\",\"SNIA\",\"SPL-1.0\",\"SSPL-1.0\",\"SWL\",\"Saxpath\",\"Sendmail\",\"Sendmail-8.23\",\"SimPL-2.0\",\"Sleepycat\",\"Spencer-86\",\"Spencer-94\",\"Spencer-99\",\"SugarCRM-1.1.3\",\"TAPR-OHL-1.0\",\"TCL\",\"TCP-wrappers\",\"TMate\",\"TORQUE-1.1\",\"TOSL\",\"TU-Berlin-1.0\",\"TU-Berlin-2.0\",\"UPL-1.0\",\"Unicode-DFS-2015\",\"Unicode-DFS-2016\",\"Unicode-TOU\",\"Unlicense\",\"VOSTROM\",\"VSL-1.0\",\"Vim\",\"W3C\",\"W3C-19980720\",\"W3C-20150513\",\"WTFPL\",\"Watcom-1.0\",\"Wsuipa\",\"X11\",\"XFree86-1.1\",\"XSkat\",\"Xerox\",\"Xnet\",\"YPL-1.0\",\"YPL-1.1\",\"ZPL-1.1\",\"ZPL-2.0\",\"ZPL-2.1\",\"Zed\",\"Zend-2.0\",\"Zimbra-1.3\",\"Zimbra-1.4\",\"Zlib\",\"blessing\",\"bzip2-1.0.5\",\"bzip2-1.0.6\",\"copyleft-next-0.3.0\",\"copyleft-next-0.3.1\",\"curl\",\"diffmark\",\"dvipdfm\",\"eGenix\",\"gSOAP-1.3b\",\"gnuplot\",\"iMatix\",\"libpng-2.0\",\"libtiff\",\"mpich2\",\"psfrag\",\"psutils\",\"xinetd\",\"xpp\",\"zlib-acknowledgement\"]");

/***/ }),
/* 5 */
/***/ (function(module) {

module.exports = JSON.parse("[\"AGPL-1.0\",\"AGPL-3.0\",\"GFDL-1.1\",\"GFDL-1.2\",\"GFDL-1.3\",\"GPL-1.0\",\"GPL-2.0\",\"GPL-2.0-with-GCC-exception\",\"GPL-2.0-with-autoconf-exception\",\"GPL-2.0-with-bison-exception\",\"GPL-2.0-with-classpath-exception\",\"GPL-2.0-with-font-exception\",\"GPL-3.0\",\"GPL-3.0-with-GCC-exception\",\"GPL-3.0-with-autoconf-exception\",\"LGPL-2.0\",\"LGPL-2.1\",\"LGPL-3.0\",\"Nunit\",\"StandardML-NJ\",\"eCos-2.0\",\"wxWindows\"]");

/***/ }),
/* 6 */
/***/ (function(module) {

module.exports = JSON.parse("[\"389-exception\",\"Autoconf-exception-2.0\",\"Autoconf-exception-3.0\",\"Bison-exception-2.2\",\"Bootloader-exception\",\"Classpath-exception-2.0\",\"CLISP-exception-2.0\",\"DigiRule-FOSS-exception\",\"eCos-exception-2.0\",\"Fawkes-Runtime-exception\",\"FLTK-exception\",\"Font-exception-2.0\",\"freertos-exception-2.0\",\"GCC-exception-2.0\",\"GCC-exception-3.1\",\"gnu-javamail-exception\",\"i2p-gpl-java-exception\",\"Libtool-exception\",\"Linux-syscall-note\",\"LLVM-exception\",\"LZMA-exception\",\"mif-exception\",\"Nokia-Qt-exception-1.1\",\"OCCT-exception-1.0\",\"OpenJDK-assembly-exception-1.0\",\"openvpn-openssl-exception\",\"PS-or-PDF-font-exception-20170817\",\"Qt-GPL-exception-1.0\",\"Qt-LGPL-exception-1.1\",\"Qwt-exception-1.0\",\"u-boot-exception-2.0\",\"WxWindows-exception-3.1\"]");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// The ABNF grammar in the spec is totally ambiguous.
//
// This parser follows the operator precedence defined in the
// `Order of Precedence and Parentheses` section.

module.exports = function (tokens) {
  var index = 0

  function hasMore () {
    return index < tokens.length
  }

  function token () {
    return hasMore() ? tokens[index] : null
  }

  function next () {
    if (!hasMore()) {
      throw new Error()
    }
    index++
  }

  function parseOperator (operator) {
    var t = token()
    if (t && t.type === 'OPERATOR' && operator === t.string) {
      next()
      return t.string
    }
  }

  function parseWith () {
    if (parseOperator('WITH')) {
      var t = token()
      if (t && t.type === 'EXCEPTION') {
        next()
        return t.string
      }
      throw new Error('Expected exception after `WITH`')
    }
  }

  function parseLicenseRef () {
    // TODO: Actually, everything is concatenated into one string
    // for backward-compatibility but it could be better to return
    // a nice structure.
    var begin = index
    var string = ''
    var t = token()
    if (t.type === 'DOCUMENTREF') {
      next()
      string += 'DocumentRef-' + t.string + ':'
      if (!parseOperator(':')) {
        throw new Error('Expected `:` after `DocumentRef-...`')
      }
    }
    t = token()
    if (t.type === 'LICENSEREF') {
      next()
      string += 'LicenseRef-' + t.string
      return {license: string}
    }
    index = begin
  }

  function parseLicense () {
    var t = token()
    if (t && t.type === 'LICENSE') {
      next()
      var node = {license: t.string}
      if (parseOperator('+')) {
        node.plus = true
      }
      var exception = parseWith()
      if (exception) {
        node.exception = exception
      }
      return node
    }
  }

  function parseParenthesizedExpression () {
    var left = parseOperator('(')
    if (!left) {
      return
    }

    var expr = parseExpression()

    if (!parseOperator(')')) {
      throw new Error('Expected `)`')
    }

    return expr
  }

  function parseAtom () {
    return (
      parseParenthesizedExpression() ||
      parseLicenseRef() ||
      parseLicense()
    )
  }

  function makeBinaryOpParser (operator, nextParser) {
    return function parseBinaryOp () {
      var left = nextParser()
      if (!left) {
        return
      }

      if (!parseOperator(operator)) {
        return left
      }

      var right = parseBinaryOp()
      if (!right) {
        throw new Error('Expected expression')
      }
      return {
        left: left,
        conjunction: operator.toLowerCase(),
        right: right
      }
    }
  }

  var parseAnd = makeBinaryOpParser('AND', parseAtom)
  var parseExpression = makeBinaryOpParser('OR', parseAnd)

  var node = parseExpression()
  if (!node || hasMore()) {
    throw new Error('Syntax error')
  }
  return node
}


/***/ })
/******/ ]);
