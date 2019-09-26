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


const { getGlobalMonotonicClockMS } = __webpack_require__(3);
const { Performance } = __webpack_require__(6);
const clockIsAccurate = __webpack_require__(7);

module.exports = {
  Performance,
  getGlobalMonotonicClockMS,
  clockIsAccurate
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { hrtime, toMS } = __webpack_require__(4);

// Returns the DOMHighResTimeStamp representing the high resolution time value of the global monotonic clock.
function getGlobalMonotonicClockMS() {
  return toMS(hrtime());
}

module.exports = { getGlobalMonotonicClockMS };


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Browserify's process implementation doesn't have hrtime, and this package is small so not much of a burden for
// Node.js users.
const hrtime = __webpack_require__(5);

function toMS([sec, nanosec]) {
  return sec * 1e3 + nanosec / 1e6;
}

module.exports = { hrtime, toMS };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = process.hrtime || hrtime

// polyfil for window.performance.now
var performance = global.performance || {}
var performanceNow =
  performance.now        ||
  performance.mozNow     ||
  performance.msNow      ||
  performance.oNow       ||
  performance.webkitNow  ||
  function(){ return (new Date()).getTime() }

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance)*1e-3
  var seconds = Math.floor(clocktime)
  var nanoseconds = Math.floor((clocktime%1)*1e9)
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0]
    nanoseconds = nanoseconds - previousTimestamp[1]
    if (nanoseconds<0) {
      seconds--
      nanoseconds += 1e9
    }
  }
  return [seconds,nanoseconds]
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Actual implementation of the Performance class.

const clockIsAccurate = __webpack_require__(7);
const calculateClockOffset = __webpack_require__(8);
const { hrtime, toMS } = __webpack_require__(4);

const kTimeOrigin = Symbol("time origin");
const kTimeOriginTimestamp = Symbol("time origin timestamp");

class Performance {
  constructor() {
    // Time origin.
    const timeOrigin = hrtime();
    this[kTimeOrigin] = timeOrigin;

    if (clockIsAccurate) {
      // Let |t1| be the DOMHighResTimeStamp representing the high resolution Unix time at which the global monotonic
      // clock is zero. This has to be calculated for every Performance object to account for clock drifts.
      const t1 = calculateClockOffset();

      // Let |t2| be the DOMHighResTimeStamp representing the high resolution time value of the global monotonic clock
      // at global's time origin.
      const t2 = toMS(timeOrigin);

      // Return the sum of |t1| and |t2|.
      this[kTimeOriginTimestamp] = t1 + t2;
    } else {
      // Clock isn't accurate enough. Use millisecond accuracy per spec.
      const cur = Date.now();
      this[kTimeOriginTimestamp] = cur;
    }
  }

  // The timeOrigin getter actually returns the time origin timestamp, not the raw time origin.
  get timeOrigin() {
    return this[kTimeOriginTimestamp];
  }

  now() {
    const diff = toMS(hrtime(this[kTimeOrigin]));
    return clockIsAccurate ? diff : Math.round(diff);
  }

  toJSON() {
    return {
      timeOrigin: this.timeOrigin
    };
  }
}

module.exports = { Performance };


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const { hrtime } = __webpack_require__(4);

// The HR-TIME spec calls for 5-μs accuracy. Check that we have that in both hrtime() and Date.now().

function testClockAccuracy() {
  // Test hrtime() first. The check is simpler and more stable, and we use hrtime() to measure Date.now()'s performance.
  const roundTrip = hrtime(hrtime());
  if (roundTrip[0] > 1 || roundTrip[1] > 5e3 * 2) {
    return false;
  }

  // Test Date.now() twice: first with a looser bound (10 μs) but with a smaller run time to filter out very bad
  // Date.now() performance, and then with a tighter bound (5 μs) to check we have the accuracy we need.
  let times;
  // eslint-disable-next-line no-unused-vars
  let cur;
  let start;
  let end;

  times = 100;
  start = hrtime();
  while (times-- > 0) {
    cur = Date.now();
  }
  end = hrtime(start);
  if ((end[0] * 1e9 + end[1]) > 1000000) {
    return false;
  }

  times = 10000;
  start = hrtime();
  while (times-- > 0) {
    cur = Date.now();
  }
  end = hrtime(start);
  if ((end[0] * 1e9 + end[1]) > 50000000) {
    return false;
  }

  return true;
}

// Warm up the function.
testClockAccuracy();
testClockAccuracy();
testClockAccuracy();

const TIMES = 5;
const THRESHOLD = 0.6 * TIMES;
let accurates = 0;
for (let i = 0; i < TIMES; i++) {
  if (testClockAccuracy()) {
    accurates++;
  }
}

const isAccurate = accurates >= THRESHOLD;

module.exports = isAccurate;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// This files implements the calculation of the offset between the global monotonic clock and UNIX time. This value is
// known as |t1| in the calculation of "time origin timestamp" in the spec. This value needs to be calculated once and
// can be used in all subsequent Performance instances.
//
// However, if the clock is not fast enough, the export is undefined to signify that we should use Date.now() to get the
// time origin timestamp with millisecond accuracy, per spec.

const { getGlobalMonotonicClockMS } = __webpack_require__(3);
const clockIsAccurate = __webpack_require__(7);

// This function assumes the clock is accurate.
function calculateClockOffset() {
  const start = Date.now();
  let cur = start;
  while (cur === start) {
    cur = Date.now();
  }

  // At this point |cur| "just" became equal to the next millisecond -- the unseen digits after |cur| are approximately
  // all 0, and |cur| is the closest to the actual value of the UNIX time. Now, get the current global monotonic clock
  // value and do the remaining calculations.

  return cur - getGlobalMonotonicClockMS();
}

if (clockIsAccurate) {
  // Warm up the function.
  calculateClockOffset();
  calculateClockOffset();
  calculateClockOffset();

  module.exports = calculateClockOffset;
} else {
  module.exports = undefined;
}


/***/ })
/******/ ]);
