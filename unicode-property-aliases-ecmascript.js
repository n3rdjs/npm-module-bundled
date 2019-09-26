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
/***/ (function(module, exports) {

// Generated using `npm run build`. Do not edit!
module.exports = new Map([
	['scx', 'Script_Extensions'],
	['sc', 'Script'],
	['gc', 'General_Category'],
	['AHex', 'ASCII_Hex_Digit'],
	['Alpha', 'Alphabetic'],
	['Bidi_C', 'Bidi_Control'],
	['Bidi_M', 'Bidi_Mirrored'],
	['Cased', 'Cased'],
	['CI', 'Case_Ignorable'],
	['CWCF', 'Changes_When_Casefolded'],
	['CWCM', 'Changes_When_Casemapped'],
	['CWKCF', 'Changes_When_NFKC_Casefolded'],
	['CWL', 'Changes_When_Lowercased'],
	['CWT', 'Changes_When_Titlecased'],
	['CWU', 'Changes_When_Uppercased'],
	['Dash', 'Dash'],
	['Dep', 'Deprecated'],
	['DI', 'Default_Ignorable_Code_Point'],
	['Dia', 'Diacritic'],
	['Ext', 'Extender'],
	['Gr_Base', 'Grapheme_Base'],
	['Gr_Ext', 'Grapheme_Extend'],
	['Hex', 'Hex_Digit'],
	['IDC', 'ID_Continue'],
	['Ideo', 'Ideographic'],
	['IDS', 'ID_Start'],
	['IDSB', 'IDS_Binary_Operator'],
	['IDST', 'IDS_Trinary_Operator'],
	['Join_C', 'Join_Control'],
	['LOE', 'Logical_Order_Exception'],
	['Lower', 'Lowercase'],
	['Math', 'Math'],
	['NChar', 'Noncharacter_Code_Point'],
	['Pat_Syn', 'Pattern_Syntax'],
	['Pat_WS', 'Pattern_White_Space'],
	['QMark', 'Quotation_Mark'],
	['Radical', 'Radical'],
	['RI', 'Regional_Indicator'],
	['SD', 'Soft_Dotted'],
	['STerm', 'Sentence_Terminal'],
	['Term', 'Terminal_Punctuation'],
	['UIdeo', 'Unified_Ideograph'],
	['Upper', 'Uppercase'],
	['VS', 'Variation_Selector'],
	['WSpace', 'White_Space'],
	['space', 'White_Space'],
	['XIDC', 'XID_Continue'],
	['XIDS', 'XID_Start']
]);


/***/ })
/******/ ]);
