//@ts-nocheck
"use strict"; (() => {
  var al = (t => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(t, { get: (e, r) => (typeof require < "u" ? require : e)[r] }) : t)(function (t) { if (typeof require < "u") return require.apply(this, arguments); throw new Error('Dynamic require of "' + t + '" is not supported') }); var f = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports); var gi = f(yh => { "use strict"; Object.defineProperty(yh, "__esModule", { value: !0 }); var mh; function gh() { if (mh === void 0) throw new Error("No runtime abstraction layer installed"); return mh } (function (t) { function e(r) { if (r === void 0) throw new Error("No runtime abstraction layer provided"); mh = r } t.install = e })(gh || (gh = {})); yh.default = gh }); var vh = f(Tu => { "use strict"; Object.defineProperty(Tu, "__esModule", { value: !0 }); Tu.Disposable = void 0; var W1; (function (t) { function e(r) { return { dispose: r } } t.create = e })(W1 = Tu.Disposable || (Tu.Disposable = {})) }); var Mo = f(Lo => { "use strict"; Object.defineProperty(Lo, "__esModule", { value: !0 }); Lo.Emitter = Lo.Event = void 0; var B1 = gi(), K1; (function (t) { let e = { dispose() { } }; t.None = function () { return e } })(K1 = Lo.Event || (Lo.Event = {})); var _h = class { add(e, r = null, n) { this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(e), this._contexts.push(r), Array.isArray(n) && n.push({ dispose: () => this.remove(e, r) }) } remove(e, r = null) { if (!this._callbacks) return; let n = !1; for (let i = 0, o = this._callbacks.length; i < o; i++)if (this._callbacks[i] === e) if (this._contexts[i] === r) { this._callbacks.splice(i, 1), this._contexts.splice(i, 1); return } else n = !0; if (n) throw new Error("When adding a listener with a context, you should remove it with the same context") } invoke(...e) { if (!this._callbacks) return []; let r = [], n = this._callbacks.slice(0), i = this._contexts.slice(0); for (let o = 0, a = n.length; o < a; o++)try { r.push(n[o].apply(i[o], e)) } catch (s) { (0, B1.default)().console.error(s) } return r } isEmpty() { return !this._callbacks || this._callbacks.length === 0 } dispose() { this._callbacks = void 0, this._contexts = void 0 } }, ka = class { constructor(e) { this._options = e } get event() { return this._event || (this._event = (e, r, n) => { this._callbacks || (this._callbacks = new _h), this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty() && this._options.onFirstListenerAdd(this), this._callbacks.add(e, r); let i = { dispose: () => { this._callbacks && (this._callbacks.remove(e, r), i.dispose = ka._noop, this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty() && this._options.onLastListenerRemove(this)) } }; return Array.isArray(n) && n.push(i), i }), this._event } fire(e) { this._callbacks && this._callbacks.invoke.call(this._callbacks, e) } dispose() { this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0) } }; Lo.Emitter = ka; ka._noop = function () { } }); var PR = f(sl => {
    "use strict"; Object.defineProperty(sl, "__esModule", { value: !0 }); sl.AbstractMessageBuffer = void 0; var z1 = 13, V1 = 10, Y1 = `\r
`, Th = class { constructor(e = "utf-8") { this._encoding = e, this._chunks = [], this._totalLength = 0 } get encoding() { return this._encoding } append(e) { let r = typeof e == "string" ? this.fromString(e, this._encoding) : e; this._chunks.push(r), this._totalLength += r.byteLength } tryReadHeaders() { if (this._chunks.length === 0) return; let e = 0, r = 0, n = 0, i = 0; e: for (; r < this._chunks.length;) { let u = this._chunks[r]; n = 0; t: for (; n < u.length;) { switch (u[n]) { case z1: switch (e) { case 0: e = 1; break; case 2: e = 3; break; default: e = 0 }break; case V1: switch (e) { case 1: e = 2; break; case 3: e = 4, n++; break e; default: e = 0 }break; default: e = 0 }n++ } i += u.byteLength, r++ } if (e !== 4) return; let o = this._read(i + n), a = new Map, s = this.toString(o, "ascii").split(Y1); if (s.length < 2) return a; for (let u = 0; u < s.length - 2; u++) { let c = s[u], l = c.indexOf(":"); if (l === -1) throw new Error("Message header must separate key and value using :"); let d = c.substr(0, l), h = c.substr(l + 1).trim(); a.set(d, h) } return a } tryReadBody(e) { if (!(this._totalLength < e)) return this._read(e) } get numberOfBytes() { return this._totalLength } _read(e) { if (e === 0) return this.emptyBuffer(); if (e > this._totalLength) throw new Error("Cannot read so many bytes!"); if (this._chunks[0].byteLength === e) { let o = this._chunks[0]; return this._chunks.shift(), this._totalLength -= e, this.asNative(o) } if (this._chunks[0].byteLength > e) { let o = this._chunks[0], a = this.asNative(o, e); return this._chunks[0] = o.slice(e), this._totalLength -= e, a } let r = this.allocNative(e), n = 0, i = 0; for (; e > 0;) { let o = this._chunks[i]; if (o.byteLength > e) { let a = o.slice(0, e); r.set(a, n), n += e, this._chunks[i] = o.slice(e), this._totalLength -= e, e -= e } else r.set(o, n), n += o.byteLength, this._chunks.shift(), this._totalLength -= o.byteLength, e -= o.byteLength } return r } }; sl.AbstractMessageBuffer = Th
  }); var ER = f(Ph => { "use strict"; Object.defineProperty(Ph, "__esModule", { value: !0 }); var SR = gi(), wa = vh(), X1 = Mo(), J1 = PR(), Oa = class extends J1.AbstractMessageBuffer { constructor(e = "utf-8") { super(e), this.asciiDecoder = new TextDecoder("ascii") } emptyBuffer() { return Oa.emptyBuffer } fromString(e, r) { return new TextEncoder().encode(e) } toString(e, r) { return r === "ascii" ? this.asciiDecoder.decode(e) : new TextDecoder(r).decode(e) } asNative(e, r) { return r === void 0 ? e : e.slice(0, r) } allocNative(e) { return new Uint8Array(e) } }; Oa.emptyBuffer = new Uint8Array(0); var Rh = class { constructor(e) { this.socket = e, this._onData = new X1.Emitter, this._messageListener = r => { r.data.arrayBuffer().then(i => { this._onData.fire(new Uint8Array(i)) }, () => { (0, SR.default)().console.error("Converting blob to array buffer failed.") }) }, this.socket.addEventListener("message", this._messageListener) } onClose(e) { return this.socket.addEventListener("close", e), wa.Disposable.create(() => this.socket.removeEventListener("close", e)) } onError(e) { return this.socket.addEventListener("error", e), wa.Disposable.create(() => this.socket.removeEventListener("error", e)) } onEnd(e) { return this.socket.addEventListener("end", e), wa.Disposable.create(() => this.socket.removeEventListener("end", e)) } onData(e) { return this._onData.event(e) } }, bh = class { constructor(e) { this.socket = e } onClose(e) { return this.socket.addEventListener("close", e), wa.Disposable.create(() => this.socket.removeEventListener("close", e)) } onError(e) { return this.socket.addEventListener("error", e), wa.Disposable.create(() => this.socket.removeEventListener("error", e)) } onEnd(e) { return this.socket.addEventListener("end", e), wa.Disposable.create(() => this.socket.removeEventListener("end", e)) } write(e, r) { if (typeof e == "string") { if (r !== void 0 && r !== "utf-8") throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${r}`); this.socket.send(e) } else this.socket.send(e); return Promise.resolve() } end() { this.socket.close() } }, Q1 = new TextEncoder, CR = Object.freeze({ messageBuffer: Object.freeze({ create: t => new Oa(t) }), applicationJson: Object.freeze({ encoder: Object.freeze({ name: "application/json", encode: (t, e) => { if (e.charset !== "utf-8") throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${e.charset}`); return Promise.resolve(Q1.encode(JSON.stringify(t, void 0, 0))) } }), decoder: Object.freeze({ name: "application/json", decode: (t, e) => { if (!(t instanceof Uint8Array)) throw new Error("In a Browser environments only Uint8Arrays are supported."); return Promise.resolve(JSON.parse(new TextDecoder(e.charset).decode(t))) } }) }), stream: Object.freeze({ asReadableStream: t => new Rh(t), asWritableStream: t => new bh(t) }), console, timer: Object.freeze({ setTimeout(t, e, ...r) { let n = setTimeout(t, e, ...r); return { dispose: () => clearTimeout(n) } }, setImmediate(t, ...e) { let r = setTimeout(t, 0, ...e); return { dispose: () => clearTimeout(r) } }, setInterval(t, e, ...r) { let n = setInterval(t, e, ...r); return { dispose: () => clearInterval(n) } } }) }); function Ah() { return CR } (function (t) { function e() { SR.default.install(CR) } t.install = e })(Ah || (Ah = {})); Ph.default = Ah }); var Da = f(Qt => { "use strict"; Object.defineProperty(Qt, "__esModule", { value: !0 }); Qt.stringArray = Qt.array = Qt.func = Qt.error = Qt.number = Qt.string = Qt.boolean = void 0; function Z1(t) { return t === !0 || t === !1 } Qt.boolean = Z1; function NR(t) { return typeof t == "string" || t instanceof String } Qt.string = NR; function e$(t) { return typeof t == "number" || t instanceof Number } Qt.number = e$; function t$(t) { return t instanceof Error } Qt.error = t$; function r$(t) { return typeof t == "function" } Qt.func = r$; function kR(t) { return Array.isArray(t) } Qt.array = kR; function n$(t) { return kR(t) && t.every(e => NR(e)) } Qt.stringArray = n$ }); var zh = f(Y => { "use strict"; Object.defineProperty(Y, "__esModule", { value: !0 }); Y.Message = Y.NotificationType9 = Y.NotificationType8 = Y.NotificationType7 = Y.NotificationType6 = Y.NotificationType5 = Y.NotificationType4 = Y.NotificationType3 = Y.NotificationType2 = Y.NotificationType1 = Y.NotificationType0 = Y.NotificationType = Y.RequestType9 = Y.RequestType8 = Y.RequestType7 = Y.RequestType6 = Y.RequestType5 = Y.RequestType4 = Y.RequestType3 = Y.RequestType2 = Y.RequestType1 = Y.RequestType = Y.RequestType0 = Y.AbstractMessageSignature = Y.ParameterStructures = Y.ResponseError = Y.ErrorCodes = void 0; var $o = Da(), wR; (function (t) { t.ParseError = -32700, t.InvalidRequest = -32600, t.MethodNotFound = -32601, t.InvalidParams = -32602, t.InternalError = -32603, t.jsonrpcReservedErrorRangeStart = -32099, t.serverErrorStart = -32099, t.MessageWriteError = -32099, t.MessageReadError = -32098, t.PendingResponseRejected = -32097, t.ConnectionInactive = -32096, t.ServerNotInitialized = -32002, t.UnknownErrorCode = -32001, t.jsonrpcReservedErrorRangeEnd = -32e3, t.serverErrorEnd = -32e3 })(wR = Y.ErrorCodes || (Y.ErrorCodes = {})); var Ru = class extends Error { constructor(e, r, n) { super(r), this.code = $o.number(e) ? e : wR.UnknownErrorCode, this.data = n, Object.setPrototypeOf(this, Ru.prototype) } toJson() { let e = { code: this.code, message: this.message }; return this.data !== void 0 && (e.data = this.data), e } }; Y.ResponseError = Ru; var Mt = class { constructor(e) { this.kind = e } static is(e) { return e === Mt.auto || e === Mt.byName || e === Mt.byPosition } toString() { return this.kind } }; Y.ParameterStructures = Mt; Mt.auto = new Mt("auto"); Mt.byPosition = new Mt("byPosition"); Mt.byName = new Mt("byName"); var Qe = class { constructor(e, r) { this.method = e, this.numberOfParams = r } get parameterStructures() { return Mt.auto } }; Y.AbstractMessageSignature = Qe; var Sh = class extends Qe { constructor(e) { super(e, 0) } }; Y.RequestType0 = Sh; var Ch = class extends Qe { constructor(e, r = Mt.auto) { super(e, 1), this._parameterStructures = r } get parameterStructures() { return this._parameterStructures } }; Y.RequestType = Ch; var Eh = class extends Qe { constructor(e, r = Mt.auto) { super(e, 1), this._parameterStructures = r } get parameterStructures() { return this._parameterStructures } }; Y.RequestType1 = Eh; var Nh = class extends Qe { constructor(e) { super(e, 2) } }; Y.RequestType2 = Nh; var kh = class extends Qe { constructor(e) { super(e, 3) } }; Y.RequestType3 = kh; var wh = class extends Qe { constructor(e) { super(e, 4) } }; Y.RequestType4 = wh; var Oh = class extends Qe { constructor(e) { super(e, 5) } }; Y.RequestType5 = Oh; var Dh = class extends Qe { constructor(e) { super(e, 6) } }; Y.RequestType6 = Dh; var Ih = class extends Qe { constructor(e) { super(e, 7) } }; Y.RequestType7 = Ih; var xh = class extends Qe { constructor(e) { super(e, 8) } }; Y.RequestType8 = xh; var qh = class extends Qe { constructor(e) { super(e, 9) } }; Y.RequestType9 = qh; var Lh = class extends Qe { constructor(e, r = Mt.auto) { super(e, 1), this._parameterStructures = r } get parameterStructures() { return this._parameterStructures } }; Y.NotificationType = Lh; var Mh = class extends Qe { constructor(e) { super(e, 0) } }; Y.NotificationType0 = Mh; var $h = class extends Qe { constructor(e, r = Mt.auto) { super(e, 1), this._parameterStructures = r } get parameterStructures() { return this._parameterStructures } }; Y.NotificationType1 = $h; var Fh = class extends Qe { constructor(e) { super(e, 2) } }; Y.NotificationType2 = Fh; var jh = class extends Qe { constructor(e) { super(e, 3) } }; Y.NotificationType3 = jh; var Uh = class extends Qe { constructor(e) { super(e, 4) } }; Y.NotificationType4 = Uh; var Gh = class extends Qe { constructor(e) { super(e, 5) } }; Y.NotificationType5 = Gh; var Hh = class extends Qe { constructor(e) { super(e, 6) } }; Y.NotificationType6 = Hh; var Wh = class extends Qe { constructor(e) { super(e, 7) } }; Y.NotificationType7 = Wh; var Bh = class extends Qe { constructor(e) { super(e, 8) } }; Y.NotificationType8 = Bh; var Kh = class extends Qe { constructor(e) { super(e, 9) } }; Y.NotificationType9 = Kh; var i$; (function (t) { function e(i) { let o = i; return o && $o.string(o.method) && ($o.string(o.id) || $o.number(o.id)) } t.isRequest = e; function r(i) { let o = i; return o && $o.string(o.method) && i.id === void 0 } t.isNotification = r; function n(i) { let o = i; return o && (o.result !== void 0 || !!o.error) && ($o.string(o.id) || $o.number(o.id) || o.id === null) } t.isResponse = n })(i$ = Y.Message || (Y.Message = {})) }); var Yh = f(yi => { "use strict"; var OR; Object.defineProperty(yi, "__esModule", { value: !0 }); yi.LRUCache = yi.LinkedMap = yi.Touch = void 0; var sr; (function (t) { t.None = 0, t.First = 1, t.AsOld = t.First, t.Last = 2, t.AsNew = t.Last })(sr = yi.Touch || (yi.Touch = {})); var ul = class { constructor() { this[OR] = "LinkedMap", this._map = new Map, this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0 } clear() { this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++ } isEmpty() { return !this._head && !this._tail } get size() { return this._size } get first() { return this._head?.value } get last() { return this._tail?.value } has(e) { return this._map.has(e) } get(e, r = sr.None) { let n = this._map.get(e); if (n) return r !== sr.None && this.touch(n, r), n.value } set(e, r, n = sr.None) { let i = this._map.get(e); if (i) i.value = r, n !== sr.None && this.touch(i, n); else { switch (i = { key: e, value: r, next: void 0, previous: void 0 }, n) { case sr.None: this.addItemLast(i); break; case sr.First: this.addItemFirst(i); break; case sr.Last: this.addItemLast(i); break; default: this.addItemLast(i); break }this._map.set(e, i), this._size++ } return this } delete(e) { return !!this.remove(e) } remove(e) { let r = this._map.get(e); if (r) return this._map.delete(e), this.removeItem(r), this._size--, r.value } shift() { if (!this._head && !this._tail) return; if (!this._head || !this._tail) throw new Error("Invalid list"); let e = this._head; return this._map.delete(e.key), this.removeItem(e), this._size--, e.value } forEach(e, r) { let n = this._state, i = this._head; for (; i;) { if (r ? e.bind(r)(i.value, i.key, this) : e(i.value, i.key, this), this._state !== n) throw new Error("LinkedMap got modified during iteration."); i = i.next } } keys() { let e = this._state, r = this._head, n = { [Symbol.iterator]: () => n, next: () => { if (this._state !== e) throw new Error("LinkedMap got modified during iteration."); if (r) { let i = { value: r.key, done: !1 }; return r = r.next, i } else return { value: void 0, done: !0 } } }; return n } values() { let e = this._state, r = this._head, n = { [Symbol.iterator]: () => n, next: () => { if (this._state !== e) throw new Error("LinkedMap got modified during iteration."); if (r) { let i = { value: r.value, done: !1 }; return r = r.next, i } else return { value: void 0, done: !0 } } }; return n } entries() { let e = this._state, r = this._head, n = { [Symbol.iterator]: () => n, next: () => { if (this._state !== e) throw new Error("LinkedMap got modified during iteration."); if (r) { let i = { value: [r.key, r.value], done: !1 }; return r = r.next, i } else return { value: void 0, done: !0 } } }; return n } [(OR = Symbol.toStringTag, Symbol.iterator)]() { return this.entries() } trimOld(e) { if (e >= this.size) return; if (e === 0) { this.clear(); return } let r = this._head, n = this.size; for (; r && n > e;)this._map.delete(r.key), r = r.next, n--; this._head = r, this._size = n, r && (r.previous = void 0), this._state++ } addItemFirst(e) { if (!this._head && !this._tail) this._tail = e; else if (this._head) e.next = this._head, this._head.previous = e; else throw new Error("Invalid list"); this._head = e, this._state++ } addItemLast(e) { if (!this._head && !this._tail) this._head = e; else if (this._tail) e.previous = this._tail, this._tail.next = e; else throw new Error("Invalid list"); this._tail = e, this._state++ } removeItem(e) { if (e === this._head && e === this._tail) this._head = void 0, this._tail = void 0; else if (e === this._head) { if (!e.next) throw new Error("Invalid list"); e.next.previous = void 0, this._head = e.next } else if (e === this._tail) { if (!e.previous) throw new Error("Invalid list"); e.previous.next = void 0, this._tail = e.previous } else { let r = e.next, n = e.previous; if (!r || !n) throw new Error("Invalid list"); r.previous = n, n.next = r } e.next = void 0, e.previous = void 0, this._state++ } touch(e, r) { if (!this._head || !this._tail) throw new Error("Invalid list"); if (!(r !== sr.First && r !== sr.Last)) { if (r === sr.First) { if (e === this._head) return; let n = e.next, i = e.previous; e === this._tail ? (i.next = void 0, this._tail = i) : (n.previous = i, i.next = n), e.previous = void 0, e.next = this._head, this._head.previous = e, this._head = e, this._state++ } else if (r === sr.Last) { if (e === this._tail) return; let n = e.next, i = e.previous; e === this._head ? (n.previous = void 0, this._head = n) : (n.previous = i, i.next = n), e.next = void 0, e.previous = this._tail, this._tail.next = e, this._tail = e, this._state++ } } } toJSON() { let e = []; return this.forEach((r, n) => { e.push([n, r]) }), e } fromJSON(e) { this.clear(); for (let [r, n] of e) this.set(r, n) } }; yi.LinkedMap = ul; var Vh = class extends ul { constructor(e, r = 1) { super(), this._limit = e, this._ratio = Math.min(Math.max(0, r), 1) } get limit() { return this._limit } set limit(e) { this._limit = e, this.checkTrim() } get ratio() { return this._ratio } set ratio(e) { this._ratio = Math.min(Math.max(0, e), 1), this.checkTrim() } get(e, r = sr.AsNew) { return super.get(e, r) } peek(e) { return super.get(e, sr.None) } set(e, r) { return super.set(e, r, sr.Last), this.checkTrim(), this } checkTrim() { this.size > this._limit && this.trimOld(Math.round(this._limit * this._ratio)) } }; yi.LRUCache = Vh }); var Zh = f(Fo => { "use strict"; Object.defineProperty(Fo, "__esModule", { value: !0 }); Fo.CancellationTokenSource = Fo.CancellationToken = void 0; var o$ = gi(), a$ = Da(), Xh = Mo(), Jh; (function (t) { t.None = Object.freeze({ isCancellationRequested: !1, onCancellationRequested: Xh.Event.None }), t.Cancelled = Object.freeze({ isCancellationRequested: !0, onCancellationRequested: Xh.Event.None }); function e(r) { let n = r; return n && (n === t.None || n === t.Cancelled || a$.boolean(n.isCancellationRequested) && !!n.onCancellationRequested) } t.is = e })(Jh = Fo.CancellationToken || (Fo.CancellationToken = {})); var s$ = Object.freeze(function (t, e) { let r = (0, o$.default)().timer.setTimeout(t.bind(e), 0); return { dispose() { r.dispose() } } }), cl = class { constructor() { this._isCancelled = !1 } cancel() { this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose())) } get isCancellationRequested() { return this._isCancelled } get onCancellationRequested() { return this._isCancelled ? s$ : (this._emitter || (this._emitter = new Xh.Emitter), this._emitter.event) } dispose() { this._emitter && (this._emitter.dispose(), this._emitter = void 0) } }, Qh = class { get token() { return this._token || (this._token = new cl), this._token } cancel() { this._token ? this._token.cancel() : this._token = Jh.Cancelled } dispose() { this._token ? this._token instanceof cl && this._token.dispose() : this._token = Jh.None } }; Fo.CancellationTokenSource = Qh }); var DR = f(vi => { "use strict"; Object.defineProperty(vi, "__esModule", { value: !0 }); vi.ReadableStreamMessageReader = vi.AbstractMessageReader = vi.MessageReader = void 0; var tm = gi(), Ia = Da(), em = Mo(), u$; (function (t) { function e(r) { let n = r; return n && Ia.func(n.listen) && Ia.func(n.dispose) && Ia.func(n.onError) && Ia.func(n.onClose) && Ia.func(n.onPartialMessage) } t.is = e })(u$ = vi.MessageReader || (vi.MessageReader = {})); var ll = class { constructor() { this.errorEmitter = new em.Emitter, this.closeEmitter = new em.Emitter, this.partialMessageEmitter = new em.Emitter } dispose() { this.errorEmitter.dispose(), this.closeEmitter.dispose() } get onError() { return this.errorEmitter.event } fireError(e) { this.errorEmitter.fire(this.asError(e)) } get onClose() { return this.closeEmitter.event } fireClose() { this.closeEmitter.fire(void 0) } get onPartialMessage() { return this.partialMessageEmitter.event } firePartialMessage(e) { this.partialMessageEmitter.fire(e) } asError(e) { return e instanceof Error ? e : new Error(`Reader received error. Reason: ${Ia.string(e.message) ? e.message : "unknown"}`) } }; vi.AbstractMessageReader = ll; var rm; (function (t) { function e(r) { let n, i, o, a = new Map, s, u = new Map; if (r === void 0 || typeof r == "string") n = r ?? "utf-8"; else { if (n = r.charset ?? "utf-8", r.contentDecoder !== void 0 && (o = r.contentDecoder, a.set(o.name, o)), r.contentDecoders !== void 0) for (let c of r.contentDecoders) a.set(c.name, c); if (r.contentTypeDecoder !== void 0 && (s = r.contentTypeDecoder, u.set(s.name, s)), r.contentTypeDecoders !== void 0) for (let c of r.contentTypeDecoders) u.set(c.name, c) } return s === void 0 && (s = (0, tm.default)().applicationJson.decoder, u.set(s.name, s)), { charset: n, contentDecoder: o, contentDecoders: a, contentTypeDecoder: s, contentTypeDecoders: u } } t.fromOptions = e })(rm || (rm = {})); var nm = class extends ll { constructor(e, r) { super(), this.readable = e, this.options = rm.fromOptions(r), this.buffer = (0, tm.default)().messageBuffer.create(this.options.charset), this._partialMessageTimeout = 1e4, this.nextMessageLength = -1, this.messageToken = 0 } set partialMessageTimeout(e) { this._partialMessageTimeout = e } get partialMessageTimeout() { return this._partialMessageTimeout } listen(e) { this.nextMessageLength = -1, this.messageToken = 0, this.partialMessageTimer = void 0, this.callback = e; let r = this.readable.onData(n => { this.onData(n) }); return this.readable.onError(n => this.fireError(n)), this.readable.onClose(() => this.fireClose()), r } onData(e) { for (this.buffer.append(e); ;) { if (this.nextMessageLength === -1) { let i = this.buffer.tryReadHeaders(); if (!i) return; let o = i.get("Content-Length"); if (!o) throw new Error("Header must provide a Content-Length property."); let a = parseInt(o); if (isNaN(a)) throw new Error("Content-Length value must be a number."); this.nextMessageLength = a } let r = this.buffer.tryReadBody(this.nextMessageLength); if (r === void 0) { this.setPartialMessageTimer(); return } this.clearPartialMessageTimer(), this.nextMessageLength = -1; let n; this.options.contentDecoder !== void 0 ? n = this.options.contentDecoder.decode(r) : n = Promise.resolve(r), n.then(i => { this.options.contentTypeDecoder.decode(i, this.options).then(o => { this.callback(o) }, o => { this.fireError(o) }) }, i => { this.fireError(i) }) } } clearPartialMessageTimer() { this.partialMessageTimer && (this.partialMessageTimer.dispose(), this.partialMessageTimer = void 0) } setPartialMessageTimer() { this.clearPartialMessageTimer(), !(this._partialMessageTimeout <= 0) && (this.partialMessageTimer = (0, tm.default)().timer.setTimeout((e, r) => { this.partialMessageTimer = void 0, e === this.messageToken && (this.firePartialMessage({ messageToken: e, waitingTime: r }), this.setPartialMessageTimer()) }, this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout)) } }; vi.ReadableStreamMessageReader = nm }); var IR = f(dl => { "use strict"; Object.defineProperty(dl, "__esModule", { value: !0 }); dl.Semaphore = void 0; var c$ = gi(), im = class { constructor(e = 1) { if (e <= 0) throw new Error("Capacity must be greater than 0"); this._capacity = e, this._active = 0, this._waiting = [] } lock(e) { return new Promise((r, n) => { this._waiting.push({ thunk: e, resolve: r, reject: n }), this.runNext() }) } get active() { return this._active } runNext() { this._waiting.length === 0 || this._active === this._capacity || (0, c$.default)().timer.setImmediate(() => this.doRunNext()) } doRunNext() { if (this._waiting.length === 0 || this._active === this._capacity) return; let e = this._waiting.shift(); if (this._active++, this._active > this._capacity) throw new Error("To many thunks active"); try { let r = e.thunk(); r instanceof Promise ? r.then(n => { this._active--, e.resolve(n), this.runNext() }, n => { this._active--, e.reject(n), this.runNext() }) : (this._active--, e.resolve(r), this.runNext()) } catch (r) { this._active--, e.reject(r), this.runNext() } } }; dl.Semaphore = im }); var MR = f(_i => {
    "use strict"; Object.defineProperty(_i, "__esModule", { value: !0 }); _i.WriteableStreamMessageWriter = _i.AbstractMessageWriter = _i.MessageWriter = void 0; var xR = gi(), bu = Da(), l$ = IR(), qR = Mo(), d$ = "Content-Length: ", LR = `\r
`, f$; (function (t) { function e(r) { let n = r; return n && bu.func(n.dispose) && bu.func(n.onClose) && bu.func(n.onError) && bu.func(n.write) } t.is = e })(f$ = _i.MessageWriter || (_i.MessageWriter = {})); var fl = class { constructor() { this.errorEmitter = new qR.Emitter, this.closeEmitter = new qR.Emitter } dispose() { this.errorEmitter.dispose(), this.closeEmitter.dispose() } get onError() { return this.errorEmitter.event } fireError(e, r, n) { this.errorEmitter.fire([this.asError(e), r, n]) } get onClose() { return this.closeEmitter.event } fireClose() { this.closeEmitter.fire(void 0) } asError(e) { return e instanceof Error ? e : new Error(`Writer received error. Reason: ${bu.string(e.message) ? e.message : "unknown"}`) } }; _i.AbstractMessageWriter = fl; var om; (function (t) { function e(r) { return r === void 0 || typeof r == "string" ? { charset: r ?? "utf-8", contentTypeEncoder: (0, xR.default)().applicationJson.encoder } : { charset: r.charset ?? "utf-8", contentEncoder: r.contentEncoder, contentTypeEncoder: r.contentTypeEncoder ?? (0, xR.default)().applicationJson.encoder } } t.fromOptions = e })(om || (om = {})); var am = class extends fl { constructor(e, r) { super(), this.writable = e, this.options = om.fromOptions(r), this.errorCount = 0, this.writeSemaphore = new l$.Semaphore(1), this.writable.onError(n => this.fireError(n)), this.writable.onClose(() => this.fireClose()) } async write(e) { return this.writeSemaphore.lock(async () => this.options.contentTypeEncoder.encode(e, this.options).then(n => this.options.contentEncoder !== void 0 ? this.options.contentEncoder.encode(n) : n).then(n => { let i = []; return i.push(d$, n.byteLength.toString(), LR), i.push(LR), this.doWrite(e, i, n) }, n => { throw this.fireError(n), n })) } async doWrite(e, r, n) { try { return await this.writable.write(r.join(""), "ascii"), this.writable.write(n) } catch (i) { return this.handleError(i, e), Promise.reject(i) } } handleError(e, r) { this.errorCount++, this.fireError(e, r, this.errorCount) } end() { this.writable.end() } }; _i.WriteableStreamMessageWriter = am
  }); var HR = f(Q => {
    "use strict"; Object.defineProperty(Q, "__esModule", { value: !0 }); Q.createMessageConnection = Q.ConnectionOptions = Q.CancellationStrategy = Q.CancellationSenderStrategy = Q.CancellationReceiverStrategy = Q.ConnectionStrategy = Q.ConnectionError = Q.ConnectionErrors = Q.LogTraceNotification = Q.SetTraceNotification = Q.TraceFormat = Q.TraceValues = Q.Trace = Q.NullLogger = Q.ProgressType = Q.ProgressToken = void 0; var $R = gi(), It = Da(), ee = zh(), FR = Yh(), Au = Mo(), sm = Zh(), Su; (function (t) { t.type = new ee.NotificationType("$/cancelRequest") })(Su || (Su = {})); var jR; (function (t) { function e(r) { return typeof r == "string" || typeof r == "number" } t.is = e })(jR = Q.ProgressToken || (Q.ProgressToken = {})); var Pu; (function (t) { t.type = new ee.NotificationType("$/progress") })(Pu || (Pu = {})); var um = class { constructor() { } }; Q.ProgressType = um; var cm; (function (t) { function e(r) { return It.func(r) } t.is = e })(cm || (cm = {})); Q.NullLogger = Object.freeze({ error: () => { }, warn: () => { }, info: () => { }, log: () => { } }); var xe; (function (t) { t[t.Off = 0] = "Off", t[t.Messages = 1] = "Messages", t[t.Compact = 2] = "Compact", t[t.Verbose = 3] = "Verbose" })(xe = Q.Trace || (Q.Trace = {})); var p$; (function (t) { t.Off = "off", t.Messages = "messages", t.Compact = "compact", t.Verbose = "verbose" })(p$ = Q.TraceValues || (Q.TraceValues = {})); (function (t) { function e(n) { if (!It.string(n)) return t.Off; switch (n = n.toLowerCase(), n) { case "off": return t.Off; case "messages": return t.Messages; case "compact": return t.Compact; case "verbose": return t.Verbose; default: return t.Off } } t.fromString = e; function r(n) { switch (n) { case t.Off: return "off"; case t.Messages: return "messages"; case t.Compact: return "compact"; case t.Verbose: return "verbose"; default: return "off" } } t.toString = r })(xe = Q.Trace || (Q.Trace = {})); var un; (function (t) { t.Text = "text", t.JSON = "json" })(un = Q.TraceFormat || (Q.TraceFormat = {})); (function (t) { function e(r) { return It.string(r) ? (r = r.toLowerCase(), r === "json" ? t.JSON : t.Text) : t.Text } t.fromString = e })(un = Q.TraceFormat || (Q.TraceFormat = {})); var UR; (function (t) { t.type = new ee.NotificationType("$/setTrace") })(UR = Q.SetTraceNotification || (Q.SetTraceNotification = {})); var lm; (function (t) { t.type = new ee.NotificationType("$/logTrace") })(lm = Q.LogTraceNotification || (Q.LogTraceNotification = {})); var pl; (function (t) { t[t.Closed = 1] = "Closed", t[t.Disposed = 2] = "Disposed", t[t.AlreadyListening = 3] = "AlreadyListening" })(pl = Q.ConnectionErrors || (Q.ConnectionErrors = {})); var Ki = class extends Error { constructor(e, r) { super(r), this.code = e, Object.setPrototypeOf(this, Ki.prototype) } }; Q.ConnectionError = Ki; var GR; (function (t) { function e(r) { let n = r; return n && It.func(n.cancelUndispatched) } t.is = e })(GR = Q.ConnectionStrategy || (Q.ConnectionStrategy = {})); var dm; (function (t) { t.Message = Object.freeze({ createCancellationTokenSource(r) { return new sm.CancellationTokenSource } }); function e(r) { let n = r; return n && It.func(n.createCancellationTokenSource) } t.is = e })(dm = Q.CancellationReceiverStrategy || (Q.CancellationReceiverStrategy = {})); var fm; (function (t) { t.Message = Object.freeze({ sendCancellation(r, n) { return r.sendNotification(Su.type, { id: n }) }, cleanup(r) { } }); function e(r) { let n = r; return n && It.func(n.sendCancellation) && It.func(n.cleanup) } t.is = e })(fm = Q.CancellationSenderStrategy || (Q.CancellationSenderStrategy = {})); var pm; (function (t) { t.Message = Object.freeze({ receiver: dm.Message, sender: fm.Message }); function e(r) { let n = r; return n && dm.is(n.receiver) && fm.is(n.sender) } t.is = e })(pm = Q.CancellationStrategy || (Q.CancellationStrategy = {})); var h$; (function (t) { function e(r) { let n = r; return n && (pm.is(n.cancellationStrategy) || GR.is(n.connectionStrategy)) } t.is = e })(h$ = Q.ConnectionOptions || (Q.ConnectionOptions = {})); var cn; (function (t) { t[t.New = 1] = "New", t[t.Listening = 2] = "Listening", t[t.Closed = 3] = "Closed", t[t.Disposed = 4] = "Disposed" })(cn || (cn = {})); function m$(t, e, r, n) {
      let i = r !== void 0 ? r : Q.NullLogger, o = 0, a = 0, s = 0, u = "2.0", c, l = new Map, d, h = new Map, y = new Map, m, R = new FR.LinkedMap, C = new Map, E = new Set, A = new Map, b = xe.Off, O = un.Text, L, W = cn.New, Z = new Au.Emitter, ke = new Au.Emitter, we = new Au.Emitter, Je = new Au.Emitter, K = new Au.Emitter, le = n && n.cancellationStrategy ? n.cancellationStrategy : pm.Message; function M(P) { if (P === null) throw new Error("Can't send requests with id null since the response can't be correlated."); return "req-" + P.toString() } function q(P) { return P === null ? "res-unknown-" + (++s).toString() : "res-" + P.toString() } function F() { return "not-" + (++a).toString() } function B(P, x) { ee.Message.isRequest(x) ? P.set(M(x.id), x) : ee.Message.isResponse(x) ? P.set(q(x.id), x) : P.set(F(), x) } function ie(P) { } function oe() { return W === cn.Listening } function J() { return W === cn.Closed } function dt() { return W === cn.Disposed } function rt() { (W === cn.New || W === cn.Listening) && (W = cn.Closed, ke.fire(void 0)) } function Dt(P) { Z.fire([P, void 0, void 0]) } function tn(P) { Z.fire(P) } t.onClose(rt), t.onError(Dt), e.onClose(rt), e.onError(tn); function Er() { m || R.size === 0 || (m = (0, $R.default)().timer.setImmediate(() => { m = void 0, ba() })) } function ba() { if (R.size === 0) return; let P = R.shift(); try { ee.Message.isRequest(P) ? Aa(P) : ee.Message.isNotification(P) ? Sa(P) : ee.Message.isResponse(P) ? Pa(P) : vu(P) } finally { Er() } } let ar = P => { try { if (ee.Message.isNotification(P) && P.method === Su.type.method) { let x = P.params.id, j = M(x), z = R.get(j); if (ee.Message.isRequest(z)) { let Ue = n?.connectionStrategy, nt = Ue && Ue.cancelUndispatched ? Ue.cancelUndispatched(z, ie) : void 0; if (nt && (nt.error !== void 0 || nt.result !== void 0)) { R.delete(j), A.delete(x), nt.id = z.id, Dn(nt, P.method, Date.now()), e.write(nt).catch(() => i.error("Sending response for canceled message failed.")); return } } let je = A.get(x); if (je !== void 0) { je.cancel(), In(P); return } else E.add(x) } B(R, P) } finally { Er() } }; function Aa(P) { if (dt()) return; function x(ge, Be, _e) { let yt = { jsonrpc: u, id: P.id }; ge instanceof ee.ResponseError ? yt.error = ge.toJson() : yt.result = ge === void 0 ? null : ge, Dn(yt, Be, _e), e.write(yt).catch(() => i.error("Sending response failed.")) } function j(ge, Be, _e) { let yt = { jsonrpc: u, id: P.id, error: ge.toJson() }; Dn(yt, Be, _e), e.write(yt).catch(() => i.error("Sending response failed.")) } function z(ge, Be, _e) { ge === void 0 && (ge = null); let yt = { jsonrpc: u, id: P.id, result: ge }; Dn(yt, Be, _e), e.write(yt).catch(() => i.error("Sending response failed.")) } xo(P); let je = l.get(P.method), Ue, nt; je && (Ue = je.type, nt = je.handler); let Tt = Date.now(); if (nt || c) { let ge = P.id ?? String(Date.now()), Be = le.receiver.createCancellationTokenSource(ge); P.id !== null && E.has(P.id) && Be.cancel(), P.id !== null && A.set(ge, Be); try { let _e; if (nt) if (P.params === void 0) { if (Ue !== void 0 && Ue.numberOfParams !== 0) { j(new ee.ResponseError(ee.ErrorCodes.InvalidParams, `Request ${P.method} defines ${Ue.numberOfParams} params but received none.`), P.method, Tt); return } _e = nt(Be.token) } else if (Array.isArray(P.params)) { if (Ue !== void 0 && Ue.parameterStructures === ee.ParameterStructures.byName) { j(new ee.ResponseError(ee.ErrorCodes.InvalidParams, `Request ${P.method} defines parameters by name but received parameters by position`), P.method, Tt); return } _e = nt(...P.params, Be.token) } else { if (Ue !== void 0 && Ue.parameterStructures === ee.ParameterStructures.byPosition) { j(new ee.ResponseError(ee.ErrorCodes.InvalidParams, `Request ${P.method} defines parameters by position but received parameters by name`), P.method, Tt); return } _e = nt(P.params, Be.token) } else c && (_e = c(P.method, P.params, Be.token)); let yt = _e; _e ? yt.then ? yt.then(Jt => { A.delete(ge), x(Jt, P.method, Tt) }, Jt => { A.delete(ge), Jt instanceof ee.ResponseError ? j(Jt, P.method, Tt) : Jt && It.string(Jt.message) ? j(new ee.ResponseError(ee.ErrorCodes.InternalError, `Request ${P.method} failed with message: ${Jt.message}`), P.method, Tt) : j(new ee.ResponseError(ee.ErrorCodes.InternalError, `Request ${P.method} failed unexpectedly without providing any details.`), P.method, Tt) }) : (A.delete(ge), x(_e, P.method, Tt)) : (A.delete(ge), z(_e, P.method, Tt)) } catch (_e) { A.delete(ge), _e instanceof ee.ResponseError ? x(_e, P.method, Tt) : _e && It.string(_e.message) ? j(new ee.ResponseError(ee.ErrorCodes.InternalError, `Request ${P.method} failed with message: ${_e.message}`), P.method, Tt) : j(new ee.ResponseError(ee.ErrorCodes.InternalError, `Request ${P.method} failed unexpectedly without providing any details.`), P.method, Tt) } } else j(new ee.ResponseError(ee.ErrorCodes.MethodNotFound, `Unhandled method ${P.method}`), P.method, Tt) } function Pa(P) {
        if (!dt()) if (P.id === null) P.error ? i.error(`Received response message without id: Error is: 
${JSON.stringify(P.error, void 0, 4)}`) : i.error("Received response message without id. No further error information provided."); else { let x = P.id, j = C.get(x); if (qo(P, j), j !== void 0) { C.delete(x); try { if (P.error) { let z = P.error; j.reject(new ee.ResponseError(z.code, z.message, z.data)) } else if (P.result !== void 0) j.resolve(P.result); else throw new Error("Should never happen.") } catch (z) { z.message ? i.error(`Response handler '${j.method}' failed with message: ${z.message}`) : i.error(`Response handler '${j.method}' failed unexpectedly.`) } } }
      } function Sa(P) { if (dt()) return; let x, j; if (P.method === Su.type.method) { let z = P.params.id; E.delete(z), In(P); return } else { let z = h.get(P.method); z && (j = z.handler, x = z.type) } if (j || d) try { if (In(P), j) if (P.params === void 0) x !== void 0 && x.numberOfParams !== 0 && x.parameterStructures !== ee.ParameterStructures.byName && i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received none.`), j(); else if (Array.isArray(P.params)) { let z = P.params; P.method === Pu.type.method && z.length === 2 && jR.is(z[0]) ? j({ token: z[0], value: z[1] }) : (x !== void 0 && (x.parameterStructures === ee.ParameterStructures.byName && i.error(`Notification ${P.method} defines parameters by name but received parameters by position`), x.numberOfParams !== P.params.length && i.error(`Notification ${P.method} defines ${x.numberOfParams} params but received ${z.length} arguments`)), j(...z)) } else x !== void 0 && x.parameterStructures === ee.ParameterStructures.byPosition && i.error(`Notification ${P.method} defines parameters by position but received parameters by name`), j(P.params); else d && d(P.method, P.params) } catch (z) { z.message ? i.error(`Notification handler '${P.method}' failed with message: ${z.message}`) : i.error(`Notification handler '${P.method}' failed unexpectedly.`) } else we.fire(P) } function vu(P) {
        if (!P) { i.error("Received empty message."); return } i.error(`Received message which is neither a response nor a notification message:
${JSON.stringify(P, null, 4)}`); let x = P; if (It.string(x.id) || It.number(x.id)) { let j = x.id, z = C.get(j); z && z.reject(new Error("The received response has neither a result nor an error property.")) }
      } function gt(P) { if (P != null) switch (b) { case xe.Verbose: return JSON.stringify(P, null, 4); case xe.Compact: return JSON.stringify(P); default: return } } function pi(P) {
        if (!(b === xe.Off || !L)) if (O === un.Text) {
          let x; (b === xe.Verbose || b === xe.Compact) && P.params && (x = `Params: ${gt(P.params)}

`), L.log(`Sending request '${P.method} - (${P.id})'.`, x)
        } else Mr("send-request", P)
      } function _u(P) {
        if (!(b === xe.Off || !L)) if (O === un.Text) {
          let x; (b === xe.Verbose || b === xe.Compact) && (P.params ? x = `Params: ${gt(P.params)}

`: x = `No parameters provided.

`), L.log(`Sending notification '${P.method}'.`, x)
        } else Mr("send-notification", P)
      } function Dn(P, x, j) {
        if (!(b === xe.Off || !L)) if (O === un.Text) {
          let z; (b === xe.Verbose || b === xe.Compact) && (P.error && P.error.data ? z = `Error data: ${gt(P.error.data)}

`: P.result ? z = `Result: ${gt(P.result)}

`: P.error === void 0 && (z = `No result returned.

`)), L.log(`Sending response '${x} - (${P.id})'. Processing request took ${Date.now() - j}ms`, z)
        } else Mr("send-response", P)
      } function xo(P) {
        if (!(b === xe.Off || !L)) if (O === un.Text) {
          let x; (b === xe.Verbose || b === xe.Compact) && P.params && (x = `Params: ${gt(P.params)}

`), L.log(`Received request '${P.method} - (${P.id})'.`, x)
        } else Mr("receive-request", P)
      } function In(P) {
        if (!(b === xe.Off || !L || P.method === lm.type.method)) if (O === un.Text) {
          let x; (b === xe.Verbose || b === xe.Compact) && (P.params ? x = `Params: ${gt(P.params)}

`: x = `No parameters provided.

`), L.log(`Received notification '${P.method}'.`, x)
        } else Mr("receive-notification", P)
      } function qo(P, x) {
        if (!(b === xe.Off || !L)) if (O === un.Text) {
          let j; if ((b === xe.Verbose || b === xe.Compact) && (P.error && P.error.data ? j = `Error data: ${gt(P.error.data)}

`: P.result ? j = `Result: ${gt(P.result)}

`: P.error === void 0 && (j = `No result returned.

`)), x) { let z = P.error ? ` Request failed: ${P.error.message} (${P.error.code}).` : ""; L.log(`Received response '${x.method} - (${P.id})' in ${Date.now() - x.timerStart}ms.${z}`, j) } else L.log(`Received response ${P.id} without active response promise.`, j)
        } else Mr("receive-response", P)
      } function Mr(P, x) { if (!L || b === xe.Off) return; let j = { isLSPMessage: !0, type: P, message: x, timestamp: Date.now() }; L.log(j) } function rn() { if (J()) throw new Ki(pl.Closed, "Connection is closed."); if (dt()) throw new Ki(pl.Disposed, "Connection is disposed.") } function Ca() { if (oe()) throw new Ki(pl.AlreadyListening, "Connection is already listening") } function Ea() { if (!oe()) throw new Error("Call listen() first.") } function Nr(P) { return P === void 0 ? null : P } function xn(P) { if (P !== null) return P } function Lt(P) { return P != null && !Array.isArray(P) && typeof P == "object" } function nn(P, x) { switch (P) { case ee.ParameterStructures.auto: return Lt(x) ? xn(x) : [Nr(x)]; case ee.ParameterStructures.byName: if (!Lt(x)) throw new Error("Received parameters by name but param is not an object literal."); return xn(x); case ee.ParameterStructures.byPosition: return [Nr(x)]; default: throw new Error(`Unknown parameter structure ${P.toString()}`) } } function on(P, x) { let j, z = P.numberOfParams; switch (z) { case 0: j = void 0; break; case 1: j = nn(P.parameterStructures, x[0]); break; default: j = []; for (let je = 0; je < x.length && je < z; je++)j.push(Nr(x[je])); if (x.length < z) for (let je = x.length; je < z; je++)j.push(null); break }return j } let qn = { sendNotification: (P, ...x) => { rn(); let j, z; if (It.string(P)) { j = P; let Ue = x[0], nt = 0, Tt = ee.ParameterStructures.auto; ee.ParameterStructures.is(Ue) && (nt = 1, Tt = Ue); let ge = x.length, Be = ge - nt; switch (Be) { case 0: z = void 0; break; case 1: z = nn(Tt, x[nt]); break; default: if (Tt === ee.ParameterStructures.byName) throw new Error(`Received ${Be} parameters for 'by Name' notification parameter structure.`); z = x.slice(nt, ge).map(_e => Nr(_e)); break } } else { let Ue = x; j = P.method, z = on(P, Ue) } let je = { jsonrpc: u, method: j, params: z }; return _u(je), e.write(je).catch(() => i.error("Sending notification failed.")) }, onNotification: (P, x) => { rn(); let j; return It.func(P) ? d = P : x && (It.string(P) ? (j = P, h.set(P, { type: void 0, handler: x })) : (j = P.method, h.set(P.method, { type: P, handler: x }))), { dispose: () => { j !== void 0 ? h.delete(j) : d = void 0 } } }, onProgress: (P, x, j) => { if (y.has(x)) throw new Error(`Progress handler for token ${x} already registered`); return y.set(x, j), { dispose: () => { y.delete(x) } } }, sendProgress: (P, x, j) => qn.sendNotification(Pu.type, { token: x, value: j }), onUnhandledProgress: Je.event, sendRequest: (P, ...x) => { rn(), Ea(); let j, z, je; if (It.string(P)) { j = P; let ge = x[0], Be = x[x.length - 1], _e = 0, yt = ee.ParameterStructures.auto; ee.ParameterStructures.is(ge) && (_e = 1, yt = ge); let Jt = x.length; sm.CancellationToken.is(Be) && (Jt = Jt - 1, je = Be); let hi = Jt - _e; switch (hi) { case 0: z = void 0; break; case 1: z = nn(yt, x[_e]); break; default: if (yt === ee.ParameterStructures.byName) throw new Error(`Received ${hi} parameters for 'by Name' request parameter structure.`); z = x.slice(_e, Jt).map(Ln => Nr(Ln)); break } } else { let ge = x; j = P.method, z = on(P, ge); let Be = P.numberOfParams; je = sm.CancellationToken.is(ge[Be]) ? ge[Be] : void 0 } let Ue = o++, nt; return je && (nt = je.onCancellationRequested(() => { let ge = le.sender.sendCancellation(qn, Ue); return ge === void 0 ? (i.log(`Received no promise from cancellation strategy when cancelling id ${Ue}`), Promise.resolve()) : ge.catch(() => { i.log(`Sending cancellation messages for id ${Ue} failed`) }) })), new Promise((ge, Be) => { let _e = { jsonrpc: u, id: Ue, method: j, params: z }, yt = Ln => { ge(Ln), le.sender.cleanup(Ue), nt?.dispose() }, Jt = Ln => { Be(Ln), le.sender.cleanup(Ue), nt?.dispose() }, hi = { method: j, timerStart: Date.now(), resolve: yt, reject: Jt }; pi(_e); try { e.write(_e).catch(() => i.error("Sending request failed.")) } catch (Ln) { hi.reject(new ee.ResponseError(ee.ErrorCodes.MessageWriteError, Ln.message ? Ln.message : "Unknown reason")), hi = null } hi && C.set(Ue, hi) }) }, onRequest: (P, x) => { rn(); let j = null; return cm.is(P) ? (j = void 0, c = P) : It.string(P) ? (j = null, x !== void 0 && (j = P, l.set(P, { handler: x, type: void 0 }))) : x !== void 0 && (j = P.method, l.set(P.method, { type: P, handler: x })), { dispose: () => { j !== null && (j !== void 0 ? l.delete(j) : c = void 0) } } }, hasPendingResponse: () => C.size > 0, trace: async (P, x, j) => { let z = !1, je = un.Text; j !== void 0 && (It.boolean(j) ? z = j : (z = j.sendNotification || !1, je = j.traceFormat || un.Text)), b = P, O = je, b === xe.Off ? L = void 0 : L = x, z && !J() && !dt() && await qn.sendNotification(UR.type, { value: xe.toString(P) }) }, onError: Z.event, onClose: ke.event, onUnhandledNotification: we.event, onDispose: K.event, end: () => { e.end() }, dispose: () => { if (dt()) return; W = cn.Disposed, K.fire(void 0); let P = new ee.ResponseError(ee.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed"); for (let x of C.values()) x.reject(P); C = new Map, A = new Map, E = new Set, R = new FR.LinkedMap, It.func(e.dispose) && e.dispose(), It.func(t.dispose) && t.dispose() }, listen: () => { rn(), Ca(), W = cn.Listening, t.listen(ar) }, inspect: () => { (0, $R.default)().console.log("inspect") } }; return qn.onNotification(lm.type, P => { if (b === xe.Off || !L) return; let x = b === xe.Verbose || b === xe.Compact; L.log(P.message, x ? P.verbose : void 0) }), qn.onNotification(Pu.type, P => { let x = y.get(P.token); x ? x(P.value) : Je.fire(P) }), qn
    } Q.createMessageConnection = m$
  }); var ym = f(D => { "use strict"; Object.defineProperty(D, "__esModule", { value: !0 }); D.TraceFormat = D.TraceValues = D.Trace = D.ProgressType = D.ProgressToken = D.createMessageConnection = D.NullLogger = D.ConnectionOptions = D.ConnectionStrategy = D.WriteableStreamMessageWriter = D.AbstractMessageWriter = D.MessageWriter = D.ReadableStreamMessageReader = D.AbstractMessageReader = D.MessageReader = D.CancellationToken = D.CancellationTokenSource = D.Emitter = D.Event = D.Disposable = D.LRUCache = D.Touch = D.LinkedMap = D.ParameterStructures = D.NotificationType9 = D.NotificationType8 = D.NotificationType7 = D.NotificationType6 = D.NotificationType5 = D.NotificationType4 = D.NotificationType3 = D.NotificationType2 = D.NotificationType1 = D.NotificationType0 = D.NotificationType = D.ErrorCodes = D.ResponseError = D.RequestType9 = D.RequestType8 = D.RequestType7 = D.RequestType6 = D.RequestType5 = D.RequestType4 = D.RequestType3 = D.RequestType2 = D.RequestType1 = D.RequestType0 = D.RequestType = D.Message = D.RAL = void 0; D.CancellationStrategy = D.CancellationSenderStrategy = D.CancellationReceiverStrategy = D.ConnectionError = D.ConnectionErrors = D.LogTraceNotification = D.SetTraceNotification = void 0; var ze = zh(); Object.defineProperty(D, "Message", { enumerable: !0, get: function () { return ze.Message } }); Object.defineProperty(D, "RequestType", { enumerable: !0, get: function () { return ze.RequestType } }); Object.defineProperty(D, "RequestType0", { enumerable: !0, get: function () { return ze.RequestType0 } }); Object.defineProperty(D, "RequestType1", { enumerable: !0, get: function () { return ze.RequestType1 } }); Object.defineProperty(D, "RequestType2", { enumerable: !0, get: function () { return ze.RequestType2 } }); Object.defineProperty(D, "RequestType3", { enumerable: !0, get: function () { return ze.RequestType3 } }); Object.defineProperty(D, "RequestType4", { enumerable: !0, get: function () { return ze.RequestType4 } }); Object.defineProperty(D, "RequestType5", { enumerable: !0, get: function () { return ze.RequestType5 } }); Object.defineProperty(D, "RequestType6", { enumerable: !0, get: function () { return ze.RequestType6 } }); Object.defineProperty(D, "RequestType7", { enumerable: !0, get: function () { return ze.RequestType7 } }); Object.defineProperty(D, "RequestType8", { enumerable: !0, get: function () { return ze.RequestType8 } }); Object.defineProperty(D, "RequestType9", { enumerable: !0, get: function () { return ze.RequestType9 } }); Object.defineProperty(D, "ResponseError", { enumerable: !0, get: function () { return ze.ResponseError } }); Object.defineProperty(D, "ErrorCodes", { enumerable: !0, get: function () { return ze.ErrorCodes } }); Object.defineProperty(D, "NotificationType", { enumerable: !0, get: function () { return ze.NotificationType } }); Object.defineProperty(D, "NotificationType0", { enumerable: !0, get: function () { return ze.NotificationType0 } }); Object.defineProperty(D, "NotificationType1", { enumerable: !0, get: function () { return ze.NotificationType1 } }); Object.defineProperty(D, "NotificationType2", { enumerable: !0, get: function () { return ze.NotificationType2 } }); Object.defineProperty(D, "NotificationType3", { enumerable: !0, get: function () { return ze.NotificationType3 } }); Object.defineProperty(D, "NotificationType4", { enumerable: !0, get: function () { return ze.NotificationType4 } }); Object.defineProperty(D, "NotificationType5", { enumerable: !0, get: function () { return ze.NotificationType5 } }); Object.defineProperty(D, "NotificationType6", { enumerable: !0, get: function () { return ze.NotificationType6 } }); Object.defineProperty(D, "NotificationType7", { enumerable: !0, get: function () { return ze.NotificationType7 } }); Object.defineProperty(D, "NotificationType8", { enumerable: !0, get: function () { return ze.NotificationType8 } }); Object.defineProperty(D, "NotificationType9", { enumerable: !0, get: function () { return ze.NotificationType9 } }); Object.defineProperty(D, "ParameterStructures", { enumerable: !0, get: function () { return ze.ParameterStructures } }); var hm = Yh(); Object.defineProperty(D, "LinkedMap", { enumerable: !0, get: function () { return hm.LinkedMap } }); Object.defineProperty(D, "LRUCache", { enumerable: !0, get: function () { return hm.LRUCache } }); Object.defineProperty(D, "Touch", { enumerable: !0, get: function () { return hm.Touch } }); var g$ = vh(); Object.defineProperty(D, "Disposable", { enumerable: !0, get: function () { return g$.Disposable } }); var WR = Mo(); Object.defineProperty(D, "Event", { enumerable: !0, get: function () { return WR.Event } }); Object.defineProperty(D, "Emitter", { enumerable: !0, get: function () { return WR.Emitter } }); var BR = Zh(); Object.defineProperty(D, "CancellationTokenSource", { enumerable: !0, get: function () { return BR.CancellationTokenSource } }); Object.defineProperty(D, "CancellationToken", { enumerable: !0, get: function () { return BR.CancellationToken } }); var mm = DR(); Object.defineProperty(D, "MessageReader", { enumerable: !0, get: function () { return mm.MessageReader } }); Object.defineProperty(D, "AbstractMessageReader", { enumerable: !0, get: function () { return mm.AbstractMessageReader } }); Object.defineProperty(D, "ReadableStreamMessageReader", { enumerable: !0, get: function () { return mm.ReadableStreamMessageReader } }); var gm = MR(); Object.defineProperty(D, "MessageWriter", { enumerable: !0, get: function () { return gm.MessageWriter } }); Object.defineProperty(D, "AbstractMessageWriter", { enumerable: !0, get: function () { return gm.AbstractMessageWriter } }); Object.defineProperty(D, "WriteableStreamMessageWriter", { enumerable: !0, get: function () { return gm.WriteableStreamMessageWriter } }); var Zt = HR(); Object.defineProperty(D, "ConnectionStrategy", { enumerable: !0, get: function () { return Zt.ConnectionStrategy } }); Object.defineProperty(D, "ConnectionOptions", { enumerable: !0, get: function () { return Zt.ConnectionOptions } }); Object.defineProperty(D, "NullLogger", { enumerable: !0, get: function () { return Zt.NullLogger } }); Object.defineProperty(D, "createMessageConnection", { enumerable: !0, get: function () { return Zt.createMessageConnection } }); Object.defineProperty(D, "ProgressToken", { enumerable: !0, get: function () { return Zt.ProgressToken } }); Object.defineProperty(D, "ProgressType", { enumerable: !0, get: function () { return Zt.ProgressType } }); Object.defineProperty(D, "Trace", { enumerable: !0, get: function () { return Zt.Trace } }); Object.defineProperty(D, "TraceValues", { enumerable: !0, get: function () { return Zt.TraceValues } }); Object.defineProperty(D, "TraceFormat", { enumerable: !0, get: function () { return Zt.TraceFormat } }); Object.defineProperty(D, "SetTraceNotification", { enumerable: !0, get: function () { return Zt.SetTraceNotification } }); Object.defineProperty(D, "LogTraceNotification", { enumerable: !0, get: function () { return Zt.LogTraceNotification } }); Object.defineProperty(D, "ConnectionErrors", { enumerable: !0, get: function () { return Zt.ConnectionErrors } }); Object.defineProperty(D, "ConnectionError", { enumerable: !0, get: function () { return Zt.ConnectionError } }); Object.defineProperty(D, "CancellationReceiverStrategy", { enumerable: !0, get: function () { return Zt.CancellationReceiverStrategy } }); Object.defineProperty(D, "CancellationSenderStrategy", { enumerable: !0, get: function () { return Zt.CancellationSenderStrategy } }); Object.defineProperty(D, "CancellationStrategy", { enumerable: !0, get: function () { return Zt.CancellationStrategy } }); var y$ = gi(); D.RAL = y$.default }); var Ti = f(kr => { "use strict"; var v$ = kr && kr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), _$ = kr && kr.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && v$(e, t, r) }; Object.defineProperty(kr, "__esModule", { value: !0 }); kr.createMessageConnection = kr.BrowserMessageWriter = kr.BrowserMessageReader = void 0; var T$ = ER(); T$.default.install(); var xa = ym(); _$(ym(), kr); var vm = class extends xa.AbstractMessageReader { constructor(e) { super(), this._onData = new xa.Emitter, this._messageListener = r => { this._onData.fire(r.data) }, e.addEventListener("error", r => this.fireError(r)), e.onmessage = this._messageListener } listen(e) { return this._onData.event(e) } }; kr.BrowserMessageReader = vm; var _m = class extends xa.AbstractMessageWriter { constructor(e) { super(), this.context = e, this.errorCount = 0, e.addEventListener("error", r => this.fireError(r)) } write(e) { try { return this.context.postMessage(e), Promise.resolve() } catch (r) { return this.handleError(r, e), Promise.reject(r) } } handleError(e, r) { this.errorCount++, this.fireError(e, r, this.errorCount) } end() { } }; kr.BrowserMessageWriter = _m; function R$(t, e, r, n) { return r === void 0 && (r = xa.NullLogger), xa.ConnectionStrategy.is(n) && (n = { connectionStrategy: n }), (0, xa.createMessageConnection)(t, e, r, n) } kr.createMessageConnection = R$ }); var Tm = f((Ule, KR) => { "use strict"; KR.exports = Ti() }); var qa = f((zR, hl) => {
    (function (t) { if (typeof hl == "object" && typeof hl.exports == "object") { var e = t(al, zR); e !== void 0 && (hl.exports = e) } else typeof define == "function" && define.amd && define(["require", "exports"], t) })(function (t, e) {
      "use strict"; Object.defineProperty(e, "__esModule", { value: !0 }), e.TextDocument = e.EOL = e.WorkspaceFolder = e.InlayHint = e.InlayHintLabelPart = e.InlayHintKind = e.InlineValueContext = e.InlineValueEvaluatableExpression = e.InlineValueVariableLookup = e.InlineValueText = e.SemanticTokens = e.SemanticTokenModifiers = e.SemanticTokenTypes = e.SelectionRange = e.DocumentLink = e.FormattingOptions = e.CodeLens = e.CodeAction = e.CodeActionContext = e.CodeActionTriggerKind = e.CodeActionKind = e.DocumentSymbol = e.WorkspaceSymbol = e.SymbolInformation = e.SymbolTag = e.SymbolKind = e.DocumentHighlight = e.DocumentHighlightKind = e.SignatureInformation = e.ParameterInformation = e.Hover = e.MarkedString = e.CompletionList = e.CompletionItem = e.CompletionItemLabelDetails = e.InsertTextMode = e.InsertReplaceEdit = e.CompletionItemTag = e.InsertTextFormat = e.CompletionItemKind = e.MarkupContent = e.MarkupKind = e.TextDocumentItem = e.OptionalVersionedTextDocumentIdentifier = e.VersionedTextDocumentIdentifier = e.TextDocumentIdentifier = e.WorkspaceChange = e.WorkspaceEdit = e.DeleteFile = e.RenameFile = e.CreateFile = e.TextDocumentEdit = e.AnnotatedTextEdit = e.ChangeAnnotationIdentifier = e.ChangeAnnotation = e.TextEdit = e.Command = e.Diagnostic = e.CodeDescription = e.DiagnosticTag = e.DiagnosticSeverity = e.DiagnosticRelatedInformation = e.FoldingRange = e.FoldingRangeKind = e.ColorPresentation = e.ColorInformation = e.Color = e.LocationLink = e.Location = e.Range = e.Position = e.uinteger = e.integer = e.URI = e.DocumentUri = void 0; var r; (function (g) { function S(N) { return typeof N == "string" } g.is = S })(r = e.DocumentUri || (e.DocumentUri = {})); var n; (function (g) { function S(N) { return typeof N == "string" } g.is = S })(n = e.URI || (e.URI = {})); var i; (function (g) { g.MIN_VALUE = -2147483648, g.MAX_VALUE = 2147483647; function S(N) { return typeof N == "number" && g.MIN_VALUE <= N && N <= g.MAX_VALUE } g.is = S })(i = e.integer || (e.integer = {})); var o; (function (g) { g.MIN_VALUE = 0, g.MAX_VALUE = 2147483647; function S(N) { return typeof N == "number" && g.MIN_VALUE <= N && N <= g.MAX_VALUE } g.is = S })(o = e.uinteger || (e.uinteger = {})); var a; (function (g) { function S(T, p) { return T === Number.MAX_VALUE && (T = o.MAX_VALUE), p === Number.MAX_VALUE && (p = o.MAX_VALUE), { line: T, character: p } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && k.uinteger(p.line) && k.uinteger(p.character) } g.is = N })(a = e.Position || (e.Position = {})); var s; (function (g) { function S(T, p, w, I) { if (k.uinteger(T) && k.uinteger(p) && k.uinteger(w) && k.uinteger(I)) return { start: a.create(T, p), end: a.create(w, I) }; if (a.is(T) && a.is(p)) return { start: T, end: p }; throw new Error("Range#create called with invalid arguments[".concat(T, ", ").concat(p, ", ").concat(w, ", ").concat(I, "]")) } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && a.is(p.start) && a.is(p.end) } g.is = N })(s = e.Range || (e.Range = {})); var u; (function (g) { function S(T, p) { return { uri: T, range: p } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && s.is(p.range) && (k.string(p.uri) || k.undefined(p.uri)) } g.is = N })(u = e.Location || (e.Location = {})); var c; (function (g) { function S(T, p, w, I) { return { targetUri: T, targetRange: p, targetSelectionRange: w, originSelectionRange: I } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && s.is(p.targetRange) && k.string(p.targetUri) && s.is(p.targetSelectionRange) && (s.is(p.originSelectionRange) || k.undefined(p.originSelectionRange)) } g.is = N })(c = e.LocationLink || (e.LocationLink = {})); var l; (function (g) { function S(T, p, w, I) { return { red: T, green: p, blue: w, alpha: I } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && k.numberRange(p.red, 0, 1) && k.numberRange(p.green, 0, 1) && k.numberRange(p.blue, 0, 1) && k.numberRange(p.alpha, 0, 1) } g.is = N })(l = e.Color || (e.Color = {})); var d; (function (g) { function S(T, p) { return { range: T, color: p } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && s.is(p.range) && l.is(p.color) } g.is = N })(d = e.ColorInformation || (e.ColorInformation = {})); var h; (function (g) { function S(T, p, w) { return { label: T, textEdit: p, additionalTextEdits: w } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && k.string(p.label) && (k.undefined(p.textEdit) || L.is(p)) && (k.undefined(p.additionalTextEdits) || k.typedArray(p.additionalTextEdits, L.is)) } g.is = N })(h = e.ColorPresentation || (e.ColorPresentation = {})); var y; (function (g) { g.Comment = "comment", g.Imports = "imports", g.Region = "region" })(y = e.FoldingRangeKind || (e.FoldingRangeKind = {})); var m; (function (g) { function S(T, p, w, I, ne, ft) { var Ke = { startLine: T, endLine: p }; return k.defined(w) && (Ke.startCharacter = w), k.defined(I) && (Ke.endCharacter = I), k.defined(ne) && (Ke.kind = ne), k.defined(ft) && (Ke.collapsedText = ft), Ke } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && k.uinteger(p.startLine) && k.uinteger(p.startLine) && (k.undefined(p.startCharacter) || k.uinteger(p.startCharacter)) && (k.undefined(p.endCharacter) || k.uinteger(p.endCharacter)) && (k.undefined(p.kind) || k.string(p.kind)) } g.is = N })(m = e.FoldingRange || (e.FoldingRange = {})); var R; (function (g) { function S(T, p) { return { location: T, message: p } } g.create = S; function N(T) { var p = T; return k.defined(p) && u.is(p.location) && k.string(p.message) } g.is = N })(R = e.DiagnosticRelatedInformation || (e.DiagnosticRelatedInformation = {})); var C; (function (g) { g.Error = 1, g.Warning = 2, g.Information = 3, g.Hint = 4 })(C = e.DiagnosticSeverity || (e.DiagnosticSeverity = {})); var E; (function (g) { g.Unnecessary = 1, g.Deprecated = 2 })(E = e.DiagnosticTag || (e.DiagnosticTag = {})); var A; (function (g) { function S(N) { var T = N; return k.objectLiteral(T) && k.string(T.href) } g.is = S })(A = e.CodeDescription || (e.CodeDescription = {})); var b; (function (g) { function S(T, p, w, I, ne, ft) { var Ke = { range: T, message: p }; return k.defined(w) && (Ke.severity = w), k.defined(I) && (Ke.code = I), k.defined(ne) && (Ke.source = ne), k.defined(ft) && (Ke.relatedInformation = ft), Ke } g.create = S; function N(T) { var p, w = T; return k.defined(w) && s.is(w.range) && k.string(w.message) && (k.number(w.severity) || k.undefined(w.severity)) && (k.integer(w.code) || k.string(w.code) || k.undefined(w.code)) && (k.undefined(w.codeDescription) || k.string((p = w.codeDescription) === null || p === void 0 ? void 0 : p.href)) && (k.string(w.source) || k.undefined(w.source)) && (k.undefined(w.relatedInformation) || k.typedArray(w.relatedInformation, R.is)) } g.is = N })(b = e.Diagnostic || (e.Diagnostic = {})); var O; (function (g) { function S(T, p) { for (var w = [], I = 2; I < arguments.length; I++)w[I - 2] = arguments[I]; var ne = { title: T, command: p }; return k.defined(w) && w.length > 0 && (ne.arguments = w), ne } g.create = S; function N(T) { var p = T; return k.defined(p) && k.string(p.title) && k.string(p.command) } g.is = N })(O = e.Command || (e.Command = {})); var L; (function (g) { function S(w, I) { return { range: w, newText: I } } g.replace = S; function N(w, I) { return { range: { start: w, end: w }, newText: I } } g.insert = N; function T(w) { return { range: w, newText: "" } } g.del = T; function p(w) { var I = w; return k.objectLiteral(I) && k.string(I.newText) && s.is(I.range) } g.is = p })(L = e.TextEdit || (e.TextEdit = {})); var W; (function (g) { function S(T, p, w) { var I = { label: T }; return p !== void 0 && (I.needsConfirmation = p), w !== void 0 && (I.description = w), I } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && k.string(p.label) && (k.boolean(p.needsConfirmation) || p.needsConfirmation === void 0) && (k.string(p.description) || p.description === void 0) } g.is = N })(W = e.ChangeAnnotation || (e.ChangeAnnotation = {})); var Z; (function (g) { function S(N) { var T = N; return k.string(T) } g.is = S })(Z = e.ChangeAnnotationIdentifier || (e.ChangeAnnotationIdentifier = {})); var ke; (function (g) { function S(w, I, ne) { return { range: w, newText: I, annotationId: ne } } g.replace = S; function N(w, I, ne) { return { range: { start: w, end: w }, newText: I, annotationId: ne } } g.insert = N; function T(w, I) { return { range: w, newText: "", annotationId: I } } g.del = T; function p(w) { var I = w; return L.is(I) && (W.is(I.annotationId) || Z.is(I.annotationId)) } g.is = p })(ke = e.AnnotatedTextEdit || (e.AnnotatedTextEdit = {})); var we; (function (g) { function S(T, p) { return { textDocument: T, edits: p } } g.create = S; function N(T) { var p = T; return k.defined(p) && J.is(p.textDocument) && Array.isArray(p.edits) } g.is = N })(we = e.TextDocumentEdit || (e.TextDocumentEdit = {})); var Je; (function (g) { function S(T, p, w) { var I = { kind: "create", uri: T }; return p !== void 0 && (p.overwrite !== void 0 || p.ignoreIfExists !== void 0) && (I.options = p), w !== void 0 && (I.annotationId = w), I } g.create = S; function N(T) { var p = T; return p && p.kind === "create" && k.string(p.uri) && (p.options === void 0 || (p.options.overwrite === void 0 || k.boolean(p.options.overwrite)) && (p.options.ignoreIfExists === void 0 || k.boolean(p.options.ignoreIfExists))) && (p.annotationId === void 0 || Z.is(p.annotationId)) } g.is = N })(Je = e.CreateFile || (e.CreateFile = {})); var K; (function (g) { function S(T, p, w, I) { var ne = { kind: "rename", oldUri: T, newUri: p }; return w !== void 0 && (w.overwrite !== void 0 || w.ignoreIfExists !== void 0) && (ne.options = w), I !== void 0 && (ne.annotationId = I), ne } g.create = S; function N(T) { var p = T; return p && p.kind === "rename" && k.string(p.oldUri) && k.string(p.newUri) && (p.options === void 0 || (p.options.overwrite === void 0 || k.boolean(p.options.overwrite)) && (p.options.ignoreIfExists === void 0 || k.boolean(p.options.ignoreIfExists))) && (p.annotationId === void 0 || Z.is(p.annotationId)) } g.is = N })(K = e.RenameFile || (e.RenameFile = {})); var le; (function (g) { function S(T, p, w) { var I = { kind: "delete", uri: T }; return p !== void 0 && (p.recursive !== void 0 || p.ignoreIfNotExists !== void 0) && (I.options = p), w !== void 0 && (I.annotationId = w), I } g.create = S; function N(T) { var p = T; return p && p.kind === "delete" && k.string(p.uri) && (p.options === void 0 || (p.options.recursive === void 0 || k.boolean(p.options.recursive)) && (p.options.ignoreIfNotExists === void 0 || k.boolean(p.options.ignoreIfNotExists))) && (p.annotationId === void 0 || Z.is(p.annotationId)) } g.is = N })(le = e.DeleteFile || (e.DeleteFile = {})); var M; (function (g) { function S(N) { var T = N; return T && (T.changes !== void 0 || T.documentChanges !== void 0) && (T.documentChanges === void 0 || T.documentChanges.every(function (p) { return k.string(p.kind) ? Je.is(p) || K.is(p) || le.is(p) : we.is(p) })) } g.is = S })(M = e.WorkspaceEdit || (e.WorkspaceEdit = {})); var q = function () { function g(S, N) { this.edits = S, this.changeAnnotations = N } return g.prototype.insert = function (S, N, T) { var p, w; if (T === void 0 ? p = L.insert(S, N) : Z.is(T) ? (w = T, p = ke.insert(S, N, T)) : (this.assertChangeAnnotations(this.changeAnnotations), w = this.changeAnnotations.manage(T), p = ke.insert(S, N, w)), this.edits.push(p), w !== void 0) return w }, g.prototype.replace = function (S, N, T) { var p, w; if (T === void 0 ? p = L.replace(S, N) : Z.is(T) ? (w = T, p = ke.replace(S, N, T)) : (this.assertChangeAnnotations(this.changeAnnotations), w = this.changeAnnotations.manage(T), p = ke.replace(S, N, w)), this.edits.push(p), w !== void 0) return w }, g.prototype.delete = function (S, N) { var T, p; if (N === void 0 ? T = L.del(S) : Z.is(N) ? (p = N, T = ke.del(S, N)) : (this.assertChangeAnnotations(this.changeAnnotations), p = this.changeAnnotations.manage(N), T = ke.del(S, p)), this.edits.push(T), p !== void 0) return p }, g.prototype.add = function (S) { this.edits.push(S) }, g.prototype.all = function () { return this.edits }, g.prototype.clear = function () { this.edits.splice(0, this.edits.length) }, g.prototype.assertChangeAnnotations = function (S) { if (S === void 0) throw new Error("Text edit change is not configured to manage change annotations.") }, g }(), F = function () { function g(S) { this._annotations = S === void 0 ? Object.create(null) : S, this._counter = 0, this._size = 0 } return g.prototype.all = function () { return this._annotations }, Object.defineProperty(g.prototype, "size", { get: function () { return this._size }, enumerable: !1, configurable: !0 }), g.prototype.manage = function (S, N) { var T; if (Z.is(S) ? T = S : (T = this.nextId(), N = S), this._annotations[T] !== void 0) throw new Error("Id ".concat(T, " is already in use.")); if (N === void 0) throw new Error("No annotation provided for id ".concat(T)); return this._annotations[T] = N, this._size++, T }, g.prototype.nextId = function () { return this._counter++, this._counter.toString() }, g }(), B = function () { function g(S) { var N = this; this._textEditChanges = Object.create(null), S !== void 0 ? (this._workspaceEdit = S, S.documentChanges ? (this._changeAnnotations = new F(S.changeAnnotations), S.changeAnnotations = this._changeAnnotations.all(), S.documentChanges.forEach(function (T) { if (we.is(T)) { var p = new q(T.edits, N._changeAnnotations); N._textEditChanges[T.textDocument.uri] = p } })) : S.changes && Object.keys(S.changes).forEach(function (T) { var p = new q(S.changes[T]); N._textEditChanges[T] = p })) : this._workspaceEdit = {} } return Object.defineProperty(g.prototype, "edit", { get: function () { return this.initDocumentChanges(), this._changeAnnotations !== void 0 && (this._changeAnnotations.size === 0 ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit }, enumerable: !1, configurable: !0 }), g.prototype.getTextEditChange = function (S) { if (J.is(S)) { if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes."); var N = { uri: S.uri, version: S.version }, T = this._textEditChanges[N.uri]; if (!T) { var p = [], w = { textDocument: N, edits: p }; this._workspaceEdit.documentChanges.push(w), T = new q(p, this._changeAnnotations), this._textEditChanges[N.uri] = T } return T } else { if (this.initChanges(), this._workspaceEdit.changes === void 0) throw new Error("Workspace edit is not configured for normal text edit changes."); var T = this._textEditChanges[S]; if (!T) { var p = []; this._workspaceEdit.changes[S] = p, T = new q(p), this._textEditChanges[S] = T } return T } }, g.prototype.initDocumentChanges = function () { this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._changeAnnotations = new F, this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()) }, g.prototype.initChanges = function () { this._workspaceEdit.documentChanges === void 0 && this._workspaceEdit.changes === void 0 && (this._workspaceEdit.changes = Object.create(null)) }, g.prototype.createFile = function (S, N, T) { if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes."); var p; W.is(N) || Z.is(N) ? p = N : T = N; var w, I; if (p === void 0 ? w = Je.create(S, T) : (I = Z.is(p) ? p : this._changeAnnotations.manage(p), w = Je.create(S, T, I)), this._workspaceEdit.documentChanges.push(w), I !== void 0) return I }, g.prototype.renameFile = function (S, N, T, p) { if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes."); var w; W.is(T) || Z.is(T) ? w = T : p = T; var I, ne; if (w === void 0 ? I = K.create(S, N, p) : (ne = Z.is(w) ? w : this._changeAnnotations.manage(w), I = K.create(S, N, p, ne)), this._workspaceEdit.documentChanges.push(I), ne !== void 0) return ne }, g.prototype.deleteFile = function (S, N, T) { if (this.initDocumentChanges(), this._workspaceEdit.documentChanges === void 0) throw new Error("Workspace edit is not configured for document changes."); var p; W.is(N) || Z.is(N) ? p = N : T = N; var w, I; if (p === void 0 ? w = le.create(S, T) : (I = Z.is(p) ? p : this._changeAnnotations.manage(p), w = le.create(S, T, I)), this._workspaceEdit.documentChanges.push(w), I !== void 0) return I }, g }(); e.WorkspaceChange = B; var ie; (function (g) { function S(T) { return { uri: T } } g.create = S; function N(T) { var p = T; return k.defined(p) && k.string(p.uri) } g.is = N })(ie = e.TextDocumentIdentifier || (e.TextDocumentIdentifier = {})); var oe; (function (g) { function S(T, p) { return { uri: T, version: p } } g.create = S; function N(T) { var p = T; return k.defined(p) && k.string(p.uri) && k.integer(p.version) } g.is = N })(oe = e.VersionedTextDocumentIdentifier || (e.VersionedTextDocumentIdentifier = {})); var J; (function (g) { function S(T, p) { return { uri: T, version: p } } g.create = S; function N(T) { var p = T; return k.defined(p) && k.string(p.uri) && (p.version === null || k.integer(p.version)) } g.is = N })(J = e.OptionalVersionedTextDocumentIdentifier || (e.OptionalVersionedTextDocumentIdentifier = {})); var dt; (function (g) { function S(T, p, w, I) { return { uri: T, languageId: p, version: w, text: I } } g.create = S; function N(T) { var p = T; return k.defined(p) && k.string(p.uri) && k.string(p.languageId) && k.integer(p.version) && k.string(p.text) } g.is = N })(dt = e.TextDocumentItem || (e.TextDocumentItem = {})); var rt; (function (g) { g.PlainText = "plaintext", g.Markdown = "markdown"; function S(N) { var T = N; return T === g.PlainText || T === g.Markdown } g.is = S })(rt = e.MarkupKind || (e.MarkupKind = {})); var Dt; (function (g) { function S(N) { var T = N; return k.objectLiteral(N) && rt.is(T.kind) && k.string(T.value) } g.is = S })(Dt = e.MarkupContent || (e.MarkupContent = {})); var tn; (function (g) { g.Text = 1, g.Method = 2, g.Function = 3, g.Constructor = 4, g.Field = 5, g.Variable = 6, g.Class = 7, g.Interface = 8, g.Module = 9, g.Property = 10, g.Unit = 11, g.Value = 12, g.Enum = 13, g.Keyword = 14, g.Snippet = 15, g.Color = 16, g.File = 17, g.Reference = 18, g.Folder = 19, g.EnumMember = 20, g.Constant = 21, g.Struct = 22, g.Event = 23, g.Operator = 24, g.TypeParameter = 25 })(tn = e.CompletionItemKind || (e.CompletionItemKind = {})); var Er; (function (g) { g.PlainText = 1, g.Snippet = 2 })(Er = e.InsertTextFormat || (e.InsertTextFormat = {})); var ba; (function (g) { g.Deprecated = 1 })(ba = e.CompletionItemTag || (e.CompletionItemTag = {})); var ar; (function (g) { function S(T, p, w) { return { newText: T, insert: p, replace: w } } g.create = S; function N(T) { var p = T; return p && k.string(p.newText) && s.is(p.insert) && s.is(p.replace) } g.is = N })(ar = e.InsertReplaceEdit || (e.InsertReplaceEdit = {})); var Aa; (function (g) { g.asIs = 1, g.adjustIndentation = 2 })(Aa = e.InsertTextMode || (e.InsertTextMode = {})); var Pa; (function (g) { function S(N) { var T = N; return T && (k.string(T.detail) || T.detail === void 0) && (k.string(T.description) || T.description === void 0) } g.is = S })(Pa = e.CompletionItemLabelDetails || (e.CompletionItemLabelDetails = {})); var Sa; (function (g) { function S(N) { return { label: N } } g.create = S })(Sa = e.CompletionItem || (e.CompletionItem = {})); var vu; (function (g) { function S(N, T) { return { items: N || [], isIncomplete: !!T } } g.create = S })(vu = e.CompletionList || (e.CompletionList = {})); var gt; (function (g) { function S(T) { return T.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&") } g.fromPlainText = S; function N(T) { var p = T; return k.string(p) || k.objectLiteral(p) && k.string(p.language) && k.string(p.value) } g.is = N })(gt = e.MarkedString || (e.MarkedString = {})); var pi; (function (g) { function S(N) { var T = N; return !!T && k.objectLiteral(T) && (Dt.is(T.contents) || gt.is(T.contents) || k.typedArray(T.contents, gt.is)) && (N.range === void 0 || s.is(N.range)) } g.is = S })(pi = e.Hover || (e.Hover = {})); var _u; (function (g) { function S(N, T) { return T ? { label: N, documentation: T } : { label: N } } g.create = S })(_u = e.ParameterInformation || (e.ParameterInformation = {})); var Dn; (function (g) { function S(N, T) { for (var p = [], w = 2; w < arguments.length; w++)p[w - 2] = arguments[w]; var I = { label: N }; return k.defined(T) && (I.documentation = T), k.defined(p) ? I.parameters = p : I.parameters = [], I } g.create = S })(Dn = e.SignatureInformation || (e.SignatureInformation = {})); var xo; (function (g) { g.Text = 1, g.Read = 2, g.Write = 3 })(xo = e.DocumentHighlightKind || (e.DocumentHighlightKind = {})); var In; (function (g) { function S(N, T) { var p = { range: N }; return k.number(T) && (p.kind = T), p } g.create = S })(In = e.DocumentHighlight || (e.DocumentHighlight = {})); var qo; (function (g) { g.File = 1, g.Module = 2, g.Namespace = 3, g.Package = 4, g.Class = 5, g.Method = 6, g.Property = 7, g.Field = 8, g.Constructor = 9, g.Enum = 10, g.Interface = 11, g.Function = 12, g.Variable = 13, g.Constant = 14, g.String = 15, g.Number = 16, g.Boolean = 17, g.Array = 18, g.Object = 19, g.Key = 20, g.Null = 21, g.EnumMember = 22, g.Struct = 23, g.Event = 24, g.Operator = 25, g.TypeParameter = 26 })(qo = e.SymbolKind || (e.SymbolKind = {})); var Mr; (function (g) { g.Deprecated = 1 })(Mr = e.SymbolTag || (e.SymbolTag = {})); var rn; (function (g) { function S(N, T, p, w, I) { var ne = { name: N, kind: T, location: { uri: w, range: p } }; return I && (ne.containerName = I), ne } g.create = S })(rn = e.SymbolInformation || (e.SymbolInformation = {})); var Ca; (function (g) { function S(N, T, p, w) { return w !== void 0 ? { name: N, kind: T, location: { uri: p, range: w } } : { name: N, kind: T, location: { uri: p } } } g.create = S })(Ca = e.WorkspaceSymbol || (e.WorkspaceSymbol = {})); var Ea; (function (g) { function S(T, p, w, I, ne, ft) { var Ke = { name: T, detail: p, kind: w, range: I, selectionRange: ne }; return ft !== void 0 && (Ke.children = ft), Ke } g.create = S; function N(T) { var p = T; return p && k.string(p.name) && k.number(p.kind) && s.is(p.range) && s.is(p.selectionRange) && (p.detail === void 0 || k.string(p.detail)) && (p.deprecated === void 0 || k.boolean(p.deprecated)) && (p.children === void 0 || Array.isArray(p.children)) && (p.tags === void 0 || Array.isArray(p.tags)) } g.is = N })(Ea = e.DocumentSymbol || (e.DocumentSymbol = {})); var Nr; (function (g) { g.Empty = "", g.QuickFix = "quickfix", g.Refactor = "refactor", g.RefactorExtract = "refactor.extract", g.RefactorInline = "refactor.inline", g.RefactorRewrite = "refactor.rewrite", g.Source = "source", g.SourceOrganizeImports = "source.organizeImports", g.SourceFixAll = "source.fixAll" })(Nr = e.CodeActionKind || (e.CodeActionKind = {})); var xn; (function (g) { g.Invoked = 1, g.Automatic = 2 })(xn = e.CodeActionTriggerKind || (e.CodeActionTriggerKind = {})); var Lt; (function (g) { function S(T, p, w) { var I = { diagnostics: T }; return p != null && (I.only = p), w != null && (I.triggerKind = w), I } g.create = S; function N(T) { var p = T; return k.defined(p) && k.typedArray(p.diagnostics, b.is) && (p.only === void 0 || k.typedArray(p.only, k.string)) && (p.triggerKind === void 0 || p.triggerKind === xn.Invoked || p.triggerKind === xn.Automatic) } g.is = N })(Lt = e.CodeActionContext || (e.CodeActionContext = {})); var nn; (function (g) { function S(T, p, w) { var I = { title: T }, ne = !0; return typeof p == "string" ? (ne = !1, I.kind = p) : O.is(p) ? I.command = p : I.edit = p, ne && w !== void 0 && (I.kind = w), I } g.create = S; function N(T) { var p = T; return p && k.string(p.title) && (p.diagnostics === void 0 || k.typedArray(p.diagnostics, b.is)) && (p.kind === void 0 || k.string(p.kind)) && (p.edit !== void 0 || p.command !== void 0) && (p.command === void 0 || O.is(p.command)) && (p.isPreferred === void 0 || k.boolean(p.isPreferred)) && (p.edit === void 0 || M.is(p.edit)) } g.is = N })(nn = e.CodeAction || (e.CodeAction = {})); var on; (function (g) { function S(T, p) { var w = { range: T }; return k.defined(p) && (w.data = p), w } g.create = S; function N(T) { var p = T; return k.defined(p) && s.is(p.range) && (k.undefined(p.command) || O.is(p.command)) } g.is = N })(on = e.CodeLens || (e.CodeLens = {})); var qn; (function (g) { function S(T, p) { return { tabSize: T, insertSpaces: p } } g.create = S; function N(T) { var p = T; return k.defined(p) && k.uinteger(p.tabSize) && k.boolean(p.insertSpaces) } g.is = N })(qn = e.FormattingOptions || (e.FormattingOptions = {})); var P; (function (g) { function S(T, p, w) { return { range: T, target: p, data: w } } g.create = S; function N(T) { var p = T; return k.defined(p) && s.is(p.range) && (k.undefined(p.target) || k.string(p.target)) } g.is = N })(P = e.DocumentLink || (e.DocumentLink = {})); var x; (function (g) { function S(T, p) { return { range: T, parent: p } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && s.is(p.range) && (p.parent === void 0 || g.is(p.parent)) } g.is = N })(x = e.SelectionRange || (e.SelectionRange = {})); var j; (function (g) { g.namespace = "namespace", g.type = "type", g.class = "class", g.enum = "enum", g.interface = "interface", g.struct = "struct", g.typeParameter = "typeParameter", g.parameter = "parameter", g.variable = "variable", g.property = "property", g.enumMember = "enumMember", g.event = "event", g.function = "function", g.method = "method", g.macro = "macro", g.keyword = "keyword", g.modifier = "modifier", g.comment = "comment", g.string = "string", g.number = "number", g.regexp = "regexp", g.operator = "operator", g.decorator = "decorator" })(j = e.SemanticTokenTypes || (e.SemanticTokenTypes = {})); var z; (function (g) { g.declaration = "declaration", g.definition = "definition", g.readonly = "readonly", g.static = "static", g.deprecated = "deprecated", g.abstract = "abstract", g.async = "async", g.modification = "modification", g.documentation = "documentation", g.defaultLibrary = "defaultLibrary" })(z = e.SemanticTokenModifiers || (e.SemanticTokenModifiers = {})); var je; (function (g) { function S(N) { var T = N; return k.objectLiteral(T) && (T.resultId === void 0 || typeof T.resultId == "string") && Array.isArray(T.data) && (T.data.length === 0 || typeof T.data[0] == "number") } g.is = S })(je = e.SemanticTokens || (e.SemanticTokens = {})); var Ue; (function (g) { function S(T, p) { return { range: T, text: p } } g.create = S; function N(T) { var p = T; return p != null && s.is(p.range) && k.string(p.text) } g.is = N })(Ue = e.InlineValueText || (e.InlineValueText = {})); var nt; (function (g) { function S(T, p, w) { return { range: T, variableName: p, caseSensitiveLookup: w } } g.create = S; function N(T) { var p = T; return p != null && s.is(p.range) && k.boolean(p.caseSensitiveLookup) && (k.string(p.variableName) || p.variableName === void 0) } g.is = N })(nt = e.InlineValueVariableLookup || (e.InlineValueVariableLookup = {})); var Tt; (function (g) { function S(T, p) { return { range: T, expression: p } } g.create = S; function N(T) { var p = T; return p != null && s.is(p.range) && (k.string(p.expression) || p.expression === void 0) } g.is = N })(Tt = e.InlineValueEvaluatableExpression || (e.InlineValueEvaluatableExpression = {})); var ge; (function (g) { function S(T, p) { return { frameId: T, stoppedLocation: p } } g.create = S; function N(T) { var p = T; return k.defined(p) && s.is(T.stoppedLocation) } g.is = N })(ge = e.InlineValueContext || (e.InlineValueContext = {})); var Be; (function (g) { g.Type = 1, g.Parameter = 2; function S(N) { return N === 1 || N === 2 } g.is = S })(Be = e.InlayHintKind || (e.InlayHintKind = {})); var _e; (function (g) { function S(T) { return { value: T } } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && (p.tooltip === void 0 || k.string(p.tooltip) || Dt.is(p.tooltip)) && (p.location === void 0 || u.is(p.location)) && (p.command === void 0 || O.is(p.command)) } g.is = N })(_e = e.InlayHintLabelPart || (e.InlayHintLabelPart = {})); var yt; (function (g) { function S(T, p, w) { var I = { position: T, label: p }; return w !== void 0 && (I.kind = w), I } g.create = S; function N(T) { var p = T; return k.objectLiteral(p) && a.is(p.position) && (k.string(p.label) || k.typedArray(p.label, _e.is)) && (p.kind === void 0 || Be.is(p.kind)) && p.textEdits === void 0 || k.typedArray(p.textEdits, L.is) && (p.tooltip === void 0 || k.string(p.tooltip) || Dt.is(p.tooltip)) && (p.paddingLeft === void 0 || k.boolean(p.paddingLeft)) && (p.paddingRight === void 0 || k.boolean(p.paddingRight)) } g.is = N })(yt = e.InlayHint || (e.InlayHint = {})); var Jt; (function (g) { function S(N) { var T = N; return k.objectLiteral(T) && n.is(T.uri) && k.string(T.name) } g.is = S })(Jt = e.WorkspaceFolder || (e.WorkspaceFolder = {})), e.EOL = [`
`, `\r
`, "\r"]; var hi; (function (g) { function S(w, I, ne, ft) { return new Ln(w, I, ne, ft) } g.create = S; function N(w) { var I = w; return !!(k.defined(I) && k.string(I.uri) && (k.undefined(I.languageId) || k.string(I.languageId)) && k.uinteger(I.lineCount) && k.func(I.getText) && k.func(I.positionAt) && k.func(I.offsetAt)) } g.is = N; function T(w, I) { for (var ne = w.getText(), ft = p(I, function (Na, ol) { var AR = Na.range.start.line - ol.range.start.line; return AR === 0 ? Na.range.start.character - ol.range.start.character : AR }), Ke = ne.length, an = ft.length - 1; an >= 0; an--) { var sn = ft[an], mi = w.offsetAt(sn.range.start), ye = w.offsetAt(sn.range.end); if (ye <= Ke) ne = ne.substring(0, mi) + sn.newText + ne.substring(ye, ne.length); else throw new Error("Overlapping edit"); Ke = mi } return ne } g.applyEdits = T; function p(w, I) { if (w.length <= 1) return w; var ne = w.length / 2 | 0, ft = w.slice(0, ne), Ke = w.slice(ne); p(ft, I), p(Ke, I); for (var an = 0, sn = 0, mi = 0; an < ft.length && sn < Ke.length;) { var ye = I(ft[an], Ke[sn]); ye <= 0 ? w[mi++] = ft[an++] : w[mi++] = Ke[sn++] } for (; an < ft.length;)w[mi++] = ft[an++]; for (; sn < Ke.length;)w[mi++] = Ke[sn++]; return w } })(hi = e.TextDocument || (e.TextDocument = {})); var Ln = function () {
        function g(S, N, T, p) { this._uri = S, this._languageId = N, this._version = T, this._content = p, this._lineOffsets = void 0 } return Object.defineProperty(g.prototype, "uri", { get: function () { return this._uri }, enumerable: !1, configurable: !0 }), Object.defineProperty(g.prototype, "languageId", { get: function () { return this._languageId }, enumerable: !1, configurable: !0 }), Object.defineProperty(g.prototype, "version", { get: function () { return this._version }, enumerable: !1, configurable: !0 }), g.prototype.getText = function (S) { if (S) { var N = this.offsetAt(S.start), T = this.offsetAt(S.end); return this._content.substring(N, T) } return this._content }, g.prototype.update = function (S, N) { this._content = S.text, this._version = N, this._lineOffsets = void 0 }, g.prototype.getLineOffsets = function () {
          if (this._lineOffsets === void 0) {
            for (var S = [], N = this._content, T = !0, p = 0; p < N.length; p++) {
              T && (S.push(p), T = !1); var w = N.charAt(p); T = w === "\r" || w === `
`, w === "\r" && p + 1 < N.length && N.charAt(p + 1) === `
`&& p++
            } T && N.length > 0 && S.push(N.length), this._lineOffsets = S
          } return this._lineOffsets
        }, g.prototype.positionAt = function (S) { S = Math.max(Math.min(S, this._content.length), 0); var N = this.getLineOffsets(), T = 0, p = N.length; if (p === 0) return a.create(0, S); for (; T < p;) { var w = Math.floor((T + p) / 2); N[w] > S ? p = w : T = w + 1 } var I = T - 1; return a.create(I, S - N[I]) }, g.prototype.offsetAt = function (S) { var N = this.getLineOffsets(); if (S.line >= N.length) return this._content.length; if (S.line < 0) return 0; var T = N[S.line], p = S.line + 1 < N.length ? N[S.line + 1] : this._content.length; return Math.max(Math.min(T + S.character, p), T) }, Object.defineProperty(g.prototype, "lineCount", { get: function () { return this.getLineOffsets().length }, enumerable: !1, configurable: !0 }), g
      }(), k; (function (g) { var S = Object.prototype.toString; function N(ye) { return typeof ye < "u" } g.defined = N; function T(ye) { return typeof ye > "u" } g.undefined = T; function p(ye) { return ye === !0 || ye === !1 } g.boolean = p; function w(ye) { return S.call(ye) === "[object String]" } g.string = w; function I(ye) { return S.call(ye) === "[object Number]" } g.number = I; function ne(ye, Na, ol) { return S.call(ye) === "[object Number]" && Na <= ye && ye <= ol } g.numberRange = ne; function ft(ye) { return S.call(ye) === "[object Number]" && -2147483648 <= ye && ye <= 2147483647 } g.integer = ft; function Ke(ye) { return S.call(ye) === "[object Number]" && 0 <= ye && ye <= 2147483647 } g.uinteger = Ke; function an(ye) { return S.call(ye) === "[object Function]" } g.func = an; function sn(ye) { return ye !== null && typeof ye == "object" } g.objectLiteral = sn; function mi(ye, Na) { return Array.isArray(ye) && ye.every(Na) } g.typedArray = mi })(k || (k = {}))
    })
  }); var ct = f(ur => { "use strict"; Object.defineProperty(ur, "__esModule", { value: !0 }); ur.ProtocolNotificationType = ur.ProtocolNotificationType0 = ur.ProtocolRequestType = ur.ProtocolRequestType0 = ur.RegistrationType = ur.MessageDirection = void 0; var La = Ti(), b$; (function (t) { t.clientToServer = "clientToServer", t.serverToClient = "serverToClient", t.both = "both" })(b$ = ur.MessageDirection || (ur.MessageDirection = {})); var Rm = class { constructor(e) { this.method = e } }; ur.RegistrationType = Rm; var bm = class extends La.RequestType0 { constructor(e) { super(e) } }; ur.ProtocolRequestType0 = bm; var Am = class extends La.RequestType { constructor(e) { super(e, La.ParameterStructures.byName) } }; ur.ProtocolRequestType = Am; var Pm = class extends La.NotificationType0 { constructor(e) { super(e) } }; ur.ProtocolNotificationType0 = Pm; var Sm = class extends La.NotificationType { constructor(e) { super(e, La.ParameterStructures.byName) } }; ur.ProtocolNotificationType = Sm }); var ml = f(Rt => { "use strict"; Object.defineProperty(Rt, "__esModule", { value: !0 }); Rt.objectLiteral = Rt.typedArray = Rt.stringArray = Rt.array = Rt.func = Rt.error = Rt.number = Rt.string = Rt.boolean = void 0; function A$(t) { return t === !0 || t === !1 } Rt.boolean = A$; function VR(t) { return typeof t == "string" || t instanceof String } Rt.string = VR; function P$(t) { return typeof t == "number" || t instanceof Number } Rt.number = P$; function S$(t) { return t instanceof Error } Rt.error = S$; function C$(t) { return typeof t == "function" } Rt.func = C$; function YR(t) { return Array.isArray(t) } Rt.array = YR; function E$(t) { return YR(t) && t.every(e => VR(e)) } Rt.stringArray = E$; function N$(t, e) { return Array.isArray(t) && t.every(e) } Rt.typedArray = N$; function k$(t) { return t !== null && typeof t == "object" } Rt.objectLiteral = k$ }); var JR = f(Cu => { "use strict"; Object.defineProperty(Cu, "__esModule", { value: !0 }); Cu.ImplementationRequest = void 0; var XR = ct(), w$; (function (t) { t.method = "textDocument/implementation", t.messageDirection = XR.MessageDirection.clientToServer, t.type = new XR.ProtocolRequestType(t.method) })(w$ = Cu.ImplementationRequest || (Cu.ImplementationRequest = {})) }); var ZR = f(Eu => { "use strict"; Object.defineProperty(Eu, "__esModule", { value: !0 }); Eu.TypeDefinitionRequest = void 0; var QR = ct(), O$; (function (t) { t.method = "textDocument/typeDefinition", t.messageDirection = QR.MessageDirection.clientToServer, t.type = new QR.ProtocolRequestType(t.method) })(O$ = Eu.TypeDefinitionRequest || (Eu.TypeDefinitionRequest = {})) }); var e0 = f(zi => { "use strict"; Object.defineProperty(zi, "__esModule", { value: !0 }); zi.DidChangeWorkspaceFoldersNotification = zi.WorkspaceFoldersRequest = void 0; var gl = ct(), D$; (function (t) { t.method = "workspace/workspaceFolders", t.messageDirection = gl.MessageDirection.serverToClient, t.type = new gl.ProtocolRequestType0(t.method) })(D$ = zi.WorkspaceFoldersRequest || (zi.WorkspaceFoldersRequest = {})); var I$; (function (t) { t.method = "workspace/didChangeWorkspaceFolders", t.messageDirection = gl.MessageDirection.clientToServer, t.type = new gl.ProtocolNotificationType(t.method) })(I$ = zi.DidChangeWorkspaceFoldersNotification || (zi.DidChangeWorkspaceFoldersNotification = {})) }); var r0 = f(Nu => { "use strict"; Object.defineProperty(Nu, "__esModule", { value: !0 }); Nu.ConfigurationRequest = void 0; var t0 = ct(), x$; (function (t) { t.method = "workspace/configuration", t.messageDirection = t0.MessageDirection.serverToClient, t.type = new t0.ProtocolRequestType(t.method) })(x$ = Nu.ConfigurationRequest || (Nu.ConfigurationRequest = {})) }); var n0 = f(Vi => { "use strict"; Object.defineProperty(Vi, "__esModule", { value: !0 }); Vi.ColorPresentationRequest = Vi.DocumentColorRequest = void 0; var yl = ct(), q$; (function (t) { t.method = "textDocument/documentColor", t.messageDirection = yl.MessageDirection.clientToServer, t.type = new yl.ProtocolRequestType(t.method) })(q$ = Vi.DocumentColorRequest || (Vi.DocumentColorRequest = {})); var L$; (function (t) { t.method = "textDocument/colorPresentation", t.messageDirection = yl.MessageDirection.clientToServer, t.type = new yl.ProtocolRequestType(t.method) })(L$ = Vi.ColorPresentationRequest || (Vi.ColorPresentationRequest = {})) }); var o0 = f(ku => { "use strict"; Object.defineProperty(ku, "__esModule", { value: !0 }); ku.FoldingRangeRequest = void 0; var i0 = ct(), M$; (function (t) { t.method = "textDocument/foldingRange", t.messageDirection = i0.MessageDirection.clientToServer, t.type = new i0.ProtocolRequestType(t.method) })(M$ = ku.FoldingRangeRequest || (ku.FoldingRangeRequest = {})) }); var s0 = f(wu => { "use strict"; Object.defineProperty(wu, "__esModule", { value: !0 }); wu.DeclarationRequest = void 0; var a0 = ct(), $$; (function (t) { t.method = "textDocument/declaration", t.messageDirection = a0.MessageDirection.clientToServer, t.type = new a0.ProtocolRequestType(t.method) })($$ = wu.DeclarationRequest || (wu.DeclarationRequest = {})) }); var c0 = f(Ou => { "use strict"; Object.defineProperty(Ou, "__esModule", { value: !0 }); Ou.SelectionRangeRequest = void 0; var u0 = ct(), F$; (function (t) { t.method = "textDocument/selectionRange", t.messageDirection = u0.MessageDirection.clientToServer, t.type = new u0.ProtocolRequestType(t.method) })(F$ = Ou.SelectionRangeRequest || (Ou.SelectionRangeRequest = {})) }); var l0 = f(ln => { "use strict"; Object.defineProperty(ln, "__esModule", { value: !0 }); ln.WorkDoneProgressCancelNotification = ln.WorkDoneProgressCreateRequest = ln.WorkDoneProgress = void 0; var j$ = Ti(), vl = ct(), U$; (function (t) { t.type = new j$.ProgressType; function e(r) { return r === t.type } t.is = e })(U$ = ln.WorkDoneProgress || (ln.WorkDoneProgress = {})); var G$; (function (t) { t.method = "window/workDoneProgress/create", t.messageDirection = vl.MessageDirection.serverToClient, t.type = new vl.ProtocolRequestType(t.method) })(G$ = ln.WorkDoneProgressCreateRequest || (ln.WorkDoneProgressCreateRequest = {})); var H$; (function (t) { t.method = "window/workDoneProgress/cancel", t.messageDirection = vl.MessageDirection.clientToServer, t.type = new vl.ProtocolNotificationType(t.method) })(H$ = ln.WorkDoneProgressCancelNotification || (ln.WorkDoneProgressCancelNotification = {})) }); var d0 = f(dn => { "use strict"; Object.defineProperty(dn, "__esModule", { value: !0 }); dn.CallHierarchyOutgoingCallsRequest = dn.CallHierarchyIncomingCallsRequest = dn.CallHierarchyPrepareRequest = void 0; var Ma = ct(), W$; (function (t) { t.method = "textDocument/prepareCallHierarchy", t.messageDirection = Ma.MessageDirection.clientToServer, t.type = new Ma.ProtocolRequestType(t.method) })(W$ = dn.CallHierarchyPrepareRequest || (dn.CallHierarchyPrepareRequest = {})); var B$; (function (t) { t.method = "callHierarchy/incomingCalls", t.messageDirection = Ma.MessageDirection.clientToServer, t.type = new Ma.ProtocolRequestType(t.method) })(B$ = dn.CallHierarchyIncomingCallsRequest || (dn.CallHierarchyIncomingCallsRequest = {})); var K$; (function (t) { t.method = "callHierarchy/outgoingCalls", t.messageDirection = Ma.MessageDirection.clientToServer, t.type = new Ma.ProtocolRequestType(t.method) })(K$ = dn.CallHierarchyOutgoingCallsRequest || (dn.CallHierarchyOutgoingCallsRequest = {})) }); var f0 = f(bt => { "use strict"; Object.defineProperty(bt, "__esModule", { value: !0 }); bt.SemanticTokensRefreshRequest = bt.SemanticTokensRangeRequest = bt.SemanticTokensDeltaRequest = bt.SemanticTokensRequest = bt.SemanticTokensRegistrationType = bt.TokenFormat = void 0; var Ri = ct(), z$; (function (t) { t.Relative = "relative" })(z$ = bt.TokenFormat || (bt.TokenFormat = {})); var _l; (function (t) { t.method = "textDocument/semanticTokens", t.type = new Ri.RegistrationType(t.method) })(_l = bt.SemanticTokensRegistrationType || (bt.SemanticTokensRegistrationType = {})); var V$; (function (t) { t.method = "textDocument/semanticTokens/full", t.messageDirection = Ri.MessageDirection.clientToServer, t.type = new Ri.ProtocolRequestType(t.method), t.registrationMethod = _l.method })(V$ = bt.SemanticTokensRequest || (bt.SemanticTokensRequest = {})); var Y$; (function (t) { t.method = "textDocument/semanticTokens/full/delta", t.messageDirection = Ri.MessageDirection.clientToServer, t.type = new Ri.ProtocolRequestType(t.method), t.registrationMethod = _l.method })(Y$ = bt.SemanticTokensDeltaRequest || (bt.SemanticTokensDeltaRequest = {})); var X$; (function (t) { t.method = "textDocument/semanticTokens/range", t.messageDirection = Ri.MessageDirection.clientToServer, t.type = new Ri.ProtocolRequestType(t.method), t.registrationMethod = _l.method })(X$ = bt.SemanticTokensRangeRequest || (bt.SemanticTokensRangeRequest = {})); var J$; (function (t) { t.method = "workspace/semanticTokens/refresh", t.messageDirection = Ri.MessageDirection.clientToServer, t.type = new Ri.ProtocolRequestType0(t.method) })(J$ = bt.SemanticTokensRefreshRequest || (bt.SemanticTokensRefreshRequest = {})) }); var h0 = f(Du => { "use strict"; Object.defineProperty(Du, "__esModule", { value: !0 }); Du.ShowDocumentRequest = void 0; var p0 = ct(), Q$; (function (t) { t.method = "window/showDocument", t.messageDirection = p0.MessageDirection.serverToClient, t.type = new p0.ProtocolRequestType(t.method) })(Q$ = Du.ShowDocumentRequest || (Du.ShowDocumentRequest = {})) }); var g0 = f(Iu => { "use strict"; Object.defineProperty(Iu, "__esModule", { value: !0 }); Iu.LinkedEditingRangeRequest = void 0; var m0 = ct(), Z$; (function (t) { t.method = "textDocument/linkedEditingRange", t.messageDirection = m0.MessageDirection.clientToServer, t.type = new m0.ProtocolRequestType(t.method) })(Z$ = Iu.LinkedEditingRangeRequest || (Iu.LinkedEditingRangeRequest = {})) }); var y0 = f(lt => { "use strict"; Object.defineProperty(lt, "__esModule", { value: !0 }); lt.WillDeleteFilesRequest = lt.DidDeleteFilesNotification = lt.DidRenameFilesNotification = lt.WillRenameFilesRequest = lt.DidCreateFilesNotification = lt.WillCreateFilesRequest = lt.FileOperationPatternKind = void 0; var $r = ct(), eF; (function (t) { t.file = "file", t.folder = "folder" })(eF = lt.FileOperationPatternKind || (lt.FileOperationPatternKind = {})); var tF; (function (t) { t.method = "workspace/willCreateFiles", t.messageDirection = $r.MessageDirection.clientToServer, t.type = new $r.ProtocolRequestType(t.method) })(tF = lt.WillCreateFilesRequest || (lt.WillCreateFilesRequest = {})); var rF; (function (t) { t.method = "workspace/didCreateFiles", t.messageDirection = $r.MessageDirection.clientToServer, t.type = new $r.ProtocolNotificationType(t.method) })(rF = lt.DidCreateFilesNotification || (lt.DidCreateFilesNotification = {})); var nF; (function (t) { t.method = "workspace/willRenameFiles", t.messageDirection = $r.MessageDirection.clientToServer, t.type = new $r.ProtocolRequestType(t.method) })(nF = lt.WillRenameFilesRequest || (lt.WillRenameFilesRequest = {})); var iF; (function (t) { t.method = "workspace/didRenameFiles", t.messageDirection = $r.MessageDirection.clientToServer, t.type = new $r.ProtocolNotificationType(t.method) })(iF = lt.DidRenameFilesNotification || (lt.DidRenameFilesNotification = {})); var oF; (function (t) { t.method = "workspace/didDeleteFiles", t.messageDirection = $r.MessageDirection.clientToServer, t.type = new $r.ProtocolNotificationType(t.method) })(oF = lt.DidDeleteFilesNotification || (lt.DidDeleteFilesNotification = {})); var aF; (function (t) { t.method = "workspace/willDeleteFiles", t.messageDirection = $r.MessageDirection.clientToServer, t.type = new $r.ProtocolRequestType(t.method) })(aF = lt.WillDeleteFilesRequest || (lt.WillDeleteFilesRequest = {})) }); var _0 = f(fn => { "use strict"; Object.defineProperty(fn, "__esModule", { value: !0 }); fn.MonikerRequest = fn.MonikerKind = fn.UniquenessLevel = void 0; var v0 = ct(), sF; (function (t) { t.document = "document", t.project = "project", t.group = "group", t.scheme = "scheme", t.global = "global" })(sF = fn.UniquenessLevel || (fn.UniquenessLevel = {})); var uF; (function (t) { t.$import = "import", t.$export = "export", t.local = "local" })(uF = fn.MonikerKind || (fn.MonikerKind = {})); var cF; (function (t) { t.method = "textDocument/moniker", t.messageDirection = v0.MessageDirection.clientToServer, t.type = new v0.ProtocolRequestType(t.method) })(cF = fn.MonikerRequest || (fn.MonikerRequest = {})) }); var T0 = f(pn => { "use strict"; Object.defineProperty(pn, "__esModule", { value: !0 }); pn.TypeHierarchySubtypesRequest = pn.TypeHierarchySupertypesRequest = pn.TypeHierarchyPrepareRequest = void 0; var $a = ct(), lF; (function (t) { t.method = "textDocument/prepareTypeHierarchy", t.messageDirection = $a.MessageDirection.clientToServer, t.type = new $a.ProtocolRequestType(t.method) })(lF = pn.TypeHierarchyPrepareRequest || (pn.TypeHierarchyPrepareRequest = {})); var dF; (function (t) { t.method = "typeHierarchy/supertypes", t.messageDirection = $a.MessageDirection.clientToServer, t.type = new $a.ProtocolRequestType(t.method) })(dF = pn.TypeHierarchySupertypesRequest || (pn.TypeHierarchySupertypesRequest = {})); var fF; (function (t) { t.method = "typeHierarchy/subtypes", t.messageDirection = $a.MessageDirection.clientToServer, t.type = new $a.ProtocolRequestType(t.method) })(fF = pn.TypeHierarchySubtypesRequest || (pn.TypeHierarchySubtypesRequest = {})) }); var R0 = f(Yi => { "use strict"; Object.defineProperty(Yi, "__esModule", { value: !0 }); Yi.InlineValueRefreshRequest = Yi.InlineValueRequest = void 0; var Tl = ct(), pF; (function (t) { t.method = "textDocument/inlineValue", t.messageDirection = Tl.MessageDirection.clientToServer, t.type = new Tl.ProtocolRequestType(t.method) })(pF = Yi.InlineValueRequest || (Yi.InlineValueRequest = {})); var hF; (function (t) { t.method = "workspace/inlineValue/refresh", t.messageDirection = Tl.MessageDirection.clientToServer, t.type = new Tl.ProtocolRequestType0(t.method) })(hF = Yi.InlineValueRefreshRequest || (Yi.InlineValueRefreshRequest = {})) }); var b0 = f(hn => { "use strict"; Object.defineProperty(hn, "__esModule", { value: !0 }); hn.InlayHintRefreshRequest = hn.InlayHintResolveRequest = hn.InlayHintRequest = void 0; var Fa = ct(), mF; (function (t) { t.method = "textDocument/inlayHint", t.messageDirection = Fa.MessageDirection.clientToServer, t.type = new Fa.ProtocolRequestType(t.method) })(mF = hn.InlayHintRequest || (hn.InlayHintRequest = {})); var gF; (function (t) { t.method = "inlayHint/resolve", t.messageDirection = Fa.MessageDirection.clientToServer, t.type = new Fa.ProtocolRequestType(t.method) })(gF = hn.InlayHintResolveRequest || (hn.InlayHintResolveRequest = {})); var yF; (function (t) { t.method = "workspace/inlayHint/refresh", t.messageDirection = Fa.MessageDirection.clientToServer, t.type = new Fa.ProtocolRequestType0(t.method) })(yF = hn.InlayHintRefreshRequest || (hn.InlayHintRefreshRequest = {})) }); var P0 = f(Bt => { "use strict"; Object.defineProperty(Bt, "__esModule", { value: !0 }); Bt.DiagnosticRefreshRequest = Bt.WorkspaceDiagnosticRequest = Bt.DocumentDiagnosticRequest = Bt.DocumentDiagnosticReportKind = Bt.DiagnosticServerCancellationData = void 0; var A0 = Ti(), vF = ml(), ja = ct(), _F; (function (t) { function e(r) { let n = r; return n && vF.boolean(n.retriggerRequest) } t.is = e })(_F = Bt.DiagnosticServerCancellationData || (Bt.DiagnosticServerCancellationData = {})); var TF; (function (t) { t.Full = "full", t.Unchanged = "unchanged" })(TF = Bt.DocumentDiagnosticReportKind || (Bt.DocumentDiagnosticReportKind = {})); var RF; (function (t) { t.method = "textDocument/diagnostic", t.messageDirection = ja.MessageDirection.clientToServer, t.type = new ja.ProtocolRequestType(t.method), t.partialResult = new A0.ProgressType })(RF = Bt.DocumentDiagnosticRequest || (Bt.DocumentDiagnosticRequest = {})); var bF; (function (t) { t.method = "workspace/diagnostic", t.messageDirection = ja.MessageDirection.clientToServer, t.type = new ja.ProtocolRequestType(t.method), t.partialResult = new A0.ProgressType })(bF = Bt.WorkspaceDiagnosticRequest || (Bt.WorkspaceDiagnosticRequest = {})); var AF; (function (t) { t.method = "workspace/diagnostic/refresh", t.messageDirection = ja.MessageDirection.clientToServer, t.type = new ja.ProtocolRequestType0(t.method) })(AF = Bt.DiagnosticRefreshRequest || (Bt.DiagnosticRefreshRequest = {})) }); var E0 = f(Re => { "use strict"; Object.defineProperty(Re, "__esModule", { value: !0 }); Re.DidCloseNotebookDocumentNotification = Re.DidSaveNotebookDocumentNotification = Re.DidChangeNotebookDocumentNotification = Re.NotebookCellArrayChange = Re.DidOpenNotebookDocumentNotification = Re.NotebookDocumentSyncRegistrationType = Re.NotebookDocument = Re.NotebookCell = Re.ExecutionSummary = Re.NotebookCellKind = void 0; var xu = qa(), mn = ml(), Mn = ct(), S0; (function (t) { t.Markup = 1, t.Code = 2; function e(r) { return r === 1 || r === 2 } t.is = e })(S0 = Re.NotebookCellKind || (Re.NotebookCellKind = {})); var C0; (function (t) { function e(i, o) { let a = { executionOrder: i }; return (o === !0 || o === !1) && (a.success = o), a } t.create = e; function r(i) { let o = i; return mn.objectLiteral(o) && xu.uinteger.is(o.executionOrder) && (o.success === void 0 || mn.boolean(o.success)) } t.is = r; function n(i, o) { return i === o ? !0 : i == null || o === null || o === void 0 ? !1 : i.executionOrder === o.executionOrder && i.success === o.success } t.equals = n })(C0 = Re.ExecutionSummary || (Re.ExecutionSummary = {})); var Cm; (function (t) { function e(o, a) { return { kind: o, document: a } } t.create = e; function r(o) { let a = o; return mn.objectLiteral(a) && S0.is(a.kind) && xu.DocumentUri.is(a.document) && (a.metadata === void 0 || mn.objectLiteral(a.metadata)) } t.is = r; function n(o, a) { let s = new Set; return o.document !== a.document && s.add("document"), o.kind !== a.kind && s.add("kind"), o.executionSummary !== a.executionSummary && s.add("executionSummary"), (o.metadata !== void 0 || a.metadata !== void 0) && !i(o.metadata, a.metadata) && s.add("metadata"), (o.executionSummary !== void 0 || a.executionSummary !== void 0) && !C0.equals(o.executionSummary, a.executionSummary) && s.add("executionSummary"), s } t.diff = n; function i(o, a) { if (o === a) return !0; if (o == null || a === null || a === void 0 || typeof o != typeof a || typeof o != "object") return !1; let s = Array.isArray(o), u = Array.isArray(a); if (s !== u) return !1; if (s && u) { if (o.length !== a.length) return !1; for (let c = 0; c < o.length; c++)if (!i(o[c], a[c])) return !1 } if (mn.objectLiteral(o) && mn.objectLiteral(a)) { let c = Object.keys(o), l = Object.keys(a); if (c.length !== l.length || (c.sort(), l.sort(), !i(c, l))) return !1; for (let d = 0; d < c.length; d++) { let h = c[d]; if (!i(o[h], a[h])) return !1 } } return !0 } })(Cm = Re.NotebookCell || (Re.NotebookCell = {})); var PF; (function (t) { function e(n, i, o, a) { return { uri: n, notebookType: i, version: o, cells: a } } t.create = e; function r(n) { let i = n; return mn.objectLiteral(i) && mn.string(i.uri) && xu.integer.is(i.version) && mn.typedArray(i.cells, Cm.is) } t.is = r })(PF = Re.NotebookDocument || (Re.NotebookDocument = {})); var qu; (function (t) { t.method = "notebookDocument/sync", t.messageDirection = Mn.MessageDirection.clientToServer, t.type = new Mn.RegistrationType(t.method) })(qu = Re.NotebookDocumentSyncRegistrationType || (Re.NotebookDocumentSyncRegistrationType = {})); var SF; (function (t) { t.method = "notebookDocument/didOpen", t.messageDirection = Mn.MessageDirection.clientToServer, t.type = new Mn.ProtocolNotificationType(t.method), t.registrationMethod = qu.method })(SF = Re.DidOpenNotebookDocumentNotification || (Re.DidOpenNotebookDocumentNotification = {})); var CF; (function (t) { function e(n) { let i = n; return mn.objectLiteral(i) && xu.uinteger.is(i.start) && xu.uinteger.is(i.deleteCount) && (i.cells === void 0 || mn.typedArray(i.cells, Cm.is)) } t.is = e; function r(n, i, o) { let a = { start: n, deleteCount: i }; return o !== void 0 && (a.cells = o), a } t.create = r })(CF = Re.NotebookCellArrayChange || (Re.NotebookCellArrayChange = {})); var EF; (function (t) { t.method = "notebookDocument/didChange", t.messageDirection = Mn.MessageDirection.clientToServer, t.type = new Mn.ProtocolNotificationType(t.method), t.registrationMethod = qu.method })(EF = Re.DidChangeNotebookDocumentNotification || (Re.DidChangeNotebookDocumentNotification = {})); var NF; (function (t) { t.method = "notebookDocument/didSave", t.messageDirection = Mn.MessageDirection.clientToServer, t.type = new Mn.ProtocolNotificationType(t.method), t.registrationMethod = qu.method })(NF = Re.DidSaveNotebookDocumentNotification || (Re.DidSaveNotebookDocumentNotification = {})); var kF; (function (t) { t.method = "notebookDocument/didClose", t.messageDirection = Mn.MessageDirection.clientToServer, t.type = new Mn.ProtocolNotificationType(t.method), t.registrationMethod = qu.method })(kF = Re.DidCloseNotebookDocumentNotification || (Re.DidCloseNotebookDocumentNotification = {})) }); var L0 = f(v => { "use strict"; Object.defineProperty(v, "__esModule", { value: !0 }); v.WorkspaceSymbolRequest = v.CodeActionResolveRequest = v.CodeActionRequest = v.DocumentSymbolRequest = v.DocumentHighlightRequest = v.ReferencesRequest = v.DefinitionRequest = v.SignatureHelpRequest = v.SignatureHelpTriggerKind = v.HoverRequest = v.CompletionResolveRequest = v.CompletionRequest = v.CompletionTriggerKind = v.PublishDiagnosticsNotification = v.WatchKind = v.RelativePattern = v.FileChangeType = v.DidChangeWatchedFilesNotification = v.WillSaveTextDocumentWaitUntilRequest = v.WillSaveTextDocumentNotification = v.TextDocumentSaveReason = v.DidSaveTextDocumentNotification = v.DidCloseTextDocumentNotification = v.DidChangeTextDocumentNotification = v.TextDocumentContentChangeEvent = v.DidOpenTextDocumentNotification = v.TextDocumentSyncKind = v.TelemetryEventNotification = v.LogMessageNotification = v.ShowMessageRequest = v.ShowMessageNotification = v.MessageType = v.DidChangeConfigurationNotification = v.ExitNotification = v.ShutdownRequest = v.InitializedNotification = v.InitializeErrorCodes = v.InitializeRequest = v.WorkDoneProgressOptions = v.TextDocumentRegistrationOptions = v.StaticRegistrationOptions = v.PositionEncodingKind = v.FailureHandlingKind = v.ResourceOperationKind = v.UnregistrationRequest = v.RegistrationRequest = v.DocumentSelector = v.NotebookCellTextDocumentFilter = v.NotebookDocumentFilter = v.TextDocumentFilter = void 0; v.TypeHierarchySubtypesRequest = v.TypeHierarchyPrepareRequest = v.MonikerRequest = v.MonikerKind = v.UniquenessLevel = v.WillDeleteFilesRequest = v.DidDeleteFilesNotification = v.WillRenameFilesRequest = v.DidRenameFilesNotification = v.WillCreateFilesRequest = v.DidCreateFilesNotification = v.FileOperationPatternKind = v.LinkedEditingRangeRequest = v.ShowDocumentRequest = v.SemanticTokensRegistrationType = v.SemanticTokensRefreshRequest = v.SemanticTokensRangeRequest = v.SemanticTokensDeltaRequest = v.SemanticTokensRequest = v.TokenFormat = v.CallHierarchyPrepareRequest = v.CallHierarchyOutgoingCallsRequest = v.CallHierarchyIncomingCallsRequest = v.WorkDoneProgressCancelNotification = v.WorkDoneProgressCreateRequest = v.WorkDoneProgress = v.SelectionRangeRequest = v.DeclarationRequest = v.FoldingRangeRequest = v.ColorPresentationRequest = v.DocumentColorRequest = v.ConfigurationRequest = v.DidChangeWorkspaceFoldersNotification = v.WorkspaceFoldersRequest = v.TypeDefinitionRequest = v.ImplementationRequest = v.ApplyWorkspaceEditRequest = v.ExecuteCommandRequest = v.PrepareRenameRequest = v.RenameRequest = v.PrepareSupportDefaultBehavior = v.DocumentOnTypeFormattingRequest = v.DocumentRangeFormattingRequest = v.DocumentFormattingRequest = v.DocumentLinkResolveRequest = v.DocumentLinkRequest = v.CodeLensRefreshRequest = v.CodeLensResolveRequest = v.CodeLensRequest = v.WorkspaceSymbolResolveRequest = void 0; v.DidCloseNotebookDocumentNotification = v.DidSaveNotebookDocumentNotification = v.DidChangeNotebookDocumentNotification = v.NotebookCellArrayChange = v.DidOpenNotebookDocumentNotification = v.NotebookDocumentSyncRegistrationType = v.NotebookDocument = v.NotebookCell = v.ExecutionSummary = v.NotebookCellKind = v.DiagnosticRefreshRequest = v.WorkspaceDiagnosticRequest = v.DocumentDiagnosticRequest = v.DocumentDiagnosticReportKind = v.DiagnosticServerCancellationData = v.InlayHintRefreshRequest = v.InlayHintResolveRequest = v.InlayHintRequest = v.InlineValueRefreshRequest = v.InlineValueRequest = v.TypeHierarchySupertypesRequest = void 0; var $ = ct(), N0 = qa(), Kt = ml(), wF = JR(); Object.defineProperty(v, "ImplementationRequest", { enumerable: !0, get: function () { return wF.ImplementationRequest } }); var OF = ZR(); Object.defineProperty(v, "TypeDefinitionRequest", { enumerable: !0, get: function () { return OF.TypeDefinitionRequest } }); var k0 = e0(); Object.defineProperty(v, "WorkspaceFoldersRequest", { enumerable: !0, get: function () { return k0.WorkspaceFoldersRequest } }); Object.defineProperty(v, "DidChangeWorkspaceFoldersNotification", { enumerable: !0, get: function () { return k0.DidChangeWorkspaceFoldersNotification } }); var DF = r0(); Object.defineProperty(v, "ConfigurationRequest", { enumerable: !0, get: function () { return DF.ConfigurationRequest } }); var w0 = n0(); Object.defineProperty(v, "DocumentColorRequest", { enumerable: !0, get: function () { return w0.DocumentColorRequest } }); Object.defineProperty(v, "ColorPresentationRequest", { enumerable: !0, get: function () { return w0.ColorPresentationRequest } }); var IF = o0(); Object.defineProperty(v, "FoldingRangeRequest", { enumerable: !0, get: function () { return IF.FoldingRangeRequest } }); var xF = s0(); Object.defineProperty(v, "DeclarationRequest", { enumerable: !0, get: function () { return xF.DeclarationRequest } }); var qF = c0(); Object.defineProperty(v, "SelectionRangeRequest", { enumerable: !0, get: function () { return qF.SelectionRangeRequest } }); var Em = l0(); Object.defineProperty(v, "WorkDoneProgress", { enumerable: !0, get: function () { return Em.WorkDoneProgress } }); Object.defineProperty(v, "WorkDoneProgressCreateRequest", { enumerable: !0, get: function () { return Em.WorkDoneProgressCreateRequest } }); Object.defineProperty(v, "WorkDoneProgressCancelNotification", { enumerable: !0, get: function () { return Em.WorkDoneProgressCancelNotification } }); var Nm = d0(); Object.defineProperty(v, "CallHierarchyIncomingCallsRequest", { enumerable: !0, get: function () { return Nm.CallHierarchyIncomingCallsRequest } }); Object.defineProperty(v, "CallHierarchyOutgoingCallsRequest", { enumerable: !0, get: function () { return Nm.CallHierarchyOutgoingCallsRequest } }); Object.defineProperty(v, "CallHierarchyPrepareRequest", { enumerable: !0, get: function () { return Nm.CallHierarchyPrepareRequest } }); var Ua = f0(); Object.defineProperty(v, "TokenFormat", { enumerable: !0, get: function () { return Ua.TokenFormat } }); Object.defineProperty(v, "SemanticTokensRequest", { enumerable: !0, get: function () { return Ua.SemanticTokensRequest } }); Object.defineProperty(v, "SemanticTokensDeltaRequest", { enumerable: !0, get: function () { return Ua.SemanticTokensDeltaRequest } }); Object.defineProperty(v, "SemanticTokensRangeRequest", { enumerable: !0, get: function () { return Ua.SemanticTokensRangeRequest } }); Object.defineProperty(v, "SemanticTokensRefreshRequest", { enumerable: !0, get: function () { return Ua.SemanticTokensRefreshRequest } }); Object.defineProperty(v, "SemanticTokensRegistrationType", { enumerable: !0, get: function () { return Ua.SemanticTokensRegistrationType } }); var LF = h0(); Object.defineProperty(v, "ShowDocumentRequest", { enumerable: !0, get: function () { return LF.ShowDocumentRequest } }); var MF = g0(); Object.defineProperty(v, "LinkedEditingRangeRequest", { enumerable: !0, get: function () { return MF.LinkedEditingRangeRequest } }); var jo = y0(); Object.defineProperty(v, "FileOperationPatternKind", { enumerable: !0, get: function () { return jo.FileOperationPatternKind } }); Object.defineProperty(v, "DidCreateFilesNotification", { enumerable: !0, get: function () { return jo.DidCreateFilesNotification } }); Object.defineProperty(v, "WillCreateFilesRequest", { enumerable: !0, get: function () { return jo.WillCreateFilesRequest } }); Object.defineProperty(v, "DidRenameFilesNotification", { enumerable: !0, get: function () { return jo.DidRenameFilesNotification } }); Object.defineProperty(v, "WillRenameFilesRequest", { enumerable: !0, get: function () { return jo.WillRenameFilesRequest } }); Object.defineProperty(v, "DidDeleteFilesNotification", { enumerable: !0, get: function () { return jo.DidDeleteFilesNotification } }); Object.defineProperty(v, "WillDeleteFilesRequest", { enumerable: !0, get: function () { return jo.WillDeleteFilesRequest } }); var km = _0(); Object.defineProperty(v, "UniquenessLevel", { enumerable: !0, get: function () { return km.UniquenessLevel } }); Object.defineProperty(v, "MonikerKind", { enumerable: !0, get: function () { return km.MonikerKind } }); Object.defineProperty(v, "MonikerRequest", { enumerable: !0, get: function () { return km.MonikerRequest } }); var wm = T0(); Object.defineProperty(v, "TypeHierarchyPrepareRequest", { enumerable: !0, get: function () { return wm.TypeHierarchyPrepareRequest } }); Object.defineProperty(v, "TypeHierarchySubtypesRequest", { enumerable: !0, get: function () { return wm.TypeHierarchySubtypesRequest } }); Object.defineProperty(v, "TypeHierarchySupertypesRequest", { enumerable: !0, get: function () { return wm.TypeHierarchySupertypesRequest } }); var O0 = R0(); Object.defineProperty(v, "InlineValueRequest", { enumerable: !0, get: function () { return O0.InlineValueRequest } }); Object.defineProperty(v, "InlineValueRefreshRequest", { enumerable: !0, get: function () { return O0.InlineValueRefreshRequest } }); var Om = b0(); Object.defineProperty(v, "InlayHintRequest", { enumerable: !0, get: function () { return Om.InlayHintRequest } }); Object.defineProperty(v, "InlayHintResolveRequest", { enumerable: !0, get: function () { return Om.InlayHintResolveRequest } }); Object.defineProperty(v, "InlayHintRefreshRequest", { enumerable: !0, get: function () { return Om.InlayHintRefreshRequest } }); var Lu = P0(); Object.defineProperty(v, "DiagnosticServerCancellationData", { enumerable: !0, get: function () { return Lu.DiagnosticServerCancellationData } }); Object.defineProperty(v, "DocumentDiagnosticReportKind", { enumerable: !0, get: function () { return Lu.DocumentDiagnosticReportKind } }); Object.defineProperty(v, "DocumentDiagnosticRequest", { enumerable: !0, get: function () { return Lu.DocumentDiagnosticRequest } }); Object.defineProperty(v, "WorkspaceDiagnosticRequest", { enumerable: !0, get: function () { return Lu.WorkspaceDiagnosticRequest } }); Object.defineProperty(v, "DiagnosticRefreshRequest", { enumerable: !0, get: function () { return Lu.DiagnosticRefreshRequest } }); var $n = E0(); Object.defineProperty(v, "NotebookCellKind", { enumerable: !0, get: function () { return $n.NotebookCellKind } }); Object.defineProperty(v, "ExecutionSummary", { enumerable: !0, get: function () { return $n.ExecutionSummary } }); Object.defineProperty(v, "NotebookCell", { enumerable: !0, get: function () { return $n.NotebookCell } }); Object.defineProperty(v, "NotebookDocument", { enumerable: !0, get: function () { return $n.NotebookDocument } }); Object.defineProperty(v, "NotebookDocumentSyncRegistrationType", { enumerable: !0, get: function () { return $n.NotebookDocumentSyncRegistrationType } }); Object.defineProperty(v, "DidOpenNotebookDocumentNotification", { enumerable: !0, get: function () { return $n.DidOpenNotebookDocumentNotification } }); Object.defineProperty(v, "NotebookCellArrayChange", { enumerable: !0, get: function () { return $n.NotebookCellArrayChange } }); Object.defineProperty(v, "DidChangeNotebookDocumentNotification", { enumerable: !0, get: function () { return $n.DidChangeNotebookDocumentNotification } }); Object.defineProperty(v, "DidSaveNotebookDocumentNotification", { enumerable: !0, get: function () { return $n.DidSaveNotebookDocumentNotification } }); Object.defineProperty(v, "DidCloseNotebookDocumentNotification", { enumerable: !0, get: function () { return $n.DidCloseNotebookDocumentNotification } }); var D0; (function (t) { function e(r) { let n = r; return Kt.string(n.language) || Kt.string(n.scheme) || Kt.string(n.pattern) } t.is = e })(D0 = v.TextDocumentFilter || (v.TextDocumentFilter = {})); var I0; (function (t) { function e(r) { let n = r; return Kt.objectLiteral(n) && (Kt.string(n.notebookType) || Kt.string(n.scheme) || Kt.string(n.pattern)) } t.is = e })(I0 = v.NotebookDocumentFilter || (v.NotebookDocumentFilter = {})); var x0; (function (t) { function e(r) { let n = r; return Kt.objectLiteral(n) && (Kt.string(n.notebook) || I0.is(n.notebook)) && (n.language === void 0 || Kt.string(n.language)) } t.is = e })(x0 = v.NotebookCellTextDocumentFilter || (v.NotebookCellTextDocumentFilter = {})); var q0; (function (t) { function e(r) { if (!Array.isArray(r)) return !1; for (let n of r) if (!Kt.string(n) && !D0.is(n) && !x0.is(n)) return !1; return !0 } t.is = e })(q0 = v.DocumentSelector || (v.DocumentSelector = {})); var $F; (function (t) { t.method = "client/registerCapability", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolRequestType(t.method) })($F = v.RegistrationRequest || (v.RegistrationRequest = {})); var FF; (function (t) { t.method = "client/unregisterCapability", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolRequestType(t.method) })(FF = v.UnregistrationRequest || (v.UnregistrationRequest = {})); var jF; (function (t) { t.Create = "create", t.Rename = "rename", t.Delete = "delete" })(jF = v.ResourceOperationKind || (v.ResourceOperationKind = {})); var UF; (function (t) { t.Abort = "abort", t.Transactional = "transactional", t.TextOnlyTransactional = "textOnlyTransactional", t.Undo = "undo" })(UF = v.FailureHandlingKind || (v.FailureHandlingKind = {})); var GF; (function (t) { t.UTF8 = "utf-8", t.UTF16 = "utf-16", t.UTF32 = "utf-32" })(GF = v.PositionEncodingKind || (v.PositionEncodingKind = {})); var HF; (function (t) { function e(r) { let n = r; return n && Kt.string(n.id) && n.id.length > 0 } t.hasId = e })(HF = v.StaticRegistrationOptions || (v.StaticRegistrationOptions = {})); var WF; (function (t) { function e(r) { let n = r; return n && (n.documentSelector === null || q0.is(n.documentSelector)) } t.is = e })(WF = v.TextDocumentRegistrationOptions || (v.TextDocumentRegistrationOptions = {})); var BF; (function (t) { function e(n) { let i = n; return Kt.objectLiteral(i) && (i.workDoneProgress === void 0 || Kt.boolean(i.workDoneProgress)) } t.is = e; function r(n) { let i = n; return i && Kt.boolean(i.workDoneProgress) } t.hasWorkDoneProgress = r })(BF = v.WorkDoneProgressOptions || (v.WorkDoneProgressOptions = {})); var KF; (function (t) { t.method = "initialize", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(KF = v.InitializeRequest || (v.InitializeRequest = {})); var zF; (function (t) { t.unknownProtocolVersion = 1 })(zF = v.InitializeErrorCodes || (v.InitializeErrorCodes = {})); var VF; (function (t) { t.method = "initialized", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(VF = v.InitializedNotification || (v.InitializedNotification = {})); var YF; (function (t) { t.method = "shutdown", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType0(t.method) })(YF = v.ShutdownRequest || (v.ShutdownRequest = {})); var XF; (function (t) { t.method = "exit", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType0(t.method) })(XF = v.ExitNotification || (v.ExitNotification = {})); var JF; (function (t) { t.method = "workspace/didChangeConfiguration", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(JF = v.DidChangeConfigurationNotification || (v.DidChangeConfigurationNotification = {})); var QF; (function (t) { t.Error = 1, t.Warning = 2, t.Info = 3, t.Log = 4 })(QF = v.MessageType || (v.MessageType = {})); var ZF; (function (t) { t.method = "window/showMessage", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolNotificationType(t.method) })(ZF = v.ShowMessageNotification || (v.ShowMessageNotification = {})); var ej; (function (t) { t.method = "window/showMessageRequest", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolRequestType(t.method) })(ej = v.ShowMessageRequest || (v.ShowMessageRequest = {})); var tj; (function (t) { t.method = "window/logMessage", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolNotificationType(t.method) })(tj = v.LogMessageNotification || (v.LogMessageNotification = {})); var rj; (function (t) { t.method = "telemetry/event", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolNotificationType(t.method) })(rj = v.TelemetryEventNotification || (v.TelemetryEventNotification = {})); var nj; (function (t) { t.None = 0, t.Full = 1, t.Incremental = 2 })(nj = v.TextDocumentSyncKind || (v.TextDocumentSyncKind = {})); var ij; (function (t) { t.method = "textDocument/didOpen", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(ij = v.DidOpenTextDocumentNotification || (v.DidOpenTextDocumentNotification = {})); var oj; (function (t) { function e(n) { let i = n; return i != null && typeof i.text == "string" && i.range !== void 0 && (i.rangeLength === void 0 || typeof i.rangeLength == "number") } t.isIncremental = e; function r(n) { let i = n; return i != null && typeof i.text == "string" && i.range === void 0 && i.rangeLength === void 0 } t.isFull = r })(oj = v.TextDocumentContentChangeEvent || (v.TextDocumentContentChangeEvent = {})); var aj; (function (t) { t.method = "textDocument/didChange", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(aj = v.DidChangeTextDocumentNotification || (v.DidChangeTextDocumentNotification = {})); var sj; (function (t) { t.method = "textDocument/didClose", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(sj = v.DidCloseTextDocumentNotification || (v.DidCloseTextDocumentNotification = {})); var uj; (function (t) { t.method = "textDocument/didSave", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(uj = v.DidSaveTextDocumentNotification || (v.DidSaveTextDocumentNotification = {})); var cj; (function (t) { t.Manual = 1, t.AfterDelay = 2, t.FocusOut = 3 })(cj = v.TextDocumentSaveReason || (v.TextDocumentSaveReason = {})); var lj; (function (t) { t.method = "textDocument/willSave", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(lj = v.WillSaveTextDocumentNotification || (v.WillSaveTextDocumentNotification = {})); var dj; (function (t) { t.method = "textDocument/willSaveWaitUntil", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(dj = v.WillSaveTextDocumentWaitUntilRequest || (v.WillSaveTextDocumentWaitUntilRequest = {})); var fj; (function (t) { t.method = "workspace/didChangeWatchedFiles", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolNotificationType(t.method) })(fj = v.DidChangeWatchedFilesNotification || (v.DidChangeWatchedFilesNotification = {})); var pj; (function (t) { t.Created = 1, t.Changed = 2, t.Deleted = 3 })(pj = v.FileChangeType || (v.FileChangeType = {})); var hj; (function (t) { function e(r) { let n = r; return Kt.objectLiteral(n) && (N0.URI.is(n.baseUri) || N0.WorkspaceFolder.is(n.baseUri)) && Kt.string(n.pattern) } t.is = e })(hj = v.RelativePattern || (v.RelativePattern = {})); var mj; (function (t) { t.Create = 1, t.Change = 2, t.Delete = 4 })(mj = v.WatchKind || (v.WatchKind = {})); var gj; (function (t) { t.method = "textDocument/publishDiagnostics", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolNotificationType(t.method) })(gj = v.PublishDiagnosticsNotification || (v.PublishDiagnosticsNotification = {})); var yj; (function (t) { t.Invoked = 1, t.TriggerCharacter = 2, t.TriggerForIncompleteCompletions = 3 })(yj = v.CompletionTriggerKind || (v.CompletionTriggerKind = {})); var vj; (function (t) { t.method = "textDocument/completion", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(vj = v.CompletionRequest || (v.CompletionRequest = {})); var _j; (function (t) { t.method = "completionItem/resolve", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(_j = v.CompletionResolveRequest || (v.CompletionResolveRequest = {})); var Tj; (function (t) { t.method = "textDocument/hover", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Tj = v.HoverRequest || (v.HoverRequest = {})); var Rj; (function (t) { t.Invoked = 1, t.TriggerCharacter = 2, t.ContentChange = 3 })(Rj = v.SignatureHelpTriggerKind || (v.SignatureHelpTriggerKind = {})); var bj; (function (t) { t.method = "textDocument/signatureHelp", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(bj = v.SignatureHelpRequest || (v.SignatureHelpRequest = {})); var Aj; (function (t) { t.method = "textDocument/definition", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Aj = v.DefinitionRequest || (v.DefinitionRequest = {})); var Pj; (function (t) { t.method = "textDocument/references", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Pj = v.ReferencesRequest || (v.ReferencesRequest = {})); var Sj; (function (t) { t.method = "textDocument/documentHighlight", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Sj = v.DocumentHighlightRequest || (v.DocumentHighlightRequest = {})); var Cj; (function (t) { t.method = "textDocument/documentSymbol", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Cj = v.DocumentSymbolRequest || (v.DocumentSymbolRequest = {})); var Ej; (function (t) { t.method = "textDocument/codeAction", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Ej = v.CodeActionRequest || (v.CodeActionRequest = {})); var Nj; (function (t) { t.method = "codeAction/resolve", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Nj = v.CodeActionResolveRequest || (v.CodeActionResolveRequest = {})); var kj; (function (t) { t.method = "workspace/symbol", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(kj = v.WorkspaceSymbolRequest || (v.WorkspaceSymbolRequest = {})); var wj; (function (t) { t.method = "workspaceSymbol/resolve", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(wj = v.WorkspaceSymbolResolveRequest || (v.WorkspaceSymbolResolveRequest = {})); var Oj; (function (t) { t.method = "textDocument/codeLens", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Oj = v.CodeLensRequest || (v.CodeLensRequest = {})); var Dj; (function (t) { t.method = "codeLens/resolve", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Dj = v.CodeLensResolveRequest || (v.CodeLensResolveRequest = {})); var Ij; (function (t) { t.method = "workspace/codeLens/refresh", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolRequestType0(t.method) })(Ij = v.CodeLensRefreshRequest || (v.CodeLensRefreshRequest = {})); var xj; (function (t) { t.method = "textDocument/documentLink", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(xj = v.DocumentLinkRequest || (v.DocumentLinkRequest = {})); var qj; (function (t) { t.method = "documentLink/resolve", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(qj = v.DocumentLinkResolveRequest || (v.DocumentLinkResolveRequest = {})); var Lj; (function (t) { t.method = "textDocument/formatting", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Lj = v.DocumentFormattingRequest || (v.DocumentFormattingRequest = {})); var Mj; (function (t) { t.method = "textDocument/rangeFormatting", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Mj = v.DocumentRangeFormattingRequest || (v.DocumentRangeFormattingRequest = {})); var $j; (function (t) { t.method = "textDocument/onTypeFormatting", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })($j = v.DocumentOnTypeFormattingRequest || (v.DocumentOnTypeFormattingRequest = {})); var Fj; (function (t) { t.Identifier = 1 })(Fj = v.PrepareSupportDefaultBehavior || (v.PrepareSupportDefaultBehavior = {})); var jj; (function (t) { t.method = "textDocument/rename", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(jj = v.RenameRequest || (v.RenameRequest = {})); var Uj; (function (t) { t.method = "textDocument/prepareRename", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Uj = v.PrepareRenameRequest || (v.PrepareRenameRequest = {})); var Gj; (function (t) { t.method = "workspace/executeCommand", t.messageDirection = $.MessageDirection.clientToServer, t.type = new $.ProtocolRequestType(t.method) })(Gj = v.ExecuteCommandRequest || (v.ExecuteCommandRequest = {})); var Hj; (function (t) { t.method = "workspace/applyEdit", t.messageDirection = $.MessageDirection.serverToClient, t.type = new $.ProtocolRequestType("workspace/applyEdit") })(Hj = v.ApplyWorkspaceEditRequest || (v.ApplyWorkspaceEditRequest = {})) }); var $0 = f(Rl => { "use strict"; Object.defineProperty(Rl, "__esModule", { value: !0 }); Rl.createProtocolConnection = void 0; var M0 = Ti(); function Wj(t, e, r, n) { return M0.ConnectionStrategy.is(n) && (n = { connectionStrategy: n }), (0, M0.createMessageConnection)(t, e, r, n) } Rl.createProtocolConnection = Wj }); var F0 = f(cr => { "use strict"; var Bj = cr && cr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), bl = cr && cr.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Bj(e, t, r) }; Object.defineProperty(cr, "__esModule", { value: !0 }); cr.LSPErrorCodes = cr.createProtocolConnection = void 0; bl(Ti(), cr); bl(qa(), cr); bl(ct(), cr); bl(L0(), cr); var Kj = $0(); Object.defineProperty(cr, "createProtocolConnection", { enumerable: !0, get: function () { return Kj.createProtocolConnection } }); var zj; (function (t) { t.lspReservedErrorRangeStart = -32899, t.RequestFailed = -32803, t.ServerCancelled = -32802, t.ContentModified = -32801, t.RequestCancelled = -32800, t.lspReservedErrorRangeEnd = -32800 })(zj = cr.LSPErrorCodes || (cr.LSPErrorCodes = {})) }); var At = f(Fn => { "use strict"; var Vj = Fn && Fn.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), j0 = Fn && Fn.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Vj(e, t, r) }; Object.defineProperty(Fn, "__esModule", { value: !0 }); Fn.createProtocolConnection = void 0; var Yj = Tm(); j0(Tm(), Fn); j0(F0(), Fn); function Xj(t, e, r, n) { return (0, Yj.createMessageConnection)(t, e, r, n) } Fn.createProtocolConnection = Xj }); var Im = f(Xi => { "use strict"; Object.defineProperty(Xi, "__esModule", { value: !0 }); Xi.SemanticTokensBuilder = Xi.SemanticTokensDiff = Xi.SemanticTokensFeature = void 0; var Al = At(), Jj = t => class extends t { get semanticTokens() { return { refresh: () => this.connection.sendRequest(Al.SemanticTokensRefreshRequest.type), on: e => { let r = Al.SemanticTokensRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) }, onDelta: e => { let r = Al.SemanticTokensDeltaRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) }, onRange: e => { let r = Al.SemanticTokensRangeRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) } } } }; Xi.SemanticTokensFeature = Jj; var Pl = class { constructor(e, r) { this.originalSequence = e, this.modifiedSequence = r } computeDiff() { let e = this.originalSequence.length, r = this.modifiedSequence.length, n = 0; for (; n < r && n < e && this.originalSequence[n] === this.modifiedSequence[n];)n++; if (n < r && n < e) { let i = e - 1, o = r - 1; for (; i >= n && o >= n && this.originalSequence[i] === this.modifiedSequence[o];)i--, o--; (i < n || o < n) && (i++, o++); let a = i - n + 1, s = this.modifiedSequence.slice(n, o + 1); return s.length === 1 && s[0] === this.originalSequence[i] ? [{ start: n, deleteCount: a - 1 }] : [{ start: n, deleteCount: a, data: s }] } else return n < r ? [{ start: n, deleteCount: 0, data: this.modifiedSequence.slice(n) }] : n < e ? [{ start: n, deleteCount: e - n }] : [] } }; Xi.SemanticTokensDiff = Pl; var Dm = class { constructor() { this._prevData = void 0, this.initialize() } initialize() { this._id = Date.now(), this._prevLine = 0, this._prevChar = 0, this._data = [], this._dataLen = 0 } push(e, r, n, i, o) { let a = e, s = r; this._dataLen > 0 && (a -= this._prevLine, a === 0 && (s -= this._prevChar)), this._data[this._dataLen++] = a, this._data[this._dataLen++] = s, this._data[this._dataLen++] = n, this._data[this._dataLen++] = i, this._data[this._dataLen++] = o, this._prevLine = e, this._prevChar = r } get id() { return this._id.toString() } previousResult(e) { this.id === e && (this._prevData = this._data), this.initialize() } build() { return this._prevData = void 0, { resultId: this.id, data: this._data } } canBuildEdits() { return this._prevData !== void 0 } buildEdits() { return this._prevData !== void 0 ? { resultId: this.id, edits: new Pl(this._prevData, this._data).computeDiff() } : this.build() } }; Xi.SemanticTokensBuilder = Dm }); var qm = f(Sl => { "use strict"; Object.defineProperty(Sl, "__esModule", { value: !0 }); Sl.TextDocuments = void 0; var Uo = At(), xm = class { constructor(e) { this._configuration = e, this._syncedDocuments = new Map, this._onDidChangeContent = new Uo.Emitter, this._onDidOpen = new Uo.Emitter, this._onDidClose = new Uo.Emitter, this._onDidSave = new Uo.Emitter, this._onWillSave = new Uo.Emitter } get onDidOpen() { return this._onDidOpen.event } get onDidChangeContent() { return this._onDidChangeContent.event } get onWillSave() { return this._onWillSave.event } onWillSaveWaitUntil(e) { this._willSaveWaitUntil = e } get onDidSave() { return this._onDidSave.event } get onDidClose() { return this._onDidClose.event } get(e) { return this._syncedDocuments.get(e) } all() { return Array.from(this._syncedDocuments.values()) } keys() { return Array.from(this._syncedDocuments.keys()) } listen(e) { e.__textDocumentSync = Uo.TextDocumentSyncKind.Incremental; let r = []; return r.push(e.onDidOpenTextDocument(n => { let i = n.textDocument, o = this._configuration.create(i.uri, i.languageId, i.version, i.text); this._syncedDocuments.set(i.uri, o); let a = Object.freeze({ document: o }); this._onDidOpen.fire(a), this._onDidChangeContent.fire(a) })), r.push(e.onDidChangeTextDocument(n => { let i = n.textDocument, o = n.contentChanges; if (o.length === 0) return; let { version: a } = i; if (a == null) throw new Error(`Received document change event for ${i.uri} without valid version identifier`); let s = this._syncedDocuments.get(i.uri); s !== void 0 && (s = this._configuration.update(s, o, a), this._syncedDocuments.set(i.uri, s), this._onDidChangeContent.fire(Object.freeze({ document: s }))) })), r.push(e.onDidCloseTextDocument(n => { let i = this._syncedDocuments.get(n.textDocument.uri); i !== void 0 && (this._syncedDocuments.delete(n.textDocument.uri), this._onDidClose.fire(Object.freeze({ document: i }))) })), r.push(e.onWillSaveTextDocument(n => { let i = this._syncedDocuments.get(n.textDocument.uri); i !== void 0 && this._onWillSave.fire(Object.freeze({ document: i, reason: n.reason })) })), r.push(e.onWillSaveTextDocumentWaitUntil((n, i) => { let o = this._syncedDocuments.get(n.textDocument.uri); return o !== void 0 && this._willSaveWaitUntil ? this._willSaveWaitUntil(Object.freeze({ document: o, reason: n.reason }), i) : [] })), r.push(e.onDidSaveTextDocument(n => { let i = this._syncedDocuments.get(n.textDocument.uri); i !== void 0 && this._onDidSave.fire(Object.freeze({ document: i })) })), Uo.Disposable.create(() => { r.forEach(n => n.dispose()) }) } }; Sl.TextDocuments = xm }); var Mm = f(Ga => { "use strict"; Object.defineProperty(Ga, "__esModule", { value: !0 }); Ga.NotebookDocuments = Ga.NotebookSyncFeature = void 0; var Fr = At(), U0 = qm(), Qj = t => class extends t { get synchronization() { return { onDidOpenNotebookDocument: e => this.connection.onNotification(Fr.DidOpenNotebookDocumentNotification.type, r => { e(r) }), onDidChangeNotebookDocument: e => this.connection.onNotification(Fr.DidChangeNotebookDocumentNotification.type, r => { e(r) }), onDidSaveNotebookDocument: e => this.connection.onNotification(Fr.DidSaveNotebookDocumentNotification.type, r => { e(r) }), onDidCloseNotebookDocument: e => this.connection.onNotification(Fr.DidCloseNotebookDocumentNotification.type, r => { e(r) }) } } }; Ga.NotebookSyncFeature = Qj; var Ji = class { onDidOpenTextDocument(e) { return this.openHandler = e, Fr.Disposable.create(() => { this.openHandler = void 0 }) } openTextDocument(e) { this.openHandler && this.openHandler(e) } onDidChangeTextDocument(e) { return this.changeHandler = e, Fr.Disposable.create(() => { this.changeHandler = e }) } changeTextDocument(e) { this.changeHandler && this.changeHandler(e) } onDidCloseTextDocument(e) { return this.closeHandler = e, Fr.Disposable.create(() => { this.closeHandler = void 0 }) } closeTextDocument(e) { this.closeHandler && this.closeHandler(e) } onWillSaveTextDocument() { return Ji.NULL_DISPOSE } onWillSaveTextDocumentWaitUntil() { return Ji.NULL_DISPOSE } onDidSaveTextDocument() { return Ji.NULL_DISPOSE } }; Ji.NULL_DISPOSE = Object.freeze({ dispose: () => { } }); var Lm = class { constructor(e) { e instanceof U0.TextDocuments ? this._cellTextDocuments = e : this._cellTextDocuments = new U0.TextDocuments(e), this.notebookDocuments = new Map, this.notebookCellMap = new Map, this._onDidOpen = new Fr.Emitter, this._onDidChange = new Fr.Emitter, this._onDidSave = new Fr.Emitter, this._onDidClose = new Fr.Emitter } get cellTextDocuments() { return this._cellTextDocuments } getCellTextDocument(e) { return this._cellTextDocuments.get(e.document) } getNotebookDocument(e) { return this.notebookDocuments.get(e) } getNotebookCell(e) { let r = this.notebookCellMap.get(e); return r && r[0] } findNotebookDocumentForCell(e) { let r = typeof e == "string" ? e : e.document, n = this.notebookCellMap.get(r); return n && n[1] } get onDidOpen() { return this._onDidOpen.event } get onDidSave() { return this._onDidSave.event } get onDidChange() { return this._onDidChange.event } get onDidClose() { return this._onDidClose.event } listen(e) { let r = new Ji, n = []; return n.push(this.cellTextDocuments.listen(r)), n.push(e.notebooks.synchronization.onDidOpenNotebookDocument(i => { this.notebookDocuments.set(i.notebookDocument.uri, i.notebookDocument); for (let o of i.cellTextDocuments) r.openTextDocument({ textDocument: o }); this.updateCellMap(i.notebookDocument), this._onDidOpen.fire(i.notebookDocument) })), n.push(e.notebooks.synchronization.onDidChangeNotebookDocument(i => { let o = this.notebookDocuments.get(i.notebookDocument.uri); if (o === void 0) return; o.version = i.notebookDocument.version; let a = o.metadata, s = !1, u = i.change; u.metadata !== void 0 && (s = !0, o.metadata = u.metadata); let c = [], l = [], d = [], h = []; if (u.cells !== void 0) { let E = u.cells; if (E.structure !== void 0) { let A = E.structure.array; if (o.cells.splice(A.start, A.deleteCount, ...A.cells !== void 0 ? A.cells : []), E.structure.didOpen !== void 0) for (let b of E.structure.didOpen) r.openTextDocument({ textDocument: b }), c.push(b.uri); if (E.structure.didClose) for (let b of E.structure.didClose) r.closeTextDocument({ textDocument: b }), l.push(b.uri) } if (E.data !== void 0) { let A = new Map(E.data.map(b => [b.document, b])); for (let b = 0; b <= o.cells.length; b++) { let O = A.get(o.cells[b].document); if (O !== void 0) { let L = o.cells.splice(b, 1, O); if (d.push({ old: L[0], new: O }), A.delete(O.document), A.size === 0) break } } } if (E.textContent !== void 0) for (let A of E.textContent) r.changeTextDocument({ textDocument: A.document, contentChanges: A.changes }), h.push(A.document.uri) } this.updateCellMap(o); let y = { notebookDocument: o }; s && (y.metadata = { old: a, new: o.metadata }); let m = []; for (let E of c) m.push(this.getNotebookCell(E)); let R = []; for (let E of l) R.push(this.getNotebookCell(E)); let C = []; for (let E of h) C.push(this.getNotebookCell(E)); (m.length > 0 || R.length > 0 || d.length > 0 || C.length > 0) && (y.cells = { added: m, removed: R, changed: { data: d, textContent: C } }), (y.metadata !== void 0 || y.cells !== void 0) && this._onDidChange.fire(y) })), n.push(e.notebooks.synchronization.onDidSaveNotebookDocument(i => { let o = this.notebookDocuments.get(i.notebookDocument.uri); o !== void 0 && this._onDidSave.fire(o) })), n.push(e.notebooks.synchronization.onDidCloseNotebookDocument(i => { let o = this.notebookDocuments.get(i.notebookDocument.uri); if (o !== void 0) { this._onDidClose.fire(o); for (let a of i.cellTextDocuments) r.closeTextDocument({ textDocument: a }); this.notebookDocuments.delete(i.notebookDocument.uri); for (let a of o.cells) this.notebookCellMap.delete(a.document) } })), Fr.Disposable.create(() => { n.forEach(i => i.dispose()) }) } updateCellMap(e) { for (let r of e.cells) this.notebookCellMap.set(r.document, [r, e]) } }; Ga.NotebookDocuments = Lm }); var $m = f(Pt => { "use strict"; Object.defineProperty(Pt, "__esModule", { value: !0 }); Pt.thenable = Pt.typedArray = Pt.stringArray = Pt.array = Pt.func = Pt.error = Pt.number = Pt.string = Pt.boolean = void 0; function Zj(t) { return t === !0 || t === !1 } Pt.boolean = Zj; function G0(t) { return typeof t == "string" || t instanceof String } Pt.string = G0; function eU(t) { return typeof t == "number" || t instanceof Number } Pt.number = eU; function tU(t) { return t instanceof Error } Pt.error = tU; function H0(t) { return typeof t == "function" } Pt.func = H0; function W0(t) { return Array.isArray(t) } Pt.array = W0; function rU(t) { return W0(t) && t.every(e => G0(e)) } Pt.stringArray = rU; function nU(t, e) { return Array.isArray(t) && t.every(e) } Pt.typedArray = nU; function iU(t) { return t && H0(t.then) } Pt.thenable = iU }); var Fm = f(jr => { "use strict"; Object.defineProperty(jr, "__esModule", { value: !0 }); jr.generateUuid = jr.parse = jr.isUUID = jr.v4 = jr.empty = void 0; var Mu = class { constructor(e) { this._value = e } asHex() { return this._value } equals(e) { return this.asHex() === e.asHex() } }, ae = class extends Mu { constructor() { super([ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), "-", ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), "-", "4", ae._randomHex(), ae._randomHex(), ae._randomHex(), "-", ae._oneOf(ae._timeHighBits), ae._randomHex(), ae._randomHex(), ae._randomHex(), "-", ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex(), ae._randomHex()].join("")) } static _oneOf(e) { return e[Math.floor(e.length * Math.random())] } static _randomHex() { return ae._oneOf(ae._chars) } }; ae._chars = ["0", "1", "2", "3", "4", "5", "6", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]; ae._timeHighBits = ["8", "9", "a", "b"]; jr.empty = new Mu("00000000-0000-0000-0000-000000000000"); function B0() { return new ae } jr.v4 = B0; var oU = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i; function K0(t) { return oU.test(t) } jr.isUUID = K0; function aU(t) { if (!K0(t)) throw new Error("invalid uuid"); return new Mu(t) } jr.parse = aU; function sU() { return B0().asHex() } jr.generateUuid = sU }); var z0 = f(Zi => { "use strict"; Object.defineProperty(Zi, "__esModule", { value: !0 }); Zi.attachPartialResult = Zi.ProgressFeature = Zi.attachWorkDone = void 0; var Qi = At(), uU = Fm(), jn = class { constructor(e, r) { this._connection = e, this._token = r, jn.Instances.set(this._token, this) } begin(e, r, n, i) { let o = { kind: "begin", title: e, percentage: r, message: n, cancellable: i }; this._connection.sendProgress(Qi.WorkDoneProgress.type, this._token, o) } report(e, r) { let n = { kind: "report" }; typeof e == "number" ? (n.percentage = e, r !== void 0 && (n.message = r)) : n.message = e, this._connection.sendProgress(Qi.WorkDoneProgress.type, this._token, n) } done() { jn.Instances.delete(this._token), this._connection.sendProgress(Qi.WorkDoneProgress.type, this._token, { kind: "end" }) } }; jn.Instances = new Map; var Cl = class extends jn { constructor(e, r) { super(e, r), this._source = new Qi.CancellationTokenSource } get token() { return this._source.token } done() { this._source.dispose(), super.done() } cancel() { this._source.cancel() } }, $u = class { constructor() { } begin() { } report() { } done() { } }, El = class extends $u { constructor() { super(), this._source = new Qi.CancellationTokenSource } get token() { return this._source.token } done() { this._source.dispose() } cancel() { this._source.cancel() } }; function cU(t, e) { if (e === void 0 || e.workDoneToken === void 0) return new $u; let r = e.workDoneToken; return delete e.workDoneToken, new jn(t, r) } Zi.attachWorkDone = cU; var lU = t => class extends t { constructor() { super(), this._progressSupported = !1 } initialize(e) { super.initialize(e), e?.window?.workDoneProgress === !0 && (this._progressSupported = !0, this.connection.onNotification(Qi.WorkDoneProgressCancelNotification.type, r => { let n = jn.Instances.get(r.token); (n instanceof Cl || n instanceof El) && n.cancel() })) } attachWorkDoneProgress(e) { return e === void 0 ? new $u : new jn(this.connection, e) } createWorkDoneProgress() { if (this._progressSupported) { let e = (0, uU.generateUuid)(); return this.connection.sendRequest(Qi.WorkDoneProgressCreateRequest.type, { token: e }).then(() => new Cl(this.connection, e)) } else return Promise.resolve(new El) } }; Zi.ProgressFeature = lU; var jm; (function (t) { t.type = new Qi.ProgressType })(jm || (jm = {})); var Um = class { constructor(e, r) { this._connection = e, this._token = r } report(e) { this._connection.sendProgress(jm.type, this._token, e) } }; function dU(t, e) { if (e === void 0 || e.partialResultToken === void 0) return; let r = e.partialResultToken; return delete e.partialResultToken, new Um(t, r) } Zi.attachPartialResult = dU }); var V0 = f(Nl => { "use strict"; Object.defineProperty(Nl, "__esModule", { value: !0 }); Nl.ConfigurationFeature = void 0; var fU = At(), pU = $m(), hU = t => class extends t { getConfiguration(e) { return e ? pU.string(e) ? this._getConfiguration({ section: e }) : this._getConfiguration(e) : this._getConfiguration({}) } _getConfiguration(e) { let r = { items: Array.isArray(e) ? e : [e] }; return this.connection.sendRequest(fU.ConfigurationRequest.type, r).then(n => Array.isArray(n) ? Array.isArray(e) ? n : n[0] : Array.isArray(e) ? [] : null) } }; Nl.ConfigurationFeature = hU }); var Y0 = f(wl => { "use strict"; Object.defineProperty(wl, "__esModule", { value: !0 }); wl.WorkspaceFoldersFeature = void 0; var kl = At(), mU = t => class extends t { constructor() { super(), this._notificationIsAutoRegistered = !1 } initialize(e) { super.initialize(e); let r = e.workspace; r && r.workspaceFolders && (this._onDidChangeWorkspaceFolders = new kl.Emitter, this.connection.onNotification(kl.DidChangeWorkspaceFoldersNotification.type, n => { this._onDidChangeWorkspaceFolders.fire(n.event) })) } fillServerCapabilities(e) { super.fillServerCapabilities(e); let r = e.workspace?.workspaceFolders?.changeNotifications; this._notificationIsAutoRegistered = r === !0 || typeof r == "string" } getWorkspaceFolders() { return this.connection.sendRequest(kl.WorkspaceFoldersRequest.type) } get onDidChangeWorkspaceFolders() { if (!this._onDidChangeWorkspaceFolders) throw new Error("Client doesn't support sending workspace folder change events."); return !this._notificationIsAutoRegistered && !this._unregistration && (this._unregistration = this.connection.client.register(kl.DidChangeWorkspaceFoldersNotification.type)), this._onDidChangeWorkspaceFolders.event } }; wl.WorkspaceFoldersFeature = mU }); var X0 = f(Ol => { "use strict"; Object.defineProperty(Ol, "__esModule", { value: !0 }); Ol.CallHierarchyFeature = void 0; var Gm = At(), gU = t => class extends t { get callHierarchy() { return { onPrepare: e => this.connection.onRequest(Gm.CallHierarchyPrepareRequest.type, (r, n) => e(r, n, this.attachWorkDoneProgress(r), void 0)), onIncomingCalls: e => { let r = Gm.CallHierarchyIncomingCallsRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) }, onOutgoingCalls: e => { let r = Gm.CallHierarchyOutgoingCallsRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) } } } }; Ol.CallHierarchyFeature = gU }); var J0 = f(Dl => { "use strict"; Object.defineProperty(Dl, "__esModule", { value: !0 }); Dl.ShowDocumentFeature = void 0; var yU = At(), vU = t => class extends t { showDocument(e) { return this.connection.sendRequest(yU.ShowDocumentRequest.type, e) } }; Dl.ShowDocumentFeature = vU }); var Q0 = f(Il => { "use strict"; Object.defineProperty(Il, "__esModule", { value: !0 }); Il.FileOperationsFeature = void 0; var Ha = At(), _U = t => class extends t { onDidCreateFiles(e) { return this.connection.onNotification(Ha.DidCreateFilesNotification.type, r => { e(r) }) } onDidRenameFiles(e) { return this.connection.onNotification(Ha.DidRenameFilesNotification.type, r => { e(r) }) } onDidDeleteFiles(e) { return this.connection.onNotification(Ha.DidDeleteFilesNotification.type, r => { e(r) }) } onWillCreateFiles(e) { return this.connection.onRequest(Ha.WillCreateFilesRequest.type, (r, n) => e(r, n)) } onWillRenameFiles(e) { return this.connection.onRequest(Ha.WillRenameFilesRequest.type, (r, n) => e(r, n)) } onWillDeleteFiles(e) { return this.connection.onRequest(Ha.WillDeleteFilesRequest.type, (r, n) => e(r, n)) } }; Il.FileOperationsFeature = _U }); var Z0 = f(xl => { "use strict"; Object.defineProperty(xl, "__esModule", { value: !0 }); xl.LinkedEditingRangeFeature = void 0; var TU = At(), RU = t => class extends t { onLinkedEditingRange(e) { return this.connection.onRequest(TU.LinkedEditingRangeRequest.type, (r, n) => e(r, n, this.attachWorkDoneProgress(r), void 0)) } }; xl.LinkedEditingRangeFeature = RU }); var eb = f(ql => { "use strict"; Object.defineProperty(ql, "__esModule", { value: !0 }); ql.TypeHierarchyFeature = void 0; var Hm = At(), bU = t => class extends t { get typeHierarchy() { return { onPrepare: e => this.connection.onRequest(Hm.TypeHierarchyPrepareRequest.type, (r, n) => e(r, n, this.attachWorkDoneProgress(r), void 0)), onSupertypes: e => { let r = Hm.TypeHierarchySupertypesRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) }, onSubtypes: e => { let r = Hm.TypeHierarchySubtypesRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) } } } }; ql.TypeHierarchyFeature = bU }); var rb = f(Ll => { "use strict"; Object.defineProperty(Ll, "__esModule", { value: !0 }); Ll.InlineValueFeature = void 0; var tb = At(), AU = t => class extends t { get inlineValue() { return { refresh: () => this.connection.sendRequest(tb.InlineValueRefreshRequest.type), on: e => this.connection.onRequest(tb.InlineValueRequest.type, (r, n) => e(r, n, this.attachWorkDoneProgress(r))) } } }; Ll.InlineValueFeature = AU }); var nb = f(Ml => { "use strict"; Object.defineProperty(Ml, "__esModule", { value: !0 }); Ml.InlayHintFeature = void 0; var Wm = At(), PU = t => class extends t { get inlayHint() { return { refresh: () => this.connection.sendRequest(Wm.InlayHintRefreshRequest.type), on: e => this.connection.onRequest(Wm.InlayHintRequest.type, (r, n) => e(r, n, this.attachWorkDoneProgress(r))), resolve: e => this.connection.onRequest(Wm.InlayHintResolveRequest.type, (r, n) => e(r, n)) } } }; Ml.InlayHintFeature = PU }); var ib = f($l => { "use strict"; Object.defineProperty($l, "__esModule", { value: !0 }); $l.DiagnosticFeature = void 0; var Fu = At(), SU = t => class extends t { get diagnostics() { return { refresh: () => this.connection.sendRequest(Fu.DiagnosticRefreshRequest.type), on: e => this.connection.onRequest(Fu.DocumentDiagnosticRequest.type, (r, n) => e(r, n, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(Fu.DocumentDiagnosticRequest.partialResult, r))), onWorkspace: e => this.connection.onRequest(Fu.WorkspaceDiagnosticRequest.type, (r, n) => e(r, n, this.attachWorkDoneProgress(r), this.attachPartialResultProgress(Fu.WorkspaceDiagnosticRequest.partialResult, r))) } } }; $l.DiagnosticFeature = SU }); var ob = f(Fl => { "use strict"; Object.defineProperty(Fl, "__esModule", { value: !0 }); Fl.MonikerFeature = void 0; var CU = At(), EU = t => class extends t { get moniker() { return { on: e => { let r = CU.MonikerRequest.type; return this.connection.onRequest(r, (n, i) => e(n, i, this.attachWorkDoneProgress(n), this.attachPartialResultProgress(r, n))) } } } }; Fl.MonikerFeature = EU }); var vb = f(ve => { "use strict"; Object.defineProperty(ve, "__esModule", { value: !0 }); ve.createConnection = ve.combineFeatures = ve.combineNotebooksFeatures = ve.combineLanguagesFeatures = ve.combineWorkspaceFeatures = ve.combineWindowFeatures = ve.combineClientFeatures = ve.combineTracerFeatures = ve.combineTelemetryFeatures = ve.combineConsoleFeatures = ve._NotebooksImpl = ve._LanguagesImpl = ve.BulkUnregistration = ve.BulkRegistration = ve.ErrorMessageTracker = void 0; var G = At(), Ur = $m(), Km = Fm(), te = z0(), NU = V0(), kU = Y0(), wU = X0(), OU = Im(), DU = J0(), IU = Q0(), xU = Z0(), qU = eb(), LU = rb(), MU = nb(), $U = ib(), FU = Mm(), jU = ob(); function Bm(t) { if (t !== null) return t } var zm = class { constructor() { this._messages = Object.create(null) } add(e) { let r = this._messages[e]; r || (r = 0), r++, this._messages[e] = r } sendErrors(e) { Object.keys(this._messages).forEach(r => { e.window.showErrorMessage(r) }) } }; ve.ErrorMessageTracker = zm; var jl = class { constructor() { } rawAttach(e) { this._rawConnection = e } attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } fillServerCapabilities(e) { } initialize(e) { } error(e) { this.send(G.MessageType.Error, e) } warn(e) { this.send(G.MessageType.Warning, e) } info(e) { this.send(G.MessageType.Info, e) } log(e) { this.send(G.MessageType.Log, e) } send(e, r) { this._rawConnection && this._rawConnection.sendNotification(G.LogMessageNotification.type, { type: e, message: r }).catch(() => { (0, G.RAL)().console.error("Sending log message failed") }) } }, Vm = class { constructor() { } attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } initialize(e) { } fillServerCapabilities(e) { } showErrorMessage(e, ...r) { let n = { type: G.MessageType.Error, message: e, actions: r }; return this.connection.sendRequest(G.ShowMessageRequest.type, n).then(Bm) } showWarningMessage(e, ...r) { let n = { type: G.MessageType.Warning, message: e, actions: r }; return this.connection.sendRequest(G.ShowMessageRequest.type, n).then(Bm) } showInformationMessage(e, ...r) { let n = { type: G.MessageType.Info, message: e, actions: r }; return this.connection.sendRequest(G.ShowMessageRequest.type, n).then(Bm) } }, ab = (0, DU.ShowDocumentFeature)((0, te.ProgressFeature)(Vm)), UU; (function (t) { function e() { return new Ul } t.create = e })(UU = ve.BulkRegistration || (ve.BulkRegistration = {})); var Ul = class { constructor() { this._registrations = [], this._registered = new Set } add(e, r) { let n = Ur.string(e) ? e : e.method; if (this._registered.has(n)) throw new Error(`${n} is already added to this registration`); let i = Km.generateUuid(); this._registrations.push({ id: i, method: n, registerOptions: r || {} }), this._registered.add(n) } asRegistrationParams() { return { registrations: this._registrations } } }, GU; (function (t) { function e() { return new ju(void 0, []) } t.create = e })(GU = ve.BulkUnregistration || (ve.BulkUnregistration = {})); var ju = class { constructor(e, r) { this._connection = e, this._unregistrations = new Map, r.forEach(n => { this._unregistrations.set(n.method, n) }) } get isAttached() { return !!this._connection } attach(e) { this._connection = e } add(e) { this._unregistrations.set(e.method, e) } dispose() { let e = []; for (let n of this._unregistrations.values()) e.push(n); let r = { unregisterations: e }; this._connection.sendRequest(G.UnregistrationRequest.type, r).catch(() => { this._connection.console.info("Bulk unregistration failed.") }) } disposeSingle(e) { let r = Ur.string(e) ? e : e.method, n = this._unregistrations.get(r); if (!n) return !1; let i = { unregisterations: [n] }; return this._connection.sendRequest(G.UnregistrationRequest.type, i).then(() => { this._unregistrations.delete(r) }, o => { this._connection.console.info(`Un-registering request handler for ${n.id} failed.`) }), !0 } }, Gl = class { attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } initialize(e) { } fillServerCapabilities(e) { } register(e, r, n) { return e instanceof Ul ? this.registerMany(e) : e instanceof ju ? this.registerSingle1(e, r, n) : this.registerSingle2(e, r) } registerSingle1(e, r, n) { let i = Ur.string(r) ? r : r.method, o = Km.generateUuid(), a = { registrations: [{ id: o, method: i, registerOptions: n || {} }] }; return e.isAttached || e.attach(this.connection), this.connection.sendRequest(G.RegistrationRequest.type, a).then(s => (e.add({ id: o, method: i }), e), s => (this.connection.console.info(`Registering request handler for ${i} failed.`), Promise.reject(s))) } registerSingle2(e, r) { let n = Ur.string(e) ? e : e.method, i = Km.generateUuid(), o = { registrations: [{ id: i, method: n, registerOptions: r || {} }] }; return this.connection.sendRequest(G.RegistrationRequest.type, o).then(a => G.Disposable.create(() => { this.unregisterSingle(i, n).catch(() => { this.connection.console.info(`Un-registering capability with id ${i} failed.`) }) }), a => (this.connection.console.info(`Registering request handler for ${n} failed.`), Promise.reject(a))) } unregisterSingle(e, r) { let n = { unregisterations: [{ id: e, method: r }] }; return this.connection.sendRequest(G.UnregistrationRequest.type, n).catch(() => { this.connection.console.info(`Un-registering request handler for ${e} failed.`) }) } registerMany(e) { let r = e.asRegistrationParams(); return this.connection.sendRequest(G.RegistrationRequest.type, r).then(() => new ju(this._connection, r.registrations.map(n => ({ id: n.id, method: n.method }))), n => (this.connection.console.info("Bulk registration failed."), Promise.reject(n))) } }, Ym = class { constructor() { } attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } initialize(e) { } fillServerCapabilities(e) { } applyEdit(e) { function r(i) { return i && !!i.edit } let n = r(e) ? e : { edit: e }; return this.connection.sendRequest(G.ApplyWorkspaceEditRequest.type, n) } }, sb = (0, IU.FileOperationsFeature)((0, kU.WorkspaceFoldersFeature)((0, NU.ConfigurationFeature)(Ym))), Hl = class { constructor() { this._trace = G.Trace.Off } attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } initialize(e) { } fillServerCapabilities(e) { } set trace(e) { this._trace = e } log(e, r) { this._trace !== G.Trace.Off && this.connection.sendNotification(G.LogTraceNotification.type, { message: e, verbose: this._trace === G.Trace.Verbose ? r : void 0 }).catch(() => { }) } }, Wl = class { constructor() { } attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } initialize(e) { } fillServerCapabilities(e) { } logEvent(e) { this.connection.sendNotification(G.TelemetryEventNotification.type, e).catch(() => { this.connection.console.log("Sending TelemetryEventNotification failed") }) } }, Bl = class { constructor() { } attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } initialize(e) { } fillServerCapabilities(e) { } attachWorkDoneProgress(e) { return (0, te.attachWorkDone)(this.connection, e) } attachPartialResultProgress(e, r) { return (0, te.attachPartialResult)(this.connection, r) } }; ve._LanguagesImpl = Bl; var ub = (0, jU.MonikerFeature)((0, $U.DiagnosticFeature)((0, MU.InlayHintFeature)((0, LU.InlineValueFeature)((0, qU.TypeHierarchyFeature)((0, xU.LinkedEditingRangeFeature)((0, OU.SemanticTokensFeature)((0, wU.CallHierarchyFeature)(Bl)))))))), Kl = class { constructor() { } attach(e) { this._connection = e } get connection() { if (!this._connection) throw new Error("Remote is not attached to a connection yet."); return this._connection } initialize(e) { } fillServerCapabilities(e) { } attachWorkDoneProgress(e) { return (0, te.attachWorkDone)(this.connection, e) } attachPartialResultProgress(e, r) { return (0, te.attachPartialResult)(this.connection, r) } }; ve._NotebooksImpl = Kl; var cb = (0, FU.NotebookSyncFeature)(Kl); function lb(t, e) { return function (r) { return e(t(r)) } } ve.combineConsoleFeatures = lb; function db(t, e) { return function (r) { return e(t(r)) } } ve.combineTelemetryFeatures = db; function fb(t, e) { return function (r) { return e(t(r)) } } ve.combineTracerFeatures = fb; function pb(t, e) { return function (r) { return e(t(r)) } } ve.combineClientFeatures = pb; function hb(t, e) { return function (r) { return e(t(r)) } } ve.combineWindowFeatures = hb; function mb(t, e) { return function (r) { return e(t(r)) } } ve.combineWorkspaceFeatures = mb; function gb(t, e) { return function (r) { return e(t(r)) } } ve.combineLanguagesFeatures = gb; function yb(t, e) { return function (r) { return e(t(r)) } } ve.combineNotebooksFeatures = yb; function HU(t, e) { function r(i, o, a) { return i && o ? a(i, o) : i || o } return { __brand: "features", console: r(t.console, e.console, lb), tracer: r(t.tracer, e.tracer, fb), telemetry: r(t.telemetry, e.telemetry, db), client: r(t.client, e.client, pb), window: r(t.window, e.window, hb), workspace: r(t.workspace, e.workspace, mb), languages: r(t.languages, e.languages, gb), notebooks: r(t.notebooks, e.notebooks, yb) } } ve.combineFeatures = HU; function WU(t, e, r) { let n = r && r.console ? new (r.console(jl)) : new jl, i = t(n); n.rawAttach(i); let o = r && r.tracer ? new (r.tracer(Hl)) : new Hl, a = r && r.telemetry ? new (r.telemetry(Wl)) : new Wl, s = r && r.client ? new (r.client(Gl)) : new Gl, u = r && r.window ? new (r.window(ab)) : new ab, c = r && r.workspace ? new (r.workspace(sb)) : new sb, l = r && r.languages ? new (r.languages(ub)) : new ub, d = r && r.notebooks ? new (r.notebooks(cb)) : new cb, h = [n, o, a, s, u, c, l, d]; function y(A) { return A instanceof Promise ? A : Ur.thenable(A) ? new Promise((b, O) => { A.then(L => b(L), L => O(L)) }) : Promise.resolve(A) } let m, R, C, E = { listen: () => i.listen(), sendRequest: (A, ...b) => i.sendRequest(Ur.string(A) ? A : A.method, ...b), onRequest: (A, b) => i.onRequest(A, b), sendNotification: (A, b) => { let O = Ur.string(A) ? A : A.method; return arguments.length === 1 ? i.sendNotification(O) : i.sendNotification(O, b) }, onNotification: (A, b) => i.onNotification(A, b), onProgress: i.onProgress, sendProgress: i.sendProgress, onInitialize: A => (R = A, { dispose: () => { R = void 0 } }), onInitialized: A => i.onNotification(G.InitializedNotification.type, A), onShutdown: A => (m = A, { dispose: () => { m = void 0 } }), onExit: A => (C = A, { dispose: () => { C = void 0 } }), get console() { return n }, get telemetry() { return a }, get tracer() { return o }, get client() { return s }, get window() { return u }, get workspace() { return c }, get languages() { return l }, get notebooks() { return d }, onDidChangeConfiguration: A => i.onNotification(G.DidChangeConfigurationNotification.type, A), onDidChangeWatchedFiles: A => i.onNotification(G.DidChangeWatchedFilesNotification.type, A), __textDocumentSync: void 0, onDidOpenTextDocument: A => i.onNotification(G.DidOpenTextDocumentNotification.type, A), onDidChangeTextDocument: A => i.onNotification(G.DidChangeTextDocumentNotification.type, A), onDidCloseTextDocument: A => i.onNotification(G.DidCloseTextDocumentNotification.type, A), onWillSaveTextDocument: A => i.onNotification(G.WillSaveTextDocumentNotification.type, A), onWillSaveTextDocumentWaitUntil: A => i.onRequest(G.WillSaveTextDocumentWaitUntilRequest.type, A), onDidSaveTextDocument: A => i.onNotification(G.DidSaveTextDocumentNotification.type, A), sendDiagnostics: A => i.sendNotification(G.PublishDiagnosticsNotification.type, A), onHover: A => i.onRequest(G.HoverRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), void 0)), onCompletion: A => i.onRequest(G.CompletionRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onCompletionResolve: A => i.onRequest(G.CompletionResolveRequest.type, A), onSignatureHelp: A => i.onRequest(G.SignatureHelpRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), void 0)), onDeclaration: A => i.onRequest(G.DeclarationRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onDefinition: A => i.onRequest(G.DefinitionRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onTypeDefinition: A => i.onRequest(G.TypeDefinitionRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onImplementation: A => i.onRequest(G.ImplementationRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onReferences: A => i.onRequest(G.ReferencesRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onDocumentHighlight: A => i.onRequest(G.DocumentHighlightRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onDocumentSymbol: A => i.onRequest(G.DocumentSymbolRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onWorkspaceSymbol: A => i.onRequest(G.WorkspaceSymbolRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onWorkspaceSymbolResolve: A => i.onRequest(G.WorkspaceSymbolResolveRequest.type, A), onCodeAction: A => i.onRequest(G.CodeActionRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onCodeActionResolve: A => i.onRequest(G.CodeActionResolveRequest.type, (b, O) => A(b, O)), onCodeLens: A => i.onRequest(G.CodeLensRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onCodeLensResolve: A => i.onRequest(G.CodeLensResolveRequest.type, (b, O) => A(b, O)), onDocumentFormatting: A => i.onRequest(G.DocumentFormattingRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), void 0)), onDocumentRangeFormatting: A => i.onRequest(G.DocumentRangeFormattingRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), void 0)), onDocumentOnTypeFormatting: A => i.onRequest(G.DocumentOnTypeFormattingRequest.type, (b, O) => A(b, O)), onRenameRequest: A => i.onRequest(G.RenameRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), void 0)), onPrepareRename: A => i.onRequest(G.PrepareRenameRequest.type, (b, O) => A(b, O)), onDocumentLinks: A => i.onRequest(G.DocumentLinkRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onDocumentLinkResolve: A => i.onRequest(G.DocumentLinkResolveRequest.type, (b, O) => A(b, O)), onDocumentColor: A => i.onRequest(G.DocumentColorRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onColorPresentation: A => i.onRequest(G.ColorPresentationRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onFoldingRanges: A => i.onRequest(G.FoldingRangeRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onSelectionRanges: A => i.onRequest(G.SelectionRangeRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), (0, te.attachPartialResult)(i, b))), onExecuteCommand: A => i.onRequest(G.ExecuteCommandRequest.type, (b, O) => A(b, O, (0, te.attachWorkDone)(i, b), void 0)), dispose: () => i.dispose() }; for (let A of h) A.attach(E); return i.onRequest(G.InitializeRequest.type, A => { e.initialize(A), Ur.string(A.trace) && (o.trace = G.Trace.fromString(A.trace)); for (let b of h) b.initialize(A.capabilities); if (R) { let b = R(A, new G.CancellationTokenSource().token, (0, te.attachWorkDone)(i, A), void 0); return y(b).then(O => { if (O instanceof G.ResponseError) return O; let L = O; L || (L = { capabilities: {} }); let W = L.capabilities; W || (W = {}, L.capabilities = W), W.textDocumentSync === void 0 || W.textDocumentSync === null ? W.textDocumentSync = Ur.number(E.__textDocumentSync) ? E.__textDocumentSync : G.TextDocumentSyncKind.None : !Ur.number(W.textDocumentSync) && !Ur.number(W.textDocumentSync.change) && (W.textDocumentSync.change = Ur.number(E.__textDocumentSync) ? E.__textDocumentSync : G.TextDocumentSyncKind.None); for (let Z of h) Z.fillServerCapabilities(W); return L }) } else { let b = { capabilities: { textDocumentSync: G.TextDocumentSyncKind.None } }; for (let O of h) O.fillServerCapabilities(b.capabilities); return b } }), i.onRequest(G.ShutdownRequest.type, () => { if (e.shutdownReceived = !0, m) return m(new G.CancellationTokenSource().token) }), i.onNotification(G.ExitNotification.type, () => { try { C && C() } finally { e.shutdownReceived ? e.exit(0) : e.exit(1) } }), i.onNotification(G.SetTraceNotification.type, A => { o.trace = G.Trace.fromString(A.value) }), E } ve.createConnection = WU }); var Xm = f(zt => { "use strict"; var BU = zt && zt.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), _b = zt && zt.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && BU(e, t, r) }; Object.defineProperty(zt, "__esModule", { value: !0 }); zt.ProposedFeatures = zt.NotebookDocuments = zt.TextDocuments = zt.SemanticTokensBuilder = void 0; var KU = Im(); Object.defineProperty(zt, "SemanticTokensBuilder", { enumerable: !0, get: function () { return KU.SemanticTokensBuilder } }); _b(At(), zt); var zU = qm(); Object.defineProperty(zt, "TextDocuments", { enumerable: !0, get: function () { return zU.TextDocuments } }); var VU = Mm(); Object.defineProperty(zt, "NotebookDocuments", { enumerable: !0, get: function () { return VU.NotebookDocuments } }); _b(vb(), zt); var YU; (function (t) { t.all = { __brand: "features" } })(YU = zt.ProposedFeatures || (zt.ProposedFeatures = {})) }); var Rb = f((Vde, Tb) => { "use strict"; Tb.exports = At() }); var Oe = f(Un => { "use strict"; var XU = Un && Un.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), Ab = Un && Un.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && XU(e, t, r) }; Object.defineProperty(Un, "__esModule", { value: !0 }); Un.createConnection = void 0; var zl = Xm(); Ab(Rb(), Un); Ab(Xm(), Un); var bb = !1, JU = { initialize: t => { }, get shutdownReceived() { return bb }, set shutdownReceived(t) { bb = t }, exit: t => { } }; function QU(t, e, r, n) { let i, o, a, s; t !== void 0 && t.__brand === "features" && (i = t, t = e, e = r, r = n), zl.ConnectionStrategy.is(t) || zl.ConnectionOptions.is(t) ? s = t : (o = t, a = e, s = r); let u = c => (0, zl.createProtocolConnection)(o, a, c, s); return (0, zl.createConnection)(u, JU, i) } Un.createConnection = QU }); var Jm = f((Yl, Vl) => { var ZU = Yl && Yl.__spreadArray || function (t, e, r) { if (r || arguments.length === 2) for (var n = 0, i = e.length, o; n < i; n++)(o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]); return t.concat(o || Array.prototype.slice.call(e)) }; (function (t) { if (typeof Vl == "object" && typeof Vl.exports == "object") { var e = t(al, Yl); e !== void 0 && (Vl.exports = e) } else typeof define == "function" && define.amd && define(["require", "exports"], t) })(function (t, e) { "use strict"; Object.defineProperty(e, "__esModule", { value: !0 }), e.TextDocument = void 0; var r = function () { function u(c, l, d, h) { this._uri = c, this._languageId = l, this._version = d, this._content = h, this._lineOffsets = void 0 } return Object.defineProperty(u.prototype, "uri", { get: function () { return this._uri }, enumerable: !1, configurable: !0 }), Object.defineProperty(u.prototype, "languageId", { get: function () { return this._languageId }, enumerable: !1, configurable: !0 }), Object.defineProperty(u.prototype, "version", { get: function () { return this._version }, enumerable: !1, configurable: !0 }), u.prototype.getText = function (c) { if (c) { var l = this.offsetAt(c.start), d = this.offsetAt(c.end); return this._content.substring(l, d) } return this._content }, u.prototype.update = function (c, l) { for (var d = 0, h = c; d < h.length; d++) { var y = h[d]; if (u.isIncremental(y)) { var m = a(y.range), R = this.offsetAt(m.start), C = this.offsetAt(m.end); this._content = this._content.substring(0, R) + y.text + this._content.substring(C, this._content.length); var E = Math.max(m.start.line, 0), A = Math.max(m.end.line, 0), b = this._lineOffsets, O = o(y.text, !1, R); if (A - E === O.length) for (var L = 0, W = O.length; L < W; L++)b[L + E + 1] = O[L]; else O.length < 1e4 ? b.splice.apply(b, ZU([E + 1, A - E], O, !1)) : this._lineOffsets = b = b.slice(0, E + 1).concat(O, b.slice(A + 1)); var Z = y.text.length - (C - R); if (Z !== 0) for (var L = E + 1 + O.length, W = b.length; L < W; L++)b[L] = b[L] + Z } else if (u.isFull(y)) this._content = y.text, this._lineOffsets = void 0; else throw new Error("Unknown change event received") } this._version = l }, u.prototype.getLineOffsets = function () { return this._lineOffsets === void 0 && (this._lineOffsets = o(this._content, !0)), this._lineOffsets }, u.prototype.positionAt = function (c) { c = Math.max(Math.min(c, this._content.length), 0); var l = this.getLineOffsets(), d = 0, h = l.length; if (h === 0) return { line: 0, character: c }; for (; d < h;) { var y = Math.floor((d + h) / 2); l[y] > c ? h = y : d = y + 1 } var m = d - 1; return { line: m, character: c - l[m] } }, u.prototype.offsetAt = function (c) { var l = this.getLineOffsets(); if (c.line >= l.length) return this._content.length; if (c.line < 0) return 0; var d = l[c.line], h = c.line + 1 < l.length ? l[c.line + 1] : this._content.length; return Math.max(Math.min(d + c.character, h), d) }, Object.defineProperty(u.prototype, "lineCount", { get: function () { return this.getLineOffsets().length }, enumerable: !1, configurable: !0 }), u.isIncremental = function (c) { var l = c; return l != null && typeof l.text == "string" && l.range !== void 0 && (l.rangeLength === void 0 || typeof l.rangeLength == "number") }, u.isFull = function (c) { var l = c; return l != null && typeof l.text == "string" && l.range === void 0 && l.rangeLength === void 0 }, u }(), n; (function (u) { function c(h, y, m, R) { return new r(h, y, m, R) } u.create = c; function l(h, y, m) { if (h instanceof r) return h.update(y, m), h; throw new Error("TextDocument.update: document must be created by TextDocument.create") } u.update = l; function d(h, y) { for (var m = h.getText(), R = i(y.map(s), function (W, Z) { var ke = W.range.start.line - Z.range.start.line; return ke === 0 ? W.range.start.character - Z.range.start.character : ke }), C = 0, E = [], A = 0, b = R; A < b.length; A++) { var O = b[A], L = h.offsetAt(O.range.start); if (L < C) throw new Error("Overlapping edit"); L > C && E.push(m.substring(C, L)), O.newText.length && E.push(O.newText), C = h.offsetAt(O.range.end) } return E.push(m.substr(C)), E.join("") } u.applyEdits = d })(n = e.TextDocument || (e.TextDocument = {})); function i(u, c) { if (u.length <= 1) return u; var l = u.length / 2 | 0, d = u.slice(0, l), h = u.slice(l); i(d, c), i(h, c); for (var y = 0, m = 0, R = 0; y < d.length && m < h.length;) { var C = c(d[y], h[m]); C <= 0 ? u[R++] = d[y++] : u[R++] = h[m++] } for (; y < d.length;)u[R++] = d[y++]; for (; m < h.length;)u[R++] = h[m++]; return u } function o(u, c, l) { l === void 0 && (l = 0); for (var d = c ? [l] : [], h = 0; h < u.length; h++) { var y = u.charCodeAt(h); (y === 13 || y === 10) && (y === 13 && h + 1 < u.length && u.charCodeAt(h + 1) === 10 && h++, d.push(l + h + 1)) } return d } function a(u) { var c = u.start, l = u.end; return c.line > l.line || c.line === l.line && c.character > l.character ? { start: l, end: c } : u } function s(u) { var c = a(u.range); return c !== u.range ? { newText: u.newText, range: c } : u } }) }); var er = f($t => { "use strict"; Object.defineProperty($t, "__esModule", { value: !0 }); $t.isRootCstNode = $t.isLeafCstNode = $t.isCompositeCstNode = $t.AbstractAstReflection = $t.isLinkingError = $t.isAstNodeDescription = $t.isReference = $t.isAstNode = void 0; function Zm(t) { return typeof t == "object" && t !== null && typeof t.$type == "string" } $t.isAstNode = Zm; function Pb(t) { return typeof t == "object" && t !== null && typeof t.$refText == "string" } $t.isReference = Pb; function eG(t) { return typeof t == "object" && t !== null && typeof t.name == "string" && typeof t.type == "string" && typeof t.path == "string" } $t.isAstNodeDescription = eG; function tG(t) { return typeof t == "object" && t !== null && Zm(t.container) && Pb(t.reference) && typeof t.message == "string" } $t.isLinkingError = tG; var Qm = class { constructor() { this.subtypes = {}, this.allSubtypes = {} } isInstance(e, r) { return Zm(e) && this.isSubtype(e.$type, r) } isSubtype(e, r) { if (e === r) return !0; let n = this.subtypes[e]; n || (n = this.subtypes[e] = {}); let i = n[r]; if (i !== void 0) return i; { let o = this.computeIsSubtype(e, r); return n[r] = o, o } } getAllSubTypes(e) { let r = this.allSubtypes[e]; if (r) return r; { let n = this.getAllTypes(), i = []; for (let o of n) this.isSubtype(o, e) && i.push(o); return this.allSubtypes[e] = i, i } } }; $t.AbstractAstReflection = Qm; function Sb(t) { return typeof t == "object" && t !== null && "children" in t } $t.isCompositeCstNode = Sb; function rG(t) { return typeof t == "object" && t !== null && "tokenType" in t } $t.isLeafCstNode = rG; function nG(t) { return Sb(t) && "fullText" in t } $t.isRootCstNode = nG }); var Ft = f(Ve => { "use strict"; Object.defineProperty(Ve, "__esModule", { value: !0 }); Ve.Reduction = Ve.TreeStreamImpl = Ve.stream = Ve.DONE_RESULT = Ve.EMPTY_STREAM = Ve.StreamImpl = void 0; var Vt = class { constructor(e, r) { this.startFn = e, this.nextFn = r } iterator() { let e = { state: this.startFn(), next: () => this.nextFn(e.state), [Symbol.iterator]: () => e }; return e } [Symbol.iterator]() { return this.iterator() } isEmpty() { let e = this.iterator(); return Boolean(e.next().done) } count() { let e = this.iterator(), r = 0, n = e.next(); for (; !n.done;)r++, n = e.next(); return r } toArray() { let e = [], r = this.iterator(), n; do n = r.next(), n.value !== void 0 && e.push(n.value); while (!n.done); return e } toSet() { return new Set(this) } toMap(e, r) { let n = this.map(i => [e ? e(i) : i, r ? r(i) : i]); return new Map(n) } toString() { return this.join() } concat(e) { let r = e[Symbol.iterator](); return new Vt(() => ({ first: this.startFn(), firstDone: !1 }), n => { let i; if (!n.firstDone) { do if (i = this.nextFn(n.first), !i.done) return i; while (!i.done); n.firstDone = !0 } do if (i = r.next(), !i.done) return i; while (!i.done); return Ve.DONE_RESULT }) } join(e = ",") { let r = this.iterator(), n = "", i, o = !1; do i = r.next(), i.done || (o && (n += e), n += iG(i.value)), o = !0; while (!i.done); return n } indexOf(e, r = 0) { let n = this.iterator(), i = 0, o = n.next(); for (; !o.done;) { if (i >= r && o.value === e) return i; o = n.next(), i++ } return -1 } every(e) { let r = this.iterator(), n = r.next(); for (; !n.done;) { if (!e(n.value)) return !1; n = r.next() } return !0 } some(e) { let r = this.iterator(), n = r.next(); for (; !n.done;) { if (e(n.value)) return !0; n = r.next() } return !1 } forEach(e) { let r = this.iterator(), n = 0, i = r.next(); for (; !i.done;)e(i.value, n), i = r.next(), n++ } map(e) { return new Vt(this.startFn, r => { let { done: n, value: i } = this.nextFn(r); return n ? Ve.DONE_RESULT : { done: !1, value: e(i) } }) } filter(e) { return new Vt(this.startFn, r => { let n; do if (n = this.nextFn(r), !n.done && e(n.value)) return n; while (!n.done); return Ve.DONE_RESULT }) } nonNullable() { return this.filter(e => e != null) } reduce(e, r) { let n = this.iterator(), i = r, o = n.next(); for (; !o.done;)i === void 0 ? i = o.value : i = e(i, o.value), o = n.next(); return i } reduceRight(e, r) { return this.recursiveReduce(this.iterator(), e, r) } recursiveReduce(e, r, n) { let i = e.next(); if (i.done) return n; let o = this.recursiveReduce(e, r, n); return o === void 0 ? i.value : r(o, i.value) } find(e) { let r = this.iterator(), n = r.next(); for (; !n.done;) { if (e(n.value)) return n.value; n = r.next() } } findIndex(e) { let r = this.iterator(), n = 0, i = r.next(); for (; !i.done;) { if (e(i.value)) return n; i = r.next(), n++ } return -1 } includes(e) { let r = this.iterator(), n = r.next(); for (; !n.done;) { if (n.value === e) return !0; n = r.next() } return !1 } flatMap(e) { return new Vt(() => ({ this: this.startFn() }), r => { do { if (r.iterator) { let o = r.iterator.next(); if (o.done) r.iterator = void 0; else return o } let { done: n, value: i } = this.nextFn(r.this); if (!n) { let o = e(i); if (Xl(o)) r.iterator = o[Symbol.iterator](); else return { done: !1, value: o } } } while (r.iterator); return Ve.DONE_RESULT }) } flat(e) { if (e === void 0 && (e = 1), e <= 0) return this; let r = e > 1 ? this.flat(e - 1) : this; return new Vt(() => ({ this: r.startFn() }), n => { do { if (n.iterator) { let a = n.iterator.next(); if (a.done) n.iterator = void 0; else return a } let { done: i, value: o } = r.nextFn(n.this); if (!i) if (Xl(o)) n.iterator = o[Symbol.iterator](); else return { done: !1, value: o } } while (n.iterator); return Ve.DONE_RESULT }) } head() { let r = this.iterator().next(); if (!r.done) return r.value } tail(e = 1) { return new Vt(() => { let r = this.startFn(); for (let n = 0; n < e; n++)if (this.nextFn(r).done) return r; return r }, this.nextFn) } limit(e) { return new Vt(() => ({ size: 0, state: this.startFn() }), r => (r.size++, r.size > e ? Ve.DONE_RESULT : this.nextFn(r.state))) } distinct(e) { let r = new Set; return this.filter(n => { let i = e ? e(n) : n; return r.has(i) ? !1 : (r.add(i), !0) }) } exclude(e, r) { let n = new Set; for (let i of e) { let o = r ? r(i) : i; n.add(o) } return this.filter(i => { let o = r ? r(i) : i; return !n.has(o) }) } }; Ve.StreamImpl = Vt; function iG(t) { return typeof t == "string" ? t : typeof t > "u" ? "undefined" : typeof t.toString == "function" ? t.toString() : Object.prototype.toString.call(t) } function Xl(t) { return !!t && typeof t[Symbol.iterator] == "function" } Ve.EMPTY_STREAM = new Vt(() => { }, () => Ve.DONE_RESULT); Ve.DONE_RESULT = Object.freeze({ done: !0, value: void 0 }); function oG(...t) { if (t.length === 1) { let e = t[0]; if (e instanceof Vt) return e; if (Xl(e)) return new Vt(() => e[Symbol.iterator](), r => r.next()); if (typeof e.length == "number") return new Vt(() => ({ index: 0 }), r => r.index < e.length ? { done: !1, value: e[r.index++] } : Ve.DONE_RESULT) } return t.length > 1 ? new Vt(() => ({ collIndex: 0, arrIndex: 0 }), e => { do { if (e.iterator) { let r = e.iterator.next(); if (!r.done) return r; e.iterator = void 0 } if (e.array) { if (e.arrIndex < e.array.length) return { done: !1, value: e.array[e.arrIndex++] }; e.array = void 0, e.arrIndex = 0 } if (e.collIndex < t.length) { let r = t[e.collIndex++]; Xl(r) ? e.iterator = r[Symbol.iterator]() : r && typeof r.length == "number" && (e.array = r) } } while (e.iterator || e.array || e.collIndex < t.length); return Ve.DONE_RESULT }) : Ve.EMPTY_STREAM } Ve.stream = oG; var eg = class extends Vt { constructor(e, r, n) { super(() => ({ iterators: n?.includeRoot ? [[e][Symbol.iterator]()] : [r(e)[Symbol.iterator]()], pruned: !1 }), i => { for (i.pruned && (i.iterators.pop(), i.pruned = !1); i.iterators.length > 0;) { let a = i.iterators[i.iterators.length - 1].next(); if (a.done) i.iterators.pop(); else return i.iterators.push(r(a.value)[Symbol.iterator]()), a } return Ve.DONE_RESULT }) } iterator() { let e = { state: this.startFn(), next: () => this.nextFn(e.state), prune: () => { e.state.pruned = !0 }, [Symbol.iterator]: () => e }; return e } }; Ve.TreeStreamImpl = eg; var aG; (function (t) { function e(o) { return o.reduce((a, s) => a + s, 0) } t.sum = e; function r(o) { return o.reduce((a, s) => a * s, 0) } t.product = r; function n(o) { return o.reduce((a, s) => Math.min(a, s)) } t.min = n; function i(o) { return o.reduce((a, s) => Math.max(a, s)) } t.max = i })(aG = Ve.Reduction || (Ve.Reduction = {})) }); var Le = f(ue => { "use strict"; Object.defineProperty(ue, "__esModule", { value: !0 }); ue.getInteriorNodes = ue.getStartlineNode = ue.getNextNode = ue.getPreviousNode = ue.findLeafNodeAtOffset = ue.isCommentNode = ue.findCommentNode = ue.findDeclarationNodeAtOffset = ue.DefaultNameRegexp = ue.inRange = ue.compareRange = ue.RangeComparison = ue.toDocumentSegment = ue.tokenToRange = ue.isCstChildNode = ue.flattenCst = ue.streamCst = void 0; var Wa = er(), sG = Ft(); function Eb(t) { return new sG.TreeStreamImpl(t, e => (0, Wa.isCompositeCstNode)(e) ? e.children : [], { includeRoot: !0 }) } ue.streamCst = Eb; function uG(t) { return Eb(t).filter(Wa.isLeafCstNode) } ue.flattenCst = uG; function cG(t, e) { for (; t.parent;)if (t = t.parent, t === e) return !0; return !1 } ue.isCstChildNode = cG; function lG(t) { return { start: { character: t.startColumn - 1, line: t.startLine - 1 }, end: { character: t.endColumn, line: t.endLine - 1 } } } ue.tokenToRange = lG; function dG(t) { if (!t) return; let { offset: e, end: r, range: n } = t; return { range: n, offset: e, end: r, length: r - e } } ue.toDocumentSegment = dG; var Go; (function (t) { t[t.Before = 0] = "Before", t[t.After = 1] = "After", t[t.OverlapFront = 2] = "OverlapFront", t[t.OverlapBack = 3] = "OverlapBack", t[t.Inside = 4] = "Inside" })(Go = ue.RangeComparison || (ue.RangeComparison = {})); function Nb(t, e) { if (t.end.line < e.start.line || t.end.line === e.start.line && t.end.character < t.start.character) return Go.Before; if (t.start.line > e.end.line || t.start.line === e.end.line && t.start.character > e.end.character) return Go.After; let r = t.start.line > e.start.line || t.start.line === e.start.line && t.start.character >= e.start.character, n = t.end.line < e.end.line || t.end.line === e.end.line && t.end.character <= e.end.character; return r && n ? Go.Inside : r ? Go.OverlapBack : Go.OverlapFront } ue.compareRange = Nb; function fG(t, e) { return Nb(t, e) > Go.After } ue.inRange = fG; ue.DefaultNameRegexp = /^[\w\p{L}]$/u; function pG(t, e, r = ue.DefaultNameRegexp) { if (t) { if (e > 0) { let n = e - t.offset, i = t.text.charAt(n); r.test(i) || e-- } return Jl(t, e) } } ue.findDeclarationNodeAtOffset = pG; function hG(t, e) { if (t) { let r = kb(t, !0); if (r && tg(r, e)) return r; if ((0, Wa.isRootCstNode)(t)) { let n = t.children.findIndex(i => !i.hidden); for (let i = n - 1; i >= 0; i--) { let o = t.children[i]; if (tg(o, e)) return o } } } } ue.findCommentNode = hG; function tg(t, e) { return (0, Wa.isLeafCstNode)(t) && e.includes(t.tokenType.name) } ue.isCommentNode = tg; function Jl(t, e) { if ((0, Wa.isLeafCstNode)(t)) return t; if ((0, Wa.isCompositeCstNode)(t)) { let r = 0, n = t.children.length - 1; for (; r < n;) { let i = Math.floor((r + n) / 2), o = t.children[i]; if (o.offset > e) n = i - 1; else if (o.end <= e) r = i + 1; else return Jl(o, e) } if (r === n) return Jl(t.children[r], e) } } ue.findLeafNodeAtOffset = Jl; function kb(t, e = !0) { for (; t.parent;) { let r = t.parent, n = r.children.indexOf(t); for (; n > 0;) { n--; let i = r.children[n]; if (e || !i.hidden) return i } t = r } } ue.getPreviousNode = kb; function mG(t, e = !0) { for (; t.parent;) { let r = t.parent, n = r.children.indexOf(t), i = r.children.length - 1; for (; n < i;) { n++; let o = r.children[n]; if (e || !o.hidden) return o } t = r } } ue.getNextNode = mG; function gG(t) { if (t.range.start.character === 0) return t; let e = t.range.start.line, r = t, n; for (; t.parent;) { let i = t.parent, o = n ?? i.children.indexOf(t); if (o === 0 ? (t = i, n = void 0) : (n = o - 1, t = i.children[n]), t.range.start.line !== e) break; r = t } return r } ue.getStartlineNode = gG; function yG(t, e) { let r = vG(t, e); return r ? r.parent.children.slice(r.a + 1, r.b) : [] } ue.getInteriorNodes = yG; function vG(t, e) { let r = Cb(t), n = Cb(e), i; for (let o = 0; o < r.length && o < n.length; o++) { let a = r[o], s = n[o]; if (a.parent === s.parent) i = { parent: a.parent, a: a.index, b: s.index }; else break } return i } function Cb(t) { let e = []; for (; t.parent;) { let r = t.parent, n = r.children.indexOf(t); e.push({ parent: r, index: n }), t = r } return e.reverse() } }); var gn = f((Uu, rg) => { (function (t, e) { if (typeof Uu == "object" && typeof rg == "object") rg.exports = e(); else if (typeof define == "function" && define.amd) define([], e); else { var r = e(); for (var n in r) (typeof Uu == "object" ? Uu : t)[n] = r[n] } })(Uu, () => (() => { "use strict"; var t = { 470: i => { function o(u) { if (typeof u != "string") throw new TypeError("Path must be a string. Received " + JSON.stringify(u)) } function a(u, c) { for (var l, d = "", h = 0, y = -1, m = 0, R = 0; R <= u.length; ++R) { if (R < u.length) l = u.charCodeAt(R); else { if (l === 47) break; l = 47 } if (l === 47) { if (!(y === R - 1 || m === 1)) if (y !== R - 1 && m === 2) { if (d.length < 2 || h !== 2 || d.charCodeAt(d.length - 1) !== 46 || d.charCodeAt(d.length - 2) !== 46) { if (d.length > 2) { var C = d.lastIndexOf("/"); if (C !== d.length - 1) { C === -1 ? (d = "", h = 0) : h = (d = d.slice(0, C)).length - 1 - d.lastIndexOf("/"), y = R, m = 0; continue } } else if (d.length === 2 || d.length === 1) { d = "", h = 0, y = R, m = 0; continue } } c && (d.length > 0 ? d += "/.." : d = "..", h = 2) } else d.length > 0 ? d += "/" + u.slice(y + 1, R) : d = u.slice(y + 1, R), h = R - y - 1; y = R, m = 0 } else l === 46 && m !== -1 ? ++m : m = -1 } return d } var s = { resolve: function () { for (var u, c = "", l = !1, d = arguments.length - 1; d >= -1 && !l; d--) { var h; d >= 0 ? h = arguments[d] : (u === void 0 && (u = process.cwd()), h = u), o(h), h.length !== 0 && (c = h + "/" + c, l = h.charCodeAt(0) === 47) } return c = a(c, !l), l ? c.length > 0 ? "/" + c : "/" : c.length > 0 ? c : "." }, normalize: function (u) { if (o(u), u.length === 0) return "."; var c = u.charCodeAt(0) === 47, l = u.charCodeAt(u.length - 1) === 47; return (u = a(u, !c)).length !== 0 || c || (u = "."), u.length > 0 && l && (u += "/"), c ? "/" + u : u }, isAbsolute: function (u) { return o(u), u.length > 0 && u.charCodeAt(0) === 47 }, join: function () { if (arguments.length === 0) return "."; for (var u, c = 0; c < arguments.length; ++c) { var l = arguments[c]; o(l), l.length > 0 && (u === void 0 ? u = l : u += "/" + l) } return u === void 0 ? "." : s.normalize(u) }, relative: function (u, c) { if (o(u), o(c), u === c || (u = s.resolve(u)) === (c = s.resolve(c))) return ""; for (var l = 1; l < u.length && u.charCodeAt(l) === 47; ++l); for (var d = u.length, h = d - l, y = 1; y < c.length && c.charCodeAt(y) === 47; ++y); for (var m = c.length - y, R = h < m ? h : m, C = -1, E = 0; E <= R; ++E) { if (E === R) { if (m > R) { if (c.charCodeAt(y + E) === 47) return c.slice(y + E + 1); if (E === 0) return c.slice(y + E) } else h > R && (u.charCodeAt(l + E) === 47 ? C = E : E === 0 && (C = 0)); break } var A = u.charCodeAt(l + E); if (A !== c.charCodeAt(y + E)) break; A === 47 && (C = E) } var b = ""; for (E = l + C + 1; E <= d; ++E)E !== d && u.charCodeAt(E) !== 47 || (b.length === 0 ? b += ".." : b += "/.."); return b.length > 0 ? b + c.slice(y + C) : (y += C, c.charCodeAt(y) === 47 && ++y, c.slice(y)) }, _makeLong: function (u) { return u }, dirname: function (u) { if (o(u), u.length === 0) return "."; for (var c = u.charCodeAt(0), l = c === 47, d = -1, h = !0, y = u.length - 1; y >= 1; --y)if ((c = u.charCodeAt(y)) === 47) { if (!h) { d = y; break } } else h = !1; return d === -1 ? l ? "/" : "." : l && d === 1 ? "//" : u.slice(0, d) }, basename: function (u, c) { if (c !== void 0 && typeof c != "string") throw new TypeError('"ext" argument must be a string'); o(u); var l, d = 0, h = -1, y = !0; if (c !== void 0 && c.length > 0 && c.length <= u.length) { if (c.length === u.length && c === u) return ""; var m = c.length - 1, R = -1; for (l = u.length - 1; l >= 0; --l) { var C = u.charCodeAt(l); if (C === 47) { if (!y) { d = l + 1; break } } else R === -1 && (y = !1, R = l + 1), m >= 0 && (C === c.charCodeAt(m) ? --m == -1 && (h = l) : (m = -1, h = R)) } return d === h ? h = R : h === -1 && (h = u.length), u.slice(d, h) } for (l = u.length - 1; l >= 0; --l)if (u.charCodeAt(l) === 47) { if (!y) { d = l + 1; break } } else h === -1 && (y = !1, h = l + 1); return h === -1 ? "" : u.slice(d, h) }, extname: function (u) { o(u); for (var c = -1, l = 0, d = -1, h = !0, y = 0, m = u.length - 1; m >= 0; --m) { var R = u.charCodeAt(m); if (R !== 47) d === -1 && (h = !1, d = m + 1), R === 46 ? c === -1 ? c = m : y !== 1 && (y = 1) : c !== -1 && (y = -1); else if (!h) { l = m + 1; break } } return c === -1 || d === -1 || y === 0 || y === 1 && c === d - 1 && c === l + 1 ? "" : u.slice(c, d) }, format: function (u) { if (u === null || typeof u != "object") throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof u); return function (c, l) { var d = l.dir || l.root, h = l.base || (l.name || "") + (l.ext || ""); return d ? d === l.root ? d + h : d + "/" + h : h }(0, u) }, parse: function (u) { o(u); var c = { root: "", dir: "", base: "", ext: "", name: "" }; if (u.length === 0) return c; var l, d = u.charCodeAt(0), h = d === 47; h ? (c.root = "/", l = 1) : l = 0; for (var y = -1, m = 0, R = -1, C = !0, E = u.length - 1, A = 0; E >= l; --E)if ((d = u.charCodeAt(E)) !== 47) R === -1 && (C = !1, R = E + 1), d === 46 ? y === -1 ? y = E : A !== 1 && (A = 1) : y !== -1 && (A = -1); else if (!C) { m = E + 1; break } return y === -1 || R === -1 || A === 0 || A === 1 && y === R - 1 && y === m + 1 ? R !== -1 && (c.base = c.name = m === 0 && h ? u.slice(1, R) : u.slice(m, R)) : (m === 0 && h ? (c.name = u.slice(1, y), c.base = u.slice(1, R)) : (c.name = u.slice(m, y), c.base = u.slice(m, R)), c.ext = u.slice(y, R)), m > 0 ? c.dir = u.slice(0, m - 1) : h && (c.dir = "/"), c }, sep: "/", delimiter: ":", win32: null, posix: null }; s.posix = s, i.exports = s }, 674: (i, o) => { if (Object.defineProperty(o, "__esModule", { value: !0 }), o.isWindows = void 0, typeof process == "object") o.isWindows = process.platform === "win32"; else if (typeof navigator == "object") { var a = navigator.userAgent; o.isWindows = a.indexOf("Windows") >= 0 } }, 796: function (i, o, a) { var s, u, c = this && this.__extends || (s = function (M, q) { return s = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (F, B) { F.__proto__ = B } || function (F, B) { for (var ie in B) Object.prototype.hasOwnProperty.call(B, ie) && (F[ie] = B[ie]) }, s(M, q) }, function (M, q) { if (typeof q != "function" && q !== null) throw new TypeError("Class extends value " + String(q) + " is not a constructor or null"); function F() { this.constructor = M } s(M, q), M.prototype = q === null ? Object.create(q) : (F.prototype = q.prototype, new F) }); Object.defineProperty(o, "__esModule", { value: !0 }), o.uriToFsPath = o.URI = void 0; var l = a(674), d = /^\w[\w\d+.-]*$/, h = /^\//, y = /^\/\//; function m(M, q) { if (!M.scheme && q) throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(M.authority, '", path: "').concat(M.path, '", query: "').concat(M.query, '", fragment: "').concat(M.fragment, '"}')); if (M.scheme && !d.test(M.scheme)) throw new Error("[UriError]: Scheme contains illegal characters."); if (M.path) { if (M.authority) { if (!h.test(M.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character') } else if (y.test(M.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")') } } var R = "", C = "/", E = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, A = function () { function M(q, F, B, ie, oe, J) { J === void 0 && (J = !1), typeof q == "object" ? (this.scheme = q.scheme || R, this.authority = q.authority || R, this.path = q.path || R, this.query = q.query || R, this.fragment = q.fragment || R) : (this.scheme = function (dt, rt) { return dt || rt ? dt : "file" }(q, J), this.authority = F || R, this.path = function (dt, rt) { switch (dt) { case "https": case "http": case "file": rt ? rt[0] !== C && (rt = C + rt) : rt = C }return rt }(this.scheme, B || R), this.query = ie || R, this.fragment = oe || R, m(this, J)) } return M.isUri = function (q) { return q instanceof M || !!q && typeof q.authority == "string" && typeof q.fragment == "string" && typeof q.path == "string" && typeof q.query == "string" && typeof q.scheme == "string" && typeof q.fsPath == "string" && typeof q.with == "function" && typeof q.toString == "function" }, Object.defineProperty(M.prototype, "fsPath", { get: function () { return ke(this, !1) }, enumerable: !1, configurable: !0 }), M.prototype.with = function (q) { if (!q) return this; var F = q.scheme, B = q.authority, ie = q.path, oe = q.query, J = q.fragment; return F === void 0 ? F = this.scheme : F === null && (F = R), B === void 0 ? B = this.authority : B === null && (B = R), ie === void 0 ? ie = this.path : ie === null && (ie = R), oe === void 0 ? oe = this.query : oe === null && (oe = R), J === void 0 ? J = this.fragment : J === null && (J = R), F === this.scheme && B === this.authority && ie === this.path && oe === this.query && J === this.fragment ? this : new O(F, B, ie, oe, J) }, M.parse = function (q, F) { F === void 0 && (F = !1); var B = E.exec(q); return B ? new O(B[2] || R, le(B[4] || R), le(B[5] || R), le(B[7] || R), le(B[9] || R), F) : new O(R, R, R, R, R) }, M.file = function (q) { var F = R; if (l.isWindows && (q = q.replace(/\\/g, C)), q[0] === C && q[1] === C) { var B = q.indexOf(C, 2); B === -1 ? (F = q.substring(2), q = C) : (F = q.substring(2, B), q = q.substring(B) || C) } return new O("file", F, q, R, R) }, M.from = function (q) { var F = new O(q.scheme, q.authority, q.path, q.query, q.fragment); return m(F, !0), F }, M.prototype.toString = function (q) { return q === void 0 && (q = !1), we(this, q) }, M.prototype.toJSON = function () { return this }, M.revive = function (q) { if (q) { if (q instanceof M) return q; var F = new O(q); return F._formatted = q.external, F._fsPath = q._sep === b ? q.fsPath : null, F } return q }, M }(); o.URI = A; var b = l.isWindows ? 1 : void 0, O = function (M) { function q() { var F = M !== null && M.apply(this, arguments) || this; return F._formatted = null, F._fsPath = null, F } return c(q, M), Object.defineProperty(q.prototype, "fsPath", { get: function () { return this._fsPath || (this._fsPath = ke(this, !1)), this._fsPath }, enumerable: !1, configurable: !0 }), q.prototype.toString = function (F) { return F === void 0 && (F = !1), F ? we(this, !0) : (this._formatted || (this._formatted = we(this, !1)), this._formatted) }, q.prototype.toJSON = function () { var F = { $mid: 1 }; return this._fsPath && (F.fsPath = this._fsPath, F._sep = b), this._formatted && (F.external = this._formatted), this.path && (F.path = this.path), this.scheme && (F.scheme = this.scheme), this.authority && (F.authority = this.authority), this.query && (F.query = this.query), this.fragment && (F.fragment = this.fragment), F }, q }(A), L = ((u = {})[58] = "%3A", u[47] = "%2F", u[63] = "%3F", u[35] = "%23", u[91] = "%5B", u[93] = "%5D", u[64] = "%40", u[33] = "%21", u[36] = "%24", u[38] = "%26", u[39] = "%27", u[40] = "%28", u[41] = "%29", u[42] = "%2A", u[43] = "%2B", u[44] = "%2C", u[59] = "%3B", u[61] = "%3D", u[32] = "%20", u); function W(M, q, F) { for (var B = void 0, ie = -1, oe = 0; oe < M.length; oe++) { var J = M.charCodeAt(oe); if (J >= 97 && J <= 122 || J >= 65 && J <= 90 || J >= 48 && J <= 57 || J === 45 || J === 46 || J === 95 || J === 126 || q && J === 47 || F && J === 91 || F && J === 93 || F && J === 58) ie !== -1 && (B += encodeURIComponent(M.substring(ie, oe)), ie = -1), B !== void 0 && (B += M.charAt(oe)); else { B === void 0 && (B = M.substr(0, oe)); var dt = L[J]; dt !== void 0 ? (ie !== -1 && (B += encodeURIComponent(M.substring(ie, oe)), ie = -1), B += dt) : ie === -1 && (ie = oe) } } return ie !== -1 && (B += encodeURIComponent(M.substring(ie))), B !== void 0 ? B : M } function Z(M) { for (var q = void 0, F = 0; F < M.length; F++) { var B = M.charCodeAt(F); B === 35 || B === 63 ? (q === void 0 && (q = M.substr(0, F)), q += L[B]) : q !== void 0 && (q += M[F]) } return q !== void 0 ? q : M } function ke(M, q) { var F; return F = M.authority && M.path.length > 1 && M.scheme === "file" ? "//".concat(M.authority).concat(M.path) : M.path.charCodeAt(0) === 47 && (M.path.charCodeAt(1) >= 65 && M.path.charCodeAt(1) <= 90 || M.path.charCodeAt(1) >= 97 && M.path.charCodeAt(1) <= 122) && M.path.charCodeAt(2) === 58 ? q ? M.path.substr(1) : M.path[1].toLowerCase() + M.path.substr(2) : M.path, l.isWindows && (F = F.replace(/\//g, "\\")), F } function we(M, q) { var F = q ? Z : W, B = "", ie = M.scheme, oe = M.authority, J = M.path, dt = M.query, rt = M.fragment; if (ie && (B += ie, B += ":"), (oe || ie === "file") && (B += C, B += C), oe) { var Dt = oe.indexOf("@"); if (Dt !== -1) { var tn = oe.substr(0, Dt); oe = oe.substr(Dt + 1), (Dt = tn.lastIndexOf(":")) === -1 ? B += F(tn, !1, !1) : (B += F(tn.substr(0, Dt), !1, !1), B += ":", B += F(tn.substr(Dt + 1), !1, !0)), B += "@" } (Dt = (oe = oe.toLowerCase()).lastIndexOf(":")) === -1 ? B += F(oe, !1, !0) : (B += F(oe.substr(0, Dt), !1, !0), B += oe.substr(Dt)) } if (J) { if (J.length >= 3 && J.charCodeAt(0) === 47 && J.charCodeAt(2) === 58) (Er = J.charCodeAt(1)) >= 65 && Er <= 90 && (J = "/".concat(String.fromCharCode(Er + 32), ":").concat(J.substr(3))); else if (J.length >= 2 && J.charCodeAt(1) === 58) { var Er; (Er = J.charCodeAt(0)) >= 65 && Er <= 90 && (J = "".concat(String.fromCharCode(Er + 32), ":").concat(J.substr(2))) } B += F(J, !0, !1) } return dt && (B += "?", B += F(dt, !1, !1)), rt && (B += "#", B += q ? rt : W(rt, !1, !1)), B } function Je(M) { try { return decodeURIComponent(M) } catch { return M.length > 3 ? M.substr(0, 3) + Je(M.substr(3)) : M } } o.uriToFsPath = ke; var K = /(%[0-9A-Za-z][0-9A-Za-z])+/g; function le(M) { return M.match(K) ? M.replace(K, function (q) { return Je(q) }) : M } }, 679: function (i, o, a) { var s = this && this.__spreadArray || function (h, y, m) { if (m || arguments.length === 2) for (var R, C = 0, E = y.length; C < E; C++)!R && C in y || (R || (R = Array.prototype.slice.call(y, 0, C)), R[C] = y[C]); return h.concat(R || Array.prototype.slice.call(y)) }; Object.defineProperty(o, "__esModule", { value: !0 }), o.Utils = void 0; var u, c = a(470), l = c.posix || c, d = "/"; (u = o.Utils || (o.Utils = {})).joinPath = function (h) { for (var y = [], m = 1; m < arguments.length; m++)y[m - 1] = arguments[m]; return h.with({ path: l.join.apply(l, s([h.path], y, !1)) }) }, u.resolvePath = function (h) { for (var y = [], m = 1; m < arguments.length; m++)y[m - 1] = arguments[m]; var R = h.path, C = !1; R[0] !== d && (R = d + R, C = !0); var E = l.resolve.apply(l, s([R], y, !1)); return C && E[0] === d && !h.authority && (E = E.substring(1)), h.with({ path: E }) }, u.dirname = function (h) { if (h.path.length === 0 || h.path === d) return h; var y = l.dirname(h.path); return y.length === 1 && y.charCodeAt(0) === 46 && (y = ""), h.with({ path: y }) }, u.basename = function (h) { return l.basename(h.path) }, u.extname = function (h) { return l.extname(h.path) } } }, e = {}; function r(i) { var o = e[i]; if (o !== void 0) return o.exports; var a = e[i] = { exports: {} }; return t[i].call(a.exports, a, a.exports, r), a.exports } var n = {}; return (() => { var i = n; Object.defineProperty(i, "__esModule", { value: !0 }), i.Utils = i.URI = void 0; var o = r(796); Object.defineProperty(i, "URI", { enumerable: !0, get: function () { return o.URI } }); var a = r(679); Object.defineProperty(i, "Utils", { enumerable: !0, get: function () { return a.Utils } }) })(), n })()) }); var Gu = f(Ba => { "use strict"; Object.defineProperty(Ba, "__esModule", { value: !0 }); Ba.eagerLoad = Ba.inject = void 0; function _G(t, e, r, n) { let i = [t, e, r, n].reduce(xb, {}); return Ib(i) } Ba.inject = _G; var ng = Symbol("isProxy"); function Db(t) { if (t && t[ng]) for (let e of Object.values(t)) Db(e); return t } Ba.eagerLoad = Db; function Ib(t, e) { let r = new Proxy({}, { deleteProperty: () => !1, get: (n, i) => Ob(n, i, t, e || r), getOwnPropertyDescriptor: (n, i) => (Ob(n, i, t, e || r), Object.getOwnPropertyDescriptor(n, i)), has: (n, i) => i in t, ownKeys: () => [...Reflect.ownKeys(t), ng] }); return r[ng] = !0, r } var wb = Symbol(); function Ob(t, e, r, n) { if (e in t) { if (t[e] instanceof Error) throw new Error("Construction failure. Please make sure that your dependencies are constructable.", { cause: t[e] }); if (t[e] === wb) throw new Error('Cycle detected. Please make "' + String(e) + '" lazy. See https://langium.org/docs/di/cyclic-dependencies'); return t[e] } else if (e in r) { let i = r[e]; t[e] = wb; try { t[e] = typeof i == "function" ? i(n) : Ib(i, n) } catch (o) { throw t[e] = o instanceof Error ? o : void 0, o } return t[e] } else return } function xb(t, e) { if (e) { for (let [r, n] of Object.entries(e)) if (n !== void 0) { let i = t[r]; i !== null && n !== null && typeof i == "object" && typeof n == "object" ? t[r] = xb(i, n) : t[r] = n } } return t } }); var yn = f(Ql => { "use strict"; Object.defineProperty(Ql, "__esModule", { value: !0 }); Ql.MultiMap = void 0; var Ka = Ft(), ig = class { constructor(e) { if (this.map = new Map, e) for (let [r, n] of e) this.add(r, n) } get size() { return Ka.Reduction.sum((0, Ka.stream)(this.map.values()).map(e => e.length)) } clear() { this.map.clear() } delete(e, r) { if (r === void 0) return this.map.delete(e); { let n = this.map.get(e); if (n) { let i = n.indexOf(r); if (i >= 0) return n.length === 1 ? this.map.delete(e) : n.splice(i, 1), !0 } return !1 } } get(e) { var r; return (r = this.map.get(e)) !== null && r !== void 0 ? r : [] } has(e, r) { if (r === void 0) return this.map.has(e); { let n = this.map.get(e); return n ? n.indexOf(r) >= 0 : !1 } } add(e, r) { return this.map.has(e) ? this.map.get(e).push(r) : this.map.set(e, [r]), this } addAll(e, r) { return this.map.has(e) ? this.map.get(e).push(...r) : this.map.set(e, Array.from(r)), this } forEach(e) { this.map.forEach((r, n) => r.forEach(i => e(i, n, this))) } [Symbol.iterator]() { return this.entries().iterator() } entries() { return (0, Ka.stream)(this.map.entries()).flatMap(([e, r]) => r.map(n => [e, n])) } keys() { return (0, Ka.stream)(this.map.keys()) } values() { return (0, Ka.stream)(this.map.values()).flat() } entriesGroupedByKey() { return (0, Ka.stream)(this.map.entries()) } }; Ql.MultiMap = ig }); var Se = f(_ => { "use strict"; Object.defineProperty(_, "__esModule", { value: !0 }); _.isTypeAttribute = _.TypeAttribute = _.isType = _.Type = _.isTerminalRule = _.TerminalRule = _.isSimpleType = _.SimpleType = _.isReturnType = _.ReturnType = _.isReferenceType = _.ReferenceType = _.isParserRule = _.ParserRule = _.isParameterReference = _.ParameterReference = _.isParameter = _.Parameter = _.isNegation = _.Negation = _.isNamedArgument = _.NamedArgument = _.isLiteralCondition = _.LiteralCondition = _.isInterface = _.Interface = _.isInferredType = _.InferredType = _.isGrammarImport = _.GrammarImport = _.isGrammar = _.Grammar = _.isDisjunction = _.Disjunction = _.isConjunction = _.Conjunction = _.isArrayType = _.ArrayType = _.isAbstractElement = _.AbstractElement = _.isTypeDefinition = _.TypeDefinition = _.isPrimitiveType = _.isFeatureName = _.isCondition = _.Condition = _.isAbstractType = _.AbstractType = _.isAbstractRule = _.AbstractRule = void 0; _.reflection = _.LangiumGrammarAstReflection = _.isWildcard = _.Wildcard = _.isUntilToken = _.UntilToken = _.isUnorderedGroup = _.UnorderedGroup = _.isTerminalRuleCall = _.TerminalRuleCall = _.isTerminalGroup = _.TerminalGroup = _.isTerminalAlternatives = _.TerminalAlternatives = _.isRuleCall = _.RuleCall = _.isRegexToken = _.RegexToken = _.isNegatedToken = _.NegatedToken = _.isKeyword = _.Keyword = _.isGroup = _.Group = _.isCrossReference = _.CrossReference = _.isCharacterRange = _.CharacterRange = _.isAssignment = _.Assignment = _.isAlternatives = _.Alternatives = _.isAction = _.Action = _.isUnionType = _.UnionType = void 0; var TG = er(); _.AbstractRule = "AbstractRule"; function RG(t) { return _.reflection.isInstance(t, _.AbstractRule) } _.isAbstractRule = RG; _.AbstractType = "AbstractType"; function bG(t) { return _.reflection.isInstance(t, _.AbstractType) } _.isAbstractType = bG; _.Condition = "Condition"; function AG(t) { return _.reflection.isInstance(t, _.Condition) } _.isCondition = AG; function PG(t) { return qb(t) || t === "current" || t === "entry" || t === "extends" || t === "false" || t === "fragment" || t === "grammar" || t === "hidden" || t === "import" || t === "interface" || t === "returns" || t === "terminal" || t === "true" || t === "type" || t === "infer" || t === "infers" || t === "with" || typeof t == "string" && /\^?[_a-zA-Z][\w_]*/.test(t) } _.isFeatureName = PG; function qb(t) { return t === "string" || t === "number" || t === "boolean" || t === "Date" || t === "bigint" } _.isPrimitiveType = qb; _.TypeDefinition = "TypeDefinition"; function SG(t) { return _.reflection.isInstance(t, _.TypeDefinition) } _.isTypeDefinition = SG; _.AbstractElement = "AbstractElement"; function CG(t) { return _.reflection.isInstance(t, _.AbstractElement) } _.isAbstractElement = CG; _.ArrayType = "ArrayType"; function EG(t) { return _.reflection.isInstance(t, _.ArrayType) } _.isArrayType = EG; _.Conjunction = "Conjunction"; function NG(t) { return _.reflection.isInstance(t, _.Conjunction) } _.isConjunction = NG; _.Disjunction = "Disjunction"; function kG(t) { return _.reflection.isInstance(t, _.Disjunction) } _.isDisjunction = kG; _.Grammar = "Grammar"; function wG(t) { return _.reflection.isInstance(t, _.Grammar) } _.isGrammar = wG; _.GrammarImport = "GrammarImport"; function OG(t) { return _.reflection.isInstance(t, _.GrammarImport) } _.isGrammarImport = OG; _.InferredType = "InferredType"; function DG(t) { return _.reflection.isInstance(t, _.InferredType) } _.isInferredType = DG; _.Interface = "Interface"; function IG(t) { return _.reflection.isInstance(t, _.Interface) } _.isInterface = IG; _.LiteralCondition = "LiteralCondition"; function xG(t) { return _.reflection.isInstance(t, _.LiteralCondition) } _.isLiteralCondition = xG; _.NamedArgument = "NamedArgument"; function qG(t) { return _.reflection.isInstance(t, _.NamedArgument) } _.isNamedArgument = qG; _.Negation = "Negation"; function LG(t) { return _.reflection.isInstance(t, _.Negation) } _.isNegation = LG; _.Parameter = "Parameter"; function MG(t) { return _.reflection.isInstance(t, _.Parameter) } _.isParameter = MG; _.ParameterReference = "ParameterReference"; function $G(t) { return _.reflection.isInstance(t, _.ParameterReference) } _.isParameterReference = $G; _.ParserRule = "ParserRule"; function FG(t) { return _.reflection.isInstance(t, _.ParserRule) } _.isParserRule = FG; _.ReferenceType = "ReferenceType"; function jG(t) { return _.reflection.isInstance(t, _.ReferenceType) } _.isReferenceType = jG; _.ReturnType = "ReturnType"; function UG(t) { return _.reflection.isInstance(t, _.ReturnType) } _.isReturnType = UG; _.SimpleType = "SimpleType"; function GG(t) { return _.reflection.isInstance(t, _.SimpleType) } _.isSimpleType = GG; _.TerminalRule = "TerminalRule"; function HG(t) { return _.reflection.isInstance(t, _.TerminalRule) } _.isTerminalRule = HG; _.Type = "Type"; function WG(t) { return _.reflection.isInstance(t, _.Type) } _.isType = WG; _.TypeAttribute = "TypeAttribute"; function BG(t) { return _.reflection.isInstance(t, _.TypeAttribute) } _.isTypeAttribute = BG; _.UnionType = "UnionType"; function KG(t) { return _.reflection.isInstance(t, _.UnionType) } _.isUnionType = KG; _.Action = "Action"; function zG(t) { return _.reflection.isInstance(t, _.Action) } _.isAction = zG; _.Alternatives = "Alternatives"; function VG(t) { return _.reflection.isInstance(t, _.Alternatives) } _.isAlternatives = VG; _.Assignment = "Assignment"; function YG(t) { return _.reflection.isInstance(t, _.Assignment) } _.isAssignment = YG; _.CharacterRange = "CharacterRange"; function XG(t) { return _.reflection.isInstance(t, _.CharacterRange) } _.isCharacterRange = XG; _.CrossReference = "CrossReference"; function JG(t) { return _.reflection.isInstance(t, _.CrossReference) } _.isCrossReference = JG; _.Group = "Group"; function QG(t) { return _.reflection.isInstance(t, _.Group) } _.isGroup = QG; _.Keyword = "Keyword"; function ZG(t) { return _.reflection.isInstance(t, _.Keyword) } _.isKeyword = ZG; _.NegatedToken = "NegatedToken"; function eH(t) { return _.reflection.isInstance(t, _.NegatedToken) } _.isNegatedToken = eH; _.RegexToken = "RegexToken"; function tH(t) { return _.reflection.isInstance(t, _.RegexToken) } _.isRegexToken = tH; _.RuleCall = "RuleCall"; function rH(t) { return _.reflection.isInstance(t, _.RuleCall) } _.isRuleCall = rH; _.TerminalAlternatives = "TerminalAlternatives"; function nH(t) { return _.reflection.isInstance(t, _.TerminalAlternatives) } _.isTerminalAlternatives = nH; _.TerminalGroup = "TerminalGroup"; function iH(t) { return _.reflection.isInstance(t, _.TerminalGroup) } _.isTerminalGroup = iH; _.TerminalRuleCall = "TerminalRuleCall"; function oH(t) { return _.reflection.isInstance(t, _.TerminalRuleCall) } _.isTerminalRuleCall = oH; _.UnorderedGroup = "UnorderedGroup"; function aH(t) { return _.reflection.isInstance(t, _.UnorderedGroup) } _.isUnorderedGroup = aH; _.UntilToken = "UntilToken"; function sH(t) { return _.reflection.isInstance(t, _.UntilToken) } _.isUntilToken = sH; _.Wildcard = "Wildcard"; function uH(t) { return _.reflection.isInstance(t, _.Wildcard) } _.isWildcard = uH; var Zl = class extends TG.AbstractAstReflection { getAllTypes() { return ["AbstractElement", "AbstractRule", "AbstractType", "Action", "Alternatives", "ArrayType", "Assignment", "CharacterRange", "Condition", "Conjunction", "CrossReference", "Disjunction", "Grammar", "GrammarImport", "Group", "InferredType", "Interface", "Keyword", "LiteralCondition", "NamedArgument", "NegatedToken", "Negation", "Parameter", "ParameterReference", "ParserRule", "ReferenceType", "RegexToken", "ReturnType", "RuleCall", "SimpleType", "TerminalAlternatives", "TerminalGroup", "TerminalRule", "TerminalRuleCall", "Type", "TypeAttribute", "TypeDefinition", "UnionType", "UnorderedGroup", "UntilToken", "Wildcard"] } computeIsSubtype(e, r) { switch (e) { case _.Action: return this.isSubtype(_.AbstractElement, r) || this.isSubtype(_.AbstractType, r); case _.Alternatives: case _.Assignment: case _.CharacterRange: case _.CrossReference: case _.Group: case _.Keyword: case _.NegatedToken: case _.RegexToken: case _.RuleCall: case _.TerminalAlternatives: case _.TerminalGroup: case _.TerminalRuleCall: case _.UnorderedGroup: case _.UntilToken: case _.Wildcard: return this.isSubtype(_.AbstractElement, r); case _.ArrayType: case _.ReferenceType: case _.SimpleType: case _.UnionType: return this.isSubtype(_.TypeDefinition, r); case _.Conjunction: case _.Disjunction: case _.LiteralCondition: case _.Negation: case _.ParameterReference: return this.isSubtype(_.Condition, r); case _.Interface: case _.Type: return this.isSubtype(_.AbstractType, r); case _.ParserRule: return this.isSubtype(_.AbstractRule, r) || this.isSubtype(_.AbstractType, r); case _.TerminalRule: return this.isSubtype(_.AbstractRule, r); default: return !1 } } getReferenceType(e) { let r = `${e.container.$type}:${e.property}`; switch (r) { case "Action:type": case "CrossReference:type": case "Interface:superTypes": case "ParserRule:returnType": case "SimpleType:typeRef": return _.AbstractType; case "Grammar:hiddenTokens": case "ParserRule:hiddenTokens": case "RuleCall:rule": return _.AbstractRule; case "Grammar:usedGrammars": return _.Grammar; case "NamedArgument:parameter": case "ParameterReference:parameter": return _.Parameter; case "TerminalRuleCall:rule": return _.TerminalRule; default: throw new Error(`${r} is not a valid reference id.`) } } getTypeMetaData(e) { switch (e) { case "Grammar": return { name: "Grammar", mandatory: [{ name: "definesHiddenTokens", type: "boolean" }, { name: "hiddenTokens", type: "array" }, { name: "imports", type: "array" }, { name: "interfaces", type: "array" }, { name: "isDeclared", type: "boolean" }, { name: "rules", type: "array" }, { name: "types", type: "array" }, { name: "usedGrammars", type: "array" }] }; case "Interface": return { name: "Interface", mandatory: [{ name: "attributes", type: "array" }, { name: "superTypes", type: "array" }] }; case "LiteralCondition": return { name: "LiteralCondition", mandatory: [{ name: "true", type: "boolean" }] }; case "NamedArgument": return { name: "NamedArgument", mandatory: [{ name: "calledByName", type: "boolean" }] }; case "ParserRule": return { name: "ParserRule", mandatory: [{ name: "definesHiddenTokens", type: "boolean" }, { name: "entry", type: "boolean" }, { name: "fragment", type: "boolean" }, { name: "hiddenTokens", type: "array" }, { name: "parameters", type: "array" }, { name: "wildcard", type: "boolean" }] }; case "TerminalRule": return { name: "TerminalRule", mandatory: [{ name: "fragment", type: "boolean" }, { name: "hidden", type: "boolean" }] }; case "TypeAttribute": return { name: "TypeAttribute", mandatory: [{ name: "isOptional", type: "boolean" }] }; case "UnionType": return { name: "UnionType", mandatory: [{ name: "types", type: "array" }] }; case "Alternatives": return { name: "Alternatives", mandatory: [{ name: "elements", type: "array" }] }; case "CrossReference": return { name: "CrossReference", mandatory: [{ name: "deprecatedSyntax", type: "boolean" }] }; case "Group": return { name: "Group", mandatory: [{ name: "elements", type: "array" }] }; case "RuleCall": return { name: "RuleCall", mandatory: [{ name: "arguments", type: "array" }] }; case "TerminalAlternatives": return { name: "TerminalAlternatives", mandatory: [{ name: "elements", type: "array" }] }; case "TerminalGroup": return { name: "TerminalGroup", mandatory: [{ name: "elements", type: "array" }] }; case "UnorderedGroup": return { name: "UnorderedGroup", mandatory: [{ name: "elements", type: "array" }] }; default: return { name: e, mandatory: [] } } } }; _.LangiumGrammarAstReflection = Zl; _.reflection = new Zl }); var be = f(it => { "use strict"; Object.defineProperty(it, "__esModule", { value: !0 }); it.copyAstNode = it.findLocalReferences = it.streamReferences = it.streamAst = it.streamAllContents = it.streamContents = it.findRootNode = it.getDocument = it.hasContainerOfType = it.getContainerOfType = it.linkContentToContainer = void 0; var Gn = er(), eo = Ft(), cH = Le(); function Lb(t) { for (let [e, r] of Object.entries(t)) e.startsWith("$") || (Array.isArray(r) ? r.forEach((n, i) => { (0, Gn.isAstNode)(n) && (n.$container = t, n.$containerProperty = e, n.$containerIndex = i) }) : (0, Gn.isAstNode)(r) && (r.$container = t, r.$containerProperty = e)) } it.linkContentToContainer = Lb; function lH(t, e) { let r = t; for (; r;) { if (e(r)) return r; r = r.$container } } it.getContainerOfType = lH; function dH(t, e) { let r = t; for (; r;) { if (e(r)) return !0; r = r.$container } return !1 } it.hasContainerOfType = dH; function Mb(t) { let r = $b(t).$document; if (!r) throw new Error("AST node has no document."); return r } it.getDocument = Mb; function $b(t) { for (; t.$container;)t = t.$container; return t } it.findRootNode = $b; function sg(t, e) { if (!t) throw new Error("Node must be an AstNode."); let r = e?.range; return new eo.StreamImpl(() => ({ keys: Object.keys(t), keyIndex: 0, arrayIndex: 0 }), n => { for (; n.keyIndex < n.keys.length;) { let i = n.keys[n.keyIndex]; if (!i.startsWith("$")) { let o = t[i]; if ((0, Gn.isAstNode)(o)) { if (n.keyIndex++, og(o, r)) return { done: !1, value: o } } else if (Array.isArray(o)) { for (; n.arrayIndex < o.length;) { let a = n.arrayIndex++, s = o[a]; if ((0, Gn.isAstNode)(s) && og(s, r)) return { done: !1, value: s } } n.arrayIndex = 0 } } n.keyIndex++ } return eo.DONE_RESULT }) } it.streamContents = sg; function fH(t, e) { if (!t) throw new Error("Root node must be an AstNode."); return new eo.TreeStreamImpl(t, r => sg(r, e)) } it.streamAllContents = fH; function Fb(t, e) { if (t) { if (e?.range && !og(t, e.range)) return new eo.TreeStreamImpl(t, () => []) } else throw new Error("Root node must be an AstNode."); return new eo.TreeStreamImpl(t, r => sg(r, e), { includeRoot: !0 }) } it.streamAst = Fb; function og(t, e) { var r; if (!e) return !0; let n = (r = t.$cstNode) === null || r === void 0 ? void 0 : r.range; return n ? (0, cH.inRange)(n, e) : !1 } function jb(t) { return new eo.StreamImpl(() => ({ keys: Object.keys(t), keyIndex: 0, arrayIndex: 0 }), e => { for (; e.keyIndex < e.keys.length;) { let r = e.keys[e.keyIndex]; if (!r.startsWith("$")) { let n = t[r]; if ((0, Gn.isReference)(n)) return e.keyIndex++, { done: !1, value: { reference: n, container: t, property: r } }; if (Array.isArray(n)) { for (; e.arrayIndex < n.length;) { let i = e.arrayIndex++, o = n[i]; if ((0, Gn.isReference)(o)) return { done: !1, value: { reference: o, container: t, property: r, index: i } } } e.arrayIndex = 0 } } e.keyIndex++ } return eo.DONE_RESULT }) } it.streamReferences = jb; function pH(t, e = Mb(t).parseResult.value) { let r = []; return Fb(e).forEach(n => { jb(n).forEach(i => { i.reference.ref === t && r.push(i.reference) }) }), (0, eo.stream)(r) } it.findLocalReferences = pH; function ag(t, e) { let r = { $type: t.$type }; for (let [n, i] of Object.entries(t)) if (!n.startsWith("$")) if ((0, Gn.isAstNode)(i)) r[n] = ag(i, e); else if ((0, Gn.isReference)(i)) r[n] = e(r, n, i.$refNode, i.$refText); else if (Array.isArray(i)) { let o = []; for (let a of i) (0, Gn.isAstNode)(a) ? o.push(ag(a, e)) : (0, Gn.isReference)(a) ? o.push(e(r, n, a.$refNode, a.$refText)) : o.push(a); r[n] = o } else r[n] = i; return Lb(r), r } it.copyAstNode = ag }); var Hb = f(ed => { "use strict"; Object.defineProperty(ed, "__esModule", { value: !0 }); ed.getSourceRegion = void 0; var Ub = be(), hH = vt(), mH = Ft(); function gH(t) { var e, r; if (t) { if ("astNode" in t) return _H(t); if (Array.isArray(t)) return t.reduce(Gb, void 0); { let n = t, i = yH(n) ? vH((r = (e = n?.root) === null || e === void 0 ? void 0 : e.element) !== null && r !== void 0 ? r : n?.element) : void 0; return za(n, i) } } else return } ed.getSourceRegion = gH; function yH(t) { return typeof t < "u" && "element" in t && "text" in t } function vH(t) { try { return (0, Ub.getDocument)(t).uri.toString() } catch { return } } function _H(t) { var e, r; let { astNode: n, property: i, index: o } = t ?? {}, a = (e = n?.$cstNode) !== null && e !== void 0 ? e : n?.$textRegion; if (!(n === void 0 || a === void 0)) { if (i === void 0) return za(a, ug(n)); { let s = u => o !== void 0 && o > -1 && Array.isArray(n[i]) ? o < u.length ? u[o] : void 0 : u.reduce(Gb, void 0); if (!((r = a.assignments) === null || r === void 0) && r[i]) { let u = s(a.assignments[i]); return u && za(u, ug(n)) } else if (n.$cstNode) { let u = s((0, hH.findNodesForProperty)(n.$cstNode, i)); return u && za(u, ug(n)) } else return } } } function ug(t) { var e, r, n, i; return t.$cstNode ? (r = (e = (0, Ub.getDocument)(t)) === null || e === void 0 ? void 0 : e.uri) === null || r === void 0 ? void 0 : r.toString() : t.$textRegion ? t.$textRegion.documentURI || ((i = (n = new mH.TreeStreamImpl(t, o => o.$container ? [o.$container] : []).find(o => { var a; return (a = o.$textRegion) === null || a === void 0 ? void 0 : a.documentURI })) === null || n === void 0 ? void 0 : n.$textRegion) === null || i === void 0 ? void 0 : i.documentURI) : void 0 } function za(t, e) { var r, n; let i = { offset: t.offset, end: (r = t.end) !== null && r !== void 0 ? r : t.offset + t.length, length: (n = t.length) !== null && n !== void 0 ? n : t.end - t.offset }; return t.range && (i.range = t.range), e ?? (e = t.fileURI), e && (i.fileURI = e), i } function Gb(t, e) { var r, n; if (t) { if (!e) return t && za(t) } else return e && za(e); let i = (r = t.end) !== null && r !== void 0 ? r : t.offset + t.length, o = (n = e.end) !== null && n !== void 0 ? n : e.offset + e.length, a = Math.min(t.offset, e.offset), s = Math.max(i, o), u = s - a, c = { offset: a, end: s, length: u }; if (t.range && e.range && (c.range = { start: e.range.start.line < t.range.start.line || e.range.start.line === t.range.start.line && e.range.start.character < t.range.start.character ? e.range.start : t.range.start, end: e.range.end.line > t.range.end.line || e.range.end.line === t.range.end.line && e.range.end.character > t.range.end.character ? e.range.end : t.range.end }), t.fileURI || e.fileURI) { let l = t.fileURI, d = e.fileURI, h = l && d && l !== d ? `<unmergable text regions of ${l}, ${d}>` : l ?? d; c.fileURI = h } return c } }); var Vb = f(td => { "use strict"; Object.defineProperty(td, "__esModule", { value: !0 }); td.processGeneratorNode = void 0; var Hu = Ho(), TH = Hb(), cg = class { constructor(e) { this.defaultIndentation = "    ", this.pendingIndent = !0, this.currentIndents = [], this.recentNonImmediateIndents = [], this.traceData = [], this.lines = [[]], typeof e == "string" ? this.defaultIndentation = e : typeof e == "number" && (this.defaultIndentation = "".padStart(e)) } get content() { return this.lines.map(e => e.join("")).join("") } get currentLineNumber() { return this.lines.length - 1 } get currentLineContent() { return this.lines[this.currentLineNumber].join("") } get currentPosition() { return { offset: this.content.length, line: this.currentLineNumber, character: this.currentLineContent.length } } append(e, r) { if (e.length > 0) { let n = r && this.currentPosition; this.lines[this.currentLineNumber].push(e), n && this.indentPendingTraceRegions(n) } } indentPendingTraceRegions(e) { for (let r = this.traceData.length - 1; r >= 0; r--) { let n = this.traceData[r]; n.targetStart && n.targetStart.offset === e.offset && (n.targetStart = this.currentPosition) } } increaseIndent(e) { this.currentIndents.push(e), e.indentImmediately || this.recentNonImmediateIndents.push(e) } decreaseIndent() { this.currentIndents.pop() } get relevantIndents() { return this.currentIndents.filter(e => !this.recentNonImmediateIndents.includes(e)) } resetCurrentLine() { this.lines[this.currentLineNumber] = [] } addNewLine() { this.pendingIndent = !0, this.lines.push([]), this.recentNonImmediateIndents.length = 0 } pushTraceRegion(e) { let r = RH(e, this.currentPosition, n => { var i, o; return (o = (i = this.traceData[this.traceData.length - 1]) === null || i === void 0 ? void 0 : i.children) === null || o === void 0 ? void 0 : o.push(n) }); return this.traceData.push(r), r } popTraceRegion(e) { let r = this.traceData.pop(); return this.assertTrue(r === e, "Trace region mismatch!"), r } getParentTraceSourceFileURI() { var e; for (let r = this.traceData.length - 1; r > -1; r--) { let n = (e = this.traceData[r].sourceRegion) === null || e === void 0 ? void 0 : e.fileURI; if (n) return n } } assertTrue(e, r) { if (!e) throw new Error(r) } }; function RH(t, e, r) { let n = { sourceRegion: t, targetRegion: void 0, children: [], targetStart: e, complete: i => { var o, a; return n.targetRegion = { offset: n.targetStart.offset, end: i.offset, length: i.offset - n.targetStart.offset, range: { start: { line: n.targetStart.line, character: n.targetStart.character }, end: { line: i.line, character: i.character } } }, delete n.targetStart, ((o = n.children) === null || o === void 0 ? void 0 : o.length) === 0 && delete n.children, !((a = n.targetRegion) === null || a === void 0) && a.length && r(n), delete n.complete, n } }; return n } function bH(t, e) { let r = new cg(e), n = r.pushTraceRegion(void 0); Wb(t, r), r.popTraceRegion(n), n.complete && n.complete(r.currentPosition); let i = n.children && n.children.length === 1 ? n.children[0] : void 0, o = i?.targetRegion, a = n.targetRegion; return o && i.sourceRegion && o.offset === a.offset && o.length === a.length ? { text: r.content, trace: i } : { text: r.content, trace: n } } td.processGeneratorNode = bH; function Wb(t, e) { typeof t == "string" ? AH(t, e) : t instanceof Hu.IndentNode ? PH(t, e) : t instanceof Hu.CompositeGeneratorNode ? zb(t, e) : t instanceof Hu.NewLineNode && SH(t, e) } function Bb(t, e) { return typeof t == "string" ? t.length !== 0 : t instanceof Hu.CompositeGeneratorNode ? t.contents.some(r => Bb(r, e)) : t instanceof Hu.NewLineNode ? !(t.ifNotEmpty && e.currentLineContent.length === 0) : !1 } function AH(t, e) { t && (e.pendingIndent && Kb(e, !1), e.append(t)) } function Kb(t, e) { var r; let n = ""; for (let i of t.relevantIndents.filter(o => o.indentEmptyLines || !e)) n += (r = i.indentation) !== null && r !== void 0 ? r : t.defaultIndentation; t.append(n, !0), t.pendingIndent = !1 } function zb(t, e) { let r, n = (0, TH.getSourceRegion)(t.tracedSource); n && (r = e.pushTraceRegion(n)); for (let i of t.contents) Wb(i, e); if (r) { e.popTraceRegion(r); let i = e.getParentTraceSourceFileURI(); i && n?.fileURI === i && delete n.fileURI, r.complete && r.complete(e.currentPosition) } } function PH(t, e) { var r; if (Bb(t, e)) { t.indentImmediately && !e.pendingIndent && e.append((r = t.indentation) !== null && r !== void 0 ? r : e.defaultIndentation, !0); try { e.increaseIndent(t), zb(t, e) } finally { e.decreaseIndent() } } } function SH(t, e) { t.ifNotEmpty && !CH(e.currentLineContent) ? e.resetCurrentLine() : (e.pendingIndent && Kb(e, !0), e.append(t.lineDelimiter), e.addNewLine()) } function CH(t) { return t.trimStart() !== "" } }); var rd = f(St => {
    "use strict"; Object.defineProperty(St, "__esModule", { value: !0 }); St.normalizeEOL = St.findIndentation = St.NEWLINE_REGEXP = St.SNLE = St.expandToString = St.expandToStringWithNL = void 0; var Wu = Ho(); function EH(t, ...e) { return Yb(t, ...e) + Wu.EOL } St.expandToStringWithNL = EH; function Yb(t, ...e) { let r = e.reduce((a, s, u) => { var c; return a + (s === void 0 ? St.SNLE : kH((0, Wu.toString)(s), a)) + ((c = t[u + 1]) !== null && c !== void 0 ? c : "") }, t[0]).split(St.NEWLINE_REGEXP).filter(a => a.trim() !== St.SNLE).map(a => a.replace(St.SNLE, "").trimRight()); r = r.length > 1 && r[0].trim().length === 0 ? r.slice(1) : r, r = r.length !== 0 && r[r.length - 1].trimRight().length === 0 ? r.slice(0, r.length - 1) : r; let o = Xb(r); return r.map(a => a.slice(o).trimRight()).join(Wu.EOL) } St.expandToString = Yb; St.SNLE = Object.freeze("__\xABSKIP^NEW^LINE^IF^EMPTY\xBB__"); St.NEWLINE_REGEXP = /\r?\n/g; var NH = /\S|$/; function kH(t, e) {
      let r = Math.max(0, e.length - e.lastIndexOf(`
`) - 1), n = " ".repeat(r); return t.replace(St.NEWLINE_REGEXP, Wu.EOL + n)
    } function Xb(t) { let e = t.filter(n => n.length > 0).map(n => n.search(NH)), r = e.length === 0 ? 0 : Math.min(...e); return Math.max(0, r) } St.findIndentation = Xb; function wH(t) { return t.replace(St.NEWLINE_REGEXP, Wu.EOL) } St.normalizeEOL = wH
  }); var fg = f(to => { "use strict"; Object.defineProperty(to, "__esModule", { value: !0 }); to.expandTracedToNodeIf = to.expandTracedToNode = to.expandToNode = void 0; var Bu = Ho(), dg = rd(); function Qb(t, ...e) { let r = DH(t), n = IH(t, e, r); return qH(n) } to.expandToNode = Qb; function Zb(t, e, r) { return (n, ...i) => (0, Bu.traceToNode)(t, e, r)(Qb(n, ...i)) } to.expandTracedToNode = Zb; function OH(t, e, r, n) { return t ? Zb(typeof e == "function" ? e() : e, r, n) : () => { } } to.expandTracedToNodeIf = OH; function DH(t) { let e = t.join("_").split(dg.NEWLINE_REGEXP), r = e.length > 1 && e[0].trim().length === 0, n = r && e.length > 1 && e[e.length - 1].trim().length === 0; if (e.length === 1 || e.length !== 0 && e[0].trim().length !== 0 || e.length === 2 && e[1].trim().length === 0) return { indentation: 0, omitFirstLine: r, omitLastLine: n, trimLastLine: e.length !== 1 && e[e.length - 1].trim().length === 0 }; { let i = r ? e.slice(1) : e; i = n ? i.slice(0, i.length - 1) : i, i = i.filter(a => a.length !== 0); let o = (0, dg.findIndentation)(i); return { indentation: o, omitFirstLine: r, omitLastLine: n && (e[e.length - 1].length < o || !e[e.length - 1].startsWith(i[0].substring(0, o))) } } } function IH(t, e, { indentation: r, omitFirstLine: n, omitLastLine: i, trimLastLine: o }) { let a = []; t.forEach((c, l) => { a.push(...c.split(dg.NEWLINE_REGEXP).map((d, h) => h === 0 || d.length < r ? d : d.substring(r)).reduce(l === 0 ? (d, h, y) => y === 0 ? n ? [] : [h] : y === 1 && d.length === 0 ? [h] : d.concat(nd, h) : (d, h, y) => y === 0 ? [h] : d.concat(nd, h), []).filter(d => !(typeof d == "string" && d.length === 0)).concat((0, Bu.isGeneratorNode)(e[l]) ? e[l] : e[l] !== void 0 ? { content: String(e[l]) } : l < e.length ? eA : [])) }); let s = a.length, u = s !== 0 ? a[s - 1] : void 0; return (i || o) && typeof u == "string" && u.trim().length === 0 ? n && s !== 1 && a[s - 2] === nd ? a.slice(0, s - 2) : a.slice(0, s - 1) : a } var nd = { isNewLine: !0 }, eA = { isUndefinedSegment: !0 }, Jb = t => t === nd, lg = t => t === eA, xH = t => t.content !== void 0; function qH(t) { return t.reduce((r, n, i) => lg(n) ? r : Jb(n) ? { node: i !== 0 && (lg(t[i - 1]) || (0, Bu.isGeneratorNode)(t[i - 1])) || i > 1 && typeof t[i - 1] == "string" && (lg(t[i - 2]) || (0, Bu.isGeneratorNode)(t[i - 2])) ? r.node.appendNewLineIfNotEmpty() : r.node.appendNewLine() } : (() => { var o; let a = (i === 0 || Jb(t[i - 1])) && typeof n == "string" && n.length !== 0 ? "".padStart(n.length - n.trimStart().length) : "", s = xH(n) ? n.content : n, u; return { node: r.indented ? r.node : a.length !== 0 ? r.node.indent({ indentation: a, indentImmediately: !1, indentedChildren: c => u = c.append(s) }) : r.node.append(s), indented: u ?? ((o = r.indented) === null || o === void 0 ? void 0 : o.append(s)) } })(), { node: new Bu.CompositeGeneratorNode }).node } }); var Ho = f(De => {
    "use strict"; Object.defineProperty(De, "__esModule", { value: !0 }); De.NLEmpty = De.NL = De.NewLineNode = De.IndentNode = De.traceToNodeIf = De.traceToNode = De.CompositeGeneratorNode = De.toStringAndTrace = De.toString = De.isNewLineNode = De.isGeneratorNode = De.EOL = void 0; var LH = er(), rA = Vb(), tA = fg(); De.EOL = typeof process > "u" ? `
`: process.platform === "win32" ? `\r
`: `
`; function nA(t) { return t instanceof bi || t instanceof Ku || t instanceof Wo } De.isGeneratorNode = nA; function MH(t) { return t instanceof Wo } De.isNewLineNode = MH; function $H(t, e) { return nA(t) ? (0, rA.processGeneratorNode)(t, e).text : String(t) } De.toString = $H; function FH(t, e) { return (0, rA.processGeneratorNode)(t, e) } De.toStringAndTrace = FH; var bi = class { constructor(...e) { this.contents = [], this.append(...e) } isEmpty() { return this.contents.length === 0 } trace(e, r, n) { if ((0, LH.isAstNode)(e)) { if (this.tracedSource = { astNode: e, property: r, index: n }, this.tracedSource.property === void 0 && this.tracedSource.index !== void 0 && this.tracedSource.index > -1) throw new Error("Generation support: 'property' argument must not be 'undefined' if a non-negative value is assigned to 'index' in 'CompositeGeneratorNode.trace(...)'.") } else this.tracedSource = e; return this } append(...e) { for (let r of e) typeof r == "function" ? r(this) : r && this.contents.push(r); return this } appendIf(e, ...r) { return e ? this.append(...r) : this } appendNewLine() { return this.append(De.NL) } appendNewLineIf(e) { return e ? this.append(De.NL) : this } appendNewLineIfNotEmpty() { return this.append(De.NLEmpty) } appendNewLineIfNotEmptyIf(e) { return e ? this.appendNewLineIfNotEmpty() : this } appendTemplate(e, ...r) { return this.append((0, tA.expandToNode)(e, ...r)) } appendTemplateIf(e) { return e ? (r, ...n) => this.appendTemplate(r, ...n) : () => this } indent(e) { let { indentedChildren: r, indentation: n, indentEmptyLines: i, indentImmediately: o } = Array.isArray(e) || typeof e == "function" ? { indentedChildren: e } : typeof e == "object" ? e : {}, a = new Ku(n, o, i); return this.contents.push(a), Array.isArray(r) ? a.append(...r) : r && a.append(r), this } appendTraced(e, r, n) { return i => this.append(new bi().trace(e, r, n).append(i)) } appendTracedIf(e, r, n, i) { return e ? this.appendTraced(typeof r == "function" ? r() : r, n, i) : () => this } appendTracedTemplate(e, r, n) { return (i, ...o) => this.append((0, tA.expandTracedToNode)(e, r, n)(i, ...o)) } appendTracedTemplateIf(e, r, n, i) { return e ? this.appendTracedTemplate(typeof r == "function" ? r() : r, n, i) : () => this } }; De.CompositeGeneratorNode = bi; function iA(t, e, r) { return n => n instanceof bi && n.tracedSource === void 0 ? n.trace(t, e, r) : new bi().trace(t, e, r).append(n) } De.traceToNode = iA; function jH(t, e, r, n) { return t ? iA(typeof e == "function" ? e() : e, r, n) : () => { } } De.traceToNodeIf = jH; var Ku = class extends bi { constructor(e, r = !0, n = !1) { super(), this.indentImmediately = !0, this.indentEmptyLines = !1, typeof e == "string" ? this.indentation = e : typeof e == "number" && (this.indentation = "".padStart(e)), this.indentImmediately = r, this.indentEmptyLines = n } }; De.IndentNode = Ku; var Wo = class { constructor(e, r = !1) { this.ifNotEmpty = !1, this.lineDelimiter = e ?? De.EOL, this.ifNotEmpty = r } }; De.NewLineNode = Wo; De.NL = new Wo; De.NLEmpty = new Wo(void 0, !0)
  }); var Xa = f(Ae => { "use strict"; Object.defineProperty(Ae, "__esModule", { value: !0 }); Ae.isMandatoryPropertyType = Ae.propertyTypeToString = Ae.isTypeAssignable = Ae.TypeResolutionError = Ae.InterfaceType = Ae.UnionType = Ae.isInterfaceType = Ae.isUnionType = Ae.isStringType = Ae.isPrimitiveType = Ae.isValueType = Ae.flattenPropertyUnion = Ae.isPropertyUnion = Ae.isArrayType = Ae.isReferenceType = void 0; var Me = Ho(), Va = Ja(); function zu(t) { return "referenceType" in t } Ae.isReferenceType = zu; function Vu(t) { return "elementType" in t } Ae.isArrayType = Vu; function wr(t) { return "types" in t } Ae.isPropertyUnion = wr; function aA(t) { if (wr(t)) { let e = []; for (let r of t.types) e.push(...aA(r)); return e } else return [t] } Ae.flattenPropertyUnion = aA; function Bo(t) { return "value" in t } Ae.isValueType = Bo; function Hn(t) { return "primitive" in t } Ae.isPrimitiveType = Hn; function no(t) { return "string" in t } Ae.isStringType = no; function Ya(t) { return t && "type" in t } Ae.isUnionType = Ya; function yg(t) { return t && "properties" in t } Ae.isInterfaceType = yg; var hg = class { constructor(e, r) { var n; this.superTypes = new Set, this.subTypes = new Set, this.containerTypes = new Set, this.typeNames = new Set, this.name = e, this.declared = (n = r?.declared) !== null && n !== void 0 ? n : !1, this.dataType = r?.dataType } toAstTypesString(e) { let r = new Me.CompositeGeneratorNode; return r.append(`export type ${this.name} = ${Ko(this.type, "AstType")};`, Me.NL), e && (r.append(Me.NL), uA(r, this.name)), this.dataType && UH(r, this), (0, Me.toString)(r) } toDeclaredTypesString(e) { let r = new Me.CompositeGeneratorNode; return r.append(`type ${_g(this.name, e)} = ${Ko(this.type, "DeclaredType")};`, Me.NL), (0, Me.toString)(r) } }; Ae.UnionType = hg; var Yu = class { get superProperties() { return this.getSuperProperties(new Set) } getSuperProperties(e) { if (e.has(this.name)) return []; e.add(this.name); let r = new Map; for (let n of this.properties) r.set(n.name, n); for (let n of this.interfaceSuperTypes) { let i = n.getSuperProperties(e); for (let o of i) r.has(o.name) || r.set(o.name, o) } return Array.from(r.values()) } get allProperties() { let e = new Map(this.superProperties.map(n => [n.name, n])); for (let n of this.subTypes) this.getSubTypeProperties(n, e, new Set); return Array.from(e.values()) } getSubTypeProperties(e, r, n) { if (n.has(this.name)) return; n.add(this.name); let i = yg(e) ? e.properties : []; for (let o of i) r.has(o.name) || r.set(o.name, o); for (let o of e.subTypes) this.getSubTypeProperties(o, r, n) } get interfaceSuperTypes() { return Array.from(this.superTypes).filter(e => e instanceof Yu) } constructor(e, r, n) { this.superTypes = new Set, this.subTypes = new Set, this.containerTypes = new Set, this.typeNames = new Set, this.declared = !1, this.abstract = !1, this.properties = [], this.name = e, this.declared = r, this.abstract = n } toAstTypesString(e) { let r = new Me.CompositeGeneratorNode, n = this.interfaceSuperTypes.map(o => o.name), i = n.length > 0 ? (0, Va.distinctAndSorted)([...n]) : ["AstNode"]; return r.append(`export interface ${this.name} extends ${i.join(", ")} {`, Me.NL), r.indent(o => { this.containerTypes.size > 0 && o.append(`readonly $container: ${(0, Va.distinctAndSorted)([...this.containerTypes].map(a => a.name)).join(" | ")};`, Me.NL), this.typeNames.size > 0 && o.append(`readonly $type: ${(0, Va.distinctAndSorted)([...this.typeNames]).map(a => `'${a}'`).join(" | ")};`, Me.NL), oA(o, this.properties, "AstType") }), r.append("}", Me.NL), e && (r.append(Me.NL), uA(r, this.name)), (0, Me.toString)(r) } toDeclaredTypesString(e) { let r = new Me.CompositeGeneratorNode, n = _g(this.name, e), i = (0, Va.distinctAndSorted)(this.interfaceSuperTypes.map(o => o.name)).join(", "); return r.append(`interface ${n}${i.length > 0 ? ` extends ${i}` : ""} {`, Me.NL), r.indent(o => oA(o, this.properties, "DeclaredType", e)), r.append("}", Me.NL), (0, Me.toString)(r) } }; Ae.InterfaceType = Yu; var mg = class extends Error { constructor(e, r) { super(e), this.name = "TypeResolutionError", this.target = r } }; Ae.TypeResolutionError = mg; function ro(t, e) { return wr(t) ? t.types.every(r => ro(r, e)) : wr(e) ? e.types.some(r => ro(t, r)) : Bo(e) && Ya(e.value) ? Bo(t) && Ya(t.value) && e.value.name === t.value.name ? !0 : ro(t, e.value.type) : zu(t) ? zu(e) && ro(t.referenceType, e.referenceType) : Vu(t) ? Vu(e) && ro(t.elementType, e.elementType) : Bo(t) ? Ya(t.value) ? ro(t.value.type, e) : Bo(e) ? Ya(e.value) ? ro(t, e.value.type) : sA(t.value, e.value, new Set) : !1 : Hn(t) ? Hn(e) && t.primitive === e.primitive : no(t) ? Hn(e) && e.primitive === "string" || no(e) && e.string === t.string : !1 } Ae.isTypeAssignable = ro; function sA(t, e, r) { if (r.has(t.name) || (r.add(t.name), t.name === e.name)) return !0; for (let n of t.superTypes) if (yg(n) && sA(n, e, r)) return !0; return !1 } function Ko(t, e = "AstType") { if (zu(t)) { let r = Ko(t.referenceType, e); return e === "AstType" ? `Reference<${r}>` : `@${pg(t.referenceType, r)}` } else if (Vu(t)) { let r = Ko(t.elementType, e); return e === "AstType" ? `Array<${r}>` : `${pg(t.elementType, r)}[]` } else if (wr(t)) { let r = t.types.map(n => pg(n, Ko(n, e))); return (0, Va.distinctAndSorted)(r).join(" | ") } else { if (Bo(t)) return t.value.name; if (Hn(t)) return t.primitive; if (no(t)) { let r = e === "AstType" ? "'" : '"'; return `${r}${t.string}${r}` } } throw new Error("Invalid type") } Ae.propertyTypeToString = Ko; function pg(t, e) { return wr(t) && (e = `(${e})`), e } function oA(t, e, r, n = new Set) { function i(o) { let a = r === "AstType" ? o.name : _g(o.name, n), s = o.optional && !vg(o.type), u = Ko(o.type, r); return `${a}${s ? "?" : ""}: ${u}` } (0, Va.distinctAndSorted)(e, (o, a) => o.name.localeCompare(a.name)).forEach(o => t.append(i(o), Me.NL)) } function vg(t) { return Vu(t) ? !0 : zu(t) ? !1 : wr(t) ? t.types.every(e => vg(e)) : Hn(t) ? t.primitive === "boolean" : !1 } Ae.isMandatoryPropertyType = vg; function uA(t, e) { t.append(`export const ${e} = '${e}';`, Me.NL), t.append(Me.NL), t.append(`export function is${e}(item: unknown): item is ${e} {`, Me.NL), t.indent(r => r.append(`return reflection.isInstance(item, ${e});`, Me.NL)), t.append("}", Me.NL) } function UH(t, e) { switch (e.dataType) { case "string": if (gg(e.type)) { let r = Array.from(e.subTypes).map(o => o.name), n = cA(e.type), i = lA(e.type); if (r.length === 0 && n.length === 0 && i.length === 0) id(t, e.name, `typeof item === '${e.dataType}'`); else { let o = GH(r, n, i); id(t, e.name, o) } } break; case "number": case "boolean": case "bigint": id(t, e.name, `typeof item === '${e.dataType}'`); break; case "Date": id(t, e.name, "item instanceof Date"); break; default: return } } function gg(t) { let e = !0; if (Hn(t)) return t.primitive === "string"; if (no(t)) return !0; if (wr(t)) { for (let r of t.types) if (Bo(r)) if (Ya(r.value)) { if (!gg(r.value.type)) return !1 } else return !1; else if (Hn(r)) { if (r.primitive !== "string" || !r.regex) return !1 } else if (wr(r)) e = gg(r); else if (!no(r)) return !1 } else return !1; return e } function GH(t, e, r) { let n = [...t.map(i => `is${i}(item)`), ...e.map(i => `item === '${i}'`)]; if (r.length > 0) { let i = r.map(o => `/${o}/.test(item)`).join(" || "); n.push(`(typeof item === 'string' && (${i}))`) } return n.join(" || ") } function _g(t, e) { return e.has(t) ? `^${t}` : t } function cA(t) { let e = []; if (no(t)) return [t.string]; if (wr(t)) for (let r of t.types) no(r) ? e.push(r.string) : wr(r) && e.push(...cA(r)); return e } function lA(t) { let e = []; if (Hn(t) && t.primitive === "string" && t.regex && e.push(t.regex), wr(t)) for (let r of t.types) Hn(r) && r.primitive === "string" && r.regex ? e.push(r.regex) : wr(r) && e.push(...lA(r)); return e } function id(t, e, r) { t.append(Me.NL, `export function is${e}(item: unknown): item is ${e} {`, Me.NL), t.indent(n => n.append(`return ${r};`, Me.NL)), t.append("}", Me.NL) } }); var Ja = f(Ye => { "use strict"; Object.defineProperty(Ye, "__esModule", { value: !0 }); Ye.isAstType = Ye.findReferenceTypes = Ye.hasBooleanType = Ye.hasArrayType = Ye.sortInterfacesTopologically = Ye.mergeTypesAndInterfaces = Ye.mergeInterfaces = Ye.collectSuperTypes = Ye.collectTypeHierarchy = Ye.collectChildrenTypes = Ye.distinctAndSorted = Ye.collectAllPlainProperties = void 0; var Xu = yn(), Ai = Se(), Wn = Xa(); function HH(t) { let e = new Xu.MultiMap; for (let r of t) e.addAll(r.name, r.properties); for (let r of t) for (let n of r.superTypes) { let i = e.get(n); i && e.addAll(r.name, i) } return e } Ye.collectAllPlainProperties = HH; function WH(t, e) { return Array.from(new Set(t)).sort(e) } Ye.distinctAndSorted = WH; function dA(t, e, r, n) { let i = new Set; return i.add(t), e.findReferences(t, {}).forEach(a => { let s = r.getOrCreateDocument(a.sourceUri), u = n.getAstNode(s.parseResult.value, a.sourcePath); (0, Ai.isInterface)(u) ? (i.add(u), dA(u, e, r, n).forEach(l => i.add(l))) : u && (0, Ai.isType)(u.$container) && i.add(u.$container) }), i } Ye.collectChildrenTypes = dA; function BH(t) { let e = new Set(t), r = new Xu.MultiMap, n = new Xu.MultiMap; for (let a of e) { for (let s of a.superTypes) e.has(s) && (r.add(a.name, s.name), n.add(s.name, a.name)); for (let s of a.subTypes) e.has(s) && (r.add(s.name, a.name), n.add(a.name, s.name)) } let i = new Xu.MultiMap, o = new Xu.MultiMap; for (let [a, s] of Array.from(r.entriesGroupedByKey()).sort(([u], [c]) => u.localeCompare(c))) i.addAll(a, Array.from(new Set(s))); for (let [a, s] of Array.from(n.entriesGroupedByKey()).sort(([u], [c]) => u.localeCompare(c))) o.addAll(a, Array.from(new Set(s))); return { superTypes: i, subTypes: o } } Ye.collectTypeHierarchy = BH; function Tg(t) { let e = new Set; if ((0, Ai.isInterface)(t)) e.add(t), t.superTypes.forEach(r => { if ((0, Ai.isInterface)(r.ref)) { e.add(r.ref); let n = Tg(r.ref); for (let i of n) e.add(i) } }); else if ((0, Ai.isType)(t)) { let r = fA(t.type); for (let n of r) { let i = Tg(n); for (let o of i) e.add(o) } } return e } Ye.collectSuperTypes = Tg; function fA(t) { var e; if ((0, Ai.isUnionType)(t)) return t.types.flatMap(r => fA(r)); if ((0, Ai.isSimpleType)(t)) { let r = (e = t.typeRef) === null || e === void 0 ? void 0 : e.ref; if ((0, Ai.isType)(r) || (0, Ai.isInterface)(r)) return [r] } return [] } function KH(t, e) { return t.interfaces.concat(e.interfaces) } Ye.mergeInterfaces = KH; function zH(t) { return t.interfaces.concat(t.unions) } Ye.mergeTypesAndInterfaces = zH; function VH(t) { let e = t.sort((i, o) => i.name.localeCompare(o.name)).map(i => ({ value: i, nodes: [] })); for (let i of e) i.nodes = e.filter(o => i.value.superTypes.has(o.value.name)); let r = [], n = e.filter(i => i.nodes.length === 0); for (; n.length > 0;) { let i = n.shift(); r.includes(i) || (r.push(i), e.filter(o => o.nodes.includes(i)).forEach(o => n.push(o))) } return r.map(i => i.value) } Ye.sortInterfacesTopologically = VH; function pA(t) { return (0, Wn.isPropertyUnion)(t) ? t.types.some(e => pA(e)) : !!(0, Wn.isArrayType)(t) } Ye.hasArrayType = pA; function hA(t) { return (0, Wn.isPropertyUnion)(t) ? t.types.some(e => hA(e)) : (0, Wn.isPrimitiveType)(t) ? t.primitive === "boolean" : !1 } Ye.hasBooleanType = hA; function Rg(t) { if ((0, Wn.isPropertyUnion)(t)) return t.types.flatMap(e => Rg(e)); if ((0, Wn.isReferenceType)(t)) { let e = t.referenceType; if ((0, Wn.isValueType)(e)) return [e.value.name] } else if ((0, Wn.isArrayType)(t)) return Rg(t.elementType); return [] } Ye.findReferenceTypes = Rg; function bg(t) { if ((0, Wn.isPropertyUnion)(t)) return t.types.every(bg); if ((0, Wn.isValueType)(t)) { let e = t.value; return "type" in e ? bg(e.type) : !0 } return !1 } Ye.isAstType = bg }); var Za = f(Qa => { "use strict"; Object.defineProperty(Qa, "__esModule", { value: !0 }); Qa.DefaultNameProvider = Qa.isNamed = void 0; var YH = vt(); function mA(t) { return typeof t.name == "string" } Qa.isNamed = mA; var Ag = class { getName(e) { if (mA(e)) return e.name } getNameNode(e) { return (0, YH.findNodeForProperty)(e.$cstNode, "name") } }; Qa.DefaultNameProvider = Ag }); var Ju = f((gA, od) => {
    (function (t, e) { typeof define == "function" && define.amd ? define([], e) : typeof od == "object" && od.exports ? od.exports = e() : t.regexpToAst = e() })(typeof self < "u" ? self : gA, function () {
      function t() { } t.prototype.saveState = function () { return { idx: this.idx, input: this.input, groupIdx: this.groupIdx } }, t.prototype.restoreState = function (m) { this.idx = m.idx, this.input = m.input, this.groupIdx = m.groupIdx }, t.prototype.pattern = function (m) { this.idx = 0, this.input = m, this.groupIdx = 0, this.consumeChar("/"); var R = this.disjunction(); this.consumeChar("/"); for (var C = { type: "Flags", loc: { begin: this.idx, end: m.length }, global: !1, ignoreCase: !1, multiLine: !1, unicode: !1, sticky: !1 }; this.isRegExpFlag();)switch (this.popChar()) { case "g": a(C, "global"); break; case "i": a(C, "ignoreCase"); break; case "m": a(C, "multiLine"); break; case "u": a(C, "unicode"); break; case "y": a(C, "sticky"); break }if (this.idx !== this.input.length) throw Error("Redundant input: " + this.input.substring(this.idx)); return { type: "Pattern", flags: C, value: R, loc: this.loc(0) } }, t.prototype.disjunction = function () { var m = [], R = this.idx; for (m.push(this.alternative()); this.peekChar() === "|";)this.consumeChar("|"), m.push(this.alternative()); return { type: "Disjunction", value: m, loc: this.loc(R) } }, t.prototype.alternative = function () { for (var m = [], R = this.idx; this.isTerm();)m.push(this.term()); return { type: "Alternative", value: m, loc: this.loc(R) } }, t.prototype.term = function () { return this.isAssertion() ? this.assertion() : this.atom() }, t.prototype.assertion = function () { var m = this.idx; switch (this.popChar()) { case "^": return { type: "StartAnchor", loc: this.loc(m) }; case "$": return { type: "EndAnchor", loc: this.loc(m) }; case "\\": switch (this.popChar()) { case "b": return { type: "WordBoundary", loc: this.loc(m) }; case "B": return { type: "NonWordBoundary", loc: this.loc(m) } }throw Error("Invalid Assertion Escape"); case "(": this.consumeChar("?"); var R; switch (this.popChar()) { case "=": R = "Lookahead"; break; case "!": R = "NegativeLookahead"; break }s(R); var C = this.disjunction(); return this.consumeChar(")"), { type: R, value: C, loc: this.loc(m) } }u() }, t.prototype.quantifier = function (m) { var R, C = this.idx; switch (this.popChar()) { case "*": R = { atLeast: 0, atMost: 1 / 0 }; break; case "+": R = { atLeast: 1, atMost: 1 / 0 }; break; case "?": R = { atLeast: 0, atMost: 1 }; break; case "{": var E = this.integerIncludingZero(); switch (this.popChar()) { case "}": R = { atLeast: E, atMost: E }; break; case ",": var A; this.isDigit() ? (A = this.integerIncludingZero(), R = { atLeast: E, atMost: A }) : R = { atLeast: E, atMost: 1 / 0 }, this.consumeChar("}"); break }if (m === !0 && R === void 0) return; s(R); break }if (!(m === !0 && R === void 0)) return s(R), this.peekChar(0) === "?" ? (this.consumeChar("?"), R.greedy = !1) : R.greedy = !0, R.type = "Quantifier", R.loc = this.loc(C), R }, t.prototype.atom = function () { var m, R = this.idx; switch (this.peekChar()) { case ".": m = this.dotAll(); break; case "\\": m = this.atomEscape(); break; case "[": m = this.characterClass(); break; case "(": m = this.group(); break }return m === void 0 && this.isPatternCharacter() && (m = this.patternCharacter()), s(m), m.loc = this.loc(R), this.isQuantifier() && (m.quantifier = this.quantifier()), m }, t.prototype.dotAll = function () {
        return this.consumeChar("."), {
          type: "Set", complement: !0, value: [i(`
`), i("\r"), i("\u2028"), i("\u2029")]
        }
      }, t.prototype.atomEscape = function () { switch (this.consumeChar("\\"), this.peekChar()) { case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9": return this.decimalEscapeAtom(); case "d": case "D": case "s": case "S": case "w": case "W": return this.characterClassEscape(); case "f": case "n": case "r": case "t": case "v": return this.controlEscapeAtom(); case "c": return this.controlLetterEscapeAtom(); case "0": return this.nulCharacterAtom(); case "x": return this.hexEscapeSequenceAtom(); case "u": return this.regExpUnicodeEscapeSequenceAtom(); default: return this.identityEscapeAtom() } }, t.prototype.decimalEscapeAtom = function () { var m = this.positiveInteger(); return { type: "GroupBackReference", value: m } }, t.prototype.characterClassEscape = function () { var m, R = !1; switch (this.popChar()) { case "d": m = l; break; case "D": m = l, R = !0; break; case "s": m = h; break; case "S": m = h, R = !0; break; case "w": m = d; break; case "W": m = d, R = !0; break }return s(m), { type: "Set", value: m, complement: R } }, t.prototype.controlEscapeAtom = function () {
        var m; switch (this.popChar()) {
          case "f": m = i("\f"); break; case "n": m = i(`
`); break; case "r": m = i("\r"); break; case "t": m = i("	"); break; case "v": m = i("\v"); break
        }return s(m), { type: "Character", value: m }
      }, t.prototype.controlLetterEscapeAtom = function () { this.consumeChar("c"); var m = this.popChar(); if (/[a-zA-Z]/.test(m) === !1) throw Error("Invalid "); var R = m.toUpperCase().charCodeAt(0) - 64; return { type: "Character", value: R } }, t.prototype.nulCharacterAtom = function () { return this.consumeChar("0"), { type: "Character", value: i("\0") } }, t.prototype.hexEscapeSequenceAtom = function () { return this.consumeChar("x"), this.parseHexDigits(2) }, t.prototype.regExpUnicodeEscapeSequenceAtom = function () { return this.consumeChar("u"), this.parseHexDigits(4) }, t.prototype.identityEscapeAtom = function () { var m = this.popChar(); return { type: "Character", value: i(m) } }, t.prototype.classPatternCharacterAtom = function () {
        switch (this.peekChar()) {
          case `
`: case "\r": case "\u2028": case "\u2029": case "\\": case "]": throw Error("TBD"); default: var m = this.popChar(); return { type: "Character", value: i(m) }
        }
      }, t.prototype.characterClass = function () { var m = [], R = !1; for (this.consumeChar("["), this.peekChar(0) === "^" && (this.consumeChar("^"), R = !0); this.isClassAtom();) { var C = this.classAtom(), E = C.type === "Character"; if (E && this.isRangeDash()) { this.consumeChar("-"); var A = this.classAtom(), b = A.type === "Character"; if (b) { if (A.value < C.value) throw Error("Range out of order in character class"); m.push({ from: C.value, to: A.value }) } else o(C.value, m), m.push(i("-")), o(A.value, m) } else o(C.value, m) } return this.consumeChar("]"), { type: "Set", complement: R, value: m } }, t.prototype.classAtom = function () {
        switch (this.peekChar()) {
          case "]": case `
`: case "\r": case "\u2028": case "\u2029": throw Error("TBD"); case "\\": return this.classEscape(); default: return this.classPatternCharacterAtom()
        }
      }, t.prototype.classEscape = function () { switch (this.consumeChar("\\"), this.peekChar()) { case "b": return this.consumeChar("b"), { type: "Character", value: i("\b") }; case "d": case "D": case "s": case "S": case "w": case "W": return this.characterClassEscape(); case "f": case "n": case "r": case "t": case "v": return this.controlEscapeAtom(); case "c": return this.controlLetterEscapeAtom(); case "0": return this.nulCharacterAtom(); case "x": return this.hexEscapeSequenceAtom(); case "u": return this.regExpUnicodeEscapeSequenceAtom(); default: return this.identityEscapeAtom() } }, t.prototype.group = function () { var m = !0; switch (this.consumeChar("("), this.peekChar(0)) { case "?": this.consumeChar("?"), this.consumeChar(":"), m = !1; break; default: this.groupIdx++; break }var R = this.disjunction(); this.consumeChar(")"); var C = { type: "Group", capturing: m, value: R }; return m && (C.idx = this.groupIdx), C }, t.prototype.positiveInteger = function () { var m = this.popChar(); if (n.test(m) === !1) throw Error("Expecting a positive integer"); for (; r.test(this.peekChar(0));)m += this.popChar(); return parseInt(m, 10) }, t.prototype.integerIncludingZero = function () { var m = this.popChar(); if (r.test(m) === !1) throw Error("Expecting an integer"); for (; r.test(this.peekChar(0));)m += this.popChar(); return parseInt(m, 10) }, t.prototype.patternCharacter = function () {
        var m = this.popChar(); switch (m) {
          case `
`: case "\r": case "\u2028": case "\u2029": case "^": case "$": case "\\": case ".": case "*": case "+": case "?": case "(": case ")": case "[": case "|": throw Error("TBD"); default: return { type: "Character", value: i(m) }
        }
      }, t.prototype.isRegExpFlag = function () { switch (this.peekChar(0)) { case "g": case "i": case "m": case "u": case "y": return !0; default: return !1 } }, t.prototype.isRangeDash = function () { return this.peekChar() === "-" && this.isClassAtom(1) }, t.prototype.isDigit = function () { return r.test(this.peekChar(0)) }, t.prototype.isClassAtom = function (m) {
        switch (m === void 0 && (m = 0), this.peekChar(m)) {
          case "]": case `
`: case "\r": case "\u2028": case "\u2029": return !1; default: return !0
        }
      }, t.prototype.isTerm = function () { return this.isAtom() || this.isAssertion() }, t.prototype.isAtom = function () { if (this.isPatternCharacter()) return !0; switch (this.peekChar(0)) { case ".": case "\\": case "[": case "(": return !0; default: return !1 } }, t.prototype.isAssertion = function () { switch (this.peekChar(0)) { case "^": case "$": return !0; case "\\": switch (this.peekChar(1)) { case "b": case "B": return !0; default: return !1 }case "(": return this.peekChar(1) === "?" && (this.peekChar(2) === "=" || this.peekChar(2) === "!"); default: return !1 } }, t.prototype.isQuantifier = function () { var m = this.saveState(); try { return this.quantifier(!0) !== void 0 } catch { return !1 } finally { this.restoreState(m) } }, t.prototype.isPatternCharacter = function () {
        switch (this.peekChar()) {
          case "^": case "$": case "\\": case ".": case "*": case "+": case "?": case "(": case ")": case "[": case "|": case "/": case `
`: case "\r": case "\u2028": case "\u2029": return !1; default: return !0
        }
      }, t.prototype.parseHexDigits = function (m) { for (var R = "", C = 0; C < m; C++) { var E = this.popChar(); if (e.test(E) === !1) throw Error("Expecting a HexDecimal digits"); R += E } var A = parseInt(R, 16); return { type: "Character", value: A } }, t.prototype.peekChar = function (m) { return m === void 0 && (m = 0), this.input[this.idx + m] }, t.prototype.popChar = function () { var m = this.peekChar(0); return this.consumeChar(), m }, t.prototype.consumeChar = function (m) { if (m !== void 0 && this.input[this.idx] !== m) throw Error("Expected: '" + m + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx); if (this.idx >= this.input.length) throw Error("Unexpected end of input"); this.idx++ }, t.prototype.loc = function (m) { return { begin: m, end: this.idx } }; var e = /[0-9a-fA-F]/, r = /[0-9]/, n = /[1-9]/; function i(m) { return m.charCodeAt(0) } function o(m, R) { m.length !== void 0 ? m.forEach(function (C) { R.push(C) }) : R.push(m) } function a(m, R) { if (m[R] === !0) throw "duplicate flag " + R; m[R] = !0 } function s(m) { if (m === void 0) throw Error("Internal Error - Should never get here!") } function u() { throw Error("Internal Error - Should never get here!") } var c, l = []; for (c = i("0"); c <= i("9"); c++)l.push(c); var d = [i("_")].concat(l); for (c = i("a"); c <= i("z"); c++)d.push(c); for (c = i("A"); c <= i("Z"); c++)d.push(c); var h = [i(" "), i("\f"), i(`
`), i("\r"), i("	"), i("\v"), i("	"), i("\xA0"), i("\u1680"), i("\u2000"), i("\u2001"), i("\u2002"), i("\u2003"), i("\u2004"), i("\u2005"), i("\u2006"), i("\u2007"), i("\u2008"), i("\u2009"), i("\u200A"), i("\u2028"), i("\u2029"), i("\u202F"), i("\u205F"), i("\u3000"), i("\uFEFF")]; function y() { } return y.prototype.visitChildren = function (m) { for (var R in m) { var C = m[R]; m.hasOwnProperty(R) && (C.type !== void 0 ? this.visit(C) : Array.isArray(C) && C.forEach(function (E) { this.visit(E) }, this)) } }, y.prototype.visit = function (m) { switch (m.type) { case "Pattern": this.visitPattern(m); break; case "Flags": this.visitFlags(m); break; case "Disjunction": this.visitDisjunction(m); break; case "Alternative": this.visitAlternative(m); break; case "StartAnchor": this.visitStartAnchor(m); break; case "EndAnchor": this.visitEndAnchor(m); break; case "WordBoundary": this.visitWordBoundary(m); break; case "NonWordBoundary": this.visitNonWordBoundary(m); break; case "Lookahead": this.visitLookahead(m); break; case "NegativeLookahead": this.visitNegativeLookahead(m); break; case "Character": this.visitCharacter(m); break; case "Set": this.visitSet(m); break; case "Group": this.visitGroup(m); break; case "GroupBackReference": this.visitGroupBackReference(m); break; case "Quantifier": this.visitQuantifier(m); break }this.visitChildren(m) }, y.prototype.visitPattern = function (m) { }, y.prototype.visitFlags = function (m) { }, y.prototype.visitDisjunction = function (m) { }, y.prototype.visitAlternative = function (m) { }, y.prototype.visitStartAnchor = function (m) { }, y.prototype.visitEndAnchor = function (m) { }, y.prototype.visitWordBoundary = function (m) { }, y.prototype.visitNonWordBoundary = function (m) { }, y.prototype.visitLookahead = function (m) { }, y.prototype.visitNegativeLookahead = function (m) { }, y.prototype.visitCharacter = function (m) { }, y.prototype.visitSet = function (m) { }, y.prototype.visitGroup = function (m) { }, y.prototype.visitGroupBackReference = function (m) { }, y.prototype.visitQuantifier = function (m) { }, { RegExpParser: t, BaseRegExpVisitor: y, VERSION: "0.5.0" }
    })
  }); var Vo = f(tr => {
    "use strict"; Object.defineProperty(tr, "__esModule", { value: !0 }); tr.partialRegex = tr.partialMatches = tr.getCaseInsensitivePattern = tr.escapeRegExp = tr.isWhitespaceRegExp = tr.isMultilineComment = tr.getTerminalParts = void 0; var yA = Ju(), vA = new yA.RegExpParser, Pg = class extends yA.BaseRegExpVisitor {
      constructor() { super(...arguments), this.isStarting = !0, this.endRegexStack = [], this.multiline = !1 } get endRegex() { return this.endRegexStack.join("") } reset(e) { this.multiline = !1, this.regex = e, this.startRegex = "", this.isStarting = !0, this.endRegexStack = [] } visitGroup(e) { e.quantifier && (this.isStarting = !1, this.endRegexStack = []) } visitCharacter(e) {
        let r = String.fromCharCode(e.value); if (!this.multiline && r === `
`&& (this.multiline = !0), e.quantifier) this.isStarting = !1, this.endRegexStack = []; else { let n = Sg(r); this.endRegexStack.push(n), this.isStarting && (this.startRegex += n) }
      } visitSet(e) {
        if (!this.multiline) {
          let r = this.regex.substring(e.loc.begin, e.loc.end), n = new RegExp(r); this.multiline = Boolean(`
`.match(n))
        } if (e.quantifier) this.isStarting = !1, this.endRegexStack = []; else { let r = this.regex.substring(e.loc.begin, e.loc.end); this.endRegexStack.push(r), this.isStarting && (this.startRegex += r) }
      } visitChildren(e) { e.type === "Group" && e.quantifier || super.visitChildren(e) }
    }, zo = new Pg; function XH(t) { try { typeof t != "string" && (t = t.source), t = `/${t}/`; let e = vA.pattern(t), r = []; for (let n of e.value.value) zo.reset(t), zo.visit(n), r.push({ start: zo.startRegex, end: zo.endRegex }); return r } catch { return [] } } tr.getTerminalParts = XH; function JH(t) { try { return typeof t != "string" && (t = t.source), t = `/${t}/`, zo.reset(t), zo.visit(vA.pattern(t)), zo.multiline } catch { return !1 } } tr.isMultilineComment = JH; function QH(t) { return (typeof t == "string" ? new RegExp(t) : t).test(" ") } tr.isWhitespaceRegExp = QH; function Sg(t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") } tr.escapeRegExp = Sg; function ZH(t) { return Array.prototype.map.call(t, e => /\w/.test(e) ? `[${e.toLowerCase()}${e.toUpperCase()}]` : Sg(e)).join("") } tr.getCaseInsensitivePattern = ZH; function eW(t, e) { let r = _A(t), n = e.match(r); return !!n && n[0].length > 0 } tr.partialMatches = eW; function _A(t) { typeof t == "string" && (t = new RegExp(t)); let e = t, r = t.source, n = 0; function i() { let o = "", a; function s(c) { o += r.substr(n, c), n += c } function u(c) { o += "(?:" + r.substr(n, c) + "|$)", n += c } for (; n < r.length;)switch (r[n]) { case "\\": switch (r[n + 1]) { case "c": u(3); break; case "x": u(4); break; case "u": e.unicode ? r[n + 2] === "{" ? u(r.indexOf("}", n) - n + 1) : u(6) : u(2); break; case "p": case "P": e.unicode ? u(r.indexOf("}", n) - n + 1) : u(2); break; case "k": u(r.indexOf(">", n) - n + 1); break; default: u(2); break }break; case "[": a = /\[(?:\\.|.)*?\]/g, a.lastIndex = n, a = a.exec(r) || [], u(a[0].length); break; case "|": case "^": case "$": case "*": case "+": case "?": s(1); break; case "{": a = /\{\d+,?\d*\}/g, a.lastIndex = n, a = a.exec(r), a ? s(a[0].length) : u(1); break; case "(": if (r[n + 1] === "?") switch (r[n + 2]) { case ":": o += "(?:", n += 3, o += i() + "|$)"; break; case "=": o += "(?=", n += 3, o += i() + ")"; break; case "!": a = n, n += 3, i(), o += r.substr(a, n - a); break; case "<": switch (r[n + 3]) { case "=": case "!": a = n, n += 4, i(), o += r.substr(a, n - a); break; default: s(r.indexOf(">", n) - n + 1), o += i() + "|$)"; break }break } else s(1), o += i() + "|$)"; break; case ")": return ++n, o; default: u(1); break }return o } return new RegExp(i(), t.flags) } tr.partialRegex = _A
  }); var jt = f(re => { "use strict"; var tW = re && re.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), rW = re && re.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), nW = re && re.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && tW(e, t, r); return rW(e, t), e }; Object.defineProperty(re, "__esModule", { value: !0 }); re.isPrimitiveType = re.extractAssignments = re.resolveTransitiveImports = re.resolveImport = re.resolveImportUri = re.terminalRegex = re.getRuleType = re.getActionType = re.getExplicitRuleType = re.getTypeNameWithoutError = re.getTypeName = re.getActionAtElement = re.isDataType = re.hasDataTypeReturn = re.isDataTypeRule = re.isArrayOperator = re.isArrayCardinality = re.isOptionalCardinality = void 0; var se = nW(Se()), TA = gn(), ad = be(), iW = Xa(), oW = Vo(); function aW(t) { return t === "?" || t === "*" } re.isOptionalCardinality = aW; function sW(t) { return t === "*" || t === "+" } re.isArrayCardinality = sW; function uW(t) { return t === "+=" } re.isArrayOperator = uW; function wg(t) { return RA(t, new Set) } re.isDataTypeRule = wg; function RA(t, e) { if (e.has(t)) return !0; e.add(t); for (let r of (0, ad.streamAllContents)(t)) if (se.isRuleCall(r)) { if (!r.rule.ref || se.isParserRule(r.rule.ref) && !RA(r.rule.ref, e)) return !1 } else { if (se.isAssignment(r)) return !1; if (se.isAction(r)) return !1 } return Boolean(t.definition) } function cW(t) { var e; let r = (e = t.returnType) === null || e === void 0 ? void 0 : e.ref; return t.dataType !== void 0 || se.isType(r) && bA(r) } re.hasDataTypeReturn = cW; function bA(t) { return Eg(t.type, new Set) } re.isDataType = bA; function Eg(t, e) { if (e.has(t)) return !0; if (e.add(t), se.isArrayType(t)) return !1; if (se.isReferenceType(t)) return !1; if (se.isUnionType(t)) return t.types.every(r => Eg(r, e)); if (se.isSimpleType(t)) { if (t.primitiveType !== void 0) return !0; if (t.stringType !== void 0) return !0; if (t.typeRef !== void 0) { let r = t.typeRef.ref; return se.isType(r) ? Eg(r.type, e) : !1 } else return !1 } else return !1 } function AA(t) { let e = t.$container; if (se.isGroup(e)) { let r = e.elements, n = r.indexOf(t); for (let i = n - 1; i >= 0; i--) { let o = r[i]; if (se.isAction(o)) return o; { let a = (0, ad.streamAllContents)(r[i]).find(se.isAction); if (a) return a } } } if (se.isAbstractElement(e)) return AA(e) } re.getActionAtElement = AA; function Og(t) { var e; if (se.isParserRule(t)) return wg(t) ? t.name : (e = Dg(t)) !== null && e !== void 0 ? e : t.name; if (se.isInterface(t) || se.isType(t) || se.isReturnType(t)) return t.name; if (se.isAction(t)) { let r = PA(t); if (r) return r } else if (se.isInferredType(t)) return t.name; throw new iW.TypeResolutionError("Cannot get name of Unknown Type", t.$cstNode) } re.getTypeName = Og; function lW(t) { if (t) try { return Og(t) } catch { return } } re.getTypeNameWithoutError = lW; function Dg(t) { if (t.inferredType) return t.inferredType.name; if (t.dataType) return t.dataType; if (t.returnType) { let e = t.returnType.ref; if (e) { if (se.isParserRule(e)) return e.name; if (se.isInterface(e) || se.isType(e)) return e.name } } } re.getExplicitRuleType = Dg; function PA(t) { var e; if (t.inferredType) return t.inferredType.name; if (!((e = t.type) === null || e === void 0) && e.ref) return Og(t.type.ref) } re.getActionType = PA; function dW(t) { var e, r, n; return se.isTerminalRule(t) ? (r = (e = t.type) === null || e === void 0 ? void 0 : e.name) !== null && r !== void 0 ? r : "string" : wg(t) ? t.name : (n = Dg(t)) !== null && n !== void 0 ? n : t.name } re.getRuleType = dW; function SA(t) { return Qu(t.definition) } re.terminalRegex = SA; var Ig = /[\s\S]/.source; function Qu(t) { if (se.isTerminalAlternatives(t)) return fW(t); if (se.isTerminalGroup(t)) return pW(t); if (se.isCharacterRange(t)) return gW(t); if (se.isTerminalRuleCall(t)) { let e = t.rule.ref; if (!e) throw new Error("Missing rule reference."); return Pi(SA(e), { cardinality: t.cardinality, lookahead: t.lookahead }) } else { if (se.isNegatedToken(t)) return mW(t); if (se.isUntilToken(t)) return hW(t); if (se.isRegexToken(t)) return Pi(t.regex, { cardinality: t.cardinality, lookahead: t.lookahead, wrap: !1 }); if (se.isWildcard(t)) return Pi(Ig, { cardinality: t.cardinality, lookahead: t.lookahead }); throw new Error(`Invalid terminal element: ${t?.$type}`) } } function fW(t) { return Pi(t.elements.map(Qu).join("|"), { cardinality: t.cardinality, lookahead: t.lookahead }) } function pW(t) { return Pi(t.elements.map(Qu).join(""), { cardinality: t.cardinality, lookahead: t.lookahead }) } function hW(t) { return Pi(`${Ig}*?${Qu(t.terminal)}`, { cardinality: t.cardinality, lookahead: t.lookahead }) } function mW(t) { return Pi(`(?!${Qu(t.terminal)})${Ig}*?`, { cardinality: t.cardinality, lookahead: t.lookahead }) } function gW(t) { return t.right ? Pi(`[${Cg(t.left)}-${Cg(t.right)}]`, { cardinality: t.cardinality, lookahead: t.lookahead, wrap: !1 }) : Pi(Cg(t.left), { cardinality: t.cardinality, lookahead: t.lookahead, wrap: !1 }) } function Cg(t) { return (0, oW.escapeRegExp)(t.value) } function Pi(t, e) { var r; return (e.wrap !== !1 || e.lookahead) && (t = `(${(r = e.lookahead) !== null && r !== void 0 ? r : ""}${t})`), e.cardinality ? `${t}${e.cardinality}` : t } function CA(t) { if (t.path === void 0 || t.path.length === 0) return; let e = TA.Utils.dirname((0, ad.getDocument)(t).uri), r = t.path; return r.endsWith(".langium") || (r += ".langium"), TA.Utils.resolvePath(e, r) } re.resolveImportUri = CA; function xg(t, e) { let r = CA(e); try { if (r) { let i = t.getOrCreateDocument(r).parseResult.value; if (se.isGrammar(i)) return i } } catch { } } re.resolveImport = xg; function yW(t, e) { if (se.isGrammarImport(e)) { let r = xg(t, e); if (r) { let n = Ng(t, r); return n.push(r), n } return [] } else return Ng(t, e) } re.resolveTransitiveImports = yW; function Ng(t, e, r = e, n = new Set, i = new Set) { let o = (0, ad.getDocument)(e); if (r !== e && i.add(e), !n.has(o.uri)) { n.add(o.uri); for (let a of e.imports) { let s = xg(t, a); s && Ng(t, s, r, n, i) } } return Array.from(i) } function kg(t) { return se.isAssignment(t) ? [t] : se.isAlternatives(t) || se.isGroup(t) || se.isUnorderedGroup(t) ? t.elements.flatMap(e => kg(e)) : se.isRuleCall(t) && t.rule.ref ? kg(t.rule.ref.definition) : [] } re.extractAssignments = kg; var vW = ["string", "number", "boolean", "Date", "bigint"]; function _W(t) { return vW.includes(t) } re.isPrimitiveType = _W }); var dd = f(ot => { "use strict"; Object.defineProperty(ot, "__esModule", { value: !0 }); ot.flattenPlainType = ot.mergePropertyTypes = ot.plainToTypes = ot.isPlainStringType = ot.isPlainPrimitiveType = ot.isPlainValueType = ot.isPlainPropertyUnion = ot.isPlainArrayType = ot.isPlainReferenceType = ot.isPlainUnion = ot.isPlainInterface = void 0; var EA = Xa(); function TW(t) { return !NA(t) } ot.isPlainInterface = TW; function NA(t) { return "type" in t } ot.isPlainUnion = NA; function sd(t) { return "referenceType" in t } ot.isPlainReferenceType = sd; function ud(t) { return "elementType" in t } ot.isPlainArrayType = ud; function Lg(t) { return "types" in t } ot.isPlainPropertyUnion = Lg; function cd(t) { return "value" in t } ot.isPlainValueType = cd; function kA(t) { return "primitive" in t } ot.isPlainPrimitiveType = kA; function wA(t) { return "string" in t } ot.isPlainStringType = wA; function RW(t) { let e = new Map, r = new Map; for (let n of t.interfaces) { let i = new EA.InterfaceType(n.name, n.declared, n.abstract); e.set(n.name, i) } for (let n of t.unions) { let i = new EA.UnionType(n.name, { declared: n.declared, dataType: n.dataType }); r.set(n.name, i) } for (let n of t.interfaces) { let i = e.get(n.name); for (let o of n.superTypes) { let a = e.get(o) || r.get(o); a && i.superTypes.add(a) } for (let o of n.subTypes) { let a = e.get(o) || r.get(o); a && i.subTypes.add(a) } for (let o of n.properties) { let a = bW(o, e, r); i.properties.push(a) } } for (let n of t.unions) { let i = r.get(n.name); i.type = Zu(n.type, i, e, r) } return { interfaces: Array.from(e.values()), unions: Array.from(r.values()) } } ot.plainToTypes = RW; function bW(t, e, r) { return { name: t.name, optional: t.optional, astNodes: t.astNodes, type: Zu(t.type, void 0, e, r) } } function Zu(t, e, r, n) { if (ud(t)) return { elementType: Zu(t.elementType, e, r, n) }; if (sd(t)) return { referenceType: Zu(t.referenceType, void 0, r, n) }; if (Lg(t)) return { types: t.types.map(i => Zu(i, e, r, n)) }; if (wA(t)) return { string: t.string }; if (kA(t)) return { primitive: t.primitive, regex: t.regex }; if (cd(t)) { let i = r.get(t.value) || n.get(t.value); return i ? (e && e.subTypes.add(i), { value: i }) : { primitive: "unknown" } } else throw new Error("Invalid property type") } function AW(t, e) { let r = ld(t), n = ld(e); for (let i of n) PW(r, i) || r.push(i); return r.length === 1 ? r[0] : { types: r } } ot.mergePropertyTypes = AW; function PW(t, e) { return t.some(r => qg(r, e)) } function qg(t, e) { return ud(t) && ud(e) ? qg(t.elementType, e.elementType) : sd(t) && sd(e) ? qg(t.referenceType, e.referenceType) : cd(t) && cd(e) ? t.value === e.value : !1 } function ld(t) { return Lg(t) ? t.types.flatMap(e => ld(e)) : [t] } ot.flattenPlainType = ld }); var MA = f(fd => { "use strict"; Object.defineProperty(fd, "__esModule", { value: !0 }); fd.collectInferredTypes = void 0; var SW = Za(), jg = yn(), pt = Se(), Bn = jt(), DA = dd(), Mg = class { constructor(e, r) { this.context = e, this.root = r } getTypes() { let e = { name: this.root.name, properties: this.root.properties, ruleCalls: this.root.ruleCalls, super: [] }; return this.root.children.length === 0 ? [{ alt: e, next: [] }] : this.applyNext(this.root, { alt: e, next: this.root.children }) } applyNext(e, r) { let n = this.splitType(r.alt, r.next.length), i = []; for (let o = 0; o < r.next.length; o++) { let a = n[o], s = r.next[o]; s.actionWithAssignment && i.push({ alt: OA(a), next: [] }), s.name !== void 0 && s.name !== a.name && (s.actionWithAssignment ? (a.properties = [], a.ruleCalls = [], a.super = [e.name], a.name = s.name) : (a.super = [a.name, ...a.ruleCalls], a.properties = [], a.ruleCalls = [], a.name = s.name)), a.properties.push(...s.properties), a.ruleCalls.push(...s.ruleCalls); let u = { alt: a, next: s.children }; u.next.length === 0 ? (u.alt.super = u.alt.super.filter(c => c !== u.alt.name), i.push(u)) : i.push(...this.applyNext(e, u)) } return LA(i) } splitType(e, r) { let n = []; for (let i = 0; i < r; i++)n.push(OA(e)); return n } getSuperTypes(e) { let r = new Set; return this.collectSuperTypes(e, e, r), Array.from(r) } collectSuperTypes(e, r, n) { if (r.ruleCalls.length > 0) { for (let i of r.ruleCalls) n.add(i); return } for (let i of r.parents) e.name === void 0 ? this.collectSuperTypes(i, i, n) : i.name !== void 0 && i.name !== e.name ? n.add(i.name) : this.collectSuperTypes(e, i, n); r.parents.length === 0 && r.name && n.add(r.name) } connect(e, r) { return r.parents.push(e), e.children.push(r), r } merge(...e) { if (e.length === 1) return e[0]; if (e.length === 0) throw new Error("No parts to merge"); let r = Yo(); r.parents = e; for (let n of e) n.children.push(r); return r } hasLeafNode(e) { return this.partHasLeafNode(e) } partHasLeafNode(e, r) { return e.children.some(n => n !== r) ? !0 : e.name ? !1 : e.parents.some(n => this.partHasLeafNode(n, e)) } }; function CW(t) { return { name: t.name, children: [], parents: [], actionWithAssignment: t.actionWithAssignment, ruleCalls: [...t.ruleCalls], properties: t.properties.map(IA) } } function OA(t) { return { name: t.name, super: t.super, ruleCalls: t.ruleCalls, properties: t.properties.map(e => IA(e)) } } function IA(t) { return { name: t.name, optional: t.optional, type: t.type, astNodes: t.astNodes } } function EW(t, e, r) { let n = [], i = { fragments: new Map }; for (let u of t) n.push(...xA(i, u)); let o = IW(n), a = xW(o), s = qW(o, a, r); for (let u of e) { let c = NW(u); s.unions.push({ name: u.name, declared: !1, type: c, subTypes: new Set, superTypes: new Set, dataType: u.dataType }) } return s } fd.collectInferredTypes = EW; function NW(t) { if (t.dataType && t.dataType !== "string") return { primitive: t.dataType }; let e = !1, r = () => (e = !0, { primitive: "unknown" }), n = $g(t.definition, r); return e ? { primitive: "string" } : n } function $g(t, e) { var r, n, i; if (t.cardinality) return e(); if ((0, pt.isAlternatives)(t)) return { types: t.elements.map(o => $g(o, e)) }; if ((0, pt.isGroup)(t) || (0, pt.isUnorderedGroup)(t)) return t.elements.length !== 1 ? e() : $g(t.elements[0], e); if ((0, pt.isRuleCall)(t)) { let o = (r = t.rule) === null || r === void 0 ? void 0 : r.ref; return o ? (0, pt.isTerminalRule)(o) ? { primitive: (i = (n = o.type) === null || n === void 0 ? void 0 : n.name) !== null && i !== void 0 ? i : "string", regex: (0, Bn.terminalRegex)(o) } : { value: o.name } : e() } else if ((0, pt.isKeyword)(t)) return { string: t.value }; return e() } function xA(t, e) { let r = Yo(e), n = new Mg(t, r); return e.definition && Fg(n, n.root, e.definition), n.getTypes() } function Yo(t) { return { name: (0, pt.isParserRule)(t) || (0, pt.isAction)(t) ? (0, Bn.getTypeNameWithoutError)(t) : t, properties: [], ruleCalls: [], children: [], parents: [], actionWithAssignment: !1 } } function Fg(t, e, r) { let n = (0, Bn.isOptionalCardinality)(r.cardinality); if ((0, pt.isAlternatives)(r)) { let i = []; n && i.push(t.connect(e, Yo())); for (let o of r.elements) { let a = t.connect(e, Yo()); i.push(Fg(t, a, o)) } return t.merge(...i) } else if ((0, pt.isGroup)(r) || (0, pt.isUnorderedGroup)(r)) { let i = t.connect(e, Yo()), o; n && (o = t.connect(e, Yo())); for (let a of r.elements) i = Fg(t, i, a); return o ? t.merge(o, i) : i } else { if ((0, pt.isAction)(r)) return kW(t, e, r); (0, pt.isAssignment)(r) ? wW(e, r) : (0, pt.isRuleCall)(r) && OW(t, e, r) } return e } function kW(t, e, r) { var n; if (!t.hasLeafNode(e)) { let o = CW(e); t.connect(e, o) } let i = t.connect(e, Yo(r)); if (r.type) { let o = (n = r.type) === null || n === void 0 ? void 0 : n.ref; o && (0, SW.isNamed)(o) && (i.name = o.name) } return r.feature && r.operator && (i.actionWithAssignment = !0, i.properties.push({ name: r.feature, optional: !1, type: Xo(r.operator === "+=", !1, t.root.ruleCalls.length !== 0 ? t.root.ruleCalls : t.getSuperTypes(i)), astNodes: new Set([r]) })), i } function wW(t, e) { let r = { types: new Set, reference: !1 }; qA(e.terminal, r); let n = Xo(e.operator === "+=", r.reference, e.operator === "?=" ? ["boolean"] : Array.from(r.types)); t.properties.push({ name: e.feature, optional: (0, Bn.isOptionalCardinality)(e.cardinality), type: n, astNodes: new Set([e]) }) } function qA(t, e) { if ((0, pt.isAlternatives)(t) || (0, pt.isUnorderedGroup)(t) || (0, pt.isGroup)(t)) for (let r of t.elements) qA(r, e); else if ((0, pt.isKeyword)(t)) e.types.add(`'${t.value}'`); else if ((0, pt.isRuleCall)(t) && t.rule.ref) e.types.add((0, Bn.getRuleType)(t.rule.ref)); else if ((0, pt.isCrossReference)(t) && t.type.ref) { let r = (0, Bn.getTypeNameWithoutError)(t.type.ref); r && e.types.add(r), e.reference = !0 } } function OW(t, e, r) { let n = r.rule.ref; if ((0, pt.isParserRule)(n) && n.fragment) { let i = DW(n, t.context); (0, Bn.isOptionalCardinality)(r.cardinality) ? e.properties.push(...i.map(o => Object.assign(Object.assign({}, o), { optional: !0 }))) : e.properties.push(...i) } else (0, pt.isParserRule)(n) && e.ruleCalls.push((0, Bn.getRuleType)(n)) } function DW(t, e) { let r = e.fragments.get(t); if (r) return r; let n = []; e.fragments.set(t, n); let i = (0, Bn.getTypeNameWithoutError)(t), o = xA(e, t).filter(a => a.alt.name === i); return n.push(...o.flatMap(a => a.alt.properties)), n } function IW(t) { let e = new Map, r = [], n = LA(t).map(i => i.alt); for (let i of n) { let o = { name: i.name, properties: i.properties, superTypes: new Set(i.super), subTypes: new Set, declared: !1, abstract: !1 }; e.set(o.name, o), i.ruleCalls.length > 0 && (r.push(i), i.ruleCalls.forEach(a => { a !== o.name && o.subTypes.add(a) })) } for (let i of r) for (let o of i.ruleCalls) { let a = e.get(o); a && a.name !== i.name && a.superTypes.add(i.name) } return Array.from(e.values()) } function LA(t) { let e = t.reduce((n, i) => n.add(i.alt.name, i), new jg.MultiMap), r = []; for (let [n, i] of e.entriesGroupedByKey()) { let o = [], a = new Set, s = { alt: { name: n, properties: o, ruleCalls: [], super: [] }, next: [] }; for (let u of i) { let c = u.alt; s.alt.super.push(...c.super), s.next.push(...u.next); let l = c.properties; for (let d of l) { let h = o.find(y => y.name === d.name); h ? (h.type = (0, DA.mergePropertyTypes)(h.type, d.type), d.astNodes.forEach(y => h.astNodes.add(y))) : o.push(Object.assign({}, d)) } c.ruleCalls.forEach(d => a.add(d)) } for (let u of i) { let c = u.alt; if (c.ruleCalls.length === 0) for (let l of o) c.properties.find(d => d.name === l.name) || (l.optional = !0) } s.alt.ruleCalls = Array.from(a), r.push(s) } return r } function xW(t) { let e = new Map(t.map(i => [i.name, i])), r = [], n = new jg.MultiMap; for (let i of t) for (let o of i.superTypes) n.add(o, i.name); for (let [i, o] of n.entriesGroupedByKey()) if (!e.has(i)) { let a = { declared: !1, name: i, subTypes: new Set, superTypes: new Set, type: Xo(!1, !1, o) }; r.push(a) } return r } function qW(t, e, r) { let n = new jg.MultiMap; for (let s of t) for (let u of s.superTypes) n.add(u, s.name); let i = new Set(r.interfaces.map(s => s.name)), o = { interfaces: [], unions: e }, a = new Map(e.map(s => [s.name, s])); for (let s of t) { let u = new Set(n.get(s.name)); if (s.properties.length === 0 && u.size > 0) if (i.has(s.name)) s.abstract = !0, o.interfaces.push(s); else { let c = Xo(!1, !1, Array.from(u)), l = a.get(s.name); if (l) l.type = (0, DA.mergePropertyTypes)(l.type, c); else { let d = { name: s.name, declared: !1, subTypes: u, superTypes: s.superTypes, type: c }; o.unions.push(d), a.set(s.name, d) } } else o.interfaces.push(s) } for (let s of o.interfaces) s.superTypes = new Set([...s.superTypes].filter(u => !a.has(u))); return o } function Xo(t, e, r) { if (t) return { elementType: Xo(!1, e, r) }; if (e) return { referenceType: Xo(!1, !1, r) }; if (r.length === 1) { let n = r[0]; return n.startsWith("'") ? { string: n.substring(1, n.length - 1) } : (0, Bn.isPrimitiveType)(n) ? { primitive: n } : { value: n } } else return { types: r.map(n => Xo(!1, !1, [n])) } } }); var Gg = f(ts => { "use strict"; Object.defineProperty(ts, "__esModule", { value: !0 }); ts.typeDefinitionToPropertyType = ts.collectDeclaredTypes = void 0; var pd = Se(), Ug = jt(); function LW(t, e) { let r = { unions: [], interfaces: [] }; for (let n of t) { let i = []; for (let s of n.attributes) i.push({ name: s.name, optional: s.isOptional, astNodes: new Set([s]), type: es(s.type) }); let o = new Set; for (let s of n.superTypes) s.ref && o.add((0, Ug.getTypeName)(s.ref)); let a = { name: n.name, declared: !0, abstract: !1, properties: i, superTypes: o, subTypes: new Set }; r.interfaces.push(a) } for (let n of e) { let i = { name: n.name, declared: !0, type: es(n.type), superTypes: new Set, subTypes: new Set }; r.unions.push(i) } return r } ts.collectDeclaredTypes = LW; function es(t) { if ((0, pd.isArrayType)(t)) return { elementType: es(t.elementType) }; if ((0, pd.isReferenceType)(t)) return { referenceType: es(t.referenceType) }; if ((0, pd.isUnionType)(t)) return { types: t.types.map(es) }; if ((0, pd.isSimpleType)(t)) { let e; if (t.primitiveType) return e = t.primitiveType, { primitive: e }; if (t.stringType) return e = t.stringType, { string: e }; if (t.typeRef) { let r = t.typeRef.ref, n = (0, Ug.getTypeNameWithoutError)(r); if (n) return (0, Ug.isPrimitiveType)(n) ? { primitive: n } : { value: n } } } return { primitive: "unknown" } } ts.typeDefinitionToPropertyType = es }); var FA = f(rs => { "use strict"; Object.defineProperty(rs, "__esModule", { value: !0 }); rs.collectAllAstResources = rs.collectTypeResources = void 0; var MW = MA(), $W = Gg(), FW = be(), jW = Se(), $A = jt(); function UW(t, e) { let r = Hg(t, e), n = (0, $W.collectDeclaredTypes)(r.interfaces, r.types), i = (0, MW.collectInferredTypes)(r.parserRules, r.datatypeRules, n); return { astResources: r, inferred: i, declared: n } } rs.collectTypeResources = UW; function Hg(t, e, r = new Set, n = { parserRules: [], datatypeRules: [], interfaces: [], types: [] }) { Array.isArray(t) || (t = [t]); for (let i of t) { let o = (0, FW.getDocument)(i); if (!r.has(o.uri)) { r.add(o.uri); for (let a of i.rules) (0, jW.isParserRule)(a) && !a.fragment && ((0, $A.isDataTypeRule)(a) ? n.datatypeRules.push(a) : n.parserRules.push(a)); if (i.interfaces.forEach(a => n.interfaces.push(a)), i.types.forEach(a => n.types.push(a)), e) { let a = i.imports.map(s => (0, $A.resolveImport)(e, s)).filter(s => s !== void 0); Hg(a, e, r, n) } } } return n } rs.collectAllAstResources = Hg }); var Kg = f(Kn => { "use strict"; Object.defineProperty(Kn, "__esModule", { value: !0 }); Kn.specifyAstNodeProperties = Kn.createAstTypes = Kn.collectValidationAst = Kn.collectAst = void 0; var UA = Ja(), Si = Xa(), GA = FA(), GW = dd(); function HW(t, e) { let { inferred: r, declared: n } = (0, GA.collectTypeResources)(t, e); return hd(r, n) } Kn.collectAst = HW; function WW(t, e) { let { inferred: r, declared: n, astResources: i } = (0, GA.collectTypeResources)(t, e); return { astResources: i, inferred: hd(n, r), declared: hd(r, n) } } Kn.collectValidationAst = WW; function hd(t, e) { var r, n; let i = { interfaces: (0, UA.sortInterfacesTopologically)(jA(...t.interfaces, ...(r = e?.interfaces) !== null && r !== void 0 ? r : [])), unions: jA(...t.unions, ...(n = e?.unions) !== null && n !== void 0 ? n : []) }, o = (0, GW.plainToTypes)(i); return HA(o), o } Kn.createAstTypes = hd; function jA(...t) { return Array.from(t.reduce((e, r) => (e.set(r.name, r), e), new Map).values()).sort((e, r) => e.name.localeCompare(r.name)) } function HA(t) { let e = KW(t), r = Array.from(e.values()); zW(r), VW(r), BW(r) } Kn.specifyAstNodeProperties = HA; function BW(t) { let e = new Set, r = n => { if (!e.has(n)) { e.add(n), n.typeNames.add(n.name); for (let i of n.subTypes) r(i), i.typeNames.forEach(o => n.typeNames.add(o)) } }; t.forEach(r) } function KW({ interfaces: t, unions: e }) { let r = t.concat(e).reduce((i, o) => (i.set(o.name, o), i), new Map), n = new Map; for (let i of e) n.set(i, Wg(i.type, new Set)); for (let [i, o] of n) o && r.delete(i.name); return r } function Wg(t, e) { if (e.has(t)) return !0; if (e.add(t), (0, Si.isPropertyUnion)(t)) return t.types.every(r => Wg(r, e)); if ((0, Si.isValueType)(t)) { let r = t.value; return (0, Si.isUnionType)(r) ? Wg(r.type, e) : !1 } else return (0, Si.isPrimitiveType)(t) || (0, Si.isStringType)(t) } function zW(t) { for (let e of t) for (let r of e.superTypes) r.subTypes.add(e) } function VW(t) { let e = t.filter(Si.isInterfaceType); for (let n of e) { let i = n.properties.flatMap(o => Bg(o.type, new Set)); for (let o of i) o.containerTypes.add(n) } let r = YW(t); XW(r) } function Bg(t, e) { return (0, Si.isPropertyUnion)(t) ? t.types.flatMap(r => Bg(r, e)) : (0, Si.isValueType)(t) ? e.has(t.value) ? [] : (e.add(t.value), [t.value]) : (0, Si.isArrayType)(t) ? Bg(t.elementType, e) : [] } function YW(t) { function e(a) { let s = [a]; o.add(a); let u = [...i.subTypes.get(a.name), ...i.superTypes.get(a.name)]; for (let c of u) { let l = r.get(c); l && !o.has(l) && s.push(...e(l)) } return s } let r = new Map(t.map(a => [a.name, a])), n = [], i = (0, UA.collectTypeHierarchy)(t), o = new Set; for (let a of t) o.has(a) || n.push(e(a)); return n } function XW(t) { for (let e of t) { let r = new Set; e.forEach(n => n.containerTypes.forEach(i => r.add(i))), e.forEach(n => n.containerTypes = r) } } }); var Vg = f(md => { "use strict"; Object.defineProperty(md, "__esModule", { value: !0 }); md.interpretAstReflection = void 0; var JW = er(), QW = yn(), ZW = Se(), eB = Kg(), Jo = Ja(); function tB(t, e) { let r; (0, ZW.isGrammar)(t) ? r = (0, eB.collectAst)(t, e) : r = t; let n = r.interfaces.map(s => s.name).concat(r.unions.filter(s => (0, Jo.isAstType)(s.type)).map(s => s.name)), i = rB(r), o = nB(r), a = (0, Jo.collectTypeHierarchy)((0, Jo.mergeTypesAndInterfaces)(r)).superTypes; return new zg({ allTypes: n, references: i, metaData: o, superTypes: a }) } md.interpretAstReflection = tB; var zg = class extends JW.AbstractAstReflection { constructor(e) { super(), this.allTypes = e.allTypes, this.references = e.references, this.metaData = e.metaData, this.superTypes = e.superTypes } getAllTypes() { return this.allTypes } getReferenceType(e) { let r = `${e.container.$type}:${e.property}`, n = this.references.get(r); if (n) return n; throw new Error("Could not find reference type for " + r) } getTypeMetaData(e) { var r; return (r = this.metaData.get(e)) !== null && r !== void 0 ? r : { name: e, mandatory: [] } } computeIsSubtype(e, r) { let n = this.superTypes.get(e); for (let i of n) if (this.isSubtype(i, r)) return !0; return !1 } }; function rB(t) { let e = new QW.MultiMap; for (let n of t.interfaces) { for (let i of n.properties) for (let o of (0, Jo.findReferenceTypes)(i.type)) e.add(n.name, [i.name, o]); for (let i of n.interfaceSuperTypes) { let o = e.get(i.name); e.addAll(n.name, o) } } let r = new Map; for (let [n, [i, o]] of e) r.set(`${n}:${i}`, o); return r } function nB(t) { let e = new Map; for (let r of t.interfaces) { let n = r.superProperties, i = n.filter(a => (0, Jo.hasArrayType)(a.type)), o = n.filter(a => !(0, Jo.hasArrayType)(a.type) && (0, Jo.hasBooleanType)(a.type)); (i.length > 0 || o.length > 0) && e.set(r.name, { name: r.name, mandatory: iB(i, o) }) } return e } function iB(t, e) { let r = [], n = t.concat(e).sort((i, o) => i.name.localeCompare(o.name)); for (let i of n) { let o = t.includes(i) ? "array" : "boolean"; r.push({ name: i.name, type: o }) } return r } }); var WA = f(yd => {
    "use strict"; Object.defineProperty(yd, "__esModule", { value: !0 }); yd.LangiumGrammarGrammar = void 0; var oB = vt(), gd, aB = () => gd ?? (gd = (0, oB.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "LangiumGrammar",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Grammar",
      "entry": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "isDeclared",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "grammar"
                }
              },
              {
                "$type": "Assignment",
                "feature": "name",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@59"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "with"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "usedGrammars",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "usedGrammars",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "definesHiddenTokens",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "hidden"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": "("
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Group",
                        "elements": [
                          {
                            "$type": "Keyword",
                            "value": ","
                          },
                          {
                            "$type": "Assignment",
                            "feature": "hiddenTokens",
                            "operator": "+=",
                            "terminal": {
                              "$type": "CrossReference",
                              "type": {
                                "$ref": "#/rules@11"
                              },
                              "terminal": {
                                "$type": "RuleCall",
                                "rule": {
                                  "$ref": "#/rules@59"
                                },
                                "arguments": []
                              },
                              "deprecatedSyntax": false
                            }
                          }
                        ],
                        "cardinality": "*"
                      }
                    ],
                    "cardinality": "?"
                  },
                  {
                    "$type": "Keyword",
                    "value": ")"
                  }
                ],
                "cardinality": "?"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "imports",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@12"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "rules",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@11"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "interfaces",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@1"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "types",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@10"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "+"
          }
        ]
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Interface",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "extends"
              },
              {
                "$type": "Assignment",
                "feature": "superTypes",
                "operator": "+=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "superTypes",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  }
                ],
                "cardinality": "*"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@2"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SchemaType",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Assignment",
            "feature": "attributes",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@3"
              },
              "arguments": []
            },
            "cardinality": "*"
          },
          {
            "$type": "Keyword",
            "value": "}"
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeAttribute",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "isOptional",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "?"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TypeDefinition",
      "definition": {
        "$type": "RuleCall",
        "rule": {
          "$ref": "#/rules@5"
        },
        "arguments": []
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnionType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@6"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnionType"
                },
                "feature": "types",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "types",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@6"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ArrayType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@7"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ArrayType"
                },
                "feature": "elementType",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "["
              },
              {
                "$type": "Keyword",
                "value": "]"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReferenceType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@8"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "ReferenceType"
                }
              },
              {
                "$type": "Keyword",
                "value": "@"
              },
              {
                "$type": "Assignment",
                "feature": "referenceType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@8"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "SimpleType",
      "inferredType": {
        "$type": "InferredType",
        "name": "TypeDefinition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@4"
                },
                "arguments": []
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "SimpleType"
                }
              },
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "typeRef",
                    "operator": "=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/types@0"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "primitiveType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@9"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "stringType",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@60"
                      },
                      "arguments": []
                    }
                  }
                ]
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PrimitiveType",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "string"
          },
          {
            "$type": "Keyword",
            "value": "number"
          },
          {
            "$type": "Keyword",
            "value": "boolean"
          },
          {
            "$type": "Keyword",
            "value": "Date"
          },
          {
            "$type": "Keyword",
            "value": "bigint"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Type",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": "="
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractRule",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@13"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@46"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "GrammarImport",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Assignment",
            "feature": "path",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";",
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParserRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "entry",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "entry"
                }
              },
              {
                "$type": "Assignment",
                "feature": "fragment",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "fragment"
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@15"
            },
            "arguments": []
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "wildcard",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "*"
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "returns"
                  },
                  {
                    "$type": "Alternatives",
                    "elements": [
                      {
                        "$type": "Assignment",
                        "feature": "returnType",
                        "operator": "=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/types@0"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      },
                      {
                        "$type": "Assignment",
                        "feature": "dataType",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@9"
                          },
                          "arguments": []
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": false
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "definesHiddenTokens",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "hidden"
                }
              },
              {
                "$type": "Keyword",
                "value": "("
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "hiddenTokens",
                    "operator": "+=",
                    "terminal": {
                      "$type": "CrossReference",
                      "type": {
                        "$ref": "#/rules@11"
                      },
                      "terminal": {
                        "$type": "RuleCall",
                        "rule": {
                          "$ref": "#/rules@59"
                        },
                        "arguments": []
                      },
                      "deprecatedSyntax": false
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "hiddenTokens",
                        "operator": "+=",
                        "terminal": {
                          "$type": "CrossReference",
                          "type": {
                            "$ref": "#/rules@11"
                          },
                          "terminal": {
                            "$type": "RuleCall",
                            "rule": {
                              "$ref": "#/rules@59"
                            },
                            "arguments": []
                          },
                          "deprecatedSyntax": false
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ")"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "InferredType",
      "parameters": [
        {
          "$type": "Parameter",
          "name": "imperative"
        }
      ],
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "ParameterReference",
                  "parameter": {
                    "$ref": "#/rules@14/parameters@0"
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infer"
                  }
                ]
              },
              {
                "$type": "Group",
                "guardCondition": {
                  "$type": "Negation",
                  "value": {
                    "$type": "ParameterReference",
                    "parameter": {
                      "$ref": "#/rules@14/parameters@0"
                    }
                  }
                },
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "infers"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleNameAndParams",
      "fragment": true,
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "parameters",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@16"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": ","
                      },
                      {
                        "$type": "Assignment",
                        "feature": "parameters",
                        "operator": "+=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@16"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "*"
                  }
                ],
                "cardinality": "?"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Parameter",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@59"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Alternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@18"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@18"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ConditionalBranch",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@19"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                }
              },
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "guardCondition",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@29"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Keyword",
                "value": ">"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UnorderedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@20"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "UnorderedGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "&"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@20"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Group",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@21"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Group"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@21"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@22"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@23"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTokenWithCardinality",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@37"
                },
                "arguments": []
              },
              {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@24"
                },
                "arguments": []
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Action",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Action"
            }
          },
          {
            "$type": "Keyword",
            "value": "{"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "type",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/types@0"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "inferredType",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@14"
                  },
                  "arguments": [
                    {
                      "$type": "NamedArgument",
                      "value": {
                        "$type": "LiteralCondition",
                        "true": true
                      },
                      "calledByName": false
                    }
                  ]
                }
              }
            ]
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "."
              },
              {
                "$type": "Assignment",
                "feature": "feature",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@58"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Assignment",
                "feature": "operator",
                "operator": "=",
                "terminal": {
                  "$type": "Alternatives",
                  "elements": [
                    {
                      "$type": "Keyword",
                      "value": "="
                    },
                    {
                      "$type": "Keyword",
                      "value": "+="
                    }
                  ]
                }
              },
              {
                "$type": "Keyword",
                "value": "current"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "}"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AbstractTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@43"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@35"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@36"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@44"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Keyword",
      "definition": {
        "$type": "Assignment",
        "feature": "value",
        "operator": "=",
        "terminal": {
          "$type": "RuleCall",
          "rule": {
            "$ref": "#/rules@60"
          },
          "arguments": []
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RuleCall",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NamedArgument",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Assignment",
                "feature": "parameter",
                "operator": "=",
                "terminal": {
                  "$type": "CrossReference",
                  "type": {
                    "$ref": "#/rules@16"
                  },
                  "terminal": {
                    "$type": "RuleCall",
                    "rule": {
                      "$ref": "#/rules@59"
                    },
                    "arguments": []
                  },
                  "deprecatedSyntax": false
                }
              },
              {
                "$type": "Assignment",
                "feature": "calledByName",
                "operator": "?=",
                "terminal": {
                  "$type": "Keyword",
                  "value": "="
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@29"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "LiteralCondition",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "true",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "true"
            }
          },
          {
            "$type": "Keyword",
            "value": "false"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Disjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@30"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Disjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@30"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Conjunction",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@31"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Conjunction"
                },
                "feature": "left",
                "operator": "="
              },
              {
                "$type": "Keyword",
                "value": "&"
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Negation",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@32"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Negation"
                }
              },
              {
                "$type": "Keyword",
                "value": "!"
              },
              {
                "$type": "Assignment",
                "feature": "value",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@31"
                  },
                  "arguments": []
                }
              }
            ]
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Atom",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@34"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@33"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@28"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedCondition",
      "inferredType": {
        "$type": "InferredType",
        "name": "Condition"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@29"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParameterReference",
      "definition": {
        "$type": "Assignment",
        "feature": "parameter",
        "operator": "=",
        "terminal": {
          "$type": "CrossReference",
          "type": {
            "$ref": "#/rules@16"
          },
          "terminal": {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          },
          "deprecatedSyntax": false
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedKeyword",
      "inferredType": {
        "$type": "InferredType",
        "name": "Keyword"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "value",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@60"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "RuleCall"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@11"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": "<"
              },
              {
                "$type": "Assignment",
                "feature": "arguments",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@27"
                  },
                  "arguments": []
                }
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": ","
                  },
                  {
                    "$type": "Assignment",
                    "feature": "arguments",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@27"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "*"
              },
              {
                "$type": "Keyword",
                "value": ">"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Assignment",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Assignment"
            }
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Assignment",
            "feature": "feature",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@58"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "operator",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "+="
                },
                {
                  "$type": "Keyword",
                  "value": "="
                },
                {
                  "$type": "Keyword",
                  "value": "?="
                }
              ]
            }
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@38"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@39"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@41"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedAssignableElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@40"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "AssignableAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@38"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "Alternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Keyword",
                    "value": "|"
                  },
                  {
                    "$type": "Assignment",
                    "feature": "elements",
                    "operator": "+=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@38"
                      },
                      "arguments": []
                    }
                  }
                ],
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReference",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CrossReference"
            }
          },
          {
            "$type": "Keyword",
            "value": "["
          },
          {
            "$type": "Assignment",
            "feature": "type",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/types@0"
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Alternatives",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "deprecatedSyntax",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "|"
                    }
                  },
                  {
                    "$type": "Keyword",
                    "value": ":"
                  }
                ]
              },
              {
                "$type": "Assignment",
                "feature": "terminal",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@42"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "]"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CrossReferenceableTerminal",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@25"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@26"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@17"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "PredicatedGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "Group"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Keyword",
                "value": "=>"
              },
              {
                "$type": "Keyword",
                "value": "->"
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "elements",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@17"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ReturnType",
      "definition": {
        "$type": "Assignment",
        "feature": "name",
        "operator": "=",
        "terminal": {
          "$type": "Alternatives",
          "elements": [
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@9"
              },
              "arguments": []
            },
            {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@59"
              },
              "arguments": []
            }
          ]
        }
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRule",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "hidden",
            "operator": "?=",
            "terminal": {
              "$type": "Keyword",
              "value": "hidden"
            },
            "cardinality": "?"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Alternatives",
            "elements": [
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "fragment",
                    "operator": "?=",
                    "terminal": {
                      "$type": "Keyword",
                      "value": "fragment"
                    }
                  },
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  }
                ]
              },
              {
                "$type": "Group",
                "elements": [
                  {
                    "$type": "Assignment",
                    "feature": "name",
                    "operator": "=",
                    "terminal": {
                      "$type": "RuleCall",
                      "rule": {
                        "$ref": "#/rules@59"
                      },
                      "arguments": []
                    }
                  },
                  {
                    "$type": "Group",
                    "elements": [
                      {
                        "$type": "Keyword",
                        "value": "returns"
                      },
                      {
                        "$type": "Assignment",
                        "feature": "type",
                        "operator": "=",
                        "terminal": {
                          "$type": "RuleCall",
                          "rule": {
                            "$ref": "#/rules@45"
                          },
                          "arguments": []
                        }
                      }
                    ],
                    "cardinality": "?"
                  }
                ]
              }
            ]
          },
          {
            "$type": "Keyword",
            "value": ":"
          },
          {
            "$type": "Assignment",
            "feature": "definition",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@47"
              },
              "arguments": []
            }
          },
          {
            "$type": "Keyword",
            "value": ";"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalAlternatives",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@48"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalAlternatives"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Keyword",
                "value": "|"
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@48"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "*"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalGroup",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@49"
            },
            "arguments": []
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Action",
                "inferredType": {
                  "$type": "InferredType",
                  "name": "TerminalGroup"
                },
                "feature": "elements",
                "operator": "+="
              },
              {
                "$type": "Assignment",
                "feature": "elements",
                "operator": "+=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@49"
                  },
                  "arguments": []
                },
                "cardinality": "+"
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@50"
            },
            "arguments": []
          },
          {
            "$type": "Assignment",
            "feature": "cardinality",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?"
                },
                {
                  "$type": "Keyword",
                  "value": "*"
                },
                {
                  "$type": "Keyword",
                  "value": "+"
                }
              ]
            },
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalTokenElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@57"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@52"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@51"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@53"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@54"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@55"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@56"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "ParenthesizedTerminalElement",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "("
          },
          {
            "$type": "Assignment",
            "feature": "lookahead",
            "operator": "=",
            "terminal": {
              "$type": "Alternatives",
              "elements": [
                {
                  "$type": "Keyword",
                  "value": "?="
                },
                {
                  "$type": "Keyword",
                  "value": "?!"
                }
              ]
            },
            "cardinality": "?"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@47"
            },
            "arguments": []
          },
          {
            "$type": "Keyword",
            "value": ")"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "TerminalRuleCall",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "TerminalRuleCall"
            }
          },
          {
            "$type": "Assignment",
            "feature": "rule",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@46"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@59"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "NegatedToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "NegatedToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "!"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "UntilToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "UntilToken"
            }
          },
          {
            "$type": "Keyword",
            "value": "->"
          },
          {
            "$type": "Assignment",
            "feature": "terminal",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@50"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "RegexToken",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "RegexToken"
            }
          },
          {
            "$type": "Assignment",
            "feature": "regex",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@61"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Wildcard",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "Wildcard"
            }
          },
          {
            "$type": "Keyword",
            "value": "."
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "CharacterRange",
      "inferredType": {
        "$type": "InferredType",
        "name": "AbstractElement"
      },
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Action",
            "inferredType": {
              "$type": "InferredType",
              "name": "CharacterRange"
            }
          },
          {
            "$type": "Assignment",
            "feature": "left",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@25"
              },
              "arguments": []
            }
          },
          {
            "$type": "Group",
            "elements": [
              {
                "$type": "Keyword",
                "value": ".."
              },
              {
                "$type": "Assignment",
                "feature": "right",
                "operator": "=",
                "terminal": {
                  "$type": "RuleCall",
                  "rule": {
                    "$ref": "#/rules@25"
                  },
                  "arguments": []
                }
              }
            ],
            "cardinality": "?"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "FeatureName",
      "dataType": "string",
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Keyword",
            "value": "current"
          },
          {
            "$type": "Keyword",
            "value": "entry"
          },
          {
            "$type": "Keyword",
            "value": "extends"
          },
          {
            "$type": "Keyword",
            "value": "false"
          },
          {
            "$type": "Keyword",
            "value": "fragment"
          },
          {
            "$type": "Keyword",
            "value": "grammar"
          },
          {
            "$type": "Keyword",
            "value": "hidden"
          },
          {
            "$type": "Keyword",
            "value": "import"
          },
          {
            "$type": "Keyword",
            "value": "interface"
          },
          {
            "$type": "Keyword",
            "value": "returns"
          },
          {
            "$type": "Keyword",
            "value": "terminal"
          },
          {
            "$type": "Keyword",
            "value": "true"
          },
          {
            "$type": "Keyword",
            "value": "type"
          },
          {
            "$type": "Keyword",
            "value": "infer"
          },
          {
            "$type": "Keyword",
            "value": "infers"
          },
          {
            "$type": "Keyword",
            "value": "with"
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@9"
            },
            "arguments": []
          },
          {
            "$type": "RuleCall",
            "rule": {
              "$ref": "#/rules@59"
            },
            "arguments": []
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\^?[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "RegexLiteral",
      "type": {
        "$type": "ReturnType",
        "name": "string"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/(?![*+?])(?:[^\\\\r\\\\n\\\\[/\\\\\\\\]|\\\\\\\\.|\\\\[(?:[^\\\\r\\\\n\\\\]\\\\\\\\]|\\\\\\\\.)*\\\\])+\\\\/"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "types": [
    {
      "$type": "Type",
      "name": "AbstractType",
      "type": {
        "$type": "UnionType",
        "types": [
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@1"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@10"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@23/definition/elements@0"
            }
          },
          {
            "$type": "SimpleType",
            "typeRef": {
              "$ref": "#/rules@13"
            }
          }
        ]
      }
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "usedGrammars": []
}`)); yd.LangiumGrammarGrammar = aB
  }); var BA = f(Gr => { "use strict"; Object.defineProperty(Gr, "__esModule", { value: !0 }); Gr.LangiumGrammarGeneratedModule = Gr.LangiumGrammarGeneratedSharedModule = Gr.LangiumGrammarParserConfig = Gr.LangiumGrammarLanguageMetaData = void 0; var sB = Se(), uB = WA(); Gr.LangiumGrammarLanguageMetaData = { languageId: "langium", fileExtensions: [".langium"], caseInsensitive: !1 }; Gr.LangiumGrammarParserConfig = { maxLookahead: 3 }; Gr.LangiumGrammarGeneratedSharedModule = { AstReflection: () => new sB.LangiumGrammarAstReflection }; Gr.LangiumGrammarGeneratedModule = { Grammar: () => (0, uB.LangiumGrammarGrammar)(), LanguageMetaData: () => Gr.LangiumGrammarLanguageMetaData, parser: { ParserConfig: () => Gr.LangiumGrammarParserConfig } } }); var _r = f(Ct => { "use strict"; Object.defineProperty(Ct, "__esModule", { value: !0 }); Ct.Deferred = Ct.MutexLock = Ct.interruptAndCheck = Ct.isOperationCancelled = Ct.OperationCancelled = Ct.setInterruptionPeriod = Ct.startCancelableOperation = Ct.delayNextTick = void 0; var vd = Ti(); function KA() { return new Promise(t => { typeof setImmediate > "u" ? setTimeout(t, 0) : setImmediate(t) }) } Ct.delayNextTick = KA; var Yg = 0, zA = 10; function cB() { return Yg = Date.now(), new vd.CancellationTokenSource } Ct.startCancelableOperation = cB; function lB(t) { zA = t } Ct.setInterruptionPeriod = lB; Ct.OperationCancelled = Symbol("OperationCancelled"); function VA(t) { return t === Ct.OperationCancelled } Ct.isOperationCancelled = VA; async function dB(t) { if (t === vd.CancellationToken.None) return; let e = Date.now(); if (e - Yg >= zA && (Yg = e, await KA()), t.isCancellationRequested) throw Ct.OperationCancelled } Ct.interruptAndCheck = dB; var Xg = class { constructor() { this.previousAction = Promise.resolve(), this.previousTokenSource = new vd.CancellationTokenSource } lock(e) { this.cancel(); let r = new vd.CancellationTokenSource; return this.previousTokenSource = r, this.previousAction = this.previousAction.then(() => e(r.token).catch(n => { VA(n) || console.error("Error: ", n) })) } cancel() { this.previousTokenSource.cancel() } }; Ct.MutexLock = Xg; var Jg = class { constructor() { this.promise = new Promise((e, r) => { this.resolve = n => (e(n), this), this.reject = n => (r(n), this) }) } }; Ct.Deferred = Jg }); var Td = f(_d => { "use strict"; Object.defineProperty(_d, "__esModule", { value: !0 }); _d.DefaultScopeComputation = void 0; var Qg = Ti(), YA = be(), fB = yn(), XA = _r(), Zg = class { constructor(e) { this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider } async computeExports(e, r = Qg.CancellationToken.None) { return this.computeExportsForNode(e.parseResult.value, e, void 0, r) } async computeExportsForNode(e, r, n = YA.streamContents, i = Qg.CancellationToken.None) { let o = []; this.exportNode(e, o, r); for (let a of n(e)) await (0, XA.interruptAndCheck)(i), this.exportNode(a, o, r); return o } exportNode(e, r, n) { let i = this.nameProvider.getName(e); i && r.push(this.descriptions.createDescription(e, i, n)) } async computeLocalScopes(e, r = Qg.CancellationToken.None) { let n = e.parseResult.value, i = new fB.MultiMap; for (let o of (0, YA.streamAllContents)(n)) await (0, XA.interruptAndCheck)(r), this.processNode(o, e, i); return i } processNode(e, r, n) { let i = e.$container; if (i) { let o = this.nameProvider.getName(e); o && n.add(i, this.descriptions.createDescription(e, o, r)) } } }; _d.DefaultScopeComputation = Zg }); var bd = f(io => { "use strict"; Object.defineProperty(io, "__esModule", { value: !0 }); io.DefaultScopeProvider = io.EMPTY_SCOPE = io.StreamScope = void 0; var pB = be(), Rd = Ft(), ns = class { constructor(e, r, n) { this.elements = e, this.outerScope = r, this.caseInsensitive = n?.caseInsensitive } getAllElements() { return this.outerScope ? this.elements.concat(this.outerScope.getAllElements()) : this.elements } getElement(e) { let r = this.caseInsensitive ? this.elements.find(n => n.name.toLowerCase() === e.toLowerCase()) : this.elements.find(n => n.name === e); if (r) return r; if (this.outerScope) return this.outerScope.getElement(e) } }; io.StreamScope = ns; io.EMPTY_SCOPE = { getElement() { }, getAllElements() { return Rd.EMPTY_STREAM } }; var ey = class { constructor(e) { this.reflection = e.shared.AstReflection, this.nameProvider = e.references.NameProvider, this.descriptions = e.workspace.AstNodeDescriptionProvider, this.indexManager = e.shared.workspace.IndexManager } getScope(e) { let r = [], n = this.reflection.getReferenceType(e), i = (0, pB.getDocument)(e.container).precomputedScopes; if (i) { let a = e.container; do { let s = i.get(a); s.length > 0 && r.push((0, Rd.stream)(s).filter(u => this.reflection.isSubtype(u.type, n))), a = a.$container } while (a) } let o = this.getGlobalScope(n, e); for (let a = r.length - 1; a >= 0; a--)o = this.createScope(r[a], o); return o } createScope(e, r, n) { return new ns((0, Rd.stream)(e), r, n) } createScopeForNodes(e, r, n) { let i = (0, Rd.stream)(e).map(o => { let a = this.nameProvider.getName(o); if (a) return this.descriptions.createDescription(o, a) }).nonNullable(); return new ns(i, r, n) } getGlobalScope(e, r) { return new ns(this.indexManager.allElements(e)) } }; io.DefaultScopeProvider = ey }); var Ci = f(is => { "use strict"; Object.defineProperty(is, "__esModule", { value: !0 }); is.relativeURI = is.equalURI = void 0; function hB(t, e) { return t?.toString() === e?.toString() } is.equalURI = hB; function mB(t, e) { let r = t.path, n = e.path, i = r.split("/").filter(c => c.length > 0), o = n.split("/").filter(c => c.length > 0), a = 0; for (; a < i.length && i[a] === o[a]; a++); let s = "../".repeat(i.length - a), u = o.slice(a).join("/"); return s + u } is.relativeURI = mB }); var ZA = f(as => { "use strict"; Object.defineProperty(as, "__esModule", { value: !0 }); as.LangiumGrammarScopeComputation = as.LangiumGrammarScopeProvider = void 0; var gB = Td(), ty = bd(), os = be(), JA = Le(), QA = Ft(), yB = Ci(), Hr = Se(), ry = jt(), ny = class extends ty.DefaultScopeProvider { constructor(e) { super(e) } getScope(e) { let r = this.reflection.getReferenceType(e); return r === Hr.AbstractType ? this.getTypeScope(r, e) : super.getScope(e) } getTypeScope(e, r) { let n, i = (0, os.getDocument)(r.container).precomputedScopes, o = (0, os.findRootNode)(r.container); if (i && o) { let s = i.get(o); s.length > 0 && (n = (0, QA.stream)(s).filter(u => u.type === Hr.Interface || u.type === Hr.Type)) } let a = this.getGlobalScope(e, r); return n ? this.createScope(n, a) : a } getGlobalScope(e, r) { let n = (0, os.getContainerOfType)(r.container, Hr.isGrammar); if (!n) return ty.EMPTY_SCOPE; let i = (0, QA.stream)(n.imports).map(ry.resolveImportUri).nonNullable(), o = this.indexManager.allElements(e).filter(a => i.some(s => (0, yB.equalURI)(a.documentUri, s))); return e === Hr.AbstractType && (o = o.filter(a => a.type === Hr.Interface || a.type === Hr.Type)), new ty.StreamScope(o) } }; as.LangiumGrammarScopeProvider = ny; var iy = class extends gB.DefaultScopeComputation { constructor(e) { super(e), this.astNodeLocator = e.workspace.AstNodeLocator } exportNode(e, r, n) { var i; if (super.exportNode(e, r, n), (0, Hr.isParserRule)(e)) { if (!e.returnType && !e.dataType) { let o = (i = e.inferredType) !== null && i !== void 0 ? i : e; r.push(this.createInterfaceDescription(o, o.name, n)) } (0, os.streamAllContents)(e).forEach(o => { if ((0, Hr.isAction)(o) && o.inferredType) { let a = (0, ry.getActionType)(o); a && r.push(this.createInterfaceDescription(o, a, n)) } }) } } processNode(e, r, n) { (0, Hr.isReturnType)(e) || (this.processTypeNode(e, r, n), this.processActionNode(e, r, n), super.processNode(e, r, n)) } processTypeNode(e, r, n) { var i; let o = e.$container; if (o && (0, Hr.isParserRule)(e) && !e.returnType && !e.dataType) { let a = (i = e.inferredType) !== null && i !== void 0 ? i : e; n.add(o, this.createInterfaceDescription(a, a.name, r)) } } processActionNode(e, r, n) { let i = (0, os.findRootNode)(e); if (i && (0, Hr.isAction)(e) && e.inferredType) { let o = (0, ry.getActionType)(e); o && n.add(i, this.createInterfaceDescription(e, o, r)) } } createInterfaceDescription(e, r, n = (0, os.getDocument)(e)) { var i; let o = (i = this.nameProvider.getNameNode(e)) !== null && i !== void 0 ? i : e.$cstNode; return { node: e, name: r, nameSegment: (0, JA.toDocumentSegment)(o), selectionSegment: (0, JA.toDocumentSegment)(e.$cstNode), type: "Interface", documentUri: n.uri, path: this.astNodeLocator.getAstNodePath(e) } } }; as.LangiumGrammarScopeComputation = iy }); var dy = f(dr => { "use strict"; var vB = dr && dr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), _B = dr && dr.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), TB = dr && dr.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && vB(e, t, r); return _B(e, t), e }; Object.defineProperty(dr, "__esModule", { value: !0 }); dr.LangiumGrammarValidator = dr.IssueCodes = dr.registerValidationChecks = void 0; var oy = qa(), oo = be(), ao = yn(), ay = Le(), so = vt(), sy = Ft(), Ce = TB(Se()), uy = Se(), xt = jt(), RB = Gg(), cy = dd(); function bB(t) { let e = t.validation.ValidationRegistry, r = t.validation.LangiumGrammarValidator, n = { Action: [r.checkAssignmentReservedName], AbstractRule: r.checkRuleName, Assignment: [r.checkAssignmentWithFeatureName, r.checkAssignmentToFragmentRule, r.checkAssignmentTypes, r.checkAssignmentReservedName], ParserRule: [r.checkParserRuleDataType, r.checkRuleParametersUsed, r.checkParserRuleReservedName], TerminalRule: [r.checkTerminalRuleReturnType, r.checkHiddenTerminalRule, r.checkEmptyTerminalRule], InferredType: r.checkTypeReservedName, Keyword: r.checkKeyword, UnorderedGroup: r.checkUnorderedGroup, Grammar: [r.checkGrammarName, r.checkEntryGrammarRule, r.checkUniqueRuleName, r.checkUniqueTypeName, r.checkUniqueImportedRules, r.checkDuplicateImportedGrammar, r.checkGrammarHiddenTokens, r.checkGrammarForUnusedRules, r.checkGrammarTypeInfer, r.checkClashingTerminalNames], GrammarImport: r.checkPackageImport, CharacterRange: r.checkInvalidCharacterRange, Interface: [r.checkTypeReservedName, r.checkInterfacePropertyTypes], Type: [r.checkTypeReservedName], TypeAttribute: r.checkTypeReservedName, RuleCall: [r.checkUsedHiddenTerminalRule, r.checkUsedFragmentTerminalRule, r.checkRuleCallParameters], TerminalRuleCall: r.checkUsedHiddenTerminalRule, CrossReference: [r.checkCrossReferenceSyntax, r.checkCrossRefNameAssignment, r.checkCrossRefTerminalType, r.checkCrossRefType, r.checkCrossReferenceToTypeUnion], SimpleType: r.checkFragmentsInTypes, ReferenceType: r.checkReferenceTypeUnion }; e.register(n, r) } dr.registerValidationChecks = bB; var lr; (function (t) { t.GrammarNameUppercase = "grammar-name-uppercase", t.RuleNameUppercase = "rule-name-uppercase", t.HiddenGrammarTokens = "hidden-grammar-tokens", t.UseRegexTokens = "use-regex-tokens", t.EntryRuleTokenSyntax = "entry-rule-token-syntax", t.CrossRefTokenSyntax = "cross-ref-token-syntax", t.UnnecessaryFileExtension = "unnecessary-file-extension", t.InvalidReturns = "invalid-returns", t.InvalidInfers = "invalid-infers", t.MissingInfer = "missing-infer", t.MissingReturns = "missing-returns", t.SuperfluousInfer = "superfluous-infer", t.OptionalUnorderedGroup = "optional-unordered-group" })(lr = dr.IssueCodes || (dr.IssueCodes = {})); var ly = class { constructor(e) { this.references = e.references.References, this.documents = e.shared.workspace.LangiumDocuments } checkGrammarName(e, r) { if (e.name) { let n = e.name.substring(0, 1); n.toUpperCase() !== n && r("warning", "Grammar name should start with an upper case letter.", { node: e, property: "name", code: lr.GrammarNameUppercase }) } } checkEntryGrammarRule(e, r) { if (e.isDeclared && !e.name) return; let n = e.rules.filter(i => Ce.isParserRule(i) && i.entry); if (e.isDeclared && n.length === 0) { let i = e.rules.find(o => Ce.isParserRule(o) && !(0, xt.isDataTypeRule)(o)); i ? r("error", "The grammar is missing an entry parser rule. This rule can be an entry one.", { node: i, property: "name", code: lr.EntryRuleTokenSyntax }) : r("error", "This grammar is missing an entry parser rule.", { node: e, property: "name" }) } else !e.isDeclared && n.length >= 1 ? n.forEach(i => r("error", "Cannot declare entry rules for unnamed grammars.", { node: i, property: "name" })) : n.length > 1 ? n.forEach(i => r("error", "The entry rule has to be unique.", { node: i, property: "name" })) : n.length === 1 && (0, xt.isDataTypeRule)(n[0]) && r("error", "The entry rule cannot be a data type rule.", { node: n[0], property: "name" }) } checkUniqueRuleName(e, r) { let n = i => (0, sy.stream)(i.rules).filter(o => !ec(o)); this.checkUniqueName(e, r, n, "rule") } checkUniqueTypeName(e, r) { let n = i => (0, sy.stream)(i.types).concat(i.interfaces); this.checkUniqueName(e, r, n, "type") } checkUniqueName(e, r, n, i) { let o = new ao.MultiMap; n(e).forEach(u => o.add(u.name, u)); for (let [, u] of o.entriesGroupedByKey()) u.length > 1 && u.forEach(c => { r("error", `A ${i}'s name has to be unique.`, { node: c, property: "name" }) }); let a = new Set, s = (0, xt.resolveTransitiveImports)(this.documents, e); for (let u of s) n(u).forEach(c => a.add(c.name)); for (let u of o.keys()) a.has(u) && o.get(u).forEach(l => { r("error", `A ${i} with the name '${l.name}' already exists in an imported grammar.`, { node: l, property: "name" }) }) } checkDuplicateImportedGrammar(e, r) { let n = new ao.MultiMap; for (let i of e.imports) { let o = (0, xt.resolveImport)(this.documents, i); o && n.add(o, i) } for (let [, i] of n.entriesGroupedByKey()) i.length > 1 && i.forEach((o, a) => { a > 0 && r("warning", "The grammar is already being directly imported.", { node: o, tags: [oy.DiagnosticTag.Unnecessary] }) }) } checkUniqueImportedRules(e, r) { let n = new Map; for (let o of e.imports) { let a = (0, xt.resolveTransitiveImports)(this.documents, o); n.set(o, a) } let i = new ao.MultiMap; for (let o of e.imports) { let a = n.get(o); for (let s of e.imports) { if (o === s) continue; let u = n.get(s), c = this.getDuplicateExportedRules(a, u); for (let l of c) i.add(o, l) } } for (let o of e.imports) { let a = i.get(o); a.length > 0 && r("error", "Some rules exported by this grammar are also included in other imports: " + (0, sy.stream)(a).distinct().join(", "), { node: o, property: "path" }) } } getDuplicateExportedRules(e, r) { let i = e.filter(s => !r.includes(s)).flatMap(s => s.rules), o = r.flatMap(s => s.rules), a = new Set; for (let s of i) { let u = s.name; for (let c of o) { let l = c.name; u === l && a.add(c.name) } } return a } checkGrammarTypeInfer(e, r) { var n, i, o; let a = new Set; for (let u of e.types) a.add(u.name); for (let u of e.interfaces) a.add(u.name); (0, xt.resolveTransitiveImports)(this.documents, e).forEach(u => { u.types.forEach(c => a.add(c.name)), u.interfaces.forEach(c => a.add(c.name)) }); for (let u of e.rules.filter(Ce.isParserRule)) { if (ec(u)) continue; let c = (0, xt.isDataTypeRule)(u), l = !u.returnType && !u.dataType, d = (0, xt.getTypeNameWithoutError)(u); if (!c && d && a.has(d) === l) { if ((l || ((n = u.returnType) === null || n === void 0 ? void 0 : n.ref) !== void 0) && u.inferredType === void 0) r("error", s(d, l), { node: u, property: "name", code: lr.MissingReturns }); else if (l || ((i = u.returnType) === null || i === void 0 ? void 0 : i.ref) !== void 0) { let h = (0, so.findNodeForKeyword)(u.inferredType.$cstNode, "infers"); r("error", s(d, l), { node: u.inferredType, property: "name", code: lr.InvalidInfers, data: (0, ay.toDocumentSegment)(h) }) } } else if (c && l) { let h = (0, so.findNodeForKeyword)(u.$cstNode, "infer"); r("error", "Data type rules cannot infer a type.", { node: u, property: "inferredType", code: lr.InvalidInfers, data: (0, ay.toDocumentSegment)(h) }) } } for (let u of (0, oo.streamAllContents)(e).filter(Ce.isAction)) { let c = this.getActionType(u); if (c) { let l = Boolean(u.inferredType), d = (0, xt.getTypeNameWithoutError)(u); if (u.type && d && a.has(d) === l) { let h = l ? (0, so.findNodeForKeyword)(u.$cstNode, "infer") : (0, so.findNodeForKeyword)(u.$cstNode, "{"); r("error", s(d, l), { node: u, property: "type", code: l ? lr.SuperfluousInfer : lr.MissingInfer, data: (0, ay.toDocumentSegment)(h) }) } else if (c && d && a.has(d) && l && u.$cstNode) { let h = (0, so.findNodeForProperty)((o = u.inferredType) === null || o === void 0 ? void 0 : o.$cstNode, "name"), y = (0, so.findNodeForKeyword)(u.$cstNode, "{"); h && y && r("error", `${d} is a declared type and cannot be redefined.`, { node: u, property: "type", code: lr.SuperfluousInfer, data: { start: y.range.end, end: h.range.start } }) } } } function s(u, c) { return c ? `The type '${u}' is already explicitly declared and cannot be inferred.` : `The type '${u}' is not explicitly declared and must be inferred.` } } getActionType(e) { var r; if (e.type) return (r = e.type) === null || r === void 0 ? void 0 : r.ref; if (e.inferredType) return e.inferredType } checkGrammarHiddenTokens(e, r) { e.definesHiddenTokens && r("error", "Hidden terminals are declared at the terminal definition.", { node: e, property: "definesHiddenTokens", code: lr.HiddenGrammarTokens }) } checkHiddenTerminalRule(e, r) { e.hidden && e.fragment && r("error", "Cannot use terminal fragments as hidden tokens.", { node: e, property: "hidden" }) } checkEmptyTerminalRule(e, r) { try { let n = (0, xt.terminalRegex)(e); new RegExp(n).test("") && r("error", "This terminal could match an empty string.", { node: e, property: "name" }) } catch { } } checkUsedHiddenTerminalRule(e, r) { let n = (0, oo.getContainerOfType)(e, i => Ce.isTerminalRule(i) || Ce.isParserRule(i)); if (n) { if ("hidden" in n && n.hidden) return; let i = e.rule.ref; Ce.isTerminalRule(i) && i.hidden && r("error", "Cannot use hidden terminal in non-hidden rule", { node: e, property: "rule" }) } } checkUsedFragmentTerminalRule(e, r) { let n = e.rule.ref; Ce.isTerminalRule(n) && n.fragment && (0, oo.getContainerOfType)(e, Ce.isParserRule) && r("error", "Cannot use terminal fragments as part of parser rules.", { node: e, property: "rule" }) } checkCrossReferenceSyntax(e, r) { e.deprecatedSyntax && r("error", "'|' is deprecated. Please, use ':' instead.", { node: e, property: "deprecatedSyntax", code: lr.CrossRefTokenSyntax }) } checkPackageImport(e, r) { (0, xt.resolveImport)(this.documents, e) === void 0 ? r("error", "Import cannot be resolved.", { node: e, property: "path" }) : e.path.endsWith(".langium") && r("warning", "Imports do not need file extensions.", { node: e, property: "path", code: lr.UnnecessaryFileExtension }) } checkInvalidCharacterRange(e, r) { if (e.right) { let n = "Character ranges cannot use more than one character", i = !1; e.left.value.length > 1 && (i = !0, r("error", n, { node: e.left, property: "value" })), e.right.value.length > 1 && (i = !0, r("error", n, { node: e.right, property: "value" })), i || r("hint", "Consider using regex instead of character ranges", { node: e, code: lr.UseRegexTokens }) } } checkGrammarForUnusedRules(e, r) { let n = (0, so.getAllReachableRules)(e, !0); for (let i of e.rules) Ce.isTerminalRule(i) && i.hidden || ec(i) || n.has(i) || r("hint", "This rule is declared but never referenced.", { node: i, property: "name", tags: [oy.DiagnosticTag.Unnecessary] }) } checkClashingTerminalNames(e, r) { let n = new ao.MultiMap, i = new Set; for (let c of e.rules) Ce.isTerminalRule(c) && c.name && n.add(c.name, c), Ce.isParserRule(c) && (0, oo.streamAllContents)(c).filter(Ce.isKeyword).forEach(d => i.add(d.value)); let o = new ao.MultiMap, a = new ao.MultiMap; for (let c of e.imports) { let l = (0, xt.resolveTransitiveImports)(this.documents, c); for (let d of l) for (let h of d.rules) Ce.isTerminalRule(h) && h.name ? o.add(h.name, c) : Ce.isParserRule(h) && h.name && (0, oo.streamAllContents)(h).filter(Ce.isKeyword).forEach(m => a.add(m.value, c)) } for (let c of n.values()) if (i.has(c.name)) r("error", "Terminal name clashes with existing keyword.", { node: c, property: "name" }); else if (a.has(c.name)) { let l = a.get(c.name); r("error", `Terminal name clashes with imported keyword from "${l[0].path}".`, { node: c, property: "name" }) } let s = new ao.MultiMap; for (let c of i) for (let l of o.get(c)) s.add(l, c); for (let [c, l] of s.entriesGroupedByKey()) l.length > 0 && r("error", `Imported terminals (${l.join(", ")}) clash with locally defined keywords.`, { node: c, property: "path" }); let u = new ao.MultiMap; for (let [c, l] of o.entriesGroupedByKey()) { let d = a.get(c); d.length > 0 && l.filter(h => !d.includes(h)).forEach(h => u.add(h, c)) } for (let [c, l] of u.entriesGroupedByKey()) l.length > 0 && r("error", `Imported terminals (${l.join(", ")}) clash with imported keywords.`, { node: c, property: "path" }) } checkRuleName(e, r) { if (e.name && !ec(e)) { let n = e.name.substring(0, 1); n.toUpperCase() !== n && r("warning", "Rule name should start with an upper case letter.", { node: e, property: "name", code: lr.RuleNameUppercase }) } } checkTypeReservedName(e, r) { this.checkReservedName(e, "name", r) } checkAssignmentReservedName(e, r) { this.checkReservedName(e, "feature", r) } checkParserRuleReservedName(e, r) { e.inferredType || this.checkReservedName(e, "name", r) } checkReservedName(e, r, n) { let i = e[r]; typeof i == "string" && AB.has(i) && n("error", `'${i}' is a reserved name of the JavaScript runtime.`, { node: e, property: r }) } checkKeyword(e, r) { (0, oo.getContainerOfType)(e, uy.isParserRule) && (e.value.length === 0 ? r("error", "Keywords cannot be empty.", { node: e }) : e.value.trim().length === 0 ? r("error", "Keywords cannot only consist of whitespace characters.", { node: e }) : /\s/g.test(e.value) && r("warning", "Keywords should not contain whitespace characters.", { node: e })) } checkUnorderedGroup(e, r) { e.elements.forEach(n => { (0, xt.isOptionalCardinality)(n.cardinality) && r("error", "Optional elements in Unordered groups are currently not supported", { node: n, code: lr.OptionalUnorderedGroup }) }) } checkRuleParametersUsed(e, r) { let n = e.parameters; if (n.length > 0) { let i = (0, oo.streamAllContents)(e).filter(Ce.isParameterReference); for (let o of n) i.some(a => a.parameter.ref === o) || r("hint", `Parameter '${o.name}' is unused.`, { node: o, tags: [oy.DiagnosticTag.Unnecessary] }) } } checkParserRuleDataType(e, r) { if (ec(e)) return; let n = (0, xt.hasDataTypeReturn)(e), i = (0, xt.isDataTypeRule)(e); !n && i ? r("error", "This parser rule does not create an object. Add a primitive return type or an action to the start of the rule to force object instantiation.", { node: e, property: "name" }) : n && !i && r("error", "Normal parser rules are not allowed to return a primitive value. Use a datatype rule for that.", { node: e, property: e.dataType ? "dataType" : "returnType" }) } checkAssignmentToFragmentRule(e, r) { e.terminal && (0, uy.isRuleCall)(e.terminal) && (0, uy.isParserRule)(e.terminal.rule.ref) && e.terminal.rule.ref.fragment && r("error", `Cannot use fragment rule '${e.terminal.rule.ref.name}' for assignment of property '${e.feature}'.`, { node: e, property: "terminal" }) } checkAssignmentTypes(e, r) { if (!e.terminal) return; let n; (0, oo.streamAllContents)(e.terminal).map(o => Ce.isCrossReference(o) ? "ref" : "other").find(o => n ? o !== n : (n = o, !1)) && r("error", this.createMixedTypeError(e.feature), { node: e, property: "terminal" }) } checkInterfacePropertyTypes(e, r) { for (let n of e.attributes) if (n.type) { let i = (0, RB.typeDefinitionToPropertyType)(n.type), o = (0, cy.flattenPlainType)(i), a = !1, s = !1; for (let u of o) (0, cy.isPlainReferenceType)(u) ? a = !0 : (0, cy.isPlainReferenceType)(u) || (s = !0); a && s && r("error", this.createMixedTypeError(n.name), { node: n, property: "type" }) } } createMixedTypeError(e) { return `Mixing a cross-reference with other types is not supported. Consider splitting property "${e}" into two or more different properties.` } checkTerminalRuleReturnType(e, r) { var n; !((n = e.type) === null || n === void 0) && n.name && !(0, xt.isPrimitiveType)(e.type.name) && r("error", "Terminal rules can only return primitive types like 'string', 'boolean', 'number', 'Date' or 'bigint'.", { node: e.type, property: "name" }) } checkRuleCallParameters(e, r) { let n = e.rule.ref; if (Ce.isParserRule(n)) { let i = n.parameters.length, o = e.arguments.length; i !== o && r("error", `Rule '${n.name}' expects ${i} arguments, but got ${o}.`, { node: e }) } else Ce.isTerminalRule(n) && e.arguments.length > 0 && r("error", "Terminal rules do not accept any arguments", { node: e }) } checkCrossRefNameAssignment(e, r) { !e.terminal && e.type.ref && !(0, so.findNameAssignment)(e.type.ref) && r("error", "Cannot infer terminal or data type rule for cross reference.", { node: e, property: "type" }) } checkCrossRefTerminalType(e, r) { Ce.isRuleCall(e.terminal) && Ce.isParserRule(e.terminal.rule.ref) && !(0, xt.isDataTypeRule)(e.terminal.rule.ref) && r("error", "Parser rules cannot be used for cross references.", { node: e.terminal, property: "rule" }) } checkCrossRefType(e, r) { let n = this.checkReferenceToRuleButNotType(e?.type); n && r("error", n, { node: e, property: "type" }) } checkCrossReferenceToTypeUnion(e, r) { if (Ce.isType(e.type.ref) && Ce.isUnionType(e.type.ref.type)) { let n = eP(e.type.ref.type); n.length > 0 && r("error", `Cross-reference on type union is only valid if all alternatives are AST nodes. ${n.join(", ")} ${n.length > 1 ? "are" : "is"} not ${n.length > 1 ? "" : "an "}AST node${n.length > 1 ? "s" : ""}.`, { node: e, property: "type" }) } } checkFragmentsInTypes(e, r) { var n, i; Ce.isParserRule((n = e.typeRef) === null || n === void 0 ? void 0 : n.ref) && (!((i = e.typeRef) === null || i === void 0) && i.ref.fragment) && r("error", "Cannot use rule fragments in types.", { node: e, property: "typeRef" }) } checkReferenceTypeUnion(e, r) { Ce.isSimpleType(e.referenceType) || r("error", "Only direct rule references are allowed in reference types.", { node: e, property: "referenceType" }) } checkReferenceToRuleButNotType(e) { if (e && Ce.isParserRule(e.ref) && !(0, xt.isDataTypeRule)(e.ref) && (e.ref.returnType || e.ref.inferredType)) { let r = (0, xt.getTypeNameWithoutError)(e.ref); if (r) return `Use the rule type '${r}' instead of the typed rule name '${e.ref.name}' for cross references.` } } checkAssignmentWithFeatureName(e, r) { e.feature === "name" && Ce.isCrossReference(e.terminal) && r("warning", 'The "name" property is not recommended for cross-references.', { node: e, property: "feature" }) } }; dr.LangiumGrammarValidator = ly; function ec(t) { return !t.definition || !t.definition.$cstNode || t.definition.$cstNode.length === 0 } var AB = new Set(["Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array", "Map", "Set", "WeakMap", "WeakSet", "Error", "AggregateError", "EvalError", "InternalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "BigInt", "RegExp", "Number", "Object", "Function", "Symbol", "String", "Math", "NaN", "Infinity", "isFinite", "isNaN", "Buffer", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "globalThis", "decodeURIComponent", "decodeURI", "encodeURIComponent", "encodeURI", "parseInt", "parseFloat", "Promise", "Generator", "GeneratorFunction", "AsyncFunction", "AsyncGenerator", "AsyncGeneratorFunction", "Reflect", "Proxy", "Date", "Intl", "eval", "undefined"]); function eP(t) { let e = []; return t.types.forEach(r => { var n; Ce.isSimpleType(r) && (!((n = r.typeRef) === null || n === void 0) && n.ref ? Ce.isType(r.typeRef.ref) && (Ce.isUnionType(r.typeRef.ref.type) ? e.push(...eP(r.typeRef.ref.type)) : e.push(r.typeRef.ref.name)) : r.stringType ? e.push(`"${r.stringType}"`) : r.primitiveType && e.push(r.primitiveType)) }), Array.from(new Set(e)) } }); var Sd = f(vn => { "use strict"; Object.defineProperty(vn, "__esModule", { value: !0 }); vn.DocumentValidator = vn.toDiagnosticSeverity = vn.getDiagnosticRange = vn.DefaultDocumentValidator = void 0; var Wr = Oe(), tP = vt(), PB = be(), SB = Le(), Ad = _r(), fy = class { constructor(e) { this.validationRegistry = e.validation.ValidationRegistry, this.metadata = e.LanguageMetaData } async validateDocument(e, r = Wr.CancellationToken.None) { let n = e.parseResult, i = []; await (0, Ad.interruptAndCheck)(r); for (let o of n.lexerErrors) { let a = { severity: Wr.DiagnosticSeverity.Error, range: { start: { line: o.line - 1, character: o.column - 1 }, end: { line: o.line - 1, character: o.column + o.length - 1 } }, message: o.message, code: Pd.LexingError, source: this.getSource() }; i.push(a) } for (let o of n.parserErrors) { let a; if (isNaN(o.token.startOffset)) { if ("previousToken" in o) { let s = o.previousToken; if (isNaN(s.startOffset)) a = Wr.Range.create(0, 0, 0, 0); else { let u = Wr.Position.create(s.endLine - 1, s.endColumn); a = Wr.Range.create(u, u) } } } else a = (0, SB.tokenToRange)(o.token); if (a) { let s = { severity: Wr.DiagnosticSeverity.Error, range: a, message: o.message, code: Pd.ParsingError, source: this.getSource() }; i.push(s) } } for (let o of e.references) { let a = o.error; if (a) { let s = { containerType: a.container.$type, property: a.property, refText: a.reference.$refText }, u = { node: a.container, property: a.property, index: a.index, code: Pd.LinkingError, data: s }; i.push(this.toDiagnostic("error", a.message, u)) } } try { i.push(...await this.validateAst(n.value, e, r)) } catch (o) { if ((0, Ad.isOperationCancelled)(o)) throw o; console.error("An error occurred during validation:", o) } return await (0, Ad.interruptAndCheck)(r), i } async validateAst(e, r, n = Wr.CancellationToken.None) { let i = [], o = (a, s, u) => { i.push(this.toDiagnostic(a, s, u)) }; return await Promise.all((0, PB.streamAst)(e).map(async a => { await (0, Ad.interruptAndCheck)(n); let s = this.validationRegistry.getChecks(a.$type); for (let u of s) await u(a, o, n) })), i } toDiagnostic(e, r, n) { return { message: r, range: rP(n), severity: nP(e), code: n.code, codeDescription: n.codeDescription, tags: n.tags, relatedInformation: n.relatedInformation, data: n.data, source: this.getSource() } } getSource() { return this.metadata.languageId } }; vn.DefaultDocumentValidator = fy; function rP(t) { if (Wr.Range.is(t.range)) return t.range; let e; return typeof t.property == "string" ? e = (0, tP.findNodeForProperty)(t.node.$cstNode, t.property, t.index) : typeof t.keyword == "string" && (e = (0, tP.findNodeForKeyword)(t.node.$cstNode, t.keyword, t.index)), e ?? (e = t.node.$cstNode), e ? e.range : { start: { line: 0, character: 0 }, end: { line: 0, character: 0 } } } vn.getDiagnosticRange = rP; function nP(t) { switch (t) { case "error": return Wr.DiagnosticSeverity.Error; case "warning": return Wr.DiagnosticSeverity.Warning; case "info": return Wr.DiagnosticSeverity.Information; case "hint": return Wr.DiagnosticSeverity.Hint; default: throw new Error("Invalid diagnostic severity: " + t) } } vn.toDiagnosticSeverity = nP; var Pd; (function (t) { t.LexingError = "lexing-error", t.ParsingError = "parsing-error", t.LinkingError = "linking-error" })(Pd = vn.DocumentValidator || (vn.DocumentValidator = {})) }); var uP = f(zn => {
    "use strict"; var CB = zn && zn.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), EB = zn && zn.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), NB = zn && zn.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && CB(e, t, r); return EB(e, t), e }; Object.defineProperty(zn, "__esModule", { value: !0 }); zn.LangiumGrammarCodeActionProvider = void 0; var Br = Oe(), kB = gn(), iP = be(), oP = Le(), wB = vt(), aP = Vo(), sP = Ci(), OB = Sd(), py = NB(Se()), Kr = dy(), hy = class {
      constructor(e) { this.reflection = e.shared.AstReflection, this.indexManager = e.shared.workspace.IndexManager } getCodeActions(e, r) { let n = [], i = o => o && n.push(o); for (let o of r.context.diagnostics) this.createCodeActions(o, e, i); return n } createCodeActions(e, r, n) { switch (e.code) { case Kr.IssueCodes.GrammarNameUppercase: case Kr.IssueCodes.RuleNameUppercase: n(this.makeUpperCase(e, r)); break; case Kr.IssueCodes.HiddenGrammarTokens: n(this.fixHiddenTerminals(e, r)); break; case Kr.IssueCodes.UseRegexTokens: n(this.fixRegexTokens(e, r)); break; case Kr.IssueCodes.EntryRuleTokenSyntax: n(this.addEntryKeyword(e, r)); break; case Kr.IssueCodes.CrossRefTokenSyntax: n(this.fixCrossRefSyntax(e, r)); break; case Kr.IssueCodes.UnnecessaryFileExtension: n(this.fixUnnecessaryFileExtension(e, r)); break; case Kr.IssueCodes.MissingReturns: n(this.fixMissingReturns(e, r)); break; case Kr.IssueCodes.InvalidInfers: case Kr.IssueCodes.InvalidReturns: n(this.fixInvalidReturnsInfers(e, r)); break; case Kr.IssueCodes.MissingInfer: n(this.fixMissingInfer(e, r)); break; case Kr.IssueCodes.SuperfluousInfer: n(this.fixSuperfluousInfer(e, r)); break; case OB.DocumentValidator.LinkingError: { let i = e.data; i && i.containerType === "RuleCall" && i.property === "rule" && n(this.addNewRule(e, i, r)), i && this.lookInGlobalScope(e, i, r).forEach(n); break } } } fixMissingReturns(e, r) { let n = r.textDocument.getText(e.range); if (n) return { title: `Add explicit return type for parser rule ${n}`, kind: Br.CodeActionKind.QuickFix, diagnostics: [e], edit: { changes: { [r.textDocument.uri]: [{ range: e.range, newText: `${n} returns ${n}` }] } } } } fixInvalidReturnsInfers(e, r) { let n = e.data; if (n) { let i = r.textDocument.getText(n.range); return { title: `Correct ${i} usage`, kind: Br.CodeActionKind.QuickFix, diagnostics: [e], edit: { changes: { [r.textDocument.uri]: [{ range: n.range, newText: i === "infers" ? "returns" : "infers" }] } } } } } fixMissingInfer(e, r) { let n = e.data; if (n) return { title: "Correct 'infer' usage", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], edit: { changes: { [r.textDocument.uri]: [{ range: { start: n.range.end, end: n.range.end }, newText: "infer " }] } } } } fixSuperfluousInfer(e, r) { if (e.data) return { title: "Remove the 'infer' keyword", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], edit: { changes: { [r.textDocument.uri]: [{ range: e.data, newText: "" }] } } } } fixUnnecessaryFileExtension(e, r) { let n = Object.assign({}, e.range.end); n.character -= 1; let i = Object.assign({}, n); return i.character -= 8, { title: "Remove file extension", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !0, edit: { changes: { [r.textDocument.uri]: [{ range: { start: i, end: n }, newText: "" }] } } } } makeUpperCase(e, r) { let n = { start: e.range.start, end: { line: e.range.start.line, character: e.range.start.character + 1 } }; return { title: "First letter to upper case", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !0, edit: { changes: { [r.textDocument.uri]: [{ range: n, newText: r.textDocument.getText(n).toUpperCase() }] } } } } addEntryKeyword(e, r) { return { title: "Add entry keyword", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !0, edit: { changes: { [r.textDocument.uri]: [{ range: { start: e.range.start, end: e.range.start }, newText: "entry " }] } } } } fixRegexTokens(e, r) { let n = r.textDocument.offsetAt(e.range.start), i = r.parseResult.value.$cstNode; if (i) { let o = (0, oP.findLeafNodeAtOffset)(i, n), a = (0, iP.getContainerOfType)(o?.element, py.isCharacterRange); if (a && a.right && a.$cstNode) { let s = a.left.value, u = a.right.value; return { title: "Refactor into regular expression", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !0, edit: { changes: { [r.textDocument.uri]: [{ range: a.$cstNode.range, newText: `/[${(0, aP.escapeRegExp)(s)}-${(0, aP.escapeRegExp)(u)}]/` }] } } } } } } fixCrossRefSyntax(e, r) { return { title: "Replace '|' with ':'", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !0, edit: { changes: { [r.textDocument.uri]: [{ range: e.range, newText: ":" }] } } } } fixHiddenTerminals(e, r) { let n = r.parseResult.value, i = n.hiddenTokens, o = [], a = (0, wB.findNodeForProperty)(n.$cstNode, "definesHiddenTokens"); if (a) { let s = a.range.start, u = a.offset, c = n.$cstNode.text.indexOf(")", u) + 1; o.push({ newText: "", range: { start: s, end: r.textDocument.positionAt(c) } }) } for (let s of i) { let u = s.ref; if (u && py.isTerminalRule(u) && !u.hidden && u.$cstNode) { let c = u.$cstNode.range.start; o.push({ newText: "hidden ", range: { start: c, end: c } }) } } return { title: "Fix hidden terminals", kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !0, edit: { changes: { [r.textDocument.uri]: o } } } } addNewRule(e, r, n) {
        let i = n.textDocument.offsetAt(e.range.start), o = n.parseResult.value.$cstNode; if (o) {
          let a = (0, oP.findLeafNodeAtOffset)(o, i), s = (0, iP.getContainerOfType)(a?.element, py.isParserRule); if (s && s.$cstNode) return {
            title: `Add new rule '${r.refText}'`, kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !1, edit: {
              changes: {
                [n.textDocument.uri]: [{
                  range: { start: s.$cstNode.range.end, end: s.$cstNode.range.end }, newText: `

`+ r.refText + `:
    /* TODO implement rule */ {infer `+ r.refText + "};"
                }]
              }
            }
          }
        }
      } lookInGlobalScope(e, r, n) {
        var i, o; let a = { container: { $type: r.containerType }, property: r.property, reference: { $refText: r.refText } }, s = this.reflection.getReferenceType(a), u = this.indexManager.allElements(s).filter(h => h.name === r.refText), c = [], l = -1, d = -1; for (let h of u) {
          if ((0, sP.equalURI)(h.documentUri, n.uri)) continue; let y = DB(n.uri, h.documentUri), m, R = "", C = n.parseResult.value, E = C.imports.find(A => A.path && y < A.path); if (E) m = (i = E.$cstNode) === null || i === void 0 ? void 0 : i.range.start; else if (C.imports.length > 0) { let A = C.imports[C.imports.length - 1].$cstNode.range.end; A && (m = { line: A.line + 1, character: 0 }) } else C.rules.length > 0 && (m = (o = C.rules[0].$cstNode) === null || o === void 0 ? void 0 : o.range.start, R = `
`); m && ((l < 0 || y.length < d) && (l = c.length, d = y.length), c.push({
            title: `Add import to '${y}'`, kind: Br.CodeActionKind.QuickFix, diagnostics: [e], isPreferred: !1, edit: {
              changes: {
                [n.textDocument.uri]: [{
                  range: { start: m, end: m }, newText: `import '${y}'
${R}`
                }]
              }
            }
          }))
        } return l >= 0 && (c[l].isPreferred = !0), c
      }
    }; zn.LangiumGrammarCodeActionProvider = hy; function DB(t, e) { let r = kB.Utils.dirname(t), n = (0, sP.relativeURI)(r, e); return !n.startsWith("./") && !n.startsWith("../") && (n = "./" + n), n.endsWith(".langium") && (n = n.substring(0, n.length - 8)), n }
  }); var Ed = f(Cd => { "use strict"; Object.defineProperty(Cd, "__esModule", { value: !0 }); Cd.DefaultFoldingRangeProvider = void 0; var my = Oe(), IB = be(), xB = Le(), gy = class { constructor(e) { this.commentNames = e.parser.GrammarConfig.multilineCommentRules } getFoldingRanges(e) { let r = [], n = i => r.push(i); return this.collectFolding(e, n), r } collectFolding(e, r) { var n; let i = (n = e.parseResult) === null || n === void 0 ? void 0 : n.value; if (i) { if (this.shouldProcessContent(i)) { let o = (0, IB.streamAllContents)(i).iterator(), a; do if (a = o.next(), !a.done) { let s = a.value; this.shouldProcess(s) && this.collectObjectFolding(e, s, r), this.shouldProcessContent(s) || o.prune() } while (!a.done) } this.collectCommentFolding(e, i, r) } } shouldProcess(e) { return !0 } shouldProcessContent(e) { return !0 } collectObjectFolding(e, r, n) { let i = r.$cstNode; if (i) { let o = this.toFoldingRange(e, i); o && n(o) } } collectCommentFolding(e, r, n) { let i = r.$cstNode; if (i) { for (let o of (0, xB.flattenCst)(i)) if (this.commentNames.includes(o.tokenType.name)) { let a = this.toFoldingRange(e, o, my.FoldingRangeKind.Comment); a && n(a) } } } toFoldingRange(e, r, n) { let i = r.range, o = i.start, a = i.end; if (!(a.line - o.line < 2)) return this.includeLastFoldingLine(r, n) || (a = e.textDocument.positionAt(e.textDocument.offsetAt({ line: a.line, character: 0 }) - 1)), my.FoldingRange.create(o.line, a.line, o.character, a.character, n) } includeLastFoldingLine(e, r) { if (r === my.FoldingRangeKind.Comment) return !1; let n = e.text, i = n.charAt(n.length - 1); return !(i === "}" || i === ")" || i === "]") } }; Cd.DefaultFoldingRangeProvider = gy }); var cP = f(Nd => { "use strict"; Object.defineProperty(Nd, "__esModule", { value: !0 }); Nd.LangiumGrammarFoldingRangeProvider = void 0; var qB = Ed(), LB = Se(), yy = class extends qB.DefaultFoldingRangeProvider { shouldProcessContent(e) { return !(0, LB.isParserRule)(e) } }; Nd.LangiumGrammarFoldingRangeProvider = yy }); var Ty = f(_n => {
    "use strict"; Object.defineProperty(_n, "__esModule", { value: !0 }); _n.Formatting = _n.FormattingRegion = _n.DefaultNodeFormatter = _n.AbstractFormatter = void 0; var kd = vt(), vy = er(), MB = be(), lP = Le(), tc = Ft(), _y = class {
      constructor() { this.collector = () => { } } getNodeFormatter(e) { return new wd(e, this.collector) } formatDocument(e, r) { let n = e.parseResult; return n.lexerErrors.length === 0 && n.parserErrors.length === 0 ? this.doDocumentFormat(e, r.options) : [] } isFormatRangeErrorFree(e, r) { let n = e.parseResult; return n.lexerErrors.length || n.parserErrors.length ? Math.min(...n.lexerErrors.map(o => { var a; return (a = o.line) !== null && a !== void 0 ? a : Number.MAX_VALUE }), ...n.parserErrors.map(o => { var a; return (a = o.token.startLine) !== null && a !== void 0 ? a : Number.MAX_VALUE })) > r.end.line : !0 } formatDocumentRange(e, r) { return this.isFormatRangeErrorFree(e, r.range) ? this.doDocumentFormat(e, r.options, r.range) : [] } formatDocumentOnType(e, r) { let n = { start: { character: 0, line: r.position.line }, end: r.position }; return this.isFormatRangeErrorFree(e, n) ? this.doDocumentFormat(e, r.options, n) : [] } get formatOnTypeOptions() { } doDocumentFormat(e, r, n) { let i = new Map, o = (s, u, c) => { var l, d; let h = this.nodeModeToKey(s, u), y = i.get(h), m = (l = c.options.priority) !== null && l !== void 0 ? l : 0, R = (d = y?.options.priority) !== null && d !== void 0 ? d : 0; (!y || R <= m) && i.set(h, c) }; this.collector = o, this.iterateAstFormatting(e, n); let a = this.iterateCstFormatting(e, i, r, n); return this.avoidOverlappingEdits(e.textDocument, a) } avoidOverlappingEdits(e, r) { let n = []; for (let i of r) { let o = n[n.length - 1]; if (o) { let a = e.offsetAt(i.range.start), s = e.offsetAt(o.range.end); a < s && n.pop() } n.push(i) } return n } iterateAstFormatting(e, r) { let n = e.parseResult.value; this.format(n); let i = (0, MB.streamAllContents)(n).iterator(), o; do if (o = i.next(), !o.done) { let a = o.value; this.insideRange(a.$cstNode.range, r) ? this.format(a) : i.prune() } while (!o.done) } nodeModeToKey(e, r) { return `${e.offset}:${e.end}:${r}` } insideRange(e, r) { return !r || e.start.line <= r.start.line && e.end.line >= r.end.line || e.start.line >= r.start.line && e.end.line <= r.end.line || e.start.line <= r.end.line && e.end.line >= r.end.line } isNecessary(e, r) { return r.getText(e.range) !== e.newText } iterateCstFormatting(e, r, n, i) { let o = { indentation: 0, options: n, document: e.textDocument }, a = [], u = this.iterateCstTree(e, o).iterator(), c, l; do if (l = u.next(), !l.done) { let d = l.value, h = (0, vy.isLeafCstNode)(d), y = this.nodeModeToKey(d, "prepend"), m = r.get(y); if (r.delete(y), m) { let E = this.createTextEdit(c, d, m, o); for (let A of E) A && this.insideRange(A.range, i) && this.isNecessary(A, e.textDocument) && a.push(A) } let R = this.nodeModeToKey(d, "append"), C = r.get(R); if (r.delete(R), C) { let E = (0, lP.getNextNode)(d); if (E) { let A = this.createTextEdit(d, E, C, o); for (let b of A) b && this.insideRange(b.range, i) && this.isNecessary(b, e.textDocument) && a.push(b) } } if (!m && d.hidden) { let E = this.createHiddenTextEdits(c, d, void 0, o); for (let A of E) A && this.insideRange(A.range, i) && this.isNecessary(A, e.textDocument) && a.push(A) } h && (c = d) } while (!l.done); return a } createHiddenTextEdits(e, r, n, i) {
        var o; let a = r.range.start.line; if (e && e.range.end.line === a) return []; let s = [], u = { start: { character: 0, line: a }, end: r.range.start }, c = i.document.getText(u), l = this.findFittingMove(u, (o = n?.moves) !== null && o !== void 0 ? o : [], i), d = this.getExistingIndentationCharacterCount(c, i), y = this.getIndentationCharacterCount(i, l) - d; if (y === 0) return []; let m = ""; y > 0 && (m = (i.options.insertSpaces ? " " : "	").repeat(y)); let R = r.text.split(`
`); R[0] = c + R[0]; for (let C = 0; C < R.length; C++) { let E = a + C, A = { character: 0, line: E }; if (y > 0) s.push({ newText: m, range: { start: A, end: A } }); else { let b = R[C], O = 0; for (; O < b.length; O++) { let L = b.charAt(O); if (L !== " " && L !== "	") break } s.push({ newText: "", range: { start: A, end: { line: E, character: Math.min(O, Math.abs(y)) } } }) } } return s
      } getExistingIndentationCharacterCount(e, r) { let n = " ".repeat(r.options.tabSize); return (r.options.insertSpaces ? e.replaceAll("	", n) : e.replaceAll(n, "	")).length } getIndentationCharacterCount(e, r) { let n = e.indentation; return r && r.tabs && (n += r.tabs), (e.options.insertSpaces ? e.options.tabSize : 1) * n } createTextEdit(e, r, n, i) { var o; if (r.hidden) return this.createHiddenTextEdits(e, r, n, i); let a = { start: (o = e?.range.end) !== null && o !== void 0 ? o : { character: 0, line: 0 }, end: r.range.start }, s = this.findFittingMove(a, n.moves, i); if (!s) return []; let u = s.characters, c = s.lines, l = s.tabs, d = i.indentation; i.indentation += l ?? 0; let h = []; return u !== void 0 ? h.push(this.createSpaceTextEdit(a, u, n.options)) : c !== void 0 ? h.push(this.createLineTextEdit(a, c, i, n.options)) : l !== void 0 && h.push(this.createTabTextEdit(a, Boolean(e), i)), (0, vy.isLeafCstNode)(r) && (i.indentation = d), h } createSpaceTextEdit(e, r, n) { if (e.start.line === e.end.line) { let o = e.end.character - e.start.character; r = this.fitIntoOptions(r, o, n) } return { newText: " ".repeat(r), range: e } } createLineTextEdit(e, r, n, i) {
        let o = e.end.line - e.start.line; r = this.fitIntoOptions(r, o, i); let s = (n.options.insertSpaces ? " ".repeat(n.options.tabSize) : "	").repeat(n.indentation); return {
          newText: `${`
`.repeat(r)}${s}`, range: e
        }
      } createTabTextEdit(e, r, n) {
        let o = (n.options.insertSpaces ? " ".repeat(n.options.tabSize) : "	").repeat(n.indentation), a = r ? 1 : 0, s = Math.max(e.end.line - e.start.line, a); return {
          newText: `${`
`.repeat(s)}${o}`, range: e
        }
      } fitIntoOptions(e, r, n) { return n.allowMore ? e = Math.max(r, e) : n.allowLess && (e = Math.min(r, e)), e } findFittingMove(e, r, n) { if (r.length === 0) return; if (r.length === 1) return r[0]; let i = e.end.line - e.start.line; for (let o of r) { if (o.lines !== void 0 && i <= o.lines) return o; if (o.lines === void 0 && i === 0) return o } return r[r.length - 1] } iterateCstTree(e, r) { let i = e.parseResult.value.$cstNode; return i ? new tc.TreeStreamImpl(i, o => this.iterateCst(o, r)) : tc.EMPTY_STREAM } iterateCst(e, r) { if (!(0, vy.isCompositeCstNode)(e)) return tc.EMPTY_STREAM; let n = r.indentation; return new tc.StreamImpl(() => ({ index: 0 }), i => i.index < e.children.length ? { done: !1, value: e.children[i.index++] } : (r.indentation = n, tc.DONE_RESULT)) }
    }; _n.AbstractFormatter = _y; var wd = class { constructor(e, r) { this.astNode = e, this.collector = r } node(e) { return new Tr(e.$cstNode ? [e.$cstNode] : [], this.collector) } nodes(...e) { let r = []; for (let n of e) n.$cstNode && r.push(n.$cstNode); return new Tr(r, this.collector) } property(e, r) { let n = (0, kd.findNodeForProperty)(this.astNode.$cstNode, e, r); return new Tr(n ? [n] : [], this.collector) } properties(...e) { let r = []; for (let n of e) { let i = (0, kd.findNodesForProperty)(this.astNode.$cstNode, n); r.push(...i) } return new Tr(r, this.collector) } keyword(e, r) { let n = (0, kd.findNodeForKeyword)(this.astNode.$cstNode, e, r); return new Tr(n ? [n] : [], this.collector) } keywords(...e) { let r = []; for (let n of e) { let i = (0, kd.findNodesForKeyword)(this.astNode.$cstNode, n); r.push(...i) } return new Tr(r, this.collector) } cst(e) { return new Tr([...e], this.collector) } interior(e, r) { let n = e.nodes, i = r.nodes; if (n.length !== 1 || i.length !== 1) return new Tr([], this.collector); let o = n[0], a = i[0]; if (o.offset > a.offset) { let s = o; o = a, a = s } return new Tr((0, lP.getInteriorNodes)(o, a), this.collector) } }; _n.DefaultNodeFormatter = wd; var Tr = class { constructor(e, r) { this.nodes = e, this.collector = r } prepend(e) { for (let r of this.nodes) this.collector(r, "prepend", e); return this } append(e) { for (let r of this.nodes) this.collector(r, "append", e); return this } surround(e) { for (let r of this.nodes) this.collector(r, "prepend", e), this.collector(r, "append", e); return this } slice(e, r) { return new Tr(this.nodes.slice(e, r), this.collector) } }; _n.FormattingRegion = Tr; var $B; (function (t) { function e(...l) { return { options: {}, moves: l.flatMap(d => d.moves).sort(c) } } t.fit = e; function r(l) { return i(0, l) } t.noSpace = r; function n(l) { return i(1, l) } t.oneSpace = n; function i(l, d) { return { options: d ?? {}, moves: [{ characters: l }] } } t.spaces = i; function o(l) { return a(1, l) } t.newLine = o; function a(l, d) { return { options: d ?? {}, moves: [{ lines: l }] } } t.newLines = a; function s(l) { return { options: l ?? {}, moves: [{ tabs: 1, lines: 1 }] } } t.indent = s; function u(l) { return { options: l ?? {}, moves: [{ tabs: 0 }] } } t.noIndent = u; function c(l, d) { var h, y, m, R, C, E; let A = (h = l.lines) !== null && h !== void 0 ? h : 0, b = (y = d.lines) !== null && y !== void 0 ? y : 0, O = (m = l.tabs) !== null && m !== void 0 ? m : 0, L = (R = d.tabs) !== null && R !== void 0 ? R : 0, W = (C = l.characters) !== null && C !== void 0 ? C : 0, Z = (E = d.characters) !== null && E !== void 0 ? E : 0; return A < b ? -1 : A > b ? 1 : O < L ? -1 : O > L ? 1 : W < Z ? -1 : W > Z ? 1 : 0 } })($B = _n.Formatting || (_n.Formatting = {}))
  }); var dP = f(Vn => { "use strict"; var FB = Vn && Vn.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), jB = Vn && Vn.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), UB = Vn && Vn.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && FB(e, t, r); return jB(e, t), e }; Object.defineProperty(Vn, "__esModule", { value: !0 }); Vn.LangiumGrammarFormatter = void 0; var Ee = Ty(), uo = UB(Se()), Ry = class extends Ee.AbstractFormatter { format(e) { if (uo.isCrossReference(e)) this.getNodeFormatter(e).properties("type", "terminal").surround(Ee.Formatting.noSpace()); else if (uo.isParserRule(e)) { let r = this.getNodeFormatter(e); r.keywords("entry", "fragment", "returns").append(Ee.Formatting.oneSpace()), (e.inferredType || e.returnType || e.dataType) && e.parameters.length === 0 ? r.property("name").append(Ee.Formatting.oneSpace()) : r.property("name").append(Ee.Formatting.noSpace()), r.properties("parameters").append(Ee.Formatting.noSpace()), r.keywords(",").append(Ee.Formatting.oneSpace()), r.keywords("<").append(Ee.Formatting.noSpace()); let n = r.keyword(";"), i = r.keyword(":"); i.prepend(Ee.Formatting.noSpace()), r.interior(i, n).prepend(Ee.Formatting.indent()), n.prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(), Ee.Formatting.newLine())), r.node(e).prepend(Ee.Formatting.noIndent()) } else if (uo.isTerminalRule(e)) { let r = this.getNodeFormatter(e); e.type && (r.property("name").append(Ee.Formatting.oneSpace()), r.keyword("returns").append(Ee.Formatting.oneSpace())), r.keywords("hidden", "terminal", "fragment").append(Ee.Formatting.oneSpace()), r.keyword(":").prepend(Ee.Formatting.noSpace()), r.keyword(";").prepend(Ee.Formatting.fit(Ee.Formatting.noSpace(), Ee.Formatting.newLine())), r.node(e).prepend(Ee.Formatting.noIndent()) } else if (uo.isAction(e)) { let r = this.getNodeFormatter(e); r.keyword("{").append(Ee.Formatting.noSpace()), r.keywords(".", "+=", "=").surround(Ee.Formatting.noSpace()), r.keyword("}").prepend(Ee.Formatting.noSpace()) } else if (uo.isInferredType(e)) this.getNodeFormatter(e).keywords("infer", "infers").append(Ee.Formatting.oneSpace()); else if (uo.isAssignment(e)) this.getNodeFormatter(e).keywords("=", "+=", "?=").surround(Ee.Formatting.noSpace()); else if (uo.isRuleCall(e)) { let r = this.getNodeFormatter(e); r.keyword("<").surround(Ee.Formatting.noSpace()), r.keyword(",").append(Ee.Formatting.oneSpace()), r.properties("arguments").append(Ee.Formatting.noSpace()) } uo.isAbstractElement(e) && this.getNodeFormatter(e).property("cardinality").prepend(Ee.Formatting.noSpace()) } }; Vn.LangiumGrammarFormatter = Ry }); var Id = f(Et => { "use strict"; Object.defineProperty(Et, "__esModule", { value: !0 }); Et.SemanticTokensDecoder = Et.AbstractSemanticTokenProvider = Et.SemanticTokensBuilder = Et.DefaultSemanticTokenOptions = Et.AllSemanticTokenModifiers = Et.AllSemanticTokenTypes = void 0; var fe = Oe(), Od = vt(), GB = be(), HB = _r(), WB = Le(); Et.AllSemanticTokenTypes = { [fe.SemanticTokenTypes.class]: 0, [fe.SemanticTokenTypes.comment]: 1, [fe.SemanticTokenTypes.enum]: 2, [fe.SemanticTokenTypes.enumMember]: 3, [fe.SemanticTokenTypes.event]: 4, [fe.SemanticTokenTypes.function]: 5, [fe.SemanticTokenTypes.interface]: 6, [fe.SemanticTokenTypes.keyword]: 7, [fe.SemanticTokenTypes.macro]: 8, [fe.SemanticTokenTypes.method]: 9, [fe.SemanticTokenTypes.modifier]: 10, [fe.SemanticTokenTypes.namespace]: 11, [fe.SemanticTokenTypes.number]: 12, [fe.SemanticTokenTypes.operator]: 13, [fe.SemanticTokenTypes.parameter]: 14, [fe.SemanticTokenTypes.property]: 15, [fe.SemanticTokenTypes.regexp]: 16, [fe.SemanticTokenTypes.string]: 17, [fe.SemanticTokenTypes.struct]: 18, [fe.SemanticTokenTypes.type]: 19, [fe.SemanticTokenTypes.typeParameter]: 20, [fe.SemanticTokenTypes.variable]: 21 }; Et.AllSemanticTokenModifiers = { [fe.SemanticTokenModifiers.abstract]: 1 << 0, [fe.SemanticTokenModifiers.async]: 1 << 1, [fe.SemanticTokenModifiers.declaration]: 1 << 2, [fe.SemanticTokenModifiers.defaultLibrary]: 1 << 3, [fe.SemanticTokenModifiers.definition]: 1 << 4, [fe.SemanticTokenModifiers.deprecated]: 1 << 5, [fe.SemanticTokenModifiers.documentation]: 1 << 6, [fe.SemanticTokenModifiers.modification]: 1 << 7, [fe.SemanticTokenModifiers.readonly]: 1 << 8, [fe.SemanticTokenModifiers.static]: 1 << 9 }; Et.DefaultSemanticTokenOptions = { legend: { tokenTypes: Object.keys(Et.AllSemanticTokenTypes), tokenModifiers: Object.keys(Et.AllSemanticTokenModifiers) }, full: { delta: !0 }, range: !0 }; var Dd = class extends fe.SemanticTokensBuilder { constructor() { super(...arguments), this._tokens = [] } push(e, r, n, i, o) { this._tokens.push({ line: e, char: r, length: n, tokenType: i, tokenModifiers: o }) } build() { return this.applyTokens(), super.build() } buildEdits() { return this.applyTokens(), super.buildEdits() } applyTokens() { for (let e of this._tokens.sort(this.compareTokens)) super.push(e.line, e.char, e.length, e.tokenType, e.tokenModifiers); this._tokens = [] } compareTokens(e, r) { return e.line === r.line ? e.char - r.char : e.line - r.line } }; Et.SemanticTokensBuilder = Dd; var by = class { constructor(e) { this.tokensBuilders = new Map, e.shared.workspace.TextDocuments.onDidClose(r => { this.tokensBuilders.delete(r.document.uri) }), e.shared.lsp.LanguageServer.onInitialize(r => { var n; this.initialize((n = r.capabilities.textDocument) === null || n === void 0 ? void 0 : n.semanticTokens) }) } initialize(e) { this.clientCapabilities = e } async semanticHighlight(e, r, n = fe.CancellationToken.None) { return this.currentRange = void 0, this.currentDocument = e, this.currentTokensBuilder = this.getDocumentTokensBuilder(e), await this.computeHighlighting(e, this.createAcceptor(), n), this.currentTokensBuilder.build() } async semanticHighlightRange(e, r, n = fe.CancellationToken.None) { return this.currentRange = r.range, this.currentDocument = e, this.currentTokensBuilder = this.getDocumentTokensBuilder(e), await this.computeHighlighting(e, this.createAcceptor(), n), this.currentTokensBuilder.build() } async semanticHighlightDelta(e, r, n = fe.CancellationToken.None) { return this.currentRange = void 0, this.currentDocument = e, this.currentTokensBuilder = this.getDocumentTokensBuilder(e), this.currentTokensBuilder.previousResult(r.previousResultId), await this.computeHighlighting(e, this.createAcceptor(), n), this.currentTokensBuilder.buildEdits() } createAcceptor() { return r => { "line" in r ? this.highlightToken({ range: { start: { line: r.line, character: r.char }, end: { line: r.line, character: r.char + r.length } }, type: r.type, modifier: r.modifier }) : "range" in r ? this.highlightToken(r) : "keyword" in r ? this.highlightKeyword(r) : "property" in r ? this.highlightProperty(r) : this.highlightNode({ node: r.cst, type: r.type, modifier: r.modifier }) } } getDocumentTokensBuilder(e) { let r = this.tokensBuilders.get(e.uri.toString()); if (r) return r; let n = new Dd; return this.tokensBuilders.set(e.uri.toString(), n), n } async computeHighlighting(e, r, n) { let i = e.parseResult.value, o = (0, GB.streamAst)(i, { range: this.currentRange }).iterator(), a; do if (a = o.next(), !a.done) { await (0, HB.interruptAndCheck)(n); let s = a.value; this.highlightElement(s, r) === "prune" && o.prune() } while (!a.done) } highlightToken(e) { var r; let { range: n, type: i } = e, o = e.modifier; if (this.currentRange && !(0, WB.inRange)(n, this.currentRange) || !this.currentDocument || !this.currentTokensBuilder) return; let a = Et.AllSemanticTokenTypes[i], s = 0; if (o !== void 0) { typeof o == "string" && (o = [o]); for (let l of o) { let d = Et.AllSemanticTokenModifiers[l]; s |= d } } let u = n.start.line, c = n.end.line; if (u === c) { let l = n.start.character, d = n.end.character - l; this.currentTokensBuilder.push(u, l, d, a, s) } else if (!((r = this.clientCapabilities) === null || r === void 0) && r.multilineTokenSupport) { let l = n.start.character, d = this.currentDocument.textDocument.offsetAt(n.start), h = this.currentDocument.textDocument.offsetAt(n.end); this.currentTokensBuilder.push(u, l, h - d, a, s) } else { let l = n.start, d = this.currentDocument.textDocument.offsetAt({ line: u + 1, character: 0 }); this.currentTokensBuilder.push(l.line, l.character, d - l.character - 1, a, s); for (let h = u + 1; h < c; h++) { let y = d; d = this.currentDocument.textDocument.offsetAt({ line: h + 1, character: 0 }), this.currentTokensBuilder.push(h, 0, d - y - 1, a, s) } this.currentTokensBuilder.push(c, 0, n.end.character, a, s) } } highlightProperty(e) { let r = []; if (typeof e.index == "number") { let o = (0, Od.findNodeForProperty)(e.node.$cstNode, e.property, e.index); o && r.push(o) } else r.push(...(0, Od.findNodesForProperty)(e.node.$cstNode, e.property)); let { type: n, modifier: i } = e; for (let o of r) this.highlightNode({ node: o, type: n, modifier: i }) } highlightKeyword(e) { let { node: r, keyword: n, type: i, index: o, modifier: a } = e, s = []; if (typeof o == "number") { let u = (0, Od.findNodeForKeyword)(r.$cstNode, n, o); u && s.push(u) } else s.push(...(0, Od.findNodesForKeyword)(r.$cstNode, n)); for (let u of s) this.highlightNode({ node: u, type: i, modifier: a }) } highlightNode(e) { let { node: r, type: n, modifier: i } = e, o = r.range; this.highlightToken({ range: o, type: n, modifier: i }) } }; Et.AbstractSemanticTokenProvider = by; var BB; (function (t) { function e(n, i) { let o = new Map; Object.entries(Et.AllSemanticTokenTypes).forEach(([u, c]) => o.set(c, u)); let a = 0, s = 0; return r(n.data, 5).map(u => { a += u[0], u[0] !== 0 && (s = 0), s += u[1]; let c = u[2]; return { offset: i.textDocument.offsetAt({ line: a, character: s }), tokenType: o.get(u[3]), tokenModifiers: u[4], text: i.textDocument.getText({ start: { line: a, character: s }, end: { line: a, character: s + c } }) } }) } t.decode = e; function r(n, i) { let o = []; for (let a = 0; a < n.length; a += i) { let s = n.slice(a, a + i); o.push(s) } return o } })(BB = Et.SemanticTokensDecoder || (Et.SemanticTokensDecoder = {})) }); var fP = f(xd => { "use strict"; Object.defineProperty(xd, "__esModule", { value: !0 }); xd.LangiumGrammarSemanticTokenProvider = void 0; var co = Oe(), KB = Id(), lo = Se(), Ay = class extends KB.AbstractSemanticTokenProvider { highlightElement(e, r) { var n; (0, lo.isAssignment)(e) ? r({ node: e, property: "feature", type: co.SemanticTokenTypes.property }) : (0, lo.isAction)(e) ? e.feature && r({ node: e, property: "feature", type: co.SemanticTokenTypes.property }) : (0, lo.isReturnType)(e) ? r({ node: e, property: "name", type: co.SemanticTokenTypes.type }) : (0, lo.isSimpleType)(e) ? (e.primitiveType || e.typeRef) && r({ node: e, property: e.primitiveType ? "primitiveType" : "typeRef", type: co.SemanticTokenTypes.type }) : (0, lo.isParameter)(e) ? r({ node: e, property: "name", type: co.SemanticTokenTypes.parameter }) : (0, lo.isParameterReference)(e) ? r({ node: e, property: "parameter", type: co.SemanticTokenTypes.parameter }) : (0, lo.isRuleCall)(e) ? !((n = e.rule.ref) === null || n === void 0) && n.fragment && r({ node: e, property: "rule", type: co.SemanticTokenTypes.type }) : (0, lo.isTypeAttribute)(e) && r({ node: e, property: "name", type: co.SemanticTokenTypes.property }) } }; xd.LangiumGrammarSemanticTokenProvider = Ay }); var hP = f(qd => { "use strict"; Object.defineProperty(qd, "__esModule", { value: !0 }); qd.LangiumGrammarNameProvider = void 0; var zB = Za(), VB = vt(), pP = Se(), Py = class extends zB.DefaultNameProvider { getName(e) { return (0, pP.isAssignment)(e) ? e.feature : super.getName(e) } getNameNode(e) { return (0, pP.isAssignment)(e) ? (0, VB.findNodeForProperty)(e.$cstNode, "feature") : super.getNameNode(e) } }; qd.LangiumGrammarNameProvider = Py }); var Md = f(Ld => { "use strict"; Object.defineProperty(Ld, "__esModule", { value: !0 }); Ld.DefaultReferences = void 0; var YB = vt(), mP = er(), XB = be(), gP = Le(), JB = Ft(), QB = Ci(), Sy = class { constructor(e) { this.nameProvider = e.references.NameProvider, this.index = e.shared.workspace.IndexManager, this.nodeLocator = e.workspace.AstNodeLocator } findDeclaration(e) { if (e) { let r = (0, YB.findAssignment)(e), n = e.element; if (r && n) { let i = n[r.feature]; if ((0, mP.isReference)(i)) return i.ref; if (Array.isArray(i)) { for (let o of i) if ((0, mP.isReference)(o) && o.$refNode && o.$refNode.offset <= e.offset && o.$refNode.end >= e.end) return o.ref } } if (n) { let i = this.nameProvider.getNameNode(n); if (i && (i === e || (0, gP.isCstChildNode)(e, i))) return n } } } findDeclarationNode(e) { let r = this.findDeclaration(e); if (r?.$cstNode) { let n = this.nameProvider.getNameNode(r); return n ?? r.$cstNode } } findReferences(e, r) { let n = []; if (r.includeDeclaration) { let o = this.getReferenceToSelf(e); o && n.push(o) } let i = this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e)); return r.documentUri && (i = i.filter(o => (0, QB.equalURI)(o.sourceUri, r.documentUri))), n.push(...i), (0, JB.stream)(n) } getReferenceToSelf(e) { let r = this.nameProvider.getNameNode(e); if (r) { let n = (0, XB.getDocument)(e), i = this.nodeLocator.getAstNodePath(e); return { sourceUri: n.uri, sourcePath: i, targetUri: n.uri, targetPath: i, segment: (0, gP.toDocumentSegment)(r), local: !0 } } } }; Ld.DefaultReferences = Sy }); var RP = f($d => { "use strict"; Object.defineProperty($d, "__esModule", { value: !0 }); $d.LangiumGrammarReferences = void 0; var ZB = Md(), Tn = be(), yP = Le(), vP = vt(), eK = Ft(), _P = Ci(), Rn = Se(), TP = jt(), Cy = Ja(), Ey = class extends ZB.DefaultReferences { constructor(e) { super(e), this.documents = e.shared.workspace.LangiumDocuments } findDeclaration(e) { let r = e.element, n = (0, vP.findAssignment)(e); if (n && n.feature === "feature") { if ((0, Rn.isAssignment)(r)) return this.findAssignmentDeclaration(r); if ((0, Rn.isAction)(r)) return this.findActionDeclaration(r) } return super.findDeclaration(e) } findReferences(e, r) { var n; return (0, Rn.isTypeAttribute)(e) ? this.findReferencesToTypeAttribute(e, (n = r.includeDeclaration) !== null && n !== void 0 ? n : !1) : super.findReferences(e, r) } findReferencesToTypeAttribute(e, r) { let n = [], i = (0, Tn.getContainerOfType)(e, Rn.isInterface); if (i) { if (r) { let s = this.getReferenceToSelf(e); s && n.push(s) } let o = (0, Cy.collectChildrenTypes)(i, this, this.documents, this.nodeLocator), a = []; o.forEach(s => { let u = this.findRulesWithReturnType(s); a.push(...u) }), a.forEach(s => { let u = this.createReferencesToAttribute(s, e); n.push(...u) }) } return (0, eK.stream)(n) } createReferencesToAttribute(e, r) { let n = []; if ((0, Rn.isParserRule)(e)) { let i = (0, TP.extractAssignments)(e.definition).find(o => o.feature === r.name); if (i?.$cstNode) { let o = this.nameProvider.getNameNode(i); o && n.push({ sourceUri: (0, Tn.getDocument)(i).uri, sourcePath: this.nodeLocator.getAstNodePath(i), targetUri: (0, Tn.getDocument)(r).uri, targetPath: this.nodeLocator.getAstNodePath(r), segment: (0, yP.toDocumentSegment)(o), local: (0, _P.equalURI)((0, Tn.getDocument)(i).uri, (0, Tn.getDocument)(r).uri) }) } } else { if (e.feature === r.name) { let o = (0, vP.findNodeForProperty)(e.$cstNode, "feature"); o && n.push({ sourceUri: (0, Tn.getDocument)(e).uri, sourcePath: this.nodeLocator.getAstNodePath(e), targetUri: (0, Tn.getDocument)(r).uri, targetPath: this.nodeLocator.getAstNodePath(r), segment: (0, yP.toDocumentSegment)(o), local: (0, _P.equalURI)((0, Tn.getDocument)(e).uri, (0, Tn.getDocument)(r).uri) }) } let i = (0, Tn.getContainerOfType)(e, Rn.isParserRule); n.push(...this.createReferencesToAttribute(i, r)) } return n } findAssignmentDeclaration(e) { var r; let n = (0, Tn.getContainerOfType)(e, Rn.isParserRule), i = (0, TP.getActionAtElement)(e); if (i) { let o = this.findActionDeclaration(i, e.feature); if (o) return o } if (!((r = n?.returnType) === null || r === void 0) && r.ref && ((0, Rn.isInterface)(n.returnType.ref) || (0, Rn.isType)(n.returnType.ref))) { let o = (0, Cy.collectSuperTypes)(n.returnType.ref); for (let a of o) { let s = a.attributes.find(u => u.name === e.feature); if (s) return s } } return e } findActionDeclaration(e, r) { var n; if (!((n = e.type) === null || n === void 0) && n.ref) { let i = r ?? e.feature, o = (0, Cy.collectSuperTypes)(e.type.ref); for (let a of o) { let s = a.attributes.find(u => u.name === i); if (s) return s } } } findRulesWithReturnType(e) { let r = []; return this.index.findAllReferences(e, this.nodeLocator.getAstNodePath(e)).forEach(i => { let o = this.documents.getOrCreateDocument(i.sourceUri), a = this.nodeLocator.getAstNode(o.parseResult.value, i.sourcePath); ((0, Rn.isParserRule)(a) || (0, Rn.isAction)(a)) && r.push(a) }), r } }; $d.LangiumGrammarReferences = Ey }); var wy = f(zr => { "use strict"; var tK = zr && zr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), rK = zr && zr.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), nK = zr && zr.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && tK(e, t, r); return rK(e, t), e }; Object.defineProperty(zr, "__esModule", { value: !0 }); zr.findFirstFeatures = zr.findNextFeatures = void 0; var rr = nK(Se()), Ei = jt(), iK = er(), oK = be(), aK = vt(); function sK(t, e) { let r = { stacks: t, tokens: e }; return uK(r), r.stacks.flat().forEach(i => { i.property = void 0 }), PP(r.stacks).map(i => i[i.length - 1]) } zr.findNextFeatures = sK; function Ny(t) { let { next: e, cardinalities: r, visited: n, plus: i } = t, o = [], a = e.feature; if (n.has(a)) return []; n.add(a); let s, u = a; for (; u.$container;)if (rr.isGroup(u.$container)) { s = u.$container; break } else if (rr.isAbstractElement(u.$container)) u = u.$container; else break; if ((0, Ei.isArrayCardinality)(u.cardinality)) { let c = ss({ next: { feature: u, type: e.type, new: !1 }, cardinalities: r, visited: n, plus: i }); for (let l of c) i.add(l.feature); o.push(...c) } if (s) { let c = s.elements.indexOf(u); c !== void 0 && c < s.elements.length - 1 && o.push(...AP({ feature: s, type: e.type, new: !1 }, c + 1, r, n, i)), o.every(l => (0, Ei.isOptionalCardinality)(l.feature.cardinality) || (0, Ei.isOptionalCardinality)(r.get(l.feature)) || i.has(l.feature)) && o.push(...Ny({ next: { feature: s, type: e.type, new: !1 }, cardinalities: r, visited: n, plus: i })) } return o } function bP(t) { return (0, iK.isAstNode)(t) && (t = { feature: t }), ss({ next: t, cardinalities: new Map, visited: new Set, plus: new Set }) } zr.findFirstFeatures = bP; function ss(t) { var e, r, n; let { next: i, cardinalities: o, visited: a, plus: s } = t; if (i === void 0) return []; let { feature: u, type: c } = i; if (rr.isGroup(u)) { if (a.has(u)) return []; a.add(u) } if (rr.isGroup(u)) return AP(i, 0, o, a, s).map(l => Fd(l, u.cardinality, o)); if (rr.isAlternatives(u) || rr.isUnorderedGroup(u)) return u.elements.flatMap(l => ss({ next: { feature: l, new: !1, type: c }, cardinalities: o, visited: a, plus: s })).map(l => Fd(l, u.cardinality, o)); if (rr.isAssignment(u)) { let l = { feature: u.terminal, new: !1, type: c, property: (e = i.property) !== null && e !== void 0 ? e : u.feature }; return ss({ next: l, cardinalities: o, visited: a, plus: s }).map(d => Fd(d, u.cardinality, o)) } else { if (rr.isAction(u)) return Ny({ next: { feature: u, new: !0, type: (0, Ei.getTypeName)(u), property: (r = i.property) !== null && r !== void 0 ? r : u.feature }, cardinalities: o, visited: a, plus: s }); if (rr.isRuleCall(u) && rr.isParserRule(u.rule.ref)) { let l = u.rule.ref, d = { feature: l.definition, new: !0, type: l.fragment ? void 0 : (n = (0, Ei.getExplicitRuleType)(l)) !== null && n !== void 0 ? n : l.name, property: i.property }; return ss({ next: d, cardinalities: o, visited: a, plus: s }).map(h => Fd(h, u.cardinality, o)) } else return [i] } } function Fd(t, e, r) { return r.set(t.feature, e), t } function AP(t, e, r, n, i) { var o; let a = [], s; for (; e < t.feature.elements.length && (s = { feature: t.feature.elements[e++], new: !1, type: t.type }, a.push(...ss({ next: s, cardinalities: r, visited: n, plus: i })), !!(0, Ei.isOptionalCardinality)((o = s.feature.cardinality) !== null && o !== void 0 ? o : r.get(s.feature)));); return a } function uK(t) { for (let e of t.tokens) { let r = PP(t.stacks, e); t.stacks = r } } function PP(t, e) { let r = []; for (let n of t) r.push(...cK(n, e)); return r } function cK(t, e) { let r = new Map, n = new Set(t.map(o => o.feature).filter(lK)), i = []; for (; t.length > 0;) { let o = t.pop(), a = Ny({ next: o, cardinalities: r, plus: n, visited: new Set }).filter(s => e ? ky(s.feature, e) : !0); for (let s of a) i.push([...t, s]); if (!a.every(s => (0, Ei.isOptionalCardinality)(s.feature.cardinality) || (0, Ei.isOptionalCardinality)(r.get(s.feature)))) break } return i } function lK(t) { if (t.cardinality === "+") return !0; let e = (0, oK.getContainerOfType)(t, rr.isAssignment); return !!(e && e.cardinality === "+") } function ky(t, e) { if (rr.isKeyword(t)) return t.value === e.image; if (rr.isRuleCall(t)) return dK(t.rule.ref, e); if (rr.isCrossReference(t)) { let r = (0, aK.getCrossReferenceTerminal)(t); if (r) return ky(r, e) } return !1 } function dK(t, e) { return rr.isParserRule(t) ? bP(t.definition).some(n => ky(n.feature, e)) : rr.isTerminalRule(t) ? new RegExp((0, Ei.terminalRegex)(t)).test(e.image) : !1 } }); var Ud = f(Vr => { "use strict"; var fK = Vr && Vr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), pK = Vr && Vr.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), hK = Vr && Vr.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && fK(e, t, r); return pK(e, t), e }; Object.defineProperty(Vr, "__esModule", { value: !0 }); Vr.DefaultCompletionProvider = Vr.mergeCompletionProviderOptions = void 0; var rc = Oe(), nc = hK(Se()), mK = jt(), gK = be(), SP = Le(), CP = vt(), Oy = Ft(), jd = wy(); function yK(t) { let e = Array.from(new Set(t.flatMap(n => { var i; return (i = n?.triggerCharacters) !== null && i !== void 0 ? i : [] }))), r = Array.from(new Set(t.flatMap(n => { var i; return (i = n?.allCommitCharacters) !== null && i !== void 0 ? i : [] }))); return { triggerCharacters: e.length > 0 ? e : void 0, allCommitCharacters: r.length > 0 ? r : void 0 } } Vr.mergeCompletionProviderOptions = yK; var Dy = class { constructor(e) { this.scopeProvider = e.references.ScopeProvider, this.grammar = e.Grammar, this.completionParser = e.parser.CompletionParser, this.nameProvider = e.references.NameProvider, this.grammarConfig = e.parser.GrammarConfig } async getCompletion(e, r) { var n, i; let a = e.parseResult.value.$cstNode; if (!a) return; let s = [], u = e.textDocument, c = u.getText(), l = u.offsetAt(r.position), d = L => { let W = this.fillCompletionItem(u, l, L); W && s.push(W) }, h = this.backtrackToAnyToken(c, l), y = (n = (0, SP.findLeafNodeAtOffset)(a, h)) === null || n === void 0 ? void 0 : n.element, m = { document: e, textDocument: u, node: y, offset: l, position: r.position }; if (!y) { let L = (0, CP.getEntryRule)(this.grammar); return await this.completionForRule(m, L, d), rc.CompletionList.create(this.deduplicateItems(s), !0) } let R = [m]; if (h === l && h > 0) { let L = (i = (0, SP.findLeafNodeAtOffset)(a, h - 1)) === null || i === void 0 ? void 0 : i.element; L !== y && R.push({ document: e, textDocument: u, node: L, offset: l, position: r.position }) } let C = this.backtrackToTokenStart(c, l), E = this.findFeaturesAt(u, C), A = [], b = this.canReparse() && l !== C; b && (A = this.findFeaturesAt(u, l)); let O = L => nc.isKeyword(L.feature) ? L.feature.value : L.feature; return await Promise.all((0, Oy.stream)(E).distinct(O).map(L => this.completionForContexts(R, L, d))), b && await Promise.all((0, Oy.stream)(A).exclude(E, O).distinct(O).map(L => this.completionForContexts(R, L, d))), rc.CompletionList.create(this.deduplicateItems(s), !0) } deduplicateItems(e) { return (0, Oy.stream)(e).distinct(r => `${r.kind}_${r.label}_${r.detail}`).toArray() } canReparse() { return !1 } findFeaturesAt(e, r) { let n = e.getText({ start: rc.Position.create(0, 0), end: e.positionAt(r) }), i = this.completionParser.parse(n), o = i.tokens; if (i.tokenIndex === 0) { let u = (0, CP.getEntryRule)(this.grammar), c = (0, jd.findFirstFeatures)({ feature: u.definition, new: !0, type: (0, mK.getExplicitRuleType)(u) }); return o.length > 0 ? (o.shift(), (0, jd.findNextFeatures)(c.map(l => [l]), o)) : c } let a = [...o].splice(i.tokenIndex); return (0, jd.findNextFeatures)([i.elementStack.map(u => ({ feature: u }))], a) } backtrackToAnyToken(e, r) { for (r >= e.length && (r = e.length - 1); r > 0 && /\s/.test(e.charAt(r));)r--; return r } backtrackToTokenStart(e, r) { if (r < 1) return r; let n = this.grammarConfig.nameRegexp, i = e.charAt(r - 1); for (; r > 0 && n.test(i);)r--, i = e.charAt(r - 1); return r } async completionForRule(e, r, n) { if (nc.isParserRule(r)) { let i = (0, jd.findFirstFeatures)(r.definition); await Promise.all(i.map(o => this.completionFor(e, o, n))) } } async completionForContexts(e, r, n) { for (let i of e) await this.completionFor(i, r, n) } completionFor(e, r, n) { if (nc.isKeyword(r.feature)) return this.completionForKeyword(e, r.feature, n); if (nc.isCrossReference(r.feature) && e.node) return this.completionForCrossReference(e, r, n) } completionForCrossReference(e, r, n) { let i = (0, gK.getContainerOfType)(r.feature, nc.isAssignment), o = e.node; if (i && o) { if (r.type && (r.new || o.$type !== r.type) && (o = { $type: r.type, $container: o, $containerProperty: r.property }), !e) return; let a = { reference: {}, container: o, property: i.feature }; try { let s = this.scopeProvider.getScope(a), u = new Set; s.getAllElements().forEach(c => { !u.has(c.name) && this.filterCrossReference(c) && (n(this.createReferenceCompletionItem(c)), u.add(c.name)) }) } catch (s) { console.error(s) } } } createReferenceCompletionItem(e) { return { nodeDescription: e, kind: rc.CompletionItemKind.Reference, detail: e.type, sortText: "0" } } filterCrossReference(e) { return !0 } completionForKeyword(e, r, n) { r.value.match(/[\w]/) && n({ label: r.value, kind: rc.CompletionItemKind.Keyword, detail: "Keyword", sortText: "1" }) } fillCompletionItem(e, r, n) { var i, o; let a; if (typeof n.label == "string") a = n.label; else if ("node" in n) { let l = this.nameProvider.getName(n.node); if (!l) return; a = l } else if ("nodeDescription" in n) a = n.nodeDescription.name; else return; let s; typeof ((i = n.textEdit) === null || i === void 0 ? void 0 : i.newText) == "string" ? s = n.textEdit.newText : typeof n.insertText == "string" ? s = n.insertText : s = a; let u = (o = n.textEdit) !== null && o !== void 0 ? o : this.buildCompletionTextEdit(e, r, a, s); return u ? { additionalTextEdits: n.additionalTextEdits, command: n.command, commitCharacters: n.commitCharacters, data: n.data, detail: n.detail, documentation: n.documentation, filterText: n.filterText, insertText: n.insertText, insertTextFormat: n.insertTextFormat, insertTextMode: n.insertTextMode, kind: n.kind, labelDetails: n.labelDetails, preselect: n.preselect, sortText: n.sortText, tags: n.tags, textEditText: n.textEditText, textEdit: u, label: a } : void 0 } buildCompletionTextEdit(e, r, n, i) { let o = e.getText(), a = this.backtrackToTokenStart(o, r), s = o.substring(a, r); if (this.charactersFuzzyMatch(s, n)) { let u = e.positionAt(a), c = e.positionAt(r); return { newText: i, range: { start: u, end: c } } } else return } isWordCharacterAt(e, r) { return this.grammarConfig.nameRegexp.test(e.charAt(r)) } charactersFuzzyMatch(e, r) { if (e.length === 0) return !0; r = r.toLowerCase(); let n = !1, i, o = 0, a = r.length; for (let s = 0; s < a; s++) { let u = r.charCodeAt(s), c = e.charCodeAt(o); if ((u === c || this.toUpperCharCode(u) === this.toUpperCharCode(c)) && (n || (n = i === void 0 || this.isWordTransition(i, u)), n && o++, o === e.length)) return !0; i = u } return !1 } isWordTransition(e, r) { return EP <= e && e <= NP && vK <= r && r <= _K || e === kP && r !== kP } toUpperCharCode(e) { return EP <= e && e <= NP ? e - 32 : e } }; Vr.DefaultCompletionProvider = Dy; var EP = "a".charCodeAt(0), NP = "z".charCodeAt(0), vK = "A".charCodeAt(0), _K = "Z".charCodeAt(0), kP = "_".charCodeAt(0) }); var qy = f(Gd => { "use strict"; Object.defineProperty(Gd, "__esModule", { value: !0 }); Gd.AbstractCallHierarchyProvider = void 0; var TK = Oe(), wP = gn(), Iy = Le(), xy = class { constructor(e) { this.grammarConfig = e.parser.GrammarConfig, this.nameProvider = e.references.NameProvider, this.documents = e.shared.workspace.LangiumDocuments, this.references = e.references.References } prepareCallHierarchy(e, r) { let n = e.parseResult.value, i = (0, Iy.findDeclarationNodeAtOffset)(n.$cstNode, e.textDocument.offsetAt(r.position), this.grammarConfig.nameRegexp); if (!i) return; let o = this.references.findDeclarationNode(i); if (o) return this.getCallHierarchyItems(o.element, e) } getCallHierarchyItems(e, r) { let n = this.nameProvider.getNameNode(e), i = this.nameProvider.getName(e); if (!(!n || !e.$cstNode || i === void 0)) return [Object.assign({ kind: TK.SymbolKind.Method, name: i, range: e.$cstNode.range, selectionRange: n.range, uri: r.uri.toString() }, this.getCallHierarchyItem(e))] } getCallHierarchyItem(e) { } incomingCalls(e) { let r = this.documents.getOrCreateDocument(wP.URI.parse(e.item.uri)), n = r.parseResult.value, i = (0, Iy.findDeclarationNodeAtOffset)(n.$cstNode, r.textDocument.offsetAt(e.item.range.start), this.grammarConfig.nameRegexp); if (!i) return; let o = this.references.findReferences(i.element, { includeDeclaration: !1 }); return this.getIncomingCalls(i.element, o) } outgoingCalls(e) { let r = this.documents.getOrCreateDocument(wP.URI.parse(e.item.uri)), n = r.parseResult.value, i = (0, Iy.findDeclarationNodeAtOffset)(n.$cstNode, r.textDocument.offsetAt(e.item.range.start), this.grammarConfig.nameRegexp); if (i) return this.getOutgoingCalls(i.element) } }; Gd.AbstractCallHierarchyProvider = xy }); var DP = f(OP => { "use strict"; Object.defineProperty(OP, "__esModule", { value: !0 }) }); var xP = f(IP => { "use strict"; Object.defineProperty(IP, "__esModule", { value: !0 }) }); var LP = f(qP => { "use strict"; Object.defineProperty(qP, "__esModule", { value: !0 }) }); var My = f(Hd => { "use strict"; Object.defineProperty(Hd, "__esModule", { value: !0 }); Hd.DefaultDefinitionProvider = void 0; var RK = Oe(), bK = be(), AK = Le(), Ly = class { constructor(e) { this.nameProvider = e.references.NameProvider, this.references = e.references.References, this.grammarConfig = e.parser.GrammarConfig } getDefinition(e, r) { let n = e.parseResult.value; if (n.$cstNode) { let i = n.$cstNode, o = (0, AK.findDeclarationNodeAtOffset)(i, e.textDocument.offsetAt(r.position), this.grammarConfig.nameRegexp); if (o) return this.collectLocationLinks(o, r) } } collectLocationLinks(e, r) { var n; let i = this.findLink(e); if (i) return [RK.LocationLink.create(i.targetDocument.textDocument.uri, ((n = i.target.element.$cstNode) !== null && n !== void 0 ? n : i.target).range, i.target.range, i.source.range)] } findLink(e) { let r = this.references.findDeclarationNode(e); if (r?.element) { let n = (0, bK.getDocument)(r.element); if (r && n) return { source: e, target: r, targetDocument: n } } } }; Hd.DefaultDefinitionProvider = Ly }); var Fy = f(Wd => { "use strict"; Object.defineProperty(Wd, "__esModule", { value: !0 }); Wd.DefaultDocumentHighlightProvider = void 0; var PK = Oe(), SK = be(), CK = Le(), EK = Ci(), $y = class { constructor(e) { this.references = e.references.References, this.nameProvider = e.references.NameProvider, this.grammarConfig = e.parser.GrammarConfig } getDocumentHighlight(e, r) { let n = e.parseResult.value.$cstNode; if (!n) return; let i = (0, CK.findDeclarationNodeAtOffset)(n, e.textDocument.offsetAt(r.position), this.grammarConfig.nameRegexp); if (!i) return; let o = this.references.findDeclaration(i); if (o) { let a = (0, EK.equalURI)((0, SK.getDocument)(o).uri, e.uri), s = { documentUri: e.uri, includeDeclaration: a }; return this.references.findReferences(o, s).map(c => this.createDocumentHighlight(c)).toArray() } } createDocumentHighlight(e) { return PK.DocumentHighlight.create(e.segment.range) } }; Wd.DefaultDocumentHighlightProvider = $y }); var $P = f(MP => { "use strict"; Object.defineProperty(MP, "__esModule", { value: !0 }) }); var Uy = f(Bd => { "use strict"; Object.defineProperty(Bd, "__esModule", { value: !0 }); Bd.DefaultDocumentSymbolProvider = void 0; var NK = Oe(), kK = be(), jy = class { constructor(e) { this.nameProvider = e.references.NameProvider } getSymbols(e) { return this.getSymbol(e, e.parseResult.value) } getSymbol(e, r) { let n = r.$cstNode, i = this.nameProvider.getNameNode(r); if (i && n) { let o = this.nameProvider.getName(r); return [{ kind: this.getSymbolKind(r.$type), name: o ?? i.text, range: n.range, selectionRange: i.range, children: this.getChildSymbols(e, r) }] } else return this.getChildSymbols(e, r) || [] } getChildSymbols(e, r) { let n = []; for (let i of (0, kK.streamContents)(r)) { let o = this.getSymbol(e, i); n.push(...o) } if (n.length > 0) return n } getSymbolKind(e) { return NK.SymbolKind.Field } }; Bd.DefaultDocumentSymbolProvider = jy }); var FP = f(Kd => { "use strict"; Object.defineProperty(Kd, "__esModule", { value: !0 }); Kd.AbstractExecuteCommandHandler = void 0; var wK = Oe(), Gy = class { get commands() { return Array.from(this.registeredCommands.keys()) } constructor() { this.registeredCommands = new Map, this.registerCommands(this.createCommandAcceptor()) } async executeCommand(e, r, n = wK.CancellationToken.None) { let i = this.registeredCommands.get(e); if (i) return i(r, n) } createCommandAcceptor() { return (e, r) => this.registeredCommands.set(e, r) } }; Kd.AbstractExecuteCommandHandler = Gy }); var Wy = f(us => { "use strict"; Object.defineProperty(us, "__esModule", { value: !0 }); us.MultilineCommentHoverProvider = us.AstNodeHoverProvider = void 0; var OK = Le(), zd = class { constructor(e) { this.references = e.references.References, this.grammarConfig = e.parser.GrammarConfig } getHoverContent(e, r) { var n, i; let o = (i = (n = e.parseResult) === null || n === void 0 ? void 0 : n.value) === null || i === void 0 ? void 0 : i.$cstNode; if (o) { let a = e.textDocument.offsetAt(r.position), s = (0, OK.findDeclarationNodeAtOffset)(o, a, this.grammarConfig.nameRegexp); if (s && s.offset + s.length > a) { let u = this.references.findDeclaration(s); if (u) return this.getAstNodeHoverContent(u) } } } }; us.AstNodeHoverProvider = zd; var Hy = class extends zd { constructor(e) { super(e), this.documentationProvider = e.documentation.DocumentationProvider } getAstNodeHoverContent(e) { let r = this.documentationProvider.getDocumentation(e); if (r) return { contents: { kind: "markdown", value: r } } } }; us.MultilineCommentHoverProvider = Hy }); var jP = f(Vd => { "use strict"; Object.defineProperty(Vd, "__esModule", { value: !0 }); Vd.AbstractGoToImplementationProvider = void 0; var DK = Oe(), IK = Le(), By = class { constructor(e) { this.references = e.references.References, this.grammarConfig = e.parser.GrammarConfig } getImplementation(e, r, n = DK.CancellationToken.None) { let i = e.parseResult.value; if (i.$cstNode) { let o = (0, IK.findDeclarationNodeAtOffset)(i.$cstNode, e.textDocument.offsetAt(r.position), this.grammarConfig.nameRegexp); if (o) { let a = this.references.findDeclaration(o); if (a) return this.collectGoToImplementationLocationLinks(a, n) } } } }; Vd.AbstractGoToImplementationProvider = By }); var UP = f(Yd => { "use strict"; Object.defineProperty(Yd, "__esModule", { value: !0 }); Yd.AbstractInlayHintProvider = void 0; var xK = Oe(), qK = be(), LK = _r(), Ky = class { async getInlayHints(e, r, n = xK.CancellationToken.None) { let i = e.parseResult.value, o = [], a = s => o.push(s); for (let s of (0, qK.streamAst)(i, { range: r.range })) await (0, LK.interruptAndCheck)(n), this.computeInlayHint(s, a); return o } }; Yd.AbstractInlayHintProvider = Ky }); var fo = f(Ni => { "use strict"; Object.defineProperty(Ni, "__esModule", { value: !0 }); Ni.DefaultLangiumDocuments = Ni.DefaultLangiumDocumentFactory = Ni.DocumentState = void 0; var MK = Jm(), $K = gn(), FK = Ft(), cs; (function (t) { t[t.Changed = 0] = "Changed", t[t.Parsed = 1] = "Parsed", t[t.IndexedContent = 2] = "IndexedContent", t[t.ComputedScopes = 3] = "ComputedScopes", t[t.Linked = 4] = "Linked", t[t.IndexedReferences = 5] = "IndexedReferences", t[t.Validated = 6] = "Validated" })(cs = Ni.DocumentState || (Ni.DocumentState = {})); var zy = class { constructor(e) { this.serviceRegistry = e.ServiceRegistry, this.textDocuments = e.workspace.TextDocuments, this.fileSystemProvider = e.workspace.FileSystemProvider } fromTextDocument(e, r) { return this.create(r ?? $K.URI.parse(e.uri), e) } fromString(e, r) { return this.create(r, e) } fromModel(e, r) { return this.create(r, { $model: e }) } create(e, r) { if (r ?? (r = this.textDocuments.get(e.toString())), r ?? (r = this.getContentFromFileSystem(e)), typeof r == "string") { let n = this.parse(e, r); return this.createLangiumDocument(n, e, void 0, r) } else if ("$model" in r) { let n = { value: r.$model, parserErrors: [], lexerErrors: [] }; return this.createLangiumDocument(n, e) } else { let n = this.parse(e, r.getText()); return this.createLangiumDocument(n, e, r) } } createLangiumDocument(e, r, n, i) { let o; if (n) o = { parseResult: e, uri: r, state: cs.Parsed, references: [], textDocument: n }; else { let a = this.createTextDocumentGetter(r, i); o = { parseResult: e, uri: r, state: cs.Parsed, references: [], get textDocument() { return a() } } } return e.value.$document = o, o } update(e) { let r = this.textDocuments.get(e.uri.toString()), n = r ? r.getText() : this.getContentFromFileSystem(e.uri); if (r) Object.defineProperty(e, "textDocument", { value: r }); else { let i = this.createTextDocumentGetter(e.uri, n); Object.defineProperty(e, "textDocument", { get: i }) } return e.parseResult = this.parse(e.uri, n), e.parseResult.value.$document = e, e.state = cs.Parsed, e } getContentFromFileSystem(e) { return this.fileSystemProvider.readFileSync(e) } parse(e, r) { return this.serviceRegistry.getServices(e).parser.LangiumParser.parse(r) } createTextDocumentGetter(e, r) { let n = this.serviceRegistry, i; return () => i ?? (i = MK.TextDocument.create(e.toString(), n.getServices(e).LanguageMetaData.languageId, 0, r ?? "")) } }; Ni.DefaultLangiumDocumentFactory = zy; var Vy = class { constructor(e) { this.documentMap = new Map, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory } get all() { return (0, FK.stream)(this.documentMap.values()) } addDocument(e) { let r = e.uri.toString(); if (this.documentMap.has(r)) throw new Error(`A document with the URI '${r}' is already present.`); this.documentMap.set(r, e) } getOrCreateDocument(e) { let r = e.toString(), n = this.documentMap.get(r); return n || (n = this.langiumDocumentFactory.create(e), this.documentMap.set(r, n), n) } hasDocument(e) { return this.documentMap.has(e.toString()) } invalidateDocument(e) { let r = e.toString(), n = this.documentMap.get(r); return n && (n.state = cs.Changed, n.references = [], n.precomputedScopes = void 0, n.diagnostics = []), n } deleteDocument(e) { let r = e.toString(), n = this.documentMap.get(r); return n && (n.state = cs.Changed, this.documentMap.delete(r)), n } }; Ni.DefaultLangiumDocuments = Vy }); var Xy = f(ls => { "use strict"; Object.defineProperty(ls, "__esModule", { value: !0 }); ls.mergeSignatureHelpOptions = ls.AbstractSignatureHelpProvider = void 0; var jK = Oe(), UK = Le(), Yy = class { provideSignatureHelp(e, r, n = jK.CancellationToken.None) { let o = e.parseResult.value.$cstNode; if (o) { let a = (0, UK.findLeafNodeAtOffset)(o, e.textDocument.offsetAt(r.position)); if (a) return this.getSignatureFromElement(a.element, n) } } get signatureHelpOptions() { return { triggerCharacters: ["("], retriggerCharacters: [","] } } }; ls.AbstractSignatureHelpProvider = Yy; function GK(t) { let e = [], r = []; t.forEach(i => { i?.triggerCharacters && e.push(...i.triggerCharacters), i?.retriggerCharacters && r.push(...i.retriggerCharacters) }); let n = { triggerCharacters: e.length > 0 ? Array.from(new Set(e)).sort() : void 0, retriggerCharacters: r.length > 0 ? Array.from(new Set(r)).sort() : void 0 }; return n.triggerCharacters ? n : void 0 } ls.mergeSignatureHelpOptions = GK }); var Zy = f(X => { "use strict"; Object.defineProperty(X, "__esModule", { value: !0 }); X.createRequestHandler = X.createServerRequestHandler = X.createCallHierarchyRequestHandler = X.addCallHierarchyHandler = X.addCodeLensHandler = X.addSignatureHelpHandler = X.addDocumentLinkHandler = X.addExecuteCommandHandler = X.addConfigurationChangeHandler = X.addSemanticTokenHandler = X.addInlayHintHandler = X.addRenameHandler = X.addFormattingHandler = X.addFoldingRangeHandler = X.addHoverHandler = X.addDocumentHighlightsHandler = X.addGoToDeclarationHandler = X.addGoToImplementationHandler = X.addGoToTypeDefinitionHandler = X.addGotoDefinitionHandler = X.addDocumentSymbolHandler = X.addCodeActionHandler = X.addFindReferencesHandler = X.addCompletionHandler = X.addDiagnosticsHandler = X.addDocumentsHandler = X.startLanguageServer = X.DefaultLanguageServer = void 0; var Qo = Oe(), ic = gn(), GP = Gu(), HK = _r(), WK = fo(), BK = Ud(), KK = Id(), zK = Xy(), Jy = class { constructor(e) { this.onInitializeEmitter = new Qo.Emitter, this.onInitializedEmitter = new Qo.Emitter, this.services = e } get onInitialize() { return this.onInitializeEmitter.event } get onInitialized() { return this.onInitializedEmitter.event } async initialize(e) { return this.eagerLoadServices(), this.onInitializeEmitter.fire(e), this.onInitializeEmitter.dispose(), this.buildInitializeResult(e) } eagerLoadServices() { (0, GP.eagerLoad)(this.services), this.services.ServiceRegistry.all.forEach(e => (0, GP.eagerLoad)(e)) } hasService(e) { return this.services.ServiceRegistry.all.some(r => e(r) !== void 0) } buildInitializeResult(e) { var r; let n = this.services.ServiceRegistry.all, i = this.hasService(K => K.lsp.Formatter), o = n.map(K => { var le; return (le = K.lsp.Formatter) === null || le === void 0 ? void 0 : le.formatOnTypeOptions }).find(K => Boolean(K)), a = this.hasService(K => K.lsp.CodeActionProvider), s = this.hasService(K => K.lsp.SemanticTokenProvider), u = (r = this.services.lsp.ExecuteCommandHandler) === null || r === void 0 ? void 0 : r.commands, c = this.services.lsp.DocumentLinkProvider, l = (0, zK.mergeSignatureHelpOptions)(n.map(K => { var le; return (le = K.lsp.SignatureHelp) === null || le === void 0 ? void 0 : le.signatureHelpOptions })), d = this.hasService(K => K.lsp.TypeProvider), h = this.hasService(K => K.lsp.ImplementationProvider), y = this.hasService(K => K.lsp.CompletionProvider), m = (0, BK.mergeCompletionProviderOptions)(n.map(K => { var le; return (le = K.lsp.CompletionProvider) === null || le === void 0 ? void 0 : le.completionOptions })), R = this.hasService(K => K.lsp.ReferencesProvider), C = this.hasService(K => K.lsp.DocumentSymbolProvider), E = this.hasService(K => K.lsp.DefinitionProvider), A = this.hasService(K => K.lsp.DocumentHighlightProvider), b = this.hasService(K => K.lsp.FoldingRangeProvider), O = this.hasService(K => K.lsp.HoverProvider), L = this.hasService(K => K.lsp.RenameProvider), W = this.hasService(K => K.lsp.CallHierarchyProvider), Z = this.services.lsp.CodeLensProvider, ke = this.hasService(K => K.lsp.DeclarationProvider), we = this.services.lsp.InlayHintProvider; return { capabilities: { workspace: { workspaceFolders: { supported: !0 } }, executeCommandProvider: u && { commands: u }, textDocumentSync: Qo.TextDocumentSyncKind.Incremental, completionProvider: y ? m : void 0, referencesProvider: R, documentSymbolProvider: C, definitionProvider: E, typeDefinitionProvider: d, documentHighlightProvider: A, codeActionProvider: a, documentFormattingProvider: i, documentRangeFormattingProvider: i, documentOnTypeFormattingProvider: o, foldingRangeProvider: b, hoverProvider: O, renameProvider: L ? { prepareProvider: !0 } : void 0, semanticTokensProvider: s ? KK.DefaultSemanticTokenOptions : void 0, signatureHelpProvider: l, implementationProvider: h, callHierarchyProvider: W ? {} : void 0, documentLinkProvider: c ? { resolveProvider: Boolean(c.resolveDocumentLink) } : void 0, codeLensProvider: Z ? { resolveProvider: Boolean(Z.resolveCodeLens) } : void 0, declarationProvider: ke, inlayHintProvider: we ? { resolveProvider: Boolean(we.resolveInlayHint) } : void 0 } } } async initialized(e) { this.onInitializedEmitter.fire(e), this.onInitializedEmitter.dispose() } }; X.DefaultLanguageServer = Jy; function VK(t) { let e = t.lsp.Connection; if (!e) throw new Error("Starting a language server requires the languageServer.Connection service to be set."); HP(e, t), WP(e, t), BP(e, t), KP(e, t), VP(e, t), YP(e, t), XP(e, t), JP(e, t), ZP(e, t), tS(e, t), rS(e, t), zP(e, t), nS(e, t), eS(e, t), iS(e, t), oS(e, t), sS(e, t), cS(e, t), dS(e, t), lS(e, t), uS(e, t), aS(e, t), QP(e, t), e.onInitialize(n => t.lsp.LanguageServer.initialize(n)), e.onInitialized(n => t.lsp.LanguageServer.initialized(n)), t.workspace.TextDocuments.listen(e), e.listen() } X.startLanguageServer = VK; function HP(t, e) { let r = e.workspace.DocumentBuilder, n = e.workspace.MutexLock; function i(a, s) { n.lock(u => r.update(a, s, u)) } e.workspace.TextDocuments.onDidChangeContent(a => { i([ic.URI.parse(a.document.uri)], []) }), t.onDidChangeWatchedFiles(a => { let s = [], u = []; for (let c of a.changes) { let l = ic.URI.parse(c.uri); c.type === Qo.FileChangeType.Deleted ? u.push(l) : s.push(l) } i(s, u) }) } X.addDocumentsHandler = HP; function WP(t, e) { e.workspace.DocumentBuilder.onBuildPhase(WK.DocumentState.Validated, async (n, i) => { for (let o of n) if (o.diagnostics && t.sendDiagnostics({ uri: o.uri.toString(), diagnostics: o.diagnostics }), i.isCancellationRequested) return }) } X.addDiagnosticsHandler = WP; function BP(t, e) { t.onCompletion(Yt((r, n, i, o) => { var a; return (a = r.lsp.CompletionProvider) === null || a === void 0 ? void 0 : a.getCompletion(n, i, o) }, e)) } X.addCompletionHandler = BP; function KP(t, e) { t.onReferences(Yt((r, n, i, o) => { var a; return (a = r.lsp.ReferencesProvider) === null || a === void 0 ? void 0 : a.findReferences(n, i, o) }, e)) } X.addFindReferencesHandler = KP; function zP(t, e) { t.onCodeAction(Yt((r, n, i, o) => { var a; return (a = r.lsp.CodeActionProvider) === null || a === void 0 ? void 0 : a.getCodeActions(n, i, o) }, e)) } X.addCodeActionHandler = zP; function VP(t, e) { t.onDocumentSymbol(Yt((r, n, i, o) => { var a; return (a = r.lsp.DocumentSymbolProvider) === null || a === void 0 ? void 0 : a.getSymbols(n, i, o) }, e)) } X.addDocumentSymbolHandler = VP; function YP(t, e) { t.onDefinition(Yt((r, n, i, o) => { var a; return (a = r.lsp.DefinitionProvider) === null || a === void 0 ? void 0 : a.getDefinition(n, i, o) }, e)) } X.addGotoDefinitionHandler = YP; function XP(t, e) { t.onTypeDefinition(Yt((r, n, i, o) => { var a; return (a = r.lsp.TypeProvider) === null || a === void 0 ? void 0 : a.getTypeDefinition(n, i, o) }, e)) } X.addGoToTypeDefinitionHandler = XP; function JP(t, e) { t.onImplementation(Yt((r, n, i, o) => { var a; return (a = r.lsp.ImplementationProvider) === null || a === void 0 ? void 0 : a.getImplementation(n, i, o) }, e)) } X.addGoToImplementationHandler = JP; function QP(t, e) { t.onDeclaration(Yt((r, n, i, o) => { var a; return (a = r.lsp.DeclarationProvider) === null || a === void 0 ? void 0 : a.getDeclaration(n, i, o) }, e)) } X.addGoToDeclarationHandler = QP; function ZP(t, e) { t.onDocumentHighlight(Yt((r, n, i, o) => { var a; return (a = r.lsp.DocumentHighlightProvider) === null || a === void 0 ? void 0 : a.getDocumentHighlight(n, i, o) }, e)) } X.addDocumentHighlightsHandler = ZP; function eS(t, e) { t.onHover(Yt((r, n, i, o) => { var a; return (a = r.lsp.HoverProvider) === null || a === void 0 ? void 0 : a.getHoverContent(n, i, o) }, e)) } X.addHoverHandler = eS; function tS(t, e) { t.onFoldingRanges(Yt((r, n, i, o) => { var a; return (a = r.lsp.FoldingRangeProvider) === null || a === void 0 ? void 0 : a.getFoldingRanges(n, i, o) }, e)) } X.addFoldingRangeHandler = tS; function rS(t, e) { t.onDocumentFormatting(Yt((r, n, i, o) => { var a; return (a = r.lsp.Formatter) === null || a === void 0 ? void 0 : a.formatDocument(n, i, o) }, e)), t.onDocumentRangeFormatting(Yt((r, n, i, o) => { var a; return (a = r.lsp.Formatter) === null || a === void 0 ? void 0 : a.formatDocumentRange(n, i, o) }, e)), t.onDocumentOnTypeFormatting(Yt((r, n, i, o) => { var a; return (a = r.lsp.Formatter) === null || a === void 0 ? void 0 : a.formatDocumentOnType(n, i, o) }, e)) } X.addFormattingHandler = rS; function nS(t, e) { t.onRenameRequest(Yt((r, n, i, o) => { var a; return (a = r.lsp.RenameProvider) === null || a === void 0 ? void 0 : a.rename(n, i, o) }, e)), t.onPrepareRename(Yt((r, n, i, o) => { var a; return (a = r.lsp.RenameProvider) === null || a === void 0 ? void 0 : a.prepareRename(n, i, o) }, e)) } X.addRenameHandler = nS; function iS(t, e) { var r; let n = e.lsp.InlayHintProvider; if (n) { t.languages.inlayHint.on(ki((o, a, s, u) => n.getInlayHints(a, s, u), e)); let i = (r = n.resolveInlayHint) === null || r === void 0 ? void 0 : r.bind(n); i && t.languages.inlayHint.resolve(async (o, a) => { try { return await i(o, a) } catch (s) { return Zo(s) } }) } } X.addInlayHintHandler = iS; function oS(t, e) { let r = { data: [] }; t.languages.semanticTokens.on(ki((n, i, o, a) => n.lsp.SemanticTokenProvider ? n.lsp.SemanticTokenProvider.semanticHighlight(i, o, a) : r, e)), t.languages.semanticTokens.onDelta(ki((n, i, o, a) => n.lsp.SemanticTokenProvider ? n.lsp.SemanticTokenProvider.semanticHighlightDelta(i, o, a) : r, e)), t.languages.semanticTokens.onRange(ki((n, i, o, a) => n.lsp.SemanticTokenProvider ? n.lsp.SemanticTokenProvider.semanticHighlightRange(i, o, a) : r, e)) } X.addSemanticTokenHandler = oS; function aS(t, e) { t.onDidChangeConfiguration(r => { r.settings && e.workspace.ConfigurationProvider.updateConfiguration(r) }) } X.addConfigurationChangeHandler = aS; function sS(t, e) { let r = e.lsp.ExecuteCommandHandler; r && t.onExecuteCommand(async (n, i) => { var o; try { return await r.executeCommand(n.command, (o = n.arguments) !== null && o !== void 0 ? o : [], i) } catch (a) { return Zo(a) } }) } X.addExecuteCommandHandler = sS; function uS(t, e) { var r; let n = e.lsp.DocumentLinkProvider; if (n) { t.onDocumentLinks(ki((o, a, s, u) => n.getDocumentLinks(a, s, u), e)); let i = (r = n.resolveDocumentLink) === null || r === void 0 ? void 0 : r.bind(n); i && t.onDocumentLinkResolve(async (o, a) => { try { return await i(o, a) } catch (s) { return Zo(s) } }) } } X.addDocumentLinkHandler = uS; function cS(t, e) { t.onSignatureHelp(ki((r, n, i, o) => { var a; return (a = r.lsp.SignatureHelp) === null || a === void 0 ? void 0 : a.provideSignatureHelp(n, i, o) }, e)) } X.addSignatureHelpHandler = cS; function lS(t, e) { var r; let n = e.lsp.CodeLensProvider; if (n) { t.onCodeLens(ki((o, a, s, u) => n.provideCodeLens(a, s, u), e)); let i = (r = n.resolveCodeLens) === null || r === void 0 ? void 0 : r.bind(n); i && t.onCodeLensResolve(async (o, a) => { try { return await i(o, a) } catch (s) { return Zo(s) } }) } } X.addCodeLensHandler = lS; function dS(t, e) { t.languages.callHierarchy.onPrepare(ki((r, n, i, o) => { var a; return r.lsp.CallHierarchyProvider && (a = r.lsp.CallHierarchyProvider.prepareCallHierarchy(n, i, o)) !== null && a !== void 0 ? a : null }, e)), t.languages.callHierarchy.onIncomingCalls(Qy((r, n, i) => { var o; return r.lsp.CallHierarchyProvider && (o = r.lsp.CallHierarchyProvider.incomingCalls(n, i)) !== null && o !== void 0 ? o : null }, e)), t.languages.callHierarchy.onOutgoingCalls(Qy((r, n, i) => { var o; return r.lsp.CallHierarchyProvider && (o = r.lsp.CallHierarchyProvider.outgoingCalls(n, i)) !== null && o !== void 0 ? o : null }, e)) } X.addCallHierarchyHandler = dS; function Qy(t, e) { let r = e.ServiceRegistry; return async (n, i) => { let o = ic.URI.parse(n.item.uri), a = r.getServices(o); if (!a) { let s = `Could not find service instance for uri: '${o.toString()}'`; throw console.error(s), new Error(s) } try { return await t(a, n, i) } catch (s) { return Zo(s) } } } X.createCallHierarchyRequestHandler = Qy; function ki(t, e) { let r = e.workspace.LangiumDocuments, n = e.ServiceRegistry; return async (i, o) => { let a = ic.URI.parse(i.textDocument.uri), s = n.getServices(a); if (!s) throw console.error(`Could not find service instance for uri: '${a.toString()}'`), new Error; let u = r.getOrCreateDocument(a); if (!u) throw new Error; try { return await t(s, u, i, o) } catch (c) { return Zo(c) } } } X.createServerRequestHandler = ki; function Yt(t, e) { let r = e.workspace.LangiumDocuments, n = e.ServiceRegistry; return async (i, o) => { let a = ic.URI.parse(i.textDocument.uri), s = n.getServices(a); if (!s) return console.error(`Could not find service instance for uri: '${a.toString()}'`), null; let u = r.getOrCreateDocument(a); if (!u) return null; try { return await t(s, u, i, o) } catch (c) { return Zo(c) } } } X.createRequestHandler = Yt; function Zo(t) { if ((0, HK.isOperationCancelled)(t)) return new Qo.ResponseError(Qo.LSPErrorCodes.RequestCancelled, "The request has been cancelled."); if (t instanceof Qo.ResponseError) return t; throw t } }); var tv = f(Xd => { "use strict"; Object.defineProperty(Xd, "__esModule", { value: !0 }); Xd.DefaultReferencesProvider = void 0; var YK = Oe(), XK = Le(), ev = class { constructor(e) { this.nameProvider = e.references.NameProvider, this.references = e.references.References, this.grammarConfig = e.parser.GrammarConfig } findReferences(e, r) { let n = e.parseResult.value.$cstNode; if (!n) return []; let i = (0, XK.findDeclarationNodeAtOffset)(n, e.textDocument.offsetAt(r.position), this.grammarConfig.nameRegexp); return i ? this.getReferences(i, r, e) : [] } getReferences(e, r, n) { let i = [], o = this.references.findDeclaration(e); if (o) { let a = { includeDeclaration: r.context.includeDeclaration }; this.references.findReferences(o, a).forEach(s => { i.push(YK.Location.create(s.sourceUri.toString(), s.segment.range)) }) } return i } }; Xd.DefaultReferencesProvider = ev }); var nv = f(Jd => { "use strict"; Object.defineProperty(Jd, "__esModule", { value: !0 }); Jd.DefaultRenameProvider = void 0; var JK = Oe(), QK = Za(), fS = Le(), rv = class { constructor(e) { this.references = e.references.References, this.nameProvider = e.references.NameProvider, this.grammarConfig = e.parser.GrammarConfig } async rename(e, r) { let n = {}, i = e.parseResult.value.$cstNode; if (!i) return; let o = e.textDocument.offsetAt(r.position), a = (0, fS.findDeclarationNodeAtOffset)(i, o, this.grammarConfig.nameRegexp); if (!a) return; let s = this.references.findDeclaration(a); if (!s) return; let u = { onlyLocal: !1, includeDeclaration: !0 }; return this.references.findReferences(s, u).forEach(l => { let d = JK.TextEdit.replace(l.segment.range, r.newName), h = l.sourceUri.toString(); n[h] ? n[h].push(d) : n[h] = [d] }), { changes: n } } prepareRename(e, r) { return this.renameNodeRange(e, r.position) } renameNodeRange(e, r) { let n = e.parseResult.value.$cstNode, i = e.textDocument.offsetAt(r); if (n && i) { let o = (0, fS.findDeclarationNodeAtOffset)(n, i, this.grammarConfig.nameRegexp); if (!o) return; if (this.references.findDeclaration(o) || this.isNameNode(o)) return o.range } } isNameNode(e) { return e?.element && (0, QK.isNamed)(e.element) && e === this.nameProvider.getNameNode(e.element) } }; Jd.DefaultRenameProvider = rv }); var pS = f(Qd => { "use strict"; Object.defineProperty(Qd, "__esModule", { value: !0 }); Qd.AbstractTypeDefinitionProvider = void 0; var ZK = Oe(), ez = Le(), iv = class { constructor(e) { this.references = e.references.References } getTypeDefinition(e, r, n = ZK.CancellationToken.None) { let i = e.parseResult.value; if (i.$cstNode) { let o = (0, ez.findDeclarationNodeAtOffset)(i.$cstNode, e.textDocument.offsetAt(r.position)); if (o) { let a = this.references.findDeclaration(o); if (a) return this.collectGoToTypeLocationLinks(a, n) } } } }; Qd.AbstractTypeDefinitionProvider = iv }); var ov = f($e => { "use strict"; var tz = $e && $e.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), ht = $e && $e.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && tz(e, t, r) }; Object.defineProperty($e, "__esModule", { value: !0 }); ht(Ud(), $e); ht(wy(), $e); ht(qy(), $e); ht(DP(), $e); ht(xP(), $e); ht(LP(), $e); ht(My(), $e); ht(Fy(), $e); ht($P(), $e); ht(Uy(), $e); ht(FP(), $e); ht(Ed(), $e); ht(Ty(), $e); ht(Wy(), $e); ht(jP(), $e); ht(UP(), $e); ht(Zy(), $e); ht(tv(), $e); ht(nv(), $e); ht(Id(), $e); ht(Xy(), $e); ht(pS(), $e) }); var hS = f(Zd => { "use strict"; Object.defineProperty(Zd, "__esModule", { value: !0 }); Zd.LangiumGrammarDefinitionProvider = void 0; var av = Oe(), rz = ov(), nz = be(), iz = vt(), oz = Se(), az = jt(), sv = class extends rz.DefaultDefinitionProvider { constructor(e) { super(e), this.documents = e.shared.workspace.LangiumDocuments } collectLocationLinks(e, r) { var n, i, o, a, s, u; let c = "path"; if ((0, oz.isGrammarImport)(e.element) && ((n = (0, iz.findAssignment)(e)) === null || n === void 0 ? void 0 : n.feature) === c) { let l = (0, az.resolveImport)(this.documents, e.element); if (l?.$document) { let d = (i = this.findTargetObject(l)) !== null && i !== void 0 ? i : l, h = (a = (o = this.nameProvider.getNameNode(d)) === null || o === void 0 ? void 0 : o.range) !== null && a !== void 0 ? a : av.Range.create(0, 0, 0, 0), y = (u = (s = d.$cstNode) === null || s === void 0 ? void 0 : s.range) !== null && u !== void 0 ? u : av.Range.create(0, 0, 0, 0); return [av.LocationLink.create(l.$document.uri.toString(), y, h, e.range)] } return } return super.collectLocationLinks(e, r) } findTargetObject(e) { return e.isDeclared ? e : (0, nz.streamContents)(e).head() } }; Zd.LangiumGrammarDefinitionProvider = sv }); var gS = f(tf => { "use strict"; Object.defineProperty(tf, "__esModule", { value: !0 }); tf.LangiumGrammarCallHierarchyProvider = void 0; var mS = Oe(), sz = qy(), uv = be(), uz = Le(), ef = Se(), cv = class extends sz.AbstractCallHierarchyProvider { getIncomingCalls(e, r) { if (!(0, ef.isParserRule)(e)) return; let n = new Map; if (r.forEach(i => { let a = this.documents.getOrCreateDocument(i.sourceUri).parseResult.value; if (!a.$cstNode) return; let s = (0, uz.findLeafNodeAtOffset)(a.$cstNode, i.segment.offset); if (!s) return; let u = (0, uv.getContainerOfType)(s.element, ef.isParserRule); if (!u || !u.$cstNode) return; let c = this.nameProvider.getNameNode(u); if (!c) return; let l = i.sourceUri.toString(), d = l + "@" + c.text; n.has(d) ? n.set(d, { parserRule: u.$cstNode, nameNode: c, targetNodes: [...n.get(d).targetNodes, s], docUri: l }) : n.set(d, { parserRule: u.$cstNode, nameNode: c, targetNodes: [s], docUri: l }) }), n.size !== 0) return Array.from(n.values()).map(i => ({ from: { kind: mS.SymbolKind.Method, name: i.nameNode.text, range: i.parserRule.range, selectionRange: i.nameNode.range, uri: i.docUri }, fromRanges: i.targetNodes.map(o => o.range) })) } getOutgoingCalls(e) { if (!(0, ef.isParserRule)(e)) return; let r = (0, uv.streamAllContents)(e).filter(ef.isRuleCall).toArray(), n = new Map; if (r.forEach(i => { var o; let a = i.$cstNode; if (!a) return; let s = (o = i.rule.ref) === null || o === void 0 ? void 0 : o.$cstNode; if (!s) return; let u = this.nameProvider.getNameNode(s.element); if (!u) return; let c = (0, uv.getDocument)(s.element).uri.toString(), l = c + "@" + u.text; n.has(l) ? n.set(l, { refCstNode: s, to: u, from: [...n.get(l).from, a.range], docUri: c }) : n.set(l, { refCstNode: s, to: u, from: [a.range], docUri: c }) }), n.size !== 0) return Array.from(n.values()).map(i => ({ to: { kind: mS.SymbolKind.Method, name: i.to.text, range: i.refCstNode.range, selectionRange: i.to.range, uri: i.docUri }, fromRanges: i.from })) } }; tf.LangiumGrammarCallHierarchyProvider = cv }); var _S = f(of => { "use strict"; Object.defineProperty(of, "__esModule", { value: !0 }); of.LangiumGrammarValidationResourcesCollector = void 0; var cz = yn(), vS = Ft(), rf = Se(), yS = jt(), nf = Ja(), lz = Kg(), lv = class { constructor(e) { this.documents = e.shared.workspace.LangiumDocuments } collectValidationResources(e) { let r = (0, lz.collectValidationAst)(e, this.documents); return { typeToValidationInfo: this.collectValidationInfo(r), typeToSuperProperties: this.collectSuperProperties(r) } } collectValidationInfo({ astResources: e, inferred: r, declared: n }) { let i = new Map, o = dz(e); for (let s of (0, nf.mergeTypesAndInterfaces)(r)) i.set(s.name, { inferred: s, inferredNodes: o.get(s.name) }); let a = (0, vS.stream)(e.interfaces).concat(e.types).reduce((s, u) => s.set(u.name, u), new Map); for (let s of (0, nf.mergeTypesAndInterfaces)(n)) { let u = a.get(s.name); if (u) { let c = i.get(s.name); i.set(s.name, Object.assign(Object.assign({}, c ?? {}), { declared: s, declaredNode: u })) } } return i } collectSuperProperties({ inferred: e, declared: r }) { let n = new Map, i = (0, nf.mergeInterfaces)(e, r), o = new Map(i.map(a => [a.name, a])); for (let a of (0, nf.mergeInterfaces)(e, r)) n.set(a.name, this.addSuperProperties(a, o, new Set)); return n } addSuperProperties(e, r, n) { if (n.has(e.name)) return []; n.add(e.name); let i = [...e.properties]; for (let o of e.superTypes) { let a = r.get(o.name); a && i.push(...this.addSuperProperties(a, r, n)) } return i } }; of.LangiumGrammarValidationResourcesCollector = lv; function dz({ parserRules: t, datatypeRules: e }) { let r = new cz.MultiMap; (0, vS.stream)(t).concat(e).forEach(i => r.add((0, yS.getRuleType)(i), i)); function n(i) { if ((0, rf.isAction)(i)) { let o = (0, yS.getActionType)(i); o && r.add(o, i) } ((0, rf.isAlternatives)(i) || (0, rf.isGroup)(i) || (0, rf.isUnorderedGroup)(i)) && i.elements.forEach(o => n(o)) } return t.forEach(i => n(i.definition)), r } }); var TS = f(po => { "use strict"; Object.defineProperty(po, "__esModule", { value: !0 }); po.isInferredAndDeclared = po.isInferred = po.isDeclared = void 0; function fz(t) { return t && "declared" in t } po.isDeclared = fz; function pz(t) { return t && "inferred" in t } po.isInferred = pz; function hz(t) { return t && "inferred" in t && "declared" in t } po.isInferredAndDeclared = hz }); var bS = f(Yr => { "use strict"; var mz = Yr && Yr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), gz = Yr && Yr.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), yz = Yr && Yr.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && mz(e, t, r); return gz(e, t), e }; Object.defineProperty(Yr, "__esModule", { value: !0 }); Yr.LangiumGrammarTypesValidator = Yr.registerTypeValidationChecks = void 0; var ds = yz(Se()), vz = yn(), _z = jt(), Ze = Xa(), dv = TS(); function Tz(t) { let e = t.validation.ValidationRegistry, r = t.validation.LangiumGrammarTypesValidator, n = { Action: [r.checkActionIsNotUnionType], Grammar: [r.checkDeclaredTypesConsistency, r.checkDeclaredAndInferredTypesConsistency] }; e.register(n, r) } Yr.registerTypeValidationChecks = Tz; var fv = class { checkDeclaredTypesConsistency(e, r) { var n; let i = (n = e.$document) === null || n === void 0 ? void 0 : n.validationResources; if (i) { for (let o of i.typeToValidationInfo.values()) if ((0, dv.isDeclared)(o) && (0, Ze.isInterfaceType)(o.declared) && ds.isInterface(o.declaredNode)) { let a = o; bz(a, r), Az(a, r) } } } checkDeclaredAndInferredTypesConsistency(e, r) { var n; let i = (n = e.$document) === null || n === void 0 ? void 0 : n.validationResources; if (i) for (let o of i.typeToValidationInfo.values()) (0, dv.isInferred)(o) && o.inferred instanceof Ze.InterfaceType && Rz(o.inferred, r), (0, dv.isInferredAndDeclared)(o) && Cz(o, i, r) } checkActionIsNotUnionType(e, r) { ds.isType(e.type) && r("error", "Actions cannot create union types.", { node: e, property: "type" }) } }; Yr.LangiumGrammarTypesValidator = fv; function Rz(t, e) { t.properties.forEach(r => { var n; let i = (0, Ze.flattenPropertyUnion)(r.type); if (i.length > 1) { let o = s => (0, Ze.isReferenceType)(s) ? "ref" : "other", a = o(i[0]); if (i.slice(1).some(s => o(s) !== a)) { let s = (n = r.astNodes.values().next()) === null || n === void 0 ? void 0 : n.value; s && e("error", `Mixing a cross-reference with other types is not supported. Consider splitting property "${r.name}" into two or more different properties.`, { node: s }) } } }) } function bz({ declared: t, declaredNode: e }, r) { Array.from(t.superTypes).forEach((n, i) => { n && ((0, Ze.isUnionType)(n) && r("error", "Interfaces cannot extend union types.", { node: e, property: "superTypes", index: i }), n.declared || r("error", "Extending an inferred type is discouraged.", { node: e, property: "superTypes", index: i })) }) } function Az({ declared: t, declaredNode: e }, r) { let n = t.properties.reduce((a, s) => a.add(s.name, s), new vz.MultiMap); for (let [a, s] of n.entriesGroupedByKey()) if (s.length > 1) for (let u of s) r("error", `Cannot have two properties with the same name '${a}'.`, { node: Array.from(u.astNodes)[0], property: "name" }); let i = Array.from(t.superTypes); for (let a = 0; a < i.length; a++)for (let s = a + 1; s < i.length; s++) { let u = i[a], c = i[s], l = (0, Ze.isInterfaceType)(u) ? u.superProperties : [], d = (0, Ze.isInterfaceType)(c) ? c.superProperties : [], h = Pz(l, d); h.length > 0 && r("error", `Cannot simultaneously inherit from '${u}' and '${c}'. Their ${h.map(y => "'" + y + "'").join(", ")} properties are not identical.`, { node: e, property: "name" }) } let o = new Set; for (let a of i) { let s = (0, Ze.isInterfaceType)(a) ? a.superProperties : []; for (let u of s) o.add(u.name) } for (let a of t.properties) if (o.has(a.name)) { let s = e.attributes.find(u => u.name === a.name); s && r("error", `Cannot redeclare property '${a.name}'. It is already inherited from another interface.`, { node: s, property: "name" }) } } function Pz(t, e) { let r = []; for (let n of t) { let i = e.find(o => o.name === n.name); i && !Sz(n, i) && r.push(n.name) } return r } function Sz(t, e) { return (0, Ze.isTypeAssignable)(t.type, e.type) && (0, Ze.isTypeAssignable)(e.type, t.type) } function Cz(t, e, r) { let { inferred: n, declared: i, declaredNode: o, inferredNodes: a } = t, s = i.name, u = d => h => a.forEach(y => r("error", `${h}${d ? ` ${d}` : ""}.`, y?.inferredType ? { node: y?.inferredType, property: "name" } : { node: y, property: ds.isAction(y) ? "type" : "name" })), c = (d, h) => d.forEach(y => r("error", h, { node: y, property: ds.isAssignment(y) || ds.isAction(y) ? "feature" : "name" })), l = d => { a.forEach(h => { ds.isParserRule(h) && (0, _z.extractAssignments)(h.definition).find(m => m.feature === d) === void 0 && r("error", `Property '${d}' is missing in a rule '${h.name}', but is required in type '${s}'.`, { node: h, property: "parameters" }) }) }; if ((0, Ze.isUnionType)(n) && (0, Ze.isUnionType)(i)) Ez(n.type, i.type, u(`in a rule that returns type '${s}'`)); else if ((0, Ze.isInterfaceType)(n) && (0, Ze.isInterfaceType)(i)) Nz(n, i, e, u(`in a rule that returns type '${s}'`), c, l); else { let d = `Inferred and declared versions of type '${s}' both have to be interfaces or unions.`; u()(d), r("error", d, { node: o, property: "name" }) } } function Ez(t, e, r) { (0, Ze.isTypeAssignable)(t, e) || r(`Cannot assign type '${(0, Ze.propertyTypeToString)(t, "DeclaredType")}' to '${(0, Ze.propertyTypeToString)(e, "DeclaredType")}'`) } function RS(t) { return t.optional || (0, Ze.isMandatoryPropertyType)(t.type) } function Nz(t, e, r, n, i, o) { let a = new Set(t.properties.map(d => d.name)), s = new Map(t.allProperties.map(d => [d.name, d])), u = new Map(e.superProperties.map(d => [d.name, d])), c = d => { if ((0, Ze.isPropertyUnion)(d)) return { types: d.types.map(h => c(h)) }; if ((0, Ze.isReferenceType)(d)) return { referenceType: c(d.referenceType) }; if ((0, Ze.isArrayType)(d)) return { elementType: c(d.elementType) }; if ((0, Ze.isValueType)(d)) { let h = r.typeToValidationInfo.get(d.value.name); return h ? { value: "declared" in h ? h.declared : h.inferred } : d } return d }; for (let [d, h] of s.entries()) { let y = u.get(d); if (y) { let m = (0, Ze.propertyTypeToString)(h.type, "DeclaredType"), R = (0, Ze.propertyTypeToString)(y.type, "DeclaredType"); if (!(0, Ze.isTypeAssignable)(c(h.type), y.type)) { let E = `The assigned type '${m}' is not compatible with the declared property '${d}' of type '${R}'.`; i(h.astNodes, E) } h.optional && !RS(y) && o(d) } else a.has(d) && i(h.astNodes, `A property '${d}' is not expected.`) } let l = new Set; for (let [d, h] of u.entries()) !s.get(d) && !RS(h) && l.add(d); if (l.size > 0) { let d = l.size > 1 ? "Properties" : "A property", h = l.size > 1 ? "are expected" : "is expected", y = Array.from(l).map(m => `'${m}'`).sort().join(", "); n(`${d} ${y} ${h}.`) } } }); var pv = f(ea => { "use strict"; Object.defineProperty(ea, "__esModule", { value: !0 }); ea.createLangiumGrammarServices = ea.LangiumGrammarModule = void 0; var AS = af(), PS = Gu(), SS = BA(), CS = ZA(), ES = dy(), kz = uP(), wz = cP(), Oz = dP(), Dz = fP(), Iz = hP(), xz = RP(), qz = hS(), Lz = gS(), Mz = _S(), NS = bS(), $z = _r(), Fz = fo(); ea.LangiumGrammarModule = { validation: { LangiumGrammarValidator: t => new ES.LangiumGrammarValidator(t), ValidationResourcesCollector: t => new Mz.LangiumGrammarValidationResourcesCollector(t), LangiumGrammarTypesValidator: () => new NS.LangiumGrammarTypesValidator }, lsp: { FoldingRangeProvider: t => new wz.LangiumGrammarFoldingRangeProvider(t), CodeActionProvider: t => new kz.LangiumGrammarCodeActionProvider(t), SemanticTokenProvider: t => new Dz.LangiumGrammarSemanticTokenProvider(t), Formatter: () => new Oz.LangiumGrammarFormatter, DefinitionProvider: t => new qz.LangiumGrammarDefinitionProvider(t), CallHierarchyProvider: t => new Lz.LangiumGrammarCallHierarchyProvider(t) }, references: { ScopeComputation: t => new CS.LangiumGrammarScopeComputation(t), ScopeProvider: t => new CS.LangiumGrammarScopeProvider(t), References: t => new xz.LangiumGrammarReferences(t), NameProvider: () => new Iz.LangiumGrammarNameProvider } }; function jz(t, e) { let r = (0, PS.inject)((0, AS.createDefaultSharedModule)(t), SS.LangiumGrammarGeneratedSharedModule, e), n = (0, PS.inject)((0, AS.createDefaultModule)({ shared: r }), SS.LangiumGrammarGeneratedModule, ea.LangiumGrammarModule); return Uz(r, n), r.ServiceRegistry.register(n), (0, ES.registerValidationChecks)(n), (0, NS.registerTypeValidationChecks)(n), { shared: r, grammar: n } } ea.createLangiumGrammarServices = jz; function Uz(t, e) { t.workspace.DocumentBuilder.onBuildPhase(Fz.DocumentState.IndexedReferences, async (n, i) => { for (let o of n) { await (0, $z.interruptAndCheck)(i); let a = e.validation.ValidationResourcesCollector, s = o.parseResult.value; o.validationResources = a.collectValidationResources(s) } }) } }); var hv = f(fs => { "use strict"; Object.defineProperty(fs, "__esModule", { value: !0 }); fs.EmptyFileSystem = fs.EmptyFileSystemProvider = void 0; var sf = class { readFile() { throw new Error("Method not implemented.") } readFileSync() { throw new Error("Method not implemented.") } async readDirectory() { return [] } }; fs.EmptyFileSystemProvider = sf; fs.EmptyFileSystem = { fileSystemProvider: () => new sf } }); var vt = f(pe => { "use strict"; var Gz = pe && pe.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), Hz = pe && pe.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), Wz = pe && pe.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && Gz(e, t, r); return Hz(e, t), e }; Object.defineProperty(pe, "__esModule", { value: !0 }); pe.createServicesForGrammar = pe.loadGrammarFromJson = pe.findNameAssignment = pe.findAssignment = pe.findNodesForKeywordInternal = pe.findNodeForKeyword = pe.findNodesForKeyword = pe.findNodeForProperty = pe.findNodesForProperty = pe.isCommentTerminal = pe.getCrossReferenceTerminal = pe.getAllReachableRules = pe.getHiddenRules = pe.getEntryRule = void 0; var OS = gn(), kS = af(), wS = Gu(), Bz = Vg(), fr = Wz(Se()), Kz = jt(), DS = pv(), zz = er(), ps = be(), Vz = Le(), mv = hv(); function IS(t) { return t.rules.find(e => fr.isParserRule(e) && e.entry) } pe.getEntryRule = IS; function xS(t) { return t.rules.filter(e => fr.isTerminalRule(e) && e.hidden) } pe.getHiddenRules = xS; function Yz(t, e) { let r = new Set, n = IS(t); if (!n) return new Set(t.rules); let i = [n].concat(xS(t)); for (let a of i) qS(a, r, e); let o = new Set; for (let a of t.rules) (r.has(a.name) || fr.isTerminalRule(a) && a.hidden) && o.add(a); return o } pe.getAllReachableRules = Yz; function qS(t, e, r) { e.add(t.name), (0, ps.streamAllContents)(t).forEach(n => { if (fr.isRuleCall(n) || r && fr.isTerminalRuleCall(n)) { let i = n.rule.ref; i && !e.has(i.name) && qS(i, e, r) } }) } function Xz(t) { if (t.terminal) return t.terminal; if (t.type.ref) { let e = LS(t.type.ref); return e?.terminal } } pe.getCrossReferenceTerminal = Xz; function Jz(t) { return t.hidden && !" ".match((0, Kz.terminalRegex)(t)) } pe.isCommentTerminal = Jz; function Qz(t, e) { return !t || !e ? [] : gv(t, e, t.element, !0) } pe.findNodesForProperty = Qz; function Zz(t, e, r) { if (!t || !e) return; let n = gv(t, e, t.element, !0); if (n.length !== 0) return r !== void 0 ? r = Math.max(0, Math.min(r, n.length - 1)) : r = 0, n[r] } pe.findNodeForProperty = Zz; function gv(t, e, r, n) { if (!n) { let i = (0, ps.getContainerOfType)(t.feature, fr.isAssignment); if (i && i.feature === e) return [t] } return (0, zz.isCompositeCstNode)(t) && t.element === r ? t.children.flatMap(i => gv(i, e, r, !1)) : [] } function eV(t, e) { return t ? yv(t, e, t?.element) : [] } pe.findNodesForKeyword = eV; function tV(t, e, r) { if (!t) return; let n = yv(t, e, t?.element); if (n.length !== 0) return r !== void 0 ? r = Math.max(0, Math.min(r, n.length - 1)) : r = 0, n[r] } pe.findNodeForKeyword = tV; function yv(t, e, r) { if (t.element !== r) return []; if (fr.isKeyword(t.feature) && t.feature.value === e) return [t]; let n = (0, Vz.streamCst)(t).iterator(), i, o = []; do if (i = n.next(), !i.done) { let a = i.value; a.element === r ? fr.isKeyword(a.feature) && a.feature.value === e && o.push(a) : n.prune() } while (!i.done); return o } pe.findNodesForKeywordInternal = yv; function rV(t) { var e; let r = t.element; for (; r === ((e = t.parent) === null || e === void 0 ? void 0 : e.element);) { let n = (0, ps.getContainerOfType)(t.feature, fr.isAssignment); if (n) return n; t = t.parent } } pe.findAssignment = rV; function LS(t) { return fr.isInferredType(t) && (t = t.$container), MS(t, new Map) } pe.findNameAssignment = LS; function MS(t, e) { var r; function n(i, o) { let a; return (0, ps.getContainerOfType)(i, fr.isAssignment) || (a = MS(o, e)), e.set(t, a), a } if (e.has(t)) return e.get(t); e.set(t, void 0); for (let i of (0, ps.streamAllContents)(t)) { if (fr.isAssignment(i) && i.feature.toLowerCase() === "name") return e.set(t, i), i; if (fr.isRuleCall(i) && fr.isParserRule(i.rule.ref)) return n(i, i.rule.ref); if (fr.isSimpleType(i) && (!((r = i.typeRef) === null || r === void 0) && r.ref)) return n(i, i.typeRef.ref) } } function nV(t) { var e; let r = (0, DS.createLangiumGrammarServices)(mv.EmptyFileSystem).grammar, n = r.serializer.JsonSerializer.deserialize(t); return r.shared.workspace.LangiumDocumentFactory.fromModel(n, OS.URI.parse(`memory://${(e = n.name) !== null && e !== void 0 ? e : "grammar"}.langium`)), n } pe.loadGrammarFromJson = nV; async function iV(t) { var e, r, n, i, o, a; let s = (e = t.grammarServices) !== null && e !== void 0 ? e : (0, DS.createLangiumGrammarServices)(mv.EmptyFileSystem).grammar, u = OS.URI.parse("memory:///grammar.langium"), c = s.shared.workspace.LangiumDocumentFactory, l = typeof t.grammar == "string" ? c.fromString(t.grammar, u) : (0, ps.getDocument)(t.grammar), d = l.parseResult.value; await s.shared.workspace.DocumentBuilder.build([l], { validationChecks: "none" }); let y = (r = t.parserConfig) !== null && r !== void 0 ? r : { skipValidations: !1 }, m = (n = t.languageMetaData) !== null && n !== void 0 ? n : { caseInsensitive: !1, fileExtensions: [`.${(o = (i = d.name) === null || i === void 0 ? void 0 : i.toLowerCase()) !== null && o !== void 0 ? o : "unknown"}`], languageId: (a = d.name) !== null && a !== void 0 ? a : "UNKNOWN" }, R = { AstReflection: () => (0, Bz.interpretAstReflection)(d) }, C = { Grammar: () => d, LanguageMetaData: () => m, parser: { ParserConfig: () => y } }, E = (0, wS.inject)((0, kS.createDefaultSharedModule)(mv.EmptyFileSystem), R, t.sharedModule), A = (0, wS.inject)((0, kS.createDefaultModule)({ shared: E }), C, t.module); return E.ServiceRegistry.register(A), A } pe.createServicesForGrammar = iV }); var vv = f(uf => { "use strict"; Object.defineProperty(uf, "__esModule", { value: !0 }); uf.createGrammarConfig = void 0; var oV = Le(), aV = vt(), sV = Vo(), uV = Se(), cV = jt(); function lV(t) { let e = [], r = t.Grammar; for (let n of r.rules) (0, uV.isTerminalRule)(n) && (0, aV.isCommentTerminal)(n) && (0, sV.isMultilineComment)((0, cV.terminalRegex)(n)) && e.push(n.name); return { multilineCommentRules: e, nameRegexp: oV.DefaultNameRegexp } } uf.createGrammarConfig = lV }); var _v = f(cf => { "use strict"; Object.defineProperty(cf, "__esModule", { value: !0 }); cf.VERSION = void 0; cf.VERSION = "10.4.2" }); var hs = f((gpe, $S) => { var dV = Object.prototype; function fV(t) { var e = t && t.constructor, r = typeof e == "function" && e.prototype || dV; return t === r } $S.exports = fV }); var Tv = f((ype, FS) => { function pV(t, e) { return function (r) { return t(e(r)) } } FS.exports = pV }); var US = f((vpe, jS) => { var hV = Tv(), mV = hV(Object.keys, Object); jS.exports = mV }); var Rv = f((_pe, GS) => { var gV = hs(), yV = US(), vV = Object.prototype, _V = vV.hasOwnProperty; function TV(t) { if (!gV(t)) return yV(t); var e = []; for (var r in Object(t)) _V.call(t, r) && r != "constructor" && e.push(r); return e } GS.exports = TV }); var bv = f((Tpe, HS) => { var RV = typeof global == "object" && global && global.Object === Object && global; HS.exports = RV }); var bn = f((Rpe, WS) => { var bV = bv(), AV = typeof self == "object" && self && self.Object === Object && self, PV = bV || AV || Function("return this")(); WS.exports = PV }); var ta = f((bpe, BS) => { var SV = bn(), CV = SV.Symbol; BS.exports = CV }); var YS = f((Ape, VS) => { var KS = ta(), zS = Object.prototype, EV = zS.hasOwnProperty, NV = zS.toString, oc = KS ? KS.toStringTag : void 0; function kV(t) { var e = EV.call(t, oc), r = t[oc]; try { t[oc] = void 0; var n = !0 } catch { } var i = NV.call(t); return n && (e ? t[oc] = r : delete t[oc]), i } VS.exports = kV }); var JS = f((Ppe, XS) => { var wV = Object.prototype, OV = wV.toString; function DV(t) { return OV.call(t) } XS.exports = DV }); var ho = f((Spe, eC) => { var QS = ta(), IV = YS(), xV = JS(), qV = "[object Null]", LV = "[object Undefined]", ZS = QS ? QS.toStringTag : void 0; function MV(t) { return t == null ? t === void 0 ? LV : qV : ZS && ZS in Object(t) ? IV(t) : xV(t) } eC.exports = MV }); var An = f((Cpe, tC) => { function $V(t) { var e = typeof t; return t != null && (e == "object" || e == "function") } tC.exports = $V }); var ms = f((Epe, rC) => { var FV = ho(), jV = An(), UV = "[object AsyncFunction]", GV = "[object Function]", HV = "[object GeneratorFunction]", WV = "[object Proxy]"; function BV(t) { if (!jV(t)) return !1; var e = FV(t); return e == GV || e == HV || e == UV || e == WV } rC.exports = BV }); var iC = f((Npe, nC) => { var KV = bn(), zV = KV["__core-js_shared__"]; nC.exports = zV }); var sC = f((kpe, aC) => { var Av = iC(), oC = function () { var t = /[^.]+$/.exec(Av && Av.keys && Av.keys.IE_PROTO || ""); return t ? "Symbol(src)_1." + t : "" }(); function VV(t) { return !!oC && oC in t } aC.exports = VV }); var Pv = f((wpe, uC) => { var YV = Function.prototype, XV = YV.toString; function JV(t) { if (t != null) { try { return XV.call(t) } catch { } try { return t + "" } catch { } } return "" } uC.exports = JV }); var lC = f((Ope, cC) => { var QV = ms(), ZV = sC(), e2 = An(), t2 = Pv(), r2 = /[\\^$.*+?()[\]{}|]/g, n2 = /^\[object .+?Constructor\]$/, i2 = Function.prototype, o2 = Object.prototype, a2 = i2.toString, s2 = o2.hasOwnProperty, u2 = RegExp("^" + a2.call(s2).replace(r2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"); function c2(t) { if (!e2(t) || ZV(t)) return !1; var e = QV(t) ? u2 : n2; return e.test(t2(t)) } cC.exports = c2 }); var fC = f((Dpe, dC) => { function l2(t, e) { return t?.[e] } dC.exports = l2 }); var mo = f((Ipe, pC) => { var d2 = lC(), f2 = fC(); function p2(t, e) { var r = f2(t, e); return d2(r) ? r : void 0 } pC.exports = p2 }); var mC = f((xpe, hC) => { var h2 = mo(), m2 = bn(), g2 = h2(m2, "DataView"); hC.exports = g2 }); var lf = f((qpe, gC) => { var y2 = mo(), v2 = bn(), _2 = y2(v2, "Map"); gC.exports = _2 }); var vC = f((Lpe, yC) => { var T2 = mo(), R2 = bn(), b2 = T2(R2, "Promise"); yC.exports = b2 }); var Sv = f((Mpe, _C) => { var A2 = mo(), P2 = bn(), S2 = A2(P2, "Set"); _C.exports = S2 }); var RC = f(($pe, TC) => { var C2 = mo(), E2 = bn(), N2 = C2(E2, "WeakMap"); TC.exports = N2 }); var ys = f((Fpe, NC) => { var Cv = mC(), Ev = lf(), Nv = vC(), kv = Sv(), wv = RC(), EC = ho(), gs = Pv(), bC = "[object Map]", k2 = "[object Object]", AC = "[object Promise]", PC = "[object Set]", SC = "[object WeakMap]", CC = "[object DataView]", w2 = gs(Cv), O2 = gs(Ev), D2 = gs(Nv), I2 = gs(kv), x2 = gs(wv), ra = EC; (Cv && ra(new Cv(new ArrayBuffer(1))) != CC || Ev && ra(new Ev) != bC || Nv && ra(Nv.resolve()) != AC || kv && ra(new kv) != PC || wv && ra(new wv) != SC) && (ra = function (t) { var e = EC(t), r = e == k2 ? t.constructor : void 0, n = r ? gs(r) : ""; if (n) switch (n) { case w2: return CC; case O2: return bC; case D2: return AC; case I2: return PC; case x2: return SC }return e }); NC.exports = ra }); var Pn = f((jpe, kC) => { function q2(t) { return t != null && typeof t == "object" } kC.exports = q2 }); var OC = f((Upe, wC) => { var L2 = ho(), M2 = Pn(), $2 = "[object Arguments]"; function F2(t) { return M2(t) && L2(t) == $2 } wC.exports = F2 }); var ac = f((Gpe, xC) => { var DC = OC(), j2 = Pn(), IC = Object.prototype, U2 = IC.hasOwnProperty, G2 = IC.propertyIsEnumerable, H2 = DC(function () { return arguments }()) ? DC : function (t) { return j2(t) && U2.call(t, "callee") && !G2.call(t, "callee") }; xC.exports = H2 }); var qe = f((Hpe, qC) => { var W2 = Array.isArray; qC.exports = W2 }); var df = f((Wpe, LC) => { var B2 = 9007199254740991; function K2(t) { return typeof t == "number" && t > -1 && t % 1 == 0 && t <= B2 } LC.exports = K2 }); var Sn = f((Bpe, MC) => { var z2 = ms(), V2 = df(); function Y2(t) { return t != null && V2(t.length) && !z2(t) } MC.exports = Y2 }); var FC = f((Kpe, $C) => { function X2() { return !1 } $C.exports = X2 }); var uc = f((sc, vs) => { var J2 = bn(), Q2 = FC(), GC = typeof sc == "object" && sc && !sc.nodeType && sc, jC = GC && typeof vs == "object" && vs && !vs.nodeType && vs, Z2 = jC && jC.exports === GC, UC = Z2 ? J2.Buffer : void 0, e3 = UC ? UC.isBuffer : void 0, t3 = e3 || Q2; vs.exports = t3 }); var WC = f((zpe, HC) => { var r3 = ho(), n3 = df(), i3 = Pn(), o3 = "[object Arguments]", a3 = "[object Array]", s3 = "[object Boolean]", u3 = "[object Date]", c3 = "[object Error]", l3 = "[object Function]", d3 = "[object Map]", f3 = "[object Number]", p3 = "[object Object]", h3 = "[object RegExp]", m3 = "[object Set]", g3 = "[object String]", y3 = "[object WeakMap]", v3 = "[object ArrayBuffer]", _3 = "[object DataView]", T3 = "[object Float32Array]", R3 = "[object Float64Array]", b3 = "[object Int8Array]", A3 = "[object Int16Array]", P3 = "[object Int32Array]", S3 = "[object Uint8Array]", C3 = "[object Uint8ClampedArray]", E3 = "[object Uint16Array]", N3 = "[object Uint32Array]", et = {}; et[T3] = et[R3] = et[b3] = et[A3] = et[P3] = et[S3] = et[C3] = et[E3] = et[N3] = !0; et[o3] = et[a3] = et[v3] = et[s3] = et[_3] = et[u3] = et[c3] = et[l3] = et[d3] = et[f3] = et[p3] = et[h3] = et[m3] = et[g3] = et[y3] = !1; function k3(t) { return i3(t) && n3(t.length) && !!et[r3(t)] } HC.exports = k3 }); var _s = f((Vpe, BC) => { function w3(t) { return function (e) { return t(e) } } BC.exports = w3 }); var dc = f((cc, Ts) => { var O3 = bv(), KC = typeof cc == "object" && cc && !cc.nodeType && cc, lc = KC && typeof Ts == "object" && Ts && !Ts.nodeType && Ts, D3 = lc && lc.exports === KC, Ov = D3 && O3.process, I3 = function () { try { var t = lc && lc.require && lc.require("util").types; return t || Ov && Ov.binding && Ov.binding("util") } catch { } }(); Ts.exports = I3 }); var ff = f((Ype, YC) => { var x3 = WC(), q3 = _s(), zC = dc(), VC = zC && zC.isTypedArray, L3 = VC ? q3(VC) : x3; YC.exports = L3 }); var Or = f((Xpe, XC) => { var M3 = Rv(), $3 = ys(), F3 = ac(), j3 = qe(), U3 = Sn(), G3 = uc(), H3 = hs(), W3 = ff(), B3 = "[object Map]", K3 = "[object Set]", z3 = Object.prototype, V3 = z3.hasOwnProperty; function Y3(t) { if (t == null) return !0; if (U3(t) && (j3(t) || typeof t == "string" || typeof t.splice == "function" || G3(t) || W3(t) || F3(t))) return !t.length; var e = $3(t); if (e == B3 || e == K3) return !t.size; if (H3(t)) return !M3(t).length; for (var r in t) if (V3.call(t, r)) return !1; return !0 } XC.exports = Y3 }); var Rs = f((Jpe, JC) => { function X3(t, e) { for (var r = -1, n = t == null ? 0 : t.length, i = Array(n); ++r < n;)i[r] = e(t[r], r, t); return i } JC.exports = X3 }); var ZC = f((Qpe, QC) => { function J3() { this.__data__ = [], this.size = 0 } QC.exports = J3 }); var bs = f((Zpe, eE) => { function Q3(t, e) { return t === e || t !== t && e !== e } eE.exports = Q3 }); var fc = f((ehe, tE) => { var Z3 = bs(); function e4(t, e) { for (var r = t.length; r--;)if (Z3(t[r][0], e)) return r; return -1 } tE.exports = e4 }); var nE = f((the, rE) => { var t4 = fc(), r4 = Array.prototype, n4 = r4.splice; function i4(t) { var e = this.__data__, r = t4(e, t); if (r < 0) return !1; var n = e.length - 1; return r == n ? e.pop() : n4.call(e, r, 1), --this.size, !0 } rE.exports = i4 }); var oE = f((rhe, iE) => { var o4 = fc(); function a4(t) { var e = this.__data__, r = o4(e, t); return r < 0 ? void 0 : e[r][1] } iE.exports = a4 }); var sE = f((nhe, aE) => { var s4 = fc(); function u4(t) { return s4(this.__data__, t) > -1 } aE.exports = u4 }); var cE = f((ihe, uE) => { var c4 = fc(); function l4(t, e) { var r = this.__data__, n = c4(r, t); return n < 0 ? (++this.size, r.push([t, e])) : r[n][1] = e, this } uE.exports = l4 }); var pc = f((ohe, lE) => { var d4 = ZC(), f4 = nE(), p4 = oE(), h4 = sE(), m4 = cE(); function As(t) { var e = -1, r = t == null ? 0 : t.length; for (this.clear(); ++e < r;) { var n = t[e]; this.set(n[0], n[1]) } } As.prototype.clear = d4; As.prototype.delete = f4; As.prototype.get = p4; As.prototype.has = h4; As.prototype.set = m4; lE.exports = As }); var fE = f((ahe, dE) => { var g4 = pc(); function y4() { this.__data__ = new g4, this.size = 0 } dE.exports = y4 }); var hE = f((she, pE) => { function v4(t) { var e = this.__data__, r = e.delete(t); return this.size = e.size, r } pE.exports = v4 }); var gE = f((uhe, mE) => { function _4(t) { return this.__data__.get(t) } mE.exports = _4 }); var vE = f((che, yE) => { function T4(t) { return this.__data__.has(t) } yE.exports = T4 }); var hc = f((lhe, _E) => { var R4 = mo(), b4 = R4(Object, "create"); _E.exports = b4 }); var bE = f((dhe, RE) => { var TE = hc(); function A4() { this.__data__ = TE ? TE(null) : {}, this.size = 0 } RE.exports = A4 }); var PE = f((fhe, AE) => { function P4(t) { var e = this.has(t) && delete this.__data__[t]; return this.size -= e ? 1 : 0, e } AE.exports = P4 }); var CE = f((phe, SE) => { var S4 = hc(), C4 = "__lodash_hash_undefined__", E4 = Object.prototype, N4 = E4.hasOwnProperty; function k4(t) { var e = this.__data__; if (S4) { var r = e[t]; return r === C4 ? void 0 : r } return N4.call(e, t) ? e[t] : void 0 } SE.exports = k4 }); var NE = f((hhe, EE) => { var w4 = hc(), O4 = Object.prototype, D4 = O4.hasOwnProperty; function I4(t) { var e = this.__data__; return w4 ? e[t] !== void 0 : D4.call(e, t) } EE.exports = I4 }); var wE = f((mhe, kE) => { var x4 = hc(), q4 = "__lodash_hash_undefined__"; function L4(t, e) { var r = this.__data__; return this.size += this.has(t) ? 0 : 1, r[t] = x4 && e === void 0 ? q4 : e, this } kE.exports = L4 }); var DE = f((ghe, OE) => { var M4 = bE(), $4 = PE(), F4 = CE(), j4 = NE(), U4 = wE(); function Ps(t) { var e = -1, r = t == null ? 0 : t.length; for (this.clear(); ++e < r;) { var n = t[e]; this.set(n[0], n[1]) } } Ps.prototype.clear = M4; Ps.prototype.delete = $4; Ps.prototype.get = F4; Ps.prototype.has = j4; Ps.prototype.set = U4; OE.exports = Ps }); var qE = f((yhe, xE) => { var IE = DE(), G4 = pc(), H4 = lf(); function W4() { this.size = 0, this.__data__ = { hash: new IE, map: new (H4 || G4), string: new IE } } xE.exports = W4 }); var ME = f((vhe, LE) => { function B4(t) { var e = typeof t; return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null } LE.exports = B4 }); var mc = f((_he, $E) => { var K4 = ME(); function z4(t, e) { var r = t.__data__; return K4(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map } $E.exports = z4 }); var jE = f((The, FE) => { var V4 = mc(); function Y4(t) { var e = V4(this, t).delete(t); return this.size -= e ? 1 : 0, e } FE.exports = Y4 }); var GE = f((Rhe, UE) => { var X4 = mc(); function J4(t) { return X4(this, t).get(t) } UE.exports = J4 }); var WE = f((bhe, HE) => { var Q4 = mc(); function Z4(t) { return Q4(this, t).has(t) } HE.exports = Z4 }); var KE = f((Ahe, BE) => { var e6 = mc(); function t6(t, e) { var r = e6(this, t), n = r.size; return r.set(t, e), this.size += r.size == n ? 0 : 1, this } BE.exports = t6 }); var pf = f((Phe, zE) => { var r6 = qE(), n6 = jE(), i6 = GE(), o6 = WE(), a6 = KE(); function Ss(t) { var e = -1, r = t == null ? 0 : t.length; for (this.clear(); ++e < r;) { var n = t[e]; this.set(n[0], n[1]) } } Ss.prototype.clear = r6; Ss.prototype.delete = n6; Ss.prototype.get = i6; Ss.prototype.has = o6; Ss.prototype.set = a6; zE.exports = Ss }); var YE = f((She, VE) => { var s6 = pc(), u6 = lf(), c6 = pf(), l6 = 200; function d6(t, e) { var r = this.__data__; if (r instanceof s6) { var n = r.__data__; if (!u6 || n.length < l6 - 1) return n.push([t, e]), this.size = ++r.size, this; r = this.__data__ = new c6(n) } return r.set(t, e), this.size = r.size, this } VE.exports = d6 }); var hf = f((Che, XE) => { var f6 = pc(), p6 = fE(), h6 = hE(), m6 = gE(), g6 = vE(), y6 = YE(); function Cs(t) { var e = this.__data__ = new f6(t); this.size = e.size } Cs.prototype.clear = p6; Cs.prototype.delete = h6; Cs.prototype.get = m6; Cs.prototype.has = g6; Cs.prototype.set = y6; XE.exports = Cs }); var QE = f((Ehe, JE) => { var v6 = "__lodash_hash_undefined__"; function _6(t) { return this.__data__.set(t, v6), this } JE.exports = _6 }); var eN = f((Nhe, ZE) => { function T6(t) { return this.__data__.has(t) } ZE.exports = T6 }); var gf = f((khe, tN) => { var R6 = pf(), b6 = QE(), A6 = eN(); function mf(t) { var e = -1, r = t == null ? 0 : t.length; for (this.__data__ = new R6; ++e < r;)this.add(t[e]) } mf.prototype.add = mf.prototype.push = b6; mf.prototype.has = A6; tN.exports = mf }); var Dv = f((whe, rN) => { function P6(t, e) { for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)if (e(t[r], r, t)) return !0; return !1 } rN.exports = P6 }); var yf = f((Ohe, nN) => { function S6(t, e) { return t.has(e) } nN.exports = S6 }); var Iv = f((Dhe, iN) => { var C6 = gf(), E6 = Dv(), N6 = yf(), k6 = 1, w6 = 2; function O6(t, e, r, n, i, o) { var a = r & k6, s = t.length, u = e.length; if (s != u && !(a && u > s)) return !1; var c = o.get(t), l = o.get(e); if (c && l) return c == e && l == t; var d = -1, h = !0, y = r & w6 ? new C6 : void 0; for (o.set(t, e), o.set(e, t); ++d < s;) { var m = t[d], R = e[d]; if (n) var C = a ? n(R, m, d, e, t, o) : n(m, R, d, t, e, o); if (C !== void 0) { if (C) continue; h = !1; break } if (y) { if (!E6(e, function (E, A) { if (!N6(y, A) && (m === E || i(m, E, r, n, o))) return y.push(A) })) { h = !1; break } } else if (!(m === R || i(m, R, r, n, o))) { h = !1; break } } return o.delete(t), o.delete(e), h } iN.exports = O6 }); var xv = f((Ihe, oN) => { var D6 = bn(), I6 = D6.Uint8Array; oN.exports = I6 }); var sN = f((xhe, aN) => { function x6(t) { var e = -1, r = Array(t.size); return t.forEach(function (n, i) { r[++e] = [i, n] }), r } aN.exports = x6 }); var vf = f((qhe, uN) => { function q6(t) { var e = -1, r = Array(t.size); return t.forEach(function (n) { r[++e] = n }), r } uN.exports = q6 }); var pN = f((Lhe, fN) => { var cN = ta(), lN = xv(), L6 = bs(), M6 = Iv(), $6 = sN(), F6 = vf(), j6 = 1, U6 = 2, G6 = "[object Boolean]", H6 = "[object Date]", W6 = "[object Error]", B6 = "[object Map]", K6 = "[object Number]", z6 = "[object RegExp]", V6 = "[object Set]", Y6 = "[object String]", X6 = "[object Symbol]", J6 = "[object ArrayBuffer]", Q6 = "[object DataView]", dN = cN ? cN.prototype : void 0, qv = dN ? dN.valueOf : void 0; function Z6(t, e, r, n, i, o, a) { switch (r) { case Q6: if (t.byteLength != e.byteLength || t.byteOffset != e.byteOffset) return !1; t = t.buffer, e = e.buffer; case J6: return !(t.byteLength != e.byteLength || !o(new lN(t), new lN(e))); case G6: case H6: case K6: return L6(+t, +e); case W6: return t.name == e.name && t.message == e.message; case z6: case Y6: return t == e + ""; case B6: var s = $6; case V6: var u = n & j6; if (s || (s = F6), t.size != e.size && !u) return !1; var c = a.get(t); if (c) return c == e; n |= U6, a.set(t, e); var l = M6(s(t), s(e), n, i, o, a); return a.delete(t), l; case X6: if (qv) return qv.call(t) == qv.call(e) }return !1 } fN.exports = Z6 }); var _f = f((Mhe, hN) => { function e9(t, e) { for (var r = -1, n = e.length, i = t.length; ++r < n;)t[i + r] = e[r]; return t } hN.exports = e9 }); var Lv = f(($he, mN) => { var t9 = _f(), r9 = qe(); function n9(t, e, r) { var n = e(t); return r9(t) ? n : t9(n, r(t)) } mN.exports = n9 }); var Tf = f((Fhe, gN) => { function i9(t, e) { for (var r = -1, n = t == null ? 0 : t.length, i = 0, o = []; ++r < n;) { var a = t[r]; e(a, r, t) && (o[i++] = a) } return o } gN.exports = i9 }); var Mv = f((jhe, yN) => { function o9() { return [] } yN.exports = o9 }); var Rf = f((Uhe, _N) => { var a9 = Tf(), s9 = Mv(), u9 = Object.prototype, c9 = u9.propertyIsEnumerable, vN = Object.getOwnPropertySymbols, l9 = vN ? function (t) { return t == null ? [] : (t = Object(t), a9(vN(t), function (e) { return c9.call(t, e) })) } : s9; _N.exports = l9 }); var RN = f((Ghe, TN) => { function d9(t, e) { for (var r = -1, n = Array(t); ++r < t;)n[r] = e(r); return n } TN.exports = d9 }); var gc = f((Hhe, bN) => { var f9 = 9007199254740991, p9 = /^(?:0|[1-9]\d*)$/; function h9(t, e) { var r = typeof t; return e = e ?? f9, !!e && (r == "number" || r != "symbol" && p9.test(t)) && t > -1 && t % 1 == 0 && t < e } bN.exports = h9 }); var $v = f((Whe, AN) => { var m9 = RN(), g9 = ac(), y9 = qe(), v9 = uc(), _9 = gc(), T9 = ff(), R9 = Object.prototype, b9 = R9.hasOwnProperty; function A9(t, e) { var r = y9(t), n = !r && g9(t), i = !r && !n && v9(t), o = !r && !n && !i && T9(t), a = r || n || i || o, s = a ? m9(t.length, String) : [], u = s.length; for (var c in t) (e || b9.call(t, c)) && !(a && (c == "length" || i && (c == "offset" || c == "parent") || o && (c == "buffer" || c == "byteLength" || c == "byteOffset") || _9(c, u))) && s.push(c); return s } AN.exports = A9 }); var Dr = f((Bhe, PN) => { var P9 = $v(), S9 = Rv(), C9 = Sn(); function E9(t) { return C9(t) ? P9(t) : S9(t) } PN.exports = E9 }); var Fv = f((Khe, SN) => { var N9 = Lv(), k9 = Rf(), w9 = Dr(); function O9(t) { return N9(t, w9, k9) } SN.exports = O9 }); var NN = f((zhe, EN) => { var CN = Fv(), D9 = 1, I9 = Object.prototype, x9 = I9.hasOwnProperty; function q9(t, e, r, n, i, o) { var a = r & D9, s = CN(t), u = s.length, c = CN(e), l = c.length; if (u != l && !a) return !1; for (var d = u; d--;) { var h = s[d]; if (!(a ? h in e : x9.call(e, h))) return !1 } var y = o.get(t), m = o.get(e); if (y && m) return y == e && m == t; var R = !0; o.set(t, e), o.set(e, t); for (var C = a; ++d < u;) { h = s[d]; var E = t[h], A = e[h]; if (n) var b = a ? n(A, E, h, e, t, o) : n(E, A, h, t, e, o); if (!(b === void 0 ? E === A || i(E, A, r, n, o) : b)) { R = !1; break } C || (C = h == "constructor") } if (R && !C) { var O = t.constructor, L = e.constructor; O != L && "constructor" in t && "constructor" in e && !(typeof O == "function" && O instanceof O && typeof L == "function" && L instanceof L) && (R = !1) } return o.delete(t), o.delete(e), R } EN.exports = q9 }); var LN = f((Vhe, qN) => { var jv = hf(), L9 = Iv(), M9 = pN(), $9 = NN(), kN = ys(), wN = qe(), ON = uc(), F9 = ff(), j9 = 1, DN = "[object Arguments]", IN = "[object Array]", bf = "[object Object]", U9 = Object.prototype, xN = U9.hasOwnProperty; function G9(t, e, r, n, i, o) { var a = wN(t), s = wN(e), u = a ? IN : kN(t), c = s ? IN : kN(e); u = u == DN ? bf : u, c = c == DN ? bf : c; var l = u == bf, d = c == bf, h = u == c; if (h && ON(t)) { if (!ON(e)) return !1; a = !0, l = !1 } if (h && !l) return o || (o = new jv), a || F9(t) ? L9(t, e, r, n, i, o) : M9(t, e, u, r, n, i, o); if (!(r & j9)) { var y = l && xN.call(t, "__wrapped__"), m = d && xN.call(e, "__wrapped__"); if (y || m) { var R = y ? t.value() : t, C = m ? e.value() : e; return o || (o = new jv), i(R, C, r, n, o) } } return h ? (o || (o = new jv), $9(t, e, r, n, i, o)) : !1 } qN.exports = G9 }); var Uv = f((Yhe, FN) => { var H9 = LN(), MN = Pn(); function $N(t, e, r, n, i) { return t === e ? !0 : t == null || e == null || !MN(t) && !MN(e) ? t !== t && e !== e : H9(t, e, r, n, $N, i) } FN.exports = $N }); var UN = f((Xhe, jN) => { var W9 = hf(), B9 = Uv(), K9 = 1, z9 = 2; function V9(t, e, r, n) { var i = r.length, o = i, a = !n; if (t == null) return !o; for (t = Object(t); i--;) { var s = r[i]; if (a && s[2] ? s[1] !== t[s[0]] : !(s[0] in t)) return !1 } for (; ++i < o;) { s = r[i]; var u = s[0], c = t[u], l = s[1]; if (a && s[2]) { if (c === void 0 && !(u in t)) return !1 } else { var d = new W9; if (n) var h = n(c, l, u, t, e, d); if (!(h === void 0 ? B9(l, c, K9 | z9, n, d) : h)) return !1 } } return !0 } jN.exports = V9 }); var Gv = f((Jhe, GN) => { var Y9 = An(); function X9(t) { return t === t && !Y9(t) } GN.exports = X9 }); var WN = f((Qhe, HN) => { var J9 = Gv(), Q9 = Dr(); function Z9(t) { for (var e = Q9(t), r = e.length; r--;) { var n = e[r], i = t[n]; e[r] = [n, i, J9(i)] } return e } HN.exports = Z9 }); var Hv = f((Zhe, BN) => { function e8(t, e) { return function (r) { return r == null ? !1 : r[t] === e && (e !== void 0 || t in Object(r)) } } BN.exports = e8 }); var zN = f((eme, KN) => { var t8 = UN(), r8 = WN(), n8 = Hv(); function i8(t) { var e = r8(t); return e.length == 1 && e[0][2] ? n8(e[0][0], e[0][1]) : function (r) { return r === t || t8(r, t, e) } } KN.exports = i8 }); var Es = f((tme, VN) => { var o8 = ho(), a8 = Pn(), s8 = "[object Symbol]"; function u8(t) { return typeof t == "symbol" || a8(t) && o8(t) == s8 } VN.exports = u8 }); var Af = f((rme, YN) => { var c8 = qe(), l8 = Es(), d8 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, f8 = /^\w*$/; function p8(t, e) { if (c8(t)) return !1; var r = typeof t; return r == "number" || r == "symbol" || r == "boolean" || t == null || l8(t) ? !0 : f8.test(t) || !d8.test(t) || e != null && t in Object(e) } YN.exports = p8 }); var QN = f((nme, JN) => { var XN = pf(), h8 = "Expected a function"; function Wv(t, e) { if (typeof t != "function" || e != null && typeof e != "function") throw new TypeError(h8); var r = function () { var n = arguments, i = e ? e.apply(this, n) : n[0], o = r.cache; if (o.has(i)) return o.get(i); var a = t.apply(this, n); return r.cache = o.set(i, a) || o, a }; return r.cache = new (Wv.Cache || XN), r } Wv.Cache = XN; JN.exports = Wv }); var ek = f((ime, ZN) => { var m8 = QN(), g8 = 500; function y8(t) { var e = m8(t, function (n) { return r.size === g8 && r.clear(), n }), r = e.cache; return e } ZN.exports = y8 }); var rk = f((ome, tk) => { var v8 = ek(), _8 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, T8 = /\\(\\)?/g, R8 = v8(function (t) { var e = []; return t.charCodeAt(0) === 46 && e.push(""), t.replace(_8, function (r, n, i, o) { e.push(i ? o.replace(T8, "$1") : n || r) }), e }); tk.exports = R8 }); var uk = f((ame, sk) => { var nk = ta(), b8 = Rs(), A8 = qe(), P8 = Es(), S8 = 1 / 0, ik = nk ? nk.prototype : void 0, ok = ik ? ik.toString : void 0; function ak(t) { if (typeof t == "string") return t; if (A8(t)) return b8(t, ak) + ""; if (P8(t)) return ok ? ok.call(t) : ""; var e = t + ""; return e == "0" && 1 / t == -S8 ? "-0" : e } sk.exports = ak }); var Bv = f((sme, ck) => { var C8 = uk(); function E8(t) { return t == null ? "" : C8(t) } ck.exports = E8 }); var yc = f((ume, lk) => { var N8 = qe(), k8 = Af(), w8 = rk(), O8 = Bv(); function D8(t, e) { return N8(t) ? t : k8(t, e) ? [t] : w8(O8(t)) } lk.exports = D8 }); var Ns = f((cme, dk) => { var I8 = Es(), x8 = 1 / 0; function q8(t) { if (typeof t == "string" || I8(t)) return t; var e = t + ""; return e == "0" && 1 / t == -x8 ? "-0" : e } dk.exports = q8 }); var Pf = f((lme, fk) => { var L8 = yc(), M8 = Ns(); function $8(t, e) { e = L8(e, t); for (var r = 0, n = e.length; t != null && r < n;)t = t[M8(e[r++])]; return r && r == n ? t : void 0 } fk.exports = $8 }); var hk = f((dme, pk) => { var F8 = Pf(); function j8(t, e, r) { var n = t == null ? void 0 : F8(t, e); return n === void 0 ? r : n } pk.exports = j8 }); var gk = f((fme, mk) => { function U8(t, e) { return t != null && e in Object(t) } mk.exports = U8 }); var Kv = f((pme, yk) => { var G8 = yc(), H8 = ac(), W8 = qe(), B8 = gc(), K8 = df(), z8 = Ns(); function V8(t, e, r) { e = G8(e, t); for (var n = -1, i = e.length, o = !1; ++n < i;) { var a = z8(e[n]); if (!(o = t != null && r(t, a))) break; t = t[a] } return o || ++n != i ? o : (i = t == null ? 0 : t.length, !!i && K8(i) && B8(a, i) && (W8(t) || H8(t))) } yk.exports = V8 }); var _k = f((hme, vk) => { var Y8 = gk(), X8 = Kv(); function J8(t, e) { return t != null && X8(t, e, Y8) } vk.exports = J8 }); var Rk = f((mme, Tk) => { var Q8 = Uv(), Z8 = hk(), e5 = _k(), t5 = Af(), r5 = Gv(), n5 = Hv(), i5 = Ns(), o5 = 1, a5 = 2; function s5(t, e) { return t5(t) && r5(e) ? n5(i5(t), e) : function (r) { var n = Z8(r, t); return n === void 0 && n === e ? e5(r, t) : Q8(e, n, o5 | a5) } } Tk.exports = s5 }); var na = f((gme, bk) => { function u5(t) { return t } bk.exports = u5 }); var Pk = f((yme, Ak) => { function c5(t) { return function (e) { return e?.[t] } } Ak.exports = c5 }); var Ck = f((vme, Sk) => { var l5 = Pf(); function d5(t) { return function (e) { return l5(e, t) } } Sk.exports = d5 }); var Nk = f((_me, Ek) => { var f5 = Pk(), p5 = Ck(), h5 = Af(), m5 = Ns(); function g5(t) { return h5(t) ? f5(m5(t)) : p5(t) } Ek.exports = g5 }); var Xr = f((Tme, kk) => { var y5 = zN(), v5 = Rk(), _5 = na(), T5 = qe(), R5 = Nk(); function b5(t) { return typeof t == "function" ? t : t == null ? _5 : typeof t == "object" ? T5(t) ? v5(t[0], t[1]) : y5(t) : R5(t) } kk.exports = b5 }); var Ok = f((Rme, wk) => { function A5(t) { return function (e, r, n) { for (var i = -1, o = Object(e), a = n(e), s = a.length; s--;) { var u = a[t ? s : ++i]; if (r(o[u], u, o) === !1) break } return e } } wk.exports = A5 }); var Ik = f((bme, Dk) => { var P5 = Ok(), S5 = P5(); Dk.exports = S5 }); var qk = f((Ame, xk) => { var C5 = Ik(), E5 = Dr(); function N5(t, e) { return t && C5(t, e, E5) } xk.exports = N5 }); var Mk = f((Pme, Lk) => { var k5 = Sn(); function w5(t, e) { return function (r, n) { if (r == null) return r; if (!k5(r)) return t(r, n); for (var i = r.length, o = e ? i : -1, a = Object(r); (e ? o-- : ++o < i) && n(a[o], o, a) !== !1;); return r } } Lk.exports = w5 }); var go = f((Sme, $k) => { var O5 = qk(), D5 = Mk(), I5 = D5(O5); $k.exports = I5 }); var jk = f((Cme, Fk) => { var x5 = go(), q5 = Sn(); function L5(t, e) { var r = -1, n = q5(t) ? Array(t.length) : []; return x5(t, function (i, o, a) { n[++r] = e(i, o, a) }), n } Fk.exports = L5 }); var Ut = f((Eme, Uk) => { var M5 = Rs(), $5 = Xr(), F5 = jk(), j5 = qe(); function U5(t, e) { var r = j5(t) ? M5 : F5; return r(t, $5(e, 3)) } Uk.exports = U5 }); var zv = f((Nme, Gk) => { function G5(t, e) { for (var r = -1, n = t == null ? 0 : t.length; ++r < n && e(t[r], r, t) !== !1;); return t } Gk.exports = G5 }); var Wk = f((kme, Hk) => { var H5 = na(); function W5(t) { return typeof t == "function" ? t : H5 } Hk.exports = W5 }); var Gt = f((wme, Bk) => { var B5 = zv(), K5 = go(), z5 = Wk(), V5 = qe(); function Y5(t, e) { var r = V5(t) ? B5 : K5; return r(t, z5(e)) } Bk.exports = Y5 }); var zk = f((Ome, Kk) => { var X5 = Rs(); function J5(t, e) { return X5(e, function (r) { return t[r] }) } Kk.exports = J5 }); var Yn = f((Dme, Vk) => { var Q5 = zk(), Z5 = Dr(); function eY(t) { return t == null ? [] : Q5(t, Z5(t)) } Vk.exports = eY }); var Xk = f((Ime, Yk) => { var tY = Object.prototype, rY = tY.hasOwnProperty; function nY(t, e) { return t != null && rY.call(t, e) } Yk.exports = nY }); var Ir = f((xme, Jk) => { var iY = Xk(), oY = Kv(); function aY(t, e) { return t != null && oY(t, e, iY) } Jk.exports = aY }); var Vv = f((qme, Qk) => { var sY = mo(), uY = function () { try { var t = sY(Object, "defineProperty"); return t({}, "", {}), t } catch { } }(); Qk.exports = uY }); var Sf = f((Lme, ew) => { var Zk = Vv(); function cY(t, e, r) { e == "__proto__" && Zk ? Zk(t, e, { configurable: !0, enumerable: !0, value: r, writable: !0 }) : t[e] = r } ew.exports = cY }); var vc = f((Mme, tw) => { var lY = Sf(), dY = bs(), fY = Object.prototype, pY = fY.hasOwnProperty; function hY(t, e, r) { var n = t[e]; (!(pY.call(t, e) && dY(n, r)) || r === void 0 && !(e in t)) && lY(t, e, r) } tw.exports = hY }); var ks = f(($me, rw) => { var mY = vc(), gY = Sf(); function yY(t, e, r, n) { var i = !r; r || (r = {}); for (var o = -1, a = e.length; ++o < a;) { var s = e[o], u = n ? n(r[s], t[s], s, r, t) : void 0; u === void 0 && (u = t[s]), i ? gY(r, s, u) : mY(r, s, u) } return r } rw.exports = yY }); var iw = f((Fme, nw) => { var vY = ks(), _Y = Dr(); function TY(t, e) { return t && vY(e, _Y(e), t) } nw.exports = TY }); var aw = f((jme, ow) => { function RY(t) { var e = []; if (t != null) for (var r in Object(t)) e.push(r); return e } ow.exports = RY }); var uw = f((Ume, sw) => { var bY = An(), AY = hs(), PY = aw(), SY = Object.prototype, CY = SY.hasOwnProperty; function EY(t) { if (!bY(t)) return PY(t); var e = AY(t), r = []; for (var n in t) n == "constructor" && (e || !CY.call(t, n)) || r.push(n); return r } sw.exports = EY }); var _c = f((Gme, cw) => { var NY = $v(), kY = uw(), wY = Sn(); function OY(t) { return wY(t) ? NY(t, !0) : kY(t) } cw.exports = OY }); var dw = f((Hme, lw) => { var DY = ks(), IY = _c(); function xY(t, e) { return t && DY(e, IY(e), t) } lw.exports = xY }); var gw = f((Tc, ws) => { var qY = bn(), mw = typeof Tc == "object" && Tc && !Tc.nodeType && Tc, fw = mw && typeof ws == "object" && ws && !ws.nodeType && ws, LY = fw && fw.exports === mw, pw = LY ? qY.Buffer : void 0, hw = pw ? pw.allocUnsafe : void 0; function MY(t, e) { if (e) return t.slice(); var r = t.length, n = hw ? hw(r) : new t.constructor(r); return t.copy(n), n } ws.exports = MY }); var vw = f((Wme, yw) => { function $Y(t, e) { var r = -1, n = t.length; for (e || (e = Array(n)); ++r < n;)e[r] = t[r]; return e } yw.exports = $Y }); var Tw = f((Bme, _w) => { var FY = ks(), jY = Rf(); function UY(t, e) { return FY(t, jY(t), e) } _w.exports = UY }); var Yv = f((Kme, Rw) => { var GY = Tv(), HY = GY(Object.getPrototypeOf, Object); Rw.exports = HY }); var Xv = f((zme, bw) => { var WY = _f(), BY = Yv(), KY = Rf(), zY = Mv(), VY = Object.getOwnPropertySymbols, YY = VY ? function (t) { for (var e = []; t;)WY(e, KY(t)), t = BY(t); return e } : zY; bw.exports = YY }); var Pw = f((Vme, Aw) => { var XY = ks(), JY = Xv(); function QY(t, e) { return XY(t, JY(t), e) } Aw.exports = QY }); var Jv = f((Yme, Sw) => { var ZY = Lv(), eX = Xv(), tX = _c(); function rX(t) { return ZY(t, tX, eX) } Sw.exports = rX }); var Ew = f((Xme, Cw) => { var nX = Object.prototype, iX = nX.hasOwnProperty; function oX(t) { var e = t.length, r = new t.constructor(e); return e && typeof t[0] == "string" && iX.call(t, "index") && (r.index = t.index, r.input = t.input), r } Cw.exports = oX }); var Cf = f((Jme, kw) => { var Nw = xv(); function aX(t) { var e = new t.constructor(t.byteLength); return new Nw(e).set(new Nw(t)), e } kw.exports = aX }); var Ow = f((Qme, ww) => { var sX = Cf(); function uX(t, e) { var r = e ? sX(t.buffer) : t.buffer; return new t.constructor(r, t.byteOffset, t.byteLength) } ww.exports = uX }); var Iw = f((Zme, Dw) => { var cX = /\w*$/; function lX(t) { var e = new t.constructor(t.source, cX.exec(t)); return e.lastIndex = t.lastIndex, e } Dw.exports = lX }); var $w = f((ege, Mw) => { var xw = ta(), qw = xw ? xw.prototype : void 0, Lw = qw ? qw.valueOf : void 0; function dX(t) { return Lw ? Object(Lw.call(t)) : {} } Mw.exports = dX }); var jw = f((tge, Fw) => { var fX = Cf(); function pX(t, e) { var r = e ? fX(t.buffer) : t.buffer; return new t.constructor(r, t.byteOffset, t.length) } Fw.exports = pX }); var Gw = f((rge, Uw) => { var hX = Cf(), mX = Ow(), gX = Iw(), yX = $w(), vX = jw(), _X = "[object Boolean]", TX = "[object Date]", RX = "[object Map]", bX = "[object Number]", AX = "[object RegExp]", PX = "[object Set]", SX = "[object String]", CX = "[object Symbol]", EX = "[object ArrayBuffer]", NX = "[object DataView]", kX = "[object Float32Array]", wX = "[object Float64Array]", OX = "[object Int8Array]", DX = "[object Int16Array]", IX = "[object Int32Array]", xX = "[object Uint8Array]", qX = "[object Uint8ClampedArray]", LX = "[object Uint16Array]", MX = "[object Uint32Array]"; function $X(t, e, r) { var n = t.constructor; switch (e) { case EX: return hX(t); case _X: case TX: return new n(+t); case NX: return mX(t, r); case kX: case wX: case OX: case DX: case IX: case xX: case qX: case LX: case MX: return vX(t, r); case RX: return new n; case bX: case SX: return new n(t); case AX: return gX(t); case PX: return new n; case CX: return yX(t) } } Uw.exports = $X }); var Bw = f((nge, Ww) => { var FX = An(), Hw = Object.create, jX = function () { function t() { } return function (e) { if (!FX(e)) return {}; if (Hw) return Hw(e); t.prototype = e; var r = new t; return t.prototype = void 0, r } }(); Ww.exports = jX }); var zw = f((ige, Kw) => { var UX = Bw(), GX = Yv(), HX = hs(); function WX(t) { return typeof t.constructor == "function" && !HX(t) ? UX(GX(t)) : {} } Kw.exports = WX }); var Yw = f((oge, Vw) => { var BX = ys(), KX = Pn(), zX = "[object Map]"; function VX(t) { return KX(t) && BX(t) == zX } Vw.exports = VX }); var Zw = f((age, Qw) => { var YX = Yw(), XX = _s(), Xw = dc(), Jw = Xw && Xw.isMap, JX = Jw ? XX(Jw) : YX; Qw.exports = JX }); var tO = f((sge, eO) => { var QX = ys(), ZX = Pn(), e7 = "[object Set]"; function t7(t) { return ZX(t) && QX(t) == e7 } eO.exports = t7 }); var oO = f((uge, iO) => { var r7 = tO(), n7 = _s(), rO = dc(), nO = rO && rO.isSet, i7 = nO ? n7(nO) : r7; iO.exports = i7 }); var lO = f((cge, cO) => { var o7 = hf(), a7 = zv(), s7 = vc(), u7 = iw(), c7 = dw(), l7 = gw(), d7 = vw(), f7 = Tw(), p7 = Pw(), h7 = Fv(), m7 = Jv(), g7 = ys(), y7 = Ew(), v7 = Gw(), _7 = zw(), T7 = qe(), R7 = uc(), b7 = Zw(), A7 = An(), P7 = oO(), S7 = Dr(), C7 = _c(), E7 = 1, N7 = 2, k7 = 4, aO = "[object Arguments]", w7 = "[object Array]", O7 = "[object Boolean]", D7 = "[object Date]", I7 = "[object Error]", sO = "[object Function]", x7 = "[object GeneratorFunction]", q7 = "[object Map]", L7 = "[object Number]", uO = "[object Object]", M7 = "[object RegExp]", $7 = "[object Set]", F7 = "[object String]", j7 = "[object Symbol]", U7 = "[object WeakMap]", G7 = "[object ArrayBuffer]", H7 = "[object DataView]", W7 = "[object Float32Array]", B7 = "[object Float64Array]", K7 = "[object Int8Array]", z7 = "[object Int16Array]", V7 = "[object Int32Array]", Y7 = "[object Uint8Array]", X7 = "[object Uint8ClampedArray]", J7 = "[object Uint16Array]", Q7 = "[object Uint32Array]", Xe = {}; Xe[aO] = Xe[w7] = Xe[G7] = Xe[H7] = Xe[O7] = Xe[D7] = Xe[W7] = Xe[B7] = Xe[K7] = Xe[z7] = Xe[V7] = Xe[q7] = Xe[L7] = Xe[uO] = Xe[M7] = Xe[$7] = Xe[F7] = Xe[j7] = Xe[Y7] = Xe[X7] = Xe[J7] = Xe[Q7] = !0; Xe[I7] = Xe[sO] = Xe[U7] = !1; function Ef(t, e, r, n, i, o) { var a, s = e & E7, u = e & N7, c = e & k7; if (r && (a = i ? r(t, n, i, o) : r(t)), a !== void 0) return a; if (!A7(t)) return t; var l = T7(t); if (l) { if (a = y7(t), !s) return d7(t, a) } else { var d = g7(t), h = d == sO || d == x7; if (R7(t)) return l7(t, s); if (d == uO || d == aO || h && !i) { if (a = u || h ? {} : _7(t), !s) return u ? p7(t, c7(a, t)) : f7(t, u7(a, t)) } else { if (!Xe[d]) return i ? t : {}; a = v7(t, d, s) } } o || (o = new o7); var y = o.get(t); if (y) return y; o.set(t, a), P7(t) ? t.forEach(function (C) { a.add(Ef(C, e, r, C, t, o)) }) : b7(t) && t.forEach(function (C, E) { a.set(E, Ef(C, e, r, E, t, o)) }); var m = c ? u ? m7 : h7 : u ? C7 : S7, R = l ? void 0 : m(t); return a7(R || t, function (C, E) { R && (E = C, C = t[E]), s7(a, E, Ef(C, e, r, E, t, o)) }), a } cO.exports = Ef }); var wi = f((lge, dO) => { var Z7 = lO(), eJ = 4; function tJ(t) { return Z7(t, eJ) } dO.exports = tJ }); var fO = f(Os => { "use strict"; Object.defineProperty(Os, "__esModule", { value: !0 }); Os.PRINT_WARNING = Os.PRINT_ERROR = void 0; function rJ(t) { console && console.error && console.error("Error: ".concat(t)) } Os.PRINT_ERROR = rJ; function nJ(t) { console && console.warn && console.warn("Warning: ".concat(t)) } Os.PRINT_WARNING = nJ }); var pO = f(Nf => { "use strict"; Object.defineProperty(Nf, "__esModule", { value: !0 }); Nf.timer = void 0; function iJ(t) { var e = new Date().getTime(), r = t(), n = new Date().getTime(), i = n - e; return { time: i, value: r } } Nf.timer = iJ }); var hO = f((exports, module) => { "use strict"; Object.defineProperty(exports, "__esModule", { value: !0 }); exports.toFastProperties = void 0; function toFastProperties(toBecomeFast) { function FakeConstructor() { } FakeConstructor.prototype = toBecomeFast; var fakeInstance = new FakeConstructor; function fakeAccess() { return typeof fakeInstance.bar } return fakeAccess(), fakeAccess(), toBecomeFast; eval(toBecomeFast) } exports.toFastProperties = toFastProperties }); var Ds = f(Xn => { "use strict"; Object.defineProperty(Xn, "__esModule", { value: !0 }); Xn.toFastProperties = Xn.timer = Xn.PRINT_ERROR = Xn.PRINT_WARNING = void 0; var mO = fO(); Object.defineProperty(Xn, "PRINT_WARNING", { enumerable: !0, get: function () { return mO.PRINT_WARNING } }); Object.defineProperty(Xn, "PRINT_ERROR", { enumerable: !0, get: function () { return mO.PRINT_ERROR } }); var oJ = pO(); Object.defineProperty(Xn, "timer", { enumerable: !0, get: function () { return oJ.timer } }); var aJ = hO(); Object.defineProperty(Xn, "toFastProperties", { enumerable: !0, get: function () { return aJ.toFastProperties } }) }); var kf = f((hge, gO) => { function sJ(t, e, r) { var n = -1, i = t.length; e < 0 && (e = -e > i ? 0 : i + e), r = r > i ? i : r, r < 0 && (r += i), i = e > r ? 0 : r - e >>> 0, e >>>= 0; for (var o = Array(i); ++n < i;)o[n] = t[n + e]; return o } gO.exports = sJ }); var vO = f((mge, yO) => { var uJ = /\s/; function cJ(t) { for (var e = t.length; e-- && uJ.test(t.charAt(e));); return e } yO.exports = cJ }); var TO = f((gge, _O) => { var lJ = vO(), dJ = /^\s+/; function fJ(t) { return t && t.slice(0, lJ(t) + 1).replace(dJ, "") } _O.exports = fJ }); var PO = f((yge, AO) => { var pJ = TO(), RO = An(), hJ = Es(), bO = 0 / 0, mJ = /^[-+]0x[0-9a-f]+$/i, gJ = /^0b[01]+$/i, yJ = /^0o[0-7]+$/i, vJ = parseInt; function _J(t) { if (typeof t == "number") return t; if (hJ(t)) return bO; if (RO(t)) { var e = typeof t.valueOf == "function" ? t.valueOf() : t; t = RO(e) ? e + "" : e } if (typeof t != "string") return t === 0 ? t : +t; t = pJ(t); var r = gJ.test(t); return r || yJ.test(t) ? vJ(t.slice(2), r ? 2 : 8) : mJ.test(t) ? bO : +t } AO.exports = _J }); var EO = f((vge, CO) => { var TJ = PO(), SO = 1 / 0, RJ = 17976931348623157e292; function bJ(t) { if (!t) return t === 0 ? t : 0; if (t = TJ(t), t === SO || t === -SO) { var e = t < 0 ? -1 : 1; return e * RJ } return t === t ? t : 0 } CO.exports = bJ }); var Is = f((_ge, NO) => { var AJ = EO(); function PJ(t) { var e = AJ(t), r = e % 1; return e === e ? r ? e - r : e : 0 } NO.exports = PJ }); var wf = f((Tge, kO) => { var SJ = kf(), CJ = Is(); function EJ(t, e, r) { var n = t == null ? 0 : t.length; return n ? (e = r || e === void 0 ? 1 : CJ(e), SJ(t, e < 0 ? 0 : e, n)) : [] } kO.exports = EJ }); var Rc = f((Rge, wO) => { var NJ = ho(), kJ = qe(), wJ = Pn(), OJ = "[object String]"; function DJ(t) { return typeof t == "string" || !kJ(t) && wJ(t) && NJ(t) == OJ } wO.exports = DJ }); var DO = f((bge, OO) => { var IJ = ho(), xJ = Pn(), qJ = "[object RegExp]"; function LJ(t) { return xJ(t) && IJ(t) == qJ } OO.exports = LJ }); var Qv = f((Age, qO) => { var MJ = DO(), $J = _s(), IO = dc(), xO = IO && IO.isRegExp, FJ = xO ? $J(xO) : MJ; qO.exports = FJ }); var $O = f((Pge, MO) => { var jJ = vc(), UJ = yc(), GJ = gc(), LO = An(), HJ = Ns(); function WJ(t, e, r, n) { if (!LO(t)) return t; e = UJ(e, t); for (var i = -1, o = e.length, a = o - 1, s = t; s != null && ++i < o;) { var u = HJ(e[i]), c = r; if (u === "__proto__" || u === "constructor" || u === "prototype") return t; if (i != a) { var l = s[u]; c = n ? n(l, u, s) : void 0, c === void 0 && (c = LO(l) ? l : GJ(e[i + 1]) ? [] : {}) } jJ(s, u, c), s = s[u] } return t } MO.exports = WJ }); var jO = f((Sge, FO) => { var BJ = Pf(), KJ = $O(), zJ = yc(); function VJ(t, e, r) { for (var n = -1, i = e.length, o = {}; ++n < i;) { var a = e[n], s = BJ(t, a); r(s, a) && KJ(o, zJ(a, t), s) } return o } FO.exports = VJ }); var Zv = f((Cge, UO) => { var YJ = Rs(), XJ = Xr(), JJ = jO(), QJ = Jv(); function ZJ(t, e) { if (t == null) return {}; var r = YJ(QJ(t), function (n) { return [n] }); return e = XJ(e), JJ(t, r, function (n, i) { return e(n, i[0]) }) } UO.exports = ZJ }); var HO = f((Ege, GO) => { function eQ(t, e, r) { switch (r.length) { case 0: return t.call(e); case 1: return t.call(e, r[0]); case 2: return t.call(e, r[0], r[1]); case 3: return t.call(e, r[0], r[1], r[2]) }return t.apply(e, r) } GO.exports = eQ }); var KO = f((Nge, BO) => { var tQ = HO(), WO = Math.max; function rQ(t, e, r) { return e = WO(e === void 0 ? t.length - 1 : e, 0), function () { for (var n = arguments, i = -1, o = WO(n.length - e, 0), a = Array(o); ++i < o;)a[i] = n[e + i]; i = -1; for (var s = Array(e + 1); ++i < e;)s[i] = n[i]; return s[e] = r(a), tQ(t, this, s) } } BO.exports = rQ }); var VO = f((kge, zO) => { function nQ(t) { return function () { return t } } zO.exports = nQ }); var JO = f((wge, XO) => { var iQ = VO(), YO = Vv(), oQ = na(), aQ = YO ? function (t, e) { return YO(t, "toString", { configurable: !0, enumerable: !1, value: iQ(e), writable: !0 }) } : oQ; XO.exports = aQ }); var ZO = f((Oge, QO) => { var sQ = 800, uQ = 16, cQ = Date.now; function lQ(t) { var e = 0, r = 0; return function () { var n = cQ(), i = uQ - (n - r); if (r = n, i > 0) { if (++e >= sQ) return arguments[0] } else e = 0; return t.apply(void 0, arguments) } } QO.exports = lQ }); var tD = f((Dge, eD) => { var dQ = JO(), fQ = ZO(), pQ = fQ(dQ); eD.exports = pQ }); var Of = f((Ige, rD) => { var hQ = na(), mQ = KO(), gQ = tD(); function yQ(t, e) { return gQ(mQ(t, e, hQ), t + "") } rD.exports = yQ }); var bc = f((xge, nD) => { var vQ = bs(), _Q = Sn(), TQ = gc(), RQ = An(); function bQ(t, e, r) { if (!RQ(r)) return !1; var n = typeof e; return (n == "number" ? _Q(r) && TQ(e, r.length) : n == "string" && e in r) ? vQ(r[e], t) : !1 } nD.exports = bQ }); var oD = f((qge, iD) => { var AQ = Of(), PQ = bc(); function SQ(t) { return AQ(function (e, r) { var n = -1, i = r.length, o = i > 1 ? r[i - 1] : void 0, a = i > 2 ? r[2] : void 0; for (o = t.length > 3 && typeof o == "function" ? (i--, o) : void 0, a && PQ(r[0], r[1], a) && (o = i < 3 ? void 0 : o, i = 1), e = Object(e); ++n < i;) { var s = r[n]; s && t(e, s, n, o) } return e }) } iD.exports = SQ }); var Ac = f((Lge, aD) => { var CQ = vc(), EQ = ks(), NQ = oD(), kQ = Sn(), wQ = hs(), OQ = Dr(), DQ = Object.prototype, IQ = DQ.hasOwnProperty, xQ = NQ(function (t, e) { if (wQ(e) || kQ(e)) { EQ(e, OQ(e), t); return } for (var r in e) IQ.call(e, r) && CQ(t, r, e[r]) }); aD.exports = xQ }); var If = f(Pe => { "use strict"; var Oi = Pe && Pe.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), xs = Pe && Pe.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Pe, "__esModule", { value: !0 }); Pe.serializeProduction = Pe.serializeGrammar = Pe.Terminal = Pe.Alternation = Pe.RepetitionWithSeparator = Pe.Repetition = Pe.RepetitionMandatoryWithSeparator = Pe.RepetitionMandatory = Pe.Option = Pe.Alternative = Pe.Rule = Pe.NonTerminal = Pe.AbstractProduction = void 0; var sD = xs(Ut()), qQ = xs(Gt()), e_ = xs(Rc()), LQ = xs(Qv()), Jn = xs(Zv()), Qn = xs(Ac()); function MQ(t) { return $Q(t) ? t.LABEL : t.name } function $Q(t) { return (0, e_.default)(t.LABEL) && t.LABEL !== "" } var Zn = function () { function t(e) { this._definition = e } return Object.defineProperty(t.prototype, "definition", { get: function () { return this._definition }, set: function (e) { this._definition = e }, enumerable: !1, configurable: !0 }), t.prototype.accept = function (e) { e.visit(this), (0, qQ.default)(this.definition, function (r) { r.accept(e) }) }, t }(); Pe.AbstractProduction = Zn; var uD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, []) || this; return n.idx = 1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return Object.defineProperty(e.prototype, "definition", { get: function () { return this.referencedRule !== void 0 ? this.referencedRule.definition : [] }, set: function (r) { }, enumerable: !1, configurable: !0 }), e.prototype.accept = function (r) { r.visit(this) }, e }(Zn); Pe.NonTerminal = uD; var cD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.orgText = "", (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return e }(Zn); Pe.Rule = cD; var lD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.ignoreAmbiguities = !1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return e }(Zn); Pe.Alternative = lD; var dD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.idx = 1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return e }(Zn); Pe.Option = dD; var fD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.idx = 1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return e }(Zn); Pe.RepetitionMandatory = fD; var pD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.idx = 1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return e }(Zn); Pe.RepetitionMandatoryWithSeparator = pD; var hD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.idx = 1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return e }(Zn); Pe.Repetition = hD; var mD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.idx = 1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return e }(Zn); Pe.RepetitionWithSeparator = mD; var gD = function (t) { Oi(e, t); function e(r) { var n = t.call(this, r.definition) || this; return n.idx = 1, n.ignoreAmbiguities = !1, n.hasPredicates = !1, (0, Qn.default)(n, (0, Jn.default)(r, function (i) { return i !== void 0 })), n } return Object.defineProperty(e.prototype, "definition", { get: function () { return this._definition }, set: function (r) { this._definition = r }, enumerable: !1, configurable: !0 }), e }(Zn); Pe.Alternation = gD; var Df = function () { function t(e) { this.idx = 1, (0, Qn.default)(this, (0, Jn.default)(e, function (r) { return r !== void 0 })) } return t.prototype.accept = function (e) { e.visit(this) }, t }(); Pe.Terminal = Df; function FQ(t) { return (0, sD.default)(t, Pc) } Pe.serializeGrammar = FQ; function Pc(t) { function e(o) { return (0, sD.default)(o, Pc) } if (t instanceof uD) { var r = { type: "NonTerminal", name: t.nonTerminalName, idx: t.idx }; return (0, e_.default)(t.label) && (r.label = t.label), r } else { if (t instanceof lD) return { type: "Alternative", definition: e(t.definition) }; if (t instanceof dD) return { type: "Option", idx: t.idx, definition: e(t.definition) }; if (t instanceof fD) return { type: "RepetitionMandatory", idx: t.idx, definition: e(t.definition) }; if (t instanceof pD) return { type: "RepetitionMandatoryWithSeparator", idx: t.idx, separator: Pc(new Df({ terminalType: t.separator })), definition: e(t.definition) }; if (t instanceof mD) return { type: "RepetitionWithSeparator", idx: t.idx, separator: Pc(new Df({ terminalType: t.separator })), definition: e(t.definition) }; if (t instanceof hD) return { type: "Repetition", idx: t.idx, definition: e(t.definition) }; if (t instanceof gD) return { type: "Alternation", idx: t.idx, definition: e(t.definition) }; if (t instanceof Df) { var n = { type: "Terminal", name: t.terminalType.name, label: MQ(t.terminalType), idx: t.idx }; (0, e_.default)(t.label) && (n.terminalLabel = t.label); var i = t.terminalType.PATTERN; return t.terminalType.PATTERN && (n.pattern = (0, LQ.default)(i) ? i.source : i), n } else { if (t instanceof cD) return { type: "Rule", name: t.name, orgText: t.orgText, definition: e(t.definition) }; throw Error("non exhaustive match") } } } Pe.serializeProduction = Pc }); var yD = f(xf => { "use strict"; Object.defineProperty(xf, "__esModule", { value: !0 }); xf.GAstVisitor = void 0; var ei = If(), jQ = function () { function t() { } return t.prototype.visit = function (e) { var r = e; switch (r.constructor) { case ei.NonTerminal: return this.visitNonTerminal(r); case ei.Alternative: return this.visitAlternative(r); case ei.Option: return this.visitOption(r); case ei.RepetitionMandatory: return this.visitRepetitionMandatory(r); case ei.RepetitionMandatoryWithSeparator: return this.visitRepetitionMandatoryWithSeparator(r); case ei.RepetitionWithSeparator: return this.visitRepetitionWithSeparator(r); case ei.Repetition: return this.visitRepetition(r); case ei.Alternation: return this.visitAlternation(r); case ei.Terminal: return this.visitTerminal(r); case ei.Rule: return this.visitRule(r); default: throw Error("non exhaustive match") } }, t.prototype.visitNonTerminal = function (e) { }, t.prototype.visitAlternative = function (e) { }, t.prototype.visitOption = function (e) { }, t.prototype.visitRepetition = function (e) { }, t.prototype.visitRepetitionMandatory = function (e) { }, t.prototype.visitRepetitionMandatoryWithSeparator = function (e) { }, t.prototype.visitRepetitionWithSeparator = function (e) { }, t.prototype.visitAlternation = function (e) { }, t.prototype.visitTerminal = function (e) { }, t.prototype.visitRule = function (e) { }, t }(); xf.GAstVisitor = jQ }); var _D = f((Fge, vD) => { var UQ = go(); function GQ(t, e) { var r; return UQ(t, function (n, i, o) { return r = e(n, i, o), !r }), !!r } vD.exports = GQ }); var qf = f((jge, TD) => { var HQ = Dv(), WQ = Xr(), BQ = _D(), KQ = qe(), zQ = bc(); function VQ(t, e, r) { var n = KQ(t) ? HQ : BQ; return r && zQ(t, e, r) && (e = void 0), n(t, WQ(e, 3)) } TD.exports = VQ }); var bD = f((Uge, RD) => { function YQ(t, e) { for (var r = -1, n = t == null ? 0 : t.length; ++r < n;)if (!e(t[r], r, t)) return !1; return !0 } RD.exports = YQ }); var PD = f((Gge, AD) => { var XQ = go(); function JQ(t, e) { var r = !0; return XQ(t, function (n, i, o) { return r = !!e(n, i, o), r }), r } AD.exports = JQ }); var Sc = f((Hge, SD) => { var QQ = bD(), ZQ = PD(), eZ = Xr(), tZ = qe(), rZ = bc(); function nZ(t, e, r) { var n = tZ(t) ? QQ : ZQ; return r && rZ(t, e, r) && (e = void 0), n(t, eZ(e, 3)) } SD.exports = nZ }); var t_ = f((Wge, CD) => { function iZ(t, e, r, n) { for (var i = t.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i;)if (e(t[o], o, t)) return o; return -1 } CD.exports = iZ }); var ND = f((Bge, ED) => { function oZ(t) { return t !== t } ED.exports = oZ }); var wD = f((Kge, kD) => { function aZ(t, e, r) { for (var n = r - 1, i = t.length; ++n < i;)if (t[n] === e) return n; return -1 } kD.exports = aZ }); var Lf = f((zge, OD) => { var sZ = t_(), uZ = ND(), cZ = wD(); function lZ(t, e, r) { return e === e ? cZ(t, e, r) : sZ(t, uZ, r) } OD.exports = lZ }); var Di = f((Vge, DD) => { var dZ = Lf(), fZ = Sn(), pZ = Rc(), hZ = Is(), mZ = Yn(), gZ = Math.max; function yZ(t, e, r, n) { t = fZ(t) ? t : mZ(t), r = r && !n ? hZ(r) : 0; var i = t.length; return r < 0 && (r = gZ(i + r, 0)), pZ(t) ? r <= i && t.indexOf(e, r) > -1 : !!i && dZ(t, e, r) > -1 } DD.exports = yZ }); var ID = f(Jr => { "use strict"; var n_ = Jr && Jr.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Jr, "__esModule", { value: !0 }); Jr.getProductionDslName = Jr.isBranchingProd = Jr.isOptionalProd = Jr.isSequenceProd = void 0; var vZ = n_(qf()), _Z = n_(Sc()), TZ = n_(Di()), at = If(); function RZ(t) { return t instanceof at.Alternative || t instanceof at.Option || t instanceof at.Repetition || t instanceof at.RepetitionMandatory || t instanceof at.RepetitionMandatoryWithSeparator || t instanceof at.RepetitionWithSeparator || t instanceof at.Terminal || t instanceof at.Rule } Jr.isSequenceProd = RZ; function r_(t, e) { e === void 0 && (e = []); var r = t instanceof at.Option || t instanceof at.Repetition || t instanceof at.RepetitionWithSeparator; return r ? !0 : t instanceof at.Alternation ? (0, vZ.default)(t.definition, function (n) { return r_(n, e) }) : t instanceof at.NonTerminal && (0, TZ.default)(e, t) ? !1 : t instanceof at.AbstractProduction ? (t instanceof at.NonTerminal && e.push(t), (0, _Z.default)(t.definition, function (n) { return r_(n, e) })) : !1 } Jr.isOptionalProd = r_; function bZ(t) { return t instanceof at.Alternation } Jr.isBranchingProd = bZ; function AZ(t) { if (t instanceof at.NonTerminal) return "SUBRULE"; if (t instanceof at.Option) return "OPTION"; if (t instanceof at.Alternation) return "OR"; if (t instanceof at.RepetitionMandatory) return "AT_LEAST_ONE"; if (t instanceof at.RepetitionMandatoryWithSeparator) return "AT_LEAST_ONE_SEP"; if (t instanceof at.RepetitionWithSeparator) return "MANY_SEP"; if (t instanceof at.Repetition) return "MANY"; if (t instanceof at.Terminal) return "CONSUME"; throw Error("non exhaustive match") } Jr.getProductionDslName = AZ }); var _t = f(he => { "use strict"; Object.defineProperty(he, "__esModule", { value: !0 }); he.isSequenceProd = he.isBranchingProd = he.isOptionalProd = he.getProductionDslName = he.GAstVisitor = he.serializeProduction = he.serializeGrammar = he.Alternative = he.Alternation = he.RepetitionWithSeparator = he.RepetitionMandatoryWithSeparator = he.RepetitionMandatory = he.Repetition = he.Option = he.NonTerminal = he.Terminal = he.Rule = void 0; var Qr = If(); Object.defineProperty(he, "Rule", { enumerable: !0, get: function () { return Qr.Rule } }); Object.defineProperty(he, "Terminal", { enumerable: !0, get: function () { return Qr.Terminal } }); Object.defineProperty(he, "NonTerminal", { enumerable: !0, get: function () { return Qr.NonTerminal } }); Object.defineProperty(he, "Option", { enumerable: !0, get: function () { return Qr.Option } }); Object.defineProperty(he, "Repetition", { enumerable: !0, get: function () { return Qr.Repetition } }); Object.defineProperty(he, "RepetitionMandatory", { enumerable: !0, get: function () { return Qr.RepetitionMandatory } }); Object.defineProperty(he, "RepetitionMandatoryWithSeparator", { enumerable: !0, get: function () { return Qr.RepetitionMandatoryWithSeparator } }); Object.defineProperty(he, "RepetitionWithSeparator", { enumerable: !0, get: function () { return Qr.RepetitionWithSeparator } }); Object.defineProperty(he, "Alternation", { enumerable: !0, get: function () { return Qr.Alternation } }); Object.defineProperty(he, "Alternative", { enumerable: !0, get: function () { return Qr.Alternative } }); Object.defineProperty(he, "serializeGrammar", { enumerable: !0, get: function () { return Qr.serializeGrammar } }); Object.defineProperty(he, "serializeProduction", { enumerable: !0, get: function () { return Qr.serializeProduction } }); var PZ = yD(); Object.defineProperty(he, "GAstVisitor", { enumerable: !0, get: function () { return PZ.GAstVisitor } }); var Mf = ID(); Object.defineProperty(he, "getProductionDslName", { enumerable: !0, get: function () { return Mf.getProductionDslName } }); Object.defineProperty(he, "isOptionalProd", { enumerable: !0, get: function () { return Mf.isOptionalProd } }); Object.defineProperty(he, "isBranchingProd", { enumerable: !0, get: function () { return Mf.isBranchingProd } }); Object.defineProperty(he, "isSequenceProd", { enumerable: !0, get: function () { return Mf.isSequenceProd } }) }); var $f = f(qs => { "use strict"; var LD = qs && qs.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(qs, "__esModule", { value: !0 }); qs.RestWalker = void 0; var SZ = LD(wf()), xD = LD(Gt()), Rr = _t(), CZ = function () { function t() { } return t.prototype.walk = function (e, r) { var n = this; r === void 0 && (r = []), (0, xD.default)(e.definition, function (i, o) { var a = (0, SZ.default)(e.definition, o + 1); if (i instanceof Rr.NonTerminal) n.walkProdRef(i, a, r); else if (i instanceof Rr.Terminal) n.walkTerminal(i, a, r); else if (i instanceof Rr.Alternative) n.walkFlat(i, a, r); else if (i instanceof Rr.Option) n.walkOption(i, a, r); else if (i instanceof Rr.RepetitionMandatory) n.walkAtLeastOne(i, a, r); else if (i instanceof Rr.RepetitionMandatoryWithSeparator) n.walkAtLeastOneSep(i, a, r); else if (i instanceof Rr.RepetitionWithSeparator) n.walkManySep(i, a, r); else if (i instanceof Rr.Repetition) n.walkMany(i, a, r); else if (i instanceof Rr.Alternation) n.walkOr(i, a, r); else throw Error("non exhaustive match") }) }, t.prototype.walkTerminal = function (e, r, n) { }, t.prototype.walkProdRef = function (e, r, n) { }, t.prototype.walkFlat = function (e, r, n) { var i = r.concat(n); this.walk(e, i) }, t.prototype.walkOption = function (e, r, n) { var i = r.concat(n); this.walk(e, i) }, t.prototype.walkAtLeastOne = function (e, r, n) { var i = [new Rr.Option({ definition: e.definition })].concat(r, n); this.walk(e, i) }, t.prototype.walkAtLeastOneSep = function (e, r, n) { var i = qD(e, r, n); this.walk(e, i) }, t.prototype.walkMany = function (e, r, n) { var i = [new Rr.Option({ definition: e.definition })].concat(r, n); this.walk(e, i) }, t.prototype.walkManySep = function (e, r, n) { var i = qD(e, r, n); this.walk(e, i) }, t.prototype.walkOr = function (e, r, n) { var i = this, o = r.concat(n); (0, xD.default)(e.definition, function (a) { var s = new Rr.Alternative({ definition: [a] }); i.walk(s, o) }) }, t }(); qs.RestWalker = CZ; function qD(t, e, r) { var n = [new Rr.Option({ definition: [new Rr.Terminal({ terminalType: t.separator })].concat(t.definition) })], i = n.concat(e, r); return i } }); var jD = f((Qge, FD) => { var MD = ta(), EZ = ac(), NZ = qe(), $D = MD ? MD.isConcatSpreadable : void 0; function kZ(t) { return NZ(t) || EZ(t) || !!($D && t && t[$D]) } FD.exports = kZ }); var Ff = f((Zge, GD) => { var wZ = _f(), OZ = jD(); function UD(t, e, r, n, i) { var o = -1, a = t.length; for (r || (r = OZ), i || (i = []); ++o < a;) { var s = t[o]; e > 0 && r(s) ? e > 1 ? UD(s, e - 1, r, n, i) : wZ(i, s) : n || (i[i.length] = s) } return i } GD.exports = UD }); var Cn = f((eye, HD) => { var DZ = Ff(); function IZ(t) { var e = t == null ? 0 : t.length; return e ? DZ(t, 1) : [] } HD.exports = IZ }); var i_ = f((tye, WD) => { var xZ = Lf(); function qZ(t, e) { var r = t == null ? 0 : t.length; return !!r && xZ(t, e, 0) > -1 } WD.exports = qZ }); var o_ = f((rye, BD) => { function LZ(t, e, r) { for (var n = -1, i = t == null ? 0 : t.length; ++n < i;)if (r(e, t[n])) return !0; return !1 } BD.exports = LZ }); var jf = f((nye, KD) => { function MZ() { } KD.exports = MZ }); var VD = f((iye, zD) => { var a_ = Sv(), $Z = jf(), FZ = vf(), jZ = 1 / 0, UZ = a_ && 1 / FZ(new a_([, -0]))[1] == jZ ? function (t) { return new a_(t) } : $Z; zD.exports = UZ }); var s_ = f((oye, YD) => { var GZ = gf(), HZ = i_(), WZ = o_(), BZ = yf(), KZ = VD(), zZ = vf(), VZ = 200; function YZ(t, e, r) { var n = -1, i = HZ, o = t.length, a = !0, s = [], u = s; if (r) a = !1, i = WZ; else if (o >= VZ) { var c = e ? null : KZ(t); if (c) return zZ(c); a = !1, i = BZ, u = new GZ } else u = e ? [] : s; e: for (; ++n < o;) { var l = t[n], d = e ? e(l) : l; if (l = r || l !== 0 ? l : 0, a && d === d) { for (var h = u.length; h--;)if (u[h] === d) continue e; e && u.push(d), s.push(l) } else i(u, d, r) || (u !== s && u.push(d), s.push(l)) } return s } YD.exports = YZ }); var Uf = f((aye, XD) => { var XZ = s_(); function JZ(t) { return t && t.length ? XZ(t) : [] } XD.exports = JZ }); var l_ = f(Zr => { "use strict"; var c_ = Zr && Zr.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Zr, "__esModule", { value: !0 }); Zr.firstForTerminal = Zr.firstForBranching = Zr.firstForSequence = Zr.first = void 0; var QZ = c_(Cn()), QD = c_(Uf()), ZZ = c_(Ut()), JD = _t(), u_ = _t(); function Gf(t) { if (t instanceof JD.NonTerminal) return Gf(t.referencedRule); if (t instanceof JD.Terminal) return tI(t); if ((0, u_.isSequenceProd)(t)) return ZD(t); if ((0, u_.isBranchingProd)(t)) return eI(t); throw Error("non exhaustive match") } Zr.first = Gf; function ZD(t) { for (var e = [], r = t.definition, n = 0, i = r.length > n, o, a = !0; i && a;)o = r[n], a = (0, u_.isOptionalProd)(o), e = e.concat(Gf(o)), n = n + 1, i = r.length > n; return (0, QD.default)(e) } Zr.firstForSequence = ZD; function eI(t) { var e = (0, ZZ.default)(t.definition, function (r) { return Gf(r) }); return (0, QD.default)((0, QZ.default)(e)) } Zr.firstForBranching = eI; function tI(t) { return [t.terminalType] } Zr.firstForTerminal = tI }); var d_ = f(Hf => { "use strict"; Object.defineProperty(Hf, "__esModule", { value: !0 }); Hf.IN = void 0; Hf.IN = "_~IN~_" }); var aI = f(br => { "use strict"; var eee = br && br.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), rI = br && br.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(br, "__esModule", { value: !0 }); br.buildInProdFollowPrefix = br.buildBetweenProdsFollowPrefix = br.computeAllProdsFollows = br.ResyncFollowsWalker = void 0; var tee = $f(), ree = l_(), nee = rI(Gt()), iee = rI(Ac()), nI = d_(), oee = _t(), iI = function (t) { eee(e, t); function e(r) { var n = t.call(this) || this; return n.topProd = r, n.follows = {}, n } return e.prototype.startWalking = function () { return this.walk(this.topProd), this.follows }, e.prototype.walkTerminal = function (r, n, i) { }, e.prototype.walkProdRef = function (r, n, i) { var o = oI(r.referencedRule, r.idx) + this.topProd.name, a = n.concat(i), s = new oee.Alternative({ definition: a }), u = (0, ree.first)(s); this.follows[o] = u }, e }(tee.RestWalker); br.ResyncFollowsWalker = iI; function aee(t) { var e = {}; return (0, nee.default)(t, function (r) { var n = new iI(r).startWalking(); (0, iee.default)(e, n) }), e } br.computeAllProdsFollows = aee; function oI(t, e) { return t.name + e + nI.IN } br.buildBetweenProdsFollowPrefix = oI; function see(t) { var e = t.terminalType.name; return e + t.idx + nI.IN } br.buildInProdFollowPrefix = see }); var ia = f((lye, sI) => { function uee(t) { return t === void 0 } sI.exports = uee }); var cI = f((dye, uI) => { function cee(t) { return t && t.length ? t[0] : void 0 } uI.exports = cee }); var Ls = f((fye, lI) => { lI.exports = cI() }); var Cc = f((pye, dI) => { function lee(t) { for (var e = -1, r = t == null ? 0 : t.length, n = 0, i = []; ++e < r;) { var o = t[e]; o && (i[n++] = o) } return i } dI.exports = lee }); var f_ = f((hye, fI) => { var dee = go(); function fee(t, e) { var r = []; return dee(t, function (n, i, o) { e(n, i, o) && r.push(n) }), r } fI.exports = fee }); var hI = f((mye, pI) => { var pee = "Expected a function"; function hee(t) { if (typeof t != "function") throw new TypeError(pee); return function () { var e = arguments; switch (e.length) { case 0: return !t.call(this); case 1: return !t.call(this, e[0]); case 2: return !t.call(this, e[0], e[1]); case 3: return !t.call(this, e[0], e[1], e[2]) }return !t.apply(this, e) } } pI.exports = hee }); var Wf = f((gye, mI) => { var mee = Tf(), gee = f_(), yee = Xr(), vee = qe(), _ee = hI(); function Tee(t, e) { var r = vee(t) ? mee : gee; return r(t, _ee(yee(e, 3))) } mI.exports = Tee }); var yI = f((yye, gI) => { var Ree = gf(), bee = i_(), Aee = o_(), Pee = Rs(), See = _s(), Cee = yf(), Eee = 200; function Nee(t, e, r, n) { var i = -1, o = bee, a = !0, s = t.length, u = [], c = e.length; if (!s) return u; r && (e = Pee(e, See(r))), n ? (o = Aee, a = !1) : e.length >= Eee && (o = Cee, a = !1, e = new Ree(e)); e: for (; ++i < s;) { var l = t[i], d = r == null ? l : r(l); if (l = n || l !== 0 ? l : 0, a && d === d) { for (var h = c; h--;)if (e[h] === d) continue e; u.push(l) } else o(e, d, n) || u.push(l) } return u } gI.exports = Nee }); var _I = f((vye, vI) => { var kee = Sn(), wee = Pn(); function Oee(t) { return wee(t) && kee(t) } vI.exports = Oee }); var Bf = f((_ye, RI) => { var Dee = yI(), Iee = Ff(), xee = Of(), TI = _I(), qee = xee(function (t, e) { return TI(t) ? Dee(t, Iee(e, 1, TI, !0)) : [] }); RI.exports = qee }); var AI = f((Tye, bI) => { var Lee = Lf(), Mee = Is(), $ee = Math.max; function Fee(t, e, r) { var n = t == null ? 0 : t.length; if (!n) return -1; var i = r == null ? 0 : Mee(r); return i < 0 && (i = $ee(n + i, 0)), Lee(t, e, i) } bI.exports = Fee }); var SI = f((Rye, PI) => { var jee = Xr(), Uee = Sn(), Gee = Dr(); function Hee(t) { return function (e, r, n) { var i = Object(e); if (!Uee(e)) { var o = jee(r, 3); e = Gee(e), r = function (s) { return o(i[s], s, i) } } var a = t(e, r, n); return a > -1 ? i[o ? e[a] : a] : void 0 } } PI.exports = Hee }); var EI = f((bye, CI) => { var Wee = t_(), Bee = Xr(), Kee = Is(), zee = Math.max; function Vee(t, e, r) { var n = t == null ? 0 : t.length; if (!n) return -1; var i = r == null ? 0 : Kee(r); return i < 0 && (i = zee(n + i, 0)), Wee(t, Bee(e, 3), i) } CI.exports = Vee }); var Kf = f((Aye, NI) => { var Yee = SI(), Xee = EI(), Jee = Yee(Xee); NI.exports = Jee }); var Ec = f((Pye, kI) => { var Qee = Tf(), Zee = f_(), ete = Xr(), tte = qe(); function rte(t, e) { var r = tte(t) ? Qee : Zee; return r(t, ete(e, 3)) } kI.exports = rte }); var p_ = f((Sye, OI) => { var nte = Of(), ite = bs(), ote = bc(), ate = _c(), wI = Object.prototype, ste = wI.hasOwnProperty, ute = nte(function (t, e) { t = Object(t); var r = -1, n = e.length, i = n > 2 ? e[2] : void 0; for (i && ote(e[0], e[1], i) && (n = 1); ++r < n;)for (var o = e[r], a = ate(o), s = -1, u = a.length; ++s < u;) { var c = a[s], l = t[c]; (l === void 0 || ite(l, wI[c]) && !ste.call(t, c)) && (t[c] = o[c]) } return t }); OI.exports = ute }); var II = f((Cye, DI) => { function cte(t, e, r, n) { var i = -1, o = t == null ? 0 : t.length; for (n && o && (r = t[++i]); ++i < o;)r = e(r, t[i], i, t); return r } DI.exports = cte }); var qI = f((Eye, xI) => { function lte(t, e, r, n, i) { return i(t, function (o, a, s) { r = n ? (n = !1, o) : e(r, o, a, s) }), r } xI.exports = lte }); var Ii = f((Nye, LI) => { var dte = II(), fte = go(), pte = Xr(), hte = qI(), mte = qe(); function gte(t, e, r) { var n = mte(t) ? dte : hte, i = arguments.length < 3; return n(t, pte(e, 4), r, i, fte) } LI.exports = gte }); var Vf = f(Ms => { "use strict"; Object.defineProperty(Ms, "__esModule", { value: !0 }); Ms.clearRegExpParserCache = Ms.getRegExpAst = void 0; var yte = Ju(), zf = {}, vte = new yte.RegExpParser; function _te(t) { var e = t.toString(); if (zf.hasOwnProperty(e)) return zf[e]; var r = vte.pattern(e); return zf[e] = r, r } Ms.getRegExpAst = _te; function Tte() { zf = {} } Ms.clearRegExpParserCache = Tte }); var GI = f(nr => {
    "use strict"; var Rte = nr && nr.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), $s = nr && nr.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(nr, "__esModule", { value: !0 }); nr.canMatchCharCode = nr.firstCharOptimizedIndices = nr.getOptimizedStartCodesIndices = nr.failedOptimizationPrefixMsg = void 0; var FI = Ju(), bte = $s(qe()), Ate = $s(Sc()), Pte = $s(Gt()), h_ = $s(Kf()), Ste = $s(Yn()), g_ = $s(Di()), MI = Ds(), jI = Vf(), xi = y_(), UI = "Complement Sets are not supported for first char optimization"; nr.failedOptimizationPrefixMsg = `Unable to use "first char" lexer optimizations:
`; function Cte(t, e) {
      e === void 0 && (e = !1); try { var r = (0, jI.getRegExpAst)(t), n = Xf(r.value, {}, r.flags.ignoreCase); return n } catch (o) {
        if (o.message === UI) e && (0, MI.PRINT_WARNING)("".concat(nr.failedOptimizationPrefixMsg) + "	Unable to optimize: < ".concat(t.toString(), ` >
`) + `	Complement Sets cannot be automatically optimized.
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.`); else {
          var i = ""; e && (i = `
	This will disable the lexer's first char optimizations.
	See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details.`), (0, MI.PRINT_ERROR)("".concat(nr.failedOptimizationPrefixMsg, `
`) + "	Failed parsing: < ".concat(t.toString(), ` >
`) + "	Using the regexp-to-ast library version: ".concat(FI.VERSION, `
`) + "	Please open an issue at: https://github.com/bd82/regexp-to-ast/issues" + i)
        }
      } return []
    } nr.getOptimizedStartCodesIndices = Cte; function Xf(t, e, r) { switch (t.type) { case "Disjunction": for (var n = 0; n < t.value.length; n++)Xf(t.value[n], e, r); break; case "Alternative": for (var i = t.value, n = 0; n < i.length; n++) { var o = i[n]; switch (o.type) { case "EndAnchor": case "GroupBackReference": case "Lookahead": case "NegativeLookahead": case "StartAnchor": case "WordBoundary": case "NonWordBoundary": continue }var a = o; switch (a.type) { case "Character": Yf(a.value, e, r); break; case "Set": if (a.complement === !0) throw Error(UI); (0, Pte.default)(a.value, function (c) { if (typeof c == "number") Yf(c, e, r); else { var l = c; if (r === !0) for (var d = l.from; d <= l.to; d++)Yf(d, e, r); else { for (var d = l.from; d <= l.to && d < xi.minOptimizationVal; d++)Yf(d, e, r); if (l.to >= xi.minOptimizationVal) for (var h = l.from >= xi.minOptimizationVal ? l.from : xi.minOptimizationVal, y = l.to, m = (0, xi.charCodeToOptimizedIndex)(h), R = (0, xi.charCodeToOptimizedIndex)(y), C = m; C <= R; C++)e[C] = C } } }); break; case "Group": Xf(a.value, e, r); break; default: throw Error("Non Exhaustive Match") }var s = a.quantifier !== void 0 && a.quantifier.atLeast === 0; if (a.type === "Group" && m_(a) === !1 || a.type !== "Group" && s === !1) break } break; default: throw Error("non exhaustive match!") }return (0, Ste.default)(e) } nr.firstCharOptimizedIndices = Xf; function Yf(t, e, r) { var n = (0, xi.charCodeToOptimizedIndex)(t); e[n] = n, r === !0 && Ete(t, e) } function Ete(t, e) { var r = String.fromCharCode(t), n = r.toUpperCase(); if (n !== r) { var i = (0, xi.charCodeToOptimizedIndex)(n.charCodeAt(0)); e[i] = i } else { var o = r.toLowerCase(); if (o !== r) { var i = (0, xi.charCodeToOptimizedIndex)(o.charCodeAt(0)); e[i] = i } } } function $I(t, e) { return (0, h_.default)(t.value, function (r) { if (typeof r == "number") return (0, g_.default)(e, r); var n = r; return (0, h_.default)(e, function (i) { return n.from <= i && i <= n.to }) !== void 0 }) } function m_(t) { var e = t.quantifier; return e && e.atLeast === 0 ? !0 : t.value ? (0, bte.default)(t.value) ? (0, Ate.default)(t.value, m_) : m_(t.value) : !1 } var Nte = function (t) { Rte(e, t); function e(r) { var n = t.call(this) || this; return n.targetCharCodes = r, n.found = !1, n } return e.prototype.visitChildren = function (r) { if (this.found !== !0) { switch (r.type) { case "Lookahead": this.visitLookahead(r); return; case "NegativeLookahead": this.visitNegativeLookahead(r); return }t.prototype.visitChildren.call(this, r) } }, e.prototype.visitCharacter = function (r) { (0, g_.default)(this.targetCharCodes, r.value) && (this.found = !0) }, e.prototype.visitSet = function (r) { r.complement ? $I(r, this.targetCharCodes) === void 0 && (this.found = !0) : $I(r, this.targetCharCodes) !== void 0 && (this.found = !0) }, e }(FI.BaseRegExpVisitor); function kte(t, e) { if (e instanceof RegExp) { var r = (0, jI.getRegExpAst)(e), n = new Nte(t); return n.visit(r), n.found } else return (0, h_.default)(e, function (i) { return (0, g_.default)(t, i.charCodeAt(0)) }) !== void 0 } nr.canMatchCharCode = kte
  }); var y_ = f(H => {
    "use strict"; var BI = H && H.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), mt = H && H.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(H, "__esModule", { value: !0 }); H.charCodeToOptimizedIndex = H.minOptimizationVal = H.buildLineBreakIssueMessage = H.LineTerminatorOptimizedTester = H.isShortPattern = H.isCustomPattern = H.cloneEmptyGroups = H.performWarningRuntimeChecks = H.performRuntimeChecks = H.addStickyFlag = H.addStartOfInput = H.findUnreachablePatterns = H.findModesThatDoNotExist = H.findInvalidGroupType = H.findDuplicatePatterns = H.findUnsupportedFlags = H.findStartOfInputAnchor = H.findEmptyMatchRegExps = H.findEndOfInputAnchor = H.findInvalidPatterns = H.findMissingPatterns = H.validatePatterns = H.analyzeTokenTypes = H.enableSticky = H.disableSticky = H.SUPPORT_STICKY = H.MODES = H.DEFAULT_MODE = void 0; var KI = Ju(), Fe = Nc(), wte = mt(Ls()), zI = mt(Or()), VI = mt(Cc()), Qf = mt(qe()), Ote = mt(Yn()), Dte = mt(Cn()), YI = mt(Wf()), XI = mt(Bf()), HI = mt(AI()), st = mt(Ut()), qi = mt(Gt()), Li = mt(Rc()), ep = mt(ms()), __ = mt(ia()), Ite = mt(Kf()), ir = mt(Ir()), xte = mt(Dr()), yo = mt(Qv()), ti = mt(Ec()), qte = mt(p_()), Zf = mt(Ii()), tp = mt(Di()), WI = Ds(), Fs = GI(), JI = Vf(), oa = "PATTERN"; H.DEFAULT_MODE = "defaultMode"; H.MODES = "modes"; H.SUPPORT_STICKY = typeof new RegExp("(?:)").sticky == "boolean"; function Lte() { H.SUPPORT_STICKY = !1 } H.disableSticky = Lte; function Mte() { H.SUPPORT_STICKY = !0 } H.enableSticky = Mte; function $te(t, e) {
      e = (0, qte.default)(e, {
        useSticky: H.SUPPORT_STICKY, debug: !1, safeMode: !1, positionTracking: "full", lineTerminatorCharacters: ["\r", `
`], tracer: function (A, b) { return b() }
      }); var r = e.tracer; r("initCharCodeToOptimizedIndexMap", function () { Vte() }); var n; r("Reject Lexer.NA", function () { n = (0, YI.default)(t, function (A) { return A[oa] === Fe.Lexer.NA }) }); var i = !1, o; r("Transform Patterns", function () { i = !1, o = (0, st.default)(n, function (A) { var b = A[oa]; if ((0, yo.default)(b)) { var O = b.source; return O.length === 1 && O !== "^" && O !== "$" && O !== "." && !b.ignoreCase ? O : O.length === 2 && O[0] === "\\" && !(0, tp.default)(["d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W"], O[1]) ? O[1] : e.useSticky ? R_(b) : T_(b) } else { if ((0, ep.default)(b)) return i = !0, { exec: b }; if (typeof b == "object") return i = !0, b; if (typeof b == "string") { if (b.length === 1) return b; var L = b.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), W = new RegExp(L); return e.useSticky ? R_(W) : T_(W) } else throw Error("non exhaustive match") } }) }); var a, s, u, c, l; r("misc mapping", function () { a = (0, st.default)(n, function (A) { return A.tokenTypeIdx }), s = (0, st.default)(n, function (A) { var b = A.GROUP; if (b !== Fe.Lexer.SKIPPED) { if ((0, Li.default)(b)) return b; if ((0, __.default)(b)) return !1; throw Error("non exhaustive match") } }), u = (0, st.default)(n, function (A) { var b = A.LONGER_ALT; if (b) { var O = (0, Qf.default)(b) ? (0, st.default)(b, function (L) { return (0, HI.default)(n, L) }) : [(0, HI.default)(n, b)]; return O } }), c = (0, st.default)(n, function (A) { return A.PUSH_MODE }), l = (0, st.default)(n, function (A) { return (0, ir.default)(A, "POP_MODE") }) }); var d; r("Line Terminator Handling", function () { var A = dx(e.lineTerminatorCharacters); d = (0, st.default)(n, function (b) { return !1 }), e.positionTracking !== "onlyOffset" && (d = (0, st.default)(n, function (b) { return (0, ir.default)(b, "LINE_BREAKS") ? !!b.LINE_BREAKS : cx(b, A) === !1 && (0, Fs.canMatchCharCode)(A, b.PATTERN) })) }); var h, y, m, R; r("Misc Mapping #2", function () { h = (0, st.default)(n, A_), y = (0, st.default)(o, ux), m = (0, Zf.default)(n, function (A, b) { var O = b.GROUP; return (0, Li.default)(O) && O !== Fe.Lexer.SKIPPED && (A[O] = []), A }, {}), R = (0, st.default)(o, function (A, b) { return { pattern: o[b], longerAlt: u[b], canLineTerminator: d[b], isCustom: h[b], short: y[b], group: s[b], push: c[b], pop: l[b], tokenTypeIdx: a[b], tokenType: n[b] } }) }); var C = !0, E = []; return e.safeMode || r("First Char Optimization", function () {
        E = (0, Zf.default)(n, function (A, b, O) {
          if (typeof b.PATTERN == "string") { var L = b.PATTERN.charCodeAt(0), W = b_(L); v_(A, W, R[O]) } else if ((0, Qf.default)(b.START_CHARS_HINT)) { var Z; (0, qi.default)(b.START_CHARS_HINT, function (we) { var Je = typeof we == "string" ? we.charCodeAt(0) : we, K = b_(Je); Z !== K && (Z = K, v_(A, K, R[O])) }) } else if ((0, yo.default)(b.PATTERN)) if (b.PATTERN.unicode) C = !1, e.ensureOptimizations && (0, WI.PRINT_ERROR)("".concat(Fs.failedOptimizationPrefixMsg) + "	Unable to analyze < ".concat(b.PATTERN.toString(), ` > pattern.
`) + `	The regexp unicode flag is not currently supported by the regexp-to-ast library.
	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE`); else { var ke = (0, Fs.getOptimizedStartCodesIndices)(b.PATTERN, e.ensureOptimizations); (0, zI.default)(ke) && (C = !1), (0, qi.default)(ke, function (we) { v_(A, we, R[O]) }) } else e.ensureOptimizations && (0, WI.PRINT_ERROR)("".concat(Fs.failedOptimizationPrefixMsg) + "	TokenType: <".concat(b.name, `> is using a custom token pattern without providing <start_chars_hint> parameter.
`) + `	This will disable the lexer's first char optimizations.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE`), C = !1; return A
        }, [])
      }), { emptyGroups: m, patternIdxToConfig: R, charCodeToPatternIdxToConfig: E, hasCustom: i, canBeOptimized: C }
    } H.analyzeTokenTypes = $te; function Fte(t, e) { var r = [], n = QI(t); r = r.concat(n.errors); var i = ZI(n.valid), o = i.valid; return r = r.concat(i.errors), r = r.concat(jte(o)), r = r.concat(ox(o)), r = r.concat(ax(o, e)), r = r.concat(sx(o)), r } H.validatePatterns = Fte; function jte(t) { var e = [], r = (0, ti.default)(t, function (n) { return (0, yo.default)(n[oa]) }); return e = e.concat(ex(r)), e = e.concat(rx(r)), e = e.concat(nx(r)), e = e.concat(ix(r)), e = e.concat(tx(r)), e } function QI(t) { var e = (0, ti.default)(t, function (i) { return !(0, ir.default)(i, oa) }), r = (0, st.default)(e, function (i) { return { message: "Token Type: ->" + i.name + "<- missing static 'PATTERN' property", type: Fe.LexerDefinitionErrorType.MISSING_PATTERN, tokenTypes: [i] } }), n = (0, XI.default)(t, e); return { errors: r, valid: n } } H.findMissingPatterns = QI; function ZI(t) { var e = (0, ti.default)(t, function (i) { var o = i[oa]; return !(0, yo.default)(o) && !(0, ep.default)(o) && !(0, ir.default)(o, "exec") && !(0, Li.default)(o) }), r = (0, st.default)(e, function (i) { return { message: "Token Type: ->" + i.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.", type: Fe.LexerDefinitionErrorType.INVALID_PATTERN, tokenTypes: [i] } }), n = (0, XI.default)(t, e); return { errors: r, valid: n } } H.findInvalidPatterns = ZI; var Ute = /[^\\][$]/; function ex(t) {
      var e = function (i) { BI(o, i); function o() { var a = i !== null && i.apply(this, arguments) || this; return a.found = !1, a } return o.prototype.visitEndAnchor = function (a) { this.found = !0 }, o }(KI.BaseRegExpVisitor), r = (0, ti.default)(t, function (i) { var o = i.PATTERN; try { var a = (0, JI.getRegExpAst)(o), s = new e; return s.visit(a), s.found } catch { return Ute.test(o.source) } }), n = (0, st.default)(r, function (i) {
        return {
          message: `Unexpected RegExp Anchor Error:
	Token Type: ->`+ i.name + `<- static 'PATTERN' cannot contain end of input anchor '$'
	See chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: Fe.LexerDefinitionErrorType.EOI_ANCHOR_FOUND, tokenTypes: [i]
        }
      }); return n
    } H.findEndOfInputAnchor = ex; function tx(t) { var e = (0, ti.default)(t, function (n) { var i = n.PATTERN; return i.test("") }), r = (0, st.default)(e, function (n) { return { message: "Token Type: ->" + n.name + "<- static 'PATTERN' must not match an empty string", type: Fe.LexerDefinitionErrorType.EMPTY_MATCH_PATTERN, tokenTypes: [n] } }); return r } H.findEmptyMatchRegExps = tx; var Gte = /[^\\[][\^]|^\^/; function rx(t) {
      var e = function (i) { BI(o, i); function o() { var a = i !== null && i.apply(this, arguments) || this; return a.found = !1, a } return o.prototype.visitStartAnchor = function (a) { this.found = !0 }, o }(KI.BaseRegExpVisitor), r = (0, ti.default)(t, function (i) { var o = i.PATTERN; try { var a = (0, JI.getRegExpAst)(o), s = new e; return s.visit(a), s.found } catch { return Gte.test(o.source) } }), n = (0, st.default)(r, function (i) {
        return {
          message: `Unexpected RegExp Anchor Error:
	Token Type: ->`+ i.name + `<- static 'PATTERN' cannot contain start of input anchor '^'
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#ANCHORS	for details.`, type: Fe.LexerDefinitionErrorType.SOI_ANCHOR_FOUND, tokenTypes: [i]
        }
      }); return n
    } H.findStartOfInputAnchor = rx; function nx(t) { var e = (0, ti.default)(t, function (n) { var i = n[oa]; return i instanceof RegExp && (i.multiline || i.global) }), r = (0, st.default)(e, function (n) { return { message: "Token Type: ->" + n.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')", type: Fe.LexerDefinitionErrorType.UNSUPPORTED_FLAGS_FOUND, tokenTypes: [n] } }); return r } H.findUnsupportedFlags = nx; function ix(t) { var e = [], r = (0, st.default)(t, function (o) { return (0, Zf.default)(t, function (a, s) { return o.PATTERN.source === s.PATTERN.source && !(0, tp.default)(e, s) && s.PATTERN !== Fe.Lexer.NA && (e.push(s), a.push(s)), a }, []) }); r = (0, VI.default)(r); var n = (0, ti.default)(r, function (o) { return o.length > 1 }), i = (0, st.default)(n, function (o) { var a = (0, st.default)(o, function (u) { return u.name }), s = (0, wte.default)(o).PATTERN; return { message: "The same RegExp pattern ->".concat(s, "<-") + "has been used in all of the following Token Types: ".concat(a.join(", "), " <-"), type: Fe.LexerDefinitionErrorType.DUPLICATE_PATTERNS_FOUND, tokenTypes: o } }); return i } H.findDuplicatePatterns = ix; function ox(t) { var e = (0, ti.default)(t, function (n) { if (!(0, ir.default)(n, "GROUP")) return !1; var i = n.GROUP; return i !== Fe.Lexer.SKIPPED && i !== Fe.Lexer.NA && !(0, Li.default)(i) }), r = (0, st.default)(e, function (n) { return { message: "Token Type: ->" + n.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String", type: Fe.LexerDefinitionErrorType.INVALID_GROUP_TYPE_FOUND, tokenTypes: [n] } }); return r } H.findInvalidGroupType = ox; function ax(t, e) { var r = (0, ti.default)(t, function (i) { return i.PUSH_MODE !== void 0 && !(0, tp.default)(e, i.PUSH_MODE) }), n = (0, st.default)(r, function (i) { var o = "Token Type: ->".concat(i.name, "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->").concat(i.PUSH_MODE, "<-") + "which does not exist"; return { message: o, type: Fe.LexerDefinitionErrorType.PUSH_MODE_DOES_NOT_EXIST, tokenTypes: [i] } }); return n } H.findModesThatDoNotExist = ax; function sx(t) {
      var e = [], r = (0, Zf.default)(t, function (n, i, o) { var a = i.PATTERN; return a === Fe.Lexer.NA || ((0, Li.default)(a) ? n.push({ str: a, idx: o, tokenType: i }) : (0, yo.default)(a) && Wte(a) && n.push({ str: a.source, idx: o, tokenType: i })), n }, []); return (0, qi.default)(t, function (n, i) {
        (0, qi.default)(r, function (o) {
          var a = o.str, s = o.idx, u = o.tokenType; if (i < s && Hte(a, n.PATTERN)) {
            var c = "Token: ->".concat(u.name, `<- can never be matched.
`) + "Because it appears AFTER the Token Type ->".concat(n.name, "<-") + `in the lexer's definition.
See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#UNREACHABLE`; e.push({ message: c, type: Fe.LexerDefinitionErrorType.UNREACHABLE_PATTERN, tokenTypes: [n, u] })
          }
        })
      }), e
    } H.findUnreachablePatterns = sx; function Hte(t, e) { if ((0, yo.default)(e)) { var r = e.exec(t); return r !== null && r.index === 0 } else { if ((0, ep.default)(e)) return e(t, 0, [], {}); if ((0, ir.default)(e, "exec")) return e.exec(t, 0, [], {}); if (typeof e == "string") return e === t; throw Error("non exhaustive match") } } function Wte(t) { var e = [".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{"]; return (0, Ite.default)(e, function (r) { return t.source.indexOf(r) !== -1 }) === void 0 } function T_(t) { var e = t.ignoreCase ? "i" : ""; return new RegExp("^(?:".concat(t.source, ")"), e) } H.addStartOfInput = T_; function R_(t) { var e = t.ignoreCase ? "iy" : "y"; return new RegExp("".concat(t.source), e) } H.addStickyFlag = R_; function Bte(t, e, r) {
      var n = []; return (0, ir.default)(t, H.DEFAULT_MODE) || n.push({
        message: "A MultiMode Lexer cannot be initialized without a <" + H.DEFAULT_MODE + `> property in its definition
`, type: Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE
      }), (0, ir.default)(t, H.MODES) || n.push({
        message: "A MultiMode Lexer cannot be initialized without a <" + H.MODES + `> property in its definition
`, type: Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY
      }), (0, ir.default)(t, H.MODES) && (0, ir.default)(t, H.DEFAULT_MODE) && !(0, ir.default)(t.modes, t.defaultMode) && n.push({
        message: "A MultiMode Lexer cannot be initialized with a ".concat(H.DEFAULT_MODE, ": <").concat(t.defaultMode, ">") + `which does not exist
`, type: Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST
      }), (0, ir.default)(t, H.MODES) && (0, qi.default)(t.modes, function (i, o) {
        (0, qi.default)(i, function (a, s) {
          if ((0, __.default)(a)) n.push({
            message: "A Lexer cannot be initialized using an undefined Token Type. Mode:" + "<".concat(o, "> at index: <").concat(s, `>
`), type: Fe.LexerDefinitionErrorType.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED
          }); else if ((0, ir.default)(a, "LONGER_ALT")) {
            var u = (0, Qf.default)(a.LONGER_ALT) ? a.LONGER_ALT : [a.LONGER_ALT]; (0, qi.default)(u, function (c) {
              !(0, __.default)(c) && !(0, tp.default)(i, c) && n.push({
                message: "A MultiMode Lexer cannot be initialized with a longer_alt <".concat(c.name, "> on token <").concat(a.name, "> outside of mode <").concat(o, `>
`), type: Fe.LexerDefinitionErrorType.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE
              })
            })
          }
        })
      }), n
    } H.performRuntimeChecks = Bte; function Kte(t, e, r) {
      var n = [], i = !1, o = (0, VI.default)((0, Dte.default)((0, Ote.default)(t.modes))), a = (0, YI.default)(o, function (u) { return u[oa] === Fe.Lexer.NA }), s = dx(r); return e && (0, qi.default)(a, function (u) { var c = cx(u, s); if (c !== !1) { var l = lx(u, c), d = { message: l, type: c.issue, tokenType: u }; n.push(d) } else (0, ir.default)(u, "LINE_BREAKS") ? u.LINE_BREAKS === !0 && (i = !0) : (0, Fs.canMatchCharCode)(s, u.PATTERN) && (i = !0) }), e && !i && n.push({
        message: `Warning: No LINE_BREAKS Found.
	This Lexer has been defined to track line and column information,
	But none of the Token Types can be identified as matching a line terminator.
	See https://chevrotain.io/docs/guide/resolving_lexer_errors.html#LINE_BREAKS 
	for details.`, type: Fe.LexerDefinitionErrorType.NO_LINE_BREAKS_FLAGS
      }), n
    } H.performWarningRuntimeChecks = Kte; function zte(t) { var e = {}, r = (0, xte.default)(t); return (0, qi.default)(r, function (n) { var i = t[n]; if ((0, Qf.default)(i)) e[n] = []; else throw Error("non exhaustive match") }), e } H.cloneEmptyGroups = zte; function A_(t) { var e = t.PATTERN; if ((0, yo.default)(e)) return !1; if ((0, ep.default)(e)) return !0; if ((0, ir.default)(e, "exec")) return !0; if ((0, Li.default)(e)) return !1; throw Error("non exhaustive match") } H.isCustomPattern = A_; function ux(t) { return (0, Li.default)(t) && t.length === 1 ? t.charCodeAt(0) : !1 } H.isShortPattern = ux; H.LineTerminatorOptimizedTester = { test: function (t) { for (var e = t.length, r = this.lastIndex; r < e; r++) { var n = t.charCodeAt(r); if (n === 10) return this.lastIndex = r + 1, !0; if (n === 13) return t.charCodeAt(r + 1) === 10 ? this.lastIndex = r + 2 : this.lastIndex = r + 1, !0 } return !1 }, lastIndex: 0 }; function cx(t, e) { if ((0, ir.default)(t, "LINE_BREAKS")) return !1; if ((0, yo.default)(t.PATTERN)) { try { (0, Fs.canMatchCharCode)(e, t.PATTERN) } catch (r) { return { issue: Fe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR, errMsg: r.message } } return !1 } else { if ((0, Li.default)(t.PATTERN)) return !1; if (A_(t)) return { issue: Fe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK }; throw Error("non exhaustive match") } } function lx(t, e) {
      if (e.issue === Fe.LexerDefinitionErrorType.IDENTIFY_TERMINATOR) return `Warning: unable to identify line terminator usage in pattern.
`+ "	The problem is in the <".concat(t.name, `> Token Type
`) + "	 Root cause: ".concat(e.errMsg, `.
`) + "	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR"; if (e.issue === Fe.LexerDefinitionErrorType.CUSTOM_LINE_BREAK) return `Warning: A Custom Token Pattern should specify the <line_breaks> option.
`+ "	The problem is in the <".concat(t.name, `> Token Type
`) + "	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK"; throw Error("non exhaustive match")
    } H.buildLineBreakIssueMessage = lx; function dx(t) { var e = (0, st.default)(t, function (r) { return (0, Li.default)(r) ? r.charCodeAt(0) : r }); return e } function v_(t, e, r) { t[e] === void 0 ? t[e] = [r] : t[e].push(r) } H.minOptimizationVal = 256; var Jf = []; function b_(t) { return t < H.minOptimizationVal ? t : Jf[t] } H.charCodeToOptimizedIndex = b_; function Vte() { if ((0, zI.default)(Jf)) { Jf = new Array(65536); for (var t = 0; t < 65536; t++)Jf[t] = t > 255 ? 255 + ~~(t / 255) : t } }
  }); var rp = f((Dye, fx) => { function Yte(t) { var e = t == null ? 0 : t.length; return e ? t[e - 1] : void 0 } fx.exports = Yte }); var sa = f(ce => { "use strict"; var ri = ce && ce.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(ce, "__esModule", { value: !0 }); ce.isTokenType = ce.hasExtendingTokensTypesMapProperty = ce.hasExtendingTokensTypesProperty = ce.hasCategoriesProperty = ce.hasShortKeyProperty = ce.singleAssignCategoriesToksMap = ce.assignCategoriesMapProp = ce.assignCategoriesTokensProp = ce.assignTokenDefaultProps = ce.expandCategories = ce.augmentTokenTypes = ce.tokenIdxToClass = ce.tokenShortNameIdx = ce.tokenStructuredMatcherNoCategories = ce.tokenStructuredMatcher = void 0; var Xte = ri(Or()), Jte = ri(Cc()), Qte = ri(qe()), Zte = ri(Cn()), ere = ri(Bf()), tre = ri(Ut()), aa = ri(Gt()), kc = ri(Ir()), rre = ri(Di()), nre = ri(wi()); function ire(t, e) { var r = t.tokenTypeIdx; return r === e.tokenTypeIdx ? !0 : e.isParent === !0 && e.categoryMatchesMap[r] === !0 } ce.tokenStructuredMatcher = ire; function ore(t, e) { return t.tokenTypeIdx === e.tokenTypeIdx } ce.tokenStructuredMatcherNoCategories = ore; ce.tokenShortNameIdx = 1; ce.tokenIdxToClass = {}; function are(t) { var e = px(t); hx(e), gx(e), mx(e), (0, aa.default)(e, function (r) { r.isParent = r.categoryMatches.length > 0 }) } ce.augmentTokenTypes = are; function px(t) { for (var e = (0, nre.default)(t), r = t, n = !0; n;) { r = (0, Jte.default)((0, Zte.default)((0, tre.default)(r, function (o) { return o.CATEGORIES }))); var i = (0, ere.default)(r, e); e = e.concat(i), (0, Xte.default)(i) ? n = !1 : r = i } return e } ce.expandCategories = px; function hx(t) { (0, aa.default)(t, function (e) { yx(e) || (ce.tokenIdxToClass[ce.tokenShortNameIdx] = e, e.tokenTypeIdx = ce.tokenShortNameIdx++), P_(e) && !(0, Qte.default)(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), P_(e) || (e.CATEGORIES = []), vx(e) || (e.categoryMatches = []), _x(e) || (e.categoryMatchesMap = {}) }) } ce.assignTokenDefaultProps = hx; function mx(t) { (0, aa.default)(t, function (e) { e.categoryMatches = [], (0, aa.default)(e.categoryMatchesMap, function (r, n) { e.categoryMatches.push(ce.tokenIdxToClass[n].tokenTypeIdx) }) }) } ce.assignCategoriesTokensProp = mx; function gx(t) { (0, aa.default)(t, function (e) { S_([], e) }) } ce.assignCategoriesMapProp = gx; function S_(t, e) { (0, aa.default)(t, function (r) { e.categoryMatchesMap[r.tokenTypeIdx] = !0 }), (0, aa.default)(e.CATEGORIES, function (r) { var n = t.concat(e); (0, rre.default)(n, r) || S_(n, r) }) } ce.singleAssignCategoriesToksMap = S_; function yx(t) { return (0, kc.default)(t, "tokenTypeIdx") } ce.hasShortKeyProperty = yx; function P_(t) { return (0, kc.default)(t, "CATEGORIES") } ce.hasCategoriesProperty = P_; function vx(t) { return (0, kc.default)(t, "categoryMatches") } ce.hasExtendingTokensTypesProperty = vx; function _x(t) { return (0, kc.default)(t, "categoryMatchesMap") } ce.hasExtendingTokensTypesMapProperty = _x; function sre(t) { return (0, kc.default)(t, "tokenTypeIdx") } ce.isTokenType = sre }); var C_ = f(np => { "use strict"; Object.defineProperty(np, "__esModule", { value: !0 }); np.defaultLexerErrorProvider = void 0; np.defaultLexerErrorProvider = { buildUnableToPopLexerModeMessage: function (t) { return "Unable to pop Lexer Mode after encountering Token ->".concat(t.image, "<- The Mode Stack is empty") }, buildUnexpectedCharactersMessage: function (t, e, r, n, i) { return "unexpected character: ->".concat(t.charAt(e), "<- at offset: ").concat(e, ",") + " skipped ".concat(r, " characters.") } } }); var Nc = f($i => {
    "use strict"; var xr = $i && $i.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty($i, "__esModule", { value: !0 }); $i.Lexer = $i.LexerDefinitionErrorType = void 0; var Mi = y_(), E_ = xr(jf()), ip = xr(Or()), ure = xr(qe()), cre = xr(rp()), lre = xr(Wf()), Tx = xr(Ut()), N_ = xr(Gt()), dre = xr(Dr()), fre = xr(ia()), Rx = xr(na()), bx = xr(Ac()), pre = xr(Ii()), Ax = xr(wi()), k_ = Ds(), hre = sa(), mre = C_(), gre = Vf(), yre; (function (t) { t[t.MISSING_PATTERN = 0] = "MISSING_PATTERN", t[t.INVALID_PATTERN = 1] = "INVALID_PATTERN", t[t.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", t[t.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", t[t.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", t[t.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", t[t.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", t[t.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", t[t.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", t[t.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", t[t.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", t[t.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", t[t.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", t[t.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", t[t.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", t[t.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", t[t.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK", t[t.MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE = 17] = "MULTI_MODE_LEXER_LONGER_ALT_NOT_IN_CURRENT_MODE" })(yre = $i.LexerDefinitionErrorType || ($i.LexerDefinitionErrorType = {})); var wc = {
      deferDefinitionErrorsHandling: !1, positionTracking: "full", lineTerminatorsPattern: /\n|\r\n?/g, lineTerminatorCharacters: [`
`, "\r"], ensureOptimizations: !1, safeMode: !1, errorMessageProvider: mre.defaultLexerErrorProvider, traceInitPerf: !1, skipValidations: !1, recoveryEnabled: !0
    }; Object.freeze(wc); var vre = function () {
      function t(e, r) {
        r === void 0 && (r = wc); var n = this; if (this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, this.TRACE_INIT = function (o, a) { if (n.traceInitPerf === !0) { n.traceInitIndent++; var s = new Array(n.traceInitIndent + 1).join("	"); n.traceInitIndent < n.traceInitMaxIdent && console.log("".concat(s, "--> <").concat(o, ">")); var u = (0, k_.timer)(a), c = u.time, l = u.value, d = c > 10 ? console.warn : console.log; return n.traceInitIndent < n.traceInitMaxIdent && d("".concat(s, "<-- <").concat(o, "> time: ").concat(c, "ms")), n.traceInitIndent--, l } else return a() }, typeof r == "boolean") throw Error(`The second argument to the Lexer constructor is now an ILexerConfig Object.
a boolean 2nd argument is no longer supported`); this.config = (0, bx.default)({}, wc, r); var i = this.config.traceInitPerf; i === !0 ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : typeof i == "number" && (this.traceInitMaxIdent = i, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", function () {
          var o, a = !0; n.TRACE_INIT("Lexer Config handling", function () {
            if (n.config.lineTerminatorsPattern === wc.lineTerminatorsPattern) n.config.lineTerminatorsPattern = Mi.LineTerminatorOptimizedTester; else if (n.config.lineTerminatorCharacters === wc.lineTerminatorCharacters) throw Error(`Error: Missing <lineTerminatorCharacters> property on the Lexer config.
	For details See: https://chevrotain.io/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS`); if (r.safeMode && r.ensureOptimizations) throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.'); n.trackStartLines = /full|onlyStart/i.test(n.config.positionTracking), n.trackEndLines = /full/i.test(n.config.positionTracking), (0, ure.default)(e) ? o = { modes: { defaultMode: (0, Ax.default)(e) }, defaultMode: Mi.DEFAULT_MODE } : (a = !1, o = (0, Ax.default)(e))
          }), n.config.skipValidations === !1 && (n.TRACE_INIT("performRuntimeChecks", function () { n.lexerDefinitionErrors = n.lexerDefinitionErrors.concat((0, Mi.performRuntimeChecks)(o, n.trackStartLines, n.config.lineTerminatorCharacters)) }), n.TRACE_INIT("performWarningRuntimeChecks", function () { n.lexerDefinitionWarning = n.lexerDefinitionWarning.concat((0, Mi.performWarningRuntimeChecks)(o, n.trackStartLines, n.config.lineTerminatorCharacters)) })), o.modes = o.modes ? o.modes : {}, (0, N_.default)(o.modes, function (l, d) { o.modes[d] = (0, lre.default)(l, function (h) { return (0, fre.default)(h) }) }); var s = (0, dre.default)(o.modes); if ((0, N_.default)(o.modes, function (l, d) { n.TRACE_INIT("Mode: <".concat(d, "> processing"), function () { if (n.modes.push(d), n.config.skipValidations === !1 && n.TRACE_INIT("validatePatterns", function () { n.lexerDefinitionErrors = n.lexerDefinitionErrors.concat((0, Mi.validatePatterns)(l, s)) }), (0, ip.default)(n.lexerDefinitionErrors)) { (0, hre.augmentTokenTypes)(l); var h; n.TRACE_INIT("analyzeTokenTypes", function () { h = (0, Mi.analyzeTokenTypes)(l, { lineTerminatorCharacters: n.config.lineTerminatorCharacters, positionTracking: r.positionTracking, ensureOptimizations: r.ensureOptimizations, safeMode: r.safeMode, tracer: n.TRACE_INIT }) }), n.patternIdxToConfig[d] = h.patternIdxToConfig, n.charCodeToPatternIdxToConfig[d] = h.charCodeToPatternIdxToConfig, n.emptyGroups = (0, bx.default)({}, n.emptyGroups, h.emptyGroups), n.hasCustom = h.hasCustom || n.hasCustom, n.canModeBeOptimized[d] = h.canBeOptimized } }) }), n.defaultMode = o.defaultMode, !(0, ip.default)(n.lexerDefinitionErrors) && !n.config.deferDefinitionErrorsHandling) {
            var u = (0, Tx.default)(n.lexerDefinitionErrors, function (l) { return l.message }), c = u.join(`-----------------------
`); throw new Error(`Errors detected in definition of Lexer:
`+ c)
          } (0, N_.default)(n.lexerDefinitionWarning, function (l) { (0, k_.PRINT_WARNING)(l.message) }), n.TRACE_INIT("Choosing sub-methods implementations", function () { if (Mi.SUPPORT_STICKY ? (n.chopInput = Rx.default, n.match = n.matchWithTest) : (n.updateLastIndex = E_.default, n.match = n.matchWithExec), a && (n.handleModes = E_.default), n.trackStartLines === !1 && (n.computeNewColumn = Rx.default), n.trackEndLines === !1 && (n.updateTokenEndLineColumnLocation = E_.default), /full/i.test(n.config.positionTracking)) n.createTokenInstance = n.createFullToken; else if (/onlyStart/i.test(n.config.positionTracking)) n.createTokenInstance = n.createStartOnlyToken; else if (/onlyOffset/i.test(n.config.positionTracking)) n.createTokenInstance = n.createOffsetOnlyToken; else throw Error('Invalid <positionTracking> config option: "'.concat(n.config.positionTracking, '"')); n.hasCustom ? (n.addToken = n.addTokenUsingPush, n.handlePayload = n.handlePayloadWithCustom) : (n.addToken = n.addTokenUsingMemberAccess, n.handlePayload = n.handlePayloadNoCustom) }), n.TRACE_INIT("Failed Optimization Warnings", function () {
            var l = (0, pre.default)(n.canModeBeOptimized, function (d, h, y) { return h === !1 && d.push(y), d }, []); if (r.ensureOptimizations && !(0, ip.default)(l)) throw Error("Lexer Modes: < ".concat(l.join(", "), ` > cannot be optimized.
`) + `	 Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.
	 Or inspect the console log for details on how to resolve these issues.`)
          }), n.TRACE_INIT("clearRegExpParserCache", function () { (0, gre.clearRegExpParserCache)() }), n.TRACE_INIT("toFastProperties", function () { (0, k_.toFastProperties)(n) })
        })
      } return t.prototype.tokenize = function (e, r) {
        if (r === void 0 && (r = this.defaultMode), !(0, ip.default)(this.lexerDefinitionErrors)) {
          var n = (0, Tx.default)(this.lexerDefinitionErrors, function (o) { return o.message }), i = n.join(`-----------------------
`); throw new Error(`Unable to Tokenize because Errors detected in definition of Lexer:
`+ i)
        } return this.tokenizeInternal(e, r)
      }, t.prototype.tokenizeInternal = function (e, r) { var n = this, i, o, a, s, u, c, l, d, h, y, m, R, C, E, A, b, O = e, L = O.length, W = 0, Z = 0, ke = this.hasCustom ? 0 : Math.floor(e.length / 10), we = new Array(ke), Je = [], K = this.trackStartLines ? 1 : void 0, le = this.trackStartLines ? 1 : void 0, M = (0, Mi.cloneEmptyGroups)(this.emptyGroups), q = this.trackStartLines, F = this.config.lineTerminatorsPattern, B = 0, ie = [], oe = [], J = [], dt = []; Object.freeze(dt); var rt; function Dt() { return ie } function tn(Lt) { var nn = (0, Mi.charCodeToOptimizedIndex)(Lt), on = oe[nn]; return on === void 0 ? dt : on } var Er = function (Lt) { if (J.length === 1 && Lt.tokenType.PUSH_MODE === void 0) { var nn = n.config.errorMessageProvider.buildUnableToPopLexerModeMessage(Lt); Je.push({ offset: Lt.startOffset, line: Lt.startLine, column: Lt.startColumn, length: Lt.image.length, message: nn }) } else { J.pop(); var on = (0, cre.default)(J); ie = n.patternIdxToConfig[on], oe = n.charCodeToPatternIdxToConfig[on], B = ie.length; var qn = n.canModeBeOptimized[on] && n.config.safeMode === !1; oe && qn ? rt = tn : rt = Dt } }; function ba(Lt) { J.push(Lt), oe = this.charCodeToPatternIdxToConfig[Lt], ie = this.patternIdxToConfig[Lt], B = ie.length, B = ie.length; var nn = this.canModeBeOptimized[Lt] && this.config.safeMode === !1; oe && nn ? rt = tn : rt = Dt } ba.call(this, r); for (var ar, Aa = this.config.recoveryEnabled; W < L;) { c = null; var Pa = O.charCodeAt(W), Sa = rt(Pa), vu = Sa.length; for (i = 0; i < vu; i++) { ar = Sa[i]; var gt = ar.pattern; l = null; var pi = ar.short; if (pi !== !1 ? Pa === pi && (c = gt) : ar.isCustom === !0 ? (b = gt.exec(O, W, we, M), b !== null ? (c = b[0], b.payload !== void 0 && (l = b.payload)) : c = null) : (this.updateLastIndex(gt, W), c = this.match(gt, e, W)), c !== null) { if (u = ar.longerAlt, u !== void 0) { var _u = u.length; for (a = 0; a < _u; a++) { var Dn = ie[u[a]], xo = Dn.pattern; if (d = null, Dn.isCustom === !0 ? (b = xo.exec(O, W, we, M), b !== null ? (s = b[0], b.payload !== void 0 && (d = b.payload)) : s = null) : (this.updateLastIndex(xo, W), s = this.match(xo, e, W)), s && s.length > c.length) { c = s, l = d, ar = Dn; break } } } break } } if (c !== null) { if (h = c.length, y = ar.group, y !== void 0 && (m = ar.tokenTypeIdx, R = this.createTokenInstance(c, W, m, ar.tokenType, K, le, h), this.handlePayload(R, l), y === !1 ? Z = this.addToken(we, Z, R) : M[y].push(R)), e = this.chopInput(e, h), W = W + h, le = this.computeNewColumn(le, h), q === !0 && ar.canLineTerminator === !0) { var In = 0, qo = void 0, Mr = void 0; F.lastIndex = 0; do qo = F.test(c), qo === !0 && (Mr = F.lastIndex - 1, In++); while (qo === !0); In !== 0 && (K = K + In, le = h - Mr, this.updateTokenEndLineColumnLocation(R, y, Mr, In, K, le, h)) } this.handleModes(ar, Er, ba, R) } else { for (var rn = W, Ca = K, Ea = le, Nr = Aa === !1; Nr === !1 && W < L;)for (e = this.chopInput(e, 1), W++, o = 0; o < B; o++) { var xn = ie[o], gt = xn.pattern, pi = xn.short; if (pi !== !1 ? O.charCodeAt(W) === pi && (Nr = !0) : xn.isCustom === !0 ? Nr = gt.exec(O, W, we, M) !== null : (this.updateLastIndex(gt, W), Nr = gt.exec(e) !== null), Nr === !0) break } if (C = W - rn, A = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(O, rn, C, Ca, Ea), Je.push({ offset: rn, line: Ca, column: Ea, length: C, message: A }), Aa === !1) break } } return this.hasCustom || (we.length = Z), { tokens: we, groups: M, errors: Je } }, t.prototype.handleModes = function (e, r, n, i) { if (e.pop === !0) { var o = e.push; r(i), o !== void 0 && n.call(this, o) } else e.push !== void 0 && n.call(this, e.push) }, t.prototype.chopInput = function (e, r) { return e.substring(r) }, t.prototype.updateLastIndex = function (e, r) { e.lastIndex = r }, t.prototype.updateTokenEndLineColumnLocation = function (e, r, n, i, o, a, s) { var u, c; r !== void 0 && (u = n === s - 1, c = u ? -1 : 0, i === 1 && u === !0 || (e.endLine = o + c, e.endColumn = a - 1 + -c)) }, t.prototype.computeNewColumn = function (e, r) { return e + r }, t.prototype.createOffsetOnlyToken = function (e, r, n, i) { return { image: e, startOffset: r, tokenTypeIdx: n, tokenType: i } }, t.prototype.createStartOnlyToken = function (e, r, n, i, o, a) { return { image: e, startOffset: r, startLine: o, startColumn: a, tokenTypeIdx: n, tokenType: i } }, t.prototype.createFullToken = function (e, r, n, i, o, a, s) { return { image: e, startOffset: r, endOffset: r + s - 1, startLine: o, endLine: o, startColumn: a, endColumn: a + s - 1, tokenTypeIdx: n, tokenType: i } }, t.prototype.addTokenUsingPush = function (e, r, n) { return e.push(n), r }, t.prototype.addTokenUsingMemberAccess = function (e, r, n) { return e[r] = n, r++, r }, t.prototype.handlePayloadNoCustom = function (e, r) { }, t.prototype.handlePayloadWithCustom = function (e, r) { r !== null && (e.payload = r) }, t.prototype.matchWithTest = function (e, r, n) { var i = e.test(r); return i === !0 ? r.substring(n, e.lastIndex) : null }, t.prototype.matchWithExec = function (e, r) { var n = e.exec(r); return n !== null ? n[0] : null }, t.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.", t.NA = /NOT_APPLICABLE/, t
    }(); $i.Lexer = vre
  }); var ua = f(qt => {
    "use strict"; var w_ = qt && qt.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(qt, "__esModule", { value: !0 }); qt.tokenMatcher = qt.createTokenInstance = qt.EOF = qt.createToken = qt.hasTokenLabel = qt.tokenName = qt.tokenLabel = void 0; var _re = w_(Rc()), Fi = w_(Ir()), Tre = w_(ia()), Rre = Nc(), O_ = sa(); function bre(t) { return Dx(t) ? t.LABEL : t.name } qt.tokenLabel = bre; function Are(t) { return t.name } qt.tokenName = Are; function Dx(t) { return (0, _re.default)(t.LABEL) && t.LABEL !== "" } qt.hasTokenLabel = Dx; var Pre = "parent", Px = "categories", Sx = "label", Cx = "group", Ex = "push_mode", Nx = "pop_mode", kx = "longer_alt", wx = "line_breaks", Ox = "start_chars_hint"; function Ix(t) { return Sre(t) } qt.createToken = Ix; function Sre(t) {
      var e = t.pattern, r = {}; if (r.name = t.name, (0, Tre.default)(e) || (r.PATTERN = e), (0, Fi.default)(t, Pre)) throw `The parent property is no longer supported.
See: https://github.com/chevrotain/chevrotain/issues/564#issuecomment-349062346 for details.`; return (0, Fi.default)(t, Px) && (r.CATEGORIES = t[Px]), (0, O_.augmentTokenTypes)([r]), (0, Fi.default)(t, Sx) && (r.LABEL = t[Sx]), (0, Fi.default)(t, Cx) && (r.GROUP = t[Cx]), (0, Fi.default)(t, Nx) && (r.POP_MODE = t[Nx]), (0, Fi.default)(t, Ex) && (r.PUSH_MODE = t[Ex]), (0, Fi.default)(t, kx) && (r.LONGER_ALT = t[kx]), (0, Fi.default)(t, wx) && (r.LINE_BREAKS = t[wx]), (0, Fi.default)(t, Ox) && (r.START_CHARS_HINT = t[Ox]), r
    } qt.EOF = Ix({ name: "EOF", pattern: Rre.Lexer.NA }); (0, O_.augmentTokenTypes)([qt.EOF]); function Cre(t, e, r, n, i, o, a, s) { return { image: e, startOffset: r, endOffset: n, startLine: i, endLine: o, startColumn: a, endColumn: s, tokenTypeIdx: t.tokenTypeIdx, tokenType: t } } qt.createTokenInstance = Cre; function Ere(t, e) { return (0, O_.tokenStructuredMatcher)(t, e) } qt.tokenMatcher = Ere
  }); var Us = f(En => {
    "use strict"; var x_ = En && En.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(En, "__esModule", { value: !0 }); En.defaultGrammarValidatorErrorProvider = En.defaultGrammarResolverErrorProvider = En.defaultParserErrorProvider = void 0; var js = ua(), I_ = x_(Ls()), vo = x_(Ut()), Nre = x_(Ii()), D_ = _t(), xx = _t(); En.defaultParserErrorProvider = {
      buildMismatchTokenMessage: function (t) { var e = t.expected, r = t.actual, n = t.previous, i = t.ruleName, o = (0, js.hasTokenLabel)(e), a = o ? "--> ".concat((0, js.tokenLabel)(e), " <--") : "token of type --> ".concat(e.name, " <--"), s = "Expecting ".concat(a, " but found --> '").concat(r.image, "' <--"); return s }, buildNotAllInputParsedMessage: function (t) { var e = t.firstRedundant, r = t.ruleName; return "Redundant input, expecting EOF but found: " + e.image }, buildNoViableAltMessage: function (t) {
        var e = t.expectedPathsPerAlt, r = t.actual, n = t.previous, i = t.customUserDescription, o = t.ruleName, a = "Expecting: ", s = (0, I_.default)(r).image, u = `
but found: '`+ s + "'"; if (i) return a + i + u; var c = (0, Nre.default)(e, function (y, m) { return y.concat(m) }, []), l = (0, vo.default)(c, function (y) { return "[".concat((0, vo.default)(y, function (m) { return (0, js.tokenLabel)(m) }).join(", "), "]") }), d = (0, vo.default)(l, function (y, m) { return "  ".concat(m + 1, ". ").concat(y) }), h = `one of these possible Token sequences:
`.concat(d.join(`
`)); return a + h + u
      }, buildEarlyExitMessage: function (t) {
        var e = t.expectedIterationPaths, r = t.actual, n = t.customUserDescription, i = t.ruleName, o = "Expecting: ", a = (0, I_.default)(r).image, s = `
but found: '`+ a + "'"; if (n) return o + n + s; var u = (0, vo.default)(e, function (l) { return "[".concat((0, vo.default)(l, function (d) { return (0, js.tokenLabel)(d) }).join(","), "]") }), c = `expecting at least one iteration which starts with one of these possible Token sequences::
  `+ "<".concat(u.join(" ,"), ">"); return o + c + s
      }
    }; Object.freeze(En.defaultParserErrorProvider); En.defaultGrammarResolverErrorProvider = {
      buildRuleNotFoundError: function (t, e) {
        var r = "Invalid grammar, reference to a rule which is not defined: ->" + e.nonTerminalName + `<-
inside top level rule: ->`+ t.name + "<-"; return r
      }
    }; En.defaultGrammarValidatorErrorProvider = {
      buildDuplicateFoundError: function (t, e) {
        function r(l) { return l instanceof D_.Terminal ? l.terminalType.name : l instanceof D_.NonTerminal ? l.nonTerminalName : "" } var n = t.name, i = (0, I_.default)(e), o = i.idx, a = (0, xx.getProductionDslName)(i), s = r(i), u = o > 0, c = "->".concat(a).concat(u ? o : "", "<- ").concat(s ? "with argument: ->".concat(s, "<-") : "", `
                  appears more than once (`).concat(e.length, " times) in the top level rule: ->").concat(n, `<-.                  
                  For further details see: https://chevrotain.io/docs/FAQ.html#NUMERICAL_SUFFIXES 
                  `); return c = c.replace(/[ \t]+/g, " "), c = c.replace(/\s\s+/g, `
`), c
      }, buildNamespaceConflictError: function (t) {
        var e = `Namespace conflict found in grammar.
`+ "The grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <".concat(t.name, `>.
`) + `To resolve this make sure each Terminal and Non-Terminal names are unique
This is easy to accomplish by using the convention that Terminal names start with an uppercase letter
and Non-Terminal names start with a lower case letter.`; return e
      }, buildAlternationPrefixAmbiguityError: function (t) {
        var e = (0, vo.default)(t.prefixPath, function (i) { return (0, js.tokenLabel)(i) }).join(", "), r = t.alternation.idx === 0 ? "" : t.alternation.idx, n = "Ambiguous alternatives: <".concat(t.ambiguityIndices.join(" ,"), `> due to common lookahead prefix
`) + "in <OR".concat(r, "> inside <").concat(t.topLevelRule.name, `> Rule,
`) + "<".concat(e, `> may appears as a prefix path in all these alternatives.
`) + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX
For Further details.`; return n
      }, buildAlternationAmbiguityError: function (t) {
        var e = (0, vo.default)(t.prefixPath, function (i) { return (0, js.tokenLabel)(i) }).join(", "), r = t.alternation.idx === 0 ? "" : t.alternation.idx, n = "Ambiguous Alternatives Detected: <".concat(t.ambiguityIndices.join(" ,"), "> in <OR").concat(r, ">") + " inside <".concat(t.topLevelRule.name, `> Rule,
`) + "<".concat(e, `> may appears as a prefix path in all these alternatives.
`); return n = n + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, n
      }, buildEmptyRepetitionError: function (t) {
        var e = (0, xx.getProductionDslName)(t.repetition); t.repetition.idx !== 0 && (e += t.repetition.idx); var r = "The repetition <".concat(e, "> within Rule <").concat(t.topLevelRule.name, `> can never consume any tokens.
`) + "This could lead to an infinite loop."; return r
      }, buildTokenNameError: function (t) { return "deprecated" }, buildEmptyAlternationError: function (t) {
        var e = "Ambiguous empty alternative: <".concat(t.emptyChoiceIdx + 1, ">") + " in <OR".concat(t.alternation.idx, "> inside <").concat(t.topLevelRule.name, `> Rule.
`) + "Only the last alternative may be an empty alternative."; return e
      }, buildTooManyAlternativesError: function (t) {
        var e = `An Alternation cannot have more than 256 alternatives:
`+ "<OR".concat(t.alternation.idx, "> inside <").concat(t.topLevelRule.name, `> Rule.
 has `).concat(t.alternation.definition.length + 1, " alternatives."); return e
      }, buildLeftRecursionError: function (t) {
        var e = t.topLevelRule.name, r = (0, vo.default)(t.leftRecursionPath, function (o) { return o.name }), n = "".concat(e, " --> ").concat(r.concat([e]).join(" --> ")), i = `Left Recursion found in grammar.
`+ "rule: <".concat(e, `> can be invoked from itself (directly or indirectly)
`) + `without consuming any Tokens. The grammar path that causes this is: 
 `.concat(n, `
`) + ` To fix this refactor your grammar to remove the left recursion.
see: https://en.wikipedia.org/wiki/LL_parser#Left_factoring.`; return i
      }, buildInvalidRuleNameError: function (t) { return "deprecated" }, buildDuplicateRuleNameError: function (t) { var e; t.topLevelRule instanceof D_.Rule ? e = t.topLevelRule.name : e = t.topLevelRule; var r = "Duplicate definition, rule: ->".concat(e, "<- is already defined in the grammar: ->").concat(t.grammarName, "<-"); return r }
    }
  }); var Mx = f(ni => { "use strict"; var kre = ni && ni.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), qx = ni && ni.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(ni, "__esModule", { value: !0 }); ni.GastRefResolverVisitor = ni.resolveGrammar = void 0; var wre = Ar(), Ore = qx(Gt()), Dre = qx(Yn()), Ire = _t(); function xre(t, e) { var r = new Lx(t, e); return r.resolveRefs(), r.errors } ni.resolveGrammar = xre; var Lx = function (t) { kre(e, t); function e(r, n) { var i = t.call(this) || this; return i.nameToTopRule = r, i.errMsgProvider = n, i.errors = [], i } return e.prototype.resolveRefs = function () { var r = this; (0, Ore.default)((0, Dre.default)(this.nameToTopRule), function (n) { r.currTopLevel = n, n.accept(r) }) }, e.prototype.visitNonTerminal = function (r) { var n = this.nameToTopRule[r.nonTerminalName]; if (n) r.referencedRule = n; else { var i = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, r); this.errors.push({ message: i, type: wre.ParserDefinitionErrorType.UNRESOLVED_SUBRULE_REF, ruleName: this.currTopLevel.name, unresolvedRefName: r.nonTerminalName }) } }, e }(Ire.GAstVisitor); ni.GastRefResolverVisitor = Lx }); var Fx = f((Fye, $x) => { function qre(t, e, r, n) { for (var i = -1, o = t == null ? 0 : t.length; ++i < o;) { var a = t[i]; e(n, a, r(a), t) } return n } $x.exports = qre }); var Ux = f((jye, jx) => { var Lre = go(); function Mre(t, e, r, n) { return Lre(t, function (i, o, a) { e(n, i, r(i), a) }), n } jx.exports = Mre }); var Hx = f((Uye, Gx) => { var $re = Fx(), Fre = Ux(), jre = Xr(), Ure = qe(); function Gre(t, e) { return function (r, n) { var i = Ure(r) ? $re : Fre, o = e ? e() : {}; return i(r, t, jre(n, 2), o) } } Gx.exports = Gre }); var q_ = f((Gye, Wx) => { var Hre = Sf(), Wre = Hx(), Bre = Object.prototype, Kre = Bre.hasOwnProperty, zre = Wre(function (t, e, r) { Kre.call(t, r) ? t[r].push(e) : Hre(t, r, [e]) }); Wx.exports = zre }); var op = f((Hye, Bx) => { var Vre = Ff(), Yre = Ut(); function Xre(t, e) { return Vre(Yre(t, e), 1) } Bx.exports = Xre }); var ap = f((Wye, Kx) => { var Jre = kf(), Qre = Is(); function Zre(t, e, r) { var n = t == null ? 0 : t.length; return n ? (e = r || e === void 0 ? 1 : Qre(e), e = n - e, Jre(t, 0, e < 0 ? 0 : e)) : [] } Kx.exports = Zre }); var Dc = f(ut => { "use strict"; var la = ut && ut.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), da = ut && ut.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(ut, "__esModule", { value: !0 }); ut.nextPossibleTokensAfter = ut.possiblePathsFrom = ut.NextTerminalAfterAtLeastOneSepWalker = ut.NextTerminalAfterAtLeastOneWalker = ut.NextTerminalAfterManySepWalker = ut.NextTerminalAfterManyWalker = ut.AbstractNextTerminalAfterProductionWalker = ut.NextAfterTokenWalker = ut.AbstractNextPossibleTokensWalker = void 0; var Vx = $f(), up = da(Ls()), sp = da(Or()), zx = da(ap()), pr = da(wf()), ene = da(rp()), tne = da(Gt()), ca = da(wi()), rne = l_(), de = _t(), Yx = function (t) { la(e, t); function e(r, n) { var i = t.call(this) || this; return i.topProd = r, i.path = n, i.possibleTokTypes = [], i.nextProductionName = "", i.nextProductionOccurrence = 0, i.found = !1, i.isAtEndOfPath = !1, i } return e.prototype.startWalking = function () { if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name) throw Error("The path does not start with the walker's top Rule!"); return this.ruleStack = (0, ca.default)(this.path.ruleStack).reverse(), this.occurrenceStack = (0, ca.default)(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes }, e.prototype.walk = function (r, n) { n === void 0 && (n = []), this.found || t.prototype.walk.call(this, r, n) }, e.prototype.walkProdRef = function (r, n, i) { if (r.referencedRule.name === this.nextProductionName && r.idx === this.nextProductionOccurrence) { var o = n.concat(i); this.updateExpectedNext(), this.walk(r.referencedRule, o) } }, e.prototype.updateExpectedNext = function () { (0, sp.default)(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop()) }, e }(Vx.RestWalker); ut.AbstractNextPossibleTokensWalker = Yx; var nne = function (t) { la(e, t); function e(r, n) { var i = t.call(this, r, n) || this; return i.path = n, i.nextTerminalName = "", i.nextTerminalOccurrence = 0, i.nextTerminalName = i.path.lastTok.name, i.nextTerminalOccurrence = i.path.lastTokOccurrence, i } return e.prototype.walkTerminal = function (r, n, i) { if (this.isAtEndOfPath && r.terminalType.name === this.nextTerminalName && r.idx === this.nextTerminalOccurrence && !this.found) { var o = n.concat(i), a = new de.Alternative({ definition: o }); this.possibleTokTypes = (0, rne.first)(a), this.found = !0 } }, e }(Yx); ut.NextAfterTokenWalker = nne; var Oc = function (t) { la(e, t); function e(r, n) { var i = t.call(this) || this; return i.topRule = r, i.occurrence = n, i.result = { token: void 0, occurrence: void 0, isEndOfRule: void 0 }, i } return e.prototype.startWalking = function () { return this.walk(this.topRule), this.result }, e }(Vx.RestWalker); ut.AbstractNextTerminalAfterProductionWalker = Oc; var ine = function (t) { la(e, t); function e() { return t !== null && t.apply(this, arguments) || this } return e.prototype.walkMany = function (r, n, i) { if (r.idx === this.occurrence) { var o = (0, up.default)(n.concat(i)); this.result.isEndOfRule = o === void 0, o instanceof de.Terminal && (this.result.token = o.terminalType, this.result.occurrence = o.idx) } else t.prototype.walkMany.call(this, r, n, i) }, e }(Oc); ut.NextTerminalAfterManyWalker = ine; var one = function (t) { la(e, t); function e() { return t !== null && t.apply(this, arguments) || this } return e.prototype.walkManySep = function (r, n, i) { if (r.idx === this.occurrence) { var o = (0, up.default)(n.concat(i)); this.result.isEndOfRule = o === void 0, o instanceof de.Terminal && (this.result.token = o.terminalType, this.result.occurrence = o.idx) } else t.prototype.walkManySep.call(this, r, n, i) }, e }(Oc); ut.NextTerminalAfterManySepWalker = one; var ane = function (t) { la(e, t); function e() { return t !== null && t.apply(this, arguments) || this } return e.prototype.walkAtLeastOne = function (r, n, i) { if (r.idx === this.occurrence) { var o = (0, up.default)(n.concat(i)); this.result.isEndOfRule = o === void 0, o instanceof de.Terminal && (this.result.token = o.terminalType, this.result.occurrence = o.idx) } else t.prototype.walkAtLeastOne.call(this, r, n, i) }, e }(Oc); ut.NextTerminalAfterAtLeastOneWalker = ane; var sne = function (t) { la(e, t); function e() { return t !== null && t.apply(this, arguments) || this } return e.prototype.walkAtLeastOneSep = function (r, n, i) { if (r.idx === this.occurrence) { var o = (0, up.default)(n.concat(i)); this.result.isEndOfRule = o === void 0, o instanceof de.Terminal && (this.result.token = o.terminalType, this.result.occurrence = o.idx) } else t.prototype.walkAtLeastOneSep.call(this, r, n, i) }, e }(Oc); ut.NextTerminalAfterAtLeastOneSepWalker = sne; function Xx(t, e, r) { r === void 0 && (r = []), r = (0, ca.default)(r); var n = [], i = 0; function o(c) { return c.concat((0, pr.default)(t, i + 1)) } function a(c) { var l = Xx(o(c), e, r); return n.concat(l) } for (; r.length < e && i < t.length;) { var s = t[i]; if (s instanceof de.Alternative) return a(s.definition); if (s instanceof de.NonTerminal) return a(s.definition); if (s instanceof de.Option) n = a(s.definition); else if (s instanceof de.RepetitionMandatory) { var u = s.definition.concat([new de.Repetition({ definition: s.definition })]); return a(u) } else if (s instanceof de.RepetitionMandatoryWithSeparator) { var u = [new de.Alternative({ definition: s.definition }), new de.Repetition({ definition: [new de.Terminal({ terminalType: s.separator })].concat(s.definition) })]; return a(u) } else if (s instanceof de.RepetitionWithSeparator) { var u = s.definition.concat([new de.Repetition({ definition: [new de.Terminal({ terminalType: s.separator })].concat(s.definition) })]); n = a(u) } else if (s instanceof de.Repetition) { var u = s.definition.concat([new de.Repetition({ definition: s.definition })]); n = a(u) } else { if (s instanceof de.Alternation) return (0, tne.default)(s.definition, function (c) { (0, sp.default)(c.definition) === !1 && (n = a(c.definition)) }), n; if (s instanceof de.Terminal) r.push(s.terminalType); else throw Error("non exhaustive match") } i++ } return n.push({ partialPath: r, suffixDef: (0, pr.default)(t, i) }), n } ut.possiblePathsFrom = Xx; function une(t, e, r, n) { var i = "EXIT_NONE_TERMINAL", o = [i], a = "EXIT_ALTERNATIVE", s = !1, u = e.length, c = u - n - 1, l = [], d = []; for (d.push({ idx: -1, def: t, ruleStack: [], occurrenceStack: [] }); !(0, sp.default)(d);) { var h = d.pop(); if (h === a) { s && (0, ene.default)(d).idx <= c && d.pop(); continue } var y = h.def, m = h.idx, R = h.ruleStack, C = h.occurrenceStack; if (!(0, sp.default)(y)) { var E = y[0]; if (E === i) { var A = { idx: m, def: (0, pr.default)(y), ruleStack: (0, zx.default)(R), occurrenceStack: (0, zx.default)(C) }; d.push(A) } else if (E instanceof de.Terminal) if (m < u - 1) { var b = m + 1, O = e[b]; if (r(O, E.terminalType)) { var A = { idx: b, def: (0, pr.default)(y), ruleStack: R, occurrenceStack: C }; d.push(A) } } else if (m === u - 1) l.push({ nextTokenType: E.terminalType, nextTokenOccurrence: E.idx, ruleStack: R, occurrenceStack: C }), s = !0; else throw Error("non exhaustive match"); else if (E instanceof de.NonTerminal) { var L = (0, ca.default)(R); L.push(E.nonTerminalName); var W = (0, ca.default)(C); W.push(E.idx); var A = { idx: m, def: E.definition.concat(o, (0, pr.default)(y)), ruleStack: L, occurrenceStack: W }; d.push(A) } else if (E instanceof de.Option) { var Z = { idx: m, def: (0, pr.default)(y), ruleStack: R, occurrenceStack: C }; d.push(Z), d.push(a); var ke = { idx: m, def: E.definition.concat((0, pr.default)(y)), ruleStack: R, occurrenceStack: C }; d.push(ke) } else if (E instanceof de.RepetitionMandatory) { var we = new de.Repetition({ definition: E.definition, idx: E.idx }), Je = E.definition.concat([we], (0, pr.default)(y)), A = { idx: m, def: Je, ruleStack: R, occurrenceStack: C }; d.push(A) } else if (E instanceof de.RepetitionMandatoryWithSeparator) { var K = new de.Terminal({ terminalType: E.separator }), we = new de.Repetition({ definition: [K].concat(E.definition), idx: E.idx }), Je = E.definition.concat([we], (0, pr.default)(y)), A = { idx: m, def: Je, ruleStack: R, occurrenceStack: C }; d.push(A) } else if (E instanceof de.RepetitionWithSeparator) { var Z = { idx: m, def: (0, pr.default)(y), ruleStack: R, occurrenceStack: C }; d.push(Z), d.push(a); var K = new de.Terminal({ terminalType: E.separator }), le = new de.Repetition({ definition: [K].concat(E.definition), idx: E.idx }), Je = E.definition.concat([le], (0, pr.default)(y)), ke = { idx: m, def: Je, ruleStack: R, occurrenceStack: C }; d.push(ke) } else if (E instanceof de.Repetition) { var Z = { idx: m, def: (0, pr.default)(y), ruleStack: R, occurrenceStack: C }; d.push(Z), d.push(a); var le = new de.Repetition({ definition: E.definition, idx: E.idx }), Je = E.definition.concat([le], (0, pr.default)(y)), ke = { idx: m, def: Je, ruleStack: R, occurrenceStack: C }; d.push(ke) } else if (E instanceof de.Alternation) for (var M = E.definition.length - 1; M >= 0; M--) { var q = E.definition[M], F = { idx: m, def: q.definition.concat((0, pr.default)(y)), ruleStack: R, occurrenceStack: C }; d.push(F), d.push(a) } else if (E instanceof de.Alternative) d.push({ idx: m, def: E.definition.concat((0, pr.default)(y)), ruleStack: R, occurrenceStack: C }); else if (E instanceof de.Rule) d.push(cne(E, m, R, C)); else throw Error("non exhaustive match") } } return l } ut.nextPossibleTokensAfter = une; function cne(t, e, r, n) { var i = (0, ca.default)(r); i.push(t.name); var o = (0, ca.default)(n); return o.push(1), { idx: e, def: t.definition, ruleStack: i, occurrenceStack: o } } }); var Gs = f(Te => { "use strict"; var eq = Te && Te.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), ha = Te && Te.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Te, "__esModule", { value: !0 }); Te.areTokenCategoriesNotUsed = Te.isStrictPrefixOfPath = Te.containsPath = Te.getLookaheadPathsForOptionalProd = Te.getLookaheadPathsForOr = Te.lookAheadSequenceFromAlternatives = Te.buildSingleAlternativeLookaheadFunction = Te.buildAlternativesLookAheadFunc = Te.buildLookaheadFuncForOptionalProd = Te.buildLookaheadFuncForOr = Te.getLookaheadPaths = Te.getProdType = Te.PROD_TYPE = void 0; var M_ = ha(Or()), tq = ha(Cn()), pa = ha(Sc()), cp = ha(Ut()), fa = ha(Gt()), Jx = ha(Ir()), rq = ha(Ii()), Qx = Dc(), lne = $f(), lp = sa(), _o = _t(), dne = _t(), Nt; (function (t) { t[t.OPTION = 0] = "OPTION", t[t.REPETITION = 1] = "REPETITION", t[t.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", t[t.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", t[t.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", t[t.ALTERNATION = 5] = "ALTERNATION" })(Nt = Te.PROD_TYPE || (Te.PROD_TYPE = {})); function nq(t) { if (t instanceof _o.Option || t === "Option") return Nt.OPTION; if (t instanceof _o.Repetition || t === "Repetition") return Nt.REPETITION; if (t instanceof _o.RepetitionMandatory || t === "RepetitionMandatory") return Nt.REPETITION_MANDATORY; if (t instanceof _o.RepetitionMandatoryWithSeparator || t === "RepetitionMandatoryWithSeparator") return Nt.REPETITION_MANDATORY_WITH_SEPARATOR; if (t instanceof _o.RepetitionWithSeparator || t === "RepetitionWithSeparator") return Nt.REPETITION_WITH_SEPARATOR; if (t instanceof _o.Alternation || t === "Alternation") return Nt.ALTERNATION; throw Error("non exhaustive match") } Te.getProdType = nq; function fne(t) { var e = t.occurrence, r = t.rule, n = t.prodType, i = t.maxLookahead, o = nq(n); return o === Nt.ALTERNATION ? F_(e, r, i) : j_(e, r, o, i) } Te.getLookaheadPaths = fne; function pne(t, e, r, n, i, o) { var a = F_(t, e, r), s = U_(a) ? lp.tokenStructuredMatcherNoCategories : lp.tokenStructuredMatcher; return o(a, n, s, i) } Te.buildLookaheadFuncForOr = pne; function hne(t, e, r, n, i, o) { var a = j_(t, e, i, r), s = U_(a) ? lp.tokenStructuredMatcherNoCategories : lp.tokenStructuredMatcher; return o(a[0], s, n) } Te.buildLookaheadFuncForOptionalProd = hne; function mne(t, e, r, n) { var i = t.length, o = (0, pa.default)(t, function (u) { return (0, pa.default)(u, function (c) { return c.length === 1 }) }); if (e) return function (u) { for (var c = (0, cp.default)(u, function (b) { return b.GATE }), l = 0; l < i; l++) { var d = t[l], h = d.length, y = c[l]; if (y !== void 0 && y.call(this) === !1) continue; e: for (var m = 0; m < h; m++) { for (var R = d[m], C = R.length, E = 0; E < C; E++) { var A = this.LA(E + 1); if (r(A, R[E]) === !1) continue e } return l } } }; if (o && !n) { var a = (0, cp.default)(t, function (u) { return (0, tq.default)(u) }), s = (0, rq.default)(a, function (u, c, l) { return (0, fa.default)(c, function (d) { (0, Jx.default)(u, d.tokenTypeIdx) || (u[d.tokenTypeIdx] = l), (0, fa.default)(d.categoryMatches, function (h) { (0, Jx.default)(u, h) || (u[h] = l) }) }), u }, {}); return function () { var u = this.LA(1); return s[u.tokenTypeIdx] } } else return function () { for (var u = 0; u < i; u++) { var c = t[u], l = c.length; e: for (var d = 0; d < l; d++) { for (var h = c[d], y = h.length, m = 0; m < y; m++) { var R = this.LA(m + 1); if (r(R, h[m]) === !1) continue e } return u } } } } Te.buildAlternativesLookAheadFunc = mne; function gne(t, e, r) { var n = (0, pa.default)(t, function (c) { return c.length === 1 }), i = t.length; if (n && !r) { var o = (0, tq.default)(t); if (o.length === 1 && (0, M_.default)(o[0].categoryMatches)) { var a = o[0], s = a.tokenTypeIdx; return function () { return this.LA(1).tokenTypeIdx === s } } else { var u = (0, rq.default)(o, function (c, l, d) { return c[l.tokenTypeIdx] = !0, (0, fa.default)(l.categoryMatches, function (h) { c[h] = !0 }), c }, []); return function () { var c = this.LA(1); return u[c.tokenTypeIdx] === !0 } } } else return function () { e: for (var c = 0; c < i; c++) { for (var l = t[c], d = l.length, h = 0; h < d; h++) { var y = this.LA(h + 1); if (e(y, l[h]) === !1) continue e } return !0 } return !1 } } Te.buildSingleAlternativeLookaheadFunction = gne; var yne = function (t) { eq(e, t); function e(r, n, i) { var o = t.call(this) || this; return o.topProd = r, o.targetOccurrence = n, o.targetProdType = i, o } return e.prototype.startWalking = function () { return this.walk(this.topProd), this.restDef }, e.prototype.checkIsTarget = function (r, n, i, o) { return r.idx === this.targetOccurrence && this.targetProdType === n ? (this.restDef = i.concat(o), !0) : !1 }, e.prototype.walkOption = function (r, n, i) { this.checkIsTarget(r, Nt.OPTION, n, i) || t.prototype.walkOption.call(this, r, n, i) }, e.prototype.walkAtLeastOne = function (r, n, i) { this.checkIsTarget(r, Nt.REPETITION_MANDATORY, n, i) || t.prototype.walkOption.call(this, r, n, i) }, e.prototype.walkAtLeastOneSep = function (r, n, i) { this.checkIsTarget(r, Nt.REPETITION_MANDATORY_WITH_SEPARATOR, n, i) || t.prototype.walkOption.call(this, r, n, i) }, e.prototype.walkMany = function (r, n, i) { this.checkIsTarget(r, Nt.REPETITION, n, i) || t.prototype.walkOption.call(this, r, n, i) }, e.prototype.walkManySep = function (r, n, i) { this.checkIsTarget(r, Nt.REPETITION_WITH_SEPARATOR, n, i) || t.prototype.walkOption.call(this, r, n, i) }, e }(lne.RestWalker), iq = function (t) { eq(e, t); function e(r, n, i) { var o = t.call(this) || this; return o.targetOccurrence = r, o.targetProdType = n, o.targetRef = i, o.result = [], o } return e.prototype.checkIsTarget = function (r, n) { r.idx === this.targetOccurrence && this.targetProdType === n && (this.targetRef === void 0 || r === this.targetRef) && (this.result = r.definition) }, e.prototype.visitOption = function (r) { this.checkIsTarget(r, Nt.OPTION) }, e.prototype.visitRepetition = function (r) { this.checkIsTarget(r, Nt.REPETITION) }, e.prototype.visitRepetitionMandatory = function (r) { this.checkIsTarget(r, Nt.REPETITION_MANDATORY) }, e.prototype.visitRepetitionMandatoryWithSeparator = function (r) { this.checkIsTarget(r, Nt.REPETITION_MANDATORY_WITH_SEPARATOR) }, e.prototype.visitRepetitionWithSeparator = function (r) { this.checkIsTarget(r, Nt.REPETITION_WITH_SEPARATOR) }, e.prototype.visitAlternation = function (r) { this.checkIsTarget(r, Nt.ALTERNATION) }, e }(dne.GAstVisitor); function Zx(t) { for (var e = new Array(t), r = 0; r < t; r++)e[r] = []; return e } function L_(t) { for (var e = [""], r = 0; r < t.length; r++) { for (var n = t[r], i = [], o = 0; o < e.length; o++) { var a = e[o]; i.push(a + "_" + n.tokenTypeIdx); for (var s = 0; s < n.categoryMatches.length; s++) { var u = "_" + n.categoryMatches[s]; i.push(a + u) } } e = i } return e } function vne(t, e, r) { for (var n = 0; n < t.length; n++)if (n !== r) for (var i = t[n], o = 0; o < e.length; o++) { var a = e[o]; if (i[a] === !0) return !1 } return !0 } function $_(t, e) { for (var r = (0, cp.default)(t, function (l) { return (0, Qx.possiblePathsFrom)([l], 1) }), n = Zx(r.length), i = (0, cp.default)(r, function (l) { var d = {}; return (0, fa.default)(l, function (h) { var y = L_(h.partialPath); (0, fa.default)(y, function (m) { d[m] = !0 }) }), d }), o = r, a = 1; a <= e; a++) { var s = o; o = Zx(s.length); for (var u = function (l) { for (var d = s[l], h = 0; h < d.length; h++) { var y = d[h].partialPath, m = d[h].suffixDef, R = L_(y), C = vne(i, R, l); if (C || (0, M_.default)(m) || y.length === e) { var E = n[l]; if (oq(E, y) === !1) { E.push(y); for (var A = 0; A < R.length; A++) { var b = R[A]; i[l][b] = !0 } } } else { var O = (0, Qx.possiblePathsFrom)(m, a + 1, y); o[l] = o[l].concat(O), (0, fa.default)(O, function (L) { var W = L_(L.partialPath); (0, fa.default)(W, function (Z) { i[l][Z] = !0 }) }) } } }, c = 0; c < s.length; c++)u(c) } return n } Te.lookAheadSequenceFromAlternatives = $_; function F_(t, e, r, n) { var i = new iq(t, Nt.ALTERNATION, n); return e.accept(i), $_(i.result, r) } Te.getLookaheadPathsForOr = F_; function j_(t, e, r, n) { var i = new iq(t, r); e.accept(i); var o = i.result, a = new yne(e, t, r), s = a.startWalking(), u = new _o.Alternative({ definition: o }), c = new _o.Alternative({ definition: s }); return $_([u, c], n) } Te.getLookaheadPathsForOptionalProd = j_; function oq(t, e) { e: for (var r = 0; r < t.length; r++) { var n = t[r]; if (n.length === e.length) { for (var i = 0; i < n.length; i++) { var o = e[i], a = n[i], s = o === a || a.categoryMatchesMap[o.tokenTypeIdx] !== void 0; if (s === !1) continue e } return !0 } } return !1 } Te.containsPath = oq; function _ne(t, e) { return t.length < e.length && (0, pa.default)(t, function (r, n) { var i = e[n]; return r === i || i.categoryMatchesMap[r.tokenTypeIdx] }) } Te.isStrictPrefixOfPath = _ne; function U_(t) { return (0, pa.default)(t, function (e) { return (0, pa.default)(e, function (r) { return (0, pa.default)(r, function (n) { return (0, M_.default)(n.categoryMatches) }) }) }) } Te.areTokenCategoriesNotUsed = U_ }); var qc = f(me => { "use strict"; var H_ = me && me.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), G_ = me && me.__assign || function () { return G_ = Object.assign || function (t) { for (var e, r = 1, n = arguments.length; r < n; r++) { e = arguments[r]; for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]) } return t }, G_.apply(this, arguments) }, Ht = me && me.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(me, "__esModule", { value: !0 }); me.checkPrefixAlternativesAmbiguities = me.validateSomeNonEmptyLookaheadPath = me.validateTooManyAlts = me.RepetitionCollector = me.validateAmbiguousAlternationAlternatives = me.validateEmptyOrAlternative = me.getFirstNoneTerminal = me.validateNoLeftRecursion = me.validateRuleIsOverridden = me.validateRuleDoesNotAlreadyExist = me.OccurrenceValidationCollector = me.identifyProductionForDuplicates = me.validateGrammar = me.validateLookahead = void 0; var aq = Ht(Ls()), dp = Ht(Or()), Tne = Ht(wf()), sq = Ht(Cn()), Rne = Ht(Ec()), bne = Ht(Wf()), Ane = Ht(Bf()), To = Ht(Ut()), xc = Ht(Gt()), Pne = Ht(q_()), W_ = Ht(Ii()), Sne = Ht(Zv()), Cne = Ht(Yn()), B_ = Ht(Di()), ji = Ht(op()), Ene = Ht(wi()), kn = Ar(), K_ = _t(), Hs = Gs(), Nne = Dc(), Nn = _t(), z_ = _t(), kne = Ht(ap()), wne = Ht(Cc()), One = sa(); function Dne(t) { var e = t.lookaheadStrategy.validate({ rules: t.rules, tokenTypes: t.tokenTypes, grammarName: t.grammarName }); return (0, To.default)(e, function (r) { return G_({ type: kn.ParserDefinitionErrorType.CUSTOM_LOOKAHEAD_VALIDATION }, r) }) } me.validateLookahead = Dne; function Ine(t, e, r, n) { var i = (0, ji.default)(t, function (u) { return xne(u, r) }), o = jne(t, e, r), a = (0, ji.default)(t, function (u) { return hq(u, r) }), s = (0, ji.default)(t, function (u) { return dq(u, t, n, r) }); return i.concat(o, a, s) } me.validateGrammar = Ine; function xne(t, e) { var r = new lq; t.accept(r); var n = r.allProductions, i = (0, Pne.default)(n, uq), o = (0, Sne.default)(i, function (s) { return s.length > 1 }), a = (0, To.default)((0, Cne.default)(o), function (s) { var u = (0, aq.default)(s), c = e.buildDuplicateFoundError(t, s), l = (0, K_.getProductionDslName)(u), d = { message: c, type: kn.ParserDefinitionErrorType.DUPLICATE_PRODUCTIONS, ruleName: t.name, dslName: l, occurrence: u.idx }, h = cq(u); return h && (d.parameter = h), d }); return a } function uq(t) { return "".concat((0, K_.getProductionDslName)(t), "_#_").concat(t.idx, "_#_").concat(cq(t)) } me.identifyProductionForDuplicates = uq; function cq(t) { return t instanceof Nn.Terminal ? t.terminalType.name : t instanceof Nn.NonTerminal ? t.nonTerminalName : "" } var lq = function (t) { H_(e, t); function e() { var r = t !== null && t.apply(this, arguments) || this; return r.allProductions = [], r } return e.prototype.visitNonTerminal = function (r) { this.allProductions.push(r) }, e.prototype.visitOption = function (r) { this.allProductions.push(r) }, e.prototype.visitRepetitionWithSeparator = function (r) { this.allProductions.push(r) }, e.prototype.visitRepetitionMandatory = function (r) { this.allProductions.push(r) }, e.prototype.visitRepetitionMandatoryWithSeparator = function (r) { this.allProductions.push(r) }, e.prototype.visitRepetition = function (r) { this.allProductions.push(r) }, e.prototype.visitAlternation = function (r) { this.allProductions.push(r) }, e.prototype.visitTerminal = function (r) { this.allProductions.push(r) }, e }(z_.GAstVisitor); me.OccurrenceValidationCollector = lq; function dq(t, e, r, n) { var i = [], o = (0, W_.default)(e, function (s, u) { return u.name === t.name ? s + 1 : s }, 0); if (o > 1) { var a = n.buildDuplicateRuleNameError({ topLevelRule: t, grammarName: r }); i.push({ message: a, type: kn.ParserDefinitionErrorType.DUPLICATE_RULE_NAME, ruleName: t.name }) } return i } me.validateRuleDoesNotAlreadyExist = dq; function qne(t, e, r) { var n = [], i; return (0, B_.default)(e, t) || (i = "Invalid rule override, rule: ->".concat(t, "<- cannot be overridden in the grammar: ->").concat(r, "<-") + "as it is not defined in any of the super grammars ", n.push({ message: i, type: kn.ParserDefinitionErrorType.INVALID_RULE_OVERRIDE, ruleName: t })), n } me.validateRuleIsOverridden = qne; function fq(t, e, r, n) { n === void 0 && (n = []); var i = [], o = Ic(e.definition); if ((0, dp.default)(o)) return []; var a = t.name, s = (0, B_.default)(o, t); s && i.push({ message: r.buildLeftRecursionError({ topLevelRule: t, leftRecursionPath: n }), type: kn.ParserDefinitionErrorType.LEFT_RECURSION, ruleName: a }); var u = (0, Ane.default)(o, n.concat([t])), c = (0, ji.default)(u, function (l) { var d = (0, Ene.default)(n); return d.push(l), fq(t, l, r, d) }); return i.concat(c) } me.validateNoLeftRecursion = fq; function Ic(t) { var e = []; if ((0, dp.default)(t)) return e; var r = (0, aq.default)(t); if (r instanceof Nn.NonTerminal) e.push(r.referencedRule); else if (r instanceof Nn.Alternative || r instanceof Nn.Option || r instanceof Nn.RepetitionMandatory || r instanceof Nn.RepetitionMandatoryWithSeparator || r instanceof Nn.RepetitionWithSeparator || r instanceof Nn.Repetition) e = e.concat(Ic(r.definition)); else if (r instanceof Nn.Alternation) e = (0, sq.default)((0, To.default)(r.definition, function (a) { return Ic(a.definition) })); else if (!(r instanceof Nn.Terminal)) throw Error("non exhaustive match"); var n = (0, K_.isOptionalProd)(r), i = t.length > 1; if (n && i) { var o = (0, Tne.default)(t); return e.concat(Ic(o)) } else return e } me.getFirstNoneTerminal = Ic; var V_ = function (t) { H_(e, t); function e() { var r = t !== null && t.apply(this, arguments) || this; return r.alternations = [], r } return e.prototype.visitAlternation = function (r) { this.alternations.push(r) }, e }(z_.GAstVisitor); function Lne(t, e) { var r = new V_; t.accept(r); var n = r.alternations, i = (0, ji.default)(n, function (o) { var a = (0, kne.default)(o.definition); return (0, ji.default)(a, function (s, u) { var c = (0, Nne.nextPossibleTokensAfter)([s], [], One.tokenStructuredMatcher, 1); return (0, dp.default)(c) ? [{ message: e.buildEmptyAlternationError({ topLevelRule: t, alternation: o, emptyChoiceIdx: u }), type: kn.ParserDefinitionErrorType.NONE_LAST_EMPTY_ALT, ruleName: t.name, occurrence: o.idx, alternative: u + 1 }] : [] }) }); return i } me.validateEmptyOrAlternative = Lne; function Mne(t, e, r) { var n = new V_; t.accept(n); var i = n.alternations; i = (0, bne.default)(i, function (a) { return a.ignoreAmbiguities === !0 }); var o = (0, ji.default)(i, function (a) { var s = a.idx, u = a.maxLookahead || e, c = (0, Hs.getLookaheadPathsForOr)(s, t, u, a), l = Fne(c, a, t, r), d = mq(c, a, t, r); return l.concat(d) }); return o } me.validateAmbiguousAlternationAlternatives = Mne; var pq = function (t) { H_(e, t); function e() { var r = t !== null && t.apply(this, arguments) || this; return r.allProductions = [], r } return e.prototype.visitRepetitionWithSeparator = function (r) { this.allProductions.push(r) }, e.prototype.visitRepetitionMandatory = function (r) { this.allProductions.push(r) }, e.prototype.visitRepetitionMandatoryWithSeparator = function (r) { this.allProductions.push(r) }, e.prototype.visitRepetition = function (r) { this.allProductions.push(r) }, e }(z_.GAstVisitor); me.RepetitionCollector = pq; function hq(t, e) { var r = new V_; t.accept(r); var n = r.alternations, i = (0, ji.default)(n, function (o) { return o.definition.length > 255 ? [{ message: e.buildTooManyAlternativesError({ topLevelRule: t, alternation: o }), type: kn.ParserDefinitionErrorType.TOO_MANY_ALTS, ruleName: t.name, occurrence: o.idx }] : [] }); return i } me.validateTooManyAlts = hq; function $ne(t, e, r) { var n = []; return (0, xc.default)(t, function (i) { var o = new pq; i.accept(o); var a = o.allProductions; (0, xc.default)(a, function (s) { var u = (0, Hs.getProdType)(s), c = s.maxLookahead || e, l = s.idx, d = (0, Hs.getLookaheadPathsForOptionalProd)(l, i, u, c), h = d[0]; if ((0, dp.default)((0, sq.default)(h))) { var y = r.buildEmptyRepetitionError({ topLevelRule: i, repetition: s }); n.push({ message: y, type: kn.ParserDefinitionErrorType.NO_NON_EMPTY_LOOKAHEAD, ruleName: i.name }) } }) }), n } me.validateSomeNonEmptyLookaheadPath = $ne; function Fne(t, e, r, n) { var i = [], o = (0, W_.default)(t, function (s, u, c) { return e.definition[c].ignoreAmbiguities === !0 || (0, xc.default)(u, function (l) { var d = [c]; (0, xc.default)(t, function (h, y) { c !== y && (0, Hs.containsPath)(h, l) && e.definition[y].ignoreAmbiguities !== !0 && d.push(y) }), d.length > 1 && !(0, Hs.containsPath)(i, l) && (i.push(l), s.push({ alts: d, path: l })) }), s }, []), a = (0, To.default)(o, function (s) { var u = (0, To.default)(s.alts, function (l) { return l + 1 }), c = n.buildAlternationAmbiguityError({ topLevelRule: r, alternation: e, ambiguityIndices: u, prefixPath: s.path }); return { message: c, type: kn.ParserDefinitionErrorType.AMBIGUOUS_ALTS, ruleName: r.name, occurrence: e.idx, alternatives: s.alts } }); return a } function mq(t, e, r, n) { var i = (0, W_.default)(t, function (a, s, u) { var c = (0, To.default)(s, function (l) { return { idx: u, path: l } }); return a.concat(c) }, []), o = (0, wne.default)((0, ji.default)(i, function (a) { var s = e.definition[a.idx]; if (s.ignoreAmbiguities === !0) return []; var u = a.idx, c = a.path, l = (0, Rne.default)(i, function (h) { return e.definition[h.idx].ignoreAmbiguities !== !0 && h.idx < u && (0, Hs.isStrictPrefixOfPath)(h.path, c) }), d = (0, To.default)(l, function (h) { var y = [h.idx + 1, u + 1], m = e.idx === 0 ? "" : e.idx, R = n.buildAlternationPrefixAmbiguityError({ topLevelRule: r, alternation: e, ambiguityIndices: y, prefixPath: h.path }); return { message: R, type: kn.ParserDefinitionErrorType.AMBIGUOUS_PREFIX_ALTS, ruleName: r.name, occurrence: m, alternatives: y } }); return d })); return o } me.checkPrefixAlternativesAmbiguities = mq; function jne(t, e, r) { var n = [], i = (0, To.default)(e, function (o) { return o.name }); return (0, xc.default)(t, function (o) { var a = o.name; if ((0, B_.default)(i, a)) { var s = r.buildNamespaceConflictError(o); n.push({ message: s, type: kn.ParserDefinitionErrorType.CONFLICT_TOKENS_RULES_NAMESPACE, ruleName: a }) } }), n } }); var _q = f(Ro => { "use strict"; var gq = Ro && Ro.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Ro, "__esModule", { value: !0 }); Ro.validateGrammar = Ro.resolveGrammar = void 0; var Une = gq(Gt()), yq = gq(p_()), Gne = Mx(), Hne = qc(), vq = Us(); function Wne(t) { var e = (0, yq.default)(t, { errMsgProvider: vq.defaultGrammarResolverErrorProvider }), r = {}; return (0, Une.default)(t.rules, function (n) { r[n.name] = n }), (0, Gne.resolveGrammar)(r, e.errMsgProvider) } Ro.resolveGrammar = Wne; function Bne(t) { return t = (0, yq.default)(t, { errMsgProvider: vq.defaultGrammarValidatorErrorProvider }), (0, Hne.validateGrammar)(t.rules, t.tokenTypes, t.errMsgProvider, t.grammarName) } Ro.validateGrammar = Bne }); var Ws = f(or => { "use strict"; var Lc = or && or.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), Kne = or && or.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(or, "__esModule", { value: !0 }); or.EarlyExitException = or.NotAllInputParsedException = or.NoViableAltException = or.MismatchedTokenException = or.isRecognitionException = void 0; var zne = Kne(Di()), Tq = "MismatchedTokenException", Rq = "NoViableAltException", bq = "EarlyExitException", Aq = "NotAllInputParsedException", Pq = [Tq, Rq, bq, Aq]; Object.freeze(Pq); function Vne(t) { return (0, zne.default)(Pq, t.name) } or.isRecognitionException = Vne; var fp = function (t) { Lc(e, t); function e(r, n) { var i = this.constructor, o = t.call(this, r) || this; return o.token = n, o.resyncedTokens = [], Object.setPrototypeOf(o, i.prototype), Error.captureStackTrace && Error.captureStackTrace(o, o.constructor), o } return e }(Error), Yne = function (t) { Lc(e, t); function e(r, n, i) { var o = t.call(this, r, n) || this; return o.previousToken = i, o.name = Tq, o } return e }(fp); or.MismatchedTokenException = Yne; var Xne = function (t) { Lc(e, t); function e(r, n, i) { var o = t.call(this, r, n) || this; return o.previousToken = i, o.name = Rq, o } return e }(fp); or.NoViableAltException = Xne; var Jne = function (t) { Lc(e, t); function e(r, n) { var i = t.call(this, r, n) || this; return i.name = Aq, i } return e }(fp); or.NotAllInputParsedException = Jne; var Qne = function (t) { Lc(e, t); function e(r, n, i) { var o = t.call(this, r, n) || this; return o.previousToken = i, o.name = bq, o } return e }(fp); or.EarlyExitException = Qne }); var X_ = f(kt => { "use strict"; var Zne = kt && kt.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), bo = kt && kt.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(kt, "__esModule", { value: !0 }); kt.attemptInRepetitionRecovery = kt.Recoverable = kt.InRuleRecoveryException = kt.IN_RULE_RECOVERY_EXCEPTION = kt.EOF_FOLLOW_KEY = void 0; var Mc = ua(), eie = bo(Or()), Sq = bo(ap()), tie = bo(Cn()), Y_ = bo(Ut()), Cq = bo(Kf()), rie = bo(Ir()), nie = bo(Di()), iie = bo(wi()), oie = Ws(), aie = d_(), sie = Ar(); kt.EOF_FOLLOW_KEY = {}; kt.IN_RULE_RECOVERY_EXCEPTION = "InRuleRecoveryException"; var Eq = function (t) { Zne(e, t); function e(r) { var n = t.call(this, r) || this; return n.name = kt.IN_RULE_RECOVERY_EXCEPTION, n } return e }(Error); kt.InRuleRecoveryException = Eq; var uie = function () { function t() { } return t.prototype.initRecoverable = function (e) { this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = (0, rie.default)(e, "recoveryEnabled") ? e.recoveryEnabled : sie.DEFAULT_PARSER_CONFIG.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = Nq) }, t.prototype.getTokenToInsert = function (e) { var r = (0, Mc.createTokenInstance)(e, "", NaN, NaN, NaN, NaN, NaN, NaN); return r.isInsertedInRecovery = !0, r }, t.prototype.canTokenTypeBeInsertedInRecovery = function (e) { return !0 }, t.prototype.canTokenTypeBeDeletedInRecovery = function (e) { return !0 }, t.prototype.tryInRepetitionRecovery = function (e, r, n, i) { for (var o = this, a = this.findReSyncTokenType(), s = this.exportLexerState(), u = [], c = !1, l = this.LA(1), d = this.LA(1), h = function () { var y = o.LA(0), m = o.errorMessageProvider.buildMismatchTokenMessage({ expected: i, actual: l, previous: y, ruleName: o.getCurrRuleFullName() }), R = new oie.MismatchedTokenException(m, l, o.LA(0)); R.resyncedTokens = (0, Sq.default)(u), o.SAVE_ERROR(R) }; !c;)if (this.tokenMatcher(d, i)) { h(); return } else if (n.call(this)) { h(), e.apply(this, r); return } else this.tokenMatcher(d, a) ? c = !0 : (d = this.SKIP_TOKEN(), this.addToResyncTokens(d, u)); this.importLexerState(s) }, t.prototype.shouldInRepetitionRecoveryBeTried = function (e, r, n) { return !(n === !1 || this.tokenMatcher(this.LA(1), e) || this.isBackTracking() || this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, r))) }, t.prototype.getFollowsForInRuleRecovery = function (e, r) { var n = this.getCurrentGrammarPath(e, r), i = this.getNextPossibleTokenTypes(n); return i }, t.prototype.tryInRuleRecovery = function (e, r) { if (this.canRecoverWithSingleTokenInsertion(e, r)) { var n = this.getTokenToInsert(e); return n } if (this.canRecoverWithSingleTokenDeletion(e)) { var i = this.SKIP_TOKEN(); return this.consumeToken(), i } throw new Eq("sad sad panda") }, t.prototype.canPerformInRuleRecovery = function (e, r) { return this.canRecoverWithSingleTokenInsertion(e, r) || this.canRecoverWithSingleTokenDeletion(e) }, t.prototype.canRecoverWithSingleTokenInsertion = function (e, r) { var n = this; if (!this.canTokenTypeBeInsertedInRecovery(e) || (0, eie.default)(r)) return !1; var i = this.LA(1), o = (0, Cq.default)(r, function (a) { return n.tokenMatcher(i, a) }) !== void 0; return o }, t.prototype.canRecoverWithSingleTokenDeletion = function (e) { if (!this.canTokenTypeBeDeletedInRecovery(e)) return !1; var r = this.tokenMatcher(this.LA(2), e); return r }, t.prototype.isInCurrentRuleReSyncSet = function (e) { var r = this.getCurrFollowKey(), n = this.getFollowSetFromFollowKey(r); return (0, nie.default)(n, e) }, t.prototype.findReSyncTokenType = function () { for (var e = this.flattenFollowSet(), r = this.LA(1), n = 2; ;) { var i = (0, Cq.default)(e, function (o) { var a = (0, Mc.tokenMatcher)(r, o); return a }); if (i !== void 0) return i; r = this.LA(n), n++ } }, t.prototype.getCurrFollowKey = function () { if (this.RULE_STACK.length === 1) return kt.EOF_FOLLOW_KEY; var e = this.getLastExplicitRuleShortName(), r = this.getLastExplicitRuleOccurrenceIndex(), n = this.getPreviousExplicitRuleShortName(); return { ruleName: this.shortRuleNameToFullName(e), idxInCallingRule: r, inRule: this.shortRuleNameToFullName(n) } }, t.prototype.buildFullFollowKeyStack = function () { var e = this, r = this.RULE_STACK, n = this.RULE_OCCURRENCE_STACK; return (0, Y_.default)(r, function (i, o) { return o === 0 ? kt.EOF_FOLLOW_KEY : { ruleName: e.shortRuleNameToFullName(i), idxInCallingRule: n[o], inRule: e.shortRuleNameToFullName(r[o - 1]) } }) }, t.prototype.flattenFollowSet = function () { var e = this, r = (0, Y_.default)(this.buildFullFollowKeyStack(), function (n) { return e.getFollowSetFromFollowKey(n) }); return (0, tie.default)(r) }, t.prototype.getFollowSetFromFollowKey = function (e) { if (e === kt.EOF_FOLLOW_KEY) return [Mc.EOF]; var r = e.ruleName + e.idxInCallingRule + aie.IN + e.inRule; return this.resyncFollows[r] }, t.prototype.addToResyncTokens = function (e, r) { return this.tokenMatcher(e, Mc.EOF) || r.push(e), r }, t.prototype.reSyncTo = function (e) { for (var r = [], n = this.LA(1); this.tokenMatcher(n, e) === !1;)n = this.SKIP_TOKEN(), this.addToResyncTokens(n, r); return (0, Sq.default)(r) }, t.prototype.attemptInRepetitionRecovery = function (e, r, n, i, o, a, s) { }, t.prototype.getCurrentGrammarPath = function (e, r) { var n = this.getHumanReadableRuleStack(), i = (0, iie.default)(this.RULE_OCCURRENCE_STACK), o = { ruleStack: n, occurrenceStack: i, lastTok: e, lastTokOccurrence: r }; return o }, t.prototype.getHumanReadableRuleStack = function () { var e = this; return (0, Y_.default)(this.RULE_STACK, function (r) { return e.shortRuleNameToFullName(r) }) }, t }(); kt.Recoverable = uie; function Nq(t, e, r, n, i, o, a) { var s = this.getKeyForAutomaticLookahead(n, i), u = this.firstAfterRepMap[s]; if (u === void 0) { var c = this.getCurrRuleFullName(), l = this.getGAstProductions()[c], d = new o(l, i); u = d.startWalking(), this.firstAfterRepMap[s] = u } var h = u.token, y = u.occurrence, m = u.isEndOfRule; this.RULE_STACK.length === 1 && m && h === void 0 && (h = Mc.EOF, y = 1), !(h === void 0 || y === void 0) && this.shouldInRepetitionRecoveryBeTried(h, y, a) && this.tryInRepetitionRecovery(t, e, r, h) } kt.attemptInRepetitionRecovery = Nq }); var pp = f(Ne => { "use strict"; Object.defineProperty(Ne, "__esModule", { value: !0 }); Ne.getKeyForAutomaticLookahead = Ne.AT_LEAST_ONE_SEP_IDX = Ne.MANY_SEP_IDX = Ne.AT_LEAST_ONE_IDX = Ne.MANY_IDX = Ne.OPTION_IDX = Ne.OR_IDX = Ne.BITS_FOR_ALT_IDX = Ne.BITS_FOR_RULE_IDX = Ne.BITS_FOR_OCCURRENCE_IDX = Ne.BITS_FOR_METHOD_TYPE = void 0; Ne.BITS_FOR_METHOD_TYPE = 4; Ne.BITS_FOR_OCCURRENCE_IDX = 8; Ne.BITS_FOR_RULE_IDX = 12; Ne.BITS_FOR_ALT_IDX = 8; Ne.OR_IDX = 1 << Ne.BITS_FOR_OCCURRENCE_IDX; Ne.OPTION_IDX = 2 << Ne.BITS_FOR_OCCURRENCE_IDX; Ne.MANY_IDX = 3 << Ne.BITS_FOR_OCCURRENCE_IDX; Ne.AT_LEAST_ONE_IDX = 4 << Ne.BITS_FOR_OCCURRENCE_IDX; Ne.MANY_SEP_IDX = 5 << Ne.BITS_FOR_OCCURRENCE_IDX; Ne.AT_LEAST_ONE_SEP_IDX = 6 << Ne.BITS_FOR_OCCURRENCE_IDX; function cie(t, e, r) { return r | e | t } Ne.getKeyForAutomaticLookahead = cie; var Jye = 32 - Ne.BITS_FOR_ALT_IDX }); var Q_ = f(Ao => { "use strict"; var hp = Ao && Ao.__spreadArray || function (t, e, r) { if (r || arguments.length === 2) for (var n = 0, i = e.length, o; n < i; n++)(o || !(n in e)) && (o || (o = Array.prototype.slice.call(e, 0, n)), o[n] = e[n]); return t.concat(o || Array.prototype.slice.call(e)) }, kq = Ao && Ao.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Ao, "__esModule", { value: !0 }); Ao.LLkLookaheadStrategy = void 0; var J_ = kq(op()), lie = kq(Or()), mp = Us(), die = Ar(), gp = qc(), $c = Gs(), fie = function () { function t(e) { var r; this.maxLookahead = (r = e?.maxLookahead) !== null && r !== void 0 ? r : die.DEFAULT_PARSER_CONFIG.maxLookahead } return t.prototype.validate = function (e) { var r = this.validateNoLeftRecursion(e.rules); if ((0, lie.default)(r)) { var n = this.validateEmptyOrAlternatives(e.rules), i = this.validateAmbiguousAlternationAlternatives(e.rules, this.maxLookahead), o = this.validateSomeNonEmptyLookaheadPath(e.rules, this.maxLookahead), a = hp(hp(hp(hp([], r, !0), n, !0), i, !0), o, !0); return a } return r }, t.prototype.validateNoLeftRecursion = function (e) { return (0, J_.default)(e, function (r) { return (0, gp.validateNoLeftRecursion)(r, r, mp.defaultGrammarValidatorErrorProvider) }) }, t.prototype.validateEmptyOrAlternatives = function (e) { return (0, J_.default)(e, function (r) { return (0, gp.validateEmptyOrAlternative)(r, mp.defaultGrammarValidatorErrorProvider) }) }, t.prototype.validateAmbiguousAlternationAlternatives = function (e, r) { return (0, J_.default)(e, function (n) { return (0, gp.validateAmbiguousAlternationAlternatives)(n, r, mp.defaultGrammarValidatorErrorProvider) }) }, t.prototype.validateSomeNonEmptyLookaheadPath = function (e, r) { return (0, gp.validateSomeNonEmptyLookaheadPath)(e, r, mp.defaultGrammarValidatorErrorProvider) }, t.prototype.buildLookaheadForAlternation = function (e) { return (0, $c.buildLookaheadFuncForOr)(e.prodOccurrence, e.rule, e.maxLookahead, e.hasPredicates, e.dynamicTokensEnabled, $c.buildAlternativesLookAheadFunc) }, t.prototype.buildLookaheadForOptional = function (e) { return (0, $c.buildLookaheadFuncForOptionalProd)(e.prodOccurrence, e.rule, e.maxLookahead, e.dynamicTokensEnabled, (0, $c.getProdType)(e.prodType), $c.buildSingleAlternativeLookaheadFunction) }, t }(); Ao.LLkLookaheadStrategy = fie }); var Iq = f(ii => { "use strict"; var pie = ii && ii.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), Oq = ii && ii.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(ii, "__esModule", { value: !0 }); ii.collectMethods = ii.LooksAhead = void 0; var ma = Oq(Gt()), Z_ = Oq(Ir()), wq = Ar(), Ui = pp(), hie = _t(), Bs = _t(), mie = Q_(), gie = function () { function t() { } return t.prototype.initLooksAhead = function (e) { this.dynamicTokensEnabled = (0, Z_.default)(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : wq.DEFAULT_PARSER_CONFIG.dynamicTokensEnabled, this.maxLookahead = (0, Z_.default)(e, "maxLookahead") ? e.maxLookahead : wq.DEFAULT_PARSER_CONFIG.maxLookahead, this.lookaheadStrategy = (0, Z_.default)(e, "lookaheadStrategy") ? e.lookaheadStrategy : new mie.LLkLookaheadStrategy({ maxLookahead: this.maxLookahead }), this.lookAheadFuncsCache = new Map }, t.prototype.preComputeLookaheadFunctions = function (e) { var r = this; (0, ma.default)(e, function (n) { r.TRACE_INIT("".concat(n.name, " Rule Lookahead"), function () { var i = Dq(n), o = i.alternation, a = i.repetition, s = i.option, u = i.repetitionMandatory, c = i.repetitionMandatoryWithSeparator, l = i.repetitionWithSeparator; (0, ma.default)(o, function (d) { var h = d.idx === 0 ? "" : d.idx; r.TRACE_INIT("".concat((0, Bs.getProductionDslName)(d)).concat(h), function () { var y = r.lookaheadStrategy.buildLookaheadForAlternation({ prodOccurrence: d.idx, rule: n, maxLookahead: d.maxLookahead || r.maxLookahead, hasPredicates: d.hasPredicates, dynamicTokensEnabled: r.dynamicTokensEnabled }), m = (0, Ui.getKeyForAutomaticLookahead)(r.fullRuleNameToShort[n.name], Ui.OR_IDX, d.idx); r.setLaFuncCache(m, y) }) }), (0, ma.default)(a, function (d) { r.computeLookaheadFunc(n, d.idx, Ui.MANY_IDX, "Repetition", d.maxLookahead, (0, Bs.getProductionDslName)(d)) }), (0, ma.default)(s, function (d) { r.computeLookaheadFunc(n, d.idx, Ui.OPTION_IDX, "Option", d.maxLookahead, (0, Bs.getProductionDslName)(d)) }), (0, ma.default)(u, function (d) { r.computeLookaheadFunc(n, d.idx, Ui.AT_LEAST_ONE_IDX, "RepetitionMandatory", d.maxLookahead, (0, Bs.getProductionDslName)(d)) }), (0, ma.default)(c, function (d) { r.computeLookaheadFunc(n, d.idx, Ui.AT_LEAST_ONE_SEP_IDX, "RepetitionMandatoryWithSeparator", d.maxLookahead, (0, Bs.getProductionDslName)(d)) }), (0, ma.default)(l, function (d) { r.computeLookaheadFunc(n, d.idx, Ui.MANY_SEP_IDX, "RepetitionWithSeparator", d.maxLookahead, (0, Bs.getProductionDslName)(d)) }) }) }) }, t.prototype.computeLookaheadFunc = function (e, r, n, i, o, a) { var s = this; this.TRACE_INIT("".concat(a).concat(r === 0 ? "" : r), function () { var u = s.lookaheadStrategy.buildLookaheadForOptional({ prodOccurrence: r, rule: e, maxLookahead: o || s.maxLookahead, dynamicTokensEnabled: s.dynamicTokensEnabled, prodType: i }), c = (0, Ui.getKeyForAutomaticLookahead)(s.fullRuleNameToShort[e.name], n, r); s.setLaFuncCache(c, u) }) }, t.prototype.getKeyForAutomaticLookahead = function (e, r) { var n = this.getLastExplicitRuleShortName(); return (0, Ui.getKeyForAutomaticLookahead)(n, e, r) }, t.prototype.getLaFuncFromCache = function (e) { return this.lookAheadFuncsCache.get(e) }, t.prototype.setLaFuncCache = function (e, r) { this.lookAheadFuncsCache.set(e, r) }, t }(); ii.LooksAhead = gie; var yie = function (t) { pie(e, t); function e() { var r = t !== null && t.apply(this, arguments) || this; return r.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] }, r } return e.prototype.reset = function () { this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] } }, e.prototype.visitOption = function (r) { this.dslMethods.option.push(r) }, e.prototype.visitRepetitionWithSeparator = function (r) { this.dslMethods.repetitionWithSeparator.push(r) }, e.prototype.visitRepetitionMandatory = function (r) { this.dslMethods.repetitionMandatory.push(r) }, e.prototype.visitRepetitionMandatoryWithSeparator = function (r) { this.dslMethods.repetitionMandatoryWithSeparator.push(r) }, e.prototype.visitRepetition = function (r) { this.dslMethods.repetition.push(r) }, e.prototype.visitAlternation = function (r) { this.dslMethods.alternation.push(r) }, e }(hie.GAstVisitor), yp = new yie; function Dq(t) { yp.reset(), t.accept(yp); var e = yp.dslMethods; return yp.reset(), e } ii.collectMethods = Dq }); var xq = f(oi => { "use strict"; Object.defineProperty(oi, "__esModule", { value: !0 }); oi.addNoneTerminalToCst = oi.addTerminalToCst = oi.setNodeLocationFull = oi.setNodeLocationOnlyOffset = void 0; function vie(t, e) { isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.endOffset = e.endOffset) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset) } oi.setNodeLocationOnlyOffset = vie; function _ie(t, e) { isNaN(t.startOffset) === !0 ? (t.startOffset = e.startOffset, t.startColumn = e.startColumn, t.startLine = e.startLine, t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) : t.endOffset < e.endOffset && (t.endOffset = e.endOffset, t.endColumn = e.endColumn, t.endLine = e.endLine) } oi.setNodeLocationFull = _ie; function Tie(t, e, r) { t.children[r] === void 0 ? t.children[r] = [e] : t.children[r].push(e) } oi.addTerminalToCst = Tie; function Rie(t, e, r) { t.children[e] === void 0 ? t.children[e] = [r] : t.children[e].push(r) } oi.addNoneTerminalToCst = Rie }); var qq = f(vp => { "use strict"; Object.defineProperty(vp, "__esModule", { value: !0 }); vp.defineNameProp = void 0; var bie = "name"; function Aie(t, e) { Object.defineProperty(t, bie, { enumerable: !1, configurable: !0, writable: !1, value: e }) } vp.defineNameProp = Aie }); var Gq = f(Xt => {
    "use strict"; var Gi = Xt && Xt.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Xt, "__esModule", { value: !0 }); Xt.validateMissingCstMethods = Xt.validateVisitor = Xt.CstVisitorDefinitionError = Xt.createBaseVisitorConstructorWithDefaults = Xt.createBaseSemanticVisitorConstructor = Xt.defaultVisit = void 0; var Pie = Gi(Or()), Sie = Gi(Cc()), Cie = Gi(qe()), Lq = Gi(Ut()), Eie = Gi(Gt()), Nie = Gi(Ec()), kie = Gi(Dr()), wie = Gi(ms()), Oie = Gi(ia()), Mq = qq(); function $q(t, e) { for (var r = (0, kie.default)(t), n = r.length, i = 0; i < n; i++)for (var o = r[i], a = t[o], s = a.length, u = 0; u < s; u++) { var c = a[u]; c.tokenTypeIdx === void 0 && this[c.name](c.children, e) } } Xt.defaultVisit = $q; function Die(t, e) {
      var r = function () { }; (0, Mq.defineNameProp)(r, t + "BaseSemantics"); var n = {
        visit: function (i, o) { if ((0, Cie.default)(i) && (i = i[0]), !(0, Oie.default)(i)) return this[i.name](i.children, o) }, validateVisitor: function () {
          var i = jq(this, e); if (!(0, Pie.default)(i)) {
            var o = (0, Lq.default)(i, function (a) { return a.msg }); throw Error("Errors Detected in CST Visitor <".concat(this.constructor.name, `>:
	`) + "".concat(o.join(`

`).replace(/\n/g, `
	`)))
          }
        }
      }; return r.prototype = n, r.prototype.constructor = r, r._RULE_NAMES = e, r
    } Xt.createBaseSemanticVisitorConstructor = Die; function Iie(t, e, r) { var n = function () { }; (0, Mq.defineNameProp)(n, t + "BaseSemanticsWithDefaults"); var i = Object.create(r.prototype); return (0, Eie.default)(e, function (o) { i[o] = $q }), n.prototype = i, n.prototype.constructor = n, n } Xt.createBaseVisitorConstructorWithDefaults = Iie; var Fq; (function (t) { t[t.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", t[t.MISSING_METHOD = 1] = "MISSING_METHOD" })(Fq = Xt.CstVisitorDefinitionError || (Xt.CstVisitorDefinitionError = {})); function jq(t, e) { var r = Uq(t, e); return r } Xt.validateVisitor = jq; function Uq(t, e) { var r = (0, Nie.default)(e, function (i) { return (0, wie.default)(t[i]) === !1 }), n = (0, Lq.default)(r, function (i) { return { msg: "Missing visitor method: <".concat(i, "> on ").concat(t.constructor.name, " CST Visitor."), type: Fq.MISSING_METHOD, methodName: i } }); return (0, Sie.default)(n) } Xt.validateMissingCstMethods = Uq
  }); var Kq = f(zs => { "use strict"; var _p = zs && zs.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(zs, "__esModule", { value: !0 }); zs.TreeBuilder = void 0; var Ks = xq(), hr = _p(jf()), xie = _p(Ir()), Hq = _p(Dr()), Wq = _p(ia()), Bq = Gq(), qie = Ar(), Lie = function () { function t() { } return t.prototype.initTreeBuilder = function (e) { if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = (0, xie.default)(e, "nodeLocationTracking") ? e.nodeLocationTracking : qie.DEFAULT_PARSER_CONFIG.nodeLocationTracking, !this.outputCst) this.cstInvocationStateUpdate = hr.default, this.cstFinallyStateUpdate = hr.default, this.cstPostTerminal = hr.default, this.cstPostNonTerminal = hr.default, this.cstPostRule = hr.default; else if (/full/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = Ks.setNodeLocationFull, this.setNodeLocationFromNode = Ks.setNodeLocationFull, this.cstPostRule = hr.default, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = hr.default, this.setNodeLocationFromNode = hr.default, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular); else if (/onlyOffset/i.test(this.nodeLocationTracking)) this.recoveryEnabled ? (this.setNodeLocationFromToken = Ks.setNodeLocationOnlyOffset, this.setNodeLocationFromNode = Ks.setNodeLocationOnlyOffset, this.cstPostRule = hr.default, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = hr.default, this.setNodeLocationFromNode = hr.default, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular); else if (/none/i.test(this.nodeLocationTracking)) this.setNodeLocationFromToken = hr.default, this.setNodeLocationFromNode = hr.default, this.cstPostRule = hr.default, this.setInitialNodeLocation = hr.default; else throw Error('Invalid <nodeLocationTracking> config option: "'.concat(e.nodeLocationTracking, '"')) }, t.prototype.setInitialNodeLocationOnlyOffsetRecovery = function (e) { e.location = { startOffset: NaN, endOffset: NaN } }, t.prototype.setInitialNodeLocationOnlyOffsetRegular = function (e) { e.location = { startOffset: this.LA(1).startOffset, endOffset: NaN } }, t.prototype.setInitialNodeLocationFullRecovery = function (e) { e.location = { startOffset: NaN, startLine: NaN, startColumn: NaN, endOffset: NaN, endLine: NaN, endColumn: NaN } }, t.prototype.setInitialNodeLocationFullRegular = function (e) { var r = this.LA(1); e.location = { startOffset: r.startOffset, startLine: r.startLine, startColumn: r.startColumn, endOffset: NaN, endLine: NaN, endColumn: NaN } }, t.prototype.cstInvocationStateUpdate = function (e) { var r = { name: e, children: Object.create(null) }; this.setInitialNodeLocation(r), this.CST_STACK.push(r) }, t.prototype.cstFinallyStateUpdate = function () { this.CST_STACK.pop() }, t.prototype.cstPostRuleFull = function (e) { var r = this.LA(0), n = e.location; n.startOffset <= r.startOffset ? (n.endOffset = r.endOffset, n.endLine = r.endLine, n.endColumn = r.endColumn) : (n.startOffset = NaN, n.startLine = NaN, n.startColumn = NaN) }, t.prototype.cstPostRuleOnlyOffset = function (e) { var r = this.LA(0), n = e.location; n.startOffset <= r.startOffset ? n.endOffset = r.endOffset : n.startOffset = NaN }, t.prototype.cstPostTerminal = function (e, r) { var n = this.CST_STACK[this.CST_STACK.length - 1]; (0, Ks.addTerminalToCst)(n, r, e), this.setNodeLocationFromToken(n.location, r) }, t.prototype.cstPostNonTerminal = function (e, r) { var n = this.CST_STACK[this.CST_STACK.length - 1]; (0, Ks.addNoneTerminalToCst)(n, r, e), this.setNodeLocationFromNode(n.location, e.location) }, t.prototype.getBaseCstVisitorConstructor = function () { if ((0, Wq.default)(this.baseCstVisitorConstructor)) { var e = (0, Bq.createBaseSemanticVisitorConstructor)(this.className, (0, Hq.default)(this.gastProductionsCache)); return this.baseCstVisitorConstructor = e, e } return this.baseCstVisitorConstructor }, t.prototype.getBaseCstVisitorConstructorWithDefaults = function () { if ((0, Wq.default)(this.baseCstVisitorWithDefaultsConstructor)) { var e = (0, Bq.createBaseVisitorConstructorWithDefaults)(this.className, (0, Hq.default)(this.gastProductionsCache), this.getBaseCstVisitorConstructor()); return this.baseCstVisitorWithDefaultsConstructor = e, e } return this.baseCstVisitorWithDefaultsConstructor }, t.prototype.getLastExplicitRuleShortName = function () { var e = this.RULE_STACK; return e[e.length - 1] }, t.prototype.getPreviousExplicitRuleShortName = function () { var e = this.RULE_STACK; return e[e.length - 2] }, t.prototype.getLastExplicitRuleOccurrenceIndex = function () { var e = this.RULE_OCCURRENCE_STACK; return e[e.length - 1] }, t }(); zs.TreeBuilder = Lie }); var Vq = f(Tp => { "use strict"; Object.defineProperty(Tp, "__esModule", { value: !0 }); Tp.LexerAdapter = void 0; var zq = Ar(), Mie = function () { function t() { } return t.prototype.initLexerAdapter = function () { this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1 }, Object.defineProperty(t.prototype, "input", { get: function () { return this.tokVector }, set: function (e) { if (this.selfAnalysisDone !== !0) throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor."); this.reset(), this.tokVector = e, this.tokVectorLength = e.length }, enumerable: !1, configurable: !0 }), t.prototype.SKIP_TOKEN = function () { return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : zq.END_OF_FILE }, t.prototype.LA = function (e) { var r = this.currIdx + e; return r < 0 || this.tokVectorLength <= r ? zq.END_OF_FILE : this.tokVector[r] }, t.prototype.consumeToken = function () { this.currIdx++ }, t.prototype.exportLexerState = function () { return this.currIdx }, t.prototype.importLexerState = function (e) { this.currIdx = e }, t.prototype.resetLexerState = function () { this.currIdx = -1 }, t.prototype.moveToTerminatedState = function () { this.currIdx = this.tokVector.length - 1 }, t.prototype.getLexerPosition = function () { return this.exportLexerState() }, t }(); Tp.LexerAdapter = Mie }); var Xq = f(Vs => { "use strict"; var Yq = Vs && Vs.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Vs, "__esModule", { value: !0 }); Vs.RecognizerApi = void 0; var $ie = Yq(Yn()), Fie = Yq(Di()), jie = Ws(), eT = Ar(), Uie = Us(), Gie = qc(), Hie = _t(), Wie = function () { function t() { } return t.prototype.ACTION = function (e) { return e.call(this) }, t.prototype.consume = function (e, r, n) { return this.consumeInternal(r, e, n) }, t.prototype.subrule = function (e, r, n) { return this.subruleInternal(r, e, n) }, t.prototype.option = function (e, r) { return this.optionInternal(r, e) }, t.prototype.or = function (e, r) { return this.orInternal(r, e) }, t.prototype.many = function (e, r) { return this.manyInternal(e, r) }, t.prototype.atLeastOne = function (e, r) { return this.atLeastOneInternal(e, r) }, t.prototype.CONSUME = function (e, r) { return this.consumeInternal(e, 0, r) }, t.prototype.CONSUME1 = function (e, r) { return this.consumeInternal(e, 1, r) }, t.prototype.CONSUME2 = function (e, r) { return this.consumeInternal(e, 2, r) }, t.prototype.CONSUME3 = function (e, r) { return this.consumeInternal(e, 3, r) }, t.prototype.CONSUME4 = function (e, r) { return this.consumeInternal(e, 4, r) }, t.prototype.CONSUME5 = function (e, r) { return this.consumeInternal(e, 5, r) }, t.prototype.CONSUME6 = function (e, r) { return this.consumeInternal(e, 6, r) }, t.prototype.CONSUME7 = function (e, r) { return this.consumeInternal(e, 7, r) }, t.prototype.CONSUME8 = function (e, r) { return this.consumeInternal(e, 8, r) }, t.prototype.CONSUME9 = function (e, r) { return this.consumeInternal(e, 9, r) }, t.prototype.SUBRULE = function (e, r) { return this.subruleInternal(e, 0, r) }, t.prototype.SUBRULE1 = function (e, r) { return this.subruleInternal(e, 1, r) }, t.prototype.SUBRULE2 = function (e, r) { return this.subruleInternal(e, 2, r) }, t.prototype.SUBRULE3 = function (e, r) { return this.subruleInternal(e, 3, r) }, t.prototype.SUBRULE4 = function (e, r) { return this.subruleInternal(e, 4, r) }, t.prototype.SUBRULE5 = function (e, r) { return this.subruleInternal(e, 5, r) }, t.prototype.SUBRULE6 = function (e, r) { return this.subruleInternal(e, 6, r) }, t.prototype.SUBRULE7 = function (e, r) { return this.subruleInternal(e, 7, r) }, t.prototype.SUBRULE8 = function (e, r) { return this.subruleInternal(e, 8, r) }, t.prototype.SUBRULE9 = function (e, r) { return this.subruleInternal(e, 9, r) }, t.prototype.OPTION = function (e) { return this.optionInternal(e, 0) }, t.prototype.OPTION1 = function (e) { return this.optionInternal(e, 1) }, t.prototype.OPTION2 = function (e) { return this.optionInternal(e, 2) }, t.prototype.OPTION3 = function (e) { return this.optionInternal(e, 3) }, t.prototype.OPTION4 = function (e) { return this.optionInternal(e, 4) }, t.prototype.OPTION5 = function (e) { return this.optionInternal(e, 5) }, t.prototype.OPTION6 = function (e) { return this.optionInternal(e, 6) }, t.prototype.OPTION7 = function (e) { return this.optionInternal(e, 7) }, t.prototype.OPTION8 = function (e) { return this.optionInternal(e, 8) }, t.prototype.OPTION9 = function (e) { return this.optionInternal(e, 9) }, t.prototype.OR = function (e) { return this.orInternal(e, 0) }, t.prototype.OR1 = function (e) { return this.orInternal(e, 1) }, t.prototype.OR2 = function (e) { return this.orInternal(e, 2) }, t.prototype.OR3 = function (e) { return this.orInternal(e, 3) }, t.prototype.OR4 = function (e) { return this.orInternal(e, 4) }, t.prototype.OR5 = function (e) { return this.orInternal(e, 5) }, t.prototype.OR6 = function (e) { return this.orInternal(e, 6) }, t.prototype.OR7 = function (e) { return this.orInternal(e, 7) }, t.prototype.OR8 = function (e) { return this.orInternal(e, 8) }, t.prototype.OR9 = function (e) { return this.orInternal(e, 9) }, t.prototype.MANY = function (e) { this.manyInternal(0, e) }, t.prototype.MANY1 = function (e) { this.manyInternal(1, e) }, t.prototype.MANY2 = function (e) { this.manyInternal(2, e) }, t.prototype.MANY3 = function (e) { this.manyInternal(3, e) }, t.prototype.MANY4 = function (e) { this.manyInternal(4, e) }, t.prototype.MANY5 = function (e) { this.manyInternal(5, e) }, t.prototype.MANY6 = function (e) { this.manyInternal(6, e) }, t.prototype.MANY7 = function (e) { this.manyInternal(7, e) }, t.prototype.MANY8 = function (e) { this.manyInternal(8, e) }, t.prototype.MANY9 = function (e) { this.manyInternal(9, e) }, t.prototype.MANY_SEP = function (e) { this.manySepFirstInternal(0, e) }, t.prototype.MANY_SEP1 = function (e) { this.manySepFirstInternal(1, e) }, t.prototype.MANY_SEP2 = function (e) { this.manySepFirstInternal(2, e) }, t.prototype.MANY_SEP3 = function (e) { this.manySepFirstInternal(3, e) }, t.prototype.MANY_SEP4 = function (e) { this.manySepFirstInternal(4, e) }, t.prototype.MANY_SEP5 = function (e) { this.manySepFirstInternal(5, e) }, t.prototype.MANY_SEP6 = function (e) { this.manySepFirstInternal(6, e) }, t.prototype.MANY_SEP7 = function (e) { this.manySepFirstInternal(7, e) }, t.prototype.MANY_SEP8 = function (e) { this.manySepFirstInternal(8, e) }, t.prototype.MANY_SEP9 = function (e) { this.manySepFirstInternal(9, e) }, t.prototype.AT_LEAST_ONE = function (e) { this.atLeastOneInternal(0, e) }, t.prototype.AT_LEAST_ONE1 = function (e) { return this.atLeastOneInternal(1, e) }, t.prototype.AT_LEAST_ONE2 = function (e) { this.atLeastOneInternal(2, e) }, t.prototype.AT_LEAST_ONE3 = function (e) { this.atLeastOneInternal(3, e) }, t.prototype.AT_LEAST_ONE4 = function (e) { this.atLeastOneInternal(4, e) }, t.prototype.AT_LEAST_ONE5 = function (e) { this.atLeastOneInternal(5, e) }, t.prototype.AT_LEAST_ONE6 = function (e) { this.atLeastOneInternal(6, e) }, t.prototype.AT_LEAST_ONE7 = function (e) { this.atLeastOneInternal(7, e) }, t.prototype.AT_LEAST_ONE8 = function (e) { this.atLeastOneInternal(8, e) }, t.prototype.AT_LEAST_ONE9 = function (e) { this.atLeastOneInternal(9, e) }, t.prototype.AT_LEAST_ONE_SEP = function (e) { this.atLeastOneSepFirstInternal(0, e) }, t.prototype.AT_LEAST_ONE_SEP1 = function (e) { this.atLeastOneSepFirstInternal(1, e) }, t.prototype.AT_LEAST_ONE_SEP2 = function (e) { this.atLeastOneSepFirstInternal(2, e) }, t.prototype.AT_LEAST_ONE_SEP3 = function (e) { this.atLeastOneSepFirstInternal(3, e) }, t.prototype.AT_LEAST_ONE_SEP4 = function (e) { this.atLeastOneSepFirstInternal(4, e) }, t.prototype.AT_LEAST_ONE_SEP5 = function (e) { this.atLeastOneSepFirstInternal(5, e) }, t.prototype.AT_LEAST_ONE_SEP6 = function (e) { this.atLeastOneSepFirstInternal(6, e) }, t.prototype.AT_LEAST_ONE_SEP7 = function (e) { this.atLeastOneSepFirstInternal(7, e) }, t.prototype.AT_LEAST_ONE_SEP8 = function (e) { this.atLeastOneSepFirstInternal(8, e) }, t.prototype.AT_LEAST_ONE_SEP9 = function (e) { this.atLeastOneSepFirstInternal(9, e) }, t.prototype.RULE = function (e, r, n) { if (n === void 0 && (n = eT.DEFAULT_RULE_CONFIG), (0, Fie.default)(this.definedRulesNames, e)) { var i = Uie.defaultGrammarValidatorErrorProvider.buildDuplicateRuleNameError({ topLevelRule: e, grammarName: this.className }), o = { message: i, type: eT.ParserDefinitionErrorType.DUPLICATE_RULE_NAME, ruleName: e }; this.definitionErrors.push(o) } this.definedRulesNames.push(e); var a = this.defineRule(e, r, n); return this[e] = a, a }, t.prototype.OVERRIDE_RULE = function (e, r, n) { n === void 0 && (n = eT.DEFAULT_RULE_CONFIG); var i = (0, Gie.validateRuleIsOverridden)(e, this.definedRulesNames, this.className); this.definitionErrors = this.definitionErrors.concat(i); var o = this.defineRule(e, r, n); return this[e] = o, o }, t.prototype.BACKTRACK = function (e, r) { return function () { this.isBackTrackingStack.push(1); var n = this.saveRecogState(); try { return e.apply(this, r), !0 } catch (i) { if ((0, jie.isRecognitionException)(i)) return !1; throw i } finally { this.reloadRecogState(n), this.isBackTrackingStack.pop() } } }, t.prototype.getGAstProductions = function () { return this.gastProductionsCache }, t.prototype.getSerializedGastProductions = function () { return (0, Hie.serializeGrammar)((0, $ie.default)(this.gastProductionsCache)) }, t }(); Vs.RecognizerApi = Wie }); var iL = f(Xs => {
    "use strict"; var ai = Xs && Xs.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Xs, "__esModule", { value: !0 }); Xs.RecognizerEngine = void 0; var Jq = ai(Or()), tT = ai(qe()), rT = ai(Cn()), Qq = ai(Sc()), Bie = ai(Uf()), Kie = ai(An()), Fc = ai(Ir()), jc = ai(Yn()), Zq = ai(Ii()), eL = ai(wi()), qr = pp(), Rp = Ws(), tL = Gs(), Ys = Dc(), rL = Ar(), zie = X_(), nL = ua(), Uc = sa(), Vie = function () {
      function t() { } return t.prototype.initRecognizerEngine = function (e, r) {
        if (this.className = this.constructor.name, this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = Uc.tokenStructuredMatcherNoCategories, this.subruleIdx = 0, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, (0, Fc.default)(r, "serializedGrammar")) throw Error(`The Parser's configuration can no longer contain a <serializedGrammar> property.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_6-0-0
	For Further details.`); if ((0, tT.default)(e)) {
          if ((0, Jq.default)(e)) throw Error(`A Token Vocabulary cannot be empty.
	Note that the first argument for the parser constructor
	is no longer a Token vector (since v4.0).`); if (typeof e[0].startOffset == "number") throw Error(`The Parser constructor no longer accepts a token vector as the first argument.
	See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_4-0-0
	For Further details.`)
        } if ((0, tT.default)(e)) this.tokensMap = (0, Zq.default)(e, function (s, u) { return s[u.name] = u, s }, {}); else if ((0, Fc.default)(e, "modes") && (0, Qq.default)((0, rT.default)((0, jc.default)(e.modes)), Uc.isTokenType)) { var n = (0, rT.default)((0, jc.default)(e.modes)), i = (0, Bie.default)(n); this.tokensMap = (0, Zq.default)(i, function (s, u) { return s[u.name] = u, s }, {}) } else if ((0, Kie.default)(e)) this.tokensMap = (0, eL.default)(e); else throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition"); this.tokensMap.EOF = nL.EOF; var o = (0, Fc.default)(e, "modes") ? (0, rT.default)((0, jc.default)(e.modes)) : (0, jc.default)(e), a = (0, Qq.default)(o, function (s) { return (0, Jq.default)(s.categoryMatches) }); this.tokenMatcher = a ? Uc.tokenStructuredMatcherNoCategories : Uc.tokenStructuredMatcher, (0, Uc.augmentTokenTypes)((0, jc.default)(this.tokensMap))
      }, t.prototype.defineRule = function (e, r, n) {
        if (this.selfAnalysisDone) throw Error("Grammar rule <".concat(e, `> may not be defined after the 'performSelfAnalysis' method has been called'
`) + "Make sure that all grammar rule definitions are done before 'performSelfAnalysis' is called."); var i = (0, Fc.default)(n, "resyncEnabled") ? n.resyncEnabled : rL.DEFAULT_RULE_CONFIG.resyncEnabled, o = (0, Fc.default)(n, "recoveryValueFunc") ? n.recoveryValueFunc : rL.DEFAULT_RULE_CONFIG.recoveryValueFunc, a = this.ruleShortNameIdx << qr.BITS_FOR_METHOD_TYPE + qr.BITS_FOR_OCCURRENCE_IDX; this.ruleShortNameIdx++, this.shortRuleNameToFull[a] = e, this.fullRuleNameToShort[e] = a; var s; this.outputCst === !0 ? s = function () { for (var l = [], d = 0; d < arguments.length; d++)l[d] = arguments[d]; try { this.ruleInvocationStateUpdate(a, e, this.subruleIdx), r.apply(this, l); var h = this.CST_STACK[this.CST_STACK.length - 1]; return this.cstPostRule(h), h } catch (y) { return this.invokeRuleCatch(y, i, o) } finally { this.ruleFinallyStateUpdate() } } : s = function () { for (var l = [], d = 0; d < arguments.length; d++)l[d] = arguments[d]; try { return this.ruleInvocationStateUpdate(a, e, this.subruleIdx), r.apply(this, l) } catch (h) { return this.invokeRuleCatch(h, i, o) } finally { this.ruleFinallyStateUpdate() } }; var u = Object.assign(s, { ruleName: e, originalGrammarAction: r }); return u
      }, t.prototype.invokeRuleCatch = function (e, r, n) { var i = this.RULE_STACK.length === 1, o = r && !this.isBackTracking() && this.recoveryEnabled; if ((0, Rp.isRecognitionException)(e)) { var a = e; if (o) { var s = this.findReSyncTokenType(); if (this.isInCurrentRuleReSyncSet(s)) if (a.resyncedTokens = this.reSyncTo(s), this.outputCst) { var u = this.CST_STACK[this.CST_STACK.length - 1]; return u.recoveredNode = !0, u } else return n(); else { if (this.outputCst) { var u = this.CST_STACK[this.CST_STACK.length - 1]; u.recoveredNode = !0, a.partialCstResult = u } throw a } } else { if (i) return this.moveToTerminatedState(), n(); throw a } } else throw e }, t.prototype.optionInternal = function (e, r) { var n = this.getKeyForAutomaticLookahead(qr.OPTION_IDX, r); return this.optionInternalLogic(e, r, n) }, t.prototype.optionInternalLogic = function (e, r, n) { var i = this, o = this.getLaFuncFromCache(n), a; if (typeof e != "function") { a = e.DEF; var s = e.GATE; if (s !== void 0) { var u = o; o = function () { return s.call(i) && u.call(i) } } } else a = e; if (o.call(this) === !0) return a.call(this) }, t.prototype.atLeastOneInternal = function (e, r) { var n = this.getKeyForAutomaticLookahead(qr.AT_LEAST_ONE_IDX, e); return this.atLeastOneInternalLogic(e, r, n) }, t.prototype.atLeastOneInternalLogic = function (e, r, n) { var i = this, o = this.getLaFuncFromCache(n), a; if (typeof r != "function") { a = r.DEF; var s = r.GATE; if (s !== void 0) { var u = o; o = function () { return s.call(i) && u.call(i) } } } else a = r; if (o.call(this) === !0) for (var c = this.doSingleRepetition(a); o.call(this) === !0 && c === !0;)c = this.doSingleRepetition(a); else throw this.raiseEarlyExitException(e, tL.PROD_TYPE.REPETITION_MANDATORY, r.ERR_MSG); this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, r], o, qr.AT_LEAST_ONE_IDX, e, Ys.NextTerminalAfterAtLeastOneWalker) }, t.prototype.atLeastOneSepFirstInternal = function (e, r) { var n = this.getKeyForAutomaticLookahead(qr.AT_LEAST_ONE_SEP_IDX, e); this.atLeastOneSepFirstInternalLogic(e, r, n) }, t.prototype.atLeastOneSepFirstInternalLogic = function (e, r, n) { var i = this, o = r.DEF, a = r.SEP, s = this.getLaFuncFromCache(n); if (s.call(this) === !0) { o.call(this); for (var u = function () { return i.tokenMatcher(i.LA(1), a) }; this.tokenMatcher(this.LA(1), a) === !0;)this.CONSUME(a), o.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, a, u, o, Ys.NextTerminalAfterAtLeastOneSepWalker], u, qr.AT_LEAST_ONE_SEP_IDX, e, Ys.NextTerminalAfterAtLeastOneSepWalker) } else throw this.raiseEarlyExitException(e, tL.PROD_TYPE.REPETITION_MANDATORY_WITH_SEPARATOR, r.ERR_MSG) }, t.prototype.manyInternal = function (e, r) { var n = this.getKeyForAutomaticLookahead(qr.MANY_IDX, e); return this.manyInternalLogic(e, r, n) }, t.prototype.manyInternalLogic = function (e, r, n) { var i = this, o = this.getLaFuncFromCache(n), a; if (typeof r != "function") { a = r.DEF; var s = r.GATE; if (s !== void 0) { var u = o; o = function () { return s.call(i) && u.call(i) } } } else a = r; for (var c = !0; o.call(this) === !0 && c === !0;)c = this.doSingleRepetition(a); this.attemptInRepetitionRecovery(this.manyInternal, [e, r], o, qr.MANY_IDX, e, Ys.NextTerminalAfterManyWalker, c) }, t.prototype.manySepFirstInternal = function (e, r) { var n = this.getKeyForAutomaticLookahead(qr.MANY_SEP_IDX, e); this.manySepFirstInternalLogic(e, r, n) }, t.prototype.manySepFirstInternalLogic = function (e, r, n) { var i = this, o = r.DEF, a = r.SEP, s = this.getLaFuncFromCache(n); if (s.call(this) === !0) { o.call(this); for (var u = function () { return i.tokenMatcher(i.LA(1), a) }; this.tokenMatcher(this.LA(1), a) === !0;)this.CONSUME(a), o.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, a, u, o, Ys.NextTerminalAfterManySepWalker], u, qr.MANY_SEP_IDX, e, Ys.NextTerminalAfterManySepWalker) } }, t.prototype.repetitionSepSecondInternal = function (e, r, n, i, o) { for (; n();)this.CONSUME(r), i.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, r, n, i, o], n, qr.AT_LEAST_ONE_SEP_IDX, e, o) }, t.prototype.doSingleRepetition = function (e) { var r = this.getLexerPosition(); e.call(this); var n = this.getLexerPosition(); return n > r }, t.prototype.orInternal = function (e, r) { var n = this.getKeyForAutomaticLookahead(qr.OR_IDX, r), i = (0, tT.default)(e) ? e : e.DEF, o = this.getLaFuncFromCache(n), a = o.call(this, i); if (a !== void 0) { var s = i[a]; return s.ALT.call(this) } this.raiseNoAltException(r, e.ERR_MSG) }, t.prototype.ruleFinallyStateUpdate = function () { if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), this.RULE_STACK.length === 0 && this.isAtEndOfInput() === !1) { var e = this.LA(1), r = this.errorMessageProvider.buildNotAllInputParsedMessage({ firstRedundant: e, ruleName: this.getCurrRuleFullName() }); this.SAVE_ERROR(new Rp.NotAllInputParsedException(r, e)) } }, t.prototype.subruleInternal = function (e, r, n) { var i; try { var o = n !== void 0 ? n.ARGS : void 0; return this.subruleIdx = r, i = e.apply(this, o), this.cstPostNonTerminal(i, n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.ruleName), i } catch (a) { throw this.subruleInternalError(a, n, e.ruleName) } }, t.prototype.subruleInternalError = function (e, r, n) { throw (0, Rp.isRecognitionException)(e) && e.partialCstResult !== void 0 && (this.cstPostNonTerminal(e.partialCstResult, r !== void 0 && r.LABEL !== void 0 ? r.LABEL : n), delete e.partialCstResult), e }, t.prototype.consumeInternal = function (e, r, n) { var i; try { var o = this.LA(1); this.tokenMatcher(o, e) === !0 ? (this.consumeToken(), i = o) : this.consumeInternalError(e, o, n) } catch (a) { i = this.consumeInternalRecovery(e, r, a) } return this.cstPostTerminal(n !== void 0 && n.LABEL !== void 0 ? n.LABEL : e.name, i), i }, t.prototype.consumeInternalError = function (e, r, n) { var i, o = this.LA(0); throw n !== void 0 && n.ERR_MSG ? i = n.ERR_MSG : i = this.errorMessageProvider.buildMismatchTokenMessage({ expected: e, actual: r, previous: o, ruleName: this.getCurrRuleFullName() }), this.SAVE_ERROR(new Rp.MismatchedTokenException(i, r, o)) }, t.prototype.consumeInternalRecovery = function (e, r, n) { if (this.recoveryEnabled && n.name === "MismatchedTokenException" && !this.isBackTracking()) { var i = this.getFollowsForInRuleRecovery(e, r); try { return this.tryInRuleRecovery(e, i) } catch (o) { throw o.name === zie.IN_RULE_RECOVERY_EXCEPTION ? n : o } } else throw n }, t.prototype.saveRecogState = function () { var e = this.errors, r = (0, eL.default)(this.RULE_STACK); return { errors: e, lexerState: this.exportLexerState(), RULE_STACK: r, CST_STACK: this.CST_STACK } }, t.prototype.reloadRecogState = function (e) { this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK }, t.prototype.ruleInvocationStateUpdate = function (e, r, n) { this.RULE_OCCURRENCE_STACK.push(n), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(r) }, t.prototype.isBackTracking = function () { return this.isBackTrackingStack.length !== 0 }, t.prototype.getCurrRuleFullName = function () { var e = this.getLastExplicitRuleShortName(); return this.shortRuleNameToFull[e] }, t.prototype.shortRuleNameToFullName = function (e) { return this.shortRuleNameToFull[e] }, t.prototype.isAtEndOfInput = function () { return this.tokenMatcher(this.LA(1), nL.EOF) }, t.prototype.reset = function () { this.resetLexerState(), this.subruleIdx = 0, this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = [] }, t
    }(); Xs.RecognizerEngine = Vie
  }); var uL = f(Js => { "use strict"; var sL = Js && Js.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Js, "__esModule", { value: !0 }); Js.ErrorHandler = void 0; var nT = Ws(), Yie = sL(Ir()), oL = sL(wi()), aL = Gs(), Xie = Ar(), Jie = function () { function t() { } return t.prototype.initErrorHandler = function (e) { this._errors = [], this.errorMessageProvider = (0, Yie.default)(e, "errorMessageProvider") ? e.errorMessageProvider : Xie.DEFAULT_PARSER_CONFIG.errorMessageProvider }, t.prototype.SAVE_ERROR = function (e) { if ((0, nT.isRecognitionException)(e)) return e.context = { ruleStack: this.getHumanReadableRuleStack(), ruleOccurrenceStack: (0, oL.default)(this.RULE_OCCURRENCE_STACK) }, this._errors.push(e), e; throw Error("Trying to save an Error which is not a RecognitionException") }, Object.defineProperty(t.prototype, "errors", { get: function () { return (0, oL.default)(this._errors) }, set: function (e) { this._errors = e }, enumerable: !1, configurable: !0 }), t.prototype.raiseEarlyExitException = function (e, r, n) { for (var i = this.getCurrRuleFullName(), o = this.getGAstProductions()[i], a = (0, aL.getLookaheadPathsForOptionalProd)(e, o, r, this.maxLookahead), s = a[0], u = [], c = 1; c <= this.maxLookahead; c++)u.push(this.LA(c)); var l = this.errorMessageProvider.buildEarlyExitMessage({ expectedIterationPaths: s, actual: u, previous: this.LA(0), customUserDescription: n, ruleName: i }); throw this.SAVE_ERROR(new nT.EarlyExitException(l, this.LA(1), this.LA(0))) }, t.prototype.raiseNoAltException = function (e, r) { for (var n = this.getCurrRuleFullName(), i = this.getGAstProductions()[n], o = (0, aL.getLookaheadPathsForOr)(e, i, this.maxLookahead), a = [], s = 1; s <= this.maxLookahead; s++)a.push(this.LA(s)); var u = this.LA(0), c = this.errorMessageProvider.buildNoViableAltMessage({ expectedPathsPerAlt: o, actual: a, previous: u, customUserDescription: r, ruleName: this.getCurrRuleFullName() }); throw this.SAVE_ERROR(new nT.NoViableAltException(c, this.LA(1), u)) }, t }(); Js.ErrorHandler = Jie }); var dL = f(Qs => { "use strict"; var lL = Qs && Qs.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Qs, "__esModule", { value: !0 }); Qs.ContentAssist = void 0; var cL = Dc(), Qie = lL(Ls()), Zie = lL(ia()), eoe = function () { function t() { } return t.prototype.initContentAssist = function () { }, t.prototype.computeContentAssist = function (e, r) { var n = this.gastProductionsCache[e]; if ((0, Zie.default)(n)) throw Error("Rule ->".concat(e, "<- does not exist in this grammar.")); return (0, cL.nextPossibleTokensAfter)([n], r, this.tokenMatcher, this.maxLookahead) }, t.prototype.getNextPossibleTokenTypes = function (e) { var r = (0, Qie.default)(e.ruleStack), n = this.getGAstProductions(), i = n[r], o = new cL.NextAfterTokenWalker(i, e).startWalking(); return o }, t }(); Qs.ContentAssist = eoe }); var TL = f(Zs => {
    "use strict"; var eu = Zs && Zs.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Zs, "__esModule", { value: !0 }); Zs.GastRecorder = void 0; var bp = eu(rp()), toe = eu(qe()), roe = eu(qf()), noe = eu(Gt()), mL = eu(ms()), Hc = eu(Ir()), si = _t(), ioe = Nc(), gL = sa(), yL = ua(), ooe = Ar(), aoe = pp(), Pp = { description: "This Object indicates the Parser is during Recording Phase" }; Object.freeze(Pp); var fL = !0, pL = Math.pow(2, aoe.BITS_FOR_OCCURRENCE_IDX) - 1, vL = (0, yL.createToken)({ name: "RECORDING_PHASE_TOKEN", pattern: ioe.Lexer.NA }); (0, gL.augmentTokenTypes)([vL]); var _L = (0, yL.createTokenInstance)(vL, `This IToken indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, -1, -1, -1, -1, -1, -1); Object.freeze(_L); var soe = {
      name: `This CSTNode indicates the Parser is in Recording Phase
	See: https://chevrotain.io/docs/guide/internals.html#grammar-recording for details`, children: {}
    }, uoe = function () {
      function t() { } return t.prototype.initGastRecorder = function (e) { this.recordingProdStack = [], this.RECORDING_PHASE = !1 }, t.prototype.enableRecording = function () { var e = this; this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", function () { for (var r = function (i) { var o = i > 0 ? i : ""; e["CONSUME".concat(o)] = function (a, s) { return this.consumeInternalRecord(a, i, s) }, e["SUBRULE".concat(o)] = function (a, s) { return this.subruleInternalRecord(a, i, s) }, e["OPTION".concat(o)] = function (a) { return this.optionInternalRecord(a, i) }, e["OR".concat(o)] = function (a) { return this.orInternalRecord(a, i) }, e["MANY".concat(o)] = function (a) { this.manyInternalRecord(i, a) }, e["MANY_SEP".concat(o)] = function (a) { this.manySepFirstInternalRecord(i, a) }, e["AT_LEAST_ONE".concat(o)] = function (a) { this.atLeastOneInternalRecord(i, a) }, e["AT_LEAST_ONE_SEP".concat(o)] = function (a) { this.atLeastOneSepFirstInternalRecord(i, a) } }, n = 0; n < 10; n++)r(n); e.consume = function (i, o, a) { return this.consumeInternalRecord(o, i, a) }, e.subrule = function (i, o, a) { return this.subruleInternalRecord(o, i, a) }, e.option = function (i, o) { return this.optionInternalRecord(o, i) }, e.or = function (i, o) { return this.orInternalRecord(o, i) }, e.many = function (i, o) { this.manyInternalRecord(i, o) }, e.atLeastOne = function (i, o) { this.atLeastOneInternalRecord(i, o) }, e.ACTION = e.ACTION_RECORD, e.BACKTRACK = e.BACKTRACK_RECORD, e.LA = e.LA_RECORD }) }, t.prototype.disableRecording = function () { var e = this; this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", function () { for (var r = e, n = 0; n < 10; n++) { var i = n > 0 ? n : ""; delete r["CONSUME".concat(i)], delete r["SUBRULE".concat(i)], delete r["OPTION".concat(i)], delete r["OR".concat(i)], delete r["MANY".concat(i)], delete r["MANY_SEP".concat(i)], delete r["AT_LEAST_ONE".concat(i)], delete r["AT_LEAST_ONE_SEP".concat(i)] } delete r.consume, delete r.subrule, delete r.option, delete r.or, delete r.many, delete r.atLeastOne, delete r.ACTION, delete r.BACKTRACK, delete r.LA }) }, t.prototype.ACTION_RECORD = function (e) { }, t.prototype.BACKTRACK_RECORD = function (e, r) { return function () { return !0 } }, t.prototype.LA_RECORD = function (e) { return ooe.END_OF_FILE }, t.prototype.topLevelRuleRecord = function (e, r) {
        try { var n = new si.Rule({ definition: [], name: e }); return n.name = e, this.recordingProdStack.push(n), r.call(this), this.recordingProdStack.pop(), n } catch (i) {
          if (i.KNOWN_RECORDER_ERROR !== !0) try {
            i.message = i.message + `
	 This error was thrown during the "grammar recording phase" For more info see:
	https://chevrotain.io/docs/guide/internals.html#grammar-recording`} catch { throw i } throw i
        }
      }, t.prototype.optionInternalRecord = function (e, r) { return Gc.call(this, si.Option, e, r) }, t.prototype.atLeastOneInternalRecord = function (e, r) { Gc.call(this, si.RepetitionMandatory, r, e) }, t.prototype.atLeastOneSepFirstInternalRecord = function (e, r) { Gc.call(this, si.RepetitionMandatoryWithSeparator, r, e, fL) }, t.prototype.manyInternalRecord = function (e, r) { Gc.call(this, si.Repetition, r, e) }, t.prototype.manySepFirstInternalRecord = function (e, r) { Gc.call(this, si.RepetitionWithSeparator, r, e, fL) }, t.prototype.orInternalRecord = function (e, r) { return coe.call(this, e, r) }, t.prototype.subruleInternalRecord = function (e, r, n) {
        if (Ap(r), !e || (0, Hc.default)(e, "ruleName") === !1) {
          var i = new Error("<SUBRULE".concat(hL(r), "> argument is invalid") + " expecting a Parser method reference but got: <".concat(JSON.stringify(e), ">") + `
 inside top level rule: <`.concat(this.recordingProdStack[0].name, ">")); throw i.KNOWN_RECORDER_ERROR = !0, i
        } var o = (0, bp.default)(this.recordingProdStack), a = e.ruleName, s = new si.NonTerminal({ idx: r, nonTerminalName: a, label: n?.LABEL, referencedRule: void 0 }); return o.definition.push(s), this.outputCst ? soe : Pp
      }, t.prototype.consumeInternalRecord = function (e, r, n) {
        if (Ap(r), !(0, gL.hasShortKeyProperty)(e)) {
          var i = new Error("<CONSUME".concat(hL(r), "> argument is invalid") + " expecting a TokenType reference but got: <".concat(JSON.stringify(e), ">") + `
 inside top level rule: <`.concat(this.recordingProdStack[0].name, ">")); throw i.KNOWN_RECORDER_ERROR = !0, i
        } var o = (0, bp.default)(this.recordingProdStack), a = new si.Terminal({ idx: r, terminalType: e, label: n?.LABEL }); return o.definition.push(a), _L
      }, t
    }(); Zs.GastRecorder = uoe; function Gc(t, e, r, n) { n === void 0 && (n = !1), Ap(r); var i = (0, bp.default)(this.recordingProdStack), o = (0, mL.default)(e) ? e : e.DEF, a = new t({ definition: [], idx: r }); return n && (a.separator = e.SEP), (0, Hc.default)(e, "MAX_LOOKAHEAD") && (a.maxLookahead = e.MAX_LOOKAHEAD), this.recordingProdStack.push(a), o.call(this), i.definition.push(a), this.recordingProdStack.pop(), Pp } function coe(t, e) { var r = this; Ap(e); var n = (0, bp.default)(this.recordingProdStack), i = (0, toe.default)(t) === !1, o = i === !1 ? t : t.DEF, a = new si.Alternation({ definition: [], idx: e, ignoreAmbiguities: i && t.IGNORE_AMBIGUITIES === !0 }); (0, Hc.default)(t, "MAX_LOOKAHEAD") && (a.maxLookahead = t.MAX_LOOKAHEAD); var s = (0, roe.default)(o, function (u) { return (0, mL.default)(u.GATE) }); return a.hasPredicates = s, n.definition.push(a), (0, noe.default)(o, function (u) { var c = new si.Alternative({ definition: [] }); a.definition.push(c), (0, Hc.default)(u, "IGNORE_AMBIGUITIES") ? c.ignoreAmbiguities = u.IGNORE_AMBIGUITIES : (0, Hc.default)(u, "GATE") && (c.ignoreAmbiguities = !0), r.recordingProdStack.push(c), u.ALT.call(r), r.recordingProdStack.pop() }), Pp } function hL(t) { return t === 0 ? "" : "".concat(t) } function Ap(t) {
      if (t < 0 || t > pL) {
        var e = new Error("Invalid DSL Method idx value: <".concat(t, `>
	`) + "Idx value must be a none negative value smaller than ".concat(pL + 1)); throw e.KNOWN_RECORDER_ERROR = !0, e
      }
    }
  }); var RL = f(tu => { "use strict"; var loe = tu && tu.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(tu, "__esModule", { value: !0 }); tu.PerformanceTracer = void 0; var doe = loe(Ir()), foe = Ds(), poe = Ar(), hoe = function () { function t() { } return t.prototype.initPerformanceTracer = function (e) { if ((0, doe.default)(e, "traceInitPerf")) { var r = e.traceInitPerf, n = typeof r == "number"; this.traceInitMaxIdent = n ? r : 1 / 0, this.traceInitPerf = n ? r > 0 : r } else this.traceInitMaxIdent = 0, this.traceInitPerf = poe.DEFAULT_PARSER_CONFIG.traceInitPerf; this.traceInitIndent = -1 }, t.prototype.TRACE_INIT = function (e, r) { if (this.traceInitPerf === !0) { this.traceInitIndent++; var n = new Array(this.traceInitIndent + 1).join("	"); this.traceInitIndent < this.traceInitMaxIdent && console.log("".concat(n, "--> <").concat(e, ">")); var i = (0, foe.timer)(r), o = i.time, a = i.value, s = o > 10 ? console.warn : console.log; return this.traceInitIndent < this.traceInitMaxIdent && s("".concat(n, "<-- <").concat(e, "> time: ").concat(o, "ms")), this.traceInitIndent--, a } else return r() }, t }(); tu.PerformanceTracer = hoe }); var bL = f(Sp => { "use strict"; Object.defineProperty(Sp, "__esModule", { value: !0 }); Sp.applyMixins = void 0; function moe(t, e) { e.forEach(function (r) { var n = r.prototype; Object.getOwnPropertyNames(n).forEach(function (i) { if (i !== "constructor") { var o = Object.getOwnPropertyDescriptor(n, i); o && (o.get || o.set) ? Object.defineProperty(t.prototype, i, o) : t.prototype[i] = r.prototype[i] } }) }) } Sp.applyMixins = moe }); var Ar = f(Ge => {
    "use strict"; var CL = Ge && Ge.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), ru = Ge && Ge.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(Ge, "__esModule", { value: !0 }); Ge.EmbeddedActionsParser = Ge.CstParser = Ge.Parser = Ge.EMPTY_ALT = Ge.ParserDefinitionErrorType = Ge.DEFAULT_RULE_CONFIG = Ge.DEFAULT_PARSER_CONFIG = Ge.END_OF_FILE = void 0; var iT = ru(Or()), goe = ru(Ut()), yoe = ru(Gt()), Po = ru(Yn()), AL = ru(Ir()), EL = ru(wi()), voe = Ds(), _oe = aI(), PL = ua(), NL = Us(), SL = _q(), Toe = X_(), Roe = Iq(), boe = Kq(), Aoe = Vq(), Poe = Xq(), Soe = iL(), Coe = uL(), Eoe = dL(), Noe = TL(), koe = RL(), woe = bL(), Ooe = qc(); Ge.END_OF_FILE = (0, PL.createTokenInstance)(PL.EOF, "", NaN, NaN, NaN, NaN, NaN, NaN); Object.freeze(Ge.END_OF_FILE); Ge.DEFAULT_PARSER_CONFIG = Object.freeze({ recoveryEnabled: !1, maxLookahead: 3, dynamicTokensEnabled: !1, outputCst: !0, errorMessageProvider: NL.defaultParserErrorProvider, nodeLocationTracking: "none", traceInitPerf: !1, skipValidations: !1 }); Ge.DEFAULT_RULE_CONFIG = Object.freeze({ recoveryValueFunc: function () { }, resyncEnabled: !0 }); var Doe; (function (t) { t[t.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", t[t.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", t[t.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", t[t.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", t[t.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", t[t.LEFT_RECURSION = 5] = "LEFT_RECURSION", t[t.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", t[t.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", t[t.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", t[t.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", t[t.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", t[t.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", t[t.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS", t[t.CUSTOM_LOOKAHEAD_VALIDATION = 13] = "CUSTOM_LOOKAHEAD_VALIDATION" })(Doe = Ge.ParserDefinitionErrorType || (Ge.ParserDefinitionErrorType = {})); function Ioe(t) { return t === void 0 && (t = void 0), function () { return t } } Ge.EMPTY_ALT = Ioe; var Cp = function () {
      function t(e, r) {
        this.definitionErrors = [], this.selfAnalysisDone = !1; var n = this; if (n.initErrorHandler(r), n.initLexerAdapter(), n.initLooksAhead(r), n.initRecognizerEngine(e, r), n.initRecoverable(r), n.initTreeBuilder(r), n.initContentAssist(), n.initGastRecorder(r), n.initPerformanceTracer(r), (0, AL.default)(r, "ignoredIssues")) throw new Error(`The <ignoredIssues> IParserConfig property has been deprecated.
	Please use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.
	See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES
	For further details.`); this.skipValidations = (0, AL.default)(r, "skipValidations") ? r.skipValidations : Ge.DEFAULT_PARSER_CONFIG.skipValidations
      } return t.performSelfAnalysis = function (e) { throw Error("The **static** `performSelfAnalysis` method has been deprecated.	\nUse the **instance** method with the same name instead.") }, t.prototype.performSelfAnalysis = function () {
        var e = this; this.TRACE_INIT("performSelfAnalysis", function () {
          var r; e.selfAnalysisDone = !0; var n = e.className; e.TRACE_INIT("toFastProps", function () { (0, voe.toFastProperties)(e) }), e.TRACE_INIT("Grammar Recording", function () { try { e.enableRecording(), (0, yoe.default)(e.definedRulesNames, function (o) { var a = e[o], s = a.originalGrammarAction, u; e.TRACE_INIT("".concat(o, " Rule"), function () { u = e.topLevelRuleRecord(o, s) }), e.gastProductionsCache[o] = u }) } finally { e.disableRecording() } }); var i = []; if (e.TRACE_INIT("Grammar Resolving", function () { i = (0, SL.resolveGrammar)({ rules: (0, Po.default)(e.gastProductionsCache) }), e.definitionErrors = e.definitionErrors.concat(i) }), e.TRACE_INIT("Grammar Validations", function () { if ((0, iT.default)(i) && e.skipValidations === !1) { var o = (0, SL.validateGrammar)({ rules: (0, Po.default)(e.gastProductionsCache), tokenTypes: (0, Po.default)(e.tokensMap), errMsgProvider: NL.defaultGrammarValidatorErrorProvider, grammarName: n }), a = (0, Ooe.validateLookahead)({ lookaheadStrategy: e.lookaheadStrategy, rules: (0, Po.default)(e.gastProductionsCache), tokenTypes: (0, Po.default)(e.tokensMap), grammarName: n }); e.definitionErrors = e.definitionErrors.concat(o, a) } }), (0, iT.default)(e.definitionErrors) && (e.recoveryEnabled && e.TRACE_INIT("computeAllProdsFollows", function () { var o = (0, _oe.computeAllProdsFollows)((0, Po.default)(e.gastProductionsCache)); e.resyncFollows = o }), e.TRACE_INIT("ComputeLookaheadFunctions", function () { var o, a; (a = (o = e.lookaheadStrategy).initialize) === null || a === void 0 || a.call(o, { rules: (0, Po.default)(e.gastProductionsCache) }), e.preComputeLookaheadFunctions((0, Po.default)(e.gastProductionsCache)) })), !t.DEFER_DEFINITION_ERRORS_HANDLING && !(0, iT.default)(e.definitionErrors)) throw r = (0, goe.default)(e.definitionErrors, function (o) { return o.message }), new Error(`Parser Definition Errors detected:
 `.concat(r.join(`
-------------------------------
`)))
        })
      }, t.DEFER_DEFINITION_ERRORS_HANDLING = !1, t
    }(); Ge.Parser = Cp; (0, woe.applyMixins)(Cp, [Toe.Recoverable, Roe.LooksAhead, boe.TreeBuilder, Aoe.LexerAdapter, Soe.RecognizerEngine, Poe.RecognizerApi, Coe.ErrorHandler, Eoe.ContentAssist, Noe.GastRecorder, koe.PerformanceTracer]); var xoe = function (t) { CL(e, t); function e(r, n) { n === void 0 && (n = Ge.DEFAULT_PARSER_CONFIG); var i = (0, EL.default)(n); return i.outputCst = !0, t.call(this, r, i) || this } return e }(Cp); Ge.CstParser = xoe; var qoe = function (t) { CL(e, t); function e(r, n) { n === void 0 && (n = Ge.DEFAULT_PARSER_CONFIG); var i = (0, EL.default)(n); return i.outputCst = !1, t.call(this, r, i) || this } return e }(Cp); Ge.EmbeddedActionsParser = qoe
  }); var wL = f(So => { "use strict"; var Loe = So && So.__extends || function () { var t = function (e, r) { return t = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (n, i) { n.__proto__ = i } || function (n, i) { for (var o in i) Object.prototype.hasOwnProperty.call(i, o) && (n[o] = i[o]) }, t(e, r) }; return function (e, r) { if (typeof r != "function" && r !== null) throw new TypeError("Class extends value " + String(r) + " is not a constructor or null"); t(e, r); function n() { this.constructor = e } e.prototype = r === null ? Object.create(r) : (n.prototype = r.prototype, new n) } }(), nu = So && So.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(So, "__esModule", { value: !0 }); So.buildModel = void 0; var kL = _t(), Wc = nu(Ut()), Moe = nu(Cn()), $oe = nu(Yn()), Foe = nu(qf()), joe = nu(q_()), Uoe = nu(Ac()); function Goe(t) { var e = new Hoe, r = (0, $oe.default)(t); return (0, Wc.default)(r, function (n) { return e.visitRule(n) }) } So.buildModel = Goe; var Hoe = function (t) { Loe(e, t); function e() { return t !== null && t.apply(this, arguments) || this } return e.prototype.visitRule = function (r) { var n = this.visitEach(r.definition), i = (0, joe.default)(n, function (a) { return a.propertyName }), o = (0, Wc.default)(i, function (a, s) { var u = !(0, Foe.default)(a, function (l) { return !l.canBeNull }), c = a[0].type; return a.length > 1 && (c = (0, Wc.default)(a, function (l) { return l.type })), { name: s, type: c, optional: u } }); return { name: r.name, properties: o } }, e.prototype.visitAlternative = function (r) { return this.visitEachAndOverrideWith(r.definition, { canBeNull: !0 }) }, e.prototype.visitOption = function (r) { return this.visitEachAndOverrideWith(r.definition, { canBeNull: !0 }) }, e.prototype.visitRepetition = function (r) { return this.visitEachAndOverrideWith(r.definition, { canBeNull: !0 }) }, e.prototype.visitRepetitionMandatory = function (r) { return this.visitEach(r.definition) }, e.prototype.visitRepetitionMandatoryWithSeparator = function (r) { return this.visitEach(r.definition).concat({ propertyName: r.separator.name, canBeNull: !0, type: Ep(r.separator) }) }, e.prototype.visitRepetitionWithSeparator = function (r) { return this.visitEachAndOverrideWith(r.definition, { canBeNull: !0 }).concat({ propertyName: r.separator.name, canBeNull: !0, type: Ep(r.separator) }) }, e.prototype.visitAlternation = function (r) { return this.visitEachAndOverrideWith(r.definition, { canBeNull: !0 }) }, e.prototype.visitTerminal = function (r) { return [{ propertyName: r.label || r.terminalType.name, canBeNull: !1, type: Ep(r) }] }, e.prototype.visitNonTerminal = function (r) { return [{ propertyName: r.label || r.nonTerminalName, canBeNull: !1, type: Ep(r) }] }, e.prototype.visitEachAndOverrideWith = function (r, n) { return (0, Wc.default)(this.visitEach(r), function (i) { return (0, Uoe.default)({}, i, n) }) }, e.prototype.visitEach = function (r) { var n = this; return (0, Moe.default)((0, Wc.default)(r, function (i) { return n.visit(i) })) }, e }(kL.GAstVisitor); function Ep(t) { return t instanceof kL.NonTerminal ? { kind: "rule", name: t.referencedRule.name } : { kind: "token" } } }); var DL = f((mve, OL) => { var Woe = kf(); function Boe(t, e, r) { var n = t.length; return r = r === void 0 ? n : r, !e && r >= n ? t : Woe(t, e, r) } OL.exports = Boe }); var oT = f((gve, IL) => { var Koe = "\\ud800-\\udfff", zoe = "\\u0300-\\u036f", Voe = "\\ufe20-\\ufe2f", Yoe = "\\u20d0-\\u20ff", Xoe = zoe + Voe + Yoe, Joe = "\\ufe0e\\ufe0f", Qoe = "\\u200d", Zoe = RegExp("[" + Qoe + Koe + Xoe + Joe + "]"); function eae(t) { return Zoe.test(t) } IL.exports = eae }); var qL = f((yve, xL) => { function tae(t) { return t.split("") } xL.exports = tae }); var HL = f((vve, GL) => { var LL = "\\ud800-\\udfff", rae = "\\u0300-\\u036f", nae = "\\ufe20-\\ufe2f", iae = "\\u20d0-\\u20ff", oae = rae + nae + iae, aae = "\\ufe0e\\ufe0f", sae = "[" + LL + "]", aT = "[" + oae + "]", sT = "\\ud83c[\\udffb-\\udfff]", uae = "(?:" + aT + "|" + sT + ")", ML = "[^" + LL + "]", $L = "(?:\\ud83c[\\udde6-\\uddff]){2}", FL = "[\\ud800-\\udbff][\\udc00-\\udfff]", cae = "\\u200d", jL = uae + "?", UL = "[" + aae + "]?", lae = "(?:" + cae + "(?:" + [ML, $L, FL].join("|") + ")" + UL + jL + ")*", dae = UL + jL + lae, fae = "(?:" + [ML + aT + "?", aT, $L, FL, sae].join("|") + ")", pae = RegExp(sT + "(?=" + sT + ")|" + fae + dae, "g"); function hae(t) { return t.match(pae) || [] } GL.exports = hae }); var BL = f((_ve, WL) => { var mae = qL(), gae = oT(), yae = HL(); function vae(t) { return gae(t) ? yae(t) : mae(t) } WL.exports = vae }); var zL = f((Tve, KL) => { var _ae = DL(), Tae = oT(), Rae = BL(), bae = Bv(); function Aae(t) { return function (e) { e = bae(e); var r = Tae(e) ? Rae(e) : void 0, n = r ? r[0] : e.charAt(0), i = r ? _ae(r, 1).join("") : e.slice(1); return n[t]() + i } } KL.exports = Aae }); var YL = f((Rve, VL) => { var Pae = zL(), Sae = Pae("toUpperCase"); VL.exports = Sae }); var ZL = f(iu => {
    "use strict"; var ou = iu && iu.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(iu, "__esModule", { value: !0 }); iu.genDts = void 0; var Cae = ou(Cn()), Eae = ou(qe()), Np = ou(Ut()), Nae = ou(Ii()), kae = ou(Uf()), JL = ou(YL()); function wae(t, e) {
      var r = []; return r = r.concat('import type { CstNode, ICstVisitor, IToken } from "chevrotain";'), r = r.concat((0, Cae.default)((0, Np.default)(t, function (n) { return Oae(n) }))), e.includeVisitorInterface && (r = r.concat(qae(e.visitorInterfaceName, t))), r.join(`

`) + `
`} iu.genDts = wae; function Oae(t) { var e = Dae(t), r = Iae(t); return [e, r] } function Dae(t) {
      var e = QL(t.name), r = uT(t.name); return "export interface ".concat(e, ` extends CstNode {
  name: "`).concat(t.name, `";
  children: `).concat(r, `;
}`)
    } function Iae(t) {
      var e = uT(t.name); return "export type ".concat(e, ` = {
  `).concat((0, Np.default)(t.properties, function (r) { return xae(r) }).join(`
  `), `
};`)
    } function xae(t) { var e = Mae(t.type); return "".concat(t.name).concat(t.optional ? "?" : "", ": ").concat(e, "[];") } function qae(t, e) {
      return "export interface ".concat(t, `<IN, OUT> extends ICstVisitor<IN, OUT> {
  `).concat((0, Np.default)(e, function (r) { return Lae(r) }).join(`
  `), `
}`)
    } function Lae(t) { var e = uT(t.name); return "".concat(t.name, "(children: ").concat(e, ", param?: IN): OUT;") } function Mae(t) { if ((0, Eae.default)(t)) { var e = (0, kae.default)((0, Np.default)(t, function (n) { return XL(n) })), r = (0, Nae.default)(e, function (n, i) { return n + " | " + i }); return "(" + r + ")" } else return XL(t) } function XL(t) { return t.kind === "token" ? "IToken" : QL(t.name) } function QL(t) { return (0, JL.default)(t) + "CstNode" } function uT(t) { return (0, JL.default)(t) + "CstChildren" }
  }); var eM = f(au => { "use strict"; var kp = au && au.__assign || function () { return kp = Object.assign || function (t) { for (var e, r = 1, n = arguments.length; r < n; r++) { e = arguments[r]; for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]) } return t }, kp.apply(this, arguments) }; Object.defineProperty(au, "__esModule", { value: !0 }); au.generateCstDts = void 0; var $ae = wL(), Fae = ZL(), jae = { includeVisitorInterface: !0, visitorInterfaceName: "ICstNodeVisitor" }; function Uae(t, e) { var r = kp(kp({}, jae), e), n = (0, $ae.buildModel)(t); return (0, Fae.genDts)(n, r) } au.generateCstDts = Uae }); var rM = f(wp => {
    "use strict"; Object.defineProperty(wp, "__esModule", { value: !0 }); wp.createSyntaxDiagramsCode = void 0; var tM = _v(); function Gae(t, e) {
      var r = e === void 0 ? {} : e, n = r.resourceBase, i = n === void 0 ? "https://unpkg.com/chevrotain@".concat(tM.VERSION, "/diagrams/") : n, o = r.css, a = o === void 0 ? "https://unpkg.com/chevrotain@".concat(tM.VERSION, "/diagrams/diagrams.css") : o, s = `
<!-- This is a generated file -->
<!DOCTYPE html>
<meta charset="utf-8">
<style>
  body {
    background-color: hsl(30, 20%, 95%)
  }
</style>

`, u = `
<link rel='stylesheet' href='`.concat(a, `'>
`), c = `
<script src='`.concat(i, `vendor/railroad-diagrams.js'><\/script>
<script src='`).concat(i, `src/diagrams_builder.js'><\/script>
<script src='`).concat(i, `src/diagrams_behavior.js'><\/script>
<script src='`).concat(i, `src/main.js'><\/script>
`), l = `
<div id="diagrams" align="center"></div>    
`, d = `
<script>
    window.serializedGrammar = `.concat(JSON.stringify(t, null, "  "), `;
<\/script>
`), h = `
<script>
    var diagramsDiv = document.getElementById("diagrams");
    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);
<\/script>
`; return s + u + c + l + d + h
    } wp.createSyntaxDiagramsCode = Gae
  }); var ga = f(U => {
    "use strict"; Object.defineProperty(U, "__esModule", { value: !0 }); U.Parser = U.createSyntaxDiagramsCode = U.clearCache = U.generateCstDts = U.GAstVisitor = U.serializeProduction = U.serializeGrammar = U.Terminal = U.Rule = U.RepetitionWithSeparator = U.RepetitionMandatoryWithSeparator = U.RepetitionMandatory = U.Repetition = U.Option = U.NonTerminal = U.Alternative = U.Alternation = U.defaultLexerErrorProvider = U.NoViableAltException = U.NotAllInputParsedException = U.MismatchedTokenException = U.isRecognitionException = U.EarlyExitException = U.defaultParserErrorProvider = U.LLkLookaheadStrategy = U.getLookaheadPaths = U.tokenName = U.tokenMatcher = U.tokenLabel = U.EOF = U.createTokenInstance = U.createToken = U.LexerDefinitionErrorType = U.Lexer = U.EMPTY_ALT = U.ParserDefinitionErrorType = U.EmbeddedActionsParser = U.CstParser = U.VERSION = void 0; var Hae = _v(); Object.defineProperty(U, "VERSION", { enumerable: !0, get: function () { return Hae.VERSION } }); var Op = Ar(); Object.defineProperty(U, "CstParser", { enumerable: !0, get: function () { return Op.CstParser } }); Object.defineProperty(U, "EmbeddedActionsParser", { enumerable: !0, get: function () { return Op.EmbeddedActionsParser } }); Object.defineProperty(U, "ParserDefinitionErrorType", { enumerable: !0, get: function () { return Op.ParserDefinitionErrorType } }); Object.defineProperty(U, "EMPTY_ALT", { enumerable: !0, get: function () { return Op.EMPTY_ALT } }); var nM = Nc(); Object.defineProperty(U, "Lexer", { enumerable: !0, get: function () { return nM.Lexer } }); Object.defineProperty(U, "LexerDefinitionErrorType", { enumerable: !0, get: function () { return nM.LexerDefinitionErrorType } }); var su = ua(); Object.defineProperty(U, "createToken", { enumerable: !0, get: function () { return su.createToken } }); Object.defineProperty(U, "createTokenInstance", { enumerable: !0, get: function () { return su.createTokenInstance } }); Object.defineProperty(U, "EOF", { enumerable: !0, get: function () { return su.EOF } }); Object.defineProperty(U, "tokenLabel", { enumerable: !0, get: function () { return su.tokenLabel } }); Object.defineProperty(U, "tokenMatcher", { enumerable: !0, get: function () { return su.tokenMatcher } }); Object.defineProperty(U, "tokenName", { enumerable: !0, get: function () { return su.tokenName } }); var Wae = Gs(); Object.defineProperty(U, "getLookaheadPaths", { enumerable: !0, get: function () { return Wae.getLookaheadPaths } }); var Bae = Q_(); Object.defineProperty(U, "LLkLookaheadStrategy", { enumerable: !0, get: function () { return Bae.LLkLookaheadStrategy } }); var Kae = Us(); Object.defineProperty(U, "defaultParserErrorProvider", { enumerable: !0, get: function () { return Kae.defaultParserErrorProvider } }); var Bc = Ws(); Object.defineProperty(U, "EarlyExitException", { enumerable: !0, get: function () { return Bc.EarlyExitException } }); Object.defineProperty(U, "isRecognitionException", { enumerable: !0, get: function () { return Bc.isRecognitionException } }); Object.defineProperty(U, "MismatchedTokenException", { enumerable: !0, get: function () { return Bc.MismatchedTokenException } }); Object.defineProperty(U, "NotAllInputParsedException", { enumerable: !0, get: function () { return Bc.NotAllInputParsedException } }); Object.defineProperty(U, "NoViableAltException", { enumerable: !0, get: function () { return Bc.NoViableAltException } }); var zae = C_(); Object.defineProperty(U, "defaultLexerErrorProvider", { enumerable: !0, get: function () { return zae.defaultLexerErrorProvider } }); var ui = _t(); Object.defineProperty(U, "Alternation", { enumerable: !0, get: function () { return ui.Alternation } }); Object.defineProperty(U, "Alternative", { enumerable: !0, get: function () { return ui.Alternative } }); Object.defineProperty(U, "NonTerminal", { enumerable: !0, get: function () { return ui.NonTerminal } }); Object.defineProperty(U, "Option", { enumerable: !0, get: function () { return ui.Option } }); Object.defineProperty(U, "Repetition", { enumerable: !0, get: function () { return ui.Repetition } }); Object.defineProperty(U, "RepetitionMandatory", { enumerable: !0, get: function () { return ui.RepetitionMandatory } }); Object.defineProperty(U, "RepetitionMandatoryWithSeparator", { enumerable: !0, get: function () { return ui.RepetitionMandatoryWithSeparator } }); Object.defineProperty(U, "RepetitionWithSeparator", { enumerable: !0, get: function () { return ui.RepetitionWithSeparator } }); Object.defineProperty(U, "Rule", { enumerable: !0, get: function () { return ui.Rule } }); Object.defineProperty(U, "Terminal", { enumerable: !0, get: function () { return ui.Terminal } }); var cT = _t(); Object.defineProperty(U, "serializeGrammar", { enumerable: !0, get: function () { return cT.serializeGrammar } }); Object.defineProperty(U, "serializeProduction", { enumerable: !0, get: function () { return cT.serializeProduction } }); Object.defineProperty(U, "GAstVisitor", { enumerable: !0, get: function () { return cT.GAstVisitor } }); var Vae = eM(); Object.defineProperty(U, "generateCstDts", { enumerable: !0, get: function () { return Vae.generateCstDts } }); function Yae() {
      console.warn(`The clearCache function was 'soft' removed from the Chevrotain API.
	 It performs no action other than printing this message.
	 Please avoid using it as it will be completely removed in the future`)
    } U.clearCache = Yae; var Xae = rM(); Object.defineProperty(U, "createSyntaxDiagramsCode", { enumerable: !0, get: function () { return Xae.createSyntaxDiagramsCode } }); var Jae = function () {
      function t() {
        throw new Error(`The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.	
See: https://chevrotain.io/docs/changes/BREAKING_CHANGES.html#_7-0-0`)
      } return t
    }(); U.Parser = Jae
  }); var cM = f(V => { "use strict"; var iM = V && V.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(V, "__esModule", { value: !0 }); V.createATN = V.RuleTransition = V.EpsilonTransition = V.AtomTransition = V.AbstractTransition = V.ATN_LOOP_END = V.ATN_PLUS_LOOP_BACK = V.ATN_STAR_LOOP_ENTRY = V.ATN_STAR_LOOP_BACK = V.ATN_BLOCK_END = V.ATN_RULE_STOP = V.ATN_TOKEN_START = V.ATN_STAR_BLOCK_START = V.ATN_PLUS_BLOCK_START = V.ATN_RULE_START = V.ATN_BASIC = V.ATN_INVALID_TYPE = V.buildATNKey = void 0; var oM = iM(Ut()), Qae = iM(Ec()), Pr = ga(); function zc(t, e, r) { return `${t.name}_${e}_${r}` } V.buildATNKey = zc; V.ATN_INVALID_TYPE = 0; V.ATN_BASIC = 1; V.ATN_RULE_START = 2; V.ATN_PLUS_BLOCK_START = 4; V.ATN_STAR_BLOCK_START = 5; V.ATN_TOKEN_START = 6; V.ATN_RULE_STOP = 7; V.ATN_BLOCK_END = 8; V.ATN_STAR_LOOP_BACK = 9; V.ATN_STAR_LOOP_ENTRY = 10; V.ATN_PLUS_LOOP_BACK = 11; V.ATN_LOOP_END = 12; var uu = class { constructor(e) { this.target = e } isEpsilon() { return !1 } }; V.AbstractTransition = uu; var Dp = class extends uu { constructor(e, r) { super(e), this.tokenType = r } }; V.AtomTransition = Dp; var Ip = class extends uu { constructor(e) { super(e) } isEpsilon() { return !0 } }; V.EpsilonTransition = Ip; var Kc = class extends uu { constructor(e, r, n) { super(e), this.rule = r, this.followState = n } isEpsilon() { return !0 } }; V.RuleTransition = Kc; function Zae(t) { let e = { decisionMap: {}, decisionStates: [], ruleToStartState: new Map, ruleToStopState: new Map, states: [] }; ese(e, t); let r = t.length; for (let n = 0; n < r; n++) { let i = t[n], o = ya(e, i, i); o !== void 0 && dse(e, i, o) } return e } V.createATN = Zae; function ese(t, e) { let r = e.length; for (let n = 0; n < r; n++) { let i = e[n], o = Wt(t, i, void 0, { type: V.ATN_RULE_START }), a = Wt(t, i, void 0, { type: V.ATN_RULE_STOP }); o.stop = a, t.ruleToStartState.set(i, o), t.ruleToStopState.set(i, a) } } function aM(t, e, r) { return r instanceof Pr.Terminal ? lT(t, e, r.terminalType, r) : r instanceof Pr.NonTerminal ? lse(t, e, r) : r instanceof Pr.Alternation ? ose(t, e, r) : r instanceof Pr.Option ? ase(t, e, r) : r instanceof Pr.Repetition ? tse(t, e, r) : r instanceof Pr.RepetitionWithSeparator ? rse(t, e, r) : r instanceof Pr.RepetitionMandatory ? nse(t, e, r) : r instanceof Pr.RepetitionMandatoryWithSeparator ? ise(t, e, r) : ya(t, e, r) } function tse(t, e, r) { let n = Wt(t, e, r, { type: V.ATN_STAR_BLOCK_START }); Co(t, n); let i = cu(t, e, n, r, ya(t, e, r)); return uM(t, e, r, i) } function rse(t, e, r) { let n = Wt(t, e, r, { type: V.ATN_STAR_BLOCK_START }); Co(t, n); let i = cu(t, e, n, r, ya(t, e, r)), o = lT(t, e, r.separator, r); return uM(t, e, r, i, o) } function nse(t, e, r) { let n = Wt(t, e, r, { type: V.ATN_PLUS_BLOCK_START }); Co(t, n); let i = cu(t, e, n, r, ya(t, e, r)); return sM(t, e, r, i) } function ise(t, e, r) { let n = Wt(t, e, r, { type: V.ATN_PLUS_BLOCK_START }); Co(t, n); let i = cu(t, e, n, r, ya(t, e, r)), o = lT(t, e, r.separator, r); return sM(t, e, r, i, o) } function ose(t, e, r) { let n = Wt(t, e, r, { type: V.ATN_BASIC }); Co(t, n); let i = (0, oM.default)(r.definition, a => aM(t, e, a)); return cu(t, e, n, r, ...i) } function ase(t, e, r) { let n = Wt(t, e, r, { type: V.ATN_BASIC }); Co(t, n); let i = cu(t, e, n, r, ya(t, e, r)); return sse(t, e, r, i) } function ya(t, e, r) { let n = (0, Qae.default)((0, oM.default)(r.definition, i => aM(t, e, i)), i => i !== void 0); return n.length === 1 ? n[0] : n.length === 0 ? void 0 : cse(t, n) } function sM(t, e, r, n, i) { let o = n.left, a = n.right, s = Wt(t, e, r, { type: V.ATN_PLUS_LOOP_BACK }); Co(t, s); let u = Wt(t, e, r, { type: V.ATN_LOOP_END }); return o.loopback = s, u.loopback = s, t.decisionMap[zc(e, i ? "RepetitionMandatoryWithSeparator" : "RepetitionMandatory", r.idx)] = s, wt(a, s), i === void 0 ? (wt(s, o), wt(s, u)) : (wt(s, u), wt(s, i.left), wt(i.right, o)), { left: o, right: u } } function uM(t, e, r, n, i) { let o = n.left, a = n.right, s = Wt(t, e, r, { type: V.ATN_STAR_LOOP_ENTRY }); Co(t, s); let u = Wt(t, e, r, { type: V.ATN_LOOP_END }), c = Wt(t, e, r, { type: V.ATN_STAR_LOOP_BACK }); return s.loopback = c, u.loopback = c, wt(s, o), wt(s, u), wt(a, c), i !== void 0 ? (wt(c, u), wt(c, i.left), wt(i.right, o)) : wt(c, s), t.decisionMap[zc(e, i ? "RepetitionWithSeparator" : "Repetition", r.idx)] = s, { left: s, right: u } } function sse(t, e, r, n) { let i = n.left, o = n.right; return wt(i, o), t.decisionMap[zc(e, "Option", r.idx)] = i, n } function Co(t, e) { return t.decisionStates.push(e), e.decision = t.decisionStates.length - 1, e.decision } function cu(t, e, r, n, ...i) { let o = Wt(t, e, n, { type: V.ATN_BLOCK_END, start: r }); r.end = o; for (let s of i) s !== void 0 ? (wt(r, s.left), wt(s.right, o)) : wt(r, o); let a = { left: r, right: o }; return t.decisionMap[zc(e, use(n), n.idx)] = r, a } function use(t) { if (t instanceof Pr.Alternation) return "Alternation"; if (t instanceof Pr.Option) return "Option"; if (t instanceof Pr.Repetition) return "Repetition"; if (t instanceof Pr.RepetitionWithSeparator) return "RepetitionWithSeparator"; if (t instanceof Pr.RepetitionMandatory) return "RepetitionMandatory"; if (t instanceof Pr.RepetitionMandatoryWithSeparator) return "RepetitionMandatoryWithSeparator"; throw new Error("Invalid production type encountered") } function cse(t, e) { let r = e.length; for (let o = 0; o < r - 1; o++) { let a = e[o], s; a.left.transitions.length === 1 && (s = a.left.transitions[0]); let u = s instanceof Kc, c = s, l = e[o + 1].left; a.left.type === V.ATN_BASIC && a.right.type === V.ATN_BASIC && s !== void 0 && (u && c.followState === a.right || s.target === a.right) ? (u ? c.followState = l : s.target = l, fse(t, a.right)) : wt(a.right, l) } let n = e[0], i = e[r - 1]; return { left: n.left, right: i.right } } function lT(t, e, r, n) { let i = Wt(t, e, n, { type: V.ATN_BASIC }), o = Wt(t, e, n, { type: V.ATN_BASIC }); return dT(i, new Dp(o, r)), { left: i, right: o } } function lse(t, e, r) { let n = r.referencedRule, i = t.ruleToStartState.get(n), o = Wt(t, e, r, { type: V.ATN_BASIC }), a = Wt(t, e, r, { type: V.ATN_BASIC }), s = new Kc(i, n, a); return dT(o, s), { left: o, right: a } } function dse(t, e, r) { let n = t.ruleToStartState.get(e); wt(n, r.left); let i = t.ruleToStopState.get(e); return wt(r.right, i), { left: n, right: i } } function wt(t, e) { let r = new Ip(e); dT(t, r) } function Wt(t, e, r, n) { let i = Object.assign({ atn: t, production: r, epsilonOnlyTransitions: !1, rule: e, transitions: [], nextTokenWithinRule: [], stateNumber: t.states.length }, n); return t.states.push(i), i } function dT(t, e) { t.transitions.length === 0 && (t.epsilonOnlyTransitions = e.isEpsilon()), t.transitions.push(e) } function fse(t, e) { t.states.splice(t.states.indexOf(e), 1) } }); var dM = f(ci => { "use strict"; var pse = ci && ci.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(ci, "__esModule", { value: !0 }); ci.getATNConfigKey = ci.ATNConfigSet = ci.DFA_ERROR = void 0; var hse = pse(Ut()); ci.DFA_ERROR = {}; var fT = class { constructor() { this.map = {}, this.configs = [] } get size() { return this.configs.length } finalize() { this.map = {} } add(e) { let r = lM(e); r in this.map || (this.map[r] = this.configs.length, this.configs.push(e)) } get elements() { return this.configs } get alts() { return (0, hse.default)(this.configs, e => e.alt) } get key() { let e = ""; for (let r in this.map) e += r + ":"; return e } }; ci.ATNConfigSet = fT; function lM(t, e = !0) { return `${e ? `a${t.alt}` : ""}s${t.state.stateNumber}:${t.stack.map(r => r.stateNumber.toString()).join("_")}` } ci.getATNConfigKey = lM }); var pM = f((Nve, fM) => { var mse = Es(); function gse(t, e, r) { for (var n = -1, i = t.length; ++n < i;) { var o = t[n], a = e(o); if (a != null && (s === void 0 ? a === a && !mse(a) : r(a, s))) var s = a, u = o } return u } fM.exports = gse }); var mM = f((kve, hM) => { function yse(t, e) { return t < e } hM.exports = yse }); var yM = f((wve, gM) => { var vse = pM(), _se = mM(), Tse = na(); function Rse(t) { return t && t.length ? vse(t, Tse, _se) : void 0 } gM.exports = Rse }); var _M = f((Ove, vM) => { var bse = Xr(), Ase = s_(); function Pse(t, e) { return t && t.length ? Ase(t, bse(e, 2)) : [] } vM.exports = Pse }); var CM = f(lu => {
    "use strict"; var No = lu && lu.__importDefault || function (t) { return t && t.__esModule ? t : { default: t } }; Object.defineProperty(lu, "__esModule", { value: !0 }); lu.LLStarLookaheadStrategy = void 0; var Lr = ga(), wn = cM(), Eo = dM(), Sse = No(yM()), Cse = No(op()), Ese = No(_M()), Vc = No(Ut()), Nse = No(Cn()), pT = No(Gt()), kse = No(Or()), TM = No(Ii()); function wse(t, e) { let r = {}; return n => { let i = n.toString(), o = r[i]; return o !== void 0 || (o = { atnStartState: t, decision: e, states: {} }, r[i] = o), o } } var xp = class { constructor() { this.predicates = [] } is(e) { return e >= this.predicates.length || this.predicates[e] } set(e, r) { this.predicates[e] = r } toString() { let e = "", r = this.predicates.length; for (let n = 0; n < r; n++)e += this.predicates[n] === !0 ? "1" : "0"; return e } }, RM = new xp, mT = class extends Lr.LLkLookaheadStrategy { constructor(e) { var r; super(), this.logging = (r = e?.logging) !== null && r !== void 0 ? r : n => console.log(n) } initialize(e) { this.atn = (0, wn.createATN)(e.rules), this.dfas = Ose(this.atn) } validateAmbiguousAlternationAlternatives() { return [] } validateEmptyOrAlternatives() { return [] } buildLookaheadForAlternation(e) { let { prodOccurrence: r, rule: n, hasPredicates: i, dynamicTokensEnabled: o } = e, a = this.dfas, s = this.logging, u = (0, wn.buildATNKey)(n, "Alternation", r), l = this.atn.decisionMap[u].decision, d = (0, Vc.default)((0, Lr.getLookaheadPaths)({ maxLookahead: 1, occurrence: r, prodType: "Alternation", rule: n }), h => (0, Vc.default)(h, y => y[0])); if (bM(d, !1) && !o) { let h = (0, TM.default)(d, (y, m, R) => ((0, pT.default)(m, C => { C && (y[C.tokenTypeIdx] = R, (0, pT.default)(C.categoryMatches, E => { y[E] = R })) }), y), {}); return i ? function (y) { var m; let R = this.LA(1), C = h[R.tokenTypeIdx]; if (y !== void 0 && C !== void 0) { let E = (m = y[C]) === null || m === void 0 ? void 0 : m.GATE; if (E !== void 0 && E.call(this) === !1) return } return C } : function () { let y = this.LA(1); return h[y.tokenTypeIdx] } } else return i ? function (h) { let y = new xp, m = h === void 0 ? 0 : h.length; for (let C = 0; C < m; C++) { let E = h?.[C].GATE; y.set(C, E === void 0 || E.call(this)) } let R = hT.call(this, a, l, y, s); return typeof R == "number" ? R : void 0 } : function () { let h = hT.call(this, a, l, RM, s); return typeof h == "number" ? h : void 0 } } buildLookaheadForOptional(e) { let { prodOccurrence: r, rule: n, prodType: i, dynamicTokensEnabled: o } = e, a = this.dfas, s = this.logging, u = (0, wn.buildATNKey)(n, i, r), l = this.atn.decisionMap[u].decision, d = (0, Vc.default)((0, Lr.getLookaheadPaths)({ maxLookahead: 1, occurrence: r, prodType: i, rule: n }), h => (0, Vc.default)(h, y => y[0])); if (bM(d) && d[0][0] && !o) { let h = d[0], y = (0, Nse.default)(h); if (y.length === 1 && (0, kse.default)(y[0].categoryMatches)) { let R = y[0].tokenTypeIdx; return function () { return this.LA(1).tokenTypeIdx === R } } else { let m = (0, TM.default)(y, (R, C) => (C !== void 0 && (R[C.tokenTypeIdx] = !0, (0, pT.default)(C.categoryMatches, E => { R[E] = !0 })), R), {}); return function () { let R = this.LA(1); return m[R.tokenTypeIdx] === !0 } } } return function () { let h = hT.call(this, a, l, RM, s); return typeof h == "object" ? !1 : h === 0 } } }; lu.LLStarLookaheadStrategy = mT; function bM(t, e = !0) { let r = new Set; for (let n of t) { let i = new Set; for (let o of n) { if (o === void 0) { if (e) break; return !1 } let a = [o.tokenTypeIdx].concat(o.categoryMatches); for (let s of a) if (r.has(s)) { if (!i.has(s)) return !1 } else r.add(s), i.add(s) } } return !0 } function Ose(t) { let e = t.decisionStates.length, r = Array(e); for (let n = 0; n < e; n++)r[n] = wse(t.decisionStates[n], n); return r } function hT(t, e, r, n) { let i = t[e](r), o = i.start; if (o === void 0) { let s = Gse(i.atnStartState); o = SM(i, PM(s)), i.start = o } return Dse.apply(this, [i, o, r, n]) } function Dse(t, e, r, n) { let i = e, o = 1, a = [], s = this.LA(o++); for (; ;) { let u = $se(i, s); if (u === void 0 && (u = Ise.apply(this, [t, i, s, o, r, n])), u === Eo.DFA_ERROR) return Mse(a, i, s); if (u.isAcceptState === !0) return u.prediction; i = u, a.push(s), s = this.LA(o++) } } function Ise(t, e, r, n, i, o) { let a = Fse(e.configs, r, i); if (a.size === 0) return AM(t, e, r, Eo.DFA_ERROR), Eo.DFA_ERROR; let s = PM(a), u = Use(a, i); if (u !== void 0) s.isAcceptState = !0, s.prediction = u, s.configs.uniqueAlt = u; else if (Kse(a)) { let c = (0, Sse.default)(a.alts); s.isAcceptState = !0, s.prediction = c, s.configs.uniqueAlt = c, xse.apply(this, [t, n, a.alts, o]) } return s = AM(t, e, r, s), s } function xse(t, e, r, n) { let i = []; for (let c = 1; c <= e; c++)i.push(this.LA(c).tokenType); let o = t.atnStartState, a = o.rule, s = o.production, u = qse({ topLevelRule: a, ambiguityIndices: r, production: s, prefixPath: i }); n(u) } function qse(t) {
      let e = (0, Vc.default)(t.prefixPath, i => (0, Lr.tokenLabel)(i)).join(", "), r = t.production.idx === 0 ? "" : t.production.idx, n = `Ambiguous Alternatives Detected: <${t.ambiguityIndices.join(", ")}> in <${Lse(t.production)}${r}> inside <${t.topLevelRule.name}> Rule,
<${e}> may appears as a prefix path in all these alternatives.
`; return n = n + `See: https://chevrotain.io/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES
For Further details.`, n
    } function Lse(t) { if (t instanceof Lr.NonTerminal) return "SUBRULE"; if (t instanceof Lr.Option) return "OPTION"; if (t instanceof Lr.Alternation) return "OR"; if (t instanceof Lr.RepetitionMandatory) return "AT_LEAST_ONE"; if (t instanceof Lr.RepetitionMandatoryWithSeparator) return "AT_LEAST_ONE_SEP"; if (t instanceof Lr.RepetitionWithSeparator) return "MANY_SEP"; if (t instanceof Lr.Repetition) return "MANY"; if (t instanceof Lr.Terminal) return "CONSUME"; throw Error("non exhaustive match") } function Mse(t, e, r) { let n = (0, Cse.default)(e.configs.elements, o => o.state.transitions), i = (0, Ese.default)(n.filter(o => o instanceof wn.AtomTransition).map(o => o.tokenType), o => o.tokenTypeIdx); return { actualToken: r, possibleTokenTypes: i, tokenPath: t } } function $se(t, e) { return t.edges[e.tokenTypeIdx] } function Fse(t, e, r) { let n = new Eo.ATNConfigSet, i = []; for (let a of t.elements) { if (r.is(a.alt) === !1) continue; if (a.state.type === wn.ATN_RULE_STOP) { i.push(a); continue } let s = a.state.transitions.length; for (let u = 0; u < s; u++) { let c = a.state.transitions[u], l = jse(c, e); l !== void 0 && n.add({ state: l, alt: a.alt, stack: a.stack }) } } let o; if (i.length === 0 && n.size === 1 && (o = n), o === void 0) { o = new Eo.ATNConfigSet; for (let a of n.elements) qp(a, o) } if (i.length > 0 && !Wse(o)) for (let a of i) o.add(a); return o } function jse(t, e) { if (t instanceof wn.AtomTransition && (0, Lr.tokenMatcher)(e, t.tokenType)) return t.target } function Use(t, e) { let r; for (let n of t.elements) if (e.is(n.alt) === !0) { if (r === void 0) r = n.alt; else if (r !== n.alt) return } return r } function PM(t) { return { configs: t, edges: {}, isAcceptState: !1, prediction: -1 } } function AM(t, e, r, n) { return n = SM(t, n), e.edges[r.tokenTypeIdx] = n, n } function SM(t, e) { if (e === Eo.DFA_ERROR) return e; let r = e.configs.key, n = t.states[r]; return n !== void 0 ? n : (e.configs.finalize(), t.states[r] = e, e) } function Gse(t) { let e = new Eo.ATNConfigSet, r = t.transitions.length; for (let n = 0; n < r; n++) { let o = { state: t.transitions[n].target, alt: n, stack: [] }; qp(o, e) } return e } function qp(t, e) { let r = t.state; if (r.type === wn.ATN_RULE_STOP) { if (t.stack.length > 0) { let i = [...t.stack], a = { state: i.pop(), alt: t.alt, stack: i }; qp(a, e) } else e.add(t); return } r.epsilonOnlyTransitions || e.add(t); let n = r.transitions.length; for (let i = 0; i < n; i++) { let o = r.transitions[i], a = Hse(t, o); a !== void 0 && qp(a, e) } } function Hse(t, e) { if (e instanceof wn.EpsilonTransition) return { state: e.target, alt: t.alt, stack: t.stack }; if (e instanceof wn.RuleTransition) { let r = [...t.stack, e.followState]; return { state: e.target, alt: t.alt, stack: r } } } function Wse(t) { for (let e of t.elements) if (e.state.type === wn.ATN_RULE_STOP) return !0; return !1 } function Bse(t) { for (let e of t.elements) if (e.state.type !== wn.ATN_RULE_STOP) return !1; return !0 } function Kse(t) { if (Bse(t)) return !0; let e = zse(t.elements); return Vse(e) && !Yse(e) } function zse(t) { let e = new Map; for (let r of t) { let n = (0, Eo.getATNConfigKey)(r, !1), i = e.get(n); i === void 0 && (i = {}, e.set(n, i)), i[r.alt] = !0 } return e } function Vse(t) { for (let e of Array.from(t.values())) if (Object.keys(e).length > 1) return !0; return !1 } function Yse(t) { for (let e of Array.from(t.values())) if (Object.keys(e).length === 1) return !0; return !1 }
  }); var EM = f(Lp => { "use strict"; Object.defineProperty(Lp, "__esModule", { value: !0 }); Lp.LLStarLookaheadStrategy = void 0; var Xse = CM(); Object.defineProperty(Lp, "LLStarLookaheadStrategy", { enumerable: !0, get: function () { return Xse.LLStarLookaheadStrategy } }) }); var yT = f(en => { "use strict"; Object.defineProperty(en, "__esModule", { value: !0 }); en.RootCstNodeImpl = en.CompositeCstNodeImpl = en.LeafCstNodeImpl = en.AbstractCstNode = en.CstNodeBuilder = void 0; var NM = qa(), Jse = er(), kM = Le(), gT = class { constructor() { this.nodeStack = [] } get current() { return this.nodeStack[this.nodeStack.length - 1] } buildRootNode(e) { return this.rootNode = new Mp(e), this.nodeStack = [this.rootNode], this.rootNode } buildCompositeNode(e) { let r = new Jc; return r.feature = e, r.root = this.rootNode, this.current.children.push(r), this.nodeStack.push(r), r } buildLeafNode(e, r) { let n = new Xc(e.startOffset, e.image.length, (0, kM.tokenToRange)(e), e.tokenType, !1); return n.feature = r, n.root = this.rootNode, this.current.children.push(n), n } removeNode(e) { let r = e.parent; if (r) { let n = r.children.indexOf(e); n >= 0 && r.children.splice(n, 1) } } construct(e) { let r = this.current; typeof e.$type == "string" && (this.current.element = e), e.$cstNode = r; let n = this.nodeStack.pop(); n?.children.length === 0 && this.removeNode(n) } addHiddenTokens(e) { for (let r of e) { let n = new Xc(r.startOffset, r.image.length, (0, kM.tokenToRange)(r), r.tokenType, !0); n.root = this.rootNode, this.addHiddenToken(this.rootNode, n) } } addHiddenToken(e, r) { let { offset: n, end: i } = r; for (let o = 0; o < e.children.length; o++) { let a = e.children[o], { offset: s, end: u } = a; if ((0, Jse.isCompositeCstNode)(a) && n > s && i < u) { this.addHiddenToken(a, r); return } else if (i <= s) { e.children.splice(o, 0, r); return } } e.children.push(r) } }; en.CstNodeBuilder = gT; var Yc = class { get hidden() { return !1 } get element() { var e, r; let n = typeof ((e = this._element) === null || e === void 0 ? void 0 : e.$type) == "string" ? this._element : (r = this.parent) === null || r === void 0 ? void 0 : r.element; if (!n) throw new Error("This node has no associated AST element"); return n } set element(e) { this._element = e } get text() { return this.root.fullText.substring(this.offset, this.end) } }; en.AbstractCstNode = Yc; var Xc = class extends Yc { get offset() { return this._offset } get length() { return this._length } get end() { return this._offset + this._length } get hidden() { return this._hidden } get tokenType() { return this._tokenType } get range() { return this._range } constructor(e, r, n, i, o = !1) { super(), this._hidden = o, this._offset = e, this._tokenType = i, this._length = r, this._range = n } }; en.LeafCstNodeImpl = Xc; var Jc = class extends Yc { constructor() { super(...arguments), this.children = new Qc(this) } get offset() { var e, r; return (r = (e = this.firstNonHiddenNode) === null || e === void 0 ? void 0 : e.offset) !== null && r !== void 0 ? r : 0 } get length() { return this.end - this.offset } get end() { var e, r; return (r = (e = this.lastNonHiddenNode) === null || e === void 0 ? void 0 : e.end) !== null && r !== void 0 ? r : 0 } get range() { let e = this.firstNonHiddenNode, r = this.lastNonHiddenNode; if (e && r) { if (this._rangeCache === void 0) { let { range: n } = e, { range: i } = r; this._rangeCache = { start: n.start, end: i.end.line < n.start.line ? n.start : i.end } } return this._rangeCache } else return { start: NM.Position.create(0, 0), end: NM.Position.create(0, 0) } } get firstNonHiddenNode() { for (let e of this.children) if (!e.hidden) return e; return this.children[0] } get lastNonHiddenNode() { for (let e = this.children.length - 1; e >= 0; e--) { let r = this.children[e]; if (!r.hidden) return r } return this.children[this.children.length - 1] } }; en.CompositeCstNodeImpl = Jc; var Qc = class extends Array { constructor(e) { super(), this.parent = e, Object.setPrototypeOf(this, Qc.prototype) } push(...e) { return this.addParents(e), super.push(...e) } unshift(...e) { return this.addParents(e), super.unshift(...e) } splice(e, r, ...n) { return this.addParents(n), super.splice(e, r, ...n) } addParents(e) { for (let r of e) r.parent = this.parent } }, Mp = class extends Jc { get text() { return this._text.substring(this.offset, this.end) } get fullText() { return this._text } constructor(e) { super(), this._text = "", this._text = e ?? "" } }; en.RootCstNodeImpl = Mp }); var Up = f(mr => { "use strict"; Object.defineProperty(mr, "__esModule", { value: !0 }); mr.LangiumCompletionParser = mr.LangiumParserErrorMessageProvider = mr.LangiumParser = mr.AbstractLangiumParser = mr.DatatypeSymbol = void 0; var Fp = ga(), Qse = EM(), $p = Se(), wM = jt(), OM = be(), Zse = yT(); mr.DatatypeSymbol = Symbol("Datatype"); function vT(t) { return t.$type === mr.DatatypeSymbol } var DM = "\u200B", IM = t => t.endsWith(DM) ? t : t + DM, Zc = class { constructor(e) { this._unorderedGroups = new Map, this.lexer = e.parser.Lexer; let r = this.lexer.definition; this.wrapper = new RT(r, e.parser.ParserConfig) } alternatives(e, r) { this.wrapper.wrapOr(e, r) } optional(e, r) { this.wrapper.wrapOption(e, r) } many(e, r) { this.wrapper.wrapMany(e, r) } atLeastOne(e, r) { this.wrapper.wrapAtLeastOne(e, r) } isRecording() { return this.wrapper.IS_RECORDING } get unorderedGroups() { return this._unorderedGroups } getRuleStack() { return this.wrapper.RULE_STACK } finalize() { this.wrapper.wrapSelfAnalysis() } }; mr.AbstractLangiumParser = Zc; var _T = class extends Zc { get current() { return this.stack[this.stack.length - 1] } constructor(e) { super(e), this.nodeBuilder = new Zse.CstNodeBuilder, this.stack = [], this.assignmentMap = new Map, this.linker = e.references.Linker, this.converter = e.parser.ValueConverter, this.astReflection = e.shared.AstReflection } rule(e, r) { let n = e.fragment ? void 0 : (0, wM.isDataTypeRule)(e) ? mr.DatatypeSymbol : (0, wM.getTypeName)(e), i = this.wrapper.DEFINE_RULE(IM(e.name), this.startImplementation(n, r).bind(this)); return e.entry && (this.mainRule = i), i } parse(e) { this.nodeBuilder.buildRootNode(e); let r = this.lexer.tokenize(e); this.wrapper.input = r.tokens; let n = this.mainRule.call(this.wrapper, {}); return this.nodeBuilder.addHiddenTokens(r.hidden), this.unorderedGroups.clear(), { value: n, lexerErrors: r.errors, parserErrors: this.wrapper.errors } } startImplementation(e, r) { return n => { if (!this.isRecording()) { let o = { $type: e }; this.stack.push(o), e === mr.DatatypeSymbol && (o.value = "") } let i; try { i = r(n) } catch { i = void 0 } return !this.isRecording() && i === void 0 && (i = this.construct()), i } } consume(e, r, n) { let i = this.wrapper.wrapConsume(e, r); if (!this.isRecording() && !i.isInsertedInRecovery) { let o = this.nodeBuilder.buildLeafNode(i, n), { assignment: a, isCrossRef: s } = this.getAssignment(n), u = this.current; if (a) { let c = (0, $p.isKeyword)(n) ? i.image : this.converter.convert(i.image, o); this.assign(a.operator, a.feature, c, o, s) } else if (vT(u)) { let c = i.image; (0, $p.isKeyword)(n) || (c = this.converter.convert(c, o).toString()), u.value += c } } } subrule(e, r, n, i) { let o; this.isRecording() || (o = this.nodeBuilder.buildCompositeNode(n)); let a = this.wrapper.wrapSubrule(e, r, i); !this.isRecording() && o && o.length > 0 && this.performSubruleAssignment(a, n, o) } performSubruleAssignment(e, r, n) { let { assignment: i, isCrossRef: o } = this.getAssignment(r); if (i) this.assign(i.operator, i.feature, e, n, o); else if (!i) { let a = this.current; if (vT(a)) a.value += e.toString(); else { let s = e.$type, u = this.assignWithoutOverride(e, a); s && (u.$type = s); let c = u; this.stack.pop(), this.stack.push(c) } } } action(e, r) { if (!this.isRecording()) { let n = this.current; if (!n.$cstNode && r.feature && r.operator) { n = this.construct(!1); let o = n.$cstNode.feature; this.nodeBuilder.buildCompositeNode(o) } let i = { $type: e }; this.stack.pop(), this.stack.push(i), r.feature && r.operator && this.assign(r.operator, r.feature, n, n.$cstNode, !1) } } construct(e = !0) { if (this.isRecording()) return; let r = this.current; return (0, OM.linkContentToContainer)(r), this.nodeBuilder.construct(r), e && this.stack.pop(), vT(r) ? this.converter.convert(r.value, r.$cstNode) : (this.assignMandatoryProperties(r), r) } assignMandatoryProperties(e) { let r = this.astReflection.getTypeMetaData(e.$type); for (let n of r.mandatory) { let i = e[n.name]; n.type === "array" && !Array.isArray(i) ? e[n.name] = [] : n.type === "boolean" && i === void 0 && (e[n.name] = !1) } } getAssignment(e) { if (!this.assignmentMap.has(e)) { let r = (0, OM.getContainerOfType)(e, $p.isAssignment); this.assignmentMap.set(e, { assignment: r, isCrossRef: r ? (0, $p.isCrossReference)(r.terminal) : !1 }) } return this.assignmentMap.get(e) } assign(e, r, n, i, o) { let a = this.current, s; switch (o && typeof n == "string" ? s = this.linker.buildReference(a, r, i, n) : s = n, e) { case "=": { a[r] = s; break } case "?=": { a[r] = !0; break } case "+=": Array.isArray(a[r]) || (a[r] = []), a[r].push(s) } } assignWithoutOverride(e, r) { for (let [n, i] of Object.entries(r)) { let o = e[n]; o === void 0 ? e[n] = i : Array.isArray(o) && Array.isArray(i) && (i.push(...o), e[n] = i) } return e } get definitionErrors() { return this.wrapper.definitionErrors } }; mr.LangiumParser = _T; var jp = class { buildMismatchTokenMessage({ expected: e, actual: r }) { return `Expecting ${e.LABEL ? "`" + e.LABEL + "`" : e.name.endsWith(":KW") ? `keyword '${e.name.substring(0, e.name.length - 3)}'` : `token of type '${e.name}'`} but found \`${r.image}\`.` } buildNotAllInputParsedMessage({ firstRedundant: e }) { return `Expecting end of file but found \`${e.image}\`.` } buildNoViableAltMessage(e) { return Fp.defaultParserErrorProvider.buildNoViableAltMessage(e) } buildEarlyExitMessage(e) { return Fp.defaultParserErrorProvider.buildEarlyExitMessage(e) } }; mr.LangiumParserErrorMessageProvider = jp; var TT = class extends Zc { constructor() { super(...arguments), this.tokens = [], this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0 } action() { } construct() { } parse(e) { this.resetState(); let r = this.lexer.tokenize(e); return this.tokens = r.tokens, this.wrapper.input = [...this.tokens], this.mainRule.call(this.wrapper, {}), this.unorderedGroups.clear(), { tokens: this.tokens, elementStack: [...this.lastElementStack], tokenIndex: this.nextTokenIndex } } rule(e, r) { let n = this.wrapper.DEFINE_RULE(IM(e.name), this.startImplementation(r).bind(this)); return e.entry && (this.mainRule = n), n } resetState() { this.elementStack = [], this.lastElementStack = [], this.nextTokenIndex = 0, this.stackSize = 0 } startImplementation(e) { return r => { let n = this.keepStackSize(); try { e(r) } finally { this.resetStackSize(n) } } } removeUnexpectedElements() { this.elementStack.splice(this.stackSize) } keepStackSize() { let e = this.elementStack.length; return this.stackSize = e, e } resetStackSize(e) { this.removeUnexpectedElements(), this.stackSize = e } consume(e, r, n) { this.wrapper.wrapConsume(e, r), this.isRecording() || (this.lastElementStack = [...this.elementStack, n], this.nextTokenIndex = this.currIdx + 1) } subrule(e, r, n, i) { this.before(n), this.wrapper.wrapSubrule(e, r, i), this.after(n) } before(e) { this.isRecording() || this.elementStack.push(e) } after(e) { if (!this.isRecording()) { let r = this.elementStack.lastIndexOf(e); r >= 0 && this.elementStack.splice(r) } } get currIdx() { return this.wrapper.currIdx } }; mr.LangiumCompletionParser = TT; var eue = { recoveryEnabled: !0, nodeLocationTracking: "full", skipValidations: !0, errorMessageProvider: new jp }, RT = class extends Fp.EmbeddedActionsParser { constructor(e, r) { let n = r && "maxLookahead" in r; super(e, Object.assign(Object.assign(Object.assign({}, eue), { lookaheadStrategy: n ? new Fp.LLkLookaheadStrategy({ maxLookahead: r.maxLookahead }) : new Qse.LLStarLookaheadStrategy }), r)) } get IS_RECORDING() { return this.RECORDING_PHASE } DEFINE_RULE(e, r) { return this.RULE(e, r) } wrapSelfAnalysis() { this.performSelfAnalysis() } wrapConsume(e, r) { return this.consume(e, r) } wrapSubrule(e, r, n) { return this.subrule(e, r, { ARGS: [n] }) } wrapOr(e, r) { this.or(e, r) } wrapOption(e, r) { this.option(e, r) } wrapMany(e, r) { this.many(e, r) } wrapAtLeastOne(e, r) { this.atLeastOne(e, r) } } }); var AT = f(du => { "use strict"; Object.defineProperty(du, "__esModule", { value: !0 }); du.assertUnreachable = du.ErrorWithLocation = void 0; var bT = class extends Error { constructor(e, r) { super(e ? `${r} at ${e.range.start.line}:${e.range.start.character}` : r) } }; du.ErrorWithLocation = bT; function tue(t) { throw new Error("Error! The input value was not handled.") } du.assertUnreachable = tue }); var ST = f(Hp => { "use strict"; Object.defineProperty(Hp, "__esModule", { value: !0 }); Hp.createParser = void 0; var xM = ga(), He = Se(), el = AT(), rue = Ft(), qM = jt(), LM = vt(); function nue(t, e, r) { return iue({ parser: e, tokens: r, rules: new Map, ruleNames: new Map }, t), e } Hp.createParser = nue; function iue(t, e) { let r = (0, LM.getAllReachableRules)(e, !1), n = (0, rue.stream)(e.rules).filter(He.isParserRule).filter(i => r.has(i)); for (let i of n) { let o = Object.assign(Object.assign({}, t), { consume: 1, optional: 1, subrule: 1, many: 1, or: 1 }); o.rules.set(i.name, t.parser.rule(i, va(o, i.definition))) } } function va(t, e, r = !1) { let n; if ((0, He.isKeyword)(e)) n = due(t, e); else if ((0, He.isAction)(e)) n = oue(t, e); else if ((0, He.isAssignment)(e)) n = va(t, e.terminal); else if ((0, He.isCrossReference)(e)) n = MM(t, e); else if ((0, He.isRuleCall)(e)) n = aue(t, e); else if ((0, He.isAlternatives)(e)) n = uue(t, e); else if ((0, He.isUnorderedGroup)(e)) n = cue(t, e); else if ((0, He.isGroup)(e)) n = lue(t, e); else throw new el.ErrorWithLocation(e.$cstNode, `Unexpected element type: ${e.$type}`); return $M(t, r ? void 0 : Gp(e), n, e.cardinality) } function oue(t, e) { let r = (0, qM.getTypeName)(e); return () => t.parser.action(r, e) } function aue(t, e) { let r = e.rule.ref; if ((0, He.isParserRule)(r)) { let n = t.subrule++, i = e.arguments.length > 0 ? sue(r, e.arguments) : () => ({}); return o => t.parser.subrule(n, FM(t, r), e, i(o)) } else if ((0, He.isTerminalRule)(r)) { let n = t.consume++, i = PT(t, r.name); return () => t.parser.consume(n, i, e) } else if (r) (0, el.assertUnreachable)(r); else throw new el.ErrorWithLocation(e.$cstNode, `Undefined rule type: ${e.$type}`) } function sue(t, e) { let r = e.map(n => Hi(n.value)); return n => { let i = {}; for (let o = 0; o < r.length; o++) { let a = t.parameters[o], s = r[o]; i[a.name] = s(n) } return i } } function Hi(t) { if ((0, He.isDisjunction)(t)) { let e = Hi(t.left), r = Hi(t.right); return n => e(n) || r(n) } else if ((0, He.isConjunction)(t)) { let e = Hi(t.left), r = Hi(t.right); return n => e(n) && r(n) } else if ((0, He.isNegation)(t)) { let e = Hi(t.value); return r => !e(r) } else if ((0, He.isParameterReference)(t)) { let e = t.parameter.ref.name; return r => r !== void 0 && r[e] === !0 } else if ((0, He.isLiteralCondition)(t)) { let e = Boolean(t.true); return () => e } (0, el.assertUnreachable)(t) } function uue(t, e) { if (e.elements.length === 1) return va(t, e.elements[0]); { let r = []; for (let i of e.elements) { let o = { ALT: va(t, i, !0) }, a = Gp(i); a && (o.GATE = Hi(a)), r.push(o) } let n = t.or++; return i => t.parser.alternatives(n, r.map(o => { let a = { ALT: () => o.ALT(i) }, s = o.GATE; return s && (a.GATE = () => s(i)), a })) } } function cue(t, e) { if (e.elements.length === 1) return va(t, e.elements[0]); let r = []; for (let s of e.elements) { let u = { ALT: va(t, s, !0) }, c = Gp(s); c && (u.GATE = Hi(c)), r.push(u) } let n = t.or++, i = (s, u) => { let c = u.getRuleStack().join("-"); return `uGroup_${s}_${c}` }, o = s => t.parser.alternatives(n, r.map((u, c) => { let l = { ALT: () => !0 }, d = t.parser; l.ALT = () => { if (u.ALT(s), !d.isRecording()) { let y = i(n, d); d.unorderedGroups.get(y) || d.unorderedGroups.set(y, []); let m = d.unorderedGroups.get(y); typeof m?.[c] > "u" && (m[c] = !0) } }; let h = u.GATE; return h ? l.GATE = () => h(s) : l.GATE = () => { let y = d.unorderedGroups.get(i(n, d)); return !y?.[c] }, l })), a = $M(t, Gp(e), o, "*"); return s => { a(s), t.parser.isRecording() || t.parser.unorderedGroups.delete(i(n, t.parser)) } } function lue(t, e) { let r = e.elements.map(n => va(t, n)); return n => r.forEach(i => i(n)) } function Gp(t) { if ((0, He.isGroup)(t)) return t.guardCondition } function MM(t, e, r = e.terminal) { if (r) if ((0, He.isRuleCall)(r) && (0, He.isParserRule)(r.rule.ref)) { let n = t.subrule++; return i => t.parser.subrule(n, FM(t, r.rule.ref), e, i) } else if ((0, He.isRuleCall)(r) && (0, He.isTerminalRule)(r.rule.ref)) { let n = t.consume++, i = PT(t, r.rule.ref.name); return () => t.parser.consume(n, i, e) } else if ((0, He.isKeyword)(r)) { let n = t.consume++, i = PT(t, r.value); return () => t.parser.consume(n, i, e) } else throw new Error("Could not build cross reference parser"); else { if (!e.type.ref) throw new Error("Could not resolve reference to type: " + e.type.$refText); let n = (0, LM.findNameAssignment)(e.type.ref), i = n?.terminal; if (!i) throw new Error("Could not find name assignment for type: " + (0, qM.getTypeName)(e.type.ref)); return MM(t, e, i) } } function due(t, e) { let r = t.consume++, n = t.tokens[e.value]; if (!n) throw new Error("Could not find token for keyword: " + e.value); return () => t.parser.consume(r, n, e) } function $M(t, e, r, n) { let i = e && Hi(e); if (!n) if (i) { let o = t.or++; return a => t.parser.alternatives(o, [{ ALT: () => r(a), GATE: () => i(a) }, { ALT: (0, xM.EMPTY_ALT)(), GATE: () => !i(a) }]) } else return r; if (n === "*") { let o = t.many++; return a => t.parser.many(o, { DEF: () => r(a), GATE: i ? () => i(a) : void 0 }) } else if (n === "+") { let o = t.many++; if (i) { let a = t.or++; return s => t.parser.alternatives(a, [{ ALT: () => t.parser.atLeastOne(o, { DEF: () => r(s) }), GATE: () => i(s) }, { ALT: (0, xM.EMPTY_ALT)(), GATE: () => !i(s) }]) } else return a => t.parser.atLeastOne(o, { DEF: () => r(a) }) } else if (n === "?") { let o = t.optional++; return a => t.parser.optional(o, { DEF: () => r(a), GATE: i ? () => i(a) : void 0 }) } else (0, el.assertUnreachable)(n) } function FM(t, e) { let r = fue(t, e), n = t.rules.get(r); if (!n) throw new Error(`Rule "${r}" not found."`); return n } function fue(t, e) { if ((0, He.isParserRule)(e)) return e.name; if (t.ruleNames.has(e)) return t.ruleNames.get(e); { let r = e, n = r.$container, i = e.$type; for (; !(0, He.isParserRule)(n);)((0, He.isGroup)(n) || (0, He.isAlternatives)(n) || (0, He.isUnorderedGroup)(n)) && (i = n.elements.indexOf(r).toString() + ":" + i), r = n, n = n.$container; return i = n.name + ":" + i, t.ruleNames.set(e, i), i } } function PT(t, e) { let r = t.tokens[e]; if (!r) throw new Error(`Token "${e}" not found."`); return r } }); var CT = f(Wp => { "use strict"; Object.defineProperty(Wp, "__esModule", { value: !0 }); Wp.createCompletionParser = void 0; var pue = Up(), hue = ST(); function mue(t) { let e = t.Grammar, r = t.parser.Lexer, n = new pue.LangiumCompletionParser(t); return (0, hue.createParser)(e, n, r.definition), n.finalize(), n } Wp.createCompletionParser = mue }); var ET = f(fu => { "use strict"; Object.defineProperty(fu, "__esModule", { value: !0 }); fu.prepareLangiumParser = fu.createLangiumParser = void 0; var gue = Up(), yue = ST(); function vue(t) { let e = jM(t); return e.finalize(), e } fu.createLangiumParser = vue; function jM(t) { let e = t.Grammar, r = t.parser.Lexer, n = new gue.LangiumParser(t); return (0, yue.createParser)(e, n, r.definition) } fu.prepareLangiumParser = jM }); var wT = f(Kp => { "use strict"; Object.defineProperty(Kp, "__esModule", { value: !0 }); Kp.DefaultTokenBuilder = void 0; var _ue = ga(), NT = Se(), Tue = jt(), Rue = be(), bue = vt(), Bp = Vo(), Aue = Ft(), kT = class { buildTokens(e, r) { let n = (0, Aue.stream)((0, bue.getAllReachableRules)(e, !1)), i = this.buildTerminalTokens(n), o = this.buildKeywordTokens(n, i, r); return i.forEach(a => { let s = a.PATTERN; typeof s == "object" && s && "test" in s && (0, Bp.isWhitespaceRegExp)(s) ? o.unshift(a) : o.push(a) }), o } buildTerminalTokens(e) { return e.filter(NT.isTerminalRule).filter(r => !r.fragment).map(r => this.buildTerminalToken(r)).toArray() } buildTerminalToken(e) { let r = (0, Tue.terminalRegex)(e), n = { name: e.name, PATTERN: new RegExp(r) }; return e.hidden && (n.GROUP = (0, Bp.isWhitespaceRegExp)(r) ? _ue.Lexer.SKIPPED : "hidden"), n } buildKeywordTokens(e, r, n) { return e.filter(NT.isParserRule).flatMap(i => (0, Rue.streamAllContents)(i).filter(NT.isKeyword)).distinct(i => i.value).toArray().sort((i, o) => o.value.length - i.value.length).map(i => this.buildKeywordToken(i, r, Boolean(n?.caseInsensitive))) } buildKeywordToken(e, r, n) { return { name: e.value, PATTERN: this.buildKeywordPattern(e, n), LONGER_ALT: this.findLongerAlt(e, r) } } buildKeywordPattern(e, r) { return r ? new RegExp((0, Bp.getCaseInsensitivePattern)(e.value)) : e.value } findLongerAlt(e, r) { return r.reduce((n, i) => { let o = i?.PATTERN; return o?.source && (0, Bp.partialMatches)("^" + o.source + "$", e.value) && n.push(i), n }, []) } }; Kp.DefaultTokenBuilder = kT }); var DT = f(Ot => {
    "use strict"; Object.defineProperty(Ot, "__esModule", { value: !0 }); Ot.convertBoolean = Ot.convertNumber = Ot.convertDate = Ot.convertBigint = Ot.convertInt = Ot.convertID = Ot.convertRegexLiteral = Ot.convertString = Ot.DefaultValueConverter = void 0; var UM = Se(), Pue = jt(), Sue = vt(), OT = class { convert(e, r) { let n = r.feature; if ((0, UM.isCrossReference)(n) && (n = (0, Sue.getCrossReferenceTerminal)(n)), (0, UM.isRuleCall)(n)) { let i = n.rule.ref; if (!i) throw new Error("This cst node was not parsed by a rule."); return this.runConverter(i, e, r) } return e } runConverter(e, r, n) { var i; switch (e.name.toUpperCase()) { case "INT": return BM(r); case "STRING": return GM(r); case "ID": return WM(r); case "REGEXLITERAL": return HM(r) }switch ((i = (0, Pue.getRuleType)(e)) === null || i === void 0 ? void 0 : i.toLowerCase()) { case "number": return VM(r); case "boolean": return YM(r); case "bigint": return KM(r); case "date": return zM(r); default: return r } } }; Ot.DefaultValueConverter = OT; function GM(t) { let e = ""; for (let r = 1; r < t.length - 1; r++) { let n = t.charAt(r); if (n === "\\") { let i = t.charAt(++r); e += Cue(i) } else e += n } return e } Ot.convertString = GM; function Cue(t) {
      switch (t) {
        case "b": return "\b"; case "f": return "\f"; case "n": return `
`; case "r": return "\r"; case "t": return "	"; case "v": return "\v"; case "0": return "\0"; default: return t
      }
    } function HM(t) { return t.substring(1, t.length - 1) } Ot.convertRegexLiteral = HM; function WM(t) { return t.charAt(0) === "^" ? t.substring(1) : t } Ot.convertID = WM; function BM(t) { return parseInt(t) } Ot.convertInt = BM; function KM(t) { return BigInt(t) } Ot.convertBigint = KM; function zM(t) { return new Date(t) } Ot.convertDate = zM; function VM(t) { return Number(t) } Ot.convertNumber = VM; function YM(t) { return t.toLowerCase() === "true" } Ot.convertBoolean = YM
  }); var qT = f(Vp => { "use strict"; Object.defineProperty(Vp, "__esModule", { value: !0 }); Vp.DefaultLinker = void 0; var Eue = Oe(), pu = er(), zp = be(), Nue = _r(), IT = fo(), xT = class { constructor(e) { this.reflection = e.shared.AstReflection, this.langiumDocuments = () => e.shared.workspace.LangiumDocuments, this.scopeProvider = e.references.ScopeProvider, this.astNodeLocator = e.workspace.AstNodeLocator } async link(e, r = Eue.CancellationToken.None) { for (let n of (0, zp.streamAst)(e.parseResult.value)) await (0, Nue.interruptAndCheck)(r), (0, zp.streamReferences)(n).forEach(i => this.doLink(i, e)); e.state = IT.DocumentState.Linked } doLink(e, r) { let n = e.reference; if (n._ref === void 0) try { let i = this.getCandidate(e); if ((0, pu.isLinkingError)(i)) n._ref = i; else if (n._nodeDescription = i, this.langiumDocuments().hasDocument(i.documentUri)) { let o = this.loadAstNode(i); n._ref = o ?? this.createLinkingError(e, i) } } catch (i) { n._ref = Object.assign(Object.assign({}, e), { message: `An error occurred while resolving reference to '${n.$refText}': ${i}` }) } r.references.push(n) } unlink(e) { for (let r of e.references) delete r._ref, delete r._nodeDescription; e.references = [] } getCandidate(e) { let n = this.scopeProvider.getScope(e).getElement(e.reference.$refText); return n ?? this.createLinkingError(e) } buildReference(e, r, n, i) { let o = this, a = { $refNode: n, $refText: i, get ref() { var s; if ((0, pu.isAstNode)(this._ref)) return this._ref; if ((0, pu.isAstNodeDescription)(this._nodeDescription)) { let u = o.loadAstNode(this._nodeDescription); this._ref = u ?? o.createLinkingError({ reference: a, container: e, property: r }, this._nodeDescription) } else if (this._ref === void 0) { let u = o.getLinkedNode({ reference: a, container: e, property: r }); if (u.error && (0, zp.getDocument)(e).state < IT.DocumentState.ComputedScopes) return; this._ref = (s = u.node) !== null && s !== void 0 ? s : u.error, this._nodeDescription = u.descr } return (0, pu.isAstNode)(this._ref) ? this._ref : void 0 }, get $nodeDescription() { return this._nodeDescription }, get error() { return (0, pu.isLinkingError)(this._ref) ? this._ref : void 0 } }; return a } getLinkedNode(e) { try { let r = this.getCandidate(e); if ((0, pu.isLinkingError)(r)) return { error: r }; let n = this.loadAstNode(r); return n ? { node: n, descr: r } : { descr: r, error: this.createLinkingError(e, r) } } catch (r) { return { error: Object.assign(Object.assign({}, e), { message: `An error occurred while resolving reference to '${e.reference.$refText}': ${r}` }) } } } loadAstNode(e) { if (e.node) return e.node; let r = this.langiumDocuments().getOrCreateDocument(e.documentUri); return this.astNodeLocator.getAstNode(r.parseResult.value, e.path) } createLinkingError(e, r) { let n = (0, zp.getDocument)(e.container); n.state < IT.DocumentState.ComputedScopes && console.warn(`Attempted reference resolution before document reached ComputedScopes state (${n.uri}).`); let i = this.reflection.getReferenceType(e); return Object.assign(Object.assign({}, e), { message: `Could not resolve reference to ${i} named '${e.reference.$refText}'.`, targetDescription: r }) } }; Vp.DefaultLinker = xT }); var MT = f(Yp => { "use strict"; Object.defineProperty(Yp, "__esModule", { value: !0 }); Yp.DefaultJsonSerializer = void 0; var tl = er(), kue = be(), wue = vt(); function XM(t) { return typeof t == "object" && !!t && ("$ref" in t || "$error" in t) } var LT = class { constructor(e) { this.ignoreProperties = new Set(["$container", "$containerProperty", "$containerIndex", "$document", "$cstNode"]), this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider } serialize(e, r) { let n = r?.replacer, i = (a, s) => this.replacer(a, s, r); return JSON.stringify(e, n ? (a, s) => n(a, s, i) : i, r?.space) } deserialize(e) { let r = JSON.parse(e); return this.linkNode(r, r), r } replacer(e, r, { refText: n, sourceText: i, textRegions: o } = {}) { var a, s, u; if (!this.ignoreProperties.has(e)) if ((0, tl.isReference)(r)) { let c = r.ref, l = n ? r.$refText : void 0; return c ? { $refText: l, $ref: "#" + (c && this.astNodeLocator.getAstNodePath(c)) } : { $refText: l, $error: (s = (a = r.error) === null || a === void 0 ? void 0 : a.message) !== null && s !== void 0 ? s : "Could not resolve reference" } } else { let c; if (o && (0, tl.isAstNode)(r) && (c = this.addAstNodeRegionWithAssignmentsTo(Object.assign({}, r)), (!e || r.$document) && c?.$textRegion)) try { c.$textRegion.documentURI = (0, kue.getDocument)(r).uri.toString() } catch { } return i && !e && (0, tl.isAstNode)(r) && (c ?? (c = Object.assign({}, r)), c.$sourceText = (u = r.$cstNode) === null || u === void 0 ? void 0 : u.text), c ?? r } } addAstNodeRegionWithAssignmentsTo(e) { let r = n => ({ offset: n.offset, end: n.end, length: n.length, range: n.range }); if (e.$cstNode) { let n = e.$textRegion = r(e.$cstNode), i = n.assignments = {}; return Object.keys(e).filter(o => !o.startsWith("$")).forEach(o => { let a = (0, wue.findNodesForProperty)(e.$cstNode, o).map(r); a.length !== 0 && (i[o] = a) }), e } } linkNode(e, r, n, i, o) { for (let [s, u] of Object.entries(e)) if (Array.isArray(u)) for (let c = 0; c < u.length; c++) { let l = u[c]; XM(l) ? u[c] = this.reviveReference(e, s, r, l) : (0, tl.isAstNode)(l) && this.linkNode(l, r, e, s, c) } else XM(u) ? e[s] = this.reviveReference(e, s, r, u) : (0, tl.isAstNode)(u) && this.linkNode(u, r, e, s); let a = e; a.$container = n, a.$containerProperty = i, a.$containerIndex = o } reviveReference(e, r, n, i) { let o = i.$refText; if (i.$ref) { let a = this.getRefNode(n, i.$ref); return o || (o = this.nameProvider.getName(a)), { $refText: o ?? "", ref: a } } else if (i.$error) { let a = { $refText: o ?? "" }; return a.error = { container: e, property: r, message: i.$error, reference: a }, a } else return } getRefNode(e, r) { return this.astNodeLocator.getAstNode(e, r.substring(1)) } }; Yp.DefaultJsonSerializer = LT }); var FT = f(Xp => { "use strict"; Object.defineProperty(Xp, "__esModule", { value: !0 }); Xp.DefaultServiceRegistry = void 0; var Oue = gn(), $T = class { register(e) { if (!this.singleton && !this.map) { this.singleton = e; return } if (!this.map && (this.map = {}, this.singleton)) { for (let r of this.singleton.LanguageMetaData.fileExtensions) this.map[r] = this.singleton; this.singleton = void 0 } for (let r of e.LanguageMetaData.fileExtensions) this.map[r] !== void 0 && this.map[r] !== e && console.warn(`The file extension ${r} is used by multiple languages. It is now assigned to '${e.LanguageMetaData.languageId}'.`), this.map[r] = e } getServices(e) { if (this.singleton !== void 0) return this.singleton; if (this.map === void 0) throw new Error("The service registry is empty. Use `register` to register the services of a language."); let r = Oue.Utils.extname(e), n = this.map[r]; if (!n) throw new Error(`The service registry contains no services for the extension '${r}'.`); return n } get all() { return this.singleton !== void 0 ? [this.singleton] : this.map !== void 0 ? Object.values(this.map) : [] } }; Xp.DefaultServiceRegistry = $T }); var UT = f(Jp => { "use strict"; Object.defineProperty(Jp, "__esModule", { value: !0 }); Jp.ValidationRegistry = void 0; var Due = yn(), Iue = _r(), jT = class { constructor(e) { this.validationChecks = new Due.MultiMap, this.reflection = e.shared.AstReflection } register(e, r = this) { for (let [n, i] of Object.entries(e)) { let o = i; if (Array.isArray(o)) for (let a of o) this.doRegister(n, this.wrapValidationException(a, r)); else typeof o == "function" && this.doRegister(n, this.wrapValidationException(o, r)) } } wrapValidationException(e, r) { return async (n, i, o) => { try { await e.call(r, n, i, o) } catch (a) { if ((0, Iue.isOperationCancelled)(a)) throw a; console.error("An error occurred during validation:", a); let s = a instanceof Error ? a.message : String(a); a instanceof Error && a.stack && console.error(a.stack), i("error", "An error occurred during validation: " + s, { node: n }) } } } doRegister(e, r) { if (e === "AstNode") { this.validationChecks.add("AstNode", r); return } for (let n of this.reflection.getAllSubTypes(e)) this.validationChecks.add(n, r) } getChecks(e) { return this.validationChecks.get(e).concat(this.validationChecks.get("AstNode")) } }; Jp.ValidationRegistry = jT }); var BT = f(hu => { "use strict"; Object.defineProperty(hu, "__esModule", { value: !0 }); hu.DefaultReferenceDescriptionProvider = hu.DefaultAstNodeDescriptionProvider = void 0; var xue = Oe(), que = er(), Qp = be(), GT = Le(), Lue = _r(), Mue = Ci(), HT = class { constructor(e) { this.astNodeLocator = e.workspace.AstNodeLocator, this.nameProvider = e.references.NameProvider } createDescription(e, r, n = (0, Qp.getDocument)(e)) { var i; r ?? (r = this.nameProvider.getName(e)); let o = this.astNodeLocator.getAstNodePath(e); if (!r) throw new Error(`Node at path ${o} has no name.`); let a = (i = this.nameProvider.getNameNode(e)) !== null && i !== void 0 ? i : e.$cstNode; return { node: e, name: r, nameSegment: (0, GT.toDocumentSegment)(a), selectionSegment: (0, GT.toDocumentSegment)(e.$cstNode), type: e.$type, documentUri: n.uri, path: o } } }; hu.DefaultAstNodeDescriptionProvider = HT; var WT = class { constructor(e) { this.nodeLocator = e.workspace.AstNodeLocator } async createDescriptions(e, r = xue.CancellationToken.None) { let n = [], i = e.parseResult.value; for (let o of (0, Qp.streamAst)(i)) await (0, Lue.interruptAndCheck)(r), (0, Qp.streamReferences)(o).filter(a => !(0, que.isLinkingError)(a)).forEach(a => { let s = this.createDescription(a); s && n.push(s) }); return n } createDescription(e) { let r = e.reference.$nodeDescription, n = e.reference.$refNode; if (!r || !n) return; let i = (0, Qp.getDocument)(e.container).uri; return { sourceUri: i, sourcePath: this.nodeLocator.getAstNodePath(e.container), targetUri: r.documentUri, targetPath: r.path, segment: (0, GT.toDocumentSegment)(n), local: (0, Mue.equalURI)(r.documentUri, i) } } }; hu.DefaultReferenceDescriptionProvider = WT }); var zT = f(Zp => { "use strict"; Object.defineProperty(Zp, "__esModule", { value: !0 }); Zp.DefaultAstNodeLocator = void 0; var KT = class { constructor() { this.segmentSeparator = "/", this.indexSeparator = "@" } getAstNodePath(e) { if (e.$container) { let r = this.getAstNodePath(e.$container), n = this.getPathSegment(e); return r + this.segmentSeparator + n } return "" } getPathSegment({ $containerProperty: e, $containerIndex: r }) { if (!e) throw new Error("Missing '$containerProperty' in AST node."); return r !== void 0 ? e + this.indexSeparator + r : e } getAstNode(e, r) { return r.split(this.segmentSeparator).reduce((i, o) => { if (!i || o.length === 0) return i; let a = o.indexOf(this.indexSeparator); if (a > 0) { let s = o.substring(0, a), u = parseInt(o.substring(a + 1)), c = i[s]; return c?.[u] } return i[o] }, e) } }; Zp.DefaultAstNodeLocator = KT }); var YT = f(eh => { "use strict"; Object.defineProperty(eh, "__esModule", { value: !0 }); eh.DefaultConfigurationProvider = void 0; var $ue = At(), VT = class { constructor(e) { this.settings = {}, this.workspaceConfig = !1, this.initialized = !1, this.serviceRegistry = e.ServiceRegistry, this.connection = e.lsp.Connection, e.lsp.LanguageServer.onInitialize(r => { var n, i; this.workspaceConfig = (i = (n = r.capabilities.workspace) === null || n === void 0 ? void 0 : n.configuration) !== null && i !== void 0 ? i : !1 }), e.lsp.LanguageServer.onInitialized(r => { var n; let i = this.serviceRegistry.all; (n = e.lsp.Connection) === null || n === void 0 || n.client.register($ue.DidChangeConfigurationNotification.type, { section: i.map(o => this.toSectionName(o.LanguageMetaData.languageId)) }) }) } async initialize() { if (this.workspaceConfig && this.connection) { let r = this.serviceRegistry.all.map(i => ({ section: this.toSectionName(i.LanguageMetaData.languageId) })), n = await this.connection.workspace.getConfiguration(r); r.forEach((i, o) => { this.updateSectionConfiguration(i.section, n[o]) }) } this.initialized = !0 } updateConfiguration(e) { e.settings && Object.keys(e.settings).forEach(r => { this.updateSectionConfiguration(r, e.settings[r]) }) } updateSectionConfiguration(e, r) { this.settings[e] = r } async getConfiguration(e, r) { this.initialized || await this.initialize(); let n = this.toSectionName(e); if (this.settings[n]) return this.settings[n][r] } toSectionName(e) { return `${e}` } }; eh.DefaultConfigurationProvider = VT }); var QT = f(rh => { "use strict"; Object.defineProperty(rh, "__esModule", { value: !0 }); rh.DefaultDocumentBuilder = void 0; var th = Oe(), Fue = yn(), XT = _r(), li = fo(), JT = class { constructor(e) { this.updateListeners = [], this.buildPhaseListeners = new Fue.MultiMap, this.langiumDocuments = e.workspace.LangiumDocuments, this.langiumDocumentFactory = e.workspace.LangiumDocumentFactory, this.indexManager = e.workspace.IndexManager, this.serviceRegistry = e.ServiceRegistry } async build(e, r = {}, n = th.CancellationToken.None) { await this.buildDocuments(e, r, n) } async update(e, r, n = th.CancellationToken.None) { for (let s of r) this.langiumDocuments.deleteDocument(s); this.indexManager.remove(r); for (let s of e) this.langiumDocuments.invalidateDocument(s); for (let s of this.updateListeners) s(e, r); await (0, XT.interruptAndCheck)(n); let i = e.map(s => this.langiumDocuments.getOrCreateDocument(s)), o = this.collectDocuments(i, r), a = { validationChecks: "all" }; await this.buildDocuments(o, a, n) } onUpdate(e) { return this.updateListeners.push(e), th.Disposable.create(() => { let r = this.updateListeners.indexOf(e); r >= 0 && this.updateListeners.splice(r, 1) }) } collectDocuments(e, r) { let n = e.map(a => a.uri).concat(r), i = this.indexManager.getAffectedDocuments(n).toArray(); i.forEach(a => { this.serviceRegistry.getServices(a.uri).references.Linker.unlink(a), a.state = Math.min(a.state, li.DocumentState.ComputedScopes) }); let o = new Set([...e, ...i, ...this.langiumDocuments.all.filter(a => a.state < li.DocumentState.Validated)]); return Array.from(o) } async buildDocuments(e, r, n) { await this.runCancelable(e, li.DocumentState.Parsed, n, o => this.langiumDocumentFactory.update(o)), await this.runCancelable(e, li.DocumentState.IndexedContent, n, o => this.indexManager.updateContent(o, n)), await this.runCancelable(e, li.DocumentState.ComputedScopes, n, o => this.computeScopes(o, n)), await this.runCancelable(e, li.DocumentState.Linked, n, o => this.serviceRegistry.getServices(o.uri).references.Linker.link(o, n)), await this.runCancelable(e, li.DocumentState.IndexedReferences, n, o => this.indexManager.updateReferences(o, n)); let i = e.filter(o => this.shouldValidate(o, r)); await this.runCancelable(i, li.DocumentState.Validated, n, o => this.validate(o, n)) } async runCancelable(e, r, n, i) { let o = e.filter(a => a.state < r); for (let a of o) await (0, XT.interruptAndCheck)(n), await i(a); await this.notifyBuildPhase(o, r, n) } onBuildPhase(e, r) { return this.buildPhaseListeners.add(e, r), th.Disposable.create(() => { this.buildPhaseListeners.delete(e, r) }) } async notifyBuildPhase(e, r, n) { if (e.length === 0) return; let i = this.buildPhaseListeners.get(r); for (let o of i) await (0, XT.interruptAndCheck)(n), await o(e, n) } async computeScopes(e, r) { let n = this.serviceRegistry.getServices(e.uri).references.ScopeComputation; e.precomputedScopes = await n.computeLocalScopes(e, r), e.state = li.DocumentState.ComputedScopes } shouldValidate(e, r) { return r.validationChecks === "all" } async validate(e, r) { let i = await this.serviceRegistry.getServices(e.uri).validation.DocumentValidator.validateDocument(e, r); e.diagnostics = i, e.state = li.DocumentState.Validated } }; rh.DefaultDocumentBuilder = JT }); var rR = f(nh => { "use strict"; Object.defineProperty(nh, "__esModule", { value: !0 }); nh.DefaultIndexManager = void 0; var JM = Oe(), jue = be(), ZT = Ft(), eR = Ci(), QM = fo(), tR = class { constructor(e) { this.simpleIndex = new Map, this.referenceIndex = new Map, this.globalScopeCache = new Map, this.serviceRegistry = e.ServiceRegistry, this.astReflection = e.AstReflection, this.langiumDocuments = () => e.workspace.LangiumDocuments } findAllReferences(e, r) { let n = (0, jue.getDocument)(e).uri, i = []; return this.referenceIndex.forEach(o => { o.forEach(a => { (0, eR.equalURI)(a.targetUri, n) && a.targetPath === r && i.push(a) }) }), (0, ZT.stream)(i) } allElements(e = "") { this.globalScopeCache.has("") || this.globalScopeCache.set("", Array.from(this.simpleIndex.values()).flat()); let r = this.globalScopeCache.get(e); if (r) return (0, ZT.stream)(r); { let n = this.globalScopeCache.get("").filter(i => this.astReflection.isSubtype(i.type, e)); return this.globalScopeCache.set(e, n), (0, ZT.stream)(n) } } remove(e) { for (let r of e) { let n = r.toString(); this.simpleIndex.delete(n), this.referenceIndex.delete(n), this.globalScopeCache.clear() } } async updateContent(e, r = JM.CancellationToken.None) { this.globalScopeCache.clear(); let i = await this.serviceRegistry.getServices(e.uri).references.ScopeComputation.computeExports(e, r); for (let o of i) o.node = void 0; this.simpleIndex.set(e.uri.toString(), i), e.state = QM.DocumentState.IndexedContent } async updateReferences(e, r = JM.CancellationToken.None) { let i = await this.serviceRegistry.getServices(e.uri).workspace.ReferenceDescriptionProvider.createDescriptions(e, r); this.referenceIndex.set(e.uri.toString(), i), e.state = QM.DocumentState.IndexedReferences } getAffectedDocuments(e) { return this.langiumDocuments().all.filter(r => { if (e.some(n => (0, eR.equalURI)(r.uri, n))) return !1; for (let n of e) if (this.isAffected(r, n)) return !0; return !1 }) } isAffected(e, r) { let n = r.toString(), i = e.uri.toString(); if (e.references.some(a => a.error !== void 0)) return !0; let o = this.referenceIndex.get(i); return o ? o.filter(a => !a.local).some(a => (0, eR.equalURI)(a.targetUri, n)) : !1 } }; nh.DefaultIndexManager = tR }); var oR = f(ih => { "use strict"; Object.defineProperty(ih, "__esModule", { value: !0 }); ih.DefaultWorkspaceManager = void 0; var Uue = Oe(), nR = gn(), Gue = _r(), iR = class { constructor(e) { this.serviceRegistry = e.ServiceRegistry, this.langiumDocuments = e.workspace.LangiumDocuments, this.documentBuilder = e.workspace.DocumentBuilder, this.fileSystemProvider = e.workspace.FileSystemProvider, this.mutex = e.workspace.MutexLock, e.lsp.LanguageServer.onInitialize(r => { var n; this.folders = (n = r.workspaceFolders) !== null && n !== void 0 ? n : void 0 }), e.lsp.LanguageServer.onInitialized(r => { this.mutex.lock(n => { var i; return this.initializeWorkspace((i = this.folders) !== null && i !== void 0 ? i : [], n) }) }) } async initializeWorkspace(e, r = Uue.CancellationToken.None) { let n = this.serviceRegistry.all.flatMap(a => a.LanguageMetaData.fileExtensions), i = [], o = a => { i.push(a), this.langiumDocuments.hasDocument(a.uri) || this.langiumDocuments.addDocument(a) }; await this.loadAdditionalDocuments(e, o), await Promise.all(e.map(a => [a, this.getRootFolder(a)]).map(async a => this.traverseFolder(...a, n, o))), await (0, Gue.interruptAndCheck)(r), await this.documentBuilder.build(i, void 0, r) } loadAdditionalDocuments(e, r) { return Promise.resolve() } getRootFolder(e) { return nR.URI.parse(e.uri) } async traverseFolder(e, r, n, i) { let o = await this.fileSystemProvider.readDirectory(r); await Promise.all(o.map(async a => { if (this.includeEntry(e, a, n)) { if (a.isDirectory) await this.traverseFolder(e, a.uri, n, i); else if (a.isFile) { let s = this.langiumDocuments.getOrCreateDocument(a.uri); i(s) } } })) } includeEntry(e, r, n) { let i = nR.Utils.basename(r.uri); if (i.startsWith(".")) return !1; if (r.isDirectory) return i !== "node_modules" && i !== "out"; if (r.isFile) { let o = nR.Utils.extname(r.uri); return n.includes(o) } return !1 } }; ih.DefaultWorkspaceManager = iR }); var cR = f(di => { "use strict"; Object.defineProperty(di, "__esModule", { value: !0 }); di.isTokenTypeDictionary = di.isIMultiModeLexerDefinition = di.isTokenTypeArray = di.DefaultLexer = void 0; var Hue = ga(), aR = class { constructor(e) { let r = e.parser.TokenBuilder.buildTokens(e.Grammar, { caseInsensitive: e.LanguageMetaData.caseInsensitive }); this.tokenTypes = this.toTokenTypeDictionary(r); let n = sR(r) ? Object.values(r) : r; this.chevrotainLexer = new Hue.Lexer(n) } get definition() { return this.tokenTypes } tokenize(e) { var r; let n = this.chevrotainLexer.tokenize(e); return { tokens: n.tokens, errors: n.errors, hidden: (r = n.groups.hidden) !== null && r !== void 0 ? r : [] } } toTokenTypeDictionary(e) { if (sR(e)) return e; let r = uR(e) ? Object.values(e.modes).flat() : e, n = {}; return r.forEach(i => n[i.name] = i), n } }; di.DefaultLexer = aR; function ZM(t) { return Array.isArray(t) && (t.length === 0 || "name" in t[0]) } di.isTokenTypeArray = ZM; function uR(t) { return t && "modes" in t && "defaultMode" in t } di.isIMultiModeLexerDefinition = uR; function sR(t) { return !ZM(t) && !uR(t) } di.isTokenTypeDictionary = sR }); var pR = f(mu => {
    "use strict"; Object.defineProperty(mu, "__esModule", { value: !0 }); mu.isJSDoc = mu.parseJSDoc = void 0; var Ie = Oe(), Wue = gn(), Bue = rd(), Kue = Vo(); function zue(t, e, r) { let n, i; typeof t == "string" ? (i = e, n = r) : (i = t.range.start, n = e), i || (i = Ie.Position.create(0, 0)); let o = r1(t), a = fR(n), s = Xue({ lines: o, position: i, options: a }); return tce({ index: 0, tokens: s, position: i }) } mu.parseJSDoc = zue; function Vue(t, e) { let r = fR(e), n = r1(t); if (n.length === 0) return !1; let i = n[0], o = n[n.length - 1], a = r.start, s = r.end; return Boolean(a?.exec(i)) && Boolean(s?.exec(o)) } mu.isJSDoc = Vue; function r1(t) { let e = ""; return typeof t == "string" ? e = t : e = t.text, e.split(Bue.NEWLINE_REGEXP) } var e1 = /\s*(@([\p{L}][\p{L}\p{N}]*)?)/uy, Yue = /\{(@[\p{L}][\p{L}\p{N}]*)(\s*)([^\r\n}]+)?\}/gu; function Xue(t) { var e, r, n; let i = [], o = t.position.line, a = t.position.character; for (let s = 0; s < t.lines.length; s++) { let u = s === 0, c = s === t.lines.length - 1, l = t.lines[s], d = 0; if (u && t.options.start) { let y = (e = t.options.start) === null || e === void 0 ? void 0 : e.exec(l); y && (d = y.index + y[0].length) } else { let y = (r = t.options.line) === null || r === void 0 ? void 0 : r.exec(l); y && (d = y.index + y[0].length) } if (c) { let y = (n = t.options.end) === null || n === void 0 ? void 0 : n.exec(l); y && (l = l.substring(0, y.index)) } if (l = l.substring(0, ece(l)), dR(l, 0) >= l.length) { if (i.length > 0) { let y = Ie.Position.create(o, a); i.push({ type: "break", content: "", range: Ie.Range.create(y, y) }) } } else { e1.lastIndex = d; let y = e1.exec(l); if (y) { let m = y[0], R = y[1], C = Ie.Position.create(o, a + d), E = Ie.Position.create(o, a + d + m.length); i.push({ type: "tag", content: R, range: Ie.Range.create(C, E) }), d += m.length, d = dR(l, d) } if (d < l.length) { let m = l.substring(d), R = Array.from(m.matchAll(Yue)); i.push(...Jue(R, m, o, a + d)) } } o++, a = 0 } return i.length > 0 && i[i.length - 1].type === "break" ? i.slice(0, -1) : i } function Jue(t, e, r, n) { let i = []; if (t.length === 0) { let o = Ie.Position.create(r, n), a = Ie.Position.create(r, n + e.length); i.push({ type: "text", content: e, range: Ie.Range.create(o, a) }) } else { let o = 0; for (let s of t) { let u = s.index, c = e.substring(o, u); c.length > 0 && i.push({ type: "text", content: e.substring(o, u), range: Ie.Range.create(Ie.Position.create(r, o + n), Ie.Position.create(r, u + n)) }); let l = c.length + 1, d = s[1]; if (i.push({ type: "inline-tag", content: d, range: Ie.Range.create(Ie.Position.create(r, o + l + n), Ie.Position.create(r, o + l + d.length + n)) }), l += d.length, s.length === 4) { l += s[2].length; let h = s[3]; i.push({ type: "text", content: h, range: Ie.Range.create(Ie.Position.create(r, o + l + n), Ie.Position.create(r, o + l + h.length + n)) }) } else i.push({ type: "text", content: "", range: Ie.Range.create(Ie.Position.create(r, o + l + n), Ie.Position.create(r, o + l + n)) }); o = u + s[0].length } let a = e.substring(o); a.length > 0 && i.push({ type: "text", content: a, range: Ie.Range.create(Ie.Position.create(r, o + n), Ie.Position.create(r, o + n + a.length)) }) } return i } var Que = /\S/, Zue = /\s*$/; function dR(t, e) { let r = t.substring(e).match(Que); return r ? e + r.index : t.length } function ece(t) { let e = t.match(Zue); if (e && typeof e.index == "number") return e.index } function tce(t) { var e, r, n, i; let o = Ie.Position.create(t.position.line, t.position.character); if (t.tokens.length === 0) return new oh([], Ie.Range.create(o, o)); let a = []; for (; t.index < t.tokens.length;) { let c = rce(t, a[a.length - 1]); c && a.push(c) } let s = (r = (e = a[0]) === null || e === void 0 ? void 0 : e.range.start) !== null && r !== void 0 ? r : o, u = (i = (n = a[a.length - 1]) === null || n === void 0 ? void 0 : n.range.end) !== null && i !== void 0 ? i : o; return new oh(a, Ie.Range.create(s, u)) } function rce(t, e) { let r = t.tokens[t.index]; if (r.type === "tag") return i1(t, !1); if (r.type === "text" || r.type === "inline-tag") return n1(t); nce(r, e), t.index++ } function nce(t, e) { if (e) { let r = new ah("", t.range); "inlines" in e ? e.inlines.push(r) : e.content.inlines.push(r) } } function n1(t) { let e = t.tokens[t.index], r = e, n = e, i = []; for (; e && e.type !== "break" && e.type !== "tag";)i.push(ice(t)), n = e, e = t.tokens[t.index]; return new nl(i, Ie.Range.create(r.range.start, n.range.end)) } function ice(t) { return t.tokens[t.index].type === "inline-tag" ? i1(t, !0) : o1(t) } function i1(t, e) { let r = t.tokens[t.index++], n = r.content.substring(1), i = t.tokens[t.index]; if (i?.type === "text") if (e) { let o = o1(t); return new rl(n, new nl([o], o.range), e, Ie.Range.create(r.range.start, o.range.end)) } else { let o = n1(t); return new rl(n, o, e, Ie.Range.create(r.range.start, o.range.end)) } else { let o = r.range; return new rl(n, new nl([], o), e, o) } } function o1(t) { let e = t.tokens[t.index++]; return new ah(e.content, e.range) } function fR(t) { if (!t) return fR({ start: "/**", end: "*/", line: "*" }); let { start: e, end: r, line: n } = t; return { start: lR(e, !0), end: lR(r, !1), line: lR(n, !0) } } function lR(t, e) { if (typeof t == "string" || typeof t == "object") { let r = typeof t == "string" ? (0, Kue.escapeRegExp)(t) : t.source; return e ? new RegExp(`^\\s*${r}`) : new RegExp(`\\s*${r}\\s*$`) } else return t } var oh = class { constructor(e, r) { this.elements = e, this.range = r } getTag(e) { return this.getAllTags().find(r => r.name === e) } getTags(e) { return this.getAllTags().filter(r => r.name === e) } getAllTags() { return this.elements.filter(e => "name" in e) } toString() { let e = ""; for (let r of this.elements) if (e.length === 0) e = r.toString(); else { let n = r.toString(); e += t1(e) + n } return e.trim() } toMarkdown(e) { let r = ""; for (let n of this.elements) if (r.length === 0) r = n.toMarkdown(e); else { let i = n.toMarkdown(e); r += t1(r) + i } return r.trim() } }, rl = class {
      constructor(e, r, n, i) { this.name = e, this.content = r, this.inline = n, this.range = i } toString() {
        let e = `@${this.name}`, r = this.content.toString(); return this.content.inlines.length === 1 ? e = `${e} ${r}` : this.content.inlines.length > 1 && (e = `${e}
${r}`), this.inline ? `{${e}}` : e
      } toMarkdown(e) {
        let r = this.content.toMarkdown(e); if (this.inline) { let o = oce(this.name, r, e ?? {}); if (typeof o == "string") return o } let n = ""; e?.tag === "italic" || e?.tag === void 0 ? n = "*" : e?.tag === "bold" ? n = "**" : e?.tag === "bold-italic" && (n = "***"); let i = `${n}@${this.name}${n}`; return this.content.inlines.length === 1 ? i = `${i} \u2014 ${r}` : this.content.inlines.length > 1 && (i = `${i}
${r}`), this.inline ? `{${i}}` : i
      }
    }; function oce(t, e, r) { var n, i; if (t === "linkplain" || t === "linkcode" || t === "link") { let o = e.indexOf(" "), a = e; if (o > 0) { let u = dR(e, o); a = e.substring(u), e = e.substring(0, o) } return (t === "linkcode" || t === "link" && r.link === "code") && (a = `\`${a}\``), (i = (n = r.renderLink) === null || n === void 0 ? void 0 : n.call(r, e, a)) !== null && i !== void 0 ? i : ace(e, a) } } function ace(t, e) { try { return Wue.URI.parse(t, !0), `[${e}](${t})` } catch { return t } } var nl = class {
      constructor(e, r) { this.inlines = e, this.range = r } toString() {
        let e = ""; for (let r = 0; r < this.inlines.length; r++) {
          let n = this.inlines[r], i = this.inlines[r + 1]; e += n.toString(), i && i.range.start.line > n.range.start.line && (e += `
`)
        } return e
      } toMarkdown(e) {
        let r = ""; for (let n = 0; n < this.inlines.length; n++) {
          let i = this.inlines[n], o = this.inlines[n + 1]; r += i.toMarkdown(e), o && o.range.start.line > i.range.start.line && (r += `
`)
        } return r
      }
    }, ah = class { constructor(e, r) { this.text = e, this.range = r } toString() { return this.text } toMarkdown() { return this.text } }; function t1(t) {
      return t.endsWith(`
`) ? `
`: `

`}
  }); var s1 = f(sh => { "use strict"; Object.defineProperty(sh, "__esModule", { value: !0 }); sh.JSDocDocumentationProvider = void 0; var sce = er(), uce = be(), cce = Le(), a1 = pR(), hR = class { constructor(e) { this.indexManager = e.shared.workspace.IndexManager, this.grammarConfig = e.parser.GrammarConfig } getDocumentation(e) { let r = (0, cce.findCommentNode)(e.$cstNode, this.grammarConfig.multilineCommentRules); if ((0, sce.isLeafCstNode)(r) && (0, a1.isJSDoc)(r)) return (0, a1.parseJSDoc)(r).toMarkdown({ renderLink: (i, o) => this.documentationLinkRenderer(e, i, o) }) } documentationLinkRenderer(e, r, n) { var i; let o = (i = this.findNameInPrecomputedScopes(e, r)) !== null && i !== void 0 ? i : this.findNameInGlobalScope(e, r); if (o && o.nameSegment) { let a = o.nameSegment.range.start.line + 1, s = o.nameSegment.range.start.character + 1, u = o.documentUri.with({ fragment: `L${a},${s}` }); return `[${n}](${u.toString()})` } else return } findNameInPrecomputedScopes(e, r) { let i = (0, uce.getDocument)(e).precomputedScopes; if (!i) return; let o = e; do { let s = i.get(o).find(u => u.name === r); if (s) return s; o = o.$container } while (o) } findNameInGlobalScope(e, r) { return this.indexManager.allElements().find(i => i.name === r) } }; sh.JSDocDocumentationProvider = hR }); var mR = f(ko => { "use strict"; var lce = ko && ko.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), u1 = ko && ko.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && lce(e, t, r) }; Object.defineProperty(ko, "__esModule", { value: !0 }); u1(s1(), ko); u1(pR(), ko) }); var af = f(gu => { "use strict"; Object.defineProperty(gu, "__esModule", { value: !0 }); gu.createDefaultSharedModule = gu.createDefaultModule = void 0; var dce = Oe(), fce = Jm(), pce = vv(), hce = CT(), mce = Ud(), gce = Fy(), yce = Uy(), vce = Ed(), _ce = My(), Tce = Wy(), Rce = Zy(), bce = tv(), Ace = nv(), Pce = ET(), Sce = wT(), Cce = DT(), Ece = qT(), Nce = Za(), kce = Md(), wce = Td(), Oce = bd(), Dce = MT(), Ice = FT(), xce = _r(), qce = Sd(), Lce = UT(), c1 = BT(), Mce = zT(), $ce = YT(), Fce = QT(), l1 = fo(), jce = rR(), Uce = oR(), Gce = cR(), Hce = mR(); function Wce(t) { return { documentation: { DocumentationProvider: e => new Hce.JSDocDocumentationProvider(e) }, parser: { GrammarConfig: e => (0, pce.createGrammarConfig)(e), LangiumParser: e => (0, Pce.createLangiumParser)(e), CompletionParser: e => (0, hce.createCompletionParser)(e), ValueConverter: () => new Cce.DefaultValueConverter, TokenBuilder: () => new Sce.DefaultTokenBuilder, Lexer: e => new Gce.DefaultLexer(e) }, lsp: { CompletionProvider: e => new mce.DefaultCompletionProvider(e), DocumentSymbolProvider: e => new yce.DefaultDocumentSymbolProvider(e), HoverProvider: e => new Tce.MultilineCommentHoverProvider(e), FoldingRangeProvider: e => new vce.DefaultFoldingRangeProvider(e), ReferencesProvider: e => new bce.DefaultReferencesProvider(e), DefinitionProvider: e => new _ce.DefaultDefinitionProvider(e), DocumentHighlightProvider: e => new gce.DefaultDocumentHighlightProvider(e), RenameProvider: e => new Ace.DefaultRenameProvider(e) }, workspace: { AstNodeLocator: () => new Mce.DefaultAstNodeLocator, AstNodeDescriptionProvider: e => new c1.DefaultAstNodeDescriptionProvider(e), ReferenceDescriptionProvider: e => new c1.DefaultReferenceDescriptionProvider(e) }, references: { Linker: e => new Ece.DefaultLinker(e), NameProvider: () => new Nce.DefaultNameProvider, ScopeProvider: e => new Oce.DefaultScopeProvider(e), ScopeComputation: e => new wce.DefaultScopeComputation(e), References: e => new kce.DefaultReferences(e) }, serializer: { JsonSerializer: e => new Dce.DefaultJsonSerializer(e) }, validation: { DocumentValidator: e => new qce.DefaultDocumentValidator(e), ValidationRegistry: e => new Lce.ValidationRegistry(e) }, shared: () => t.shared } } gu.createDefaultModule = Wce; function Bce(t) { return { ServiceRegistry: () => new Ice.DefaultServiceRegistry, lsp: { Connection: () => t.connection, LanguageServer: e => new Rce.DefaultLanguageServer(e) }, workspace: { LangiumDocuments: e => new l1.DefaultLangiumDocuments(e), LangiumDocumentFactory: e => new l1.DefaultLangiumDocumentFactory(e), DocumentBuilder: e => new Fce.DefaultDocumentBuilder(e), TextDocuments: () => new dce.TextDocuments(fce.TextDocument), IndexManager: e => new jce.DefaultIndexManager(e), WorkspaceManager: e => new Uce.DefaultWorkspaceManager(e), FileSystemProvider: e => t.fileSystemProvider(e), MutexLock: () => new xce.MutexLock, ConfigurationProvider: e => new $ce.DefaultConfigurationProvider(e) } } } gu.createDefaultSharedModule = Bce }); var f1 = f(d1 => { "use strict"; Object.defineProperty(d1, "__esModule", { value: !0 }) }); var m1 = f(wo => { "use strict"; Object.defineProperty(wo, "__esModule", { value: !0 }); wo.joinTracedToNodeIf = wo.joinTracedToNode = wo.joinToNode = void 0; var gR = Ho(); function p1(t, e = String, { filter: r, prefix: n, suffix: i, separator: o, appendNewLineIfNotEmpty: a } = {}) { return zce(t, (s, u, c, l) => { if (r && !r(u, c, l)) return s; let d = e(u, c, l); return (s ?? (s = new gR.CompositeGeneratorNode)).append(n && n(u, c, l)).append(d).append(i && i(u, c, l)).appendIf(!l && d !== void 0, o).appendNewLineIfNotEmptyIf(!s.isEmpty() && !!a) }) } wo.joinToNode = p1; function h1(t, e) { return (r, n = String, i) => (0, gR.traceToNode)(t, e)(p1(r, t && e ? (o, a, s) => (0, gR.traceToNode)(t, e, a)(n(o, a, s)) : n, i)) } wo.joinTracedToNode = h1; function Kce(t, e, r) { return t ? h1(typeof e == "function" ? e() : e, r) : () => { } } wo.joinTracedToNodeIf = Kce; function zce(t, e, r) { let n = t[Symbol.iterator](), i = n.next(), o = 0, a = r; for (; !i.done;) { let s = n.next(); a = e(a, i.value, o, Boolean(s.done)), i = s, o++ } return a } }); var g1 = f(gr => { "use strict"; var Vce = gr && gr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), yR = gr && gr.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Vce(e, t, r) }; Object.defineProperty(gr, "__esModule", { value: !0 }); gr.normalizeEOL = gr.expandToStringWithNL = gr.expandToString = void 0; yR(Ho(), gr); yR(m1(), gr); yR(fg(), gr); var vR = rd(); Object.defineProperty(gr, "expandToString", { enumerable: !0, get: function () { return vR.expandToString } }); Object.defineProperty(gr, "expandToStringWithNL", { enumerable: !0, get: function () { return vR.expandToStringWithNL } }); Object.defineProperty(gr, "normalizeEOL", { enumerable: !0, get: function () { return vR.normalizeEOL } }) }); var v1 = f(y1 => { "use strict"; Object.defineProperty(y1, "__esModule", { value: !0 }) }); var _1 = f(fi => { "use strict"; var Yce = fi && fi.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), uh = fi && fi.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Yce(e, t, r) }; Object.defineProperty(fi, "__esModule", { value: !0 }); uh(Vg(), fi); uh(vv(), fi); uh(pv(), fi); uh(v1(), fi) }); var R1 = f(T1 => { "use strict"; Object.defineProperty(T1, "__esModule", { value: !0 }) }); var b1 = f(Sr => { "use strict"; var Xce = Sr && Sr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), Oo = Sr && Sr.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Xce(e, t, r) }; Object.defineProperty(Sr, "__esModule", { value: !0 }); Oo(CT(), Sr); Oo(yT(), Sr); Oo(ET(), Sr); Oo(Up(), Sr); Oo(cR(), Sr); Oo(R1(), Sr); Oo(wT(), Sr); Oo(DT(), Sr) }); var A1 = f(On => { "use strict"; var Jce = On && On.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), il = On && On.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Jce(e, t, r) }; Object.defineProperty(On, "__esModule", { value: !0 }); il(qT(), On); il(Za(), On); il(Md(), On); il(Td(), On); il(bd(), On) }); var P1 = f(_a => { "use strict"; var Qce = _a && _a.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), Zce = _a && _a.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && Qce(e, t, r) }; Object.defineProperty(_a, "__esModule", { value: !0 }); Zce(MT(), _a) }); var S1 = f(yr => { "use strict"; var ele = yr && yr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), Wi = yr && yr.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && ele(e, t, r) }; Object.defineProperty(yr, "__esModule", { value: !0 }); Wi(be(), yr); Wi(yn(), yr); Wi(Le(), yr); Wi(AT(), yr); Wi(vt(), yr); Wi(_r(), yr); Wi(Vo(), yr); Wi(Ft(), yr); Wi(Ci(), yr) }); var E1 = f(Do => { "use strict"; var tle = Do && Do.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), C1 = Do && Do.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && tle(e, t, r) }; Object.defineProperty(Do, "__esModule", { value: !0 }); C1(Sd(), Do); C1(UT(), Do) }); var N1 = f(Cr => { "use strict"; var rle = Cr && Cr.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), Io = Cr && Cr.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && rle(e, t, r) }; Object.defineProperty(Cr, "__esModule", { value: !0 }); Io(BT(), Cr); Io(zT(), Cr); Io(YT(), Cr); Io(QT(), Cr); Io(fo(), Cr); Io(hv(), Cr); Io(rR(), Cr); Io(oR(), Cr) }); var Ta = f(We => { "use strict"; var k1 = We && We.__createBinding || (Object.create ? function (t, e, r, n) { n === void 0 && (n = r); var i = Object.getOwnPropertyDescriptor(e, r); (!i || ("get" in i ? !e.__esModule : i.writable || i.configurable)) && (i = { enumerable: !0, get: function () { return e[r] } }), Object.defineProperty(t, n, i) } : function (t, e, r, n) { n === void 0 && (n = r), t[n] = e[r] }), nle = We && We.__setModuleDefault || (Object.create ? function (t, e) { Object.defineProperty(t, "default", { enumerable: !0, value: e }) } : function (t, e) { t.default = e }), vr = We && We.__exportStar || function (t, e) { for (var r in t) r !== "default" && !Object.prototype.hasOwnProperty.call(e, r) && k1(e, t, r) }, ile = We && We.__importStar || function (t) { if (t && t.__esModule) return t; var e = {}; if (t != null) for (var r in t) r !== "default" && Object.prototype.hasOwnProperty.call(t, r) && k1(e, t, r); return nle(e, t), e }; Object.defineProperty(We, "__esModule", { value: !0 }); We.GrammarAST = void 0; vr(af(), We); vr(Gu(), We); vr(FT(), We); vr(f1(), We); vr(er(), We); vr(mR(), We); vr(g1(), We); vr(_1(), We); vr(ov(), We); vr(b1(), We); vr(A1(), We); vr(P1(), We); vr(S1(), We); vr(E1(), We); vr(N1(), We); var ole = ile(Se()); We.GrammarAST = ole }); var O1 = f((g_e, w1) => { "use strict"; w1.exports = Oe() }); var D1 = f(tt => { "use strict"; Object.defineProperty(tt, "__esModule", { value: !0 }); tt.reflection = tt.HelloWorldAstReflection = tt.isPerson = tt.Person = tt.isModel = tt.Model = tt.isGreeting = tt.Greeting = void 0; var ale = Ta(); tt.Greeting = "Greeting"; function sle(t) { return tt.reflection.isInstance(t, tt.Greeting) } tt.isGreeting = sle; tt.Model = "Model"; function ule(t) { return tt.reflection.isInstance(t, tt.Model) } tt.isModel = ule; tt.Person = "Person"; function cle(t) { return tt.reflection.isInstance(t, tt.Person) } tt.isPerson = cle; var ch = class extends ale.AbstractAstReflection { getAllTypes() { return ["Greeting", "Model", "Person"] } computeIsSubtype(e, r) { switch (e) { default: return !1 } } getReferenceType(e) { let r = `${e.container.$type}:${e.property}`; switch (r) { case "Greeting:person": return tt.Person; default: throw new Error(`${r} is not a valid reference id.`) } } getTypeMetaData(e) { switch (e) { case "Model": return { name: "Model", mandatory: [{ name: "greetings", type: "array" }, { name: "persons", type: "array" }] }; default: return { name: e, mandatory: [] } } } }; tt.HelloWorldAstReflection = ch; tt.reflection = new ch }); var I1 = f(dh => {
    "use strict"; Object.defineProperty(dh, "__esModule", { value: !0 }); dh.HelloWorldGrammar = void 0; var lle = Ta(), lh, dle = () => lh != null ? lh : lh = (0, lle.loadGrammarFromJson)(`{
  "$type": "Grammar",
  "isDeclared": true,
  "name": "HelloWorld",
  "rules": [
    {
      "$type": "ParserRule",
      "name": "Model",
      "entry": true,
      "definition": {
        "$type": "Alternatives",
        "elements": [
          {
            "$type": "Assignment",
            "feature": "persons",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@1"
              },
              "arguments": []
            }
          },
          {
            "$type": "Assignment",
            "feature": "greetings",
            "operator": "+=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@2"
              },
              "arguments": []
            }
          }
        ],
        "cardinality": "*"
      },
      "definesHiddenTokens": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Person",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "person"
          },
          {
            "$type": "Assignment",
            "feature": "name",
            "operator": "=",
            "terminal": {
              "$type": "RuleCall",
              "rule": {
                "$ref": "#/rules@4"
              },
              "arguments": []
            }
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "ParserRule",
      "name": "Greeting",
      "definition": {
        "$type": "Group",
        "elements": [
          {
            "$type": "Keyword",
            "value": "Hello"
          },
          {
            "$type": "Assignment",
            "feature": "person",
            "operator": "=",
            "terminal": {
              "$type": "CrossReference",
              "type": {
                "$ref": "#/rules@1"
              },
              "terminal": {
                "$type": "RuleCall",
                "rule": {
                  "$ref": "#/rules@4"
                },
                "arguments": []
              },
              "deprecatedSyntax": false
            }
          },
          {
            "$type": "Keyword",
            "value": "!"
          }
        ]
      },
      "definesHiddenTokens": false,
      "entry": false,
      "fragment": false,
      "hiddenTokens": [],
      "parameters": [],
      "wildcard": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "WS",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\s+"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "name": "ID",
      "definition": {
        "$type": "RegexToken",
        "regex": "[_a-zA-Z][\\\\w_]*"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "INT",
      "type": {
        "$type": "ReturnType",
        "name": "number"
      },
      "definition": {
        "$type": "RegexToken",
        "regex": "[0-9]+"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "name": "STRING",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\"(\\\\\\\\.|[^\\"\\\\\\\\])*\\"|'(\\\\\\\\.|[^'\\\\\\\\])*'"
      },
      "fragment": false,
      "hidden": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "ML_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\*[\\\\s\\\\S]*?\\\\*\\\\/"
      },
      "fragment": false
    },
    {
      "$type": "TerminalRule",
      "hidden": true,
      "name": "SL_COMMENT",
      "definition": {
        "$type": "RegexToken",
        "regex": "\\\\/\\\\/[^\\\\n\\\\r]*"
      },
      "fragment": false
    }
  ],
  "definesHiddenTokens": false,
  "hiddenTokens": [],
  "imports": [],
  "interfaces": [],
  "types": [],
  "usedGrammars": []
}`); dh.HelloWorldGrammar = dle
  }); var x1 = f(Bi => { "use strict"; Object.defineProperty(Bi, "__esModule", { value: !0 }); Bi.HelloWorldGeneratedModule = Bi.HelloWorldGeneratedSharedModule = Bi.HelloWorldLanguageMetaData = void 0; var fle = D1(), ple = I1(); Bi.HelloWorldLanguageMetaData = { languageId: "hello-world", fileExtensions: [".hello"], caseInsensitive: !1 }; Bi.HelloWorldGeneratedSharedModule = { AstReflection: () => new fle.HelloWorldAstReflection }; Bi.HelloWorldGeneratedModule = { Grammar: () => (0, ple.HelloWorldGrammar)(), LanguageMetaData: () => Bi.HelloWorldLanguageMetaData, parser: {} } }); var q1 = f(yu => { "use strict"; Object.defineProperty(yu, "__esModule", { value: !0 }); yu.HelloWorldValidator = yu.registerValidationChecks = void 0; function hle(t) { let e = t.validation.ValidationRegistry, r = t.validation.HelloWorldValidator, n = { Person: r.checkPersonStartsWithCapital }; e.register(n, r) } yu.registerValidationChecks = hle; var _R = class { checkPersonStartsWithCapital(e, r) { if (e.name) { let n = e.name.substring(0, 1); n.toUpperCase() !== n && r("warning", "Person name should start with a capital.", { node: e, property: "name" }) } } }; yu.HelloWorldValidator = _R }); var L1 = f(fh => { "use strict"; Object.defineProperty(fh, "__esModule", { value: !0 }); fh.HelloWorldWorkspaceManager = void 0; var mle = Ta(), gle = gn(), TR = class extends mle.DefaultWorkspaceManager { constructor(e, r) { super(e), this.fakeModel = r, this.documentFactory = e.workspace.LangiumDocumentFactory } async loadAdditionalDocuments(e, r) { await super.loadAdditionalDocuments(e, r), r(this.documentFactory.fromString(this.fakeModel, gle.URI.parse("builtin:///library.hello"))) } }; fh.HelloWorldWorkspaceManager = TR }); var $1 = f(ph => { "use strict"; Object.defineProperty(ph, "__esModule", { value: !0 }); ph.HelloSemanticTokenProvider = void 0; var M1 = Ta(), yle = Se(), vle = Oe(), RR = class extends M1.AbstractSemanticTokenProvider { highlightElement(e, r) { console.log("mimimimi3"), e.$cstNode !== void 0 && e.$container === void 0 && (0, M1.flattenCst)(e.$cstNode).forEach(n => { (0, yle.isKeyword)(n.feature) && r({ node: n.element, keyword: n.feature.value, type: vle.SemanticTokenTypes.keyword }) }) } }; ph.HelloSemanticTokenProvider = RR }); var U1 = f(Ra => { "use strict"; Object.defineProperty(Ra, "__esModule", { value: !0 }); Ra.createHelloWorldServices = Ra.HelloWorldModule = void 0; var hh = Ta(), F1 = x1(), j1 = q1(), _le = L1(), Tle = $1(); Ra.HelloWorldModule = { validation: { HelloWorldValidator: () => new j1.HelloWorldValidator }, lsp: { SemanticTokenProvider: t => new Tle.HelloSemanticTokenProvider(t) } }; function Rle(t, e) { let r = (0, hh.inject)((0, hh.createDefaultSharedModule)(t), F1.HelloWorldGeneratedSharedModule, e !== void 0 ? ble(e) : {}), n = (0, hh.inject)((0, hh.createDefaultModule)({ shared: r }), F1.HelloWorldGeneratedModule, Ra.HelloWorldModule); return r.ServiceRegistry.register(n), (0, j1.registerValidationChecks)(n), { shared: r, HelloWorld: n } } Ra.createHelloWorldServices = Rle; function ble(t) { return { workspace: { WorkspaceManager: e => new _le.HelloWorldWorkspaceManager(e, t) } } } }); var Ple = f(H1 => { Object.defineProperty(H1, "__esModule", { value: !0 }); var G1 = Ta(), bR = O1(), Ale = U1(); self.onmessage = t => { let e = "", r = t.data.model; typeof r == "string" && (e = r), console.log("mimimi2 " + t.data.model), console.log(e); let n = new bR.BrowserMessageReader(self), i = new bR.BrowserMessageWriter(self), o = (0, bR.createConnection)(n, i), { shared: a } = (0, Ale.createHelloWorldServices)(Object.assign({ connection: o }, G1.EmptyFileSystem), e); (0, G1.startLanguageServer)(a) } }); Ple();
})();
