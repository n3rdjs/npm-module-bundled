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

!function(e,t){ true?t(exports,__webpack_require__(3)):undefined}(this,function(e,t){"use strict";function n(e){return e.split("")}function i(e,t){return t.includes(e)}t=t&&t.hasOwnProperty("default")?t.default:t;class r extends Error{constructor(e,t){super(),this.name="DefaultsError",this.message=e,this.defs=t}}function o(e,t,n){!0===e&&(e={});var i=e||{};if(n)for(var o in i)if(D(i,o)&&!D(t,o))throw new r("`"+o+"` is not a supported option",t);for(var o in t)D(t,o)&&(i[o]=e&&D(e,o)?e[o]:t[o]);return i}function a(){}function s(){return!1}function u(){return!0}function c(){return this}function l(){return null}var f=function(){function e(e,o,a){var s,u=[],c=[];function l(){var l=o(e[s],s),f=l instanceof r;return f&&(l=l.v),l instanceof n?(l=l.v)instanceof i?c.push.apply(c,a?l.v.slice().reverse():l.v):c.push(l):l!==t&&(l instanceof i?u.push.apply(u,a?l.v.slice().reverse():l.v):u.push(l)),f}if(Array.isArray(e))if(a){for(s=e.length;--s>=0&&!l(););u.reverse(),c.reverse()}else for(s=0;s<e.length&&!l();++s);else for(s in e)if(D(e,s)&&l())break;return c.concat(u)}e.at_top=function(e){return new n(e)},e.splice=function(e){return new i(e)},e.last=function(e){return new r(e)};var t=e.skip={};function n(e){this.v=e}function i(e){this.v=e}function r(e){this.v=e}return e}();function p(e,t){e.includes(t)||e.push(t)}function _(e,t){return e.replace(/{(.+?)}/g,function(e,n){return t&&t[n]})}function d(e,t){for(var n=e.length;--n>=0;)e[n]===t&&e.splice(n,1)}function m(e,t){if(e.length<2)return e.slice();return function e(n){if(n.length<=1)return n;var i=Math.floor(n.length/2),r=n.slice(0,i),o=n.slice(i);return function(e,n){for(var i=[],r=0,o=0,a=0;r<e.length&&o<n.length;)t(e[r],n[o])<=0?i[a++]=e[r++]:i[a++]=n[o++];return r<e.length&&i.push.apply(i,e.slice(r)),o<n.length&&i.push.apply(i,n.slice(o)),i}(r=e(r),o=e(o))}(e)}function E(e){return Array.isArray(e)||(e=e.split(" ")),new Set(e)}function h(e,t,n){e.has(t)?e.get(t).push(n):e.set(t,[n])}function D(e,t){return Object.prototype.hasOwnProperty.call(e,t)}function g(e,t){return!0===e||e instanceof RegExp&&e.test(t)}var S={"\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"};var A="break case catch class const continue debugger default delete do else export extends finally for function if in instanceof let new return switch throw try typeof var void while with",v="false null true",T="enum implements import interface package private protected public static super this "+v+" "+A,b="return new delete throw else case yield await";A=E(A),T=E(T),b=E(b),v=E(v);var y=E(n("+-*&%=<>!?|~^")),C=/[0-9a-f]/i,O=/^0x[0-9a-f]+$/i,F=/^0[0-7]+$/,M=/^0o[0-7]+$/i,R=/^0b[01]+$/i,w=/^\d*\.?\d*(?:e[+-]?\d*(?:\d\.?|\.?\d)\d*)?$/i,N=/^(0[xob])?[0-9]+n$/i,x=E(["in","instanceof","typeof","new","void","delete","++","--","+","-","!","~","&","|","^","*","**","/","%",">>","<<",">>>","<",">","<=",">=","==","===","!=","!==","?","=","+=","-=","/=","*=","**=","%=",">>=","<<=",">>>=","|=","^=","&=","&&","||"]),k=E(n("  \n\r\t\f\v​           \u2028\u2029  　\ufeff")),I=E(n("\n\r\u2028\u2029")),L=E(n(";]),:")),V=E(n("[{(,;:")),P=E(n("[]{}(),;:")),B={ID_Start:/[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,ID_Continue:/[0-9A-Z_a-z\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/};function K(e,t){var n=e.charAt(t);if(U(n)){var i=e.charAt(t+1);if(G(i))return n+i}if(G(n)){var r=e.charAt(t-1);if(U(r))return r+n}return n}function U(e){return"string"==typeof e&&(e=e.charCodeAt(0)),e>=55296&&e<=56319}function G(e){return"string"==typeof e&&(e=e.charCodeAt(0)),e>=56320&&e<=57343}function H(e){return e>=48&&e<=57}function X(e){var t=e.charCodeAt(0);return B.ID_Start.test(e)||36==t||95==t}function z(e){var t=e.charCodeAt(0);return B.ID_Continue.test(e)||36==t||95==t||8204==t||8205==t}function W(e){return/^[a-z_$][a-z0-9_$]*$/i.test(e)}class Y extends Error{constructor(e,t,n,i,r){super(),this.name="SyntaxError",this.message=e,this.filename=t,this.line=n,this.col=i,this.pos=r}}function q(e,t,n,i,r){throw new Y(e,t,n,i,r)}function $(e,t,n){return e.type==t&&(null==n||e.value==n)}var j={};function Z(e,t,n,i){var r={text:e,filename:t,pos:0,tokpos:0,line:1,tokline:0,col:0,tokcol:0,newline_before:!1,regex_allowed:!1,brace_counter:0,template_braces:[],comments_before:[],directives:{},directive_stack:[]};function o(){return K(r.text,r.pos)}function a(e,t){var n=K(r.text,r.pos++);if(e&&!n)throw j;return I.has(n)?(r.newline_before=r.newline_before||!t,++r.line,r.col=0,t||"\r"!=n||"\n"!=o()||(++r.pos,n="\n")):(n.length>1&&(++r.pos,++r.col),++r.col),n}function s(e){for(;e-- >0;)a()}function u(e){return r.text.substr(r.pos,e.length)==e}function c(e,t){var n=r.text.indexOf(e,r.pos);if(t&&-1==n)throw j;return n}function l(){r.tokline=r.line,r.tokcol=r.col,r.tokpos=r.pos}var f=!1,p=null;function _(n,i,o){r.regex_allowed="operator"==n&&!Q.has(i)||"keyword"==n&&b.has(i)||"punc"==n&&V.has(i)||"arrow"==n,"punc"==n&&"."==i?f=!0:o||(f=!1);var a={type:n,value:i,line:r.tokline,col:r.tokcol,pos:r.tokpos,endline:r.line,endcol:r.col,endpos:r.pos,nlb:r.newline_before,file:t};return/^(?:num|string|regexp)$/i.test(n)&&(a.raw=e.substring(a.pos,a.endpos)),o||(a.comments_before=r.comments_before,a.comments_after=r.comments_before=[]),r.newline_before=!1,a=new oe(a),o||(p=a),a}function d(){for(;k.has(o());)a()}function m(e){q(e,t,r.tokline,r.tokcol,r.tokpos)}function E(e){var t=!1,n=!1,i=!1,r="."==e,s=!1,u=function(e){for(var t,n="",i=0;(t=o())&&e(t,i++);)n+=a();return n}(function(o,a){if(s)return!1;switch(o.charCodeAt(0)){case 98:case 66:return i=!0;case 111:case 79:case 120:case 88:return!i&&(i=!0);case 101:case 69:return!!i||!t&&(t=n=!0);case 45:return n||0==a&&!e;case 43:return n;case n=!1,46:return!(r||i||t)&&(r=!0)}return"n"===o?(s=!0,!0):C.test(o)});if(e&&(u=e+u),F.test(u)&&ee.has_directive("use strict")&&m("Legacy octal literals are not allowed in strict mode"),u.endsWith("n")){if(!r&&N.test(u))return _("big_int",u.replace("n",""));m("Invalid or unexpected token")}var c=function(e){if(O.test(e))return parseInt(e.substr(2),16);if(F.test(e))return parseInt(e.substr(1),8);if(M.test(e))return parseInt(e.substr(2),8);if(R.test(e))return parseInt(e.substr(2),2);if(w.test(e))return parseFloat(e);var t=parseFloat(e);return t==e?t:void 0}(u);if(!isNaN(c))return _("num",c);m("Invalid syntax: "+u)}function h(e,t,n){var i,s=a(!0,e);switch(s.charCodeAt(0)){case 110:return"\n";case 114:return"\r";case 116:return"\t";case 98:return"\b";case 118:return"\v";case 102:return"\f";case 120:return String.fromCharCode(D(2,t));case 117:if("{"==o()){for(a(!0),"}"===o()&&m("Expecting hex-character between {}");"0"==o();)a(!0);var u,l=c("}",!0)-r.pos;return(l>6||(u=D(l,t))>1114111)&&m("Unicode reference out of bounds"),a(!0),(i=u)>65535?(i-=65536,String.fromCharCode(55296+(i>>10))+String.fromCharCode(i%1024+56320)):String.fromCharCode(i)}return String.fromCharCode(D(4,t));case 10:return"";case 13:if("\n"==o())return a(!0,e),""}return s>="0"&&s<="7"?(n&&t&&m("Octal escape sequences are not allowed in template strings"),function(e,t){var n=o();n>="0"&&n<="7"&&(e+=a(!0))[0]<="3"&&(n=o())>="0"&&n<="7"&&(e+=a(!0));if("0"===e)return"\0";e.length>0&&ee.has_directive("use strict")&&t&&m("Legacy octal escape sequences are not allowed in strict mode");return String.fromCharCode(parseInt(e,8))}(s,t)):s}function D(e,t){for(var n=0;e>0;--e){if(!t&&isNaN(parseInt(o(),16)))return parseInt(n,16)||"";var i=a(!0);isNaN(parseInt(i,16))&&m("Invalid hex-character pattern in string"),n+=i}return parseInt(n,16)}var g=J("Unterminated string constant",function(){for(var e=a(),t="";;){var n=a(!0,!0);if("\\"==n)n=h(!0,!0);else if("\r"==n||"\n"==n)m("Unterminated string constant");else if(n==e)break;t+=n}var i=_("string",t);return i.quote=e,i}),S=J("Unterminated template",function(e){e&&r.template_braces.push(r.brace_counter);var t,n,i="",s="";for(a(!0,!0);"`"!=(t=a(!0,!0));){if("\r"==t)"\n"==o()&&++r.pos,t="\n";else if("$"==t&&"{"==o())return a(!0,!0),r.brace_counter++,(n=_(e?"template_head":"template_substitution",i)).raw=s,n;if(s+=t,"\\"==t){var u=r.pos;t=h(!0,!(p&&("name"===p.type||"punc"===p.type&&(")"===p.value||"]"===p.value))),!0),s+=r.text.substr(u,r.pos-u)}i+=t}return r.template_braces.pop(),(n=_(e?"template_head":"template_substitution",i)).raw=s,n.end=!0,n});function L(e){var t,n=r.regex_allowed,i=function(){for(var e=r.text,t=r.pos,n=r.text.length;t<n;++t){var i=e[t];if(I.has(i))return t}return-1}();return-1==i?(t=r.text.substr(r.pos),r.pos=r.text.length):(t=r.text.substring(r.pos,i),r.pos=i),r.col=r.tokcol+(r.pos-r.tokpos),r.comments_before.push(_(e,t,!0)),r.regex_allowed=n,ee}var B=J("Unterminated multiline comment",function(){var e=r.regex_allowed,t=c("*/",!0),n=r.text.substring(r.pos,t).replace(/\r\n|\r|\u2028|\u2029/g,"\n");return s(function(e){for(var t=0,n=0;n<e.length;n++)U(e.charCodeAt(n))&&G(e.charCodeAt(n+1))&&(t++,n++);return e.length-t}(n)+2),r.comments_before.push(_("comment2",n,!0)),r.newline_before=r.newline_before||n.includes("\n"),r.regex_allowed=e,ee}),W=J("Unterminated identifier name",function(){var e,t,n=!1,i=function(){return n=!0,a(),"u"!==o()&&m("Expecting UnicodeEscapeSequence -- uXXXX or u{XXXX}"),h(!1,!0)};if("\\"===(e=o()))X(e=i())||m("First identifier char is an invalid identifier char");else{if(!X(e))return"";a()}for(;null!=(t=o());){if("\\"===(t=o()))z(t=i())||m("Invalid escaped identifier char");else{if(!z(t))break;a()}e+=t}return T.has(e)&&n&&m("Escaped characters are not allowed in keywords"),e}),Y=J("Unterminated regular expression",function(e){for(var t,n=!1,i=!1;t=a(!0);)if(I.has(t))m("Unexpected line terminator");else if(n)e+="\\"+t,n=!1;else if("["==t)i=!0,e+=t;else if("]"==t&&i)i=!1,e+=t;else{if("/"==t&&!i)break;"\\"==t?n=!0:e+=t}var r=W();try{return _("regexp",new RegExp(e,r))}catch(e){m(e.message)}});function $(e){return _("operator",function e(t){if(!o())return t;var n=t+o();return x.has(n)?(a(),e(n)):t}(e||a()))}function Z(){switch(a(),o()){case"/":return a(),L("comment1");case"*":return a(),B()}return r.regex_allowed?Y(""):$("/")}function J(e,t){return function(n){try{return t(n)}catch(t){if(t!==j)throw t;m(e)}}}function ee(e){if(null!=e)return Y(e);for(i&&0==r.pos&&u("#!")&&(l(),s(2),L("comment5"));;){if(d(),l(),n){if(u("\x3c!--")){s(4),L("comment3");continue}if(u("--\x3e")&&r.newline_before){s(3),L("comment4");continue}}var t=o();if(!t)return _("eof");var c=t.charCodeAt(0);switch(c){case 34:case 39:return g();case 46:return a(),H(o().charCodeAt(0))?E("."):"."===o()?(a(),a(),_("expand","...")):_("punc",".");case 47:var p=Z();if(p===ee)continue;return p;case 61:return a(),">"===o()?(a(),_("arrow","=>")):$("=");case 96:return S(!0);case 123:r.brace_counter++;break;case 125:if(r.brace_counter--,r.template_braces.length>0&&r.template_braces[r.template_braces.length-1]===r.brace_counter)return S(!1)}if(H(c))return E();if(P.has(t))return _("punc",a());if(y.has(t))return $();if(92==c||X(t))return h=void 0,h=W(),f?_("name",h):v.has(h)?_("atom",h):A.has(h)?x.has(h)?_("operator",h):_("keyword",h):_("name",h);break}var h;m("Unexpected character '"+t+"'")}return ee.next=a,ee.peek=o,ee.context=function(e){return e&&(r=e),r},ee.add_directive=function(e){r.directive_stack[r.directive_stack.length-1].push(e),void 0===r.directives[e]?r.directives[e]=1:r.directives[e]++},ee.push_directives_stack=function(){r.directive_stack.push([])},ee.pop_directives_stack=function(){for(var e=r.directive_stack[r.directive_stack.length-1],t=0;t<e.length;t++)r.directives[e[t]]--;r.directive_stack.pop()},ee.has_directive=function(e){return r.directives[e]>0},ee}var J=E(["typeof","void","delete","--","++","!","~","-","+"]),Q=E(["--","++"]),ee=E(["=","+=","-=","/=","*=","**=","%=",">>=","<<=",">>>=","|=","^=","&="]),te=function(e,t){for(var n=0;n<e.length;++n)for(var i=e[n],r=0;r<i.length;++r)t[i[r]]=n+1;return t}([["||"],["&&"],["|"],["^"],["&"],["==","===","!=","!=="],["<",">","<=",">=","in","instanceof"],[">>","<<",">>>"],["+","-"],["*","/","%"],["**"]],{}),ne=E(["atom","num","big_int","string","regexp","name"]);function ie(e,t){const n=new Map;t=o(t,{bare_returns:!1,ecma:8,expression:!1,filename:null,html5_comments:!0,module:!1,shebang:!0,strict:!1,toplevel:null},!0);var i={input:"string"==typeof e?Z(e,t.filename,t.html5_comments,t.shebang):e,token:null,prev:null,peeked:null,in_function:0,in_async:-1,in_generator:-1,in_directives:!0,in_loop:0,labels:[]};function r(e,t){return $(i.token,e,t)}function a(){return i.peeked||(i.peeked=i.input())}function s(){return i.prev=i.token,i.peeked||a(),i.token=i.peeked,i.peeked=null,i.in_directives=i.in_directives&&("string"==i.token.type||r("punc",";")),i.token}function u(){return i.prev}function c(e,t,n,r){var o=i.input.context();q(e,o.filename,null!=t?t:o.tokline,null!=n?n:o.tokcol,null!=r?r:o.tokpos)}function l(e,t){c(t,e.line,e.col)}function f(e){null==e&&(e=i.token),l(e,"Unexpected token: "+e.type+" ("+e.value+")")}function p(e,t){if(r(e,t))return s();l(i.token,"Unexpected token "+i.token.type+" «"+i.token.value+"», expected "+e+" «"+t+"»")}function _(e){return p("punc",e)}function d(e){return e.nlb||!e.comments_before.every(e=>!e.nlb)}function m(){return!t.strict&&(r("eof")||r("punc","}")||d(i.token))}function E(){return i.in_generator===i.in_function}function h(){return i.in_async===i.in_function}function D(e){r("punc",";")?s():e||m()||f()}function g(){_("(");var e=kt(!0);return _(")"),e}function S(e){return function(...t){const n=i.token,r=e(...t);return r.start=n,r.end=u(),r}}function A(){(r("operator","/")||r("operator","/="))&&(i.peeked=null,i.token=i.input(i.token.value.substr(1)))}i.token=s();var v=S(function(e,n,o){switch(A(),i.token.type){case"string":if(i.in_directives){var E=a();!i.token.raw.includes("\\")&&($(E,"punc",";")||$(E,"punc","}")||d(E)||$(E,"eof"))?i.input.add_directive(i.token.value):i.in_directives=!1}var S=i.in_directives,T=b();return S&&T.body instanceof en?new ce(T.body):T;case"template_head":case"num":case"big_int":case"regexp":case"operator":case"atom":return b();case"name":if("async"==i.token.value&&$(a(),"keyword","function"))return s(),s(),n&&c("functions are not allowed as the body of a loop"),O(xe,!1,!0,e);if("import"==i.token.value&&!$(a(),"punc","(")){s();var C=function(){var e,t,n=u();r("name")&&(e=_e(Xt));r("punc",",")&&s();((t=oe(!0))||e)&&p("name","from");var o=i.token;"string"!==o.type&&f();return s(),new rt({start:n,imported_name:e,imported_names:t,module_name:new en({start:o,value:o.value,quote:o.quote,end:o}),end:i.token})}();return D(),C}return $(a(),"punc",":")?function(){var e=_e(Wt);"await"===e.name&&h()&&l(i.prev,"await cannot be used as label inside async function");i.labels.some(t=>t.name===e.name)&&c("Label "+e.name+" defined twice");_(":"),i.labels.push(e);var t=v();i.labels.pop(),t instanceof De||e.references.forEach(function(t){t instanceof Xe&&(t=t.label.start,c("Continue label `"+e.name+"` refers to non-IterationStatement.",t.line,t.col,t.pos))});return new he({body:t,label:e})}():b();case"punc":switch(i.token.value){case"{":return new de({start:i.token,body:N(),end:u()});case"[":case"(":return b();case";":return i.in_directives=!1,s(),new me;default:f()}case"keyword":switch(i.token.value){case"break":return s(),y(He);case"continue":return s(),y(Xe);case"debugger":return s(),D(),new ue;case"do":s();var F=Qt(v);p("keyword","while");var R=g();return D(!0),new Se({body:F,condition:R});case"while":return s(),new Ae({condition:g(),body:Qt(function(){return v(!1,!0)})});case"for":return s(),function(){var e="`for await` invalid in this context",t=i.token;"name"==t.type&&"await"==t.value?(h()||l(t,e),s()):t=!1;_("(");var n=null;if(r("punc",";"))t&&l(t,e);else{n=r("keyword","var")?(s(),I(!0)):r("keyword","let")?(s(),V(!0)):r("keyword","const")?(s(),P(!0)):kt(!0,!0);var o=r("operator","in"),a=r("name","of");if(t&&!a&&l(t,e),o||a)return n instanceof Qe?n.definitions.length>1&&l(n.start,"Only one variable declaration allowed in for..in loop"):_t(n)||(n=Ot(n))instanceof ke||l(n.start,"Invalid left-hand side in for..in loop"),s(),o?function(e){var t=kt(!0);return _(")"),new Te({init:e,object:t,body:Qt(function(){return v(!1,!0)})})}(n):function(e,t){var n=e instanceof Qe?e.definitions[0].name:null,i=kt(!0);return _(")"),new be({await:t,init:e,name:n,object:i,body:Qt(function(){return v(!1,!0)})})}(n,!!t)}return function(e){_(";");var t=r("punc",";")?null:kt(!0);_(";");var n=r("punc",")")?null:kt(!0);return _(")"),new ve({init:e,condition:t,step:n,body:Qt(function(){return v(!1,!0)})})}(n)}();case"class":return s(),n&&c("classes are not allowed as the body of a loop"),o&&c("classes are not allowed as the body of an if"),Y(Ft);case"function":return s(),n&&c("functions are not allowed as the body of a loop"),O(xe,!1,!1,e);case"if":return s(),function(){var e=g(),t=v(!1,!1,!0),n=null;r("keyword","else")&&(s(),n=v(!1,!1,!0));return new ze({condition:e,body:t,alternative:n})}();case"return":0!=i.in_function||t.bare_returns||c("'return' outside of function"),s();var w=null;return r("punc",";")?s():m()||(w=kt(!0),D()),new Ke({value:w});case"switch":return s(),new We({expression:g(),body:Qt(x)});case"throw":s(),d(i.token)&&c("Illegal newline after 'throw'");w=kt(!0);return D(),new Ue({value:w});case"try":return s(),function(){var e=N(),t=null,n=null;if(r("keyword","catch")){var o=i.token;if(s(),r("punc","{"))var a=null;else{_("(");a=M(void 0,Ht);_(")")}t=new Ze({start:o,argname:a,body:N(),end:u()})}if(r("keyword","finally")){o=i.token;s(),n=new Je({start:o,body:N(),end:u()})}t||n||c("Missing catch/finally blocks");return new je({body:e,bcatch:t,bfinally:n})}();case"var":s();C=I();return D(),C;case"let":s();C=V();return D(),C;case"const":s();C=P();return D(),C;case"with":return i.input.has_directive("use strict")&&c("Strict mode may not include a with statement"),s(),new ye({expression:g(),body:v()});case"export":if(!$(a(),"punc","(")){s();C=function(){var e,t,n,o,c,l=i.token;if(r("keyword","default"))e=!0,s();else if(t=oe(!1)){if(r("name","from")){s();var p=i.token;return"string"!==p.type&&f(),s(),new ot({start:l,is_default:e,exported_names:t,module_name:new en({start:p,value:p.value,quote:p.quote,end:p}),end:u()})}return new ot({start:l,is_default:e,exported_names:t,end:u()})}r("punc","{")||e&&(r("keyword","class")||r("keyword","function"))&&$(a(),"punc")?(o=kt(!1),D()):(n=v(e))instanceof Qe&&e?f(n.start):n instanceof Qe||n instanceof Me||n instanceof Ft?c=n:n instanceof le?o=n.body:f(n.start);return new ot({start:l,is_default:e,exported_value:o,exported_definition:c,end:u()})}();return r("punc",";")&&D(),C}}}f()});function b(e){return new le({body:(e=kt(!0),D(),e)})}function y(e){var t,n=null;m()||(n=_e(jt,!0)),null!=n?((t=i.labels.find(e=>e.name===n.name))||c("Undefined label "+n.name),n.thedef=t):0==i.in_loop&&c(e.TYPE+" not inside a loop or switch"),D();var r=new e({label:n});return t&&t.references.push(r),r}var C=function(e,t,n){d(i.token)&&c("Unexpected newline before arrow (=>)"),p("arrow","=>");var o=w(r("punc","{"),!1,n),a=o instanceof Array&&o.length?o[o.length-1].end:o instanceof Array?e:o.end;return new Ne({start:e,end:a,async:n,argnames:t,body:o})},O=function(e,t,n,i){var o=e===xe,a=r("operator","*");a&&s();var c=r("name")?_e(o?Pt:Kt):null;o&&!c&&(i?e=we:f()),!c||e===Re||c instanceof Nt||f(u());var l=[],p=w(!0,a||t,n,c,l);return new e({start:l.start,end:p.end,is_generator:a,async:n,name:c,argnames:l,body:p})};function F(e,t){var n=new Set,i=!1,r=!1,o=!1,a=!!t,s={add_parameter:function(t){if(n.has(t.value))!1===i&&(i=t),s.check_strict();else if(n.add(t.value),e)switch(t.value){case"arguments":case"eval":case"yield":a&&l(t,"Unexpected "+t.value+" identifier as parameter inside strict mode");break;default:T.has(t.value)&&f()}},mark_default_assignment:function(e){!1===r&&(r=e)},mark_spread:function(e){!1===o&&(o=e)},mark_strict_mode:function(){a=!0},is_strict:function(){return!1!==r||!1!==o||a},check_strict:function(){s.is_strict()&&!1!==i&&l(i,"Parameter "+i.value+" was used already")}};return s}function M(e,t){var n,o=!1;return void 0===e&&(e=F(!0,i.input.has_directive("use strict"))),r("expand","...")&&(o=i.token,e.mark_spread(i.token),s()),n=R(e,t),r("operator","=")&&!1===o&&(e.mark_default_assignment(i.token),s(),n=new gt({start:n.start,left:n,operator:"=",right:kt(!1),end:i.token})),!1!==o&&(r("punc",")")||f(),n=new Fe({start:o,expression:n,end:o})),e.check_strict(),n}function R(e,t){var n,o=[],l=!0,p=!1,d=i.token;if(void 0===e&&(e=F(!1,i.input.has_directive("use strict"))),t=void 0===t?Vt:t,r("punc","[")){for(s();!r("punc","]");){if(l?l=!1:_(","),r("expand","...")&&(p=!0,n=i.token,e.mark_spread(i.token),s()),r("punc"))switch(i.token.value){case",":o.push(new cn({start:i.token,end:i.token}));continue;case"]":break;case"[":case"{":o.push(R(e,t));break;default:f()}else r("name")?(e.add_parameter(i.token),o.push(_e(t))):c("Invalid function parameter");r("operator","=")&&!1===p&&(e.mark_default_assignment(i.token),s(),o[o.length-1]=new gt({start:o[o.length-1].start,left:o[o.length-1],operator:"=",right:kt(!1),end:i.token})),p&&(r("punc","]")||c("Rest element must be last element"),o[o.length-1]=new Fe({start:n,expression:o[o.length-1],end:n}))}return _("]"),e.check_strict(),new ke({start:d,names:o,is_array:!0,end:u()})}if(r("punc","{")){for(s();!r("punc","}");){if(l?l=!1:_(","),r("expand","...")&&(p=!0,n=i.token,e.mark_spread(i.token),s()),r("name")&&($(a(),"punc")||$(a(),"operator"))&&[",","}","="].includes(a().value)){e.add_parameter(i.token);var m=u(),E=_e(t);p?o.push(new Fe({start:n,expression:E,end:E.end})):o.push(new Tt({start:m,key:E.name,value:E,end:E.end}))}else{if(r("punc","}"))continue;var h=i.token,D=se();null===D?f(u()):"name"!==u().type||r("punc",":")?(_(":"),o.push(new Tt({start:h,quote:h.quote,key:D,value:R(e,t),end:u()}))):o.push(new Tt({start:u(),key:D,value:new t({start:u(),name:D,end:u()}),end:u()}))}p?r("punc","}")||c("Rest element must be last element"):r("operator","=")&&(e.mark_default_assignment(i.token),s(),o[o.length-1].value=new gt({start:o[o.length-1].value.start,left:o[o.length-1].value,operator:"=",right:kt(!1),end:i.token}))}return _("}"),e.check_strict(),new ke({start:d,names:o,is_array:!1,end:u()})}if(r("name"))return e.add_parameter(i.token),_e(t);c("Invalid function parameter")}function w(e,n,o,a,u){var c=i.in_loop,l=i.labels,p=i.in_generator,d=i.in_async;if(++i.in_function,n&&(i.in_generator=i.in_function),o&&(i.in_async=i.in_function),u&&function(e){var n=F(!0,i.input.has_directive("use strict"));for(_("(");!r("punc",")");){var o=M(n);if(e.push(o),r("punc",")")||(_(","),r("punc",")")&&t.ecma<8&&f()),o instanceof Fe)break}s()}(u),e&&(i.in_directives=!0),i.in_loop=0,i.labels=[],e){i.input.push_directives_stack();var m=N();a&&pe(a),u&&u.forEach(pe),i.input.pop_directives_stack()}else m=kt(!1);return--i.in_function,i.in_loop=c,i.labels=l,i.in_generator=p,i.in_async=d,m}function N(){_("{");for(var e=[];!r("punc","}");)r("eof")&&f(),e.push(v());return s(),e}function x(){_("{");for(var e,t=[],n=null,o=null;!r("punc","}");)r("eof")&&f(),r("keyword","case")?(o&&(o.end=u()),n=[],o=new $e({start:(e=i.token,s(),e),expression:kt(!0),body:n}),t.push(o),_(":")):r("keyword","default")?(o&&(o.end=u()),n=[],o=new qe({start:(e=i.token,s(),_(":"),e),body:n}),t.push(o)):(n||f(),n.push(v()));return o&&(o.end=u()),s(),t}function k(e,t){for(var n,o=[];;){var a="var"===t?xt:"const"===t?It:"let"===t?Lt:null;if(r("punc","{")||r("punc","[")?n=new at({start:i.token,name:R(void 0,a),value:r("operator","=")?(p("operator","="),kt(!1,e)):null,end:u()}):"import"==(n=new at({start:i.token,name:_e(a),value:r("operator","=")?(s(),kt(!1,e)):e||"const"!==t?null:c("Missing initializer in const declaration"),end:u()})).name.name&&c("Unexpected token: import"),o.push(n),!r("punc",","))break;s()}return o}var I=function(e){return new et({start:u(),definitions:k(e,"var"),end:u()})},V=function(e){return new tt({start:u(),definitions:k(e,"let"),end:u()})},P=function(e){return new nt({start:u(),definitions:k(e,"const"),end:u()})};function B(){var e,t=i.token;switch(t.type){case"name":e=fe(Yt);break;case"num":e=new tn({start:t,end:t,value:t.value});break;case"big_int":e=new nn({start:t,end:t,value:t.value});break;case"string":e=new en({start:t,end:t,value:t.value,quote:t.quote});break;case"regexp":e=new rn({start:t,end:t,value:t.value});break;case"atom":switch(t.value){case"false":e=new pn({start:t,end:t});break;case"true":e=new _n({start:t,end:t});break;case"null":e=new an({start:t,end:t})}}return s(),e}function K(e,t,n,i){var r=function(e,t){return t?new gt({start:e.start,left:e,operator:"=",right:t,end:t.end}):e};return e instanceof At?r(new ke({start:e.start,end:e.end,is_array:!1,names:e.properties.map(K)}),i):e instanceof Tt?(e.value=K(e.value,0,[e.key]),r(e,i)):e instanceof cn?e:e instanceof ke?(e.names=e.names.map(K),r(e,i)):e instanceof Yt?r(new Vt({name:e.name,start:e.start,end:e.end}),i):e instanceof Fe?(e.expression=K(e.expression),r(e,i)):e instanceof St?r(new ke({start:e.start,end:e.end,is_array:!0,names:e.elements.map(K)}),i):e instanceof Dt?r(K(e.left,void 0,void 0,e.right),i):e instanceof gt?(e.left=K(e.left,0,[e.left]),e):void c("Invalid function parameter",e.start.line,e.start.col)}var U=function(e,o){if(r("operator","new"))return function(e){var n=i.token;if(p("operator","new"),r("punc","."))return s(),p("name","target"),ge(new wt({start:n,end:u()}),e);var o,a=U(!1);r("punc","(")?(s(),o=H(")",t.ecma>=8)):o=[];var c=new ut({start:n,expression:a,args:o,end:u()});return Ee(c),ge(c,e)}(e);var c,l=i.token,d=r("name","async")&&"["!=(c=a()).value&&"arrow"!=c.type&&B();if(r("punc")){switch(i.token.value){case"(":if(d&&!e)break;var m=function(e,n){var o,a,c,l=[];for(_("(");!r("punc",")");)o&&f(o),r("expand","...")?(o=i.token,n&&(a=i.token),s(),l.push(new Fe({start:u(),expression:kt(),end:i.token}))):l.push(kt()),r("punc",")")||(_(","),r("punc",")")&&(t.ecma<8&&f(),c=u(),n&&(a=c)));return _(")"),e&&r("arrow","=>")?o&&c&&f(c):a&&f(a),l}(o,!d);if(o&&r("arrow","=>"))return C(l,m.map(K),!!d);var E=d?new st({expression:d,args:m}):1==m.length?m[0]:new ct({expressions:m});if(E.start){const e=l.comments_before.length;if(n.set(l,e),E.start.comments_before.unshift(...l.comments_before),l.comments_before=E.start.comments_before,0==e&&l.comments_before.length>0){var h=l.comments_before[0];h.nlb||(h.nlb=l.nlb,l.nlb=!1)}l.comments_after=E.start.comments_after}E.start=l;var D=u();return E.end&&(D.comments_before=E.end.comments_before,E.end.comments_after.push(...D.comments_after),D.comments_after=E.end.comments_after),E.end=D,E instanceof st&&Ee(E),ge(E,e);case"[":return ge(X(),e);case"{":return ge(W(),e)}d||f()}if(o&&r("name")&&$(a(),"arrow")){var g=new Vt({name:i.token.value,start:l,end:l});return s(),C(l,[g],!!d)}if(r("keyword","function")){s();var S=O(we,!1,!!d);return S.start=l,S.end=u(),ge(S,e)}if(d)return ge(d,e);if(r("keyword","class")){s();var A=Y(Mt);return A.start=l,A.end=u(),ge(A,e)}return r("template_head")?ge(G(),e):ne.has(i.token.type)?ge(B(),e):void f()};function G(e){var t=[],n=i.token;for(t.push(new Ve({start:i.token,raw:i.token.raw,value:i.token.value,end:i.token}));!i.token.end;)s(),A(),t.push(kt(!0)),$("template_substitution")||f(),t.push(new Ve({start:i.token,raw:i.token.raw,value:i.token.value,end:i.token}));return s(),new Le({start:n,segments:t,end:i.token})}function H(e,t,n){for(var o=!0,a=[];!r("punc",e)&&(o?o=!1:_(","),!t||!r("punc",e));)r("punc",",")&&n?a.push(new cn({start:i.token,end:i.token})):r("expand","...")?(s(),a.push(new Fe({start:u(),expression:kt(),end:i.token}))):a.push(kt(!1));return s(),a}var X=S(function(){return _("["),new St({elements:H("]",!t.strict,!0)})}),z=S(function(e,t){return O(Re,e,t)}),W=S(function(){var e=i.token,n=!0,o=[];for(_("{");!r("punc","}")&&(n?n=!1:_(","),t.strict||!r("punc","}"));)if("expand"!=(e=i.token).type){var a,c=se();if(r("punc",":"))null===c?f(u()):(s(),a=kt(!1));else{var l=j(c,e);if(l){o.push(l);continue}a=new Yt({start:u(),name:c,end:u()})}r("operator","=")&&(s(),a=new Dt({start:e,left:a,operator:"=",right:kt(!1),end:u()})),o.push(new Tt({start:e,quote:e.quote,key:c instanceof ae?c:""+c,value:a,end:u()}))}else s(),o.push(new Fe({start:e,expression:kt(!1),end:u()}));return s(),new At({properties:o})});function Y(e){var t,n,o,a,c=[];for(i.input.push_directives_stack(),i.input.add_directive("use strict"),"name"==i.token.type&&"extends"!=i.token.value&&(o=_e(e===Ft?Ut:Gt)),e!==Ft||o||f(),"extends"==i.token.value&&(s(),a=kt(!0)),_("{"),r("punc",";")&&s();!r("punc","}");)t=i.token,(n=j(se(),t,!0))||f(),c.push(n),r("punc",";")&&s();return i.input.pop_directives_stack(),s(),new e({start:t,name:o,extends:a,properties:c,end:u()})}function j(e,t,n){var o=function(e,t){return"string"==typeof e||"number"==typeof e?new Bt({start:t,name:""+e,end:u()}):(null===e&&f(),e)},a=!1,s=!1,c=!1,l=t;if(n&&"static"===e&&!r("punc","(")&&(s=!0,l=i.token,e=se()),"async"!==e||r("punc","(")||r("punc",",")||r("punc","}")||(a=!0,l=i.token,e=se()),null===e&&(c=!0,l=i.token,null===(e=se())&&f()),r("punc","("))return e=o(e,t),new Ct({start:t,static:s,is_generator:c,async:a,key:e,quote:e instanceof Bt?l.quote:void 0,value:z(c,a),end:u()});if(l=i.token,"get"==e){if(!r("punc")||r("punc","["))return e=o(se(),t),new yt({start:t,static:s,key:e,quote:e instanceof Bt?l.quote:void 0,value:z(),end:u()})}else if("set"==e&&(!r("punc")||r("punc","[")))return e=o(se(),t),new bt({start:t,static:s,key:e,quote:e instanceof Bt?l.quote:void 0,value:z(),end:u()})}function ie(e){function t(e){return new e({name:se(),start:u(),end:u()})}var n,o,a=e?zt:$t,c=e?Xt:qt,l=i.token;return e?n=t(a):o=t(c),r("name","as")?(s(),e?o=t(c):n=t(a)):e?o=new c(n):n=new a(o),new it({start:l,foreign_name:n,name:o,end:u()})}function re(e,t){var n,r=e?zt:$t,o=e?Xt:qt,a=i.token,s=u();return t=t||new o({name:"*",start:a,end:s}),n=new r({name:"*",start:a,end:s}),new it({start:a,foreign_name:n,name:t,end:s})}function oe(e){var t;if(r("punc","{")){for(s(),t=[];!r("punc","}");)t.push(ie(e)),r("punc",",")&&s();s()}else if(r("operator","*")){var n;s(),e&&r("name","as")&&(s(),n=_e(e?Xt:$t)),t=[re(e,n)]}return t}function se(){var e=i.token;switch(e.type){case"punc":if("["===e.value){s();var t=kt(!1);return _("]"),t}f(e);case"operator":if("*"===e.value)return s(),null;["delete","in","instanceof","new","typeof","void"].includes(e.value)||f(e);case"name":"yield"==e.value&&(E()?l(e,"Yield cannot be used as identifier inside generators"):$(a(),"punc",":")||$(a(),"punc","(")||!i.input.has_directive("use strict")||l(e,"Unexpected yield identifier inside strict mode"));case"string":case"num":case"big_int":case"keyword":case"atom":return s(),e.value;default:f(e)}}function fe(e){var t=i.token.value;return new("this"==t?Zt:"super"==t?Jt:e)({name:String(t),start:i.token,end:i.token})}function pe(e){var t=e.name;E()&&"yield"==t&&l(e.start,"Yield cannot be used as identifier inside generators"),i.input.has_directive("use strict")&&("yield"==t&&l(e.start,"Unexpected yield identifier inside strict mode"),e instanceof Nt&&("arguments"==t||"eval"==t)&&l(e.start,"Unexpected "+t+" in strict mode"))}function _e(e,t){if(!r("name"))return t||c("Name expected"),null;var n=fe(e);return pe(n),s(),n}function Ee(e){var t=e.start,i=t.comments_before;const r=n.get(t);for(var o=null!=r?r:i.length;--o>=0;){var a=i[o];if(/[@#]__PURE__/.test(a.value)){e.pure=!0;break}}}var ge=function(e,t){var n,o=e.start;if(r("punc","."))return s(),ge(new ft({start:o,expression:e,property:(n=i.token,"name"!=n.type&&f(),s(),n.value),end:u()}),t);if(r("punc","[")){s();var a=kt(!0);return _("]"),ge(new pt({start:o,expression:e,property:a,end:u()}),t)}if(t&&r("punc","(")){s();var c=new st({start:o,expression:e,args:Ce(),end:u()});return Ee(c),ge(c,!0)}return r("template_head")?ge(new Ie({start:o,prefix:e,template_string:G(),end:u()}),t):e};function Ce(){for(var e=[];!r("punc",")");)r("expand","...")?(s(),e.push(new Fe({start:u(),expression:kt(!1),end:u()}))):e.push(kt(!1)),r("punc",")")||(_(","),r("punc",")")&&t.ecma<8&&f());return s(),e}var Pe=function(e,t){var n=i.token;if("name"==n.type&&"await"==n.value){if(h())return s(),h()||c("Unexpected await expression outside async function",i.prev.line,i.prev.col,i.prev.pos),new dn({start:u(),end:i.token,expression:Pe(!0)});i.input.has_directive("use strict")&&l(i.token,"Unexpected await identifier inside strict mode")}if(r("operator")&&J.has(n.value)){s(),A();var o=Be(dt,n,Pe(e));return o.start=n,o.end=u(),o}for(var a=U(e,t);r("operator")&&Q.has(i.token.value)&&!d(i.token);)a instanceof Ne&&f(),(a=Be(mt,i.token,a)).start=n,a.end=i.token,s();return a};function Be(e,t,n){var r=t.value;switch(r){case"++":case"--":_t(n)||c("Invalid use of "+r+" operator",t.line,t.col,t.pos);break;case"delete":n instanceof Yt&&i.input.has_directive("use strict")&&c("Calling delete on expression not allowed in strict mode",n.start.line,n.start.col,n.start.pos)}return new e({operator:r,expression:n})}var Ge=function(e,t,n){var o=r("operator")?i.token.value:null;"in"==o&&n&&(o=null),"**"==o&&e instanceof dt&&!$(e.start,"punc","(")&&"--"!==e.operator&&"++"!==e.operator&&f(e.start);var a=null!=o?te[o]:null;if(null!=a&&(a>t||"**"===o&&t===a)){s();var u=Ge(Pe(!0),a,n);return Ge(new Et({start:e.start,left:e,operator:o,right:u,end:u.end}),t,n)}return e};var Ye=function(e){var t=i.token,n=function(e){return Ge(Pe(!0,!0),0,e)}(e);if(r("operator","?")){s();var o=kt(!1);return _(":"),new ht({start:t,condition:n,consequent:o,alternative:kt(!1,e),end:u()})}return n};function _t(e){return e instanceof lt||e instanceof Yt}function Ot(e){if(e instanceof At)e=new ke({start:e.start,names:e.properties.map(Ot),is_array:!1,end:e.end});else if(e instanceof St){for(var t=[],n=0;n<e.elements.length;n++)e.elements[n]instanceof Fe&&(n+1!==e.elements.length&&l(e.elements[n].start,"Spread must the be last element in destructuring array"),e.elements[n].expression=Ot(e.elements[n].expression)),t.push(Ot(e.elements[n]));e=new ke({start:e.start,names:t,is_array:!0,end:e.end})}else e instanceof vt?e.value=Ot(e.value):e instanceof Dt&&(e=new gt({start:e.start,left:e.left,operator:"=",right:e.right,end:e.end}));return e}var Rt=function(e){A();var t=i.token;if("name"==t.type&&"yield"==t.value){if(E())return s(),function(){E()||c("Unexpected yield expression outside generator function",i.prev.line,i.prev.col,i.prev.pos);var e=i.token,t=!1,n=!0;return m()||r("punc")&&L.has(i.token.value)?n=!1:r("operator","*")&&(t=!0,s()),new mn({start:e,is_star:t,expression:n?kt():null,end:u()})}();i.input.has_directive("use strict")&&l(i.token,"Unexpected yield identifier inside strict mode")}var n=Ye(e),o=i.token.value;if(r("operator")&&ee.has(o)){if(_t(n)||(n=Ot(n))instanceof ke)return s(),new Dt({start:t,left:n,operator:o,right:Rt(e),end:u()});c("Invalid assignment")}return n},kt=function(e,t){for(var n=i.token,o=[];o.push(Rt(t)),e&&r("punc",",");)s(),e=!0;return 1==o.length?o[0]:new ct({start:n,expressions:o,end:a()})};function Qt(e){++i.in_loop;var t=e();return--i.in_loop,t}return t.expression?kt(!0):function(){var e=i.token,n=[];for(i.input.push_directives_stack(),t.module&&i.input.add_directive("use strict");!r("eof");)n.push(v());i.input.pop_directives_stack();var o=u(),a=t.toplevel;return a?(a.body=a.body.concat(n),a.end=o):a=new Oe({start:e,body:n,end:o}),a}()}function re(e,t,n,i=ae){var r=t=t?t.split(/\s+/):[];i&&i.PROPS&&(t=t.concat(i.PROPS));for(var o="return function AST_"+e+"(props){ if (props) { ",a=t.length;--a>=0;)o+="this."+t[a]+" = props."+t[a]+";";const s=i&&Object.create(i.prototype);(s&&s.initialize||n&&n.initialize)&&(o+="this.initialize();"),o+="}}";var u=new Function(o)();if(s&&(u.prototype=s,u.BASE=i),i&&i.SUBCLASSES.push(u),u.prototype.CTOR=u,u.PROPS=t||null,u.SELF_PROPS=r,u.SUBCLASSES=[],e&&(u.prototype.TYPE=u.TYPE=e),n)for(a in n)D(n,a)&&("$"===a[0]?u[a.substr(1)]=n[a]:u.prototype[a]=n[a]);return u.DEFMETHOD=function(e,t){this.prototype[e]=t},u}var oe=re("Token","type value line col pos endline endcol endpos nlb comments_before comments_after file raw quote end",{},null),ae=re("Node","start end",{_clone:function(e){if(e){var t=this.clone();return t.transform(new hn(function(e){if(e!==t)return e.clone(!0)}))}return new this.CTOR(this)},clone:function(e){return this._clone(e)},$documentation:"Base class of all AST nodes",$propdoc:{start:"[AST_Token] The first token of this node",end:"[AST_Token] The last token of this node"},_walk:function(e){return e._visit(this)},walk:function(e){return this._walk(e)}},null);ae.warn_function=null,ae.warn=function(e,t){ae.warn_function&&ae.warn_function(_(e,t))};var se=re("Statement",null,{$documentation:"Base class of all statements"}),ue=re("Debugger",null,{$documentation:"Represents a debugger statement"},se),ce=re("Directive","value quote",{$documentation:'Represents a directive, like "use strict";',$propdoc:{value:"[string] The value of this directive as a plain string (it's not an AST_String!)",quote:"[string] the original quote character"}},se),le=re("SimpleStatement","body",{$documentation:"A statement consisting of an expression, i.e. a = 1 + 2",$propdoc:{body:"[AST_Node] an expression node (should not be instanceof AST_Statement)"},_walk:function(e){return e._visit(this,function(){this.body._walk(e)})}},se);function fe(e,t){var n=e.body;if(n instanceof ae)n._walk(t);else for(var i=0,r=n.length;i<r;i++)n[i]._walk(t)}function pe(e){var t=this._clone(e);return this.block_scope&&(t.block_scope=this.block_scope.clone()),t}var _e=re("Block","body block_scope",{$documentation:"A body of statements (usually braced)",$propdoc:{body:"[AST_Statement*] an array of statements",block_scope:"[AST_Scope] the block scope"},_walk:function(e){return e._visit(this,function(){fe(this,e)})},clone:pe},se),de=re("BlockStatement",null,{$documentation:"A block statement"},_e),me=re("EmptyStatement",null,{$documentation:"The empty statement (empty block or simply a semicolon)"},se),Ee=re("StatementWithBody","body",{$documentation:"Base class for all statements that contain one nested body: `For`, `ForIn`, `Do`, `While`, `With`",$propdoc:{body:"[AST_Statement] the body; this should always be present, even if it's an AST_EmptyStatement"}},se),he=re("LabeledStatement","label",{$documentation:"Statement with a label",$propdoc:{label:"[AST_Label] a label definition"},_walk:function(e){return e._visit(this,function(){this.label._walk(e),this.body._walk(e)})},clone:function(e){var t=this._clone(e);if(e){var n=t.label,i=this.label;t.walk(new En(function(e){e instanceof Ge&&e.label&&e.label.thedef===i&&(e.label.thedef=n,n.references.push(e))}))}return t}},Ee),De=re("IterationStatement","block_scope",{$documentation:"Internal class.  All loops inherit from it.",$propdoc:{block_scope:"[AST_Scope] the block scope for this iteration statement."},clone:pe},Ee),ge=re("DWLoop","condition",{$documentation:"Base class for do/while statements",$propdoc:{condition:"[AST_Node] the loop condition.  Should not be instanceof AST_Statement"}},De),Se=re("Do",null,{$documentation:"A `do` statement",_walk:function(e){return e._visit(this,function(){this.body._walk(e),this.condition._walk(e)})}},ge),Ae=re("While",null,{$documentation:"A `while` statement",_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.body._walk(e)})}},ge),ve=re("For","init condition step",{$documentation:"A `for` statement",$propdoc:{init:"[AST_Node?] the `for` initialization code, or null if empty",condition:"[AST_Node?] the `for` termination clause, or null if empty",step:"[AST_Node?] the `for` update clause, or null if empty"},_walk:function(e){return e._visit(this,function(){this.init&&this.init._walk(e),this.condition&&this.condition._walk(e),this.step&&this.step._walk(e),this.body._walk(e)})}},De),Te=re("ForIn","init object",{$documentation:"A `for ... in` statement",$propdoc:{init:"[AST_Node] the `for/in` initialization code",object:"[AST_Node] the object that we're looping through"},_walk:function(e){return e._visit(this,function(){this.init._walk(e),this.object._walk(e),this.body._walk(e)})}},De),be=re("ForOf","await",{$documentation:"A `for ... of` statement"},Te),ye=re("With","expression",{$documentation:"A `with` statement",$propdoc:{expression:"[AST_Node] the `with` expression"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),this.body._walk(e)})}},Ee),Ce=re("Scope","variables functions uses_with uses_eval parent_scope enclosed cname",{$documentation:"Base class for all statements introducing a lexical scope",$propdoc:{variables:"[Map/S] a map of name -> SymbolDef for all variables/functions defined in this scope",functions:"[Map/S] like `variables`, but only lists function declarations",uses_with:"[boolean/S] tells whether this scope uses the `with` statement",uses_eval:"[boolean/S] tells whether this scope contains a direct call to the global `eval`",parent_scope:"[AST_Scope?/S] link to the parent scope",enclosed:"[SymbolDef*/S] a list of all symbol definitions that are accessed from this scope or any subscopes",cname:"[integer/S] current index for mangling variables (used internally by the mangler)"},get_defun_scope:function(){for(var e=this;e.is_block_scope();)e=e.parent_scope;return e},clone:function(e){var t=this._clone(e);return this.variables&&(t.variables=new Map(this.variables)),this.functions&&(t.functions=new Map(this.functions)),this.enclosed&&(t.enclosed=this.enclosed.slice()),t},pinned:function(){return this.uses_eval||this.uses_with}},_e),Oe=re("Toplevel","globals",{$documentation:"The toplevel scope",$propdoc:{globals:"[Map/S] a map of name -> SymbolDef for all undeclared names"},wrap_commonjs:function(e){var t=this.body,n="(function(exports){'$ORIG';})(typeof "+e+"=='undefined'?("+e+"={}):"+e+");";return n=(n=ie(n)).transform(new hn(function(e){if(e instanceof ce&&"$ORIG"==e.value)return f.splice(t)}))},wrap_enclose:function(e){"string"!=typeof e&&(e="");var t=e.indexOf(":");t<0&&(t=e.length);var n=this.body;return ie(["(function(",e.slice(0,t),'){"$ORIG"})(',e.slice(t+1),")"].join("")).transform(new hn(function(e){if(e instanceof ce&&"$ORIG"==e.value)return f.splice(n)}))}},Ce),Fe=re("Expansion","expression",{$documentation:"An expandible argument, such as ...rest, a splat, such as [1,2,...all], or an expansion in a variable declaration, such as var [first, ...rest] = list",$propdoc:{expression:"[AST_Node] the thing to be expanded"},_walk:function(e){var t=this;return e._visit(this,function(){t.expression.walk(e)})}}),Me=re("Lambda","name argnames uses_arguments is_generator async",{$documentation:"Base class for functions",$propdoc:{name:"[AST_SymbolDeclaration?] the name of this function",argnames:"[AST_SymbolFunarg|AST_Destructuring|AST_Expansion|AST_DefaultAssign*] array of function arguments, destructurings, or expanding arguments",uses_arguments:"[boolean/S] tells whether this function accesses the arguments array",is_generator:"[boolean] is this a generator method",async:"[boolean] is this method async"},args_as_names:function(){for(var e=[],t=0;t<this.argnames.length;t++)this.argnames[t]instanceof ke?e.push(...this.argnames[t].all_symbols()):e.push(this.argnames[t]);return e},_walk:function(e){return e._visit(this,function(){this.name&&this.name._walk(e);for(var t=this.argnames,n=0,i=t.length;n<i;n++)t[n]._walk(e);fe(this,e)})}},Ce),Re=re("Accessor",null,{$documentation:"A setter/getter function.  The `name` property is always null."},Me),we=re("Function","inlined",{$documentation:"A function expression"},Me),Ne=re("Arrow","inlined",{$documentation:"An ES6 Arrow function ((a) => b)"},Me),xe=re("Defun","inlined",{$documentation:"A function definition"},Me),ke=re("Destructuring","names is_array",{$documentation:"A destructuring of several names. Used in destructuring assignment and with destructuring function argument names",$propdoc:{names:"[AST_Node*] Array of properties or elements",is_array:"[Boolean] Whether the destructuring represents an object or array"},_walk:function(e){return e._visit(this,function(){this.names.forEach(function(t){t._walk(e)})})},all_symbols:function(){var e=[];return this.walk(new En(function(t){t instanceof Rt&&e.push(t)})),e}}),Ie=re("PrefixedTemplateString","template_string prefix",{$documentation:"A templatestring with a prefix, such as String.raw`foobarbaz`",$propdoc:{template_string:"[AST_TemplateString] The template string",prefix:"[AST_SymbolRef|AST_PropAccess] The prefix, which can be a symbol such as `foo` or a dotted expression such as `String.raw`."},_walk:function(e){this.prefix._walk(e),this.template_string._walk(e)}}),Le=re("TemplateString","segments",{$documentation:"A template string literal",$propdoc:{segments:"[AST_Node*] One or more segments, starting with AST_TemplateSegment. AST_Node may follow AST_TemplateSegment, but each AST_Node must be followed by AST_TemplateSegment."},_walk:function(e){return e._visit(this,function(){this.segments.forEach(function(t){t._walk(e)})})}}),Ve=re("TemplateSegment","value raw",{$documentation:"A segment of a template string literal",$propdoc:{value:"Content of the segment",raw:"Raw content of the segment"}}),Pe=re("Jump",null,{$documentation:"Base class for “jumps” (for now that's `return`, `throw`, `break` and `continue`)"},se),Be=re("Exit","value",{$documentation:"Base class for “exits” (`return` and `throw`)",$propdoc:{value:"[AST_Node?] the value returned or thrown by this statement; could be null for AST_Return"},_walk:function(e){return e._visit(this,this.value&&function(){this.value._walk(e)})}},Pe),Ke=re("Return",null,{$documentation:"A `return` statement"},Be),Ue=re("Throw",null,{$documentation:"A `throw` statement"},Be),Ge=re("LoopControl","label",{$documentation:"Base class for loop control statements (`break` and `continue`)",$propdoc:{label:"[AST_LabelRef?] the label, or null if none"},_walk:function(e){return e._visit(this,this.label&&function(){this.label._walk(e)})}},Pe),He=re("Break",null,{$documentation:"A `break` statement"},Ge),Xe=re("Continue",null,{$documentation:"A `continue` statement"},Ge),ze=re("If","condition alternative",{$documentation:"A `if` statement",$propdoc:{condition:"[AST_Node] the `if` condition",alternative:"[AST_Statement?] the `else` part, or null if not present"},_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.body._walk(e),this.alternative&&this.alternative._walk(e)})}},Ee),We=re("Switch","expression",{$documentation:"A `switch` statement",$propdoc:{expression:"[AST_Node] the `switch` “discriminant”"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),fe(this,e)})}},_e),Ye=re("SwitchBranch",null,{$documentation:"Base class for `switch` branches"},_e),qe=re("Default",null,{$documentation:"A `default` switch branch"},Ye),$e=re("Case","expression",{$documentation:"A `case` switch branch",$propdoc:{expression:"[AST_Node] the `case` expression"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e),fe(this,e)})}},Ye),je=re("Try","bcatch bfinally",{$documentation:"A `try` statement",$propdoc:{bcatch:"[AST_Catch?] the catch block, or null if not present",bfinally:"[AST_Finally?] the finally block, or null if not present"},_walk:function(e){return e._visit(this,function(){fe(this,e),this.bcatch&&this.bcatch._walk(e),this.bfinally&&this.bfinally._walk(e)})}},_e),Ze=re("Catch","argname",{$documentation:"A `catch` node; only makes sense as part of a `try` statement",$propdoc:{argname:"[AST_SymbolCatch|AST_Destructuring|AST_Expansion|AST_DefaultAssign] symbol for the exception"},_walk:function(e){return e._visit(this,function(){this.argname&&this.argname._walk(e),fe(this,e)})}},_e),Je=re("Finally",null,{$documentation:"A `finally` node; only makes sense as part of a `try` statement"},_e),Qe=re("Definitions","definitions",{$documentation:"Base class for `var` or `const` nodes (variable declarations/initializations)",$propdoc:{definitions:"[AST_VarDef*] array of variable definitions"},_walk:function(e){return e._visit(this,function(){for(var t=this.definitions,n=0,i=t.length;n<i;n++)t[n]._walk(e)})}},se),et=re("Var",null,{$documentation:"A `var` statement"},Qe),tt=re("Let",null,{$documentation:"A `let` statement"},Qe),nt=re("Const",null,{$documentation:"A `const` statement"},Qe),it=re("NameMapping","foreign_name name",{$documentation:"The part of the export/import statement that declare names from a module.",$propdoc:{foreign_name:"[AST_SymbolExportForeign|AST_SymbolImportForeign] The name being exported/imported (as specified in the module)",name:"[AST_SymbolExport|AST_SymbolImport] The name as it is visible to this module."},_walk:function(e){return e._visit(this,function(){this.foreign_name._walk(e),this.name._walk(e)})}}),rt=re("Import","imported_name imported_names module_name",{$documentation:"An `import` statement",$propdoc:{imported_name:"[AST_SymbolImport] The name of the variable holding the module's default export.",imported_names:"[AST_NameMapping*] The names of non-default imported variables",module_name:"[AST_String] String literal describing where this module came from"},_walk:function(e){return e._visit(this,function(){this.imported_name&&this.imported_name._walk(e),this.imported_names&&this.imported_names.forEach(function(t){t._walk(e)}),this.module_name._walk(e)})}}),ot=re("Export","exported_definition exported_value is_default exported_names module_name",{$documentation:"An `export` statement",$propdoc:{exported_definition:"[AST_Defun|AST_Definitions|AST_DefClass?] An exported definition",exported_value:"[AST_Node?] An exported value",exported_names:"[AST_NameMapping*?] List of exported names",module_name:"[AST_String?] Name of the file to load exports from",is_default:"[Boolean] Whether this is the default exported value of this module"},_walk:function(e){e._visit(this,function(){this.exported_definition&&this.exported_definition._walk(e),this.exported_value&&this.exported_value._walk(e),this.exported_names&&this.exported_names.forEach(function(t){t._walk(e)}),this.module_name&&this.module_name._walk(e)})}},se),at=re("VarDef","name value",{$documentation:"A variable declaration; only appears in a AST_Definitions node",$propdoc:{name:"[AST_Destructuring|AST_SymbolConst|AST_SymbolLet|AST_SymbolVar] name of the variable",value:"[AST_Node?] initializer, or null of there's no initializer"},_walk:function(e){return e._visit(this,function(){this.name._walk(e),this.value&&this.value._walk(e)})}}),st=re("Call","expression args pure",{$documentation:"A function call expression",$propdoc:{expression:"[AST_Node] expression to invoke as function",args:"[AST_Node*] array of arguments",pure:"[boolean] whether this is a pure call"},_walk:function(e){return e._visit(this,function(){for(var t=this.args,n=0,i=t.length;n<i;n++)t[n]._walk(e);this.expression._walk(e)})}}),ut=re("New",null,{$documentation:"An object instantiation.  Derives from a function call since it has exactly the same properties"},st),ct=re("Sequence","expressions",{$documentation:"A sequence expression (comma-separated expressions)",$propdoc:{expressions:"[AST_Node*] array of expressions (at least two)"},_walk:function(e){return e._visit(this,function(){this.expressions.forEach(function(t){t._walk(e)})})}}),lt=re("PropAccess","expression property",{$documentation:'Base class for property access expressions, i.e. `a.foo` or `a["foo"]`',$propdoc:{expression:"[AST_Node] the “container” expression",property:"[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"}}),ft=re("Dot","quote",{$documentation:"A dotted property access expression",$propdoc:{quote:"[string] the original quote character when transformed from AST_Sub"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e)})}},lt),pt=re("Sub",null,{$documentation:'Index-style property access, i.e. `a["foo"]`',_walk:function(e){return e._visit(this,function(){this.expression._walk(e),this.property._walk(e)})}},lt),_t=re("Unary","operator expression",{$documentation:"Base class for unary expressions",$propdoc:{operator:"[string] the operator",expression:"[AST_Node] expression that this unary operator applies to"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e)})}}),dt=re("UnaryPrefix",null,{$documentation:"Unary prefix expression, i.e. `typeof i` or `++i`"},_t),mt=re("UnaryPostfix",null,{$documentation:"Unary postfix expression, i.e. `i++`"},_t),Et=re("Binary","operator left right",{$documentation:"Binary expression, i.e. `a + b`",$propdoc:{left:"[AST_Node] left-hand side expression",operator:"[string] the operator",right:"[AST_Node] right-hand side expression"},_walk:function(e){return e._visit(this,function(){this.left._walk(e),this.right._walk(e)})}}),ht=re("Conditional","condition consequent alternative",{$documentation:"Conditional expression using the ternary operator, i.e. `a ? b : c`",$propdoc:{condition:"[AST_Node]",consequent:"[AST_Node]",alternative:"[AST_Node]"},_walk:function(e){return e._visit(this,function(){this.condition._walk(e),this.consequent._walk(e),this.alternative._walk(e)})}}),Dt=re("Assign",null,{$documentation:"An assignment expression — `a = b + 5`"},Et),gt=re("DefaultAssign",null,{$documentation:"A default assignment expression like in `(a = 3) => a`"},Et),St=re("Array","elements",{$documentation:"An array literal",$propdoc:{elements:"[AST_Node*] array of elements"},_walk:function(e){return e._visit(this,function(){for(var t=this.elements,n=0,i=t.length;n<i;n++)t[n]._walk(e)})}}),At=re("Object","properties",{$documentation:"An object literal",$propdoc:{properties:"[AST_ObjectProperty*] array of properties"},_walk:function(e){return e._visit(this,function(){for(var t=this.properties,n=0,i=t.length;n<i;n++)t[n]._walk(e)})}}),vt=re("ObjectProperty","key value",{$documentation:"Base class for literal object properties",$propdoc:{key:"[string|AST_Node] property name. For ObjectKeyVal this is a string. For getters, setters and computed property this is an AST_Node.",value:"[AST_Node] property value.  For getters and setters this is an AST_Accessor."},_walk:function(e){return e._visit(this,function(){this.key instanceof ae&&this.key._walk(e),this.value._walk(e)})}}),Tt=re("ObjectKeyVal","quote",{$documentation:"A key: value object property",$propdoc:{quote:"[string] the original quote character"}},vt),bt=re("ObjectSetter","quote static",{$propdoc:{quote:"[string|undefined] the original quote character, if any",static:"[boolean] whether this is a static setter (classes only)"},$documentation:"An object setter property"},vt),yt=re("ObjectGetter","quote static",{$propdoc:{quote:"[string|undefined] the original quote character, if any",static:"[boolean] whether this is a static getter (classes only)"},$documentation:"An object getter property"},vt),Ct=re("ConciseMethod","quote static is_generator async",{$propdoc:{quote:"[string|undefined] the original quote character, if any",static:"[boolean] is this method static (classes only)",is_generator:"[boolean] is this a generator method",async:"[boolean] is this method async"},$documentation:"An ES6 concise method inside an object or class"},vt),Ot=re("Class","name extends properties inlined",{$propdoc:{name:"[AST_SymbolClass|AST_SymbolDefClass?] optional class name.",extends:"[AST_Node]? optional parent class",properties:"[AST_ObjectProperty*] array of properties"},$documentation:"An ES6 class",_walk:function(e){return e._visit(this,function(){this.name&&this.name._walk(e),this.extends&&this.extends._walk(e),this.properties.forEach(t=>t._walk(e))})}},Ce),Ft=re("DefClass",null,{$documentation:"A class definition"},Ot),Mt=re("ClassExpression",null,{$documentation:"A class expression."},Ot),Rt=re("Symbol","scope name thedef",{$propdoc:{name:"[string] name of this symbol",scope:"[AST_Scope/S] the current scope (not necessarily the definition scope)",thedef:"[SymbolDef/S] the definition of this symbol"},$documentation:"Base class for all symbols"}),wt=re("NewTarget",null,{$documentation:"A reference to new.target"}),Nt=re("SymbolDeclaration","init",{$documentation:"A declaration symbol (symbol in var/const, function name or argument, symbol in catch)"},Rt),xt=re("SymbolVar",null,{$documentation:"Symbol defining a variable"},Nt),kt=re("SymbolBlockDeclaration",null,{$documentation:"Base class for block-scoped declaration symbols"},Nt),It=re("SymbolConst",null,{$documentation:"A constant declaration"},kt),Lt=re("SymbolLet",null,{$documentation:"A block-scoped `let` declaration"},kt),Vt=re("SymbolFunarg",null,{$documentation:"Symbol naming a function argument"},xt),Pt=re("SymbolDefun",null,{$documentation:"Symbol defining a function"},Nt),Bt=re("SymbolMethod",null,{$documentation:"Symbol in an object defining a method"},Rt),Kt=re("SymbolLambda",null,{$documentation:"Symbol naming a function expression"},Nt),Ut=re("SymbolDefClass",null,{$documentation:"Symbol naming a class's name in a class declaration. Lexically scoped to its containing scope, and accessible within the class."},kt),Gt=re("SymbolClass",null,{$documentation:"Symbol naming a class's name. Lexically scoped to the class."},Nt),Ht=re("SymbolCatch",null,{$documentation:"Symbol naming the exception in catch"},kt),Xt=re("SymbolImport",null,{$documentation:"Symbol referring to an imported name"},kt),zt=re("SymbolImportForeign",null,{$documentation:"A symbol imported from a module, but it is defined in the other module, and its real name is irrelevant for this module's purposes"},Rt),Wt=re("Label","references",{$documentation:"Symbol naming a label (declaration)",$propdoc:{references:"[AST_LoopControl*] a list of nodes referring to this label"},initialize:function(){this.references=[],this.thedef=this}},Rt),Yt=re("SymbolRef",null,{$documentation:"Reference to some symbol (not definition/declaration)"},Rt),qt=re("SymbolExport",null,{$documentation:"Symbol referring to a name to export"},Yt),$t=re("SymbolExportForeign",null,{$documentation:"A symbol exported from this module, but it is used in the other module, and its real name is irrelevant for this module's purposes"},Rt),jt=re("LabelRef",null,{$documentation:"Reference to a label symbol"},Rt),Zt=re("This",null,{$documentation:"The `this` symbol"},Rt),Jt=re("Super",null,{$documentation:"The `super` symbol"},Zt),Qt=re("Constant",null,{$documentation:"Base class for all constants",getValue:function(){return this.value}}),en=re("String","value quote",{$documentation:"A string literal",$propdoc:{value:"[string] the contents of this string",quote:"[string] the original quote character"}},Qt),tn=re("Number","value literal",{$documentation:"A number literal",$propdoc:{value:"[number] the numeric value",literal:"[string] numeric value as string (optional)"}},Qt),nn=re("BigInt","value",{$documentation:"A big int literal",$propdoc:{value:"[string] big int value"}},Qt),rn=re("RegExp","value",{$documentation:"A regexp literal",$propdoc:{value:"[RegExp] the actual regexp"}},Qt),on=re("Atom",null,{$documentation:"Base class for atoms"},Qt),an=re("Null",null,{$documentation:"The `null` atom",value:null},on),sn=re("NaN",null,{$documentation:"The impossible value",value:NaN},on),un=re("Undefined",null,{$documentation:"The `undefined` value",value:void 0},on),cn=re("Hole",null,{$documentation:"A hole in an array",value:void 0},on),ln=re("Infinity",null,{$documentation:"The `Infinity` value",value:1/0},on),fn=re("Boolean",null,{$documentation:"Base class for booleans"},on),pn=re("False",null,{$documentation:"The `false` atom",value:!1},fn),_n=re("True",null,{$documentation:"The `true` atom",value:!0},fn),dn=re("Await","expression",{$documentation:"An `await` statement",$propdoc:{expression:"[AST_Node] the mandatory expression being awaited"},_walk:function(e){return e._visit(this,function(){this.expression._walk(e)})}}),mn=re("Yield","expression is_star",{$documentation:"A `yield` statement",$propdoc:{expression:"[AST_Node?] the value returned or thrown by this statement; could be null (representing undefined) but only when is_star is set to false",is_star:"[Boolean] Whether this is a yield or yield* statement"},_walk:function(e){return e._visit(this,this.expression&&function(){this.expression._walk(e)})}});class En{constructor(e){this.visit=e,this.stack=[],this.directives=Object.create(null)}_visit(e,t){this.push(e);var n=this.visit(e,t?function(){t.call(e)}:a);return!n&&t&&t.call(e),this.pop(),n}parent(e){return this.stack[this.stack.length-2-(e||0)]}push(e){e instanceof Me?this.directives=Object.create(this.directives):e instanceof ce&&!this.directives[e.value]?this.directives[e.value]=e:e instanceof Ot&&(this.directives=Object.create(this.directives),this.directives["use strict"]||(this.directives["use strict"]=e)),this.stack.push(e)}pop(){var e=this.stack.pop();(e instanceof Me||e instanceof Ot)&&(this.directives=Object.getPrototypeOf(this.directives))}self(){return this.stack[this.stack.length-1]}find_parent(e){for(var t=this.stack,n=t.length;--n>=0;){var i=t[n];if(i instanceof e)return i}}has_directive(e){var t=this.directives[e];if(t)return t;var n=this.stack[this.stack.length-1];if(n instanceof Ce&&n.body)for(var i=0;i<n.body.length;++i){var r=n.body[i];if(!(r instanceof ce))break;if(r.value==e)return r}}loopcontrol_target(e){var t=this.stack;if(e.label)for(var n=t.length;--n>=0;){if((i=t[n])instanceof he&&i.label.name==e.label.name)return i.body}else for(n=t.length;--n>=0;){var i;if((i=t[n])instanceof De||e instanceof He&&i instanceof We)return i}}}class hn extends En{constructor(e,t){super(),this.before=e,this.after=t}}var Dn=Object.freeze({AST_Accessor:Re,AST_Array:St,AST_Arrow:Ne,AST_Assign:Dt,AST_Atom:on,AST_Await:dn,AST_BigInt:nn,AST_Binary:Et,AST_Block:_e,AST_BlockStatement:de,AST_Boolean:fn,AST_Break:He,AST_Call:st,AST_Case:$e,AST_Catch:Ze,AST_Class:Ot,AST_ClassExpression:Mt,AST_ConciseMethod:Ct,AST_Conditional:ht,AST_Const:nt,AST_Constant:Qt,AST_Continue:Xe,AST_Debugger:ue,AST_Default:qe,AST_DefaultAssign:gt,AST_DefClass:Ft,AST_Definitions:Qe,AST_Defun:xe,AST_Destructuring:ke,AST_Directive:ce,AST_Do:Se,AST_Dot:ft,AST_DWLoop:ge,AST_EmptyStatement:me,AST_Exit:Be,AST_Expansion:Fe,AST_Export:ot,AST_False:pn,AST_Finally:Je,AST_For:ve,AST_ForIn:Te,AST_ForOf:be,AST_Function:we,AST_Hole:cn,AST_If:ze,AST_Import:rt,AST_Infinity:ln,AST_IterationStatement:De,AST_Jump:Pe,AST_Label:Wt,AST_LabeledStatement:he,AST_LabelRef:jt,AST_Lambda:Me,AST_Let:tt,AST_LoopControl:Ge,AST_NameMapping:it,AST_NaN:sn,AST_New:ut,AST_NewTarget:wt,AST_Node:ae,AST_Null:an,AST_Number:tn,AST_Object:At,AST_ObjectGetter:yt,AST_ObjectKeyVal:Tt,AST_ObjectProperty:vt,AST_ObjectSetter:bt,AST_PrefixedTemplateString:Ie,AST_PropAccess:lt,AST_RegExp:rn,AST_Return:Ke,AST_Scope:Ce,AST_Sequence:ct,AST_SimpleStatement:le,AST_Statement:se,AST_StatementWithBody:Ee,AST_String:en,AST_Sub:pt,AST_Super:Jt,AST_Switch:We,AST_SwitchBranch:Ye,AST_Symbol:Rt,AST_SymbolBlockDeclaration:kt,AST_SymbolCatch:Ht,AST_SymbolClass:Gt,AST_SymbolConst:It,AST_SymbolDeclaration:Nt,AST_SymbolDefClass:Ut,AST_SymbolDefun:Pt,AST_SymbolExport:qt,AST_SymbolExportForeign:$t,AST_SymbolFunarg:Vt,AST_SymbolImport:Xt,AST_SymbolImportForeign:zt,AST_SymbolLambda:Kt,AST_SymbolLet:Lt,AST_SymbolMethod:Bt,AST_SymbolRef:Yt,AST_SymbolVar:xt,AST_TemplateSegment:Ve,AST_TemplateString:Le,AST_This:Zt,AST_Throw:Ue,AST_Token:oe,AST_Toplevel:Oe,AST_True:_n,AST_Try:je,AST_Unary:_t,AST_UnaryPostfix:mt,AST_UnaryPrefix:dt,AST_Undefined:un,AST_Var:et,AST_VarDef:at,AST_While:Ae,AST_With:ye,AST_Yield:mn,TreeTransformer:hn,TreeWalker:En,walk_body:fe});function gn(e,t){e.DEFMETHOD("transform",function(e,n){let i=void 0;if(e.push(this),e.before&&(i=e.before(this,t,n)),void 0===i&&(t(i=this,e),e.after)){const t=e.after(i,n);void 0!==t&&(i=t)}return e.pop(),i})}function Sn(e,t){return f(e,function(e){return e.transform(t,!0)})}function An(e){let t=e.parent(-1);for(let n,i=0;n=e.parent(i);i++){if(n instanceof se&&n.body===t)return!0;if(!(n instanceof ct&&n.expressions[0]===t||"Call"===n.TYPE&&n.expression===t||n instanceof Ie&&n.prefix===t||n instanceof ft&&n.expression===t||n instanceof pt&&n.expression===t||n instanceof ht&&n.condition===t||n instanceof Et&&n.left===t||n instanceof mt&&n.expression===t))return!1;t=n}}gn(ae,a),gn(he,function(e,t){e.label=e.label.transform(t),e.body=e.body.transform(t)}),gn(le,function(e,t){e.body=e.body.transform(t)}),gn(_e,function(e,t){e.body=Sn(e.body,t)}),gn(Se,function(e,t){e.body=e.body.transform(t),e.condition=e.condition.transform(t)}),gn(Ae,function(e,t){e.condition=e.condition.transform(t),e.body=e.body.transform(t)}),gn(ve,function(e,t){e.init&&(e.init=e.init.transform(t)),e.condition&&(e.condition=e.condition.transform(t)),e.step&&(e.step=e.step.transform(t)),e.body=e.body.transform(t)}),gn(Te,function(e,t){e.init=e.init.transform(t),e.object=e.object.transform(t),e.body=e.body.transform(t)}),gn(ye,function(e,t){e.expression=e.expression.transform(t),e.body=e.body.transform(t)}),gn(Be,function(e,t){e.value&&(e.value=e.value.transform(t))}),gn(Ge,function(e,t){e.label&&(e.label=e.label.transform(t))}),gn(ze,function(e,t){e.condition=e.condition.transform(t),e.body=e.body.transform(t),e.alternative&&(e.alternative=e.alternative.transform(t))}),gn(We,function(e,t){e.expression=e.expression.transform(t),e.body=Sn(e.body,t)}),gn($e,function(e,t){e.expression=e.expression.transform(t),e.body=Sn(e.body,t)}),gn(je,function(e,t){e.body=Sn(e.body,t),e.bcatch&&(e.bcatch=e.bcatch.transform(t)),e.bfinally&&(e.bfinally=e.bfinally.transform(t))}),gn(Ze,function(e,t){e.argname&&(e.argname=e.argname.transform(t)),e.body=Sn(e.body,t)}),gn(Qe,function(e,t){e.definitions=Sn(e.definitions,t)}),gn(at,function(e,t){e.name=e.name.transform(t),e.value&&(e.value=e.value.transform(t))}),gn(ke,function(e,t){e.names=Sn(e.names,t)}),gn(Me,function(e,t){e.name&&(e.name=e.name.transform(t)),e.argnames=Sn(e.argnames,t),e.body instanceof ae?e.body=e.body.transform(t):e.body=Sn(e.body,t)}),gn(st,function(e,t){e.expression=e.expression.transform(t),e.args=Sn(e.args,t)}),gn(ct,function(e,t){e.expressions=Sn(e.expressions,t)}),gn(ft,function(e,t){e.expression=e.expression.transform(t)}),gn(pt,function(e,t){e.expression=e.expression.transform(t),e.property=e.property.transform(t)}),gn(mn,function(e,t){e.expression&&(e.expression=e.expression.transform(t))}),gn(dn,function(e,t){e.expression=e.expression.transform(t)}),gn(_t,function(e,t){e.expression=e.expression.transform(t)}),gn(Et,function(e,t){e.left=e.left.transform(t),e.right=e.right.transform(t)}),gn(ht,function(e,t){e.condition=e.condition.transform(t),e.consequent=e.consequent.transform(t),e.alternative=e.alternative.transform(t)}),gn(St,function(e,t){e.elements=Sn(e.elements,t)}),gn(At,function(e,t){e.properties=Sn(e.properties,t)}),gn(vt,function(e,t){e.key instanceof ae&&(e.key=e.key.transform(t)),e.value=e.value.transform(t)}),gn(Ot,function(e,t){e.name&&(e.name=e.name.transform(t)),e.extends&&(e.extends=e.extends.transform(t)),e.properties=Sn(e.properties,t)}),gn(Fe,function(e,t){e.expression=e.expression.transform(t)}),gn(it,function(e,t){e.foreign_name=e.foreign_name.transform(t),e.name=e.name.transform(t)}),gn(rt,function(e,t){e.imported_name&&(e.imported_name=e.imported_name.transform(t)),e.imported_names&&Sn(e.imported_names,t),e.module_name=e.module_name.transform(t)}),gn(ot,function(e,t){e.exported_definition&&(e.exported_definition=e.exported_definition.transform(t)),e.exported_value&&(e.exported_value=e.exported_value.transform(t)),e.exported_names&&Sn(e.exported_names,t),e.module_name&&(e.module_name=e.module_name.transform(t))}),gn(Le,function(e,t){e.segments=Sn(e.segments,t)}),gn(Ie,function(e,t){e.prefix=e.prefix.transform(t),e.template_string=e.template_string.transform(t)});var vn=/^$|[;{][\s\n]*$/;const Tn=10,bn=32;function yn(e){return"comment2"==e.type&&/@preserve|@license|@cc_on/i.test(e.value)}function Cn(e){var t=!e;void 0===(e=o(e,{ascii_only:!1,beautify:!1,braces:!1,comments:!1,ecma:5,ie8:!1,indent_level:4,indent_start:0,inline_script:!0,keep_quoted_props:!1,max_line_len:!1,preamble:null,quote_keys:!1,quote_style:0,safari10:!1,semicolons:!0,shebang:!0,shorthand:void 0,source_map:null,webkit:!1,width:80,wrap_iife:!1,wrap_func_args:!0},!0)).shorthand&&(e.shorthand=e.ecma>5);var n=s;if(e.comments){var i=e.comments;if("string"==typeof e.comments&&/^\/.*\/[a-zA-Z]*$/.test(e.comments)){var r=e.comments.lastIndexOf("/");i=new RegExp(e.comments.substr(1,r-1),e.comments.substr(r+1))}n=i instanceof RegExp?function(e){return"comment5"!=e.type&&i.test(e.value)}:"function"==typeof i?function(e){return"comment5"!=e.type&&i(this,e)}:"some"===i?yn:u}var c=0,l=0,f=1,p=0,_="";let d=new WeakSet;var m=e.ascii_only?function(t,n){return e.ecma>=6&&(t=t.replace(/[\ud800-\udbff][\udc00-\udfff]/g,function(e){return"\\u{"+function(e,t){return U(e.charAt(t))?65536+(e.charCodeAt(t)-55296<<10)+e.charCodeAt(t+1)-56320:e.charCodeAt(t)}(e,0).toString(16)+"}"})),t.replace(/[\u0000-\u001f\u007f-\uffff]/g,function(e){var t=e.charCodeAt(0).toString(16);if(t.length<=2&&!n){for(;t.length<2;)t="0"+t;return"\\x"+t}for(;t.length<4;)t="0"+t;return"\\u"+t})}:function(e){for(var t="",n=0,i=e.length;n<i;n++)U(e[n])&&!G(e[n+1])||G(e[n])&&!U(e[n-1])?t+="\\u"+e.charCodeAt(n).toString(16):t+=e[n];return t};function h(t,n){var i=function(t,n){var i=0,r=0;function o(){return"'"+t.replace(/\x27/g,"\\'")+"'"}function a(){return'"'+t.replace(/\x22/g,'\\"')+'"'}if(t=t.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g,function(n,o){switch(n){case'"':return++i,'"';case"'":return++r,"'";case"\\":return"\\\\";case"\n":return"\\n";case"\r":return"\\r";case"\t":return"\\t";case"\b":return"\\b";case"\f":return"\\f";case"\v":return e.ie8?"\\x0B":"\\v";case"\u2028":return"\\u2028";case"\u2029":return"\\u2029";case"\ufeff":return"\\ufeff";case"\0":return/[0-9]/.test(K(t,o+1))?"\\x00":"\\0"}return n}),t=m(t),"`"===n)return"`"+t.replace(/`/g,"\\`")+"`";switch(e.quote_style){case 1:return o();case 2:return a();case 3:return"'"==n?o():a();default:return i>r?o():a()}}(t,n);return e.inline_script&&(i=(i=(i=i.replace(/<\x2f(script)([>\/\t\n\f\r ])/gi,"<\\/$1$2")).replace(/\x3c!--/g,"\\x3c!--")).replace(/--\x3e/g,"--\\x3e")),i}var D,g,S=!1,A=!1,v=!1,T=0,b=!1,y=!1,C=-1,O="",F=e.source_map&&[],M=F?function(){F.forEach(function(t){try{e.source_map.add(t.token.file,t.line,t.col,t.token.line,t.token.col,t.name||"name"!=t.token.type?t.name:t.token.value)}catch(e){null!=t.token.file&&ae.warn("Couldn't figure out mapping for {file}:{line},{col} → {cline},{ccol} [{name}]",{file:t.token.file,line:t.token.line,col:t.token.col,cline:t.line,ccol:t.col,name:t.name||""})}}),F=[]}:a,R=e.max_line_len?function(){if(l>e.max_line_len){if(T){var t=_.slice(0,T),n=_.slice(T);if(F){var i=n.length-l;F.forEach(function(e){e.line++,e.col+=i})}_=t+"\n"+n,f++,p++,l=n.length}l>e.max_line_len&&ae.warn("Output exceeds {max_line_len} characters",e)}T&&(T=0,M())}:a,w=E("( [ + * / - , . `");function N(t){var n=K(t=String(t),0);b&&n&&(b=!1,"\n"!==n&&(N("\n"),k())),y&&n&&(y=!1,/[\s;})]/.test(n)||x()),C=-1;var i=O.charAt(O.length-1);v&&(v=!1,(":"!==i||"}"!==n)&&(n&&";}".includes(n)||";"===i)||(e.semicolons||w.has(n)?(_+=";",l++,p++):(R(),l>0&&(_+="\n",p++,f++,l=0),/^\s+$/.test(t)&&(v=!0)),e.beautify||(A=!1))),A&&((z(i)&&(z(n)||"\\"==n)||"/"==n&&n==i||("+"==n||"-"==n)&&n==O)&&(_+=" ",l++,p++),A=!1),D&&(F.push({token:D,name:g,line:f,col:l}),D=!1,T||M()),_+=t,S="("==t[t.length-1],p+=t.length;var r=t.split(/\r?\n/),o=r.length-1;f+=o,l+=r[0].length,o>0&&(R(),l=r[o].length),O=t}var x=e.beautify?function(){N(" ")}:function(){A=!0},k=e.beautify?function(t){var n;e.beautify&&N((n=t?.5:0," ".repeat(e.indent_start+c-n*e.indent_level)))}:a,I=e.beautify?function(e,t){!0===e&&(e=B());var n=c;c=e;var i=t();return c=n,i}:function(e,t){return t()},L=e.beautify?function(){if(C<0)return N("\n");"\n"!=_[C]&&(_=_.slice(0,C)+"\n"+_.slice(C),p++,f++),C++}:e.max_line_len?function(){R(),T=_.length}:a,V=e.beautify?function(){N(";")}:function(){v=!0};function P(){v=!1,N(";")}function B(){return c+e.indent_level}function H(){return T&&R(),_}function X(){let e=_.length-1;for(;e>=0;){const t=_.charCodeAt(e);if(t===Tn)return!0;if(t!==bn)return!1;e--}return!0}var W=[];return{get:H,toString:H,indent:k,indentation:function(){return c},current_width:function(){return l-c},should_break:function(){return e.width&&this.current_width()>=e.width},has_parens:function(){return S},newline:L,print:N,star:function(){N("*")},space:x,comma:function(){N(","),x()},colon:function(){N(":"),x()},last:function(){return O},semicolon:V,force_semicolon:P,to_utf8:m,print_name:function(e){N(function(e){return e=e.toString(),e=m(e,!0)}(e))},print_string:function(e,t,n){var i=h(e,t);!0!==n||i.includes("\\")||(vn.test(_)||P(),P()),N(i)},print_template_string_chars:function(e){var t=h(e,"`").replace(/\${/g,"\\${");return N(t.substr(1,t.length-2))},encode_string:h,next_indent:B,with_indent:I,with_block:function(e){var t;return N("{"),L(),I(B(),function(){t=e()}),k(),N("}"),t},with_parens:function(e){N("(");var t=e();return N(")"),t},with_square:function(e){N("[");var t=e();return N("]"),t},add_mapping:F?function(e,t){D=e,g=t}:a,option:function(t){return e[t]},printed_comments:()=>d,prepend_comments:t?a:function(t){var i=t.start;if(i){var r=this.printed_comments();if(!i.comments_before||!r.has(i.comments_before)){var o=i.comments_before;if(o||(o=i.comments_before=[]),r.add(o),t instanceof Be&&t.value){var a=new En(function(e){var t=a.parent();if(!(t instanceof Be||t instanceof Et&&t.left===e||"Call"==t.TYPE&&t.expression===e||t instanceof ht&&t.condition===e||t instanceof ft&&t.expression===e||t instanceof ct&&t.expressions[0]===e||t instanceof pt&&t.expression===e||t instanceof mt))return!0;if(e.start){var n=e.start.comments_before;n&&!r.has(n)&&(r.add(n),o=o.concat(n))}});a.push(t),t.value.walk(a)}if(0==p){o.length>0&&e.shebang&&"comment5"===o[0].type&&!r.has(o[0])&&(N("#!"+o.shift().value+"\n"),k());var s=e.preamble;s&&N(s.replace(/\r\n?|[\n\u2028\u2029]|\s*$/g,"\n"))}if(0!=(o=o.filter(n,t).filter(e=>!r.has(e))).length){var u=X();o.forEach(function(e,t){r.add(e),u||(e.nlb?(N("\n"),k(),u=!0):t>0&&x()),/comment[134]/.test(e.type)?(N("//"+e.value.replace(/[@#]__PURE__/g," ")+"\n"),k(),u=!0):"comment2"==e.type&&(N("/*"+e.value.replace(/[@#]__PURE__/g," ")+"*/"),u=!1)}),u||(i.nlb?(N("\n"),k()):x())}}}},append_comments:t||n===s?a:function(e,t){var i=e.end;if(i){var r=this.printed_comments(),o=i[t?"comments_before":"comments_after"];if(o&&!r.has(o)&&(e instanceof se||o.every(e=>!/comment[134]/.test(e.type)))){r.add(o);var a=_.length;o.filter(n,e).forEach(function(e,n){r.has(e)||(r.add(e),y=!1,b?(N("\n"),k(),b=!1):e.nlb&&(n>0||!X())?(N("\n"),k()):(n>0||!t)&&x(),/comment[134]/.test(e.type)?(N("//"+e.value.replace(/[@#]__PURE__/g," ")),b=!0):"comment2"==e.type&&(N("/*"+e.value.replace(/[@#]__PURE__/g," ")+"*/"),y=!0))}),_.length>a&&(C=a)}}},line:function(){return f},col:function(){return l},pos:function(){return p},push_node:function(e){W.push(e)},pop_node:function(){return W.pop()},parent:function(e){return W[W.length-2-(e||0)]}}}!function(){function e(e,t){e.DEFMETHOD("_codegen",t)}var t=!1,n=null,i=null;function r(e,t){Array.isArray(e)?e.forEach(function(e){r(e,t)}):e.DEFMETHOD("needs_parens",t)}function o(e,n,i,r){var o=e.length-1;t=r,e.forEach(function(e,r){!0!==t||e instanceof ce||e instanceof me||e instanceof le&&e.body instanceof en||(t=!1),e instanceof me||(i.indent(),e.print(i),r==o&&n||(i.newline(),n&&i.newline())),!0===t&&e instanceof le&&e.body instanceof en&&(t=!1)}),t=!1}function u(e,t){t.print("{"),t.with_indent(t.next_indent(),function(){t.append_comments(e,!0)}),t.print("}")}function c(e,t,n){e.body.length>0?t.with_block(function(){o(e.body,!1,t,n)}):u(e,t)}function l(e,t,n){var i=!1;n&&e.walk(new En(function(e){return!!(i||e instanceof Ce)||(e instanceof Et&&"in"==e.operator?(i=!0,!0):void 0)})),e.print(t,i)}function f(e,t,n){n.option("quote_keys")?n.print_string(e):""+ +e==e&&e>=0?n.print(_(e)):(T.has(e)?!n.option("ie8"):W(e))?t&&n.option("keep_quoted_props")?n.print_string(e,t):n.print_name(e):n.print_string(e,t)}function p(e,t){t.option("braces")?d(e,t):!e||e instanceof me?t.force_semicolon():e.print(t)}function _(e){var t,n,i,r=e.toString(10).replace(/^0\./,".").replace("e+","e"),o=[r];return Math.floor(e)===e&&(e<0?o.push("-0x"+(-e).toString(16).toLowerCase()):o.push("0x"+e.toString(16).toLowerCase())),(t=/^\.0+/.exec(r))?(n=t[0].length,i=r.slice(n),o.push(i+"e-"+(i.length+n-1))):(t=/0+$/.exec(r))?(n=t[0].length,o.push(r.slice(0,-n)+"e"+n)):(t=/^(\d)\.(\d+)e(-?\d+)$/.exec(r))&&o.push(t[1]+t[2]+"e"+(t[3]-t[2].length)),function(e){for(var t=e[0],n=t.length,i=1;i<e.length;++i)e[i].length<n&&(n=(t=e[i]).length);return t}(o)}function d(e,t){!e||e instanceof me?t.print("{}"):e instanceof de?e.print(t):t.with_block(function(){t.indent(),e.print(t),t.newline()})}function m(e,t){e.forEach(function(e){e.DEFMETHOD("add_source_map",t)})}ae.DEFMETHOD("print",function(e,t){var r=this,o=r._codegen;function a(){e.prepend_comments(r),r.add_source_map(e),o(r,e),e.append_comments(r)}r instanceof Ce?n=r:!i&&r instanceof ce&&"use asm"==r.value&&(i=n),e.push_node(r),t||r.needs_parens(e)?e.with_parens(a):a(),e.pop_node(),r===i&&(i=null)}),ae.DEFMETHOD("_print",ae.prototype.print),ae.DEFMETHOD("print_to_string",function(e){var t=Cn(e);return this.print(t),t.get()}),r(ae,s),r(we,function(e){if(!e.has_parens()&&An(e))return!0;var t;if(e.option("webkit")&&((t=e.parent())instanceof lt&&t.expression===this))return!0;if(e.option("wrap_iife")&&((t=e.parent())instanceof st&&t.expression===this))return!0;if(e.option("wrap_func_args")&&((t=e.parent())instanceof st&&t.args.includes(this)))return!0;return!1}),r(Ne,function(e){var t=e.parent();return t instanceof lt&&t.expression===this}),r(At,function(e){return!e.has_parens()&&An(e)}),r(Mt,An),r(_t,function(e){var t=e.parent();return t instanceof lt&&t.expression===this||t instanceof st&&t.expression===this||t instanceof Et&&"**"===t.operator&&this instanceof dt&&t.left===this&&"++"!==this.operator&&"--"!==this.operator}),r(dn,function(e){var t=e.parent();return t instanceof lt&&t.expression===this||t instanceof st&&t.expression===this||e.option("safari10")&&t instanceof dt}),r(ct,function(e){var t=e.parent();return t instanceof st||t instanceof _t||t instanceof Et||t instanceof at||t instanceof lt||t instanceof St||t instanceof vt||t instanceof ht||t instanceof Ne||t instanceof gt||t instanceof Fe||t instanceof be&&this===t.object||t instanceof mn||t instanceof ot}),r(Et,function(e){var t=e.parent();if(t instanceof st&&t.expression===this)return!0;if(t instanceof _t)return!0;if(t instanceof lt&&t.expression===this)return!0;if(t instanceof Et){var n=t.operator,i=te[n],r=this.operator,o=te[r];if(i>o||i==o&&(this===t.right||"**"==n))return!0}}),r(mn,function(e){var t=e.parent();return t instanceof Et&&"="!==t.operator||(t instanceof st&&t.expression===this||(t instanceof ht&&t.condition===this||(t instanceof _t||(t instanceof lt&&t.expression===this||void 0))))}),r(lt,function(e){var t=e.parent();if(t instanceof ut&&t.expression===this){var n=!1;return this.walk(new En(function(e){return!!(n||e instanceof Ce)||(e instanceof st?(n=!0,!0):void 0)})),n}}),r(st,function(e){var t,n=e.parent();return!!(n instanceof ut&&n.expression===this||n instanceof ot&&n.is_default&&this.expression instanceof we)||this.expression instanceof we&&n instanceof lt&&n.expression===this&&(t=e.parent(1))instanceof Dt&&t.left===n}),r(ut,function(e){var t=e.parent();if(0===this.args.length&&(t instanceof lt||t instanceof st&&t.expression===this))return!0}),r(tn,function(e){var t=e.parent();if(t instanceof lt&&t.expression===this){var n=this.getValue();if(n<0||/^0/.test(_(n)))return!0}}),r(nn,function(e){var t=e.parent();if(t instanceof lt&&t.expression===this&&this.getValue().startsWith("-"))return!0}),r([Dt,ht],function(e){var t=e.parent();return t instanceof _t||(t instanceof Et&&!(t instanceof Dt)||(t instanceof st&&t.expression===this||(t instanceof ht&&t.condition===this||(t instanceof lt&&t.expression===this||(this instanceof Dt&&this.left instanceof ke&&!1===this.left.is_array||void 0)))))}),e(ce,function(e,t){t.print_string(e.value,e.quote),t.semicolon()}),e(Fe,function(e,t){t.print("..."),e.expression.print(t)}),e(ke,function(e,t){t.print(e.is_array?"[":"{");var n=e.names.length;e.names.forEach(function(e,i){i>0&&t.comma(),e.print(t),i==n-1&&e instanceof cn&&t.comma()}),t.print(e.is_array?"]":"}")}),e(ue,function(e,t){t.print("debugger"),t.semicolon()}),Ee.DEFMETHOD("_do_print_body",function(e){p(this.body,e)}),e(se,function(e,t){e.body.print(t),t.semicolon()}),e(Oe,function(e,t){o(e.body,!0,t,!0),t.print("")}),e(he,function(e,t){e.label.print(t),t.colon(),e.body.print(t)}),e(le,function(e,t){e.body.print(t),t.semicolon()}),e(de,function(e,t){c(e,t)}),e(me,function(e,t){t.semicolon()}),e(Se,function(e,t){t.print("do"),t.space(),d(e.body,t),t.space(),t.print("while"),t.space(),t.with_parens(function(){e.condition.print(t)}),t.semicolon()}),e(Ae,function(e,t){t.print("while"),t.space(),t.with_parens(function(){e.condition.print(t)}),t.space(),e._do_print_body(t)}),e(ve,function(e,t){t.print("for"),t.space(),t.with_parens(function(){e.init?(e.init instanceof Qe?e.init.print(t):l(e.init,t,!0),t.print(";"),t.space()):t.print(";"),e.condition?(e.condition.print(t),t.print(";"),t.space()):t.print(";"),e.step&&e.step.print(t)}),t.space(),e._do_print_body(t)}),e(Te,function(e,t){t.print("for"),e.await&&(t.space(),t.print("await")),t.space(),t.with_parens(function(){e.init.print(t),t.space(),t.print(e instanceof be?"of":"in"),t.space(),e.object.print(t)}),t.space(),e._do_print_body(t)}),e(ye,function(e,t){t.print("with"),t.space(),t.with_parens(function(){e.expression.print(t)}),t.space(),e._do_print_body(t)}),Me.DEFMETHOD("_do_print",function(e,t){var n=this;t||(n.async&&(e.print("async"),e.space()),e.print("function"),n.is_generator&&e.star(),n.name&&e.space()),n.name instanceof Rt?n.name.print(e):t&&n.name instanceof ae&&e.with_square(function(){n.name.print(e)}),e.with_parens(function(){n.argnames.forEach(function(t,n){n&&e.comma(),t.print(e)})}),e.space(),c(n,e,!0)}),e(Me,function(e,t){e._do_print(t)}),e(Ie,function(e,t){var n=e.prefix,i=n instanceof Me||n instanceof Et||n instanceof ht||n instanceof ct||n instanceof _t||n instanceof ft&&n.expression instanceof At;i&&t.print("("),e.prefix.print(t),i&&t.print(")"),e.template_string.print(t)}),e(Le,function(e,t){var n=t.parent()instanceof Ie;t.print("`");for(var i=0;i<e.segments.length;i++)e.segments[i]instanceof Ve?n?t.print(e.segments[i].raw):t.print_template_string_chars(e.segments[i].value):(t.print("${"),e.segments[i].print(t),t.print("}"));t.print("`")}),Ne.DEFMETHOD("_do_print",function(e){var t=this,n=e.parent(),i=n instanceof Et&&!(n instanceof Dt)||n instanceof _t||n instanceof st&&t===n.expression;i&&e.print("("),t.async&&(e.print("async"),e.space()),1===t.argnames.length&&t.argnames[0]instanceof Rt?t.argnames[0].print(e):e.with_parens(function(){t.argnames.forEach(function(t,n){n&&e.comma(),t.print(e)})}),e.space(),e.print("=>"),e.space(),t.body instanceof ae?t.body.print(e):c(t,e),i&&e.print(")")}),Be.DEFMETHOD("_do_print",function(e,t){e.print(t),this.value&&(e.space(),this.value.print(e)),e.semicolon()}),e(Ke,function(e,t){e._do_print(t,"return")}),e(Ue,function(e,t){e._do_print(t,"throw")}),e(mn,function(e,t){var n=e.is_star?"*":"";t.print("yield"+n),e.expression&&(t.space(),e.expression.print(t))}),e(dn,function(e,t){t.print("await"),t.space();var n=e.expression,i=!(n instanceof st||n instanceof Yt||n instanceof lt||n instanceof _t||n instanceof Qt);i&&t.print("("),e.expression.print(t),i&&t.print(")")}),Ge.DEFMETHOD("_do_print",function(e,t){e.print(t),this.label&&(e.space(),this.label.print(e)),e.semicolon()}),e(He,function(e,t){e._do_print(t,"break")}),e(Xe,function(e,t){e._do_print(t,"continue")}),e(ze,function(e,t){t.print("if"),t.space(),t.with_parens(function(){e.condition.print(t)}),t.space(),e.alternative?(!function(e,t){var n=e.body;if(t.option("braces")||t.option("ie8")&&n instanceof Se)return d(n,t);if(!n)return t.force_semicolon();for(;;)if(n instanceof ze){if(!n.alternative)return void d(e.body,t);n=n.alternative}else{if(!(n instanceof Ee))break;n=n.body}p(e.body,t)}(e,t),t.space(),t.print("else"),t.space(),e.alternative instanceof ze?e.alternative.print(t):p(e.alternative,t)):e._do_print_body(t)}),e(We,function(e,t){t.print("switch"),t.space(),t.with_parens(function(){e.expression.print(t)}),t.space();var n=e.body.length-1;n<0?u(e,t):t.with_block(function(){e.body.forEach(function(e,i){t.indent(!0),e.print(t),i<n&&e.body.length>0&&t.newline()})})}),Ye.DEFMETHOD("_do_print_body",function(e){e.newline(),this.body.forEach(function(t){e.indent(),t.print(e),e.newline()})}),e(qe,function(e,t){t.print("default:"),e._do_print_body(t)}),e($e,function(e,t){t.print("case"),t.space(),e.expression.print(t),t.print(":"),e._do_print_body(t)}),e(je,function(e,t){t.print("try"),t.space(),c(e,t),e.bcatch&&(t.space(),e.bcatch.print(t)),e.bfinally&&(t.space(),e.bfinally.print(t))}),e(Ze,function(e,t){t.print("catch"),e.argname&&(t.space(),t.with_parens(function(){e.argname.print(t)})),t.space(),c(e,t)}),e(Je,function(e,t){t.print("finally"),t.space(),c(e,t)}),Qe.DEFMETHOD("_do_print",function(e,t){e.print(t),e.space(),this.definitions.forEach(function(t,n){n&&e.comma(),t.print(e)});var n=e.parent();(!(n instanceof ve||n instanceof Te)||n&&n.init!==this)&&e.semicolon()}),e(tt,function(e,t){e._do_print(t,"let")}),e(et,function(e,t){e._do_print(t,"var")}),e(nt,function(e,t){e._do_print(t,"const")}),e(rt,function(e,t){t.print("import"),t.space(),e.imported_name&&e.imported_name.print(t),e.imported_name&&e.imported_names&&(t.print(","),t.space()),e.imported_names&&(1===e.imported_names.length&&"*"===e.imported_names[0].foreign_name.name?e.imported_names[0].print(t):(t.print("{"),e.imported_names.forEach(function(n,i){t.space(),n.print(t),i<e.imported_names.length-1&&t.print(",")}),t.space(),t.print("}"))),(e.imported_name||e.imported_names)&&(t.space(),t.print("from"),t.space()),e.module_name.print(t),t.semicolon()}),e(it,function(e,t){var n=t.parent()instanceof rt,i=e.name.definition();(i&&i.mangled_name||e.name.name)!==e.foreign_name.name?(n?t.print(e.foreign_name.name):e.name.print(t),t.space(),t.print("as"),t.space(),n?e.name.print(t):t.print(e.foreign_name.name)):e.name.print(t)}),e(ot,function(e,t){if(t.print("export"),t.space(),e.is_default&&(t.print("default"),t.space()),e.exported_names)1===e.exported_names.length&&"*"===e.exported_names[0].name.name?e.exported_names[0].print(t):(t.print("{"),e.exported_names.forEach(function(n,i){t.space(),n.print(t),i<e.exported_names.length-1&&t.print(",")}),t.space(),t.print("}"));else if(e.exported_value)e.exported_value.print(t);else if(e.exported_definition&&(e.exported_definition.print(t),e.exported_definition instanceof Qe))return;e.module_name&&(t.space(),t.print("from"),t.space(),e.module_name.print(t)),(e.exported_value&&!(e.exported_value instanceof xe||e.exported_value instanceof we||e.exported_value instanceof Ot)||e.module_name||e.exported_names)&&t.semicolon()}),e(at,function(e,t){if(e.name.print(t),e.value){t.space(),t.print("="),t.space();var n=t.parent(1),i=n instanceof ve||n instanceof Te;l(e.value,t,i)}}),e(st,function(e,t){e.expression.print(t),e instanceof ut&&0===e.args.length||((e.expression instanceof st||e.expression instanceof Me)&&t.add_mapping(e.start),t.with_parens(function(){e.args.forEach(function(e,n){n&&t.comma(),e.print(t)})}))}),e(ut,function(e,t){t.print("new"),t.space(),st.prototype._codegen(e,t)}),ct.DEFMETHOD("_do_print",function(e){this.expressions.forEach(function(t,n){n>0&&(e.comma(),e.should_break()&&(e.newline(),e.indent())),t.print(e)})}),e(ct,function(e,t){e._do_print(t)}),e(ft,function(e,t){var n=e.expression;n.print(t);var i=e.property;t.option("ie8")&&T.has(i)?(t.print("["),t.add_mapping(e.end),t.print_string(i),t.print("]")):(n instanceof tn&&n.getValue()>=0&&(/[xa-f.)]/i.test(t.last())||t.print(".")),t.print("."),t.add_mapping(e.end),t.print_name(i))}),e(pt,function(e,t){e.expression.print(t),t.print("["),e.property.print(t),t.print("]")}),e(dt,function(e,t){var n=e.operator;t.print(n),(/^[a-z]/i.test(n)||/[+-]$/.test(n)&&e.expression instanceof dt&&/^[+-]/.test(e.expression.operator))&&t.space(),e.expression.print(t)}),e(mt,function(e,t){e.expression.print(t),t.print(e.operator)}),e(Et,function(e,t){var n=e.operator;e.left.print(t),">"==n[0]&&e.left instanceof mt&&"--"==e.left.operator?t.print(" "):t.space(),t.print(n),("<"==n||"<<"==n)&&e.right instanceof dt&&"!"==e.right.operator&&e.right.expression instanceof dt&&"--"==e.right.expression.operator?t.print(" "):t.space(),e.right.print(t)}),e(ht,function(e,t){e.condition.print(t),t.space(),t.print("?"),t.space(),e.consequent.print(t),t.space(),t.colon(),e.alternative.print(t)}),e(St,function(e,t){t.with_square(function(){var n=e.elements,i=n.length;i>0&&t.space(),n.forEach(function(e,n){n&&t.comma(),e.print(t),n===i-1&&e instanceof cn&&t.comma()}),i>0&&t.space()})}),e(At,function(e,t){e.properties.length>0?t.with_block(function(){e.properties.forEach(function(e,n){n&&(t.print(","),t.newline()),t.indent(),e.print(t)}),t.newline()}):u(e,t)}),e(Ot,function(e,t){if(t.print("class"),t.space(),e.name&&(e.name.print(t),t.space()),e.extends){var n=!(e.extends instanceof Yt||e.extends instanceof lt||e.extends instanceof Mt||e.extends instanceof we);t.print("extends"),n?t.print("("):t.space(),e.extends.print(t),n?t.print(")"):t.space()}e.properties.length>0?t.with_block(function(){e.properties.forEach(function(e,n){n&&t.newline(),t.indent(),e.print(t)}),t.newline()}):t.print("{}")}),e(wt,function(e,t){t.print("new.target")}),e(Tt,function(e,t){function n(e){var t=e.definition();return t?t.mangled_name||t.name:e.name}var i=t.option("shorthand");i&&e.value instanceof Rt&&W(e.key)&&n(e.value)===e.key&&!T.has(e.key)?f(e.key,e.quote,t):i&&e.value instanceof gt&&e.value.left instanceof Rt&&W(e.key)&&n(e.value.left)===e.key?(f(e.key,e.quote,t),t.space(),t.print("="),t.space(),e.value.right.print(t)):(e.key instanceof ae?t.with_square(function(){e.key.print(t)}):f(e.key,e.quote,t),t.colon(),e.value.print(t))}),vt.DEFMETHOD("_print_getter_setter",function(e,t){var n=this;n.static&&(t.print("static"),t.space()),e&&(t.print(e),t.space()),n.key instanceof Bt?f(n.key.name,n.quote,t):t.with_square(function(){n.key.print(t)}),n.value._do_print(t,!0)}),e(bt,function(e,t){e._print_getter_setter("set",t)}),e(yt,function(e,t){e._print_getter_setter("get",t)}),e(Ct,function(e,t){var n;e.is_generator&&e.async?n="async*":e.is_generator?n="*":e.async&&(n="async"),e._print_getter_setter(n,t)}),Rt.DEFMETHOD("_do_print",function(e){var t=this.definition();e.print_name(t?t.mangled_name||t.name:this.name)}),e(Rt,function(e,t){e._do_print(t)}),e(cn,a),e(Zt,function(e,t){t.print("this")}),e(Jt,function(e,t){t.print("super")}),e(Qt,function(e,t){t.print(e.getValue())}),e(en,function(e,n){n.print_string(e.getValue(),e.quote,t)}),e(tn,function(e,t){i&&e.start&&null!=e.start.raw?t.print(e.start.raw):t.print(_(e.getValue()))}),e(nn,function(e,t){t.print(e.getValue()+"n")}),e(rn,function(e,t){var n,i=e.getValue(),r=(n=i.toString()).replace(/[\n\r\u2028\u2029]/g,function(e,t){return("\\"!=n[t-1]||"\\"==n[t-2]&&!/(?:^|[^\\])(?:\\{2})*$/.test(n.slice(0,t-1))?"\\":"")+S[e]});r=t.to_utf8(r),t.print(r);var o=t.parent();o instanceof Et&&/^in/.test(o.operator)&&o.left===e&&t.print(" ")}),m([ae,he,Oe],a),m([St,de,Ze,Ot,Qt,ue,Qe,ce,Je,Pe,Me,ut,At,Ee,Rt,We,Ye,je],function(e){e.add_mapping(this.start)}),m([yt,bt],function(e){e.add_mapping(this.start,this.key.name)}),m([vt],function(e){e.add_mapping(this.start,this.key)})}();const On=1,Fn=2;function Mn(e,t,n){this.name=t.name,this.orig=[t],this.init=n,this.eliminated=0,this.assignments=0,this.scope=e,this.references=[],this.replaced=0,this.global=!1,this.export=0,this.mangled_name=null,this.undeclared=!1,this.id=Mn.next_id++,this.chained=!1,this.direct_access=!1,this.escaped=0,this.recursive_refs=0,this.references=[],this.should_replace=void 0,this.single_use=!1,this.fixed=!1,Object.seal(this)}function Rn(e){if(e.orig[0]instanceof Ht&&e.scope.is_block_scope())return e.scope.get_defun_scope().variables.get(e.name)}function wn(e,t){var n=e.enclosed;e:for(;;){var r=Nn(++e.cname);if(!T.has(r)&&!i(r,t.reserved)){for(var o=n.length;--o>=0;){var a=n[o];if(r==(a.mangled_name||a.unmangleable(t)&&a.name))continue e}return r}}}Mn.next_id=1,Mn.prototype={unmangleable:function(e){return e||(e={}),this.global&&!e.toplevel||this.export&On||this.undeclared||!e.eval&&this.scope.pinned()||(this.orig[0]instanceof Kt||this.orig[0]instanceof Pt)&&g(e.keep_fnames,this.orig[0].name)||this.orig[0]instanceof Bt||(this.orig[0]instanceof Gt||this.orig[0]instanceof Ut)&&g(e.keep_classnames,this.orig[0].name)},mangle:function(e){var t=e.cache&&e.cache.props;if(this.global&&t&&t.has(this.name))this.mangled_name=t.get(this.name);else if(!this.mangled_name&&!this.unmangleable(e)){var n=this.scope,i=this.orig[0];e.ie8&&i instanceof Kt&&(n=n.parent_scope);const r=Rn(this);this.mangled_name=r?r.mangled_name||r.name:n.next_mangled(e,this),this.global&&t&&t.set(this.name,this.mangled_name)}}},Oe.DEFMETHOD("figure_out_scope",function(e){e=o(e,{cache:null,ie8:!1,safari10:!1});var t=this,n=t.parent_scope=null,i=new Map,r=null,a=null,s=[],u=new En(function(t,o){if(t.is_block_scope()){const i=n;t.block_scope=n=new Ce(t);const r=t instanceof Ze?i.parent_scope:i;if(n.init_scope_vars(r),n.uses_with=i.uses_with,n.uses_eval=i.uses_eval,e.safari10&&(t instanceof ve||t instanceof Te)&&s.push(n),t instanceof We){const e=n;n=i,t.expression.walk(u),n=e;for(let e=0;e<t.body.length;e++)t.body[e].walk(u)}else o();return n=i,!0}if(t instanceof ke){const e=a;return a=t,o(),a=e,!0}if(t instanceof Ce){t.init_scope_vars(n);var c=n,l=r,f=i;return r=n=t,i=new Map,o(),n=c,r=l,i=f,!0}if(t instanceof he){var p=t.label;if(i.has(p.name))throw new Error(_("Label {name} defined twice",p));return i.set(p.name,p),o(),i.delete(p.name),!0}if(t instanceof ye)for(var d=n;d;d=d.parent_scope)d.uses_with=!0;else{if(t instanceof Rt&&(t.scope=n),t instanceof Wt&&(t.thedef=t,t.references=[]),t instanceof Kt)r.def_function(t,"arguments"==t.name?void 0:r);else if(t instanceof Pt)h((t.scope=r.parent_scope.get_defun_scope()).def_function(t,r),1);else if(t instanceof Gt)h(r.def_variable(t,r),1);else if(t instanceof Xt)n.def_variable(t);else if(t instanceof Ut)h((t.scope=r.parent_scope).def_function(t,r),1);else if(t instanceof xt||t instanceof Lt||t instanceof It||t instanceof Ht){if((m=t instanceof kt?n.def_variable(t,null):r.def_variable(t,"SymbolVar"==t.TYPE?null:void 0)).orig.every(e=>e===t||(t instanceof kt?e instanceof Kt:!(e instanceof Lt||e instanceof It)))||q(t.name+" redeclared",t.start.file,t.start.line,t.start.col,t.start.pos),t instanceof Vt||h(m,2),r!==n){t.mark_enclosed(e);var m=n.find_variable(t);t.thedef!==m&&(t.thedef=m,t.reference(e))}}else if(t instanceof jt){var E=i.get(t.name);if(!E)throw new Error(_("Undefined label {name} [{line},{col}]",{name:t.name,line:t.start.line,col:t.start.col}));t.thedef=E}n instanceof Oe||!(t instanceof ot||t instanceof rt)||q(t.TYPE+" statement may only appear at top level",t.start.file,t.start.line,t.start.col,t.start.pos)}function h(e,t){if(a){var n=0;do{t++}while(u.parent(n++)!==a)}var i=u.parent(t);if(e.export=i instanceof ot?On:0){var r=i.exported_definition;(r instanceof xe||r instanceof Ft)&&i.is_default&&(e.export=Fn)}}});t.walk(u),t.globals=new Map;u=new En(function(n,i){if(n instanceof Ge&&n.label)return n.label.thedef.references.push(n),!0;if(n instanceof Yt){var r,o=n.name;if("eval"==o&&u.parent()instanceof st)for(var a=n.scope;a&&!a.uses_eval;a=a.parent_scope)a.uses_eval=!0;return u.parent()instanceof it&&u.parent(1).module_name||!(r=n.scope.find_variable(o))?(r=t.def_global(n),n instanceof qt&&(r.export=On)):r.scope instanceof Me&&"arguments"==o&&(r.scope.uses_arguments=!0),n.thedef=r,n.reference(e),!n.scope.is_block_scope()||r.orig[0]instanceof kt||(n.scope=n.scope.get_defun_scope()),!0}var s;if(n instanceof Ht&&(s=Rn(n.definition())))for(a=n.scope;a&&(p(a.enclosed,s),a!==s.scope);)a=a.parent_scope});if(t.walk(u),(e.ie8||e.safari10)&&t.walk(new En(function(n,i){if(n instanceof Ht){var r=n.name,o=n.thedef.references,a=n.scope.get_defun_scope(),s=a.find_variable(r)||t.globals.get(r)||a.def_variable(n);return o.forEach(function(t){t.thedef=s,t.reference(e)}),n.thedef=s,n.reference(e),!0}})),e.safari10)for(const e of s)e.parent_scope.variables.forEach(function(t){p(e.enclosed,t)})}),Oe.DEFMETHOD("def_global",function(e){var t=this.globals,n=e.name;if(t.has(n))return t.get(n);var i=new Mn(this,e);return i.undeclared=!0,i.global=!0,t.set(n,i),i}),Ce.DEFMETHOD("init_scope_vars",function(e){this.variables=new Map,this.functions=new Map,this.uses_with=!1,this.uses_eval=!1,this.parent_scope=e,this.enclosed=[],this.cname=-1}),ae.DEFMETHOD("is_block_scope",s),Ot.DEFMETHOD("is_block_scope",s),Me.DEFMETHOD("is_block_scope",s),Oe.DEFMETHOD("is_block_scope",s),Ye.DEFMETHOD("is_block_scope",s),_e.DEFMETHOD("is_block_scope",u),De.DEFMETHOD("is_block_scope",u),Me.DEFMETHOD("init_scope_vars",function(){Ce.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1,this.def_variable(new Vt({name:"arguments",start:this.start,end:this.end}))}),Ne.DEFMETHOD("init_scope_vars",function(){Ce.prototype.init_scope_vars.apply(this,arguments),this.uses_arguments=!1}),Rt.DEFMETHOD("mark_enclosed",function(e){for(var t=this.definition(),n=this.scope;n&&(p(n.enclosed,t),e.keep_fnames&&n.functions.forEach(function(n){g(e.keep_fnames,n.name)&&p(t.scope.enclosed,n)}),n!==t.scope);)n=n.parent_scope}),Rt.DEFMETHOD("reference",function(e){this.definition().references.push(this),this.mark_enclosed(e)}),Ce.DEFMETHOD("find_variable",function(e){return e instanceof Rt&&(e=e.name),this.variables.get(e)||this.parent_scope&&this.parent_scope.find_variable(e)}),Ce.DEFMETHOD("def_function",function(e,t){var n=this.def_variable(e,t);return(!n.init||n.init instanceof xe)&&(n.init=t),this.functions.set(e.name,n),n}),Ce.DEFMETHOD("def_variable",function(e,t){var n=this.variables.get(e.name);return n?(n.orig.push(e),n.init&&(n.scope!==e.scope||n.init instanceof we)&&(n.init=t)):(n=new Mn(this,e,t),this.variables.set(e.name,n),n.global=!this.parent_scope),e.thedef=n}),Ce.DEFMETHOD("next_mangled",function(e){return wn(this,e)}),Oe.DEFMETHOD("next_mangled",function(e){let t;const n=this.mangled_names;do{t=wn(this,e)}while(n.has(t));return t}),we.DEFMETHOD("next_mangled",function(e,t){for(var n=t.orig[0]instanceof Vt&&this.name&&this.name.definition(),i=n?n.mangled_name||n.name:null;;){var r=wn(this,e);if(!i||i!=r)return r}}),Rt.DEFMETHOD("unmangleable",function(e){var t=this.definition();return!t||t.unmangleable(e)}),Wt.DEFMETHOD("unmangleable",s),Rt.DEFMETHOD("unreferenced",function(){return!this.definition().references.length&&!this.scope.pinned()}),Rt.DEFMETHOD("definition",function(){return this.thedef}),Rt.DEFMETHOD("global",function(){return this.definition().global}),Oe.DEFMETHOD("_default_mangler_options",function(e){return(e=o(e,{eval:!1,ie8:!1,keep_classnames:!1,keep_fnames:!1,module:!1,reserved:[],toplevel:!1})).module&&(e.toplevel=!0),Array.isArray(e.reserved)||(e.reserved=[]),p(e.reserved,"arguments"),e}),Oe.DEFMETHOD("mangle_names",function(e){e=this._default_mangler_options(e);var t=-1,n=[];const r=this.mangled_names=new Set;e.cache&&(this.globals.forEach(a),e.cache.props&&e.cache.props.forEach(function(e){r.add(e)}));var o=new En(function(i,r){if(i instanceof he){var o=t;return r(),t=o,!0}if(i instanceof Ce)i.variables.forEach(a);else if(i.is_block_scope())i.block_scope.variables.forEach(a);else{if(i instanceof Wt){var s;do{s=Nn(++t)}while(T.has(s));return i.mangled_name=s,!0}!e.ie8&&!e.safari10&&i instanceof Ht&&n.push(i.definition())}});function a(t){i(t.name,e.reserved)||t.export&On||n.push(t)}this.walk(o),n.forEach(function(t){t.mangle(e)})}),Oe.DEFMETHOD("find_colliding_names",function(e){var t=e.cache&&e.cache.props,n=new Set;return e.reserved.forEach(i),this.globals.forEach(r),this.walk(new En(function(e){e instanceof Ce&&e.variables.forEach(r),e instanceof Ht&&r(e.definition())})),n;function i(e){n.add(e)}function r(n){var r=n.name;if(n.global&&t&&t.has(r))r=t.get(r);else if(!n.unmangleable(e))return;i(r)}}),Oe.DEFMETHOD("expand_names",function(e){Nn.reset(),Nn.sort(),e=this._default_mangler_options(e);var t=this.find_colliding_names(e),n=0;function r(r){if(r.global&&e.cache)return;if(r.unmangleable(e))return;if(i(r.name,e.reserved))return;const o=Rn(r),a=r.name=o?o.name:function(){var e;do{e=Nn(n++)}while(t.has(e)||T.has(e));return e}();r.orig.forEach(function(e){e.name=a}),r.references.forEach(function(e){e.name=a})}this.globals.forEach(r),this.walk(new En(function(e){e instanceof Ce&&e.variables.forEach(r),e instanceof Ht&&r(e.definition())}))}),ae.DEFMETHOD("tail_node",c),ct.DEFMETHOD("tail_node",function(){return this.expressions[this.expressions.length-1]}),Oe.DEFMETHOD("compute_char_frequency",function(e){e=this._default_mangler_options(e);try{ae.prototype.print=function(t,n){this._print(t,n),this instanceof Rt&&!this.unmangleable(e)?Nn.consider(this.name,-1):e.properties&&(this instanceof ft?Nn.consider(this.property,-1):this instanceof pt&&function e(t){t instanceof en?Nn.consider(t.value,-1):t instanceof ht?(e(t.consequent),e(t.alternative)):t instanceof ct&&e(t.tail_node())}(this.property))},Nn.consider(this.print_to_string(),1)}finally{ae.prototype.print=ae.prototype._print}Nn.sort()});var Nn=function(){var e,t,n="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_".split(""),i="0123456789".split("");function r(){t=new Map,n.forEach(function(e){t.set(e,0)}),i.forEach(function(e){t.set(e,0)})}function o(e,n){return t.get(n)-t.get(e)}function a(t){var n="",i=54;t++;do{n+=e[--t%i],t=Math.floor(t/i),i=64}while(t>0);return n}return a.consider=function(e,n){for(var i=e.length;--i>=0;)t.set(e[i],t.get(e[i])+n)},a.sort=function(){e=m(n,o).concat(m(i,o))},a.reset=r,r(),a}();const xn=new WeakSet,kn=new WeakMap,In=new WeakSet,Ln=new WeakSet,Vn=new WeakSet,Pn=new WeakSet,Bn=new WeakSet;class Kn extends En{constructor(e,t){super(),void 0===e.defaults||e.defaults||(t=!0),this.options=o(e,{arguments:!1,arrows:!t,booleans:!t,booleans_as_integers:!1,collapse_vars:!t,comparisons:!t,computed_props:!t,conditionals:!t,dead_code:!t,defaults:!0,directives:!t,drop_console:!1,drop_debugger:!t,ecma:5,evaluate:!t,expression:!1,global_defs:!1,hoist_funs:!1,hoist_props:!t,hoist_vars:!1,ie8:!1,if_return:!t,inline:!t,join_vars:!t,keep_classnames:!1,keep_fargs:!0,keep_fnames:!1,keep_infinity:!1,loops:!t,module:!1,negate_iife:!t,passes:1,properties:!t,pure_getters:!t&&"strict",pure_funcs:null,reduce_funcs:null,reduce_vars:!t,sequences:!t,side_effects:!t,switches:!t,top_retain:null,toplevel:!(!e||!e.top_retain),typeofs:!t,unsafe:!1,unsafe_arrows:!1,unsafe_comps:!1,unsafe_Function:!1,unsafe_math:!1,unsafe_methods:!1,unsafe_proto:!1,unsafe_regexp:!1,unsafe_undefined:!1,unused:!t,warnings:!1},!0);var n=this.options.global_defs;if("object"==typeof n)for(var i in n)"@"===i[0]&&D(n,i)&&(n[i.slice(1)]=ie(n[i],{expression:!0}));!0===this.options.inline&&(this.options.inline=3);var r=this.options.pure_funcs;this.pure_funcs="function"==typeof r?r:r?function(e){return!r.includes(e.expression.print_to_string())}:u;var a=this.options.top_retain;a instanceof RegExp?this.top_retain=function(e){return a.test(e.name)}:"function"==typeof a?this.top_retain=a:a&&("string"==typeof a&&(a=a.split(/,/)),this.top_retain=function(e){return a.includes(e.name)}),this.options.module&&(this.directives["use strict"]=!0,this.options.toplevel=!0);var s=this.options.toplevel;this.toplevel="string"==typeof s?{funcs:/funcs/.test(s),vars:/vars/.test(s)}:{funcs:s,vars:s};var c=this.options.sequences;this.sequences_limit=1==c?800:0|c,this.warnings_produced={},this.squeezed_nodes=new WeakSet,this.optimized_nodes=new WeakSet}option(e){return this.options[e]}exposed(e){if(e.export)return!0;if(e.global)for(var t=0,n=e.orig.length;t<n;t++)if(!this.toplevel[e.orig[t]instanceof Pt?"funcs":"vars"])return!0;return!1}in_boolean_context(){if(!this.option("booleans"))return!1;for(var e,t=this.self(),n=0;e=this.parent(n);n++){if(e instanceof le||e instanceof ht&&e.condition===t||e instanceof ge&&e.condition===t||e instanceof ve&&e.condition===t||e instanceof ze&&e.condition===t||e instanceof dt&&"!"==e.operator&&e.expression===t)return!0;if(!(e instanceof Et&&("&&"==e.operator||"||"==e.operator)||e instanceof ht||e.tail_node()===t))return!1;t=e}}compress(e){e=e.resolve_defines(this),this.option("expression")&&e.process_expression(!0);for(var t=+this.options.passes||1,n=1/0,i=!1,r={ie8:this.option("ie8")},o=0;o<t;o++)if(e.figure_out_scope(r),0===o&&this.option("drop_console")&&(e=e.drop_console()),(o>0||this.option("reduce_vars"))&&e.reset_opt_flags(this),e=e.transform(this),t>1){var a=0;if(e.walk(new En(function(){a++})),this.info("pass "+o+": last_count: "+n+", count: "+a),a<n)n=a,i=!1;else{if(i)break;i=!0}}return this.option("expression")&&e.process_expression(!1),e}info(...e){"verbose"==this.options.warnings&&ae.warn(...e)}warn(e,t){if(this.options.warnings){var n=_(e,t);n in this.warnings_produced||(this.warnings_produced[n]=!0,ae.warn.apply(ae,arguments))}}clear_warnings(){this.warnings_produced={}}before(e,t,n){if(this.squeezed_nodes.has(e))return e;var i=!1;e instanceof Ce&&(e=(e=e.hoist_properties(this)).hoist_declarations(this),i=!0),t(e,this),t(e,this);var r=e.optimize(this);return i&&r instanceof Ce&&(r.drop_unused(this),t(r,this)),r===e&&this.squeezed_nodes.add(r),r}}!function(){function e(e,t){e.DEFMETHOD("optimize",function(e){if(e.optimized_nodes.has(this))return this;if(e.has_directive("use asm"))return this;var n=t(this,e);return e.optimized_nodes.add(n),n})}function t(e,t){if(!((t=V(t))instanceof ae)){var n;if(e instanceof St){var i=e.elements;if("length"==t)return v(i.length,e);"number"==typeof t&&t in i&&(n=i[t])}else if(e instanceof At){t=""+t;for(var r=e.properties,o=r.length;--o>=0;){if(!(r[o]instanceof Tt))return;n||r[o].key!==t||(n=r[o].value)}}return n instanceof Yt&&n.fixed_value()||n}}function n(e,i,r,o,a,s){var u=i.parent(a),c=U(r,u);if(c)return c;if(!s&&u instanceof st&&u.expression===r&&!(o instanceof Ne)&&!(o instanceof Ot)&&!u.is_expr_pure(e)&&(!(o instanceof we)||!(u instanceof ut)&&o.contains_this()))return!0;if(u instanceof St)return n(e,i,u,u,a+1);if(u instanceof Tt&&r===u.value){var l=i.parent(a+1);return n(e,i,l,l,a+2)}if(u instanceof lt&&u.expression===r){var f=t(o,u.property);return!s&&n(e,i,u,f,a+1)}}function r(e){return e instanceof Ne||e instanceof we}function o(e){if(e instanceof Zt)return!0;if(e instanceof Yt)return e.definition().orig[0]instanceof Kt;if(e instanceof lt){if((e=e.expression)instanceof Yt){if(e.is_immutable())return!1;e=e.fixed_value()}return!e||!(e instanceof rn)&&(e instanceof Qt||o(e))}return!1}function p(e,t){if(!(e instanceof Yt))return!1;for(var n=e.definition().orig,i=n.length;--i>=0;)if(n[i]instanceof t)return!0}function m(e,t){for(var n,i=0;(n=e.parent(i++))&&!(n instanceof Ce);)if(n instanceof Ze&&n.argname){n=n.argname.definition().scope;break}return n.find_variable(t)}function S(e,t,n){return n||(n={}),t&&(n.start||(n.start=t.start),n.end||(n.end=t.end)),new e(n)}function A(e,t){return 1==t.length?t[0]:S(ct,e,{expressions:t.reduce(b,[])})}function v(e,t){switch(typeof e){case"string":return S(en,t,{value:e});case"number":return isNaN(e)?S(sn,t):isFinite(e)?1/e<0?S(dt,t,{operator:"-",expression:S(tn,t,{value:-e})}):S(tn,t,{value:e}):e<0?S(dt,t,{operator:"-",expression:S(ln,t)}):S(ln,t);case"boolean":return S(e?_n:pn,t);case"undefined":return S(un,t);default:if(null===e)return S(an,t,{value:null});if(e instanceof RegExp)return S(rn,t,{value:e});throw new Error(_("Can't handle constant of type: {type}",{type:typeof e}))}}function T(e,t,n){return e instanceof dt&&"delete"==e.operator||e instanceof st&&e.expression===t&&(n instanceof lt||n instanceof Yt&&"eval"==n.name)?A(t,[S(tn,t,{value:0}),n]):n}function b(e,t){return t instanceof ct?e.push.apply(e,t.expressions):e.push(t),e}function y(e){if(null===e)return[];if(e instanceof de)return e.body;if(e instanceof me)return[];if(e instanceof se)return[e];throw new Error("Can't convert thing to statement array")}function C(e){return null===e||(e instanceof me||e instanceof de&&0==e.body.length)}function O(e){return!(e instanceof Ft||e instanceof xe||e instanceof tt||e instanceof nt||e instanceof ot||e instanceof rt)}function F(e){return e instanceof De&&e.body instanceof de?e.body:e}function M(e){return"Call"==e.TYPE&&(e.expression instanceof we||M(e.expression))}function R(e){return e instanceof Yt&&e.definition().undeclared}e(ae,function(e,t){return e}),Oe.DEFMETHOD("drop_console",function(){return this.transform(new hn(function(e){if("Call"==e.TYPE){var t=e.expression;if(t instanceof lt){for(var n=t.expression;n.expression;)n=n.expression;if(R(n)&&"console"==n.name)return S(un,e)}}}))}),ae.DEFMETHOD("equivalent_to",function(e){return this.TYPE==e.TYPE&&this.print_to_string()==e.print_to_string()}),Ce.DEFMETHOD("process_expression",function(e,t){var n=this,i=new hn(function(r){if(e&&r instanceof le)return S(Ke,r,{value:r.body});if(!e&&r instanceof Ke){if(t){var o=r.value&&r.value.drop_side_effect_free(t,!0);return o?S(le,r,{body:o}):S(me,r)}return S(le,r,{body:r.value||S(dt,r,{operator:"void",expression:S(tn,r,{value:0})})})}if(r instanceof Ot||r instanceof Me&&r!==n)return r;if(r instanceof _e){var a=r.body.length-1;a>=0&&(r.body[a]=r.body[a].transform(i))}else r instanceof ze?(r.body=r.body.transform(i),r.alternative&&(r.alternative=r.alternative.transform(i))):r instanceof ye&&(r.body=r.body.transform(i));return r});n.transform(i)}),function(e){function i(e,t){t.assignments=0,t.chained=!1,t.direct_access=!1,t.escaped=0,t.recursive_refs=0,t.references=[],t.should_replace=void 0,t.single_use=void 0,t.scope.pinned()?t.fixed=!1:t.orig[0]instanceof It||!e.exposed(t)?t.fixed=t.init:t.fixed=!1}e(ae,a);const r=new WeakMap;function o(e,t,n){n.variables.forEach(function(n){i(t,n),null===n.fixed?(r.set(n,e.safe_ids),l(e,n,!0)):n.fixed&&(e.loop_ids.set(n.id,e.in_loop),l(e,n,!0))})}function s(e,t){t.block_scope&&t.block_scope.variables.forEach(function(t){i(e,t)})}function u(e){e.safe_ids=Object.create(e.safe_ids)}function c(e){e.safe_ids=Object.getPrototypeOf(e.safe_ids)}function l(e,t,n){e.safe_ids[t.id]=n}function f(e,t){if("m"==t.single_use)return!1;if(e.safe_ids[t.id]){if(null==t.fixed){var n=t.orig[0];if(n instanceof Vt||"arguments"==n.name)return!1;t.fixed=S(un,n)}return!0}return t.fixed instanceof xe}function p(e,t,n,i){if(void 0===t.fixed)return!0;let o;return null===t.fixed&&(o=r.get(t))?(o[t.id]=!1,r.delete(t),!0):!!D(e.safe_ids,t.id)&&(!!f(e,t)&&(!1!==t.fixed&&(!(null!=t.fixed&&(!i||t.references.length>t.assignments))&&(t.fixed instanceof xe?i instanceof ae&&t.fixed.parent_scope===n:t.orig.every(e=>!(e instanceof It||e instanceof Pt||e instanceof Kt))))))}function _(e,n,i,r,o,a,s){var u=e.parent(a);if(o){if(o.is_constant())return;if(o instanceof Mt)return}if(u instanceof Dt&&"="==u.operator&&r===u.right||u instanceof st&&(r!==u.expression||u instanceof ut)||u instanceof Be&&r===u.value&&r.scope!==n.scope||u instanceof at&&r===u.value||u instanceof mn&&r===u.value&&r.scope!==n.scope)return!(s>1)||o&&o.is_constant_expression(i)||(s=1),void((!n.escaped||n.escaped>s)&&(n.escaped=s));if(u instanceof St||u instanceof dn||u instanceof Et&&B.has(u.operator)||u instanceof ht&&r!==u.condition||u instanceof Fe||u instanceof ct&&r===u.tail_node())_(e,n,i,u,u,a+1,s);else if(u instanceof Tt&&r===u.value){var c=e.parent(a+1);_(e,n,i,c,c,a+2,s)}else if(u instanceof lt&&r===u.expression&&(_(e,n,i,u,o=t(o,u.property),a+1,s+1),o))return;a>0||u instanceof ct&&r!==u.tail_node()||u instanceof le||(n.direct_access=!0)}var d=new En(function(e){if(e instanceof Rt){var t=e.definition();t&&(e instanceof Yt&&t.references.push(e),t.fixed=!1)}});function m(e,t,n){Pn.delete(this);const i=e.safe_ids;return e.safe_ids=Object.create(null),o(e,n,this),t(),e.safe_ids=i,!0}function E(e,t,n){var i,r=this;return Pn.delete(this),u(e),o(e,n,r),r.uses_arguments?(t(),void c(e)):(!r.name&&(i=e.parent())instanceof st&&i.expression===r&&!i.args.some(e=>e instanceof Fe)&&r.argnames.every(e=>e instanceof Rt)&&r.argnames.forEach(function(t,n){if(t.definition){var o=t.definition();o.orig.length>1||(void 0!==o.fixed||r.uses_arguments&&!e.has_directive("use strict")?o.fixed=!1:(o.fixed=function(){return i.args[n]||S(un,i)},e.loop_ids.set(o.id,e.in_loop),l(e,o,!0)))}}),t(),c(e),!0)}e(Re,function(e,t,n){return u(e),o(e,n,this),t(),c(e),!0}),e(Dt,function(e,t,i){var r=this;if(r.left instanceof ke)r.left.walk(d);else{var o=r.left;if(o instanceof Yt){var a=o.definition(),s=p(e,a,o.scope,r.right);if(a.assignments++,s){var u=a.fixed;if(u||"="==r.operator){var c="="==r.operator,f=c?r.right:r;if(!n(i,e,r,f,0))return a.references.push(o),c||(a.chained=!0),a.fixed=c?function(){return r.right}:function(){return S(Et,r,{operator:r.operator.slice(0,-1),left:u instanceof ae?u:u(),right:r.right})},l(e,a,!1),r.right.walk(e),l(e,a,!0),_(e,a,o.scope,r,f,0,1),!0}}}}}),e(Et,function(e){if(B.has(this.operator))return this.left.walk(e),u(e),this.right.walk(e),c(e),!0}),e(_e,function(e,t,n){s(n,this)}),e($e,function(e){return u(e),this.expression.walk(e),c(e),u(e),fe(this,e),c(e),!0}),e(Mt,function(e,t){return Pn.delete(this),u(e),t(),c(e),!0}),e(ht,function(e){return this.condition.walk(e),u(e),this.consequent.walk(e),c(e),u(e),this.alternative.walk(e),c(e),!0}),e(qe,function(e,t){return u(e),t(),c(e),!0}),e(Ft,m),e(xe,m),e(Se,function(e,t,n){s(n,this);const i=e.in_loop;return e.in_loop=this,u(e),this.body.walk(e),re(this)&&(c(e),u(e)),this.condition.walk(e),c(e),e.in_loop=i,!0}),e(ve,function(e,t,n){s(n,this),this.init&&this.init.walk(e);const i=e.in_loop;return e.in_loop=this,u(e),this.condition&&this.condition.walk(e),this.body.walk(e),this.step&&(re(this)&&(c(e),u(e)),this.step.walk(e)),c(e),e.in_loop=i,!0}),e(Te,function(e,t,n){s(n,this),this.init.walk(d),this.object.walk(e);const i=e.in_loop;return e.in_loop=this,u(e),this.body.walk(e),c(e),e.in_loop=i,!0}),e(we,E),e(Ne,E),e(ze,function(e){return this.condition.walk(e),u(e),this.body.walk(e),c(e),this.alternative&&(u(e),this.alternative.walk(e),c(e)),!0}),e(he,function(e){return u(e),this.body.walk(e),c(e),!0}),e(Ht,function(){this.definition().fixed=!1}),e(Yt,function(e,t,i){var r,o,a=this.definition();a.references.push(this),1==a.references.length&&!a.fixed&&a.orig[0]instanceof Pt&&e.loop_ids.set(a.id,e.in_loop),void 0!==a.fixed&&f(e,a)?a.fixed&&((r=this.fixed_value())instanceof Me&&Ee(e,a)?a.recursive_refs++:r&&!i.exposed(a)&&function(e,t,n){return t.option("unused")&&!n.scope.pinned()&&n.references.length-n.recursive_refs==1&&e.loop_ids.get(n.id)===e.in_loop}(e,i,a)?a.single_use=!(r instanceof Me&&function(e,t,n){let i=function(){for(let t=0;;t++){const n=e.parent(t);if(n instanceof Oe)break;if(n instanceof Me)return n;if(n.block_scope)return n.block_scope}}();const r=t.enclosed.filter(e=>!t.variables.has(e.name)).map(e=>e.name);if(!r.length)return!1;for(;i&&!(i instanceof Oe)&&i!==n;){if(r.some(e=>i.variables.has(e)))return!0;i=i.parent_scope}return!1}(e,r,a.scope))&&(r instanceof Me&&!r.pinned()||r instanceof Ot||a.scope===this.scope&&r.is_constant_expression()):a.single_use=!1,n(i,e,this,r,0,!!(o=r)&&(o.is_constant()||o instanceof Me||o instanceof Zt))&&(a.single_use?a.single_use="m":a.fixed=!1)):a.fixed=!1,_(e,a,this.scope,this,r,0,1)}),e(Oe,function(e,t,n){this.globals.forEach(function(e){i(n,e)}),o(e,n,this)}),e(je,function(e,t,n){return s(n,this),u(e),fe(this,e),c(e),this.bcatch&&(u(e),this.bcatch.walk(e),c(e)),this.bfinally&&this.bfinally.walk(e),!0}),e(_t,function(e,t){var n=this;if("++"===n.operator||"--"===n.operator){var i=n.expression;if(i instanceof Yt){var r=i.definition(),o=p(e,r,i.scope,!0);if(r.assignments++,o){var a=r.fixed;if(a)return r.references.push(i),r.chained=!0,r.fixed=function(){return S(Et,n,{operator:n.operator.slice(0,-1),left:S(dt,n,{operator:"+",expression:a instanceof ae?a:a()}),right:S(tn,n,{value:1})})},l(e,r,!0),!0}}}}),e(at,function(e,t){var n=this;if(n.name instanceof ke)n.name.walk(d);else{var i=n.name.definition();if(n.value){if(p(e,i,n.name.scope,n.value))return i.fixed=function(){return n.value},e.loop_ids.set(i.id,e.in_loop),l(e,i,!1),t(),l(e,i,!0),!0;i.fixed=!1}}}),e(Ae,function(e,t,n){s(n,this);const i=e.in_loop;return e.in_loop=this,u(e),t(),c(e),e.in_loop=i,!0})}(function(e,t){e.DEFMETHOD("reduce_vars",t)}),Oe.DEFMETHOD("reset_opt_flags",function(e){const t=this,n=e.option("reduce_vars");if(e.squeezed_nodes=new WeakSet,e.optimized_nodes=new WeakSet,e.top_nodes=new WeakSet,n){const n=new En(function(i,r){return e.top_retain&&i instanceof xe&&n.parent()===t&&e.top_nodes.add(i),i.reduce_vars(n,r,e)});n.safe_ids=Object.create(null),n.in_loop=null,n.loop_ids=new Map,t.walk(n)}}),Rt.DEFMETHOD("fixed_value",function(){var e=this.definition().fixed;return!e||e instanceof ae?e:e()}),Yt.DEFMETHOD("is_immutable",function(){var e=this.definition().orig;return 1==e.length&&e[0]instanceof Kt});var w=E("Array Boolean clearInterval clearTimeout console Date decodeURI decodeURIComponent encodeURI encodeURIComponent Error escape eval EvalError Function isFinite isNaN JSON Math Number parseFloat parseInt RangeError ReferenceError RegExp Object setInterval setTimeout String SyntaxError TypeError unescape URIError");Yt.DEFMETHOD("is_declared",function(e){return!this.definition().undeclared||e.option("unsafe")&&w.has(this.name)});var N,x=E("Infinity NaN undefined");function k(e){return e instanceof ln||e instanceof sn||e instanceof un}function I(e,t){var a,s,u=t.find_parent(Ce).get_defun_scope();!function(){var e=t.self(),n=0;do{if(e instanceof Ze||e instanceof Je)n++;else if(e instanceof De)a=!0;else{if(e instanceof Ce){u=e;break}e instanceof je&&(s=!0)}}while(e=t.parent(n++))}();var c,l=10;do{c=!1,m(e),t.option("dead_code")&&h(e,t),t.option("if_return")&&E(e,t),t.sequences_limit>0&&(g(e,t),C(e,t)),t.option("join_vars")&&R(e),t.option("collapse_vars")&&_(e,t)}while(c&&l-- >0);function _(e,t){if(u.pinned())return e;for(var l,_=[],d=e.length,m=new hn(function(e,n){if(x)return e;if(!N)return e!==h[D]?e:++D<h.length?G(e):(N=!0,(v=function e(t,n,i){var r=m.parent(n);if(r instanceof Dt)return i&&!(r.left instanceof lt||C.has(r.left.name))?e(r,n+1,i):t;if(r instanceof Et)return!i||B.has(r.operator)&&r.left!==t?t:e(r,n+1,i);if(r instanceof st)return t;if(r instanceof $e)return t;if(r instanceof ht)return i&&r.condition===t?e(r,n+1,i):t;if(r instanceof Qe)return e(r,n+1,!0);if(r instanceof Be)return i?e(r,n+1,i):t;if(r instanceof ze)return i&&r.condition===t?e(r,n+1,i):t;if(r instanceof De)return t;if(r instanceof ct)return e(r,n+1,r.tail_node()!==t);if(r instanceof le)return e(r,n+1,!0);if(r instanceof We)return t;if(r instanceof at)return t;return null}(e,0))===e&&(x=!0),e);var i,r=m.parent();if(e instanceof Dt&&"="!=e.operator&&y.equivalent_to(e.left)||e instanceof dn||e instanceof st&&y instanceof lt&&y.equivalent_to(e.expression)||e instanceof ue||e instanceof ke||e instanceof Fe&&e.expression instanceof Rt&&e.expression.definition().references.length>1||e instanceof De&&!(e instanceof ve)||e instanceof Ge||e instanceof je||e instanceof ye||e instanceof mn||e instanceof ot||r instanceof ve&&e!==r.init||!M&&e instanceof Yt&&!e.is_declared(t))return x=!0,e;if(b||O&&M||!(r instanceof Et&&B.has(r.operator)&&r.left!==e||r instanceof ht&&r.condition!==e||r instanceof ze&&r.condition!==e)||(b=r),L&&!(e instanceof Nt)&&y.equivalent_to(e)){if(b)return x=!0,e;if(U(e,r))return A&&I++,e;if(I++,A&&g instanceof at)return e;if(c=x=!0,t.info("Collapsing {name} [{file}:{line},{col}]",{name:e.print_to_string(),file:e.start.file,line:e.start.line,col:e.start.col}),g instanceof mt)return S(dt,g,g);if(g instanceof at){var o=g.name.definition(),a=g.value;return o.references.length-o.replaced!=1||t.exposed(o)?S(Dt,g,{operator:"=",left:S(Yt,g.name,g.name),right:a}):(o.replaced++,w&&k(a)?a.transform(t):T(r,e,a))}return Bn.delete(g),g}return(e instanceof st||e instanceof Be&&(F||y instanceof lt||Q(y))||e instanceof lt&&(F||e.expression.may_throw_on_access(t))||e instanceof Yt&&(C.get(e.name)||F&&Q(e))||e instanceof at&&e.value&&(C.has(e.name.name)||F&&Q(e.name))||(i=U(e.left,e))&&(i instanceof lt||C.has(i.name))||R&&(s?e.has_side_effects(t):function e(t,n){if(t instanceof Dt)return e(t.left,!0);if(t instanceof _t)return e(t.expression,!0);if(t instanceof at)return t.value&&e(t.value);if(n){if(t instanceof ft)return e(t.expression,!0);if(t instanceof pt)return e(t.expression,!0);if(t instanceof Yt)return t.definition().scope!==u}return!1}(e)))&&(v=e,e instanceof Ce&&(x=!0)),G(e)},function(e){x||(v===e&&(x=!0),b===e&&(b=null))}),E=new hn(function(e){if(x)return e;if(!N){if(e!==h[D])return e;if(++D<h.length)return;return N=!0,e}return e instanceof Yt&&e.name==K.name?(--I||(x=!0),U(e,E.parent())?e:(K.replaced++,A.replaced--,g.value)):e instanceof qe||e instanceof Ce?e:void 0});--d>=0;){0==d&&t.option("unused")&&X();var h=[];for(z(e[d]);_.length>0;){h=_.pop();var D=0,g=h[h.length-1],A=null,v=null,b=null,y=W(g);if(y&&!o(y)&&!y.has_side_effects(t)){var C=q(g),O=j(y);y instanceof Yt&&C.set(y.name,!1);var F=Z(g),M=J(),R=g.may_throw(t),w=g.name instanceof Vt,N=w,x=!1,I=0,L=!l||!N;if(!L){for(var V=t.self().argnames.lastIndexOf(g.name)+1;!x&&V<l.length;V++)l[V].transform(m);L=!0}for(var P=d;!x&&P<e.length;P++)e[P].transform(m);if(A){var K=g.name.definition();if(x&&K.references.length-K.replaced>I)I=!1;else{x=!1,D=0,N=w;for(P=d;!x&&P<e.length;P++)e[P].transform(E);A.single_use=!1}}I&&!$(g)&&e.splice(d,1)}}}function G(e){if(e instanceof Ce)return e;if(e instanceof We){e.expression=e.expression.transform(m);for(var t=0,n=e.body.length;!x&&t<n;t++){var i=e.body[t];if(i instanceof $e){if(!N){if(i!==h[D])continue;D++}if(i.expression=i.expression.transform(m),!M)break}}return x=!0,e}}function H(e,t,n){var i=!1,r=!(e instanceof Ne);return t.walk(new En(function(t,o){if(i)return!0;if(t instanceof Yt&&(e.variables.has(t.name)||function(e,t){if(e.global)return!1;let n=e.scope;for(;n&&n!==t;){if(n.variables.has(e.name))return!0;n=n.parent_scope}return!1}(t.definition(),e))){var a=t.definition().scope;if(a!==u)for(;a=a.parent_scope;)if(a===u)return!0;return i=!0}if((n||r)&&t instanceof Zt)return i=!0;if(t instanceof Ce&&!(t instanceof Ne)){var s=r;return r=!1,o(),r=s,!0}})),i}function X(){var e,n=t.self();if(r(n)&&!n.name&&!n.uses_arguments&&!n.pinned()&&(e=t.parent())instanceof st&&e.expression===n&&e.args.every(e=>!(e instanceof Fe))){var o=t.has_directive("use strict");o&&!i(o,n.body)&&(o=!1);var a=n.argnames.length;l=e.args.slice(a);for(var s=new Set,u=a;--u>=0;){var c=n.argnames[u],f=e.args[u];const i=c.definition&&c.definition();if(!(i&&i.orig.length>1)&&(l.unshift(S(at,c,{name:c,value:f})),!s.has(c.name)))if(s.add(c.name),c instanceof Fe){var p=e.args.slice(u);p.every(e=>!H(n,e,o))&&_.unshift([S(at,c,{name:c.expression,value:S(St,e,{elements:p})})])}else f?(f instanceof Me&&f.pinned()||H(n,f,o))&&(f=null):f=S(un,c).transform(t),f&&_.unshift([S(at,c,{name:c,value:f})])}}}function z(e){if(h.push(e),e instanceof Dt)e.left.has_side_effects(t)||_.push(h.slice()),z(e.right);else if(e instanceof Et)z(e.left),z(e.right);else if(e instanceof st)z(e.expression),e.args.forEach(z);else if(e instanceof $e)z(e.expression);else if(e instanceof ht)z(e.condition),z(e.consequent),z(e.alternative);else if(!(e instanceof Qe)||!t.option("unused")&&e instanceof nt)e instanceof ge?(z(e.condition),e.body instanceof _e||z(e.body)):e instanceof Be?e.value&&z(e.value):e instanceof ve?(e.init&&z(e.init),e.condition&&z(e.condition),e.step&&z(e.step),e.body instanceof _e||z(e.body)):e instanceof Te?(z(e.object),e.body instanceof _e||z(e.body)):e instanceof ze?(z(e.condition),e.body instanceof _e||z(e.body),!e.alternative||e.alternative instanceof _e||z(e.alternative)):e instanceof ct?e.expressions.forEach(z):e instanceof le?z(e.body):e instanceof We?(z(e.expression),e.body.forEach(z)):e instanceof _t?"++"!=e.operator&&"--"!=e.operator||_.push(h.slice()):e instanceof at&&e.value&&(_.push(h.slice()),z(e.value));else{var n=e.definitions.length,i=n-200;for(i<0&&(i=0);i<n;i++)z(e.definitions[i])}h.pop()}function W(e){if(!(e instanceof at&&e.name instanceof Nt)){var n=e[e instanceof Dt?"left":"expression"];return!p(n,It)&&n}var r=e.name.definition();if(i(e.name,r.orig)){var o=r.references.length-r.replaced;if(o)return r.orig.length-r.eliminated>1&&!(e.name instanceof Vt)||(o>1?function(e){var t=e.value;if(t instanceof Yt&&"arguments"!=t.name){var n=t.definition();if(!n.undeclared)return A=n}}(e):!t.exposed(r))?S(Yt,e.name,e.name):void 0}}function Y(e){return e[e instanceof Dt?"right":"value"]}function q(e){var i=new Map;if(e instanceof _t)return i;var r=new En(function(e,o){for(var a=e;a instanceof lt;)a=a.expression;(a instanceof Yt||a instanceof Zt)&&i.set(a.name,i.get(a.name)||n(t,r,e,e,0))});return Y(e).walk(r),i}function $(n){if(n.name instanceof Vt){var i=t.parent(),r=t.self().argnames,o=r.indexOf(n.name);if(o<0)i.args.length=Math.min(i.args.length,r.length-1);else{var a=i.args;a[o]&&(a[o]=S(tn,a[o],{value:0}))}return!0}var s=!1;return e[d].transform(new hn(function(e,t,i){return s?e:e===n||e.body===n?(s=!0,e instanceof at?(e.value=null,e):i?f.skip:null):void 0},function(e){if(e instanceof ct)switch(e.expressions.length){case 0:return null;case 1:return e.expressions[0]}}))}function j(e){for(;e instanceof lt;)e=e.expression;return e instanceof Yt&&e.definition().scope===u&&!(a&&(C.has(e.name)||g instanceof _t||g instanceof Dt&&"="!=g.operator))}function Z(e){return!(e instanceof _t)&&Y(e).has_side_effects(t)}function J(){if(F)return!1;if(A)return!0;if(y instanceof Yt){var e=y.definition();if(e.references.length-e.replaced==(g instanceof at?1:2))return!0}return!1}function Q(e){if(!e.definition)return!0;var t=e.definition();return!(1==t.orig.length&&t.orig[0]instanceof Pt)&&(t.scope.get_defun_scope()!==u||!t.references.every(e=>{var t=e.scope.get_defun_scope();return"Scope"==t.TYPE&&(t=t.parent_scope),t===u}))}}function m(e){for(var t=[],n=0;n<e.length;){var i=e[n];i instanceof de&&i.body.every(O)?(c=!0,m(i.body),e.splice(n,1,...i.body),n+=i.body.length):i instanceof me?(c=!0,e.splice(n,1)):i instanceof ce?t.indexOf(i.value)<0?(n++,t.push(i.value)):(c=!0,e.splice(n,1)):n++}}function E(e,t){for(var n=t.self(),i=function(e){for(var t=0,n=e.length;--n>=0;){var i=e[n];if(i instanceof ze&&i.body instanceof Ke&&++t>1)return!0}return!1}(e),r=n instanceof Me,o=e.length;--o>=0;){var a=e[o],s=g(o),u=e[s];if(r&&!u&&a instanceof Ke){if(!a.value){c=!0,e.splice(o,1);continue}if(a.value instanceof dt&&"void"==a.value.operator){c=!0,e[o]=S(le,a,{body:a.value.expression});continue}}if(a instanceof ze){var l;if(m(l=J(a.body))){l.label&&d(l.label.thedef.references,l),c=!0,(a=a.clone()).condition=a.condition.negate(t);var f=h(a.body,l);a.body=S(de,a,{body:y(a.alternative).concat(E())}),a.alternative=S(de,a,{body:f}),e[o]=a.transform(t);continue}if(m(l=J(a.alternative))){l.label&&d(l.label.thedef.references,l),c=!0,(a=a.clone()).body=S(de,a.body,{body:y(a.body).concat(E())});f=h(a.alternative,l);a.alternative=S(de,a.alternative,{body:f}),e[o]=a.transform(t);continue}}if(a instanceof ze&&a.body instanceof Ke){var p=a.body.value;if(!p&&!a.alternative&&(r&&!u||u instanceof Ke&&!u.value)){c=!0,e[o]=S(le,a.condition,{body:a.condition});continue}if(p&&!a.alternative&&u instanceof Ke&&u.value){c=!0,(a=a.clone()).alternative=u,e[o]=a.transform(t),e.splice(s,1);continue}if(p&&!a.alternative&&(!u&&r&&i||u instanceof Ke)){c=!0,(a=a.clone()).alternative=u||S(Ke,a,{value:null}),e[o]=a.transform(t),u&&e.splice(s,1);continue}var _=e[A(o)];if(t.option("sequences")&&r&&!a.alternative&&_ instanceof ze&&_.body instanceof Ke&&g(s)==e.length&&u instanceof le){c=!0,(a=a.clone()).alternative=S(de,u,{body:[u,S(Ke,u,{value:null})]}),e[o]=a.transform(t),e.splice(s,1);continue}}}function m(i){if(!i)return!1;for(var a=o+1,s=e.length;a<s;a++){var u=e[a];if(u instanceof nt||u instanceof tt)return!1}var c=i instanceof Ge?t.loopcontrol_target(i):null;return i instanceof Ke&&r&&function(e){return!e||e instanceof dt&&"void"==e.operator}(i.value)||i instanceof Xe&&n===F(c)||i instanceof He&&c instanceof de&&n===c}function E(){var t=e.slice(o+1);return e.length=o+1,t.filter(function(t){return!(t instanceof xe)||(e.push(t),!1)})}function h(e,t){var n=y(e).slice(0,-1);return t.value&&n.push(S(le,t.value,{body:t.value.expression})),n}function g(t){for(var n=t+1,i=e.length;n<i;n++){var r=e[n];if(!(r instanceof et&&D(r)))break}return n}function A(t){for(var n=t;--n>=0;){var i=e[n];if(!(i instanceof et&&D(i)))break}return n}}function h(e,t){for(var n,i=t.self(),r=0,o=0,a=e.length;r<a;r++){var s=e[r];if(s instanceof Ge){var u=t.loopcontrol_target(s);s instanceof He&&!(u instanceof De)&&F(u)===i||s instanceof Xe&&F(u)===i?s.label&&d(s.label.thedef.references,s):e[o++]=s}else e[o++]=s;if(J(s)){n=e.slice(r+1);break}}e.length=o,c=o!=a,n&&n.forEach(function(n){L(t,n,e)})}function D(e){return e.definitions.every(e=>!e.value)}function g(e,t){if(!(e.length<2)){for(var n=[],i=0,r=0,o=e.length;r<o;r++){var a=e[r];if(a instanceof le){n.length>=t.sequences_limit&&u();var s=a.body;n.length>0&&(s=s.drop_side_effect_free(t)),s&&b(n,s)}else a instanceof Qe&&D(a)||a instanceof xe?e[i++]=a:(u(),e[i++]=a)}u(),e.length=i,i!=o&&(c=!0)}function u(){if(n.length){var t=A(n[0],n);e[i++]=S(le,t,{body:t}),n=[]}}}function v(e,t){if(!(e instanceof de))return e;for(var n=null,i=0,r=e.body.length;i<r;i++){var o=e.body[i];if(o instanceof et&&D(o))t.push(o);else{if(n)return!1;n=o}}return n}function C(e,t){function n(e){r--,c=!0;var n=i.body;return A(n,[n,e]).transform(t)}for(var i,r=0,o=0;o<e.length;o++){var a=e[o];if(i)if(a instanceof Be)a.value=n(a.value||S(un,a).transform(t));else if(a instanceof ve){if(!(a.init instanceof Qe)){var s=!1;i.body.walk(new En(function(e){return!!(s||e instanceof Ce)||(e instanceof Et&&"in"==e.operator?(s=!0,!0):void 0)})),s||(a.init?a.init=n(a.init):(a.init=i.body,r--,c=!0))}}else a instanceof Te?a.init instanceof nt||a.init instanceof tt||(a.object=n(a.object)):a instanceof ze?a.condition=n(a.condition):a instanceof We?a.expression=n(a.expression):a instanceof ye&&(a.expression=n(a.expression));if(t.option("conditionals")&&a instanceof ze){var u=[],l=v(a.body,u),f=v(a.alternative,u);if(!1!==l&&!1!==f&&u.length>0){var p=u.length;u.push(S(ze,a,{condition:a.condition,body:l||S(me,a.body),alternative:f})),u.unshift(r,1),[].splice.apply(e,u),o+=p,r+=p+1,i=null,c=!0;continue}}e[r++]=a,i=a instanceof le?a:null}e.length=r}function M(e,n){if(e instanceof Qe){var i,r=e.definitions[e.definitions.length-1];if(r.value instanceof At)if(n instanceof Dt?i=[n]:n instanceof ct&&(i=n.expressions.slice()),i){var o=!1;do{var a=i[0];if(!(a instanceof Dt))break;if("="!=a.operator)break;if(!(a.left instanceof lt))break;var s=a.left.expression;if(!(s instanceof Yt))break;if(r.name.name!=s.name)break;if(!a.right.is_constant_expression(u))break;var c=a.left.property;if(c instanceof ae&&(c=c.evaluate(t)),c instanceof ae)break;c=""+c;var l=t.option("ecma")<6&&t.has_directive("use strict")?function(e){return e.key!=c&&e.key&&e.key.name!=c}:function(e){return e.key&&e.key.name!=c};if(!r.value.properties.every(l))break;var f=r.value.properties.filter(function(e){return e.key===c})[0];f?f.value=new ct({start:f.start,expressions:[f.value.clone(),a.right.clone()],end:f.end}):r.value.properties.push(S(Tt,a,{key:c,value:a.right})),i.shift(),o=!0}while(i.length);return o&&i}}}function R(e){for(var t,n=0,i=-1,r=e.length;n<r;n++){var o=e[n],a=e[i];if(o instanceof Qe)a&&a.TYPE==o.TYPE?(a.definitions=a.definitions.concat(o.definitions),c=!0):t&&t.TYPE==o.TYPE&&D(o)?(t.definitions=t.definitions.concat(o.definitions),c=!0):(e[++i]=o,t=o);else if(o instanceof Be)o.value=u(o.value);else if(o instanceof ve){(s=M(a,o.init))?(c=!0,o.init=s.length?A(o.init,s):null,e[++i]=o):a instanceof et&&(!o.init||o.init.TYPE==a.TYPE)?(o.init&&(a.definitions=a.definitions.concat(o.init.definitions)),o.init=a,e[i]=o,c=!0):t&&o.init&&t.TYPE==o.init.TYPE&&D(o.init)?(t.definitions=t.definitions.concat(o.init.definitions),o.init=null,e[++i]=o,c=!0):e[++i]=o}else if(o instanceof Te)o.object=u(o.object);else if(o instanceof ze)o.condition=u(o.condition);else if(o instanceof le){var s;if(s=M(a,o.body)){if(c=!0,!s.length)continue;o.body=A(o.body,s)}e[++i]=o}else o instanceof We?o.expression=u(o.expression):o instanceof ye?o.expression=u(o.expression):e[++i]=o}function u(t){e[++i]=o;var n=M(a,t);return n?(c=!0,n.length?A(t,n):t instanceof ct?t.tail_node().left:t.left):t}e.length=i+1}}function L(e,t,n){t instanceof xe||e.warn("Dropping unreachable code [{file}:{line},{col}]",t.start),t.walk(new En(function(i){return i instanceof et?(e.warn("Declarations in unreachable code! [{file}:{line},{col}]",i.start),i.remove_initializers(),n.push(i),!0):i instanceof xe&&(i===t||!e.has_directive("use strict"))?(n.push(i===t?i:S(et,i,{definitions:[S(at,i,{name:S(xt,i.name,i.name),value:null})]})),!0):i instanceof Ce||void 0}))}function V(e){return e instanceof Qt?e.getValue():e instanceof dt&&"void"==e.operator&&e.expression instanceof Qt?void 0:e}function P(e,t){return e instanceof Yt&&Vn.has(e)||e instanceof un||e instanceof dt&&"void"==e.operator&&!e.expression.has_side_effects(t)}!function(e){function t(e){return/strict/.test(e.option("pure_getters"))}ae.DEFMETHOD("may_throw_on_access",function(e){return!e.option("pure_getters")||this._dot_throw(e)}),e(ae,t),e(an,u),e(un,u),e(Qt,s),e(St,s),e(At,function(e){if(!t(e))return!1;for(var n=this.properties.length;--n>=0;)if(this.properties[n]._dot_throw(e))return!0;return!1}),e(vt,s),e(yt,u),e(Fe,function(e){return this.expression._dot_throw(e)}),e(we,s),e(Ne,s),e(mt,s),e(dt,function(){return"void"==this.operator}),e(Et,function(e){return("&&"==this.operator||"||"==this.operator)&&(this.left._dot_throw(e)||this.right._dot_throw(e))}),e(Dt,function(e){return"="==this.operator&&this.right._dot_throw(e)}),e(ht,function(e){return this.consequent._dot_throw(e)||this.alternative._dot_throw(e)}),e(ft,function(e){return!!t(e)&&!(this.expression instanceof we&&"prototype"==this.property)}),e(ct,function(e){return this.tail_node()._dot_throw(e)}),e(Yt,function(e){if(Vn.has(this))return!0;if(!t(e))return!1;if(R(this)&&this.is_declared(e))return!1;if(this.is_immutable())return!1;var n=this.fixed_value();return!n||n._dot_throw(e)})}(function(e,t){e.DEFMETHOD("_dot_throw",t)}),function(e){const t=E("! delete"),n=E("in instanceof == != === !== < <= >= >");e(ae,s),e(dt,function(){return t.has(this.operator)}),e(Et,function(){return n.has(this.operator)||B.has(this.operator)&&this.left.is_boolean()&&this.right.is_boolean()}),e(ht,function(){return this.consequent.is_boolean()&&this.alternative.is_boolean()}),e(Dt,function(){return"="==this.operator&&this.right.is_boolean()}),e(ct,function(){return this.tail_node().is_boolean()}),e(_n,u),e(pn,u)}(function(e,t){e.DEFMETHOD("is_boolean",t)}),function(e){e(ae,s),e(tn,u);var t=E("+ - ~ ++ --");e(_t,function(){return t.has(this.operator)});var n=E("- * / % & | ^ << >> >>>");e(Et,function(e){return n.has(this.operator)||"+"==this.operator&&this.left.is_number(e)&&this.right.is_number(e)}),e(Dt,function(e){return n.has(this.operator.slice(0,-1))||"="==this.operator&&this.right.is_number(e)}),e(ct,function(e){return this.tail_node().is_number(e)}),e(ht,function(e){return this.consequent.is_number(e)&&this.alternative.is_number(e)})}(function(e,t){e.DEFMETHOD("is_number",t)}),(N=function(e,t){e.DEFMETHOD("is_string",t)})(ae,s),N(en,u),N(Le,function(){return 1===this.segments.length}),N(dt,function(){return"typeof"==this.operator}),N(Et,function(e){return"+"==this.operator&&(this.left.is_string(e)||this.right.is_string(e))}),N(Dt,function(e){return("="==this.operator||"+="==this.operator)&&this.right.is_string(e)}),N(ct,function(e){return this.tail_node().is_string(e)}),N(ht,function(e){return this.consequent.is_string(e)&&this.alternative.is_string(e)});var B=E("&& ||"),K=E("delete ++ --");function U(e,t){return t instanceof _t&&K.has(t.operator)?t.expression:t instanceof Dt&&t.left===e?e:void 0}function G(e,t){return e.print_to_string().length>t.print_to_string().length?t:e}function H(e,t){return G(S(le,e,{body:e}),S(le,t,{body:t})).body}function X(e,t,n){return(An(e)?H:G)(t,n)}function z(e){for(var t of Object.keys(e))e[t]=E(e[t])}!function(e){function t(e,t){e.warn("global_defs "+t.print_to_string()+" redefined [{file}:{line},{col}]",t.start)}Oe.DEFMETHOD("resolve_defines",function(e){return e.option("global_defs")?(this.figure_out_scope({ie8:e.option("ie8")}),this.transform(new hn(function(n){var i=n._find_defs(e,"");if(i){for(var r,o=0,a=n;(r=this.parent(o++))&&r instanceof lt&&r.expression===a;)a=r;if(!U(a,r))return i;t(e,n)}}))):this}),e(ae,a),e(ft,function(e,t){return this.expression._find_defs(e,"."+this.property+t)}),e(Nt,function(e){this.global()&&D(e.option("global_defs"),this.name)&&t(e,this)}),e(Yt,function(e,t){if(this.global()){var n=e.option("global_defs"),i=this.name+t;return D(n,i)?function e(t,n){if(t instanceof ae)return S(t.CTOR,n,t);if(Array.isArray(t))return S(St,n,{elements:t.map(function(t){return e(t,n)})});if(t&&"object"==typeof t){var i=[];for(var r in t)D(t,r)&&i.push(S(Tt,n,{key:r,value:e(t[r],n)}));return S(At,n,{properties:i})}return v(t,n)}(n[i],this):void 0}})}(function(e,t){e.DEFMETHOD("_find_defs",t)});var q=["constructor","toString","valueOf"],$={Array:["indexOf","join","lastIndexOf","slice"].concat(q),Boolean:q,Function:q,Number:["toExponential","toFixed","toPrecision"].concat(q),Object:q,RegExp:["test"].concat(q),String:["charAt","charCodeAt","concat","indexOf","italics","lastIndexOf","match","replace","search","slice","split","substr","substring","toLowerCase","toUpperCase","trim"].concat(q)};z($);var j={Array:["isArray"],Math:["abs","acos","asin","atan","ceil","cos","exp","floor","log","round","sin","sqrt","tan","atan2","pow","max","min"],Number:["isFinite","isNaN"],Object:["create","getOwnPropertyDescriptor","getOwnPropertyNames","getPrototypeOf","isExtensible","isFrozen","isSealed","keys"],String:["fromCharCode"]};z(j),function(e){ae.DEFMETHOD("evaluate",function(e){if(!e.option("evaluate"))return this;var t=this._eval(e,1);return!t||t instanceof RegExp?t:"function"==typeof t||"object"==typeof t?this:t});var t=E("! ~ - + void");ae.DEFMETHOD("is_constant",function(){return this instanceof Qt?!(this instanceof rn):this instanceof dt&&this.expression instanceof Qt&&t.has(this.operator)}),e(se,function(){throw new Error(_("Cannot evaluate a statement [{file}:{line},{col}]",this.start))}),e(Me,c),e(Ot,c),e(ae,c),e(Qt,function(){return this.getValue()}),e(Le,function(){return 1!==this.segments.length?this:this.segments[0].value}),e(we,function(e){if(e.option("unsafe")){var t=function(){};return t.node=this,t.toString=function(){return this.node.print_to_string()},t}return this}),e(St,function(e,t){if(e.option("unsafe")){for(var n=[],i=0,r=this.elements.length;i<r;i++){var o=this.elements[i],a=o._eval(e,t);if(o===a)return this;n.push(a)}return n}return this}),e(At,function(e,t){if(e.option("unsafe")){for(var n={},i=0,r=this.properties.length;i<r;i++){var o=this.properties[i];if(o instanceof Fe)return this;var a=o.key;if(a instanceof Rt)a=a.name;else if(a instanceof ae&&(a=a._eval(e,t))===o.key)return this;if("function"==typeof Object.prototype[a])return this;if(!(o.value instanceof we)&&(n[a]=o.value._eval(e,t),n[a]===o.value))return this}return n}return this});var n=E("! typeof void");e(dt,function(e,t){var i=this.expression;if(e.option("typeofs")&&"typeof"==this.operator&&(i instanceof Me||i instanceof Yt&&i.fixed_value()instanceof Me))return"function";if(n.has(this.operator)||t++,(i=i._eval(e,t))===this.expression)return this;switch(this.operator){case"!":return!i;case"typeof":return i instanceof RegExp?this:typeof i;case"void":return;case"~":return~i;case"-":return-i;case"+":return+i}return this});var i=E("&& || === !==");e(Et,function(e,t){i.has(this.operator)||t++;var n=this.left._eval(e,t);if(n===this.left)return this;var r,o=this.right._eval(e,t);if(o===this.right)return this;switch(this.operator){case"&&":r=n&&o;break;case"||":r=n||o;break;case"|":r=n|o;break;case"&":r=n&o;break;case"^":r=n^o;break;case"+":r=n+o;break;case"*":r=n*o;break;case"**":r=Math.pow(n,o);break;case"/":r=n/o;break;case"%":r=n%o;break;case"-":r=n-o;break;case"<<":r=n<<o;break;case">>":r=n>>o;break;case">>>":r=n>>>o;break;case"==":r=n==o;break;case"===":r=n===o;break;case"!=":r=n!=o;break;case"!==":r=n!==o;break;case"<":r=n<o;break;case"<=":r=n<=o;break;case">":r=n>o;break;case">=":r=n>=o;break;default:return this}return isNaN(r)&&e.find_parent(ye)?this:r}),e(ht,function(e,t){var n=this.condition._eval(e,t);if(n===this.condition)return this;var i=n?this.consequent:this.alternative,r=i._eval(e,t);return r===i?this:r}),e(Yt,function(e,t){var n,i=this.fixed_value();if(!i)return this;if(D(i,"_eval"))n=i._eval();else{if(this._eval=c,n=i._eval(e,t),delete this._eval,n===i)return this;i._eval=function(){return n}}if(n&&"object"==typeof n){var r=this.definition().escaped;if(r&&t>r)return this}return n});var r={Array:Array,Math:Math,Number:Number,Object:Object,String:String},o={Math:["E","LN10","LN2","LOG2E","LOG10E","PI","SQRT1_2","SQRT2"],Number:["MAX_VALUE","MIN_VALUE","NaN","NEGATIVE_INFINITY","POSITIVE_INFINITY"]};z(o),e(lt,function(e,t){if(e.option("unsafe")){var n=this.property;if(n instanceof ae&&(n=n._eval(e,t))===this.property)return this;var i,a=this.expression;if(R(a)){var s,u="hasOwnProperty"===a.name&&"call"===n&&(s=e.parent()&&e.parent().args)&&s&&s[0]&&s[0].evaluate(e);if(null==(u=u instanceof ft?u.expression:u)||u.thedef&&u.thedef.undeclared)return this.clone();var c=o[a.name];if(!c||!c.has(n))return this;i=r[a.name]}else{if(!(i=a._eval(e,t+1))||i===a||!D(i,n))return this;if("function"==typeof i)switch(n){case"name":return i.node.name?i.node.name.name:"";case"length":return i.node.argnames.length;default:return this}}return i[n]}return this}),e(st,function(e,t){var n=this.expression;if(e.option("unsafe")&&n instanceof lt){var i,o=n.property;if(o instanceof ae&&(o=o._eval(e,t))===n.property)return this;var a=n.expression;if(R(a)){var s="hasOwnProperty"===a.name&&"call"===o&&this.args[0]&&this.args[0].evaluate(e);if(null==(s=s instanceof ft?s.expression:s)||s.thedef&&s.thedef.undeclared)return this.clone();var u=j[a.name];if(!u||!u.has(o))return this;i=r[a.name]}else{if((i=a._eval(e,t+1))===a||!i)return this;var c=$[i.constructor.name];if(!c||!c.has(o))return this}for(var l=[],f=0,p=this.args.length;f<p;f++){var _=this.args[f],d=_._eval(e,t);if(_===d)return this;l.push(d)}try{return i[o].apply(i,l)}catch(t){e.warn("Error evaluating {code} [{file}:{line},{col}]",{code:this.print_to_string(),file:this.start.file,line:this.start.line,col:this.start.col})}}return this}),e(ut,c)}(function(e,t){e.DEFMETHOD("_eval",t)}),function(e){function t(e){return S(dt,e,{operator:"!",expression:e})}function n(e,n,i){var r=t(e);if(i){var o=S(le,n,{body:n});return G(r,o)===o?n:r}return G(r,n)}e(ae,function(){return t(this)}),e(se,function(){throw new Error("Cannot negate a statement")}),e(we,function(){return t(this)}),e(Ne,function(){return t(this)}),e(dt,function(){return"!"==this.operator?this.expression:t(this)}),e(ct,function(e){var t=this.expressions.slice();return t.push(t.pop().negate(e)),A(this,t)}),e(ht,function(e,t){var i=this.clone();return i.consequent=i.consequent.negate(e),i.alternative=i.alternative.negate(e),n(this,i,t)}),e(Et,function(e,i){var r=this.clone(),o=this.operator;if(e.option("unsafe_comps"))switch(o){case"<=":return r.operator=">",r;case"<":return r.operator=">=",r;case">=":return r.operator="<",r;case">":return r.operator="<=",r}switch(o){case"==":return r.operator="!=",r;case"!=":return r.operator="==",r;case"===":return r.operator="!==",r;case"!==":return r.operator="===",r;case"&&":return r.operator="||",r.left=r.left.negate(e,i),r.right=r.right.negate(e),n(this,r,i);case"||":return r.operator="&&",r.left=r.left.negate(e,i),r.right=r.right.negate(e),n(this,r,i)}return t(this)})}(function(e,t){e.DEFMETHOD("negate",function(e,n){return t.call(this,e,n)})});var Z=E("Boolean decodeURI decodeURIComponent Date encodeURI encodeURIComponent Error escape EvalError isFinite isNaN Number Object parseFloat parseInt RangeError ReferenceError String SyntaxError TypeError unescape URIError");function J(e){return e&&e.aborts()}st.DEFMETHOD("is_expr_pure",function(e){if(e.option("unsafe")){var t=this.expression,n=this.args&&this.args[0]&&this.args[0].evaluate(e);if(t.expression&&"hasOwnProperty"===t.expression.name&&(null==n||n.thedef&&n.thedef.undeclared))return!1;if(R(t)&&Z.has(t.name))return!0;if(t instanceof ft&&R(t.expression)&&j.hasOwnProperty(t.expression.name)&&j[t.expression.name].has(t.property))return!0}return this.pure||!e.pure_funcs(this)}),ae.DEFMETHOD("is_call_pure",s),ft.DEFMETHOD("is_call_pure",function(e){if(!e.option("unsafe"))return;const t=this.expression;let n;return t instanceof St?n=$.Array:t.is_boolean()?n=$.Boolean:t.is_number(e)?n=$.Number:t instanceof rn?n=$.RegExp:t.is_string(e)?n=$.String:this.may_throw_on_access(e)||(n=$.Object),n&&n.has(this.property)}),function(e){function t(e,t){for(var n=e.length;--n>=0;)if(e[n].has_side_effects(t))return!0;return!1}e(ae,u),e(me,s),e(Qt,s),e(Zt,s),e(_e,function(e){return t(this.body,e)}),e(st,function(e){return!(this.is_expr_pure(e)||this.expression.is_call_pure(e)&&!this.expression.has_side_effects(e))||t(this.args,e)}),e(We,function(e){return this.expression.has_side_effects(e)||t(this.body,e)}),e($e,function(e){return this.expression.has_side_effects(e)||t(this.body,e)}),e(je,function(e){return t(this.body,e)||this.bcatch&&this.bcatch.has_side_effects(e)||this.bfinally&&this.bfinally.has_side_effects(e)}),e(ze,function(e){return this.condition.has_side_effects(e)||this.body&&this.body.has_side_effects(e)||this.alternative&&this.alternative.has_side_effects(e)}),e(he,function(e){return this.body.has_side_effects(e)}),e(le,function(e){return this.body.has_side_effects(e)}),e(Me,s),e(Ot,function(e){return!!this.extends&&this.extends.has_side_effects(e)}),e(Ft,u),e(Et,function(e){return this.left.has_side_effects(e)||this.right.has_side_effects(e)}),e(Dt,u),e(ht,function(e){return this.condition.has_side_effects(e)||this.consequent.has_side_effects(e)||this.alternative.has_side_effects(e)}),e(_t,function(e){return K.has(this.operator)||this.expression.has_side_effects(e)}),e(Yt,function(e){return!this.is_declared(e)}),e(Nt,s),e(At,function(e){return t(this.properties,e)}),e(vt,function(e){return!!(this instanceof Tt&&this.key instanceof ae&&this.key.has_side_effects(e))||this.value.has_side_effects(e)}),e(St,function(e){return t(this.elements,e)}),e(ft,function(e){return this.expression.may_throw_on_access(e)||this.expression.has_side_effects(e)}),e(pt,function(e){return this.expression.may_throw_on_access(e)||this.expression.has_side_effects(e)||this.property.has_side_effects(e)}),e(ct,function(e){return t(this.expressions,e)}),e(Qe,function(e){return t(this.definitions,e)}),e(at,function(e){return this.value}),e(Ve,s),e(Le,function(e){return t(this.segments,e)})}(function(e,t){e.DEFMETHOD("has_side_effects",t)}),function(e){function t(e,t){for(var n=e.length;--n>=0;)if(e[n].may_throw(t))return!0;return!1}e(ae,u),e(Ot,s),e(Qt,s),e(me,s),e(Me,s),e(Nt,s),e(Zt,s),e(St,function(e){return t(this.elements,e)}),e(Dt,function(e){return!!this.right.may_throw(e)||!(!e.has_directive("use strict")&&"="==this.operator&&this.left instanceof Yt)&&this.left.may_throw(e)}),e(Et,function(e){return this.left.may_throw(e)||this.right.may_throw(e)}),e(_e,function(e){return t(this.body,e)}),e(st,function(e){return!!t(this.args,e)||!this.is_expr_pure(e)&&(!!this.expression.may_throw(e)||(!(this.expression instanceof Me)||t(this.expression.body,e)))}),e($e,function(e){return this.expression.may_throw(e)||t(this.body,e)}),e(ht,function(e){return this.condition.may_throw(e)||this.consequent.may_throw(e)||this.alternative.may_throw(e)}),e(Qe,function(e){return t(this.definitions,e)}),e(ft,function(e){return this.expression.may_throw_on_access(e)||this.expression.may_throw(e)}),e(ze,function(e){return this.condition.may_throw(e)||this.body&&this.body.may_throw(e)||this.alternative&&this.alternative.may_throw(e)}),e(he,function(e){return this.body.may_throw(e)}),e(At,function(e){return t(this.properties,e)}),e(vt,function(e){return this.value.may_throw(e)}),e(Ke,function(e){return this.value&&this.value.may_throw(e)}),e(ct,function(e){return t(this.expressions,e)}),e(le,function(e){return this.body.may_throw(e)}),e(pt,function(e){return this.expression.may_throw_on_access(e)||this.expression.may_throw(e)||this.property.may_throw(e)}),e(We,function(e){return this.expression.may_throw(e)||t(this.body,e)}),e(Yt,function(e){return!this.is_declared(e)}),e(je,function(e){return this.bcatch?this.bcatch.may_throw(e):t(this.body,e)||this.bfinally&&this.bfinally.may_throw(e)}),e(_t,function(e){return!("typeof"==this.operator&&this.expression instanceof Yt)&&this.expression.may_throw(e)}),e(at,function(e){return!!this.value&&this.value.may_throw(e)})}(function(e,t){e.DEFMETHOD("may_throw",t)}),function(e){function t(e){var t=this,n=!0;return t.walk(new En(function(r){if(!n)return!0;if(r instanceof Yt){if(Pn.has(t))return n=!1,!0;var o=r.definition();if(i(o,t.enclosed)&&!t.variables.has(o.name)){if(e){var a=e.find_variable(r);if(o.undeclared?!a:a===o)return n="f",!0}n=!1}return!0}return r instanceof Zt&&t instanceof Ne?(n=!1,!0):void 0})),n}e(ae,s),e(Qt,u),e(Ot,function(e){return!(this.extends&&!this.extends.is_constant_expression(e))&&t.call(this,e)}),e(Me,t),e(_t,function(){return this.expression.is_constant_expression()}),e(Et,function(){return this.left.is_constant_expression()&&this.right.is_constant_expression()}),e(St,function(){return this.elements.every(e=>e.is_constant_expression())}),e(At,function(){return this.properties.every(e=>e.is_constant_expression())}),e(vt,function(){return!(this.key instanceof ae)&&this.value.is_constant_expression()})}(function(e,t){e.DEFMETHOD("is_constant_expression",t)}),function(e){function t(){for(var e=0;e<this.body.length;e++)if(J(this.body[e]))return this.body[e];return null}e(se,l),e(Pe,c),e(rt,function(){return null}),e(de,t),e(Ye,t),e(ze,function(){return this.alternative&&J(this.body)&&J(this.alternative)&&this})}(function(e,t){e.DEFMETHOD("aborts",t)});var Q=new Set(["use asm","use strict"]);function ee(e,t){return I(e.body,t),t.option("side_effects")&&1==e.body.length&&e.body[0]===t.has_directive("use strict")&&(e.body.length=0),e}e(ce,function(e,t){return!t.option("directives")||Q.has(e.value)&&t.has_directive(e.value)===e?e:S(me,e)}),e(ue,function(e,t){return t.option("drop_debugger")?S(me,e):e}),e(he,function(e,t){return e.body instanceof He&&t.loopcontrol_target(e.body)===e.body?S(me,e):0==e.label.references.length?e.body:e}),e(_e,function(e,t){return I(e.body,t),e}),e(de,function(e,t){switch(I(e.body,t),e.body.length){case 1:if(!t.has_directive("use strict")&&t.parent()instanceof ze&&!((n=e.body[0])instanceof nt||n instanceof tt||n instanceof Ot)||O(e.body[0]))return e.body[0];break;case 0:return S(me,e)}var n;return e}),e(Me,ee),Ce.DEFMETHOD("drop_unused",function(e){if(e.option("unused")&&!e.has_directive("use asm")){var t=this;if(!t.pinned()){var n=!(t instanceof Oe)||e.toplevel.funcs,i=!(t instanceof Oe)||e.toplevel.vars,r=/keep_assign/.test(e.option("unused"))?s:function(e){return e instanceof Dt&&(Bn.has(e)||"="==e.operator)?e.left:e instanceof _t&&Bn.has(e)?e.expression:void 0},o=new Map,a=new Map;t instanceof Oe&&e.top_retain&&t.variables.forEach(function(t){e.top_retain(t)&&!o.has(t.id)&&o.set(t.id,t)});var u=new Map,c=new Map,l=null,_=this,m=new En(function(r,s){if(r instanceof Me&&r.uses_arguments&&!m.has_directive("use strict")&&r.argnames.forEach(function(e){if(e instanceof Nt){var t=e.definition();o.has(t.id)||o.set(t.id,t)}}),r!==t){if(r instanceof xe||r instanceof Ft){var f=r.name.definition();return((p=m.parent()instanceof ot)||!n&&_===t)&&f.global&&!o.has(f.id)&&o.set(f.id,f),h(c,f.id,r),!0}if(r instanceof Vt&&_===t&&h(u,r.definition().id,r),r instanceof Qe&&_===t){var p=m.parent()instanceof ot;return r.definitions.forEach(function(t){if(t.name instanceof xt&&h(u,t.name.definition().id,t),!p&&i||t.name.walk(new En(function(e){if(e instanceof Nt){var t=e.definition();!p&&!t.global||o.has(t.id)||o.set(t.id,t)}})),t.value){if(t.name instanceof ke){const e=l;l=t.value,t.walk(m),l=e}else{var n=t.name.definition();h(c,n.id,t.value),n.chained||t.name.fixed_value()!==t.value||a.set(n.id,t)}t.value.has_side_effects(e)&&t.value.walk(m)}}),!0}return r.destructuring&&l&&h(c,r.name,l),D(r,s)}});t.walk(m),m=new En(D),o.forEach(function(e){var t=c.get(e.id);t&&t.forEach(function(e){e.walk(m)})});var E=new hn(function(s,c,l){var p=E.parent();if(i){const e=r(s);if(e instanceof Yt){var m=e.definition(),h=o.has(m.id);if(s instanceof Dt){if(!h||a.has(m.id)&&a.get(m.id)!==s)return T(p,s,s.right.transform(E))}else if(!h)return S(tn,s,{value:0})}}if(_===t){if(s.name&&(s instanceof Mt&&!g(e.option("keep_classnames"),(m=s.name.definition()).name)||s instanceof we&&!g(e.option("keep_fnames"),(m=s.name.definition()).name))&&(!o.has(m.id)||m.orig.length>1)&&(s.name=null),s instanceof Me&&!(s instanceof Re))for(var D=!e.option("keep_fargs"),v=s.argnames,b=v.length;--b>=0;){var y=v[b];y instanceof Fe&&(y=y.expression),y instanceof gt&&(y=y.left),y instanceof ke||o.has(y.definition().id)?D=!1:(xn.add(y),D&&(v.pop(),e[y.unreferenced()?"warn":"info"]("Dropping unused function argument {name} [{file}:{line},{col}]",k(y))))}if((s instanceof xe||s instanceof Ft)&&s!==t){m=s.name.definition();if(!(o.has(m.id)||!n&&m.global))return e[s.name.unreferenced()?"warn":"info"]("Dropping unused function {name} [{file}:{line},{col}]",k(s.name)),m.eliminated++,S(me,s)}if(s instanceof Qe&&!(p instanceof Te&&p.init===s)){var F=!(p instanceof Oe||s instanceof et),M=[],R=[],w=[],N=[];switch(s.definitions.forEach(function(t){t.value&&(t.value=t.value.transform(E));var n=t.name instanceof ke,r=n?new Mn(null,{name:"<destructure>"}):t.name.definition();if(F&&r.global)return w.push(t);if(!i&&!F||n&&(t.name.names.length||t.name.is_array||1!=e.option("pure_getters"))||o.has(r.id)){if(t.value&&a.has(r.id)&&a.get(r.id)!==t&&(t.value=t.value.drop_side_effect_free(e)),t.name instanceof xt){var c=u.get(r.id);if(c.length>1&&(!t.value||r.orig.indexOf(t.name)>r.eliminated)){if(e.warn("Dropping duplicated definition of variable {name} [{file}:{line},{col}]",k(t.name)),t.value){var l=S(Yt,t.name,t.name);r.references.push(l);var f=S(Dt,t,{operator:"=",left:l,right:t.value});a.get(r.id)===t&&a.set(r.id,f),N.push(f.transform(E))}return d(c,t),void r.eliminated++}}t.value?(N.length>0&&(w.length>0?(N.push(t.value),t.value=A(t.value,N)):M.push(S(le,s,{body:A(s,N)})),N=[]),w.push(t)):R.push(t)}else if(r.orig[0]instanceof Ht){(p=t.value&&t.value.drop_side_effect_free(e))&&N.push(p),t.value=null,R.push(t)}else{var p;(p=t.value&&t.value.drop_side_effect_free(e))?(n||e.warn("Side effects in initialization of unused variable {name} [{file}:{line},{col}]",k(t.name)),N.push(p)):n||e[t.name.unreferenced()?"warn":"info"]("Dropping unused variable {name} [{file}:{line},{col}]",k(t.name)),r.eliminated++}}),(R.length>0||w.length>0)&&(s.definitions=R.concat(w),M.push(s)),N.length>0&&M.push(S(le,s,{body:A(s,N)})),M.length){case 0:return l?f.skip:S(me,s);case 1:return M[0];default:return l?f.splice(M):S(de,s,{body:M})}}if(s instanceof ve)return c(s,this),s.init instanceof de&&(x=s.init,s.init=x.body.pop(),x.body.push(s)),s.init instanceof le?s.init=s.init.body:C(s.init)&&(s.init=null),x?l?f.splice(x.body):x:s;if(s instanceof he&&s.body instanceof ve){if(c(s,this),s.body instanceof de){var x=s.body;return s.body=x.body.pop(),x.body.push(s),l?f.splice(x.body):x}return s}if(s instanceof de)return c(s,this),l&&s.body.every(O)?f.splice(s.body):s;if(s instanceof Ce){const e=_;return _=s,c(s,this),_=e,s}}function k(e){return{name:e.name,file:e.start.file,line:e.start.line,col:e.start.col}}});t.transform(E)}}function D(e,n){var i;const s=r(e);if(s instanceof Yt&&!p(e.left,kt)&&t.variables.get(s.name)===(i=s.definition()))return e instanceof Dt&&(e.right.walk(m),i.chained||e.left.fixed_value()!==e.right||a.set(i.id,e)),!0;if(e instanceof Yt){if(i=e.definition(),!o.has(i.id)&&(o.set(i.id,i),i.orig[0]instanceof Ht)){const e=i.scope.is_block_scope()&&i.scope.get_defun_scope().variables.get(i.name);e&&o.set(e.id,e)}return!0}if(e instanceof Ce){var u=_;return _=e,n(),_=u,!0}}}),Ce.DEFMETHOD("hoist_declarations",function(e){var t=this;if(e.has_directive("use asm"))return t;if(!Array.isArray(t.body))return t;var n=e.option("hoist_funs"),i=e.option("hoist_vars");if(n||i){var r=[],o=[],a=new Map,s=0,u=0;t.walk(new En(function(e){return e instanceof Ce&&e!==t||(e instanceof et?(++u,!0):void 0)})),i=i&&u>1;var c=new hn(function(u){if(u!==t){if(u instanceof ce)return r.push(u),S(me,u);if(n&&u instanceof xe&&!(c.parent()instanceof ot)&&c.parent()===t)return o.push(u),S(me,u);if(i&&u instanceof et){u.definitions.forEach(function(e){e.name instanceof ke||(a.set(e.name.name,e),++s)});var l=u.to_assignments(e),f=c.parent();if(f instanceof Te&&f.init===u){if(null==l){var p=u.definitions[0].name;return S(Yt,p,p)}return l}return f instanceof ve&&f.init===u?l:l?S(le,u,{body:l}):S(me,u)}if(u instanceof Ce)return u}});if(t=t.transform(c),s>0){var l=[];const e=t instanceof Me,n=e?t.args_as_names():null;if(a.forEach((t,i)=>{e&&n.some(e=>e.name===t.name.name)?a.delete(i):((t=t.clone()).value=null,l.push(t),a.set(i,t))}),l.length>0){for(var f=0;f<t.body.length;){if(t.body[f]instanceof le){var p,_,m=t.body[f].body;if(m instanceof Dt&&"="==m.operator&&(p=m.left)instanceof Rt&&a.has(p.name)){if((E=a.get(p.name)).value)break;E.value=m.right,d(l,E),l.push(E),t.body.splice(f,1);continue}if(m instanceof ct&&(_=m.expressions[0])instanceof Dt&&"="==_.operator&&(p=_.left)instanceof Rt&&a.has(p.name)){var E;if((E=a.get(p.name)).value)break;E.value=_.right,d(l,E),l.push(E),t.body[f].body=A(m,m.expressions.slice(1));continue}}if(t.body[f]instanceof me)t.body.splice(f,1);else{if(!(t.body[f]instanceof de))break;var h=[f,1].concat(t.body[f].body);t.body.splice.apply(t.body,h)}}l=S(et,t,{definitions:l}),o.push(l)}}t.body=r.concat(o,t.body)}return t}),Ce.DEFMETHOD("var_names",function e(){var t=kn.get(this);return t||(t=new Set(this.parent_scope?e.call(this.parent_scope):null),kn.set(this,t),this.enclosed.forEach(function(e){t.add(e.name)}),this.variables.forEach(function(e,n){t.add(n)})),t}),Ce.DEFMETHOD("make_var_name",function(e){for(var t=this.var_names(),n=e=e.replace(/(?:^[^a-z_$]|[^a-z0-9_$])/gi,"_"),i=0;t.has(n);i++)n=e+"$"+i;return t.add(n),n}),Ce.DEFMETHOD("hoist_properties",function(e){var t=this;if(!e.option("hoist_props")||e.has_directive("use asm"))return t;var n=t instanceof Oe&&e.top_retain||s,i=new Map,r=new hn(function(o,a){if(o instanceof Qe&&r.parent()instanceof ot)return o;if(o instanceof at){const r=o.name;let l,p;if(r.scope===t&&1!=(l=r.definition()).escaped&&!l.assignments&&!l.direct_access&&!l.single_use&&!e.exposed(l)&&!n(l)&&(p=r.fixed_value())===o.value&&p instanceof At&&p.properties.every(e=>"string"==typeof e.key)){a(o,this);var s=new Map,u=[];return p.properties.forEach(function(e){u.push(S(at,o,{name:c(r,e.key),value:e.value}))}),i.set(l.id,s),f.splice(u)}}else if(o instanceof lt&&o.expression instanceof Yt){const e=i.get(o.expression.definition().id);if(e){const t=e.get(String(V(o.property))),n=S(Yt,o,{name:t.name,scope:o.expression.scope,thedef:t});return n.reference({}),n}}function c(e,n){var i=S(e.CTOR,e,{name:t.make_var_name(e.name+"_"+n),scope:t}),r=t.def_variable(i);return s.set(String(n),r),t.enclosed.push(r),i}});return t.transform(r)}),function(e){function t(e,t,n){var i=e.length;if(!i)return null;for(var r=[],o=!1,a=0;a<i;a++){var s=e[a].drop_side_effect_free(t,n);o|=s!==e[a],s&&(r.push(s),n=!1)}return o?r.length?r:null:e}e(ae,c),e(Qt,l),e(Zt,l),e(st,function(e,n){if(!this.is_expr_pure(e)){if(this.expression.is_call_pure(e)){var i=this.args.slice();return i.unshift(this.expression.expression),(i=t(i,e,n))&&A(this,i)}if(r(this.expression)&&(!this.expression.name||!this.expression.name.definition().references.length)){var o=this.clone();return o.expression.process_expression(!1,e),o}return this}this.pure&&e.warn("Dropping __PURE__ call [{file}:{line},{col}]",this.start);var a=t(this.args,e,n);return a&&A(this,a)}),e(Re,l),e(we,l),e(Ne,l),e(Mt,function(e){return this.extends?this.extends.drop_side_effect_free(e):null}),e(Et,function(e,t){var n=this.right.drop_side_effect_free(e);if(!n)return this.left.drop_side_effect_free(e,t);if(B.has(this.operator)){if(n===this.right)return this;var i=this.clone();return i.right=n,i}var r=this.left.drop_side_effect_free(e,t);return r?A(this,[r,n]):this.right.drop_side_effect_free(e,t)}),e(Dt,function(e){var t=this.left;if(t.has_side_effects(e)||e.has_directive("use strict")&&t instanceof lt&&t.expression.is_constant())return this;for(Bn.add(this);t instanceof lt;)t=t.expression;return t.is_constant_expression(e.find_parent(Ce))?this.right.drop_side_effect_free(e):this}),e(ht,function(e){var t=this.consequent.drop_side_effect_free(e),n=this.alternative.drop_side_effect_free(e);if(t===this.consequent&&n===this.alternative)return this;if(!t)return n?S(Et,this,{operator:"||",left:this.condition,right:n}):this.condition.drop_side_effect_free(e);if(!n)return S(Et,this,{operator:"&&",left:this.condition,right:t});var i=this.clone();return i.consequent=t,i.alternative=n,i}),e(_t,function(e,t){if(K.has(this.operator))return this.expression.has_side_effects(e)?Bn.delete(this):Bn.add(this),this;if("typeof"==this.operator&&this.expression instanceof Yt)return null;var n=this.expression.drop_side_effect_free(e,t);return t&&n&&M(n)?n===this.expression&&"!"==this.operator?this:n.negate(e,t):n}),e(Yt,function(e){return this.is_declared(e)?null:this}),e(At,function(e,n){var i=t(this.properties,e,n);return i&&A(this,i)}),e(vt,function(e,t){const n=this instanceof Tt&&this.key instanceof ae&&this.key.drop_side_effect_free(e,t),i=this.value.drop_side_effect_free(e,t);return n&&i?A(this,[n,i]):n||i}),e(St,function(e,n){var i=t(this.elements,e,n);return i&&A(this,i)}),e(ft,function(e,t){return this.expression.may_throw_on_access(e)?this:this.expression.drop_side_effect_free(e,t)}),e(pt,function(e,t){if(this.expression.may_throw_on_access(e))return this;var n=this.expression.drop_side_effect_free(e,t);if(!n)return this.property.drop_side_effect_free(e,t);var i=this.property.drop_side_effect_free(e);return i?A(this,[n,i]):n}),e(ct,function(e){var t=this.tail_node(),n=t.drop_side_effect_free(e);if(n===t)return this;var i=this.expressions.slice(0,-1);return n&&i.push(n),A(this,i)}),e(Fe,function(e,t){return this.expression.drop_side_effect_free(e,t)}),e(Ve,l),e(Le,function(e){var n=t(this.segments,e,An);return n&&A(this,n)})}(function(e,t){e.DEFMETHOD("drop_side_effect_free",t)});var ne=["Number","String","Array","Object","Function","Promise","global","window","document","location"];function re(e,t){var n=!1,i=new En(function(t){return!!(n||t instanceof Ce)||(t instanceof Ge&&i.loopcontrol_target(t)===e?n=!0:void 0)});return t instanceof he&&i.push(t),i.push(e),e.body.walk(i),n}function oe(e,t){return t.top_retain&&e instanceof xe&&t.top_nodes.has(e)&&e.name&&t.top_retain(e.name)}e(le,function(e,t){if(e.body instanceof Yt&&-1!==ne.indexOf(e.body.name))return S(me,e);if(t.option("side_effects")){var n=e.body,i=n.drop_side_effect_free(t,!0);if(!i)return t.warn("Dropping side-effect-free statement [{file}:{line},{col}]",e.start),S(me,e);if(i!==n)return S(le,e,{body:i})}return e}),e(Ae,function(e,t){return t.option("loops")?S(ve,e,e).optimize(t):e}),e(Se,function(e,t){if(!t.option("loops"))return e;var n=e.condition.tail_node().evaluate(t);if(!(n instanceof ae)){if(n)return S(ve,e,{body:S(de,e.body,{body:[e.body,S(le,e.condition,{body:e.condition})]})}).optimize(t);if(!re(e,t.parent()))return S(de,e.body,{body:[e.body,S(le,e.condition,{body:e.condition})]}).optimize(t)}return e}),e(ve,function(e,t){if(!t.option("loops"))return e;if(t.option("side_effects")&&e.init&&(e.init=e.init.drop_side_effect_free(t)),e.condition){var n=e.condition.evaluate(t);if(!(n instanceof ae))if(n)e.condition=null;else if(!t.option("dead_code")){var i=e.condition;e.condition=v(n,e.condition),e.condition=G(e.condition.transform(t),i)}if(t.option("dead_code")&&(n instanceof ae&&(n=e.condition.tail_node().evaluate(t)),!n)){var r=[];return L(t,e.body,r),e.init instanceof se?r.push(e.init):e.init&&r.push(S(le,e.init,{body:e.init})),r.push(S(le,e.condition,{body:e.condition})),S(de,e,{body:r}).optimize(t)}}return function e(t,n){var i=t.body instanceof de?t.body.body[0]:t.body;if(n.option("dead_code")&&o(i)){var r=[];return t.init instanceof se?r.push(t.init):t.init&&r.push(S(le,t.init,{body:t.init})),t.condition&&r.push(S(le,t.condition,{body:t.condition})),L(n,t.body,r),S(de,t,{body:r})}return i instanceof ze&&(o(i.body)?(t.condition?t.condition=S(Et,t.condition,{left:t.condition,operator:"&&",right:i.condition.negate(n)}):t.condition=i.condition.negate(n),a(i.alternative)):o(i.alternative)&&(t.condition?t.condition=S(Et,t.condition,{left:t.condition,operator:"&&",right:i.condition}):t.condition=i.condition,a(i.body))),t;function o(e){return e instanceof He&&n.loopcontrol_target(e)===n.self()}function a(i){i=y(i),t.body instanceof de?(t.body=t.body.clone(),t.body.body=i.concat(t.body.body.slice(1)),t.body=t.body.transform(n)):t.body=S(de,t.body,{body:i}).transform(n),t=e(t,n)}}(e,t)}),e(ze,function(e,t){if(C(e.alternative)&&(e.alternative=null),!t.option("conditionals"))return e;var n=e.condition.evaluate(t);if(!(t.option("dead_code")||n instanceof ae)){var i=e.condition;e.condition=v(n,i),e.condition=G(e.condition.transform(t),i)}if(t.option("dead_code")){if(n instanceof ae&&(n=e.condition.tail_node().evaluate(t)),!n){t.warn("Condition always false [{file}:{line},{col}]",e.condition.start);var r=[];return L(t,e.body,r),r.push(S(le,e.condition,{body:e.condition})),e.alternative&&r.push(e.alternative),S(de,e,{body:r}).optimize(t)}if(!(n instanceof ae))return t.warn("Condition always true [{file}:{line},{col}]",e.condition.start),(r=[]).push(S(le,e.condition,{body:e.condition})),r.push(e.body),e.alternative&&L(t,e.alternative,r),S(de,e,{body:r}).optimize(t)}var o=e.condition.negate(t),a=e.condition.print_to_string().length,s=o.print_to_string().length,u=s<a;if(e.alternative&&u){u=!1,e.condition=o;var c=e.body;e.body=e.alternative||S(me,e),e.alternative=c}if(C(e.body)&&C(e.alternative))return S(le,e.condition,{body:e.condition.clone()}).optimize(t);if(e.body instanceof le&&e.alternative instanceof le)return S(le,e,{body:S(ht,e,{condition:e.condition,consequent:e.body.body,alternative:e.alternative.body})}).optimize(t);if(C(e.alternative)&&e.body instanceof le)return a===s&&!u&&e.condition instanceof Et&&"||"==e.condition.operator&&(u=!0),u?S(le,e,{body:S(Et,e,{operator:"||",left:o,right:e.body.body})}).optimize(t):S(le,e,{body:S(Et,e,{operator:"&&",left:e.condition,right:e.body.body})}).optimize(t);if(e.body instanceof me&&e.alternative instanceof le)return S(le,e,{body:S(Et,e,{operator:"||",left:e.condition,right:e.alternative.body})}).optimize(t);if(e.body instanceof Be&&e.alternative instanceof Be&&e.body.TYPE==e.alternative.TYPE)return S(e.body.CTOR,e,{value:S(ht,e,{condition:e.condition,consequent:e.body.value||S(un,e.body),alternative:e.alternative.value||S(un,e.alternative)}).transform(t)}).optimize(t);if(e.body instanceof ze&&!e.body.alternative&&!e.alternative&&(e=S(ze,e,{condition:S(Et,e.condition,{operator:"&&",left:e.condition,right:e.body.condition}),body:e.body.body,alternative:null})),J(e.body)&&e.alternative){var l=e.alternative;return e.alternative=null,S(de,e,{body:[e,l]}).optimize(t)}if(J(e.alternative)){r=e.body;return e.body=e.alternative,e.condition=u?o:e.condition.negate(t),e.alternative=null,S(de,e,{body:[e,r]}).optimize(t)}return e}),e(We,function(e,t){if(!t.option("switches"))return e;var n,i=e.expression.evaluate(t);if(!(i instanceof ae)){var r=e.expression;e.expression=v(i,r),e.expression=G(e.expression.transform(t),r)}if(!t.option("dead_code"))return e;i instanceof ae&&(i=e.expression.tail_node().evaluate(t));for(var o,a,s=[],u=[],c=0,l=e.body.length;c<l&&!a;c++){if((n=e.body[c])instanceof qe)o?D(n,u[u.length-1]):o=n;else if(!(i instanceof ae)){if(!((E=n.expression.evaluate(t))instanceof ae)&&E!==i){D(n,u[u.length-1]);continue}if(E instanceof ae&&(E=n.expression.tail_node().evaluate(t)),E===i&&(a=n,o)){var f=u.indexOf(o);u.splice(f,1),D(o,u[f-1]),o=null}}if(J(n)){var p=u[u.length-1];J(p)&&p.body.length==n.body.length&&S(de,p,p).equivalent_to(S(de,n,n))&&(p.body=[])}u.push(n)}for(;c<l;)D(e.body[c++],u[u.length-1]);for(u.length>0&&(u[0].body=s.concat(u[0].body)),e.body=u;n=u[u.length-1];){var _=n.body[n.body.length-1];if(_ instanceof He&&t.loopcontrol_target(_)===e&&n.body.pop(),n.body.length||n instanceof $e&&(o||n.expression.has_side_effects(t)))break;u.pop()===o&&(o=null)}if(0==u.length)return S(de,e,{body:s.concat(S(le,e.expression,{body:e.expression}))}).optimize(t);if(1==u.length&&(u[0]===a||u[0]===o)){var d=!1,m=new En(function(t){if(d||t instanceof Me||t instanceof le)return!0;t instanceof He&&m.loopcontrol_target(t)===e&&(d=!0)});if(e.walk(m),!d){var E,h=u[0].body.slice();return(E=u[0].expression)&&h.unshift(S(le,E,{body:E})),h.unshift(S(le,e.expression,{body:e.expression})),S(de,e,{body:h}).optimize(t)}}return e;function D(e,n){n&&!J(n)?n.body=n.body.concat(e.body):L(t,e,s)}}),e(je,function(e,t){if(I(e.body,t),e.bcatch&&e.bfinally&&e.bfinally.body.every(C)&&(e.bfinally=null),t.option("dead_code")&&e.body.every(C)){var n=[];return e.bcatch&&L(t,e.bcatch,n),e.bfinally&&n.push(...e.bfinally.body),S(de,e,{body:n}).optimize(t)}return e}),Qe.DEFMETHOD("remove_initializers",function(){var e=[];this.definitions.forEach(function(t){t.name instanceof Nt?(t.value=null,e.push(t)):t.name.walk(new En(function(n){n instanceof Nt&&e.push(S(at,t,{name:n,value:null}))}))}),this.definitions=e}),Qe.DEFMETHOD("to_assignments",function(e){var t=e.option("reduce_vars"),n=this.definitions.reduce(function(e,n){if(!n.value||n.name instanceof ke){if(n.value){var i=S(at,n,{name:n.name,value:n.value}),r=S(et,n,{definitions:[i]});e.push(r)}}else{var o=S(Yt,n.name,n.name);e.push(S(Dt,n,{operator:"=",left:o,right:n.value})),t&&(o.definition().fixed=!1)}return(n=n.name.definition()).eliminated++,n.replaced--,e},[]);return 0==n.length?null:A(this,n)}),e(Qe,function(e,t){return 0==e.definitions.length?S(me,e):e}),e(rt,function(e,t){return e}),e(st,function(e,t){var n=e.expression,i=n;Ut(e,t,e.args);var o=e.args.every(e=>!(e instanceof Fe));if(t.option("reduce_vars")&&i instanceof Yt){const e=i.fixed_value();oe(e,t)||(i=e)}var a=i instanceof Me;if(t.option("unused")&&o&&a&&!i.uses_arguments&&!i.pinned()){for(var s=0,u=0,c=0,l=e.args.length;c<l;c++){if(i.argnames[c]instanceof Fe){if(xn.has(i.argnames[c].expression))for(;c<l;){(g=e.args[c++].drop_side_effect_free(t))&&(e.args[s++]=g)}else for(;c<l;)e.args[s++]=e.args[c++];u=s;break}var f=c>=i.argnames.length;if(f||xn.has(i.argnames[c])){if(g=e.args[c].drop_side_effect_free(t))e.args[s++]=g;else if(!f){e.args[s++]=S(tn,e.args[c],{value:0});continue}}else e.args[s++]=e.args[c];u=s}e.args.length=u}if(t.option("unsafe"))if(R(n))switch(n.name){case"Array":if(1!=e.args.length)return S(St,e,{elements:e.args}).optimize(t);if(e.args[0]instanceof tn&&e.args[0].value<=11){const t=[];for(let n=0;n<e.args[0].value;n++)t.push(new cn);return new St({elements:t})}break;case"Object":if(0==e.args.length)return S(At,e,{properties:[]});break;case"String":if(0==e.args.length)return S(en,e,{value:""});if(e.args.length<=1)return S(Et,e,{left:e.args[0],operator:"+",right:S(en,e,{value:""})}).optimize(t);break;case"Number":if(0==e.args.length)return S(tn,e,{value:0});if(1==e.args.length)return S(dt,e,{expression:e.args[0],operator:"+"}).optimize(t);case"Boolean":if(0==e.args.length)return S(pn,e);if(1==e.args.length)return S(dt,e,{expression:S(dt,e,{expression:e.args[0],operator:"!"}),operator:"!"}).optimize(t);break;case"RegExp":var p=[];if(e.args.length>=1&&e.args.length<=2&&e.args.every(e=>{var n=e.evaluate(t);return p.push(n),e!==n}))try{return X(t,e,S(rn,e,{value:new RegExp(...p)}))}catch(n){t.warn("Error converting {expr} [{file}:{line},{col}]",{expr:e.print_to_string(),file:e.start.file,line:e.start.line,col:e.start.col})}}else if(n instanceof ft)switch(n.property){case"toString":if(0==e.args.length&&!n.expression.may_throw_on_access(t))return S(Et,e,{left:S(en,e,{value:""}),operator:"+",right:n.expression}).optimize(t);break;case"join":if(n.expression instanceof St)e:{var _;if(!(e.args.length>0&&(_=e.args[0].evaluate(t))===e.args[0])){var d,m=[],E=[];for(c=0,l=n.expression.elements.length;c<l;c++){var h=n.expression.elements[c];if(h instanceof Fe)break e;var D=h.evaluate(t);D!==h?E.push(D):(E.length>0&&(m.push(S(en,e,{value:E.join(_)})),E.length=0),m.push(h))}return E.length>0&&m.push(S(en,e,{value:E.join(_)})),0==m.length?S(en,e,{value:""}):1==m.length?m[0].is_string(t)?m[0]:S(Et,m[0],{operator:"+",left:S(en,e,{value:""}),right:m[0]}):""==_?(d=m[0].is_string(t)||m[1].is_string(t)?m.shift():S(en,e,{value:""}),m.reduce(function(e,t){return S(Et,t,{operator:"+",left:e,right:t})},d).optimize(t)):((g=e.clone()).expression=g.expression.clone(),g.expression.expression=g.expression.expression.clone(),g.expression.expression.elements=m,X(t,e,g));var g}}break;case"charAt":if(n.expression.is_string(t)){var T=e.args[0],b=T?T.evaluate(t):0;if(b!==T)return S(pt,n,{expression:n.expression,property:v(0|b,T||n)}).optimize(t)}break;case"apply":if(2==e.args.length&&e.args[1]instanceof St)return(P=e.args[1].elements.slice()).unshift(e.args[0]),S(st,e,{expression:S(ft,n,{expression:n.expression,property:"call"}),args:P}).optimize(t);break;case"call":var y=n.expression;if(y instanceof Yt&&(y=y.fixed_value()),y instanceof Me&&!y.contains_this())return(e.args.length?A(this,[e.args[0],S(st,e,{expression:n.expression,args:e.args.slice(1)})]):S(st,e,{expression:n.expression,args:[]})).optimize(t)}if(t.option("unsafe_Function")&&R(n)&&"Function"==n.name){if(0==e.args.length)return S(we,e,{argnames:[],body:[]}).optimize(t);if(e.args.every(e=>e instanceof en))try{var O=ie(k="n(function("+e.args.slice(0,-1).map(function(e){return e.value}).join(",")+"){"+e.args[e.args.length-1].value+"})"),F={ie8:t.option("ie8")};O.figure_out_scope(F);var w,N=new Kn(t.options);(O=O.transform(N)).figure_out_scope(F),Nn.reset(),O.compute_char_frequency(F),O.mangle_names(F),O.walk(new En(function(e){return!!w||(r(e)?(w=e,!0):void 0)})),w.body instanceof ae&&(w.body=[S(Ke,w.body,{value:w.body})]);var k=Cn();return de.prototype._codegen.call(w,w,k),e.args=[S(en,e,{value:w.argnames.map(function(e){return e.print_to_string()}).join(",")}),S(en,e.args[e.args.length-1],{value:k.get().replace(/^{|}$/g,"")})],e}catch(n){if(!(n instanceof Y))throw n;t.warn("Error parsing code passed to new Function [{file}:{line},{col}]",e.args[e.args.length-1].start),t.warn(n.toString())}}var I=a&&i.body;I instanceof ae?I=S(Ke,I,{value:I}):I&&(I=I[0]);var L=a&&!i.is_generator&&!i.async,V=L&&t.option("inline")&&!e.is_expr_pure(t);if(V&&I instanceof Ke){let n=I.value;if(!n||n.is_constant_expression()){n=n?n.clone(!0):S(un,e);var P=e.args.concat(n);return A(e,P).optimize(t)}}if(V){var B,K,U=-1;let r,a;if(o&&!i.uses_arguments&&!i.pinned()&&!(t.parent()instanceof Ot)&&!(i.name&&i instanceof we)&&(!(t.find_parent(Me)instanceof Ne)||0==i.argnames.length&&(i.body instanceof ae||1==i.body.length))&&(a=function(e){var n=i.body instanceof ae?[i.body]:i.body,r=n.length;if(t.option("inline")<3)return 1==r&&H(e);e=null;for(var o=0;o<r;o++){var a=n[o];if(a instanceof et){if(e&&!a.definitions.every(e=>!e.value))return!1}else{if(e)return!1;a instanceof me||(e=a)}}return H(e)}(I))&&(n===i||t.option("unused")&&1==(r=n.definition()).references.length&&!Ee(t,r)&&i.is_constant_expression(n.scope))&&!e.pure&&!i.contains_this()&&function(){var n=new Set;do{if(!(B=t.parent(++U)).is_block_scope()||t.parent(U-1)instanceof Ce||B.block_scope&&B.block_scope.variables.forEach(function(e){n.add(e.name)}),B instanceof Ze)B.argname&&n.add(B.argname.name);else if(B instanceof De)K=[];else if(B instanceof Yt&&B.fixed_value()instanceof Ce)return!1}while(!(B instanceof Ce)||B instanceof Ne);var r=!(B instanceof Oe)||t.toplevel.vars,o=t.option("inline");return!!function(e,t){for(var n=i.body.length,r=0;r<n;r++){var o=i.body[r];if(o instanceof et){if(!t)return!1;for(var a=o.definitions.length;--a>=0;){var s=o.definitions[a].name;if(s instanceof ke||e.has(s.name)||x.has(s.name)||B.var_names().has(s.name))return!1;K&&K.push(s.definition())}}}return!0}(n,o>=3&&r)&&(!!function(e,t){for(var n=0,r=i.argnames.length;n<r;n++){var o=i.argnames[n];if(o instanceof gt){if(xn.has(o.left))continue;return!1}if(o instanceof ke)return!1;if(o instanceof Fe){if(xn.has(o.expression))continue;return!1}if(!xn.has(o)){if(!t||e.has(o.name)||x.has(o.name)||B.var_names().has(o.name))return!1;K&&K.push(o.definition())}}return!0}(n,o>=2&&r)&&(!!function(){var t=new Set,n=new En(function(e){if(e instanceof Ce){var n=new Set;return e.enclosed.forEach(function(e){n.add(e.name)}),e.variables.forEach(function(e){n.delete(e)}),n.forEach(function(e){t.add(e)}),!0}return!1});if(e.args.forEach(function(e){e.walk(n)}),0==t.size)return!0;for(var r=0,o=i.argnames.length;r<o;r++){var a=i.argnames[r];if(!(a instanceof gt&&xn.has(a.left))&&(!(a instanceof Fe&&xn.has(a.expression))&&!xn.has(a)&&t.has(a.name)))return!1}for(r=0,o=i.body.length;r<o;r++){var s=i.body[r];if(s instanceof et)for(var u=s.definitions.length;--u>=0;){var c=s.definitions[u].name;if(c instanceof ke||t.has(c.name))return!1}}return!0}()&&(!K||0==K.length||!Ue(i,K))))}()&&!(B instanceof Ot))return t.squeezed_nodes.add(i),A(e,function(n){var r=[],o=[];(function(t,n){for(var r=i.argnames.length,o=e.args.length;--o>=r;)n.push(e.args[o]);for(o=r;--o>=0;){var a=i.argnames[o],s=e.args[o];if(xn.has(a)||!a.name||B.var_names().has(a.name))s&&n.push(s);else{var u=S(xt,a,a);a.definition().orig.push(u),!s&&K&&(s=S(un,e)),z(t,n,u,s)}}t.reverse(),n.reverse()})(r,o),function(e,t){for(var n=t.length,r=0,o=i.body.length;r<o;r++){var a=i.body[r];if(a instanceof et)for(var s=0,u=a.definitions.length;s<u;s++){var c=a.definitions[s],l=c.name;if(z(e,t,l,c.value),K&&i.argnames.every(e=>e.name!=l.name)){var f=i.variables.get(l.name),p=S(Yt,l,l);f.references.push(p),t.splice(n++,0,S(Dt,c,{operator:"=",left:p,right:S(un,l)}))}}}}(r,o),o.push(n),r.length&&(c=B.body.indexOf(t.parent(U-1))+1,B.body.splice(c,0,S(et,i,{definitions:r})));return o.map(e=>e.clone(!0))}(a)).optimize(t)}if(L&&t.option("side_effects")&&!(i.body instanceof ae)&&i.body.every(C)){P=e.args.concat(S(un,e));return A(e,P).optimize(t)}if(t.option("negate_iife")&&t.parent()instanceof le&&M(e))return e.negate(t,!0);var G=e.evaluate(t);return G!==e?(G=v(G,e).optimize(t),X(t,G,e)):e;function H(t){return t?t instanceof Ke?t.value?t.value.clone(!0):S(un,e):t instanceof le?S(dt,t,{operator:"void",expression:t.body.clone(!0)}):void 0:S(un,e)}function z(t,n,i,r){var o=i.definition();B.variables.set(i.name,o),B.enclosed.push(o),B.var_names().has(i.name)||(B.var_names().add(i.name),t.push(S(at,i,{name:i,value:null})));var a=S(Yt,i,i);o.references.push(a),r&&n.push(S(Dt,e,{operator:"=",left:a,right:r.clone()}))}}),e(ut,function(e,t){return t.option("unsafe")&&R(e.expression)&&["Object","RegExp","Function","Error","Array"].includes(e.expression.name)?S(st,e,e).transform(t):e}),e(ct,function(e,t){if(!t.option("side_effects"))return e;var n,i,r=[];n=An(t),i=e.expressions.length-1,e.expressions.forEach(function(e,o){o<i&&(e=e.drop_side_effect_free(t,n)),e&&(b(r,e),n=!1)});var o=r.length-1;return function(){for(;o>0&&P(r[o],t);)o--;o<r.length-1&&(r[o]=S(dt,e,{operator:"void",expression:r[o]}),r.length=o+1)}(),0==o?((e=T(t.parent(),t.self(),r[0]))instanceof ct||(e=e.optimize(t)),e):(e.expressions=r,e)}),_t.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")&&this.expression instanceof ct){var t=this.expression.expressions.slice(),n=this.clone();return n.expression=t.pop(),t.push(n),A(this,t).optimize(e)}return this}),e(mt,function(e,t){return e.lift_sequences(t)}),e(dt,function(e,t){var n=e.expression;if("delete"==e.operator&&!(n instanceof Yt||n instanceof lt||k(n)))return n instanceof ct?((n=n.expressions.slice()).push(S(_n,e)),A(e,n).optimize(t)):A(e,[n,S(_n,e)]).optimize(t);var i=e.lift_sequences(t);if(i!==e)return i;if(t.option("side_effects")&&"void"==e.operator)return(n=n.drop_side_effect_free(t))?(e.expression=n,e):S(un,e).optimize(t);if(t.in_boolean_context())switch(e.operator){case"!":if(n instanceof dt&&"!"==n.operator)return n.expression;n instanceof Et&&(e=X(t,e,n.negate(t,An(t))));break;case"typeof":return t.warn("Boolean expression always true [{file}:{line},{col}]",e.start),(n instanceof Yt?S(_n,e):A(e,[n,S(_n,e)])).optimize(t)}if("-"==e.operator&&n instanceof ln&&(n=n.transform(t)),n instanceof Et&&("+"==e.operator||"-"==e.operator)&&("*"==n.operator||"/"==n.operator||"%"==n.operator))return S(Et,e,{operator:n.operator,left:S(dt,n.left,{operator:e.operator,expression:n.left}),right:n.right});if("-"!=e.operator||!(n instanceof tn||n instanceof ln||n instanceof nn)){var r=e.evaluate(t);if(r!==e)return X(t,r=v(r,e).optimize(t),e)}return e}),Et.DEFMETHOD("lift_sequences",function(e){if(e.option("sequences")){if(this.left instanceof ct){var t=this.left.expressions.slice();return(n=this.clone()).left=t.pop(),t.push(n),A(this,t).optimize(e)}if(this.right instanceof ct&&!this.left.has_side_effects(e)){for(var n,i="="==this.operator&&this.left instanceof Yt,r=(t=this.right.expressions).length-1,o=0;o<r&&(i||!t[o].has_side_effects(e));o++);if(o==r)return t=t.slice(),(n=this.clone()).right=t.pop(),t.push(n),A(this,t).optimize(e);if(o>0)return(n=this.clone()).right=A(this.right,t.slice(o)),(t=t.slice(0,o)).push(n),A(this,t).optimize(e)}}return this});var pe=E("== === != !== * & | ^");function Ee(e,t){for(var n,i=0;n=e.parent(i);i++)if(n instanceof Me){var r=n.name;if(r&&r.definition()===t)break}return n}function be(e,t){return e instanceof Yt||e.TYPE===t.TYPE}function Ue(e,t){var n=!1,r=new En(function(e){return!!n||(e instanceof Yt&&i(e.definition(),t)?n=!0:void 0)}),o=new En(function(t){if(n)return!0;if(t instanceof Ce&&t!==e){var i=o.parent();if(i instanceof st&&i.expression===t)return;return t.walk(r),!0}});return e.walk(o),n}e(Et,function(e,t){function n(){return e.left.is_constant()||e.right.is_constant()||!e.left.has_side_effects(t)&&!e.right.has_side_effects(t)}function i(t){if(n()){t&&(e.operator=t);var i=e.left;e.left=e.right,e.right=i}}if(pe.has(e.operator)&&e.right.is_constant()&&!e.left.is_constant()&&(e.left instanceof Et&&te[e.left.operator]>=te[e.operator]||i()),e=e.lift_sequences(t),t.option("comparisons"))switch(e.operator){case"===":case"!==":var r=!0;(e.left.is_string(t)&&e.right.is_string(t)||e.left.is_number(t)&&e.right.is_number(t)||e.left.is_boolean()&&e.right.is_boolean()||e.left.equivalent_to(e.right))&&(e.operator=e.operator.substr(0,2));case"==":case"!=":if(!r&&P(e.left,t))e.left=S(an,e.left);else if(t.option("typeofs")&&e.left instanceof en&&"undefined"==e.left.value&&e.right instanceof dt&&"typeof"==e.right.operator){var o=e.right.expression;(o instanceof Yt?!o.is_declared(t):o instanceof lt&&t.option("ie8"))||(e.right=o,e.left=S(un,e.left).optimize(t),2==e.operator.length&&(e.operator+="="))}else if(e.left instanceof Yt&&e.right instanceof Yt&&e.left.definition()===e.right.definition()&&((u=e.left.fixed_value())instanceof St||u instanceof Me||u instanceof At||u instanceof Ot))return S("="==e.operator[0]?_n:pn,e);break;case"&&":case"||":var a=e.left;if(a.operator==e.operator&&(a=a.right),a instanceof Et&&a.operator==("&&"==e.operator?"!==":"===")&&e.right instanceof Et&&a.operator==e.right.operator&&(P(a.left,t)&&e.right.left instanceof an||a.left instanceof an&&P(e.right.left,t))&&!a.right.has_side_effects(t)&&a.right.equivalent_to(e.right.right)){var s=S(Et,e,{operator:a.operator.slice(0,-1),left:S(an,e),right:a.right});return a!==e.left&&(s=S(Et,e,{operator:e.operator,left:e.left.left,right:s})),s}}var u;if("+"==e.operator&&t.in_boolean_context()){var c=e.left.evaluate(t),l=e.right.evaluate(t);if(c&&"string"==typeof c)return t.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),A(e,[e.right,S(_n,e)]).optimize(t);if(l&&"string"==typeof l)return t.warn("+ in boolean context always true [{file}:{line},{col}]",e.start),A(e,[e.left,S(_n,e)]).optimize(t)}if(t.option("comparisons")&&e.is_boolean()){if(!(t.parent()instanceof Et)||t.parent()instanceof Dt){var f=S(dt,e,{operator:"!",expression:e.negate(t,An(t))});e=X(t,e,f)}if(t.option("unsafe_comps"))switch(e.operator){case"<":i(">");break;case"<=":i(">=")}}if("+"==e.operator){if(e.right instanceof en&&""==e.right.getValue()&&e.left.is_string(t))return e.left;if(e.left instanceof en&&""==e.left.getValue()&&e.right.is_string(t))return e.right;if(e.left instanceof Et&&"+"==e.left.operator&&e.left.left instanceof en&&""==e.left.left.getValue()&&e.right.is_string(t))return e.left=e.left.right,e.transform(t)}if(t.option("evaluate")){switch(e.operator){case"&&":if(!(c=!!In.has(e.left)||!Ln.has(e.left)&&e.left.evaluate(t)))return t.warn("Condition left of && always false [{file}:{line},{col}]",e.start),T(t.parent(),t.self(),e.left).optimize(t);if(!(c instanceof ae))return t.warn("Condition left of && always true [{file}:{line},{col}]",e.start),A(e,[e.left,e.right]).optimize(t);if(l=e.right.evaluate(t)){if(!(l instanceof ae)){if("&&"==(p=t.parent()).operator&&p.left===t.self()||t.in_boolean_context())return t.warn("Dropping side-effect-free && [{file}:{line},{col}]",e.start),e.left.optimize(t)}}else{if(t.in_boolean_context())return t.warn("Boolean && always false [{file}:{line},{col}]",e.start),A(e,[e.left,S(pn,e)]).optimize(t);Ln.add(e)}if("||"==e.left.operator)if(!(_=e.left.right.evaluate(t)))return S(ht,e,{condition:e.left.left,consequent:e.right,alternative:e.left.right}).optimize(t);break;case"||":var p,_;if(!(c=!!In.has(e.left)||!Ln.has(e.left)&&e.left.evaluate(t)))return t.warn("Condition left of || always false [{file}:{line},{col}]",e.start),A(e,[e.left,e.right]).optimize(t);if(!(c instanceof ae))return t.warn("Condition left of || always true [{file}:{line},{col}]",e.start),T(t.parent(),t.self(),e.left).optimize(t);if(l=e.right.evaluate(t)){if(!(l instanceof ae)){if(t.in_boolean_context())return t.warn("Boolean || always true [{file}:{line},{col}]",e.start),A(e,[e.left,S(_n,e)]).optimize(t);In.add(e)}}else if("||"==(p=t.parent()).operator&&p.left===t.self()||t.in_boolean_context())return t.warn("Dropping side-effect-free || [{file}:{line},{col}]",e.start),e.left.optimize(t);if("&&"==e.left.operator)if((_=e.left.right.evaluate(t))&&!(_ instanceof ae))return S(ht,e,{condition:e.left.left,consequent:e.left.right,alternative:e.right}).optimize(t)}var d=!0;switch(e.operator){case"+":if(e.left instanceof Qt&&e.right instanceof Et&&"+"==e.right.operator&&e.right.left instanceof Qt&&e.right.is_string(t)&&(e=S(Et,e,{operator:"+",left:S(en,e.left,{value:""+e.left.getValue()+e.right.left.getValue(),start:e.left.start,end:e.right.left.end}),right:e.right.right})),e.right instanceof Qt&&e.left instanceof Et&&"+"==e.left.operator&&e.left.right instanceof Qt&&e.left.is_string(t)&&(e=S(Et,e,{operator:"+",left:e.left.left,right:S(en,e.right,{value:""+e.left.right.getValue()+e.right.getValue(),start:e.left.right.start,end:e.right.end})})),e.left instanceof Et&&"+"==e.left.operator&&e.left.is_string(t)&&e.left.right instanceof Qt&&e.right instanceof Et&&"+"==e.right.operator&&e.right.left instanceof Qt&&e.right.is_string(t)&&(e=S(Et,e,{operator:"+",left:S(Et,e.left,{operator:"+",left:e.left.left,right:S(en,e.left.right,{value:""+e.left.right.getValue()+e.right.left.getValue(),start:e.left.right.start,end:e.right.left.end})}),right:e.right.right})),e.right instanceof dt&&"-"==e.right.operator&&e.left.is_number(t)){e=S(Et,e,{operator:"-",left:e.left,right:e.right.expression});break}if(e.left instanceof dt&&"-"==e.left.operator&&n()&&e.right.is_number(t)){e=S(Et,e,{operator:"-",left:e.right,right:e.left.expression});break}case"*":d=t.option("unsafe_math");case"&":case"|":case"^":if(e.left.is_number(t)&&e.right.is_number(t)&&n()&&!(e.left instanceof Et&&e.left.operator!=e.operator&&te[e.left.operator]>=te[e.operator])){var m=S(Et,e,{operator:e.operator,left:e.right,right:e.left});e=e.right instanceof Qt&&!(e.left instanceof Qt)?X(t,m,e):X(t,e,m)}d&&e.is_number(t)&&(e.right instanceof Et&&e.right.operator==e.operator&&(e=S(Et,e,{operator:e.operator,left:S(Et,e.left,{operator:e.operator,left:e.left,right:e.right.left,start:e.left.start,end:e.right.left.end}),right:e.right.right})),e.right instanceof Qt&&e.left instanceof Et&&e.left.operator==e.operator&&(e.left.left instanceof Qt?e=S(Et,e,{operator:e.operator,left:S(Et,e.left,{operator:e.operator,left:e.left.left,right:e.right,start:e.left.left.start,end:e.right.end}),right:e.left.right}):e.left.right instanceof Qt&&(e=S(Et,e,{operator:e.operator,left:S(Et,e.left,{operator:e.operator,left:e.left.right,right:e.right,start:e.left.right.start,end:e.right.end}),right:e.left.left}))),e.left instanceof Et&&e.left.operator==e.operator&&e.left.right instanceof Qt&&e.right instanceof Et&&e.right.operator==e.operator&&e.right.left instanceof Qt&&(e=S(Et,e,{operator:e.operator,left:S(Et,e.left,{operator:e.operator,left:S(Et,e.left.left,{operator:e.operator,left:e.left.right,right:e.right.left,start:e.left.right.start,end:e.right.left.end}),right:e.left.left}),right:e.right.right})))}}if(e.right instanceof Et&&e.right.operator==e.operator&&(B.has(e.operator)||"+"==e.operator&&(e.right.left.is_string(t)||e.left.is_string(t)&&e.right.right.is_string(t))))return e.left=S(Et,e.left,{operator:e.operator,left:e.left,right:e.right.left}),e.right=e.right.right,e.transform(t);var E=e.evaluate(t);return E!==e?(E=v(E,e).optimize(t),X(t,E,e)):e}),e(qt,function(e,t){return e}),e(Yt,function(e,t){if(!t.option("ie8")&&R(e)&&(!e.scope.uses_with||!t.find_parent(ye)))switch(e.name){case"undefined":return S(un,e).optimize(t);case"NaN":return S(sn,e).optimize(t);case"Infinity":return S(ln,e).optimize(t)}var n,i=t.parent();if(t.option("reduce_vars")&&U(e,i)!==e){const _=e.definition();if(t.top_retain&&_.global&&t.top_retain(_))return _.fixed=!1,_.should_replace=!1,_.single_use=!1,e;var o=e.fixed_value(),a=_.single_use&&!(i instanceof st&&i.is_expr_pure(t));if(a&&(o instanceof Me||o instanceof Ot))if(oe(o,t))a=!1;else if(_.scope!==e.scope&&(1==_.escaped||Pn.has(o)||function(e){for(var t,n=0;t=e.parent(n++);){if(t instanceof se)return!1;if(t instanceof St||t instanceof Tt||t instanceof At)return!0}return!1}(t)))a=!1;else if(Ee(t,_))a=!1;else if((_.scope!==e.scope||_.orig[0]instanceof Vt)&&"f"==(a=o.is_constant_expression(e.scope))){var s=e.scope;do{(s instanceof xe||r(s))&&Pn.add(s)}while(s=s.parent_scope)}if(a&&o&&(!(o instanceof Me)||_.scope===e.scope||i instanceof st&&i.expression===e)){if(o instanceof Ft&&(o=S(Mt,o,o)),o instanceof xe&&(t.squeezed_nodes.add(o),o=S(we,o,o)),_.recursive_refs>0&&o.name instanceof Pt){const e=o.name.definition();let t=o.variables.get(o.name.name),n=t&&t.orig[0];return n instanceof Kt||((n=S(Kt,o.name,o.name)).scope=o,o.name=n,t=o.def_function(n)),o.walk(new En(function(n){n instanceof Yt&&n.definition()===e&&(n.thedef=t,t.references.push(n))})),o}return o.optimize(t)}if(o&&void 0===_.should_replace){let e;if(o instanceof Zt)_.orig[0]instanceof Vt||!_.references.every(e=>_.scope===e.scope)||(e=o);else{var u=o.evaluate(t);u===o||!t.option("unsafe_regexp")&&u instanceof RegExp||(e=v(u,o))}if(e){var c,l=e.optimize(t).print_to_string().length;o.walk(new En(function(e){if(e instanceof Yt&&(n=!0),n)return!0})),n?c=function(){var n=e.optimize(t);return n===e?n.clone(!0):n}:(l=Math.min(l,o.print_to_string().length),c=function(){var n=G(e.optimize(t),o);return n===e||n===o?n.clone(!0):n});var f=_.name.length,p=0;t.option("unused")&&!t.exposed(_)&&(p=(f+2+l)/(_.references.length-_.assignments)),_.should_replace=l<=f+p&&c}else _.should_replace=!1}if(_.should_replace)return _.should_replace()}return e}),e(un,function(e,t){if(t.option("unsafe_undefined")){var n=m(t,"undefined");if(n){var i=S(Yt,e,{name:"undefined",scope:n.scope,thedef:n});return Vn.add(i),i}}var r=U(t.self(),t.parent());return r&&be(r,e)?e:S(dt,e,{operator:"void",expression:S(tn,e,{value:0})})}),e(ln,function(e,t){var n=U(t.self(),t.parent());return n&&be(n,e)?e:!t.option("keep_infinity")||n&&!be(n,e)||m(t,"Infinity")?S(Et,e,{operator:"/",left:S(tn,e,{value:1}),right:S(tn,e,{value:0})}):e}),e(sn,function(e,t){var n=U(t.self(),t.parent());return n&&!be(n,e)||m(t,"NaN")?S(Et,e,{operator:"/",left:S(tn,e,{value:0}),right:S(tn,e,{value:0})}):e});const it=E("+ - / * % >> << >>> | ^ &"),bt=E("* | ^ &");function wt(e,t){return e instanceof Yt&&(e=e.fixed_value()),!!e&&(!(e instanceof Me||e instanceof Ot)||t.parent()instanceof ut||!e.contains_this())}function Lt(e,t){return t.in_boolean_context()?X(t,e,A(e,[e,S(_n,e)]).optimize(t)):e}function Ut(e,t,n){for(var i=0;i<n.length;i++){var r=n[i];if(r instanceof Fe){var o=r.expression;o instanceof St&&(n.splice.apply(n,[i,1].concat(o.elements)),i--)}}return e}function Gt(e,t){if(!t.option("computed_props"))return e;if(!(e.key instanceof Qt))return e;if(e.key instanceof en||e.key instanceof tn){if("__proto__"===e.key.value)return e;if("constructor"==e.key.value&&t.parent()instanceof Ot)return e;e.key=e instanceof Tt?e.key.value:S(Bt,e.key,{name:e.key.value})}return e}e(Dt,function(e,t){var n;if(t.option("dead_code")&&e.left instanceof Yt&&(n=e.left.definition()).scope===t.find_parent(Me)){var i,r=0,o=e;do{if(i=o,(o=t.parent(r++))instanceof Be){if(a(r,o))break;if(Ue(n.scope,[n]))break;return"="==e.operator?e.right:(n.fixed=!1,S(Et,e,{operator:e.operator.slice(0,-1),left:e.left,right:e.right}).optimize(t))}}while(o instanceof Et&&o.right===i||o instanceof ct&&o.tail_node()===i)}return"="==(e=e.lift_sequences(t)).operator&&e.left instanceof Yt&&e.right instanceof Et&&(e.right.left instanceof Yt&&e.right.left.name==e.left.name&&it.has(e.right.operator)?(e.operator=e.right.operator+"=",e.right=e.right.right):e.right.right instanceof Yt&&e.right.right.name==e.left.name&&bt.has(e.right.operator)&&!e.right.left.has_side_effects(t)&&(e.operator=e.right.operator+"=",e.right=e.right.left)),e;function a(n,i){var r=e.right;e.right=S(an,r);var o=i.may_throw(t);e.right=r;for(var a,s=e.left.definition().scope;(a=t.parent(n++))!==s;)if(a instanceof je){if(a.bfinally)return!0;if(o&&a.bcatch)return!0}}}),e(gt,function(e,t){if(!t.option("evaluate"))return e;var n=e.right.evaluate(t);return void 0===n?e=e.left:n!==e.right&&(n=v(n,e.right),e.right=G(n,e.right)),e}),e(ht,function(e,t){if(!t.option("conditionals"))return e;if(e.condition instanceof ct){var n=e.condition.expressions.slice();return e.condition=n.pop(),n.push(e),A(e,n)}var i=e.condition.evaluate(t);if(i!==e.condition)return i?(t.warn("Condition always true [{file}:{line},{col}]",e.start),T(t.parent(),t.self(),e.consequent)):(t.warn("Condition always false [{file}:{line},{col}]",e.start),T(t.parent(),t.self(),e.alternative));var r=i.negate(t,An(t));X(t,i,r)===r&&(e=S(ht,e,{condition:r,consequent:e.alternative,alternative:e.consequent}));var o,a=e.condition,s=e.consequent,u=e.alternative;if(a instanceof Yt&&s instanceof Yt&&a.definition()===s.definition())return S(Et,e,{operator:"||",left:a,right:u});if(s instanceof Dt&&u instanceof Dt&&s.operator==u.operator&&s.left.equivalent_to(u.left)&&(!e.condition.has_side_effects(t)||"="==s.operator&&!s.left.has_side_effects(t)))return S(Dt,e,{operator:s.operator,left:s.left,right:S(ht,e,{condition:e.condition,consequent:s.right,alternative:u.right})});if(s instanceof st&&u.TYPE===s.TYPE&&s.args.length>0&&s.args.length==u.args.length&&s.expression.equivalent_to(u.expression)&&!e.condition.has_side_effects(t)&&!s.expression.has_side_effects(t)&&"number"==typeof(o=function(){for(var e=s.args,t=u.args,n=0,i=e.length;n<i;n++){if(e[n]instanceof Fe)return;if(!e[n].equivalent_to(t[n])){if(t[n]instanceof Fe)return;for(var r=n+1;r<i;r++){if(e[r]instanceof Fe)return;if(!e[r].equivalent_to(t[r]))return}return n}}}())){var c=s.clone();return c.args[o]=S(ht,e,{condition:e.condition,consequent:s.args[o],alternative:u.args[o]}),c}if(s instanceof ht&&s.alternative.equivalent_to(u))return S(ht,e,{condition:S(Et,e,{left:e.condition,operator:"&&",right:s.condition}),consequent:s.consequent,alternative:u});if(s.equivalent_to(u))return A(e,[e.condition,s]).optimize(t);if(s instanceof Et&&"||"==s.operator&&s.right.equivalent_to(u))return S(Et,e,{operator:"||",left:S(Et,e,{operator:"&&",left:e.condition,right:s.left}),right:u}).optimize(t);var l=t.in_boolean_context();return p(e.consequent)?_(e.alternative)?f(e.condition):S(Et,e,{operator:"||",left:f(e.condition),right:e.alternative}):_(e.consequent)?p(e.alternative)?f(e.condition.negate(t)):S(Et,e,{operator:"&&",left:f(e.condition.negate(t)),right:e.alternative}):p(e.alternative)?S(Et,e,{operator:"||",left:f(e.condition.negate(t)),right:e.consequent}):_(e.alternative)?S(Et,e,{operator:"&&",left:f(e.condition),right:e.consequent}):e;function f(e){return e.is_boolean()?e:S(dt,e,{operator:"!",expression:e.negate(t)})}function p(e){return e instanceof _n||l&&e instanceof Qt&&e.getValue()||e instanceof dt&&"!"==e.operator&&e.expression instanceof Qt&&!e.expression.getValue()}function _(e){return e instanceof pn||l&&e instanceof Qt&&!e.getValue()||e instanceof dt&&"!"==e.operator&&e.expression instanceof Qt&&e.expression.getValue()}}),e(fn,function(e,t){if(t.in_boolean_context())return S(tn,e,{value:+e.value});var n=t.parent();return t.option("booleans_as_integers")?(n instanceof Et&&("==="==n.operator||"!=="==n.operator)&&(n.operator=n.operator.replace(/=$/,"")),S(tn,e,{value:+e.value})):t.option("booleans")?n instanceof Et&&("=="==n.operator||"!="==n.operator)?(t.warn("Non-strict equality against boolean: {operator} {value} [{file}:{line},{col}]",{operator:n.operator,value:e.value,file:n.start.file,line:n.start.line,col:n.start.col}),S(tn,e,{value:+e.value})):S(dt,e,{operator:"!",expression:S(tn,e,{value:1-e.value})}):e}),e(pt,function(e,t){var n,i=e.expression,r=e.property;if(t.option("properties")){var o=r.evaluate(t);if(o!==r){if("string"==typeof o)if("undefined"==o)o=void 0;else(b=parseFloat(o)).toString()==o&&(o=b);r=e.property=G(r,v(o,r).transform(t));var a=""+o;if(W(a)&&a.length<=r.print_to_string().length+1)return S(ft,e,{expression:i,property:a,quote:r.quote}).optimize(t)}}e:if(t.option("arguments")&&i instanceof Yt&&"arguments"==i.name&&1==i.definition().orig.length&&(n=i.scope)instanceof Me&&n.uses_arguments&&!(n instanceof Ne)&&r instanceof tn){for(var s=r.getValue(),u=new Set,c=n.argnames,l=0;l<c.length;l++){if(!(c[l]instanceof Vt))break e;var f=c[l].name;if(u.has(f))break e;u.add(f)}var p=n.argnames[s];if(p&&t.has_directive("use strict")){var _=p.definition();(!t.option("reduce_vars")||_.assignments||_.orig.length>1)&&(p=null)}else if(!p&&!t.option("keep_fargs")&&s<n.argnames.length+5)for(;s>=n.argnames.length;)p=S(Vt,n,{name:n.make_var_name("argument_"+n.argnames.length),scope:n}),n.argnames.push(p),n.enclosed.push(n.def_variable(p));if(p){var d=S(Yt,e,p);return d.reference({}),xn.delete(p),d}}if(U(e,t.parent()))return e;if(o!==r){var m=e.flatten_object(a,t);m&&(i=e.expression=m.expression,r=e.property=m.property)}if(t.option("properties")&&t.option("side_effects")&&r instanceof tn&&i instanceof St){s=r.getValue();var E=i.elements,h=E[s];e:if(wt(h,t)){for(var D=!0,g=[],T=E.length;--T>s;){(b=E[T].drop_side_effect_free(t))&&(g.unshift(b),D&&b.has_side_effects(t)&&(D=!1))}if(h instanceof Fe)break e;for(h=h instanceof cn?S(un,h):h,D||g.unshift(h);--T>=0;){var b;if((b=E[T])instanceof Fe)break e;(b=b.drop_side_effect_free(t))?g.unshift(b):s--}return D?(g.push(h),A(e,g).optimize(t)):S(pt,e,{expression:S(St,i,{elements:g}),property:S(tn,r,{value:s})})}}var y=e.evaluate(t);return y!==e?X(t,y=v(y,e).optimize(t),e):e}),Me.DEFMETHOD("contains_this",function(){var e,t=this;return t.walk(new En(function(n){return!!e||(n instanceof Zt?e=!0:n!==t&&n instanceof Ce&&!(n instanceof Ne)||void 0)})),e}),lt.DEFMETHOD("flatten_object",function(e,t){if(t.option("properties")){var n=t.option("unsafe_arrows")&&t.option("ecma")>=6,i=this.expression;if(i instanceof At)for(var r=i.properties,o=r.length;--o>=0;){var a=r[o];if(""+(a instanceof Ct?a.key.name:a.key)==e){if(!r.every(e=>e instanceof Tt||n&&e instanceof Ct&&!e.is_generator))break;if(!wt(a.value,t))break;return S(pt,this,{expression:S(St,i,{elements:r.map(function(e){var t=e.value;t instanceof Re&&(t=S(we,t,t));var n=e.key;return n instanceof ae&&!(n instanceof Bt)?A(e,[n,t]):t})}),property:S(tn,this,{value:o})})}}}}),e(ft,function(e,t){if("arguments"!=e.property&&"caller"!=e.property||t.warn("Function.prototype.{prop} not supported [{file}:{line},{col}]",{prop:e.property,file:e.start.file,line:e.start.line,col:e.start.col}),U(e,t.parent()))return e;if(t.option("unsafe_proto")&&e.expression instanceof ft&&"prototype"==e.expression.property){var n=e.expression.expression;if(R(n))switch(n.name){case"Array":e.expression=S(St,e.expression,{elements:[]});break;case"Function":e.expression=S(we,e.expression,{argnames:[],body:[]});break;case"Number":e.expression=S(tn,e.expression,{value:0});break;case"Object":e.expression=S(At,e.expression,{properties:[]});break;case"RegExp":e.expression=S(rn,e.expression,{value:/t/});break;case"String":e.expression=S(en,e.expression,{value:""})}}var i=e.flatten_object(e.property,t);if(i)return i.optimize(t);var r=e.evaluate(t);return r!==e?X(t,r=v(r,e).optimize(t),e):e}),e(St,function(e,t){var n=Lt(e,t);return n!==e?n:Ut(e,0,e.elements)}),e(At,function(e,t){var n=Lt(e,t);if(n!==e)return n;for(var i=e.properties,r=0;r<i.length;r++){var o=i[r];if(o instanceof Fe){var a=o.expression;a instanceof At?(i.splice.apply(i,[r,1].concat(o.expression.properties)),r--):a instanceof Qt&&!(a instanceof en)&&i.splice(r,1)}}return e}),e(rn,Lt),e(Ke,function(e,t){return e.value&&P(e.value,t)&&(e.value=null),e}),e(Ne,function(e,t){if(e.body instanceof ae||(e=ee(e,t)),t.option("arrows")&&1==e.body.length&&e.body[0]instanceof Ke){var n=e.body[0].value;e.body=n||[]}return e}),e(we,function(e,t){if(e=ee(e,t),t.option("unsafe_arrows")&&t.option("ecma")>=6&&!e.name&&!e.is_generator&&!e.uses_arguments&&!e.pinned()){var n=!1;if(e.walk(new En(function(e){return!!n||(e instanceof Zt?(n=!0,!0):void 0)})),!n)return S(Ne,e,e).optimize(t)}return e}),e(Ot,function(e,t){return e}),e(mn,function(e,t){return e.expression&&!e.is_star&&P(e.expression,t)&&(e.expression=null),e}),e(Le,function(e,t){if(!t.option("evaluate")||t.parent()instanceof Ie)return e;for(var n=[],i=0;i<e.segments.length;i++){var r=e.segments[i];if(r instanceof ae){var o=r.evaluate(t);if(o!==r&&(o+"").length<=r.print_to_string().length+"${}".length){n[n.length-1].value=n[n.length-1].value+o+e.segments[++i].value;continue}}n.push(r)}return e.segments=n,1==n.length?S(en,e,n[0]):e}),e(Ie,function(e,t){return e}),e(vt,Gt),e(Ct,function(e,t){if(Gt(e,t),t.option("arrows")&&t.parent()instanceof At&&!e.is_generator&&!e.value.uses_arguments&&!e.value.pinned()&&1==e.value.body.length&&e.value.body[0]instanceof Ke&&e.value.body[0].value&&!e.value.contains_this()){var n=S(Ne,e.value,e.value);return n.async=e.async,n.is_generator=e.is_generator,S(Tt,e,{key:e.key instanceof Bt?e.key.name:e.key,value:n,quote:e.quote})}return e}),e(Tt,function(e,t){Gt(e,t);var n=t.option("unsafe_methods");if(n&&t.option("ecma")>=6&&(!(n instanceof RegExp)||n.test(e.key+""))){var i=e.key,r=e.value;if((r instanceof Ne&&Array.isArray(r.body)&&!r.contains_this()||r instanceof we)&&!r.name)return S(Ct,e,{async:r.async,is_generator:r.is_generator,key:i instanceof ae?i:S(Bt,e,{name:i}),value:S(Re,r,r),quote:e.quote})}return e}),e(ke,function(e,t){if(1==t.option("pure_getters")&&t.option("unused")&&!e.is_array&&Array.isArray(e.names)&&!function(e){for(var t=[/^VarDef$/,/^(Const|Let|Var)$/,/^Export$/],n=0,i=0,r=t.length;n<r;i++){var o=e.parent(i);if(!o)return!1;if(0!==n||"Destructuring"!=o.TYPE){if(!t[n].test(o.TYPE))return!1;n++}}return!0}(t)){for(var n=[],i=0;i<e.names.length;i++){var r=e.names[i];r instanceof Tt&&"string"==typeof r.key&&r.value instanceof Nt&&!o(t,r.value.definition())||n.push(r)}n.length!=e.names.length&&(e.names=n)}return e;function o(e,t){return!!t.references.length||!!t.global&&(!e.toplevel.vars||!!e.top_retain&&e.top_retain(t))}})}();var Un=["$&","$'","$*","$+","$1","$2","$3","$4","$5","$6","$7","$8","$9","$_","$`","$input","@@iterator","ABORT_ERR","ACTIVE","ACTIVE_ATTRIBUTES","ACTIVE_TEXTURE","ACTIVE_UNIFORMS","ADDITION","ALIASED_LINE_WIDTH_RANGE","ALIASED_POINT_SIZE_RANGE","ALLOW_KEYBOARD_INPUT","ALLPASS","ALPHA","ALPHA_BITS","ALT_MASK","ALWAYS","ANY_TYPE","ANY_UNORDERED_NODE_TYPE","ARRAY_BUFFER","ARRAY_BUFFER_BINDING","ATTACHED_SHADERS","ATTRIBUTE_NODE","AT_TARGET","AddSearchProvider","AnalyserNode","AnimationEvent","AnonXMLHttpRequest","ApplicationCache","ApplicationCacheErrorEvent","Array","ArrayBuffer","Attr","Audio","AudioBuffer","AudioBufferSourceNode","AudioContext","AudioDestinationNode","AudioListener","AudioNode","AudioParam","AudioProcessingEvent","AudioStreamTrack","AutocompleteErrorEvent","BACK","BAD_BOUNDARYPOINTS_ERR","BANDPASS","BLEND","BLEND_COLOR","BLEND_DST_ALPHA","BLEND_DST_RGB","BLEND_EQUATION","BLEND_EQUATION_ALPHA","BLEND_EQUATION_RGB","BLEND_SRC_ALPHA","BLEND_SRC_RGB","BLUE_BITS","BLUR","BOOL","BOOLEAN_TYPE","BOOL_VEC2","BOOL_VEC3","BOOL_VEC4","BOTH","BROWSER_DEFAULT_WEBGL","BUBBLING_PHASE","BUFFER_SIZE","BUFFER_USAGE","BYTE","BYTES_PER_ELEMENT","BarProp","BaseHref","BatteryManager","BeforeLoadEvent","BeforeUnloadEvent","BiquadFilterNode","Blob","BlobEvent","Boolean","CAPTURING_PHASE","CCW","CDATASection","CDATA_SECTION_NODE","CHANGE","CHARSET_RULE","CHECKING","CLAMP_TO_EDGE","CLICK","CLOSED","CLOSING","COLOR_ATTACHMENT0","COLOR_BUFFER_BIT","COLOR_CLEAR_VALUE","COLOR_WRITEMASK","COMMENT_NODE","COMPILE_STATUS","COMPRESSED_RGBA_S3TC_DXT1_EXT","COMPRESSED_RGBA_S3TC_DXT3_EXT","COMPRESSED_RGBA_S3TC_DXT5_EXT","COMPRESSED_RGB_S3TC_DXT1_EXT","COMPRESSED_TEXTURE_FORMATS","CONNECTING","CONSTANT_ALPHA","CONSTANT_COLOR","CONSTRAINT_ERR","CONTEXT_LOST_WEBGL","CONTROL_MASK","COUNTER_STYLE_RULE","CSS","CSS2Properties","CSSCharsetRule","CSSConditionRule","CSSCounterStyleRule","CSSFontFaceRule","CSSFontFeatureValuesRule","CSSGroupingRule","CSSImportRule","CSSKeyframeRule","CSSKeyframesRule","CSSMediaRule","CSSMozDocumentRule","CSSNameSpaceRule","CSSPageRule","CSSPrimitiveValue","CSSRule","CSSRuleList","CSSStyleDeclaration","CSSStyleRule","CSSStyleSheet","CSSSupportsRule","CSSUnknownRule","CSSValue","CSSValueList","CSSVariablesDeclaration","CSSVariablesRule","CSSViewportRule","CSS_ATTR","CSS_CM","CSS_COUNTER","CSS_CUSTOM","CSS_DEG","CSS_DIMENSION","CSS_EMS","CSS_EXS","CSS_FILTER_BLUR","CSS_FILTER_BRIGHTNESS","CSS_FILTER_CONTRAST","CSS_FILTER_CUSTOM","CSS_FILTER_DROP_SHADOW","CSS_FILTER_GRAYSCALE","CSS_FILTER_HUE_ROTATE","CSS_FILTER_INVERT","CSS_FILTER_OPACITY","CSS_FILTER_REFERENCE","CSS_FILTER_SATURATE","CSS_FILTER_SEPIA","CSS_GRAD","CSS_HZ","CSS_IDENT","CSS_IN","CSS_INHERIT","CSS_KHZ","CSS_MATRIX","CSS_MATRIX3D","CSS_MM","CSS_MS","CSS_NUMBER","CSS_PC","CSS_PERCENTAGE","CSS_PERSPECTIVE","CSS_PRIMITIVE_VALUE","CSS_PT","CSS_PX","CSS_RAD","CSS_RECT","CSS_RGBCOLOR","CSS_ROTATE","CSS_ROTATE3D","CSS_ROTATEX","CSS_ROTATEY","CSS_ROTATEZ","CSS_S","CSS_SCALE","CSS_SCALE3D","CSS_SCALEX","CSS_SCALEY","CSS_SCALEZ","CSS_SKEW","CSS_SKEWX","CSS_SKEWY","CSS_STRING","CSS_TRANSLATE","CSS_TRANSLATE3D","CSS_TRANSLATEX","CSS_TRANSLATEY","CSS_TRANSLATEZ","CSS_UNKNOWN","CSS_URI","CSS_VALUE_LIST","CSS_VH","CSS_VMAX","CSS_VMIN","CSS_VW","CULL_FACE","CULL_FACE_MODE","CURRENT_PROGRAM","CURRENT_VERTEX_ATTRIB","CUSTOM","CW","CanvasGradient","CanvasPattern","CanvasRenderingContext2D","CaretPosition","ChannelMergerNode","ChannelSplitterNode","CharacterData","ClientRect","ClientRectList","Clipboard","ClipboardEvent","CloseEvent","Collator","CommandEvent","Comment","CompositionEvent","Console","Controllers","ConvolverNode","Counter","Crypto","CryptoKey","CustomEvent","DATABASE_ERR","DATA_CLONE_ERR","DATA_ERR","DBLCLICK","DECR","DECR_WRAP","DELETE_STATUS","DEPTH_ATTACHMENT","DEPTH_BITS","DEPTH_BUFFER_BIT","DEPTH_CLEAR_VALUE","DEPTH_COMPONENT","DEPTH_COMPONENT16","DEPTH_FUNC","DEPTH_RANGE","DEPTH_STENCIL","DEPTH_STENCIL_ATTACHMENT","DEPTH_TEST","DEPTH_WRITEMASK","DIRECTION_DOWN","DIRECTION_LEFT","DIRECTION_RIGHT","DIRECTION_UP","DISABLED","DISPATCH_REQUEST_ERR","DITHER","DOCUMENT_FRAGMENT_NODE","DOCUMENT_NODE","DOCUMENT_POSITION_CONTAINED_BY","DOCUMENT_POSITION_CONTAINS","DOCUMENT_POSITION_DISCONNECTED","DOCUMENT_POSITION_FOLLOWING","DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC","DOCUMENT_POSITION_PRECEDING","DOCUMENT_TYPE_NODE","DOMCursor","DOMError","DOMException","DOMImplementation","DOMImplementationLS","DOMMatrix","DOMMatrixReadOnly","DOMParser","DOMPoint","DOMPointReadOnly","DOMQuad","DOMRect","DOMRectList","DOMRectReadOnly","DOMRequest","DOMSTRING_SIZE_ERR","DOMSettableTokenList","DOMStringList","DOMStringMap","DOMTokenList","DOMTransactionEvent","DOM_DELTA_LINE","DOM_DELTA_PAGE","DOM_DELTA_PIXEL","DOM_INPUT_METHOD_DROP","DOM_INPUT_METHOD_HANDWRITING","DOM_INPUT_METHOD_IME","DOM_INPUT_METHOD_KEYBOARD","DOM_INPUT_METHOD_MULTIMODAL","DOM_INPUT_METHOD_OPTION","DOM_INPUT_METHOD_PASTE","DOM_INPUT_METHOD_SCRIPT","DOM_INPUT_METHOD_UNKNOWN","DOM_INPUT_METHOD_VOICE","DOM_KEY_LOCATION_JOYSTICK","DOM_KEY_LOCATION_LEFT","DOM_KEY_LOCATION_MOBILE","DOM_KEY_LOCATION_NUMPAD","DOM_KEY_LOCATION_RIGHT","DOM_KEY_LOCATION_STANDARD","DOM_VK_0","DOM_VK_1","DOM_VK_2","DOM_VK_3","DOM_VK_4","DOM_VK_5","DOM_VK_6","DOM_VK_7","DOM_VK_8","DOM_VK_9","DOM_VK_A","DOM_VK_ACCEPT","DOM_VK_ADD","DOM_VK_ALT","DOM_VK_ALTGR","DOM_VK_AMPERSAND","DOM_VK_ASTERISK","DOM_VK_AT","DOM_VK_ATTN","DOM_VK_B","DOM_VK_BACKSPACE","DOM_VK_BACK_QUOTE","DOM_VK_BACK_SLASH","DOM_VK_BACK_SPACE","DOM_VK_C","DOM_VK_CANCEL","DOM_VK_CAPS_LOCK","DOM_VK_CIRCUMFLEX","DOM_VK_CLEAR","DOM_VK_CLOSE_BRACKET","DOM_VK_CLOSE_CURLY_BRACKET","DOM_VK_CLOSE_PAREN","DOM_VK_COLON","DOM_VK_COMMA","DOM_VK_CONTEXT_MENU","DOM_VK_CONTROL","DOM_VK_CONVERT","DOM_VK_CRSEL","DOM_VK_CTRL","DOM_VK_D","DOM_VK_DECIMAL","DOM_VK_DELETE","DOM_VK_DIVIDE","DOM_VK_DOLLAR","DOM_VK_DOUBLE_QUOTE","DOM_VK_DOWN","DOM_VK_E","DOM_VK_EISU","DOM_VK_END","DOM_VK_ENTER","DOM_VK_EQUALS","DOM_VK_EREOF","DOM_VK_ESCAPE","DOM_VK_EXCLAMATION","DOM_VK_EXECUTE","DOM_VK_EXSEL","DOM_VK_F","DOM_VK_F1","DOM_VK_F10","DOM_VK_F11","DOM_VK_F12","DOM_VK_F13","DOM_VK_F14","DOM_VK_F15","DOM_VK_F16","DOM_VK_F17","DOM_VK_F18","DOM_VK_F19","DOM_VK_F2","DOM_VK_F20","DOM_VK_F21","DOM_VK_F22","DOM_VK_F23","DOM_VK_F24","DOM_VK_F25","DOM_VK_F26","DOM_VK_F27","DOM_VK_F28","DOM_VK_F29","DOM_VK_F3","DOM_VK_F30","DOM_VK_F31","DOM_VK_F32","DOM_VK_F33","DOM_VK_F34","DOM_VK_F35","DOM_VK_F36","DOM_VK_F4","DOM_VK_F5","DOM_VK_F6","DOM_VK_F7","DOM_VK_F8","DOM_VK_F9","DOM_VK_FINAL","DOM_VK_FRONT","DOM_VK_G","DOM_VK_GREATER_THAN","DOM_VK_H","DOM_VK_HANGUL","DOM_VK_HANJA","DOM_VK_HASH","DOM_VK_HELP","DOM_VK_HK_TOGGLE","DOM_VK_HOME","DOM_VK_HYPHEN_MINUS","DOM_VK_I","DOM_VK_INSERT","DOM_VK_J","DOM_VK_JUNJA","DOM_VK_K","DOM_VK_KANA","DOM_VK_KANJI","DOM_VK_L","DOM_VK_LEFT","DOM_VK_LEFT_TAB","DOM_VK_LESS_THAN","DOM_VK_M","DOM_VK_META","DOM_VK_MODECHANGE","DOM_VK_MULTIPLY","DOM_VK_N","DOM_VK_NONCONVERT","DOM_VK_NUMPAD0","DOM_VK_NUMPAD1","DOM_VK_NUMPAD2","DOM_VK_NUMPAD3","DOM_VK_NUMPAD4","DOM_VK_NUMPAD5","DOM_VK_NUMPAD6","DOM_VK_NUMPAD7","DOM_VK_NUMPAD8","DOM_VK_NUMPAD9","DOM_VK_NUM_LOCK","DOM_VK_O","DOM_VK_OEM_1","DOM_VK_OEM_102","DOM_VK_OEM_2","DOM_VK_OEM_3","DOM_VK_OEM_4","DOM_VK_OEM_5","DOM_VK_OEM_6","DOM_VK_OEM_7","DOM_VK_OEM_8","DOM_VK_OEM_COMMA","DOM_VK_OEM_MINUS","DOM_VK_OEM_PERIOD","DOM_VK_OEM_PLUS","DOM_VK_OPEN_BRACKET","DOM_VK_OPEN_CURLY_BRACKET","DOM_VK_OPEN_PAREN","DOM_VK_P","DOM_VK_PA1","DOM_VK_PAGEDOWN","DOM_VK_PAGEUP","DOM_VK_PAGE_DOWN","DOM_VK_PAGE_UP","DOM_VK_PAUSE","DOM_VK_PERCENT","DOM_VK_PERIOD","DOM_VK_PIPE","DOM_VK_PLAY","DOM_VK_PLUS","DOM_VK_PRINT","DOM_VK_PRINTSCREEN","DOM_VK_PROCESSKEY","DOM_VK_PROPERITES","DOM_VK_Q","DOM_VK_QUESTION_MARK","DOM_VK_QUOTE","DOM_VK_R","DOM_VK_REDO","DOM_VK_RETURN","DOM_VK_RIGHT","DOM_VK_S","DOM_VK_SCROLL_LOCK","DOM_VK_SELECT","DOM_VK_SEMICOLON","DOM_VK_SEPARATOR","DOM_VK_SHIFT","DOM_VK_SLASH","DOM_VK_SLEEP","DOM_VK_SPACE","DOM_VK_SUBTRACT","DOM_VK_T","DOM_VK_TAB","DOM_VK_TILDE","DOM_VK_U","DOM_VK_UNDERSCORE","DOM_VK_UNDO","DOM_VK_UNICODE","DOM_VK_UP","DOM_VK_V","DOM_VK_VOLUME_DOWN","DOM_VK_VOLUME_MUTE","DOM_VK_VOLUME_UP","DOM_VK_W","DOM_VK_WIN","DOM_VK_WINDOW","DOM_VK_WIN_ICO_00","DOM_VK_WIN_ICO_CLEAR","DOM_VK_WIN_ICO_HELP","DOM_VK_WIN_OEM_ATTN","DOM_VK_WIN_OEM_AUTO","DOM_VK_WIN_OEM_BACKTAB","DOM_VK_WIN_OEM_CLEAR","DOM_VK_WIN_OEM_COPY","DOM_VK_WIN_OEM_CUSEL","DOM_VK_WIN_OEM_ENLW","DOM_VK_WIN_OEM_FINISH","DOM_VK_WIN_OEM_FJ_JISHO","DOM_VK_WIN_OEM_FJ_LOYA","DOM_VK_WIN_OEM_FJ_MASSHOU","DOM_VK_WIN_OEM_FJ_ROYA","DOM_VK_WIN_OEM_FJ_TOUROKU","DOM_VK_WIN_OEM_JUMP","DOM_VK_WIN_OEM_PA1","DOM_VK_WIN_OEM_PA2","DOM_VK_WIN_OEM_PA3","DOM_VK_WIN_OEM_RESET","DOM_VK_WIN_OEM_WSCTRL","DOM_VK_X","DOM_VK_XF86XK_ADD_FAVORITE","DOM_VK_XF86XK_APPLICATION_LEFT","DOM_VK_XF86XK_APPLICATION_RIGHT","DOM_VK_XF86XK_AUDIO_CYCLE_TRACK","DOM_VK_XF86XK_AUDIO_FORWARD","DOM_VK_XF86XK_AUDIO_LOWER_VOLUME","DOM_VK_XF86XK_AUDIO_MEDIA","DOM_VK_XF86XK_AUDIO_MUTE","DOM_VK_XF86XK_AUDIO_NEXT","DOM_VK_XF86XK_AUDIO_PAUSE","DOM_VK_XF86XK_AUDIO_PLAY","DOM_VK_XF86XK_AUDIO_PREV","DOM_VK_XF86XK_AUDIO_RAISE_VOLUME","DOM_VK_XF86XK_AUDIO_RANDOM_PLAY","DOM_VK_XF86XK_AUDIO_RECORD","DOM_VK_XF86XK_AUDIO_REPEAT","DOM_VK_XF86XK_AUDIO_REWIND","DOM_VK_XF86XK_AUDIO_STOP","DOM_VK_XF86XK_AWAY","DOM_VK_XF86XK_BACK","DOM_VK_XF86XK_BACK_FORWARD","DOM_VK_XF86XK_BATTERY","DOM_VK_XF86XK_BLUE","DOM_VK_XF86XK_BLUETOOTH","DOM_VK_XF86XK_BOOK","DOM_VK_XF86XK_BRIGHTNESS_ADJUST","DOM_VK_XF86XK_CALCULATOR","DOM_VK_XF86XK_CALENDAR","DOM_VK_XF86XK_CD","DOM_VK_XF86XK_CLOSE","DOM_VK_XF86XK_COMMUNITY","DOM_VK_XF86XK_CONTRAST_ADJUST","DOM_VK_XF86XK_COPY","DOM_VK_XF86XK_CUT","DOM_VK_XF86XK_CYCLE_ANGLE","DOM_VK_XF86XK_DISPLAY","DOM_VK_XF86XK_DOCUMENTS","DOM_VK_XF86XK_DOS","DOM_VK_XF86XK_EJECT","DOM_VK_XF86XK_EXCEL","DOM_VK_XF86XK_EXPLORER","DOM_VK_XF86XK_FAVORITES","DOM_VK_XF86XK_FINANCE","DOM_VK_XF86XK_FORWARD","DOM_VK_XF86XK_FRAME_BACK","DOM_VK_XF86XK_FRAME_FORWARD","DOM_VK_XF86XK_GAME","DOM_VK_XF86XK_GO","DOM_VK_XF86XK_GREEN","DOM_VK_XF86XK_HIBERNATE","DOM_VK_XF86XK_HISTORY","DOM_VK_XF86XK_HOME_PAGE","DOM_VK_XF86XK_HOT_LINKS","DOM_VK_XF86XK_I_TOUCH","DOM_VK_XF86XK_KBD_BRIGHTNESS_DOWN","DOM_VK_XF86XK_KBD_BRIGHTNESS_UP","DOM_VK_XF86XK_KBD_LIGHT_ON_OFF","DOM_VK_XF86XK_LAUNCH0","DOM_VK_XF86XK_LAUNCH1","DOM_VK_XF86XK_LAUNCH2","DOM_VK_XF86XK_LAUNCH3","DOM_VK_XF86XK_LAUNCH4","DOM_VK_XF86XK_LAUNCH5","DOM_VK_XF86XK_LAUNCH6","DOM_VK_XF86XK_LAUNCH7","DOM_VK_XF86XK_LAUNCH8","DOM_VK_XF86XK_LAUNCH9","DOM_VK_XF86XK_LAUNCH_A","DOM_VK_XF86XK_LAUNCH_B","DOM_VK_XF86XK_LAUNCH_C","DOM_VK_XF86XK_LAUNCH_D","DOM_VK_XF86XK_LAUNCH_E","DOM_VK_XF86XK_LAUNCH_F","DOM_VK_XF86XK_LIGHT_BULB","DOM_VK_XF86XK_LOG_OFF","DOM_VK_XF86XK_MAIL","DOM_VK_XF86XK_MAIL_FORWARD","DOM_VK_XF86XK_MARKET","DOM_VK_XF86XK_MEETING","DOM_VK_XF86XK_MEMO","DOM_VK_XF86XK_MENU_KB","DOM_VK_XF86XK_MENU_PB","DOM_VK_XF86XK_MESSENGER","DOM_VK_XF86XK_MON_BRIGHTNESS_DOWN","DOM_VK_XF86XK_MON_BRIGHTNESS_UP","DOM_VK_XF86XK_MUSIC","DOM_VK_XF86XK_MY_COMPUTER","DOM_VK_XF86XK_MY_SITES","DOM_VK_XF86XK_NEW","DOM_VK_XF86XK_NEWS","DOM_VK_XF86XK_OFFICE_HOME","DOM_VK_XF86XK_OPEN","DOM_VK_XF86XK_OPEN_URL","DOM_VK_XF86XK_OPTION","DOM_VK_XF86XK_PASTE","DOM_VK_XF86XK_PHONE","DOM_VK_XF86XK_PICTURES","DOM_VK_XF86XK_POWER_DOWN","DOM_VK_XF86XK_POWER_OFF","DOM_VK_XF86XK_RED","DOM_VK_XF86XK_REFRESH","DOM_VK_XF86XK_RELOAD","DOM_VK_XF86XK_REPLY","DOM_VK_XF86XK_ROCKER_DOWN","DOM_VK_XF86XK_ROCKER_ENTER","DOM_VK_XF86XK_ROCKER_UP","DOM_VK_XF86XK_ROTATE_WINDOWS","DOM_VK_XF86XK_ROTATION_KB","DOM_VK_XF86XK_ROTATION_PB","DOM_VK_XF86XK_SAVE","DOM_VK_XF86XK_SCREEN_SAVER","DOM_VK_XF86XK_SCROLL_CLICK","DOM_VK_XF86XK_SCROLL_DOWN","DOM_VK_XF86XK_SCROLL_UP","DOM_VK_XF86XK_SEARCH","DOM_VK_XF86XK_SEND","DOM_VK_XF86XK_SHOP","DOM_VK_XF86XK_SPELL","DOM_VK_XF86XK_SPLIT_SCREEN","DOM_VK_XF86XK_STANDBY","DOM_VK_XF86XK_START","DOM_VK_XF86XK_STOP","DOM_VK_XF86XK_SUBTITLE","DOM_VK_XF86XK_SUPPORT","DOM_VK_XF86XK_SUSPEND","DOM_VK_XF86XK_TASK_PANE","DOM_VK_XF86XK_TERMINAL","DOM_VK_XF86XK_TIME","DOM_VK_XF86XK_TOOLS","DOM_VK_XF86XK_TOP_MENU","DOM_VK_XF86XK_TO_DO_LIST","DOM_VK_XF86XK_TRAVEL","DOM_VK_XF86XK_USER1KB","DOM_VK_XF86XK_USER2KB","DOM_VK_XF86XK_USER_PB","DOM_VK_XF86XK_UWB","DOM_VK_XF86XK_VENDOR_HOME","DOM_VK_XF86XK_VIDEO","DOM_VK_XF86XK_VIEW","DOM_VK_XF86XK_WAKE_UP","DOM_VK_XF86XK_WEB_CAM","DOM_VK_XF86XK_WHEEL_BUTTON","DOM_VK_XF86XK_WLAN","DOM_VK_XF86XK_WORD","DOM_VK_XF86XK_WWW","DOM_VK_XF86XK_XFER","DOM_VK_XF86XK_YELLOW","DOM_VK_XF86XK_ZOOM_IN","DOM_VK_XF86XK_ZOOM_OUT","DOM_VK_Y","DOM_VK_Z","DOM_VK_ZOOM","DONE","DONT_CARE","DOWNLOADING","DRAGDROP","DST_ALPHA","DST_COLOR","DYNAMIC_DRAW","DataChannel","DataTransfer","DataTransferItem","DataTransferItemList","DataView","Date","DateTimeFormat","DelayNode","DesktopNotification","DesktopNotificationCenter","DeviceLightEvent","DeviceMotionEvent","DeviceOrientationEvent","DeviceProximityEvent","DeviceStorage","DeviceStorageChangeEvent","Document","DocumentFragment","DocumentType","DragEvent","DynamicsCompressorNode","E","ELEMENT_ARRAY_BUFFER","ELEMENT_ARRAY_BUFFER_BINDING","ELEMENT_NODE","EMPTY","ENCODING_ERR","ENDED","END_TO_END","END_TO_START","ENTITY_NODE","ENTITY_REFERENCE_NODE","EPSILON","EQUAL","EQUALPOWER","ERROR","EXPONENTIAL_DISTANCE","Element","ElementQuery","Entity","EntityReference","Error","ErrorEvent","EvalError","Event","EventException","EventSource","EventTarget","External","FASTEST","FIDOSDK","FILTER_ACCEPT","FILTER_INTERRUPT","FILTER_REJECT","FILTER_SKIP","FINISHED_STATE","FIRST_ORDERED_NODE_TYPE","FLOAT","FLOAT_MAT2","FLOAT_MAT3","FLOAT_MAT4","FLOAT_VEC2","FLOAT_VEC3","FLOAT_VEC4","FOCUS","FONT_FACE_RULE","FONT_FEATURE_VALUES_RULE","FRAGMENT_SHADER","FRAGMENT_SHADER_DERIVATIVE_HINT_OES","FRAMEBUFFER","FRAMEBUFFER_ATTACHMENT_OBJECT_NAME","FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE","FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE","FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL","FRAMEBUFFER_BINDING","FRAMEBUFFER_COMPLETE","FRAMEBUFFER_INCOMPLETE_ATTACHMENT","FRAMEBUFFER_INCOMPLETE_DIMENSIONS","FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT","FRAMEBUFFER_UNSUPPORTED","FRONT","FRONT_AND_BACK","FRONT_FACE","FUNC_ADD","FUNC_REVERSE_SUBTRACT","FUNC_SUBTRACT","Feed","FeedEntry","File","FileError","FileList","FileReader","FindInPage","Float32Array","Float64Array","FocusEvent","FontFace","FormData","Function","GENERATE_MIPMAP_HINT","GEQUAL","GREATER","GREEN_BITS","GainNode","Gamepad","GamepadButton","GamepadEvent","GestureEvent","HAVE_CURRENT_DATA","HAVE_ENOUGH_DATA","HAVE_FUTURE_DATA","HAVE_METADATA","HAVE_NOTHING","HEADERS_RECEIVED","HIDDEN","HIERARCHY_REQUEST_ERR","HIGHPASS","HIGHSHELF","HIGH_FLOAT","HIGH_INT","HORIZONTAL","HORIZONTAL_AXIS","HRTF","HTMLAllCollection","HTMLAnchorElement","HTMLAppletElement","HTMLAreaElement","HTMLAudioElement","HTMLBRElement","HTMLBaseElement","HTMLBaseFontElement","HTMLBlockquoteElement","HTMLBodyElement","HTMLButtonElement","HTMLCanvasElement","HTMLCollection","HTMLCommandElement","HTMLContentElement","HTMLDListElement","HTMLDataElement","HTMLDataListElement","HTMLDetailsElement","HTMLDialogElement","HTMLDirectoryElement","HTMLDivElement","HTMLDocument","HTMLElement","HTMLEmbedElement","HTMLFieldSetElement","HTMLFontElement","HTMLFormControlsCollection","HTMLFormElement","HTMLFrameElement","HTMLFrameSetElement","HTMLHRElement","HTMLHeadElement","HTMLHeadingElement","HTMLHtmlElement","HTMLIFrameElement","HTMLImageElement","HTMLInputElement","HTMLIsIndexElement","HTMLKeygenElement","HTMLLIElement","HTMLLabelElement","HTMLLegendElement","HTMLLinkElement","HTMLMapElement","HTMLMarqueeElement","HTMLMediaElement","HTMLMenuElement","HTMLMenuItemElement","HTMLMetaElement","HTMLMeterElement","HTMLModElement","HTMLOListElement","HTMLObjectElement","HTMLOptGroupElement","HTMLOptionElement","HTMLOptionsCollection","HTMLOutputElement","HTMLParagraphElement","HTMLParamElement","HTMLPictureElement","HTMLPreElement","HTMLProgressElement","HTMLPropertiesCollection","HTMLQuoteElement","HTMLScriptElement","HTMLSelectElement","HTMLShadowElement","HTMLSourceElement","HTMLSpanElement","HTMLStyleElement","HTMLTableCaptionElement","HTMLTableCellElement","HTMLTableColElement","HTMLTableElement","HTMLTableRowElement","HTMLTableSectionElement","HTMLTemplateElement","HTMLTextAreaElement","HTMLTimeElement","HTMLTitleElement","HTMLTrackElement","HTMLUListElement","HTMLUnknownElement","HTMLVideoElement","HashChangeEvent","Headers","History","ICE_CHECKING","ICE_CLOSED","ICE_COMPLETED","ICE_CONNECTED","ICE_FAILED","ICE_GATHERING","ICE_WAITING","IDBCursor","IDBCursorWithValue","IDBDatabase","IDBDatabaseException","IDBFactory","IDBFileHandle","IDBFileRequest","IDBIndex","IDBKeyRange","IDBMutableFile","IDBObjectStore","IDBOpenDBRequest","IDBRequest","IDBTransaction","IDBVersionChangeEvent","IDLE","IMPLEMENTATION_COLOR_READ_FORMAT","IMPLEMENTATION_COLOR_READ_TYPE","IMPORT_RULE","INCR","INCR_WRAP","INDEX_SIZE_ERR","INT","INT_VEC2","INT_VEC3","INT_VEC4","INUSE_ATTRIBUTE_ERR","INVALID_ACCESS_ERR","INVALID_CHARACTER_ERR","INVALID_ENUM","INVALID_EXPRESSION_ERR","INVALID_FRAMEBUFFER_OPERATION","INVALID_MODIFICATION_ERR","INVALID_NODE_TYPE_ERR","INVALID_OPERATION","INVALID_STATE_ERR","INVALID_VALUE","INVERSE_DISTANCE","INVERT","IceCandidate","Image","ImageBitmap","ImageData","Infinity","InputEvent","InputMethodContext","InstallTrigger","Int16Array","Int32Array","Int8Array","Intent","InternalError","Intl","IsSearchProviderInstalled","Iterator","JSON","KEEP","KEYDOWN","KEYFRAMES_RULE","KEYFRAME_RULE","KEYPRESS","KEYUP","KeyEvent","KeyboardEvent","LENGTHADJUST_SPACING","LENGTHADJUST_SPACINGANDGLYPHS","LENGTHADJUST_UNKNOWN","LEQUAL","LESS","LINEAR","LINEAR_DISTANCE","LINEAR_MIPMAP_LINEAR","LINEAR_MIPMAP_NEAREST","LINES","LINE_LOOP","LINE_STRIP","LINE_WIDTH","LINK_STATUS","LIVE","LN10","LN2","LOADED","LOADING","LOG10E","LOG2E","LOWPASS","LOWSHELF","LOW_FLOAT","LOW_INT","LSException","LSParserFilter","LUMINANCE","LUMINANCE_ALPHA","LocalMediaStream","Location","MAX_COMBINED_TEXTURE_IMAGE_UNITS","MAX_CUBE_MAP_TEXTURE_SIZE","MAX_FRAGMENT_UNIFORM_VECTORS","MAX_RENDERBUFFER_SIZE","MAX_SAFE_INTEGER","MAX_TEXTURE_IMAGE_UNITS","MAX_TEXTURE_MAX_ANISOTROPY_EXT","MAX_TEXTURE_SIZE","MAX_VALUE","MAX_VARYING_VECTORS","MAX_VERTEX_ATTRIBS","MAX_VERTEX_TEXTURE_IMAGE_UNITS","MAX_VERTEX_UNIFORM_VECTORS","MAX_VIEWPORT_DIMS","MEDIA_ERR_ABORTED","MEDIA_ERR_DECODE","MEDIA_ERR_ENCRYPTED","MEDIA_ERR_NETWORK","MEDIA_ERR_SRC_NOT_SUPPORTED","MEDIA_KEYERR_CLIENT","MEDIA_KEYERR_DOMAIN","MEDIA_KEYERR_HARDWARECHANGE","MEDIA_KEYERR_OUTPUT","MEDIA_KEYERR_SERVICE","MEDIA_KEYERR_UNKNOWN","MEDIA_RULE","MEDIUM_FLOAT","MEDIUM_INT","META_MASK","MIN_SAFE_INTEGER","MIN_VALUE","MIRRORED_REPEAT","MODE_ASYNCHRONOUS","MODE_SYNCHRONOUS","MODIFICATION","MOUSEDOWN","MOUSEDRAG","MOUSEMOVE","MOUSEOUT","MOUSEOVER","MOUSEUP","MOZ_KEYFRAMES_RULE","MOZ_KEYFRAME_RULE","MOZ_SOURCE_CURSOR","MOZ_SOURCE_ERASER","MOZ_SOURCE_KEYBOARD","MOZ_SOURCE_MOUSE","MOZ_SOURCE_PEN","MOZ_SOURCE_TOUCH","MOZ_SOURCE_UNKNOWN","MSGESTURE_FLAG_BEGIN","MSGESTURE_FLAG_CANCEL","MSGESTURE_FLAG_END","MSGESTURE_FLAG_INERTIA","MSGESTURE_FLAG_NONE","MSPOINTER_TYPE_MOUSE","MSPOINTER_TYPE_PEN","MSPOINTER_TYPE_TOUCH","MS_ASYNC_CALLBACK_STATUS_ASSIGN_DELEGATE","MS_ASYNC_CALLBACK_STATUS_CANCEL","MS_ASYNC_CALLBACK_STATUS_CHOOSEANY","MS_ASYNC_CALLBACK_STATUS_ERROR","MS_ASYNC_CALLBACK_STATUS_JOIN","MS_ASYNC_OP_STATUS_CANCELED","MS_ASYNC_OP_STATUS_ERROR","MS_ASYNC_OP_STATUS_SUCCESS","MS_MANIPULATION_STATE_ACTIVE","MS_MANIPULATION_STATE_CANCELLED","MS_MANIPULATION_STATE_COMMITTED","MS_MANIPULATION_STATE_DRAGGING","MS_MANIPULATION_STATE_INERTIA","MS_MANIPULATION_STATE_PRESELECT","MS_MANIPULATION_STATE_SELECTING","MS_MANIPULATION_STATE_STOPPED","MS_MEDIA_ERR_ENCRYPTED","MS_MEDIA_KEYERR_CLIENT","MS_MEDIA_KEYERR_DOMAIN","MS_MEDIA_KEYERR_HARDWARECHANGE","MS_MEDIA_KEYERR_OUTPUT","MS_MEDIA_KEYERR_SERVICE","MS_MEDIA_KEYERR_UNKNOWN","Map","Math","MediaController","MediaDevices","MediaElementAudioSourceNode","MediaEncryptedEvent","MediaError","MediaKeyError","MediaKeyEvent","MediaKeyMessageEvent","MediaKeyNeededEvent","MediaKeySession","MediaKeyStatusMap","MediaKeySystemAccess","MediaKeys","MediaList","MediaQueryList","MediaQueryListEvent","MediaRecorder","MediaSource","MediaStream","MediaStreamAudioDestinationNode","MediaStreamAudioSourceNode","MediaStreamEvent","MediaStreamTrack","MediaStreamTrackEvent","MessageChannel","MessageEvent","MessagePort","Methods","MimeType","MimeTypeArray","MouseEvent","MouseScrollEvent","MozAnimation","MozAnimationDelay","MozAnimationDirection","MozAnimationDuration","MozAnimationFillMode","MozAnimationIterationCount","MozAnimationName","MozAnimationPlayState","MozAnimationTimingFunction","MozAppearance","MozBackfaceVisibility","MozBinding","MozBorderBottomColors","MozBorderEnd","MozBorderEndColor","MozBorderEndStyle","MozBorderEndWidth","MozBorderImage","MozBorderLeftColors","MozBorderRightColors","MozBorderStart","MozBorderStartColor","MozBorderStartStyle","MozBorderStartWidth","MozBorderTopColors","MozBoxAlign","MozBoxDirection","MozBoxFlex","MozBoxOrdinalGroup","MozBoxOrient","MozBoxPack","MozBoxSizing","MozCSSKeyframeRule","MozCSSKeyframesRule","MozColumnCount","MozColumnFill","MozColumnGap","MozColumnRule","MozColumnRuleColor","MozColumnRuleStyle","MozColumnRuleWidth","MozColumnWidth","MozColumns","MozContactChangeEvent","MozFloatEdge","MozFontFeatureSettings","MozFontLanguageOverride","MozForceBrokenImageIcon","MozHyphens","MozImageRegion","MozMarginEnd","MozMarginStart","MozMmsEvent","MozMmsMessage","MozMobileMessageThread","MozOSXFontSmoothing","MozOrient","MozOutlineRadius","MozOutlineRadiusBottomleft","MozOutlineRadiusBottomright","MozOutlineRadiusTopleft","MozOutlineRadiusTopright","MozPaddingEnd","MozPaddingStart","MozPerspective","MozPerspectiveOrigin","MozPowerManager","MozSettingsEvent","MozSmsEvent","MozSmsMessage","MozStackSizing","MozTabSize","MozTextAlignLast","MozTextDecorationColor","MozTextDecorationLine","MozTextDecorationStyle","MozTextSizeAdjust","MozTransform","MozTransformOrigin","MozTransformStyle","MozTransition","MozTransitionDelay","MozTransitionDuration","MozTransitionProperty","MozTransitionTimingFunction","MozUserFocus","MozUserInput","MozUserModify","MozUserSelect","MozWindowDragging","MozWindowShadow","MutationEvent","MutationObserver","MutationRecord","NAMESPACE_ERR","NAMESPACE_RULE","NEAREST","NEAREST_MIPMAP_LINEAR","NEAREST_MIPMAP_NEAREST","NEGATIVE_INFINITY","NETWORK_EMPTY","NETWORK_ERR","NETWORK_IDLE","NETWORK_LOADED","NETWORK_LOADING","NETWORK_NO_SOURCE","NEVER","NEW","NEXT","NEXT_NO_DUPLICATE","NICEST","NODE_AFTER","NODE_BEFORE","NODE_BEFORE_AND_AFTER","NODE_INSIDE","NONE","NON_TRANSIENT_ERR","NOTATION_NODE","NOTCH","NOTEQUAL","NOT_ALLOWED_ERR","NOT_FOUND_ERR","NOT_READABLE_ERR","NOT_SUPPORTED_ERR","NO_DATA_ALLOWED_ERR","NO_ERR","NO_ERROR","NO_MODIFICATION_ALLOWED_ERR","NUMBER_TYPE","NUM_COMPRESSED_TEXTURE_FORMATS","NaN","NamedNodeMap","Navigator","NearbyLinks","NetworkInformation","Node","NodeFilter","NodeIterator","NodeList","Notation","Notification","NotifyPaintEvent","Number","NumberFormat","OBSOLETE","ONE","ONE_MINUS_CONSTANT_ALPHA","ONE_MINUS_CONSTANT_COLOR","ONE_MINUS_DST_ALPHA","ONE_MINUS_DST_COLOR","ONE_MINUS_SRC_ALPHA","ONE_MINUS_SRC_COLOR","OPEN","OPENED","OPENING","ORDERED_NODE_ITERATOR_TYPE","ORDERED_NODE_SNAPSHOT_TYPE","OUT_OF_MEMORY","Object","OfflineAudioCompletionEvent","OfflineAudioContext","OfflineResourceList","Option","OscillatorNode","OverflowEvent","PACK_ALIGNMENT","PAGE_RULE","PARSE_ERR","PATHSEG_ARC_ABS","PATHSEG_ARC_REL","PATHSEG_CLOSEPATH","PATHSEG_CURVETO_CUBIC_ABS","PATHSEG_CURVETO_CUBIC_REL","PATHSEG_CURVETO_CUBIC_SMOOTH_ABS","PATHSEG_CURVETO_CUBIC_SMOOTH_REL","PATHSEG_CURVETO_QUADRATIC_ABS","PATHSEG_CURVETO_QUADRATIC_REL","PATHSEG_CURVETO_QUADRATIC_SMOOTH_ABS","PATHSEG_CURVETO_QUADRATIC_SMOOTH_REL","PATHSEG_LINETO_ABS","PATHSEG_LINETO_HORIZONTAL_ABS","PATHSEG_LINETO_HORIZONTAL_REL","PATHSEG_LINETO_REL","PATHSEG_LINETO_VERTICAL_ABS","PATHSEG_LINETO_VERTICAL_REL","PATHSEG_MOVETO_ABS","PATHSEG_MOVETO_REL","PATHSEG_UNKNOWN","PATH_EXISTS_ERR","PEAKING","PERMISSION_DENIED","PERSISTENT","PI","PLAYING_STATE","POINTS","POLYGON_OFFSET_FACTOR","POLYGON_OFFSET_FILL","POLYGON_OFFSET_UNITS","POSITION_UNAVAILABLE","POSITIVE_INFINITY","PREV","PREV_NO_DUPLICATE","PROCESSING_INSTRUCTION_NODE","PageChangeEvent","PageTransitionEvent","PaintRequest","PaintRequestList","PannerNode","Path2D","Performance","PerformanceEntry","PerformanceMark","PerformanceMeasure","PerformanceNavigation","PerformanceResourceTiming","PerformanceTiming","PeriodicWave","Plugin","PluginArray","PopStateEvent","PopupBlockedEvent","ProcessingInstruction","ProgressEvent","Promise","PropertyNodeList","Proxy","PushManager","PushSubscription","Q","QUOTA_ERR","QUOTA_EXCEEDED_ERR","QueryInterface","READ_ONLY","READ_ONLY_ERR","READ_WRITE","RED_BITS","REMOVAL","RENDERBUFFER","RENDERBUFFER_ALPHA_SIZE","RENDERBUFFER_BINDING","RENDERBUFFER_BLUE_SIZE","RENDERBUFFER_DEPTH_SIZE","RENDERBUFFER_GREEN_SIZE","RENDERBUFFER_HEIGHT","RENDERBUFFER_INTERNAL_FORMAT","RENDERBUFFER_RED_SIZE","RENDERBUFFER_STENCIL_SIZE","RENDERBUFFER_WIDTH","RENDERER","RENDERING_INTENT_ABSOLUTE_COLORIMETRIC","RENDERING_INTENT_AUTO","RENDERING_INTENT_PERCEPTUAL","RENDERING_INTENT_RELATIVE_COLORIMETRIC","RENDERING_INTENT_SATURATION","RENDERING_INTENT_UNKNOWN","REPEAT","REPLACE","RGB","RGB565","RGB5_A1","RGBA","RGBA4","RGBColor","ROTATION_CLOCKWISE","ROTATION_COUNTERCLOCKWISE","RTCDataChannelEvent","RTCIceCandidate","RTCPeerConnectionIceEvent","RTCRtpReceiver","RTCRtpSender","RTCSessionDescription","RTCStatsReport","RadioNodeList","Range","RangeError","RangeException","RecordErrorEvent","Rect","ReferenceError","RegExp","Request","Response","SAMPLER_2D","SAMPLER_CUBE","SAMPLES","SAMPLE_ALPHA_TO_COVERAGE","SAMPLE_BUFFERS","SAMPLE_COVERAGE","SAMPLE_COVERAGE_INVERT","SAMPLE_COVERAGE_VALUE","SAWTOOTH","SCHEDULED_STATE","SCISSOR_BOX","SCISSOR_TEST","SCROLL_PAGE_DOWN","SCROLL_PAGE_UP","SDP_ANSWER","SDP_OFFER","SDP_PRANSWER","SECURITY_ERR","SELECT","SERIALIZE_ERR","SEVERITY_ERROR","SEVERITY_FATAL_ERROR","SEVERITY_WARNING","SHADER_COMPILER","SHADER_TYPE","SHADING_LANGUAGE_VERSION","SHIFT_MASK","SHORT","SHOWING","SHOW_ALL","SHOW_ATTRIBUTE","SHOW_CDATA_SECTION","SHOW_COMMENT","SHOW_DOCUMENT","SHOW_DOCUMENT_FRAGMENT","SHOW_DOCUMENT_TYPE","SHOW_ELEMENT","SHOW_ENTITY","SHOW_ENTITY_REFERENCE","SHOW_NOTATION","SHOW_PROCESSING_INSTRUCTION","SHOW_TEXT","SINE","SOUNDFIELD","SQLException","SQRT1_2","SQRT2","SQUARE","SRC_ALPHA","SRC_ALPHA_SATURATE","SRC_COLOR","START_TO_END","START_TO_START","STATIC_DRAW","STENCIL_ATTACHMENT","STENCIL_BACK_FAIL","STENCIL_BACK_FUNC","STENCIL_BACK_PASS_DEPTH_FAIL","STENCIL_BACK_PASS_DEPTH_PASS","STENCIL_BACK_REF","STENCIL_BACK_VALUE_MASK","STENCIL_BACK_WRITEMASK","STENCIL_BITS","STENCIL_BUFFER_BIT","STENCIL_CLEAR_VALUE","STENCIL_FAIL","STENCIL_FUNC","STENCIL_INDEX","STENCIL_INDEX8","STENCIL_PASS_DEPTH_FAIL","STENCIL_PASS_DEPTH_PASS","STENCIL_REF","STENCIL_TEST","STENCIL_VALUE_MASK","STENCIL_WRITEMASK","STREAM_DRAW","STRING_TYPE","STYLE_RULE","SUBPIXEL_BITS","SUPPORTS_RULE","SVGAElement","SVGAltGlyphDefElement","SVGAltGlyphElement","SVGAltGlyphItemElement","SVGAngle","SVGAnimateColorElement","SVGAnimateElement","SVGAnimateMotionElement","SVGAnimateTransformElement","SVGAnimatedAngle","SVGAnimatedBoolean","SVGAnimatedEnumeration","SVGAnimatedInteger","SVGAnimatedLength","SVGAnimatedLengthList","SVGAnimatedNumber","SVGAnimatedNumberList","SVGAnimatedPreserveAspectRatio","SVGAnimatedRect","SVGAnimatedString","SVGAnimatedTransformList","SVGAnimationElement","SVGCircleElement","SVGClipPathElement","SVGColor","SVGComponentTransferFunctionElement","SVGCursorElement","SVGDefsElement","SVGDescElement","SVGDiscardElement","SVGDocument","SVGElement","SVGElementInstance","SVGElementInstanceList","SVGEllipseElement","SVGException","SVGFEBlendElement","SVGFEColorMatrixElement","SVGFEComponentTransferElement","SVGFECompositeElement","SVGFEConvolveMatrixElement","SVGFEDiffuseLightingElement","SVGFEDisplacementMapElement","SVGFEDistantLightElement","SVGFEDropShadowElement","SVGFEFloodElement","SVGFEFuncAElement","SVGFEFuncBElement","SVGFEFuncGElement","SVGFEFuncRElement","SVGFEGaussianBlurElement","SVGFEImageElement","SVGFEMergeElement","SVGFEMergeNodeElement","SVGFEMorphologyElement","SVGFEOffsetElement","SVGFEPointLightElement","SVGFESpecularLightingElement","SVGFESpotLightElement","SVGFETileElement","SVGFETurbulenceElement","SVGFilterElement","SVGFontElement","SVGFontFaceElement","SVGFontFaceFormatElement","SVGFontFaceNameElement","SVGFontFaceSrcElement","SVGFontFaceUriElement","SVGForeignObjectElement","SVGGElement","SVGGeometryElement","SVGGlyphElement","SVGGlyphRefElement","SVGGradientElement","SVGGraphicsElement","SVGHKernElement","SVGImageElement","SVGLength","SVGLengthList","SVGLineElement","SVGLinearGradientElement","SVGMPathElement","SVGMarkerElement","SVGMaskElement","SVGMatrix","SVGMetadataElement","SVGMissingGlyphElement","SVGNumber","SVGNumberList","SVGPaint","SVGPathElement","SVGPathSeg","SVGPathSegArcAbs","SVGPathSegArcRel","SVGPathSegClosePath","SVGPathSegCurvetoCubicAbs","SVGPathSegCurvetoCubicRel","SVGPathSegCurvetoCubicSmoothAbs","SVGPathSegCurvetoCubicSmoothRel","SVGPathSegCurvetoQuadraticAbs","SVGPathSegCurvetoQuadraticRel","SVGPathSegCurvetoQuadraticSmoothAbs","SVGPathSegCurvetoQuadraticSmoothRel","SVGPathSegLinetoAbs","SVGPathSegLinetoHorizontalAbs","SVGPathSegLinetoHorizontalRel","SVGPathSegLinetoRel","SVGPathSegLinetoVerticalAbs","SVGPathSegLinetoVerticalRel","SVGPathSegList","SVGPathSegMovetoAbs","SVGPathSegMovetoRel","SVGPatternElement","SVGPoint","SVGPointList","SVGPolygonElement","SVGPolylineElement","SVGPreserveAspectRatio","SVGRadialGradientElement","SVGRect","SVGRectElement","SVGRenderingIntent","SVGSVGElement","SVGScriptElement","SVGSetElement","SVGStopElement","SVGStringList","SVGStyleElement","SVGSwitchElement","SVGSymbolElement","SVGTRefElement","SVGTSpanElement","SVGTextContentElement","SVGTextElement","SVGTextPathElement","SVGTextPositioningElement","SVGTitleElement","SVGTransform","SVGTransformList","SVGUnitTypes","SVGUseElement","SVGVKernElement","SVGViewElement","SVGViewSpec","SVGZoomAndPan","SVGZoomEvent","SVG_ANGLETYPE_DEG","SVG_ANGLETYPE_GRAD","SVG_ANGLETYPE_RAD","SVG_ANGLETYPE_UNKNOWN","SVG_ANGLETYPE_UNSPECIFIED","SVG_CHANNEL_A","SVG_CHANNEL_B","SVG_CHANNEL_G","SVG_CHANNEL_R","SVG_CHANNEL_UNKNOWN","SVG_COLORTYPE_CURRENTCOLOR","SVG_COLORTYPE_RGBCOLOR","SVG_COLORTYPE_RGBCOLOR_ICCCOLOR","SVG_COLORTYPE_UNKNOWN","SVG_EDGEMODE_DUPLICATE","SVG_EDGEMODE_NONE","SVG_EDGEMODE_UNKNOWN","SVG_EDGEMODE_WRAP","SVG_FEBLEND_MODE_COLOR","SVG_FEBLEND_MODE_COLOR_BURN","SVG_FEBLEND_MODE_COLOR_DODGE","SVG_FEBLEND_MODE_DARKEN","SVG_FEBLEND_MODE_DIFFERENCE","SVG_FEBLEND_MODE_EXCLUSION","SVG_FEBLEND_MODE_HARD_LIGHT","SVG_FEBLEND_MODE_HUE","SVG_FEBLEND_MODE_LIGHTEN","SVG_FEBLEND_MODE_LUMINOSITY","SVG_FEBLEND_MODE_MULTIPLY","SVG_FEBLEND_MODE_NORMAL","SVG_FEBLEND_MODE_OVERLAY","SVG_FEBLEND_MODE_SATURATION","SVG_FEBLEND_MODE_SCREEN","SVG_FEBLEND_MODE_SOFT_LIGHT","SVG_FEBLEND_MODE_UNKNOWN","SVG_FECOLORMATRIX_TYPE_HUEROTATE","SVG_FECOLORMATRIX_TYPE_LUMINANCETOALPHA","SVG_FECOLORMATRIX_TYPE_MATRIX","SVG_FECOLORMATRIX_TYPE_SATURATE","SVG_FECOLORMATRIX_TYPE_UNKNOWN","SVG_FECOMPONENTTRANSFER_TYPE_DISCRETE","SVG_FECOMPONENTTRANSFER_TYPE_GAMMA","SVG_FECOMPONENTTRANSFER_TYPE_IDENTITY","SVG_FECOMPONENTTRANSFER_TYPE_LINEAR","SVG_FECOMPONENTTRANSFER_TYPE_TABLE","SVG_FECOMPONENTTRANSFER_TYPE_UNKNOWN","SVG_FECOMPOSITE_OPERATOR_ARITHMETIC","SVG_FECOMPOSITE_OPERATOR_ATOP","SVG_FECOMPOSITE_OPERATOR_IN","SVG_FECOMPOSITE_OPERATOR_OUT","SVG_FECOMPOSITE_OPERATOR_OVER","SVG_FECOMPOSITE_OPERATOR_UNKNOWN","SVG_FECOMPOSITE_OPERATOR_XOR","SVG_INVALID_VALUE_ERR","SVG_LENGTHTYPE_CM","SVG_LENGTHTYPE_EMS","SVG_LENGTHTYPE_EXS","SVG_LENGTHTYPE_IN","SVG_LENGTHTYPE_MM","SVG_LENGTHTYPE_NUMBER","SVG_LENGTHTYPE_PC","SVG_LENGTHTYPE_PERCENTAGE","SVG_LENGTHTYPE_PT","SVG_LENGTHTYPE_PX","SVG_LENGTHTYPE_UNKNOWN","SVG_MARKERUNITS_STROKEWIDTH","SVG_MARKERUNITS_UNKNOWN","SVG_MARKERUNITS_USERSPACEONUSE","SVG_MARKER_ORIENT_ANGLE","SVG_MARKER_ORIENT_AUTO","SVG_MARKER_ORIENT_UNKNOWN","SVG_MASKTYPE_ALPHA","SVG_MASKTYPE_LUMINANCE","SVG_MATRIX_NOT_INVERTABLE","SVG_MEETORSLICE_MEET","SVG_MEETORSLICE_SLICE","SVG_MEETORSLICE_UNKNOWN","SVG_MORPHOLOGY_OPERATOR_DILATE","SVG_MORPHOLOGY_OPERATOR_ERODE","SVG_MORPHOLOGY_OPERATOR_UNKNOWN","SVG_PAINTTYPE_CURRENTCOLOR","SVG_PAINTTYPE_NONE","SVG_PAINTTYPE_RGBCOLOR","SVG_PAINTTYPE_RGBCOLOR_ICCCOLOR","SVG_PAINTTYPE_UNKNOWN","SVG_PAINTTYPE_URI","SVG_PAINTTYPE_URI_CURRENTCOLOR","SVG_PAINTTYPE_URI_NONE","SVG_PAINTTYPE_URI_RGBCOLOR","SVG_PAINTTYPE_URI_RGBCOLOR_ICCCOLOR","SVG_PRESERVEASPECTRATIO_NONE","SVG_PRESERVEASPECTRATIO_UNKNOWN","SVG_PRESERVEASPECTRATIO_XMAXYMAX","SVG_PRESERVEASPECTRATIO_XMAXYMID","SVG_PRESERVEASPECTRATIO_XMAXYMIN","SVG_PRESERVEASPECTRATIO_XMIDYMAX","SVG_PRESERVEASPECTRATIO_XMIDYMID","SVG_PRESERVEASPECTRATIO_XMIDYMIN","SVG_PRESERVEASPECTRATIO_XMINYMAX","SVG_PRESERVEASPECTRATIO_XMINYMID","SVG_PRESERVEASPECTRATIO_XMINYMIN","SVG_SPREADMETHOD_PAD","SVG_SPREADMETHOD_REFLECT","SVG_SPREADMETHOD_REPEAT","SVG_SPREADMETHOD_UNKNOWN","SVG_STITCHTYPE_NOSTITCH","SVG_STITCHTYPE_STITCH","SVG_STITCHTYPE_UNKNOWN","SVG_TRANSFORM_MATRIX","SVG_TRANSFORM_ROTATE","SVG_TRANSFORM_SCALE","SVG_TRANSFORM_SKEWX","SVG_TRANSFORM_SKEWY","SVG_TRANSFORM_TRANSLATE","SVG_TRANSFORM_UNKNOWN","SVG_TURBULENCE_TYPE_FRACTALNOISE","SVG_TURBULENCE_TYPE_TURBULENCE","SVG_TURBULENCE_TYPE_UNKNOWN","SVG_UNIT_TYPE_OBJECTBOUNDINGBOX","SVG_UNIT_TYPE_UNKNOWN","SVG_UNIT_TYPE_USERSPACEONUSE","SVG_WRONG_TYPE_ERR","SVG_ZOOMANDPAN_DISABLE","SVG_ZOOMANDPAN_MAGNIFY","SVG_ZOOMANDPAN_UNKNOWN","SYNTAX_ERR","SavedPages","Screen","ScreenOrientation","Script","ScriptProcessorNode","ScrollAreaEvent","SecurityPolicyViolationEvent","Selection","ServiceWorker","ServiceWorkerContainer","ServiceWorkerRegistration","SessionDescription","Set","ShadowRoot","SharedWorker","SimpleGestureEvent","SpeechSynthesisEvent","SpeechSynthesisUtterance","StopIteration","Storage","StorageEvent","String","StyleSheet","StyleSheetList","SubtleCrypto","Symbol","SyntaxError","TEMPORARY","TEXTPATH_METHODTYPE_ALIGN","TEXTPATH_METHODTYPE_STRETCH","TEXTPATH_METHODTYPE_UNKNOWN","TEXTPATH_SPACINGTYPE_AUTO","TEXTPATH_SPACINGTYPE_EXACT","TEXTPATH_SPACINGTYPE_UNKNOWN","TEXTURE","TEXTURE0","TEXTURE1","TEXTURE10","TEXTURE11","TEXTURE12","TEXTURE13","TEXTURE14","TEXTURE15","TEXTURE16","TEXTURE17","TEXTURE18","TEXTURE19","TEXTURE2","TEXTURE20","TEXTURE21","TEXTURE22","TEXTURE23","TEXTURE24","TEXTURE25","TEXTURE26","TEXTURE27","TEXTURE28","TEXTURE29","TEXTURE3","TEXTURE30","TEXTURE31","TEXTURE4","TEXTURE5","TEXTURE6","TEXTURE7","TEXTURE8","TEXTURE9","TEXTURE_2D","TEXTURE_BINDING_2D","TEXTURE_BINDING_CUBE_MAP","TEXTURE_CUBE_MAP","TEXTURE_CUBE_MAP_NEGATIVE_X","TEXTURE_CUBE_MAP_NEGATIVE_Y","TEXTURE_CUBE_MAP_NEGATIVE_Z","TEXTURE_CUBE_MAP_POSITIVE_X","TEXTURE_CUBE_MAP_POSITIVE_Y","TEXTURE_CUBE_MAP_POSITIVE_Z","TEXTURE_MAG_FILTER","TEXTURE_MAX_ANISOTROPY_EXT","TEXTURE_MIN_FILTER","TEXTURE_WRAP_S","TEXTURE_WRAP_T","TEXT_NODE","TIMEOUT","TIMEOUT_ERR","TOO_LARGE_ERR","TRANSACTION_INACTIVE_ERR","TRIANGLE","TRIANGLES","TRIANGLE_FAN","TRIANGLE_STRIP","TYPE_BACK_FORWARD","TYPE_ERR","TYPE_MISMATCH_ERR","TYPE_NAVIGATE","TYPE_RELOAD","TYPE_RESERVED","Text","TextDecoder","TextEncoder","TextEvent","TextMetrics","TextTrack","TextTrackCue","TextTrackCueList","TextTrackList","TimeEvent","TimeRanges","Touch","TouchEvent","TouchList","TrackEvent","TransitionEvent","TreeWalker","TypeError","UIEvent","UNCACHED","UNKNOWN_ERR","UNKNOWN_RULE","UNMASKED_RENDERER_WEBGL","UNMASKED_VENDOR_WEBGL","UNORDERED_NODE_ITERATOR_TYPE","UNORDERED_NODE_SNAPSHOT_TYPE","UNPACK_ALIGNMENT","UNPACK_COLORSPACE_CONVERSION_WEBGL","UNPACK_FLIP_Y_WEBGL","UNPACK_PREMULTIPLY_ALPHA_WEBGL","UNSCHEDULED_STATE","UNSENT","UNSIGNED_BYTE","UNSIGNED_INT","UNSIGNED_SHORT","UNSIGNED_SHORT_4_4_4_4","UNSIGNED_SHORT_5_5_5_1","UNSIGNED_SHORT_5_6_5","UNSPECIFIED_EVENT_TYPE_ERR","UPDATEREADY","URIError","URL","URLSearchParams","URLUnencoded","URL_MISMATCH_ERR","UTC","Uint16Array","Uint32Array","Uint8Array","Uint8ClampedArray","UserMessageHandler","UserMessageHandlersNamespace","UserProximityEvent","VALIDATE_STATUS","VALIDATION_ERR","VARIABLES_RULE","VENDOR","VERSION","VERSION_CHANGE","VERSION_ERR","VERTEX_ATTRIB_ARRAY_BUFFER_BINDING","VERTEX_ATTRIB_ARRAY_DIVISOR_ANGLE","VERTEX_ATTRIB_ARRAY_ENABLED","VERTEX_ATTRIB_ARRAY_NORMALIZED","VERTEX_ATTRIB_ARRAY_POINTER","VERTEX_ATTRIB_ARRAY_SIZE","VERTEX_ATTRIB_ARRAY_STRIDE","VERTEX_ATTRIB_ARRAY_TYPE","VERTEX_SHADER","VERTICAL","VERTICAL_AXIS","VER_ERR","VIEWPORT","VIEWPORT_RULE","VTTCue","VTTRegion","ValidityState","VideoStreamTrack","WEBKIT_FILTER_RULE","WEBKIT_KEYFRAMES_RULE","WEBKIT_KEYFRAME_RULE","WEBKIT_REGION_RULE","WRONG_DOCUMENT_ERR","WaveShaperNode","WeakMap","WeakSet","WebGLActiveInfo","WebGLBuffer","WebGLContextEvent","WebGLFramebuffer","WebGLProgram","WebGLRenderbuffer","WebGLRenderingContext","WebGLShader","WebGLShaderPrecisionFormat","WebGLTexture","WebGLUniformLocation","WebGLVertexArray","WebKitAnimationEvent","WebKitBlobBuilder","WebKitCSSFilterRule","WebKitCSSFilterValue","WebKitCSSKeyframeRule","WebKitCSSKeyframesRule","WebKitCSSMatrix","WebKitCSSRegionRule","WebKitCSSTransformValue","WebKitDataCue","WebKitGamepad","WebKitMediaKeyError","WebKitMediaKeyMessageEvent","WebKitMediaKeySession","WebKitMediaKeys","WebKitMediaSource","WebKitMutationObserver","WebKitNamespace","WebKitPlaybackTargetAvailabilityEvent","WebKitPoint","WebKitShadowRoot","WebKitSourceBuffer","WebKitSourceBufferList","WebKitTransitionEvent","WebSocket","WheelEvent","Window","Worker","XMLDocument","XMLHttpRequest","XMLHttpRequestEventTarget","XMLHttpRequestException","XMLHttpRequestProgressEvent","XMLHttpRequestUpload","XMLSerializer","XMLStylesheetProcessingInstruction","XPathEvaluator","XPathException","XPathExpression","XPathNSResolver","XPathResult","XSLTProcessor","ZERO","_XD0M_","_YD0M_","__defineGetter__","__defineSetter__","__lookupGetter__","__lookupSetter__","__opera","__proto__","_browserjsran","a","aLink","abbr","abort","abs","absolute","acceleration","accelerationIncludingGravity","accelerator","accept","acceptCharset","acceptNode","accessKey","accessKeyLabel","accuracy","acos","acosh","action","actionURL","active","activeCues","activeElement","activeSourceBuffers","activeSourceCount","activeTexture","add","addBehavior","addCandidate","addColorStop","addCue","addElement","addEventListener","addFilter","addFromString","addFromUri","addIceCandidate","addImport","addListener","addNamed","addPageRule","addPath","addPointer","addRange","addRegion","addRule","addSearchEngine","addSourceBuffer","addStream","addTextTrack","addTrack","addWakeLockListener","addedNodes","additionalName","additiveSymbols","addons","adoptNode","adr","advance","alert","algorithm","align","align-content","align-items","align-self","alignContent","alignItems","alignSelf","alignmentBaseline","alinkColor","all","allSettled","allowFullscreen","allowedDirections","alpha","alt","altGraphKey","altHtml","altKey","altLeft","altitude","altitudeAccuracy","amplitude","ancestorOrigins","anchor","anchorNode","anchorOffset","anchors","angle","animVal","animate","animatedInstanceRoot","animatedNormalizedPathSegList","animatedPathSegList","animatedPoints","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationStartTime","animationTimingFunction","animationsPaused","anniversary","any","app","appCodeName","appMinorVersion","appName","appNotifications","appVersion","append","appendBuffer","appendChild","appendData","appendItem","appendMedium","appendNamed","appendRule","appendStream","appendWindowEnd","appendWindowStart","applets","applicationCache","apply","applyElement","arc","arcTo","archive","areas","arguments","arrayBuffer","asin","asinh","assert","assign","async","atEnd","atan","atan2","atanh","atob","attachEvent","attachShader","attachShadow","attachments","attack","attrChange","attrName","attributeFilter","attributeName","attributeNamespace","attributeOldValue","attributes","audioTracks","autoIncrement","autobuffer","autocapitalize","autocomplete","autocorrect","autofocus","autoplay","availHeight","availLeft","availTop","availWidth","availability","available","aversion","axes","axis","azimuth","b","back","backface-visibility","backfaceVisibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","backgroundAttachment","backgroundBlendMode","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPosition","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize","badInput","balance","baseFrequencyX","baseFrequencyY","baseNode","baseOffset","baseURI","baseVal","baselineShift","battery","bday","beginElement","beginElementAt","beginPath","behavior","behaviorCookie","behaviorPart","behaviorUrns","beta","bezierCurveTo","bgColor","bgProperties","bias","big","binaryType","bind","bindAttribLocation","bindBuffer","bindFramebuffer","bindRenderbuffer","bindTexture","blendColor","blendEquation","blendEquationSeparate","blendFunc","blendFuncSeparate","blink","blob","blockDirection","blue","blur","body","bodyUsed","bold","bookmarks","booleanValue","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","borderBottom","borderBottomColor","borderBottomLeftRadius","borderBottomRightRadius","borderBottomStyle","borderBottomWidth","borderCollapse","borderColor","borderColorDark","borderColorLight","borderImage","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeft","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRadius","borderRight","borderRightColor","borderRightStyle","borderRightWidth","borderSpacing","borderStyle","borderTop","borderTopColor","borderTopLeftRadius","borderTopRightRadius","borderTopStyle","borderTopWidth","borderWidth","bottom","bottomMargin","bound","boundElements","boundingClientRect","boundingHeight","boundingLeft","boundingTop","boundingWidth","bounds","box-decoration-break","box-shadow","box-sizing","boxDecorationBreak","boxShadow","boxSizing","breakAfter","breakBefore","breakInside","browserLanguage","btoa","bubbles","buffer","bufferData","bufferDepth","bufferSize","bufferSubData","buffered","bufferedAmount","buildID","buildNumber","button","buttonID","buttons","byteLength","byteOffset","c","call","caller","canBeFormatted","canBeMounted","canBeShared","canHaveChildren","canHaveHTML","canPlayType","cancel","cancelAnimationFrame","cancelBubble","cancelScheduledValues","cancelable","candidate","canvas","caption","caption-side","captionSide","capture","captureEvents","captureStackTrace","caretPositionFromPoint","caretRangeFromPoint","cast","catch","category","cbrt","cd","ceil","cellIndex","cellPadding","cellSpacing","cells","ch","chOff","chain","challenge","changedTouches","channel","channelCount","channelCountMode","channelInterpretation","char","charAt","charCode","charCodeAt","charIndex","characterSet","characterData","characterDataOldValue","charging","chargingTime","charset","checkEnclosure","checkFramebufferStatus","checkIntersection","checkValidity","checked","childElementCount","childList","childNodes","children","chrome","ciphertext","cite","classList","className","classid","clear","clearAttributes","clearColor","clearData","clearDepth","clearImmediate","clearInterval","clearMarks","clearMeasures","clearParameters","clearRect","clearResourceTimings","clearShadow","clearStencil","clearTimeout","clearWatch","click","clickCount","clientHeight","clientInformation","clientLeft","clientRect","clientRects","clientTop","clientWidth","clientX","clientY","clip","clip-path","clip-rule","clipBottom","clipLeft","clipPath","clipPathUnits","clipRight","clipRule","clipTop","clipboardData","clone","cloneContents","cloneNode","cloneRange","close","closePath","closed","closest","clz","clz32","cmp","code","codeBase","codePointAt","codeType","colSpan","collapse","collapseToEnd","collapseToStart","collapsed","collect","colno","color","color-interpolation","color-interpolation-filters","colorDepth","colorInterpolation","colorInterpolationFilters","colorMask","colorType","cols","columnCount","columnFill","columnGap","columnNumber","columnRule","columnRuleColor","columnRuleStyle","columnRuleWidth","columnSpan","columnWidth","columns","command","commitPreferences","commonAncestorContainer","compact","compareBoundaryPoints","compareDocumentPosition","compareEndPoints","compareNode","comparePoint","compatMode","compatible","compile","compileShader","complete","componentFromPoint","compositionEndOffset","compositionStartOffset","compressedTexImage2D","compressedTexSubImage2D","concat","conditionText","coneInnerAngle","coneOuterAngle","coneOuterGain","confirm","confirmComposition","confirmSiteSpecificTrackingException","confirmWebWideTrackingException","connect","connectEnd","connectStart","connected","connection","connectionSpeed","console","consolidate","constrictionActive","constructor","contactID","contains","containsNode","content","contentDocument","contentEditable","contentOverflow","contentScriptType","contentStyleType","contentType","contentWindow","context","contextMenu","contextmenu","continue","continuous","control","controller","controls","convertToSpecifiedUnits","cookie","cookieEnabled","coords","copyFromChannel","copyTexImage2D","copyTexSubImage2D","copyToChannel","copyWithin","correspondingElement","correspondingUseElement","cos","cosh","count","counter-increment","counter-reset","counterIncrement","counterReset","cpuClass","cpuSleepAllowed","create","createAnalyser","createAnswer","createAttribute","createAttributeNS","createBiquadFilter","createBuffer","createBufferSource","createCDATASection","createCSSStyleSheet","createCaption","createChannelMerger","createChannelSplitter","createComment","createContextualFragment","createControlRange","createConvolver","createDTMFSender","createDataChannel","createDelay","createDelayNode","createDocument","createDocumentFragment","createDocumentType","createDynamicsCompressor","createElement","createElementNS","createEntityReference","createEvent","createEventObject","createExpression","createFramebuffer","createFunction","createGain","createGainNode","createHTMLDocument","createImageBitmap","createImageData","createIndex","createJavaScriptNode","createLinearGradient","createMediaElementSource","createMediaKeys","createMediaStreamDestination","createMediaStreamSource","createMutableFile","createNSResolver","createNodeIterator","createNotification","createObjectStore","createObjectURL","createOffer","createOscillator","createPanner","createPattern","createPeriodicWave","createPopup","createProcessingInstruction","createProgram","createRadialGradient","createRange","createRangeCollection","createRenderbuffer","createSVGAngle","createSVGLength","createSVGMatrix","createSVGNumber","createSVGPathSegArcAbs","createSVGPathSegArcRel","createSVGPathSegClosePath","createSVGPathSegCurvetoCubicAbs","createSVGPathSegCurvetoCubicRel","createSVGPathSegCurvetoCubicSmoothAbs","createSVGPathSegCurvetoCubicSmoothRel","createSVGPathSegCurvetoQuadraticAbs","createSVGPathSegCurvetoQuadraticRel","createSVGPathSegCurvetoQuadraticSmoothAbs","createSVGPathSegCurvetoQuadraticSmoothRel","createSVGPathSegLinetoAbs","createSVGPathSegLinetoHorizontalAbs","createSVGPathSegLinetoHorizontalRel","createSVGPathSegLinetoRel","createSVGPathSegLinetoVerticalAbs","createSVGPathSegLinetoVerticalRel","createSVGPathSegMovetoAbs","createSVGPathSegMovetoRel","createSVGPoint","createSVGRect","createSVGTransform","createSVGTransformFromMatrix","createScriptProcessor","createSession","createShader","createShadowRoot","createStereoPanner","createStyleSheet","createTBody","createTFoot","createTHead","createTextNode","createTextRange","createTexture","createTouch","createTouchList","createTreeWalker","createWaveShaper","creationTime","crossOrigin","crypto","csi","cssFloat","cssRules","cssText","cssValueType","ctrlKey","ctrlLeft","cues","cullFace","currentNode","currentPage","currentScale","currentScript","currentSrc","currentState","currentStyle","currentTarget","currentTime","currentTranslate","currentView","cursor","curve","customError","cx","cy","d","data","dataFld","dataFormatAs","dataPageSize","dataSrc","dataTransfer","database","dataset","dateTime","db","debug","debuggerEnabled","declare","decode","decodeAudioData","decodingInfo","decodeURI","decodeURIComponent","decrypt","default","defaultCharset","defaultChecked","defaultMuted","defaultPlaybackRate","defaultPrevented","defaultSelected","defaultStatus","defaultURL","defaultValue","defaultView","defaultstatus","defer","defineMagicFunction","defineMagicVariable","defineProperties","defineProperty","delayTime","delete","deleteBuffer","deleteCaption","deleteCell","deleteContents","deleteData","deleteDatabase","deleteFramebuffer","deleteFromDocument","deleteIndex","deleteMedium","deleteObjectStore","deleteProgram","deleteRenderbuffer","deleteRow","deleteRule","deleteShader","deleteTFoot","deleteTHead","deleteTexture","deliverChangeRecords","delivery","deliveryInfo","deliveryStatus","deliveryTimestamp","delta","deltaMode","deltaX","deltaY","deltaZ","depthFunc","depthMask","depthRange","deriveBits","deriveKey","description","deselectAll","designMode","destination","destinationURL","detach","detachEvent","detachShader","detail","detune","devicePixelRatio","deviceXDPI","deviceYDPI","diffuseConstant","digest","dimensions","dir","dirName","direction","dirxml","disable","disableVertexAttribArray","disabled","dischargingTime","disconnect","dispatchEvent","display","distanceModel","divisor","djsapi","djsproxy","doImport","doNotTrack","doScroll","doctype","document","documentElement","documentMode","documentURI","dolphin","dolphinGameCenter","dolphininfo","dolphinmeta","domComplete","domContentLoadedEventEnd","domContentLoadedEventStart","domInteractive","domLoading","domain","domainLookupEnd","domainLookupStart","dominant-baseline","dominantBaseline","done","dopplerFactor","download","dragDrop","draggable","drawArrays","drawArraysInstancedANGLE","drawCustomFocusRing","drawElements","drawElementsInstancedANGLE","drawFocusIfNeeded","drawImage","drawImageFromRect","drawSystemFocusRing","drawingBufferHeight","drawingBufferWidth","dropEffect","droppedVideoFrames","dropzone","dump","duplicate","duration","dvname","dvnum","dx","dy","dynsrc","e","edgeMode","effectAllowed","elapsedTime","elementFromPoint","elements","elevation","ellipse","email","embeds","empty","empty-cells","emptyCells","enable","enableBackground","enableStyleSheetsForSet","enableVertexAttribArray","enabled","enabledPlugin","encode","encodeURI","encodeURIComponent","encoding","encrypt","enctype","end","endContainer","endElement","endElementAt","endOfStream","endOffset","endTime","ended","endsWith","entities","entries","entryType","enumerate","enumerateEditable","error","errorCode","escape","eval","evaluate","event","eventPhase","every","exception","exec","execCommand","execCommandShowHelp","execScript","exitFullscreen","exitPointerLock","exp","expand","expandEntityReferences","expando","expansion","expiryDate","explicitOriginalTarget","expm1","exponent","exponentialRampToValueAtTime","exportKey","extend","extensions","extentNode","extentOffset","external","externalResourcesRequired","extractContents","extractable","f","face","factoryReset","fallback","familyName","farthestViewportElement","fastSeek","fatal","fetch","fetchStart","fftSize","fgColor","fileCreatedDate","fileHandle","fileModifiedDate","fileName","fileSize","fileUpdatedDate","filename","files","fill","fill-opacity","fill-rule","fillOpacity","fillRect","fillRule","fillStyle","fillText","filter","filterResX","filterResY","filterUnits","filters","finally","find","findIndex","findRule","findText","finish","fireEvent","firstChild","firstElementChild","firstPage","fixed","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","flexBasis","flexDirection","flexFlow","flexGrow","flexShrink","flexWrap","flipX","flipY","float","flood-color","flood-opacity","floodColor","floodOpacity","floor","flush","focus","focusNode","focusOffset","font","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","fontFamily","fontFeatureSettings","fontKerning","fontLanguageOverride","fontSize","fontSizeAdjust","fontSmoothingEnabled","fontStretch","fontStyle","fontSynthesis","fontVariant","fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition","fontWeight","fontcolor","fonts","fontsize","for","forEach","forceRedraw","form","formAction","formEnctype","formMethod","formNoValidate","formTarget","format","formatToParts","forms","forward","fr","frame","frameBorder","frameElement","frameSpacing","framebufferRenderbuffer","framebufferTexture2D","frames","freeSpace","freeze","frequency","frequencyBinCount","from","fromCharCode","fromCodePoint","fromElement","frontFace","fround","fullScreen","fullscreenElement","fullscreenEnabled","fx","fy","gain","gamepad","gamma","genderIdentity","generateKey","generateMipmap","generateRequest","geolocation","gestureObject","get","getActiveAttrib","getActiveUniform","getAdjacentText","getAll","getAllResponseHeaders","getAsFile","getAsString","getAttachedShaders","getAttribLocation","getAttribute","getAttributeNS","getAttributeNode","getAttributeNodeNS","getAudioTracks","getBBox","getBattery","getBlob","getBookmark","getBoundingClientRect","getBufferParameter","getByteFrequencyData","getByteTimeDomainData","getCSSCanvasContext","getCTM","getCandidateWindowClientRect","getChannelData","getCharNumAtPosition","getClientRect","getClientRects","getCompositionAlternatives","getComputedStyle","getComputedTextLength","getConfiguration","getContext","getContextAttributes","getCounterValue","getCueAsHTML","getCueById","getCurrentPosition","getCurrentTime","getData","getDatabaseNames","getDate","getDay","getDefaultComputedStyle","getDestinationInsertionPoints","getDistributedNodes","getEditable","getElementById","getElementsByClassName","getElementsByName","getElementsByTagName","getElementsByTagNameNS","getEnclosureList","getEndPositionOfChar","getEntries","getEntriesByName","getEntriesByType","getError","getExtension","getExtentOfChar","getFeature","getFile","getFloat32","getFloat64","getFloatFrequencyData","getFloatTimeDomainData","getFloatValue","getFramebufferAttachmentParameter","getFrequencyResponse","getFullYear","getGamepads","getHours","getImageData","getInt16","getInt32","getInt8","getIntersectionList","getItem","getItems","getKey","getLineDash","getLocalStreams","getMarks","getMatchedCSSRules","getMeasures","getMetadata","getMilliseconds","getMinutes","getModifierState","getMonth","getNamedItem","getNamedItemNS","getNotifier","getNumberOfChars","getOverrideHistoryNavigationMode","getOverrideStyle","getOwnPropertyDescriptor","getOwnPropertyNames","getOwnPropertySymbols","getParameter","getPathSegAtLength","getPointAtLength","getPreference","getPreferenceDefault","getPresentationAttribute","getPreventDefault","getProgramInfoLog","getProgramParameter","getPropertyCSSValue","getPropertyPriority","getPropertyShorthand","getPropertyValue","getPrototypeOf","getRGBColorValue","getRandomValues","getRangeAt","getReceivers","getRectValue","getRegistration","getRemoteStreams","getRenderbufferParameter","getResponseHeader","getRoot","getRotationOfChar","getSVGDocument","getScreenCTM","getSeconds","getSelection","getSenders","getShaderInfoLog","getShaderParameter","getShaderPrecisionFormat","getShaderSource","getSimpleDuration","getSiteIcons","getSources","getSpeculativeParserUrls","getStartPositionOfChar","getStartTime","getStats","getStorageUpdates","getStreamById","getStringValue","getSubStringLength","getSubscription","getSupportedExtensions","getTexParameter","getTime","getTimezoneOffset","getTotalLength","getTrackById","getTracks","getTransformToElement","getUTCDate","getUTCDay","getUTCFullYear","getUTCHours","getUTCMilliseconds","getUTCMinutes","getUTCMonth","getUTCSeconds","getUint16","getUint32","getUint8","getUniform","getUniformLocation","getUserMedia","getValues","getVarDate","getVariableValue","getVertexAttrib","getVertexAttribOffset","getVideoPlaybackQuality","getVideoTracks","getWakeLockState","getYear","givenName","global","globalAlpha","globalCompositeOperation","glyphOrientationHorizontal","glyphOrientationVertical","glyphRef","go","gradientTransform","gradientUnits","grammars","green","group","groupCollapsed","groupEnd","hardwareConcurrency","has","hasAttribute","hasAttributeNS","hasAttributes","hasChildNodes","hasComposition","hasExtension","hasFeature","hasFocus","hasLayout","hasOwnProperty","hash","head","headers","heading","height","hidden","hide","hideFocus","high","hint","history","honorificPrefix","honorificSuffix","horizontalOverflow","host","hostname","href","hreflang","hspace","html5TagCheckInerface","htmlFor","htmlText","httpEquiv","hwTimestamp","hypot","iccId","iceConnectionState","iceGatheringState","icon","id","identifier","identity","ignoreBOM","ignoreCase","image-orientation","image-rendering","imageOrientation","imageRendering","images","ime-mode","imeMode","implementation","importKey","importNode","importStylesheet","imports","impp","imul","in1","in2","inBandMetadataTrackDispatchType","inRange","includes","incremental","indeterminate","index","indexNames","indexOf","indexedDB","inertiaDestinationX","inertiaDestinationY","info","init","initAnimationEvent","initBeforeLoadEvent","initClipboardEvent","initCloseEvent","initCommandEvent","initCompositionEvent","initCustomEvent","initData","initDeviceMotionEvent","initDeviceOrientationEvent","initDragEvent","initErrorEvent","initEvent","initFocusEvent","initGestureEvent","initHashChangeEvent","initKeyEvent","initKeyboardEvent","initMSManipulationEvent","initMessageEvent","initMouseEvent","initMouseScrollEvent","initMouseWheelEvent","initMutationEvent","initNSMouseEvent","initOverflowEvent","initPageEvent","initPageTransitionEvent","initPointerEvent","initPopStateEvent","initProgressEvent","initScrollAreaEvent","initSimpleGestureEvent","initStorageEvent","initTextEvent","initTimeEvent","initTouchEvent","initTransitionEvent","initUIEvent","initWebKitAnimationEvent","initWebKitTransitionEvent","initWebKitWheelEvent","initWheelEvent","initialTime","initialize","initiatorType","inner","innerHTML","innerHeight","innerText","innerWidth","input","inputBuffer","inputEncoding","inputMethod","insertAdjacentElement","insertAdjacentHTML","insertAdjacentText","insertBefore","insertCell","insertData","insertItemBefore","insertNode","insertRow","insertRule","instanceRoot","intercept","interimResults","internalSubset","intersectsNode","interval","invalidIteratorState","inverse","invertSelf","is","is2D","isAlternate","isArray","isBingCurrentSearchDefault","isBuffer","isCandidateWindowVisible","isChar","isCollapsed","isComposing","isContentEditable","isContentHandlerRegistered","isContextLost","isDefaultNamespace","isDisabled","isEnabled","isEqual","isEqualNode","isExtensible","isFinite","isFramebuffer","isFrozen","isGenerator","isId","isInjected","isInteger","isMap","isMultiLine","isNaN","isOpen","isPointInFill","isPointInPath","isPointInRange","isPointInStroke","isPrefAlternate","isPrimary","isProgram","isPropertyImplicit","isProtocolHandlerRegistered","isPrototypeOf","isRenderbuffer","isSafeInteger","isSameNode","isSealed","isShader","isSupported","isTextEdit","isTexture","isTrusted","isTypeSupported","isView","isolation","italics","item","itemId","itemProp","itemRef","itemScope","itemType","itemValue","iterateNext","iterator","javaEnabled","jobTitle","join","json","justify-content","justifyContent","k1","k2","k3","k4","kernelMatrix","kernelUnitLengthX","kernelUnitLengthY","kerning","key","keyCode","keyFor","keyIdentifier","keyLightEnabled","keyLocation","keyPath","keySystem","keyText","keyUsage","keys","keytype","kind","knee","label","labels","lang","language","languages","largeArcFlag","lastChild","lastElementChild","lastEventId","lastIndex","lastIndexOf","lastMatch","lastMessageSubject","lastMessageType","lastModified","lastModifiedDate","lastPage","lastParen","lastState","lastStyleSheetSet","latitude","layerX","layerY","layoutFlow","layoutGrid","layoutGridChar","layoutGridLine","layoutGridMode","layoutGridType","lbound","left","leftContext","leftMargin","length","lengthAdjust","lengthComputable","letter-spacing","letterSpacing","level","lighting-color","lightingColor","limitingConeAngle","line","line-height","lineAlign","lineBreak","lineCap","lineDashOffset","lineHeight","lineJoin","lineNumber","lineTo","lineWidth","linearRampToValueAtTime","lineno","link","linkColor","linkProgram","links","list","list-style","list-style-image","list-style-position","list-style-type","listStyle","listStyleImage","listStylePosition","listStyleType","listener","load","loadEventEnd","loadEventStart","loadTimes","loaded","localDescription","localName","localStorage","locale","localeCompare","location","locationbar","lock","lockedFile","log","log10","log1p","log2","logicalXDPI","logicalYDPI","longDesc","longitude","lookupNamespaceURI","lookupPrefix","loop","loopEnd","loopStart","looping","low","lower","lowerBound","lowerOpen","lowsrc","m11","m12","m13","m14","m21","m22","m23","m24","m31","m32","m33","m34","m41","m42","m43","m44","manifest","map","mapping","margin","margin-bottom","margin-left","margin-right","margin-top","marginBottom","marginHeight","marginLeft","marginRight","marginTop","marginWidth","mark","marker","marker-end","marker-mid","marker-offset","marker-start","markerEnd","markerHeight","markerMid","markerOffset","markerStart","markerUnits","markerWidth","marks","mask","mask-type","maskContentUnits","maskType","maskUnits","match","matchMedia","matchMedium","matches","matrix","matrixTransform","max","max-height","max-width","maxAlternatives","maxChannelCount","maxConnectionsPerServer","maxDecibels","maxDistance","maxHeight","maxLength","maxTouchPoints","maxValue","maxWidth","measure","measureText","media","mediaCapabilities","mediaDevices","mediaElement","mediaGroup","mediaKeys","mediaText","meetOrSlice","memory","menubar","mergeAttributes","message","messageClass","messageHandlers","metaKey","method","mimeType","mimeTypes","min","min-height","min-width","minDecibels","minHeight","minValue","minWidth","miterLimit","mix-blend-mode","mixBlendMode","mode","modify","mount","move","moveBy","moveEnd","moveFirst","moveFocusDown","moveFocusLeft","moveFocusRight","moveFocusUp","moveNext","moveRow","moveStart","moveTo","moveToBookmark","moveToElementText","moveToPoint","mozAdd","mozAnimationStartTime","mozAnon","mozApps","mozAudioCaptured","mozAudioChannelType","mozAutoplayEnabled","mozCancelAnimationFrame","mozCancelFullScreen","mozCancelRequestAnimationFrame","mozCaptureStream","mozCaptureStreamUntilEnded","mozClearDataAt","mozContact","mozContacts","mozCreateFileHandle","mozCurrentTransform","mozCurrentTransformInverse","mozCursor","mozDash","mozDashOffset","mozDecodedFrames","mozExitPointerLock","mozFillRule","mozFragmentEnd","mozFrameDelay","mozFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozGetAll","mozGetAllKeys","mozGetAsFile","mozGetDataAt","mozGetMetadata","mozGetUserMedia","mozHasAudio","mozHasItem","mozHidden","mozImageSmoothingEnabled","mozIndexedDB","mozInnerScreenX","mozInnerScreenY","mozInputSource","mozIsTextField","mozItem","mozItemCount","mozItems","mozLength","mozLockOrientation","mozMatchesSelector","mozMovementX","mozMovementY","mozOpaque","mozOrientation","mozPaintCount","mozPaintedFrames","mozParsedFrames","mozPay","mozPointerLockElement","mozPresentedFrames","mozPreservesPitch","mozPressure","mozPrintCallback","mozRTCIceCandidate","mozRTCPeerConnection","mozRTCSessionDescription","mozRemove","mozRequestAnimationFrame","mozRequestFullScreen","mozRequestPointerLock","mozSetDataAt","mozSetImageElement","mozSourceNode","mozSrcObject","mozSystem","mozTCPSocket","mozTextStyle","mozTypesAt","mozUnlockOrientation","mozUserCancelled","mozVisibilityState","msAnimation","msAnimationDelay","msAnimationDirection","msAnimationDuration","msAnimationFillMode","msAnimationIterationCount","msAnimationName","msAnimationPlayState","msAnimationStartTime","msAnimationTimingFunction","msBackfaceVisibility","msBlockProgression","msCSSOMElementFloatMetrics","msCaching","msCachingEnabled","msCancelRequestAnimationFrame","msCapsLockWarningOff","msClearImmediate","msClose","msContentZoomChaining","msContentZoomFactor","msContentZoomLimit","msContentZoomLimitMax","msContentZoomLimitMin","msContentZoomSnap","msContentZoomSnapPoints","msContentZoomSnapType","msContentZooming","msConvertURL","msCrypto","msDoNotTrack","msElementsFromPoint","msElementsFromRect","msExitFullscreen","msExtendedCode","msFillRule","msFirstPaint","msFlex","msFlexAlign","msFlexDirection","msFlexFlow","msFlexItemAlign","msFlexLinePack","msFlexNegative","msFlexOrder","msFlexPack","msFlexPositive","msFlexPreferredSize","msFlexWrap","msFlowFrom","msFlowInto","msFontFeatureSettings","msFullscreenElement","msFullscreenEnabled","msGetInputContext","msGetRegionContent","msGetUntransformedBounds","msGraphicsTrustStatus","msGridColumn","msGridColumnAlign","msGridColumnSpan","msGridColumns","msGridRow","msGridRowAlign","msGridRowSpan","msGridRows","msHidden","msHighContrastAdjust","msHyphenateLimitChars","msHyphenateLimitLines","msHyphenateLimitZone","msHyphens","msImageSmoothingEnabled","msImeAlign","msIndexedDB","msInterpolationMode","msIsStaticHTML","msKeySystem","msKeys","msLaunchUri","msLockOrientation","msManipulationViewsEnabled","msMatchMedia","msMatchesSelector","msMaxTouchPoints","msOrientation","msOverflowStyle","msPerspective","msPerspectiveOrigin","msPlayToDisabled","msPlayToPreferredSourceUri","msPlayToPrimary","msPointerEnabled","msRegionOverflow","msReleasePointerCapture","msRequestAnimationFrame","msRequestFullscreen","msSaveBlob","msSaveOrOpenBlob","msScrollChaining","msScrollLimit","msScrollLimitXMax","msScrollLimitXMin","msScrollLimitYMax","msScrollLimitYMin","msScrollRails","msScrollSnapPointsX","msScrollSnapPointsY","msScrollSnapType","msScrollSnapX","msScrollSnapY","msScrollTranslation","msSetImmediate","msSetMediaKeys","msSetPointerCapture","msTextCombineHorizontal","msTextSizeAdjust","msToBlob","msTouchAction","msTouchSelect","msTraceAsyncCallbackCompleted","msTraceAsyncCallbackStarting","msTraceAsyncOperationCompleted","msTraceAsyncOperationStarting","msTransform","msTransformOrigin","msTransformStyle","msTransition","msTransitionDelay","msTransitionDuration","msTransitionProperty","msTransitionTimingFunction","msUnlockOrientation","msUpdateAsyncCallbackRelation","msUserSelect","msVisibilityState","msWrapFlow","msWrapMargin","msWrapThrough","msWriteProfilerMark","msZoom","msZoomTo","mt","multiEntry","multiSelectionObj","multiline","multiple","multiply","multiplySelf","mutableFile","muted","n","name","nameProp","namedItem","namedRecordset","names","namespaceURI","namespaces","naturalHeight","naturalWidth","navigate","navigation","navigationMode","navigationStart","navigator","near","nearestViewportElement","negative","netscape","networkState","newScale","newTranslate","newURL","newValue","newValueSpecifiedUnits","newVersion","newhome","next","nextElementSibling","nextNode","nextPage","nextSibling","nickname","noHref","noResize","noShade","noValidate","noWrap","nodeName","nodeType","nodeValue","normalize","normalizedPathSegList","notationName","notations","note","noteGrainOn","noteOff","noteOn","now","numOctaves","number","numberOfChannels","numberOfInputs","numberOfItems","numberOfOutputs","numberValue","oMatchesSelector","object","object-fit","object-position","objectFit","objectPosition","objectStore","objectStoreNames","observe","of","offscreenBuffering","offset","offsetHeight","offsetLeft","offsetNode","offsetParent","offsetTop","offsetWidth","offsetX","offsetY","ok","oldURL","oldValue","oldVersion","olderShadowRoot","onLine","onabort","onactivate","onactive","onaddstream","onaddtrack","onafterprint","onafterscriptexecute","onafterupdate","onaudioend","onaudioprocess","onaudiostart","onautocomplete","onautocompleteerror","onbeforeactivate","onbeforecopy","onbeforecut","onbeforedeactivate","onbeforeeditfocus","onbeforepaste","onbeforeprint","onbeforescriptexecute","onbeforeunload","onbeforeupdate","onblocked","onblur","onbounce","onboundary","oncached","oncancel","oncandidatewindowhide","oncandidatewindowshow","oncandidatewindowupdate","oncanplay","oncanplaythrough","once","oncellchange","onchange","onchargingchange","onchargingtimechange","onchecking","onclick","onclose","oncompassneedscalibration","oncomplete","oncontextmenu","oncontrolselect","oncopy","oncuechange","oncut","ondataavailable","ondatachannel","ondatasetchanged","ondatasetcomplete","ondblclick","ondeactivate","ondevicelight","ondevicemotion","ondeviceorientation","ondeviceproximity","ondischargingtimechange","ondisplay","ondownloading","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onencrypted","onend","onended","onenter","onerror","onerrorupdate","onexit","onfilterchange","onfinish","onfocus","onfocusin","onfocusout","onfullscreenchange","onfullscreenerror","ongesturechange","ongestureend","ongesturestart","ongotpointercapture","onhashchange","onhelp","onicecandidate","oniceconnectionstatechange","oninactive","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onlanguagechange","onlayoutcomplete","onlevelchange","onload","onloadeddata","onloadedmetadata","onloadend","onloadstart","onlosecapture","onlostpointercapture","only","onmark","onmessage","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onmove","onmoveend","onmovestart","onmozfullscreenchange","onmozfullscreenerror","onmozorientationchange","onmozpointerlockchange","onmozpointerlockerror","onmscontentzoom","onmsfullscreenchange","onmsfullscreenerror","onmsgesturechange","onmsgesturedoubletap","onmsgestureend","onmsgesturehold","onmsgesturestart","onmsgesturetap","onmsgotpointercapture","onmsinertiastart","onmslostpointercapture","onmsmanipulationstatechanged","onmsneedkey","onmsorientationchange","onmspointercancel","onmspointerdown","onmspointerenter","onmspointerhover","onmspointerleave","onmspointermove","onmspointerout","onmspointerover","onmspointerup","onmssitemodejumplistitemremoved","onmsthumbnailclick","onnegotiationneeded","onnomatch","onnoupdate","onobsolete","onoffline","ononline","onopen","onorientationchange","onpagechange","onpagehide","onpageshow","onpaste","onpause","onplay","onplaying","onpluginstreamstart","onpointercancel","onpointerdown","onpointerenter","onpointerleave","onpointerlockchange","onpointerlockerror","onpointermove","onpointerout","onpointerover","onpointerup","onpopstate","onprogress","onpropertychange","onratechange","onreadystatechange","onremovestream","onremovetrack","onreset","onresize","onresizeend","onresizestart","onresourcetimingbufferfull","onresult","onresume","onrowenter","onrowexit","onrowsdelete","onrowsinserted","onscroll","onsearch","onseeked","onseeking","onselect","onselectionchange","onselectstart","onshow","onsignalingstatechange","onsoundend","onsoundstart","onspeechend","onspeechstart","onstalled","onstart","onstatechange","onstop","onstorage","onstoragecommit","onsubmit","onsuccess","onsuspend","ontextinput","ontimeout","ontimeupdate","ontoggle","ontouchcancel","ontouchend","ontouchmove","ontouchstart","ontransitionend","onunload","onupdateready","onupgradeneeded","onuserproximity","onversionchange","onvoiceschanged","onvolumechange","onwaiting","onwarning","onwebkitanimationend","onwebkitanimationiteration","onwebkitanimationstart","onwebkitcurrentplaybacktargetiswirelesschanged","onwebkitfullscreenchange","onwebkitfullscreenerror","onwebkitkeyadded","onwebkitkeyerror","onwebkitkeymessage","onwebkitneedkey","onwebkitorientationchange","onwebkitplaybacktargetavailabilitychanged","onwebkitpointerlockchange","onwebkitpointerlockerror","onwebkitresourcetimingbufferfull","onwebkittransitionend","onwheel","onzoom","opacity","open","openCursor","openDatabase","openKeyCursor","opener","opera","operationType","operator","opr","optimum","options","order","orderX","orderY","ordered","org","orient","orientAngle","orientType","orientation","origin","originalTarget","orphans","oscpu","outerHTML","outerHeight","outerText","outerWidth","outline","outline-color","outline-offset","outline-style","outline-width","outlineColor","outlineOffset","outlineStyle","outlineWidth","outputBuffer","overflow","overflow-x","overflow-y","overflowX","overflowY","overrideMimeType","oversample","ownerDocument","ownerElement","ownerNode","ownerRule","ownerSVGElement","owningElement","p1","p2","p3","p4","pad","padding","padding-bottom","padding-left","padding-right","padding-top","paddingBottom","paddingLeft","paddingRight","paddingTop","page","page-break-after","page-break-before","page-break-inside","pageBreakAfter","pageBreakBefore","pageBreakInside","pageCount","pageX","pageXOffset","pageY","pageYOffset","pages","paint-order","paintOrder","paintRequests","paintType","palette","panningModel","parent","parentElement","parentNode","parentRule","parentStyleSheet","parentTextEdit","parentWindow","parse","parseFloat","parseFromString","parseInt","participants","passive","password","pasteHTML","path","pathLength","pathSegList","pathSegType","pathSegTypeAsLetter","pathname","pattern","patternContentUnits","patternMismatch","patternTransform","patternUnits","pause","pauseAnimations","pauseOnExit","paused","pending","performance","permission","persisted","personalbar","perspective","perspective-origin","perspectiveOrigin","phoneticFamilyName","phoneticGivenName","photo","ping","pitch","pixelBottom","pixelDepth","pixelHeight","pixelLeft","pixelRight","pixelStorei","pixelTop","pixelUnitToMillimeterX","pixelUnitToMillimeterY","pixelWidth","placeholder","platform","play","playbackRate","playbackState","playbackTime","played","plugins","pluginspage","pname","pointer-events","pointerBeforeReferenceNode","pointerEnabled","pointerEvents","pointerId","pointerLockElement","pointerType","points","pointsAtX","pointsAtY","pointsAtZ","polygonOffset","pop","popupWindowFeatures","popupWindowName","popupWindowURI","port","port1","port2","ports","posBottom","posHeight","posLeft","posRight","posTop","posWidth","position","positionAlign","postError","postMessage","poster","pow","powerOff","preMultiplySelf","precision","preferredStyleSheetSet","preferredStylesheetSet","prefix","preload","prepend","preserveAlpha","preserveAspectRatio","preserveAspectRatioString","pressed","pressure","prevValue","preventDefault","preventExtensions","previousElementSibling","previousNode","previousPage","previousScale","previousSibling","previousTranslate","primaryKey","primitiveType","primitiveUnits","principals","print","privateKey","probablySupportsContext","process","processIceMessage","product","productSub","profile","profileEnd","profiles","prompt","properties","propertyIsEnumerable","propertyName","protocol","protocolLong","prototype","pseudoClass","pseudoElement","publicId","publicKey","published","push","pushNotification","pushState","put","putImageData","quadraticCurveTo","qualifier","queryCommandEnabled","queryCommandIndeterm","queryCommandState","queryCommandSupported","queryCommandText","queryCommandValue","querySelector","querySelectorAll","quote","quotes","r","r1","r2","race","radiogroup","radiusX","radiusY","random","range","rangeCount","rangeMax","rangeMin","rangeOffset","rangeOverflow","rangeParent","rangeUnderflow","rate","ratio","raw","read","readAsArrayBuffer","readAsBinaryString","readAsBlob","readAsDataURL","readAsText","readOnly","readPixels","readReportRequested","readyState","reason","reboot","receiver","receivers","recordNumber","recordset","rect","red","redirectCount","redirectEnd","redirectStart","reduce","reduceRight","reduction","refDistance","refX","refY","referenceNode","referrer","refresh","region","regionAnchorX","regionAnchorY","regionId","regions","register","registerContentHandler","registerElement","registerProtocolHandler","reject","rel","relList","relatedNode","relatedTarget","release","releaseCapture","releaseEvents","releasePointerCapture","releaseShaderCompiler","reliable","reload","remainingSpace","remoteDescription","remove","removeAllRanges","removeAttribute","removeAttributeNS","removeAttributeNode","removeBehavior","removeChild","removeCue","removeEventListener","removeFilter","removeImport","removeItem","removeListener","removeNamedItem","removeNamedItemNS","removeNode","removeParameter","removeProperty","removeRange","removeRegion","removeRule","removeSiteSpecificTrackingException","removeSourceBuffer","removeStream","removeTrack","removeVariable","removeWakeLockListener","removeWebWideTrackingException","removedNodes","renderbufferStorage","renderedBuffer","renderingMode","repeat","replace","replaceAdjacentText","replaceChild","replaceData","replaceId","replaceItem","replaceNode","replaceState","replaceTrack","replaceWholeText","reportValidity","requestAnimationFrame","requestAutocomplete","requestData","requestFullscreen","requestMediaKeySystemAccess","requestPermission","requestPointerLock","requestStart","requestingWindow","required","requiredExtensions","requiredFeatures","reset","resetTransform","resize","resizeBy","resizeTo","resolve","response","responseBody","responseEnd","responseStart","responseText","responseType","responseURL","responseXML","restore","result","resultType","resume","returnValue","rev","reverse","reversed","revocable","revokeObjectURL","rgbColor","right","rightContext","rightMargin","rolloffFactor","root","rootElement","rotate","rotateAxisAngle","rotateAxisAngleSelf","rotateFromVector","rotateFromVectorSelf","rotateSelf","rotation","rotationRate","round","rowIndex","rowSpan","rows","rubyAlign","rubyOverhang","rubyPosition","rules","runtime","runtimeStyle","rx","ry","safari","sampleCoverage","sampleRate","sandbox","save","scale","scale3d","scale3dSelf","scaleNonUniform","scaleNonUniformSelf","scaleSelf","scheme","scissor","scope","scopeName","scoped","screen","screenBrightness","screenEnabled","screenLeft","screenPixelToMillimeterX","screenPixelToMillimeterY","screenTop","screenX","screenY","scripts","scroll","scroll-behavior","scrollAmount","scrollBehavior","scrollBy","scrollByLines","scrollByPages","scrollDelay","scrollHeight","scrollIntoView","scrollIntoViewIfNeeded","scrollLeft","scrollLeftMax","scrollMaxX","scrollMaxY","scrollTo","scrollTop","scrollTopMax","scrollWidth","scrollX","scrollY","scrollbar3dLightColor","scrollbarArrowColor","scrollbarBaseColor","scrollbarDarkShadowColor","scrollbarFaceColor","scrollbarHighlightColor","scrollbarShadowColor","scrollbarTrackColor","scrollbars","scrolling","sdp","sdpMLineIndex","sdpMid","seal","search","searchBox","searchBoxJavaBridge_","searchParams","sectionRowIndex","secureConnectionStart","security","seed","seekable","seeking","select","selectAllChildren","selectNode","selectNodeContents","selectNodes","selectSingleNode","selectSubString","selected","selectedIndex","selectedOptions","selectedStyleSheetSet","selectedStylesheetSet","selection","selectionDirection","selectionEnd","selectionStart","selector","selectorText","self","send","sendAsBinary","sendBeacon","sender","sentTimestamp","separator","serializeToString","serviceWorker","sessionId","sessionStorage","set","setActive","setAlpha","setAttribute","setAttributeNS","setAttributeNode","setAttributeNodeNS","setBaseAndExtent","setBingCurrentSearchDefault","setCapture","setColor","setCompositeOperation","setCurrentTime","setCustomValidity","setData","setDate","setDragImage","setEnd","setEndAfter","setEndBefore","setEndPoint","setFillColor","setFilterRes","setFloat32","setFloat64","setFloatValue","setFullYear","setHours","setImmediate","setInt16","setInt32","setInt8","setInterval","setItem","setLineCap","setLineDash","setLineJoin","setLineWidth","setLocalDescription","setMatrix","setMatrixValue","setMediaKeys","setMilliseconds","setMinutes","setMiterLimit","setMonth","setNamedItem","setNamedItemNS","setNonUserCodeExceptions","setOrientToAngle","setOrientToAuto","setOrientation","setOverrideHistoryNavigationMode","setPaint","setParameter","setPeriodicWave","setPointerCapture","setPosition","setPreference","setProperty","setPrototypeOf","setRGBColor","setRGBColorICCColor","setRadius","setRangeText","setRemoteDescription","setRequestHeader","setResizable","setResourceTimingBufferSize","setRotate","setScale","setSeconds","setSelectionRange","setServerCertificate","setShadow","setSkewX","setSkewY","setStart","setStartAfter","setStartBefore","setStdDeviation","setStringValue","setStrokeColor","setSuggestResult","setTargetAtTime","setTargetValueAtTime","setTime","setTimeout","setTransform","setTranslate","setUTCDate","setUTCFullYear","setUTCHours","setUTCMilliseconds","setUTCMinutes","setUTCMonth","setUTCSeconds","setUint16","setUint32","setUint8","setUri","setValueAtTime","setValueCurveAtTime","setVariable","setVelocity","setVersion","setYear","settingName","settingValue","sex","shaderSource","shadowBlur","shadowColor","shadowOffsetX","shadowOffsetY","shadowRoot","shape","shape-rendering","shapeRendering","sheet","shift","shiftKey","shiftLeft","show","showHelp","showModal","showModalDialog","showModelessDialog","showNotification","sidebar","sign","signalingState","sin","singleNodeValue","sinh","size","sizeToContent","sizes","skewX","skewXSelf","skewY","skewYSelf","slice","slope","small","smooth","smil","smoothingTimeConstant","snapToLines","snapshotItem","snapshotLength","some","sort","source","sourceBuffer","sourceBuffers","sourceIndex","spacing","span","speakAs","speaking","specified","specularConstant","specularExponent","speechSynthesis","speed","speedOfSound","spellcheck","splice","split","splitText","spreadMethod","sqrt","src","srcElement","srcFilter","srcUrn","srcdoc","srclang","srcset","stack","stackTraceLimit","stacktrace","standalone","standby","start","startContainer","startIce","startOffset","startRendering","startTime","startsWith","state","status","statusMessage","statusText","statusbar","stdDeviationX","stdDeviationY","stencilFunc","stencilFuncSeparate","stencilMask","stencilMaskSeparate","stencilOp","stencilOpSeparate","step","stepDown","stepMismatch","stepUp","sticky","stitchTiles","stop","stop-color","stop-opacity","stopColor","stopImmediatePropagation","stopOpacity","stopPropagation","storageArea","storageName","storageStatus","storeSiteSpecificTrackingException","storeWebWideTrackingException","stpVersion","stream","strike","stringValue","stringify","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeRect","strokeStyle","strokeText","strokeWidth","style","styleFloat","styleMedia","styleSheet","styleSheetSets","styleSheets","sub","subarray","subject","submit","subscribe","substr","substring","substringData","subtle","subtree","suffix","suffixes","summary","sup","supports","surfaceScale","surroundContents","suspend","suspendRedraw","swapCache","swapNode","sweepFlag","symbols","system","systemCode","systemId","systemLanguage","systemXDPI","systemYDPI","tBodies","tFoot","tHead","tabIndex","table","table-layout","tableLayout","tableValues","tag","tagName","tagUrn","tags","taintEnabled","takeRecords","tan","tanh","target","targetElement","targetTouches","targetX","targetY","tel","terminate","test","texImage2D","texParameterf","texParameteri","texSubImage2D","text","text-align","text-anchor","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-indent","text-overflow","text-rendering","text-shadow","text-transform","textAlign","textAlignLast","textAnchor","textAutospace","textBaseline","textContent","textDecoration","textDecorationBlink","textDecorationColor","textDecorationLine","textDecorationLineThrough","textDecorationNone","textDecorationOverline","textDecorationStyle","textDecorationUnderline","textIndent","textJustify","textJustifyTrim","textKashida","textKashidaSpace","textLength","textOverflow","textRendering","textShadow","textTracks","textTransform","textUnderlinePosition","then","threadId","threshold","tiltX","tiltY","time","timeEnd","timeStamp","timeout","timestamp","timestampOffset","timing","title","toArray","toBlob","toDataURL","toDateString","toElement","toExponential","toFixed","toFloat32Array","toFloat64Array","toGMTString","toISOString","toJSON","toLocaleDateString","toLocaleFormat","toLocaleLowerCase","toLocaleString","toLocaleTimeString","toLocaleUpperCase","toLowerCase","toMethod","toPrecision","toSdp","toSource","toStaticHTML","toString","toStringTag","toTimeString","toUTCString","toUpperCase","toggle","toggleLongPressEnabled","tooLong","toolbar","top","topMargin","total","totalFrameDelay","totalVideoFrames","touchAction","touches","trace","track","transaction","transactions","transform","transform-origin","transform-style","transformOrigin","transformPoint","transformString","transformStyle","transformToDocument","transformToFragment","transition","transition-delay","transition-duration","transition-property","transition-timing-function","transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction","translate","translateSelf","translationX","translationY","trim","trimLeft","trimRight","trueSpeed","trunc","truncate","type","typeDetail","typeMismatch","typeMustMatch","types","ubound","undefined","unescape","uneval","unicode-bidi","unicodeBidi","uniform1f","uniform1fv","uniform1i","uniform1iv","uniform2f","uniform2fv","uniform2i","uniform2iv","uniform3f","uniform3fv","uniform3i","uniform3iv","uniform4f","uniform4fv","uniform4i","uniform4iv","uniformMatrix2fv","uniformMatrix3fv","uniformMatrix4fv","unique","uniqueID","uniqueNumber","unitType","units","unloadEventEnd","unloadEventStart","unlock","unmount","unobserve","unpause","unpauseAnimations","unreadCount","unregister","unregisterContentHandler","unregisterProtocolHandler","unscopables","unselectable","unshift","unsubscribe","unsuspendRedraw","unsuspendRedrawAll","unwatch","unwrapKey","update","updateCommands","updateIce","updateInterval","updateSettings","updated","updating","upload","upper","upperBound","upperOpen","uri","url","urn","urns","usages","useCurrentView","useMap","useProgram","usedSpace","userAgent","userLanguage","username","v8BreakIterator","vAlign","vLink","valid","validateProgram","validationMessage","validity","value","valueAsDate","valueAsNumber","valueAsString","valueInSpecifiedUnits","valueMissing","valueOf","valueText","valueType","values","vector-effect","vectorEffect","velocityAngular","velocityExpansion","velocityX","velocityY","vendor","vendorSub","verify","version","vertexAttrib1f","vertexAttrib1fv","vertexAttrib2f","vertexAttrib2fv","vertexAttrib3f","vertexAttrib3fv","vertexAttrib4f","vertexAttrib4fv","vertexAttribDivisorANGLE","vertexAttribPointer","vertical","vertical-align","verticalAlign","verticalOverflow","vibrate","videoHeight","videoTracks","videoWidth","view","viewBox","viewBoxString","viewTarget","viewTargetString","viewport","viewportAnchorX","viewportAnchorY","viewportElement","visibility","visibilityState","visible","vlinkColor","voice","volume","vrml","vspace","w","wand","warn","wasClean","watch","watchPosition","webdriver","webkitAddKey","webkitAnimation","webkitAnimationDelay","webkitAnimationDirection","webkitAnimationDuration","webkitAnimationFillMode","webkitAnimationIterationCount","webkitAnimationName","webkitAnimationPlayState","webkitAnimationTimingFunction","webkitAppearance","webkitAudioContext","webkitAudioDecodedByteCount","webkitAudioPannerNode","webkitBackfaceVisibility","webkitBackground","webkitBackgroundAttachment","webkitBackgroundClip","webkitBackgroundColor","webkitBackgroundImage","webkitBackgroundOrigin","webkitBackgroundPosition","webkitBackgroundPositionX","webkitBackgroundPositionY","webkitBackgroundRepeat","webkitBackgroundSize","webkitBackingStorePixelRatio","webkitBorderImage","webkitBorderImageOutset","webkitBorderImageRepeat","webkitBorderImageSlice","webkitBorderImageSource","webkitBorderImageWidth","webkitBoxAlign","webkitBoxDirection","webkitBoxFlex","webkitBoxOrdinalGroup","webkitBoxOrient","webkitBoxPack","webkitBoxSizing","webkitCancelAnimationFrame","webkitCancelFullScreen","webkitCancelKeyRequest","webkitCancelRequestAnimationFrame","webkitClearResourceTimings","webkitClosedCaptionsVisible","webkitConvertPointFromNodeToPage","webkitConvertPointFromPageToNode","webkitCreateShadowRoot","webkitCurrentFullScreenElement","webkitCurrentPlaybackTargetIsWireless","webkitDirectionInvertedFromDevice","webkitDisplayingFullscreen","webkitEnterFullScreen","webkitEnterFullscreen","webkitExitFullScreen","webkitExitFullscreen","webkitExitPointerLock","webkitFullScreenKeyboardInputAllowed","webkitFullscreenElement","webkitFullscreenEnabled","webkitGenerateKeyRequest","webkitGetAsEntry","webkitGetDatabaseNames","webkitGetEntries","webkitGetEntriesByName","webkitGetEntriesByType","webkitGetFlowByName","webkitGetGamepads","webkitGetImageDataHD","webkitGetNamedFlows","webkitGetRegionFlowRanges","webkitGetUserMedia","webkitHasClosedCaptions","webkitHidden","webkitIDBCursor","webkitIDBDatabase","webkitIDBDatabaseError","webkitIDBDatabaseException","webkitIDBFactory","webkitIDBIndex","webkitIDBKeyRange","webkitIDBObjectStore","webkitIDBRequest","webkitIDBTransaction","webkitImageSmoothingEnabled","webkitIndexedDB","webkitInitMessageEvent","webkitIsFullScreen","webkitKeys","webkitLineDashOffset","webkitLockOrientation","webkitMatchesSelector","webkitMediaStream","webkitNotifications","webkitOfflineAudioContext","webkitOrientation","webkitPeerConnection00","webkitPersistentStorage","webkitPointerLockElement","webkitPostMessage","webkitPreservesPitch","webkitPutImageDataHD","webkitRTCPeerConnection","webkitRegionOverset","webkitRequestAnimationFrame","webkitRequestFileSystem","webkitRequestFullScreen","webkitRequestFullscreen","webkitRequestPointerLock","webkitResolveLocalFileSystemURL","webkitSetMediaKeys","webkitSetResourceTimingBufferSize","webkitShadowRoot","webkitShowPlaybackTargetPicker","webkitSlice","webkitSpeechGrammar","webkitSpeechGrammarList","webkitSpeechRecognition","webkitSpeechRecognitionError","webkitSpeechRecognitionEvent","webkitStorageInfo","webkitSupportsFullscreen","webkitTemporaryStorage","webkitTextSizeAdjust","webkitTransform","webkitTransformOrigin","webkitTransition","webkitTransitionDelay","webkitTransitionDuration","webkitTransitionProperty","webkitTransitionTimingFunction","webkitURL","webkitUnlockOrientation","webkitUserSelect","webkitVideoDecodedByteCount","webkitVisibilityState","webkitWirelessVideoPlaybackDisabled","webkitdropzone","webstore","weight","whatToShow","wheelDelta","wheelDeltaX","wheelDeltaY","which","white-space","whiteSpace","wholeText","widows","width","will-change","willChange","willValidate","window","withCredentials","word-break","word-spacing","word-wrap","wordBreak","wordSpacing","wordWrap","wrap","wrapKey","write","writeln","writingMode","x","x1","x2","xChannelSelector","xmlEncoding","xmlStandalone","xmlVersion","xmlbase","xmllang","xmlspace","y","y1","y2","yChannelSelector","yandex","z","z-index","zIndex","zoom","zoomAndPan","zoomRectScreen"];function Gn(e,t){function n(e){p(t,e)}e.walk(new En(function(e){e instanceof Tt&&e.quote?n(e.key):e instanceof vt&&e.quote?n(e.key.name):e instanceof pt&&Hn(e.property,n)}))}function Hn(e,t){e.walk(new En(function(e){return e instanceof ct?Hn(e.tail_node(),t):e instanceof en?t(e.value):e instanceof ht&&(Hn(e.consequent,t),Hn(e.alternative,t)),!0}))}function Xn(e,t){var n=(t=o(t,{builtins:!1,cache:null,debug:!1,keep_quoted:!1,only_cache:!1,regex:null,reserved:null,undeclared:!1},!0)).reserved;Array.isArray(n)||(n=[n]);var i=new Set(n);t.builtins||function(e){Un.forEach(i);var t={},n="object"==typeof global?global:self;function i(t){e.add(t)}["Symbol","Map","Promise","Proxy","Reflect","Set","WeakMap","WeakSet"].forEach(function(e){t[e]=n[e]||new Function}),["null","true","false","Infinity","-Infinity","undefined"].forEach(i),[Object,Array,Function,Number,String,Boolean,Error,Math,Date,RegExp,t.Symbol,ArrayBuffer,DataView,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,eval,EvalError,Float32Array,Float64Array,Int8Array,Int16Array,Int32Array,isFinite,isNaN,JSON,t.Map,parseFloat,parseInt,t.Promise,t.Proxy,RangeError,ReferenceError,t.Reflect,t.Set,SyntaxError,TypeError,Uint8Array,Uint8ClampedArray,Uint16Array,Uint32Array,URIError,t.WeakMap,t.WeakSet].forEach(function(e){Object.getOwnPropertyNames(e).map(i),e.prototype&&Object.getOwnPropertyNames(e.prototype).map(i)})}(i);var r,a=-1;t.cache?(r=t.cache.props).forEach(function(e){i.add(e)}):r=new Map;var s,u=t.regex&&new RegExp(t.regex),c=!1!==t.debug;c&&(s=!0===t.debug?"":t.debug);var l=new Set,f=new Set,p="strict"===t.keep_quoted;return e.walk(new En(function(e){if(e instanceof Tt)"string"!=typeof e.key||p&&e.quote||m(e.key);else if(e instanceof vt)p&&e.key.end.quote||m(e.key.name);else if(e instanceof ft){var n=!!t.undeclared;if(!n){for(var i=e;i.expression;)i=i.expression;n=!(i.thedef&&i.thedef.undeclared)}!n||p&&e.quote||m(e.property)}else e instanceof pt?p||Hn(e.property,m):e instanceof st&&"Object.defineProperty"==e.expression.print_to_string()&&Hn(e.args[1],m)})),e.transform(new hn(function(e){e instanceof Tt?"string"!=typeof e.key||p&&e.quote||(e.key=E(e.key)):e instanceof vt?p&&e.key.end.quote||(e.key.name=E(e.key.name)):e instanceof ft?p&&e.quote||(e.property=E(e.property)):!t.keep_quoted&&e instanceof pt?e.property=h(e.property):e instanceof st&&"Object.defineProperty"==e.expression.print_to_string()&&(e.args[1]=h(e.args[1]))}));function _(e){return!f.has(e)&&(!i.has(e)&&(t.only_cache?r.has(e):!/^-?[0-9]+(\.[0-9]+)?(e[+-][0-9]+)?$/.test(e)))}function d(e){return!(u&&!u.test(e))&&(!i.has(e)&&(r.has(e)||l.has(e)))}function m(e){_(e)&&l.add(e),d(e)||f.add(e)}function E(e){if(!d(e))return e;var t=r.get(e);if(!t){if(c){var n="_$"+e+"$"+s+"_";_(n)&&(t=n)}if(!t)do{t=Nn(++a)}while(!_(t));r.set(e,t)}return t}function h(e){return e.transform(new hn(function(e){if(e instanceof ct){var t=e.expressions.length-1;e.expressions[t]=h(e.expressions[t])}else e instanceof en?e.value=E(e.value):e instanceof ht&&(e.consequent=h(e.consequent),e.alternative=h(e.alternative));return e}))}}var zn="undefined"==typeof atob?function(e){return Buffer.from(e,"base64").toString()}:atob,Wn="undefined"==typeof btoa?function(e){return Buffer.from(e).toString("base64")}:btoa;function Yn(e,t,n){t[e]&&n.forEach(function(n){t[n]&&("object"!=typeof t[n]&&(t[n]={}),e in t[n]||(t[n][e]=t[e]))})}function qn(e){e&&("props"in e?e.props instanceof Map||(e.props=function(e){var t=new Map;for(var n in e)D(e,n)&&"$"===n.charAt(0)&&t.set(n.substr(1),e[n]);return t}(e.props)):e.props=new Map)}function $n(e){return{props:(t=e.props,n=Object.create(null),t.forEach(function(e,t){n["$"+t]=e}),n)};var t,n}function jn(e,n){var i,r,a=ae.warn_function;try{var s,u=(n=o(n,{compress:{},ecma:void 0,enclose:!1,ie8:!1,keep_classnames:void 0,keep_fnames:!1,mangle:{},module:!1,nameCache:null,output:{},parse:{},rename:void 0,safari10:!1,sourceMap:!1,timings:!1,toplevel:!1,warnings:!1,wrap:!1},!0)).timings&&{start:Date.now()};void 0===n.keep_classnames&&(n.keep_classnames=n.keep_fnames),void 0===n.rename&&(n.rename=n.compress&&n.mangle),Yn("ecma",n,["parse","compress","output"]),Yn("ie8",n,["compress","mangle","output"]),Yn("keep_classnames",n,["compress","mangle"]),Yn("keep_fnames",n,["compress","mangle"]),Yn("module",n,["parse","compress","mangle"]),Yn("safari10",n,["mangle","output"]),Yn("toplevel",n,["compress","mangle"]),Yn("warnings",n,["compress"]),n.mangle&&(n.mangle=o(n.mangle,{cache:n.nameCache&&(n.nameCache.vars||{}),eval:!1,ie8:!1,keep_classnames:!1,keep_fnames:!1,module:!1,properties:!1,reserved:[],safari10:!1,toplevel:!1},!0),n.mangle.properties&&("object"!=typeof n.mangle.properties&&(n.mangle.properties={}),n.mangle.properties.keep_quoted&&(s=n.mangle.properties.reserved,Array.isArray(s)||(s=[]),n.mangle.properties.reserved=s),!n.nameCache||"cache"in n.mangle.properties||(n.mangle.properties.cache=n.nameCache.props||{})),qn(n.mangle.cache),qn(n.mangle.properties.cache)),n.sourceMap&&(n.sourceMap=o(n.sourceMap,{asObject:!1,content:null,filename:null,includeSources:!1,root:null,url:null},!0));var c,l=[];if(n.warnings&&!ae.warn_function&&(ae.warn_function=function(e){l.push(e)}),u&&(u.parse=Date.now()),e instanceof Oe)c=e;else{for(var f in"string"==typeof e&&(e=[e]),n.parse=n.parse||{},n.parse.toplevel=null,e)if(D(e,f)&&(n.parse.filename=f,n.parse.toplevel=ie(e[f],n.parse),n.sourceMap&&"inline"==n.sourceMap.content)){if(Object.keys(e).length>1)throw new Error("inline source map only works with singular input");n.sourceMap.content=(i=e[f],r=void 0,(r=/(?:^|[^.])\/\/# sourceMappingURL=data:application\/json(;[\w=-]*)?;base64,([+\/0-9A-Za-z]*=*)\s*$/.exec(i))?zn(r[2]):(ae.warn("inline source map not found"),null))}c=n.parse.toplevel}s&&"strict"!==n.mangle.properties.keep_quoted&&Gn(c,s),n.wrap&&(c=c.wrap_commonjs(n.wrap)),n.enclose&&(c=c.wrap_enclose(n.enclose)),u&&(u.rename=Date.now()),u&&(u.compress=Date.now()),n.compress&&(c=new Kn(n.compress).compress(c)),u&&(u.scope=Date.now()),n.mangle&&c.figure_out_scope(n.mangle),u&&(u.mangle=Date.now()),n.mangle&&(Nn.reset(),c.compute_char_frequency(n.mangle),c.mangle_names(n.mangle)),u&&(u.properties=Date.now()),n.mangle&&n.mangle.properties&&(c=Xn(c,n.mangle.properties)),u&&(u.output=Date.now());var p={};if(n.output.ast&&(p.ast=c),!D(n.output,"code")||n.output.code){if(n.sourceMap&&("string"==typeof n.sourceMap.content&&(n.sourceMap.content=JSON.parse(n.sourceMap.content)),n.output.source_map=function(e){e=o(e,{file:null,root:null,orig:null,orig_line_diff:0,dest_line_diff:0});var n=new t.SourceMapGenerator({file:e.file,sourceRoot:e.root}),i=e.orig&&new t.SourceMapConsumer(e.orig);return i&&i.sources.forEach(function(e){var t=i.sourceContentFor(e,!0);t&&n.setSourceContent(e,t)}),{add:function(t,r,o,a,s,u){if(i){var c=i.originalPositionFor({line:a,column:s});if(null===c.source)return;t=c.source,a=c.line,s=c.column,u=c.name||u}n.addMapping({generated:{line:r+e.dest_line_diff,column:o},original:{line:a+e.orig_line_diff,column:s},source:t,name:u})},get:function(){return n},toString:function(){return JSON.stringify(n.toJSON())}}}({file:n.sourceMap.filename,orig:n.sourceMap.content,root:n.sourceMap.root}),n.sourceMap.includeSources)){if(e instanceof Oe)throw new Error("original source content unavailable");for(var f in e)D(e,f)&&n.output.source_map.get().setSourceContent(f,e[f])}delete n.output.ast,delete n.output.code;var _=Cn(n.output);if(c.print(_),p.code=_.get(),n.sourceMap)if(n.sourceMap.asObject?p.map=n.output.source_map.get().toJSON():p.map=n.output.source_map.toString(),"inline"==n.sourceMap.url){var d="object"==typeof p.map?JSON.stringify(p.map):p.map;p.code+="\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,"+Wn(d)}else n.sourceMap.url&&(p.code+="\n//# sourceMappingURL="+n.sourceMap.url)}return n.nameCache&&n.mangle&&(n.mangle.cache&&(n.nameCache.vars=$n(n.mangle.cache)),n.mangle.properties&&n.mangle.properties.cache&&(n.nameCache.props=$n(n.mangle.properties.cache))),u&&(u.end=Date.now(),p.timings={parse:.001*(u.rename-u.parse),rename:.001*(u.compress-u.rename),compress:.001*(u.scope-u.compress),scope:.001*(u.mangle-u.scope),mangle:.001*(u.properties-u.mangle),properties:.001*(u.output-u.properties),output:.001*(u.end-u.output),total:.001*(u.end-u.start)}),l.length&&(p.warnings=l),p}catch(e){return{error:e}}finally{ae.warn_function=a}}function Zn(e){var t=jn("",e);return t.error&&t.error.defs}!function(){var e=function(e){for(var t=!0,n=0;n<e.length;n++)t&&e[n]instanceof se&&e[n].body instanceof en?e[n]=new ce({start:e[n].start,end:e[n].end,value:e[n].body.value}):!t||e[n]instanceof se&&e[n].body instanceof en||(t=!1);return e},t={Program:function(t){return new Oe({start:i(t),end:r(t),body:e(t.body.map(s))})},ArrayPattern:function(e){return new ke({start:i(e),end:r(e),names:e.elements.map(function(e){return null===e?new cn:s(e)}),is_array:!0})},ObjectPattern:function(e){return new ke({start:i(e),end:r(e),names:e.properties.map(s),is_array:!1})},AssignmentPattern:function(e){var t=Et;if(a.length>2){var n=a[a.length-2];"FunctionDeclaration"!==n.type&&"FunctionExpression"!==n.type&&"ArrowFunctionExpression"!==n.type||(t=gt)}return new t({start:i(e),end:r(e),left:s(e.left),operator:"=",right:s(e.right)})},SpreadElement:function(e){return new Fe({start:i(e),end:r(e),expression:s(e.argument)})},RestElement:function(e){return new Fe({start:i(e),end:r(e),expression:s(e.argument)})},TemplateElement:function(e){return new Ve({start:i(e),end:r(e),value:e.value.cooked,raw:e.value.raw})},TemplateLiteral:function(e){for(var t=[],n=0;n<e.quasis.length;n++)t.push(s(e.quasis[n])),e.expressions[n]&&t.push(s(e.expressions[n]));return new Le({start:i(e),end:r(e),segments:t})},TaggedTemplateExpression:function(e){return new Ie({start:i(e),end:r(e),template_string:s(e.quasi),prefix:s(e.tag)})},FunctionDeclaration:function(t){return new xe({start:i(t),end:r(t),name:s(t.id),argnames:t.params.map(s),is_generator:t.generator,async:t.async,body:e(s(t.body).body)})},FunctionExpression:function(t){return new we({start:i(t),end:r(t),name:s(t.id),argnames:t.params.map(s),is_generator:t.generator,async:t.async,body:e(s(t.body).body)})},ArrowFunctionExpression:function(e){return new Ne({start:i(e),end:r(e),argnames:e.params.map(s),body:s(e.body),async:e.async})},ExpressionStatement:function(e){return new le({start:i(e),end:r(e),body:s(e.expression)})},TryStatement:function(e){var t=e.handlers||[e.handler];if(t.length>1||e.guardedHandlers&&e.guardedHandlers.length)throw new Error("Multiple catch clauses are not supported.");return new je({start:i(e),end:r(e),body:s(e.block).body,bcatch:s(t[0]),bfinally:e.finalizer?new Je(s(e.finalizer)):null})},Property:function(e){var t=e.key,n={start:i(t||e.value),end:r(e.value),key:"Identifier"==t.type?t.name:t.value,value:s(e.value)};return e.computed&&(n.key=s(e.key)),e.method?(n.is_generator=e.value.generator,n.async=e.value.async,e.computed?n.key=s(e.key):n.key=new Bt({name:n.key}),new Ct(n)):"init"==e.kind?("Identifier"!=t.type&&"Literal"!=t.type&&(n.key=s(t)),new Tt(n)):("string"!=typeof n.key&&"number"!=typeof n.key||(n.key=new Bt({name:n.key})),n.value=new Re(n.value),"get"==e.kind?new yt(n):"set"==e.kind?new bt(n):"method"==e.kind?(n.async=e.value.async,n.is_generator=e.value.generator,n.quote=e.computed?'"':null,new Ct(n)):void 0)},MethodDefinition:function(e){var t={start:i(e),end:r(e),key:e.computed?s(e.key):new Bt({name:e.key.name||e.key.value}),value:s(e.value),static:e.static};return"get"==e.kind?new yt(t):"set"==e.kind?new bt(t):(t.is_generator=e.value.generator,t.async=e.value.async,new Ct(t))},ArrayExpression:function(e){return new St({start:i(e),end:r(e),elements:e.elements.map(function(e){return null===e?new cn:s(e)})})},ObjectExpression:function(e){return new At({start:i(e),end:r(e),properties:e.properties.map(function(e){return"SpreadElement"===e.type?s(e):(e.type="Property",s(e))})})},SequenceExpression:function(e){return new ct({start:i(e),end:r(e),expressions:e.expressions.map(s)})},MemberExpression:function(e){return new(e.computed?pt:ft)({start:i(e),end:r(e),property:e.computed?s(e.property):e.property.name,expression:s(e.object)})},SwitchCase:function(e){return new(e.test?$e:qe)({start:i(e),end:r(e),expression:s(e.test),body:e.consequent.map(s)})},VariableDeclaration:function(e){return new("const"===e.kind?nt:"let"===e.kind?tt:et)({start:i(e),end:r(e),definitions:e.declarations.map(s)})},ImportDeclaration:function(e){var t=null,n=null;return e.specifiers.forEach(function(e){"ImportSpecifier"===e.type?(n||(n=[]),n.push(new it({start:i(e),end:r(e),foreign_name:s(e.imported),name:s(e.local)}))):"ImportDefaultSpecifier"===e.type?t=s(e.local):"ImportNamespaceSpecifier"===e.type&&(n||(n=[]),n.push(new it({start:i(e),end:r(e),foreign_name:new zt({name:"*"}),name:s(e.local)})))}),new rt({start:i(e),end:r(e),imported_name:t,imported_names:n,module_name:s(e.source)})},ExportAllDeclaration:function(e){return new ot({start:i(e),end:r(e),exported_names:[new it({name:new $t({name:"*"}),foreign_name:new $t({name:"*"})})],module_name:s(e.source)})},ExportNamedDeclaration:function(e){return new ot({start:i(e),end:r(e),exported_definition:s(e.declaration),exported_names:e.specifiers&&e.specifiers.length?e.specifiers.map(function(e){return new it({foreign_name:s(e.exported),name:s(e.local)})}):null,module_name:s(e.source)})},ExportDefaultDeclaration:function(e){return new ot({start:i(e),end:r(e),exported_value:s(e.declaration),is_default:!0})},Literal:function(e){var t=e.value,n={start:i(e),end:r(e)},o=e.regex;if(o&&o.pattern)return n.value=new RegExp(o.pattern,o.flags),new rn(n);if(o){const i=e.raw||t,r=i.match(/^\/(.*)\/(\w*)$/);if(!r)throw new Error("Invalid regex source "+i);const[o,a,s]=r;return n.value=new RegExp(a,s),new rn(n)}if(null===t)return new an(n);switch(typeof t){case"string":return n.value=t,new en(n);case"number":return n.value=t,new tn(n);case"boolean":return new(t?_n:pn)(n)}},MetaProperty:function(e){if("new"===e.meta.name&&"target"===e.property.name)return new wt({start:i(e),end:r(e)})},Identifier:function(e){var t=a[a.length-2];return new("LabeledStatement"==t.type?Wt:"VariableDeclarator"==t.type&&t.id===e?"const"==t.kind?It:"let"==t.kind?Lt:xt:/Import.*Specifier/.test(t.type)?t.local===e?Xt:zt:"ExportSpecifier"==t.type?t.local===e?qt:$t:"FunctionExpression"==t.type?t.id===e?Kt:Vt:"FunctionDeclaration"==t.type?t.id===e?Pt:Vt:"ArrowFunctionExpression"==t.type?t.params.includes(e)?Vt:Yt:"ClassExpression"==t.type?t.id===e?Gt:Yt:"Property"==t.type?t.key===e&&t.computed||t.value===e?Yt:Bt:"ClassDeclaration"==t.type?t.id===e?Ut:Yt:"MethodDefinition"==t.type?t.computed?Yt:Bt:"CatchClause"==t.type?Ht:"BreakStatement"==t.type||"ContinueStatement"==t.type?jt:Yt)({start:i(e),end:r(e),name:e.name})},BigIntLiteral:e=>new nn({start:i(e),end:r(e),value:e.value})};function n(e){if("Literal"==e.type)return null!=e.raw?e.raw:e.value+""}function i(e){var t=e.loc,i=t&&t.start,r=e.range;return new oe({file:t&&t.source,line:i&&i.line,col:i&&i.column,pos:r?r[0]:e.start,endline:i&&i.line,endcol:i&&i.column,endpos:r?r[0]:e.start,raw:n(e)})}function r(e){var t=e.loc,i=t&&t.end,r=e.range;return new oe({file:t&&t.source,line:i&&i.line,col:i&&i.column,pos:r?r[1]:e.end,endline:i&&i.line,endcol:i&&i.column,endpos:r?r[1]:e.end,raw:n(e)})}function o(e,n,o){var a="function From_Moz_"+e+"(M){\n";a+="return new U2."+n.name+"({\nstart: my_start_token(M),\nend: my_end_token(M)";var c="function To_Moz_"+e+"(M){\n";c+="return {\ntype: "+JSON.stringify(e),o&&o.split(/\s*,\s*/).forEach(function(e){var t=/([a-z0-9$_]+)([=@>%])([a-z0-9$_]+)/i.exec(e);if(!t)throw new Error("Can't understand property map: "+e);var n=t[1],i=t[2],r=t[3];switch(a+=",\n"+r+": ",c+=",\n"+n+": ",i){case"@":a+="M."+n+".map(from_moz)",c+="M."+r+".map(to_moz)";break;case">":a+="from_moz(M."+n+")",c+="to_moz(M."+r+")";break;case"=":a+="M."+n,c+="M."+r;break;case"%":a+="from_moz(M."+n+").body",c+="to_moz_block(M)";break;default:throw new Error("Can't understand operator in propmap: "+e)}}),a+="\n})\n}",c+="\n}\n}",a=new Function("U2","my_start_token","my_end_token","from_moz","return("+a+")")(Dn,i,r,s),c=new Function("to_moz","to_moz_block","to_moz_scope","return("+c+")")(l,p,_),t[e]=a,u(n,c)}t.UpdateExpression=t.UnaryExpression=function(e){return new(("prefix"in e?e.prefix:"UnaryExpression"==e.type)?dt:mt)({start:i(e),end:r(e),operator:e.operator,expression:s(e.argument)})},t.ClassDeclaration=t.ClassExpression=function(e){return new("ClassDeclaration"===e.type?Ft:Mt)({start:i(e),end:r(e),name:s(e.id),extends:s(e.superClass),properties:e.body.body.map(s)})},o("EmptyStatement",me),o("BlockStatement",de,"body@body"),o("IfStatement",ze,"test>condition, consequent>body, alternate>alternative"),o("LabeledStatement",he,"label>label, body>body"),o("BreakStatement",He,"label>label"),o("ContinueStatement",Xe,"label>label"),o("WithStatement",ye,"object>expression, body>body"),o("SwitchStatement",We,"discriminant>expression, cases@body"),o("ReturnStatement",Ke,"argument>value"),o("ThrowStatement",Ue,"argument>value"),o("WhileStatement",Ae,"test>condition, body>body"),o("DoWhileStatement",Se,"test>condition, body>body"),o("ForStatement",ve,"init>init, test>condition, update>step, body>body"),o("ForInStatement",Te,"left>init, right>object, body>body"),o("ForOfStatement",be,"left>init, right>object, body>body, await=await"),o("AwaitExpression",dn,"argument>expression"),o("YieldExpression",mn,"argument>expression, delegate=is_star"),o("DebuggerStatement",ue),o("VariableDeclarator",at,"id>name, init>value"),o("CatchClause",Ze,"param>argname, body%body"),o("ThisExpression",Zt),o("Super",Jt),o("BinaryExpression",Et,"operator=operator, left>left, right>right"),o("LogicalExpression",Et,"operator=operator, left>left, right>right"),o("AssignmentExpression",Dt,"operator=operator, left>left, right>right"),o("ConditionalExpression",ht,"test>condition, consequent>consequent, alternate>alternative"),o("NewExpression",ut,"callee>expression, arguments@args"),o("CallExpression",st,"callee>expression, arguments@args"),u(Oe,function(e){return _("Program",e)}),u(Fe,function(e,t){return{type:f()?"RestElement":"SpreadElement",argument:l(e.expression)}}),u(Ie,function(e){return{type:"TaggedTemplateExpression",tag:l(e.prefix),quasi:l(e.template_string)}}),u(Le,function(e){for(var t=[],n=[],i=0;i<e.segments.length;i++)i%2!=0?n.push(l(e.segments[i])):t.push({type:"TemplateElement",value:{raw:e.segments[i].raw,cooked:e.segments[i].value},tail:i===e.segments.length-1});return{type:"TemplateLiteral",quasis:t,expressions:n}}),u(xe,function(e){return{type:"FunctionDeclaration",id:l(e.name),params:e.argnames.map(l),generator:e.is_generator,async:e.async,body:_("BlockStatement",e)}}),u(we,function(e,t){var n=void 0!==t.is_generator?t.is_generator:e.is_generator;return{type:"FunctionExpression",id:l(e.name),params:e.argnames.map(l),generator:n,async:e.async,body:_("BlockStatement",e)}}),u(Ne,function(e){var t=e.body instanceof Array?{type:"BlockStatement",body:e.body.map(l)}:l(e.body);return{type:"ArrowFunctionExpression",params:e.argnames.map(l),async:e.async,body:t}}),u(ke,function(e){return e.is_array?{type:"ArrayPattern",elements:e.names.map(l)}:{type:"ObjectPattern",properties:e.names.map(l)}}),u(ce,function(e){return{type:"ExpressionStatement",expression:{type:"Literal",value:e.value}}}),u(le,function(e){return{type:"ExpressionStatement",expression:l(e.body)}}),u(Ye,function(e){return{type:"SwitchCase",test:l(e.expression),consequent:e.body.map(l)}}),u(je,function(e){return{type:"TryStatement",block:p(e),handler:l(e.bcatch),guardedHandlers:[],finalizer:l(e.bfinally)}}),u(Ze,function(e){return{type:"CatchClause",param:l(e.argname),guard:null,body:p(e)}}),u(Qe,function(e){return{type:"VariableDeclaration",kind:e instanceof nt?"const":e instanceof tt?"let":"var",declarations:e.definitions.map(l)}}),u(ot,function(e){return e.exported_names?"*"===e.exported_names[0].name.name?{type:"ExportAllDeclaration",source:l(e.module_name)}:{type:"ExportNamedDeclaration",specifiers:e.exported_names.map(function(e){return{type:"ExportSpecifier",exported:l(e.foreign_name),local:l(e.name)}}),declaration:l(e.exported_definition),source:l(e.module_name)}:{type:e.is_default?"ExportDefaultDeclaration":"ExportNamedDeclaration",declaration:l(e.exported_value||e.exported_definition)}}),u(rt,function(e){var t=[];return e.imported_name&&t.push({type:"ImportDefaultSpecifier",local:l(e.imported_name)}),e.imported_names&&"*"===e.imported_names[0].foreign_name.name?t.push({type:"ImportNamespaceSpecifier",local:l(e.imported_names[0].name)}):e.imported_names&&e.imported_names.forEach(function(e){t.push({type:"ImportSpecifier",local:l(e.name),imported:l(e.foreign_name)})}),{type:"ImportDeclaration",specifiers:t,source:l(e.module_name)}}),u(ct,function(e){return{type:"SequenceExpression",expressions:e.expressions.map(l)}}),u(lt,function(e){var t=e instanceof pt;return{type:"MemberExpression",object:l(e.expression),computed:t,property:t?l(e.property):{type:"Identifier",name:e.property}}}),u(_t,function(e){return{type:"++"==e.operator||"--"==e.operator?"UpdateExpression":"UnaryExpression",operator:e.operator,prefix:e instanceof dt,argument:l(e.expression)}}),u(Et,function(e){return"="==e.operator&&f()?{type:"AssignmentPattern",left:l(e.left),right:l(e.right)}:{type:"&&"==e.operator||"||"==e.operator?"LogicalExpression":"BinaryExpression",left:l(e.left),operator:e.operator,right:l(e.right)}}),u(St,function(e){return{type:"ArrayExpression",elements:e.elements.map(l)}}),u(At,function(e){return{type:"ObjectExpression",properties:e.properties.map(l)}}),u(vt,function(e,t){var n,i=e.key instanceof ae?l(e.key):{type:"Identifier",value:e.key};"number"==typeof e.key&&(i={type:"Literal",value:Number(e.key)}),"string"==typeof e.key&&(i={type:"Identifier",name:e.key});var r="string"==typeof e.key||"number"==typeof e.key,o=!r&&(!(e.key instanceof Rt)||e.key instanceof Yt);return e instanceof Tt?(n="init",o=!r):e instanceof yt?n="get":e instanceof bt&&(n="set"),t instanceof Ot?{type:"MethodDefinition",computed:o,kind:n,static:e.static,key:l(e.key),value:l(e.value)}:{type:"Property",computed:o,kind:n,key:i,value:l(e.value)}}),u(Ct,function(e,t){return t instanceof At?{type:"Property",computed:!(e.key instanceof Rt)||e.key instanceof Yt,kind:"init",method:!0,shorthand:!1,key:l(e.key),value:l(e.value)}:{type:"MethodDefinition",computed:!(e.key instanceof Rt)||e.key instanceof Yt,kind:"constructor"===e.key?"constructor":"method",static:e.static,key:l(e.key),value:l(e.value)}}),u(Ot,function(e){return{type:e instanceof Mt?"ClassExpression":"ClassDeclaration",superClass:l(e.extends),id:e.name?l(e.name):null,body:{type:"ClassBody",body:e.properties.map(l)}}}),u(wt,function(e){return{type:"MetaProperty",meta:{type:"Identifier",name:"new"},property:{type:"Identifier",name:"target"}}}),u(Rt,function(e,t){if(e instanceof Bt&&t.quote)return{type:"Literal",value:e.name};var n=e.definition();return{type:"Identifier",name:n?n.mangled_name||n.name:e.name}}),u(rn,function(e){const t=e.value.toString(),n=e.value.source,i=t.match(/\w*$/)[0];return{type:"Literal",value:null,raw:t,regex:{pattern:n,flags:i}}}),u(Qt,function(e){var t=e.value;return"number"==typeof t&&(t<0||0===t&&1/t<0)?{type:"UnaryExpression",operator:"-",prefix:!0,argument:{type:"Literal",value:-t,raw:e.start.raw}}:{type:"Literal",value:t,raw:e.start.raw}}),u(on,function(e){return{type:"Identifier",name:String(e.value)}}),u(nn,e=>({type:"BigIntLiteral",value:e.value})),fn.DEFMETHOD("to_mozilla_ast",Qt.prototype.to_mozilla_ast),an.DEFMETHOD("to_mozilla_ast",Qt.prototype.to_mozilla_ast),cn.DEFMETHOD("to_mozilla_ast",function(){return null}),_e.DEFMETHOD("to_mozilla_ast",de.prototype.to_mozilla_ast),Me.DEFMETHOD("to_mozilla_ast",we.prototype.to_mozilla_ast);var a=null;function s(e){a.push(e);var n=null!=e?t[e.type](e):null;return a.pop(),n}function u(e,t){e.DEFMETHOD("to_mozilla_ast",function(e){return n=this,i=t(this,e),r=n.start,o=n.end,r&&o?(null!=r.pos&&null!=o.endpos&&(i.range=[r.pos,o.endpos]),r.line&&(i.loc={start:{line:r.line,column:r.col},end:o.endline?{line:o.endline,column:o.endcol}:null},r.file&&(i.loc.source=r.file)),i):i;var n,i,r,o})}ae.from_mozilla_ast=function(e){var t=a;a=[];var n=s(e);return a=t,n};var c=null;function l(e){null===c&&(c=[]),c.push(e);var t=null!=e?e.to_mozilla_ast(c[c.length-2]):null;return c.pop(),0===c.length&&(c=null),t}function f(){for(var e=c.length;e--;)if(c[e]instanceof ke)return!0;return!1}function p(e){return{type:"BlockStatement",body:e.body.map(l)}}function _(e,t){var n=t.body.map(l);return t.body[0]instanceof le&&t.body[0].body instanceof en&&n.unshift(l(new me(t.body[0]))),{type:e,body:n}}}(),e.AST_Accessor=Re,e.AST_Array=St,e.AST_Arrow=Ne,e.AST_Assign=Dt,e.AST_Atom=on,e.AST_Await=dn,e.AST_Binary=Et,e.AST_Block=_e,e.AST_BlockStatement=de,e.AST_Boolean=fn,e.AST_Break=He,e.AST_Call=st,e.AST_Case=$e,e.AST_Catch=Ze,e.AST_Class=Ot,e.AST_ClassExpression=Mt,e.AST_ConciseMethod=Ct,e.AST_Conditional=ht,e.AST_Const=nt,e.AST_Constant=Qt,e.AST_Continue=Xe,e.AST_DWLoop=ge,e.AST_Debugger=ue,e.AST_DefClass=Ft,e.AST_Default=qe,e.AST_DefaultAssign=gt,e.AST_Definitions=Qe,e.AST_Defun=xe,e.AST_Destructuring=ke,e.AST_Directive=ce,e.AST_Do=Se,e.AST_Dot=ft,e.AST_EmptyStatement=me,e.AST_Exit=Be,e.AST_Expansion=Fe,e.AST_Export=ot,e.AST_False=pn,e.AST_Finally=Je,e.AST_For=ve,e.AST_ForIn=Te,e.AST_ForOf=be,e.AST_Function=we,e.AST_Hole=cn,e.AST_If=ze,e.AST_Import=rt,e.AST_Infinity=ln,e.AST_IterationStatement=De,e.AST_Jump=Pe,e.AST_Label=Wt,e.AST_LabelRef=jt,e.AST_LabeledStatement=he,e.AST_Lambda=Me,e.AST_Let=tt,e.AST_LoopControl=Ge,e.AST_NaN=sn,e.AST_NameMapping=it,e.AST_New=ut,e.AST_NewTarget=wt,e.AST_Node=ae,e.AST_Null=an,e.AST_Number=tn,e.AST_Object=At,e.AST_ObjectGetter=yt,e.AST_ObjectKeyVal=Tt,e.AST_ObjectProperty=vt,e.AST_ObjectSetter=bt,e.AST_PrefixedTemplateString=Ie,e.AST_PropAccess=lt,e.AST_RegExp=rn,e.AST_Return=Ke,e.AST_Scope=Ce,e.AST_Sequence=ct,e.AST_SimpleStatement=le,e.AST_Statement=se,e.AST_StatementWithBody=Ee,e.AST_String=en,e.AST_Sub=pt,e.AST_Super=Jt,e.AST_Switch=We,e.AST_SwitchBranch=Ye,e.AST_Symbol=Rt,e.AST_SymbolBlockDeclaration=kt,e.AST_SymbolCatch=Ht,e.AST_SymbolClass=Gt,e.AST_SymbolConst=It,e.AST_SymbolDeclaration=Nt,e.AST_SymbolDefClass=Ut,e.AST_SymbolDefun=Pt,e.AST_SymbolExport=qt,e.AST_SymbolExportForeign=$t,e.AST_SymbolFunarg=Vt,e.AST_SymbolImport=Xt,e.AST_SymbolImportForeign=zt,e.AST_SymbolLambda=Kt,e.AST_SymbolLet=Lt,e.AST_SymbolMethod=Bt,e.AST_SymbolRef=Yt,e.AST_SymbolVar=xt,e.AST_TemplateSegment=Ve,e.AST_TemplateString=Le,e.AST_This=Zt,e.AST_Throw=Ue,e.AST_Token=oe,e.AST_Toplevel=Oe,e.AST_True=_n,e.AST_Try=je,e.AST_Unary=_t,e.AST_UnaryPostfix=mt,e.AST_UnaryPrefix=dt,e.AST_Undefined=un,e.AST_Var=et,e.AST_VarDef=at,e.AST_While=Ae,e.AST_With=ye,e.AST_Yield=mn,e.Compressor=Kn,e.OutputStream=Cn,e.TreeTransformer=hn,e.TreeWalker=En,e._JS_Parse_Error=Y,e._tokenizer=Z,e.base54=Nn,e.default_options=function(){const e={};return Object.keys(Zn({0:0})).forEach(t=>{const n=Zn({[t]:{0:0}});n&&(e[t]=n)}),e},e.defaults=o,e.mangle_properties=Xn,e.minify=jn,e.parse=ie,e.push_uniq=p,e.reserve_quoted_keys=Gn,e.string_template=_,e.to_ascii=zn});
//# sourceMappingURL=bundle.min.js.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
exports.SourceMapGenerator = __webpack_require__(4).SourceMapGenerator;
exports.SourceMapConsumer = __webpack_require__(10).SourceMapConsumer;
exports.SourceNode = __webpack_require__(13).SourceNode;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = __webpack_require__(5);
var util = __webpack_require__(7);
var ArraySet = __webpack_require__(8).ArraySet;
var MappingList = __webpack_require__(9).MappingList;

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
/* 5 */
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

var base64 = __webpack_require__(6);

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
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(7);
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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2014 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(7);

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var util = __webpack_require__(7);
var binarySearch = __webpack_require__(11);
var ArraySet = __webpack_require__(8).ArraySet;
var base64VLQ = __webpack_require__(5);
var quickSort = __webpack_require__(12).quickSort;

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
/* 11 */
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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/* -*- Mode: js; js-indent-level: 2; -*- */
/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var SourceMapGenerator = __webpack_require__(4).SourceMapGenerator;
var util = __webpack_require__(7);

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


/***/ })
/******/ ]);
