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
 * @module Exports
 */

const summarizer = __webpack_require__(3);
const context = __webpack_require__(11);
const watermarks = __webpack_require__(21);

module.exports = {
    /**
     * returns a reporting context for the supplied options
     * @param {Object} [opts=null] opts
     * @returns {Context}
     */
    createContext(opts) {
        return context.create(opts);
    },
    /**
     * returns the default watermarks that would be used when not
     * overridden
     * @returns {Object} an object with `statements`, `functions`, `branches`,
     *  and `line` keys. Each value is a 2 element array that has the low and
     *  high watermark as percentages.
     */
    getDefaultWatermarks() {
        return watermarks.getDefault();
    }
};
/**
 * standard summary functions
 */
module.exports.summarizers = {
    /**
     * a summarizer that creates a flat tree with one root node and bunch of
     * files directly under it
     */
    flat: summarizer.createFlatSummary,
    /**
     * a summarizer that creates a hierarchical tree where the coverage summaries
     * of each directly reflect the summaries of all subdirectories and files in it
     */
    nested: summarizer.createNestedSummary,
    /**
     * a summarizer that creates a tree in which directories are not nested.
     * Every subdirectory is a child of the root node and only reflects the
     * coverage numbers for the files in it (i.e. excludes subdirectories).
     * This is the default summarizer.
     */
    pkg: summarizer.createPackageSummary
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


const util = __webpack_require__(4);
const coverage = __webpack_require__(5);
const Path = __webpack_require__(8);
const tree = __webpack_require__(10);
const BaseNode = tree.Node;
const BaseTree = tree.Tree;

function ReportNode(path, fileCoverage) {
    this.path = path;
    this.parent = null;
    this.fileCoverage = fileCoverage;
    this.children = [];
}

util.inherits(ReportNode, BaseNode);

ReportNode.prototype.addChild = function(child) {
    child.parent = this;
    this.children.push(child);
};

ReportNode.prototype.asRelative = function(p) {
    /* istanbul ignore if */
    if (p.substring(0, 1) === '/') {
        return p.substring(1);
    }
    return p;
};

ReportNode.prototype.getQualifiedName = function() {
    return this.asRelative(this.path.toString());
};

ReportNode.prototype.getRelativeName = function() {
    const parent = this.getParent();
    const myPath = this.path;
    let relPath;
    let i;
    const parentPath = parent ? parent.path : new Path([]);
    if (parentPath.ancestorOf(myPath)) {
        relPath = new Path(myPath.elements());
        for (i = 0; i < parentPath.length; i += 1) {
            relPath.shift();
        }
        return this.asRelative(relPath.toString());
    }
    return this.asRelative(this.path.toString());
};

ReportNode.prototype.getParent = function() {
    return this.parent;
};

ReportNode.prototype.getChildren = function() {
    return this.children;
};

ReportNode.prototype.isSummary = function() {
    return !this.fileCoverage;
};

ReportNode.prototype.getFileCoverage = function() {
    return this.fileCoverage;
};

ReportNode.prototype.getCoverageSummary = function(filesOnly) {
    const cacheProp = 'c_' + (filesOnly ? 'files' : 'full');
    let summary;

    if (this.hasOwnProperty(cacheProp)) {
        return this[cacheProp];
    }

    if (!this.isSummary()) {
        summary = this.getFileCoverage().toSummary();
    } else {
        let count = 0;
        summary = coverage.createCoverageSummary();
        this.getChildren().forEach(child => {
            if (filesOnly && child.isSummary()) {
                return;
            }
            count += 1;
            summary.merge(child.getCoverageSummary(filesOnly));
        });
        if (count === 0 && filesOnly) {
            summary = null;
        }
    }
    this[cacheProp] = summary;
    return summary;
};

function treeFor(root, childPrefix) {
    const tree = new BaseTree();
    const maybePrefix = function(node) {
        if (childPrefix && !node.isRoot()) {
            node.path.unshift(childPrefix);
        }
    };
    tree.getRoot = function() {
        return root;
    };
    const visitor = {
        onDetail(node) {
            maybePrefix(node);
        },
        onSummary(node) {
            maybePrefix(node);
            node.children.sort((a, b) => {
                const astr = a.path.toString();
                const bstr = b.path.toString();
                return astr < bstr
                    ? -1
                    : astr > bstr
                    ? 1
                    : /* istanbul ignore next */ 0;
            });
        }
    };
    tree.visit(visitor);
    return tree;
}

function findCommonParent(paths) {
    if (paths.length === 0) {
        return new Path([]);
    }
    let common = paths[0];
    let i;

    for (i = 1; i < paths.length; i += 1) {
        common = common.commonPrefixPath(paths[i]);
        if (common.length === 0) {
            break;
        }
    }
    return common;
}

function toInitialList(coverageMap) {
    const ret = [];
    coverageMap.files().forEach(filePath => {
        const p = new Path(filePath);
        const coverage = coverageMap.fileCoverageFor(filePath);
        ret.push({
            filePath,
            path: p,
            fileCoverage: coverage
        });
    });

    const commonParent = findCommonParent(ret.map(o => o.path.parent()));
    if (commonParent.length > 0) {
        ret.forEach(o => {
            o.path.splice(0, commonParent.length);
        });
    }
    return {
        list: ret,
        commonParent
    };
}

function toDirParents(list) {
    const nodeMap = Object.create(null);
    const parentNodeList = [];
    list.forEach(o => {
        const node = new ReportNode(o.path, o.fileCoverage);
        const parentPath = o.path.parent();
        let parent = nodeMap[parentPath.toString()];

        if (!parent) {
            parent = new ReportNode(parentPath);
            nodeMap[parentPath.toString()] = parent;
            parentNodeList.push(parent);
        }
        parent.addChild(node);
    });
    return parentNodeList;
}

function foldIntoParents(nodeList) {
    const ret = [];
    let i;
    let j;

    // sort by longest length first
    nodeList.sort((a, b) => -1 * Path.compare(a.path, b.path));

    for (i = 0; i < nodeList.length; i += 1) {
        const first = nodeList[i];
        let inserted = false;

        for (j = i + 1; j < nodeList.length; j += 1) {
            const second = nodeList[j];
            if (second.path.ancestorOf(first.path)) {
                second.addChild(first);
                inserted = true;
                break;
            }
        }

        if (!inserted) {
            ret.push(first);
        }
    }
    return ret;
}

function createRoot() {
    return new ReportNode(new Path([]));
}

function createNestedSummary(coverageMap) {
    const flattened = toInitialList(coverageMap);
    const dirParents = toDirParents(flattened.list);
    const topNodes = foldIntoParents(dirParents);

    if (topNodes.length === 0) {
        return treeFor(new ReportNode(new Path([])));
    }

    if (topNodes.length === 1) {
        return treeFor(topNodes[0]);
    }

    const root = createRoot();
    topNodes.forEach(node => {
        root.addChild(node);
    });
    return treeFor(root);
}

function createPackageSummary(coverageMap) {
    const flattened = toInitialList(coverageMap);
    const dirParents = toDirParents(flattened.list);
    const common = flattened.commonParent;
    let prefix;
    let root;

    if (dirParents.length === 1) {
        root = dirParents[0];
    } else {
        root = createRoot();
        // if one of the dirs is itself the root,
        // then we need to create a top-level dir
        dirParents.forEach(dp => {
            if (dp.path.length === 0) {
                prefix = 'root';
            }
        });
        if (prefix && common.length > 0) {
            prefix = common.elements()[common.elements().length - 1];
        }
        dirParents.forEach(node => {
            root.addChild(node);
        });
    }
    return treeFor(root, prefix);
}

function createFlatSummary(coverageMap) {
    const flattened = toInitialList(coverageMap);
    const list = flattened.list;
    const root = createRoot();

    list.forEach(o => {
        const node = new ReportNode(o.path, o.fileCoverage);
        root.addChild(node);
    });
    return treeFor(root);
}

module.exports = {
    createNestedSummary,
    createPackageSummary,
    createFlatSummary
};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 5 */
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
const CoverageSummary = __webpack_require__(6).CoverageSummary;
const FileCoverage = __webpack_require__(6).FileCoverage;
const CoverageMap = __webpack_require__(7).CoverageMap;

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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


const FileCoverage = __webpack_require__(6).FileCoverage;
const CoverageSummary = __webpack_require__(6).CoverageSummary;

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


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


const path = __webpack_require__(9);
let parsePath = path.parse;
let SEP = path.sep || /* istanbul ignore next */ '/';
const origParser = parsePath;
const origSep = SEP;

function makeRelativeNormalizedPath(str, sep) {
    const parsed = parsePath(str);
    let root = parsed.root;
    let dir;
    let file = parsed.base;
    let quoted;
    let pos;

    // handle a weird windows case separately
    if (sep === '\\') {
        pos = root.indexOf(':\\');
        if (pos >= 0) {
            root = root.substring(0, pos + 2);
        }
    }
    dir = parsed.dir.substring(root.length);

    if (str === '') {
        return [];
    }

    if (sep !== '/') {
        quoted = new RegExp(sep.replace(/\W/g, '\\$&'), 'g');
        dir = dir.replace(quoted, '/');
        file = file.replace(quoted, '/'); // excessively paranoid?
    }

    if (dir !== '') {
        dir = dir + '/' + file;
    } else {
        dir = file;
    }
    if (dir.substring(0, 1) === '/') {
        dir = dir.substring(1);
    }
    dir = dir.split(/\/+/);
    return dir;
}

function Path(strOrArray) {
    if (Array.isArray(strOrArray)) {
        this.v = strOrArray;
    } else if (typeof strOrArray === 'string') {
        this.v = makeRelativeNormalizedPath(strOrArray, SEP);
    } else {
        throw new Error(
            'Invalid Path argument must be string or array:' + strOrArray
        );
    }
}

Path.prototype.toString = function() {
    return this.v.join('/');
};

Path.prototype.hasParent = function() {
    return this.v.length > 0;
};

Path.prototype.parent = function() {
    if (!this.hasParent()) {
        throw new Error('Unable to get parent for 0 elem path');
    }
    const p = this.v.slice();
    p.pop();
    return new Path(p);
};

Path.prototype.elements = function() {
    return this.v.slice();
};

Path.prototype.contains = function(other) {
    let i;
    if (other.length > this.length) {
        return false;
    }
    for (i = 0; i < other.length; i += 1) {
        if (this.v[i] !== other.v[i]) {
            return false;
        }
    }
    return true;
};

Path.prototype.ancestorOf = function(other) {
    return other.contains(this) && other.length !== this.length;
};

Path.prototype.descendantOf = function(other) {
    return this.contains(other) && other.length !== this.length;
};

Path.prototype.commonPrefixPath = function(other) {
    const len = this.length > other.length ? other.length : this.length;
    let i;
    const ret = [];

    for (i = 0; i < len; i += 1) {
        if (this.v[i] === other.v[i]) {
            ret.push(this.v[i]);
        } else {
            break;
        }
    }
    return new Path(ret);
};

['push', 'pop', 'shift', 'unshift', 'splice'].forEach(f => {
    Path.prototype[f] = function(...args) {
        const v = this.v;
        return v[f](...args);
    };
});

Path.compare = function(a, b) {
    const al = a.length;
    const bl = b.length;
    if (al < bl) {
        return -1;
    }
    if (al > bl) {
        return 1;
    }
    const astr = a.toString();
    const bstr = b.toString();
    return astr < bstr ? -1 : astr > bstr ? 1 : 0;
};

Object.defineProperty(Path.prototype, 'length', {
    enumerable: true,
    get() {
        return this.v.length;
    }
});

module.exports = Path;
Path.tester = {
    setParserAndSep(p, sep) {
        parsePath = p;
        SEP = sep;
    },
    reset() {
        parsePath = origParser;
        SEP = origSep;
    }
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


const util = __webpack_require__(4);
/**
 * An object with methods that are called during the traversal of the coverage tree.
 * A visitor has the following methods that are called during tree traversal.
 *
 *   * `onStart(root, state)` - called before traversal begins
 *   * `onSummary(node, state)` - called for every summary node
 *   * `onDetail(node, state)` - called for every detail node
 *   * `onSummaryEnd(node, state)` - called after all children have been visited for
 *      a summary node.
 *   * `onEnd(root, state)` - called after traversal ends
 *
 * @param delegate - a partial visitor that only implements the methods of interest
 *  The visitor object supplies the missing methods as noops. For example, reports
 *  that only need the final coverage summary need implement `onStart` and nothing
 *  else. Reports that use only detailed coverage information need implement `onDetail`
 *  and nothing else.
 * @constructor
 */
function Visitor(delegate) {
    this.delegate = delegate;
}

['Start', 'End', 'Summary', 'SummaryEnd', 'Detail'].forEach(k => {
    const f = 'on' + k;
    Visitor.prototype[f] = function(node, state) {
        if (this.delegate[f] && typeof this.delegate[f] === 'function') {
            this.delegate[f].call(this.delegate, node, state);
        }
    };
});

function CompositeVisitor(visitors) {
    if (!Array.isArray(visitors)) {
        visitors = [visitors];
    }
    this.visitors = visitors.map(v => {
        if (v instanceof Visitor) {
            return v;
        }
        return new Visitor(v);
    });
}

util.inherits(CompositeVisitor, Visitor);

['Start', 'Summary', 'SummaryEnd', 'Detail', 'End'].forEach(k => {
    const f = 'on' + k;
    CompositeVisitor.prototype[f] = function(node, state) {
        this.visitors.forEach(v => {
            v[f](node, state);
        });
    };
});

function Node() {}

/* istanbul ignore next: abstract method */
Node.prototype.getQualifiedName = function() {
    throw new Error('getQualifiedName must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getRelativeName = function() {
    throw new Error('getRelativeName must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.isRoot = function() {
    return !this.getParent();
};

/* istanbul ignore next: abstract method */
Node.prototype.getParent = function() {
    throw new Error('getParent must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getChildren = function() {
    throw new Error('getChildren must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.isSummary = function() {
    throw new Error('isSummary must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getCoverageSummary = function(/* filesOnly */) {
    throw new Error('getCoverageSummary must be overridden');
};

/* istanbul ignore next: abstract method */
Node.prototype.getFileCoverage = function() {
    throw new Error('getFileCoverage must be overridden');
};
/**
 * visit all nodes depth-first from this node down. Note that `onStart`
 * and `onEnd` are never called on the visitor even if the current
 * node is the root of the tree.
 * @param visitor a full visitor that is called during tree traversal
 * @param state optional state that is passed around
 */
Node.prototype.visit = function(visitor, state) {
    if (this.isSummary()) {
        visitor.onSummary(this, state);
    } else {
        visitor.onDetail(this, state);
    }

    this.getChildren().forEach(child => {
        child.visit(visitor, state);
    });

    if (this.isSummary()) {
        visitor.onSummaryEnd(this, state);
    }
};

/**
 * abstract base class for a coverage tree.
 * @constructor
 */
function Tree() {}

/**
 * returns the root node of the tree
 */
/* istanbul ignore next: abstract method */
Tree.prototype.getRoot = function() {
    throw new Error('getRoot must be overridden');
};

/**
 * visits the tree depth-first with the supplied partial visitor
 * @param visitor - a potentially partial visitor
 * @param state - the state to be passed around during tree traversal
 */
Tree.prototype.visit = function(visitor, state) {
    if (!(visitor instanceof Visitor)) {
        visitor = new Visitor(visitor);
    }
    visitor.onStart(this.getRoot(), state);
    this.getRoot().visit(visitor, state);
    visitor.onEnd(this.getRoot(), state);
};

module.exports = {
    Tree,
    Node,
    Visitor,
    CompositeVisitor
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const fs = __webpack_require__(12);
const FileWriter = __webpack_require__(13);
const XMLWriter = __webpack_require__(20);
const tree = __webpack_require__(10);
const watermarks = __webpack_require__(21);

function defaultSourceLookup(path) {
    try {
        return fs.readFileSync(path, 'utf8');
    } catch (ex) {
        throw new Error(
            'Unable to lookup source: ' + path + '(' + ex.message + ')'
        );
    }
}

function mergeWatermarks(specified, defaults) {
    specified = specified || {};
    Object.keys(defaults).forEach(k => {
        const specValue = specified[k];
        if (
            !(specValue && Array.isArray(specValue) && specValue.length === 2)
        ) {
            specified[k] = defaults[k];
        }
    });
    return specified;
}
/**
 * A reporting context that is passed to report implementations
 * @param {Object} [opts=null] opts options
 * @param {String} [opts.dir='coverage'] opts.dir the reporting directory
 * @param {Object} [opts.watermarks=null] opts.watermarks watermarks for
 *  statements, lines, branches and functions
 * @param {Function} [opts.sourceFinder=fsLookup] opts.sourceFinder a
 *  function that returns source code given a file path. Defaults to
 *  filesystem lookups based on path.
 * @constructor
 */
function Context(opts) {
    opts = opts || {};
    this.dir = opts.dir || 'coverage';
    this.watermarks = mergeWatermarks(opts.watermarks, watermarks.getDefault());
    this.sourceFinder = opts.sourceFinder || defaultSourceLookup;
    this.data = {};
}

Object.defineProperty(Context.prototype, 'writer', {
    enumerable: true,
    get() {
        if (!this.data.writer) {
            this.data.writer = new FileWriter(this.dir);
        }
        return this.data.writer;
    }
});

/**
 * returns a FileWriter implementation for reporting use. Also available
 * as the `writer` property on the context.
 * @returns {Writer}
 */
Context.prototype.getWriter = function() {
    return this.writer;
};

/**
 * returns the source code for the specified file path or throws if
 * the source could not be found.
 * @param {String} filePath the file path as found in a file coverage object
 * @returns {String} the source code
 */
Context.prototype.getSource = function(filePath) {
    return this.sourceFinder(filePath);
};

/**
 * returns the coverage class given a coverage
 * types and a percentage value.
 * @param {String} type - the coverage type, one of `statements`, `functions`,
 *  `branches`, or `lines`
 * @param {Number} value - the percentage value
 * @returns {String} one of `high`, `medium` or `low`
 */
Context.prototype.classForPercent = function(type, value) {
    const watermarks = this.watermarks[type];
    if (!watermarks) {
        return 'unknown';
    }
    if (value < watermarks[0]) {
        return 'low';
    }
    if (value >= watermarks[1]) {
        return 'high';
    }
    return 'medium';
};
/**
 * returns an XML writer for the supplied content writer
 * @param {ContentWriter} contentWriter the content writer to which the returned XML writer
 *  writes data
 * @returns {XMLWriter}
 */
Context.prototype.getXMLWriter = function(contentWriter) {
    return new XMLWriter(contentWriter);
};
/**
 * returns a full visitor given a partial one.
 * @param {Object} partialVisitor a partial visitor only having the functions of
 *  interest to the caller. These functions are called with a scope that is the
 *  supplied object.
 * @returns {Visitor}
 */
Context.prototype.getVisitor = function(partialVisitor) {
    return new tree.Visitor(partialVisitor);
};

module.exports = {
    create(opts) {
        return new Context(opts);
    }
};


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const util = __webpack_require__(4);
const path = __webpack_require__(9);
const fs = __webpack_require__(12);
const mkdirp = __webpack_require__(14);
const supportsColor = __webpack_require__(17);
const isAbsolute =
    path.isAbsolute ||
    /* istanbul ignore next */ function(p) {
        return path.resolve(p) === path.normalize(p);
    };

/**
 * abstract interface for writing content
 * @class ContentWriter
 * @constructor
 */
/* istanbul ignore next: abstract class */
function ContentWriter() {}

/**
 * writes a string as-is to the destination
 * @param {String} str the string to write
 */
/* istanbul ignore next: abstract class */
ContentWriter.prototype.write = function() {
    throw new Error('write: must be overridden');
};

/**
 * returns the colorized version of a string. Typically,
 * content writers that write to files will return the
 * same string and ones writing to a tty will wrap it in
 * appropriate escape sequences.
 * @param {String} str the string to colorize
 * @param {String} clazz one of `high`, `medium` or `low`
 * @returns {String} the colorized form of the string
 */
ContentWriter.prototype.colorize = function(str /*, clazz*/) {
    return str;
};

/**
 * writes a string appended with a newline to the destination
 * @param {String} str the string to write
 */
ContentWriter.prototype.println = function(str) {
    this.write(str + '\n');
};

/**
 * closes this content writer. Should be called after all writes are complete.
 */
ContentWriter.prototype.close = function() {};

/**
 * a content writer that writes to a file
 * @param {Number} fd - the file descriptor
 * @extends ContentWriter
 * @constructor
 */
function FileContentWriter(fd) {
    this.fd = fd;
}
util.inherits(FileContentWriter, ContentWriter);

FileContentWriter.prototype.write = function(str) {
    fs.writeSync(this.fd, str);
};

FileContentWriter.prototype.close = function() {
    fs.closeSync(this.fd);
};

/**
 * a content writer that writes to the console
 * @extends ContentWriter
 * @constructor
 */
function ConsoleWriter() {}
util.inherits(ConsoleWriter, ContentWriter);

// allow stdout to be captured for tests.
let capture = false;
let output = '';
ConsoleWriter.prototype.write = function(str) {
    if (capture) {
        output += str;
    } else {
        process.stdout.write(str);
    }
};

ConsoleWriter.prototype.colorize = function(str, clazz) {
    const colors = {
        low: '31;1',
        medium: '33;1',
        high: '32;1'
    };

    /* istanbul ignore next: different modes for CI and local */
    if (supportsColor.stdout && colors[clazz]) {
        return '\u001b[' + colors[clazz] + 'm' + str + '\u001b[0m';
    }
    return str;
};

/**
 * utility for writing files under a specific directory
 * @class FileWriter
 * @param {String} baseDir the base directory under which files should be written
 * @constructor
 */
function FileWriter(baseDir) {
    if (!baseDir) {
        throw new Error('baseDir must be specified');
    }
    this.baseDir = baseDir;
}

/**
 * static helpers for capturing stdout report output;
 * super useful for tests!
 */
FileWriter.startCapture = function() {
    capture = true;
};
FileWriter.stopCapture = function() {
    capture = false;
};
FileWriter.getOutput = function() {
    return output;
};
FileWriter.resetOutput = function() {
    output = '';
};

/**
 * returns a FileWriter that is rooted at the supplied subdirectory
 * @param {String} subdir the subdirectory under which to root the
 *  returned FileWriter
 * @returns {FileWriter}
 */
FileWriter.prototype.writerForDir = function(subdir) {
    if (isAbsolute(subdir)) {
        throw new Error(
            'Cannot create subdir writer for absolute path: ' + subdir
        );
    }
    return new FileWriter(this.baseDir + '/' + subdir);
};
/**
 * copies a file from a source directory to a destination name
 * @param {String} source path to source file
 * @param {String} dest relative path to destination file
 * @param {String} [header=undefined] optional text to prepend to destination
 *  (e.g., an "this file is autogenerated" comment, copyright notice, etc.)
 */
FileWriter.prototype.copyFile = function(source, dest, header) {
    if (isAbsolute(dest)) {
        throw new Error('Cannot write to absolute path: ' + dest);
    }
    dest = path.resolve(this.baseDir, dest);
    mkdirp.sync(path.dirname(dest));
    let contents;
    if (header) {
        contents = header + fs.readFileSync(source, 'utf8');
    } else {
        contents = fs.readFileSync(source);
    }
    fs.writeFileSync(dest, contents);
};
/**
 * returns a content writer for writing content to the supplied file.
 * @param {String|null} file the relative path to the file or the special
 *  values `"-"` or `null` for writing to the console
 * @returns {ContentWriter}
 */
FileWriter.prototype.writeFile = function(file) {
    if (file === null || file === '-') {
        return new ConsoleWriter();
    }
    if (isAbsolute(file)) {
        throw new Error('Cannot write to absolute path: ' + file);
    }
    file = path.resolve(this.baseDir, file);
    mkdirp.sync(path.dirname(file));
    return new FileContentWriter(fs.openSync(file, 'w'));
};

module.exports = FileWriter;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const fs = __webpack_require__(12);
const path = __webpack_require__(9);
const pify = __webpack_require__(15);
const semver = __webpack_require__(16);

const defaults = {
	mode: 0o777 & (~process.umask()),
	fs
};

const useNativeRecursiveOption = semver.satisfies(process.version, '>=10.12.0');

// https://github.com/nodejs/node/issues/8987
// https://github.com/libuv/libuv/pull/1088
const checkPath = pth => {
	if (process.platform === 'win32') {
		const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ''));

		if (pathHasInvalidWinCharacters) {
			const error = new Error(`Path contains invalid characters: ${pth}`);
			error.code = 'EINVAL';
			throw error;
		}
	}
};

const permissionError = pth => {
	// This replicates the exception of `fs.mkdir` with native the
	// `recusive` option when run on an invalid drive under Windows.
	const error = new Error(`operation not permitted, mkdir '${pth}'`);
	error.code = 'EPERM';
	error.errno = -4048;
	error.path = pth;
	error.syscall = 'mkdir';
	return error;
};

const makeDir = (input, options) => Promise.resolve().then(() => {
	checkPath(input);
	options = Object.assign({}, defaults, options);

	// TODO: Use util.promisify when targeting Node.js 8
	const mkdir = pify(options.fs.mkdir);
	const stat = pify(options.fs.stat);

	if (useNativeRecursiveOption && options.fs.mkdir === fs.mkdir) {
		const pth = path.resolve(input);

		return mkdir(pth, {
			mode: options.mode,
			recursive: true
		}).then(() => pth);
	}

	const make = pth => {
		return mkdir(pth, options.mode)
			.then(() => pth)
			.catch(error => {
				if (error.code === 'EPERM') {
					throw error;
				}

				if (error.code === 'ENOENT') {
					if (path.dirname(pth) === pth) {
						throw permissionError(pth);
					}

					if (error.message.includes('null bytes')) {
						throw error;
					}

					return make(path.dirname(pth)).then(() => make(pth));
				}

				return stat(pth)
					.then(stats => stats.isDirectory() ? pth : Promise.reject())
					.catch(() => {
						throw error;
					});
			});
	};

	return make(path.resolve(input));
});

module.exports = makeDir;
module.exports.default = makeDir;

module.exports.sync = (input, options) => {
	checkPath(input);
	options = Object.assign({}, defaults, options);

	if (useNativeRecursiveOption && options.fs.mkdirSync === fs.mkdirSync) {
		const pth = path.resolve(input);

		fs.mkdirSync(pth, {
			mode: options.mode,
			recursive: true
		});

		return pth;
	}

	const make = pth => {
		try {
			options.fs.mkdirSync(pth, options.mode);
		} catch (error) {
			if (error.code === 'EPERM') {
				throw error;
			}

			if (error.code === 'ENOENT') {
				if (path.dirname(pth) === pth) {
					throw permissionError(pth);
				}

				if (error.message.includes('null bytes')) {
					throw error;
				}

				make(path.dirname(pth));
				return make(pth);
			}

			try {
				if (!options.fs.statSync(pth).isDirectory()) {
					throw new Error('The path is not a directory');
				}
			} catch (_) {
				throw error;
			}
		}

		return pth;
	};

	return make(path.resolve(input));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const processFn = (fn, options) => function (...args) {
	const P = options.promiseModule;

	return new P((resolve, reject) => {
		if (options.multiArgs) {
			args.push((...result) => {
				if (options.errorFirst) {
					if (result[0]) {
						reject(result);
					} else {
						result.shift();
						resolve(result);
					}
				} else {
					resolve(result);
				}
			});
		} else if (options.errorFirst) {
			args.push((error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			});
		} else {
			args.push(resolve);
		}

		fn.apply(this, args);
	});
};

module.exports = (input, options) => {
	options = Object.assign({
		exclude: [/.+(Sync|Stream)$/],
		errorFirst: true,
		promiseModule: Promise
	}, options);

	const objType = typeof input;
	if (!(input !== null && (objType === 'object' || objType === 'function'))) {
		throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${input === null ? 'null' : objType}\``);
	}

	const filter = key => {
		const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
		return options.include ? options.include.some(match) : !options.exclude.some(match);
	};

	let ret;
	if (objType === 'function') {
		ret = function (...args) {
			return options.excludeMain ? input(...args) : processFn(input, options).apply(this, args);
		};
	} else {
		ret = Object.create(Object.getPrototypeOf(input));
	}

	for (const key in input) { // eslint-disable-line guard-for-in
		const property = input[key];
		ret[key] = typeof property === 'function' && filter(key) ? processFn(property, options) : property;
	}

	return ret;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

exports = module.exports = SemVer

var debug
/* istanbul ignore next */
if (typeof process === 'object' &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)) {
  debug = function () {
    var args = Array.prototype.slice.call(arguments, 0)
    args.unshift('SEMVER')
    console.log.apply(console, args)
  }
} else {
  debug = function () {}
}

// Note: this is the semver.org version of the spec that it implements
// Not necessarily the package version of this code.
exports.SEMVER_SPEC_VERSION = '2.0.0'

var MAX_LENGTH = 256
var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER ||
  /* istanbul ignore next */ 9007199254740991

// Max safe segment length for coercion.
var MAX_SAFE_COMPONENT_LENGTH = 16

// The actual regexps go on exports.re
var re = exports.re = []
var src = exports.src = []
var R = 0

// The following Regular Expressions can be used for tokenizing,
// validating, and parsing SemVer version strings.

// ## Numeric Identifier
// A single `0`, or a non-zero digit followed by zero or more digits.

var NUMERICIDENTIFIER = R++
src[NUMERICIDENTIFIER] = '0|[1-9]\\d*'
var NUMERICIDENTIFIERLOOSE = R++
src[NUMERICIDENTIFIERLOOSE] = '[0-9]+'

// ## Non-numeric Identifier
// Zero or more digits, followed by a letter or hyphen, and then zero or
// more letters, digits, or hyphens.

var NONNUMERICIDENTIFIER = R++
src[NONNUMERICIDENTIFIER] = '\\d*[a-zA-Z-][a-zA-Z0-9-]*'

// ## Main Version
// Three dot-separated numeric identifiers.

var MAINVERSION = R++
src[MAINVERSION] = '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')\\.' +
                   '(' + src[NUMERICIDENTIFIER] + ')'

var MAINVERSIONLOOSE = R++
src[MAINVERSIONLOOSE] = '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')\\.' +
                        '(' + src[NUMERICIDENTIFIERLOOSE] + ')'

// ## Pre-release Version Identifier
// A numeric identifier, or a non-numeric identifier.

var PRERELEASEIDENTIFIER = R++
src[PRERELEASEIDENTIFIER] = '(?:' + src[NUMERICIDENTIFIER] +
                            '|' + src[NONNUMERICIDENTIFIER] + ')'

var PRERELEASEIDENTIFIERLOOSE = R++
src[PRERELEASEIDENTIFIERLOOSE] = '(?:' + src[NUMERICIDENTIFIERLOOSE] +
                                 '|' + src[NONNUMERICIDENTIFIER] + ')'

// ## Pre-release Version
// Hyphen, followed by one or more dot-separated pre-release version
// identifiers.

var PRERELEASE = R++
src[PRERELEASE] = '(?:-(' + src[PRERELEASEIDENTIFIER] +
                  '(?:\\.' + src[PRERELEASEIDENTIFIER] + ')*))'

var PRERELEASELOOSE = R++
src[PRERELEASELOOSE] = '(?:-?(' + src[PRERELEASEIDENTIFIERLOOSE] +
                       '(?:\\.' + src[PRERELEASEIDENTIFIERLOOSE] + ')*))'

// ## Build Metadata Identifier
// Any combination of digits, letters, or hyphens.

var BUILDIDENTIFIER = R++
src[BUILDIDENTIFIER] = '[0-9A-Za-z-]+'

// ## Build Metadata
// Plus sign, followed by one or more period-separated build metadata
// identifiers.

var BUILD = R++
src[BUILD] = '(?:\\+(' + src[BUILDIDENTIFIER] +
             '(?:\\.' + src[BUILDIDENTIFIER] + ')*))'

// ## Full Version String
// A main version, followed optionally by a pre-release version and
// build metadata.

// Note that the only major, minor, patch, and pre-release sections of
// the version string are capturing groups.  The build metadata is not a
// capturing group, because it should not ever be used in version
// comparison.

var FULL = R++
var FULLPLAIN = 'v?' + src[MAINVERSION] +
                src[PRERELEASE] + '?' +
                src[BUILD] + '?'

src[FULL] = '^' + FULLPLAIN + '$'

// like full, but allows v1.2.3 and =1.2.3, which people do sometimes.
// also, 1.0.0alpha1 (prerelease without the hyphen) which is pretty
// common in the npm registry.
var LOOSEPLAIN = '[v=\\s]*' + src[MAINVERSIONLOOSE] +
                 src[PRERELEASELOOSE] + '?' +
                 src[BUILD] + '?'

var LOOSE = R++
src[LOOSE] = '^' + LOOSEPLAIN + '$'

var GTLT = R++
src[GTLT] = '((?:<|>)?=?)'

// Something like "2.*" or "1.2.x".
// Note that "x.x" is a valid xRange identifer, meaning "any version"
// Only the first item is strictly required.
var XRANGEIDENTIFIERLOOSE = R++
src[XRANGEIDENTIFIERLOOSE] = src[NUMERICIDENTIFIERLOOSE] + '|x|X|\\*'
var XRANGEIDENTIFIER = R++
src[XRANGEIDENTIFIER] = src[NUMERICIDENTIFIER] + '|x|X|\\*'

var XRANGEPLAIN = R++
src[XRANGEPLAIN] = '[v=\\s]*(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:\\.(' + src[XRANGEIDENTIFIER] + ')' +
                   '(?:' + src[PRERELEASE] + ')?' +
                   src[BUILD] + '?' +
                   ')?)?'

var XRANGEPLAINLOOSE = R++
src[XRANGEPLAINLOOSE] = '[v=\\s]*(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:\\.(' + src[XRANGEIDENTIFIERLOOSE] + ')' +
                        '(?:' + src[PRERELEASELOOSE] + ')?' +
                        src[BUILD] + '?' +
                        ')?)?'

var XRANGE = R++
src[XRANGE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAIN] + '$'
var XRANGELOOSE = R++
src[XRANGELOOSE] = '^' + src[GTLT] + '\\s*' + src[XRANGEPLAINLOOSE] + '$'

// Coercion.
// Extract anything that could conceivably be a part of a valid semver
var COERCE = R++
src[COERCE] = '(?:^|[^\\d])' +
              '(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '})' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:\\.(\\d{1,' + MAX_SAFE_COMPONENT_LENGTH + '}))?' +
              '(?:$|[^\\d])'

// Tilde ranges.
// Meaning is "reasonably at or greater than"
var LONETILDE = R++
src[LONETILDE] = '(?:~>?)'

var TILDETRIM = R++
src[TILDETRIM] = '(\\s*)' + src[LONETILDE] + '\\s+'
re[TILDETRIM] = new RegExp(src[TILDETRIM], 'g')
var tildeTrimReplace = '$1~'

var TILDE = R++
src[TILDE] = '^' + src[LONETILDE] + src[XRANGEPLAIN] + '$'
var TILDELOOSE = R++
src[TILDELOOSE] = '^' + src[LONETILDE] + src[XRANGEPLAINLOOSE] + '$'

// Caret ranges.
// Meaning is "at least and backwards compatible with"
var LONECARET = R++
src[LONECARET] = '(?:\\^)'

var CARETTRIM = R++
src[CARETTRIM] = '(\\s*)' + src[LONECARET] + '\\s+'
re[CARETTRIM] = new RegExp(src[CARETTRIM], 'g')
var caretTrimReplace = '$1^'

var CARET = R++
src[CARET] = '^' + src[LONECARET] + src[XRANGEPLAIN] + '$'
var CARETLOOSE = R++
src[CARETLOOSE] = '^' + src[LONECARET] + src[XRANGEPLAINLOOSE] + '$'

// A simple gt/lt/eq thing, or just "" to indicate "any version"
var COMPARATORLOOSE = R++
src[COMPARATORLOOSE] = '^' + src[GTLT] + '\\s*(' + LOOSEPLAIN + ')$|^$'
var COMPARATOR = R++
src[COMPARATOR] = '^' + src[GTLT] + '\\s*(' + FULLPLAIN + ')$|^$'

// An expression to strip any whitespace between the gtlt and the thing
// it modifies, so that `> 1.2.3` ==> `>1.2.3`
var COMPARATORTRIM = R++
src[COMPARATORTRIM] = '(\\s*)' + src[GTLT] +
                      '\\s*(' + LOOSEPLAIN + '|' + src[XRANGEPLAIN] + ')'

// this one has to use the /g flag
re[COMPARATORTRIM] = new RegExp(src[COMPARATORTRIM], 'g')
var comparatorTrimReplace = '$1$2$3'

// Something like `1.2.3 - 1.2.4`
// Note that these all use the loose form, because they'll be
// checked against either the strict or loose comparator form
// later.
var HYPHENRANGE = R++
src[HYPHENRANGE] = '^\\s*(' + src[XRANGEPLAIN] + ')' +
                   '\\s+-\\s+' +
                   '(' + src[XRANGEPLAIN] + ')' +
                   '\\s*$'

var HYPHENRANGELOOSE = R++
src[HYPHENRANGELOOSE] = '^\\s*(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s+-\\s+' +
                        '(' + src[XRANGEPLAINLOOSE] + ')' +
                        '\\s*$'

// Star ranges basically just allow anything at all.
var STAR = R++
src[STAR] = '(<|>)?=?\\s*\\*'

// Compile to actual regexp objects.
// All are flag-free, unless they were created above with a flag.
for (var i = 0; i < R; i++) {
  debug(i, src[i])
  if (!re[i]) {
    re[i] = new RegExp(src[i])
  }
}

exports.parse = parse
function parse (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  if (version.length > MAX_LENGTH) {
    return null
  }

  var r = options.loose ? re[LOOSE] : re[FULL]
  if (!r.test(version)) {
    return null
  }

  try {
    return new SemVer(version, options)
  } catch (er) {
    return null
  }
}

exports.valid = valid
function valid (version, options) {
  var v = parse(version, options)
  return v ? v.version : null
}

exports.clean = clean
function clean (version, options) {
  var s = parse(version.trim().replace(/^[=v]+/, ''), options)
  return s ? s.version : null
}

exports.SemVer = SemVer

function SemVer (version, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }
  if (version instanceof SemVer) {
    if (version.loose === options.loose) {
      return version
    } else {
      version = version.version
    }
  } else if (typeof version !== 'string') {
    throw new TypeError('Invalid Version: ' + version)
  }

  if (version.length > MAX_LENGTH) {
    throw new TypeError('version is longer than ' + MAX_LENGTH + ' characters')
  }

  if (!(this instanceof SemVer)) {
    return new SemVer(version, options)
  }

  debug('SemVer', version, options)
  this.options = options
  this.loose = !!options.loose

  var m = version.trim().match(options.loose ? re[LOOSE] : re[FULL])

  if (!m) {
    throw new TypeError('Invalid Version: ' + version)
  }

  this.raw = version

  // these are actually numbers
  this.major = +m[1]
  this.minor = +m[2]
  this.patch = +m[3]

  if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
    throw new TypeError('Invalid major version')
  }

  if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
    throw new TypeError('Invalid minor version')
  }

  if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
    throw new TypeError('Invalid patch version')
  }

  // numberify any prerelease numeric ids
  if (!m[4]) {
    this.prerelease = []
  } else {
    this.prerelease = m[4].split('.').map(function (id) {
      if (/^[0-9]+$/.test(id)) {
        var num = +id
        if (num >= 0 && num < MAX_SAFE_INTEGER) {
          return num
        }
      }
      return id
    })
  }

  this.build = m[5] ? m[5].split('.') : []
  this.format()
}

SemVer.prototype.format = function () {
  this.version = this.major + '.' + this.minor + '.' + this.patch
  if (this.prerelease.length) {
    this.version += '-' + this.prerelease.join('.')
  }
  return this.version
}

SemVer.prototype.toString = function () {
  return this.version
}

SemVer.prototype.compare = function (other) {
  debug('SemVer.compare', this.version, this.options, other)
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return this.compareMain(other) || this.comparePre(other)
}

SemVer.prototype.compareMain = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  return compareIdentifiers(this.major, other.major) ||
         compareIdentifiers(this.minor, other.minor) ||
         compareIdentifiers(this.patch, other.patch)
}

SemVer.prototype.comparePre = function (other) {
  if (!(other instanceof SemVer)) {
    other = new SemVer(other, this.options)
  }

  // NOT having a prerelease is > having one
  if (this.prerelease.length && !other.prerelease.length) {
    return -1
  } else if (!this.prerelease.length && other.prerelease.length) {
    return 1
  } else if (!this.prerelease.length && !other.prerelease.length) {
    return 0
  }

  var i = 0
  do {
    var a = this.prerelease[i]
    var b = other.prerelease[i]
    debug('prerelease compare', i, a, b)
    if (a === undefined && b === undefined) {
      return 0
    } else if (b === undefined) {
      return 1
    } else if (a === undefined) {
      return -1
    } else if (a === b) {
      continue
    } else {
      return compareIdentifiers(a, b)
    }
  } while (++i)
}

// preminor will bump the version up to the next minor release, and immediately
// down to pre-release. premajor and prepatch work the same way.
SemVer.prototype.inc = function (release, identifier) {
  switch (release) {
    case 'premajor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor = 0
      this.major++
      this.inc('pre', identifier)
      break
    case 'preminor':
      this.prerelease.length = 0
      this.patch = 0
      this.minor++
      this.inc('pre', identifier)
      break
    case 'prepatch':
      // If this is already a prerelease, it will bump to the next version
      // drop any prereleases that might already exist, since they are not
      // relevant at this point.
      this.prerelease.length = 0
      this.inc('patch', identifier)
      this.inc('pre', identifier)
      break
    // If the input is a non-prerelease version, this acts the same as
    // prepatch.
    case 'prerelease':
      if (this.prerelease.length === 0) {
        this.inc('patch', identifier)
      }
      this.inc('pre', identifier)
      break

    case 'major':
      // If this is a pre-major version, bump up to the same major version.
      // Otherwise increment major.
      // 1.0.0-5 bumps to 1.0.0
      // 1.1.0 bumps to 2.0.0
      if (this.minor !== 0 ||
          this.patch !== 0 ||
          this.prerelease.length === 0) {
        this.major++
      }
      this.minor = 0
      this.patch = 0
      this.prerelease = []
      break
    case 'minor':
      // If this is a pre-minor version, bump up to the same minor version.
      // Otherwise increment minor.
      // 1.2.0-5 bumps to 1.2.0
      // 1.2.1 bumps to 1.3.0
      if (this.patch !== 0 || this.prerelease.length === 0) {
        this.minor++
      }
      this.patch = 0
      this.prerelease = []
      break
    case 'patch':
      // If this is not a pre-release version, it will increment the patch.
      // If it is a pre-release it will bump up to the same patch version.
      // 1.2.0-5 patches to 1.2.0
      // 1.2.0 patches to 1.2.1
      if (this.prerelease.length === 0) {
        this.patch++
      }
      this.prerelease = []
      break
    // This probably shouldn't be used publicly.
    // 1.0.0 "pre" would become 1.0.0-0 which is the wrong direction.
    case 'pre':
      if (this.prerelease.length === 0) {
        this.prerelease = [0]
      } else {
        var i = this.prerelease.length
        while (--i >= 0) {
          if (typeof this.prerelease[i] === 'number') {
            this.prerelease[i]++
            i = -2
          }
        }
        if (i === -1) {
          // didn't increment anything
          this.prerelease.push(0)
        }
      }
      if (identifier) {
        // 1.2.0-beta.1 bumps to 1.2.0-beta.2,
        // 1.2.0-beta.fooblz or 1.2.0-beta bumps to 1.2.0-beta.0
        if (this.prerelease[0] === identifier) {
          if (isNaN(this.prerelease[1])) {
            this.prerelease = [identifier, 0]
          }
        } else {
          this.prerelease = [identifier, 0]
        }
      }
      break

    default:
      throw new Error('invalid increment argument: ' + release)
  }
  this.format()
  this.raw = this.version
  return this
}

exports.inc = inc
function inc (version, release, loose, identifier) {
  if (typeof (loose) === 'string') {
    identifier = loose
    loose = undefined
  }

  try {
    return new SemVer(version, loose).inc(release, identifier).version
  } catch (er) {
    return null
  }
}

exports.diff = diff
function diff (version1, version2) {
  if (eq(version1, version2)) {
    return null
  } else {
    var v1 = parse(version1)
    var v2 = parse(version2)
    var prefix = ''
    if (v1.prerelease.length || v2.prerelease.length) {
      prefix = 'pre'
      var defaultResult = 'prerelease'
    }
    for (var key in v1) {
      if (key === 'major' || key === 'minor' || key === 'patch') {
        if (v1[key] !== v2[key]) {
          return prefix + key
        }
      }
    }
    return defaultResult // may be undefined
  }
}

exports.compareIdentifiers = compareIdentifiers

var numeric = /^[0-9]+$/
function compareIdentifiers (a, b) {
  var anum = numeric.test(a)
  var bnum = numeric.test(b)

  if (anum && bnum) {
    a = +a
    b = +b
  }

  return a === b ? 0
    : (anum && !bnum) ? -1
    : (bnum && !anum) ? 1
    : a < b ? -1
    : 1
}

exports.rcompareIdentifiers = rcompareIdentifiers
function rcompareIdentifiers (a, b) {
  return compareIdentifiers(b, a)
}

exports.major = major
function major (a, loose) {
  return new SemVer(a, loose).major
}

exports.minor = minor
function minor (a, loose) {
  return new SemVer(a, loose).minor
}

exports.patch = patch
function patch (a, loose) {
  return new SemVer(a, loose).patch
}

exports.compare = compare
function compare (a, b, loose) {
  return new SemVer(a, loose).compare(new SemVer(b, loose))
}

exports.compareLoose = compareLoose
function compareLoose (a, b) {
  return compare(a, b, true)
}

exports.rcompare = rcompare
function rcompare (a, b, loose) {
  return compare(b, a, loose)
}

exports.sort = sort
function sort (list, loose) {
  return list.sort(function (a, b) {
    return exports.compare(a, b, loose)
  })
}

exports.rsort = rsort
function rsort (list, loose) {
  return list.sort(function (a, b) {
    return exports.rcompare(a, b, loose)
  })
}

exports.gt = gt
function gt (a, b, loose) {
  return compare(a, b, loose) > 0
}

exports.lt = lt
function lt (a, b, loose) {
  return compare(a, b, loose) < 0
}

exports.eq = eq
function eq (a, b, loose) {
  return compare(a, b, loose) === 0
}

exports.neq = neq
function neq (a, b, loose) {
  return compare(a, b, loose) !== 0
}

exports.gte = gte
function gte (a, b, loose) {
  return compare(a, b, loose) >= 0
}

exports.lte = lte
function lte (a, b, loose) {
  return compare(a, b, loose) <= 0
}

exports.cmp = cmp
function cmp (a, op, b, loose) {
  switch (op) {
    case '===':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a === b

    case '!==':
      if (typeof a === 'object')
        a = a.version
      if (typeof b === 'object')
        b = b.version
      return a !== b

    case '':
    case '=':
    case '==':
      return eq(a, b, loose)

    case '!=':
      return neq(a, b, loose)

    case '>':
      return gt(a, b, loose)

    case '>=':
      return gte(a, b, loose)

    case '<':
      return lt(a, b, loose)

    case '<=':
      return lte(a, b, loose)

    default:
      throw new TypeError('Invalid operator: ' + op)
  }
}

exports.Comparator = Comparator
function Comparator (comp, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (comp instanceof Comparator) {
    if (comp.loose === !!options.loose) {
      return comp
    } else {
      comp = comp.value
    }
  }

  if (!(this instanceof Comparator)) {
    return new Comparator(comp, options)
  }

  debug('comparator', comp, options)
  this.options = options
  this.loose = !!options.loose
  this.parse(comp)

  if (this.semver === ANY) {
    this.value = ''
  } else {
    this.value = this.operator + this.semver.version
  }

  debug('comp', this)
}

var ANY = {}
Comparator.prototype.parse = function (comp) {
  var r = this.options.loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var m = comp.match(r)

  if (!m) {
    throw new TypeError('Invalid comparator: ' + comp)
  }

  this.operator = m[1]
  if (this.operator === '=') {
    this.operator = ''
  }

  // if it literally is just '>' or '' then allow anything.
  if (!m[2]) {
    this.semver = ANY
  } else {
    this.semver = new SemVer(m[2], this.options.loose)
  }
}

Comparator.prototype.toString = function () {
  return this.value
}

Comparator.prototype.test = function (version) {
  debug('Comparator.test', version, this.options.loose)

  if (this.semver === ANY) {
    return true
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  return cmp(version, this.operator, this.semver, this.options)
}

Comparator.prototype.intersects = function (comp, options) {
  if (!(comp instanceof Comparator)) {
    throw new TypeError('a Comparator is required')
  }

  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  var rangeTmp

  if (this.operator === '') {
    rangeTmp = new Range(comp.value, options)
    return satisfies(this.value, rangeTmp, options)
  } else if (comp.operator === '') {
    rangeTmp = new Range(this.value, options)
    return satisfies(comp.semver, rangeTmp, options)
  }

  var sameDirectionIncreasing =
    (this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '>=' || comp.operator === '>')
  var sameDirectionDecreasing =
    (this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '<=' || comp.operator === '<')
  var sameSemVer = this.semver.version === comp.semver.version
  var differentDirectionsInclusive =
    (this.operator === '>=' || this.operator === '<=') &&
    (comp.operator === '>=' || comp.operator === '<=')
  var oppositeDirectionsLessThan =
    cmp(this.semver, '<', comp.semver, options) &&
    ((this.operator === '>=' || this.operator === '>') &&
    (comp.operator === '<=' || comp.operator === '<'))
  var oppositeDirectionsGreaterThan =
    cmp(this.semver, '>', comp.semver, options) &&
    ((this.operator === '<=' || this.operator === '<') &&
    (comp.operator === '>=' || comp.operator === '>'))

  return sameDirectionIncreasing || sameDirectionDecreasing ||
    (sameSemVer && differentDirectionsInclusive) ||
    oppositeDirectionsLessThan || oppositeDirectionsGreaterThan
}

exports.Range = Range
function Range (range, options) {
  if (!options || typeof options !== 'object') {
    options = {
      loose: !!options,
      includePrerelease: false
    }
  }

  if (range instanceof Range) {
    if (range.loose === !!options.loose &&
        range.includePrerelease === !!options.includePrerelease) {
      return range
    } else {
      return new Range(range.raw, options)
    }
  }

  if (range instanceof Comparator) {
    return new Range(range.value, options)
  }

  if (!(this instanceof Range)) {
    return new Range(range, options)
  }

  this.options = options
  this.loose = !!options.loose
  this.includePrerelease = !!options.includePrerelease

  // First, split based on boolean or ||
  this.raw = range
  this.set = range.split(/\s*\|\|\s*/).map(function (range) {
    return this.parseRange(range.trim())
  }, this).filter(function (c) {
    // throw out any that are not relevant for whatever reason
    return c.length
  })

  if (!this.set.length) {
    throw new TypeError('Invalid SemVer Range: ' + range)
  }

  this.format()
}

Range.prototype.format = function () {
  this.range = this.set.map(function (comps) {
    return comps.join(' ').trim()
  }).join('||').trim()
  return this.range
}

Range.prototype.toString = function () {
  return this.range
}

Range.prototype.parseRange = function (range) {
  var loose = this.options.loose
  range = range.trim()
  // `1.2.3 - 1.2.4` => `>=1.2.3 <=1.2.4`
  var hr = loose ? re[HYPHENRANGELOOSE] : re[HYPHENRANGE]
  range = range.replace(hr, hyphenReplace)
  debug('hyphen replace', range)
  // `> 1.2.3 < 1.2.5` => `>1.2.3 <1.2.5`
  range = range.replace(re[COMPARATORTRIM], comparatorTrimReplace)
  debug('comparator trim', range, re[COMPARATORTRIM])

  // `~ 1.2.3` => `~1.2.3`
  range = range.replace(re[TILDETRIM], tildeTrimReplace)

  // `^ 1.2.3` => `^1.2.3`
  range = range.replace(re[CARETTRIM], caretTrimReplace)

  // normalize spaces
  range = range.split(/\s+/).join(' ')

  // At this point, the range is completely trimmed and
  // ready to be split into comparators.

  var compRe = loose ? re[COMPARATORLOOSE] : re[COMPARATOR]
  var set = range.split(' ').map(function (comp) {
    return parseComparator(comp, this.options)
  }, this).join(' ').split(/\s+/)
  if (this.options.loose) {
    // in loose mode, throw out any that are not valid comparators
    set = set.filter(function (comp) {
      return !!comp.match(compRe)
    })
  }
  set = set.map(function (comp) {
    return new Comparator(comp, this.options)
  }, this)

  return set
}

Range.prototype.intersects = function (range, options) {
  if (!(range instanceof Range)) {
    throw new TypeError('a Range is required')
  }

  return this.set.some(function (thisComparators) {
    return thisComparators.every(function (thisComparator) {
      return range.set.some(function (rangeComparators) {
        return rangeComparators.every(function (rangeComparator) {
          return thisComparator.intersects(rangeComparator, options)
        })
      })
    })
  })
}

// Mostly just for testing and legacy API reasons
exports.toComparators = toComparators
function toComparators (range, options) {
  return new Range(range, options).set.map(function (comp) {
    return comp.map(function (c) {
      return c.value
    }).join(' ').trim().split(' ')
  })
}

// comprised of xranges, tildes, stars, and gtlt's at this point.
// already replaced the hyphen ranges
// turn into a set of JUST comparators.
function parseComparator (comp, options) {
  debug('comp', comp, options)
  comp = replaceCarets(comp, options)
  debug('caret', comp)
  comp = replaceTildes(comp, options)
  debug('tildes', comp)
  comp = replaceXRanges(comp, options)
  debug('xrange', comp)
  comp = replaceStars(comp, options)
  debug('stars', comp)
  return comp
}

function isX (id) {
  return !id || id.toLowerCase() === 'x' || id === '*'
}

// ~, ~> --> * (any, kinda silly)
// ~2, ~2.x, ~2.x.x, ~>2, ~>2.x ~>2.x.x --> >=2.0.0 <3.0.0
// ~2.0, ~2.0.x, ~>2.0, ~>2.0.x --> >=2.0.0 <2.1.0
// ~1.2, ~1.2.x, ~>1.2, ~>1.2.x --> >=1.2.0 <1.3.0
// ~1.2.3, ~>1.2.3 --> >=1.2.3 <1.3.0
// ~1.2.0, ~>1.2.0 --> >=1.2.0 <1.3.0
function replaceTildes (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceTilde(comp, options)
  }).join(' ')
}

function replaceTilde (comp, options) {
  var r = options.loose ? re[TILDELOOSE] : re[TILDE]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('tilde', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      // ~1.2 == >=1.2.0 <1.3.0
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    } else if (pr) {
      debug('replaceTilde pr', pr)
      ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
            ' <' + M + '.' + (+m + 1) + '.0'
    } else {
      // ~1.2.3 == >=1.2.3 <1.3.0
      ret = '>=' + M + '.' + m + '.' + p +
            ' <' + M + '.' + (+m + 1) + '.0'
    }

    debug('tilde return', ret)
    return ret
  })
}

// ^ --> * (any, kinda silly)
// ^2, ^2.x, ^2.x.x --> >=2.0.0 <3.0.0
// ^2.0, ^2.0.x --> >=2.0.0 <3.0.0
// ^1.2, ^1.2.x --> >=1.2.0 <2.0.0
// ^1.2.3 --> >=1.2.3 <2.0.0
// ^1.2.0 --> >=1.2.0 <2.0.0
function replaceCarets (comp, options) {
  return comp.trim().split(/\s+/).map(function (comp) {
    return replaceCaret(comp, options)
  }).join(' ')
}

function replaceCaret (comp, options) {
  debug('caret', comp, options)
  var r = options.loose ? re[CARETLOOSE] : re[CARET]
  return comp.replace(r, function (_, M, m, p, pr) {
    debug('caret', comp, _, M, m, p, pr)
    var ret

    if (isX(M)) {
      ret = ''
    } else if (isX(m)) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (isX(p)) {
      if (M === '0') {
        ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
      } else {
        ret = '>=' + M + '.' + m + '.0 <' + (+M + 1) + '.0.0'
      }
    } else if (pr) {
      debug('replaceCaret pr', pr)
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p + '-' + pr +
              ' <' + (+M + 1) + '.0.0'
      }
    } else {
      debug('no pr')
      if (M === '0') {
        if (m === '0') {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + m + '.' + (+p + 1)
        } else {
          ret = '>=' + M + '.' + m + '.' + p +
                ' <' + M + '.' + (+m + 1) + '.0'
        }
      } else {
        ret = '>=' + M + '.' + m + '.' + p +
              ' <' + (+M + 1) + '.0.0'
      }
    }

    debug('caret return', ret)
    return ret
  })
}

function replaceXRanges (comp, options) {
  debug('replaceXRanges', comp, options)
  return comp.split(/\s+/).map(function (comp) {
    return replaceXRange(comp, options)
  }).join(' ')
}

function replaceXRange (comp, options) {
  comp = comp.trim()
  var r = options.loose ? re[XRANGELOOSE] : re[XRANGE]
  return comp.replace(r, function (ret, gtlt, M, m, p, pr) {
    debug('xRange', comp, ret, gtlt, M, m, p, pr)
    var xM = isX(M)
    var xm = xM || isX(m)
    var xp = xm || isX(p)
    var anyX = xp

    if (gtlt === '=' && anyX) {
      gtlt = ''
    }

    if (xM) {
      if (gtlt === '>' || gtlt === '<') {
        // nothing is allowed
        ret = '<0.0.0'
      } else {
        // nothing is forbidden
        ret = '*'
      }
    } else if (gtlt && anyX) {
      // we know patch is an x, because we have any x at all.
      // replace X with 0
      if (xm) {
        m = 0
      }
      p = 0

      if (gtlt === '>') {
        // >1 => >=2.0.0
        // >1.2 => >=1.3.0
        // >1.2.3 => >= 1.2.4
        gtlt = '>='
        if (xm) {
          M = +M + 1
          m = 0
          p = 0
        } else {
          m = +m + 1
          p = 0
        }
      } else if (gtlt === '<=') {
        // <=0.7.x is actually <0.8.0, since any 0.7.x should
        // pass.  Similarly, <=7.x is actually <8.0.0, etc.
        gtlt = '<'
        if (xm) {
          M = +M + 1
        } else {
          m = +m + 1
        }
      }

      ret = gtlt + M + '.' + m + '.' + p
    } else if (xm) {
      ret = '>=' + M + '.0.0 <' + (+M + 1) + '.0.0'
    } else if (xp) {
      ret = '>=' + M + '.' + m + '.0 <' + M + '.' + (+m + 1) + '.0'
    }

    debug('xRange return', ret)

    return ret
  })
}

// Because * is AND-ed with everything else in the comparator,
// and '' means "any version", just remove the *s entirely.
function replaceStars (comp, options) {
  debug('replaceStars', comp, options)
  // Looseness is ignored here.  star is always as loose as it gets!
  return comp.trim().replace(re[STAR], '')
}

// This function is passed to string.replace(re[HYPHENRANGE])
// M, m, patch, prerelease, build
// 1.2 - 3.4.5 => >=1.2.0 <=3.4.5
// 1.2.3 - 3.4 => >=1.2.0 <3.5.0 Any 3.4.x will do
// 1.2 - 3.4 => >=1.2.0 <3.5.0
function hyphenReplace ($0,
  from, fM, fm, fp, fpr, fb,
  to, tM, tm, tp, tpr, tb) {
  if (isX(fM)) {
    from = ''
  } else if (isX(fm)) {
    from = '>=' + fM + '.0.0'
  } else if (isX(fp)) {
    from = '>=' + fM + '.' + fm + '.0'
  } else {
    from = '>=' + from
  }

  if (isX(tM)) {
    to = ''
  } else if (isX(tm)) {
    to = '<' + (+tM + 1) + '.0.0'
  } else if (isX(tp)) {
    to = '<' + tM + '.' + (+tm + 1) + '.0'
  } else if (tpr) {
    to = '<=' + tM + '.' + tm + '.' + tp + '-' + tpr
  } else {
    to = '<=' + to
  }

  return (from + ' ' + to).trim()
}

// if ANY of the sets match ALL of its comparators, then pass
Range.prototype.test = function (version) {
  if (!version) {
    return false
  }

  if (typeof version === 'string') {
    version = new SemVer(version, this.options)
  }

  for (var i = 0; i < this.set.length; i++) {
    if (testSet(this.set[i], version, this.options)) {
      return true
    }
  }
  return false
}

function testSet (set, version, options) {
  for (var i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false
    }
  }

  if (version.prerelease.length && !options.includePrerelease) {
    // Find the set of versions that are allowed to have prereleases
    // For example, ^1.2.3-pr.1 desugars to >=1.2.3-pr.1 <2.0.0
    // That should allow `1.2.3-pr.2` to pass.
    // However, `1.2.4-alpha.notready` should NOT be allowed,
    // even though it's within the range set by the comparators.
    for (i = 0; i < set.length; i++) {
      debug(set[i].semver)
      if (set[i].semver === ANY) {
        continue
      }

      if (set[i].semver.prerelease.length > 0) {
        var allowed = set[i].semver
        if (allowed.major === version.major &&
            allowed.minor === version.minor &&
            allowed.patch === version.patch) {
          return true
        }
      }
    }

    // Version has a -pre, but it's not one of the ones we like.
    return false
  }

  return true
}

exports.satisfies = satisfies
function satisfies (version, range, options) {
  try {
    range = new Range(range, options)
  } catch (er) {
    return false
  }
  return range.test(version)
}

exports.maxSatisfying = maxSatisfying
function maxSatisfying (versions, range, options) {
  var max = null
  var maxSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!max || maxSV.compare(v) === -1) {
        // compare(max, v, true)
        max = v
        maxSV = new SemVer(max, options)
      }
    }
  })
  return max
}

exports.minSatisfying = minSatisfying
function minSatisfying (versions, range, options) {
  var min = null
  var minSV = null
  try {
    var rangeObj = new Range(range, options)
  } catch (er) {
    return null
  }
  versions.forEach(function (v) {
    if (rangeObj.test(v)) {
      // satisfies(v, range, options)
      if (!min || minSV.compare(v) === 1) {
        // compare(min, v, true)
        min = v
        minSV = new SemVer(min, options)
      }
    }
  })
  return min
}

exports.minVersion = minVersion
function minVersion (range, loose) {
  range = new Range(range, loose)

  var minver = new SemVer('0.0.0')
  if (range.test(minver)) {
    return minver
  }

  minver = new SemVer('0.0.0-0')
  if (range.test(minver)) {
    return minver
  }

  minver = null
  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    comparators.forEach(function (comparator) {
      // Clone to avoid manipulating the comparator's semver object.
      var compver = new SemVer(comparator.semver.version)
      switch (comparator.operator) {
        case '>':
          if (compver.prerelease.length === 0) {
            compver.patch++
          } else {
            compver.prerelease.push(0)
          }
          compver.raw = compver.format()
          /* fallthrough */
        case '':
        case '>=':
          if (!minver || gt(minver, compver)) {
            minver = compver
          }
          break
        case '<':
        case '<=':
          /* Ignore maximum versions */
          break
        /* istanbul ignore next */
        default:
          throw new Error('Unexpected operation: ' + comparator.operator)
      }
    })
  }

  if (minver && range.test(minver)) {
    return minver
  }

  return null
}

exports.validRange = validRange
function validRange (range, options) {
  try {
    // Return '*' instead of '' so that truthiness works.
    // This will throw if it's invalid anyway
    return new Range(range, options).range || '*'
  } catch (er) {
    return null
  }
}

// Determine if version is less than all the versions possible in the range
exports.ltr = ltr
function ltr (version, range, options) {
  return outside(version, range, '<', options)
}

// Determine if version is greater than all the versions possible in the range.
exports.gtr = gtr
function gtr (version, range, options) {
  return outside(version, range, '>', options)
}

exports.outside = outside
function outside (version, range, hilo, options) {
  version = new SemVer(version, options)
  range = new Range(range, options)

  var gtfn, ltefn, ltfn, comp, ecomp
  switch (hilo) {
    case '>':
      gtfn = gt
      ltefn = lte
      ltfn = lt
      comp = '>'
      ecomp = '>='
      break
    case '<':
      gtfn = lt
      ltefn = gte
      ltfn = gt
      comp = '<'
      ecomp = '<='
      break
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"')
  }

  // If it satisifes the range it is not outside
  if (satisfies(version, range, options)) {
    return false
  }

  // From now on, variable terms are as if we're in "gtr" mode.
  // but note that everything is flipped for the "ltr" function.

  for (var i = 0; i < range.set.length; ++i) {
    var comparators = range.set[i]

    var high = null
    var low = null

    comparators.forEach(function (comparator) {
      if (comparator.semver === ANY) {
        comparator = new Comparator('>=0.0.0')
      }
      high = high || comparator
      low = low || comparator
      if (gtfn(comparator.semver, high.semver, options)) {
        high = comparator
      } else if (ltfn(comparator.semver, low.semver, options)) {
        low = comparator
      }
    })

    // If the edge version comparator has a operator then our version
    // isn't outside it
    if (high.operator === comp || high.operator === ecomp) {
      return false
    }

    // If the lowest version comparator has an operator and our version
    // is less than it then it isn't higher than the range
    if ((!low.operator || low.operator === comp) &&
        ltefn(version, low.semver)) {
      return false
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false
    }
  }
  return true
}

exports.prerelease = prerelease
function prerelease (version, options) {
  var parsed = parse(version, options)
  return (parsed && parsed.prerelease.length) ? parsed.prerelease : null
}

exports.intersects = intersects
function intersects (r1, r2, options) {
  r1 = new Range(r1, options)
  r2 = new Range(r2, options)
  return r1.intersects(r2)
}

exports.coerce = coerce
function coerce (version) {
  if (version instanceof SemVer) {
    return version
  }

  if (typeof version !== 'string') {
    return null
  }

  var match = version.match(re[COERCE])

  if (match == null) {
    return null
  }

  return parse(match[1] +
    '.' + (match[2] || '0') +
    '.' + (match[3] || '0'))
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

const os = __webpack_require__(18);
const hasFlag = __webpack_require__(19);

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
/* 18 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 19 */
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
/* 20 */
/***/ (function(module, exports) {

/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
const INDENT = '  ';

/**
 * a utility class to produce well-formed, indented XML
 * @param {ContentWriter} contentWriter the content writer that this utility wraps
 * @constructor
 */
function XMLWriter(contentWriter) {
    this.cw = contentWriter;
    this.stack = [];
}

function attrString(attrs) {
    if (!attrs) {
        return '';
    }
    const ret = [];
    Object.keys(attrs).forEach(k => {
        const v = attrs[k];
        ret.push(k + '="' + v + '"');
    });
    return ret.length === 0 ? '' : ' ' + ret.join(' ');
}

XMLWriter.prototype.indent = function(str) {
    return this.stack.map(() => INDENT).join('') + str;
};

/**
 * writes the opening XML tag with the supplied attributes
 * @param {String} name tag name
 * @param {Object} [attrs=null] attrs attributes for the tag
 */
XMLWriter.prototype.openTag = function(name, attrs) {
    const str = this.indent('<' + name + attrString(attrs) + '>');
    this.cw.println(str);
    this.stack.push(name);
};

/**
 * closes an open XML tag.
 * @param {String} name - tag name to close. This must match the writer's
 *  notion of the tag that is currently open.
 */
XMLWriter.prototype.closeTag = function(name) {
    if (this.stack.length === 0) {
        throw new Error('Attempt to close tag ' + name + ' when not opened');
    }
    const stashed = this.stack.pop();
    const str = '</' + name + '>';

    if (stashed !== name) {
        throw new Error(
            'Attempt to close tag ' +
                name +
                ' when ' +
                stashed +
                ' was the one open'
        );
    }
    this.cw.println(this.indent(str));
};
/**
 * writes a tag and its value opening and closing it at the same time
 * @param {String} name tag name
 * @param {Object} [attrs=null] attrs tag attributes
 * @param {String} [content=null] content optional tag content
 */
XMLWriter.prototype.inlineTag = function(name, attrs, content) {
    let str = '<' + name + attrString(attrs);
    if (content) {
        str += '>' + content + '</' + name + '>';
    } else {
        str += '/>';
    }
    str = this.indent(str);
    this.cw.println(str);
};
/**
 * closes all open tags and ends the document
 */
XMLWriter.prototype.closeAll = function() {
    this.stack
        .slice()
        .reverse()
        .forEach(name => {
            this.closeTag(name);
        });
};

module.exports = XMLWriter;


/***/ }),
/* 21 */
/***/ (function(module, exports) {

/*
 Copyright 2012-2015, Yahoo Inc.
 Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
module.exports = {
    getDefault() {
        return {
            statements: [50, 80],
            functions: [50, 80],
            branches: [50, 80],
            lines: [50, 80]
        };
    }
};


/***/ })
/******/ ]);
