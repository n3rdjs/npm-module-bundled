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


// walk the tree of deps starting from the top level list of bundled deps
// Any deps at the top level that are depended on by a bundled dep that
// does not have that dep in its own node_modules folder are considered
// bundled deps as well.  This list of names can be passed to npm-packlist
// as the "bundled" argument.  Additionally, packageJsonCache is shared so
// packlist doesn't have to re-read files already consumed in this pass

const fs = __webpack_require__(3)
const path = __webpack_require__(4)
const EE = __webpack_require__(5).EventEmitter

class BundleWalker extends EE {
  constructor (opt) {
    opt = opt || {}
    super(opt)
    this.path = path.resolve(opt.path || process.cwd())

    this.parent = opt.parent || null
    if (this.parent) {
      this.result = this.parent.result
      // only collect results in node_modules folders at the top level
      // since the node_modules in a bundled dep is included always
      if (!this.parent.parent) {
        const base = path.basename(this.path)
        const scope = path.basename(path.dirname(this.path))
        this.result.add(/^@/.test(scope) ? scope + '/' + base : base)
      }
      this.root = this.parent.root
      this.packageJsonCache = this.parent.packageJsonCache
    } else {
      this.result = new Set()
      this.root = this.path
      this.packageJsonCache = opt.packageJsonCache || new Map()
    }

    this.seen = new Set()
    this.didDone = false
    this.children = 0
    this.node_modules = []
    this.package = null
    this.bundle = null
  }

  addListener (ev, fn) {
    return this.on(ev, fn)
  }

  on (ev, fn) {
    const ret = super.on(ev, fn)
    if (ev === 'done' && this.didDone) {
      this.emit('done', this.result)
    }
    return ret
  }

  done () {
    if (!this.didDone) {
      this.didDone = true
      if (!this.parent) {
        const res = Array.from(this.result)
        this.result = res
        this.emit('done', res)
      } else {
        this.emit('done')
      }
    }
  }

  start () {
    const pj = path.resolve(this.path, 'package.json')
    if (this.packageJsonCache.has(pj))
      this.onPackage(this.packageJsonCache.get(pj))
    else
      this.readPackageJson(pj)
    return this
  }

  readPackageJson (pj) {
    fs.readFile(pj, (er, data) =>
      er ? this.done() : this.onPackageJson(pj, data))
  }

  onPackageJson (pj, data) {
    try {
      this.package = JSON.parse(data + '')
    } catch (er) {
      return this.done()
    }
    this.packageJsonCache.set(pj, this.package)
    this.onPackage(this.package)
  }

  onPackage (pkg) {
    // all deps are bundled if we got here as a child.
    // otherwise, only bundle bundledDeps
    // Get a unique-ified array with a short-lived Set
    const bdRaw = this.parent
      ? Object.keys(pkg.dependencies || {}).concat(
        Object.keys(pkg.optionalDependencies || {}))
      : pkg.bundleDependencies || pkg.bundledDependencies || []

    const bd = Array.from(new Set(
      Array.isArray(bdRaw) ? bdRaw : Object.keys(bdRaw)))

    if (!bd.length)
      return this.done()

    this.bundle = bd
    const nm = this.path + '/node_modules'
    this.readModules()
  }

  readModules () {
    readdirNodeModules(this.path + '/node_modules', (er, nm) =>
      er ? this.onReaddir([]) : this.onReaddir(nm))
  }

  onReaddir (nm) {
    // keep track of what we have, in case children need it
    this.node_modules = nm

    this.bundle.forEach(dep => this.childDep(dep))
    if (this.children === 0)
      this.done()
  }

  childDep (dep) {
    if (this.node_modules.indexOf(dep) !== -1 && !this.seen.has(dep)) {
      this.seen.add(dep)
      this.child(dep)
    } else if (this.parent) {
      this.parent.childDep(dep)
    }
  }

  child (dep) {
    const p = this.path + '/node_modules/' + dep
    this.children += 1
    const child = new BundleWalker({
      path: p,
      parent: this
    })
    child.on('done', _ => {
      if (--this.children === 0)
        this.done()
    })
    child.start()
  }
}

class BundleWalkerSync extends BundleWalker {
  constructor (opt) {
    super(opt)
  }

  start () {
    super.start()
    this.done()
    return this
  }

  readPackageJson (pj) {
    try {
      this.onPackageJson(pj, fs.readFileSync(pj))
    } catch (er) {}
    return this
  }

  readModules () {
    try {
      this.onReaddir(readdirNodeModulesSync(this.path + '/node_modules'))
    } catch (er) {
      this.onReaddir([])
    }
  }

  child (dep) {
    new BundleWalkerSync({
      path: this.path + '/node_modules/' + dep,
      parent: this
    }).start()
  }
}

const readdirNodeModules = (nm, cb) => {
  fs.readdir(nm, (er, set) => {
    if (er)
      cb(er)
    else {
      const scopes = set.filter(f => /^@/.test(f))
      if (!scopes.length)
        cb(null, set)
      else {
        const unscoped = set.filter(f => !/^@/.test(f))
        let count = scopes.length
        scopes.forEach(scope => {
          fs.readdir(nm + '/' + scope, (er, pkgs) => {
            if (er || !pkgs.length)
              unscoped.push(scope)
            else
              unscoped.push.apply(unscoped, pkgs.map(p => scope + '/' + p))
            if (--count === 0)
              cb(null, unscoped)
          })
        })
      }
    }
  })
}

const readdirNodeModulesSync = nm => {
  const set = fs.readdirSync(nm)
  const unscoped = set.filter(f => !/^@/.test(f))
  const scopes = set.filter(f => /^@/.test(f)).map(scope => {
    try {
      const pkgs = fs.readdirSync(nm + '/' + scope)
      return pkgs.length ? pkgs.map(p => scope + '/' + p) : [scope]
    } catch (er) {
      return [scope]
    }
  }).reduce((a, b) => a.concat(b), [])
  return unscoped.concat(scopes)
}

const walk = (options, callback) => {
  const p = new Promise((resolve, reject) => {
    new BundleWalker(options).on('done', resolve).on('error', reject).start()
  })
  return callback ? p.then(res => callback(null, res), callback) : p
}

const walkSync = options => {
  return new BundleWalkerSync(options).start().result
}

module.exports = walk
walk.sync = walkSync
walk.BundleWalker = BundleWalker
walk.BundleWalkerSync = BundleWalkerSync


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
