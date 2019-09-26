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

module.exports = new Map([
	['General_Category', [
		'Cased_Letter',
		'Close_Punctuation',
		'Connector_Punctuation',
		'Control',
		'Currency_Symbol',
		'Dash_Punctuation',
		'Decimal_Number',
		'Enclosing_Mark',
		'Final_Punctuation',
		'Format',
		'Initial_Punctuation',
		'Letter',
		'Letter_Number',
		'Line_Separator',
		'Lowercase_Letter',
		'Mark',
		'Math_Symbol',
		'Modifier_Letter',
		'Modifier_Symbol',
		'Nonspacing_Mark',
		'Number',
		'Open_Punctuation',
		'Other',
		'Other_Letter',
		'Other_Number',
		'Other_Punctuation',
		'Other_Symbol',
		'Paragraph_Separator',
		'Private_Use',
		'Punctuation',
		'Separator',
		'Space_Separator',
		'Spacing_Mark',
		'Surrogate',
		'Symbol',
		'Titlecase_Letter',
		'Unassigned',
		'Uppercase_Letter'
	]],
	['Script', [
		'Adlam',
		'Ahom',
		'Anatolian_Hieroglyphs',
		'Arabic',
		'Armenian',
		'Avestan',
		'Balinese',
		'Bamum',
		'Bassa_Vah',
		'Batak',
		'Bengali',
		'Bhaiksuki',
		'Bopomofo',
		'Brahmi',
		'Braille',
		'Buginese',
		'Buhid',
		'Canadian_Aboriginal',
		'Carian',
		'Caucasian_Albanian',
		'Chakma',
		'Cham',
		'Cherokee',
		'Common',
		'Coptic',
		'Cuneiform',
		'Cypriot',
		'Cyrillic',
		'Deseret',
		'Devanagari',
		'Dogra',
		'Duployan',
		'Egyptian_Hieroglyphs',
		'Elbasan',
		'Elymaic',
		'Ethiopic',
		'Georgian',
		'Glagolitic',
		'Gothic',
		'Grantha',
		'Greek',
		'Gujarati',
		'Gunjala_Gondi',
		'Gurmukhi',
		'Han',
		'Hangul',
		'Hanifi_Rohingya',
		'Hanunoo',
		'Hatran',
		'Hebrew',
		'Hiragana',
		'Imperial_Aramaic',
		'Inherited',
		'Inscriptional_Pahlavi',
		'Inscriptional_Parthian',
		'Javanese',
		'Kaithi',
		'Kannada',
		'Katakana',
		'Kayah_Li',
		'Kharoshthi',
		'Khmer',
		'Khojki',
		'Khudawadi',
		'Lao',
		'Latin',
		'Lepcha',
		'Limbu',
		'Linear_A',
		'Linear_B',
		'Lisu',
		'Lycian',
		'Lydian',
		'Mahajani',
		'Makasar',
		'Malayalam',
		'Mandaic',
		'Manichaean',
		'Marchen',
		'Masaram_Gondi',
		'Medefaidrin',
		'Meetei_Mayek',
		'Mende_Kikakui',
		'Meroitic_Cursive',
		'Meroitic_Hieroglyphs',
		'Miao',
		'Modi',
		'Mongolian',
		'Mro',
		'Multani',
		'Myanmar',
		'Nabataean',
		'Nandinagari',
		'New_Tai_Lue',
		'Newa',
		'Nko',
		'Nushu',
		'Nyiakeng_Puachue_Hmong',
		'Ogham',
		'Ol_Chiki',
		'Old_Hungarian',
		'Old_Italic',
		'Old_North_Arabian',
		'Old_Permic',
		'Old_Persian',
		'Old_Sogdian',
		'Old_South_Arabian',
		'Old_Turkic',
		'Oriya',
		'Osage',
		'Osmanya',
		'Pahawh_Hmong',
		'Palmyrene',
		'Pau_Cin_Hau',
		'Phags_Pa',
		'Phoenician',
		'Psalter_Pahlavi',
		'Rejang',
		'Runic',
		'Samaritan',
		'Saurashtra',
		'Sharada',
		'Shavian',
		'Siddham',
		'SignWriting',
		'Sinhala',
		'Sogdian',
		'Sora_Sompeng',
		'Soyombo',
		'Sundanese',
		'Syloti_Nagri',
		'Syriac',
		'Tagalog',
		'Tagbanwa',
		'Tai_Le',
		'Tai_Tham',
		'Tai_Viet',
		'Takri',
		'Tamil',
		'Tangut',
		'Telugu',
		'Thaana',
		'Thai',
		'Tibetan',
		'Tifinagh',
		'Tirhuta',
		'Ugaritic',
		'Vai',
		'Wancho',
		'Warang_Citi',
		'Yi',
		'Zanabazar_Square'
	]],
	['Script_Extensions', [
		'Adlam',
		'Ahom',
		'Anatolian_Hieroglyphs',
		'Arabic',
		'Armenian',
		'Avestan',
		'Balinese',
		'Bamum',
		'Bassa_Vah',
		'Batak',
		'Bengali',
		'Bhaiksuki',
		'Bopomofo',
		'Brahmi',
		'Braille',
		'Buginese',
		'Buhid',
		'Canadian_Aboriginal',
		'Carian',
		'Caucasian_Albanian',
		'Chakma',
		'Cham',
		'Cherokee',
		'Common',
		'Coptic',
		'Cuneiform',
		'Cypriot',
		'Cyrillic',
		'Deseret',
		'Devanagari',
		'Dogra',
		'Duployan',
		'Egyptian_Hieroglyphs',
		'Elbasan',
		'Elymaic',
		'Ethiopic',
		'Georgian',
		'Glagolitic',
		'Gothic',
		'Grantha',
		'Greek',
		'Gujarati',
		'Gunjala_Gondi',
		'Gurmukhi',
		'Han',
		'Hangul',
		'Hanifi_Rohingya',
		'Hanunoo',
		'Hatran',
		'Hebrew',
		'Hiragana',
		'Imperial_Aramaic',
		'Inherited',
		'Inscriptional_Pahlavi',
		'Inscriptional_Parthian',
		'Javanese',
		'Kaithi',
		'Kannada',
		'Katakana',
		'Kayah_Li',
		'Kharoshthi',
		'Khmer',
		'Khojki',
		'Khudawadi',
		'Lao',
		'Latin',
		'Lepcha',
		'Limbu',
		'Linear_A',
		'Linear_B',
		'Lisu',
		'Lycian',
		'Lydian',
		'Mahajani',
		'Makasar',
		'Malayalam',
		'Mandaic',
		'Manichaean',
		'Marchen',
		'Masaram_Gondi',
		'Medefaidrin',
		'Meetei_Mayek',
		'Mende_Kikakui',
		'Meroitic_Cursive',
		'Meroitic_Hieroglyphs',
		'Miao',
		'Modi',
		'Mongolian',
		'Mro',
		'Multani',
		'Myanmar',
		'Nabataean',
		'Nandinagari',
		'New_Tai_Lue',
		'Newa',
		'Nko',
		'Nushu',
		'Nyiakeng_Puachue_Hmong',
		'Ogham',
		'Ol_Chiki',
		'Old_Hungarian',
		'Old_Italic',
		'Old_North_Arabian',
		'Old_Permic',
		'Old_Persian',
		'Old_Sogdian',
		'Old_South_Arabian',
		'Old_Turkic',
		'Oriya',
		'Osage',
		'Osmanya',
		'Pahawh_Hmong',
		'Palmyrene',
		'Pau_Cin_Hau',
		'Phags_Pa',
		'Phoenician',
		'Psalter_Pahlavi',
		'Rejang',
		'Runic',
		'Samaritan',
		'Saurashtra',
		'Sharada',
		'Shavian',
		'Siddham',
		'SignWriting',
		'Sinhala',
		'Sogdian',
		'Sora_Sompeng',
		'Soyombo',
		'Sundanese',
		'Syloti_Nagri',
		'Syriac',
		'Tagalog',
		'Tagbanwa',
		'Tai_Le',
		'Tai_Tham',
		'Tai_Viet',
		'Takri',
		'Tamil',
		'Tangut',
		'Telugu',
		'Thaana',
		'Thai',
		'Tibetan',
		'Tifinagh',
		'Tirhuta',
		'Ugaritic',
		'Vai',
		'Wancho',
		'Warang_Citi',
		'Yi',
		'Zanabazar_Square'
	]],
	['Binary_Property', [
		'ASCII',
		'ASCII_Hex_Digit',
		'Alphabetic',
		'Any',
		'Assigned',
		'Bidi_Control',
		'Bidi_Mirrored',
		'Case_Ignorable',
		'Cased',
		'Changes_When_Casefolded',
		'Changes_When_Casemapped',
		'Changes_When_Lowercased',
		'Changes_When_NFKC_Casefolded',
		'Changes_When_Titlecased',
		'Changes_When_Uppercased',
		'Dash',
		'Default_Ignorable_Code_Point',
		'Deprecated',
		'Diacritic',
		'Emoji',
		'Emoji_Component',
		'Emoji_Modifier',
		'Emoji_Modifier_Base',
		'Emoji_Presentation',
		'Extended_Pictographic',
		'Extender',
		'Grapheme_Base',
		'Grapheme_Extend',
		'Hex_Digit',
		'IDS_Binary_Operator',
		'IDS_Trinary_Operator',
		'ID_Continue',
		'ID_Start',
		'Ideographic',
		'Join_Control',
		'Logical_Order_Exception',
		'Lowercase',
		'Math',
		'Noncharacter_Code_Point',
		'Pattern_Syntax',
		'Pattern_White_Space',
		'Quotation_Mark',
		'Radical',
		'Regional_Indicator',
		'Sentence_Terminal',
		'Soft_Dotted',
		'Terminal_Punctuation',
		'Unified_Ideograph',
		'Uppercase',
		'Variation_Selector',
		'White_Space',
		'XID_Continue',
		'XID_Start'
	]]
]);


/***/ })
/******/ ]);
