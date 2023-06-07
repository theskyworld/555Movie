(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) i(s);
  new MutationObserver((s) => {
    for (const r of s)
      if (r.type === "childList")
        for (const o of r.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && i(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const r = {};
    return (
      s.integrity && (r.integrity = s.integrity),
      s.referrerpolicy && (r.referrerPolicy = s.referrerpolicy),
      s.crossorigin === "use-credentials"
        ? (r.credentials = "include")
        : s.crossorigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function i(s) {
    if (s.ep) return;
    s.ep = !0;
    const r = n(s);
    fetch(s.href, r);
  }
})();
function Un(e, t) {
  const n = Object.create(null),
    i = e.split(",");
  for (let s = 0; s < i.length; s++) n[i[s]] = !0;
  return t ? (s) => !!n[s.toLowerCase()] : (s) => !!n[s];
}
function Kn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const i = e[n],
        s = re(i) ? cr(i) : Kn(i);
      if (s) for (const r in s) t[r] = s[r];
    }
    return t;
  } else {
    if (re(e)) return e;
    if (te(e)) return e;
  }
}
const fr = /;(?![^(]*\))/g,
  dr = /:([^]+)/,
  ur = /\/\*.*?\*\//gs;
function cr(e) {
  const t = {};
  return (
    e
      .replace(ur, "")
      .split(fr)
      .forEach((n) => {
        if (n) {
          const i = n.split(dr);
          i.length > 1 && (t[i[0].trim()] = i[1].trim());
        }
      }),
    t
  );
}
function qn(e) {
  let t = "";
  if (re(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const i = qn(e[n]);
      i && (t += i + " ");
    }
  else if (te(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const pr =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  hr = Un(pr);
function is(e) {
  return !!e || e === "";
}
const Z = {},
  pt = [],
  Me = () => {},
  gr = () => !1,
  mr = /^on[^a-z]/,
  tn = (e) => mr.test(e),
  Yn = (e) => e.startsWith("onUpdate:"),
  fe = Object.assign,
  Xn = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  vr = Object.prototype.hasOwnProperty,
  W = (e, t) => vr.call(e, t),
  D = Array.isArray,
  xt = (e) => nn(e) === "[object Map]",
  br = (e) => nn(e) === "[object Set]",
  V = (e) => typeof e == "function",
  re = (e) => typeof e == "string",
  Jn = (e) => typeof e == "symbol",
  te = (e) => e !== null && typeof e == "object",
  ss = (e) => te(e) && V(e.then) && V(e.catch),
  wr = Object.prototype.toString,
  nn = (e) => wr.call(e),
  Sr = (e) => nn(e).slice(8, -1),
  yr = (e) => nn(e) === "[object Object]",
  Zn = (e) =>
    re(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Wt = Un(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
  ),
  sn = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  Tr = /-(\w)/g,
  Ne = sn((e) => e.replace(Tr, (t, n) => (n ? n.toUpperCase() : ""))),
  Er = /\B([A-Z])/g,
  wt = sn((e) => e.replace(Er, "-$1").toLowerCase()),
  rn = sn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  vn = sn((e) => (e ? `on${rn(e)}` : "")),
  Pt = (e, t) => !Object.is(e, t),
  bn = (e, t) => {
    for (let n = 0; n < e.length; n++) e[n](t);
  },
  Jt = (e, t, n) => {
    Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: n });
  },
  rs = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Si;
const xr = () =>
  Si ||
  (Si =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : typeof global < "u"
      ? global
      : {});
let Le;
class Cr {
  constructor(t = !1) {
    (this.detached = t),
      (this.active = !0),
      (this.effects = []),
      (this.cleanups = []),
      (this.parent = Le),
      !t && Le && (this.index = (Le.scopes || (Le.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = Le;
      try {
        return (Le = this), t();
      } finally {
        Le = n;
      }
    }
  }
  on() {
    Le = this;
  }
  off() {
    Le = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, i;
      for (n = 0, i = this.effects.length; n < i; n++) this.effects[n].stop();
      for (n = 0, i = this.cleanups.length; n < i; n++) this.cleanups[n]();
      if (this.scopes)
        for (n = 0, i = this.scopes.length; n < i; n++) this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s &&
          s !== this &&
          ((this.parent.scopes[this.index] = s), (s.index = this.index));
      }
      (this.parent = void 0), (this.active = !1);
    }
  }
}
function Mr(e, t = Le) {
  t && t.active && t.effects.push(e);
}
const Qn = (e) => {
    const t = new Set(e);
    return (t.w = 0), (t.n = 0), t;
  },
  ls = (e) => (e.w & Xe) > 0,
  os = (e) => (e.n & Xe) > 0,
  Pr = ({ deps: e }) => {
    if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= Xe;
  },
  Or = (e) => {
    const { deps: t } = e;
    if (t.length) {
      let n = 0;
      for (let i = 0; i < t.length; i++) {
        const s = t[i];
        ls(s) && !os(s) ? s.delete(e) : (t[n++] = s),
          (s.w &= ~Xe),
          (s.n &= ~Xe);
      }
      t.length = n;
    }
  },
  Ln = new WeakMap();
let Et = 0,
  Xe = 1;
const An = 30;
let xe;
const rt = Symbol(""),
  Bn = Symbol("");
class ei {
  constructor(t, n = null, i) {
    (this.fn = t),
      (this.scheduler = n),
      (this.active = !0),
      (this.deps = []),
      (this.parent = void 0),
      Mr(this, i);
  }
  run() {
    if (!this.active) return this.fn();
    let t = xe,
      n = qe;
    for (; t; ) {
      if (t === this) return;
      t = t.parent;
    }
    try {
      return (
        (this.parent = xe),
        (xe = this),
        (qe = !0),
        (Xe = 1 << ++Et),
        Et <= An ? Pr(this) : yi(this),
        this.fn()
      );
    } finally {
      Et <= An && Or(this),
        (Xe = 1 << --Et),
        (xe = this.parent),
        (qe = n),
        (this.parent = void 0),
        this.deferStop && this.stop();
    }
  }
  stop() {
    xe === this
      ? (this.deferStop = !0)
      : this.active &&
        (yi(this), this.onStop && this.onStop(), (this.active = !1));
  }
}
function yi(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++) t[n].delete(e);
    t.length = 0;
  }
}
let qe = !0;
const as = [];
function St() {
  as.push(qe), (qe = !1);
}
function yt() {
  const e = as.pop();
  qe = e === void 0 ? !0 : e;
}
function ge(e, t, n) {
  if (qe && xe) {
    let i = Ln.get(e);
    i || Ln.set(e, (i = new Map()));
    let s = i.get(n);
    s || i.set(n, (s = Qn())), fs(s);
  }
}
function fs(e, t) {
  let n = !1;
  Et <= An ? os(e) || ((e.n |= Xe), (n = !ls(e))) : (n = !e.has(xe)),
    n && (e.add(xe), xe.deps.push(e));
}
function ke(e, t, n, i, s, r) {
  const o = Ln.get(e);
  if (!o) return;
  let a = [];
  if (t === "clear") a = [...o.values()];
  else if (n === "length" && D(e)) {
    const l = rs(i);
    o.forEach((f, c) => {
      (c === "length" || c >= l) && a.push(f);
    });
  } else
    switch ((n !== void 0 && a.push(o.get(n)), t)) {
      case "add":
        D(e)
          ? Zn(n) && a.push(o.get("length"))
          : (a.push(o.get(rt)), xt(e) && a.push(o.get(Bn)));
        break;
      case "delete":
        D(e) || (a.push(o.get(rt)), xt(e) && a.push(o.get(Bn)));
        break;
      case "set":
        xt(e) && a.push(o.get(rt));
        break;
    }
  if (a.length === 1) a[0] && zn(a[0]);
  else {
    const l = [];
    for (const f of a) f && l.push(...f);
    zn(Qn(l));
  }
}
function zn(e, t) {
  const n = D(e) ? e : [...e];
  for (const i of n) i.computed && Ti(i);
  for (const i of n) i.computed || Ti(i);
}
function Ti(e, t) {
  (e !== xe || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const _r = Un("__proto__,__v_isRef,__isVue"),
  ds = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Jn)
  ),
  Ir = ti(),
  Lr = ti(!1, !0),
  Ar = ti(!0),
  Ei = Br();
function Br() {
  const e = {};
  return (
    ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
      e[t] = function (...n) {
        const i = K(this);
        for (let r = 0, o = this.length; r < o; r++) ge(i, "get", r + "");
        const s = i[t](...n);
        return s === -1 || s === !1 ? i[t](...n.map(K)) : s;
      };
    }),
    ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
      e[t] = function (...n) {
        St();
        const i = K(this)[t].apply(this, n);
        return yt(), i;
      };
    }),
    e
  );
}
function ti(e = !1, t = !1) {
  return function (i, s, r) {
    if (s === "__v_isReactive") return !e;
    if (s === "__v_isReadonly") return e;
    if (s === "__v_isShallow") return t;
    if (s === "__v_raw" && r === (e ? (t ? Yr : gs) : t ? hs : ps).get(i))
      return i;
    const o = D(i);
    if (!e && o && W(Ei, s)) return Reflect.get(Ei, s, r);
    const a = Reflect.get(i, s, r);
    return (Jn(s) ? ds.has(s) : _r(s)) || (e || ge(i, "get", s), t)
      ? a
      : ae(a)
      ? o && Zn(s)
        ? a
        : a.value
      : te(a)
      ? e
        ? ms(a)
        : si(a)
      : a;
  };
}
const zr = us(),
  $r = us(!0);
function us(e = !1) {
  return function (n, i, s, r) {
    let o = n[i];
    if (mt(o) && ae(o) && !ae(s)) return !1;
    if (
      !e &&
      (!Zt(s) && !mt(s) && ((o = K(o)), (s = K(s))), !D(n) && ae(o) && !ae(s))
    )
      return (o.value = s), !0;
    const a = D(n) && Zn(i) ? Number(i) < n.length : W(n, i),
      l = Reflect.set(n, i, s, r);
    return (
      n === K(r) && (a ? Pt(s, o) && ke(n, "set", i, s) : ke(n, "add", i, s)), l
    );
  };
}
function Nr(e, t) {
  const n = W(e, t);
  e[t];
  const i = Reflect.deleteProperty(e, t);
  return i && n && ke(e, "delete", t, void 0), i;
}
function Fr(e, t) {
  const n = Reflect.has(e, t);
  return (!Jn(t) || !ds.has(t)) && ge(e, "has", t), n;
}
function Rr(e) {
  return ge(e, "iterate", D(e) ? "length" : rt), Reflect.ownKeys(e);
}
const cs = { get: Ir, set: zr, deleteProperty: Nr, has: Fr, ownKeys: Rr },
  Hr = {
    get: Ar,
    set(e, t) {
      return !0;
    },
    deleteProperty(e, t) {
      return !0;
    },
  },
  Dr = fe({}, cs, { get: Lr, set: $r }),
  ni = (e) => e,
  ln = (e) => Reflect.getPrototypeOf(e);
function Ft(e, t, n = !1, i = !1) {
  e = e.__v_raw;
  const s = K(e),
    r = K(t);
  n || (t !== r && ge(s, "get", t), ge(s, "get", r));
  const { has: o } = ln(s),
    a = i ? ni : n ? li : Ot;
  if (o.call(s, t)) return a(e.get(t));
  if (o.call(s, r)) return a(e.get(r));
  e !== s && e.get(t);
}
function Rt(e, t = !1) {
  const n = this.__v_raw,
    i = K(n),
    s = K(e);
  return (
    t || (e !== s && ge(i, "has", e), ge(i, "has", s)),
    e === s ? n.has(e) : n.has(e) || n.has(s)
  );
}
function Ht(e, t = !1) {
  return (
    (e = e.__v_raw), !t && ge(K(e), "iterate", rt), Reflect.get(e, "size", e)
  );
}
function xi(e) {
  e = K(e);
  const t = K(this);
  return ln(t).has.call(t, e) || (t.add(e), ke(t, "add", e, e)), this;
}
function Ci(e, t) {
  t = K(t);
  const n = K(this),
    { has: i, get: s } = ln(n);
  let r = i.call(n, e);
  r || ((e = K(e)), (r = i.call(n, e)));
  const o = s.call(n, e);
  return (
    n.set(e, t), r ? Pt(t, o) && ke(n, "set", e, t) : ke(n, "add", e, t), this
  );
}
function Mi(e) {
  const t = K(this),
    { has: n, get: i } = ln(t);
  let s = n.call(t, e);
  s || ((e = K(e)), (s = n.call(t, e))), i && i.call(t, e);
  const r = t.delete(e);
  return s && ke(t, "delete", e, void 0), r;
}
function Pi() {
  const e = K(this),
    t = e.size !== 0,
    n = e.clear();
  return t && ke(e, "clear", void 0, void 0), n;
}
function Dt(e, t) {
  return function (i, s) {
    const r = this,
      o = r.__v_raw,
      a = K(o),
      l = t ? ni : e ? li : Ot;
    return (
      !e && ge(a, "iterate", rt), o.forEach((f, c) => i.call(s, l(f), l(c), r))
    );
  };
}
function jt(e, t, n) {
  return function (...i) {
    const s = this.__v_raw,
      r = K(s),
      o = xt(r),
      a = e === "entries" || (e === Symbol.iterator && o),
      l = e === "keys" && o,
      f = s[e](...i),
      c = n ? ni : t ? li : Ot;
    return (
      !t && ge(r, "iterate", l ? Bn : rt),
      {
        next() {
          const { value: d, done: g } = f.next();
          return g
            ? { value: d, done: g }
            : { value: a ? [c(d[0]), c(d[1])] : c(d), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function Ge(e) {
  return function (...t) {
    return e === "delete" ? !1 : this;
  };
}
function jr() {
  const e = {
      get(r) {
        return Ft(this, r);
      },
      get size() {
        return Ht(this);
      },
      has: Rt,
      add: xi,
      set: Ci,
      delete: Mi,
      clear: Pi,
      forEach: Dt(!1, !1),
    },
    t = {
      get(r) {
        return Ft(this, r, !1, !0);
      },
      get size() {
        return Ht(this);
      },
      has: Rt,
      add: xi,
      set: Ci,
      delete: Mi,
      clear: Pi,
      forEach: Dt(!1, !0),
    },
    n = {
      get(r) {
        return Ft(this, r, !0);
      },
      get size() {
        return Ht(this, !0);
      },
      has(r) {
        return Rt.call(this, r, !0);
      },
      add: Ge("add"),
      set: Ge("set"),
      delete: Ge("delete"),
      clear: Ge("clear"),
      forEach: Dt(!0, !1),
    },
    i = {
      get(r) {
        return Ft(this, r, !0, !0);
      },
      get size() {
        return Ht(this, !0);
      },
      has(r) {
        return Rt.call(this, r, !0);
      },
      add: Ge("add"),
      set: Ge("set"),
      delete: Ge("delete"),
      clear: Ge("clear"),
      forEach: Dt(!0, !0),
    };
  return (
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      (e[r] = jt(r, !1, !1)),
        (n[r] = jt(r, !0, !1)),
        (t[r] = jt(r, !1, !0)),
        (i[r] = jt(r, !0, !0));
    }),
    [e, n, t, i]
  );
}
const [kr, Vr, Gr, Wr] = jr();
function ii(e, t) {
  const n = t ? (e ? Wr : Gr) : e ? Vr : kr;
  return (i, s, r) =>
    s === "__v_isReactive"
      ? !e
      : s === "__v_isReadonly"
      ? e
      : s === "__v_raw"
      ? i
      : Reflect.get(W(n, s) && s in i ? n : i, s, r);
}
const Ur = { get: ii(!1, !1) },
  Kr = { get: ii(!1, !0) },
  qr = { get: ii(!0, !1) },
  ps = new WeakMap(),
  hs = new WeakMap(),
  gs = new WeakMap(),
  Yr = new WeakMap();
function Xr(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Jr(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Xr(Sr(e));
}
function si(e) {
  return mt(e) ? e : ri(e, !1, cs, Ur, ps);
}
function Zr(e) {
  return ri(e, !1, Dr, Kr, hs);
}
function ms(e) {
  return ri(e, !0, Hr, qr, gs);
}
function ri(e, t, n, i, s) {
  if (!te(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const r = s.get(e);
  if (r) return r;
  const o = Jr(e);
  if (o === 0) return e;
  const a = new Proxy(e, o === 2 ? i : n);
  return s.set(e, a), a;
}
function ht(e) {
  return mt(e) ? ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
function mt(e) {
  return !!(e && e.__v_isReadonly);
}
function Zt(e) {
  return !!(e && e.__v_isShallow);
}
function vs(e) {
  return ht(e) || mt(e);
}
function K(e) {
  const t = e && e.__v_raw;
  return t ? K(t) : e;
}
function bs(e) {
  return Jt(e, "__v_skip", !0), e;
}
const Ot = (e) => (te(e) ? si(e) : e),
  li = (e) => (te(e) ? ms(e) : e);
function ws(e) {
  qe && xe && ((e = K(e)), fs(e.dep || (e.dep = Qn())));
}
function Ss(e, t) {
  (e = K(e)), e.dep && zn(e.dep);
}
function ae(e) {
  return !!(e && e.__v_isRef === !0);
}
function ue(e) {
  return Qr(e, !1);
}
function Qr(e, t) {
  return ae(e) ? e : new el(e, t);
}
class el {
  constructor(t, n) {
    (this.__v_isShallow = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this._rawValue = n ? t : K(t)),
      (this._value = n ? t : Ot(t));
  }
  get value() {
    return ws(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Zt(t) || mt(t);
    (t = n ? t : K(t)),
      Pt(t, this._rawValue) &&
        ((this._rawValue = t), (this._value = n ? t : Ot(t)), Ss(this));
  }
}
function tl(e) {
  return ae(e) ? e.value : e;
}
const nl = {
  get: (e, t, n) => tl(Reflect.get(e, t, n)),
  set: (e, t, n, i) => {
    const s = e[t];
    return ae(s) && !ae(n) ? ((s.value = n), !0) : Reflect.set(e, t, n, i);
  },
};
function ys(e) {
  return ht(e) ? e : new Proxy(e, nl);
}
var Ts;
class il {
  constructor(t, n, i, s) {
    (this._setter = n),
      (this.dep = void 0),
      (this.__v_isRef = !0),
      (this[Ts] = !1),
      (this._dirty = !0),
      (this.effect = new ei(t, () => {
        this._dirty || ((this._dirty = !0), Ss(this));
      })),
      (this.effect.computed = this),
      (this.effect.active = this._cacheable = !s),
      (this.__v_isReadonly = i);
  }
  get value() {
    const t = K(this);
    return (
      ws(t),
      (t._dirty || !t._cacheable) &&
        ((t._dirty = !1), (t._value = t.effect.run())),
      t._value
    );
  }
  set value(t) {
    this._setter(t);
  }
}
Ts = "__v_isReadonly";
function sl(e, t, n = !1) {
  let i, s;
  const r = V(e);
  return (
    r ? ((i = e), (s = Me)) : ((i = e.get), (s = e.set)),
    new il(i, s, r || !s, n)
  );
}
function Ye(e, t, n, i) {
  let s;
  try {
    s = i ? e(...i) : e();
  } catch (r) {
    on(r, t, n);
  }
  return s;
}
function Se(e, t, n, i) {
  if (V(e)) {
    const r = Ye(e, t, n, i);
    return (
      r &&
        ss(r) &&
        r.catch((o) => {
          on(o, t, n);
        }),
      r
    );
  }
  const s = [];
  for (let r = 0; r < e.length; r++) s.push(Se(e[r], t, n, i));
  return s;
}
function on(e, t, n, i = !0) {
  const s = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const o = t.proxy,
      a = n;
    for (; r; ) {
      const f = r.ec;
      if (f) {
        for (let c = 0; c < f.length; c++) if (f[c](e, o, a) === !1) return;
      }
      r = r.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Ye(l, null, 10, [e, o, a]);
      return;
    }
  }
  rl(e, n, s, i);
}
function rl(e, t, n, i = !0) {
  console.error(e);
}
let _t = !1,
  $n = !1;
const oe = [];
let $e = 0;
const gt = [];
let He = null,
  nt = 0;
const Es = Promise.resolve();
let oi = null;
function xs(e) {
  const t = oi || Es;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function ll(e) {
  let t = $e + 1,
    n = oe.length;
  for (; t < n; ) {
    const i = (t + n) >>> 1;
    It(oe[i]) < e ? (t = i + 1) : (n = i);
  }
  return t;
}
function ai(e) {
  (!oe.length || !oe.includes(e, _t && e.allowRecurse ? $e + 1 : $e)) &&
    (e.id == null ? oe.push(e) : oe.splice(ll(e.id), 0, e), Cs());
}
function Cs() {
  !_t && !$n && (($n = !0), (oi = Es.then(Ps)));
}
function ol(e) {
  const t = oe.indexOf(e);
  t > $e && oe.splice(t, 1);
}
function al(e) {
  D(e)
    ? gt.push(...e)
    : (!He || !He.includes(e, e.allowRecurse ? nt + 1 : nt)) && gt.push(e),
    Cs();
}
function Oi(e, t = _t ? $e + 1 : 0) {
  for (; t < oe.length; t++) {
    const n = oe[t];
    n && n.pre && (oe.splice(t, 1), t--, n());
  }
}
function Ms(e) {
  if (gt.length) {
    const t = [...new Set(gt)];
    if (((gt.length = 0), He)) {
      He.push(...t);
      return;
    }
    for (He = t, He.sort((n, i) => It(n) - It(i)), nt = 0; nt < He.length; nt++)
      He[nt]();
    (He = null), (nt = 0);
  }
}
const It = (e) => (e.id == null ? 1 / 0 : e.id),
  fl = (e, t) => {
    const n = It(e) - It(t);
    if (n === 0) {
      if (e.pre && !t.pre) return -1;
      if (t.pre && !e.pre) return 1;
    }
    return n;
  };
function Ps(e) {
  ($n = !1), (_t = !0), oe.sort(fl);
  const t = Me;
  try {
    for ($e = 0; $e < oe.length; $e++) {
      const n = oe[$e];
      n && n.active !== !1 && Ye(n, null, 14);
    }
  } finally {
    ($e = 0),
      (oe.length = 0),
      Ms(),
      (_t = !1),
      (oi = null),
      (oe.length || gt.length) && Ps();
  }
}
function dl(e, t, ...n) {
  if (e.isUnmounted) return;
  const i = e.vnode.props || Z;
  let s = n;
  const r = t.startsWith("update:"),
    o = r && t.slice(7);
  if (o && o in i) {
    const c = `${o === "modelValue" ? "model" : o}Modifiers`,
      { number: d, trim: g } = i[c] || Z;
    g && (s = n.map((h) => (re(h) ? h.trim() : h))), d && (s = n.map(rs));
  }
  let a,
    l = i[(a = vn(t))] || i[(a = vn(Ne(t)))];
  !l && r && (l = i[(a = vn(wt(t)))]), l && Se(l, e, 6, s);
  const f = i[a + "Once"];
  if (f) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[a]) return;
    (e.emitted[a] = !0), Se(f, e, 6, s);
  }
}
function Os(e, t, n = !1) {
  const i = t.emitsCache,
    s = i.get(e);
  if (s !== void 0) return s;
  const r = e.emits;
  let o = {},
    a = !1;
  if (!V(e)) {
    const l = (f) => {
      const c = Os(f, t, !0);
      c && ((a = !0), fe(o, c));
    };
    !n && t.mixins.length && t.mixins.forEach(l),
      e.extends && l(e.extends),
      e.mixins && e.mixins.forEach(l);
  }
  return !r && !a
    ? (te(e) && i.set(e, null), null)
    : (D(r) ? r.forEach((l) => (o[l] = null)) : fe(o, r),
      te(e) && i.set(e, o),
      o);
}
function an(e, t) {
  return !e || !tn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      W(e, t[0].toLowerCase() + t.slice(1)) || W(e, wt(t)) || W(e, t));
}
let we = null,
  _s = null;
function Qt(e) {
  const t = we;
  return (we = e), (_s = (e && e.type.__scopeId) || null), t;
}
function Te(e, t = we, n) {
  if (!t || e._n) return e;
  const i = (...s) => {
    i._d && Hi(-1);
    const r = Qt(t);
    let o;
    try {
      o = e(...s);
    } finally {
      Qt(r), i._d && Hi(1);
    }
    return o;
  };
  return (i._n = !0), (i._c = !0), (i._d = !0), i;
}
function wn(e) {
  const {
    type: t,
    vnode: n,
    proxy: i,
    withProxy: s,
    props: r,
    propsOptions: [o],
    slots: a,
    attrs: l,
    emit: f,
    render: c,
    renderCache: d,
    data: g,
    setupState: h,
    ctx: v,
    inheritAttrs: m,
  } = e;
  let S, w;
  const B = Qt(e);
  try {
    if (n.shapeFlag & 4) {
      const I = s || i;
      (S = ze(c.call(I, I, d, r, h, g, v))), (w = l);
    } else {
      const I = t;
      (S = ze(
        I.length > 1 ? I(r, { attrs: l, slots: a, emit: f }) : I(r, null)
      )),
        (w = t.props ? l : ul(l));
    }
  } catch (I) {
    (Mt.length = 0), on(I, e, 1), (S = ee(De));
  }
  let y = S;
  if (w && m !== !1) {
    const I = Object.keys(w),
      { shapeFlag: _ } = y;
    I.length && _ & 7 && (o && I.some(Yn) && (w = cl(w, o)), (y = Je(y, w)));
  }
  return (
    n.dirs && ((y = Je(y)), (y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs)),
    n.transition && (y.transition = n.transition),
    (S = y),
    Qt(B),
    S
  );
}
const ul = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || tn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  cl = (e, t) => {
    const n = {};
    for (const i in e) (!Yn(i) || !(i.slice(9) in t)) && (n[i] = e[i]);
    return n;
  };
function pl(e, t, n) {
  const { props: i, children: s, component: r } = e,
    { props: o, children: a, patchFlag: l } = t,
    f = r.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && l >= 0) {
    if (l & 1024) return !0;
    if (l & 16) return i ? _i(i, o, f) : !!o;
    if (l & 8) {
      const c = t.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        const g = c[d];
        if (o[g] !== i[g] && !an(f, g)) return !0;
      }
    }
  } else
    return (s || a) && (!a || !a.$stable)
      ? !0
      : i === o
      ? !1
      : i
      ? o
        ? _i(i, o, f)
        : !0
      : !!o;
  return !1;
}
function _i(e, t, n) {
  const i = Object.keys(t);
  if (i.length !== Object.keys(e).length) return !0;
  for (let s = 0; s < i.length; s++) {
    const r = i[s];
    if (t[r] !== e[r] && !an(n, r)) return !0;
  }
  return !1;
}
function hl({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; ) ((e = t.vnode).el = n), (t = t.parent);
}
const gl = (e) => e.__isSuspense;
function ml(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : al(e);
}
function fi(e, t) {
  if (se) {
    let n = se.provides;
    const i = se.parent && se.parent.provides;
    i === n && (n = se.provides = Object.create(i)), (n[e] = t);
  }
}
function Ut(e, t, n = !1) {
  const i = se || we;
  if (i) {
    const s =
      i.parent == null
        ? i.vnode.appContext && i.vnode.appContext.provides
        : i.parent.provides;
    if (s && e in s) return s[e];
    if (arguments.length > 1) return n && V(t) ? t.call(i.proxy) : t;
  }
}
const kt = {};
function Kt(e, t, n) {
  return Is(e, t, n);
}
function Is(
  e,
  t,
  { immediate: n, deep: i, flush: s, onTrack: r, onTrigger: o } = Z
) {
  const a = se;
  let l,
    f = !1,
    c = !1;
  if (
    (ae(e)
      ? ((l = () => e.value), (f = Zt(e)))
      : ht(e)
      ? ((l = () => e), (i = !0))
      : D(e)
      ? ((c = !0),
        (f = e.some((y) => ht(y) || Zt(y))),
        (l = () =>
          e.map((y) => {
            if (ae(y)) return y.value;
            if (ht(y)) return ct(y);
            if (V(y)) return Ye(y, a, 2);
          })))
      : V(e)
      ? t
        ? (l = () => Ye(e, a, 2))
        : (l = () => {
            if (!(a && a.isUnmounted)) return d && d(), Se(e, a, 3, [g]);
          })
      : (l = Me),
    t && i)
  ) {
    const y = l;
    l = () => ct(y());
  }
  let d,
    g = (y) => {
      d = w.onStop = () => {
        Ye(y, a, 4);
      };
    },
    h;
  if (At)
    if (
      ((g = Me),
      t ? n && Se(t, a, 3, [l(), c ? [] : void 0, g]) : l(),
      s === "sync")
    ) {
      const y = ho();
      h = y.__watcherHandles || (y.__watcherHandles = []);
    } else return Me;
  let v = c ? new Array(e.length).fill(kt) : kt;
  const m = () => {
    if (w.active)
      if (t) {
        const y = w.run();
        (i || f || (c ? y.some((I, _) => Pt(I, v[_])) : Pt(y, v))) &&
          (d && d(),
          Se(t, a, 3, [y, v === kt ? void 0 : c && v[0] === kt ? [] : v, g]),
          (v = y));
      } else w.run();
  };
  m.allowRecurse = !!t;
  let S;
  s === "sync"
    ? (S = m)
    : s === "post"
    ? (S = () => ce(m, a && a.suspense))
    : ((m.pre = !0), a && (m.id = a.uid), (S = () => ai(m)));
  const w = new ei(l, S);
  t
    ? n
      ? m()
      : (v = w.run())
    : s === "post"
    ? ce(w.run.bind(w), a && a.suspense)
    : w.run();
  const B = () => {
    w.stop(), a && a.scope && Xn(a.scope.effects, w);
  };
  return h && h.push(B), B;
}
function vl(e, t, n) {
  const i = this.proxy,
    s = re(e) ? (e.includes(".") ? Ls(i, e) : () => i[e]) : e.bind(i, i);
  let r;
  V(t) ? (r = t) : ((r = t.handler), (n = t));
  const o = se;
  vt(this);
  const a = Is(s, r.bind(i), n);
  return o ? vt(o) : lt(), a;
}
function Ls(e, t) {
  const n = t.split(".");
  return () => {
    let i = e;
    for (let s = 0; s < n.length && i; s++) i = i[n[s]];
    return i;
  };
}
function ct(e, t) {
  if (!te(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
  if ((t.add(e), ae(e))) ct(e.value, t);
  else if (D(e)) for (let n = 0; n < e.length; n++) ct(e[n], t);
  else if (br(e) || xt(e))
    e.forEach((n) => {
      ct(n, t);
    });
  else if (yr(e)) for (const n in e) ct(e[n], t);
  return e;
}
function bl() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: new Map(),
  };
  return (
    un(() => {
      e.isMounted = !0;
    }),
    cn(() => {
      e.isUnmounting = !0;
    }),
    e
  );
}
const be = [Function, Array],
  wl = {
    name: "BaseTransition",
    props: {
      mode: String,
      appear: Boolean,
      persisted: Boolean,
      onBeforeEnter: be,
      onEnter: be,
      onAfterEnter: be,
      onEnterCancelled: be,
      onBeforeLeave: be,
      onLeave: be,
      onAfterLeave: be,
      onLeaveCancelled: be,
      onBeforeAppear: be,
      onAppear: be,
      onAfterAppear: be,
      onAppearCancelled: be,
    },
    setup(e, { slots: t }) {
      const n = ro(),
        i = bl();
      let s;
      return () => {
        const r = t.default && Bs(t.default(), !0);
        if (!r || !r.length) return;
        let o = r[0];
        if (r.length > 1) {
          for (const m of r)
            if (m.type !== De) {
              o = m;
              break;
            }
        }
        const a = K(e),
          { mode: l } = a;
        if (i.isLeaving) return Sn(o);
        const f = Ii(o);
        if (!f) return Sn(o);
        const c = Nn(f, a, i, n);
        Fn(f, c);
        const d = n.subTree,
          g = d && Ii(d);
        let h = !1;
        const { getTransitionKey: v } = f.type;
        if (v) {
          const m = v();
          s === void 0 ? (s = m) : m !== s && ((s = m), (h = !0));
        }
        if (g && g.type !== De && (!it(f, g) || h)) {
          const m = Nn(g, a, i, n);
          if ((Fn(g, m), l === "out-in"))
            return (
              (i.isLeaving = !0),
              (m.afterLeave = () => {
                (i.isLeaving = !1), n.update.active !== !1 && n.update();
              }),
              Sn(o)
            );
          l === "in-out" &&
            f.type !== De &&
            (m.delayLeave = (S, w, B) => {
              const y = As(i, g);
              (y[String(g.key)] = g),
                (S._leaveCb = () => {
                  w(), (S._leaveCb = void 0), delete c.delayedLeave;
                }),
                (c.delayedLeave = B);
            });
        }
        return o;
      };
    },
  },
  Sl = wl;
function As(e, t) {
  const { leavingVNodes: n } = e;
  let i = n.get(t.type);
  return i || ((i = Object.create(null)), n.set(t.type, i)), i;
}
function Nn(e, t, n, i) {
  const {
      appear: s,
      mode: r,
      persisted: o = !1,
      onBeforeEnter: a,
      onEnter: l,
      onAfterEnter: f,
      onEnterCancelled: c,
      onBeforeLeave: d,
      onLeave: g,
      onAfterLeave: h,
      onLeaveCancelled: v,
      onBeforeAppear: m,
      onAppear: S,
      onAfterAppear: w,
      onAppearCancelled: B,
    } = t,
    y = String(e.key),
    I = As(n, e),
    _ = (C, z) => {
      C && Se(C, i, 9, z);
    },
    j = (C, z) => {
      const U = z[1];
      _(C, z),
        D(C) ? C.every((A) => A.length <= 1) && U() : C.length <= 1 && U();
    },
    Q = {
      mode: r,
      persisted: o,
      beforeEnter(C) {
        let z = a;
        if (!n.isMounted)
          if (s) z = m || a;
          else return;
        C._leaveCb && C._leaveCb(!0);
        const U = I[y];
        U && it(e, U) && U.el._leaveCb && U.el._leaveCb(), _(z, [C]);
      },
      enter(C) {
        let z = l,
          U = f,
          A = c;
        if (!n.isMounted)
          if (s) (z = S || l), (U = w || f), (A = B || c);
          else return;
        let R = !1;
        const k = (C._enterCb = (le) => {
          R ||
            ((R = !0),
            le ? _(A, [C]) : _(U, [C]),
            Q.delayedLeave && Q.delayedLeave(),
            (C._enterCb = void 0));
        });
        z ? j(z, [C, k]) : k();
      },
      leave(C, z) {
        const U = String(e.key);
        if ((C._enterCb && C._enterCb(!0), n.isUnmounting)) return z();
        _(d, [C]);
        let A = !1;
        const R = (C._leaveCb = (k) => {
          A ||
            ((A = !0),
            z(),
            k ? _(v, [C]) : _(h, [C]),
            (C._leaveCb = void 0),
            I[U] === e && delete I[U]);
        });
        (I[U] = e), g ? j(g, [C, R]) : R();
      },
      clone(C) {
        return Nn(C, t, n, i);
      },
    };
  return Q;
}
function Sn(e) {
  if (fn(e)) return (e = Je(e)), (e.children = null), e;
}
function Ii(e) {
  return fn(e) ? (e.children ? e.children[0] : void 0) : e;
}
function Fn(e, t) {
  e.shapeFlag & 6 && e.component
    ? Fn(e.component.subTree, t)
    : e.shapeFlag & 128
    ? ((e.ssContent.transition = t.clone(e.ssContent)),
      (e.ssFallback.transition = t.clone(e.ssFallback)))
    : (e.transition = t);
}
function Bs(e, t = !1, n) {
  let i = [],
    s = 0;
  for (let r = 0; r < e.length; r++) {
    let o = e[r];
    const a = n == null ? o.key : String(n) + String(o.key != null ? o.key : r);
    o.type === Be
      ? (o.patchFlag & 128 && s++, (i = i.concat(Bs(o.children, t, a))))
      : (t || o.type !== De) && i.push(a != null ? Je(o, { key: a }) : o);
  }
  if (s > 1) for (let r = 0; r < i.length; r++) i[r].patchFlag = -2;
  return i;
}
const qt = (e) => !!e.type.__asyncLoader,
  fn = (e) => e.type.__isKeepAlive;
function yl(e, t) {
  zs(e, "a", t);
}
function Tl(e, t) {
  zs(e, "da", t);
}
function zs(e, t, n = se) {
  const i =
    e.__wdc ||
    (e.__wdc = () => {
      let s = n;
      for (; s; ) {
        if (s.isDeactivated) return;
        s = s.parent;
      }
      return e();
    });
  if ((dn(t, i, n), n)) {
    let s = n.parent;
    for (; s && s.parent; )
      fn(s.parent.vnode) && El(i, t, n, s), (s = s.parent);
  }
}
function El(e, t, n, i) {
  const s = dn(t, e, i, !0);
  Ns(() => {
    Xn(i[t], s);
  }, n);
}
function dn(e, t, n = se, i = !1) {
  if (n) {
    const s = n[e] || (n[e] = []),
      r =
        t.__weh ||
        (t.__weh = (...o) => {
          if (n.isUnmounted) return;
          St(), vt(n);
          const a = Se(t, n, e, o);
          return lt(), yt(), a;
        });
    return i ? s.unshift(r) : s.push(r), r;
  }
}
const Ve =
    (e) =>
    (t, n = se) =>
      (!At || e === "sp") && dn(e, (...i) => t(...i), n),
  xl = Ve("bm"),
  un = Ve("m"),
  $s = Ve("bu"),
  di = Ve("u"),
  cn = Ve("bum"),
  Ns = Ve("um"),
  Cl = Ve("sp"),
  Ml = Ve("rtg"),
  Pl = Ve("rtc");
function Ol(e, t = se) {
  dn("ec", e, t);
}
function Qe(e, t, n, i) {
  const s = e.dirs,
    r = t && t.dirs;
  for (let o = 0; o < s.length; o++) {
    const a = s[o];
    r && (a.oldValue = r[o].value);
    let l = a.dir[i];
    l && (St(), Se(l, n, 8, [e.el, a, e, t]), yt());
  }
}
const Fs = "components";
function Li(e, t) {
  return Il(Fs, e, !0, t) || e;
}
const _l = Symbol();
function Il(e, t, n = !0, i = !1) {
  const s = we || se;
  if (s) {
    const r = s.type;
    if (e === Fs) {
      const a = uo(r, !1);
      if (a && (a === t || a === Ne(t) || a === rn(Ne(t)))) return r;
    }
    const o = Ai(s[e] || r[e], t) || Ai(s.appContext[e], t);
    return !o && i ? r : o;
  }
}
function Ai(e, t) {
  return e && (e[t] || e[Ne(t)] || e[rn(Ne(t))]);
}
const Rn = (e) => (e ? (Ks(e) ? hi(e) || e.proxy : Rn(e.parent)) : null),
  Ct = fe(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Rn(e.parent),
    $root: (e) => Rn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => ui(e),
    $forceUpdate: (e) => e.f || (e.f = () => ai(e.update)),
    $nextTick: (e) => e.n || (e.n = xs.bind(e.proxy)),
    $watch: (e) => vl.bind(e),
  }),
  yn = (e, t) => e !== Z && !e.__isScriptSetup && W(e, t),
  Ll = {
    get({ _: e }, t) {
      const {
        ctx: n,
        setupState: i,
        data: s,
        props: r,
        accessCache: o,
        type: a,
        appContext: l,
      } = e;
      let f;
      if (t[0] !== "$") {
        const h = o[t];
        if (h !== void 0)
          switch (h) {
            case 1:
              return i[t];
            case 2:
              return s[t];
            case 4:
              return n[t];
            case 3:
              return r[t];
          }
        else {
          if (yn(i, t)) return (o[t] = 1), i[t];
          if (s !== Z && W(s, t)) return (o[t] = 2), s[t];
          if ((f = e.propsOptions[0]) && W(f, t)) return (o[t] = 3), r[t];
          if (n !== Z && W(n, t)) return (o[t] = 4), n[t];
          Hn && (o[t] = 0);
        }
      }
      const c = Ct[t];
      let d, g;
      if (c) return t === "$attrs" && ge(e, "get", t), c(e);
      if ((d = a.__cssModules) && (d = d[t])) return d;
      if (n !== Z && W(n, t)) return (o[t] = 4), n[t];
      if (((g = l.config.globalProperties), W(g, t))) return g[t];
    },
    set({ _: e }, t, n) {
      const { data: i, setupState: s, ctx: r } = e;
      return yn(s, t)
        ? ((s[t] = n), !0)
        : i !== Z && W(i, t)
        ? ((i[t] = n), !0)
        : W(e.props, t) || (t[0] === "$" && t.slice(1) in e)
        ? !1
        : ((r[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: i,
          appContext: s,
          propsOptions: r,
        },
      },
      o
    ) {
      let a;
      return (
        !!n[o] ||
        (e !== Z && W(e, o)) ||
        yn(t, o) ||
        ((a = r[0]) && W(a, o)) ||
        W(i, o) ||
        W(Ct, o) ||
        W(s.config.globalProperties, o)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : W(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
let Hn = !0;
function Al(e) {
  const t = ui(e),
    n = e.proxy,
    i = e.ctx;
  (Hn = !1), t.beforeCreate && Bi(t.beforeCreate, e, "bc");
  const {
    data: s,
    computed: r,
    methods: o,
    watch: a,
    provide: l,
    inject: f,
    created: c,
    beforeMount: d,
    mounted: g,
    beforeUpdate: h,
    updated: v,
    activated: m,
    deactivated: S,
    beforeDestroy: w,
    beforeUnmount: B,
    destroyed: y,
    unmounted: I,
    render: _,
    renderTracked: j,
    renderTriggered: Q,
    errorCaptured: C,
    serverPrefetch: z,
    expose: U,
    inheritAttrs: A,
    components: R,
    directives: k,
    filters: le,
  } = t;
  if ((f && Bl(f, i, null, e.appContext.config.unwrapInjectedRef), o))
    for (const J in o) {
      const q = o[J];
      V(q) && (i[J] = q.bind(n));
    }
  if (s) {
    const J = s.call(n, n);
    te(J) && (e.data = si(J));
  }
  if (((Hn = !0), r))
    for (const J in r) {
      const q = r[J],
        Pe = V(q) ? q.bind(n, n) : V(q.get) ? q.get.bind(n, n) : Me,
        Ze = !V(q) && V(q.set) ? q.set.bind(n) : Me,
        Oe = Ys({ get: Pe, set: Ze });
      Object.defineProperty(i, J, {
        enumerable: !0,
        configurable: !0,
        get: () => Oe.value,
        set: (ve) => (Oe.value = ve),
      });
    }
  if (a) for (const J in a) Rs(a[J], i, n, J);
  if (l) {
    const J = V(l) ? l.call(n) : l;
    Reflect.ownKeys(J).forEach((q) => {
      fi(q, J[q]);
    });
  }
  c && Bi(c, e, "c");
  function ie(J, q) {
    D(q) ? q.forEach((Pe) => J(Pe.bind(n))) : q && J(q.bind(n));
  }
  if (
    (ie(xl, d),
    ie(un, g),
    ie($s, h),
    ie(di, v),
    ie(yl, m),
    ie(Tl, S),
    ie(Ol, C),
    ie(Pl, j),
    ie(Ml, Q),
    ie(cn, B),
    ie(Ns, I),
    ie(Cl, z),
    D(U))
  )
    if (U.length) {
      const J = e.exposed || (e.exposed = {});
      U.forEach((q) => {
        Object.defineProperty(J, q, {
          get: () => n[q],
          set: (Pe) => (n[q] = Pe),
        });
      });
    } else e.exposed || (e.exposed = {});
  _ && e.render === Me && (e.render = _),
    A != null && (e.inheritAttrs = A),
    R && (e.components = R),
    k && (e.directives = k);
}
function Bl(e, t, n = Me, i = !1) {
  D(e) && (e = Dn(e));
  for (const s in e) {
    const r = e[s];
    let o;
    te(r)
      ? "default" in r
        ? (o = Ut(r.from || s, r.default, !0))
        : (o = Ut(r.from || s))
      : (o = Ut(r)),
      ae(o) && i
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (a) => (o.value = a),
          })
        : (t[s] = o);
  }
}
function Bi(e, t, n) {
  Se(D(e) ? e.map((i) => i.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Rs(e, t, n, i) {
  const s = i.includes(".") ? Ls(n, i) : () => n[i];
  if (re(e)) {
    const r = t[e];
    V(r) && Kt(s, r);
  } else if (V(e)) Kt(s, e.bind(n));
  else if (te(e))
    if (D(e)) e.forEach((r) => Rs(r, t, n, i));
    else {
      const r = V(e.handler) ? e.handler.bind(n) : t[e.handler];
      V(r) && Kt(s, r, e);
    }
}
function ui(e) {
  const t = e.type,
    { mixins: n, extends: i } = t,
    {
      mixins: s,
      optionsCache: r,
      config: { optionMergeStrategies: o },
    } = e.appContext,
    a = r.get(t);
  let l;
  return (
    a
      ? (l = a)
      : !s.length && !n && !i
      ? (l = t)
      : ((l = {}), s.length && s.forEach((f) => en(l, f, o, !0)), en(l, t, o)),
    te(t) && r.set(t, l),
    l
  );
}
function en(e, t, n, i = !1) {
  const { mixins: s, extends: r } = t;
  r && en(e, r, n, !0), s && s.forEach((o) => en(e, o, n, !0));
  for (const o in t)
    if (!(i && o === "expose")) {
      const a = zl[o] || (n && n[o]);
      e[o] = a ? a(e[o], t[o]) : t[o];
    }
  return e;
}
const zl = {
  data: zi,
  props: tt,
  emits: tt,
  methods: tt,
  computed: tt,
  beforeCreate: de,
  created: de,
  beforeMount: de,
  mounted: de,
  beforeUpdate: de,
  updated: de,
  beforeDestroy: de,
  beforeUnmount: de,
  destroyed: de,
  unmounted: de,
  activated: de,
  deactivated: de,
  errorCaptured: de,
  serverPrefetch: de,
  components: tt,
  directives: tt,
  watch: Nl,
  provide: zi,
  inject: $l,
};
function zi(e, t) {
  return t
    ? e
      ? function () {
          return fe(
            V(e) ? e.call(this, this) : e,
            V(t) ? t.call(this, this) : t
          );
        }
      : t
    : e;
}
function $l(e, t) {
  return tt(Dn(e), Dn(t));
}
function Dn(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function de(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function tt(e, t) {
  return e ? fe(fe(Object.create(null), e), t) : t;
}
function Nl(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = fe(Object.create(null), e);
  for (const i in t) n[i] = de(e[i], t[i]);
  return n;
}
function Fl(e, t, n, i = !1) {
  const s = {},
    r = {};
  Jt(r, hn, 1), (e.propsDefaults = Object.create(null)), Hs(e, t, s, r);
  for (const o in e.propsOptions[0]) o in s || (s[o] = void 0);
  n ? (e.props = i ? s : Zr(s)) : e.type.props ? (e.props = s) : (e.props = r),
    (e.attrs = r);
}
function Rl(e, t, n, i) {
  const {
      props: s,
      attrs: r,
      vnode: { patchFlag: o },
    } = e,
    a = K(s),
    [l] = e.propsOptions;
  let f = !1;
  if ((i || o > 0) && !(o & 16)) {
    if (o & 8) {
      const c = e.vnode.dynamicProps;
      for (let d = 0; d < c.length; d++) {
        let g = c[d];
        if (an(e.emitsOptions, g)) continue;
        const h = t[g];
        if (l)
          if (W(r, g)) h !== r[g] && ((r[g] = h), (f = !0));
          else {
            const v = Ne(g);
            s[v] = jn(l, a, v, h, e, !1);
          }
        else h !== r[g] && ((r[g] = h), (f = !0));
      }
    }
  } else {
    Hs(e, t, s, r) && (f = !0);
    let c;
    for (const d in a)
      (!t || (!W(t, d) && ((c = wt(d)) === d || !W(t, c)))) &&
        (l
          ? n &&
            (n[d] !== void 0 || n[c] !== void 0) &&
            (s[d] = jn(l, a, d, void 0, e, !0))
          : delete s[d]);
    if (r !== a) for (const d in r) (!t || !W(t, d)) && (delete r[d], (f = !0));
  }
  f && ke(e, "set", "$attrs");
}
function Hs(e, t, n, i) {
  const [s, r] = e.propsOptions;
  let o = !1,
    a;
  if (t)
    for (let l in t) {
      if (Wt(l)) continue;
      const f = t[l];
      let c;
      s && W(s, (c = Ne(l)))
        ? !r || !r.includes(c)
          ? (n[c] = f)
          : ((a || (a = {}))[c] = f)
        : an(e.emitsOptions, l) ||
          ((!(l in i) || f !== i[l]) && ((i[l] = f), (o = !0)));
    }
  if (r) {
    const l = K(n),
      f = a || Z;
    for (let c = 0; c < r.length; c++) {
      const d = r[c];
      n[d] = jn(s, l, d, f[d], e, !W(f, d));
    }
  }
  return o;
}
function jn(e, t, n, i, s, r) {
  const o = e[n];
  if (o != null) {
    const a = W(o, "default");
    if (a && i === void 0) {
      const l = o.default;
      if (o.type !== Function && V(l)) {
        const { propsDefaults: f } = s;
        n in f ? (i = f[n]) : (vt(s), (i = f[n] = l.call(null, t)), lt());
      } else i = l;
    }
    o[0] &&
      (r && !a ? (i = !1) : o[1] && (i === "" || i === wt(n)) && (i = !0));
  }
  return i;
}
function Ds(e, t, n = !1) {
  const i = t.propsCache,
    s = i.get(e);
  if (s) return s;
  const r = e.props,
    o = {},
    a = [];
  let l = !1;
  if (!V(e)) {
    const c = (d) => {
      l = !0;
      const [g, h] = Ds(d, t, !0);
      fe(o, g), h && a.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c);
  }
  if (!r && !l) return te(e) && i.set(e, pt), pt;
  if (D(r))
    for (let c = 0; c < r.length; c++) {
      const d = Ne(r[c]);
      $i(d) && (o[d] = Z);
    }
  else if (r)
    for (const c in r) {
      const d = Ne(c);
      if ($i(d)) {
        const g = r[c],
          h = (o[d] = D(g) || V(g) ? { type: g } : Object.assign({}, g));
        if (h) {
          const v = Ri(Boolean, h.type),
            m = Ri(String, h.type);
          (h[0] = v > -1),
            (h[1] = m < 0 || v < m),
            (v > -1 || W(h, "default")) && a.push(d);
        }
      }
    }
  const f = [o, a];
  return te(e) && i.set(e, f), f;
}
function $i(e) {
  return e[0] !== "$";
}
function Ni(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function Fi(e, t) {
  return Ni(e) === Ni(t);
}
function Ri(e, t) {
  return D(t) ? t.findIndex((n) => Fi(n, e)) : V(t) && Fi(t, e) ? 0 : -1;
}
const js = (e) => e[0] === "_" || e === "$stable",
  ci = (e) => (D(e) ? e.map(ze) : [ze(e)]),
  Hl = (e, t, n) => {
    if (t._n) return t;
    const i = Te((...s) => ci(t(...s)), n);
    return (i._c = !1), i;
  },
  ks = (e, t, n) => {
    const i = e._ctx;
    for (const s in e) {
      if (js(s)) continue;
      const r = e[s];
      if (V(r)) t[s] = Hl(s, r, i);
      else if (r != null) {
        const o = ci(r);
        t[s] = () => o;
      }
    }
  },
  Vs = (e, t) => {
    const n = ci(t);
    e.slots.default = () => n;
  },
  Dl = (e, t) => {
    if (e.vnode.shapeFlag & 32) {
      const n = t._;
      n ? ((e.slots = K(t)), Jt(t, "_", n)) : ks(t, (e.slots = {}));
    } else (e.slots = {}), t && Vs(e, t);
    Jt(e.slots, hn, 1);
  },
  jl = (e, t, n) => {
    const { vnode: i, slots: s } = e;
    let r = !0,
      o = Z;
    if (i.shapeFlag & 32) {
      const a = t._;
      a
        ? n && a === 1
          ? (r = !1)
          : (fe(s, t), !n && a === 1 && delete s._)
        : ((r = !t.$stable), ks(t, s)),
        (o = t);
    } else t && (Vs(e, t), (o = { default: 1 }));
    if (r) for (const a in s) !js(a) && !(a in o) && delete s[a];
  };
function Gs() {
  return {
    app: null,
    config: {
      isNativeTag: gr,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let kl = 0;
function Vl(e, t) {
  return function (i, s = null) {
    V(i) || (i = Object.assign({}, i)), s != null && !te(s) && (s = null);
    const r = Gs(),
      o = new Set();
    let a = !1;
    const l = (r.app = {
      _uid: kl++,
      _component: i,
      _props: s,
      _container: null,
      _context: r,
      _instance: null,
      version: go,
      get config() {
        return r.config;
      },
      set config(f) {},
      use(f, ...c) {
        return (
          o.has(f) ||
            (f && V(f.install)
              ? (o.add(f), f.install(l, ...c))
              : V(f) && (o.add(f), f(l, ...c))),
          l
        );
      },
      mixin(f) {
        return r.mixins.includes(f) || r.mixins.push(f), l;
      },
      component(f, c) {
        return c ? ((r.components[f] = c), l) : r.components[f];
      },
      directive(f, c) {
        return c ? ((r.directives[f] = c), l) : r.directives[f];
      },
      mount(f, c, d) {
        if (!a) {
          const g = ee(i, s);
          return (
            (g.appContext = r),
            c && t ? t(g, f) : e(g, f, d),
            (a = !0),
            (l._container = f),
            (f.__vue_app__ = l),
            hi(g.component) || g.component.proxy
          );
        }
      },
      unmount() {
        a && (e(null, l._container), delete l._container.__vue_app__);
      },
      provide(f, c) {
        return (r.provides[f] = c), l;
      },
    });
    return l;
  };
}
function kn(e, t, n, i, s = !1) {
  if (D(e)) {
    e.forEach((g, h) => kn(g, t && (D(t) ? t[h] : t), n, i, s));
    return;
  }
  if (qt(i) && !s) return;
  const r = i.shapeFlag & 4 ? hi(i.component) || i.component.proxy : i.el,
    o = s ? null : r,
    { i: a, r: l } = e,
    f = t && t.r,
    c = a.refs === Z ? (a.refs = {}) : a.refs,
    d = a.setupState;
  if (
    (f != null &&
      f !== l &&
      (re(f)
        ? ((c[f] = null), W(d, f) && (d[f] = null))
        : ae(f) && (f.value = null)),
    V(l))
  )
    Ye(l, a, 12, [o, c]);
  else {
    const g = re(l),
      h = ae(l);
    if (g || h) {
      const v = () => {
        if (e.f) {
          const m = g ? (W(d, l) ? d[l] : c[l]) : l.value;
          s
            ? D(m) && Xn(m, r)
            : D(m)
            ? m.includes(r) || m.push(r)
            : g
            ? ((c[l] = [r]), W(d, l) && (d[l] = c[l]))
            : ((l.value = [r]), e.k && (c[e.k] = l.value));
        } else
          g
            ? ((c[l] = o), W(d, l) && (d[l] = o))
            : h && ((l.value = o), e.k && (c[e.k] = o));
      };
      o ? ((v.id = -1), ce(v, n)) : v();
    }
  }
}
const ce = ml;
function Gl(e) {
  return Wl(e);
}
function Wl(e, t) {
  const n = xr();
  n.__VUE__ = !0;
  const {
      insert: i,
      remove: s,
      patchProp: r,
      createElement: o,
      createText: a,
      createComment: l,
      setText: f,
      setElementText: c,
      parentNode: d,
      nextSibling: g,
      setScopeId: h = Me,
      insertStaticContent: v,
    } = e,
    m = (
      u,
      p,
      b,
      E = null,
      T = null,
      P = null,
      L = !1,
      M = null,
      O = !!p.dynamicChildren
    ) => {
      if (u === p) return;
      u && !it(u, p) && ((E = Nt(u)), ve(u, T, P, !0), (u = null)),
        p.patchFlag === -2 && ((O = !1), (p.dynamicChildren = null));
      const { type: x, ref: N, shapeFlag: $ } = p;
      switch (x) {
        case pn:
          S(u, p, b, E);
          break;
        case De:
          w(u, p, b, E);
          break;
        case Tn:
          u == null && B(p, b, E, L);
          break;
        case Be:
          R(u, p, b, E, T, P, L, M, O);
          break;
        default:
          $ & 1
            ? _(u, p, b, E, T, P, L, M, O)
            : $ & 6
            ? k(u, p, b, E, T, P, L, M, O)
            : ($ & 64 || $ & 128) && x.process(u, p, b, E, T, P, L, M, O, dt);
      }
      N != null && T && kn(N, u && u.ref, P, p || u, !p);
    },
    S = (u, p, b, E) => {
      if (u == null) i((p.el = a(p.children)), b, E);
      else {
        const T = (p.el = u.el);
        p.children !== u.children && f(T, p.children);
      }
    },
    w = (u, p, b, E) => {
      u == null ? i((p.el = l(p.children || "")), b, E) : (p.el = u.el);
    },
    B = (u, p, b, E) => {
      [u.el, u.anchor] = v(u.children, p, b, E, u.el, u.anchor);
    },
    y = ({ el: u, anchor: p }, b, E) => {
      let T;
      for (; u && u !== p; ) (T = g(u)), i(u, b, E), (u = T);
      i(p, b, E);
    },
    I = ({ el: u, anchor: p }) => {
      let b;
      for (; u && u !== p; ) (b = g(u)), s(u), (u = b);
      s(p);
    },
    _ = (u, p, b, E, T, P, L, M, O) => {
      (L = L || p.type === "svg"),
        u == null ? j(p, b, E, T, P, L, M, O) : z(u, p, T, P, L, M, O);
    },
    j = (u, p, b, E, T, P, L, M) => {
      let O, x;
      const { type: N, props: $, shapeFlag: F, transition: H, dirs: G } = u;
      if (
        ((O = u.el = o(u.type, P, $ && $.is, $)),
        F & 8
          ? c(O, u.children)
          : F & 16 &&
            C(u.children, O, null, E, T, P && N !== "foreignObject", L, M),
        G && Qe(u, null, E, "created"),
        $)
      ) {
        for (const Y in $)
          Y !== "value" &&
            !Wt(Y) &&
            r(O, Y, null, $[Y], P, u.children, E, T, Fe);
        "value" in $ && r(O, "value", null, $.value),
          (x = $.onVnodeBeforeMount) && Ie(x, E, u);
      }
      Q(O, u, u.scopeId, L, E), G && Qe(u, null, E, "beforeMount");
      const X = (!T || (T && !T.pendingBranch)) && H && !H.persisted;
      X && H.beforeEnter(O),
        i(O, p, b),
        ((x = $ && $.onVnodeMounted) || X || G) &&
          ce(() => {
            x && Ie(x, E, u), X && H.enter(O), G && Qe(u, null, E, "mounted");
          }, T);
    },
    Q = (u, p, b, E, T) => {
      if ((b && h(u, b), E)) for (let P = 0; P < E.length; P++) h(u, E[P]);
      if (T) {
        let P = T.subTree;
        if (p === P) {
          const L = T.vnode;
          Q(u, L, L.scopeId, L.slotScopeIds, T.parent);
        }
      }
    },
    C = (u, p, b, E, T, P, L, M, O = 0) => {
      for (let x = O; x < u.length; x++) {
        const N = (u[x] = M ? We(u[x]) : ze(u[x]));
        m(null, N, p, b, E, T, P, L, M);
      }
    },
    z = (u, p, b, E, T, P, L) => {
      const M = (p.el = u.el);
      let { patchFlag: O, dynamicChildren: x, dirs: N } = p;
      O |= u.patchFlag & 16;
      const $ = u.props || Z,
        F = p.props || Z;
      let H;
      b && et(b, !1),
        (H = F.onVnodeBeforeUpdate) && Ie(H, b, p, u),
        N && Qe(p, u, b, "beforeUpdate"),
        b && et(b, !0);
      const G = T && p.type !== "foreignObject";
      if (
        (x
          ? U(u.dynamicChildren, x, M, b, E, G, P)
          : L || q(u, p, M, null, b, E, G, P, !1),
        O > 0)
      ) {
        if (O & 16) A(M, p, $, F, b, E, T);
        else if (
          (O & 2 && $.class !== F.class && r(M, "class", null, F.class, T),
          O & 4 && r(M, "style", $.style, F.style, T),
          O & 8)
        ) {
          const X = p.dynamicProps;
          for (let Y = 0; Y < X.length; Y++) {
            const ne = X[Y],
              ye = $[ne],
              ut = F[ne];
            (ut !== ye || ne === "value") &&
              r(M, ne, ye, ut, T, u.children, b, E, Fe);
          }
        }
        O & 1 && u.children !== p.children && c(M, p.children);
      } else !L && x == null && A(M, p, $, F, b, E, T);
      ((H = F.onVnodeUpdated) || N) &&
        ce(() => {
          H && Ie(H, b, p, u), N && Qe(p, u, b, "updated");
        }, E);
    },
    U = (u, p, b, E, T, P, L) => {
      for (let M = 0; M < p.length; M++) {
        const O = u[M],
          x = p[M],
          N =
            O.el && (O.type === Be || !it(O, x) || O.shapeFlag & 70)
              ? d(O.el)
              : b;
        m(O, x, N, null, E, T, P, L, !0);
      }
    },
    A = (u, p, b, E, T, P, L) => {
      if (b !== E) {
        if (b !== Z)
          for (const M in b)
            !Wt(M) && !(M in E) && r(u, M, b[M], null, L, p.children, T, P, Fe);
        for (const M in E) {
          if (Wt(M)) continue;
          const O = E[M],
            x = b[M];
          O !== x && M !== "value" && r(u, M, x, O, L, p.children, T, P, Fe);
        }
        "value" in E && r(u, "value", b.value, E.value);
      }
    },
    R = (u, p, b, E, T, P, L, M, O) => {
      const x = (p.el = u ? u.el : a("")),
        N = (p.anchor = u ? u.anchor : a(""));
      let { patchFlag: $, dynamicChildren: F, slotScopeIds: H } = p;
      H && (M = M ? M.concat(H) : H),
        u == null
          ? (i(x, b, E), i(N, b, E), C(p.children, b, N, T, P, L, M, O))
          : $ > 0 && $ & 64 && F && u.dynamicChildren
          ? (U(u.dynamicChildren, F, b, T, P, L, M),
            (p.key != null || (T && p === T.subTree)) && Ws(u, p, !0))
          : q(u, p, b, N, T, P, L, M, O);
    },
    k = (u, p, b, E, T, P, L, M, O) => {
      (p.slotScopeIds = M),
        u == null
          ? p.shapeFlag & 512
            ? T.ctx.activate(p, b, E, L, O)
            : le(p, b, E, T, P, L, O)
          : ft(u, p, O);
    },
    le = (u, p, b, E, T, P, L) => {
      const M = (u.component = so(u, E, T));
      if ((fn(u) && (M.ctx.renderer = dt), lo(M), M.asyncDep)) {
        if ((T && T.registerDep(M, ie), !u.el)) {
          const O = (M.subTree = ee(De));
          w(null, O, p, b);
        }
        return;
      }
      ie(M, u, p, b, T, P, L);
    },
    ft = (u, p, b) => {
      const E = (p.component = u.component);
      if (pl(u, p, b))
        if (E.asyncDep && !E.asyncResolved) {
          J(E, p, b);
          return;
        } else (E.next = p), ol(E.update), E.update();
      else (p.el = u.el), (E.vnode = p);
    },
    ie = (u, p, b, E, T, P, L) => {
      const M = () => {
          if (u.isMounted) {
            let { next: N, bu: $, u: F, parent: H, vnode: G } = u,
              X = N,
              Y;
            et(u, !1),
              N ? ((N.el = G.el), J(u, N, L)) : (N = G),
              $ && bn($),
              (Y = N.props && N.props.onVnodeBeforeUpdate) && Ie(Y, H, N, G),
              et(u, !0);
            const ne = wn(u),
              ye = u.subTree;
            (u.subTree = ne),
              m(ye, ne, d(ye.el), Nt(ye), u, T, P),
              (N.el = ne.el),
              X === null && hl(u, ne.el),
              F && ce(F, T),
              (Y = N.props && N.props.onVnodeUpdated) &&
                ce(() => Ie(Y, H, N, G), T);
          } else {
            let N;
            const { el: $, props: F } = p,
              { bm: H, m: G, parent: X } = u,
              Y = qt(p);
            if (
              (et(u, !1),
              H && bn(H),
              !Y && (N = F && F.onVnodeBeforeMount) && Ie(N, X, p),
              et(u, !0),
              $ && mn)
            ) {
              const ne = () => {
                (u.subTree = wn(u)), mn($, u.subTree, u, T, null);
              };
              Y
                ? p.type.__asyncLoader().then(() => !u.isUnmounted && ne())
                : ne();
            } else {
              const ne = (u.subTree = wn(u));
              m(null, ne, b, E, u, T, P), (p.el = ne.el);
            }
            if ((G && ce(G, T), !Y && (N = F && F.onVnodeMounted))) {
              const ne = p;
              ce(() => Ie(N, X, ne), T);
            }
            (p.shapeFlag & 256 ||
              (X && qt(X.vnode) && X.vnode.shapeFlag & 256)) &&
              u.a &&
              ce(u.a, T),
              (u.isMounted = !0),
              (p = b = E = null);
          }
        },
        O = (u.effect = new ei(M, () => ai(x), u.scope)),
        x = (u.update = () => O.run());
      (x.id = u.uid), et(u, !0), x();
    },
    J = (u, p, b) => {
      p.component = u;
      const E = u.vnode.props;
      (u.vnode = p),
        (u.next = null),
        Rl(u, p.props, E, b),
        jl(u, p.children, b),
        St(),
        Oi(),
        yt();
    },
    q = (u, p, b, E, T, P, L, M, O = !1) => {
      const x = u && u.children,
        N = u ? u.shapeFlag : 0,
        $ = p.children,
        { patchFlag: F, shapeFlag: H } = p;
      if (F > 0) {
        if (F & 128) {
          Ze(x, $, b, E, T, P, L, M, O);
          return;
        } else if (F & 256) {
          Pe(x, $, b, E, T, P, L, M, O);
          return;
        }
      }
      H & 8
        ? (N & 16 && Fe(x, T, P), $ !== x && c(b, $))
        : N & 16
        ? H & 16
          ? Ze(x, $, b, E, T, P, L, M, O)
          : Fe(x, T, P, !0)
        : (N & 8 && c(b, ""), H & 16 && C($, b, E, T, P, L, M, O));
    },
    Pe = (u, p, b, E, T, P, L, M, O) => {
      (u = u || pt), (p = p || pt);
      const x = u.length,
        N = p.length,
        $ = Math.min(x, N);
      let F;
      for (F = 0; F < $; F++) {
        const H = (p[F] = O ? We(p[F]) : ze(p[F]));
        m(u[F], H, b, null, T, P, L, M, O);
      }
      x > N ? Fe(u, T, P, !0, !1, $) : C(p, b, E, T, P, L, M, O, $);
    },
    Ze = (u, p, b, E, T, P, L, M, O) => {
      let x = 0;
      const N = p.length;
      let $ = u.length - 1,
        F = N - 1;
      for (; x <= $ && x <= F; ) {
        const H = u[x],
          G = (p[x] = O ? We(p[x]) : ze(p[x]));
        if (it(H, G)) m(H, G, b, null, T, P, L, M, O);
        else break;
        x++;
      }
      for (; x <= $ && x <= F; ) {
        const H = u[$],
          G = (p[F] = O ? We(p[F]) : ze(p[F]));
        if (it(H, G)) m(H, G, b, null, T, P, L, M, O);
        else break;
        $--, F--;
      }
      if (x > $) {
        if (x <= F) {
          const H = F + 1,
            G = H < N ? p[H].el : E;
          for (; x <= F; )
            m(null, (p[x] = O ? We(p[x]) : ze(p[x])), b, G, T, P, L, M, O), x++;
        }
      } else if (x > F) for (; x <= $; ) ve(u[x], T, P, !0), x++;
      else {
        const H = x,
          G = x,
          X = new Map();
        for (x = G; x <= F; x++) {
          const pe = (p[x] = O ? We(p[x]) : ze(p[x]));
          pe.key != null && X.set(pe.key, x);
        }
        let Y,
          ne = 0;
        const ye = F - G + 1;
        let ut = !1,
          vi = 0;
        const Tt = new Array(ye);
        for (x = 0; x < ye; x++) Tt[x] = 0;
        for (x = H; x <= $; x++) {
          const pe = u[x];
          if (ne >= ye) {
            ve(pe, T, P, !0);
            continue;
          }
          let _e;
          if (pe.key != null) _e = X.get(pe.key);
          else
            for (Y = G; Y <= F; Y++)
              if (Tt[Y - G] === 0 && it(pe, p[Y])) {
                _e = Y;
                break;
              }
          _e === void 0
            ? ve(pe, T, P, !0)
            : ((Tt[_e - G] = x + 1),
              _e >= vi ? (vi = _e) : (ut = !0),
              m(pe, p[_e], b, null, T, P, L, M, O),
              ne++);
        }
        const bi = ut ? Ul(Tt) : pt;
        for (Y = bi.length - 1, x = ye - 1; x >= 0; x--) {
          const pe = G + x,
            _e = p[pe],
            wi = pe + 1 < N ? p[pe + 1].el : E;
          Tt[x] === 0
            ? m(null, _e, b, wi, T, P, L, M, O)
            : ut && (Y < 0 || x !== bi[Y] ? Oe(_e, b, wi, 2) : Y--);
        }
      }
    },
    Oe = (u, p, b, E, T = null) => {
      const { el: P, type: L, transition: M, children: O, shapeFlag: x } = u;
      if (x & 6) {
        Oe(u.component.subTree, p, b, E);
        return;
      }
      if (x & 128) {
        u.suspense.move(p, b, E);
        return;
      }
      if (x & 64) {
        L.move(u, p, b, dt);
        return;
      }
      if (L === Be) {
        i(P, p, b);
        for (let $ = 0; $ < O.length; $++) Oe(O[$], p, b, E);
        i(u.anchor, p, b);
        return;
      }
      if (L === Tn) {
        y(u, p, b);
        return;
      }
      if (E !== 2 && x & 1 && M)
        if (E === 0) M.beforeEnter(P), i(P, p, b), ce(() => M.enter(P), T);
        else {
          const { leave: $, delayLeave: F, afterLeave: H } = M,
            G = () => i(P, p, b),
            X = () => {
              $(P, () => {
                G(), H && H();
              });
            };
          F ? F(P, G, X) : X();
        }
      else i(P, p, b);
    },
    ve = (u, p, b, E = !1, T = !1) => {
      const {
        type: P,
        props: L,
        ref: M,
        children: O,
        dynamicChildren: x,
        shapeFlag: N,
        patchFlag: $,
        dirs: F,
      } = u;
      if ((M != null && kn(M, null, b, u, !0), N & 256)) {
        p.ctx.deactivate(u);
        return;
      }
      const H = N & 1 && F,
        G = !qt(u);
      let X;
      if ((G && (X = L && L.onVnodeBeforeUnmount) && Ie(X, p, u), N & 6))
        ar(u.component, b, E);
      else {
        if (N & 128) {
          u.suspense.unmount(b, E);
          return;
        }
        H && Qe(u, null, p, "beforeUnmount"),
          N & 64
            ? u.type.remove(u, p, b, T, dt, E)
            : x && (P !== Be || ($ > 0 && $ & 64))
            ? Fe(x, p, b, !1, !0)
            : ((P === Be && $ & 384) || (!T && N & 16)) && Fe(O, p, b),
          E && $t(u);
      }
      ((G && (X = L && L.onVnodeUnmounted)) || H) &&
        ce(() => {
          X && Ie(X, p, u), H && Qe(u, null, p, "unmounted");
        }, b);
    },
    $t = (u) => {
      const { type: p, el: b, anchor: E, transition: T } = u;
      if (p === Be) {
        or(b, E);
        return;
      }
      if (p === Tn) {
        I(u);
        return;
      }
      const P = () => {
        s(b), T && !T.persisted && T.afterLeave && T.afterLeave();
      };
      if (u.shapeFlag & 1 && T && !T.persisted) {
        const { leave: L, delayLeave: M } = T,
          O = () => L(b, P);
        M ? M(u.el, P, O) : O();
      } else P();
    },
    or = (u, p) => {
      let b;
      for (; u !== p; ) (b = g(u)), s(u), (u = b);
      s(p);
    },
    ar = (u, p, b) => {
      const { bum: E, scope: T, update: P, subTree: L, um: M } = u;
      E && bn(E),
        T.stop(),
        P && ((P.active = !1), ve(L, u, p, b)),
        M && ce(M, p),
        ce(() => {
          u.isUnmounted = !0;
        }, p),
        p &&
          p.pendingBranch &&
          !p.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === p.pendingId &&
          (p.deps--, p.deps === 0 && p.resolve());
    },
    Fe = (u, p, b, E = !1, T = !1, P = 0) => {
      for (let L = P; L < u.length; L++) ve(u[L], p, b, E, T);
    },
    Nt = (u) =>
      u.shapeFlag & 6
        ? Nt(u.component.subTree)
        : u.shapeFlag & 128
        ? u.suspense.next()
        : g(u.anchor || u.el),
    mi = (u, p, b) => {
      u == null
        ? p._vnode && ve(p._vnode, null, null, !0)
        : m(p._vnode || null, u, p, null, null, null, b),
        Oi(),
        Ms(),
        (p._vnode = u);
    },
    dt = {
      p: m,
      um: ve,
      m: Oe,
      r: $t,
      mt: le,
      mc: C,
      pc: q,
      pbc: U,
      n: Nt,
      o: e,
    };
  let gn, mn;
  return (
    t && ([gn, mn] = t(dt)), { render: mi, hydrate: gn, createApp: Vl(mi, gn) }
  );
}
function et({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ws(e, t, n = !1) {
  const i = e.children,
    s = t.children;
  if (D(i) && D(s))
    for (let r = 0; r < i.length; r++) {
      const o = i[r];
      let a = s[r];
      a.shapeFlag & 1 &&
        !a.dynamicChildren &&
        ((a.patchFlag <= 0 || a.patchFlag === 32) &&
          ((a = s[r] = We(s[r])), (a.el = o.el)),
        n || Ws(o, a)),
        a.type === pn && (a.el = o.el);
    }
}
function Ul(e) {
  const t = e.slice(),
    n = [0];
  let i, s, r, o, a;
  const l = e.length;
  for (i = 0; i < l; i++) {
    const f = e[i];
    if (f !== 0) {
      if (((s = n[n.length - 1]), e[s] < f)) {
        (t[i] = s), n.push(i);
        continue;
      }
      for (r = 0, o = n.length - 1; r < o; )
        (a = (r + o) >> 1), e[n[a]] < f ? (r = a + 1) : (o = a);
      f < e[n[r]] && (r > 0 && (t[i] = n[r - 1]), (n[r] = i));
    }
  }
  for (r = n.length, o = n[r - 1]; r-- > 0; ) (n[r] = o), (o = t[o]);
  return n;
}
const Kl = (e) => e.__isTeleport,
  Be = Symbol(void 0),
  pn = Symbol(void 0),
  De = Symbol(void 0),
  Tn = Symbol(void 0),
  Mt = [];
let Ce = null;
function ql(e = !1) {
  Mt.push((Ce = e ? null : []));
}
function Yl() {
  Mt.pop(), (Ce = Mt[Mt.length - 1] || null);
}
let Lt = 1;
function Hi(e) {
  Lt += e;
}
function Xl(e) {
  return (
    (e.dynamicChildren = Lt > 0 ? Ce || pt : null),
    Yl(),
    Lt > 0 && Ce && Ce.push(e),
    e
  );
}
function Jl(e, t, n, i, s) {
  return Xl(ee(e, t, n, i, s, !0));
}
function Vn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function it(e, t) {
  return e.type === t.type && e.key === t.key;
}
const hn = "__vInternal",
  Us = ({ key: e }) => e ?? null,
  Yt = ({ ref: e, ref_key: t, ref_for: n }) =>
    e != null
      ? re(e) || ae(e) || V(e)
        ? { i: we, r: e, k: t, f: !!n }
        : e
      : null;
function Zl(
  e,
  t = null,
  n = null,
  i = 0,
  s = null,
  r = e === Be ? 0 : 1,
  o = !1,
  a = !1
) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Us(t),
    ref: t && Yt(t),
    scopeId: _s,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: i,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: we,
  };
  return (
    a
      ? (pi(l, n), r & 128 && e.normalize(l))
      : n && (l.shapeFlag |= re(n) ? 8 : 16),
    Lt > 0 &&
      !o &&
      Ce &&
      (l.patchFlag > 0 || r & 6) &&
      l.patchFlag !== 32 &&
      Ce.push(l),
    l
  );
}
const ee = Ql;
function Ql(e, t = null, n = null, i = 0, s = null, r = !1) {
  if (((!e || e === _l) && (e = De), Vn(e))) {
    const a = Je(e, t, !0);
    return (
      n && pi(a, n),
      Lt > 0 &&
        !r &&
        Ce &&
        (a.shapeFlag & 6 ? (Ce[Ce.indexOf(e)] = a) : Ce.push(a)),
      (a.patchFlag |= -2),
      a
    );
  }
  if ((co(e) && (e = e.__vccOpts), t)) {
    t = eo(t);
    let { class: a, style: l } = t;
    a && !re(a) && (t.class = qn(a)),
      te(l) && (vs(l) && !D(l) && (l = fe({}, l)), (t.style = Kn(l)));
  }
  const o = re(e) ? 1 : gl(e) ? 128 : Kl(e) ? 64 : te(e) ? 4 : V(e) ? 2 : 0;
  return Zl(e, t, n, i, s, o, r, !0);
}
function eo(e) {
  return e ? (vs(e) || hn in e ? fe({}, e) : e) : null;
}
function Je(e, t, n = !1) {
  const { props: i, ref: s, patchFlag: r, children: o } = e,
    a = t ? to(i || {}, t) : i;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Us(a),
    ref:
      t && t.ref ? (n && s ? (D(s) ? s.concat(Yt(t)) : [s, Yt(t)]) : Yt(t)) : s,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: o,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Be ? (r === -1 ? 16 : r | 16) : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Je(e.ssContent),
    ssFallback: e.ssFallback && Je(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
  };
}
function Ae(e = " ", t = 0) {
  return ee(pn, null, e, t);
}
function ze(e) {
  return e == null || typeof e == "boolean"
    ? ee(De)
    : D(e)
    ? ee(Be, null, e.slice())
    : typeof e == "object"
    ? We(e)
    : ee(pn, null, String(e));
}
function We(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Je(e);
}
function pi(e, t) {
  let n = 0;
  const { shapeFlag: i } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == "object")
    if (i & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), pi(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !(hn in t)
        ? (t._ctx = we)
        : s === 3 &&
          we &&
          (we.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    V(t)
      ? ((t = { default: t, _ctx: we }), (n = 32))
      : ((t = String(t)), i & 64 ? ((n = 16), (t = [Ae(t)])) : (n = 8));
  (e.children = t), (e.shapeFlag |= n);
}
function to(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const i = e[n];
    for (const s in i)
      if (s === "class")
        t.class !== i.class && (t.class = qn([t.class, i.class]));
      else if (s === "style") t.style = Kn([t.style, i.style]);
      else if (tn(s)) {
        const r = t[s],
          o = i[s];
        o &&
          r !== o &&
          !(D(r) && r.includes(o)) &&
          (t[s] = r ? [].concat(r, o) : o);
      } else s !== "" && (t[s] = i[s]);
  }
  return t;
}
function Ie(e, t, n, i = null) {
  Se(e, t, 7, [n, i]);
}
const no = Gs();
let io = 0;
function so(e, t, n) {
  const i = e.type,
    s = (t ? t.appContext : e.appContext) || no,
    r = {
      uid: io++,
      vnode: e,
      type: i,
      parent: t,
      appContext: s,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      scope: new Cr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(s.provides),
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ds(i, s),
      emitsOptions: Os(i, s),
      emit: null,
      emitted: null,
      propsDefaults: Z,
      inheritAttrs: i.inheritAttrs,
      ctx: Z,
      data: Z,
      props: Z,
      attrs: Z,
      slots: Z,
      refs: Z,
      setupState: Z,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (r.ctx = { _: r }),
    (r.root = t ? t.root : r),
    (r.emit = dl.bind(null, r)),
    e.ce && e.ce(r),
    r
  );
}
let se = null;
const ro = () => se || we,
  vt = (e) => {
    (se = e), e.scope.on();
  },
  lt = () => {
    se && se.scope.off(), (se = null);
  };
function Ks(e) {
  return e.vnode.shapeFlag & 4;
}
let At = !1;
function lo(e, t = !1) {
  At = t;
  const { props: n, children: i } = e.vnode,
    s = Ks(e);
  Fl(e, n, s, t), Dl(e, i);
  const r = s ? oo(e, t) : void 0;
  return (At = !1), r;
}
function oo(e, t) {
  const n = e.type;
  (e.accessCache = Object.create(null)), (e.proxy = bs(new Proxy(e.ctx, Ll)));
  const { setup: i } = n;
  if (i) {
    const s = (e.setupContext = i.length > 1 ? fo(e) : null);
    vt(e), St();
    const r = Ye(i, e, 0, [e.props, s]);
    if ((yt(), lt(), ss(r))) {
      if ((r.then(lt, lt), t))
        return r
          .then((o) => {
            Di(e, o, t);
          })
          .catch((o) => {
            on(o, e, 0);
          });
      e.asyncDep = r;
    } else Di(e, r, t);
  } else qs(e, t);
}
function Di(e, t, n) {
  V(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : te(t) && (e.setupState = ys(t)),
    qs(e, n);
}
let ji;
function qs(e, t, n) {
  const i = e.type;
  if (!e.render) {
    if (!t && ji && !i.render) {
      const s = i.template || ui(e).template;
      if (s) {
        const { isCustomElement: r, compilerOptions: o } = e.appContext.config,
          { delimiters: a, compilerOptions: l } = i,
          f = fe(fe({ isCustomElement: r, delimiters: a }, o), l);
        i.render = ji(s, f);
      }
    }
    e.render = i.render || Me;
  }
  vt(e), St(), Al(e), yt(), lt();
}
function ao(e) {
  return new Proxy(e.attrs, {
    get(t, n) {
      return ge(e, "get", "$attrs"), t[n];
    },
  });
}
function fo(e) {
  const t = (i) => {
    e.exposed = i || {};
  };
  let n;
  return {
    get attrs() {
      return n || (n = ao(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function hi(e) {
  if (e.exposed)
    return (
      e.exposeProxy ||
      (e.exposeProxy = new Proxy(ys(bs(e.exposed)), {
        get(t, n) {
          if (n in t) return t[n];
          if (n in Ct) return Ct[n](e);
        },
        has(t, n) {
          return n in t || n in Ct;
        },
      }))
    );
}
function uo(e, t = !0) {
  return V(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function co(e) {
  return V(e) && "__vccOpts" in e;
}
const Ys = (e, t) => sl(e, t, At);
function Ee(e, t, n) {
  const i = arguments.length;
  return i === 2
    ? te(t) && !D(t)
      ? Vn(t)
        ? ee(e, null, [t])
        : ee(e, t)
      : ee(e, null, t)
    : (i > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : i === 3 && Vn(n) && (n = [n]),
      ee(e, t, n));
}
const po = Symbol(""),
  ho = () => Ut(po),
  go = "3.2.45",
  mo = "http://www.w3.org/2000/svg",
  st = typeof document < "u" ? document : null,
  ki = st && st.createElement("template"),
  vo = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, i) => {
      const s = t
        ? st.createElementNS(mo, e)
        : st.createElement(e, n ? { is: n } : void 0);
      return (
        e === "select" &&
          i &&
          i.multiple != null &&
          s.setAttribute("multiple", i.multiple),
        s
      );
    },
    createText: (e) => st.createTextNode(e),
    createComment: (e) => st.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => st.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, i, s, r) {
      const o = n ? n.previousSibling : t.lastChild;
      if (s && (s === r || s.nextSibling))
        for (
          ;
          t.insertBefore(s.cloneNode(!0), n),
            !(s === r || !(s = s.nextSibling));

        );
      else {
        ki.innerHTML = i ? `<svg>${e}</svg>` : e;
        const a = ki.content;
        if (i) {
          const l = a.firstChild;
          for (; l.firstChild; ) a.appendChild(l.firstChild);
          a.removeChild(l);
        }
        t.insertBefore(a, n);
      }
      return [
        o ? o.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  };
function bo(e, t, n) {
  const i = e._vtc;
  i && (t = (t ? [t, ...i] : [...i]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
      ? e.setAttribute("class", t)
      : (e.className = t);
}
function wo(e, t, n) {
  const i = e.style,
    s = re(n);
  if (n && !s) {
    for (const r in n) Gn(i, r, n[r]);
    if (t && !re(t)) for (const r in t) n[r] == null && Gn(i, r, "");
  } else {
    const r = i.display;
    s ? t !== n && (i.cssText = n) : t && e.removeAttribute("style"),
      "_vod" in e && (i.display = r);
  }
}
const Vi = /\s*!important$/;
function Gn(e, t, n) {
  if (D(n)) n.forEach((i) => Gn(e, t, i));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const i = So(e, t);
    Vi.test(n)
      ? e.setProperty(wt(i), n.replace(Vi, ""), "important")
      : (e[i] = n);
  }
}
const Gi = ["Webkit", "Moz", "ms"],
  En = {};
function So(e, t) {
  const n = En[t];
  if (n) return n;
  let i = Ne(t);
  if (i !== "filter" && i in e) return (En[t] = i);
  i = rn(i);
  for (let s = 0; s < Gi.length; s++) {
    const r = Gi[s] + i;
    if (r in e) return (En[t] = r);
  }
  return t;
}
const Wi = "http://www.w3.org/1999/xlink";
function yo(e, t, n, i, s) {
  if (i && t.startsWith("xlink:"))
    n == null
      ? e.removeAttributeNS(Wi, t.slice(6, t.length))
      : e.setAttributeNS(Wi, t, n);
  else {
    const r = hr(t);
    n == null || (r && !is(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, r ? "" : n);
  }
}
function To(e, t, n, i, s, r, o) {
  if (t === "innerHTML" || t === "textContent") {
    i && o(i, s, r), (e[t] = n ?? "");
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && !e.tagName.includes("-")) {
    e._value = n;
    const l = n ?? "";
    (e.value !== l || e.tagName === "OPTION") && (e.value = l),
      n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean"
      ? (n = is(n))
      : n == null && l === "string"
      ? ((n = ""), (a = !0))
      : l === "number" && ((n = 0), (a = !0));
  }
  try {
    e[t] = n;
  } catch {}
  a && e.removeAttribute(t);
}
function Eo(e, t, n, i) {
  e.addEventListener(t, n, i);
}
function xo(e, t, n, i) {
  e.removeEventListener(t, n, i);
}
function Co(e, t, n, i, s = null) {
  const r = e._vei || (e._vei = {}),
    o = r[t];
  if (i && o) o.value = i;
  else {
    const [a, l] = Mo(t);
    if (i) {
      const f = (r[t] = _o(i, s));
      Eo(e, a, f, l);
    } else o && (xo(e, a, o, l), (r[t] = void 0));
  }
}
const Ui = /(?:Once|Passive|Capture)$/;
function Mo(e) {
  let t;
  if (Ui.test(e)) {
    t = {};
    let i;
    for (; (i = e.match(Ui)); )
      (e = e.slice(0, e.length - i[0].length)), (t[i[0].toLowerCase()] = !0);
  }
  return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let xn = 0;
const Po = Promise.resolve(),
  Oo = () => xn || (Po.then(() => (xn = 0)), (xn = Date.now()));
function _o(e, t) {
  const n = (i) => {
    if (!i._vts) i._vts = Date.now();
    else if (i._vts <= n.attached) return;
    Se(Io(i, n.value), t, 5, [i]);
  };
  return (n.value = e), (n.attached = Oo()), n;
}
function Io(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        n.call(e), (e._stopped = !0);
      }),
      t.map((i) => (s) => !s._stopped && i && i(s))
    );
  } else return t;
}
const Ki = /^on[a-z]/,
  Lo = (e, t, n, i, s = !1, r, o, a, l) => {
    t === "class"
      ? bo(e, i, s)
      : t === "style"
      ? wo(e, n, i)
      : tn(t)
      ? Yn(t) || Co(e, t, n, i, o)
      : (
          t[0] === "."
            ? ((t = t.slice(1)), !0)
            : t[0] === "^"
            ? ((t = t.slice(1)), !1)
            : Ao(e, t, i, s)
        )
      ? To(e, t, i, r, o, a, l)
      : (t === "true-value"
          ? (e._trueValue = i)
          : t === "false-value" && (e._falseValue = i),
        yo(e, t, i, s));
  };
function Ao(e, t, n, i) {
  return i
    ? !!(
        t === "innerHTML" ||
        t === "textContent" ||
        (t in e && Ki.test(t) && V(n))
      )
    : t === "spellcheck" ||
      t === "draggable" ||
      t === "translate" ||
      t === "form" ||
      (t === "list" && e.tagName === "INPUT") ||
      (t === "type" && e.tagName === "TEXTAREA") ||
      (Ki.test(t) && re(n))
    ? !1
    : t in e;
}
const Bo = {
  name: String,
  type: String,
  css: { type: Boolean, default: !0 },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String,
};
Sl.props;
const zo = fe({ patchProp: Lo }, vo);
let qi;
function $o() {
  return qi || (qi = Gl(zo));
}
const No = (...e) => {
  const t = $o().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (i) => {
      const s = Fo(i);
      if (!s) return;
      const r = t._component;
      !V(r) && !r.render && !r.template && (r.template = s.innerHTML),
        (s.innerHTML = "");
      const o = n(s, !1, s instanceof SVGElement);
      return (
        s instanceof Element &&
          (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")),
        o
      );
    }),
    t
  );
};
function Fo(e) {
  return re(e) ? document.querySelector(e) : e;
}
function Yi(e) {
  return (
    e !== null &&
    typeof e == "object" &&
    "constructor" in e &&
    e.constructor === Object
  );
}
function gi(e = {}, t = {}) {
  Object.keys(t).forEach((n) => {
    typeof e[n] > "u"
      ? (e[n] = t[n])
      : Yi(t[n]) && Yi(e[n]) && Object.keys(t[n]).length > 0 && gi(e[n], t[n]);
  });
}
const Xs = {
  body: {},
  addEventListener() {},
  removeEventListener() {},
  activeElement: { blur() {}, nodeName: "" },
  querySelector() {
    return null;
  },
  querySelectorAll() {
    return [];
  },
  getElementById() {
    return null;
  },
  createEvent() {
    return { initEvent() {} };
  },
  createElement() {
    return {
      children: [],
      childNodes: [],
      style: {},
      setAttribute() {},
      getElementsByTagName() {
        return [];
      },
    };
  },
  createElementNS() {
    return {};
  },
  importNode() {
    return null;
  },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
};
function at() {
  const e = typeof document < "u" ? document : {};
  return gi(e, Xs), e;
}
const Ro = {
  document: Xs,
  navigator: { userAgent: "" },
  location: {
    hash: "",
    host: "",
    hostname: "",
    href: "",
    origin: "",
    pathname: "",
    protocol: "",
    search: "",
  },
  history: { replaceState() {}, pushState() {}, go() {}, back() {} },
  CustomEvent: function () {
    return this;
  },
  addEventListener() {},
  removeEventListener() {},
  getComputedStyle() {
    return {
      getPropertyValue() {
        return "";
      },
    };
  },
  Image() {},
  Date() {},
  screen: {},
  setTimeout() {},
  clearTimeout() {},
  matchMedia() {
    return {};
  },
  requestAnimationFrame(e) {
    return typeof setTimeout > "u" ? (e(), null) : setTimeout(e, 0);
  },
  cancelAnimationFrame(e) {
    typeof setTimeout > "u" || clearTimeout(e);
  },
};
function me() {
  const e = typeof window < "u" ? window : {};
  return gi(e, Ro), e;
}
function Ho(e) {
  const t = e;
  Object.keys(t).forEach((n) => {
    try {
      t[n] = null;
    } catch {}
    try {
      delete t[n];
    } catch {}
  });
}
function Wn(e, t = 0) {
  return setTimeout(e, t);
}
function Bt() {
  return Date.now();
}
function Do(e) {
  const t = me();
  let n;
  return (
    t.getComputedStyle && (n = t.getComputedStyle(e, null)),
    !n && e.currentStyle && (n = e.currentStyle),
    n || (n = e.style),
    n
  );
}
function jo(e, t = "x") {
  const n = me();
  let i, s, r;
  const o = Do(e);
  return (
    n.WebKitCSSMatrix
      ? ((s = o.transform || o.webkitTransform),
        s.split(",").length > 6 &&
          (s = s
            .split(", ")
            .map((a) => a.replace(",", "."))
            .join(", ")),
        (r = new n.WebKitCSSMatrix(s === "none" ? "" : s)))
      : ((r =
          o.MozTransform ||
          o.OTransform ||
          o.MsTransform ||
          o.msTransform ||
          o.transform ||
          o
            .getPropertyValue("transform")
            .replace("translate(", "matrix(1, 0, 0, 1,")),
        (i = r.toString().split(","))),
    t === "x" &&
      (n.WebKitCSSMatrix
        ? (s = r.m41)
        : i.length === 16
        ? (s = parseFloat(i[12]))
        : (s = parseFloat(i[4]))),
    t === "y" &&
      (n.WebKitCSSMatrix
        ? (s = r.m42)
        : i.length === 16
        ? (s = parseFloat(i[13]))
        : (s = parseFloat(i[5]))),
    s || 0
  );
}
function Vt(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function ko(e) {
  return typeof window < "u" && typeof window.HTMLElement < "u"
    ? e instanceof HTMLElement
    : e && (e.nodeType === 1 || e.nodeType === 11);
}
function he(...e) {
  const t = Object(e[0]),
    n = ["__proto__", "constructor", "prototype"];
  for (let i = 1; i < e.length; i += 1) {
    const s = e[i];
    if (s != null && !ko(s)) {
      const r = Object.keys(Object(s)).filter((o) => n.indexOf(o) < 0);
      for (let o = 0, a = r.length; o < a; o += 1) {
        const l = r[o],
          f = Object.getOwnPropertyDescriptor(s, l);
        f !== void 0 &&
          f.enumerable &&
          (Vt(t[l]) && Vt(s[l])
            ? s[l].__swiper__
              ? (t[l] = s[l])
              : he(t[l], s[l])
            : !Vt(t[l]) && Vt(s[l])
            ? ((t[l] = {}), s[l].__swiper__ ? (t[l] = s[l]) : he(t[l], s[l]))
            : (t[l] = s[l]));
      }
    }
  }
  return t;
}
function Gt(e, t, n) {
  e.style.setProperty(t, n);
}
function Js({ swiper: e, targetPosition: t, side: n }) {
  const i = me(),
    s = -e.translate;
  let r = null,
    o;
  const a = e.params.speed;
  (e.wrapperEl.style.scrollSnapType = "none"),
    i.cancelAnimationFrame(e.cssModeFrameID);
  const l = t > s ? "next" : "prev",
    f = (d, g) => (l === "next" && d >= g) || (l === "prev" && d <= g),
    c = () => {
      (o = new Date().getTime()), r === null && (r = o);
      const d = Math.max(Math.min((o - r) / a, 1), 0),
        g = 0.5 - Math.cos(d * Math.PI) / 2;
      let h = s + g * (t - s);
      if ((f(h, t) && (h = t), e.wrapperEl.scrollTo({ [n]: h }), f(h, t))) {
        (e.wrapperEl.style.overflow = "hidden"),
          (e.wrapperEl.style.scrollSnapType = ""),
          setTimeout(() => {
            (e.wrapperEl.style.overflow = ""), e.wrapperEl.scrollTo({ [n]: h });
          }),
          i.cancelAnimationFrame(e.cssModeFrameID);
        return;
      }
      e.cssModeFrameID = i.requestAnimationFrame(c);
    };
  c();
}
function je(e, t = "") {
  return [...e.children].filter((n) => n.matches(t));
}
function Zs(e, t = []) {
  const n = document.createElement(e);
  return n.classList.add(...(Array.isArray(t) ? t : [t])), n;
}
function Vo(e, t) {
  const n = [];
  for (; e.previousElementSibling; ) {
    const i = e.previousElementSibling;
    t ? i.matches(t) && n.push(i) : n.push(i), (e = i);
  }
  return n;
}
function Go(e, t) {
  const n = [];
  for (; e.nextElementSibling; ) {
    const i = e.nextElementSibling;
    t ? i.matches(t) && n.push(i) : n.push(i), (e = i);
  }
  return n;
}
function Ue(e, t) {
  return me().getComputedStyle(e, null).getPropertyValue(t);
}
function bt(e) {
  let t = e,
    n;
  if (t) {
    for (n = 0; (t = t.previousSibling) !== null; )
      t.nodeType === 1 && (n += 1);
    return n;
  }
}
function Wo(e, t) {
  const n = [];
  let i = e.parentElement;
  for (; i; ) t ? i.matches(t) && n.push(i) : n.push(i), (i = i.parentElement);
  return n;
}
function Xi(e, t, n) {
  const i = me();
  return n
    ? e[t === "width" ? "offsetWidth" : "offsetHeight"] +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === "width" ? "margin-right" : "margin-top")
        ) +
        parseFloat(
          i
            .getComputedStyle(e, null)
            .getPropertyValue(t === "width" ? "margin-left" : "margin-bottom")
        )
    : e.offsetWidth;
}
let Cn;
function Uo() {
  const e = me(),
    t = at();
  return {
    smoothScroll:
      t.documentElement && "scrollBehavior" in t.documentElement.style,
    touch: !!(
      "ontouchstart" in e ||
      (e.DocumentTouch && t instanceof e.DocumentTouch)
    ),
  };
}
function Qs() {
  return Cn || (Cn = Uo()), Cn;
}
let Mn;
function Ko({ userAgent: e } = {}) {
  const t = Qs(),
    n = me(),
    i = n.navigator.platform,
    s = e || n.navigator.userAgent,
    r = { ios: !1, android: !1 },
    o = n.screen.width,
    a = n.screen.height,
    l = s.match(/(Android);?[\s\/]+([\d.]+)?/);
  let f = s.match(/(iPad).*OS\s([\d_]+)/);
  const c = s.match(/(iPod)(.*OS\s([\d_]+))?/),
    d = !f && s.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
    g = i === "Win32";
  let h = i === "MacIntel";
  const v = [
    "1024x1366",
    "1366x1024",
    "834x1194",
    "1194x834",
    "834x1112",
    "1112x834",
    "768x1024",
    "1024x768",
    "820x1180",
    "1180x820",
    "810x1080",
    "1080x810",
  ];
  return (
    !f &&
      h &&
      t.touch &&
      v.indexOf(`${o}x${a}`) >= 0 &&
      ((f = s.match(/(Version)\/([\d.]+)/)),
      f || (f = [0, 1, "13_0_0"]),
      (h = !1)),
    l && !g && ((r.os = "android"), (r.android = !0)),
    (f || d || c) && ((r.os = "ios"), (r.ios = !0)),
    r
  );
}
function qo(e = {}) {
  return Mn || (Mn = Ko(e)), Mn;
}
let Pn;
function Yo() {
  const e = me();
  let t = !1;
  function n() {
    const i = e.navigator.userAgent.toLowerCase();
    return (
      i.indexOf("safari") >= 0 &&
      i.indexOf("chrome") < 0 &&
      i.indexOf("android") < 0
    );
  }
  if (n()) {
    const i = String(e.navigator.userAgent);
    if (i.includes("Version/")) {
      const [s, r] = i
        .split("Version/")[1]
        .split(" ")[0]
        .split(".")
        .map((o) => Number(o));
      t = s < 16 || (s === 16 && r < 2);
    }
  }
  return {
    isSafari: t || n(),
    needPerspectiveFix: t,
    isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
      e.navigator.userAgent
    ),
  };
}
function Xo() {
  return Pn || (Pn = Yo()), Pn;
}
function Jo({ swiper: e, on: t, emit: n }) {
  const i = me();
  let s = null,
    r = null;
  const o = () => {
      !e || e.destroyed || !e.initialized || (n("beforeResize"), n("resize"));
    },
    a = () => {
      !e ||
        e.destroyed ||
        !e.initialized ||
        ((s = new ResizeObserver((c) => {
          r = i.requestAnimationFrame(() => {
            const { width: d, height: g } = e;
            let h = d,
              v = g;
            c.forEach(({ contentBoxSize: m, contentRect: S, target: w }) => {
              (w && w !== e.el) ||
                ((h = S ? S.width : (m[0] || m).inlineSize),
                (v = S ? S.height : (m[0] || m).blockSize));
            }),
              (h !== d || v !== g) && o();
          });
        })),
        s.observe(e.el));
    },
    l = () => {
      r && i.cancelAnimationFrame(r),
        s && s.unobserve && e.el && (s.unobserve(e.el), (s = null));
    },
    f = () => {
      !e || e.destroyed || !e.initialized || n("orientationchange");
    };
  t("init", () => {
    if (e.params.resizeObserver && typeof i.ResizeObserver < "u") {
      a();
      return;
    }
    i.addEventListener("resize", o), i.addEventListener("orientationchange", f);
  }),
    t("destroy", () => {
      l(),
        i.removeEventListener("resize", o),
        i.removeEventListener("orientationchange", f);
    });
}
function Zo({ swiper: e, extendParams: t, on: n, emit: i }) {
  const s = [],
    r = me(),
    o = (f, c = {}) => {
      const d = r.MutationObserver || r.WebkitMutationObserver,
        g = new d((h) => {
          if (h.length === 1) {
            i("observerUpdate", h[0]);
            return;
          }
          const v = function () {
            i("observerUpdate", h[0]);
          };
          r.requestAnimationFrame
            ? r.requestAnimationFrame(v)
            : r.setTimeout(v, 0);
        });
      g.observe(f, {
        attributes: typeof c.attributes > "u" ? !0 : c.attributes,
        childList: typeof c.childList > "u" ? !0 : c.childList,
        characterData: typeof c.characterData > "u" ? !0 : c.characterData,
      }),
        s.push(g);
    },
    a = () => {
      if (e.params.observer) {
        if (e.params.observeParents) {
          const f = Wo(e.el);
          for (let c = 0; c < f.length; c += 1) o(f[c]);
        }
        o(e.el, { childList: e.params.observeSlideChildren }),
          o(e.wrapperEl, { attributes: !1 });
      }
    },
    l = () => {
      s.forEach((f) => {
        f.disconnect();
      }),
        s.splice(0, s.length);
    };
  t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
    n("init", a),
    n("destroy", l);
}
const Qo = {
  on(e, t, n) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != "function") return i;
    const s = n ? "unshift" : "push";
    return (
      e.split(" ").forEach((r) => {
        i.eventsListeners[r] || (i.eventsListeners[r] = []),
          i.eventsListeners[r][s](t);
      }),
      i
    );
  },
  once(e, t, n) {
    const i = this;
    if (!i.eventsListeners || i.destroyed || typeof t != "function") return i;
    function s(...r) {
      i.off(e, s), s.__emitterProxy && delete s.__emitterProxy, t.apply(i, r);
    }
    return (s.__emitterProxy = t), i.on(e, s, n);
  },
  onAny(e, t) {
    const n = this;
    if (!n.eventsListeners || n.destroyed || typeof e != "function") return n;
    const i = t ? "unshift" : "push";
    return n.eventsAnyListeners.indexOf(e) < 0 && n.eventsAnyListeners[i](e), n;
  },
  offAny(e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsAnyListeners) return t;
    const n = t.eventsAnyListeners.indexOf(e);
    return n >= 0 && t.eventsAnyListeners.splice(n, 1), t;
  },
  off(e, t) {
    const n = this;
    return (
      !n.eventsListeners ||
        n.destroyed ||
        !n.eventsListeners ||
        e.split(" ").forEach((i) => {
          typeof t > "u"
            ? (n.eventsListeners[i] = [])
            : n.eventsListeners[i] &&
              n.eventsListeners[i].forEach((s, r) => {
                (s === t || (s.__emitterProxy && s.__emitterProxy === t)) &&
                  n.eventsListeners[i].splice(r, 1);
              });
        }),
      n
    );
  },
  emit(...e) {
    const t = this;
    if (!t.eventsListeners || t.destroyed || !t.eventsListeners) return t;
    let n, i, s;
    return (
      typeof e[0] == "string" || Array.isArray(e[0])
        ? ((n = e[0]), (i = e.slice(1, e.length)), (s = t))
        : ((n = e[0].events), (i = e[0].data), (s = e[0].context || t)),
      i.unshift(s),
      (Array.isArray(n) ? n : n.split(" ")).forEach((o) => {
        t.eventsAnyListeners &&
          t.eventsAnyListeners.length &&
          t.eventsAnyListeners.forEach((a) => {
            a.apply(s, [o, ...i]);
          }),
          t.eventsListeners &&
            t.eventsListeners[o] &&
            t.eventsListeners[o].forEach((a) => {
              a.apply(s, i);
            });
      }),
      t
    );
  },
};
function ea() {
  const e = this;
  let t, n;
  const i = e.el;
  typeof e.params.width < "u" && e.params.width !== null
    ? (t = e.params.width)
    : (t = i.clientWidth),
    typeof e.params.height < "u" && e.params.height !== null
      ? (n = e.params.height)
      : (n = i.clientHeight),
    !((t === 0 && e.isHorizontal()) || (n === 0 && e.isVertical())) &&
      ((t =
        t -
        parseInt(Ue(i, "padding-left") || 0, 10) -
        parseInt(Ue(i, "padding-right") || 0, 10)),
      (n =
        n -
        parseInt(Ue(i, "padding-top") || 0, 10) -
        parseInt(Ue(i, "padding-bottom") || 0, 10)),
      Number.isNaN(t) && (t = 0),
      Number.isNaN(n) && (n = 0),
      Object.assign(e, {
        width: t,
        height: n,
        size: e.isHorizontal() ? t : n,
      }));
}
function ta() {
  const e = this;
  function t(A) {
    return e.isHorizontal()
      ? A
      : {
          width: "height",
          "margin-top": "margin-left",
          "margin-bottom ": "margin-right",
          "margin-left": "margin-top",
          "margin-right": "margin-bottom",
          "padding-left": "padding-top",
          "padding-right": "padding-bottom",
          marginRight: "marginBottom",
        }[A];
  }
  function n(A, R) {
    return parseFloat(A.getPropertyValue(t(R)) || 0);
  }
  const i = e.params,
    { wrapperEl: s, slidesEl: r, size: o, rtlTranslate: a, wrongRTL: l } = e,
    f = e.virtual && i.virtual.enabled,
    c = f ? e.virtual.slides.length : e.slides.length,
    d = je(r, `.${e.params.slideClass}, swiper-slide`),
    g = f ? e.virtual.slides.length : d.length;
  let h = [];
  const v = [],
    m = [];
  let S = i.slidesOffsetBefore;
  typeof S == "function" && (S = i.slidesOffsetBefore.call(e));
  let w = i.slidesOffsetAfter;
  typeof w == "function" && (w = i.slidesOffsetAfter.call(e));
  const B = e.snapGrid.length,
    y = e.slidesGrid.length;
  let I = i.spaceBetween,
    _ = -S,
    j = 0,
    Q = 0;
  if (typeof o > "u") return;
  typeof I == "string" &&
    I.indexOf("%") >= 0 &&
    (I = (parseFloat(I.replace("%", "")) / 100) * o),
    (e.virtualSize = -I),
    d.forEach((A) => {
      a ? (A.style.marginLeft = "") : (A.style.marginRight = ""),
        (A.style.marginBottom = ""),
        (A.style.marginTop = "");
    }),
    i.centeredSlides &&
      i.cssMode &&
      (Gt(s, "--swiper-centered-offset-before", ""),
      Gt(s, "--swiper-centered-offset-after", ""));
  const C = i.grid && i.grid.rows > 1 && e.grid;
  C && e.grid.initSlides(g);
  let z;
  const U =
    i.slidesPerView === "auto" &&
    i.breakpoints &&
    Object.keys(i.breakpoints).filter(
      (A) => typeof i.breakpoints[A].slidesPerView < "u"
    ).length > 0;
  for (let A = 0; A < g; A += 1) {
    z = 0;
    let R;
    if (
      (d[A] && (R = d[A]),
      C && e.grid.updateSlide(A, R, g, t),
      !(d[A] && Ue(R, "display") === "none"))
    ) {
      if (i.slidesPerView === "auto") {
        U && (d[A].style[t("width")] = "");
        const k = getComputedStyle(R),
          le = R.style.transform,
          ft = R.style.webkitTransform;
        if (
          (le && (R.style.transform = "none"),
          ft && (R.style.webkitTransform = "none"),
          i.roundLengths)
        )
          z = e.isHorizontal() ? Xi(R, "width", !0) : Xi(R, "height", !0);
        else {
          const ie = n(k, "width"),
            J = n(k, "padding-left"),
            q = n(k, "padding-right"),
            Pe = n(k, "margin-left"),
            Ze = n(k, "margin-right"),
            Oe = k.getPropertyValue("box-sizing");
          if (Oe && Oe === "border-box") z = ie + Pe + Ze;
          else {
            const { clientWidth: ve, offsetWidth: $t } = R;
            z = ie + J + q + Pe + Ze + ($t - ve);
          }
        }
        le && (R.style.transform = le),
          ft && (R.style.webkitTransform = ft),
          i.roundLengths && (z = Math.floor(z));
      } else
        (z = (o - (i.slidesPerView - 1) * I) / i.slidesPerView),
          i.roundLengths && (z = Math.floor(z)),
          d[A] && (d[A].style[t("width")] = `${z}px`);
      d[A] && (d[A].swiperSlideSize = z),
        m.push(z),
        i.centeredSlides
          ? ((_ = _ + z / 2 + j / 2 + I),
            j === 0 && A !== 0 && (_ = _ - o / 2 - I),
            A === 0 && (_ = _ - o / 2 - I),
            Math.abs(_) < 1 / 1e3 && (_ = 0),
            i.roundLengths && (_ = Math.floor(_)),
            Q % i.slidesPerGroup === 0 && h.push(_),
            v.push(_))
          : (i.roundLengths && (_ = Math.floor(_)),
            (Q - Math.min(e.params.slidesPerGroupSkip, Q)) %
              e.params.slidesPerGroup ===
              0 && h.push(_),
            v.push(_),
            (_ = _ + z + I)),
        (e.virtualSize += z + I),
        (j = z),
        (Q += 1);
    }
  }
  if (
    ((e.virtualSize = Math.max(e.virtualSize, o) + w),
    a &&
      l &&
      (i.effect === "slide" || i.effect === "coverflow") &&
      (s.style.width = `${e.virtualSize + i.spaceBetween}px`),
    i.setWrapperSize &&
      (s.style[t("width")] = `${e.virtualSize + i.spaceBetween}px`),
    C && e.grid.updateWrapperSize(z, h, t),
    !i.centeredSlides)
  ) {
    const A = [];
    for (let R = 0; R < h.length; R += 1) {
      let k = h[R];
      i.roundLengths && (k = Math.floor(k)),
        h[R] <= e.virtualSize - o && A.push(k);
    }
    (h = A),
      Math.floor(e.virtualSize - o) - Math.floor(h[h.length - 1]) > 1 &&
        h.push(e.virtualSize - o);
  }
  if (f && i.loop) {
    const A = m[0] + I;
    if (i.slidesPerGroup > 1) {
      const R = Math.ceil(
          (e.virtual.slidesBefore + e.virtual.slidesAfter) / i.slidesPerGroup
        ),
        k = A * i.slidesPerGroup;
      for (let le = 0; le < R; le += 1) h.push(h[h.length - 1] + k);
    }
    for (let R = 0; R < e.virtual.slidesBefore + e.virtual.slidesAfter; R += 1)
      i.slidesPerGroup === 1 && h.push(h[h.length - 1] + A),
        v.push(v[v.length - 1] + A),
        (e.virtualSize += A);
  }
  if ((h.length === 0 && (h = [0]), i.spaceBetween !== 0)) {
    const A = e.isHorizontal() && a ? "marginLeft" : t("marginRight");
    d.filter((R, k) =>
      !i.cssMode || i.loop ? !0 : k !== d.length - 1
    ).forEach((R) => {
      R.style[A] = `${I}px`;
    });
  }
  if (i.centeredSlides && i.centeredSlidesBounds) {
    let A = 0;
    m.forEach((k) => {
      A += k + (i.spaceBetween ? i.spaceBetween : 0);
    }),
      (A -= i.spaceBetween);
    const R = A - o;
    h = h.map((k) => (k < 0 ? -S : k > R ? R + w : k));
  }
  if (i.centerInsufficientSlides) {
    let A = 0;
    if (
      (m.forEach((R) => {
        A += R + (i.spaceBetween ? i.spaceBetween : 0);
      }),
      (A -= i.spaceBetween),
      A < o)
    ) {
      const R = (o - A) / 2;
      h.forEach((k, le) => {
        h[le] = k - R;
      }),
        v.forEach((k, le) => {
          v[le] = k + R;
        });
    }
  }
  if (
    (Object.assign(e, {
      slides: d,
      snapGrid: h,
      slidesGrid: v,
      slidesSizesGrid: m,
    }),
    i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
  ) {
    Gt(s, "--swiper-centered-offset-before", `${-h[0]}px`),
      Gt(
        s,
        "--swiper-centered-offset-after",
        `${e.size / 2 - m[m.length - 1] / 2}px`
      );
    const A = -e.snapGrid[0],
      R = -e.slidesGrid[0];
    (e.snapGrid = e.snapGrid.map((k) => k + A)),
      (e.slidesGrid = e.slidesGrid.map((k) => k + R));
  }
  if (
    (g !== c && e.emit("slidesLengthChange"),
    h.length !== B &&
      (e.params.watchOverflow && e.checkOverflow(),
      e.emit("snapGridLengthChange")),
    v.length !== y && e.emit("slidesGridLengthChange"),
    i.watchSlidesProgress && e.updateSlidesOffset(),
    !f && !i.cssMode && (i.effect === "slide" || i.effect === "fade"))
  ) {
    const A = `${i.containerModifierClass}backface-hidden`,
      R = e.el.classList.contains(A);
    g <= i.maxBackfaceHiddenSlides
      ? R || e.el.classList.add(A)
      : R && e.el.classList.remove(A);
  }
}
function na(e) {
  const t = this,
    n = [],
    i = t.virtual && t.params.virtual.enabled;
  let s = 0,
    r;
  typeof e == "number"
    ? t.setTransition(e)
    : e === !0 && t.setTransition(t.params.speed);
  const o = (a) =>
    i
      ? t.slides.filter(
          (l) => parseInt(l.getAttribute("data-swiper-slide-index"), 10) === a
        )[0]
      : t.slides[a];
  if (t.params.slidesPerView !== "auto" && t.params.slidesPerView > 1)
    if (t.params.centeredSlides)
      (t.visibleSlides || []).forEach((a) => {
        n.push(a);
      });
    else
      for (r = 0; r < Math.ceil(t.params.slidesPerView); r += 1) {
        const a = t.activeIndex + r;
        if (a > t.slides.length && !i) break;
        n.push(o(a));
      }
  else n.push(o(t.activeIndex));
  for (r = 0; r < n.length; r += 1)
    if (typeof n[r] < "u") {
      const a = n[r].offsetHeight;
      s = a > s ? a : s;
    }
  (s || s === 0) && (t.wrapperEl.style.height = `${s}px`);
}
function ia() {
  const e = this,
    t = e.slides,
    n = e.isElement
      ? e.isHorizontal()
        ? e.wrapperEl.offsetLeft
        : e.wrapperEl.offsetTop
      : 0;
  for (let i = 0; i < t.length; i += 1)
    t[i].swiperSlideOffset =
      (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - n;
}
function sa(e = (this && this.translate) || 0) {
  const t = this,
    n = t.params,
    { slides: i, rtlTranslate: s, snapGrid: r } = t;
  if (i.length === 0) return;
  typeof i[0].swiperSlideOffset > "u" && t.updateSlidesOffset();
  let o = -e;
  s && (o = e),
    i.forEach((a) => {
      a.classList.remove(n.slideVisibleClass);
    }),
    (t.visibleSlidesIndexes = []),
    (t.visibleSlides = []);
  for (let a = 0; a < i.length; a += 1) {
    const l = i[a];
    let f = l.swiperSlideOffset;
    n.cssMode && n.centeredSlides && (f -= i[0].swiperSlideOffset);
    const c =
        (o + (n.centeredSlides ? t.minTranslate() : 0) - f) /
        (l.swiperSlideSize + n.spaceBetween),
      d =
        (o - r[0] + (n.centeredSlides ? t.minTranslate() : 0) - f) /
        (l.swiperSlideSize + n.spaceBetween),
      g = -(o - f),
      h = g + t.slidesSizesGrid[a];
    ((g >= 0 && g < t.size - 1) ||
      (h > 1 && h <= t.size) ||
      (g <= 0 && h >= t.size)) &&
      (t.visibleSlides.push(l),
      t.visibleSlidesIndexes.push(a),
      i[a].classList.add(n.slideVisibleClass)),
      (l.progress = s ? -c : c),
      (l.originalProgress = s ? -d : d);
  }
}
function ra(e) {
  const t = this;
  if (typeof e > "u") {
    const c = t.rtlTranslate ? -1 : 1;
    e = (t && t.translate && t.translate * c) || 0;
  }
  const n = t.params,
    i = t.maxTranslate() - t.minTranslate();
  let { progress: s, isBeginning: r, isEnd: o, progressLoop: a } = t;
  const l = r,
    f = o;
  if (i === 0) (s = 0), (r = !0), (o = !0);
  else {
    s = (e - t.minTranslate()) / i;
    const c = Math.abs(e - t.minTranslate()) < 1,
      d = Math.abs(e - t.maxTranslate()) < 1;
    (r = c || s <= 0), (o = d || s >= 1), c && (s = 0), d && (s = 1);
  }
  if (n.loop) {
    const c = bt(
        t.slides.filter(
          (S) => S.getAttribute("data-swiper-slide-index") === "0"
        )[0]
      ),
      d = bt(
        t.slides.filter(
          (S) =>
            S.getAttribute("data-swiper-slide-index") * 1 ===
            t.slides.length - 1
        )[0]
      ),
      g = t.slidesGrid[c],
      h = t.slidesGrid[d],
      v = t.slidesGrid[t.slidesGrid.length - 1],
      m = Math.abs(e);
    m >= g ? (a = (m - g) / v) : (a = (m + v - h) / v), a > 1 && (a -= 1);
  }
  Object.assign(t, { progress: s, progressLoop: a, isBeginning: r, isEnd: o }),
    (n.watchSlidesProgress || (n.centeredSlides && n.autoHeight)) &&
      t.updateSlidesProgress(e),
    r && !l && t.emit("reachBeginning toEdge"),
    o && !f && t.emit("reachEnd toEdge"),
    ((l && !r) || (f && !o)) && t.emit("fromEdge"),
    t.emit("progress", s);
}
function la() {
  const e = this,
    { slides: t, params: n, slidesEl: i, activeIndex: s } = e,
    r = e.virtual && n.virtual.enabled,
    o = (l) => je(i, `.${n.slideClass}${l}, swiper-slide${l}`)[0];
  t.forEach((l) => {
    l.classList.remove(n.slideActiveClass, n.slideNextClass, n.slidePrevClass);
  });
  let a;
  if (r)
    if (n.loop) {
      let l = s - e.virtual.slidesBefore;
      l < 0 && (l = e.virtual.slides.length + l),
        l >= e.virtual.slides.length && (l -= e.virtual.slides.length),
        (a = o(`[data-swiper-slide-index="${l}"]`));
    } else a = o(`[data-swiper-slide-index="${s}"]`);
  else a = t[s];
  if (a) {
    a.classList.add(n.slideActiveClass);
    let l = Go(a, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !l && (l = t[0]), l && l.classList.add(n.slideNextClass);
    let f = Vo(a, `.${n.slideClass}, swiper-slide`)[0];
    n.loop && !f === 0 && (f = t[t.length - 1]),
      f && f.classList.add(n.slidePrevClass);
  }
  e.emitSlidesClasses();
}
function oa(e) {
  const { slidesGrid: t, params: n } = e,
    i = e.rtlTranslate ? e.translate : -e.translate;
  let s;
  for (let r = 0; r < t.length; r += 1)
    typeof t[r + 1] < "u"
      ? i >= t[r] && i < t[r + 1] - (t[r + 1] - t[r]) / 2
        ? (s = r)
        : i >= t[r] && i < t[r + 1] && (s = r + 1)
      : i >= t[r] && (s = r);
  return n.normalizeSlideIndex && (s < 0 || typeof s > "u") && (s = 0), s;
}
function aa(e) {
  const t = this,
    n = t.rtlTranslate ? t.translate : -t.translate,
    { snapGrid: i, params: s, activeIndex: r, realIndex: o, snapIndex: a } = t;
  let l = e,
    f;
  const c = (g) => {
    let h = g - t.virtual.slidesBefore;
    return (
      h < 0 && (h = t.virtual.slides.length + h),
      h >= t.virtual.slides.length && (h -= t.virtual.slides.length),
      h
    );
  };
  if ((typeof l > "u" && (l = oa(t)), i.indexOf(n) >= 0)) f = i.indexOf(n);
  else {
    const g = Math.min(s.slidesPerGroupSkip, l);
    f = g + Math.floor((l - g) / s.slidesPerGroup);
  }
  if ((f >= i.length && (f = i.length - 1), l === r)) {
    f !== a && ((t.snapIndex = f), t.emit("snapIndexChange")),
      t.params.loop &&
        t.virtual &&
        t.params.virtual.enabled &&
        (t.realIndex = c(l));
    return;
  }
  let d;
  t.virtual && s.virtual.enabled && s.loop
    ? (d = c(l))
    : t.slides[l]
    ? (d = parseInt(
        t.slides[l].getAttribute("data-swiper-slide-index") || l,
        10
      ))
    : (d = l),
    Object.assign(t, {
      snapIndex: f,
      realIndex: d,
      previousIndex: r,
      activeIndex: l,
    }),
    t.emit("activeIndexChange"),
    t.emit("snapIndexChange"),
    o !== d && t.emit("realIndexChange"),
    (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange");
}
function fa(e) {
  const t = this,
    n = t.params,
    i = e.closest(`.${n.slideClass}, swiper-slide`);
  let s = !1,
    r;
  if (i) {
    for (let o = 0; o < t.slides.length; o += 1)
      if (t.slides[o] === i) {
        (s = !0), (r = o);
        break;
      }
  }
  if (i && s)
    (t.clickedSlide = i),
      t.virtual && t.params.virtual.enabled
        ? (t.clickedIndex = parseInt(
            i.getAttribute("data-swiper-slide-index"),
            10
          ))
        : (t.clickedIndex = r);
  else {
    (t.clickedSlide = void 0), (t.clickedIndex = void 0);
    return;
  }
  n.slideToClickedSlide &&
    t.clickedIndex !== void 0 &&
    t.clickedIndex !== t.activeIndex &&
    t.slideToClickedSlide();
}
const da = {
  updateSize: ea,
  updateSlides: ta,
  updateAutoHeight: na,
  updateSlidesOffset: ia,
  updateSlidesProgress: sa,
  updateProgress: ra,
  updateSlidesClasses: la,
  updateActiveIndex: aa,
  updateClickedSlide: fa,
};
function ua(e = this.isHorizontal() ? "x" : "y") {
  const t = this,
    { params: n, rtlTranslate: i, translate: s, wrapperEl: r } = t;
  if (n.virtualTranslate) return i ? -s : s;
  if (n.cssMode) return s;
  let o = jo(r, e);
  return i && (o = -o), o || 0;
}
function ca(e, t) {
  const n = this,
    { rtlTranslate: i, params: s, wrapperEl: r, progress: o } = n;
  let a = 0,
    l = 0;
  const f = 0;
  n.isHorizontal() ? (a = i ? -e : e) : (l = e),
    s.roundLengths && ((a = Math.floor(a)), (l = Math.floor(l))),
    s.cssMode
      ? (r[n.isHorizontal() ? "scrollLeft" : "scrollTop"] = n.isHorizontal()
          ? -a
          : -l)
      : s.virtualTranslate ||
        (r.style.transform = `translate3d(${a}px, ${l}px, ${f}px)`),
    (n.previousTranslate = n.translate),
    (n.translate = n.isHorizontal() ? a : l);
  let c;
  const d = n.maxTranslate() - n.minTranslate();
  d === 0 ? (c = 0) : (c = (e - n.minTranslate()) / d),
    c !== o && n.updateProgress(e),
    n.emit("setTranslate", n.translate, t);
}
function pa() {
  return -this.snapGrid[0];
}
function ha() {
  return -this.snapGrid[this.snapGrid.length - 1];
}
function ga(e = 0, t = this.params.speed, n = !0, i = !0, s) {
  const r = this,
    { params: o, wrapperEl: a } = r;
  if (r.animating && o.preventInteractionOnTransition) return !1;
  const l = r.minTranslate(),
    f = r.maxTranslate();
  let c;
  if (
    (i && e > l ? (c = l) : i && e < f ? (c = f) : (c = e),
    r.updateProgress(c),
    o.cssMode)
  ) {
    const d = r.isHorizontal();
    if (t === 0) a[d ? "scrollLeft" : "scrollTop"] = -c;
    else {
      if (!r.support.smoothScroll)
        return (
          Js({ swiper: r, targetPosition: -c, side: d ? "left" : "top" }), !0
        );
      a.scrollTo({ [d ? "left" : "top"]: -c, behavior: "smooth" });
    }
    return !0;
  }
  return (
    t === 0
      ? (r.setTransition(0),
        r.setTranslate(c),
        n && (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd")))
      : (r.setTransition(t),
        r.setTranslate(c),
        n && (r.emit("beforeTransitionStart", t, s), r.emit("transitionStart")),
        r.animating ||
          ((r.animating = !0),
          r.onTranslateToWrapperTransitionEnd ||
            (r.onTranslateToWrapperTransitionEnd = function (g) {
              !r ||
                r.destroyed ||
                (g.target === this &&
                  (r.wrapperEl.removeEventListener(
                    "transitionend",
                    r.onTranslateToWrapperTransitionEnd
                  ),
                  (r.onTranslateToWrapperTransitionEnd = null),
                  delete r.onTranslateToWrapperTransitionEnd,
                  n && r.emit("transitionEnd")));
            }),
          r.wrapperEl.addEventListener(
            "transitionend",
            r.onTranslateToWrapperTransitionEnd
          ))),
    !0
  );
}
const ma = {
  getTranslate: ua,
  setTranslate: ca,
  minTranslate: pa,
  maxTranslate: ha,
  translateTo: ga,
};
function va(e, t) {
  const n = this;
  n.params.cssMode || (n.wrapperEl.style.transitionDuration = `${e}ms`),
    n.emit("setTransition", e, t);
}
function er({ swiper: e, runCallbacks: t, direction: n, step: i }) {
  const { activeIndex: s, previousIndex: r } = e;
  let o = n;
  if (
    (o || (s > r ? (o = "next") : s < r ? (o = "prev") : (o = "reset")),
    e.emit(`transition${i}`),
    t && s !== r)
  ) {
    if (o === "reset") {
      e.emit(`slideResetTransition${i}`);
      return;
    }
    e.emit(`slideChangeTransition${i}`),
      o === "next"
        ? e.emit(`slideNextTransition${i}`)
        : e.emit(`slidePrevTransition${i}`);
  }
}
function ba(e = !0, t) {
  const n = this,
    { params: i } = n;
  i.cssMode ||
    (i.autoHeight && n.updateAutoHeight(),
    er({ swiper: n, runCallbacks: e, direction: t, step: "Start" }));
}
function wa(e = !0, t) {
  const n = this,
    { params: i } = n;
  (n.animating = !1),
    !i.cssMode &&
      (n.setTransition(0),
      er({ swiper: n, runCallbacks: e, direction: t, step: "End" }));
}
const Sa = { setTransition: va, transitionStart: ba, transitionEnd: wa };
function ya(e = 0, t = this.params.speed, n = !0, i, s) {
  typeof e == "string" && (e = parseInt(e, 10));
  const r = this;
  let o = e;
  o < 0 && (o = 0);
  const {
    params: a,
    snapGrid: l,
    slidesGrid: f,
    previousIndex: c,
    activeIndex: d,
    rtlTranslate: g,
    wrapperEl: h,
    enabled: v,
  } = r;
  if ((r.animating && a.preventInteractionOnTransition) || (!v && !i && !s))
    return !1;
  const m = Math.min(r.params.slidesPerGroupSkip, o);
  let S = m + Math.floor((o - m) / r.params.slidesPerGroup);
  S >= l.length && (S = l.length - 1);
  const w = -l[S];
  if (a.normalizeSlideIndex)
    for (let y = 0; y < f.length; y += 1) {
      const I = -Math.floor(w * 100),
        _ = Math.floor(f[y] * 100),
        j = Math.floor(f[y + 1] * 100);
      typeof f[y + 1] < "u"
        ? I >= _ && I < j - (j - _) / 2
          ? (o = y)
          : I >= _ && I < j && (o = y + 1)
        : I >= _ && (o = y);
    }
  if (
    r.initialized &&
    o !== d &&
    ((!r.allowSlideNext && w < r.translate && w < r.minTranslate()) ||
      (!r.allowSlidePrev &&
        w > r.translate &&
        w > r.maxTranslate() &&
        (d || 0) !== o))
  )
    return !1;
  o !== (c || 0) && n && r.emit("beforeSlideChangeStart"), r.updateProgress(w);
  let B;
  if (
    (o > d ? (B = "next") : o < d ? (B = "prev") : (B = "reset"),
    (g && -w === r.translate) || (!g && w === r.translate))
  )
    return (
      r.updateActiveIndex(o),
      a.autoHeight && r.updateAutoHeight(),
      r.updateSlidesClasses(),
      a.effect !== "slide" && r.setTranslate(w),
      B !== "reset" && (r.transitionStart(n, B), r.transitionEnd(n, B)),
      !1
    );
  if (a.cssMode) {
    const y = r.isHorizontal(),
      I = g ? w : -w;
    if (t === 0) {
      const _ = r.virtual && r.params.virtual.enabled;
      _ &&
        ((r.wrapperEl.style.scrollSnapType = "none"),
        (r._immediateVirtual = !0)),
        _ && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0
          ? ((r._cssModeVirtualInitialSet = !0),
            requestAnimationFrame(() => {
              h[y ? "scrollLeft" : "scrollTop"] = I;
            }))
          : (h[y ? "scrollLeft" : "scrollTop"] = I),
        _ &&
          requestAnimationFrame(() => {
            (r.wrapperEl.style.scrollSnapType = ""), (r._immediateVirtual = !1);
          });
    } else {
      if (!r.support.smoothScroll)
        return (
          Js({ swiper: r, targetPosition: I, side: y ? "left" : "top" }), !0
        );
      h.scrollTo({ [y ? "left" : "top"]: I, behavior: "smooth" });
    }
    return !0;
  }
  return (
    r.setTransition(t),
    r.setTranslate(w),
    r.updateActiveIndex(o),
    r.updateSlidesClasses(),
    r.emit("beforeTransitionStart", t, i),
    r.transitionStart(n, B),
    t === 0
      ? r.transitionEnd(n, B)
      : r.animating ||
        ((r.animating = !0),
        r.onSlideToWrapperTransitionEnd ||
          (r.onSlideToWrapperTransitionEnd = function (I) {
            !r ||
              r.destroyed ||
              (I.target === this &&
                (r.wrapperEl.removeEventListener(
                  "transitionend",
                  r.onSlideToWrapperTransitionEnd
                ),
                (r.onSlideToWrapperTransitionEnd = null),
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(n, B)));
          }),
        r.wrapperEl.addEventListener(
          "transitionend",
          r.onSlideToWrapperTransitionEnd
        )),
    !0
  );
}
function Ta(e = 0, t = this.params.speed, n = !0, i) {
  typeof e == "string" && (e = parseInt(e, 10));
  const s = this;
  let r = e;
  return (
    s.params.loop &&
      (s.virtual && s.params.virtual.enabled
        ? (r = r + s.virtual.slidesBefore)
        : (r = bt(
            s.slides.filter(
              (o) => o.getAttribute("data-swiper-slide-index") * 1 === r
            )[0]
          ))),
    s.slideTo(r, t, n, i)
  );
}
function Ea(e = this.params.speed, t = !0, n) {
  const i = this,
    { enabled: s, params: r, animating: o } = i;
  if (!s) return i;
  let a = r.slidesPerGroup;
  r.slidesPerView === "auto" &&
    r.slidesPerGroup === 1 &&
    r.slidesPerGroupAuto &&
    (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
  const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : a,
    f = i.virtual && r.virtual.enabled;
  if (r.loop) {
    if (o && !f && r.loopPreventsSliding) return !1;
    i.loopFix({ direction: "next" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  return r.rewind && i.isEnd
    ? i.slideTo(0, e, t, n)
    : i.slideTo(i.activeIndex + l, e, t, n);
}
function xa(e = this.params.speed, t = !0, n) {
  const i = this,
    {
      params: s,
      snapGrid: r,
      slidesGrid: o,
      rtlTranslate: a,
      enabled: l,
      animating: f,
    } = i;
  if (!l) return i;
  const c = i.virtual && s.virtual.enabled;
  if (s.loop) {
    if (f && !c && s.loopPreventsSliding) return !1;
    i.loopFix({ direction: "prev" }), (i._clientLeft = i.wrapperEl.clientLeft);
  }
  const d = a ? i.translate : -i.translate;
  function g(w) {
    return w < 0 ? -Math.floor(Math.abs(w)) : Math.floor(w);
  }
  const h = g(d),
    v = r.map((w) => g(w));
  let m = r[v.indexOf(h) - 1];
  if (typeof m > "u" && s.cssMode) {
    let w;
    r.forEach((B, y) => {
      h >= B && (w = y);
    }),
      typeof w < "u" && (m = r[w > 0 ? w - 1 : w]);
  }
  let S = 0;
  if (
    (typeof m < "u" &&
      ((S = o.indexOf(m)),
      S < 0 && (S = i.activeIndex - 1),
      s.slidesPerView === "auto" &&
        s.slidesPerGroup === 1 &&
        s.slidesPerGroupAuto &&
        ((S = S - i.slidesPerViewDynamic("previous", !0) + 1),
        (S = Math.max(S, 0)))),
    s.rewind && i.isBeginning)
  ) {
    const w =
      i.params.virtual && i.params.virtual.enabled && i.virtual
        ? i.virtual.slides.length - 1
        : i.slides.length - 1;
    return i.slideTo(w, e, t, n);
  }
  return i.slideTo(S, e, t, n);
}
function Ca(e = this.params.speed, t = !0, n) {
  const i = this;
  return i.slideTo(i.activeIndex, e, t, n);
}
function Ma(e = this.params.speed, t = !0, n, i = 0.5) {
  const s = this;
  let r = s.activeIndex;
  const o = Math.min(s.params.slidesPerGroupSkip, r),
    a = o + Math.floor((r - o) / s.params.slidesPerGroup),
    l = s.rtlTranslate ? s.translate : -s.translate;
  if (l >= s.snapGrid[a]) {
    const f = s.snapGrid[a],
      c = s.snapGrid[a + 1];
    l - f > (c - f) * i && (r += s.params.slidesPerGroup);
  } else {
    const f = s.snapGrid[a - 1],
      c = s.snapGrid[a];
    l - f <= (c - f) * i && (r -= s.params.slidesPerGroup);
  }
  return (
    (r = Math.max(r, 0)),
    (r = Math.min(r, s.slidesGrid.length - 1)),
    s.slideTo(r, e, t, n)
  );
}
function Pa() {
  const e = this,
    { params: t, slidesEl: n } = e,
    i = t.slidesPerView === "auto" ? e.slidesPerViewDynamic() : t.slidesPerView;
  let s = e.clickedIndex,
    r;
  const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`;
  if (t.loop) {
    if (e.animating) return;
    (r = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10)),
      t.centeredSlides
        ? s < e.loopedSlides - i / 2 ||
          s > e.slides.length - e.loopedSlides + i / 2
          ? (e.loopFix(),
            (s = bt(je(n, `${o}[data-swiper-slide-index="${r}"]`)[0])),
            Wn(() => {
              e.slideTo(s);
            }))
          : e.slideTo(s)
        : s > e.slides.length - i
        ? (e.loopFix(),
          (s = bt(je(n, `${o}[data-swiper-slide-index="${r}"]`)[0])),
          Wn(() => {
            e.slideTo(s);
          }))
        : e.slideTo(s);
  } else e.slideTo(s);
}
const Oa = {
  slideTo: ya,
  slideToLoop: Ta,
  slideNext: Ea,
  slidePrev: xa,
  slideReset: Ca,
  slideToClosest: Ma,
  slideToClickedSlide: Pa,
};
function _a(e) {
  const t = this,
    { params: n, slidesEl: i } = t;
  if (!n.loop || (t.virtual && t.params.virtual.enabled)) return;
  je(i, `.${n.slideClass}, swiper-slide`).forEach((r, o) => {
    r.setAttribute("data-swiper-slide-index", o);
  }),
    t.loopFix({
      slideRealIndex: e,
      direction: n.centeredSlides ? void 0 : "next",
    });
}
function Ia({
  slideRealIndex: e,
  slideTo: t = !0,
  direction: n,
  setTranslate: i,
  activeSlideIndex: s,
  byController: r,
} = {}) {
  const o = this;
  if (!o.params.loop) return;
  o.emit("beforeLoopFix");
  const {
    slides: a,
    allowSlidePrev: l,
    allowSlideNext: f,
    slidesEl: c,
    params: d,
  } = o;
  if (
    ((o.allowSlidePrev = !0),
    (o.allowSlideNext = !0),
    o.virtual && d.virtual.enabled)
  ) {
    t &&
      (!d.centeredSlides && o.snapIndex === 0
        ? o.slideTo(o.virtual.slides.length, 0, !1, !0)
        : d.centeredSlides && o.snapIndex < d.slidesPerView
        ? o.slideTo(o.virtual.slides.length + o.snapIndex, 0, !1, !0)
        : o.snapIndex === o.snapGrid.length - 1 &&
          o.slideTo(o.virtual.slidesBefore, 0, !1, !0)),
      (o.allowSlidePrev = l),
      (o.allowSlideNext = f),
      o.emit("loopFix");
    return;
  }
  const g =
    d.slidesPerView === "auto"
      ? o.slidesPerViewDynamic()
      : Math.ceil(parseFloat(d.slidesPerView, 10));
  let h = d.loopedSlides || g;
  h % d.slidesPerGroup !== 0 &&
    (h += d.slidesPerGroup - (h % d.slidesPerGroup)),
    (o.loopedSlides = h);
  const v = [],
    m = [];
  let S = o.activeIndex;
  typeof s > "u"
    ? (s = bt(
        o.slides.filter((_) => _.classList.contains("swiper-slide-active"))[0]
      ))
    : (S = s);
  const w = n === "next" || !n,
    B = n === "prev" || !n;
  let y = 0,
    I = 0;
  if (s < h) {
    y = h - s;
    for (let _ = 0; _ < h - s; _ += 1) {
      const j = _ - Math.floor(_ / a.length) * a.length;
      v.push(a.length - j - 1);
    }
  } else if (s > o.slides.length - h * 2) {
    I = s - (o.slides.length - h * 2);
    for (let _ = 0; _ < I; _ += 1) {
      const j = _ - Math.floor(_ / a.length) * a.length;
      m.push(j);
    }
  }
  if (
    (B &&
      v.forEach((_) => {
        c.prepend(o.slides[_]);
      }),
    w &&
      m.forEach((_) => {
        c.append(o.slides[_]);
      }),
    o.recalcSlides(),
    d.watchSlidesProgress && o.updateSlidesOffset(),
    t)
  ) {
    if (v.length > 0 && B)
      if (typeof e > "u") {
        const _ = o.slidesGrid[S],
          Q = o.slidesGrid[S + y] - _;
        o.slideTo(S + y, 0, !1, !0),
          i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += Q);
      } else i && o.slideToLoop(e, 0, !1, !0);
    else if (m.length > 0 && w)
      if (typeof e > "u") {
        const _ = o.slidesGrid[S],
          Q = o.slidesGrid[S - I] - _;
        o.slideTo(S - I, 0, !1, !0),
          i && (o.touches[o.isHorizontal() ? "startX" : "startY"] += Q);
      } else o.slideToLoop(e, 0, !1, !0);
  }
  if (
    ((o.allowSlidePrev = l),
    (o.allowSlideNext = f),
    o.controller && o.controller.control && !r)
  ) {
    const _ = {
      slideRealIndex: e,
      slideTo: !1,
      direction: n,
      setTranslate: i,
      activeSlideIndex: s,
      byController: !0,
    };
    Array.isArray(o.controller.control)
      ? o.controller.control.forEach((j) => {
          j.params.loop && j.loopFix(_);
        })
      : o.controller.control instanceof o.constructor &&
        o.controller.control.params.loop &&
        o.controller.control.loopFix(_);
  }
  o.emit("loopFix");
}
function La() {
  const e = this,
    { slides: t, params: n, slidesEl: i } = e;
  if (!n.loop || (e.virtual && e.params.virtual.enabled)) return;
  e.recalcSlides();
  const s = [];
  t.forEach((r) => {
    const o =
      typeof r.swiperSlideIndex > "u"
        ? r.getAttribute("data-swiper-slide-index") * 1
        : r.swiperSlideIndex;
    s[o] = r;
  }),
    t.forEach((r) => {
      r.removeAttribute("data-swiper-slide-index");
    }),
    s.forEach((r) => {
      i.append(r);
    }),
    e.recalcSlides(),
    e.slideTo(e.realIndex, 0);
}
const Aa = { loopCreate: _a, loopFix: Ia, loopDestroy: La };
function Ba(e) {
  const t = this;
  if (
    !t.params.simulateTouch ||
    (t.params.watchOverflow && t.isLocked) ||
    t.params.cssMode
  )
    return;
  const n = t.params.touchEventsTarget === "container" ? t.el : t.wrapperEl;
  (n.style.cursor = "move"), (n.style.cursor = e ? "grabbing" : "grab");
}
function za() {
  const e = this;
  (e.params.watchOverflow && e.isLocked) ||
    e.params.cssMode ||
    (e[
      e.params.touchEventsTarget === "container" ? "el" : "wrapperEl"
    ].style.cursor = "");
}
const $a = { setGrabCursor: Ba, unsetGrabCursor: za };
function Na(e, t = this) {
  function n(i) {
    if (!i || i === at() || i === me()) return null;
    i.assignedSlot && (i = i.assignedSlot);
    const s = i.closest(e);
    return !s && !i.getRootNode ? null : s || n(i.getRootNode().host);
  }
  return n(t);
}
function Fa(e) {
  const t = this,
    n = at(),
    i = me(),
    s = t.touchEventsData;
  s.evCache.push(e);
  const { params: r, touches: o, enabled: a } = t;
  if (
    !a ||
    (!r.simulateTouch && e.pointerType === "mouse") ||
    (t.animating && r.preventInteractionOnTransition)
  )
    return;
  !t.animating && r.cssMode && r.loop && t.loopFix();
  let l = e;
  l.originalEvent && (l = l.originalEvent);
  let f = l.target;
  if (
    (r.touchEventsTarget === "wrapper" && !t.wrapperEl.contains(f)) ||
    ("which" in l && l.which === 3) ||
    ("button" in l && l.button > 0) ||
    (s.isTouched && s.isMoved)
  )
    return;
  const c = !!r.noSwipingClass && r.noSwipingClass !== "",
    d = e.composedPath ? e.composedPath() : e.path;
  c && l.target && l.target.shadowRoot && d && (f = d[0]);
  const g = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`,
    h = !!(l.target && l.target.shadowRoot);
  if (r.noSwiping && (h ? Na(g, f) : f.closest(g))) {
    t.allowClick = !0;
    return;
  }
  if (r.swipeHandler && !f.closest(r.swipeHandler)) return;
  (o.currentX = l.pageX), (o.currentY = l.pageY);
  const v = o.currentX,
    m = o.currentY,
    S = r.edgeSwipeDetection || r.iOSEdgeSwipeDetection,
    w = r.edgeSwipeThreshold || r.iOSEdgeSwipeThreshold;
  if (S && (v <= w || v >= i.innerWidth - w))
    if (S === "prevent") e.preventDefault();
    else return;
  Object.assign(s, {
    isTouched: !0,
    isMoved: !1,
    allowTouchCallbacks: !0,
    isScrolling: void 0,
    startMoving: void 0,
  }),
    (o.startX = v),
    (o.startY = m),
    (s.touchStartTime = Bt()),
    (t.allowClick = !0),
    t.updateSize(),
    (t.swipeDirection = void 0),
    r.threshold > 0 && (s.allowThresholdMove = !1);
  let B = !0;
  f.matches(s.focusableElements) &&
    ((B = !1), f.nodeName === "SELECT" && (s.isTouched = !1)),
    n.activeElement &&
      n.activeElement.matches(s.focusableElements) &&
      n.activeElement !== f &&
      n.activeElement.blur();
  const y = B && t.allowTouchMove && r.touchStartPreventDefault;
  (r.touchStartForcePreventDefault || y) &&
    !f.isContentEditable &&
    l.preventDefault(),
    t.params.freeMode &&
      t.params.freeMode.enabled &&
      t.freeMode &&
      t.animating &&
      !r.cssMode &&
      t.freeMode.onTouchStart(),
    t.emit("touchStart", l);
}
function Ra(e) {
  const t = at(),
    n = this,
    i = n.touchEventsData,
    { params: s, touches: r, rtlTranslate: o, enabled: a } = n;
  if (!a || (!s.simulateTouch && e.pointerType === "mouse")) return;
  let l = e;
  if ((l.originalEvent && (l = l.originalEvent), !i.isTouched)) {
    i.startMoving && i.isScrolling && n.emit("touchMoveOpposite", l);
    return;
  }
  const f = i.evCache.findIndex((j) => j.pointerId === l.pointerId);
  f >= 0 && (i.evCache[f] = l);
  const c = i.evCache.length > 1 ? i.evCache[0] : l,
    d = c.pageX,
    g = c.pageY;
  if (l.preventedByNestedSwiper) {
    (r.startX = d), (r.startY = g);
    return;
  }
  if (!n.allowTouchMove) {
    l.target.matches(i.focusableElements) || (n.allowClick = !1),
      i.isTouched &&
        (Object.assign(r, {
          startX: d,
          startY: g,
          prevX: n.touches.currentX,
          prevY: n.touches.currentY,
          currentX: d,
          currentY: g,
        }),
        (i.touchStartTime = Bt()));
    return;
  }
  if (s.touchReleaseOnEdges && !s.loop) {
    if (n.isVertical()) {
      if (
        (g < r.startY && n.translate <= n.maxTranslate()) ||
        (g > r.startY && n.translate >= n.minTranslate())
      ) {
        (i.isTouched = !1), (i.isMoved = !1);
        return;
      }
    } else if (
      (d < r.startX && n.translate <= n.maxTranslate()) ||
      (d > r.startX && n.translate >= n.minTranslate())
    )
      return;
  }
  if (
    t.activeElement &&
    l.target === t.activeElement &&
    l.target.matches(i.focusableElements)
  ) {
    (i.isMoved = !0), (n.allowClick = !1);
    return;
  }
  if (
    (i.allowTouchCallbacks && n.emit("touchMove", l),
    l.targetTouches && l.targetTouches.length > 1)
  )
    return;
  (r.currentX = d), (r.currentY = g);
  const h = r.currentX - r.startX,
    v = r.currentY - r.startY;
  if (n.params.threshold && Math.sqrt(h ** 2 + v ** 2) < n.params.threshold)
    return;
  if (typeof i.isScrolling > "u") {
    let j;
    (n.isHorizontal() && r.currentY === r.startY) ||
    (n.isVertical() && r.currentX === r.startX)
      ? (i.isScrolling = !1)
      : h * h + v * v >= 25 &&
        ((j = (Math.atan2(Math.abs(v), Math.abs(h)) * 180) / Math.PI),
        (i.isScrolling = n.isHorizontal()
          ? j > s.touchAngle
          : 90 - j > s.touchAngle));
  }
  if (
    (i.isScrolling && n.emit("touchMoveOpposite", l),
    typeof i.startMoving > "u" &&
      (r.currentX !== r.startX || r.currentY !== r.startY) &&
      (i.startMoving = !0),
    i.isScrolling ||
      (n.zoom &&
        n.params.zoom &&
        n.params.zoom.enabled &&
        i.evCache.length > 1))
  ) {
    i.isTouched = !1;
    return;
  }
  if (!i.startMoving) return;
  (n.allowClick = !1),
    !s.cssMode && l.cancelable && l.preventDefault(),
    s.touchMoveStopPropagation && !s.nested && l.stopPropagation();
  let m = n.isHorizontal() ? h : v,
    S = n.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
  s.oneWayMovement &&
    ((m = Math.abs(m) * (o ? 1 : -1)), (S = Math.abs(S) * (o ? 1 : -1))),
    (r.diff = m),
    (m *= s.touchRatio),
    o && ((m = -m), (S = -S));
  const w = n.touchesDirection;
  (n.swipeDirection = m > 0 ? "prev" : "next"),
    (n.touchesDirection = S > 0 ? "prev" : "next");
  const B =
    n.params.loop && !(n.virtual && n.params.virtual.enabled) && !s.cssMode;
  if (!i.isMoved) {
    if (
      (B && n.loopFix({ direction: n.swipeDirection }),
      (i.startTranslate = n.getTranslate()),
      n.setTransition(0),
      n.animating)
    ) {
      const j = new window.CustomEvent("transitionend", {
        bubbles: !0,
        cancelable: !0,
      });
      n.wrapperEl.dispatchEvent(j);
    }
    (i.allowMomentumBounce = !1),
      s.grabCursor &&
        (n.allowSlideNext === !0 || n.allowSlidePrev === !0) &&
        n.setGrabCursor(!0),
      n.emit("sliderFirstMove", l);
  }
  let y;
  i.isMoved &&
    w !== n.touchesDirection &&
    B &&
    Math.abs(m) >= 1 &&
    (n.loopFix({ direction: n.swipeDirection, setTranslate: !0 }), (y = !0)),
    n.emit("sliderMove", l),
    (i.isMoved = !0),
    (i.currentTranslate = m + i.startTranslate);
  let I = !0,
    _ = s.resistanceRatio;
  if (
    (s.touchReleaseOnEdges && (_ = 0),
    m > 0
      ? (B &&
          !y &&
          i.currentTranslate >
            (s.centeredSlides
              ? n.minTranslate() - n.size / 2
              : n.minTranslate()) &&
          n.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0,
          }),
        i.currentTranslate > n.minTranslate() &&
          ((I = !1),
          s.resistance &&
            (i.currentTranslate =
              n.minTranslate() -
              1 +
              (-n.minTranslate() + i.startTranslate + m) ** _)))
      : m < 0 &&
        (B &&
          !y &&
          i.currentTranslate <
            (s.centeredSlides
              ? n.maxTranslate() + n.size / 2
              : n.maxTranslate()) &&
          n.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex:
              n.slides.length -
              (s.slidesPerView === "auto"
                ? n.slidesPerViewDynamic()
                : Math.ceil(parseFloat(s.slidesPerView, 10))),
          }),
        i.currentTranslate < n.maxTranslate() &&
          ((I = !1),
          s.resistance &&
            (i.currentTranslate =
              n.maxTranslate() +
              1 -
              (n.maxTranslate() - i.startTranslate - m) ** _))),
    I && (l.preventedByNestedSwiper = !0),
    !n.allowSlideNext &&
      n.swipeDirection === "next" &&
      i.currentTranslate < i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !n.allowSlidePrev &&
      n.swipeDirection === "prev" &&
      i.currentTranslate > i.startTranslate &&
      (i.currentTranslate = i.startTranslate),
    !n.allowSlidePrev &&
      !n.allowSlideNext &&
      (i.currentTranslate = i.startTranslate),
    s.threshold > 0)
  )
    if (Math.abs(m) > s.threshold || i.allowThresholdMove) {
      if (!i.allowThresholdMove) {
        (i.allowThresholdMove = !0),
          (r.startX = r.currentX),
          (r.startY = r.currentY),
          (i.currentTranslate = i.startTranslate),
          (r.diff = n.isHorizontal()
            ? r.currentX - r.startX
            : r.currentY - r.startY);
        return;
      }
    } else {
      i.currentTranslate = i.startTranslate;
      return;
    }
  !s.followFinger ||
    s.cssMode ||
    (((s.freeMode && s.freeMode.enabled && n.freeMode) ||
      s.watchSlidesProgress) &&
      (n.updateActiveIndex(), n.updateSlidesClasses()),
    n.params.freeMode &&
      s.freeMode.enabled &&
      n.freeMode &&
      n.freeMode.onTouchMove(),
    n.updateProgress(i.currentTranslate),
    n.setTranslate(i.currentTranslate));
}
function Ha(e) {
  const t = this,
    n = t.touchEventsData,
    i = n.evCache.findIndex((y) => y.pointerId === e.pointerId);
  if (
    (i >= 0 && n.evCache.splice(i, 1),
    ["pointercancel", "pointerout", "pointerleave"].includes(e.type))
  )
    return;
  const {
    params: s,
    touches: r,
    rtlTranslate: o,
    slidesGrid: a,
    enabled: l,
  } = t;
  if (!l || (!s.simulateTouch && e.pointerType === "mouse")) return;
  let f = e;
  if (
    (f.originalEvent && (f = f.originalEvent),
    n.allowTouchCallbacks && t.emit("touchEnd", f),
    (n.allowTouchCallbacks = !1),
    !n.isTouched)
  ) {
    n.isMoved && s.grabCursor && t.setGrabCursor(!1),
      (n.isMoved = !1),
      (n.startMoving = !1);
    return;
  }
  s.grabCursor &&
    n.isMoved &&
    n.isTouched &&
    (t.allowSlideNext === !0 || t.allowSlidePrev === !0) &&
    t.setGrabCursor(!1);
  const c = Bt(),
    d = c - n.touchStartTime;
  if (t.allowClick) {
    const y = f.path || (f.composedPath && f.composedPath());
    t.updateClickedSlide((y && y[0]) || f.target),
      t.emit("tap click", f),
      d < 300 &&
        c - n.lastClickTime < 300 &&
        t.emit("doubleTap doubleClick", f);
  }
  if (
    ((n.lastClickTime = Bt()),
    Wn(() => {
      t.destroyed || (t.allowClick = !0);
    }),
    !n.isTouched ||
      !n.isMoved ||
      !t.swipeDirection ||
      r.diff === 0 ||
      n.currentTranslate === n.startTranslate)
  ) {
    (n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1);
    return;
  }
  (n.isTouched = !1), (n.isMoved = !1), (n.startMoving = !1);
  let g;
  if (
    (s.followFinger
      ? (g = o ? t.translate : -t.translate)
      : (g = -n.currentTranslate),
    s.cssMode)
  )
    return;
  if (t.params.freeMode && s.freeMode.enabled) {
    t.freeMode.onTouchEnd({ currentPos: g });
    return;
  }
  let h = 0,
    v = t.slidesSizesGrid[0];
  for (
    let y = 0;
    y < a.length;
    y += y < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup
  ) {
    const I = y < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
    typeof a[y + I] < "u"
      ? g >= a[y] && g < a[y + I] && ((h = y), (v = a[y + I] - a[y]))
      : g >= a[y] && ((h = y), (v = a[a.length - 1] - a[a.length - 2]));
  }
  let m = null,
    S = null;
  s.rewind &&
    (t.isBeginning
      ? (S =
          t.params.virtual && t.params.virtual.enabled && t.virtual
            ? t.virtual.slides.length - 1
            : t.slides.length - 1)
      : t.isEnd && (m = 0));
  const w = (g - a[h]) / v,
    B = h < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
  if (d > s.longSwipesMs) {
    if (!s.longSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.swipeDirection === "next" &&
      (w >= s.longSwipesRatio
        ? t.slideTo(s.rewind && t.isEnd ? m : h + B)
        : t.slideTo(h)),
      t.swipeDirection === "prev" &&
        (w > 1 - s.longSwipesRatio
          ? t.slideTo(h + B)
          : S !== null && w < 0 && Math.abs(w) > s.longSwipesRatio
          ? t.slideTo(S)
          : t.slideTo(h));
  } else {
    if (!s.shortSwipes) {
      t.slideTo(t.activeIndex);
      return;
    }
    t.navigation &&
    (f.target === t.navigation.nextEl || f.target === t.navigation.prevEl)
      ? f.target === t.navigation.nextEl
        ? t.slideTo(h + B)
        : t.slideTo(h)
      : (t.swipeDirection === "next" && t.slideTo(m !== null ? m : h + B),
        t.swipeDirection === "prev" && t.slideTo(S !== null ? S : h));
  }
}
let Ji;
function Zi() {
  const e = this,
    { params: t, el: n } = e;
  if (n && n.offsetWidth === 0) return;
  t.breakpoints && e.setBreakpoint();
  const { allowSlideNext: i, allowSlidePrev: s, snapGrid: r } = e,
    o = e.virtual && e.params.virtual.enabled;
  (e.allowSlideNext = !0),
    (e.allowSlidePrev = !0),
    e.updateSize(),
    e.updateSlides(),
    e.updateSlidesClasses();
  const a = o && t.loop;
  (t.slidesPerView === "auto" || t.slidesPerView > 1) &&
  e.isEnd &&
  !e.isBeginning &&
  !e.params.centeredSlides &&
  !a
    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
    : e.params.loop && !o
    ? e.slideToLoop(e.realIndex, 0, !1, !0)
    : e.slideTo(e.activeIndex, 0, !1, !0),
    e.autoplay &&
      e.autoplay.running &&
      e.autoplay.paused &&
      (clearTimeout(Ji),
      (Ji = setTimeout(() => {
        e.autoplay.resume();
      }, 500))),
    (e.allowSlidePrev = s),
    (e.allowSlideNext = i),
    e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
}
function Da(e) {
  const t = this;
  t.enabled &&
    (t.allowClick ||
      (t.params.preventClicks && e.preventDefault(),
      t.params.preventClicksPropagation &&
        t.animating &&
        (e.stopPropagation(), e.stopImmediatePropagation())));
}
function ja() {
  const e = this,
    { wrapperEl: t, rtlTranslate: n, enabled: i } = e;
  if (!i) return;
  (e.previousTranslate = e.translate),
    e.isHorizontal()
      ? (e.translate = -t.scrollLeft)
      : (e.translate = -t.scrollTop),
    e.translate === 0 && (e.translate = 0),
    e.updateActiveIndex(),
    e.updateSlidesClasses();
  let s;
  const r = e.maxTranslate() - e.minTranslate();
  r === 0 ? (s = 0) : (s = (e.translate - e.minTranslate()) / r),
    s !== e.progress && e.updateProgress(n ? -e.translate : e.translate),
    e.emit("setTranslate", e.translate, !1);
}
const Xt = (e, t) => {
  const n = () => (e.isElement ? "swiper-slide" : `.${e.params.slideClass}`),
    i = t.closest(n());
  if (i) {
    const s = i.querySelector(`.${e.params.lazyPreloaderClass}`);
    s && s.remove();
  }
};
function ka(e) {
  const t = this;
  Xt(t, e.target), t.update();
}
let Qi = !1;
function Va() {}
const tr = (e, t) => {
  const n = at(),
    { params: i, el: s, wrapperEl: r, device: o } = e,
    a = !!i.nested,
    l = t === "on" ? "addEventListener" : "removeEventListener",
    f = t;
  s[l]("pointerdown", e.onTouchStart, { passive: !1 }),
    n[l]("pointermove", e.onTouchMove, { passive: !1, capture: a }),
    n[l]("pointerup", e.onTouchEnd, { passive: !0 }),
    n[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
    n[l]("pointerout", e.onTouchEnd, { passive: !0 }),
    n[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
    (i.preventClicks || i.preventClicksPropagation) &&
      s[l]("click", e.onClick, !0),
    i.cssMode && r[l]("scroll", e.onScroll),
    i.updateOnWindowResize
      ? e[f](
          o.ios || o.android
            ? "resize orientationchange observerUpdate"
            : "resize observerUpdate",
          Zi,
          !0
        )
      : e[f]("observerUpdate", Zi, !0),
    s[l]("load", e.onLoad, { capture: !0 });
};
function Ga() {
  const e = this,
    t = at(),
    { params: n } = e;
  (e.onTouchStart = Fa.bind(e)),
    (e.onTouchMove = Ra.bind(e)),
    (e.onTouchEnd = Ha.bind(e)),
    n.cssMode && (e.onScroll = ja.bind(e)),
    (e.onClick = Da.bind(e)),
    (e.onLoad = ka.bind(e)),
    Qi || (t.addEventListener("touchstart", Va), (Qi = !0)),
    tr(e, "on");
}
function Wa() {
  tr(this, "off");
}
const Ua = { attachEvents: Ga, detachEvents: Wa },
  es = (e, t) => e.grid && t.grid && t.grid.rows > 1;
function Ka() {
  const e = this,
    { realIndex: t, initialized: n, params: i, el: s } = e,
    r = i.breakpoints;
  if (!r || (r && Object.keys(r).length === 0)) return;
  const o = e.getBreakpoint(r, e.params.breakpointsBase, e.el);
  if (!o || e.currentBreakpoint === o) return;
  const l = (o in r ? r[o] : void 0) || e.originalParams,
    f = es(e, i),
    c = es(e, l),
    d = i.enabled;
  f && !c
    ? (s.classList.remove(
        `${i.containerModifierClass}grid ${i.containerModifierClass}grid-column`
      ),
      e.emitContainerClasses())
    : !f &&
      c &&
      (s.classList.add(`${i.containerModifierClass}grid`),
      ((l.grid.fill && l.grid.fill === "column") ||
        (!l.grid.fill && i.grid.fill === "column")) &&
        s.classList.add(`${i.containerModifierClass}grid-column`),
      e.emitContainerClasses()),
    ["navigation", "pagination", "scrollbar"].forEach((m) => {
      const S = i[m] && i[m].enabled,
        w = l[m] && l[m].enabled;
      S && !w && e[m].disable(), !S && w && e[m].enable();
    });
  const g = l.direction && l.direction !== i.direction,
    h = i.loop && (l.slidesPerView !== i.slidesPerView || g);
  g && n && e.changeDirection(), he(e.params, l);
  const v = e.params.enabled;
  Object.assign(e, {
    allowTouchMove: e.params.allowTouchMove,
    allowSlideNext: e.params.allowSlideNext,
    allowSlidePrev: e.params.allowSlidePrev,
  }),
    d && !v ? e.disable() : !d && v && e.enable(),
    (e.currentBreakpoint = o),
    e.emit("_beforeBreakpoint", l),
    h && n && (e.loopDestroy(), e.loopCreate(t), e.updateSlides()),
    e.emit("breakpoint", l);
}
function qa(e, t = "window", n) {
  if (!e || (t === "container" && !n)) return;
  let i = !1;
  const s = me(),
    r = t === "window" ? s.innerHeight : n.clientHeight,
    o = Object.keys(e).map((a) => {
      if (typeof a == "string" && a.indexOf("@") === 0) {
        const l = parseFloat(a.substr(1));
        return { value: r * l, point: a };
      }
      return { value: a, point: a };
    });
  o.sort((a, l) => parseInt(a.value, 10) - parseInt(l.value, 10));
  for (let a = 0; a < o.length; a += 1) {
    const { point: l, value: f } = o[a];
    t === "window"
      ? s.matchMedia(`(min-width: ${f}px)`).matches && (i = l)
      : f <= n.clientWidth && (i = l);
  }
  return i || "max";
}
const Ya = { setBreakpoint: Ka, getBreakpoint: qa };
function Xa(e, t) {
  const n = [];
  return (
    e.forEach((i) => {
      typeof i == "object"
        ? Object.keys(i).forEach((s) => {
            i[s] && n.push(t + s);
          })
        : typeof i == "string" && n.push(t + i);
    }),
    n
  );
}
function Ja() {
  const e = this,
    { classNames: t, params: n, rtl: i, el: s, device: r } = e,
    o = Xa(
      [
        "initialized",
        n.direction,
        { "free-mode": e.params.freeMode && n.freeMode.enabled },
        { autoheight: n.autoHeight },
        { rtl: i },
        { grid: n.grid && n.grid.rows > 1 },
        {
          "grid-column": n.grid && n.grid.rows > 1 && n.grid.fill === "column",
        },
        { android: r.android },
        { ios: r.ios },
        { "css-mode": n.cssMode },
        { centered: n.cssMode && n.centeredSlides },
        { "watch-progress": n.watchSlidesProgress },
      ],
      n.containerModifierClass
    );
  t.push(...o), s.classList.add(...t), e.emitContainerClasses();
}
function Za() {
  const e = this,
    { el: t, classNames: n } = e;
  t.classList.remove(...n), e.emitContainerClasses();
}
const Qa = { addClasses: Ja, removeClasses: Za };
function ef() {
  const e = this,
    { isLocked: t, params: n } = e,
    { slidesOffsetBefore: i } = n;
  if (i) {
    const s = e.slides.length - 1,
      r = e.slidesGrid[s] + e.slidesSizesGrid[s] + i * 2;
    e.isLocked = e.size > r;
  } else e.isLocked = e.snapGrid.length === 1;
  n.allowSlideNext === !0 && (e.allowSlideNext = !e.isLocked),
    n.allowSlidePrev === !0 && (e.allowSlidePrev = !e.isLocked),
    t && t !== e.isLocked && (e.isEnd = !1),
    t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
}
const tf = { checkOverflow: ef },
  ts = {
    init: !0,
    direction: "horizontal",
    oneWayMovement: !1,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: !1,
    updateOnWindowResize: !0,
    resizeObserver: !0,
    nested: !1,
    createElements: !1,
    enabled: !0,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: !1,
    userAgent: null,
    url: null,
    edgeSwipeDetection: !1,
    edgeSwipeThreshold: 20,
    autoHeight: !1,
    setWrapperSize: !1,
    virtualTranslate: !1,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: !1,
    centeredSlides: !1,
    centeredSlidesBounds: !1,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: !0,
    centerInsufficientSlides: !1,
    watchOverflow: !0,
    roundLengths: !1,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: !0,
    shortSwipes: !0,
    longSwipes: !0,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: !0,
    allowTouchMove: !0,
    threshold: 5,
    touchMoveStopPropagation: !1,
    touchStartPreventDefault: !0,
    touchStartForcePreventDefault: !1,
    touchReleaseOnEdges: !1,
    uniqueNavElements: !0,
    resistance: !0,
    resistanceRatio: 0.85,
    watchSlidesProgress: !1,
    grabCursor: !1,
    preventClicks: !0,
    preventClicksPropagation: !0,
    slideToClickedSlide: !1,
    loop: !1,
    loopedSlides: null,
    loopPreventsSliding: !0,
    rewind: !1,
    allowSlidePrev: !0,
    allowSlideNext: !0,
    swipeHandler: null,
    noSwiping: !0,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: !0,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    runCallbacksOnInit: !0,
    _emitClasses: !1,
  };
function nf(e, t) {
  return function (i = {}) {
    const s = Object.keys(i)[0],
      r = i[s];
    if (typeof r != "object" || r === null) {
      he(t, i);
      return;
    }
    if (
      (["navigation", "pagination", "scrollbar"].indexOf(s) >= 0 &&
        e[s] === !0 &&
        (e[s] = { auto: !0 }),
      !(s in e && "enabled" in r))
    ) {
      he(t, i);
      return;
    }
    e[s] === !0 && (e[s] = { enabled: !0 }),
      typeof e[s] == "object" && !("enabled" in e[s]) && (e[s].enabled = !0),
      e[s] || (e[s] = { enabled: !1 }),
      he(t, i);
  };
}
const On = {
    eventsEmitter: Qo,
    update: da,
    translate: ma,
    transition: Sa,
    slide: Oa,
    loop: Aa,
    grabCursor: $a,
    events: Ua,
    breakpoints: Ya,
    checkOverflow: tf,
    classes: Qa,
  },
  _n = {};
let zt = class Re {
  constructor(...t) {
    let n, i;
    t.length === 1 &&
    t[0].constructor &&
    Object.prototype.toString.call(t[0]).slice(8, -1) === "Object"
      ? (i = t[0])
      : ([n, i] = t),
      i || (i = {}),
      (i = he({}, i)),
      n && !i.el && (i.el = n);
    const s = at();
    if (
      i.el &&
      typeof i.el == "string" &&
      s.querySelectorAll(i.el).length > 1
    ) {
      const l = [];
      return (
        s.querySelectorAll(i.el).forEach((f) => {
          const c = he({}, i, { el: f });
          l.push(new Re(c));
        }),
        l
      );
    }
    const r = this;
    (r.__swiper__ = !0),
      (r.support = Qs()),
      (r.device = qo({ userAgent: i.userAgent })),
      (r.browser = Xo()),
      (r.eventsListeners = {}),
      (r.eventsAnyListeners = []),
      (r.modules = [...r.__modules__]),
      i.modules && Array.isArray(i.modules) && r.modules.push(...i.modules);
    const o = {};
    r.modules.forEach((l) => {
      l({
        params: i,
        swiper: r,
        extendParams: nf(i, o),
        on: r.on.bind(r),
        once: r.once.bind(r),
        off: r.off.bind(r),
        emit: r.emit.bind(r),
      });
    });
    const a = he({}, ts, o);
    return (
      (r.params = he({}, a, _n, i)),
      (r.originalParams = he({}, r.params)),
      (r.passedParams = he({}, i)),
      r.params &&
        r.params.on &&
        Object.keys(r.params.on).forEach((l) => {
          r.on(l, r.params.on[l]);
        }),
      r.params && r.params.onAny && r.onAny(r.params.onAny),
      Object.assign(r, {
        enabled: r.params.enabled,
        el: n,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return r.params.direction === "horizontal";
        },
        isVertical() {
          return r.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: !0,
        isEnd: !1,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: !1,
        allowSlideNext: r.params.allowSlideNext,
        allowSlidePrev: r.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: r.params.focusableElements,
          lastClickTime: Bt(),
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          evCache: [],
        },
        allowClick: !0,
        allowTouchMove: r.params.allowTouchMove,
        touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 },
        imagesToLoad: [],
        imagesLoaded: 0,
      }),
      r.emit("_swiper"),
      r.params.init && r.init(),
      r
    );
  }
  recalcSlides() {
    const t = this,
      { slidesEl: n, params: i } = t;
    t.slides = je(n, `.${i.slideClass}, swiper-slide`);
  }
  enable() {
    const t = this;
    t.enabled ||
      ((t.enabled = !0),
      t.params.grabCursor && t.setGrabCursor(),
      t.emit("enable"));
  }
  disable() {
    const t = this;
    t.enabled &&
      ((t.enabled = !1),
      t.params.grabCursor && t.unsetGrabCursor(),
      t.emit("disable"));
  }
  setProgress(t, n) {
    const i = this;
    t = Math.min(Math.max(t, 0), 1);
    const s = i.minTranslate(),
      o = (i.maxTranslate() - s) * t + s;
    i.translateTo(o, typeof n > "u" ? 0 : n),
      i.updateActiveIndex(),
      i.updateSlidesClasses();
  }
  emitContainerClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = t.el.className
      .split(" ")
      .filter(
        (i) =>
          i.indexOf("swiper") === 0 ||
          i.indexOf(t.params.containerModifierClass) === 0
      );
    t.emit("_containerClasses", n.join(" "));
  }
  getSlideClasses(t) {
    const n = this;
    return n.destroyed
      ? ""
      : t.className
          .split(" ")
          .filter(
            (i) =>
              i.indexOf("swiper-slide") === 0 ||
              i.indexOf(n.params.slideClass) === 0
          )
          .join(" ");
  }
  emitSlidesClasses() {
    const t = this;
    if (!t.params._emitClasses || !t.el) return;
    const n = [];
    t.slides.forEach((i) => {
      const s = t.getSlideClasses(i);
      n.push({ slideEl: i, classNames: s }), t.emit("_slideClass", i, s);
    }),
      t.emit("_slideClasses", n);
  }
  slidesPerViewDynamic(t = "current", n = !1) {
    const i = this,
      {
        params: s,
        slides: r,
        slidesGrid: o,
        slidesSizesGrid: a,
        size: l,
        activeIndex: f,
      } = i;
    let c = 1;
    if (s.centeredSlides) {
      let d = r[f].swiperSlideSize,
        g;
      for (let h = f + 1; h < r.length; h += 1)
        r[h] &&
          !g &&
          ((d += r[h].swiperSlideSize), (c += 1), d > l && (g = !0));
      for (let h = f - 1; h >= 0; h -= 1)
        r[h] &&
          !g &&
          ((d += r[h].swiperSlideSize), (c += 1), d > l && (g = !0));
    } else if (t === "current")
      for (let d = f + 1; d < r.length; d += 1)
        (n ? o[d] + a[d] - o[f] < l : o[d] - o[f] < l) && (c += 1);
    else for (let d = f - 1; d >= 0; d -= 1) o[f] - o[d] < l && (c += 1);
    return c;
  }
  update() {
    const t = this;
    if (!t || t.destroyed) return;
    const { snapGrid: n, params: i } = t;
    i.breakpoints && t.setBreakpoint(),
      [...t.el.querySelectorAll('[loading="lazy"]')].forEach((o) => {
        o.complete && Xt(t, o);
      }),
      t.updateSize(),
      t.updateSlides(),
      t.updateProgress(),
      t.updateSlidesClasses();
    function s() {
      const o = t.rtlTranslate ? t.translate * -1 : t.translate,
        a = Math.min(Math.max(o, t.maxTranslate()), t.minTranslate());
      t.setTranslate(a), t.updateActiveIndex(), t.updateSlidesClasses();
    }
    let r;
    t.params.freeMode && t.params.freeMode.enabled
      ? (s(), t.params.autoHeight && t.updateAutoHeight())
      : ((t.params.slidesPerView === "auto" || t.params.slidesPerView > 1) &&
        t.isEnd &&
        !t.params.centeredSlides
          ? (r = t.slideTo(t.slides.length - 1, 0, !1, !0))
          : (r = t.slideTo(t.activeIndex, 0, !1, !0)),
        r || s()),
      i.watchOverflow && n !== t.snapGrid && t.checkOverflow(),
      t.emit("update");
  }
  changeDirection(t, n = !0) {
    const i = this,
      s = i.params.direction;
    return (
      t || (t = s === "horizontal" ? "vertical" : "horizontal"),
      t === s ||
        (t !== "horizontal" && t !== "vertical") ||
        (i.el.classList.remove(`${i.params.containerModifierClass}${s}`),
        i.el.classList.add(`${i.params.containerModifierClass}${t}`),
        i.emitContainerClasses(),
        (i.params.direction = t),
        i.slides.forEach((r) => {
          t === "vertical" ? (r.style.width = "") : (r.style.height = "");
        }),
        i.emit("changeDirection"),
        n && i.update()),
      i
    );
  }
  changeLanguageDirection(t) {
    const n = this;
    (n.rtl && t === "rtl") ||
      (!n.rtl && t === "ltr") ||
      ((n.rtl = t === "rtl"),
      (n.rtlTranslate = n.params.direction === "horizontal" && n.rtl),
      n.rtl
        ? (n.el.classList.add(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "rtl"))
        : (n.el.classList.remove(`${n.params.containerModifierClass}rtl`),
          (n.el.dir = "ltr")),
      n.update());
  }
  mount(t) {
    const n = this;
    if (n.mounted) return !0;
    let i = t || n.params.el;
    if ((typeof i == "string" && (i = document.querySelector(i)), !i))
      return !1;
    (i.swiper = n), i.shadowEl && (n.isElement = !0);
    const s = () =>
      `.${(n.params.wrapperClass || "").trim().split(" ").join(".")}`;
    let o = (() =>
      i && i.shadowRoot && i.shadowRoot.querySelector
        ? i.shadowRoot.querySelector(s())
        : je(i, s())[0])();
    return (
      !o &&
        n.params.createElements &&
        ((o = Zs("div", n.params.wrapperClass)),
        i.append(o),
        je(i, `.${n.params.slideClass}`).forEach((a) => {
          o.append(a);
        })),
      Object.assign(n, {
        el: i,
        wrapperEl: o,
        slidesEl: n.isElement ? i : o,
        mounted: !0,
        rtl: i.dir.toLowerCase() === "rtl" || Ue(i, "direction") === "rtl",
        rtlTranslate:
          n.params.direction === "horizontal" &&
          (i.dir.toLowerCase() === "rtl" || Ue(i, "direction") === "rtl"),
        wrongRTL: Ue(o, "display") === "-webkit-box",
      }),
      !0
    );
  }
  init(t) {
    const n = this;
    return (
      n.initialized ||
        n.mount(t) === !1 ||
        (n.emit("beforeInit"),
        n.params.breakpoints && n.setBreakpoint(),
        n.addClasses(),
        n.updateSize(),
        n.updateSlides(),
        n.params.watchOverflow && n.checkOverflow(),
        n.params.grabCursor && n.enabled && n.setGrabCursor(),
        n.params.loop && n.virtual && n.params.virtual.enabled
          ? n.slideTo(
              n.params.initialSlide + n.virtual.slidesBefore,
              0,
              n.params.runCallbacksOnInit,
              !1,
              !0
            )
          : n.slideTo(
              n.params.initialSlide,
              0,
              n.params.runCallbacksOnInit,
              !1,
              !0
            ),
        n.params.loop && n.loopCreate(),
        n.attachEvents(),
        [...n.el.querySelectorAll('[loading="lazy"]')].forEach((s) => {
          s.complete
            ? Xt(n, s)
            : s.addEventListener("load", (r) => {
                Xt(n, r.target);
              });
        }),
        (n.initialized = !0),
        n.emit("init"),
        n.emit("afterInit")),
      n
    );
  }
  destroy(t = !0, n = !0) {
    const i = this,
      { params: s, el: r, wrapperEl: o, slides: a } = i;
    return (
      typeof i.params > "u" ||
        i.destroyed ||
        (i.emit("beforeDestroy"),
        (i.initialized = !1),
        i.detachEvents(),
        s.loop && i.loopDestroy(),
        n &&
          (i.removeClasses(),
          r.removeAttribute("style"),
          o.removeAttribute("style"),
          a &&
            a.length &&
            a.forEach((l) => {
              l.classList.remove(
                s.slideVisibleClass,
                s.slideActiveClass,
                s.slideNextClass,
                s.slidePrevClass
              ),
                l.removeAttribute("style"),
                l.removeAttribute("data-swiper-slide-index");
            })),
        i.emit("destroy"),
        Object.keys(i.eventsListeners).forEach((l) => {
          i.off(l);
        }),
        t !== !1 && ((i.el.swiper = null), Ho(i)),
        (i.destroyed = !0)),
      null
    );
  }
  static extendDefaults(t) {
    he(_n, t);
  }
  static get extendedDefaults() {
    return _n;
  }
  static get defaults() {
    return ts;
  }
  static installModule(t) {
    Re.prototype.__modules__ || (Re.prototype.__modules__ = []);
    const n = Re.prototype.__modules__;
    typeof t == "function" && n.indexOf(t) < 0 && n.push(t);
  }
  static use(t) {
    return Array.isArray(t)
      ? (t.forEach((n) => Re.installModule(n)), Re)
      : (Re.installModule(t), Re);
  }
};
Object.keys(On).forEach((e) => {
  Object.keys(On[e]).forEach((t) => {
    zt.prototype[t] = On[e][t];
  });
});
zt.use([Jo, Zo]);
function sf(e, t, n, i) {
  return (
    e.params.createElements &&
      Object.keys(i).forEach((s) => {
        if (!n[s] && n.auto === !0) {
          let r = je(e.el, `.${i[s]}`)[0];
          r || ((r = Zs("div", i[s])), (r.className = i[s]), e.el.append(r)),
            (n[s] = r),
            (t[s] = r);
        }
      }),
    n
  );
}
function rf({ swiper: e, extendParams: t, on: n, emit: i }) {
  t({
    navigation: {
      nextEl: null,
      prevEl: null,
      hideOnClick: !1,
      disabledClass: "swiper-button-disabled",
      hiddenClass: "swiper-button-hidden",
      lockClass: "swiper-button-lock",
      navigationDisabledClass: "swiper-navigation-disabled",
    },
  }),
    (e.navigation = { nextEl: null, prevEl: null });
  const s = (v) => (Array.isArray(v) || (v = [v].filter((m) => !!m)), v);
  function r(v) {
    let m;
    return v &&
      typeof v == "string" &&
      e.isElement &&
      ((m = e.el.shadowRoot.querySelector(v)), m)
      ? m
      : (v &&
          (typeof v == "string" && (m = [...document.querySelectorAll(v)]),
          e.params.uniqueNavElements &&
            typeof v == "string" &&
            m.length > 1 &&
            e.el.querySelectorAll(v).length === 1 &&
            (m = e.el.querySelector(v))),
        v && !m ? v : m);
  }
  function o(v, m) {
    const S = e.params.navigation;
    (v = s(v)),
      v.forEach((w) => {
        w &&
          (w.classList[m ? "add" : "remove"](S.disabledClass),
          w.tagName === "BUTTON" && (w.disabled = m),
          e.params.watchOverflow &&
            e.enabled &&
            w.classList[e.isLocked ? "add" : "remove"](S.lockClass));
      });
  }
  function a() {
    const { nextEl: v, prevEl: m } = e.navigation;
    if (e.params.loop) {
      o(m, !1), o(v, !1);
      return;
    }
    o(m, e.isBeginning && !e.params.rewind), o(v, e.isEnd && !e.params.rewind);
  }
  function l(v) {
    v.preventDefault(),
      !(e.isBeginning && !e.params.loop && !e.params.rewind) &&
        (e.slidePrev(), i("navigationPrev"));
  }
  function f(v) {
    v.preventDefault(),
      !(e.isEnd && !e.params.loop && !e.params.rewind) &&
        (e.slideNext(), i("navigationNext"));
  }
  function c() {
    const v = e.params.navigation;
    if (
      ((e.params.navigation = sf(
        e,
        e.originalParams.navigation,
        e.params.navigation,
        { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
      )),
      !(v.nextEl || v.prevEl))
    )
      return;
    let m = r(v.nextEl),
      S = r(v.prevEl);
    Object.assign(e.navigation, { nextEl: m, prevEl: S }),
      (m = s(m)),
      (S = s(S));
    const w = (B, y) => {
      B && B.addEventListener("click", y === "next" ? f : l),
        !e.enabled && B && B.classList.add(v.lockClass);
    };
    m.forEach((B) => w(B, "next")), S.forEach((B) => w(B, "prev"));
  }
  function d() {
    let { nextEl: v, prevEl: m } = e.navigation;
    (v = s(v)), (m = s(m));
    const S = (w, B) => {
      w.removeEventListener("click", B === "next" ? f : l),
        w.classList.remove(e.params.navigation.disabledClass);
    };
    v.forEach((w) => S(w, "next")), m.forEach((w) => S(w, "prev"));
  }
  n("init", () => {
    e.params.navigation.enabled === !1 ? h() : (c(), a());
  }),
    n("toEdge fromEdge lock unlock", () => {
      a();
    }),
    n("destroy", () => {
      d();
    }),
    n("enable disable", () => {
      let { nextEl: v, prevEl: m } = e.navigation;
      (v = s(v)),
        (m = s(m)),
        [...v, ...m]
          .filter((S) => !!S)
          .forEach((S) =>
            S.classList[e.enabled ? "remove" : "add"](
              e.params.navigation.lockClass
            )
          );
    }),
    n("click", (v, m) => {
      let { nextEl: S, prevEl: w } = e.navigation;
      (S = s(S)), (w = s(w));
      const B = m.target;
      if (e.params.navigation.hideOnClick && !w.includes(B) && !S.includes(B)) {
        if (
          e.pagination &&
          e.params.pagination &&
          e.params.pagination.clickable &&
          (e.pagination.el === B || e.pagination.el.contains(B))
        )
          return;
        let y;
        S.length
          ? (y = S[0].classList.contains(e.params.navigation.hiddenClass))
          : w.length &&
            (y = w[0].classList.contains(e.params.navigation.hiddenClass)),
          i(y === !0 ? "navigationShow" : "navigationHide"),
          [...S, ...w]
            .filter((I) => !!I)
            .forEach((I) =>
              I.classList.toggle(e.params.navigation.hiddenClass)
            );
      }
    });
  const g = () => {
      e.el.classList.remove(e.params.navigation.navigationDisabledClass),
        c(),
        a();
    },
    h = () => {
      e.el.classList.add(e.params.navigation.navigationDisabledClass), d();
    };
  Object.assign(e.navigation, {
    enable: g,
    disable: h,
    update: a,
    init: c,
    destroy: d,
  });
}
function ot(e) {
  return (
    typeof e == "object" &&
    e !== null &&
    e.constructor &&
    Object.prototype.toString.call(e).slice(8, -1) === "Object"
  );
}
function Ke(e, t) {
  const n = ["__proto__", "constructor", "prototype"];
  Object.keys(t)
    .filter((i) => n.indexOf(i) < 0)
    .forEach((i) => {
      typeof e[i] > "u"
        ? (e[i] = t[i])
        : ot(t[i]) && ot(e[i]) && Object.keys(t[i]).length > 0
        ? t[i].__swiper__
          ? (e[i] = t[i])
          : Ke(e[i], t[i])
        : (e[i] = t[i]);
    });
}
function nr(e = {}) {
  return (
    e.navigation &&
    typeof e.navigation.nextEl > "u" &&
    typeof e.navigation.prevEl > "u"
  );
}
function ir(e = {}) {
  return e.pagination && typeof e.pagination.el > "u";
}
function sr(e = {}) {
  return e.scrollbar && typeof e.scrollbar.el > "u";
}
function rr(e = "") {
  const t = e
      .split(" ")
      .map((i) => i.trim())
      .filter((i) => !!i),
    n = [];
  return (
    t.forEach((i) => {
      n.indexOf(i) < 0 && n.push(i);
    }),
    n.join(" ")
  );
}
function lf(e = "") {
  return e
    ? e.includes("swiper-wrapper")
      ? e
      : `swiper-wrapper ${e}`
    : "swiper-wrapper";
}
const lr = [
  "modules",
  "init",
  "_direction",
  "oneWayMovement",
  "touchEventsTarget",
  "initialSlide",
  "_speed",
  "cssMode",
  "updateOnWindowResize",
  "resizeObserver",
  "nested",
  "focusableElements",
  "_enabled",
  "_width",
  "_height",
  "preventInteractionOnTransition",
  "userAgent",
  "url",
  "_edgeSwipeDetection",
  "_edgeSwipeThreshold",
  "_freeMode",
  "_autoHeight",
  "setWrapperSize",
  "virtualTranslate",
  "_effect",
  "breakpoints",
  "_spaceBetween",
  "_slidesPerView",
  "maxBackfaceHiddenSlides",
  "_grid",
  "_slidesPerGroup",
  "_slidesPerGroupSkip",
  "_slidesPerGroupAuto",
  "_centeredSlides",
  "_centeredSlidesBounds",
  "_slidesOffsetBefore",
  "_slidesOffsetAfter",
  "normalizeSlideIndex",
  "_centerInsufficientSlides",
  "_watchOverflow",
  "roundLengths",
  "touchRatio",
  "touchAngle",
  "simulateTouch",
  "_shortSwipes",
  "_longSwipes",
  "longSwipesRatio",
  "longSwipesMs",
  "_followFinger",
  "allowTouchMove",
  "_threshold",
  "touchMoveStopPropagation",
  "touchStartPreventDefault",
  "touchStartForcePreventDefault",
  "touchReleaseOnEdges",
  "uniqueNavElements",
  "_resistance",
  "_resistanceRatio",
  "_watchSlidesProgress",
  "_grabCursor",
  "preventClicks",
  "preventClicksPropagation",
  "_slideToClickedSlide",
  "_loop",
  "loopedSlides",
  "loopPreventsSliding",
  "_rewind",
  "_allowSlidePrev",
  "_allowSlideNext",
  "_swipeHandler",
  "_noSwiping",
  "noSwipingClass",
  "noSwipingSelector",
  "passiveListeners",
  "containerModifierClass",
  "slideClass",
  "slideActiveClass",
  "slideVisibleClass",
  "slideNextClass",
  "slidePrevClass",
  "wrapperClass",
  "lazyPreloaderClass",
  "runCallbacksOnInit",
  "observer",
  "observeParents",
  "observeSlideChildren",
  "a11y",
  "_autoplay",
  "_controller",
  "coverflowEffect",
  "cubeEffect",
  "fadeEffect",
  "flipEffect",
  "creativeEffect",
  "cardsEffect",
  "hashNavigation",
  "history",
  "keyboard",
  "mousewheel",
  "_navigation",
  "_pagination",
  "parallax",
  "_scrollbar",
  "_thumbs",
  "virtual",
  "zoom",
  "control",
  "injectStyles",
  "injectStylesUrls",
];
function ns(e = {}, t = !0) {
  const n = { on: {} },
    i = {},
    s = {};
  Ke(n, zt.defaults),
    Ke(n, zt.extendedDefaults),
    (n._emitClasses = !0),
    (n.init = !1);
  const r = {},
    o = lr.map((l) => l.replace(/_/, "")),
    a = Object.assign({}, e);
  return (
    Object.keys(a).forEach((l) => {
      typeof e[l] > "u" ||
        (o.indexOf(l) >= 0
          ? ot(e[l])
            ? ((n[l] = {}), (s[l] = {}), Ke(n[l], e[l]), Ke(s[l], e[l]))
            : ((n[l] = e[l]), (s[l] = e[l]))
          : l.search(/on[A-Z]/) === 0 && typeof e[l] == "function"
          ? t
            ? (i[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
            : (n.on[`${l[2].toLowerCase()}${l.substr(3)}`] = e[l])
          : (r[l] = e[l]));
    }),
    ["navigation", "pagination", "scrollbar"].forEach((l) => {
      n[l] === !0 && (n[l] = {}), n[l] === !1 && delete n[l];
    }),
    { params: n, passedParams: s, rest: r, events: i }
  );
}
function of(
  { el: e, nextEl: t, prevEl: n, paginationEl: i, scrollbarEl: s, swiper: r },
  o
) {
  nr(o) &&
    t &&
    n &&
    ((r.params.navigation.nextEl = t),
    (r.originalParams.navigation.nextEl = t),
    (r.params.navigation.prevEl = n),
    (r.originalParams.navigation.prevEl = n)),
    ir(o) &&
      i &&
      ((r.params.pagination.el = i), (r.originalParams.pagination.el = i)),
    sr(o) &&
      s &&
      ((r.params.scrollbar.el = s), (r.originalParams.scrollbar.el = s)),
    r.init(e);
}
function af(e, t, n, i, s) {
  const r = [];
  if (!t) return r;
  const o = (l) => {
    r.indexOf(l) < 0 && r.push(l);
  };
  if (n && i) {
    const l = i.map(s),
      f = n.map(s);
    l.join("") !== f.join("") && o("children"),
      i.length !== n.length && o("children");
  }
  return (
    lr
      .filter((l) => l[0] === "_")
      .map((l) => l.replace(/_/, ""))
      .forEach((l) => {
        if (l in e && l in t)
          if (ot(e[l]) && ot(t[l])) {
            const f = Object.keys(e[l]),
              c = Object.keys(t[l]);
            f.length !== c.length
              ? o(l)
              : (f.forEach((d) => {
                  e[l][d] !== t[l][d] && o(l);
                }),
                c.forEach((d) => {
                  e[l][d] !== t[l][d] && o(l);
                }));
          } else e[l] !== t[l] && o(l);
      }),
    r
  );
}
function In(e, t, n) {
  e === void 0 && (e = {});
  const i = [],
    s = {
      "container-start": [],
      "container-end": [],
      "wrapper-start": [],
      "wrapper-end": [],
    },
    r = (o, a) => {
      Array.isArray(o) &&
        o.forEach((l) => {
          const f = typeof l.type == "symbol";
          a === "default" && (a = "container-end"),
            f && l.children
              ? r(l.children, "default")
              : l.type &&
                (l.type.name === "SwiperSlide" ||
                  l.type.name === "AsyncComponentWrapper")
              ? i.push(l)
              : s[a] && s[a].push(l);
        });
    };
  return (
    Object.keys(e).forEach((o) => {
      if (typeof e[o] != "function") return;
      const a = e[o]();
      r(a, o);
    }),
    (n.value = t.value),
    (t.value = i),
    { slides: i, slots: s }
  );
}
function ff({
  swiper: e,
  slides: t,
  passedParams: n,
  changedParams: i,
  nextEl: s,
  prevEl: r,
  scrollbarEl: o,
  paginationEl: a,
}) {
  const l = i.filter(
      (C) => C !== "children" && C !== "direction" && C !== "wrapperClass"
    ),
    {
      params: f,
      pagination: c,
      navigation: d,
      scrollbar: g,
      virtual: h,
      thumbs: v,
    } = e;
  let m, S, w, B, y, I, _, j;
  i.includes("thumbs") &&
    n.thumbs &&
    n.thumbs.swiper &&
    f.thumbs &&
    !f.thumbs.swiper &&
    (m = !0),
    i.includes("controller") &&
      n.controller &&
      n.controller.control &&
      f.controller &&
      !f.controller.control &&
      (S = !0),
    i.includes("pagination") &&
      n.pagination &&
      (n.pagination.el || a) &&
      (f.pagination || f.pagination === !1) &&
      c &&
      !c.el &&
      (w = !0),
    i.includes("scrollbar") &&
      n.scrollbar &&
      (n.scrollbar.el || o) &&
      (f.scrollbar || f.scrollbar === !1) &&
      g &&
      !g.el &&
      (B = !0),
    i.includes("navigation") &&
      n.navigation &&
      (n.navigation.prevEl || r) &&
      (n.navigation.nextEl || s) &&
      (f.navigation || f.navigation === !1) &&
      d &&
      !d.prevEl &&
      !d.nextEl &&
      (y = !0);
  const Q = (C) => {
    e[C] &&
      (e[C].destroy(),
      C === "navigation"
        ? (e.isElement && (e[C].prevEl.remove(), e[C].nextEl.remove()),
          (f[C].prevEl = void 0),
          (f[C].nextEl = void 0),
          (e[C].prevEl = void 0),
          (e[C].nextEl = void 0))
        : (e.isElement && e[C].el.remove(),
          (f[C].el = void 0),
          (e[C].el = void 0)));
  };
  i.includes("loop") &&
    e.isElement &&
    (f.loop && !n.loop ? (I = !0) : !f.loop && n.loop ? (_ = !0) : (j = !0)),
    l.forEach((C) => {
      if (ot(f[C]) && ot(n[C])) Ke(f[C], n[C]);
      else {
        const z = n[C];
        (z === !0 || z === !1) &&
        (C === "navigation" || C === "pagination" || C === "scrollbar")
          ? z === !1 && Q(C)
          : (f[C] = n[C]);
      }
    }),
    l.includes("controller") &&
      !S &&
      e.controller &&
      e.controller.control &&
      f.controller &&
      f.controller.control &&
      (e.controller.control = f.controller.control),
    i.includes("children") &&
      t &&
      h &&
      f.virtual.enabled &&
      ((h.slides = t), h.update(!0)),
    i.includes("children") && t && f.loop && (j = !0),
    m && v.init() && v.update(!0),
    S && (e.controller.control = f.controller.control),
    w &&
      (e.isElement &&
        (!a || typeof a == "string") &&
        ((a = document.createElement("div")),
        a.classList.add("swiper-pagination"),
        e.el.shadowEl.appendChild(a)),
      a && (f.pagination.el = a),
      c.init(),
      c.render(),
      c.update()),
    B &&
      (e.isElement &&
        (!o || typeof o == "string") &&
        ((o = document.createElement("div")),
        o.classList.add("swiper-scrollbar"),
        e.el.shadowEl.appendChild(o)),
      o && (f.scrollbar.el = o),
      g.init(),
      g.updateSize(),
      g.setTranslate()),
    y &&
      (e.isElement &&
        ((!s || typeof s == "string") &&
          ((s = document.createElement("div")),
          s.classList.add("swiper-button-next"),
          e.el.shadowEl.appendChild(s)),
        (!r || typeof r == "string") &&
          ((r = document.createElement("div")),
          r.classList.add("swiper-button-prev"),
          e.el.shadowEl.appendChild(r))),
      s && (f.navigation.nextEl = s),
      r && (f.navigation.prevEl = r),
      d.init(),
      d.update()),
    i.includes("allowSlideNext") && (e.allowSlideNext = n.allowSlideNext),
    i.includes("allowSlidePrev") && (e.allowSlidePrev = n.allowSlidePrev),
    i.includes("direction") && e.changeDirection(n.direction, !1),
    (I || j) && e.loopDestroy(),
    (_ || j) && e.loopCreate(),
    e.update();
}
function df(e, t, n) {
  if (!n) return null;
  const i = (c) => {
      let d = c;
      return (
        c < 0 ? (d = t.length + c) : d >= t.length && (d = d - t.length), d
      );
    },
    s = e.value.isHorizontal()
      ? { [e.value.rtlTranslate ? "right" : "left"]: `${n.offset}px` }
      : { top: `${n.offset}px` },
    { from: r, to: o } = n,
    a = e.value.params.loop ? -t.length : 0,
    l = e.value.params.loop ? t.length * 2 : t.length,
    f = [];
  for (let c = a; c < l; c += 1) c >= r && c <= o && f.push(t[i(c)]);
  return f.map(
    (c) => (
      c.props || (c.props = {}),
      c.props.style || (c.props.style = {}),
      (c.props.swiperRef = e),
      (c.props.style = s),
      Ee(c.type, { ...c.props }, c.children)
    )
  );
}
const uf = (e) => {
    !e ||
      e.destroyed ||
      !e.params.virtual ||
      (e.params.virtual && !e.params.virtual.enabled) ||
      (e.updateSlides(),
      e.updateProgress(),
      e.updateSlidesClasses(),
      e.parallax &&
        e.params.parallax &&
        e.params.parallax.enabled &&
        e.parallax.setTranslate());
  },
  cf = {
    name: "Swiper",
    props: {
      tag: { type: String, default: "div" },
      wrapperTag: { type: String, default: "div" },
      modules: { type: Array, default: void 0 },
      init: { type: Boolean, default: void 0 },
      direction: { type: String, default: void 0 },
      oneWayMovement: { type: Boolean, default: void 0 },
      touchEventsTarget: { type: String, default: void 0 },
      initialSlide: { type: Number, default: void 0 },
      speed: { type: Number, default: void 0 },
      cssMode: { type: Boolean, default: void 0 },
      updateOnWindowResize: { type: Boolean, default: void 0 },
      resizeObserver: { type: Boolean, default: void 0 },
      nested: { type: Boolean, default: void 0 },
      focusableElements: { type: String, default: void 0 },
      width: { type: Number, default: void 0 },
      height: { type: Number, default: void 0 },
      preventInteractionOnTransition: { type: Boolean, default: void 0 },
      userAgent: { type: String, default: void 0 },
      url: { type: String, default: void 0 },
      edgeSwipeDetection: { type: [Boolean, String], default: void 0 },
      edgeSwipeThreshold: { type: Number, default: void 0 },
      autoHeight: { type: Boolean, default: void 0 },
      setWrapperSize: { type: Boolean, default: void 0 },
      virtualTranslate: { type: Boolean, default: void 0 },
      effect: { type: String, default: void 0 },
      breakpoints: { type: Object, default: void 0 },
      spaceBetween: { type: Number, default: void 0 },
      slidesPerView: { type: [Number, String], default: void 0 },
      maxBackfaceHiddenSlides: { type: Number, default: void 0 },
      slidesPerGroup: { type: Number, default: void 0 },
      slidesPerGroupSkip: { type: Number, default: void 0 },
      slidesPerGroupAuto: { type: Boolean, default: void 0 },
      centeredSlides: { type: Boolean, default: void 0 },
      centeredSlidesBounds: { type: Boolean, default: void 0 },
      slidesOffsetBefore: { type: Number, default: void 0 },
      slidesOffsetAfter: { type: Number, default: void 0 },
      normalizeSlideIndex: { type: Boolean, default: void 0 },
      centerInsufficientSlides: { type: Boolean, default: void 0 },
      watchOverflow: { type: Boolean, default: void 0 },
      roundLengths: { type: Boolean, default: void 0 },
      touchRatio: { type: Number, default: void 0 },
      touchAngle: { type: Number, default: void 0 },
      simulateTouch: { type: Boolean, default: void 0 },
      shortSwipes: { type: Boolean, default: void 0 },
      longSwipes: { type: Boolean, default: void 0 },
      longSwipesRatio: { type: Number, default: void 0 },
      longSwipesMs: { type: Number, default: void 0 },
      followFinger: { type: Boolean, default: void 0 },
      allowTouchMove: { type: Boolean, default: void 0 },
      threshold: { type: Number, default: void 0 },
      touchMoveStopPropagation: { type: Boolean, default: void 0 },
      touchStartPreventDefault: { type: Boolean, default: void 0 },
      touchStartForcePreventDefault: { type: Boolean, default: void 0 },
      touchReleaseOnEdges: { type: Boolean, default: void 0 },
      uniqueNavElements: { type: Boolean, default: void 0 },
      resistance: { type: Boolean, default: void 0 },
      resistanceRatio: { type: Number, default: void 0 },
      watchSlidesProgress: { type: Boolean, default: void 0 },
      grabCursor: { type: Boolean, default: void 0 },
      preventClicks: { type: Boolean, default: void 0 },
      preventClicksPropagation: { type: Boolean, default: void 0 },
      slideToClickedSlide: { type: Boolean, default: void 0 },
      loop: { type: Boolean, default: void 0 },
      loopedSlides: { type: Number, default: void 0 },
      loopPreventsSliding: { type: Boolean, default: void 0 },
      rewind: { type: Boolean, default: void 0 },
      allowSlidePrev: { type: Boolean, default: void 0 },
      allowSlideNext: { type: Boolean, default: void 0 },
      swipeHandler: { type: Boolean, default: void 0 },
      noSwiping: { type: Boolean, default: void 0 },
      noSwipingClass: { type: String, default: void 0 },
      noSwipingSelector: { type: String, default: void 0 },
      passiveListeners: { type: Boolean, default: void 0 },
      containerModifierClass: { type: String, default: void 0 },
      slideClass: { type: String, default: void 0 },
      slideActiveClass: { type: String, default: void 0 },
      slideVisibleClass: { type: String, default: void 0 },
      slideNextClass: { type: String, default: void 0 },
      slidePrevClass: { type: String, default: void 0 },
      wrapperClass: { type: String, default: void 0 },
      lazyPreloaderClass: { type: String, default: void 0 },
      runCallbacksOnInit: { type: Boolean, default: void 0 },
      observer: { type: Boolean, default: void 0 },
      observeParents: { type: Boolean, default: void 0 },
      observeSlideChildren: { type: Boolean, default: void 0 },
      a11y: { type: [Boolean, Object], default: void 0 },
      autoplay: { type: [Boolean, Object], default: void 0 },
      controller: { type: Object, default: void 0 },
      coverflowEffect: { type: Object, default: void 0 },
      cubeEffect: { type: Object, default: void 0 },
      fadeEffect: { type: Object, default: void 0 },
      flipEffect: { type: Object, default: void 0 },
      creativeEffect: { type: Object, default: void 0 },
      cardsEffect: { type: Object, default: void 0 },
      hashNavigation: { type: [Boolean, Object], default: void 0 },
      history: { type: [Boolean, Object], default: void 0 },
      keyboard: { type: [Boolean, Object], default: void 0 },
      mousewheel: { type: [Boolean, Object], default: void 0 },
      navigation: { type: [Boolean, Object], default: void 0 },
      pagination: { type: [Boolean, Object], default: void 0 },
      parallax: { type: [Boolean, Object], default: void 0 },
      scrollbar: { type: [Boolean, Object], default: void 0 },
      thumbs: { type: Object, default: void 0 },
      virtual: { type: [Boolean, Object], default: void 0 },
      zoom: { type: [Boolean, Object], default: void 0 },
      grid: { type: [Object], default: void 0 },
      freeMode: { type: [Boolean, Object], default: void 0 },
      enabled: { type: Boolean, default: void 0 },
    },
    emits: [
      "_beforeBreakpoint",
      "_containerClasses",
      "_slideClass",
      "_slideClasses",
      "_swiper",
      "_freeModeNoMomentumRelease",
      "activeIndexChange",
      "afterInit",
      "autoplay",
      "autoplayStart",
      "autoplayStop",
      "autoplayPause",
      "autoplayResume",
      "beforeDestroy",
      "beforeInit",
      "beforeLoopFix",
      "beforeResize",
      "beforeSlideChangeStart",
      "beforeTransitionStart",
      "breakpoint",
      "changeDirection",
      "click",
      "disable",
      "doubleTap",
      "doubleClick",
      "destroy",
      "enable",
      "fromEdge",
      "hashChange",
      "hashSet",
      "init",
      "keyPress",
      "lock",
      "loopFix",
      "momentumBounce",
      "navigationHide",
      "navigationShow",
      "navigationPrev",
      "navigationNext",
      "observerUpdate",
      "orientationchange",
      "paginationHide",
      "paginationRender",
      "paginationShow",
      "paginationUpdate",
      "progress",
      "reachBeginning",
      "reachEnd",
      "realIndexChange",
      "resize",
      "scroll",
      "scrollbarDragEnd",
      "scrollbarDragMove",
      "scrollbarDragStart",
      "setTransition",
      "setTranslate",
      "slideChange",
      "slideChangeTransitionEnd",
      "slideChangeTransitionStart",
      "slideNextTransitionEnd",
      "slideNextTransitionStart",
      "slidePrevTransitionEnd",
      "slidePrevTransitionStart",
      "slideResetTransitionStart",
      "slideResetTransitionEnd",
      "sliderMove",
      "sliderFirstMove",
      "slidesLengthChange",
      "slidesGridLengthChange",
      "snapGridLengthChange",
      "snapIndexChange",
      "swiper",
      "tap",
      "toEdge",
      "touchEnd",
      "touchMove",
      "touchMoveOpposite",
      "touchStart",
      "transitionEnd",
      "transitionStart",
      "unlock",
      "update",
      "virtualUpdate",
      "zoomChange",
    ],
    setup(e, t) {
      let { slots: n, emit: i } = t;
      const { tag: s, wrapperTag: r } = e,
        o = ue("swiper"),
        a = ue(null),
        l = ue(!1),
        f = ue(!1),
        c = ue(null),
        d = ue(null),
        g = ue(null),
        h = { value: [] },
        v = { value: [] },
        m = ue(null),
        S = ue(null),
        w = ue(null),
        B = ue(null),
        { params: y, passedParams: I } = ns(e, !1);
      In(n, h, v), (g.value = I), (v.value = h.value);
      const _ = () => {
        In(n, h, v), (l.value = !0);
      };
      (y.onAny = function (C) {
        for (
          var z = arguments.length, U = new Array(z > 1 ? z - 1 : 0), A = 1;
          A < z;
          A++
        )
          U[A - 1] = arguments[A];
        i(C, ...U);
      }),
        Object.assign(y.on, {
          _beforeBreakpoint: _,
          _containerClasses(C, z) {
            o.value = z;
          },
        });
      const j = { ...y };
      if (
        (delete j.wrapperClass,
        (d.value = new zt(j)),
        d.value.virtual && d.value.params.virtual.enabled)
      ) {
        d.value.virtual.slides = h.value;
        const C = {
          cache: !1,
          slides: h.value,
          renderExternal: (z) => {
            a.value = z;
          },
          renderExternalUpdate: !1,
        };
        Ke(d.value.params.virtual, C), Ke(d.value.originalParams.virtual, C);
      }
      di(() => {
        !f.value && d.value && (d.value.emitSlidesClasses(), (f.value = !0));
        const { passedParams: C } = ns(e, !1),
          z = af(C, g.value, h.value, v.value, (U) => U.props && U.props.key);
        (g.value = C),
          (z.length || l.value) &&
            d.value &&
            !d.value.destroyed &&
            ff({
              swiper: d.value,
              slides: h.value,
              passedParams: C,
              changedParams: z,
              nextEl: m.value,
              prevEl: S.value,
              scrollbarEl: B.value,
              paginationEl: w.value,
            }),
          (l.value = !1);
      }),
        fi("swiper", d),
        Kt(a, () => {
          xs(() => {
            uf(d.value);
          });
        }),
        un(() => {
          c.value &&
            (of(
              {
                el: c.value,
                nextEl: m.value,
                prevEl: S.value,
                paginationEl: w.value,
                scrollbarEl: B.value,
                swiper: d.value,
              },
              y
            ),
            i("swiper", d.value));
        }),
        cn(() => {
          d.value && !d.value.destroyed && d.value.destroy(!0, !1);
        });
      function Q(C) {
        return y.virtual
          ? df(d, C, a.value)
          : (C.forEach((z, U) => {
              z.props || (z.props = {}),
                (z.props.swiperRef = d),
                (z.props.swiperSlideIndex = U);
            }),
            C);
      }
      return () => {
        const { slides: C, slots: z } = In(n, h, v);
        return Ee(s, { ref: c, class: rr(o.value) }, [
          z["container-start"],
          Ee(r, { class: lf(y.wrapperClass) }, [
            z["wrapper-start"],
            Q(C),
            z["wrapper-end"],
          ]),
          nr(e) && [
            Ee("div", { ref: S, class: "swiper-button-prev" }),
            Ee("div", { ref: m, class: "swiper-button-next" }),
          ],
          sr(e) && Ee("div", { ref: B, class: "swiper-scrollbar" }),
          ir(e) && Ee("div", { ref: w, class: "swiper-pagination" }),
          z["container-end"],
        ]);
      };
    },
  },
  pf = {
    name: "SwiperSlide",
    props: {
      tag: { type: String, default: "div" },
      swiperRef: { type: Object, required: !1 },
      swiperSlideIndex: { type: Number, default: void 0, required: !1 },
      zoom: { type: Boolean, default: void 0, required: !1 },
      lazy: { type: Boolean, default: !1, required: !1 },
      virtualIndex: { type: [String, Number], default: void 0 },
    },
    setup(e, t) {
      let { slots: n } = t,
        i = !1;
      const { swiperRef: s } = e,
        r = ue(null),
        o = ue("swiper-slide"),
        a = ue(!1);
      function l(d, g, h) {
        g === r.value && (o.value = h);
      }
      un(() => {
        !s || !s.value || (s.value.on("_slideClass", l), (i = !0));
      }),
        $s(() => {
          i || !s || !s.value || (s.value.on("_slideClass", l), (i = !0));
        }),
        di(() => {
          !r.value ||
            !s ||
            !s.value ||
            (typeof e.swiperSlideIndex < "u" &&
              (r.value.swiperSlideIndex = e.swiperSlideIndex),
            s.value.destroyed &&
              o.value !== "swiper-slide" &&
              (o.value = "swiper-slide"));
        }),
        cn(() => {
          !s || !s.value || s.value.off("_slideClass", l);
        });
      const f = Ys(() => ({
        isActive: o.value.indexOf("swiper-slide-active") >= 0,
        isVisible: o.value.indexOf("swiper-slide-visible") >= 0,
        isPrev: o.value.indexOf("swiper-slide-prev") >= 0,
        isNext: o.value.indexOf("swiper-slide-next") >= 0,
      }));
      fi("swiperSlide", f);
      const c = () => {
        a.value = !0;
      };
      return () =>
        Ee(
          e.tag,
          {
            class: rr(`${o.value}`),
            ref: r,
            "data-swiper-slide-index":
              typeof e.virtualIndex > "u" && s && s.value && s.value.params.loop
                ? e.swiperSlideIndex
                : e.virtualIndex,
            onLoadCapture: c,
          },
          e.zoom
            ? Ee(
                "div",
                {
                  class: "swiper-zoom-container",
                  "data-swiper-zoom":
                    typeof e.zoom == "number" ? e.zoom : void 0,
                },
                [
                  n.default && n.default(f.value),
                  e.lazy &&
                    !a.value &&
                    Ee("div", { class: "swiper-lazy-preloader" }),
                ]
              )
            : [
                n.default && n.default(f.value),
                e.lazy &&
                  !a.value &&
                  Ee("div", { class: "swiper-lazy-preloader" }),
              ]
        );
    },
  };
const hf = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [i, s] of t) n[i] = s;
    return n;
  },
  gf = {
    components: { Swiper: cf, SwiperSlide: pf },
    setup() {
      return { modules: [rf] };
    },
  };
function mf(e, t, n, i, s, r) {
  const o = Li("swiper-slide"),
    a = Li("swiper");
  return (
    ql(),
    Jl(
      a,
      {
        navigation: !0,
        modules: i.modules,
        class: "mySwiper",
        onPointerenter:
          t[36] ||
          (t[36] = (l) =>
            l && e.$volar
              ? e.$volar.highlight(l.target, e.$.type.__file, [2, 8, 3, 12])
              : void 0),
        onPointerleave:
          t[37] ||
          (t[37] = (l) =>
            l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
        onVnodeMounted:
          t[38] ||
          (t[38] = (l) =>
            l && e.$volar
              ? e.$volar.vnodeMounted(l.el, e.$.type.__file, [2, 8, 3, 12])
              : void 0),
        onVnodeUnmounted:
          t[39] ||
          (t[39] = (l) =>
            l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
      },
      {
        default: Te(() => [
          ee(
            o,
            {
              onPointerenter:
                t[0] ||
                (t[0] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [3, 3, 5, 41]
                      )
                    : void 0),
              onPointerleave:
                t[1] ||
                (t[1] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[2] ||
                (t[2] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [3, 3, 5, 41]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[3] ||
                (t[3] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 1")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[4] ||
                (t[4] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [4, 4, 5, 41]
                      )
                    : void 0),
              onPointerleave:
                t[5] ||
                (t[5] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[6] ||
                (t[6] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [4, 4, 5, 41]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[7] ||
                (t[7] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 2")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[8] ||
                (t[8] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [4, 4, 41, 77]
                      )
                    : void 0),
              onPointerleave:
                t[9] ||
                (t[9] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[10] ||
                (t[10] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [4, 4, 41, 77]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[11] ||
                (t[11] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 3")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[12] ||
                (t[12] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [5, 5, 5, 41]
                      )
                    : void 0),
              onPointerleave:
                t[13] ||
                (t[13] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[14] ||
                (t[14] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [5, 5, 5, 41]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[15] ||
                (t[15] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 4")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[16] ||
                (t[16] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [5, 5, 41, 77]
                      )
                    : void 0),
              onPointerleave:
                t[17] ||
                (t[17] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[18] ||
                (t[18] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [5, 5, 41, 77]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[19] ||
                (t[19] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 5")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[20] ||
                (t[20] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [6, 6, 5, 41]
                      )
                    : void 0),
              onPointerleave:
                t[21] ||
                (t[21] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[22] ||
                (t[22] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [6, 6, 5, 41]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[23] ||
                (t[23] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 6")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[24] ||
                (t[24] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [6, 6, 41, 77]
                      )
                    : void 0),
              onPointerleave:
                t[25] ||
                (t[25] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[26] ||
                (t[26] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [6, 6, 41, 77]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[27] ||
                (t[27] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 7")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[28] ||
                (t[28] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [7, 7, 5, 41]
                      )
                    : void 0),
              onPointerleave:
                t[29] ||
                (t[29] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[30] ||
                (t[30] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [7, 7, 5, 41]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[31] ||
                (t[31] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 8")]), _: 1 },
            512
          ),
          ee(
            o,
            {
              onPointerenter:
                t[32] ||
                (t[32] = (l) =>
                  l && e.$volar
                    ? e.$volar.highlight(
                        l.target,
                        e.$.type.__file,
                        [7, 7, 41, 77]
                      )
                    : void 0),
              onPointerleave:
                t[33] ||
                (t[33] = (l) =>
                  l && e.$volar ? e.$volar.unHighlight(l.target) : void 0),
              onVnodeMounted:
                t[34] ||
                (t[34] = (l) =>
                  l && e.$volar
                    ? e.$volar.vnodeMounted(
                        l.el,
                        e.$.type.__file,
                        [7, 7, 41, 77]
                      )
                    : void 0),
              onVnodeUnmounted:
                t[35] ||
                (t[35] = (l) =>
                  l && e.$volar ? e.$volar.vnodeUnmounted(l.el) : void 0),
            },
            { default: Te(() => [Ae("Slide 9")]), _: 1 },
            512
          ),
        ]),
        _: 1,
      },
      8,
      ["modules"]
    )
  );
}
const vf = hf(gf, [["render", mf]]);
No(vf).mount("#app");
