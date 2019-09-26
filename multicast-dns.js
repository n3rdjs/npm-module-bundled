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

var packet = __webpack_require__(3)
var dgram = __webpack_require__(12)
var thunky = __webpack_require__(13)
var events = __webpack_require__(14)
var os = __webpack_require__(10)

var noop = function () {}

module.exports = function (opts) {
  if (!opts) opts = {}

  var that = new events.EventEmitter()
  var port = typeof opts.port === 'number' ? opts.port : 5353
  var type = opts.type || 'udp4'
  var ip = opts.ip || opts.host || (type === 'udp4' ? '224.0.0.251' : null)
  var me = {address: ip, port: port}
  var memberships = {}
  var destroyed = false
  var interval = null

  if (type === 'udp6' && (!ip || !opts.interface)) {
    throw new Error('For IPv6 multicast you must specify `ip` and `interface`')
  }

  var socket = opts.socket || dgram.createSocket({
    type: type,
    reuseAddr: opts.reuseAddr !== false,
    toString: function () {
      return type
    }
  })

  socket.on('error', function (err) {
    if (err.code === 'EACCES' || err.code === 'EADDRINUSE') that.emit('error', err)
    else that.emit('warning', err)
  })

  socket.on('message', function (message, rinfo) {
    try {
      message = packet.decode(message)
    } catch (err) {
      that.emit('warning', err)
      return
    }

    that.emit('packet', message, rinfo)

    if (message.type === 'query') that.emit('query', message, rinfo)
    if (message.type === 'response') that.emit('response', message, rinfo)
  })

  socket.on('listening', function () {
    if (!port) port = me.port = socket.address().port
    if (opts.multicast !== false) {
      that.update()
      interval = setInterval(that.update, 5000)
      socket.setMulticastTTL(opts.ttl || 255)
      socket.setMulticastLoopback(opts.loopback !== false)
    }
  })

  var bind = thunky(function (cb) {
    if (!port || opts.bind === false) return cb(null)
    socket.once('error', cb)
    socket.bind(port, opts.interface, function () {
      socket.removeListener('error', cb)
      cb(null)
    })
  })

  bind(function (err) {
    if (err) return that.emit('error', err)
    that.emit('ready')
  })

  that.send = function (value, rinfo, cb) {
    if (typeof rinfo === 'function') return that.send(value, null, rinfo)
    if (!cb) cb = noop
    if (!rinfo) rinfo = me
    else if (!rinfo.host && !rinfo.address) rinfo.address = me.address

    bind(onbind)

    function onbind (err) {
      if (destroyed) return cb()
      if (err) return cb(err)
      var message = packet.encode(value)
      socket.send(message, 0, message.length, rinfo.port, rinfo.address || rinfo.host, cb)
    }
  }

  that.response =
  that.respond = function (res, rinfo, cb) {
    if (Array.isArray(res)) res = {answers: res}

    res.type = 'response'
    res.flags = (res.flags || 0) | packet.AUTHORITATIVE_ANSWER
    that.send(res, rinfo, cb)
  }

  that.query = function (q, type, rinfo, cb) {
    if (typeof type === 'function') return that.query(q, null, null, type)
    if (typeof type === 'object' && type && type.port) return that.query(q, null, type, rinfo)
    if (typeof rinfo === 'function') return that.query(q, type, null, rinfo)
    if (!cb) cb = noop

    if (typeof q === 'string') q = [{name: q, type: type || 'ANY'}]
    if (Array.isArray(q)) q = {type: 'query', questions: q}

    q.type = 'query'
    that.send(q, rinfo, cb)
  }

  that.destroy = function (cb) {
    if (!cb) cb = noop
    if (destroyed) return process.nextTick(cb)
    destroyed = true
    clearInterval(interval)
    socket.once('close', cb)
    socket.close()
  }

  that.update = function () {
    var ifaces = opts.interface ? [].concat(opts.interface) : allInterfaces()
    var updated = false

    for (var i = 0; i < ifaces.length; i++) {
      var addr = ifaces[i]

      if (memberships[addr]) continue
      memberships[addr] = true
      updated = true

      try {
        socket.addMembership(ip, addr)
      } catch (err) {
        that.emit('warning', err)
      }
    }

    if (!updated || !socket.setMulticastInterface) return
    socket.setMulticastInterface(opts.interface || defaultInterface())
  }

  return that
}

function defaultInterface () {
  var networks = os.networkInterfaces()
  var names = Object.keys(networks)

  for (var i = 0; i < names.length; i++) {
    var net = networks[names[i]]
    for (var j = 0; j < net.length; j++) {
      var iface = net[j]
      if (iface.family === 'IPv4' && !iface.internal) return '0.0.0.0'
    }
  }

  return '127.0.0.1'
}

function allInterfaces () {
  var networks = os.networkInterfaces()
  var names = Object.keys(networks)
  var res = []

  for (var i = 0; i < names.length; i++) {
    var net = networks[names[i]]
    for (var j = 0; j < net.length; j++) {
      var iface = net[j]
      if (iface.family === 'IPv4') {
        res.push(iface.address)
        // could only addMembership once per interface (https://nodejs.org/api/dgram.html#dgram_socket_addmembership_multicastaddress_multicastinterface)
        break
      }
    }
  }

  return res
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const types = __webpack_require__(4)
const rcodes = __webpack_require__(5)
const opcodes = __webpack_require__(6)
const classes = __webpack_require__(7)
const ip = __webpack_require__(8)
const Buffer = __webpack_require__(11).Buffer

const QUERY_FLAG = 0
const RESPONSE_FLAG = 1 << 15
const FLUSH_MASK = 1 << 15
const NOT_FLUSH_MASK = ~FLUSH_MASK
const QU_MASK = 1 << 15
const NOT_QU_MASK = ~QU_MASK

const name = exports.txt = exports.name = {}

name.encode = function (str, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(name.encodingLength(str))
  if (!offset) offset = 0
  const oldOffset = offset

  // strip leading and trailing .
  const n = str.replace(/^\.|\.$/gm, '')
  if (n.length) {
    const list = n.split('.')

    for (let i = 0; i < list.length; i++) {
      const len = buf.write(list[i], offset + 1)
      buf[offset] = len
      offset += len + 1
    }
  }

  buf[offset++] = 0

  name.encode.bytes = offset - oldOffset
  return buf
}

name.encode.bytes = 0

name.decode = function (buf, offset) {
  if (!offset) offset = 0

  const list = []
  const oldOffset = offset
  let len = buf[offset++]

  if (len === 0) {
    name.decode.bytes = 1
    return '.'
  }
  if (len >= 0xc0) {
    const res = name.decode(buf, buf.readUInt16BE(offset - 1) - 0xc000)
    name.decode.bytes = 2
    return res
  }

  while (len) {
    if (len >= 0xc0) {
      list.push(name.decode(buf, buf.readUInt16BE(offset - 1) - 0xc000))
      offset++
      break
    }

    list.push(buf.toString('utf-8', offset, offset + len))
    offset += len
    len = buf[offset++]
  }

  name.decode.bytes = offset - oldOffset
  return list.join('.')
}

name.decode.bytes = 0

name.encodingLength = function (n) {
  if (n === '.') return 1
  return Buffer.byteLength(n) + 2
}

const string = {}

string.encode = function (s, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(string.encodingLength(s))
  if (!offset) offset = 0

  const len = buf.write(s, offset + 1)
  buf[offset] = len
  string.encode.bytes = len + 1
  return buf
}

string.encode.bytes = 0

string.decode = function (buf, offset) {
  if (!offset) offset = 0

  const len = buf[offset]
  const s = buf.toString('utf-8', offset + 1, offset + 1 + len)
  string.decode.bytes = len + 1
  return s
}

string.decode.bytes = 0

string.encodingLength = function (s) {
  return Buffer.byteLength(s) + 1
}

const header = {}

header.encode = function (h, buf, offset) {
  if (!buf) buf = header.encodingLength(h)
  if (!offset) offset = 0

  const flags = (h.flags || 0) & 32767
  const type = h.type === 'response' ? RESPONSE_FLAG : QUERY_FLAG

  buf.writeUInt16BE(h.id || 0, offset)
  buf.writeUInt16BE(flags | type, offset + 2)
  buf.writeUInt16BE(h.questions.length, offset + 4)
  buf.writeUInt16BE(h.answers.length, offset + 6)
  buf.writeUInt16BE(h.authorities.length, offset + 8)
  buf.writeUInt16BE(h.additionals.length, offset + 10)

  return buf
}

header.encode.bytes = 12

header.decode = function (buf, offset) {
  if (!offset) offset = 0
  if (buf.length < 12) throw new Error('Header must be 12 bytes')
  const flags = buf.readUInt16BE(offset + 2)

  return {
    id: buf.readUInt16BE(offset),
    type: flags & RESPONSE_FLAG ? 'response' : 'query',
    flags: flags & 32767,
    flag_qr: ((flags >> 15) & 0x1) === 1,
    opcode: opcodes.toString((flags >> 11) & 0xf),
    flag_aa: ((flags >> 10) & 0x1) === 1,
    flag_tc: ((flags >> 9) & 0x1) === 1,
    flag_rd: ((flags >> 8) & 0x1) === 1,
    flag_ra: ((flags >> 7) & 0x1) === 1,
    flag_z: ((flags >> 6) & 0x1) === 1,
    flag_ad: ((flags >> 5) & 0x1) === 1,
    flag_cd: ((flags >> 4) & 0x1) === 1,
    rcode: rcodes.toString(flags & 0xf),
    questions: new Array(buf.readUInt16BE(offset + 4)),
    answers: new Array(buf.readUInt16BE(offset + 6)),
    authorities: new Array(buf.readUInt16BE(offset + 8)),
    additionals: new Array(buf.readUInt16BE(offset + 10))
  }
}

header.decode.bytes = 12

header.encodingLength = function () {
  return 12
}

const runknown = exports.unknown = {}

runknown.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(runknown.encodingLength(data))
  if (!offset) offset = 0

  buf.writeUInt16BE(data.length, offset)
  data.copy(buf, offset + 2)

  runknown.encode.bytes = data.length + 2
  return buf
}

runknown.encode.bytes = 0

runknown.decode = function (buf, offset) {
  if (!offset) offset = 0

  const len = buf.readUInt16BE(offset)
  const data = buf.slice(offset + 2, offset + 2 + len)
  runknown.decode.bytes = len + 2
  return data
}

runknown.decode.bytes = 0

runknown.encodingLength = function (data) {
  return data.length + 2
}

const rns = exports.ns = {}

rns.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(rns.encodingLength(data))
  if (!offset) offset = 0

  name.encode(data, buf, offset + 2)
  buf.writeUInt16BE(name.encode.bytes, offset)
  rns.encode.bytes = name.encode.bytes + 2
  return buf
}

rns.encode.bytes = 0

rns.decode = function (buf, offset) {
  if (!offset) offset = 0

  const len = buf.readUInt16BE(offset)
  const dd = name.decode(buf, offset + 2)

  rns.decode.bytes = len + 2
  return dd
}

rns.decode.bytes = 0

rns.encodingLength = function (data) {
  return name.encodingLength(data) + 2
}

const rsoa = exports.soa = {}

rsoa.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(rsoa.encodingLength(data))
  if (!offset) offset = 0

  const oldOffset = offset
  offset += 2
  name.encode(data.mname, buf, offset)
  offset += name.encode.bytes
  name.encode(data.rname, buf, offset)
  offset += name.encode.bytes
  buf.writeUInt32BE(data.serial || 0, offset)
  offset += 4
  buf.writeUInt32BE(data.refresh || 0, offset)
  offset += 4
  buf.writeUInt32BE(data.retry || 0, offset)
  offset += 4
  buf.writeUInt32BE(data.expire || 0, offset)
  offset += 4
  buf.writeUInt32BE(data.minimum || 0, offset)
  offset += 4

  buf.writeUInt16BE(offset - oldOffset - 2, oldOffset)
  rsoa.encode.bytes = offset - oldOffset
  return buf
}

rsoa.encode.bytes = 0

rsoa.decode = function (buf, offset) {
  if (!offset) offset = 0

  const oldOffset = offset

  const data = {}
  offset += 2
  data.mname = name.decode(buf, offset)
  offset += name.decode.bytes
  data.rname = name.decode(buf, offset)
  offset += name.decode.bytes
  data.serial = buf.readUInt32BE(offset)
  offset += 4
  data.refresh = buf.readUInt32BE(offset)
  offset += 4
  data.retry = buf.readUInt32BE(offset)
  offset += 4
  data.expire = buf.readUInt32BE(offset)
  offset += 4
  data.minimum = buf.readUInt32BE(offset)
  offset += 4

  rsoa.decode.bytes = offset - oldOffset
  return data
}

rsoa.decode.bytes = 0

rsoa.encodingLength = function (data) {
  return 22 + name.encodingLength(data.mname) + name.encodingLength(data.rname)
}

const rtxt = exports.txt = {}

rtxt.encode = function (data, buf, offset) {
  if (!Array.isArray(data)) data = [data]
  for (let i = 0; i < data.length; i++) {
    if (typeof data[i] === 'string') {
      data[i] = Buffer.from(data[i])
    }
    if (!Buffer.isBuffer(data[i])) {
      throw new Error('Must be a Buffer')
    }
  }

  if (!buf) buf = Buffer.allocUnsafe(rtxt.encodingLength(data))
  if (!offset) offset = 0

  const oldOffset = offset
  offset += 2

  data.forEach(function (d) {
    buf[offset++] = d.length
    d.copy(buf, offset, 0, d.length)
    offset += d.length
  })

  buf.writeUInt16BE(offset - oldOffset - 2, oldOffset)
  rtxt.encode.bytes = offset - oldOffset
  return buf
}

rtxt.encode.bytes = 0

rtxt.decode = function (buf, offset) {
  if (!offset) offset = 0
  const oldOffset = offset
  let remaining = buf.readUInt16BE(offset)
  offset += 2

  let data = []
  while (remaining > 0) {
    const len = buf[offset++]
    --remaining
    if (remaining < len) {
      throw new Error('Buffer overflow')
    }
    data.push(buf.slice(offset, offset + len))
    offset += len
    remaining -= len
  }

  rtxt.decode.bytes = offset - oldOffset
  return data
}

rtxt.decode.bytes = 0

rtxt.encodingLength = function (data) {
  if (!Array.isArray(data)) data = [data]
  let length = 2
  data.forEach(function (buf) {
    if (typeof buf === 'string') {
      length += Buffer.byteLength(buf) + 1
    } else {
      length += buf.length + 1
    }
  })
  return length
}

const rnull = exports.null = {}

rnull.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(rnull.encodingLength(data))
  if (!offset) offset = 0

  if (typeof data === 'string') data = Buffer.from(data)
  if (!data) data = Buffer.allocUnsafe(0)

  const oldOffset = offset
  offset += 2

  const len = data.length
  data.copy(buf, offset, 0, len)
  offset += len

  buf.writeUInt16BE(offset - oldOffset - 2, oldOffset)
  rnull.encode.bytes = offset - oldOffset
  return buf
}

rnull.encode.bytes = 0

rnull.decode = function (buf, offset) {
  if (!offset) offset = 0
  const oldOffset = offset
  const len = buf.readUInt16BE(offset)

  offset += 2

  const data = buf.slice(offset, offset + len)
  offset += len

  rnull.decode.bytes = offset - oldOffset
  return data
}

rnull.decode.bytes = 0

rnull.encodingLength = function (data) {
  if (!data) return 2
  return (Buffer.isBuffer(data) ? data.length : Buffer.byteLength(data)) + 2
}

const rhinfo = exports.hinfo = {}

rhinfo.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(rhinfo.encodingLength(data))
  if (!offset) offset = 0

  const oldOffset = offset
  offset += 2
  string.encode(data.cpu, buf, offset)
  offset += string.encode.bytes
  string.encode(data.os, buf, offset)
  offset += string.encode.bytes
  buf.writeUInt16BE(offset - oldOffset - 2, oldOffset)
  rhinfo.encode.bytes = offset - oldOffset
  return buf
}

rhinfo.encode.bytes = 0

rhinfo.decode = function (buf, offset) {
  if (!offset) offset = 0

  const oldOffset = offset

  const data = {}
  offset += 2
  data.cpu = string.decode(buf, offset)
  offset += string.decode.bytes
  data.os = string.decode(buf, offset)
  offset += string.decode.bytes
  rhinfo.decode.bytes = offset - oldOffset
  return data
}

rhinfo.decode.bytes = 0

rhinfo.encodingLength = function (data) {
  return string.encodingLength(data.cpu) + string.encodingLength(data.os) + 2
}

const rptr = exports.ptr = {}
const rcname = exports.cname = rptr
const rdname = exports.dname = rptr

rptr.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(rptr.encodingLength(data))
  if (!offset) offset = 0

  name.encode(data, buf, offset + 2)
  buf.writeUInt16BE(name.encode.bytes, offset)
  rptr.encode.bytes = name.encode.bytes + 2
  return buf
}

rptr.encode.bytes = 0

rptr.decode = function (buf, offset) {
  if (!offset) offset = 0

  const data = name.decode(buf, offset + 2)
  rptr.decode.bytes = name.decode.bytes + 2
  return data
}

rptr.decode.bytes = 0

rptr.encodingLength = function (data) {
  return name.encodingLength(data) + 2
}

const rsrv = exports.srv = {}

rsrv.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(rsrv.encodingLength(data))
  if (!offset) offset = 0

  buf.writeUInt16BE(data.priority || 0, offset + 2)
  buf.writeUInt16BE(data.weight || 0, offset + 4)
  buf.writeUInt16BE(data.port || 0, offset + 6)
  name.encode(data.target, buf, offset + 8)

  const len = name.encode.bytes + 6
  buf.writeUInt16BE(len, offset)

  rsrv.encode.bytes = len + 2
  return buf
}

rsrv.encode.bytes = 0

rsrv.decode = function (buf, offset) {
  if (!offset) offset = 0

  const len = buf.readUInt16BE(offset)

  const data = {}
  data.priority = buf.readUInt16BE(offset + 2)
  data.weight = buf.readUInt16BE(offset + 4)
  data.port = buf.readUInt16BE(offset + 6)
  data.target = name.decode(buf, offset + 8)

  rsrv.decode.bytes = len + 2
  return data
}

rsrv.decode.bytes = 0

rsrv.encodingLength = function (data) {
  return 8 + name.encodingLength(data.target)
}

const rcaa = exports.caa = {}

rcaa.ISSUER_CRITICAL = 1 << 7

rcaa.encode = function (data, buf, offset) {
  const len = rcaa.encodingLength(data)

  if (!buf) buf = Buffer.allocUnsafe(rcaa.encodingLength(data))
  if (!offset) offset = 0

  if (data.issuerCritical) {
    data.flags = rcaa.ISSUER_CRITICAL
  }

  buf.writeUInt16BE(len - 2, offset)
  offset += 2
  buf.writeUInt8(data.flags || 0, offset)
  offset += 1
  string.encode(data.tag, buf, offset)
  offset += string.encode.bytes
  buf.write(data.value, offset)
  offset += Buffer.byteLength(data.value)

  rcaa.encode.bytes = len
  return buf
}

rcaa.encode.bytes = 0

rcaa.decode = function (buf, offset) {
  if (!offset) offset = 0

  const len = buf.readUInt16BE(offset)
  offset += 2

  const oldOffset = offset
  const data = {}
  data.flags = buf.readUInt8(offset)
  offset += 1
  data.tag = string.decode(buf, offset)
  offset += string.decode.bytes
  data.value = buf.toString('utf-8', offset, oldOffset + len)

  data.issuerCritical = !!(data.flags & rcaa.ISSUER_CRITICAL)

  rcaa.decode.bytes = len + 2

  return data
}

rcaa.decode.bytes = 0

rcaa.encodingLength = function (data) {
  return string.encodingLength(data.tag) + string.encodingLength(data.value) + 2
}

const rmx = exports.mx = {}

rmx.encode = function (data, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(rmx.encodingLength(data))
  if (!offset) offset = 0

  const oldOffset = offset
  offset += 2
  buf.writeUInt16BE(data.preference || 0, offset)
  offset += 2
  name.encode(data.exchange, buf, offset)
  offset += name.encode.bytes

  buf.writeUInt16BE(offset - oldOffset - 2, oldOffset)
  rmx.encode.bytes = offset - oldOffset
  return buf
}

rmx.encode.bytes = 0

rmx.decode = function (buf, offset) {
  if (!offset) offset = 0

  const oldOffset = offset

  const data = {}
  offset += 2
  data.preference = buf.readUInt16BE(offset)
  offset += 2
  data.exchange = name.decode(buf, offset)
  offset += name.decode.bytes

  rmx.decode.bytes = offset - oldOffset
  return data
}

rmx.encodingLength = function (data) {
  return 4 + name.encodingLength(data.exchange)
}

const ra = exports.a = {}

ra.encode = function (host, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(ra.encodingLength(host))
  if (!offset) offset = 0

  buf.writeUInt16BE(4, offset)
  offset += 2
  ip.toBuffer(host, buf, offset)
  ra.encode.bytes = 6
  return buf
}

ra.encode.bytes = 0

ra.decode = function (buf, offset) {
  if (!offset) offset = 0

  offset += 2
  const host = ip.toString(buf, offset, 4)
  ra.decode.bytes = 6
  return host
}

ra.decode.bytes = 0

ra.encodingLength = function () {
  return 6
}

const raaaa = exports.aaaa = {}

raaaa.encode = function (host, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(raaaa.encodingLength(host))
  if (!offset) offset = 0

  buf.writeUInt16BE(16, offset)
  offset += 2
  ip.toBuffer(host, buf, offset)
  raaaa.encode.bytes = 18
  return buf
}

raaaa.encode.bytes = 0

raaaa.decode = function (buf, offset) {
  if (!offset) offset = 0

  offset += 2
  const host = ip.toString(buf, offset, 16)
  raaaa.decode.bytes = 18
  return host
}

raaaa.decode.bytes = 0

raaaa.encodingLength = function () {
  return 18
}

const roption = exports.option = {}

roption.encode = function (option, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(roption.encodingLength(option))
  if (!offset) offset = 0
  const oldOffset = offset

  buf.writeUInt16BE(option.code, offset)
  offset += 2
  buf.writeUInt16BE(option.data.length, offset)
  offset += 2
  option.data.copy(buf, offset)
  offset += option.data.length

  roption.encode.bytes = offset - oldOffset
  return buf
}

roption.encode.bytes = 0

roption.decode = function (buf, offset) {
  if (!offset) offset = 0
  const option = {}

  option.code = buf.readUInt16BE(offset)
  const len = buf.readUInt16BE(offset + 2)
  option.data = buf.slice(offset + 4, offset + 4 + len)

  roption.decode.bytes = len + 4
  return option
}

roption.decode.bytes = 0

roption.encodingLength = function (option) {
  return option.data.length + 4
}

const ropt = exports.opt = {}

ropt.encode = function (options, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(ropt.encodingLength(options))
  if (!offset) offset = 0
  const oldOffset = offset

  const rdlen = encodingLengthList(options, roption)
  buf.writeUInt16BE(rdlen, offset)
  offset = encodeList(options, roption, buf, offset + 2)

  ropt.encode.bytes = offset - oldOffset
  return buf
}

ropt.encode.bytes = 0

ropt.decode = function (buf, offset) {
  if (!offset) offset = 0
  const oldOffset = offset

  const options = []
  let rdlen = buf.readUInt16BE(offset)
  offset += 2
  let o = 0
  while (rdlen > 0) {
    options[o++] = roption.decode(buf, offset)
    offset += roption.decode.bytes
    rdlen -= roption.decode.bytes
  }
  ropt.decode.bytes = offset - oldOffset
  return options
}

ropt.decode.bytes = 0

ropt.encodingLength = function (options) {
  return 2 + encodingLengthList(options || [], roption)
}

const renc = exports.record = function (type) {
  switch (type.toUpperCase()) {
    case 'A': return ra
    case 'PTR': return rptr
    case 'CNAME': return rcname
    case 'DNAME': return rdname
    case 'TXT': return rtxt
    case 'NULL': return rnull
    case 'AAAA': return raaaa
    case 'SRV': return rsrv
    case 'HINFO': return rhinfo
    case 'CAA': return rcaa
    case 'NS': return rns
    case 'SOA': return rsoa
    case 'MX': return rmx
    case 'OPT': return ropt
  }
  return runknown
}

const answer = exports.answer = {}

answer.encode = function (a, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(answer.encodingLength(a))
  if (!offset) offset = 0

  const oldOffset = offset

  name.encode(a.name, buf, offset)
  offset += name.encode.bytes

  buf.writeUInt16BE(types.toType(a.type), offset)

  if (a.type.toUpperCase() === 'OPT') {
    if (a.name !== '.') {
      throw new Error('OPT name must be root.')
    }
    buf.writeUInt16BE(a.updPayloadSize || 4096, offset + 2)
    buf.writeUInt8(a.extendedRcode || 0, offset + 4)
    buf.writeUInt8(a.ednsVersion || 0, offset + 5)
    buf.writeUInt16BE(a.flags || 0, offset + 6)

    offset += 8
    ropt.encode(a.options || [], buf, offset)
    offset += ropt.encode.bytes
  } else {
    let klass = classes.toClass(a.class === undefined ? 'IN' : a.class)
    if (a.flush) klass |= FLUSH_MASK // the 1st bit of the class is the flush bit
    buf.writeUInt16BE(klass, offset + 2)
    buf.writeUInt32BE(a.ttl || 0, offset + 4)

    offset += 8
    const enc = renc(a.type)
    enc.encode(a.data, buf, offset)
    offset += enc.encode.bytes
  }

  answer.encode.bytes = offset - oldOffset
  return buf
}

answer.encode.bytes = 0

answer.decode = function (buf, offset) {
  if (!offset) offset = 0

  const a = {}
  const oldOffset = offset

  a.name = name.decode(buf, offset)
  offset += name.decode.bytes
  a.type = types.toString(buf.readUInt16BE(offset))
  if (a.type === 'OPT') {
    a.udpPayloadSize = buf.readUInt16BE(offset + 2)
    a.extendedRcode = buf.readUInt8(offset + 4)
    a.ednsVersion = buf.readUInt8(offset + 5)
    a.flags = buf.readUInt16BE(offset + 6)
    a.flag_do = ((a.flags >> 15) & 0x1) === 1
    a.options = ropt.decode(buf, offset + 8)
    offset += 8 + ropt.decode.bytes
  } else {
    const klass = buf.readUInt16BE(offset + 2)
    a.ttl = buf.readUInt32BE(offset + 4)

    a.class = classes.toString(klass & NOT_FLUSH_MASK)
    a.flush = !!(klass & FLUSH_MASK)

    const enc = renc(a.type)
    a.data = enc.decode(buf, offset + 8)
    offset += 8 + enc.decode.bytes
  }

  answer.decode.bytes = offset - oldOffset
  return a
}

answer.decode.bytes = 0

answer.encodingLength = function (a) {
  return name.encodingLength(a.name) + 8 + renc(a.type).encodingLength(a.data || a.options)
}

const question = exports.question = {}

question.encode = function (q, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(question.encodingLength(q))
  if (!offset) offset = 0

  const oldOffset = offset

  name.encode(q.name, buf, offset)
  offset += name.encode.bytes

  buf.writeUInt16BE(types.toType(q.type), offset)
  offset += 2

  buf.writeUInt16BE(classes.toClass(q.class === undefined ? 'IN' : q.class), offset)
  offset += 2

  question.encode.bytes = offset - oldOffset
  return q
}

question.encode.bytes = 0

question.decode = function (buf, offset) {
  if (!offset) offset = 0

  const oldOffset = offset
  const q = {}

  q.name = name.decode(buf, offset)
  offset += name.decode.bytes

  q.type = types.toString(buf.readUInt16BE(offset))
  offset += 2

  q.class = classes.toString(buf.readUInt16BE(offset))
  offset += 2

  const qu = !!(q.class & QU_MASK)
  if (qu) q.class &= NOT_QU_MASK

  question.decode.bytes = offset - oldOffset
  return q
}

question.decode.bytes = 0

question.encodingLength = function (q) {
  return name.encodingLength(q.name) + 4
}

exports.AUTHORITATIVE_ANSWER = 1 << 10
exports.TRUNCATED_RESPONSE = 1 << 9
exports.RECURSION_DESIRED = 1 << 8
exports.RECURSION_AVAILABLE = 1 << 7
exports.AUTHENTIC_DATA = 1 << 5
exports.CHECKING_DISABLED = 1 << 4
exports.DNSSEC_OK = 1 << 15

exports.encode = function (result, buf, offset) {
  if (!buf) buf = Buffer.allocUnsafe(exports.encodingLength(result))
  if (!offset) offset = 0

  const oldOffset = offset

  if (!result.questions) result.questions = []
  if (!result.answers) result.answers = []
  if (!result.authorities) result.authorities = []
  if (!result.additionals) result.additionals = []

  header.encode(result, buf, offset)
  offset += header.encode.bytes

  offset = encodeList(result.questions, question, buf, offset)
  offset = encodeList(result.answers, answer, buf, offset)
  offset = encodeList(result.authorities, answer, buf, offset)
  offset = encodeList(result.additionals, answer, buf, offset)

  exports.encode.bytes = offset - oldOffset

  return buf
}

exports.encode.bytes = 0

exports.decode = function (buf, offset) {
  if (!offset) offset = 0

  const oldOffset = offset
  const result = header.decode(buf, offset)
  offset += header.decode.bytes

  offset = decodeList(result.questions, question, buf, offset)
  offset = decodeList(result.answers, answer, buf, offset)
  offset = decodeList(result.authorities, answer, buf, offset)
  offset = decodeList(result.additionals, answer, buf, offset)

  exports.decode.bytes = offset - oldOffset

  return result
}

exports.decode.bytes = 0

exports.encodingLength = function (result) {
  return header.encodingLength(result) +
    encodingLengthList(result.questions || [], question) +
    encodingLengthList(result.answers || [], answer) +
    encodingLengthList(result.authorities || [], answer) +
    encodingLengthList(result.additionals || [], answer)
}

exports.streamEncode = function (result) {
  const buf = exports.encode(result)
  const sbuf = Buffer.allocUnsafe(2)
  sbuf.writeUInt16BE(buf.byteLength)
  const combine = Buffer.concat([sbuf, buf])
  exports.streamEncode.bytes = combine.byteLength
  return combine
}

exports.streamEncode.bytes = 0

exports.streamDecode = function (sbuf) {
  const len = sbuf.readUInt16BE(0)
  if (sbuf.byteLength < len + 2) {
    // not enough data
    return null
  }
  const result = exports.decode(sbuf.slice(2))
  exports.streamDecode.bytes = exports.decode.bytes
  return result
}

exports.streamDecode.bytes = 0

function encodingLengthList (list, enc) {
  let len = 0
  for (let i = 0; i < list.length; i++) len += enc.encodingLength(list[i])
  return len
}

function encodeList (list, enc, buf, offset) {
  for (let i = 0; i < list.length; i++) {
    enc.encode(list[i], buf, offset)
    offset += enc.encode.bytes
  }
  return offset
}

function decodeList (list, enc, buf, offset) {
  for (let i = 0; i < list.length; i++) {
    list[i] = enc.decode(buf, offset)
    offset += enc.decode.bytes
  }
  return offset
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.toString = function (type) {
  switch (type) {
    case 1: return 'A'
    case 10: return 'NULL'
    case 28: return 'AAAA'
    case 18: return 'AFSDB'
    case 42: return 'APL'
    case 257: return 'CAA'
    case 60: return 'CDNSKEY'
    case 59: return 'CDS'
    case 37: return 'CERT'
    case 5: return 'CNAME'
    case 49: return 'DHCID'
    case 32769: return 'DLV'
    case 39: return 'DNAME'
    case 48: return 'DNSKEY'
    case 43: return 'DS'
    case 55: return 'HIP'
    case 13: return 'HINFO'
    case 45: return 'IPSECKEY'
    case 25: return 'KEY'
    case 36: return 'KX'
    case 29: return 'LOC'
    case 15: return 'MX'
    case 35: return 'NAPTR'
    case 2: return 'NS'
    case 47: return 'NSEC'
    case 50: return 'NSEC3'
    case 51: return 'NSEC3PARAM'
    case 12: return 'PTR'
    case 46: return 'RRSIG'
    case 17: return 'RP'
    case 24: return 'SIG'
    case 6: return 'SOA'
    case 99: return 'SPF'
    case 33: return 'SRV'
    case 44: return 'SSHFP'
    case 32768: return 'TA'
    case 249: return 'TKEY'
    case 52: return 'TLSA'
    case 250: return 'TSIG'
    case 16: return 'TXT'
    case 252: return 'AXFR'
    case 251: return 'IXFR'
    case 41: return 'OPT'
    case 255: return 'ANY'
  }
  return 'UNKNOWN_' + type
}

exports.toType = function (name) {
  switch (name.toUpperCase()) {
    case 'A': return 1
    case 'NULL': return 10
    case 'AAAA': return 28
    case 'AFSDB': return 18
    case 'APL': return 42
    case 'CAA': return 257
    case 'CDNSKEY': return 60
    case 'CDS': return 59
    case 'CERT': return 37
    case 'CNAME': return 5
    case 'DHCID': return 49
    case 'DLV': return 32769
    case 'DNAME': return 39
    case 'DNSKEY': return 48
    case 'DS': return 43
    case 'HIP': return 55
    case 'HINFO': return 13
    case 'IPSECKEY': return 45
    case 'KEY': return 25
    case 'KX': return 36
    case 'LOC': return 29
    case 'MX': return 15
    case 'NAPTR': return 35
    case 'NS': return 2
    case 'NSEC': return 47
    case 'NSEC3': return 50
    case 'NSEC3PARAM': return 51
    case 'PTR': return 12
    case 'RRSIG': return 46
    case 'RP': return 17
    case 'SIG': return 24
    case 'SOA': return 6
    case 'SPF': return 99
    case 'SRV': return 33
    case 'SSHFP': return 44
    case 'TA': return 32768
    case 'TKEY': return 249
    case 'TLSA': return 52
    case 'TSIG': return 250
    case 'TXT': return 16
    case 'AXFR': return 252
    case 'IXFR': return 251
    case 'OPT': return 41
    case 'ANY': return 255
    case '*': return 255
  }
  return 0
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Traditional DNS header RCODEs (4-bits) defined by IANA in
 * https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml
 */

exports.toString = function (rcode) {
  switch (rcode) {
    case 0: return 'NOERROR'
    case 1: return 'FORMERR'
    case 2: return 'SERVFAIL'
    case 3: return 'NXDOMAIN'
    case 4: return 'NOTIMP'
    case 5: return 'REFUSED'
    case 6: return 'YXDOMAIN'
    case 7: return 'YXRRSET'
    case 8: return 'NXRRSET'
    case 9: return 'NOTAUTH'
    case 10: return 'NOTZONE'
    case 11: return 'RCODE_11'
    case 12: return 'RCODE_12'
    case 13: return 'RCODE_13'
    case 14: return 'RCODE_14'
    case 15: return 'RCODE_15'
  }
  return 'RCODE_' + rcode
}

exports.toRcode = function (code) {
  switch (code.toUpperCase()) {
    case 'NOERROR': return 0
    case 'FORMERR': return 1
    case 'SERVFAIL': return 2
    case 'NXDOMAIN': return 3
    case 'NOTIMP': return 4
    case 'REFUSED': return 5
    case 'YXDOMAIN': return 6
    case 'YXRRSET': return 7
    case 'NXRRSET': return 8
    case 'NOTAUTH': return 9
    case 'NOTZONE': return 10
    case 'RCODE_11': return 11
    case 'RCODE_12': return 12
    case 'RCODE_13': return 13
    case 'RCODE_14': return 14
    case 'RCODE_15': return 15
  }
  return 0
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * Traditional DNS header OPCODEs (4-bits) defined by IANA in
 * https://www.iana.org/assignments/dns-parameters/dns-parameters.xhtml#dns-parameters-5
 */

exports.toString = function (opcode) {
  switch (opcode) {
    case 0: return 'QUERY'
    case 1: return 'IQUERY'
    case 2: return 'STATUS'
    case 3: return 'OPCODE_3'
    case 4: return 'NOTIFY'
    case 5: return 'UPDATE'
    case 6: return 'OPCODE_6'
    case 7: return 'OPCODE_7'
    case 8: return 'OPCODE_8'
    case 9: return 'OPCODE_9'
    case 10: return 'OPCODE_10'
    case 11: return 'OPCODE_11'
    case 12: return 'OPCODE_12'
    case 13: return 'OPCODE_13'
    case 14: return 'OPCODE_14'
    case 15: return 'OPCODE_15'
  }
  return 'OPCODE_' + opcode
}

exports.toOpcode = function (code) {
  switch (code.toUpperCase()) {
    case 'QUERY': return 0
    case 'IQUERY': return 1
    case 'STATUS': return 2
    case 'OPCODE_3': return 3
    case 'NOTIFY': return 4
    case 'UPDATE': return 5
    case 'OPCODE_6': return 6
    case 'OPCODE_7': return 7
    case 'OPCODE_8': return 8
    case 'OPCODE_9': return 9
    case 'OPCODE_10': return 10
    case 'OPCODE_11': return 11
    case 'OPCODE_12': return 12
    case 'OPCODE_13': return 13
    case 'OPCODE_14': return 14
    case 'OPCODE_15': return 15
  }
  return 0
}


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.toString = function (klass) {
  switch (klass) {
    case 1: return 'IN'
    case 2: return 'CS'
    case 3: return 'CH'
    case 4: return 'HS'
    case 255: return 'ANY'
  }
  return 'UNKNOWN_' + klass
}

exports.toClass = function (name) {
  switch (name.toUpperCase()) {
    case 'IN': return 1
    case 'CS': return 2
    case 'CH': return 3
    case 'HS': return 4
    case 'ANY': return 255
  }
  return 0
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ip = exports;
var Buffer = __webpack_require__(9).Buffer;
var os = __webpack_require__(10);

ip.toBuffer = function(ip, buff, offset) {
  offset = ~~offset;

  var result;

  if (this.isV4Format(ip)) {
    result = buff || new Buffer(offset + 4);
    ip.split(/\./g).map(function(byte) {
      result[offset++] = parseInt(byte, 10) & 0xff;
    });
  } else if (this.isV6Format(ip)) {
    var sections = ip.split(':', 8);

    var i;
    for (i = 0; i < sections.length; i++) {
      var isv4 = this.isV4Format(sections[i]);
      var v4Buffer;

      if (isv4) {
        v4Buffer = this.toBuffer(sections[i]);
        sections[i] = v4Buffer.slice(0, 2).toString('hex');
      }

      if (v4Buffer && ++i < 8) {
        sections.splice(i, 0, v4Buffer.slice(2, 4).toString('hex'));
      }
    }

    if (sections[0] === '') {
      while (sections.length < 8) sections.unshift('0');
    } else if (sections[sections.length - 1] === '') {
      while (sections.length < 8) sections.push('0');
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ''; i++);
      var argv = [ i, 1 ];
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push('0');
      }
      sections.splice.apply(sections, argv);
    }

    result = buff || new Buffer(offset + 16);
    for (i = 0; i < sections.length; i++) {
      var word = parseInt(sections[i], 16);
      result[offset++] = (word >> 8) & 0xff;
      result[offset++] = word & 0xff;
    }
  }

  if (!result) {
    throw Error('Invalid ip address: ' + ip);
  }

  return result;
};

ip.toString = function(buff, offset, length) {
  offset = ~~offset;
  length = length || (buff.length - offset);

  var result = [];
  if (length === 4) {
    // IPv4
    for (var i = 0; i < length; i++) {
      result.push(buff[offset + i]);
    }
    result = result.join('.');
  } else if (length === 16) {
    // IPv6
    for (var i = 0; i < length; i += 2) {
      result.push(buff.readUInt16BE(offset + i).toString(16));
    }
    result = result.join(':');
    result = result.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
    result = result.replace(/:{3,4}/, '::');
  }

  return result;
};

var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
var ipv6Regex =
    /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;

ip.isV4Format = function(ip) {
  return ipv4Regex.test(ip);
};

ip.isV6Format = function(ip) {
  return ipv6Regex.test(ip);
};
function _normalizeFamily(family) {
  return family ? family.toLowerCase() : 'ipv4';
}

ip.fromPrefixLen = function(prefixlen, family) {
  if (prefixlen > 32) {
    family = 'ipv6';
  } else {
    family = _normalizeFamily(family);
  }

  var len = 4;
  if (family === 'ipv6') {
    len = 16;
  }
  var buff = new Buffer(len);

  for (var i = 0, n = buff.length; i < n; ++i) {
    var bits = 8;
    if (prefixlen < 8) {
      bits = prefixlen;
    }
    prefixlen -= bits;

    buff[i] = ~(0xff >> bits) & 0xff;
  }

  return ip.toString(buff);
};

ip.mask = function(addr, mask) {
  addr = ip.toBuffer(addr);
  mask = ip.toBuffer(mask);

  var result = new Buffer(Math.max(addr.length, mask.length));

  var i = 0;
  // Same protocol - do bitwise and
  if (addr.length === mask.length) {
    for (i = 0; i < addr.length; i++) {
      result[i] = addr[i] & mask[i];
    }
  } else if (mask.length === 4) {
    // IPv6 address and IPv4 mask
    // (Mask low bits)
    for (i = 0; i < mask.length; i++) {
      result[i] = addr[addr.length - 4  + i] & mask[i];
    }
  } else {
    // IPv6 mask and IPv4 addr
    for (var i = 0; i < result.length - 6; i++) {
      result[i] = 0;
    }

    // ::ffff:ipv4
    result[10] = 0xff;
    result[11] = 0xff;
    for (i = 0; i < addr.length; i++) {
      result[i + 12] = addr[i] & mask[i + 12];
    }
    i = i + 12;
  }
  for (; i < result.length; i++)
    result[i] = 0;

  return ip.toString(result);
};

ip.cidr = function(cidrString) {
  var cidrParts = cidrString.split('/');

  var addr = cidrParts[0];
  if (cidrParts.length !== 2)
    throw new Error('invalid CIDR subnet: ' + addr);

  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));

  return ip.mask(addr, mask);
};

ip.subnet = function(addr, mask) {
  var networkAddress = ip.toLong(ip.mask(addr, mask));

  // Calculate the mask's length.
  var maskBuffer = ip.toBuffer(mask);
  var maskLength = 0;

  for (var i = 0; i < maskBuffer.length; i++) {
    if (maskBuffer[i] === 0xff) {
      maskLength += 8;
    } else {
      var octet = maskBuffer[i] & 0xff;
      while (octet) {
        octet = (octet << 1) & 0xff;
        maskLength++;
      }
    }
  }

  var numberOfAddresses = Math.pow(2, 32 - maskLength);

  return {
    networkAddress: ip.fromLong(networkAddress),
    firstAddress: numberOfAddresses <= 2 ?
                    ip.fromLong(networkAddress) :
                    ip.fromLong(networkAddress + 1),
    lastAddress: numberOfAddresses <= 2 ?
                    ip.fromLong(networkAddress + numberOfAddresses - 1) :
                    ip.fromLong(networkAddress + numberOfAddresses - 2),
    broadcastAddress: ip.fromLong(networkAddress + numberOfAddresses - 1),
    subnetMask: mask,
    subnetMaskLength: maskLength,
    numHosts: numberOfAddresses <= 2 ?
                numberOfAddresses : numberOfAddresses - 2,
    length: numberOfAddresses,
    contains: function(other) {
      return networkAddress === ip.toLong(ip.mask(other, mask));
    }
  };
};

ip.cidrSubnet = function(cidrString) {
  var cidrParts = cidrString.split('/');

  var addr = cidrParts[0];
  if (cidrParts.length !== 2)
    throw new Error('invalid CIDR subnet: ' + addr);

  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));

  return ip.subnet(addr, mask);
};

ip.not = function(addr) {
  var buff = ip.toBuffer(addr);
  for (var i = 0; i < buff.length; i++) {
    buff[i] = 0xff ^ buff[i];
  }
  return ip.toString(buff);
};

ip.or = function(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // same protocol
  if (a.length === b.length) {
    for (var i = 0; i < a.length; ++i) {
      a[i] |= b[i];
    }
    return ip.toString(a);

  // mixed protocols
  } else {
    var buff = a;
    var other = b;
    if (b.length > a.length) {
      buff = b;
      other = a;
    }

    var offset = buff.length - other.length;
    for (var i = offset; i < buff.length; ++i) {
      buff[i] |= other[i - offset];
    }

    return ip.toString(buff);
  }
};

ip.isEqual = function(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // Same protocol
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Swap
  if (b.length === 4) {
    var t = b;
    b = a;
    a = t;
  }

  // a - IPv4, b - IPv6
  for (var i = 0; i < 10; i++) {
    if (b[i] !== 0) return false;
  }

  var word = b.readUInt16BE(10);
  if (word !== 0 && word !== 0xffff) return false;

  for (var i = 0; i < 4; i++) {
    if (a[i] !== b[i + 12]) return false;
  }

  return true;
};

ip.isPrivate = function(addr) {
  return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i
      .test(addr) ||
    /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
    /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i
      .test(addr) ||
    /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
    /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
    /^f[cd][0-9a-f]{2}:/i.test(addr) ||
    /^fe80:/i.test(addr) ||
    /^::1$/.test(addr) ||
    /^::$/.test(addr);
};

ip.isPublic = function(addr) {
  return !ip.isPrivate(addr);
};

ip.isLoopback = function(addr) {
  return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/
      .test(addr) ||
    /^fe80::1$/.test(addr) ||
    /^::1$/.test(addr) ||
    /^::$/.test(addr);
};

ip.loopback = function(family) {
  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  if (family !== 'ipv4' && family !== 'ipv6') {
    throw new Error('family must be ipv4 or ipv6');
  }

  return family === 'ipv4' ? '127.0.0.1' : 'fe80::1';
};

//
// ### function address (name, family)
// #### @name {string|'public'|'private'} **Optional** Name or security
//      of the network interface.
// #### @family {ipv4|ipv6} **Optional** IP family of the address (defaults
//      to ipv4).
//
// Returns the address for the network interface on the current system with
// the specified `name`:
//   * String: First `family` address of the interface.
//             If not found see `undefined`.
//   * 'public': the first public ip address of family.
//   * 'private': the first private ip address of family.
//   * undefined: First address with `ipv4` or loopback address `127.0.0.1`.
//
ip.address = function(name, family) {
  var interfaces = os.networkInterfaces();
  var all;

  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  //
  // If a specific network interface has been named,
  // return the address.
  //
  if (name && name !== 'private' && name !== 'public') {
    var res = interfaces[name].filter(function(details) {
      var itemFamily = details.family.toLowerCase();
      return itemFamily === family;
    });
    if (res.length === 0)
      return undefined;
    return res[0].address;
  }

  var all = Object.keys(interfaces).map(function (nic) {
    //
    // Note: name will only be `public` or `private`
    // when this is called.
    //
    var addresses = interfaces[nic].filter(function (details) {
      details.family = details.family.toLowerCase();
      if (details.family !== family || ip.isLoopback(details.address)) {
        return false;
      } else if (!name) {
        return true;
      }

      return name === 'public' ? ip.isPrivate(details.address) :
          ip.isPublic(details.address);
    });

    return addresses.length ? addresses[0].address : undefined;
  }).filter(Boolean);

  return !all.length ? ip.loopback(family) : all[0];
};

ip.toLong = function(ip) {
  var ipl = 0;
  ip.split('.').forEach(function(octet) {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return(ipl >>> 0);
};

ip.fromLong = function(ipl) {
  return ((ipl >>> 24) + '.' +
      (ipl >> 16 & 255) + '.' +
      (ipl >> 8 & 255) + '.' +
      (ipl & 255) );
};


/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(9)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("dgram");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var nextTick = nextTickArgs
process.nextTick(upgrade, 42) // pass 42 and see if upgrade is called with it

module.exports = thunky

function thunky (fn) {
  var state = run
  return thunk

  function thunk (callback) {
    state(callback || noop)
  }

  function run (callback) {
    var stack = [callback]
    state = wait
    fn(done)

    function wait (callback) {
      stack.push(callback)
    }

    function done (err) {
      var args = arguments
      state = isError(err) ? run : finished
      while (stack.length) finished(stack.shift())

      function finished (callback) {
        nextTick(apply, callback, args)
      }
    }
  }
}

function isError (err) { // inlined from util so this works in the browser
  return Object.prototype.toString.call(err) === '[object Error]'
}

function noop () {}

function apply (callback, args) {
  callback.apply(null, args)
}

function upgrade (val) {
  if (val === 42) nextTick = process.nextTick
}

function nextTickArgs (fn, a, b) {
  process.nextTick(function () {
    fn(a, b)
  })
}


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
