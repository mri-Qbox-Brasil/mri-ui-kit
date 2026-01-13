import * as l from "react";
import In, { useState as Fn, forwardRef as Wi, createElement as tn, useEffect as rn, useLayoutEffect as $i } from "react";
import * as Wn from "react-dom";
import Bi from "react-dom";
var pr = { exports: {} }, ft = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nn;
function zi() {
  if (nn) return ft;
  nn = 1;
  var e = In, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), n = Object.prototype.hasOwnProperty, o = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, i = { key: !0, ref: !0, __self: !0, __source: !0 };
  function a(s, u, c) {
    var d, p = {}, h = null, v = null;
    c !== void 0 && (h = "" + c), u.key !== void 0 && (h = "" + u.key), u.ref !== void 0 && (v = u.ref);
    for (d in u) n.call(u, d) && !i.hasOwnProperty(d) && (p[d] = u[d]);
    if (s && s.defaultProps) for (d in u = s.defaultProps, u) p[d] === void 0 && (p[d] = u[d]);
    return { $$typeof: t, type: s, key: h, ref: v, props: p, _owner: o.current };
  }
  return ft.Fragment = r, ft.jsx = a, ft.jsxs = a, ft;
}
var pt = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var on;
function Vi() {
  return on || (on = 1, process.env.NODE_ENV !== "production" && function() {
    var e = In, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), o = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), h = Symbol.for("react.lazy"), v = Symbol.for("react.offscreen"), y = Symbol.iterator, g = "@@iterator";
    function b(f) {
      if (f === null || typeof f != "object")
        return null;
      var C = y && f[y] || f[g];
      return typeof C == "function" ? C : null;
    }
    var x = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function w(f) {
      {
        for (var C = arguments.length, A = new Array(C > 1 ? C - 1 : 0), _ = 1; _ < C; _++)
          A[_ - 1] = arguments[_];
        P("error", f, A);
      }
    }
    function P(f, C, A) {
      {
        var _ = x.ReactDebugCurrentFrame, X = _.getStackAddendum();
        X !== "" && (C += "%s", A = A.concat([X]));
        var Q = A.map(function(z) {
          return String(z);
        });
        Q.unshift("Warning: " + C), Function.prototype.apply.call(console[f], console, Q);
      }
    }
    var R = !1, S = !1, N = !1, k = !1, W = !1, H;
    H = Symbol.for("react.module.reference");
    function $(f) {
      return !!(typeof f == "string" || typeof f == "function" || f === n || f === i || W || f === o || f === c || f === d || k || f === v || R || S || N || typeof f == "object" && f !== null && (f.$$typeof === h || f.$$typeof === p || f.$$typeof === a || f.$$typeof === s || f.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      f.$$typeof === H || f.getModuleId !== void 0));
    }
    function Y(f, C, A) {
      var _ = f.displayName;
      if (_)
        return _;
      var X = C.displayName || C.name || "";
      return X !== "" ? A + "(" + X + ")" : A;
    }
    function j(f) {
      return f.displayName || "Context";
    }
    function B(f) {
      if (f == null)
        return null;
      if (typeof f.tag == "number" && w("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof f == "function")
        return f.displayName || f.name || null;
      if (typeof f == "string")
        return f;
      switch (f) {
        case n:
          return "Fragment";
        case r:
          return "Portal";
        case i:
          return "Profiler";
        case o:
          return "StrictMode";
        case c:
          return "Suspense";
        case d:
          return "SuspenseList";
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case s:
            var C = f;
            return j(C) + ".Consumer";
          case a:
            var A = f;
            return j(A._context) + ".Provider";
          case u:
            return Y(f, f.render, "ForwardRef");
          case p:
            var _ = f.displayName || null;
            return _ !== null ? _ : B(f.type) || "Memo";
          case h: {
            var X = f, Q = X._payload, z = X._init;
            try {
              return B(z(Q));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var D = Object.assign, Z = 0, G, q, M, J, se, oe, E;
    function T() {
    }
    T.__reactDisabledLog = !0;
    function I() {
      {
        if (Z === 0) {
          G = console.log, q = console.info, M = console.warn, J = console.error, se = console.group, oe = console.groupCollapsed, E = console.groupEnd;
          var f = {
            configurable: !0,
            enumerable: !0,
            value: T,
            writable: !0
          };
          Object.defineProperties(console, {
            info: f,
            log: f,
            warn: f,
            error: f,
            group: f,
            groupCollapsed: f,
            groupEnd: f
          });
        }
        Z++;
      }
    }
    function O() {
      {
        if (Z--, Z === 0) {
          var f = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: D({}, f, {
              value: G
            }),
            info: D({}, f, {
              value: q
            }),
            warn: D({}, f, {
              value: M
            }),
            error: D({}, f, {
              value: J
            }),
            group: D({}, f, {
              value: se
            }),
            groupCollapsed: D({}, f, {
              value: oe
            }),
            groupEnd: D({}, f, {
              value: E
            })
          });
        }
        Z < 0 && w("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var U = x.ReactCurrentDispatcher, K;
    function re(f, C, A) {
      {
        if (K === void 0)
          try {
            throw Error();
          } catch (X) {
            var _ = X.stack.trim().match(/\n( *(at )?)/);
            K = _ && _[1] || "";
          }
        return `
` + K + f;
      }
    }
    var te = !1, me;
    {
      var Ct = typeof WeakMap == "function" ? WeakMap : Map;
      me = new Ct();
    }
    function dt(f, C) {
      if (!f || te)
        return "";
      {
        var A = me.get(f);
        if (A !== void 0)
          return A;
      }
      var _;
      te = !0;
      var X = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Q;
      Q = U.current, U.current = null, I();
      try {
        if (C) {
          var z = function() {
            throw Error();
          };
          if (Object.defineProperty(z.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(z, []);
            } catch (le) {
              _ = le;
            }
            Reflect.construct(f, [], z);
          } else {
            try {
              z.call();
            } catch (le) {
              _ = le;
            }
            f.call(z.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (le) {
            _ = le;
          }
          f();
        }
      } catch (le) {
        if (le && _ && typeof le.stack == "string") {
          for (var F = le.stack.split(`
`), ae = _.stack.split(`
`), ne = F.length - 1, ie = ae.length - 1; ne >= 1 && ie >= 0 && F[ne] !== ae[ie]; )
            ie--;
          for (; ne >= 1 && ie >= 0; ne--, ie--)
            if (F[ne] !== ae[ie]) {
              if (ne !== 1 || ie !== 1)
                do
                  if (ne--, ie--, ie < 0 || F[ne] !== ae[ie]) {
                    var he = `
` + F[ne].replace(" at new ", " at ");
                    return f.displayName && he.includes("<anonymous>") && (he = he.replace("<anonymous>", f.displayName)), typeof f == "function" && me.set(f, he), he;
                  }
                while (ne >= 1 && ie >= 0);
              break;
            }
        }
      } finally {
        te = !1, U.current = Q, O(), Error.prepareStackTrace = X;
      }
      var Ke = f ? f.displayName || f.name : "", ze = Ke ? re(Ke) : "";
      return typeof f == "function" && me.set(f, ze), ze;
    }
    function $e(f, C, A) {
      return dt(f, !1);
    }
    function Et(f) {
      var C = f.prototype;
      return !!(C && C.isReactComponent);
    }
    function Ge(f, C, A) {
      if (f == null)
        return "";
      if (typeof f == "function")
        return dt(f, Et(f));
      if (typeof f == "string")
        return re(f);
      switch (f) {
        case c:
          return re("Suspense");
        case d:
          return re("SuspenseList");
      }
      if (typeof f == "object")
        switch (f.$$typeof) {
          case u:
            return $e(f.render);
          case p:
            return Ge(f.type, C, A);
          case h: {
            var _ = f, X = _._payload, Q = _._init;
            try {
              return Ge(Q(X), C, A);
            } catch {
            }
          }
        }
      return "";
    }
    var Be = Object.prototype.hasOwnProperty, Rt = {}, St = x.ReactDebugCurrentFrame;
    function ke(f) {
      if (f) {
        var C = f._owner, A = Ge(f.type, f._source, C ? C.type : null);
        St.setExtraStackFrame(A);
      } else
        St.setExtraStackFrame(null);
    }
    function vi(f, C, A, _, X) {
      {
        var Q = Function.call.bind(Be);
        for (var z in f)
          if (Q(f, z)) {
            var F = void 0;
            try {
              if (typeof f[z] != "function") {
                var ae = Error((_ || "React class") + ": " + A + " type `" + z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof f[z] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ae.name = "Invariant Violation", ae;
              }
              F = f[z](C, z, _, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (ne) {
              F = ne;
            }
            F && !(F instanceof Error) && (ke(X), w("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", _ || "React class", A, z, typeof F), ke(null)), F instanceof Error && !(F.message in Rt) && (Rt[F.message] = !0, ke(X), w("Failed %s type: %s", A, F.message), ke(null));
          }
      }
    }
    var bi = Array.isArray;
    function Xt(f) {
      return bi(f);
    }
    function yi(f) {
      {
        var C = typeof Symbol == "function" && Symbol.toStringTag, A = C && f[Symbol.toStringTag] || f.constructor.name || "Object";
        return A;
      }
    }
    function xi(f) {
      try {
        return Vr(f), !1;
      } catch {
        return !0;
      }
    }
    function Vr(f) {
      return "" + f;
    }
    function Ur(f) {
      if (xi(f))
        return w("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", yi(f)), Vr(f);
    }
    var Hr = x.ReactCurrentOwner, wi = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Gr, Yr;
    function Ci(f) {
      if (Be.call(f, "ref")) {
        var C = Object.getOwnPropertyDescriptor(f, "ref").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return f.ref !== void 0;
    }
    function Ei(f) {
      if (Be.call(f, "key")) {
        var C = Object.getOwnPropertyDescriptor(f, "key").get;
        if (C && C.isReactWarning)
          return !1;
      }
      return f.key !== void 0;
    }
    function Ri(f, C) {
      typeof f.ref == "string" && Hr.current;
    }
    function Si(f, C) {
      {
        var A = function() {
          Gr || (Gr = !0, w("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        A.isReactWarning = !0, Object.defineProperty(f, "key", {
          get: A,
          configurable: !0
        });
      }
    }
    function ki(f, C) {
      {
        var A = function() {
          Yr || (Yr = !0, w("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        A.isReactWarning = !0, Object.defineProperty(f, "ref", {
          get: A,
          configurable: !0
        });
      }
    }
    var Pi = function(f, C, A, _, X, Q, z) {
      var F = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: f,
        key: C,
        ref: A,
        props: z,
        // Record the component responsible for creating this element.
        _owner: Q
      };
      return F._store = {}, Object.defineProperty(F._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(F, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: _
      }), Object.defineProperty(F, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: X
      }), Object.freeze && (Object.freeze(F.props), Object.freeze(F)), F;
    };
    function Ai(f, C, A, _, X) {
      {
        var Q, z = {}, F = null, ae = null;
        A !== void 0 && (Ur(A), F = "" + A), Ei(C) && (Ur(C.key), F = "" + C.key), Ci(C) && (ae = C.ref, Ri(C, X));
        for (Q in C)
          Be.call(C, Q) && !wi.hasOwnProperty(Q) && (z[Q] = C[Q]);
        if (f && f.defaultProps) {
          var ne = f.defaultProps;
          for (Q in ne)
            z[Q] === void 0 && (z[Q] = ne[Q]);
        }
        if (F || ae) {
          var ie = typeof f == "function" ? f.displayName || f.name || "Unknown" : f;
          F && Si(z, ie), ae && ki(z, ie);
        }
        return Pi(f, F, ae, X, _, Hr.current, z);
      }
    }
    var qt = x.ReactCurrentOwner, Kr = x.ReactDebugCurrentFrame;
    function Ye(f) {
      if (f) {
        var C = f._owner, A = Ge(f.type, f._source, C ? C.type : null);
        Kr.setExtraStackFrame(A);
      } else
        Kr.setExtraStackFrame(null);
    }
    var Zt;
    Zt = !1;
    function Jt(f) {
      return typeof f == "object" && f !== null && f.$$typeof === t;
    }
    function Xr() {
      {
        if (qt.current) {
          var f = B(qt.current.type);
          if (f)
            return `

Check the render method of \`` + f + "`.";
        }
        return "";
      }
    }
    function Ni(f) {
      return "";
    }
    var qr = {};
    function Oi(f) {
      {
        var C = Xr();
        if (!C) {
          var A = typeof f == "string" ? f : f.displayName || f.name;
          A && (C = `

Check the top-level render call using <` + A + ">.");
        }
        return C;
      }
    }
    function Zr(f, C) {
      {
        if (!f._store || f._store.validated || f.key != null)
          return;
        f._store.validated = !0;
        var A = Oi(C);
        if (qr[A])
          return;
        qr[A] = !0;
        var _ = "";
        f && f._owner && f._owner !== qt.current && (_ = " It was passed a child from " + B(f._owner.type) + "."), Ye(f), w('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, _), Ye(null);
      }
    }
    function Jr(f, C) {
      {
        if (typeof f != "object")
          return;
        if (Xt(f))
          for (var A = 0; A < f.length; A++) {
            var _ = f[A];
            Jt(_) && Zr(_, C);
          }
        else if (Jt(f))
          f._store && (f._store.validated = !0);
        else if (f) {
          var X = b(f);
          if (typeof X == "function" && X !== f.entries)
            for (var Q = X.call(f), z; !(z = Q.next()).done; )
              Jt(z.value) && Zr(z.value, C);
        }
      }
    }
    function ji(f) {
      {
        var C = f.type;
        if (C == null || typeof C == "string")
          return;
        var A;
        if (typeof C == "function")
          A = C.propTypes;
        else if (typeof C == "object" && (C.$$typeof === u || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        C.$$typeof === p))
          A = C.propTypes;
        else
          return;
        if (A) {
          var _ = B(C);
          vi(A, f.props, "prop", _, f);
        } else if (C.PropTypes !== void 0 && !Zt) {
          Zt = !0;
          var X = B(C);
          w("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", X || "Unknown");
        }
        typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && w("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Ti(f) {
      {
        for (var C = Object.keys(f.props), A = 0; A < C.length; A++) {
          var _ = C[A];
          if (_ !== "children" && _ !== "key") {
            Ye(f), w("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", _), Ye(null);
            break;
          }
        }
        f.ref !== null && (Ye(f), w("Invalid attribute `ref` supplied to `React.Fragment`."), Ye(null));
      }
    }
    var Qr = {};
    function en(f, C, A, _, X, Q) {
      {
        var z = $(f);
        if (!z) {
          var F = "";
          (f === void 0 || typeof f == "object" && f !== null && Object.keys(f).length === 0) && (F += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ae = Ni();
          ae ? F += ae : F += Xr();
          var ne;
          f === null ? ne = "null" : Xt(f) ? ne = "array" : f !== void 0 && f.$$typeof === t ? (ne = "<" + (B(f.type) || "Unknown") + " />", F = " Did you accidentally export a JSX literal instead of a component?") : ne = typeof f, w("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ne, F);
        }
        var ie = Ai(f, C, A, X, Q);
        if (ie == null)
          return ie;
        if (z) {
          var he = C.children;
          if (he !== void 0)
            if (_)
              if (Xt(he)) {
                for (var Ke = 0; Ke < he.length; Ke++)
                  Jr(he[Ke], f);
                Object.freeze && Object.freeze(he);
              } else
                w("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Jr(he, f);
        }
        if (Be.call(C, "key")) {
          var ze = B(f), le = Object.keys(C).filter(function(Fi) {
            return Fi !== "key";
          }), Qt = le.length > 0 ? "{key: someKey, " + le.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Qr[ze + Qt]) {
            var Ii = le.length > 0 ? "{" + le.join(": ..., ") + ": ...}" : "{}";
            w(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Qt, ze, Ii, ze), Qr[ze + Qt] = !0;
          }
        }
        return f === n ? Ti(ie) : ji(ie), ie;
      }
    }
    function _i(f, C, A) {
      return en(f, C, A, !0);
    }
    function Mi(f, C, A) {
      return en(f, C, A, !1);
    }
    var Di = Mi, Li = _i;
    pt.Fragment = n, pt.jsx = Di, pt.jsxs = Li;
  }()), pt;
}
process.env.NODE_ENV === "production" ? pr.exports = zi() : pr.exports = Vi();
var m = pr.exports;
function sn(e, t) {
  if (typeof e == "function")
    return e(t);
  e != null && (e.current = t);
}
function _e(...e) {
  return (t) => {
    let r = !1;
    const n = e.map((o) => {
      const i = sn(o, t);
      return !r && typeof i == "function" && (r = !0), i;
    });
    if (r)
      return () => {
        for (let o = 0; o < n.length; o++) {
          const i = n[o];
          typeof i == "function" ? i() : sn(e[o], null);
        }
      };
  };
}
function be(...e) {
  return l.useCallback(_e(...e), e);
}
var Ui = Symbol.for("react.lazy"), Dt = l[" use ".trim().toString()];
function Hi(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
function $n(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === Ui && "_payload" in e && Hi(e._payload);
}
// @__NO_SIDE_EFFECTS__
function Bn(e) {
  const t = /* @__PURE__ */ Yi(e), r = l.forwardRef((n, o) => {
    let { children: i, ...a } = n;
    $n(i) && typeof Dt == "function" && (i = Dt(i._payload));
    const s = l.Children.toArray(i), u = s.find(Xi);
    if (u) {
      const c = u.props.children, d = s.map((p) => p === u ? l.Children.count(c) > 1 ? l.Children.only(null) : l.isValidElement(c) ? c.props.children : null : p);
      return /* @__PURE__ */ m.jsx(t, { ...a, ref: o, children: l.isValidElement(c) ? l.cloneElement(c, void 0, d) : null });
    }
    return /* @__PURE__ */ m.jsx(t, { ...a, ref: o, children: i });
  });
  return r.displayName = `${e}.Slot`, r;
}
var Gi = /* @__PURE__ */ Bn("Slot");
// @__NO_SIDE_EFFECTS__
function Yi(e) {
  const t = l.forwardRef((r, n) => {
    let { children: o, ...i } = r;
    if ($n(o) && typeof Dt == "function" && (o = Dt(o._payload)), l.isValidElement(o)) {
      const a = Zi(o), s = qi(i, o.props);
      return o.type !== l.Fragment && (s.ref = n ? _e(n, a) : a), l.cloneElement(o, s);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var Ki = Symbol("radix.slottable");
function Xi(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === Ki;
}
function qi(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], i = t[n];
    /^on[A-Z]/.test(n) ? o && i ? r[n] = (...s) => {
      const u = i(...s);
      return o(...s), u;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...i } : n === "className" && (r[n] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function Zi(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
function zn(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (r = zn(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function Vn() {
  for (var e, t, r = 0, n = "", o = arguments.length; r < o; r++) (e = arguments[r]) && (t = zn(e)) && (n && (n += " "), n += t);
  return n;
}
const an = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e, ln = Vn, Un = (e, t) => (r) => {
  var n;
  if ((t == null ? void 0 : t.variants) == null) return ln(e, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
  const { variants: o, defaultVariants: i } = t, a = Object.keys(o).map((c) => {
    const d = r == null ? void 0 : r[c], p = i == null ? void 0 : i[c];
    if (d === null) return null;
    const h = an(d) || an(p);
    return o[c][h];
  }), s = r && Object.entries(r).reduce((c, d) => {
    let [p, h] = d;
    return h === void 0 || (c[p] = h), c;
  }, {}), u = t == null || (n = t.compoundVariants) === null || n === void 0 ? void 0 : n.reduce((c, d) => {
    let { class: p, className: h, ...v } = d;
    return Object.entries(v).every((y) => {
      let [g, b] = y;
      return Array.isArray(b) ? b.includes({
        ...i,
        ...s
      }[g]) : {
        ...i,
        ...s
      }[g] === b;
    }) ? [
      ...c,
      p,
      h
    ] : c;
  }, []);
  return ln(e, a, u, r == null ? void 0 : r.class, r == null ? void 0 : r.className);
}, Cr = "-", Ji = (e) => {
  const t = es(e), {
    conflictingClassGroups: r,
    conflictingClassGroupModifiers: n
  } = e;
  return {
    getClassGroupId: (a) => {
      const s = a.split(Cr);
      return s[0] === "" && s.length !== 1 && s.shift(), Hn(s, t) || Qi(a);
    },
    getConflictingClassGroupIds: (a, s) => {
      const u = r[a] || [];
      return s && n[a] ? [...u, ...n[a]] : u;
    }
  };
}, Hn = (e, t) => {
  var a;
  if (e.length === 0)
    return t.classGroupId;
  const r = e[0], n = t.nextPart.get(r), o = n ? Hn(e.slice(1), n) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const i = e.join(Cr);
  return (a = t.validators.find(({
    validator: s
  }) => s(i))) == null ? void 0 : a.classGroupId;
}, cn = /^\[(.+)\]$/, Qi = (e) => {
  if (cn.test(e)) {
    const t = cn.exec(e)[1], r = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (r)
      return "arbitrary.." + r;
  }
}, es = (e) => {
  const {
    theme: t,
    prefix: r
  } = e, n = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return rs(Object.entries(e.classGroups), r).forEach(([i, a]) => {
    mr(a, n, i, t);
  }), n;
}, mr = (e, t, r, n) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const i = o === "" ? t : un(t, o);
      i.classGroupId = r;
      return;
    }
    if (typeof o == "function") {
      if (ts(o)) {
        mr(o(n), t, r, n);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: r
      });
      return;
    }
    Object.entries(o).forEach(([i, a]) => {
      mr(a, un(t, i), r, n);
    });
  });
}, un = (e, t) => {
  let r = e;
  return t.split(Cr).forEach((n) => {
    r.nextPart.has(n) || r.nextPart.set(n, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), r = r.nextPart.get(n);
  }), r;
}, ts = (e) => e.isThemeGetter, rs = (e, t) => t ? e.map(([r, n]) => {
  const o = n.map((i) => typeof i == "string" ? t + i : typeof i == "object" ? Object.fromEntries(Object.entries(i).map(([a, s]) => [t + a, s])) : i);
  return [r, o];
}) : e, ns = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, r = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
  const o = (i, a) => {
    r.set(i, a), t++, t > e && (t = 0, n = r, r = /* @__PURE__ */ new Map());
  };
  return {
    get(i) {
      let a = r.get(i);
      if (a !== void 0)
        return a;
      if ((a = n.get(i)) !== void 0)
        return o(i, a), a;
    },
    set(i, a) {
      r.has(i) ? r.set(i, a) : o(i, a);
    }
  };
}, Gn = "!", os = (e) => {
  const {
    separator: t,
    experimentalParseClassName: r
  } = e, n = t.length === 1, o = t[0], i = t.length, a = (s) => {
    const u = [];
    let c = 0, d = 0, p;
    for (let b = 0; b < s.length; b++) {
      let x = s[b];
      if (c === 0) {
        if (x === o && (n || s.slice(b, b + i) === t)) {
          u.push(s.slice(d, b)), d = b + i;
          continue;
        }
        if (x === "/") {
          p = b;
          continue;
        }
      }
      x === "[" ? c++ : x === "]" && c--;
    }
    const h = u.length === 0 ? s : s.substring(d), v = h.startsWith(Gn), y = v ? h.substring(1) : h, g = p && p > d ? p - d : void 0;
    return {
      modifiers: u,
      hasImportantModifier: v,
      baseClassName: y,
      maybePostfixModifierPosition: g
    };
  };
  return r ? (s) => r({
    className: s,
    parseClassName: a
  }) : a;
}, is = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let r = [];
  return e.forEach((n) => {
    n[0] === "[" ? (t.push(...r.sort(), n), r = []) : r.push(n);
  }), t.push(...r.sort()), t;
}, ss = (e) => ({
  cache: ns(e.cacheSize),
  parseClassName: os(e),
  ...Ji(e)
}), as = /\s+/, ls = (e, t) => {
  const {
    parseClassName: r,
    getClassGroupId: n,
    getConflictingClassGroupIds: o
  } = t, i = [], a = e.trim().split(as);
  let s = "";
  for (let u = a.length - 1; u >= 0; u -= 1) {
    const c = a[u], {
      modifiers: d,
      hasImportantModifier: p,
      baseClassName: h,
      maybePostfixModifierPosition: v
    } = r(c);
    let y = !!v, g = n(y ? h.substring(0, v) : h);
    if (!g) {
      if (!y) {
        s = c + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (g = n(h), !g) {
        s = c + (s.length > 0 ? " " + s : s);
        continue;
      }
      y = !1;
    }
    const b = is(d).join(":"), x = p ? b + Gn : b, w = x + g;
    if (i.includes(w))
      continue;
    i.push(w);
    const P = o(g, y);
    for (let R = 0; R < P.length; ++R) {
      const S = P[R];
      i.push(x + S);
    }
    s = c + (s.length > 0 ? " " + s : s);
  }
  return s;
};
function cs() {
  let e = 0, t, r, n = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (r = Yn(t)) && (n && (n += " "), n += r);
  return n;
}
const Yn = (e) => {
  if (typeof e == "string")
    return e;
  let t, r = "";
  for (let n = 0; n < e.length; n++)
    e[n] && (t = Yn(e[n])) && (r && (r += " "), r += t);
  return r;
};
function us(e, ...t) {
  let r, n, o, i = a;
  function a(u) {
    const c = t.reduce((d, p) => p(d), e());
    return r = ss(c), n = r.cache.get, o = r.cache.set, i = s, s(u);
  }
  function s(u) {
    const c = n(u);
    if (c)
      return c;
    const d = ls(u, r);
    return o(u, d), d;
  }
  return function() {
    return i(cs.apply(null, arguments));
  };
}
const ee = (e) => {
  const t = (r) => r[e] || [];
  return t.isThemeGetter = !0, t;
}, Kn = /^\[(?:([a-z-]+):)?(.+)\]$/i, ds = /^\d+\/\d+$/, fs = /* @__PURE__ */ new Set(["px", "full", "screen"]), ps = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, ms = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, hs = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, gs = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, vs = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Pe = (e) => et(e) || fs.has(e) || ds.test(e), Oe = (e) => st(e, "length", Ss), et = (e) => !!e && !Number.isNaN(Number(e)), er = (e) => st(e, "number", et), mt = (e) => !!e && Number.isInteger(Number(e)), bs = (e) => e.endsWith("%") && et(e.slice(0, -1)), L = (e) => Kn.test(e), je = (e) => ps.test(e), ys = /* @__PURE__ */ new Set(["length", "size", "percentage"]), xs = (e) => st(e, ys, Xn), ws = (e) => st(e, "position", Xn), Cs = /* @__PURE__ */ new Set(["image", "url"]), Es = (e) => st(e, Cs, Ps), Rs = (e) => st(e, "", ks), ht = () => !0, st = (e, t, r) => {
  const n = Kn.exec(e);
  return n ? n[1] ? typeof t == "string" ? n[1] === t : t.has(n[1]) : r(n[2]) : !1;
}, Ss = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  ms.test(e) && !hs.test(e)
), Xn = () => !1, ks = (e) => gs.test(e), Ps = (e) => vs.test(e), As = () => {
  const e = ee("colors"), t = ee("spacing"), r = ee("blur"), n = ee("brightness"), o = ee("borderColor"), i = ee("borderRadius"), a = ee("borderSpacing"), s = ee("borderWidth"), u = ee("contrast"), c = ee("grayscale"), d = ee("hueRotate"), p = ee("invert"), h = ee("gap"), v = ee("gradientColorStops"), y = ee("gradientColorStopPositions"), g = ee("inset"), b = ee("margin"), x = ee("opacity"), w = ee("padding"), P = ee("saturate"), R = ee("scale"), S = ee("sepia"), N = ee("skew"), k = ee("space"), W = ee("translate"), H = () => ["auto", "contain", "none"], $ = () => ["auto", "hidden", "clip", "visible", "scroll"], Y = () => ["auto", L, t], j = () => [L, t], B = () => ["", Pe, Oe], D = () => ["auto", et, L], Z = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], G = () => ["solid", "dashed", "dotted", "double", "none"], q = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], M = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], J = () => ["", "0", L], se = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], oe = () => [et, L];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [ht],
      spacing: [Pe, Oe],
      blur: ["none", "", je, L],
      brightness: oe(),
      borderColor: [e],
      borderRadius: ["none", "", "full", je, L],
      borderSpacing: j(),
      borderWidth: B(),
      contrast: oe(),
      grayscale: J(),
      hueRotate: oe(),
      invert: J(),
      gap: j(),
      gradientColorStops: [e],
      gradientColorStopPositions: [bs, Oe],
      inset: Y(),
      margin: Y(),
      opacity: oe(),
      padding: j(),
      saturate: oe(),
      scale: oe(),
      sepia: J(),
      skew: oe(),
      space: j(),
      translate: j()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", L]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [je]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": se()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": se()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...Z(), L]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: $()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": $()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": $()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: H()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": H()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": H()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [g]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [g]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [g]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [g]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [g]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [g]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [g]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [g]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [g]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", mt, L]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: Y()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", L]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: J()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: J()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", mt, L]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [ht]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", mt, L]
        }, L]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": D()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": D()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [ht]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [mt, L]
        }, L]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": D()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": D()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", L]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", L]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [h]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [h]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [h]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...M()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...M(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...M(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [w]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [w]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [w]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [w]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [w]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [w]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [w]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [w]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [w]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [b]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [b]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [b]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [b]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [b]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [b]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [b]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [b]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [b]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [k]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [k]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", L, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [L, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [L, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [je]
        }, je]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [L, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [L, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [L, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [L, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", je, Oe]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", er]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [ht]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractions"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", L]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", et, er]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Pe, L]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", L]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", L]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [x]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [x]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...G(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Pe, Oe]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Pe, L]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: j()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", L]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", L]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [x]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...Z(), ws]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", xs]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Es]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [y]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [y]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [y]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [v]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [v]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [i]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [i]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [i]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [i]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [i]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [i]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [i]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [i]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [i]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [i]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [i]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [i]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [i]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [i]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [i]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [s]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [s]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [s]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [s]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [s]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [s]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [s]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [s]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [s]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [x]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...G(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [s]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [s]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [x]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: G()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...G()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Pe, L]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Pe, Oe]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: B()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [x]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Pe, Oe]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", je, Rs]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [ht]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [x]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...q(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": q()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [r]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [n]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [u]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", je, L]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [c]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [d]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [p]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [P]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [S]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [r]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [n]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [u]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [c]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [d]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [p]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [x]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [P]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [S]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [a]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [a]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [a]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", L]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: oe()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", L]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: oe()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", L]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [R]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [R]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [R]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [mt, L]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [W]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [W]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [N]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [N]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", L]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", L]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": j()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": j()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": j()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": j()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": j()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": j()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": j()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": j()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": j()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": j()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": j()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": j()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": j()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": j()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": j()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": j()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": j()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": j()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", L]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Pe, Oe, er]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Ns = /* @__PURE__ */ us(As);
function V(...e) {
  return Ns(Vn(e));
}
const Os = Un(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Er = l.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, i) => {
    const a = n ? Gi : "button";
    return /* @__PURE__ */ m.jsx(
      a,
      {
        className: V(Os({ variant: t, size: r, className: e })),
        ref: i,
        ...o
      }
    );
  }
);
Er.displayName = "Button";
function Xu(e) {
  return /* @__PURE__ */ m.jsx(
    "input",
    {
      ...e,
      className: V(
        "w-full rounded-lg border border-input bg-background/50 px-3 py-2 text-sm text-foreground focus:border-ring focus:outline-none placeholder:text-muted-foreground transition-colors disabled:opacity-50",
        e.className
      )
    }
  );
}
const js = Un(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function qu({ className: e, variant: t, ...r }) {
  return /* @__PURE__ */ m.jsx("div", { className: V(js({ variant: t }), e), ...r });
}
const Ts = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "div",
  {
    ref: r,
    className: V(
      "rounded-xl border bg-card text-card-foreground shadow",
      e
    ),
    ...t
  }
));
Ts.displayName = "Card";
const _s = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "div",
  {
    ref: r,
    className: V("flex flex-col space-y-1.5 p-6", e),
    ...t
  }
));
_s.displayName = "CardHeader";
const Ms = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "div",
  {
    ref: r,
    className: V("font-semibold leading-none tracking-tight", e),
    ...t
  }
));
Ms.displayName = "CardTitle";
const Ds = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "div",
  {
    ref: r,
    className: V("text-sm text-muted-foreground", e),
    ...t
  }
));
Ds.displayName = "CardDescription";
const Ls = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx("div", { ref: r, className: V("p-6 pt-0", e), ...t }));
Ls.displayName = "CardContent";
const Is = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "div",
  {
    ref: r,
    className: V("flex items-center p-6 pt-0", e),
    ...t
  }
));
Is.displayName = "CardFooter";
var dn = 1, Fs = 0.9, Ws = 0.8, $s = 0.17, tr = 0.1, rr = 0.999, Bs = 0.9999, zs = 0.99, Vs = /[\\\/_+.#"@\[\(\{&]/, Us = /[\\\/_+.#"@\[\(\{&]/g, Hs = /[\s-]/, qn = /[\s-]/g;
function hr(e, t, r, n, o, i, a) {
  if (i === t.length) return o === e.length ? dn : zs;
  var s = `${o},${i}`;
  if (a[s] !== void 0) return a[s];
  for (var u = n.charAt(i), c = r.indexOf(u, o), d = 0, p, h, v, y; c >= 0; ) p = hr(e, t, r, n, c + 1, i + 1, a), p > d && (c === o ? p *= dn : Vs.test(e.charAt(c - 1)) ? (p *= Ws, v = e.slice(o, c - 1).match(Us), v && o > 0 && (p *= Math.pow(rr, v.length))) : Hs.test(e.charAt(c - 1)) ? (p *= Fs, y = e.slice(o, c - 1).match(qn), y && o > 0 && (p *= Math.pow(rr, y.length))) : (p *= $s, o > 0 && (p *= Math.pow(rr, c - o))), e.charAt(c) !== t.charAt(i) && (p *= Bs)), (p < tr && r.charAt(c - 1) === n.charAt(i + 1) || n.charAt(i + 1) === n.charAt(i) && r.charAt(c - 1) !== n.charAt(i)) && (h = hr(e, t, r, n, c + 1, i + 2, a), h * tr > p && (p = h * tr)), p > d && (d = p), c = r.indexOf(u, c + 1);
  return a[s] = d, d;
}
function fn(e) {
  return e.toLowerCase().replace(qn, " ");
}
function Gs(e, t, r) {
  return e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e, hr(e, t, fn(e), fn(t), 0, 0, {});
}
function fe(e, t, { checkForDefaultPrevented: r = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), r === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function Ys(e, t) {
  const r = l.createContext(t), n = (i) => {
    const { children: a, ...s } = i, u = l.useMemo(() => s, Object.values(s));
    return /* @__PURE__ */ m.jsx(r.Provider, { value: u, children: a });
  };
  n.displayName = e + "Provider";
  function o(i) {
    const a = l.useContext(r);
    if (a) return a;
    if (t !== void 0) return t;
    throw new Error(`\`${i}\` must be used within \`${e}\``);
  }
  return [n, o];
}
function Rr(e, t = []) {
  let r = [];
  function n(i, a) {
    const s = l.createContext(a), u = r.length;
    r = [...r, a];
    const c = (p) => {
      var x;
      const { scope: h, children: v, ...y } = p, g = ((x = h == null ? void 0 : h[e]) == null ? void 0 : x[u]) || s, b = l.useMemo(() => y, Object.values(y));
      return /* @__PURE__ */ m.jsx(g.Provider, { value: b, children: v });
    };
    c.displayName = i + "Provider";
    function d(p, h) {
      var g;
      const v = ((g = h == null ? void 0 : h[e]) == null ? void 0 : g[u]) || s, y = l.useContext(v);
      if (y) return y;
      if (a !== void 0) return a;
      throw new Error(`\`${p}\` must be used within \`${i}\``);
    }
    return [c, d];
  }
  const o = () => {
    const i = r.map((a) => l.createContext(a));
    return function(s) {
      const u = (s == null ? void 0 : s[e]) || i;
      return l.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: u } }),
        [s, u]
      );
    };
  };
  return o.scopeName = e, [n, Ks(o, ...t)];
}
function Ks(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const r = () => {
    const n = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(i) {
      const a = n.reduce((s, { useScope: u, scopeName: c }) => {
        const p = u(i)[`__scope${c}`];
        return { ...s, ...p };
      }, {});
      return l.useMemo(() => ({ [`__scope${t.scopeName}`]: a }), [a]);
    };
  };
  return r.scopeName = t.scopeName, r;
}
var Me = globalThis != null && globalThis.document ? l.useLayoutEffect : () => {
}, Xs = l[" useId ".trim().toString()] || (() => {
}), qs = 0;
function Ce(e) {
  const [t, r] = l.useState(Xs());
  return Me(() => {
    r((n) => n ?? String(qs++));
  }, [e]), t ? `radix-${t}` : "";
}
var Zs = l[" useInsertionEffect ".trim().toString()] || Me;
function Zn({
  prop: e,
  defaultProp: t,
  onChange: r = () => {
  },
  caller: n
}) {
  const [o, i, a] = Js({
    defaultProp: t,
    onChange: r
  }), s = e !== void 0, u = s ? e : o;
  {
    const d = l.useRef(e !== void 0);
    l.useEffect(() => {
      const p = d.current;
      p !== s && console.warn(
        `${n} is changing from ${p ? "controlled" : "uncontrolled"} to ${s ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`
      ), d.current = s;
    }, [s, n]);
  }
  const c = l.useCallback(
    (d) => {
      var p;
      if (s) {
        const h = Qs(d) ? d(e) : d;
        h !== e && ((p = a.current) == null || p.call(a, h));
      } else
        i(d);
    },
    [s, e, i, a]
  );
  return [u, c];
}
function Js({
  defaultProp: e,
  onChange: t
}) {
  const [r, n] = l.useState(e), o = l.useRef(r), i = l.useRef(t);
  return Zs(() => {
    i.current = t;
  }, [t]), l.useEffect(() => {
    var a;
    o.current !== r && ((a = i.current) == null || a.call(i, r), o.current = r);
  }, [r, o]), [r, n, i];
}
function Qs(e) {
  return typeof e == "function";
}
// @__NO_SIDE_EFFECTS__
function Sr(e) {
  const t = /* @__PURE__ */ ea(e), r = l.forwardRef((n, o) => {
    const { children: i, ...a } = n, s = l.Children.toArray(i), u = s.find(ra);
    if (u) {
      const c = u.props.children, d = s.map((p) => p === u ? l.Children.count(c) > 1 ? l.Children.only(null) : l.isValidElement(c) ? c.props.children : null : p);
      return /* @__PURE__ */ m.jsx(t, { ...a, ref: o, children: l.isValidElement(c) ? l.cloneElement(c, void 0, d) : null });
    }
    return /* @__PURE__ */ m.jsx(t, { ...a, ref: o, children: i });
  });
  return r.displayName = `${e}.Slot`, r;
}
// @__NO_SIDE_EFFECTS__
function ea(e) {
  const t = l.forwardRef((r, n) => {
    const { children: o, ...i } = r;
    if (l.isValidElement(o)) {
      const a = oa(o), s = na(i, o.props);
      return o.type !== l.Fragment && (s.ref = n ? _e(n, a) : a), l.cloneElement(o, s);
    }
    return l.Children.count(o) > 1 ? l.Children.only(null) : null;
  });
  return t.displayName = `${e}.SlotClone`, t;
}
var ta = Symbol("radix.slottable");
function ra(e) {
  return l.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === ta;
}
function na(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], i = t[n];
    /^on[A-Z]/.test(n) ? o && i ? r[n] = (...s) => {
      const u = i(...s);
      return o(...s), u;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...i } : n === "className" && (r[n] = [o, i].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
function oa(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var ia = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], ce = ia.reduce((e, t) => {
  const r = /* @__PURE__ */ Sr(`Primitive.${t}`), n = l.forwardRef((o, i) => {
    const { asChild: a, ...s } = o, u = a ? r : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m.jsx(u, { ...s, ref: i });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function sa(e, t) {
  e && Wn.flushSync(() => e.dispatchEvent(t));
}
function nt(e) {
  const t = l.useRef(e);
  return l.useEffect(() => {
    t.current = e;
  }), l.useMemo(() => (...r) => {
    var n;
    return (n = t.current) == null ? void 0 : n.call(t, ...r);
  }, []);
}
function aa(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = nt(e);
  l.useEffect(() => {
    const n = (o) => {
      o.key === "Escape" && r(o);
    };
    return t.addEventListener("keydown", n, { capture: !0 }), () => t.removeEventListener("keydown", n, { capture: !0 });
  }, [r, t]);
}
var la = "DismissableLayer", gr = "dismissableLayer.update", ca = "dismissableLayer.pointerDownOutside", ua = "dismissableLayer.focusOutside", pn, Jn = l.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), kr = l.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: r = !1,
      onEscapeKeyDown: n,
      onPointerDownOutside: o,
      onFocusOutside: i,
      onInteractOutside: a,
      onDismiss: s,
      ...u
    } = e, c = l.useContext(Jn), [d, p] = l.useState(null), h = (d == null ? void 0 : d.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, v] = l.useState({}), y = be(t, (k) => p(k)), g = Array.from(c.layers), [b] = [...c.layersWithOutsidePointerEventsDisabled].slice(-1), x = g.indexOf(b), w = d ? g.indexOf(d) : -1, P = c.layersWithOutsidePointerEventsDisabled.size > 0, R = w >= x, S = pa((k) => {
      const W = k.target, H = [...c.branches].some(($) => $.contains(W));
      !R || H || (o == null || o(k), a == null || a(k), k.defaultPrevented || s == null || s());
    }, h), N = ma((k) => {
      const W = k.target;
      [...c.branches].some(($) => $.contains(W)) || (i == null || i(k), a == null || a(k), k.defaultPrevented || s == null || s());
    }, h);
    return aa((k) => {
      w === c.layers.size - 1 && (n == null || n(k), !k.defaultPrevented && s && (k.preventDefault(), s()));
    }, h), l.useEffect(() => {
      if (d)
        return r && (c.layersWithOutsidePointerEventsDisabled.size === 0 && (pn = h.body.style.pointerEvents, h.body.style.pointerEvents = "none"), c.layersWithOutsidePointerEventsDisabled.add(d)), c.layers.add(d), mn(), () => {
          r && c.layersWithOutsidePointerEventsDisabled.size === 1 && (h.body.style.pointerEvents = pn);
        };
    }, [d, h, r, c]), l.useEffect(() => () => {
      d && (c.layers.delete(d), c.layersWithOutsidePointerEventsDisabled.delete(d), mn());
    }, [d, c]), l.useEffect(() => {
      const k = () => v({});
      return document.addEventListener(gr, k), () => document.removeEventListener(gr, k);
    }, []), /* @__PURE__ */ m.jsx(
      ce.div,
      {
        ...u,
        ref: y,
        style: {
          pointerEvents: P ? R ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: fe(e.onFocusCapture, N.onFocusCapture),
        onBlurCapture: fe(e.onBlurCapture, N.onBlurCapture),
        onPointerDownCapture: fe(
          e.onPointerDownCapture,
          S.onPointerDownCapture
        )
      }
    );
  }
);
kr.displayName = la;
var da = "DismissableLayerBranch", fa = l.forwardRef((e, t) => {
  const r = l.useContext(Jn), n = l.useRef(null), o = be(t, n);
  return l.useEffect(() => {
    const i = n.current;
    if (i)
      return r.branches.add(i), () => {
        r.branches.delete(i);
      };
  }, [r.branches]), /* @__PURE__ */ m.jsx(ce.div, { ...e, ref: o });
});
fa.displayName = da;
function pa(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = nt(e), n = l.useRef(!1), o = l.useRef(() => {
  });
  return l.useEffect(() => {
    const i = (s) => {
      if (s.target && !n.current) {
        let u = function() {
          Qn(
            ca,
            r,
            c,
            { discrete: !0 }
          );
        };
        const c = { originalEvent: s };
        s.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = u, t.addEventListener("click", o.current, { once: !0 })) : u();
      } else
        t.removeEventListener("click", o.current);
      n.current = !1;
    }, a = window.setTimeout(() => {
      t.addEventListener("pointerdown", i);
    }, 0);
    return () => {
      window.clearTimeout(a), t.removeEventListener("pointerdown", i), t.removeEventListener("click", o.current);
    };
  }, [t, r]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => n.current = !0
  };
}
function ma(e, t = globalThis == null ? void 0 : globalThis.document) {
  const r = nt(e), n = l.useRef(!1);
  return l.useEffect(() => {
    const o = (i) => {
      i.target && !n.current && Qn(ua, r, { originalEvent: i }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, r]), {
    onFocusCapture: () => n.current = !0,
    onBlurCapture: () => n.current = !1
  };
}
function mn() {
  const e = new CustomEvent(gr);
  document.dispatchEvent(e);
}
function Qn(e, t, r, { discrete: n }) {
  const o = r.originalEvent.target, i = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: r });
  t && o.addEventListener(e, t, { once: !0 }), n ? sa(o, i) : o.dispatchEvent(i);
}
var nr = "focusScope.autoFocusOnMount", or = "focusScope.autoFocusOnUnmount", hn = { bubbles: !1, cancelable: !0 }, ha = "FocusScope", Pr = l.forwardRef((e, t) => {
  const {
    loop: r = !1,
    trapped: n = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: i,
    ...a
  } = e, [s, u] = l.useState(null), c = nt(o), d = nt(i), p = l.useRef(null), h = be(t, (g) => u(g)), v = l.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  l.useEffect(() => {
    if (n) {
      let g = function(P) {
        if (v.paused || !s) return;
        const R = P.target;
        s.contains(R) ? p.current = R : Te(p.current, { select: !0 });
      }, b = function(P) {
        if (v.paused || !s) return;
        const R = P.relatedTarget;
        R !== null && (s.contains(R) || Te(p.current, { select: !0 }));
      }, x = function(P) {
        if (document.activeElement === document.body)
          for (const S of P)
            S.removedNodes.length > 0 && Te(s);
      };
      document.addEventListener("focusin", g), document.addEventListener("focusout", b);
      const w = new MutationObserver(x);
      return s && w.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", g), document.removeEventListener("focusout", b), w.disconnect();
      };
    }
  }, [n, s, v.paused]), l.useEffect(() => {
    if (s) {
      vn.add(v);
      const g = document.activeElement;
      if (!s.contains(g)) {
        const x = new CustomEvent(nr, hn);
        s.addEventListener(nr, c), s.dispatchEvent(x), x.defaultPrevented || (ga(wa(eo(s)), { select: !0 }), document.activeElement === g && Te(s));
      }
      return () => {
        s.removeEventListener(nr, c), setTimeout(() => {
          const x = new CustomEvent(or, hn);
          s.addEventListener(or, d), s.dispatchEvent(x), x.defaultPrevented || Te(g ?? document.body, { select: !0 }), s.removeEventListener(or, d), vn.remove(v);
        }, 0);
      };
    }
  }, [s, c, d, v]);
  const y = l.useCallback(
    (g) => {
      if (!r && !n || v.paused) return;
      const b = g.key === "Tab" && !g.altKey && !g.ctrlKey && !g.metaKey, x = document.activeElement;
      if (b && x) {
        const w = g.currentTarget, [P, R] = va(w);
        P && R ? !g.shiftKey && x === R ? (g.preventDefault(), r && Te(P, { select: !0 })) : g.shiftKey && x === P && (g.preventDefault(), r && Te(R, { select: !0 })) : x === w && g.preventDefault();
      }
    },
    [r, n, v.paused]
  );
  return /* @__PURE__ */ m.jsx(ce.div, { tabIndex: -1, ...a, ref: h, onKeyDown: y });
});
Pr.displayName = ha;
function ga(e, { select: t = !1 } = {}) {
  const r = document.activeElement;
  for (const n of e)
    if (Te(n, { select: t }), document.activeElement !== r) return;
}
function va(e) {
  const t = eo(e), r = gn(t, e), n = gn(t.reverse(), e);
  return [r, n];
}
function eo(e) {
  const t = [], r = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (n) => {
      const o = n.tagName === "INPUT" && n.type === "hidden";
      return n.disabled || n.hidden || o ? NodeFilter.FILTER_SKIP : n.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; r.nextNode(); ) t.push(r.currentNode);
  return t;
}
function gn(e, t) {
  for (const r of e)
    if (!ba(r, { upTo: t })) return r;
}
function ba(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function ya(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Te(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const r = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== r && ya(e) && t && e.select();
  }
}
var vn = xa();
function xa() {
  let e = [];
  return {
    add(t) {
      const r = e[0];
      t !== r && (r == null || r.pause()), e = bn(e, t), e.unshift(t);
    },
    remove(t) {
      var r;
      e = bn(e, t), (r = e[0]) == null || r.resume();
    }
  };
}
function bn(e, t) {
  const r = [...e], n = r.indexOf(t);
  return n !== -1 && r.splice(n, 1), r;
}
function wa(e) {
  return e.filter((t) => t.tagName !== "A");
}
var Ca = "Portal", Ar = l.forwardRef((e, t) => {
  var s;
  const { container: r, ...n } = e, [o, i] = l.useState(!1);
  Me(() => i(!0), []);
  const a = r || o && ((s = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : s.body);
  return a ? Bi.createPortal(/* @__PURE__ */ m.jsx(ce.div, { ...n, ref: t }), a) : null;
});
Ar.displayName = Ca;
function Ea(e, t) {
  return l.useReducer((r, n) => t[r][n] ?? r, e);
}
var at = (e) => {
  const { present: t, children: r } = e, n = Ra(t), o = typeof r == "function" ? r({ present: n.isPresent }) : l.Children.only(r), i = be(n.ref, Sa(o));
  return typeof r == "function" || n.isPresent ? l.cloneElement(o, { ref: i }) : null;
};
at.displayName = "Presence";
function Ra(e) {
  const [t, r] = l.useState(), n = l.useRef(null), o = l.useRef(e), i = l.useRef("none"), a = e ? "mounted" : "unmounted", [s, u] = Ea(a, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return l.useEffect(() => {
    const c = kt(n.current);
    i.current = s === "mounted" ? c : "none";
  }, [s]), Me(() => {
    const c = n.current, d = o.current;
    if (d !== e) {
      const h = i.current, v = kt(c);
      e ? u("MOUNT") : v === "none" || (c == null ? void 0 : c.display) === "none" ? u("UNMOUNT") : u(d && h !== v ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, u]), Me(() => {
    if (t) {
      let c;
      const d = t.ownerDocument.defaultView ?? window, p = (v) => {
        const g = kt(n.current).includes(CSS.escape(v.animationName));
        if (v.target === t && g && (u("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", c = d.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, h = (v) => {
        v.target === t && (i.current = kt(n.current));
      };
      return t.addEventListener("animationstart", h), t.addEventListener("animationcancel", p), t.addEventListener("animationend", p), () => {
        d.clearTimeout(c), t.removeEventListener("animationstart", h), t.removeEventListener("animationcancel", p), t.removeEventListener("animationend", p);
      };
    } else
      u("ANIMATION_END");
  }, [t, u]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: l.useCallback((c) => {
      n.current = c ? getComputedStyle(c) : null, r(c);
    }, [])
  };
}
function kt(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function Sa(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
var ir = 0;
function to() {
  l.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? yn()), document.body.insertAdjacentElement("beforeend", e[1] ?? yn()), ir++, () => {
      ir === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), ir--;
    };
  }, []);
}
function yn() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var xe = function() {
  return xe = Object.assign || function(t) {
    for (var r, n = 1, o = arguments.length; n < o; n++) {
      r = arguments[n];
      for (var i in r) Object.prototype.hasOwnProperty.call(r, i) && (t[i] = r[i]);
    }
    return t;
  }, xe.apply(this, arguments);
};
function ro(e, t) {
  var r = {};
  for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, n = Object.getOwnPropertySymbols(e); o < n.length; o++)
      t.indexOf(n[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[o]) && (r[n[o]] = e[n[o]]);
  return r;
}
function ka(e, t, r) {
  if (r || arguments.length === 2) for (var n = 0, o = t.length, i; n < o; n++)
    (i || !(n in t)) && (i || (i = Array.prototype.slice.call(t, 0, n)), i[n] = t[n]);
  return e.concat(i || Array.prototype.slice.call(t));
}
var Tt = "right-scroll-bar-position", _t = "width-before-scroll-bar", Pa = "with-scroll-bars-hidden", Aa = "--removed-body-scroll-bar-size";
function sr(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function Na(e, t) {
  var r = Fn(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return r.value;
        },
        set current(n) {
          var o = r.value;
          o !== n && (r.value = n, r.callback(n, o));
        }
      }
    };
  })[0];
  return r.callback = t, r.facade;
}
var Oa = typeof window < "u" ? l.useLayoutEffect : l.useEffect, xn = /* @__PURE__ */ new WeakMap();
function ja(e, t) {
  var r = Na(null, function(n) {
    return e.forEach(function(o) {
      return sr(o, n);
    });
  });
  return Oa(function() {
    var n = xn.get(r);
    if (n) {
      var o = new Set(n), i = new Set(e), a = r.current;
      o.forEach(function(s) {
        i.has(s) || sr(s, null);
      }), i.forEach(function(s) {
        o.has(s) || sr(s, a);
      });
    }
    xn.set(r, e);
  }, [e]), r;
}
function Ta(e) {
  return e;
}
function _a(e, t) {
  t === void 0 && (t = Ta);
  var r = [], n = !1, o = {
    read: function() {
      if (n)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return r.length ? r[r.length - 1] : e;
    },
    useMedium: function(i) {
      var a = t(i, n);
      return r.push(a), function() {
        r = r.filter(function(s) {
          return s !== a;
        });
      };
    },
    assignSyncMedium: function(i) {
      for (n = !0; r.length; ) {
        var a = r;
        r = [], a.forEach(i);
      }
      r = {
        push: function(s) {
          return i(s);
        },
        filter: function() {
          return r;
        }
      };
    },
    assignMedium: function(i) {
      n = !0;
      var a = [];
      if (r.length) {
        var s = r;
        r = [], s.forEach(i), a = r;
      }
      var u = function() {
        var d = a;
        a = [], d.forEach(i);
      }, c = function() {
        return Promise.resolve().then(u);
      };
      c(), r = {
        push: function(d) {
          a.push(d), c();
        },
        filter: function(d) {
          return a = a.filter(d), r;
        }
      };
    }
  };
  return o;
}
function Ma(e) {
  e === void 0 && (e = {});
  var t = _a(null);
  return t.options = xe({ async: !0, ssr: !1 }, e), t;
}
var no = function(e) {
  var t = e.sideCar, r = ro(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var n = t.read();
  if (!n)
    throw new Error("Sidecar medium not found");
  return l.createElement(n, xe({}, r));
};
no.isSideCarExport = !0;
function Da(e, t) {
  return e.useMedium(t), no;
}
var oo = Ma(), ar = function() {
}, Bt = l.forwardRef(function(e, t) {
  var r = l.useRef(null), n = l.useState({
    onScrollCapture: ar,
    onWheelCapture: ar,
    onTouchMoveCapture: ar
  }), o = n[0], i = n[1], a = e.forwardProps, s = e.children, u = e.className, c = e.removeScrollBar, d = e.enabled, p = e.shards, h = e.sideCar, v = e.noRelative, y = e.noIsolation, g = e.inert, b = e.allowPinchZoom, x = e.as, w = x === void 0 ? "div" : x, P = e.gapMode, R = ro(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noRelative", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), S = h, N = ja([r, t]), k = xe(xe({}, R), o);
  return l.createElement(
    l.Fragment,
    null,
    d && l.createElement(S, { sideCar: oo, removeScrollBar: c, shards: p, noRelative: v, noIsolation: y, inert: g, setCallbacks: i, allowPinchZoom: !!b, lockRef: r, gapMode: P }),
    a ? l.cloneElement(l.Children.only(s), xe(xe({}, k), { ref: N })) : l.createElement(w, xe({}, k, { className: u, ref: N }), s)
  );
});
Bt.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
Bt.classNames = {
  fullWidth: _t,
  zeroRight: Tt
};
var La = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function Ia() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = La();
  return t && e.setAttribute("nonce", t), e;
}
function Fa(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Wa(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var $a = function() {
  var e = 0, t = null;
  return {
    add: function(r) {
      e == 0 && (t = Ia()) && (Fa(t, r), Wa(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Ba = function() {
  var e = $a();
  return function(t, r) {
    l.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && r]);
  };
}, io = function() {
  var e = Ba(), t = function(r) {
    var n = r.styles, o = r.dynamic;
    return e(n, o), null;
  };
  return t;
}, za = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, lr = function(e) {
  return parseInt(e || "", 10) || 0;
}, Va = function(e) {
  var t = window.getComputedStyle(document.body), r = t[e === "padding" ? "paddingLeft" : "marginLeft"], n = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [lr(r), lr(n), lr(o)];
}, Ua = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return za;
  var t = Va(e), r = document.documentElement.clientWidth, n = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, n - r + t[2] - t[0])
  };
}, Ha = io(), tt = "data-scroll-locked", Ga = function(e, t, r, n) {
  var o = e.left, i = e.top, a = e.right, s = e.gap;
  return r === void 0 && (r = "margin"), `
  .`.concat(Pa, ` {
   overflow: hidden `).concat(n, `;
   padding-right: `).concat(s, "px ").concat(n, `;
  }
  body[`).concat(tt, `] {
    overflow: hidden `).concat(n, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(n, ";"),
    r === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(a, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(n, `;
    `),
    r === "padding" && "padding-right: ".concat(s, "px ").concat(n, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Tt, ` {
    right: `).concat(s, "px ").concat(n, `;
  }
  
  .`).concat(_t, ` {
    margin-right: `).concat(s, "px ").concat(n, `;
  }
  
  .`).concat(Tt, " .").concat(Tt, ` {
    right: 0 `).concat(n, `;
  }
  
  .`).concat(_t, " .").concat(_t, ` {
    margin-right: 0 `).concat(n, `;
  }
  
  body[`).concat(tt, `] {
    `).concat(Aa, ": ").concat(s, `px;
  }
`);
}, wn = function() {
  var e = parseInt(document.body.getAttribute(tt) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ya = function() {
  l.useEffect(function() {
    return document.body.setAttribute(tt, (wn() + 1).toString()), function() {
      var e = wn() - 1;
      e <= 0 ? document.body.removeAttribute(tt) : document.body.setAttribute(tt, e.toString());
    };
  }, []);
}, Ka = function(e) {
  var t = e.noRelative, r = e.noImportant, n = e.gapMode, o = n === void 0 ? "margin" : n;
  Ya();
  var i = l.useMemo(function() {
    return Ua(o);
  }, [o]);
  return l.createElement(Ha, { styles: Ga(i, !t, o, r ? "" : "!important") });
}, vr = !1;
if (typeof window < "u")
  try {
    var Pt = Object.defineProperty({}, "passive", {
      get: function() {
        return vr = !0, !0;
      }
    });
    window.addEventListener("test", Pt, Pt), window.removeEventListener("test", Pt, Pt);
  } catch {
    vr = !1;
  }
var Xe = vr ? { passive: !1 } : !1, Xa = function(e) {
  return e.tagName === "TEXTAREA";
}, so = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var r = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    r[t] !== "hidden" && // contains scroll inside self
    !(r.overflowY === r.overflowX && !Xa(e) && r[t] === "visible")
  );
}, qa = function(e) {
  return so(e, "overflowY");
}, Za = function(e) {
  return so(e, "overflowX");
}, Cn = function(e, t) {
  var r = t.ownerDocument, n = t;
  do {
    typeof ShadowRoot < "u" && n instanceof ShadowRoot && (n = n.host);
    var o = ao(e, n);
    if (o) {
      var i = lo(e, n), a = i[1], s = i[2];
      if (a > s)
        return !0;
    }
    n = n.parentNode;
  } while (n && n !== r.body);
  return !1;
}, Ja = function(e) {
  var t = e.scrollTop, r = e.scrollHeight, n = e.clientHeight;
  return [
    t,
    r,
    n
  ];
}, Qa = function(e) {
  var t = e.scrollLeft, r = e.scrollWidth, n = e.clientWidth;
  return [
    t,
    r,
    n
  ];
}, ao = function(e, t) {
  return e === "v" ? qa(t) : Za(t);
}, lo = function(e, t) {
  return e === "v" ? Ja(t) : Qa(t);
}, el = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, tl = function(e, t, r, n, o) {
  var i = el(e, window.getComputedStyle(t).direction), a = i * n, s = r.target, u = t.contains(s), c = !1, d = a > 0, p = 0, h = 0;
  do {
    if (!s)
      break;
    var v = lo(e, s), y = v[0], g = v[1], b = v[2], x = g - b - i * y;
    (y || x) && ao(e, s) && (p += x, h += y);
    var w = s.parentNode;
    s = w && w.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? w.host : w;
  } while (
    // portaled content
    !u && s !== document.body || // self content
    u && (t.contains(s) || t === s)
  );
  return (d && Math.abs(p) < 1 || !d && Math.abs(h) < 1) && (c = !0), c;
}, At = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, En = function(e) {
  return [e.deltaX, e.deltaY];
}, Rn = function(e) {
  return e && "current" in e ? e.current : e;
}, rl = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, nl = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, ol = 0, qe = [];
function il(e) {
  var t = l.useRef([]), r = l.useRef([0, 0]), n = l.useRef(), o = l.useState(ol++)[0], i = l.useState(io)[0], a = l.useRef(e);
  l.useEffect(function() {
    a.current = e;
  }, [e]), l.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var g = ka([e.lockRef.current], (e.shards || []).map(Rn), !0).filter(Boolean);
      return g.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), g.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = l.useCallback(function(g, b) {
    if ("touches" in g && g.touches.length === 2 || g.type === "wheel" && g.ctrlKey)
      return !a.current.allowPinchZoom;
    var x = At(g), w = r.current, P = "deltaX" in g ? g.deltaX : w[0] - x[0], R = "deltaY" in g ? g.deltaY : w[1] - x[1], S, N = g.target, k = Math.abs(P) > Math.abs(R) ? "h" : "v";
    if ("touches" in g && k === "h" && N.type === "range")
      return !1;
    var W = window.getSelection(), H = W && W.anchorNode, $ = H ? H === N || H.contains(N) : !1;
    if ($)
      return !1;
    var Y = Cn(k, N);
    if (!Y)
      return !0;
    if (Y ? S = k : (S = k === "v" ? "h" : "v", Y = Cn(k, N)), !Y)
      return !1;
    if (!n.current && "changedTouches" in g && (P || R) && (n.current = S), !S)
      return !0;
    var j = n.current || S;
    return tl(j, b, g, j === "h" ? P : R);
  }, []), u = l.useCallback(function(g) {
    var b = g;
    if (!(!qe.length || qe[qe.length - 1] !== i)) {
      var x = "deltaY" in b ? En(b) : At(b), w = t.current.filter(function(S) {
        return S.name === b.type && (S.target === b.target || b.target === S.shadowParent) && rl(S.delta, x);
      })[0];
      if (w && w.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!w) {
        var P = (a.current.shards || []).map(Rn).filter(Boolean).filter(function(S) {
          return S.contains(b.target);
        }), R = P.length > 0 ? s(b, P[0]) : !a.current.noIsolation;
        R && b.cancelable && b.preventDefault();
      }
    }
  }, []), c = l.useCallback(function(g, b, x, w) {
    var P = { name: g, delta: b, target: x, should: w, shadowParent: sl(x) };
    t.current.push(P), setTimeout(function() {
      t.current = t.current.filter(function(R) {
        return R !== P;
      });
    }, 1);
  }, []), d = l.useCallback(function(g) {
    r.current = At(g), n.current = void 0;
  }, []), p = l.useCallback(function(g) {
    c(g.type, En(g), g.target, s(g, e.lockRef.current));
  }, []), h = l.useCallback(function(g) {
    c(g.type, At(g), g.target, s(g, e.lockRef.current));
  }, []);
  l.useEffect(function() {
    return qe.push(i), e.setCallbacks({
      onScrollCapture: p,
      onWheelCapture: p,
      onTouchMoveCapture: h
    }), document.addEventListener("wheel", u, Xe), document.addEventListener("touchmove", u, Xe), document.addEventListener("touchstart", d, Xe), function() {
      qe = qe.filter(function(g) {
        return g !== i;
      }), document.removeEventListener("wheel", u, Xe), document.removeEventListener("touchmove", u, Xe), document.removeEventListener("touchstart", d, Xe);
    };
  }, []);
  var v = e.removeScrollBar, y = e.inert;
  return l.createElement(
    l.Fragment,
    null,
    y ? l.createElement(i, { styles: nl(o) }) : null,
    v ? l.createElement(Ka, { noRelative: e.noRelative, gapMode: e.gapMode }) : null
  );
}
function sl(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const al = Da(oo, il);
var Nr = l.forwardRef(function(e, t) {
  return l.createElement(Bt, xe({}, e, { ref: t, sideCar: al }));
});
Nr.classNames = Bt.classNames;
var ll = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ze = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Ot = {}, cr = 0, co = function(e) {
  return e && (e.host || co(e.parentNode));
}, cl = function(e, t) {
  return t.map(function(r) {
    if (e.contains(r))
      return r;
    var n = co(r);
    return n && e.contains(n) ? n : (console.error("aria-hidden", r, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(r) {
    return !!r;
  });
}, ul = function(e, t, r, n) {
  var o = cl(t, Array.isArray(e) ? e : [e]);
  Ot[r] || (Ot[r] = /* @__PURE__ */ new WeakMap());
  var i = Ot[r], a = [], s = /* @__PURE__ */ new Set(), u = new Set(o), c = function(p) {
    !p || s.has(p) || (s.add(p), c(p.parentNode));
  };
  o.forEach(c);
  var d = function(p) {
    !p || u.has(p) || Array.prototype.forEach.call(p.children, function(h) {
      if (s.has(h))
        d(h);
      else
        try {
          var v = h.getAttribute(n), y = v !== null && v !== "false", g = (Ze.get(h) || 0) + 1, b = (i.get(h) || 0) + 1;
          Ze.set(h, g), i.set(h, b), a.push(h), g === 1 && y && Nt.set(h, !0), b === 1 && h.setAttribute(r, "true"), y || h.setAttribute(n, "true");
        } catch (x) {
          console.error("aria-hidden: cannot operate on ", h, x);
        }
    });
  };
  return d(t), s.clear(), cr++, function() {
    a.forEach(function(p) {
      var h = Ze.get(p) - 1, v = i.get(p) - 1;
      Ze.set(p, h), i.set(p, v), h || (Nt.has(p) || p.removeAttribute(n), Nt.delete(p)), v || p.removeAttribute(r);
    }), cr--, cr || (Ze = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), Nt = /* @__PURE__ */ new WeakMap(), Ot = {});
  };
}, uo = function(e, t, r) {
  r === void 0 && (r = "data-aria-hidden");
  var n = Array.from(Array.isArray(e) ? e : [e]), o = ll(e);
  return o ? (n.push.apply(n, Array.from(o.querySelectorAll("[aria-live], script"))), ul(n, o, r, "aria-hidden")) : function() {
    return null;
  };
}, zt = "Dialog", [fo] = Rr(zt), [dl, ye] = fo(zt), po = (e) => {
  const {
    __scopeDialog: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: i,
    modal: a = !0
  } = e, s = l.useRef(null), u = l.useRef(null), [c, d] = Zn({
    prop: n,
    defaultProp: o ?? !1,
    onChange: i,
    caller: zt
  });
  return /* @__PURE__ */ m.jsx(
    dl,
    {
      scope: t,
      triggerRef: s,
      contentRef: u,
      contentId: Ce(),
      titleId: Ce(),
      descriptionId: Ce(),
      open: c,
      onOpenChange: d,
      onOpenToggle: l.useCallback(() => d((p) => !p), [d]),
      modal: a,
      children: r
    }
  );
};
po.displayName = zt;
var mo = "DialogTrigger", fl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = ye(mo, r), i = be(t, o.triggerRef);
    return /* @__PURE__ */ m.jsx(
      ce.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": Tr(o.open),
        ...n,
        ref: i,
        onClick: fe(e.onClick, o.onOpenToggle)
      }
    );
  }
);
fl.displayName = mo;
var Or = "DialogPortal", [pl, ho] = fo(Or, {
  forceMount: void 0
}), go = (e) => {
  const { __scopeDialog: t, forceMount: r, children: n, container: o } = e, i = ye(Or, t);
  return /* @__PURE__ */ m.jsx(pl, { scope: t, forceMount: r, children: l.Children.map(n, (a) => /* @__PURE__ */ m.jsx(at, { present: r || i.open, children: /* @__PURE__ */ m.jsx(Ar, { asChild: !0, container: o, children: a }) })) });
};
go.displayName = Or;
var Lt = "DialogOverlay", vo = l.forwardRef(
  (e, t) => {
    const r = ho(Lt, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, i = ye(Lt, e.__scopeDialog);
    return i.modal ? /* @__PURE__ */ m.jsx(at, { present: n || i.open, children: /* @__PURE__ */ m.jsx(hl, { ...o, ref: t }) }) : null;
  }
);
vo.displayName = Lt;
var ml = /* @__PURE__ */ Sr("DialogOverlay.RemoveScroll"), hl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = ye(Lt, r);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ m.jsx(Nr, { as: ml, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ m.jsx(
        ce.div,
        {
          "data-state": Tr(o.open),
          ...n,
          ref: t,
          style: { pointerEvents: "auto", ...n.style }
        }
      ) })
    );
  }
), Ve = "DialogContent", bo = l.forwardRef(
  (e, t) => {
    const r = ho(Ve, e.__scopeDialog), { forceMount: n = r.forceMount, ...o } = e, i = ye(Ve, e.__scopeDialog);
    return /* @__PURE__ */ m.jsx(at, { present: n || i.open, children: i.modal ? /* @__PURE__ */ m.jsx(gl, { ...o, ref: t }) : /* @__PURE__ */ m.jsx(vl, { ...o, ref: t }) });
  }
);
bo.displayName = Ve;
var gl = l.forwardRef(
  (e, t) => {
    const r = ye(Ve, e.__scopeDialog), n = l.useRef(null), o = be(t, r.contentRef, n);
    return l.useEffect(() => {
      const i = n.current;
      if (i) return uo(i);
    }, []), /* @__PURE__ */ m.jsx(
      yo,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: fe(e.onCloseAutoFocus, (i) => {
          var a;
          i.preventDefault(), (a = r.triggerRef.current) == null || a.focus();
        }),
        onPointerDownOutside: fe(e.onPointerDownOutside, (i) => {
          const a = i.detail.originalEvent, s = a.button === 0 && a.ctrlKey === !0;
          (a.button === 2 || s) && i.preventDefault();
        }),
        onFocusOutside: fe(
          e.onFocusOutside,
          (i) => i.preventDefault()
        )
      }
    );
  }
), vl = l.forwardRef(
  (e, t) => {
    const r = ye(Ve, e.__scopeDialog), n = l.useRef(!1), o = l.useRef(!1);
    return /* @__PURE__ */ m.jsx(
      yo,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (i) => {
          var a, s;
          (a = e.onCloseAutoFocus) == null || a.call(e, i), i.defaultPrevented || (n.current || (s = r.triggerRef.current) == null || s.focus(), i.preventDefault()), n.current = !1, o.current = !1;
        },
        onInteractOutside: (i) => {
          var u, c;
          (u = e.onInteractOutside) == null || u.call(e, i), i.defaultPrevented || (n.current = !0, i.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = i.target;
          ((c = r.triggerRef.current) == null ? void 0 : c.contains(a)) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && o.current && i.preventDefault();
        }
      }
    );
  }
), yo = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, trapFocus: n, onOpenAutoFocus: o, onCloseAutoFocus: i, ...a } = e, s = ye(Ve, r), u = l.useRef(null), c = be(t, u);
    return to(), /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
      /* @__PURE__ */ m.jsx(
        Pr,
        {
          asChild: !0,
          loop: !0,
          trapped: n,
          onMountAutoFocus: o,
          onUnmountAutoFocus: i,
          children: /* @__PURE__ */ m.jsx(
            kr,
            {
              role: "dialog",
              id: s.contentId,
              "aria-describedby": s.descriptionId,
              "aria-labelledby": s.titleId,
              "data-state": Tr(s.open),
              ...a,
              ref: c,
              onDismiss: () => s.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ m.jsxs(m.Fragment, { children: [
        /* @__PURE__ */ m.jsx(wl, { titleId: s.titleId }),
        /* @__PURE__ */ m.jsx(El, { contentRef: u, descriptionId: s.descriptionId })
      ] })
    ] });
  }
), jr = "DialogTitle", bl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = ye(jr, r);
    return /* @__PURE__ */ m.jsx(ce.h2, { id: o.titleId, ...n, ref: t });
  }
);
bl.displayName = jr;
var xo = "DialogDescription", yl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = ye(xo, r);
    return /* @__PURE__ */ m.jsx(ce.p, { id: o.descriptionId, ...n, ref: t });
  }
);
yl.displayName = xo;
var wo = "DialogClose", xl = l.forwardRef(
  (e, t) => {
    const { __scopeDialog: r, ...n } = e, o = ye(wo, r);
    return /* @__PURE__ */ m.jsx(
      ce.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: fe(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
xl.displayName = wo;
function Tr(e) {
  return e ? "open" : "closed";
}
var Co = "DialogTitleWarning", [Zu, Eo] = Ys(Co, {
  contentName: Ve,
  titleName: jr,
  docsSlug: "dialog"
}), wl = ({ titleId: e }) => {
  const t = Eo(Co), r = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return l.useEffect(() => {
    e && (document.getElementById(e) || console.error(r));
  }, [r, e]), null;
}, Cl = "DialogDescriptionWarning", El = ({ contentRef: e, descriptionId: t }) => {
  const n = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${Eo(Cl).contentName}}.`;
  return l.useEffect(() => {
    var i;
    const o = (i = e.current) == null ? void 0 : i.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(n));
  }, [n, e, t]), null;
}, Rl = po, Sl = go, kl = vo, Pl = bo, Al = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], Fe = Al.reduce((e, t) => {
  const r = /* @__PURE__ */ Bn(`Primitive.${t}`), n = l.forwardRef((o, i) => {
    const { asChild: a, ...s } = o, u = a ? r : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ m.jsx(u, { ...s, ref: i });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {}), gt = '[cmdk-group=""]', ur = '[cmdk-group-items=""]', Nl = '[cmdk-group-heading=""]', Ro = '[cmdk-item=""]', Sn = `${Ro}:not([aria-disabled="true"])`, br = "cmdk-item-select", Je = "data-value", Ol = (e, t, r) => Gs(e, t, r), So = l.createContext(void 0), yt = () => l.useContext(So), ko = l.createContext(void 0), _r = () => l.useContext(ko), Po = l.createContext(void 0), Ao = l.forwardRef((e, t) => {
  let r = Qe(() => {
    var E, T;
    return { search: "", value: (T = (E = e.value) != null ? E : e.defaultValue) != null ? T : "", selectedItemId: void 0, filtered: { count: 0, items: /* @__PURE__ */ new Map(), groups: /* @__PURE__ */ new Set() } };
  }), n = Qe(() => /* @__PURE__ */ new Set()), o = Qe(() => /* @__PURE__ */ new Map()), i = Qe(() => /* @__PURE__ */ new Map()), a = Qe(() => /* @__PURE__ */ new Set()), s = No(e), { label: u, children: c, value: d, onValueChange: p, filter: h, shouldFilter: v, loop: y, disablePointerSelection: g = !1, vimBindings: b = !0, ...x } = e, w = Ce(), P = Ce(), R = Ce(), S = l.useRef(null), N = Bl();
  Ue(() => {
    if (d !== void 0) {
      let E = d.trim();
      r.current.value = E, k.emit();
    }
  }, [d]), Ue(() => {
    N(6, B);
  }, []);
  let k = l.useMemo(() => ({ subscribe: (E) => (a.current.add(E), () => a.current.delete(E)), snapshot: () => r.current, setState: (E, T, I) => {
    var O, U, K, re;
    if (!Object.is(r.current[E], T)) {
      if (r.current[E] = T, E === "search") j(), $(), N(1, Y);
      else if (E === "value") {
        if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
          let te = document.getElementById(R);
          te ? te.focus() : (O = document.getElementById(w)) == null || O.focus();
        }
        if (N(7, () => {
          var te;
          r.current.selectedItemId = (te = D()) == null ? void 0 : te.id, k.emit();
        }), I || N(5, B), ((U = s.current) == null ? void 0 : U.value) !== void 0) {
          let te = T ?? "";
          (re = (K = s.current).onValueChange) == null || re.call(K, te);
          return;
        }
      }
      k.emit();
    }
  }, emit: () => {
    a.current.forEach((E) => E());
  } }), []), W = l.useMemo(() => ({ value: (E, T, I) => {
    var O;
    T !== ((O = i.current.get(E)) == null ? void 0 : O.value) && (i.current.set(E, { value: T, keywords: I }), r.current.filtered.items.set(E, H(T, I)), N(2, () => {
      $(), k.emit();
    }));
  }, item: (E, T) => (n.current.add(E), T && (o.current.has(T) ? o.current.get(T).add(E) : o.current.set(T, /* @__PURE__ */ new Set([E]))), N(3, () => {
    j(), $(), r.current.value || Y(), k.emit();
  }), () => {
    i.current.delete(E), n.current.delete(E), r.current.filtered.items.delete(E);
    let I = D();
    N(4, () => {
      j(), (I == null ? void 0 : I.getAttribute("id")) === E && Y(), k.emit();
    });
  }), group: (E) => (o.current.has(E) || o.current.set(E, /* @__PURE__ */ new Set()), () => {
    i.current.delete(E), o.current.delete(E);
  }), filter: () => s.current.shouldFilter, label: u || e["aria-label"], getDisablePointerSelection: () => s.current.disablePointerSelection, listId: w, inputId: R, labelId: P, listInnerRef: S }), []);
  function H(E, T) {
    var I, O;
    let U = (O = (I = s.current) == null ? void 0 : I.filter) != null ? O : Ol;
    return E ? U(E, r.current.search, T) : 0;
  }
  function $() {
    if (!r.current.search || s.current.shouldFilter === !1) return;
    let E = r.current.filtered.items, T = [];
    r.current.filtered.groups.forEach((O) => {
      let U = o.current.get(O), K = 0;
      U.forEach((re) => {
        let te = E.get(re);
        K = Math.max(te, K);
      }), T.push([O, K]);
    });
    let I = S.current;
    Z().sort((O, U) => {
      var K, re;
      let te = O.getAttribute("id"), me = U.getAttribute("id");
      return ((K = E.get(me)) != null ? K : 0) - ((re = E.get(te)) != null ? re : 0);
    }).forEach((O) => {
      let U = O.closest(ur);
      U ? U.appendChild(O.parentElement === U ? O : O.closest(`${ur} > *`)) : I.appendChild(O.parentElement === I ? O : O.closest(`${ur} > *`));
    }), T.sort((O, U) => U[1] - O[1]).forEach((O) => {
      var U;
      let K = (U = S.current) == null ? void 0 : U.querySelector(`${gt}[${Je}="${encodeURIComponent(O[0])}"]`);
      K == null || K.parentElement.appendChild(K);
    });
  }
  function Y() {
    let E = Z().find((I) => I.getAttribute("aria-disabled") !== "true"), T = E == null ? void 0 : E.getAttribute(Je);
    k.setState("value", T || void 0);
  }
  function j() {
    var E, T, I, O;
    if (!r.current.search || s.current.shouldFilter === !1) {
      r.current.filtered.count = n.current.size;
      return;
    }
    r.current.filtered.groups = /* @__PURE__ */ new Set();
    let U = 0;
    for (let K of n.current) {
      let re = (T = (E = i.current.get(K)) == null ? void 0 : E.value) != null ? T : "", te = (O = (I = i.current.get(K)) == null ? void 0 : I.keywords) != null ? O : [], me = H(re, te);
      r.current.filtered.items.set(K, me), me > 0 && U++;
    }
    for (let [K, re] of o.current) for (let te of re) if (r.current.filtered.items.get(te) > 0) {
      r.current.filtered.groups.add(K);
      break;
    }
    r.current.filtered.count = U;
  }
  function B() {
    var E, T, I;
    let O = D();
    O && (((E = O.parentElement) == null ? void 0 : E.firstChild) === O && ((I = (T = O.closest(gt)) == null ? void 0 : T.querySelector(Nl)) == null || I.scrollIntoView({ block: "nearest" })), O.scrollIntoView({ block: "nearest" }));
  }
  function D() {
    var E;
    return (E = S.current) == null ? void 0 : E.querySelector(`${Ro}[aria-selected="true"]`);
  }
  function Z() {
    var E;
    return Array.from(((E = S.current) == null ? void 0 : E.querySelectorAll(Sn)) || []);
  }
  function G(E) {
    let T = Z()[E];
    T && k.setState("value", T.getAttribute(Je));
  }
  function q(E) {
    var T;
    let I = D(), O = Z(), U = O.findIndex((re) => re === I), K = O[U + E];
    (T = s.current) != null && T.loop && (K = U + E < 0 ? O[O.length - 1] : U + E === O.length ? O[0] : O[U + E]), K && k.setState("value", K.getAttribute(Je));
  }
  function M(E) {
    let T = D(), I = T == null ? void 0 : T.closest(gt), O;
    for (; I && !O; ) I = E > 0 ? Wl(I, gt) : $l(I, gt), O = I == null ? void 0 : I.querySelector(Sn);
    O ? k.setState("value", O.getAttribute(Je)) : q(E);
  }
  let J = () => G(Z().length - 1), se = (E) => {
    E.preventDefault(), E.metaKey ? J() : E.altKey ? M(1) : q(1);
  }, oe = (E) => {
    E.preventDefault(), E.metaKey ? G(0) : E.altKey ? M(-1) : q(-1);
  };
  return l.createElement(Fe.div, { ref: t, tabIndex: -1, ...x, "cmdk-root": "", onKeyDown: (E) => {
    var T;
    (T = x.onKeyDown) == null || T.call(x, E);
    let I = E.nativeEvent.isComposing || E.keyCode === 229;
    if (!(E.defaultPrevented || I)) switch (E.key) {
      case "n":
      case "j": {
        b && E.ctrlKey && se(E);
        break;
      }
      case "ArrowDown": {
        se(E);
        break;
      }
      case "p":
      case "k": {
        b && E.ctrlKey && oe(E);
        break;
      }
      case "ArrowUp": {
        oe(E);
        break;
      }
      case "Home": {
        E.preventDefault(), G(0);
        break;
      }
      case "End": {
        E.preventDefault(), J();
        break;
      }
      case "Enter": {
        E.preventDefault();
        let O = D();
        if (O) {
          let U = new Event(br);
          O.dispatchEvent(U);
        }
      }
    }
  } }, l.createElement("label", { "cmdk-label": "", htmlFor: W.inputId, id: W.labelId, style: Vl }, u), Vt(e, (E) => l.createElement(ko.Provider, { value: k }, l.createElement(So.Provider, { value: W }, E))));
}), jl = l.forwardRef((e, t) => {
  var r, n;
  let o = Ce(), i = l.useRef(null), a = l.useContext(Po), s = yt(), u = No(e), c = (n = (r = u.current) == null ? void 0 : r.forceMount) != null ? n : a == null ? void 0 : a.forceMount;
  Ue(() => {
    if (!c) return s.item(o, a == null ? void 0 : a.id);
  }, [c]);
  let d = Oo(o, i, [e.value, e.children, i], e.keywords), p = _r(), h = De((N) => N.value && N.value === d.current), v = De((N) => c || s.filter() === !1 ? !0 : N.search ? N.filtered.items.get(o) > 0 : !0);
  l.useEffect(() => {
    let N = i.current;
    if (!(!N || e.disabled)) return N.addEventListener(br, y), () => N.removeEventListener(br, y);
  }, [v, e.onSelect, e.disabled]);
  function y() {
    var N, k;
    g(), (k = (N = u.current).onSelect) == null || k.call(N, d.current);
  }
  function g() {
    p.setState("value", d.current, !0);
  }
  if (!v) return null;
  let { disabled: b, value: x, onSelect: w, forceMount: P, keywords: R, ...S } = e;
  return l.createElement(Fe.div, { ref: _e(i, t), ...S, id: o, "cmdk-item": "", role: "option", "aria-disabled": !!b, "aria-selected": !!h, "data-disabled": !!b, "data-selected": !!h, onPointerMove: b || s.getDisablePointerSelection() ? void 0 : g, onClick: b ? void 0 : y }, e.children);
}), Tl = l.forwardRef((e, t) => {
  let { heading: r, children: n, forceMount: o, ...i } = e, a = Ce(), s = l.useRef(null), u = l.useRef(null), c = Ce(), d = yt(), p = De((v) => o || d.filter() === !1 ? !0 : v.search ? v.filtered.groups.has(a) : !0);
  Ue(() => d.group(a), []), Oo(a, s, [e.value, e.heading, u]);
  let h = l.useMemo(() => ({ id: a, forceMount: o }), [o]);
  return l.createElement(Fe.div, { ref: _e(s, t), ...i, "cmdk-group": "", role: "presentation", hidden: p ? void 0 : !0 }, r && l.createElement("div", { ref: u, "cmdk-group-heading": "", "aria-hidden": !0, id: c }, r), Vt(e, (v) => l.createElement("div", { "cmdk-group-items": "", role: "group", "aria-labelledby": r ? c : void 0 }, l.createElement(Po.Provider, { value: h }, v))));
}), _l = l.forwardRef((e, t) => {
  let { alwaysRender: r, ...n } = e, o = l.useRef(null), i = De((a) => !a.search);
  return !r && !i ? null : l.createElement(Fe.div, { ref: _e(o, t), ...n, "cmdk-separator": "", role: "separator" });
}), Ml = l.forwardRef((e, t) => {
  let { onValueChange: r, ...n } = e, o = e.value != null, i = _r(), a = De((c) => c.search), s = De((c) => c.selectedItemId), u = yt();
  return l.useEffect(() => {
    e.value != null && i.setState("search", e.value);
  }, [e.value]), l.createElement(Fe.input, { ref: t, ...n, "cmdk-input": "", autoComplete: "off", autoCorrect: "off", spellCheck: !1, "aria-autocomplete": "list", role: "combobox", "aria-expanded": !0, "aria-controls": u.listId, "aria-labelledby": u.labelId, "aria-activedescendant": s, id: u.inputId, type: "text", value: o ? e.value : a, onChange: (c) => {
    o || i.setState("search", c.target.value), r == null || r(c.target.value);
  } });
}), Dl = l.forwardRef((e, t) => {
  let { children: r, label: n = "Suggestions", ...o } = e, i = l.useRef(null), a = l.useRef(null), s = De((c) => c.selectedItemId), u = yt();
  return l.useEffect(() => {
    if (a.current && i.current) {
      let c = a.current, d = i.current, p, h = new ResizeObserver(() => {
        p = requestAnimationFrame(() => {
          let v = c.offsetHeight;
          d.style.setProperty("--cmdk-list-height", v.toFixed(1) + "px");
        });
      });
      return h.observe(c), () => {
        cancelAnimationFrame(p), h.unobserve(c);
      };
    }
  }, []), l.createElement(Fe.div, { ref: _e(i, t), ...o, "cmdk-list": "", role: "listbox", tabIndex: -1, "aria-activedescendant": s, "aria-label": n, id: u.listId }, Vt(e, (c) => l.createElement("div", { ref: _e(a, u.listInnerRef), "cmdk-list-sizer": "" }, c)));
}), Ll = l.forwardRef((e, t) => {
  let { open: r, onOpenChange: n, overlayClassName: o, contentClassName: i, container: a, ...s } = e;
  return l.createElement(Rl, { open: r, onOpenChange: n }, l.createElement(Sl, { container: a }, l.createElement(kl, { "cmdk-overlay": "", className: o }), l.createElement(Pl, { "aria-label": e.label, "cmdk-dialog": "", className: i }, l.createElement(Ao, { ref: t, ...s }))));
}), Il = l.forwardRef((e, t) => De((r) => r.filtered.count === 0) ? l.createElement(Fe.div, { ref: t, ...e, "cmdk-empty": "", role: "presentation" }) : null), Fl = l.forwardRef((e, t) => {
  let { progress: r, children: n, label: o = "Loading...", ...i } = e;
  return l.createElement(Fe.div, { ref: t, ...i, "cmdk-loading": "", role: "progressbar", "aria-valuenow": r, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": o }, Vt(e, (a) => l.createElement("div", { "aria-hidden": !0 }, a)));
}), ue = Object.assign(Ao, { List: Dl, Item: jl, Input: Ml, Group: Tl, Separator: _l, Dialog: Ll, Empty: Il, Loading: Fl });
function Wl(e, t) {
  let r = e.nextElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.nextElementSibling;
  }
}
function $l(e, t) {
  let r = e.previousElementSibling;
  for (; r; ) {
    if (r.matches(t)) return r;
    r = r.previousElementSibling;
  }
}
function No(e) {
  let t = l.useRef(e);
  return Ue(() => {
    t.current = e;
  }), t;
}
var Ue = typeof window > "u" ? l.useEffect : l.useLayoutEffect;
function Qe(e) {
  let t = l.useRef();
  return t.current === void 0 && (t.current = e()), t;
}
function De(e) {
  let t = _r(), r = () => e(t.snapshot());
  return l.useSyncExternalStore(t.subscribe, r, r);
}
function Oo(e, t, r, n = []) {
  let o = l.useRef(), i = yt();
  return Ue(() => {
    var a;
    let s = (() => {
      var c;
      for (let d of r) {
        if (typeof d == "string") return d.trim();
        if (typeof d == "object" && "current" in d) return d.current ? (c = d.current.textContent) == null ? void 0 : c.trim() : o.current;
      }
    })(), u = n.map((c) => c.trim());
    i.value(e, s, u), (a = t.current) == null || a.setAttribute(Je, s), o.current = s;
  }), o;
}
var Bl = () => {
  let [e, t] = l.useState(), r = Qe(() => /* @__PURE__ */ new Map());
  return Ue(() => {
    r.current.forEach((n) => n()), r.current = /* @__PURE__ */ new Map();
  }, [e]), (n, o) => {
    r.current.set(n, o), t({});
  };
};
function zl(e) {
  let t = e.type;
  return typeof t == "function" ? t(e.props) : "render" in t ? t.render(e.props) : e;
}
function Vt({ asChild: e, children: t }, r) {
  return e && l.isValidElement(t) ? l.cloneElement(zl(t), { ref: t.ref }, r(t.props.children)) : r(t);
}
var Vl = { position: "absolute", width: "1px", height: "1px", padding: "0", margin: "-1px", overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0" };
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ul = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round"
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Hl = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase().trim(), lt = (e, t) => {
  const r = Wi(
    ({
      color: n = "currentColor",
      size: o = 24,
      strokeWidth: i = 2,
      absoluteStrokeWidth: a,
      className: s = "",
      children: u,
      ...c
    }, d) => tn(
      "svg",
      {
        ref: d,
        ...Ul,
        width: o,
        height: o,
        stroke: n,
        strokeWidth: a ? Number(i) * 24 / Number(o) : i,
        className: ["lucide", `lucide-${Hl(e)}`, s].join(" "),
        ...c
      },
      [
        ...t.map(([p, h]) => tn(p, h)),
        ...Array.isArray(u) ? u : [u]
      ]
    )
  );
  return r.displayName = `${e}`, r;
};
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Gl = lt("Check", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Yl = lt("ChevronLeft", [
  ["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kl = lt("ChevronRight", [
  ["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Xl = lt("ChevronsUpDown", [
  ["path", { d: "m7 15 5 5 5-5", key: "1hf1tw" }],
  ["path", { d: "m7 9 5-5 5 5", key: "sgt6xg" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ql = lt("Search", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Zl = lt("X", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), jo = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  ue,
  {
    ref: r,
    className: V(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      e
    ),
    ...t
  }
));
jo.displayName = ue.displayName;
const To = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsxs("div", { className: "flex items-center border-b px-3", "cmdk-input-wrapper": "", children: [
  /* @__PURE__ */ m.jsx(ql, { className: "mr-2 h-4 w-4 shrink-0 opacity-50" }),
  /* @__PURE__ */ m.jsx(
    ue.Input,
    {
      ref: r,
      className: V(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        e
      ),
      ...t
    }
  )
] }));
To.displayName = ue.Input.displayName;
const Jl = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  ue.List,
  {
    ref: r,
    className: V("max-h-[300px] overflow-y-auto overflow-x-hidden", e),
    ...t
  }
));
Jl.displayName = ue.List.displayName;
const _o = l.forwardRef((e, t) => /* @__PURE__ */ m.jsx(
  ue.Empty,
  {
    ref: t,
    className: "py-6 text-center text-sm",
    ...e
  }
));
_o.displayName = ue.Empty.displayName;
const Mo = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  ue.Group,
  {
    ref: r,
    className: V(
      "overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground",
      e
    ),
    ...t
  }
));
Mo.displayName = ue.Group.displayName;
const Ql = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  ue.Separator,
  {
    ref: r,
    className: V("-mx-1 h-px bg-border", e),
    ...t
  }
));
Ql.displayName = ue.Separator.displayName;
const Do = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  ue.Item,
  {
    ref: r,
    className: V(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground",
      e
    ),
    ...t
  }
));
Do.displayName = ue.Item.displayName;
const ec = ({
  className: e,
  ...t
}) => /* @__PURE__ */ m.jsx(
  "span",
  {
    className: V(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      e
    ),
    ...t
  }
);
ec.displayName = "CommandShortcut";
function tc({ children: e, onClose: t, className: r }) {
  return rn(() => {
    function n(o) {
      (o.key === "Escape" || o.key === "Esc") && t && t();
    }
    return window.addEventListener("keydown", n), () => window.removeEventListener("keydown", n);
  }, [t]), rn(() => {
    try {
      document.body.dataset.psModalOpen = "true";
    } catch {
    }
    return () => {
      try {
        delete document.body.dataset.psModalOpen;
      } catch {
      }
    };
  }, []), /* @__PURE__ */ m.jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [
    /* @__PURE__ */ m.jsx("div", { className: "absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity", onClick: t }),
    /* @__PURE__ */ m.jsx(
      "div",
      {
        className: V(
          "relative w-full max-w-sm transform rounded-xl bg-card border border-border p-6 shadow-2xl transition-all",
          // Changed to max-w-sm (24rem / 384px) for tighter look
          "animate-in fade-in zoom-in-95 duration-200",
          r
        ),
        children: e
      }
    )
  ] });
}
function Ju({ title: e, children: t, onClose: r, className: n }) {
  return /* @__PURE__ */ m.jsxs(tc, { onClose: r, className: n, children: [
    /* @__PURE__ */ m.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
      /* @__PURE__ */ m.jsx("h3", { className: "text-xl font-bold tracking-tight text-foreground", children: e }),
      /* @__PURE__ */ m.jsx("button", { onClick: r, className: "text-muted-foreground hover:text-foreground transition-colors", children: /* @__PURE__ */ m.jsx(Zl, { className: "w-5 h-5" }) })
    ] }),
    /* @__PURE__ */ m.jsx("div", { children: t })
  ] });
}
const Qu = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "9", r: "2.5", fill: "currentColor" })
] }), ed = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M21 15v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("path", { d: "M7 10l5-5 5 5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("path", { d: "M12 5v12", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
] }), td = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M21 12H7", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("path", { d: "M11 16l-4-4 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
] }), rd = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M21 12a9 9 0 11-3-6.6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("path", { d: "M12 8v8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("path", { d: "M8 12h8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
] }), nd = (e = {}) => /* @__PURE__ */ m.jsx("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ m.jsx("path", { d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" }) }), od = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("rect", { x: "2", y: "7", width: "20", height: "14", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
  /* @__PURE__ */ m.jsx("path", { d: "M12 11v6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "10", r: "1.5", fill: "currentColor" })
] }), id = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M16 3l3 3v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6l3-3", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("path", { d: "M9 8h6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
] }), sd = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "12", r: "3", stroke: "currentColor", strokeWidth: "1.5" })
] }), ad = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z", stroke: "currentColor", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("path", { d: "M12 9v4", stroke: "currentColor", strokeWidth: "1.4", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "17", r: "0.8", fill: "currentColor" })
] }), ld = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("path", { d: "M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }),
  /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "7", r: "4", stroke: "currentColor", strokeWidth: "1.5" }),
  /* @__PURE__ */ m.jsx("path", { d: "M15 10l-6-6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
] }), cd = (e = {}) => /* @__PURE__ */ m.jsxs("svg", { className: e.className, width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
  /* @__PURE__ */ m.jsx("circle", { cx: "12", cy: "12", r: "9", stroke: "currentColor", strokeWidth: "1.5" }),
  /* @__PURE__ */ m.jsx("path", { d: "M4.93 4.93l14.14 14.14", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
] });
function ud({ title: e, icon: t, count: r, countLabel: n, children: o, className: i, ...a }) {
  return /* @__PURE__ */ m.jsxs("div", { className: V("w-full h-auto min-h-[5rem] border-b border-border flex items-center justify-between py-4 px-6 bg-card/30 shrink-0", i), ...a, children: [
    /* @__PURE__ */ m.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ m.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ m.jsx(t, { className: "w-6 h-6 text-primary" }),
        /* @__PURE__ */ m.jsx("h1", { className: "text-xl font-bold tracking-tight text-foreground", children: e })
      ] }),
      r !== void 0 && /* @__PURE__ */ m.jsxs("div", { className: "bg-primary/20 text-primary text-xs font-bold px-2 py-0.5 rounded-full", children: [
        r,
        " ",
        (n || "Records").toUpperCase()
      ] })
    ] }),
    /* @__PURE__ */ m.jsx("div", { className: "flex items-center gap-3", children: o })
  ] });
}
const rc = ["top", "right", "bottom", "left"], Le = Math.min, de = Math.max, It = Math.round, jt = Math.floor, Ee = (e) => ({
  x: e,
  y: e
}), nc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, oc = {
  start: "end",
  end: "start"
};
function yr(e, t, r) {
  return de(e, Le(t, r));
}
function Ae(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ne(e) {
  return e.split("-")[0];
}
function ct(e) {
  return e.split("-")[1];
}
function Mr(e) {
  return e === "x" ? "y" : "x";
}
function Dr(e) {
  return e === "y" ? "height" : "width";
}
const ic = /* @__PURE__ */ new Set(["top", "bottom"]);
function we(e) {
  return ic.has(Ne(e)) ? "y" : "x";
}
function Lr(e) {
  return Mr(we(e));
}
function sc(e, t, r) {
  r === void 0 && (r = !1);
  const n = ct(e), o = Lr(e), i = Dr(o);
  let a = o === "x" ? n === (r ? "end" : "start") ? "right" : "left" : n === "start" ? "bottom" : "top";
  return t.reference[i] > t.floating[i] && (a = Ft(a)), [a, Ft(a)];
}
function ac(e) {
  const t = Ft(e);
  return [xr(e), t, xr(t)];
}
function xr(e) {
  return e.replace(/start|end/g, (t) => oc[t]);
}
const kn = ["left", "right"], Pn = ["right", "left"], lc = ["top", "bottom"], cc = ["bottom", "top"];
function uc(e, t, r) {
  switch (e) {
    case "top":
    case "bottom":
      return r ? t ? Pn : kn : t ? kn : Pn;
    case "left":
    case "right":
      return t ? lc : cc;
    default:
      return [];
  }
}
function dc(e, t, r, n) {
  const o = ct(e);
  let i = uc(Ne(e), r === "start", n);
  return o && (i = i.map((a) => a + "-" + o), t && (i = i.concat(i.map(xr)))), i;
}
function Ft(e) {
  return e.replace(/left|right|bottom|top/g, (t) => nc[t]);
}
function fc(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Lo(e) {
  return typeof e != "number" ? fc(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Wt(e) {
  const {
    x: t,
    y: r,
    width: n,
    height: o
  } = e;
  return {
    width: n,
    height: o,
    top: r,
    left: t,
    right: t + n,
    bottom: r + o,
    x: t,
    y: r
  };
}
function An(e, t, r) {
  let {
    reference: n,
    floating: o
  } = e;
  const i = we(t), a = Lr(t), s = Dr(a), u = Ne(t), c = i === "y", d = n.x + n.width / 2 - o.width / 2, p = n.y + n.height / 2 - o.height / 2, h = n[s] / 2 - o[s] / 2;
  let v;
  switch (u) {
    case "top":
      v = {
        x: d,
        y: n.y - o.height
      };
      break;
    case "bottom":
      v = {
        x: d,
        y: n.y + n.height
      };
      break;
    case "right":
      v = {
        x: n.x + n.width,
        y: p
      };
      break;
    case "left":
      v = {
        x: n.x - o.width,
        y: p
      };
      break;
    default:
      v = {
        x: n.x,
        y: n.y
      };
  }
  switch (ct(t)) {
    case "start":
      v[a] -= h * (r && c ? -1 : 1);
      break;
    case "end":
      v[a] += h * (r && c ? -1 : 1);
      break;
  }
  return v;
}
const pc = async (e, t, r) => {
  const {
    placement: n = "bottom",
    strategy: o = "absolute",
    middleware: i = [],
    platform: a
  } = r, s = i.filter(Boolean), u = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let c = await a.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: d,
    y: p
  } = An(c, n, u), h = n, v = {}, y = 0;
  for (let g = 0; g < s.length; g++) {
    const {
      name: b,
      fn: x
    } = s[g], {
      x: w,
      y: P,
      data: R,
      reset: S
    } = await x({
      x: d,
      y: p,
      initialPlacement: n,
      placement: h,
      strategy: o,
      middlewareData: v,
      rects: c,
      platform: a,
      elements: {
        reference: e,
        floating: t
      }
    });
    d = w ?? d, p = P ?? p, v = {
      ...v,
      [b]: {
        ...v[b],
        ...R
      }
    }, S && y <= 50 && (y++, typeof S == "object" && (S.placement && (h = S.placement), S.rects && (c = S.rects === !0 ? await a.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : S.rects), {
      x: d,
      y: p
    } = An(c, h, u)), g = -1);
  }
  return {
    x: d,
    y: p,
    placement: h,
    strategy: o,
    middlewareData: v
  };
};
async function vt(e, t) {
  var r;
  t === void 0 && (t = {});
  const {
    x: n,
    y: o,
    platform: i,
    rects: a,
    elements: s,
    strategy: u
  } = e, {
    boundary: c = "clippingAncestors",
    rootBoundary: d = "viewport",
    elementContext: p = "floating",
    altBoundary: h = !1,
    padding: v = 0
  } = Ae(t, e), y = Lo(v), b = s[h ? p === "floating" ? "reference" : "floating" : p], x = Wt(await i.getClippingRect({
    element: (r = await (i.isElement == null ? void 0 : i.isElement(b))) == null || r ? b : b.contextElement || await (i.getDocumentElement == null ? void 0 : i.getDocumentElement(s.floating)),
    boundary: c,
    rootBoundary: d,
    strategy: u
  })), w = p === "floating" ? {
    x: n,
    y: o,
    width: a.floating.width,
    height: a.floating.height
  } : a.reference, P = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(s.floating)), R = await (i.isElement == null ? void 0 : i.isElement(P)) ? await (i.getScale == null ? void 0 : i.getScale(P)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, S = Wt(i.convertOffsetParentRelativeRectToViewportRelativeRect ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: w,
    offsetParent: P,
    strategy: u
  }) : w);
  return {
    top: (x.top - S.top + y.top) / R.y,
    bottom: (S.bottom - x.bottom + y.bottom) / R.y,
    left: (x.left - S.left + y.left) / R.x,
    right: (S.right - x.right + y.right) / R.x
  };
}
const mc = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: r,
      y: n,
      placement: o,
      rects: i,
      platform: a,
      elements: s,
      middlewareData: u
    } = t, {
      element: c,
      padding: d = 0
    } = Ae(e, t) || {};
    if (c == null)
      return {};
    const p = Lo(d), h = {
      x: r,
      y: n
    }, v = Lr(o), y = Dr(v), g = await a.getDimensions(c), b = v === "y", x = b ? "top" : "left", w = b ? "bottom" : "right", P = b ? "clientHeight" : "clientWidth", R = i.reference[y] + i.reference[v] - h[v] - i.floating[y], S = h[v] - i.reference[v], N = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(c));
    let k = N ? N[P] : 0;
    (!k || !await (a.isElement == null ? void 0 : a.isElement(N))) && (k = s.floating[P] || i.floating[y]);
    const W = R / 2 - S / 2, H = k / 2 - g[y] / 2 - 1, $ = Le(p[x], H), Y = Le(p[w], H), j = $, B = k - g[y] - Y, D = k / 2 - g[y] / 2 + W, Z = yr(j, D, B), G = !u.arrow && ct(o) != null && D !== Z && i.reference[y] / 2 - (D < j ? $ : Y) - g[y] / 2 < 0, q = G ? D < j ? D - j : D - B : 0;
    return {
      [v]: h[v] + q,
      data: {
        [v]: Z,
        centerOffset: D - Z - q,
        ...G && {
          alignmentOffset: q
        }
      },
      reset: G
    };
  }
}), hc = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        middlewareData: i,
        rects: a,
        initialPlacement: s,
        platform: u,
        elements: c
      } = t, {
        mainAxis: d = !0,
        crossAxis: p = !0,
        fallbackPlacements: h,
        fallbackStrategy: v = "bestFit",
        fallbackAxisSideDirection: y = "none",
        flipAlignment: g = !0,
        ...b
      } = Ae(e, t);
      if ((r = i.arrow) != null && r.alignmentOffset)
        return {};
      const x = Ne(o), w = we(s), P = Ne(s) === s, R = await (u.isRTL == null ? void 0 : u.isRTL(c.floating)), S = h || (P || !g ? [Ft(s)] : ac(s)), N = y !== "none";
      !h && N && S.push(...dc(s, g, y, R));
      const k = [s, ...S], W = await vt(t, b), H = [];
      let $ = ((n = i.flip) == null ? void 0 : n.overflows) || [];
      if (d && H.push(W[x]), p) {
        const D = sc(o, a, R);
        H.push(W[D[0]], W[D[1]]);
      }
      if ($ = [...$, {
        placement: o,
        overflows: H
      }], !H.every((D) => D <= 0)) {
        var Y, j;
        const D = (((Y = i.flip) == null ? void 0 : Y.index) || 0) + 1, Z = k[D];
        if (Z && (!(p === "alignment" ? w !== we(Z) : !1) || // We leave the current main axis only if every placement on that axis
        // overflows the main axis.
        $.every((M) => we(M.placement) === w ? M.overflows[0] > 0 : !0)))
          return {
            data: {
              index: D,
              overflows: $
            },
            reset: {
              placement: Z
            }
          };
        let G = (j = $.filter((q) => q.overflows[0] <= 0).sort((q, M) => q.overflows[1] - M.overflows[1])[0]) == null ? void 0 : j.placement;
        if (!G)
          switch (v) {
            case "bestFit": {
              var B;
              const q = (B = $.filter((M) => {
                if (N) {
                  const J = we(M.placement);
                  return J === w || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  J === "y";
                }
                return !0;
              }).map((M) => [M.placement, M.overflows.filter((J) => J > 0).reduce((J, se) => J + se, 0)]).sort((M, J) => M[1] - J[1])[0]) == null ? void 0 : B[0];
              q && (G = q);
              break;
            }
            case "initialPlacement":
              G = s;
              break;
          }
        if (o !== G)
          return {
            reset: {
              placement: G
            }
          };
      }
      return {};
    }
  };
};
function Nn(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function On(e) {
  return rc.some((t) => e[t] >= 0);
}
const gc = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: r
      } = t, {
        strategy: n = "referenceHidden",
        ...o
      } = Ae(e, t);
      switch (n) {
        case "referenceHidden": {
          const i = await vt(t, {
            ...o,
            elementContext: "reference"
          }), a = Nn(i, r.reference);
          return {
            data: {
              referenceHiddenOffsets: a,
              referenceHidden: On(a)
            }
          };
        }
        case "escaped": {
          const i = await vt(t, {
            ...o,
            altBoundary: !0
          }), a = Nn(i, r.floating);
          return {
            data: {
              escapedOffsets: a,
              escaped: On(a)
            }
          };
        }
        default:
          return {};
      }
    }
  };
}, Io = /* @__PURE__ */ new Set(["left", "top"]);
async function vc(e, t) {
  const {
    placement: r,
    platform: n,
    elements: o
  } = e, i = await (n.isRTL == null ? void 0 : n.isRTL(o.floating)), a = Ne(r), s = ct(r), u = we(r) === "y", c = Io.has(a) ? -1 : 1, d = i && u ? -1 : 1, p = Ae(t, e);
  let {
    mainAxis: h,
    crossAxis: v,
    alignmentAxis: y
  } = typeof p == "number" ? {
    mainAxis: p,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: p.mainAxis || 0,
    crossAxis: p.crossAxis || 0,
    alignmentAxis: p.alignmentAxis
  };
  return s && typeof y == "number" && (v = s === "end" ? y * -1 : y), u ? {
    x: v * d,
    y: h * c
  } : {
    x: h * c,
    y: v * d
  };
}
const bc = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var r, n;
      const {
        x: o,
        y: i,
        placement: a,
        middlewareData: s
      } = t, u = await vc(t, e);
      return a === ((r = s.offset) == null ? void 0 : r.placement) && (n = s.arrow) != null && n.alignmentOffset ? {} : {
        x: o + u.x,
        y: i + u.y,
        data: {
          ...u,
          placement: a
        }
      };
    }
  };
}, yc = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: r,
        y: n,
        placement: o
      } = t, {
        mainAxis: i = !0,
        crossAxis: a = !1,
        limiter: s = {
          fn: (b) => {
            let {
              x,
              y: w
            } = b;
            return {
              x,
              y: w
            };
          }
        },
        ...u
      } = Ae(e, t), c = {
        x: r,
        y: n
      }, d = await vt(t, u), p = we(Ne(o)), h = Mr(p);
      let v = c[h], y = c[p];
      if (i) {
        const b = h === "y" ? "top" : "left", x = h === "y" ? "bottom" : "right", w = v + d[b], P = v - d[x];
        v = yr(w, v, P);
      }
      if (a) {
        const b = p === "y" ? "top" : "left", x = p === "y" ? "bottom" : "right", w = y + d[b], P = y - d[x];
        y = yr(w, y, P);
      }
      const g = s.fn({
        ...t,
        [h]: v,
        [p]: y
      });
      return {
        ...g,
        data: {
          x: g.x - r,
          y: g.y - n,
          enabled: {
            [h]: i,
            [p]: a
          }
        }
      };
    }
  };
}, xc = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: r,
        y: n,
        placement: o,
        rects: i,
        middlewareData: a
      } = t, {
        offset: s = 0,
        mainAxis: u = !0,
        crossAxis: c = !0
      } = Ae(e, t), d = {
        x: r,
        y: n
      }, p = we(o), h = Mr(p);
      let v = d[h], y = d[p];
      const g = Ae(s, t), b = typeof g == "number" ? {
        mainAxis: g,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...g
      };
      if (u) {
        const P = h === "y" ? "height" : "width", R = i.reference[h] - i.floating[P] + b.mainAxis, S = i.reference[h] + i.reference[P] - b.mainAxis;
        v < R ? v = R : v > S && (v = S);
      }
      if (c) {
        var x, w;
        const P = h === "y" ? "width" : "height", R = Io.has(Ne(o)), S = i.reference[p] - i.floating[P] + (R && ((x = a.offset) == null ? void 0 : x[p]) || 0) + (R ? 0 : b.crossAxis), N = i.reference[p] + i.reference[P] + (R ? 0 : ((w = a.offset) == null ? void 0 : w[p]) || 0) - (R ? b.crossAxis : 0);
        y < S ? y = S : y > N && (y = N);
      }
      return {
        [h]: v,
        [p]: y
      };
    }
  };
}, wc = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var r, n;
      const {
        placement: o,
        rects: i,
        platform: a,
        elements: s
      } = t, {
        apply: u = () => {
        },
        ...c
      } = Ae(e, t), d = await vt(t, c), p = Ne(o), h = ct(o), v = we(o) === "y", {
        width: y,
        height: g
      } = i.floating;
      let b, x;
      p === "top" || p === "bottom" ? (b = p, x = h === (await (a.isRTL == null ? void 0 : a.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (x = p, b = h === "end" ? "top" : "bottom");
      const w = g - d.top - d.bottom, P = y - d.left - d.right, R = Le(g - d[b], w), S = Le(y - d[x], P), N = !t.middlewareData.shift;
      let k = R, W = S;
      if ((r = t.middlewareData.shift) != null && r.enabled.x && (W = P), (n = t.middlewareData.shift) != null && n.enabled.y && (k = w), N && !h) {
        const $ = de(d.left, 0), Y = de(d.right, 0), j = de(d.top, 0), B = de(d.bottom, 0);
        v ? W = y - 2 * ($ !== 0 || Y !== 0 ? $ + Y : de(d.left, d.right)) : k = g - 2 * (j !== 0 || B !== 0 ? j + B : de(d.top, d.bottom));
      }
      await u({
        ...t,
        availableWidth: W,
        availableHeight: k
      });
      const H = await a.getDimensions(s.floating);
      return y !== H.width || g !== H.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Ut() {
  return typeof window < "u";
}
function ut(e) {
  return Fo(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function pe(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Se(e) {
  var t;
  return (t = (Fo(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function Fo(e) {
  return Ut() ? e instanceof Node || e instanceof pe(e).Node : !1;
}
function ge(e) {
  return Ut() ? e instanceof Element || e instanceof pe(e).Element : !1;
}
function Re(e) {
  return Ut() ? e instanceof HTMLElement || e instanceof pe(e).HTMLElement : !1;
}
function jn(e) {
  return !Ut() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof pe(e).ShadowRoot;
}
const Cc = /* @__PURE__ */ new Set(["inline", "contents"]);
function xt(e) {
  const {
    overflow: t,
    overflowX: r,
    overflowY: n,
    display: o
  } = ve(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + n + r) && !Cc.has(o);
}
const Ec = /* @__PURE__ */ new Set(["table", "td", "th"]);
function Rc(e) {
  return Ec.has(ut(e));
}
const Sc = [":popover-open", ":modal"];
function Ht(e) {
  return Sc.some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
const kc = ["transform", "translate", "scale", "rotate", "perspective"], Pc = ["transform", "translate", "scale", "rotate", "perspective", "filter"], Ac = ["paint", "layout", "strict", "content"];
function Ir(e) {
  const t = Fr(), r = ge(e) ? ve(e) : e;
  return kc.some((n) => r[n] ? r[n] !== "none" : !1) || (r.containerType ? r.containerType !== "normal" : !1) || !t && (r.backdropFilter ? r.backdropFilter !== "none" : !1) || !t && (r.filter ? r.filter !== "none" : !1) || Pc.some((n) => (r.willChange || "").includes(n)) || Ac.some((n) => (r.contain || "").includes(n));
}
function Nc(e) {
  let t = Ie(e);
  for (; Re(t) && !ot(t); ) {
    if (Ir(t))
      return t;
    if (Ht(t))
      return null;
    t = Ie(t);
  }
  return null;
}
function Fr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
const Oc = /* @__PURE__ */ new Set(["html", "body", "#document"]);
function ot(e) {
  return Oc.has(ut(e));
}
function ve(e) {
  return pe(e).getComputedStyle(e);
}
function Gt(e) {
  return ge(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function Ie(e) {
  if (ut(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    jn(e) && e.host || // Fallback.
    Se(e)
  );
  return jn(t) ? t.host : t;
}
function Wo(e) {
  const t = Ie(e);
  return ot(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : Re(t) && xt(t) ? t : Wo(t);
}
function bt(e, t, r) {
  var n;
  t === void 0 && (t = []), r === void 0 && (r = !0);
  const o = Wo(e), i = o === ((n = e.ownerDocument) == null ? void 0 : n.body), a = pe(o);
  if (i) {
    const s = wr(a);
    return t.concat(a, a.visualViewport || [], xt(o) ? o : [], s && r ? bt(s) : []);
  }
  return t.concat(o, bt(o, [], r));
}
function wr(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function $o(e) {
  const t = ve(e);
  let r = parseFloat(t.width) || 0, n = parseFloat(t.height) || 0;
  const o = Re(e), i = o ? e.offsetWidth : r, a = o ? e.offsetHeight : n, s = It(r) !== i || It(n) !== a;
  return s && (r = i, n = a), {
    width: r,
    height: n,
    $: s
  };
}
function Wr(e) {
  return ge(e) ? e : e.contextElement;
}
function rt(e) {
  const t = Wr(e);
  if (!Re(t))
    return Ee(1);
  const r = t.getBoundingClientRect(), {
    width: n,
    height: o,
    $: i
  } = $o(t);
  let a = (i ? It(r.width) : r.width) / n, s = (i ? It(r.height) : r.height) / o;
  return (!a || !Number.isFinite(a)) && (a = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: a,
    y: s
  };
}
const jc = /* @__PURE__ */ Ee(0);
function Bo(e) {
  const t = pe(e);
  return !Fr() || !t.visualViewport ? jc : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Tc(e, t, r) {
  return t === void 0 && (t = !1), !r || t && r !== pe(e) ? !1 : t;
}
function He(e, t, r, n) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  const o = e.getBoundingClientRect(), i = Wr(e);
  let a = Ee(1);
  t && (n ? ge(n) && (a = rt(n)) : a = rt(e));
  const s = Tc(i, r, n) ? Bo(i) : Ee(0);
  let u = (o.left + s.x) / a.x, c = (o.top + s.y) / a.y, d = o.width / a.x, p = o.height / a.y;
  if (i) {
    const h = pe(i), v = n && ge(n) ? pe(n) : n;
    let y = h, g = wr(y);
    for (; g && n && v !== y; ) {
      const b = rt(g), x = g.getBoundingClientRect(), w = ve(g), P = x.left + (g.clientLeft + parseFloat(w.paddingLeft)) * b.x, R = x.top + (g.clientTop + parseFloat(w.paddingTop)) * b.y;
      u *= b.x, c *= b.y, d *= b.x, p *= b.y, u += P, c += R, y = pe(g), g = wr(y);
    }
  }
  return Wt({
    width: d,
    height: p,
    x: u,
    y: c
  });
}
function Yt(e, t) {
  const r = Gt(e).scrollLeft;
  return t ? t.left + r : He(Se(e)).left + r;
}
function zo(e, t) {
  const r = e.getBoundingClientRect(), n = r.left + t.scrollLeft - Yt(e, r), o = r.top + t.scrollTop;
  return {
    x: n,
    y: o
  };
}
function _c(e) {
  let {
    elements: t,
    rect: r,
    offsetParent: n,
    strategy: o
  } = e;
  const i = o === "fixed", a = Se(n), s = t ? Ht(t.floating) : !1;
  if (n === a || s && i)
    return r;
  let u = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = Ee(1);
  const d = Ee(0), p = Re(n);
  if ((p || !p && !i) && ((ut(n) !== "body" || xt(a)) && (u = Gt(n)), Re(n))) {
    const v = He(n);
    c = rt(n), d.x = v.x + n.clientLeft, d.y = v.y + n.clientTop;
  }
  const h = a && !p && !i ? zo(a, u) : Ee(0);
  return {
    width: r.width * c.x,
    height: r.height * c.y,
    x: r.x * c.x - u.scrollLeft * c.x + d.x + h.x,
    y: r.y * c.y - u.scrollTop * c.y + d.y + h.y
  };
}
function Mc(e) {
  return Array.from(e.getClientRects());
}
function Dc(e) {
  const t = Se(e), r = Gt(e), n = e.ownerDocument.body, o = de(t.scrollWidth, t.clientWidth, n.scrollWidth, n.clientWidth), i = de(t.scrollHeight, t.clientHeight, n.scrollHeight, n.clientHeight);
  let a = -r.scrollLeft + Yt(e);
  const s = -r.scrollTop;
  return ve(n).direction === "rtl" && (a += de(t.clientWidth, n.clientWidth) - o), {
    width: o,
    height: i,
    x: a,
    y: s
  };
}
const Tn = 25;
function Lc(e, t) {
  const r = pe(e), n = Se(e), o = r.visualViewport;
  let i = n.clientWidth, a = n.clientHeight, s = 0, u = 0;
  if (o) {
    i = o.width, a = o.height;
    const d = Fr();
    (!d || d && t === "fixed") && (s = o.offsetLeft, u = o.offsetTop);
  }
  const c = Yt(n);
  if (c <= 0) {
    const d = n.ownerDocument, p = d.body, h = getComputedStyle(p), v = d.compatMode === "CSS1Compat" && parseFloat(h.marginLeft) + parseFloat(h.marginRight) || 0, y = Math.abs(n.clientWidth - p.clientWidth - v);
    y <= Tn && (i -= y);
  } else c <= Tn && (i += c);
  return {
    width: i,
    height: a,
    x: s,
    y: u
  };
}
const Ic = /* @__PURE__ */ new Set(["absolute", "fixed"]);
function Fc(e, t) {
  const r = He(e, !0, t === "fixed"), n = r.top + e.clientTop, o = r.left + e.clientLeft, i = Re(e) ? rt(e) : Ee(1), a = e.clientWidth * i.x, s = e.clientHeight * i.y, u = o * i.x, c = n * i.y;
  return {
    width: a,
    height: s,
    x: u,
    y: c
  };
}
function _n(e, t, r) {
  let n;
  if (t === "viewport")
    n = Lc(e, r);
  else if (t === "document")
    n = Dc(Se(e));
  else if (ge(t))
    n = Fc(t, r);
  else {
    const o = Bo(e);
    n = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Wt(n);
}
function Vo(e, t) {
  const r = Ie(e);
  return r === t || !ge(r) || ot(r) ? !1 : ve(r).position === "fixed" || Vo(r, t);
}
function Wc(e, t) {
  const r = t.get(e);
  if (r)
    return r;
  let n = bt(e, [], !1).filter((s) => ge(s) && ut(s) !== "body"), o = null;
  const i = ve(e).position === "fixed";
  let a = i ? Ie(e) : e;
  for (; ge(a) && !ot(a); ) {
    const s = ve(a), u = Ir(a);
    !u && s.position === "fixed" && (o = null), (i ? !u && !o : !u && s.position === "static" && !!o && Ic.has(o.position) || xt(a) && !u && Vo(e, a)) ? n = n.filter((d) => d !== a) : o = s, a = Ie(a);
  }
  return t.set(e, n), n;
}
function $c(e) {
  let {
    element: t,
    boundary: r,
    rootBoundary: n,
    strategy: o
  } = e;
  const a = [...r === "clippingAncestors" ? Ht(t) ? [] : Wc(t, this._c) : [].concat(r), n], s = a[0], u = a.reduce((c, d) => {
    const p = _n(t, d, o);
    return c.top = de(p.top, c.top), c.right = Le(p.right, c.right), c.bottom = Le(p.bottom, c.bottom), c.left = de(p.left, c.left), c;
  }, _n(t, s, o));
  return {
    width: u.right - u.left,
    height: u.bottom - u.top,
    x: u.left,
    y: u.top
  };
}
function Bc(e) {
  const {
    width: t,
    height: r
  } = $o(e);
  return {
    width: t,
    height: r
  };
}
function zc(e, t, r) {
  const n = Re(t), o = Se(t), i = r === "fixed", a = He(e, !0, i, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const u = Ee(0);
  function c() {
    u.x = Yt(o);
  }
  if (n || !n && !i)
    if ((ut(t) !== "body" || xt(o)) && (s = Gt(t)), n) {
      const v = He(t, !0, i, t);
      u.x = v.x + t.clientLeft, u.y = v.y + t.clientTop;
    } else o && c();
  i && !n && o && c();
  const d = o && !n && !i ? zo(o, s) : Ee(0), p = a.left + s.scrollLeft - u.x - d.x, h = a.top + s.scrollTop - u.y - d.y;
  return {
    x: p,
    y: h,
    width: a.width,
    height: a.height
  };
}
function dr(e) {
  return ve(e).position === "static";
}
function Mn(e, t) {
  if (!Re(e) || ve(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let r = e.offsetParent;
  return Se(e) === r && (r = r.ownerDocument.body), r;
}
function Uo(e, t) {
  const r = pe(e);
  if (Ht(e))
    return r;
  if (!Re(e)) {
    let o = Ie(e);
    for (; o && !ot(o); ) {
      if (ge(o) && !dr(o))
        return o;
      o = Ie(o);
    }
    return r;
  }
  let n = Mn(e, t);
  for (; n && Rc(n) && dr(n); )
    n = Mn(n, t);
  return n && ot(n) && dr(n) && !Ir(n) ? r : n || Nc(e) || r;
}
const Vc = async function(e) {
  const t = this.getOffsetParent || Uo, r = this.getDimensions, n = await r(e.floating);
  return {
    reference: zc(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: n.width,
      height: n.height
    }
  };
};
function Uc(e) {
  return ve(e).direction === "rtl";
}
const Hc = {
  convertOffsetParentRelativeRectToViewportRelativeRect: _c,
  getDocumentElement: Se,
  getClippingRect: $c,
  getOffsetParent: Uo,
  getElementRects: Vc,
  getClientRects: Mc,
  getDimensions: Bc,
  getScale: rt,
  isElement: ge,
  isRTL: Uc
};
function Ho(e, t) {
  return e.x === t.x && e.y === t.y && e.width === t.width && e.height === t.height;
}
function Gc(e, t) {
  let r = null, n;
  const o = Se(e);
  function i() {
    var s;
    clearTimeout(n), (s = r) == null || s.disconnect(), r = null;
  }
  function a(s, u) {
    s === void 0 && (s = !1), u === void 0 && (u = 1), i();
    const c = e.getBoundingClientRect(), {
      left: d,
      top: p,
      width: h,
      height: v
    } = c;
    if (s || t(), !h || !v)
      return;
    const y = jt(p), g = jt(o.clientWidth - (d + h)), b = jt(o.clientHeight - (p + v)), x = jt(d), P = {
      rootMargin: -y + "px " + -g + "px " + -b + "px " + -x + "px",
      threshold: de(0, Le(1, u)) || 1
    };
    let R = !0;
    function S(N) {
      const k = N[0].intersectionRatio;
      if (k !== u) {
        if (!R)
          return a();
        k ? a(!1, k) : n = setTimeout(() => {
          a(!1, 1e-7);
        }, 1e3);
      }
      k === 1 && !Ho(c, e.getBoundingClientRect()) && a(), R = !1;
    }
    try {
      r = new IntersectionObserver(S, {
        ...P,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      r = new IntersectionObserver(S, P);
    }
    r.observe(e);
  }
  return a(!0), i;
}
function Yc(e, t, r, n) {
  n === void 0 && (n = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: i = !0,
    elementResize: a = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: u = !1
  } = n, c = Wr(e), d = o || i ? [...c ? bt(c) : [], ...bt(t)] : [];
  d.forEach((x) => {
    o && x.addEventListener("scroll", r, {
      passive: !0
    }), i && x.addEventListener("resize", r);
  });
  const p = c && s ? Gc(c, r) : null;
  let h = -1, v = null;
  a && (v = new ResizeObserver((x) => {
    let [w] = x;
    w && w.target === c && v && (v.unobserve(t), cancelAnimationFrame(h), h = requestAnimationFrame(() => {
      var P;
      (P = v) == null || P.observe(t);
    })), r();
  }), c && !u && v.observe(c), v.observe(t));
  let y, g = u ? He(e) : null;
  u && b();
  function b() {
    const x = He(e);
    g && !Ho(g, x) && r(), g = x, y = requestAnimationFrame(b);
  }
  return r(), () => {
    var x;
    d.forEach((w) => {
      o && w.removeEventListener("scroll", r), i && w.removeEventListener("resize", r);
    }), p == null || p(), (x = v) == null || x.disconnect(), v = null, u && cancelAnimationFrame(y);
  };
}
const Kc = bc, Xc = yc, qc = hc, Zc = wc, Jc = gc, Dn = mc, Qc = xc, eu = (e, t, r) => {
  const n = /* @__PURE__ */ new Map(), o = {
    platform: Hc,
    ...r
  }, i = {
    ...o.platform,
    _c: n
  };
  return pc(e, t, {
    ...o,
    platform: i
  });
};
var tu = typeof document < "u", ru = function() {
}, Mt = tu ? $i : ru;
function $t(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let r, n, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (r = e.length, r !== t.length) return !1;
      for (n = r; n-- !== 0; )
        if (!$t(e[n], t[n]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), r = o.length, r !== Object.keys(t).length)
      return !1;
    for (n = r; n-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[n]))
        return !1;
    for (n = r; n-- !== 0; ) {
      const i = o[n];
      if (!(i === "_owner" && e.$$typeof) && !$t(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Go(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function Ln(e, t) {
  const r = Go(e);
  return Math.round(t * r) / r;
}
function fr(e) {
  const t = l.useRef(e);
  return Mt(() => {
    t.current = e;
  }), t;
}
function nu(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: r = "absolute",
    middleware: n = [],
    platform: o,
    elements: {
      reference: i,
      floating: a
    } = {},
    transform: s = !0,
    whileElementsMounted: u,
    open: c
  } = e, [d, p] = l.useState({
    x: 0,
    y: 0,
    strategy: r,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [h, v] = l.useState(n);
  $t(h, n) || v(n);
  const [y, g] = l.useState(null), [b, x] = l.useState(null), w = l.useCallback((M) => {
    M !== N.current && (N.current = M, g(M));
  }, []), P = l.useCallback((M) => {
    M !== k.current && (k.current = M, x(M));
  }, []), R = i || y, S = a || b, N = l.useRef(null), k = l.useRef(null), W = l.useRef(d), H = u != null, $ = fr(u), Y = fr(o), j = fr(c), B = l.useCallback(() => {
    if (!N.current || !k.current)
      return;
    const M = {
      placement: t,
      strategy: r,
      middleware: h
    };
    Y.current && (M.platform = Y.current), eu(N.current, k.current, M).then((J) => {
      const se = {
        ...J,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: j.current !== !1
      };
      D.current && !$t(W.current, se) && (W.current = se, Wn.flushSync(() => {
        p(se);
      }));
    });
  }, [h, t, r, Y, j]);
  Mt(() => {
    c === !1 && W.current.isPositioned && (W.current.isPositioned = !1, p((M) => ({
      ...M,
      isPositioned: !1
    })));
  }, [c]);
  const D = l.useRef(!1);
  Mt(() => (D.current = !0, () => {
    D.current = !1;
  }), []), Mt(() => {
    if (R && (N.current = R), S && (k.current = S), R && S) {
      if ($.current)
        return $.current(R, S, B);
      B();
    }
  }, [R, S, B, $, H]);
  const Z = l.useMemo(() => ({
    reference: N,
    floating: k,
    setReference: w,
    setFloating: P
  }), [w, P]), G = l.useMemo(() => ({
    reference: R,
    floating: S
  }), [R, S]), q = l.useMemo(() => {
    const M = {
      position: r,
      left: 0,
      top: 0
    };
    if (!G.floating)
      return M;
    const J = Ln(G.floating, d.x), se = Ln(G.floating, d.y);
    return s ? {
      ...M,
      transform: "translate(" + J + "px, " + se + "px)",
      ...Go(G.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: r,
      left: J,
      top: se
    };
  }, [r, s, G.floating, d.x, d.y]);
  return l.useMemo(() => ({
    ...d,
    update: B,
    refs: Z,
    elements: G,
    floatingStyles: q
  }), [d, B, Z, G, q]);
}
const ou = (e) => {
  function t(r) {
    return {}.hasOwnProperty.call(r, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(r) {
      const {
        element: n,
        padding: o
      } = typeof e == "function" ? e(r) : e;
      return n && t(n) ? n.current != null ? Dn({
        element: n.current,
        padding: o
      }).fn(r) : {} : n ? Dn({
        element: n,
        padding: o
      }).fn(r) : {};
    }
  };
}, iu = (e, t) => ({
  ...Kc(e),
  options: [e, t]
}), su = (e, t) => ({
  ...Xc(e),
  options: [e, t]
}), au = (e, t) => ({
  ...Qc(e),
  options: [e, t]
}), lu = (e, t) => ({
  ...qc(e),
  options: [e, t]
}), cu = (e, t) => ({
  ...Zc(e),
  options: [e, t]
}), uu = (e, t) => ({
  ...Jc(e),
  options: [e, t]
}), du = (e, t) => ({
  ...ou(e),
  options: [e, t]
});
var fu = "Arrow", Yo = l.forwardRef((e, t) => {
  const { children: r, width: n = 10, height: o = 5, ...i } = e;
  return /* @__PURE__ */ m.jsx(
    ce.svg,
    {
      ...i,
      ref: t,
      width: n,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? r : /* @__PURE__ */ m.jsx("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Yo.displayName = fu;
var pu = Yo;
function mu(e) {
  const [t, r] = l.useState(void 0);
  return Me(() => {
    if (e) {
      r({ width: e.offsetWidth, height: e.offsetHeight });
      const n = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const i = o[0];
        let a, s;
        if ("borderBoxSize" in i) {
          const u = i.borderBoxSize, c = Array.isArray(u) ? u[0] : u;
          a = c.inlineSize, s = c.blockSize;
        } else
          a = e.offsetWidth, s = e.offsetHeight;
        r({ width: a, height: s });
      });
      return n.observe(e, { box: "border-box" }), () => n.unobserve(e);
    } else
      r(void 0);
  }, [e]), t;
}
var $r = "Popper", [Ko, Xo] = Rr($r), [hu, qo] = Ko($r), Zo = (e) => {
  const { __scopePopper: t, children: r } = e, [n, o] = l.useState(null);
  return /* @__PURE__ */ m.jsx(hu, { scope: t, anchor: n, onAnchorChange: o, children: r });
};
Zo.displayName = $r;
var Jo = "PopperAnchor", Qo = l.forwardRef(
  (e, t) => {
    const { __scopePopper: r, virtualRef: n, ...o } = e, i = qo(Jo, r), a = l.useRef(null), s = be(t, a), u = l.useRef(null);
    return l.useEffect(() => {
      const c = u.current;
      u.current = (n == null ? void 0 : n.current) || a.current, c !== u.current && i.onAnchorChange(u.current);
    }), n ? null : /* @__PURE__ */ m.jsx(ce.div, { ...o, ref: s });
  }
);
Qo.displayName = Jo;
var Br = "PopperContent", [gu, vu] = Ko(Br), ei = l.forwardRef(
  (e, t) => {
    var K, re, te, me, Ct, dt;
    const {
      __scopePopper: r,
      side: n = "bottom",
      sideOffset: o = 0,
      align: i = "center",
      alignOffset: a = 0,
      arrowPadding: s = 0,
      avoidCollisions: u = !0,
      collisionBoundary: c = [],
      collisionPadding: d = 0,
      sticky: p = "partial",
      hideWhenDetached: h = !1,
      updatePositionStrategy: v = "optimized",
      onPlaced: y,
      ...g
    } = e, b = qo(Br, r), [x, w] = l.useState(null), P = be(t, ($e) => w($e)), [R, S] = l.useState(null), N = mu(R), k = (N == null ? void 0 : N.width) ?? 0, W = (N == null ? void 0 : N.height) ?? 0, H = n + (i !== "center" ? "-" + i : ""), $ = typeof d == "number" ? d : { top: 0, right: 0, bottom: 0, left: 0, ...d }, Y = Array.isArray(c) ? c : [c], j = Y.length > 0, B = {
      padding: $,
      boundary: Y.filter(yu),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: j
    }, { refs: D, floatingStyles: Z, placement: G, isPositioned: q, middlewareData: M } = nu({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: H,
      whileElementsMounted: (...$e) => Yc(...$e, {
        animationFrame: v === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        iu({ mainAxis: o + W, alignmentAxis: a }),
        u && su({
          mainAxis: !0,
          crossAxis: !1,
          limiter: p === "partial" ? au() : void 0,
          ...B
        }),
        u && lu({ ...B }),
        cu({
          ...B,
          apply: ({ elements: $e, rects: Et, availableWidth: Ge, availableHeight: Be }) => {
            const { width: Rt, height: St } = Et.reference, ke = $e.floating.style;
            ke.setProperty("--radix-popper-available-width", `${Ge}px`), ke.setProperty("--radix-popper-available-height", `${Be}px`), ke.setProperty("--radix-popper-anchor-width", `${Rt}px`), ke.setProperty("--radix-popper-anchor-height", `${St}px`);
          }
        }),
        R && du({ element: R, padding: s }),
        xu({ arrowWidth: k, arrowHeight: W }),
        h && uu({ strategy: "referenceHidden", ...B })
      ]
    }), [J, se] = ni(G), oe = nt(y);
    Me(() => {
      q && (oe == null || oe());
    }, [q, oe]);
    const E = (K = M.arrow) == null ? void 0 : K.x, T = (re = M.arrow) == null ? void 0 : re.y, I = ((te = M.arrow) == null ? void 0 : te.centerOffset) !== 0, [O, U] = l.useState();
    return Me(() => {
      x && U(window.getComputedStyle(x).zIndex);
    }, [x]), /* @__PURE__ */ m.jsx(
      "div",
      {
        ref: D.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...Z,
          transform: q ? Z.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: O,
          "--radix-popper-transform-origin": [
            (me = M.transformOrigin) == null ? void 0 : me.x,
            (Ct = M.transformOrigin) == null ? void 0 : Ct.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((dt = M.hide) == null ? void 0 : dt.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ m.jsx(
          gu,
          {
            scope: r,
            placedSide: J,
            onArrowChange: S,
            arrowX: E,
            arrowY: T,
            shouldHideArrow: I,
            children: /* @__PURE__ */ m.jsx(
              ce.div,
              {
                "data-side": J,
                "data-align": se,
                ...g,
                ref: P,
                style: {
                  ...g.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: q ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
ei.displayName = Br;
var ti = "PopperArrow", bu = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, ri = l.forwardRef(function(t, r) {
  const { __scopePopper: n, ...o } = t, i = vu(ti, n), a = bu[i.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ m.jsx(
      "span",
      {
        ref: i.onArrowChange,
        style: {
          position: "absolute",
          left: i.arrowX,
          top: i.arrowY,
          [a]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[i.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[i.placedSide],
          visibility: i.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ m.jsx(
          pu,
          {
            ...o,
            ref: r,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
ri.displayName = ti;
function yu(e) {
  return e !== null;
}
var xu = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, x, w;
    const { placement: r, rects: n, middlewareData: o } = t, a = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, s = a ? 0 : e.arrowWidth, u = a ? 0 : e.arrowHeight, [c, d] = ni(r), p = { start: "0%", center: "50%", end: "100%" }[d], h = (((x = o.arrow) == null ? void 0 : x.x) ?? 0) + s / 2, v = (((w = o.arrow) == null ? void 0 : w.y) ?? 0) + u / 2;
    let y = "", g = "";
    return c === "bottom" ? (y = a ? p : `${h}px`, g = `${-u}px`) : c === "top" ? (y = a ? p : `${h}px`, g = `${n.floating.height + u}px`) : c === "right" ? (y = `${-u}px`, g = a ? p : `${v}px`) : c === "left" && (y = `${n.floating.width + u}px`, g = a ? p : `${v}px`), { data: { x: y, y: g } };
  }
});
function ni(e) {
  const [t, r = "center"] = e.split("-");
  return [t, r];
}
var wu = Zo, oi = Qo, Cu = ei, Eu = ri, Kt = "Popover", [ii] = Rr(Kt, [
  Xo
]), wt = Xo(), [Ru, We] = ii(Kt), si = (e) => {
  const {
    __scopePopover: t,
    children: r,
    open: n,
    defaultOpen: o,
    onOpenChange: i,
    modal: a = !1
  } = e, s = wt(t), u = l.useRef(null), [c, d] = l.useState(!1), [p, h] = Zn({
    prop: n,
    defaultProp: o ?? !1,
    onChange: i,
    caller: Kt
  });
  return /* @__PURE__ */ m.jsx(wu, { ...s, children: /* @__PURE__ */ m.jsx(
    Ru,
    {
      scope: t,
      contentId: Ce(),
      triggerRef: u,
      open: p,
      onOpenChange: h,
      onOpenToggle: l.useCallback(() => h((v) => !v), [h]),
      hasCustomAnchor: c,
      onCustomAnchorAdd: l.useCallback(() => d(!0), []),
      onCustomAnchorRemove: l.useCallback(() => d(!1), []),
      modal: a,
      children: r
    }
  ) });
};
si.displayName = Kt;
var ai = "PopoverAnchor", Su = l.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = We(ai, r), i = wt(r), { onCustomAnchorAdd: a, onCustomAnchorRemove: s } = o;
    return l.useEffect(() => (a(), () => s()), [a, s]), /* @__PURE__ */ m.jsx(oi, { ...i, ...n, ref: t });
  }
);
Su.displayName = ai;
var li = "PopoverTrigger", ci = l.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = We(li, r), i = wt(r), a = be(t, o.triggerRef), s = /* @__PURE__ */ m.jsx(
      ce.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": mi(o.open),
        ...n,
        ref: a,
        onClick: fe(e.onClick, o.onOpenToggle)
      }
    );
    return o.hasCustomAnchor ? s : /* @__PURE__ */ m.jsx(oi, { asChild: !0, ...i, children: s });
  }
);
ci.displayName = li;
var zr = "PopoverPortal", [ku, Pu] = ii(zr, {
  forceMount: void 0
}), ui = (e) => {
  const { __scopePopover: t, forceMount: r, children: n, container: o } = e, i = We(zr, t);
  return /* @__PURE__ */ m.jsx(ku, { scope: t, forceMount: r, children: /* @__PURE__ */ m.jsx(at, { present: r || i.open, children: /* @__PURE__ */ m.jsx(Ar, { asChild: !0, container: o, children: n }) }) });
};
ui.displayName = zr;
var it = "PopoverContent", di = l.forwardRef(
  (e, t) => {
    const r = Pu(it, e.__scopePopover), { forceMount: n = r.forceMount, ...o } = e, i = We(it, e.__scopePopover);
    return /* @__PURE__ */ m.jsx(at, { present: n || i.open, children: i.modal ? /* @__PURE__ */ m.jsx(Nu, { ...o, ref: t }) : /* @__PURE__ */ m.jsx(Ou, { ...o, ref: t }) });
  }
);
di.displayName = it;
var Au = /* @__PURE__ */ Sr("PopoverContent.RemoveScroll"), Nu = l.forwardRef(
  (e, t) => {
    const r = We(it, e.__scopePopover), n = l.useRef(null), o = be(t, n), i = l.useRef(!1);
    return l.useEffect(() => {
      const a = n.current;
      if (a) return uo(a);
    }, []), /* @__PURE__ */ m.jsx(Nr, { as: Au, allowPinchZoom: !0, children: /* @__PURE__ */ m.jsx(
      fi,
      {
        ...e,
        ref: o,
        trapFocus: r.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: fe(e.onCloseAutoFocus, (a) => {
          var s;
          a.preventDefault(), i.current || (s = r.triggerRef.current) == null || s.focus();
        }),
        onPointerDownOutside: fe(
          e.onPointerDownOutside,
          (a) => {
            const s = a.detail.originalEvent, u = s.button === 0 && s.ctrlKey === !0, c = s.button === 2 || u;
            i.current = c;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: fe(
          e.onFocusOutside,
          (a) => a.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
), Ou = l.forwardRef(
  (e, t) => {
    const r = We(it, e.__scopePopover), n = l.useRef(!1), o = l.useRef(!1);
    return /* @__PURE__ */ m.jsx(
      fi,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (i) => {
          var a, s;
          (a = e.onCloseAutoFocus) == null || a.call(e, i), i.defaultPrevented || (n.current || (s = r.triggerRef.current) == null || s.focus(), i.preventDefault()), n.current = !1, o.current = !1;
        },
        onInteractOutside: (i) => {
          var u, c;
          (u = e.onInteractOutside) == null || u.call(e, i), i.defaultPrevented || (n.current = !0, i.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const a = i.target;
          ((c = r.triggerRef.current) == null ? void 0 : c.contains(a)) && i.preventDefault(), i.detail.originalEvent.type === "focusin" && o.current && i.preventDefault();
        }
      }
    );
  }
), fi = l.forwardRef(
  (e, t) => {
    const {
      __scopePopover: r,
      trapFocus: n,
      onOpenAutoFocus: o,
      onCloseAutoFocus: i,
      disableOutsidePointerEvents: a,
      onEscapeKeyDown: s,
      onPointerDownOutside: u,
      onFocusOutside: c,
      onInteractOutside: d,
      ...p
    } = e, h = We(it, r), v = wt(r);
    return to(), /* @__PURE__ */ m.jsx(
      Pr,
      {
        asChild: !0,
        loop: !0,
        trapped: n,
        onMountAutoFocus: o,
        onUnmountAutoFocus: i,
        children: /* @__PURE__ */ m.jsx(
          kr,
          {
            asChild: !0,
            disableOutsidePointerEvents: a,
            onInteractOutside: d,
            onEscapeKeyDown: s,
            onPointerDownOutside: u,
            onFocusOutside: c,
            onDismiss: () => h.onOpenChange(!1),
            children: /* @__PURE__ */ m.jsx(
              Cu,
              {
                "data-state": mi(h.open),
                role: "dialog",
                id: h.contentId,
                ...v,
                ...p,
                ref: t,
                style: {
                  ...p.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }
), pi = "PopoverClose", ju = l.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = We(pi, r);
    return /* @__PURE__ */ m.jsx(
      ce.button,
      {
        type: "button",
        ...n,
        ref: t,
        onClick: fe(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
ju.displayName = pi;
var Tu = "PopoverArrow", _u = l.forwardRef(
  (e, t) => {
    const { __scopePopover: r, ...n } = e, o = wt(r);
    return /* @__PURE__ */ m.jsx(Eu, { ...o, ...n, ref: t });
  }
);
_u.displayName = Tu;
function mi(e) {
  return e ? "open" : "closed";
}
var Mu = si, Du = ci, Lu = ui, hi = di;
const Iu = Mu, Fu = Du, gi = l.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ m.jsx(Lu, { children: /* @__PURE__ */ m.jsx(
  hi,
  {
    ref: o,
    align: t,
    sideOffset: r,
    className: V(
      "z-50 w-72 rounded-md border border-border_primary bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
gi.displayName = hi.displayName;
function dd({
  options: e,
  value: t,
  onChange: r,
  placeholder: n = "Select...",
  searchPlaceholder: o = "Search...",
  emptyMessage: i = "No results found.",
  className: a,
  disabled: s
}) {
  const [u, c] = Fn(!1), d = e.find((p) => String(p.value) === String(t));
  return /* @__PURE__ */ m.jsxs(Iu, { open: u, onOpenChange: c, children: [
    /* @__PURE__ */ m.jsx(Fu, { asChild: !0, children: /* @__PURE__ */ m.jsxs(
      Er,
      {
        variant: "outline",
        role: "combobox",
        disabled: s,
        "aria-expanded": u,
        className: V("w-full justify-between bg-background border-border hover:bg-muted hover:text-foreground text-foreground", a),
        children: [
          /* @__PURE__ */ m.jsx("span", { className: "truncate", children: d ? d.label : n }),
          /* @__PURE__ */ m.jsx(Xl, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ m.jsx(gi, { className: "w-[--radix-popover-trigger-width] p-0 border-border bg-popover", children: /* @__PURE__ */ m.jsxs(jo, { className: "bg-transparent", children: [
      /* @__PURE__ */ m.jsx(To, { placeholder: o, className: "h-9" }),
      /* @__PURE__ */ m.jsx(_o, { children: i }),
      /* @__PURE__ */ m.jsx(Mo, { className: "max-h-60 overflow-auto p-1", children: e.map((p) => /* @__PURE__ */ m.jsxs(
        Do,
        {
          value: p.label,
          onSelect: () => {
            r(String(p.value)), c(!1);
          },
          className: "aria-selected:bg-accent aria-selected:text-accent-foreground rounded-md cursor-pointer",
          children: [
            /* @__PURE__ */ m.jsx(
              Gl,
              {
                className: V(
                  "mr-2 h-4 w-4 text-primary",
                  String(t) === String(p.value) ? "opacity-100" : "opacity-0"
                )
              }
            ),
            /* @__PURE__ */ m.jsx("span", { className: "truncate", children: p.label })
          ]
        },
        p.value
      )) })
    ] }) })
  ] });
}
const Wu = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx("div", { className: "relative w-full overflow-auto", children: /* @__PURE__ */ m.jsx(
  "table",
  {
    ref: r,
    className: V("w-full caption-bottom text-sm", e),
    ...t
  }
) }));
Wu.displayName = "Table";
const $u = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx("thead", { ref: r, className: V("[&_tr]:border-b", e), ...t }));
$u.displayName = "TableHeader";
const Bu = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "tbody",
  {
    ref: r,
    className: V("[&_tr:last-child]:border-0", e),
    ...t
  }
));
Bu.displayName = "TableBody";
const zu = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "tfoot",
  {
    ref: r,
    className: V(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      e
    ),
    ...t
  }
));
zu.displayName = "TableFooter";
const Vu = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "tr",
  {
    ref: r,
    className: V(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      e
    ),
    ...t
  }
));
Vu.displayName = "TableRow";
const Uu = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "th",
  {
    ref: r,
    className: V(
      "h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[0.5px]",
      e
    ),
    ...t
  }
));
Uu.displayName = "TableHead";
const Hu = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "td",
  {
    ref: r,
    className: V(
      "p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[0.5px]",
      e
    ),
    ...t
  }
));
Hu.displayName = "TableCell";
const Gu = l.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m.jsx(
  "caption",
  {
    ref: r,
    className: V("mt-4 text-sm text-muted-foreground", e),
    ...t
  }
));
Gu.displayName = "TableCaption";
function fd({
  items: e,
  activeRoute: t,
  onNavigate: r,
  collapsed: n = !1,
  onToggleCollapse: o,
  footer: i,
  children: a,
  className: s
}) {
  const u = ({ item: c }) => {
    if (c.divider)
      return /* @__PURE__ */ m.jsx("div", { className: "my-2 border-b border-white/5 opacity-50" });
    const d = c.icon, p = c.route && t === c.route;
    return /* @__PURE__ */ m.jsxs(
      Er,
      {
        variant: "ghost",
        className: V(
          "w-full justify-start gap-3 relative transition-all duration-200 border",
          n && "justify-center px-0",
          p ? "bg-primary/10 text-primary border-primary/50 shadow-[inset_3px_0_0_0_var(--primary)]" : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
          s
        ),
        onClick: () => {
          c.onClick && c.onClick(), c.route && r && r(c.route);
        },
        title: n ? c.label : void 0,
        children: [
          /* @__PURE__ */ m.jsx(d, { className: V("h-5 w-5 shrink-0", p ? "text-primary drop-shadow-[0_0_8px_rgba(0,227,150,0.5)]" : "") }),
          !n && /* @__PURE__ */ m.jsx("span", { className: V("truncate font-medium", p ? "text-foreground" : "text-muted-foreground"), children: c.label }),
          n && p && /* @__PURE__ */ m.jsx("div", { className: "absolute inset-0 bg-primary/10 rounded-md z-[-1]" })
        ]
      }
    );
  };
  return /* @__PURE__ */ m.jsxs("div", { className: V("h-full flex flex-col items-center py-4 border-r border-border transition-all duration-300 bg-card", n ? "w-16 px-2" : "w-60 px-3", s), children: [
    /* @__PURE__ */ m.jsxs("div", { className: "flex-1 flex flex-col gap-1 w-full overflow-y-auto pr-1 no-scrollbar", children: [
      e.map((c, d) => /* @__PURE__ */ m.jsx(u, { item: c }, d)),
      a
    ] }),
    /* @__PURE__ */ m.jsxs("div", { className: "mt-auto w-full flex flex-col gap-2 pt-4 border-t border-border", children: [
      i,
      o && /* @__PURE__ */ m.jsx(
        "button",
        {
          onClick: o,
          className: V(
            "flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground w-full mt-2"
          ),
          children: n ? /* @__PURE__ */ m.jsx(Kl, { className: "h-5 w-5" }) : /* @__PURE__ */ m.jsx(Yl, { className: "h-5 w-5" })
        }
      )
    ] })
  ] });
}
export {
  qu as Badge,
  cd as BanIcon,
  ed as BringIcon,
  Er as Button,
  Ts as Card,
  Ls as CardContent,
  Ds as CardDescription,
  Is as CardFooter,
  _s as CardHeader,
  Ms as CardTitle,
  id as ClothingIcon,
  jo as Command,
  _o as CommandEmpty,
  Mo as CommandGroup,
  To as CommandInput,
  Do as CommandItem,
  Jl as CommandList,
  Ql as CommandSeparator,
  ec as CommandShortcut,
  Ju as Dialog,
  sd as EyeIcon,
  Xu as Input,
  ld as KickIcon,
  tc as Modal,
  od as MoneyIcon,
  ud as PageHeader,
  Iu as Popover,
  gi as PopoverContent,
  Fu as PopoverTrigger,
  rd as ReviveIcon,
  dd as SelectSearch,
  td as SendBackIcon,
  fd as Sidebar,
  Wu as Table,
  Bu as TableBody,
  Gu as TableCaption,
  Hu as TableCell,
  zu as TableFooter,
  Uu as TableHead,
  $u as TableHeader,
  Vu as TableRow,
  Qu as TeleportIcon,
  nd as VerifyIcon,
  ad as WarnIcon,
  js as badgeVariants,
  Os as buttonVariants,
  V as cn
};
