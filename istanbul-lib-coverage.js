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
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


/**
 * istanbul-lib-coverage exports an API that allows you to create and manipulate
 * file coverage, coverage maps (a set of file coverage objects) and summary
 * coverage objects. File coverage for the same file can be merged as can
 * entire coverage maps.
 *
 * @module Exports
 */
const CoverageSummary = __webpack_require__(3).CoverageSummary;
const FileCoverage = __webpack_require__(3).FileCoverage;
const CoverageMap = __webpack_require__(4).CoverageMap;

module.exports = {
    /**
     * creates a coverage summary object
     * @param {Object} obj an argument with the same semantics
     *  as the one passed to the `CoverageSummary` constructor
     * @returns {CoverageSummary}
     */
    createCoverageSummary(obj) {
        if (obj && obj instanceof CoverageSummary) {
            return obj;
        }
        return new CoverageSummary(obj);
    },
    /**
     * creates a CoverageMap object
     * @param {Object} obj optional - an argument with the same semantics
     *  as the one passed to the CoverageMap constructor.
     * @returns {CoverageMap}
     */
    createCoverageMap(obj) {
        if (obj && obj instanceof CoverageMap) {
            return obj;
        }
        return new CoverageMap(obj);
    },
    /**
     * creates a FileCoverage object
     * @param {Object} obj optional - an argument with the same semantics
     *  as the one passed to the FileCoverage constructor.
     * @returns {FileCoverage}
     */
    createFileCoverage(obj) {
        if (obj && obj instanceof FileCoverage) {
            return obj;
        }
        return new FileCoverage(obj);
    }
};

/** classes exported for reuse */
module.exports.classes = {
    /**
     * the file coverage constructor
     */
    FileCoverage
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


function percent(covered, total) {
    let tmp;
    if (total > 0) {
        tmp = (1000 * 100 * covered) / total + 5;
        return Math.floor(tmp / 10) / 100;
    } else {
        return 100.0;
    }
}

function blankSummary() {
    const empty = function() {
        return {
            total: 0,
            covered: 0,
            skipped: 0,
            pct: 'Unknown'
        };
    };
    return {
        lines: empty(),
        statements: empty(),
        functions: empty(),
        branches: empty()
    };
}

// asserts that a data object "looks like" a summary coverage object
function assertValidSummary(obj) {
    const valid =
        obj && obj.lines && obj.statements && obj.functions && obj.branches;
    if (!valid) {
        throw new Error(
            'Invalid summary coverage object, missing keys, found:' +
                Object.keys(obj).join(',')
        );
    }
}
/**
 * CoverageSummary provides a summary of code coverage . It exposes 4 properties,
 * `lines`, `statements`, `branches`, and `functions`. Each of these properties
 * is an object that has 4 keys `total`, `covered`, `skipped` and `pct`.
 * `pct` is a percentage number (0-100).
 * @param {Object|CoverageSummary} [obj=undefined] an optional data object or
 * another coverage summary to initialize this object with.
 * @constructor
 */
function CoverageSummary(obj) {
    if (!obj) {
        this.data = blankSummary();
    } else if (obj instanceof CoverageSummary) {
        this.data = obj.data;
    } else {
        this.data = obj;
    }
    assertValidSummary(this.data);
}

['lines', 'statements', 'functions', 'branches'].forEach(p => {
    Object.defineProperty(CoverageSummary.prototype, p, {
        enumerable: true,
        get() {
            return this.data[p];
        }
    });
});

/**
 * merges a second summary coverage object into this one
 * @param {CoverageSummary} obj - another coverage summary object
 */
CoverageSummary.prototype.merge = function(obj) {
    const keys = ['lines', 'statements', 'branches', 'functions'];
    keys.forEach(key => {
        this[key].total += obj[key].total;
        this[key].covered += obj[key].covered;
        this[key].skipped += obj[key].skipped;
        this[key].pct = percent(this[key].covered, this[key].total);
    });
    return this;
};

/**
 * returns a POJO that is JSON serializable. May be used to get the raw
 * summary object.
 */
CoverageSummary.prototype.toJSON = function() {
    return this.data;
};

/**
 * return true if summary has no lines of code
 */
CoverageSummary.prototype.isEmpty = function() {
    return this.lines.total === 0;
};

// returns a data object that represents empty coverage
function emptyCoverage(filePath) {
    return {
        path: filePath,
        statementMap: {},
        fnMap: {},
        branchMap: {},
        s: {},
        f: {},
        b: {}
    };
}
// asserts that a data object "looks like" a coverage object
function assertValidObject(obj) {
    const valid =
        obj &&
        obj.path &&
        obj.statementMap &&
        obj.fnMap &&
        obj.branchMap &&
        obj.s &&
        obj.f &&
        obj.b;
    if (!valid) {
        throw new Error(
            'Invalid file coverage object, missing keys, found:' +
                Object.keys(obj).join(',')
        );
    }
}
/**
 * provides a read-only view of coverage for a single file.
 * The deep structure of this object is documented elsewhere. It has the following
 * properties:
 *
 * * `path` - the file path for which coverage is being tracked
 * * `statementMap` - map of statement locations keyed by statement index
 * * `fnMap` - map of function metadata keyed by function index
 * * `branchMap` - map of branch metadata keyed by branch index
 * * `s` - hit counts for statements
 * * `f` - hit count for functions
 * * `b` - hit count for branches
 *
 * @param {Object|FileCoverage|String} pathOrObj is a string that initializes
 * and empty coverage object with the specified file path or a data object that
 * has all the required properties for a file coverage object.
 * @constructor
 */
function FileCoverage(pathOrObj) {
    if (!pathOrObj) {
        throw new Error(
            'Coverage must be initialized with a path or an object'
        );
    }
    if (typeof pathOrObj === 'string') {
        this.data = emptyCoverage(pathOrObj);
    } else if (pathOrObj instanceof FileCoverage) {
        this.data = pathOrObj.data;
    } else if (typeof pathOrObj === 'object') {
        this.data = pathOrObj;
    } else {
        throw new Error('Invalid argument to coverage constructor');
    }
    assertValidObject(this.data);
}
/**
 * returns computed line coverage from statement coverage.
 * This is a map of hits keyed by line number in the source.
 */
FileCoverage.prototype.getLineCoverage = function() {
    const statementMap = this.data.statementMap;
    const statements = this.data.s;
    const lineMap = Object.create(null);

    Object.keys(statements).forEach(st => {
        if (!statementMap[st]) {
            return;
        }
        const line = statementMap[st].start.line;
        const count = statements[st];
        const prevVal = lineMap[line];
        if (prevVal === undefined || prevVal < count) {
            lineMap[line] = count;
        }
    });
    return lineMap;
};
/**
 * returns an array of uncovered line numbers.
 * @returns {Array} an array of line numbers for which no hits have been
 *  collected.
 */
FileCoverage.prototype.getUncoveredLines = function() {
    const lc = this.getLineCoverage();
    const ret = [];
    Object.keys(lc).forEach(l => {
        const hits = lc[l];
        if (hits === 0) {
            ret.push(l);
        }
    });
    return ret;
};
/**
 * returns a map of branch coverage by source line number.
 * @returns {Object} an object keyed by line number. Each object
 * has a `covered`, `total` and `coverage` (percentage) property.
 */
FileCoverage.prototype.getBranchCoverageByLine = function() {
    const branchMap = this.branchMap;
    const branches = this.b;
    const ret = {};
    Object.keys(branchMap).forEach(k => {
        const line = branchMap[k].line || branchMap[k].loc.start.line;
        const branchData = branches[k];
        ret[line] = ret[line] || [];
        ret[line].push(...branchData);
    });
    Object.keys(ret).forEach(k => {
        const dataArray = ret[k];
        const covered = dataArray.filter(item => item > 0);
        const coverage = (covered.length / dataArray.length) * 100;
        ret[k] = {
            covered: covered.length,
            total: dataArray.length,
            coverage
        };
    });
    return ret;
};

// expose coverage data attributes
['path', 'statementMap', 'fnMap', 'branchMap', 's', 'f', 'b'].forEach(p => {
    Object.defineProperty(FileCoverage.prototype, p, {
        enumerable: true,
        get() {
            return this.data[p];
        }
    });
});
/**
 * return a JSON-serializable POJO for this file coverage object
 */
FileCoverage.prototype.toJSON = function() {
    return this.data;
};
/**
 * merges a second coverage object into this one, updating hit counts
 * @param {FileCoverage} other - the coverage object to be merged into this one.
 *  Note that the other object should have the same structure as this one (same file).
 */
FileCoverage.prototype.merge = function(other) {
    Object.keys(other.s).forEach(k => {
        this.data.s[k] += other.s[k];
    });
    Object.keys(other.f).forEach(k => {
        this.data.f[k] += other.f[k];
    });
    Object.keys(other.b).forEach(k => {
        let i;
        const retArray = this.data.b[k];
        const secondArray = other.b[k];
        if (!retArray) {
            this.data.b[k] = secondArray;
            return;
        }
        for (i = 0; i < retArray.length; i += 1) {
            retArray[i] += secondArray[i];
        }
    });
};

FileCoverage.prototype.computeSimpleTotals = function(property) {
    let stats = this[property];
    const ret = { total: 0, covered: 0, skipped: 0 };

    if (typeof stats === 'function') {
        stats = stats.call(this);
    }
    Object.keys(stats).forEach(key => {
        const covered = !!stats[key];
        ret.total += 1;
        if (covered) {
            ret.covered += 1;
        }
    });
    ret.pct = percent(ret.covered, ret.total);
    return ret;
};

FileCoverage.prototype.computeBranchTotals = function() {
    const stats = this.b;
    const ret = { total: 0, covered: 0, skipped: 0 };

    Object.keys(stats).forEach(key => {
        const branches = stats[key];
        let covered;
        branches.forEach(branchHits => {
            covered = branchHits > 0;
            if (covered) {
                ret.covered += 1;
            }
        });
        ret.total += branches.length;
    });
    ret.pct = percent(ret.covered, ret.total);
    return ret;
};
/**
 * resets hit counts for all statements, functions and branches
 * in this coverage object resulting in zero coverage.
 */
FileCoverage.prototype.resetHits = function() {
    const statements = this.s;
    const functions = this.f;
    const branches = this.b;
    Object.keys(statements).forEach(s => {
        statements[s] = 0;
    });
    Object.keys(functions).forEach(f => {
        functions[f] = 0;
    });
    Object.keys(branches).forEach(b => {
        const hits = branches[b];
        branches[b] = hits.map(() => 0);
    });
};

/**
 * returns a CoverageSummary for this file coverage object
 * @returns {CoverageSummary}
 */
FileCoverage.prototype.toSummary = function() {
    const ret = {};
    ret.lines = this.computeSimpleTotals('getLineCoverage');
    ret.functions = this.computeSimpleTotals('f', 'fnMap');
    ret.statements = this.computeSimpleTotals('s', 'statementMap');
    ret.branches = this.computeBranchTotals();
    return new CoverageSummary(ret);
};

module.exports = {
    CoverageSummary,
    FileCoverage
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


const FileCoverage = __webpack_require__(3).FileCoverage;
const CoverageSummary = __webpack_require__(3).CoverageSummary;

function loadMap(source) {
    const data = Object.create(null);
    Object.keys(source).forEach(k => {
        const cov = source[k];
        if (cov instanceof FileCoverage) {
            data[k] = cov;
        } else {
            data[k] = new FileCoverage(cov);
        }
    });
    return data;
}
/**
 * CoverageMap is a map of `FileCoverage` objects keyed by file paths.
 * @param {Object} [obj=undefined] obj A coverage map from which to initialize this
 * map's contents. This can be the raw global coverage object.
 * @constructor
 */
function CoverageMap(obj) {
    if (!obj) {
        this.data = Object.create(null);
    } else if (obj instanceof CoverageMap) {
        this.data = obj.data;
    } else {
        this.data = loadMap(obj);
    }
}
/**
 * merges a second coverage map into this one
 * @param {CoverageMap} obj - a CoverageMap or its raw data. Coverage is merged
 *  correctly for the same files and additional file coverage keys are created
 *  as needed.
 */
CoverageMap.prototype.merge = function(obj) {
    let other;
    if (obj instanceof CoverageMap) {
        other = obj;
    } else {
        other = new CoverageMap(obj);
    }
    Object.keys(other.data).forEach(k => {
        const fc = other.data[k];
        if (this.data[k]) {
            this.data[k].merge(fc);
        } else {
            this.data[k] = fc;
        }
    });
};
/**
 * filter the coveragemap based on the callback provided
 * @param {Function (filename)} callback - Returns true if the path
 *  should be included in the coveragemap. False if it should be
 *  removed.
 */
CoverageMap.prototype.filter = function(callback) {
    Object.keys(this.data).forEach(k => {
        if (!callback(k)) {
            delete this.data[k];
        }
    });
};
/**
 * returns a JSON-serializable POJO for this coverage map
 * @returns {Object}
 */
CoverageMap.prototype.toJSON = function() {
    return this.data;
};
/**
 * returns an array for file paths for which this map has coverage
 * @returns {Array{string}} - array of files
 */
CoverageMap.prototype.files = function() {
    return Object.keys(this.data);
};
/**
 * returns the file coverage for the specified file.
 * @param {String} file
 * @returns {FileCoverage}
 */
CoverageMap.prototype.fileCoverageFor = function(file) {
    const fc = this.data[file];
    if (!fc) {
        throw new Error('No file coverage available for: ' + file);
    }
    return fc;
};
/**
 * adds a file coverage object to this map. If the path for the object,
 * already exists in the map, it is merged with the existing coverage
 * otherwise a new key is added to the map.
 * @param {FileCoverage} fc the file coverage to add
 */
CoverageMap.prototype.addFileCoverage = function(fc) {
    const cov = new FileCoverage(fc);
    const path = cov.path;
    if (this.data[path]) {
        this.data[path].merge(cov);
    } else {
        this.data[path] = cov;
    }
};
/**
 * returns the coverage summary for all the file coverage objects in this map.
 * @returns {CoverageSummary}
 */
CoverageMap.prototype.getCoverageSummary = function() {
    const ret = new CoverageSummary();
    this.files().forEach(key => {
        ret.merge(this.fileCoverageFor(key).toSummary());
    });
    return ret;
};

module.exports = {
    CoverageMap
};


/***/ })
/******/ ]);
